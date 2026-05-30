"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { motion } from "framer-motion";
import { memo } from "react";
import {
  fadeUp,
  staggerContainer,
  labelFade,
  lineExpand,
  scaleIn,
  sectionViewport,
} from "@/lib/motionVariants";

/** A single countdown digit box with label */
const CountdownUnit = memo(function CountdownUnit({
  value,
  label,
  isMounted,
}: {
  value: number;
  label: string;
  isMounted: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="glass-card-elevated w-[72px] h-[72px] sm:w-20 sm:h-20 flex items-center justify-center">
        <span
          className={`font-display font-light text-display-md text-slate-700 tabular-nums transition-opacity duration-500 ${
            isMounted ? "opacity-100" : "opacity-30"
          }`}
        >
          {isMounted ? String(value).padStart(2, "0") : "--"}
        </span>
      </div>
      <span className="text-label text-slate-500 font-body tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
});

function CountdownDisplay({ eventDate }: { eventDate: string }) {
  const { days, hours, minutes, seconds, isExpired, isMounted } = useCountdown(eventDate);

  return isExpired && isMounted ? (
    <motion.div
      variants={scaleIn}
      className="glass-card px-6 py-8"
    >
      <p className="font-display font-light text-display-md italic text-slate-700">
        Terima kasih atas
      </p>
      <p className="font-display font-light text-display-md italic text-slate-700">
        kehadirannya 💕
      </p>
    </motion.div>
  ) : (
    <motion.div
      variants={scaleIn}
      className="flex items-center justify-center gap-3 sm:gap-4"
    >
      <CountdownUnit value={days} label="Hari" isMounted={isMounted} />
      <CountdownUnit value={hours} label="Jam" isMounted={isMounted} />
      <CountdownUnit value={minutes} label="Menit" isMounted={isMounted} />
      <CountdownUnit value={seconds} label="Detik" isMounted={isMounted} />
    </motion.div>
  );
}

export default function CountdownTimer() {
  const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE ?? "2026-07-12T09:00:00+07:00";

  return (
    <section className="py-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerContainer}
        className="max-w-md mx-auto px-4 sm:px-6 text-center"
      >
        {/* Heading */}
        <motion.p
          variants={labelFade}
          className="text-label text-gold-400 tracking-[0.32em] uppercase"
        >
          Save
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-2 font-display font-light text-display-lg italic text-slate-700"
        >
          The Date
        </motion.h2>

        {/* Ornamental divider */}
        <motion.div
          variants={lineExpand}
          className="flex items-center justify-center gap-3 my-6"
        >
          <span className="block h-px w-12 bg-gold-400/40" />
          <span className="text-gold-400 text-body-sm">◆</span>
          <span className="block h-px w-12 bg-gold-400/40" />
        </motion.div>

        {/* Countdown boxes or expired message */}
        <CountdownDisplay eventDate={eventDate} />
      </motion.div>
    </section>
  );
}
