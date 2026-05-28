/**
 * Shared Framer Motion variants for scroll-triggered animations.
 * All variants are GPU-accelerated (opacity + transform only).
 * Use with `initial`, `animate`/`whileInView`, and `transition` props.
 */

import type { Variants } from "framer-motion";

// ─── Easing Curves ────────────────────────────────────────────────────────────

/** Smooth ease-out for entrances */
const easeOut = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/** Spring-like overshoot ease for interactive elements */
const easeSpring = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

export const sectionViewport = {
  once: true,
  amount: 0.16,
  margin: "0px 0px -12% 0px",
} as const;

// ─── Fade + Translate ─────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// ─── Horizontal Slides ────────────────────────────────────────────────────────

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

// ─── Scale ────────────────────────────────────────────────────────────────────

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: easeOut },
  },
};

/** Scale with a subtle spring overshoot — great for interactive cards */
export const scaleInSpring: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeSpring },
  },
};

// ─── Gallery Photo Variants ───────────────────────────────────────────────────

export const photoMain: Variants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -3 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -1,
    transition: { duration: 0.85, ease: easeOut },
  },
};

export const photoLeft: Variants = {
  hidden: { opacity: 0, x: -40, rotate: -4 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 2,
    transition: { duration: 0.75, ease: easeOut, delay: 0.2 },
  },
};

export const photoRight: Variants = {
  hidden: { opacity: 0, x: 40, rotate: 4 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: -2,
    transition: { duration: 0.75, ease: easeOut, delay: 0.35 },
  },
};

// ─── Stagger Container ────────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

// ─── Text Reveal ─────────────────────────────────────────────────────────────

/** Word/line reveal from clip mask — use on each word span */
export const textRevealWord: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.55, ease: easeOut },
  },
};

// ─── Section Header ───────────────────────────────────────────────────────────

/** Label above heading (e.g. "GALLERY") */
export const labelFade: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

// ─── Divider Line ─────────────────────────────────────────────────────────────

export const lineExpand: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

// ─── Card ─────────────────────────────────────────────────────────────────────

export const cardRise: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
};

export const cardRiseDelayed: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut, delay: 0.2 },
  },
};
