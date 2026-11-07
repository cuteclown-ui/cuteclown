import type { Side } from "./position.ts";

export function resolveResponsivePlacement(
  viewportWidth: number,
  placement: Side,
  narrow = 640,
): { placement: Side; sheet: boolean } {
  if (viewportWidth < narrow) {
    return { placement: "bottom", sheet: true };
  }
  return { placement, sheet: false };
}
