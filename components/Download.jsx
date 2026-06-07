"use client";

import { Reveal, ParallaxLayer } from "./Parallax";
import { SOCIALS } from "@/lib/team";

/**
 * SECTION — PLAY THE GAME
 * The headline call to action: download + test the build. Placed high on the
 * page (right after the hero) so it's the first thing visitors act on.
 */
export default function Download() {
  const dl =
    SOCIALS.website && SOCIALS.website !== "#" ? SOCIALS.website : null;

  const steps = [
    ["01", "Download", "Grab the ZIP — one click above. Windows 64-bit."],
    ["02", "Unzip", "Extract the whole GARGANTUA folder anywhere you like."],
    ["03", "Run", "Open desert_runner.exe. If SmartScreen warns → More info → Run anyway."],
  ];

  return (
    <section
      id="download"
      className="relative isolate w-full overflow-hidden"
      style={{ paddingBlock: "var(--bay)" }}
    >
      {/* key-art parallax backdrop */}
      <ParallaxLayer speed={0.18} className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 scale-125 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(/assets/art/keyart-1.png)" }}
        />
      </ParallaxLayer>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void via-void/75 to-void" />
      {/* ember core glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/10 blur-[120px]" />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <p className="lore-mono mb-5">DEPLOY · BUILD v1.0 · WINDOWS</p>
          <h2 className="headline title-glow text-5xl text-ice sm:text-7xl">
            Play the Game
          </h2>
          <p className="measure mx-auto mt-6 text-base leading-relaxed text-slate-300">
            The full run is ready — story campaign, Endless Arena, Infinite
            Space, local co-op &amp; LAN, image-puzzle keys and the road to the
            stars. Download it, test it, then tell us what to fix.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="ice-panel mx-auto mt-12 max-w-3xl rounded-xl p-8 sm:p-12">
            <a
              href={dl || "#"}
              {...(dl ? { rel: "noreferrer" } : {})}
              className="btn-signal inline-flex items-center gap-3 rounded-md px-10 py-5 text-base"
            >
              <span className="text-xl leading-none">⬇</span> Download for Windows
            </a>
            <p className="mt-4 text-xs tracking-[0.25em] text-slate-400">
              WINDOWS 64-BIT · ~317 MB · v1.0 · FREE
            </p>

            {/* install steps */}
            <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
              {steps.map(([n, t, d]) => (
                <div
                  key={n}
                  className="rounded-md border border-white/10 bg-white/[0.03] p-5"
                >
                  <span className="font-display text-sm tracking-widest text-ember">
                    {n}
                  </span>
                  <h3 className="mt-2 font-display text-sm tracking-widest text-signal">
                    {t}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {d}
                  </p>
                </div>
              ))}
            </div>

            {/* secondary actions */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
              <a
                href={SOCIALS.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-ice transition hover:underline"
              >
                ▶ Watch the trailer
              </a>
              <span className="text-slate-600">·</span>
              <a href="/feedback" className="text-ember transition hover:underline">
                ✎ Send feedback after you play
              </a>
            </div>
          </div>
        </Reveal>

        {/* feature chips */}
        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
            {[
              "Story Campaign",
              "Endless Arena",
              "Infinite Space",
              "Co-op & LAN",
              "Image Puzzles",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-6 text-[0.7rem] tracking-widest text-slate-600">
            Unsigned indie build · your antivirus / SmartScreen may flag it — it&apos;s safe to run.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
