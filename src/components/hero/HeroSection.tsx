"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
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

export default function HeroSection({
  guestName = "Tamu Undangan",
  isOpened = true,
  onOpen,
  showFooter = true,
}: HeroSectionProps) {
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

  const imgBrandonProfile = "/images/figma/brandon_profile.png";
  const imgMeycaProfile = "/images/figma/meyca_profile.png";
  const imgFadedTempleFooter = "/images/figma/faded_temple_footer.png";

  return (
    <div className="relative w-full min-h-screen text-[#1a1d14] font-body overflow-hidden">
      {/* Styles Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        .paper-texture {
          background-image: url('https://www.transparenttextures.com/patterns/p6.png');
          opacity: 0.15;
        }
        .watercolor-bloom {
          background: radial-gradient(circle, rgba(226, 232, 223, 0.44) 0%, rgba(226, 232, 223, 0.18) 42%, transparent 72%);
          opacity: 0.55;
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
        <div className="relative w-full max-w-[376px] min-h-[690px] bg-white/30 md:backdrop-blur-[1px] rounded-[15rem] flex flex-col items-center justify-center px-7 py-10 text-center double-hairline-border">
          <div className="absolute inset-[-8px] border border-[rgba(212,175,55,0.15)] rounded-[15.5rem] pointer-events-none" />
          <div className="relative z-10 flex w-full flex-col items-center gap-4">
            <div className="w-[90px] h-[90px] relative flex items-center justify-center mb-2">
              <Image
                alt="centered home"
                className="w-full h-full object-contain"
                style={{ filter: "sepia(1) saturate(2) hue-rotate(5deg) brightness(0.85)" }}
                src="/images/centered-home.svg"
                width={90}
                height={90}
              />
            </div>
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
            style={{ width: 80, height: 80, objectFit: "contain", filter: "sepia(1) saturate(3) hue-rotate(5deg) brightness(0.75)" }}
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
          className="flex flex-col items-center mb-20 w-full"
        >
          <div className="relative mb-8">
            {/* Frame Decoration - top left */}
            <div className="absolute -top-5 -left-5 w-20 h-20 pointer-events-none overflow-hidden">
              <img
                alt=""
                className="w-full h-full object-contain"
                style={{ filter: "sepia(1) saturate(1.5) hue-rotate(5deg) brightness(0.85) opacity(0.22)" }}
                src="/images/corner-acara.svg"
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
            {/* Frame Decoration - bottom right */}
            <div className="absolute -bottom-5 -right-5 w-20 h-20 pointer-events-none overflow-hidden">
              <img
                alt=""
                className="w-full h-full object-contain rotate-180"
                style={{ filter: "sepia(1) saturate(1.5) hue-rotate(5deg) brightness(0.85) opacity(0.22)" }}
                src="/images/corner-acara.svg"
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
