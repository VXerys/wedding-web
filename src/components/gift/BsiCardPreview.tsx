import React from "react";

function BsiCardPreview() {
  return (
    <div
      className="w-full max-w-[280px] relative aspect-[1.58/1] rounded-[12px] overflow-hidden border border-[#1b1c1e] bg-[#9ca0a5] shadow-[0px_8px_16px_rgba(0,0,0,0.12)] flex flex-col justify-between p-[5%] text-white select-none mb-6"
      style={{ containerType: "inline-size", contain: "paint", isolation: "isolate" }}
    >
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

      <div className="absolute top-[34%] left-[8%] w-[13.5cqw] aspect-[1.25/1] rounded-[3px] bg-gradient-to-br from-[#ffd573] via-[#e5c057] to-[#b38e2d] border border-[#8f6d17] p-[1.5%] shadow-[inset_0.5px_0.5px_1px_rgba(255,255,255,0.4),0_1px_2px_rgba(0,0,0,0.15)] flex flex-col justify-between overflow-hidden">
        <div className="w-full h-full relative">
          <div className="absolute inset-[15%] border border-[#70520a]/80 rounded-[1.5px]" />
          <div className="absolute left-[50%] top-0 bottom-0 w-[0.3cqw] bg-[#70520a]/80" />
          <div className="absolute top-[50%] left-0 right-0 h-[0.3cqw] bg-[#70520a]/80" />
          <div className="absolute left-[25%] top-[15%] bottom-[15%] w-[0.3cqw] bg-[#70520a]/80" />
          <div className="absolute right-[25%] top-[15%] bottom-[15%] w-[0.3cqw] bg-[#70520a]/80" />
        </div>
      </div>

      <div
        className="absolute top-[37%] left-[24.5%] flex flex-col leading-[1] font-sans font-medium text-white/95 text-left"
        style={{ fontSize: "2.5cqw", letterSpacing: "0.08em" }}
      >
        <span className="font-bold tracking-wider" style={{ textShadow: "0 1px 1px rgba(0,0,0,0.3)" }}>
          PLATINUM
        </span>
        <span
          className="font-bold tracking-widest text-[#a8abb0]"
          style={{ fontSize: "2.2cqw", textShadow: "0 1px 1px rgba(0,0,0,0.3)" }}
        >
          DEBIT
        </span>
      </div>

      <div className="absolute top-[8%] right-[6%] flex items-end select-none">
        <span
          className="font-sans font-black text-white leading-none tracking-tighter"
          style={{ fontSize: "6.5cqw", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
        >
          BSI
        </span>
        <svg viewBox="0 0 10 10" className="w-[3cqw] h-[3cqw] fill-[#FAB81E]" style={{ marginLeft: "0.4cqw", marginBottom: "2.2cqw" }}>
          <path d="M5,0 Q5,4 9,4 Q5,4 5,8 Q5,4 1,4 Q5,4 5,0 Z" />
        </svg>
      </div>

      <div
        className="absolute top-[53%] left-[8%] font-mono text-white text-left tracking-[0.16em] font-semibold"
        style={{ fontSize: "5.2cqw", textShadow: "1px 1px 1px rgba(0,0,0,0.85), -0.5px -0.5px 0px rgba(255,255,255,0.45)" }}
      >
        7147 7788 88
      </div>

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

      <div
        className="absolute top-[79.5%] left-[8%] font-mono text-white tracking-[0.12em] font-semibold uppercase"
        style={{ fontSize: "3.5cqw", textShadow: "1px 1px 1px rgba(0,0,0,0.8), -0.5px -0.5px 0px rgba(255,255,255,0.4)" }}
      >
        Brandon & Meyca
      </div>

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
  );
}

export default React.memo(BsiCardPreview);
