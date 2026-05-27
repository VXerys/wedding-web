"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { GuestbookEntry } from "@/types/guestbook";

const PAGE_SIZE = 8;

export const useGuestbookFeed = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchPage = useCallback(async (pageIndex: number, initial = false) => {
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

    if (!error && data) {
      setEntries((prev) => (pageIndex === 0 ? data : [...prev, ...data]));
      setHasMore(data.length === PAGE_SIZE);
    }

    if (initial) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial client data fetch
    void fetchPage(0, true);
  }, [fetchPage]);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;

    const nextPage = page + 1;
    setIsLoadingMore(true);
    await fetchPage(nextPage);
    setPage(nextPage);
    setIsLoadingMore(false);
  }, [fetchPage, hasMore, isLoadingMore, page]);

  const addOptimisticEntry = useCallback((entry: GuestbookEntry) => {
    setEntries((prev) => [entry, ...prev]);
  }, []);

  const confirmEntry = useCallback((tempId: string, realEntry: GuestbookEntry) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === tempId ? realEntry : entry))
    );
  }, []);

  const removeEntry = useCallback((tempId: string) => {
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
          setEntries((prev) => {
            const exists = prev.some((entry) => entry.id === newEntry.id);
            if (exists) return prev;
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
    addOptimisticEntry,
    confirmEntry,
    removeEntry,
    loadMore,
  };
};
