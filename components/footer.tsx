"use client";

import Link from "next/link";
import Image from "next/image";
import LogoContextMenu from "@/components/logo-context-menu";

const FOOTER_COLUMNS: { heading: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    heading: "Resources",
    links: [
      { href: "/agents", label: "Agents" },
      { href: "/connectors", label: "Connectors" },
      { href: "/guides", label: "Guides" },
      { href: "/blog", label: "Blog" },
      { href: "/developers", label: "Developers" },
      { href: "/download", label: "Download" },
      { href: "/brand-assets", label: "Brand Assets" },
    ],
  },
  {
    heading: "Get Help",
    links: [
      { href: "/help-center", label: "Help Center" },
      { href: "/api-quickstart", label: "API Quickstart" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    heading: "Follow Us",
    links: [
      { href: "https://www.linkedin.com/company/datagrid-ai", label: "LinkedIn", external: true },
      { href: "https://www.youtube.com/@datagrid-ai", label: "YouTube", external: true },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/careers", label: "Careers" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/msa", label: "Master Service Agreement" },
      { href: "/credit-usage-policy", label: "Credit Usage Policy and Pricing Terms" },
      { href: "/report-vulnerability", label: "Report a Vulnerability" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand + Subscribe */}
          <div className="col-span-2">
            <LogoContextMenu>
              <Link href="/" className="inline-block">
                <Image src="/datagrid-logo.avif" alt="Datagrid" width={140} height={32} className="brightness-0" />
              </Link>
            </LogoContextMenu>
            <p className="mt-1.5 text-xs text-tertiary tracking-wide">a Procore Company</p>

            <div className="mt-8">
              <p className="text-sm font-medium text-foreground">Subscribe to our newsletter</p>
              <form className="mt-3 flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email here"
                  className="w-full max-w-[220px] px-3 py-2 text-sm rounded-lg border border-border bg-surface text-foreground placeholder:text-tertiary focus:outline-none focus:border-accent/40 transition-colors duration-150"
                />
                <button
                  type="submit"
                  className="shrink-0 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-150"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-2 text-xs text-tertiary">
                By subscribing, you agree to our{" "}
                <Link href="/privacy" className="underline hover:text-secondary transition-colors duration-150">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-medium text-foreground">{col.heading}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-secondary hover:text-foreground transition-colors duration-150"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-secondary hover:text-foreground transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-tertiary">
            &copy; {new Date().getFullYear()} Datagrid, a Procore company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
