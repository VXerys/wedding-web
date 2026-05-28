"use client";

import React, { useState } from "react";

export default function GiftTab() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const imgImage = "/images/figma/8b40ecdeddf1f3897149eac1cfdfdbcb0b9f808a.png";
  const imgBotanical1 = "/images/figma/d540e9f3235a86d6904c5eb0df6518a696ba706e.png";
  const imgBotanical2 = "/images/figma/2dfcc31b063ebffde38e5d0972cc794cda55e33f.png";
  const imgFooterLeaf = "/images/figma/4950129f7a7d256f5721da392cec38d7d6b33daf.png";
  const imgBcaLogo = "/images/figma/2139e2a34812c4176a0c78762207328e71174ec3.png";
  const imgDivider = "/images/figma/e7ce555d4dd99e804110c48ea5c526aeca13df72.svg";
  const imgCopyIcon = "/images/figma/1596a5ebf350c38a8e0ccdfd74a40ed2bada6a04.svg";
  const imgGiftBoxIcon = "/images/figma/a67be60163fb2bf6ebdb1714f85f57a4de0e44d9.svg";
  const imgMapPinIcon = "/images/figma/cca2eb24a5239f24fdb67d5c4180683dbb6f8aff.svg";
  const imgHamburger = "/images/figma/531faefa967f7d215c032575637015a00825ce90.svg";

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center overflow-x-hidden"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(253, 252, 249) 0%, rgb(253, 252, 249) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
      }}
    >
      {/* Background Repeating Grid Pattern */}
      <div
        className="absolute inset-0 opacity-15 bg-[length:8px_8px] bg-left-top bg-repeat pointer-events-none z-3"
        style={{ backgroundImage: `url('${imgImage}')` }}
      />

      {/* Decorative Blurs */}
      <div className="absolute bg-[#e2e8df] blur-[30px] left-[-80px] mix-blend-multiply opacity-25 rounded-full w-[400px] h-[400px] top-[-80px] pointer-events-none z-1" />
      <div className="absolute bg-[#e2e8df] blur-[30px] bottom-[849.25px] mix-blend-multiply opacity-25 right-[-160px] rounded-full w-[450px] h-[450px] pointer-events-none z-2" />

      {/* Botanical Sketches */}
      <div className="absolute right-[4.1px] w-[151.8px] h-[151.8px] top-[28.09px] flex items-center justify-center pointer-events-none z-4">
        <div className="rotate-12 w-[128px] h-[128px] opacity-10 relative">
          <img alt="" className="absolute left-0 max-w-none w-full h-full top-0 object-contain" src={imgBotanical1} />
        </div>
      </div>

      <div className="absolute bottom-[826.05px] w-[158px] h-[158px] left-[-15.2px] flex items-center justify-center pointer-events-none z-5">
        <div className="-rotate-45 w-[112px] h-[112px] opacity-10 relative">
          <img
            alt=""
            className="absolute left-0 max-w-none w-full h-full top-0 object-contain mix-blend-saturation"
            src={imgBotanical2}
          />
        </div>
      </div>

      {/* Header */}
      <div className="backdrop-blur-[6px] bg-[rgba(253,252,249,0.6)] border-b border-solid border-[rgba(201,168,76,0.1)] flex h-[64px] items-center justify-between px-6 relative w-full z-10">
        <div className="w-[13.3px] h-[8.7px] relative cursor-pointer hover:opacity-75 transition-opacity">
          <img alt="Menu" className="w-full h-full object-contain" src={imgHamburger} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-display italic text-[24px] tracking-[-0.6px] text-[#1a1d14]">
            A & B
          </h1>
        </div>
        <div className="w-4" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full max-w-[480px] pt-[48px] pb-[40px] px-6 relative z-7">
        
        {/* Section Header */}
        <div className="w-full flex flex-col gap-[16px] items-center mb-[40px]">
          <h2 className="font-display italic text-[36px] text-center text-[#1a1d14] leading-[40px]">
            Wedding Gift
          </h2>
          <div className="flex gap-[12px] items-center justify-center w-[228px]">
            <div className="bg-gradient-to-r from-transparent to-[#c9a84c] h-[0.5px] flex-1 opacity-30" />
            <div className="w-[12px] h-[12px] relative flex items-center justify-center">
              <img alt="" className="w-full h-full object-contain" src={imgDivider} />
            </div>
            <div className="bg-gradient-to-r from-[#c9a84c] to-transparent h-[0.5px] flex-1 opacity-30" />
          </div>
        </div>

        {/* Opening Message */}
        <div className="w-full text-center px-4 mb-[48px]">
          <p className="font-display italic text-[20px] text-[#5f5f58] leading-[32.5px]">
            &ldquo;Your presence is our greatest gift, but if you wish to honor us with a gift, your kindness would be deeply appreciated.&rdquo;
          </p>
        </div>

        {/* Bank Cards Container */}
        <div className="w-full flex flex-col gap-[32px] items-center mb-[48px]">
          
          {/* Card 1: Bank BSI */}
          <div className="backdrop-blur-[6px] bg-[rgba(253,252,249,0.6)] border border-solid border-[rgba(201,168,76,0.2)] flex flex-col items-center p-[24px] sm:p-[33px] relative rounded-[16px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.02)] w-full">
            {/* The physical BSI Card (Embedded and scaled down) */}
            <div 
              className="w-full max-w-[280px] relative aspect-[1.58/1] rounded-[12px] overflow-hidden border border-[#1b1c1e] bg-[#9ca0a5] shadow-[0px_8px_16px_rgba(0,0,0,0.12)] flex flex-col justify-between p-[5%] text-white select-none mb-6 transition-all duration-300 hover:shadow-[0px_12px_20px_rgba(0,0,0,0.18)] hover:scale-[1.01]"
              style={{ containerType: "inline-size" }}
            >
              {/* Wavy Background SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 316 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9da1a5" />
                    <stop offset="50%" stopColor="#aab0b4" />
                    <stop offset="100%" stopColor="#b6bac0" />
                  </linearGradient>
                  <linearGradient id="charcoalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#45484c" />
                    <stop offset="50%" stopColor="#3c3f42" />
                    <stop offset="100%" stopColor="#2a2c2f" />
                  </linearGradient>
                </defs>
                <rect width="316" height="200" fill="url(#silverGrad)" />
                <path d="M 0,0 L 95,0 C 80,65 110,135 210,200 L 0,200 Z" fill="url(#charcoalGrad)" />
                <path d="M 0,0 L 85,0 C 70,60 100,130 195,200 L 0,200 Z" fill="#282a2d" opacity="0.3" />
                <path d="M 95,0 C 80,65 110,135 210,200" fill="none" stroke="#b2b6bb" strokeWidth="1.5" opacity="0.4" />
                <path d="M 0,0 L 35,0 C 25,45 10,85 0,110 Z" fill="url(#silverGrad)" />
                <path d="M 35,0 C 25,45 10,85 0,110" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
              </svg>

              {/* EMV Chip */}
              <div className="absolute top-[34%] left-[8%] w-[13.5cqw] aspect-[1.25/1] rounded-[3px] bg-gradient-to-br from-[#ffd573] via-[#e5c057] to-[#b38e2d] border border-[#8f6d17] p-[1.5%] shadow-[inset_0.5px_0.5px_1px_rgba(255,255,255,0.4),0_1px_2px_rgba(0,0,0,0.15)] flex flex-col justify-between overflow-hidden">
                <div className="w-full h-full relative">
                  <div className="absolute inset-[15%] border border-[#70520a]/80 rounded-[1.5px]" />
                  <div className="absolute left-[50%] top-0 bottom-0 w-[0.3cqw] bg-[#70520a]/80" />
                  <div className="absolute top-[50%] left-0 right-0 h-[0.3cqw] bg-[#70520a]/80" />
                  <div className="absolute left-[25%] top-[15%] bottom-[15%] w-[0.3cqw] bg-[#70520a]/80" />
                  <div className="absolute right-[25%] top-[15%] bottom-[15%] w-[0.3cqw] bg-[#70520a]/80" />
                </div>
              </div>

              {/* Platinum Debit Label */}
              <div 
                className="absolute top-[37%] left-[24.5%] flex flex-col leading-[1] font-sans font-medium text-white/95 text-left" 
                style={{ fontSize: "2.5cqw", letterSpacing: "0.08em" }}
              >
                <span className="font-bold tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">PLATINUM</span>
                <span className="font-bold tracking-widest text-[#a8abb0] drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" style={{ fontSize: "2.2cqw" }}>DEBIT</span>
              </div>

              {/* BSI Logo */}
              <div className="absolute top-[8%] right-[6%] flex items-end select-none">
                <span 
                  className="font-sans font-black text-white leading-none tracking-tighter" 
                  style={{ fontSize: "6.5cqw", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                >
                  BSI
                </span>
                {/* 4-pointed Sparkle Star */}
                <svg viewBox="0 0 10 10" className="w-[3cqw] h-[3cqw] fill-[#FAB81E]" style={{ marginLeft: "0.4cqw", marginBottom: "2.2cqw" }}>
                  <path d="M5,0 Q5,4 9,4 Q5,4 5,8 Q5,4 1,4 Q5,4 5,0 Z" />
                </svg>
              </div>

              {/* Card Number (Account Number) */}
              <div 
                className="absolute top-[53%] left-[8%] font-mono text-white text-left tracking-[0.16em] font-semibold" 
                style={{ fontSize: "5.2cqw", textShadow: "1px 1px 1px rgba(0,0,0,0.85), -0.5px -0.5px 0px rgba(255,255,255,0.45)" }}
              >
                7147 7788 88
              </div>

              {/* Valid Thru */}
              <div 
                className="absolute top-[71%] left-[34%] flex flex-col items-end leading-[0.9] text-white/80 text-right font-sans font-bold" 
                style={{ fontSize: "1.3cqw", letterSpacing: "0.02em", textShadow: "0 0.5px 1px rgba(0,0,0,0.4)" }}
              >
                <span>VALID</span>
                <span>THRU</span>
              </div>
              <div 
                className="absolute top-[69.5%] left-[41%] font-mono text-white tracking-widest font-semibold" 
                style={{ fontSize: "3.6cqw", textShadow: "1px 1px 1px rgba(0,0,0,0.8), -0.5px -0.5px 0px rgba(255,255,255,0.4)" }}
              >
                12/29
              </div>

              {/* Card Holder Name */}
              <div 
                className="absolute top-[79.5%] left-[8%] font-mono text-white tracking-[0.12em] font-semibold uppercase" 
                style={{ fontSize: "3.5cqw", textShadow: "1px 1px 1px rgba(0,0,0,0.8), -0.5px -0.5px 0px rgba(255,255,255,0.4)" }}
              >
                Brandon & Meyca
              </div>

              {/* GPN Logo */}
              <div className="absolute bottom-[6%] right-[6%] flex flex-col items-center">
                <svg viewBox="0 0 40 28" className="w-[10cqw] h-[7cqw]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M34.8 6.5C31.5 10.2 28.5 13.8 24.2 16.2C27.5 12.8 29.8 8.5 25.2 6.8C28.2 5.2 29.5 2.5 23.5 2.5C26.8 1.2 27.2 0 21.2 0C25.5 0 29.2 1.5 31.8 5.2C30.2 3.5 28.2 2.2 25.5 1.5C29.2 2.5 31.8 5.2 32.5 8.2C31.5 6.2 29.8 4.8 27.5 3.8C30.8 5.2 32.8 8.2 32.8 11.5C32.2 9.2 30.5 7.8 28.2 6.8C31.5 8.5 33.2 11.8 33.2 15.2C32.8 13.2 31.5 11.8 29.2 10.8C31.8 12.5 33.5 15.8 33.2 19.5C34.5 16.2 34.8 11.5 34.8 6.5Z"
                    fill="#E21C26"
                  />
                  <path
                    d="M24.2 16.2C19.2 19 14.2 19.5 9 17.5C13.5 15.5 16.2 12.5 10.5 11.2C15.2 9.8 17 6.8 11.2 6.8C15.8 5.2 16.5 2.5 9.5 3.8C15.5 2.2 19.2 4.2 21.8 7.5C20.2 5.5 18 4.2 14.5 3.8C18.8 4.8 21.5 7.8 22.2 11.2C21 8.8 19 7.2 16 6.2C20 7.8 22.2 11.2 22.5 15C21.8 12.5 19.8 11 17 9.8C20.8 11.8 22.8 15.5 22.5 19.2C22 17 20.2 15.5 17.5 14.5C20.2 16.5 21.8 19.8 21.2 23.5C22.8 19.8 23.5 17.5 24.2 16.2Z"
                    fill="#E21C26"
                  />
                </svg>
                <span className="font-sans font-black text-[#0B3363] leading-none tracking-tighter" style={{ fontSize: "3cqw", marginTop: "0.4cqw" }}>
                  GPN
                </span>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={() => handleCopy("bsi", "7147778888")}
              className="bg-[rgba(201,168,76,0.05)] border border-solid border-[rgba(201,168,76,0.3)] flex gap-[8px] items-center px-[25px] py-[9px] rounded-full hover:bg-[rgba(201,168,76,0.1)] active:scale-[0.97] transition-all cursor-pointer"
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

          {/* Card 2: Bank BCA */}
          <div className="backdrop-blur-[6px] bg-[rgba(253,252,249,0.6)] border border-solid border-[rgba(201,168,76,0.2)] flex flex-col items-center p-[33px] relative rounded-[16px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.02)] w-full">
            <div className="w-full flex justify-start mb-6">
              <div className="h-[24px] w-[75px] relative opacity-50 mix-blend-multiply">
                <img alt="BCA Logo" className="w-full h-full object-contain" src={imgBcaLogo} />
              </div>
            </div>

            <span className="font-body font-normal text-[10px] text-[rgba(95,95,88,0.7)] text-center tracking-[2px] uppercase mb-1">
              ACCOUNT NUMBER
            </span>
            
            <h3 className="font-display italic text-[30px] text-center text-[#1a1d14] leading-[36px] mb-2">
              1234567890
            </h3>

            <span className="font-body font-normal text-[14px] text-[rgba(95,95,88,0.8)] text-center mb-6">
              Brandon & Meyca
            </span>

            {/* Copy Button */}
            <button
              onClick={() => handleCopy("bca", "1234567890")}
              className="bg-[rgba(201,168,76,0.05)] border border-solid border-[rgba(201,168,76,0.3)] flex gap-[8px] items-center px-[25px] py-[9px] rounded-full hover:bg-[rgba(201,168,76,0.1)] active:scale-[0.97] transition-all cursor-pointer"
            >
              <div className="w-[8.1px] h-[9.9px] relative flex items-center justify-center">
                {copiedId === "bca" ? (
                  <span className="text-[#c9a84c] text-[10px] font-bold">✓</span>
                ) : (
                  <img alt="" className="w-full h-full object-contain" src={imgCopyIcon} />
                )}
              </div>
              <span className="font-body font-normal text-[11px] text-[#c9a84c] tracking-[0.55px] uppercase">
                {copiedId === "bca" ? "COPIED!" : "COPY NUMBER"}
              </span>
            </button>
          </div>

        </div>

        {/* Gift Registry / Physical Address */}
        <div className="backdrop-blur-[6px] bg-[rgba(253,252,249,0.6)] border border-solid border-[rgba(201,168,76,0.2)] flex flex-col gap-[16px] items-center p-[41px] rounded-tl-[140px] rounded-tr-[140px] rounded-bl-[16px] rounded-br-[16px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.02)] w-full mb-8">
          <div className="w-[24px] h-[21.2px] relative flex items-center justify-center">
            <img alt="Gift Box" className="w-full h-full object-contain" src={imgGiftBoxIcon} />
          </div>
          <span className="font-body font-normal text-[11px] text-[rgba(95,95,88,0.7)] text-center tracking-[3.3px] uppercase">
            PHYSICAL GIFTS
          </span>
          
          <div className="w-full flex flex-col gap-[11.2px] items-center py-2">
            <h4 className="font-display font-normal text-[24px] text-center text-[#1a1d14] leading-[32px]">
              The Penthouse Residences
            </h4>
            <p className="font-body font-normal text-[14px] text-[rgba(95,95,88,0.8)] text-center leading-[22.75px]">
              Jl. Senopati No. 12, Tower A, Unit 15C<br />
              Kebayoran Baru, Jakarta Selatan<br />
              12190
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=The+Penthouse+Residences+Jl.+Senopati+No.+12+Jakarta"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-solid border-[rgba(201,168,76,0.3)] flex gap-[8px] items-center pb-[5px] cursor-pointer hover:border-[#c9a84c] transition-colors"
          >
            <div className="w-[8.2px] h-[10.5px] relative flex items-center justify-center">
              <img alt="" className="w-full h-full object-contain" src={imgMapPinIcon} />
            </div>
            <span className="font-body font-normal text-[11px] text-[#c9a84c] tracking-[1.1px] uppercase">
              VIEW ON MAPS
            </span>
          </a>
        </div>

        {/* Closing Note */}
        <div className="w-full text-center py-8 mb-12">
          <p className="font-display italic text-[20px] text-[rgba(95,95,88,0.7)] leading-[28px]">
            Terima kasih atas doa dan restu Anda.
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="relative w-full bg-[#fdfcf9] flex flex-col items-center px-6 py-[64px] z-6 overflow-hidden border-t border-[rgba(201,168,76,0.1)]">
        {/* Background Footer Leaf Illustration */}
        <div className="absolute inset-0 opacity-3 pointer-events-none flex items-center justify-center">
          <img
            alt=""
            className="w-full h-full object-cover max-w-none mix-blend-saturation scale-110"
            src={imgFooterLeaf}
          />
        </div>

        <div className="flex flex-col items-center pt-[32px] relative z-10 w-full">
          <h2 className="font-display italic text-[36px] text-center text-[#1a1d14] leading-[40px] mb-8">
            A & B
          </h2>
          
          <div className="flex gap-[32px] justify-center items-center mb-12">
            <span className="font-body font-normal text-[11px] text-[rgba(95,95,88,0.6)] tracking-[1.1px] uppercase cursor-pointer hover:text-[#1a1d14] transition-colors">
              SAVE THE DATE
            </span>
            <span className="font-body font-normal text-[11px] text-[rgba(95,95,88,0.6)] tracking-[1.1px] uppercase cursor-pointer hover:text-[#1a1d14] transition-colors">
              LOCATION
            </span>
            <span className="font-body font-normal text-[11px] text-[rgba(95,95,88,0.6)] tracking-[1.1px] uppercase cursor-pointer hover:text-[#1a1d14] transition-colors">
              GIFT REGISTRY
            </span>
          </div>

          <span className="font-body font-normal text-[10px] text-[rgba(95,95,88,0.5)] tracking-[2px] uppercase text-center">
            WITH LOVE, BRANDON & MEYCA — 2024
          </span>
        </div>
      </div>
    </div>
  );
}
