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
                transition: "flex 1400ms linear(0, 0.006, 0.024 2.2%, 0.098 4.5%, 0.532 12.5%, 0.803 17.5%, 0.938 21%, 1.026 24.5%, 1.086 28%, 1.112 30.5%, 1.113 32.5%, 1.094 35%, 1.056 38.5%, 1.018 42.5%, 0.994 46.5%, 0.983 50%, 0.982 53.5%, 0.991 57.5%, 1.003 62.5%, 1.011 67%, 1.013 71%, 1.009 76%, 1.004 82%, 1.001 89%, 1)",
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

      {/* Text content — cross-dissolve in place */}
      <div className="mt-5 relative">
        {guides.map((guide, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={guide._id}
              className="transition-opacity duration-500 ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
                position: i === 0 ? "relative" : "absolute",
                top: i === 0 ? undefined : 0,
                left: i === 0 ? undefined : 0,
                right: i === 0 ? undefined : 0,
              }}
            >
              <div className="flex items-start justify-between gap-8">
                <div>
                  <Link href={`/blog/${guide.slug}`} className="hover:text-accent transition-colors duration-200" tabIndex={isActive ? 0 : -1}>
                    <h3 className="text-lg font-medium leading-snug">
                      {guide.title}
                    </h3>
                  </Link>
                  {guide.excerpt && (
                    <p className="mt-1 text-sm text-secondary max-w-xl">
                      {guide.excerpt}
                    </p>
                  )}
                </div>
                <Link
                  href={`/blog/${guide.slug}`}
                  className="group shrink-0 inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-black/[0.03] transition-all duration-200 ease-out whitespace-nowrap"
                  tabIndex={isActive ? 0 : -1}
                >
                  Read Post<CtaArrow />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
