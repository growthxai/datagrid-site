import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/page-header";
import HoverCard from "@/components/hover-card";
import CtaArrow from "@/components/cta-arrow";
import BlueprintBg from "@/components/blueprint-bg";
import { getAgents, getConnectors } from "@/lib/queries";
import { PLACEHOLDER_AGENTS, PLACEHOLDER_CONNECTORS } from "@/lib/placeholder-data";
import { AGENT_ICONS, CONNECTOR_ICON } from "@/lib/nav-data";

export default async function ProductPage() {
  const [agentsData, connectorsData] = await Promise.all([
    getAgents().catch(() => []),
    getConnectors().catch(() => []),
  ]);

  const agents = (agentsData.length > 0 ? agentsData : PLACEHOLDER_AGENTS).slice(0, 3);
  const connectors = (connectorsData.length > 0 ? connectorsData : PLACEHOLDER_CONNECTORS).slice(0, 4);

  return (
    <>
      <PageHeader
        breadcrumb="Home / Product"
        title="The Datagrid Platform"
        description="AI agents and integrations purpose-built for construction — from preconstruction through closeout."
        variant="agents"
      />

      {/* Agentic AI intro */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-foreground leading-[1.1]">
                Agentic AI designed for the <span className="text-accent">Built World</span>
              </h2>
              <p className="mt-5 text-secondary max-w-lg">
                Datagrid helps project teams work up to 95% faster, turning hours of manual document handling into minutes and keeping every project on track.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-emerald-600">
                    <path d="M12 2L2 12l10 10 10-10L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8L8 12l4 4 4-4-4-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-foreground">Automate What Slows You Down</h3>
                <p className="mt-2 text-sm text-secondary leading-relaxed">
                  From analyzing thousands of documents to managing real-time project updates, Datagrid replaces repetitive work with automated execution.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber-600">
                    <path d="M4 6l4-2 4 2 4-2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 12l4-2 4 2 4-2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 18l4-2 4 2 4-2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-foreground">Focus on What Matters</h3>
                <p className="mt-2 text-sm text-secondary leading-relaxed">
                  With the busywork off their plate, your team can focus on keeping projects on time and running smoothly from start to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Datagrid Apart */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f5f1ed]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
              What Sets Datagrid Apart
            </h2>
            <p className="mt-4 text-secondary max-w-2xl mx-auto">
              Unlike generic AI tools that summarize or search, Datagrid&apos;s agentic AI reasons, plans, and executes across your data and tools, delivering real answers, clear insights, and work that gets done.
            </p>
          </div>

          {/* Knowledge */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#4b4036]">Knowledge</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-foreground leading-tight">
                Get Answers You Can <span className="text-accent">Trust</span>
              </h3>
              <p className="mt-4 text-secondary leading-relaxed">
                Datagrid doesn&apos;t just generate responses — it delivers data-backed insights grounded in your project files. Every answer reflects your drawings, specs, and schedules, so you can make decisions with confidence instead of guesswork.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-foreground">AI Assistant</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-surface border border-border text-secondary">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /></svg>
                    Procore Data
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-surface border border-border text-secondary">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" stroke="currentColor" strokeWidth="2" /></svg>
                    Building Permits
                  </span>
                </div>
                <p className="text-sm text-secondary leading-relaxed italic">
                  &ldquo;Verify if the condition in this photo complies with the specs we have in the system.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
            <div className="order-2 lg:order-1 rounded-2xl border border-border bg-background p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-accent/10 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-accent"><path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span className="text-sm font-medium text-foreground">Closeout Companion</span>
                </div>
                <span className="text-xs text-secondary">Reasoning</span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-tertiary mb-1.5">Plan</p>
                  <p className="text-sm text-secondary italic leading-relaxed border-l-2 border-accent/20 pl-3">
                    Summarize all open punch items after Substantial Completion by combining information from the dataset and the attached image.
                  </p>
                </div>
                <div className="space-y-2 pt-1">
                  <p className="text-sm text-foreground flex items-start gap-2">
                    <span className="shrink-0 mt-1 w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-emerald-600"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    Extract punch-item details and status indicators from the attached close-out image.
                  </p>
                  <p className="text-sm text-foreground flex items-start gap-2">
                    <span className="shrink-0 mt-1 w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-emerald-600"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    Pull all Open Item entries from the OPC 10 Close-Out Check List dataset.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2.5 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent">
                  <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#4b4036]">Tools</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-foreground leading-tight">
                Built to <span className="text-accent">Understand</span>
              </h3>
              <p className="mt-4 text-secondary leading-relaxed">
                Datagrid doesn&apos;t stop at pulling information — it interprets it. Agents go beyond language models to process text, drawings, spreadsheets, and even videos to interpret information, perform calculations, and surface what matters. Visual and analytical intelligence combine so you can get real work done.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#4b4036]">Actions</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-foreground leading-tight">
                Turn Prompts into <span className="text-accent">Progress</span>
              </h3>
              <p className="mt-4 text-secondary leading-relaxed">
                Datagrid&apos;s agents act directly inside your systems to handle all the tasks you usually do by hand. With a single prompt, they can draft RFIs, run compliance checks, fill out forms, and send updates so your projects stay on track without the manual grind. Insight becomes action everywhere your team already works.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-surface border border-border flex items-center justify-center overflow-hidden">
                    <Image src="/logos/procore.svg" alt="Procore" width={14} height={14} className="w-3.5 h-3.5 object-contain" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Procore RFI</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-accent text-accent-foreground">Create</span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-medium text-tertiary mb-1">Subject</p>
                  <p className="text-sm text-foreground">Curtain Wall Anchor Detail — Level 12 Conflict with Post-Tension Slab</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-tertiary mb-1">Question</p>
                  <p className="text-sm text-secondary leading-relaxed">The anchoring detail shows embed plates, but Level 12 slab is post-tensioned. Should the detail be modified? If so, provide an alternate solution.</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-tertiary mb-1">Due date</p>
                  <p className="text-sm text-foreground">05/07/2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium text-[#4b4036] mb-4">AI Agents</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
              Purpose-built AI for construction workflows
            </h2>
            <p className="mt-3 text-secondary">
              Datagrid agents automate the document-heavy work that slows construction teams down — submittal reviews, RFI validation, daily logs, scope checks, and more. Each agent is trained on construction standards and connects directly to your project data.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((agent) => {
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
          <div className="mt-10 text-center">
            <Link
              href="/agents"
              className="inline-flex group items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-black/[0.03] transition-all duration-200 ease-out"
            >
              View all agents<CtaArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Connectors Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium text-[#4b4036] mb-4">Connectors</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
              Plug into your existing stack
            </h2>
            <p className="mt-3 text-secondary">
              Datagrid connects to the tools your team already uses — Procore, Autodesk, SharePoint, Oracle Aconex, and more. No migration, no double-entry. Your agents read and write directly to your systems of record.
            </p>
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
          <div className="mt-10 text-center">
            <Link
              href="/connectors"
              className="inline-flex group items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-black/[0.03] transition-all duration-200 ease-out"
            >
              View all connectors<CtaArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="relative py-20 sm:py-28 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="agents" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-[1.1]">
            Ready to put AI to work<br />on your projects?
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
