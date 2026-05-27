"use client";

import GuestbookCard from "@/components/guestbook/GuestbookCard";
import type { GuestbookEntry } from "@/types/guestbook";

interface GuestbookFeedProps {
  entries: GuestbookEntry[];
  isLoading: boolean;
  hasMore: boolean;
  isLoadingMore: boolean;
  error: string | null;
  onLoadMore: () => void;
}

export default function GuestbookFeed({
  entries,
  isLoading,
  hasMore,
  isLoadingMore,
  error,
  onLoadMore,
}: GuestbookFeedProps) {
  return (
    <section className="py-12" id="guestbook">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <h2 className="font-display text-display-lg italic text-slate-700 text-center mb-6">
          Buku Ucapan
        </h2>

        {!isLoading && error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-body-sm text-red-500">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-24 rounded-2xl bg-white/50 border border-white/30 animate-pulse"
              />
            ))}
          </div>
        ) : error && entries.length === 0 ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-body-sm text-red-500">
            {error}
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-2xl border border-white/30 bg-white/60 p-6 text-center text-body-sm text-slate-500">
            Jadilah yang pertama memberikan ucapan!
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <GuestbookCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}

        {!isLoading && entries.length > 0 && (
          <div className="mt-6 flex justify-center">
            {hasMore ? (
              <button
                type="button"
                onClick={onLoadMore}
                disabled={isLoadingMore}
                className="rounded-full border border-gold-400/40 px-5 py-2 text-body-sm text-gold-600 transition-colors hover:bg-gold-400/10 disabled:opacity-60"
              >
                {isLoadingMore ? "Memuat..." : "Muat Lebih Banyak"}
              </button>
            ) : (
              <span className="text-body-sm text-slate-400">
                Semua ucapan sudah ditampilkan.
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
