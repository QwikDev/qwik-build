// packages/qwik/src/build/index.ts
var isBrowser = /* @__PURE__ */ (() => typeof window !== "undefined" && typeof HTMLElement !== "undefined" && !!window.document && String(HTMLElement).includes("[native code]"))();
var isServer = !isBrowser;
var isDev = /* @__PURE__ */ (() => {
  return globalThis.qDev === true;
})();
export {
  isBrowser,
  isDev,
  isServer
};
//# sourceMappingURL=index.mjs.map
