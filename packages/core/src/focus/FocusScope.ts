const tabbableSelector = "a[href],button,input,select,textarea,[tabindex]";

function tabbables(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(tabbableSelector)].filter(
    (element) => element.tabIndex >= 0 && !element.hasAttribute("disabled"),
  );
}

export function createFocusScope(root: HTMLElement): { dispose: () => void } {
  const previous = root.ownerDocument.activeElement;
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Tab") return;
    const items = tabbables(root);
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) {
      event.preventDefault();
      return;
    }
    const active = root.ownerDocument.activeElement;
    const backward = event.shiftKey;
    if (active === (backward ? first : last) || !root.contains(active)) {
      event.preventDefault();
      (backward ? last : first).focus();
    }
  };
  root.addEventListener("keydown", onKeyDown);
  tabbables(root)[0]?.focus();
  return {
    dispose() {
      root.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement) previous.focus();
    },
  };
}
