import Link from "next/link";
import PageHeader from "@/components/page-header";

export const metadata = {
  title: "Developers | Datagrid",
  description: "Build on the Datagrid platform. API docs, SDKs, and developer resources.",
};

type Method = "GET" | "POST" | "PATCH" | "DEL";

type Endpoint = {
  method: Method;
  label: string;
};

type ApiSection = {
  name: string;
  endpoints?: Endpoint[];
  subsections?: { name: string; endpoints: Endpoint[] }[];
};

const METHOD_STYLE: Record<Method, string> = {
  GET: "bg-emerald-50 text-emerald-700 border-emerald-200",
  POST: "bg-blue-50 text-blue-700 border-blue-200",
  PATCH: "bg-amber-50 text-amber-700 border-amber-200",
  DEL: "bg-red-50 text-red-700 border-red-200",
};

const QUICK_LINKS = [
  { label: "API Reference", href: "/developers#api-reference" },
  { label: "Connectors", href: "/connectors" },
  { label: "Get your API Key", href: "/developers#get-api-key" },
  { label: "Join us on Slack", href: "#" },
];

const GUIDES = [
  { label: "Introduction", href: "/developers#introduction" },
  { label: "Quickstart", href: "/api-quickstart" },
  { label: "Connecting Agents to Apps", href: "/developers#connecting-agents" },
  { label: "Creating Data Views", href: "/developers#data-views" },
];

const API_SECTIONS: ApiSection[] = [
  {
    name: "Converse",
    endpoints: [{ method: "POST", label: "Converse" }],
    subsections: [
      { name: "Streaming", endpoints: [] },
      { name: "Structured Outputs", endpoints: [] },
      { name: "File Inputs", endpoints: [] },
      { name: "MCP Servers (Beta)", endpoints: [] },
    ],
  },
  {
    name: "Agents",
    endpoints: [
      { method: "POST", label: "Create agent" },
      { method: "GET", label: "Retrieve agent" },
      { method: "GET", label: "List agents" },
      { method: "PATCH", label: "Update agent" },
      { method: "DEL", label: "Delete agent" },
    ],
  },
  {
    name: "Knowledge",
    endpoints: [
      { method: "POST", label: "Create knowledge" },
      { method: "POST", label: "Create knowledge from connection" },
      { method: "GET", label: "Retrieve knowledge" },
      { method: "GET", label: "List knowledge" },
      { method: "PATCH", label: "Update knowledge" },
      { method: "DEL", label: "Delete knowledge" },
      { method: "POST", label: "Reindex knowledge" },
    ],
  },
  {
    name: "Tables",
    subsections: [
      { name: "Data Views", endpoints: [] },
      {
        name: "Search",
        endpoints: [{ method: "GET", label: "Search" }],
      },
    ],
  },
  {
    name: "Conversations",
    endpoints: [
      { method: "POST", label: "Create conversation" },
      { method: "GET", label: "Retrieve conversation" },
      { method: "GET", label: "List conversations" },
      { method: "DEL", label: "Delete conversation" },
    ],
  },
  {
    name: "Messages",
    endpoints: [
      { method: "GET", label: "Retrieve message" },
      { method: "GET", label: "List messages" },
    ],
  },
  {
    name: "Connections",
    endpoints: [
      { method: "POST", label: "Create connection" },
      { method: "GET", label: "Retrieve connection" },
      { method: "GET", label: "List connections" },
      { method: "PATCH", label: "Update connection" },
      { method: "DEL", label: "Delete connection" },
    ],
  },
  {
    name: "Connectors",
    endpoints: [{ method: "GET", label: "List connectors" }],
  },
  {
    name: "Files",
    endpoints: [
      { method: "POST", label: "Create files" },
      { method: "GET", label: "Retrieve file" },
      { method: "GET", label: "List files" },
      { method: "DEL", label: "Delete file" },
      { method: "GET", label: "Retrieve file content" },
    ],
  },
  {
    name: "Tools",
    endpoints: [
      { method: "GET", label: "Retrieve tool" },
      { method: "GET", label: "List tools" },
    ],
  },
  {
    name: "Secrets",
    endpoints: [
      { method: "POST", label: "Create secret" },
      { method: "GET", label: "Retrieve secret" },
      { method: "GET", label: "List secrets" },
      { method: "DEL", label: "Delete secret" },
    ],
  },
  {
    name: "Memory",
    endpoints: [
      { method: "POST", label: "Create User Memory" },
      { method: "GET", label: "List User Memory" },
      { method: "DEL", label: "Delete User Memory" },
    ],
  },
  {
    name: "Pages",
    endpoints: [
      { method: "POST", label: "Create page" },
      { method: "GET", label: "Retrieve page" },
      { method: "GET", label: "List pages" },
      { method: "PATCH", label: "Update page" },
      { method: "DEL", label: "Delete page" },
    ],
  },
  { name: "Organization", endpoints: [] },
  { name: "Credits", endpoints: [] },
  { name: "Users", endpoints: [] },
  { name: "Teamspaces", endpoints: [] },
  { name: "Teamspace Invites", endpoints: [] },
  { name: "Teamspace Users", endpoints: [] },
];

function MethodBadge({ method }: { method: Method }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-12 px-1.5 py-0.5 text-[10px] font-semibold rounded border ${METHOD_STYLE[method]}`}
    >
      {method}
    </span>
  );
}

export default function DevelopersPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Developers" },
        ]}
        title="Datagrid API"
        description="Build on the Datagrid platform. Integrate AI agents, knowledge bases, and connectors into your workflows."
        variant="agents"
        heroBg="white"
      />

      <div className="pb-16 sm:pb-20 lg:pb-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-10 lg:gap-14">
            {/* Sidebar nav */}
            <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
              <div className="sticky top-[144px] space-y-6 max-h-[calc(100vh-180px)] overflow-y-auto pr-4" style={{ scrollbarWidth: "thin" }}>
                <div>
                  <p className="text-xs font-medium text-tertiary mb-2">Quick Links</p>
                  <ul className="space-y-1.5">
                    {QUICK_LINKS.map((l) => (
                      <li key={l.label}>
                        <Link href={l.href} className="text-sm text-secondary hover:text-accent transition-colors duration-150">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-tertiary mb-2">Guides</p>
                  <ul className="space-y-1.5">
                    {GUIDES.map((g) => (
                      <li key={g.label}>
                        <Link href={g.href} className="text-sm text-secondary hover:text-accent transition-colors duration-150">
                          {g.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-tertiary mb-2">API Reference</p>
                  <ul className="space-y-1.5">
                    {API_SECTIONS.map((s) => (
                      <li key={s.name}>
                        <a href={`#${s.name.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm text-secondary hover:text-accent transition-colors duration-150">
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="min-w-0 flex-1">
              {/* Get your API Key */}
              <section id="get-api-key" className="mb-12 scroll-mt-32">
                <h2 className="text-xl font-medium text-foreground mb-4">Get your API Key</h2>
                <p className="text-sm text-secondary leading-relaxed mb-4">
                  To use the Datagrid API, you need an API key. You can generate one from your account settings.
                </p>
                <Link
                  href="/get-started"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-150"
                >
                  Get your API Key
                </Link>
              </section>

              {/* Install SDK */}
              <section id="install-sdk" className="mb-12 scroll-mt-32">
                <h2 className="text-xl font-medium text-foreground mb-4">Install the SDK</h2>
                <div className="rounded-xl border border-border bg-surface/50 p-4 font-mono text-sm text-foreground">
                  <span className="text-tertiary select-none">$ </span>npm install datagrid
                </div>
              </section>

              {/* First request */}
              <section id="first-request" className="mb-12 scroll-mt-32">
                <h2 className="text-xl font-medium text-foreground mb-4">Make your first request</h2>
                <div className="rounded-xl border border-border bg-surface/50 p-4 font-mono text-sm text-foreground overflow-x-auto">
                  <pre className="whitespace-pre">{`import Datagrid from "datagrid";

const client = new Datagrid({ apiKey: "YOUR_API_KEY" });

const agents = await client.agents.list();
console.log(agents);`}</pre>
                </div>
              </section>

              {/* API Reference */}
              <section id="api-reference" className="scroll-mt-32">
                <h2 className="text-2xl font-medium text-foreground mb-8">API Reference</h2>
                <div className="space-y-10">
                  {API_SECTIONS.map((section) => (
                    <div key={section.name} id={section.name.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-32">
                      <h3 className="text-lg font-medium text-foreground mb-3">{section.name}</h3>
                      {section.endpoints && section.endpoints.length > 0 && (
                        <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
                          {section.endpoints.map((ep, i) => (
                            <div key={`${ep.method}-${ep.label}-${i}`} className="flex items-center gap-3 px-4 py-3 hover:bg-surface/50 transition-colors duration-100">
                              <MethodBadge method={ep.method} />
                              <span className="text-sm text-foreground">{ep.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {section.subsections && section.subsections.length > 0 && (
                        <div className="mt-3 space-y-4">
                          {section.subsections.map((sub) => (
                            <div key={sub.name}>
                              <p className="text-sm font-medium text-secondary mb-2 pl-1">{sub.name}</p>
                              {sub.endpoints.length > 0 && (
                                <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
                                  {sub.endpoints.map((ep, i) => (
                                    <div key={`${ep.method}-${ep.label}-${i}`} className="flex items-center gap-3 px-4 py-3 hover:bg-surface/50 transition-colors duration-100">
                                      <MethodBadge method={ep.method} />
                                      <span className="text-sm text-foreground">{ep.label}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {(!section.endpoints || section.endpoints.length === 0) && (!section.subsections || section.subsections.length === 0) && (
                        <p className="text-sm text-tertiary pl-1">Documentation coming soon.</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
