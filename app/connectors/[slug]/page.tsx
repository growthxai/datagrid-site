import Link from "next/link";
import Image from "next/image";
import { getConnectorBySlug } from "@/lib/queries";
import { PLACEHOLDER_CONNECTORS, PLACEHOLDER_GUIDES } from "@/lib/placeholder-data";
import { getAgentsForConnector, getGuidesForConnector } from "@/lib/cross-references";
import BlueprintBg from "@/components/blueprint-bg";
import PageHeader from "@/components/page-header";
import HoverCard from "@/components/hover-card";
import { AGENT_ICONS, CONNECTOR_ICON } from "@/lib/nav-data";

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
  const connector =
    connectorData ||
    PLACEHOLDER_CONNECTORS.find((c) => c.slug.current === slug) ||
    PLACEHOLDER_CONNECTORS[0];

  const supportedAgents = getAgentsForConnector(slug);
  const relatedGuides = getGuidesForConnector(slug);
  const displayGuides = relatedGuides.length > 0
    ? relatedGuides.slice(0, 3)
    : PLACEHOLDER_GUIDES.slice(0, 3);

  const icon = CONNECTOR_ICON[connector.slug.current];

  return (
    <>
      <PageHeader
        breadcrumb={`Product/Connectors/${connector.title}`}
        title={connector.title}
        description={connector.description || connector.shortDescription}
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
      <div className="pt-6 pb-14 sm:pt-8 sm:pb-18 lg:pt-10 lg:pb-22 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14 lg:gap-16">
            {/* Left column: Overview + Setup */}
            <div>
              <section className="mb-14">
                <h2 className="text-2xl font-medium text-foreground mb-4">Overview</h2>
                <p className="text-base text-secondary leading-relaxed mb-4">
                  The {connector.title} connector enables Datagrid AI agents to read and write data
                  directly from your {connector.title} environment. Once connected, agents can
                  pull project documents, submittals, RFIs, daily logs, and other records — then
                  push structured outputs back without leaving your existing workflow.
                </p>
                <p className="text-base text-secondary leading-relaxed">
                  All data stays encrypted in transit and at rest. Datagrid never stores your
                  project files — agents process documents on-the-fly and return results
                  directly to {connector.title}.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-foreground mb-4">Setup</h2>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Authorize your account", desc: `Click "Connect" and sign in to ${connector.title} using your existing credentials. Datagrid uses OAuth 2.0 — your password is never stored.` },
                    { step: "2", title: "Select projects", desc: "Choose which projects Datagrid agents can access. You can update this at any time from the Connectors settings page." },
                    { step: "3", title: "Assign agents", desc: "Pick from the agent library to start automating workflows. Agents begin processing within minutes of activation." },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="shrink-0 w-7 h-7 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-semibold">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-base font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-secondary mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right column: Supported data types + Permissions */}
            <div>
              <section className="mb-10">
                <h2 className="text-xl font-medium text-foreground mb-4">Supported data types</h2>
                <div className="space-y-1.5">
                  {[
                    { label: "Submittals", desc: "Spec sheets, shop drawings, product data" },
                    { label: "RFIs", desc: "Questions, responses, and attachments" },
                    { label: "Daily logs", desc: "Field reports, labor, weather, equipment" },
                    { label: "Change orders", desc: "Cost proposals, backup documentation" },
                    { label: "Drawings", desc: "Plan sets, revisions, markups" },
                    { label: "Documents", desc: "Contracts, specs, correspondence" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5 px-2.5 py-2 rounded-md bg-surface border border-border">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-accent shrink-0">
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                      <span className="text-xs font-medium text-foreground">{item.label}</span>
                      <span className="text-[11px] text-secondary ml-auto">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-medium text-foreground mb-4">Permissions required</h2>
                <p className="text-sm text-secondary leading-relaxed mb-3">
                  Datagrid requests the minimum permissions needed for your selected agents to function.
                  You can revoke access at any time.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Read project data", "Read documents", "Write agent outputs", "Read submittals", "Read RFIs"].map((perm) => (
                    <span key={perm} className="text-xs px-2.5 py-1 rounded-full bg-surface border border-border text-secondary">
                      {perm}
                    </span>
                  ))}
                </div>
              </section>
            </div>
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
