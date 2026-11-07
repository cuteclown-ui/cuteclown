export type AxeLike = {
  run: (node: Element) => Promise<{ violations: Array<{ id: string }> }>;
};

export function runAxe(container: Element, axe: AxeLike): Promise<{ violations: Array<{ id: string }> }> {
  return axe.run(container);
}
