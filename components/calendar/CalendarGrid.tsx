"use client";

import { DayInfo, SelectionState, DateString } from "@/types/calendar";
import { DAY_NAMES_SHORT } from "@/lib/constants";
import CalendarDay from "./CalendarDay";

interface CalendarGridProps {
  days: DayInfo[];
  getSelectionState: (dateStr: DateString) => SelectionState;
  noteDates: Set<string>;
  onDayClick: (dateStr: DateString) => void;
  onDayHover: (dateStr: DateString) => void;
  onMouseLeave: () => void;
  direction?: "prev" | "next" | null;
}

export default function CalendarGrid({
  days,
  getSelectionState,
  noteDates,
  onDayClick,
  onDayHover,
  onMouseLeave,
  direction,
}: CalendarGridProps) {
  const animClass =
    direction === "prev"
      ? "animate-slide-left"
      : direction === "next"
      ? "animate-slide-right"
      : "animate-fade-in";

  return (
    <div onMouseLeave={onMouseLeave}>
      {/* Day name headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES_SHORT.map((name) => {
          const isWeekend = name === "SAT" || name === "SUN";
          return (
            <div
              key={name}
              className="flex items-center justify-center py-2"
            >
              <span
                className="text-[11px] font-bold tracking-widest uppercase"
                style={{
                  color: isWeekend
                    ? "var(--cal-text-weekend)"
                    : "var(--cal-text-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Day cells — 6 rows × 7 cols */}
      <div className={`grid grid-cols-7 gap-y-0.5 ${animClass}`}>
        {days.map((day, i) => (
          <CalendarDay
            key={day.dateString}
            day={day}
            selectionState={getSelectionState(day.dateString)}
            hasNote={noteDates.has(day.dateString)}
            onClick={() => onDayClick(day.dateString)}
            onMouseEnter={() => onDayHover(day.dateString)}
            style={{ animationDelay: `${i * 8}ms` }}
          />
        ))}
      </div>
    </div>
  );
}