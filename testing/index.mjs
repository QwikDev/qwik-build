/**
 * @license
 * @builder.io/qwik/testing
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
// packages/qwik/src/testing/document.ts
import { _createDocument } from "../server.mjs";

// packages/qwik/src/testing/platform.ts
import { getPlatform, setPlatform } from "../core.mjs";
import { existsSync } from "fs";
import { fileURLToPath } from "url";

// packages/qwik/src/core/util/types.ts
var isObject = (v) => {
  return v && typeof v === "object";
};
var isFunction = (v) => {
  return typeof v === "function";
};

// packages/qwik/src/core/util/qdev.ts
var qDev = globalThis.qDev !== false;
var qTest = globalThis.describe !== void 0;

// packages/qwik/src/core/util/log.ts
var STYLE = qDev ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;` : "";
var logError = (message, ...optionalParams) => {
  console.error("%cQWIK ERROR", STYLE, message, ...optionalParams);
};

// packages/qwik/src/core/assert/assert.ts
var assertDefined = (value, text) => {
  if (qDev) {
    if (value != null)
      return;
    throw newError(text || "Expected defined value");
  }
};
var newError = (text) => {
  debugger;
  const error = new Error(text);
  logError(error);
  return error;
};

// packages/qwik/src/core/util/markers.ts
var QContainerSelector = "[q\\:container]";

// packages/qwik/src/core/util/dom.ts
var getDocument = (node) => {
  if (typeof document !== "undefined") {
    return document;
  }
  if (node.nodeType === 9) {
    return node;
  }
  const doc = node.ownerDocument;
  assertDefined(doc);
  return doc;
};

// packages/qwik/src/core/error/error.ts
var QError_qrlIsNotFunction = 10;
var qError = (code, ...parts) => {
  const text = codeToText(code);
  const error = text + parts.join(" ");
  debugger;
  return new Error(error);
};
var codeToText = (code) => {
  if (qDev) {
    const MAP = [
      "Can not serialize a HTML Node that is not an Element",
      "Rruntime but no instance found on element.",
      "Only primitive and object literals can be serialized",
      "Crash while rendering",
      "You can render over a existing q:container. Skipping render().",
      "Set property",
      "Only function's and 'string's are supported.",
      "Only objects can be wrapped in 'QObject'",
      `Only objects literals can be wrapped in 'QObject'`,
      "QRL is not a function",
      "Dynamic import not found",
      "Unknown type argument",
      "not found state for useContext",
      "Q-ERROR: invoking 'use*()' method outside of invocation context.",
      "Cant access renderCtx for existing context",
      "Cant access document for existing context",
      "props are inmutable"
    ];
    return `Code(${code}): ${MAP[code] ?? ""}`;
  } else {
    return `Code(${code})`;
  }
};

// packages/qwik/src/core/use/use-core.ts
var CONTAINER = Symbol("container");
var _context;
var useInvoke = (context, fn, ...args) => {
  const previousContext = _context;
  let returnValue;
  try {
    _context = context;
    returnValue = fn.apply(null, args);
  } finally {
    const currentCtx = _context;
    _context = previousContext;
    if (currentCtx.$waitOn$ && currentCtx.$waitOn$.length > 0) {
      return Promise.all(currentCtx.$waitOn$).then(() => returnValue);
    }
  }
  return returnValue;
};
var newInvokeContext = (doc, hostElement, element, event, url) => {
  return {
    $seq$: 0,
    $doc$: doc,
    $hostElement$: hostElement,
    $element$: element,
    $event$: event,
    $url$: url || null,
    $qrl$: void 0
  };
};
var getContainer = (el) => {
  let container = el[CONTAINER];
  if (!container) {
    container = el.closest(QContainerSelector);
    el[CONTAINER] = container;
  }
  return container;
};

// packages/qwik/src/testing/platform.ts
function createPlatform(document2) {
  if (!document2 || document2.nodeType !== 9) {
    throw new Error(`Invalid Document implementation`);
  }
  const doc = document2;
  let render = null;
  const moduleCache = /* @__PURE__ */ new Map();
  const testPlatform = {
    isServer: true,
    importSymbol(element, url, symbolName) {
      const urlDoc = toUrl(element.ownerDocument, element, url);
      const importPath = toPath(urlDoc);
      const mod = moduleCache.get(importPath);
      if (mod) {
        return mod[symbolName];
      }
      return import(importPath).then((mod2) => {
        moduleCache.set(importPath, mod2);
        return mod2[symbolName];
      });
    },
    nextTick: (renderMarked) => {
      if (!render) {
        render = {
          fn: renderMarked,
          promise: null,
          resolve: null,
          reject: null
        };
        render.promise = new Promise((resolve, reject) => {
          render.resolve = resolve;
          render.reject = reject;
        });
      } else if (renderMarked !== render.fn) {
        throw new Error("Must be same function");
      }
      return render.promise;
    },
    raf: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    flush: async () => {
      await Promise.resolve();
      if (render) {
        try {
          render.resolve(await render.fn(doc));
        } catch (e) {
          render.reject(e);
        }
        render = null;
      }
    },
    chunkForSymbol() {
      return void 0;
    }
  };
  return testPlatform;
}
function setTestPlatform(document2) {
  const platform = createPlatform(document2);
  setPlatform(document2, platform);
}
function toUrl(doc, element, url) {
  const containerEl = getContainer(element);
  const base = new URL(containerEl?.getAttribute("q:base") ?? doc.baseURI, doc.baseURI);
  return new URL(url, base);
}
function toPath(url) {
  const normalizedUrl = new URL(String(url));
  normalizedUrl.hash = "";
  normalizedUrl.search = "";
  const path = fileURLToPath(String(normalizedUrl));
  const importPaths = [path, ...testExts.map((ext) => path + ext)];
  for (const importPath of importPaths) {
    if (existsSync(importPath)) {
      return importPath;
    }
  }
  throw new Error(`Unable to find path for import "${url}"`);
}
function getTestPlatform(document2) {
  const testPlatform = getPlatform(document2);
  if (!testPlatform) {
    throw new Error(`Test platform was not applied to the document`);
  }
  if (typeof testPlatform.flush !== "function") {
    throw new Error(`Invalid Test platform applied to the document`);
  }
  return testPlatform;
}
var testExts = [".ts", ".tsx", ".js", ".cjs", ".mjs", ".jsx"];

// packages/qwik/src/testing/document.ts
function createWindow(opts = {}) {
  const win = _createDocument(opts).defaultView;
  setTestPlatform(win.document);
  return win;
}
function createDocument(opts = {}) {
  const doc = _createDocument(opts);
  setTestPlatform(doc);
  return doc;
}

// packages/qwik/src/core/util/promises.ts
var isPromise = (value) => {
  return value instanceof Promise;
};
var then = (promise, thenFn, rejectFn) => {
  return isPromise(promise) ? promise.then(thenFn, rejectFn) : thenFn(promise);
};

// packages/qwik/src/core/platform/platform.ts
var createPlatform2 = (doc) => {
  const moduleCache = /* @__PURE__ */ new Map();
  return {
    isServer: false,
    importSymbol(element, url, symbolName) {
      const urlDoc = toUrl2(doc, element, url).toString();
      const urlCopy = new URL(urlDoc);
      urlCopy.hash = "";
      urlCopy.search = "";
      const importURL = urlCopy.href;
      const mod = moduleCache.get(importURL);
      if (mod) {
        return mod[symbolName];
      }
      return import(
        /* @vite-ignore */
        importURL
      ).then((mod2) => {
        mod2 = findModule(mod2);
        moduleCache.set(importURL, mod2);
        return mod2[symbolName];
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
    chunkForSymbol() {
      return void 0;
    }
  };
};
var findModule = (module) => {
  return Object.values(module).find(isModule) || module;
};
var isModule = (module) => {
  return isObject(module) && module[Symbol.toStringTag] === "Module";
};
var toUrl2 = (doc, element, url) => {
  const containerEl = getContainer(element);
  const base = new URL(containerEl?.getAttribute("q:base") ?? doc.baseURI, doc.baseURI);
  return new URL(url, base);
};
var getPlatform2 = (docOrNode) => {
  const doc = getDocument(docOrNode);
  return doc[DocumentPlatform] || (doc[DocumentPlatform] = createPlatform2(doc));
};
var DocumentPlatform = /* @__PURE__ */ Symbol();

// packages/qwik/src/core/import/qrl.ts
var RUNTIME_QRL = "/runtimeQRL";
var qrlImport = (element, qrl) => {
  const qrl_ = qrl;
  if (qrl_.$symbolRef$)
    return qrl_.$symbolRef$;
  if (qrl_.$symbolFn$) {
    return qrl_.$symbolRef$ = qrl_.$symbolFn$().then((module) => qrl_.$symbolRef$ = module[qrl_.$symbol$]);
  } else {
    if (!element) {
      throw new Error(`QRL '${qrl_.$chunk$}#${qrl_.$symbol$ || "default"}' does not have an attached container`);
    }
    const symbol = getPlatform2(element).importSymbol(element, qrl_.$chunk$, qrl_.$symbol$);
    return qrl_.$symbolRef$ = then(symbol, (ref) => {
      return qrl_.$symbolRef$ = ref;
    });
  }
};
var stringifyQRL = (qrl, opts = {}) => {
  const qrl_ = qrl;
  let symbol = qrl_.$symbol$;
  let chunk = qrl_.$chunk$;
  const refSymbol = qrl_.$refSymbol$ ?? symbol;
  const platform = opts.$platform$;
  const element = opts.$element$;
  if (platform) {
    const result = platform.chunkForSymbol(refSymbol);
    if (result) {
      chunk = result[1];
      if (!qrl_.$refSymbol$) {
        symbol = result[0];
      }
    }
  }
  const parts = [chunk];
  if (symbol && symbol !== "default") {
    parts.push("#", symbol);
  }
  const capture = qrl_.$capture$;
  const captureRef = qrl_.$captureRef$;
  if (opts.$getObjId$) {
    if (captureRef && captureRef.length) {
      const capture2 = captureRef.map(opts.$getObjId$);
      parts.push(`[${capture2.join(" ")}]`);
    }
  } else if (capture && capture.length > 0) {
    parts.push(`[${capture.join(" ")}]`);
  }
  const qrlString = parts.join("");
  if (qrl_.$chunk$ === RUNTIME_QRL && element) {
    const qrls = element.__qrls__ || (element.__qrls__ = /* @__PURE__ */ new Set());
    qrls.add(qrl);
  }
  return qrlString;
};

// packages/qwik/src/core/import/qrl-class.ts
var isQrl = (value) => {
  return value instanceof QRL;
};
var QRL = class {
  constructor($chunk$, $symbol$, $symbolRef$, $symbolFn$, $capture$, $captureRef$) {
    this.$chunk$ = $chunk$;
    this.$symbol$ = $symbol$;
    this.$symbolRef$ = $symbolRef$;
    this.$symbolFn$ = $symbolFn$;
    this.$capture$ = $capture$;
    this.$captureRef$ = $captureRef$;
  }
  setContainer(el) {
    if (!this.$el$) {
      this.$el$ = el;
    }
  }
  getSymbol() {
    return this.$refSymbol$ ?? this.$symbol$;
  }
  getHash() {
    return getSymbolHash(this.$refSymbol$ ?? this.$symbol$);
  }
  async resolve(el) {
    if (el) {
      this.setContainer(el);
    }
    return qrlImport(this.$el$, this);
  }
  resolveLazy(el) {
    return isFunction(this.$symbolRef$) ? this.$symbolRef$ : this.resolve(el);
  }
  invokeFn(el, currentCtx, beforeFn) {
    return (...args) => {
      const fn = this.resolveLazy(el);
      return then(fn, (fn2) => {
        if (isFunction(fn2)) {
          const baseContext = currentCtx ?? newInvokeContext();
          const context = {
            ...baseContext,
            $qrl$: this
          };
          if (beforeFn) {
            beforeFn();
          }
          return useInvoke(context, fn2, ...args);
        }
        throw qError(QError_qrlIsNotFunction);
      });
    };
  }
  copy() {
    const copy = new QRL(this.$chunk$, this.$symbol$, this.$symbolRef$, this.$symbolFn$, null, this.$captureRef$);
    copy.$refSymbol$ = this.$refSymbol$;
    return copy;
  }
  async invoke(...args) {
    const fn = this.invokeFn();
    const result = await fn(...args);
    return result;
  }
  serialize(options) {
    return stringifyQRL(this, options);
  }
};
var getSymbolHash = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};

// packages/qwik/src/testing/util.ts
import { pathToFileURL } from "url";
function toFileUrl(filePath) {
  return pathToFileURL(filePath).href;
}
function applyDocumentConfig(doc, config) {
  if (doc && config) {
    if (config.baseURI) {
      appendConfig(doc, `baseURI`, config.baseURI);
    }
    if (config.protocol) {
      for (const protocol in config.protocol) {
        appendConfig(doc, `protocol.${protocol}`, config.protocol[protocol]);
      }
    }
  }
}
function appendConfig(doc, key, value) {
  const linkElm = doc.createElement("link");
  linkElm.setAttribute(`rel`, `q.${key}`);
  linkElm.setAttribute(`href`, value);
  doc.head.appendChild(linkElm);
}
var __self = typeof self !== "undefined" && typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && self;

// packages/qwik/src/testing/element-fixture.ts
var ElementFixture = class {
  constructor(options = {}) {
    this.window = createWindow();
    this.document = this.window.document;
    this.superParent = this.document.createElement("super-parent");
    this.parent = this.document.createElement("parent");
    this.host = this.document.createElement(options.tagName || "host");
    this.child = this.document.createElement("child");
    this.superParent.appendChild(this.parent);
    this.parent.appendChild(this.host);
    this.host.appendChild(this.child);
    this.document.body.appendChild(this.superParent);
    applyDocumentConfig(this.document, options);
  }
};

// packages/qwik/src/testing/jsx.ts
function toDOM(jsx, parent) {
  const doc = parent ? parent.ownerDocument : createDocument();
  let element = doc.createElement(jsx.type);
  for (const attrName in jsx.props) {
    if (attrName !== "children") {
      const jsxValue = jsx.props[attrName];
      element.setAttribute(attrName, isQrl(jsxValue) ? stringifyQRL(jsxValue, { $element$: element }) : jsxValue);
    }
  }
  if (parent) {
    parent.appendChild(element);
    if (isTemplate(element)) {
      element = element.content;
    }
  }
  jsx.children.forEach((child) => {
    if (isJSXNode(child)) {
      toDOM(child, element);
    } else {
      element.appendChild(doc.createTextNode(String(child)));
    }
  });
  return element;
}
var isJSXNode = (n) => {
  return n && typeof n === "object" && n.constructor.name === "JSXNodeImpl";
};
function isTemplate(node) {
  const tagName = node && node.tagName || "";
  return tagName.toUpperCase() == "TEMPLATE";
}
export {
  ElementFixture,
  applyDocumentConfig,
  createDocument,
  createWindow,
  getTestPlatform,
  isPromise,
  toDOM,
  toFileUrl
};
