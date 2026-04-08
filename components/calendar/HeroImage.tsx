"use client";

import Image from "next/image";
import { MONTH_IMAGES, MONTH_NAMES } from "@/lib/constants";

interface HeroImageProps {
  month: number;
  year: number;
  direction?: "prev" | "next" | null;
}

export default function HeroImage({ month, year, direction }: HeroImageProps) {
  const image = MONTH_IMAGES[month];

  const animClass =
    direction === "prev"
      ? "animate-slide-left"
      : direction === "next"
      ? "animate-slide-right"
      : "";

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "210px" }}>
      {/* Photo */}
      <div
        key={`${year}-${month}`}
        className={`absolute inset-0 ${animClass}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 700px"
        />
      </div>

      {/* Dark gradient overlay at bottom for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Month + Year label — bottom right */}
      <div
        key={`label-${year}-${month}`}
        className={`absolute bottom-0 right-0 p-5 text-right ${animClass}`}
      >
        <p
          className="text-sm font-light tracking-[0.25em] text-white/70 uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {year}
        </p>
        <h2
          className="text-3xl font-bold text-white tracking-wide uppercase leading-tight"
          style={{ fontFamily: "var(--font-display)", textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
        >
          {MONTH_NAMES[month]}
        </h2>
      </div>
    </div>
  );
}