export type ThemeState = {
  theme: string;
  density: string;
  motion: "full" | "system" | "off";
  dir: "ltr" | "rtl";
};

const defaults: ThemeState = { theme: "light", density: "comfortable", motion: "system", dir: "ltr" };

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

export function createThemeProvider(root: HTMLElement, initial: Partial<ThemeState> = {}) {
  const state: ThemeState = { ...defaults, ...initial };
  applyThemeAttrs(root, state);
  return {
    getState: () => ({ ...state }),
    set(next: Partial<ThemeState>) {
      Object.assign(state, next);
      applyThemeAttrs(root, state);
    },
    destroy() {
      clearThemeAttrs(root);
    },
  };
}
