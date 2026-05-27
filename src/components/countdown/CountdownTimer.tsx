"use client";

import { useCountdown } from "@/hooks/useCountdown";

/** A single countdown digit box with label */
function CountdownUnit({
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
          className={`font-display text-display-md text-slate-700 tabular-nums transition-opacity duration-500 ${
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
}

export default function CountdownTimer() {
  const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE ?? "2026-07-12T09:00:00+07:00";
  const { days, hours, minutes, seconds, isExpired, isMounted } = useCountdown(eventDate);

  return (
    <section className="py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 text-center">
        {/* Heading */}
        <p className="text-label text-gold-400 tracking-[0.32em] uppercase">
          Save
        </p>
        <h2 className="mt-2 font-display text-display-lg italic text-slate-700">
          The Date
        </h2>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <span className="block h-px w-12 bg-gold-400/40" />
          <span className="text-gold-400 text-body-sm">◆</span>
          <span className="block h-px w-12 bg-gold-400/40" />
        </div>

        {/* Countdown boxes or expired message */}
        {isExpired && isMounted ? (
          <div className="glass-card px-6 py-8">
            <p className="font-display text-display-md italic text-slate-700">
              Terima kasih atas
            </p>
            <p className="font-display text-display-md italic text-slate-700">
              kehadirannya 💕
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <CountdownUnit value={days} label="Hari" isMounted={isMounted} />
            <CountdownUnit value={hours} label="Jam" isMounted={isMounted} />
            <CountdownUnit value={minutes} label="Menit" isMounted={isMounted} />
            <CountdownUnit value={seconds} label="Detik" isMounted={isMounted} />
          </div>
        )}
      </div>
    </section>
  );
}

