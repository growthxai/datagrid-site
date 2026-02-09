"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type LogoItem = {
  slug: string;
  title: string;
  src: string;
  width: number;
};

export default function LogoMarquee({ logos }: { logos: LogoItem[] }) {
  const [paused, setPaused] = useState(false);
  const items = [...logos, ...logos];

  return (
    <div
      className="relative overflow-hidden mt-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[#f1e8e0] to-transparent pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[#f1e8e0] to-transparent pointer-events-none" />

      <div
        className="flex items-center gap-x-6 animate-marquee w-max"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {items.map((logo, i) => (
          <Link
            key={`${logo.slug}-${i}`}
            href={`/connectors/${logo.slug}`}
            className="flex items-center justify-center h-4 shrink-0 opacity-30 hover:opacity-60 transition-opacity duration-300"
          >
            <Image
              src={logo.src}
              alt={logo.title}
              width={Math.round(logo.width * 0.5)}
              height={16}
              className="h-full w-auto object-contain"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
