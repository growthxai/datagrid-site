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

const GUIDE_IMAGES: Record<string, string> = {
  "ai-agents-submittal-review": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
  "getting-started-connectors": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
  "gc-guide-ai-adoption": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
};

const CONNECTOR_LOGOS: Record<string, { src: string; width: number }> = {
  procore: { src: "/logos/procore.svg", width: 130 },
  plangrid: { src: "/logos/plangrid.svg", width: 120 },
  "autodesk-build": { src: "/logos/autodesk.svg", width: 130 },
  bluebeam: { src: "/logos/bluebeam.svg", width: 120 },
  "sage-300-cre": { src: "/logos/sage.svg", width: 80 },
  "microsoft-project": { src: "/logos/microsoft-project.svg", width: 140 },
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
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/10 flex items-center justify-center transition-transform duration-300 ease-out group-hover/card:translate-x-[2px] group-hover/card:-translate-y-[2px]">
                      <span className="text-sm font-medium text-accent">{agent.title.charAt(0)}</span>
                    </div>
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
                    <div className="flex justify-end mb-4">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center transition-transform duration-300 ease-out group-hover/card:translate-x-[2px] group-hover/card:-translate-y-[2px]">
                        {logo ? (
                          <Image
                            src={logo.src}
                            alt=""
                            width={24}
                            height={24}
                            className="w-5 h-5 object-contain opacity-60"
                          />
                        ) : (
                          <span className="text-sm font-medium text-secondary">
                            {connector.title.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[2px]">
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

      {/* Guides / pSEO */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-2">
            <p className="text-xs font-medium text-black/75 mb-4">Guides & Resources</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
              Learn from the best in construction AI
            </h2>
            <p className="mt-1 text-secondary max-w-2xl">
              Practical guides and insights to help your team get the most out of AI.
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
              image: GUIDE_IMAGES[guide.slug.current] || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
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
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80"
              alt="Construction site"
              fill
              className="object-cover"
            />
          </div>
          {/* Right: headline, sub, CTA */}
          <div className="py-20 sm:py-24 lg:py-32 px-8 sm:px-12 lg:px-16 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-tight">
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
