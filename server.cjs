/**
 * @license
 * @qwik.dev/core/server 2.0.0-0-dev+1deebe2
 * Copyright QwikDev. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
globalThis.qwikServer = (function (module) {

if (typeof require !== 'function' && typeof location !== 'undefined' && typeof navigator !== 'undefined') {
  // shim cjs require() for core.cjs within a browser
  globalThis.require = function(path) {
    if (path === './core.cjs' || path === '@qwik.dev/core') {
      if (!self.qwikCore) {
        throw new Error('Qwik Core global, "globalThis.qwikCore", must already be loaded for the Qwik Server to be used within a browser.');
      }
      return self.qwikCore;
    }
    if (path === '@qwik.dev/core/build') {
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
var import_core4 = require("@qwik.dev/core");

// packages/qwik/src/server/platform.ts
var import_core = require("@qwik.dev/core");
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
  (0, import_core.setPlatform)(platform);
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
var seal = (obj) => {
  if (qDev) {
    Object.seal(obj);
  }
};

// packages/qwik/src/core/shared/utils/log.ts
var STYLE = qDev ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;` : "";
var logError = (message, ...optionalParams) => {
  return createAndLogError(false, message, ...optionalParams);
};
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
var logWarn = (message, ...optionalParams) => {
  if (qDev) {
    console.warn("%cQWIK WARN", STYLE, message, ...optionalParams);
  }
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
      "Error while serializing class or style attributes",
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
var QError_verifySerializable = 3;
var QError_qrlIsNotFunction = 10;
var QError_qrlMissingContainer = 30;
var QError_qrlMissingChunk = 31;
var qError = (code, ...parts) => {
  const text = codeToText(code, ...parts);
  return logErrorAndStop(text, ...parts);
};

// packages/qwik/src/core/shared/utils/event-names.ts
var isJsxPropertyAnEventName = (name) => {
  return (name.startsWith("on") || name.startsWith("window:on") || name.startsWith("document:on")) && name.endsWith("$");
};
var isHtmlAttributeAnEventName = (name) => {
  return name.startsWith("on:") || name.startsWith("on-window:") || name.startsWith("on-document:");
};
var getEventNameFromJsxProp = (name) => {
  if (name.endsWith("$")) {
    let idx = -1;
    if (name.startsWith("on")) {
      idx = 2;
    } else if (name.startsWith("window:on")) {
      idx = 9;
    } else if (name.startsWith("document:on")) {
      idx = 11;
    }
    if (idx != -1) {
      const isCaseSensitive = isDashAt(name, idx) && !isDashAt(name, idx + 1);
      if (isCaseSensitive) {
        idx++;
      }
      let lastIdx = idx;
      let eventName = "";
      while (true) {
        idx = name.indexOf("-", lastIdx);
        const chunk = name.substring(
          lastIdx,
          idx === -1 ? name.length - 1 : idx
        );
        eventName += isCaseSensitive ? chunk : chunk.toLowerCase();
        if (idx == -1) {
          return eventName;
        }
        if (isDashAt(name, idx + 1)) {
          eventName += "-";
          idx++;
        } else {
          eventName += name.charAt(idx + 1).toUpperCase();
          idx++;
        }
        lastIdx = idx + 1;
      }
    }
  }
  return null;
};
var getEventNameScopeFromJsxProp = (name) => {
  const index = name.indexOf(":");
  return index !== -1 ? name.substring(0, index) : "";
};
var isDashAt = (name, idx) => name.charCodeAt(idx) === 45;
var convertEventNameFromJsxPropToHtmlAttr = (name) => {
  if (name.endsWith("$")) {
    let prefix = null;
    if (name.startsWith("on")) {
      prefix = "on:";
    } else if (name.startsWith("window:on")) {
      prefix = "on-window:";
    } else if (name.startsWith("document:on")) {
      prefix = "on-document:";
    }
    if (prefix !== null) {
      const eventName = getEventNameFromJsxProp(name);
      return prefix + fromCamelToKebabCase(eventName);
    }
  }
  return null;
};
var fromCamelToKebabCase = (text) => {
  return text.replace(/([A-Z-])/g, "-$1").toLowerCase();
};
function isPreventDefault(key) {
  return key.startsWith("preventdefault:");
}

// packages/qwik/src/core/shared/utils/scoped-styles.ts
function hasClassAttr(props) {
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key) && isClassAttr(key)) {
      return true;
    }
  }
  return false;
}
function isClassAttr(key) {
  return key === "class" || key === "className";
}
function convertScopedStyleIdsToArray(scopedStyleIds) {
  return (scopedStyleIds == null ? void 0 : scopedStyleIds.split(" ")) ?? null;
}
function convertStyleIdsToString(scopedStyleIds) {
  return Array.from(scopedStyleIds).join(" ");
}
var addComponentStylePrefix = (styleId) => {
  if (styleId) {
    let idx = 0;
    do {
      styleId = styleId.substring(0, idx) + styleContent(styleId.substring(idx));
    } while ((idx = styleId.indexOf(" ", idx) + 1) !== 0);
  }
  return styleId || null;
};

// packages/qwik/src/core/shared/utils/types.ts
var isSerializableObject = (v) => {
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === Array.prototype || proto === null;
};
var isObject = (v) => {
  return !!v && typeof v === "object";
};
var isArray = (v) => {
  return Array.isArray(v);
};
var isString = (v) => {
  return typeof v === "string";
};
var isFunction = (v) => {
  return typeof v === "function";
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
var import_build8 = require("@qwik.dev/core/build");

// packages/qwik/src/core/shared/error/assert.ts
var ASSERT_DISCLAIMER = "Internal assert, this is likely caused by a bug in Qwik: ";
function assertDefined(value, text, ...parts) {
  if (qDev) {
    if (value != null) {
      return;
    }
    throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
  }
}
function assertEqual(value1, value2, text, ...parts) {
  if (qDev) {
    if (value1 === value2) {
      return;
    }
    throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
  }
}
function assertTrue(value1, text, ...parts) {
  if (qDev) {
    if (value1 === true) {
      return;
    }
    throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
  }
}
function assertFalse(value1, text, ...parts) {
  if (qDev) {
    if (value1 === false) {
      return;
    }
    throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
  }
}

// packages/qwik/src/core/shared/platform/platform.ts
var import_build = require("@qwik.dev/core/build");
var createPlatform2 = () => {
  return {
    isServer: import_build.isServer,
    importSymbol(containerEl, url, symbolName) {
      var _a;
      if (import_build.isServer) {
        const hash2 = getSymbolHash2(symbolName);
        const regSym = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.get(hash2);
        if (regSym) {
          return regSym;
        }
      }
      if (!url) {
        throw qError(QError_qrlMissingChunk, symbolName);
      }
      if (!containerEl) {
        throw qError(QError_qrlMissingContainer, url, symbolName);
      }
      const urlDoc = toUrl(containerEl.ownerDocument, containerEl, url).toString();
      const urlCopy = new URL(urlDoc);
      urlCopy.hash = "";
      const importURL = urlCopy.href;
      return import(
        /* @vite-ignore */
        importURL
      ).then((mod) => {
        return mod[symbolName];
      });
    },
    raf: (fn) => {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve(fn());
        });
      });
    },
    nextTick: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    chunkForSymbol(symbolName, chunk) {
      return [symbolName, chunk ?? "_"];
    }
  };
};
var toUrl = (doc, containerEl, url) => {
  const baseURI = doc.baseURI;
  const base = new URL(containerEl.getAttribute("q:base") ?? baseURI, baseURI);
  return new URL(url, base);
};
var _platform = /* @__PURE__ */ createPlatform2();
var getPlatform = () => {
  return _platform;
};
var isServerPlatform = () => {
  if (qDynamicPlatform) {
    return _platform.isServer;
  }
  return false;
};

// packages/qwik/src/core/shared/utils/element.ts
var isNode = (value) => {
  return value && typeof value.nodeType === "number";
};

// packages/qwik/src/core/shared/utils/promises.ts
var isPromise = (value) => {
  return !!value && typeof value == "object" && typeof value.then === "function";
};
var safeCall = (call, thenFn, rejectFn) => {
  try {
    const result = call();
    if (isPromise(result)) {
      return result.then(thenFn, rejectFn);
    } else {
      return thenFn(result);
    }
  } catch (e) {
    return rejectFn(e);
  }
};
var maybeThen = (valueOrPromise, thenFn) => {
  return isPromise(valueOrPromise) ? valueOrPromise.then(thenFn, shouldNotError) : thenFn(valueOrPromise);
};
var maybeThenPassError = (valueOrPromise, thenFn) => {
  return isPromise(valueOrPromise) ? valueOrPromise.then(thenFn) : thenFn(valueOrPromise);
};
var shouldNotError = (reason) => {
  throwErrorAndStop("QWIK ERROR:", reason);
};
var delay = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

// packages/qwik/src/build/index.dev.ts
var isDev = true;

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
var ComponentStylesPrefixContent = "\u2B50\uFE0F";
var QSlot = "q:slot";
var QSlotParent = ":";
var QSlotRef = "q:sref";
var QSlotS = "q:s";
var QStyle = "q:style";
var QStyleSelector = "style[q\\:style]";
var QStyleSSelector = "style[q\\:sstyle]";
var QStylesAllSelector = QStyleSelector + "," + QStyleSSelector;
var QScopedStyle = "q:sstyle";
var QCtxAttr = "q:ctx";
var QSubscribers = "q:subs";
var QFuncsPrefix = "qFuncs_";
var getQFuncs = (document2, hash2) => {
  return document2[QFuncsPrefix + hash2] || [];
};
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
var HTML_NS = "http://www.w3.org/1999/xhtml";
var SVG_NS = "http://www.w3.org/2000/svg";
var MATH_NS = "http://www.w3.org/1998/Math/MathML";
var ResourceEvent = "qResource";
var RenderEvent = "qRender";
var TaskEvent = "qTask";
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
var FLUSH_COMMENT = "qkssr-f";
var STREAM_BLOCK_START_COMMENT = "qkssr-pu";
var STREAM_BLOCK_END_COMMENT = "qkssr-po";
var Q_PROPS_SEPARATOR = ":";
var dangerouslySetInnerHTML = "dangerouslySetInnerHTML";

// packages/qwik/src/core/use/use-locale.ts
var _locale = void 0;
function setLocale(locale) {
  _locale = locale;
}

// packages/qwik/src/core/client/vnode.ts
var import_build6 = require("@qwik.dev/core/build");

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
  qwik: "2.0.0-0-dev+1deebe2",
  qwikDom: "2.1.19"
};

// packages/qwik/src/server/prefetch-strategy.ts
var import_build2 = require("@qwik.dev/core/build");
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
  const url = import_build2.isDev ? bundleFileName : buildBase + bundleFileName;
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
var isQrl = (value) => {
  return typeof value === "function" && typeof value.getSymbol === "function";
};

// packages/qwik/src/core/shared/utils/flyweight.ts
var EMPTY_ARRAY = [];
var EMPTY_OBJ = {};
Object.freeze(EMPTY_ARRAY);
Object.freeze(EMPTY_OBJ);

// packages/qwik/src/core/ssr/ssr-render-jsx.ts
var import_build5 = require("@qwik.dev/core/build");

// packages/qwik/src/core/shared/jsx/slot.public.ts
var Slot = (props) => {
  return _jsxSorted(Virtual, null, { [QSlotS]: "" }, props.children, 0, props.name ?? "");
};

// packages/qwik/src/core/shared/jsx/utils.public.ts
var SkipRender = Symbol("skip render");
var SSRRaw = () => null;
var SSRComment = () => null;

// packages/qwik/src/core/signal/store.ts
var DEBUG = false;
var log = (...args) => console.log("STORE", ...args.map(qwikDebugToString));
var STORE_TARGET = Symbol("store.target");
var STORE_HANDLER = Symbol("store.handler");
var STORE_ARRAY_PROP = Symbol("store.array");
var getStoreHandler = (value) => {
  return value[STORE_HANDLER];
};
var getStoreTarget = (value) => {
  return (value == null ? void 0 : value[STORE_TARGET]) || null;
};
var unwrapStore = (value) => {
  return getStoreTarget(value) || value;
};
var isStore = (value) => {
  return STORE_TARGET in value;
};
function createStore(container, obj, flags) {
  return new Proxy(obj, new StoreHandler(flags, container || null));
}
var getOrCreateStore = (obj, flags, container) => {
  if (isSerializableObject(obj) && container) {
    let store = container.$storeProxyMap$.get(obj);
    if (!store) {
      store = createStore(container, obj, flags);
      container.$storeProxyMap$.set(obj, store);
    }
    return store;
  }
  return obj;
};
var StoreHandler = class {
  constructor($flags$, $container$) {
    this.$flags$ = $flags$;
    this.$container$ = $container$;
    this.$effects$ = null;
  }
  toString() {
    return "[Store]";
  }
  get(target, prop) {
    if (typeof prop === "symbol") {
      if (prop === STORE_TARGET) {
        return target;
      }
      if (prop === STORE_HANDLER) {
        return this;
      }
      return target[prop];
    }
    const ctx = tryGetInvokeContext();
    const value = target[prop];
    if (ctx) {
      if (this.$container$ === null) {
        if (!ctx.$container$) {
          return value;
        }
        this.$container$ = ctx.$container$;
      } else {
        assertTrue(
          !ctx.$container$ || ctx.$container$ === this.$container$,
          "Do not use signals across containers"
        );
      }
      const effectSubscriber = ctx.$effectSubscriber$;
      if (effectSubscriber) {
        addEffect(target, Array.isArray(target) ? STORE_ARRAY_PROP : prop, this, effectSubscriber);
      }
    }
    if (prop === "toString" && value === Object.prototype.toString) {
      return this.toString;
    }
    const flags = this.$flags$;
    if (flags & 1 /* RECURSIVE */ && typeof value === "object" && value !== null && !Object.isFrozen(value) && !isStore(value) && !Object.isFrozen(target)) {
      return getOrCreateStore(value, this.$flags$, this.$container$);
    }
    return value;
  }
  /** In the case of oldValue and value are the same, the effects are not triggered. */
  set(target, prop, value) {
    target = unwrapDeserializerProxy(target);
    if (typeof prop === "symbol") {
      target[prop] = value;
      return true;
    }
    const newValue = this.$flags$ & 1 /* RECURSIVE */ ? unwrapStore(value) : value;
    if (prop in target) {
      const oldValue = target[prop];
      if (newValue !== oldValue) {
        DEBUG && log("Store.set", oldValue, "->", newValue, pad("\n" + this.toString(), "  "));
        setNewValueAndTriggerEffects(prop, newValue, target, this);
      }
    } else {
      DEBUG && log("Store.set", "create property", newValue, pad("\n" + this.toString(), "  "));
      setNewValueAndTriggerEffects(prop, newValue, target, this);
    }
    return true;
  }
  deleteProperty(target, prop) {
    if (typeof prop != "string" || !delete target[prop]) {
      return false;
    }
    triggerEffects(this.$container$, this, getEffects(target, prop, this.$effects$));
    return true;
  }
  has(target, prop) {
    if (prop === STORE_TARGET) {
      return true;
    }
    return Object.prototype.hasOwnProperty.call(target, prop);
  }
  ownKeys(target) {
    const ctx = tryGetInvokeContext();
    const effectSubscriber = ctx == null ? void 0 : ctx.$effectSubscriber$;
    if (effectSubscriber) {
      addEffect(target, STORE_ARRAY_PROP, this, effectSubscriber);
    }
    return Reflect.ownKeys(target);
  }
  getOwnPropertyDescriptor(target, prop) {
    if (Array.isArray(target) || typeof prop === "symbol") {
      return Object.getOwnPropertyDescriptor(target, prop);
    }
    return {
      enumerable: true,
      configurable: true
    };
  }
};
function addEffect(target, prop, store, effectSubscriber) {
  const effectsMap = store.$effects$ ||= {};
  const effects = Object.prototype.hasOwnProperty.call(effectsMap, prop) && effectsMap[prop] || (effectsMap[prop] = []);
  ensureContainsEffect(effects, effectSubscriber);
  ensureContains(effectSubscriber, target);
  DEBUG && log("sub", pad("\n" + store.$effects$.toString(), "  "));
}
function setNewValueAndTriggerEffects(prop, value, target, currentStore) {
  target[prop] = value;
  triggerEffects(
    currentStore.$container$,
    currentStore,
    getEffects(target, prop, currentStore.$effects$)
  );
}
function getEffects(target, prop, storeEffects) {
  let effectsToTrigger = storeEffects ? Array.isArray(target) ? Object.values(storeEffects).flatMap((effects) => effects) : storeEffects[prop] : null;
  const storeArrayValue = storeEffects == null ? void 0 : storeEffects[STORE_ARRAY_PROP];
  if (storeArrayValue) {
    effectsToTrigger ||= [];
    effectsToTrigger.push(...storeArrayValue);
  }
  return effectsToTrigger;
}

// packages/qwik/src/core/signal/signal-subscriber.ts
var Subscriber = class {
  constructor() {
    this.$effectDependencies$ = null;
  }
};
function isSubscriber(value) {
  return value instanceof Subscriber || value instanceof WrappedSignal;
}
function clearVNodeEffectDependencies(value) {
  const effects = vnode_getProp(value, QSubscribers, null);
  if (!effects) {
    return;
  }
  for (let i = effects.length - 1; i >= 0; i--) {
    const subscriber = effects[i];
    const subscriptionRemoved = clearEffects(subscriber, value);
    if (subscriptionRemoved) {
      effects.splice(i, 1);
    }
  }
}
function clearSubscriberEffectDependencies(value) {
  if (value.$effectDependencies$) {
    for (let i = value.$effectDependencies$.length - 1; i >= 0; i--) {
      const subscriber = value.$effectDependencies$[i];
      const subscriptionRemoved = clearEffects(subscriber, value);
      if (subscriptionRemoved) {
        value.$effectDependencies$.splice(i, 1);
      }
    }
  }
}
function clearEffects(subscriber, value) {
  if (!isSignal(subscriber)) {
    return false;
  }
  const effectSubscriptions = subscriber.$effects$;
  if (!effectSubscriptions) {
    return false;
  }
  let subscriptionRemoved = false;
  for (let i = effectSubscriptions.length - 1; i >= 0; i--) {
    const effect = effectSubscriptions[i];
    if (effect[0 /* EFFECT */] === value) {
      effectSubscriptions.splice(i, 1);
      subscriptionRemoved = true;
    }
  }
  return subscriptionRemoved;
}

// packages/qwik/src/core/use/use-resource.ts
var _createResourceReturn = (opts) => {
  const resource = {
    __brand: "resource",
    value: void 0,
    loading: isServerPlatform() ? false : true,
    _resolved: void 0,
    _error: void 0,
    _state: "pending",
    _timeout: (opts == null ? void 0 : opts.timeout) ?? -1,
    _cache: 0
  };
  return resource;
};
var createResourceReturn = (container, opts, initialPromise) => {
  const result = _createResourceReturn(opts);
  result.value = initialPromise;
  return createStore(container, result, 1 /* RECURSIVE */);
};
var runResource = (task, container, host) => {
  task.$flags$ &= ~8 /* DIRTY */;
  cleanupTask(task);
  const iCtx = newInvokeContext(container.$locale$, host, void 0, ResourceEvent);
  iCtx.$container$ = container;
  const taskFn = task.$qrl$.getFn(iCtx, () => clearSubscriberEffectDependencies(task));
  const resource = task.$state$;
  assertDefined(
    resource,
    'useResource: when running a resource, "task.resource" must be a defined.',
    task
  );
  const track = (obj, prop) => {
    const ctx = newInvokeContext();
    ctx.$effectSubscriber$ = [task, ":" /* COMPONENT */];
    ctx.$container$ = container;
    return invoke(ctx, () => {
      if (isFunction(obj)) {
        return obj();
      }
      if (prop) {
        return obj[prop];
      } else if (isSignal(obj)) {
        return obj.value;
      } else {
        return obj;
      }
    });
  };
  const handleError = (reason) => container.handleError(reason, host);
  const cleanups = [];
  task.$destroy$ = noSerialize(() => {
    cleanups.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        handleError(err);
      }
    });
    done = true;
  });
  const resourceTarget = unwrapStore(resource);
  const opts = {
    track,
    cleanup(fn) {
      if (typeof fn === "function") {
        cleanups.push(fn);
      }
    },
    cache(policy) {
      let milliseconds = 0;
      if (policy === "immutable") {
        milliseconds = Infinity;
      } else {
        milliseconds = policy;
      }
      resource._cache = milliseconds;
    },
    previous: resourceTarget._resolved
  };
  let resolve;
  let reject;
  let done = false;
  const setState = (resolved, value) => {
    if (!done) {
      done = true;
      if (resolved) {
        done = true;
        resource.loading = false;
        resource._state = "resolved";
        resource._resolved = value;
        resource._error = void 0;
        resolve(value);
      } else {
        done = true;
        resource.loading = false;
        resource._state = "rejected";
        resource._error = value;
        reject(value);
      }
      return true;
    }
    return false;
  };
  cleanups.push(() => {
    if (untrack(() => resource.loading) === true) {
      const value = untrack(() => resource._resolved);
      setState(true, value);
    }
  });
  invoke(iCtx, () => {
    resource._state = "pending";
    resource.loading = !isServerPlatform();
    const promise2 = resource.value = new Promise((r, re) => {
      resolve = r;
      reject = re;
    });
    promise2.catch(ignoreErrorToPreventNodeFromCrashing);
  });
  const promise = safeCall(
    () => Promise.resolve(taskFn(opts)),
    (value) => {
      setState(true, value);
    },
    (err) => {
      if (isPromise(err)) {
        return err.then(() => runResource(task, container, host));
      } else {
        setState(false, err);
      }
    }
  );
  const timeout = resourceTarget._timeout;
  if (timeout > 0) {
    return Promise.race([
      promise,
      delay(timeout).then(() => {
        if (setState(false, new Error("timeout"))) {
          cleanupTask(task);
        }
      })
    ]);
  }
  return promise;
};
var ignoreErrorToPreventNodeFromCrashing = (err) => {
};

// packages/qwik/src/core/client/vnode-diff.ts
var import_build4 = require("@qwik.dev/core/build");

// packages/qwik/src/core/client/vnode-namespace.ts
var isForeignObjectElement = (elementName) => elementName.toLowerCase() === "foreignobject";
var isSvgElement = (elementName) => elementName === "svg" || isForeignObjectElement(elementName);
var isMathElement = (elementName) => elementName === "math";
var vnode_isDefaultNamespace = (vnode) => {
  const flags = vnode[0 /* flags */];
  return (flags & 192 /* NAMESPACE_MASK */) === 0;
};
var vnode_getElementNamespaceFlags = (elementName) => {
  if (isSvgElement(elementName)) {
    return 64 /* NS_svg */;
  } else if (isMathElement(elementName)) {
    return 128 /* NS_math */;
  } else {
    return 0 /* NS_html */;
  }
};
function vnode_getDomChildrenWithCorrectNamespacesToInsert(journal, domParentVNode, newChild) {
  const { elementNamespace, elementNamespaceFlag } = getNewElementNamespaceData(
    domParentVNode,
    newChild
  );
  let domChildren = [];
  if (elementNamespace === HTML_NS) {
    domChildren = vnode_getDOMChildNodes(journal, newChild);
  } else {
    const children = vnode_getDOMChildNodes(journal, newChild, true);
    for (let i = 0; i < children.length; i++) {
      const childVNode = children[i];
      if (vnode_isTextVNode(childVNode)) {
        domChildren.push(childVNode[4 /* node */]);
        continue;
      }
      if ((childVNode[0 /* flags */] & 192 /* NAMESPACE_MASK */) === (domParentVNode[0 /* flags */] & 192 /* NAMESPACE_MASK */)) {
        domChildren.push(childVNode[6 /* element */]);
        continue;
      }
      const newChildElement = vnode_cloneElementWithNamespace(
        childVNode,
        domParentVNode,
        elementNamespace,
        elementNamespaceFlag
      );
      if (newChildElement) {
        domChildren.push(newChildElement);
      }
    }
  }
  return domChildren;
}
function cloneElementWithNamespace(element, elementName, namespace) {
  const newElement = element.ownerDocument.createElementNS(namespace, elementName);
  const attributes = element.attributes;
  for (const attribute of attributes) {
    const name = attribute.name;
    const value = attribute.value;
    if (!name || name === Q_PROPS_SEPARATOR) {
      continue;
    }
    newElement.setAttribute(name, value);
  }
  return newElement;
}
function vnode_cloneElementWithNamespace(elementVNode, parentVNode, namespace, namespaceFlag) {
  ensureElementVNode(elementVNode);
  let vCursor = elementVNode;
  let vParent = null;
  let rootElement = null;
  let parentElement = null;
  while (vCursor) {
    let childElement = null;
    let newChildElement = null;
    if (vnode_isElementVNode(vCursor)) {
      childElement = vCursor[6 /* element */];
      const childElementTag = vnode_getElementName(vCursor);
      const vCursorParent = vnode_getParent(vCursor);
      const vCursorDomParent = rootElement == null ? parentVNode : vCursorParent && vnode_getDomParentVNode(vCursorParent);
      if (vCursorDomParent) {
        const namespaceData = getNewElementNamespaceData(
          vCursorDomParent,
          vnode_getElementName(vCursor)
        );
        namespace = namespaceData.elementNamespace;
        namespaceFlag = namespaceData.elementNamespaceFlag;
      }
      newChildElement = cloneElementWithNamespace(childElement, childElementTag, namespace);
      childElement.remove();
      if (rootElement == null) {
        rootElement = newChildElement;
      }
      if (parentElement) {
        parentElement.appendChild(newChildElement);
      }
      const vFirstChild = vnode_getFirstChild(vCursor);
      vCursor[6 /* element */] = newChildElement;
      vCursor[0 /* flags */] &= -193 /* NEGATED_NAMESPACE_MASK */;
      vCursor[0 /* flags */] |= namespaceFlag;
      if (vFirstChild) {
        vCursor = vFirstChild;
        parentElement = newChildElement;
        continue;
      } else if (shouldIgnoreChildren(childElement)) {
        const container = getDomContainerFromQContainerElement(childElement);
        if (container) {
          const innerContainerFirstVNode = vnode_getFirstChild(container.rootVNode);
          if (innerContainerFirstVNode) {
            vCursor = innerContainerFirstVNode;
            parentElement = newChildElement;
            continue;
          }
        }
      }
    }
    if (vCursor === elementVNode) {
      return rootElement;
    }
    const vNextSibling = vnode_getNextSibling(vCursor);
    if (vNextSibling) {
      vCursor = vNextSibling;
      continue;
    }
    vParent = vnode_getParent(vCursor);
    while (vParent) {
      if (vParent === elementVNode) {
        return rootElement;
      }
      const vNextParentSibling = vnode_getNextSibling(vParent);
      if (vNextParentSibling) {
        vCursor = vNextParentSibling;
        return rootElement;
      }
      vParent = vnode_getParent(vParent);
    }
    if (vParent == null) {
      return rootElement;
    }
  }
  return rootElement;
}
function isSvg(tagOrVNode) {
  return typeof tagOrVNode === "string" ? isSvgElement(tagOrVNode) : (tagOrVNode[0 /* flags */] & 64 /* NS_svg */) !== 0;
}
function isMath(tagOrVNode) {
  return typeof tagOrVNode === "string" ? isMathElement(tagOrVNode) : (tagOrVNode[0 /* flags */] & 128 /* NS_math */) !== 0;
}
function getNewElementNamespaceData(domParentVNode, tagOrVNode) {
  const parentIsDefaultNamespace = domParentVNode ? !!vnode_getElementName(domParentVNode) && vnode_isDefaultNamespace(domParentVNode) : true;
  const parentIsForeignObject = !parentIsDefaultNamespace ? isForeignObjectElement(vnode_getElementName(domParentVNode)) : false;
  let elementNamespace = HTML_NS;
  let elementNamespaceFlag = 0 /* NS_html */;
  const isElementVNodeOrString = typeof tagOrVNode === "string" || vnode_isElementVNode(tagOrVNode);
  if (isElementVNodeOrString && isSvg(tagOrVNode)) {
    elementNamespace = SVG_NS;
    elementNamespaceFlag = 64 /* NS_svg */;
  } else if (isElementVNodeOrString && isMath(tagOrVNode)) {
    elementNamespace = MATH_NS;
    elementNamespaceFlag = 128 /* NS_math */;
  } else if (domParentVNode && !parentIsForeignObject && !parentIsDefaultNamespace) {
    const isParentSvg = (domParentVNode[0 /* flags */] & 64 /* NS_svg */) !== 0;
    const isParentMath = (domParentVNode[0 /* flags */] & 128 /* NS_math */) !== 0;
    elementNamespace = isParentSvg ? SVG_NS : isParentMath ? MATH_NS : HTML_NS;
    elementNamespaceFlag = domParentVNode[0 /* flags */] & 192 /* NAMESPACE_MASK */;
  }
  return {
    elementNamespace,
    elementNamespaceFlag
  };
}

// packages/qwik/src/core/shared/component-execution.ts
var import_build3 = require("@qwik.dev/core/build");
var executeComponent = (container, renderHost, subscriptionHost, componentQRL, props) => {
  const iCtx = newInvokeContext(container.$locale$, subscriptionHost, void 0, RenderEvent);
  iCtx.$effectSubscriber$ = [subscriptionHost, ":" /* COMPONENT */];
  iCtx.$container$ = container;
  let componentFn;
  container.ensureProjectionResolved(renderHost);
  if (componentQRL === null) {
    componentQRL = componentQRL || container.getHostProp(renderHost, OnRenderProp);
    assertDefined(componentQRL, "No Component found at this location");
  }
  if (isQrl2(componentQRL)) {
    props = props || container.getHostProp(renderHost, ELEMENT_PROPS) || EMPTY_OBJ;
    if (props && props.children) {
      delete props.children;
    }
    componentFn = componentQRL.getFn(iCtx);
  } else if (isQwikComponent(componentQRL)) {
    const qComponentFn = componentQRL;
    componentFn = () => invokeApply(iCtx, qComponentFn, [props || EMPTY_OBJ, null, 0]);
  } else {
    const inlineComponent = componentQRL;
    componentFn = () => invokeApply(iCtx, inlineComponent, [props || EMPTY_OBJ]);
  }
  const executeComponentWithPromiseExceptionRetry = () => safeCall(
    () => {
      container.setHostProp(renderHost, ELEMENT_SEQ_IDX, null);
      container.setHostProp(renderHost, USE_ON_LOCAL_SEQ_IDX, null);
      container.setHostProp(renderHost, ELEMENT_PROPS, props);
      if (vnode_isVNode(renderHost)) {
        clearVNodeEffectDependencies(renderHost);
      }
      return componentFn(props);
    },
    (jsx2) => {
      const useOnEvents = container.getHostProp(renderHost, USE_ON_LOCAL);
      if (useOnEvents) {
        return maybeThen(addUseOnEvents(jsx2, useOnEvents), () => jsx2);
      }
      return jsx2;
    },
    (err) => {
      if (isPromise(err)) {
        return err.then(executeComponentWithPromiseExceptionRetry);
      } else {
        throw err;
      }
    }
  );
  return executeComponentWithPromiseExceptionRetry();
};
function addUseOnEvents(jsx2, useOnEvents) {
  const jsxElement = findFirstStringJSX(jsx2);
  return maybeThen(jsxElement, (jsxElement2) => {
    let isInvisibleComponent = false;
    if (!jsxElement2) {
      isInvisibleComponent = true;
    }
    for (const key in useOnEvents) {
      if (Object.prototype.hasOwnProperty.call(useOnEvents, key)) {
        if (isInvisibleComponent) {
          if (key === "onQvisible$") {
            jsxElement2 = addScriptNodeForInvisibleComponents(jsx2);
            if (jsxElement2) {
              addUseOnEvent(jsxElement2, "document:onQinit$", useOnEvents[key]);
            }
          } else if (key.startsWith("document:") || key.startsWith("window:")) {
            jsxElement2 = addScriptNodeForInvisibleComponents(jsx2);
            if (jsxElement2) {
              addUseOnEvent(jsxElement2, key, useOnEvents[key]);
            }
          } else if (import_build3.isDev) {
            logWarn(
              'You are trying to add an event "' + key + '" using `useOn` hook, but a node to which you can add an event is not found. Please make sure that the component has a valid element node. '
            );
          }
        } else if (jsxElement2) {
          addUseOnEvent(jsxElement2, key, useOnEvents[key]);
        }
      }
    }
    return jsxElement2;
  });
}
function addUseOnEvent(jsxElement, key, value) {
  let props = jsxElement.props;
  if (props === EMPTY_OBJ) {
    props = jsxElement.props = {};
  }
  let propValue = props[key];
  if (propValue === void 0) {
    propValue = [];
  } else if (!Array.isArray(propValue)) {
    propValue = [propValue];
  }
  propValue.push(...value);
  props[key] = propValue;
}
function findFirstStringJSX(jsx2) {
  const queue = [jsx2];
  while (queue.length) {
    const jsx3 = queue.shift();
    if (isJSXNode(jsx3)) {
      if (typeof jsx3.type === "string") {
        return jsx3;
      }
      queue.push(jsx3.children);
    } else if (Array.isArray(jsx3)) {
      queue.push(...jsx3);
    } else if (isPromise(jsx3)) {
      return maybeThen(jsx3, (jsx4) => findFirstStringJSX(jsx4));
    } else if (isSignal(jsx3)) {
      return findFirstStringJSX(untrack(() => jsx3.value));
    }
  }
  return null;
}
function addScriptNodeForInvisibleComponents(jsx2) {
  if (isJSXNode(jsx2)) {
    const jsxElement = new JSXNodeImpl(
      "script",
      {},
      {
        type: "placeholder",
        hidden: ""
      },
      null,
      3
    );
    if (jsx2.children == null) {
      jsx2.children = jsxElement;
    } else if (Array.isArray(jsx2.children)) {
      jsx2.children.push(jsxElement);
    } else {
      jsx2.children = [jsx2.children, jsxElement];
    }
    return jsxElement;
  } else if (Array.isArray(jsx2) && jsx2.length) {
    return addScriptNodeForInvisibleComponents(jsx2[0]);
  }
  return null;
}

// packages/qwik/src/core/shared/utils/prop.ts
function isSlotProp(prop) {
  return !prop.startsWith("q:") && !prop.startsWith(NON_SERIALIZABLE_MARKER_PREFIX);
}
function isParentSlotProp(prop) {
  return prop.startsWith(QSlotParent);
}

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

// packages/qwik/src/core/client/vnode-diff.ts
var vnode_diff = (container, jsxNode, vStartNode, scopedStyleIdPrefix) => {
  let journal = container.$journal$;
  const stack2 = [];
  const asyncQueue = [];
  let vParent = null;
  let vCurrent = null;
  let vNewNode = null;
  let vSiblings = null;
  let vSiblingsIdx = -1;
  let jsxChildren = null;
  let jsxValue = null;
  let jsxIdx = 0;
  let jsxCount = 0;
  let shouldAdvance = true;
  diff(jsxNode, vStartNode);
  return drainAsyncQueue();
  function diff(jsxNode2, vStartNode2) {
    assertFalse(vnode_isVNode(jsxNode2), "JSXNode should not be a VNode");
    assertTrue(vnode_isVNode(vStartNode2), "vStartNode should be a VNode");
    vParent = vStartNode2;
    vNewNode = null;
    vCurrent = vnode_getFirstChild(vStartNode2);
    stackPush(jsxNode2, true);
    while (stack2.length) {
      while (jsxIdx < jsxCount) {
        assertFalse(vParent === vCurrent, "Parent and current can't be the same");
        if (typeof jsxValue === "string") {
          expectText(jsxValue);
        } else if (typeof jsxValue === "number") {
          expectText(String(jsxValue));
        } else if (jsxValue && typeof jsxValue === "object") {
          if (Array.isArray(jsxValue)) {
            descend(jsxValue, false);
          } else if (isSignal(jsxValue)) {
            if (vCurrent) {
              clearVNodeEffectDependencies(vCurrent);
            }
            expectVirtual("S" /* WrappedSignal */, null);
            descend(
              trackSignal(
                () => jsxValue.value,
                vNewNode || vCurrent,
                "." /* VNODE */,
                container
              ),
              true
            );
          } else if (isPromise(jsxValue)) {
            expectVirtual("A" /* Awaited */, null);
            asyncQueue.push(jsxValue, vNewNode || vCurrent);
          } else if (isJSXNode(jsxValue)) {
            const type = jsxValue.type;
            if (typeof type === "string") {
              expectNoMoreTextNodes();
              expectElement(jsxValue, type);
              descend(jsxValue.children, true);
            } else if (typeof type === "function") {
              if (type === Fragment) {
                expectNoMoreTextNodes();
                expectVirtual("F" /* Fragment */, jsxValue.key);
                descend(jsxValue.children, true);
              } else if (type === Slot) {
                expectNoMoreTextNodes();
                if (!expectSlot()) {
                  descend(jsxValue.children, true);
                }
              } else if (type === Projection) {
                expectProjection();
                descend(jsxValue.children, true);
              } else if (type === SSRComment) {
                expectNoMore();
              } else if (type === SSRRaw) {
                expectNoMore();
              } else {
                expectNoMoreTextNodes();
                expectComponent(type);
              }
            }
          }
        } else if (jsxValue === SkipRender) {
          journal = [];
        } else {
          expectText("");
        }
        advance();
      }
      expectNoMore();
      ascend();
    }
  }
  function advance() {
    if (!shouldAdvance) {
      shouldAdvance = true;
      return;
    }
    jsxIdx++;
    if (jsxIdx < jsxCount) {
      jsxValue = jsxChildren[jsxIdx];
    } else if (stack2[stack2.length - 1] === false) {
      return ascend();
    }
    if (vNewNode !== null) {
      vNewNode = null;
    } else {
      advanceToNextSibling();
    }
  }
  function peekNextSibling() {
    if (vSiblings !== null) {
      const idx = vSiblingsIdx + 5 /* NextVNode */;
      return idx < vSiblings.length ? vSiblings[idx] : null;
    } else {
      return vCurrent ? vnode_getNextSibling(vCurrent) : null;
    }
  }
  function advanceToNextSibling() {
    vCurrent = peekNextSibling();
    if (vSiblings !== null) {
      vSiblingsIdx += 3 /* Size */;
    }
  }
  function descend(children, descendVNode) {
    if (children == null) {
      expectNoChildren();
      return;
    }
    stackPush(children, descendVNode);
    if (descendVNode) {
      assertDefined(vCurrent || vNewNode, "Expecting vCurrent to be defined.");
      vSiblings = null;
      vSiblingsIdx = -1;
      vParent = vNewNode || vCurrent;
      vCurrent = vnode_getFirstChild(vParent);
      vNewNode = null;
    }
    shouldAdvance = false;
  }
  function ascend() {
    const descendVNode = stack2.pop();
    if (descendVNode) {
      vSiblingsIdx = stack2.pop();
      vSiblings = stack2.pop();
      vNewNode = stack2.pop();
      vCurrent = stack2.pop();
      vParent = stack2.pop();
    }
    jsxValue = stack2.pop();
    jsxCount = stack2.pop();
    jsxIdx = stack2.pop();
    jsxChildren = stack2.pop();
    advance();
  }
  function stackPush(children, descendVNode) {
    stack2.push(jsxChildren, jsxIdx, jsxCount, jsxValue);
    if (descendVNode) {
      stack2.push(vParent, vCurrent, vNewNode, vSiblings, vSiblingsIdx);
    }
    stack2.push(descendVNode);
    if (Array.isArray(children)) {
      jsxIdx = 0;
      jsxCount = children.length;
      jsxChildren = children;
      jsxValue = jsxCount > 0 ? children[0] : null;
    } else if (children === void 0) {
      jsxIdx = 0;
      jsxValue = null;
      jsxChildren = null;
      jsxCount = 0;
    } else {
      jsxIdx = 0;
      jsxValue = children;
      jsxChildren = null;
      jsxCount = 1;
    }
  }
  function getInsertBefore() {
    if (vNewNode) {
      return vCurrent;
    } else if (vSiblings !== null) {
      const nextIdx = vSiblingsIdx + 5 /* NextVNode */;
      return nextIdx < vSiblings.length ? vSiblings[nextIdx] : null;
    } else {
      return peekNextSibling();
    }
  }
  function descendContentToProject(children, host) {
    if (!Array.isArray(children)) {
      children = [children];
    }
    if (children.length) {
      const createProjectionJSXNode = (slotName) => {
        return new JSXNodeImpl(Projection, EMPTY_OBJ, null, [], 0, slotName);
      };
      const projections = [];
      if (host) {
        for (let i = vnode_getPropStartIndex(host); i < host.length; i = i + 2) {
          const prop = host[i];
          if (isSlotProp(prop)) {
            const slotName = prop;
            projections.push(slotName);
            projections.push(createProjectionJSXNode(slotName));
          }
        }
      }
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const slotName = String(
          isJSXNode(child) && directGetPropsProxyProp(child, QSlot) || QDefaultSlot
        );
        const idx = mapApp_findIndx(projections, slotName, 0);
        let jsxBucket;
        if (idx >= 0) {
          jsxBucket = projections[idx + 1];
        } else {
          projections.splice(~idx, 0, slotName, jsxBucket = createProjectionJSXNode(slotName));
        }
        const removeProjection = child === false;
        if (!removeProjection) {
          jsxBucket.children.push(child);
        }
      }
      for (let i = projections.length - 2; i >= 0; i = i - 2) {
        projections.splice(i, 1);
      }
      descend(projections, true);
    }
  }
  function expectProjection() {
    const slotName = jsxValue.key;
    vCurrent = vnode_getProp(
      vParent,
      // The parent is the component and it should have our portal.
      slotName,
      (id) => vnode_locate(container.rootVNode, id)
    );
    if (vCurrent == null) {
      vNewNode = vnode_newVirtual();
      import_build4.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, "P" /* Projection */);
      import_build4.isDev && vnode_setProp(vNewNode, "q:code", "expectProjection");
      vnode_setProp(vNewNode, QSlot, slotName);
      vnode_setProp(vNewNode, QSlotParent, vParent);
      vnode_setProp(vParent, slotName, vNewNode);
    }
  }
  function expectSlot() {
    const vHost = vnode_getProjectionParentComponent(vParent, container.rootVNode);
    const slotNameKey = getSlotNameKey(vHost);
    const vProjectedNode = vHost ? vnode_getProp(
      vHost,
      slotNameKey,
      // for slots this id is vnode ref id
      null
      // Projections should have been resolved through container.ensureProjectionResolved
      //(id) => vnode_locate(container.rootVNode, id)
    ) : null;
    if (vProjectedNode == null) {
      vnode_insertBefore(
        journal,
        vParent,
        vNewNode = vnode_newVirtual(),
        vCurrent && getInsertBefore()
      );
      vnode_setProp(vNewNode, QSlot, slotNameKey);
      vHost && vnode_setProp(vHost, slotNameKey, vNewNode);
      import_build4.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, "P" /* Projection */);
      import_build4.isDev && vnode_setProp(vNewNode, "q:code", "expectSlot" + count++);
      return false;
    } else if (vProjectedNode === vCurrent) {
    } else {
      vnode_insertBefore(
        journal,
        vParent,
        vNewNode = vProjectedNode,
        vCurrent && getInsertBefore()
      );
      vnode_setProp(vNewNode, QSlot, slotNameKey);
      vHost && vnode_setProp(vHost, slotNameKey, vNewNode);
      import_build4.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, "P" /* Projection */);
      import_build4.isDev && vnode_setProp(vNewNode, "q:code", "expectSlot" + count++);
    }
    return true;
  }
  function getSlotNameKey(vHost) {
    const constProps = jsxValue.constProps;
    if (constProps && typeof constProps == "object" && "name" in constProps) {
      const constValue = constProps.name;
      if (vHost && constValue instanceof WrappedSignal) {
        return trackSignal(() => constValue.value, vHost, ":" /* COMPONENT */, container);
      }
    }
    return directGetPropsProxyProp(jsxValue, "name") || QDefaultSlot;
  }
  function drainAsyncQueue() {
    while (asyncQueue.length) {
      const jsxNode2 = asyncQueue.shift();
      const vHostNode = asyncQueue.shift();
      if (isPromise(jsxNode2)) {
        return jsxNode2.then((jsxNode3) => {
          diff(jsxNode3, vHostNode);
          return drainAsyncQueue();
        });
      } else {
        diff(jsxNode2, vHostNode);
      }
    }
  }
  function expectNoChildren() {
    const vFirstChild = vCurrent && vnode_getFirstChild(vCurrent);
    if (vFirstChild !== null) {
      let vChild = vFirstChild;
      while (vChild) {
        cleanup(container, vChild);
        vChild = vnode_getNextSibling(vChild);
      }
      vnode_truncate(journal, vCurrent, vFirstChild);
    }
  }
  function expectNoMore() {
    assertFalse(vParent === vCurrent, "Parent and current can't be the same");
    if (vCurrent !== null) {
      while (vCurrent) {
        const toRemove = vCurrent;
        advanceToNextSibling();
        cleanup(container, toRemove);
        if (vParent === vnode_getParent(toRemove)) {
          vnode_remove(journal, vParent, toRemove, true);
        }
      }
    }
  }
  function expectNoMoreTextNodes() {
    while (vCurrent !== null && vnode_isTextVNode(vCurrent)) {
      cleanup(container, vCurrent);
      const toRemove = vCurrent;
      advanceToNextSibling();
      vnode_remove(journal, vParent, toRemove, true);
    }
  }
  function createNewElement(jsx2, elementName) {
    const element = createElementWithNamespace(elementName);
    const { constProps } = jsx2;
    let needsQDispatchEventPatch = false;
    if (constProps) {
      for (const key2 in constProps) {
        let value = constProps[key2];
        if (isJsxPropertyAnEventName(key2)) {
          const eventName = getEventNameFromJsxProp(key2);
          const scope = getEventNameScopeFromJsxProp(key2);
          vnode_setProp(
            vNewNode,
            HANDLER_PREFIX + ":" + scope + ":" + eventName,
            value
          );
          if (eventName) {
            registerQwikLoaderEvent(eventName);
          }
          needsQDispatchEventPatch = true;
          continue;
        }
        if (key2 === "ref") {
          if (isSignal(value)) {
            value.value = element;
            continue;
          } else if (typeof value === "function") {
            value(element);
            continue;
          }
        }
        if (isSignal(value)) {
          const signalData = new EffectData({
            $scopedStyleIdPrefix$: scopedStyleIdPrefix,
            $isConst$: true
          });
          value = trackSignal(
            () => value.value,
            vNewNode,
            key2,
            container,
            signalData
          );
        }
        if (key2 === dangerouslySetInnerHTML) {
          element.innerHTML = value;
          element.setAttribute(QContainerAttr, "html" /* HTML */);
          continue;
        }
        if (elementName === "textarea" && key2 === "value") {
          if (typeof value !== "string") {
            if (import_build4.isDev) {
              throwErrorAndStop("The value of the textarea must be a string");
            }
            continue;
          }
          element.value = escapeHTML(value);
          continue;
        }
        value = serializeAttribute(key2, value, scopedStyleIdPrefix);
        if (value != null) {
          element.setAttribute(key2, String(value));
        }
      }
    }
    const key = jsx2.key;
    if (key) {
      element.setAttribute(ELEMENT_KEY, key);
      vnode_setProp(vNewNode, ELEMENT_KEY, key);
    }
    const classAttributeExists = hasClassAttr(jsx2.varProps) || jsx2.constProps && hasClassAttr(jsx2.constProps);
    if (!classAttributeExists && scopedStyleIdPrefix) {
      element.setAttribute("class", scopedStyleIdPrefix);
    }
    vnode_insertBefore(journal, vParent, vNewNode, vCurrent);
    return needsQDispatchEventPatch;
  }
  function createElementWithNamespace(elementName) {
    const domParentVNode = vnode_getDomParentVNode(vParent);
    const { elementNamespace, elementNamespaceFlag } = getNewElementNamespaceData(
      domParentVNode,
      elementName
    );
    const element = container.document.createElementNS(elementNamespace, elementName);
    vNewNode = vnode_newElement(element, elementName);
    vNewNode[0 /* flags */] |= elementNamespaceFlag;
    return element;
  }
  function expectElement(jsx2, elementName) {
    const isSameElementName = vCurrent && vnode_isElementVNode(vCurrent) && elementName === vnode_getElementName(vCurrent);
    const jsxKey = jsx2.key;
    let needsQDispatchEventPatch = false;
    if (!isSameElementName || jsxKey !== getKey(vCurrent)) {
      vNewNode = retrieveChildWithKey(elementName, jsxKey);
      if (vNewNode === null) {
        needsQDispatchEventPatch = createNewElement(jsx2, elementName);
      } else {
        vnode_insertBefore(journal, vParent, vNewNode, vCurrent);
      }
    }
    const jsxAttrs = [];
    const props = jsx2.varProps;
    for (const key in props) {
      let value = props[key];
      value = serializeAttribute(key, value, scopedStyleIdPrefix);
      if (value != null) {
        mapArray_set(jsxAttrs, key, value, 0);
      }
    }
    if (jsxKey !== null) {
      mapArray_set(jsxAttrs, ELEMENT_KEY, jsxKey, 0);
    }
    const vNode = vNewNode || vCurrent;
    needsQDispatchEventPatch = setBulkProps(vNode, jsxAttrs) || needsQDispatchEventPatch;
    if (needsQDispatchEventPatch) {
      const element = vnode_getNode(vNode);
      if (!element.qDispatchEvent) {
        element.qDispatchEvent = (event, scope) => {
          const eventName = event.type;
          const eventProp = ":" + scope.substring(1) + ":" + eventName;
          const qrls = [
            vnode_getProp(vNode, eventProp, null),
            vnode_getProp(vNode, HANDLER_PREFIX + eventProp, null)
          ];
          let returnValue = false;
          qrls.flat(2).forEach((qrl) => {
            if (qrl) {
              const value = qrl(event, element);
              returnValue = returnValue || value === true;
            }
          });
          return returnValue;
        };
      }
    }
  }
  function setBulkProps(vnode, srcAttrs) {
    vnode_ensureElementInflated(vnode);
    const dstAttrs = vnode;
    let srcIdx = 0;
    const srcLength = srcAttrs.length;
    let dstIdx = 8 /* PROPS_OFFSET */;
    let dstLength = dstAttrs.length;
    let srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
    let dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
    let patchEventDispatch = false;
    const record = (key, value) => {
      if (key.startsWith(":")) {
        vnode_setProp(vnode, key, value);
        return;
      }
      if (key === "ref") {
        const element = vnode_getNode(vnode);
        if (isSignal(value)) {
          value.value = element;
          return;
        } else if (typeof value === "function") {
          value(element);
          return;
        }
      }
      if (isSignal(value)) {
        value = untrack(() => value.value);
      }
      vnode_setAttr(journal, vnode, key, value);
      if (value === null) {
        dstLength = dstAttrs.length;
      }
    };
    const recordJsxEvent = (key, value) => {
      const eventName = getEventNameFromJsxProp(key);
      if (eventName) {
        const scope = getEventNameScopeFromJsxProp(key);
        record(":" + scope + ":" + eventName, value);
      }
      const htmlEvent = convertEventNameFromJsxPropToHtmlAttr(key);
      if (htmlEvent) {
        record(htmlEvent, "");
      }
      if (eventName) {
        registerQwikLoaderEvent(eventName);
      }
    };
    while (srcKey !== null || dstKey !== null) {
      if ((dstKey == null ? void 0 : dstKey.startsWith(HANDLER_PREFIX)) || dstKey == ELEMENT_KEY) {
        dstIdx++;
        dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
      } else if (srcKey == null) {
        if (dstKey && isHtmlAttributeAnEventName(dstKey)) {
          patchEventDispatch = true;
          dstIdx++;
        } else {
          record(dstKey, null);
          dstIdx--;
        }
        dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
      } else if (dstKey == null) {
        const isEvent = isJsxPropertyAnEventName(srcKey);
        if (isEvent) {
          patchEventDispatch = true;
          recordJsxEvent(srcKey, srcAttrs[srcIdx]);
        } else {
          record(srcKey, srcAttrs[srcIdx]);
        }
        srcIdx++;
        srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
      } else if (srcKey == dstKey) {
        const srcValue = srcAttrs[srcIdx++];
        const dstValue = dstAttrs[dstIdx++];
        if (srcValue !== dstValue) {
          record(dstKey, srcValue);
        }
        srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
        dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
      } else if (srcKey < dstKey) {
        if (isJsxPropertyAnEventName(srcKey)) {
          patchEventDispatch = true;
          recordJsxEvent(srcKey, srcAttrs[srcIdx]);
        } else {
          record(srcKey, srcAttrs[srcIdx]);
        }
        srcIdx++;
        srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
        dstIdx++;
        dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
      } else {
        if (isHtmlAttributeAnEventName(dstKey)) {
          patchEventDispatch = true;
          dstIdx++;
        } else {
          record(dstKey, null);
          dstIdx--;
        }
        dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
      }
    }
    return patchEventDispatch;
  }
  function registerQwikLoaderEvent(eventName) {
    const window2 = container.document.defaultView;
    if (window2) {
      (window2.qwikevents ||= []).push(eventName);
    }
  }
  function retrieveChildWithKey(nodeName, key) {
    let vNodeWithKey = null;
    if (vSiblingsIdx === -1) {
      vSiblings = [];
      vSiblingsIdx = 0;
      let vNode = vCurrent;
      while (vNode) {
        const name = vnode_isElementVNode(vNode) ? vnode_getElementName(vNode) : null;
        const vKey = getKey(vNode) || getComponentHash(vNode, container.$getObjectById$);
        if (vNodeWithKey === null && vKey == key && name == nodeName) {
          vNodeWithKey = vNode;
        } else {
          vSiblings.push(name, vKey, vNode);
        }
        vNode = vnode_getNextSibling(vNode);
      }
    } else {
      for (let idx = vSiblingsIdx; idx < vSiblings.length; idx += 3 /* Size */) {
        const name = vSiblings[idx + 0 /* Name */];
        const vKey = vSiblings[idx + 1 /* Key */];
        if (vKey === key && name === nodeName) {
          vNodeWithKey = vSiblings[idx + 2 /* VNode */];
          vSiblings == null ? void 0 : vSiblings.splice(idx, 3 /* Size */);
          break;
        }
      }
    }
    return vNodeWithKey;
  }
  function expectVirtual(type, jsxKey) {
    if (vCurrent && vnode_isVirtualVNode(vCurrent) && vnode_getProp(vCurrent, ELEMENT_KEY, null) === jsxKey) {
      return;
    } else if (jsxKey !== null) {
      vNewNode = retrieveChildWithKey(null, jsxKey);
      if (vNewNode != null) {
        vnode_insertBefore(
          journal,
          vParent,
          vNewNode = vnode_newVirtual(),
          vCurrent && getInsertBefore()
        );
        return;
      }
    }
    vnode_insertBefore(
      journal,
      vParent,
      vNewNode = vnode_newVirtual(),
      vCurrent && getInsertBefore()
    );
    vnode_setProp(vNewNode, ELEMENT_KEY, jsxKey);
    import_build4.isDev && vnode_setProp(vNewNode || vCurrent, DEBUG_TYPE, type);
  }
  function expectComponent(component) {
    const componentMeta = component[SERIALIZABLE_STATE];
    let host = vNewNode || vCurrent;
    if (componentMeta) {
      const jsxProps = jsxValue.props;
      let shouldRender = false;
      const [componentQRL] = componentMeta;
      const componentHash = componentQRL.$hash$;
      const vNodeComponentHash = getComponentHash(host, container.$getObjectById$);
      const lookupKey = jsxValue.key || componentHash;
      const vNodeLookupKey = getKey(host) || vNodeComponentHash;
      const lookupKeysAreEqual = lookupKey === vNodeLookupKey;
      const hashesAreEqual = componentHash === vNodeComponentHash;
      if (!lookupKeysAreEqual) {
        vNewNode = retrieveChildWithKey(null, lookupKey);
        if (vNewNode) {
          vnode_insertBefore(journal, vParent, vNewNode, vCurrent);
        } else {
          insertNewComponent(host, componentQRL, jsxProps);
        }
        host = vNewNode;
        shouldRender = true;
      } else if (!hashesAreEqual) {
        insertNewComponent(host, componentQRL, jsxProps);
        if (vNewNode) {
          if (host) {
            vNewNode[0 /* flags */] = host[0 /* flags */];
          }
          host = vNewNode;
          shouldRender = true;
        }
      }
      if (host) {
        const vNodeProps = vnode_getProp(host, ELEMENT_PROPS, container.$getObjectById$);
        shouldRender = shouldRender || propsDiffer(jsxProps, vNodeProps);
        if (shouldRender) {
          host[0 /* flags */] &= ~32 /* Deleted */;
          container.$scheduler$(7 /* COMPONENT */, host, componentQRL, jsxProps);
        }
      }
      jsxValue.children != null && descendContentToProject(jsxValue.children, host);
    } else {
      const lookupKey = jsxValue.key;
      const vNodeLookupKey = getKey(host);
      const lookupKeysAreEqual = lookupKey === vNodeLookupKey;
      if (!lookupKeysAreEqual) {
        vNewNode = retrieveChildWithKey(null, lookupKey);
        if (vNewNode) {
          vnode_insertBefore(journal, vParent, vNewNode, vCurrent);
        } else {
          insertNewInlineComponent();
        }
        host = vNewNode;
      }
      if (host) {
        let componentHost = host;
        while (componentHost && (vnode_isVirtualVNode(componentHost) ? vnode_getProp(componentHost, OnRenderProp, null) === null : true)) {
          componentHost = vnode_getParent(componentHost);
        }
        const jsxOutput = executeComponent(
          container,
          host,
          componentHost || container.rootVNode,
          component,
          jsxValue.props
        );
        asyncQueue.push(jsxOutput, host);
      }
    }
  }
  function insertNewComponent(host, componentQRL, jsxProps) {
    if (host) {
      clearVNodeEffectDependencies(host);
    }
    vnode_insertBefore(
      journal,
      vParent,
      vNewNode = vnode_newVirtual(),
      vCurrent && getInsertBefore()
    );
    import_build4.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, "C" /* Component */);
    container.setHostProp(vNewNode, OnRenderProp, componentQRL);
    container.setHostProp(vNewNode, ELEMENT_PROPS, jsxProps);
    container.setHostProp(vNewNode, ELEMENT_KEY, jsxValue.key);
  }
  function insertNewInlineComponent() {
    vnode_insertBefore(
      journal,
      vParent,
      vNewNode = vnode_newVirtual(),
      vCurrent && getInsertBefore()
    );
    import_build4.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, "I" /* InlineComponent */);
    vnode_setProp(vNewNode, ELEMENT_PROPS, jsxValue.props);
    if (jsxValue.key) {
      vnode_setProp(vNewNode, ELEMENT_KEY, jsxValue.key);
    }
  }
  function expectText(text) {
    if (vCurrent !== null) {
      const type = vnode_getType(vCurrent);
      if (type === 3) {
        if (text !== vnode_getText(vCurrent)) {
          vnode_setText(journal, vCurrent, text);
          return;
        }
        return;
      }
    }
    vnode_insertBefore(
      journal,
      vParent,
      vNewNode = vnode_newText(container.document.createTextNode(text), text),
      vCurrent
    );
  }
};
function getKey(vNode) {
  if (vNode == null) {
    return null;
  }
  return vnode_getProp(vNode, ELEMENT_KEY, null);
}
function getComponentHash(vNode, getObject) {
  if (vNode == null) {
    return null;
  }
  const qrl = vnode_getProp(vNode, OnRenderProp, getObject);
  return qrl ? qrl.$hash$ : null;
}
function Projection() {
}
function propsDiffer(src, dst) {
  if (!src || !dst) {
    return true;
  }
  let srcKeys = removeChildrenKey(Object.keys(src));
  let dstKeys = removeChildrenKey(Object.keys(dst));
  if (srcKeys.length !== dstKeys.length) {
    return true;
  }
  srcKeys = srcKeys.sort();
  dstKeys = dstKeys.sort();
  for (let idx = 0; idx < srcKeys.length; idx++) {
    const srcKey = srcKeys[idx];
    const dstKey = dstKeys[idx];
    if (srcKey !== dstKey || src[srcKey] !== dst[dstKey]) {
      return true;
    }
  }
  return false;
}
function removeChildrenKey(keys) {
  const childrenIdx = keys.indexOf("children");
  if (childrenIdx !== -1) {
    keys.splice(childrenIdx, 1);
  }
  return keys;
}
function cleanup(container, vNode) {
  let vCursor = vNode;
  if (vnode_isTextVNode(vNode)) {
    return;
  }
  let vParent = null;
  do {
    const type = vCursor[0 /* flags */];
    if (type & 3 /* ELEMENT_OR_VIRTUAL_MASK */) {
      if (type & 2 /* Virtual */) {
        clearVNodeEffectDependencies(vCursor);
        markVNodeAsDeleted(vCursor);
        const seq = container.getHostProp(vCursor, ELEMENT_SEQ);
        if (seq) {
          for (let i = 0; i < seq.length; i++) {
            const obj = seq[i];
            if (isTask(obj)) {
              const task = obj;
              clearSubscriberEffectDependencies(task);
              if (task.$flags$ & 1 /* VISIBLE_TASK */) {
                container.$scheduler$(80 /* CLEANUP_VISIBLE */, task);
              } else {
                cleanupTask(task);
              }
            }
          }
        }
      }
      const isComponent = type & 2 /* Virtual */ && vnode_getProp(vCursor, OnRenderProp, null) !== null;
      if (isComponent) {
        const attrs = vCursor;
        for (let i = 6 /* PROPS_OFFSET */; i < attrs.length; i = i + 2) {
          const key = attrs[i];
          if (!isParentSlotProp(key) && isSlotProp(key)) {
            const value = attrs[i + 1];
            if (value) {
              attrs[i + 1] = null;
              const projection = typeof value === "string" ? vnode_locate(container.rootVNode, value) : value;
              let projectionChild = vnode_getFirstChild(projection);
              while (projectionChild) {
                cleanup(container, projectionChild);
                projectionChild = vnode_getNextSibling(projectionChild);
              }
              cleanupStaleUnclaimedProjection(container.$journal$, projection);
            }
          }
        }
      }
      const isProjection = type & 2 /* Virtual */ && vnode_getProp(vCursor, QSlot, null) !== null;
      if (!isProjection) {
        const vFirstChild = vnode_getFirstChild(vCursor);
        if (vFirstChild) {
          vCursor = vFirstChild;
          continue;
        }
      } else if (vCursor === vNode) {
        const vFirstChild = vnode_getFirstChild(vCursor);
        if (vFirstChild) {
          vnode_walkVNode(vFirstChild);
          return;
        }
      }
    }
    if (vCursor === vNode) {
      return;
    }
    const vNextSibling = vnode_getNextSibling(vCursor);
    if (vNextSibling) {
      vCursor = vNextSibling;
      continue;
    }
    vParent = vnode_getParent(vCursor);
    while (vParent) {
      if (vParent === vNode) {
        return;
      }
      const vNextParentSibling = vnode_getNextSibling(vParent);
      if (vNextParentSibling) {
        vCursor = vNextParentSibling;
        break;
      }
      vParent = vnode_getParent(vParent);
    }
    if (vParent == null) {
      return;
    }
  } while (true);
}
function cleanupStaleUnclaimedProjection(journal, projection) {
  const projectionParent = vnode_getParent(projection);
  if (projectionParent) {
    const projectionParentType = projectionParent[0 /* flags */];
    if (projectionParentType & 1 /* Element */ && vnode_getElementName(projectionParent) === QTemplate) {
      vnode_remove(journal, projectionParent, projection, true);
    }
  }
}
function markVNodeAsDeleted(vCursor) {
  vCursor[0 /* flags */] |= 32 /* Deleted */;
}
var HANDLER_PREFIX = ":";
var count = 0;

// packages/qwik/src/core/shared/scheduler.ts
var DEBUG2 = false;
var createScheduler = (container, scheduleDrain, journalFlush) => {
  const choreQueue = [];
  let currentChore = null;
  let journalFlushScheduled = false;
  return schedule;
  function schedule(type, hostOrTask = null, targetOrQrl = null, payload = null) {
    const runLater = type !== 127 /* WAIT_FOR_ALL */ && type !== 16 /* WAIT_FOR_COMPONENTS */ && type !== 6 /* COMPONENT_SSR */;
    const isTask2 = type === 3 /* TASK */ || type === 64 /* VISIBLE */ || type === 2 /* RESOURCE */ || type === 80 /* CLEANUP_VISIBLE */;
    if (isTask2) {
      hostOrTask.$flags$ |= 8 /* DIRTY */;
    }
    let chore = {
      $type$: type,
      $idx$: isTask2 ? hostOrTask.$index$ : typeof targetOrQrl === "string" ? targetOrQrl : 0,
      $host$: isTask2 ? hostOrTask.$el$ : hostOrTask,
      $target$: targetOrQrl,
      $payload$: isTask2 ? hostOrTask : payload,
      $resolve$: null,
      $promise$: null,
      $returnValue$: null,
      $executed$: false
    };
    chore.$promise$ = new Promise((resolve) => chore.$resolve$ = resolve);
    DEBUG2 && debugTrace("schedule", chore, currentChore, choreQueue);
    chore = sortedInsert(choreQueue, chore);
    if (!journalFlushScheduled && runLater) {
      journalFlushScheduled = true;
      schedule(48 /* JOURNAL_FLUSH */);
      scheduleDrain();
    }
    if (runLater) {
      return chore.$promise$;
    } else {
      return drainUpTo(chore);
    }
  }
  function drainUpTo(runUptoChore) {
    if (runUptoChore.$executed$) {
      return runUptoChore.$returnValue$;
    }
    if (currentChore) {
      return runUptoChore.$promise$;
    }
    while (choreQueue.length) {
      const nextChore = choreQueue.shift();
      const order = choreComparator(nextChore, runUptoChore, false);
      if (order === null) {
        continue;
      }
      if (order > 0) {
        break;
      }
      const isDeletedVNode = vNodeAlreadyDeleted(nextChore);
      if (isDeletedVNode && // we need to process cleanup tasks for deleted nodes
      nextChore.$type$ !== 80 /* CLEANUP_VISIBLE */) {
        DEBUG2 && debugTrace("skip chore", nextChore, currentChore, choreQueue);
        continue;
      }
      const returnValue = executeChore(nextChore);
      if (isPromise(returnValue)) {
        const promise = returnValue.then(() => drainUpTo(runUptoChore));
        return promise;
      }
    }
    return runUptoChore.$returnValue$;
  }
  function executeChore(chore) {
    const host = chore.$host$;
    DEBUG2 && debugTrace("execute", chore, currentChore, choreQueue);
    assertEqual(currentChore, null, "Chore already running.");
    currentChore = chore;
    let returnValue = null;
    switch (chore.$type$) {
      case 48 /* JOURNAL_FLUSH */:
        returnValue = journalFlush();
        journalFlushScheduled = false;
        break;
      case 7 /* COMPONENT */:
      case 6 /* COMPONENT_SSR */:
        returnValue = safeCall(
          () => executeComponent(
            container,
            host,
            host,
            chore.$target$,
            chore.$payload$
          ),
          (jsx3) => {
            return chore.$type$ === 7 /* COMPONENT */ ? maybeThen(container.processJsx(host, jsx3), () => jsx3) : jsx3;
          },
          (err) => container.handleError(err, host)
        );
        break;
      case 2 /* RESOURCE */:
        const result = runResource(chore.$payload$, container, host);
        returnValue = isDomContainer(container) ? null : result;
        break;
      case 3 /* TASK */:
        returnValue = runTask(chore.$payload$, container, host);
        break;
      case 64 /* VISIBLE */:
        returnValue = runTask(chore.$payload$, container, host);
        break;
      case 80 /* CLEANUP_VISIBLE */:
        const task = chore.$payload$;
        cleanupTask(task);
        break;
      case 4 /* NODE_DIFF */:
        const parentVirtualNode = chore.$target$;
        let jsx2 = chore.$payload$;
        if (isSignal(jsx2)) {
          jsx2 = jsx2.value;
        }
        returnValue = vnode_diff(container, jsx2, parentVirtualNode, null);
        break;
      case 5 /* NODE_PROP */:
        const virtualNode = chore.$host$;
        const payload = chore.$payload$;
        let value = payload.$value$;
        if (isSignal(value)) {
          value = value.value;
        }
        const isConst = payload.$isConst$;
        const journal = container.$journal$;
        const property = chore.$idx$;
        value = serializeAttribute(property, value, payload.$scopedStyleIdPrefix$);
        if (isConst) {
          const element = virtualNode[6 /* element */];
          journal.push(2 /* SetAttribute */, element, property, value);
        } else {
          vnode_setAttr(journal, virtualNode, property, value);
        }
        break;
      case 1 /* QRL_RESOLVE */: {
        const target = chore.$target$;
        returnValue = !target.resolved ? target.resolve() : null;
        break;
      }
    }
    return maybeThenPassError(returnValue, (value) => {
      var _a;
      DEBUG2 && debugTrace("execute.DONE", null, currentChore, choreQueue);
      if (currentChore) {
        currentChore.$executed$ = true;
        (_a = currentChore.$resolve$) == null ? void 0 : _a.call(currentChore, value);
      }
      currentChore = null;
      return chore.$returnValue$ = value;
    });
  }
};
var toNumber = (value) => {
  return typeof value === "number" ? value : -1;
};
var choreUpdate = (existing, newChore) => {
  if (existing.$type$ === 4 /* NODE_DIFF */) {
    existing.$payload$ = newChore.$payload$;
  }
};
function vNodeAlreadyDeleted(chore) {
  return !!(chore.$host$ && vnode_isVNode(chore.$host$) && chore.$host$[0 /* flags */] & 32 /* Deleted */);
}
function choreComparator(a, b, shouldThrowOnHostMismatch) {
  const macroTypeDiff = (a.$type$ & 112 /* MACRO */) - (b.$type$ & 112 /* MACRO */);
  if (macroTypeDiff !== 0) {
    return macroTypeDiff;
  }
  if (a.$type$ !== 48 /* JOURNAL_FLUSH */) {
    const aHost = a.$host$;
    const bHost = b.$host$;
    if (aHost !== bHost && aHost !== null && bHost !== null) {
      if (vnode_isVNode(aHost) && vnode_isVNode(bHost)) {
        const hostDiff = vnode_documentPosition(aHost, bHost);
        if (hostDiff !== 0) {
          return hostDiff;
        }
      } else {
        const errorMessage = "SERVER: during HTML streaming, it is not possible to cause a re-run of tasks on a different host";
        if (shouldThrowOnHostMismatch) {
          throwErrorAndStop(errorMessage);
        }
        logWarn(errorMessage);
        return null;
      }
    }
    const microTypeDiff = (a.$type$ & 15 /* MICRO */) - (b.$type$ & 15 /* MICRO */);
    if (microTypeDiff !== 0) {
      return microTypeDiff;
    }
    const idxDiff = toNumber(a.$idx$) - toNumber(b.$idx$);
    if (idxDiff !== 0) {
      return idxDiff;
    }
    if (a.$target$ !== b.$target$ && (a.$type$ === 1 /* QRL_RESOLVE */ && b.$type$ === 1 /* QRL_RESOLVE */ || a.$type$ === 5 /* NODE_PROP */ && b.$type$ === 5 /* NODE_PROP */)) {
      return 1;
    }
  }
  return 0;
}
function sortedFindIndex(sortedArray, value) {
  let bottom = 0;
  let top = sortedArray.length;
  while (bottom < top) {
    const middle = bottom + (top - bottom >> 1);
    const midChore = sortedArray[middle];
    const comp = choreComparator(value, midChore, true);
    if (comp < 0) {
      top = middle;
    } else if (comp > 0) {
      bottom = middle + 1;
    } else {
      return middle;
    }
  }
  return ~bottom;
}
function sortedInsert(sortedArray, value) {
  const idx = sortedFindIndex(sortedArray, value);
  if (idx < 0) {
    sortedArray.splice(~idx, 0, value);
    return value;
  }
  const existing = sortedArray[idx];
  choreUpdate(existing, value);
  return existing;
}
function debugChoreToString(chore) {
  var _a;
  const type = {
    [1 /* QRL_RESOLVE */]: "QRL_RESOLVE",
    [2 /* RESOURCE */]: "RESOURCE",
    [3 /* TASK */]: "TASK",
    [4 /* NODE_DIFF */]: "NODE_DIFF",
    [5 /* NODE_PROP */]: "NODE_PROP",
    [7 /* COMPONENT */]: "COMPONENT",
    [6 /* COMPONENT_SSR */]: "COMPONENT_SSR",
    [48 /* JOURNAL_FLUSH */]: "JOURNAL_FLUSH",
    [64 /* VISIBLE */]: "VISIBLE",
    [80 /* CLEANUP_VISIBLE */]: "CLEANUP_VISIBLE",
    [127 /* WAIT_FOR_ALL */]: "WAIT_FOR_ALL",
    [16 /* WAIT_FOR_COMPONENTS */]: "WAIT_FOR_COMPONENTS"
  }[chore.$type$] || "UNKNOWN: " + chore.$type$;
  const host = String(chore.$host$).replaceAll(/\n.*/gim, "");
  const qrlTarget = (_a = chore.$target$) == null ? void 0 : _a.$symbol$;
  return `Chore(${type} ${chore.$type$ === 1 /* QRL_RESOLVE */ ? qrlTarget : host} ${chore.$idx$})`;
}
function debugTrace(action, arg, currentChore, queue) {
  const lines = ["Scheduler: " + action];
  if (arg) {
    lines.push(
      "    arg: " + ("$type$" in arg ? debugChoreToString(arg) : String(arg).replaceAll(/\n.*/gim, ""))
    );
  }
  if (currentChore) {
    lines.push("running: " + debugChoreToString(currentChore));
  }
  if (queue) {
    queue.forEach((chore, idx) => {
      lines.push((idx == 0 ? "  queue: " : "         ") + debugChoreToString(chore));
    });
  }
  console.log(lines.join("\n  ") + "\n");
}

// packages/qwik/src/core/use/use-task.ts
var runTask = (task, container, host) => {
  task.$flags$ &= ~8 /* DIRTY */;
  cleanupTask(task);
  const iCtx = newInvokeContext(container.$locale$, host, void 0, TaskEvent);
  iCtx.$container$ = container;
  const taskFn = task.$qrl$.getFn(iCtx, () => clearSubscriberEffectDependencies(task));
  const track = (obj, prop) => {
    const ctx = newInvokeContext();
    ctx.$effectSubscriber$ = [task, ":" /* COMPONENT */];
    ctx.$container$ = container;
    return invoke(ctx, () => {
      if (isFunction(obj)) {
        return obj();
      }
      if (prop) {
        return obj[prop];
      } else if (isSignal(obj)) {
        return obj.value;
      } else {
        return obj;
      }
    });
  };
  const handleError = (reason) => container.handleError(reason, host);
  let cleanupFns = null;
  const cleanup2 = (fn) => {
    if (typeof fn == "function") {
      if (!cleanupFns) {
        cleanupFns = [];
        task.$destroy$ = noSerialize(() => {
          task.$destroy$ = null;
          cleanupFns.forEach((fn2) => {
            try {
              fn2();
            } catch (err) {
              handleError(err);
            }
          });
        });
      }
      cleanupFns.push(fn);
    }
  };
  const taskApi = { track, cleanup: cleanup2 };
  const result = safeCall(
    () => taskFn(taskApi),
    cleanup2,
    (err) => {
      if (isPromise(err)) {
        return err.then(() => runTask(task, container, host));
      } else {
        return handleError(err);
      }
    }
  );
  return result;
};
var cleanupTask = (task) => {
  const destroy = task.$destroy$;
  if (destroy) {
    task.$destroy$ = null;
    try {
      destroy();
    } catch (err) {
      logError(err);
    }
  }
};
var Task = class extends Subscriber {
  constructor($flags$, $index$, $el$, $qrl$, $state$, $destroy$) {
    super();
    this.$flags$ = $flags$;
    this.$index$ = $index$;
    this.$el$ = $el$;
    this.$qrl$ = $qrl$;
    this.$state$ = $state$;
    this.$destroy$ = $destroy$;
  }
};
var isTask = (value) => {
  return value instanceof Task;
};

// packages/qwik/src/core/signal/signal.ts
var DEBUG3 = false;
var NEEDS_COMPUTATION = Symbol("invalid");
var log2 = (...args) => console.log("SIGNAL", ...args.map(qwikDebugToString));
var throwIfQRLNotResolved = (qrl) => {
  const resolved = qrl.resolved;
  if (!resolved) {
    throw qrl.resolve();
  }
};
var isSignal = (value) => {
  return value instanceof Signal;
};
var EffectData = class {
  constructor(data) {
    this.data = data;
  }
};
var Signal = class {
  constructor(container, value) {
    /** Store a list of effects which are dependent on this signal. */
    this.$effects$ = null;
    this.$container$ = null;
    this.$container$ = container;
    this.$untrackedValue$ = value;
    DEBUG3 && log2("new", this);
  }
  get untrackedValue() {
    return this.$untrackedValue$;
  }
  // TODO: should we disallow setting the value directly?
  set untrackedValue(value) {
    this.$untrackedValue$ = value;
  }
  get value() {
    const ctx = tryGetInvokeContext();
    if (ctx) {
      if (this.$container$ === null) {
        if (!ctx.$container$) {
          return this.untrackedValue;
        }
        this.$container$ = ctx.$container$;
      } else {
        assertTrue(
          !ctx.$container$ || ctx.$container$ === this.$container$,
          "Do not use signals across containers"
        );
      }
      const effectSubscriber = ctx.$effectSubscriber$;
      if (effectSubscriber) {
        const effects = this.$effects$ ||= [];
        ensureContainsEffect(effects, effectSubscriber);
        ensureContains(effectSubscriber, this);
        if (isSubscriber(this)) {
          ensureEffectContainsSubscriber(
            effectSubscriber[0 /* EFFECT */],
            this,
            this.$container$
          );
        }
        DEBUG3 && log2("read->sub", pad("\n" + this.toString(), "  "));
      }
    }
    return this.untrackedValue;
  }
  set value(value) {
    if (value !== this.$untrackedValue$) {
      DEBUG3 && log2("Signal.set", this.$untrackedValue$, "->", value, pad("\n" + this.toString(), "  "));
      this.$untrackedValue$ = value;
      triggerEffects(this.$container$, this, this.$effects$);
    }
  }
  // prevent accidental use as value
  valueOf() {
    if (qDev) {
      return throwErrorAndStop("Cannot coerce a Signal, use `.value` instead");
    }
  }
  toString() {
    var _a;
    return `[${this.constructor.name}${this.$invalid$ ? " INVALID" : ""} ${String(this.$untrackedValue$)}]` + (((_a = this.$effects$) == null ? void 0 : _a.map((e) => "\n -> " + pad(qwikDebugToString(e[0]), "    ")).join("\n")) || "");
  }
  toJSON() {
    return { value: this.$untrackedValue$ };
  }
};
var ensureContains = (array, value) => {
  const isMissing = array.indexOf(value) === -1;
  if (isMissing) {
    array.push(value);
  }
};
var ensureContainsEffect = (array, effectSubscriptions) => {
  for (let i = 0; i < array.length; i++) {
    const existingEffect = array[i];
    if (existingEffect[0] === effectSubscriptions[0] && existingEffect[1] === effectSubscriptions[1]) {
      return;
    }
  }
  array.push(effectSubscriptions);
};
var ensureEffectContainsSubscriber = (effect, subscriber, container) => {
  if (isSubscriber(effect)) {
    effect.$effectDependencies$ ||= [];
    if (subscriberExistInSubscribers(effect.$effectDependencies$, subscriber)) {
      return;
    }
    effect.$effectDependencies$.push(subscriber);
  } else if (vnode_isVNode(effect) && vnode_isVirtualVNode(effect)) {
    let subscribers = vnode_getProp(
      effect,
      QSubscribers,
      container ? container.$getObjectById$ : null
    );
    subscribers ||= [];
    if (subscriberExistInSubscribers(subscribers, subscriber)) {
      return;
    }
    subscribers.push(subscriber);
    vnode_setProp(effect, QSubscribers, subscribers);
  } else if (isSSRNode(effect)) {
    let subscribers = effect.getProp(QSubscribers);
    subscribers ||= [];
    if (subscriberExistInSubscribers(subscribers, subscriber)) {
      return;
    }
    subscribers.push(subscriber);
    effect.setProp(QSubscribers, subscribers);
  }
};
var isSSRNode = (effect) => {
  return "setProp" in effect && "getProp" in effect && "removeProp" in effect && "id" in effect;
};
var subscriberExistInSubscribers = (subscribers, subscriber) => {
  for (let i = 0; i < subscribers.length; i++) {
    if (subscribers[i] === subscriber) {
      return true;
    }
  }
  return false;
};
var triggerEffects = (container, signal, effects) => {
  if (effects) {
    const scheduleEffect = (effectSubscriptions) => {
      var _a;
      const effect = effectSubscriptions[0 /* EFFECT */];
      const property = effectSubscriptions[1 /* PROPERTY */];
      assertDefined(container, "Container must be defined.");
      if (isTask(effect)) {
        effect.$flags$ |= 8 /* DIRTY */;
        DEBUG3 && log2("schedule.effect.task", pad("\n" + String(effect), "  "));
        let choreType = 3 /* TASK */;
        if (effect.$flags$ & 1 /* VISIBLE_TASK */) {
          choreType = 64 /* VISIBLE */;
        } else if (effect.$flags$ & 4 /* RESOURCE */) {
          choreType = 2 /* RESOURCE */;
        }
        container.$scheduler$(choreType, effect);
      } else if (effect instanceof Signal) {
        if (effect instanceof ComputedSignal) {
          if (!effect.$computeQrl$.resolved) {
            container.$scheduler$(1 /* QRL_RESOLVE */, null, effect.$computeQrl$);
          }
        }
        effect.$invalid$ = true;
        const previousSignal = signal;
        try {
          signal = effect;
          (_a = effect.$effects$) == null ? void 0 : _a.forEach(scheduleEffect);
        } catch (e) {
          logError(e);
        } finally {
          signal = previousSignal;
        }
      } else if (property === ":" /* COMPONENT */) {
        const host = effect;
        const qrl = container.getHostProp(host, OnRenderProp);
        assertDefined(qrl, "Component must have QRL");
        const props = container.getHostProp(host, ELEMENT_PROPS);
        container.$scheduler$(7 /* COMPONENT */, host, qrl, props);
      } else if (property === "." /* VNODE */) {
        const host = effect;
        const target = host;
        container.$scheduler$(4 /* NODE_DIFF */, host, target, signal);
      } else {
        const host = effect;
        let effectData = effectSubscriptions[2 /* FIRST_BACK_REF_OR_DATA */];
        if (effectData instanceof EffectData) {
          effectData = effectData;
          const data = effectData.data;
          const payload = {
            ...data,
            $value$: signal
          };
          container.$scheduler$(5 /* NODE_PROP */, host, property, payload);
        }
      }
    };
    effects.forEach(scheduleEffect);
  }
  DEBUG3 && log2("done scheduling");
};
var ComputedSignal = class extends Signal {
  constructor(container, fn) {
    super(container, NEEDS_COMPUTATION);
    // We need a separate flag to know when the computation needs running because
    // we need the old value to know if effects need running after computation
    this.$invalid$ = true;
    this.$computeQrl$ = fn;
  }
  $invalidate$() {
    var _a;
    this.$invalid$ = true;
    if (!((_a = this.$effects$) == null ? void 0 : _a.length)) {
      return;
    }
    if (this.$computeIfNeeded$()) {
      triggerEffects(this.$container$, this, this.$effects$);
    }
  }
  /**
   * Use this to force running subscribers, for example when the calculated value has mutated but
   * remained the same object
   */
  force() {
    this.$invalid$ = true;
    triggerEffects(this.$container$, this, this.$effects$);
  }
  get untrackedValue() {
    this.$computeIfNeeded$();
    assertFalse(this.$untrackedValue$ === NEEDS_COMPUTATION, "Invalid state");
    return this.$untrackedValue$;
  }
  $computeIfNeeded$() {
    if (!this.$invalid$) {
      return false;
    }
    const computeQrl = this.$computeQrl$;
    throwIfQRLNotResolved(computeQrl);
    const ctx = tryGetInvokeContext();
    const previousEffectSubscription = ctx == null ? void 0 : ctx.$effectSubscriber$;
    ctx && (ctx.$effectSubscriber$ = [this, "." /* VNODE */]);
    try {
      const untrackedValue = computeQrl.getFn(ctx)();
      if (isPromise(untrackedValue)) {
        throwErrorAndStop(
          `useComputedSignal$ QRL ${computeQrl.dev ? `${computeQrl.dev.file} ` : ""}${computeQrl.$hash$} returned a Promise`
        );
      }
      DEBUG3 && log2("Signal.$compute$", untrackedValue);
      this.$invalid$ = false;
      const didChange = untrackedValue !== this.$untrackedValue$;
      this.$untrackedValue$ = untrackedValue;
      return didChange;
    } finally {
      if (ctx) {
        ctx.$effectSubscriber$ = previousEffectSubscription;
      }
    }
  }
  // Getters don't get inherited
  get value() {
    return super.value;
  }
  set value(_) {
    throwErrorAndStop("ComputedSignal is read-only");
  }
};
var WrappedSignal = class extends Signal {
  constructor(container, fn, args, fnStr) {
    super(container, NEEDS_COMPUTATION);
    // We need a separate flag to know when the computation needs running because
    // we need the old value to know if effects need running after computation
    this.$invalid$ = true;
    this.$effectDependencies$ = null;
    this.$args$ = args;
    this.$func$ = fn;
    this.$funcStr$ = fnStr;
  }
  $invalidate$() {
    var _a;
    this.$invalid$ = true;
    if (!((_a = this.$effects$) == null ? void 0 : _a.length)) {
      return;
    }
    if (this.$computeIfNeeded$()) {
      triggerEffects(this.$container$, this, this.$effects$);
    }
  }
  /**
   * Use this to force running subscribers, for example when the calculated value has mutated but
   * remained the same object
   */
  force() {
    this.$invalid$ = true;
    triggerEffects(this.$container$, this, this.$effects$);
  }
  get untrackedValue() {
    this.$computeIfNeeded$();
    assertFalse(this.$untrackedValue$ === NEEDS_COMPUTATION, "Invalid state");
    return this.$untrackedValue$;
  }
  $computeIfNeeded$() {
    if (!this.$invalid$) {
      return false;
    }
    this.$untrackedValue$ = trackSignal(
      () => this.$func$(...this.$args$),
      this,
      "." /* VNODE */,
      this.$container$
    );
  }
  // Getters don't get inherited
  get value() {
    return super.value;
  }
  set value(_) {
    throwErrorAndStop("WrappedSignal is read-only");
  }
};

// packages/qwik/src/core/version.ts
var version = "2.0.0-0-dev+1deebe2";

// packages/qwik/src/core/shared/shared-container.ts
var _SharedContainer = class {
  constructor(scheduleDrain, journalFlush, serverData, locale) {
    this.$currentUniqueId$ = 0;
    this.$instanceHash$ = null;
    this.$serverData$ = serverData;
    this.$locale$ = locale;
    this.$version$ = version;
    this.$storeProxyMap$ = /* @__PURE__ */ new WeakMap();
    this.$getObjectById$ = (id) => {
      throw Error("Not implemented");
    };
    this.$scheduler$ = createScheduler(this, scheduleDrain, journalFlush);
  }
  trackSignalValue(signal, subscriber, property, data) {
    return trackSignal(() => signal.value, subscriber, property, this, data);
  }
  serializationCtxFactory(NodeConstructor, symbolToChunkResolver, writer) {
    return createSerializationContext(
      NodeConstructor,
      symbolToChunkResolver,
      this.getHostProp.bind(this),
      this.setHostProp.bind(this),
      this.$storeProxyMap$,
      writer
    );
  }
};

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
var componentQrl = (componentQrl2) => {
  const QwikComponent = () => {
  };
  QwikComponent[SERIALIZABLE_STATE] = [componentQrl2];
  return QwikComponent;
};
var SERIALIZABLE_STATE = Symbol("serializable-data");
var isQwikComponent = (component) => {
  return typeof component == "function" && component[SERIALIZABLE_STATE] !== void 0;
};

// packages/qwik/src/core/shared/jsx/jsx-runtime.ts
var _jsxSorted = (type, varProps, constProps, children, flags, key, dev) => {
  const processed = key == null ? null : String(key);
  const node = new JSXNodeImpl(
    type,
    varProps || {},
    constProps || null,
    children,
    flags,
    processed
  );
  if (qDev && dev) {
    node.dev = {
      stack: new Error().stack,
      ...dev
    };
  }
  seal(node);
  return node;
};
var isPropsProxy = (obj) => {
  return obj && obj[_VAR_PROPS] !== void 0;
};
var JSXNodeImpl = class {
  constructor(type, varProps, constProps, children, flags, key = null) {
    this.type = type;
    this.varProps = varProps;
    this.constProps = constProps;
    this.children = children;
    this.flags = flags;
    this.key = key;
    this._proxy = null;
    if (qDev) {
      if (typeof varProps !== "object") {
        throw new Error(`JSXNodeImpl: varProps must be objects: ` + JSON.stringify(varProps));
      }
      if (typeof constProps !== "object") {
        throw new Error(`JSXNodeImpl: constProps must be objects: ` + JSON.stringify(constProps));
      }
    }
  }
  get props() {
    if (!this._proxy) {
      this._proxy = createPropsProxy(this.varProps, this.constProps, this.children);
    }
    return this._proxy;
  }
};
var Virtual = (props) => props.children;
var isJSXNode = (n) => {
  if (qDev) {
    if (n instanceof JSXNodeImpl) {
      return true;
    }
    if (isObject(n) && "key" in n && "props" in n && "type" in n) {
      logWarn(`Duplicate implementations of "JSXNode" found`);
      return true;
    }
    return false;
  } else {
    return n instanceof JSXNodeImpl;
  }
};
var Fragment = (props) => props.children;
function createPropsProxy(varProps, constProps, children) {
  return new Proxy({}, new PropsProxyHandler(varProps, constProps, children));
}
var PropsProxyHandler = class {
  constructor($varProps$, $constProps$, $children$) {
    this.$varProps$ = $varProps$;
    this.$constProps$ = $constProps$;
    this.$children$ = $children$;
  }
  get(_, prop) {
    if (prop === _CONST_PROPS) {
      return this.$constProps$;
    }
    if (prop === _VAR_PROPS) {
      return this.$varProps$;
    }
    if (this.$children$ != null && prop === "children") {
      return this.$children$;
    }
    const value = this.$constProps$ && prop in this.$constProps$ ? this.$constProps$[prop] : this.$varProps$[prop];
    return value instanceof WrappedSignal ? value.value : value;
  }
  set(_, prop, value) {
    if (prop === _CONST_PROPS) {
      this.$constProps$ = value;
      return true;
    }
    if (prop === _VAR_PROPS) {
      this.$varProps$ = value;
      return true;
    }
    if (this.$constProps$ && prop in this.$constProps$) {
      this.$constProps$[prop] = value;
    } else {
      this.$varProps$[prop] = value;
    }
    return true;
  }
  deleteProperty(_, prop) {
    if (typeof prop !== "string") {
      return false;
    }
    let didDelete = delete this.$varProps$[prop];
    if (this.$constProps$) {
      didDelete = delete this.$constProps$[prop] || didDelete;
    }
    if (this.$children$ != null && prop === "children") {
      this.$children$ = null;
    }
    return didDelete;
  }
  has(_, prop) {
    const hasProp = prop === "children" && this.$children$ != null || prop === _CONST_PROPS || prop === _VAR_PROPS || prop in this.$varProps$ || (this.$constProps$ ? prop in this.$constProps$ : false);
    return hasProp;
  }
  getOwnPropertyDescriptor(target, p) {
    const value = p === "children" && this.$children$ != null ? this.$children$ : this.$constProps$ && p in this.$constProps$ ? this.$constProps$[p] : this.$varProps$[p];
    return {
      configurable: true,
      enumerable: true,
      value
    };
  }
  ownKeys() {
    const out = Object.keys(this.$varProps$);
    if (this.$children$ != null && out.indexOf("children") === -1) {
      out.push("children");
    }
    if (this.$constProps$) {
      for (const key in this.$constProps$) {
        if (out.indexOf(key) === -1) {
          out.push(key);
        }
      }
    }
    return out;
  }
};
var directGetPropsProxyProp = (jsx2, prop) => {
  return jsx2.constProps && prop in jsx2.constProps ? jsx2.constProps[prop] : jsx2.varProps[prop];
};

// packages/qwik/src/core/debug.ts
var stringifyPath = [];
function qwikDebugToString(value) {
  if (value === null) {
    return "null";
  } else if (value === void 0) {
    return "undefined";
  } else if (typeof value === "string") {
    return '"' + value + '"';
  } else if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  } else if (isTask(value)) {
    return `Task(${qwikDebugToString(value.$qrl$)})`;
  } else if (isQrl(value)) {
    return `Qrl(${value.$symbol$})`;
  } else if (typeof value === "object" || typeof value === "function") {
    if (stringifyPath.includes(value)) {
      return "*";
    }
    if (stringifyPath.length > 10) {
    }
    try {
      stringifyPath.push(value);
      if (Array.isArray(value)) {
        if (vnode_isVNode(value)) {
          return "(" + vnode_getProp(value, DEBUG_TYPE, null) + ")";
        } else {
          return value.map(qwikDebugToString);
        }
      } else if (isSignal(value)) {
        if (value instanceof WrappedSignal) {
          return "WrappedSignal";
        } else if (value instanceof ComputedSignal) {
          return "ComputedSignal";
        } else {
          return "Signal";
        }
      } else if (isStore(value)) {
        return "Store";
      } else if (isJSXNode(value)) {
        return jsxToString(value);
      }
    } finally {
      stringifyPath.pop();
    }
  }
  return value;
}
var pad = (text, prefix) => {
  return String(text).split("\n").map((line, idx) => (idx ? prefix : "") + line).join("\n");
};
var jsxToString = (value) => {
  if (isJSXNode(value)) {
    let type = value.type;
    if (typeof type === "function") {
      type = type.name || "Component";
    }
    let str = "<" + value.type;
    if (value.props) {
      for (const [key, val] of Object.entries(value.props)) {
        str += " " + key + "=" + qwikDebugToString(val);
      }
      const children = value.children;
      if (children != null) {
        str += ">";
        if (Array.isArray(children)) {
          children.forEach((child) => {
            str += jsxToString(child);
          });
        } else {
          str += jsxToString(children);
        }
        str += "</" + value.type + ">";
      } else {
        str += "/>";
      }
    }
    return str;
  } else {
    return String(value);
  }
};

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
var vnode_newElement = (element, elementName) => {
  assertEqual(fastNodeType(element), 1, "Expecting element node.");
  const vnode = VNodeArray.createElement(
    1 /* Element */ | 8 /* Inflated */ | -1 << 8 /* shift */,
    // Flag
    null,
    null,
    null,
    null,
    null,
    element,
    elementName
  );
  assertTrue(vnode_isElementVNode(vnode), "Incorrect format of ElementVNode.");
  assertFalse(vnode_isTextVNode(vnode), "Incorrect format of ElementVNode.");
  assertFalse(vnode_isVirtualVNode(vnode), "Incorrect format of ElementVNode.");
  return vnode;
};
var vnode_newUnMaterializedElement = (element) => {
  assertEqual(fastNodeType(element), 1, "Expecting element node.");
  const vnode = VNodeArray.createElement(
    1 /* Element */ | -1 << 8 /* shift */,
    // Flag
    null,
    null,
    null,
    void 0,
    void 0,
    element,
    void 0
  );
  assertTrue(vnode_isElementVNode(vnode), "Incorrect format of ElementVNode.");
  assertFalse(vnode_isTextVNode(vnode), "Incorrect format of ElementVNode.");
  assertFalse(vnode_isVirtualVNode(vnode), "Incorrect format of ElementVNode.");
  return vnode;
};
var vnode_newSharedText = (previousTextNode, sharedTextNode, textContent) => {
  sharedTextNode && assertEqual(fastNodeType(sharedTextNode), 3, "Expecting element node.");
  const vnode = VNodeArray.createText(
    4 /* Text */ | -1 << 8 /* shift */,
    // Flag
    null,
    // Parent
    previousTextNode,
    // Previous TextNode (usually first child)
    null,
    // Next sibling
    sharedTextNode,
    // SharedTextNode
    textContent
    // Text Content
  );
  assertFalse(vnode_isElementVNode(vnode), "Incorrect format of TextVNode.");
  assertTrue(vnode_isTextVNode(vnode), "Incorrect format of TextVNode.");
  assertFalse(vnode_isVirtualVNode(vnode), "Incorrect format of TextVNode.");
  return vnode;
};
var vnode_newText = (textNode, textContent) => {
  const vnode = VNodeArray.createText(
    4 /* Text */ | 8 /* Inflated */ | -1 << 8 /* shift */,
    // Flags
    null,
    // Parent
    null,
    // No previous sibling
    null,
    // We may have a next sibling.
    textNode,
    // TextNode
    textContent
    // Text Content
  );
  assertEqual(fastNodeType(textNode), 3, "Expecting element node.");
  assertFalse(vnode_isElementVNode(vnode), "Incorrect format of TextVNode.");
  assertTrue(vnode_isTextVNode(vnode), "Incorrect format of TextVNode.");
  assertFalse(vnode_isVirtualVNode(vnode), "Incorrect format of TextVNode.");
  return vnode;
};
var vnode_newVirtual = () => {
  const vnode = VNodeArray.createVirtual(
    2 /* Virtual */ | -1 << 8 /* shift */,
    // Flags
    null,
    null,
    null,
    null,
    null
  );
  assertFalse(vnode_isElementVNode(vnode), "Incorrect format of TextVNode.");
  assertFalse(vnode_isTextVNode(vnode), "Incorrect format of TextVNode.");
  assertTrue(vnode_isVirtualVNode(vnode), "Incorrect format of TextVNode.");
  return vnode;
};
var vnode_isVNode = (vNode) => {
  return vNode instanceof VNodeArray;
};
var vnode_isElementVNode = (vNode) => {
  assertDefined(vNode, "Missing vNode");
  const flag = vNode[0 /* flags */];
  return (flag & 1 /* Element */) === 1 /* Element */;
};
var vnode_isElementOrTextVNode = (vNode) => {
  assertDefined(vNode, "Missing vNode");
  const flag = vNode[0 /* flags */];
  return (flag & 5 /* ELEMENT_OR_TEXT_MASK */) !== 0;
};
var vnode_isMaterialized = (vNode) => {
  assertDefined(vNode, "Missing vNode");
  const flag = vNode[0 /* flags */];
  return (flag & 1 /* Element */) === 1 /* Element */ && vNode[4 /* firstChild */] !== void 0 && vNode[5 /* lastChild */] !== void 0;
};
var vnode_isTextVNode = (vNode) => {
  assertDefined(vNode, "Missing vNode");
  const flag = vNode[0 /* flags */];
  return (flag & 4 /* Text */) === 4 /* Text */;
};
var vnode_isVirtualVNode = (vNode) => {
  assertDefined(vNode, "Missing vNode");
  const flag = vNode[0 /* flags */];
  return (flag & 2 /* Virtual */) === 2 /* Virtual */;
};
var ensureTextVNode = (vNode) => {
  assertTrue(vnode_isTextVNode(vNode), "Expecting TextVNode was: " + vnode_getNodeTypeName(vNode));
  return vNode;
};
var ensureElementOrVirtualVNode = (vNode) => {
  assertDefined(vNode, "Missing vNode");
  assertTrue(
    (vNode[0 /* flags */] & 3 /* ELEMENT_OR_VIRTUAL_MASK */) !== 0,
    "Expecting ElementVNode or VirtualVNode was: " + vnode_getNodeTypeName(vNode)
  );
};
var ensureElementVNode = (vNode) => {
  assertTrue(
    vnode_isElementVNode(vNode),
    "Expecting ElementVNode was: " + vnode_getNodeTypeName(vNode)
  );
  return vNode;
};
var vnode_getNodeTypeName = (vNode) => {
  if (vNode) {
    const flags = vNode[0 /* flags */];
    switch (flags & 7 /* TYPE_MASK */) {
      case 1 /* Element */:
        return "Element";
      case 2 /* Virtual */:
        return "Virtual";
      case 4 /* Text */:
        return "Text";
    }
  }
  return "<unknown>";
};
var vnode_ensureElementInflated = (vnode) => {
  const flags = vnode[0 /* flags */];
  if ((flags & 15 /* INFLATED_TYPE_MASK */) === 1 /* Element */) {
    const elementVNode = vnode;
    elementVNode[0 /* flags */] ^= 8 /* Inflated */;
    const element = elementVNode[6 /* element */];
    const attributes = element.attributes;
    for (let idx = 0; idx < attributes.length; idx++) {
      const attr = attributes[idx];
      const key = attr.name;
      if (key == Q_PROPS_SEPARATOR || !key) {
        break;
      } else if (key.startsWith(QContainerAttr)) {
        if (attr.value === "html" /* HTML */) {
          mapArray_set(
            elementVNode,
            dangerouslySetInnerHTML,
            element.innerHTML,
            8 /* PROPS_OFFSET */
          );
        } else if (attr.value === "text" /* TEXT */ && "value" in element) {
          mapArray_set(
            elementVNode,
            "value",
            element.value,
            8 /* PROPS_OFFSET */
          );
        }
      } else if (!key.startsWith("on:")) {
        const value = attr.value;
        mapArray_set(elementVNode, key, value, 8 /* PROPS_OFFSET */);
      }
    }
  }
};
function vnode_walkVNode(vNode, callback) {
  let vCursor = vNode;
  if (vnode_isTextVNode(vNode)) {
    return;
  }
  let vParent = null;
  do {
    callback == null ? void 0 : callback(vCursor, vParent);
    const vFirstChild = vnode_getFirstChild(vCursor);
    if (vFirstChild) {
      vCursor = vFirstChild;
      continue;
    }
    if (vCursor === vNode) {
      return;
    }
    const vNextSibling = vnode_getNextSibling(vCursor);
    if (vNextSibling) {
      vCursor = vNextSibling;
      continue;
    }
    vParent = vnode_getParent(vCursor);
    while (vParent) {
      if (vParent === vNode) {
        return;
      }
      const vNextParentSibling = vnode_getNextSibling(vParent);
      if (vNextParentSibling) {
        vCursor = vNextParentSibling;
        break;
      }
      vParent = vnode_getParent(vParent);
    }
    if (vParent == null) {
      return;
    }
  } while (true);
}
function vnode_getDOMChildNodes(journal, root, isVNode = false, childNodes = []) {
  if (vnode_isElementOrTextVNode(root)) {
    if (vnode_isTextVNode(root)) {
      vnode_ensureTextInflated(journal, root);
    }
    childNodes.push(isVNode ? root : vnode_getNode(root));
    return childNodes;
  }
  let vNode = vnode_getFirstChild(root);
  while (vNode) {
    if (vnode_isElementVNode(vNode)) {
      childNodes.push(isVNode ? vNode : vnode_getNode(vNode));
    } else if (vnode_isTextVNode(vNode)) {
      vnode_ensureTextInflated(journal, vNode);
      childNodes.push(isVNode ? vNode : vnode_getNode(vNode));
    } else {
      isVNode ? vnode_getDOMChildNodes(journal, vNode, true, childNodes) : vnode_getDOMChildNodes(journal, vNode, false, childNodes);
    }
    vNode = vnode_getNextSibling(vNode);
  }
  return childNodes;
}
var vnode_getDomSibling = (vNode, nextDirection, descend) => {
  const childProp = nextDirection ? 4 /* firstChild */ : 5 /* lastChild */;
  const siblingProp = nextDirection ? 3 /* nextSibling */ : 2 /* previousSibling */;
  let cursor = vNode;
  while (descend && cursor && vnode_isVirtualVNode(cursor)) {
    const child = cursor[childProp];
    if (!child) {
      break;
    }
    if (child[0 /* flags */] & 5 /* ELEMENT_OR_TEXT_MASK */) {
      return child;
    }
    cursor = child;
  }
  while (cursor) {
    let sibling = cursor[siblingProp];
    if (sibling && sibling[0 /* flags */] & 5 /* ELEMENT_OR_TEXT_MASK */) {
      return sibling;
    } else if (!sibling) {
      let virtual = cursor[1 /* parent */];
      if (virtual && !vnode_isVirtualVNode(virtual)) {
        return null;
      }
      while (virtual && !(sibling = virtual[siblingProp])) {
        virtual = virtual[1 /* parent */];
        if (virtual && !vnode_isVirtualVNode(virtual)) {
          return null;
        }
      }
      if (!sibling) {
        return null;
      }
      if (vnode_isTextVNode(sibling) && virtual && vnode_isElementVNode(virtual)) {
        return null;
      }
    }
    while (sibling) {
      cursor = sibling;
      if (cursor[0 /* flags */] & 5 /* ELEMENT_OR_TEXT_MASK */ && vnode_getNode(cursor)) {
        return cursor;
      }
      sibling = cursor[childProp];
    }
  }
  return null;
};
var vnode_ensureInflatedIfText = (journal, vNode) => {
  if (vnode_isTextVNode(vNode)) {
    vnode_ensureTextInflated(journal, vNode);
  }
};
var vnode_ensureTextInflated = (journal, vnode) => {
  var _a;
  const textVNode = ensureTextVNode(vnode);
  const flags = textVNode[0 /* flags */];
  if ((flags & 8 /* Inflated */) === 0) {
    const parentNode = vnode_getDomParent(vnode);
    const sharedTextNode = textVNode[4 /* node */];
    const doc = parentNode.ownerDocument;
    let cursor = vnode_getDomSibling(vnode, false, true);
    const insertBeforeNode = sharedTextNode || (((_a = vnode_getDomSibling(vnode, true, true)) == null ? void 0 : _a[6 /* element */]) || null);
    let lastPreviousTextNode = insertBeforeNode;
    while (cursor && vnode_isTextVNode(cursor)) {
      if ((cursor[0 /* flags */] & 8 /* Inflated */) === 0) {
        const textNode = doc.createTextNode(cursor[5 /* text */]);
        journal.push(5 /* Insert */, parentNode, lastPreviousTextNode, textNode);
        lastPreviousTextNode = textNode;
        cursor[4 /* node */] = textNode;
        cursor[0 /* flags */] |= 8 /* Inflated */;
      }
      cursor = vnode_getDomSibling(cursor, false, true);
    }
    cursor = vnode;
    while (cursor && vnode_isTextVNode(cursor)) {
      const next = vnode_getDomSibling(cursor, true, true);
      const isLastNode = next ? !vnode_isTextVNode(next) : true;
      if ((cursor[0 /* flags */] & 8 /* Inflated */) === 0) {
        if (isLastNode && sharedTextNode) {
          journal.push(1 /* SetText */, sharedTextNode, cursor[5 /* text */]);
        } else {
          const textNode = doc.createTextNode(cursor[5 /* text */]);
          journal.push(5 /* Insert */, parentNode, insertBeforeNode, textNode);
          cursor[4 /* node */] = textNode;
        }
        cursor[0 /* flags */] |= 8 /* Inflated */;
      }
      cursor = next;
    }
  }
};
var vnode_locate = (rootVNode, id) => {
  ensureElementVNode(rootVNode);
  let vNode = rootVNode;
  const containerElement = rootVNode[6 /* element */];
  const { qVNodeRefs } = containerElement;
  let elementOffset = -1;
  let refElement;
  if (typeof id === "string") {
    assertDefined(qVNodeRefs, "Missing qVNodeRefs.");
    elementOffset = parseInt(id);
    refElement = qVNodeRefs.get(elementOffset);
  } else {
    refElement = id;
  }
  assertDefined(refElement, "Missing refElement.");
  if (!vnode_isVNode(refElement)) {
    assertTrue(
      containerElement.contains(refElement),
      `Couldn't find the element inside the container while locating the VNode.`
    );
    let parent = refElement;
    const elementPath = [refElement];
    while (parent && parent !== containerElement) {
      parent = parent.parentElement;
      elementPath.push(parent);
    }
    for (let i = elementPath.length - 2; i >= 0; i--) {
      vNode = vnode_getVNodeForChildNode(vNode, elementPath[i]);
    }
    elementOffset != -1 && qVNodeRefs.set(elementOffset, vNode);
  } else {
    vNode = refElement;
  }
  if (typeof id === "string") {
    const idLength = id.length;
    let idx = indexOfAlphanumeric(id, idLength);
    let childIdx = 0;
    while (idx < idLength) {
      const ch = id.charCodeAt(idx);
      childIdx *= 26;
      if (ch >= 97) {
        childIdx += ch - 97;
      } else {
        childIdx += ch - 65;
        vNode = vnode_getChildWithIdx(vNode, childIdx);
        childIdx = 0;
      }
      idx++;
    }
  }
  return vNode;
};
var vnode_getChildWithIdx = (vNode, childIdx) => {
  let child = vnode_getFirstChild(vNode);
  assertDefined(child, "Missing child.");
  while (child[0 /* flags */] >>> 8 /* shift */ !== childIdx) {
    child = vnode_getNextSibling(child);
    assertDefined(child, "Missing child.");
  }
  return child;
};
var vNodeStack = [];
var vnode_getVNodeForChildNode = (vNode, childElement) => {
  ensureElementVNode(vNode);
  let child = vnode_getFirstChild(vNode);
  assertDefined(child, "Missing child.");
  while (child && child[6 /* element */] !== childElement) {
    if (vnode_isVirtualVNode(child)) {
      const next = vnode_getNextSibling(child);
      const firstChild = vnode_getFirstChild(child);
      if (firstChild) {
        next && vNodeStack.push(next);
        child = firstChild;
      } else {
        child = next || (vNodeStack.length ? vNodeStack.pop() : null);
      }
    } else {
      const next = vnode_getNextSibling(child);
      if (next) {
        child = next;
      } else {
        child = next || vNodeStack.pop();
      }
    }
    assertDefined(child, "Missing child.");
  }
  while (vNodeStack.length) {
    vNodeStack.pop();
  }
  ensureElementVNode(child);
  assertEqual(child[6 /* element */], childElement, "Child not found.");
  return child;
};
var indexOfAlphanumeric = (id, length) => {
  let idx = 0;
  while (idx < length) {
    if (id.charCodeAt(idx) <= 57) {
      idx++;
    } else {
      return idx;
    }
  }
  return length;
};
var parseBoolean = (value) => {
  if (value === "false") {
    return false;
  }
  return Boolean(value);
};
var isBooleanAttr = (element, key) => {
  const isBoolean = key == "allowfullscreen" || key == "async" || key == "autofocus" || key == "autoplay" || key == "checked" || key == "controls" || key == "default" || key == "defer" || key == "disabled" || key == "formnovalidate" || key == "inert" || key == "ismap" || key == "itemscope" || key == "loop" || key == "multiple" || key == "muted" || key == "nomodule" || key == "novalidate" || key == "open" || key == "playsinline" || key == "readonly" || key == "required" || key == "reversed" || key == "selected";
  return isBoolean && key in element;
};
var vnode_applyJournal = (journal) => {
  let idx = 0;
  const length = journal.length;
  while (idx < length) {
    const op = journal[idx++];
    switch (op) {
      case 1 /* SetText */:
        const text = journal[idx++];
        text.nodeValue = journal[idx++];
        break;
      case 2 /* SetAttribute */:
        const element = journal[idx++];
        let key = journal[idx++];
        if (key === "className") {
          key = "class";
        }
        const value = journal[idx++];
        if (isBooleanAttr(element, key)) {
          element[key] = parseBoolean(value);
        } else if (key === "value" && key in element) {
          element.value = escapeHTML(String(value));
        } else if (key === dangerouslySetInnerHTML) {
          element.innerHTML = value;
        } else {
          if (value == null || value === false) {
            element.removeAttribute(key);
          } else {
            element.setAttribute(key, String(value));
          }
        }
        break;
      case 3 /* HoistStyles */:
        const document2 = journal[idx++];
        const head = document2.head;
        const styles = document2.querySelectorAll(QStylesAllSelector);
        for (let i = 0; i < styles.length; i++) {
          head.appendChild(styles[i]);
        }
        break;
      case 4 /* Remove */:
        const removeParent = journal[idx++];
        let nodeToRemove;
        while (idx < length && typeof (nodeToRemove = journal[idx]) !== "number") {
          removeParent.removeChild(nodeToRemove);
          idx++;
        }
        break;
      case 5 /* Insert */:
        const insertParent = journal[idx++];
        const insertBefore = journal[idx++];
        let newChild;
        while (idx < length && typeof (newChild = journal[idx]) !== "number") {
          insertParent.insertBefore(newChild, insertBefore);
          idx++;
        }
        break;
    }
  }
  journal.length = 0;
};
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
var vnode_insertBefore = (journal, parent, newChild, insertBefore) => {
  ensureElementOrVirtualVNode(parent);
  if (vnode_isElementVNode(parent)) {
    ensureMaterialized(parent);
  }
  let adjustedInsertBefore = null;
  if (insertBefore == null) {
    if (vnode_isVirtualVNode(parent)) {
      adjustedInsertBefore = vnode_getDomSibling(parent, true, false);
    }
  } else if (vnode_isVirtualVNode(insertBefore)) {
    adjustedInsertBefore = vnode_getDomSibling(insertBefore, true, true);
  } else {
    adjustedInsertBefore = insertBefore;
  }
  adjustedInsertBefore && vnode_ensureInflatedIfText(journal, adjustedInsertBefore);
  const domParentVNode = vnode_getDomParentVNode(parent);
  const parentNode = domParentVNode && domParentVNode[6 /* element */];
  if (parentNode) {
    const domChildren = vnode_getDomChildrenWithCorrectNamespacesToInsert(
      journal,
      domParentVNode,
      newChild
    );
    domChildren.length && journal.push(
      5 /* Insert */,
      parentNode,
      vnode_getNode(adjustedInsertBefore),
      ...domChildren
    );
  }
  const newChildCurrentParent = newChild[1 /* parent */];
  if (newChildCurrentParent && (newChild[2 /* previousSibling */] || newChild[3 /* nextSibling */] || vnode_isElementVNode(newChildCurrentParent) && newChildCurrentParent !== parent)) {
    vnode_remove(journal, newChildCurrentParent, newChild, false);
  }
  const vNext = insertBefore;
  const vPrevious = vNext ? vNext[2 /* previousSibling */] : parent[5 /* lastChild */];
  if (vNext) {
    vNext[2 /* previousSibling */] = newChild;
  } else {
    parent[5 /* lastChild */] = newChild;
  }
  if (vPrevious) {
    vPrevious[3 /* nextSibling */] = newChild;
  } else {
    parent[4 /* firstChild */] = newChild;
  }
  newChild[2 /* previousSibling */] = vPrevious;
  newChild[3 /* nextSibling */] = vNext;
  newChild[1 /* parent */] = parent;
};
var vnode_getDomParent = (vnode) => {
  vnode = vnode_getDomParentVNode(vnode);
  return vnode && vnode[6 /* element */];
};
var vnode_getDomParentVNode = (vnode) => {
  while (vnode && !vnode_isElementVNode(vnode)) {
    vnode = vnode[1 /* parent */];
  }
  return vnode;
};
var vnode_remove = (journal, vParent, vToRemove, removeDOM) => {
  assertEqual(vParent, vnode_getParent(vToRemove), "Parent mismatch.");
  if (vnode_isTextVNode(vToRemove)) {
    vnode_ensureTextInflated(journal, vToRemove);
  }
  const vPrevious = vToRemove[2 /* previousSibling */];
  const vNext = vToRemove[3 /* nextSibling */];
  if (vPrevious) {
    vPrevious[3 /* nextSibling */] = vNext;
  } else {
    vParent[4 /* firstChild */] = vNext;
  }
  if (vNext) {
    vNext[2 /* previousSibling */] = vPrevious;
  } else {
    vParent[5 /* lastChild */] = vPrevious;
  }
  vToRemove[2 /* previousSibling */] = null;
  vToRemove[3 /* nextSibling */] = null;
  if (removeDOM) {
    const domParent = vnode_getDomParent(vParent);
    const isInnerHTMLParent = vnode_getAttr(vParent, dangerouslySetInnerHTML);
    if (isInnerHTMLParent) {
      return;
    }
    const children = vnode_getDOMChildNodes(journal, vToRemove);
    domParent && children.length && journal.push(4 /* Remove */, domParent, ...children);
  }
};
var vnode_truncate = (journal, vParent, vDelete) => {
  assertDefined(vDelete, "Missing vDelete.");
  const parent = vnode_getDomParent(vParent);
  const children = vnode_getDOMChildNodes(journal, vDelete);
  parent && children.length && journal.push(4 /* Remove */, parent, ...children);
  const vPrevious = vDelete[2 /* previousSibling */];
  if (vPrevious) {
    vPrevious[3 /* nextSibling */] = null;
  } else {
    vParent[4 /* firstChild */] = null;
  }
  vParent[5 /* lastChild */] = vPrevious;
};
var vnode_getElementName = (vnode) => {
  const elementVNode = ensureElementVNode(vnode);
  let elementName = elementVNode[7 /* elementName */];
  if (elementName === void 0) {
    elementName = elementVNode[7 /* elementName */] = elementVNode[6 /* element */].nodeName.toLowerCase();
    elementVNode[0 /* flags */] |= vnode_getElementNamespaceFlags(elementName);
  }
  return elementName;
};
var vnode_getText = (vnode) => {
  const textVNode = ensureTextVNode(vnode);
  let text = textVNode[5 /* text */];
  if (text === void 0) {
    text = textVNode[5 /* text */] = textVNode[4 /* node */].nodeValue;
  }
  return text;
};
var vnode_setText = (journal, textVNode, text) => {
  vnode_ensureTextInflated(journal, textVNode);
  const textNode = textVNode[4 /* node */];
  journal.push(1 /* SetText */, textNode, textVNode[5 /* text */] = text);
};
var vnode_getFirstChild = (vnode) => {
  if (vnode_isTextVNode(vnode)) {
    return null;
  }
  let vFirstChild = vnode[4 /* firstChild */];
  if (vFirstChild === void 0) {
    vFirstChild = ensureMaterialized(vnode);
  }
  return vFirstChild;
};
var vnode_materialize = (vNode) => {
  var _a, _b;
  const element = vNode[6 /* element */];
  const firstChild = fastFirstChild(element);
  const vNodeData = (_b = (_a = element.ownerDocument) == null ? void 0 : _a.qVNodeData) == null ? void 0 : _b.get(element);
  const vFirstChild = vNodeData ? materializeFromVNodeData(vNode, vNodeData, element, firstChild) : materializeFromDOM(vNode, firstChild);
  return vFirstChild;
};
var ensureMaterialized = (vnode) => {
  const vParent = ensureElementVNode(vnode);
  let vFirstChild = vParent[4 /* firstChild */];
  if (vFirstChild === void 0) {
    const element = vParent[6 /* element */];
    if (vParent[1 /* parent */] && shouldIgnoreChildren(element)) {
      vFirstChild = vParent[4 /* firstChild */] = vParent[5 /* lastChild */] = null;
    } else {
      vFirstChild = vnode_materialize(vParent);
    }
  }
  assertTrue(vParent[4 /* firstChild */] !== void 0, "Did not materialize.");
  assertTrue(vParent[5 /* lastChild */] !== void 0, "Did not materialize.");
  return vFirstChild;
};
var _fastHasAttribute = null;
var shouldIgnoreChildren = (node) => {
  if (!_fastHasAttribute) {
    _fastHasAttribute = node.hasAttribute;
  }
  return _fastHasAttribute.call(node, QContainerAttr);
};
var _fastNodeType = null;
var fastNodeType = (node) => {
  if (!_fastNodeType) {
    _fastNodeType = fastGetter(node, "nodeType");
  }
  return _fastNodeType.call(node);
};
var fastIsTextOrElement = (node) => {
  const type = fastNodeType(node);
  return type === /* Node.TEXT_NODE */
  3 || type === /* Node.ELEMENT_NODE */
  1;
};
var _fastNextSibling = null;
var fastNextSibling = (node) => {
  var _a, _b;
  if (!_fastNextSibling) {
    _fastNextSibling = fastGetter(node, "nextSibling");
  }
  if (!_fastFirstChild) {
    _fastFirstChild = fastGetter(node, "firstChild");
  }
  while (node) {
    node = _fastNextSibling.call(node);
    if (node !== null) {
      const type = fastNodeType(node);
      if (type === /* Node.TEXT_NODE */
      3 || type === /* Node.ELEMENT_NODE */
      1) {
        break;
      } else if (type === /* Node.COMMENT_NODE */
      8) {
        const nodeValue = node.nodeValue;
        if (nodeValue == null ? void 0 : nodeValue.startsWith(QIgnore)) {
          return getNodeAfterCommentNode(node, QContainerIsland, _fastNextSibling, _fastFirstChild);
        } else if ((_a = node.nodeValue) == null ? void 0 : _a.startsWith(QContainerIslandEnd)) {
          return getNodeAfterCommentNode(node, QIgnoreEnd, _fastNextSibling, _fastFirstChild);
        } else if (nodeValue == null ? void 0 : nodeValue.startsWith(QContainerAttr)) {
          while (node && (node = _fastNextSibling.call(node))) {
            if (fastNodeType(node) === /* Node.COMMENT_NODE */
            8 && ((_b = node.nodeValue) == null ? void 0 : _b.startsWith(QContainerAttrEnd))) {
              break;
            }
          }
        }
      }
    }
  }
  return node;
};
function getNodeAfterCommentNode(node, commentValue, nextSibling, firstChild) {
  var _a;
  while (node) {
    if ((_a = node.nodeValue) == null ? void 0 : _a.startsWith(commentValue)) {
      node = nextSibling.call(node) || null;
      return node;
    }
    let nextNode = firstChild.call(node);
    if (!nextNode) {
      nextNode = nextSibling.call(node);
    }
    if (!nextNode) {
      nextNode = fastParentNode(node);
      if (nextNode) {
        nextNode = nextSibling.call(nextNode);
      }
    }
    node = nextNode;
  }
  return null;
}
var _fastParentNode = null;
var fastParentNode = (node) => {
  if (!_fastParentNode) {
    _fastParentNode = fastGetter(node, "parentNode");
  }
  return _fastParentNode.call(node);
};
var _fastFirstChild = null;
var fastFirstChild = (node) => {
  if (!_fastFirstChild) {
    _fastFirstChild = fastGetter(node, "firstChild");
  }
  node = node && _fastFirstChild.call(node);
  while (node && !fastIsTextOrElement(node)) {
    node = fastNextSibling(node);
  }
  return node;
};
var fastGetter = (prototype, name) => {
  var _a;
  let getter;
  while (prototype && !(getter = (_a = Object.getOwnPropertyDescriptor(prototype, name)) == null ? void 0 : _a.get)) {
    prototype = Object.getPrototypeOf(prototype);
  }
  return getter || function() {
    return this[name];
  };
};
var isQStyleElement = (node) => {
  return isElement(node) && node.nodeName === "STYLE" && (node.hasAttribute(QScopedStyle) || node.hasAttribute(QStyle));
};
var materializeFromDOM = (vParent, firstChild) => {
  let vFirstChild = null;
  let child = firstChild;
  while (isQStyleElement(child)) {
    child = fastNextSibling(child);
  }
  let vChild = null;
  while (child) {
    const nodeType = fastNodeType(child);
    let vNextChild = null;
    if (nodeType === /* Node.TEXT_NODE */
    3) {
      vNextChild = vnode_newText(child, child.textContent ?? void 0);
    } else if (nodeType === /* Node.ELEMENT_NODE */
    1) {
      vNextChild = vnode_newUnMaterializedElement(child);
    }
    if (vNextChild) {
      vNextChild[1 /* parent */] = vParent;
      vChild && (vChild[3 /* nextSibling */] = vNextChild);
      vNextChild[2 /* previousSibling */] = vChild;
      vChild = vNextChild;
    }
    if (!vFirstChild) {
      vParent[4 /* firstChild */] = vFirstChild = vChild;
    }
    child = fastNextSibling(child);
  }
  vParent[5 /* lastChild */] = vChild || null;
  vParent[4 /* firstChild */] = vFirstChild;
  return vFirstChild;
};
var vnode_getNextSibling = (vnode) => {
  return vnode[3 /* nextSibling */];
};
var vnode_getPreviousSibling = (vnode) => {
  return vnode[2 /* previousSibling */];
};
var vnode_getAttrKeys = (vnode) => {
  const type = vnode[0 /* flags */];
  if ((type & 3 /* ELEMENT_OR_VIRTUAL_MASK */) !== 0) {
    vnode_ensureElementInflated(vnode);
    const keys = [];
    for (let i = vnode_getPropStartIndex(vnode); i < vnode.length; i = i + 2) {
      const key = vnode[i];
      if (!key.startsWith(":")) {
        keys.push(key);
      }
    }
    return keys;
  }
  return [];
};
var vnode_setAttr = (journal, vnode, key, value) => {
  const type = vnode[0 /* flags */];
  if ((type & 3 /* ELEMENT_OR_VIRTUAL_MASK */) !== 0) {
    vnode_ensureElementInflated(vnode);
    const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
    if (idx >= 0) {
      if (vnode[idx + 1] != value && (type & 1 /* Element */) !== 0) {
        const element = vnode[6 /* element */];
        journal && journal.push(2 /* SetAttribute */, element, key, value);
      }
      if (value == null) {
        vnode.splice(idx, 2);
      } else {
        vnode[idx + 1] = value;
      }
    } else if (value != null) {
      vnode.splice(idx ^ -1, 0, key, value);
      if ((type & 1 /* Element */) !== 0) {
        const element = vnode[6 /* element */];
        journal && journal.push(2 /* SetAttribute */, element, key, value);
      }
    }
  }
};
var vnode_getAttr = (vnode, key) => {
  const type = vnode[0 /* flags */];
  if ((type & 3 /* ELEMENT_OR_VIRTUAL_MASK */) !== 0) {
    vnode_ensureElementInflated(vnode);
    return mapArray_get(vnode, key, vnode_getPropStartIndex(vnode));
  }
  return null;
};
var vnode_getProp = (vnode, key, getObject) => {
  const type = vnode[0 /* flags */];
  if ((type & 3 /* ELEMENT_OR_VIRTUAL_MASK */) !== 0) {
    type & 1 /* Element */ && vnode_ensureElementInflated(vnode);
    const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
    if (idx >= 0) {
      let value = vnode[idx + 1];
      if (typeof value === "string" && getObject) {
        vnode[idx + 1] = value = getObject(value);
      }
      return value;
    }
  }
  return null;
};
var vnode_setProp = (vnode, key, value) => {
  ensureElementOrVirtualVNode(vnode);
  const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
  if (idx >= 0) {
    vnode[idx + 1] = value;
  } else if (value != null) {
    vnode.splice(idx ^ -1, 0, key, value);
  }
};
var vnode_getPropStartIndex = (vnode) => {
  const type = vnode[0 /* flags */] & 7 /* TYPE_MASK */;
  if (type === 1 /* Element */) {
    return 8 /* PROPS_OFFSET */;
  } else if (type === 2 /* Virtual */) {
    return 6 /* PROPS_OFFSET */;
  }
  throw throwErrorAndStop("Invalid vnode type.");
};
var vnode_getParent = (vnode) => {
  return vnode[1 /* parent */] || null;
};
var vnode_getNode = (vnode) => {
  if (vnode === null || vnode_isVirtualVNode(vnode)) {
    return null;
  }
  if (vnode_isElementVNode(vnode)) {
    return vnode[6 /* element */];
  }
  assertTrue(vnode_isTextVNode(vnode), "Expecting Text Node.");
  return vnode[4 /* node */];
};
function vnode_toString(depth = 10, offset = "", materialize = false) {
  var _a;
  let vnode = this;
  if (depth === 0) {
    return "...";
  }
  if (vnode === null) {
    return "null";
  }
  if (vnode === void 0) {
    return "undefined";
  }
  const strings = [];
  do {
    if (vnode_isTextVNode(vnode)) {
      strings.push(qwikDebugToString(vnode_getText(vnode)));
    } else if (vnode_isVirtualVNode(vnode)) {
      const idx = vnode[0 /* flags */] >>> 8 /* shift */;
      const attrs = ["[" + String(idx) + "]"];
      vnode_getAttrKeys(vnode).forEach((key) => {
        if (key !== DEBUG_TYPE) {
          const value = vnode_getAttr(vnode, key);
          attrs.push(" " + key + "=" + qwikDebugToString(value));
        }
      });
      const name = VirtualTypeName[vnode_getAttr(vnode, DEBUG_TYPE) || "V" /* Virtual */] || VirtualTypeName["V" /* Virtual */];
      strings.push("<" + name + attrs.join("") + ">");
      const child = vnode_getFirstChild(vnode);
      child && strings.push("  " + vnode_toString.call(child, depth - 1, offset + "  ", true));
      strings.push("</" + name + ">");
    } else if (vnode_isElementVNode(vnode)) {
      const tag = vnode_getElementName(vnode);
      const attrs = [];
      const keys = vnode_getAttrKeys(vnode);
      keys.forEach((key) => {
        const value = vnode_getAttr(vnode, key);
        attrs.push(" " + key + "=" + qwikDebugToString(value));
      });
      const node = vnode_getNode(vnode);
      if (node) {
        const vnodeData = (_a = node.ownerDocument.qVNodeData) == null ? void 0 : _a.get(node);
        if (vnodeData) {
          attrs.push(" q:vnodeData=" + qwikDebugToString(vnodeData));
        }
      }
      const domAttrs = node.attributes;
      for (let i = 0; i < domAttrs.length; i++) {
        const attr = domAttrs[i];
        if (keys.indexOf(attr.name) === -1) {
          attrs.push(" " + attr.name + (attr.value ? "=" + qwikDebugToString(attr.value) : ""));
        }
      }
      strings.push("<" + tag + attrs.join("") + ">");
      if (vnode_isMaterialized(vnode) || materialize) {
        const child = vnode_getFirstChild(vnode);
        child && strings.push("  " + vnode_toString.call(child, depth - 1, offset + "  ", true));
      } else {
        strings.push("  <!-- not materialized --!>");
      }
      strings.push("</" + tag + ">");
    }
    vnode = vnode_getNextSibling(vnode) || null;
  } while (vnode);
  return strings.join("\n" + offset);
}
var isNumber = (ch) => (
  /* `0` */
  48 <= ch && ch <= 57
);
var isLowercase = (ch) => (
  /* `a` */
  97 <= ch && ch <= 122
);
var stack = [];
function materializeFromVNodeData(vParent, vData, element, child) {
  let idx = 0;
  let nextToConsumeIdx = 0;
  let vFirst = null;
  let vLast = null;
  let previousTextNode = null;
  let ch = 0;
  let peekCh = 0;
  const peek = () => {
    if (peekCh !== 0) {
      return peekCh;
    } else {
      return peekCh = nextToConsumeIdx < vData.length ? vData.charCodeAt(nextToConsumeIdx) : 0;
    }
  };
  const consume = () => {
    ch = peek();
    peekCh = 0;
    nextToConsumeIdx++;
    return ch;
  };
  const addVNode = (node) => {
    node[0 /* flags */] = node[0 /* flags */] & 255 /* negated_mask */ | idx << 8 /* shift */;
    idx++;
    vLast && (vLast[3 /* nextSibling */] = node);
    node[2 /* previousSibling */] = vLast;
    node[1 /* parent */] = vParent;
    if (!vFirst) {
      vParent[4 /* firstChild */] = vFirst = node;
    }
    vLast = node;
  };
  const consumeValue = () => {
    consume();
    const start = nextToConsumeIdx;
    while (peek() <= 58 && peekCh !== 0 || peekCh === 95 || peekCh >= 65 && peekCh <= 90 || peekCh >= 97 && peekCh <= 122) {
      consume();
    }
    return vData.substring(start, nextToConsumeIdx);
  };
  let textIdx = 0;
  let combinedText = null;
  let container = null;
  while (peek() !== 0) {
    if (isNumber(peek())) {
      while (!isElement(child)) {
        child = fastNextSibling(child);
        if (!child) {
          throwErrorAndStop(
            "Materialize error: missing element: " + vData + " " + peek() + " " + nextToConsumeIdx
          );
        }
      }
      while (isQStyleElement(child)) {
        child = fastNextSibling(child);
      }
      combinedText = null;
      previousTextNode = null;
      let value = 0;
      while (isNumber(peek())) {
        value *= 10;
        value += consume() - 48;
      }
      while (value--) {
        addVNode(vnode_newUnMaterializedElement(child));
        child = fastNextSibling(child);
      }
    } else if (peek() === VNodeDataChar.SCOPED_STYLE) {
      vnode_setAttr(null, vParent, QScopedStyle, consumeValue());
    } else if (peek() === VNodeDataChar.RENDER_FN) {
      vnode_setAttr(null, vParent, OnRenderProp, consumeValue());
    } else if (peek() === VNodeDataChar.ID) {
      if (!container) {
        container = getDomContainer(element);
      }
      const id = consumeValue();
      container.$setRawState$(parseInt(id), vParent);
      import_build6.isDev && vnode_setAttr(null, vParent, ELEMENT_ID, id);
    } else if (peek() === VNodeDataChar.PROPS) {
      vnode_setAttr(null, vParent, ELEMENT_PROPS, consumeValue());
    } else if (peek() === VNodeDataChar.SLOT_REF) {
      vnode_setAttr(null, vParent, QSlotRef, consumeValue());
    } else if (peek() === VNodeDataChar.KEY) {
      vnode_setAttr(null, vParent, ELEMENT_KEY, consumeValue());
    } else if (peek() === VNodeDataChar.SEQ) {
      vnode_setAttr(null, vParent, ELEMENT_SEQ, consumeValue());
    } else if (peek() === VNodeDataChar.SEQ_IDX) {
      vnode_setAttr(null, vParent, ELEMENT_SEQ_IDX, consumeValue());
    } else if (peek() === VNodeDataChar.CONTEXT) {
      vnode_setAttr(null, vParent, QCtxAttr, consumeValue());
    } else if (peek() === VNodeDataChar.OPEN) {
      consume();
      addVNode(vnode_newVirtual());
      stack.push(vParent, vFirst, vLast, previousTextNode, idx);
      idx = 0;
      vParent = vLast;
      vFirst = vLast = null;
    } else if (peek() === VNodeDataChar.SEPARATOR) {
      const key = consumeValue();
      const value = consumeValue();
      vnode_setAttr(null, vParent, key, value);
    } else if (peek() === VNodeDataChar.CLOSE) {
      consume();
      vParent[5 /* lastChild */] = vLast;
      idx = stack.pop();
      previousTextNode = stack.pop();
      vLast = stack.pop();
      vFirst = stack.pop();
      vParent = stack.pop();
    } else if (peek() === VNodeDataChar.SLOT) {
      vnode_setAttr(null, vParent, QSlot, consumeValue());
    } else {
      const textNode = child && fastNodeType(child) === /* Node.TEXT_NODE */
      3 ? child : null;
      if (combinedText === null) {
        combinedText = textNode ? textNode.nodeValue : null;
        textIdx = 0;
      }
      let length = 0;
      while (isLowercase(peek())) {
        length += consume() - 97;
        length *= 26;
      }
      length += consume() - 65;
      const text = combinedText === null ? "" : combinedText.substring(textIdx, textIdx + length);
      addVNode(
        previousTextNode = vnode_newSharedText(previousTextNode, textNode, text)
      );
      textIdx += length;
    }
  }
  vParent[5 /* lastChild */] = vLast;
  return vFirst;
}
var vnode_getType = (vnode) => {
  const type = vnode[0 /* flags */];
  if (type & 1 /* Element */) {
    return 1;
  } else if (type & 2 /* Virtual */) {
    return 11;
  } else if (type & 4 /* Text */) {
    return 3;
  }
  throw throwErrorAndStop("Unknown vnode type: " + type);
};
var isElement = (node) => node && typeof node == "object" && fastNodeType(node) === /** Node.ELEMENT_NODE* */
1;
var aPath = [];
var bPath = [];
var vnode_documentPosition = (a, b) => {
  if (a === b) {
    return 0;
  }
  let aDepth = -1;
  let bDepth = -1;
  while (a) {
    a = (aPath[++aDepth] = a)[1 /* parent */];
  }
  while (b) {
    b = (bPath[++bDepth] = b)[1 /* parent */];
  }
  while (aDepth >= 0 && bDepth >= 0) {
    a = aPath[aDepth];
    b = bPath[bDepth];
    if (a === b) {
      aDepth--;
      bDepth--;
    } else {
      let cursor = b;
      do {
        cursor = vnode_getNextSibling(cursor);
        if (cursor === a) {
          return 1;
        }
      } while (cursor);
      cursor = b;
      do {
        cursor = vnode_getPreviousSibling(cursor);
        if (cursor === a) {
          return -1;
        }
      } while (cursor);
      return 1;
    }
  }
  return aDepth < bDepth ? -1 : 1;
};
var vnode_getProjectionParentComponent = (vHost, rootVNode) => {
  let projectionDepth = 1;
  while (projectionDepth--) {
    while (vHost && (vnode_isVirtualVNode(vHost) ? vnode_getProp(vHost, OnRenderProp, null) === null : true)) {
      const qSlotParentProp = vnode_getProp(vHost, QSlotParent, null);
      const qSlotParent = qSlotParentProp && (typeof qSlotParentProp === "string" ? vnode_locate(rootVNode, qSlotParentProp) : qSlotParentProp);
      const vProjectionParent = vnode_isVirtualVNode(vHost) && qSlotParent;
      if (vProjectionParent) {
        projectionDepth++;
      }
      vHost = vProjectionParent || vnode_getParent(vHost);
    }
    if (projectionDepth > 0) {
      vHost = vnode_getParent(vHost);
    }
  }
  return vHost;
};
var VNodeArray = class VNode extends Array {
  static createElement(flags, parent, previousSibling, nextSibling, firstChild, lastChild, element, elementName) {
    const vnode = new VNode(flags, parent, previousSibling, nextSibling);
    vnode.push(firstChild, lastChild, element, elementName);
    return vnode;
  }
  static createText(flags, parent, previousSibling, nextSibling, textNode, text) {
    const vnode = new VNode(flags, parent, previousSibling, nextSibling);
    vnode.push(textNode, text);
    return vnode;
  }
  static createVirtual(flags, parent, previousSibling, nextSibling, firstChild, lastChild) {
    const vnode = new VNode(flags, parent, previousSibling, nextSibling);
    vnode.push(firstChild, lastChild);
    return vnode;
  }
  constructor(flags, parent, previousSibling, nextSibling) {
    super();
    this.push(flags, parent, previousSibling, nextSibling);
    if (import_build6.isDev) {
      this.toString = vnode_toString;
    }
  }
};

// packages/qwik/src/core/use/use-core.ts
var _context;
var tryGetInvokeContext = () => {
  if (!_context) {
    const context = typeof document !== "undefined" && document && document.__q_context__;
    if (!context) {
      return void 0;
    }
    if (isArray(context)) {
      return document.__q_context__ = newInvokeContextFromTuple(context);
    }
    return context;
  }
  return _context;
};
function invoke(context, fn, ...args) {
  return invokeApply.call(this, context, fn, args);
}
function invokeApply(context, fn, args) {
  const previousContext = _context;
  let returnValue;
  try {
    _context = context;
    returnValue = fn.apply(this, args);
  } finally {
    _context = previousContext;
  }
  return returnValue;
}
var newInvokeContextFromTuple = ([element, event, url]) => {
  const container = element.closest(QContainerSelector);
  const locale = (container == null ? void 0 : container.getAttribute(QLocaleAttr)) || void 0;
  locale && setLocale(locale);
  return newInvokeContext(locale, void 0, element, event, url);
};
var newInvokeContext = (locale, hostElement, element, event, url) => {
  const $locale$ = locale || (typeof event === "object" && event && "locale" in event ? event.locale : void 0);
  const ctx = {
    $url$: url,
    $i$: 0,
    $hostElement$: hostElement,
    $element$: element,
    $event$: event,
    $qrl$: void 0,
    $effectSubscriber$: void 0,
    $locale$,
    $container$: void 0
  };
  seal(ctx);
  return ctx;
};
var untrack = (fn) => {
  return invoke(void 0, fn);
};
var trackInvocation = /* @__PURE__ */ newInvokeContext(
  void 0,
  void 0,
  void 0,
  RenderEvent
);
var trackSignal = (fn, subscriber, property, container, data) => {
  const previousSubscriber = trackInvocation.$effectSubscriber$;
  const previousContainer = trackInvocation.$container$;
  try {
    trackInvocation.$effectSubscriber$ = [subscriber, property];
    if (data) {
      trackInvocation.$effectSubscriber$.push(data);
    }
    trackInvocation.$container$ = container;
    return invoke(trackInvocation, fn);
  } finally {
    trackInvocation.$effectSubscriber$ = previousSubscriber;
    trackInvocation.$container$ = previousContainer;
  }
};

// packages/qwik/src/core/use/use-context.ts
var createContextId = (name) => {
  assertTrue(/^[\w/.-]+$/.test(name), "Context name must only contain A-Z,a-z,0-9, _", name);
  return /* @__PURE__ */ Object.freeze({
    id: fromCamelToKebabCase(name)
  });
};

// packages/qwik/src/core/shared/error/error-handling.ts
var ERROR_CONTEXT = /* @__PURE__ */ createContextId("qk-error");
var isRecoverable = (err) => {
  if (err && err instanceof Error) {
    if ("plugin" in err) {
      return false;
    }
  }
  return true;
};

// packages/qwik/src/core/client/process-vnode-data.ts
function processVNodeData(document2) {
  const Q_CONTAINER = "q:container";
  const Q_CONTAINER_END = "/" + Q_CONTAINER;
  const Q_PROPS_SEPARATOR2 = ":";
  const Q_SHADOW_ROOT = "q:shadowroot";
  const Q_IGNORE = "q:ignore";
  const Q_IGNORE_END = "/" + Q_IGNORE;
  const Q_CONTAINER_ISLAND = "q:container-island";
  const Q_CONTAINER_ISLAND_END = "/" + Q_CONTAINER_ISLAND;
  const qDocument = document2;
  const vNodeDataMap = qDocument.qVNodeData || (qDocument.qVNodeData = /* @__PURE__ */ new WeakMap());
  const prototype = document2.body;
  const getter = (prototype2, name) => {
    var _a;
    let getter2;
    while (prototype2 && !(getter2 = (_a = Object.getOwnPropertyDescriptor(prototype2, name)) == null ? void 0 : _a.get)) {
      prototype2 = Object.getPrototypeOf(prototype2);
    }
    return getter2 || function() {
      return this[name];
    };
  };
  const getAttribute = prototype.getAttribute;
  const hasAttribute = prototype.hasAttribute;
  const getNodeType = getter(prototype, "nodeType");
  const attachVnodeDataAndRefs = (element) => {
    Array.from(element.querySelectorAll('script[type="qwik/vnode"]')).forEach((script) => {
      script.setAttribute("type", "x-qwik/vnode");
      const qContainerElement = script.closest("[q\\:container]");
      qContainerElement.qVnodeData = script.textContent;
      qContainerElement.qVNodeRefs = /* @__PURE__ */ new Map();
    });
    element.querySelectorAll("[q\\:shadowroot]").forEach((parent) => {
      const shadowRoot = parent.shadowRoot;
      shadowRoot && attachVnodeDataAndRefs(shadowRoot);
    });
  };
  attachVnodeDataAndRefs(document2);
  let NodeType;
  ((NodeType2) => {
    NodeType2[NodeType2["CONTAINER_MASK"] = 1] = "CONTAINER_MASK";
    NodeType2[NodeType2["ELEMENT"] = 2] = "ELEMENT";
    NodeType2[NodeType2["ELEMENT_CONTAINER"] = 3] = "ELEMENT_CONTAINER";
    NodeType2[NodeType2["ELEMENT_SHADOW_ROOT"] = 6] = "ELEMENT_SHADOW_ROOT";
    NodeType2[NodeType2["COMMENT_SKIP_START"] = 5] = "COMMENT_SKIP_START";
    NodeType2[NodeType2["COMMENT_SKIP_END"] = 8] = "COMMENT_SKIP_END";
    NodeType2[NodeType2["COMMENT_IGNORE_START"] = 16] = "COMMENT_IGNORE_START";
    NodeType2[NodeType2["COMMENT_IGNORE_END"] = 32] = "COMMENT_IGNORE_END";
    NodeType2[NodeType2["COMMENT_ISLAND_START"] = 65] = "COMMENT_ISLAND_START";
    NodeType2[NodeType2["COMMENT_ISLAND_END"] = 128] = "COMMENT_ISLAND_END";
    NodeType2[NodeType2["OTHER"] = 0] = "OTHER";
  })(NodeType || (NodeType = {}));
  const getFastNodeType = (node) => {
    const nodeType = getNodeType.call(node);
    if (nodeType === 1) {
      const qContainer = getAttribute.call(node, Q_CONTAINER);
      if (qContainer === null) {
        if (hasAttribute.call(node, Q_SHADOW_ROOT)) {
          return 6 /* ELEMENT_SHADOW_ROOT */;
        }
        const isQElement = hasAttribute.call(node, Q_PROPS_SEPARATOR2);
        return isQElement ? 2 /* ELEMENT */ : 0 /* OTHER */;
      } else {
        return 3 /* ELEMENT_CONTAINER */;
      }
    } else if (nodeType === 8) {
      const nodeValue = node.nodeValue || "";
      if (nodeValue.startsWith(Q_CONTAINER_ISLAND)) {
        return 65 /* COMMENT_ISLAND_START */;
      } else if (nodeValue.startsWith(Q_IGNORE)) {
        return 16 /* COMMENT_IGNORE_START */;
      } else if (nodeValue.startsWith(Q_CONTAINER)) {
        return 5 /* COMMENT_SKIP_START */;
      } else if (nodeValue.startsWith(Q_CONTAINER_ISLAND_END)) {
        return 128 /* COMMENT_ISLAND_END */;
      } else if (nodeValue.startsWith(Q_IGNORE_END)) {
        return 32 /* COMMENT_IGNORE_END */;
      } else if (nodeValue.startsWith(Q_CONTAINER_END)) {
        return 8 /* COMMENT_SKIP_END */;
      }
    }
    return 0 /* OTHER */;
  };
  const isSeparator = (ch) => (
    /* `!` */
    VNodeDataSeparator.ADVANCE_1 <= ch && ch <= VNodeDataSeparator.ADVANCE_8192
  );
  const findVDataSectionEnd = (vData, start, end) => {
    let depth = 0;
    while (true) {
      if (start < end) {
        const ch = vData.charCodeAt(start);
        if (depth === 0 && isSeparator(ch)) {
          break;
        } else {
          if (ch === VNodeDataChar.OPEN) {
            depth++;
          } else if (ch === VNodeDataChar.CLOSE) {
            depth--;
          }
          start++;
        }
      } else {
        break;
      }
    }
    return start;
  };
  const nextSibling = (node) => {
    while (node && (node = node.nextSibling) && getFastNodeType(node) === 0 /* OTHER */) {
    }
    return node;
  };
  const firstChild = (node) => {
    while (node && (node = node.firstChild) && getFastNodeType(node) === 0 /* OTHER */) {
    }
    return node;
  };
  const walkContainer = (walker2, containerNode, node, exitNode, vData, qVNodeRefs, prefix) => {
    const vData_length = vData.length;
    let elementIdx = 0;
    let vNodeElementIndex = -1;
    let vData_start = 0;
    let vData_end = 0;
    let ch = 0;
    let needsToStoreRef = -1;
    let nextNode = null;
    const howManyElementsToSkip = () => {
      let elementsToSkip = 0;
      while (isSeparator(ch = vData.charCodeAt(vData_start))) {
        elementsToSkip += 1 << ch - VNodeDataSeparator.ADVANCE_1;
        vData_start++;
        if (vData_start >= vData_length) {
          break;
        }
      }
      return elementsToSkip;
    };
    do {
      if (node === exitNode) {
        return;
      }
      nextNode = null;
      const nodeType = node == containerNode ? 2 /* ELEMENT */ : getFastNodeType(node);
      if (nodeType === 3 /* ELEMENT_CONTAINER */) {
        const container = node;
        let cursor = node;
        while (cursor && !(nextNode = nextSibling(cursor))) {
          cursor = cursor.parentNode;
        }
        walkContainer(
          walker2,
          container,
          node,
          nextNode,
          container.qVnodeData || "",
          container.qVNodeRefs,
          prefix + "  "
        );
      } else if (nodeType === 16 /* COMMENT_IGNORE_START */) {
        let islandNode = node;
        do {
          islandNode = walker2.nextNode();
          if (!islandNode) {
            throw new Error(`Island inside <!--${node == null ? void 0 : node.nodeValue}--> not found!`);
          }
        } while (getFastNodeType(islandNode) !== 65 /* COMMENT_ISLAND_START */);
        nextNode = null;
      } else if (nodeType === 128 /* COMMENT_ISLAND_END */) {
        nextNode = node;
        do {
          nextNode = walker2.nextNode();
          if (!nextNode) {
            throw new Error(`Ignore block not closed!`);
          }
        } while (getFastNodeType(nextNode) !== 32 /* COMMENT_IGNORE_END */);
        nextNode = null;
      } else if (nodeType === 5 /* COMMENT_SKIP_START */) {
        nextNode = node;
        do {
          nextNode = nextSibling(nextNode);
          if (!nextNode) {
            throw new Error(`<!--${node == null ? void 0 : node.nodeValue}--> not closed!`);
          }
        } while (getFastNodeType(nextNode) !== 8 /* COMMENT_SKIP_END */);
        walkContainer(walker2, node, node, nextNode, "", null, prefix + "  ");
      } else if (nodeType === 6 /* ELEMENT_SHADOW_ROOT */) {
        nextNode = nextSibling(node);
        const shadowRootContainer = node;
        const shadowRoot = shadowRootContainer == null ? void 0 : shadowRootContainer.shadowRoot;
        if (shadowRoot) {
          walkContainer(
            // we need to create a new walker for the shadow root
            document2.createTreeWalker(
              shadowRoot,
              1 | 128
              /*  NodeFilter.SHOW_COMMENT */
            ),
            null,
            firstChild(shadowRoot),
            null,
            "",
            null,
            prefix + "  "
          );
        }
      }
      if ((nodeType & 2 /* ELEMENT */) === 2 /* ELEMENT */) {
        if (vNodeElementIndex < elementIdx) {
          if (vNodeElementIndex === -1) {
            vNodeElementIndex = 0;
          }
          vData_start = vData_end;
          if (vData_start < vData_length) {
            vNodeElementIndex += howManyElementsToSkip();
            const shouldStoreRef = ch === VNodeDataSeparator.REFERENCE;
            if (shouldStoreRef) {
              needsToStoreRef = vNodeElementIndex;
              vData_start++;
              if (vData_start < vData_length) {
                ch = vData.charCodeAt(vData_end);
              } else {
                ch = VNodeDataSeparator.ADVANCE_1;
              }
            }
            vData_end = findVDataSectionEnd(vData, vData_start, vData_length);
          } else {
            vNodeElementIndex = Number.MAX_SAFE_INTEGER;
          }
        }
        if (elementIdx === vNodeElementIndex) {
          if (needsToStoreRef === elementIdx) {
            qVNodeRefs.set(elementIdx, node);
          }
          const instructions = vData.substring(vData_start, vData_end);
          vNodeDataMap.set(node, instructions);
        }
        elementIdx++;
      }
    } while (node = nextNode || walker2.nextNode());
  };
  const walker = document2.createTreeWalker(
    document2,
    1 | 128
    /*  NodeFilter.SHOW_COMMENT */
  );
  walkContainer(walker, null, walker.firstChild(), null, "", null, "");
}

// packages/qwik/src/core/client/dom-container.ts
function getDomContainer(element) {
  const qContainerElement = _getQContainerElement(element);
  if (!qContainerElement) {
    throwErrorAndStop("Unable to find q:container.");
  }
  return getDomContainerFromQContainerElement(qContainerElement);
}
function getDomContainerFromQContainerElement(qContainerElement) {
  const qElement = qContainerElement;
  let container = qElement.qContainer;
  if (!container) {
    container = new DomContainer(qElement);
    const containerAttributes = {};
    if (qElement) {
      const attrs = qElement.attributes;
      if (attrs) {
        for (let index = 0; index < attrs.length; index++) {
          const attr = attrs[index];
          if (attr.name === Q_PROPS_SEPARATOR) {
            continue;
          }
          containerAttributes[attr.name] = attr.value;
        }
      }
    }
    container.$serverData$ = { containerAttributes };
    qElement.qContainer = container;
  }
  return container;
}
function _getQContainerElement(element) {
  const qContainerElement = Array.isArray(element) ? vnode_getDomParent(element) : element;
  return qContainerElement.closest(QContainerSelector);
}
var isDomContainer = (container) => {
  return container instanceof DomContainer;
};
var DomContainer = class extends _SharedContainer {
  constructor(element) {
    super(
      () => this.scheduleRender(),
      () => vnode_applyJournal(this.$journal$),
      {},
      element.getAttribute("q:locale")
    );
    this.renderDone = null;
    this.$storeProxyMap$ = /* @__PURE__ */ new WeakMap();
    this.$styleIds$ = null;
    this.$vnodeLocate$ = (id) => vnode_locate(this.rootVNode, id);
    this.$renderCount$ = 0;
    this.$getObjectById$ = (id) => {
      if (typeof id === "string") {
        id = parseFloat(id);
      }
      assertTrue(
        id < this.$rawStateData$.length / 2,
        `Invalid reference: ${id} >= ${this.$rawStateData$.length / 2}`
      );
      return this.stateData[id];
    };
    this.qContainer = element.getAttribute(QContainerAttr);
    if (!this.qContainer) {
      throwErrorAndStop("Element must have 'q:container' attribute.");
    }
    this.$journal$ = [
      // The first time we render we need to hoist the styles.
      // (Meaning we need to move all styles from component inline to <head>)
      // We bulk move all of the styles, because the expensive part is
      // for the browser to recompute the styles, (not the actual DOM manipulation.)
      // By moving all of them at once we can minimize the reflow.
      3 /* HoistStyles */,
      element.ownerDocument
    ];
    this.document = element.ownerDocument;
    this.element = element;
    this.qBase = element.getAttribute(QBaseAttr);
    this.$instanceHash$ = element.getAttribute(QInstanceAttr);
    this.qManifestHash = element.getAttribute("q:manifest-hash");
    this.rootVNode = vnode_newUnMaterializedElement(this.element);
    this.$rawStateData$ = null;
    this.stateData = null;
    const document2 = this.element.ownerDocument;
    if (!document2.qVNodeData) {
      processVNodeData(document2);
    }
    this.$rawStateData$ = [];
    this.stateData = [];
    const qwikStates = element.querySelectorAll('script[type="qwik/state"]');
    if (qwikStates.length !== 0) {
      const lastState = qwikStates[qwikStates.length - 1];
      this.$rawStateData$ = JSON.parse(lastState.textContent);
      this.stateData = wrapDeserializerProxy(this, this.$rawStateData$);
    }
    this.$qFuncs$ = getQFuncs(document2, this.$instanceHash$) || EMPTY_ARRAY;
  }
  $setRawState$(id, vParent) {
    this.stateData[id] = vParent;
  }
  parseQRL(qrl) {
    return inflateQRL(this, parseQRL(qrl));
  }
  processJsx(host, jsx2) {
    const styleScopedId = this.getHostProp(host, QScopedStyle);
    return vnode_diff(this, jsx2, host, addComponentStylePrefix(styleScopedId));
  }
  handleError(err, host) {
    if (qDev) {
      if (typeof document !== "undefined") {
        const vHost = host;
        const errorDiv = document.createElement("errored-host");
        if (err && err instanceof Error) {
          errorDiv.props = { error: err };
        }
        errorDiv.setAttribute("q:key", "_error_");
        const journal = [];
        vnode_getDOMChildNodes(journal, vHost).forEach((child) => errorDiv.appendChild(child));
        const vErrorDiv = vnode_newElement(errorDiv, "error-host");
        vnode_insertBefore(journal, vHost, vErrorDiv, null);
        vnode_applyJournal(journal);
      }
      if (err && err instanceof Error) {
        if (!("hostElement" in err)) {
          err["hostElement"] = host;
        }
      }
      if (!isRecoverable(err)) {
        throw err;
      }
    }
    const errorStore = this.resolveContext(host, ERROR_CONTEXT);
    if (!errorStore) {
      throw err;
    }
    errorStore.error = err;
  }
  setContext(host, context, value) {
    let ctx = this.getHostProp(host, QCtxAttr);
    if (!ctx) {
      this.setHostProp(host, QCtxAttr, ctx = []);
    }
    mapArray_set(ctx, context.id, value, 0);
  }
  resolveContext(host, contextId) {
    while (host) {
      const ctx = this.getHostProp(host, QCtxAttr);
      if (ctx) {
        const value = mapArray_get(ctx, contextId.id, 0);
        if (value) {
          return value;
        }
      }
      host = this.getParentHost(host);
    }
    return void 0;
  }
  getParentHost(host) {
    let vNode = vnode_getParent(host);
    while (vNode) {
      if (vnode_isVirtualVNode(vNode)) {
        if (vnode_getProp(vNode, OnRenderProp, null) !== null) {
          return vNode;
        }
        const parent = vnode_getProp(vNode, QSlotParent, this.$vnodeLocate$);
        if (parent) {
          vNode = parent;
          continue;
        }
      }
      vNode = vnode_getParent(vNode);
    }
    return null;
  }
  setHostProp(host, name, value) {
    const vNode = host;
    vnode_setProp(vNode, name, value);
  }
  getHostProp(host, name) {
    const vNode = host;
    let getObjectById = null;
    switch (name) {
      case ELEMENT_SEQ:
      case ELEMENT_PROPS:
      case OnRenderProp:
      case QCtxAttr:
      case QSubscribers:
        getObjectById = this.$getObjectById$;
        break;
      case ELEMENT_SEQ_IDX:
      case USE_ON_LOCAL_SEQ_IDX:
        getObjectById = parseInt;
        break;
    }
    return vnode_getProp(vNode, name, getObjectById);
  }
  scheduleRender() {
    this.$renderCount$++;
    this.renderDone ||= getPlatform().nextTick(() => this.processChores());
    return this.renderDone;
  }
  processChores() {
    let renderCount = this.$renderCount$;
    const result = this.$scheduler$(127 /* WAIT_FOR_ALL */);
    if (isPromise(result)) {
      return result.then(async () => {
        while (renderCount !== this.$renderCount$) {
          renderCount = this.$renderCount$;
          await this.$scheduler$(127 /* WAIT_FOR_ALL */);
        }
        this.renderDone = null;
      });
    }
    if (renderCount !== this.$renderCount$) {
      this.processChores();
      return;
    }
    this.renderDone = null;
  }
  ensureProjectionResolved(vNode) {
    if ((vNode[0 /* flags */] & 16 /* Resolved */) === 0) {
      vNode[0 /* flags */] |= 16 /* Resolved */;
      for (let i = vnode_getPropStartIndex(vNode); i < vNode.length; i = i + 2) {
        const prop = vNode[i];
        if (isSlotProp(prop)) {
          const value = vNode[i + 1];
          if (typeof value == "string") {
            vNode[i + 1] = this.$vnodeLocate$(value);
          }
        }
      }
    }
  }
  getSyncFn(id) {
    const fn = this.$qFuncs$[id];
    assertTrue(typeof fn === "function", "Invalid reference: " + id);
    return fn;
  }
  $appendStyle$(content, styleId, host, scoped) {
    if (scoped) {
      const scopedStyleIdsString = this.getHostProp(host, QScopedStyle);
      const scopedStyleIds = new Set(convertScopedStyleIdsToArray(scopedStyleIdsString));
      scopedStyleIds.add(styleId);
      this.setHostProp(host, QScopedStyle, convertStyleIdsToString(scopedStyleIds));
    }
    if (this.$styleIds$ == null) {
      this.$styleIds$ = /* @__PURE__ */ new Set();
      this.element.querySelectorAll(QStyleSelector).forEach((style) => {
        this.$styleIds$.add(style.getAttribute(QStyle));
      });
    }
    if (!this.$styleIds$.has(styleId)) {
      this.$styleIds$.add(styleId);
      const styleElement = this.document.createElement("style");
      styleElement.setAttribute(QStyle, styleId);
      styleElement.textContent = content;
      this.$journal$.push(5 /* Insert */, this.document.head, null, styleElement);
    }
  }
};

// packages/qwik/src/core/shared/shared-serialization.ts
var deserializedProxyMap = /* @__PURE__ */ new WeakMap();
var unwrapDeserializerProxy = (value) => {
  const unwrapped = typeof value === "object" && value !== null && value[SERIALIZER_PROXY_UNWRAP];
  return unwrapped ? unwrapped : value;
};
var isDeserializerProxy = (value) => {
  return typeof value === "object" && value !== null && SERIALIZER_PROXY_UNWRAP in value;
};
var SERIALIZER_PROXY_UNWRAP = Symbol("UNWRAP");
var wrapDeserializerProxy = (container, data) => {
  if (!Array.isArray(data) || // must be an array
  vnode_isVNode(data) || // and not a VNode or Slot
  isDeserializerProxy(data)) {
    return data;
  }
  let proxy = deserializedProxyMap.get(data);
  if (!proxy) {
    const target = Array(data.length / 2).fill(void 0);
    proxy = new Proxy(target, new DeserializationHandler(container, data));
    deserializedProxyMap.set(data, proxy);
  }
  return proxy;
};
var DeserializationHandler = class {
  constructor($container$, $data$) {
    this.$container$ = $container$;
    this.$data$ = $data$;
    this.$length$ = this.$data$.length / 2;
  }
  get(target, property, receiver) {
    if (property === SERIALIZER_PROXY_UNWRAP) {
      return target;
    }
    const i = typeof property === "number" ? property : typeof property === "string" ? parseInt(property, 10) : NaN;
    if (Number.isNaN(i) || i < 0 || i >= this.$length$) {
      const out = Reflect.get(target, property, receiver);
      return out;
    }
    const idx = i * 2;
    const typeId = this.$data$[idx];
    const value = this.$data$[idx + 1];
    if (typeId === void 0) {
      return value;
    }
    const container = this.$container$;
    const propValue = allocate(container, typeId, value);
    Reflect.set(target, property, propValue);
    this.$data$[idx] = void 0;
    this.$data$[idx + 1] = propValue;
    if (typeId >= 12 /* Error */) {
      inflate(container, propValue, typeId, value);
    }
    return propValue;
  }
  has(target, property) {
    if (property === SERIALIZER_PROXY_UNWRAP) {
      return true;
    }
    return Object.prototype.hasOwnProperty.call(target, property);
  }
  set(target, property, value, receiver) {
    if (property === SERIALIZER_PROXY_UNWRAP) {
      return false;
    }
    const out = Reflect.set(target, property, value, receiver);
    const i = typeof property === "number" ? property : parseInt(property, 10);
    if (Number.isNaN(i) || i < 0 || i >= this.$data$.length / 2) {
      return out;
    }
    const idx = i * 2;
    this.$data$[idx] = void 0;
    this.$data$[idx + 1] = value;
    return true;
  }
};
var _eagerDeserializeArray = (container, data) => {
  const out = Array(data.length / 2);
  for (let i = 0; i < data.length; i += 2) {
    out[i / 2] = deserializeData(container, data[i], data[i + 1]);
  }
  return out;
};
var resolvers = /* @__PURE__ */ new WeakMap();
var inflate = (container, target, typeId, data) => {
  var _a;
  if (typeId === void 0) {
    return;
  }
  if (typeId !== 13 /* Object */ && Array.isArray(data)) {
    data = _eagerDeserializeArray(container, data);
  }
  switch (typeId) {
    case 13 /* Object */:
      for (let i2 = 0; i2 < data.length; i2 += 4) {
        const key = deserializeData(
          container,
          data[i2],
          data[i2 + 1]
        );
        const valType = data[i2 + 2];
        const valData = data[i2 + 3];
        if (valType === 0 /* RootRef */ || valType >= 12 /* Error */) {
          Object.defineProperty(target, key, {
            get() {
              return deserializeData(container, valType, valData);
            },
            set(value) {
              Object.defineProperty(target, key, {
                value,
                writable: true,
                enumerable: true,
                configurable: true
              });
            },
            enumerable: true,
            configurable: true
          });
        } else {
          target[key] = deserializeData(container, valType, valData);
        }
      }
      break;
    case 18 /* QRL */:
      inflateQRL(container, target);
      break;
    case 19 /* Task */:
      const task = target;
      const v = data;
      task.$qrl$ = inflateQRL(container, v[0]);
      task.$flags$ = v[1];
      task.$index$ = v[2];
      task.$el$ = v[3];
      task.$effectDependencies$ = v[4];
      task.$state$ = v[5];
      break;
    case 20 /* Resource */:
      const [resolved, result, effects] = data;
      const resource = target;
      if (resolved) {
        resource.value = Promise.resolve(result);
        resource._resolved = result;
        resource._state = "resolved";
      } else {
        resource.value = Promise.reject(result);
        resource._error = result;
        resource._state = "rejected";
      }
      getStoreHandler(target).$effects$ = effects;
      break;
    case 21 /* Component */:
      target[SERIALIZABLE_STATE][0] = data[0];
      break;
    case 25 /* Store */:
    case 26 /* StoreArray */: {
      const [value, flags, effects2, storeEffect] = data;
      const handler = getStoreHandler(target);
      handler.$flags$ = flags;
      Object.assign(getStoreTarget(target), value);
      if (storeEffect) {
        effects2[STORE_ARRAY_PROP] = storeEffect;
      }
      handler.$effects$ = effects2;
      container.$storeProxyMap$.set(value, target);
      break;
    }
    case 22 /* Signal */: {
      const signal = target;
      const d = data;
      signal.$untrackedValue$ = d[0];
      signal.$effects$ = d.slice(1);
      break;
    }
    case 23 /* WrappedSignal */: {
      const signal = target;
      const d = data;
      signal.$func$ = container.getSyncFn(d[0]);
      signal.$args$ = d[1];
      signal.$effectDependencies$ = d[2];
      signal.$untrackedValue$ = d[3];
      signal.$effects$ = d.slice(4);
      break;
    }
    case 24 /* ComputedSignal */: {
      const computed = target;
      const d = data;
      computed.$computeQrl$ = d[0];
      computed.$untrackedValue$ = d[1];
      computed.$invalid$ = d[2];
      computed.$effects$ = d.slice(3);
      if (computed.$invalid$) {
        computed.$computeQrl$.resolve();
        (_a = container.$scheduler$) == null ? void 0 : _a.call(
          container,
          1 /* QRL_RESOLVE */,
          null,
          computed.$computeQrl$
        );
      }
      break;
    }
    case 12 /* Error */: {
      const d = data;
      target.message = d[0];
      const second = d[1];
      if (second && Array.isArray(second)) {
        for (let i2 = 0; i2 < second.length; i2++) {
          target[second[i2++]] = d[i2];
        }
        target.stack = d[2];
      } else {
        target.stack = second;
      }
      break;
    }
    case 27 /* FormData */: {
      const formData = target;
      const d = data;
      for (let i2 = 0; i2 < d.length; i2++) {
        formData.append(d[i2++], d[i2]);
      }
      break;
    }
    case 28 /* JSXNode */: {
      const jsx2 = target;
      const [type, varProps, constProps, children, flags, key] = data;
      jsx2.type = type;
      jsx2.varProps = varProps;
      jsx2.constProps = constProps;
      jsx2.children = children;
      jsx2.flags = flags;
      jsx2.key = key;
      break;
    }
    case 15 /* Set */: {
      const set = target;
      const d = data;
      for (let i2 = 0; i2 < d.length; i2++) {
        set.add(d[i2]);
      }
      break;
    }
    case 16 /* Map */: {
      const map = target;
      const d = data;
      for (let i2 = 0; i2 < d.length; i2++) {
        map.set(d[i2++], d[i2]);
      }
      break;
    }
    case 14 /* Promise */: {
      const promise = target;
      const [resolved2, result2] = data;
      const [resolve, reject] = resolvers.get(promise);
      if (resolved2) {
        resolve(result2);
      } else {
        reject(result2);
      }
      break;
    }
    case 17 /* Uint8Array */:
      const bytes = target;
      const buf = atob(data);
      let i = 0;
      for (const s of buf) {
        bytes[i++] = s.charCodeAt(0);
      }
      break;
    case 29 /* PropsProxy */:
      const propsProxy = target;
      propsProxy[_VAR_PROPS] = data[0];
      propsProxy[_CONST_PROPS] = data[1];
      break;
    case 30 /* EffectData */: {
      const effectData = target;
      effectData.data = data[0];
      break;
    }
    default:
      return throwErrorAndStop("Not implemented");
  }
};
var _constants = [
  void 0,
  null,
  true,
  false,
  "",
  EMPTY_ARRAY,
  EMPTY_OBJ,
  NEEDS_COMPUTATION,
  Slot,
  Fragment,
  NaN,
  Infinity,
  -Infinity,
  Number.MAX_SAFE_INTEGER,
  Number.MAX_SAFE_INTEGER - 1,
  Number.MIN_SAFE_INTEGER
];
var allocate = (container, typeId, value) => {
  if (value === void 0) {
    return typeId;
  }
  switch (typeId) {
    case 0 /* RootRef */:
      return container.$getObjectById$(value);
    case 1 /* Constant */:
      return _constants[value];
    case 2 /* Number */:
      return value;
    case 4 /* Array */:
      return wrapDeserializerProxy(container, value);
    case 13 /* Object */:
      return {};
    case 18 /* QRL */:
      return parseQRL(value);
    case 19 /* Task */:
      return new Task(-1, -1, null, null, null, null);
    case 20 /* Resource */: {
      const res = createResourceReturn(
        container,
        // we don't care about the timeout value
        void 0,
        void 0
      );
      res.loading = false;
      return res;
    }
    case 5 /* URL */:
      return new URL(value);
    case 6 /* Date */:
      return new Date(value);
    case 7 /* Regex */:
      const idx = value.lastIndexOf("/");
      return new RegExp(value.slice(1, idx), value.slice(idx + 1));
    case 12 /* Error */:
      return new Error();
    case 21 /* Component */:
      return componentQrl(null);
    case 22 /* Signal */:
      return new Signal(container, 0);
    case 23 /* WrappedSignal */:
      return new WrappedSignal(container, null, null, null);
    case 24 /* ComputedSignal */:
      return new ComputedSignal(container, null);
    case 25 /* Store */:
      return createStore(container, {}, 0);
    case 26 /* StoreArray */:
      return createStore(container, [], 0);
    case 11 /* URLSearchParams */:
      return new URLSearchParams(value);
    case 27 /* FormData */:
      return new FormData();
    case 28 /* JSXNode */:
      return new JSXNodeImpl(null, null, null, null, -1, null);
    case 10 /* BigInt */:
      return BigInt(value);
    case 15 /* Set */:
      return /* @__PURE__ */ new Set();
    case 16 /* Map */:
      return /* @__PURE__ */ new Map();
    case 3 /* String */:
      return value;
    case 14 /* Promise */:
      let resolve;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      resolvers.set(promise, [resolve, reject]);
      return promise;
    case 17 /* Uint8Array */:
      const encodedLength = value.length;
      const blocks = encodedLength >>> 2;
      const rest = encodedLength & 3;
      const decodedLength = blocks * 3 + (rest ? rest - 1 : 0);
      return new Uint8Array(decodedLength);
    case 29 /* PropsProxy */:
      return createPropsProxy(null, null);
    case 8 /* VNode */:
      return retrieveVNodeOrDocument(container, value);
    case 9 /* RefVNode */:
      const vNode = retrieveVNodeOrDocument(container, value);
      if (vnode_isVNode(vNode)) {
        return vnode_getNode(vNode);
      } else {
        return throwErrorAndStop("expected vnode for ref prop, but got " + typeof vNode);
      }
    case 30 /* EffectData */:
      return new EffectData(null);
    default:
      return throwErrorAndStop("unknown allocate type: " + typeId);
  }
};
function retrieveVNodeOrDocument(container, value) {
  var _a;
  return value ? container.rootVNode ? vnode_locate(container.rootVNode, value) : void 0 : (_a = container.element) == null ? void 0 : _a.ownerDocument;
}
function parseQRL(qrl) {
  const hashIdx = qrl.indexOf("#");
  const captureStart = qrl.indexOf("[", hashIdx);
  const captureEnd = qrl.indexOf("]", captureStart);
  const chunk = hashIdx > -1 ? qrl.slice(0, hashIdx) : qrl.slice(0, captureStart);
  const symbol = captureStart > -1 ? qrl.slice(hashIdx + 1, captureStart) : qrl.slice(hashIdx + 1);
  const captureIds = captureStart > -1 && captureEnd > -1 ? qrl.slice(captureStart + 1, captureEnd).split(" ").filter((v) => v.length).map((s) => parseInt(s, 10)) : null;
  let qrlRef = null;
  if (isDev && chunk === QRL_RUNTIME_CHUNK) {
    const backChannel = globalThis[QRL_RUNTIME_CHUNK];
    assertDefined(backChannel, "Missing QRL_RUNTIME_CHUNK");
    qrlRef = backChannel.get(symbol);
  }
  return createQRL(chunk, symbol, qrlRef, null, captureIds, null, null);
}
function inflateQRL(container, qrl) {
  const captureIds = qrl.$capture$;
  qrl.$captureRef$ = captureIds ? captureIds.map((id) => container.$getObjectById$(id)) : null;
  if (container.element) {
    qrl.$setContainer$(container.element);
  }
  return qrl;
}
var DomVRef = class {
  constructor(id) {
    this.id = id;
  }
};
var createSerializationContext = (NodeConstructor, symbolToChunkResolver, getProp, setProp, storeProxyMap, writer) => {
  if (!writer) {
    const buffer = [];
    writer = {
      write: (text) => buffer.push(text),
      toString: () => buffer.join("")
    };
  }
  const map = /* @__PURE__ */ new Map();
  const syncFnMap = /* @__PURE__ */ new Map();
  const syncFns = [];
  const roots = [];
  const $wasSeen$ = (obj) => map.get(obj);
  const $seen$ = (obj) => map.set(obj, -1);
  const $addRoot$ = (obj) => {
    let id = map.get(obj);
    if (typeof id !== "number" || id === -1) {
      id = roots.length;
      map.set(obj, id);
      roots.push(obj);
    }
    return id;
  };
  const isSsrNode = NodeConstructor ? (obj) => obj instanceof NodeConstructor : () => false;
  return {
    $serialize$() {
      serialize(this);
    },
    $isSsrNode$: isSsrNode,
    $symbolToChunkResolver$: symbolToChunkResolver,
    $wasSeen$,
    $roots$: roots,
    $seen$,
    $hasRootId$: (obj) => {
      const id = map.get(obj);
      return id === void 0 || id === -1 ? void 0 : id;
    },
    $addRoot$,
    $getRootId$: (obj) => {
      const id = map.get(obj);
      if (!id || id === -1) {
        return throwErrorAndStop("Missing root id for: " + obj);
      }
      return id;
    },
    $syncFns$: syncFns,
    $addSyncFn$: (funcStr, argCount, fn) => {
      const isFullFn = funcStr == null;
      if (isFullFn) {
        funcStr = fn.serialized || fn.toString();
      }
      let id = syncFnMap.get(funcStr);
      if (id === void 0) {
        id = syncFns.length;
        syncFnMap.set(funcStr, id);
        if (isFullFn) {
          syncFns.push(funcStr);
        } else {
          let code = "(";
          for (let i = 0; i < argCount; i++) {
            code += (i == 0 ? "p" : ",p") + i;
          }
          syncFns.push(code += ")=>" + funcStr);
        }
      }
      return id;
    },
    $writer$: writer,
    $breakCircularDepsAndAwaitPromises$: breakCircularDependenciesAndResolvePromises,
    $eventQrls$: /* @__PURE__ */ new Set(),
    $eventNames$: /* @__PURE__ */ new Set(),
    $resources$: /* @__PURE__ */ new Set(),
    $renderSymbols$: /* @__PURE__ */ new Set(),
    $storeProxyMap$: storeProxyMap,
    $getProp$: getProp,
    $setProp$: setProp
  };
  async function breakCircularDependenciesAndResolvePromises() {
    const discoveredValues = [];
    const promises = [];
    const visit = (obj) => {
      if (typeof obj === "function") {
        if (isQrl2(obj)) {
          if (obj.$captureRef$) {
            discoveredValues.push(...obj.$captureRef$);
          }
        } else if (isQwikComponent(obj)) {
          const [qrl] = obj[SERIALIZABLE_STATE];
          discoveredValues.push(qrl);
        }
      } else if (
        // skip as these are primitives
        typeof obj !== "object" || obj === null || obj instanceof URL || obj instanceof Date || obj instanceof RegExp || obj instanceof Uint8Array || obj instanceof URLSearchParams || typeof FormData !== "undefined" && obj instanceof FormData || // Ignore the no serialize objects
        fastSkipSerialize(obj)
      ) {
      } else if (obj instanceof Error) {
        discoveredValues.push(...Object.values(obj));
      } else if (isStore(obj)) {
        const target = getStoreTarget(obj);
        const effects = getStoreHandler(obj).$effects$;
        discoveredValues.push(target, effects);
        for (const prop in target) {
          const propValue = target[prop];
          if (storeProxyMap.has(propValue)) {
            discoveredValues.push(prop, storeProxyMap.get(propValue));
          }
        }
      } else if (obj instanceof Set) {
        discoveredValues.push(...obj.values());
      } else if (obj instanceof Map) {
        obj.forEach((v, k) => {
          discoveredValues.push(k, v);
        });
      } else if (obj instanceof Signal) {
        const v = obj instanceof WrappedSignal ? obj.untrackedValue : obj instanceof ComputedSignal && (obj.$invalid$ || fastSkipSerialize(obj)) ? NEEDS_COMPUTATION : obj.$untrackedValue$;
        if (v !== NEEDS_COMPUTATION && !isSsrNode(v)) {
          discoveredValues.push(obj.$untrackedValue$);
        }
        if (obj.$effects$) {
          discoveredValues.push(...obj.$effects$);
        }
        if (obj instanceof WrappedSignal) {
          if (obj.$effectDependencies$) {
            discoveredValues.push(...obj.$effectDependencies$);
          }
        } else if (obj instanceof ComputedSignal) {
          discoveredValues.push(obj.$computeQrl$);
        }
      } else if (obj instanceof Task) {
        discoveredValues.push(obj.$el$, obj.$qrl$, obj.$state$, obj.$effectDependencies$);
      } else if (isSsrNode(obj)) {
      } else if (isJSXNode(obj)) {
        discoveredValues.push(obj.type, obj.props, obj.constProps, obj.children);
      } else if (Array.isArray(obj)) {
        discoveredValues.push(...obj);
      } else if (isQrl2(obj)) {
        obj.$captureRef$ && obj.$captureRef$.length && discoveredValues.push(...obj.$captureRef$);
      } else if (isPropsProxy(obj)) {
        discoveredValues.push(obj[_VAR_PROPS], obj[_CONST_PROPS]);
      } else if (isPromise(obj)) {
        obj.then(
          (value) => {
            promiseResults.set(obj, [true, value]);
            discoveredValues.push(value);
          },
          (error) => {
            promiseResults.set(obj, [false, error]);
            discoveredValues.push(error);
          }
        );
        promises.push(obj);
      } else if (obj instanceof EffectData) {
        discoveredValues.push(obj.data);
      } else if (isObjectLiteral(obj)) {
        Object.entries(obj).forEach(([key, value]) => {
          discoveredValues.push(key, value);
        });
      } else {
        return throwErrorAndStop("Unknown type: " + obj);
      }
    };
    for (const root of roots) {
      visit(root);
    }
    do {
      while (discoveredValues.length) {
        const obj = discoveredValues.pop();
        if (!(shouldTrackObj(obj) || frameworkType(obj))) {
          continue;
        }
        const id = $wasSeen$(obj);
        if (id === void 0) {
          $seen$(obj);
          visit(obj);
        } else if (id === -1) {
          $addRoot$(obj);
        }
      }
      await Promise.allSettled(promises);
      promises.length = 0;
    } while (discoveredValues.length);
  }
};
var promiseResults = /* @__PURE__ */ new WeakMap();
function serialize(serializationContext) {
  const { $writer$, $isSsrNode$, $setProp$, $storeProxyMap$ } = serializationContext;
  let depth = -1;
  let writeType = false;
  const output = (type, value) => {
    if (writeType) {
      $writer$.write(`${type},`);
    } else {
      writeType = true;
    }
    if (typeof value === "number") {
      $writer$.write(value.toString());
    } else if (typeof value === "string") {
      const s = JSON.stringify(value);
      let angleBracketIdx = -1;
      let lastIdx = 0;
      while ((angleBracketIdx = s.indexOf("</", lastIdx)) !== -1) {
        $writer$.write(s.slice(lastIdx, angleBracketIdx));
        $writer$.write("<\\/");
        lastIdx = angleBracketIdx + 2;
      }
      $writer$.write(lastIdx === 0 ? s : s.slice(lastIdx));
    } else {
      depth++;
      $writer$.write("[");
      let separator = false;
      for (let i = 0; i < value.length; i++) {
        if (separator) {
          $writer$.write(",");
        } else {
          separator = true;
        }
        writeValue(value[i], i);
      }
      $writer$.write("]");
      depth--;
    }
  };
  const writeValue = (value, idx) => {
    if (fastSkipSerialize(value)) {
      output(1 /* Constant */, 0 /* Undefined */);
    } else if (typeof value === "bigint") {
      output(10 /* BigInt */, value.toString());
    } else if (typeof value === "boolean") {
      output(1 /* Constant */, value ? 2 /* True */ : 3 /* False */);
    } else if (typeof value === "function") {
      if (value === Slot) {
        output(1 /* Constant */, 8 /* Slot */);
      } else if (value === Fragment) {
        output(1 /* Constant */, 9 /* Fragment */);
      } else if (isQrl2(value)) {
        output(18 /* QRL */, qrlToString(serializationContext, value));
      } else if (isQwikComponent(value)) {
        const [qrl] = value[SERIALIZABLE_STATE];
        serializationContext.$renderSymbols$.add(qrl.$symbol$);
        output(21 /* Component */, [qrl]);
      } else {
        console.error("Cannot serialize function (ignoring for now): " + value.toString());
        output(1 /* Constant */, 0 /* Undefined */);
      }
    } else if (typeof value === "number") {
      if (Number.isNaN(value)) {
        output(1 /* Constant */, 10 /* NaN */);
      } else if (!Number.isFinite(value)) {
        output(
          1 /* Constant */,
          value < 0 ? 12 /* NegativeInfinity */ : 11 /* PositiveInfinity */
        );
      } else if (value === Number.MAX_SAFE_INTEGER) {
        output(1 /* Constant */, 13 /* MaxSafeInt */);
      } else if (value === Number.MAX_SAFE_INTEGER - 1) {
        output(1 /* Constant */, 14 /* AlmostMaxSafeInt */);
      } else if (value === Number.MIN_SAFE_INTEGER) {
        output(1 /* Constant */, 15 /* MinSafeInt */);
      } else {
        output(2 /* Number */, value);
      }
    } else if (typeof value === "object") {
      if (value === EMPTY_ARRAY) {
        output(1 /* Constant */, 5 /* EMPTY_ARRAY */);
      } else if (value === EMPTY_OBJ) {
        output(1 /* Constant */, 6 /* EMPTY_OBJ */);
      } else {
        depth++;
        if (value === null) {
          output(1 /* Constant */, 1 /* Null */);
        } else {
          writeObjectValue(value, idx);
        }
        depth--;
      }
    } else if (typeof value === "string") {
      if (value.length === 0) {
        output(1 /* Constant */, 4 /* EmptyString */);
      } else {
        const seen = depth > 1 && serializationContext.$wasSeen$(value);
        if (typeof seen === "number" && seen >= 0) {
          output(0 /* RootRef */, seen);
        } else {
          output(3 /* String */, value);
        }
      }
    } else if (typeof value === "undefined") {
      output(1 /* Constant */, 0 /* Undefined */);
    } else if (value === NEEDS_COMPUTATION) {
      output(1 /* Constant */, 7 /* NEEDS_COMPUTATION */);
    } else {
      throwErrorAndStop("Unknown type: " + typeof value);
    }
  };
  const writeObjectValue = (value, idx) => {
    const isRootObject = depth === 2;
    if (depth > 2) {
      const seen = serializationContext.$wasSeen$(value);
      if (typeof seen === "number" && seen >= 0) {
        output(0 /* RootRef */, seen);
        return;
      }
    }
    if (isPropsProxy(value)) {
      const varProps = value[_VAR_PROPS];
      const constProps = value[_CONST_PROPS];
      output(29 /* PropsProxy */, [varProps, constProps]);
    } else if (value instanceof EffectData) {
      output(30 /* EffectData */, [value.data]);
    } else if (isStore(value)) {
      if (isResource(value)) {
        serializationContext.$resources$.add(value);
        const res = promiseResults.get(value.value);
        if (!res) {
          return throwErrorAndStop("Unvisited Resource");
        }
        output(20 /* Resource */, [...res, getStoreHandler(value).$effects$]);
      } else {
        const storeHandler = getStoreHandler(value);
        const storeTarget = getStoreTarget(value);
        const flags = storeHandler.$flags$;
        const effects = storeHandler.$effects$;
        const storeEffect = (effects == null ? void 0 : effects[STORE_ARRAY_PROP]) ?? null;
        const innerStores = [];
        for (const prop in storeTarget) {
          const propValue = storeTarget[prop];
          if ($storeProxyMap$.has(propValue)) {
            const innerStore = $storeProxyMap$.get(propValue);
            innerStores.push(innerStore);
            serializationContext.$addRoot$(innerStore);
          }
        }
        const out = [storeTarget, flags, effects, storeEffect, ...innerStores];
        while (out[out.length - 1] == null) {
          out.pop();
        }
        output(Array.isArray(storeTarget) ? 26 /* StoreArray */ : 25 /* Store */, out);
      }
    } else if (isObjectLiteral(value)) {
      if (Array.isArray(value)) {
        output(4 /* Array */, value);
      } else {
        const out = [];
        for (const key in value) {
          if (Object.prototype.hasOwnProperty.call(value, key) && !fastSkipSerialize(value[key])) {
            out.push(key, value[key]);
          }
        }
        output(13 /* Object */, out);
      }
    } else if (value instanceof DomVRef) {
      output(9 /* RefVNode */, value.id);
    } else if (value instanceof Signal) {
      let v = value instanceof ComputedSignal && (value.$invalid$ || fastSkipSerialize(value.$untrackedValue$)) ? NEEDS_COMPUTATION : value.$untrackedValue$;
      if ($isSsrNode$(v)) {
        v = new DomVRef(v.id);
      }
      if (value instanceof WrappedSignal) {
        output(23 /* WrappedSignal */, [
          ...serializeWrappingFn(serializationContext, value),
          value.$effectDependencies$,
          v,
          ...value.$effects$ || []
        ]);
      } else if (value instanceof ComputedSignal) {
        output(24 /* ComputedSignal */, [
          value.$computeQrl$,
          v,
          v === NEEDS_COMPUTATION,
          // TODO check if we can use domVRef for effects
          ...value.$effects$ || []
        ]);
      } else {
        output(22 /* Signal */, [v, ...value.$effects$ || []]);
      }
    } else if (value instanceof URL) {
      output(5 /* URL */, value.href);
    } else if (value instanceof Date) {
      output(6 /* Date */, Number.isNaN(value.valueOf()) ? "" : value.valueOf());
    } else if (value instanceof RegExp) {
      output(7 /* Regex */, value.toString());
    } else if (value instanceof Error) {
      const out = [value.message];
      const extraProps = Object.entries(value).flat();
      if (extraProps.length) {
        out.push(extraProps);
      }
      if (isDev) {
        out.push(value.stack);
      }
      output(12 /* Error */, out);
    } else if ($isSsrNode$(value)) {
      if (isRootObject) {
        $setProp$(value, ELEMENT_ID, String(idx));
        output(8 /* VNode */, value.id);
      } else {
        serializationContext.$addRoot$(value);
        output(0 /* RootRef */, serializationContext.$roots$.length - 1);
      }
    } else if (typeof FormData !== "undefined" && value instanceof FormData) {
      const array = [];
      value.forEach((value2, key) => {
        if (typeof value2 === "string") {
          array.push(key, value2);
        } else {
          array.push(key, value2.name);
        }
      });
      output(27 /* FormData */, array);
    } else if (value instanceof URLSearchParams) {
      output(11 /* URLSearchParams */, value.toString());
    } else if (value instanceof Set) {
      output(15 /* Set */, [...value.values()]);
    } else if (value instanceof Map) {
      const combined = [];
      for (const [k, v] of value.entries()) {
        combined.push(k, v);
      }
      output(16 /* Map */, combined);
    } else if (isJSXNode(value)) {
      output(28 /* JSXNode */, [
        value.type,
        value.varProps,
        value.constProps,
        value.children,
        value.flags,
        value.key
      ]);
    } else if (value instanceof Task) {
      const out = [
        value.$qrl$,
        value.$flags$,
        value.$index$,
        value.$el$,
        value.$effectDependencies$,
        value.$state$
      ];
      while (out[out.length - 1] == null) {
        out.pop();
      }
      output(19 /* Task */, out);
    } else if (isPromise(value)) {
      const res = promiseResults.get(value);
      if (!res) {
        return throwErrorAndStop("Unvisited Promise");
      }
      output(14 /* Promise */, res);
    } else if (value instanceof Uint8Array) {
      let buf = "";
      for (const c of value) {
        buf += String.fromCharCode(c);
      }
      const out = btoa(buf).replace(/=+$/, "");
      output(17 /* Uint8Array */, out);
    } else {
      return throwErrorAndStop("implement");
    }
  };
  writeValue(serializationContext.$roots$, -1);
}
function serializeWrappingFn(serializationContext, value) {
  if (value.$funcStr$ && value.$funcStr$[0] === "{") {
    value.$funcStr$ = `(${value.$funcStr$})`;
  }
  const syncFnId = serializationContext.$addSyncFn$(
    value.$funcStr$,
    value.$args$.length,
    value.$func$
  );
  return [syncFnId, value.$args$];
}
function qrlToString(serializationContext, value) {
  var _a;
  let symbol = value.$symbol$;
  let chunk = value.$chunk$;
  const refSymbol = value.$refSymbol$ ?? symbol;
  const platform = getPlatform();
  if (platform) {
    const result = platform.chunkForSymbol(refSymbol, chunk, (_a = value.dev) == null ? void 0 : _a.file);
    if (result) {
      chunk = result[1];
      if (!value.$refSymbol$) {
        symbol = result[0];
      }
    }
  }
  const isSync = isSyncQrl(value);
  if (!isSync) {
    if (!chunk) {
      chunk = serializationContext.$symbolToChunkResolver$(value.$hash$);
    }
    if (isDev) {
      let backChannel = globalThis[QRL_RUNTIME_CHUNK];
      if (!backChannel) {
        backChannel = globalThis[QRL_RUNTIME_CHUNK] = /* @__PURE__ */ new Map();
      }
      backChannel.set(value.$symbol$, value._devOnlySymbolRef);
      if (!chunk) {
        chunk = QRL_RUNTIME_CHUNK;
      }
    }
    if (!chunk) {
      throwErrorAndStop("Missing chunk for: " + value.$symbol$);
    }
    if (chunk.startsWith("./")) {
      chunk = chunk.slice(2);
    }
  } else {
    const fn = value.resolved;
    chunk = "";
    symbol = String(serializationContext.$addSyncFn$(null, 0, fn));
  }
  let qrlStringInline = `${chunk}#${symbol}`;
  if (Array.isArray(value.$captureRef$) && value.$captureRef$.length > 0) {
    let serializedReferences = "";
    for (let i = 0; i < value.$captureRef$.length; i++) {
      if (i > 0) {
        serializedReferences += " ";
      }
      serializedReferences += serializationContext.$addRoot$(value.$captureRef$[i]);
    }
    qrlStringInline += `[${serializedReferences}]`;
  } else if (value.$capture$ && value.$capture$.length > 0) {
    qrlStringInline += `[${value.$capture$.join(" ")}]`;
  }
  return qrlStringInline;
}
function deserializeData(container, typeId, propValue) {
  if (typeId === void 0) {
    return propValue;
  }
  const value = allocate(container, typeId, propValue);
  if (typeId >= 12 /* Error */) {
    inflate(container, value, typeId, propValue);
  }
  return value;
}
function shouldTrackObj(obj) {
  return typeof obj === "object" && obj !== null || /**
   * We track all strings greater than 1 character, because those take at least 6 bytes to encode
   * and even with 999 root objects it saves one byte per reference. Tracking more objects makes
   * the map bigger so we want to strike a balance
   */
  typeof obj === "string" && obj.length > 1;
}
function isObjectLiteral(obj) {
  const prototype = Object.getPrototypeOf(obj);
  return prototype == null || prototype === Object.prototype || prototype === Array.prototype;
}
function isResource(value) {
  return "__brand" in value && value.__brand === "resource";
}
var frameworkType = (obj) => {
  return typeof obj === "object" && obj !== null && (obj instanceof Signal || obj instanceof Task || isJSXNode(obj)) || isQrl2(obj);
};
var canSerialize = (value) => {
  if (value == null || typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return true;
  } else if (typeof value === "object") {
    const proto = Object.getPrototypeOf(value);
    if (isStore(value)) {
      value = getStoreTarget(value);
    }
    if (proto == Object.prototype) {
      for (const key in value) {
        if (!canSerialize(value[key])) {
          return false;
        }
      }
      return true;
    } else if (proto == Array.prototype) {
      for (let i = 0; i < value.length; i++) {
        if (!canSerialize(value[i])) {
          return false;
        }
      }
      return true;
    } else if (isTask(value)) {
      return true;
    } else if (isPropsProxy(value)) {
      return true;
    } else if (isPromise(value)) {
      return true;
    } else if (isJSXNode(value)) {
      return true;
    } else if (value instanceof Error) {
      return true;
    } else if (value instanceof URL) {
      return true;
    } else if (value instanceof Date) {
      return true;
    } else if (value instanceof RegExp) {
      return true;
    } else if (value instanceof URLSearchParams) {
      return true;
    } else if (value instanceof FormData) {
      return true;
    } else if (value instanceof Set) {
      return true;
    } else if (value instanceof Map) {
      return true;
    } else if (value instanceof Uint8Array) {
      return true;
    }
  } else if (typeof value === "function") {
    if (isQrl2(value) || isQwikComponent(value)) {
      return true;
    }
  }
  return false;
};
var QRL_RUNTIME_CHUNK = "mock-chunk";

// packages/qwik/src/core/shared/utils/serialize-utils.ts
var verifySerializable = (value, preMessage) => {
  const seen = /* @__PURE__ */ new Set();
  return _verifySerializable(value, seen, "_", preMessage);
};
var _verifySerializable = (value, seen, ctx, preMessage) => {
  const unwrapped = unwrapStore(value);
  if (unwrapped == null) {
    return value;
  }
  if (shouldSerialize(unwrapped)) {
    if (seen.has(unwrapped)) {
      return value;
    }
    seen.add(unwrapped);
    if (isSignal(unwrapped)) {
      return value;
    }
    if (canSerialize(unwrapped)) {
      return value;
    }
    const typeObj = typeof unwrapped;
    switch (typeObj) {
      case "object":
        if (isPromise(unwrapped)) {
          return value;
        }
        if (isNode(unwrapped)) {
          return value;
        }
        if (isArray(unwrapped)) {
          let expectIndex = 0;
          unwrapped.forEach((v, i) => {
            if (i !== expectIndex) {
              throw qError(QError_verifySerializable, unwrapped);
            }
            _verifySerializable(v, seen, ctx + "[" + i + "]");
            expectIndex = i + 1;
          });
          return value;
        }
        if (isSerializableObject(unwrapped)) {
          for (const [key, item] of Object.entries(unwrapped)) {
            _verifySerializable(item, seen, ctx + "." + key);
          }
          return value;
        }
        break;
      case "boolean":
      case "string":
      case "number":
        return value;
    }
    let message = "";
    if (preMessage) {
      message = preMessage;
    } else {
      message = "Value cannot be serialized";
    }
    if (ctx !== "_") {
      message += ` in ${ctx},`;
    }
    if (typeObj === "object") {
      message += ` because it's an instance of "${value == null ? void 0 : value.constructor.name}". You might need to use 'noSerialize()' or use an object literal instead. Check out https://qwik.dev/docs/advanced/dollar/`;
    } else if (typeObj === "function") {
      const fnName = value.name;
      message += ` because it's a function named "${fnName}". You might need to convert it to a QRL using $(fn):

const ${fnName} = $(${String(
        value
      )});

Please check out https://qwik.dev/docs/advanced/qrl/ for more information.`;
    }
    console.error("Trying to serialize", value);
    throwErrorAndStop(message);
  }
  return value;
};
var noSerializeSet = /* @__PURE__ */ new WeakSet();
var shouldSerialize = (obj) => {
  if (isObject(obj) || isFunction(obj)) {
    return !noSerializeSet.has(obj);
  }
  return true;
};
var fastSkipSerialize = (obj) => {
  return noSerializeSet.has(obj);
};
var noSerialize = (input) => {
  if (input != null) {
    noSerializeSet.add(input);
  }
  return input;
};

// packages/qwik/src/core/shared/qrl/qrl-class.ts
var isQrl2 = (value) => {
  return typeof value === "function" && typeof value.getSymbol === "function";
};
var SYNC_QRL2 = "<sync>";
var isSyncQrl = (value) => {
  return isQrl2(value) && value.$symbol$ == SYNC_QRL2;
};
var createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
  if (qDev && qSerialize) {
    if (captureRef) {
      for (const item of captureRef) {
        verifySerializable(item, "Captured variable in the closure can not be serialized");
      }
    }
  }
  let _containerEl;
  const qrl = async function(...args) {
    const fn = invokeFn.call(this, tryGetInvokeContext());
    const result = await fn(...args);
    return result;
  };
  const setContainer = (el) => {
    if (!_containerEl) {
      _containerEl = el;
    }
    return _containerEl;
  };
  const wrapFn = (fn) => {
    if (typeof fn !== "function" || !(capture == null ? void 0 : capture.length) && !(captureRef == null ? void 0 : captureRef.length)) {
      return fn;
    }
    return function(...args) {
      let context = tryGetInvokeContext();
      if (context) {
        return fn.apply(this, args);
      }
      context = newInvokeContext();
      context.$qrl$ = qrl;
      context.$event$ = this;
      return invoke.call(this, context, fn, ...args);
    };
  };
  const resolve = async (containerEl) => {
    if (symbolRef !== null) {
      return symbolRef;
    }
    if (containerEl) {
      setContainer(containerEl);
    }
    if (chunk === "") {
      assertDefined(_containerEl, "Sync QRL must have container element");
      const hash3 = _containerEl.getAttribute(QInstanceAttr);
      const doc = _containerEl.ownerDocument;
      const qFuncs = getQFuncs(doc, hash3);
      return qrl.resolved = symbolRef = qFuncs[Number(symbol)];
    }
    const start = now();
    const ctx = tryGetInvokeContext();
    if (symbolFn !== null) {
      symbolRef = symbolFn().then((module2) => qrl.resolved = symbolRef = wrapFn(module2[symbol]));
    } else {
      const imported = getPlatform().importSymbol(_containerEl, chunk, symbol);
      symbolRef = maybeThen(imported, (ref) => qrl.resolved = symbolRef = wrapFn(ref));
    }
    if (typeof symbolRef === "object" && isPromise(symbolRef)) {
      symbolRef.then(
        () => emitUsedSymbol(symbol, ctx == null ? void 0 : ctx.$element$, start),
        (err) => {
          console.error(`qrl ${symbol} failed to load`, err);
          symbolRef = null;
          throw err;
        }
      );
    }
    return symbolRef;
  };
  const resolveLazy = (containerEl) => {
    return symbolRef !== null ? symbolRef : resolve(containerEl);
  };
  function invokeFn(currentCtx, beforeFn) {
    return (...args) => maybeThen(resolveLazy(), (f) => {
      if (!isFunction(f)) {
        throw qError(QError_qrlIsNotFunction);
      }
      if (beforeFn && beforeFn() === false) {
        return;
      }
      const context = createOrReuseInvocationContext(currentCtx);
      const prevQrl = context.$qrl$;
      const prevEvent = context.$event$;
      context.$qrl$ = qrl;
      context.$event$ ||= this;
      try {
        return invoke.call(this, context, f, ...args);
      } finally {
        context.$qrl$ = prevQrl;
        context.$event$ = prevEvent;
      }
    });
  }
  const createOrReuseInvocationContext = (invoke2) => {
    if (invoke2 == null) {
      return newInvokeContext();
    } else if (isArray(invoke2)) {
      return newInvokeContextFromTuple(invoke2);
    } else {
      return invoke2;
    }
  };
  const resolvedSymbol = refSymbol ?? symbol;
  const hash2 = getSymbolHash2(resolvedSymbol);
  Object.assign(qrl, {
    getSymbol: () => resolvedSymbol,
    getHash: () => hash2,
    getCaptured: () => captureRef,
    resolve,
    $resolveLazy$: resolveLazy,
    $setContainer$: setContainer,
    $chunk$: chunk,
    $symbol$: symbol,
    $refSymbol$: refSymbol,
    $hash$: hash2,
    getFn: invokeFn,
    $capture$: capture,
    $captureRef$: captureRef,
    dev: null,
    resolved: void 0
  });
  if (symbolRef) {
    symbolRef = maybeThen(symbolRef, (resolved) => qrl.resolved = symbolRef = wrapFn(resolved));
  }
  if (import_build8.isDev) {
    Object.defineProperty(qrl, "_devOnlySymbolRef", {
      get() {
        return symbolRef;
      }
    });
  }
  if (qDev) {
    seal(qrl);
  }
  return qrl;
};
var getSymbolHash2 = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};
var EMITTED = /* @__PURE__ */ new Set();
var emitUsedSymbol = (symbol, element, reqTime) => {
  if (!EMITTED.has(symbol)) {
    EMITTED.add(symbol);
    emitEvent("qsymbol", {
      symbol,
      element,
      reqTime
    });
  }
};
var emitEvent = (eventName, detail) => {
  if (!qTest && !isServerPlatform() && typeof document === "object") {
    document.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: false,
        detail
      })
    );
  }
};
var now = () => {
  if (qTest || isServerPlatform()) {
    return 0;
  }
  if (typeof performance === "object") {
    return performance.now();
  }
  return 0;
};

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
var fromCamelToKebabCaseWithDash = (text) => {
  return text.replace(/([A-Z])/g, "-$1").toLowerCase();
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
          if (value != null && typeof value !== "function") {
            if (key.startsWith("--")) {
              chunks.push(key + ":" + value);
            } else {
              chunks.push(fromCamelToKebabCaseWithDash(key) + ":" + setValueForStyle(key, value));
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
var styleContent = (styleId) => {
  return ComponentStylesPrefixContent + styleId;
};

// packages/qwik/src/optimizer/src/manifest.ts
function getValidManifest(manifest) {
  if (manifest != null && manifest.mapping != null && typeof manifest.mapping === "object" && manifest.symbols != null && typeof manifest.symbols === "object" && manifest.bundles != null && typeof manifest.bundles === "object") {
    return manifest;
  }
  return void 0;
}

// packages/qwik/src/server/ssr-container.ts
var import_core3 = require("@qwik.dev/core");
var import_build10 = require("@qwik.dev/core/build");

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
        const count2 = common.get(prefetchResource.url) || 0;
        common.set(prefetchResource.url, count2 + 1);
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
  const priority = prefetchImpl.linkFetchPriority;
  for (const url of urls) {
    const attributes = ["href", url, "rel", rel];
    if (priority) {
      attributes.push("fetchpriority", priority);
    }
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
  const priority = prefetchImpl.linkFetchPriority;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    container.writer.write(`let supportsLinkRel = true;`);
  }
  container.writer.write(`const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`);
  container.writer.write(`u.map((u,i)=>{`);
  container.writer.write(`const l=document.createElement('link');`);
  container.writer.write(`l.setAttribute("href",u);`);
  container.writer.write(`l.setAttribute("rel","${rel}");`);
  if (priority) {
    container.writer.write(`l.setAttribute("fetchpriority","${priority}");`);
  }
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
  linkFetchPriority: null,
  workerFetchInsert: null,
  prefetchEvent: "always"
};

// packages/qwik/src/server/ssr-node.ts
var import_core2 = require("@qwik.dev/core");
var import_build9 = require("@qwik.dev/core/build");
var SsrNode = class {
  constructor(currentComponentNode, nodeType, id, attrs, cleanupQueue) {
    this.attrs = attrs;
    this.cleanupQueue = cleanupQueue;
    /** Local props which don't serialize; */
    this.locals = null;
    this.currentComponentNode = currentComponentNode;
    this.nodeType = nodeType;
    this.id = id;
    if (import_build9.isDev && id.indexOf("undefined") != -1) {
      throw new Error(`Invalid SSR node id: ${id}`);
    }
  }
  setProp(name, value) {
    if (this.attrs === import_core2._EMPTY_ARRAY) {
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
    this.projectionScopedStyle = null;
    this.projectionComponentFrame = null;
  }
  distributeChildrenIntoSlots(children, projectionScopedStyle, projectionComponentFrame) {
    this.projectionScopedStyle = projectionScopedStyle;
    this.projectionComponentFrame = projectionComponentFrame;
    if ((0, import_core2._isJSXNode)(children)) {
      const slotName = this.getSlotName(children);
      mapArray_set(this.slots, slotName, children, 0);
    } else if (Array.isArray(children)) {
      const defaultSlot = [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if ((0, import_core2._isJSXNode)(child)) {
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
      unclaimedProjections.push(this.projectionScopedStyle);
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
    const stack2 = [SsrNode.ELEMENT_NODE, -1];
    for (let i = 1; i < vNodeData.length; i++) {
      const value = vNodeData[i];
      if (Array.isArray(value)) {
        fragmentAttrs = value;
        i++;
        stack2[stack2.length - 1]++;
        stack2.push(SsrNode.DOCUMENT_FRAGMENT_NODE, -1);
      } else if (value === CLOSE_FRAGMENT) {
        stack2.pop();
        stack2.pop();
        fragmentAttrs = EMPTY_ARRAY2;
      } else if (value < 0) {
        const numberOfElements = 0 - value;
        stack2[stack2.length - 1] += numberOfElements;
      } else {
        stack2[stack2.length - 1]++;
      }
    }
    let refId = String(depthFirstElementIdx);
    for (let i = 1; i < stack2.length; i += 2) {
      const childCount = stack2[i];
      if (childCount >= 0) {
        refId += encodeAsAlphanumeric(childCount);
      }
    }
    const type = stack2[stack2.length - 2];
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
var SSRContainer = class extends import_core3._SharedContainer {
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
    await (0, import_core3._walkJSX)(this, jsx2, {
      allowPromises: true,
      currentStyleScoped: null,
      parentComponentFrame: this.getComponentFrame()
    });
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
  /**
   * Renders opening tag for container. It could be a html tag for regular apps or custom element
   * for micro-frontends
   */
  openContainer() {
    if (this.tag == "html") {
      this.write("<!DOCTYPE html>");
    }
    const containerAttributes = this.renderOptions.containerAttributes || {};
    const qRender = containerAttributes[QRenderAttr];
    containerAttributes[QContainerAttr] = "paused" /* PAUSED */;
    containerAttributes[QRuntimeAttr] = "2";
    containerAttributes[QVersionAttr] = this.$version$ ?? "dev";
    containerAttributes[QRenderAttr] = (qRender ? qRender + "-" : "") + (import_build10.isDev ? "ssr-dev" : "ssr");
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
  /** Renders closing tag for current container */
  closeContainer() {
    return this.closeElement();
  }
  /** Renders opening tag for DOM element */
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
    import_build10.isDev && this.write('=""');
    if (constAttrs && constAttrs.length) {
      innerHTML = this.writeAttrs(elementName, constAttrs, true) || innerHTML;
    }
    this.write(">");
    this.lastNode = null;
    return innerHTML;
  }
  /** Renders closing tag for DOM element */
  closeElement() {
    if (this.shouldEmitDataBeforeClosingElement()) {
      this.onRenderDone();
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
  shouldEmitDataBeforeClosingElement() {
    const currentFrame = this.currentElementFrame;
    return (
      /**
       * - Micro-frontends don't have html tag, emit data before closing custom element
       * - Regular applications should emit data inside body
       */
      currentFrame.parent === null && currentFrame.elementName !== "html" || currentFrame.elementName === "body"
    );
  }
  onRenderDone() {
    this.drainCleanupQueue();
    this.timing.render = this.renderTimer();
  }
  /** Drain cleanup queue and cleanup tasks etc. */
  drainCleanupQueue() {
    let sequences = this.cleanupQueue.pop();
    while (sequences) {
      for (let j = 0; j < sequences.length; j++) {
        const item = sequences[j];
        if (hasDestroy(item)) {
          item.$destroy$();
        }
      }
      sequences = this.cleanupQueue.pop();
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
  /** Writes opening data to vNodeData for fragment boundaries */
  openFragment(attrs) {
    this.lastNode = null;
    vNodeData_openFragment(this.currentElementFrame.vNodeData, attrs);
  }
  /** Writes closing data to vNodeData for fragment boundaries */
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
  /** Writes opening data to vNodeData for component boundaries */
  openComponent(attrs) {
    this.openFragment(attrs);
    this.currentComponentNode = this.getLastNode();
    this.componentStack.push(new SsrComponentFrame(this.currentComponentNode));
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
  getParentComponentFrame() {
    var _a;
    const localProjectionDepth = ((_a = this.getComponentFrame()) == null ? void 0 : _a.projectionDepth) || 0;
    return this.getComponentFrame(localProjectionDepth);
  }
  /** Writes closing data to vNodeData for component boundaries and mark unclaimed projections */
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
      const jsxNode = (0, import_core3._jsxSplit)(injection.tag, null, injection.attributes || {}, null, 0, null);
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
          (0, import_core3._jsxSorted)(
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
  emitUnclaimedProjection() {
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
              import_build10.isDev ? [DEBUG_TYPE, "P" /* Projection */, QSlotParent, ssrComponentNode.id] : [QSlotParent, ssrComponentNode.id]
            );
            ssrComponentNode == null ? void 0 : ssrComponentNode.setProp(value, this.getLastNode().id);
            (0, import_core3._walkJSX)(this, children, {
              allowPromises: false,
              currentStyleScoped: scopedStyleId,
              parentComponentFrame: null
            });
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
    if (import_build10.isDev) {
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
          if (import_build10.isDev) {
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
          if ((0, import_core3.isSignal)(value)) {
            value.value = lastNode;
            continue;
          } else if (typeof value === "function") {
            value(lastNode);
            continue;
          }
        }
        if ((0, import_core3.isSignal)(value)) {
          const lastNode = this.getLastNode();
          const signalData = new import_core3._EffectData({
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
            if (import_build10.isDev) {
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
var QWIK_LOADER_DEFAULT_MINIFIED = '(()=>{var e=Object.defineProperty,t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,o=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,s=(e,s)=>{for(var a in s||(s={}))n.call(s,a)&&o(e,a,s[a]);if(t)for(var a of t(s))r.call(s,a)&&o(e,a,s[a]);return e};((e,t)=>{const n="__q_context__",r=window,o=new Set,a=new Set([e]),c="replace",i="forEach",l="target",f="getAttribute",p="isConnected",b="qvisible",u="_qwikjson_",h=(e,t)=>Array.from(e.querySelectorAll(t)),y=e=>{const t=[];return a.forEach((n=>t.push(...h(n,e)))),t},d=e=>{S(e),h(e,"[q\\\\:shadowroot]").forEach((e=>{const t=e.shadowRoot;t&&d(t)}))},q=e=>e&&"function"==typeof e.then,m=(e,t,n=t.type)=>{y("[on"+e+"\\\\:"+n+"]")[i]((r=>E(r,e,t,n)))},w=t=>{if(void 0===t[u]){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===n[f]("type")){t[u]=JSON.parse(n.textContent[c](/\\\\x3C(\\/?script)/gi,"<$1"));break}n=n.previousElementSibling}}},v=(e,t)=>new CustomEvent(e,{detail:t}),E=async(t,r,o,a=o.type)=>{const i="on"+r+":"+a;t.hasAttribute("preventdefault:"+a)&&o.preventDefault();const l=t._qc_,b=l&&l.li.filter((e=>e[0]===i));if(b&&b.length>0){for(const e of b){const n=e[1].getFn([t,o],(()=>t[p]))(o,t),r=o.cancelBubble;q(n)&&await n,r&&o.stopPropagation()}return}const u=t.qDispatchEvent;if(u)return u(o,r);const h=t[f](i);if(h){const r=t.closest("[q\\\\:container]:not([q\\\\:container=html]):not([q\\\\:container=text])"),a=r[f]("q:base"),i=r[f]("q:version")||"unknown",l=r[f]("q:manifest-hash")||"dev",b=new URL(a,e.baseURI);for(const f of h.split("\\n")){const u=new URL(f,b),h=u.href,y=u.hash[c](/^#?([^?[|]*).*$/,"$1")||"default",d=performance.now();let m,v,E;const _=f.startsWith("#"),A={qBase:a,qManifest:l,qVersion:i,href:h,symbol:y,element:t,reqTime:d};if(_){const t=r.getAttribute("q:instance");m=(e["qFuncs_"+t]||[])[Number.parseInt(y)],m||(v="sync",E=Error("sync handler error for symbol: "+y))}else{const e=u.href.split("#")[0];try{const t=import(e);w(r),m=(await t)[y],m||(v="no-symbol",E=Error(`${y} not in ${e}`))}catch(e){v||(v="async"),E=e}}if(!m){g("qerror",s({importError:v,error:E},A)),console.error(E);break}const k=e[n];if(t[p]){const r=async()=>{try{e[n]=[t,o,u],_||g("qsymbol",s({},A));const r=m(o,t);q(r)&&await r}catch(e){q(e)?e.then((()=>r())):g("qerror",s({error:e},A))}finally{e[n]=k}};r()}}}},g=(t,n)=>{e.dispatchEvent(v(t,n))},_=e=>e[c](/([A-Z])/g,(e=>"-"+e.toLowerCase())),A=async e=>{let t=_(e.type),n=e[l];for(m("-document",e,t);n&&n[f];){const r=E(n,"",e,t);let o=e.cancelBubble;q(r)&&await r,o=o||e.cancelBubble||n.hasAttribute("stoppropagation:"+e.type),n=e.bubbles&&!0!==o?n.parentElement:null}},k=e=>{m("-window",e,_(e.type))},C=()=>{var n;const s=e.readyState;if(!t&&("interactive"==s||"complete"==s)&&(a.forEach(d),t=1,g("qinit"),(null!=(n=r.requestIdleCallback)?n:r.setTimeout).bind(r)((()=>g("qidle"))),o.has(b))){const e=y("[on\\\\:"+b+"]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n[l]),E(n[l],"",v(b,n)))}));e[i]((e=>t.observe(e)))}},O=(e,t,n,r=!1)=>e.addEventListener(t,n,{capture:r,passive:!1}),S=(...e)=>{for(const t of e)"string"==typeof t?o.has(t)||(a.forEach((e=>O(e,t,A,!0))),O(r,t,k,!0),o.add(t)):a.has(t)||(o.forEach((e=>O(t,e,A,!0))),a.add(t))};if(!(n in e)){e[n]=0;const t=r.qwikevents;Array.isArray(t)&&S(...t),r.qwikevents={events:o,roots:a,push:S},O(e,"readystatechange",C),C()}})(document)})()';
var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    var __defProp = Object.defineProperty;\n    var __getOwnPropSymbols = Object.getOwnPropertySymbols;\n    var __hasOwnProp = Object.prototype.hasOwnProperty;\n    var __propIsEnum = Object.prototype.propertyIsEnumerable;\n    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {\n        enumerable: !0,\n        configurable: !0,\n        writable: !0,\n        value: value\n    }) : obj[key] = value;\n    var __spreadValues = (a, b) => {\n        for (var prop in b || (b = {})) {\n            __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n        }\n        if (__getOwnPropSymbols) {\n            for (var prop of __getOwnPropSymbols(b)) {\n                __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n            }\n        }\n        return a;\n    };\n    ((doc, hasInitialized) => {\n        const Q_CONTEXT = "__q_context__";\n        const win = window;\n        const events =  new Set;\n        const roots =  new Set([ doc ]);\n        const nativeQuerySelectorAll = (root, selector) => Array.from(root.querySelectorAll(selector));\n        const querySelectorAll = query => {\n            const elements = [];\n            roots.forEach((root => elements.push(...nativeQuerySelectorAll(root, query))));\n            return elements;\n        };\n        const findShadowRoots = fragment => {\n            processEventOrNode(fragment);\n            nativeQuerySelectorAll(fragment, "[q\\\\:shadowroot]").forEach((parent => {\n                const shadowRoot = parent.shadowRoot;\n                shadowRoot && findShadowRoots(shadowRoot);\n            }));\n        };\n        const isPromise = promise => promise && "function" == typeof promise.then;\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((el => dispatch(el, infix, ev, type)));\n        };\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === script.getAttribute("type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, scope, ev, eventName = ev.type) => {\n            const attrName = "on" + scope + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const relevantListeners = ctx && ctx.li.filter((li => li[0] === attrName));\n            if (relevantListeners && relevantListeners.length > 0) {\n                for (const listener of relevantListeners) {\n                    const results = listener[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                    const cancelBubble = ev.cancelBubble;\n                    isPromise(results) && await results;\n                    cancelBubble && ev.stopPropagation();\n                }\n                return;\n            }\n            const qDispatchEvent = element.qDispatchEvent;\n            if (qDispatchEvent) {\n                return qDispatchEvent(ev, scope);\n            }\n            const attrValue = element.getAttribute(attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]:not([q\\\\:container=html]):not([q\\\\:container=text])");\n                const qBase = container.getAttribute("q:base");\n                const qVersion = container.getAttribute("q:version") || "unknown";\n                const qManifest = container.getAttribute("q:manifest-hash") || "dev";\n                const base = new URL(qBase, doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const href = url.href;\n                    const symbol = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    let handler;\n                    let importError;\n                    let error;\n                    const isSync = qrl.startsWith("#");\n                    const eventData = {\n                        qBase: qBase,\n                        qManifest: qManifest,\n                        qVersion: qVersion,\n                        href: href,\n                        symbol: symbol,\n                        element: element,\n                        reqTime: reqTime\n                    };\n                    if (isSync) {\n                        const hash = container.getAttribute("q:instance");\n                        handler = (doc["qFuncs_" + hash] || [])[Number.parseInt(symbol)];\n                        if (!handler) {\n                            importError = "sync";\n                            error = new Error("sync handler error for symbol: " + symbol);\n                        }\n                    } else {\n                        const uri = url.href.split("#")[0];\n                        try {\n                            const module = import(\n                                                        uri);\n                            resolveContainer(container);\n                            handler = (await module)[symbol];\n                            if (!handler) {\n                                importError = "no-symbol";\n                                error = new Error(`${symbol} not in ${uri}`);\n                            }\n                        } catch (err) {\n                            importError || (importError = "async");\n                            error = err;\n                        }\n                    }\n                    if (!handler) {\n                        emitEvent("qerror", __spreadValues({\n                            importError: importError,\n                            error: error\n                        }, eventData));\n                        console.error(error);\n                        break;\n                    }\n                    const previousCtx = doc[Q_CONTEXT];\n                    if (element.isConnected) {\n                        const handleEvent = async () => {\n                            try {\n                                doc[Q_CONTEXT] = [ element, ev, url ];\n                                isSync || emitEvent("qsymbol", __spreadValues({}, eventData));\n                                const results = handler(ev, element);\n                                isPromise(results) && await results;\n                            } catch (error2) {\n                                isPromise(error2) ? error2.then((() => handleEvent())) : emitEvent("qerror", __spreadValues({\n                                    error: error2\n                                }, eventData));\n                            } finally {\n                                doc[Q_CONTEXT] = previousCtx;\n                            }\n                        };\n                        handleEvent();\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                const results = dispatch(element, "", ev, type);\n                let cancelBubble = ev.cancelBubble;\n                isPromise(results) && await results;\n                cancelBubble = cancelBubble || ev.cancelBubble || element.hasAttribute("stoppropagation:" + ev.type);\n                element = ev.bubbles && !0 !== cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                roots.forEach(findShadowRoots);\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const processEventOrNode = (...eventNames) => {\n            for (const eventNameOrNode of eventNames) {\n                if ("string" == typeof eventNameOrNode) {\n                    if (!events.has(eventNameOrNode)) {\n                        roots.forEach((root => addEventListener(root, eventNameOrNode, processDocumentEvent, !0)));\n                        addEventListener(win, eventNameOrNode, processWindowEvent, !0);\n                        events.add(eventNameOrNode);\n                    }\n                } else if (!roots.has(eventNameOrNode)) {\n                    events.forEach((eventName => addEventListener(eventNameOrNode, eventName, processDocumentEvent, !0)));\n                    roots.add(eventNameOrNode);\n                }\n            }\n        };\n        if (!(Q_CONTEXT in doc)) {\n            doc[Q_CONTEXT] = 0;\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && processEventOrNode(...qwikevents);\n            win.qwikevents = {\n                events: events,\n                roots: roots,\n                push: processEventOrNode\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})()';
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
  (0, import_core4.setPlatform)(platform);
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
