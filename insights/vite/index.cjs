"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/qwik/src/insights/vite/index.ts
var vite_exports = {};
__export(vite_exports, {
  qwikInsights: () => qwikInsights
});
module.exports = __toCommonJS(vite_exports);

// packages/qwik/src/insights/vite/insights-plugin.ts
var import_fs = require("fs");
var import_promises = require("fs/promises");
var import_node_path = require("node:path");
var logWarn = (message, ...rest) => {
  console.warn("\x1B[33m%s\x1B[0m", `qwikInsight()[WARN]: ${message}`, ...rest);
};
var log = (message) => {
  console.log("\x1B[35m%s\x1B[0m", `qwikInsight(): ${message}`);
};
async function qwikInsights(qwikInsightsOpts) {
  const { publicApiKey, baseUrl = "https://insights.qwik.dev", outDir = "" } = qwikInsightsOpts;
  let isProd = false;
  const vitePlugin = {
    name: "vite-plugin-qwik-insights",
    enforce: "pre",
    apply: "build",
    async config(viteConfig) {
      isProd = viteConfig.mode !== "ssr";
      if (isProd) {
        const qManifest = { type: "smart" };
        try {
          const response = await fetch(`${baseUrl}/api/v1/${publicApiKey}/bundles/strategy/`);
          const strategy = await response.json();
          Object.assign(qManifest, strategy);
          const path = (0, import_node_path.resolve)(viteConfig.root || ".", outDir);
          const pathJson = (0, import_node_path.join)(path, "q-insights.json");
          (0, import_fs.mkdirSync)(path, { recursive: true });
          log("Fetched latest Qwik Insight data into: " + pathJson);
          await (0, import_promises.writeFile)(pathJson, JSON.stringify(qManifest));
        } catch (e) {
          logWarn("Failed to fetch manifest from Insights DB", e);
        }
      }
    },
    closeBundle: async () => {
      const path = (0, import_node_path.resolve)(outDir, "q-manifest.json");
      if (isProd && (0, import_fs.existsSync)(path)) {
        const qManifest = await (0, import_promises.readFile)(path, "utf-8");
        try {
          await fetch(`${baseUrl}/api/v1/${publicApiKey}/post/manifest`, {
            method: "post",
            body: qManifest
          });
        } catch (e) {
          logWarn("Failed to post manifest to Insights DB", e);
        }
      }
    }
  };
  return vitePlugin;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  qwikInsights
});
