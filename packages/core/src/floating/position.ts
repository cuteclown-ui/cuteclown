import { clampArrow } from "./arrow.ts";

export type Box = { x: number; y: number; width: number; height: number };
export type Side = "top" | "bottom" | "left" | "right";

const flip: Record<Side, Side> = { top: "bottom", bottom: "top", left: "right", right: "left" };

function at(side: Side, anchor: Box, width: number, height: number, pad: number) {
  const [sx, sy] = side === "left" ? [-1, 0] : side === "right" ? [1, 0] : side === "top" ? [0, -1] : [0, 1];
  return {
    x: anchor.x + (sx === 0 ? anchor.width / 2 - width / 2 : sx > 0 ? anchor.width + pad : -width - pad),
    y: anchor.y + (sy === 0 ? anchor.height / 2 - height / 2 : sy > 0 ? anchor.height + pad : -height - pad),
  };
}

function outside(side: Side, pos: { x: number; y: number }, width: number, height: number, view: Box) {
  return side === "left" ? pos.x < view.x : side === "right" ? pos.x + width > view.width : side === "top" ? pos.y < view.y : pos.y + height > view.height;
}

export function computeFloatingPosition({
  anchor,
  floating,
  viewport,
  placement,
  padding = 8,
  arrow = 8,
}: {
  anchor: Box;
  floating: { width: number; height: number };
  viewport: Box;
  placement: Side;
  padding?: number;
  arrow?: number;
}) {
  let side = placement;
  let pos = at(side, anchor, floating.width, floating.height, padding);
  if (outside(side, pos, floating.width, floating.height, viewport)) {
    const nextSide = flip[side];
    const next = at(nextSide, anchor, floating.width, floating.height, padding);
    if (!outside(nextSide, next, floating.width, floating.height, viewport)) {
      side = nextSide;
      pos = next;
    }
  }
  const x = Math.min(Math.max(pos.x, viewport.x), Math.max(viewport.x, viewport.width - floating.width));
  const y = Math.min(Math.max(pos.y, viewport.y), Math.max(viewport.y, viewport.height - floating.height));
  const vertical = side === "left" || side === "right";
  return {
    x,
    y,
    placement: side,
    arrow: {
      x: clampArrow(vertical ? anchor.y + anchor.height / 2 - y : anchor.x + anchor.width / 2 - x, vertical ? floating.height : floating.width, arrow),
      y: arrow / 2,
    },
  };
}
