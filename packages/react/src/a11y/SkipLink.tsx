import { skipLinkProps } from "../../../core/src/a11y/skipLink.ts";

export function SkipLink({ href = "#main" }: { href?: string }) {
  const props = skipLinkProps(href);
  return (
    <a className={props.className} href={props.href}>
      Skip to main content
    </a>
  );
}
