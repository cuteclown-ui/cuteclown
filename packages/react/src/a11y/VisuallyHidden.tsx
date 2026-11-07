import type { ReactNode } from "react";
import { visuallyHiddenStyle } from "../../../core/src/a11y/visuallyHidden.ts";

export function VisuallyHidden({ children }: { children?: ReactNode }) {
  return (
    <span className="cc-visually-hidden" style={visuallyHiddenStyle}>
      {children}
    </span>
  );
}
