"use client";
import React, { useState, useEffect } from "react";
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
  const [isLocal, setIsLocal] = useState(true);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
    const host = window.location.hostname;
    setIsLocal(host.includes("localhost") || host.includes("127.0.0.1"));
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Prevent flash of landing page on Vercel by waiting for hydration
  if (!hasHydrated) return <div className="min-h-screen bg-bg" />;

  // STANDALONE SCANNER MODE (For Vercel)
  if (!isLocal) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex flex-col w-full bg-bg min-h-screen"
      >
        <NavBar />
        <div className="pt-16">
          <ScanSection />
        </div>
        <footer className="py-12 text-center border-t border-white/5">
          <p className="text-muted text-sm">© {new Date().getFullYear()} Cypher Collective — Dedicated Scanner</p>
        </footer>
      </motion.main>
    );
  }

  // FULL LANDING PAGE MODE (For Localhost)
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col w-full"
    >
      {/* Navigation Layer */}
      <NavBar />

      {/* Hero Section */}
      <HeroSection 
        onScanClick={() => scrollToSection("scanner")} 
      />

      {/* Trust & Verification Feed */}
      <TrustLogos />

      {/* Core Interaction - Link Scanner */}
      <ScanSection />

      {/* Technical Deep Dive */}
      <HowItWorksSection />

      {/* Geographical Threat Intelligence */}
      <ZonePreviewSection />

      {/* Community Reporting Engine */}
      <ReportSection />

      {/* Global Footer */}
      <FooterSection />
      
    </motion.main>
  );
}
