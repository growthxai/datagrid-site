"use client";

import { useEffect, useRef } from "react";
import BlueprintBg from "@/components/blueprint-bg";

type Props = {
  breadcrumb: string;
  title: string;
  description: string;
  variant: "agents" | "connectors" | "guides";
};

export default function PageHeader({ breadcrumb, title, description, variant }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let toolbar: Element | null = null;

    function onScroll() {
      const y = window.scrollY;
      const progress = Math.min(1, Math.max(0, (y - 40) / 80));

      if (contentRef.current) {
        contentRef.current.style.opacity = String(1 - progress);
        contentRef.current.style.transform = `translateY(${-progress * 8}px)`;
      }

      if (barRef.current) {
        if (!toolbar) {
          toolbar = document.querySelector("[data-sticky-toolbar]");
        }

        let pushY = 0;
        if (toolbar) {
          const rect = toolbar.getBoundingClientRect();
          pushY = Math.min(44, Math.max(0, 132 - rect.top));
          toolbar.classList.toggle("stuck", rect.top <= 89);
        }

        const shadowFade = pushY > 0 ? Math.max(0, 1 - pushY / 22) : 1;
        barRef.current.style.opacity = String(progress);
        barRef.current.style.pointerEvents = progress < 0.5 ? "none" : "auto";
        barRef.current.style.transform = `translateY(${-pushY}px)`;
        barRef.current.style.boxShadow = progress > 0.5
          ? `0 1px 8px rgba(0,0,0,${(0.08 * shadowFade).toFixed(3)}),0 4px 24px rgba(0,0,0,${(0.04 * shadowFade).toFixed(3)})`
          : "none";
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Full hero */}
      <section className="relative py-16 sm:py-20 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant={variant} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-[#a29080] mb-4">{breadcrumb}</p>
          <div ref={contentRef}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
              {title}
            </h1>
            <p className="mt-1 text-lg text-secondary max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Compact sticky bar */}
      <div
        ref={barRef}
        className="fixed top-[88px] left-0 right-0 z-30 h-11 flex items-center bg-[#f5f1ed]/80 backdrop-blur-md border-t border-b border-[#e0d8cf]/60"
        style={{ opacity: 0 }}
      >
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <span className="text-sm font-medium text-[#a29080]">{breadcrumb}</span>
        </div>
      </div>
    </>
  );
}
