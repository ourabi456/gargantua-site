"use client";

import { Reveal } from "./Parallax";
import { CHARACTERS } from "@/lib/characters";

/**
 * Home teaser → full /characters page. Deliberately sparse: four names,
 * four silhouettes, one line. The detail lives on the dedicated page.
 */
export default function CharactersTeaser() {
  return (
    <section
      id="characters"
      className="relative isolate w-full overflow-hidden"
      style={{ paddingBlock: "var(--bay)" }}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void via-abyss/30 to-void" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="lore-mono mb-5">DOSSIER · 04 PROFILES · RECOVERED</p>
          <h2 className="headline title-glow text-4xl text-ice sm:text-6xl">
            Who carries this
          </h2>
          <p className="measure mt-6 text-sm leading-relaxed text-slate-400">
            Three carry the last of humanity. One waits at the end of it.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {CHARACTERS.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <a
                href="/characters"
                className="group relative block overflow-hidden rounded-md border border-white/8"
                style={{ background: `linear-gradient(180deg, ${c.accent}10, transparent)` }}
              >
                <div className="relative flex h-72 items-end justify-center overflow-hidden">
                  <img
                    src={c.portrait}
                    alt={c.name}
                    className="max-h-[88%] w-auto object-contain opacity-70 grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void to-transparent" />
                </div>
                <div className="px-4 pb-5 pt-2 text-center">
                  <span
                    className="font-display text-[0.6rem] tracking-[0.3em]"
                    style={{ color: c.accent }}
                  >
                    {c.index}
                  </span>
                  <h3 className="mt-1 font-display text-sm tracking-[0.25em] text-slate-200">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                    {c.title}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex justify-center">
            <a
              href="/characters"
              className="btn-signal rounded-sm px-9 py-3 text-xs"
            >
              Open Character Dossiers →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
