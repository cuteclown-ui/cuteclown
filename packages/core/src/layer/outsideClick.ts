export function bindOutsideClick(
  root: HTMLElement,
  onOutside: () => void,
  target: EventTarget = root.ownerDocument,
): () => void {
  const onPointerDown = (event: Event) => {
    const node = event.target;
    if (node instanceof Node && !root.contains(node)) {
      onOutside();
    }
  };
  target.addEventListener("pointerdown", onPointerDown);
  return () => target.removeEventListener("pointerdown", onPointerDown);
}
