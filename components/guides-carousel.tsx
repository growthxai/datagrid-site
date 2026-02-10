"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CtaArrow from "@/components/cta-arrow";

type GuideItem = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  publishedAt?: string;
  excerpt?: string;
  image: string;
};

const CTA_LABELS: Record<string, string> = {
  "Document Review": "Get the Analysis",
  Guides: "Read the Guide",
  Industry: "Explore the Report",
};

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function GuidesCarousel({ guides }: { guides: GuideItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (guides.length === 0) return null;

  function navigate(direction: "left" | "right") {
    setActiveIndex((prev) => {
      if (direction === "left") return prev > 0 ? prev - 1 : guides.length - 1;
      return prev < guides.length - 1 ? prev + 1 : 0;
    });
  }

  return (
    <div>
      {/* Navigation arrows */}
      <div className="flex justify-end gap-2 mb-6">
        <button
          onClick={() => navigate("left")}
          className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-secondary hover:text-foreground hover:border-foreground/20 transition-colors duration-200"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() => navigate("right")}
          className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-secondary hover:text-foreground hover:border-foreground/20 transition-colors duration-200"
        >
          <ArrowRight />
        </button>
      </div>

      {/* Image cards — items stay in natural DOM order, Stripe squeezy style */}
      <div className="flex gap-3 h-[420px]">
        {guides.map((guide, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={guide._id}
              onClick={() => setActiveIndex(i)}
              className="relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                flex: isActive ? 4 : 1,
                transition: "flex 700ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Image
                src={guide.image}
                alt={guide.title}
                fill
                className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? "scale-100" : "scale-110"}`}
              />
              <div
                className="absolute inset-0 bg-black/10 transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ opacity: isActive ? 0 : 1 }}
              />
            </div>
          );
        })}
      </div>

      {/* Text content — slides horizontally like Stripe's squeezy carousel */}
      <div className="mt-5 overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {guides.map((guide, i) => (
            <div key={guide._id} className="w-full shrink-0">
              <div className="flex items-start justify-between gap-8">
                <div>
                  <h3 className="text-lg font-medium text-foreground leading-snug">
                    {guide.title}
                  </h3>
                  {guide.excerpt && (
                    <p className="mt-1 text-sm text-secondary max-w-xl">
                      {guide.excerpt}
                    </p>
                  )}
                </div>
                <Link
                  href={`/blog/${guide.slug}`}
                  className="group shrink-0 inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-surface transition-all duration-200 ease-out whitespace-nowrap"
                  tabIndex={i === activeIndex ? 0 : -1}
                >
                  {CTA_LABELS[guide.category || ""] || "Read More"}<CtaArrow />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
