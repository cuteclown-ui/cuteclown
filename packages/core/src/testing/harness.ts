export type AdapterHarness = {
  mount: () => HTMLElement;
  interact: (name: string) => void;
  cleanup: () => void;
};
