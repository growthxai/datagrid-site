import Link from "next/link";
import PageHeader from "@/components/page-header";
import BlueprintBg from "@/components/blueprint-bg";

export const metadata = {
  title: "Brand Assets | Datagrid",
  description: "Logos, colors, and guidelines to help you stay on brand and tell the Datagrid story.",
};

const COLORS = [
  { name: "Blue", label: "App Interaction", hex: "#4361EE", description: "The foundation of our interface, representing seamless interaction between you and the platform." },
  { name: "Green", label: "Actions", hex: "#2EC4B6", description: "Signifies cross-platform operations and automation that turn prompts into results." },
  { name: "Yellow", label: "Tools", hex: "#F4A261", description: "Represents interpretation and analysis\u200a\u2014\u200aprocessing text, deep searches, synthesizing information, and complex calculations." },
  { name: "Turquoise", label: "Knowledge", hex: "#48BFE3", description: "Represents the knowledge you build and bring to Datagrid. Confidence and decisions based on real data." },
];

const DONTS = [
  "Don\u2019t alter proportions \u2014 never stretch or squash the logo.",
  "Don\u2019t crowd the logo on busy graphics or photos that hurt legibility.",
  "Don\u2019t add outlines \u2014 the logo stands on its own.",
  "Don\u2019t create patterns with the logo or turn it into a pattern.",
  "Don\u2019t change colors \u2014 use only the official color palette.",
  "Don\u2019t double up \u2014 never combine the Logomark with the primary Logo.",
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-medium text-foreground mb-6">{children}</h2>;
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="aspect-[16/9] rounded-xl border border-border bg-surface/50 flex items-center justify-center">
      <span className="text-xs text-tertiary">{label}</span>
    </div>
  );
}

export default function BrandAssetsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Brand Assets" },
        ]}
        title="Brand Assets"
        description="Logos, colors, and guidelines to help you stay on brand and tell the Datagrid story."
        variant="agents"
        heroBg="white"
      />

      <div className="pb-16 sm:pb-20 lg:pb-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="#"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-150 mb-16"
          >
            Download Brand Assets
          </Link>

          {/* Logos */}
          <section className="mb-16">
            <SectionHeading>Logos</SectionHeading>
            <p className="text-sm text-secondary leading-relaxed mb-8">
              Our logo is the primary identifier of the Datagrid brand and a one-of-a-kind asset. To keep it looking its best, always use the official, high-quality brand asset files provided. Never alter the logo&apos;s shape or orientation&mdash;keep it horizontal at all times.
            </p>

            <h3 className="text-lg font-medium text-foreground mb-3">Horizontal Lockup</h3>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              The horizontal lockup is our official logo configuration. Our logo is best used in a horizontal layout&mdash;the Logomark and Wordmark should never be stacked vertically.
            </p>
            <Placeholder label="Horizontal Lockup" />
            <div className="mt-4 mb-8">
              <p className="text-xs font-medium text-foreground mb-2">When to use the full logo:</p>
              <ul className="space-y-1 text-sm text-secondary">
                <li className="flex items-start gap-2"><span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-tertiary" />Brand introduction &mdash; when the audience may be unfamiliar with Datagrid.</li>
                <li className="flex items-start gap-2"><span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-tertiary" />Visibility &mdash; when there&apos;s enough space to display the full composition clearly.</li>
                <li className="flex items-start gap-2"><span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-tertiary" />Signatures &mdash; official signatures and video tags.</li>
              </ul>
            </div>

            <h3 className="text-lg font-medium text-foreground mb-3">Clearspace</h3>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              The logo grid defines the protective space around the Logotype and Logomark. This &ldquo;breathing room&rdquo; ensures the logo remains legible and impactful. Never allow other elements to encroach on this space.
            </p>
            <Placeholder label="Clearspace Guidelines" />
          </section>

          {/* Wordmark */}
          <section className="mb-16">
            <SectionHeading>Wordmark</SectionHeading>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              The Wordmark is your default choice for most applications. It clearly and proudly displays our name. Use this for most brand communications. In extremely limited spaces&mdash;like diagrams or app icons&mdash;use the Logomark instead.
            </p>
            <Placeholder label="Wordmark" />
            <div className="mt-6">
              <h3 className="text-lg font-medium text-foreground mb-3">Clearspace</h3>
              <p className="text-sm text-secondary leading-relaxed">
                Similar to the full horizontal lockup, the Wordmark needs breathing room. Its clearspace is determined by the x-height of the lowercase &ldquo;a&rdquo;.
              </p>
            </div>
          </section>

          {/* Logomark */}
          <section className="mb-16">
            <SectionHeading>Logomark</SectionHeading>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              The Logomark is our secondary brand symbol, a shorthand for the brand. Use it strategically to maintain its effectiveness.
            </p>
            <Placeholder label="Logomark" />
            <div className="mt-4 mb-6">
              <p className="text-xs font-medium text-foreground mb-2">When to use the Logomark:</p>
              <ul className="space-y-1 text-sm text-secondary">
                <li className="flex items-start gap-2"><span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-tertiary" />Tight spaces &mdash; when the primary logo won&apos;t fit (diagrams, favicons, app icons).</li>
                <li className="flex items-start gap-2"><span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-tertiary" />Familiarity &mdash; when the audience already knows the brand, or the primary logo appears elsewhere in context.</li>
              </ul>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-3">Clearspace</h3>
            <p className="text-sm text-secondary leading-relaxed">
              The Logomark&apos;s clearspace is determined by the width of the box shadow.
            </p>
          </section>

          {/* Color */}
          <section className="mb-16">
            <SectionHeading>Color</SectionHeading>
            <p className="text-sm text-secondary leading-relaxed mb-6">
              Color is a functional part of our language. Our primary palette represents the four core pillars of our product. Each color corresponds to a specific capability within the Datagrid ecosystem.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {COLORS.map((c) => (
                <div key={c.name} className="rounded-xl border border-border overflow-hidden">
                  <div className="h-20" style={{ backgroundColor: c.hex }} />
                  <div className="p-4">
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-accent mt-0.5">{c.label}</p>
                    <p className="text-xs text-secondary mt-2 leading-relaxed">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-secondary leading-relaxed">
              These colors work together, not in isolation. Since Datagrid combines Knowledge, Tools, and Actions to power your workflow, use these colors in combination to represent the complete system.
            </p>
          </section>

          {/* Typography */}
          <section className="mb-16">
            <SectionHeading>Typography</SectionHeading>
            <p className="text-sm text-secondary leading-relaxed mb-8">
              Typography is the voice of Datagrid&mdash;it&apos;s how we speak to our users with innovation, approachability, and clarity.
            </p>

            <h3 className="text-lg font-medium text-foreground mb-3">Primary Typeface &mdash; PolySans</h3>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              PolySans is our headline font and the primary carrier of our brand&apos;s personality. A fresh take on mid-20th-century classics, it features distinct &ldquo;ink traps&rdquo; and dynamic proportions&mdash;signaling that we&apos;re ahead of the curve. Subtle soft edges make the type feel warm and accessible.
            </p>
            <p className="text-xs text-tertiary mb-8">
              Use PolySans for headlines, titles, and big statements&mdash;anywhere we want to showcase our personality: confident, smart, and a little fun.
            </p>

            <h3 className="text-lg font-medium text-foreground mb-3">Secondary Typeface &mdash; Inter</h3>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              Inter is our workhorse, supporting PolySans by handling details with absolute clarity. Built for screens, its high legibility supports our values of transparency and trust.
            </p>
            <p className="text-xs text-tertiary">
              Use Inter for body copy, UI elements, diagrams, and long-form text.
            </p>
          </section>

          {/* Don'ts */}
          <section>
            <SectionHeading>Logo Don&apos;ts</SectionHeading>
            <p className="text-sm text-secondary leading-relaxed mb-6">
              To maintain a strong brand identity, present our logo accurately and consistently. When in doubt, reach out to the Datagrid creative team.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DONTS.map((d) => (
                <div key={d} className="flex items-start gap-3 p-4 rounded-xl border border-border">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5 text-red-400">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm text-secondary">{d}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

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
