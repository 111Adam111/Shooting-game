import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shooting game frontend",
  description: "New frontend with menu and highscore table",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
