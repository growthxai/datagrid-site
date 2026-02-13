import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/page-header";
import HoverCard from "@/components/hover-card";
import CtaArrow from "@/components/cta-arrow";
import BlueprintBg from "@/components/blueprint-bg";
import { getGuides } from "@/lib/queries";
import { PLACEHOLDER_GUIDES } from "@/lib/placeholder-data";
import { SCRAPED_BLOG_POSTS } from "@/lib/scraped-blog-data";

const GUIDE_CARD_IMAGES: Record<string, string> = {
  "ai-agents-submittal-review": "/blog/submittal-review.jpeg",
  "ai-rfi-management": "/blog/rfi-management.jpeg",
  "construction-document-search": "/blog/document-search.jpeg",
  "reducing-change-order-disputes": "/blog/change-orders.jpeg",
  "ai-safety-inspections": "/blog/safety-inspections.jpeg",
  "gc-guide-ai-adoption": "/blog/gc-ai-adoption.jpeg",
};

const BLOG_IMAGES: Record<string, string> = Object.fromEntries(
  SCRAPED_BLOG_POSTS.map((p) => [p.slug, p.featuredImage.url])
);

export default async function ResourcesPage() {
  const guidesData = await getGuides().catch(() => []);
  const guides = (guidesData.length > 0 ? guidesData : PLACEHOLDER_GUIDES).slice(0, 3);
  const blogPosts = SCRAPED_BLOG_POSTS.slice(0, 3);

  return (
    <>
      <PageHeader
        breadcrumb="Home / Resources"
        title="Resources"
        description="Guides, blog posts, and webinars to help your construction team get the most out of AI."
        variant="guides"
      />

      {/* Guides Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium text-[#4b4036] mb-4">Guides</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
              Practical guides for construction teams
            </h2>
            <p className="mt-3 text-secondary">
              Step-by-step walkthroughs on AI-powered workflows — from automating submittal review to streamlining RFI management and beyond.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map((guide, i) => {
              const img = GUIDE_CARD_IMAGES[guide.slug.current];
              return (
                <HoverCard key={guide._id}>
                  <Link
                    href={`/blog/${guide.slug.current}`}
                    className="relative flex flex-col h-full bg-background rounded-2xl border border-border overflow-hidden group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                  >
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
                      <span className="text-[11px] font-medium text-accent/70 mb-3">
                        Guide {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-base font-medium leading-snug text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px]">
                        {guide.title}
                      </h3>
                      <p className="mt-2 text-sm text-secondary leading-relaxed line-clamp-2 transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                        {guide.excerpt}
                      </p>
                      <div className="mt-auto pt-4 flex items-center">
                        {("readTime" in guide && guide.readTime) && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-tertiary">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-tertiary">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            {(guide as { readTime: number }).readTime} min
                          </span>
                        )}
                        <span className="ml-auto text-sm font-medium inline-flex items-center use-agent-shimmer">
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
          <div className="mt-10 text-center">
            <Link
              href="/guides"
              className="inline-flex group items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-black/[0.03] transition-all duration-200 ease-out"
            >
              View all guides<CtaArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium text-[#4b4036] mb-4">Blog</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
              Insights for modern construction teams
            </h2>
            <p className="mt-3 text-secondary">
              Case studies, thought leadership, and practical advice on deploying AI across your construction workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => {
              const img = BLOG_IMAGES[post.slug];
              return (
                <HoverCard key={post._id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative flex flex-col h-full bg-background rounded-2xl border border-border overflow-hidden group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-surface">
                      {img ? (
                        <Image
                          src={img}
                          alt={post.title}
                          fill
                          className="object-cover group-hover/card:scale-[1.03] transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <span className="text-[11px] font-medium text-accent/70 mb-3">
                        {post.category.title}
                      </span>
                      <h3 className="text-base font-medium leading-snug text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px]">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-secondary leading-relaxed line-clamp-2 transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto pt-4 flex items-center justify-end">
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
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex group items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-black/[0.03] transition-all duration-200 ease-out"
            >
              View all posts<CtaArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium text-[#4b4036] mb-4">Webinars</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground">
              Watch and learn
            </h2>
            <p className="mt-3 text-secondary">
              Live demos and recorded sessions showing how construction teams use Datagrid agents to streamline real workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "AI Workflows for Submittal Review", description: "See how GCs automate spec comparison and compliance checks with the Summary Spec Submittal Agent.", slug: "ai-submittal-review" },
              { title: "From RFIs to Resolution: An AI Walkthrough", description: "Live demo of AI-powered RFI validation and resolution using the RFI Validator Agent.", slug: "rfi-resolution" },
              { title: "Building Your AI Adoption Roadmap", description: "A framework for rolling out AI tools across your construction org — from pilot to full deployment.", slug: "ai-adoption-roadmap" },
            ].map((webinar) => (
              <HoverCard key={webinar.slug}>
                <Link
                  href={`/webinars/${webinar.slug}`}
                  className="relative flex flex-col h-full p-6 bg-background rounded-2xl border border-border group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/5 border border-accent/10 flex items-center justify-center transition-transform duration-300 ease-out group-hover/card:-translate-x-[2px] group-hover/card:-translate-y-[2px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-accent">
                        <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 8.5l4.5 2.75-4.5 2.75V8.5z" fill="currentColor" />
                        <path d="M8 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[2px]">
                    {webinar.title}
                  </h3>
                  <p className="mt-1 text-sm text-secondary line-clamp-2 transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                    {webinar.description}
                  </p>
                  <div className="mt-auto pt-5 flex items-center justify-end transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                    <span className="text-sm font-medium inline-flex items-center use-agent-shimmer">
                      Watch
                      <span className="inline-flex items-center w-3.5 ml-1.5 overflow-hidden">
                        <span className="w-0 group-hover/card:w-[5px] h-[1.5px] bg-current rounded-full transition-[width] duration-200 ease-out shrink-0" />
                        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" className="shrink-0">
                          <path d="M1.5 1L5.5 5L1.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </span>
                  </div>
                </Link>
              </HoverCard>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/webinars"
              className="inline-flex group items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-black/[0.03] transition-all duration-200 ease-out"
            >
              View all webinars<CtaArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="relative py-20 sm:py-28 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="guides" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-[1.1]">
            Ready to put AI to work<br />on your projects?
          </h2>
          <p className="mt-4 text-base text-secondary max-w-xl">
            Join the general contractors and owners who are saving thousands of hours with Datagrid.
          </p>
          <div className="mt-8">
            <Link
              href="/demo"
              className="group inline-flex items-center px-8 py-4 text-base font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out"
            >
              Request a Demo<CtaArrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
