export const metadata = {
  title: "Credit Usage Policy and Pricing Terms | Datagrid",
  description: "Datagrid consumption units, credit usage policy, and pricing terms.",
};

const WEB_SEARCH = [
  { service: "Company Enrichment and Search", cost: "$130.00" },
  { service: "People Enrichment and Search", cost: "$500.00" },
  { service: "You.com API Calls", cost: "$16.00" },
  { service: "Google Search API Calls", cost: "$10.00" },
  { service: "Web Scraping", cost: "10 Credits" },
  { service: "Web Scraping (Light)", cost: "2 Credits" },
  { service: "Web Scraping API Calls", cost: "$2.00" },
];

const PHONE_COSTS = [
  { interaction: "Assign Number", direction: "Incoming", cost: "$7.00" },
  { interaction: "Assign Number", direction: "Outgoing", cost: "$7.00" },
  { interaction: "SMS", direction: "Incoming", cost: "$0.0075" },
  { interaction: "SMS", direction: "Outgoing", cost: "$0.00883" },
  { interaction: "MMS", direction: "Incoming", cost: "$0.02" },
  { interaction: "MMS", direction: "Outgoing", cost: "$0.02" },
  { interaction: "Voice", direction: "Incoming", cost: "$0.01" },
  { interaction: "Voice", direction: "Outgoing", cost: "$0.01" },
];

const AI_MODELS = [
  { provider: "Meta", model: "Llama 3 8B", input: "15.31", output: "20.41" },
  { provider: "Google", model: "Gemma 1.1 7B", input: "15.31", output: "20.41" },
  { provider: "Mistral", model: "Mistral 8B", input: "204.08", output: "612.24" },
  { provider: "Anthropic", model: "Claude 3 Haiku", input: "25.51", output: "127.55" },
  { provider: "Anthropic", model: "Claude 3 Sonnet", input: "306.12", output: "2,551.02" },
  { provider: "Anthropic", model: "Claude 3 Opus", input: "1,530.61", output: "7,653.06" },
  { provider: "OpenAI", model: "GPT-4o", input: "306.12", output: "2,551" },
];

export default function CreditUsagePolicyPage() {
  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground mb-2">
          Datagrid Consumption Units
        </h1>
        <p className="text-sm text-tertiary mb-12">
          Effective Date: January 2025 &middot; Last update: February 21st 2025
        </p>

        <div className="space-y-12 text-sm text-secondary leading-relaxed">
          {/* 1. Overview */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">1. Overview</h2>
            <p>
              Datagrid employs a consumption-based pricing model to determine the cost of service delivery. Credit consumption is measured based on service tokens, which include but are not limited to predictions, web searches, API calls, and other tasks executed by the AI Agent. The table below serves as the standard reference for credit consumption calculations.
            </p>
            <p className="mt-3">
              Bulk credit packages are available at discounted rates. To inquire about purchasing such packages, please contact <a href="mailto:sales@datagrid.com" className="text-accent hover:text-accent-hover transition-colors duration-150">sales@datagrid.com</a>. Pricing details provided herein are subject to periodic review and may be adjusted at any time without prior notice.
            </p>
          </section>

          {/* 2. Pricing Structure */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">2. Pricing Structure</h2>
            <p>
              The cost of each service is determined based on third-party API pricing with a margin applied to the base cost. The following tables outline the credit costs in Datagrid for the different services.
            </p>
          </section>

          {/* 3. Web Search and Scraping */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-4">3. Web Search and Scraping Services</h2>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-2 bg-surface/50 px-4 py-2.5 text-xs font-medium text-tertiary">
                <span>Service</span>
                <span>Cost per 1K API Calls</span>
              </div>
              {WEB_SEARCH.map((row) => (
                <div key={row.service} className="grid grid-cols-2 px-4 py-3 border-t border-border text-sm">
                  <span className="text-foreground">{row.service}</span>
                  <span className="text-secondary">{row.cost}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Phone Interaction Costs */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-4">4. Phone Interaction Costs</h2>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-3 bg-surface/50 px-4 py-2.5 text-xs font-medium text-tertiary">
                <span>Interaction</span>
                <span>Direction</span>
                <span>Cost per Interaction</span>
              </div>
              {PHONE_COSTS.map((row, i) => (
                <div key={i} className="grid grid-cols-3 px-4 py-3 border-t border-border text-sm">
                  <span className="text-foreground">{row.interaction}</span>
                  <span className="text-secondary">{row.direction}</span>
                  <span className="text-secondary">{row.cost}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Credit Calculation */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">5. Credit Calculation</h2>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-tertiary" />
                The baseline cost per credit is $0.049.
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-tertiary" />
                Characters are counted based on UTF-8 code points, excluding white spaces, with approximately 4 characters per token.
              </li>
            </ul>
          </section>

          {/* 6. Minimum Credit Threshold */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">6. Minimum Credit Threshold</h2>
            <p>The minimum value for credits is $0.01.</p>
          </section>

          {/* 7. AI Model Token Pricing */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-4">7. AI Model Token Pricing</h2>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-4 bg-surface/50 px-4 py-2.5 text-xs font-medium text-tertiary">
                <span>Provider</span>
                <span>Model</span>
                <span>Input Credits / 1M Tokens</span>
                <span>Output Credits / 1M Tokens</span>
              </div>
              {AI_MODELS.map((row) => (
                <div key={row.model} className="grid grid-cols-4 px-4 py-3 border-t border-border text-sm">
                  <span className="text-foreground">{row.provider}</span>
                  <span className="text-foreground">{row.model}</span>
                  <span className="text-secondary">{row.input}</span>
                  <span className="text-secondary">{row.output}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Pricing Adjustments */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">8. Pricing Adjustments</h2>
            <p>
              The pricing listed above is subject to periodic review and may be updated without prior notice. Users should refer to the latest pricing details on our official website.
            </p>
          </section>

          {/* 9. Contact Information */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">9. Contact Information</h2>
            <p>
              For inquiries regarding pricing or credit calculations, please contact <a href="mailto:sales@datagrid.com" className="text-accent hover:text-accent-hover transition-colors duration-150">sales@datagrid.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
