import Link from "next/link";
import Image from "next/image";
import { getGuides } from "@/lib/queries";
import { PLACEHOLDER_GUIDES } from "@/lib/placeholder-data";
import {
  SCRAPED_BLOG_POSTS,
  BLOG_INDEX_STRUCTURE,
} from "@/lib/scraped-blog-data";
import type { Guide } from "@/lib/types";
import HoverCard from "@/components/hover-card";

export const metadata = {
  title: "Blog | Datagrid",
  description:
    "Guides, insights, and updates on AI in construction from the Datagrid team.",
};

function scrapedToGuides(): Guide[] {
  return SCRAPED_BLOG_POSTS.map((post) => ({
    _id: post._id,
    title: post.title,
    slug: { current: post.slug },
    excerpt: post.excerpt,
    author: post.author,
    publishedAt: post.publishedAt,
    category: {
      title: post.category.title,
      slug: { current: post.category.slug },
    },
  }));
}

function getReadTime(guide: Guide): number {
  const scraped = SCRAPED_BLOG_POSTS.find(
    (p) => p.slug === guide.slug.current
  );
  if (scraped) return scraped.readTimeMinutes;
  const words = (guide.excerpt ?? "").split(/\s+/).length;
  return Math.max(3, Math.round(words / 40));
}

function mergeGuides(sanityGuides: Guide[]): Guide[] {
  const scraped = scrapedToGuides();
  const slugSet = new Set(sanityGuides.map((g) => g.slug.current));
  const additional = scraped.filter((g) => !slugSet.has(g.slug.current));
  return [...sanityGuides, ...additional];
}

const FILTER_CATEGORIES = [
  { title: "All", slug: "all" },
  ...BLOG_INDEX_STRUCTURE.categories.slice(0, 5).map((c) => ({
    title: c.title,
    slug: c.slug,
  })),
];

function formatDate(dateString: string | undefined): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const guidesData = await getGuides().catch(() => []);
  const sanityGuides = guidesData.length > 0 ? guidesData : PLACEHOLDER_GUIDES;
  const guides = mergeGuides(sanityGuides);

  const [heroPost, ...remainingPosts] = guides;
  const totalPosts = guides.length;

  return (
    <>
      {/* ── Dark Hero ── */}
      <section className="bg-dark pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight">
            The Datagrid<br />Resource Hub
          </h1>
          <p className="mt-4 text-base text-dark-muted max-w-xl mx-auto leading-relaxed">
            Explore the latest in agentic AI, from product updates and industry insights to
            practical guides that help your team work smarter, faster, and more efficiently.
          </p>
        </div>
      </section>

      {/* ── Featured Post ── */}
      {heroPost && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10">
          <HoverCard>
          <Link
            href={`/blog/${heroPost.slug.current}`}
            className="group block rounded-2xl border border-border bg-background shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-[16/10] lg:aspect-auto bg-surface relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/8 to-accent/3" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm text-tertiary">Featured Image</span>
                </div>
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <span className="inline-flex self-start items-center px-3 py-1 text-xs font-medium rounded-full bg-surface text-secondary border border-border mb-4">
                  {heroPost.category?.title}
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium text-foreground leading-snug group-hover:text-accent transition-colors duration-200">
                  {heroPost.title}
                </h2>
                <p className="mt-3 text-base text-secondary leading-relaxed line-clamp-2">
                  {heroPost.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-accent">D</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-tertiary">
                    <span className="font-medium text-secondary">Datagrid Team</span>
                    <span>&middot;</span>
                    <span>{formatDate(heroPost.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          </HoverCard>
        </div>
      )}

      {/* ── Filter Bar ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Category filter */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm text-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-tertiary">
                <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Filter by Category
            </div>
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm text-tertiary w-64">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Search by keyword
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-secondary">
            Sort by
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <p className="mt-6 text-sm text-tertiary">
          Showing {totalPosts}
        </p>
      </div>

      {/* ── Post Grid ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 pb-16 sm:pb-20 lg:pb-24">
        {remainingPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {remainingPosts.map((guide, i) => (
              <article key={guide._id}>
                {/* Inline newsletter CTA after 6 posts — spans 2 cols */}
                {i === 6 && (
                  <div className="col-span-1 sm:col-span-2 mb-10 -mt-2 rounded-2xl bg-accent/5 border border-accent/10 p-8 sm:p-10">
                    <h3 className="text-xl font-medium text-foreground">
                      Subscribe for updates
                    </h3>
                    <p className="mt-2 text-sm text-secondary max-w-md">
                      Join the community of operators, project managers, and leaders using
                      agentic AI to move faster and do more with less.
                    </p>
                    <div className="mt-5 flex items-center gap-3 max-w-sm">
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-tertiary focus:outline-none focus:border-accent/40"
                      />
                      <button className="px-5 py-2.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-150">
                        Get updates
                      </button>
                    </div>
                    <p className="mt-3 text-xs text-tertiary">
                      By subscribing you agree to our{" "}
                      <Link href="/privacy" className="underline hover:text-secondary">
                        Privacy Policy
                      </Link>.
                    </p>
                  </div>
                )}

                <Link
                  href={`/blog/${guide.slug.current}`}
                  className="group block"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] rounded-xl bg-surface relative overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-tertiary">Featured Image</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-medium text-foreground leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">
                    {guide.title}
                  </h2>

                  {/* Author + Date */}
                  <div className="mt-3 flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-medium text-accent">D</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-tertiary">
                      <span className="font-medium text-secondary">Datagrid Team</span>
                      <span>&middot;</span>
                      <span>{formatDate(guide.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        <div className="mt-14 flex items-center justify-center gap-1.5">
          <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-sm font-medium">
            1
          </span>
          {[2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-sm text-secondary hover:bg-surface transition-colors duration-150 cursor-pointer"
            >
              {n}
            </span>
          ))}
          <span className="text-sm text-tertiary px-1">&hellip;</span>
          <span className="w-9 h-9 flex items-center justify-center rounded-lg text-sm text-secondary hover:bg-surface transition-colors duration-150 cursor-pointer">
            86
          </span>
          <span className="w-9 h-9 flex items-center justify-center rounded-lg text-secondary hover:bg-surface transition-colors duration-150 cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </>
  );
}
