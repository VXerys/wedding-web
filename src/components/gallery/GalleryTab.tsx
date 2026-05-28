import React from "react";

export default function GalleryTab() {
  const imgImage = "/images/figma/8b40ecdeddf1f3897149eac1cfdfdbcb0b9f808a.png";
  const imgBotanical1 = "/images/figma/d540e9f3235a86d6904c5eb0df6518a696ba706e.png";
  const imgBotanical2 = "/images/figma/0075a5a667093bb6693efe3ca1de31736ffe19a9.png";
  const imgMainMoment = "/images/figma/539710a16a8e4593b04177a7287d1a686cb3c49f.png";
  const imgDetailMoment = "/images/figma/58df4d3861d556a32d9611d7ebe181f409759b8b.png";
  const imgDetailMoment1 = "/images/figma/bc72238c81bb18fc6dc53a32f0916a126009f9d5.png";
  const imgContainer = "/images/figma/68c0a575e0429a3317cb3b9703ca1501cde92e9a.svg";
  const imgContainer1 = "/images/figma/28e90c3f7da422ea4d9d412db4bafb955718abd2.svg";
  const imgIcon = "/images/figma/f0a0985e4ec65be955672ab2b838ad9b600c13e5.svg";

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center overflow-x-hidden"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(253, 252, 249) 0%, rgb(253, 252, 249) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
      }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-15 bg-[length:8px_8px] bg-left-top bg-repeat pointer-events-none"
        style={{ backgroundImage: `url('${imgImage}')` }}
      />

      {/* Decorative blurs */}
      <div className="absolute bg-[#e2e8df] blur-[30px] left-[-80px] mix-blend-multiply opacity-25 rounded-full w-[400px] h-[400px] top-[-80px] pointer-events-none" />
      <div className="absolute bg-[#e2e8df] blur-[30px] bottom-[507.25px] mix-blend-multiply opacity-25 right-[-160px] rounded-full w-[450px] h-[450px] pointer-events-none" />

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
      <div className="flex flex-col gap-[63px] items-center w-full max-w-[480px] pb-[139.8px] relative px-6 z-25">
        
        {/* Section: Gallery */}
        <div className="w-full flex flex-col gap-[37px] items-center pt-[47px] relative">
          
          {/* Header block */}
          <div className="w-full flex flex-col gap-[4.2px] items-center relative">
            <span className="font-body font-semibold text-[13px] text-center tracking-[1.56px] text-[#5f5f58] uppercase">
              GALLERY
            </span>
            <h2 className="font-display font-light italic text-[42px] text-center text-[#585e4d] leading-[42px] tracking-[-0.42px]">
              Our Moments
            </h2>
            <div className="flex gap-[12px] items-center justify-center pt-[11.8px] w-full">
              <div className="bg-[rgba(212,175,55,0.3)] h-[0.5px] w-[48px]" />
              <div className="w-[11.397px] h-[11.397px] relative flex items-center justify-center">
                <img alt="" className="w-full h-full object-contain" src={imgContainer} />
              </div>
              <div className="bg-[rgba(212,175,55,0.3)] h-[0.5px] w-[48px]" />
            </div>
          </div>

          {/* Editorial Gallery Layout */}
          <div className="w-full flex flex-col gap-[29px] items-center relative">
            
            {/* Main moment */}
            <div className="-rotate-1 w-[345.7px] flex justify-center items-center">
              <div className="aspect-[4/5] bg-[rgba(255,255,255,0.4)] flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[96px] shadow-[0px_0px_0px_1px_rgba(212,175,55,0.3),0px_0px_0px_4px_rgba(212,175,55,0.08)] w-full">
                <div className="w-full h-[419.5px] relative rounded-[92.8px] overflow-hidden">
                  <img
                    alt="Main Moment"
                    className="absolute h-full left-[-44.29%] max-w-none top-0 w-[188.58%] object-cover"
                    src={imgMainMoment}
                  />
                </div>
                {/* Thin internal border */}
                <div className="absolute border border-[rgba(212,175,55,0.15)] border-solid inset-[-6px] rounded-[96px] pointer-events-none" />
              </div>
            </div>

            {/* Detail moments */}
            <div className="grid grid-cols-2 gap-[24px] w-full px-[16px]">
              
              {/* Detail 1 */}
              <div className="rotate-2 w-[149.5px] justify-self-center">
                <div className="aspect-[3/4] bg-[rgba(255,255,255,0.4)] flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[80px] shadow-[0px_0px_0px_1px_rgba(212,175,55,0.3),0px_0px_0px_4px_rgba(212,175,55,0.08)] w-full">
                  <div className="w-full h-[182.6px] relative rounded-[76.8px] overflow-hidden">
                    <img
                      alt="Detail Moment 1"
                      className="absolute h-[110.98%] left-0 max-w-none top-[-5.49%] w-full object-cover"
                      src={imgDetailMoment}
                    />
                  </div>
                  <div className="absolute border border-[rgba(212,175,55,0.15)] border-solid inset-[-6px] rounded-[80px] pointer-events-none" />
                </div>
              </div>

              {/* Detail 2 */}
              <div className="-rotate-2 w-[149.5px] justify-self-center">
                <div className="aspect-[3/4] bg-[rgba(255,255,255,0.4)] flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[80px] shadow-[0px_0px_0px_1px_rgba(212,175,55,0.3),0px_0px_0px_4px_rgba(212,175,55,0.08)] w-full">
                  <div className="w-full h-[182.6px] relative rounded-[76.8px] overflow-hidden">
                    <img
                      alt="Detail Moment 2"
                      className="absolute h-full left-[-51.58%] max-w-none top-0 w-[203.15%] object-cover"
                      src={imgDetailMoment1}
                    />
                  </div>
                  <div className="absolute border border-[rgba(212,175,55,0.15)] border-solid inset-[-6px] rounded-[80px] pointer-events-none" />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Section: Guestbook */}
        <div className="w-full flex flex-col gap-[32px] items-center relative">
          
          {/* Header block */}
          <div className="w-full flex flex-col gap-[4.2px] items-center relative">
            <span className="font-body font-semibold text-[13px] text-center tracking-[1.56px] text-[#5f5f58] uppercase">
              GUESTBOOK
            </span>
            <h2 className="font-display font-light italic text-[42px] text-center text-[#585e4d] leading-[42px] tracking-[-0.42px]">
              Wishes & Prayers
            </h2>
            <div className="flex gap-[12px] items-center justify-center pt-[7.8px] w-full">
              <div className="bg-[rgba(212,175,55,0.2)] h-[0.5px] w-[32px]" />
              <div className="w-[8.615px] h-[8.346px] relative flex items-center justify-center">
                <img alt="" className="w-full h-full object-contain" src={imgContainer1} />
              </div>
              <div className="bg-[rgba(212,175,55,0.2)] h-[0.5px] w-[32px]" />
            </div>
            <p className="font-work italic text-[13px] text-center text-[#454840] leading-[20.8px] pt-[6.8px]">
              Sharing the love from our dearest ones.
            </p>
          </div>

          {/* Mini Feed (Dummy Cards) */}
          <div className="w-full flex flex-col gap-[16px] items-stretch relative">
            
            {/* Card 1 */}
            <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.6)] border border-solid border-white flex flex-col gap-[16px] items-start p-[25px] rounded-[16px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.03)] w-full">
              <div className="w-full flex items-start justify-between">
                <div className="flex flex-col gap-[3px] items-start">
                  <h4 className="font-body font-normal text-[14px] text-[#585e4d] leading-[21px]">
                    Julian & Clara
                  </h4>
                  <span className="font-body font-normal text-[9px] text-[rgba(95,95,88,0.5)] tracking-[0.9px] uppercase">
                    2 HOURS AGO
                  </span>
                </div>
                <div className="bg-[#585e4d] flex items-center px-[12px] py-[4px] rounded-full">
                  <span className="font-body font-normal text-[9px] text-white uppercase tracking-wider">
                    HADIR
                  </span>
                </div>
              </div>
              <div className="w-full font-display font-normal italic text-[17px] text-[rgba(95,95,88,0.9)] leading-[27.63px]">
                <p>
                  &ldquo;Wishing you both a lifetime of love and happiness! The ceremony was absolutely breathtaking.&rdquo;
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.6)] border border-solid border-white flex flex-col gap-[15.3px] items-start p-[25px] rounded-[16px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.03)] w-full">
              <div className="w-full flex items-start justify-between">
                <div className="flex flex-col gap-[3px] items-start">
                  <h4 className="font-body font-normal text-[14px] text-[#585e4d] leading-[21px]">
                    Auntie Martha
                  </h4>
                  <span className="font-body font-normal text-[9px] text-[rgba(95,95,88,0.5)] tracking-[0.9px] uppercase">
                    5 HOURS AGO
                  </span>
                </div>
                <div className="bg-[rgba(212,175,55,0.2)] border border-[rgba(212,175,55,0.1)] border-solid flex items-center px-[13px] py-[5px] rounded-full">
                  <span className="font-body font-normal text-[9px] text-[#d4af37] uppercase tracking-wider">
                    TENTATIVE
                  </span>
                </div>
              </div>
              <div className="w-full font-display font-normal italic text-[17px] text-[rgba(95,95,88,0.9)] leading-[27.63px]">
                <p>
                  &ldquo;Sending all my love from afar. Wishing I could be there to see you walk down the aisle.&rdquo;
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="w-full flex flex-col items-center pb-[128px] pt-px relative">
          <div className="flex flex-col gap-[23.6px] items-center relative">
            
            <p className="font-display font-light italic text-[18px] text-[rgba(95,95,88,0.6)] text-center leading-[29.25px]">
              With gratitude from the families of
            </p>
            <h2 className="font-display font-light italic text-[48px] text-center text-[#585e4d] leading-[48px] tracking-[-1.2px]">
              Brandon & Meyca
            </h2>
            
            <div className="pt-[16px]">
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
            </div>

            <div className="flex flex-col gap-[11.8px] items-center pt-[24px]">
              <div className="bg-[rgba(212,175,55,0.3)] h-[1px] w-[40px]" />
              <div className="w-[18px] h-[16px] relative flex items-center justify-center">
                <img alt="Heart" className="w-full h-full object-contain" src={imgIcon} />
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
