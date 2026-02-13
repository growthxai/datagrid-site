import Link from "next/link";
import Image from "next/image";
import { getGuideBySlug, getGuides } from "@/lib/queries";
import { PLACEHOLDER_GUIDES } from "@/lib/placeholder-data";
import {
  SCRAPED_BLOG_POSTS,
  type ScrapedBlogPost,
  type ScrapedBodySection,
} from "@/lib/scraped-blog-data";
import { USE_CASE_DATA } from "@/lib/cross-references";
import type { Guide } from "@/lib/types";
import type { ReactNode } from "react";
import HoverCard from "@/components/hover-card";
import BlueprintBg from "@/components/blueprint-bg";
import StickyBreadcrumb from "@/components/sticky-breadcrumb";

// ---------------------------------------------------------------------------
// Connector icons
// ---------------------------------------------------------------------------

const CONNECTOR_ICON: Record<string, string> = {
  procore: "/logos/icons/procore.svg",
  plangrid: "/logos/icons/plangrid.svg",
  "autodesk-build": "/logos/icons/autodesk.svg",
  "autodesk-acc": "/logos/icons/autodesk.svg",
  bluebeam: "/logos/icons/bluebeam.svg",
  "sage-300-cre": "/logos/icons/sage.svg",
  "microsoft-project": "/logos/icons/microsoft-project.svg",
  sharepoint: "/logos/icons/sharepoint.svg",
  "oracle-aconex": "/logos/icons/oracle-aconex.svg",
  "p6-primavera": "/logos/icons/p6-primavera.svg",
  "trimble-connect": "/logos/icons/trimble-connect.svg",
  quickbase: "/logos/icons/quickbase.svg",
  "imap-email": "/logos/icons/imap-email.svg",
  slack: "/logos/icons/slack.svg",
  egnyte: "/logos/icons/egnyte.svg",
  quickbooks: "/logos/icons/quickbooks.svg",
  "google-drive": "/logos/icons/google-drive.svg",
  notion: "/logos/icons/notion.svg",
};

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
              className="text-[1.75rem] sm:text-4xl font-medium leading-[1.2] tracking-tight text-foreground mt-12 mb-4 scroll-mt-24"
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
              className="text-[1.375rem] sm:text-2xl font-medium leading-[1.3] text-foreground mt-8 mb-3"
            >
              {section.text}
            </h3>
          );
        }
        return (
          <h4
            key={idx}
            id={id}
            className="text-lg font-medium text-foreground mt-6 mb-2"
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
            {section.image.url.startsWith("/") ? (
              <div className="aspect-video rounded-2xl bg-surface relative overflow-hidden">
                <Image
                  src={section.image.url}
                  alt={section.image.alt || "Image"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video rounded-2xl bg-surface relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                <span className="text-sm text-tertiary relative z-10">
                  {section.image.alt || "Image"}
                </span>
              </div>
            )}
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

      case "agent-callout":
        return (
          <div key={idx} className="my-10">
            <HoverCard>
              <Link
                href={`/agents/${section.agentSlug}`}
                className="relative flex flex-col p-6 sm:p-8 bg-background rounded-2xl border border-border group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-lg transition-transform duration-300 ease-out group-hover/card:-translate-x-[2px] group-hover/card:-translate-y-[2px]">
                    {section.icon}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[2px]">
                  {section.agentTitle}
                </h4>
                <p className="mt-1 text-sm text-secondary leading-relaxed transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                  {section.description}
                </p>
                <div className="mt-auto pt-5 flex items-center justify-between transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                  {section.connectors && section.connectors.length > 0 ? (
                    <div className="flex items-center gap-1.5">
                      {section.connectors.map((c) => {
                        const connSlug = c.toLowerCase().replace(/\s+/g, "-");
                        const icon = CONNECTOR_ICON[connSlug];
                        return (
                          <span
                            key={c}
                            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-surface border border-border text-tertiary"
                          >
                            {icon && (
                              <Image
                                src={icon}
                                alt={c}
                                width={12}
                                height={12}
                                className="w-3 h-3 object-contain grayscale group-hover/card:grayscale-0 transition-[filter] duration-300 ease-out"
                              />
                            )}
                            {c}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <div />
                  )}
                  <span className="text-sm font-medium inline-flex items-center use-agent-shimmer">
                    Use Agent <span className="ml-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            </HoverCard>
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

  // Prefer scraped related posts when available, pad to 3 from all sources
  const scrapedRelated =
    scrapedPost && scrapedPost.relatedPosts.length > 0
      ? scrapedPost.relatedPosts
      : [];
  const usedSlugs = new Set([slug, ...scrapedRelated.map((p) => p.slug)]);

  // Build a pool from all guides + all scraped blog posts for padding
  const guidePadding = allGuides
    .filter((g) => !usedSlugs.has(g.slug.current))
    .map((g) => ({ title: g.title, slug: g.slug.current, excerpt: g.excerpt ?? "" }));
  const scrapedPadding = SCRAPED_BLOG_POSTS
    .filter((p) => !usedSlugs.has(p.slug))
    .map((p) => ({ title: p.title, slug: p.slug, excerpt: p.excerpt }));
  const padding = [...guidePadding, ...scrapedPadding].filter(
    (p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i
  );
  const relatedPosts = [...scrapedRelated, ...padding].slice(0, 3);

  // ── Related agents & connectors from scraped data ──
  const relatedAgents = scrapedPost?.relatedAgents ?? bodyPost.relatedAgents;
  const relatedConnectors =
    scrapedPost?.relatedConnectors ?? bodyPost.relatedConnectors;

  // ── Derive related use cases from the post's agents ──
  const relatedUseCases = Object.entries(USE_CASE_DATA)
    .filter(([, uc]) =>
      uc.agentSlugs.some((as) => relatedAgents.some((ra) => ra.slug === as))
    )
    .map(([ucSlug, uc]) => ({ slug: ucSlug, title: uc.title }));

  // ── CTA data ──
  const cta = scrapedPost?.cta ?? bodyPost.cta;

  // ── Read time ──
  const readTime = scrapedPost?.readTimeMinutes ?? bodyPost.readTimeMinutes;

  return (
    <>
      <StickyBreadcrumb breadcrumb={[
        { label: "Resources", href: "/resources" },
        { label: "Blog", href: "/blog" },
        { label: guide.title },
      ]} />

      <div className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Three-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] xl:grid-cols-[220px_1fr_260px] gap-8 lg:gap-12">
          {/* ── Left: Table of Contents (sticky, hidden on mobile) ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-[160px]">
              <p className="text-xs font-medium text-tertiary mb-4">
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
              <p className="text-xs font-medium text-[#4b4036] mb-4">{guide.category?.title || "Blog"}</p>
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
            {bodyPost.featuredImage.url.startsWith("/") ? (
              <div className="aspect-video rounded-2xl bg-surface relative overflow-hidden mb-12">
                <Image
                  src={bodyPost.featuredImage.url}
                  alt={bodyPost.featuredImage.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video rounded-2xl bg-surface relative overflow-hidden flex items-center justify-center mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                <span className="text-sm text-tertiary relative z-10">
                  Featured Image
                </span>
              </div>
            )}

            {/* ── Article Body ── */}
            <article>{renderBody(bodyPost.body)}</article>

            {/* ── Related Agents ── */}
            {relatedAgents.length > 0 && (
              <section className="mt-16">
                <h3 className="text-[1.375rem] sm:text-2xl font-medium leading-[1.3] text-foreground mb-6">
                  Agents in this guide
                </h3>
                <div className="space-y-4">
                  {relatedAgents.map((agent) => (
                    <HoverCard key={agent.slug}>
                      <Link
                        href={`/agents/${agent.slug}`}
                        className="relative flex flex-col h-full p-6 bg-background rounded-2xl border border-border group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <span className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center transition-transform duration-300 ease-out group-hover/card:-translate-x-[2px] group-hover/card:-translate-y-[2px]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-accent">
                              <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </div>
                        <h4 className="text-lg font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[2px]">
                          {agent.title}
                        </h4>
                        <p className="mt-1 text-sm text-secondary leading-relaxed transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                          {agent.shortDescription}
                        </p>
                        <div className="mt-auto pt-5 flex items-center justify-between transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                          {relatedConnectors.length > 0 ? (
                            <div className="flex items-center gap-1.5">
                              {relatedConnectors.map((c) => {
                                const icon = CONNECTOR_ICON[c.slug];
                                return (
                                  <span
                                    key={c.slug}
                                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-surface border border-border text-tertiary"
                                  >
                                    {icon && (
                                      <Image
                                        src={icon}
                                        alt={c.title}
                                        width={12}
                                        height={12}
                                        className="w-3 h-3 object-contain grayscale group-hover/card:grayscale-0 transition-[filter] duration-300 ease-out"
                                      />
                                    )}
                                    {c.title}
                                  </span>
                                );
                              })}
                            </div>
                          ) : (
                            <div />
                          )}
                          <span className="text-sm font-medium inline-flex items-center use-agent-shimmer">
                            Use Agent <span className="ml-1">&rarr;</span>
                          </span>
                        </div>
                      </Link>
                    </HoverCard>
                  ))}
                </div>
              </section>
            )}

            {/* ── Works with ── */}
            {relatedConnectors.length > 0 && (
              <section className="mt-12">
                <h3 className="text-[1.375rem] sm:text-2xl font-medium leading-[1.3] text-foreground mb-6">
                  Works with
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {relatedConnectors.map((connector) => {
                    const icon = CONNECTOR_ICON[connector.slug];
                    return (
                      <HoverCard key={connector.slug}>
                        <Link
                          href={`/connectors/${connector.slug}`}
                          className="relative flex flex-col h-full p-4 bg-background rounded-xl border border-border group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                        >
                          <div className="shrink-0 w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden mb-3 transition-transform duration-300 ease-out group-hover/card:-translate-x-[2px] group-hover/card:-translate-y-[2px]">
                            {icon ? (
                              <Image
                                src={icon}
                                alt={connector.title}
                                width={16}
                                height={16}
                                className="w-4 h-4 object-contain"
                              />
                            ) : (
                              <span className="text-xs font-medium text-accent">
                                {connector.title.charAt(0)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px] leading-snug">
                            {connector.title}
                          </p>
                          <p className="mt-0.5 text-xs text-tertiary line-clamp-1 transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                            {connector.shortDescription}
                          </p>
                        </Link>
                      </HoverCard>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* ── Right sidebar ── */}
          <aside className="hidden xl:block">
            <div className="sticky top-[160px] space-y-8">
              {/* Related Agents */}
              {relatedAgents.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-tertiary mb-3">
                    Agents in this guide
                  </p>
                  <div className="space-y-2.5">
                    {relatedAgents.map((agent) => (
                      <HoverCard key={agent.slug}>
                        <Link
                          href={`/agents/${agent.slug}`}
                          className="group block p-3 rounded-xl border border-border bg-background hover:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                        >
                          <p className="text-sm font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out leading-snug group-hover/card:-translate-x-[1px]">
                            {agent.title}
                          </p>
                          <p className="mt-0.5 text-xs text-tertiary line-clamp-2 leading-snug transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                            {agent.shortDescription}
                          </p>
                        </Link>
                      </HoverCard>
                    ))}
                  </div>
                </div>
              )}

              {/* Connectors */}
              {relatedConnectors.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-tertiary mb-3">
                    Works with
                  </p>
                  <div className="space-y-0.5">
                    {relatedConnectors.map((conn) => {
                      const icon = CONNECTOR_ICON[conn.slug];
                      return (
                        <Link
                          key={conn.slug}
                          href={`/connectors/${conn.slug}`}
                          className="group flex items-center gap-2.5 py-1.5 text-sm text-secondary hover:text-accent transition-colors duration-150"
                        >
                          <span className="shrink-0 w-5 h-5 flex items-center justify-center overflow-hidden">
                            {icon ? (
                              <Image
                                src={icon}
                                alt={conn.title}
                                width={16}
                                height={16}
                                className="w-4 h-4 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-150"
                              />
                            ) : (
                              <span className="text-[10px] font-semibold text-tertiary">
                                {conn.title.charAt(0)}
                              </span>
                            )}
                          </span>
                          {conn.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Use Cases */}
              {relatedUseCases.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-tertiary mb-3">
                    Use cases
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {relatedUseCases.map((uc) => (
                      <Link
                        key={uc.slug}
                        href={`/agents/for/${uc.slug}`}
                        className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full border border-border bg-background text-secondary hover:text-foreground hover:border-accent/30 transition-all duration-200"
                      >
                        {uc.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-tertiary mb-3">
                    Related articles
                  </p>
                  <div className="space-y-2.5">
                    {relatedPosts.slice(0, 3).map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-150 leading-snug">
                          {post.title}
                        </p>
                        <p className="mt-0.5 text-xs text-tertiary line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* ── Bottom CTA ── */}
        <section className="mt-20 rounded-2xl bg-[#f5f1ed] relative overflow-hidden">
          <div className="absolute inset-0">
            <BlueprintBg variant="agents" />
          </div>
          <div className="relative px-8 py-16 sm:py-20 text-center">
            <h3 className="text-[1.75rem] sm:text-4xl font-medium leading-[1.2] tracking-tight text-foreground mb-4">
              {cta.heading}
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-secondary mb-8 max-w-xl mx-auto">
              {cta.description}
            </p>
            <Link
              href={cta.buttonHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md active:shadow-sm transition-all duration-200 ease-out"
            >
              {cta.buttonText}
            </Link>
          </div>
        </section>

        {/* ── Related Posts ── */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 sm:mt-20">
            <h3 className="text-[1.75rem] sm:text-4xl font-medium leading-[1.2] tracking-tight text-foreground mb-8">
              Related articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => {
                const scraped = SCRAPED_BLOG_POSTS.find((p) => p.slug === post.slug);
                const img = scraped?.featuredImage.url;
                return (
                  <HoverCard key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative flex flex-col h-full bg-background rounded-2xl border border-border overflow-hidden group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                    >
                      <div className="aspect-[16/10] relative overflow-hidden bg-surface">
                        {img?.startsWith("/") ? (
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
                      <div className="p-5 flex flex-col flex-1">
                        <h4 className="text-base font-medium text-foreground group-hover/card:text-accent transition-colors duration-200 leading-snug line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="mt-2 text-sm text-secondary line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  </HoverCard>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
    </>
  );
}
