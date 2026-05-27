"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface CoverEnvelopeProps {
  guestName: string;
}

const coverVariants = {
  visible: { y: 0, opacity: 1 },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function CoverEnvelope({ guestName }: CoverEnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion
    ? {
        visible: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : coverVariants;

  useEffect(() => {
    if (!isOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpened]);

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpen();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isOpened && (
        <motion.div
          className="cover-overlay fixed inset-0 z-50 flex items-center justify-center bg-cream-100"
          role="button"
          tabIndex={0}
          aria-label="Ketuk untuk membuka undangan"
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          variants={variants}
          initial="visible"
          animate="visible"
          exit="exit"
        >
          <div className="text-center px-6">
            <p className="text-body-sm uppercase tracking-[0.32em] text-gold-400">
              Undangan Pernikahan
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 text-gold-400">
              <span className="h-px w-10 bg-gold-400/50" />
              <span className="text-lg">*</span>
              <span className="h-px w-10 bg-gold-400/50" />
            </div>
            <p className="mt-6 text-body-md text-slate-500">Kepada Yth.</p>
            <h2 className="mt-2 font-display text-display-lg italic text-slate-700">
              {guestName}
            </h2>
            <div className="mt-10 flex flex-col items-center gap-3 text-slate-500">
              <span className="h-2 w-2 rounded-full bg-gold-400/60" />
              <span className="text-body-sm animate-pulse">
                Ketuk untuk Membuka
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
