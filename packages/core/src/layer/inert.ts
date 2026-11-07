export function setInert(element: HTMLElement, inert: boolean): void {
  if (inert) {
    element.setAttribute("inert", "");
    element.setAttribute("aria-hidden", "true");
    return;
  }
  element.removeAttribute("inert");
  element.removeAttribute("aria-hidden");
}
