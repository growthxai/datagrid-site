"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HoverCard from "@/components/hover-card";
import { AGENT_ICONS, CONNECTOR_ICON } from "@/lib/nav-data";

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
      {/* Filter + search + category pills — single row */}
      <div data-sticky-toolbar className="sticky top-[88px] z-40 bg-background py-3 flex items-center gap-3 mb-2 sm:flex-wrap">
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
            placeholder="Search agents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface border border-border rounded-full placeholder:text-secondary/50 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 focus:border-accent/30 transition-colors duration-150"
          />
        </div>

        {/* Divider — hidden on mobile */}
        <div className="hidden sm:block w-px h-5 bg-border" />

        {/* Category pills — hidden on mobile */}
        <button
          onClick={() => setActiveCategory(null)}
          className={`hidden sm:inline-flex px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ease-out ${
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
            className={`hidden sm:inline-flex px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ease-out ${
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
            className="hidden sm:inline-flex text-xs text-secondary hover:text-foreground transition-colors duration-150 ml-1"
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
                  <div className="mt-auto pt-5 flex items-center transition-transform duration-300 ease-out group-hover/card:-translate-x-[1px] group-hover/card:translate-y-[1px]">
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
                    <span className="ml-auto text-sm font-medium inline-flex items-center use-agent-shimmer">
                      Use Agent
                      <span className="inline-flex items-center w-3.5 ml-1.5 overflow-hidden">
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
