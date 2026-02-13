"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { AGENT_ICONS, CONNECTOR_ICON } from "@/lib/nav-data";
import { PLACEHOLDER_AGENTS, PLACEHOLDER_CONNECTORS, PLACEHOLDER_GUIDES } from "@/lib/placeholder-data";
import { SCRAPED_BLOG_POSTS } from "@/lib/scraped-blog-data";
import CtaArrow from "@/components/cta-arrow";
import LogoContextMenu from "@/components/logo-context-menu";

const PRODUCT_LINKS = [
  { href: "/agents", label: "Agents" },
  { href: "/connectors", label: "Connectors" },
];

const RESOURCE_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/guides", label: "Guides" },
  { href: "/webinars", label: "Webinars" },
];

const GUIDE_CARD_IMAGES: Record<string, string> = {
  "ai-agents-submittal-review": "/blog/submittal-review.jpeg",
  "ai-rfi-management": "/blog/rfi-management.jpeg",
  "construction-document-search": "/blog/document-search.jpeg",
};

const NAV_AGENTS = PLACEHOLDER_AGENTS.slice(0, 6);
const NAV_CONNECTORS = PLACEHOLDER_CONNECTORS.slice(0, 6);
const NAV_BLOG_POSTS = SCRAPED_BLOG_POSTS.slice(0, 3);
const NAV_GUIDES = PLACEHOLDER_GUIDES.slice(0, 3);
const NAV_WEBINARS = [
  { title: "AI Workflows for Submittal Review", description: "See how GCs automate spec comparison and compliance checks.", slug: "ai-submittal-review" },
  { title: "From RFIs to Resolution: An AI Walkthrough", description: "Live demo of AI-powered RFI validation and resolution.", slug: "rfi-resolution" },
  { title: "Building Your AI Adoption Roadmap", description: "A framework for rolling out AI tools across your construction org.", slug: "ai-adoption-roadmap" },
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-secondary">
      <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8h8M8 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GuideIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-secondary">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WebinarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-secondary">
      <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 8.5l4.5 2.75-4.5 2.75V8.5z" fill="currentColor" />
      <path d="M8 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DropdownTrigger({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <div className="relative group/dropdown">
      {/* Hover pill behind trigger */}
      <div
        className={`absolute -left-4 -top-2 rounded-lg bg-background border pointer-events-none transition-opacity duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          active
            ? "opacity-100 border-border shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]"
            : "group-hover/dropdown:opacity-100 group-hover/dropdown:border-border opacity-0 border-transparent"
        }`}
        style={{ height: "36px", width: "calc(100% + 32px)" }}
      />
      <button
        onClick={onClick}
        className={`relative z-10 flex items-center gap-1.5 text-sm font-medium transition-colors duration-150 ${active ? "text-foreground" : "text-secondary hover:text-foreground"}`}
      >
        {label}
        <ChevronDown className={`transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${active ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}

function ProductPanel({ onClose }: { onClose: () => void }) {
  const featuredAgent = NAV_AGENTS[0];
  const restAgents = NAV_AGENTS.slice(1, 4);
  const featuredConnector = NAV_CONNECTORS[0];
  const restConnectors = NAV_CONNECTORS.slice(1, 4);
  const featuredAgentIcon = AGENT_ICONS[featuredAgent.slug.current];
  const featuredConnectorIcon = CONNECTOR_ICON[featuredConnector.slug.current];

  return (
    <div className="absolute left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/50 shadow-[0_12px_40px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.06)] animate-dropdown-in">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 animate-mega-content">
        <div className="flex gap-8">
          {/* Agents — ~58% */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-tertiary">Agents</span>
              <Link href="/agents" onClick={onClose} className="group text-xs font-medium text-accent hover:text-accent-hover transition-colors inline-flex items-center">
                View all agents <CtaArrow />
              </Link>
            </div>

            {/* Featured agent card — homepage style */}
            <Link
              href={`/agents/${featuredAgent.slug.current}`}
              onClick={onClose}
              className="group/card flex flex-col rounded-xl p-4 min-h-[130px] bg-background border border-border hover:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
            >
              <div className="flex justify-between items-start mb-2.5">
                <div className={`shrink-0 w-9 h-9 rounded-lg border ${featuredAgentIcon?.bg || "bg-accent/5"} ${featuredAgentIcon?.border || "border-accent/10"} flex items-center justify-center transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:-translate-y-[1px]`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={featuredAgentIcon?.color || "text-accent"}>
                    <path d={featuredAgentIcon?.icon || "M13 10V3L4 14h7v7l9-11h-7z"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface text-secondary">{featuredAgent.category?.title}</span>
              </div>
              <p className="text-sm font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out">{featuredAgent.title}</p>
              <p className="text-xs text-secondary mt-1 leading-relaxed line-clamp-2">{featuredAgent.description}</p>
              <span className="mt-2.5 text-xs font-medium inline-flex items-center text-accent">
                Featured Agent
                <span className="inline-flex items-center w-3.5 ml-1.5 overflow-hidden">
                  <span className="w-0 group-hover/card:w-[5px] h-[1.5px] bg-current rounded-full transition-[width] duration-200 ease-out shrink-0" />
                  <svg width="7" height="10" viewBox="0 0 7 10" fill="none" className="shrink-0"><path d="M1.5 1L5.5 5L1.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </span>
            </Link>

            {/* Remaining agents list */}
            <div className="mt-1.5 space-y-px">
              {restAgents.map((agent) => {
                const iconData = AGENT_ICONS[agent.slug.current];
                return (
                  <Link
                    key={agent._id}
                    href={`/agents/${agent.slug.current}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-2.5 py-2 rounded-lg border border-transparent hover:border-border transition-colors duration-150 group"
                  >
                    <div className={`shrink-0 w-7 h-7 rounded-md border ${iconData?.bg || "bg-accent/5"} ${iconData?.border || "border-accent/10"} flex items-center justify-center`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={iconData?.color || "text-accent"}>
                        <path d={iconData?.icon || "M13 10V3L4 14h7v7l9-11h-7z"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-150 leading-tight">{agent.title}</p>
                      <p className="text-xs text-secondary mt-0.5 line-clamp-1 leading-snug">{agent.shortDescription}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Vertical divider */}
          <div className="w-px bg-border/60 shrink-0 -my-6" />

          {/* Connectors — ~42% */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-tertiary">Connectors</span>
              <Link href="/connectors" onClick={onClose} className="group text-xs font-medium text-accent hover:text-accent-hover transition-colors inline-flex items-center">
                View all connectors <CtaArrow />
              </Link>
            </div>

            {/* Featured connector card — homepage style */}
            <Link
              href={`/connectors/${featuredConnector.slug.current}`}
              onClick={onClose}
              className="group/card flex flex-col rounded-xl p-4 min-h-[130px] bg-background border border-border hover:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
            >
              <div className="flex justify-between items-start mb-2.5">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:-translate-y-[1px]">
                  {featuredConnectorIcon ? (
                    <Image src={featuredConnectorIcon} alt={featuredConnector.title} width={20} height={20} className="w-5 h-5 object-contain" />
                  ) : (
                    <span className="text-sm font-medium text-accent">{featuredConnector.title.charAt(0)}</span>
                  )}
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent/8 text-accent border border-accent/12">
                  {featuredConnector.agentCount} agents
                </span>
              </div>
              <p className="text-sm font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out">{featuredConnector.title}</p>
              <p className="text-xs text-secondary mt-1 leading-relaxed line-clamp-2">{featuredConnector.description}</p>
              <span className="mt-auto pt-2 text-xs font-medium inline-flex items-center text-accent">
                Featured Connector
                <span className="inline-flex items-center w-3.5 ml-1.5 overflow-hidden">
                  <span className="w-0 group-hover/card:w-[5px] h-[1.5px] bg-current rounded-full transition-[width] duration-200 ease-out shrink-0" />
                  <svg width="7" height="10" viewBox="0 0 7 10" fill="none" className="shrink-0"><path d="M1.5 1L5.5 5L1.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </span>
            </Link>

            {/* Remaining connectors list */}
            <div className="mt-1.5 space-y-px">
              {restConnectors.map((connector) => {
                const icon = CONNECTOR_ICON[connector.slug.current];
                return (
                  <Link
                    key={connector._id}
                    href={`/connectors/${connector.slug.current}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-2.5 py-2 rounded-lg border border-transparent hover:border-border transition-colors duration-150 group"
                  >
                    <div className="shrink-0 w-7 h-7 rounded-md bg-surface border border-border flex items-center justify-center overflow-hidden">
                      {icon ? (
                        <Image src={icon} alt={connector.title} width={14} height={14} className="w-3.5 h-3.5 object-contain" />
                      ) : (
                        <span className="text-[10px] font-medium text-accent">{connector.title.charAt(0)}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-150 leading-tight">{connector.title}</p>
                      <p className="text-xs text-secondary mt-0.5 line-clamp-1 leading-snug">{connector.shortDescription}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourcesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/50 shadow-[0_12px_40px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.06)] animate-dropdown-in">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 animate-mega-content">
        <div className="flex gap-8">
          {/* Guides — micro-cards with images (~45%) */}
          <div className="flex-[45] min-w-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GuideIcon />
                <span className="text-xs font-medium text-tertiary">Guides</span>
              </div>
              <Link href="/guides" onClick={onClose} className="group text-xs font-medium text-accent hover:text-accent-hover transition-colors inline-flex items-center">
                All guides <CtaArrow />
              </Link>
            </div>
            <div className="space-y-2">
              {NAV_GUIDES.map((guide) => {
                const img = GUIDE_CARD_IMAGES[guide.slug.current];
                return (
                  <Link
                    key={guide._id}
                    href={`/blog/${guide.slug.current}`}
                    onClick={onClose}
                    className="group/card flex gap-3 p-2 rounded-xl border border-transparent hover:border-border transition-all duration-200"
                  >
                    <div className="shrink-0 w-20 h-14 rounded-lg overflow-hidden bg-surface relative">
                      {img ? (
                        <Image src={img} alt={guide.title} fill className="object-cover group-hover/card:scale-[1.03] transition-transform duration-500 ease-out" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 py-0.5">
                      <p className="text-sm font-medium text-foreground group-hover/card:text-accent transition-colors duration-200 leading-tight line-clamp-1">{guide.title}</p>
                      <p className="text-xs text-secondary mt-0.5 line-clamp-1 leading-snug">{guide.excerpt}</p>
                      {guide.readTime && (
                        <span className="text-[10px] text-tertiary mt-0.5 inline-block">{guide.readTime} min read</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Vertical divider */}
          <div className="w-px bg-border/60 shrink-0 -my-6" />

          {/* Right side: Blog + Webinars (~55%) */}
          <div className="flex-[55] min-w-0 flex">
            <div className="flex gap-6 flex-1 -my-6 py-6">
              {/* Blog */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BlogIcon />
                    <span className="text-xs font-medium text-tertiary">Blog</span>
                  </div>
                  <Link href="/blog" onClick={onClose} className="group text-xs font-medium text-accent hover:text-accent-hover transition-colors inline-flex items-center">
                    All posts <CtaArrow />
                  </Link>
                </div>
                <div className="space-y-px">
                  {NAV_BLOG_POSTS.slice(0, 3).map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug}`}
                      onClick={onClose}
                      className="block px-2.5 py-2 rounded-lg border border-transparent hover:border-border transition-colors duration-150 group"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-150 leading-tight line-clamp-2">{post.title}</p>
                      <p className="text-xs text-secondary mt-1 line-clamp-1 leading-snug">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="w-px bg-border/60 shrink-0 -my-6" />

              {/* Webinars */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <WebinarIcon />
                    <span className="text-xs font-medium text-tertiary">Webinars</span>
                  </div>
                  <Link href="/webinars" onClick={onClose} className="group text-xs font-medium text-accent hover:text-accent-hover transition-colors inline-flex items-center">
                    All webinars <CtaArrow />
                  </Link>
                </div>
                <div className="space-y-px">
                  {NAV_WEBINARS.map((webinar) => (
                    <Link
                      key={webinar.slug}
                      href={`/webinars/${webinar.slug}`}
                      onClick={onClose}
                      className="block px-2.5 py-2 rounded-lg border border-transparent hover:border-border transition-colors duration-150 group"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-150 leading-tight line-clamp-2">{webinar.title}</p>
                      <p className="text-xs text-secondary mt-1 line-clamp-1 leading-snug">{webinar.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"product" | "resources" | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const hasPageHeader = pathname === "/agents" || pathname === "/guides" || pathname === "/product" || pathname === "/resources" || pathname === "/blog" || pathname === "/pricing" || pathname === "/download" || pathname === "/help-center" || pathname === "/faq" || pathname === "/contact" || pathname === "/careers" || pathname === "/developers" || pathname === "/api-quickstart" || pathname === "/brand-assets" || pathname.startsWith("/connectors") || pathname.startsWith("/agents/") || pathname.startsWith("/blog/");

  const closeDropdown = useCallback(() => setActiveDropdown(null), []);
  useClickOutside(navRef, closeDropdown);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDropdown = (name: "product" | "resources") => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <div ref={navRef} className="sticky top-0 z-50 relative">
    <nav className={`bg-background/80 backdrop-blur-xl pt-[30px] pb-[10px] transition-shadow duration-300 ease-in-out ${scrolled && !hasPageHeader ? "shadow-[0_1px_8px_rgba(0,0,0,0.08),0_4px_24px_rgba(0,0,0,0.04)]" : "shadow-none"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          {/* Logo */}
          <LogoContextMenu>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/datagrid-logo.avif" alt="Datagrid" width={140} height={32} className="brightness-0 translate-y-0.5" priority />
            </Link>
          </LogoContextMenu>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <DropdownTrigger label="Product" active={activeDropdown === "product"} onClick={() => toggleDropdown("product")} />
            <Link
              href="/pricing"
              className="text-sm font-medium text-secondary hover:text-foreground transition-colors duration-150"
            >
              Pricing
            </Link>
            <DropdownTrigger label="Resources" active={activeDropdown === "resources"} onClick={() => toggleDropdown("resources")} />
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
        <div className="md:hidden border-t border-border/50 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]">
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

      {/* Mega-menu panels — outside nav so backdrop-blur works */}
      {activeDropdown === "product" && <ProductPanel onClose={closeDropdown} />}
      {activeDropdown === "resources" && <ResourcesPanel onClose={closeDropdown} />}
    </div>
  );
}
