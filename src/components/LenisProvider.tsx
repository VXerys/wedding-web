"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis, { type VirtualScrollData } from "lenis";

interface LenisProviderProps {
  children: ReactNode;
  enabled?: boolean;
}

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export function LenisProvider({ children, enabled = true }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    let active = true;
    const updateInstance = (val: Lenis | null) => {
      requestAnimationFrame(() => {
        if (active) setLenisInstance(val);
      });
    };

    if (!enabled) {
      updateInstance(null);
      return () => {
        active = false;
      };
    }

    const lenis = new Lenis({
      lerp: isTouchDevice ? 0.18 : 0.11,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false,
      syncTouchLerp: 0.075,
      touchMultiplier: 1.0,
      wheelMultiplier: 0.85,
      overscroll: false,
    });

    lenisRef.current = lenis;
    updateInstance(lenis);

    let rafId: number | null = null;
    let idleFrames = 0;
    const raf = (time: number) => {
      lenis.raf(time);

      const isIdle = lenis.isScrolling === false && Math.abs(lenis.velocity) < 0.01;
      if (isIdle) {
        idleFrames += 1;
      } else {
        idleFrames = 0;
      }

      if (idleFrames >= (isTouchDevice ? 2 : 3)) {
        rafId = null;
        idleFrames = 0;
        return;
      }

      rafId = window.requestAnimationFrame(raf);
    };

    const startRaf = () => {
      if (document.hidden || rafId !== null) {
        return;
      }

      idleFrames = 0;
      rafId = window.requestAnimationFrame(raf);
    };

    const stopRaf = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }

      idleFrames = 0;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopRaf();
      }
    };

    const originalScrollTo = lenis.scrollTo.bind(lenis);
    lenis.scrollTo = ((target, options) => {
      startRaf();
      return originalScrollTo(target, options);
    }) as Lenis["scrollTo"];

    const startRafFromVirtualScroll = ({ event }: VirtualScrollData) => {
      if (isTouchDevice && event.type.startsWith("touch")) {
        return;
      }

      startRaf();
    };
    const unsubscribeVirtualScroll = lenis.on("virtual-scroll", startRafFromVirtualScroll);
    const startRafFromInput = () => startRaf();
    const startRafFromTouch = () => {
      if (!isTouchDevice) {
        startRaf();
      }
    };

    // Sync Lenis scroll position with hash links
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: 0,
            immediate: false,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener("click", handleHashClick);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("wheel", startRafFromInput, { passive: true });
    window.addEventListener("touchmove", startRafFromTouch, { passive: true });
    window.addEventListener("keydown", startRafFromInput);

    return () => {
      active = false;
      document.removeEventListener("click", handleHashClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("wheel", startRafFromInput);
      window.removeEventListener("touchmove", startRafFromTouch);
      window.removeEventListener("keydown", startRafFromInput);
      unsubscribeVirtualScroll();
      stopRaf();
      lenis.destroy();
      lenisRef.current = null;
      updateInstance(null);
    };
  }, [enabled]);

  return <LenisContext.Provider value={lenisInstance}>{children}</LenisContext.Provider>;
}
