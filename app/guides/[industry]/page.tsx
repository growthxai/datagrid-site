import Link from "next/link";
import { notFound } from "next/navigation";
import {
  INDUSTRY_DATA,
  resolveAgents,
  resolveConnectors,
  resolveGuides,
} from "@/lib/cross-references";
import BlueprintBg from "@/components/blueprint-bg";

type Props = { params: Promise<{ industry: string }> };

export function generateStaticParams() {
  return Object.keys(INDUSTRY_DATA).map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: Props) {
  const { industry } = await params;
  const data = INDUSTRY_DATA[industry];
  if (!data) return { title: "Industry Guide" };
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function IndustryGuidePage({ params }: Props) {
  const { industry } = await params;
  const data = INDUSTRY_DATA[industry];
  if (!data) notFound();

  const agents = resolveAgents(data.agentSlugs);
  const connectors = resolveConnectors(data.connectorSlugs);
  const guides = resolveGuides(data.guideSlugs);

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-20 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="guides" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6">
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-accent transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
          </nav>
          <p className="text-xs font-medium text-[#a29080] mb-4">Industry Guide</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            {data.title}
          </h1>
          <p className="mt-1 text-lg text-secondary max-w-2xl">
            {data.description}
          </p>
        </div>
      </section>

      <div className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Key Challenges */}
          <section className="mb-20">
            <p className="text-xs font-medium text-[#a29080] mb-4">The Problem</p>
            <h2 className="text-2xl font-medium text-foreground mb-10">
              Key Challenges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {data.challenges.map((challenge, i) => (
                <div
                  key={i}
                  className="p-8 bg-surface rounded-2xl"
                >
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    {challenge.description}
                  </p>
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

          {/* Integrations */}
          {connectors.length > 0 && (
            <section className="mb-20">
              <p className="text-xs font-medium text-[#a29080] mb-4">Integrations</p>
              <h2 className="text-2xl font-medium text-foreground mb-8">
                Supported Connectors
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

          {/* Related Use Cases */}
          {data.useCaseSlugs.length > 0 && (
            <section className="mb-20">
              <p className="text-xs font-medium text-[#a29080] mb-4">Explore</p>
              <h2 className="text-2xl font-medium text-foreground mb-6">
                Related Use Cases
              </h2>
              <div className="flex flex-wrap gap-3">
                {data.useCaseSlugs.map((slug) => {
                  const title = slug
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                  return (
                    <Link
                      key={slug}
                      href={`/agents/for/${slug}`}
                      className="inline-flex px-4 py-2 text-sm font-medium rounded-full border border-border bg-background text-secondary hover:text-foreground hover:border-accent/30 hover:shadow-sm transition-all duration-200 ease-out"
                    >
                      {title}
                    </Link>
                  );
                })}
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
