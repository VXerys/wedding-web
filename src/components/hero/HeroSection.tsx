"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CountdownTimer from "@/components/countdown/CountdownTimer";
import {
  fadeIn,
  fadeUp,
  staggerContainer,
  slideLeft,
  slideRight,
  scaleIn,
  lineExpand,
  labelFade,
  sectionViewport,
} from "@/lib/motionVariants";

interface HeroSectionProps {
  guestName?: string;
  isOpened?: boolean;
  onOpen?: () => void;
  showFooter?: boolean;
}

export default function HeroSection({
  guestName = "Tamu Undangan",
  isOpened = true,
  onOpen,
  showFooter = true,
}: HeroSectionProps) {
  const [isOpening, setIsOpening] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE ?? "2026-07-12T09:00:00+07:00";
  const eventDateText = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(eventDate));

  const heroMotion = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.25 },
      }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.8,
          delay: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
      };

  const handleOpenInvitation = () => {
    if (isOpened || isOpening) return;
    setIsOpening(true);
    window.setTimeout(() => {
      onOpen?.();
    }, prefersReducedMotion ? 0 : 520);
  };

  const cardMotion = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.25, delay: 0.1 },
      }
    : {
        initial: { opacity: 0, y: 18, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: {
          duration: 0.75,
          delay: 0.35,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
      };

  const imgTempleIllustration = "/images/figma/temple_illustration.png";
  const imgBrandonProfile = "/images/figma/brandon_profile.png";
  const imgMeycaProfile = "/images/figma/meyca_profile.png";
  const imgFadedTempleFooter = "/images/figma/faded_temple_footer.png";
  const imgBotanicalSketchBottom = "/images/figma/botanical_sketch_bottom.png";

  return (
    <div className="relative w-full min-h-screen text-[#1a1d14] font-body overflow-hidden">
      {/* Styles Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        .paper-texture {
          background-image: url('https://www.transparenttextures.com/patterns/p6.png');
          opacity: 0.15;
        }
        .watercolor-bloom {
          filter: blur(60px);
          opacity: 0.25;
          mix-blend-mode: multiply;
        }
        .gold-vignette {
          background: radial-gradient(circle at center, transparent 70%, rgba(212, 175, 55, 0.03) 100%);
        }
        .double-hairline-border {
          position: relative;
          box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.3), 0 0 0 4px rgba(212, 175, 55, 0.08);
        }
        .double-hairline-border::after {
          content: '';
          position: absolute;
          inset: -8px;
          border: 0.5px solid rgba(212, 175, 55, 0.15);
          border-radius: inherit;
          pointer-events: none;
        }
        .floating-leaf {
          animation: float 12s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -15px) rotate(5deg); }
          66% { transform: translate(-8px, -25px) rotate(-3deg); }
        }
        .fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .carved-shadow {
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8);
        }
        @keyframes shine {
          0% { x: -100%; }
          100% { x: 200%; }
        }
        .animate-shine {
          animation: shine 4.5s infinite linear;
        }
      ` }} />

      {/* Botanical Heritage Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Base Texture */}
        <div className="absolute inset-0 paper-texture"></div>
        <div className="absolute inset-0 gold-vignette"></div>
        {/* Sage Watercolor Washes */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] watercolor-bloom bg-[#e2e8df] rounded-full"></div>
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] watercolor-bloom bg-[#e2e8df] rounded-full"></div>
        <div className="absolute bottom-1/4 -left-40 w-[450px] h-[450px] watercolor-bloom bg-[#e9ece3] rounded-full"></div>
        <div className="absolute -bottom-20 right-0 w-[600px] h-[600px] watercolor-bloom bg-[#e2e8df] rounded-full"></div>
        {/* Background images removed as requested */}
        {/* Bottom transition mask to blend with the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDFCF9] to-transparent z-10" />
      </div>

      {/* Section 1: Hero Invitation */}
      <motion.section
        suppressHydrationWarning={true}
        className="relative min-h-[100svh] flex flex-col items-center justify-center px-[24px] py-8 z-10"
        initial={heroMotion.initial}
        animate={heroMotion.animate}
        transition={heroMotion.transition}
      >
        <div className="relative w-full max-w-[376px] min-h-[690px] bg-white/30 backdrop-blur-[1px] rounded-[15rem] flex flex-col items-center justify-center px-7 py-10 text-center double-hairline-border">
          <div className="absolute inset-[-8px] border border-[rgba(212,175,55,0.15)] rounded-[15.5rem] pointer-events-none" />
          <div className="relative z-10 flex w-full flex-col items-center gap-4">
            <span className="font-body text-[11px] text-[#5f5f58]/70 tracking-[0.4em] uppercase font-medium">
              THE WEDDING OF
            </span>
            <div className="flex flex-col items-center gap-1">
              <h1 className="font-display text-[54px] text-[#585e4d] italic font-light leading-none">
                Brandon
              </h1>
              <span className="font-display text-[30px] text-[#D4AF37] font-light leading-none">
                &amp;
              </span>
              <h1 className="font-display text-[54px] text-[#585e4d] italic font-light leading-none">
                Meyca
              </h1>
            </div>
            <p className="font-body text-[12px] text-[#5f5f58]/70 tracking-[0.18em] uppercase">
              {eventDateText}
            </p>

            <motion.div
              suppressHydrationWarning={true}
              className="relative mt-8 w-full max-w-[284px] overflow-hidden rounded-[26px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.46))] px-6 py-7 shadow-[0_26px_70px_rgba(88,94,77,0.14),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(212,175,55,0.08)] backdrop-blur-[22px]"
              initial={cardMotion.initial}
              animate={
                isOpening
                  ? { opacity: 1, y: -4, scale: 1.015 }
                  : isOpened
                    ? { opacity: 1, y: 0, scale: 1 }
                    : cardMotion.animate
              }
              whileHover={
                isOpened || isOpening
                  ? undefined
                  : {
                      scale: 1.025,
                      y: -4,
                      boxShadow: "0 30px 80px rgba(88,94,77,0.22)",
                      transition: { duration: 0.3, ease: "easeOut" }
                    }
              }
              transition={
                isOpening
                  ? { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }
                  : cardMotion.transition
              }
            >
              {/* Top radial glow */}
              <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.78),transparent_42%)] opacity-70" />
              
              {/* Gorgeous slanted white gloss shine sweeping across */}
              <motion.div
                className="pointer-events-none absolute -inset-y-32 -left-[100%] w-[200%] bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.6)_50%,rgba(255,255,255,0)_60%,transparent_65%)] opacity-80"
                animate={
                  isOpening || isOpened
                    ? { opacity: 0 }
                    : {
                        x: ["-30%", "130%"],
                      }
                }
                transition={
                  isOpening || isOpened
                    ? { duration: 0.5 }
                    : {
                        duration: 3.5,
                        repeat: Infinity,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        repeatDelay: 2,
                      }
                }
              />
              
              <motion.div
                className="pointer-events-none absolute inset-[-1px] rounded-[27px] border border-[#d4af37]/35"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isOpening || isOpened ? { opacity: [0, 1, 0.45], scale: [0.96, 1.03, 1] } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
              />

              {/* Continuous subtle shimmer effect */}
              <motion.div
                className="pointer-events-none absolute -inset-y-32 -left-[150%] w-[150%] rotate-45 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-md"
                initial={{ x: "-100%" }}
                animate={
                  isOpened
                    ? { opacity: 0 }
                    : isOpening
                    ? { x: ["-100%", "200%"], opacity: [0, 1, 0] }
                    : { x: ["-100%", "200%"] }
                }
                transition={
                  isOpened
                    ? { duration: 0.35 }
                    : isOpening
                    ? { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }
                    : { duration: 4.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }
                }
              />
              
              {/* Interactive glow (optional pulse if not opening) */}
              <motion.div
                className="pointer-events-none absolute -inset-0 rounded-[26px] border border-white/40"
                animate={isOpening || isOpened ? { opacity: 0 } : { opacity: [0, 0.4, 0] }}
                transition={
                  isOpening || isOpened
                    ? { duration: 0.35 }
                    : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }
              />
              {[
                "left-[18%] top-[28%]",
                "right-[20%] top-[34%]",
                "left-[24%] bottom-[26%]",
                "right-[18%] bottom-[30%]",
              ].map((position, index) => (
                <motion.span
                  key={position}
                  className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[#d4af37]/70 ${position}`}
                  initial={{ opacity: 0, scale: 0.4, y: 0 }}
                  animate={
                    isOpening
                      ? { opacity: [0, 1, 0], scale: [0.4, 1.15, 0.6], y: [0, -18, -26] }
                      : { opacity: 0, scale: 0.4, y: 0 }
                  }
                  transition={{
                    duration: 0.9,
                    delay: index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
              ))}

              <div className="relative z-10">
                <p className="font-body text-[9px] font-medium uppercase tracking-[0.24em] text-[#5f5f58]/60">
                  Dear Sir / Madam
                </p>
                <h2 className="mt-3 max-w-full break-words font-body text-[13px] font-semibold uppercase leading-[1.5] tracking-[0.18em] text-[#585e4d]">
                  {guestName}
                </h2>
                <p className="mx-auto mt-5 max-w-[200px] font-display text-[17px] font-light italic leading-[1.55] text-[#5f5f58]/80">
                  You are cordially invited to celebrate our union.
                </p>
                <motion.button
                  type="button"
                  onClick={handleOpenInvitation}
                  disabled={isOpened || isOpening}
                  suppressHydrationWarning={true}
                  className={`mx-auto mt-7 flex w-full max-w-[220px] items-center justify-center gap-3 rounded-full px-5 py-[15px] font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_34px_rgba(88,94,77,0.18)] transition-colors ${
                    isOpened || isOpening
                      ? "bg-[#c9a84c] cursor-default"
                      : "bg-[#585e4d] hover:bg-[#4e5545] cursor-pointer"
                  }`}
                  whileTap={prefersReducedMotion || isOpened || isOpening ? undefined : { scale: 0.97 }}
                  animate={
                    isOpening
                      ? { scale: [1, 0.97, 1.04, 1], y: [0, 1, -3, 0], opacity: 1 }
                      : prefersReducedMotion || isOpened
                        ? { opacity: 1 }
                        : { y: [0, -2, 0], opacity: [0.92, 1, 0.92] }
                  }
                  transition={
                    isOpening
                      ? { duration: 0.62, ease: [0.25, 0.46, 0.45, 0.94] }
                      : { duration: 2.2, repeat: isOpened ? 0 : Infinity, ease: "easeInOut" }
                  }
                >
                  <svg className="h-[17px] w-[17px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {isOpening ? "Opening" : isOpened ? "Opened" : "Open Invitation"}
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-4 w-full h-1/5 opacity-10 flex justify-center grayscale pointer-events-none">
            <Image
              alt="temple illustration"
              className="w-full h-full object-contain object-bottom scale-110"
              src={imgTempleIllustration}
              width={486}
              height={240}
              sizes="376px"
            />
          </div>
        </div>

        <motion.div
          className="mt-8 flex flex-col items-center"
          aria-hidden="true"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: isOpened ? 1 : 0, y: isOpened ? 0 : 8 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <motion.svg
            className="w-5 h-5 text-[#D4AF37]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            animate={prefersReducedMotion ? { opacity: 0.7 } : { opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
          </motion.svg>
        </motion.div>
      </motion.section>

      {/* Countdown Timer (Save The Date) */}
      <CountdownTimer />

      {/* Divider */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={fadeIn}
        className="relative w-full px-[24px] flex items-center justify-center py-10"
      >
        <div className="h-[0.5px] w-full bg-[#D4AF37]/20"></div>
        <div className="absolute bg-[#FDFCF9] px-6 flex items-center gap-2">
          {/* Flare icon SVG */}
          <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2 L14.5,9.5 L22,12 L14.5,14.5 L12,22 L9.5,14.5 L2,12 L9.5,9.5 Z" />
          </svg>
          {/* Spa/Lotus icon SVG */}
          <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,3 C12,3 15,7 15,11 C15,15 12,19 12,21 C12,19 9,15 9,11 C9,7 12,3 12,3 Z" />
          </svg>
          {/* Flare icon SVG */}
          <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2 L14.5,9.5 L22,12 L14.5,14.5 L12,22 L9.5,14.5 L2,12 L9.5,9.5 Z" />
          </svg>
        </div>
      </motion.div>

      {/* Section 2: The Happy Couple */}
      <section className="relative px-[24px] z-10 flex flex-col items-center pt-10 pb-4">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={fadeUp}
          className="font-display text-[20px] text-[#5f5f58]/70 italic text-center mb-16 max-w-[320px] font-light leading-relaxed"
        >
          &ldquo;With hearts full of joy, we invite you to share in the beginning of our new chapter together.&rdquo;
        </motion.p>
        
        {/* Brandon Profile */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={slideRight}
          className="flex flex-col items-center mb-20 w-full"
        >
          <div className="relative mb-8">
            {/* Frame Decoration */}
            <div className="absolute -top-6 -left-6 w-24 h-24 opacity-20 pointer-events-none">
              <Image
                alt="foliage"
                className="w-full h-full object-contain"
                src={imgBotanicalSketchBottom}
                width={96}
                height={96}
                sizes="96px"
              />
            </div>
            <div className="w-52 h-64 rounded-full overflow-hidden border-[4px] border-white shadow-xl relative z-10 double-hairline-border rotate-[-1deg]">
              {/* Outer hairline helper */}
              <div className="absolute inset-[-8px] border border-[rgba(212,175,55,0.15)] rounded-full pointer-events-none" />
              <Image
                alt="Brandon"
                className="w-full h-full object-cover"
                src={imgBrandonProfile}
                width={208}
                height={256}
                sizes="208px"
              />
            </div>
          </div>
          
          <div className="text-center flex flex-col items-center gap-2">
            <span className="font-body text-[10px] text-[#5f5f58]/40 tracking-[0.3em] uppercase">Only Child of Mr &amp; Mrs Lorem</span>
            <h2 className="font-display text-4xl text-[#585e4d] tracking-[0.15em] font-light flex items-center justify-center gap-2 leading-none mt-1">
              <span className="text-[#D4AF37] opacity-60 text-[0.6em] select-none">❦</span>BRANDON
            </h2>
            <div className="flex gap-4 mt-4">
              <a className="w-9 h-9 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#585e4d]/60 hover:text-[#D4AF37] transition-colors border border-[#D4AF37]/10" href="#">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                </svg>
              </a>
              <a className="w-9 h-9 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#585e4d]/60 hover:text-[#D4AF37] transition-colors border border-[#D4AF37]/10" href="#">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12l-5.25 3.03v-6.06L15.75 12z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Meyca Profile */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={slideLeft}
          className="flex flex-col items-center mb-8 w-full"
        >
          <div className="relative mb-8">
            {/* Frame Decoration */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-20 scale-x-[-1] pointer-events-none">
              <Image
                alt="foliage"
                className="w-full h-full object-contain"
                src={imgBotanicalSketchBottom}
                width={96}
                height={96}
                sizes="96px"
              />
            </div>
            <div className="w-52 h-64 rounded-full overflow-hidden border-[4px] border-white shadow-xl relative z-10 double-hairline-border rotate-[1deg]">
              {/* Outer hairline helper */}
              <div className="absolute inset-[-8px] border border-[rgba(212,175,55,0.15)] rounded-full pointer-events-none" />
              <Image
                alt="Meyca"
                className="w-full h-full object-cover"
                src={imgMeycaProfile}
                width={208}
                height={256}
                sizes="208px"
              />
            </div>
          </div>
          
          <div className="text-center flex flex-col items-center gap-2">
            <span className="font-body text-[10px] text-[#5f5f58]/40 tracking-[0.3em] uppercase">Eldest Daughter of Mr &amp; Mrs Ipsum</span>
            <h2 className="font-display text-4xl text-[#585e4d] tracking-[0.15em] font-light flex items-center justify-center gap-2 leading-none mt-1">
              <span className="text-[#D4AF37] opacity-60 text-[0.6em] select-none">❦</span>MEYCA
            </h2>
            <div className="flex gap-4 mt-4">
              <a className="w-9 h-9 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#585e4d]/60 hover:text-[#D4AF37] transition-colors border border-[#D4AF37]/10" href="#">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                </svg>
              </a>
              <a className="w-9 h-9 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#585e4d]/60 hover:text-[#D4AF37] transition-colors border border-[#D4AF37]/10" href="#">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12l-5.25 3.03v-6.06L15.75 12z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer / Closing */}
      {showFooter && (
        <footer className="relative min-h-[400px] flex flex-col items-center justify-center text-center px-[24px] pb-32 z-10">
          {/* Ethereal Close Background */}
          <div className="absolute inset-0 grayscale opacity-[0.02] pointer-events-none overflow-hidden">
            <Image
              alt="faded temple"
              className="w-full h-full object-cover scale-150"
              src={imgFadedTempleFooter}
              width={430}
              height={400}
              sizes="430px"
            />
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <motion.p
              variants={fadeUp}
              className="font-display text-[20px] text-[#5f5f58]/60 italic max-w-[280px] font-light leading-relaxed"
            >
              With gratitude from the families of
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-[48px] text-[#585e4d] italic font-light leading-none tracking-[-1.2px]"
            >
              Brandon &amp; Meyca
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="flex flex-col items-center gap-4 pt-8"
            >
              <motion.div variants={lineExpand} className="w-10 h-[1px] bg-[#D4AF37]/30"></motion.div>
              {/* Heart Icon SVG */}
              <motion.svg
                variants={fadeUp}
                className="w-7 h-7 text-[#D4AF37]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </motion.svg>
              <motion.span
                variants={labelFade}
                className="font-body text-[10px] tracking-[0.5em] text-[#5f5f58]/40 uppercase font-medium"
              >
                Thank You
              </motion.span>
            </motion.div>
          </motion.div>
        </footer>
      )}
    </div>
  );
}
