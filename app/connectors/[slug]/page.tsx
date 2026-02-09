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
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Connector hero */}
        <div className="mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/10 flex items-center justify-center mb-6">
            <span className="text-2xl font-bold text-accent">
              {connector.title.charAt(0)}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            {connector.title}
          </h1>
          <p className="mt-1 text-lg text-secondary max-w-3xl">
            {connector.description || connector.shortDescription}
          </p>
        </div>

        {/* Content body */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-secondary">
            Detailed connector documentation and setup guide will render here from
            Sanity portable text.
          </p>
        </div>

        {/* Compatible agents */}
        {"agents" in connector &&
          Array.isArray(connector.agents) &&
          connector.agents.length > 0 && (
            <section className="mt-12">
              <p className="text-xs font-medium text-black/75 mb-4">Compatible</p>
              <h2 className="text-2xl font-medium text-foreground mb-8">
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
                      className="group block p-8 bg-background rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out"
                    >
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-150">
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
            className="px-8 py-4 text-base font-semibold rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
