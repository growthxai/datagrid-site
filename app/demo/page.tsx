import Link from "next/link";

export const metadata = {
  title: "Request a Demo",
  description: "See Datagrid AI agents in action. Book a personalized demo for your team.",
};

export default function DemoPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column — value prop */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              See Datagrid in action
            </h1>
            <p className="mt-4 text-lg text-secondary">
              Book a 30-minute walkthrough tailored to your team&apos;s workflows.
              We&apos;ll show you how AI agents can automate your most
              time-consuming processes.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  title: "Personalized demo",
                  description:
                    "We'll walk through agents relevant to your specific workflows and project types.",
                },
                {
                  title: "Integration review",
                  description:
                    "See how Datagrid connects with the tools you already use — Procore, PlanGrid, and more.",
                },
                {
                  title: "ROI estimate",
                  description:
                    "Get a clear picture of time and cost savings for your team size and project volume.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-secondary mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — form */}
          <div className="p-8 bg-muted rounded-xl border border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Request your demo
            </h2>
            {/* DESIGN: Demo request form — connect to form service (e.g., Formspree, HubSpot) */}
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    First name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent/40"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent/40"
                    placeholder="Smith"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Work email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="jane@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="Acme Construction"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Role
                </label>
                <select className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40">
                  <option value="">Select your role</option>
                  <option value="pm">Project Manager</option>
                  <option value="pe">Project Engineer</option>
                  <option value="super">Superintendent</option>
                  <option value="estimator">Estimator</option>
                  <option value="exec">Executive / Owner</option>
                  <option value="it">IT / Technology</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  What workflows are you looking to automate?
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="e.g., Submittal reviews, RFI drafting, daily log compilation..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-5 py-2.5 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                Book My Demo
              </button>
              <p className="text-xs text-secondary text-center">
                By submitting this form, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
