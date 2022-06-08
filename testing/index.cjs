/**
 * @license
 * @builder.io/qwik/testing
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
if (typeof globalThis == 'undefined') {
  const g = 'undefined' != typeof global ? global : 'undefined' != typeof window ? window : 'undefined' != typeof self ? self : {};
  g.globalThis = g;
}

var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/qwik/src/testing/index.ts
var testing_exports = {};
__export(testing_exports, {
  ElementFixture: () => ElementFixture,
  applyDocumentConfig: () => applyDocumentConfig,
  createDocument: () => createDocument,
  createWindow: () => createWindow,
  getTestPlatform: () => getTestPlatform,
  isPromise: () => isPromise,
  toDOM: () => toDOM,
  toFileUrl: () => toFileUrl
});
module.exports = __toCommonJS(testing_exports);

// packages/qwik/src/testing/document.ts
var import_server = require("../server.cjs");

// packages/qwik/src/testing/platform.ts
var import_qwik = require("../core.cjs");
var import_fs = require("fs");
var import_url = require("url");

// packages/qwik/src/core/util/qdev.ts
var qDev = globalThis.qDev !== false;
var qTest = globalThis.describe !== void 0;

// packages/qwik/src/core/util/log.ts
var STYLE = qDev ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;` : "";
var logError = (message, ...optionalParams) => {
  console.error("%cQWIK ERROR", STYLE, message, ...optionalParams);
};

// packages/qwik/src/core/assert/assert.ts
function assertDefined(value, text) {
  if (qDev) {
    if (value != null)
      return;
    throw newError(text || "Expected defined value");
  }
}
function assertEqual(value1, value2, text) {
  if (qDev) {
    if (value1 === value2)
      return;
    throw newError(text || `Expected '${value1}' === '${value2}'.`);
  }
}
function newError(text) {
  debugger;
  const error = new Error(text);
  logError(error);
  return error;
}

// packages/qwik/src/core/util/markers.ts
var QContainerSelector = "[q\\:container]";

// packages/qwik/src/core/util/dom.ts
function getDocument(node) {
  if (typeof document !== "undefined") {
    return document;
  }
  if (node.nodeType === 9) {
    return node;
  }
  let doc = node.ownerDocument;
  while (doc && doc.nodeType !== 9) {
    doc = doc.parentNode;
  }
  assertDefined(doc);
  return doc;
}

// packages/qwik/src/core/use/use-core.ts
var CONTAINER = Symbol("container");
var _context;
function useInvoke(context, fn, ...args) {
  const previousContext = _context;
  let returnValue;
  try {
    _context = context;
    returnValue = fn.apply(null, args);
  } finally {
    const currentCtx = _context;
    _context = previousContext;
    if (currentCtx.waitOn && currentCtx.waitOn.length > 0) {
      return Promise.all(currentCtx.waitOn).then(() => returnValue);
    }
  }
  return returnValue;
}
function newInvokeContext(doc, hostElement, element, event, url) {
  return {
    seq: 0,
    doc,
    hostElement,
    element,
    event,
    url: url || null,
    qrl: void 0
  };
}
function getContainer(el) {
  let container = el[CONTAINER];
  if (!container) {
    container = el.closest(QContainerSelector);
    el[CONTAINER] = container;
  }
  return container;
}

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
      return Promise.resolve().then(() => __toESM(require(importPath))).then((mod2) => {
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
  (0, import_qwik.setPlatform)(document2, platform);
}
function toUrl(doc, element, url) {
  var _a;
  const containerEl = getContainer(element);
  const base = new URL((_a = containerEl == null ? void 0 : containerEl.getAttribute("q:base")) != null ? _a : doc.baseURI, doc.baseURI);
  return new URL(url, base);
}
function toPath(url) {
  const normalizedUrl = new URL(String(url));
  normalizedUrl.hash = "";
  normalizedUrl.search = "";
  const path = (0, import_url.fileURLToPath)(String(normalizedUrl));
  const importPaths = [path, ...testExts.map((ext) => path + ext)];
  for (const importPath of importPaths) {
    if ((0, import_fs.existsSync)(importPath)) {
      return importPath;
    }
  }
  throw new Error(`Unable to find path for import "${url}"`);
}
function getTestPlatform(document2) {
  const testPlatform = (0, import_qwik.getPlatform)(document2);
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
  const win = (0, import_server._createDocument)(opts).defaultView;
  setTestPlatform(win.document);
  return win;
}
function createDocument(opts = {}) {
  const doc = (0, import_server._createDocument)(opts);
  setTestPlatform(doc);
  return doc;
}

// packages/qwik/src/core/util/promises.ts
function isPromise(value) {
  return value instanceof Promise;
}
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
      return Promise.resolve().then(() => __toESM(require(importURL))).then((mod2) => {
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
function findModule(module2) {
  return Object.values(module2).find(isModule) || module2;
}
function isModule(module2) {
  return typeof module2 === "object" && module2 && module2[Symbol.toStringTag] === "Module";
}
function toUrl2(doc, element, url) {
  var _a;
  const containerEl = getContainer(element);
  const base = new URL((_a = containerEl == null ? void 0 : containerEl.getAttribute("q:base")) != null ? _a : doc.baseURI, doc.baseURI);
  return new URL(url, base);
}
var getPlatform2 = (docOrNode) => {
  const doc = getDocument(docOrNode);
  return doc[DocumentPlatform] || (doc[DocumentPlatform] = createPlatform2(doc));
};
var DocumentPlatform = /* @__PURE__ */ Symbol();

// packages/qwik/src/core/import/qrl.ts
var RUNTIME_QRL = "/runtimeQRL";
function toInternalQRL(qrl) {
  assertEqual(isQrl(qrl), true);
  return qrl;
}
function qrlImport(element, qrl) {
  const qrl_ = toInternalQRL(qrl);
  if (qrl_.symbolRef)
    return qrl_.symbolRef;
  if (qrl_.symbolFn) {
    return qrl_.symbolRef = qrl_.symbolFn().then((module2) => qrl_.symbolRef = module2[qrl_.symbol]);
  } else {
    if (!element) {
      throw new Error(`QRL '${qrl_.chunk}#${qrl_.symbol || "default"}' does not have an attached container`);
    }
    const symbol = getPlatform2(element).importSymbol(element, qrl_.chunk, qrl_.symbol);
    return qrl_.symbolRef = then(symbol, (ref) => {
      return qrl_.symbolRef = ref;
    });
  }
}
function stringifyQRL(qrl, opts = {}) {
  var _a;
  const qrl_ = toInternalQRL(qrl);
  let symbol = qrl_.symbol;
  let chunk = qrl_.chunk;
  const refSymbol = (_a = qrl_.refSymbol) != null ? _a : symbol;
  const platform = opts.platform;
  const element = opts.element;
  if (platform) {
    const result = platform.chunkForSymbol(refSymbol);
    if (result) {
      chunk = result[1];
      if (!qrl_.refSymbol) {
        symbol = result[0];
      }
    }
  }
  const parts = [chunk];
  if (symbol && symbol !== "default") {
    parts.push("#", symbol);
  }
  const capture = qrl_.capture;
  const captureRef = qrl_.captureRef;
  if (opts.getObjId) {
    if (captureRef && captureRef.length) {
      const capture2 = captureRef.map(opts.getObjId);
      parts.push(`[${capture2.join(" ")}]`);
    }
  } else if (capture && capture.length > 0) {
    parts.push(`[${capture.join(" ")}]`);
  }
  const qrlString = parts.join("");
  if (qrl_.chunk === RUNTIME_QRL && element) {
    const qrls = element.__qrls__ || (element.__qrls__ = /* @__PURE__ */ new Set());
    qrls.add(qrl);
  }
  return qrlString;
}

// packages/qwik/src/core/import/qrl-class.ts
function isQrl(value) {
  return value instanceof QRLInternal;
}
var QRL = class {
  constructor(chunk, symbol, symbolRef, symbolFn, capture, captureRef) {
    this.chunk = chunk;
    this.symbol = symbol;
    this.symbolRef = symbolRef;
    this.symbolFn = symbolFn;
    this.capture = capture;
    this.captureRef = captureRef;
  }
  setContainer(el) {
    if (!this.el) {
      this.el = el;
    }
  }
  getSymbol() {
    var _a;
    return (_a = this.refSymbol) != null ? _a : this.symbol;
  }
  getCanonicalSymbol() {
    var _a;
    return getCanonicalSymbol((_a = this.refSymbol) != null ? _a : this.symbol);
  }
  async resolve(el) {
    if (el) {
      this.setContainer(el);
    }
    return qrlImport(this.el, this);
  }
  resolveIfNeeded(el) {
    return typeof this.symbolRef === "function" ? this.symbolRef : this.resolve(el);
  }
  invokeFn(el, currentCtx, beforeFn) {
    return (...args) => {
      const fn = this.resolveIfNeeded(el);
      return then(fn, (fn2) => {
        if (typeof fn2 === "function") {
          const baseContext = currentCtx != null ? currentCtx : newInvokeContext();
          const context = __spreadProps(__spreadValues({}, baseContext), {
            qrl: this
          });
          if (beforeFn) {
            beforeFn();
          }
          return useInvoke(context, fn2, ...args);
        }
        throw new Error("QRL is not a function");
      });
    };
  }
  copy() {
    const copy = new QRLInternal(this.chunk, this.symbol, this.symbolRef, this.symbolFn, null, this.captureRef);
    copy.refSymbol = this.refSymbol;
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
var getCanonicalSymbol = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};
var QRLInternal = QRL;

// packages/qwik/src/testing/util.ts
var import_url2 = require("url");
function toFileUrl(filePath) {
  return (0, import_url2.pathToFileURL)(filePath).href;
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
      element.setAttribute(attrName, isQrl(jsxValue) ? stringifyQRL(jsxValue, { element }) : jsxValue);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ElementFixture,
  applyDocumentConfig,
  createDocument,
  createWindow,
  getTestPlatform,
  isPromise,
  toDOM,
  toFileUrl
});
