import Link from "next/link";
import { getAgentBySlug } from "@/lib/queries";
import { PLACEHOLDER_AGENTS } from "@/lib/placeholder-data";
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

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* DESIGN: Agent hero */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-secondary">
              {agent.category?.title}
            </span>
            {agent.status === "coming-soon" && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent">
                Coming Soon
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {agent.title}
          </h1>
          <p className="mt-4 text-lg text-secondary max-w-3xl">
            {agent.description || agent.shortDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* DESIGN: What this agent does */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                What this agent does
              </h2>
              <p className="text-secondary leading-relaxed">
                {agent.jobToBeDone || "This agent automates a key construction workflow, saving your team hours of manual work."}
              </p>
            </section>

            {/* DESIGN: Inputs / Outputs */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Inputs
                </h3>
                <ul className="space-y-2">
                  {(agent.inputs || ["Project documents", "Field data"]).map(
                    (input: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-secondary"
                      >
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {input}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Outputs
                </h3>
                <ul className="space-y-2">
                  {(agent.outputs || ["Structured report", "Action items"]).map(
                    (output: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-secondary"
                      >
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {output}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </section>

            {/* DESIGN: Body content — portable text goes here */}
            {Boolean(agent.body) && (
              <section className="prose max-w-none">
                {/* TODO: Render portable text body */}
                <p className="text-secondary">
                  Detailed agent documentation will render here from Sanity portable text.
                </p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* DESIGN: Related connectors */}
            <div className="p-6 bg-muted rounded-xl">
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
                          className="block p-3 bg-background rounded-lg border border-border hover:border-accent/40 transition-colors"
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

            {/* DESIGN: CTA block */}
            <div className="p-6 bg-accent/5 border border-accent/20 rounded-xl text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Start using this agent
              </h3>
              <p className="text-sm text-secondary mb-4">
                See how {agent.title} can save your team hours every week.
              </p>
              <Link
                href="/demo"
                className="inline-flex px-5 py-2.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
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
