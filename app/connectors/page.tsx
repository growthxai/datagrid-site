import Link from "next/link";
import { getConnectors } from "@/lib/queries";
import { PLACEHOLDER_CONNECTORS } from "@/lib/placeholder-data";
import BlueprintBg from "@/components/blueprint-bg";
import ConnectorsFilter from "@/components/connectors-filter";

export const metadata = {
  title: "Connectors",
  description: "Connect Datagrid AI agents to the construction tools you already use.",
};

export default async function ConnectorsPage() {
  const connectorsData = await getConnectors().catch(() => []);
  const connectors = connectorsData.length > 0 ? connectorsData : PLACEHOLDER_CONNECTORS;

  return (
    <>
      {/* Hero header */}
      <section className="relative py-16 sm:py-20 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="connectors" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-[#a29080] mb-4">Integrations</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            Connectors
          </h1>
          <p className="mt-1 text-lg text-secondary max-w-2xl">
            Datagrid integrates with the construction software you already use.
            Connect in minutes, no custom development required.
          </p>
        </div>
      </section>

      <div className="pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ConnectorsFilter connectors={connectors} />
        </div>
      </div>

      {/* Pre-footer CTA */}
      <section className="relative py-20 sm:py-28 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="connectors" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: headline + CTA */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-[1.1]">
                Connect your tools<br />in minutes
              </h2>
              <p className="mt-4 text-base text-secondary">
                Free to get started. No credit card required.
              </p>
              <div className="mt-8">
                <Link
                  href="/get-started"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-150"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Right: 3 steps */}
            <div className="space-y-6">
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
                <div key={item.step} className="flex items-start gap-4">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent-hover text-accent-foreground flex items-center justify-center text-sm font-medium shadow-sm">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-secondary">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
