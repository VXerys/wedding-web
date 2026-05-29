"use client";

import { motion } from "framer-motion";
import { formatAttendanceLabel, formatRelativeTime } from "@/lib/utils";
import type { GuestbookEntry } from "@/types/guestbook";

const badgeStyles: Record<string, { bg: string; text: string }> = {
  Hadir: { bg: "bg-green-50", text: "text-green-600" },
  "Tidak Hadir": { bg: "bg-red-50", text: "text-red-400" },
  Ragu: { bg: "bg-amber-50", text: "text-amber-500" },
};

interface GuestbookCardProps {
  entry: GuestbookEntry;
}

export default function GuestbookCard({ entry }: GuestbookCardProps) {
  const badge = badgeStyles[entry.attendance];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: entry.isPending ? 0.6 : 1, y: 0 }}
      className={`p-4 rounded-2xl bg-white/60 md:backdrop-blur-lg border border-white/25 shadow-card-sm ${
        entry.isPending ? "border-dashed border-gold-400/30" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-gold-400/15 flex items-center justify-center flex-shrink-0">
          <span className="font-display font-light text-gold-600 text-lg italic">
            {entry.guest_name.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-body text-body-sm font-medium text-slate-700 truncate">
              {entry.guest_name}
            </span>
            <span
              className={`text-label px-2 py-0.5 rounded-full tracking-wide ${
                badge?.bg ?? "bg-slate-200"
              } ${badge?.text ?? "text-slate-500"}`}
            >
              {formatAttendanceLabel(entry.attendance)}
            </span>
          </div>
          <p className="font-body text-body-sm text-slate-500 mt-1 leading-relaxed">
            {entry.message}
          </p>
          <time className="text-label text-slate-300 mt-2 block">
            {formatRelativeTime(entry.created_at)}
          </time>
        </div>
      </div>
    </motion.div>
  );
}
