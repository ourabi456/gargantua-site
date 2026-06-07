"use client";

import { ParallaxLayer, Reveal } from "./Parallax";

/* Arcs as recovered records — story is discovered, not narrated. */
const ARCS = [
  {
    code: "REC·01",
    sig: "EARTH // DESERT",
    title: "The Dust",
    body: "The dust came and never left. Crops failed, then the air. The last project isn't a cure — it's a departure.",
    log: "“…breathable hours per day still dropping. We are not staying.”",
    img: "/assets/art/bg-desert.png",
  },
  {
    code: "REC·02",
    sig: "SUBSURFACE",
    title: "The Descent",
    body: "Below the dead surface, the dark holds what's left of the launch. The crew goes down before it can go up.",
    log: "“the elevator only goes one way now. so do we.”",
    img: "/assets/art/bg-underground.png",
  },
  {
    code: "REC·03",
    sig: "TRANSIT // VOID",
    title: "The Void",
    body: "The run becomes a star-lane crossing. Silence, then a single deep tone — Gargantua. The black hole no one comes back from.",
    log: "“nav lock acquired. it is so much larger than the models.”",
    img: "/assets/cinematic/garg-1.png",
  },
  {
    code: "REC·04",
    sig: "SURFACE // GARGANTUA",
    title: "A New Home?",
    body: "A signal said someone could live here. The surface is real, the gravity is real — and so is what arrived before you.",
    log: "“the beacon is genuine. the promise behind it is not.”",
    img: "/assets/art/bg-gargantua.png",
  },
  {
    code: "REC·05",
    sig: "CONTACT // DR. MANN",
    title: "The Ice That Walks",
    body: "It wears a man's face and a man's reasons. Three difficulties, one hunt. On HARD it cannot be beaten — only survived.",
    log: "“he says he understands. he says we will too.”",
    img: "/assets/art/bg-bossfight.png",
  },
  {
    code: "REC·06",
    sig: "RESOLUTION",
    title: "The Choice",
    body: "SPARE him — he betrays you, and Earth burns. STRIKE him down — Earth is saved, and you carry the weight home.",
    log: "“the game will not make this one for you.”",
    img: "/assets/cinematic/earthboom-1.png",
  },
];

/**
 * SECTION — STORY & ARCS
 * A descending spine of recovered records. Each arc alternates side,
 * carries an in-universe transmission line, and drifts on parallax.
 */
export default function Story() {
  return (
    <section
      id="story"
      className="relative isolate w-full overflow-hidden"
      style={{ paddingBlock: "var(--bay)" }}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void via-abyss/35 to-void" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="lore-mono mb-5">RECOVERED ARCHIVE · 06 RECORDS · PARTIAL</p>
          <h2 className="headline title-glow text-4xl text-ice sm:text-6xl">
            Story &amp; Arcs
          </h2>
          <p className="measure mt-6 text-sm leading-relaxed text-slate-400">
            Six legs of one descent. Nothing here is explained — it is
            recovered, in the order it was lost.
          </p>
        </Reveal>

        <div className="relative mt-24">
          <div
            aria-hidden
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-ice/35 via-white/8 to-ember/40 md:left-1/2"
          />

          <div className="space-y-28">
            {ARCS.map((a, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal key={a.code} delay={0.03}>
                  <div
                    className={`relative grid items-center gap-10 md:grid-cols-2 ${
                      right ? "md:[direction:rtl]" : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className="absolute left-4 top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-ice/60 bg-void md:left-1/2"
                    />

                    <ParallaxLayer
                      speed={right ? 0.14 : -0.14}
                      className="[direction:ltr]"
                    >
                      <div className="relative overflow-hidden rounded-md border border-white/10">
                        <div
                          className="h-56 w-full bg-cover bg-center sm:h-72"
                          style={{ backgroundImage: `url(${a.img})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-void/40 to-transparent" />
                        <span className="absolute bottom-3 left-4 lore-mono">
                          {a.sig}
                        </span>
                        <span className="absolute right-4 top-3 lore-mono opacity-60">
                          {a.code}
                        </span>
                      </div>
                    </ParallaxLayer>

                    <div
                      className={`[direction:ltr] ${
                        right ? "md:pr-14 md:text-right" : "md:pl-14"
                      }`}
                    >
                      <span className="font-display text-[0.66rem] tracking-[0.42em] text-ember">
                        {a.code}
                      </span>
                      <h3 className="headline mt-3 text-3xl text-ice sm:text-4xl">
                        {a.title}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-slate-400">
                        {a.body}
                      </p>
                      <p
                        className={`mt-5 inline-block border-white/12 text-xs font-light italic leading-relaxed text-slate-500 ${
                          right
                            ? "md:border-r md:pr-4"
                            : "border-l pl-4"
                        }`}
                      >
                        {a.log}
                        <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-ice/60 align-middle [animation:breathe_1.4s_steps(1)_infinite]" />
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
