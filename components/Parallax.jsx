"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * A single depth layer. `speed` controls how far it travels relative to
 * scroll: negative = moves up faster (foreground), positive = drifts
 * (background). Stack several of these per section for layered 3D depth.
 */
export function ParallaxLayer({
  children,
  speed = 0.2,
  scale = 1,
  className = "",
  style = {},
}) {
  const el = useRef(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { yPercent: -speed * 50, scale },
        {
          yPercent: speed * 50,
          scale,
          ease: "none",
          scrollTrigger: {
            trigger: node.closest("section") || node,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [speed, scale]);

  return (
    <div
      ref={el}
      className={`parallax-pin ${className}`}
      style={style}
      aria-hidden
    >
      {children}
    </div>
  );
}

/** Scroll-reveal: clip + fade + rise as the element enters the viewport. */
export function Reveal({ children, delay = 0, y = 40, className = "" }) {
  const el = useRef(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { autoAlpha: 0, y: reduce ? 0 : y, filter: "blur(10px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={el} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
}

/**
 * Cinematic transition between sections — a frosted "ice wipe" that
 * scales away as the next section scrolls in. No hard cuts anywhere.
 */
export function SectionTransition({ tint = "rgba(127,212,255,0.10)" }) {
  const el = useRef(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { scaleY: 1, opacity: 1 },
        {
          scaleY: 0,
          opacity: 0,
          transformOrigin: "top",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: node,
            start: "top 90%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={el}
      aria-hidden
      className="pointer-events-none relative z-30 h-[28vh] -mt-[14vh]"
      style={{
        background: `linear-gradient(180deg, transparent, ${tint} 40%, rgba(3,4,10,0.85) 78%, #03040a 100%)`,
        backdropFilter: "blur(8px)",
        WebkitMaskImage:
          "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)",
        maskImage:
          "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)",
      }}
    />
  );
}
