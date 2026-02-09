import Link from "next/link";
import { getGuides } from "@/lib/queries";
import { PLACEHOLDER_GUIDES } from "@/lib/placeholder-data";
import {
  SCRAPED_BLOG_POSTS,
  BLOG_INDEX_STRUCTURE,
} from "@/lib/scraped-blog-data";
import type { Guide } from "@/lib/types";

export const metadata = {
  title: "Blog | Datagrid",
  description:
    "Guides, insights, and updates on AI in construction from the Datagrid team.",
};

/** Convert scraped blog posts into the Guide shape for consistent rendering. */
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

/** Look up the reading time for a guide slug from scraped data, or estimate. */
function getReadTime(guide: Guide): number {
  const scraped = SCRAPED_BLOG_POSTS.find(
    (p) => p.slug === guide.slug.current
  );
  if (scraped) return scraped.readTimeMinutes;
  // Estimate from excerpt length: rough heuristic
  const words = (guide.excerpt ?? "").split(/\s+/).length;
  return Math.max(3, Math.round(words / 40));
}

/** Merge Sanity guides with scraped data, deduplicating by slug. */
function mergeGuides(sanityGuides: Guide[]): Guide[] {
  const scraped = scrapedToGuides();
  const slugSet = new Set(sanityGuides.map((g) => g.slug.current));
  const additional = scraped.filter((g) => !slugSet.has(g.slug.current));
  return [...sanityGuides, ...additional];
}

/** Key categories for the filter pills. */
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
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const guidesData = await getGuides().catch(() => []);
  const sanityGuides = guidesData.length > 0 ? guidesData : PLACEHOLDER_GUIDES;
  const guides = mergeGuides(sanityGuides);

  const [heroPost, ...remainingPosts] = guides;

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-[0.1em] text-accent mb-3">From the Blog</p>
          <h1 className="text-[2rem] sm:text-5xl font-medium leading-[1.15] tracking-tight text-foreground">
            Blog
          </h1>
          <p className="mt-1 text-base sm:text-lg leading-relaxed text-secondary max-w-2xl">
            Guides, case studies, and insights on how AI is transforming
            construction workflows.
          </p>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="flex flex-wrap gap-2 mb-12">
          {FILTER_CATEGORIES.map((cat) => (
            <span
              key={cat.slug}
              className={
                cat.slug === "all"
                  ? "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground border border-accent cursor-default"
                  : "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-surface text-secondary border border-border cursor-default"
              }
            >
              {cat.title}
            </span>
          ))}
        </div>

        {/* ── Hero / Featured Post ── */}
        {heroPost && (
          <Link
            href={`/blog/${heroPost.slug.current}`}
            className="group block mb-12 p-8 rounded-2xl border border-border bg-background hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Featured image placeholder */}
              <div className="aspect-video rounded-xl bg-surface relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                <span className="text-sm text-tertiary relative z-10">
                  Featured Image
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-surface text-secondary border border-border">
                    {heroPost.category?.title}
                  </span>
                  <span className="text-xs text-tertiary">
                    {formatDate(heroPost.publishedAt)}
                  </span>
                  <span className="text-xs text-tertiary">
                    &middot; {getReadTime(heroPost)} min read
                  </span>
                </div>
                <h2 className="text-[1.75rem] sm:text-4xl font-medium leading-[1.2] tracking-tight text-foreground group-hover:text-accent transition-colors duration-200">
                  {heroPost.title}
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-secondary line-clamp-3">
                  {heroPost.excerpt}
                </p>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all duration-200">
                    Read article
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* ── Post Grid ── */}
        {remainingPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((guide) => (
              <Link
                key={guide._id}
                href={`/blog/${guide.slug.current}`}
                className="group block p-8 rounded-2xl border border-border bg-background hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out overflow-hidden"
              >
                {/* Featured image placeholder */}
                <div className="aspect-video rounded-xl bg-surface relative overflow-hidden flex items-center justify-center mb-6 -mx-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                  <span className="text-sm text-tertiary relative z-10">
                    Featured Image
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-surface text-secondary border border-border">
                    {guide.category?.title}
                  </span>
                  <span className="text-xs text-tertiary">
                    {formatDate(guide.publishedAt)}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200 leading-snug">
                  {guide.title}
                </h2>
                <p className="mt-2 text-sm text-secondary line-clamp-2 leading-relaxed">
                  {guide.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-tertiary">
                    {getReadTime(guide)} min read
                  </span>
                  <span className="text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Read &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
