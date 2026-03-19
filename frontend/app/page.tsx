"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const [scannerOnly, setScannerOnly] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    const isLocal = host === "localhost" || host === "127.0.0.1";
    // Show scanner-only on Vercel ONLY when ?view=scanner is set
    setScannerOnly(!isLocal && searchParams.get("view") === "scanner");
    setReady(true);
  }, [searchParams]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Blank screen until we know where we are (prevents flash of full page on Vercel)
  if (!ready) return null;

  // ── Scanner-only mode (Vercel with ?view=scanner) ──
  if (scannerOnly) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex flex-col w-full min-h-screen"
      >
        <NavBar />
        <div className="pt-8">
          <ScanSection />
        </div>
        <footer className="mt-auto py-10 text-center border-t border-white/5">
          <p className="text-muted text-xs font-medium">
            © {new Date().getFullYear()} Cypher Collective — Dedicated Scanner
          </p>
        </footer>
      </motion.main>
    );
  }

  // ── Full landing page (default everywhere) ──
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
