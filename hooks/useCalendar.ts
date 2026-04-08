"use client";
import { useState, useCallback } from "react";
import { CalendarState, DayInfo } from "@/types/calendar";
import { buildCalendarDays } from "@/lib/dateUtils";

export function useCalendar() {
  const today = new Date();

  const [state, setState] = useState<CalendarState>({
    currentMonth: today.getMonth(),
    currentYear: today.getFullYear(),
  });

  // Track which direction the user navigated — "prev" or "next"
  const [direction, setDirection] = useState<"prev" | "next" | null>(null);

  const days: DayInfo[] = buildCalendarDays(state.currentYear, state.currentMonth);

  const goToPrevMonth = useCallback(() => {
    setDirection("prev");
    setState((prev) => {
      if (prev.currentMonth === 0) {
        return { currentMonth: 11, currentYear: prev.currentYear - 1 };
      }
      return { ...prev, currentMonth: prev.currentMonth - 1 };
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setDirection("next");
    setState((prev) => {
      if (prev.currentMonth === 11) {
        return { currentMonth: 0, currentYear: prev.currentYear + 1 };
      }
      return { ...prev, currentMonth: prev.currentMonth + 1 };
    });
  }, []);

  const goToToday = useCallback(() => {
    setDirection("next");
    setState({
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
    });
  }, [today]);

  return {
    currentMonth: state.currentMonth,
    currentYear: state.currentYear,
    days,
    direction,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  };
}