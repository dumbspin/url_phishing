"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Globe, 
  Database,
  ExternalLink,
  ChevronRight,
  Fingerprint,
  Zap,
  Lock,
  Cpu,
  BarChart3,
  ImageIcon
} from "lucide-react";

// UI Components
import ShaderDemo from "@/components/ui/ShaderDemo";
import { Radar, IconContainer } from "@/components/ui/RadarEffect";
import NavBar from "@/components/landing/NavBar";
import { analyzeUrl, scoreToColour, scoreToHex } from "@/utils/api";

export default function ScannerPage() {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  // Auto-scan if URL is in search params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get("url");
    if (urlParam) {
      setUrl(urlParam);
      handleScan(urlParam);
    }
  }, []);

  const handleScan = async (targetUrl: string = url) => {
    if (!targetUrl) return;
    
    setIsScanning(true);
    setResult(null);
    setError(null);
    setScanProgress(0);

    // Simulate progress while scanning
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 400);

    try {
      const data = await analyzeUrl(targetUrl);
      clearInterval(progressInterval);
      setScanProgress(100);
      
      // Delay slightly to show 100% progress
      setTimeout(() => {
        setResult(data);
        setIsScanning(false);
      }, 500);
    } catch (err: any) {
      clearInterval(progressInterval);
      setError(err.message || "An error occurred during scanning");
      setIsScanning(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030303] text-white overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <ShaderDemo />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
          <AnimatePresence mode="wait">
            {!result && !isScanning && (
              <motion.div
                key="input-stage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl text-center"
              >
                <div className="mb-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-accent">
                  <Zap className="w-3 h-3" />
                  <span>Real-time Phishing Intelligence</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                  Scan any URL Instantly
                </h1>
                
                <p className="text-white/40 text-lg mb-12 max-w-lg mx-auto">
                  Paste any link below and our AI-powered engine will dissect it for threats, 
                  domain age, and malicious patterns.
                </p>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-accent-light/20 rounded-2xl blur-lg transition-all group-hover:blur-xl opacity-75" />
                  <div className="relative flex p-1.5 bg-[#0A0A0A] border border-white/10 rounded-2xl">
                    <input
                      type="text"
                      placeholder="https://example-phish.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleScan()}
                      className="flex-1 bg-transparent px-5 py-4 focus:outline-none text-white placeholder:text-white/20"
                    />
                    <button
                      onClick={() => handleScan()}
                      className="bg-accent hover:bg-accent-light text-black font-bold px-8 py-4 rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-accent/25"
                    >
                      <Search className="w-5 h-5" />
                      <span>Scan URL</span>
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </motion.div>
            )}

            {isScanning && (
              <motion.div
                key="scanning-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-4xl flex flex-col items-center"
              >
                <div className="relative h-64 w-full mb-12">
                  <Radar className="absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center backdrop-blur-md border border-accent/30"
                    >
                      <Shield className="w-10 h-10 text-accent" />
                    </motion.div>
                  </div>
                </div>

                <div className="w-full max-w-md">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <h3 className="text-xl font-bold mb-1">Analysing Deep Signals</h3>
                      <p className="text-white/40 text-sm">Checking blacklists, WHOIS & content heuristics...</p>
                    </div>
                    <span className="text-accent font-mono text-lg font-bold">{Math.round(scanProgress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div 
                      className="h-full bg-accent shadow-[0_0_15px_rgba(252,163,17,0.5)]"
                      animate={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result-stage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Result Hero */}
                <div className="lg:col-span-12 flex flex-col md:flex-row items-center justify-between p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl gap-8">
                  <div className="flex items-center gap-6">
                    <div className={`p-6 rounded-3xl ${
                      result.risk_score < 30 ? "bg-green-500/10 text-green-500 border-green-500/20" : 
                      result.risk_score < 60 ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : 
                      "bg-red-500/10 text-red-500 border-red-500/20"
                    } border`}>
                      <div className="text-4xl font-black mb-1">{result.risk_score}</div>
                      <div className="text-xs uppercase tracking-widest font-bold">Risk Score</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ${
                          result.classification === "Safe" ? "bg-green-500 text-black" : 
                          result.classification === "Suspicious" ? "bg-amber-500 text-black" : 
                          "bg-red-500 text-white"
                        }`}>
                          {result.classification}
                        </span>
                        <span className="text-white/40 text-sm font-mono truncate max-w-[200px] md:max-w-md">
                          {result.normalized_url}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold">
                        {result.classification === "Safe" ? "No immediate threats detected." : 
                         result.classification === "Suspicious" ? "Exercise caution with this link." : 
                         "High probability of phishing detected."}
                      </h2>
                    </div>
                  </div>
                  <button 
                    onClick={() => {setResult(null); setUrl("");}}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/10 whitespace-nowrap"
                  >
                    Scan Another
                  </button>
                </div>

                {/* Left Column: Details */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Reasons */}
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-accent" />
                      Detection Engine Findings
                    </h3>
                    <div className="space-y-4">
                      {result.reasons.length > 0 ? (
                        result.reasons.map((reason: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/20 transition-all">
                            <div className={`p-2 rounded-lg mt-0.5 ${
                              reason.score >= 30 ? "bg-red-500/20 text-red-500" : "bg-amber-500/20 text-amber-500"
                            }`}>
                              <AlertTriangle className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{reason.module}</span>
                                <span className="text-xs font-mono text-accent">+{reason.score} pts</span>
                              </div>
                              <p className="text-white/80 font-medium">{reason.reason}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                          <CheckCircle className="w-12 h-12 text-green-500/20 mb-4" />
                          <p className="text-white/40">Our heuristic engine found no malicious indicators.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Intelligence */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Domain Intelligence */}
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-accent" />
                      Digital Footprint
                    </h3>
                    {result.domain_info ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="text-[10px] text-white/40 uppercase font-black mb-1">Domain Age</div>
                          <div className="text-lg font-bold">{result.domain_info.age_days ?? "???"} Days</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="text-[10px] text-white/40 uppercase font-black mb-1">Status</div>
                          <div className="text-lg font-bold text-green-500">Active</div>
                        </div>
                        <div className="col-span-2 p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="text-[10px] text-white/40 uppercase font-black mb-1">Registrar</div>
                          <div className="text-sm font-medium truncate">{result.domain_info.registrar || "Unknown"}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="text-[10px] text-white/40 uppercase font-black mb-1">Created</div>
                          <div className="text-sm font-medium">{result.domain_info.creation_date || "N/A"}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="text-[10px] text-white/40 uppercase font-black mb-1">Expires</div>
                          <div className="text-sm font-medium">{result.domain_info.expiry_date || "N/A"}</div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-white/20 text-center py-4">Domain intelligence unavailable.</p>
                    )}
                  </div>

                  {/* Screenshot Preview */}
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-accent" />
                      Live Visual Analysis
                    </h3>
                    <div className="aspect-video w-full rounded-2xl bg-black border border-white/10 overflow-hidden relative group">
                      {result.screenshot_url ? (
                        <img 
                          src={result.screenshot_url} 
                          alt="Phish Capture"
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6 grayscale opacity-20">
                          <ImageIcon className="w-12 h-12 mb-3" />
                          <p className="text-xs font-medium uppercase tracking-widest">No visual preview</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/60">
                        <span>Safe Viewer Isolation</span>
                        <Lock className="w-3 h-3 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 backdrop-blur-sm bg-black/20">
          <div className="flex items-center gap-2 opacity-40">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold tracking-tighter uppercase">Cypher Engine v2.4.0-premium</span>
          </div>
          <p className="text-white/20 text-xs font-medium">
            © {new Date().getFullYear()} Cypher Collective — Intelligent Security for the Modern Web.
          </p>
          <div className="flex gap-6 text-white/40 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-accent transition-colors">Documentation</a>
            <a href="#" className="hover:text-accent transition-colors">API Release</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
