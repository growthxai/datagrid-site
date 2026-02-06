import Link from "next/link";

const FOOTER_LINKS = {
  Product: [
    { href: "/agents", label: "Agents" },
    { href: "/connectors", label: "Connectors" },
    { href: "/pricing", label: "Pricing" },
    { href: "/demo", label: "Request Demo" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
  ],
  Legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              Datagrid
            </Link>
            <p className="mt-3 text-sm text-secondary">
              AI agents for the construction industry. Automate document review, field ops, and more.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-foreground">{heading}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-secondary">
            &copy; {new Date().getFullYear()} Datagrid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
