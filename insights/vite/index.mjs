// packages/qwik/src/insights/vite/insights-plugin.ts
import { existsSync, mkdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { join, resolve } from "node:path";
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
          const path = resolve(viteConfig.root || ".", outDir);
          const pathJson = join(path, "q-insights.json");
          mkdirSync(path, { recursive: true });
          log("Fetched latest Qwik Insight data into: " + pathJson);
          await writeFile(pathJson, JSON.stringify(qManifest));
        } catch (e) {
          logWarn("Failed to fetch manifest from Insights DB", e);
        }
      }
    },
    closeBundle: async () => {
      const path = resolve(outDir, "q-manifest.json");
      if (isProd && existsSync(path)) {
        const qManifest = await readFile(path, "utf-8");
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
export {
  qwikInsights
};
