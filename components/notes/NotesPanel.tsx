"use client";

import { useState } from "react";
import { Note, DateString } from "@/types/calendar";
import { formatDisplayDate } from "@/lib/dateUtils";

interface NotesPanelProps {
  notes: Note[];
  startDate: DateString | null;
  endDate: DateString | null;
  onAddNote: (text: string, start: DateString, end: DateString) => void;
  onDeleteNote: (id: string) => void;
  onUpdateNote: (id: string, text: string) => void;
  onClearRange: () => void;
}

export default function NotesPanel({
  notes,
  startDate,
  endDate,
  onAddNote,
  onDeleteNote,
  onUpdateNote,
  onClearRange,
}: NotesPanelProps) {
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const hasRange = !!(startDate && endDate);

  function handleAdd() {
    if (!input.trim() || !startDate || !endDate) return;
    onAddNote(input.trim(), startDate, endDate);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  }

  function startEdit(note: Note) {
    setEditingId(note.id);
    setEditText(note.text);
  }

  function saveEdit(id: string) {
    if (editText.trim()) onUpdateNote(id, editText.trim());
    setEditingId(null);
    setEditText("");
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Panel heading */}
      <div
        style={{
          padding: "18px 20px 16px",
          background: "var(--cal-notes-header-bg)",
          borderBottom: "1px solid var(--cal-border)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Pencil icon */}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--cal-blue)",
              boxShadow: "0 2px 6px rgba(79, 125, 245, 0.3)",
              flexShrink: 0,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
              <path
                d="M11.5 1.5l2 2-9 9H2.5v-2l9-9z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
              color: "var(--cal-text-primary)",
              margin: 0,
            }}
          >
            Notes
          </h3>
        </div>

        {/* Selected range display */}
        {hasRange ? (
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                fontWeight: 500,
                padding: "6px 10px",
                borderRadius: 8,
                backgroundColor: "var(--cal-blue-light)",
                color: "var(--cal-accent)",
                border: "1px solid var(--cal-blue-mid)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 1v4M11 1v4M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>
                {startDate === endDate
                  ? formatDisplayDate(startDate!)
                  : `${formatDisplayDate(startDate!)}  →  ${formatDisplayDate(endDate!)}`}
              </span>
              <button
                onClick={onClearRange}
                aria-label="Clear selection"
                style={{
                  marginLeft: 4,
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--cal-accent)",
                  color: "white",
                  fontSize: 9,
                  border: "none",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <p
            style={{
              fontSize: 12,
              marginTop: 10,
              lineHeight: 1.6,
              color: "var(--cal-text-muted)",
            }}
          >
            Click a date to start, then click another to set a range.
          </p>
        )}
      </div>

      {/* Note input */}
      {hasRange && (
        <div
          className="animate-fade-up"
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--cal-border)",
            flexShrink: 0,
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a note… (Enter to save)"
            rows={2}
            style={{
              width: "100%",
              fontSize: 14,
              resize: "none" as const,
              borderRadius: 12,
              padding: "10px 14px",
              backgroundColor: "var(--cal-surface-2)",
              color: "var(--cal-text-primary)",
              border: "1.5px solid var(--cal-border)",
              fontFamily: "var(--font-body)",
              lineHeight: "1.6",
              outline: "none",
              display: "block",
              boxSizing: "border-box" as const,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--cal-blue)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79, 125, 245, 0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--cal-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <button
            onClick={handleAdd}
            disabled={!input.trim()}
            style={{
              marginTop: 12,
              width: "100%",
              padding: "10px 0",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              color: "white",
              background: "var(--cal-blue)",
              border: "none",
              cursor: input.trim() ? "pointer" : "not-allowed",
              opacity: input.trim() ? 1 : 0.4,
              outline: "none",
              boxShadow: input.trim() ? "0 3px 12px rgba(79, 125, 245, 0.35)" : "none",
            }}
          >
            Add Note
          </button>
        </div>
      )}

      {/* Notes list */}
      <div
        style={{
          flex: 1,
          overflowY: "auto" as const,
          padding: "16px 20px",
        }}
      >
        {notes.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              height: 160,
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--cal-surface-2)",
                border: "1px solid var(--cal-border)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" opacity="0.5">
                <rect x="6" y="4" width="20" height="24" rx="3" stroke="var(--cal-text-secondary)" strokeWidth="1.5"/>
                <path d="M11 11h10M11 16h10M11 21h6" stroke="var(--cal-text-secondary)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p
              style={{
                fontSize: 12,
                textAlign: "center" as const,
                lineHeight: 1.6,
                color: "var(--cal-text-muted)",
              }}
            >
              No notes yet.
              <br />
              Select dates and write something.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
            {notes.map((note) => (
              <div
                key={note.id}
                className="animate-fade-up group"
                style={{
                  position: "relative",
                  borderRadius: 12,
                  padding: "14px 16px",
                  backgroundColor: "var(--cal-surface-2)",
                  border: "1px solid var(--cal-border)",
                  borderLeft: `4px solid ${note.color}`,
                }}
              >
                {/* Date badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 8,
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                    <rect x="2" y="3" width="12" height="11" rx="2" stroke={note.color} strokeWidth="1.5" />
                    <path d="M5 1v4M11 1v4M2 7h12" stroke={note.color} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase" as const,
                      color: note.color,
                      margin: 0,
                    }}
                  >
                    {note.startDate === note.endDate
                      ? formatDisplayDate(note.startDate)
                      : `${formatDisplayDate(note.startDate)} → ${formatDisplayDate(note.endDate)}`}
                  </p>
                </div>

                {/* Note text or edit input */}
                {editingId === note.id ? (
                  <div>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                      rows={3}
                      style={{
                        width: "100%",
                        fontSize: 13,
                        resize: "none" as const,
                        borderRadius: 8,
                        padding: "8px 12px",
                        backgroundColor: "var(--cal-surface)",
                        color: "var(--cal-text-primary)",
                        border: "1.5px solid var(--cal-border)",
                        fontFamily: "var(--font-body)",
                        outline: "none",
                        boxSizing: "border-box" as const,
                        display: "block",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "var(--cal-blue)";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79, 125, 245, 0.12)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "var(--cal-border)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                      <button
                        onClick={() => saveEdit(note.id)}
                        style={{
                          fontSize: 12,
                          padding: "6px 14px",
                          borderRadius: 8,
                          color: "white",
                          fontWeight: 600,
                          background: "var(--cal-blue)",
                          border: "none",
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={{
                          fontSize: 12,
                          padding: "6px 14px",
                          borderRadius: 8,
                          fontWeight: 600,
                          backgroundColor: "var(--cal-surface)",
                          color: "var(--cal-text-secondary)",
                          border: "1px solid var(--cal-border)",
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "var(--cal-text-primary)",
                      margin: 0,
                    }}
                  >
                    {note.text}
                  </p>
                )}

                {/* Action buttons — show on hover */}
                {editingId !== note.id && (
                  <div
                    className="opacity-0 group-hover:opacity-100"
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      display: "flex",
                      gap: 6,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <button
                      onClick={() => startEdit(note)}
                      aria-label="Edit note"
                      style={{
                        width: 30,
                        height: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 7,
                        backgroundColor: "var(--cal-surface)",
                        border: "1px solid var(--cal-border)",
                        color: "var(--cal-text-secondary)",
                        cursor: "pointer",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                        outline: "none",
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 11 11" fill="none">
                        <path d="M8 1.5l1.5 1.5-6 6H2v-1.5l6-6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      aria-label="Delete note"
                      style={{
                        width: 30,
                        height: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 7,
                        backgroundColor: "var(--cal-surface)",
                        border: "1px solid var(--cal-border)",
                        color: "var(--cal-holiday)",
                        cursor: "pointer",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                        outline: "none",
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 11 11" fill="none">
                        <path d="M2 3h7M4.5 3V2h2v1M4 5v3M7 5v3M2.5 3l.5 6h5l.5-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}