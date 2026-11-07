import { createFocusScope } from "../../../core/src/focus/FocusScope.ts";

export function bindFocusScope(root: HTMLElement): { dispose: () => void } {
  return createFocusScope(root);
}
