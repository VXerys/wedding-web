import { useEffect, useRef } from "react";
import { useAnimation, useInView } from "framer-motion";
import type { UseInViewOptions } from "framer-motion";

type MarginType = UseInViewOptions["margin"];

interface UseScrollAnimationOptions {
  once?: boolean;
  amount?: number | "some" | "all";
  margin?: MarginType;
}

/**
 * A performance-friendly scroll hook that triggers Framer Motion controls when an element enters the viewport.
 * Uses IntersectionObserver under the hood via Framer Motion's `useInView`.
 */
export function useScrollAnimation({
  once = true,
  amount = 0.15,
  margin = "0px",
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once, amount, margin });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return { ref, controls, isInView };
}
