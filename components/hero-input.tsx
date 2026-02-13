"use client";

import { useState, useEffect, useRef } from "react";

const PLACEHOLDERS = [
  "Which fire should I put out first?",
  "Point me to the documents.",
  "Let's get something done.",
];

export default function HeroInput() {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (active) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    }
    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [active]);

  function handleActivate() {
    setActive(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  const hasValue = value.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full sm:w-[22rem]">
      {/* Input bar — stays in place, does not expand horizontally */}
      <div
        onClick={!active ? handleActivate : undefined}
        className={`relative flex items-center rounded-lg border bg-white/60 pr-1 py-1 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          active
            ? "border-accent/40 shadow-lg shadow-accent/5"
            : "border-[#d4c8bc] cursor-pointer"
        }`}
      >
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setActive(true)}
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
          className="shrink-0 px-4 py-2 bg-accent text-accent-foreground text-sm font-medium hover:bg-accent-hover transition-all duration-200 ease-out rounded-[3px] flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none"
        >
          Try Now
        </button>
      </div>

      {/* Dropdown popover */}
      <div
        className={`absolute z-20 left-0 w-full mt-1 pointer-events-none ${
          active ? "animate-dropdown-in pointer-events-auto" : "opacity-0 -translate-y-1 scale-[0.98]"
        }`}
        style={{ transformOrigin: "top" }}
      >
        <div className="rounded-lg bg-white/80 backdrop-blur-sm p-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
          <p className="text-sm text-[#8a7e74] mb-3">Try asking about...</p>
          <div className="flex flex-wrap gap-2">
            {["Submittal reviews", "RFI tracking", "Daily logs", "Change orders"].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setValue(suggestion);
                  inputRef.current?.focus();
                }}
                className="px-3 py-1.5 text-sm font-medium text-[#6b6b6b] bg-[#f0eded] rounded-md hover:bg-[#e5e2e2] transition-colors duration-150"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
