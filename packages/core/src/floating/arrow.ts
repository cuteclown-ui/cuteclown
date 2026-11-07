export function clampArrow(offset: number, floatingSize: number, arrowSize: number, padding = 4): number {
  const min = padding + arrowSize / 2;
  const max = Math.max(min, floatingSize - padding - arrowSize / 2);
  return Math.min(Math.max(offset, min), max);
}
