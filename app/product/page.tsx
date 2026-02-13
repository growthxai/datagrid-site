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
