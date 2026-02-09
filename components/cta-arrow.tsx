export default function CtaArrow() {
  return (
    <span className="inline-flex items-center w-3.5 ml-1.5 overflow-hidden">
      {/* Shaft slides in, pushing chevron right */}
      <span className="w-0 group-hover:w-[5px] h-[1.5px] bg-current rounded-full transition-[width] duration-200 ease-out shrink-0" />
      {/* Chevron head */}
      <svg width="7" height="10" viewBox="0 0 7 10" fill="none" className="shrink-0">
        <path d="M1.5 1L5.5 5L1.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
