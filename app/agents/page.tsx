import Link from "next/link";
import { getAgents, getCategories } from "@/lib/queries";
import { PLACEHOLDER_AGENTS, PLACEHOLDER_CATEGORIES } from "@/lib/placeholder-data";
import BlueprintBg from "@/components/blueprint-bg";
import AgentsFilter from "@/components/agents-filter";

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
      {/* Hero header */}
      <section className="relative py-16 sm:py-20 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="agents" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-[#a29080] mb-4">Agent Library</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            AI Agents
          </h1>
          <p className="mt-1 text-lg text-secondary max-w-2xl">
            Purpose-built AI agents for construction workflows. Each agent is
            trained on real project data and integrates with your existing tools.
          </p>
        </div>
      </section>

      <div className="pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AgentsFilter agents={agents} categories={categories} />
        </div>
      </div>

      {/* Pre-footer CTA */}
      <section className="relative py-20 sm:py-28 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="agents" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-[1.1]">
            Build your first AI<br />Agent in minutes
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
