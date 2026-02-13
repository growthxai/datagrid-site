import Link from "next/link";
import PageHeader from "@/components/page-header";
import BlueprintBg from "@/components/blueprint-bg";

export const metadata = {
  title: "Help Center | Datagrid",
  description: "Find answers, guides, and support for Datagrid.",
};

const GETTING_STARTED = [
  { label: "Quickstart: Datagrid Agents", href: "/help-center#quickstart", emoji: "👋" },
  { label: "Create an AI Agent", href: "/help-center#create-agent" },
  { label: "Create a Dataset", href: "/help-center#create-dataset" },
  { label: "Set Up a Schedule", href: "/help-center#setup-schedule" },
];

const TUTORIALS = [
  { label: "Create an AI Agent", href: "/help-center#create-agent", level: "Beginner" },
  { label: "Create a Dataset", href: "/help-center#create-dataset", level: "Beginner" },
  { label: "Set Up a Schedule", href: "/help-center#setup-schedule", level: "Beginner" },
];

const CONNECTORS = [
  "Salesforce", "LinkedIn Pages", "Procore", "Autodesk Construction Cloud (ACC)",
  "Microsoft Teams", "Accubid Anywhere", "Outreach", "Acumatica", "Airtable",
  "Amazon Aurora", "Amazon AWS S3", "Amazon RDS", "Amazon Redshift", "ArchiCAD",
  "Asana", "Pinterest", "AWS Timestream", "Azure Blob Storage",
  "Azure Data Lake Storage", "Azure MySQL Database", "Azure PostgreSQL Database",
  "Azure SQL Database", "BigCommerce", "BigQuery", "BIM 360 Build", "BIM Track",
  "BIM360 Docs", "Box", "Bridgit", "BuildingConnected", "Civil 3D", "CMiC",
  "Databricks", "Docusign", "Drift", "Dropbox", "Egnyte", "Emque", "Exchange",
  "Facebook Ads", "Fieldwire", "FRED", "Freshdesk", "GitHub", "GitLab",
  "Google Ads", "Google Analytics", "Google Calendar",
  "Google Cloud SQL \u2013 PostgreSQL", "Google Cloud SQL \u2013 SQL Server",
  "Google Cloud Storage", "Google Drive", "Google Sheets", "HelloSign", "Highwire",
  "Hilti ON!Track", "Intercom", "Zyte", "Textura",
  "P6 EPPM", "Oracle Netsuite", "Hubspot",
  "Google Cloud SQL \u2013 MySQL", "Okta", "Zoom", "Zendesk \u2013 Support",
  "Zendesk \u2013 Sell", "Wrike", "Yardi", "Webflow", "Viewpoint Vista",
  "Trimble Connect", "TradeTapp", "SYNCHRO 4D Pro", "SurveyMonkey", "Snowflake",
  "Stripe", "Smartsheet", "Slack", "SharePoint", "Sentry", "SAP S/4HANA",
  "SAP BW/4HANA", "Sage Intacct", "Sage 300 Cloud", "Riskcast", "Revizto",
  "Revit", "Remarcable", "Quickbooks", "Quickbase", "PostgreSQL", "PlanGrid",
  "P6 Primavera Data Service (PDS)", "Oracle Primavera Cloud (OPC)",
  "MS Dynamics 365 NAV", "Notion", "Navisworks", "MS SQL Server", "OneDrive",
  "Oracle Aconex", "MS Fabric", "MongoDB", "Monday", "Mixpanel",
  "Microsoft Excel", "MariaDB", "Jira", "JDBC MySQL", "IMAP/Email Sync",
  "HTTP Fetch",
];

const DOC_SECTIONS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    title: "Product Documentation",
    links: [
      { label: "Tutorials", href: "/help-center#tutorials" },
      { label: "Connectors", href: "/connectors" },
      { label: "Concepts and Definitions", href: "/help-center#concepts" },
      { label: "Agents", href: "/agents" },
      { label: "Credits", href: "/help-center#credits" },
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "API Documentation",
    links: [
      { label: "API Quickstart", href: "/api-quickstart" },
      { label: "API Reference", href: "/developers#api-reference" },
      { label: "IP Addresses", href: "/help-center#ip-addresses" },
    ],
  },
];

export default function HelpCenterPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Help Center" },
        ]}
        title="Welcome to Datagrid"
        description="Find answers, guides, and support for everything Datagrid."
        variant="agents"
        heroBg="white"
        centered
      />

      <div className="pb-16 sm:pb-20 lg:pb-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Documentation sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {DOC_SECTIONS.map((section) => (
              <div key={section.title} className="rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-lg font-medium text-foreground">{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-secondary hover:text-accent transition-colors duration-150">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Getting Started */}
          <section id="getting-started" className="mb-16 scroll-mt-32">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-500">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-foreground">Getting Started</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GETTING_STARTED.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-accent/30 hover:shadow-sm transition-all duration-200 ease-out"
                >
                  {item.emoji && <span className="text-lg">{item.emoji}</span>}
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Support */}
          <section id="support" className="mb-16 scroll-mt-32">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-foreground">Support</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/contact"
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-accent/30 hover:shadow-sm transition-all duration-200 ease-out"
              >
                <span className="text-sm font-medium text-foreground">Contact Us</span>
              </Link>
              <Link
                href="/faq"
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-accent/30 hover:shadow-sm transition-all duration-200 ease-out"
              >
                <span className="text-sm font-medium text-foreground">FAQ</span>
              </Link>
            </div>
          </section>

          {/* Tutorials */}
          <section id="tutorials" className="mb-16 scroll-mt-32">
            <h2 className="text-xl font-medium text-foreground mb-6">Tutorials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TUTORIALS.map((t) => (
                <Link
                  key={t.label}
                  href={t.href}
                  className="group rounded-xl border border-border p-5 hover:border-accent/30 hover:shadow-sm transition-all duration-200 ease-out"
                >
                  <span className="text-[10px] font-semibold tracking-wide text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    {t.level}
                  </span>
                  <p className="mt-3 text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-150">
                    {t.label}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Connectors */}
          <section id="connectors" className="scroll-mt-32">
            <h2 className="text-xl font-medium text-foreground mb-2">Connectors</h2>
            <p className="text-sm text-secondary mb-8">
              Learn how to use each connector and import data to build your custom datasets.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {CONNECTORS.map((name) => (
                <Link
                  key={name}
                  href="/connectors"
                  className="px-3 py-2.5 rounded-lg border border-border text-sm text-foreground hover:border-accent/30 hover:bg-surface/50 transition-all duration-150"
                >
                  {name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Pre-footer CTA */}
      <section className="relative py-20 sm:py-28 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="agents" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-foreground leading-[1.15]">
            Build your first AI Agent in minutes
          </h2>
          <p className="mt-4 text-base text-secondary">
            Free to get started. No credit card required.
          </p>
          <div className="mt-8">
            <Link
              href="/get-started"
              className="inline-flex items-center px-8 py-3.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
