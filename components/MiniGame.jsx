"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Parallax";

/**
 * SECTION — MINI-GAME : "SIGNAL RUN"
 * A polished in-browser homage to the core loop: auto-run, jump the
 * wreckage, grab the signal cells. Canvas, no deps. Juice: pickup
 * particles, landing dust, death shake + flash + slow-mo, floating
 * score, difficulty tiers, parallax dust. rAF gated to viewport.
 */
export default function MiniGame() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [hud, setHud] = useState({ phase: "idle", score: 0, best: 0, tier: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");

    const W = 900;
    const H = 380;
    canvas.width = W;
    canvas.height = H;
    const GROUND = H - 64;

    const best = Number(
      (typeof window !== "undefined" &&
        window.localStorage.getItem("garg_signalrun_best")) ||
        0
    );

    const S = {
      phase: "idle",
      t: 0,
      speed: 5.2,
      score: 0,
      best,
      tier: 1,
      player: { x: 120, y: GROUND, vy: 0, w: 34, h: 46, onGround: true },
      obstacles: [],
      cells: [],
      parts: [],
      floats: [],
      spawn: 30,
      cellSpawn: 70,
      shake: 0,
      flash: 0,
      slowmo: 0,
      raf: 0,
      running: false,
    };
    setHud({ phase: "idle", score: 0, best, tier: 1 });

    const cellImg = new Image();
    cellImg.src = "/assets/icons/energy.png";
    const heroImg = new Image();
    heroImg.src = "/assets/characters/ourabi.png";

    const burst = (x, y, color, n = 14, spread = 4) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 1 + Math.random() * spread;
        S.parts.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 1.5,
          life: 1,
          color,
          r: 1 + Math.random() * 2.5,
        });
      }
    };

    const reset = () => {
      Object.assign(S, {
        t: 0,
        speed: 5.2,
        score: 0,
        tier: 1,
        obstacles: [],
        cells: [],
        parts: [],
        floats: [],
        spawn: 30,
        cellSpawn: 70,
        shake: 0,
        flash: 0,
        slowmo: 0,
      });
      S.player.y = GROUND;
      S.player.vy = 0;
      S.player.onGround = true;
    };
    const start = () => {
      reset();
      S.phase = "play";
      setHud({ phase: "play", score: 0, best: S.best, tier: 1 });
    };
    const jump = () => {
      if (S.phase !== "play") return start();
      if (S.player.onGround) {
        S.player.vy = -14.6;
        S.player.onGround = false;
        burst(S.player.x + S.player.w / 2, GROUND + 46, "232,199,155", 7, 2);
      }
    };
    const gameOver = () => {
      if (S.phase !== "play") return;
      S.phase = "over";
      S.shake = 16;
      S.flash = 1;
      S.slowmo = 1;
      burst(S.player.x + 17, S.player.y + 20, "255,90,71", 28, 6);
      if (S.score > S.best) {
        S.best = S.score;
        try {
          window.localStorage.setItem("garg_signalrun_best", String(S.best));
        } catch {}
      }
      setHud({ phase: "over", score: S.score, best: S.best, tier: S.tier });
    };

    const hit = (a, b) =>
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y;

    const step = () => {
      S.raf = requestAnimationFrame(step);
      if (!S.running) return;

      const dt = S.slowmo > 0 ? 0.35 : 1;
      S.slowmo = Math.max(0, S.slowmo - 0.02);

      ctx.save();
      if (S.shake > 0.2) {
        ctx.translate(
          (Math.random() - 0.5) * S.shake,
          (Math.random() - 0.5) * S.shake
        );
        S.shake *= 0.86;
      }

      // sky
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#070b18");
      g.addColorStop(1, "#03040a");
      ctx.fillStyle = g;
      ctx.fillRect(-30, -30, W + 60, H + 60);

      // parallax dust (3 depths)
      for (let d = 0; d < 3; d++) {
        const sp = (d + 1) * 0.6;
        ctx.fillStyle = `rgba(154,240,255,${0.06 + d * 0.05})`;
        for (let i = 0; i < 22; i++) {
          const x =
            (i * (90 + d * 30) - S.t * sp * (S.phase === "play" ? 1 : 0.25)) %
            (W + 40);
          ctx.fillRect(
            ((x % (W + 40)) + W + 40) % (W + 40) - 20,
            24 + ((i * 47 + d * 31) % (GROUND - 50)),
            1.6 + d,
            1.6 + d
          );
        }
      }

      // ground line
      ctx.strokeStyle = "rgba(127,212,255,0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND + 46);
      ctx.lineTo(W, GROUND + 46);
      ctx.stroke();
      ctx.fillStyle = "rgba(127,212,255,0.05)";
      ctx.fillRect(0, GROUND + 46, W, H);

      if (S.phase === "play") {
        S.t += dt;
        S.speed += 0.0017 * dt;
        S.score += Math.round(dt);
        const tier = Math.min(6, 1 + Math.floor(S.score / 600));
        if (tier !== S.tier) {
          S.tier = tier;
          S.flash = 0.5;
          S.floats.push({
            x: W / 2,
            y: H / 2 - 40,
            txt: `VELOCITY ${tier}`,
            life: 1,
            big: true,
          });
        }
        if (S.score % 8 === 0)
          setHud((h) => ({ ...h, score: S.score, tier: S.tier, phase: "play" }));

        const p = S.player;
        p.vy += 0.7 * dt;
        p.y += p.vy * dt;
        if (p.y >= GROUND) {
          if (!p.onGround)
            burst(p.x + p.w / 2, GROUND + 46, "232,199,155", 6, 2);
          p.y = GROUND;
          p.vy = 0;
          p.onGround = true;
        }

        if ((S.spawn -= dt) <= 0) {
          S.spawn = Math.max(26, 60 - S.tier * 4) + Math.random() * 44;
          const tall = Math.random() < 0.4;
          S.obstacles.push({
            x: W + 20,
            y: GROUND + 46 - (tall ? 54 : 32),
            w: tall ? 20 : 30,
            h: tall ? 54 : 32,
          });
        }
        if ((S.cellSpawn -= dt) <= 0) {
          S.cellSpawn = 86 + Math.random() * 70;
          S.cells.push({
            x: W + 20,
            y: GROUND - 30 - Math.random() * 92,
            w: 26,
            h: 26,
            ph: Math.random() * 6,
          });
        }

        S.obstacles.forEach((o) => (o.x -= S.speed * dt));
        S.cells.forEach((o) => (o.x -= S.speed * dt));
        S.obstacles = S.obstacles.filter((o) => o.x + o.w > -10);
        S.cells = S.cells.filter((o) => o.x + o.w > -10);

        const pb = { x: p.x, y: p.y, w: p.w, h: p.h };
        for (const o of S.obstacles) if (hit(pb, o)) gameOver();
        S.cells = S.cells.filter((c) => {
          if (hit(pb, c)) {
            S.score += 75;
            S.flash = 0.35;
            burst(c.x + 13, c.y + 13, "154,240,255", 16, 4);
            S.floats.push({ x: c.x + 13, y: c.y, txt: "+75", life: 1 });
            return false;
          }
          return true;
        });
      }

      // hazards
      S.obstacles.forEach((o) => {
        ctx.fillStyle = "rgba(255,122,61,0.92)";
        ctx.fillRect(o.x, o.y, o.w, o.h);
        ctx.fillStyle = "rgba(255,122,61,0.2)";
        ctx.fillRect(o.x - 3, o.y - 10, o.w + 6, 8);
      });

      // cells (glow + bob)
      S.cells.forEach((c) => {
        const bob = Math.sin((S.t + c.ph * 20) * 0.08) * 4;
        ctx.shadowColor = "rgba(154,240,255,0.9)";
        ctx.shadowBlur = 16;
        if (cellImg.complete && cellImg.naturalWidth)
          ctx.drawImage(cellImg, c.x, c.y + bob, c.w, c.h);
        else {
          ctx.fillStyle = "#9af0ff";
          ctx.beginPath();
          ctx.arc(c.x + 13, c.y + 13 + bob, 12, 0, 7);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      });

      // particles
      S.parts = S.parts.filter((q) => q.life > 0);
      S.parts.forEach((q) => {
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        q.vy += 0.18 * dt;
        q.life -= 0.026 * dt;
        ctx.fillStyle = `rgba(${q.color},${Math.max(0, q.life)})`;
        ctx.fillRect(q.x, q.y, q.r, q.r);
      });

      // player (+ jump trail)
      const p = S.player;
      if (!p.onGround) {
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = "rgba(255,90,71,0.5)";
        ctx.fillRect(p.x - 8, p.y + 4, p.w, p.h);
        ctx.globalAlpha = 1;
      }
      if (heroImg.complete && heroImg.naturalWidth)
        ctx.drawImage(heroImg, p.x - 6, p.y - 4, p.w + 14, p.h + 8);
      else {
        ctx.fillStyle = "#ff5a47";
        ctx.fillRect(p.x, p.y, p.w, p.h);
      }

      // floating score
      S.floats = S.floats.filter((f) => f.life > 0);
      S.floats.forEach((f) => {
        f.y -= 0.7 * dt;
        f.life -= 0.018 * dt;
        ctx.globalAlpha = Math.max(0, f.life);
        ctx.textAlign = "center";
        ctx.fillStyle = f.big ? "#ff7a3d" : "#9af0ff";
        ctx.font = f.big
          ? "700 22px Orbitron, sans-serif"
          : "700 15px Orbitron, sans-serif";
        ctx.fillText(f.txt, f.x, f.y);
        ctx.globalAlpha = 1;
      });

      // overlays
      ctx.textAlign = "center";
      if (S.phase === "idle") {
        ctx.fillStyle = "#eaf6ff";
        ctx.font = "900 30px Orbitron, sans-serif";
        ctx.fillText("SIGNAL RUN", W / 2, H / 2 - 18);
        ctx.fillStyle = "#9af0ff";
        ctx.font = "300 13px 'Space Grotesk', sans-serif";
        ctx.fillText("press SPACE · tap to run", W / 2, H / 2 + 12);
      } else if (S.phase === "over") {
        ctx.fillStyle = "rgba(3,4,10,0.55)";
        ctx.fillRect(-30, -30, W + 60, H + 60);
        ctx.fillStyle = "#ff7a3d";
        ctx.font = "900 32px Orbitron, sans-serif";
        ctx.fillText("RUN ENDED", W / 2, H / 2 - 16);
        ctx.fillStyle = "#dfe7f5";
        ctx.font = "300 14px 'Space Grotesk', sans-serif";
        ctx.fillText(
          `signal ${S.score}  ·  best ${S.best}  ·  velocity ${S.tier}`,
          W / 2,
          H / 2 + 12
        );
        ctx.fillStyle = "#9af0ff";
        ctx.font = "300 12px 'Space Grotesk', sans-serif";
        ctx.fillText("press to retry", W / 2, H / 2 + 36);
      }

      ctx.restore();

      // edge vignette (outside shake)
      const vg = ctx.createRadialGradient(
        W / 2,
        H / 2,
        H * 0.35,
        W / 2,
        H / 2,
        H * 0.85
      );
      vg.addColorStop(0, "transparent");
      vg.addColorStop(1, "rgba(3,4,10,0.6)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      if (S.flash > 0) {
        ctx.fillStyle = `rgba(154,240,255,${S.flash * 0.22})`;
        ctx.fillRect(0, 0, W, H);
        S.flash -= 0.05;
      }
    };

    const io = new IntersectionObserver(
      ([e]) => (S.running = e.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(wrap);

    const inView = () => {
      const r = wrap.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };
    const onKey = (e) => {
      if ((e.code === "Space" || e.code === "ArrowUp") && inView()) {
        e.preventDefault();
        jump();
      }
    };
    const onPointer = (e) => {
      e.preventDefault();
      jump();
    };
    window.addEventListener("keydown", onKey, { passive: false });
    canvas.addEventListener("pointerdown", onPointer);
    S.raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(S.raf);
      io.disconnect();
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  return (
    <section
      id="play"
      className="relative isolate w-full overflow-hidden"
      style={{ paddingBlock: "var(--bay)" }}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void via-abyss/35 to-void" />
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="lore-mono mb-5">INTERLUDE · TRAINING SIM</p>
          <h2 className="headline title-glow text-4xl text-ice sm:text-6xl">
            Signal Run
          </h2>
          <p className="measure mt-6 text-sm leading-relaxed text-slate-400">
            A taste of the core loop. Jump the wreckage, grab the signal
            cells, ride the velocity tiers as far as the dust allows.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            ref={wrapRef}
            className="ice-panel mt-14 overflow-hidden rounded-lg p-3"
          >
            <div className="flex items-center justify-between px-2 pb-3 font-display text-[0.6rem] tracking-[0.25em] text-slate-400">
              <span className="text-ice">
                SIGNAL{" "}
                <b className="text-slate-100">
                  {String(hud.score).padStart(5, "0")}
                </b>
              </span>
              <span className="text-ember">VELOCITY {hud.tier}</span>
              <span>
                BEST{" "}
                <b className="text-slate-100">
                  {String(hud.best).padStart(5, "0")}
                </b>
              </span>
            </div>
            <canvas
              ref={canvasRef}
              className="block w-full rounded-md"
              style={{ aspectRatio: "900 / 380", touchAction: "none" }}
              aria-label="Signal Run mini-game"
            />
            <p className="px-2 pt-3 text-center text-[0.66rem] tracking-[0.25em] text-slate-500">
              SPACE · ↑ · CLICK · TAP — JUMP
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
