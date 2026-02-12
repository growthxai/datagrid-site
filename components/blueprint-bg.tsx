"use client";

import { useEffect, useRef } from "react";

type Props = {
  variant: "agents" | "connectors" | "blog" | "guides" | "network";
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

    // Isometric face shading — solid 3D blocks
    const STROKE = "#93C5FD";     // kept for network dashed edges
    const STROKE_DIM = "#BFDBFE"; // kept for network dashed edges
    const FACE = "#f5f1ed";
    const FACE_TOP = "#ede7df";             // lightest (top/ceiling)
    const FACE_LEFT = "#bfb3a3";            // medium (left-facing walls: x0, y1)
    const FACE_RIGHT = "#afa294";           // darkest (right-facing walls: y0, x1)
    const FLOOR_RIGHT = "#a3967f";  // slightly darker than FACE_RIGHT for subtle groove
    const FLOOR_LEFT  = "#b0a48e";  // slightly darker than FACE_LEFT
    const ease = (t: number) => t >= 1 ? 1 : 1 - Math.pow(1 - t, 3);

    // True isometric projection — rotated 180° (view from opposite corner)
    const IX = (x: number, y: number) => (y - x) * 0.866;
    const IY = (x: number, y: number, z: number) => (x + y) * 0.5 - z;

    // Seeded PRNG for deterministic layout
    const SEEDS: Record<string, number> = { agents: 42, connectors: 137, blog: 271, guides: 389, network: 503 };
    let seed = SEEDS[variant] ?? 42;
    function rand() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }

    // ── Network variant: buildings with communication lines ──
    if (variant === "network") {
      const NIX = (x: number, y: number) => (y - x) * 0.866;
      const NIY = (x: number, y: number, z: number) => (x + y) * 0.5 - z;
      const N_FH = 8;
      const N_WIN = "rgba(0,0,0,0.12)";

      type Node = { gx: number; gy: number; w: number; d: number; floors: number; hasSetback: boolean; setbackFloor: number; setbackInset: number };
      type Edge = { from: number; to: number };
      type Pulse = { edge: number; t: number; speed: number; forward: boolean };

      const nodes: Node[] = [];
      const positions = [
        [0, 0], [2.5, 0.8], [5, 0.3], [7.5, 1], [10, 0.2], [12.5, 0.7], [15, 0.4],
        [0.8, 2.5], [3.2, 2], [5.8, 2.8], [8.2, 2.2], [10.8, 2.6], [13.5, 2.3],
        [0.3, 4.5], [2.8, 4.8], [5.3, 4.2], [7.8, 5], [10.3, 4.5], [12.8, 4.8], [15.2, 4.3],
        [1.2, 6.8], [3.8, 6.3], [6.3, 7], [8.8, 6.5], [11.3, 6.8], [14, 6.2],
        [0.5, 8.8], [3, 9.2], [5.5, 8.5], [8, 9], [10.5, 8.5], [13, 9],
        [2, 10.8], [4.5, 11], [7, 10.5], [9.5, 11.2], [12, 10.8],
      ];

      for (const [bx, by] of positions) {
        if (rand() < 0.15) continue;
        const jx = bx * 55 + (rand() - 0.5) * 18;
        const jy = by * 55 + (rand() - 0.5) * 18;
        const w = 24 + rand() * 20;
        const d = 20 + rand() * 16;
        const isTower = rand() < 0.2;
        const floors = isTower ? 10 + Math.round(rand() * 12) : 2 + Math.round(rand() * 6);
        const hasSetback = rand() < 0.25 && floors > 8;
        nodes.push({
          gx: jx, gy: jy, w, d, floors,
          hasSetback,
          setbackFloor: hasSetback ? Math.floor(floors * 0.5) : floors,
          setbackInset: hasSetback ? 4 + rand() * 4 : 0,
        });
      }

      // Edges between nearby nodes
      const edges: Edge[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].gx - nodes[j].gx;
          const dy = nodes[i].gy - nodes[j].gy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220 && rand() < 0.45) edges.push({ from: i, to: j });
        }
      }

      const pulses: Pulse[] = [];
      for (let i = 0; i < Math.floor(edges.length * 0.6); i++) {
        pulses.push({
          edge: Math.floor(rand() * edges.length),
          t: rand(),
          speed: 0.0008 + rand() * 0.0015,
          forward: rand() > 0.5,
        });
      }

      // Bounding box
      let sxMin = Infinity, sxMax = -Infinity, syMin = Infinity, syMax = -Infinity;
      for (const n of nodes) {
        const h = n.floors * N_FH;
        for (const [x, y, z] of [
          [n.gx, n.gy, 0], [n.gx + n.w, n.gy, 0],
          [n.gx, n.gy + n.d, 0], [n.gx + n.w, n.gy + n.d, 0],
          [n.gx, n.gy, h], [n.gx + n.w, n.gy, h],
        ] as [number, number, number][]) {
          const sx = NIX(x, y), sy = NIY(x, y, z);
          sxMin = Math.min(sxMin, sx); sxMax = Math.max(sxMax, sx);
          syMin = Math.min(syMin, sy); syMax = Math.max(syMax, sy);
        }
      }
      const citySW = sxMax - sxMin;
      const cityCX = (sxMin + sxMax) / 2;
      const cityCY = (syMin + syMax) / 2;

      function drawNetBlock(x0: number, y0: number, w: number, d: number, z0: number, z1: number) {
        const x1 = x0 + w, y1 = y0 + d;
        const gA: [number, number] = [NIX(x0, y0), NIY(x0, y0, z0)];
        const gB: [number, number] = [NIX(x1, y0), NIY(x1, y0, z0)];
        const gC: [number, number] = [NIX(x1, y1), NIY(x1, y1, z0)];
        const gD: [number, number] = [NIX(x0, y1), NIY(x0, y1, z0)];
        const tA: [number, number] = [NIX(x0, y0), NIY(x0, y0, z1)];
        const tB: [number, number] = [NIX(x1, y0), NIY(x1, y0, z1)];
        const tC: [number, number] = [NIX(x1, y1), NIY(x1, y1, z1)];
        const tD: [number, number] = [NIX(x0, y1), NIY(x0, y1, z1)];

        // Silhouette
        ctx!.fillStyle = FACE;
        ctx!.beginPath();
        ctx!.moveTo(tA[0], tA[1]); ctx!.lineTo(tD[0], tD[1]);
        ctx!.lineTo(gD[0], gD[1]); ctx!.lineTo(gC[0], gC[1]);
        ctx!.lineTo(gB[0], gB[1]); ctx!.lineTo(tB[0], tB[1]);
        ctx!.closePath(); ctx!.fill();

        // Front-right wall (y1)
        ctx!.fillStyle = FACE_LEFT;
        ctx!.beginPath();
        ctx!.moveTo(gD[0], gD[1]); ctx!.lineTo(gC[0], gC[1]);
        ctx!.lineTo(tC[0], tC[1]); ctx!.lineTo(tD[0], tD[1]);
        ctx!.closePath(); ctx!.fill();

        // Window bands on y1 face
        ctx!.fillStyle = N_WIN;
        const nInX = w * 0.06;
        for (let fz = z0; fz < z1; fz += N_FH) {
          const wb = fz + N_FH * 0.28, wt = Math.min(fz + N_FH * 0.75, z1);
          if (wb >= z1) break;
          ctx!.beginPath();
          ctx!.moveTo(NIX(x0 + nInX, y1), NIY(x0 + nInX, y1, wb));
          ctx!.lineTo(NIX(x1 - nInX, y1), NIY(x1 - nInX, y1, wb));
          ctx!.lineTo(NIX(x1 - nInX, y1), NIY(x1 - nInX, y1, wt));
          ctx!.lineTo(NIX(x0 + nInX, y1), NIY(x0 + nInX, y1, wt));
          ctx!.closePath(); ctx!.fill();
        }

        // Front-left wall (x1)
        ctx!.fillStyle = FACE_RIGHT;
        ctx!.beginPath();
        ctx!.moveTo(gB[0], gB[1]); ctx!.lineTo(gC[0], gC[1]);
        ctx!.lineTo(tC[0], tC[1]); ctx!.lineTo(tB[0], tB[1]);
        ctx!.closePath(); ctx!.fill();

        // Window bands on x1 face
        ctx!.fillStyle = N_WIN;
        const nInY = d * 0.06;
        for (let fz = z0; fz < z1; fz += N_FH) {
          const wb = fz + N_FH * 0.28, wt = Math.min(fz + N_FH * 0.75, z1);
          if (wb >= z1) break;
          ctx!.beginPath();
          ctx!.moveTo(NIX(x1, y0 + nInY), NIY(x1, y0 + nInY, wb));
          ctx!.lineTo(NIX(x1, y1 - nInY), NIY(x1, y1 - nInY, wb));
          ctx!.lineTo(NIX(x1, y1 - nInY), NIY(x1, y1 - nInY, wt));
          ctx!.lineTo(NIX(x1, y0 + nInY), NIY(x1, y0 + nInY, wt));
          ctx!.closePath(); ctx!.fill();
        }

        // Top face
        ctx!.fillStyle = FACE_TOP;
        ctx!.beginPath();
        ctx!.moveTo(tA[0], tA[1]); ctx!.lineTo(tB[0], tB[1]);
        ctx!.lineTo(tC[0], tC[1]); ctx!.lineTo(tD[0], tD[1]);
        ctx!.closePath(); ctx!.fill();
      }

      function nodeCenterWorld(n: Node): [number, number] {
        return [n.gx + n.w / 2, n.gy + n.d / 2];
      }

      type EdgePath = { pts: [number, number][]; totalLen: number; segLens: number[] };
      const edgePaths: EdgePath[] = edges.map((e) => {
        const a = nodes[e.from], b = nodes[e.to];
        const [ax, ay] = nodeCenterWorld(a);
        const [bx, by] = nodeCenterWorld(b);
        const z = Math.max(a.floors, b.floors) * N_FH + 5;
        const p0: [number, number] = [NIX(ax, ay), NIY(ax, ay, z)];
        const p1: [number, number] = [NIX(bx, ay), NIY(bx, ay, z)];
        const p2: [number, number] = [NIX(bx, by), NIY(bx, by, z)];
        const seg0 = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
        const seg1 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
        return { pts: [p0, p1, p2], totalLen: seg0 + seg1, segLens: [seg0, seg1] };
      });

      function interpPath(path: EdgePath, t: number): [number, number] {
        const d = t * path.totalLen;
        if (d <= path.segLens[0]) {
          const f = path.segLens[0] > 0 ? d / path.segLens[0] : 0;
          return [
            path.pts[0][0] + (path.pts[1][0] - path.pts[0][0]) * f,
            path.pts[0][1] + (path.pts[1][1] - path.pts[0][1]) * f,
          ];
        } else {
          const rem = d - path.segLens[0];
          const f = path.segLens[1] > 0 ? rem / path.segLens[1] : 0;
          return [
            path.pts[1][0] + (path.pts[2][0] - path.pts[1][0]) * f,
            path.pts[1][1] + (path.pts[2][1] - path.pts[1][1]) * f,
          ];
        }
      }

      function drawNetwork() {
        const r = parent!.getBoundingClientRect();
        const cw = r.width, ch = r.height;
        ctx!.clearRect(0, 0, cw, ch);

        const citySH = syMax - syMin;
        const scale = Math.max(cw / citySW, ch / citySH) * 1.05;
        const lw = 1 / scale;

        ctx!.save();
        ctx!.translate(cw / 2, ch / 2);
        ctx!.scale(scale, scale);
        ctx!.translate(-cityCX, -cityCY);

        // Draw edges — thicker and more visible dashed lines
        ctx!.lineWidth = lw * 2;
        ctx!.strokeStyle = "#b8a898";
        ctx!.setLineDash([lw * 6, lw * 4]);
        for (const path of edgePaths) {
          ctx!.beginPath();
          ctx!.moveTo(path.pts[0][0], path.pts[0][1]);
          ctx!.lineTo(path.pts[1][0], path.pts[1][1]);
          ctx!.lineTo(path.pts[2][0], path.pts[2][1]);
          ctx!.stroke();
        }
        ctx!.setLineDash([]);

        // Draw buildings (back-to-front)
        const sorted = [...nodes].sort((a, b) => (a.gx + a.gy) - (b.gx + b.gy));
        for (const n of sorted) {
          const h = n.floors * N_FH;
          if (n.hasSetback) {
            const baseH = n.setbackFloor * N_FH;
            drawNetBlock(n.gx, n.gy, n.w, n.d, 0, baseH);
            const ins = n.setbackInset;
            drawNetBlock(n.gx + ins, n.gy + ins, n.w - ins * 2, n.d - ins * 2, baseH, h);
          } else {
            drawNetBlock(n.gx, n.gy, n.w, n.d, 0, h);
          }
        }

        // Pulses
        const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        for (const p of pulses) {
          p.t += p.speed;
          if (p.t > 1) { p.t -= 1; p.forward = !p.forward; }
          const path = edgePaths[p.edge];
          const eased = easeInOut(p.t);
          const t = p.forward ? eased : 1 - eased;
          const [px, py] = interpPath(path, t);
          const glow = 0.4 + 0.6 * Math.sin(p.t * Math.PI);

          ctx!.beginPath();
          ctx!.arc(px, py, lw * 4, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(59, 130, 246, ${glow * 0.7})`;
          ctx!.fill();

          ctx!.beginPath();
          ctx!.arc(px, py, lw * 2, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(59, 130, 246, ${glow})`;
          ctx!.fill();
        }

        ctx!.restore();
        animFrame = requestAnimationFrame(drawNetwork);
      }

      animFrame = requestAnimationFrame(drawNetwork);

      return () => {
        cancelAnimationFrame(animFrame);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll);
      };
    }

    // ── Cityscape variant ──
    type Bld = {
      gx: number; gy: number;
      w: number; d: number;
      floors: number; fh: number;
      hasSetback: boolean;
      setbackFloor: number;
      setbackInset: number;
      delay: number;
      sortKey: number;
    };

    const buildings: Bld[] = [];
    const FH = 8;
    const WIN_DARK = "rgba(0,0,0,0.12)"; // window band overlay

    // City blocks on a grid — oversized so edges bleed past the section
    const GROW = 12;
    const GCOL = 16;
    const BLOCK_W = 52;
    const BLOCK_D = 44;
    const STREET = 20;

    for (let r = 0; r < GROW; r++) {
      for (let c = 0; c < GCOL; c++) {
        // Skip ~45% of lots for sparse feel
        if (rand() < 0.45) continue;

        const bx = c * (BLOCK_W + STREET);
        const by = r * (BLOCK_D + STREET);
        const margin = 3 + rand() * 3;

        const w = BLOCK_W - margin * 2;
        const d = BLOCK_D - margin * 2;

        // Wide height variety — some short, some very tall
        const isTower = rand() < 0.15;
        const isShort = rand() < 0.3;
        const baseFloors = isTower
          ? 16 + Math.round(rand() * 14)    // 16–30 floors
          : isShort
            ? 2 + Math.round(rand() * 3)    // 2–5 floors
            : 4 + Math.round(rand() * 10);  // 4–14 floors
        const floors = Math.min(30, baseFloors);

        const hasSetback = rand() < 0.3 && floors > 10;
        const setbackFloor = hasSetback ? Math.floor(floors * (0.4 + rand() * 0.15)) : floors;
        const setbackInset = hasSetback ? 5 + rand() * 5 : 0;

        // Taller buildings grow faster (more dramatic), short ones pop up quick
        const speedFactor = isTower ? 0.6 : isShort ? 1.0 : 0.8;
        const diagNorm = (r + c) / (GROW + GCOL);

        buildings.push({
          gx: bx + margin, gy: by + margin,
          w, d, floors, fh: FH,
          hasSetback, setbackFloor, setbackInset,
          delay: diagNorm * 0.08 * speedFactor + rand() * 0.03,
          sortKey: bx + by,
        });
      }
    }

    // Painter's algorithm: ascending sortKey (low = far from camera, draw first)
    buildings.sort((a, b) => a.sortKey - b.sortKey);

    // Bounding box
    let sxMin = Infinity, sxMax = -Infinity, syMin = Infinity, syMax = -Infinity;
    for (const b of buildings) {
      const h = b.floors * b.fh;
      for (const [x, y, z] of [
        [b.gx, b.gy, 0], [b.gx + b.w, b.gy, 0],
        [b.gx, b.gy + b.d, 0], [b.gx + b.w, b.gy + b.d, 0],
        [b.gx, b.gy, h], [b.gx + b.w, b.gy, h],
        [b.gx, b.gy + b.d, h], [b.gx + b.w, b.gy + b.d, h],
      ] as [number, number, number][]) {
        const sx = IX(x, y), sy = IY(x, y, z);
        sxMin = Math.min(sxMin, sx); sxMax = Math.max(sxMax, sx);
        syMin = Math.min(syMin, sy); syMax = Math.max(syMax, sy);
      }
    }

    const citySW = sxMax - sxMin;
    const cityCX = (sxMin + sxMax) / 2;
    const cityCY = (syMin + syMax) / 2;

    // Draw a single isometric box with window bands
    function drawBlock(x0: number, y0: number, w: number, d: number, z0: number, z1: number) {
      const x1 = x0 + w, y1 = y0 + d;

      // Projected ground & top corners
      const gA: [number, number] = [IX(x0, y0), IY(x0, y0, z0)];
      const gB: [number, number] = [IX(x1, y0), IY(x1, y0, z0)];
      const gC: [number, number] = [IX(x1, y1), IY(x1, y1, z0)];
      const gD: [number, number] = [IX(x0, y1), IY(x0, y1, z0)];
      const tA: [number, number] = [IX(x0, y0), IY(x0, y0, z1)];
      const tB: [number, number] = [IX(x1, y0), IY(x1, y0, z1)];
      const tC: [number, number] = [IX(x1, y1), IY(x1, y1, z1)];
      const tD: [number, number] = [IX(x0, y1), IY(x0, y1, z1)];

      // 1. Solid silhouette (hexagon) — matches bg for occlusion
      ctx!.fillStyle = FACE;
      ctx!.beginPath();
      ctx!.moveTo(tA[0], tA[1]); ctx!.lineTo(tD[0], tD[1]);
      ctx!.lineTo(gD[0], gD[1]); ctx!.lineTo(gC[0], gC[1]);
      ctx!.lineTo(gB[0], gB[1]); ctx!.lineTo(tB[0], tB[1]);
      ctx!.closePath(); ctx!.fill();

      // 2. Front-right wall (y1 face) — medium shade + window bands
      ctx!.fillStyle = FACE_LEFT;
      ctx!.beginPath();
      ctx!.moveTo(gD[0], gD[1]); ctx!.lineTo(gC[0], gC[1]);
      ctx!.lineTo(tC[0], tC[1]); ctx!.lineTo(tD[0], tD[1]);
      ctx!.closePath(); ctx!.fill();

      // Window bands on y1 face (one band per floor)
      ctx!.fillStyle = WIN_DARK;
      const inX = w * 0.06;
      for (let fz = z0; fz < z1; fz += FH) {
        const wb = fz + FH * 0.28;
        const wt = Math.min(fz + FH * 0.75, z1);
        if (wb >= z1) break;
        ctx!.beginPath();
        ctx!.moveTo(IX(x0 + inX, y1), IY(x0 + inX, y1, wb));
        ctx!.lineTo(IX(x1 - inX, y1), IY(x1 - inX, y1, wb));
        ctx!.lineTo(IX(x1 - inX, y1), IY(x1 - inX, y1, wt));
        ctx!.lineTo(IX(x0 + inX, y1), IY(x0 + inX, y1, wt));
        ctx!.closePath(); ctx!.fill();
      }

      // 3. Front-left wall (x1 face) — darkest shade + window bands
      ctx!.fillStyle = FACE_RIGHT;
      ctx!.beginPath();
      ctx!.moveTo(gB[0], gB[1]); ctx!.lineTo(gC[0], gC[1]);
      ctx!.lineTo(tC[0], tC[1]); ctx!.lineTo(tB[0], tB[1]);
      ctx!.closePath(); ctx!.fill();

      // Window bands on x1 face (one band per floor)
      ctx!.fillStyle = WIN_DARK;
      const inY = d * 0.06;
      for (let fz = z0; fz < z1; fz += FH) {
        const wb = fz + FH * 0.28;
        const wt = Math.min(fz + FH * 0.75, z1);
        if (wb >= z1) break;
        ctx!.beginPath();
        ctx!.moveTo(IX(x1, y0 + inY), IY(x1, y0 + inY, wb));
        ctx!.lineTo(IX(x1, y1 - inY), IY(x1, y1 - inY, wb));
        ctx!.lineTo(IX(x1, y1 - inY), IY(x1, y1 - inY, wt));
        ctx!.lineTo(IX(x1, y0 + inY), IY(x1, y0 + inY, wt));
        ctx!.closePath(); ctx!.fill();
      }

      // 4. Top face — lightest
      ctx!.fillStyle = FACE_TOP;
      ctx!.beginPath();
      ctx!.moveTo(tA[0], tA[1]); ctx!.lineTo(tB[0], tB[1]);
      ctx!.lineTo(tC[0], tC[1]); ctx!.lineTo(tD[0], tD[1]);
      ctx!.closePath(); ctx!.fill();

      // 5. Edge highlights on front ridge
      ctx!.strokeStyle = "rgba(255,255,255,0.25)";
      ctx!.lineWidth = 0.5;
      // Top edge of front-right wall
      ctx!.beginPath();
      ctx!.moveTo(tD[0], tD[1]); ctx!.lineTo(tC[0], tC[1]);
      ctx!.stroke();
      // Top edge of front-left wall
      ctx!.beginPath();
      ctx!.moveTo(tB[0], tB[1]); ctx!.lineTo(tC[0], tC[1]);
      ctx!.stroke();
      // Front vertical ridge
      ctx!.beginPath();
      ctx!.moveTo(gC[0], gC[1]); ctx!.lineTo(tC[0], tC[1]);
      ctx!.stroke();
    }

    function draw() {
      const r = parent!.getBoundingClientRect();
      const cw = r.width, ch = r.height;
      ctx!.clearRect(0, 0, cw, ch);

      smooth += (target - smooth) * 0.07;

      const scale = (cw * 1.05) / citySW;

      ctx!.save();
      ctx!.translate(cw / 2, ch / 2);
      ctx!.scale(scale, scale);
      ctx!.translate(-cityCX, -cityCY);

      for (const b of buildings) {
        const prog = Math.max(0, Math.min(1, (smooth - b.delay) / (1 - b.delay)));
        if (prog <= 0) continue;

        const built = prog * (b.floors + 0.3);
        const topFloor = Math.min(b.floors - 1, Math.floor(built));
        const topFrac = Math.min(1, built - topFloor);
        const maxZ = topFloor * b.fh + b.fh * ease(topFrac);

        if (b.hasSetback) {
          const baseH = b.setbackFloor * b.fh;
          const baseZ = Math.min(maxZ, baseH);
          drawBlock(b.gx, b.gy, b.w, b.d, 0, baseZ);
          if (maxZ > baseH) {
            const ins = b.setbackInset;
            drawBlock(b.gx + ins, b.gy + ins, b.w - ins * 2, b.d - ins * 2, baseH, maxZ);
          }
        } else {
          drawBlock(b.gx, b.gy, b.w, b.d, 0, maxZ);
        }
      }

      ctx!.restore();

      // Keep looping only while animating
      if (Math.abs(smooth - target) > 0.001) {
        animFrame = requestAnimationFrame(draw);
      }
    }

    // Restart draw loop on scroll
    window.addEventListener("scroll", () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(draw);
    }, { passive: true });

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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.19]"
    />
  );
}
