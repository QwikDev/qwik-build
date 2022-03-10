// src/build/index.ts
var isServer = /* @__PURE__ */ (() => typeof process !== "undefined" && process.versions != null && process.versions.node != null)();
var isBrowser = /* @__PURE__ */ (() => typeof window !== "undefined" && window.document != null)();
export {
  isBrowser,
  isServer
};
//# sourceMappingURL=index.mjs.map
