import { inject, type ComputedRef, type InjectionKey } from "vue";

export type ThemeState = {
  theme: string;
  density: string;
  motion: "full" | "system" | "off";
  dir: "ltr" | "rtl";
};

export const themeKey: InjectionKey<ComputedRef<ThemeState>> = Symbol("cc-theme");

export function useTheme(): ComputedRef<ThemeState> {
  const value = inject(themeKey);
  if (!value) {
    throw new Error("useTheme needs a ThemeProvider");
  }
  return value;
}
