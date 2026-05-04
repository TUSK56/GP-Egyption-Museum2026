"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type ResolvedTheme = "light" | "dark";

type ThemeSchedulerContextValue = {
  resolvedTheme: ResolvedTheme;
};

const AUTO_LIGHT_START_HOUR = 7;
const AUTO_DARK_START_HOUR = 19;

const ThemeSchedulerContext = createContext<ThemeSchedulerContextValue | undefined>(undefined);

function getCairoHour(): number {
  const hour = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    hour: "2-digit",
    hour12: false,
  }).format(new Date());

  return Number.parseInt(hour, 10);
}

function resolveTheme(): ResolvedTheme {
  const cairoHour = getCairoHour();
  return cairoHour >= AUTO_LIGHT_START_HOUR && cairoHour < AUTO_DARK_START_HOUR ? "light" : "dark";
}

export function ThemeSchedulerProvider({ children }: { children: React.ReactNode }) {
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");

  useEffect(() => {
    const apply = () => {
      const nextTheme = resolveTheme();
      setResolvedTheme(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      document.documentElement.setAttribute("data-theme-mode", "auto");
    };

    apply();

    const now = new Date();
    const msToNextHour =
      ((60 - now.getMinutes()) * 60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      apply();
      intervalId = window.setInterval(apply, 60 * 60 * 1000);
    }, Math.max(msToNextHour, 1000));

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      resolvedTheme,
    }),
    [resolvedTheme],
  );

  return <ThemeSchedulerContext.Provider value={value}>{children}</ThemeSchedulerContext.Provider>;
}

export function useThemeScheduler() {
  const context = useContext(ThemeSchedulerContext);
  if (!context) {
    throw new Error("useThemeScheduler must be used within ThemeSchedulerProvider");
  }

  return context;
}
