"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import type { GuestbookEntry } from "@/types/guestbook";
import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  photoMain,
  photoLeft,
  photoRight,
  staggerContainer,
  cardRise,
  labelFade,
  lineExpand,
  sectionViewport,
} from "@/lib/motionVariants";

interface GalleryTabProps {
  showFooter?: boolean;
  entries: GuestbookEntry[];
  isLoading: boolean;
  error: string | null;
}

export default function GalleryTab({
  showFooter = true,
  entries,
  isLoading,
  error,
}: GalleryTabProps) {
  const prefersReducedMotion = useReducedMotion();
  const viewport = prefersReducedMotion ? { once: true, amount: 0.05 } : sectionViewport;
  const reducedVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } };

  const imgBotanical1 = "/images/corner-acara.svg";
  const imgBotanical2 = "/images/corner-acara.svg";
  const imgMainMoment = "/images/foto-wedding.jpeg";
  const imgDetailMoment = "/images/cincin-wedding.jpeg";
  const imgDetailMoment1 = "/images/figma/bc72238c81bb18fc6dc53a32f0916a126009f9d5.png";
  const imgContainer = "/images/centered-divider.svg";
  const imgContainer1 = "/images/centered-divider.svg";
  const imgIcon = "/images/figma/f0a0985e4ec65be955672ab2b838ad9b600c13e5.svg";

  function getRelativeTime(isoDate: string, now: number) {
    const timestamp = new Date(isoDate).getTime();
    if (Number.isNaN(timestamp)) return "";
    const diffMs = now - timestamp;
    const diffHours = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60)));
    if (diffHours < 24) return `${diffHours} HOURS AGO`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} DAYS AGO`;
  }

  const [now, setNow] = useState<number>(0);
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setNow(Date.now());
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const visibleEntries = useMemo(() => {
    return entries.slice(0, 2).map((entry) => ({
      ...entry,
      relativeTime: getRelativeTime(entry.created_at, now),
    }));
  }, [entries, now]);

  const getAttendanceStyle = (attendance: GuestbookEntry["attendance"]) => {
    if (attendance === "Hadir") {
      return "bg-[#585e4d] text-white border-transparent";
    }

    if (attendance === "Ragu") {
      return "bg-[rgba(212,175,55,0.2)] text-[#d4af37] border-[rgba(212,175,55,0.1)]";
    }

    return "bg-[rgba(95,95,88,0.15)] text-[#5f5f58] border-[rgba(95,95,88,0.1)]";
  };

  return (
    <div className="relative w-full flex flex-col items-center overflow-x-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 section-grid-texture pointer-events-none" />

      {/* Decorative blurs removed */}

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
      <div className="flex flex-col gap-[63px] items-center w-full max-w-[480px] pb-[48px] relative px-6 z-25">
        
        {/* Section: Gallery */}
        <div className="w-full flex flex-col gap-[37px] items-center pt-[24px] relative">
          
          {/* Header block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={prefersReducedMotion ? reducedVariants : staggerContainer}
            className="w-full flex flex-col gap-[4.2px] items-center relative"
          >
            <motion.span
              variants={labelFade}
              className="font-body font-semibold text-[13px] text-center tracking-[1.56px] text-[#5f5f58] uppercase"
            >
              GALLERY
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display font-light italic text-[42px] text-center text-[#585e4d] leading-[42px] tracking-[-0.42px]"
            >
              Our Moments
            </motion.h2>
            <motion.div
              variants={lineExpand}
              className="flex items-center justify-center pt-[11.8px] w-full"
            >
              <div className="flex items-center justify-center gap-3 w-full max-w-[240px]">
                <span className="block h-px flex-1 bg-[rgba(212,175,55,0.4)]" />
                <span className="text-[#D4AF37] text-sm">◆</span>
                <span className="block h-px flex-1 bg-[rgba(212,175,55,0.4)]" />
              </div>
            </motion.div>
          </motion.div>

          {/* Editorial Gallery Layout */}
          <div className="w-full flex flex-col gap-[29px] items-center relative">
            
            {/* Main moment */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={photoMain}
              className="w-[345.7px] flex justify-center items-center transform-gpu"
              style={{ contain: "paint", isolation: "isolate" }}
            >
              <div className="aspect-[4/5] bg-[rgba(255,255,255,0.4)] flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[96px] shadow-[0px_0px_0px_1px_rgba(212,175,55,0.3),0px_0px_0px_4px_rgba(212,175,55,0.08)] w-full">
                <div className="w-full h-[419.5px] relative rounded-[92.8px] overflow-hidden">
                  <Image
                    alt="Main Moment"
                    className="object-cover object-center"
                    src={imgMainMoment}
                    fill
                    sizes="346px"
                  />
                </div>
                {/* Thin internal border */}
                <div className="absolute border border-[rgba(212,175,55,0.15)] border-solid inset-[-6px] rounded-[96px] pointer-events-none" />
              </div>
            </motion.div>

            {/* Detail moments */}
            <div className="grid grid-cols-2 gap-[24px] w-full px-[16px]">
              
              {/* Detail 1 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={photoLeft}
                className="w-[149.5px] justify-self-center transform-gpu"
                style={{ contain: "paint", isolation: "isolate" }}
              >
                <div className="aspect-[3/4] bg-[rgba(255,255,255,0.4)] flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[80px] shadow-[0px_0px_0px_1px_rgba(212,175,55,0.3),0px_0px_0px_4px_rgba(212,175,55,0.08)] w-full">
                  <div className="w-full h-[182.6px] relative rounded-[76.8px] overflow-hidden">
                    <Image
                      alt="Detail Moment 1"
                      className="absolute h-[110.98%] left-0 max-w-none top-[-5.49%] w-full object-cover"
                      src={imgDetailMoment}
                      width={150}
                      height={203}
                      sizes="150px"
                    />
                  </div>
                  <div className="absolute border border-[rgba(212,175,55,0.15)] border-solid inset-[-6px] rounded-[80px] pointer-events-none" />
                </div>
              </motion.div>

              {/* Detail 2 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={photoRight}
                className="w-[149.5px] justify-self-center transform-gpu"
                style={{ contain: "paint", isolation: "isolate" }}
              >
                <div className="aspect-[3/4] bg-[rgba(255,255,255,0.4)] flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[80px] shadow-[0px_0px_0px_1px_rgba(212,175,55,0.3),0px_0px_0px_4px_rgba(212,175,55,0.08)] w-full">
                  <div className="w-full h-[182.6px] relative rounded-[76.8px] overflow-hidden">
                    <Image
                      alt="Detail Moment 2"
                      className="absolute h-full left-[-51.58%] max-w-none top-0 w-[203.15%] object-cover"
                      src={imgDetailMoment1}
                      width={304}
                      height={183}
                      sizes="150px"
                    />
                  </div>
                  <div className="absolute border border-[rgba(212,175,55,0.15)] border-solid inset-[-6px] rounded-[80px] pointer-events-none" />
                </div>
              </motion.div>

            </div>

          </div>

        </div>

        {/* Section: Guestbook */}
        <div className="w-full flex flex-col gap-[32px] items-center relative">
          
          {/* Header block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={prefersReducedMotion ? reducedVariants : staggerContainer}
            className="w-full flex flex-col gap-[4.2px] items-center relative"
          >
            <motion.span
              variants={labelFade}
              className="font-body font-semibold text-[13px] text-center tracking-[1.56px] text-[#5f5f58] uppercase"
            >
              GUESTBOOK
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display font-light italic text-[42px] text-center text-[#585e4d] leading-[42px] tracking-[-0.42px]"
            >
              Wishes & Prayers
            </motion.h2>
            <motion.div
              variants={lineExpand}
              className="flex items-center justify-center pt-[7.8px] w-full"
            >
              <div className="flex items-center justify-center gap-3 w-full max-w-[240px]">
                <span className="block h-px flex-1 bg-[rgba(212,175,55,0.4)]" />
                <img
                  alt="divider icon"
                  src="/images/figma/d745edfa5a6618dd70dff20b2a6531d6e9e0306d.svg"
                  style={{ width: 16, height: 16, objectFit: "contain" }}
                />
                <span className="block h-px flex-1 bg-[rgba(212,175,55,0.4)]" />
              </div>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="font-body italic text-[13px] text-center text-[#454840] leading-[20.8px] pt-[6.8px]"
            >
              Sharing the love from our dearest ones.
            </motion.p>
          </motion.div>

          {/* Mini Feed */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={prefersReducedMotion ? reducedVariants : staggerContainer}
            className="w-full flex flex-col gap-[16px] items-stretch relative"
          >
            {isLoading && (
              <>
                <div className="md:backdrop-blur-[6px] bg-[rgba(255,255,255,0.6)] border border-solid border-white flex flex-col gap-[16px] items-start p-[25px] rounded-[16px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.03)] w-full">
                  <div className="w-full h-[96px] rounded-[12px] bg-[rgba(95,95,88,0.08)] animate-pulse" />
                </div>
                <div className="md:backdrop-blur-[6px] bg-[rgba(255,255,255,0.6)] border border-solid border-white flex flex-col gap-[16px] items-start p-[25px] rounded-[16px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.03)] w-full">
                  <div className="w-full h-[96px] rounded-[12px] bg-[rgba(95,95,88,0.08)] animate-pulse" />
                </div>
              </>
            )}

            {!isLoading && visibleEntries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="md:backdrop-blur-[6px] bg-[rgba(255,255,255,0.6)] border border-solid border-white flex flex-col gap-[16px] items-start p-[25px] rounded-[16px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.03)] w-full transform-gpu"
                style={{ contain: "paint", isolation: "isolate" }}
              >
                <div className="w-full flex items-start justify-between">
                  <div className="flex flex-col gap-[3px] items-start">
                    <h4 className="font-body font-normal text-[14px] text-[#585e4d] leading-[21px]">
                      {entry.guest_name}
                    </h4>
                    <span className="font-body font-normal text-[9px] text-[rgba(95,95,88,0.5)] tracking-[0.9px] uppercase">
                      {entry.relativeTime}
                    </span>
                  </div>
                  <div className={`border border-solid flex items-center px-[13px] py-[5px] rounded-full ${getAttendanceStyle(entry.attendance)}`}>
                    <span className="font-body font-normal text-[9px] uppercase tracking-wider">
                      {entry.attendance === "Ragu" ? "TENTATIVE" : entry.attendance.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="w-full font-display font-light italic text-[17px] text-[rgba(95,95,88,0.9)] leading-[27.63px]">
                  <p>&ldquo;{entry.message}&rdquo;</p>
                </div>
              </motion.div>
            ))}

            {!isLoading && visibleEntries.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="md:backdrop-blur-[6px] bg-[rgba(255,255,255,0.6)] border border-solid border-white flex flex-col gap-[16px] items-center p-[25px] rounded-[16px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.03)] w-full transform-gpu"
                style={{ contain: "paint", isolation: "isolate" }}
              >
                <p className="font-body font-normal text-[14px] text-[rgba(95,95,88,0.6)] text-center">
                  Belum ada ucapan.
                </p>
              </motion.div>
            )}

            {!isLoading && error && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="md:backdrop-blur-[6px] bg-[rgba(255,255,255,0.6)] border border-solid border-white flex flex-col gap-[16px] items-center p-[25px] rounded-[16px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.03)] w-full transform-gpu"
                style={{ contain: "paint", isolation: "isolate" }}
              >
                <p className="font-body font-normal text-[12px] text-red-500 text-center">
                  {error}
                </p>
              </motion.div>
            )}
          </motion.div>

        </div>

        {/* Footer */}
        {showFooter && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={prefersReducedMotion ? reducedVariants : staggerContainer}
            className="w-full flex flex-col items-center pb-[128px] pt-px relative"
          >
            <div className="flex flex-col gap-[23.6px] items-center relative">
              
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
                Abudzar & Intan
              </motion.h2>
              
              <motion.div
                variants={fadeUp}
                className="pt-[16px]"
              >
                <div className="flex gap-[32px] h-[15px] items-start">
                  <span className="font-body font-normal text-[10px] text-[rgba(95,95,88,0.6)] text-center uppercase tracking-wider cursor-pointer hover:text-[#585e4d] transition-colors">
                    SAVE DATE
                  </span>
                  <span className="font-body font-normal text-[10px] text-[rgba(95,95,88,0.6)] text-center uppercase tracking-wider cursor-pointer hover:text-[#585e4d] transition-colors">
                    LOCATION
                  </span>
                  <span className="font-body font-normal text-[10px] text-[rgba(95,95,88,0.6)] text-center uppercase tracking-wider cursor-pointer hover:text-[#585e4d] transition-colors">
                    REGISTRY
                  </span>
                </div>
              </motion.div>

              <motion.div
                variants={prefersReducedMotion ? reducedVariants : staggerContainer}
                className="flex flex-col gap-[11.8px] items-center pt-[24px]"
              >
                <motion.div variants={lineExpand} className="bg-[rgba(212,175,55,0.3)] h-[1px] w-[40px]" />
                <motion.div variants={fadeUp} className="w-[18px] h-[16px] relative flex items-center justify-center">
                  <img alt="Heart" className="w-full h-full object-contain" src={imgIcon} />
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
