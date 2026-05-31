"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface InvitationPaperCardProps {
  guestName: string;
  variant?: 'cover' | 'home';
  showButton?: boolean;
  onOpen?: () => void;
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

const GoldDivider = () => (
  <div className="flex items-center gap-2 w-full justify-center">
    <div className="w-6 h-[0.5px] bg-[#D4AF37]/30" />
    <span className="text-[#D4AF37] text-[8px] select-none leading-none">◆</span>
    <div className="w-6 h-[0.5px] bg-[#D4AF37]/30" />
  </div>
);

function InvitationPaperCard({
  guestName,
  variant = "home",
  showButton = false,
  onOpen,
}: InvitationPaperCardProps) {
  const isCover = variant === "cover";
  
  // Landscape dimensions:
  // - Cover variant: w-[280px] h-[154px] rounded-[16px]
  // - Home variant: w-[82vw] max-w-[280px] h-[154px] rounded-[16px]
  const sizeClasses = isCover
    ? "w-[280px] h-[154px] rounded-[16px]"
    : "w-[72vw] max-w-[240px] xs:max-w-[260px] sm:max-w-[280px] h-[140px] xs:h-[154px] rounded-[16px]";

  const cardContent = (
    <div
      className={`relative ${sizeClasses} bg-gradient-to-br from-white via-[#faf9f6]/95 to-[#f5f0e8]/90 border border-[#D4AF37]/30 shadow-card p-3 flex items-center justify-center select-none overflow-hidden mx-auto`}
    >
      {/* Double hairline gold border */}
      <div className="absolute inset-[3px] border border-[#D4AF37]/15 rounded-[inherit] pointer-events-none" />

      {/* Fine inner border */}
      <div className="w-full h-full border-[0.5px] border-[#D4AF37]/15 rounded-[inherit] p-2 flex flex-col items-center justify-center text-center">
        {/* Top Ornament */}
        <GoldDivider />

        {/* Salutation */}
        <p className={`font-body text-[9px] uppercase tracking-[0.2em] text-slate-500 ${isCover ? "mt-1" : "mt-0.5 xs:mt-1"}`}>
          Dear Sir / Madam
        </p>

        {/* Guest Name */}
        <h2
          className={`font-display font-light italic text-slate-700 text-center break-words max-w-full leading-tight ${
            isCover ? "text-xl mt-1 px-2" : "text-lg xs:text-xl mt-1 px-3"
          }`}
        >
          {guestName}
        </h2>

        {/* Invitation Text */}
        <p
          className={`font-display italic text-slate-500 ${
            isCover
              ? "text-[10px] mt-1.5 max-w-[200px] leading-normal"
              : "text-[9px] xs:text-[10px] mt-1 xs:mt-1.5 max-w-[190px] xs:max-w-[210px] leading-relaxed"
          }`}
        >
          You are cordially invited to celebrate our union.
        </p>

        {/* Bottom Ornament or Button */}
        {showButton ? (
          <button
            type="button"
            onClick={onOpen}
            className="mt-2 px-6 py-1 bg-[#D4AF37] hover:bg-[#B8962E] active:scale-[0.98] text-white text-[10px] uppercase tracking-wider rounded-full shadow-md font-semibold transition-all cursor-pointer pointer-events-auto"
          >
            Buka Undangan
          </button>
        ) : (
          <div className="mt-1">
            <GoldDivider />
          </div>
        )}
      </div>
    </div>
  );

  if (variant === "home") {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}

export default memo(InvitationPaperCard);
