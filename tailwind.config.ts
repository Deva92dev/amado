import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom Brand Colors
        brand: "hsl(var(--brand-accent))",
        charcoal: "hsl(var(--charcoal))",
        "warm-gray": "hsl(var(--warm-gray))",
        "metal-gold": "hsl(var(--metal-gold))",
        "metal-silver": "hsl(var(--metal-silver))",
        "pastel-blush": "hsl(var(--pastel-blush))",
        "pastel-mint": "hsl(var(--pastel-mint))",
        "pastel-lavender": "hsl(var(--pastel-lavender))",
        emerald: "hsl(var(--emerald))",
        sapphire: "hsl(var(--sapphire))",
        ruby: "hsl(var(--ruby))",
      },
      fontFamily: {
        "primary-serif": ["var(--font-primary-serif)"],
        "secondary-sans": ["var(--font-secondary-sans)"],
        accent: ["var(--font-accent)"],
      },
      // KEYFRAMES
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        slideInFromLeft: {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        slideUpFromBottom: {
          from: { transform: "translateY(2rem)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(-5px) rotate(-1deg)" },
        },
        shimmer: {
          "0%": { "background-position": "-400% 0" },
          "100%": { "background-position": "400% 0" },
        },
        "gradient-shift": {
          "0%, 100%": { "background-position": "0% 50%" },
          "25%": { "background-position": "100% 50%" },
          "50%": { "background-position": "100% 100%" },
          "75%": { "background-position": "0% 100%" },
        },
        "color-swatch-appear": {
          from: { opacity: "0", transform: "scale(0.8)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "filter-button-select": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        "skeleton-loading": {
          "0%": { "background-position": "-200px 0" },
          "100%": { "background-position": "calc(200px + 100%) 0" },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(var(--tw-translate-y, 20px))",
          },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      // ANIMATIONS
      animation: {
        "gradient-x": "gradient-x 3s ease infinite",
        slideInFromLeft: "slideInFromLeft 0.7s ease-out 0.3s forwards",
        slideInFromLeftSlow: "slideInFromLeft 0.9s ease-out 0.1s forwards",
        slideUpFromBottom: "slideUpFromBottom 0.6s ease-out 0.4s forwards",
        slideUpFromBottomSlow: "slideUpFromBottom 0.8s ease-out 0.6s forwards",
        blink: "blink 1.06s infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.5s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "swatch-appear": "color-swatch-appear 0.3s ease-out forwards",
        "filter-select": "filter-button-select 0.2s ease-out",
        skeleton: "skeleton-loading 1.4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [
    animate,
    plugin(function ({ addComponents, addUtilities }) {
      addUtilities({
        ".text-balance": { "text-wrap": "balance" },
        ".animation-fill-forwards": { "animation-fill-mode": "forwards" },
        // --- CUSTOM UTILITIES (Metallic/Brand) ---
        ".link-brand": { color: "hsl(var(--brand-accent))" },
        ".ring-brand": {
          boxShadow: "0 0 0 3px hsla(var(--brand-accent) / 0.35)",
        },

        ".border-gold": { borderColor: "hsl(var(--metal-gold))" },
        ".text-gold": { color: "hsl(var(--metal-gold))" },
        ".border-silver": { borderColor: "hsl(var(--metal-silver))" },
        ".text-silver": { color: "hsl(var(--metal-silver))" },

        ".rule-gold": {
          height: "1px",
          background:
            "linear-gradient(90deg, hsla(var(--metal-gold)/0), hsl(var(--metal-gold)), hsla(var(--metal-gold)/0))",
        },
        ".rule-silver": {
          height: "1px",
          background:
            "linear-gradient(90deg, hsla(var(--metal-silver)/0), hsl(var(--metal-silver)), hsla(var(--metal-silver)/0))",
        },
        // --- OVERLAYS ---
        ".overlay-gradient-dark": {
          background:
            "linear-gradient(180deg, transparent 0%, hsla(var(--foreground)/0.2) 40%, hsla(var(--foreground)/0.7) 100%)",
        },
        ".overlay-gradient-brand": {
          background:
            "linear-gradient(135deg, hsla(var(--brand-accent)/0.8) 0%, hsla(var(--brand-accent)/0.4) 50%, hsla(var(--foreground)/0.6) 100%)",
        },
      });

      addComponents({
        // COMPONENTS & VARIANTS
        // Brand Button
        ".btn-brand": {
          "@apply text-primary-foreground rounded-[--radius]": {},
          backgroundColor: "hsl(var(--brand-accent))",
          border: "1px solid hsla(var(--brand-accent)/0.8)",
          boxShadow: "0 0 10px hsla(var(--brand-accent)/0.4)",
          "&:hover": {
            filter: "brightness(0.95)",
            backgroundColor: "hsl(215, 100%, 38%)",
          },
        },

        // Interaction Classes
        ".product-card-hover": {
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          },
        },
        ".color-swatch": {
          animation: "color-swatch-appear 0.3s ease-out forwards",
        },
        ".filter-button-selected": {
          animation: "filter-button-select 0.2s ease-out",
        },
        ".skeleton": {
          background:
            "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
          backgroundSize: "400px 100%",
          animation: "skeleton-loading 1.4s ease-in-out infinite",
        },
        ".animate-shimmer": {
          animation: "shimmer 1.5s linear infinite",
          background:
            "linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%, #f0f0f0 100%)",
          backgroundSize: "400% 100%",
          backgroundRepeat: "no-repeat",
        },

        // Typography & FX
        ".glass-effect": {
          background: "hsla(var(--background)/0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid hsla(var(--border)/0.2)",
        },
        ".nav-link-white": {
          color: "hsl(var(--charcoal)) !important",
          textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          fontWeight: "500",
          "&:hover": {
            color: "hsl(var(--warm-gray)) !important",
            textShadow: "0 2px 4px rgba(0,0,0,0.7)",
          },
        },
        ".magnetic-hover": {
          transition: "transform 0.2s ease",
          "&:hover": { transform: "translate(2px, -2px)" },
        },
        ".glow-text": {
          textShadow:
            "0 0 5px hsla(var(--brand-accent)/0.5), 0 0 10px hsla(var(--brand-accent)/0.3), 0 0 15px hsla(var(--brand-accent)/0.2)",
        },
        ".glow-text-enhanced": {
          textShadow:
            "0 2px 4px rgba(0,0,0,0.5), 0 0 20px hsla(var(--brand-accent)/0.6)",
        },

        // Background Gradients
        ".bg-gradient-hero": {
          background:
            "linear-gradient(135deg, hsl(var(--background)) 0%, hsla(var(--brand-accent)/0.03) 25%, hsla(var(--brand-accent)/0.08) 50%, hsla(var(--metal-silver)/0.05) 75%, hsl(var(--background)) 100%)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "0",
            background:
              "radial-gradient(ellipse at top right, hsla(var(--brand-accent)/0.06) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        },
        ".dark .bg-gradient-hero": {
          background:
            "linear-gradient(135deg, hsl(var(--background)) 0%, hsla(var(--brand-accent)/0.05) 25%, hsla(var(--brand-accent)/0.12) 50%, hsla(var(--metal-silver)/0.08) 75%, hsl(var(--background)) 100%)",
        },

        ".bg-gradient-glass": {
          background:
            "linear-gradient(135deg, hsla(var(--background)/0.8) 0%, hsla(var(--brand-accent)/0.05) 25%, hsla(var(--background)/0.9) 50%, hsla(var(--brand-accent)/0.03) 75%, hsla(var(--background)/0.85) 100%)",
          backdropFilter: "blur(20px) saturate(1.2)",
          border: "1px solid hsla(var(--brand-accent)/0.1)",
          boxShadow:
            "0 8px 32px hsla(var(--brand-accent)/0.1), inset 0 1px 0 hsla(var(--foreground)/0.1)",
        },
        ".dark .bg-gradient-glass": {
          background:
            "linear-gradient(135deg, hsla(var(--background)/0.6) 0%, hsla(var(--brand-accent)/0.08) 25%, hsla(var(--background)/0.7) 50%, hsla(var(--brand-accent)/0.06) 75%, hsla(var(--background)/0.65) 100%)",
          borderColor: "hsla(var(--brand-accent)/0.15)",
        },

        ".bg-gradient-electric": {
          background:
            "linear-gradient(45deg, hsl(var(--brand-accent)) 0%, hsl(215 100% 65%) 35%, hsl(200 100% 70%) 70%, hsl(var(--brand-accent)) 100%)",
          backgroundSize: "300% 300%",
          animation: "gradient-shift 8s ease infinite",
        },

        ".bg-gradient-metallic": {
          background:
            "linear-gradient(120deg, hsl(var(--background)) 0%, hsla(var(--metal-gold)/0.15) 25%, hsla(var(--metal-silver)/0.2) 50%, hsla(var(--metal-gold)/0.1) 75%, hsl(var(--background)) 100%)",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: "0",
            background:
              "linear-gradient(45deg, transparent 30%, hsla(var(--metal-gold)/0.08) 50%, transparent 70%)",
            pointerEvents: "none",
          },
        },

        ".bg-gradient-jewel": {
          background:
            "linear-gradient(160deg, hsl(var(--background)) 0%, hsla(var(--emerald)/0.05) 20%, hsla(var(--sapphire)/0.08) 40%, hsla(var(--brand-accent)/0.06) 60%, hsla(var(--ruby)/0.04) 80%, hsl(var(--background)) 100%)",
        },

        ".bg-gradient-mono": {
          background:
            "linear-gradient(180deg, hsl(var(--background)) 0%, hsla(var(--foreground)/0.02) 25%, hsla(var(--foreground)/0.05) 50%, hsla(var(--foreground)/0.03) 75%, hsl(var(--background)) 100%)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "0",
            background:
              "radial-gradient(circle at center, transparent 40%, hsla(var(--brand-accent)/0.02) 70%, transparent 100%)",
            pointerEvents: "none",
          },
        },
        ".dark .bg-gradient-mono": {
          background:
            "linear-gradient(180deg, hsl(var(--background)) 0%, hsla(var(--foreground)/0.08) 25%, hsla(var(--foreground)/0.12) 50%, hsla(var(--foreground)/0.1) 75%, hsl(var(--background)) 100%)",
        },

        //  Button Variants
        ".btn-gradient-electric": {
          "@apply text-white font-medium rounded-lg px-6 py-3": {},
          background:
            "linear-gradient(45deg, hsl(var(--brand-accent)) 0%, hsl(215 100% 65%) 35%, hsl(200 100% 70%) 70%, hsl(var(--brand-accent)) 100%)",
          backgroundSize: "300% 300%",
          animation: "gradient-shift 8s ease infinite",
          boxShadow:
            "0 4px 15px hsla(var(--brand-accent)/0.4), 0 2px 4px hsla(var(--brand-accent)/0.2)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow:
              "0 8px 25px hsla(var(--brand-accent)/0.5), 0 4px 8px hsla(var(--brand-accent)/0.3)",
          },
        },
        ".btn-gradient-glass": {
          "@apply text-foreground font-medium rounded-lg px-6 py-3": {},
          background:
            "linear-gradient(135deg, hsla(var(--background)/0.8) 0%, hsla(var(--brand-accent)/0.05) 25%, hsla(var(--background)/0.9) 50%, hsla(var(--brand-accent)/0.03) 75%, hsla(var(--background)/0.85) 100%)",
          backdropFilter: "blur(20px) saturate(1.2)",
          border: "1px solid hsla(var(--brand-accent)/0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            background:
              "linear-gradient(135deg, hsla(var(--background)/0.9) 0%, hsla(var(--brand-accent)/0.08) 25%, hsla(var(--background)/0.95) 50%, hsla(var(--brand-accent)/0.06) 75%, hsla(var(--background)/0.9) 100%)",
            transform: "translateY(-1px)",
          },
        },
        ".dark .btn-gradient-glass": {
          background:
            "linear-gradient(135deg, hsla(var(--background)/0.6) 0%, hsla(var(--brand-accent)/0.08) 25%, hsla(var(--background)/0.7) 50%, hsla(var(--brand-accent)/0.06) 75%, hsla(var(--background)/0.65) 100%)",
          "&:hover": {
            background:
              "linear-gradient(135deg, hsla(var(--background)/0.7) 0%, hsla(var(--brand-accent)/0.12) 25%, hsla(var(--background)/0.8) 50%, hsla(var(--brand-accent)/0.1) 75%, hsla(var(--background)/0.75) 100%)",
          },
        },

        // Card Variants
        ".card-gradient-hero": {
          "@apply rounded-xl border": {},
          background:
            "linear-gradient(135deg, hsl(var(--background)) 0%, hsla(var(--brand-accent)/0.03) 25%, hsla(var(--brand-accent)/0.08) 50%, hsla(var(--metal-silver)/0.05) 75%, hsl(var(--background)) 100%)",
          borderColor: "hsla(var(--border)/0.5)",
          boxShadow: "0 10px 40px hsla(var(--foreground)/0.05)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "0",
            background:
              "radial-gradient(ellipse at top right, hsla(var(--brand-accent)/0.06) 0%, transparent 50%)",
            pointerEvents: "none",
            borderRadius: "inherit",
          },
        },
        ".card-gradient-glass": {
          "@apply rounded-xl": {},
          background:
            "linear-gradient(135deg, hsla(var(--background)/0.8) 0%, hsla(var(--brand-accent)/0.05) 25%, hsla(var(--background)/0.9) 50%, hsla(var(--brand-accent)/0.03) 75%, hsla(var(--background)/0.85) 100%)",
          backdropFilter: "blur(20px) saturate(1.2)",
          border: "1px solid hsla(var(--brand-accent)/0.1)",
          boxShadow:
            "0 20px 40px hsla(var(--brand-accent)/0.1), 0 8px 16px hsla(var(--foreground)/0.05)",
        },
        ".dark .card-gradient-glass": {
          background:
            "linear-gradient(135deg, hsla(var(--background)/0.6) 0%, hsla(var(--brand-accent)/0.08) 25%, hsla(var(--background)/0.7) 50%, hsla(var(--brand-accent)/0.06) 75%, hsla(var(--background)/0.65) 100%)",
          borderColor: "hsla(var(--brand-accent)/0.15)",
        },
      });
    }),
  ],
};

export default config;
