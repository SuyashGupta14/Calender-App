"use client";

import { useMemo } from "react";
import { useCalendar } from "@/hooks/useCalendar";
import { useDateRange } from "@/hooks/useDateRange";
import { useNotes } from "@/hooks/useNotes";
import HeroImage from "./HeroImage";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "@/components/notes/NotesPanel";

export default function CalendarShell() {
  const calendar = useCalendar();
  const range = useDateRange();
  const notesHook = useNotes();

  // Build a Set of all dates that have notes — for dot indicators on grid
  const noteDates = useMemo(() => {
    const set = new Set<string>();
    notesHook.notes.forEach((note) => {
      // Mark every date in the note's range
      const start = new Date(note.startDate);
      const end = new Date(note.endDate);
      const cur = new Date(start);
      while (cur <= end) {
        const y = cur.getFullYear();
        const m = String(cur.getMonth() + 1).padStart(2, "0");
        const d = String(cur.getDate()).padStart(2, "0");
        set.add(`${y}-${m}-${d}`);
        cur.setDate(cur.getDate() + 1);
      }
    });
    return set;
  }, [notesHook.notes]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-6 lg:p-8"
      style={{ backgroundColor: "var(--cal-bg)" }}
    >
      {/*
        Outer card — the "wall calendar" frame
        On desktop: side by side (calendar left, notes right)
        On mobile: stacked (calendar top, notes bottom)
      */}
      <div
        className="w-full max-w-[1100px] rounded-2xl overflow-hidden flex flex-col lg:flex-row"
        style={{
          backgroundColor: "var(--cal-surface)",
          boxShadow: "var(--cal-shadow-lg)",
          border: "1px solid var(--cal-border)",
        }}
      >
        {/* ── LEFT PANEL: Calendar ── */}
        <div
          className="flex flex-col lg:w-[62%] border-b lg:border-b-0 lg:border-r"
          style={{ borderColor: "var(--cal-border)" }}
        >
          {/* Hero photo */}
          <HeroImage
            month={calendar.currentMonth}
            year={calendar.currentYear}
            direction={calendar.direction}
          />

          {/* Blue zigzag wave — exactly like the reference image */}
          <div className="relative w-full overflow-hidden" style={{ height: "28px" }}>
            <svg
              viewBox="0 0 720 28"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <path
                d="M0,28 L0,14 L45,0 L90,14 L135,0 L180,14 L225,0 L270,14 L315,0 L360,14 L405,0 L450,14 L495,0 L540,14 L585,0 L630,14 L675,0 L720,14 L720,28 Z"
                fill="var(--cal-wave)"
              />
            </svg>
          </div>

          {/* Month navigation header */}
          <CalendarHeader
            month={calendar.currentMonth}
            year={calendar.currentYear}
            onPrev={calendar.goToPrevMonth}
            onNext={calendar.goToNextMonth}
            onToday={calendar.goToToday}
          />

          {/* Calendar grid */}
          <div className="flex-1 px-5 py-4">
            <CalendarGrid
              key={`${calendar.currentYear}-${calendar.currentMonth}`}
              days={calendar.days}
              getSelectionState={range.getSelectionState}
              noteDates={noteDates}
              onDayClick={range.handleDayClick}
              onDayHover={range.handleDayHover}
              onMouseLeave={range.handleMouseLeave}
              direction={calendar.direction}
            />
          </div>

          {/* Legend */}
          <div
            style={{
              padding: "6px 24px 16px",
              display: "flex",
              flexWrap: "wrap" as const,
              gap: "8px 16px",
              fontSize: 11,
              color: "var(--cal-text-muted)",
              fontFamily: "var(--font-body)",
              justifyContent: "center",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--cal-blue)", display: "inline-block", flexShrink: 0 }} />
              Range start
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: "var(--cal-blue-light)", display: "inline-block", flexShrink: 0 }} />
              In range
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--cal-blue-dark)", display: "inline-block", flexShrink: 0 }} />
              Range end
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "var(--cal-holiday)", display: "inline-block", flexShrink: 0 }} />
              Holiday
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "var(--cal-blue)", display: "inline-block", flexShrink: 0 }} />
              Has note
            </span>
          </div>
        </div>

        {/* ── RIGHT PANEL: Notes ── */}
        <div className="flex flex-col lg:w-[38%]" style={{ minHeight: "420px" }}>
          <NotesPanel
            notes={notesHook.notes}
            startDate={range.startDate}
            endDate={range.endDate}
            onAddNote={notesHook.addNote}
            onDeleteNote={notesHook.deleteNote}
            onUpdateNote={notesHook.updateNote}
            onClearRange={range.clearRange}
          />
        </div>
      </div>
    </div>
  );
}