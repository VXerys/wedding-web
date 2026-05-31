"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import BsiCardPreview from "@/components/gift/BsiCardPreview";
import { useLenis } from "@/components/LenisProvider";
import {
  fadeIn,
  fadeUp,
  staggerContainer,
  lineExpand,
  scaleIn,
  slideRight,
  cardRise,
  sectionViewport,
} from "@/lib/motionVariants";

interface GiftTabProps {
  showHeader?: boolean;
  showFooter?: boolean;
}

function GiftTab({ showHeader = true, showFooter = true }: GiftTabProps) {
  const prefersReducedMotion = useReducedMotion();
  const viewport = prefersReducedMotion ? { once: true, amount: 0.05 } : sectionViewport;
  const reducedVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } };

  const lenis = useLenis();
  const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL ?? "https://maps.google.com";

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { duration: 1.05 });
        return;
      }
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);

  const imgBotanical1 = "/images/corner-acara.svg";
  const imgBotanical2 = "/images/corner-acara.svg";
  const imgFooterLeaf = "/images/figma/4950129f7a7d256f5721da392cec38d7d6b33daf.png";
  const imgDivider = "/images/centered-divider.svg";
  const imgCopyIcon = "/images/figma/1596a5ebf350c38a8e0ccdfd74a40ed2bada6a04.svg";
  const imgGiftBoxIcon = "/images/figma/a67be60163fb2bf6ebdb1714f85f57a4de0e44d9.svg";
  const imgMapPinIcon = "/images/figma/cca2eb24a5239f24fdb67d5c4180683dbb6f8aff.svg";
  const imgHamburger = "/images/figma/531faefa967f7d215c032575637015a00825ce90.svg";

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverCapability = () => setCanHover(hoverQuery.matches);

    updateHoverCapability();
    hoverQuery.addEventListener("change", updateHoverCapability);

    return () => hoverQuery.removeEventListener("change", updateHoverCapability);
  }, []);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="relative w-full flex flex-col items-center overflow-x-hidden">
      {/* Background Repeating Grid Pattern */}
      <div className="absolute inset-0 section-grid-texture pointer-events-none z-3" />

      {/* Decorative Blurs removed */}

      {/* Botanical Corner Decoration - top right */}
      <div className="absolute right-0 top-0 w-[160px] h-[160px] flex items-start justify-end pointer-events-none z-4 overflow-hidden">
        <img
          alt=""
          className="w-full h-full object-contain opacity-[0.12]"
          src={imgBotanical1}
        />
      </div>

      {/* Botanical Corner Decoration - bottom left */}
      <div className="absolute left-0 bottom-0 w-[140px] h-[140px] flex items-end justify-start pointer-events-none z-4 overflow-hidden">
        <img
          alt=""
          className="w-full h-full object-contain rotate-180 opacity-[0.10]"
          src={imgBotanical2}
        />
      </div>

      {/* Smooth Transition Masks */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FDFCF9] to-transparent pointer-events-none z-6" />

      {/* Header */}
      {showHeader && (
        <div className="md:backdrop-blur-[6px] bg-[rgba(253,252,249,0.6)] border-b border-solid border-[rgba(201,168,76,0.1)] flex h-[64px] items-center justify-between px-6 relative w-full z-10">
          <div className="w-[13.3px] h-[8.7px] relative cursor-pointer hover:opacity-75 transition-opacity">
            <img alt="Menu" className="w-full h-full object-contain" src={imgHamburger} />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-display font-light italic text-[24px] tracking-[-0.6px] text-[#1a1d14]">
              A & I
            </h1>
          </div>
          <div className="w-4" /> {/* Spacer */}
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center w-full max-w-[480px] pt-[32px] pb-[40px] px-6 relative z-7">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={prefersReducedMotion ? reducedVariants : staggerContainer}
          className="w-full flex flex-col gap-[16px] items-center mb-[40px]"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display font-light italic text-[36px] text-center text-[#1a1d14] leading-[40px]"
          >
            Wedding Gift
          </motion.h2>
          <motion.div
            variants={lineExpand}
            className="flex items-center justify-center w-full"
          >
            <div className="flex items-center justify-center w-full max-w-[240px] gap-4">
              <span className="block h-px flex-1 bg-[#c9a84c]/30" />
              <img
                alt="divider ornament"
                src="/images/centered-divider.svg"
                style={{ width: 72, height: 72, objectFit: "contain", opacity: 0.82 }}
              />
              <span className="block h-px flex-1 bg-[#c9a84c]/30" />
            </div>
          </motion.div>
        </motion.div>

        {/* Opening Message */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeIn}
          className="w-full text-center px-4 mb-[48px]"
        >
          <p className="font-display font-light italic text-[20px] text-[#5f5f58] leading-[32.5px]">
            &ldquo;Your presence is our greatest gift, but if you wish to honor us with a gift, your kindness would be deeply appreciated.&rdquo;
          </p>
        </motion.div>

        {/* Bank & Gift Cards Container */}
        <div 
          className="w-full flex flex-col gap-[24px] items-center mb-[48px]"
          style={{ perspective: 1000 }} // For 3D Tilt Hover
        >
          
          {/* Card 1: Bank BSI */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideRight} // Slides from left
            whileHover={canHover ? { scale: 1.01, transition: { duration: 0.3 } } : undefined}
            className="md:backdrop-blur-[6px] bg-[rgba(255,255,255,0.5)] border border-solid border-[rgba(201,168,76,0.15)] p-2.5 relative rounded-tl-[72px] rounded-tr-[72px] rounded-bl-none rounded-br-none shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.05)] w-full transform-gpu"
            style={{ contain: "paint", isolation: "isolate" }}
          >
            <div className="w-full h-full border border-dashed border-[#c9a84c]/25 rounded-tl-[64px] rounded-tr-[64px] rounded-bl-none rounded-br-none px-4 pb-6 pt-9 flex flex-col items-center gap-5 relative">
              {/* Elegant Top Ornament */}
              <div className="flex items-center justify-center text-[#c9a84c] mb-1 opacity-80">
                <svg className="w-12 h-6" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M11 6C8 4 5 5 2 7C5 7 8 8 11 6Z" fill="currentColor" opacity="0.15" />
                  <path d="M11 6C9 3 7 3 5 4C7 5 8 5 11 6Z" fill="currentColor" opacity="0.15" />
                  <path d="M13 6C16 4 19 5 22 7C19 7 16 8 13 6Z" fill="currentColor" opacity="0.15" />
                  <path d="M13 6C15 3 17 3 19 4C17 5 16 5 13 6Z" fill="currentColor" opacity="0.15" />
                  <circle cx="12" cy="6" r="1.2" fill="currentColor" />
                </svg>
              </div>

              <BsiCardPreview />

              {/* Copy Button */}
              <button
                onClick={() => handleCopy("bsi", "7147778888")}
                className="bg-[rgba(201,168,76,0.05)] border border-solid border-[rgba(201,168,76,0.3)] flex gap-[8px] items-center px-[25px] py-[9px] rounded-full hover:bg-[rgba(201,168,76,0.1)] active:scale-[0.97] transition-all cursor-pointer relative z-10"
              >
                <div className="w-[8.1px] h-[9.9px] relative flex items-center justify-center">
                  {copiedId === "bsi" ? (
                    <span className="text-[#c9a84c] text-[10px] font-bold">✓</span>
                  ) : (
                    <img alt="" className="w-full h-full object-contain" src={imgCopyIcon} />
                  )}
                </div>
                <span className="font-body font-normal text-[11px] text-[#c9a84c] tracking-[0.55px] uppercase">
                  {copiedId === "bsi" ? "COPIED!" : "COPY NUMBER"}
                </span>
              </button>
            </div>
          </motion.div>

          {/* Card 2: Physical Address */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={scaleIn} // Scales in
            whileHover={canHover ? { scale: 1.01, transition: { duration: 0.3 } } : undefined}
            className="md:backdrop-blur-[6px] bg-[rgba(255,255,255,0.5)] border border-solid border-[rgba(201,168,76,0.15)] p-2.5 relative rounded-tl-none rounded-tr-none rounded-bl-[72px] rounded-br-[72px] shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.05)] w-full transform-gpu"
            style={{ contain: "paint", isolation: "isolate" }}
          >
            <div className="w-full h-full border border-dashed border-[#c9a84c]/25 rounded-tl-none rounded-tr-none rounded-bl-[64px] rounded-br-[64px] px-4 pb-6 pt-9 flex flex-col gap-4 items-center">
              {/* Elegant Top Ornament */}
              <div className="flex items-center justify-center text-[#c9a84c] mb-1 opacity-80">
                <svg className="w-12 h-6" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M11 6C8 4 5 5 2 7C5 7 8 8 11 6Z" fill="currentColor" opacity="0.15" />
                  <path d="M11 6C9 3 7 3 5 4C7 5 8 5 11 6Z" fill="currentColor" opacity="0.15" />
                  <path d="M13 6C16 4 19 5 22 7C19 7 16 8 13 6Z" fill="currentColor" opacity="0.15" />
                  <path d="M13 6C15 3 17 3 19 4C17 5 16 5 13 6Z" fill="currentColor" opacity="0.15" />
                  <circle cx="12" cy="6" r="1.2" fill="currentColor" />
                </svg>
              </div>

              <div className="w-[24px] h-[21.2px] relative flex items-center justify-center">
                <img alt="Gift Box" className="w-full h-full object-contain animate-bounce-slow" src={imgGiftBoxIcon} />
              </div>
              <span className="font-body font-normal text-[11px] text-[rgba(95,95,88,0.7)] text-center tracking-[3.3px] uppercase">
                PHYSICAL GIFTS
              </span>
              
              <div className="w-full flex flex-col gap-[11.2px] items-center py-2">
                <h4 className="font-display font-light italic text-[24px] text-center text-[#1a1d14] leading-[32px]">
                  Kp. Cikored
                </h4>
                <p className="font-body font-normal text-[14px] text-[rgba(95,95,88,0.8)] text-center leading-[22.75px]">
                  RT 007 / RW 006, Kelurahan Pasir Suren,<br />
                  Kecamatan Palabuhan Ratu
                </p>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-solid border-[rgba(201,168,76,0.35)] flex gap-[8px] items-center pb-[5px] cursor-pointer hover:border-[#c9a84c] transition-colors"
              >
                <div className="w-[8.2px] h-[10.5px] relative flex items-center justify-center">
                  <img alt="" className="w-full h-full object-contain" src={imgMapPinIcon} />
                </div>
                <span className="font-body font-normal text-[11px] text-[#c9a84c] tracking-[1.1px] uppercase">
                  VIEW ON MAPS
                </span>
              </a>
            </div>
          </motion.div>

        </div>

        {/* Closing Note */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeIn}
          className="w-full text-center py-6 mb-6"
        >
          <p className="font-display font-light italic text-[20px] text-[#585e4d] leading-[30px] px-4">
            Doa restu Anda adalah kado terindah bagi kami. Terima kasih atas segala kebaikan dan kebersamaan Anda.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 opacity-40">
            <span className="block h-[1px] w-8 bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs">❦</span>
            <span className="block h-[1px] w-8 bg-[#c9a84c]" />
          </div>
        </motion.div>

      </div>

      {/* Footer */}
      {showFooter && (
        <div className="relative w-full flex flex-col items-center px-6 py-[64px] z-6 overflow-hidden border-t border-[rgba(201,168,76,0.1)]">
          {/* Background Footer Leaf Illustration */}
          <div className="absolute inset-0 opacity-3 pointer-events-none flex items-center justify-center">
            <Image
              alt=""
              className="w-full h-full object-cover max-w-none scale-110"
              src={imgFooterLeaf}
              width={430}
              height={430}
              sizes="430px"
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={prefersReducedMotion ? reducedVariants : staggerContainer}
            className="flex flex-col items-center pt-[32px] relative z-10 w-full"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display font-light italic text-[36px] text-center text-[#1a1d14] leading-[40px] mb-8"
            >
              A & I
            </motion.h2>
            
            <motion.div
              variants={fadeUp}
              className="flex gap-[24px] sm:gap-[32px] justify-center items-center mb-12 flex-wrap"
            >
              <button
                onClick={() => handleScrollTo("section-home")}
                className="bg-transparent border-none p-0 cursor-pointer font-body font-normal text-[11px] text-[rgba(95,95,88,0.6)] tracking-[1.1px] uppercase hover:text-[#1a1d14] transition-colors"
              >
                SAVE THE DATE
              </button>
              <button
                onClick={() => handleScrollTo("section-gallery")}
                className="bg-transparent border-none p-0 cursor-pointer font-body font-normal text-[11px] text-[rgba(95,95,88,0.6)] tracking-[1.1px] uppercase hover:text-[#1a1d14] transition-colors"
              >
                GALLERY
              </button>
              <button
                onClick={() => handleScrollTo("section-acara")}
                className="bg-transparent border-none p-0 cursor-pointer font-body font-normal text-[11px] text-[rgba(95,95,88,0.6)] tracking-[1.1px] uppercase hover:text-[#1a1d14] transition-colors"
              >
                LOCATION
              </button>
              <button
                onClick={() => handleScrollTo("section-gift")}
                className="bg-transparent border-none p-0 cursor-pointer font-body font-normal text-[11px] text-[rgba(95,95,88,0.6)] tracking-[1.1px] uppercase hover:text-[#1a1d14] transition-colors"
              >
                GIFT REGISTRY
              </button>
            </motion.div>

            <motion.span
              variants={fadeUp}
              className="font-body font-normal text-[10px] text-[rgba(95,95,88,0.5)] tracking-[2px] uppercase text-center"
            >
              WITH LOVE, ABUDZAR & INTAN — 2026
            </motion.span>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default React.memo(GiftTab);
