"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createFocusScope } from "../../../core/src/focus/FocusScope.ts";

export function FocusScope({ children }: { children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    const scope = createFocusScope(node);
    return () => scope.dispose();
  }, []);
  return <div ref={ref}>{children}</div>;
}
