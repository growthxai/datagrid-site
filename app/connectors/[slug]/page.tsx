import Link from "next/link";
import Image from "next/image";
import { getConnectorBySlug } from "@/lib/queries";
import { PLACEHOLDER_CONNECTORS, PLACEHOLDER_GUIDES } from "@/lib/placeholder-data";
import { getAgentsForConnector, getGuidesForConnector } from "@/lib/cross-references";
import BlueprintBg from "@/components/blueprint-bg";
import PageHeader from "@/components/page-header";
import HoverCard from "@/components/hover-card";
import { AGENT_ICONS, CONNECTOR_ICON } from "@/lib/nav-data";
import type { DataEndpoint } from "@/lib/types";

const GUIDE_IMAGES: Record<string, string> = {
  "ai-agents-submittal-review": "/blog/submittal-review.jpeg",
  "ai-rfi-management": "/blog/rfi-management.jpeg",
  "construction-document-search": "/blog/document-search.jpeg",
  "reducing-change-order-disputes": "/blog/change-orders.jpeg",
  "ai-safety-inspections": "/blog/safety-inspections.jpeg",
  "gc-guide-ai-adoption": "/blog/gc-ai-adoption.jpeg",
  "getting-started-connectors": "/blog/connectors-setup.jpeg",
  "automate-insurance-compliance-management": "/blog/insurance-compliance.jpeg",
  "commercial-tenant-screening-automation-ai": "/blog/tenant-screening.jpeg",
  "what-is-ieq-tenant-retention": "/blog/ieq-tenant-retention.jpeg",
  "property-management-workflow-automation": "/blog/property-management.jpeg",
  "gmp-meaning-manufacturing-guide-ai": "/blog/gmp-manufacturing.jpeg",
  "poka-yoke-mistake-proofing-manufacturing-ai": "/blog/poka-yoke.jpeg",
  "ai-preconstruction-workflows": "/blog/preconstruction-ai.jpeg",
  "drawing-comparison-ai": "/blog/drawing-comparison.jpeg",
  "hidden-cost-manual-daily-reporting": "/blog/daily-reporting-cost.jpeg",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const connector = await getConnectorBySlug(slug).catch(() => null);
  const fallback = PLACEHOLDER_CONNECTORS.find((c) => c.slug.current === slug);
  const data = connector || fallback;
  return {
    title: data?.title ? `${data.title} Connector` : "Connector",
    description: data?.shortDescription || "Connect your construction tools with Datagrid.",
  };
}

export default async function ConnectorDetailPage({ params }: Props) {
  const { slug } = await params;
  const connectorData = await getConnectorBySlug(slug).catch(() => null);
  const connector = (connectorData ||
    PLACEHOLDER_CONNECTORS.find((c) => c.slug.current === slug) ||
    PLACEHOLDER_CONNECTORS[0]) as import("@/lib/types").Connector & { agentCount?: number };

  const supportedAgents = getAgentsForConnector(slug);
  const relatedGuides = getGuidesForConnector(slug);
  const displayGuides = relatedGuides.length > 0
    ? relatedGuides.slice(0, 3)
    : PLACEHOLDER_GUIDES.slice(0, 3);

  const icon = CONNECTOR_ICON[connector.slug.current];

  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Product", href: "/product" },
          { label: "Connectors", href: "/connectors" },
          { label: connector.title },
        ]}
        title={connector.title}
        description={connector.shortDescription}
        variant="connectors"
        heroBg="white"
        eyebrow="Connector"
        headerRight={
          <div className="hidden sm:flex shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-surface border border-border items-center justify-center">
            {icon ? (
              <Image
                src={icon}
                alt={connector.title}
                width={48}
                height={48}
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
              />
            ) : (
              <span className="text-3xl font-medium text-accent">
                {connector.title.charAt(0)}
              </span>
            )}
          </div>
        }
      />

      {/* Documentation body */}
      <div className="pb-14 sm:pb-18 lg:pb-22 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14 lg:gap-16">
            {/* Left column: Overview + Setup + Data access */}
            <div>
              <section className="mb-14">
                <h2 className="text-2xl font-medium text-foreground mb-4">Overview</h2>
                {(connector.description || "").split("\n\n").map((p: string, i: number) => (
                  <p key={i} className="text-base text-secondary leading-relaxed mb-4 last:mb-0">
                    {p || `The ${connector.title} connector enables Datagrid AI agents to read and write data directly from your ${connector.title} environment. Once connected, agents can pull project documents, submittals, RFIs, daily logs, and other records — then push structured outputs back without leaving your existing workflow.`}
                  </p>
                ))}
              </section>

              {/* Setup */}
              <section className="mb-14">
                <h2 className="text-2xl font-medium text-foreground mb-4">How-to</h2>

                {/* Prerequisites */}
                {connector.prerequisites && connector.prerequisites.length > 0 && (
                  <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/40 mb-6">
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="text-base">💡</span>
                      Pre-Requisites
                    </h3>
                    <p className="text-xs text-secondary mb-3">
                      For a smooth setup of your {connector.title} Connector, please make sure you have the following ready:
                    </p>
                    <ul className="space-y-2">
                      {connector.prerequisites.map((req: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-secondary">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(() => {
                  const steps = connector.setupSteps && connector.setupSteps.length > 0
                    ? connector.setupSteps
                    : [
                        { title: "Configure", slug: "configure", bg: "bg-accent/5", icon: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" },
                        { title: "Set Up a Schedule", slug: "set-up-a-schedule", bg: "bg-accent/5", icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" },
                        { title: "Create a Dataset", slug: "create-a-dataset", bg: "bg-accent/5", icon: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" },
                      ];
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {steps.map((step: { title: string; slug: string; bg: string; icon: string }, idx: number) => (
                        <HoverCard key={step.slug}>
                          <Link
                            href={`/connectors/${slug}/${step.slug}`}
                            className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-background group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                          >
                            <div className={`${step.bg} relative flex items-center justify-center aspect-[4/3] border-b border-border`}>
                              <span className="absolute top-3 left-3 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-[11px] font-semibold">{idx + 1}</span>
                              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-accent/60 group-hover/card:text-accent group-hover/card:scale-105 transition-all duration-300 ease-out">
                                <path d={step.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <div className="px-4 py-3 flex items-center justify-between">
                              <p className="text-sm font-medium text-foreground group-hover/card:text-accent transition-colors duration-300">{step.title}</p>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-tertiary group-hover/card:text-accent transition-colors duration-300">
                                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </Link>
                        </HoverCard>
                      ))}
                    </div>
                  );
                })()}
              </section>

              {/* Data Access */}
              {(() => {
                const DEFAULT_ENDPOINTS: DataEndpoint[] = [
                  { name: "Submittals", category: "Project Management", level: "Project", listShow: "List, Show", incrementalIngestion: true, read: true },
                  { name: "RFIs", category: "Project Management", level: "Project", listShow: "List, Show", incrementalIngestion: true, read: true },
                  { name: "Daily Logs", category: "Project Management", level: "Project", listShow: "List", incrementalIngestion: true, read: true },
                  { name: "Change Orders", category: "Construction Financials", level: "Project", listShow: "List, Show", incrementalIngestion: true, read: true },
                  { name: "Drawings", category: "Project Management", level: "Project", listShow: "List", incrementalIngestion: true, read: true },
                  { name: "Documents", category: "Core Tools", level: "Project", listShow: "List", incrementalIngestion: true, read: true },
                  { name: "Specifications", category: "Project Management", level: "Project", listShow: "List", incrementalIngestion: true, read: true },
                  { name: "Schedules", category: "Project Management", level: "Project", listShow: "List, Show", incrementalIngestion: true, read: true },
                  { name: "Budgets", category: "Construction Financials", level: "Project", listShow: "List", incrementalIngestion: true, read: true },
                  { name: "Contracts", category: "Construction Financials", level: "Project", listShow: "List, Show", incrementalIngestion: true, read: true },
                ];
                const endpoints = connector.dataEndpoints && connector.dataEndpoints.length > 0
                  ? connector.dataEndpoints
                  : DEFAULT_ENDPOINTS;
                const categories = endpoints.reduce<Record<string, DataEndpoint[]>>((acc, ep) => {
                  (acc[ep.category] ||= []).push(ep);
                  return acc;
                }, {});
                return (
                  <section>
                    <h2 className="text-2xl font-medium text-foreground mb-2">Data Access</h2>
                    <p className="text-sm text-secondary mb-6">
                      Datagrid can access the following data points from {connector.title}. Listed alphabetically by endpoint.
                    </p>
                    <div className="space-y-4">
                      {Object.entries(categories).map(([cat, eps]) => (
                        <details key={cat} className="group/details rounded-xl border border-border overflow-hidden">
                          <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer select-none bg-surface/50 hover:bg-surface transition-colors duration-150">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-tertiary shrink-0 transition-transform duration-200 group-open/details:rotate-90">
                              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm font-medium text-foreground">{cat}</span>
                            <span className="text-xs text-tertiary">{eps.length} endpoints</span>
                          </summary>
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="bg-surface text-left text-tertiary">
                                  <th className="py-2 px-3 font-medium">Endpoint</th>
                                  <th className="py-2 px-3 font-medium">Level</th>
                                  <th className="py-2 px-3 font-medium">Access</th>
                                  <th className="py-2 px-3 font-medium text-center">Incremental</th>
                                  <th className="py-2 px-3 font-medium text-center">Read</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                {eps.map((ep, i) => (
                                  <tr key={i} className="hover:bg-surface/50">
                                    <td className="py-2 px-3 text-foreground font-medium">{ep.name}</td>
                                    <td className="py-2 px-3 text-secondary">{ep.level}</td>
                                    <td className="py-2 px-3 text-secondary">{ep.listShow}</td>
                                    <td className="py-2 px-3 text-center">
                                      {ep.incrementalIngestion ? (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline text-emerald-500"><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                      ) : (
                                        <span className="text-tertiary">—</span>
                                      )}
                                    </td>
                                    <td className="py-2 px-3 text-center">
                                      {ep.read ? (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline text-emerald-500"><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                      ) : (
                                        <span className="text-tertiary">—</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                );
              })()}
            </div>

            {/* Right column: sidebar */}
            <aside>
              <div className="sticky top-[154px] space-y-8">
                {/* Featured Agents */}
                {supportedAgents.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-tertiary mb-3">
                      Featured {connector.title} Agents
                    </p>
                    <div className="space-y-2.5">
                      {supportedAgents.slice(0, 3).map((agent) => {
                        const iconData = AGENT_ICONS[agent.slug.current];
                        return (
                          <HoverCard key={agent._id}>
                            <Link
                              href={`/agents/${agent.slug.current}`}
                              className="group block p-3 rounded-xl border border-border bg-background hover:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                            >
                              <div className="flex items-center gap-2.5 mb-1">
                                <div className={`shrink-0 w-6 h-6 rounded-md border ${iconData?.bg || "bg-accent/5"} ${iconData?.border || "border-accent/10"} flex items-center justify-center`}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={iconData?.color || "text-accent"}>
                                    <path d={iconData?.icon || "M13 10V3L4 14h7v7l9-11h-7z"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                                <p className="text-sm font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out leading-snug group-hover/card:-translate-x-[1px]">
                                  {agent.title}
                                </p>
                              </div>
                              <p className="mt-0.5 text-xs text-tertiary line-clamp-2 leading-snug transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                                {agent.shortDescription}
                              </p>
                            </Link>
                          </HoverCard>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* FAQ */}
                <div>
                  <p className="text-xs font-medium text-tertiary mb-3">FAQ</p>
                  <div className="p-3 rounded-xl border border-border bg-background">
                    <p className="text-sm text-secondary leading-relaxed">
                      Don&apos;t see endpoints you&apos;re looking for? We&apos;re always happy to make new endpoints available.
                    </p>
                    <p className="text-sm text-secondary mt-2">
                      Contact our support at{" "}
                      <a href="mailto:support@datagrid.ai" className="text-accent hover:underline">support@datagrid.ai</a>
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Supported Agents */}
      {supportedAgents.length > 0 && (
        <div className="pb-14 sm:pb-18 lg:pb-22 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-foreground mb-8">
              Supported Agents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportedAgents.map((agent) => {
                const iconData = AGENT_ICONS[agent.slug.current];
                return (
                  <HoverCard key={agent._id}>
                    <Link
                      href={`/agents/${agent.slug.current}`}
                      className="relative flex flex-col h-full p-6 bg-background rounded-2xl border border-border group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className={`shrink-0 w-10 h-10 rounded-lg border ${iconData?.bg || "bg-accent/5"} ${iconData?.border || "border-accent/10"} flex items-center justify-center transition-transform duration-300 ease-out group-hover/card:-translate-x-[2px] group-hover/card:-translate-y-[2px]`}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={iconData?.color || "text-accent"}>
                            <path
                              d={iconData?.icon || "M13 10V3L4 14h7v7l9-11h-7z"}
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface text-secondary">
                          {agent.category?.title}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[2px]">
                        {agent.title}
                      </h3>
                      <p className="mt-1 text-sm text-secondary line-clamp-2 transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                        {agent.shortDescription}
                      </p>
                      <div className="mt-auto pt-5 flex items-center justify-end transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                        <span className="text-sm font-medium inline-flex items-center use-agent-shimmer">
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
        </div>
      )}

      {/* Related Guides */}
      <div className="pb-14 sm:pb-18 lg:pb-22 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-[#a29080] mb-4">Learn More</p>
          <h2 className="text-2xl font-medium text-foreground mb-8">
            Related Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayGuides.map((guide, i) => {
              const img = GUIDE_IMAGES[(guide as { slug: { current: string } }).slug.current];
              return (
                <HoverCard key={guide._id}>
                  <Link
                    href={`/blog/${(guide as { slug: { current: string } }).slug.current}`}
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

      {/* Pre-footer CTA */}
      <section className="relative py-20 sm:py-28 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="connectors" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-[1.1]">
            Connect your tools<br />in minutes
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
