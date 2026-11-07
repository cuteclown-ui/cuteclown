export function tab(target: HTMLElement, shift = false): void {
  target.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", shiftKey: shift, bubbles: true, cancelable: true }));
}

export function shiftTab(target: HTMLElement): void {
  tab(target, true);
}
