"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FEEDBACK_KEY } from "@/lib/team";

/**
 * Native feedback form. Submits to Web3Forms (free, no backend) — set the
 * access key in lib/team.js (FEEDBACK_KEY). Submissions arrive in the inbox
 * tied to that key. Falls back to a clear "being set up" notice if unset.
 */
export default function FeedbackPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | ok | err
  const configured = Boolean(FEEDBACK_KEY);

  async function onSubmit(e) {
    e.preventDefault();
    if (!configured) return;
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    fd.append("access_key", FEEDBACK_KEY);
    fd.append("subject", "GARGANTUA — new player feedback");
    fd.append("from_name", "GARGANTUA site");
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const j = await r.json();
      setStatus(j.success ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  }

  const field =
    "w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-ice/60 focus:bg-white/[0.07]";

  return (
    <div id="top" className="relative z-10">
      <Nav />
      <section className="relative mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center px-6 py-32">
        <p className="lore-mono mb-5">UPLINK · YOUR SIGNAL</p>
        <h1 className="headline title-glow text-4xl text-ice sm:text-6xl">
          Send feedback
        </h1>
        <p className="measure mt-5 text-sm leading-relaxed text-slate-400">
          Played GARGANTUA? Tell us what landed and what to fix. One minute —
          it shapes the next update.
        </p>

        {status === "ok" ? (
          <div className="ice-panel mt-12 rounded-lg p-10 text-center">
            <div className="text-4xl text-signal">✓</div>
            <h2 className="mt-4 font-display tracking-widest text-ice">
              SIGNAL RECEIVED
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Thank you — your feedback is on its way to the crew.
            </p>
            <a href="/" className="btn-signal mt-8 inline-block rounded-sm px-8 py-3 text-xs">
              Back to base →
            </a>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 space-y-5">
            <div>
              <label className="kicker mb-2 block">Your name</label>
              <input name="name" required maxLength={60} className={field} placeholder="Commander…" />
            </div>

            <div>
              <label className="kicker mb-2 block">Overall rating</label>
              <select name="rating" required defaultValue="" className={field}>
                <option value="" disabled>Pick 1–5…</option>
                <option value="5">★★★★★ — Stellar</option>
                <option value="4">★★★★ — Great</option>
                <option value="3">★★★ — Good</option>
                <option value="2">★★ — Needs work</option>
                <option value="1">★ — Rough</option>
              </select>
            </div>

            <div>
              <label className="kicker mb-2 block">Which did you play?</label>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-300 sm:grid-cols-3">
                {["Story", "Endless Arena", "Infinite Space", "Co-op / LAN", "Puzzles"].map((m) => (
                  <label key={m} className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
                    <input type="checkbox" name="modes" value={m} className="accent-[#7fd4ff]" />
                    {m}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="kicker mb-2 block">What did you enjoy most?</label>
              <textarea name="enjoyed" rows={3} maxLength={1000} className={field} placeholder="The moment it clicked…" />
            </div>

            <div>
              <label className="kicker mb-2 block">Bugs or things to improve?</label>
              <textarea name="improve" rows={3} maxLength={1000} className={field} placeholder="Anything that broke or annoyed you…" />
            </div>

            <div>
              <label className="kicker mb-2 block">Email (optional — for a reply)</label>
              <input type="email" name="email" className={field} placeholder="you@example.com" />
            </div>

            {!configured && (
              <p className="rounded-md border border-ember/30 bg-ember/10 px-4 py-3 text-xs text-ember">
                Feedback form is being set up — check back shortly.
              </p>
            )}
            {status === "err" && (
              <p className="rounded-md border border-ember/30 bg-ember/10 px-4 py-3 text-xs text-ember">
                Something went wrong sending that. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={!configured || status === "sending"}
              className="btn-signal w-full rounded-sm px-8 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "Transmitting…" : "Transmit feedback →"}
            </button>
          </form>
        )}
      </section>
      <Footer />
    </div>
  );
}
