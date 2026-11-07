import { createElement, type ReactNode } from "react";

const className = {
  box: "cc-box",
  stack: "cc-stack",
  inline: "cc-inline",
  grid: "cc-grid",
  container: "cc-container",
} as const;

export function Layout({
  kind,
  as = "div",
  children,
}: {
  kind: keyof typeof className;
  as?: "div" | "section" | "main" | "nav";
  children?: ReactNode;
}) {
  return createElement(as, { className: className[kind] }, children);
}
