import Link from "next/link";
import { getConnectors } from "@/lib/queries";
import { PLACEHOLDER_CONNECTORS } from "@/lib/placeholder-data";

export const metadata = {
  title: "Connectors",
  description: "Connect Datagrid AI agents to the construction tools you already use.",
};

export default async function ConnectorsPage() {
  const connectorsData = await getConnectors().catch(() => []);
  const connectors = connectorsData.length > 0 ? connectorsData : PLACEHOLDER_CONNECTORS;

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Connectors
          </h1>
          <p className="mt-3 text-lg text-secondary max-w-2xl">
            Datagrid integrates with the construction software you already use.
            Connect in minutes, no custom development required.
          </p>
        </div>

        {/* DESIGN: Connector card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {connectors.map((connector) => (
            <Link
              key={connector._id}
              href={`/connectors/${connector.slug.current}`}
              className="group block p-6 bg-background rounded-xl border border-border hover:border-accent/40 transition-colors"
            >
              {/* DESIGN: Connector logo placeholder */}
              <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-secondary">
                  {connector.title.charAt(0)}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                {connector.title}
              </h2>
              <p className="mt-2 text-sm text-secondary line-clamp-2">
                {connector.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
