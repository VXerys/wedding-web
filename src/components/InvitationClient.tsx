"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InvitationTabs from "@/components/InvitationTabs";
import { decodeGuestName } from "@/lib/utils";

export default function InvitationClient() {
  const searchParams = useSearchParams();
  const guestName = decodeGuestName(searchParams.get("to"));
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", !isOpened);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpened]);

  return (
    <InvitationTabs
      guestName={guestName}
      isOpened={isOpened}
      onOpen={() => setIsOpened(true)}
    />
  );
}
