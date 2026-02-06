import Link from "next/link";
import { getAgents, getConnectors } from "@/lib/queries";
import { PLACEHOLDER_AGENTS, PLACEHOLDER_CONNECTORS } from "@/lib/placeholder-data";

export default async function HomePage() {
  const [agentsData, connectorsData] = await Promise.all([
    getAgents().catch(() => []),
    getConnectors().catch(() => []),
  ]);

  const agents = agentsData.length > 0 ? agentsData : PLACEHOLDER_AGENTS;
  const connectors = connectorsData.length > 0 ? connectorsData : PLACEHOLDER_CONNECTORS;
  const featuredAgents = agents.slice(0, 3);

  return (
    <>
      {/* DESIGN: Hero section — establish brand palette here */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            AI agents that understand{" "}
            <span className="text-accent">construction</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-secondary max-w-2xl mx-auto">
            Automate submittal reviews, RFIs, daily logs, and more. Purpose-built
            for general contractors, owners, and subs.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/demo"
              className="px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Request a Demo
            </Link>
            <Link
              href="/agents"
              className="px-6 py-3 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
            >
              Explore Agents
            </Link>
          </div>
        </div>
      </section>

      {/* DESIGN: Featured Agents grid — 3 card preview */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Featured Agents</h2>
            <p className="mt-3 text-secondary">
              Purpose-built AI for your most time-consuming workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredAgents.map((agent) => (
              <Link
                key={agent._id}
                href={`/agents/${agent.slug.current}`}
                className="group block p-6 bg-background rounded-xl border border-border hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-secondary">
                    {agent.category?.title}
                  </span>
                  {agent.status === "coming-soon" && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {agent.title}
                </h3>
                <p className="mt-2 text-sm text-secondary line-clamp-2">
                  {agent.shortDescription}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/agents"
              className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              View all agents &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* DESIGN: How it works — 3 steps */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">How it works</h2>
            <p className="mt-3 text-secondary">
              Get up and running in minutes, not months.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect your tools",
                description:
                  "Link Procore, PlanGrid, Autodesk Build, or any of our supported integrations in a few clicks.",
              },
              {
                step: "2",
                title: "Choose your agents",
                description:
                  "Pick from our library of construction-specific AI agents — each trained on real project workflows.",
              },
              {
                step: "3",
                title: "Automate & review",
                description:
                  "Agents process your documents and data, delivering structured outputs you can review and approve.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN: Connectors logo bar */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-secondary mb-8">
            Integrates with the tools you already use
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {connectors.map((connector) => (
              <Link
                key={connector._id}
                href={`/connectors/${connector.slug.current}`}
                className="px-4 py-2 text-sm font-medium text-secondary hover:text-foreground border border-border rounded-lg bg-background hover:border-accent/40 transition-colors"
              >
                {connector.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN: Final CTA section */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ready to put AI to work on your projects?
          </h2>
          <p className="mt-4 text-lg text-secondary max-w-xl mx-auto">
            Join the general contractors and owners who are saving thousands of hours with Datagrid.
          </p>
          <div className="mt-8">
            <Link
              href="/demo"
              className="px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
