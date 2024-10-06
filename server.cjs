/**
 * @license
 * @builder.io/qwik/server 2.0.0-0-dev+386edeb
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
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
  getQwikPrefetchWorkerScript: () => getQwikPrefetchWorkerScript,
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
var SYNC_QRL = "<sync>";
function createPlatform(opts, resolvedManifest) {
  const mapper = resolvedManifest == null ? void 0 : resolvedManifest.mapper;
  const mapperFn = opts.symbolMapper ? opts.symbolMapper : (symbolName, _chunk, parent) => {
    var _a;
    if (mapper) {
      const hash2 = getSymbolHash(symbolName);
      const result = mapper[hash2];
      if (!result) {
        if (hash2 === SYNC_QRL) {
          return [hash2, ""];
        }
        const isRegistered = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.has(hash2);
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
      var _a;
      const hash2 = getSymbolHash(symbolName);
      const regSym = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.get(hash2);
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
    chunkForSymbol(symbolName, _chunk, parent) {
      return mapperFn(symbolName, mapper, parent);
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

// packages/qwik/src/core/shared/utils/qdev.ts
var qDev = globalThis.qDev !== false;
var qInspector = globalThis.qInspector === true;
var qSerialize = globalThis.qSerialize !== false;
var qDynamicPlatform = globalThis.qDynamicPlatform !== false;
var qTest = globalThis.qTest === true;
var qRuntimeQrl = globalThis.qRuntimeQrl === true;

// packages/qwik/src/core/shared/utils/log.ts
var STYLE = qDev ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;` : "";
var throwErrorAndStop = (message, ...optionalParams) => {
  const error = createAndLogError(false, message, ...optionalParams);
  debugger;
  throw error;
};
var logErrorAndStop = (message, ...optionalParams) => {
  const err = createAndLogError(true, message, ...optionalParams);
  debugger;
  return err;
};
var createAndLogError = (asyncThrow, message, ...optionalParams) => {
  const err = message instanceof Error ? message : new Error(message);
  console.error("%cQWIK ERROR", STYLE, err.message, ...optionalParams, err.stack);
  asyncThrow && !qTest && setTimeout(() => {
    throw err;
  }, 0);
  return err;
};

// packages/qwik/src/core/shared/error/error.ts
var codeToText = (code, ...parts) => {
  if (qDev) {
    const MAP = [
      "Error while serializing class attribute",
      // 0
      "Can not serialize a HTML Node that is not an Element",
      // 1
      "Runtime but no instance found on element.",
      // 2
      "Only primitive and object literals can be serialized",
      // 3
      "Crash while rendering",
      // 4
      "You can render over a existing q:container. Skipping render().",
      // 5
      "Set property {{0}}",
      // 6
      "Only function's and 'string's are supported.",
      // 7
      "Only objects can be wrapped in 'QObject'",
      // 8
      `Only objects literals can be wrapped in 'QObject'`,
      // 9
      "QRL is not a function",
      // 10
      "Dynamic import not found",
      // 11
      "Unknown type argument",
      // 12
      `Actual value for useContext({{0}}) can not be found, make sure some ancestor component has set a value using useContextProvider(). In the browser make sure that the context was used during SSR so its state was serialized.`,
      // 13
      "Invoking 'use*()' method outside of invocation context.",
      // 14
      "Cant access renderCtx for existing context",
      // 15
      "Cant access document for existing context",
      // 16
      "props are immutable",
      // 17
      "<div> component can only be used at the root of a Qwik component$()",
      // 18
      "Props are immutable by default.",
      // 19
      `Calling a 'use*()' method outside 'component$(() => { HERE })' is not allowed. 'use*()' methods provide hooks to the 'component$' state and lifecycle, ie 'use' hooks can only be called synchronously within the 'component$' function or another 'use' method.
See https://qwik.dev/docs/components/tasks/#use-method-rules`,
      // 20
      "Container is already paused. Skipping",
      // 21
      "",
      // 22 -- unused
      "When rendering directly on top of Document, the root node must be a <html>",
      // 23
      "A <html> node must have 2 children. The first one <head> and the second one a <body>",
      // 24
      'Invalid JSXNode type "{{0}}". It must be either a function or a string. Found:',
      // 25
      "Tracking value changes can only be done to useStore() objects and component props",
      // 26
      "Missing Object ID for captured object",
      // 27
      'The provided Context reference "{{0}}" is not a valid context created by createContextId()',
      // 28
      "<html> is the root container, it can not be rendered inside a component",
      // 29
      "QRLs can not be resolved because it does not have an attached container. This means that the QRL does not know where it belongs inside the DOM, so it cant dynamically import() from a relative path.",
      // 30
      "QRLs can not be dynamically resolved, because it does not have a chunk path",
      // 31
      "The JSX ref attribute must be a Signal"
      // 32
    ];
    let text = MAP[code] ?? "";
    if (parts.length) {
      text = text.replaceAll(/{{(\d+)}}/g, (_, index) => {
        let v = parts[index];
        if (v && typeof v === "object" && v.constructor === Object) {
          v = JSON.stringify(v).slice(0, 50);
        }
        return v;
      });
    }
    return `Code(${code}): ${text}`;
  } else {
    return `Code(${code}) https://github.com/QwikDev/qwik/blob/main/packages/qwik/src/core/error/error.ts#L${8 + code}`;
  }
};
var QError_stringifyClassOrStyle = 0;
var qError = (code, ...parts) => {
  const text = codeToText(code, ...parts);
  return logErrorAndStop(text, ...parts);
};

// packages/qwik/src/core/shared/utils/event-names.ts
var fromCamelToKebabCase = (text) => {
  return text.replace(/([A-Z-])/g, "-$1").toLowerCase();
};
function isPreventDefault(key) {
  return key.startsWith("preventdefault:");
}

// packages/qwik/src/core/shared/utils/scoped-styles.ts
function isClassAttr(key) {
  return key === "class" || key === "className";
}
function convertStyleIdsToString(scopedStyleIds) {
  return Array.from(scopedStyleIds).join(" ");
}

// packages/qwik/src/core/shared/utils/types.ts
var isArray = (v) => {
  return Array.isArray(v);
};
var isString = (v) => {
  return typeof v === "string";
};

// packages/qwik/src/core/shared/utils/unitless_number.ts
var unitlessNumbers = /* @__PURE__ */ new Set([
  "animationIterationCount",
  "aspectRatio",
  "borderImageOutset",
  "borderImageSlice",
  "borderImageWidth",
  "boxFlex",
  "boxFlexGroup",
  "boxOrdinalGroup",
  "columnCount",
  "columns",
  "flex",
  "flexGrow",
  "flexShrink",
  "gridArea",
  "gridRow",
  "gridRowEnd",
  "gridRowStart",
  "gridColumn",
  "gridColumnEnd",
  "gridColumnStart",
  "fontWeight",
  "lineClamp",
  "lineHeight",
  "opacity",
  "order",
  "orphans",
  "scale",
  "tabSize",
  "widows",
  "zIndex",
  "zoom",
  "MozAnimationIterationCount",
  // Known Prefixed Properties
  "MozBoxFlex",
  // TODO: Remove these since they shouldn't be used in modern code
  "msFlex",
  "msFlexPositive",
  "WebkitAnimationIterationCount",
  "WebkitBoxFlex",
  "WebkitBoxOrdinalGroup",
  "WebkitColumnCount",
  "WebkitColumns",
  "WebkitFlex",
  "WebkitFlexGrow",
  "WebkitFlexShrink",
  "WebkitLineClamp"
]);
var isUnitlessNumber = (name) => {
  return unitlessNumbers.has(name);
};

// packages/qwik/src/core/shared/qrl/qrl-class.ts
var import_build7 = require("@builder.io/qwik/build");

// packages/qwik/src/core/shared/error/assert.ts
var ASSERT_DISCLAIMER = "Internal assert, this is likely caused by a bug in Qwik: ";
function assertTrue(value1, text, ...parts) {
  if (qDev) {
    if (value1 === true) {
      return;
    }
    throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
  }
}

// packages/qwik/src/core/shared/platform/platform.ts
var import_build = require("@builder.io/qwik/build");

// packages/qwik/src/core/shared/utils/promises.ts
var isPromise = (value) => {
  return !!value && typeof value == "object" && typeof value.then === "function";
};
var maybeThen = (valueOrPromise, thenFn) => {
  return isPromise(valueOrPromise) ? valueOrPromise.then(thenFn, shouldNotError) : thenFn(valueOrPromise);
};
var shouldNotError = (reason) => {
  throwErrorAndStop("QWIK ERROR:", reason);
};

// packages/qwik/src/core/shared/types.ts
var DEBUG_TYPE = "q:type";
var START = "\x1B[34m";
var END = "\x1B[0m";
var VirtualTypeName = {
  ["V" /* Virtual */]: (
    /* ********* */
    START + "Virtual" + END
  ),
  //
  ["F" /* Fragment */]: (
    /* ******** */
    START + "Fragment" + END
  ),
  //
  ["S" /* WrappedSignal */]: (
    /* *** */
    START + "Signal" + END
  ),
  //
  ["A" /* Awaited */]: (
    /* ********* */
    START + "Awaited" + END
  ),
  //
  ["C" /* Component */]: (
    /* ******* */
    START + "Component" + END
  ),
  //
  ["I" /* InlineComponent */]: (
    /* * */
    START + "InlineComponent" + END
  ),
  //
  ["P" /* Projection */]: (
    /* ****** */
    START + "Projection" + END
  )
  //
};

// packages/qwik/src/core/shared/utils/markers.ts
var OnRenderProp = "q:renderFn";
var QSlot = "q:slot";
var QSlotParent = ":";
var QSlotRef = "q:sref";
var QStyle = "q:style";
var QStyleSelector = "style[q\\:style]";
var QStyleSSelector = "style[q\\:sstyle]";
var QStylesAllSelector = QStyleSelector + "," + QStyleSSelector;
var QScopedStyle = "q:sstyle";
var QCtxAttr = "q:ctx";
var QRenderAttr = "q:render";
var QRuntimeAttr = "q:runtime";
var QVersionAttr = "q:version";
var QBaseAttr = "q:base";
var QLocaleAttr = "q:locale";
var QManifestHashAttr = "q:manifest-hash";
var QInstanceAttr = "q:instance";
var QContainerIsland = "q:container-island";
var QContainerIslandEnd = "/" + QContainerIsland;
var QIgnore = "q:ignore";
var QIgnoreEnd = "/" + QIgnore;
var QContainerAttr = "q:container";
var QContainerAttrEnd = "/" + QContainerAttr;
var QTemplate = "q:template";
var QContainerSelector = "[q\\:container]:not([q\\:container=" + "html" /* HTML */ + "]):not([q\\:container=" + "text" /* TEXT */ + "])";
var QDefaultSlot = "";
var ELEMENT_ID = "q:id";
var ELEMENT_KEY = "q:key";
var ELEMENT_PROPS = "q:props";
var ELEMENT_SEQ = "q:seq";
var ELEMENT_SEQ_IDX = "q:seqIdx";
var NON_SERIALIZABLE_MARKER_PREFIX = ":";
var USE_ON_LOCAL = NON_SERIALIZABLE_MARKER_PREFIX + "on";
var USE_ON_LOCAL_SEQ_IDX = NON_SERIALIZABLE_MARKER_PREFIX + "onIdx";
var USE_ON_LOCAL_FLAGS = NON_SERIALIZABLE_MARKER_PREFIX + "onFlags";
var UNWRAP_VNODE_LOCAL = NON_SERIALIZABLE_MARKER_PREFIX + "unwrap";
var FLUSH_COMMENT = "qkssr-f";
var STREAM_BLOCK_START_COMMENT = "qkssr-pu";
var STREAM_BLOCK_END_COMMENT = "qkssr-po";
var Q_PROPS_SEPARATOR = ":";
var dangerouslySetInnerHTML = "dangerouslySetInnerHTML";

// packages/qwik/src/core/client/vnode.ts
var import_build5 = require("@builder.io/qwik/build");

// packages/qwik/src/server/utils.ts
var import_meta = {};
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
  return `${import_meta.env.BASE_URL}build/`;
}
var versions = {
  qwik: "2.0.0-0-dev+386edeb",
  qwikDom: "2.1.19"
};

// packages/qwik/src/server/prefetch-strategy.ts
function getPrefetchResources(qrls, opts, resolvedManifest) {
  if (!resolvedManifest) {
    return [];
  }
  const prefetchStrategy = opts.prefetchStrategy;
  const buildBase = getBuildBase(opts);
  if (prefetchStrategy !== null) {
    if (!prefetchStrategy || !prefetchStrategy.symbolsToPrefetch || prefetchStrategy.symbolsToPrefetch === "auto") {
      return getAutoPrefetch(qrls, resolvedManifest, buildBase);
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
function getAutoPrefetch(qrls, resolvedManifest, buildBase) {
  const prefetchResources = [];
  const { mapper, manifest } = resolvedManifest;
  const urls = /* @__PURE__ */ new Map();
  if (mapper && manifest) {
    for (const qrl of qrls) {
      const qrlSymbolName = qrl.getHash();
      const resolvedSymbol = mapper[qrlSymbolName];
      if (resolvedSymbol) {
        const bundleFileName = resolvedSymbol[1];
        addBundle(manifest, urls, prefetchResources, buildBase, bundleFileName);
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

// packages/qwik/src/core/shared/utils/flyweight.ts
var EMPTY_ARRAY = [];
var EMPTY_OBJ = {};
Object.freeze(EMPTY_ARRAY);
Object.freeze(EMPTY_OBJ);

// packages/qwik/src/core/ssr/ssr-render-jsx.ts
var import_build4 = require("@builder.io/qwik/build");

// packages/qwik/src/core/shared/jsx/utils.public.ts
var SkipRender = Symbol("skip render");

// packages/qwik/src/core/signal/store.ts
var STORE_TARGET = Symbol("store.target");
var STORE_HANDLER = Symbol("store.handler");
var STORE_ARRAY_PROP = Symbol("store.array");

// packages/qwik/src/core/client/vnode-diff.ts
var import_build3 = require("@builder.io/qwik/build");

// packages/qwik/src/core/shared/component-execution.ts
var import_build2 = require("@builder.io/qwik/build");

// packages/qwik/src/core/shared/utils/character-escaping.ts
function escapeHTML(html) {
  let escapedHTML = "";
  const length = html.length;
  let idx = 0;
  let lastIdx = idx;
  for (; idx < length; idx++) {
    const ch = html.charCodeAt(idx);
    if (ch === 60) {
      escapedHTML += html.substring(lastIdx, idx) + "&lt;";
    } else if (ch === 62) {
      escapedHTML += html.substring(lastIdx, idx) + "&gt;";
    } else if (ch === 38) {
      escapedHTML += html.substring(lastIdx, idx) + "&amp;";
    } else if (ch === 34) {
      escapedHTML += html.substring(lastIdx, idx) + "&quot;";
    } else if (ch === 39) {
      escapedHTML += html.substring(lastIdx, idx) + "&#39;";
    } else {
      continue;
    }
    lastIdx = idx + 1;
  }
  if (lastIdx === 0) {
    return html;
  } else {
    return escapedHTML + html.substring(lastIdx);
  }
}

// packages/qwik/src/core/signal/signal.ts
var NEEDS_COMPUTATION = Symbol("invalid");

// packages/qwik/src/core/shared/utils/constants.ts
var QObjectRecursive = 1 << 0;
var QObjectImmutable = 1 << 1;
var QObjectTargetSymbol = Symbol("proxy target");
var QObjectFlagsSymbol = Symbol("proxy flags");
var QObjectManagerSymbol = Symbol("proxy manager");
var _CONST_PROPS = Symbol("CONST");
var _VAR_PROPS = Symbol("VAR");
var _IMMUTABLE = Symbol("IMMUTABLE");

// packages/qwik/src/core/shared/component.public.ts
var SERIALIZABLE_STATE = Symbol("serializable-data");

// packages/qwik/src/core/shared/vnode-data-types.ts
var VNodeDataSeparator = {
  REFERENCE_CH: (
    /* ***** */
    `~`
  ),
  // `~` is a reference to the node. Save it.
  REFERENCE: (
    /* ******** */
    126
  ),
  // `~` is a reference to the node. Save it.
  ADVANCE_1_CH: (
    /* ***** */
    `!`
  ),
  // `!` is vNodeData separator skipping 0. (ie next vNode)
  ADVANCE_1: (
    /* ********* */
    33
  ),
  // `!` is vNodeData separator skipping 0. (ie next vNode)
  ADVANCE_2_CH: (
    /* ***** */
    `"`
  ),
  // `"` is vNodeData separator skipping 1.
  ADVANCE_2: (
    /* ********* */
    34
  ),
  // `"` is vNodeData separator skipping 1.
  ADVANCE_4_CH: (
    /* ***** */
    `#`
  ),
  // `#` is vNodeData separator skipping 2.
  ADVANCE_4: (
    /* ********* */
    35
  ),
  // `#` is vNodeData separator skipping 2.
  ADVANCE_8_CH: (
    /* ***** */
    `$`
  ),
  // `$` is vNodeData separator skipping 4.
  ADVANCE_8: (
    /* ********* */
    36
  ),
  // `$` is vNodeData separator skipping 4.
  ADVANCE_16_CH: (
    /* **** */
    `%`
  ),
  // `%` is vNodeData separator skipping 8.
  ADVANCE_16: (
    /* ******** */
    37
  ),
  // `%` is vNodeData separator skipping 8.
  ADVANCE_32_CH: (
    /* **** */
    `&`
  ),
  // `&` is vNodeData separator skipping 16.
  ADVANCE_32: (
    /* ******** */
    38
  ),
  // `&` is vNodeData separator skipping 16.
  ADVANCE_64_CH: (
    /* **** */
    `'`
  ),
  // `'` is vNodeData separator skipping 32.
  ADVANCE_64: (
    /* ******** */
    39
  ),
  // `'` is vNodeData separator skipping 32.
  ADVANCE_128_CH: (
    /* *** */
    `(`
  ),
  // `(` is vNodeData separator skipping 64.
  ADVANCE_128: (
    /* ******* */
    40
  ),
  // `(` is vNodeData separator skipping 64.
  ADVANCE_256_CH: (
    /* *** */
    `)`
  ),
  // `)` is vNodeData separator skipping 128.
  ADVANCE_256: (
    /* ******* */
    41
  ),
  // `)` is vNodeData separator skipping 128.
  ADVANCE_512_CH: (
    /* *** */
    `*`
  ),
  // `*` is vNodeData separator skipping 256.
  ADVANCE_512: (
    /* ******* */
    42
  ),
  // `*` is vNodeData separator skipping 256.
  ADVANCE_1024_CH: (
    /* ** */
    `+`
  ),
  // `+` is vNodeData separator skipping 512.
  ADVANCE_1024: (
    /* ****** */
    43
  ),
  // `+` is vNodeData separator skipping 512.
  ADVANCE_2048_CH: (
    /* *  */
    ","
  ),
  // ',' is vNodeData separator skipping 1024.
  ADVANCE_2048: (
    /* ****** */
    44
  ),
  // ',' is vNodeData separator skipping 1024.
  ADVANCE_4096_CH: (
    /* *  */
    `-`
  ),
  // `-` is vNodeData separator skipping 2048.
  ADVANCE_4096: (
    /* ****** */
    45
  ),
  // `-` is vNodeData separator skipping 2048.
  ADVANCE_8192_CH: (
    /* *  */
    `.`
  ),
  // `.` is vNodeData separator skipping 4096.
  ADVANCE_8192: (
    /* ****** */
    46
  )
  // `.` is vNodeData separator skipping 4096.
};
var VNodeDataChar = {
  OPEN: (
    /* ************** */
    123
  ),
  // `{` is the start of the VNodeData.
  OPEN_CHAR: (
    /* ****** */
    "{"
  ),
  CLOSE: (
    /* ************* */
    125
  ),
  // `}` is the end of the VNodeData.
  CLOSE_CHAR: (
    /* ***** */
    "}"
  ),
  SCOPED_STYLE: (
    /* ******* */
    59
  ),
  // `;` - `q:sstyle` - Style attribute.
  SCOPED_STYLE_CHAR: (
    /* */
    ";"
  ),
  RENDER_FN: (
    /* ********** */
    60
  ),
  // `<` - `q:renderFn' - Component QRL render function (body)
  RENDER_FN_CHAR: (
    /* ** */
    "<"
  ),
  ID: (
    /* ***************** */
    61
  ),
  // `=` - `q:id` - ID of the element.
  ID_CHAR: (
    /* ********* */
    "="
  ),
  PROPS: (
    /* ************** */
    62
  ),
  // `>` - `q:props' - Component Props
  PROPS_CHAR: (
    /* ****** */
    ">"
  ),
  SLOT_REF: (
    /* *********** */
    63
  ),
  // `?` - `q:sref` - Slot reference.
  SLOT_REF_CHAR: (
    /* *** */
    "?"
  ),
  KEY: (
    /* **************** */
    64
  ),
  // `@` - `q:key` - Element key.
  KEY_CHAR: (
    /* ******** */
    "@"
  ),
  SEQ: (
    /* **************** */
    91
  ),
  // `[` - `q:seq' - Seq value from `useSequentialScope()`
  SEQ_CHAR: (
    /* ******** */
    "["
  ),
  DON_T_USE: (
    /* ********** */
    93
  ),
  // `\` - SKIP because `\` is used as escaping
  DON_T_USE_CHAR: "\\",
  CONTEXT: (
    /* ************ */
    93
  ),
  // `]` - `q:ctx' - Component context/props
  CONTEXT_CHAR: (
    /* **** */
    "]"
  ),
  SEQ_IDX: (
    /* ************ */
    94
  ),
  // `^` - `q:seqIdx' - Sequential scope id
  SEQ_IDX_CHAR: (
    /* **** */
    "^"
  ),
  SEPARATOR: (
    /* ********* */
    124
  ),
  // `|` - Separator char to encode any key/value pairs.
  SEPARATOR_CHAR: (
    /* ** */
    "|"
  ),
  SLOT: (
    /* ************** */
    126
  ),
  // `~` - `q:slot' - Slot name
  SLOT_CHAR: (
    /* ******* */
    "~"
  )
};

// packages/qwik/src/core/client/vnode.ts
var mapApp_findIndx = (elementVNode, key, start) => {
  assertTrue(start % 2 === 0, "Expecting even number.");
  let bottom = start >> 1;
  let top = elementVNode.length - 2 >> 1;
  while (bottom <= top) {
    const mid = bottom + (top - bottom >> 1);
    const midKey = elementVNode[mid << 1];
    if (midKey === key) {
      return mid << 1;
    }
    if (midKey < key) {
      bottom = mid + 1;
    } else {
      top = mid - 1;
    }
  }
  return bottom << 1 ^ -1;
};
var mapArray_set = (elementVNode, key, value, start) => {
  const indx = mapApp_findIndx(elementVNode, key, start);
  if (indx >= 0) {
    if (value == null) {
      elementVNode.splice(indx, 2);
    } else {
      elementVNode[indx + 1] = value;
    }
  } else if (value != null) {
    elementVNode.splice(indx ^ -1, 0, key, value);
  }
};
var mapApp_remove = (elementVNode, key, start) => {
  const indx = mapApp_findIndx(elementVNode, key, start);
  let value = null;
  if (indx >= 0) {
    value = elementVNode[indx + 1];
    elementVNode.splice(indx, 2);
    return value;
  }
  return value;
};
var mapArray_get = (elementVNode, key, start) => {
  const indx = mapApp_findIndx(elementVNode, key, start);
  if (indx >= 0) {
    return elementVNode[indx + 1];
  } else {
    return null;
  }
};

// packages/qwik/src/core/shared/shared-serialization.ts
var SERIALIZER_PROXY_UNWRAP = Symbol("UNWRAP");

// packages/qwik/src/core/shared/utils/styles.ts
var serializeClass = (obj) => {
  if (!obj) {
    return "";
  }
  if (isString(obj)) {
    return obj.trim();
  }
  const classes = [];
  if (isArray(obj)) {
    for (const o of obj) {
      const classList = serializeClass(o);
      if (classList) {
        classes.push(classList);
      }
    }
  } else {
    for (const [key, value] of Object.entries(obj)) {
      if (value) {
        classes.push(key.trim());
      }
    }
  }
  return classes.join(" ");
};
var stringifyStyle = (obj) => {
  if (obj == null) {
    return "";
  }
  if (typeof obj == "object") {
    if (isArray(obj)) {
      throw qError(QError_stringifyClassOrStyle, obj, "style");
    } else {
      const chunks = [];
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if (value != null) {
            if (key.startsWith("--")) {
              chunks.push(key + ":" + value);
            } else {
              chunks.push(fromCamelToKebabCase(key) + ":" + setValueForStyle(key, value));
            }
          }
        }
      }
      return chunks.join(";");
    }
  }
  return String(obj);
};
var serializeBooleanOrNumberAttribute = (value) => {
  return value != null ? String(value) : null;
};
function serializeAttribute(key, value, styleScopedId) {
  if (isClassAttr(key)) {
    const serializedClass = serializeClass(value);
    value = styleScopedId ? styleScopedId + (serializedClass.length ? " " + serializedClass : serializedClass) : serializedClass;
  } else if (key === "style") {
    value = stringifyStyle(value);
  } else if (isEnumeratedBooleanAttribute(key) || typeof value === "number") {
    value = serializeBooleanOrNumberAttribute(value);
  } else if (value === false || value == null) {
    value = null;
  } else if (value === true && isPreventDefault(key)) {
    value = "";
  }
  return value;
}
function isEnumeratedBooleanAttribute(key) {
  return isAriaAttribute(key) || ["spellcheck", "draggable", "contenteditable"].includes(key);
}
var setValueForStyle = (styleName, value) => {
  if (typeof value === "number" && value !== 0 && !isUnitlessNumber(styleName)) {
    return value + "px";
  }
  return value;
};
function isAriaAttribute(prop) {
  return prop.startsWith("aria-");
}

// packages/qwik/src/optimizer/src/manifest.ts
function getValidManifest(manifest) {
  if (manifest != null && manifest.mapping != null && typeof manifest.mapping === "object" && manifest.symbols != null && typeof manifest.symbols === "object" && manifest.bundles != null && typeof manifest.bundles === "object") {
    return manifest;
  }
  return void 0;
}

// packages/qwik/src/server/ssr-container.ts
var import_qwik3 = require("@builder.io/qwik");
var import_build9 = require("@builder.io/qwik/build");

// packages/qwik/src/server/prefetch-utils.ts
function workerFetchScript() {
  const fetch2 = `Promise.all(e.data.map(u=>fetch(u))).finally(()=>{setTimeout(postMessage({}),9999)})`;
  const workerBody = `onmessage=(e)=>{${fetch2}}`;
  const blob = `new Blob(['${workerBody}'],{type:"text/javascript"})`;
  const url = `URL.createObjectURL(${blob})`;
  let s = `const w=new Worker(${url});`;
  s += `w.postMessage(u.map(u=>new URL(u,origin)+''));`;
  s += `w.onmessage=()=>{w.terminate()};`;
  return s;
}
function prefetchUrlsEventScript(base, prefetchResources) {
  const data = {
    bundles: flattenPrefetchResources(prefetchResources).map((u) => u.split("/").pop())
  };
  const args = JSON.stringify(["prefetch", base, ...data.bundles]);
  return `(window.qwikPrefetchSW||(window.qwikPrefetchSW=[])).push(${args});`;
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
function applyPrefetchImplementation2(container, prefetchStrategy, prefetchResources, nonce) {
  const prefetchImpl = normalizePrefetchImplementation(prefetchStrategy == null ? void 0 : prefetchStrategy.implementation);
  if (prefetchImpl.prefetchEvent === "always") {
    prefetchUrlsEvent2(container, prefetchResources, nonce);
  }
  if (prefetchImpl.linkInsert === "html-append") {
    linkHtmlImplementation2(container, prefetchResources, prefetchImpl);
  }
  if (prefetchImpl.linkInsert === "js-append") {
    linkJsImplementation2(container, prefetchResources, prefetchImpl, nonce);
  } else if (prefetchImpl.workerFetchInsert === "always") {
    workerFetchImplementation2(container, prefetchResources, nonce);
  }
}
function prefetchUrlsEvent2(container, prefetchResources, nonce) {
  const mostReferenced = getMostReferenced(prefetchResources);
  for (const url of mostReferenced) {
    const attrs = ["rel", "modulepreload", "href", url];
    if (nonce) {
      attrs.push("nonce", nonce);
    }
    container.openElement("link", null, attrs);
    container.closeElement();
  }
  const scriptAttrs = ["q:type", "prefetch-bundles"];
  if (nonce) {
    scriptAttrs.push("nonce", nonce);
  }
  container.openElement("script", null, scriptAttrs);
  container.writer.write(prefetchUrlsEventScript(container.buildBase, prefetchResources));
  container.writer.write(
    `;document.dispatchEvent(new CustomEvent('qprefetch', {detail:{links: [location.pathname]}}))`
  );
  container.closeElement();
}
function linkHtmlImplementation2(container, prefetchResources, prefetchImpl) {
  const urls = flattenPrefetchResources(prefetchResources);
  const rel = prefetchImpl.linkRel || "prefetch";
  for (const url of urls) {
    const attributes = ["href", url, "rel", rel];
    if (rel === "prefetch" || rel === "preload") {
      if (url.endsWith(".js")) {
        attributes.push("as", "script");
      }
    }
    container.openElement("link", null, attributes);
    container.closeElement();
  }
}
function linkJsImplementation2(container, prefetchResources, prefetchImpl, nonce) {
  const scriptAttrs = ["type", "module", "q:type", "link-js"];
  if (nonce) {
    scriptAttrs.push("nonce", nonce);
  }
  container.openElement("script", null, scriptAttrs);
  const rel = prefetchImpl.linkRel || "prefetch";
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    container.writer.write(`let supportsLinkRel = true;`);
  }
  container.writer.write(`const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`);
  container.writer.write(`u.map((u,i)=>{`);
  container.writer.write(`const l=document.createElement('link');`);
  container.writer.write(`l.setAttribute("href",u);`);
  container.writer.write(`l.setAttribute("rel","${rel}");`);
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    container.writer.write(`if(i===0){`);
    container.writer.write(`try{`);
    container.writer.write(`supportsLinkRel=l.relList.supports("${rel}");`);
    container.writer.write(`}catch(e){}`);
    container.writer.write(`}`);
  }
  container.writer.write(`document.body.appendChild(l);`);
  container.writer.write(`});`);
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    container.writer.write(`if(!supportsLinkRel){`);
    container.writer.write(workerFetchScript());
    container.writer.write(`}`);
  }
  if (prefetchImpl.workerFetchInsert === "always") {
    container.writer.write(workerFetchScript());
  }
  container.closeElement();
}
function workerFetchImplementation2(container, prefetchResources, nonce) {
  const scriptAttrs = ["type", "module", "q:type", "prefetch-worker"];
  if (nonce) {
    scriptAttrs.push(nonce, "nonce");
  }
  container.openElement("script", null, scriptAttrs);
  container.writer.write(`const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`);
  container.writer.write(workerFetchScript());
  container.closeElement();
}
function normalizePrefetchImplementation(input) {
  return { ...PrefetchImplementationDefault, ...input };
}
var PrefetchImplementationDefault = {
  linkInsert: null,
  linkRel: null,
  workerFetchInsert: null,
  prefetchEvent: "always"
};

// packages/qwik/src/server/ssr-node.ts
var import_qwik2 = require("@builder.io/qwik");
var import_build8 = require("@builder.io/qwik/build");
var SsrNode = class {
  constructor(currentComponentNode, nodeType, id, attrs, cleanupQueue) {
    this.attrs = attrs;
    this.cleanupQueue = cleanupQueue;
    /** Local props which don't serialize; */
    this.locals = null;
    this.currentComponentNode = currentComponentNode;
    this.nodeType = nodeType;
    this.id = id;
    if (import_build8.isDev && id.indexOf("undefined") != -1) {
      throw new Error(`Invalid SSR node id: ${id}`);
    }
  }
  setProp(name, value) {
    if (this.attrs === import_qwik2._EMPTY_ARRAY) {
      this.attrs = [];
    }
    if (name.startsWith(NON_SERIALIZABLE_MARKER_PREFIX)) {
      mapArray_set(this.locals || (this.locals = []), name, value, 0);
    } else {
      mapArray_set(this.attrs, name, value, 0);
    }
    if (name == ELEMENT_SEQ && value) {
      this.cleanupQueue.push(value);
    }
  }
  getProp(name) {
    if (name.startsWith(NON_SERIALIZABLE_MARKER_PREFIX)) {
      return this.locals ? mapArray_get(this.locals, name, 0) : null;
    } else {
      return mapArray_get(this.attrs, name, 0);
    }
  }
  removeProp(name) {
    if (name.startsWith(NON_SERIALIZABLE_MARKER_PREFIX)) {
      if (this.locals) {
        mapApp_remove(this.locals, name, 0);
      }
    } else {
      mapApp_remove(this.attrs, name, 0);
    }
  }
  toString() {
    let stringifiedAttrs = "";
    for (let i = 0; i < this.attrs.length; i += 2) {
      const key = this.attrs[i];
      const value = this.attrs[i + 1];
      stringifiedAttrs += `${key}=`;
      stringifiedAttrs += `${typeof value === "string" || typeof value === "number" ? JSON.stringify(value) : "*"}`;
      if (i < this.attrs.length - 2) {
        stringifiedAttrs += ", ";
      }
    }
    return `SSRNode [<${this.id}> ${stringifiedAttrs}]`;
  }
};
SsrNode.ELEMENT_NODE = 1;
SsrNode.TEXT_NODE = 3;
SsrNode.DOCUMENT_NODE = 9;
SsrNode.DOCUMENT_FRAGMENT_NODE = 11;
var SsrComponentFrame = class {
  constructor(componentNode) {
    this.componentNode = componentNode;
    this.slots = [];
    this.projectionDepth = 0;
    this.scopedStyleIds = /* @__PURE__ */ new Set();
    this.childrenScopedStyle = null;
  }
  distributeChildrenIntoSlots(children, scopedStyle) {
    this.childrenScopedStyle = scopedStyle;
    if ((0, import_qwik2._isJSXNode)(children)) {
      const slotName = this.getSlotName(children);
      mapArray_set(this.slots, slotName, children, 0);
    } else if (Array.isArray(children)) {
      const defaultSlot = [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if ((0, import_qwik2._isJSXNode)(child)) {
          const slotName = this.getSlotName(child);
          if (slotName === QDefaultSlot) {
            defaultSlot.push(child);
          } else {
            this.updateSlot(slotName, child);
          }
        } else {
          defaultSlot.push(child);
        }
      }
      defaultSlot.length && mapArray_set(this.slots, QDefaultSlot, defaultSlot, 0);
    } else {
      mapArray_set(this.slots, QDefaultSlot, children, 0);
    }
  }
  updateSlot(slotName, child) {
    let existingSlots = mapArray_get(this.slots, slotName, 0);
    if (existingSlots === null) {
      existingSlots = child;
    } else if (Array.isArray(existingSlots)) {
      existingSlots.push(child);
    } else {
      existingSlots = [existingSlots, child];
    }
    mapArray_set(this.slots, slotName, existingSlots, 0);
  }
  getSlotName(jsx2) {
    if (jsx2.props[QSlot]) {
      return jsx2.props[QSlot];
    }
    return QDefaultSlot;
  }
  hasSlot(slotName) {
    return mapArray_get(this.slots, slotName, 0) !== null;
  }
  consumeChildrenForSlot(projectionNode, slotName) {
    const children = mapApp_remove(this.slots, slotName, 0);
    if (children !== null) {
      this.componentNode.setProp(slotName, projectionNode.id);
      projectionNode.setProp(QSlotParent, this.componentNode.id);
    }
    return children;
  }
  releaseUnclaimedProjections(unclaimedProjections) {
    if (this.slots.length) {
      unclaimedProjections.push(this);
      unclaimedProjections.push(this.childrenScopedStyle);
      unclaimedProjections.push.apply(unclaimedProjections, this.slots);
    }
  }
};

// packages/qwik/src/server/tag-nesting.ts
var allowedContent = (state) => {
  switch (state) {
    case 2 /* TEXT */:
      return ["text content", null];
    case 0 /* NOT_ALLOWED */:
      return ["no content", null];
    case 32 /* HTML */:
      return ["html content", "<head>, <body>"];
    case 64 /* HEAD */:
      return [
        "head content",
        "<title>, <script>, <noscript>, <style>, <meta>, <link>, <base>, <template>"
      ];
    case 130 /* BODY */:
      return ["body content", "all tags allowed here"];
    case 4 /* EMPTY */:
      return ["no-content element", null];
    case 10 /* ANYTHING */:
      return ["any content", null];
    case 4096 /* TABLE */:
      return ["table", "<caption>, <colgroup>, <tbody>, <thead>, <tfoot>"];
    case 8192 /* TABLE_BODY */:
      return ["table body", "<tr>"];
    case 16384 /* TABLE_ROW */:
      return ["table row", "<td>, <th>"];
    case 32768 /* TABLE_COLGROUP */:
      return ["table column group", "<col>"];
    case 258 /* PHRASING_ANY */:
    case 514 /* PHRASING_INSIDE_INPUT */:
    case 1026 /* PHRASING_CONTAINER */:
      return ["phrasing content", "<a>, <b>, <img>, <input> ... (no <div>, <p> ...)"];
    case 1 /* DOCUMENT */:
      return ["document", "<html>"];
  }
};
var initialTag = (tag) => {
  switch (tag) {
    case "html":
      return 32 /* HTML */;
    case "head":
      return 64 /* HEAD */;
    case "body":
      return 130 /* BODY */;
    default:
      return isTagAllowed(10 /* ANYTHING */, tag);
  }
};
function isTagAllowed(state, tag) {
  switch (state) {
    case 2 /* TEXT */:
    case 0 /* NOT_ALLOWED */:
      return 0 /* NOT_ALLOWED */;
    case 32 /* HTML */:
      return isInHtml(tag);
    case 64 /* HEAD */:
      return isInHead(tag);
    case 130 /* BODY */:
    case 10 /* ANYTHING */:
    case 1026 /* PHRASING_CONTAINER */:
      return isInAnything(tag);
    case 4096 /* TABLE */:
      return isInTable(tag);
    case 8192 /* TABLE_BODY */:
      return isInTableBody(tag);
    case 16384 /* TABLE_ROW */:
      return isInTableRow(tag);
    case 32768 /* TABLE_COLGROUP */:
      return isInTableColGroup(tag);
    case 258 /* PHRASING_ANY */:
      return isInPhrasing(tag, true);
    case 514 /* PHRASING_INSIDE_INPUT */:
      return isInPhrasing(tag, false);
    case 1 /* DOCUMENT */:
      if (tag === "html") {
        return 32 /* HTML */;
      }
  }
  return 0 /* NOT_ALLOWED */;
}
function isInHtml(text) {
  switch (text) {
    case "head":
      return 64 /* HEAD */;
    case "body":
      return 130 /* BODY */;
    default:
      return 0 /* NOT_ALLOWED */;
  }
}
function isInHead(text) {
  switch (text) {
    case "title":
    case "script":
    case "noscript":
    case "style":
      return 2 /* TEXT */;
    case "meta":
    case "link":
    case "base":
      return 4 /* EMPTY */;
    case "template":
      return 10 /* ANYTHING */;
    default:
      return 0 /* NOT_ALLOWED */;
  }
}
function isSelfClosingTag(text) {
  switch (text) {
    case "area":
    case "base":
    case "basefont":
    case "bgsound":
    case "br":
    case "col":
    case "embed":
    case "frame":
    case "hr":
    case "img":
    case "input":
    case "keygen":
    case "link":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
      return true;
    default:
      return false;
  }
}
function isInAnything(text) {
  if (isSelfClosingTag(text)) {
    return 4 /* EMPTY */;
  }
  switch (text) {
    case "script":
    case "style":
    case "noscript":
    case "noframes":
      return 2 /* TEXT */;
    case "p":
    case "pre":
      return 258 /* PHRASING_ANY */;
    case "table":
      return 4096 /* TABLE */;
    case "html":
    case "head":
    case "body":
      return 0 /* NOT_ALLOWED */;
    case "button":
    case "input":
    case "textarea":
      return 514 /* PHRASING_INSIDE_INPUT */;
    default:
      return 10 /* ANYTHING */;
  }
}
function isInTable(text) {
  switch (text) {
    case "caption":
      return 10 /* ANYTHING */;
    case "colgroup":
      return 32768 /* TABLE_COLGROUP */;
    case "thead":
    case "tbody":
    case "tfoot":
      return 8192 /* TABLE_BODY */;
    default:
      return 0 /* NOT_ALLOWED */;
  }
}
function isInTableBody(text) {
  switch (text) {
    case "tr":
      return 16384 /* TABLE_ROW */;
    default:
      return 0 /* NOT_ALLOWED */;
  }
}
function isInTableRow(text) {
  switch (text) {
    case "td":
    case "th":
      return 10 /* ANYTHING */;
    default:
      return 0 /* NOT_ALLOWED */;
  }
}
function isInTableColGroup(text) {
  switch (text) {
    case "col":
      return 4 /* EMPTY */;
    default:
      return 0 /* NOT_ALLOWED */;
  }
}
function isInPhrasing(text, allowInput) {
  switch (text) {
    case "svg":
    case "math":
      return 1026 /* PHRASING_CONTAINER */;
    case "button":
    case "input":
    case "textarea":
      return allowInput ? 514 /* PHRASING_INSIDE_INPUT */ : 0 /* NOT_ALLOWED */;
    case "a":
    case "abbr":
    case "area":
    case "audio":
    case "b":
    case "bdi":
    case "bdo":
    case "br":
    case "canvas":
    case "cite":
    case "code":
    case "command":
    case "data":
    case "datalist":
    case "del":
    case "dfn":
    case "em":
    case "embed":
    case "i":
    case "iframe":
    case "img":
    case "ins":
    case "itemprop":
    case "kbd":
    case "keygen":
    case "label":
    case "link":
    case "map":
    case "mark":
    case "meta":
    case "meter":
    case "noscript":
    case "object":
    case "option":
    case "output":
    case "picture":
    case "progress":
    case "q":
    case "ruby":
    case "s":
    case "samp":
    case "script":
    case "select":
    case "slot":
    case "small":
    case "span":
    case "strong":
    case "sub":
    case "sup":
    case "template":
    case "time":
    case "u":
    case "var":
    case "video":
    case "wbr":
      return allowInput ? 258 /* PHRASING_ANY */ : 514 /* PHRASING_INSIDE_INPUT */;
    case "style":
      return 2 /* TEXT */;
    default:
      return 0 /* NOT_ALLOWED */;
  }
}

// packages/qwik/src/server/vnode-data.ts
var OPEN_FRAGMENT = Number.MAX_SAFE_INTEGER;
var CLOSE_FRAGMENT = Number.MAX_SAFE_INTEGER - 1;
var EMPTY_ARRAY2 = [];
function vNodeData_incrementElementCount(vNodeData) {
  const length = vNodeData.length;
  const lastValue = length > 1 ? vNodeData[length - 1] : 0;
  if (lastValue >= 0) {
    vNodeData.push(-1);
  } else {
    vNodeData[length - 1] = lastValue - 1;
  }
}
function vNodeData_addTextSize(vNodeData, size) {
  const length = vNodeData.length;
  const lastValue = length > 1 ? vNodeData[length - 1] : 0;
  if (length > 1 && lastValue >= 0) {
    vNodeData[0] |= 1 /* TEXT_DATA */;
  }
  vNodeData.push(size);
  if (size == 0) {
    vNodeData[0] |= 1 /* TEXT_DATA */;
  }
}
function vNodeData_openFragment(vNodeData, attrs) {
  vNodeData.push(attrs, OPEN_FRAGMENT);
  vNodeData[0] |= 2 /* VIRTUAL_NODE */;
}
function vNodeData_closeFragment(vNodeData) {
  vNodeData.push(CLOSE_FRAGMENT);
}
function vNodeData_createSsrNodeReference(currentComponentNode, vNodeData, depthFirstElementIdx, cleanupQueue) {
  vNodeData[0] |= 4 /* REFERENCE */;
  if (vNodeData.length == 1) {
    return new SsrNode(
      currentComponentNode,
      SsrNode.ELEMENT_NODE,
      String(depthFirstElementIdx),
      EMPTY_ARRAY2,
      cleanupQueue
    );
  } else {
    let fragmentAttrs = EMPTY_ARRAY2;
    const stack = [SsrNode.ELEMENT_NODE, -1];
    for (let i = 1; i < vNodeData.length; i++) {
      const value = vNodeData[i];
      if (Array.isArray(value)) {
        fragmentAttrs = value;
        i++;
        stack[stack.length - 1]++;
        stack.push(SsrNode.DOCUMENT_FRAGMENT_NODE, -1);
      } else if (value === CLOSE_FRAGMENT) {
        stack.pop();
        stack.pop();
        fragmentAttrs = EMPTY_ARRAY2;
      } else if (value < 0) {
        const numberOfElements = 0 - value;
        stack[stack.length - 1] += numberOfElements;
      } else {
        stack[stack.length - 1]++;
      }
    }
    let refId = String(depthFirstElementIdx);
    for (let i = 1; i < stack.length; i += 2) {
      const childCount = stack[i];
      if (childCount >= 0) {
        refId += encodeAsAlphanumeric(childCount);
      }
    }
    const type = stack[stack.length - 2];
    return new SsrNode(currentComponentNode, type, refId, fragmentAttrs, cleanupQueue);
  }
}
var ALPHANUMERIC = [];
function encodeAsAlphanumeric(value) {
  while (ALPHANUMERIC.length <= value) {
    let value2 = ALPHANUMERIC.length;
    let text = "";
    do {
      text = String.fromCharCode(
        (text.length === 0 ? 65 : 97) + value2 % 26
        /* A-Z */
      ) + text;
      value2 = Math.floor(
        value2 / 26
        /* A-Z */
      );
    } while (value2 !== 0);
    ALPHANUMERIC.push(text);
  }
  return ALPHANUMERIC[value];
}

// packages/qwik/src/server/ssr-container.ts
function ssrCreateContainer(opts) {
  opts.renderOptions ||= {};
  return new SSRContainer({
    tagName: opts.tagName || "div",
    writer: opts.writer || new StringBufferWriter(),
    locale: opts.locale || "",
    timing: opts.timing || {
      firstFlush: 0,
      render: 0,
      snapshot: 0
    },
    buildBase: opts.buildBase || "/build/",
    resolvedManifest: opts.resolvedManifest || {
      mapper: {},
      manifest: {
        manifestHash: "dev",
        mapping: {},
        bundles: {},
        symbols: {},
        version: "dev-mode"
      }
    },
    renderOptions: opts.renderOptions
  });
}
var StringBufferWriter = class {
  constructor() {
    this.buffer = [];
  }
  write(text) {
    this.buffer.push(text);
  }
  toString() {
    return this.buffer.join("");
  }
};
var EMPTY_OBJ2 = {};
var SSRContainer = class extends import_qwik3._SharedContainer {
  constructor(opts) {
    super(
      () => null,
      () => null,
      opts.renderOptions.serverData ?? EMPTY_OBJ2,
      opts.locale
    );
    this.prefetchResources = [];
    /**
     * We use this to append additional nodes in the head node
     *
     * - From manifest injections
     * - From useStyles and useScopedStyles hooks
     */
    this.additionalHeadNodes = new Array();
    /**
     * We use this to append additional nodes in the body node
     *
     * - From manifest injections
     */
    this.additionalBodyNodes = new Array();
    this.lastNode = null;
    this.currentComponentNode = null;
    this.styleIds = /* @__PURE__ */ new Set();
    this.currentElementFrame = null;
    /**
     * Current element index.
     *
     * This number must match the depth-first traversal of the DOM elements as returned by the
     * https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
     */
    this.depthFirstElementCount = -1;
    this.vNodeData = [];
    this.componentStack = [];
    this.unclaimedProjections = [];
    this.unclaimedProjectionComponentFrameQueue = [];
    this.cleanupQueue = [];
    this.$instanceHash$ = hash();
    this.symbolToChunkResolver = (symbol) => {
      const idx = symbol.lastIndexOf("_");
      const chunk = this.resolvedManifest.mapper[idx == -1 ? symbol : symbol.substring(idx + 1)];
      return chunk ? chunk[1] : "";
    };
    this.serializationCtx = this.serializationCtxFactory(
      SsrNode,
      this.symbolToChunkResolver,
      opts.writer
    );
    this.renderTimer = createTimer();
    this.tag = opts.tagName;
    this.writer = opts.writer;
    this.timing = opts.timing;
    this.buildBase = opts.buildBase;
    this.resolvedManifest = opts.resolvedManifest;
    this.renderOptions = opts.renderOptions;
    this.$processInjectionsFromManifest$();
  }
  ensureProjectionResolved(host) {
  }
  processJsx(host, jsx2) {
    throw new Error("Should not get here.");
  }
  handleError(err, $host$) {
    throw err;
  }
  async render(jsx2) {
    this.openContainer();
    await (0, import_qwik3._walkJSX)(this, jsx2, true, null);
    await this.closeContainer();
  }
  setContext(host, context, value) {
    const ssrNode = host;
    let ctx = ssrNode.getProp(QCtxAttr);
    if (!ctx) {
      ssrNode.setProp(QCtxAttr, ctx = []);
    }
    mapArray_set(ctx, context.id, value, 0);
  }
  resolveContext(host, contextId) {
    let ssrNode = host;
    while (ssrNode) {
      const ctx = ssrNode.getProp(QCtxAttr);
      if (ctx) {
        const value = mapArray_get(ctx, contextId.id, 0);
        if (value) {
          return value;
        }
      }
      ssrNode = ssrNode.currentComponentNode;
    }
    return void 0;
  }
  getParentHost(host) {
    const ssrNode = host;
    return ssrNode.currentComponentNode;
  }
  setHostProp(host, name, value) {
    const ssrNode = host;
    return ssrNode.setProp(name, value);
  }
  getHostProp(host, name) {
    const ssrNode = host;
    return ssrNode.getProp(name);
  }
  openContainer() {
    if (this.tag == "html") {
      this.write("<!DOCTYPE html>");
    }
    const containerAttributes = this.renderOptions.containerAttributes || {};
    const qRender = containerAttributes[QRenderAttr];
    containerAttributes[QContainerAttr] = "paused" /* PAUSED */;
    containerAttributes[QRuntimeAttr] = "2";
    containerAttributes[QVersionAttr] = this.$version$ ?? "dev";
    containerAttributes[QRenderAttr] = (qRender ? qRender + "-" : "") + (import_build9.isDev ? "ssr-dev" : "ssr");
    containerAttributes[QBaseAttr] = this.buildBase || "";
    containerAttributes[QLocaleAttr] = this.$locale$;
    containerAttributes[QManifestHashAttr] = this.resolvedManifest.manifest.manifestHash;
    containerAttributes[QInstanceAttr] = this.$instanceHash$;
    this.$serverData$.containerAttributes = containerAttributes;
    const containerAttributeArray = Object.entries(containerAttributes).reduce(
      (acc, [key, value]) => {
        acc.push(key, value);
        return acc;
      },
      []
    );
    this.openElement(this.tag, containerAttributeArray);
  }
  closeContainer() {
    return this.closeElement();
  }
  openElement(elementName, varAttrs, constAttrs) {
    let innerHTML = void 0;
    this.lastNode = null;
    const isQwikStyle = isQwikStyleElement(elementName, varAttrs) || isQwikStyleElement(elementName, constAttrs);
    if (!isQwikStyle && this.currentElementFrame) {
      vNodeData_incrementElementCount(this.currentElementFrame.vNodeData);
    }
    this.createAndPushFrame(elementName, this.depthFirstElementCount++);
    this.write("<");
    this.write(elementName);
    if (varAttrs) {
      innerHTML = this.writeAttrs(elementName, varAttrs, false);
    }
    this.write(" " + Q_PROPS_SEPARATOR);
    import_build9.isDev && this.write('=""');
    if (constAttrs && constAttrs.length) {
      innerHTML = this.writeAttrs(elementName, constAttrs, true) || innerHTML;
    }
    this.write(">");
    this.lastNode = null;
    return innerHTML;
  }
  closeElement() {
    const currentFrame = this.currentElementFrame;
    if (currentFrame.parent === null && currentFrame.elementName !== "html" || currentFrame.elementName === "body") {
      this.drainCleanupQueue();
      this.timing.render = this.renderTimer();
      const snapshotTimer = createTimer();
      return maybeThen(
        maybeThen(this.emitContainerData(), () => this._closeElement()),
        () => {
          this.timing.snapshot = snapshotTimer();
        }
      );
    }
    this._closeElement();
  }
  drainCleanupQueue() {
    for (let i = 0; i < this.cleanupQueue.length; i++) {
      const sequences = this.cleanupQueue[i];
      for (let j = 0; j < sequences.length; j++) {
        const item = sequences[j];
        if (hasDestroy(item)) {
          item.$destroy$();
        }
      }
    }
  }
  _closeElement() {
    const currentFrame = this.popFrame();
    const elementName = currentFrame.elementName;
    if (!isSelfClosingTag(elementName)) {
      this.write("</");
      this.write(elementName);
      this.write(">");
    }
    this.lastNode = null;
  }
  openFragment(attrs) {
    this.lastNode = null;
    vNodeData_openFragment(this.currentElementFrame.vNodeData, attrs);
  }
  closeFragment() {
    vNodeData_closeFragment(this.currentElementFrame.vNodeData);
    this.lastNode = null;
  }
  openProjection(attrs) {
    this.openFragment(attrs);
    const componentFrame = this.getComponentFrame();
    if (componentFrame) {
      componentFrame.projectionDepth++;
    }
  }
  closeProjection() {
    const componentFrame = this.getComponentFrame();
    if (componentFrame) {
      componentFrame.projectionDepth--;
    }
    this.closeFragment();
  }
  openComponent(attrs) {
    this.openFragment(attrs);
    this.currentComponentNode = this.getLastNode();
    this.componentStack.push(new SsrComponentFrame(this.getLastNode()));
  }
  /**
   * Returns the current component frame.
   *
   * @param projectionDepth - How many levels of projection to skip. This is needed when projections
   *   are nested inside other projections we need to have a way to read from a frame above.
   * @returns
   */
  getComponentFrame(projectionDepth = 0) {
    const length = this.componentStack.length;
    const idx = length - projectionDepth - 1;
    return idx >= 0 ? this.componentStack[idx] : null;
  }
  getNearestComponentFrame() {
    const currentFrame = this.getComponentFrame(0);
    if (!currentFrame) {
      return null;
    }
    return this.getComponentFrame(currentFrame.projectionDepth);
  }
  closeComponent() {
    var _a;
    const componentFrame = this.componentStack.pop();
    componentFrame.releaseUnclaimedProjections(this.unclaimedProjections);
    this.closeFragment();
    this.currentComponentNode = ((_a = this.currentComponentNode) == null ? void 0 : _a.currentComponentNode) || null;
  }
  /** Write a text node with correct escaping. Save the length of the text node in the vNodeData. */
  textNode(text) {
    this.write(escapeHTML(text));
    vNodeData_addTextSize(this.currentElementFrame.vNodeData, text.length);
    this.lastNode = null;
  }
  htmlNode(rawHtml) {
    this.write(rawHtml);
  }
  commentNode(text) {
    this.write("<!--" + text + "-->");
  }
  addRoot(obj) {
    return this.serializationCtx.$addRoot$(obj);
  }
  getLastNode() {
    if (!this.lastNode) {
      this.lastNode = vNodeData_createSsrNodeReference(
        this.currentComponentNode,
        this.currentElementFrame.vNodeData,
        // we start at -1, so we need to add +1
        this.currentElementFrame.depthFirstElementIdx + 1,
        this.cleanupQueue
      );
    }
    return this.lastNode;
  }
  addUnclaimedProjection(frame, name, children) {
    this.unclaimedProjections.push(frame, null, name, children);
  }
  $processInjectionsFromManifest$() {
    const injections = this.resolvedManifest.manifest.injections;
    if (!injections) {
      return;
    }
    for (let i = 0; i < injections.length; i++) {
      const injection = injections[i];
      const jsxNode = (0, import_qwik3._jsxSplit)(injection.tag, null, injection.attributes || {}, null, 0, null);
      if (injection.location === "head") {
        this.additionalHeadNodes.push(jsxNode);
      } else {
        this.additionalBodyNodes.push(jsxNode);
      }
    }
  }
  $appendStyle$(content, styleId, host, scoped) {
    var _a;
    if (scoped) {
      const componentFrame = this.getComponentFrame(0);
      componentFrame.scopedStyleIds.add(styleId);
      const scopedStyleIds = convertStyleIdsToString(componentFrame.scopedStyleIds);
      this.setHostProp(host, QScopedStyle, scopedStyleIds);
    }
    if (!this.styleIds.has(styleId)) {
      this.styleIds.add(styleId);
      if (((_a = this.currentElementFrame) == null ? void 0 : _a.elementName) === "html") {
        this.additionalHeadNodes.push(
          (0, import_qwik3._jsxSorted)(
            "style",
            null,
            { dangerouslySetInnerHTML: content, [QStyle]: styleId },
            null,
            0,
            styleId
          )
        );
      } else {
        this._styleNode(styleId, content);
      }
    }
  }
  _styleNode(styleId, content) {
    this.openElement("style", [QStyle, styleId]);
    this.write(content);
    this.closeElement();
  }
  ////////////////////////////////////
  emitContainerData() {
    this.emitUnclaimedProjection();
    this.addVNodeDataToSerializationRoots();
    return maybeThen(this.emitStateData(), () => {
      this.emitVNodeData();
      this.emitPrefetchResourcesData();
      this.emitSyncFnsData();
      this.emitQwikLoaderAtBottomIfNeeded();
    });
  }
  /**
   * Serialize the vNodeData into a string and emit it as a script tag.
   *
   * ## Encoding:
   *
   * - Alphabetical characters are text node lengths.
   * - Numbers are element counts.
   * - `{` is start of virtual node.
   * - `}` is end of virtual node.
   * - `~` Store as reference for data deserialization.
   * - `!"#$%&'()*+'-./` are separators (sequential characters in ASCII table)
   *
   * Attribute and separators encoding described here:
   * `packages/qwik/src/core/v2/shared/vnode-data-types.ts`
   *
   * NOTE: Not every element will need vNodeData. So we need to encode how many elements should be
   * skipped. By choosing different separators we can encode different numbers of elements to skip.
   */
  emitVNodeData() {
    this.openElement("script", ["type", "qwik/vnode"]);
    const vNodeAttrsStack = [];
    const vNodeData = this.vNodeData;
    let lastSerializedIdx = 0;
    for (let elementIdx = 0; elementIdx < vNodeData.length; elementIdx++) {
      const vNode = vNodeData[elementIdx];
      const flag = vNode[0];
      if (flag !== 0 /* NONE */) {
        lastSerializedIdx = this.emitVNodeSeparators(lastSerializedIdx, elementIdx);
        if (flag & 4 /* REFERENCE */) {
          this.write(VNodeDataSeparator.REFERENCE_CH);
        }
        if (flag & (1 /* TEXT_DATA */ | 2 /* VIRTUAL_NODE */)) {
          let fragmentAttrs = null;
          let depth = 0;
          for (let i = 1; i < vNode.length; i++) {
            const value = vNode[i];
            if (Array.isArray(value)) {
              vNodeAttrsStack.push(fragmentAttrs);
              fragmentAttrs = value;
            } else if (value === OPEN_FRAGMENT) {
              depth++;
              this.write(VNodeDataChar.OPEN_CHAR);
            } else if (value === CLOSE_FRAGMENT) {
              if (fragmentAttrs) {
                writeFragmentAttrs(this.write.bind(this), this.addRoot.bind(this), fragmentAttrs);
                fragmentAttrs = vNodeAttrsStack.pop();
              }
              depth--;
              this.write(VNodeDataChar.CLOSE_CHAR);
            } else if (value >= 0) {
              this.write(encodeAsAlphanumeric(value));
            } else {
              this.write(String(0 - value));
            }
          }
          while (depth-- > 0) {
            if (fragmentAttrs) {
              writeFragmentAttrs(this.write.bind(this), this.addRoot.bind(this), fragmentAttrs);
              fragmentAttrs = vNodeAttrsStack.pop();
            }
            this.write(VNodeDataChar.CLOSE_CHAR);
          }
        }
      }
    }
    function writeFragmentAttrs(write, addRoot, fragmentAttrs) {
      for (let i = 0; i < fragmentAttrs.length; ) {
        const key = fragmentAttrs[i++];
        let value = fragmentAttrs[i++];
        if (typeof value !== "string") {
          value = String(addRoot(value));
        }
        switch (key) {
          case QScopedStyle:
            write(VNodeDataChar.SCOPED_STYLE_CHAR);
            break;
          case OnRenderProp:
            write(VNodeDataChar.RENDER_FN_CHAR);
            break;
          case ELEMENT_ID:
            write(VNodeDataChar.ID_CHAR);
            break;
          case ELEMENT_PROPS:
            write(VNodeDataChar.PROPS_CHAR);
            break;
          case QSlotRef:
            write(VNodeDataChar.SLOT_REF_CHAR);
            break;
          case ELEMENT_KEY:
            write(VNodeDataChar.KEY_CHAR);
            break;
          case ELEMENT_SEQ:
            write(VNodeDataChar.SEQ_CHAR);
            break;
          case ELEMENT_SEQ_IDX:
            write(VNodeDataChar.SEQ_IDX_CHAR);
            break;
          case QCtxAttr:
            write(VNodeDataChar.CONTEXT_CHAR);
            break;
          case QSlot:
            write(VNodeDataChar.SLOT_CHAR);
            break;
          default:
            write(VNodeDataChar.SEPARATOR_CHAR);
            write(key);
            write(VNodeDataChar.SEPARATOR_CHAR);
        }
        write(value);
      }
    }
    this.closeElement();
  }
  /**
   * This is needed for the case when we have a component around the `<body>` tag. In this case we
   * start emitting the vnode script tag before the `<body>` close tag.
   */
  addVNodeDataToSerializationRoots() {
    const vNodeAttrsStack = [];
    const vNodeData = this.vNodeData;
    for (let elementIdx = 0; elementIdx < vNodeData.length; elementIdx++) {
      const vNode = vNodeData[elementIdx];
      const flag = vNode[0];
      if (flag !== 0 /* NONE */) {
        if (flag & (1 /* TEXT_DATA */ | 2 /* VIRTUAL_NODE */)) {
          let fragmentAttrs = null;
          let depth = 0;
          for (let i = 1; i < vNode.length; i++) {
            const value = vNode[i];
            if (Array.isArray(value)) {
              vNodeAttrsStack.push(fragmentAttrs);
              fragmentAttrs = value;
            } else if (value === OPEN_FRAGMENT) {
              depth++;
            } else if (value === CLOSE_FRAGMENT) {
              if (fragmentAttrs) {
                for (let i2 = 1; i2 < fragmentAttrs.length; i2 += 2) {
                  const value2 = fragmentAttrs[i2];
                  if (typeof value2 !== "string") {
                    fragmentAttrs[i2] = String(this.addRoot(value2));
                  }
                }
                fragmentAttrs = vNodeAttrsStack.pop();
              }
              depth--;
            }
          }
          while (depth-- > 0) {
            if (fragmentAttrs) {
              for (let i = 0; i < fragmentAttrs.length; i++) {
                const value = fragmentAttrs[i];
                if (typeof value !== "string") {
                  fragmentAttrs[i] = String(this.addRoot(value));
                }
              }
              fragmentAttrs = vNodeAttrsStack.pop();
            }
          }
        }
      }
    }
  }
  emitStateData() {
    this.openElement("script", ["type", "qwik/state"]);
    return maybeThen(this.serializationCtx.$breakCircularDepsAndAwaitPromises$(), () => {
      this.serializationCtx.$serialize$();
      this.closeElement();
    });
  }
  emitSyncFnsData() {
    var _a;
    const fns = this.serializationCtx.$syncFns$;
    if (fns.length) {
      const scriptAttrs = ["q:func", "qwik/json"];
      if ((_a = this.renderOptions.serverData) == null ? void 0 : _a.nonce) {
        scriptAttrs.push("nonce", this.renderOptions.serverData.nonce);
      }
      this.openElement("script", scriptAttrs);
      this.write(Q_FUNCS_PREFIX.replace("HASH", this.$instanceHash$));
      this.write("[");
      this.writeArray(fns, ",");
      this.write("]");
      this.closeElement();
    }
  }
  emitPrefetchResourcesData() {
    const qrls = Array.from(this.serializationCtx.$eventQrls$);
    if (this.renderOptions.prefetchStrategy !== null && qrls.length) {
      const prefetchResources = getPrefetchResources(
        qrls,
        this.renderOptions,
        this.resolvedManifest
      );
      if (prefetchResources.length > 0) {
        applyPrefetchImplementation2(this, this.renderOptions.prefetchStrategy, prefetchResources);
        this.prefetchResources = prefetchResources;
      }
    }
  }
  isStatic() {
    return this.serializationCtx.$eventQrls$.size === 0;
  }
  getQwikLoaderPositionMode() {
    var _a;
    return ((_a = this.renderOptions.qwikLoader) == null ? void 0 : _a.position) ?? "bottom";
  }
  getQwikLoaderIncludeMode() {
    var _a;
    return ((_a = this.renderOptions.qwikLoader) == null ? void 0 : _a.include) ?? "auto";
  }
  emitQwikLoaderAtTopIfNeeded() {
    const positionMode = this.getQwikLoaderPositionMode();
    if (positionMode === "top") {
      const includeMode = this.getQwikLoaderIncludeMode();
      const includeLoader = includeMode !== "never";
      if (includeLoader) {
        this.emitQwikLoader();
        this.emitQwikEvents(['"click"'], {
          includeLoader: true,
          includeNonce: false
        });
      }
    }
  }
  emitQwikLoaderAtBottomIfNeeded() {
    const positionMode = this.getQwikLoaderPositionMode();
    let includeLoader = true;
    if (positionMode === "bottom") {
      const needLoader = !this.isStatic();
      const includeMode = this.getQwikLoaderIncludeMode();
      includeLoader = includeMode === "always" || includeMode === "auto" && needLoader;
      if (includeLoader) {
        this.emitQwikLoader();
      }
    }
    this.emitQwikEvents(
      Array.from(this.serializationCtx.$eventNames$, (s) => JSON.stringify(s)),
      {
        includeLoader,
        includeNonce: true
      }
    );
  }
  emitQwikLoader() {
    var _a;
    const qwikLoaderScript = getQwikLoaderScript({
      debug: this.renderOptions.debug
    });
    const scriptAttrs = ["id", "qwikloader"];
    if ((_a = this.renderOptions.serverData) == null ? void 0 : _a.nonce) {
      scriptAttrs.push("nonce", this.renderOptions.serverData.nonce);
    }
    this.openElement("script", scriptAttrs);
    this.write(qwikLoaderScript);
    this.closeElement();
  }
  emitQwikEvents(eventNames, opts) {
    var _a;
    if (eventNames.length > 0) {
      const scriptAttrs = [];
      if (((_a = this.renderOptions.serverData) == null ? void 0 : _a.nonce) && opts.includeNonce) {
        scriptAttrs.push("nonce", this.renderOptions.serverData.nonce);
      }
      this.openElement("script", scriptAttrs);
      this.write(opts.includeLoader ? `window.qwikevents` : `(window.qwikevents||=[])`);
      this.write(".push(");
      this.writeArray(eventNames, ", ");
      this.write(")");
      this.closeElement();
    }
  }
  async emitUnclaimedProjection() {
    const unclaimedProjections = this.unclaimedProjections;
    if (unclaimedProjections.length) {
      const previousCurrentComponentNode = this.currentComponentNode;
      try {
        this.openElement(QTemplate, ["style", "display:none"], null);
        let idx = 0;
        let ssrComponentNode = null;
        let ssrComponentFrame = null;
        let scopedStyleId = null;
        for (let i = 0; i < unclaimedProjections.length; i += 4) {
          this.unclaimedProjectionComponentFrameQueue.push(
            unclaimedProjections[i]
          );
        }
        while (idx < unclaimedProjections.length) {
          const value = unclaimedProjections[idx++];
          if (value instanceof SsrComponentFrame) {
            ssrComponentNode = this.currentComponentNode = value.componentNode;
            ssrComponentFrame = value;
            scopedStyleId = unclaimedProjections[idx++];
          } else if (typeof value === "string") {
            const children = unclaimedProjections[idx++];
            if (!(ssrComponentFrame == null ? void 0 : ssrComponentFrame.hasSlot(value))) {
              ssrComponentFrame && ssrComponentFrame.componentNode.removeProp(value);
              continue;
            }
            this.unclaimedProjectionComponentFrameQueue.shift();
            this.openFragment(
              import_build9.isDev ? [DEBUG_TYPE, "P" /* Projection */, QSlotParent, ssrComponentNode.id] : [QSlotParent, ssrComponentNode.id]
            );
            ssrComponentNode == null ? void 0 : ssrComponentNode.setProp(value, this.getLastNode().id);
            (0, import_qwik3._walkJSX)(this, children, false, scopedStyleId);
            this.closeFragment();
          } else {
            throw Error();
          }
        }
        this.closeElement();
      } finally {
        this.currentComponentNode = previousCurrentComponentNode;
      }
    }
  }
  emitVNodeSeparators(lastSerializedIdx, elementIdx) {
    let skipCount = elementIdx - lastSerializedIdx;
    while (skipCount != 0) {
      if (skipCount > 4096) {
        this.write(VNodeDataSeparator.ADVANCE_8192_CH);
        skipCount -= 8192;
      } else {
        skipCount & 4096 && this.write(VNodeDataSeparator.ADVANCE_4096_CH);
        skipCount & 2048 && this.write(VNodeDataSeparator.ADVANCE_2048_CH);
        skipCount & 1024 && this.write(VNodeDataSeparator.ADVANCE_1024_CH);
        skipCount & 512 && this.write(VNodeDataSeparator.ADVANCE_512_CH);
        skipCount & 256 && this.write(VNodeDataSeparator.ADVANCE_256_CH);
        skipCount & 128 && this.write(VNodeDataSeparator.ADVANCE_128_CH);
        skipCount & 64 && this.write(VNodeDataSeparator.ADVANCE_64_CH);
        skipCount & 32 && this.write(VNodeDataSeparator.ADVANCE_32_CH);
        skipCount & 16 && this.write(VNodeDataSeparator.ADVANCE_16_CH);
        skipCount & 8 && this.write(VNodeDataSeparator.ADVANCE_8_CH);
        skipCount & 4 && this.write(VNodeDataSeparator.ADVANCE_4_CH);
        skipCount & 2 && this.write(VNodeDataSeparator.ADVANCE_2_CH);
        skipCount & 1 && this.write(VNodeDataSeparator.ADVANCE_1_CH);
        skipCount = 0;
      }
    }
    return elementIdx;
  }
  createAndPushFrame(elementName, depthFirstElementIdx) {
    let tagNesting = 10 /* ANYTHING */;
    if (import_build9.isDev) {
      if (!this.currentElementFrame) {
        tagNesting = initialTag(elementName);
      } else {
        let frame2 = this.currentElementFrame;
        const previousTagNesting = frame2.tagNesting;
        tagNesting = isTagAllowed(previousTagNesting, elementName);
        if (tagNesting === 0 /* NOT_ALLOWED */) {
          const frames = [];
          while (frame2) {
            frames.unshift(frame2);
            frame2 = frame2.parent;
          }
          const text = [
            `HTML rules do not allow '<${elementName}>' at this location.`,
            `  (The HTML parser will try to recover by auto-closing or inserting additional tags which will confuse Qwik when it resumes.)`,
            `  Offending tag: <${elementName}>`,
            `  Existing tag context:`
          ];
          let indent = "    ";
          let lastName = "";
          for (const frame3 of frames) {
            const [name, example] = allowedContent(frame3.tagNesting);
            text.push(
              `${indent}<${frame3.elementName}>${lastName !== name ? ` [${name}]${example ? ` -> ${example}` : ""}` : ""}`
            );
            lastName = name;
            indent += " ";
          }
          text.push(
            `${indent}<${elementName}> <= is not allowed as a child of ${allowedContent(previousTagNesting)[0]}.`
          );
          throw newTagError(text.join("\n"));
        }
      }
    }
    const frame = {
      tagNesting,
      parent: this.currentElementFrame,
      elementName,
      depthFirstElementIdx,
      vNodeData: [0 /* NONE */]
    };
    this.currentElementFrame = frame;
    this.vNodeData.push(frame.vNodeData);
  }
  popFrame() {
    const closingFrame = this.currentElementFrame;
    this.currentElementFrame = closingFrame.parent;
    return closingFrame;
  }
  ////////////////////////////////////
  write(text) {
    this.writer.write(text);
  }
  writeArray(array, separator) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (i > 0) {
        this.write(separator);
      }
      this.write(element);
    }
  }
  writeAttrs(tag, attrs, isConst) {
    let innerHTML = void 0;
    if (attrs.length) {
      for (let i = 0; i < attrs.length; i++) {
        let key = attrs[i++];
        let value = attrs[i];
        let styleScopedId = null;
        if (isSSRUnsafeAttr(key)) {
          if (import_build9.isDev) {
            throw new Error("Attribute value is unsafe for SSR");
          }
          continue;
        }
        if (isClassAttr(key) && Array.isArray(value)) {
          const [signalValue, styleId] = value;
          value = signalValue;
          styleScopedId = styleId;
        }
        if (key === "ref") {
          const lastNode = this.getLastNode();
          lastNode.setProp(UNWRAP_VNODE_LOCAL, true);
          if ((0, import_qwik3.isSignal)(value)) {
            value.value = lastNode;
            continue;
          } else if (typeof value === "function") {
            value(lastNode);
            continue;
          }
        }
        if ((0, import_qwik3.isSignal)(value)) {
          const lastNode = this.getLastNode();
          const signalData = new import_qwik3._EffectData({
            $scopedStyleIdPrefix$: styleScopedId,
            $isConst$: isConst
          });
          value = this.trackSignalValue(value, lastNode, key, signalData);
        }
        if (key === dangerouslySetInnerHTML) {
          innerHTML = String(value);
          key = QContainerAttr;
          value = "html" /* HTML */;
          if (tag === "style") {
            continue;
          }
        }
        if (tag === "textarea" && key === "value") {
          if (typeof value !== "string") {
            if (import_build9.isDev) {
              throw new Error("The value of the textarea must be a string");
            }
            continue;
          }
          innerHTML = escapeHTML(value);
          key = QContainerAttr;
          value = "text" /* TEXT */;
        }
        value = serializeAttribute(key, value, styleScopedId);
        if (value != null && value !== false) {
          this.write(" ");
          this.write(key);
          if (value !== true) {
            this.write('="');
            const strValue = escapeHTML(String(value));
            this.write(strValue);
            this.write('"');
          }
        }
      }
    }
    return innerHTML;
  }
};
var isQwikStyleElement = (tag, attrs) => {
  if (tag === "style" && attrs != null) {
    for (let i = 0; i < attrs.length; i = i + 2) {
      const attr = attrs[i];
      if (attr === QStyle || attr === QScopedStyle) {
        return true;
      }
    }
  }
  return false;
};
function newTagError(text) {
  return new Error("SsrError(tag): " + text);
}
function hasDestroy(obj) {
  return obj && typeof obj === "object" && typeof obj.$destroy$ === "function";
}
function isSSRUnsafeAttr(name) {
  for (let idx = 0; idx < name.length; idx++) {
    const ch = name.charCodeAt(idx);
    if (ch === 62 || ch === 47 || ch === 61 || ch === 34 || ch === 39 || ch === 9 || ch === 10 || ch === 12 || ch === 32) {
      return true;
    }
  }
  return false;
}
function hash() {
  return Math.random().toString(36).slice(2);
}

// packages/qwik/src/server/ssr-render.ts
var renderToString = async (jsx2, opts = {}) => {
  const chunks = [];
  const stream = {
    write(chunk) {
      chunks.push(chunk);
    }
  };
  const result = await renderToStream(jsx2, {
    base: opts.base,
    containerAttributes: opts.containerAttributes,
    containerTagName: opts.containerTagName,
    locale: opts.locale,
    manifest: opts.manifest,
    symbolMapper: opts.symbolMapper,
    qwikLoader: opts.qwikLoader,
    serverData: opts.serverData,
    prefetchStrategy: opts.prefetchStrategy,
    debug: opts.debug,
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
};
var renderToStream = async (jsx2, opts) => {
  var _a, _b;
  const timing = {
    firstFlush: 0,
    render: 0,
    snapshot: 0
  };
  const containerTagName = opts.containerTagName ?? "html";
  const buildBase = getBuildBase(opts);
  const resolvedManifest = resolveManifest(opts.manifest);
  const locale = typeof opts.locale === "function" ? opts.locale(opts) : ((_a = opts.serverData) == null ? void 0 : _a.locale) || opts.locale || ((_b = opts.containerAttributes) == null ? void 0 : _b.locale) || "";
  const { stream, flush, networkFlushes, totalSize } = handleStreaming(opts, timing);
  const ssrContainer = ssrCreateContainer({
    tagName: containerTagName,
    locale,
    writer: stream,
    timing,
    buildBase,
    resolvedManifest,
    renderOptions: opts
  });
  await setServerPlatform(opts, resolvedManifest);
  await ssrContainer.render(jsx2);
  flush();
  const snapshotResult = getSnapshotResult(ssrContainer);
  const isDynamic = snapshotResult.resources.some((r) => r._cache !== Infinity);
  const result = {
    prefetchResources: ssrContainer.prefetchResources,
    snapshotResult,
    flushes: networkFlushes,
    manifest: resolvedManifest == null ? void 0 : resolvedManifest.manifest,
    size: totalSize,
    isStatic: !isDynamic,
    timing,
    _symbols: Array.from(ssrContainer.serializationCtx.$renderSymbols$)
  };
  return result;
};
function getSnapshotResult(ssrContainer) {
  const hasListeners = !ssrContainer.isStatic();
  const canRender = false;
  return hasListeners ? {
    funcs: Array.from(ssrContainer.serializationCtx.$syncFns$),
    mode: canRender ? "render" : "listeners",
    qrls: Array.from(ssrContainer.serializationCtx.$eventQrls$),
    resources: Array.from(ssrContainer.serializationCtx.$resources$)
  } : {
    funcs: [],
    mode: "static",
    qrls: [],
    resources: Array.from(ssrContainer.serializationCtx.$resources$)
  };
}
function handleStreaming(opts, timing) {
  var _a;
  const firstFlushTimer = createTimer();
  let stream = opts.stream;
  let bufferSize = 0;
  let buffer = "";
  let totalSize = 0;
  let networkFlushes = 0;
  const inOrderStreaming = ((_a = opts.streaming) == null ? void 0 : _a.inOrder) ?? {
    strategy: "auto",
    maximumInitialChunk: 2e4,
    maximumChunk: 1e4
  };
  const nativeStream = stream;
  function flush() {
    if (buffer) {
      nativeStream.write(buffer);
      buffer = "";
      bufferSize = 0;
      networkFlushes++;
      if (networkFlushes === 1) {
        timing.firstFlush = firstFlushTimer();
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
        write(chunk) {
          if (shouldSkipChunk(chunk)) {
            return;
          }
          enqueue(chunk);
        }
      };
      break;
    case "direct":
      stream = {
        write(chunk) {
          if (shouldSkipChunk(chunk)) {
            return;
          }
          nativeStream.write(chunk);
        }
      };
      break;
    case "auto":
      let openedSSRStreamBlocks = 0;
      let forceFlush = false;
      const minimumChunkSize = inOrderStreaming.maximumChunk ?? 0;
      const initialChunkSize = inOrderStreaming.maximumInitialChunk ?? 0;
      stream = {
        write(chunk) {
          if (chunk === void 0 || chunk === null) {
            return;
          }
          if (chunk === "<!--" + FLUSH_COMMENT + "-->") {
            forceFlush = true;
          } else if (chunk === "<!--" + STREAM_BLOCK_START_COMMENT + "-->") {
            openedSSRStreamBlocks++;
          } else if (chunk === "<!--" + STREAM_BLOCK_END_COMMENT + "-->") {
            openedSSRStreamBlocks--;
            if (openedSSRStreamBlocks === 0) {
              forceFlush = true;
            }
          } else {
            enqueue(chunk);
          }
          const maxBufferSize = networkFlushes === 0 ? initialChunkSize : minimumChunkSize;
          if (openedSSRStreamBlocks === 0 && (forceFlush || bufferSize >= maxBufferSize)) {
            forceFlush = false;
            flush();
          }
        }
      };
      break;
  }
  return {
    stream,
    flush,
    networkFlushes,
    totalSize
  };
}
function shouldSkipChunk(chunk) {
  return chunk === void 0 || chunk === null || chunk === "<!--" + FLUSH_COMMENT + "-->" || chunk === "<!--" + STREAM_BLOCK_START_COMMENT + "-->" || chunk === "<!--" + STREAM_BLOCK_END_COMMENT + "-->";
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
var Q_FUNCS_PREFIX = 'document["qFuncs_HASH"]=';

// packages/qwik/src/server/scripts.ts
var QWIK_LOADER_DEFAULT_MINIFIED = '(()=>{var e=Object.defineProperty,t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,o=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,s=(e,s)=>{for(var a in s||(s={}))n.call(s,a)&&o(e,a,s[a]);if(t)for(var a of t(s))r.call(s,a)&&o(e,a,s[a]);return e};((e,t)=>{const n="__q_context__",r=window,o=new Set,a=new Set([e]),c="replace",i="forEach",l="target",f="getAttribute",p="isConnected",b="qvisible",u="_qwikjson_",h=(e,t)=>Array.from(e.querySelectorAll(t)),y=e=>{const t=[];return a.forEach((n=>t.push(...h(n,e)))),t},d=e=>{S(e),h(e,"[q\\\\:shadowroot]").forEach((e=>{const t=e.shadowRoot;t&&d(t)}))},q=e=>e&&"function"==typeof e.then,m=(e,t,n=t.type)=>{y("[on"+e+"\\\\:"+n+"]")[i]((r=>E(r,e,t,n)))},w=t=>{if(void 0===t[u]){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===n[f]("type")){t[u]=JSON.parse(n.textContent[c](/\\\\x3C(\\/?script)/gi,"<$1"));break}n=n.previousElementSibling}}},v=(e,t)=>new CustomEvent(e,{detail:t}),E=async(t,r,o,a=o.type)=>{const i="on"+r+":"+a;t.hasAttribute("preventdefault:"+a)&&o.preventDefault();const l=t._qc_,b=l&&l.li.filter((e=>e[0]===i));if(b&&b.length>0){for(const e of b){const n=e[1].getFn([t,o],(()=>t[p]))(o,t),r=o.cancelBubble;q(n)&&await n,r&&o.stopPropagation()}return}const u=t.qDispatchEvent;if(u)return u(o,r);const h=t[f](i);if(h){const r=t.closest("[q\\\\:container]:not([q\\\\:container=html]):not([q\\\\:container=text])"),a=r[f]("q:base"),i=r[f]("q:version")||"unknown",l=r[f]("q:manifest-hash")||"dev",b=new URL(a,e.baseURI);for(const f of h.split("\\n")){const u=new URL(f,b),h=u.href,y=u.hash[c](/^#?([^?[|]*).*$/,"$1")||"default",d=performance.now();let m,v,E;const _=f.startsWith("#"),A={qBase:a,qManifest:l,qVersion:i,href:h,symbol:y,element:t,reqTime:d};if(_){const t=r.getAttribute("q:instance");m=(e["qFuncs_"+t]||[])[Number.parseInt(y)],m||(v="sync",E=Error("sync handler error for symbol: "+y))}else{const e=u.href.split("#")[0];try{const t=import(e);w(r),m=(await t)[y],m||(v="no-symbol",E=Error(`${y} not in ${e}`))}catch(e){v||(v="async"),E=e}}if(!m){g("qerror",s({importError:v,error:E},A)),console.error(E);break}const k=e[n];if(t[p])try{e[n]=[t,o,u],_||g("qsymbol",s({},A));const r=m(o,t);q(r)&&await r}catch(e){g("qerror",s({error:e},A))}finally{e[n]=k}}}},g=(t,n)=>{e.dispatchEvent(v(t,n))},_=e=>e[c](/([A-Z])/g,(e=>"-"+e.toLowerCase())),A=async e=>{let t=_(e.type),n=e[l];for(m("-document",e,t);n&&n[f];){const r=E(n,"",e,t);let o=e.cancelBubble;q(r)&&await r,o=o||e.cancelBubble||n.hasAttribute("stoppropagation:"+e.type),n=e.bubbles&&!0!==o?n.parentElement:null}},k=e=>{m("-window",e,_(e.type))},C=()=>{var n;const s=e.readyState;if(!t&&("interactive"==s||"complete"==s)&&(a.forEach(d),t=1,g("qinit"),(null!=(n=r.requestIdleCallback)?n:r.setTimeout).bind(r)((()=>g("qidle"))),o.has(b))){const e=y("[on\\\\:"+b+"]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n[l]),E(n[l],"",v(b,n)))}));e[i]((e=>t.observe(e)))}},O=(e,t,n,r=!1)=>e.addEventListener(t,n,{capture:r,passive:!1}),S=(...e)=>{for(const t of e)"string"==typeof t?o.has(t)||(a.forEach((e=>O(e,t,A,!0))),O(r,t,k,!0),o.add(t)):a.has(t)||(o.forEach((e=>O(t,e,A,!0))),a.add(t))};if(!(n in e)){e[n]=0;const t=r.qwikevents;Array.isArray(t)&&S(...t),r.qwikevents={events:o,roots:a,push:S},O(e,"readystatechange",C),C()}})(document)})()';
var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    var __defProp = Object.defineProperty;\n    var __getOwnPropSymbols = Object.getOwnPropertySymbols;\n    var __hasOwnProp = Object.prototype.hasOwnProperty;\n    var __propIsEnum = Object.prototype.propertyIsEnumerable;\n    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {\n        enumerable: !0,\n        configurable: !0,\n        writable: !0,\n        value: value\n    }) : obj[key] = value;\n    var __spreadValues = (a, b) => {\n        for (var prop in b || (b = {})) {\n            __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n        }\n        if (__getOwnPropSymbols) {\n            for (var prop of __getOwnPropSymbols(b)) {\n                __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n            }\n        }\n        return a;\n    };\n    ((doc, hasInitialized) => {\n        const Q_CONTEXT = "__q_context__";\n        const win = window;\n        const events =  new Set;\n        const roots =  new Set([ doc ]);\n        const nativeQuerySelectorAll = (root, selector) => Array.from(root.querySelectorAll(selector));\n        const querySelectorAll = query => {\n            const elements = [];\n            roots.forEach((root => elements.push(...nativeQuerySelectorAll(root, query))));\n            return elements;\n        };\n        const findShadowRoots = fragment => {\n            processEventOrNode(fragment);\n            nativeQuerySelectorAll(fragment, "[q\\\\:shadowroot]").forEach((parent => {\n                const shadowRoot = parent.shadowRoot;\n                shadowRoot && findShadowRoots(shadowRoot);\n            }));\n        };\n        const isPromise = promise => promise && "function" == typeof promise.then;\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((el => dispatch(el, infix, ev, type)));\n        };\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === script.getAttribute("type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, scope, ev, eventName = ev.type) => {\n            const attrName = "on" + scope + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const relevantListeners = ctx && ctx.li.filter((li => li[0] === attrName));\n            if (relevantListeners && relevantListeners.length > 0) {\n                for (const listener of relevantListeners) {\n                    const results = listener[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                    const cancelBubble = ev.cancelBubble;\n                    isPromise(results) && await results;\n                    cancelBubble && ev.stopPropagation();\n                }\n                return;\n            }\n            const qDispatchEvent = element.qDispatchEvent;\n            if (qDispatchEvent) {\n                return qDispatchEvent(ev, scope);\n            }\n            const attrValue = element.getAttribute(attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]:not([q\\\\:container=html]):not([q\\\\:container=text])");\n                const qBase = container.getAttribute("q:base");\n                const qVersion = container.getAttribute("q:version") || "unknown";\n                const qManifest = container.getAttribute("q:manifest-hash") || "dev";\n                const base = new URL(qBase, doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const href = url.href;\n                    const symbol = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    let handler;\n                    let importError;\n                    let error;\n                    const isSync = qrl.startsWith("#");\n                    const eventData = {\n                        qBase: qBase,\n                        qManifest: qManifest,\n                        qVersion: qVersion,\n                        href: href,\n                        symbol: symbol,\n                        element: element,\n                        reqTime: reqTime\n                    };\n                    if (isSync) {\n                        const hash = container.getAttribute("q:instance");\n                        handler = (doc["qFuncs_" + hash] || [])[Number.parseInt(symbol)];\n                        if (!handler) {\n                            importError = "sync";\n                            error = new Error("sync handler error for symbol: " + symbol);\n                        }\n                    } else {\n                        const uri = url.href.split("#")[0];\n                        try {\n                            const module = import(\n                                                        uri);\n                            resolveContainer(container);\n                            handler = (await module)[symbol];\n                            if (!handler) {\n                                importError = "no-symbol";\n                                error = new Error(`${symbol} not in ${uri}`);\n                            }\n                        } catch (err) {\n                            importError || (importError = "async");\n                            error = err;\n                        }\n                    }\n                    if (!handler) {\n                        emitEvent("qerror", __spreadValues({\n                            importError: importError,\n                            error: error\n                        }, eventData));\n                        console.error(error);\n                        break;\n                    }\n                    const previousCtx = doc[Q_CONTEXT];\n                    if (element.isConnected) {\n                        try {\n                            doc[Q_CONTEXT] = [ element, ev, url ];\n                            isSync || emitEvent("qsymbol", __spreadValues({}, eventData));\n                            const results = handler(ev, element);\n                            isPromise(results) && await results;\n                        } catch (error2) {\n                            emitEvent("qerror", __spreadValues({\n                                error: error2\n                            }, eventData));\n                        } finally {\n                            doc[Q_CONTEXT] = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                const results = dispatch(element, "", ev, type);\n                let cancelBubble = ev.cancelBubble;\n                isPromise(results) && await results;\n                cancelBubble = cancelBubble || ev.cancelBubble || element.hasAttribute("stoppropagation:" + ev.type);\n                element = ev.bubbles && !0 !== cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                roots.forEach(findShadowRoots);\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const processEventOrNode = (...eventNames) => {\n            for (const eventNameOrNode of eventNames) {\n                if ("string" == typeof eventNameOrNode) {\n                    if (!events.has(eventNameOrNode)) {\n                        roots.forEach((root => addEventListener(root, eventNameOrNode, processDocumentEvent, !0)));\n                        addEventListener(win, eventNameOrNode, processWindowEvent, !0);\n                        events.add(eventNameOrNode);\n                    }\n                } else if (!roots.has(eventNameOrNode)) {\n                    events.forEach((eventName => addEventListener(eventNameOrNode, eventName, processDocumentEvent, !0)));\n                    roots.add(eventNameOrNode);\n                }\n            }\n        };\n        if (!(Q_CONTEXT in doc)) {\n            doc[Q_CONTEXT] = 0;\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && processEventOrNode(...qwikevents);\n            win.qwikevents = {\n                events: events,\n                roots: roots,\n                push: processEventOrNode\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})()';
function getQwikLoaderScript(opts = {}) {
  return opts.debug ? QWIK_LOADER_DEFAULT_DEBUG : QWIK_LOADER_DEFAULT_MINIFIED;
}
var QWIK_PREFETCH_MINIFIED = globalThis.QWIK_PREFETCH_MINIFIED;
var QWIK_PREFETCH_DEBUG = globalThis.QWIK_PREFETCH_DEBUG;
function getQwikPrefetchWorkerScript(opts = {}) {
  return opts.debug ? QWIK_PREFETCH_DEBUG : QWIK_PREFETCH_MINIFIED;
}

// packages/qwik/src/server/index.ts
async function setServerPlatform2(manifest) {
  const platform = createPlatform({ manifest }, resolveManifest(manifest));
  (0, import_qwik4.setPlatform)(platform);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getQwikLoaderScript,
  getQwikPrefetchWorkerScript,
  renderToStream,
  renderToString,
  resolveManifest,
  setServerPlatform,
  versions
});
return module.exports; })(typeof module === 'object' && module.exports ? module : { exports: {} });
