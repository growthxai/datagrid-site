import Link from "next/link";
import { getConnectorBySlug } from "@/lib/queries";
import { PLACEHOLDER_CONNECTORS } from "@/lib/placeholder-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const connector = await getConnectorBySlug(slug).catch(() => null);
  const fallback = PLACEHOLDER_CONNECTORS.find((c) => c.slug.current === slug);
  const data = connector || fallback;
  return {
    title: data?.title ? `${data.title} Connector` : "Connector",
    description: data?.shortDescription || "Connect your construction tools with Datagrid.",
  };
}

export default async function ConnectorDetailPage({ params }: Props) {
  const { slug } = await params;
  const connectorData = await getConnectorBySlug(slug).catch(() => null);
  const connector =
    connectorData ||
    PLACEHOLDER_CONNECTORS.find((c) => c.slug.current === slug) ||
    PLACEHOLDER_CONNECTORS[0];

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* DESIGN: Connector hero */}
        <div className="mb-12">
          <div className="w-16 h-16 rounded-xl bg-muted border border-border flex items-center justify-center mb-6">
            <span className="text-2xl font-bold text-secondary">
              {connector.title.charAt(0)}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {connector.title}
          </h1>
          <p className="mt-4 text-lg text-secondary max-w-3xl">
            {connector.description || connector.shortDescription}
          </p>
        </div>

        {/* DESIGN: Content body — setup guide / portable text */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-secondary">
            Detailed connector documentation and setup guide will render here from
            Sanity portable text.
          </p>
        </div>

        {/* DESIGN: Compatible agents */}
        {"agents" in connector &&
          Array.isArray(connector.agents) &&
          connector.agents.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Compatible Agents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {connector.agents.map(
                  (agent: {
                    _id: string;
                    title: string;
                    slug: { current: string };
                    shortDescription: string;
                  }) => (
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
                  )
                )}
              </div>
            </section>
          )}

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
