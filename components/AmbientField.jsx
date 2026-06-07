"use client";

import { useEffect, useRef } from "react";

/**
 * Persistent atmosphere that lives behind the whole document and evolves
 * as you scroll — the page should never feel flat. Two slow nebula
 * blooms drift, a fine dust haze breathes, and the overall hue shifts
 * from dust-warm (Earth) → ice-cold (the void) → ember (the boss) as
 * you descend the page. CSS-driven, GPU-cheap, reduced-motion aware.
 */
export default function AmbientField() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max =
          document.documentElement.scrollHeight - window.innerHeight || 1;
        const p = Math.min(1, Math.max(0, window.scrollY / max));
        // warm dust → cold ice → ember, across the journey
        const hue = 38 + p * 150; // 38 (dust) → 188 (ice) → 188+
        const ember = p > 0.72 ? (p - 0.72) / 0.28 : 0;
        el.style.setProperty("--amb-hue", hue.toFixed(1));
        el.style.setProperty("--amb-ember", ember.toFixed(3));
        el.style.setProperty("--amb-depth", (0.35 + p * 0.4).toFixed(3));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ "--amb-hue": 38, "--amb-ember": 0, "--amb-depth": 0.35 }}
    >
      {/* primary bloom */}
      <div
        className="absolute -left-[20%] top-[8%] h-[70vh] w-[70vh] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, hsla(var(--amb-hue),70%,55%,0.16), transparent 70%)",
          animation: "drift 26s ease-in-out infinite",
        }}
      />
      {/* counter bloom */}
      <div
        className="absolute -right-[15%] top-[55%] h-[60vh] w-[60vh] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, hsla(calc(var(--amb-hue) + 30),65%,50%,0.13), transparent 70%)",
          animation: "drift 34s ease-in-out infinite reverse",
        }}
      />
      {/* ember undertow — only blooms toward the boss/endings */}
      <div
        className="absolute bottom-[2%] left-1/2 h-[50vh] w-[80vw] -translate-x-1/2 rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,61,0.18), transparent 70%)",
          opacity: "var(--amb-ember)",
          transition: "opacity 1.2s ease",
        }}
      />
      {/* depth haze — deepens as you descend */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(3,4,10,calc(var(--amb-depth) * 0.6)) 100%)",
        }}
      />
      {/* fine dust */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(200,220,255,0.5) 0.5px, transparent 0.5px)",
          backgroundSize: "46px 46px",
          opacity: 0.05,
          animation: "drift 40s linear infinite",
        }}
      />
    </div>
  );
}
