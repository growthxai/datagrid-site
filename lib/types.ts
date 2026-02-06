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
  body?: unknown;
};

export type Connector = {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  shortDescription: string;
  logo?: unknown;
  agents?: AgentRef[];
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
