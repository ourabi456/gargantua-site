"use client";

import { ParallaxLayer, Reveal } from "./Parallax";

/* Ways to play — pulled from the game's actual modes & menus. */
const MODES = [
  {
    tag: "1P",
    title: "Solo Campaign",
    text: "One hero, four worlds. The full story run — desert, underground, the void, and Gargantua — alone.",
  },
  {
    tag: "2P",
    title: "Local Split-Screen",
    text: "Two heroes on one screen. Shared world, shared boss — it hunts whoever's nearest; both can wound it, both can fall.",
  },
  {
    tag: "LAN",
    title: "Online LAN Co-op",
    text: "Host-authoritative two-player over the network. Host flies P1, guest joins as P2 — synced across every scene to the final choice.",
  },
  {
    tag: "BOSS",
    title: "Difficulty: Easy · Medium · Hard",
    text: "Dr. Mann scales from beatable to the unwinnable HARD — where the ice never stops and survival is the only score.",
  },
  {
    tag: "VOID",
    title: "Space-Approach Finale",
    text: "The run becomes a star-lane shooter — dodge the field, hold the lane, reach Gargantua side by side.",
  },
  {
    tag: "END",
    title: "Two Endings, Your Call",
    text: "SPARE him and watch the cost — Earth burns. STRIKE him down — Earth is saved. The game won't choose for you.",
  },
  {
    tag: "ARENA",
    title: "Endless Arena",
    text: "Pick a hero and hold the line against escalating monster waves — gun, fist and a real arcing slash. Solo, local co-op, or LAN versus, on a painted Mars-side battleground.",
  },
  {
    tag: "RUN",
    title: "Infinite Space",
    text: "An endless star-lane shooter outside the story — the score climbs, the difficulty rises, and your best run is saved to beat next time.",
  },
];

/* Core mechanics — the systems you actually press buttons for. */
const MECHANICS = [
  {
    icon: "/assets/icons/coin.png",
    title: "Run & Traverse",
    text: "Momentum platforming — sprint, variable-height jumps, ladders, and dash/slide chains through collapsing terrain.",
  },
  {
    icon: "/assets/icons/heart.png",
    title: "Survive the Hunt",
    text: "Monsters track the nearest hero. Health, hit-stun and a real death sequence — every run costs something.",
  },
  {
    icon: "/assets/icons/energy.png",
    title: "Energy & Pickups",
    text: "Coins, stars, hearts and energy cells feed the score and keep you breathing for the next leg.",
  },
  {
    icon: "/assets/icons/silver_key.png",
    title: "Keys & Doors",
    text: "Silver and gold keys gate the path into Gargantua's interior — and to the thing wearing Dr. Mann's face.",
  },
  {
    icon: "/assets/icons/chest.png",
    title: "Quiz Chests",
    text: "Owner-only knowledge checks that never freeze the world — answer under pressure, the run never stops.",
  },
  {
    icon: "/assets/icons/star.png",
    title: "Gamepad & Rumble",
    text: "Full controller support with rumble feedback — including a custom Arduino gamepad driver.",
  },
  {
    icon: "/assets/icons/gold_key.png",
    title: "Image Puzzles & Keys",
    text: "Slide-tile puzzles built from real interstellar photos — Easy, Medium or Hard. Win three to earn the keys that unlock the spaceship and the road to space.",
  },
  {
    icon: "/assets/icons/chest.png",
    title: "Checkpoints",
    text: "Push deeper and drop checkpoint flags on solid ground — fall, and you respawn at the last beacon instead of the start of the level.",
  },
];

/**
 * SECTION 3 — MODES & MECHANICS
 * Two clean bands: how you can play, then what you actually do.
 */
export default function Mechanics() {
  return (
    <section
      id="mechanics"
      className="relative isolate w-full overflow-hidden py-32"
    >
      <ParallaxLayer speed={0.22} className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 scale-125 bg-cover bg-center opacity-[0.14]"
          style={{ backgroundImage: "url(/assets/art/bg-bossfight.png)" }}
        />
      </ParallaxLayer>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void via-abyss/45 to-void" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="kicker mb-4">Chapter 03 — How You Play</p>
          <h2 className="headline title-glow text-4xl text-ice sm:text-6xl">
            Many ways in.
            <br />
            One way out.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400">
            Gargantua isn&apos;t one mode — it&apos;s a campaign you can run
            alone, on a couch, or across a LAN, with a boss that bends from
            fair to merciless.
          </p>
        </Reveal>

        {/* Ways to play */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODES.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 0.05}>
              <div className="ice-panel group h-full rounded-md p-7 transition-transform duration-500 hover:-translate-y-2">
                <span className="font-display text-[0.62rem] tracking-[0.3em] text-ember">
                  {m.tag}
                </span>
                <h3 className="mt-3 font-display text-base tracking-widest text-signal">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {m.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Core mechanics */}
        <Reveal>
          <p className="kicker mb-4 mt-28">Chapter 03½ — Core Systems</p>
          <h2 className="headline title-glow text-4xl text-ice sm:text-6xl">
            How you stay alive
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MECHANICS.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 0.05}>
              <div className="ice-panel group h-full rounded-md p-7 transition-transform duration-500 hover:-translate-y-2">
                <img
                  src={m.icon}
                  alt=""
                  className="h-11 w-11 object-contain drop-shadow-[0_0_14px_rgba(127,212,255,0.5)] [image-rendering:pixelated]"
                  loading="lazy"
                />
                <h3 className="mt-5 font-display text-base tracking-widest text-signal">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {m.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
