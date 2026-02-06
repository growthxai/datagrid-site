import Link from "next/link";
import { getGuideBySlug, getGuides } from "@/lib/queries";
import { PLACEHOLDER_GUIDES } from "@/lib/placeholder-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug).catch(() => null);
  const fallback = PLACEHOLDER_GUIDES.find((g) => g.slug.current === slug);
  const data = guide || fallback;
  return {
    title: data?.title || "Article",
    description: data?.excerpt || "Read this guide from Datagrid.",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const guideData = await getGuideBySlug(slug).catch(() => null);
  const guide =
    guideData ||
    PLACEHOLDER_GUIDES.find((g) => g.slug.current === slug) ||
    PLACEHOLDER_GUIDES[0];

  const allGuidesData = await getGuides().catch(() => []);
  const allGuides = allGuidesData.length > 0 ? allGuidesData : PLACEHOLDER_GUIDES;
  const relatedGuides = allGuides
    .filter((g) => g._id !== guide._id)
    .slice(0, 2);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* DESIGN: Article header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-secondary">
                {guide.category?.title}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {guide.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-secondary">
              <span>{guide.author || "Datagrid Team"}</span>
              <span>&middot;</span>
              <time>
                {guide.publishedAt
                  ? new Date(guide.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}
              </time>
            </div>
          </header>

          {/* DESIGN: Featured image placeholder */}
          <div className="aspect-video bg-muted rounded-xl border border-border flex items-center justify-center mb-12">
            <span className="text-sm text-secondary">Featured Image</span>
          </div>

          {/* DESIGN: Prose body — styled with @tailwindcss/typography */}
          <article className="prose prose-lg max-w-none">
            {/* TODO: Render portable text body */}
            <p>
              {guide.excerpt ||
                "Article content will render here from Sanity portable text."}
            </p>
            <p>
              This is placeholder prose content. When Sanity content is connected,
              the full article body will render here with proper typography
              styling including headings, lists, code blocks, images, and more.
            </p>
            <h2>Key Takeaways</h2>
            <ul>
              <li>
                AI agents can dramatically reduce time spent on repetitive
                construction document workflows.
              </li>
              <li>
                Integration with existing tools like Procore and PlanGrid means
                no disruption to current processes.
              </li>
              <li>
                Start with one agent and scale as your team gets comfortable with
                AI-assisted workflows.
              </li>
            </ul>
          </article>

          {/* DESIGN: Related agents/connectors sidebar content */}
          {"agents" in guide &&
            Array.isArray(guide.agents) &&
            guide.agents.length > 0 && (
              <section className="mt-12 p-6 bg-muted rounded-xl">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Related Agents
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {guide.agents.map(
                    (agent: {
                      _id: string;
                      title: string;
                      slug: { current: string };
                      shortDescription: string;
                    }) => (
                      <Link
                        key={agent._id}
                        href={`/agents/${agent.slug.current}`}
                        className="block p-4 bg-background rounded-lg border border-border hover:border-accent/40 transition-colors"
                      >
                        <span className="text-sm font-medium text-foreground">
                          {agent.title}
                        </span>
                        <p className="text-xs text-secondary mt-1">
                          {agent.shortDescription}
                        </p>
                      </Link>
                    )
                  )}
                </div>
              </section>
            )}

          {/* DESIGN: Bottom CTA */}
          <div className="mt-12 p-8 bg-accent/5 border border-accent/20 rounded-xl text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Ready to try Datagrid?
            </h3>
            <p className="text-sm text-secondary mb-4">
              See how AI agents can transform your construction workflows.
            </p>
            <Link
              href="/demo"
              className="inline-flex px-5 py-2.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Request a Demo
            </Link>
          </div>

          {/* DESIGN: Related articles */}
          {relatedGuides.length > 0 && (
            <section className="mt-16">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                More from the blog
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedGuides.map((g) => (
                  <Link
                    key={g._id}
                    href={`/blog/${g.slug.current}`}
                    className="group block p-6 bg-background rounded-xl border border-border hover:border-accent/40 transition-colors"
                  >
                    <h4 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                      {g.title}
                    </h4>
                    <p className="mt-2 text-sm text-secondary line-clamp-2">
                      {g.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
