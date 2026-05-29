"use client";

import { motion } from "framer-motion";

interface InvitationPaperCardProps {
  guestName: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], // easeOutQuart
    },
  },
};

export default function InvitationPaperCard({ guestName }: InvitationPaperCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="relative w-full max-w-[320px] bg-gradient-to-br from-white via-[#faf9f6]/95 to-[#f5f0e8]/90 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl shadow-card p-3 z-10 mx-auto"
    >
      {/* Inner border */}
      <div className="border-[0.5px] border-[#D4AF37]/15 rounded-[14px] p-6 flex flex-col items-center justify-center text-center">
        {/* Top Ornament */}
        <div className="flex items-center gap-2 mb-4 w-full justify-center">
          <div className="w-8 h-[0.5px] bg-[#D4AF37]/30" />
          <span className="text-[#D4AF37] text-[10px] select-none">◆</span>
          <div className="w-8 h-[0.5px] bg-[#D4AF37]/30" />
        </div>

        {/* Salutation */}
        <p className="font-body text-[10px] uppercase tracking-[0.2em] text-slate-500">
          Dear Sir / Madam
        </p>

        {/* Guest Name */}
        <h2 className="font-display text-2xl font-light italic text-slate-700 mt-2 max-w-full break-words">
          {guestName}
        </h2>

        {/* Invitation Text */}
        <p className="font-display text-sm italic text-slate-500 mt-3 max-w-[240px] leading-relaxed">
          You are cordially invited to celebrate our union.
        </p>

        {/* Bottom Ornament */}
        <div className="flex items-center gap-2 mt-4 w-full justify-center">
          <div className="w-8 h-[0.5px] bg-[#D4AF37]/30" />
          <span className="text-[#D4AF37] text-[10px] select-none">◆</span>
          <div className="w-8 h-[0.5px] bg-[#D4AF37]/30" />
        </div>
      </div>
    </motion.div>
  );
}
