import { client } from "./sanity";
import type { Agent, Connector, Guide, Category, Page } from "./types";

// --- Agents ---

export async function getAgents(): Promise<Agent[]> {
  if (!client) return [];
  return client.fetch(
    `*[_type == "agent"] | order(_createdAt desc) {
      _id, title, slug, shortDescription, description,
      category->{ title, slug },
      status, jobToBeDone, inputs, outputs
    }`
  );
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  if (!client) return null;
  return client.fetch(
    `*[_type == "agent" && slug.current == $slug][0] {
      _id, title, slug, description, shortDescription,
      category->{ title, slug },
      jobToBeDone, inputs, outputs, status,
      connectors[]->{ _id, title, slug, shortDescription, logo },
      body
    }`,
    { slug }
  );
}

export async function getAgentsByCategory(categorySlug: string): Promise<Agent[]> {
  if (!client) return [];
  return client.fetch(
    `*[_type == "agent" && category->slug.current == $categorySlug] | order(_createdAt desc) {
      _id, title, slug, shortDescription, description,
      category->{ title, slug },
      status
    }`,
    { categorySlug }
  );
}

// --- Connectors ---

export async function getConnectors(): Promise<Connector[]> {
  if (!client) return [];
  return client.fetch(
    `*[_type == "connector"] | order(title asc) {
      _id, title, slug, shortDescription, description, logo
    }`
  );
}

export async function getConnectorBySlug(slug: string): Promise<Connector | null> {
  if (!client) return null;
  return client.fetch(
    `*[_type == "connector" && slug.current == $slug][0] {
      _id, title, slug, description, shortDescription, logo,
      setupGuide, body,
      agents[]->{ _id, title, slug, shortDescription }
    }`,
    { slug }
  );
}

// --- Guides (Blog) ---

export async function getGuides(): Promise<Guide[]> {
  if (!client) return [];
  return client.fetch(
    `*[_type == "guide"] | order(publishedAt desc) {
      _id, title, slug, excerpt, author, publishedAt,
      category->{ title, slug },
      featuredImage
    }`
  );
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  if (!client) return null;
  return client.fetch(
    `*[_type == "guide" && slug.current == $slug][0] {
      _id, title, slug, excerpt, author, publishedAt,
      category->{ title, slug },
      featuredImage, body,
      agents[]->{ _id, title, slug, shortDescription },
      connectors[]->{ _id, title, slug, shortDescription }
    }`,
    { slug }
  );
}

// --- Categories ---

export async function getCategories(): Promise<Category[]> {
  if (!client) return [];
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id, title, slug, description
    }`
  );
}

// --- Pages ---

export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (!client) return null;
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      _id, title, slug, body
    }`,
    { slug }
  );
}
