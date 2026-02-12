import Link from "next/link";
import Image from "next/image";
import HeroInput from "@/components/hero-input";
import LogoMarquee from "@/components/logo-marquee";
import GuidesCarousel from "@/components/guides-carousel";
import HoverCard from "@/components/hover-card";
import CtaArrow from "@/components/cta-arrow";
import BlueprintBg from "@/components/blueprint-bg";
import { getAgents, getConnectors, getGuides } from "@/lib/queries";
import { PLACEHOLDER_AGENTS, PLACEHOLDER_CONNECTORS, PLACEHOLDER_GUIDES } from "@/lib/placeholder-data";

import { SCRAPED_BLOG_POSTS } from "@/lib/scraped-blog-data";

const BLOG_IMAGES: Record<string, string> = Object.fromEntries(
  SCRAPED_BLOG_POSTS.map((p) => [p.slug, p.featuredImage.url])
);

const AGENT_ICONS: Record<string, { bg: string; border: string; color: string; icon: string }> = {
  "deep-search": { bg: "bg-violet-50", border: "border-violet-200", color: "text-violet-500", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  "summary-spec-submittal": { bg: "bg-blue-50", border: "border-blue-200", color: "text-blue-500", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  "document-comparison": { bg: "bg-indigo-50", border: "border-indigo-200", color: "text-indigo-500", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
  "rfi-validator": { bg: "bg-amber-50", border: "border-amber-200", color: "text-amber-500", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  "submittal-builder": { bg: "bg-emerald-50", border: "border-emerald-200", color: "text-emerald-500", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  "scope-checker": { bg: "bg-orange-50", border: "border-orange-200", color: "text-orange-500", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  "sop-agent": { bg: "bg-yellow-50", border: "border-yellow-200", color: "text-yellow-600", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  "site-safety": { bg: "bg-rose-50", border: "border-rose-200", color: "text-rose-500", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  "deep-dive-spec-submittal": { bg: "bg-sky-50", border: "border-sky-200", color: "text-sky-500", icon: "M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" },
  "rfi-checker": { bg: "bg-teal-50", border: "border-teal-200", color: "text-teal-500", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" },
  "mentor-agent": { bg: "bg-pink-50", border: "border-pink-200", color: "text-pink-500", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  "pre-qualification": { bg: "bg-lime-50", border: "border-lime-200", color: "text-lime-600", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  "fast-ai-search": { bg: "bg-fuchsia-50", border: "border-fuchsia-200", color: "text-fuchsia-500", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  "daily-report": { bg: "bg-cyan-50", border: "border-cyan-200", color: "text-cyan-500", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
  "change-order": { bg: "bg-violet-50", border: "border-violet-200", color: "text-violet-500", icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" },
  "change-analyser": { bg: "bg-blue-50", border: "border-blue-200", color: "text-blue-500", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
  "audit-agent": { bg: "bg-red-50", border: "border-red-200", color: "text-red-500", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  "single-line-drawings-expert": { bg: "bg-amber-50", border: "border-amber-200", color: "text-amber-500", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
};

const CONNECTOR_ICON: Record<string, string> = {
  procore: "/logos/icons/procore.svg",
  plangrid: "/logos/icons/plangrid.svg",
  "autodesk-build": "/logos/icons/autodesk.svg",
  "autodesk-acc": "/logos/icons/autodesk.svg",
  bluebeam: "/logos/icons/bluebeam.svg",
  "sage-300-cre": "/logos/icons/sage.svg",
  "microsoft-project": "/logos/icons/microsoft-project.svg",
  sharepoint: "/logos/icons/sharepoint.svg",
  "oracle-aconex": "/logos/icons/oracle-aconex.svg",
  "p6-primavera": "/logos/icons/p6-primavera.svg",
  "trimble-connect": "/logos/icons/trimble-connect.svg",
  quickbase: "/logos/icons/quickbase.svg",
  "imap-email": "/logos/icons/imap-email.svg",
  slack: "/logos/icons/slack.svg",
  egnyte: "/logos/icons/egnyte.svg",
  quickbooks: "/logos/icons/quickbooks.svg",
  "google-drive": "/logos/icons/google-drive.svg",
  notion: "/logos/icons/notion.svg",
};

const GUIDE_CARD_IMAGES: Record<string, string> = {
  "ai-agents-submittal-review": "/blog/submittal-review.jpeg",
  "ai-rfi-management": "/blog/rfi-management.jpeg",
  "construction-document-search": "/blog/document-search.jpeg",
  "reducing-change-order-disputes": "/blog/change-orders.jpeg",
  "ai-safety-inspections": "/blog/safety-inspections.jpeg",
  "gc-guide-ai-adoption": "/blog/gc-ai-adoption.jpeg",
};

const CONNECTOR_LOGOS: Record<string, { src: string; width: number; h: string }> = {
  procore: { src: "/logos/procore.svg", width: 130, h: "h-[14px]" },
  "autodesk-build": { src: "/logos/autodesk.svg", width: 160, h: "h-[16px]" },
  bluebeam: { src: "/logos/bluebeam.svg", width: 130, h: "h-[16px]" },
  plangrid: { src: "/logos/plangrid.svg", width: 120, h: "h-[16px]" },
  "sage-300-cre": { src: "/logos/sage.svg", width: 80, h: "h-[18px]" },
  "microsoft-project": { src: "/logos/microsoft-project.svg", width: 140, h: "h-[16px]" },
};

export default async function HomePage() {
  const [agentsData, connectorsData, guidesData] = await Promise.all([
    getAgents().catch(() => []),
    getConnectors().catch(() => []),
    getGuides().catch(() => []),
  ]);

  const agents = agentsData.length > 0 ? agentsData : PLACEHOLDER_AGENTS;
  const allConnectors = connectorsData.length > 0 ? connectorsData : PLACEHOLDER_CONNECTORS;
  const connectors = allConnectors.slice(0, 8);
  const guides = guidesData.length > 0 ? guidesData : PLACEHOLDER_GUIDES;
  const featuredAgents = agents.slice(0, 6);

  return (
    <>
      {/* Hero section */}
      <section className="relative z-10 py-10 sm:py-12 lg:py-16 bg-[#f1e8e0]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left column: eyebrow + headline */}
            <div>
              <p className="text-xs font-medium text-[#4b4036] mb-3 flex items-center gap-1.5"><svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 0.5L9.33 2.75V7.25L5 9.5L0.67 7.25V2.75L5 0.5Z" fill="#F97316"/></svg>AI-Powered Construction Platform</p>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.15] tracking-tight text-[#1a1a1a]">
                AI agents that
                <br />
                understand <span className="text-accent">construction</span>
              </h1>
              <p className="text-xs font-medium text-[#4b4036] mt-6 mb-1">Integrates with the tools you already use</p>
              <LogoMarquee
                logos={Object.entries(CONNECTOR_LOGOS).map(([slug, logo]) => ({
                  slug,
                  title: slug,
                  src: logo.src,
                  width: logo.width,
                }))}
              />
            </div>

            {/* Right column: body copy + CTAs */}
            <div className="lg:pt-[27px]">
              <p className="text-lg sm:text-xl text-[#5a5248]">
                Automate submittal reviews, RFIs, daily logs, and more. Purpose-built
                for general contractors, owners, and subs.
              </p>
              <div className="mt-8 flex items-start gap-4">
                <Link
                  href="/demo"
                  className="group shrink-0 inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out whitespace-nowrap"
                >
                  Sign up for Datagrid<CtaArrow />
                </Link>
                <HeroInput />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Agents grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium text-[#4b4036] mb-4">AI Agents for Construction</p>
              <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
                Featured Agents
              </h2>
              <p className="mt-1 text-secondary max-w-2xl">
                Purpose-built AI for your most time-consuming workflows.
              </p>
            </div>
            <Link
              href="/agents"
              className="hidden sm:inline-flex group items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-black/[0.03] transition-all duration-200 ease-out shrink-0"
            >
              View all agents<CtaArrow />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredAgents.map((agent) => {
              const iconData = AGENT_ICONS[agent.slug.current];
              return (
                <HoverCard key={agent._id}>
                  <Link
                    href={`/agents/${agent.slug.current}`}
                    className="relative flex flex-col h-full p-6 bg-background rounded-2xl border border-border group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`shrink-0 w-10 h-10 rounded-lg border ${iconData?.bg || "bg-accent/5"} ${iconData?.border || "border-accent/10"} flex items-center justify-center transition-transform duration-300 ease-out group-hover/card:-translate-x-[2px] group-hover/card:-translate-y-[2px]`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={iconData?.color || "text-accent"}>
                          <path d={iconData?.icon || "M13 10V3L4 14h7v7l9-11h-7z"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="flex items-center gap-2 transition-transform duration-300 ease-out group-hover/card:translate-x-[2px] group-hover/card:-translate-y-[2px]">
                        {agent.status === "coming-soon" && (
                          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                            Coming Soon
                          </span>
                        )}
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface text-secondary">
                          {agent.category?.title}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[2px]">
                      {agent.title}
                    </h3>
                    <p className="mt-1 text-sm text-secondary line-clamp-2 transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                      {agent.shortDescription}
                    </p>
                    <div className="mt-auto pt-5 flex items-center justify-between transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                      <div className="flex items-center gap-1">
                        {(agent.connectors ?? []).map((c) => {
                          const icon = CONNECTOR_ICON[c.slug.current];
                          if (!icon) return null;
                          return (
                            <span
                              key={c._id}
                              title={c.title}
                              className="w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden"
                            >
                              <Image
                                src={icon}
                                alt={c.title}
                                width={14}
                                height={14}
                                className="w-[14px] h-[14px] object-contain grayscale group-hover/card:grayscale-0 transition-[filter] duration-300 ease-out"
                              />
                            </span>
                          );
                        })}
                      </div>
                      <span className="text-sm font-medium inline-flex items-center use-agent-shimmer transition-all duration-150">
                        <span className="text-accent opacity-40 group-hover/card:opacity-100 transition-opacity duration-150">Use Agent</span>
                        <span className="inline-flex items-center w-3.5 ml-1.5 overflow-hidden text-accent opacity-60 group-hover/card:opacity-100 transition-opacity duration-150">
                          <span className="w-0 group-hover/card:w-[5px] h-[1.5px] bg-current rounded-full transition-[width] duration-200 ease-out shrink-0" />
                          <svg width="7" height="10" viewBox="0 0 7 10" fill="none" className="shrink-0">
                            <path d="M1.5 1L5.5 5L1.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </Link>
                </HoverCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Connectors grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f5f1ed]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium text-[#4b4036] mb-4">Industry Standards</p>
              <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
                Plug into your existing stack
              </h2>
              <p className="mt-1 text-secondary max-w-2xl">
                Seamlessly connect the construction tools your team already relies on.
              </p>
            </div>
            <Link
              href="/connectors"
              className="hidden sm:inline-flex group items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-black/[0.03] transition-all duration-200 ease-out shrink-0"
            >
              View all connectors<CtaArrow />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {connectors.map((connector) => {
              const icon = CONNECTOR_ICON[connector.slug.current];
              return (
                <HoverCard key={connector._id}>
                  <Link
                    href={`/connectors/${connector.slug.current}`}
                    className="relative flex flex-col h-full p-6 bg-background rounded-2xl border border-border group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden transition-transform duration-300 ease-out group-hover/card:-translate-x-[2px] group-hover/card:-translate-y-[2px]">
                        {icon ? (
                          <Image
                            src={icon}
                            alt={connector.title}
                            width={20}
                            height={20}
                            className="w-5 h-5 object-contain"
                          />
                        ) : (
                          <span className="text-sm font-medium text-accent">
                            {connector.title.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px]">
                      {connector.title}
                    </h3>
                    <p className="mt-1 text-sm text-secondary line-clamp-2 transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                      {connector.shortDescription}
                    </p>
                  </Link>
                </HoverCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-medium text-[#4b4036] mb-4">Improve your Business</p>
              <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
                Learn how teams use Datagrid
              </h2>
              <p className="mt-1 text-secondary max-w-2xl">
                Practical guides on AI-powered workflows for construction teams.
              </p>
            </div>
            <Link
              href="/guides"
              className="hidden sm:inline-flex group items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-black/[0.03] transition-all duration-200 ease-out shrink-0"
            >
              View all guides<CtaArrow />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.slice(0, 3).map((guide, i) => {
              const img = GUIDE_CARD_IMAGES[guide.slug.current];
              const agentCount = ("relatedAgentSlugs" in guide && Array.isArray(guide.relatedAgentSlugs)) ? guide.relatedAgentSlugs.length : 0;
              const connectorCount = ("relatedConnectorSlugs" in guide && Array.isArray(guide.relatedConnectorSlugs)) ? guide.relatedConnectorSlugs.length : 0;
              return (
                <HoverCard key={guide._id}>
                  <Link
                    href={`/blog/${guide.slug.current}`}
                    className="relative flex flex-col h-full bg-background rounded-2xl border border-border overflow-hidden group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-surface">
                      {img ? (
                        <Image
                          src={img}
                          alt={guide.title}
                          fill
                          className="object-cover group-hover/card:scale-[1.03] transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-[8px] mb-3">
                        <span className="text-[11px] font-medium text-accent/70 mr-auto">
                          Guide {String(i + 1).padStart(2, "0")}
                        </span>
                        {agentCount > 0 && (
                          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-accent/8 text-accent/80 border border-accent/12">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                              <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {agentCount} agent{agentCount !== 1 ? "s" : ""}
                          </span>
                        )}
                        {connectorCount > 0 && (
                          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-surface text-tertiary border border-border">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                              <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            {connectorCount} connector{connectorCount !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-medium leading-snug text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px]">
                        {guide.title}
                      </h3>
                      <p className="mt-2 text-sm text-secondary leading-relaxed line-clamp-2 transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                        {guide.excerpt}
                      </p>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        {("readTime" in guide && guide.readTime) ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-tertiary">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-tertiary">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            {(guide as { readTime: number }).readTime} min
                          </span>
                        ) : (
                          <span />
                        )}
                        <span className="text-sm font-medium inline-flex items-center use-agent-shimmer transition-all duration-150">
                          <span className="text-accent opacity-40 group-hover/card:opacity-100 transition-opacity duration-150">Read</span>
                          <span className="inline-flex items-center w-3.5 ml-1.5 overflow-hidden text-accent opacity-60 group-hover/card:opacity-100 transition-opacity duration-150">
                            <span className="w-0 group-hover/card:w-[5px] h-[1.5px] bg-current rounded-full transition-[width] duration-200 ease-out shrink-0" />
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" className="shrink-0">
                              <path d="M1.5 1L5.5 5L1.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </HoverCard>
              );
            })}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/guides"
              className="inline-flex group items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-black/[0.03] transition-all duration-200 ease-out"
            >
              View all guides<CtaArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="agents" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-medium text-[#4b4036] mb-4">By the Numbers</p>
              <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
                Proven impact at scale
              </h2>
              <p className="mt-2 text-secondary max-w-md">
                Construction teams use Datagrid to eliminate manual document work and move faster from preconstruction through closeout.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
              {[
                { number: "10,000+", label: "Documents processed" },
                { number: "200+", label: "Teams onboarded" },
                { number: "80%", label: "Faster reviews" },
                { number: "99.9%", label: "Platform uptime" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-[2.5rem] sm:text-5xl font-medium text-accent">
                    {stat.number}
                  </p>
                  <p className="mt-2 text-sm text-secondary">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* From the Blog */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-2">
            <p className="text-xs font-medium text-[#4b4036] mb-4">From the Blog</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
              Insights for modern construction teams
            </h2>
            <p className="mt-1 text-secondary max-w-2xl">
              Practical guides, case studies, and thought leadership on AI in construction.
            </p>
          </div>
          <GuidesCarousel
            guides={guides.map((guide) => ({
              _id: guide._id,
              title: guide.title,
              slug: guide.slug.current,
              category: guide.category?.title,
              publishedAt: guide.publishedAt,
              excerpt: guide.excerpt,
              image: BLOG_IMAGES[guide.slug.current] || "/blog/tenant-screening.jpeg",
            }))}
          />
        </div>
      </section>

      {/* Final CTA section */}
      <section className="relative py-20 sm:py-28 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="network" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-[1.1]">
            Ready to put AI to work<br />on your projects?
          </h2>
          <p className="mt-4 text-base text-secondary max-w-xl">
            Join the general contractors and owners who are saving thousands of hours with Datagrid.
          </p>
          <div className="mt-8">
            <Link
              href="/demo"
              className="group inline-flex items-center px-8 py-4 text-base font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out"
            >
              Request a Demo<CtaArrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
