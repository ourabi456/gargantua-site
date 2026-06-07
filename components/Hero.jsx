"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * SECTION 1 — HERO
 * A held breath. The page is alive before the user moves: a slow light
 * sweep, drifting dust, parallax depth. Then a staged reveal — fragment
 * by fragment — like a transmission resolving out of static.
 *
 * Emotional intent: "Humanity arrived somewhere it does not understand."
 */
export default function Hero() {
  const root = useRef(null);
  const layers = useRef([]);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // ── staged reveal (dramatic timing) ──
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });
      tl.from(".hr-kicker", { autoAlpha: 0, y: 18, duration: 1.1 })
        .from(
          ".hr-logo",
          {
            autoAlpha: 0,
            scale: 1.08,
            filter: "blur(18px)",
            duration: 1.8,
          },
          "-=0.5"
        )
        .from(".hr-rule", { scaleX: 0, duration: 1.1 }, "-=0.9")
        .from(".hr-sub", { autoAlpha: 0, y: 16, duration: 1.2 }, "-=0.7")
        .from(
          ".hr-cta > *",
          { autoAlpha: 0, y: 14, stagger: 0.12, duration: 0.9 },
          "-=0.7"
        )
        .from(".hr-cue", { autoAlpha: 0, duration: 1 }, "-=0.4");

      if (!reduce) {
        layers.current.forEach((l, i) => {
          if (!l) return;
          gsap.to(l, {
            yPercent: (i + 1) * 9,
            ease: "none",
            scrollTrigger: {
              trigger: node,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });
        gsap.to(".hr-stage", {
          autoAlpha: 0,
          y: -34,
          filter: "blur(6px)",
          ease: "none",
          scrollTrigger: {
            trigger: node,
            start: "top top",
            end: "55% top",
            scrub: true,
          },
        });
      }
    }, node);

    const onMove = (e) => {
      if (reduce) return;
      const r = node.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      layers.current.forEach((l, i) => {
        if (!l) return;
        gsap.to(l, {
          x: -cx * (i + 1) * 13,
          y: -cy * (i + 1) * 8,
          duration: 1.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };
    node.addEventListener("pointermove", onMove);
    return () => {
      node.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  const setLayer = (i) => (el) => (layers.current[i] = el);

  return (
    <section
      ref={root}
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* Deep sky — Gargantua, darkened to atmosphere */}
      <div
        ref={setLayer(0)}
        className="absolute inset-0 scale-125 bg-cover bg-center"
        style={{
          backgroundImage: "url(/assets/art/bg-gargantua.png)",
          filter: "brightness(0.4) blur(3px) saturate(118%)",
          animation: "drift 38s ease-in-out infinite",
        }}
        aria-hidden
      />
      {/* Cinematic wash */}
      <div
        ref={setLayer(1)}
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-[0.16] mix-blend-screen"
        style={{ backgroundImage: "url(/assets/art/keyart-wide-2.png)" }}
        aria-hidden
      />
      {/* Slow horizon light sweep */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[34%] h-[2px] opacity-60"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(154,240,255,0.55), transparent)",
          filter: "blur(2px)",
          animation: "breathe 9s ease-in-out infinite",
        }}
      />
      {/* Tone control */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/30 to-void" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(72% 62% at 50% 44%, transparent 0%, rgba(3,4,10,0.5) 70%, #03040a 100%)",
        }}
      />
      {/* Ambient dust motes */}
      <div
        aria-hidden
        ref={setLayer(2)}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(200,220,255,0.6) 1px, transparent 1px), radial-gradient(rgba(232,199,155,0.4) 1px, transparent 1px)",
          backgroundSize: "120px 120px, 200px 200px",
          backgroundPosition: "0 0, 60px 90px",
          opacity: 0.12,
          animation: "drift 30s linear infinite",
        }}
      />

      {/* ── Title stage ── */}
      <div className="hr-stage relative z-20 mx-auto flex max-w-3xl flex-col items-center px-6 pt-24 text-center">
        <p className="hr-kicker kicker mb-7 max-w-md leading-relaxed">Humanity arrived somewhere it does not understand</p>

        <img
          src="/assets/art/logo.png"
          alt="Gargantua: A New Home"
          className="hr-logo w-[min(460px,64vw)] drop-shadow-[0_0_70px_rgba(127,212,255,0.28)]"
          loading="eager"
          fetchPriority="high"
        />

        <div className="hr-rule mt-7 h-px w-28 bg-gradient-to-r from-transparent via-ice/55 to-transparent" />

        <p className="hr-sub measure mt-7 text-[0.95rem] font-light leading-relaxed tracking-wide text-slate-400">
          One crew. The last fuel. A signal from the world beyond the black
          hole — and a side-scrolling odyssey into the silence to reach it.
        </p>

        <div className="hr-cta mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/characters"
            className="btn-signal rounded-sm px-9 py-3 text-[0.7rem]"
          >
            Meet the Crew
          </a>
          <a
            href="#story"
            className="btn-signal rounded-sm px-9 py-3 text-[0.7rem]"
            style={{ borderColor: "rgba(255,122,61,0.4)" }}
          >
            The Story
          </a>
        </div>
      </div>

      <div className="hr-cue absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center">
        <div
          className="mx-auto h-14 w-px bg-gradient-to-b from-ice/70 to-transparent"
          style={{ animation: "breathe 4s ease-in-out infinite" }}
        />
        <span className="kicker mt-3 block text-[0.5rem] opacity-50">
          descend
        </span>
      </div>
    </section>
  );
}
