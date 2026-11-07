export function bindEscape(onEscape: () => void, target: EventTarget = document): () => void {
  const onKeyDown = (event: Event) => {
    if (event instanceof KeyboardEvent && event.key === "Escape") {
      onEscape();
    }
  };
  target.addEventListener("keydown", onKeyDown);
  return () => target.removeEventListener("keydown", onKeyDown);
}
