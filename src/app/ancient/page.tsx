"use client";

import { Suspense, useEffect, useState } from "react";
import GuestbookSection from "@/components/guestbook/GuestbookSection";
import { decodeGuestName } from "@/lib/utils";

const GROOM = process.env.NEXT_PUBLIC_GROOM_NAME ?? "Brandon";
const BRIDE = process.env.NEXT_PUBLIC_BRIDE_NAME ?? "Meyca";
const EVENT_DATE = process.env.NEXT_PUBLIC_EVENT_DATE ?? "2026-07-12T09:00:00+07:00";
const MAPS_URL = process.env.NEXT_PUBLIC_MAPS_URL ?? "#";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function useAncientCountdown(target: string): Countdown {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(target).getTime();

    const tick = () => {
      const distance = Math.max(targetDate - Date.now(), 0);
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  return countdown;
}

function useGuestName() {
  const [guestName, setGuestName] = useState("Tamu Undangan");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync guest name decoding on mount
    setGuestName(decodeGuestName(params.get("to")));
  }, []);

  return guestName;
}

function AncientDivider({ dark = false }: { dark?: boolean }) {
  return (
    <div className="ancient-divider" aria-hidden="true">
      <span className={dark ? "bg-ancient-deep/40" : "bg-ancient-ivory/70"} />
      <i className={dark ? "border-ancient-deep/40" : "border-ancient-ivory/70"} />
      <span className={dark ? "bg-ancient-deep/40" : "bg-ancient-ivory/70"} />
    </div>
  );
}

function FloralCorner({ position }: { position: "top-right" | "bottom-left" | "bottom-right" }) {
  return <div className={`floral-corner floral-${position}`} aria-hidden="true" />;
}

function MonumentLayer({ className = "" }: { className?: string }) {
  return (
    <div className={`monument-layer ${className}`} aria-hidden="true">
      <div className="monument-base monument-base-1" />
      <div className="monument-base monument-base-2" />
      <div className="monument-base monument-base-3" />
      <div className="monument-tower monument-tower-left" />
      <div className="monument-tower monument-tower-main" />
      <div className="monument-tower monument-tower-right" />
      <div className="monument-peak monument-peak-left" />
      <div className="monument-peak monument-peak-main" />
      <div className="monument-peak monument-peak-right" />
    </div>
  );
}

function BirdLayer() {
  return (
    <div className="bird-layer" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

function OvalPhoto({ label, variant }: { label: string; variant: "groom" | "bride" }) {
  return (
    <div className={`oval-photo oval-${variant}`}>
      <div className="oval-photo-inner">
        <MonumentLayer className="photo-monument" />
        <span>{label}</span>
      </div>
    </div>
  );
}

function CoupleProfile({
  variant,
  name,
  family,
}: {
  variant: "groom" | "bride";
  name: string;
  family: string;
}) {
  return (
    <section className="couple-profile">
      <OvalPhoto label={variant === "groom" ? "FOTO MEMPELAI PRIA" : "FOTO MEMPELAI WANITA"} variant={variant} />
      <p className="family-line">{family}</p>
      <AncientDivider />
      <h3>{name}</h3>
      <div className="social-row" aria-label="Social links placeholder">
        <span>f</span>
        <span>x</span>
        <span>▶</span>
        <span>◎</span>
        <span>☏</span>
      </div>
    </section>
  );
}

function Cover({ guestName }: { guestName: string }) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  if (opened) return null;

  return (
    <button className="ancient-cover" onClick={() => setOpened(true)} aria-label="Buka undangan">
      <MonumentLayer className="cover-monument" />
      <BirdLayer />
      <FloralCorner position="top-right" />
      <FloralCorner position="bottom-left" />
      <div className="arch-card">
        <p className="label">THE WEDDING OF</p>
        <h1>
          {GROOM}
          <span>{BRIDE}</span>
        </h1>
        <p className="dear">Dear Sir / Madam</p>
        <p className="guest-name">{guestName}</p>
        <p className="small-copy">You are cordially invited to our wedding.</p>
        <span className="open-pill">Open Invitation</span>
      </div>
    </button>
  );
}

function IntroTemple() {
  return (
    <section className="intro-temple ancient-scene min-h-[680px]">
      <BirdLayer />
      <FloralCorner position="top-right" />
      <MonumentLayer className="intro-monument" />
      <div className="intro-copy">
        <p>With huge love, we intend to invite you to</p>
        <p>attend our event</p>
      </div>
    </section>
  );
}

function QuoteBand() {
  return (
    <section className="quote-band">
      <div className="dove-mark">⌁</div>
      <p>“Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.”</p>
      <AncientDivider />
      <span>Lao Tzu</span>
    </section>
  );
}

function SaveDate() {
  const { days, hours, minutes, seconds } = useAncientCountdown(EVENT_DATE);
  const units = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <section className="save-date-section">
      <FloralCorner position="top-right" />
      <h2>Save</h2>
      <AncientDivider />
      <p>The Date</p>
      <div className="count-grid">
        {units.map((unit) => (
          <div key={unit.label} className="count-box">
            <strong>{String(unit.value).padStart(2, "0")}</strong>
            <span>{unit.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function EventSection() {
  return (
    <section className="event-section ancient-scene">
      <div className="event-card event-arch">
        <h2>Wedding Ceremony</h2>
        <p>Saturday, 12 December 2025</p>
        <p>07:00 AM</p>
        <h3>The Great Hall</h3>
        <p>Your Happiest Day Street, Number 1234</p>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">Open Map</a>
      </div>

      <div className="event-card event-oval">
        <h2>Wedding Reception</h2>
        <p>Saturday, 12 December 2025</p>
        <p>06 PM</p>
        <h3>Alilas Uluwatu Villas</h3>
        <p>Your Happiest Day Street, Number 1234</p>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">Open Map</a>
      </div>
    </section>
  );
}

function MomentsSection() {
  return (
    <section className="moments-section">
      <div className="dove-mark">⌁</div>
      <h2>Our Moments</h2>
      <AncientDivider />
      <p>“A happy marriage is a long conversation which always seems too short.”</p>
      <div className="video-placeholder">Animated Wedding Album Video</div>
      <div className="gallery-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="gallery-item">PREWED {index + 1}</div>
        ))}
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="closing-section ancient-scene">
      <MonumentLayer className="closing-monument" />
      <p>We are the Happy Ones, the Big Family of the Bride and Groom</p>
      <h2>{GROOM} & {BRIDE}</h2>
    </section>
  );
}

export default function AncientPage() {
  const guestName = useGuestName();

  return (
    <main className="ancient-page">
      <Cover guestName={guestName} />
      <IntroTemple />
      <QuoteBand />
      <section className="couple-section ancient-scene">
        <p className="couple-intro">“Without reducing respect, we intend to invite you to attend our wedding”</p>
        <CoupleProfile variant="groom" name={GROOM} family="Only Child of Mr & Mrs Lorem" />
        <CoupleProfile variant="bride" name={BRIDE} family="Eldest Daughter of Mr & Mrs Ipsum" />
      </section>
      <SaveDate />
      <EventSection />
      <MomentsSection />
      <section className="rsvp-shell">
        <h2>RSVP</h2>
        <AncientDivider />
        <Suspense fallback={null}>
          <GuestbookSection />
        </Suspense>
      </section>
      <ClosingSection />
      <style jsx global>{`
        :root {
          --ancient-deep: #263225;
          --ancient-moss: #4f5c4e;
          --ancient-sage: #8e978a;
          --ancient-fog: #dadccd;
          --ancient-ivory: #f5f0df;
          --ancient-paper: #fbf7ea;
          --ancient-gold: #c9b06b;
          --ancient-ink: #283126;
          --ancient-muted: #626b5f;
        }

        .ancient-page {
          width: min(100%, 430px);
          margin: 0 auto;
          background: var(--ancient-sage);
          color: var(--ancient-ivory);
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22);
        }

        .ancient-scene {
          position: relative;
          isolation: isolate;
          background:
            radial-gradient(circle at 18% 12%, rgba(245, 240, 223, 0.24), transparent 32%),
            linear-gradient(180deg, rgba(218, 220, 205, 0.82), rgba(78, 91, 78, 0.78)),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 4px),
            var(--ancient-sage);
        }

        .ancient-scene::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.22;
          background-image:
            linear-gradient(145deg, transparent 0 20%, rgba(38, 50, 37, 0.28) 20.4%, transparent 21%),
            linear-gradient(20deg, transparent 0 35%, rgba(245, 240, 223, 0.20) 35.4%, transparent 36%);
        }

        .ancient-scene::after {
          content: "";
          position: absolute;
          inset: auto 0 0;
          height: 380px;
          background: linear-gradient(180deg, transparent, rgba(38, 50, 37, 0.22));
          pointer-events: none;
        }

        .ancient-cover {
          position: fixed;
          inset: 0;
          z-index: 100;
          width: min(100vw, 430px);
          min-height: 100dvh;
          margin: 0 auto;
          left: 50%;
          transform: translateX(-50%);
          border: 0;
          color: var(--ancient-ink);
          background:
            radial-gradient(ellipse at center, rgba(245,240,223,.20), transparent 58%),
            linear-gradient(180deg, #aab1a3, #788474);
          cursor: pointer;
          overflow: hidden;
          font: inherit;
        }

        .arch-card {
          position: relative;
          z-index: 4;
          width: 326px;
          min-height: 590px;
          margin: 82px auto 0;
          padding: 145px 34px 42px;
          background:
            linear-gradient(180deg, rgba(251,247,234,.94), rgba(245,240,223,.86)),
            repeating-linear-gradient(90deg, rgba(38,49,38,.035) 0 1px, transparent 1px 4px);
          border-radius: 163px 163px 0 0;
          box-shadow: inset 0 0 0 1px rgba(38,49,38,.18), 0 18px 46px rgba(28,34,29,.34);
          text-align: center;
        }

        .arch-card .label,
        .event-card h2,
        .moments-section h2,
        .rsvp-shell h2 {
          text-transform: uppercase;
          letter-spacing: .16em;
          font-size: 12px;
          font-weight: 700;
        }

        .arch-card h1 {
          margin: 18px 0 58px;
          font-family: Georgia, serif;
          font-size: 42px;
          font-style: italic;
          font-weight: 400;
          line-height: 1.28;
        }

        .arch-card h1 span { display: block; }
        .arch-card .dear { font-size: 12px; font-weight: 600; }
        .arch-card .guest-name { margin-top: 10px; font-size: 16px; font-weight: 700; }
        .arch-card .small-copy { margin-top: 18px; font-size: 11px; }
        .open-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 22px;
          width: 206px;
          height: 34px;
          border-radius: 999px;
          background: rgba(255,255,255,.92);
          box-shadow: 0 5px 16px rgba(0,0,0,.12);
          font-size: 11px;
          font-weight: 600;
        }

        .monument-layer {
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 390px;
          height: 390px;
          transform: translateX(-50%);
          opacity: .48;
          filter: blur(.15px) contrast(.92);
          pointer-events: none;
          z-index: 1;
        }

        .monument-base,
        .monument-tower,
        .monument-peak {
          position: absolute;
          left: 50%;
          background: var(--ancient-deep);
          transform: translateX(-50%);
        }

        .monument-base-1 { bottom: 42px; width: 340px; height: 24px; opacity: .25; }
        .monument-base-2 { bottom: 68px; width: 278px; height: 32px; opacity: .33; }
        .monument-base-3 { bottom: 104px; width: 214px; height: 38px; opacity: .38; }
        .monument-tower { bottom: 138px; width: 58px; height: 104px; clip-path: polygon(50% 0, 100% 100%, 0 100%); opacity: .42; }
        .monument-tower-left { margin-left: -92px; transform: translateX(-50%) scale(.8); opacity: .34; }
        .monument-tower-main { height: 148px; width: 76px; bottom: 138px; opacity: .48; }
        .monument-tower-right { margin-left: 92px; transform: translateX(-50%) scale(.8); opacity: .34; }
        .monument-peak { bottom: 274px; width: 82px; height: 82px; clip-path: polygon(50% 0, 100% 100%, 0 100%); opacity: .44; }
        .monument-peak-left { margin-left: -92px; bottom: 230px; width: 62px; height: 62px; opacity: .34; }
        .monument-peak-right { margin-left: 92px; bottom: 230px; width: 62px; height: 62px; opacity: .34; }
        .cover-monument { bottom: 50px; opacity: .42; }
        .intro-monument { bottom: 20px; opacity: .72; }
        .closing-monument { bottom: 70px; opacity: .52; }
        .photo-monument { width: 300px; height: 180px; bottom: -20px; opacity: .12; }

        .floral-corner {
          position: absolute;
          width: 150px;
          height: 130px;
          z-index: 5;
          pointer-events: none;
        }
        .floral-corner::before,
        .floral-corner::after {
          content: "";
          position: absolute;
          border-radius: 999px;
          background: var(--ancient-ivory);
          box-shadow:
            28px 18px 0 -4px var(--ancient-ivory),
            58px 4px 0 -6px var(--ancient-ivory),
            82px 24px 0 -5px var(--ancient-ivory),
            44px 42px 0 -7px var(--ancient-gold);
        }
        .floral-corner::before { width: 34px; height: 18px; transform: rotate(-25deg); }
        .floral-corner::after { width: 84px; height: 10px; left: 8px; top: 54px; background: rgba(79,92,78,.52); transform: rotate(-24deg); }
        .floral-top-right { right: -12px; top: -4px; transform: rotate(-18deg); }
        .floral-bottom-left { left: -28px; bottom: -10px; transform: rotate(8deg); }
        .floral-bottom-right { right: -34px; bottom: -12px; transform: rotate(178deg); }

        .bird-layer {
          position: absolute;
          right: 24px;
          top: 92px;
          width: 122px;
          height: 60px;
          z-index: 5;
        }
        .bird-layer span {
          position: absolute;
          width: 26px;
          height: 10px;
          background: #111811;
          clip-path: polygon(0 50%, 48% 0, 100% 55%, 52% 38%);
        }
        .bird-layer span:nth-child(1) { top: 8px; left: 4px; transform: scale(.85) rotate(-9deg); }
        .bird-layer span:nth-child(2) { top: 28px; left: 42px; transform: scale(.65) rotate(7deg); opacity: .72; }
        .bird-layer span:nth-child(3) { top: 0; left: 86px; transform: scale(1.15) rotate(12deg); }
        .bird-layer span:nth-child(4) { top: 46px; left: 78px; transform: scale(.62); opacity: .65; }

        .intro-temple {
          display: grid;
          min-height: 680px;
          place-items: center;
          padding: 120px 32px;
        }
        .intro-copy {
          position: relative;
          z-index: 4;
          max-width: 300px;
          margin-top: 160px;
          color: var(--ancient-ivory);
          text-align: center;
          text-shadow: 0 2px 18px rgba(0,0,0,.45);
          font-size: 17px;
          font-weight: 800;
          line-height: 1.55;
        }

        .quote-band,
        .save-date-section,
        .moments-section,
        .rsvp-shell {
          position: relative;
          padding: 44px 28px;
          background: var(--ancient-deep);
          text-align: center;
          color: var(--ancient-ivory);
        }
        .quote-band p { max-width: 310px; margin: 18px auto; font-size: 12px; font-weight: 800; line-height: 1.55; }
        .quote-band span { display: block; margin-top: 8px; font-size: 12px; }
        .dove-mark { font-size: 32px; line-height: 1; }

        .couple-section {
          position: relative;
          padding: 40px 0 64px;
        }
        .couple-intro {
          position: relative;
          z-index: 4;
          max-width: 310px;
          margin: 0 auto 42px;
          color: var(--ancient-deep);
          text-align: center;
          font-size: 12px;
          line-height: 1.55;
        }
        .couple-profile {
          position: relative;
          z-index: 5;
          text-align: center;
          margin-bottom: 58px;
        }
        .oval-photo {
          width: 220px;
          height: 296px;
          margin: 0 auto 22px;
          padding: 7px;
          border: 2px solid rgba(245,240,223,.86);
          border-radius: 999px;
          box-shadow: 0 18px 42px rgba(0,0,0,.18);
        }
        .oval-photo-inner {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: inherit;
          background:
            linear-gradient(180deg, rgba(245,240,223,.72), rgba(142,151,138,.85)),
            var(--ancient-sage);
        }
        .oval-photo-inner::after {
          content: "";
          position: absolute;
          inset: 62% 0 0;
          background: linear-gradient(180deg, transparent, rgba(38,50,37,.24));
        }
        .oval-photo-inner span {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          color: white;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-shadow: 0 1px 12px rgba(0,0,0,.45);
        }
        .family-line { font-size: 11px; font-weight: 800; color: var(--ancient-ivory); }
        .couple-profile h3 {
          margin: -18px 0 18px;
          color: var(--ancient-ivory);
          font-size: 27px;
          font-weight: 800;
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .social-row { display: flex; justify-content: center; gap: 8px; }
        .social-row span {
          width: 22px;
          height: 22px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: rgba(245,240,223,.62);
          color: var(--ancient-moss);
          font-size: 10px;
          font-weight: 800;
        }
        .ancient-divider { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 16px auto; }
        .ancient-divider span { width: 82px; height: 1px; background: rgba(245,240,223,.75); }
        .ancient-divider i { width: 9px; height: 9px; border: 1px solid rgba(245,240,223,.75); transform: rotate(45deg); }

        .save-date-section h2 {
          margin-top: 24px;
          font-family: Georgia, serif;
          font-size: 44px;
          font-style: italic;
          font-weight: 400;
        }
        .save-date-section p { font-size: 13px; }
        .count-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-top: 30px; }
        .count-box { padding: 14px 4px 12px; border: 1px solid rgba(245,240,223,.65); background: rgba(142,151,138,.46); }
        .count-box strong { display: block; font-size: 27px; line-height: 1; }
        .count-box span { display: block; margin-top: 4px; font-size: 9px; }

        .event-section { padding: 44px 14px; }
        .event-card {
          position: relative;
          z-index: 3;
          margin-bottom: 24px;
          padding: 54px 26px 34px;
          min-height: 300px;
          color: var(--ancient-ivory);
          background: rgba(93,105,88,.45);
          border: 1px solid rgba(245,240,223,.75);
          text-align: center;
          backdrop-filter: blur(3px);
        }
        .event-arch { border-radius: 180px 180px 0 0; }
        .event-oval { border-radius: 999px; min-height: 340px; padding-top: 72px; }
        .event-card h3 { margin: 14px 0 10px; letter-spacing: .18em; text-transform: uppercase; font-size: 16px; }
        .event-card p { font-size: 11px; line-height: 1.55; font-weight: 700; }
        .event-card a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 246px;
          height: 34px;
          margin-top: 18px;
          border-radius: 999px;
          background: white;
          color: var(--ancient-deep);
          text-transform: uppercase;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
        }

        .moments-section .ancient-divider { margin-top: 8px; }
        .moments-section p { font-size: 12px; font-weight: 700; line-height: 1.55; }
        .video-placeholder {
          height: 190px;
          margin: 28px 0 18px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: rgba(245,240,223,.74);
          color: var(--ancient-moss);
          font-weight: 800;
        }
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
        .gallery-item {
          height: 92px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, rgba(245,240,223,.86), rgba(142,151,138,.82));
          color: var(--ancient-moss);
          font-size: 10px;
          font-weight: 800;
        }
        .rsvp-shell :is(section) { padding-left: 0; padding-right: 0; }
        .rsvp-shell :is(.glass-card, .glass-card-elevated) { background: rgba(245,240,223,.76); color: var(--ancient-deep); }
        .closing-section { min-height: 360px; padding: 130px 28px 42px; text-align: center; color: var(--ancient-ivory); }
        .closing-section p { position: relative; z-index: 3; font-size: 12px; font-weight: 700; }
        .closing-section h2 { position: relative; z-index: 3; margin-top: 18px; font-family: Georgia, serif; font-size: 32px; font-style: italic; font-weight: 400; }
      `}</style>
    </main>
  );
}
