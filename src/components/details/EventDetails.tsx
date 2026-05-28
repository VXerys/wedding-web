"use client";

import React, { useState } from "react";

interface EventDetailsProps {
  guestName?: string;
}

export default function EventDetails({ guestName = "" }: EventDetailsProps) {
  const [name, setName] = useState(guestName);
  const [attendance, setAttendance] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const imgImage = "/images/figma/8b40ecdeddf1f3897149eac1cfdfdbcb0b9f808a.png";
  const imgBotanical1 = "/images/figma/d540e9f3235a86d6904c5eb0df6518a696ba706e.png";
  const imgBotanical2 = "/images/figma/0075a5a667093bb6693efe3ca1de31736ffe19a9.png";
  const imgContainer = "/images/figma/d745edfa5a6618dd70dff20b2a6531d6e9e0306d.svg";
  const imgIcon = "/images/figma/8bb27d8679887499077b1019b0deade4bec132f9.svg";
  const imgContainer1 = "/images/figma/e009ff2efd2048f5dc22b9cc5eabd9fb1beed9bb.svg";
  const imgContainer2 = "/images/figma/970b3fe4ee7db38ce0afbe3361524e81fe190ad9.svg";
  const imgIcon1 = "/images/figma/59b5a93121e1d44887e59105049029be0124e467.svg";
  const imgContainer3 = "/images/figma/74cbb449b4007381b2e0d44b230d55a566c8aefd.svg";
  const imgContainer4 = "/images/figma/3c32ef3ac9d7a54e19a727e671662fdb5289ea62.svg";
  const imgImage1 = "/images/figma/75d1d7025a8999bf7450ff7c878bf648c29ca87f.svg";
  const imgIcon2 = "/images/figma/cea24c81bc9873e3acccde10cb974e063df0d38a.svg";

  const mapsUrl =
    process.env.NEXT_PUBLIC_MAPS_URL ??
    "https://maps.google.com/?q=-6.2088,106.8456";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attendance) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAttendance("");
    }, 4000);
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center overflow-x-hidden"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(253, 252, 249) 0%, rgb(253, 252, 249) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
      }}
    >
      {/* Background repeating grid pattern */}
      <div
        className="absolute inset-0 opacity-15 bg-[length:8px_8px] bg-left-top bg-repeat pointer-events-none"
        style={{ backgroundImage: `url('${imgImage}')` }}
      />

      {/* Decorative background blurs */}
      <div className="absolute bg-[#e2e8df] blur-[30px] left-[-80px] mix-blend-multiply opacity-25 rounded-full w-[400px] h-[400px] top-[-80px] pointer-events-none" />
      <div className="absolute bg-[#e2e8df] blur-[30px] bottom-[574.5px] mix-blend-multiply opacity-25 right-[-160px] rounded-full w-[450px] h-[450px] pointer-events-none" />

      {/* Botanical Sketches */}
      <div className="absolute right-[4.1px] w-[151.8px] h-[151.8px] top-[68.09px] flex items-center justify-center pointer-events-none z-10">
        <div className="rotate-12 w-[128px] h-[128px] opacity-10 relative">
          <img
            alt=""
            className="absolute left-0 max-w-none w-full h-full top-0 object-contain"
            src={imgBotanical1}
          />
        </div>
      </div>

      <div className="absolute bottom-[140.12px] w-[135.7px] h-[135.7px] left-[-11.88px] flex items-center justify-center pointer-events-none z-10">
        <div className="-rotate-45 w-[96px] h-[96px] opacity-7 relative">
          <img
            alt=""
            className="absolute left-0 max-w-none w-full h-full top-0 object-contain"
            src={imgBotanical2}
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-col gap-[32px] items-center w-full max-w-[480px] pb-[136.5px] pt-[79px] px-[24px] relative z-25">
        
        {/* Section Intro */}
        <div className="w-full flex flex-col gap-[4px] items-center relative">
          <span className="font-body font-semibold text-[13px] text-center tracking-[1.56px] text-[#5f5f58] uppercase">
            EVENT DETAILS
          </span>
          <h2 className="font-display font-light italic text-[42px] text-center text-[#585e4d] leading-[42px] tracking-[-0.42px]">
            Detail Acara
          </h2>
          <div className="flex gap-[12px] items-center justify-center pt-[12px] w-full">
            <div className="bg-[rgba(201,168,76,0.3)] h-[0.5px] w-[48px]" />
            <div className="w-[11.397px] h-[11.397px] relative flex items-center justify-center">
              <img alt="" className="w-full h-full object-contain" src={imgContainer} />
            </div>
            <div className="bg-[rgba(201,168,76,0.3)] h-[0.5px] w-[48px]" />
          </div>
        </div>

        {/* Event Cards Container */}
        <div className="w-full flex flex-col gap-[32px] items-center relative">
          
          {/* Card 1: Akad Nikah */}
          <div className="backdrop-blur-[6px] bg-[rgba(253,252,249,0.8)] flex flex-col gap-[24px] items-center p-[40px] relative rounded-bl-[16px] rounded-br-[16px] rounded-tl-[100px] rounded-tr-[100px] w-full shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.05)] border border-[rgba(201,168,76,0.15)]">
            <div className="w-full flex flex-col items-center">
              <div className="w-[27px] h-[24px] relative flex items-center justify-center">
                <img alt="Heart icon" className="w-full h-full object-contain" src={imgIcon} />
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
              <h3 className="font-display font-normal italic text-[30px] text-center text-[#585e4d] leading-[36px]">
                Akad Nikah
              </h3>
            </div>

            <div className="w-full flex flex-col gap-[15.5px] items-center">
              {/* Date */}
              <div className="flex gap-[8px] items-center justify-center w-full">
                <div className="w-[10.667px] h-[12.154px] relative flex items-center justify-center">
                  <img alt="Calendar" className="w-full h-full object-contain" src={imgContainer1} />
                </div>
                <span className="font-body font-normal text-[16px] text-[rgba(95,95,88,0.8)] text-center leading-[24px]">
                  Minggu, 12 Desember 2024
                </span>
              </div>

              {/* Time */}
              <div className="flex gap-[8px] items-center justify-center w-full">
                <div className="w-[12px] h-[12px] relative flex items-center justify-center">
                  <img alt="Clock" className="w-full h-full object-contain" src={imgContainer2} />
                </div>
                <span className="font-body font-normal text-[16px] text-[rgba(95,95,88,0.8)] text-center leading-[24px]">
                  08:00 - 10:00 WIB
                </span>
              </div>

              {/* Venue Address Section */}
              <div className="border-t border-[rgba(201,168,76,0.1)] border-solid flex flex-col gap-[8px] items-center pt-[25px] w-full">
                <h4 className="font-body font-normal text-[16px] text-[#585e4d] text-center leading-[24px]">
                  Masjid Raya Al-Ikhlas
                </h4>
                <p className="font-body italic text-[12px] text-[rgba(95,95,88,0.8)] text-center leading-[18px] opacity-70 max-w-[280px]">
                  Jl. Melati No. 45, Kebayoran Baru, Jakarta Selatan
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Resepsi Pernikahan */}
          <div className="backdrop-blur-[6px] bg-[rgba(253,252,249,0.8)] flex flex-col gap-[24px] items-center p-[40px] relative rounded-bl-[16px] rounded-br-[16px] rounded-tl-[100px] rounded-tr-[100px] w-full shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.05)] border border-[rgba(201,168,76,0.15)]">
            <div className="w-full flex flex-col items-center">
              <div className="w-[27.5px] h-[26px] relative flex items-center justify-center">
                <img alt="Confetti icon" className="w-full h-full object-contain" src={imgIcon1} />
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
              <h3 className="font-display font-normal italic text-[30px] text-center text-[#585e4d] leading-[36px]">
                Resepsi Pernikahan
              </h3>
            </div>

            <div className="w-full flex flex-col gap-[15.5px] items-center">
              {/* Date */}
              <div className="flex gap-[8px] items-center justify-center w-full">
                <div className="w-[10.667px] h-[12.154px] relative flex items-center justify-center">
                  <img alt="Calendar" className="w-full h-full object-contain" src={imgContainer1} />
                </div>
                <span className="font-body font-normal text-[16px] text-[rgba(95,95,88,0.8)] text-center leading-[24px]">
                  Minggu, 12 Desember 2024
                </span>
              </div>

              {/* Time */}
              <div className="flex gap-[8px] items-center justify-center w-full">
                <div className="w-[12px] h-[12px] relative flex items-center justify-center">
                  <img alt="Clock" className="w-full h-full object-contain" src={imgContainer2} />
                </div>
                <span className="font-body font-normal text-[16px] text-[rgba(95,95,88,0.8)] text-center leading-[24px]">
                  11:00 - 13:00 WIB
                </span>
              </div>

              {/* Venue Address Section */}
              <div className="border-t border-[rgba(201,168,76,0.1)] border-solid flex flex-col gap-[8px] items-center pt-[25px] w-full">
                <h4 className="font-body font-normal text-[16px] text-[#585e4d] text-center leading-[24px]">
                  The Glass House Garden
                </h4>
                <p className="font-body italic text-[12px] text-[rgba(95,95,88,0.8)] text-center leading-[18px] opacity-70 max-w-[280px]">
                  Jl. Mawar Indah Blok B2, Jakarta Selatan
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Tiles */}
        <div className="grid grid-cols-2 gap-[16px] w-full">
          {/* Tile 1: Buka Maps */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.5)] border border-[rgba(201,168,76,0.2)] border-solid flex flex-col gap-[11px] items-center justify-center px-[20px] py-[32.5px] rounded-[16px] shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.05)] cursor-pointer hover:bg-white/70 transition-all duration-300"
          >
            <div className="w-[22.5px] h-[22.5px] relative flex items-center justify-center">
              <img alt="Compass" className="w-full h-full object-contain" src={imgContainer3} />
            </div>
            <span className="font-body font-medium text-[11px] text-center tracking-[1.32px] text-[#c9a84c]">
              BUKA MAPS
            </span>
          </a>

          {/* Tile 2: Dress Code */}
          <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.5)] border border-[rgba(201,168,76,0.2)] border-solid flex flex-col gap-[11px] items-center justify-center p-[25px] rounded-[16px] shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.05)]">
            <div className="w-[22.524px] h-[17.5px] relative flex items-center justify-center">
              <img alt="Hanger" className="w-full h-full object-contain" src={imgContainer4} />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-body font-medium text-[11px] text-center tracking-[1.32px] text-[#c9a84c] mb-1">
                DRESS CODE
              </span>
              <span className="font-body font-normal text-[10px] text-[rgba(95,95,88,0.6)] text-center leading-[15px]">
                Earth Tones / Pastel
              </span>
            </div>
          </div>
        </div>

        {/* RSVP Section */}
        <div className="w-full flex flex-col gap-[40px] items-center pt-[31px]">
          
          {/* Header block */}
          <div className="w-full flex flex-col gap-[4.2px] items-center relative">
            <span className="font-body font-semibold text-[13px] text-center tracking-[1.56px] text-[#5f5f58] uppercase">
              RSVP
            </span>
            <h2 className="font-display font-light italic text-[42px] text-center text-[#585e4d] leading-[42px] tracking-[-0.42px]">
              Konfirmasi Kehadiran
            </h2>
            <div className="flex gap-[12px] items-center justify-center pt-[11.8px] w-full">
              <div className="bg-[rgba(201,168,76,0.3)] h-[0.5px] w-[48px]" />
              <div className="w-[11.397px] h-[11.397px] relative flex items-center justify-center">
                <img alt="" className="w-full h-full object-contain" src={imgContainer} />
              </div>
              <div className="bg-[rgba(201,168,76,0.3)] h-[0.5px] w-[48px]" />
            </div>
            <p className="font-body italic text-[16px] text-center text-[rgba(95,95,88,0.7)] leading-[24px] pt-[11.8px] max-w-[320px]">
              Kami sangat menantikan kehadiran Bapak/Ibu/Saudara/i
            </p>
          </div>

          {/* RSVP Form Card */}
          <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.6)] border border-solid border-white flex flex-col items-center pb-[49px] pt-[32px] px-[33px] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full">
            {submitted ? (
              <div className="w-full flex flex-col items-center py-8 text-center">
                <span className="text-3xl mb-2">🎉</span>
                <h4 className="font-body font-semibold text-[16px] text-[#585e4d] mb-1">
                  Terima kasih!
                </h4>
                <p className="font-body italic text-[13px] text-[rgba(95,95,88,0.7)]">
                  Konfirmasi kehadiran Anda telah kami simpan.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[23px] items-stretch">
                {/* Input: Nama Lengkap */}
                <div className="w-full flex flex-col gap-[8px] items-start">
                  <label htmlFor="rsvp-name" className="font-body font-medium text-[11px] tracking-[1.32px] text-[#c9a84c]">
                    NAMA LENGKAP
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama Anda"
                    className="w-full bg-[rgba(255,255,255,0.6)] border border-solid border-[rgba(201,168,76,0.1)] rounded-[48px] px-[17px] py-[19px] font-body text-[13px] text-[#1a1d14] placeholder-[rgba(95,95,88,0.3)] focus:outline-none focus:border-[#c9a84c] transition-colors"
                  />
                </div>

                {/* Input: Kehadiran */}
                <div className="w-full flex flex-col gap-[8px] items-start relative">
                  <label htmlFor="rsvp-attendance" className="font-body font-medium text-[11px] tracking-[1.32px] text-[#c9a84c]">
                    KEHADIRAN
                  </label>
                  <div className="w-full relative">
                    <select
                      id="rsvp-attendance"
                      required
                      value={attendance}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.6)] border border-solid border-[rgba(201,168,76,0.1)] rounded-[48px] px-[17px] py-[19px] font-body text-[13px] text-[#1a1d14] appearance-none focus:outline-none focus:border-[#c9a84c] transition-colors pr-10"
                    >
                      <option value="" disabled>Pilih status kehadiran</option>
                      <option value="Hadir">Hadir</option>
                      <option value="Tidak Hadir">Tidak Hadir</option>
                      <option value="Ragu">Ragu-ragu</option>
                    </select>
                    <div className="absolute right-[17px] top-1/2 -translate-y-1/2 pointer-events-none w-[19.5px] h-[19.5px] flex items-center justify-center">
                      <img alt="Chevron" className="w-full h-full object-contain" src={imgImage1} />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-[#c9a84c] relative rounded-[9999px] py-[20px] w-full flex items-center justify-center font-body font-medium text-[11px] text-white tracking-[2.2px] shadow-[0px_10px_15px_-3px_rgba(201,168,76,0.2),0px_4px_6px_-4px_rgba(201,168,76,0.2)] hover:bg-[#b5943f] active:scale-[0.98] transition-all cursor-pointer"
                >
                  KONFIRMASI KEHADIRAN
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="w-full flex flex-col items-center pb-[128px] pt-[32px]">
          <div className="flex flex-col gap-[23.6px] items-center">
            <p className="font-display font-light italic text-[18px] text-[rgba(95,95,88,0.6)] text-center leading-[29.25px]">
              With gratitude from the families of
            </p>
            <h2 className="font-display font-light italic text-[48px] text-center text-[#585e4d] leading-[48px] tracking-[-1.2px]">
              Brandon & Meyca
            </h2>
            <div className="flex flex-col gap-[11.8px] items-center pt-[24px]">
              <div className="bg-[rgba(201,168,76,0.3)] h-[1px] w-[40px]" />
              <div className="w-[18px] h-[16px] relative flex items-center justify-center">
                <img alt="Heart" className="w-full h-full object-contain" src={imgIcon2} />
              </div>
              <span className="font-body font-normal text-[9px] text-[rgba(95,95,88,0.4)] text-center tracking-[4.5px] uppercase">
                THANK YOU — 2024
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
