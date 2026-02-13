import Link from "next/link";
import PageHeader from "@/components/page-header";
import BlueprintBg from "@/components/blueprint-bg";

export const metadata = {
  title: "Careers at Datagrid",
  description: "Join the Datagrid team and help build the future of AI in construction.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Careers" },
        ]}
        title="Careers at Datagrid"
        description="Build the future of AI with us."
        variant="agents"
        heroBg="white"
        centered
      />

      <div className="pb-16 sm:pb-20 lg:pb-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border p-8 sm:p-10 text-center">
            <p className="text-base text-secondary leading-relaxed mb-6">
              The Datagrid team is thrilled to join Procore! This acquisition accelerates our shared vision of empowering teams by automating complex workflows across the tools and systems they use every day. We are actively hiring talented individuals to help us build the future of AI in the industry. To view our open roles, please head over to the Procore Careers portal and use the keyword &ldquo;Datagrid&rdquo; in your search.
            </p>
            <a
              href="https://www.procore.com/careers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-150"
            >
              Apply Here
            </a>
          </div>
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
