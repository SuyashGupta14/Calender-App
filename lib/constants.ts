export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DAY_NAMES_SHORT = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const NOTE_COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
];

export const MONTH_IMAGES: Record<number, { src: string; alt: string }> = {
  0: { src: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80", alt: "Snowy winter mountain" },
  1: { src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80", alt: "Sunset skies in February" },
  2: { src: "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=900&q=80", alt: "Cherry blossoms in March" },
  3: { src: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=900&q=80", alt: "Blooming April garden" },
  4: { src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80", alt: "Lush green hills of May" },
  5: { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80", alt: "Summer beach in June" },
  6: { src: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=900&q=80", alt: "Sunny July sunflowers" },
  7: { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=900&q=80", alt: "Golden August meadow" },
  8: { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80", alt: "Autumn leaves September" },
  9: { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&q=80", alt: "Fall foliage October" },
  10: { src: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=900&q=80", alt: "Misty November forest" },
  11: { src: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=900&q=80", alt: "Snowy Christmas December" },
};

export const HOLIDAYS: Record<string, string> = {
  "01-26": "Republic Day",
  "03-25": "Holi",
  "04-14": "Dr. Ambedkar Jayanti",
  "08-15": "Independence Day",
  "10-02": "Gandhi Jayanti",
  "10-20": "Dussehra",
  "11-01": "Diwali",
  "11-15": "Guru Nanak Jayanti",
  "12-25": "Christmas",
};