import Link from "next/link";
import Image from "next/image";
import { getGuides } from "@/lib/queries";
import { PLACEHOLDER_GUIDES } from "@/lib/placeholder-data";
import { SCRAPED_BLOG_POSTS } from "@/lib/scraped-blog-data";
import type { Guide } from "@/lib/types";
import HoverCard from "@/components/hover-card";
import PageHeader from "@/components/page-header";

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

function getFeaturedImage(guide: Guide): string | null {
  const scraped = SCRAPED_BLOG_POSTS.find(
    (p) => p.slug === guide.slug.current
  );
  if (scraped && scraped.featuredImage.url.startsWith("/")) {
    return scraped.featuredImage.url;
  }
  return null;
}

const GUIDE_SLUGS = new Set(
  PLACEHOLDER_GUIDES.map((g) => g.slug.current)
);

function mergeGuides(sanityGuides: Guide[]): Guide[] {
  const scraped = scrapedToGuides();
  const slugSet = new Set(sanityGuides.map((g) => g.slug.current));
  const additional = scraped.filter((g) => !slugSet.has(g.slug.current));
  const all = [...sanityGuides, ...additional];
  return all.filter((g) => !GUIDE_SLUGS.has(g.slug.current));
}

function formatDate(dateString: string | undefined): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function BlogCard({
  guide,
  formatDate: fmt,
  getFeaturedImage: getImg,
}: {
  guide: Guide;
  formatDate: (d: string | undefined) => string;
  getFeaturedImage: (g: Guide) => string | null;
}) {
  const img = getImg(guide);
  return (
    <article>
      <Link href={`/blog/${guide.slug.current}`} className="group block">
        <div className="aspect-[16/10] rounded-xl bg-surface relative overflow-hidden mb-4">
          {img ? (
            <Image
              src={img}
              alt={guide.title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-tertiary">Featured Image</span>
              </div>
            </>
          )}
        </div>
        <h2 className="text-base font-medium text-foreground leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">
          {guide.title}
        </h2>
        <div className="mt-3 flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-medium text-accent">D</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-tertiary">
            <span className="font-medium text-secondary">Datagrid Team</span>
            <span>&middot;</span>
            <span>{fmt(guide.publishedAt)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default async function BlogPage() {
  const guidesData = await getGuides().catch(() => []);
  const sanityGuides = guidesData.length > 0 ? guidesData : PLACEHOLDER_GUIDES;
  const guides = mergeGuides(sanityGuides);

  const [heroPost, ...remainingPosts] = guides;
  const totalPosts = guides.length;

  return (
    <>
      <PageHeader
        breadcrumb="Home / Resources / Blog"
        title="The Datagrid Blog"
        description="Explore the latest in agentic AI, from product updates and industry insights to practical guides that help your team work smarter, faster, and more efficiently."
        variant="blog"
      />

      {/* ── Featured Post ── */}
      {heroPost && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-10">
          <HoverCard>
            <Link
              href={`/blog/${heroPost.slug.current}`}
              className="group flex flex-col sm:flex-row rounded-2xl border border-border bg-background shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="sm:w-60 lg:w-72 shrink-0 aspect-[4/3] sm:aspect-auto sm:min-h-[232px] bg-surface relative overflow-hidden">
                {getFeaturedImage(heroPost) ? (
                  <Image
                    src={getFeaturedImage(heroPost)!}
                    alt={heroPost.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/8 to-accent/3" />
                )}
              </div>
              <div className="p-5 sm:p-6 flex flex-col justify-center min-w-0">
                <span className="inline-flex self-start items-center px-2 py-0.5 text-[11px] font-medium rounded-full bg-surface text-secondary border border-border mb-2">
                  {heroPost.category?.title}
                </span>
                <h2 className="text-xl font-medium text-foreground leading-snug group-hover:text-accent transition-colors duration-200">
                  {heroPost.title}
                </h2>
                <p className="mt-2 text-sm text-secondary leading-relaxed">
                  {heroPost.excerpt}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-tertiary">
                  <span className="font-medium text-secondary">Datagrid Team</span>
                  <span>&middot;</span>
                  <span>{formatDate(heroPost.publishedAt)}</span>
                </div>
              </div>
            </Link>
          </HoverCard>
        </div>
      )}

      {/* ── Toolbar + Grid ── */}
      <div className="pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Sticky toolbar */}
          <div data-sticky-toolbar className="sticky top-[88px] z-40 bg-background py-3 flex items-center gap-3 mb-2 flex-wrap">
            {/* Filter by Category */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-border text-secondary">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="8" y2="18" />
              </svg>
              Filter by Category
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>

            {/* Search */}
            <div className="relative w-56">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search posts..."
                readOnly
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface border border-border rounded-full placeholder:text-secondary/50 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 focus:border-accent/30 transition-colors duration-150"
              />
            </div>

            {/* Right side: count + sort */}
            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs text-secondary py-1.5">
                Showing {totalPosts}
              </span>
              <span className="inline-flex items-center gap-1 py-1.5 text-xs font-medium text-foreground">
                Sort by
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>

          {/* Post Grid */}
          {remainingPosts.length > 0 && (() => {
            const insertAt = 4;
            const before = remainingPosts.slice(0, insertAt);
            const after = remainingPosts.slice(insertAt);

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {before.map((guide) => (
                  <BlogCard key={guide._id} guide={guide} formatDate={formatDate} getFeaturedImage={getFeaturedImage} />
                ))}

                {/* ── Subscribe Card (inline) ── */}
                <div className="sm:col-span-2 rounded-2xl bg-accent/5 border border-accent/10 p-6 sm:p-8 flex flex-col justify-center">
                  <h3 className="text-lg font-medium text-foreground">
                    Subscribe for updates
                  </h3>
                  <p className="mt-1.5 text-sm text-secondary max-w-md">
                    Join the community of operators, project managers, and leaders using
                    agentic AI to move faster and do more with less.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-56 px-4 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-tertiary focus:outline-none focus:border-accent/40"
                    />
                    <button className="px-5 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-150">
                      Get updates
                    </button>
                  </div>
                  <p className="mt-2.5 text-xs text-tertiary">
                    By subscribing you agree to our{" "}
                    <Link href="/privacy" className="underline hover:text-secondary">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>

                {after.map((guide) => (
                  <BlogCard key={guide._id} guide={guide} formatDate={formatDate} getFeaturedImage={getFeaturedImage} />
                ))}
              </div>
            );
          })()}

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
      </div>
    </>
  );
}
