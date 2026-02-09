import { getPageBySlug } from "@/lib/queries";

export const metadata = {
  title: "Privacy Policy",
  description: "Datagrid Privacy Policy.",
};

export default async function PrivacyPage() {
  const pageData = await getPageBySlug("privacy").catch(() => null);

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground mb-8">
          {pageData?.title || "Privacy Policy"}
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-secondary">Last updated: January 1, 2025</p>
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly, such as your name, email
            address, company name, and role when you request a demo or create an
            account.
          </p>
          <h2>2. How We Use Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve
            the Datagrid platform, communicate with you, and process your
            requests.
          </p>
          <h2>3. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            data. All data is encrypted in transit and at rest.
          </p>
          <h2>4. Data Retention</h2>
          <p>
            We retain your information for as long as your account is active or
            as needed to provide our services and comply with legal obligations.
          </p>
          <h2>5. Third-Party Services</h2>
          <p>
            We may share information with third-party service providers who
            assist us in operating the platform, subject to confidentiality
            agreements.
          </p>
          <h2>6. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your
            personal information at any time by contacting us.
          </p>
          <h2>7. Contact</h2>
          <p>
            For questions about this Privacy Policy, please contact us at
            privacy@datagrid.com.
          </p>
        </div>
      </div>
    </div>
  );
}
