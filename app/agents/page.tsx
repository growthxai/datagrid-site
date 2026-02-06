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
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* DESIGN: Page header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            AI Agents
          </h1>
          <p className="mt-3 text-lg text-secondary max-w-2xl">
            Purpose-built AI agents for construction workflows. Each agent is
            trained on real project data and integrates with your existing tools.
          </p>
        </div>

        {/* DESIGN: Category filter bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/agents"
            className="px-4 py-2 text-sm font-medium rounded-full bg-accent text-accent-foreground"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/agents/category/${cat.slug.current}`}
              className="px-4 py-2 text-sm font-medium rounded-full border border-border text-secondary hover:text-foreground hover:border-accent/40 transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </div>

        {/* DESIGN: Agent card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
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
              <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
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
  );
}
