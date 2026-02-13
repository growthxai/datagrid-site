"use client";

import { useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import BlueprintBg from "@/components/blueprint-bg";

export type BreadcrumbItem = { label: string; href?: string };
export type BreadcrumbProp = string | BreadcrumbItem[];

type Props = {
  breadcrumb: BreadcrumbProp;
  title: string;
  description: string;
  variant: "agents" | "connectors" | "guides" | "network" | "blog";
  headerRight?: React.ReactNode;
  headerBottom?: React.ReactNode;
  heroBg?: "tan" | "white";
  eyebrow?: string;
  centered?: boolean;
};

export const SEGMENT_ROUTES: Record<string, string> = {
  Home: "/",
  Product: "/product",
  Agents: "/agents",
  Connectors: "/connectors",
  Resources: "/resources",
  Guides: "/guides",
  Blog: "/blog",
};

function resolveParts(breadcrumb: BreadcrumbProp): BreadcrumbItem[] {
  if (Array.isArray(breadcrumb)) return breadcrumb;
  return breadcrumb.split("/").map((s) => s.trim()).filter(Boolean).map((label) => ({
    label,
    href: SEGMENT_ROUTES[label],
  }));
}

export function breadcrumbLabel(breadcrumb: BreadcrumbProp): string {
  const parts = resolveParts(breadcrumb);
  return parts[parts.length - 1]?.label || "";
}

export function BreadcrumbSegments({ breadcrumb }: { breadcrumb: BreadcrumbProp }) {
  const parts = resolveParts(breadcrumb);

  return (
    <nav className="flex items-center gap-1.5 text-sm font-medium">
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1;
        return (
          <span key={i} className="inline-flex items-center gap-1.5">
            {i > 0 && (
              <svg width="7" height="10" viewBox="0 0 7 10" fill="none" className="text-[#c4b8aa]">
                <path d="M1.5 1L5.5 5L1.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {part.href && !isLast ? (
              <Link href={part.href} className="text-[#a29080] hover:text-accent transition-colors duration-150">
                {part.label}
              </Link>
            ) : (
              <span className={isLast ? "text-[#4b4036]" : "text-[#a29080]"}>{part.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default function PageHeader({ breadcrumb, title, description, variant, headerRight, headerBottom, heroBg = "tan", eyebrow: eyebrowProp, centered }: Props) {
  const eyebrow = eyebrowProp || breadcrumbLabel(breadcrumb);
  const isWhite = heroBg === "white";
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
      <section className={`relative py-16 sm:py-20 overflow-hidden ${isWhite ? "bg-background" : "bg-[#f5f1ed]"}`}>
        {!isWhite && (
          <div className="absolute inset-0">
            <BlueprintBg variant={variant} />
          </div>
        )}
        <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${centered ? "text-center" : ""}`}>
          <p className="text-xs font-medium text-[#4b4036] mb-4">{eyebrow}</p>
          <div ref={contentRef} className={headerRight ? "flex items-start justify-between gap-8" : ""}>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
                {title}
              </h1>
              <p className={`mt-1 text-lg text-secondary max-w-2xl ${centered ? "mx-auto" : ""}`}>
                {description}
              </p>
            </div>
            {headerRight}
          </div>
          {headerBottom}
        </div>
      </section>

      {/* Compact sticky bar */}
      <div
        ref={barRef}
        className="fixed top-[88px] left-0 right-0 z-30 h-11 flex items-center bg-[#f5f1ed]/80 backdrop-blur-md border-t border-b border-[#e0d8cf]/60"
        style={{ opacity: 0 }}
      >
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <BreadcrumbSegments breadcrumb={breadcrumb} />
        </div>
      </div>
    </>
  );
}
