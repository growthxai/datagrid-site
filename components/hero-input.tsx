"use client";

import { useState, useEffect } from "react";

const PLACEHOLDERS = [
  "Which fire should I put out first?",
  "Point me to the documents.",
  "Let's get something done.",
];

export default function HeroInput() {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const hasValue = value.trim().length > 0;

  return (
    <div className="relative flex items-center w-[22rem] rounded-lg border border-[#d4c8bc] bg-white/60 pr-1 py-1">
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 py-2 text-sm font-medium bg-transparent text-[#1a1a1a] focus:outline-none"
        />
        {!hasValue && (
          <span className="pointer-events-none absolute inset-0 flex items-center px-4 text-sm text-[#8a7e74] transition-opacity duration-500">
            <span
              key={index}
              className="animate-placeholder-fade"
            >
              {PLACEHOLDERS[index]}
            </span>
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={!hasValue}
        className="shrink-0 px-4 py-2 bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent-hover transition-all duration-200 ease-out rounded-[3px] flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none"
      >
        Try Now
      </button>
    </div>
  );
}
