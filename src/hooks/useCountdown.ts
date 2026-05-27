"use client";

import { useState, useEffect, useCallback } from "react";

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** True when the target datetime has passed */
  isExpired: boolean;
  /** True when the hook is running on the client after mounting */
  isMounted: boolean;
}

/**
 * Calculates the remaining time between now and the given target date.
 *
 * @param targetDate — ISO 8601 string (e.g. "2026-07-12T09:00:00+07:00")
 *                     or date-only string (e.g. "2026-07-12"), which defaults
 *                     to midnight local time.
 * @returns live countdown values that update every second.
 */
export function useCountdown(targetDate: string): CountdownValues {
  const computeRemaining = useCallback((): CountdownValues => {
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, isMounted: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: false,
      isMounted: true,
    };
  }, [targetDate]);

  // Initial state uses a stable placeholder to avoid hydration mismatch.
  const [remaining, setRemaining] = useState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    isMounted: false,
  });

  useEffect(() => {
    // Sync immediately on mount
    setRemaining(computeRemaining());

    const id = setInterval(() => {
      const next = computeRemaining();
      setRemaining(next);

      // Stop the timer once expired — no reason to keep ticking
      if (next.isExpired) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, [computeRemaining]);

  return remaining;
}

