"use client";

import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { decodeGuestName } from "@/lib/utils";
import CountdownTimer from "@/components/countdown/CountdownTimer";

export default function HeroSection() {
  const searchParams = useSearchParams();
  const guestName = decodeGuestName(searchParams.get("to") ?? "Tamu Undangan");
  const coupleRef = useRef<HTMLDivElement>(null);

  const handleScrollToCouple = () => {
    coupleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const imgTempleIllustration = "/images/figma/temple_illustration.png";
  const imgBrandonProfile = "/images/figma/brandon_profile.png";
  const imgMeycaProfile = "/images/figma/meyca_profile.png";
  const imgFadedTempleFooter = "/images/figma/faded_temple_footer.png";
  const imgBotanicalSketchTop = "/images/figma/botanical_sketch_top.png";
  const imgBotanicalSketchBottom = "/images/figma/botanical_sketch_bottom.png";

  return (
    <div className="relative w-full min-h-screen bg-[#FDFCF9] text-[#1a1d14] font-work overflow-hidden">
      {/* Styles Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        .paper-texture {
          background-image: url('https://www.transparenttextures.com/patterns/p6.png');
          opacity: 0.15;
        }
        .watercolor-bloom {
          filter: blur(60px);
          opacity: 0.25;
          mix-blend-mode: multiply;
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
        {/* Integrated Botanical Sketches (Subtle Fine-Line) */}
        <div className="absolute top-10 right-4 w-32 h-32 opacity-10 rotate-12">
          <img alt="" className="w-full h-full object-contain" src={imgBotanicalSketchTop} />
        </div>
        <div className="absolute bottom-1/3 left-2 w-24 h-24 opacity-[0.07] -rotate-45">
          <img alt="" className="w-full h-full object-contain" src={imgBotanicalSketchBottom} />
        </div>
      </div>

      {/* Section 1: Hero Invitation */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-[24px] py-10 z-10 fade-in">
        {/* Sophisticated Arch */}
        <div className="relative w-full aspect-[4/6.2] bg-white/30 backdrop-blur-[1px] rounded-[15rem] flex flex-col items-center justify-center p-8 text-center double-hairline-border">
          {/* Outer hairline border helper */}
          <div className="absolute inset-[-8px] border border-[rgba(212,175,55,0.15)] rounded-[15.5rem] pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            <span className="font-work text-[11px] text-[#5f5f58]/70 tracking-[0.4em] uppercase font-medium">The Wedding of</span>
            <div className="flex flex-col items-center gap-1">
              <h1 className="font-display text-[54px] text-[#585e4d] italic font-light tracking-tight leading-none">Brandon</h1>
              <span className="font-display text-[36px] text-[#D4AF37] font-light leading-none">&amp;</span>
              <h1 className="font-display text-[54px] text-[#585e4d] italic font-light tracking-tight leading-none">Meyca</h1>
            </div>
            
            {/* Guest Card */}
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-[32px_40px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] max-w-[320px] carved-shadow mt-4">
              <p className="font-work text-[10px] text-[#5f5f58]/60 mb-3 uppercase tracking-widest font-medium">Dear Sir / Madam</p>
              <h3 className="font-work text-[14px] text-[#585e4d] mb-5 tracking-[0.2em] font-semibold uppercase">{guestName}</h3>
              <p className="font-display text-[18px] text-[#5f5f58]/80 italic mb-8 font-light leading-snug">You are cordially invited to celebrate our union.</p>
              <button 
                onClick={handleScrollToCouple}
                className="button-premium w-full bg-[#585e4d] text-white rounded-full py-4 flex items-center justify-center gap-3 shadow-lg shadow-[#585e4d]/10 cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
              >
                {/* Mail Icon SVG */}
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="font-work text-[11px] tracking-[0.2em] font-semibold uppercase">Open Invitation</span>
              </button>
            </div>
          </div>
          
          {/* Architectural Detail (Bottom) */}
          <div className="absolute bottom-4 w-full h-1/5 opacity-10 flex justify-center grayscale pointer-events-none">
            <img alt="temple illustration" className="w-full h-full object-contain object-bottom scale-110" src={imgTempleIllustration} />
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div className="mt-8 flex flex-col items-center">
          {/* Double arrow down SVG */}
          <svg className="w-5 h-5 text-[#D4AF37] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
          </svg>
          <p className="font-work text-[9px] text-[#5f5f58]/50 mt-3 tracking-[0.5em]">DISCOVER MORE</p>
        </div>
      </section>

      {/* Countdown Timer (Save The Date) */}
      <CountdownTimer />

      {/* Divider */}
      <div className="relative w-full px-[24px] flex items-center justify-center py-10">
        <div className="h-[0.5px] w-full bg-[#D4AF37]/20"></div>
        <div className="absolute bg-[#FDFCF9] px-6 flex items-center gap-2">
          {/* Flare icon SVG */}
          <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2 L14.5,9.5 L22,12 L14.5,14.5 L12,22 L9.5,14.5 L2,12 L9.5,9.5 Z" />
          </svg>
          {/* Spa/Lotus icon SVG */}
          <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,3 C12,3 15,7 15,11 C15,15 12,19 12,21 C12,19 9,15 9,11 C9,7 12,3 12,3 Z" />
          </svg>
          {/* Flare icon SVG */}
          <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2 L14.5,9.5 L22,12 L14.5,14.5 L12,22 L9.5,14.5 L2,12 L9.5,9.5 Z" />
          </svg>
        </div>
      </div>

      {/* Section 2: The Happy Couple */}
      <section ref={coupleRef} className="relative px-[24px] z-10 flex flex-col items-center py-10">
        <p className="font-display text-[20px] text-[#5f5f58]/70 italic text-center mb-16 max-w-[320px] font-light leading-relaxed">
          &ldquo;With hearts full of joy, we invite you to share in the beginning of our new chapter together.&rdquo;
        </p>
        
        {/* Brandon Profile */}
        <div className="flex flex-col items-center mb-20 w-full">
          <div className="relative mb-8">
            {/* Frame Decoration */}
            <div className="absolute -top-6 -left-6 w-24 h-24 opacity-20 pointer-events-none">
              <img alt="foliage" className="w-full h-full object-contain" src={imgBotanicalSketchBottom} />
            </div>
            <div className="w-52 h-64 rounded-full overflow-hidden border-[4px] border-white shadow-xl relative z-10 double-hairline-border rotate-[-1deg]">
              {/* Outer hairline helper */}
              <div className="absolute inset-[-8px] border border-[rgba(212,175,55,0.15)] rounded-full pointer-events-none" />
              <img alt="Brandon" className="w-full h-full object-cover" src={imgBrandonProfile} />
            </div>
          </div>
          
          <div className="text-center flex flex-col items-center gap-2">
            <span className="font-work text-[10px] text-[#5f5f58]/40 tracking-[0.3em] uppercase">Only Child of Mr &amp; Mrs Lorem</span>
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
        </div>
        
        {/* Meyca Profile */}
        <div className="flex flex-col items-center mb-20 w-full">
          <div className="relative mb-8">
            {/* Frame Decoration */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-20 scale-x-[-1] pointer-events-none">
              <img alt="foliage" className="w-full h-full object-contain" src={imgBotanicalSketchBottom} />
            </div>
            <div className="w-52 h-64 rounded-full overflow-hidden border-[4px] border-white shadow-xl relative z-10 double-hairline-border rotate-[1deg]">
              {/* Outer hairline helper */}
              <div className="absolute inset-[-8px] border border-[rgba(212,175,55,0.15)] rounded-full pointer-events-none" />
              <img alt="Meyca" className="w-full h-full object-cover" src={imgMeycaProfile} />
            </div>
          </div>
          
          <div className="text-center flex flex-col items-center gap-2">
            <span className="font-work text-[10px] text-[#5f5f58]/40 tracking-[0.3em] uppercase">Eldest Daughter of Mr &amp; Mrs Ipsum</span>
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
        </div>
      </section>

      {/* Footer / Closing */}
      <footer className="relative min-h-[400px] flex flex-col items-center justify-center text-center px-[24px] pb-32 z-10">
        {/* Ethereal Close Background */}
        <div className="absolute inset-0 grayscale opacity-[0.02] pointer-events-none overflow-hidden">
          <img alt="faded temple" className="w-full h-full object-cover scale-150" src={imgFadedTempleFooter} />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <p className="font-display text-[20px] text-[#5f5f58]/60 italic max-w-[280px] font-light leading-relaxed">
            With gratitude from the families of
          </p>
          <h2 className="font-display text-5xl text-[#585e4d] italic font-light tracking-tight">Brandon &amp; Meyca</h2>
          <div className="flex flex-col items-center gap-4 pt-8">
            <div className="w-10 h-[1px] bg-[#D4AF37]/30"></div>
            {/* Heart Icon SVG */}
            <svg className="w-7 h-7 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="font-work text-[10px] tracking-[0.5em] text-[#5f5f58]/40 uppercase font-medium">Thank You</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
