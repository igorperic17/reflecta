"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { JourneySection } from "@/components/landing/JourneySection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { TechnologySection } from "@/components/landing/TechnologySection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { ScreenshotsSection } from "@/components/landing/ScreenshotsSection";
import "@/app/landing/page.css";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="landing-container">
      <main className="flex-grow">
        <HeroSection mounted={mounted} />
        <FeaturesSection />
        <ScreenshotsSection />
        <JourneySection />
        <TechnologySection />
        <PrivacySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
} 