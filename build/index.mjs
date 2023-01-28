// packages/qwik/src/build/index.ts
var isBrowser = /* @__PURE__ */ (() => typeof window !== "undefined" && typeof HTMLElement !== "undefined" && !!window.document && String(HTMLElement).includes("[native code]"))();
var isServer = !isBrowser;
export {
  isBrowser,
  isServer
};
//# sourceMappingURL=index.mjs.map
