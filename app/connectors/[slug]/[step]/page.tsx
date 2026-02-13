import Link from "next/link";
import { PLACEHOLDER_CONNECTORS } from "@/lib/placeholder-data";
import PageHeader from "@/components/page-header";
import HoverCard from "@/components/hover-card";
import type { Connector, SetupStep } from "@/lib/types";
import type { ReactNode } from "react";

type Props = { params: Promise<{ slug: string; step: string }> };

/* ------------------------------------------------------------------ */
/*  Screenshot placeholder                                            */
/* ------------------------------------------------------------------ */

function ScreenshotPlaceholder({ caption }: { caption: string }) {
  return (
    <figure className="my-6">
      <div className="aspect-[16/9] rounded-xl border border-border bg-surface/50 flex flex-col items-center justify-center gap-3">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-tertiary/40">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs text-tertiary">Screenshot placeholder</span>
      </div>
      <figcaption className="mt-2 text-xs text-tertiary text-center">{caption}</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Set Up a Schedule guide                                           */
/* ------------------------------------------------------------------ */

function ScheduleGuide() {
  return (
    <>
      <section id="sched-1" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">1. Edit Pipeline</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>
            Open the overflow menu <strong className="text-foreground">&quot;...&quot;</strong> and select <strong className="text-foreground">&quot;Edit&quot;</strong>.
          </p>
          <ScreenshotPlaceholder caption="Opening the pipeline overflow menu and selecting Edit" />
        </div>
      </section>

      <section id="sched-2" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">2. Schedule Pipeline</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>
            Hover the <strong className="text-foreground">&quot;Schedule&quot;</strong> box and select <strong className="text-foreground">&quot;Schedule&quot;</strong>.
          </p>
          <ScreenshotPlaceholder caption="Hovering the Schedule box to open scheduling options" />
          <p>Configure the schedule to your preference.</p>
          <ScreenshotPlaceholder caption="Schedule configuration options" />
          <p>
            Press <strong className="text-foreground">&quot;Update&quot;</strong> whenever you are done setting up your schedule.
          </p>
          <ScreenshotPlaceholder caption="Pressing Update to save the schedule" />
          <p>Now, you know how to set up a schedule!</p>
          <ScreenshotPlaceholder caption="Schedule successfully configured" />
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Create a Dataset guide                                            */
/* ------------------------------------------------------------------ */

function DatasetGuide() {
  return (
    <>
      <p className="text-base text-secondary leading-relaxed mb-8">
        How to create a Dataset from an existing Pipeline.
      </p>

      <section id="ds-1" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">Step 1</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>Log in to your Datagrid account.</p>
          <ScreenshotPlaceholder caption="Datagrid login screen" />
        </div>
      </section>

      <section id="ds-2" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">Step 2</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>Search for the Procore connector.</p>
          <ScreenshotPlaceholder caption="Searching for the Procore connector" />
          <ScreenshotPlaceholder caption="Procore connector selected" />
        </div>
      </section>

      <section id="ds-3" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">Step 3</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>Choose an existing pipeline.</p>
          <ScreenshotPlaceholder caption="Viewing available pipelines" />
          <ScreenshotPlaceholder caption="Selecting a pipeline to create a dataset from" />
          <ScreenshotPlaceholder caption="Dataset created from selected pipeline" />
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Step content registry                                             */
/* ------------------------------------------------------------------ */

const STEP_CONTENT: Record<string, Record<string, () => ReactNode>> = {
  procore: {
    "set-up-a-schedule": () => <ScheduleGuide />,
    "create-a-dataset": () => <DatasetGuide />,
  },
};

type TocEntry = { id: string; label: string };

const STEP_TOC: Record<string, Record<string, TocEntry[]>> = {
  procore: {
    "set-up-a-schedule": [
      { id: "sched-1", label: "Edit Pipeline" },
      { id: "sched-2", label: "Schedule Pipeline" },
    ],
    "create-a-dataset": [
      { id: "ds-1", label: "Log in to Datagrid" },
      { id: "ds-2", label: "Search for Connector" },
      { id: "ds-3", label: "Choose a Pipeline" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export async function generateMetadata({ params }: Props) {
  const { slug, step: stepSlug } = await params;
  const connector = PLACEHOLDER_CONNECTORS.find((c) => c.slug.current === slug) as (Connector & { setupSteps?: SetupStep[] }) | undefined;
  const step = connector?.setupSteps?.find((s) => s.slug === stepSlug);
  return {
    title: step ? `${step.title} — ${connector?.title}` : "Setup",
    description: step?.subtitle || `Setup guide for ${connector?.title || "connector"}.`,
  };
}

export default async function ConnectorStepPage({ params }: Props) {
  const { slug, step: stepSlug } = await params;
  const connector = (PLACEHOLDER_CONNECTORS.find((c) => c.slug.current === slug) || PLACEHOLDER_CONNECTORS[0]) as Connector & { setupSteps?: SetupStep[] };
  const step = connector.setupSteps?.find((s) => s.slug === stepSlug) || connector.setupSteps?.[0];

  if (!step) {
    return (
      <div className="py-32 text-center">
        <p className="text-secondary">Setup step not found.</p>
        <Link href={`/connectors/${slug}`} className="text-accent hover:underline text-sm mt-2 inline-block">
          Back to {connector.title}
        </Link>
      </div>
    );
  }

  const StepContent = STEP_CONTENT[slug]?.[stepSlug];
  const toc = STEP_TOC[slug]?.[stepSlug];
  const otherSteps = connector.setupSteps?.filter((s) => s.slug !== stepSlug);

  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Product", href: "/product" },
          { label: "Connectors", href: "/connectors" },
          { label: connector.title, href: `/connectors/${slug}` },
          { label: step.title },
        ]}
        title={step.title}
        description={step.subtitle || `${connector.title} setup guide`}
        variant="connectors"
        heroBg="white"
        eyebrow="How-to"
        headerRight={
          <div className="hidden sm:flex shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-accent/5 border border-accent/10 items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="lg:w-11 lg:h-11 text-accent">
              <path d={step.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        }
      />

      <div className="pb-14 sm:pb-18 lg:pb-22 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-10 lg:gap-14">
            {/* Main content */}
            <div className="min-w-0 flex-1 max-w-3xl">
              {StepContent ? (
                <StepContent />
              ) : step.items && step.items.length > 0 ? (
                <section>
                  <p className="text-xs font-medium text-tertiary mb-4">How-To</p>
                  <div className="space-y-3">
                    {step.items.map((item) => (
                      <HoverCard key={item.slug}>
                        <Link
                          href={`/connectors/${slug}/${stepSlug}/${item.slug}`}
                          className="group relative flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:shadow-[0_2px_2px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
                        >
                          <div className="shrink-0 w-9 h-9 rounded-lg bg-accent/5 border border-accent/10 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent">
                              <path d={step.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-foreground group-hover/card:text-accent transition-all duration-300 ease-out group-hover/card:-translate-x-[1px]">
                            {item.title}
                          </p>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-auto text-tertiary group-hover/card:text-accent transition-colors duration-300 shrink-0">
                            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </HoverCard>
                    ))}
                  </div>
                </section>
              ) : (
                <p className="text-base text-secondary">Detailed guide content coming soon.</p>
              )}

              <div className="mt-10 pt-8 border-t border-border">
                <Link
                  href={`/connectors/${slug}`}
                  className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="rotate-180">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back to {connector.title}
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            {(toc || otherSteps) && (
              <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
                <div className="sticky top-[154px] space-y-8">
                  {toc && toc.length > 0 && (
                    <div className="p-4 rounded-xl border border-border bg-background">
                      <p className="text-xs font-medium text-tertiary mb-3">On this page</p>
                      <ol className="space-y-1.5 text-sm text-secondary list-none">
                        {toc.map((entry, i) => (
                          <li key={entry.id}>
                            <a href={`#${entry.id}`} className="hover:text-accent transition-colors duration-150">
                              {i + 1}. {entry.label}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {otherSteps && otherSteps.length > 0 && (
                    <div className="p-4 rounded-xl border border-border bg-background">
                      <p className="text-xs font-medium text-tertiary mb-3">Other Setup Guides</p>
                      <ul className="space-y-2 list-none">
                        {otherSteps.map((other) => (
                          <li key={other.slug}>
                            <Link
                              href={`/connectors/${slug}/${other.slug}`}
                              className="text-sm text-secondary hover:text-accent transition-colors duration-150"
                            >
                              {other.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
