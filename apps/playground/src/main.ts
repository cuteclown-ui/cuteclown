import {
  createAnnouncer,
  createFocusScope,
  createLayerStack,
  createRovingTabIndex,
  setInert,
} from "@cuteclown/core";
import { computeFloatingPosition, resolveResponsivePlacement } from "@cuteclown/core/floating";
import { createThemeProvider } from "../../../packages/vanilla/src/theme/createThemeProvider.ts";
import {
  animateSpring,
  createScheduler,
  microPresets,
  prefersReducedMotion,
  Spring,
  systemClock,
  tweenNumber,
} from "@cuteclown/motion";

const root = document.querySelector("#app");
if (!root) {
  throw new Error("missing #app");
}

root.innerHTML = `
  <a id="skip" class="cc-skip-link" href="#main">Skip to main content</a>
  <main id="main">
  <h1>CuteClown playground</h1>
  <p>Exercise springs, focus, and overlays.</p>
  <button id="move" type="button">Move</button>
  <div id="sprite" data-x="0" data-settled="true">Sprite</div>
  <p id="number">0</p>
  <button id="announce" type="button">Announce</button>
  <div id="toolbar" role="toolbar" aria-label="Tools">
    <button type="button" data-tool="one">One</button>
    <button type="button" data-tool="two">Two</button>
    <button type="button" data-tool="three">Three</button>
  </div>
  <button id="theme" type="button">Use dark theme</button>
  <p id="anchor-row"><button id="anchor" type="button">Show tip</button></p>
  <span id="hidden-status" class="cc-visually-hidden">Status ready</span>
  </main>
  <div id="tip" role="tooltip" hidden>Tip</div>
  <button id="open" type="button">Open dialog</button>
  <div id="dialog" role="dialog" aria-modal="true" aria-label="Example" hidden>
    <button id="dialog-first" type="button">First</button>
    <button id="nested" type="button">Open nested</button>
    <button id="dialog-last" type="button">Close</button>
  </div>
  <div id="nested-dialog" role="dialog" aria-modal="true" aria-label="Nested" hidden>
    <button id="nested-close" type="button">Close nested</button>
  </div>
`;

const style = document.createElement("style");
style.textContent = `
  body { font-family: system-ui, sans-serif; margin: 24px; }
  #sprite { margin: 12px 0; width: 96px; padding: 12px; background: #6e70e8; color: white; }
  #toolbar { display: flex; gap: 8px; margin: 12px 0; }
  [role="dialog"], #tip { margin-top: 12px; padding: 12px; border: 2px solid #24255a; background: white; color: #24255a; }
  .cc-skip-link { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); }
  .cc-skip-link:focus { position: static; width: auto; height: auto; clip: auto; }
  .cc-visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); }
  #tip { position: fixed; margin: 0; }
`;
document.head.append(style);

const sprite = document.querySelector<HTMLElement>("#sprite");
const number = document.querySelector<HTMLElement>("#number");
const move = document.querySelector<HTMLButtonElement>("#move");
const announce = document.querySelector<HTMLButtonElement>("#announce");
const dialog = document.querySelector<HTMLElement>("#dialog");
const nestedDialog = document.querySelector<HTMLElement>("#nested-dialog");
const themeButton = document.querySelector<HTMLButtonElement>("#theme");
const anchor = document.querySelector<HTMLButtonElement>("#anchor");
const tip = document.querySelector<HTMLElement>("#tip");
const page = document.querySelector<HTMLElement>("#main");
const open = document.querySelector<HTMLButtonElement>("#open");
const nested = document.querySelector<HTMLButtonElement>("#nested");
const dialogLast = document.querySelector<HTMLButtonElement>("#dialog-last");
const nestedClose = document.querySelector<HTMLButtonElement>("#nested-close");
const tools = [...document.querySelectorAll<HTMLButtonElement>("#toolbar button")];

if (
  !sprite ||
  !number ||
  !move ||
  !announce ||
  !themeButton ||
  !anchor ||
  !tip ||
  !page ||
  !dialog ||
  !nestedDialog ||
  !open ||
  !nested ||
  !dialogLast ||
  !nestedClose
) {
  throw new Error("playground markup missing a control");
}

const reduced = prefersReducedMotion((query) => window.matchMedia(query));
const preset = reduced ? microPresets.appear.reducedMotion : microPresets.appear;
const spring = new Spring({
  x: 0,
  target: 0,
  response: Math.max(preset.response, 0.01),
  bounce: preset.bounce,
});
const scheduler = createScheduler(
  (flush) => requestAnimationFrame(() => flush()),
  () => undefined,
);
const announcer = createAnnouncer(document);
const stack = createLayerStack(document);
const roving = createRovingTabIndex(tools);
document.querySelector("#toolbar")?.addEventListener("keydown", (event) => {
  roving.onKeyDown(event as KeyboardEvent);
});

function paint() {
  const x = Math.round(spring.x);
  sprite.dataset.x = String(x);
  sprite.dataset.settled = String(spring.settled);
  sprite.style.transform = `translateX(${x}px)`;
  number.textContent = String(tweenNumber(0, 100, x / 180));
}

let stopAnimation = () => undefined;
move.addEventListener("click", () => {
  spring.setTarget(180);
  if (reduced) {
    spring.x = 180;
    spring.v = 0;
    paint();
    return;
  }
  stopAnimation();
  stopAnimation = animateSpring(spring, {
    scheduler,
    clock: systemClock,
    onUpdate: paint,
    onSettle: paint,
  });
});

announce.addEventListener("click", () => {
  announcer.announce("Saved");
});

let dialogScope: { dispose: () => void } | undefined;
let nestedScope: { dispose: () => void } | undefined;

const theme = createThemeProvider(document.documentElement);
themeButton.addEventListener("click", () => {
  const next = theme.getState().theme === "dark" ? "light" : "dark";
  theme.set({ theme: next, motion: "full" });
  themeButton.textContent = next === "dark" ? "Use light theme" : "Use dark theme";
});

anchor.addEventListener("click", () => {
  tip.hidden = false;
  const rect = anchor.getBoundingClientRect();
  const responsive = resolveResponsivePlacement(window.innerWidth, "top");
  const placed = computeFloatingPosition({
    anchor: { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
    floating: { width: responsive.sheet ? window.innerWidth : 160, height: 48 },
    viewport: { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight },
    placement: responsive.placement,
  });
  tip.dataset.placement = placed.placement;
  tip.dataset.sheet = String(responsive.sheet);
  tip.style.left = responsive.sheet ? "0px" : `${placed.x}px`;
  tip.style.top = `${placed.y}px`;
  tip.style.width = responsive.sheet ? "100%" : "160px";
});

open.addEventListener("click", () => {
  dialog.hidden = false;
  setInert(page, true);
  dialogScope = createFocusScope(dialog);
  stack.push({
    id: "dialog",
    element: dialog,
    onDismiss() {
      dialog.hidden = true;
      setInert(page, false);
      dialogScope?.dispose();
      dialogScope = undefined;
    },
  });
});

nested.addEventListener("click", () => {
  nestedDialog.hidden = false;
  nestedScope = createFocusScope(nestedDialog);
  stack.push({
    id: "nested",
    element: nestedDialog,
    onDismiss() {
      nestedDialog.hidden = true;
      nestedScope?.dispose();
      nestedScope = undefined;
    },
  });
});

dialogLast.addEventListener("click", () => stack.dismissTop());
nestedClose.addEventListener("click", () => stack.dismissTop());
paint();
