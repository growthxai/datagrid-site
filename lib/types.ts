export type SanitySlug = { current: string };

export type Category = {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
};

export type ConnectorRef = {
  _id: string;
  title: string;
  slug: SanitySlug;
  shortDescription?: string;
  logo?: unknown;
};

export type AgentRef = {
  _id: string;
  title: string;
  slug: SanitySlug;
  shortDescription: string;
};

export type Agent = {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  shortDescription: string;
  category?: { title: string; slug: SanitySlug };
  status: string;
  jobToBeDone?: string;
  inputs?: string[];
  outputs?: string[];
  connectors?: ConnectorRef[];
  commonUseCases?: string[];
  minimumKnowledge?: string[];
  videoUrl?: string;
  body?: unknown;
};

export type DataEndpoint = {
  name: string;
  category: string;
  level: string;
  listShow: string;
  incrementalIngestion: boolean;
  read: boolean;
};

export type SetupStepItem = {
  title: string;
  slug: string;
};

export type SetupStep = {
  title: string;
  slug: string;
  bg: string;
  icon: string;
  subtitle?: string;
  items?: SetupStepItem[];
};

export type Connector = {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  shortDescription: string;
  logo?: unknown;
  agents?: AgentRef[];
  prerequisites?: string[];
  setupSteps?: SetupStep[];
  dataEndpoints?: DataEndpoint[];
  setupGuide?: unknown;
  body?: unknown;
};

export type Guide = {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  author?: string;
  publishedAt?: string;
  category?: { title: string; slug: SanitySlug };
  featuredImage?: unknown;
  agents?: AgentRef[];
  connectors?: ConnectorRef[];
  body?: unknown;
};

export type Page = {
  _id: string;
  title: string;
  slug: SanitySlug;
  body?: unknown;
};
