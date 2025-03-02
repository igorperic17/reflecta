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

  const landingContainerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
  };

  return (
    <div style={landingContainerStyle}>
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
