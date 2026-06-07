"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Story from "@/components/Story";
import CharactersTeaser from "@/components/CharactersTeaser";
import Mechanics from "@/components/Mechanics";
import MiniGame from "@/components/MiniGame";
import VideoShowcase from "@/components/VideoShowcase";
import Media from "@/components/Media";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import { SectionTransition } from "@/components/Parallax";

export default function Home() {
  return (
    <div id="top" className="relative z-10">
      <Nav />

      {/* 1 — Hero */}
      <Hero />
      <SectionTransition tint="rgba(232,199,155,0.10)" />

      {/* 2 — About */}
      <About />
      <SectionTransition tint="rgba(127,212,255,0.10)" />

      {/* 3 — Story & Arcs */}
      <Story />
      <SectionTransition tint="rgba(255,122,61,0.10)" />

      {/* 4 — Characters teaser → /characters */}
      <CharactersTeaser />
      <SectionTransition tint="rgba(232,199,155,0.10)" />

      {/* 5 — Modes & Mechanics */}
      <Mechanics />
      <SectionTransition tint="rgba(127,212,255,0.10)" />

      {/* 6 — Mini-game */}
      <MiniGame />
      <SectionTransition tint="rgba(154,240,255,0.10)" />

      {/* 7 — Gameplay video */}
      <VideoShowcase />
      <SectionTransition tint="rgba(127,212,255,0.10)" />

      {/* 8 — Media / Socials */}
      <Media />
      <SectionTransition tint="rgba(154,240,255,0.10)" />

      {/* 9 — Team */}
      <Team />

      {/* 10 — Footer */}
      <Footer />
    </div>
  );
}
