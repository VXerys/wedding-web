"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InvitationTabs from "@/components/InvitationTabs";
import { LenisProvider } from "@/components/LenisProvider";
import { decodeGuestName } from "@/lib/utils";

export default function InvitationClient() {
  const searchParams = useSearchParams();
  const guestName = decodeGuestName(searchParams.get("to"));
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    const unlockScroll = () => {
      const lockedScrollY = Math.abs(parseInt(body.style.top || "0", 10)) || 0;

      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";

      window.scrollTo(0, lockedScrollY);
    };

    if (isOpened) {
      unlockScroll();
      return undefined;
    }

    const scrollY = window.scrollY;

    html.classList.add("overflow-hidden");
    body.classList.add("overflow-hidden");
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return unlockScroll;
  }, [isOpened]);

  return (
    <LenisProvider enabled={isOpened}>
      <InvitationTabs
        guestName={guestName}
        isOpened={isOpened}
        onOpen={() => setIsOpened(true)}
      />
    </LenisProvider>
  );
}
