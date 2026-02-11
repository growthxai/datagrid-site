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

    // Monochromatic beige — all faces same color, light blue strokes
    const STROKE = "#93C5FD";
    const STROKE_DIM = "#BFDBFE";
    const FACE = "#f5f1ed";
    const ease = (t: number) => t >= 1 ? 1 : 1 - Math.pow(1 - t, 3);

    // True isometric projection
    const IX = (x: number, y: number) => (x - y) * 0.866;
    const IY = (x: number, y: number, z: number) => (x + y) * 0.5 - z;

    // Seeded PRNG for deterministic layout
    let seed = variant === "agents" ? 42 : 137;
    function rand() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }

    type Bld = {
      gx: number; gy: number;
      w: number; d: number;
      floors: number; fh: number;
      alpha: number; delay: number;
      sortKey: number;
    };

    const buildings: Bld[] = [];
    const ROWS = 18;
    const COLS = 24;
    const SP = 44;
    const FH = 7;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (rand() < 0.1) continue;

        const gx = col * SP + (rand() - 0.5) * 8;
        const gy = row * SP + (rand() - 0.5) * 8;

        const isLandmark = rand() < 0.2;
        const w = isLandmark ? 32 + rand() * 24 : 16 + rand() * 20;
        const d = isLandmark ? 24 + rand() * 18 : 12 + rand() * 16;

        const centerDist = Math.abs(col - COLS / 2) / (COLS / 2);
        const rowFactor = 0.3 + (row / ROWS) * 0.7;
        const base = (5 + (1 - centerDist) * 18) * rowFactor;
        const landmarkBoost = isLandmark ? 8 + rand() * 6 : 0;
        const floors = Math.max(3, Math.min(32, Math.round(base + landmarkBoost + (rand() - 0.3) * 10)));

        buildings.push({
          gx, gy, w, d, floors, fh: FH,
          alpha: 1,
          delay: (1 - row / ROWS) * 0.12 + rand() * 0.04,
          sortKey: gx + gy,
        });
      }
    }

    // Back-to-front
    buildings.sort((a, b) => a.sortKey - b.sortKey);

    // Compute isometric bounding box at full build
    let sxMin = Infinity, sxMax = -Infinity, syMin = Infinity, syMax = -Infinity;
    for (const b of buildings) {
      const h = b.floors * b.fh;
      const pts: [number, number, number][] = [
        [b.gx, b.gy, 0], [b.gx + b.w, b.gy, 0],
        [b.gx, b.gy + b.d, 0], [b.gx + b.w, b.gy + b.d, 0],
        [b.gx, b.gy, h], [b.gx + b.w, b.gy, h],
        [b.gx, b.gy + b.d, h], [b.gx + b.w, b.gy + b.d, h],
      ];
      for (const [x, y, z] of pts) {
        const sx = IX(x, y), sy = IY(x, y, z);
        if (sx < sxMin) sxMin = sx;
        if (sx > sxMax) sxMax = sx;
        if (sy < syMin) syMin = sy;
        if (sy > syMax) syMax = sy;
      }
    }

    const citySW = sxMax - sxMin;
    const cityCX = (sxMin + sxMax) / 2;
    const groundMaxY = syMax; // lowest point on screen (front of ground plane)

    function draw() {
      const r = parent!.getBoundingClientRect();
      const cw = r.width, ch = r.height;
      ctx!.clearRect(0, 0, cw, ch);

      smooth += (target - smooth) * 0.07;

      // Scale so the city spans the full canvas width
      const scale = (cw * 1.4) / citySW;
      const lw = 1 / scale; // consistent line width

      ctx!.save();
      ctx!.translate(cw / 2, ch + ch * 0.55); // anchor well below bottom edge
      ctx!.scale(scale, scale);
      ctx!.translate(-cityCX, -groundMaxY); // ground plane below canvas bottom

      for (const b of buildings) {
        const prog = Math.max(0, Math.min(1, (smooth - b.delay) / (1 - b.delay)));
        if (prog <= 0) continue;

        const built = prog * (b.floors + 0.3);
        const x0 = b.gx, y0 = b.gy, x1 = b.gx + b.w, y1 = b.gy + b.d;

        // Current max height of the building
        const topFloor = Math.min(b.floors - 1, Math.floor(built));
        const topFp = Math.max(0, Math.min(1, built - topFloor));
        const maxZ = topFloor * b.fh + b.fh * ease(topFp);

        // ── 1. Solid silhouette fill (single hexagon covers entire building) ──
        ctx!.fillStyle = FACE;

        // Ground corners
        const gA = [IX(x0, y0), IY(x0, y0, 0)] as const;
        const gB = [IX(x1, y0), IY(x1, y0, 0)] as const;
        const gC = [IX(x1, y1), IY(x1, y1, 0)] as const;
        const gD = [IX(x0, y1), IY(x0, y1, 0)] as const;
        // Top corners at current height
        const tA = [IX(x0, y0), IY(x0, y0, maxZ)] as const;
        const tB = [IX(x1, y0), IY(x1, y0, maxZ)] as const;
        const tC = [IX(x1, y1), IY(x1, y1, maxZ)] as const;
        const tD = [IX(x0, y1), IY(x0, y1, maxZ)] as const;

        // One hexagon covering the full isometric projection of the box:
        // tA (top-front) → tB (top-right) → gB (ground-right) → gC (ground-back) → gD (ground-left) → tD (top-left)
        ctx!.beginPath();
        ctx!.moveTo(tA[0], tA[1]);
        ctx!.lineTo(tB[0], tB[1]);
        ctx!.lineTo(gB[0], gB[1]);
        ctx!.lineTo(gC[0], gC[1]);
        ctx!.lineTo(gD[0], gD[1]);
        ctx!.lineTo(tD[0], tD[1]);
        ctx!.closePath();
        ctx!.fill();

        // ── 2. Per-floor strokes ──
        for (let f = 0; f < b.floors; f++) {
          const fp = Math.max(0, Math.min(1, built - f));
          if (fp <= 0) continue;

          const z0 = f * b.fh;
          const z1 = z0 + (b.fh * ease(fp));
          const cP = Math.min(1, fp / 0.5);

          const Ax = IX(x0, y0), Ay = IY(x0, y0, z0);
          const Bx = IX(x1, y0), By = IY(x1, y0, z0);
          const Cx = IX(x1, y1), Cy = IY(x1, y1, z0);
          const Dx = IX(x0, y1), Dy = IY(x0, y1, z0);
          const Ex = IX(x0, y0), Ey = IY(x0, y0, z1);
          const Fx = IX(x1, y0), Fy = IY(x1, y0, z1);
          const Gx = IX(x1, y1), Gy = IY(x1, y1, z1);
          const Hx = IX(x0, y1), Hy = IY(x0, y1, z1);

          // Columns
          ctx!.strokeStyle = STROKE;
          ctx!.lineWidth = lw * 1.2;
          ctx!.beginPath();
          ctx!.moveTo(Ax, Ay); ctx!.lineTo(Ex, Ey);
          ctx!.moveTo(Bx, By); ctx!.lineTo(Fx, Fy);
          ctx!.moveTo(Dx, Dy); ctx!.lineTo(Hx, Hy);
          ctx!.stroke();
          ctx!.strokeStyle = STROKE_DIM;
          ctx!.beginPath();
          ctx!.moveTo(Cx, Cy); ctx!.lineTo(Gx, Gy);
          ctx!.stroke();

          // Bottom edges
          if (f === 0) {
            ctx!.strokeStyle = STROKE;
            ctx!.lineWidth = lw * 0.9;
            ctx!.beginPath();
            ctx!.moveTo(Ax, Ay); ctx!.lineTo(Bx, By);
            ctx!.moveTo(Ax, Ay); ctx!.lineTo(Dx, Dy);
            ctx!.stroke();
            ctx!.strokeStyle = STROKE_DIM;
            ctx!.beginPath();
            ctx!.moveTo(Bx, By); ctx!.lineTo(Cx, Cy);
            ctx!.moveTo(Dx, Dy); ctx!.lineTo(Cx, Cy);
            ctx!.stroke();
          }

          // Beams
          if (fp > 0.25) {
            ctx!.strokeStyle = STROKE;
            ctx!.lineWidth = lw * 0.9;
            ctx!.beginPath();
            ctx!.moveTo(Ex, Ey); ctx!.lineTo(Fx, Fy);
            ctx!.moveTo(Ex, Ey); ctx!.lineTo(Hx, Hy);
            ctx!.moveTo(Fx, Fy); ctx!.lineTo(Gx, Gy);
            ctx!.stroke();
            ctx!.strokeStyle = STROKE_DIM;
            ctx!.beginPath();
            ctx!.moveTo(Hx, Hy); ctx!.lineTo(Gx, Gy);
            ctx!.stroke();
          }
        }

        // ── 3. Roof cap LAST (covers column strokes) ──
        const done = built >= b.floors;
        if (done) {
          ctx!.fillStyle = FACE;
          ctx!.beginPath();
          ctx!.moveTo(tA[0], tA[1]); ctx!.lineTo(tB[0], tB[1]);
          ctx!.lineTo(tC[0], tC[1]); ctx!.lineTo(tD[0], tD[1]);
          ctx!.closePath(); ctx!.fill();

          // Roof edge strokes on top
          ctx!.strokeStyle = STROKE;
          ctx!.lineWidth = lw * 0.9;
          ctx!.beginPath();
          ctx!.moveTo(tA[0], tA[1]); ctx!.lineTo(tB[0], tB[1]);
          ctx!.moveTo(tA[0], tA[1]); ctx!.lineTo(tD[0], tD[1]);
          ctx!.stroke();
          ctx!.strokeStyle = STROKE_DIM;
          ctx!.beginPath();
          ctx!.moveTo(tB[0], tB[1]); ctx!.lineTo(tC[0], tC[1]);
          ctx!.moveTo(tD[0], tD[1]); ctx!.lineTo(tC[0], tC[1]);
          ctx!.stroke();
        }
      }

      ctx!.restore();
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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
    />
  );
}
