"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CoverEnvelope from "@/components/cover/CoverEnvelope";
import HeroSection from "@/components/hero/HeroSection";
import CountdownTimer from "@/components/countdown/CountdownTimer";
import EventDetails from "@/components/details/EventDetails";
import RSVPForm from "@/components/rsvp/RSVPForm";
import GalleryTab from "@/components/gallery/GalleryTab";
import GiftTab from "@/components/gift/GiftTab";
import { useGuestbookFeed } from "@/hooks/useGuestbookFeed";
import { decodeGuestName } from "@/lib/utils";

type TabType = "home" | "gallery" | "acara" | "gift";

export default function InvitationTabs() {
  const searchParams = useSearchParams();
  const guestName = decodeGuestName(searchParams.get("to"));
  
  // Set active tab to 'home' by default
  const [activeTab, setActiveTab] = useState<TabType>("home");

  const {
    addOptimisticEntry,
    confirmEntry,
    removeEntry,
  } = useGuestbookFeed();

  // Custom inline SVG icons that handle active/inactive color state dynamically
  const renderHomeIcon = (isActive: boolean) => (
    <svg className="w-[10.5px] h-[11.84px]" viewBox="0 0 10.5 11.8414" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.750005 11.0914H3.51923V6.67789H6.98078V11.0914H9.75V4.34135L5.25 0.937506L0.750005 4.34135V11.0914V11.0914M0 11.8414V3.96635L5.25 0L10.5 3.96635V11.8414H6.23077V7.42789H4.26924V11.8414H0V11.8414M5.25 6.01443V6.01443V6.01443V6.01443V6.01443V6.01443V6.01443V6.01443V6.01443V6.01443V6.01443"
        fill={isActive ? "#FFFFFF" : "#585E4D"}
        fillOpacity={isActive ? "1" : "0.4"}
      />
    </svg>
  );

  const renderGalleryIcon = (isActive: boolean) => (
    <svg className="w-[13.5px] h-[12px]" viewBox="0 0 13.5 12.0029" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.75 12.0029L6.18173 11.4894C4.95769 10.3712 3.94519 9.41395 3.14423 8.6178C2.34327 7.82164 1.71106 7.11948 1.2476 6.5113C0.784135 5.90313 0.460337 5.35289 0.276202 4.86058C0.0920673 4.36827 0 3.87308 0 3.375C0 2.42116 0.324039 1.62019 0.972117 0.972116C1.62019 0.324039 2.42116 0 3.375 0C4.03462 0 4.65337 0.16875 5.23125 0.50625C5.80914 0.843749 6.31539 1.33461 6.75 1.97884C7.18462 1.33461 7.69087 0.843749 8.26875 0.50625C8.84664 0.16875 9.46539 0 10.125 0C11.0789 0 11.8798 0.324039 12.5279 0.972116C13.176 1.62019 13.5 2.42116 13.5 3.375C13.5 3.87308 13.4079 4.36827 13.2238 4.86058C13.0397 5.35289 12.7159 5.90313 12.2524 6.5113C11.789 7.11948 11.1591 7.82164 10.363 8.6178C9.56684 9.41395 8.55193 10.3712 7.31828 11.4894L6.75 12.0029V12.0029M6.75 10.9875C7.95 9.90289 8.9375 8.9738 9.7125 8.20024C10.4875 7.42669 11.1 6.75553 11.55 6.18678C12 5.61803 12.3125 5.11419 12.4875 4.67525C12.6625 4.2363 12.75 3.80289 12.75 3.375C12.75 2.625 12.5 2 12 1.5C11.5 1 10.875 0.750005 10.125 0.750005C9.52789 0.750005 8.97693 0.920437 8.47212 1.2613C7.96731 1.60217 7.51539 2.11539 7.11635 2.80096V2.80096H6.38366V2.80096C5.975 2.10577 5.52068 1.59015 5.02068 1.25409C4.52068 0.918034 3.97212 0.750005 3.375 0.750005C2.63462 0.750005 2.01202 1 1.50722 1.5C1.00241 2 0.750005 2.625 0.750005 3.375C0.750005 3.80289 0.837505 4.2363 1.0125 4.67525C1.1875 5.11419 1.5 5.61803 1.95 6.18678C2.4 6.75553 3.0125 7.42428 3.7875 8.19303C4.5625 8.96178 5.55 9.89327 6.75 10.9875V10.9875M6.75 5.86875V5.86875V5.86875V5.86875V5.86875V5.86875V5.86875V5.86875V5.86875V5.86875V5.86875"
        fill={isActive ? "#FFFFFF" : "#585E4D"}
        fillOpacity={isActive ? "1" : "0.4"}
      />
    </svg>
  );

  const renderAcaraIcon = (isActive: boolean) => {
    if (isActive) {
      return (
        <svg className="w-[13.5px] h-[15px]" viewBox="0 0 13.5 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.5 15C1.0875 15 0.734375 14.8531 0.440625 14.5594C0.146875 14.2656 0 13.9125 0 13.5V3C0 2.5875 0.146875 2.23437 0.440625 1.94062C0.734375 1.64687 1.0875 1.5 1.5 1.5H2.25V0H3.75V1.5H9.75V0H11.25V1.5H12C12.4125 1.5 12.7656 1.64687 13.0594 1.94062C13.3531 2.23437 13.5 2.5875 13.5 3V13.5C13.5 13.9125 13.3531 14.2656 13.0594 14.5594C12.7656 14.8531 12.4125 15 12 15H1.5V15M1.5 13.5H12V13.5V13.5V6H1.5V13.5V13.5V13.5V13.5"
            fill="#FFFFFF"
          />
        </svg>
      );
    }
    return (
      <svg className="w-[12px] h-[13.67px]" viewBox="0 0 12 13.6731" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.21154 13.6731C0.866347 13.6731 0.578126 13.5575 0.346876 13.3262C0.115625 13.095 0 12.8067 0 12.4615V2.88462C0 2.53942 0.115625 2.2512 0.346876 2.01995C0.578126 1.7887 0.866347 1.67308 1.21154 1.67308H2.53846V0H3.34616V1.67308H8.71154V0H9.46155V1.67308H10.7885C11.1337 1.67308 11.4219 1.7887 11.6531 2.01995C11.8844 2.2512 12 2.53942 12 2.88462V12.4615C12 12.8067 11.8844 13.095 11.6531 13.3262C11.4219 13.5575 11.1337 13.6731 10.7885 13.6731H1.21154V13.6731M1.21154 12.9231H10.7885C10.9039 12.9231 11.0096 12.875 11.1058 12.7789C11.2019 12.6827 11.25 12.5769 11.25 12.4615V5.88462H0.750005V12.4615C0.750005 12.5769 0.798081 12.6827 0.894234 12.7789C0.990388 12.875 1.09616 12.9231 1.21154 12.9231V12.9231M0.750005 5.13461H11.25V2.88462C11.25 2.76923 11.2019 2.66346 11.1058 2.56731C11.0096 2.47116 10.9039 2.42308 10.7885 2.42308H1.21154C1.09616 2.42308 0.990388 2.47116 0.894234 2.56731C0.798081 2.66346 0.750005 2.76923 0.750005 2.88462V5.13461V5.13461M0.750005 5.13461V2.88462C0.750005 2.76923 0.750005 2.66346 0.750005 2.56731C0.750005 2.47116 0.750005 2.42308 0.750005 2.42308V2.42308C0.750005 2.42308 0.750005 2.47116 0.750005 2.56731C0.750005 2.66346 0.750005 2.76923 0.750005 2.88462V5.13461V5.13461V5.13461"
          fill="#585E4D"
          fillOpacity="0.4"
        />
      </svg>
    );
  };

  const renderGiftIcon = (isActive: boolean) => {
    if (isActive) {
      return (
        <svg className="w-[15px] h-[15px]" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 15V1.5C0 1.0875 0.146875 0.734375 0.440625 0.440625C0.734375 0.146875 1.0875 0 1.5 0H13.5C13.9125 0 14.2656 0.146875 14.5594 0.440625C14.8531 0.734375 15 1.0875 15 1.5V10.5C15 10.9125 14.8531 11.2656 14.5594 11.5594C14.2656 11.8531 13.9125 12 13.5 12H3L0 15V15"
            fill="#FFFFFF"
          />
        </svg>
      );
    }
    return (
      <svg className="w-[13.5px] h-[12.8px]" viewBox="0 0 13.5 12.8077" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 12.8077V1.21154C0 0.866347 0.115625 0.578126 0.346876 0.346875C0.578126 0.115625 0.866347 0 1.21154 0H12.2885C12.6337 0 12.9219 0.115625 13.1531 0.346875C13.3844 0.578126 13.5 0.866347 13.5 1.21154V9.28847C13.5 9.63366 13.3844 9.92188 13.1531 10.1531C12.9219 10.3844 12.6337 10.5 12.2885 10.5H2.3077L0 12.8077V12.8077M1.9875 9.75H12.2885C12.4039 9.75 12.5096 9.70193 12.6058 9.60577C12.7019 9.50962 12.75 9.40385 12.75 9.28847V1.21154C12.75 1.09616 12.7019 0.990388 12.6058 0.894234C12.5096 0.798081 12.4039 0.750005 12.2885 0.750005H1.21154C1.09616 0.750005 0.990388 0.798081 0.894234 0.894234C0.798081 0.990388 0.750005 1.09616 0.750005 1.21154V10.9832L1.9875 9.75V9.75M0.750005 9.75V9.75V1.21154C0.750005 1.09616 0.750005 0.990388 0.750005 0.894234C0.750005 1.09616 0.750005 0.750005 0.750005 0.750005V0.750005C0.750005 0.750005 0.750005 0.798081 0.750005 0.894234C0.750005 0.990388 0.750005 1.09616 0.750005 1.21154V9.28847C0.750005 9.40385 0.750005 9.50962 0.750005 9.60577C0.750005 9.70193 0.750005 9.75 0.750005 9.75V9.75V9.75"
          fill="#585E4D"
          fillOpacity="0.4"
        />
      </svg>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="w-full pb-24">
            <HeroSection />
          </div>
        );
      case "gallery":
        return <GalleryTab />;
      case "acara":
        return (
          <div className="w-full pb-24">
            {/* Pass guestName to EventDetails to prefill the RSVP form */}
            <EventDetails guestName={guestName} />
          </div>
        );
      case "gift":
        return <GiftTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full relative">
      <CoverEnvelope guestName={guestName} />

      {/* Main active tab contents */}
      {renderTabContent()}

      {/* Floating navigation bar */}
      <div className="fixed bottom-[32px] left-[7.5%] right-[7.5%] max-w-[380px] mx-auto z-40">
        <div className="backdrop-blur-[20px] bg-[rgba(255,255,255,0.7)] border border-[rgba(255,255,255,0.6)] border-solid flex justify-between items-center px-[40.2px] py-[11px] rounded-[9999px] shadow-[0px_15px_40px_0px_rgba(0,0,0,0.06)] w-full">
          {/* Tab: Home */}
          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center justify-center size-[40px] transition-all duration-300 ${
              activeTab === "home"
                ? "bg-[#585e4d] rounded-full shadow-[0px_4px_6px_-1px_rgba(88,94,77,0.2),0px_2px_4px_-2px_rgba(88,94,77,0.2)]"
                : "rounded-full hover:bg-white/40"
            }`}
            aria-label="Home"
          >
            {renderHomeIcon(activeTab === "home")}
          </button>

          {/* Tab: Gallery */}
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center justify-center size-[40px] transition-all duration-300 ${
              activeTab === "gallery"
                ? "bg-[#585e4d] rounded-full shadow-[0px_4px_6px_-1px_rgba(88,94,77,0.2),0px_2px_4px_-2px_rgba(88,94,77,0.2)]"
                : "rounded-full hover:bg-white/40"
            }`}
            aria-label="Gallery"
          >
            {renderGalleryIcon(activeTab === "gallery")}
          </button>

          {/* Tab: Acara */}
          <button
            onClick={() => setActiveTab("acara")}
            className={`flex items-center justify-center size-[40px] transition-all duration-300 ${
              activeTab === "acara"
                ? "bg-[#585e4d] rounded-full shadow-[0px_4px_6px_-1px_rgba(88,94,77,0.2),0px_2px_4px_-2px_rgba(88,94,77,0.2)]"
                : "rounded-full hover:bg-white/40"
            }`}
            aria-label="Acara"
          >
            {renderAcaraIcon(activeTab === "acara")}
          </button>

          {/* Tab: Gift */}
          <button
            onClick={() => setActiveTab("gift")}
            className={`flex items-center justify-center size-[40px] transition-all duration-300 ${
              activeTab === "gift"
                ? "bg-[#585e4d] rounded-full shadow-[0px_4px_6px_-1px_rgba(88,94,77,0.2),0px_2px_4px_-2px_rgba(88,94,77,0.2)]"
                : "rounded-full hover:bg-white/40"
            }`}
            aria-label="Gift & RSVP"
          >
            {renderGiftIcon(activeTab === "gift")}
          </button>
        </div>
      </div>
    </div>
  );
}
