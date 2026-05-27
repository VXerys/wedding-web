"use client";

import { useSearchParams } from "next/navigation";
import GuestbookFeed from "@/components/guestbook/GuestbookFeed";
import RSVPForm from "@/components/rsvp/RSVPForm";
import { useGuestbookFeed } from "@/hooks/useGuestbookFeed";
import { decodeGuestName } from "@/lib/utils";

export default function GuestbookSection() {
  const searchParams = useSearchParams();
  const guestName = decodeGuestName(searchParams.get("to"));

  const {
    entries,
    hasMore,
    isLoading,
    isLoadingMore,
    addOptimisticEntry,
    confirmEntry,
    removeEntry,
    loadMore,
  } = useGuestbookFeed();

  return (
    <>
      <RSVPForm
        guestName={guestName}
        addOptimisticEntry={addOptimisticEntry}
        confirmEntry={confirmEntry}
        removeEntry={removeEntry}
      />
      <GuestbookFeed
        entries={entries}
        hasMore={hasMore}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        onLoadMore={loadMore}
      />
    </>
  );
}
