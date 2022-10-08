/**
 * @license
 * @builder.io/qwik/server 0.10.0
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
if (typeof global == 'undefined') {
  const g = 'undefined' != typeof globalThis ? globalThis : 'undefined' != typeof window ? window : 'undefined' != typeof self ? self : {};
  g.global = g;
}

var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

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
  let base = opts.base;
  if (typeof base === "string") {
    if (!base.endsWith("/")) {
      base += "/";
    }
    return base;
  }
  return "/build/";
}
var versions = {
  qwik: "0.10.0",
  qwikDom: "2.1.19"
};

// packages/qwik/src/server/render.ts
import { renderSSR, Fragment as Fragment2, jsx as jsx2, _pauseFromContexts } from "@builder.io/qwik";

// packages/qwik/src/server/platform.ts
import { setPlatform } from "@builder.io/qwik";
function createPlatform(opts, resolvedManifest) {
  const mapper = resolvedManifest?.mapper;
  const mapperFn = opts.symbolMapper ? opts.symbolMapper : (symbolName) => {
    if (mapper) {
      const hash = getSymbolHash(symbolName);
      const result = mapper[hash];
      if (!result) {
        console.error("Cannot resolve symbol", symbolName, "in", mapper);
      }
      return result;
    }
  };
  const serverPlatform = {
    isServer: true,
    async importSymbol(_containerEl, url, symbolName) {
      let modulePath = String(url);
      if (!modulePath.endsWith(".js")) {
        modulePath += ".js";
      }
      const module = __require(modulePath);
      if (!(symbolName in module)) {
        throw new Error(`Q-ERROR: missing symbol '${symbolName}' in module '${modulePath}'.`);
      }
      const symbol = module[symbolName];
      return symbol;
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
    chunkForSymbol(symbolName) {
      return mapperFn(symbolName, mapper);
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

// packages/qwik/src/server/scripts.ts
var QWIK_LOADER_DEFAULT_MINIFIED = '((e,t)=>{const n="__q_context__",o=window,r=new Set,i=t=>e.querySelectorAll(t),s=(e,t,n=t.type)=>{i("[on"+e+"\\\\:"+n+"]").forEach((o=>l(o,e,t,n)))},a=(e,t)=>new CustomEvent(e,{detail:t}),c=(t,n)=>(t=t.closest("[q\\\\:container]"),new URL(n,new URL(t.getAttribute("q:base"),e.baseURI))),l=async(t,o,r,i=r.type)=>{const s="on"+o+":"+i;t.hasAttribute("preventdefault:"+i)&&r.preventDefault();const a=t._qc_,l=null==a?void 0:a.li.filter((e=>e[0]===s));if(l&&l.length>0){for(const e of l)await e[1].getFn([t,r],(()=>t.isConnected))(r,t);return}const d=t.getAttribute(s);if(d)for(const o of d.split("\\n")){const i=c(t,o),s=b(i),a=performance.now(),l=u(await import(i.href.split("#")[0]),s),d=e[n];if(t.isConnected)try{e[n]=[t,r,i],f("qsymbol",{symbol:s,element:t,reqTime:a}),await l(r,t)}finally{e[n]=d}}},f=(t,n)=>{e.dispatchEvent(a(t,n))},u=(e,t)=>{if(t in e)return e[t];for(const n of Object.values(e))if("object"==typeof n&&n&&t in n)return n[t]},b=e=>e.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",d=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),p=async e=>{let t=d(e.type),n=e.target;for(s("-document",e,t);n&&n.getAttribute;)await l(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},v=e=>{s("-window",e,d(e.type))},w=()=>{var n;const s=e.readyState;if(!t&&("interactive"==s||"complete"==s)&&(t=1,f("qinit"),(null!=(n=o.requestIdleCallback)?n:o.setTimeout).bind(o)((()=>f("qidle"))),r.has("qvisible"))){const e=i("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),l(n.target,"",a("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},q=(e,t,n,o=!1)=>e.addEventListener(t,n,{capture:o}),y=t=>{for(const n of t)r.has(n)||(q(e,n,p,!0),q(o,n,v),r.add(n))};if(!e.qR){const t=o.qwikevents;Array.isArray(t)&&y(t),o.qwikevents={push:(...e)=>y(e)},q(e,"readystatechange",w),w()}})(document);';
var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    ((doc, hasInitialized) => {\n        const win = window;\n        const events =  new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const qrlResolver = (element, qrl) => {\n            element = element.closest("[q\\\\:container]");\n            return new URL(qrl, new URL(element.getAttribute("q:base"), doc.baseURI));\n        };\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const qrls = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));\n            if (qrls && qrls.length > 0) {\n                for (const q of qrls) {\n                    await q[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = element.getAttribute(attrName);\n            if (attrValue) {\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = qrlResolver(element, qrl);\n                    const symbolName = getSymbolName(url);\n                    const reqTime = performance.now();\n                    const handler = findSymbol(await import(url.href.split("#")[0]), symbolName);\n                    const previousCtx = doc.__q_context__;\n                    if (element.isConnected) {\n                        try {\n                            doc.__q_context__ = [ element, ev, url ];\n                            emitEvent("qsymbol", {\n                                symbol: symbolName,\n                                element: element,\n                                reqTime: reqTime\n                            });\n                            await handler(ev, element);\n                        } finally {\n                            doc.__q_context__ = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const findSymbol = (module, symbol) => {\n            if (symbol in module) {\n                return module[symbol];\n            }\n            for (const v of Object.values(module)) {\n                if ("object" == typeof v && v && symbol in v) {\n                    return v[symbol];\n                }\n            }\n        };\n        const getSymbolName = url => url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                await dispatch(element, "", ev, type);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';
var QWIK_LOADER_OPTIMIZE_MINIFIED = '((e,t)=>{const n="__q_context__",o=window,r=new Set,i=t=>e.querySelectorAll(t),s=(e,t,n=t.type)=>{i("[on"+e+"\\\\:"+n+"]").forEach((o=>l(o,e,t,n)))},a=(e,t)=>new CustomEvent(e,{detail:t}),c=(t,n)=>(t=t.closest("[q\\\\:container]"),new URL(n,new URL(t.getAttribute("q:base"),e.baseURI))),l=async(t,o,r,i=r.type)=>{const s="on"+o+":"+i;t.hasAttribute("preventdefault:"+i)&&r.preventDefault();const a=t._qc_,l=null==a?void 0:a.li.filter((e=>e[0]===s));if(l&&l.length>0){for(const e of l)await e[1].getFn([t,r],(()=>t.isConnected))(r,t);return}const d=t.getAttribute(s);if(d)for(const o of d.split("\\n")){const i=c(t,o),s=b(i),a=performance.now(),l=u(await import(i.href.split("#")[0]),s),d=e[n];if(t.isConnected)try{e[n]=[t,r,i],f("qsymbol",{symbol:s,element:t,reqTime:a}),await l(r,t)}finally{e[n]=d}}},f=(t,n)=>{e.dispatchEvent(a(t,n))},u=(e,t)=>{if(t in e)return e[t];for(const n of Object.values(e))if("object"==typeof n&&n&&t in n)return n[t]},b=e=>e.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",d=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),p=async e=>{let t=d(e.type),n=e.target;for(s("-document",e,t);n&&n.getAttribute;)await l(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},v=e=>{s("-window",e,d(e.type))},w=()=>{var n;const s=e.readyState;if(!t&&("interactive"==s||"complete"==s)&&(t=1,f("qinit"),(null!=(n=o.requestIdleCallback)?n:o.setTimeout).bind(o)((()=>f("qidle"))),r.has("qvisible"))){const e=i("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),l(n.target,"",a("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},q=(e,t,n,o=!1)=>e.addEventListener(t,n,{capture:o}),y=t=>{for(const n of t)r.has(n)||(q(e,n,p,!0),q(o,n,v),r.add(n))};if(!e.qR){const t=o.qwikevents;Array.isArray(t)&&y(t),o.qwikevents={push:(...e)=>y(e)},q(e,"readystatechange",w),w()}})(document);';
var QWIK_LOADER_OPTIMIZE_DEBUG = '(() => {\n    ((doc, hasInitialized) => {\n        const win = window;\n        const events = new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const qrlResolver = (element, qrl) => {\n            element = element.closest("[q\\\\:container]");\n            return new URL(qrl, new URL(element.getAttribute("q:base"), doc.baseURI));\n        };\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const qrls = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));\n            if (qrls && qrls.length > 0) {\n                for (const q of qrls) {\n                    await q[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = element.getAttribute(attrName);\n            if (attrValue) {\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = qrlResolver(element, qrl);\n                    const symbolName = getSymbolName(url);\n                    const reqTime = performance.now();\n                    const handler = findSymbol(await import(url.href.split("#")[0]), symbolName);\n                    const previousCtx = doc.__q_context__;\n                    if (element.isConnected) {\n                        try {\n                            doc.__q_context__ = [ element, ev, url ];\n                            emitEvent("qsymbol", {\n                                symbol: symbolName,\n                                element: element,\n                                reqTime: reqTime\n                            });\n                            await handler(ev, element);\n                        } finally {\n                            doc.__q_context__ = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const findSymbol = (module, symbol) => {\n            if (symbol in module) {\n                return module[symbol];\n            }\n            for (const v of Object.values(module)) {\n                if ("object" == typeof v && v && symbol in v) {\n                    return v[symbol];\n                }\n            }\n        };\n        const getSymbolName = url => url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                await dispatch(element, "", ev, type);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';
function getQwikLoaderScript(opts = {}) {
  if (Array.isArray(opts.events) && opts.events.length > 0) {
    const loader = opts.debug ? QWIK_LOADER_OPTIMIZE_DEBUG : QWIK_LOADER_OPTIMIZE_MINIFIED;
    return loader.replace("window.qEvents", JSON.stringify(opts.events));
  }
  return opts.debug ? QWIK_LOADER_DEFAULT_DEBUG : QWIK_LOADER_DEFAULT_MINIFIED;
}

// packages/qwik/src/server/prefetch-strategy.ts
function getPrefetchResources(snapshotResult, opts, resolvedManifest) {
  if (!resolvedManifest) {
    return [];
  }
  const prefetchStrategy = opts.prefetchStrategy;
  const buildBase = getBuildBase(opts);
  if (prefetchStrategy !== null) {
    if (!prefetchStrategy || !prefetchStrategy.symbolsToPrefetch || prefetchStrategy.symbolsToPrefetch === "auto") {
      return getAutoPrefetch(snapshotResult, resolvedManifest, buildBase);
    }
    if (typeof prefetchStrategy.symbolsToPrefetch === "function") {
      try {
        return prefetchStrategy.symbolsToPrefetch({ manifest: resolvedManifest.manifest });
      } catch (e) {
        console.error("getPrefetchUrls, symbolsToPrefetch()", e);
      }
    }
  }
  return [];
}
function getAutoPrefetch(snapshotResult, resolvedManifest, buildBase) {
  const prefetchResources = [];
  const listeners = snapshotResult?.listeners;
  const stateObjs = snapshotResult?.objs;
  const { mapper, manifest } = resolvedManifest;
  const urls = /* @__PURE__ */ new Set();
  if (Array.isArray(listeners)) {
    for (const prioritizedSymbolName in mapper) {
      const hasSymbol = listeners.some((l) => {
        return l.qrl.getHash() === prioritizedSymbolName;
      });
      if (hasSymbol) {
        addBundle(manifest, urls, prefetchResources, buildBase, mapper[prioritizedSymbolName][1]);
      }
    }
  }
  if (Array.isArray(stateObjs)) {
    for (const obj of stateObjs) {
      if (isQrl(obj)) {
        const qrlSymbolName = obj.getHash();
        const resolvedSymbol = mapper[qrlSymbolName];
        if (resolvedSymbol) {
          addBundle(manifest, urls, prefetchResources, buildBase, resolvedSymbol[0]);
        }
      }
    }
  }
  return prefetchResources;
}
function addBundle(manifest, urls, prefetchResources, buildBase, bundleFileName) {
  const url = buildBase + bundleFileName;
  if (!urls.has(url)) {
    urls.add(url);
    const bundle = manifest.bundles[bundleFileName];
    if (bundle) {
      const prefetchResource = {
        url,
        imports: []
      };
      prefetchResources.push(prefetchResource);
      if (Array.isArray(bundle.imports)) {
        for (const importedFilename of bundle.imports) {
          addBundle(manifest, urls, prefetchResource.imports, buildBase, importedFilename);
        }
      }
    }
  }
}
var isQrl = (value) => {
  return typeof value === "function" && typeof value.getSymbol === "function";
};

// packages/qwik/src/core/util/qdev.ts
var qDev = globalThis.qDev === true;
var qSerialize = globalThis.qSerialize !== false;
var qDynamicPlatform = globalThis.qDynamicPlatform !== false;
var qTest = globalThis.qTest === true;
var qRuntimeQrl = globalThis.qRuntimeQrl === true;

// packages/qwik/src/core/util/flyweight.ts
var EMPTY_ARRAY = [];
var EMPTY_OBJ = {};
if (qDev) {
  Object.freeze(EMPTY_ARRAY);
  Object.freeze(EMPTY_OBJ);
  Error.stackTraceLimit = 9999;
}

// packages/qwik/src/optimizer/src/manifest.ts
var EVENT_PRIORITY = [
  "click",
  "dblclick",
  "contextmenu",
  "auxclick",
  "pointerdown",
  "pointerup",
  "pointermove",
  "pointerover",
  "pointerenter",
  "pointerleave",
  "pointerout",
  "pointercancel",
  "gotpointercapture",
  "lostpointercapture",
  "touchstart",
  "touchend",
  "touchmove",
  "touchcancel",
  "mousedown",
  "mouseup",
  "mousemove",
  "mouseenter",
  "mouseleave",
  "mouseover",
  "mouseout",
  "wheel",
  "gesturestart",
  "gesturechange",
  "gestureend",
  "keydown",
  "keyup",
  "keypress",
  "input",
  "change",
  "search",
  "invalid",
  "beforeinput",
  "select",
  "focusin",
  "focusout",
  "focus",
  "blur",
  "submit",
  "reset",
  "scroll"
].map((n) => `on${n.toLowerCase()}$`);
var FUNCTION_PRIORITY = [
  "useWatch$",
  "useClientEffect$",
  "useEffect$",
  "component$",
  "useStyles$",
  "useStylesScoped$"
].map((n) => n.toLowerCase());
function getValidManifest(manifest) {
  if (manifest != null && manifest.mapping != null && typeof manifest.mapping === "object" && manifest.symbols != null && typeof manifest.symbols === "object" && manifest.bundles != null && typeof manifest.bundles === "object") {
    return manifest;
  }
  return void 0;
}

// packages/qwik/src/server/prefetch-implementation.ts
import { Fragment, jsx } from "@builder.io/qwik";

// packages/qwik/src/server/prefetch-utils.ts
function workerFetchScript() {
  const fetch = `Promise.all(e.data.map(u=>fetch(u))).finally(()=>{setTimeout(postMessage({}),9999)})`;
  const workerBody = `onmessage=(e)=>{${fetch}}`;
  const blob = `new Blob(['${workerBody}'],{type:"text/javascript"})`;
  const url = `URL.createObjectURL(${blob})`;
  let s = `const w=new Worker(${url});`;
  s += `w.postMessage(u.map(u=>new URL(u,origin)+''));`;
  s += `w.onmessage=()=>{w.terminate()};`;
  return s;
}
function prefetchUrlsEventScript(prefetchResources) {
  const data = {
    bundles: flattenPrefetchResources(prefetchResources).map((u) => u.split("/").pop())
  };
  return `document.dispatchEvent(new CustomEvent("qprefetch",{detail:${JSON.stringify(data)}}))`;
}
function flattenPrefetchResources(prefetchResources) {
  const urls = [];
  const addPrefetchResource = (prefetchResources2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        if (!urls.includes(prefetchResource.url)) {
          urls.push(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports);
        }
      }
    }
  };
  addPrefetchResource(prefetchResources);
  return urls;
}

// packages/qwik/src/server/prefetch-implementation.ts
function applyPrefetchImplementation(prefetchStrategy, prefetchResources) {
  const prefetchImpl = normalizePrefetchImplementation(prefetchStrategy?.implementation);
  const prefetchNodes = [];
  if (prefetchImpl.prefetchEvent === "always") {
    prefetchUrlsEvent(prefetchNodes, prefetchResources);
  }
  if (prefetchImpl.linkInsert === "html-append") {
    linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl);
  }
  if (prefetchImpl.linkInsert === "js-append") {
    linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl);
  } else if (prefetchImpl.workerFetchInsert === "always") {
    workerFetchImplementation(prefetchNodes, prefetchResources);
  }
  if (prefetchNodes.length > 0) {
    return jsx(Fragment, { children: prefetchNodes });
  }
  return null;
}
function prefetchUrlsEvent(prefetchNodes, prefetchResources) {
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      dangerouslySetInnerHTML: prefetchUrlsEventScript(prefetchResources)
    })
  );
}
function linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl) {
  const urls = flattenPrefetchResources(prefetchResources);
  const rel = prefetchImpl.linkRel || "prefetch";
  for (const url of urls) {
    const attributes = {};
    attributes["href"] = url;
    attributes["rel"] = rel;
    if (rel === "prefetch" || rel === "preload") {
      if (url.endsWith(".js")) {
        attributes["as"] = "script";
      }
    }
    prefetchNodes.push(jsx("link", attributes, void 0));
  }
}
function linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl) {
  const rel = prefetchImpl.linkRel || "prefetch";
  let s = ``;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `let supportsLinkRel = true;`;
  }
  s += `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += `u.map((u,i)=>{`;
  s += `const l=document.createElement('link');`;
  s += `l.setAttribute("href",u);`;
  s += `l.setAttribute("rel","${rel}");`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(i===0){`;
    s += `try{`;
    s += `supportsLinkRel=l.relList.supports("${rel}");`;
    s += `}catch(e){}`;
    s += `}`;
  }
  s += `document.body.appendChild(l);`;
  s += `});`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(!supportsLinkRel){`;
    s += workerFetchScript();
    s += `}`;
  }
  if (prefetchImpl.workerFetchInsert === "always") {
    s += workerFetchScript();
  }
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      dangerouslySetInnerHTML: s
    })
  );
}
function workerFetchImplementation(prefetchNodes, prefetchResources) {
  let s = `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += workerFetchScript();
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      dangerouslySetInnerHTML: s
    })
  );
}
function normalizePrefetchImplementation(input) {
  if (typeof input === "string") {
    switch (input) {
      case "link-prefetch-html": {
        deprecatedWarning(input, "linkInsert");
        return {
          linkInsert: "html-append",
          linkRel: "prefetch",
          workerFetchInsert: null,
          prefetchEvent: null
        };
      }
      case "link-prefetch": {
        deprecatedWarning(input, "linkInsert");
        return {
          linkInsert: "js-append",
          linkRel: "prefetch",
          workerFetchInsert: "no-link-support",
          prefetchEvent: null
        };
      }
      case "link-preload-html": {
        deprecatedWarning(input, "linkInsert");
        return {
          linkInsert: "html-append",
          linkRel: "preload",
          workerFetchInsert: null,
          prefetchEvent: null
        };
      }
      case "link-preload": {
        deprecatedWarning(input, "linkInsert");
        return {
          linkInsert: "js-append",
          linkRel: "preload",
          workerFetchInsert: "no-link-support",
          prefetchEvent: null
        };
      }
      case "link-modulepreload-html": {
        deprecatedWarning(input, "linkInsert");
        return {
          linkInsert: "html-append",
          linkRel: "modulepreload",
          workerFetchInsert: null,
          prefetchEvent: null
        };
      }
      case "link-modulepreload": {
        deprecatedWarning(input, "linkInsert");
        return {
          linkInsert: "js-append",
          linkRel: "modulepreload",
          workerFetchInsert: "no-link-support",
          prefetchEvent: null
        };
      }
    }
    deprecatedWarning(input, "workerFetchInsert");
    return {
      linkInsert: null,
      linkRel: null,
      workerFetchInsert: "always",
      prefetchEvent: null
    };
  }
  if (input && typeof input === "object") {
    return input;
  }
  return PrefetchImplementationDefault;
}
var PrefetchImplementationDefault = {
  linkInsert: null,
  linkRel: null,
  workerFetchInsert: null,
  prefetchEvent: "always"
};
function deprecatedWarning(oldApi, newApi) {
  console.warn(
    `The Prefetch Strategy Implementation "${oldApi}" has been deprecated and will be removed in an upcoming release. Please update to use the "prefetchStrategy.implementation.${newApi}" interface.`
  );
}

// packages/qwik/src/server/render.ts
var DOCTYPE = "<!DOCTYPE html>";
async function renderToStream(rootNode, opts) {
  let stream = opts.stream;
  let bufferSize = 0;
  let totalSize = 0;
  let networkFlushes = 0;
  let firstFlushTime = 0;
  const inOrderStreaming = opts.streaming?.inOrder ?? {
    strategy: "auto",
    maximunInitialChunk: 5e4,
    maximunChunk: 3e4
  };
  const containerTagName = opts.containerTagName ?? "html";
  const containerAttributes = opts.containerAttributes ?? {};
  let buffer = "";
  const nativeStream = stream;
  const firstFlushTimer = createTimer();
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
    bufferSize += chunk.length;
    totalSize += chunk.length;
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
  if (!opts.manifest) {
    console.warn("Missing client manifest, loading symbols in the client might 404");
  }
  const buildBase = getBuildBase(opts);
  const resolvedManifest = resolveManifest(opts.manifest);
  await setServerPlatform(opts, resolvedManifest);
  let snapshotResult = null;
  const injections = resolvedManifest?.manifest.injections;
  const beforeContent = injections ? injections.map((injection) => jsx2(injection.tag, injection.attributes ?? EMPTY_OBJ)) : void 0;
  const renderTimer = createTimer();
  const renderSymbols = [];
  let renderTime = 0;
  let snapshotTime = 0;
  await renderSSR(rootNode, {
    stream,
    containerTagName,
    containerAttributes,
    envData: opts.envData,
    base: buildBase,
    beforeContent,
    beforeClose: async (contexts, containerState) => {
      renderTime = renderTimer();
      const snapshotTimer = createTimer();
      snapshotResult = await _pauseFromContexts(contexts, containerState);
      const jsonData = JSON.stringify(snapshotResult.state, void 0, qDev ? "  " : void 0);
      const children = [
        jsx2("script", {
          type: "qwik/json",
          dangerouslySetInnerHTML: escapeText(jsonData)
        })
      ];
      if (opts.prefetchStrategy !== null) {
        const prefetchResources = getPrefetchResources(snapshotResult, opts, resolvedManifest);
        if (prefetchResources.length > 0) {
          const prefetchImpl = applyPrefetchImplementation(
            opts.prefetchStrategy,
            prefetchResources
          );
          if (prefetchImpl) {
            children.push(prefetchImpl);
          }
        }
      }
      const needLoader = !snapshotResult || snapshotResult.mode !== "static";
      const includeMode = opts.qwikLoader?.include ?? "auto";
      const includeLoader = includeMode === "always" || includeMode === "auto" && needLoader;
      if (includeLoader) {
        const qwikLoaderScript = getQwikLoaderScript({
          events: opts.qwikLoader?.events,
          debug: opts.debug
        });
        children.push(
          jsx2("script", {
            id: "qwikloader",
            dangerouslySetInnerHTML: qwikLoaderScript
          })
        );
      }
      const uniqueListeners = /* @__PURE__ */ new Set();
      snapshotResult.listeners.forEach((li) => {
        uniqueListeners.add(JSON.stringify(li.eventName));
      });
      const extraListeners = Array.from(uniqueListeners);
      if (extraListeners.length > 0) {
        let content = `window.qwikevents.push(${extraListeners.join(", ")})`;
        if (!includeLoader) {
          content = `window.qwikevents||=[];${content}`;
        }
        children.push(
          jsx2("script", {
            dangerouslySetInnerHTML: content
          })
        );
      }
      collectRenderSymbols(renderSymbols, contexts);
      snapshotTime = snapshotTimer();
      return jsx2(Fragment2, { children });
    }
  });
  flush();
  const result = {
    prefetchResources: void 0,
    snapshotResult,
    flushes: networkFlushes,
    manifest: resolvedManifest?.manifest,
    size: totalSize,
    timing: {
      render: renderTime,
      snapshot: snapshotTime,
      firstFlush: firstFlushTime
    },
    _symbols: renderSymbols
  };
  return result;
}
async function renderToString(rootNode, opts = {}) {
  const chunks = [];
  const stream = {
    write: (chunk) => {
      chunks.push(chunk);
    }
  };
  const result = await renderToStream(rootNode, {
    ...opts,
    stream
  });
  return {
    ...result,
    html: chunks.join("")
  };
}
function resolveManifest(manifest) {
  if (!manifest) {
    return void 0;
  }
  if ("mapper" in manifest) {
    return manifest;
  }
  manifest = getValidManifest(manifest);
  if (manifest) {
    const mapper = {};
    Object.entries(manifest.mapping).forEach(([key, value]) => {
      mapper[getSymbolHash(key)] = [key, value];
    });
    return {
      mapper,
      manifest
    };
  }
  return void 0;
}
var escapeText = (str) => {
  return str.replace(/<(\/?script)/g, "\\x3C$1");
};
function collectRenderSymbols(renderSymbols, elements) {
  for (const ctx of elements) {
    const symbol = ctx.$componentQrl$?.getSymbol();
    if (symbol && !renderSymbols.includes(symbol)) {
      renderSymbols.push(symbol);
    }
  }
}
export {
  getQwikLoaderScript,
  renderToStream,
  renderToString,
  resolveManifest,
  versions
};
