import type { Metadata } from "next";
import "./globals.css"; // Global styles

export const metadata: Metadata = {
  title: "Career Plus Placement | Under Maintenance",
  description:
    "We are currently updating our website to bring you a better experience. Please check back soon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased bg-zinc-950 text-zinc-50 selection:bg-zinc-800"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
