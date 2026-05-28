import { Suspense } from "react";
import InvitationTabs from "@/components/InvitationTabs";
import HeroFallback from "@/components/hero/HeroFallback";

export default function Home() {
  return (
    <main className="flex-1">
      <Suspense fallback={<HeroFallback />}>
        <InvitationTabs />
      </Suspense>
    </main>
  );
}
