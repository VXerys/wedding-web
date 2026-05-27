"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { GuestbookEntry } from "@/types/guestbook";

const PAGE_SIZE = 8;

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
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const optimisticSignatureMapRef = useRef<Map<string, string>>(new Map());

  const fetchPage = useCallback(async (pageIndex: number, initial = false) => {
    setError(null);
    if (initial) {
      setIsLoading(true);
    }

    const from = pageIndex * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("guestbook")
      .select("id, guest_name, attendance, message, created_at")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("[Guestbook] Failed to fetch entries", {
        error,
        pageIndex,
        from,
        to,
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

    const nextEntries = data ?? [];
    setEntries((prev) =>
      pageIndex === 0 ? nextEntries : [...prev, ...nextEntries]
    );
    setHasMore(nextEntries.length === PAGE_SIZE);

    if (initial) {
      setIsLoading(false);
    }

    return true;
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial client data fetch
    void fetchPage(0, true);
  }, [fetchPage]);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;

    const nextPage = page + 1;
    setIsLoadingMore(true);
    try {
      const didLoad = await fetchPage(nextPage);
      if (didLoad) {
        setPage(nextPage);
      }
    } finally {
      setIsLoadingMore(false);
    }
  }, [fetchPage, hasMore, isLoadingMore, page]);

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
    const channel = supabase
      .channel("public:guestbook")
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
