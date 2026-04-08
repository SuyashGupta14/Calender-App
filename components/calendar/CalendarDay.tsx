"use client";

import { DayInfo, SelectionState } from "@/types/calendar";
import { CSSProperties } from "react";

interface CalendarDayProps {
  day: DayInfo;
  selectionState: SelectionState;
  hasNote: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  style?: CSSProperties;
}

export default function CalendarDay({
  day,
  selectionState,
  hasNote,
  onClick,
  onMouseEnter,
  style: externalStyle,
}: CalendarDayProps) {
  const isSelected = selectionState === "start" || selectionState === "end" || selectionState === "start-end";
  const isInRange = selectionState === "in-range";
  const isStart = selectionState === "start" || selectionState === "start-end";
  const isEnd = selectionState === "end" || selectionState === "start-end";

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      title={day.isHoliday ? day.holidayName : undefined}
      className={`
        day-cell
        relative flex flex-col items-center justify-center
        h-11 w-full cursor-pointer select-none
        transition-all duration-150
        ${!day.isCurrentMonth ? "opacity-25" : ""}
        ${isInRange ? "rounded-none" : "rounded-full"}
        ${isStart ? "rounded-l-full" : ""}
        ${isEnd ? "rounded-r-full" : ""}
      `}
      style={{
        // Range band background
        backgroundColor: isInRange
          ? "var(--cal-blue-light)"
          : isSelected
          ? "transparent"
          : "transparent",
        ...externalStyle,
      }}
    >
      {/* The circle for start/end/today */}
      <div
        className={`
          relative z-10 flex items-center justify-center
          w-9 h-9 rounded-full
          transition-all duration-200
          ${isSelected ? "animate-pop" : ""}
          ${
            isSelected
              ? "text-white font-semibold"
              : day.isToday
              ? "font-semibold ring-2 ring-offset-1"
              : "hover:bg-black/5 dark:hover:bg-white/10"
          }
        `}
        style={{
          backgroundColor: isSelected
            ? isEnd && !isStart
              ? "var(--cal-blue-dark)"
              : "var(--cal-blue)"
            : day.isToday
            ? "var(--cal-today-bg)"
            : "transparent",
          color: isSelected
            ? "white"
            : day.isToday
            ? "var(--cal-today-ring)"
            : day.isHoliday
            ? "var(--cal-holiday)"
            : day.isWeekend
            ? "var(--cal-text-weekend)"
            : "var(--cal-text-primary)",
          outlineColor: day.isToday ? "var(--cal-today-ring)" : "transparent",
          ...(isSelected
            ? {
                boxShadow: "0 2px 8px rgba(79, 125, 245, 0.35)",
              }
            : {}),
        }}
      >
        <span
          className="text-sm leading-none"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {day.date.getDate()}
        </span>
      </div>

      {/* Dot indicators — side by side when both holiday + note */}
      {(day.isHoliday || hasNote) && !isSelected && (
        <div
          style={{
            position: "absolute",
            bottom: 2,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 3,
            zIndex: 20,
          }}
        >
          {day.isHoliday && (
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: "var(--cal-holiday)",
                display: "block",
              }}
            />
          )}
          {hasNote && (
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: "var(--cal-blue)",
                display: "block",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}