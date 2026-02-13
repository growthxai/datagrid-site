"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import PageHeader from "@/components/page-header";
import BlueprintBg from "@/components/blueprint-bg";

/* ------------------------------------------------------------------ */
/*  Feature comparison data                                           */
/* ------------------------------------------------------------------ */

type FeatureRow = {
  feature: string;
  description?: string;
  free: string;
  pro: string;
  enterprise: string;
};

type FeatureSection = {
  section: string;
  rows: FeatureRow[];
};

const COMPARISON: FeatureSection[] = [
  {
    section: "Core Features",
    rows: [
      { feature: "Sync Frequency", free: "Daily", pro: "Hourly", enterprise: "15m" },
      { feature: "AI Columns", free: "check", pro: "check", enterprise: "check" },
      { feature: "Web Scraping", free: "check", pro: "check", enterprise: "check" },
      { feature: "Transforms", free: "check", pro: "check", enterprise: "check" },
      { feature: "Export to CSV, Excel, PDF", free: "check", pro: "check", enterprise: "check" },
    ],
  },
  {
    section: "AI Assistants",
    rows: [
      { feature: "AI Assistants", free: "Unlimited", pro: "Unlimited", enterprise: "Unlimited" },
    ],
  },
  {
    section: "Data Processing",
    rows: [
      {
        feature: "Unstructured files",
        description: "Images, XER schedules, and other unstructured formats like PDFs, XLSX, PPT and DOCX",
        free: "check",
        pro: "check",
        enterprise: "check",
      },
      { feature: "Larger file support", free: "\u2014", pro: "Up to 200 MB per file", enterprise: "Up to 300 MB per file" },
      { feature: "Comms", free: "\u2014", pro: "Slack + Teams", enterprise: "+SMS" },
      { feature: "Integration Packs", free: "Basic", pro: "Core (50+ connectors)", enterprise: "Expanded (100+ connectors including ERPs & Financials Pack)" },
      { feature: "Video/Audio Processing", free: "\u2014", pro: "\u2014", enterprise: "Up to 2 GB video or audio per file" },
    ],
  },
  {
    section: "Data Management",
    rows: [
      { feature: "SQL Access", free: "\u2014", pro: "\u2014", enterprise: "check" },
      { feature: "BI Connection", free: "\u2014", pro: "\u2014", enterprise: "PowerBI, Tableau, Looker" },
      { feature: "Sheets/Excel Connector", free: "\u2014", pro: "\u2014", enterprise: "Load Datagrid in Excel or Google Sheets" },
    ],
  },
  {
    section: "Support",
    rows: [
      { feature: "Support Level", free: "Email", pro: "+ Live Support", enterprise: "+ Hands-On Dedicated" },
    ],
  },
  {
    section: "User Management",
    rows: [
      { feature: "Number of users", free: "Unlimited", pro: "Unlimited", enterprise: "Unlimited" },
      { feature: "Reporting", free: "\u2014", pro: "\u2014", enterprise: "Credit Usage, Reports and Usage Dashboard" },
      { feature: "Cross Teamspace Management", free: "\u2014", pro: "\u2014", enterprise: "check" },
      { feature: "Teamspaces", free: "1", pro: "1", enterprise: "Unlimited" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Flatten rows for rendering                                        */
/* ------------------------------------------------------------------ */

type FlatRow =
  | { type: "section"; label: string }
  | { type: "feature"; data: FeatureRow };

function flattenComparison(): FlatRow[] {
  const out: FlatRow[] = [];
  for (const section of COMPARISON) {
    out.push({ type: "section", label: section.section });
    for (const row of section.rows) {
      out.push({ type: "feature", data: row });
    }
  }
  return out;
}

const FLAT_ROWS = flattenComparison();

/* ------------------------------------------------------------------ */
/*  Cell renderer                                                     */
/* ------------------------------------------------------------------ */

function CellValue({ value }: { value: string }) {
  if (value === "check") {
    return (
      <svg className="mx-auto w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    );
  }
  if (value === "\u2014") {
    return <span className="text-tertiary">&mdash;</span>;
  }
  return <span>{value}</span>;
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

const PRO_TIERS: { credits: number; price: number | null }[] = [
  { credits: 1_000, price: 90 },
  { credits: 2_500, price: 210 },
  { credits: 5_000, price: 400 },
  { credits: 10_000, price: 750 },
  { credits: 25_000, price: 1_750 },
  { credits: 50_000, price: 3_250 },
  { credits: 75_000, price: 4_650 },
  { credits: 100_000, price: 5_900 },
  { credits: 125_000, price: 8_100 },
  { credits: 200_000, price: 12_500 },
  { credits: 300_000, price: 18_000 },
  { credits: 400_000, price: null },
];

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

const TESTIMONIALS = [
  {
    quote: "With Datagrid we are able to review 8 submittals in 1 hour. This would have taken a team of 4 people at least 8 hours if not more.",
    name: "Jacob Freitas",
    title: "Project Executive",
    company: "Level 10 Construction",
    avatar: "/testimonials/jacob-freitas.png",
  },
  {
    quote: "After seeing all the AI tools out there, Datagrid stood out as the easy to use and trust. We have it on 2 job sites and superintendents can find answers to questions in seconds, instead of hours.",
    name: "Paul Hedgepath",
    title: "Director of Technology",
    company: "MJ Harris",
    avatar: "/testimonials/paul-hedgepath.png",
  },
  {
    quote: "In specification review, timeframe, we\u2019ve had a 70% reduction. And I\u2019d say 90% information accuracy gain, where previously we would miss.",
    name: "Brad Klick",
    title: "Estimator",
    company: "Victaulic",
    avatar: "/testimonials/brad-klick.png",
  },
  {
    quote: "Buro is deploying Datagrid to help our designers and engineers resolve RFIs. We are on our way to reduce CA work by 50%.",
    name: "Alain Waha",
    title: "CTO",
    company: "Buro Happold",
    avatar: "/testimonials/alain-waha.png",
  },
  {
    quote: "Commodore is using Datagrid to generate RACI charts for project procedures. We like how it\u2019s completely customizable and it just does the job that would have taken us hours, it\u2019s amazing.",
    name: "Amanda Finnerty",
    title: "Director of Technology & Process Improvement",
    company: "Commodore Builders",
    avatar: "/testimonials/amanda-finnerty.png",
  },
  {
    quote: "Datagrid is revolutionary. I was able to do in 15 minutes what would have taken me one entire week. It can handle massive PDF files and complete a complex task that an entry level person couldn\u2019t. We are deploying it to our whole company.",
    name: "John Keenan",
    title: "Estimating Manager",
    company: "Crest Industries",
    avatar: "/testimonials/john-keenan.png",
  },
  {
    quote: "We build agents that navigate the web and collect 2000+ permits and city inspections every day. Datagrid powers our permitting data and accelerates time to value for our customers.",
    name: "John Andres",
    title: "CEO",
    company: "Provizual",
    avatar: "/testimonials/john-andres.png",
  },
  {
    quote: "We like that Datagrid is a true agentic AI platform and very customizable. We have it in two projects with Deep Search, Submittal and Scheduling. We plan to continue expanding it to more projects.",
    name: "Moez Jaffer",
    title: "CIO",
    company: "Grunley",
    avatar: "/testimonials/moez-jaffer.png",
  },
];

export default function PricingPage() {
  const [tierIndex, setTierIndex] = useState(0);
  const tier = PRO_TIERS[tierIndex];
  const carouselRef = useRef<HTMLDivElement>(null);

  const proCard = "border-l border-r border-accent/10 bg-accent/[0.02]";

  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Pricing" },
        ]}
        title="Intelligent automation that fits your budget"
        description="Flexible pricing options for teams of every size and complexity."
        variant="agents"
        heroBg="white"
        centered
      />

      <div className="pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Unified Plan Picker ── */}
        <div className="mb-24">
          {/* Plan headers */}
          <div className="grid grid-cols-[240px_1fr_1fr_1fr] items-end">
            <div />

            {/* Free */}
            <div className="px-6 pb-8 flex flex-col">
              <h2 className="text-2xl font-medium text-foreground">Free</h2>
              <p className="text-sm text-secondary mt-1">Explore Datagrid AI</p>
              <div className="mt-5 border-t border-border pt-5">
                <div className="flex items-baseline">
                  <span className="text-4xl font-medium text-foreground">$0</span>
                  <span className="ml-1 text-sm text-secondary">/mo</span>
                </div>
              </div>
              <div className="flex-1" />
              <Link
                href="/get-started"
                className="mt-6 block w-full text-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-surface transition-all duration-200 ease-out"
              >
                Start in Minutes
              </Link>
            </div>

            {/* Pro */}
            <div className="px-6 pb-8 pt-8 rounded-t-2xl border-t border-l border-r border-accent/10 bg-accent/[0.02] flex flex-col">
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-medium text-foreground">Pro</h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-accent/10 text-accent border border-accent/20">
                  Most Popular
                </span>
              </div>
              <p className="text-sm text-secondary mt-1">Leverage the full power of AI</p>
              <div className="mt-5 border-t border-accent/10 pt-5">
                {tier.price != null ? (
                  <div className="flex items-baseline">
                    <span className="text-4xl font-medium text-foreground">${formatNumber(tier.price)}</span>
                    <span className="ml-1 text-sm text-secondary">/mo</span>
                  </div>
                ) : (
                  <p className="text-2xl font-medium text-foreground">Talk to sales</p>
                )}
                <input
                  type="range"
                  min={0}
                  max={PRO_TIERS.length - 1}
                  step={1}
                  value={tierIndex}
                  onChange={(e) => setTierIndex(Number(e.target.value))}
                  className="mt-4 w-full h-1.5 rounded-full appearance-none bg-border accent-accent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-sm"
                />
                <p className="text-xs text-tertiary mt-2">{formatNumber(tier.credits)} credits</p>
              </div>
              <div className="flex-1" />
              <Link
                href={tier.price != null ? "/get-started" : "/demo"}
                className="mt-6 block w-full text-center px-5 py-2.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover transition-all duration-200 ease-out"
              >
                {tier.price != null ? "Choose This Plan" : "Talk to sales"}
              </Link>
            </div>

            {/* Enterprise */}
            <div className="px-6 pb-8 flex flex-col">
              <h2 className="text-2xl font-medium text-foreground">Enterprise</h2>
              <p className="text-sm text-secondary mt-1">Tailored for your needs</p>
              <div className="mt-5 border-t border-border pt-5">
                <p className="text-lg font-medium text-foreground">Custom Pricing</p>
                <p className="text-sm text-secondary mt-0.5">with Premium Credits</p>
              </div>
              <div className="flex-1" />
              <Link
                href="/demo"
                className="mt-6 block w-full text-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-surface transition-all duration-200 ease-out"
              >
                Talk to Sales
              </Link>
            </div>
          </div>

          {/* Feature comparison rows */}
          <div className="grid grid-cols-[240px_1fr_1fr_1fr]">
            {FLAT_ROWS.map((row, i) => {
              if (row.type === "section") {
                return (
                  <div key={`s-${row.label}`} className="col-span-4 grid grid-cols-subgrid">
                    <div className="py-3.5 px-1">
                      <span className="text-sm font-semibold text-foreground">{row.label}</span>
                    </div>
                    <div className="py-3.5" />
                    <div className={`py-3.5 ${proCard}`} />
                    <div className="py-3.5" />
                  </div>
                );
              }

              const d = row.data;
              const isLast = i === FLAT_ROWS.length - 1;

              return (
                <div key={d.feature} className="col-span-4 grid grid-cols-subgrid border-t border-border/60">
                  <div className="py-3 px-1">
                    <span className="text-sm text-secondary">{d.feature}</span>
                    {d.description && (
                      <p className="text-xs text-tertiary mt-0.5 max-w-[260px]">{d.description}</p>
                    )}
                  </div>
                  <div className="py-3 text-center text-sm text-secondary">
                    <CellValue value={d.free} />
                  </div>
                  <div className={`py-3 text-center text-sm text-foreground font-medium ${proCard}`}>
                    <CellValue value={d.pro} />
                  </div>
                  <div className="py-3 text-center text-sm text-secondary">
                    <CellValue value={d.enterprise} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTAs */}
          <div className="grid grid-cols-[240px_1fr_1fr_1fr]">
            <div />
            <div className="py-6 px-6">
              <Link
                href="/get-started"
                className="block w-full text-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-surface transition-all duration-200 ease-out"
              >
                Start in Minutes
              </Link>
            </div>
            <div className={`py-6 px-6 rounded-b-2xl border-b ${proCard}`}>
              <Link
                href="/get-started"
                className="block w-full text-center px-5 py-2.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover transition-all duration-200 ease-out"
              >
                Choose This Plan
              </Link>
            </div>
            <div className="py-6 px-6">
              <Link
                href="/demo"
                className="block w-full text-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-surface transition-all duration-200 ease-out"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>

        {/* ── Enterprise Ready to Scale ── */}
        <section className="relative mt-16 rounded-2xl bg-[#f5f1ed] overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="absolute inset-0">
            <BlueprintBg variant="connectors" />
          </div>
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
            <div className="flex-1">
              <p className="text-xs font-medium text-[#a29080] mb-3">Enterprise</p>
              <h2 className="text-2xl sm:text-3xl font-medium text-foreground leading-[1.15]">
                Ready to scale?
              </h2>
              <p className="mt-3 text-sm text-secondary max-w-lg">
                Explore our enterprise solutions designed to grow with your business — custom task limits, dedicated support, and advanced security tailored to your needs.
              </p>
              <Link
                href="/demo"
                className="mt-6 inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-150"
              >
                Contact Sales
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 shrink-0">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-background/80 border border-border flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent">
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Custom Solutions</h3>
                  <p className="mt-1 text-xs text-secondary max-w-[180px]">
                    Personalized solutions for your unique requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-background/80 border border-border flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Dedicated Support</h3>
                  <p className="mt-1 text-xs text-secondary max-w-[180px]">
                    Our expert team assists you every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      </div>

      {/* ── Testimonials Carousel ── */}
      <section className="pt-12 sm:pt-14 pb-20 sm:pb-24 bg-background overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-medium text-foreground">
              What teams are saying
            </h2>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => carouselRef.current?.scrollBy({ left: -400, behavior: "smooth" })}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-secondary hover:text-foreground hover:border-accent/30 transition-colors duration-150"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => carouselRef.current?.scrollBy({ left: 400, behavior: "smooth" })}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-secondary hover:text-foreground hover:border-accent/30 transition-colors duration-150"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", marginRight: "calc(-1 * (100vw - 100%))", paddingRight: "max(1.5rem, calc((100vw - 100%) / 2))" }}
          >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="snap-start shrink-0 w-[340px] sm:w-[380px] flex flex-col justify-between p-7 rounded-2xl border border-border bg-background"
            >
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent/20 mb-4">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor" />
                </svg>
                <p className="text-base text-foreground leading-relaxed">
                  {t.quote}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border/60">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-tertiary">{t.title}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* ── Pre-footer CTA ── */}
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
              Signup Free
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
