"use client";

import { ParallaxLayer, Reveal } from "./Parallax";

/**
 * SECTION 2 — ABOUT THE GAME
 * Lore / world / story premise. Layered desert + underground plates
 * drift behind the narrative text.
 */
export default function About() {
  return (
    <section
      id="about"
      className="relative isolate w-full overflow-hidden"
      style={{ paddingBlock: "var(--bay)" }}
    >
      <ParallaxLayer
        speed={0.35}
        className="absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0 scale-125 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url(/assets/art/bg-underground.png)" }}
        />
      </ParallaxLayer>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void via-abyss/60 to-void" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="lore-mono mb-5">RECORD · 00 · THE PREMISE</p>
          <h2 className="headline title-glow max-w-3xl text-4xl text-ice sm:text-6xl">
            The sky stopped giving back
          </h2>
          <p className="measure mt-6 text-sm leading-relaxed text-slate-400">
            What follows is reconstructed from what the crew left behind.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          <Reveal delay={0.05}>
            <div className="ice-panel rounded-md p-9">
              <h3 className="font-display text-lg tracking-widest text-signal">
                A DYING EARTH
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                The dust came and never left. Crops failed, then the air.
                Humanity's last project isn't a city or a cure — it's a
                <span className="text-ice"> departure</span>. A faint signal
                threads out of a wormhole near the black hole{" "}
                <span className="text-ice">Gargantua</span>, pointing at a
                world that might still be alive.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="ice-panel rounded-md p-9">
              <h3 className="font-display text-lg tracking-widest text-signal">
                THE CREW
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                <span className="text-ice">Cooper</span> flies.{" "}
                <span className="text-ice">Anna</span> fights. A loyal machine
                keeps the math honest. Together they cross a ruined desert,
                descend into the dark below it, and burn through the void —
                side by side, in solo or LAN co-op.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="mt-16 grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
            <div>
              <h3 className="font-display text-lg tracking-widest text-ember">
                THE ICE THAT WALKS
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
                On Gargantua's surface something already waits — wearing the
                face of a man called <span className="text-ice">Dr. Mann</span>.
                It does not bargain. The fight ends one of two ways, and the
                ending is <span className="text-ember">your</span> choice:
                spare it and watch the cost, or strike it down and carry that
                weight to the new home.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-[0.65rem]">
                {["SPARE → betrayal", "STRIKE → mercy of steel"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 px-4 py-1 font-display tracking-widest text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <ParallaxLayer speed={-0.15}>
              <img
                src="/assets/art/drmann.png"
                alt="Dr. Mann — the ice that walks"
                className="mx-auto w-[min(360px,70vw)] rounded-md opacity-90 drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                loading="lazy"
              />
            </ParallaxLayer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
