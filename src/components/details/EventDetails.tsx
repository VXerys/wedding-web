import { MapPin } from "lucide-react";

export default function EventDetails() {
  const mapsUrl =
    process.env.NEXT_PUBLIC_MAPS_URL ??
    "https://maps.google.com/?q=-6.2088,106.8456";

  // TODO: Replace with actual venue details.
  const akad = {
    label: "Akad Nikah",
    date: "Minggu, 12 Juli 2026",
    time: "09:00 WIB",
    venue: "Masjid Al-Barkah, Jl. Mawar No. 12, Jakarta",
  };

  const resepsi = {
    label: "Resepsi",
    time: "11:00 - 13:00 WIB",
    venue: "Gedung Serbaguna, Jl. Melati No. 5, Jakarta",
  };

  return (
    <section className="py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <h2 className="font-display text-display-lg italic text-slate-700 text-center mb-8">
          Detail Acara
        </h2>
        <div className="grid grid-cols-3 gap-3 auto-rows-[minmax(120px,auto)]">
          <div className="col-span-3 sm:col-span-2 glass-card p-5">
            <span className="text-label text-gold-400 font-body tracking-widest uppercase">
              {akad.label}
            </span>
            <p className="mt-2 text-body-lg text-slate-700 font-medium">
              {akad.date}
            </p>
            <p className="mt-1 text-body-sm text-slate-500">{akad.time}</p>
            <p className="mt-3 text-body-sm text-slate-500 leading-snug">
              {akad.venue}
            </p>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-3 sm:col-span-1 glass-card-elevated p-4 flex flex-col items-center justify-center gap-2 text-center"
          >
            <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gold-400" />
            </div>
            <span className="text-body-sm text-slate-700 font-medium">
              Buka Maps
            </span>
          </a>

          <div className="col-span-3 sm:col-span-1 glass-card p-4">
            <span className="text-label text-gold-400 font-body tracking-widest uppercase">
              Dress Code
            </span>
            <p className="mt-2 text-body-sm text-slate-500">Batik / Formal</p>
          </div>

          <div className="col-span-3 sm:col-span-2 bg-cream-200/80 backdrop-blur-md border border-white/30 rounded-2xl p-5">
            <span className="text-label text-gold-400 font-body tracking-widest uppercase">
              {resepsi.label}
            </span>
            <p className="mt-2 text-body-lg text-slate-700 font-medium">
              {resepsi.time}
            </p>
            <p className="mt-3 text-body-sm text-slate-500 leading-snug">
              {resepsi.venue}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
