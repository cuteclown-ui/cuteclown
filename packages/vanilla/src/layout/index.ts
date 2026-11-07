export type LayoutKind = "box" | "stack" | "inline" | "grid" | "container";

const className: Record<LayoutKind, string> = {
  box: "cc-box",
  stack: "cc-stack",
  inline: "cc-inline",
  grid: "cc-grid",
  container: "cc-container",
};

export function createLayout(kind: LayoutKind, as = "div", doc: Document = document): HTMLElement {
  const node = doc.createElement(as);
  node.className = className[kind];
  return node;
}
