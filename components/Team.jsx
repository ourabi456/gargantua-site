"use client";

import { useState } from "react";
import { Reveal, ParallaxLayer } from "./Parallax";
import { TEAM } from "@/lib/team";

function Portrait({ member }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-ice/15 bg-gradient-to-b from-abyss to-void">
      {ok ? (
        // Portrait image slot — drop public/assets/team/member-N.png
        // (see lib/team.js). Falls back to the frame below if missing.
        <img
          src={member.photo}
          alt={member.name}
          onError={() => setOk(false)}
          className="h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <span className="font-display text-5xl text-ice/30">
            0{member.id}
          </span>
          <span className="kicker mt-3 text-[0.55rem] opacity-60">
            portrait pending
          </span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void to-transparent" />
      <span className="absolute left-3 top-3 font-display text-xs tracking-widest text-ice/50">
        0{member.id}
      </span>
    </div>
  );
}

/**
 * SECTION 6 — TEAM (6 members)
 * Used both as a homepage section and on the dedicated /team route.
 */
export default function Team({ standalone = false }) {
  return (
    <section
      id="team"
      className="relative isolate w-full overflow-hidden"
      style={{ paddingBlock: "var(--bay)" }}
    >
      <ParallaxLayer speed={0.18} className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 scale-125 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url(/assets/art/bg-desert.png)" }}
        />
      </ParallaxLayer>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void via-abyss/60 to-void" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="lore-mono mb-5">CREDITS · 06 · THE MAKERS</p>
          <h2 className="headline title-glow text-4xl text-ice sm:text-6xl">
            The Team
          </h2>
          <p className="mt-5 max-w-xl text-sm text-slate-400">
            Six people built this world. Portraits and full bios are landing
            shortly — slots are wired and ready.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.id} delay={(i % 3) * 0.06}>
              <article className="ice-panel group rounded-lg p-5 transition-transform duration-500 hover:-translate-y-2">
                <Portrait member={m} />
                <h3 className="mt-5 font-display text-base tracking-widest text-signal">
                  {m.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-ember">
                  {m.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {m.bio}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {standalone && (
          <div className="mt-16">
            <a href="/" className="btn-signal rounded-sm px-7 py-3 text-xs">
              ← Back to site
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
