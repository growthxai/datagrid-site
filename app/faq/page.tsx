"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import BlueprintBg from "@/components/blueprint-bg";

const FAQS = [
  {
    question: "Are there controls to prevent one client attempting to compromise another client in a resource pooled environment?",
    answer: "Yes, each client\u2019s data is segmented into separate containers in AWS. Each client\u2019s API calls in their Datagrid account are unaffected by another client\u2019s API call to the same resource. An example of such a resource is Procore.",
  },
  {
    question: "Are Intrusion Detection/Prevention Systems employed in all sensitive network zones and wherever firewalls are enabled?",
    answer: "Yes, Datagrid is hosted on AWS and so utilizes AWS GuardDuty and CloudWatch.",
  },
  {
    question: "Are specific response and recovery strategies defined for the prioritized activities?",
    answer: "Yes, while backups are performed daily, recovery is tested on a weekly basis to ensure recoveries are performing to plan.",
  },
  {
    question: "Is standards based federated ID capability available to clients (e.g., SAML, OpenID)?",
    answer: "Currently, Datagrid supports SSO (Google, Microsoft & Okta). Any other type of federated ID can be scoped and supported if needed.",
  },
  {
    question: "Is there a scheduled maintenance window?",
    answer: "Major updates are released on a monthly schedule with point releases over the same time interval. When needed, Datagrid publishes maintenance windows. Typically maintenance and updates are performed with no downtime.",
  },
  {
    question: "Is there a formal process to ensure clients are notified prior to changes being made which may impact their service?",
    answer: "If there are any product updates that may impact the clients\u2019 workflows, the customer success team communicates that to the clients and helps maintain the workflow prior and post the updates.",
  },
  {
    question: "Is data segmentation and separation capability between clients provided?",
    answer: "Yes, customer data is logically separated at the database/datastore level using a unique identifier for the customer. The separation is enforced at the API layer where the client must authenticate with a chosen account and then the customer unique identifier is included in the access token and used by the API to restrict access to data to the account. All database/datastore queries then include the account identifier.",
  },
  {
    question: "Does the provider have an RTO (recovery time objective) and RPO (recovery point objective) for specific applications, products or systems?",
    answer: "Yes. For Datagrid\u2019s product & engineering systems, the RTO & RPO is 24 hours.",
  },
  {
    question: "Does the provider test its incident response and disaster preparedness?",
    answer: "Yes, yearly. The incident response plan is tested annually via either tabletop review or an incident simulation.",
  },
  {
    question: "Does the provider utilize Next Generation Firewall (NGFW) or Unified Threat Management (UTM)?",
    answer: "We use AWS tools, like GuardDuty, for our production environment. In addition, Google also has tools for our accounts. Web Application Firewall (WAF) ACLs have been created on the AWS infrastructure to protect the application from external threats.",
  },
  {
    question: "Does the service log user activity (customer and vendor)?",
    answer: "Yes. Activity is logged via AWS CloudWatch.",
  },
  {
    question: "Does the service require a minimum complexity for passwords?",
    answer: "Yes, Datagrid requires a minimum complexity for passwords. Additionally, Datagrid supports SSO.",
  },
  {
    question: "Describe your encryption protocols and how they apply to transacted data.",
    answer: "Data at rest: Data at rest in Datagrid\u2019s production network is encrypted using industry-standard 256-bit Advanced Encryption Standard (AES-256), which applies to all types of data at rest within Datagrid\u2019s systems\u2014relational databases, file stores, database backups, etc. Data in transit: To protect data in transit between our app and our servers, Datagrid supports the latest recommended secure cipher suites to encrypt all traffic in transit, including the use of TLS 1.2 protocols, AES-256 encryption, and SHA2 signatures.",
  },
  {
    question: "Does the service undergo 3rd party security assessment on a regular basis?",
    answer: "Yes, we are GDPR, SOC 2 Type I & II compliant. In addition, Datagrid undergoes a yearly penetration test and quarterly vulnerability scans.",
  },
  {
    question: "Does the application support the ability to create security groups and roles for controlling access?",
    answer: "Datagrid provides role based access control where users are grouped as \u201cOwners\u201d, \u201cMembers\u201d, and \u201cCollaborators\u201d; each group maintains their own set of permissions.",
  },
  {
    question: "Are application integrations secured using credentials managed by a customer designated administrator?",
    answer: "Integration credentials are managed via the customer designated administrator. Datagrid stores credentials encrypted with the passkey managed via AWS Secret Manager. Encrypted credentials never leave the server environment.",
  },
  {
    question: "Does the application store credit card data?",
    answer: "At the product level Datagrid does not store credit card information. When necessary, Datagrid uses a PCI compliant partner, Stripe.",
  },
  {
    question: "Does the application provide the ability to recover and restore accidentally deleted data?",
    answer: "While Datagrid does not expose a \u201ctrash can\u201d at the moment, items in Datagrid are \u201csoft-deleted\u201d allowing for recovery. Additionally through the connected integrations Datagrid supports the re-ingestion of deleted data if needed.",
  },
  {
    question: "What are the minimum browser requirements for using the application?",
    answer: "Datagrid is optimized for the latest Google Chrome, Microsoft Edge & Safari browsers.",
  },
  {
    question: "Does the application require the download of any software to users\u2019 PCs?",
    answer: "Datagrid is a cloud-hosted solution. As such, it does not require any software to be downloaded to the users\u2019 PCs. Integrations against desktop applications may require the installation of a plugin to the integration target. For example, integrating data from Revit, Navisworks, etc. is accelerated via the installation of Datagrid provided plugins for these tools.",
  },
  {
    question: "Is the solution multi-tenanted? If so, what restrictions are there on usage?",
    answer: "Datagrid is a multi-tenanted solution. API usage is limited to 3,000 requests/hour, but can be increased if/as needed.",
  },
  {
    question: "How and where is the technology or service hosted?",
    answer: "Datagrid stores customer data in a secure production account in Amazon Web Services (AWS), using RDS and S3. Datagrid hosts on AWS in the us-east-1 (N. Virginia) region by default. Data is replicated across multiple regions for redundancy and disaster recovery.",
  },
  {
    question: "Do you supply prebuilt content?",
    answer: "Yes, we have pre-built template workflows and dashboards/reports around BIM (design comparison, 4D\u20137D), PM, Cost analysis, etc.",
  },
  {
    question: "Does the provider maintain and enforce disk encryption policies?",
    answer: "Yes, checked daily. Data is persisted in AWS S3, configured for AES-256 encrypted disks for all data stored at rest. Datagrid ensures that company-issued laptops have encrypted hard-disks.",
  },
  {
    question: "Does the provider maintain multifactor authentication audit processes?",
    answer: "Yes. We\u2019ve undergone SOC 2 Type 1 & Type 2 assessment. Datagrid employs automated tools (Drata) auditing compliance with policy.",
  },
  {
    question: "Does the application provide the ability for customers to export their data on demand?",
    answer: "Datagrid supports exports to CSV, XLSX, JSON and Parquet. In addition to export format choice, we support a number of export destinations such as S3, Azure, Dropbox, etc. When exporting at the row level we support automated exports to external databases, including BigQuery, MS SQL, MySQL, RDS, and more.",
  },
  {
    question: "What data targets and physical data products are used?",
    answer: "We have an internal Data Table (built on top of SQL) or we can push data to external databases like Azure, Amazon RDS, Redshift, Aurora, GCP (BigQuery, MySQL, PostgreSQL, SQL Server), Databricks, Snowflake, MariaDB, MySQL, MS SQL, PostgreSQL.",
  },
  {
    question: "What platform is used to store PII, HIPAA, Financial, or Proprietary data?",
    answer: "We don\u2019t manage PII data. No specific controls for HIPAA, Financial or Proprietary. We use Stripe to store PCI data.",
  },
  {
    question: "Is multifactor authentication required for your employees to access various platforms and services?",
    answer: "Yes, MFA is required for accessing Datagrid accounts and systems. Username and password or SSO required to authenticate into the Datagrid application, and MFA required for external services. MFA must be enabled for any and all key Datagrid systems that provide the option\u2014Google, AWS, GitHub, and Slack.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-medium text-foreground leading-relaxed">{question}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 mt-0.5 text-tertiary transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
          open ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <p className="text-sm text-secondary leading-relaxed pb-5">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "FAQ" },
        ]}
        title="FAQs"
        description="Because good decisions start with clear answers."
        variant="agents"
        heroBg="white"
      />

      <div className="pb-16 sm:pb-20 lg:pb-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div>
            {FAQS.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
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
