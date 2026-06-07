"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CharacterScene from "@/components/CharacterScene";
import { CHARACTERS } from "@/lib/characters";

/**
 * Dedicated character page — a single vertical scroll. An intro panel,
 * then one full-viewport panel per character with 2D parallax handoffs.
 */
export default function CharactersPage() {
  return (
    <div id="top" className="relative z-10">
      <Nav />

      {/* Intro */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <p className="kicker mb-6 animate-flicker">The ones who run</p>
        <h1 className="headline title-glow text-5xl text-ice sm:text-8xl">
          Characters
        </h1>
        <p className="mt-7 max-w-md text-sm leading-relaxed text-slate-400">
          Three carry the last of humanity across the dark. One is already
          waiting at the end of it. Scroll.
        </p>
        <div className="mt-16 flex flex-col items-center">
          <div className="h-14 w-px bg-gradient-to-b from-ice/70 to-transparent" />
          <span className="kicker mt-3 text-[0.55rem] opacity-60">
            descend
          </span>
        </div>
      </section>

      {CHARACTERS.map((c, i) => (
        <CharacterScene
          key={c.id}
          c={c}
          last={i === CHARACTERS.length - 1}
        />
      ))}

      {/* Outro */}
      <section className="flex min-h-[60svh] flex-col items-center justify-center px-6 text-center">
        <p className="max-w-lg text-lg font-light italic leading-relaxed text-slate-300">
          One crew. One signal. One choice that doesn&apos;t come back.
        </p>
        <a
          href="/"
          className="btn-signal mt-10 rounded-sm px-8 py-3 text-xs"
        >
          ← Return to the mission
        </a>
      </section>

      <Footer />
    </div>
  );
}
