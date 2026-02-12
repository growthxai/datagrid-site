import Link from "next/link";
import { getAgents } from "@/lib/queries";
import { PLACEHOLDER_AGENTS } from "@/lib/placeholder-data";
import {
  USE_CASE_DATA,
  resolveAgents,
  resolveConnectors,
  resolveGuides,
} from "@/lib/cross-references";

type Props = { params: Promise<{ useCase: string }> };

export function generateStaticParams() {
  return Object.keys(USE_CASE_DATA).map((useCase) => ({ useCase }));
}

export async function generateMetadata({ params }: Props) {
  const { useCase } = await params;
  const data = USE_CASE_DATA[useCase];
  const title = data
    ? data.title
    : useCase.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `AI Agents for ${title}`,
    description: data?.description || `Discover how Datagrid AI agents help with ${title.toLowerCase()} in construction.`,
  };
}

export default async function UseCasePage({ params }: Props) {
  const { useCase } = await params;
  const data = USE_CASE_DATA[useCase];

  // Fallback for unknown slugs — keep legacy behavior
  if (!data) {
    const agentsData = await getAgents().catch(() => []);
    const agents = agentsData.length > 0 ? agentsData : PLACEHOLDER_AGENTS;
    const title = useCase
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
      <>
        <section className="relative py-16 sm:py-20 overflow-hidden hero-glow">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(37,99,235,0.12),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-medium text-[#a29080] mb-4">Use Case</p>
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
            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-secondary">
                Construction teams spend countless hours on {title.toLowerCase()}.
                Datagrid&apos;s AI agents are purpose-built to handle these workflows,
                integrating with your existing tools to deliver structured, reviewable
                outputs.
              </p>
            </div>

            <p className="text-xs font-medium text-[#a29080] mb-4">Recommended</p>
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

  // Known use case — full enriched page
  const agents = resolveAgents(data.agentSlugs);
  const connectors = resolveConnectors(data.connectorSlugs);
  const guides = resolveGuides(data.guideSlugs);
  const otherUseCases = Object.entries(USE_CASE_DATA)
    .filter(([slug]) => slug !== useCase)
    .map(([slug, d]) => ({ slug, title: d.title }));

  return (
    <>
      {/* Dark hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden hero-glow">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(37,99,235,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-[#a29080] mb-4">Use Case</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white">
            AI Agents for {data.title}
          </h1>
          <p className="mt-1 text-lg text-dark-muted max-w-2xl">
            {data.description}
          </p>
        </div>
      </section>

      <div className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Workflow Steps */}
          <section className="mb-20">
            <p className="text-xs font-medium text-[#a29080] mb-4">How It Works</p>
            <h2 className="text-2xl font-medium text-foreground mb-10">
              Workflow
            </h2>
            <div className="space-y-0">
              {data.workflows.map((w, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-accent">{i + 1}</span>
                    </div>
                    {i < data.workflows.length - 1 && (
                      <div className="w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-10">
                    <h3 className="text-base font-semibold text-foreground">{w.step}</h3>
                    <p className="mt-1 text-sm text-secondary">{w.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Agents */}
          {agents.length > 0 && (
            <section className="mb-20">
              <p className="text-xs font-medium text-[#a29080] mb-4">Recommended</p>
              <h2 className="text-2xl font-medium text-foreground mb-8">
                Recommended Agents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <Link
                    key={agent._id}
                    href={`/agents/${agent.slug.current}`}
                    className="group block p-8 bg-background rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface text-secondary">
                        {agent.category?.title}
                      </span>
                      {agent.status === "coming-soon" && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-150">
                      {agent.title}
                    </h3>
                    <p className="mt-2 text-sm text-secondary line-clamp-2">
                      {agent.shortDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Compatible Connectors */}
          {connectors.length > 0 && (
            <section className="mb-20">
              <p className="text-xs font-medium text-[#a29080] mb-4">Integrations</p>
              <h2 className="text-2xl font-medium text-foreground mb-8">
                Compatible Connectors
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {connectors.map((conn) => (
                  <Link
                    key={conn._id}
                    href={`/connectors/${conn.slug.current}`}
                    className="group flex items-center gap-4 p-6 bg-background rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-base font-medium text-accent">
                        {conn.title.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors duration-150">
                        {conn.title}
                      </h3>
                      <p className="text-sm text-secondary line-clamp-1">
                        {conn.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Guides */}
          {guides.length > 0 && (
            <section className="mb-20">
              <p className="text-xs font-medium text-[#a29080] mb-4">Learn More</p>
              <h2 className="text-2xl font-medium text-foreground mb-8">
                Related Guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <Link
                    key={guide._id}
                    href={`/blog/${guide.slug.current}`}
                    className="group block p-8 bg-background rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out"
                  >
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-150">
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

          {/* Explore More Use Cases */}
          {otherUseCases.length > 0 && (
            <section className="mb-20">
              <p className="text-xs font-medium text-[#a29080] mb-4">Explore</p>
              <h2 className="text-2xl font-medium text-foreground mb-6">
                More Use Cases
              </h2>
              <div className="flex flex-wrap gap-3">
                {otherUseCases.map((uc) => (
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

          {/* CTA */}
          <div className="text-center">
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
