// ---------------------------------------------------------------------------
// GAME CHARACTERS — cinematic dossiers. Each entry powers one full-screen
// panel on /characters: quote, combat style, emotional profile, animated
// stat meters, recovered lore fragments, symbolic glyph.
//
//  >>> NAMES: edit freely. "Ourabi the Adventurer" is the red hero.
// ---------------------------------------------------------------------------

export const CHARACTERS = [
  {
    id: "ourabi",
    index: "01",
    name: "OURABI",
    title: "The Adventurer",
    faction: "AstroCrew",
    glyph: "✦",
    accent: "#ff5a47",
    line: "I've crossed worse than a dead planet. Keep up.",
    combat: "Pure traversal — dash and slide chains, never stops moving.",
    emotion:
      "Reckless on purpose. Hope worn as bravado so the others don't have to carry it.",
    bio: "The red runner. First in, last out — Ourabi reads a collapsing world like a route, not a graveyard. The reason the crew still believes there's somewhere left to reach.",
    meters: [
      ["Mobility", 0.96],
      ["Resolve", 0.88],
      ["Caution", 0.32],
    ],
    fragments: [
      "LOG // first to volunteer. No hesitation recorded.",
      "ARCHIVE // 'somewhere left to reach' — repeated 14×.",
    ],
    portrait: "/assets/characters/ourabi.png",
    full: "/assets/art/keyart-wide-1.png",
  },
  {
    id: "cooper",
    index: "02",
    name: "COOPER",
    title: "The Pilot",
    faction: "AstroCrew",
    glyph: "✧",
    accent: "#e8c79b",
    line: "Someone has to fly us out of a dying world.",
    combat: "Momentum master — variable-height control, precision landings.",
    emotion:
      "Steady to the point of cold. Calm is the discipline that keeps everyone alive.",
    bio: "Hands steady when the dust turns the sky to rust. Cooper reads momentum the way others read maps. He carries the run; the others carry him.",
    meters: [
      ["Precision", 0.94],
      ["Composure", 0.9],
      ["Mobility", 0.7],
    ],
    fragments: [
      "LOG // flight hours: more than anyone left alive.",
      "ARCHIVE // 'the landing is the only part that matters.'",
    ],
    portrait: "/assets/characters/cooper.png",
    full: "/assets/characters/cooper-portrait.png",
  },
  {
    id: "anna",
    index: "03",
    name: "ANNA",
    title: "The Fighter",
    faction: "AstroCrew",
    glyph: "✶",
    accent: "#7fd4ff",
    line: "Whatever's down there, it goes through me first.",
    combat: "Holds the line — turns to face the hunt so the run continues.",
    emotion:
      "Short patience, shorter fear. Anger pointed forward, never at the crew.",
    bio: "Where others avoid, Anna answers. She holds the line in the underground dark and again on Gargantua's surface — the one who turns so the run can keep going.",
    meters: [
      ["Combat", 0.95],
      ["Nerve", 0.92],
      ["Patience", 0.35],
    ],
    fragments: [
      "LOG // never recorded retreating. Not once.",
      "ARCHIVE // 'first' — her most-used word.",
    ],
    portrait: "/assets/characters/anna.png",
    full: "/assets/characters/anna-portrait.png",
  },
  {
    id: "drmann",
    index: "04",
    name: "DR. MANN",
    title: "The Ice That Walks",
    faction: "Gargantua",
    glyph: "❄",
    accent: "#ff7a3d",
    line: "I only did what survival required. You'll understand.",
    combat: "The boss — EASY · MEDIUM · HARD. Hunts the nearest hero.",
    emotion:
      "Reason without warmth. Every cruelty pre-forgiven by the one committing it.",
    bio: "Already on Gargantua when the signal said someone could live here. It wears a man's face and a man's reasons, and it does not bargain. The fight ends one of two ways — and the choice, spare or strike, is the only ending the game won't make for you.",
    meters: [
      ["Threat", 1.0],
      ["Cunning", 0.88],
      ["Mercy", 0.06],
    ],
    fragments: [
      "TRANSMISSION // 'the world is survivable.' — falsified.",
      "ARCHIVE // signal origin traced to: him.",
    ],
    portrait: "/assets/characters/drmann.png",
    full: "/assets/characters/drmann-art.png",
  },
];
