"use client";

import { useSearchParams } from "next/navigation";
import CoverEnvelope from "@/components/cover/CoverEnvelope";
import { decodeGuestName } from "@/lib/utils";

const formatEventDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export default function HeroSection() {
  const searchParams = useSearchParams();
  const guestName = decodeGuestName(searchParams.get("to"));
  const groom = process.env.NEXT_PUBLIC_GROOM_NAME ?? "Ahmad";
  const bride = process.env.NEXT_PUBLIC_BRIDE_NAME ?? "Siti";
  const eventDateRaw = process.env.NEXT_PUBLIC_EVENT_DATE ?? "2026-07-12";
  const eventDate = formatEventDate(eventDateRaw);

  return (
    <section className="relative pt-16 pb-12">
      <CoverEnvelope guestName={guestName} />
      <div className="max-w-md mx-auto px-4 sm:px-6 text-center">
        <p className="text-label text-gold-400 tracking-[0.32em] uppercase">
          Undangan Pernikahan
        </p>
        <h1 className="mt-6 font-display text-display-xl italic text-slate-700">
          {groom} & {bride}
        </h1>
        <p className="mt-3 text-body-sm text-slate-500">{eventDate}</p>
        <div className="mt-10 glass-card px-6 py-6">
          <p className="text-body-md text-slate-500">Kepada Yth.</p>
          <p className="mt-2 font-display text-display-lg italic text-slate-700 truncate">
            {guestName}
          </p>
          <p className="mt-4 text-body-sm text-slate-500">
            Kami mengundang Anda untuk menjadi bagian dari hari bahagia kami.
          </p>
        </div>
      </div>
    </section>
  );
}
