import { PLACEHOLDER_AGENTS, PLACEHOLDER_CONNECTORS, PLACEHOLDER_GUIDES } from "./placeholder-data";
import { SCRAPED_BLOG_POSTS } from "./scraped-blog-data";

// ---------------------------------------------------------------------------
// Use Case Data
// ---------------------------------------------------------------------------

export interface UseCaseEntry {
  title: string;
  description: string;
  agentSlugs: string[];
  connectorSlugs: string[];
  guideSlugs: string[];
  workflows: { step: string; detail: string }[];
}

export const USE_CASE_DATA: Record<string, UseCaseEntry> = {
  "submittal-review": {
    title: "Submittal Review",
    description:
      "Automate the review of construction submittals against project specs — catch discrepancies faster and reduce review time by up to 80%.",
    agentSlugs: ["submittal-reviewer"],
    connectorSlugs: ["procore", "plangrid", "autodesk-build"],
    guideSlugs: ["ai-agents-submittal-review", "getting-started-connectors"],
    workflows: [
      { step: "Ingest submittal package", detail: "Upload or pull submittals from Procore, PlanGrid, or Autodesk Build." },
      { step: "Extract structured data", detail: "AI parses product data sheets, shop drawings, and certifications." },
      { step: "Cross-reference against specs", detail: "Compare material properties, dimensions, and standards to project specifications." },
      { step: "Generate review report", detail: "Produce a flagged report with severity ratings and recommended actions." },
      { step: "Route for approval", detail: "Push the review back into your project management tool for final sign-off." },
    ],
  },
  "rfi-management": {
    title: "RFI Management",
    description:
      "Turn field observations and drawing markups into well-structured RFIs in minutes, not hours.",
    agentSlugs: ["rfi-drafter"],
    connectorSlugs: ["procore", "bluebeam"],
    guideSlugs: ["gc-guide-ai-adoption"],
    workflows: [
      { step: "Capture field observations", detail: "Collect notes, photos, and markup references from the jobsite." },
      { step: "Identify scope and trade", detail: "AI determines the relevant spec section, trade, and drawing references." },
      { step: "Draft the RFI", detail: "Generate a structured RFI with question, context, and referenced drawings." },
      { step: "Review and submit", detail: "Project engineer reviews the draft and submits to the design team via Procore." },
    ],
  },
  "daily-reporting": {
    title: "Daily Reporting",
    description:
      "Aggregate field reports from multiple foremen into a single, comprehensive daily project log — automatically.",
    agentSlugs: ["daily-log-compiler"],
    connectorSlugs: ["autodesk-build", "procore"],
    guideSlugs: ["getting-started-connectors"],
    workflows: [
      { step: "Collect foreman reports", detail: "Pull daily reports from field teams including labor, weather, and equipment." },
      { step: "Normalize and merge", detail: "AI reconciles overlapping data and standardizes formatting across reports." },
      { step: "Flag variances", detail: "Highlight schedule variances, missing reports, or unusual activity." },
      { step: "Publish daily log", detail: "Generate a unified log and distribute to stakeholders." },
    ],
  },
  "bid-leveling": {
    title: "Bid Leveling",
    description:
      "Normalize and compare subcontractor bids side-by-side to make faster, more confident award decisions.",
    agentSlugs: ["bid-leveling-assistant"],
    connectorSlugs: ["procore", "sage-300-cre"],
    guideSlugs: ["gc-guide-ai-adoption"],
    workflows: [
      { step: "Upload bid packages", detail: "Import subcontractor bids as PDFs or spreadsheets." },
      { step: "Extract line items", detail: "AI parses each bid into standardized line items and scope categories." },
      { step: "Normalize for comparison", detail: "Align scope, exclusions, and alternates across all bidders." },
      { step: "Generate leveling sheet", detail: "Produce a side-by-side comparison with scope gap analysis." },
      { step: "Highlight recommendations", detail: "Flag outliers, missing scope, and value-engineering opportunities." },
    ],
  },
  "safety-compliance": {
    title: "Safety Compliance",
    description:
      "Scan safety plans and jobsite photos to identify OSHA compliance gaps before they become incidents.",
    agentSlugs: ["safety-compliance-checker"],
    connectorSlugs: ["autodesk-build", "procore"],
    guideSlugs: ["gc-guide-ai-adoption"],
    workflows: [
      { step: "Upload safety plans", detail: "Ingest site-specific safety plans and OSHA standards references." },
      { step: "Analyze jobsite photos", detail: "AI scans photos for PPE violations, fall hazards, and housekeeping issues." },
      { step: "Cross-reference standards", detail: "Compare findings against OSHA 1926 and project-specific safety requirements." },
      { step: "Generate compliance report", detail: "Produce a risk-rated report with corrective action recommendations." },
    ],
  },
  "cost-management": {
    title: "Cost Management",
    description:
      "Analyze change orders for cost impact and schedule implications — make informed decisions faster.",
    agentSlugs: ["change-order-analyzer"],
    connectorSlugs: ["sage-300-cre", "procore", "microsoft-project"],
    guideSlugs: ["gc-guide-ai-adoption"],
    workflows: [
      { step: "Receive change order request", detail: "Import the change order from your PM tool or upload directly." },
      { step: "Analyze cost impact", detail: "AI evaluates cost against current budget, contingency, and historical data." },
      { step: "Assess schedule impact", detail: "Cross-reference with the project schedule to identify downstream effects." },
      { step: "Generate recommendation", detail: "Produce an impact report with approve/negotiate/reject recommendation." },
    ],
  },
};

// ---------------------------------------------------------------------------
// Industry Data
// ---------------------------------------------------------------------------

export interface IndustryEntry {
  title: string;
  description: string;
  agentSlugs: string[];
  connectorSlugs: string[];
  guideSlugs: string[];
  useCaseSlugs: string[];
  challenges: { title: string; description: string }[];
}

export const INDUSTRY_DATA: Record<string, IndustryEntry> = {
  "general-contractors": {
    title: "AI Agents for General Contractors",
    description:
      "Purpose-built AI agents that help GCs automate document review, field reporting, bid leveling, and more — without changing how your team works.",
    agentSlugs: ["submittal-reviewer", "rfi-drafter", "daily-log-compiler", "bid-leveling-assistant"],
    connectorSlugs: ["procore", "plangrid", "autodesk-build", "bluebeam"],
    guideSlugs: ["gc-guide-ai-adoption", "ai-agents-submittal-review", "getting-started-connectors"],
    useCaseSlugs: ["submittal-review", "rfi-management", "daily-reporting", "bid-leveling"],
    challenges: [
      { title: "Document overload", description: "GCs process thousands of submittals, RFIs, and change orders per project — each requiring careful review against specs and contracts." },
      { title: "Field-to-office gap", description: "Critical information from the jobsite often gets lost in translation between field teams and project managers." },
      { title: "Tight margins, tight timelines", description: "Every hour spent on manual paperwork is an hour not spent on the work that drives profit and keeps projects on schedule." },
    ],
  },
  "owners-developers": {
    title: "AI Agents for Owners & Developers",
    description:
      "Give your project oversight teams AI-powered tools to review contractor submittals, track compliance, and monitor project health in real time.",
    agentSlugs: ["submittal-reviewer", "change-order-analyzer", "safety-compliance-checker"],
    connectorSlugs: ["procore", "autodesk-build", "sage-300-cre"],
    guideSlugs: ["gc-guide-ai-adoption", "ai-agents-submittal-review"],
    useCaseSlugs: ["submittal-review", "cost-management", "safety-compliance"],
    challenges: [
      { title: "Visibility across projects", description: "Owners manage multiple projects with different GCs and need consistent reporting and quality standards." },
      { title: "Change order disputes", description: "Evaluating change order legitimacy and cost impact requires deep analysis that often delays decisions." },
      { title: "Compliance and risk", description: "Ensuring safety compliance and quality across a portfolio of projects is resource-intensive." },
    ],
  },
  "specialty-contractors": {
    title: "AI Agents for Specialty Contractors",
    description:
      "Streamline submittals, RFIs, and daily reporting so your field teams can focus on execution — not paperwork.",
    agentSlugs: ["submittal-reviewer", "rfi-drafter", "daily-log-compiler"],
    connectorSlugs: ["procore", "plangrid", "bluebeam"],
    guideSlugs: ["getting-started-connectors", "ai-agents-submittal-review"],
    useCaseSlugs: ["submittal-review", "rfi-management", "daily-reporting"],
    challenges: [
      { title: "Submittal turnaround pressure", description: "Subs are responsible for producing submittals quickly and accurately — delays impact the entire project." },
      { title: "RFI volume", description: "Field crews generate dozens of questions per week that need to be formalized and tracked." },
      { title: "Reporting burden", description: "Daily logs and progress reports take foremen away from supervising the work." },
    ],
  },
};

// ---------------------------------------------------------------------------
// Reverse-lookup functions
// ---------------------------------------------------------------------------

/** Get all agents that list a given connector in their connectors array */
export function getAgentsForConnector(connectorSlug: string) {
  return PLACEHOLDER_AGENTS.filter((agent) =>
    agent.connectors?.some((c) => c.slug.current === connectorSlug)
  );
}

/** Get guides (blog posts + placeholder guides) related to a given agent */
export function getGuidesForAgent(agentSlug: string) {
  const fromBlog = SCRAPED_BLOG_POSTS.filter((post) =>
    post.relatedAgents.some((a) => a.slug === agentSlug)
  ).map((post) => ({
    _id: post._id,
    title: post.title,
    slug: { current: post.slug },
    excerpt: post.excerpt,
    author: post.author,
    publishedAt: post.publishedAt,
  }));

  const fromPlaceholder = PLACEHOLDER_GUIDES.filter((g) =>
    "relatedAgentSlugs" in g && Array.isArray(g.relatedAgentSlugs) &&
    g.relatedAgentSlugs.includes(agentSlug)
  );

  // Deduplicate by slug
  const seen = new Set<string>();
  const result: typeof fromBlog = [];
  for (const g of [...fromBlog, ...fromPlaceholder.map((g) => ({ ...g, slug: g.slug }))]) {
    const s = g.slug.current;
    if (!seen.has(s)) {
      seen.add(s);
      result.push(g);
    }
  }
  return result;
}

/** Get guides (blog posts) related to a given connector */
export function getGuidesForConnector(connectorSlug: string) {
  return SCRAPED_BLOG_POSTS.filter((post) =>
    post.relatedConnectors.some((c) => c.slug === connectorSlug)
  ).map((post) => ({
    _id: post._id,
    title: post.title,
    slug: { current: post.slug },
    excerpt: post.excerpt,
    author: post.author,
    publishedAt: post.publishedAt,
  }));
}

/** Get use cases that include a given agent */
export function getUseCasesForAgent(agentSlug: string) {
  return Object.entries(USE_CASE_DATA)
    .filter(([, data]) => data.agentSlugs.includes(agentSlug))
    .map(([slug, data]) => ({ slug, title: data.title }));
}

/** Resolve agent slugs to full agent objects */
export function resolveAgents(slugs: string[]) {
  return slugs
    .map((s) => PLACEHOLDER_AGENTS.find((a) => a.slug.current === s))
    .filter(Boolean) as typeof PLACEHOLDER_AGENTS;
}

/** Resolve connector slugs to full connector objects */
export function resolveConnectors(slugs: string[]) {
  return slugs
    .map((s) => PLACEHOLDER_CONNECTORS.find((c) => c.slug.current === s))
    .filter(Boolean) as typeof PLACEHOLDER_CONNECTORS;
}

/** Resolve guide slugs to guide-like objects (from blog posts or placeholder guides) */
export function resolveGuides(slugs: string[]) {
  return slugs
    .map((s) => {
      const post = SCRAPED_BLOG_POSTS.find((p) => p.slug === s);
      if (post) {
        return {
          _id: post._id,
          title: post.title,
          slug: { current: post.slug },
          excerpt: post.excerpt,
          author: post.author,
          publishedAt: post.publishedAt,
        };
      }
      const guide = PLACEHOLDER_GUIDES.find((g) => g.slug.current === s);
      if (guide) return guide;
      return null;
    })
    .filter(Boolean) as { _id: string; title: string; slug: { current: string }; excerpt?: string }[];
}
