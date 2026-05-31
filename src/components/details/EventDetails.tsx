"use client";

import { memo, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  labelFade,
  lineExpand,
  cardRise,
  sectionViewport,
} from "@/lib/motionVariants";

interface EventDetailsProps {
  guestName?: string;
  children?: ReactNode;
  showFooter?: boolean;
}

const imgBotanical1 = "/images/corner-acara.svg";
const imgBotanical2 = "/images/corner-acara.svg";
const imgIcon = "/images/figma/8bb27d8679887499077b1019b0deade4bec132f9.svg";
const imgContainer1 = "/images/figma/e009ff2efd2048f5dc22b9cc5eabd9fb1beed9bb.svg";
const imgContainer2 = "/images/figma/970b3fe4ee7db38ce0afbe3361524e81fe190ad9.svg";
const imgContainer3 = "/images/figma/74cbb449b4007381b2e0d44b230d55a566c8aefd.svg";
const imgContainer4 = "/images/figma/3c32ef3ac9d7a54e19a727e671662fdb5289ea62.svg";
const imgIcon2 = "/images/figma/cea24c81bc9873e3acccde10cb974e063df0d38a.svg";
const mapsUrl =
  process.env.NEXT_PUBLIC_MAPS_URL ??
  "https://maps.google.com/?q=-6.2088,106.8456";

function EventDetails({ guestName: _guestName = "", children, showFooter = true }: EventDetailsProps) {
  const prefersReducedMotion = useReducedMotion();
  const viewport = prefersReducedMotion ? { once: true, amount: 0.05 } : sectionViewport;
  const reducedVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } };


  return (
    <div className="relative w-full flex flex-col items-center overflow-x-hidden">
      {/* Background repeating grid pattern */}
      <div className="absolute inset-0 section-grid-texture pointer-events-none" />

      {/* Decorative background blurs removed */}

      {/* Botanical Corner Decoration - top right */}
      <div className="absolute right-0 top-0 w-[160px] h-[160px] flex items-start justify-end pointer-events-none z-0 overflow-hidden">
        <img
          alt=""
          className="w-full h-full object-contain opacity-[0.12]"
          src={imgBotanical1}
        />
      </div>

      {/* Botanical Corner Decoration - bottom left */}
      <div className="absolute left-0 bottom-0 w-[140px] h-[140px] flex items-end justify-start pointer-events-none z-0 overflow-hidden">
        <img
          alt=""
          className="w-full h-full object-contain rotate-180 opacity-[0.10]"
          src={imgBotanical2}
        />
      </div>

      {/* Smooth Transition Masks */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FDFCF9] to-transparent pointer-events-none z-15" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDFCF9] to-transparent pointer-events-none z-15" />

      {/* Main Container */}
      <div className="flex flex-col gap-[32px] items-center w-full max-w-[480px] pb-[48px] pt-[40px] px-[24px] relative z-25">
        
        {/* Section Intro */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={prefersReducedMotion ? reducedVariants : staggerContainer}
          className="w-full flex flex-col gap-[4px] items-center relative"
        >
          <motion.span
            variants={labelFade}
            className="font-body font-semibold text-[13px] text-center tracking-[1.56px] text-[#5f5f58] uppercase"
          >
            EVENT DETAILS
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-light italic text-[42px] text-center text-[#585e4d] leading-[42px] tracking-[-0.42px]"
          >
            Detail Acara
          </motion.h2>
          <motion.div
            variants={lineExpand}
            className="flex items-center justify-center pt-[12px] w-full"
          >
            <div className="flex items-center justify-center gap-3 w-full max-w-[240px]">
              <span className="block h-px flex-1 bg-[rgba(201,168,76,0.4)]" />
              <img
                alt="divider icon"
                src="/images/figma/d745edfa5a6618dd70dff20b2a6531d6e9e0306d.svg"
                style={{ width: 16, height: 16, objectFit: "contain" }}
              />
              <span className="block h-px flex-1 bg-[rgba(201,168,76,0.4)]" />
            </div>
          </motion.div>
        </motion.div>

        {/* Event Cards Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={prefersReducedMotion ? reducedVariants : staggerContainer}
          className="w-full flex flex-col gap-[16px] items-center relative"
        >
          
          {/* Card 1: Akad Nikah & Resepsi */}
          <motion.div
            variants={cardRise}
            className="md:backdrop-blur-[6px] bg-[rgba(253,252,249,0.8)] flex flex-col gap-[24px] items-center p-[40px] relative rounded-tl-[100px] rounded-tr-[100px] rounded-bl-[48px] rounded-br-[48px] w-full shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.05)] border border-[rgba(201,168,76,0.15)] transform-gpu"
            style={{ contain: "paint", isolation: "isolate" }}
          >
            <div className="w-full flex flex-col items-center">
              <div className="w-[27px] h-[24px] relative flex items-center justify-center animate-bounce-slow">
                <img alt="Heart icon" className="w-full h-full object-contain" src={imgIcon} />
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
              <h3 className="font-display font-light italic text-[30px] text-center text-[#585e4d] leading-[36px]">
                Akad Nikah &amp; Resepsi
              </h3>
            </div>

            <div className="w-full flex flex-col gap-[15.5px] items-center">
              {/* Date */}
              <div className="flex gap-[8px] items-center justify-center w-full">
                <div className="w-[10.667px] h-[12.154px] relative flex items-center justify-center">
                  <img alt="Calendar" className="w-full h-full object-contain" src={imgContainer1} />
                </div>
                <span className="font-body font-normal text-[16px] text-[rgba(95,95,88,0.8)] text-center leading-[24px]">
                  Sabtu, 6 Juni 2026
                </span>
              </div>

              {/* Time */}
              <div className="flex gap-[8px] items-center justify-center w-full">
                <div className="w-[12px] h-[12px] relative flex items-center justify-center">
                  <img alt="Clock" className="w-full h-full object-contain" src={imgContainer2} />
                </div>
                <span className="font-body font-normal text-[16px] text-[rgba(95,95,88,0.8)] text-center leading-[24px]">
                  09:00 - 17:00 WIB
                </span>
              </div>

              {/* Venue Address Section */}
              <div className="border-t border-[rgba(201,168,76,0.1)] border-solid flex flex-col gap-[8px] items-center pt-[25px] w-full">
                <h4 className="font-body font-normal text-[16px] text-[#585e4d] text-center leading-[24px]">
                  Kp. Cikored
                </h4>
                <p className="font-body italic text-[12px] text-[rgba(95,95,88,0.8)] text-center leading-[18px] opacity-70 max-w-[280px]">
                  RT 007 / RW 006, Kelurahan Pasir Suren,<br />
                  Kecamatan Palabuhan Ratu
                </p>
              </div>
            </div>
          </motion.div>

          {/* Interactive Tiles */}
          <div className="grid grid-cols-2 gap-[16px] w-full">
            {/* Tile 1: Buka Maps */}
            <motion.a
              variants={cardRise}
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="md:backdrop-blur-[2px] bg-[rgba(255,255,255,0.5)] border border-[rgba(201,168,76,0.2)] border-solid flex flex-col gap-[11px] items-center justify-center px-[20px] py-[32.5px] rounded-none shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.05)] cursor-pointer hover:bg-white/70 transition-all duration-300 active:scale-95 transform-gpu"
              style={{ contain: "paint", isolation: "isolate" }}
            >
              <div className="w-[22.5px] h-[22.5px] relative flex items-center justify-center">
                <img alt="Compass" className="w-full h-full object-contain" src={imgContainer3} />
              </div>
              <span className="font-body font-medium text-[11px] text-center tracking-[1.32px] text-[#c9a84c]">
                BUKA MAPS
              </span>
            </motion.a>

            {/* Tile 2: Dress Code */}
            <motion.div
              variants={cardRise}
              className="md:backdrop-blur-[2px] bg-[rgba(255,255,255,0.5)] border border-[rgba(201,168,76,0.2)] border-solid flex flex-col gap-[11px] items-center justify-center p-[25px] rounded-none shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.05)] transform-gpu"
              style={{ contain: "paint", isolation: "isolate" }}
            >
              <div className="w-[22.524px] h-[17.5px] relative flex items-center justify-center">
                <img alt="Hanger" className="w-full h-full object-contain" src={imgContainer4} />
              </div>
              <div className="flex flex-col items-center">
                <span className="font-body font-medium text-[11px] text-center tracking-[1.32px] text-[#c9a84c] mb-1">
                  DRESS CODE
                </span>
                <span className="font-body font-normal text-[10px] text-[rgba(95,95,88,0.6)] text-center leading-[15px]">
                  Batik / Pakaian Formal
                </span>
              </div>
            </motion.div>
          </div>

        </motion.div>
        {children}
        {/* Footer */}
        {showFooter && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={prefersReducedMotion ? reducedVariants : staggerContainer}
            className="w-full flex flex-col items-center pb-[128px] pt-[32px]"
          >
            <div className="flex flex-col gap-[23.6px] items-center">
              <motion.p
                variants={fadeUp}
                className="font-display font-light italic text-[18px] text-[rgba(95,95,88,0.6)] text-center leading-[29.25px]"
              >
                With gratitude from the families of
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display font-light italic text-[48px] text-center text-[#585e4d] leading-[48px] tracking-[-1.2px]"
              >
                Abudzar &amp; Intan
              </motion.h2>
              <motion.div
                variants={prefersReducedMotion ? reducedVariants : staggerContainer}
                className="flex flex-col gap-[11.8px] items-center pt-[24px]"
              >
                <motion.div variants={lineExpand} className="bg-[rgba(201,168,76,0.3)] h-[1px] w-[40px]" />
                <motion.div variants={fadeUp} className="w-[18px] h-[16px] relative flex items-center justify-center">
                  <img alt="Heart" className="w-full h-full object-contain" src={imgIcon2} />
                </motion.div>
                <motion.span
                  variants={labelFade}
                  className="font-body font-normal text-[9px] text-[rgba(95,95,88,0.4)] text-center tracking-[4.5px] uppercase"
                >
                  THANK YOU — 2026
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default memo(EventDetails);
