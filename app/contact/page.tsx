import Link from "next/link";
import PageHeader from "@/components/page-header";
import BlueprintBg from "@/components/blueprint-bg";

export const metadata = {
  title: "Contact Us | Datagrid",
  description: "Get in touch with the Datagrid team.",
};

const CONTACTS = [
  {
    label: "Support",
    email: "support@datagrid.com",
    description: "Primary contact for reporting issues with our website, app, connectors and endpoints, as well as bugs or feature requests.",
  },
  {
    label: "Sales",
    email: "sales@datagrid.com",
    description: "Contact our sales team to request a demo, schedule a call, discuss enterprise plans, or get pricing quotes.",
  },
  {
    label: "Contact",
    email: "contact@datagrid.com",
    description: "For questions about our Terms of Use and Privacy Policy.",
  },
  {
    label: "Security",
    email: "security@datagrid.com",
    description: "Report security vulnerabilities or incidents.",
  },
];

const ADDITIONAL_RESOURCES = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Master Service Agreement", href: "/msa" },
  { label: "Credit Usage Policy and Pricing Terms", href: "/credit-usage-policy" },
  { label: "Report a Vulnerability", href: "/report-vulnerability" },
  { label: "FAQ", href: "/faq" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
        title="Contact Us"
        description="Have a question or need help? Our team is here for you."
        variant="agents"
        heroBg="white"
      />

      <div className="pb-16 sm:pb-20 lg:pb-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Contact methods */}
          <section className="mb-16">
            <h2 className="text-lg font-medium text-foreground mb-6">How to contact us</h2>
            <div className="space-y-4">
              {CONTACTS.map((c) => (
                <div key={c.label} className="p-5 rounded-xl border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-medium text-foreground">{c.label}</h3>
                    <a
                      href={`mailto:${c.email}`}
                      className="text-sm text-accent hover:text-accent-hover transition-colors duration-150"
                    >
                      {c.email}
                    </a>
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Links */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <a
                href="https://www.datagrid.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:text-accent-hover transition-colors duration-150"
              >
                Website
              </a>
              <a
                href="https://www.youtube.com/@Datagrid-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:text-accent-hover transition-colors duration-150"
              >
                YouTube Channel
              </a>
            </div>
          </section>

          {/* Additional Resources */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-4">Additional Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADDITIONAL_RESOURCES.map((r) => (
                <Link
                  key={r.label}
                  href={r.href}
                  className="px-4 py-3 rounded-xl border border-border text-sm text-foreground hover:border-accent/30 hover:bg-surface/50 transition-all duration-150"
                >
                  {r.label}
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
