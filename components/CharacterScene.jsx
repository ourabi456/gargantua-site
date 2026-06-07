"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * One character — a cinematic dossier, "a memory recovered from space
 * archives." Layered vertical parallax, per-character atmosphere, a
 * glyph watermark, animated stat meters, and recovered log fragments.
 */
export default function CharacterScene({ c, last }) {
  const root = useRef(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!reduce) {
        const mk = (sel, fromY, toY, extra = {}) =>
          gsap.fromTo(
            sel,
            { yPercent: fromY, ...extra.from },
            {
              yPercent: toY,
              ...extra.to,
              ease: "none",
              scrollTrigger: {
                trigger: node,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        mk(".cs-art", 14, -14, { from: { scale: 1.18 }, to: { scale: 1.18 } });
        mk(".cs-glyph", 50, -50);
        mk(".cs-portrait", 16, -16, {
          from: { scale: 1.04 },
          to: { scale: 1.04 },
        });
      }

      // sequenced entrance
      gsap.fromTo(
        node.querySelectorAll(".cs-in"),
        { autoAlpha: 0, y: reduce ? 0 : 30, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 60%" },
        }
      );

      // animated stat meters
      node.querySelectorAll(".cs-fill").forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: Number(bar.dataset.v) || 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: { trigger: node, start: "top 55%" },
          }
        );
      });
    }, node);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
      style={{ "--accent": c.accent }}
    >
      {/* per-character atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(58% 70% at 70% 45%, ${c.accent}26 0%, transparent 62%)`,
        }}
      />
      <div
        className="cs-art pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.07]"
        style={{ backgroundImage: `url(${c.full})` }}
        aria-hidden
      />
      {/* glyph watermark */}
      <span
        aria-hidden
        className="cs-glyph pointer-events-none absolute right-[6%] top-1/2 -translate-y-1/2 select-none leading-none"
        style={{
          fontSize: "clamp(14rem, 34vw, 34rem)",
          color: "transparent",
          WebkitTextStroke: `1px ${c.accent}1f`,
        }}
      >
        {c.glyph}
      </span>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-28 md:grid-cols-2">
        {/* Portrait */}
        <div className="relative order-1 flex justify-center md:order-2">
          <div
            className="cs-portrait cs-in relative"
            style={{ filter: `drop-shadow(0 50px 90px ${c.accent}26)` }}
          >
            <img
              src={c.portrait}
              alt={`${c.name} — ${c.title}`}
              className="max-h-[76svh] w-auto select-none object-contain"
              loading="lazy"
              draggable={false}
            />
            <div
              className="pointer-events-none absolute -inset-x-12 bottom-0 h-1/3"
              style={{
                background:
                  "linear-gradient(to top, #03040a 0%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Dossier */}
        <div className="order-2 md:order-1">
          <div className="cs-in flex items-center gap-4">
            <span
              className="font-display text-sm tracking-[0.4em]"
              style={{ color: c.accent }}
            >
              {c.index}
            </span>
            <span className="h-px w-14 bg-white/20" />
            <span className="lore-mono">
              ARCHIVE · {c.faction} · RECOVERED
            </span>
          </div>

          <h3
            className="cs-in headline mt-5 text-5xl sm:text-7xl"
            style={{ color: c.accent }}
          >
            {c.name}
          </h3>
          <p className="cs-in mt-2 font-display text-sm uppercase tracking-[0.35em] text-slate-300">
            {c.title}
          </p>

          <p className="cs-in measure mt-8 border-l border-white/15 pl-5 text-lg font-light italic leading-relaxed text-slate-200">
            “{c.line}”
          </p>

          <p className="cs-in measure mt-6 text-sm leading-relaxed text-slate-400">
            {c.bio}
          </p>

          {/* combat / emotion */}
          <div className="cs-in mt-8 grid max-w-md gap-5 sm:grid-cols-2">
            <div>
              <p className="lore-mono mb-2">Combat Style</p>
              <p className="text-xs leading-relaxed text-slate-300">
                {c.combat}
              </p>
            </div>
            <div>
              <p className="lore-mono mb-2">Emotional Profile</p>
              <p className="text-xs leading-relaxed text-slate-300">
                {c.emotion}
              </p>
            </div>
          </div>

          {/* meters */}
          <dl className="cs-in mt-8 max-w-md space-y-4">
            {c.meters.map(([k, v]) => (
              <div key={k}>
                <div className="mb-1.5 flex items-center justify-between">
                  <dt className="font-display text-[0.6rem] uppercase tracking-[0.28em] text-slate-500">
                    {k}
                  </dt>
                  <dd className="font-display text-[0.6rem] tracking-widest text-slate-500">
                    {Math.round(v * 100)}
                  </dd>
                </div>
                <div className="stat-track">
                  <div
                    className="cs-fill stat-fill"
                    data-v={v}
                    style={{
                      background: `linear-gradient(90deg, ${c.accent}, ${c.accent}55)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </dl>

          {/* recovered fragments */}
          <div className="cs-in mt-9 max-w-md space-y-1.5">
            {c.fragments.map((f) => (
              <p
                key={f}
                className="lore-mono opacity-70"
                style={{ fontSize: "0.58rem", letterSpacing: "0.16em" }}
              >
                {f}
              </p>
            ))}
          </div>
        </div>
      </div>

      {!last && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${c.accent}66, transparent)`,
          }}
        />
      )}
    </section>
  );
}
