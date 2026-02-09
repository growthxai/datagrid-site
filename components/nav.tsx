"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

const PRODUCT_LINKS = [
  { href: "/agents", label: "Agents" },
  { href: "/connectors", label: "Connectors" },
];

const RESOURCE_LINKS = [
  {
    href: "/blog",
    label: "Blog",
    description: "Explore the latest in agentic AI, from product updates and industry insights",
  },
  {
    href: "/careers",
    label: "Careers",
    description: "Join our team and help shape the future of agentic AI",
  },
];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, handler]);
}

function ResourceIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M6 8L14 4L22 8M6 8L14 12M6 8V16L14 20M22 8L14 12M22 8V16L14 20M14 12V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dropdown({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-foreground transition-colors duration-150"
      >
        {label}
        <ChevronDown className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[160px] rounded-lg border border-border bg-background shadow-md py-1.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-secondary hover:text-foreground hover:bg-surface transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ResourcesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-foreground transition-colors duration-150"
      >
        Resources
        <ChevronDown className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 w-[580px] rounded-xl border border-border bg-background shadow-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_220px]">
            {/* Left: Resource links */}
            <div className="p-6">
              <p className="text-xs font-semibold text-tertiary tracking-wider mb-4">Resources</p>
              <div className="space-y-5">
                {RESOURCE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 group"
                  >
                    <div className="text-accent mt-0.5">
                      <ResourceIcon />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-150">
                        {link.label}
                      </p>
                      <p className="text-sm text-secondary mt-0.5 leading-snug">
                        {link.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Featured blog post */}
            <div className="bg-surface p-5 border-l border-border">
              <p className="text-xs font-semibold text-tertiary tracking-wider mb-3">Featured from Blog</p>
              <Link
                href="/blog"
                onClick={() => setOpen(false)}
                className="block group"
              >
                <div className="rounded-lg overflow-hidden bg-border aspect-[16/10] mb-3">
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 via-accent/10 to-surface" />
                </div>
                <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-150 leading-snug">
                  What is Agentic AI?
                </p>
                <p className="text-xs font-medium text-accent mt-2 flex items-center gap-1">
                  Read More
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 2.5L8.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`bg-background/80 backdrop-blur-xl sticky top-0 z-50 pt-[30px] pb-[10px] transition-shadow duration-300 ease-in-out ${scrolled ? "shadow-[0_1px_8px_rgba(0,0,0,0.08),0_4px_24px_rgba(0,0,0,0.04)]" : "shadow-none"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/datagrid-logo.avif" alt="Datagrid" width={140} height={32} className="brightness-0 translate-y-0.5" priority />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <Dropdown label="Product" links={PRODUCT_LINKS} />
            <Link
              href="/pricing"
              className="text-sm font-medium text-secondary hover:text-foreground transition-colors duration-150"
            >
              Pricing
            </Link>
            <ResourcesDropdown />
            <Link
              href="/demo"
              className="text-sm font-medium text-secondary hover:text-foreground transition-colors duration-150"
            >
              Request a Demo
            </Link>
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/demo"
              className="hidden sm:inline-flex text-sm font-semibold text-foreground hover:text-secondary transition-colors duration-150"
            >
              Login
            </Link>
            <Link
              href="/demo"
              className={`hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-300 ease-out ${scrolled ? "border-accent bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md hover:border-accent-hover" : "border-border bg-transparent text-foreground hover:bg-surface"}`}
            >
              Create Account
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-secondary hover:text-foreground transition-colors duration-150"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50">
          <div className="px-4 py-6 space-y-4">
            <p className="text-xs font-semibold text-tertiary tracking-wider">Product</p>
            {PRODUCT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block pl-2 text-sm font-medium text-secondary hover:text-foreground transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-secondary hover:text-foreground transition-colors duration-150"
            >
              Pricing
            </Link>
            <p className="text-xs font-semibold text-tertiary tracking-wider pt-2">Resources</p>
            {RESOURCE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block pl-2 text-sm font-medium text-secondary hover:text-foreground transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/demo"
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-secondary hover:text-foreground transition-colors duration-150"
            >
              Request a Demo
            </Link>
            <div className="pt-2 border-t border-border/50 space-y-4">
              <Link
                href="/demo"
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-semibold text-foreground hover:text-secondary transition-colors duration-150"
              >
                Login
              </Link>
              <Link
                href="/demo"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
