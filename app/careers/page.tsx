import Link from "next/link";

export const metadata = {
  title: "Careers",
  description: "Join the Datagrid team and help build the future of AI in construction.",
};

const PLACEHOLDER_JOBS = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
  },
  {
    title: "ML Engineer — Document Understanding",
    team: "AI/ML",
    location: "Remote (US)",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Remote (US)",
    type: "Full-time",
  },
  {
    title: "Solutions Engineer",
    team: "Sales",
    location: "Remote (US)",
    type: "Full-time",
  },
];

export default function CareersPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* DESIGN: Careers hero */}
        <div className="mb-16 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Build the future of construction with us
          </h1>
          <p className="mt-4 text-lg text-secondary">
            Datagrid is on a mission to bring AI to one of the world&apos;s
            largest industries. We&apos;re looking for people who want to solve
            hard problems and ship real products.
          </p>
        </div>

        {/* DESIGN: Open positions listing */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Open Positions
          </h2>
          <div className="space-y-4">
            {PLACEHOLDER_JOBS.map((job) => (
              <div
                key={job.title}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-background rounded-xl border border-border hover:border-accent/40 transition-colors"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {job.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-secondary">
                    <span>{job.team}</span>
                    <span>&middot;</span>
                    <span>{job.location}</span>
                    <span>&middot;</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <Link
                  href="/demo"
                  className="mt-4 sm:mt-0 inline-flex px-5 py-2 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                >
                  Apply
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* DESIGN: Why Datagrid section */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Why Datagrid?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Real impact",
                description:
                  "Construction is a $13T global industry still run on spreadsheets and PDFs. Every feature you build saves real people real hours.",
              },
              {
                title: "Small team, big scope",
                description:
                  "You'll have ownership over entire product surfaces. No ticket factories — just hard problems and smart people.",
              },
              {
                title: "Remote-first",
                description:
                  "Work from anywhere in the US. We care about output, not office hours. Async by default, sync when it matters.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 bg-muted rounded-xl"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
