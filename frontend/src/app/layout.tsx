import type { Metadata } from "next";
import "./globals.css";
import { ThemeSchedulerProvider } from "../components/Theme/ThemeSchedulerProvider";

export const metadata: Metadata = {
  title: "Grand Egyptian Museum | GEM",
  description: "الموقع الرسمي للمتحف المصري الكبير",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="antialiased m-0 p-0">
        <ThemeSchedulerProvider>{children}</ThemeSchedulerProvider>
      </body>
    </html>
  );
}