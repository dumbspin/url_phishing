"use client"

import { useState } from "react"
import { MeshGradient, DotOrbit } from "@paper-design/shaders-react"

export default function ShaderDemo() {
  const [speed, setSpeed] = useState(1.0)
  const [activeEffect, setActiveEffect] = useState("mesh")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("pnpm i 21st")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden pointer-events-none -z-20">
      {activeEffect === "mesh" && (
        <MeshGradient
          className="w-full h-full absolute inset-0"
          colors={["#000000", "#14213d", "#3d2a08", "#1a1a1a"]}
          speed={speed}
        />
      )}

      {activeEffect === "dots" && (
        <div className="w-full h-full absolute inset-0 bg-[#000000]">
          <DotOrbit
            className="w-full h-full"
            colors={["#fca311"]}
            colorBack="#14213d"
            speed={speed}
          />
        </div>
      )}

      {activeEffect === "combined" && (
        <>
          <MeshGradient
            className="w-full h-full absolute inset-0"
            colors={["#000000", "#14213d", "#3d2a08", "#1a1a1a"]}
            speed={speed * 0.5}
          />
          <div className="w-full h-full absolute inset-0 opacity-60">
            <DotOrbit
              className="w-full h-full"
              colors={["#fca311"]}
              colorBack="#14213d"
              speed={speed * 1.5}
            />
          </div>
        </>
      )}

      {/* Lighting overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: `${3 / speed}s` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: `${2 / speed}s`, animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-accent-light/5 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: `${4 / speed}s`, animationDelay: "0.5s" }}
        />
      </div>
    </div>
  )
}
