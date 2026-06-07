"use client";

import { useEffect, useState } from "react";

const LINKS = [
  ["Download", "/#download"],
  ["About", "/#about"],
  ["Story", "/#story"],
  ["Characters", "/characters"],
  ["Modes", "/#mechanics"],
  ["Demo", "/#play"],
  ["Gameplay", "/#video"],
  ["Team", "/team"],
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid || open
          ? "border-b border-white/10 bg-void/70 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className="font-display text-sm tracking-[0.3em] text-ice"
          onClick={() => setOpen(false)}
        >
          GARGANTUA
        </a>

        {/* Desktop links */}
        <ul className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-slate-300 md:flex">
          {LINKS.map(([l, h]) => (
            <li key={h}>
              <a
                className={`transition hover:text-ice ${
                  l === "Download"
                    ? "rounded-sm border border-ember/50 bg-ember/10 px-3 py-1.5 text-ember hover:bg-ember/20 hover:text-ember"
                    : ""
                }`}
                href={h}
              >
                {l === "Download" ? "⬇ Download" : l}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-px w-6 bg-ice transition-all duration-300 ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-ice transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-px w-6 bg-ice transition-all duration-300 ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-void/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 md:hidden ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 text-sm uppercase tracking-[0.2em] text-slate-300">
          {LINKS.map(([l, h]) => (
            <li key={h} className="border-b border-white/5 last:border-0">
              <a
                className={`block py-4 transition hover:text-ice ${
                  l === "Download" ? "font-display tracking-widest text-ember" : ""
                }`}
                href={h}
                onClick={() => setOpen(false)}
              >
                {l === "Download" ? "⬇ Download the Game" : l}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
