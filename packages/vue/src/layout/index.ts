import { defineComponent, h, type PropType } from "vue";

const className = {
  box: "cc-box",
  stack: "cc-stack",
  inline: "cc-inline",
  grid: "cc-grid",
  container: "cc-container",
} as const;

export const Layout = defineComponent({
  name: "CcLayout",
  props: {
    kind: { type: String as PropType<keyof typeof className>, required: true },
    as: { type: String, default: "div" },
  },
  setup(props, { slots }) {
    return () => h(props.as, { class: className[props.kind] }, slots.default?.());
  },
});
