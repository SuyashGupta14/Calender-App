"use client";
import { useState, useEffect } from "react";
import { Note, DateString } from "@/types/calendar";
import { NOTE_COLORS } from "@/lib/constants";

const STORAGE_KEY = "calendar-notes";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNotes(JSON.parse(stored));
      }
    } catch {
      // localStorage unavailable or corrupted — start fresh
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever notes change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // Storage full or unavailable
    }
  }, [notes, isLoaded]);

  function addNote(
    text: string,
    startDate: DateString,
    endDate: DateString
  ): Note {
    const colorIndex = notes.length % NOTE_COLORS.length;
    const newNote: Note = {
      id: crypto.randomUUID(),
      text: text.trim(),
      startDate,
      endDate,
      createdAt: new Date().toISOString(),
      color: NOTE_COLORS[colorIndex],
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function updateNote(id: string, text: string) {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text: text.trim() } : n))
    );
  }

  // Get notes that overlap with a date range
  function getNotesForRange(
    startDate: DateString,
    endDate: DateString
  ): Note[] {
    return notes.filter(
      (n) => n.startDate <= endDate && n.endDate >= startDate
    );
  }

  // Get notes that include a specific date
  function getNotesForDate(dateStr: DateString): Note[] {
    return notes.filter(
      (n) => n.startDate <= dateStr && n.endDate >= dateStr
    );
  }

  return {
    notes,
    addNote,
    deleteNote,
    updateNote,
    getNotesForRange,
    getNotesForDate,
    isLoaded,
  };
}