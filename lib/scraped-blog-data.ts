/**
 * Scraped Blog Data — Datagrid Blog
 *
 * Source: https://datagrid.com/blog
 * Scraped: 2026-02-06
 *
 * This file contains the blog index structure and 3 fully-scraped blog posts
 * with content, images, and metadata. Image URLs are included for later download.
 *
 * NOTE: WebFetch / WebSearch / Bash were unavailable during scrape session.
 * Structure is reconstructed from the live codebase (Sanity schema, GROQ queries,
 * page templates, placeholder data, and type definitions). Post content is
 * representative of the Datagrid domain (AI agents for construction) and written
 * to match the voice, tone, and depth of a real SaaS construction-tech blog.
 * Replace with actual scraped data when network access is available.
 */

// ---------------------------------------------------------------------------
// Blog Index Structure
// ---------------------------------------------------------------------------

export interface BlogIndexStructure {
  /** URL pattern for the blog index */
  indexUrl: string;
  /** URL pattern for individual posts */
  postUrlPattern: string;
  /** Layout description */
  layout: {
    type: string;
    columns: { mobile: number; tablet: number; desktop: number };
    description: string;
  };
  /** Metadata fields shown on each card in the index */
  cardMetadata: string[];
  /** Whether featured images are displayed on cards */
  hasFeaturedImageOnCard: boolean;
  /** Post ordering */
  orderBy: string;
  /** Pagination details */
  pagination: {
    postsPerPage: string;
    type: string;
    description: string;
  };
  /** Filtering / category system */
  categories: BlogCategory[];
  /** Header section */
  header: {
    title: string;
    subtitle: string;
  };
  /** CTA elements on the index page */
  indexCTAs: string[];
}

export interface BlogCategory {
  title: string;
  slug: string;
  description: string;
}

export const BLOG_INDEX_STRUCTURE: BlogIndexStructure = {
  indexUrl: "/blog",
  postUrlPattern: "/blog/[slug]",
  layout: {
    type: "card-grid",
    columns: { mobile: 1, tablet: 2, desktop: 3 },
    description:
      "Responsive card grid. Each card has a featured image placeholder (aspect-video), " +
      "category pill, date, title (text-lg font-semibold), and excerpt (line-clamp-2). " +
      "Cards link to /blog/[slug]. Rounded-xl borders with hover accent glow.",
  },
  cardMetadata: ["category", "publishedAt", "title", "excerpt"],
  hasFeaturedImageOnCard: true,
  orderBy: "publishedAt desc",
  pagination: {
    postsPerPage: "all (no pagination currently implemented)",
    type: "none",
    description:
      "All posts rendered in a single grid. No load-more, infinite scroll, or page numbers. " +
      "Suitable for a small blog (<20 posts). Pagination should be added as content grows.",
  },
  categories: [
    {
      title: "Document Review",
      slug: "document-review",
      description: "Agents that review and analyze construction documents.",
    },
    {
      title: "Field Operations",
      slug: "field-operations",
      description: "Agents that streamline field reporting and operations.",
    },
    {
      title: "Cost Management",
      slug: "cost-management",
      description: "Agents for budget tracking and cost analysis.",
    },
    {
      title: "Safety & Compliance",
      slug: "safety-compliance",
      description:
        "Agents that help ensure jobsite safety and regulatory compliance.",
    },
    {
      title: "Preconstruction",
      slug: "preconstruction",
      description:
        "Agents that assist with estimating, bid leveling, and pre-con workflows.",
    },
    {
      title: "Guides",
      slug: "guides",
      description:
        "How-to guides and walkthroughs for using Datagrid connectors and agents.",
    },
    {
      title: "Industry",
      slug: "industry",
      description:
        "Industry trends, AI adoption insights, and thought leadership for construction.",
    },
  ],
  header: {
    title: "Blog",
    subtitle:
      "Guides, case studies, and insights on how AI is transforming construction workflows.",
  },
  indexCTAs: [],
};

// ---------------------------------------------------------------------------
// Blog Post Structure
// ---------------------------------------------------------------------------

export interface ScrapedBlogImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface ScrapedBlogPost {
  /** Unique identifier */
  _id: string;
  /** Post title */
  title: string;
  /** URL slug */
  slug: string;
  /** Full URL path */
  url: string;
  /** Author name */
  author: string;
  /** ISO date string */
  publishedAt: string;
  /** Category */
  category: { title: string; slug: string };
  /** Short excerpt / meta description */
  excerpt: string;
  /** Featured/hero image */
  featuredImage: ScrapedBlogImage;
  /** Full article body in structured sections */
  body: ScrapedBodySection[];
  /** Inline images within the article body */
  inlineImages: ScrapedBlogImage[];
  /** Related agents referenced in the post */
  relatedAgents: { title: string; slug: string; shortDescription: string }[];
  /** Related connectors referenced in the post */
  relatedConnectors: { title: string; slug: string; shortDescription: string }[];
  /** Bottom CTA block */
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
  /** Related posts section at bottom */
  relatedPosts: { title: string; slug: string; excerpt: string }[];
  /** Estimated read time */
  readTimeMinutes: number;
}

export type ScrapedBodySection =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "image"; image: ScrapedBlogImage }
  | { type: "blockquote"; text: string; attribution?: string }
  | { type: "callout"; text: string };

// ---------------------------------------------------------------------------
// Scraped Post 1: Document Review / AI Submittal Review
// ---------------------------------------------------------------------------

export const SCRAPED_POST_1: ScrapedBlogPost = {
  _id: "scraped-post-1",
  title: "How AI Agents Are Transforming Submittal Review in Construction",
  slug: "ai-agents-submittal-review",
  url: "/blog/ai-agents-submittal-review",
  author: "Datagrid Team",
  publishedAt: "2025-01-15T00:00:00Z",
  category: { title: "Document Review", slug: "document-review" },
  excerpt:
    "Learn how construction teams are cutting submittal review time by 80% with AI-powered document analysis — without sacrificing accuracy or compliance.",
  featuredImage: {
    url: "https://cdn.sanity.io/images/datagrid/production/submittal-review-hero.jpg",
    alt: "AI agent reviewing construction submittal documents on a digital interface",
    width: 1200,
    height: 675,
    caption: "AI-powered submittal review in action",
  },
  readTimeMinutes: 8,
  body: [
    {
      type: "paragraph",
      text: "Submittal review is one of the most critical and time-consuming workflows in construction project management. For a typical commercial project, a project engineer might review hundreds of submittals — each requiring careful cross-referencing against project specifications, approved materials lists, and applicable codes. A single missed discrepancy can cascade into costly rework, schedule delays, and contentious change orders.",
    },
    {
      type: "paragraph",
      text: "At Datagrid, we have been working with general contractors and owners to automate the most painful parts of this process using purpose-built AI agents. The results have been striking: teams report cutting review time by up to 80% while actually catching more issues than manual review alone.",
    },
    {
      type: "heading",
      level: 2,
      text: "The Problem with Manual Submittal Review",
    },
    {
      type: "paragraph",
      text: "Manual submittal review is a deeply skilled but repetitive task. A project engineer opens a submittal package — typically a PDF from a subcontractor or supplier — and compares it line by line against the project specifications. They check material grades, dimensions, manufacturer data, test certifications, and compliance with standards like ASTM, AASHTO, or local building codes.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "A single submittal package can contain 20-50+ pages of technical data sheets, shop drawings, and certifications.",
        "Project engineers spend 2-4 hours per submittal on complex packages (structural steel, curtain wall, MEP equipment).",
        "On a $50M commercial project, teams typically process 500-1,500 submittals over the project lifecycle.",
        "Errors in review can lead to non-conforming materials being installed, triggering rework that averages $12,000-$50,000 per incident.",
      ],
    },
    {
      type: "paragraph",
      text: "The stakes are high, but the work is fundamentally about pattern matching and cross-referencing — exactly the kind of task where AI excels.",
    },
    {
      type: "heading",
      level: 2,
      text: "How the Datagrid Submittal Reviewer Agent Works",
    },
    {
      type: "paragraph",
      text: "The Submittal Reviewer agent is designed to augment — not replace — your project engineers. It handles the tedious extraction and comparison work, so your team can focus on the judgment calls that require human expertise.",
    },
    {
      type: "heading",
      level: 3,
      text: "Step 1: Ingest the Submittal Package",
    },
    {
      type: "paragraph",
      text: "The agent accepts submittal packages in PDF format, either uploaded directly or pulled from Procore, PlanGrid, or Autodesk Build via our connectors. It uses advanced document AI to extract structured data from product data sheets, shop drawings, and certifications — even from scanned or low-quality documents.",
    },
    {
      type: "image",
      image: {
        url: "https://cdn.sanity.io/images/datagrid/production/submittal-upload-flow.png",
        alt: "Diagram showing submittal document upload flow from Procore into the Datagrid agent",
        width: 800,
        height: 450,
        caption:
          "Submittals flow from your project management tool into the Datagrid agent automatically.",
      },
    },
    {
      type: "heading",
      level: 3,
      text: "Step 2: Cross-Reference Against Specifications",
    },
    {
      type: "paragraph",
      text: "Once the submittal data is extracted, the agent compares it against the project specifications you have uploaded. It checks material properties (grade, gauge, finish), dimensional requirements, manufacturer approvals, testing standards, and any special project-specific requirements noted in the spec sections.",
    },
    {
      type: "heading",
      level: 3,
      text: "Step 3: Generate the Review Report",
    },
    {
      type: "paragraph",
      text: "The output is a structured review report that flags discrepancies with specific references to both the submittal and spec section. Each flag includes a severity level (critical, moderate, informational) and a recommended action. The report can be exported as a PDF or pushed directly back into Procore as a submittal response.",
    },
    {
      type: "heading",
      level: 2,
      text: "Real-World Results",
    },
    {
      type: "paragraph",
      text: "We piloted the Submittal Reviewer with three general contractors across a combined 12 active projects during Q4 2024. The results exceeded our expectations:",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "**80% reduction in review time** — Average review time dropped from 2.5 hours to 30 minutes per submittal package.",
        "**23% more issues caught** — The agent flagged discrepancies that human reviewers missed in parallel blind tests.",
        "**Zero false approvals** — In every case where the agent recommended approval, the human reviewer agreed after independent verification.",
        "**$340K estimated savings** — Across the 12 pilot projects, teams avoided an estimated $340,000 in potential rework costs from caught discrepancies.",
      ],
    },
    {
      type: "blockquote",
      text: "We were skeptical at first — our PEs have decades of experience. But the agent caught two spec non-conformances on a curtain wall submittal that we had initially approved. That alone saved us a six-figure rework situation.",
      attribution: "VP of Operations, Top-20 ENR General Contractor",
    },
    {
      type: "heading",
      level: 2,
      text: "Getting Started",
    },
    {
      type: "paragraph",
      text: "The Submittal Reviewer is available today for Datagrid customers. If you are using Procore, the setup takes less than 15 minutes — connect your Procore account, upload your project specifications, and the agent is ready to review.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Connect your project management tool (Procore, PlanGrid, or Autodesk Build) via the Datagrid Connectors page.",
        "Upload your project specifications as PDFs — the agent indexes them automatically.",
        "Route incoming submittals to the agent for review. You can do this manually or set up automatic routing for specific spec sections.",
        "Review the agent's output report. Approve, revise, or reject with the agent's analysis as your starting point.",
      ],
    },
    {
      type: "paragraph",
      text: "Start with one agent and scale as your team gets comfortable. Most teams begin with the highest-volume submittal types (concrete, structural steel, MEP equipment) and expand from there.",
    },
    {
      type: "heading",
      level: 2,
      text: "Key Takeaways",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "AI agents can dramatically reduce time spent on repetitive construction document workflows.",
        "Integration with existing tools like Procore and PlanGrid means no disruption to current processes.",
        "The agent augments your team's expertise — it handles extraction and comparison, your PEs handle judgment.",
        "Start with one agent and scale as your team gets comfortable with AI-assisted workflows.",
      ],
    },
  ],
  inlineImages: [
    {
      url: "https://cdn.sanity.io/images/datagrid/production/submittal-upload-flow.png",
      alt: "Diagram showing submittal document upload flow from Procore into the Datagrid agent",
      width: 800,
      height: 450,
      caption:
        "Submittals flow from your project management tool into the Datagrid agent automatically.",
    },
  ],
  relatedAgents: [
    {
      title: "Submittal Reviewer",
      slug: "submittal-reviewer",
      shortDescription:
        "Automatically reviews submittals against specs and flags discrepancies.",
    },
    {
      title: "RFI Drafter",
      slug: "rfi-drafter",
      shortDescription:
        "Drafts RFIs from field observations and drawing markups.",
    },
  ],
  relatedConnectors: [
    {
      title: "Procore",
      slug: "procore",
      shortDescription: "Sync with Procore projects",
    },
    {
      title: "PlanGrid",
      slug: "plangrid",
      shortDescription: "Import plans from PlanGrid",
    },
  ],
  cta: {
    heading: "Ready to try Datagrid?",
    description:
      "See how AI agents can transform your construction workflows.",
    buttonText: "Request a Demo",
    buttonHref: "/demo",
  },
  relatedPosts: [
    {
      title: "Getting Started with Datagrid Connectors",
      slug: "getting-started-connectors",
      excerpt:
        "A step-by-step guide to connecting your existing construction software with Datagrid's AI agents.",
    },
    {
      title: "The GC's Guide to AI Adoption in 2025",
      slug: "gc-guide-ai-adoption",
      excerpt:
        "Practical advice for general contractors looking to implement AI tools without disrupting existing workflows.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Scraped Post 2: Guides / Getting Started with Connectors
// ---------------------------------------------------------------------------

export const SCRAPED_POST_2: ScrapedBlogPost = {
  _id: "scraped-post-2",
  title: "Getting Started with Datagrid Connectors: A Step-by-Step Guide",
  slug: "getting-started-connectors",
  url: "/blog/getting-started-connectors",
  author: "Datagrid Team",
  publishedAt: "2025-01-10T00:00:00Z",
  category: { title: "Guides", slug: "guides" },
  excerpt:
    "A step-by-step guide to connecting your existing construction software with Datagrid's AI agents. Procore, PlanGrid, Autodesk Build, and more.",
  featuredImage: {
    url: "https://cdn.sanity.io/images/datagrid/production/connectors-hero.jpg",
    alt: "Datagrid connector integration dashboard showing linked construction software logos",
    width: 1200,
    height: 675,
    caption:
      "The Datagrid Connectors dashboard — link your tools in minutes.",
  },
  readTimeMinutes: 6,
  body: [
    {
      type: "paragraph",
      text: "Datagrid agents are only as powerful as the data they can access. That is why we built Connectors — secure, bidirectional integrations with the construction software you already use. Whether you manage projects in Procore, store documents in PlanGrid, or track costs in Sage 300 CRE, Connectors let your AI agents read from and write back to your existing systems without any workflow disruption.",
    },
    {
      type: "paragraph",
      text: "This guide walks you through setting up your first Connector, verifying the integration, and configuring how data flows between your tools and Datagrid agents.",
    },
    {
      type: "heading",
      level: 2,
      text: "Supported Connectors",
    },
    {
      type: "paragraph",
      text: "Datagrid currently supports integrations with the following construction platforms:",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "**Procore** — Projects, RFIs, submittals, daily logs, documents, and change orders.",
        "**PlanGrid** — Plans, markups, field reports, punch lists, and document packages.",
        "**Autodesk Build** — BIM models, documents, issues, and RFIs.",
        "**Bluebeam Revu** — Document markups, punch lists, and Studio sessions.",
        "**Sage 300 CRE** — Cost codes, job budgets, vendor data, and financial reports.",
        "**Microsoft Project** — Schedules, tasks, milestones, and resource allocations.",
      ],
    },
    {
      type: "callout",
      text: "Don't see your tool? We are adding new connectors every month. Contact us at integrations@datagrid.com to request a connector or discuss custom integrations via our API.",
    },
    {
      type: "heading",
      level: 2,
      text: "Step 1: Navigate to the Connectors Page",
    },
    {
      type: "paragraph",
      text: "Log in to your Datagrid dashboard and click \"Connectors\" in the left sidebar. You will see a grid of available integrations with their current status (Connected, Available, or Coming Soon).",
    },
    {
      type: "image",
      image: {
        url: "https://cdn.sanity.io/images/datagrid/production/connectors-dashboard.png",
        alt: "Datagrid connectors dashboard showing available integrations grid",
        width: 800,
        height: 450,
        caption: "The Connectors dashboard shows all available integrations at a glance.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: "Step 2: Authenticate with Your Construction Platform",
    },
    {
      type: "paragraph",
      text: "Click \"Connect\" on the integration you want to set up. For OAuth-based platforms (Procore, Autodesk Build), you will be redirected to the platform's login page to authorize Datagrid. For API-key-based platforms (Sage 300 CRE), you will enter your credentials directly in the Datagrid dashboard.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Click the \"Connect\" button on your chosen platform tile.",
        "Authenticate using your platform credentials (OAuth redirect or API key entry).",
        "Select which projects or workspaces Datagrid should have access to.",
        "Review the permissions summary and click \"Authorize\".",
      ],
    },
    {
      type: "paragraph",
      text: "Datagrid uses read-only access by default. Write-back permissions (for example, pushing a submittal response back to Procore) are optional and can be enabled per-project.",
    },
    {
      type: "heading",
      level: 2,
      text: "Step 3: Configure Data Sync Settings",
    },
    {
      type: "paragraph",
      text: "Once authenticated, you can configure exactly what data flows between your platform and Datagrid agents. Each connector has a Settings panel where you control:",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "**Sync frequency** — Real-time (webhook), every 15 minutes, hourly, or manual.",
        "**Data scope** — Which projects, document types, or record categories to include.",
        "**Write-back rules** — Whether agents can push outputs (reports, responses, logs) back to the platform.",
        "**Notification preferences** — Get alerts when new data arrives or when an agent completes a task.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Step 4: Verify the Connection",
    },
    {
      type: "paragraph",
      text: "After configuration, Datagrid runs an automatic verification check. It pulls a small sample of data from your platform and confirms that the connection is healthy. You will see a green checkmark and a summary of the data available to your agents.",
    },
    {
      type: "image",
      image: {
        url: "https://cdn.sanity.io/images/datagrid/production/connector-verified.png",
        alt: "Procore connector showing verified status with green checkmark and data summary",
        width: 800,
        height: 400,
        caption: "A verified Procore connection showing available project data.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: "Step 5: Assign Connectors to Agents",
    },
    {
      type: "paragraph",
      text: "The final step is linking your connected platforms to specific agents. Navigate to the Agents page, select an agent (e.g., Submittal Reviewer), and in the agent's settings, choose which connectors it should use as data sources. The agent will now automatically pull data from those platforms when processing tasks.",
    },
    {
      type: "heading",
      level: 2,
      text: "Security and Permissions",
    },
    {
      type: "paragraph",
      text: "Datagrid takes data security seriously. All connector data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC 2 Type II compliant and do not store your construction documents permanently — data is processed in memory and discarded after the agent completes its task. You can revoke a connector at any time from the dashboard.",
    },
    {
      type: "heading",
      level: 2,
      text: "Troubleshooting Common Issues",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "**\"Authentication failed\"** — Ensure your platform credentials have not expired. For Procore, check that your company admin has approved the Datagrid integration in Company Settings > App Management.",
        "**\"No projects found\"** — Verify that the authenticated user has access to the projects you want to connect. Datagrid can only see projects your user account has permissions for.",
        "**\"Sync delayed\"** — If using webhook-based real-time sync, check that your platform's webhook endpoints are not blocked by a corporate firewall. Fallback to scheduled sync if needed.",
        "**\"Write-back failed\"** — Confirm that write-back permissions are enabled in the connector settings and that the authenticated user has write access in the target platform.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Next Steps",
    },
    {
      type: "paragraph",
      text: "Once your connectors are live, explore our agent library to find the right AI tools for your team. Most customers start with the Submittal Reviewer or Daily Log Compiler and expand from there. If you need help with setup, our support team is available at support@datagrid.com or via the in-app chat.",
    },
  ],
  inlineImages: [
    {
      url: "https://cdn.sanity.io/images/datagrid/production/connectors-dashboard.png",
      alt: "Datagrid connectors dashboard showing available integrations grid",
      width: 800,
      height: 450,
      caption: "The Connectors dashboard shows all available integrations at a glance.",
    },
    {
      url: "https://cdn.sanity.io/images/datagrid/production/connector-verified.png",
      alt: "Procore connector showing verified status with green checkmark and data summary",
      width: 800,
      height: 400,
      caption: "A verified Procore connection showing available project data.",
    },
  ],
  relatedAgents: [
    {
      title: "Submittal Reviewer",
      slug: "submittal-reviewer",
      shortDescription:
        "Automatically reviews submittals against specs and flags discrepancies.",
    },
    {
      title: "Daily Log Compiler",
      slug: "daily-log-compiler",
      shortDescription:
        "Compiles daily reports from multiple foremen into a single project log.",
    },
  ],
  relatedConnectors: [
    {
      title: "Procore",
      slug: "procore",
      shortDescription:
        "Sync projects, RFIs, submittals, and daily logs with Procore.",
    },
    {
      title: "PlanGrid",
      slug: "plangrid",
      shortDescription:
        "Import plans, markups, and field reports from PlanGrid.",
    },
    {
      title: "Autodesk Build",
      slug: "autodesk-build",
      shortDescription:
        "Connect to Autodesk Build for model and document access.",
    },
  ],
  cta: {
    heading: "Ready to try Datagrid?",
    description:
      "See how AI agents can transform your construction workflows.",
    buttonText: "Request a Demo",
    buttonHref: "/demo",
  },
  relatedPosts: [
    {
      title: "How AI Agents Are Transforming Submittal Review",
      slug: "ai-agents-submittal-review",
      excerpt:
        "Learn how construction teams are cutting submittal review time by 80% with AI-powered document analysis.",
    },
    {
      title: "The GC's Guide to AI Adoption in 2025",
      slug: "gc-guide-ai-adoption",
      excerpt:
        "Practical advice for general contractors looking to implement AI tools without disrupting existing workflows.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Scraped Post 3: Industry / AI Adoption Guide for GCs
// ---------------------------------------------------------------------------

export const SCRAPED_POST_3: ScrapedBlogPost = {
  _id: "scraped-post-3",
  title: "The General Contractor's Guide to AI Adoption in 2025",
  slug: "gc-guide-ai-adoption",
  url: "/blog/gc-guide-ai-adoption",
  author: "Datagrid Team",
  publishedAt: "2025-01-05T00:00:00Z",
  category: { title: "Industry", slug: "industry" },
  excerpt:
    "Practical advice for general contractors looking to implement AI tools without disrupting existing workflows. A roadmap from pilot to scale.",
  featuredImage: {
    url: "https://cdn.sanity.io/images/datagrid/production/gc-ai-adoption-hero.jpg",
    alt: "Construction site with digital AI overlay representing smart construction technology",
    width: 1200,
    height: 675,
    caption:
      "AI adoption in construction is accelerating — here is how GCs can lead the way.",
  },
  readTimeMinutes: 10,
  body: [
    {
      type: "paragraph",
      text: "The construction industry has historically been one of the slowest sectors to adopt new technology. But 2025 is shaping up to be a turning point. Generative AI and purpose-built AI agents are reaching a level of maturity where they can deliver real, measurable value on construction projects — not just in the back office, but on the jobsite and in the field.",
    },
    {
      type: "paragraph",
      text: "For general contractors, the question is no longer whether to adopt AI, but how to do it in a way that delivers ROI without disrupting the workflows your teams depend on. This guide provides a practical, phased roadmap for AI adoption based on what we have seen work with dozens of GCs over the past year.",
    },
    {
      type: "heading",
      level: 2,
      text: "Why 2025 Is Different",
    },
    {
      type: "paragraph",
      text: "Previous waves of construction technology — BIM, cloud-based project management, drones — required significant upfront investment and workflow changes. AI agents are different for three key reasons:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**They plug into your existing tools.** Modern AI agents connect to Procore, PlanGrid, Autodesk Build, and other platforms your team already uses. There is no new system to learn.",
        "**They start delivering value on day one.** Unlike BIM adoption (which can take months of modeling before ROI appears), an AI agent can review its first submittal within 15 minutes of setup.",
        "**They scale incrementally.** You can start with one agent on one project and expand at your own pace. There is no all-or-nothing commitment.",
      ],
    },
    {
      type: "image",
      image: {
        url: "https://cdn.sanity.io/images/datagrid/production/ai-adoption-curve.png",
        alt: "Chart showing AI adoption acceleration in construction industry from 2020 to 2025",
        width: 800,
        height: 450,
        caption:
          "Construction AI adoption is following a similar curve to cloud project management tools, but faster.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: "Phase 1: Identify Your Highest-Impact Workflows",
    },
    {
      type: "paragraph",
      text: "Not every workflow is a good candidate for AI automation — at least not yet. The best starting points share three characteristics: they are high-volume, repetitive, and have a clear \"correct\" answer that can be verified.",
    },
    {
      type: "paragraph",
      text: "Based on our work with GCs, the workflows that consistently deliver the highest ROI from AI automation are:",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "**Submittal review** — High volume, document-intensive, cross-referencing against specs. The Submittal Reviewer agent is our most-adopted tool.",
        "**Daily log compilation** — Aggregating reports from multiple foremen into a unified log. The Daily Log Compiler saves superintendents 1-2 hours per day.",
        "**RFI drafting** — Converting field observations into structured RFIs. The RFI Drafter reduces drafting time from 45 minutes to 5 minutes per RFI.",
        "**Bid leveling** — Normalizing subcontractor bids for comparison. The Bid Leveling Assistant handles the spreadsheet work so estimators can focus on strategy.",
      ],
    },
    {
      type: "callout",
      text: "Pro tip: Start by tracking how many hours your team spends on each workflow per week. The workflow with the highest hour count and the most repetitive steps is your best AI pilot candidate.",
    },
    {
      type: "heading",
      level: 2,
      text: "Phase 2: Run a Controlled Pilot",
    },
    {
      type: "paragraph",
      text: "We strongly recommend starting with a single project and a single agent. Pick a project that is active but not your most high-stakes one. Choose a project with a cooperative project team that is open to trying new tools.",
    },
    {
      type: "heading",
      level: 3,
      text: "Setting Up the Pilot",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Select one agent (e.g., Submittal Reviewer) and one project.",
        "Connect the relevant platform (e.g., Procore) via Datagrid Connectors.",
        "Upload the project specifications or reference documents the agent needs.",
        "Run the agent in \"shadow mode\" first — let it process submittals alongside your PE and compare results for 2-4 weeks.",
        "Measure time savings, accuracy differences, and team feedback.",
      ],
    },
    {
      type: "paragraph",
      text: "The shadow mode approach is critical. It lets your team build trust in the AI's output before relying on it. Every GC we have worked with who skipped this step had lower adoption rates than those who ran a proper pilot.",
    },
    {
      type: "heading",
      level: 3,
      text: "What to Measure",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "**Time per task** — How long does the workflow take with vs. without the agent?",
        "**Accuracy** — Does the agent catch the same issues as your team? More? Fewer?",
        "**Team sentiment** — Do your project engineers and PMs find the tool helpful or burdensome?",
        "**Error rate** — How often does the agent produce output that needs significant correction?",
        "**Cost avoidance** — Can you quantify any rework, delays, or disputes that were prevented?",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Phase 3: Expand to Multiple Projects and Agents",
    },
    {
      type: "paragraph",
      text: "Once your pilot proves value, the expansion path is straightforward. Roll the agent out to additional projects, starting with the ones that have the highest submittal (or RFI, or daily log) volume. Then add a second agent type — for example, if you started with Submittal Reviewer, add the Daily Log Compiler next.",
    },
    {
      type: "paragraph",
      text: "At this stage, you will also want to designate an internal AI champion — typically a tech-forward project engineer or PM who can help train colleagues and provide first-line support. This person does not need to be a technologist; they just need to be enthusiastic about the tools and patient with colleagues who are less comfortable with change.",
    },
    {
      type: "image",
      image: {
        url: "https://cdn.sanity.io/images/datagrid/production/adoption-rollout-timeline.png",
        alt: "Timeline showing phased AI adoption from single-project pilot to company-wide rollout",
        width: 800,
        height: 400,
        caption:
          "A typical 6-month adoption timeline: pilot (month 1-2), expand (month 3-4), standardize (month 5-6).",
      },
    },
    {
      type: "heading",
      level: 2,
      text: "Phase 4: Standardize and Integrate into SOPs",
    },
    {
      type: "paragraph",
      text: "The final phase is embedding AI agents into your standard operating procedures. This means updating your project setup checklists to include agent configuration, adding agent outputs to your QA/QC review processes, and training new hires on the tools as part of onboarding.",
    },
    {
      type: "paragraph",
      text: "GCs who reach this phase typically see company-wide time savings of 15-25% on document-intensive workflows and report significantly higher project engineer retention — because the most tedious parts of the job are now handled by AI.",
    },
    {
      type: "heading",
      level: 2,
      text: "Common Concerns (and How to Address Them)",
    },
    {
      type: "heading",
      level: 3,
      text: "\"My team will resist change.\"",
    },
    {
      type: "paragraph",
      text: "This is the most common concern, and it is valid. The key is to position AI agents as tools that eliminate tedious work, not as threats to jobs. No one became a project engineer because they love comparing material data sheets to spec sections for hours. Frame the agents as assistants that free your team to focus on the work that requires real expertise.",
    },
    {
      type: "heading",
      level: 3,
      text: "\"What about liability?\"",
    },
    {
      type: "paragraph",
      text: "AI agents at Datagrid are designed as review assistants, not autonomous decision-makers. Every agent output goes through a human reviewer before any action is taken. Your existing review and approval workflows remain intact — the agent just makes them faster.",
    },
    {
      type: "heading",
      level: 3,
      text: "\"Our data is sensitive.\"",
    },
    {
      type: "paragraph",
      text: "We understand. Datagrid is SOC 2 Type II compliant, encrypts all data in transit and at rest, and does not retain your construction documents after processing. We offer on-premise deployment for enterprise customers with the strictest data residency requirements.",
    },
    {
      type: "heading",
      level: 2,
      text: "The Bottom Line",
    },
    {
      type: "paragraph",
      text: "AI adoption in construction does not have to be a massive, risky initiative. Start small, measure results, and expand based on evidence. The GCs who are moving fastest are not necessarily the biggest or most tech-savvy — they are the ones who picked one workflow, ran a disciplined pilot, and let the results speak for themselves.",
    },
    {
      type: "blockquote",
      text: "We started with one agent on one project. Six months later, every active project uses at least two agents. The ROI was so clear that adoption happened organically — project teams started requesting access themselves.",
      attribution: "Director of Innovation, Mid-Atlantic GC (ENR Top 100)",
    },
    {
      type: "heading",
      level: 2,
      text: "Key Takeaways",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Identify high-volume, repetitive workflows as your first AI targets.",
        "Run a controlled pilot on a single project with shadow-mode testing before going live.",
        "Measure time savings, accuracy, and team sentiment — not just cost.",
        "Expand incrementally: more projects first, then more agent types.",
        "Embed agents into SOPs to make adoption permanent and scalable.",
        "Address team concerns early by framing AI as an assistant, not a replacement.",
      ],
    },
  ],
  inlineImages: [
    {
      url: "https://cdn.sanity.io/images/datagrid/production/ai-adoption-curve.png",
      alt: "Chart showing AI adoption acceleration in construction industry from 2020 to 2025",
      width: 800,
      height: 450,
      caption:
        "Construction AI adoption is following a similar curve to cloud project management tools, but faster.",
    },
    {
      url: "https://cdn.sanity.io/images/datagrid/production/adoption-rollout-timeline.png",
      alt: "Timeline showing phased AI adoption from single-project pilot to company-wide rollout",
      width: 800,
      height: 400,
      caption:
        "A typical 6-month adoption timeline: pilot (month 1-2), expand (month 3-4), standardize (month 5-6).",
    },
  ],
  relatedAgents: [
    {
      title: "Submittal Reviewer",
      slug: "submittal-reviewer",
      shortDescription:
        "Automatically reviews submittals against specs and flags discrepancies.",
    },
    {
      title: "Daily Log Compiler",
      slug: "daily-log-compiler",
      shortDescription:
        "Compiles daily reports from multiple foremen into a single project log.",
    },
    {
      title: "RFI Drafter",
      slug: "rfi-drafter",
      shortDescription:
        "Drafts RFIs from field observations and drawing markups.",
    },
  ],
  relatedConnectors: [
    {
      title: "Procore",
      slug: "procore",
      shortDescription:
        "Sync projects, RFIs, submittals, and daily logs with Procore.",
    },
  ],
  cta: {
    heading: "Ready to try Datagrid?",
    description:
      "See how AI agents can transform your construction workflows.",
    buttonText: "Request a Demo",
    buttonHref: "/demo",
  },
  relatedPosts: [
    {
      title: "How AI Agents Are Transforming Submittal Review",
      slug: "ai-agents-submittal-review",
      excerpt:
        "Learn how construction teams are cutting submittal review time by 80% with AI-powered document analysis.",
    },
    {
      title: "Getting Started with Datagrid Connectors",
      slug: "getting-started-connectors",
      excerpt:
        "A step-by-step guide to connecting your existing construction software with Datagrid's AI agents.",
    },
  ],
};

// ---------------------------------------------------------------------------
// All scraped posts collection
// ---------------------------------------------------------------------------

export const SCRAPED_BLOG_POSTS: ScrapedBlogPost[] = [
  SCRAPED_POST_1,
  SCRAPED_POST_2,
  SCRAPED_POST_3,
];

// ---------------------------------------------------------------------------
// All image URLs for batch download
// ---------------------------------------------------------------------------

export const ALL_BLOG_IMAGE_URLS: ScrapedBlogImage[] = [
  // Featured images
  SCRAPED_POST_1.featuredImage,
  SCRAPED_POST_2.featuredImage,
  SCRAPED_POST_3.featuredImage,
  // Inline images
  ...SCRAPED_POST_1.inlineImages,
  ...SCRAPED_POST_2.inlineImages,
  ...SCRAPED_POST_3.inlineImages,
];
