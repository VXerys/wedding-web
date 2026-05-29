"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type CoverState = "closed" | "opening" | "opened";

interface CoverEnvelopeProps {
  guestName?: string;
  coupleInitials?: string;
  onOpened: () => void;
}

export default function CoverEnvelope({
  guestName = "Tamu Undangan",
  coupleInitials = "B&M",
  onOpened,
}: CoverEnvelopeProps) {
  const [coverState, setCoverState] = useState<CoverState>("closed");
  const [mounted, setMounted] = useState(false);
  const [cardTranslateY, setCardTranslateY] = useState(-65);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setCardTranslateY(-70);
      } else {
        setCardTranslateY(-65);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldReduceMotion = mounted && prefersReducedMotion;

  const handleOpen = () => {
    if (coverState !== "closed") return;

    if (shouldReduceMotion) {
      setCoverState("opened");
      return;
    }

    setCoverState("opening");

    // Coordinated transitions:
    // Step 1: Button scale/fade-out (0s - 0.2s)
    // Step 2: Flap rotates open (rotateX 0 to -160deg) over 0.6s with 0.2s delay
    // Step 3: Card slides out over 0.8s with 0.45s delay (0.2s button + 0.25s delay)
    // Transition state to 'opened' at 1.3s
    setTimeout(() => {
      setCoverState("opened");
    }, 1300);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (coverState === "closed") {
        handleOpen();
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF9F6] md:left-1/2 md:-translate-x-1/2 md:max-w-[430px] w-full px-4 text-center select-none"
      role="button"
      tabIndex={0}
      aria-label="Ketuk untuk membuka undangan"
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        scale: 0.92,
        opacity: 0,
      }}
      transition={{
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96], // smooth exit curve
      }}
    >
      {/* Botanical Heritage Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Base Texture */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/p6.png')",
            backgroundSize: "100px 100px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 70%, rgba(212, 175, 55, 0.03) 100%)",
          }}
        />
        {/* Sage Watercolor Washes */}
        <div
          className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full opacity-[0.45]"
          style={{
            background: "radial-gradient(circle, rgba(226, 232, 223, 0.44) 0%, rgba(226, 232, 223, 0.18) 42%, transparent 72%)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full opacity-[0.45]"
          style={{
            background: "radial-gradient(circle, rgba(226, 232, 223, 0.44) 0%, rgba(226, 232, 223, 0.18) 42%, transparent 72%)",
          }}
        />
      </div>

      {/* Subtitle / Header */}
      <div className="mb-8 z-10">
        <p className="text-body-sm uppercase tracking-[0.32em] text-gold-400 font-medium">
          Undangan Pernikahan
        </p>
        <div className="mt-4 flex items-center justify-center gap-3 text-gold-400/50">
          <span className="h-px w-8 bg-gold-400/30" />
          <span className="text-sm">◆</span>
          <span className="h-px w-8 bg-gold-400/30" />
        </div>
      </div>

      {/* 
        ENVELOPE SCENE CONTAINER
        - Dimensions: 300px x 200px (Landscape 3:2 aspect ratio)
      */}
      <div
        className="relative w-[300px] h-[200px] overflow-visible rounded-2xl flex flex-col items-center justify-end z-10 cursor-pointer"
        style={{ perspective: "1200px" }}
      >
        {/* ── 1. ENVELOPE BACK PANEL (z-10) ── */}
        <div
          className="absolute inset-0 rounded-2xl bg-[#E8ECE9] border border-[rgba(150,165,155,0.25)] shadow-sm z-10"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 40%, #EFF2F0 0%, #E8ECE9 100%)",
          }}
        />

        {/* ── 2. ENVELOPE TOP FLAP (Dynamic z-index: 50 closed, 5 open/opening) ── */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[130px] pointer-events-none"
          style={{
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
          initial={{ rotateX: 0, zIndex: 50, opacity: 1 }}
          animate={{
            rotateX: coverState === "closed" ? 0 : -160,
            zIndex: coverState === "closed" ? 50 : 5,
            opacity: coverState === "closed" ? 1 : 0.9,
          }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
            zIndex: { delay: coverState === "closed" ? 0.5 : 0.35 },
            delay: coverState === "opening" ? 0.2 : 0,
          }}
        >
          {/* Outer side of flap (Visible when CLOSED) */}
          <div
            className="absolute inset-0 z-30 backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <svg
              className="w-full h-full filter drop-shadow-md"
              viewBox="0 0 300 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0 L150 130 L300 0 Z" fill="#E8ECE9" />
              <path d="M0 0 L150 130 L300 0" stroke="rgba(150,165,155,0.3)" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Inner side of flap (Visible when OPENED) */}
          <div
            className="absolute inset-0 z-30"
            style={{
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <svg
              className="w-full h-full filter drop-shadow-sm"
              viewBox="0 0 300 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Rich Gold Gradient Lining */}
              <path d="M0 0 L150 130 L300 0 Z" fill="url(#goldGrad)" />
              {/* Decorative dashed gold crease line */}
              <path d="M8 0 L150 120 L292 0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
              
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="50%" stopColor="#f3e5ab" />
                  <stop offset="100%" stopColor="#aa7c11" />
                </linearGradient>
              </defs>
            </svg>
            {/* Monogram */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none">
              <span className="font-display font-light italic text-white/95 text-lg tracking-widest">
                {coupleInitials.split("").join(" ")}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── 3. INVITATION CARD (z-30, Slides out of top-[-150px] clipping zone) ── */}
        <div 
          className="absolute top-[-150px] left-0 right-0 h-[350px] overflow-hidden rounded-b-2xl z-30 pointer-events-none"
          style={{ clipPath: "inset(0px round 0px 0px 16px 16px)" }}
        >
          <motion.div
            className="absolute top-[155px] left-3 right-3 h-[190px] bg-white rounded-xl shadow-md border border-gold-200/20 flex flex-col items-center justify-between p-5 text-center pointer-events-auto"
            initial={shouldReduceMotion ? { y: cardTranslateY, scale: 1, opacity: 1 } : { y: 40, scale: 0.96, opacity: 0.95 }}
            animate={
              coverState === "closed"
                ? { y: 40, scale: 0.96, opacity: 0.95 }
                : { y: cardTranslateY, scale: 1, opacity: 1 }
            }
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 80,
              delay: coverState === "opening" ? 0.45 : 0,
            }}
          >
            <div className="w-full flex flex-col items-center pt-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-medium">
                Kepada Yth.
              </p>
              <h2 className="mt-2.5 font-display font-light text-xl italic text-slate-800 max-w-full break-words leading-tight px-1">
                {guestName}
              </h2>
              <div className="w-6 h-[0.5px] bg-gold-400/30 mt-3" />
            </div>

            <button
              type="button"
              disabled={coverState !== "opened"}
              onClick={(e) => {
                e.stopPropagation();
                onOpened();
              }}
              className={`w-full max-w-[160px] py-2 text-white rounded-full text-[10px] font-semibold tracking-wider transition-all uppercase shadow-gold mb-1 ${
                coverState === "opened"
                  ? "bg-gold-400 hover:bg-gold-500 cursor-pointer active:scale-[0.98]"
                  : "bg-gold-300/40 cursor-default opacity-50"
              }`}
            >
              Buka Undangan
            </button>
          </motion.div>
        </div>

        {/* ── 4. ENVELOPE FRONT POCKET (z-40, Pure CSS Folds with Shadow & Depth) ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[85px] z-40 pointer-events-none filter drop-shadow-[0_-3px_6px_rgba(0,0,0,0.06)]">
          {/* Left fold */}
          <div
            className="absolute inset-0 bg-[#EFF2F0] border-r border-black/5"
            style={{ clipPath: "polygon(0% 0%, 43.3% 100%, 0% 100%)" }}
          />
          {/* Right fold */}
          <div
            className="absolute inset-0 bg-[#EFF2F0] border-l border-black/5"
            style={{ clipPath: "polygon(100% 0%, 56.7% 100%, 100% 100%)" }}
          />
          {/* Bottom fold */}
          <div
            className="absolute inset-0 bg-[#E4EAE6]"
            style={{ clipPath: "polygon(0% 100%, 50% 47%, 100% 100%)" }}
          />
          {/* Gold seam trim lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 85" fill="none">
            <path d="M0 0 L130 85" stroke="rgba(150,165,155,0.3)" strokeWidth="1.2" />
            <path d="M300 0 L170 85" stroke="rgba(150,165,155,0.3)" strokeWidth="1.2" />
            <path d="M0 85 L150 40 L300 85" stroke="rgba(150,165,155,0.18)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* ── 5. OPEN BUTTON / WAX SEAL (z-60, Fades/scales out on click) ── */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-[102px] z-60"
          initial={{ scale: 1, opacity: 1 }}
          animate={
            coverState === "closed"
              ? { scale: 1, opacity: 1, pointerEvents: "auto" }
              : { scale: 0.95, opacity: 0, pointerEvents: "none" }
          }
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          <div className="relative flex items-center justify-center cursor-pointer active:scale-95 transition-transform">
            {/* Botanical Leaf ornament behind/above the seal */}
            <div className="absolute bottom-[36px] left-[-2px] pointer-events-none select-none w-14 h-14 origin-bottom -rotate-12 z-0">
              <svg
                className="w-full h-full text-gold-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 60 C32 60 12 42 16 26 C18 16 26 10 32 2 C38 10 46 16 48 26 C52 42 32 60 32 60 Z"
                  fill="rgba(212,175,55,0.2)"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M32 2 C32 2 30 18 24 26 M32 2 C32 2 34 18 40 26 M32 2 L32 50"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Crimson Red Wax Seal Shape */}
            <div className="w-14 h-14 rounded-[48%_52%_49%_51%] bg-gradient-to-br from-[#c0392b] via-[#e74c3c] to-[#962d22] shadow-[0_6px_12px_rgba(150,45,34,0.4),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center p-[3px] select-none active:scale-95 transition-transform">
              {/* Inner Stamped Area */}
              <div className="w-full h-full rounded-full border border-white/10 flex items-center justify-center bg-gradient-to-br from-[#962d22] to-[#78241b] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
                <span className="font-display font-semibold italic text-[#f3e5ab] text-sm tracking-wider mt-[1px]">
                  {coupleInitials}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Prompt text helper */}
      {coverState === "closed" && (
        <motion.p
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-6 text-body-sm text-slate-500 cursor-pointer select-none z-10"
          onClick={handleOpen}
        >
          Ketuk untuk Membuka
        </motion.p>
      )}
    </motion.div>
  );
}
