"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import CountdownTimer from "@/components/countdown/CountdownTimer";
import InvitationPaperCard from "@/components/hero/InvitationPaperCard";
import {
  fadeIn,
  fadeUp,
  staggerContainer,
  slideLeft,
  slideRight,
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

const IMG_BRANDON_PROFILE = "/images/figma/brandon_profile.png";
const IMG_MEYCA_PROFILE = "/images/figma/meyca_profile.png";
const IMG_FADED_TEMPLE_FOOTER = "/images/figma/faded_temple_footer.png";

export default function HeroSection({
  guestName = "Tamu Undangan",
  isOpened = true,
  onOpen,
  showFooter = true,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE ?? "2026-07-12T09:00:00+07:00";
  const eventDateText = useMemo(
    () =>
      new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      }).format(new Date(eventDate)),
    [eventDate]
  );

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

  return (
    <div className="relative w-full min-h-screen text-[#1a1d14] font-body overflow-hidden">
      {/* Botanical Heritage Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Base Texture */}
        <div className="absolute inset-0 paper-texture"></div>
        <div className="absolute inset-0 gold-vignette"></div>
        {/* Sage Watercolor Washes removed */}
        {/* Background images removed as requested */}
        {/* Bottom transition mask to blend with the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDFCF9] to-transparent z-10" />
      </div>

      {/* Section 1: Hero Invitation */}
      <motion.section
        suppressHydrationWarning={true}
        className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 py-4 xs:px-[24px] xs:py-6 z-10"
        initial={heroMotion.initial}
        animate={heroMotion.animate}
        transition={heroMotion.transition}
      >
        <div className="relative w-full max-w-[320px] xs:max-w-[376px] h-[72svh] min-h-[500px] max-h-[580px] xs:h-[72svh] xs:min-h-[560px] xs:max-h-[640px] sm:h-[75svh] sm:min-h-[620px] sm:max-h-[700px] bg-white/30 md:backdrop-blur-[1px] rounded-[10rem] xs:rounded-[13rem] sm:rounded-[15rem] flex flex-col items-center justify-center px-4 py-6 xs:px-7 xs:py-8 text-center double-hairline-border">
          <div className="absolute inset-[-8px] border border-[rgba(212,175,55,0.15)] rounded-[10.5rem] xs:rounded-[13.5rem] sm:rounded-[15.5rem] pointer-events-none" />
          <div className="relative z-10 flex w-full flex-col items-center gap-3 xs:gap-4">
            <div className="w-[70px] h-[70px] xs:w-[85px] xs:h-[85px] relative flex items-center justify-center mb-1">
              <Image
                alt="centered home"
                className="w-full h-full object-contain opacity-90"
                src="/images/centered-home.svg"
                width={90}
                height={90}
                preload
              />
            </div>
            <span className="font-body text-[10px] xs:text-[11px] text-[#5f5f58]/70 tracking-[0.4em] uppercase font-medium">
              THE WEDDING OF
            </span>
            <div className="flex flex-col items-center gap-0.5 xs:gap-1">
              <h1 className="font-display text-[44px] xs:text-[48px] sm:text-[54px] text-[#585e4d] italic font-light leading-none">
                Abudzar
              </h1>
              <span className="font-display text-[24px] xs:text-[28px] sm:text-[30px] text-[#D4AF37] font-light leading-none">
                &amp;
              </span>
              <h1 className="font-display text-[44px] xs:text-[48px] sm:text-[54px] text-[#585e4d] italic font-light leading-none">
                Intan
              </h1>
            </div>
            <p className="font-body text-[11px] xs:text-[12px] text-[#5f5f58]/70 tracking-[0.18em] uppercase">
              {eventDateText}
            </p>

            <InvitationPaperCard guestName={guestName} />
          </div>

          {/* Temple illustration removed as requested */}
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
        className="w-full px-[24px] flex flex-col items-center justify-center py-8"
      >
        <div className="flex items-center justify-center w-full gap-4">
          <span className="block h-px flex-1 bg-[#D4AF37]/30" />
          <img
            alt="divider ornament"
            src="/images/centered-divider.svg"
            style={{ width: 80, height: 80, objectFit: "contain", opacity: 0.82 }}
          />
          <span className="block h-px flex-1 bg-[#D4AF37]/30" />
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
          className="flex flex-col items-center mb-20 w-full transform-gpu"
          style={{ contain: "paint", isolation: "isolate" }}
        >
          <div className="relative mb-8">
            <div className="w-52 h-64 rounded-full overflow-hidden border-[4px] border-white shadow-xl relative z-10 double-hairline-border rotate-[-1deg]">
              {/* Outer hairline helper */}
              <div className="absolute inset-[-8px] border border-[rgba(212,175,55,0.15)] rounded-full pointer-events-none" />
              <Image
                alt="Brandon"
                className="w-full h-full object-cover"
                src={IMG_BRANDON_PROFILE}
                width={208}
                height={256}
                sizes="208px"
                fetchPriority="high"
              />
            </div>
          </div>
          
          <div className="text-center flex flex-col items-center gap-2">
            <span className="font-body text-[10px] text-[#5f5f58]/40 tracking-[0.3em] uppercase">Putra dari Bpk. Rudi Tamim KH &amp; Ibu Nani Sumarni</span>
            <h2 className="font-display text-4xl text-[#585e4d] tracking-[0.15em] font-light flex items-center justify-center gap-2 leading-none mt-1">
              <span className="text-[#D4AF37] opacity-60 text-[0.6em] select-none">❦</span>ABUDZAR
            </h2>
          </div>
        </motion.div>
        
        {/* Meyca Profile */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={slideLeft}
          className="flex flex-col items-center mb-8 w-full transform-gpu"
          style={{ contain: "paint", isolation: "isolate" }}
        >
          <div className="relative mb-8">
            <div className="w-52 h-64 rounded-full overflow-hidden border-[4px] border-white shadow-xl relative z-10 double-hairline-border rotate-[1deg]">
              {/* Outer hairline helper */}
              <div className="absolute inset-[-8px] border border-[rgba(212,175,55,0.15)] rounded-full pointer-events-none" />
              <Image
                alt="Meyca"
                className="w-full h-full object-cover"
                src={IMG_MEYCA_PROFILE}
                width={208}
                height={256}
                sizes="208px"
                fetchPriority="high"
              />
            </div>
          </div>
          
          <div className="text-center flex flex-col items-center gap-2">
            <span className="font-body text-[10px] text-[#5f5f58]/40 tracking-[0.3em] uppercase">Putri dari Bpk. Himan Nugraha &amp; Ibu Ai Rohimah</span>
            <h2 className="font-display text-4xl text-[#585e4d] tracking-[0.15em] font-light flex items-center justify-center gap-2 leading-none mt-1">
              <span className="text-[#D4AF37] opacity-60 text-[0.6em] select-none">❦</span>INTAN
            </h2>
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
              src={IMG_FADED_TEMPLE_FOOTER}
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
              Abudzar &amp; Intan
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
