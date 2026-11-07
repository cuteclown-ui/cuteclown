import { skipLinkProps } from "../../../core/src/a11y/skipLink.ts";

export function createSkipLink(href = "#main", doc: Document = document): HTMLAnchorElement {
  const link = doc.createElement("a");
  const props = skipLinkProps(href);
  link.href = props.href;
  link.className = props.className;
  link.textContent = "Skip to main content";
  return link;
}
