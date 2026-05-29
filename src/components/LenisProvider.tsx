"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

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
    if (!enabled) {
      setLenisInstance(null);
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.11,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.12,
      touchMultiplier: 0.85,
      wheelMultiplier: 0.85,
      overscroll: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    let rafId: number | null = null;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    const startRaf = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(raf);
      }
    };

    const stopRaf = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopRaf();
        return;
      }

      startRaf();
    };

    startRaf();

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

    return () => {
      document.removeEventListener("click", handleHashClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopRaf();
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [enabled]);

  return <LenisContext.Provider value={lenisInstance}>{children}</LenisContext.Provider>;
}
