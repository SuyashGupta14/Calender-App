"use client";
import { useState } from "react";
import { DateString, SelectionState } from "@/types/calendar";

interface DateRangeState {
  startDate: DateString | null;
  endDate: DateString | null;
  hoverDate: DateString | null;
}

export function useDateRange() {
  const [range, setRange] = useState<DateRangeState>({
    startDate: null,
    endDate: null,
    hoverDate: null,
  });

  // Called when user clicks a day
  function handleDayClick(dateStr: DateString) {
    setRange((prev) => {
      // Case 1: nothing selected yet → set start
      if (!prev.startDate) {
        return { ...prev, startDate: dateStr, endDate: null };
      }

      // Case 2: start selected, no end yet
      if (prev.startDate && !prev.endDate) {
        // If clicked before start → swap
        if (dateStr < prev.startDate) {
          return { ...prev, startDate: dateStr, endDate: prev.startDate };
        }
        // Same day → single day selection
        if (dateStr === prev.startDate) {
          return { ...prev, endDate: dateStr };
        }
        // Normal: set end
        return { ...prev, endDate: dateStr };
      }

      // Case 3: both selected → reset and start fresh
      return { startDate: dateStr, endDate: null, hoverDate: null };
    });
  }

  // Called on mouse enter for hover preview
  function handleDayHover(dateStr: DateString) {
    if (range.startDate && !range.endDate) {
      setRange((prev) => ({ ...prev, hoverDate: dateStr }));
    }
  }

  function handleMouseLeave() {
    setRange((prev) => ({ ...prev, hoverDate: null }));
  }

  // Get the visual state of any given day
  function getSelectionState(dateStr: DateString): SelectionState {
    const { startDate, endDate, hoverDate } = range;

    // Determine the effective end (real end or hover preview)
    const effectiveEnd = endDate ?? hoverDate;

    if (!startDate) return "none";

    // Normalize so low is always start
    const low = effectiveEnd && effectiveEnd < startDate ? effectiveEnd : startDate;
    const high = effectiveEnd && effectiveEnd < startDate ? startDate : effectiveEnd;

    if (dateStr === low && dateStr === high) return "start-end";
    if (dateStr === low) return "start";
    if (dateStr === high) return "end";
    if (high && dateStr > low && dateStr < high) return "in-range";

    return "none";
  }

  function clearRange() {
    setRange({ startDate: null, endDate: null, hoverDate: null });
  }

  const hasSelection = !!(range.startDate && range.endDate);

  return {
    startDate: range.startDate,
    endDate: range.endDate,
    hoverDate: range.hoverDate,
    hasSelection,
    handleDayClick,
    handleDayHover,
    handleMouseLeave,
    getSelectionState,
    clearRange,
  };
}