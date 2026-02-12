"use client";

import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tiers = [
    {
      name: "Starter",
      price: "Free",
      description: "For teams exploring AI in their workflows.",
      features: [
        "2 AI agents",
        "1 connector",
        "100 document runs / month",
        "Email support",
        "Community access",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$499",
      period: "/mo",
      description: "For teams ready to automate at scale.",
      features: [
        "Unlimited AI agents",
        "5 connectors",
        "2,500 document runs / month",
        "Priority support",
        "Custom agent configuration",
        "Team collaboration",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with complex requirements.",
      features: [
        "Unlimited everything",
        "Unlimited connectors",
        "Custom agent development",
        "Dedicated success manager",
        "SSO & advanced security",
        "SLA guarantee",
        "On-premise deployment option",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: "What counts as a document run?",
      answer:
        "A document run is any time an AI agent processes a document or set of documents. For example, reviewing one submittal package counts as one run.",
    },
    {
      question: "Can I switch plans at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer:
        "Yes, annual plans receive a 20% discount compared to monthly billing.",
    },
    {
      question: "What integrations are included?",
      answer:
        "All plans include access to our connector library. The number of active connectors varies by plan. See the feature comparison for details.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, the Pro plan includes a 14-day free trial with full access to all features. No credit card required.",
    },
  ];

  const comparisonFeatures = [
    { feature: "AI Agents", starter: "2", pro: "Unlimited", enterprise: "Unlimited" },
    { feature: "Connectors", starter: "1", pro: "5", enterprise: "Unlimited" },
    { feature: "Document Runs", starter: "100/mo", pro: "2,500/mo", enterprise: "Unlimited" },
    { feature: "Team Members", starter: "3", pro: "15", enterprise: "Unlimited" },
    { feature: "Custom Agents", starter: "\u2014", pro: "Yes", enterprise: "Yes" },
    { feature: "Priority Support", starter: "\u2014", pro: "Yes", enterprise: "Yes" },
    { feature: "SSO", starter: "\u2014", pro: "\u2014", enterprise: "Yes" },
    { feature: "SLA", starter: "\u2014", pro: "\u2014", enterprise: "Yes" },
  ];

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Pricing hero */}
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-[#a29080] mb-4">Pricing</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            Simple, transparent pricing
          </h1>
          <p className="mt-1 text-lg text-secondary max-w-xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 rounded-2xl ${
                tier.highlighted
                  ? "border-2 border-accent bg-accent/5 ring-1 ring-accent/20 shadow-lg shadow-accent/5"
                  : "border border-border bg-background"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-accent text-accent-foreground">
                  Most Popular
                </span>
              )}
              <h2 className="text-xl font-medium text-foreground">{tier.name}</h2>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-medium text-foreground">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="ml-1 text-secondary">{tier.period}</span>
                )}
              </div>
              <p className="mt-3 text-sm text-secondary">{tier.description}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <svg
                      className="mt-0.5 w-4 h-4 text-accent shrink-0"
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
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/demo"
                className={`mt-8 block w-full text-center px-5 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-out ${
                  tier.highlighted
                    ? "bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md"
                    : "border border-border text-foreground hover:bg-surface"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Feature comparison table */}
        <section className="mb-20">
          <h2 className="text-2xl font-medium text-foreground text-center mb-8">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">
                    Starter
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-accent">
                    Pro
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row) => (
                  <tr key={row.feature} className="border-b border-border">
                    <td className="py-4 px-6 text-foreground">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-secondary">
                      {row.starter}
                    </td>
                    <td className="py-4 px-4 text-center text-foreground font-medium">
                      {row.pro}
                    </td>
                    <td className="py-4 px-4 text-center text-secondary">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ accordion */}
        <section className="mb-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-medium text-foreground text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-border rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-sm font-semibold text-foreground hover:bg-surface transition-all duration-200 ease-out"
                >
                  {faq.question}
                  <svg
                    className={`w-4 h-4 text-secondary transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-secondary leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-medium text-foreground mb-3">
            Still have questions?
          </h2>
          <p className="text-secondary mb-8">
            Our team is happy to walk you through the platform.
          </p>
          <Link
            href="/demo"
            className="px-8 py-4 text-base font-medium rounded-lg bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 ease-out"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
