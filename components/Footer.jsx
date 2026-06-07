"use client";

import { SOCIALS } from "@/lib/team";

/** SECTION 7 — FOOTER */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-20 border-t border-white/10 bg-void/80 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <img
            src="/assets/art/logo2.png"
            alt="Gargantua: A New Home"
            className="w-48 opacity-90"
            loading="lazy"
          />
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-slate-500">
            A cinematic side-scrolling odyssey to the world beyond the black
            hole.
          </p>
        </div>

        <div>
          <h4 className="kicker mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            {[
              ["About", "/#about"],
              ["Story & Arcs", "/#story"],
              ["Characters", "/characters"],
              ["Modes & Mechanics", "/#mechanics"],
              ["Signal Run", "/#play"],
              ["Gameplay", "/#video"],
              ["Team", "/team"],
            ].map(([label, href]) => (
              <li key={href}>
                <a className="transition hover:text-ice" href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="kicker mb-4">Signal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              {/* TODO: real YouTube URL in lib/team.js */}
              <a
                className="transition hover:text-ember"
                href={SOCIALS.youtube}
                target="_blank"
                rel="noreferrer"
              >
                YouTube ↗
              </a>
            </li>
            <li>
              {/* TODO: real Instagram URL in lib/team.js */}
              <a
                className="transition hover:text-ice"
                href={SOCIALS.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram ↗
              </a>
            </li>
            {SOCIALS.tiktok && SOCIALS.tiktok !== "#" && (
              <li>
                <a className="transition hover:text-ice" href={SOCIALS.tiktok} target="_blank" rel="noreferrer">
                  TikTok ↗
                </a>
              </li>
            )}
            {SOCIALS.website && SOCIALS.website !== "#" && (
              <li>
                <a className="transition hover:text-ice" href={SOCIALS.website} target="_blank" rel="noreferrer">
                  Website ↗
                </a>
              </li>
            )}
            <li>
              <a
                className="transition hover:text-ember"
                href={SOCIALS.feedback && SOCIALS.feedback !== "#" ? SOCIALS.feedback : "/#media"}
                target={SOCIALS.feedback && SOCIALS.feedback !== "#" ? "_blank" : undefined}
                rel="noreferrer"
              >
                Feedback ↗
              </a>
            </li>
            <li>
              <a className="transition hover:text-ice" href="/team">
                Full Team ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-6 text-center text-[0.7rem] tracking-widest text-slate-600">
        © {year} GARGANTUA: A NEW HOME — All rights reserved. Built with the
        game&apos;s own art.
      </div>
    </footer>
  );
}
