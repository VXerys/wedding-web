"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InvitationTabs from "@/components/InvitationTabs";
import { LenisProvider } from "@/components/LenisProvider";
import { decodeGuestName } from "@/lib/utils";

const invitationImagePaths = [
  "/images/figma/temple_illustration.png",
  "/images/figma/brandon_profile.png",
  "/images/figma/meyca_profile.png",
  "/images/figma/faded_temple_footer.png",
  "/images/figma/botanical_sketch_bottom.png",
  "/images/figma/539710a16a8e4593b04177a7287d1a686cb3c49f.png",
  "/images/figma/58df4d3861d556a32d9611d7ebe181f409759b8b.png",
  "/images/figma/bc72238c81bb18fc6dc53a32f0916a126009f9d5.png",
  "/images/figma/4950129f7a7d256f5721da392cec38d7d6b33daf.png",
];

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

    const preloadImages = () => {
      invitationImagePaths.forEach((src) => {
        const image = new window.Image();
        image.src = src;
        void image.decode?.().catch(() => undefined);
      });
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(preloadImages, {
        timeout: 1200,
      });

      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(preloadImages, 250);
    return () => window.clearTimeout(timeoutId);
  }, [isOpened]);

  return (
    <LenisProvider enabled={isOpened}>
      <InvitationTabs
        guestName={guestName}
        isOpened={isOpened}
        onOpen={() => setIsOpened(true)}
        onClose={() => setIsOpened(false)}
      />
    </LenisProvider>
  );
}
