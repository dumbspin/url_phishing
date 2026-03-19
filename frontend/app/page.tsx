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
  const [isVercel, setIsVercel] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      setIsVercel(host.includes("vercel") || host.includes("phishing-ten"));
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      {!isVercel && (
        <HeroSection 
          onScanClick={() => scrollToSection("scanner")} 
        />
      )}

      {/* Trust & Verification Feed */}
      {!isVercel && <TrustLogos />}

      {/* Core Interaction - Link Scanner */}
      <div className={isVercel ? "pt-20" : ""}>
        <ScanSection />
      </div>

      {/* Technical Deep Dive */}
      {!isVercel && <HowItWorksSection />}

      {/* Geographical Threat Intelligence */}
      {!isVercel && <ZonePreviewSection />}

      {/* Community Reporting Engine */}
      {!isVercel && <ReportSection />}

      {/* Global Footer */}
      {!isVercel && <FooterSection />}

      
    </motion.main>
  );
}
