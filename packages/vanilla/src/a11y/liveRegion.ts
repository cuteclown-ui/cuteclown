import { createAnnouncer, type Politeness } from "../../../core/src/live/announcer.ts";

export function createLiveRegion(doc: Document = document) {
  const announcer = createAnnouncer(doc);
  return {
    announce(message: string, politeness: Politeness = "polite") {
      announcer.announce(message, politeness);
    },
    dispose() {
      announcer.dispose();
    },
  };
}
