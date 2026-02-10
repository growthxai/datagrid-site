"use client";

import { useEffect, useRef } from "react";

type Props = {
  variant: "agents" | "connectors";
};

export default function BlueprintBg({ variant }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let target = 0;
    let smooth = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const r = parent!.getBoundingClientRect();
      canvas!.width = r.width * dpr;
      canvas!.height = r.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onScroll() {
      const r = parent!.getBoundingClientRect();
      const vh = window.innerHeight;
      target = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.85)));
    }

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    const B = "59,130,246";
    const ease = (t: number) => t >= 1 ? 1 : 1 - Math.pow(1 - t, 3);

    // City layers: back → front. Each building: [xFraction, floors]
    const layers = variant === "agents"
      ? [
          { s: 0.25, a: 0.05, y: 0.56, d: 0, b: [
            [.02,10],[.09,14],[.17,7],[.25,16],[.34,9],[.43,12],[.52,7],[.60,15],[.69,10],[.78,12],[.87,8],[.95,6],
          ]},
          { s: 0.42, a: 0.08, y: 0.66, d: 0.03, b: [
            [.01,11],[.11,16],[.22,8],[.33,13],[.45,18],[.56,9],[.67,14],[.79,8],[.90,12],
          ]},
          { s: 0.62, a: 0.12, y: 0.80, d: 0.07, b: [
            [.04,12],[.16,18],[.31,9],[.46,15],[.61,20],[.77,11],[.91,14],
          ]},
          { s: 1.0, a: 0.17, y: 1.02, d: 0.13, b: [
            [.02,14],[.17,20],[.36,10],[.54,18],[.74,15],[.91,9],
          ]},
        ]
      : [
          { s: 0.25, a: 0.05, y: 0.56, d: 0, b: [
            [.03,9],[.11,13],[.20,6],[.29,15],[.38,8],[.47,11],[.56,7],[.64,14],[.73,9],[.82,13],[.91,7],
          ]},
          { s: 0.42, a: 0.08, y: 0.66, d: 0.03, b: [
            [.02,10],[.13,15],[.25,7],[.37,12],[.50,16],[.62,9],[.74,14],[.86,11],
          ]},
          { s: 0.62, a: 0.12, y: 0.80, d: 0.07, b: [
            [.06,13],[.20,17],[.36,9],[.52,19],[.68,12],[.84,15],
          ]},
          { s: 1.0, a: 0.17, y: 1.02, d: 0.13, b: [
            [.04,15],[.20,19],[.40,10],[.58,17],[.77,13],[.93,8],
          ]},
        ];

    // Pre-compute building objects
    type Bld = {
      xF: number; floors: number;
      w: number; fh: number; dx: number; dy: number;
      a: number; yF: number; delay: number; cols: number;
    };

    const buildings: Bld[] = [];
    for (const L of layers) {
      const w = 130 * L.s;
      const fh = 26 * L.s;
      const dx = 38 * L.s;
      const dy = 17 * L.s;
      const cols = L.s >= 0.6 ? 3 : L.s >= 0.4 ? 2 : 0;

      for (const [xF, floors] of L.b) {
        buildings.push({
          xF, floors,
          w: w + (floors > 14 ? 18 * L.s : 0),
          fh, dx, dy,
          a: L.a,
          yF: L.y,
          delay: L.d + (xF as number) * 0.04,
          cols,
        });
      }
    }

    function draw(ts: number) {
      const r = parent!.getBoundingClientRect();
      const cw = r.width, ch = r.height;
      ctx!.clearRect(0, 0, cw, ch);

      smooth += (target - smooth) * 0.07;

      for (const b of buildings) {
        const prog = Math.max(0, Math.min(1, (smooth - b.delay) / (1 - b.delay)));
        if (prog <= 0) continue;

        const built = prog * (b.floors + 0.3);
        ctx!.save();
        ctx!.translate(cw * b.xF, ch * b.yF);

        for (let f = 0; f < b.floors; f++) {
          const fp = Math.max(0, Math.min(1, built - f));
          if (fp <= 0) continue;

          const bot = -f * b.fh;
          const tt = -(f + 1) * b.fh;
          const top = bot + (tt - bot) * ease(fp);
          const lw = Math.max(0.4, 2.2 * (b.fh / 26));

          // ── Columns (0→50%) ──
          const cP = Math.min(1, fp / 0.5);
          const cE = ease(cP);
          const cT = bot + (tt - bot) * cE;

          ctx!.strokeStyle = `rgba(${B},${b.a * cP})`;
          ctx!.lineWidth = lw;
          ctx!.beginPath(); ctx!.moveTo(0, bot); ctx!.lineTo(0, cT); ctx!.stroke();
          ctx!.beginPath(); ctx!.moveTo(b.w, bot); ctx!.lineTo(b.w, cT); ctx!.stroke();

          ctx!.lineWidth = lw * 0.6;
          ctx!.strokeStyle = `rgba(${B},${b.a * 0.5 * cP})`;
          ctx!.beginPath(); ctx!.moveTo(b.dx, bot - b.dy); ctx!.lineTo(b.dx, cT - b.dy); ctx!.stroke();
          ctx!.beginPath(); ctx!.moveTo(b.w + b.dx, bot - b.dy); ctx!.lineTo(b.w + b.dx, cT - b.dy); ctx!.stroke();

          if (b.cols > 0) {
            ctx!.lineWidth = lw * 0.4;
            ctx!.strokeStyle = `rgba(${B},${b.a * 0.3 * cP})`;
            for (let c = 1; c <= b.cols; c++) {
              const cx = (b.w / (b.cols + 1)) * c;
              ctx!.beginPath(); ctx!.moveTo(cx, bot); ctx!.lineTo(cx, cT); ctx!.stroke();
            }
          }

          // ── Beams (25→65%) ──
          if (fp > 0.25) {
            const bP = Math.min(1, (fp - 0.25) / 0.4);
            const bE = ease(bP);

            ctx!.strokeStyle = `rgba(${B},${b.a * 0.85 * bP})`;
            ctx!.lineWidth = lw * 0.8;
            ctx!.beginPath(); ctx!.moveTo(0, top); ctx!.lineTo(b.w * bE, top); ctx!.stroke();

            ctx!.lineWidth = lw * 0.45;
            ctx!.strokeStyle = `rgba(${B},${b.a * 0.4 * bP})`;
            ctx!.beginPath(); ctx!.moveTo(b.dx, top - b.dy); ctx!.lineTo(b.dx + b.w * bE, top - b.dy); ctx!.stroke();

            if (bP > 0.5) {
              const dP = (bP - 0.5) / 0.5;
              ctx!.lineWidth = lw * 0.45;
              ctx!.strokeStyle = `rgba(${B},${b.a * 0.3 * dP})`;
              ctx!.beginPath(); ctx!.moveTo(0, top); ctx!.lineTo(b.dx * dP, top - b.dy * dP); ctx!.stroke();
              ctx!.beginPath(); ctx!.moveTo(b.w, top); ctx!.lineTo(b.w + b.dx * dP, top - b.dy * dP); ctx!.stroke();
            }
          }

          // ── Floor plate (40→70%) ──
          if (fp > 0.4) {
            const pP = Math.min(1, (fp - 0.4) / 0.3);

            ctx!.fillStyle = `rgba(${B},${b.a * 0.22 * pP})`;
            ctx!.fillRect(0, top, b.w, b.fh * 0.85);

            ctx!.fillStyle = `rgba(${B},${b.a * 0.13 * pP})`;
            ctx!.beginPath();
            ctx!.moveTo(b.w, top); ctx!.lineTo(b.w + b.dx, top - b.dy);
            ctx!.lineTo(b.w + b.dx, top - b.dy + b.fh * 0.85);
            ctx!.lineTo(b.w, top + b.fh * 0.85);
            ctx!.closePath(); ctx!.fill();

            if (f === Math.floor(built) || f === b.floors - 1) {
              ctx!.fillStyle = `rgba(${B},${b.a * 0.15 * pP})`;
              ctx!.beginPath();
              ctx!.moveTo(0, top); ctx!.lineTo(b.w, top);
              ctx!.lineTo(b.w + b.dx, top - b.dy); ctx!.lineTo(b.dx, top - b.dy);
              ctx!.closePath(); ctx!.fill();
            }
          }
        }

        ctx!.restore();
      }

      animFrame = requestAnimationFrame(draw);
    }

    animFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
