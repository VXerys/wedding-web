"use client";

import type { CSSProperties } from "react";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import CoverEnvelope from "@/components/cover/CoverEnvelope";
import HeroSection from "@/components/hero/HeroSection";
import EventDetails from "@/components/details/EventDetails";
import RSVPForm from "@/components/rsvp/RSVPForm";
import GalleryTab from "@/components/gallery/GalleryTab";
import GiftTab from "@/components/gift/GiftTab";
import { useLenis } from "@/components/LenisProvider";
import { useGuestbookFeed } from "@/hooks/useGuestbookFeed";

const MENU_SLIDE_ANIMATION = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
} as const;

interface NavLinkProps {
  heading: string;
  index: number;
  onClick: () => void;
}

const NavLink = ({ heading, index, onClick }: NavLinkProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set((mouseX / rect.width - 0.5) * 12);
    y.set((mouseY / rect.height - 0.5) * 8);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-[rgba(201,168,76,0.15)] py-4 uppercase transition-colors duration-500 w-full"
    >
      <button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="w-full text-left focus:outline-none cursor-pointer"
      >
        <div className="relative flex items-baseline">
          <span className="mr-3 font-display font-light italic text-[14px] text-[#c9a84c] transition-colors duration-500">
            {index}.
          </span>
          <motion.span
            variants={{
              initial: { x: 0 },
              whileHover: { x: -8 },
            }}
            transition={{
              type: "spring",
              staggerChildren: 0.04,
              delayChildren: 0.05,
            }}
            style={{ x, y }}
            className="relative z-10 block font-display font-light italic text-[22px] text-[#585e4d] group-hover:text-[#c9a84c] transition-colors duration-500"
          >
            <span className="inline-block">
              {heading}
            </span>
          </motion.span>
        </div>
      </button>
    </motion.div>
  );
};

const Curve = () => {
  const [viewportHeight, setViewportHeight] = useState(900);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const initialPath = `M100 0 L102 0 L102 ${viewportHeight} L100 ${viewportHeight} Q-100 ${viewportHeight / 2} 100 0`;
  const targetPath = `M100 0 L102 0 L102 ${viewportHeight} L100 ${viewportHeight} Q100 ${viewportHeight / 2} 100 0`;

  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  } as const;

  return (
    <svg className="absolute -left-[99px] top-0 h-full w-[100px] overflow-visible stroke-none fill-white">
      <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />
    </svg>
  );
};

interface InvitationTabsProps {
  guestName: string;
  isOpened: boolean;
  onOpen: () => void;
  onClose?: () => void;
}

const sectionContainmentStyle: CSSProperties = {
  contain: "layout paint",
  isolation: "isolate",
};

export default function InvitationTabs({ guestName, isOpened, onOpen, onClose }: InvitationTabsProps) {
  const lenis = useLenis();
  const [showHeader, setShowHeader] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const showHeaderRef = useRef(true);
  const scrollFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let active = true;
    if (!isOpened) {
      lastScrollY.current = 0;
      showHeaderRef.current = true;
      const handle = requestAnimationFrame(() => {
        if (active) setShowHeader(true);
      });

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }

      return () => {
        active = false;
        cancelAnimationFrame(handle);
      };
    }

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) {
        return;
      }

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const shouldShowHeader = currentScrollY <= 100 || currentScrollY <= lastScrollY.current;

        if (shouldShowHeader !== showHeaderRef.current) {
          showHeaderRef.current = shouldShowHeader;
          setShowHeader(shouldShowHeader);
        }

        lastScrollY.current = currentScrollY;
        scrollFrameRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
    };
  }, [isOpened]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, {
          duration: 1.05,
        });
        return;
      }

      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full relative bg-[#FDFCF9]">
      {/* Cover Envelope Overlay */}
      <AnimatePresence>
        {!isOpened && (
          <CoverEnvelope
            guestName={guestName}
            onOpened={onOpen}
          />
        )}
      </AnimatePresence>

      {/* Top Header */}
      {isOpened && (
        <header
          className={`fixed top-0 z-40 w-full md:max-w-[430px] md:left-1/2 md:-translate-x-1/2 md:backdrop-blur-[6px] bg-[rgba(253,252,249,0.8)] border-b border-solid border-[rgba(201,168,76,0.1)] flex h-[64px] items-center justify-between px-6 transition-transform duration-300 ${
            showHeader ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="w-[20px]" /> {/* Spacer to balance the burger icon on the right */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-display font-light italic text-[24px] tracking-[-0.6px] text-[#1a1d14]">
              A & I
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
              className="fixed inset-0 z-45 bg-black/20 md:backdrop-blur-sm w-full md:max-w-[430px] md:left-1/2 md:-translate-x-1/2"
            />
            {/* Drawer */}
            <motion.div
              variants={MENU_SLIDE_ANIMATION}
              initial="initial"
              animate="enter"
              exit="exit"
              onClick={() => setIsMenuOpen(false)}
              className="fixed top-0 bottom-0 z-50 w-[260px] right-0 md:right-[calc(50vw-215px)] bg-white border-l border-[rgba(201,168,76,0.15)] shadow-[0_0_50px_rgba(0,0,0,0.1)] px-8 py-16 flex flex-col justify-between items-stretch overflow-visible cursor-pointer"
            >
              <Curve />

              <div className="flex flex-col gap-6 w-full mt-4">
                <div className="border-b border-[rgba(201,168,76,0.15)] pb-2 text-[10px] uppercase tracking-widest text-[#5f5f58]/60 font-body">
                  <p>Explore Menu</p>
                </div>
                
                <div className="flex flex-col w-full">
                  <NavLink heading="Utama" index={1} onClick={() => scrollToSection("section-home")} />
                  <NavLink heading="Galeri" index={2} onClick={() => scrollToSection("section-gallery")} />
                  <NavLink heading="Detail Acara" index={3} onClick={() => scrollToSection("section-acara")} />
                  <NavLink heading="Kirim Hadiah" index={4} onClick={() => scrollToSection("section-gift")} />
                </div>
              </div>

              {/* Simple Footer inside Drawer */}
              <div className="flex flex-col items-center gap-1.5 text-center mt-auto pt-6 border-t border-[rgba(201,168,76,0.1)] w-full">
                <span className="font-display font-light italic text-[14px] text-[#585e4d]">
                  Abudzar & Intan
                </span>
                <span className="font-body text-[8px] tracking-[0.3em] text-[#5f5f58]/40 uppercase">
                  06.06.2026
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main active tab contents */}
      <div className="flex-1 flex flex-col w-full">
        {isOpened && (
          <div id="section-home">
            <HeroSection
              guestName={guestName}
              isOpened={isOpened}
              onOpen={onOpen}
              showFooter={false}
            />
          </div>
        )}
        {isOpened && <OpenedInvitationSections guestName={guestName} />}
      </div>
    </div>
  );
}

function OpenedInvitationSections({ guestName }: { guestName: string }) {
  const {
    entries,
    isLoading,
    error,
    addOptimisticEntry,
    confirmEntry,
    removeEntry,
  } = useGuestbookFeed();
  const [mountGallery, setMountGallery] = useState(false);
  const [mountAcara, setMountAcara] = useState(false);
  const [mountGift, setMountGift] = useState(false);

  useEffect(() => {
    const galleryTimer = window.setTimeout(() => setMountGallery(true), 80);
    const acaraTimer = window.setTimeout(() => setMountAcara(true), 450);
    const giftTimer = window.setTimeout(() => setMountGift(true), 900);

    return () => {
      window.clearTimeout(galleryTimer);
      window.clearTimeout(acaraTimer);
      window.clearTimeout(giftTimer);
    };
  }, []);

  return (
    <>
      <div
        id="section-gallery"
        style={
          mountGallery
            ? sectionContainmentStyle
            : { ...sectionContainmentStyle, minHeight: "100vh" }
        }
      >
        {mountGallery && (
          <GalleryTab
            showFooter={false}
            entries={entries}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
      <div
        id="section-acara"
        style={
          mountAcara
            ? sectionContainmentStyle
            : { ...sectionContainmentStyle, minHeight: "100vh" }
        }
      >
        {mountAcara && (
          <EventDetails guestName={guestName} showFooter={false}>
            <RSVPForm
              guestName={guestName}
              addOptimisticEntry={addOptimisticEntry}
              confirmEntry={confirmEntry}
              removeEntry={removeEntry}
            />
          </EventDetails>
        )}
      </div>
      <div
        id="section-gift"
        style={
          mountGift
            ? sectionContainmentStyle
            : { ...sectionContainmentStyle, minHeight: "60vh" }
        }
      >
        {mountGift && <GiftTab showHeader={false} showFooter={true} />}
      </div>
    </>
  );
}
