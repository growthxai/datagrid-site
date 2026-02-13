"use client";

import Link from "next/link";
import { useState } from "react";
import BlueprintBg from "@/components/blueprint-bg";

export default function DownloadPage() {
  const [activePlatform, setActivePlatform] = useState<"mac" | "windows">("mac");

  return (
    <>
      {/* Hero — full-bleed, dramatic */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-[#0a0a0a]">
        {/* Radial gradient glow */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-30"
            style={{ background: "radial-gradient(ellipse, #4361EE 0%, transparent 70%)" }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-blue-400 tracking-wide mb-4">Desktop App</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.08]">
            Datagrid on your desktop
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
            Put AI Agents to work on your data, anytime. Native performance, instant access, always in sync.
          </p>

          {/* Platform toggle */}
          <div className="mt-10 inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setActivePlatform("mac")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activePlatform === "mac"
                  ? "bg-white text-[#0a0a0a] shadow-sm"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              macOS
            </button>
            <button
              onClick={() => setActivePlatform("windows")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activePlatform === "windows"
                  ? "bg-white text-[#0a0a0a] shadow-sm"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M3 3h8.5v8.5H3V3zm9.5 0H21v8.5h-8.5V3zM3 12.5h8.5V21H3v-8.5zm9.5 0H21V21h-8.5v-8.5z" />
              </svg>
              Windows
            </button>
          </div>

          {/* Download button */}
          <div className="mt-8">
            <Link
              href="#"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-medium rounded-2xl bg-white text-[#0a0a0a] hover:bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(67,97,238,0.3)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_12px_48px_rgba(67,97,238,0.4)] transition-all duration-300 ease-out"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download for {activePlatform === "mac" ? "macOS" : "Windows"}
            </Link>
          </div>

          <p className="mt-4 text-xs text-white/30">
            {activePlatform === "mac" ? "Requires macOS 12 or later" : "Requires Windows 10 or later"}
          </p>
        </div>

        {/* App window mockup */}
        <div className="relative mt-16 sm:mt-20 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_80px_-12px_rgba(67,97,238,0.25)]">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-white/5 text-xs text-white/30 font-mono">
                  app.datagrid.com
                </div>
              </div>
              <div className="w-12" />
            </div>
            {/* App content area */}
            <div className="bg-[#111] aspect-[16/9] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-blue-400">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm text-white/40 font-medium">Your agents, ready to work</p>
              </div>
            </div>
          </div>
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
              Everything you need, right here
            </h2>
            <p className="mt-3 text-base text-secondary max-w-xl mx-auto">
              The same powerful platform, built for your desktop.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                ),
                title: "Instant access",
                description: "Launch directly from your dock or taskbar. No browser tabs, no searching for the right URL.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                ),
                title: "Always in sync",
                description: "Automatically stays up to date with the latest web version. Your agents and data, always current.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-500">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
                title: "Native experience",
                description: "System notifications, keyboard shortcuts, and window management built for your OS.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-background p-6 hover:border-border hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out"
              >
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base font-medium text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-secondary leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform details */}
      <section className="py-16 sm:py-20 bg-surface/30 border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              Available on both platforms
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* macOS card */}
            <div className="rounded-2xl border border-border bg-background p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#0a0a0a] flex items-center justify-center mx-auto mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground">macOS</h3>
              <p className="text-sm text-secondary mt-1.5">Requires macOS 12 or later</p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-150"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </Link>
            </div>

            {/* Windows card */}
            <div className="rounded-2xl border border-border bg-background p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#0078d4] flex items-center justify-center mx-auto mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M3 3h8.5v8.5H3V3zm9.5 0H21v8.5h-8.5V3zM3 12.5h8.5V21H3v-8.5zm9.5 0H21V21h-8.5v-8.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground">Windows</h3>
              <p className="text-sm text-secondary mt-1.5">Requires Windows 10 or later</p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-150"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-tertiary">
            The Desktop App provides an installable version of our web application that automatically stays synced with the latest web version.
          </p>
        </div>
      </section>

      {/* Changelog */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground text-center mb-4">
            What&apos;s new
          </h2>
          <p className="text-sm text-secondary text-center mb-14">
            Every update brings improvements to make your experience better.
          </p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

            <div className="space-y-10">
              {[
                {
                  version: "1.0.5",
                  label: "Latest",
                  notes: [
                    "Fixed issue when selecting files/folders for a Sharepoint connection",
                    "Security improvements",
                  ],
                },
                {
                  version: "1.0.4",
                  notes: [
                    "Fixed issue when selecting files/folders for a Sharepoint connection",
                    "Windows: Properly resize the window when the taskbar is locked open",
                  ],
                },
                {
                  version: "1.0.3",
                  notes: [
                    "Tabs more accurately reflect the current page being displayed",
                    "Security updates",
                  ],
                },
                {
                  version: "1.0.2",
                  notes: [
                    "Removed the Bookmarks menu and the bookmark button from the title bar",
                    "Added a link to Datagrid Documentation in the Help menu",
                    "Windows build signed",
                  ],
                },
                {
                  version: "1.0.1",
                  notes: [
                    "Fixed connector authentication and Stripe access",
                    "Framework updated to Electron 36 for up-to-date security",
                  ],
                },
                {
                  version: "1.0.0",
                  label: "Launch",
                  notes: ["Launched Datagrid Desktop application"],
                },
              ].map((entry, i) => (
                <div key={entry.version} className="relative pl-8">
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${
                    i === 0
                      ? "border-accent bg-accent/10"
                      : "border-border bg-background"
                  }`} />

                  <div className="flex items-center gap-3 mb-2.5">
                    <h3 className="text-base font-medium text-foreground">
                      Version {entry.version}
                    </h3>
                    {entry.label && (
                      <span className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full ${
                        entry.label === "Latest"
                          ? "bg-accent/10 text-accent"
                          : "bg-surface text-secondary"
                      }`}>
                        {entry.label}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {entry.notes.map((note, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-secondary leading-relaxed">
                        <span className="shrink-0 mt-2 w-1 h-1 rounded-full bg-tertiary" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="relative py-20 sm:py-28 bg-[#f5f1ed] overflow-hidden">
        <div className="absolute inset-0">
          <BlueprintBg variant="agents" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-foreground leading-[1.15]">
            Build your first AI Agent in minutes
          </h2>
          <p className="mt-4 text-base text-secondary">
            Free to get started. No credit card required.
          </p>
          <div className="mt-8">
            <Link
              href="/get-started"
              className="inline-flex items-center px-8 py-3.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
