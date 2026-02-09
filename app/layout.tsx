import type { Metadata } from "next";
import localFont from "next/font/local";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

const polysans = localFont({
  src: [
    { path: "../public/fonts/PolySans-Neutral.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/PolySans-Median.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/PolySans-Bulky.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-polysans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Datagrid — AI Agents for Construction",
    template: "%s | Datagrid",
  },
  description:
    "Automate document review, field operations, and project workflows with AI agents built for the construction industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${polysans.variable} font-sans antialiased`}>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
