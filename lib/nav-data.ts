/**
 * Shared icon maps for agents and connectors.
 * Used by nav mega-menus, homepage, agents-filter, and connectors-filter.
 */

export const AGENT_ICONS: Record<string, { bg: string; border: string; color: string; icon: string }> = {
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

export const CONNECTOR_ICON: Record<string, string> = {
  procore: "/logos/icons/procore.svg",
  plangrid: "/logos/icons/plangrid.svg",
  "autodesk-build": "/logos/icons/autodesk.svg",
  "autodesk-acc": "/logos/icons/autodesk.svg",
  bluebeam: "/logos/icons/bluebeam.svg",
  "sage-300-cre": "/logos/icons/sage.svg",
  "microsoft-project": "/logos/icons/microsoft-project.svg",
  sharepoint: "/logos/icons/sharepoint.svg",
  "oracle-aconex": "/logos/icons/oracle-aconex.svg",
  "p6-primavera": "/logos/icons/p6-primavera.svg",
  "trimble-connect": "/logos/icons/trimble-connect.svg",
  quickbase: "/logos/icons/quickbase.svg",
  "imap-email": "/logos/icons/imap-email.svg",
  slack: "/logos/icons/slack.svg",
  egnyte: "/logos/icons/egnyte.svg",
  quickbooks: "/logos/icons/quickbooks.svg",
  "google-drive": "/logos/icons/google-drive.svg",
  notion: "/logos/icons/notion.svg",
};
