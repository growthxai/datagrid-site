# Datagrid Site

Marketing website for Datagrid — an AI agent platform for the construction industry.

Built with Next.js 15 (App Router), Sanity v3, TypeScript, and Tailwind CSS v4.

## Getting Started

### 1. Clone the repo

```bash
git clone git@github.com:<your-username>/datagrid-site.git
cd datagrid-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Sanity project credentials:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

> **Note:** The site renders with placeholder data when Sanity is not configured, so you can start designing immediately without a Sanity project.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### 5. Sanity Studio

The Sanity Studio is embedded at [http://localhost:3000/studio](http://localhost:3000/studio). You'll need valid Sanity credentials to use it.

## Project Structure

```
app/                    # Next.js App Router pages
  layout.tsx            # Root layout (Nav + Footer)
  page.tsx              # Homepage
  agents/               # Agent marketplace pages
  connectors/           # Connector pages
  blog/                 # Blog/guide pages
  pricing/              # Pricing page
  demo/                 # Demo request page
  careers/              # Careers page
  (legal)/              # Terms & Privacy
  studio/               # Sanity Studio (embedded)
components/             # Shared UI components
  nav.tsx               # Global navigation
  footer.tsx            # Global footer
lib/                    # Utilities
  sanity.ts             # Sanity client config
  queries.ts            # GROQ queries
  placeholder-data.ts   # Fallback data for development
sanity/                 # Sanity CMS
  schema/               # Content schemas
  sanity.config.ts      # Studio config
```

## Key Pages

| Route | Template | Description |
|-------|----------|-------------|
| `/` | Homepage | Hero, featured agents, how it works, CTA |
| `/agents` | Listing | Agent marketplace grid with category filters |
| `/agents/[slug]` | Agent Detail | Full agent page with inputs/outputs/connectors |
| `/blog/[slug]` | Content | Article page with prose styling |
| `/pricing` | Pricing | Tier cards, comparison table, FAQ |

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components)
- **CMS:** Sanity v3 (embedded studio at /studio)
- **Styling:** Tailwind CSS v4 + @tailwindcss/typography
- **Language:** TypeScript
- **Deployment:** Vercel

## Deployment

Push to `main` and Vercel will auto-deploy. Set the environment variables in your Vercel project settings.

## Design Notes

- The visual design is iterated in the browser — everything uses Tailwind utility classes for easy tweaking
- Look for `{/* DESIGN: ... */}` comments in the code marking areas for design refinement
- Color palette is defined in `app/globals.css` — change it there to update everywhere
- Pages fall back to placeholder data when Sanity is empty, so you can design without content
