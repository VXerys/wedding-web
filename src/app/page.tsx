import { Suspense } from "react";
import CountdownTimer from "@/components/countdown/CountdownTimer";
import EventDetails from "@/components/details/EventDetails";
import GuestbookSection from "@/components/guestbook/GuestbookSection";
import HeroFallback from "@/components/hero/HeroFallback";
import HeroSection from "@/components/hero/HeroSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Suspense fallback={<HeroFallback />}>
        <HeroSection />
      </Suspense>
      <CountdownTimer />
      <EventDetails />
      <Suspense fallback={null}>
        <GuestbookSection />
      </Suspense>
    </main>
  );
}
