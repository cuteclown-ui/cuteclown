"use client";

import { useEffect } from "react";
import { createAnnouncer, type Politeness } from "../../../core/src/live/announcer.ts";

export function LiveRegion({ message, politeness = "polite" }: { message: string; politeness?: Politeness }) {
  useEffect(() => {
    const announcer = createAnnouncer();
    announcer.announce(message, politeness);
    return () => announcer.dispose();
  }, [message, politeness]);
  return null;
}
