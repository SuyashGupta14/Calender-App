import { DayInfo, DateString } from "../types/calendar";
import { HOLIDAYS } from "./constants";

// Format a Date to "YYYY-MM-DD"
export function toDateString(date: Date): DateString {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Parse "YYYY-MM-DD" back to a Date (local time, no timezone shift)
export function fromDateString(dateStr: DateString): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Get today's date string
export function getTodayString(): DateString {
  return toDateString(new Date());
}

// Check if a date string is a holiday
export function getHolidayName(dateStr: DateString): string | undefined {
  const monthDay = dateStr.slice(5); // "MM-DD"
  return HOLIDAYS[monthDay];
}

// Build the full grid of days for a given month
// Always starts on Monday, always 6 rows (42 cells)
export function buildCalendarDays(year: number, month: number): DayInfo[] {
  const today = getTodayString();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // dayOfWeek: 0=Sun,1=Mon...6=Sat → convert to Mon-first (0=Mon...6=Sun)
  const startDow = (firstDay.getDay() + 6) % 7;

  const days: DayInfo[] = [];

  // Days from previous month
  for (let i = startDow - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    const dateString = toDateString(date);
    days.push({
      date,
      dateString,
      isCurrentMonth: false,
      isToday: dateString === today,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      isHoliday: !!getHolidayName(dateString),
      holidayName: getHolidayName(dateString),
    });
  }

  // Days in current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    const dateString = toDateString(date);
    days.push({
      date,
      dateString,
      isCurrentMonth: true,
      isToday: dateString === today,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      isHoliday: !!getHolidayName(dateString),
      holidayName: getHolidayName(dateString),
    });
  }

  // Days from next month to fill 42 cells
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    const date = new Date(year, month + 1, d);
    const dateString = toDateString(date);
    days.push({
      date,
      dateString,
      isCurrentMonth: false,
      isToday: dateString === today,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      isHoliday: !!getHolidayName(dateString),
      holidayName: getHolidayName(dateString),
    });
  }

  return days;
}

// Check if a dateString falls between start and end (inclusive)
export function isInRange(
  dateStr: DateString,
  start: DateString | null,
  end: DateString | null
): boolean {
  if (!start || !end) return false;
  return dateStr >= start && dateStr <= end;
}

// Format "YYYY-MM-DD" → "April 7, 2026"
export function formatDisplayDate(dateStr: DateString): string {
  const date = fromDateString(dateStr);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}