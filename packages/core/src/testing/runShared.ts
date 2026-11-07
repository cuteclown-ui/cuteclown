export const adapterNames = ["vanilla", "react", "vue"] as const;
export type AdapterName = (typeof adapterNames)[number];

export function adapterMatrix(specNames: readonly string[]): Array<{ spec: string; adapter: AdapterName }> {
  return specNames.flatMap((spec) => adapterNames.map((adapter) => ({ spec, adapter })));
}
