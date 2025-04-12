/**
 * @license
 * @builder.io/qwik/server 1.13.0-dev+23ed7db
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
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

// packages/qwik/src/server/prefetch-implementation.ts
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
var maxSimultaneousPreloadsStr = "maxSimultaneousPreloads";
var maxSignificantInverseProbabilityStr = "maxSignificantInverseProbability";
var config = {
  DEBUG: false,
  [maxSimultaneousPreloadsStr]: 6,
  [maxSignificantInverseProbabilityStr]: 0.75
};
var rel = isBrowser && doc.createElement("link").relList.supports(modulePreloadStr) ? modulePreloadStr : preloadStr;
var loadStart = Date.now();

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
  const url = name.endsWith(".js") ? doc ? new URL(`${base}${name}`, doc.baseURI).toString() : name : null;
  return {
    $name$: name,
    $url$: url,
    $state$: url ? BundleImportState_None : BundleImportState_Alias,
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
        deps.push({ $name$: serialized[idx], $probability$: probability, $factor$: 1 });
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
      config.DEBUG = !!opts.debug;
    }
    if (maxSignificantInverseProbabilityStr in opts) {
      config[maxSignificantInverseProbabilityStr] = opts[maxSignificantInverseProbabilityStr];
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
      Math.max(1, config[maxSimultaneousPreloadsStr] * probability)
    ) : (
      // While the graph is not available, we limit to 2 preloads
      2
    );
    if (probability === 1 || preloadCount < allowedPreloads) {
      queue.shift();
      preloadOne(bundle);
    } else {
      break;
    }
  }
  if (config.DEBUG && !queue.length) {
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
  config.DEBUG && log(
    `<< load ${Math.round((1 - bundle.$inverseProbability$) * 100)}% after ${`${bundle.$waitedMs$}ms`}`,
    bundle.$name$
  );
  const link = doc.createElement("link");
  link.href = bundle.$url$;
  link.rel = rel;
  link.as = "script";
  link.onload = link.onerror = () => {
    preloadCount--;
    const end = Date.now();
    bundle.$loadedMs$ = end - start;
    bundle.$state$ = BundleImportState_Loaded;
    config.DEBUG && log(`>> done after ${bundle.$loadedMs$}ms`, bundle.$name$);
    link.remove();
    trigger();
  };
  doc.head.appendChild(link);
};
var adjustProbabilities = (bundle, adjustFactor, seen) => {
  if (seen?.has(bundle)) {
    return;
  }
  const previousInverseProbability = bundle.$inverseProbability$;
  bundle.$inverseProbability$ *= adjustFactor;
  if (previousInverseProbability - bundle.$inverseProbability$ < 0.01) {
    return;
  }
  if (bundle.$state$ < BundleImportState_Preload && bundle.$inverseProbability$ < config[maxSignificantInverseProbabilityStr]) {
    if (bundle.$state$ === BundleImportState_None) {
      bundle.$state$ = BundleImportState_Queued;
      queue.push(bundle);
      config.DEBUG && log(`queued ${Math.round((1 - bundle.$inverseProbability$) * 100)}%`, bundle.$name$);
    }
    queueDirty = true;
  }
  if (bundle.$deps$) {
    seen || (seen = /* @__PURE__ */ new Set());
    seen.add(bundle);
    const probability = 1 - bundle.$inverseProbability$;
    for (const dep of bundle.$deps$) {
      const depBundle = getBundle(dep.$name$);
      const prevAdjust = dep.$factor$;
      const newInverseProbability = 1 - dep.$probability$ * probability;
      const factor = newInverseProbability / prevAdjust;
      dep.$factor$ = factor;
      adjustProbabilities(depBundle, factor, seen);
    }
  }
};
var handleBundle = (name, inverseProbability) => {
  const bundle = getBundle(name);
  if (bundle && bundle.$inverseProbability$ > inverseProbability) {
    adjustProbabilities(bundle, inverseProbability / bundle.$inverseProbability$);
  }
};
var preload = (name, probability) => {
  if (base == null || !name.length) {
    return;
  }
  let inverseProbability = probability ? 1 - probability : 0.4;
  if (Array.isArray(name)) {
    for (let i = name.length - 1; i >= 0; i--) {
      const item = name[i];
      if (typeof item === "number") {
        inverseProbability = 1 - item / 10;
      } else {
        handleBundle(item, inverseProbability);
        inverseProbability *= 1.005;
      }
    }
  } else {
    handleBundle(name, inverseProbability);
  }
  if (isBrowser3) {
    trigger();
  }
};

// packages/qwik/src/server/prefetch-utils.ts
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

// packages/qwik/src/server/prefetch-strategy.ts
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
  for (const name of names) {
    preload(name, probability);
    probability *= 0.95;
  }
  return getQueue();
};

// packages/qwik/src/server/prefetch-implementation.ts
function includePreloader(base2, manifest, prefetchStrategy, referencedBundles, nonce) {
  if (referencedBundles.length === 0) {
    return null;
  }
  const {
    maxPreloads,
    linkRel,
    linkFetchPriority,
    minProbability,
    debug,
    maxSimultaneousPreloads,
    minPreloadProbability
  } = normalizePrefetchImplementation(prefetchStrategy?.implementation);
  let allowed = maxPreloads;
  const nodes = [];
  if (import.meta.env.DEV) {
    base2 = import.meta.env.BASE_URL;
    if (base2.endsWith("/")) {
      base2 = base2.slice(0, -1);
    }
  }
  const makeLink = (base3, href) => {
    const linkProps = {
      rel: linkRel,
      href: `${base3}${href}`
    };
    if (linkRel !== "modulepreload") {
      linkProps["fetchPriority"] = linkFetchPriority;
      linkProps["as"] = "script";
    }
    return jsx("link", linkProps);
  };
  const manifestHash = manifest?.manifest.manifestHash;
  if (allowed) {
    const expandedBundles = expandBundles(referencedBundles, manifest);
    let probability = 8;
    const tenXMinProbability = minProbability * 10;
    for (const bundleOrProbability of expandedBundles) {
      if (typeof bundleOrProbability === "string") {
        if (probability < tenXMinProbability) {
          break;
        }
        nodes.push(makeLink(base2, bundleOrProbability));
        if (--allowed === 0) {
          break;
        }
      } else {
        probability = bundleOrProbability;
      }
    }
  }
  const preloadChunk = manifestHash && manifest?.manifest.preloader;
  if (preloadChunk) {
    const opts = [];
    if (debug) {
      opts.push("d:1");
    }
    if (maxSimultaneousPreloads) {
      opts.push(`P:${maxSimultaneousPreloads}`);
    }
    if (minPreloadProbability) {
      opts.push(`Q:${minPreloadProbability}`);
    }
    const optsStr = opts.length ? `,{${opts.join(",")}}` : "";
    const script = `let b=fetch("${base2}q-bundle-graph-${manifestHash}.json");import("${base2}${preloadChunk}").then(({l,p})=>{l(${JSON.stringify(base2)},b${optsStr});p(${JSON.stringify(referencedBundles)});})`;
    nodes.push(
      jsx("script", {
        type: "module",
        "q:type": "link-js",
        dangerouslySetInnerHTML: script,
        nonce
      })
    );
  }
  if (nodes.length > 0) {
    return jsx(Fragment, { children: nodes });
  }
  return null;
}
function normalizePrefetchImplementation(input) {
  return { ...PrefetchImplementationDefault, ...input };
}
var PrefetchImplementationDefault = {
  maxPreloads: import.meta.env.DEV ? 15 : 7,
  minProbability: 0.6,
  debug: false,
  maxSimultaneousPreloads: 5,
  minPreloadProbability: 0.25,
  linkRel: "modulepreload",
  linkFetchPriority: void 0,
  linkInsert: void 0,
  workerFetchInsert: void 0,
  prefetchEvent: void 0
};

// packages/qwik/src/server/scripts.ts
var QWIK_LOADER_DEFAULT_MINIFIED = '(()=>{var e=Object.defineProperty,t=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,n=(t,o,r)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[o]=r,s=(e,s)=>{for(var a in s||(s={}))o.call(s,a)&&n(e,a,s[a]);if(t)for(var a of t(s))r.call(s,a)&&n(e,a,s[a]);return e};((e,t)=>{const o="__q_context__",r=window,n=new Set,a=new Set([e]),i="replace",c="forEach",l="target",f="getAttribute",p="isConnected",b="qvisible",u="_qwikjson_",y=(e,t)=>Array.from(e.querySelectorAll(t)),h=e=>{const t=[];return a.forEach((o=>t.push(...y(o,e)))),t},d=e=>{S(e),y(e,"[q\\\\:shadowroot]").forEach((e=>{const t=e.shadowRoot;t&&d(t)}))},m=e=>e&&"function"==typeof e.then,w=(e,t,o=t.type)=>{h("[on"+e+"\\\\:"+o+"]")[c]((r=>g(r,e,t,o)))},q=t=>{if(void 0===t[u]){let o=(t===e.documentElement?e.body:t).lastElementChild;for(;o;){if("SCRIPT"===o.tagName&&"qwik/json"===o[f]("type")){t[u]=JSON.parse(o.textContent[i](/\\\\x3C(\\/?script)/gi,"<$1"));break}o=o.previousElementSibling}}},v=(e,t)=>new CustomEvent(e,{detail:t}),g=async(t,r,n,a=n.type)=>{const c="on"+r+":"+a;t.hasAttribute("preventdefault:"+a)&&n.preventDefault(),t.hasAttribute("stoppropagation:"+a)&&n.stopPropagation();const l=t._qc_,b=l&&l.li.filter((e=>e[0]===c));if(b&&b.length>0){for(const e of b){const o=e[1].getFn([t,n],(()=>t[p]))(n,t),r=n.cancelBubble;m(o)&&await o,r&&n.stopPropagation()}return}const u=t[f](c);if(u){const r=t.closest("[q\\\\:container]"),a=r[f]("q:base"),c=r[f]("q:version")||"unknown",l=r[f]("q:manifest-hash")||"dev",b=new URL(a,e.baseURI);for(const f of u.split("\\n")){const u=new URL(f,b),y=u.href,h=u.hash[i](/^#?([^?[|]*).*$/,"$1")||"default",d=performance.now();let w,v,g;const A=f.startsWith("#"),_={qBase:a,qManifest:l,qVersion:c,href:y,symbol:h,element:t,reqTime:d};if(A){const t=r.getAttribute("q:instance");w=(e["qFuncs_"+t]||[])[Number.parseInt(h)],w||(v="sync",g=Error("sync handler error for symbol: "+h))}else{const e=u.href.split("#")[0];try{const t=import(e);q(r),w=(await t)[h],w||(v="no-symbol",g=Error(`${h} not in ${e}`))}catch(e){v||(v="async"),g=e}}if(!w){E("qerror",s({importError:v,error:g},_)),console.error(g);break}const k=e[o];if(t[p])try{e[o]=[t,n,u],A||E("qsymbol",s({},_));const r=w(n,t);m(r)&&await r}catch(e){E("qerror",s({error:e},_))}finally{e[o]=k}}}},E=(t,o)=>{e.dispatchEvent(v(t,o))},A=e=>e[i](/([A-Z])/g,(e=>"-"+e.toLowerCase())),_=async e=>{let t=A(e.type),o=e[l];for(w("-document",e,t);o&&o[f];){const r=g(o,"",e,t);let n=e.cancelBubble;m(r)&&await r,n=n||e.cancelBubble||o.hasAttribute("stoppropagation:"+e.type),o=e.bubbles&&!0!==n?o.parentElement:null}},k=e=>{w("-window",e,A(e.type))},C=()=>{var o;const s=e.readyState;if(!t&&("interactive"==s||"complete"==s)&&(a.forEach(d),t=1,E("qinit"),(null!=(o=r.requestIdleCallback)?o:r.setTimeout).bind(r)((()=>E("qidle"))),n.has(b))){const e=h("[on\\\\:"+b+"]"),t=new IntersectionObserver((e=>{for(const o of e)o.isIntersecting&&(t.unobserve(o[l]),g(o[l],"",v(b,o)))}));e[c]((e=>t.observe(e)))}},O=(e,t,o,r=!1)=>e.addEventListener(t,o,{capture:r,passive:!1}),S=(...e)=>{for(const t of e)"string"==typeof t?n.has(t)||(a.forEach((e=>O(e,t,_,!0))),O(r,t,k,!0),n.add(t)):a.has(t)||(n.forEach((e=>O(t,e,_,!0))),a.add(t))};if(!(o in e)){e[o]=0;const t=r.qwikevents;Array.isArray(t)&&S(...t),r.qwikevents={events:n,roots:a,push:S},O(e,"readystatechange",C),C()}})(document)})()';
var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    var __defProp = Object.defineProperty;\n    var __getOwnPropSymbols = Object.getOwnPropertySymbols;\n    var __hasOwnProp = Object.prototype.hasOwnProperty;\n    var __propIsEnum = Object.prototype.propertyIsEnumerable;\n    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {\n        enumerable: !0,\n        configurable: !0,\n        writable: !0,\n        value: value\n    }) : obj[key] = value;\n    var __spreadValues = (a, b) => {\n        for (var prop in b || (b = {})) {\n            __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n        }\n        if (__getOwnPropSymbols) {\n            for (var prop of __getOwnPropSymbols(b)) {\n                __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n            }\n        }\n        return a;\n    };\n    ((doc, hasInitialized) => {\n        const Q_CONTEXT = "__q_context__";\n        const win = window;\n        const events =  new Set;\n        const roots =  new Set([ doc ]);\n        const nativeQuerySelectorAll = (root, selector) => Array.from(root.querySelectorAll(selector));\n        const querySelectorAll = query => {\n            const elements = [];\n            roots.forEach((root => elements.push(...nativeQuerySelectorAll(root, query))));\n            return elements;\n        };\n        const findShadowRoots = fragment => {\n            processEventOrNode(fragment);\n            nativeQuerySelectorAll(fragment, "[q\\\\:shadowroot]").forEach((parent => {\n                const shadowRoot = parent.shadowRoot;\n                shadowRoot && findShadowRoots(shadowRoot);\n            }));\n        };\n        const isPromise = promise => promise && "function" == typeof promise.then;\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((el => dispatch(el, infix, ev, type)));\n        };\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === script.getAttribute("type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            element.hasAttribute("stoppropagation:" + eventName) && ev.stopPropagation();\n            const ctx = element._qc_;\n            const relevantListeners = ctx && ctx.li.filter((li => li[0] === attrName));\n            if (relevantListeners && relevantListeners.length > 0) {\n                for (const listener of relevantListeners) {\n                    const results = listener[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                    const cancelBubble = ev.cancelBubble;\n                    isPromise(results) && await results;\n                    cancelBubble && ev.stopPropagation();\n                }\n                return;\n            }\n            const attrValue = element.getAttribute(attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const qBase = container.getAttribute("q:base");\n                const qVersion = container.getAttribute("q:version") || "unknown";\n                const qManifest = container.getAttribute("q:manifest-hash") || "dev";\n                const base = new URL(qBase, doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const href = url.href;\n                    const symbol = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    let handler;\n                    let importError;\n                    let error;\n                    const isSync = qrl.startsWith("#");\n                    const eventData = {\n                        qBase: qBase,\n                        qManifest: qManifest,\n                        qVersion: qVersion,\n                        href: href,\n                        symbol: symbol,\n                        element: element,\n                        reqTime: reqTime\n                    };\n                    if (isSync) {\n                        const hash = container.getAttribute("q:instance");\n                        handler = (doc["qFuncs_" + hash] || [])[Number.parseInt(symbol)];\n                        if (!handler) {\n                            importError = "sync";\n                            error = new Error("sync handler error for symbol: " + symbol);\n                        }\n                    } else {\n                        const uri = url.href.split("#")[0];\n                        try {\n                            const module = import(\n                                                        uri);\n                            resolveContainer(container);\n                            handler = (await module)[symbol];\n                            if (!handler) {\n                                importError = "no-symbol";\n                                error = new Error(`${symbol} not in ${uri}`);\n                            }\n                        } catch (err) {\n                            importError || (importError = "async");\n                            error = err;\n                        }\n                    }\n                    if (!handler) {\n                        emitEvent("qerror", __spreadValues({\n                            importError: importError,\n                            error: error\n                        }, eventData));\n                        console.error(error);\n                        break;\n                    }\n                    const previousCtx = doc[Q_CONTEXT];\n                    if (element.isConnected) {\n                        try {\n                            doc[Q_CONTEXT] = [ element, ev, url ];\n                            isSync || emitEvent("qsymbol", __spreadValues({}, eventData));\n                            const results = handler(ev, element);\n                            isPromise(results) && await results;\n                        } catch (error2) {\n                            emitEvent("qerror", __spreadValues({\n                                error: error2\n                            }, eventData));\n                        } finally {\n                            doc[Q_CONTEXT] = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                const results = dispatch(element, "", ev, type);\n                let cancelBubble = ev.cancelBubble;\n                isPromise(results) && await results;\n                cancelBubble = cancelBubble || ev.cancelBubble || element.hasAttribute("stoppropagation:" + ev.type);\n                element = ev.bubbles && !0 !== cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                roots.forEach(findShadowRoots);\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const processEventOrNode = (...eventNames) => {\n            for (const eventNameOrNode of eventNames) {\n                if ("string" == typeof eventNameOrNode) {\n                    if (!events.has(eventNameOrNode)) {\n                        roots.forEach((root => addEventListener(root, eventNameOrNode, processDocumentEvent, !0)));\n                        addEventListener(win, eventNameOrNode, processWindowEvent, !0);\n                        events.add(eventNameOrNode);\n                    }\n                } else if (!roots.has(eventNameOrNode)) {\n                    events.forEach((eventName => addEventListener(eventNameOrNode, eventName, processDocumentEvent, !0)));\n                    roots.add(eventNameOrNode);\n                }\n            }\n        };\n        if (!(Q_CONTEXT in doc)) {\n            doc[Q_CONTEXT] = 0;\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && processEventOrNode(...qwikevents);\n            win.qwikevents = {\n                events: events,\n                roots: roots,\n                push: processEventOrNode\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})()';
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
  qwik: "1.13.0-dev+23ed7db",
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
  if (!resolvedManifest) {
    console.warn(
      `Missing client manifest, loading symbols in the client might 404. Please ensure the client build has run and generated the manifest for the server build.`
    );
  }
  await setServerPlatform(opts, resolvedManifest);
  const bundleGraph = resolvedManifest?.manifest.bundleGraph;
  if (bundleGraph) {
    initPreloader(bundleGraph);
  }
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
      if (opts.prefetchStrategy !== null) {
        const preloadBundles = getPreloadPaths(snapshotResult, opts, resolvedManifest);
        const base2 = containerAttributes["q:base"];
        if (preloadBundles.length > 0) {
          const prefetchImpl = includePreloader(
            base2,
            resolvedManifest,
            opts.prefetchStrategy,
            preloadBundles,
            opts.serverData?.nonce
          );
          if (prefetchImpl) {
            children.push(prefetchImpl);
          }
        }
      }
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
