import { getPageBySlug } from "@/lib/queries";

export const metadata = {
  title: "Terms of Service",
  description: "Datagrid Terms of Service.",
};

export default async function TermsPage() {
  const pageData = await getPageBySlug("terms").catch(() => null);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          {pageData?.title || "Terms of Service"}
        </h1>
        <div className="prose prose-lg max-w-none">
          {/* TODO: Render portable text body when Sanity content exists */}
          <p className="text-secondary">Last updated: January 1, 2025</p>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Datagrid platform, you agree to be bound
            by these Terms of Service. If you do not agree to these terms, do
            not use the platform.
          </p>
          <h2>2. Description of Service</h2>
          <p>
            Datagrid provides AI-powered agents designed to automate construction
            workflows including document review, field operations reporting, and
            project management tasks.
          </p>
          <h2>3. User Accounts</h2>
          <p>
            You are responsible for maintaining the security of your account
            credentials and for all activity that occurs under your account.
          </p>
          <h2>4. Acceptable Use</h2>
          <p>
            You agree to use the platform only for lawful purposes and in
            accordance with these Terms. You agree not to misuse the platform or
            help anyone else do so.
          </p>
          <h2>5. Intellectual Property</h2>
          <p>
            The platform and its original content, features, and functionality
            are owned by Datagrid and are protected by copyright, trademark, and
            other intellectual property laws.
          </p>
          <h2>6. Limitation of Liability</h2>
          <p>
            Datagrid shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising out of your use of the
            platform.
          </p>
          <h2>7. Contact</h2>
          <p>
            For questions about these Terms, please contact us at
            legal@datagrid.com.
          </p>
        </div>
      </div>
    </div>
  );
}
