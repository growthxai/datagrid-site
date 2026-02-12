"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HoverCard from "@/components/hover-card";

type Agent = {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  category?: { title: string; slug: { current: string } };
  status?: string;
  connectors?: { _id: string; title: string; slug: { current: string } }[];
};

type Category = {
  _id: string;
  title: string;
  slug: { current: string };
};

const ROLES = [
  "Project Manager",
  "Project Engineer",
  "Estimator",
  "Quality Manager",
  "Submittal Coordinator",
  "Subcontractor",
  "Operations Manager",
  "Superintendent",
  "Project Executive",
  "Facilities Manager",
  "QC Manager",
  "Architect",
  "Field Superintendent",
  "Design Manager",
  "Project Administrator",
  "Contract Administrator",
  "Safety Director",
  "Safety Manager",
  "Senior Project Manager",
  "Engineering Lead",
] as const;

const TASKS = [
  "Submittal Review",
  "RFI Research",
  "Change Order Backup",
  "Document Search",
  "Drawing Comparison",
  "Safety Inspection",
  "Compliance Audit",
  "Daily Reporting",
  "Scope Validation",
  "Prequalification",
  "Owner Meeting Prep",
] as const;

const AGENT_ROLES: Record<string, string[]> = {
  "deep-search": ["Project Manager", "Senior Project Manager", "Operations Manager"],
  "summary-spec-submittal": ["Project Engineer", "Submittal Coordinator", "Subcontractor"],
  "document-comparison": ["Project Manager", "Quality Manager", "Architect", "Design Manager", "Engineering Lead"],
  "rfi-validator": ["Project Engineer", "Subcontractor", "Design Manager", "Engineering Lead"],
  "submittal-builder": ["Project Engineer", "Submittal Coordinator", "Subcontractor", "Project Administrator"],
  "scope-checker": ["Estimator", "Project Executive", "Contract Administrator", "Senior Project Manager", "Project Manager"],
  "sop-agent": ["Quality Manager", "Operations Manager", "Facilities Manager", "QC Manager", "Safety Director", "Safety Manager"],
  "site-safety": ["Superintendent", "Field Superintendent", "Safety Director", "Safety Manager", "QC Manager", "Facilities Manager"],
  "deep-dive-spec-submittal": ["Project Engineer", "Submittal Coordinator", "Quality Manager"],
  "rfi-checker": ["Project Engineer", "Subcontractor", "Project Administrator"],
  "mentor-agent": ["Superintendent", "Field Superintendent", "Operations Manager"],
  "pre-qualification": ["Estimator", "Subcontractor", "Project Administrator"],
  "fast-ai-search": ["Project Manager", "Project Engineer", "Operations Manager"],
  "daily-report": ["Superintendent", "Field Superintendent", "Project Manager", "Project Administrator", "Operations Manager"],
  "change-order": ["Project Manager", "Estimator", "Contract Administrator"],
  "change-analyser": ["Project Manager", "Project Executive", "Contract Administrator", "Senior Project Manager"],
  "audit-agent": ["Quality Manager", "QC Manager", "Project Executive", "Safety Director", "Senior Project Manager"],
  "single-line-drawings-expert": ["Architect", "Design Manager", "Engineering Lead"],
};

const AGENT_TASKS: Record<string, string[]> = {
  "deep-search": ["Document Search", "Owner Meeting Prep"],
  "summary-spec-submittal": ["Submittal Review"],
  "document-comparison": ["Drawing Comparison"],
  "rfi-validator": ["RFI Research"],
  "submittal-builder": ["Submittal Review"],
  "scope-checker": ["Scope Validation"],
  "sop-agent": ["Compliance Audit"],
  "site-safety": ["Safety Inspection"],
  "deep-dive-spec-submittal": ["Submittal Review"],
  "rfi-checker": ["RFI Research"],
  "mentor-agent": ["Owner Meeting Prep"],
  "pre-qualification": ["Prequalification"],
  "fast-ai-search": ["Document Search"],
  "daily-report": ["Daily Reporting", "Owner Meeting Prep"],
  "change-order": ["Change Order Backup"],
  "change-analyser": ["Change Order Backup", "Owner Meeting Prep"],
  "audit-agent": ["Compliance Audit"],
  "single-line-drawings-expert": ["Drawing Comparison"],
};

const AGENT_ICONS: Record<string, { bg: string; border: string; color: string; icon: string }> = {
  "deep-search": { bg: "bg-violet-50", border: "border-violet-200", color: "text-violet-500", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  "summary-spec-submittal": { bg: "bg-blue-50", border: "border-blue-200", color: "text-blue-500", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  "document-comparison": { bg: "bg-indigo-50", border: "border-indigo-200", color: "text-indigo-500", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
  "rfi-validator": { bg: "bg-amber-50", border: "border-amber-200", color: "text-amber-500", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  "submittal-builder": { bg: "bg-emerald-50", border: "border-emerald-200", color: "text-emerald-500", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  "scope-checker": { bg: "bg-orange-50", border: "border-orange-200", color: "text-orange-500", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  "sop-agent": { bg: "bg-yellow-50", border: "border-yellow-200", color: "text-yellow-600", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  "site-safety": { bg: "bg-rose-50", border: "border-rose-200", color: "text-rose-500", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  "deep-dive-spec-submittal": { bg: "bg-sky-50", border: "border-sky-200", color: "text-sky-500", icon: "M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" },
  "rfi-checker": { bg: "bg-teal-50", border: "border-teal-200", color: "text-teal-500", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" },
  "mentor-agent": { bg: "bg-pink-50", border: "border-pink-200", color: "text-pink-500", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  "pre-qualification": { bg: "bg-lime-50", border: "border-lime-200", color: "text-lime-600", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  "fast-ai-search": { bg: "bg-fuchsia-50", border: "border-fuchsia-200", color: "text-fuchsia-500", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  "daily-report": { bg: "bg-cyan-50", border: "border-cyan-200", color: "text-cyan-500", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
  "change-order": { bg: "bg-violet-50", border: "border-violet-200", color: "text-violet-500", icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" },
  "change-analyser": { bg: "bg-blue-50", border: "border-blue-200", color: "text-blue-500", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
  "audit-agent": { bg: "bg-red-50", border: "border-red-200", color: "text-red-500", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  "single-line-drawings-expert": { bg: "bg-amber-50", border: "border-amber-200", color: "text-amber-500", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
};

const CONNECTOR_ICON: Record<string, string> = {
  procore: "/logos/icons/procore.svg",
  plangrid: "/logos/icons/plangrid.svg",
  "autodesk-build": "/logos/icons/autodesk.svg",
  bluebeam: "/logos/icons/bluebeam.svg",
  "sage-300-cre": "/logos/icons/sage.svg",
  "microsoft-project": "/logos/icons/microsoft-project.svg",
  "google-drive": "/logos/icons/google-drive.svg",
  notion: "/logos/icons/notion.svg",
};

export default function AgentsFilter({
  agents,
  categories,
}: {
  agents: Agent[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const filterCount = selectedRoles.size + selectedTasks.size;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    if (filterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [filterOpen]);

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) => {
      const next = new Set(prev);
      next.has(role) ? next.delete(role) : next.add(role);
      return next;
    });
  };

  const toggleTask = (task: string) => {
    setSelectedTasks((prev) => {
      const next = new Set(prev);
      next.has(task) ? next.delete(task) : next.add(task);
      return next;
    });
  };

  const hasAnyFilter = query || activeCategory || filterCount > 0;

  const clearAll = () => {
    setQuery("");
    setActiveCategory(null);
    setSelectedRoles(new Set());
    setSelectedTasks(new Set());
  };

  const filtered = useMemo(() => {
    let result = agents;

    if (activeCategory) {
      result = result.filter(
        (a) => a.category?.slug.current === activeCategory
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.shortDescription.toLowerCase().includes(q) ||
          a.category?.title.toLowerCase().includes(q)
      );
    }

    if (selectedRoles.size > 0) {
      result = result.filter((a) => {
        const agentRoles = AGENT_ROLES[a.slug.current] ?? [];
        return agentRoles.some((r) => selectedRoles.has(r));
      });
    }

    if (selectedTasks.size > 0) {
      result = result.filter((a) => {
        const agentTasks = AGENT_TASKS[a.slug.current] ?? [];
        return agentTasks.some((t) => selectedTasks.has(t));
      });
    }

    return result;
  }, [agents, query, activeCategory, selectedRoles, selectedTasks]);

  return (
    <>
      {/* Search + filter + category pills — single row */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative w-56">
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
            placeholder="Search agents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface border border-border rounded-full placeholder:text-secondary/50 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 focus:border-accent/30 transition-colors duration-150"
          />
        </div>

        {/* Filter button + dropdown */}
        <div ref={filterRef} className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-150 ${
              filterCount > 0
                ? "border-accent/30 bg-accent/5 text-accent"
                : "border-border text-secondary hover:text-foreground hover:border-accent/30"
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            Filter
            {filterCount > 0 && (
              <span className="ml-0.5 inline-flex items-center justify-center w-4 h-4 text-[10px] font-semibold rounded-full bg-accent text-accent-foreground">
                {filterCount}
              </span>
            )}
          </button>

          {filterOpen && (
            <div className="absolute left-0 top-full mt-2 w-[26rem] bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-foreground">Filter by</span>
                  {filterCount > 0 && (
                    <button
                      onClick={() => {
                        setSelectedRoles(new Set());
                        setSelectedTasks(new Set());
                      }}
                      className="text-xs text-secondary hover:text-foreground transition-colors duration-150"
                    >
                      Clear filters
                    </button>
                  )}
                </div>

                {/* Role section */}
                <div className="mb-4">
                  <p className="text-[11px] font-medium tracking-wide uppercase text-secondary/70 mb-2">Role</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ROLES.map((role) => (
                      <button
                        key={role}
                        onClick={() => toggleRole(role)}
                        className={`px-2.5 py-1 text-xs rounded-full transition-all duration-150 ${
                          selectedRoles.has(role)
                            ? "bg-accent text-accent-foreground"
                            : "border border-border text-secondary hover:text-foreground hover:border-accent/30"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Task section */}
                <div>
                  <p className="text-[11px] font-medium tracking-wide uppercase text-secondary/70 mb-2">Task</p>
                  <div className="flex flex-wrap gap-1.5">
                    {TASKS.map((task) => (
                      <button
                        key={task}
                        onClick={() => toggleTask(task)}
                        className={`px-2.5 py-1 text-xs rounded-full transition-all duration-150 ${
                          selectedTasks.has(task)
                            ? "bg-accent text-accent-foreground"
                            : "border border-border text-secondary hover:text-foreground hover:border-accent/30"
                        }`}
                      >
                        {task}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-border" />

        {/* Category pills */}
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ease-out ${
            activeCategory === null
              ? "bg-accent text-accent-foreground shadow-sm"
              : "border border-border text-secondary hover:text-foreground hover:border-accent/30 hover:shadow-sm"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() =>
              setActiveCategory(
                activeCategory === cat.slug.current ? null : cat.slug.current
              )
            }
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ease-out ${
              activeCategory === cat.slug.current
                ? "bg-accent text-accent-foreground shadow-sm"
                : "border border-border text-secondary hover:text-foreground hover:border-accent/30 hover:shadow-sm"
            }`}
          >
            {cat.title}
          </button>
        ))}

        {hasAnyFilter && (
          <button
            onClick={clearAll}
            className="text-xs text-secondary hover:text-foreground transition-colors duration-150 ml-1"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active filter pills */}
      {filterCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          {[...selectedRoles].map((role) => (
            <button
              key={role}
              onClick={() => toggleRole(role)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors duration-150"
            >
              {role}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          ))}
          {[...selectedTasks].map((task) => (
            <button
              key={task}
              onClick={() => toggleTask(task)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors duration-150"
            >
              {task}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          ))}
        </div>
      )}

      {/* Agent card grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-secondary">
            No agents match your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((agent) => {
            const iconData = AGENT_ICONS[agent.slug.current];
            return (
              <HoverCard key={agent._id}>
                <Link
                  href={`/agents/${agent.slug.current}`}
                  className="relative flex flex-col h-full p-6 bg-background rounded-2xl border border-border group-hover/card:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`shrink-0 w-10 h-10 rounded-lg border ${iconData?.bg || "bg-accent/5"} ${iconData?.border || "border-accent/10"} flex items-center justify-center transition-transform duration-300 ease-out group-hover/card:-translate-x-[2px] group-hover/card:-translate-y-[2px]`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={iconData?.color || "text-accent"}
                      >
                        <path
                          d={
                            iconData?.icon ||
                            "M13 10V3L4 14h7v7l9-11h-7z"
                          }
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 transition-transform duration-300 ease-out group-hover/card:translate-x-[2px] group-hover/card:-translate-y-[2px]">
                      {agent.status === "coming-soon" && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                          Coming Soon
                        </span>
                      )}
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface text-secondary">
                        {agent.category?.title}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[2px]">
                    {agent.title}
                  </h3>
                  <p className="mt-1 text-sm text-secondary line-clamp-2 transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                    {agent.shortDescription}
                  </p>
                  <div className="mt-auto pt-5 flex items-center justify-between transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
                    <div className="flex items-center gap-1">
                      {(agent.connectors ?? []).map((c) => {
                        const icon = CONNECTOR_ICON[c.slug.current];
                        if (!icon) return null;
                        return (
                          <span
                            key={c._id}
                            title={c.title}
                            className="w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden"
                          >
                            <Image
                              src={icon}
                              alt={c.title}
                              width={14}
                              height={14}
                              className="w-[14px] h-[14px] object-contain grayscale group-hover/card:grayscale-0 transition-[filter] duration-300 ease-out"
                            />
                          </span>
                        );
                      })}
                    </div>
                    <span className="text-sm font-medium inline-flex items-center use-agent-shimmer transition-all duration-150">
                      <span className="text-accent opacity-40 group-hover/card:opacity-100 transition-opacity duration-150">Use Agent</span>
                      <span className="inline-flex items-center w-3.5 ml-1.5 overflow-hidden text-accent opacity-60 group-hover/card:opacity-100 transition-opacity duration-150">
                        <span className="w-0 group-hover/card:w-[5px] h-[1.5px] bg-current rounded-full transition-[width] duration-200 ease-out shrink-0" />
                        <svg
                          width="7"
                          height="10"
                          viewBox="0 0 7 10"
                          fill="none"
                          className="shrink-0"
                        >
                          <path
                            d="M1.5 1L5.5 5L1.5 9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </span>
                  </div>
                </Link>
              </HoverCard>
            );
          })}
        </div>
      )}
    </>
  );
}
