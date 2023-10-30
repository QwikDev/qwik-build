/**
 * @license
 * @builder.io/qwik/server 1.2.15
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
globalThis.qwikServer = (function (module) {

if (typeof require !== 'function' && typeof location !== 'undefined' && typeof navigator !== 'undefined') {
  // shim cjs require() for core.cjs within a browser
  globalThis.require = function(path) {
    if (path === './core.cjs' || path === '@builder.io/qwik') {
      if (!self.qwikCore) {
        throw new Error('Qwik Core global, "globalThis.qwikCore", must already be loaded for the Qwik Server to be used within a browser.');
      }
      return self.qwikCore;
    }
    if (path === '@builder.io/qwik/build') {
      if (!self.qwikBuild) {
        throw new Error('Qwik Build global, "globalThis.qwikBuild", must already be loaded for the Qwik Server to be used within a browser.');
      }
      return self.qwikBuild;
    }
    throw new Error('Unable to require() path "' + path + '" from a browser environment.');
  };
}
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

// packages/qwik/src/server/index.ts
var server_exports = {};
__export(server_exports, {
  getQwikLoaderScript: () => getQwikLoaderScript,
  renderToStream: () => renderToStream,
  renderToString: () => renderToString,
  resolveManifest: () => resolveManifest,
  setServerPlatform: () => setServerPlatform2,
  versions: () => versions
});
module.exports = __toCommonJS(server_exports);
var import_qwik4 = require("@builder.io/qwik");

// packages/qwik/src/server/platform.ts
var import_qwik = require("@builder.io/qwik");
function createPlatform(opts, resolvedManifest) {
  const mapper = resolvedManifest == null ? void 0 : resolvedManifest.mapper;
  const mapperFn = opts.symbolMapper ? opts.symbolMapper : (symbolName) => {
    var _a;
    if (mapper) {
      const hash = getSymbolHash(symbolName);
      const result = mapper[hash];
      if (!result) {
        const isRegistered = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.has(hash);
        if (isRegistered) {
          return [symbolName, "_"];
        }
        console.error("Cannot resolve symbol", symbolName, "in", mapper);
      }
      return result;
    }
  };
  const serverPlatform = {
    isServer: true,
    async importSymbol(_containerEl, url, symbolName) {
      var _a;
      const hash = getSymbolHash(symbolName);
      const regSym = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.get(hash);
      if (regSym) {
        return regSym;
      }
      let modulePath = String(url);
      if (!modulePath.endsWith(".js")) {
        modulePath += ".js";
      }
      const module2 = require(modulePath);
      if (!(symbolName in module2)) {
        throw new Error(`Q-ERROR: missing symbol '${symbolName}' in module '${modulePath}'.`);
      }
      return module2[symbolName];
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
  (0, import_qwik.setPlatform)(platform);
}
var getSymbolHash = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};

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
  if (typeof opts.base === "function") {
    base = opts.base(opts);
  }
  if (typeof base === "string") {
    if (!base.endsWith("/")) {
      base += "/";
    }
    return base;
  }
  return "/build/";
}
var versions = {
  qwik: "1.2.15",
  qwikDom: "2.1.19"
};

// packages/qwik/src/server/render.ts
var import_qwik3 = require("@builder.io/qwik");
var import_build = require("@builder.io/qwik/build");

// packages/qwik/src/server/scripts.ts
var QWIK_LOADER_DEFAULT_MINIFIED = '((e,t)=>{const n="__q_context__",o=window,s=new Set,i=t=>e.querySelectorAll(t),a=(e,t,n=t.type)=>{i("[on"+e+"\\\\:"+n+"]").forEach((o=>f(o,e,t,n)))},r=(e,t)=>e.getAttribute(t),l=t=>{if(void 0===t._qwikjson_){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===r(n,"type")){t._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/g,"<$1"));break}n=n.previousElementSibling}}},c=(e,t)=>new CustomEvent(e,{detail:t}),f=async(t,o,s,i=s.type)=>{const a="on"+o+":"+i;t.hasAttribute("preventdefault:"+i)&&s.preventDefault();const c=t._qc_,f=null==c?void 0:c.li.filter((e=>e[0]===a));if(f&&f.length>0){for(const e of f)await e[1].getFn([t,s],(()=>t.isConnected))(s,t);return}const b=r(t,a);if(b){const o=t.closest("[q\\\\:container]"),i=new URL(r(o,"q:base"),e.baseURI);for(const a of b.split("\\n")){const r=new URL(a,i),c=r.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",f=performance.now(),b=import(\n/* @vite-ignore */\nr.href.split("#")[0]);l(o);const p=(await b)[c],u=e[n];if(t.isConnected)try{e[n]=[t,s,r],d("qsymbol",{symbol:c,element:t,reqTime:f}),await p(s,t)}finally{e[n]=u}}}},d=(t,n)=>{e.dispatchEvent(c(t,n))},b=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),p=async e=>{let t=b(e.type),n=e.target;for(a("-document",e,t);n&&n.getAttribute;)await f(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},u=e=>{a("-window",e,b(e.type))},w=()=>{var n;const a=e.readyState;if(!t&&("interactive"==a||"complete"==a)&&(t=1,d("qinit"),(null!=(n=o.requestIdleCallback)?n:o.setTimeout).bind(o)((()=>d("qidle"))),s.has("qvisible"))){const e=i("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),f(n.target,"",c("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},q=(e,t,n,o=!1)=>e.addEventListener(t,n,{capture:o,passive:!1}),v=t=>{for(const n of t)s.has(n)||(q(e,n,p,!0),q(o,n,u),s.add(n))};if(!e.qR){const t=o.qwikevents;Array.isArray(t)&&v(t),o.qwikevents={push:(...e)=>v(e)},q(e,"readystatechange",w),w()}})(document);';
var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    ((doc, hasInitialized) => {\n        const win = window;\n        const events =  new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));\n        };\n        const getAttribute = (el, name) => el.getAttribute(name);\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === getAttribute(script, "type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/g, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const qrls = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));\n            if (qrls && qrls.length > 0) {\n                for (const q of qrls) {\n                    await q[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = getAttribute(element, attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const base = new URL(getAttribute(container, "q:base"), doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const symbolName = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    const module = import(\n                    /* @vite-ignore */\n                    url.href.split("#")[0]);\n                    resolveContainer(container);\n                    const handler = (await module)[symbolName];\n                    const previousCtx = doc.__q_context__;\n                    if (element.isConnected) {\n                        try {\n                            doc.__q_context__ = [ element, ev, url ];\n                            emitEvent("qsymbol", {\n                                symbol: symbolName,\n                                element: element,\n                                reqTime: reqTime\n                            });\n                            await handler(ev, element);\n                        } finally {\n                            doc.__q_context__ = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                await dispatch(element, "", ev, type);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';
var QWIK_LOADER_OPTIMIZE_MINIFIED = '((e,t)=>{const n="__q_context__",o=window,s=new Set,i=t=>e.querySelectorAll(t),a=(e,t,n=t.type)=>{i("[on"+e+"\\\\:"+n+"]").forEach((o=>f(o,e,t,n)))},r=(e,t)=>e.getAttribute(t),l=t=>{if(void 0===t._qwikjson_){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===r(n,"type")){t._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/g,"<$1"));break}n=n.previousElementSibling}}},c=(e,t)=>new CustomEvent(e,{detail:t}),f=async(t,o,s,i=s.type)=>{const a="on"+o+":"+i;t.hasAttribute("preventdefault:"+i)&&s.preventDefault();const c=t._qc_,f=null==c?void 0:c.li.filter((e=>e[0]===a));if(f&&f.length>0){for(const e of f)await e[1].getFn([t,s],(()=>t.isConnected))(s,t);return}const b=r(t,a);if(b){const o=t.closest("[q\\\\:container]"),i=new URL(r(o,"q:base"),e.baseURI);for(const a of b.split("\\n")){const r=new URL(a,i),c=r.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",f=performance.now(),b=import(\n/* @vite-ignore */\nr.href.split("#")[0]);l(o);const p=(await b)[c],u=e[n];if(t.isConnected)try{e[n]=[t,s,r],d("qsymbol",{symbol:c,element:t,reqTime:f}),await p(s,t)}finally{e[n]=u}}}},d=(t,n)=>{e.dispatchEvent(c(t,n))},b=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),p=async e=>{let t=b(e.type),n=e.target;for(a("-document",e,t);n&&n.getAttribute;)await f(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},u=e=>{a("-window",e,b(e.type))},w=()=>{var n;const a=e.readyState;if(!t&&("interactive"==a||"complete"==a)&&(t=1,d("qinit"),(null!=(n=o.requestIdleCallback)?n:o.setTimeout).bind(o)((()=>d("qidle"))),s.has("qvisible"))){const e=i("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),f(n.target,"",c("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},q=(e,t,n,o=!1)=>e.addEventListener(t,n,{capture:o,passive:!1}),v=t=>{for(const n of t)s.has(n)||(q(e,n,p,!0),q(o,n,u),s.add(n))};if(!e.qR){const t=o.qwikevents;Array.isArray(t)&&v(t),o.qwikevents={push:(...e)=>v(e)},q(e,"readystatechange",w),w()}})(document);';
var QWIK_LOADER_OPTIMIZE_DEBUG = '(() => {\n    ((doc, hasInitialized) => {\n        const win = window;\n        const events = new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));\n        };\n        const getAttribute = (el, name) => el.getAttribute(name);\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === getAttribute(script, "type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/g, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const qrls = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));\n            if (qrls && qrls.length > 0) {\n                for (const q of qrls) {\n                    await q[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = getAttribute(element, attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const base = new URL(getAttribute(container, "q:base"), doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const symbolName = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    const module = import(\n                    /* @vite-ignore */\n                    url.href.split("#")[0]);\n                    resolveContainer(container);\n                    const handler = (await module)[symbolName];\n                    const previousCtx = doc.__q_context__;\n                    if (element.isConnected) {\n                        try {\n                            doc.__q_context__ = [ element, ev, url ];\n                            emitEvent("qsymbol", {\n                                symbol: symbolName,\n                                element: element,\n                                reqTime: reqTime\n                            });\n                            await handler(ev, element);\n                        } finally {\n                            doc.__q_context__ = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                await dispatch(element, "", ev, type);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';
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
  const qrls = snapshotResult == null ? void 0 : snapshotResult.qrls;
  const { mapper, manifest } = resolvedManifest;
  const urls = /* @__PURE__ */ new Map();
  if (Array.isArray(qrls)) {
    for (const obj of qrls) {
      const qrlSymbolName = obj.getHash();
      const resolvedSymbol = mapper[qrlSymbolName];
      if (resolvedSymbol) {
        addBundle(manifest, urls, prefetchResources, buildBase, resolvedSymbol[1]);
      }
    }
  }
  return prefetchResources;
}
function addBundle(manifest, urls, prefetchResources, buildBase, bundleFileName) {
  const url = buildBase + bundleFileName;
  let prefetchResource = urls.get(url);
  if (!prefetchResource) {
    prefetchResource = {
      url,
      imports: []
    };
    urls.set(url, prefetchResource);
    const bundle = manifest.bundles[bundleFileName];
    if (bundle) {
      if (Array.isArray(bundle.imports)) {
        for (const importedFilename of bundle.imports) {
          addBundle(manifest, urls, prefetchResource.imports, buildBase, importedFilename);
        }
      }
    }
  }
  prefetchResources.push(prefetchResource);
}

// packages/qwik/src/optimizer/src/manifest.ts
function getValidManifest(manifest) {
  if (manifest != null && manifest.mapping != null && typeof manifest.mapping === "object" && manifest.symbols != null && typeof manifest.symbols === "object" && manifest.bundles != null && typeof manifest.bundles === "object") {
    return manifest;
  }
  return void 0;
}

// packages/qwik/src/server/prefetch-implementation.ts
var import_qwik2 = require("@builder.io/qwik");

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
function getMostReferenced(prefetchResources) {
  const common = /* @__PURE__ */ new Map();
  let total = 0;
  const addPrefetchResource = (prefetchResources2, visited2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        const count = common.get(prefetchResource.url) || 0;
        common.set(prefetchResource.url, count + 1);
        total++;
        if (!visited2.has(prefetchResource.url)) {
          visited2.add(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports, visited2);
        }
      }
    }
  };
  const visited = /* @__PURE__ */ new Set();
  for (const resource of prefetchResources) {
    visited.clear();
    addPrefetchResource(resource.imports, visited);
  }
  const threshold = total / common.size * 2;
  const urls = Array.from(common.entries());
  urls.sort((a, b) => b[1] - a[1]);
  return urls.slice(0, 5).filter((e) => e[1] > threshold).map((e) => e[0]);
}

// packages/qwik/src/server/prefetch-implementation.ts
function applyPrefetchImplementation(prefetchStrategy, prefetchResources, nonce) {
  const prefetchImpl = normalizePrefetchImplementation(prefetchStrategy == null ? void 0 : prefetchStrategy.implementation);
  const prefetchNodes = [];
  if (prefetchImpl.prefetchEvent === "always") {
    prefetchUrlsEvent(prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchImpl.linkInsert === "html-append") {
    linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl);
  }
  if (prefetchImpl.linkInsert === "js-append") {
    linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce);
  } else if (prefetchImpl.workerFetchInsert === "always") {
    workerFetchImplementation(prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchNodes.length > 0) {
    return (0, import_qwik2.jsx)(import_qwik2.Fragment, { children: prefetchNodes });
  }
  return null;
}
function prefetchUrlsEvent(prefetchNodes, prefetchResources, nonce) {
  const mostReferenced = getMostReferenced(prefetchResources);
  for (const url of mostReferenced) {
    prefetchNodes.push(
      (0, import_qwik2.jsx)("link", {
        rel: "modulepreload",
        href: url,
        nonce
      })
    );
  }
  prefetchNodes.push(
    (0, import_qwik2.jsx)("script", {
      "q:type": "prefetch-bundles",
      dangerouslySetInnerHTML: `document.dispatchEvent(new CustomEvent('qprefetch', {detail:{links: [location.pathname]}}))`,
      nonce
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
    prefetchNodes.push((0, import_qwik2.jsx)("link", attributes, void 0));
  }
}
function linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce) {
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
    (0, import_qwik2.jsx)("script", {
      type: "module",
      "q:type": "link-js",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function workerFetchImplementation(prefetchNodes, prefetchResources, nonce) {
  let s = `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += workerFetchScript();
  prefetchNodes.push(
    (0, import_qwik2.jsx)("script", {
      type: "module",
      "q:type": "prefetch-worker",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function normalizePrefetchImplementation(input) {
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

// packages/qwik/src/server/render.ts
var DOCTYPE = "<!DOCTYPE html>";
async function renderToStream(rootNode, opts) {
  var _a;
  let stream = opts.stream;
  let bufferSize = 0;
  let totalSize = 0;
  let networkFlushes = 0;
  let firstFlushTime = 0;
  let buffer = "";
  let snapshotResult;
  const inOrderStreaming = ((_a = opts.streaming) == null ? void 0 : _a.inOrder) ?? {
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
  if (!opts.manifest) {
    console.warn(
      `Missing client manifest, loading symbols in the client might 404. Please ensure the client build has run and generated the manifest for the server build.`
    );
  }
  await setServerPlatform(opts, resolvedManifest);
  const injections = resolvedManifest == null ? void 0 : resolvedManifest.manifest.injections;
  const beforeContent = injections ? injections.map((injection) => (0, import_qwik3.jsx)(injection.tag, injection.attributes ?? {})) : void 0;
  const renderTimer = createTimer();
  const renderSymbols = [];
  let renderTime = 0;
  let snapshotTime = 0;
  await (0, import_qwik3._renderSSR)(rootNode, {
    stream,
    containerTagName,
    containerAttributes,
    serverData: opts.serverData,
    base: buildBase,
    beforeContent,
    beforeClose: async (contexts, containerState, _dynamic, textNodes) => {
      var _a2, _b, _c, _d, _e, _f, _g;
      renderTime = renderTimer();
      const snapshotTimer = createTimer();
      snapshotResult = await (0, import_qwik3._pauseFromContexts)(contexts, containerState, void 0, textNodes);
      const children = [];
      if (opts.prefetchStrategy !== null) {
        const prefetchResources = getPrefetchResources(snapshotResult, opts, resolvedManifest);
        if (prefetchResources.length > 0) {
          const prefetchImpl = applyPrefetchImplementation(
            opts.prefetchStrategy,
            prefetchResources,
            (_a2 = opts.serverData) == null ? void 0 : _a2.nonce
          );
          if (prefetchImpl) {
            children.push(prefetchImpl);
          }
        }
      }
      const jsonData = JSON.stringify(snapshotResult.state, void 0, import_build.isDev ? "  " : void 0);
      children.push(
        (0, import_qwik3.jsx)("script", {
          type: "qwik/json",
          dangerouslySetInnerHTML: escapeText(jsonData),
          nonce: (_b = opts.serverData) == null ? void 0 : _b.nonce
        })
      );
      if (snapshotResult.funcs.length > 0) {
        children.push(
          (0, import_qwik3.jsx)("script", {
            "q:func": "qwik/json",
            dangerouslySetInnerHTML: serializeFunctions(snapshotResult.funcs),
            nonce: (_c = opts.serverData) == null ? void 0 : _c.nonce
          })
        );
      }
      const needLoader = !snapshotResult || snapshotResult.mode !== "static";
      const includeMode = ((_d = opts.qwikLoader) == null ? void 0 : _d.include) ?? "auto";
      const includeLoader = includeMode === "always" || includeMode === "auto" && needLoader;
      if (includeLoader) {
        const qwikLoaderScript = getQwikLoaderScript({
          events: (_e = opts.qwikLoader) == null ? void 0 : _e.events,
          debug: opts.debug
        });
        children.push(
          (0, import_qwik3.jsx)("script", {
            id: "qwikloader",
            dangerouslySetInnerHTML: qwikLoaderScript,
            nonce: (_f = opts.serverData) == null ? void 0 : _f.nonce
          })
        );
      }
      const extraListeners = Array.from(containerState.$events$, (s) => JSON.stringify(s));
      if (extraListeners.length > 0) {
        let content = `window.qwikevents.push(${extraListeners.join(", ")})`;
        if (!includeLoader) {
          content = `window.qwikevents||=[];${content}`;
        }
        children.push(
          (0, import_qwik3.jsx)("script", {
            dangerouslySetInnerHTML: content,
            nonce: (_g = opts.serverData) == null ? void 0 : _g.nonce
          })
        );
      }
      collectRenderSymbols(renderSymbols, contexts);
      snapshotTime = snapshotTimer();
      return (0, import_qwik3.jsx)(import_qwik3.Fragment, { children });
    },
    manifestHash: (resolvedManifest == null ? void 0 : resolvedManifest.manifest.manifestHash) || "dev"
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
    manifest: resolvedManifest == null ? void 0 : resolvedManifest.manifest,
    size: totalSize,
    isStatic: !isDynamic,
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
  var _a;
  for (const ctx of elements) {
    const symbol = (_a = ctx.$componentQrl$) == null ? void 0 : _a.getSymbol();
    if (symbol && !renderSymbols.includes(symbol)) {
      renderSymbols.push(symbol);
    }
  }
}
function serializeFunctions(funcs) {
  return `document.currentScript.qFuncs=[${funcs.join(",\n")}]`;
}

// packages/qwik/src/server/index.ts
async function setServerPlatform2(manifest) {
  const platform = createPlatform({ manifest }, resolveManifest(manifest));
  (0, import_qwik4.setPlatform)(platform);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getQwikLoaderScript,
  renderToStream,
  renderToString,
  resolveManifest,
  setServerPlatform,
  versions
});
return module.exports; })(typeof module === 'object' && module.exports ? module : { exports: {} });
