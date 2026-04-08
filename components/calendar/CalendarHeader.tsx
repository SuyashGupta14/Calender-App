"use client";

import { MONTH_NAMES } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface CalendarHeaderProps {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  month,
  year,
  onPrev,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 24px",
        borderBottom: "1px solid var(--cal-border)",
      }}
    >
      {/* Left — Today button */}
      <button
        onClick={onToday}
        style={{
          fontSize: 12,
          fontWeight: 600,
          padding: "6px 16px",
          borderRadius: 20,
          border: "1.5px solid var(--cal-blue)",
          color: "var(--cal-blue)",
          fontFamily: "var(--font-body)",
          backgroundColor: "var(--cal-blue-light)",
          cursor: "pointer",
          outline: "none",
          whiteSpace: "nowrap" as const,
        }}
      >
        Today
      </button>

      {/* Center — Month Year + arrows */}
      <div className="flex items-center gap-3">
        <button
          onClick={onPrev}
          aria-label="Previous month"
          className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-90"
          style={{
            color: "var(--cal-text-secondary)",
            backgroundColor: "var(--cal-surface-2)",
            border: "1px solid var(--cal-border)",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8l4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h3
          className="text-base font-semibold min-w-[150px] text-center"
          style={{
            color: "var(--cal-text-primary)",
            fontFamily: "var(--font-display)",
            letterSpacing: "0.02em",
          }}
        >
          {MONTH_NAMES[month]} {year}
        </h3>

        <button
          onClick={onNext}
          aria-label="Next month"
          className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-90"
          style={{
            color: "var(--cal-text-secondary)",
            backgroundColor: "var(--cal-surface-2)",
            border: "1px solid var(--cal-border)",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Right — Theme toggle */}
      <ThemeToggle />
    </div>
  );
}