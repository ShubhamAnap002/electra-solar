/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deye: {
          blue: "#015cbb",          // Signature Deye Cobalt Blue
          "blue-dark": "#004896",   // Deep cobalt
          "blue-light": "#009cff",  // Active electric highlight
          cyan: "#00d2ff",          // Vibrant Tech Cyan (Option 1 flagship accent)
          "cyan-dark": "#00b4d8",   // Dark cyan hover
          sky: "#51b2e3",           // Gradient end
          navy: "#091e3a",          // Deep Sapphire Navy (Mockup header/hero/footer)
          "navy-dark": "#061528",   // Deepest dark
          "navy-surface": "#0c2340",// Dark card surface
          dark: "#0f172a",          // Primary dark text / elements
          heading: "#1e293b",       // Section headers
          gray: "#475569",          // Nav links & subtext
          muted: "#64748b",         // Muted descriptive text
          light: "#f8fafc",         // Clean industrial card background
          alt: "#f1f5f9",           // Subtle section background
          border: "#e2e8f0",        // Clean border
        },
        electra: {
          dark: "#0f172a",
          navy: "#091e3a",
          surface: "#ffffff",
          card: "#ffffff",
          border: "#e2e8f0",
          cyan: "#00d2ff",          // Option 1 Tech Cyan
          blue: "#015cbb",          // Deye primary blue
          solar: "#f59e0b",
          amber: "#d97706",
          orange: "#ea580c",
          green: "#10b981",
          light: "#f8fafc",
          muted: "#64748b",
        },
      },
      fontFamily: {
        sans: ["Roboto", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["Roboto", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        deye: "0 0 10px rgba(0, 0, 0, 0.08)",
        "deye-card": "0 4px 20px rgba(0, 0, 0, 0.06)",
        "deye-hover": "0 10px 25px rgba(1, 92, 187, 0.15)",
        glow: "0 0 25px -5px rgba(1, 92, 187, 0.35)",
        "solar-glow": "0 0 25px -5px rgba(245, 158, 11, 0.35)",
        card: "0 4px 15px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 12px 30px rgba(1, 92, 187, 0.12)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
