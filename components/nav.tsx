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
    icon: "blog",
  },
  {
    href: "/webinars",
    label: "Webinars",
    description: "Live and on-demand sessions on AI in construction",
    icon: "webinar",
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

function BlogIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8h8M8 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WebinarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 10l4 2.5-4 2.5V10z" fill="currentColor" />
      <path d="M8 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const RESOURCE_ICONS: Record<string, () => React.ReactNode> = {
  blog: BlogIcon,
  webinar: WebinarIcon,
};

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
    <div ref={ref} className="relative group/dropdown">
      {/* Hover pill behind trigger */}
      <div
        className={`absolute -left-4 -top-2 rounded-lg bg-background pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          open
            ? "opacity-0"
            : "group-hover/dropdown:opacity-100 group-hover/dropdown:shadow-[0_2px_8px_rgba(0,0,0,0.06)] opacity-0 shadow-none"
        }`}
        style={{ height: "36px", width: "calc(100% + 32px)" }}
      />
      {/* Open panel */}
      {open && (
        <div className="absolute -left-4 -top-2 rounded-lg bg-background shadow-[0_4px_16px_rgba(0,0,0,0.10)] animate-dropdown-in">
          <div style={{ height: "36px" }} />
          <div className="py-1.5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-secondary hover:text-foreground hover:bg-surface transition-colors duration-150 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={`relative z-10 flex items-center gap-1.5 text-sm font-medium transition-colors duration-150 ${open ? "text-foreground" : "text-secondary hover:text-foreground"}`}
      >
        {label}
        <ChevronDown className={`transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}

function ResourcesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative group/dropdown">
      {/* Hover pill */}
      <div
        className={`absolute -left-4 -top-2 rounded-lg bg-background pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          open
            ? "opacity-0"
            : "group-hover/dropdown:opacity-100 group-hover/dropdown:shadow-[0_2px_8px_rgba(0,0,0,0.06)] opacity-0 shadow-none"
        }`}
        style={{ height: "36px", width: "calc(100% + 32px)" }}
      />
      <button
        onClick={() => setOpen(!open)}
        className={`relative z-10 flex items-center gap-1.5 text-sm font-medium transition-colors duration-150 ${open ? "text-foreground" : "text-secondary hover:text-foreground"}`}
      >
        Resources
        <ChevronDown className={`transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute -left-4 -top-2 w-[560px] rounded-xl bg-background shadow-[0_4px_16px_rgba(0,0,0,0.10)] overflow-hidden animate-dropdown-in">
          <div style={{ height: "36px" }} />
          <div className="border-b border-border/50" />

          {/* Resource links */}
          <div className="flex gap-6 px-6 py-4">
            {RESOURCE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 group flex-1"
              >
                <div className="text-accent mt-0.5">
                  {RESOURCE_ICONS[link.icon]?.() ?? null}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-150">
                    {link.label}
                  </p>
                  <p className="text-xs text-secondary mt-0.5 leading-snug">
                    {link.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured blog posts */}
          <div className="bg-surface border-t border-border/50 px-6 py-5">
            <p className="text-xs font-medium text-tertiary tracking-wider mb-4">Featured from Blog</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { title: "What is Agentic AI?", slug: "what-is-agentic-ai", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80" },
                { title: "AI Submittal Review: A Practical Guide", slug: "ai-agents-submittal-review", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
                { title: "How GCs Are Adopting AI", slug: "gc-guide-ai-adoption", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
              ].map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  onClick={() => setOpen(false)}
                  className="block group"
                >
                  <div className="rounded-lg overflow-hidden aspect-[16/10] mb-2 bg-border">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={200}
                      height={125}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                  </div>
                  <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-150 leading-snug line-clamp-2">
                    {post.title}
                  </p>
                </Link>
              ))}
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
              className="hidden sm:inline-flex text-sm font-medium text-foreground hover:text-secondary transition-colors duration-150"
            >
              Login
            </Link>
            <Link
              href="/demo"
              className={`hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-300 ease-out ${scrolled ? "border-accent bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md hover:border-accent-hover" : "border-border bg-transparent text-foreground hover:bg-surface"}`}
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
            <p className="text-xs font-medium text-tertiary tracking-wider">Product</p>
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
            <p className="text-xs font-medium text-tertiary tracking-wider pt-2">Resources</p>
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
                className="block text-sm font-medium text-foreground hover:text-secondary transition-colors duration-150"
              >
                Login
              </Link>
              <Link
                href="/demo"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out"
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
