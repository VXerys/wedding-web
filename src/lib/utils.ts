import type { AttendanceStatus } from "@/types/guestbook";

export const decodeGuestName = (rawName: string | null) => {
  if (!rawName) return "Tamu Undangan";

  const withSpaces = rawName.replace(/\+/g, " ");
  try {
    return decodeURIComponent(withSpaces);
  } catch {
    return withSpaces;
  }
};

export const encodeGuestName = (name: string) =>
  encodeURIComponent(name.trim()).replace(/%20/g, "+");

export const formatRelativeTime = (isoDate: string) => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";

  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });
  const ranges: Array<{
    limit: number;
    divisor: number;
    unit: Intl.RelativeTimeFormatUnit;
  }> = [
    { limit: 60, divisor: 1, unit: "second" },
    { limit: 60 * 60, divisor: 60, unit: "minute" },
    { limit: 60 * 60 * 24, divisor: 60 * 60, unit: "hour" },
    { limit: 60 * 60 * 24 * 7, divisor: 60 * 60 * 24, unit: "day" },
    {
      limit: 60 * 60 * 24 * 30,
      divisor: 60 * 60 * 24 * 7,
      unit: "week",
    },
    {
      limit: 60 * 60 * 24 * 365,
      divisor: 60 * 60 * 24 * 30,
      unit: "month",
    },
    {
      limit: Infinity,
      divisor: 60 * 60 * 24 * 365,
      unit: "year",
    },
  ];

  for (const range of ranges) {
    if (Math.abs(diffSeconds) < range.limit) {
      return rtf.format(Math.round(diffSeconds / range.divisor), range.unit);
    }
  }

  return rtf.format(diffSeconds, "second");
};

export const buildWhatsAppLink = (
  guestName: string,
  invitationUrl: string,
  waNumber: string,
  baseMessage?: string
) => {
  const message =
    baseMessage ??
    `Assalamualaikum ${guestName}, kami mengundang Anda untuk hadir di acara pernikahan kami. Berikut undangannya: ${invitationUrl}`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${waNumber}?text=${encodedMessage}`;
};

export const formatAttendanceLabel = (status: AttendanceStatus) => {
  switch (status) {
    case "Tidak Hadir":
      return "Berhalangan";
    case "Ragu":
      return "Ragu-ragu";
    default:
      return "Hadir";
  }
};
