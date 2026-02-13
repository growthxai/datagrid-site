import Link from "next/link";
import PageHeader from "@/components/page-header";

export const metadata = {
  title: "API Quickstart | Datagrid",
  description: "Start using Datagrid in under 5 minutes. Get your API key, install the SDK, and make your first request.",
};

export default function ApiQuickstartPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Developers", href: "/developers" },
          { label: "Quickstart" },
        ]}
        title="Quickstart"
        description="Start using Datagrid in under 5 minutes."
        variant="agents"
        heroBg="white"
      />

      <div className="pb-16 sm:pb-20 lg:pb-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-10 lg:gap-14">
            {/* Sidebar */}
            <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
              <div className="sticky top-[144px] space-y-6 max-h-[calc(100vh-180px)] overflow-y-auto pr-4" style={{ scrollbarWidth: "thin" }}>
                <div>
                  <p className="text-xs font-medium text-tertiary mb-2">On this page</p>
                  <ul className="space-y-1.5">
                    <li><a href="#get-api-key" className="text-sm text-secondary hover:text-accent transition-colors duration-150">Get your API Key</a></li>
                    <li><a href="#install-sdk" className="text-sm text-secondary hover:text-accent transition-colors duration-150">Install the SDK</a></li>
                    <li><a href="#first-request" className="text-sm text-secondary hover:text-accent transition-colors duration-150">Make your first request</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-tertiary mb-2">Quick Links</p>
                  <ul className="space-y-1.5">
                    <li><Link href="/developers#api-reference" className="text-sm text-secondary hover:text-accent transition-colors duration-150">API Reference</Link></li>
                    <li><Link href="/connectors" className="text-sm text-secondary hover:text-accent transition-colors duration-150">Connectors</Link></li>
                    <li><Link href="/developers#get-api-key" className="text-sm text-secondary hover:text-accent transition-colors duration-150">Get your API Key</Link></li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="min-w-0 flex-1 max-w-3xl">
              <p className="text-base text-secondary leading-relaxed mb-10">
                Datagrid lets you ingest data from 100+ connectors and build AI Agents on top of it.
              </p>

              {/* Get your API Key */}
              <section id="get-api-key" className="mb-12 scroll-mt-32">
                <h2 className="text-xl font-medium text-foreground mb-4">Get your API Key</h2>
                <p className="text-sm text-secondary leading-relaxed mb-4">
                  Head over to the Datagrid console to claim your API key. Once you&apos;ve claimed your API key, export it as an environment variable.
                </p>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-foreground bg-surface px-2 py-0.5 rounded">macOS / Linux</span>
                    </div>
                    <div className="rounded-xl border border-border bg-surface/50 p-4 font-mono text-sm text-foreground">
                      <span className="text-tertiary select-none">$ </span>export DATAGRID_API_KEY=&quot;your_api_key_here&quot;
                    </div>
                  </div>
                </div>
              </section>

              {/* Install the SDK */}
              <section id="install-sdk" className="mb-12 scroll-mt-32">
                <h2 className="text-xl font-medium text-foreground mb-4">Install the SDK</h2>
                <p className="text-sm text-secondary leading-relaxed mb-4">
                  We offer easy-to-use client SDKs for Python and TypeScript/JavaScript.
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-foreground bg-surface px-2 py-0.5 rounded">Python</span>
                    </div>
                    <div className="rounded-xl border border-border bg-surface/50 p-4 font-mono text-sm text-foreground">
                      <span className="text-tertiary select-none">$ </span>pip install datagrid_ai
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-foreground bg-surface px-2 py-0.5 rounded">JavaScript</span>
                    </div>
                    <div className="rounded-xl border border-border bg-surface/50 p-4 font-mono text-sm text-foreground">
                      <span className="text-tertiary select-none">$ </span>npm install datagrid
                    </div>
                  </div>
                </div>
              </section>

              {/* Make your first request */}
              <section id="first-request" className="mb-12 scroll-mt-32">
                <h2 className="text-xl font-medium text-foreground mb-4">Make your first request</h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-foreground bg-surface px-2 py-0.5 rounded">Python</span>
                    </div>
                    <div className="rounded-xl border border-border bg-surface/50 p-4 font-mono text-sm text-foreground overflow-x-auto">
                      <pre className="whitespace-pre">{`import os
from datagrid_ai import Datagrid

client = Datagrid(
  api_key=os.environ.get("DATAGRID_API_KEY"),
)

response = client.converse(
  prompt="Hello world!",
)

print(response.content[0].text)`}</pre>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-foreground bg-surface px-2 py-0.5 rounded">JavaScript</span>
                    </div>
                    <div className="rounded-xl border border-border bg-surface/50 p-4 font-mono text-sm text-foreground overflow-x-auto">
                      <pre className="whitespace-pre">{`import Datagrid from "datagrid";

const client = new Datagrid({ apiKey: process.env.DATAGRID_API_KEY });

const response = await client.converse({
  prompt: "Hello world!",
});

console.log(response.content[0].text);`}</pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* Next steps */}
              <section className="scroll-mt-32">
                <h2 className="text-xl font-medium text-foreground mb-4">Next steps</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href="/developers#api-reference"
                    className="group p-4 rounded-xl border border-border hover:border-accent/30 hover:shadow-sm transition-all duration-200 ease-out"
                  >
                    <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-150">API Reference</p>
                    <p className="text-xs text-secondary mt-1">Explore all available endpoints.</p>
                  </Link>
                  <Link
                    href="/connectors"
                    className="group p-4 rounded-xl border border-border hover:border-accent/30 hover:shadow-sm transition-all duration-200 ease-out"
                  >
                    <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-150">Connectors</p>
                    <p className="text-xs text-secondary mt-1">Connect your data sources.</p>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
