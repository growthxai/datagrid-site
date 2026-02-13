import Link from "next/link";
import { PLACEHOLDER_CONNECTORS } from "@/lib/placeholder-data";
import PageHeader from "@/components/page-header";
import type { Connector, SetupStep } from "@/lib/types";
import type { ReactNode } from "react";

type Props = { params: Promise<{ slug: string; step: string; item: string }> };

/* ------------------------------------------------------------------ */
/*  Procore Service Account guide content                             */
/* ------------------------------------------------------------------ */

function ProcoreServiceAccountGuide() {
  return (
    <>
      <p className="text-base text-secondary leading-relaxed mb-8">
        To connect Procore to Datagrid, you will need to create a Service Account in Procore. Here is how to get started:
      </p>

      {/* Step 1 */}
      <section id="step-1" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">1. Create a Service Account</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>
            Login to Procore as an Administrator. Click to open the <strong className="text-foreground">Apps</strong> dropdown (top right)
            and select the <strong className="text-foreground">App Management</strong> option.
          </p>
          <p>
            Under Company Settings, click on the <strong className="text-foreground">Service Account</strong> option,
            then click <strong className="text-foreground">+New</strong> (top right).
          </p>
          <p>Enter the following in the provided fields:</p>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 p-4 rounded-xl bg-surface border border-border text-xs">
            <span className="font-medium text-foreground">App Type</span>
            <span>Click the <strong className="text-foreground">Custom</strong> option</span>
            <span className="font-medium text-foreground">Description</span>
            <span>Datagrid unlocks your data&apos;s potential by creating personalized AI Agents with your data, analyzing from multiple sources and enhancing your data effortlessly.</span>
            <span className="font-medium text-foreground">Company/Developer Name</span>
            <span>Datagrid</span>
            <span className="font-medium text-foreground">Company/Developer Email</span>
            <span>Enter an Administrator email from your company (i.e., admin@yourcompany.com)</span>
            <span className="font-medium text-foreground">Name</span>
            <span>Datagrid App</span>
          </div>
          <ScreenshotPlaceholder caption="Creating a new Service Account in Procore App Management" />
          <Callout>
            Creating a Service Account will create a new User in your company.
            The new user&apos;s name will have the format <code className="text-xs px-1 py-0.5 rounded bg-surface border border-border">ServiceAccountName-YourCompanyName</code> (i.e., toric-app-toric-demo-company-us02).
          </Callout>
        </div>
      </section>

      {/* Step 2 */}
      <section id="step-2" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">2. Assign Permission Templates</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>
            Datagrid&apos;s access to information depends on the permission template you assign to a Service Account.
            If you already have an Admin permission template that gives full access to Company and Project Data,
            you could jump directly to Step 2.3.
          </p>
          <p>
            If you need to create a new permission template, click on the <strong className="text-foreground">Company Tools</strong> dropdown
            and select the <strong className="text-foreground">Permissions</strong> option. Then follow Steps 2.1–2.3 below.
          </p>

          <h3 className="text-base font-medium text-foreground mt-6">2.1 Company permission template</h3>
          <ol className="list-decimal ml-5 space-y-2">
            <li>Click on the <strong className="text-foreground">Company Permissions Templates</strong>.</li>
            <li>Click on <strong className="text-foreground">+Create Company Permission Template</strong> (top right).</li>
            <li>Enter the name <code className="text-xs px-1 py-0.5 rounded bg-surface border border-border">Service Account Template (Company)</code> and click confirm.</li>
            <li>In the row &quot;Permissions Tool&quot;, click the radio button under <strong className="text-foreground">Admin</strong> and then Save.</li>
          </ol>

          <h3 className="text-base font-medium text-foreground mt-6">2.2 Project permission template</h3>
          <ol className="list-decimal ml-5 space-y-2">
            <li>Click on the <strong className="text-foreground">Project Permissions Template</strong>.</li>
            <li>Click on <strong className="text-foreground">+Create Project Permission Template</strong> (top right) and select the <strong className="text-foreground">Project (Global)</strong> option.</li>
            <li>Enter the name <code className="text-xs px-1 py-0.5 rounded bg-surface border border-border">Service Account Template (Project)</code> and click confirm.</li>
            <li>In the row &quot;Permissions Tool&quot;, click the radio button under <strong className="text-foreground">Admin</strong> and then Save.</li>
          </ol>

          <h3 className="text-base font-medium text-foreground mt-6">2.3 Assign permission template</h3>
          <ol className="list-decimal ml-5 space-y-2">
            <li>Navigate back to the <strong className="text-foreground">User Permissions</strong> tab and use the search box to enter the name of the Service Account you created in Step 1.</li>
            <li>Use the <strong className="text-foreground">Actions</strong> dropdown to the left of your service account and select <strong className="text-foreground">Assign Company Permissions</strong>.</li>
            <li>Assign the <code className="text-xs px-1 py-0.5 rounded bg-surface border border-border">Service Account Template (Company)</code>.</li>
            <li>Navigate back to User Permissions and repeat this step, this time selecting <strong className="text-foreground">Assign Default Project Permissions</strong>.</li>
            <li>Assign the <code className="text-xs px-1 py-0.5 rounded bg-surface border border-border">Service Account Template (Project)</code>.</li>
          </ol>
          <Callout>
            You could assign any existing template in your Procore Account as long as the template has Admin permissions.
          </Callout>
        </div>
      </section>

      {/* Step 3 */}
      <section id="step-3" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">3. Edit Service Account User Settings</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>
            Open the <strong className="text-foreground">Company Tools</strong> dropdown and select <strong className="text-foreground">Directory</strong>,
            then search for the Service Account you created in Step 1. Click <strong className="text-foreground">Edit</strong> and
            make sure the following options are applied:
          </p>

          <h3 className="text-base font-medium text-foreground mt-6">3.1 User messaging</h3>
          <p>
            Use the dropdown to select the option <strong className="text-foreground">Not at all</strong>.
            This will avoid unnecessary email notifications.
          </p>

          <h3 className="text-base font-medium text-foreground mt-6">3.2 Company permission settings</h3>
          <p>
            Ensure that the template selected matches the option you selected in Step 2.3.
            Use the created <code className="text-xs px-1 py-0.5 rounded bg-surface border border-border">Service Account Template (Company)</code>.
          </p>
          <ScreenshotPlaceholder caption="Company permission template assignment" />

          <h3 className="text-base font-medium text-foreground mt-6">3.3 Project permission settings</h3>
          <p>
            Make sure to check both boxes in the <strong className="text-foreground">New Project Settings</strong>.
            This will ensure that your Datagrid App (Service Account) will have access to new Procore projects as they get created.
          </p>
          <p>
            In <strong className="text-foreground">Current Project Settings</strong>, make sure Datagrid App (Service Account) has access to all projects.
            If not, click the <strong className="text-foreground">Add All</strong> button in the &quot;Does Not Belong To&quot; section.
            Click <strong className="text-foreground">Save</strong> (bottom right) to apply your changes.
          </p>
          <ScreenshotPlaceholder caption="New Project Settings — ensure both boxes are checked" />
          <ScreenshotPlaceholder caption="Current Project Settings — add all projects to the Service Account" />
          <Callout>
            Inactive projects will not show. If you wish to get the data from all projects, please make sure all your projects are Active.
          </Callout>
        </div>
      </section>

      {/* Step 4 */}
      <section id="step-4" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">4. Information Required for Datagrid Setup</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>You will need the following information found in your Procore Account:</p>
          <div className="flex flex-wrap gap-2">
            {["Client ID", "Client Secret", "Company ID"].map((item) => (
              <span key={item} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-surface border border-border text-foreground">
                {item}
              </span>
            ))}
          </div>
          <ScreenshotPlaceholder caption="Locating Client ID, Client Secret, and Company ID in Procore" />
          <Callout variant="warning">
            The Client Secret is only visible when a Service Account is created.
            If you lose this, you will need to Reset Secret and update all Procore configurations.
            We recommend saving your service account info in a password manager or anywhere safe.
          </Callout>
          <p>
            Please review{" "}
            <Link href="/connectors/procore/configure/procore-in-datagrid" className="text-accent hover:underline">
              Configure Procore in Datagrid
            </Link>{" "}
            to see how to set up data access.
          </p>
        </div>
      </section>

      {/* Bottom callout */}
      <div className="p-5 rounded-2xl bg-accent/5 border border-accent/10">
        <p className="text-sm text-secondary leading-relaxed">
          <span className="text-base mr-1">💡</span>
          Datagrid supports over 200+ data points from Procore. You can pick from several Procore modules such as
          Project Level Resources, Company Level Resources, and Quality and Safety items.
        </p>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Procore DMSA guide content                                        */
/* ------------------------------------------------------------------ */

function ProcoreDmsaGuide() {
  return (
    <>
      <p className="text-base text-secondary leading-relaxed mb-4">
        Procore Developer Managed Service Account, or DMSA is a method which allows Procore Administrators to install
        third party apps in order to access Procore data.
      </p>
      <p className="text-base text-secondary leading-relaxed mb-8">
        Login to Datagrid and follow these steps to setup a Procore Connector:
      </p>

      {/* Step 1 */}
      <section id="dmsa-1" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">1. Log in to Datagrid</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>Log in to your Datagrid account.</p>
          <ScreenshotPlaceholder caption="Datagrid login screen" />
          <p>Search for the Procore connector.</p>
          <ScreenshotPlaceholder caption="Searching for the Procore connector in Datagrid" />
          <ScreenshotPlaceholder caption="Procore connector selected" />
        </div>
      </section>

      {/* Step 2 */}
      <section id="dmsa-2" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">2. Connect to your Procore Account</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>
            Ensure you select <strong className="text-foreground">Developer Managed Service Account</strong>.
          </p>
          <ScreenshotPlaceholder caption="Selecting Developer Managed Service Account option" />
          <p>Log in to Procore.</p>
        </div>
      </section>

      {/* Step 3 */}
      <section id="dmsa-3" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">3. Set-Up your Pipeline</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>
            Type a unique name for your Procore DMSA Connector.
          </p>
          <p>
            Select a <strong className="text-foreground">Procore API Endpoint</strong>, this will allow you to extract data from a specific environment of your choice:
          </p>
          <div className="flex flex-wrap gap-2">
            {["sandbox.procore.com", "api-monthly.procore.com", "api.procore.com"].map((url) => (
              <code key={url} className="text-xs px-3 py-1.5 rounded-lg bg-surface border border-border text-foreground">
                {url}
              </code>
            ))}
          </div>
          <Callout>
            To test your new connector, you can use the sandbox URL. When you are ready to ingest actual company data,
            update the configuration and select <code className="text-xs px-1 py-0.5 rounded bg-background border border-border">api.procore.com</code>.
          </Callout>
          <p>
            Select a <strong className="text-foreground">Company ID</strong>.
            This ensures that you do not have to create a configuration for each company account but instead have
            one configuration in Datagrid to access data from multiple company accounts.
          </p>
          <ScreenshotPlaceholder caption="Pipeline configuration — name, API endpoint, and Company ID" />
          <Callout>
            If your administrator account has access to multiple companies, each of them will appear in the list
            and you will have the ability to select all the populated Company IDs.
          </Callout>
          <p>
            Now that you have all Configuration details filled in, click on <strong className="text-foreground">Validate Connector</strong>.
          </p>
        </div>
      </section>

      {/* Step 4 */}
      <section id="dmsa-4" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">4. Pick your Data to Import</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>
            Select the data you&apos;d like to export and click <strong className="text-foreground">Start First Import</strong> to
            begin bringing data into Datagrid.
          </p>
          <ScreenshotPlaceholder caption="Selecting data modules to import from Procore" />
        </div>
      </section>

      {/* Bottom callout */}
      <div className="p-5 rounded-2xl bg-accent/5 border border-accent/10">
        <p className="text-sm text-secondary leading-relaxed">
          <span className="text-base mr-1">💡</span>
          Datagrid supports over 200+ data points from Procore. You can pick from several Procore modules such as
          Project Level Resources, Company Level Resources, Core data and Quality and Safety items.
        </p>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Procore in Datagrid guide content                                 */
/* ------------------------------------------------------------------ */

function ProcoreInDatagridGuide() {
  return (
    <>
      <p className="text-base text-secondary leading-relaxed mb-8">
        Login to Datagrid and follow these steps to setup a Service Account Connector:
      </p>

      {/* Step 1 */}
      <section id="cfg-1" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">1. Log in to Datagrid</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>Log in to your Datagrid account.</p>
          <ScreenshotPlaceholder caption="Datagrid login screen" />
          <p>Search for the Procore connector.</p>
          <ScreenshotPlaceholder caption="Searching for the Procore connector in Datagrid" />
          <ScreenshotPlaceholder caption="Procore connector selected" />
        </div>
      </section>

      {/* Step 2 */}
      <section id="cfg-2" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">2. Configure your Procore Connector</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>
            Ensure you select <strong className="text-foreground">Service Account</strong>.
          </p>
          <ScreenshotPlaceholder caption="Selecting Service Account connection type" />
          <p>
            Paste your <strong className="text-foreground">Company ID</strong> from step 4 of{" "}
            <Link href="/connectors/procore/configure/procore-service-account" className="text-accent hover:underline">
              Setup a Procore Service Account
            </Link>.
          </p>
          <p>
            Paste your <strong className="text-foreground">Client ID</strong> from step 4 of{" "}
            <Link href="/connectors/procore/configure/procore-service-account" className="text-accent hover:underline">
              Setup a Procore Service Account
            </Link>.
          </p>
          <p>
            Paste your <strong className="text-foreground">Client Secret</strong> from step 4 of{" "}
            <Link href="/connectors/procore/configure/procore-service-account" className="text-accent hover:underline">
              Setup a Procore Service Account
            </Link>.
          </p>
          <p>
            Paste <strong className="text-foreground">Procore endpoint</strong> (Optional field).
            It can be used to pull data from a specific URL. For example, you may want to test in a Procore
            sandbox or a developer environment. In this case, paste your URL in the endpoint text field.
          </p>
          <p>
            Click on <strong className="text-foreground">Validate Connector</strong> to finalize the creation of your Procore Connector.
          </p>
        </div>
      </section>

      {/* Step 3 */}
      <section id="cfg-3" className="mb-10 scroll-mt-32">
        <h2 className="text-xl font-medium text-foreground mb-4">3. Pick your Data to Import</h2>
        <div className="space-y-4 text-sm text-secondary leading-relaxed">
          <p>
            Select the data you&apos;d like to export and click <strong className="text-foreground">Start First Import</strong> to
            begin bringing data into Datagrid.
          </p>
          <ScreenshotPlaceholder caption="Selecting data modules to import from Procore" />
        </div>
      </section>

      {/* Bottom callout */}
      <div className="p-5 rounded-2xl bg-accent/5 border border-accent/10">
        <p className="text-sm text-secondary leading-relaxed">
          <span className="text-base mr-1">💡</span>
          Datagrid supports over 200+ data points from Procore. You can pick from several Procore modules such as
          Project Level Resources, Company Level Resources, Core data and Quality and Safety items.
        </p>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared components                                                 */
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

function Callout({ children, variant = "info" }: { children: ReactNode; variant?: "info" | "warning" }) {
  const styles = variant === "warning"
    ? "bg-amber-50/50 border-amber-200/40"
    : "bg-surface border-border";
  return (
    <div className={`p-4 rounded-xl border ${styles} text-xs text-secondary leading-relaxed`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Content registry                                                  */
/* ------------------------------------------------------------------ */

const GUIDE_CONTENT: Record<string, Record<string, () => ReactNode>> = {
  procore: {
    "procore-service-account": () => <ProcoreServiceAccountGuide />,
    "procore-dmsa-account": () => <ProcoreDmsaGuide />,
    "procore-in-datagrid": () => <ProcoreInDatagridGuide />,
  },
};

type TocEntry = { id: string; label: string; children?: { id?: string; label: string }[] };

const GUIDE_TOC: Record<string, Record<string, TocEntry[]>> = {
  procore: {
    "procore-service-account": [
      { id: "step-1", label: "Create a Service Account" },
      { id: "step-2", label: "Assign Permission Templates", children: [
        { label: "Company permission template" },
        { label: "Project permission template" },
        { label: "Assign permission template" },
      ] },
      { id: "step-3", label: "Edit Service Account User Settings", children: [
        { label: "User messaging" },
        { label: "Company permission settings" },
        { label: "Project permission settings" },
      ] },
      { id: "step-4", label: "Information Required for Datagrid Setup" },
    ],
    "procore-dmsa-account": [
      { id: "dmsa-1", label: "Log in to Datagrid" },
      { id: "dmsa-2", label: "Connect to your Procore Account" },
      { id: "dmsa-3", label: "Set-Up your Pipeline" },
      { id: "dmsa-4", label: "Pick your Data to Import" },
    ],
    "procore-in-datagrid": [
      { id: "cfg-1", label: "Log in to Datagrid" },
      { id: "cfg-2", label: "Configure your Procore Connector" },
      { id: "cfg-3", label: "Pick your Data to Import" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export async function generateMetadata({ params }: Props) {
  const { slug, step: stepSlug, item: itemSlug } = await params;
  const connector = PLACEHOLDER_CONNECTORS.find((c) => c.slug.current === slug) as (Connector & { setupSteps?: SetupStep[] }) | undefined;
  const step = connector?.setupSteps?.find((s) => s.slug === stepSlug);
  const item = step?.items?.find((i) => i.slug === itemSlug);
  return {
    title: item ? `${item.title} — ${connector?.title}` : "Guide",
    description: `${item?.title || "Setup guide"} for ${connector?.title || "connector"}.`,
  };
}

export default async function ConnectorStepItemPage({ params }: Props) {
  const { slug, step: stepSlug, item: itemSlug } = await params;
  const connector = (PLACEHOLDER_CONNECTORS.find((c) => c.slug.current === slug) || PLACEHOLDER_CONNECTORS[0]) as Connector & { setupSteps?: SetupStep[] };
  const step = connector.setupSteps?.find((s) => s.slug === stepSlug);
  const item = step?.items?.find((i) => i.slug === itemSlug);

  if (!step || !item) {
    return (
      <div className="py-32 text-center">
        <p className="text-secondary">Guide not found.</p>
        <Link href={`/connectors/${slug}`} className="text-accent hover:underline text-sm mt-2 inline-block">
          Back to {connector.title}
        </Link>
      </div>
    );
  }

  const GuideContent = GUIDE_CONTENT[slug]?.[itemSlug];
  const toc = GUIDE_TOC[slug]?.[itemSlug];
  const otherItems = step.items?.filter((i) => i.slug !== itemSlug);

  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Product", href: "/product" },
          { label: "Connectors", href: "/connectors" },
          { label: connector.title, href: `/connectors/${slug}` },
          { label: step.title, href: `/connectors/${slug}/${stepSlug}` },
          { label: item.title },
        ]}
        title={item.title}
        description={`${connector.title} setup guide`}
        variant="connectors"
        heroBg="white"
        eyebrow="How-to"
      />

      <div className="pb-14 sm:pb-18 lg:pb-22 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-10 lg:gap-14">
            {/* Main content */}
            <div className="min-w-0 flex-1 max-w-3xl">
              {GuideContent ? (
                <GuideContent />
              ) : (
                <p className="text-base text-secondary">
                  Detailed guide content coming soon.
                </p>
              )}

              {/* Navigation */}
              <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
                <Link
                  href={`/connectors/${slug}/${stepSlug}`}
                  className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="rotate-180">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back to {step.title}
                </Link>
                {(() => {
                  const idx = step.items?.findIndex((i) => i.slug === itemSlug) ?? -1;
                  const next = step.items?.[idx + 1];
                  if (!next) return null;
                  return (
                    <Link
                      href={`/connectors/${slug}/${stepSlug}/${next.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors duration-200"
                    >
                      {next.title}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  );
                })()}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
              <div className="sticky top-[154px] space-y-8">
                {/* On this page */}
                {toc && toc.length > 0 && (
                  <div className="p-4 rounded-xl border border-border bg-background">
                    <p className="text-xs font-medium text-tertiary mb-3">On this page</p>
                    <ol className="space-y-1.5 text-sm text-secondary list-none">
                      {toc.map((entry, i) => (
                        <li key={entry.id}>
                          <a href={`#${entry.id}`} className="hover:text-accent transition-colors duration-150">
                            {i + 1}. {entry.label}
                          </a>
                          {entry.children && (
                            <ol className="ml-4 mt-1 space-y-1 text-xs text-tertiary list-none">
                              {entry.children.map((child, j) => (
                                <li key={j}>
                                  {child.id ? (
                                    <a href={`#${child.id}`} className="hover:text-accent transition-colors duration-150">
                                      {i + 1}.{j + 1} {child.label}
                                    </a>
                                  ) : (
                                    <span>{i + 1}.{j + 1} {child.label}</span>
                                  )}
                                </li>
                              ))}
                            </ol>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Other guides in this step */}
                {otherItems && otherItems.length > 0 && (
                  <div className="p-4 rounded-xl border border-border bg-background">
                    <p className="text-xs font-medium text-tertiary mb-3">Related Guides</p>
                    <ul className="space-y-2 list-none">
                      {otherItems.map((other) => (
                        <li key={other.slug}>
                          <Link
                            href={`/connectors/${slug}/${stepSlug}/${other.slug}`}
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
          </div>
        </div>
      </div>
    </>
  );
}
