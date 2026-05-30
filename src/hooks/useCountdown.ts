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

const INITIAL_COUNTDOWN_VALUES: CountdownValues = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isExpired: false,
  isMounted: false,
};

function areCountdownValuesEqual(a: CountdownValues, b: CountdownValues) {
  return (
    a.days === b.days &&
    a.hours === b.hours &&
    a.minutes === b.minutes &&
    a.seconds === b.seconds &&
    a.isExpired === b.isExpired &&
    a.isMounted === b.isMounted
  );
}

function getNextSecondDelay() {
  return Math.max(250, 1000 - (Date.now() % 1000) + 20);
}

/**
 * Calculates the remaining time between now and the given target date.
 *
 * @param targetDate ISO 8601 string (e.g. "2026-07-12T09:00:00+07:00")
 *                   or date-only string (e.g. "2026-07-12"), which defaults
 *                   to midnight local time.
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
  const [remaining, setRemaining] = useState<CountdownValues>(INITIAL_COUNTDOWN_VALUES);

  useEffect(() => {
    let timeoutId: number | null = null;
    let isCancelled = false;

    const tick = () => {
      const next = computeRemaining();
      setRemaining((current) => (areCountdownValuesEqual(current, next) ? current : next));

      if (next.isExpired || isCancelled) {
        return;
      }

      timeoutId = window.setTimeout(tick, getNextSecondDelay());
    };

    tick();

    return () => {
      isCancelled = true;

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [computeRemaining]);

  return remaining;
}
