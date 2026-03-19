/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        "bg-deep": "#14213d",
        surface: "rgba(20,33,61,0.6)",
        "surface-solid": "#14213d",
        accent: "#fca311",
        "accent-light": "#fdba4a",
        danger: "#e53e3e",
        warning: "#dd6b20",
        success: "#38a169",
        "text-primary": "#ffffff",
        "text-muted": "#e5e5e5",
        border: "rgba(229,229,229,0.12)",
        "border-solid": "rgba(229,229,229,0.2)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "radial-gradient(ellipse 90% 80% at 50% 10%, #14213d 0%, #0a1628 30%, #000000 70%, transparent 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "float": "float-blob 12s ease-in-out infinite",
      },
      boxShadow: {
        "glow-accent": "0 0 20px rgba(252,163,17,0.35)",
        "glow-danger": "0 0 20px rgba(229,62,62,0.35)",
        "glow-success": "0 0 20px rgba(56,161,105,0.35)",
        "card": "0 4px 32px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2)",
        "navbar": "0 2px 24px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};
