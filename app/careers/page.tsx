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
    title: "ML Engineer \u2014 Document Understanding",
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
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Careers hero */}
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-medium text-black/75 mb-4">Careers</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            Build the future of construction with us
          </h1>
          <p className="mt-1 text-lg text-secondary">
            Datagrid is on a mission to bring AI to one of the world&apos;s
            largest industries. We&apos;re looking for people who want to solve
            hard problems and ship real products.
          </p>
        </div>

        {/* Open positions listing */}
        <section>
          <p className="text-xs font-medium text-black/75 mb-4">Join the Team</p>
          <h2 className="text-2xl font-medium text-foreground mb-8">
            Open Positions
          </h2>
          <div className="space-y-4">
            {PLACEHOLDER_JOBS.map((job) => (
              <div
                key={job.title}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-8 bg-background rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {job.title}
                  </h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-secondary">
                    <span>{job.team}</span>
                    <span>&middot;</span>
                    <span>{job.location}</span>
                    <span>&middot;</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <Link
                  href="/demo"
                  className="mt-4 sm:mt-0 inline-flex px-5 py-2.5 text-sm font-semibold rounded-lg border border-border text-foreground hover:bg-surface transition-all duration-200 ease-out"
                >
                  Apply
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Why Datagrid section */}
        <section className="mt-20">
          <p className="text-xs font-medium text-black/75 mb-4">Why Datagrid</p>
          <h2 className="text-2xl font-medium text-foreground mb-8">
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
                  "You\u2019ll have ownership over entire product surfaces. No ticket factories \u2014 just hard problems and smart people.",
              },
              {
                title: "Remote-first",
                description:
                  "Work from anywhere in the US. We care about output, not office hours. Async by default, sync when it matters.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 bg-surface rounded-2xl"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-secondary leading-relaxed">
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
