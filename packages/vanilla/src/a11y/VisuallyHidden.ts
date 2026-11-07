import { visuallyHiddenStyle } from "../../../core/src/a11y/visuallyHidden.ts";

export function createVisuallyHidden(text: string, doc: Document = document): HTMLSpanElement {
  const node = doc.createElement("span");
  node.className = "cc-visually-hidden";
  node.textContent = text;
  for (const [key, value] of Object.entries(visuallyHiddenStyle)) {
    node.style.setProperty(key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`), value);
  }
  return node;
}
