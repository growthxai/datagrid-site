/**
 * Additional Blog & Guide Posts
 *
 * Guide posts (displayed at /blog/[slug] with Guide badge, filtered from /blog index):
 * - GUIDE_POST_RFI (Guide 2)
 * - GUIDE_POST_DOC_SEARCH (Guide 3)
 * - GUIDE_POST_CHANGE_ORDERS (Guide 4)
 * - GUIDE_POST_SAFETY (Guide 5)
 *
 * Blog posts (displayed on /blog index):
 * - BLOG_POST_PRECON
 * - BLOG_POST_DRAWING
 * - BLOG_POST_DAILY
 */

// ---------------------------------------------------------------------------
// Guide 2: AI RFI Management
// ---------------------------------------------------------------------------

export const GUIDE_POST_RFI = {
  _id: "guide-post-rfi",
  title: "5 Ways AI is Transforming RFI Management in Construction",
  slug: "ai-rfi-management",
  url: "/blog/ai-rfi-management",
  author: "Datagrid Team",
  publishedAt: "2024-12-08T00:00:00Z",
  category: { title: "Best Practices", slug: "best-practices" },
  excerpt:
    "RFIs are essential for construction communication, but poor quality RFIs and slow responses create project delays. Here's how AI is helping teams submit better RFIs and resolve questions faster.",
  featuredImage: {
    url: "/blog/rfi-management.jpeg",
    alt: "Architectural blueprints being reviewed for RFI management",
    width: 1200,
    height: 675,
  },
  readTimeMinutes: 6,
  body: [
    {
      type: "paragraph" as const,
      text: "Requests for Information are the nervous system of construction communication. Every time a contractor encounters an ambiguity in the drawings or specs, an RFI gets filed. On large commercial projects, teams can generate hundreds of RFIs, each requiring careful drafting, routing, and response tracking. When the process breaks down, projects stall.",
    },
    {
      type: "paragraph" as const,
      text: "The challenge isn't just volume — it's quality. Poorly written RFIs get bounced back. RFIs that could have been answered from existing project documents waste the design team's time. And slow response cycles create cascading delays that ripple across the schedule.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "The RFI Problem in Numbers",
    },
    {
      type: "paragraph" as const,
      text: "Industry data shows that an average commercial project generates 600-800 RFIs. Each one takes 30-45 minutes to draft properly, and response times average 7-10 business days. Conservative estimates put the cost of RFI management at $3,000-$5,000 per RFI when you account for drafting time, review cycles, and downstream delays.",
    },
    {
      type: "paragraph" as const,
      text: "But the real cost isn't in the RFIs themselves — it's in the ones that shouldn't have been filed in the first place. Studies suggest 30-40% of RFIs could be resolved by searching existing project documents more thoroughly before filing.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Validating RFIs Before Submission",
    },
    {
      type: "paragraph" as const,
      text: "The most impactful improvement in RFI management is catching bad RFIs before they leave your office. AI can analyze a draft RFI against the full project document set to determine whether the answer already exists in the drawings, specs, or previously answered RFIs.",
    },
    {
      type: "paragraph" as const,
      text: "This isn't just keyword matching. AI understands context — it can recognize that a question about fire-rated partition assemblies in corridor C relates to spec section 09 21 16, drawing A-301, and three previously answered RFIs about partition ratings on the same floor.",
    },
    {
      type: "agent-callout" as const,
      icon: "✓",
      agentSlug: "rfi-validator",
      agentTitle: "RFI Validator Agent",
      description:
        "Validate RFIs before submission by identifying trivial requests and flagging cost, schedule, or quality implications.",
      connectors: ["Procore", "Autodesk Build"],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Resolving Questions from Existing Documents",
    },
    {
      type: "paragraph" as const,
      text: "Before an RFI needs to be sent to the design team, there's a good chance the answer already exists somewhere in the project documents. Specifications alone can run 2,000+ pages, and drawing sets on large projects contain hundreds of sheets.",
    },
    {
      type: "paragraph" as const,
      text: "AI search can scan the entire document set in seconds, pulling relevant clauses, detail references, and prior RFI responses that address the question. In many cases, this turns a week-long RFI cycle into a same-day resolution.",
    },
    {
      type: "agent-callout" as const,
      icon: "🔍",
      agentSlug: "rfi-checker",
      agentTitle: "RFI Checker Agent",
      description:
        "Check RFIs against existing project documents to resolve questions internally before sending them to the design team.",
      connectors: ["Procore", "Autodesk Build"],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Improving RFI Quality and Completeness",
    },
    {
      type: "paragraph" as const,
      text: "A well-written RFI includes the right drawing references, spec sections, and context to enable a fast, accurate response. AI can review draft RFIs and flag missing information before submission:",
    },
    {
      type: "list" as const,
      ordered: false,
      items: [
        "Missing or incorrect drawing references",
        "Spec sections that should be cited but aren't",
        "Similar previously answered RFIs that should be referenced",
        "Ambiguous language that could lead to misinterpretation",
        "Cost or schedule implications that should be flagged upfront",
      ],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Tracking Patterns and Reducing Future RFIs",
    },
    {
      type: "paragraph" as const,
      text: "When you can analyze RFI data at scale, patterns emerge. Certain spec sections generate disproportionate questions. Certain trades file more RFIs than others. Certain types of ambiguities recur across projects.",
    },
    {
      type: "paragraph" as const,
      text: "AI analysis of RFI patterns helps teams identify systemic documentation issues that can be addressed in future projects. If 40% of your mechanical RFIs relate to coordination conflicts, that's a preconstruction problem, not a field problem.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Accelerating Response Routing",
    },
    {
      type: "paragraph" as const,
      text: "Not every RFI needs the same level of review. A question about paint color can be handled differently than one about structural loading. AI can triage incoming RFIs by urgency, trade, and complexity, routing them to the right reviewer and flagging the ones that need immediate attention.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Getting Started",
    },
    {
      type: "paragraph" as const,
      text: "The fastest path to better RFI management is to start with validation. Connect your project management platform, upload your document set, and let AI review your next batch of draft RFIs before they go out. Most teams see a 30-40% reduction in unnecessary RFIs within the first month.",
    },
  ],
  inlineImages: [],
  relatedAgents: [
    {
      title: "RFI Validator",
      slug: "rfi-validator",
      shortDescription:
        "Validate RFIs before submission by identifying trivial requests and flagging implications.",
    },
    {
      title: "RFI Checker",
      slug: "rfi-checker",
      shortDescription:
        "Check RFIs against existing project documents to resolve questions internally.",
    },
  ],
  relatedConnectors: [
    {
      title: "Procore",
      slug: "procore",
      shortDescription: "Sync with Procore projects",
    },
    {
      title: "Autodesk Build",
      slug: "autodesk-build",
      shortDescription: "Connect to Autodesk Build",
    },
  ],
  cta: {
    heading: "Ready to try Datagrid?",
    description: "See how AI agents can transform your RFI workflows.",
    buttonText: "Request a Demo",
    buttonHref: "/demo",
  },
  relatedPosts: [
    {
      title: "How AI Agents Are Transforming Submittal Review",
      slug: "ai-agents-submittal-review",
      excerpt:
        "Learn how construction teams are cutting submittal review time by 80%.",
    },
    {
      title: "Construction Document Search: Beyond Keyword Matching",
      slug: "construction-document-search",
      excerpt:
        "Learn how AI-powered search delivers real answers instead of document lists.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Guide 3: Construction Document Search
// ---------------------------------------------------------------------------

export const GUIDE_POST_DOC_SEARCH = {
  _id: "guide-post-doc-search",
  title: "Construction Document Search: Beyond Keyword Matching",
  slug: "construction-document-search",
  url: "/blog/construction-document-search",
  author: "Datagrid Team",
  publishedAt: "2024-11-28T00:00:00Z",
  category: { title: "Technology", slug: "technology" },
  excerpt:
    "Traditional keyword search doesn't work well for construction documents. Learn how AI-powered search understands context, relationships, and intent to deliver real answers instead of document lists.",
  featuredImage: {
    url: "/blog/document-search.jpeg",
    alt: "Person working at desk searching through construction documents",
    width: 1200,
    height: 675,
  },
  readTimeMinutes: 7,
  body: [
    {
      type: "paragraph" as const,
      text: "A project engineer needs to know if the mechanical spec requires seismic bracing for ductwork above the second floor. With traditional search, they type 'seismic bracing ductwork' and get a list of 47 documents that contain those words. Now they need to open each one, scan for context, and piece together the answer. Thirty minutes later, they might have it — or they might file an RFI instead.",
    },
    {
      type: "paragraph" as const,
      text: "This is the fundamental problem with keyword search on construction projects. The information exists, but finding it takes so long that people default to asking someone else or filing an RFI. AI-powered search changes this equation entirely.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Why Keyword Search Fails for Construction Documents",
    },
    {
      type: "paragraph" as const,
      text: "Construction documents are dense, cross-referenced, and context-dependent. A specification section might reference a detail on a drawing, which references a product data sheet, which has a footnote about installation conditions. Keyword search can find individual documents but cannot follow these threads.",
    },
    {
      type: "list" as const,
      ordered: false,
      items: [
        "**Terminology mismatch** — The spec says 'gypsum board' but the team searches for 'drywall'. Keyword search returns nothing.",
        "**Cross-reference blindness** — A drawing note says 'see spec section 07 84 00' but keyword search can't connect the two.",
        "**Context loss** — A search for 'concrete strength' returns hundreds of hits across unrelated sections.",
        "**Version confusion** — Documents change over the life of a project, and keyword search doesn't know which version is current.",
      ],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "How AI Search Understands Intent",
    },
    {
      type: "paragraph" as const,
      text: "AI-powered search doesn't just match words — it understands what you're asking. When you search 'does the mechanical spec require seismic bracing for ductwork above the second floor,' AI can parse the intent, identify the relevant spec sections, drawings, and submittals, and synthesize an answer with source references.",
    },
    {
      type: "paragraph" as const,
      text: "This works because modern AI can understand the relationships between construction documents — how specs reference drawings, how submittals relate to spec sections, and how RFI responses modify the original design intent.",
    },
    {
      type: "agent-callout" as const,
      icon: "🔎",
      agentSlug: "deep-search",
      agentTitle: "Deep Search Agent",
      description:
        "Search deeply across specs, drawings, RFIs, and submittals to get accurate answers grounded in project requirements.",
      connectors: ["Procore", "Google Drive"],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Structured Answers vs. Document Lists",
    },
    {
      type: "paragraph" as const,
      text: "The difference between a search result and an answer is the difference between a pile of documents and a clear response. AI search returns structured answers — 'Yes, seismic bracing is required per spec section 23 05 29, paragraph 3.2.A. See also detail M-401 on sheet M-3.2 for bracing requirements above the second floor.'",
    },
    {
      type: "paragraph" as const,
      text: "Each answer includes source references you can click through to verify. The AI isn't replacing your judgment — it's doing the tedious part of finding and connecting information so you can focus on evaluating it.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Quick Answers for Simple Questions",
    },
    {
      type: "paragraph" as const,
      text: "Not every question requires a deep document analysis. Sometimes you just need to know what paint color was specified for the lobby, or what the fire rating is for a particular door. For these quick lookups, a fast search mode scans your connected data sources and returns a concise answer in seconds.",
    },
    {
      type: "agent-callout" as const,
      icon: "⚡",
      agentSlug: "fast-ai-search",
      agentTitle: "Fast AI Search Agent",
      description:
        "Get quick, structured answers by searching across connected spreadsheets, documents, databases, and web pages.",
      connectors: ["Procore", "Google Drive"],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Connecting Multiple Data Sources",
    },
    {
      type: "paragraph" as const,
      text: "Construction project data lives in multiple systems — Procore for project management, Google Drive or SharePoint for document storage, email for transmittals, and spreadsheets for tracking logs. AI search can connect to all of these simultaneously, giving you a single search interface that spans your entire project ecosystem.",
    },
    {
      type: "paragraph" as const,
      text: "This means a single search can pull from specs stored in Procore, drawings in Google Drive, and RFI responses in email — without you needing to know where each piece of information lives.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Getting Started",
    },
    {
      type: "paragraph" as const,
      text: "Start by connecting your primary document storage. Upload or sync your spec book and drawing set. Then try asking the questions your team files RFIs about. You'll quickly see which questions can be answered instantly from existing documents — and which ones genuinely need to go to the design team.",
    },
  ],
  inlineImages: [],
  relatedAgents: [
    {
      title: "Deep Search",
      slug: "deep-search",
      shortDescription:
        "Search deeply across specs, drawings, RFIs, and submittals for grounded answers.",
    },
    {
      title: "Fast AI Search",
      slug: "fast-ai-search",
      shortDescription:
        "Get quick, structured answers from connected spreadsheets, documents, and databases.",
    },
  ],
  relatedConnectors: [
    {
      title: "Procore",
      slug: "procore",
      shortDescription: "Sync with Procore projects",
    },
    {
      title: "Google Drive",
      slug: "google-drive",
      shortDescription: "Access documents in Google Drive",
    },
  ],
  cta: {
    heading: "Ready to try Datagrid?",
    description:
      "See how AI search can give your team instant answers from project documents.",
    buttonText: "Request a Demo",
    buttonHref: "/demo",
  },
  relatedPosts: [
    {
      title: "5 Ways AI is Transforming RFI Management",
      slug: "ai-rfi-management",
      excerpt:
        "AI is helping teams submit better RFIs and resolve questions faster.",
    },
    {
      title: "How AI Agents Are Transforming Submittal Review",
      slug: "ai-agents-submittal-review",
      excerpt:
        "Learn how construction teams are cutting submittal review time by 80%.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Guide 4: Reducing Change Order Disputes
// ---------------------------------------------------------------------------

export const GUIDE_POST_CHANGE_ORDERS = {
  _id: "guide-post-change-orders",
  title: "Reducing Change Order Disputes with AI-Powered Analysis",
  slug: "reducing-change-order-disputes",
  url: "/blog/reducing-change-order-disputes",
  author: "Datagrid Team",
  publishedAt: "2024-11-15T00:00:00Z",
  category: { title: "Best Practices", slug: "best-practices" },
  excerpt:
    "Change orders are a leading source of disputes in construction. Discover how AI agents can validate scope, flag cost implications, and provide evidence-backed analysis before disagreements escalate.",
  featuredImage: {
    url: "/blog/change-orders.jpeg",
    alt: "Modern building exterior representing construction change management",
    width: 1200,
    height: 675,
  },
  readTimeMinutes: 9,
  body: [
    {
      type: "paragraph" as const,
      text: "Change orders are inevitable in construction. Design evolves, conditions differ from plans, and owners modify requirements. The problem isn't change itself — it's the disputes that arise when parties disagree about scope, cost, or responsibility. These disputes consume management attention, strain relationships, and can delay projects by weeks or months.",
    },
    {
      type: "paragraph" as const,
      text: "Most change order disputes share a common root cause: insufficient analysis before positions harden. When a change order request arrives with a number on it but no clear link to contract scope, specification requirements, or schedule impact, it becomes a negotiation based on opinion rather than evidence.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "The Anatomy of a Change Order Dispute",
    },
    {
      type: "paragraph" as const,
      text: "A typical dispute begins when a contractor submits a change order that the owner or GC believes is already within the original scope. The contractor points to one interpretation of the drawings. The GC points to another. Without a systematic way to reconcile these interpretations against the contract documents, the discussion becomes adversarial.",
    },
    {
      type: "list" as const,
      ordered: false,
      items: [
        "**Scope ambiguity** — Contract language is unclear about where one trade's work ends and another's begins.",
        "**Drawing conflicts** — Different drawing sheets show conflicting information about the same area.",
        "**Specification gaps** — The spec doesn't address a condition encountered in the field.",
        "**Cumulative impact** — Multiple small changes compound into significant cost and schedule impacts.",
        "**Incomplete documentation** — Change orders are filed without adequate backup or justification.",
      ],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Validating Scope, Cost, and Schedule Impact",
    },
    {
      type: "paragraph" as const,
      text: "The first step in preventing disputes is thorough analysis of each change order request. AI can cross-reference a change order against the original contract, specifications, drawings, and prior change orders to determine whether the work is genuinely outside the original scope.",
    },
    {
      type: "paragraph" as const,
      text: "When a change order request claims 'additional waterproofing not shown on drawings,' AI can search the drawing set, spec sections, and contract exhibits to find every reference to waterproofing in that area. The result is an evidence-based assessment that both parties can review.",
    },
    {
      type: "agent-callout" as const,
      icon: "📋",
      agentSlug: "change-order",
      agentTitle: "Change Order Agent",
      description:
        "Review change order requests to validate scope, cost, and schedule impacts using supporting project documentation.",
      connectors: ["Procore", "Sage 300 CRE"],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Understanding Patterns and Cumulative Impact",
    },
    {
      type: "paragraph" as const,
      text: "Individual change orders are rarely the whole story. What matters is the pattern: Are changes concentrated in one area of the building? One trade? One spec section? Are the cumulative impacts being tracked, or is each change being evaluated in isolation?",
    },
    {
      type: "paragraph" as const,
      text: "AI can analyze RFIs, NCRs, and field changes together to reveal patterns that aren't visible when looking at individual items. A series of small electrical changes might individually seem manageable, but collectively they could push a subcontractor past their capacity and impact the schedule.",
    },
    {
      type: "agent-callout" as const,
      icon: "📊",
      agentSlug: "change-analyser",
      agentTitle: "Change Analyser Agent",
      description:
        "Analyze RFIs, NCRs, and field changes to understand patterns, root causes, and the cumulative impact of project changes.",
      connectors: ["Procore", "Sage 300 CRE"],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Catching Scope Gaps Before They Become Disputes",
    },
    {
      type: "paragraph" as const,
      text: "The best change order dispute is one that never happens. Scope gaps — areas where the contract documents are unclear about responsibility — are the primary driver of disputes. Identifying them early, ideally during preconstruction, prevents costly arguments during construction.",
    },
    {
      type: "paragraph" as const,
      text: "AI can reconcile contracts, drawings, and project metadata to surface scope gaps and overlaps before they hit the field. When the mechanical drawings show ductwork penetrations but the fire protection spec doesn't address firestopping at those locations, that's a gap that will become a change order and potentially a dispute.",
    },
    {
      type: "agent-callout" as const,
      icon: "🔬",
      agentSlug: "scope-checker",
      agentTitle: "Scope Checker Agent",
      description:
        "Eliminate scope gaps and overlaps by reconciling contracts, drawings, and project metadata before they become costly disputes.",
      connectors: ["Procore", "Sage 300 CRE"],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Building an Evidence-Based Change Management Process",
    },
    {
      type: "paragraph" as const,
      text: "The common thread across these approaches is evidence. When change orders are backed by clear references to contract documents, specification sections, and drawing details, disputes become discussions. Both parties can look at the same evidence and reach reasonable conclusions.",
    },
    {
      type: "list" as const,
      ordered: true,
      items: [
        "Run scope analysis early to identify gaps before construction begins.",
        "Validate every change order request against the full document set before responding.",
        "Track cumulative change impacts by trade, area, and cause.",
        "Use AI-generated evidence reports as the starting point for change order negotiations.",
        "Document the analysis process for audit and dispute resolution purposes.",
      ],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Getting Started",
    },
    {
      type: "paragraph" as const,
      text: "Start with your next change order request. Instead of immediately negotiating, run it through AI analysis against your project documents. See what evidence emerges. Most teams find that having a clear, document-backed analysis changes the tone of change order discussions from adversarial to collaborative.",
    },
  ],
  inlineImages: [],
  relatedAgents: [
    {
      title: "Change Order Agent",
      slug: "change-order",
      shortDescription:
        "Review change order requests to validate scope, cost, and schedule impacts.",
    },
    {
      title: "Change Analyser",
      slug: "change-analyser",
      shortDescription:
        "Analyze RFIs, NCRs, and field changes to understand patterns and cumulative impact.",
    },
    {
      title: "Scope Checker",
      slug: "scope-checker",
      shortDescription:
        "Reconcile contracts, drawings, and metadata to eliminate scope gaps.",
    },
  ],
  relatedConnectors: [
    {
      title: "Procore",
      slug: "procore",
      shortDescription: "Sync with Procore projects",
    },
    {
      title: "Sage 300 CRE",
      slug: "sage-300-cre",
      shortDescription: "Pull cost data from Sage",
    },
  ],
  cta: {
    heading: "Ready to try Datagrid?",
    description:
      "See how AI can transform your change order management process.",
    buttonText: "Request a Demo",
    buttonHref: "/demo",
  },
  relatedPosts: [
    {
      title: "How AI Agents Are Transforming Submittal Review",
      slug: "ai-agents-submittal-review",
      excerpt:
        "Learn how construction teams are cutting submittal review time by 80%.",
    },
    {
      title: "The GC's Guide to AI Adoption in 2025",
      slug: "gc-guide-ai-adoption",
      excerpt:
        "Practical advice for GCs looking to implement AI without disrupting existing workflows.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Guide 5: AI Safety Inspections
// ---------------------------------------------------------------------------

export const GUIDE_POST_SAFETY = {
  _id: "guide-post-safety",
  title: "AI Safety Inspections: From Site Photos to Actionable Reports",
  slug: "ai-safety-inspections",
  url: "/blog/ai-safety-inspections",
  author: "Datagrid Team",
  publishedAt: "2024-11-01T00:00:00Z",
  category: { title: "Workflows", slug: "workflows" },
  excerpt:
    "Site safety inspections generate mountains of photos and notes that rarely get analyzed systematically. Learn how AI agents turn visual data into prioritized, field-ready safety findings.",
  featuredImage: {
    url: "/blog/safety-inspections.jpeg",
    alt: "Construction safety inspection on an active jobsite",
    width: 1200,
    height: 675,
  },
  readTimeMinutes: 5,
  body: [
    {
      type: "paragraph" as const,
      text: "A safety manager walks a large commercial jobsite and takes 200 photos over the course of an afternoon. Each photo captures a potential finding — missing guardrails, improperly stored materials, PPE violations, housekeeping issues. Back at the office, those photos sit in a camera roll, waiting to be reviewed, categorized, and written up into findings. Most of the time, only the most obvious issues get documented.",
    },
    {
      type: "paragraph" as const,
      text: "This isn't a failure of diligence. It's a capacity problem. There's too much visual data and not enough time to analyze it all systematically. AI changes this by processing every photo and surfacing findings that human reviewers might miss.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "The Gap Between Inspection and Action",
    },
    {
      type: "paragraph" as const,
      text: "The value of a safety inspection isn't in the walk itself — it's in the actions that result from it. But there's a significant gap between observing a hazard and producing an actionable finding. A photo of scaffolding without toe boards is useless unless it gets documented, categorized, assigned, and tracked to resolution.",
    },
    {
      type: "list" as const,
      ordered: false,
      items: [
        "**Photo overload** — Hundreds of photos per inspection with no automated categorization.",
        "**Inconsistent documentation** — Different inspectors document findings at different levels of detail.",
        "**Delayed reports** — Findings don't get written up for days, losing urgency and context.",
        "**Missing patterns** — The same hazard keeps appearing because nobody is tracking recurrence across inspections.",
      ],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "How AI Analyzes Site Safety Data",
    },
    {
      type: "paragraph" as const,
      text: "AI can process site photos to identify safety hazards automatically. Upload a batch of inspection photos, and AI will categorize each one by hazard type, severity, and OSHA reference. Missing fall protection, inadequate housekeeping, electrical hazards, PPE violations — each gets flagged with a clear description and priority rating.",
    },
    {
      type: "paragraph" as const,
      text: "The output isn't a generic alert. It's a field-ready finding with the specific hazard identified, the relevant OSHA standard referenced, and a recommended corrective action. Safety managers review and approve the findings rather than creating them from scratch.",
    },
    {
      type: "agent-callout" as const,
      icon: "🦺",
      agentSlug: "site-safety",
      agentTitle: "Site Safety Agent",
      description:
        "Identify safety hazards from site photos, videos, and drawings with clear, field-ready findings.",
      connectors: ["Procore", "PlanGrid"],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Proactive Compliance Verification",
    },
    {
      type: "paragraph" as const,
      text: "Safety inspections are reactive — you find problems after they exist. But compliance verification can be proactive. AI can review safety plans, permits, and training records against regulatory requirements to identify gaps before they become jobsite hazards.",
    },
    {
      type: "paragraph" as const,
      text: "Before a concrete pour, is the fall protection plan current? Are all workers on the crew certified for the equipment they'll be operating? Are the required permits in place? AI can check these items against your project documents and flag anything missing before work begins.",
    },
    {
      type: "agent-callout" as const,
      icon: "📑",
      agentSlug: "audit-agent",
      agentTitle: "Audit Agent",
      description:
        "Automatically verify project documents against audit requirements and flag compliance gaps before audits become emergencies.",
      connectors: ["Procore", "PlanGrid"],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "From Findings to Trends",
    },
    {
      type: "paragraph" as const,
      text: "When safety data is captured consistently and analyzed at scale, patterns emerge. Fall protection violations concentrated on the south tower. Housekeeping issues spiking on Mondays. A specific subcontractor repeatedly cited for the same infraction. These trends are invisible in individual inspection reports but become clear when AI aggregates data across inspections, projects, and time periods.",
    },
    {
      type: "paragraph" as const,
      text: "Trend analysis transforms safety management from reactive to predictive. Instead of waiting for the next incident, teams can identify where the next incident is most likely to occur and intervene proactively.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Getting Started",
    },
    {
      type: "paragraph" as const,
      text: "Start with your next safety walk. Take photos as usual, then upload them to the Site Safety Agent. Compare the AI-generated findings against your manual notes. Most safety managers discover issues they missed and get a more consistent, detailed report than they would have produced manually — in a fraction of the time.",
    },
  ],
  inlineImages: [],
  relatedAgents: [
    {
      title: "Site Safety Agent",
      slug: "site-safety",
      shortDescription:
        "Identify safety hazards from site photos with field-ready findings.",
    },
    {
      title: "Audit Agent",
      slug: "audit-agent",
      shortDescription:
        "Verify project documents against audit requirements and flag compliance gaps.",
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
      "See how AI can turn your safety inspections into actionable intelligence.",
    buttonText: "Request a Demo",
    buttonHref: "/demo",
  },
  relatedPosts: [
    {
      title: "How AI Agents Are Transforming Submittal Review",
      slug: "ai-agents-submittal-review",
      excerpt:
        "Learn how construction teams are cutting submittal review time by 80%.",
    },
    {
      title: "The GC's Guide to AI Adoption in 2025",
      slug: "gc-guide-ai-adoption",
      excerpt:
        "Practical advice for GCs looking to implement AI without disrupting existing workflows.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Blog Post: AI in Preconstruction
// ---------------------------------------------------------------------------

export const BLOG_POST_PRECON = {
  _id: "blog-post-precon",
  title: "How AI Agents Are Changing Preconstruction Workflows",
  slug: "ai-preconstruction-workflows",
  url: "/blog/ai-preconstruction-workflows",
  author: "Datagrid Team",
  publishedAt: "2026-01-20T00:00:00Z",
  category: { title: "Preconstruction", slug: "preconstruction" },
  excerpt:
    "Preconstruction teams spend weeks on tasks that AI can accelerate to hours — from prequalification responses to scope gap analysis. Here's what's changing.",
  featuredImage: {
    url: "/blog/preconstruction-ai.jpeg",
    alt: "Construction preconstruction planning session with blueprints",
    width: 1200,
    height: 675,
  },
  readTimeMinutes: 7,
  body: [
    {
      type: "paragraph" as const,
      text: "Preconstruction is where projects are won or lost. The quality of estimates, the thoroughness of scope review, and the speed of prequalification responses all determine whether a firm wins work and whether that work will be profitable. Yet preconstruction teams are among the most stretched in construction — handling multiple pursuits simultaneously with limited staff.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "The Prequalification Bottleneck",
    },
    {
      type: "paragraph" as const,
      text: "Prequalification questionnaires are a necessary part of winning work, but they're also one of the most tedious. The same questions appear in slightly different forms across different GCs and owners: safety records, bonding capacity, project references, insurance certificates. Teams end up answering the same questions dozens of times per year.",
    },
    {
      type: "paragraph" as const,
      text: "AI agents can review uploaded checklists against your firm's existing documentation — safety records, project lists, financial statements, certifications — and draft complete responses. The preconstruction manager reviews and approves rather than starting from scratch each time.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Scope Review at the Speed of Pursuit",
    },
    {
      type: "paragraph" as const,
      text: "During bid preparation, estimators need to understand exactly what's included in the scope of work. This means reading through drawings, specifications, and contract exhibits to identify what's required, what's excluded, and where the gaps are. On a complex project, this analysis alone can take days.",
    },
    {
      type: "paragraph" as const,
      text: "AI can accelerate scope review by reconciling contracts against drawings and specifications, flagging areas where responsibilities are unclear or where scope gaps exist between trades. This doesn't replace the estimator's judgment — it gives them a head start so they can focus on the areas that require human expertise.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Faster Document Analysis Across Pursuits",
    },
    {
      type: "paragraph" as const,
      text: "Preconstruction teams often manage 5-10 active pursuits simultaneously, each with its own set of documents. Being able to quickly search across all project documents — specs, drawings, addenda, RFI logs from similar past projects — saves hours per pursuit and reduces the risk of missing critical information.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "The Competitive Advantage",
    },
    {
      type: "paragraph" as const,
      text: "Firms that adopt AI for preconstruction aren't just faster — they're more thorough. When scope review takes hours instead of days, you can afford to analyze every pursuit more carefully. When prequalification responses are partially automated, you can respond to more opportunities. The result is more bids, better bids, and higher win rates.",
    },
  ],
  inlineImages: [],
  relatedAgents: [
    {
      title: "Pre-Qualification Agent",
      slug: "pre-qualification",
      shortDescription:
        "Complete prequalification responses accurately and quickly.",
    },
    {
      title: "Scope Checker",
      slug: "scope-checker",
      shortDescription:
        "Reconcile contracts, drawings, and metadata to eliminate scope gaps.",
    },
  ],
  relatedConnectors: [
    {
      title: "Procore",
      slug: "procore",
      shortDescription: "Sync with Procore projects",
    },
    {
      title: "Google Drive",
      slug: "google-drive",
      shortDescription: "Access documents in Google Drive",
    },
  ],
  cta: {
    heading: "Ready to try Datagrid?",
    description:
      "See how AI agents can accelerate your preconstruction workflows.",
    buttonText: "Request a Demo",
    buttonHref: "/demo",
  },
  relatedPosts: [
    {
      title: "Reducing Change Order Disputes with AI-Powered Analysis",
      slug: "reducing-change-order-disputes",
      excerpt:
        "How AI agents validate scope, flag cost implications, and provide evidence-backed analysis.",
    },
    {
      title: "The GC's Guide to AI Adoption in 2025",
      slug: "gc-guide-ai-adoption",
      excerpt:
        "Practical advice for GCs looking to implement AI without disrupting workflows.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Blog Post: Drawing Comparison
// ---------------------------------------------------------------------------

export const BLOG_POST_DRAWING = {
  _id: "blog-post-drawing",
  title:
    "Closing the Gap: Why Drawing Set Comparison Still Takes Too Long",
  slug: "drawing-comparison-ai",
  url: "/blog/drawing-comparison-ai",
  author: "Datagrid Team",
  publishedAt: "2026-01-15T00:00:00Z",
  category: { title: "Document Review", slug: "document-review" },
  excerpt:
    "Comparing drawing sets revision-to-revision is critical but painfully manual. AI-powered comparison catches changes that overlay tools miss — and does it in minutes.",
  featuredImage: {
    url: "/blog/drawing-comparison.jpeg",
    alt: "Construction drawings being compared side by side",
    width: 1200,
    height: 675,
  },
  readTimeMinutes: 6,
  body: [
    {
      type: "paragraph" as const,
      text: "Every time a new drawing revision is issued, someone on the project team needs to figure out what changed. On a large project with hundreds of sheets and monthly revisions, this is a staggering amount of work. The traditional approach — overlaying old and new drawings and visually scanning for differences — is slow, error-prone, and misses subtle changes that can have major implications.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "What Traditional Overlay Tools Miss",
    },
    {
      type: "paragraph" as const,
      text: "PDF overlay tools highlight graphical differences between drawing revisions, but they can't distinguish between meaningful changes and formatting artifacts. A shifted title block, a relocated keynote, or a reformatted schedule all show up as 'changes' — creating noise that obscures the real modifications. And overlay tools completely miss changes in text-heavy areas like schedules, notes, and specifications referenced on drawings.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "AI-Powered Drawing Comparison",
    },
    {
      type: "paragraph" as const,
      text: "AI can understand what a drawing is showing, not just what pixels changed. When a wall moves three inches, AI recognizes it as a dimensional change and flags the downstream impacts — affected room sizes, door swing clearances, MEP coordination implications. When a note changes from 'GWB Type X' to 'GWB Type C,' AI flags it as a material change with fire-rating implications.",
    },
    {
      type: "paragraph" as const,
      text: "The output is a structured change summary organized by significance, trade impact, and required actions — not a marked-up drawing with colored blobs that someone needs to interpret.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Catching Scope Creep Before It Hits the Field",
    },
    {
      type: "paragraph" as const,
      text: "Drawing revisions are one of the primary vehicles for scope creep. A new revision adds a detail that wasn't in the original contract drawings. A keynote changes a material to something more expensive. A dimension shifts in a way that requires rework of already-installed work. AI comparison catches these changes systematically and flags the ones with cost or schedule implications.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "Integration with Change Management",
    },
    {
      type: "paragraph" as const,
      text: "Drawing comparison doesn't exist in isolation. When AI identifies a material change, that finding should flow into your change order process. When it identifies a coordination conflict, that should trigger an RFI. By connecting drawing comparison to downstream workflows, teams can act on changes immediately rather than discovering them weeks later in the field.",
    },
    {
      type: "paragraph" as const,
      text: "The result is a project team that's always working from current information, catching changes early, and managing scope proactively rather than reactively.",
    },
  ],
  inlineImages: [],
  relatedAgents: [
    {
      title: "Document Comparison Agent",
      slug: "document-comparison",
      shortDescription:
        "Compare drawing sets to identify material changes, scope creep, and project risk.",
    },
    {
      title: "Scope Checker",
      slug: "scope-checker",
      shortDescription:
        "Reconcile contracts and drawings to eliminate scope gaps.",
    },
  ],
  relatedConnectors: [
    {
      title: "Procore",
      slug: "procore",
      shortDescription: "Sync with Procore projects",
    },
    {
      title: "Autodesk Build",
      slug: "autodesk-build",
      shortDescription: "Connect to Autodesk Build",
    },
  ],
  cta: {
    heading: "Ready to try Datagrid?",
    description:
      "See how AI-powered drawing comparison catches what overlay tools miss.",
    buttonText: "Request a Demo",
    buttonHref: "/demo",
  },
  relatedPosts: [
    {
      title: "How AI Agents Are Transforming Submittal Review",
      slug: "ai-agents-submittal-review",
      excerpt:
        "Learn how construction teams are cutting submittal review time by 80%.",
    },
    {
      title: "Reducing Change Order Disputes with AI-Powered Analysis",
      slug: "reducing-change-order-disputes",
      excerpt:
        "How AI validates scope, flags cost implications, and provides evidence-backed analysis.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Blog Post: Daily Reporting
// ---------------------------------------------------------------------------

export const BLOG_POST_DAILY = {
  _id: "blog-post-daily",
  title: "The Hidden Cost of Manual Daily Reporting in Construction",
  slug: "hidden-cost-manual-daily-reporting",
  url: "/blog/hidden-cost-manual-daily-reporting",
  author: "Datagrid Team",
  publishedAt: "2026-01-10T00:00:00Z",
  category: { title: "Field Operations", slug: "field-operations" },
  excerpt:
    "Superintendents and foremen spend 45-90 minutes daily on reports that rarely get read systematically. AI-automated reporting gives that time back to the field.",
  featuredImage: {
    url: "/blog/daily-reporting-cost.jpeg",
    alt: "Construction superintendent completing daily reporting on site",
    width: 1200,
    height: 675,
  },
  readTimeMinutes: 5,
  body: [
    {
      type: "paragraph" as const,
      text: "Every evening, superintendents across the construction industry sit down to write daily reports. They document weather, labor counts, equipment usage, work completed, safety observations, and issues encountered. It takes 45-90 minutes per superintendent, and on a project with multiple superintendents, that's several hours of collective management time spent on documentation rather than managing the work.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "The Real Cost of Daily Reports",
    },
    {
      type: "paragraph" as const,
      text: "At an average superintendent billing rate of $85-120/hour, a single superintendent's daily reporting costs the project $6,000-9,000 per month. On a 24-month project with three superintendents, that's $430,000-650,000 in reporting labor alone. And this doesn't account for the opportunity cost — the field supervision that isn't happening while reports are being written.",
    },
    {
      type: "paragraph" as const,
      text: "The irony is that much of this effort is duplicated. Multiple foremen and superintendents report on overlapping areas. Labor counts get entered in the daily report, the scheduling tool, and the payroll system. Weather data is manually transcribed despite being available from automated weather services.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "What Gets Lost in Manual Reporting",
    },
    {
      type: "list" as const,
      ordered: false,
      items: [
        "**Inconsistent detail** — Some superintendents write detailed narratives, others write bare minimums.",
        "**Missing connections** — The delay noted in Tuesday's report isn't linked to the RFI from Monday.",
        "**No trend analysis** — Nobody reads 6 months of daily reports to identify patterns.",
        "**Late documentation** — Reports written hours after the fact miss details that were fresh in the moment.",
      ],
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "AI-Assisted Daily Reporting",
    },
    {
      type: "paragraph" as const,
      text: "AI can transform daily reporting from a writing exercise into a review exercise. Instead of starting from a blank page, superintendents review an AI-generated draft that pulls from multiple sources — labor tracking data, weather services, schedule updates, and photos taken throughout the day. The superintendent adds context, corrections, and observations that only a human on the ground would know.",
    },
    {
      type: "paragraph" as const,
      text: "The result is a more complete, more consistent report produced in 10-15 minutes instead of 45-90. Field leaders get their evenings back, and project teams get better documentation.",
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: "From Reports to Intelligence",
    },
    {
      type: "paragraph" as const,
      text: "When daily reports are structured and consistent, they become a data source rather than just a compliance document. AI can analyze trends across reports — identifying productivity patterns, weather impacts on specific trades, recurring equipment issues, and early warning signs of schedule problems. This turns the daily report from something that gets filed into something that informs decisions.",
    },
  ],
  inlineImages: [],
  relatedAgents: [
    {
      title: "Daily Report Agent",
      slug: "daily-report",
      shortDescription:
        "Generate complete, structured daily reports from work activity data.",
    },
    {
      title: "Mentor Agent",
      slug: "mentor-agent",
      shortDescription:
        "Get fast guidance on systems, processes, and standards.",
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
      shortDescription: "Import from PlanGrid",
    },
  ],
  cta: {
    heading: "Ready to try Datagrid?",
    description:
      "See how AI can transform daily reporting from a burden to an asset.",
    buttonText: "Request a Demo",
    buttonHref: "/demo",
  },
  relatedPosts: [
    {
      title: "How AI Agents Are Changing Preconstruction Workflows",
      slug: "ai-preconstruction-workflows",
      excerpt:
        "Preconstruction teams spend weeks on tasks that AI can accelerate to hours.",
    },
    {
      title: "The GC's Guide to AI Adoption in 2025",
      slug: "gc-guide-ai-adoption",
      excerpt:
        "Practical advice for GCs looking to implement AI without disrupting workflows.",
    },
  ],
};
