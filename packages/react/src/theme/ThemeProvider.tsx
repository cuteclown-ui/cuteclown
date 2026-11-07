"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";

export type ThemeState = {
  theme: string;
  density: string;
  motion: "full" | "system" | "off";
  dir: "ltr" | "rtl";
};

const ThemeContext = createContext<ThemeState | null>(null);

export function applyThemeAttrs(root: HTMLElement, state: ThemeState): void {
  root.dataset.ccTheme = state.theme;
  root.dataset.ccDensity = state.density;
  root.dataset.ccMotion = state.motion;
  root.setAttribute("dir", state.dir);
}

export function clearThemeAttrs(root: HTMLElement): void {
  delete root.dataset.ccTheme;
  delete root.dataset.ccDensity;
  delete root.dataset.ccMotion;
  root.removeAttribute("dir");
}

export function ThemeProvider({
  children,
  theme = "light",
  density = "comfortable",
  motion = "system",
  dir = "ltr",
}: Partial<ThemeState> & { children?: ReactNode }) {
  const value = useMemo<ThemeState>(() => ({ theme, density, motion, dir }), [theme, density, motion, dir]);
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    applyThemeAttrs(document.documentElement, value);
    return () => clearThemeAttrs(document.documentElement);
  }, [value]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeState {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme needs a ThemeProvider");
  }
  return value;
}
