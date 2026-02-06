export const PLACEHOLDER_AGENTS = [
  {
    _id: "agent-1",
    title: "Submittal Reviewer",
    slug: { current: "submittal-reviewer" },
    shortDescription:
      "Automatically reviews submittals against specs and flags discrepancies.",
    description:
      "The Submittal Reviewer agent ingests project specs and incoming submittals, cross-references material and product data, and produces a detailed review with flagged issues — saving hours of manual review per submittal package.",
    category: { title: "Document Review", slug: { current: "document-review" } },
    status: "live",
    jobToBeDone:
      "Review construction submittals against project specifications and flag non-conformances automatically.",
    inputs: ["Project specifications (PDF)", "Submittal package (PDF)", "Approved materials list"],
    outputs: ["Review report with flagged issues", "Conformance score", "Action items list"],
    connectors: [
      { _id: "conn-1", title: "Procore", slug: { current: "procore" }, shortDescription: "Sync with Procore projects" },
      { _id: "conn-2", title: "PlanGrid", slug: { current: "plangrid" }, shortDescription: "Import plans from PlanGrid" },
    ],
  },
  {
    _id: "agent-2",
    title: "RFI Drafter",
    slug: { current: "rfi-drafter" },
    shortDescription:
      "Drafts RFIs from field observations and drawing markups.",
    description:
      "The RFI Drafter agent takes field notes, photos, and drawing markups as input and generates a well-structured RFI ready for submission to the design team.",
    category: { title: "Field Operations", slug: { current: "field-operations" } },
    status: "live",
    jobToBeDone:
      "Generate well-structured RFIs from field observations, reducing drafting time from hours to minutes.",
    inputs: ["Field notes", "Photos/markups", "Relevant drawing sheets"],
    outputs: ["Draft RFI document", "Referenced drawing callouts", "Priority classification"],
    connectors: [
      { _id: "conn-1", title: "Procore", slug: { current: "procore" }, shortDescription: "Sync with Procore projects" },
    ],
  },
  {
    _id: "agent-3",
    title: "Daily Log Compiler",
    slug: { current: "daily-log-compiler" },
    shortDescription:
      "Compiles daily reports from multiple foremen into a single project log.",
    description:
      "The Daily Log Compiler aggregates reports from field teams — including labor counts, weather conditions, equipment usage, and progress notes — into a unified daily log.",
    category: { title: "Field Operations", slug: { current: "field-operations" } },
    status: "live",
    jobToBeDone:
      "Aggregate multiple field reports into a comprehensive daily project log automatically.",
    inputs: ["Foreman daily reports", "Weather data", "Schedule baseline"],
    outputs: ["Consolidated daily log", "Variance alerts", "Progress summary"],
    connectors: [
      { _id: "conn-3", title: "Autodesk Build", slug: { current: "autodesk-build" }, shortDescription: "Connect to Autodesk Build" },
    ],
  },
  {
    _id: "agent-4",
    title: "Change Order Analyzer",
    slug: { current: "change-order-analyzer" },
    shortDescription:
      "Analyzes change orders for cost impact and schedule implications.",
    category: { title: "Cost Management", slug: { current: "cost-management" } },
    status: "coming-soon",
    jobToBeDone:
      "Evaluate change order requests against budget and schedule to provide impact analysis.",
    inputs: ["Change order request", "Current budget", "Project schedule"],
    outputs: ["Cost impact report", "Schedule impact analysis", "Recommendation"],
    connectors: [],
  },
  {
    _id: "agent-5",
    title: "Safety Compliance Checker",
    slug: { current: "safety-compliance-checker" },
    shortDescription:
      "Scans safety plans and site photos for OSHA compliance gaps.",
    category: { title: "Safety & Compliance", slug: { current: "safety-compliance" } },
    status: "coming-soon",
    jobToBeDone:
      "Identify OSHA compliance gaps by analyzing safety plans and jobsite photographs.",
    inputs: ["Safety plan documents", "Jobsite photos", "OSHA standards reference"],
    outputs: ["Compliance gap report", "Risk severity ratings", "Corrective action items"],
    connectors: [],
  },
  {
    _id: "agent-6",
    title: "Bid Leveling Assistant",
    slug: { current: "bid-leveling-assistant" },
    shortDescription:
      "Normalizes and compares subcontractor bids side-by-side.",
    category: { title: "Preconstruction", slug: { current: "preconstruction" } },
    status: "live",
    jobToBeDone:
      "Normalize subcontractor bids into a comparable format and highlight key differences.",
    inputs: ["Subcontractor bid packages", "Scope of work documents", "Budget estimates"],
    outputs: ["Leveled bid comparison", "Scope gap analysis", "Recommendation summary"],
    connectors: [
      { _id: "conn-1", title: "Procore", slug: { current: "procore" }, shortDescription: "Sync with Procore projects" },
    ],
  },
];

export const PLACEHOLDER_CONNECTORS = [
  {
    _id: "conn-1",
    title: "Procore",
    slug: { current: "procore" },
    shortDescription: "Sync projects, RFIs, submittals, and daily logs with Procore.",
    description: "The Procore connector enables bidirectional sync between Datagrid agents and your Procore projects.",
  },
  {
    _id: "conn-2",
    title: "PlanGrid",
    slug: { current: "plangrid" },
    shortDescription: "Import plans, markups, and field reports from PlanGrid.",
    description: "Connect PlanGrid to pull in construction documents and push agent-generated reports back.",
  },
  {
    _id: "conn-3",
    title: "Autodesk Build",
    slug: { current: "autodesk-build" },
    shortDescription: "Connect to Autodesk Build for model and document access.",
    description: "The Autodesk Build connector provides access to BIM models, documents, and project data.",
  },
  {
    _id: "conn-4",
    title: "Bluebeam",
    slug: { current: "bluebeam" },
    shortDescription: "Import and export markups and punch lists via Bluebeam.",
    description: "Integrate with Bluebeam Revu for document markup workflows and punch list management.",
  },
  {
    _id: "conn-5",
    title: "Sage 300 CRE",
    slug: { current: "sage-300-cre" },
    shortDescription: "Pull cost data and job budgets from Sage 300 CRE.",
    description: "Connect to Sage 300 CRE to access cost codes, budgets, and financial reporting data.",
  },
  {
    _id: "conn-6",
    title: "Microsoft Project",
    slug: { current: "microsoft-project" },
    shortDescription: "Sync schedules and milestones from Microsoft Project.",
    description: "The Microsoft Project connector syncs project schedules, tasks, and milestone data.",
  },
];

export const PLACEHOLDER_CATEGORIES = [
  { _id: "cat-1", title: "Document Review", slug: { current: "document-review" }, description: "Agents that review and analyze construction documents." },
  { _id: "cat-2", title: "Field Operations", slug: { current: "field-operations" }, description: "Agents that streamline field reporting and operations." },
  { _id: "cat-3", title: "Cost Management", slug: { current: "cost-management" }, description: "Agents for budget tracking and cost analysis." },
  { _id: "cat-4", title: "Safety & Compliance", slug: { current: "safety-compliance" }, description: "Agents that help ensure jobsite safety and regulatory compliance." },
  { _id: "cat-5", title: "Preconstruction", slug: { current: "preconstruction" }, description: "Agents that assist with estimating, bid leveling, and pre-con workflows." },
];

export const PLACEHOLDER_GUIDES = [
  {
    _id: "guide-1",
    title: "How AI Agents Are Transforming Submittal Review",
    slug: { current: "ai-agents-submittal-review" },
    excerpt: "Learn how construction teams are cutting submittal review time by 80% with AI-powered document analysis.",
    author: "Datagrid Team",
    publishedAt: "2025-01-15T00:00:00Z",
    category: { title: "Document Review", slug: { current: "document-review" } },
  },
  {
    _id: "guide-2",
    title: "Getting Started with Datagrid Connectors",
    slug: { current: "getting-started-connectors" },
    excerpt: "A step-by-step guide to connecting your existing construction software with Datagrid's AI agents.",
    author: "Datagrid Team",
    publishedAt: "2025-01-10T00:00:00Z",
    category: { title: "Guides", slug: { current: "guides" } },
  },
  {
    _id: "guide-3",
    title: "The GC's Guide to AI Adoption in 2025",
    slug: { current: "gc-guide-ai-adoption" },
    excerpt: "Practical advice for general contractors looking to implement AI tools without disrupting existing workflows.",
    author: "Datagrid Team",
    publishedAt: "2025-01-05T00:00:00Z",
    category: { title: "Industry", slug: { current: "industry" } },
  },
];
