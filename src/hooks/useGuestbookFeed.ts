"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { GuestbookEntry } from "@/types/guestbook";

const PAGE_SIZE = 3;

interface GuestbookCursor {
  createdAt: string;
  id: string;
}

const normalizeText = (value: string) =>
  value.trim().replace(/\s+/g, " ").toLowerCase();

const buildEntrySignature = (entry: {
  guest_name: string;
  attendance: GuestbookEntry["attendance"];
  message: string;
}) =>
  `${normalizeText(entry.guest_name)}|${entry.attendance}|${normalizeText(entry.message)}`;

const formatGuestbookError = (error: unknown, fallbackMessage: string) => {
  if (error && typeof error === "object" && "message" in error) {
    const rawMessage = error.message;
    if (typeof rawMessage === "string" && rawMessage.trim()) {
      return `${fallbackMessage} (${rawMessage})`;
    }
  }

  return fallbackMessage;
};

export const useGuestbookFeed = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nextCursorRef = useRef<GuestbookCursor | null>(null);
  const optimisticSignatureMapRef = useRef<Map<string, string>>(new Map());

  const fetchPage = useCallback(async (initial = false) => {
    setError(null);
    if (initial) {
      setIsLoading(true);
      nextCursorRef.current = null;
    }

    const cursor = initial ? null : nextCursorRef.current;
    let query = supabase
      .from("guestbook")
      .select("id, guest_name, attendance, message, created_at")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(PAGE_SIZE + 1);

    if (cursor) {
      query = query.or(
        `created_at.lt.${cursor.createdAt},and(created_at.eq.${cursor.createdAt},id.lt.${cursor.id})`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("[Guestbook] Failed to fetch entries", {
        error,
        cursor,
      });
      setError(
        formatGuestbookError(
          error,
          initial
            ? "Tidak dapat memuat ucapan dari server."
            : "Tidak dapat memuat ucapan tambahan."
        )
      );
      if (initial) {
        setIsLoading(false);
      }
      return false;
    }

    const fetchedEntries = data ?? [];
    const hasNextPage = fetchedEntries.length > PAGE_SIZE;
    const nextEntries = fetchedEntries.slice(0, PAGE_SIZE);
    const cursorEntry = nextEntries[nextEntries.length - 1];

    nextCursorRef.current = cursorEntry
      ? { createdAt: cursorEntry.created_at, id: cursorEntry.id }
      : null;

    setEntries((prev) => {
      if (initial) {
        return nextEntries;
      }

      const seenIds = new Set(prev.map((entry) => entry.id));
      const dedupedEntries = nextEntries.filter((entry) => {
        if (seenIds.has(entry.id)) {
          return false;
        }
        seenIds.add(entry.id);
        return true;
      });

      return [...prev, ...dedupedEntries];
    });
    setHasMore(hasNextPage);

    if (initial) {
      setIsLoading(false);
    }

    return true;
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial client data fetch
    void fetchPage(true);
  }, [fetchPage]);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      await fetchPage();
    } finally {
      setIsLoadingMore(false);
    }
  }, [fetchPage, hasMore, isLoadingMore]);

  const addOptimisticEntry = useCallback((entry: GuestbookEntry) => {
    optimisticSignatureMapRef.current.set(entry.id, buildEntrySignature(entry));
    setEntries((prev) => [entry, ...prev]);
  }, []);

  const confirmEntry = useCallback((tempId: string, realEntry: GuestbookEntry) => {
    optimisticSignatureMapRef.current.delete(tempId);

    setEntries((prev) => {
      const hasRealEntry = prev.some(
        (entry) => entry.id === realEntry.id && entry.id !== tempId
      );

      if (hasRealEntry) {
        return prev.filter((entry) => entry.id !== tempId);
      }

      let hasTempEntry = false;
      const replaced = prev.map((entry) => {
        if (entry.id === tempId) {
          hasTempEntry = true;
          return realEntry;
        }
        return entry;
      });

      if (!hasTempEntry) {
        return [realEntry, ...prev];
      }

      const seenIds = new Set<string>();
      return replaced.filter((entry) => {
        if (seenIds.has(entry.id)) {
          return false;
        }
        seenIds.add(entry.id);
        return true;
      });
    });
  }, []);

  const removeEntry = useCallback((tempId: string) => {
    optimisticSignatureMapRef.current.delete(tempId);
    setEntries((prev) => prev.filter((entry) => entry.id !== tempId));
  }, []);

  useEffect(() => {
    const channelId = `guestbook-feed-${Math.random().toString(36).substring(2, 10)}`;
    const channel = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          const newEntry = payload.new as GuestbookEntry;
          const newEntrySignature = buildEntrySignature(newEntry);

          setEntries((prev) => {
            const exists = prev.some((entry) => entry.id === newEntry.id);
            if (exists) return prev;

            const pendingMatch = prev.find((entry) => {
              if (!entry.isPending) return false;
              const pendingSignature = optimisticSignatureMapRef.current.get(
                entry.id
              );
              return pendingSignature === newEntrySignature;
            });

            if (pendingMatch) {
              optimisticSignatureMapRef.current.delete(pendingMatch.id);
              return prev.map((entry) =>
                entry.id === pendingMatch.id ? newEntry : entry
              );
            }

            return [newEntry, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    entries,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    addOptimisticEntry,
    confirmEntry,
    removeEntry,
    loadMore,
  };
};
