"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "@/components/hero/HeroSection";
import EventDetails from "@/components/details/EventDetails";
import RSVPForm from "@/components/rsvp/RSVPForm";
import GalleryTab from "@/components/gallery/GalleryTab";
import GiftTab from "@/components/gift/GiftTab";
import { useGuestbookFeed } from "@/hooks/useGuestbookFeed";

interface InvitationTabsProps {
  guestName: string;
  isOpened: boolean;
  onOpen: () => void;
}

export default function InvitationTabs({ guestName, isOpened, onOpen }: InvitationTabsProps) {
  const {
    addOptimisticEntry,
    confirmEntry,
    removeEntry,
  } = useGuestbookFeed();

  const [showHeader, setShowHeader] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full relative bg-[#FDFCF9]">
      {/* Top Header */}
      {isOpened && (
        <header
          className={`fixed top-0 z-40 w-full md:max-w-[430px] md:left-1/2 md:-translate-x-1/2 backdrop-blur-[6px] bg-[rgba(253,252,249,0.8)] border-b border-solid border-[rgba(201,168,76,0.1)] flex h-[64px] items-center justify-between px-6 transition-transform duration-300 ${
            showHeader ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="w-[20px]" /> {/* Spacer to balance the burger icon on the right */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-display font-light italic text-[24px] tracking-[-0.6px] text-[#1a1d14]">
              A & B
            </h1>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-[20px] h-[14px] flex flex-col justify-between items-center relative z-50 cursor-pointer"
            aria-label="Menu"
          >
            <span
              className={`w-full h-[1.5px] bg-[#585e4d] rounded-full transition-all duration-300 origin-center ${
                isMenuOpen ? "rotate-45 translate-y-[6.25px]" : ""
              }`}
            />
            <span
              className={`w-full h-[1.5px] bg-[#585e4d] rounded-full transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-[1.5px] bg-[#585e4d] rounded-full transition-all duration-300 origin-center ${
                isMenuOpen ? "-rotate-45 -translate-y-[6.25px]" : ""
              }`}
            />
          </button>
        </header>
      )}

      {/* Slide-over Menu Overlay */}
      <AnimatePresence>
        {isOpened && isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-45 bg-black/20 backdrop-blur-sm w-full md:max-w-[430px] md:left-1/2 md:-translate-x-1/2"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 z-50 w-[260px] right-0 md:right-[calc(50vw-215px)] bg-[#faf9f6]/95 backdrop-blur-[20px] border-l border-[rgba(201,168,76,0.15)] shadow-[0_0_50px_rgba(0,0,0,0.1)] p-8 flex flex-col justify-center items-center"
              style={{
                backgroundImage: "url('https://www.transparenttextures.com/patterns/p6.png')",
                backgroundSize: "100px 100px",
              }}
            >
              {/* Menu Links */}
              <div className="flex flex-col gap-8 items-center w-full">
                <button
                  onClick={() => scrollToSection("section-home")}
                  className="font-display font-light italic text-[24px] text-[#585e4d] hover:text-[#c9a84c] transition-colors cursor-pointer"
                >
                  Utama
                </button>
                <button
                  onClick={() => scrollToSection("section-gallery")}
                  className="font-display font-light italic text-[24px] text-[#585e4d] hover:text-[#c9a84c] transition-colors cursor-pointer"
                >
                  Galeri
                </button>
                <button
                  onClick={() => scrollToSection("section-acara")}
                  className="font-display font-light italic text-[24px] text-[#585e4d] hover:text-[#c9a84c] transition-colors cursor-pointer"
                >
                  Detail Acara
                </button>
                <button
                  onClick={() => scrollToSection("section-gift")}
                  className="font-display font-light italic text-[24px] text-[#585e4d] hover:text-[#c9a84c] transition-colors cursor-pointer"
                >
                  Kirim Hadiah
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main active tab contents */}
      <div className="flex-1 flex flex-col w-full">
        <div id="section-home">
          <HeroSection
            guestName={guestName}
            isOpened={isOpened}
            onOpen={onOpen}
            showFooter={false}
          />
        </div>
        <div id="section-gallery">
          <GalleryTab showFooter={false} />
        </div>
        <div id="section-acara">
          <EventDetails guestName={guestName} showFooter={false}>
            <RSVPForm
              guestName={guestName}
              addOptimisticEntry={addOptimisticEntry}
              confirmEntry={confirmEntry}
              removeEntry={removeEntry}
            />
          </EventDetails>
        </div>
        <div id="section-gift">
          <GiftTab showHeader={false} showFooter={true} />
        </div>
      </div>
    </div>
  );
}
