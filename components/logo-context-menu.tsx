"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

type Position = { x: number; y: number };

function downloadFile(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function svgToPng(svgUrl: string, filename: string, bg: string) {
  const img = new window.Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const scale = 4;
    canvas.width = img.naturalWidth * scale;
    canvas.height = img.naturalHeight * scale;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    downloadFile(dataUrl, filename);
  };
  img.src = svgUrl;
}

export default function LogoContextMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    const x = Math.min(e.clientX, window.innerWidth - 260);
    const y = Math.min(e.clientY, window.innerHeight - 300);
    setPos({ x, y });
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, close]);

  return (
    <>
      <span onContextMenu={handleContextMenu} className="inline-flex">
        {children}
      </span>

      {open && (
        <div className="fixed inset-0 z-[100]" onClick={close}>
          <div
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
            className="fixed z-[101] w-[240px] rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            style={{ left: pos.x, top: pos.y }}
          >
            {/* Header */}
            <div className="px-3 pt-3 pb-2">
              <p className="text-[10px] font-medium text-tertiary tracking-wide uppercase">Download Logo</p>
            </div>

            {/* Black on White */}
            <div className="px-1.5">
              <p className="px-2 py-1.5 text-xs font-medium text-secondary">Black on white</p>
              <button
                onClick={() => { downloadFile("/datagrid-logo-black.svg", "datagrid-logo-black.svg"); close(); }}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-foreground hover:bg-surface transition-colors duration-100"
              >
                <div className="w-8 h-8 rounded-lg border border-border bg-white flex items-center justify-center overflow-hidden">
                  <Image src="/datagrid-logo-black.svg" alt="" width={24} height={6} className="w-6" />
                </div>
                <span className="flex-1 text-left text-sm">SVG</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
              <button
                onClick={() => { svgToPng("/datagrid-logo-black.svg", "datagrid-logo-black.png", "#ffffff"); close(); }}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-foreground hover:bg-surface transition-colors duration-100"
              >
                <div className="w-8 h-8 rounded-lg border border-border bg-white flex items-center justify-center overflow-hidden">
                  <Image src="/datagrid-logo-black.svg" alt="" width={24} height={6} className="w-6" />
                </div>
                <span className="flex-1 text-left text-sm">PNG</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </div>

            {/* White on Black */}
            <div className="px-1.5 mt-1">
              <p className="px-2 py-1.5 text-xs font-medium text-secondary">White on black</p>
              <button
                onClick={() => { downloadFile("/datagrid-logo-white.svg", "datagrid-logo-white.svg"); close(); }}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-foreground hover:bg-surface transition-colors duration-100"
              >
                <div className="w-8 h-8 rounded-lg border border-border bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                  <Image src="/datagrid-logo-white.svg" alt="" width={24} height={6} className="w-6" />
                </div>
                <span className="flex-1 text-left text-sm">SVG</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
              <button
                onClick={() => { svgToPng("/datagrid-logo-white.svg", "datagrid-logo-white.png", "#1a1a1a"); close(); }}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-foreground hover:bg-surface transition-colors duration-100"
              >
                <div className="w-8 h-8 rounded-lg border border-border bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                  <Image src="/datagrid-logo-white.svg" alt="" width={24} height={6} className="w-6" />
                </div>
                <span className="flex-1 text-left text-sm">PNG</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tertiary">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </div>

            {/* Divider + Brand Assets link */}
            <div className="mx-3 my-2 border-t border-border" />
            <div className="px-1.5 pb-2">
              <Link
                href="/brand-assets"
                onClick={close}
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-foreground hover:bg-surface transition-colors duration-100"
              >
                <div className="w-8 h-8 rounded-lg border border-border bg-surface flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span>Brand guidelines</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-tertiary">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
