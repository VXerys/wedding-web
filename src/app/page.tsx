import { Suspense } from "react";
import InvitationClient from "@/components/InvitationClient";
import HeroFallback from "@/components/hero/HeroFallback";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="desktop-bg min-h-screen w-full bg-cream-100 md:flex md:items-start md:justify-center md:py-0">
        <div className="w-full md:max-w-[430px] md:min-h-screen md:shadow-[0_0_60px_rgba(44,62,80,0.12)] md:relative">
          <Suspense fallback={<HeroFallback />}>
            <InvitationClient />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
