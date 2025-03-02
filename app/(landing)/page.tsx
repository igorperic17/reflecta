"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { JourneySection } from "@/components/landing/JourneySection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { TechnologySection } from "@/components/landing/TechnologySection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <main className="flex-grow">
        <HeroSection mounted={mounted} />
        <FeaturesSection />
        <JourneySection />
        <TechnologySection />
        <PrivacySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
