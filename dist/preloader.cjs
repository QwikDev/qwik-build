"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const build = require("@builder.io/qwik/build");
const doc = build.isBrowser ? document : void 0;
const modulePreloadStr = "modulepreload";
const preloadStr = "preload";
const config = {
  $DEBUG$: false,
  $maxIdlePreloads$: 25,
  $invPreloadProbability$: 0.65
};
const rel = build.isBrowser && doc.createElement("link").relList.supports(modulePreloadStr) ? modulePreloadStr : preloadStr;
const loadStart = Date.now();
const isJSRegex = /\.[mc]?js$/;
const BundleImportState_None = 0;
const BundleImportState_Queued = 1;
const BundleImportState_Preload = 2;
const BundleImportState_Alias = 3;
const BundleImportState_Loaded = 4;
const bundles = /* @__PURE__ */ new Map();
let queueDirty;
let preloadCount = 0;
const queue = [];
const log = (...args) => {
  console.log(
    `Preloader ${Date.now() - loadStart}ms ${preloadCount}/${queue.length} queued>`,
    ...args
  );
};
const sortQueue = () => {
  if (queueDirty) {
    queue.sort((a, b) => a.$inverseProbability$ - b.$inverseProbability$);
    queueDirty = false;
  }
};
const trigger = () => {
  if (!queue.length) {
    return;
  }
  sortQueue();
  while (queue.length) {
    const bundle = queue[0];
    const inverseProbability = bundle.$inverseProbability$;
    const probability = 1 - inverseProbability;
    const allowedPreloads = graph ? (
      // The more likely the bundle, the more simultaneous preloads we want to allow
      Math.max(1, config.$maxIdlePreloads$ * probability)
    ) : (
      // While the graph is not available, we limit to 2 preloads
      2
    );
    if (probability >= 0.99 || preloadCount < allowedPreloads) {
      queue.shift();
      preloadOne(bundle);
    } else {
      break;
    }
  }
  if (config.$DEBUG$ && !queue.length) {
    const loaded = [...bundles.values()].filter((b) => b.$state$ > BundleImportState_None);
    const waitTime = loaded.reduce((acc, b) => acc + b.$waitedMs$, 0);
    const loadTime = loaded.reduce((acc, b) => acc + b.$loadedMs$, 0);
    log(
      `>>>> done ${loaded.length}/${bundles.size} total: ${waitTime}ms waited, ${loadTime}ms loaded`
    );
  }
};
const preloadOne = (bundle) => {
  if (bundle.$state$ >= BundleImportState_Preload) {
    return;
  }
  preloadCount++;
  const start = Date.now();
  bundle.$waitedMs$ = start - bundle.$createdTs$;
  bundle.$state$ = BundleImportState_Preload;
  config.$DEBUG$ && log(
    `<< load ${Math.round((1 - bundle.$inverseProbability$) * 100)}% after ${`${bundle.$waitedMs$}ms`}`,
    bundle.$name$
  );
  const link = doc.createElement("link");
  link.href = new URL(`${base}${bundle.$name$}`, doc.baseURI).toString();
  link.rel = rel;
  link.as = "script";
  link.onload = link.onerror = () => {
    preloadCount--;
    const end = Date.now();
    bundle.$loadedMs$ = end - start;
    bundle.$state$ = BundleImportState_Loaded;
    config.$DEBUG$ && log(`>> done after ${bundle.$loadedMs$}ms`, bundle.$name$);
    link.remove();
    trigger();
  };
  doc.head.appendChild(link);
};
const adjustProbabilities = (bundle, newInverseProbability, seen) => {
  if (seen == null ? void 0 : seen.has(bundle)) {
    return;
  }
  const previousInverseProbability = bundle.$inverseProbability$;
  bundle.$inverseProbability$ = newInverseProbability;
  if (previousInverseProbability - bundle.$inverseProbability$ < 0.01) {
    return;
  }
  if (
    // don't queue until we have initialized the preloader
    base != null && bundle.$state$ < BundleImportState_Preload && bundle.$inverseProbability$ < config.$invPreloadProbability$
  ) {
    if (bundle.$state$ === BundleImportState_None) {
      bundle.$state$ = BundleImportState_Queued;
      queue.push(bundle);
      config.$DEBUG$ && log(`queued ${Math.round((1 - bundle.$inverseProbability$) * 100)}%`, bundle.$name$);
    }
    queueDirty = true;
  }
  if (bundle.$deps$) {
    seen || (seen = /* @__PURE__ */ new Set());
    seen.add(bundle);
    const probability = 1 - bundle.$inverseProbability$;
    for (const dep of bundle.$deps$) {
      const depBundle = getBundle(dep.$name$);
      if (depBundle.$inverseProbability$ === 0) {
        continue;
      }
      let newInverseProbability2;
      if (dep.$importProbability$ > 0.5 && (probability === 1 || probability >= 0.99 && depsCount < 100)) {
        depsCount++;
        newInverseProbability2 = Math.min(0.01, 1 - dep.$importProbability$);
      } else {
        const newInverseImportProbability = 1 - dep.$importProbability$ * probability;
        const prevAdjust = dep.$factor$;
        const factor = newInverseImportProbability / prevAdjust;
        newInverseProbability2 = Math.max(0.02, depBundle.$inverseProbability$ * factor);
        dep.$factor$ = factor;
      }
      adjustProbabilities(depBundle, newInverseProbability2, seen);
    }
  }
};
const handleBundle = (name, inverseProbability) => {
  const bundle = getBundle(name);
  if (bundle && bundle.$inverseProbability$ > inverseProbability) {
    adjustProbabilities(bundle, inverseProbability);
  }
};
let depsCount;
const preload = (name, probability) => {
  if (!(name == null ? void 0 : name.length)) {
    return;
  }
  depsCount = 0;
  let inverseProbability = probability ? 1 - probability : 0.4;
  if (Array.isArray(name)) {
    for (let i = name.length - 1; i >= 0; i--) {
      const item = name[i];
      if (typeof item === "number") {
        inverseProbability = 1 - item / 10;
      } else {
        handleBundle(item, inverseProbability);
      }
    }
  } else {
    handleBundle(name, inverseProbability);
  }
  if (build.isBrowser) {
    trigger();
  }
};
if (build.isBrowser) {
  document.addEventListener("qsymbol", (ev) => {
    const { symbol, href } = ev.detail;
    if (href) {
      const hash = symbol.slice(symbol.lastIndexOf("_") + 1);
      preload(hash, 1);
    }
  });
}
let base;
let graph;
const makeBundle = (name, deps) => {
  return {
    $name$: name,
    $state$: isJSRegex.test(name) ? BundleImportState_None : BundleImportState_Alias,
    $deps$: deps,
    $inverseProbability$: 1,
    $createdTs$: Date.now(),
    $waitedMs$: 0,
    $loadedMs$: 0
  };
};
const parseBundleGraph = (serialized) => {
  const graph2 = /* @__PURE__ */ new Map();
  let i = 0;
  while (i < serialized.length) {
    const name = serialized[i++];
    const deps = [];
    let idx;
    let probability = 1;
    while (idx = serialized[i], typeof idx === "number") {
      if (idx < 0) {
        probability = -idx / 10;
      } else {
        deps.push({
          $name$: serialized[idx],
          $importProbability$: probability,
          $factor$: 1
        });
      }
      i++;
    }
    graph2.set(name, deps);
  }
  return graph2;
};
const getBundle = (name) => {
  let bundle = bundles.get(name);
  if (!bundle) {
    let deps;
    if (graph) {
      deps = graph.get(name);
      if (!deps) {
        return;
      }
      if (!deps.length) {
        deps = void 0;
      }
    }
    bundle = makeBundle(name, deps);
    bundles.set(name, bundle);
  }
  return bundle;
};
const loadBundleGraph = (basePath, serializedResponse, opts) => {
  if (opts) {
    if ("d" in opts) {
      config.$DEBUG$ = !!opts.d;
    }
    if ("P" in opts) {
      config.$maxIdlePreloads$ = opts["P"];
    }
    if ("Q" in opts) {
      config.$invPreloadProbability$ = 1 - opts["Q"];
    }
  }
  if (!build.isBrowser || basePath == null) {
    return;
  }
  base = basePath;
  if (serializedResponse) {
    serializedResponse.then((r) => r.text()).then((text) => {
      graph = parseBundleGraph(JSON.parse(text));
      const toAdjust = [];
      for (const [name, deps] of graph.entries()) {
        const bundle = getBundle(name);
        bundle.$deps$ = deps;
        if (bundle.$inverseProbability$ < 1) {
          toAdjust.push([bundle, bundle.$inverseProbability$]);
          bundle.$inverseProbability$ = 1;
        }
      }
      config.$DEBUG$ && log(`parseBundleGraph got ${graph.size} bundles, adjusting ${toAdjust.length}`);
      for (const [bundle, inverseProbability] of toAdjust) {
        adjustProbabilities(bundle, inverseProbability);
      }
      trigger();
    }).catch(console.warn);
  }
};
exports.g = parseBundleGraph;
exports.h = handleBundle;
exports.l = loadBundleGraph;
exports.p = preload;
