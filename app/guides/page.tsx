import Link from "next/link";
import Image from "next/image";
import { PLACEHOLDER_GUIDES } from "@/lib/placeholder-data";
import BlueprintBg from "@/components/blueprint-bg";
import HoverCard from "@/components/hover-card";
import PageHeader from "@/components/page-header";

const GUIDE_IMAGES: Record<string, string> = {
  "ai-agents-submittal-review": "/blog/submittal-review.jpeg",
  "ai-rfi-management": "/blog/rfi-management.jpeg",
  "construction-document-search": "/blog/document-search.jpeg",
  "reducing-change-order-disputes": "/blog/change-orders.jpeg",
  "ai-safety-inspections": "/blog/safety-inspections.jpeg",
  "gc-guide-ai-adoption": "/blog/gc-ai-adoption.jpeg",
};

export const metadata = {
  title: "Guides",
  description: "Insights, guides, and best practices for AI-powered construction workflows.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  workflows: "bg-accent text-accent-foreground",
  "best-practices": "bg-emerald-600 text-white",
  technology: "bg-sky-600 text-white",
  industry: "bg-violet-600 text-white",
};

export default function GuidesPage() {
  const guides = PLACEHOLDER_GUIDES;

  return (
    <>
      <PageHeader
        breadcrumb="Resources/Guides"
        title="Guides for Construction Teams"
        description="Insights, guides, and best practices for AI-powered construction workflows."
        variant="guides"
      />

      {/* Guide cards */}
      <div className="py-14 sm:py-18 lg:py-22 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, i) => {
              const img = GUIDE_IMAGES[guide.slug.current];
              const agentCount = guide.relatedAgentSlugs?.length ?? 0;
              const connectorCount = guide.relatedConnectorSlugs?.length ?? 0;
              return (
                <HoverCard key={guide._id}>
                  <Link
                    href={`/blog/${guide.slug.current}`}
                    className="relative flex flex-col h-full bg-background rounded-2xl border border-border overflow-hidden group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                  >
                    {/* Photo */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-surface">
                      {img ? (
                        <Image
                          src={img}
                          alt={guide.title}
                          fill
                          className="object-cover group-hover/card:scale-[1.03] transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                      )}
                    </div>

                    <div className="flex flex-col flex-1 p-5">
                      {/* Guide number + pills */}
                      <div className="flex items-center gap-[8px] mb-3">
                        <span className="text-[11px] font-medium text-accent/70 mr-auto">
                          Guide {String(i + 1).padStart(2, "0")}
                        </span>
                        {agentCount > 0 && (
                          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-accent/8 text-accent/80 border border-accent/12">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                              <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {agentCount} agent{agentCount !== 1 ? "s" : ""}
                          </span>
                        )}
                        {connectorCount > 0 && (
                          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-surface text-tertiary border border-border">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                              <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            {connectorCount} connector{connectorCount !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-base font-medium leading-snug text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px]">
                        {guide.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="mt-2 text-sm text-secondary leading-relaxed line-clamp-3 transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                        {guide.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        {guide.readTime ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-tertiary">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-tertiary">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            {guide.readTime} min
                          </span>
                        ) : (
                          <span />
                        )}
                        <span className="text-sm font-medium inline-flex items-center use-agent-shimmer">
                          Read
                          <span className="inline-flex items-center w-3.5 ml-1.5 overflow-hidden">
                            <span className="w-0 group-hover/card:w-[5px] h-[1.5px] bg-current rounded-full transition-[width] duration-200 ease-out shrink-0" />
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" className="shrink-0">
                              <path d="M1.5 1L5.5 5L1.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </HoverCard>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pre-footer CTA */}
      <section className="relative py-20 sm:py-28 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="guides" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-[1.1]">
            Ready to transform<br />your workflows?
          </h2>
          <p className="mt-4 text-base text-secondary">
            Free to get started. No credit card required.
          </p>
          <Link
            href="/get-started"
            className="mt-6 inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-150"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}
