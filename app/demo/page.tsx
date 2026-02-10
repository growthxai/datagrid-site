import Link from "next/link";

export const metadata = {
  title: "Request a Demo",
  description: "See Datagrid AI agents in action. Book a personalized demo for your team.",
};

export default function DemoPage() {
  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column — value prop */}
          <div>
            <p className="text-xs font-medium text-black/75 mb-4">Get Started</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
              See Datagrid in action
            </h1>
            <p className="mt-1 text-lg text-secondary">
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
                  <div className="mt-1 w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-accent"
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
          <div className="p-8 bg-background rounded-2xl border border-border shadow-lg">
            <h2 className="text-xl font-medium text-foreground mb-6">
              Request your demo
            </h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                    placeholder="Smith"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Work email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                  placeholder="jane@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                  placeholder="Acme Construction"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Role
                </label>
                <select className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200">
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
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  What workflows are you looking to automate?
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                  placeholder="e.g., Submittal reviews, RFI drafting, daily log compilation..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-5 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out"
              >
                Book My Demo
              </button>
              <p className="text-xs text-tertiary text-center">
                Join 200+ construction teams already using Datagrid.
              </p>
              <p className="text-xs text-tertiary text-center">
                By submitting this form, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-foreground transition-colors duration-150">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-foreground transition-colors duration-150">
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
