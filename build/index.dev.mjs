// packages/qwik/src/build/index.ts
var isBrowser = /* @__PURE__ */ (() => typeof window !== "undefined" && typeof HTMLElement !== "undefined" && !!window.document && String(HTMLElement).includes("[native code]"))();
var isServer = !isBrowser;

// packages/qwik/src/build/index.dev.ts
var isDev = true;
export {
  isBrowser,
  isDev,
  isServer
};
//# sourceMappingURL=index.dev.mjs.map
