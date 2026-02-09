"use client";

import { useRef, useCallback } from "react";

export default function HoverCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || !glowRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(200px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.35), transparent)`;
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative group/card hover:scale-[1.002] transition-transform duration-300 ease-out ${className}`}
    >
      {/* Mouse-following gradient border glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-[7px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
}
