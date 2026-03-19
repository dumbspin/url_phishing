"use client";
import React from "react";
import NavBar from "../../components/landing/NavBar";
import ScanSection from "../../components/landing/ScanSection";

export default function ScannerPage() {
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      {/* Reusing the landing NavBar */}
      <NavBar />
      
      {/* 
        Standalone Scanner Module
        Padded to account for the sticky Navbar 
      */}
      <div className="flex-1 flex flex-col pt-12">
        <ScanSection />
      </div>
      
      <footer className="py-8 text-center border-t border-white/5 bg-bg/50 backdrop-blur-sm">
        <p className="text-[12px] text-muted font-medium">
          © {new Date().getFullYear()} Cypher Collective — Advanced Phishing Protection
        </p>
      </footer>
    </main>
  );
}
