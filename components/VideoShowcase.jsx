"use client";

import { Reveal, ParallaxLayer } from "./Parallax";

/**
 * SECTION 4 — GAMEPLAY VIDEO
 * The real trailer/gameplay capture will be dropped in later.
 *
 *  OPTION A (local MP4):  put the file at  public/assets/video/trailer.mp4
 *                         then set USE_LOCAL_VIDEO = true.
 *  OPTION B (YouTube):    set YT_ID to the video id (the part after v=).
 *
 * Until then a styled "transmission pending" frame is shown.
 */
const USE_LOCAL_VIDEO = false; // flip to true to use a local public/assets/video/trailer.mp4 instead
const YT_ID = "wieCLKCkjiM"; // YouTube id (the part after v=)
const YT_START = 3; // start offset in seconds (from the t=3s in the share link)

export default function VideoShowcase() {
  return (
    <section
      id="video"
      className="relative isolate w-full overflow-hidden"
      style={{ paddingBlock: "var(--bay)" }}
    >
      <ParallaxLayer speed={0.3} className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 scale-125 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url(/assets/art/keyart-2.png)" }}
        />
      </ParallaxLayer>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void via-abyss/70 to-void" />

      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="lore-mono mb-5">FEED · GAMEPLAY CAPTURE</p>
          <h2 className="headline title-glow text-4xl text-ice sm:text-6xl">
            Gameplay
          </h2>
          <p className="measure mt-6 text-sm leading-relaxed text-slate-400">
            Recovered footage from the run — watch the descent in motion.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="ice-panel mt-16 overflow-hidden rounded-lg p-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
              {USE_LOCAL_VIDEO ? (
                /* ---- LOCAL MP4 SLOT ---- */
                <video
                  className="h-full w-full object-cover"
                  controls
                  preload="none"
                  poster="/assets/art/keyart-1.png"
                >
                  <source src="/assets/video/trailer.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : YT_ID ? (
                /* ---- YOUTUBE EMBED SLOT ---- */
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${YT_ID}?start=${YT_START}&rel=0&modestbranding=1`}
                  title="Gargantua: A New Home — Gameplay"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                /* ---- PLACEHOLDER (no source yet) ---- */
                <div
                  className="flex h-full w-full flex-col items-center justify-center bg-cover bg-center"
                  style={{ backgroundImage: "url(/assets/art/keyart-1.png)" }}
                >
                  <div className="absolute inset-0 bg-void/65" />
                  <div className="relative text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-ice/40 text-3xl text-ice animate-flicker">
                      ▶
                    </div>
                    <p className="kicker mt-6">Transmission pending</p>
                    <p className="mt-2 text-sm text-slate-400">
                      Trailer / gameplay capture will be embedded here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
