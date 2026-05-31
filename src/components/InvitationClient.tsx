"use client";

import { useSearchParams } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import InvitationTabs from "@/components/InvitationTabs";
import { LenisProvider } from "@/components/LenisProvider";
import { decodeGuestName } from "@/lib/utils";

const nearHomeImagePaths = [
  "/images/centered-home.svg",
  "/images/figma/brandon_profile.png",
  "/images/figma/meyca_profile.png",
];

const deferredInvitationImagePaths = [
  "/images/foto-wedding.jpeg",
  "/images/cincin-wedding.jpeg",
  "/images/figma/bc72238c81bb18fc6dc53a32f0916a126009f9d5.png",
  "/images/figma/faded_temple_footer.png",
  "/images/figma/4950129f7a7d256f5721da392cec38d7d6b33daf.png",
];

function decodeImages(paths: string[]) {
  paths.forEach((src) => {
    const image = new window.Image();
    image.src = src;
    void image.decode?.().catch(() => undefined);
  });
}

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

  useEffect(() => {
    if (!isOpened) {
      return undefined;
    }

    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const timeoutIds: number[] = [];
    const idleIds: number[] = [];

    const scheduleDecode = (paths: string[], delay: number, timeout: number) => {
      const timeoutId = window.setTimeout(() => {
        if (typeof idleWindow.requestIdleCallback === "function") {
          const idleId = idleWindow.requestIdleCallback(() => decodeImages(paths), {
            timeout,
          });
          idleIds.push(idleId);
          return;
        }

        decodeImages(paths);
      }, delay);

      timeoutIds.push(timeoutId);
    };

    scheduleDecode(nearHomeImagePaths, 80, 600);
    scheduleDecode(deferredInvitationImagePaths, 1200, 1800);

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      idleIds.forEach((idleId) => idleWindow.cancelIdleCallback?.(idleId));
    };
  }, [isOpened]);

  return (
    <LenisProvider enabled={isOpened}>
      <InvitationTabs
        guestName={guestName}
        isOpened={isOpened}
        onOpen={() => startTransition(() => setIsOpened(true))}
        onClose={() => setIsOpened(false)}
      />
    </LenisProvider>
  );
}
