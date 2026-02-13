"use client";

import { useEffect, useRef } from "react";
import { BreadcrumbSegments } from "@/components/page-header";

export default function StickyBreadcrumb({ breadcrumb }: { breadcrumb: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const progress = Math.min(1, Math.max(0, (y - 40) / 80));

      if (barRef.current) {
        barRef.current.style.opacity = String(progress);
        barRef.current.style.pointerEvents = progress < 0.5 ? "none" : "auto";
        barRef.current.style.boxShadow = progress > 0.5
          ? `0 1px 8px rgba(0,0,0,${(0.08).toFixed(3)}),0 4px 24px rgba(0,0,0,${(0.04).toFixed(3)})`
          : "none";
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-[88px] left-0 right-0 z-30 h-11 flex items-center bg-[#f5f1ed]/80 backdrop-blur-md border-t border-b border-[#e0d8cf]/60"
      style={{ opacity: 0 }}
    >
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <BreadcrumbSegments breadcrumb={breadcrumb} />
      </div>
    </div>
  );
}
