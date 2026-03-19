"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, AlertTriangle } from "lucide-react";
import UrlInput from "../../components/UrlInput";
import { analyzeUrl } from "../../utils/api";

export default function ScannerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(url) {
    setLoading(true);
    setError("");
    try {
      const result = await analyzeUrl(url);
      const encoded = encodeURIComponent(JSON.stringify(result));
      router.push(`/results/${result.scan_id}?data=${encoded}`);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl space-y-8 text-center"
      >
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-accent">
            <Shield className="w-6 h-6" strokeWidth={2} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Scan any URL for threats
          </h1>
          <p className="text-text-muted text-base max-w-md mx-auto">
            Paste a link below to get a full phishing risk analysis — domain age, blacklist checks, content scanning, and more.
          </p>
        </div>

        {/* URL Input Form */}
        <UrlInput onSubmit={handleSubmit} loading={loading} />

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-danger text-sm font-medium"
          >
            <AlertTriangle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
