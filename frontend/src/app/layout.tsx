import type { Metadata } from "next";
import "./globals.css";
import { ThemeSchedulerProvider } from "../components/Theme/ThemeSchedulerProvider";
import MaintenanceGate from "../components/MaintenanceGate";
import MuseumPrefetch from "../components/MuseumPrefetch";
import { MuseumDataProvider } from "../components/MuseumDataProvider";
import { DEFAULT_API_BASE_URL, normalizeApiBaseUrl } from "../lib/apiConfig";
import { getCategoriesServer } from "../lib/serverMuseumApi";

export const metadata: Metadata = {
  title: "Grand Egyptian Museum | GEM",
  description: "الموقع الرسمي للمتحف المصري الكبير",
};

function apiOrigin() {
  return normalizeApiBaseUrl(
    process.env.NEXT_INTERNAL_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      DEFAULT_API_BASE_URL,
  );
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const origin = apiOrigin();
  // Only prefetch categories at build — full artifacts payload is ~29MB and breaks Netlify cache.
  const categories = await getCategoriesServer().catch(() => null);

  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="dns-prefetch" href={origin} />
        <link rel="preconnect" href={origin} crossOrigin="anonymous" />
      </head>
      <body className="antialiased m-0 p-0">
        <MuseumDataProvider artifacts={null} categories={categories}>
          <ThemeSchedulerProvider>
            <MuseumPrefetch />
            <MaintenanceGate />
            {children}
          </ThemeSchedulerProvider>
        </MuseumDataProvider>
      </body>
    </html>
  );
}
