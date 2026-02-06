import Link from "next/link";
import { getAgents } from "@/lib/queries";
import { PLACEHOLDER_AGENTS } from "@/lib/placeholder-data";

type Props = { params: Promise<{ useCase: string }> };

export async function generateMetadata({ params }: Props) {
  const { useCase } = await params;
  const title = useCase
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `AI Agents for ${title}`,
    description: `Discover how Datagrid AI agents help with ${title.toLowerCase()} in construction.`,
  };
}

export default async function UseCasePage({ params }: Props) {
  const { useCase } = await params;
  const agentsData = await getAgents().catch(() => []);
  const agents = agentsData.length > 0 ? agentsData : PLACEHOLDER_AGENTS;

  const title = useCase
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* DESIGN: pSEO hero — dynamic based on useCase slug */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            AI Agents for {title}
          </h1>
          <p className="mt-3 text-lg text-secondary max-w-2xl">
            See how Datagrid&apos;s AI agents automate {title.toLowerCase()}{" "}
            workflows for construction teams.
          </p>
        </div>

        {/* DESIGN: Content section — pSEO body copy goes here */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-secondary">
            Construction teams spend countless hours on {title.toLowerCase()}.
            Datagrid&apos;s AI agents are purpose-built to handle these workflows,
            integrating with your existing tools to deliver structured, reviewable
            outputs.
          </p>
        </div>

        {/* Recommended agents for this use case */}
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Recommended Agents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.slice(0, 3).map((agent) => (
            <Link
              key={agent._id}
              href={`/agents/${agent.slug.current}`}
              className="group block p-6 bg-background rounded-xl border border-border hover:border-accent/40 transition-colors"
            >
              <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                {agent.title}
              </h3>
              <p className="mt-2 text-sm text-secondary line-clamp-2">
                {agent.shortDescription}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/demo"
            className="px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
