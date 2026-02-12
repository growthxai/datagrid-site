import Link from "next/link";
import { getAgentBySlug } from "@/lib/queries";
import { PLACEHOLDER_AGENTS } from "@/lib/placeholder-data";
import { getGuidesForAgent, getUseCasesForAgent } from "@/lib/cross-references";
import type { Agent } from "@/lib/types";

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

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Agent hero */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface text-secondary">
              {agent.category?.title}
            </span>
            {agent.status === "coming-soon" && (
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-accent/10 text-accent">
                Coming Soon
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            {agent.title}
          </h1>
          <p className="mt-1 text-lg text-secondary max-w-3xl">
            {agent.description || agent.shortDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* What this agent does */}
            <section>
              <h2 className="text-2xl font-medium text-foreground mb-4">
                What this agent does
              </h2>
              <p className="text-secondary leading-relaxed">
                {agent.jobToBeDone || "This agent automates a key construction workflow, saving your team hours of manual work."}
              </p>
            </section>

            {/* Inputs / Outputs */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-8 bg-surface rounded-2xl">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Inputs
                </h3>
                <ul className="space-y-3">
                  {(agent.inputs || ["Project documents", "Field data"]).map(
                    (input: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-secondary"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {input}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="p-8 bg-surface rounded-2xl">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Outputs
                </h3>
                <ul className="space-y-3">
                  {(agent.outputs || ["Structured report", "Action items"]).map(
                    (output: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-secondary"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {output}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </section>

            {/* Body content */}
            {Boolean(agent.body) && (
              <section className="prose max-w-none">
                <p className="text-secondary">
                  Detailed agent documentation will render here from Sanity portable text.
                </p>
              </section>
            )}

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <section>
                <p className="text-xs font-medium text-[#a29080] mb-4">Learn More</p>
                <h2 className="text-2xl font-medium text-foreground mb-6">
                  Related Guides
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedGuides.map((guide) => (
                    <Link
                      key={guide._id}
                      href={`/blog/${guide.slug.current}`}
                      className="group block p-6 bg-background rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out"
                    >
                      <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors duration-150">
                        {guide.title}
                      </h3>
                      {guide.excerpt && (
                        <p className="mt-2 text-sm text-secondary line-clamp-2">
                          {guide.excerpt}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Use Cases */}
            {useCases.length > 0 && (
              <section>
                <p className="text-xs font-medium text-[#a29080] mb-4">Explore</p>
                <h2 className="text-2xl font-medium text-foreground mb-6">
                  Use Cases
                </h2>
                <div className="flex flex-wrap gap-3">
                  {useCases.map((uc) => (
                    <Link
                      key={uc.slug}
                      href={`/agents/for/${uc.slug}`}
                      className="inline-flex px-4 py-2 text-sm font-medium rounded-full border border-border bg-background text-secondary hover:text-foreground hover:border-accent/30 hover:shadow-sm transition-all duration-200 ease-out"
                    >
                      {uc.title}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Related connectors */}
            <div className="p-8 bg-surface rounded-2xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Compatible Connectors
              </h3>
              {agent.connectors && agent.connectors.length > 0 ? (
                <ul className="space-y-3">
                  {agent.connectors.map(
                    (conn: {
                      _id: string;
                      title: string;
                      slug: { current: string };
                      shortDescription?: string;
                    }) => (
                      <li key={conn._id}>
                        <Link
                          href={`/connectors/${conn.slug.current}`}
                          className="block p-4 bg-background rounded-xl border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 ease-out"
                        >
                          <span className="text-sm font-medium text-foreground">
                            {conn.title}
                          </span>
                          {conn.shortDescription && (
                            <p className="text-xs text-secondary mt-1">
                              {conn.shortDescription}
                            </p>
                          )}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-sm text-secondary">
                  Connector integrations coming soon.
                </p>
              )}
            </div>

            {/* CTA block */}
            <div className="p-8 bg-accent/5 border-2 border-accent/20 rounded-2xl text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Start using this agent
              </h3>
              <p className="text-sm text-secondary mb-6">
                See how {agent.title} can save your team hours every week.
              </p>
              <Link
                href="/demo"
                className="inline-flex px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out"
              >
                Request a Demo
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
