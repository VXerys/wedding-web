import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const resolveSiteUrl = () => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return "http://localhost:3000";

  try {
    return new URL(raw).toString();
  } catch {
    return "http://localhost:3000";
  }
};

const siteUrl = resolveSiteUrl();
const groom = process.env.NEXT_PUBLIC_GROOM_NAME ?? "Ahmad";
const bride = process.env.NEXT_PUBLIC_BRIDE_NAME ?? "Siti";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `Undangan Pernikahan ${groom} & ${bride}`,
  description: "Undangan pernikahan digital dengan RSVP dan buku ucapan.",
  openGraph: {
    title: `Undangan Pernikahan ${groom} & ${bride}`,
    description: "Undangan pernikahan digital dengan RSVP dan buku ucapan.",
    type: "website",
    url: siteUrl,
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${dmSans.variable} min-h-full flex flex-col font-body text-slate-700 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
