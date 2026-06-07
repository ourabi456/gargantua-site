"use client";

import { Reveal, ParallaxLayer } from "./Parallax";
import { SOCIALS } from "@/lib/team";

/**
 * SECTION 5 — MEDIA / SOCIALS
 * Clearly-labelled slots. The accounts exist; URLs go into lib/team.js
 * (SOCIALS.youtube / SOCIALS.instagram). The YouTube channel embed slot
 * is ready for a channel/playlist iframe when available.
 */
export default function Media() {
  return (
    <section
      id="media"
      className="relative isolate w-full overflow-hidden"
      style={{ paddingBlock: "var(--bay)" }}
    >
      <ParallaxLayer speed={0.2} className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 scale-125 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/assets/art/bg-gargantua.png)" }}
        />
      </ParallaxLayer>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void via-abyss/60 to-void" />

      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="lore-mono mb-5">UPLINK · OPEN CHANNELS</p>
          <h2 className="headline title-glow text-4xl text-ice sm:text-6xl">
            Follow the mission
          </h2>
          <p className="measure mt-6 text-sm leading-relaxed text-slate-400">
            The transmission continues here.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {/* YouTube */}
          <Reveal delay={0.05}>
            <a
              href={SOCIALS.youtube}
              target="_blank"
              rel="noreferrer"
              className="ice-panel group block rounded-md p-8 transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-md border border-ember/40 text-xl text-ember">
                  ▶
                </span>
                <div>
                  <h3 className="font-display tracking-widest text-signal">
                    YOUTUBE
                  </h3>
                  <p className="text-xs text-slate-400">
                    Watch the gameplay capture ↗
                  </p>
                </div>
              </div>

              {/* Video poster → opens the capture on YouTube */}
              <div className="relative mt-6 aspect-video overflow-hidden rounded-md border border-white/10">
                <img
                  src="https://i.ytimg.com/vi/wieCLKCkjiM/hqdefault.jpg"
                  alt="Gargantua — gameplay capture"
                  className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/art/keyart-1.png";
                  }}
                />
                <div className="absolute inset-0 bg-void/30" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ice/60 bg-void/50 text-2xl text-ice backdrop-blur transition duration-500 group-hover:scale-110 group-hover:bg-ember/20">
                  ▶
                </span>
              </div>
            </a>
          </Reveal>

          {/* Instagram */}
          <Reveal delay={0.1}>
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noreferrer"
              className="ice-panel block rounded-md p-8 transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-md border border-ice/40 text-xl text-ice">
                  ◎
                </span>
                <div>
                  <h3 className="font-display tracking-widest text-signal">
                    INSTAGRAM
                  </h3>
                  <p className="text-xs text-slate-400">
                    Screens &amp; devlog — coming soon
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {["keyart-1", "keyart-2", "mainmenu"].map((k) => (
                  <div
                    key={k}
                    className="aspect-square overflow-hidden rounded-sm border border-white/10"
                  >
                    <img
                      src={`/assets/art/${k}.png`}
                      alt=""
                      className="h-full w-full object-cover opacity-80"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </a>
          </Reveal>
        </div>

        {/* ── CONNECT — the QR landing hub: every channel in one place ── */}
        <Reveal delay={0.05}>
          <p className="lore-mono mb-5 mt-24">CONNECT · SCAN TO REACH US</p>
          <h3 className="headline title-glow text-3xl text-ice sm:text-4xl">
            Every channel, one tap
          </h3>
          <p className="measure mt-4 text-sm leading-relaxed text-slate-400">
            Scan the code, land here, follow the mission — or send us your
            feedback.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { key: "youtube", label: "YouTube", glyph: "▶", note: "Gameplay", accent: "text-ember border-ember/40" },
            { key: "instagram", label: "Instagram", glyph: "◎", note: "@gargantua2189", accent: "text-ice border-ice/40" },
            { key: "instagramCrew", label: "Astro Crew", glyph: "◍", note: "@astro.crew.2026", accent: "text-ice border-ice/40" },
            { key: "tiktok", label: "TikTok", glyph: "♪", note: "Clips", accent: "text-signal border-signal/40" },
            { key: "website", label: "Website", glyph: "⬡", note: "Download & press", accent: "text-ice border-ice/40" },
            { key: "feedback", label: "Feedback", glyph: "✎", note: "Tell us what you think", accent: "text-ember border-ember/40" },
          ].map((l, i) => {
            const url = SOCIALS[l.key] || "#";
            const live = url && url !== "#";
            const Tag = live ? "a" : "div";
            return (
              <Reveal key={l.key} delay={(i % 5) * 0.04}>
                <Tag
                  {...(live ? { href: url, target: "_blank", rel: "noreferrer" } : {})}
                  className={`ice-panel group flex h-full flex-col items-center justify-center gap-3 rounded-md p-6 text-center transition-transform duration-500 ${
                    live ? "hover:-translate-y-2" : "opacity-50"
                  }`}
                >
                  <span className={`flex h-12 w-12 items-center justify-center rounded-md border text-xl ${l.accent}`}>
                    {l.glyph}
                  </span>
                  <span className="font-display text-xs tracking-widest text-signal">
                    {l.label} {live ? "↗" : ""}
                  </span>
                  <span className="text-[0.65rem] leading-tight text-slate-400">
                    {live ? l.note : "coming soon"}
                  </span>
                </Tag>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
