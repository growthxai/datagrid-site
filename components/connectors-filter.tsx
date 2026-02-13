"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HoverCard from "@/components/hover-card";
import { CONNECTOR_ICON } from "@/lib/nav-data";

type Connector = {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  agentCount?: number;
};

const CONNECTOR_CATEGORY: Record<string, string> = {
  /* Construction */
  "accubid-anywhere": "Construction",
  "archicad": "Construction",
  "autodesk-acc": "Construction",
  "bim-360-build": "Construction",
  "bim-track": "Construction",
  "bim360-docs": "Construction",
  "bluebeam": "Construction",
  "bridgit": "Construction",
  "buildingconnected": "Construction",
  "cmic": "Construction",
  "civil-3d": "Construction",
  "fieldwire": "Construction",
  "highwire": "Construction",
  "hilti-ontrack": "Construction",
  "navisworks": "Construction",
  "oracle-aconex": "Construction",
  "oracle-primavera-cloud-opc": "Construction",
  "p6-eppm": "Construction",
  "p6-primavera": "Construction",
  "plangrid": "Construction",
  "procore": "Construction",
  "remarcable": "Construction",
  "revit": "Construction",
  "revizto": "Construction",
  "riskcast": "Construction",
  "synchro-4d-pro": "Construction",
  "textura": "Construction",
  "tradetapp": "Construction",
  "trimble-connect": "Construction",
  /* Storage */
  "aws-timestream-integration": "Storage",
  "amazon-aws-s3": "Storage",
  "amazon-aurora": "Storage",
  "amazon-rds": "Storage",
  "amazon-redshift": "Storage",
  "azure-blob-storage": "Storage",
  "azure-data-lake-storage": "Storage",
  "azure-mysql-database": "Storage",
  "azure-postgresql-database": "Storage",
  "azure-sql-database": "Storage",
  "bigquery": "Storage",
  "box": "Storage",
  "dropbox": "Storage",
  "egnyte": "Storage",
  "google-cloud-sql-postgresql": "Storage",
  "google-cloud-sql-sql-server": "Storage",
  "google-cloud-storage": "Storage",
  "google-drive": "Storage",
  "jdbc-mysql": "Storage",
  "ms-sql-server": "Storage",
  "mariadb": "Storage",
  "mongodb": "Storage",
  "onedrive": "Storage",
  "postgresql": "Storage",
  "snowflake": "Storage",
  /* Projects */
  "asana": "Projects",
  "jira": "Projects",
  "microsoft-project": "Projects",
  "monday": "Projects",
  "quickbase": "Projects",
  "smartsheet": "Projects",
  /* Financial */
  "fred": "Financial",
  "quickbooks": "Financial",
  "sage-300-cre": "Financial",
  "sage-300-cloud": "Financial",
  "sage-intacct": "Financial",
  "stripe": "Financial",
  /* Marketing */
  "google-analytics": "Marketing",
  "linkedin-pages": "Marketing",
  "mixpanel": "Marketing",
  "outreach": "Marketing",
  "surveymonkey": "Marketing",
  /* ERP */
  "acumatica": "ERP",
  "ms-dynamics-365-nav": "ERP",
  "oracle-netsuite": "ERP",
  "sap-bw-4hana": "ERP",
  "sap-s-4hana": "ERP",
  /* CRM */
  "hubspot": "CRM",
  "intercom": "CRM",
  "salesforce": "CRM",
  /* Collaboration */
  "airtable": "Collaboration",
  "google-sheets": "Collaboration",
  "microsoft-excel": "Collaboration",
  "microsoft-teams": "Collaboration",
  "notion": "Collaboration",
  "slack": "Collaboration",
  /* E-commerce */
  "bigcommerce": "E-commerce",
  /* Documents */
  "docusign": "Documents",
  "hellosign": "Documents",
  "sharepoint": "Documents",
  /* DevOps */
  "gitlab": "DevOps",
  "github": "DevOps",
  "sentry": "DevOps",
  /* Translation */
  "emque": "Translation",
  /* Scheduling */
  "google-calendar": "Scheduling",
  /* Email Sync */
  "exchange": "Email Sync",
  "imap-email": "Email Sync",
  /* Customer Support */
  "freshdesk": "Customer Support",
  /* Data */
  "databricks": "Data",
  "ms-fabric": "Data",
  /* Web Development */
  "http-fetch": "Web Development",
};

type SortOption = "name-asc" | "name-desc" | "agents-desc" | "agents-asc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "agents-desc", label: "Most agents" },
  { value: "agents-asc", label: "Fewest agents" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
];

export default function ConnectorsFilter({
  connectors,
}: {
  connectors: Connector[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("agents-desc");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) setCategoryOpen(false);
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    connectors.forEach((c) => {
      const cat = CONNECTOR_CATEGORY[c.slug.current];
      if (cat) counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);
  }, [connectors]);

  const filtered = useMemo(() => {
    let result = [...connectors];

    if (activeCategory) {
      result = result.filter((c) => CONNECTOR_CATEGORY[c.slug.current] === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      switch (sort) {
        case "name-asc": return a.title.localeCompare(b.title);
        case "name-desc": return b.title.localeCompare(a.title);
        case "agents-desc": return (b.agentCount ?? 0) - (a.agentCount ?? 0);
        case "agents-asc": return (a.agentCount ?? 0) - (b.agentCount ?? 0);
      }
    });

    return result;
  }, [connectors, query, activeCategory, sort]);

  return (
    <>
      {/* Toolbar */}
      <div data-sticky-toolbar className="sticky top-[88px] z-40 bg-background py-3 flex items-center gap-3 mb-5">
        {/* Filter by Category */}
        <div ref={categoryRef} className="relative">
          <button
            onClick={() => { setCategoryOpen(!categoryOpen); setSortOpen(false); }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-150 ${
              activeCategory
                ? "border-accent/30 bg-accent/5 text-accent"
                : "border-border text-secondary hover:text-foreground hover:border-accent/30"
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="8" y2="18" />
            </svg>
            <span className="sm:hidden">Filter</span>
            <span className="hidden sm:inline">{activeCategory ?? "Filter by Category"}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {categoryOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-52 bg-background border border-border rounded-lg shadow-lg z-50 py-1">
              <button
                onClick={() => { setActiveCategory(null); setCategoryOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs transition-colors duration-100 ${
                  !activeCategory ? "text-accent font-medium" : "text-secondary hover:text-foreground hover:bg-surface"
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => { setActiveCategory(cat.label); setCategoryOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs transition-colors duration-100 ${
                    activeCategory === cat.label ? "text-accent font-medium" : "text-secondary hover:text-foreground hover:bg-surface"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-tertiary">{cat.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative flex-1 sm:flex-none sm:w-56">
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
            placeholder="Search by keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface border border-border rounded-full placeholder:text-secondary/50 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 focus:border-accent/30 transition-colors duration-150"
          />
        </div>

        {/* Right side: count + sort */}
        <div className="hidden sm:flex ml-auto items-center gap-3">
          <span className="text-xs text-secondary py-1.5">
            Showing {filtered.length}
          </span>

          {/* Sort by */}
          <div ref={sortRef} className="relative">
            <button
              onClick={() => { setSortOpen(!sortOpen); setCategoryOpen(false); }}
              className="inline-flex items-center gap-1 py-1.5 text-xs font-medium text-foreground hover:text-accent transition-colors duration-150"
            >
              Sort by
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-40 bg-background border border-border rounded-lg shadow-lg z-50 py-1">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setSortOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors duration-100 ${
                      sort === opt.value ? "text-accent font-medium" : "text-secondary hover:text-foreground hover:bg-surface"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connector card grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-secondary">No connectors match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((connector) => {
            const icon = CONNECTOR_ICON[connector.slug.current];
            const agentCount = connector.agentCount;
            return (
              <HoverCard key={connector._id}>
                <Link
                  href={`/connectors/${connector.slug.current}`}
                  className="relative flex flex-col h-full p-6 bg-background rounded-2xl border border-border group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden transition-transform duration-300 ease-out group-hover/card:-translate-x-[2px] group-hover/card:-translate-y-[2px]">
                      {icon ? (
                        <Image
                          src={icon}
                          alt={connector.title}
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain"
                        />
                      ) : (
                        <span className="text-sm font-medium text-accent">
                          {connector.title.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <h2 className="text-lg font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px]">
                    {connector.title}
                  </h2>
                  <p className="text-sm text-secondary line-clamp-2 transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                    {connector.shortDescription}
                  </p>
                  {agentCount != null && (
                    <div className="mt-auto pt-5 flex items-center justify-end transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                      <span className="text-sm font-medium inline-flex items-center use-agent-shimmer">
                        {agentCount} {agentCount === 1 ? "agent" : "agents"} available
                        <span className="inline-flex items-center w-3.5 ml-1.5 overflow-hidden">
                          <span className="w-0 group-hover/card:w-[5px] h-[1.5px] bg-current rounded-full transition-[width] duration-200 ease-out shrink-0" />
                          <svg width="7" height="10" viewBox="0 0 7 10" fill="none" className="shrink-0">
                            <path d="M1.5 1L5.5 5L1.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  )}
                </Link>
              </HoverCard>
            );
          })}
        </div>
      )}
    </>
  );
}
