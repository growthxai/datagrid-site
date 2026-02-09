import Link from "next/link";
import { getAgents, getCategories } from "@/lib/queries";
import { PLACEHOLDER_AGENTS, PLACEHOLDER_CATEGORIES } from "@/lib/placeholder-data";

export const metadata = {
  title: "AI Agents",
  description: "Browse Datagrid's library of AI agents built for construction workflows.",
};

export default async function AgentsPage() {
  const [agentsData, categoriesData] = await Promise.all([
    getAgents().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const agents = agentsData.length > 0 ? agentsData : PLACEHOLDER_AGENTS;
  const categories = categoriesData.length > 0 ? categoriesData : PLACEHOLDER_CATEGORIES;

  return (
    <>
      {/* Dark hero header */}
      <section className="relative py-16 sm:py-20 overflow-hidden hero-glow">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(37,99,235,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-black/75 mb-4">Agent Library</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white">
            AI Agents
          </h1>
          <p className="mt-1 text-lg text-dark-muted max-w-2xl">
            Purpose-built AI agents for construction workflows. Each agent is
            trained on real project data and integrates with your existing tools.
          </p>
        </div>
      </section>

      <div className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter bar */}
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              href="/agents"
              className="px-4 py-2.5 text-sm font-semibold rounded-full bg-accent text-accent-foreground shadow-sm transition-all duration-200 ease-out"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/agents/category/${cat.slug.current}`}
                className="px-4 py-2.5 text-sm font-semibold rounded-full border border-border text-secondary hover:text-foreground hover:border-accent/30 hover:shadow-sm transition-all duration-200 ease-out"
              >
                {cat.title}
              </Link>
            ))}
          </div>

          {/* Agent card grid */}
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
                <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-150">
                  {agent.title}
                </h2>
                <p className="mt-2 text-sm text-secondary line-clamp-2">
                  {agent.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
