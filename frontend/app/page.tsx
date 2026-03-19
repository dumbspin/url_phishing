"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Components
import NavBar from "@/components/landing/NavBar";
import HeroSection from "@/components/landing/HeroSection";
import TrustLogos from "@/components/landing/TrustLogos";
import ScanSection from "@/components/landing/ScanSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ZonePreviewSection from "@/components/landing/ZonePreviewSection";
import ReportSection from "@/components/landing/ReportSection";
import FooterSection from "@/components/landing/FooterSection";

export default function LandingPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    const isLocal = host === "localhost" || host === "127.0.0.1";

    // On Vercel: redirect to the real scanner module
    if (!isLocal) {
      router.replace("/scanner");
      return;
    }
    setReady(true);
  }, [router]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Show nothing until we confirm localhost (prevents flash on Vercel)
  if (!ready) return null;

  // ── LOCALHOST: Full landing page ──
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col w-full"
    >
      <NavBar />
      <HeroSection onScanClick={() => scrollToSection("scanner")} />
      <TrustLogos />
      <ScanSection />
      <HowItWorksSection />
      <ZonePreviewSection />
      <ReportSection />
      <FooterSection />
    </motion.main>
  );
}
