/**
 * @license
 * @builder.io/qwik/server 1.14.1
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// packages/qwik/src/server/index.ts
import { setPlatform as setPlatform2 } from "@builder.io/qwik";

// packages/qwik/src/server/platform.ts
import { setPlatform } from "@builder.io/qwik";
var SYNC_QRL = "<sync>";
function createPlatform(opts, resolvedManifest) {
  const mapper = resolvedManifest?.mapper;
  const mapperFn = opts.symbolMapper ? opts.symbolMapper : (symbolName, _chunk, parent) => {
    if (mapper) {
      const hash2 = getSymbolHash(symbolName);
      const result = mapper[hash2];
      if (!result) {
        if (hash2 === SYNC_QRL) {
          return [hash2, ""];
        }
        const isRegistered = globalThis.__qwik_reg_symbols?.has(hash2);
        if (isRegistered) {
          return [symbolName, "_"];
        }
        if (parent) {
          return [symbolName, `${parent}?qrl=${symbolName}`];
        }
        console.error("Cannot resolve symbol", symbolName, "in", mapper, parent);
      }
      return result;
    }
  };
  const serverPlatform = {
    isServer: true,
    async importSymbol(_containerEl, url, symbolName) {
      const hash2 = getSymbolHash(symbolName);
      const regSym = globalThis.__qwik_reg_symbols?.get(hash2);
      if (regSym) {
        return regSym;
      }
      let modulePath = String(url);
      if (!modulePath.endsWith(".js")) {
        modulePath += ".js";
      }
      const module = __require(modulePath);
      if (!(symbolName in module)) {
        throw new Error(`Q-ERROR: missing symbol '${symbolName}' in module '${modulePath}'.`);
      }
      return module[symbolName];
    },
    raf: () => {
      console.error("server can not rerender");
      return Promise.resolve();
    },
    nextTick: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    chunkForSymbol(symbolName, _chunk, parent) {
      return mapperFn(symbolName, mapper, parent);
    }
  };
  return serverPlatform;
}
async function setServerPlatform(opts, manifest) {
  const platform = createPlatform(opts, manifest);
  setPlatform(platform);
}
var getSymbolHash = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};

// packages/qwik/src/server/render.ts
import { _pauseFromContexts, _renderSSR, Fragment as Fragment2, jsx as jsx2 } from "@builder.io/qwik";
import { isDev } from "@builder.io/qwik";

// packages/qwik/src/core/util/markers.ts
var QInstance = "q:instance";

// packages/qwik/src/server/preload-impl.ts
import { Fragment, jsx } from "@builder.io/qwik";

// packages/qwik/src/core/preloader/queue.ts
import { isBrowser as isBrowser3 } from "@builder.io/qwik/build";

// packages/qwik/src/core/preloader/bundle-graph.ts
import { isBrowser as isBrowser2 } from "@builder.io/qwik/build";

// packages/qwik/src/core/preloader/constants.ts
import { isBrowser } from "@builder.io/qwik/build";
var doc = isBrowser ? document : void 0;
var modulePreloadStr = "modulepreload";
var preloadStr = "preload";
var config = {
  $DEBUG$: false,
  $maxIdlePreloads$: 25,
  $invPreloadProbability$: 0.65
};
var rel = isBrowser && doc.createElement("link").relList.supports(modulePreloadStr) ? modulePreloadStr : preloadStr;
var loadStart = Date.now();
var isJSRegex = /\.[mc]?js$/;

// packages/qwik/src/core/preloader/types.ts
var BundleImportState_None = 0;
var BundleImportState_Queued = 1;
var BundleImportState_Preload = 2;
var BundleImportState_Alias = 3;
var BundleImportState_Loaded = 4;

// packages/qwik/src/core/preloader/bundle-graph.ts
var base;
var graph;
var makeBundle = (name, deps) => {
  return {
    $name$: name,
    $state$: isJSRegex.test(name) ? BundleImportState_None : BundleImportState_Alias,
    $deps$: shouldResetFactor ? deps?.map((d) => ({ ...d, $factor$: 1 })) : deps,
    $inverseProbability$: 1,
    $createdTs$: Date.now(),
    $waitedMs$: 0,
    $loadedMs$: 0
  };
};
var parseBundleGraph = (serialized) => {
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
var getBundle = (name) => {
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
var initPreloader = (serializedBundleGraph, opts) => {
  if (opts) {
    if ("debug" in opts) {
      config.$DEBUG$ = !!opts.debug;
    }
    if (typeof opts.preloadProbability === "number") {
      config.$invPreloadProbability$ = 1 - opts.preloadProbability;
    }
  }
  if (base != null || !serializedBundleGraph) {
    return;
  }
  base = "";
  graph = parseBundleGraph(serializedBundleGraph);
};

// packages/qwik/src/core/preloader/queue.ts
var bundles = /* @__PURE__ */ new Map();
var shouldResetFactor;
var queueDirty;
var preloadCount = 0;
var queue = [];
var log = (...args) => {
  console.log(
    `Preloader ${Date.now() - loadStart}ms ${preloadCount}/${queue.length} queued>`,
    ...args
  );
};
var resetQueue = () => {
  bundles.clear();
  queueDirty = false;
  shouldResetFactor = true;
  preloadCount = 0;
  queue.length = 0;
};
var sortQueue = () => {
  if (queueDirty) {
    queue.sort((a, b) => a.$inverseProbability$ - b.$inverseProbability$);
    queueDirty = false;
  }
};
var getQueue = () => {
  sortQueue();
  let probability = 0.4;
  const result = [];
  for (const b of queue) {
    const nextProbability = Math.round((1 - b.$inverseProbability$) * 10);
    if (nextProbability !== probability) {
      probability = nextProbability;
      result.push(probability);
    }
    result.push(b.$name$);
  }
  return result;
};
var trigger = () => {
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
var preloadOne = (bundle) => {
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
var adjustProbabilities = (bundle, newInverseProbability, seen) => {
  if (seen?.has(bundle)) {
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
var handleBundle = (name, inverseProbability) => {
  const bundle = getBundle(name);
  if (bundle && bundle.$inverseProbability$ > inverseProbability) {
    adjustProbabilities(bundle, inverseProbability);
  }
};
var depsCount;
var preload = (name, probability) => {
  if (!name?.length) {
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
  if (isBrowser3) {
    trigger();
  }
};
if (isBrowser3) {
  document.addEventListener("qsymbol", (ev) => {
    const { symbol, href } = ev.detail;
    if (href) {
      const hash2 = symbol.slice(symbol.lastIndexOf("_") + 1);
      preload(hash2, 1);
    }
  });
}

// packages/qwik/src/server/preload-utils.ts
function flattenPrefetchResources(prefetchResources) {
  const urls = [];
  const addPrefetchResource = (prefetchResources2) => {
    if (prefetchResources2) {
      for (const prefetchResource of prefetchResources2) {
        if (!urls.includes(prefetchResource.url)) {
          urls.push(prefetchResource.url);
          if (prefetchResource.imports) {
            addPrefetchResource(prefetchResource.imports);
          }
        }
      }
    }
  };
  addPrefetchResource(prefetchResources);
  return urls;
}

// packages/qwik/src/server/preload-strategy.ts
import { getPlatform } from "@builder.io/qwik";
var getBundles = (snapshotResult) => {
  const platform = getPlatform();
  return snapshotResult?.qrls?.map((qrl) => {
    const symbol = qrl.$refSymbol$ || qrl.$symbol$;
    const chunk = qrl.$chunk$;
    const result = platform.chunkForSymbol(symbol, chunk, qrl.dev?.file);
    if (result) {
      return result[1];
    }
    return chunk;
  }).filter(Boolean);
};
function getPreloadPaths(snapshotResult, opts, resolvedManifest) {
  const prefetchStrategy = opts.prefetchStrategy;
  if (prefetchStrategy === null) {
    return [];
  }
  if (!resolvedManifest?.manifest.bundleGraph) {
    return getBundles(snapshotResult);
  }
  if (typeof prefetchStrategy?.symbolsToPrefetch === "function") {
    try {
      const prefetchResources = prefetchStrategy.symbolsToPrefetch({
        manifest: resolvedManifest.manifest
      });
      return flattenPrefetchResources(prefetchResources);
    } catch (e) {
      console.error("getPrefetchUrls, symbolsToPrefetch()", e);
    }
  }
  const symbols = /* @__PURE__ */ new Set();
  for (const qrl of snapshotResult?.qrls || []) {
    const symbol = getSymbolHash(qrl.$refSymbol$ || qrl.$symbol$);
    if (symbol && symbol.length >= 10) {
      symbols.add(symbol);
    }
  }
  return [...symbols];
}
var expandBundles = (names, resolvedManifest) => {
  if (!resolvedManifest?.manifest.bundleGraph) {
    return [...new Set(names)];
  }
  resetQueue();
  let probability = 0.99;
  for (const name of names.slice(0, 15)) {
    preload(name, probability);
    probability *= 0.85;
  }
  return getQueue().filter(
    (name) => name !== resolvedManifest?.manifest.preloader && name !== resolvedManifest?.manifest.core
  );
};

// packages/qwik/src/server/preload-impl.ts
var preloaderPre = (base2, resolvedManifest, options, beforeContent, nonce) => {
  const preloadChunk = resolvedManifest?.manifest?.preloader;
  if (preloadChunk && options !== false) {
    const preloaderOpts = typeof options === "object" ? {
      debug: options.debug,
      preloadProbability: options.ssrPreloadProbability
    } : void 0;
    initPreloader(resolvedManifest?.manifest.bundleGraph, preloaderOpts);
    const opts = [];
    if (options?.debug) {
      opts.push("d:1");
    }
    if (options?.maxIdlePreloads) {
      opts.push(`P:${options.maxIdlePreloads}`);
    }
    if (options?.preloadProbability) {
      opts.push(`Q:${options.preloadProbability}`);
    }
    const optsStr = opts.length ? `,{${opts.join(",")}}` : "";
    const hash2 = resolvedManifest?.manifest.manifestHash;
    const script = `let b=fetch("${base2}q-bundle-graph-${hash2}.json");import("${base2}${preloadChunk}").then(({l})=>l(${JSON.stringify(base2)},b${optsStr}));`;
    beforeContent.push(
      /**
       * We add modulepreloads even when the script is at the top because they already fire during
       * html download
       */
      jsx("link", { rel: "modulepreload", href: `${base2}${preloadChunk}` }),
      jsx("link", {
        rel: "preload",
        href: `${base2}q-bundle-graph-${resolvedManifest?.manifest.manifestHash}.json`,
        as: "fetch",
        crossorigin: "anonymous"
      }),
      jsx("script", {
        type: "module",
        async: true,
        dangerouslySetInnerHTML: script,
        nonce
      })
    );
    const core = resolvedManifest?.manifest.core;
    if (core) {
      beforeContent.push(jsx("link", { rel: "modulepreload", href: `${base2}${core}` }));
    }
  }
};
var includePreloader = (base2, resolvedManifest, options, referencedBundles, nonce) => {
  if (referencedBundles.length === 0 || options === false) {
    return null;
  }
  const { ssrPreloads, ssrPreloadProbability } = normalizePreLoaderOptions(
    typeof options === "boolean" ? void 0 : options
  );
  let allowed = ssrPreloads;
  const nodes = [];
  if (import.meta.env.DEV) {
    base2 = import.meta.env.BASE_URL;
    if (base2.endsWith("/")) {
      base2 = base2.slice(0, -1);
    }
  }
  const links = [];
  const manifestHash = resolvedManifest?.manifest.manifestHash;
  if (allowed) {
    const expandedBundles = expandBundles(referencedBundles, resolvedManifest);
    let probability = 4;
    const tenXMinProbability = ssrPreloadProbability * 10;
    for (const hrefOrProbability of expandedBundles) {
      if (typeof hrefOrProbability === "string") {
        if (probability < tenXMinProbability) {
          break;
        }
        links.push(hrefOrProbability);
        if (--allowed === 0) {
          break;
        }
      } else {
        probability = hrefOrProbability;
      }
    }
  }
  const preloadChunk = manifestHash && resolvedManifest?.manifest.preloader;
  if (preloadChunk) {
    const insertLinks = links.length ? (
      /**
       * We only use modulepreload links because they behave best. Older browsers can rely on the
       * preloader which does feature detection and which will be available soon after inserting these
       * links.
       */
      `${JSON.stringify(links)}.map((l,e)=>{e=document.createElement('link');e.rel='modulepreload';e.href=${JSON.stringify(base2)}+l;document.head.appendChild(e)});`
    ) : "";
    const script = insertLinks + // First we wait for the onload event
    `window.addEventListener('load',f=>{f=_=>import("${base2}${preloadChunk}").then(({p})=>p(${JSON.stringify(referencedBundles)}));try{requestIdleCallback(f,{timeout:2000})}catch(e){setTimeout(f,200)}})`;
    nodes.push(
      jsx("script", {
        type: "module",
        "q:type": "preload",
        /**
         * This async allows the preloader to be executed before the DOM is fully parsed even though
         * it's at the bottom of the body
         */
        async: true,
        dangerouslySetInnerHTML: script,
        nonce
      })
    );
  }
  if (nodes.length > 0) {
    return jsx(Fragment, { children: nodes });
  }
  return null;
};
var preloaderPost = (base2, snapshotResult, opts, resolvedManifest, output) => {
  if (opts.preloader !== false) {
    const preloadBundles = getPreloadPaths(snapshotResult, opts, resolvedManifest);
    if (preloadBundles.length > 0) {
      const result = includePreloader(
        base2,
        resolvedManifest,
        opts.preloader,
        preloadBundles,
        opts.serverData?.nonce
      );
      if (result) {
        output.push(result);
      }
    }
  }
};
function normalizePreLoaderOptions(input) {
  return { ...PreLoaderOptionsDefault, ...input };
}
var PreLoaderOptionsDefault = {
  ssrPreloads: 7,
  ssrPreloadProbability: 0.5,
  debug: false,
  maxIdlePreloads: 25,
  preloadProbability: 0.35
};

// packages/qwik/src/server/scripts.ts
var QWIK_LOADER_DEFAULT_MINIFIED = '(()=>{const t=document,e=window,n=new Set,o=new Set([t]);let r;const s=(t,e)=>Array.from(t.querySelectorAll(e)),a=t=>{const e=[];return o.forEach((n=>e.push(...s(n,t)))),e},i=t=>{w(t),s(t,"[q\\\\:shadowroot]").forEach((t=>{const e=t.shadowRoot;e&&i(e)}))},c=t=>t&&"function"==typeof t.then,l=(t,e,n=e.type)=>{a("[on"+t+"\\\\:"+n+"]").forEach((o=>b(o,t,e,n)))},f=e=>{if(void 0===e._qwikjson_){let n=(e===t.documentElement?t.body:e).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===n.getAttribute("type")){e._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/gi,"<$1"));break}n=n.previousElementSibling}}},p=(t,e)=>new CustomEvent(t,{detail:e}),b=async(e,n,o,r=o.type)=>{const s="on"+n+":"+r;e.hasAttribute("preventdefault:"+r)&&o.preventDefault(),e.hasAttribute("stoppropagation:"+r)&&o.stopPropagation();const a=e._qc_,i=a&&a.li.filter((t=>t[0]===s));if(i&&i.length>0){for(const t of i){const n=t[1].getFn([e,o],(()=>e.isConnected))(o,e),r=o.cancelBubble;c(n)&&await n,r&&o.stopPropagation()}return}const l=e.getAttribute(s);if(l){const n=e.closest("[q\\\\:container]"),r=n.getAttribute("q:base"),s=n.getAttribute("q:version")||"unknown",a=n.getAttribute("q:manifest-hash")||"dev",i=new URL(r,t.baseURI);for(const p of l.split("\\n")){const l=new URL(p,i),b=l.href,h=l.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",q=performance.now();let _,d,y;const w=p.startsWith("#"),g={qBase:r,qManifest:a,qVersion:s,href:b,symbol:h,element:e,reqTime:q};if(w){const e=n.getAttribute("q:instance");_=(t["qFuncs_"+e]||[])[Number.parseInt(h)],_||(d="sync",y=Error("sym:"+h))}else{u("qsymbol",g);const t=l.href.split("#")[0];try{const e=import(t);f(n),_=(await e)[h],_||(d="no-symbol",y=Error(`${h} not in ${t}`))}catch(t){d||(d="async"),y=t}}if(!_){u("qerror",{importError:d,error:y,...g}),console.error(y);break}const m=t.__q_context__;if(e.isConnected)try{t.__q_context__=[e,o,l];const n=_(o,e);c(n)&&await n}catch(t){u("qerror",{error:t,...g})}finally{t.__q_context__=m}}}},u=(e,n)=>{t.dispatchEvent(p(e,n))},h=t=>t.replace(/([A-Z])/g,(t=>"-"+t.toLowerCase())),q=async t=>{let e=h(t.type),n=t.target;for(l("-document",t,e);n&&n.getAttribute;){const o=b(n,"",t,e);let r=t.cancelBubble;c(o)&&await o,r=r||t.cancelBubble||n.hasAttribute("stoppropagation:"+t.type),n=t.bubbles&&!0!==r?n.parentElement:null}},_=t=>{l("-window",t,h(t.type))},d=()=>{var s;const c=t.readyState;if(!r&&("interactive"==c||"complete"==c)&&(o.forEach(i),r=1,u("qinit"),(null!=(s=e.requestIdleCallback)?s:e.setTimeout).bind(e)((()=>u("qidle"))),n.has("qvisible"))){const t=a("[on\\\\:qvisible]"),e=new IntersectionObserver((t=>{for(const n of t)n.isIntersecting&&(e.unobserve(n.target),b(n.target,"",p("qvisible",n)))}));t.forEach((t=>e.observe(t)))}},y=(t,e,n,o=!1)=>t.addEventListener(e,n,{capture:o,passive:!1}),w=(...t)=>{for(const r of t)"string"==typeof r?n.has(r)||(o.forEach((t=>y(t,r,q,!0))),y(e,r,_,!0),n.add(r)):o.has(r)||(n.forEach((t=>y(r,t,q,!0))),o.add(r))};if(!("__q_context__"in t)){t.__q_context__=0;const r=e.qwikevents;Array.isArray(r)&&w(...r),e.qwikevents={events:n,roots:o,push:w},y(t,"readystatechange",d),d()}})()';
var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n  const doc = document;\n  const win = window;\n  const events = /* @__PURE__ */ new Set();\n  const roots = /* @__PURE__ */ new Set([doc]);\n  let hasInitialized;\n  const nativeQuerySelectorAll = (root, selector) => Array.from(root.querySelectorAll(selector));\n  const querySelectorAll = (query) => {\n    const elements = [];\n    roots.forEach((root) => elements.push(...nativeQuerySelectorAll(root, query)));\n    return elements;\n  };\n  const findShadowRoots = (fragment) => {\n    processEventOrNode(fragment);\n    nativeQuerySelectorAll(fragment, "[q\\\\:shadowroot]").forEach((parent) => {\n      const shadowRoot = parent.shadowRoot;\n      shadowRoot && findShadowRoots(shadowRoot);\n    });\n  };\n  const isPromise = (promise) => promise && typeof promise.then === "function";\n  const broadcast = (infix, ev, type = ev.type) => {\n    querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach(\n      (el) => dispatch(el, infix, ev, type)\n    );\n  };\n  const resolveContainer = (containerEl) => {\n    if (containerEl._qwikjson_ === void 0) {\n      const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;\n      let script = parentJSON.lastElementChild;\n      while (script) {\n        if (script.tagName === "SCRIPT" && script.getAttribute("type") === "qwik/json") {\n          containerEl._qwikjson_ = JSON.parse(\n            script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1")\n          );\n          break;\n        }\n        script = script.previousElementSibling;\n      }\n    }\n  };\n  const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n    detail\n  });\n  const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n    const attrName = "on" + onPrefix + ":" + eventName;\n    if (element.hasAttribute("preventdefault:" + eventName)) {\n      ev.preventDefault();\n    }\n    if (element.hasAttribute("stoppropagation:" + eventName)) {\n      ev.stopPropagation();\n    }\n    const ctx = element._qc_;\n    const relevantListeners = ctx && ctx.li.filter((li) => li[0] === attrName);\n    if (relevantListeners && relevantListeners.length > 0) {\n      for (const listener of relevantListeners) {\n        const results = listener[1].getFn([element, ev], () => element.isConnected)(ev, element);\n        const cancelBubble = ev.cancelBubble;\n        if (isPromise(results)) {\n          await results;\n        }\n        if (cancelBubble) {\n          ev.stopPropagation();\n        }\n      }\n      return;\n    }\n    const attrValue = element.getAttribute(attrName);\n    if (attrValue) {\n      const container = element.closest("[q\\\\:container]");\n      const qBase = container.getAttribute("q:base");\n      const qVersion = container.getAttribute("q:version") || "unknown";\n      const qManifest = container.getAttribute("q:manifest-hash") || "dev";\n      const base = new URL(qBase, doc.baseURI);\n      for (const qrl of attrValue.split("\\n")) {\n        const url = new URL(qrl, base);\n        const href = url.href;\n        const symbol = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n        const reqTime = performance.now();\n        let handler;\n        let importError;\n        let error;\n        const isSync = qrl.startsWith("#");\n        const eventData = {\n          qBase,\n          qManifest,\n          qVersion,\n          href,\n          symbol,\n          element,\n          reqTime\n        };\n        if (isSync) {\n          const hash = container.getAttribute("q:instance");\n          handler = (doc["qFuncs_" + hash] || [])[Number.parseInt(symbol)];\n          if (!handler) {\n            importError = "sync";\n            error = new Error("sym:" + symbol);\n          }\n        } else {\n          emitEvent("qsymbol", eventData);\n          const uri = url.href.split("#")[0];\n          try {\n            const module = import(\n                            uri\n            );\n            resolveContainer(container);\n            handler = (await module)[symbol];\n            if (!handler) {\n              importError = "no-symbol";\n              error = new Error(`${symbol} not in ${uri}`);\n            }\n          } catch (err) {\n            importError || (importError = "async");\n            error = err;\n          }\n        }\n        if (!handler) {\n          emitEvent("qerror", {\n            importError,\n            error,\n            ...eventData\n          });\n          console.error(error);\n          break;\n        }\n        const previousCtx = doc.__q_context__;\n        if (element.isConnected) {\n          try {\n            doc.__q_context__ = [element, ev, url];\n            const results = handler(ev, element);\n            if (isPromise(results)) {\n              await results;\n            }\n          } catch (error2) {\n            emitEvent("qerror", { error: error2, ...eventData });\n          } finally {\n            doc.__q_context__ = previousCtx;\n          }\n        }\n      }\n    }\n  };\n  const emitEvent = (eventName, detail) => {\n    doc.dispatchEvent(createEvent(eventName, detail));\n  };\n  const camelToKebab = (str) => str.replace(/([A-Z])/g, (a) => "-" + a.toLowerCase());\n  const processDocumentEvent = async (ev) => {\n    let type = camelToKebab(ev.type);\n    let element = ev.target;\n    broadcast("-document", ev, type);\n    while (element && element.getAttribute) {\n      const results = dispatch(element, "", ev, type);\n      let cancelBubble = ev.cancelBubble;\n      if (isPromise(results)) {\n        await results;\n      }\n      cancelBubble = cancelBubble || ev.cancelBubble || element.hasAttribute("stoppropagation:" + ev.type);\n      element = ev.bubbles && cancelBubble !== true ? element.parentElement : null;\n    }\n  };\n  const processWindowEvent = (ev) => {\n    broadcast("-window", ev, camelToKebab(ev.type));\n  };\n  const processReadyStateChange = () => {\n    var _a;\n    const readyState = doc.readyState;\n    if (!hasInitialized && (readyState == "interactive" || readyState == "complete")) {\n      roots.forEach(findShadowRoots);\n      hasInitialized = 1;\n      emitEvent("qinit");\n      const riC = (_a = win.requestIdleCallback) != null ? _a : win.setTimeout;\n      riC.bind(win)(() => emitEvent("qidle"));\n      if (events.has("qvisible")) {\n        const results = querySelectorAll("[on\\\\:qvisible]");\n        const observer = new IntersectionObserver((entries) => {\n          for (const entry of entries) {\n            if (entry.isIntersecting) {\n              observer.unobserve(entry.target);\n              dispatch(entry.target, "", createEvent("qvisible", entry));\n            }\n          }\n        });\n        results.forEach((el) => observer.observe(el));\n      }\n    }\n  };\n  const addEventListener = (el, eventName, handler, capture = false) => {\n    return el.addEventListener(eventName, handler, { capture, passive: false });\n  };\n  const processEventOrNode = (...eventNames) => {\n    for (const eventNameOrNode of eventNames) {\n      if (typeof eventNameOrNode === "string") {\n        if (!events.has(eventNameOrNode)) {\n          roots.forEach(\n            (root) => addEventListener(root, eventNameOrNode, processDocumentEvent, true)\n          );\n          addEventListener(win, eventNameOrNode, processWindowEvent, true);\n          events.add(eventNameOrNode);\n        }\n      } else {\n        if (!roots.has(eventNameOrNode)) {\n          events.forEach(\n            (eventName) => addEventListener(eventNameOrNode, eventName, processDocumentEvent, true)\n          );\n          roots.add(eventNameOrNode);\n        }\n      }\n    }\n  };\n  if (!("__q_context__" in doc)) {\n    doc.__q_context__ = 0;\n    const qwikevents = win.qwikevents;\n    if (Array.isArray(qwikevents)) {\n      processEventOrNode(...qwikevents);\n    }\n    win.qwikevents = {\n      events,\n      roots,\n      push: processEventOrNode\n    };\n    addEventListener(doc, "readystatechange", processReadyStateChange);\n    processReadyStateChange();\n  }\n})()';
function getQwikLoaderScript(opts = {}) {
  return opts.debug ? QWIK_LOADER_DEFAULT_DEBUG : QWIK_LOADER_DEFAULT_MINIFIED;
}
var QWIK_PREFETCH_MINIFIED = globalThis.QWIK_PREFETCH_MINIFIED;
var QWIK_PREFETCH_DEBUG = globalThis.QWIK_PREFETCH_DEBUG;
function getQwikPrefetchWorkerScript(opts = {}) {
  return opts.debug ? QWIK_PREFETCH_DEBUG : QWIK_PREFETCH_MINIFIED;
}

// packages/qwik/src/server/utils.ts
function createTimer() {
  if (typeof performance === "undefined") {
    return () => 0;
  }
  const start = performance.now();
  return () => {
    const end = performance.now();
    const delta = end - start;
    return delta / 1e6;
  };
}
function getBuildBase(opts) {
  let base2 = opts.base;
  if (typeof opts.base === "function") {
    base2 = opts.base(opts);
  }
  if (typeof base2 === "string") {
    if (!base2.endsWith("/")) {
      base2 += "/";
    }
    return base2;
  }
  return `${import.meta.env.BASE_URL}build/`;
}
var versions = {
  qwik: "1.14.1",
  qwikDom: "2.1.19"
};

// packages/qwik/src/server/render.ts
import { manifest as builtManifest } from "@qwik-client-manifest";
var DOCTYPE = "<!DOCTYPE html>";
async function renderToStream(rootNode, opts) {
  let stream = opts.stream;
  let bufferSize = 0;
  let totalSize = 0;
  let networkFlushes = 0;
  let firstFlushTime = 0;
  let buffer = "";
  let snapshotResult;
  const inOrderStreaming = opts.streaming?.inOrder ?? {
    strategy: "auto",
    maximunInitialChunk: 5e4,
    maximunChunk: 3e4
  };
  const containerTagName = opts.containerTagName ?? "html";
  const containerAttributes = opts.containerAttributes ?? {};
  const nativeStream = stream;
  const firstFlushTimer = createTimer();
  const buildBase = getBuildBase(opts);
  const resolvedManifest = resolveManifest(opts.manifest);
  function flush() {
    if (buffer) {
      nativeStream.write(buffer);
      buffer = "";
      bufferSize = 0;
      networkFlushes++;
      if (networkFlushes === 1) {
        firstFlushTime = firstFlushTimer();
      }
    }
  }
  function enqueue(chunk) {
    const len = chunk.length;
    bufferSize += len;
    totalSize += len;
    buffer += chunk;
  }
  switch (inOrderStreaming.strategy) {
    case "disabled":
      stream = {
        write: enqueue
      };
      break;
    case "direct":
      stream = nativeStream;
      break;
    case "auto":
      let count = 0;
      let forceFlush = false;
      const minimunChunkSize = inOrderStreaming.maximunChunk ?? 0;
      const initialChunkSize = inOrderStreaming.maximunInitialChunk ?? 0;
      stream = {
        write(chunk) {
          if (chunk === "<!--qkssr-f-->") {
            forceFlush || (forceFlush = true);
          } else if (chunk === "<!--qkssr-pu-->") {
            count++;
          } else if (chunk === "<!--qkssr-po-->") {
            count--;
          } else {
            enqueue(chunk);
          }
          const chunkSize = networkFlushes === 0 ? initialChunkSize : minimunChunkSize;
          if (count === 0 && (forceFlush || bufferSize >= chunkSize)) {
            forceFlush = false;
            flush();
          }
        }
      };
      break;
  }
  if (containerTagName === "html") {
    stream.write(DOCTYPE);
  } else {
    stream.write("<!--cq-->");
    if (opts.qwikLoader) {
      if (opts.qwikLoader.include === void 0) {
        opts.qwikLoader.include = "never";
      }
      if (opts.qwikLoader.position === void 0) {
        opts.qwikLoader.position = "bottom";
      }
    } else {
      opts.qwikLoader = {
        include: "never"
      };
    }
  }
  if (!resolvedManifest && !isDev) {
    console.warn(
      `Missing client manifest, loading symbols in the client might 404. Please ensure the client build has run and generated the manifest for the server build.`
    );
  }
  await setServerPlatform(opts, resolvedManifest);
  const injections = resolvedManifest?.manifest.injections;
  const beforeContent = injections ? injections.map((injection) => jsx2(injection.tag, injection.attributes ?? {})) : [];
  const includeMode = opts.qwikLoader?.include ?? "auto";
  const positionMode = opts.qwikLoader?.position ?? "bottom";
  let didAddQwikLoader = false;
  if (positionMode === "top" && includeMode !== "never") {
    didAddQwikLoader = true;
    const qwikLoaderScript = getQwikLoaderScript({
      debug: opts.debug
    });
    beforeContent.push(
      jsx2("script", {
        id: "qwikloader",
        dangerouslySetInnerHTML: qwikLoaderScript
      })
    );
    beforeContent.push(
      jsx2("script", {
        dangerouslySetInnerHTML: `window.qwikevents.push('click','input')`
      })
    );
  }
  preloaderPre(buildBase, resolvedManifest, opts.preloader, beforeContent, opts.serverData?.nonce);
  const renderTimer = createTimer();
  const renderSymbols = [];
  let renderTime = 0;
  let snapshotTime = 0;
  await _renderSSR(rootNode, {
    stream,
    containerTagName,
    containerAttributes,
    serverData: opts.serverData,
    base: buildBase,
    beforeContent,
    beforeClose: async (contexts, containerState, _dynamic, textNodes) => {
      renderTime = renderTimer();
      const snapshotTimer = createTimer();
      snapshotResult = await _pauseFromContexts(contexts, containerState, void 0, textNodes);
      const children = [];
      preloaderPost(buildBase, snapshotResult, opts, resolvedManifest, children);
      const jsonData = JSON.stringify(snapshotResult.state, void 0, isDev ? "  " : void 0);
      children.push(
        jsx2("script", {
          type: "qwik/json",
          dangerouslySetInnerHTML: escapeText(jsonData),
          nonce: opts.serverData?.nonce
        })
      );
      if (snapshotResult.funcs.length > 0) {
        const hash2 = containerAttributes[QInstance];
        children.push(
          jsx2("script", {
            "q:func": "qwik/json",
            dangerouslySetInnerHTML: serializeFunctions(hash2, snapshotResult.funcs),
            nonce: opts.serverData?.nonce
          })
        );
      }
      const needLoader = !didAddQwikLoader && (!snapshotResult || snapshotResult.mode !== "static");
      const includeLoader = includeMode === "always" || includeMode === "auto" && needLoader;
      if (includeLoader) {
        const qwikLoaderScript = getQwikLoaderScript({
          debug: opts.debug
        });
        children.push(
          jsx2("script", {
            id: "qwikloader",
            dangerouslySetInnerHTML: qwikLoaderScript,
            nonce: opts.serverData?.nonce
          })
        );
      }
      const extraListeners = Array.from(containerState.$events$, (s) => JSON.stringify(s));
      if (extraListeners.length > 0) {
        const content = (includeLoader ? `window.qwikevents` : `(window.qwikevents||=[])`) + `.push(${extraListeners.join(", ")})`;
        children.push(
          jsx2("script", {
            dangerouslySetInnerHTML: content,
            nonce: opts.serverData?.nonce
          })
        );
      }
      collectRenderSymbols(renderSymbols, contexts);
      snapshotTime = snapshotTimer();
      return jsx2(Fragment2, { children });
    },
    manifestHash: resolvedManifest?.manifest.manifestHash || "dev" + hash()
  });
  if (containerTagName !== "html") {
    stream.write("<!--/cq-->");
  }
  flush();
  const isDynamic = snapshotResult.resources.some((r) => r._cache !== Infinity);
  const result = {
    prefetchResources: void 0,
    snapshotResult,
    flushes: networkFlushes,
    manifest: resolvedManifest?.manifest,
    size: totalSize,
    isStatic: !isDynamic,
    timing: {
      render: renderTime,
      snapshot: snapshotTime,
      firstFlush: firstFlushTime
    }
  };
  return result;
}
function hash() {
  return Math.random().toString(36).slice(2);
}
async function renderToString(rootNode, opts = {}) {
  const chunks = [];
  const stream = {
    write(chunk) {
      chunks.push(chunk);
    }
  };
  const result = await renderToStream(rootNode, {
    base: opts.base,
    containerAttributes: opts.containerAttributes,
    containerTagName: opts.containerTagName,
    locale: opts.locale,
    manifest: opts.manifest,
    symbolMapper: opts.symbolMapper,
    qwikLoader: opts.qwikLoader,
    serverData: opts.serverData,
    prefetchStrategy: opts.prefetchStrategy,
    stream
  });
  return {
    isStatic: result.isStatic,
    prefetchResources: result.prefetchResources,
    timing: result.timing,
    manifest: result.manifest,
    snapshotResult: result.snapshotResult,
    html: chunks.join("")
  };
}
function resolveManifest(manifest) {
  const mergedManifest = manifest ? { ...builtManifest, ...manifest } : builtManifest;
  if (!mergedManifest || "mapper" in mergedManifest) {
    return mergedManifest;
  }
  if (mergedManifest.mapping) {
    const mapper = {};
    Object.entries(mergedManifest.mapping).forEach(([symbol, bundleFilename]) => {
      mapper[getSymbolHash(symbol)] = [symbol, bundleFilename];
    });
    return {
      mapper,
      manifest: mergedManifest,
      injections: mergedManifest.injections || []
    };
  }
  return void 0;
}
var escapeText = (str) => {
  return str.replace(/<(\/?script)/gi, "\\x3C$1");
};
function collectRenderSymbols(renderSymbols, elements) {
  for (const ctx of elements) {
    const symbol = ctx.$componentQrl$?.getSymbol();
    if (symbol && !renderSymbols.includes(symbol)) {
      renderSymbols.push(symbol);
    }
  }
}
var Q_FUNCS_PREFIX = 'document["qFuncs_HASH"]=';
function serializeFunctions(hash2, funcs) {
  return Q_FUNCS_PREFIX.replace("HASH", hash2) + `[${funcs.join(",\n")}]`;
}

// packages/qwik/src/server/index.ts
async function setServerPlatform2(manifest) {
  const platform = createPlatform({ manifest }, resolveManifest(manifest));
  setPlatform2(platform);
}
export {
  getQwikLoaderScript,
  getQwikPrefetchWorkerScript,
  renderToStream,
  renderToString,
  resolveManifest,
  setServerPlatform2 as setServerPlatform,
  versions
};
