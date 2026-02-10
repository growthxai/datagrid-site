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
    <>
      {/* Dark hero header */}
      <section className="relative py-16 sm:py-20 overflow-hidden hero-glow">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(37,99,235,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-black/75 mb-4">Use Case</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white">
            AI Agents for {title}
          </h1>
          <p className="mt-1 text-lg text-dark-muted max-w-2xl">
            See how Datagrid&apos;s AI agents automate {title.toLowerCase()}{" "}
            workflows for construction teams.
          </p>
        </div>
      </section>

      <div className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Content section */}
          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-secondary">
              Construction teams spend countless hours on {title.toLowerCase()}.
              Datagrid&apos;s AI agents are purpose-built to handle these workflows,
              integrating with your existing tools to deliver structured, reviewable
              outputs.
            </p>
          </div>

          {/* Recommended agents for this use case */}
          <p className="text-xs font-medium text-black/75 mb-4">Recommended</p>
          <h2 className="text-2xl font-medium text-foreground mb-8">
            Recommended Agents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.slice(0, 3).map((agent) => (
              <Link
                key={agent._id}
                href={`/agents/${agent.slug.current}`}
                className="group block p-8 bg-background rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out"
              >
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-150">
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
              className="px-8 py-4 text-base font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
