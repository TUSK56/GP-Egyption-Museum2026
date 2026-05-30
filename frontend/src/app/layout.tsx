import type { Metadata } from "next";
import "./globals.css";
import { ThemeSchedulerProvider } from "../components/Theme/ThemeSchedulerProvider";
import MaintenanceGate from "../components/MaintenanceGate";
import MuseumPrefetch, { museumApiOrigin } from "../components/MuseumPrefetch";

export const metadata: Metadata = {
  title: "Grand Egyptian Museum | GEM",
  description: "الموقع الرسمي للمتحف المصري الكبير",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiOrigin = museumApiOrigin();
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="dns-prefetch" href={apiOrigin} />
        <link rel="preconnect" href={apiOrigin} crossOrigin="anonymous" />
      </head>
      <body className="antialiased m-0 p-0">
        <ThemeSchedulerProvider>
          <MuseumPrefetch />
          <MaintenanceGate />
          {children}
        </ThemeSchedulerProvider>
      </body>
    </html>
  );
}