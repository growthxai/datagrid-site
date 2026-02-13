import Link from "next/link";
import Image from "next/image";
import { getAgentBySlug } from "@/lib/queries";
import { PLACEHOLDER_AGENTS } from "@/lib/placeholder-data";
import { getGuidesForAgent, getUseCasesForAgent } from "@/lib/cross-references";
import BlueprintBg from "@/components/blueprint-bg";
import PageHeader from "@/components/page-header";
import HoverCard from "@/components/hover-card";
import CtaArrow from "@/components/cta-arrow";
import { AGENT_ICONS, CONNECTOR_ICON } from "@/lib/nav-data";
import type { Agent } from "@/lib/types";

const GUIDE_IMAGES: Record<string, string> = {
  "ai-agents-submittal-review": "/blog/submittal-review.jpeg",
  "ai-rfi-management": "/blog/rfi-management.jpeg",
  "construction-document-search": "/blog/document-search.jpeg",
  "reducing-change-order-disputes": "/blog/change-orders.jpeg",
  "ai-safety-inspections": "/blog/safety-inspections.jpeg",
  "gc-guide-ai-adoption": "/blog/gc-ai-adoption.jpeg",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug).catch(() => null);
  const fallback = PLACEHOLDER_AGENTS.find((a) => a.slug.current === slug);
  const data = agent || fallback;
  return {
    title: data?.title || "Agent",
    description: data?.shortDescription || "AI agent for construction.",
  };
}

export default async function AgentDetailPage({ params }: Props) {
  const { slug } = await params;
  const agentData = await getAgentBySlug(slug).catch(() => null);
  const agent = (agentData || PLACEHOLDER_AGENTS.find((a) => a.slug.current === slug) || PLACEHOLDER_AGENTS[0]) as Agent;

  const relatedGuides = getGuidesForAgent(slug);
  const useCases = getUseCasesForAgent(slug);
  const iconData = AGENT_ICONS[agent.slug.current];

  return (
    <>
      <PageHeader
        breadcrumb={`Product / Agents / ${agent.title}`}
        title={agent.title}
        description={agent.description || agent.shortDescription}
        variant="agents"
        heroBg="white"
        headerRight={
          <div className={`hidden sm:flex shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl border ${iconData?.bg || "bg-accent/5"} ${iconData?.border || "border-accent/10"} items-center justify-center`}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className={`lg:w-11 lg:h-11 ${iconData?.color || "text-accent"}`}>
              <path d={iconData?.icon || "M13 10V3L4 14h7v7l9-11h-7z"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        }
      />

      {/* Documentation body */}
      <div className="pt-6 pb-14 sm:pt-8 sm:pb-18 lg:pt-10 lg:pb-22 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14 lg:gap-16">
            {/* Left column: Overview + Inputs/Outputs */}
            <div>
              <section className="mb-14">
                <h2 className="text-2xl font-medium text-foreground mb-4">Overview</h2>
                <p className="text-base text-secondary leading-relaxed mb-4">
                  {agent.jobToBeDone || "This agent automates a key construction workflow, saving your team hours of manual work."}
                </p>
                <p className="text-base text-secondary leading-relaxed">
                  The {agent.title} connects to your existing project tools, processes documents
                  on-the-fly, and returns structured results — so your team can focus on decisions
                  rather than data wrangling.
                </p>
              </section>

              {/* Inputs / Outputs */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
                <div className="p-6 bg-surface rounded-2xl border border-border">
                  <h3 className="text-base font-medium text-foreground mb-4 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent">
                      <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Inputs
                  </h3>
                  <ul className="space-y-2.5">
                    {(agent.inputs || ["Project documents", "Field data"]).map((input: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-secondary">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
                        {input}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-surface rounded-2xl border border-border">
                  <h3 className="text-base font-medium text-foreground mb-4 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent">
                      <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 16V4m0 0l4 4m-4-4L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Outputs
                  </h3>
                  <ul className="space-y-2.5">
                    {(agent.outputs || ["Structured report", "Action items"]).map((output: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-secondary">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

            </div>

            {/* Right column: CTA card + How it works + Use Cases */}
            <div>
              {/* Agent info + CTA */}
              <div className="p-5 rounded-2xl border border-border bg-surface mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Link
                    href="/demo"
                    className="group group/cta relative overflow-hidden flex-1 inline-flex items-center justify-center h-10 px-5 text-sm font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out"
                  >
                    <span className="relative z-10 inline-flex items-center">Use Agent<CtaArrow /></span>
                    <span className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300 bg-[linear-gradient(90deg,transparent_0%,transparent_30%,rgba(255,255,255,0.3)_45%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0.3)_55%,transparent_70%,transparent_100%)] bg-[length:200%_100%] group-hover/cta:animate-[shimmer-wave_1.5s_ease-in-out_infinite]" />
                  </Link>
                  <button
                    type="button"
                    className="shrink-0 inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-black/[0.04] transition-all duration-200 ease-out"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                    </svg>
                    Share
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px] text-tertiary">
                  <span>v1.0 &middot; Last updated Jan 2025</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>
              </div>

              <section className="mb-10">
                <h2 className="text-xl font-medium text-foreground mb-4">How it works</h2>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Connect your data sources", desc: "Link the agent to your project documents via any supported connector." },
                    { step: "2", title: "Run the agent", desc: `Provide the required inputs and the ${agent.title} processes them automatically.` },
                    { step: "3", title: "Review structured output", desc: "Get clear, actionable results you can share with your team." },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-[11px] font-semibold">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="text-xs text-secondary mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Use Cases */}
              {useCases.length > 0 && (
                <section>
                  <h2 className="text-xl font-medium text-foreground mb-4">Use cases</h2>
                  <div className="flex flex-wrap gap-2">
                    {useCases.map((uc) => (
                      <Link
                        key={uc.slug}
                        href={`/agents/for/${uc.slug}`}
                        className="text-xs px-2.5 py-1 rounded-full bg-surface border border-border text-secondary hover:text-foreground hover:border-accent/30 transition-all duration-200 ease-out"
                      >
                        {uc.title}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Compatible Connectors */}
      {agent.connectors && agent.connectors.length > 0 && (
        <div className="pb-14 sm:pb-18 lg:pb-22 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-foreground mb-8">
              Compatible Connectors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {agent.connectors.map((conn: { _id: string; title: string; slug: { current: string }; shortDescription?: string }) => {
                const icon = CONNECTOR_ICON[conn.slug.current];
                return (
                  <HoverCard key={conn._id}>
                    <Link
                      href={`/connectors/${conn.slug.current}`}
                      className="relative flex flex-col h-full p-6 bg-background rounded-2xl border border-border group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden transition-transform duration-300 ease-out group-hover/card:-translate-x-[2px] group-hover/card:-translate-y-[2px]">
                          {icon ? (
                            <Image
                              src={icon}
                              alt={conn.title}
                              width={20}
                              height={20}
                              className="w-5 h-5 object-contain"
                            />
                          ) : (
                            <span className="text-sm font-medium text-accent">
                              {conn.title.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-lg font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px]">
                        {conn.title}
                      </h3>
                      {conn.shortDescription && (
                        <p className="mt-1 text-sm text-secondary line-clamp-2 transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                          {conn.shortDescription}
                        </p>
                      )}
                    </Link>
                  </HoverCard>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <div className="pb-14 sm:pb-18 lg:pb-22 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-medium text-[#4b4036] mb-4">Learn More</p>
            <h2 className="text-2xl font-medium text-foreground mb-8">
              Related Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedGuides.map((guide, i) => {
                const img = GUIDE_IMAGES[guide.slug.current];
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
                        <span className="text-[11px] font-medium text-accent/70 mb-3">
                          Guide {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-base font-medium leading-snug text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px]">
                          {guide.title}
                        </h3>
                        {guide.excerpt && (
                          <p className="mt-2 text-sm text-secondary leading-relaxed line-clamp-3 transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                            {guide.excerpt}
                          </p>
                        )}
                        <div className="mt-auto pt-4 flex items-center justify-end">
                          <span className="text-sm font-medium inline-flex items-center use-agent-shimmer">
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
          </div>
        </div>
      )}

      {/* Pre-footer CTA */}
      <section className="relative py-20 sm:py-28 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="agents" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-[1.1]">
            Build your first AI<br />Agent in minutes
          </h2>
          <p className="mt-4 text-base text-secondary">
            Free to get started. No credit card required.
          </p>
          <Link
            href="/get-started"
            className="mt-6 inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-150"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}
