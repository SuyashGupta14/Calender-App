"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cal-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = saved ? saved === "dark" : prefersDark;
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("cal-theme", next ? "dark" : "light");
  }

  if (!mounted) return <div style={{ width: 56, height: 28 }} />;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        position: "relative",
        width: 56,
        height: 28,
        borderRadius: 14,
        border: "none",
        cursor: "pointer",
        outline: "none",
        background: isDark
          ? "linear-gradient(135deg, #1e3a5f 0%, #2c3e6e 100%)"
          : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
        boxShadow: isDark
          ? "inset 0 1px 4px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)"
          : "inset 0 1px 4px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      {/* Sun icon — always on the LEFT side of the track */}
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: 6,
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 18,
          height: 18,
          opacity: isDark ? 0.4 : 1,
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: "none",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={isDark ? "none" : "#fff"}
          stroke={isDark ? "#64748c" : "#fff"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </span>

      {/* Moon icon — always on the RIGHT side of the track */}
      <span
        style={{
          position: "absolute",
          top: "50%",
          right: 6,
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 18,
          height: 18,
          opacity: isDark ? 1 : 0.5,
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: "none",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={isDark ? "#e0e7ff" : "none"}
          stroke={isDark ? "#c7d2fe" : "#92400e"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      {/* Sliding thumb */}
      <span
        style={{
          position: "absolute",
          top: 3,
          left: 3,
          width: 22,
          height: 22,
          borderRadius: 11,
          background: isDark
            ? "linear-gradient(135deg, #c7d2fe 0%, #e0e7ff 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #fefce8 100%)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          transform: isDark ? "translateX(28px)" : "translateX(0)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 2,
        }}
      />
    </button>
  );
}