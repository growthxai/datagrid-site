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
import { INDUSTRY_DATA } from "@/lib/cross-references";

const GUIDE_IMAGES: Record<string, string> = {
  "ai-agents-submittal-review": "/blog/trimble-connect.jpeg",
  "getting-started-connectors": "/blog/manufacturing-sops.jpeg",
  "gc-guide-ai-adoption": "/blog/transportation-ops.jpeg",
};

const AGENT_ICONS: Record<string, { bg: string; border: string; color: string; icon: string }> = {
  "submittal-reviewer": { bg: "bg-blue-50", border: "border-blue-200", color: "text-blue-500", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  "rfi-drafter": { bg: "bg-amber-50", border: "border-amber-200", color: "text-amber-500", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" },
  "daily-log-compiler": { bg: "bg-emerald-50", border: "border-emerald-200", color: "text-emerald-500", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  "change-order-analyzer": { bg: "bg-violet-50", border: "border-violet-200", color: "text-violet-500", icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" },
  "safety-compliance-checker": { bg: "bg-rose-50", border: "border-rose-200", color: "text-rose-500", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  "bid-leveling-assistant": { bg: "bg-cyan-50", border: "border-cyan-200", color: "text-cyan-500", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" },
};

const GUIDE_CARD_IMAGES: Record<string, string> = {
  "general-contractors": "/blog/agentic-ai.jpeg",
  "owners-developers": "/blog/fmea-root-cause.jpeg",
  "specialty-contractors": "/blog/manufacturing-rfqs.jpeg",
};

const CONNECTOR_LOGOS: Record<string, { src: string; width: number; h: string }> = {
  procore: { src: "/logos/procore.svg", width: 130, h: "h-[14px]" },
  plangrid: { src: "/logos/plangrid.svg", width: 120, h: "h-[22px]" },
  "autodesk-build": { src: "/logos/autodesk.svg", width: 130, h: "h-[16px]" },
  bluebeam: { src: "/logos/bluebeam.svg", width: 120, h: "h-[14px]" },
  "sage-300-cre": { src: "/logos/sage.svg", width: 80, h: "h-[28px]" },
  "microsoft-project": { src: "/logos/microsoft-project.svg", width: 140, h: "h-[18px]" },
};

export default async function HomePage() {
  const [agentsData, connectorsData, guidesData] = await Promise.all([
    getAgents().catch(() => []),
    getConnectors().catch(() => []),
    getGuides().catch(() => []),
  ]);

  const agents = agentsData.length > 0 ? agentsData : PLACEHOLDER_AGENTS;
  const connectors = connectorsData.length > 0 ? connectorsData : PLACEHOLDER_CONNECTORS;
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
              <p className="text-xs font-medium text-black/75 mb-3 flex items-center gap-1.5"><svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 0.5L9.33 2.75V7.25L5 9.5L0.67 7.25V2.75L5 0.5Z" fill="#F97316"/></svg>AI-Powered Construction Platform</p>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.15] tracking-tight text-[#1a1a1a]">
                AI agents that
                <br />
                understand <span className="text-accent">construction</span>
              </h1>
              <p className="text-xs font-medium text-[#8a7e74] mt-6 mb-1">Integrates with the tools you already use</p>
              <LogoMarquee
                logos={connectors
                  .filter((c) => CONNECTOR_LOGOS[c.slug.current])
                  .map((c) => ({
                    slug: c.slug.current,
                    title: c.title,
                    src: CONNECTOR_LOGOS[c.slug.current].src,
                    width: CONNECTOR_LOGOS[c.slug.current].width,
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
          <div className="mb-12">
            <p className="text-xs font-medium text-black/75 mb-4">Featured Agents</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
              Purpose-built AI for your workflows
            </h2>
            <p className="mt-1 text-secondary max-w-2xl">
              Purpose-built AI for your most time-consuming workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredAgents.map((agent) => (
              <HoverCard key={agent._id}>
                <Link
                  href={`/agents/${agent.slug.current}`}
                  className="relative block h-full p-6 bg-background rounded-2xl border border-border group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 transition-transform duration-300 ease-out group-hover/card:-translate-x-[2px] group-hover/card:-translate-y-[2px]">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface text-secondary">
                        {agent.category?.title}
                      </span>
                      {agent.status === "coming-soon" && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    {(() => {
                      const iconData = AGENT_ICONS[agent.slug.current];
                      return (
                        <div className={`shrink-0 w-10 h-10 rounded-lg border ${iconData?.bg || "bg-accent/5"} ${iconData?.border || "border-accent/10"} flex items-center justify-center transition-transform duration-300 ease-out group-hover/card:translate-x-[2px] group-hover/card:-translate-y-[2px]`}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={iconData?.color || "text-accent"}>
                            <path d={iconData?.icon || "M13 10V3L4 14h7v7l9-11h-7z"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      );
                    })()}
                  </div>
                  <h3 className="text-lg font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[2px]">
                    {agent.title}
                  </h3>
                  <p className="mt-1 text-sm text-secondary transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                    {agent.shortDescription}
                  </p>
                </Link>
              </HoverCard>
            ))}
          </div>
          <div className="mt-10 text-right">
            <Link
              href="/agents"
              className="group inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-surface transition-all duration-200 ease-out"
            >
              View all agents<CtaArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Connectors grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-medium text-black/75 mb-4">Connectors</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
              Plug into your existing stack
            </h2>
            <p className="mt-1 text-secondary max-w-2xl">
              Seamlessly connect the construction tools your team already relies on.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectors.map((connector) => {
              const logo = CONNECTOR_LOGOS[connector.slug.current];
              return (
                <HoverCard key={connector._id}>
                  <Link
                    href={`/connectors/${connector.slug.current}`}
                    className="relative block h-full p-6 bg-background rounded-2xl border border-border group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                  >
                    <div className="mb-4 h-8 flex items-center transition-transform duration-300 ease-out group-hover/card:-translate-y-[2px]">
                      {logo ? (
                        <Image
                          src={logo.src}
                          alt={connector.title}
                          width={logo.width}
                          height={32}
                          className={`${logo.h} w-auto object-contain opacity-70 group-hover/card:opacity-100 transition-opacity duration-300 ease-out`}
                        />
                      ) : (
                        <span className="text-base font-medium text-foreground">
                          {connector.title}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-secondary line-clamp-2 transition-transform duration-300 ease-out group-hover/card:translate-y-[1px]">
                      {connector.shortDescription}
                    </p>
                  </Link>
                </HoverCard>
              );
            })}
          </div>
          <div className="mt-10 text-right">
            <Link
              href="/connectors"
              className="group inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-surface transition-all duration-200 ease-out"
            >
              View all connectors<CtaArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-black/75 mb-4">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
              Get up and running in minutes
            </h2>
            <p className="mt-1 text-secondary">
              Get up and running in minutes, not months.
            </p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Connector line on desktop */}
            <div className="hidden md:block absolute top-6 left-[16.67%] right-[16.67%] h-px bg-border" />
            {[
              {
                step: "1",
                title: "Connect your tools",
                description:
                  "Link Procore, PlanGrid, Autodesk Build, or any of our supported integrations in a few clicks.",
              },
              {
                step: "2",
                title: "Choose your agents",
                description:
                  "Pick from our library of construction-specific AI agents — each trained on real project workflows.",
              },
              {
                step: "3",
                title: "Automate & review",
                description:
                  "Agents process your documents and data, delivering structured outputs you can review and approve.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="relative z-10 mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-hover text-accent-foreground flex items-center justify-center text-lg font-medium shadow-sm">
                  {item.step}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-[#f5f1ed] overflow-hidden">
        <BlueprintBg variant="agents" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-black/75 mb-4">By the Numbers</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
              Proven impact at scale
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Documents processed" },
              { number: "200+", label: "Teams onboarded" },
              { number: "80%", label: "Faster reviews" },
              { number: "99.9%", label: "Platform uptime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[2.5rem] sm:text-5xl font-medium text-accent">
                  {stat.number}
                </p>
                <p className="mt-2 text-sm text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Guides */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-medium text-black/75 mb-4">Industry Guides</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
              Built for how you build
            </h2>
            <p className="mt-1 text-secondary max-w-2xl">
              Explore AI workflows tailored to your role in the construction industry.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(INDUSTRY_DATA).map(([slug, industry]) => (
              <HoverCard key={slug}>
                <Link
                  href={`/guides/${slug}`}
                  className="relative block h-full bg-background rounded-2xl border border-border overflow-hidden group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={GUIDE_CARD_IMAGES[slug] || "/blog/property-management.jpeg"}
                      alt={industry.title}
                      fill
                      className="object-cover group-hover/card:scale-[1.03] transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-foreground group-hover/card:text-accent transition-colors duration-300 ease-out">
                      {industry.title}
                    </h3>
                    <p className="mt-1 text-sm text-secondary line-clamp-2">
                      {industry.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {industry.agentSlugs.slice(0, 3).map((s) => {
                        const agent = agents.find((a) => a.slug.current === s);
                        return agent ? (
                          <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-surface text-tertiary">
                            {agent.title}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                </Link>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* From the Blog */}
      <section className="py-16 sm:py-20 lg:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-2">
            <p className="text-xs font-medium text-black/75 mb-4">From the Blog</p>
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
              image: GUIDE_IMAGES[guide.slug.current] || "/blog/tenant-screening.jpeg",
            }))}
          />
        </div>
      </section>

      {/* Final CTA section */}
      <section className="bg-[#f1e8e0] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: construction image — bleeds to left edge */}
          <div className="relative min-h-[400px]">
            <Image
              src="/blog/insurance-compliance.jpeg"
              alt="Construction site"
              fill
              className="object-cover"
            />
          </div>
          {/* Right: headline, sub, CTA */}
          <div className="py-20 sm:py-24 lg:py-32 px-8 sm:px-12 lg:px-16 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-[1.1]">
                Ready to put AI to work on your projects?
              </h2>
              <p className="mt-1 text-lg text-secondary max-w-xl">
                Join the general contractors and owners who are saving thousands of hours with Datagrid.
              </p>
              <div className="mt-10">
                <Link
                  href="/demo"
                  className="group inline-flex items-center px-8 py-4 text-base font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out"
                >
                  Request a Demo<CtaArrow />
                </Link>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}
