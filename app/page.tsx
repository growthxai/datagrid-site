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
import { AGENT_ICONS, CONNECTOR_ICON } from "@/lib/nav-data";

import { SCRAPED_BLOG_POSTS } from "@/lib/scraped-blog-data";

const BLOG_IMAGES: Record<string, string> = Object.fromEntries(
  SCRAPED_BLOG_POSTS.map((p) => [p.slug, p.featuredImage.url])
);

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
                    <div className="mt-auto pt-5 flex items-center transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
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
                      <span className="ml-auto text-sm font-medium inline-flex items-center use-agent-shimmer">
                        Use Agent
                        <span className="inline-flex items-center w-3.5 ml-1.5 overflow-hidden">
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
                      <div className="mt-auto pt-4 flex items-center">
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
                        <span className="ml-auto text-sm font-medium inline-flex items-center use-agent-shimmer">
                          Read
                          <span className="inline-flex items-center w-3.5 ml-1.5 overflow-hidden">
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
