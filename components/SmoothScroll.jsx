"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lenis smooth scrolling synced to GSAP ScrollTrigger.
 * Every parallax effect on the site reads from this scroll driver,
 * so scrolling feels weighted and cinematic rather than native-snappy.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: reduce ? 0.1 : 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <main id="scroll-root">{children}</main>;
}
