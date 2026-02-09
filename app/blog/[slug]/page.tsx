import Link from "next/link";
import { getGuideBySlug, getGuides } from "@/lib/queries";
import { PLACEHOLDER_GUIDES } from "@/lib/placeholder-data";
import {
  SCRAPED_BLOG_POSTS,
  type ScrapedBlogPost,
  type ScrapedBodySection,
} from "@/lib/scraped-blog-data";
import type { Guide } from "@/lib/types";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Props = { params: Promise<{ slug: string }> };

// ---------------------------------------------------------------------------
// Data helpers
// ---------------------------------------------------------------------------

/** Find a scraped post by slug. */
function findScrapedPost(slug: string): ScrapedBlogPost | undefined {
  return SCRAPED_BLOG_POSTS.find((p) => p.slug === slug);
}

/** Find a placeholder guide by slug. */
function findPlaceholderGuide(slug: string): Guide | undefined {
  return PLACEHOLDER_GUIDES.find((g) => g.slug.current === slug);
}

/** Convert a scraped post to a Guide shape for metadata / header rendering. */
function scrapedToGuide(post: ScrapedBlogPost): Guide {
  return {
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
  };
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug).catch(() => null);
  const scraped = findScrapedPost(slug);
  const fallback = findPlaceholderGuide(slug);
  const data = guide || (scraped ? scrapedToGuide(scraped) : fallback);
  return {
    title: data?.title ? `${data.title} | Datagrid Blog` : "Article | Datagrid Blog",
    description: data?.excerpt || "Read this guide from Datagrid.",
  };
}

// ---------------------------------------------------------------------------
// Body rendering
// ---------------------------------------------------------------------------

/**
 * Parse inline bold markers (**text**) into React nodes with <strong> tags.
 */
function parseInlineBold(text: string): ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

/**
 * Render a structured body section array to JSX.
 * Maps each ScrapedBodySection type to the appropriate semantic HTML
 * with design-system styling.
 */
function renderBody(sections: ScrapedBodySection[]): ReactNode[] {
  return sections.map((section, idx) => {
    switch (section.type) {
      case "heading": {
        const id = section.text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        if (section.level === 2) {
          return (
            <h2
              key={idx}
              id={id}
              className="text-[1.75rem] sm:text-4xl font-bold leading-[1.2] tracking-tight text-foreground mt-12 mb-4 scroll-mt-24"
            >
              {section.text}
            </h2>
          );
        }
        if (section.level === 3) {
          return (
            <h3
              key={idx}
              id={id}
              className="text-[1.375rem] sm:text-2xl font-semibold leading-[1.3] text-foreground mt-8 mb-3"
            >
              {section.text}
            </h3>
          );
        }
        return (
          <h4
            key={idx}
            id={id}
            className="text-lg font-semibold text-foreground mt-6 mb-2"
          >
            {section.text}
          </h4>
        );
      }

      case "paragraph":
        return (
          <p
            key={idx}
            className="text-base sm:text-lg leading-relaxed text-secondary mb-6"
          >
            {parseInlineBold(section.text)}
          </p>
        );

      case "list": {
        const Tag = section.ordered ? "ol" : "ul";
        return (
          <Tag
            key={idx}
            className={`mb-6 space-y-2 pl-6 ${
              section.ordered
                ? "list-decimal marker:text-accent marker:font-semibold"
                : "list-disc marker:text-accent"
            }`}
          >
            {section.items.map((item, i) => (
              <li
                key={i}
                className="text-base sm:text-lg leading-relaxed text-secondary pl-1"
              >
                {parseInlineBold(item)}
              </li>
            ))}
          </Tag>
        );
      }

      case "image":
        return (
          <figure key={idx} className="my-8">
            <div className="aspect-video rounded-2xl bg-surface relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
              <span className="text-sm text-tertiary relative z-10">
                {section.image.alt || "Image"}
              </span>
            </div>
            {section.image.caption && (
              <figcaption className="mt-3 text-sm text-tertiary text-center">
                {section.image.caption}
              </figcaption>
            )}
          </figure>
        );

      case "blockquote":
        return (
          <blockquote
            key={idx}
            className="my-8 border-l-4 border-accent pl-6 py-4"
          >
            <p className="text-base sm:text-lg leading-relaxed text-foreground italic">
              &ldquo;{section.text}&rdquo;
            </p>
            {section.attribution && (
              <footer className="mt-3 text-sm font-medium text-tertiary">
                &mdash; {section.attribution}
              </footer>
            )}
          </blockquote>
        );

      case "callout":
        return (
          <div
            key={idx}
            className="my-8 p-6 rounded-2xl bg-accent-light border border-accent/20"
          >
            <p className="text-base leading-relaxed text-foreground">
              {parseInlineBold(section.text)}
            </p>
          </div>
        );

      default:
        return null;
    }
  });
}

/**
 * Extract h2 headings from the body for the table of contents.
 */
function extractTocItems(
  sections: ScrapedBodySection[]
): { id: string; text: string }[] {
  return sections
    .filter(
      (s): s is Extract<ScrapedBodySection, { type: "heading" }> =>
        s.type === "heading" && s.level === 2
    )
    .map((s) => ({
      id: s.text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      text: s.text,
    }));
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // ── Resolve the guide data ──
  const guideData = await getGuideBySlug(slug).catch(() => null);
  const scrapedPost = findScrapedPost(slug);
  const placeholderGuide = findPlaceholderGuide(slug);

  const guide: Guide =
    guideData ||
    (scrapedPost ? scrapedToGuide(scrapedPost) : null) ||
    placeholderGuide ||
    PLACEHOLDER_GUIDES[0];

  // ── Resolve scraped body (for rich content rendering) ──
  // Try to match current slug to scraped posts first
  const bodyPost = scrapedPost || SCRAPED_BLOG_POSTS[0];
  const tocItems = extractTocItems(bodyPost.body);

  // ── Related posts ──
  const allGuidesData = await getGuides().catch(() => []);
  const allGuides =
    allGuidesData.length > 0 ? allGuidesData : PLACEHOLDER_GUIDES;
  const sanityRelated = allGuides
    .filter((g) => g._id !== guide._id)
    .slice(0, 3);

  // Prefer scraped related posts when available, otherwise fall back to Sanity
  const relatedPosts =
    scrapedPost && scrapedPost.relatedPosts.length > 0
      ? scrapedPost.relatedPosts
      : sanityRelated.map((g) => ({
          title: g.title,
          slug: g.slug.current,
          excerpt: g.excerpt ?? "",
        }));

  // ── Related agents & connectors from scraped data ──
  const relatedAgents = scrapedPost?.relatedAgents ?? bodyPost.relatedAgents;
  const relatedConnectors =
    scrapedPost?.relatedConnectors ?? bodyPost.relatedConnectors;

  // ── CTA data ──
  const cta = scrapedPost?.cta ?? bodyPost.cta;

  // ── Read time ──
  const readTime = scrapedPost?.readTimeMinutes ?? bodyPost.readTimeMinutes;

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Breadcrumb ── */}
        <nav className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-accent transition-colors duration-200"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </nav>

        {/* ── Three-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] xl:grid-cols-[220px_1fr_220px] gap-8 lg:gap-12">
          {/* ── Left: Table of Contents (sticky, hidden on mobile) ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold tracking-[0.1em] text-tertiary mb-4">
                On this page
              </p>
              <nav className="space-y-2">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-secondary hover:text-accent transition-colors duration-200 leading-snug"
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Center: Article ── */}
          <div className="max-w-3xl mx-auto w-full lg:mx-0">
            {/* ── Article Header ── */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-surface text-secondary border border-border">
                  {guide.category?.title}
                </span>
              </div>
              <h1 className="text-[2rem] sm:text-5xl font-medium leading-[1.15] tracking-tight text-foreground">
                {guide.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-secondary">
                <span className="font-medium text-foreground">
                  {guide.author || "Datagrid Team"}
                </span>
                <span className="text-tertiary">&middot;</span>
                <time className="text-tertiary">
                  {guide.publishedAt
                    ? new Date(guide.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""}
                </time>
                <span className="text-tertiary">&middot;</span>
                <span className="text-tertiary">{readTime} min read</span>
              </div>
            </header>

            {/* ── Featured Image ── */}
            <div className="aspect-video rounded-2xl bg-surface relative overflow-hidden flex items-center justify-center mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
              <span className="text-sm text-tertiary relative z-10">
                Featured Image
              </span>
            </div>

            {/* ── Article Body ── */}
            <article>{renderBody(bodyPost.body)}</article>

            {/* ── Related Agents ── */}
            {relatedAgents.length > 0 && (
              <section className="mt-16">
                <h3 className="text-[1.375rem] sm:text-2xl font-semibold leading-[1.3] text-foreground mb-6">
                  Related Agents
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedAgents.map((agent) => (
                    <Link
                      key={agent.slug}
                      href={`/agents/${agent.slug}`}
                      className="group p-6 rounded-2xl border border-border bg-background hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out"
                    >
                      <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                        {agent.title}
                      </span>
                      <p className="text-sm text-secondary mt-1 leading-relaxed">
                        {agent.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ── Related Connectors ── */}
            {relatedConnectors.length > 0 && (
              <section className="mt-12">
                <h3 className="text-[1.375rem] sm:text-2xl font-semibold leading-[1.3] text-foreground mb-6">
                  Related Connectors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedConnectors.map((connector) => (
                    <Link
                      key={connector.slug}
                      href={`/connectors/${connector.slug}`}
                      className="group p-6 rounded-2xl border border-border bg-background hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out"
                    >
                      <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                        {connector.title}
                      </span>
                      <p className="text-sm text-secondary mt-1 leading-relaxed">
                        {connector.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Right: Empty column for xl balance ── */}
          <aside className="hidden xl:block" />
        </div>

        {/* ── Bottom CTA (dark section) ── */}
        <section className="mt-20 rounded-2xl bg-dark relative overflow-hidden">
          {/* Accent glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent/10 rounded-full blur-3xl" />
          <div className="relative px-8 py-16 sm:py-20 text-center">
            <h3 className="text-[1.75rem] sm:text-4xl font-bold leading-[1.2] tracking-tight text-dark-text mb-4">
              {cta.heading}
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-dark-muted mb-8 max-w-xl mx-auto">
              {cta.description}
            </p>
            <Link
              href={cta.buttonHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md active:shadow-sm transition-all duration-200 ease-out"
            >
              {cta.buttonText}
            </Link>
          </div>
        </section>

        {/* ── Related Posts ── */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 sm:mt-20">
            <h3 className="text-[1.75rem] sm:text-4xl font-bold leading-[1.2] tracking-tight text-foreground mb-8">
              More from the blog
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group p-8 rounded-2xl border border-border bg-background hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out"
                >
                  <h4 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200 leading-snug">
                    {post.title}
                  </h4>
                  <p className="mt-3 text-sm text-secondary line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Read article &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
