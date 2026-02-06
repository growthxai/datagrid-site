import Link from "next/link";
import { getGuides } from "@/lib/queries";
import { PLACEHOLDER_GUIDES } from "@/lib/placeholder-data";

export const metadata = {
  title: "Blog",
  description: "Guides, insights, and updates on AI in construction from the Datagrid team.",
};

export default async function BlogPage() {
  const guidesData = await getGuides().catch(() => []);
  const guides = guidesData.length > 0 ? guidesData : PLACEHOLDER_GUIDES;

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Blog</h1>
          <p className="mt-3 text-lg text-secondary max-w-2xl">
            Guides, case studies, and insights on how AI is transforming
            construction workflows.
          </p>
        </div>

        {/* DESIGN: Blog post card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide._id}
              href={`/blog/${guide.slug.current}`}
              className="group block bg-background rounded-xl border border-border hover:border-accent/40 transition-colors overflow-hidden"
            >
              {/* DESIGN: Featured image placeholder */}
              <div className="aspect-video bg-muted border-b border-border flex items-center justify-center">
                <span className="text-sm text-secondary">Featured Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-secondary">
                    {guide.category?.title}
                  </span>
                  <span className="text-xs text-secondary">
                    {guide.publishedAt
                      ? new Date(guide.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {guide.title}
                </h2>
                <p className="mt-2 text-sm text-secondary line-clamp-2">
                  {guide.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
