export function skipLinkProps(href = "#main"): { href: string; className: string } {
  return { href, className: "cc-skip-link" };
}
