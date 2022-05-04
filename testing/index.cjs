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
var logWarn = (message, ...optionalParams) => {
  console.warn("%cQWIK WARN", STYLE, message, ...optionalParams);
};
var logDebug = (message, ...optionalParams) => {
  if (qDev) {
    console.debug("%cQWIK", STYLE, message, ...optionalParams);
  }
};

// packages/qwik/src/core/assert/assert.ts
function assertDefined(value, text) {
  if (qDev) {
    if (value != null)
      return;
    throw newError(text || "Expected defined value.");
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
var QHostAttr = "q:host";
var OnRenderProp = "q:renderFn";
var ComponentScopedStyles = "q:sstyle";
var ComponentStylesPrefixHost = "\u{1F48E}";
var ComponentStylesPrefixContent = "\u2B50\uFE0F";
var QSlotAttr = "q:slot";
var QObjAttr = "q:obj";
var QSeqAttr = "q:seq";
var QContainerAttr = "q:container";
var QContainerSelector = "[q\\:container]";
var RenderEvent = "qRender";
var ELEMENT_ID = "q:id";
var ELEMENT_ID_PREFIX = "#";

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
function isStyleTask(obj) {
  return obj && typeof obj === "object" && obj.type === "style";
}
var _context;
function tryGetInvokeContext() {
  if (!_context) {
    const context = typeof document !== "undefined" && document && document.__q_context__;
    if (!context) {
      return void 0;
    }
    if (Array.isArray(context)) {
      const element = context[0];
      const hostElement = getHostElement(element);
      assertDefined(element);
      return document.__q_context__ = newInvokeContext(getDocument(element), hostElement, element, context[1], context[2]);
    }
    return context;
  }
  return _context;
}
function getInvokeContext() {
  const ctx = tryGetInvokeContext();
  if (!ctx) {
    throw new Error("Q-ERROR: invoking 'use*()' method outside of invocation context.");
  }
  return ctx;
}
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
function useWaitOn(promise) {
  const ctx = getInvokeContext();
  (ctx.waitOn || (ctx.waitOn = [])).push(promise);
}
function getHostElement(el) {
  let foundSlot = false;
  let node = el;
  while (node) {
    const isHost = node.hasAttribute(QHostAttr);
    const isSlot = node.tagName === "Q:SLOT";
    if (isHost) {
      if (!foundSlot) {
        break;
      } else {
        foundSlot = false;
      }
    }
    if (isSlot) {
      foundSlot = true;
    }
    node = node.parentElement;
  }
  return node;
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
    nextTick: (renderMarked2) => {
      if (!render) {
        render = {
          fn: renderMarked2,
          promise: null,
          resolve: null,
          reject: null
        };
        render.promise = new Promise((resolve, reject) => {
          render.resolve = resolve;
          render.reject = reject;
        });
      } else if (renderMarked2 !== render.fn) {
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
  const win = (0, import_server.createWindow)(opts);
  setTestPlatform(win.document);
  return win;
}
function createDocument(opts = {}) {
  return createWindow(opts).document;
}

// packages/qwik/src/core/util/types.ts
function isHtmlElement(node) {
  return node ? node.nodeType === NodeType.ELEMENT_NODE : false;
}
var NodeType = /* @__PURE__ */ ((NodeType2) => {
  NodeType2[NodeType2["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
  NodeType2[NodeType2["ATTRIBUTE_NODE"] = 2] = "ATTRIBUTE_NODE";
  NodeType2[NodeType2["TEXT_NODE"] = 3] = "TEXT_NODE";
  NodeType2[NodeType2["CDATA_SECTION_NODE"] = 4] = "CDATA_SECTION_NODE";
  NodeType2[NodeType2["PROCESSING_INSTRUCTION_NODE"] = 7] = "PROCESSING_INSTRUCTION_NODE";
  NodeType2[NodeType2["COMMENT_NODE"] = 8] = "COMMENT_NODE";
  NodeType2[NodeType2["DOCUMENT_NODE"] = 9] = "DOCUMENT_NODE";
  NodeType2[NodeType2["DOCUMENT_TYPE_NODE"] = 10] = "DOCUMENT_TYPE_NODE";
  NodeType2[NodeType2["DOCUMENT_FRAGMENT_NODE"] = 11] = "DOCUMENT_FRAGMENT_NODE";
  return NodeType2;
})(NodeType || {});

// packages/qwik/src/core/error/stringify.ts
function stringifyDebug(value) {
  if (value == null)
    return String(value);
  if (typeof value === "function")
    return value.name;
  if (isHtmlElement(value))
    return stringifyElement(value);
  if (value instanceof URL)
    return String(value);
  if (typeof value === "object")
    return JSON.stringify(value, function(key, value2) {
      if (isHtmlElement(value2))
        return stringifyElement(value2);
      return value2;
    });
  return String(value);
}
function stringifyElement(element) {
  let html = "<" + element.localName;
  const attributes = element.attributes;
  const names = [];
  for (let i = 0; i < attributes.length; i++) {
    names.push(attributes[i].name);
  }
  names.sort();
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    let value = element.getAttribute(name);
    if (value == null ? void 0 : value.startsWith("file:/")) {
      value = value.replace(/(file:\/\/).*(\/.*)$/, (all, protocol, file) => protocol + "..." + file);
    }
    html += " " + name + (value == null || value == "" ? "" : "='" + value.replace("'", "&apos;") + "'");
  }
  return html + ">";
}

// packages/qwik/src/core/error/error.ts
function qError(code, ...args) {
  if (qDev) {
    const text = codeToText(code);
    const parts = text.split("{}");
    const error = parts.map((value, index) => {
      return value + (index === parts.length - 1 ? "" : stringifyDebug(args[index]));
    }).join("");
    debugger;
    return new Error(error);
  } else {
    return new Error(`QError ` + code);
  }
}
function codeToText(code) {
  const area = {
    0: "ERROR",
    1: "QRL-ERROR",
    2: "INJECTOR-ERROR",
    3: "SERVICE-ERROR",
    4: "COMPONENT-ERROR",
    5: "PROVIDER-ERROR",
    6: "RENDER-ERROR",
    7: "EVENT-ERROR"
  }[Math.floor(code / 100)];
  const text = {
    [0 /* TODO */]: "{}",
    [1 /* Core_qConfigNotFound_path */]: "QConfig not found in path '{}'.",
    [2 /* Core_unrecognizedStack_frame */]: "Unrecognized stack format '{}'",
    [3 /* Core_noAttribute_atr1_element */]: "Could not find entity state '{}' at '{}' or any of it's parents.",
    [4 /* Core_noAttribute_atr1_attr2_element */]: "Could not find entity state '{}' ( or entity provider '{}') at '{}' or any of it's parents.",
    [5 /* Core_missingProperty_name_props */]: "Missing property '{}' in props '{}'.",
    [6 /* Core_missingExport_name_url_props */]: "Missing export '{}' from '{}'. Exported symbols are: {}",
    [100 /* QRL_expectFunction_url_actual */]: "QRL '${}' should point to function, was '{}'.",
    [200 /* Injector_noHost_element */]: "Can't find host element above '{}'.",
    [201 /* Injector_expectedSpecificInjector_expected_actual */]: "Provider is expecting '{}' but got '{}'.",
    [202 /* Injector_notElement_arg */]: "Expected 'Element' was '{}'.",
    [203 /* Injector_wrongMethodThis_expected_actual */]: "Expected injection 'this' to be of type '{}', but was of type '{}'.",
    [204 /* Injector_missingSerializedState_entityKey_element */]: "Entity key '{}' is found on '{}' but does not contain state. Was 'serializeState()' not run during dehydration?",
    [206 /* Injector_notFound_element */]: "No injector can be found starting at '{}'.",
    [207 /* Injector_eventInjectorNotSerializable */]: "EventInjector does not support serialization.",
    [300 /* Entity_notValidKey_key */]: "Data key '{}' is not a valid key.\n  - Data key can only contain characters (preferably lowercase) or number\n  - Data key is prefixed with entity name\n  - Data key is made up from parts that are separated with ':'.",
    [301 /* Entity_keyAlreadyExists_key */]: "A entity with key '{}' already exists.",
    [303 /* Entity_invalidAttribute_name */]: "'{}' is not a valid attribute. Attributes can only contain 'a-z' (lowercase), '0-9', '-' and '_'.",
    [304 /* Entity_missingExpandoOrState_attrName */]: "Found '{}' but expando did not have entity and attribute did not have state.",
    [305 /* Entity_elementMissingEntityAttr_element_attr */]: "Element '{}' is missing entity attribute definition '{}'.",
    [306 /* Entity_noState_entity_props */]: "Unable to create state for entity '{}' with props '{}' because no state found and '$newState()' method was not defined on entity.",
    [307 /* Entity_expected_obj */]: "'{}' is not an instance of 'Entity'.",
    [308 /* Entity_overridesConstructor_entity */]: "'{}' overrides 'constructor' property preventing 'EntityType' retrieval.",
    [311 /* Entity_no$keyProps_entity */]: "Entity '{}' does not define '$keyProps'.",
    [310 /* Entity_no$type_entity */]: "Entity '{}' must have static '$type' property defining the name of the entity.",
    [312 /* Entity_no$qrl_entity */]: "Entity '{}' must have static '$qrl' property defining the import location of the entity.",
    [313 /* Entity_nameCollision_name_currentQrl_expectedQrl */]: "Name collision. Already have entity named '{}' with QRL '{}' but expected QRL '{}'.",
    [309 /* Entity_keyMissingParts_key_key */]: "Entity key '{}' is missing values. Expecting '{}:someValue'.",
    [314 /* Entity_keyTooManyParts_entity_parts_key */]: "Entity '{}' defines '$keyProps' as  '{}'. Actual key '{}' has more parts than entity defines.",
    [315 /* Entity_keyNameMismatch_key_name_entity_name */]: "Key '{}' belongs to entity named '{}', but expected entity '{}' with name '{}'.",
    [316 /* Entity_stateMissingKey_state */]: "Entity state is missing '$key'. Are you sure you passed in state? Got '{}'.",
    [400 /* Component_bindNeedsKey */]: `'bind:' must have an key. (Example: 'bind:key="propertyName"').`,
    [401 /* Component_bindNeedsValue */]: `'bind:id' must have a property name. (Example: 'bind:key="propertyName"').`,
    [402 /* Component_needsState */]: "Can't find state on host element.",
    [403 /* Component_needsInjectionContext_constructor */]: "Components must be instantiated inside an injection context. Use '{}.new(...)' for creation.",
    [404 /* Component_noProperty_propName_props_host */]: "Property '{}' not found in '{}' on component '{}'.",
    [405 /* Component_notFound_component */]: "Unable to find '{}' component.",
    [406 /* Component_doesNotMatch_component_actual */]: "Requesting component type '{}' does not match existing component instance '{}'.",
    [408 /* Component_noState_component_props */]: "Unable to create state for component '{}' with props '{}' because no state found and '$newState()' method was not defined on component.",
    [500 /* Provider_unrecognizedFormat_value */]: "Unrecognized expression format '{}'.",
    [600 /* Render_unexpectedJSXNodeType_type */]: "Unexpected JSXNode<{}> type.",
    [601 /* Render_unsupportedFormat_obj_attr */]: "Value '{}' can't be written into '{}' attribute.",
    [602 /* Render_expectingEntity_entity */]: "Expecting entity object, got '{}'.",
    [603 /* Render_expectingEntityArray_obj */]: "Expecting array of entities, got '{}'.",
    [604 /* Render_expectingEntityOrComponent_obj */]: "Expecting Entity or Component got '{}'.",
    [699 /* Render_stateMachineStuck */]: "Render state machine did not advance.",
    [700 /* Event_emitEventRequiresName_url */]: "Missing '$type' attribute in the '{}' url.",
    [701 /* Event_emitEventCouldNotFindListener_event_element */]: "Re-emitting event '{}' but no listener found at '{}' or any of its parents."
  }[code];
  let textCode = "000" + code;
  textCode = textCode.slice(-3);
  return `${area}(Q-${textCode}): ${text}`;
}

// packages/qwik/src/core/util/promises.ts
function isPromise(value) {
  return value instanceof Promise;
}
var then = (promise, thenFn) => {
  return isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
};
var promiseAll = (promises) => {
  const hasPromise = promises.some(isPromise);
  if (hasPromise) {
    return Promise.all(promises);
  }
  return promises;
};

// packages/qwik/src/core/util/flyweight.ts
var EMPTY_ARRAY = [];
var EMPTY_OBJ = {};
if (qDev) {
  Object.freeze(EMPTY_ARRAY);
  Object.freeze(EMPTY_OBJ);
}

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

// packages/qwik/src/core/use/use-subscriber.ts
function wrapSubscriber(obj, subscriber) {
  if (obj && typeof obj === "object") {
    const target = obj[QOjectTargetSymbol];
    if (!target) {
      return obj;
    }
    return new Proxy(obj, {
      get(target2, prop) {
        if (prop === QOjectOriginalProxy) {
          return target2;
        }
        target2[SetSubscriber] = subscriber;
        return target2[prop];
      },
      ownKeys(target2) {
        target2[SetSubscriber] = subscriber;
        return Reflect.ownKeys(target2);
      }
    });
  }
  return obj;
}

// packages/qwik/src/core/import/qrl.ts
var runtimeSymbolId = 0;
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
    const symbol = getPlatform2(getDocument(element)).importSymbol(element, qrl_.chunk, qrl_.symbol);
    return qrl_.symbolRef = then(symbol, (ref) => {
      return qrl_.symbolRef = ref;
    });
  }
}
function runtimeQrl(symbol, lexicalScopeCapture = EMPTY_ARRAY) {
  return new QRLInternal(RUNTIME_QRL, "s" + runtimeSymbolId++, symbol, null, null, lexicalScopeCapture);
}
function stringifyQRL(qrl, opts = {}) {
  var _a, _b;
  const qrl_ = toInternalQRL(qrl);
  const symbol = qrl_.symbol;
  const refSymbol = (_a = qrl_.refSymbol) != null ? _a : symbol;
  const platform = opts.platform;
  const element = opts.element;
  const chunk = platform ? (_b = platform.chunkForSymbol(refSymbol)) != null ? _b : qrl_.chunk : qrl_.chunk;
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
function parseQRL(qrl, el) {
  const endIdx = qrl.length;
  const hashIdx = indexOf(qrl, 0, "#");
  const captureIdx = indexOf(qrl, hashIdx, "[");
  const chunkEndIdx = Math.min(hashIdx, captureIdx);
  const chunk = qrl.substring(0, chunkEndIdx);
  const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
  const symbolEndIdx = captureIdx;
  const symbol = symbolStartIdx == symbolEndIdx ? "default" : qrl.substring(symbolStartIdx, symbolEndIdx);
  const captureStartIdx = captureIdx;
  const captureEndIdx = endIdx;
  const capture = captureStartIdx === captureEndIdx ? EMPTY_ARRAY : qrl.substring(captureStartIdx + 1, captureEndIdx - 1).split(" ");
  if (chunk === RUNTIME_QRL) {
    logError(`Q-ERROR: '${qrl}' is runtime but no instance found on element.`);
  }
  const iQrl = new QRLInternal(chunk, symbol, null, null, capture, null);
  if (el) {
    iQrl.setContainer(el);
  }
  return iQrl;
}
function indexOf(text, startIdx, char) {
  const endIdx = text.length;
  const charIdx = text.indexOf(char, startIdx == endIdx ? 0 : startIdx);
  return charIdx == -1 ? endIdx : charIdx;
}
function toQrlOrError(symbolOrQrl) {
  if (!isQrl(symbolOrQrl)) {
    if (typeof symbolOrQrl == "function" || typeof symbolOrQrl == "string") {
      symbolOrQrl = runtimeQrl(symbolOrQrl);
    } else {
      throw new Error(`Q-ERROR Only 'function's and 'string's are supported.`);
    }
  }
  return symbolOrQrl;
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
    this.canonicalChunk = chunk.replace(FIND_EXT, "");
  }
  setContainer(el) {
    if (!this.el) {
      this.el = el;
    }
  }
  async resolve(el) {
    if (el) {
      this.setContainer(el);
    }
    return qrlImport(this.el, this);
  }
  invokeFn(el, currentCtx) {
    return (...args) => {
      const fn = typeof this.symbolRef === "function" ? this.symbolRef : this.resolve(el);
      return then(fn, (fn2) => {
        if (typeof fn2 === "function") {
          const baseContext = currentCtx != null ? currentCtx : newInvokeContext();
          const context = __spreadProps(__spreadValues({}, baseContext), {
            qrl: this
          });
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
  invoke(...args) {
    const fn = this.invokeFn();
    return fn(...args);
  }
  serialize(options) {
    return stringifyQRL(this, options);
  }
};
var QRLInternal = QRL;
var FIND_EXT = /\?[\w=&]+$/;

// packages/qwik/src/core/json/q-json.ts
function qDeflate(obj, hostCtx) {
  return String(hostCtx.refMap.add(obj));
}
function qInflate(ref, hostCtx) {
  const int = parseInt(ref, 10);
  const obj = hostCtx.refMap.get(int);
  assertEqual(hostCtx.refMap.array.length > int, true);
  return obj;
}

// packages/qwik/src/core/util/case.ts
function fromCamelToKebabCase(text) {
  return text.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// packages/qwik/src/core/props/props-on.ts
var ON_PROP_REGEX = /^on([A-Z]|-.).*Qrl$/;
var ON$_PROP_REGEX = /^on([A-Z]|-.).*\$$/;
function isOnProp(prop) {
  return ON_PROP_REGEX.test(prop);
}
function isOn$Prop(prop) {
  return ON$_PROP_REGEX.test(prop);
}
function qPropWriteQRL(rctx, ctx, prop, value) {
  if (!value) {
    return;
  }
  if (typeof value == "string") {
    value = parseQRL(value, ctx.element);
  }
  const existingQRLs = getExistingQRLs(ctx, prop);
  if (Array.isArray(value)) {
    value.forEach((value2) => qPropWriteQRL(rctx, ctx, prop, value2));
  } else if (isQrl(value)) {
    const cp = value.copy();
    cp.setContainer(ctx.element);
    const capture = cp.capture;
    if (capture == null) {
      const captureRef = cp.captureRef;
      cp.capture = captureRef && captureRef.length ? captureRef.map((ref) => qDeflate(ref, ctx)) : EMPTY_ARRAY;
    }
    for (let i = 0; i < existingQRLs.length; i++) {
      const qrl = existingQRLs[i];
      if (!isPromise(qrl) && qrl.canonicalChunk === cp.canonicalChunk && qrl.symbol === cp.symbol) {
        existingQRLs.splice(i, 1);
        i--;
      }
    }
    existingQRLs.push(cp);
  } else if (isPromise(value)) {
    const writePromise = value.then((qrl) => {
      existingQRLs.splice(existingQRLs.indexOf(writePromise), 1);
      qPropWriteQRL(rctx, ctx, prop, qrl);
      return qrl;
    });
    existingQRLs.push(writePromise);
  } else {
    throw qError(0 /* TODO */, `Not QRLInternal: prop: ${prop}; value: ` + value);
  }
  const kebabProp = fromCamelToKebabCase(prop);
  const newValue = serializeQRLs(existingQRLs, ctx);
  if (ctx.element.getAttribute(kebabProp) !== newValue) {
    if (rctx) {
      setAttribute(rctx, ctx.element, kebabProp, newValue);
    } else {
      ctx.element.setAttribute(kebabProp, newValue);
    }
  }
}
function getExistingQRLs(ctx, prop) {
  const key = "event:" + prop;
  let parts = ctx.cache.get(key);
  if (!parts) {
    const attrName = fromCamelToKebabCase(prop);
    parts = [];
    (ctx.element.getAttribute(attrName) || "").split("\n").forEach((qrl) => {
      if (qrl) {
        parts.push(parseQRL(qrl, ctx.element));
      }
    });
    ctx.cache.set(key, parts);
  }
  return parts;
}
function serializeQRLs(existingQRLs, ctx) {
  const platform = getPlatform2(getDocument(ctx.element));
  const element = ctx.element;
  const opts = {
    platform,
    element
  };
  return existingQRLs.map((qrl) => isPromise(qrl) ? "" : stringifyQRL(qrl, opts)).filter((v) => !!v).join("\n");
}

// packages/qwik/src/core/render/jsx/host.public.ts
var Host = { __brand__: "host" };
var SkipRerender = { __brand__: "skip" };

// packages/qwik/src/core/import/qrl.public.ts
function $(expression) {
  return runtimeQrl(expression);
}
function implicit$FirstArg(fn) {
  return function(first, ...rest) {
    return fn.call(null, $(first), ...rest);
  };
}

// packages/qwik/src/core/render/render.ts
function visitJsxNode(ctx, elm, jsxNode, isSvg) {
  if (jsxNode === void 0) {
    return smartUpdateChildren(ctx, elm, [], "root", isSvg);
  }
  if (Array.isArray(jsxNode)) {
    return smartUpdateChildren(ctx, elm, jsxNode.flat(), "root", isSvg);
  } else if (jsxNode.type === Host) {
    updateProperties(ctx, getContext(elm), jsxNode.props, isSvg);
    return smartUpdateChildren(ctx, elm, jsxNode.children || [], "root", isSvg);
  } else {
    return smartUpdateChildren(ctx, elm, [jsxNode], "root", isSvg);
  }
}

// packages/qwik/src/core/util/hash_code.ts
function hashCode(text, hash = 0) {
  if (text.length === 0)
    return hash;
  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return Number(Math.abs(hash)).toString(36);
}

// packages/qwik/src/core/component/qrl-styles.ts
function styleKey(qStyles) {
  return qStyles && String(hashCode(qStyles.symbol));
}
function styleHost(styleId) {
  return styleId && ComponentStylesPrefixHost + styleId;
}
function styleContent(styleId) {
  return styleId && ComponentStylesPrefixContent + styleId;
}

// packages/qwik/src/core/render/jsx/jsx-runtime.ts
var JSXNodeImpl = class {
  constructor(type, props, key = null) {
    this.type = type;
    this.props = props;
    this.children = EMPTY_ARRAY;
    this.text = void 0;
    this.key = null;
    if (key != null) {
      this.key = String(key);
    }
    if (props) {
      const children = processNode(props.children);
      if (children !== void 0) {
        if (Array.isArray(children)) {
          this.children = children;
        } else {
          this.children = [children];
        }
      }
    }
  }
};
function processNode(node) {
  if (node == null || typeof node === "boolean") {
    return void 0;
  }
  if (isJSXNode(node)) {
    if (node.type === Host || node.type === SkipRerender) {
      return node;
    } else if (typeof node.type === "function") {
      return processNode(node.type(__spreadProps(__spreadValues({}, node.props), { children: node.children }), node.key));
    } else {
      return node;
    }
  } else if (Array.isArray(node)) {
    return node.flatMap(processNode).filter((e) => e != null);
  } else if (typeof node === "string" || typeof node === "number" || typeof node === "boolean") {
    const newNode = new JSXNodeImpl("#text", null, null);
    newNode.text = String(node);
    return newNode;
  } else {
    logWarn("Unvalid node, skipping");
    return void 0;
  }
}
var isJSXNode = (n) => {
  if (qDev) {
    if (n instanceof JSXNodeImpl) {
      return true;
    }
    if (n && typeof n === "object" && n.constructor.name === JSXNodeImpl.name) {
      throw new Error(`Duplicate implementations of "JSXNodeImpl" found`);
    }
    return false;
  } else {
    return n instanceof JSXNodeImpl;
  }
};

// packages/qwik/src/core/component/component-ctx.ts
var firstRenderComponent = (rctx, ctx) => {
  ctx.element.setAttribute(QHostAttr, "");
  return renderComponent(rctx, ctx);
};
var renderComponent = (rctx, ctx) => {
  ctx.dirty = false;
  const hostElement = ctx.element;
  const onRenderQRL = ctx.renderQrl;
  assertDefined(onRenderQRL);
  rctx.globalState.hostsStaging.delete(hostElement);
  const invocatinContext = newInvokeContext(rctx.doc, hostElement, hostElement, RenderEvent);
  invocatinContext.subscriber = hostElement;
  const waitOn = invocatinContext.waitOn = [];
  ctx.refMap.array.forEach((obj) => {
    removeSub(obj, hostElement);
  });
  const onRenderFn = onRenderQRL.invokeFn(rctx.containerEl, invocatinContext);
  const renderPromise = onRenderFn(wrapSubscriber(getProps(ctx), hostElement));
  return then(renderPromise, (jsxNode) => {
    rctx.hostElements.add(hostElement);
    const waitOnPromise = promiseAll(waitOn);
    return then(waitOnPromise, (waitOnResolved) => {
      var _a;
      waitOnResolved.forEach((task) => {
        if (isStyleTask(task)) {
          appendStyle(rctx, hostElement, task);
        }
      });
      if (ctx.dirty) {
        logDebug("Dropping render. State changed during render.");
        return renderComponent(rctx, ctx);
      }
      let componentCtx = ctx.component;
      if (!componentCtx) {
        componentCtx = ctx.component = {
          hostElement,
          slots: [],
          styleHostClass: void 0,
          styleClass: void 0,
          styleId: void 0
        };
        const scopedStyleId = (_a = hostElement.getAttribute(ComponentScopedStyles)) != null ? _a : void 0;
        if (scopedStyleId) {
          componentCtx.styleId = scopedStyleId;
          componentCtx.styleHostClass = styleHost(scopedStyleId);
          componentCtx.styleClass = styleContent(scopedStyleId);
          hostElement.classList.add(componentCtx.styleHostClass);
        }
      }
      componentCtx.slots = [];
      const newCtx = __spreadProps(__spreadValues({}, rctx), {
        component: componentCtx
      });
      return visitJsxNode(newCtx, hostElement, processNode(jsxNode), false);
    });
  });
};

// packages/qwik/src/core/util/element.ts
function isNode(value) {
  return value && typeof value.nodeType == "number";
}
function isDocument(value) {
  return value && value.nodeType == 9 /* DOCUMENT_NODE */;
}
function isElement(value) {
  return isNode(value) && value.nodeType == 1 /* ELEMENT_NODE */;
}

// packages/qwik/src/core/object/store.ts
var UNDEFINED_PREFIX = "";
var QRL_PREFIX = "";
var DOCUMENT_PREFIX = "";
function resumeContainer(containerEl) {
  if (!isContainer(containerEl)) {
    logWarn("Skipping hydration because parent element is not q:container");
    return;
  }
  const doc = getDocument(containerEl);
  const isDocElement = containerEl === doc.documentElement;
  const parentJSON = isDocElement ? doc.body : containerEl;
  const script = getQwikJSON(parentJSON);
  if (!script) {
    logWarn("Skipping hydration qwik/json metadata was not found.");
    return;
  }
  script.remove();
  const map = getProxyMap(doc);
  const meta = JSON.parse(script.textContent || "{}");
  const elements = /* @__PURE__ */ new Map();
  getNodesInScope(containerEl, hasQId).forEach((el) => {
    const id = el.getAttribute(ELEMENT_ID);
    elements.set(ELEMENT_ID_PREFIX + id, el);
  });
  const getObject = (id) => {
    return getObjectImpl(id, elements, meta.objs, map);
  };
  reviveValues(meta.objs, meta.subs, getObject, map, parentJSON);
  for (const obj of meta.objs) {
    reviveNestedObjects(obj, getObject);
  }
  getNodesInScope(containerEl, hasQObj).forEach((el) => {
    const qobj = el.getAttribute(QObjAttr);
    const seq = el.getAttribute(QSeqAttr);
    const host = el.getAttribute(QHostAttr);
    const ctx = getContext(el);
    qobj.split(" ").forEach((part) => {
      if (part !== "") {
        const obj = getObject(part);
        ctx.refMap.add(obj);
      } else if (qDev) {
        logError("QObj contains empty ref");
      }
    });
    ctx.seq = seq.split(" ").map((part) => strToInt(part));
    if (host) {
      const [props, renderQrl] = host.split(" ").map(strToInt);
      assertDefined(props);
      assertDefined(renderQrl);
      ctx.props = ctx.refMap.get(props);
      ctx.renderQrl = ctx.refMap.get(renderQrl);
    }
  });
  containerEl.setAttribute(QContainerAttr, "resumed");
  logDebug("Container resumed");
}
function getQwikJSON(parentElm) {
  let child = parentElm.lastElementChild;
  while (child) {
    if (child.tagName === "SCRIPT" && child.getAttribute("type") === "qwik/json") {
      return child;
    }
    child = child.previousElementSibling;
  }
  return void 0;
}
function getNodesInScope(parent, predicate) {
  const nodes = [];
  walkNodes(nodes, parent, predicate);
  return nodes;
}
function walkNodes(nodes, parent, predicate) {
  let child = parent.firstElementChild;
  while (child) {
    if (!isContainer(child)) {
      if (predicate(child)) {
        nodes.push(child);
      }
      walkNodes(nodes, child, predicate);
    }
    child = child.nextElementSibling;
  }
}
function reviveValues(objs, subs, getObject, map, containerEl) {
  for (let i = 0; i < objs.length; i++) {
    const value = objs[i];
    if (typeof value === "string") {
      if (value === UNDEFINED_PREFIX) {
        objs[i] = void 0;
      } else if (value === DOCUMENT_PREFIX) {
        objs[i] = getDocument(containerEl);
      } else if (value.startsWith(QRL_PREFIX)) {
        objs[i] = parseQRL(value.slice(1), containerEl);
      }
    } else {
      const sub = subs[i];
      if (sub) {
        const converted = /* @__PURE__ */ new Map();
        Object.entries(sub).forEach((entry) => {
          const el = getObject(entry[0]);
          if (!el) {
            logWarn("QWIK can not revive subscriptions because of missing element ID", entry, value);
            return;
          }
          const set = entry[1] === null ? null : new Set(entry[1]);
          converted.set(el, set);
        });
        _restoreQObject(value, map, converted);
      }
    }
  }
}
function reviveNestedObjects(obj, getObject) {
  if (obj && typeof obj == "object") {
    if (isQrl(obj)) {
      if (obj.capture && obj.capture.length > 0) {
        obj.captureRef = obj.capture.map(getObject);
        obj.capture = null;
      }
      return;
    } else if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const value = obj[i];
        if (typeof value == "string") {
          obj[i] = getObject(value);
        } else {
          reviveNestedObjects(value, getObject);
        }
      }
    } else if (Object.getPrototypeOf(obj) === Object.prototype) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if (typeof value == "string") {
            obj[key] = getObject(value);
          } else {
            reviveNestedObjects(value, getObject);
          }
        }
      }
    }
  }
}
function getObjectImpl(id, elements, objs, map) {
  if (id.startsWith(ELEMENT_ID_PREFIX)) {
    assertEqual(elements.has(id), true);
    return elements.get(id);
  }
  const index = strToInt(id);
  assertEqual(objs.length > index, true);
  const obj = objs[index];
  const needsProxy = id.endsWith("!");
  if (needsProxy) {
    const finalObj = map.get(obj);
    assertDefined(finalObj);
    return finalObj;
  }
  return obj;
}
function isContainer(el) {
  return el.hasAttribute(QContainerAttr);
}
function hasQObj(el) {
  return el.hasAttribute(QObjAttr);
}
function hasQId(el) {
  return el.hasAttribute(ELEMENT_ID);
}
var intToStr = (nu) => {
  return nu.toString(36);
};
var strToInt = (nu) => {
  return parseInt(nu, 36);
};

// packages/qwik/src/core/render/cursor.ts
var SVG_NS = "http://www.w3.org/2000/svg";
function smartUpdateChildren(ctx, elm, ch, mode, isSvg) {
  if (ch.length === 1 && ch[0].type === SkipRerender) {
    if (elm.firstChild !== null) {
      return;
    }
    ch = ch[0].children;
  }
  const oldCh = getChildren(elm, mode);
  if (oldCh.length > 0 && ch.length > 0) {
    return updateChildren(ctx, elm, oldCh, ch, isSvg);
  } else if (ch.length > 0) {
    return addVnodes(ctx, elm, void 0, ch, 0, ch.length - 1, isSvg);
  } else if (oldCh.length > 0) {
    return removeVnodes(ctx, elm, oldCh, 0, oldCh.length - 1);
  }
}
function updateChildren(ctx, parentElm, oldCh, newCh, isSvg) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx;
  let idxInOld;
  let elmToMove;
  const results = [];
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      results.push(patchVnode(ctx, oldStartVnode, newStartVnode, isSvg));
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      results.push(patchVnode(ctx, oldEndVnode, newEndVnode, isSvg));
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      results.push(patchVnode(ctx, oldStartVnode, newEndVnode, isSvg));
      insertBefore(ctx, parentElm, oldStartVnode, oldEndVnode.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      results.push(patchVnode(ctx, oldEndVnode, newStartVnode, isSvg));
      insertBefore(ctx, parentElm, oldEndVnode, oldStartVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      if (oldKeyToIdx === void 0) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }
      idxInOld = oldKeyToIdx[newStartVnode.key];
      if (idxInOld === void 0) {
        const newElm = createElm(ctx, newStartVnode, isSvg);
        results.push(then(newElm, (newElm2) => {
          insertBefore(ctx, parentElm, newElm2, oldStartVnode);
        }));
      } else {
        elmToMove = oldCh[idxInOld];
        if (elmToMove.nodeName !== newStartVnode.type) {
          const newElm = createElm(ctx, newStartVnode, isSvg);
          results.push(then(newElm, (newElm2) => {
            insertBefore(ctx, parentElm, newElm2, oldStartVnode);
          }));
        } else {
          results.push(patchVnode(ctx, elmToMove, newStartVnode, isSvg));
          oldCh[idxInOld] = void 0;
          insertBefore(ctx, parentElm, elmToMove, oldStartVnode);
        }
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  if (newStartIdx <= newEndIdx) {
    const before = newCh[newEndIdx + 1] == null ? void 0 : newCh[newEndIdx + 1].elm;
    results.push(addVnodes(ctx, parentElm, before, newCh, newStartIdx, newEndIdx, isSvg));
  }
  let wait = promiseAll(results);
  if (oldStartIdx <= oldEndIdx) {
    wait = then(wait, () => {
      removeVnodes(ctx, parentElm, oldCh, oldStartIdx, oldEndIdx);
    });
  }
  return wait;
}
function isComponentNode(node) {
  return node.props && OnRenderProp in node.props;
}
function getCh(elm) {
  return Array.from(elm.childNodes).filter(isNode2);
}
function getChildren(elm, mode) {
  switch (mode) {
    case "default":
      return getCh(elm);
    case "slot":
      return getCh(elm).filter(isChildSlot);
    case "root":
      return getCh(elm).filter(isChildComponent);
    case "fallback":
      return getCh(elm).filter(isFallback);
  }
}
function isNode2(elm) {
  const type = elm.nodeType;
  return type === 1 || type === 3 || type === 8;
}
function isFallback(node) {
  return node.nodeName === "Q:FALLBACK";
}
function isChildSlot(node) {
  return node.nodeName !== "Q:FALLBACK" && isChildComponent(node);
}
function isSlotTemplate(node) {
  return node.nodeName === "TEMPLATE" && node.hasAttribute(QSlotAttr);
}
function isChildComponent(node) {
  return node.nodeName !== "TEMPLATE" || !node.hasAttribute(QSlotAttr);
}
function splitBy(input, condition) {
  var _a;
  const output = {};
  for (const item of input) {
    const key = condition(item);
    const array = (_a = output[key]) != null ? _a : output[key] = [];
    array.push(item);
  }
  return output;
}
function patchVnode(rctx, elm, vnode, isSvg) {
  rctx.perf.visited++;
  vnode.elm = elm;
  const tag = vnode.type;
  if (tag === "#text") {
    if (elm.data !== vnode.text) {
      setProperty(rctx, elm, "data", vnode.text);
    }
    return;
  }
  if (tag === "#comment") {
    if (elm.data !== vnode.text) {
      setProperty(rctx, elm, "data", vnode.text);
    }
    return;
  }
  if (tag === Host || tag === SkipRerender) {
    return;
  }
  if (!isSvg) {
    isSvg = tag === "svg";
  }
  let promise;
  const props = vnode.props;
  const ctx = getContext(elm);
  const dirty = updateProperties(rctx, ctx, props, isSvg);
  const isSlot = tag === "q:slot";
  if (isSvg && vnode.type === "foreignObject") {
    isSvg = false;
  } else if (isSlot) {
    rctx.component.slots.push(vnode);
  }
  const isComponent = isComponentNode(vnode);
  if (dirty) {
    promise = renderComponent(rctx, ctx);
  }
  const ch = vnode.children;
  if (isComponent) {
    return then(promise, () => {
      const slotMaps = getSlots(ctx.component, elm);
      const splittedChidren = splitBy(ch, getSlotName);
      const promises = [];
      Object.entries(slotMaps.slots).forEach(([key, slotEl]) => {
        if (slotEl && !splittedChidren[key]) {
          const oldCh = getChildren(slotEl, "slot");
          if (oldCh.length > 0) {
            removeVnodes(rctx, slotEl, oldCh, 0, oldCh.length - 1);
          }
        }
      });
      Object.entries(splittedChidren).forEach(([key, ch2]) => {
        const slotElm = getSlotElement(rctx, slotMaps, elm, key);
        promises.push(smartUpdateChildren(rctx, slotElm, ch2, "slot", isSvg));
      });
      return then(promiseAll(promises), () => {
        removeTemplates(rctx, slotMaps);
      });
    });
  }
  const setsInnerHTML = checkInnerHTML(props);
  if (setsInnerHTML) {
    if (qDev && ch.length > 0) {
      logWarn("Node can not have children when innerHTML is set");
    }
    return;
  }
  return then(promise, () => {
    const mode = isSlot ? "fallback" : "default";
    return smartUpdateChildren(rctx, elm, ch, mode, isSvg);
  });
}
function addVnodes(ctx, parentElm, before, vnodes, startIdx, endIdx, isSvg) {
  const promises = [];
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx];
    assertDefined(ch);
    promises.push(createElm(ctx, ch, isSvg));
  }
  return then(promiseAll(promises), (children) => {
    for (const child of children) {
      insertBefore(ctx, parentElm, child, before);
    }
  });
}
function removeVnodes(ctx, parentElm, nodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = nodes[startIdx];
    assertDefined(ch);
    removeNode(ctx, ch);
  }
}
var refCount = 0;
var RefSymbol = Symbol();
function setSlotRef(ctx, hostElm, slotEl) {
  var _a;
  let ref = (_a = hostElm[RefSymbol]) != null ? _a : hostElm.getAttribute("q:sref");
  if (ref === null) {
    ref = intToStr(refCount++);
    hostElm[RefSymbol] = ref;
    setAttribute(ctx, hostElm, "q:sref", ref);
  }
  slotEl.setAttribute("q:sref", ref);
}
function getSlotElement(ctx, slotMaps, parentEl, slotName) {
  const slotEl = slotMaps.slots[slotName];
  if (slotEl) {
    return slotEl;
  }
  const templateEl = slotMaps.templates[slotName];
  if (templateEl) {
    return templateEl.content;
  }
  const template = createTemplate(ctx, slotName);
  prepend(ctx, parentEl, template);
  slotMaps.templates[slotName] = template;
  return template.content;
}
function createTemplate(ctx, slotName) {
  const template = createElement(ctx, "template", false);
  template.setAttribute(QSlotAttr, slotName);
  return template;
}
function removeTemplates(ctx, slotMaps) {
  Object.keys(slotMaps.templates).forEach((key) => {
    const template = slotMaps.templates[key];
    if (template && slotMaps.slots[key] !== void 0) {
      removeNode(ctx, template);
      slotMaps.templates[key] = void 0;
    }
  });
}
function resolveSlotProjection(ctx, hostElm, before, after) {
  Object.entries(before.slots).forEach(([key, slotEl]) => {
    if (slotEl && !after.slots[key]) {
      const template = createTemplate(ctx, key);
      const slotChildren = getChildren(slotEl, "slot");
      template.content.append(...slotChildren);
      hostElm.insertBefore(template, hostElm.firstChild);
      ctx.operations.push({
        el: template,
        operation: "slot-to-template",
        args: slotChildren,
        fn: () => {
        }
      });
    }
  });
  Object.entries(after.slots).forEach(([key, slotEl]) => {
    if (slotEl && !before.slots[key]) {
      const template = before.templates[key];
      if (template) {
        slotEl.appendChild(template.content);
        template.remove();
        ctx.operations.push({
          el: slotEl,
          operation: "template-to-slot",
          args: [template],
          fn: () => {
          }
        });
      }
    }
  });
}
function getSlotName(node) {
  var _a, _b;
  return (_b = (_a = node.props) == null ? void 0 : _a["q:slot"]) != null ? _b : "";
}
function createElm(rctx, vnode, isSvg) {
  rctx.perf.visited++;
  const tag = vnode.type;
  if (tag === "#text") {
    return vnode.elm = createTextNode(rctx, vnode.text);
  }
  if (tag === "#comment") {
    return vnode.elm = createCommentNode(rctx, vnode.text);
  }
  if (!isSvg) {
    isSvg = tag === "svg";
  }
  const props = vnode.props;
  const elm = vnode.elm = createElement(rctx, tag, isSvg);
  const isComponent = isComponentNode(vnode);
  const ctx = getContext(elm);
  setKey(elm, vnode.key);
  updateProperties(rctx, ctx, props, isSvg);
  if (isSvg && tag === "foreignObject") {
    isSvg = false;
  }
  const currentComponent = rctx.component;
  if (currentComponent) {
    const styleTag = currentComponent.styleClass;
    if (styleTag) {
      classlistAdd(rctx, elm, styleTag);
    }
    if (tag === "q:slot") {
      setSlotRef(rctx, currentComponent.hostElement, elm);
      rctx.component.slots.push(vnode);
    }
  }
  let wait;
  if (isComponent) {
    const renderQRL = props[OnRenderProp];
    ctx.renderQrl = renderQRL;
    ctx.refMap.add(renderQRL);
    wait = firstRenderComponent(rctx, ctx);
  } else {
    const setsInnerHTML = checkInnerHTML(props);
    if (setsInnerHTML) {
      if (qDev && vnode.children.length > 0) {
        logWarn("Node can not have children when innerHTML is set");
      }
      return elm;
    }
  }
  return then(wait, () => {
    let children = vnode.children;
    if (children.length > 0) {
      if (children.length === 1 && children[0].type === SkipRerender) {
        children = children[0].children;
      }
      const slotMap = isComponent ? getSlots(ctx.component, elm) : void 0;
      const promises = children.map((ch) => createElm(rctx, ch, isSvg));
      return then(promiseAll(promises), () => {
        let parent = elm;
        for (const node of children) {
          if (slotMap) {
            parent = getSlotElement(rctx, slotMap, elm, getSlotName(node));
          }
          parent.appendChild(node.elm);
        }
        return elm;
      });
    }
    return elm;
  });
}
var getSlots = (componentCtx, hostElm) => {
  var _a, _b, _c, _d, _e;
  const slots = {};
  const templates = {};
  const slotRef = hostElm.getAttribute("q:sref");
  const existingSlots = Array.from(hostElm.querySelectorAll(`q\\:slot[q\\:sref="${slotRef}"]`));
  const newSlots = (_a = componentCtx == null ? void 0 : componentCtx.slots) != null ? _a : EMPTY_ARRAY;
  const t = Array.from(hostElm.children).filter(isSlotTemplate);
  for (const elm of existingSlots) {
    slots[(_b = elm.getAttribute("name")) != null ? _b : ""] = elm;
  }
  for (const vnode of newSlots) {
    slots[(_d = (_c = vnode.props) == null ? void 0 : _c.name) != null ? _d : ""] = vnode.elm;
  }
  for (const elm of t) {
    templates[(_e = elm.getAttribute("q:slot")) != null ? _e : ""] = elm;
  }
  return { slots, templates };
};
var handleStyle = (ctx, elm, _, newValue) => {
  setAttribute(ctx, elm, "style", stringifyClassOrStyle(newValue, false));
  return true;
};
var handleClass = (ctx, elm, _, newValue) => {
  setAttribute(ctx, elm, "class", stringifyClassOrStyle(newValue, true));
  return true;
};
var checkBeforeAssign = (ctx, elm, prop, newValue) => {
  if (prop in elm) {
    if (elm[prop] !== newValue) {
      setProperty(ctx, elm, prop, newValue);
    }
  }
  return true;
};
var dangerouslySetInnerHTML = "dangerouslySetInnerHTML";
var setInnerHTML = (ctx, elm, _, newValue) => {
  if (dangerouslySetInnerHTML in elm) {
    setProperty(ctx, elm, dangerouslySetInnerHTML, newValue);
  } else if ("innerHTML" in elm) {
    setProperty(ctx, elm, "innerHTML", newValue);
  }
  return true;
};
var PROP_HANDLER_MAP = {
  style: handleStyle,
  class: handleClass,
  className: handleClass,
  value: checkBeforeAssign,
  checked: checkBeforeAssign,
  [dangerouslySetInnerHTML]: setInnerHTML
};
var ALLOWS_PROPS = ["class", "className", "style", "id", "q:slot"];
var HOST_PREFIX = "host:";
function updateProperties(rctx, ctx, expectProps, isSvg) {
  if (!expectProps) {
    return false;
  }
  const elm = ctx.element;
  const qwikProps = OnRenderProp in expectProps ? getProps(ctx) : void 0;
  for (let key of Object.keys(expectProps)) {
    if (key === "children" || key === OnRenderProp) {
      continue;
    }
    const newValue = expectProps[key];
    if (key === "ref") {
      newValue.current = elm;
      continue;
    }
    const oldValue = ctx.cache.get(key);
    if (newValue === oldValue) {
      continue;
    }
    ctx.cache.set(key, newValue);
    if (key.startsWith("data-") || key.startsWith("aria-")) {
      setAttribute(rctx, elm, key, newValue);
      continue;
    }
    if (qwikProps) {
      const skipProperty = ALLOWS_PROPS.includes(key);
      const hPrefixed = key.startsWith(HOST_PREFIX);
      if (!skipProperty && !hPrefixed) {
        qwikProps[key] = newValue;
        continue;
      }
      if (hPrefixed) {
        key = key.slice(HOST_PREFIX.length);
      }
    } else if (qDev && key.startsWith(HOST_PREFIX)) {
      logWarn(`${HOST_PREFIX} prefix can not be used in non components`);
      continue;
    }
    if (isOnProp(key)) {
      setEvent(rctx, ctx, key.slice(0, -3), newValue);
      continue;
    }
    if (isOn$Prop(key)) {
      setEvent(rctx, ctx, key.slice(0, -1), $(newValue));
      continue;
    }
    const exception = PROP_HANDLER_MAP[key];
    if (exception) {
      if (exception(rctx, elm, key, newValue, oldValue)) {
        continue;
      }
    }
    if (!isSvg && key in elm) {
      setProperty(rctx, elm, key, newValue);
      continue;
    }
    setAttribute(rctx, elm, key, newValue);
  }
  return ctx.dirty;
}
function setAttribute(ctx, el, prop, value) {
  const fn = () => {
    if (value == null) {
      el.removeAttribute(prop);
    } else {
      el.setAttribute(prop, String(value));
    }
  };
  ctx.operations.push({
    el,
    operation: "set-attribute",
    args: [prop, value],
    fn
  });
}
function classlistAdd(ctx, el, hostStyleTag) {
  const fn = () => {
    el.classList.add(hostStyleTag);
  };
  ctx.operations.push({
    el,
    operation: "classlist-add",
    args: [hostStyleTag],
    fn
  });
}
function setProperty(ctx, node, key, value) {
  const fn = () => {
    try {
      node[key] = value;
    } catch (err) {
      logError("Set property", { node, key, value }, err);
    }
  };
  ctx.operations.push({
    el: node,
    operation: "set-property",
    args: [key, value],
    fn
  });
}
function createElement(ctx, expectTag, isSvg) {
  const el = isSvg ? ctx.doc.createElementNS(SVG_NS, expectTag) : ctx.doc.createElement(expectTag);
  el[CONTAINER] = ctx.containerEl;
  ctx.operations.push({
    el,
    operation: "create-element",
    args: [expectTag],
    fn: () => {
    }
  });
  return el;
}
function insertBefore(ctx, parent, newChild, refChild) {
  const fn = () => {
    parent.insertBefore(newChild, refChild ? refChild : null);
  };
  ctx.operations.push({
    el: parent,
    operation: "insert-before",
    args: [newChild, refChild],
    fn
  });
  return newChild;
}
function appendStyle(ctx, hostElement, styleTask) {
  const fn = () => {
    var _a;
    const containerEl = ctx.containerEl;
    const stylesParent = ctx.doc.documentElement === containerEl ? (_a = ctx.doc.head) != null ? _a : containerEl : containerEl;
    if (!stylesParent.querySelector(`style[q\\:style="${styleTask.styleId}"]`)) {
      const style = ctx.doc.createElement("style");
      style.setAttribute("q:style", styleTask.styleId);
      style.textContent = styleTask.content;
      stylesParent.insertBefore(style, stylesParent.firstChild);
    }
  };
  ctx.operations.push({
    el: hostElement,
    operation: "append-style",
    args: [styleTask],
    fn
  });
}
function prepend(ctx, parent, newChild) {
  const fn = () => {
    parent.insertBefore(newChild, parent.firstChild);
  };
  ctx.operations.push({
    el: parent,
    operation: "prepend",
    args: [newChild],
    fn
  });
}
function removeNode(ctx, el) {
  const fn = () => {
    const parent = el.parentNode;
    if (parent) {
      parent.removeChild(el);
    } else if (qDev) {
      logWarn("Trying to remove component already removed", el);
    }
  };
  ctx.operations.push({
    el,
    operation: "remove",
    args: [],
    fn
  });
}
function createTextNode(ctx, text) {
  return ctx.doc.createTextNode(text);
}
function createCommentNode(ctx, text) {
  return ctx.doc.createComment(text);
}
function executeContextWithSlots(ctx) {
  const before = ctx.roots.map((elm) => getSlots(void 0, elm));
  executeContext(ctx);
  const after = ctx.roots.map((elm) => getSlots(void 0, elm));
  assertEqual(before.length, after.length);
  for (let i = 0; i < before.length; i++) {
    resolveSlotProjection(ctx, ctx.roots[i], before[i], after[i]);
  }
}
function executeContext(ctx) {
  for (const op of ctx.operations) {
    op.fn();
  }
}
function printRenderStats(ctx) {
  var _a;
  const byOp = {};
  for (const op of ctx.operations) {
    byOp[op.operation] = ((_a = byOp[op.operation]) != null ? _a : 0) + 1;
  }
  const affectedElements = Array.from(new Set(ctx.operations.map((a) => a.el)));
  const stats = {
    byOp,
    roots: ctx.roots,
    hostElements: Array.from(ctx.hostElements),
    affectedElements,
    visitedNodes: ctx.perf.visited,
    operations: ctx.operations.map((v) => [v.operation, v.el, ...v.args])
  };
  logDebug("Render stats", stats);
  return stats;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
  const map = {};
  for (let i = beginIdx; i <= endIdx; ++i) {
    const child = children[i];
    if (child.nodeType == 1 /* ELEMENT_NODE */) {
      const key = getKey(child);
      if (key !== void 0) {
        map[key] = i;
      }
    }
  }
  return map;
}
var KEY_SYMBOL = Symbol("vnode key");
function getKey(el) {
  let key = el[KEY_SYMBOL];
  if (key === void 0) {
    key = el[KEY_SYMBOL] = el.getAttribute("q:key");
  }
  return key;
}
function setKey(el, key) {
  if (typeof key === "string") {
    el.setAttribute("q:key", key);
  }
  el[KEY_SYMBOL] = key;
}
function sameVnode(vnode1, vnode2) {
  const isSameSel = vnode1.nodeName.toLowerCase() === vnode2.type;
  const isSameKey = vnode1.nodeType === 1 /* ELEMENT_NODE */ ? getKey(vnode1) === vnode2.key : true;
  return isSameSel && isSameKey;
}
function checkInnerHTML(props) {
  return props && ("innerHTML" in props || dangerouslySetInnerHTML in props);
}
function stringifyClassOrStyle(obj, isClass) {
  if (obj == null)
    return "";
  if (typeof obj == "object") {
    let text = "";
    let sep = "";
    if (Array.isArray(obj)) {
      if (!isClass) {
        throw qError(601 /* Render_unsupportedFormat_obj_attr */, obj, "style");
      }
      for (let i = 0; i < obj.length; i++) {
        text += sep + obj[i];
        sep = " ";
      }
    } else {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if (value) {
            text += isClass ? value ? sep + key : "" : sep + fromCamelToKebabCase(key) + ":" + value;
            sep = isClass ? " " : ";";
          }
        }
      }
    }
    return text;
  }
  return String(obj);
}

// packages/qwik/src/core/use/use-host-element.public.ts
function useHostElement() {
  const element = getInvokeContext().hostElement;
  assertDefined(element);
  return element;
}

// packages/qwik/src/core/use/use-document.public.ts
function useDocument() {
  const doc = getInvokeContext().doc;
  if (!doc) {
    throw new Error("Cant access document for existing context");
  }
  return doc;
}

// packages/qwik/src/core/use/use-store.public.ts
function useSequentialScope() {
  const ctx = getInvokeContext();
  assertEqual(ctx.event, RenderEvent);
  const index = ctx.seq;
  const hostElement = useHostElement();
  const elementCtx = getContext(hostElement);
  ctx.seq++;
  const updateFn = (value) => {
    elementCtx.seq[index] = elementCtx.refMap.add(value);
  };
  const seqIndex = elementCtx.seq[index];
  if (typeof seqIndex === "number") {
    return [elementCtx.refMap.get(seqIndex), updateFn];
  }
  return [void 0, updateFn];
}

// packages/qwik/src/core/use/use-url.public.ts
function useURL() {
  const url = getInvokeContext().url;
  if (!url) {
    throw new Error("Q-ERROR: no URL is associated with the execution context");
  }
  return url;
}

// packages/qwik/src/core/use/use-lexical-scope.public.ts
function useLexicalScope() {
  var _a;
  const context = getInvokeContext();
  const hostElement = context.hostElement;
  const qrl = (_a = context.qrl) != null ? _a : parseQRL(decodeURIComponent(String(useURL())), hostElement);
  if (qrl.captureRef == null) {
    const el = context.element;
    assertDefined(el);
    resumeIfNeeded(getContainer(el));
    const ctx = getContext(el);
    qrl.captureRef = qrl.capture.map((idx) => qInflate(idx, ctx));
  }
  const subscriber = context.subscriber;
  if (subscriber) {
    return qrl.captureRef.map((obj) => wrapSubscriber(obj, subscriber));
  }
  return qrl.captureRef;
}

// packages/qwik/src/core/component/component.public.ts
function useCleanupQrl(unmountFn) {
  throw new Error("IMPLEMENT: useCleanupQrl" + unmountFn);
}
var useCleanup$ = implicit$FirstArg(useCleanupQrl);
function useResumeQrl(resumeFn) {
  useOnWindow("qInit", resumeFn);
}
var useResume$ = implicit$FirstArg(useResumeQrl);
function useVisibleQrl(resumeFn) {
  useOn("qVisible", resumeFn);
}
var useVisible$ = implicit$FirstArg(useVisibleQrl);
function usePauseQrl(dehydrateFn) {
  throw new Error("IMPLEMENT: onPause" + dehydrateFn);
}
var usePause$ = implicit$FirstArg(usePauseQrl);
function useOn(event, eventFn) {
  const el = useHostElement();
  const ctx = getContext(el);
  qPropWriteQRL(void 0, ctx, `on:${event}`, eventFn);
}
function useOnWindow(event, eventFn) {
  const el = useHostElement();
  const ctx = getContext(el);
  qPropWriteQRL(void 0, ctx, `on-window:${event}`, eventFn);
}
function useStylesQrl(styles) {
  _useStyles(styles, false);
}
var useStyles$ = implicit$FirstArg(useStylesQrl);
function useScopedStylesQrl(styles) {
  _useStyles(styles, true);
}
var useScopedStyles$ = implicit$FirstArg(useScopedStylesQrl);
function _useStyles(styles, scoped) {
  const [style, setStyle] = useSequentialScope();
  if (style === true) {
    return;
  }
  setStyle(true);
  const styleQrl = toQrlOrError(styles);
  const styleId = styleKey(styleQrl);
  const hostElement = useHostElement();
  if (scoped) {
    hostElement.setAttribute(ComponentScopedStyles, styleId);
  }
  useWaitOn(styleQrl.resolve(hostElement).then((styleText) => {
    const task = {
      type: "style",
      styleId,
      content: scoped ? styleText.replace(/�/g, styleId) : styleText
    };
    return task;
  }));
}

// packages/qwik/src/core/watch/watch.public.ts
function handleWatch() {
  const [watch] = useLexicalScope();
  notifyWatch(watch);
}
function useEffectQrl(watchQrl, opts) {
  const [watch, setWatch] = useSequentialScope();
  if (!watch) {
    const hostElement = useHostElement();
    const watch2 = {
      watchQrl,
      hostElement,
      mode: 2 /* Effect */,
      isConnected: true,
      dirty: true
    };
    setWatch(watch2);
    getContext(hostElement).refMap.add(watch2);
    const run = opts == null ? void 0 : opts.run;
    if (run) {
      const watchHandler = new QRLInternal(watchQrl.chunk, "handleWatch", handleWatch, null, null, [watch2]);
      watchHandler.refSymbol = watchQrl.symbol;
      if ((opts == null ? void 0 : opts.run) === "load") {
        useResumeQrl(watchHandler);
      } else {
        useOn("qVisible", watchHandler);
      }
    }
  }
}
var useEffect$ = implicit$FirstArg(useEffectQrl);
function useClientEffectQrl(watchQrl, opts) {
  const [watch, setWatch] = useSequentialScope();
  if (!watch) {
    const hostElement = useHostElement();
    const isServer = getPlatform2(useDocument()).isServer;
    const watch2 = {
      watchQrl,
      hostElement,
      mode: 2 /* Effect */,
      isConnected: true,
      dirty: !isServer
    };
    setWatch(watch2);
    getContext(hostElement).refMap.add(watch2);
    if (isServer) {
      const watchHandler = new QRLInternal(watchQrl.chunk, "handleWatch", handleWatch, null, null, [watch2]);
      watchHandler.refSymbol = watchQrl.symbol;
      if ((opts == null ? void 0 : opts.run) === "load") {
        useResumeQrl(watchHandler);
      } else {
        useOn("qVisible", watchHandler);
      }
    }
  }
}
var useClientEffect$ = implicit$FirstArg(useClientEffectQrl);
function useServerQrl(watchQrl) {
  const [watch, setWatch] = useSequentialScope();
  if (!watch) {
    setWatch(true);
    const isServer = getPlatform2(useDocument()).isServer;
    if (isServer) {
      useWaitOn(watchQrl.invoke());
    }
  }
}
var useServer$ = implicit$FirstArg(useServerQrl);
function runWatch(watch) {
  if (!watch.dirty) {
    logDebug("Watch is not dirty, skipping run", watch);
    return Promise.resolve(watch);
  }
  watch.dirty = false;
  const promise = new Promise((resolve) => {
    then(watch.running, () => {
      const destroy = watch.destroy;
      if (destroy) {
        watch.destroy = void 0;
        try {
          destroy();
        } catch (err) {
          logError(err);
        }
      }
      const hostElement = watch.hostElement;
      const invokationContext = newInvokeContext(getDocument(hostElement), hostElement, hostElement, "WatchEvent");
      invokationContext.watch = watch;
      const watchFn = watch.watchQrl.invokeFn(hostElement, invokationContext);
      const tracker = (obj, prop) => {
        obj[SetSubscriber] = watch;
        if (prop) {
          return obj[prop];
        } else {
          return obj[QOjectAllSymbol];
        }
      };
      const captureRef = watch.watchQrl.captureRef;
      if (Array.isArray(captureRef)) {
        captureRef.forEach((obj) => {
          removeSub(obj, watch);
        });
      }
      return then(watchFn(tracker), (returnValue) => {
        if (typeof returnValue === "function") {
          watch.destroy = noSerialize(returnValue);
        }
        resolve(watch);
      });
    });
  });
  watch.running = noSerialize(promise);
  return promise;
}

// packages/qwik/src/core/render/notify-render.ts
function notifyRender(hostElement) {
  assertDefined(hostElement.getAttribute(QHostAttr));
  const containerEl = getContainer(hostElement);
  assertDefined(containerEl);
  resumeIfNeeded(containerEl);
  const ctx = getContext(hostElement);
  const state = getRenderingState(containerEl);
  if (ctx.dirty) {
    return state.renderPromise;
  }
  ctx.dirty = true;
  const activeRendering = state.hostsRendering !== void 0;
  if (activeRendering) {
    state.hostsStaging.add(hostElement);
    return state.renderPromise.then((ctx2) => {
      if (state.hostsNext.has(hostElement)) {
        return state.renderPromise;
      } else {
        return ctx2;
      }
    });
  } else {
    state.hostsNext.add(hostElement);
    return scheduleFrame(containerEl, state);
  }
}
function scheduleFrame(containerEl, state) {
  if (state.renderPromise === void 0) {
    state.renderPromise = getPlatform2(containerEl).nextTick(() => renderMarked(containerEl, state));
  }
  return state.renderPromise;
}
var SCHEDULE = Symbol("Render state");
function getRenderingState(containerEl) {
  let set = containerEl[SCHEDULE];
  if (!set) {
    containerEl[SCHEDULE] = set = {
      watchNext: /* @__PURE__ */ new Set(),
      watchStaging: /* @__PURE__ */ new Set(),
      watchRunning: /* @__PURE__ */ new Set(),
      hostsNext: /* @__PURE__ */ new Set(),
      hostsStaging: /* @__PURE__ */ new Set(),
      renderPromise: void 0,
      hostsRendering: void 0
    };
  }
  return set;
}
async function renderMarked(containerEl, state) {
  await waitForWatches(state);
  state.hostsRendering = new Set(state.hostsNext);
  state.hostsNext.clear();
  const doc = getDocument(containerEl);
  const platform = getPlatform2(containerEl);
  const renderingQueue = Array.from(state.hostsRendering);
  sortNodes(renderingQueue);
  const ctx = {
    doc,
    globalState: state,
    hostElements: /* @__PURE__ */ new Set(),
    operations: [],
    roots: [],
    containerEl,
    component: void 0,
    perf: {
      visited: 0,
      timing: []
    }
  };
  for (const el of renderingQueue) {
    if (!ctx.hostElements.has(el)) {
      ctx.roots.push(el);
      try {
        await renderComponent(ctx, getContext(el));
      } catch (e) {
        logError("Render failed", e, el);
      }
    }
  }
  if (ctx.operations.length === 0) {
    if (qDev) {
      if (typeof window !== "undefined" && window.document != null) {
        logDebug("Render skipped. No operations.");
        printRenderStats(ctx);
      }
    }
    postRendering(containerEl, state, ctx);
    return ctx;
  }
  return platform.raf(() => {
    executeContextWithSlots(ctx);
    if (qDev) {
      if (typeof window !== "undefined" && window.document != null) {
        printRenderStats(ctx);
      }
    }
    postRendering(containerEl, state, ctx);
    return ctx;
  });
}
async function postRendering(containerEl, state, ctx) {
  const promises = [];
  state.watchNext.forEach((watch) => {
    promises.push(runWatch(watch));
  });
  state.watchNext.clear();
  state.watchStaging.forEach((watch) => {
    if (ctx.hostElements.has(watch.hostElement)) {
      promises.push(runWatch(watch));
    } else {
      state.watchNext.add(watch);
    }
  });
  state.watchStaging.clear();
  await Promise.all(promises);
  state.hostsStaging.forEach((el) => {
    state.hostsNext.add(el);
  });
  state.hostsStaging.clear();
  state.hostsRendering = void 0;
  state.renderPromise = void 0;
  if (state.hostsNext.size + state.watchNext.size > 0) {
    scheduleFrame(containerEl, state);
  }
}
function sortNodes(elements) {
  elements.sort((a, b) => a.compareDocumentPosition(b) & 2 ? 1 : -1);
}

// packages/qwik/src/core/object/q-object.ts
var ProxyMapSymbol = Symbol("ProxyMapSymbol");
function getProxyMap(doc) {
  let map = doc[ProxyMapSymbol];
  if (!map) {
    map = doc[ProxyMapSymbol] = /* @__PURE__ */ new WeakMap();
  }
  return map;
}
function _restoreQObject(obj, map, subs) {
  return readWriteProxy(obj, map, subs);
}
function readWriteProxy(target, proxyMap, subs) {
  if (!target || typeof target !== "object")
    return target;
  let proxy = proxyMap.get(target);
  if (proxy)
    return proxy;
  proxy = new Proxy(target, new ReadWriteProxyHandler(proxyMap, subs));
  proxyMap.set(target, proxy);
  return proxy;
}
var QOjectTargetSymbol = ":target:";
var QOjectAllSymbol = ":all:";
var QOjectSubsSymbol = ":subs:";
var QOjectOriginalProxy = ":proxy:";
var SetSubscriber = Symbol("SetSubscriber");
function unwrapProxy(proxy) {
  if (proxy && typeof proxy == "object") {
    const value = proxy[QOjectTargetSymbol];
    if (value)
      return value;
  }
  return proxy;
}
function wrap(value, proxyMap) {
  if (value && typeof value === "object") {
    if (isQrl(value)) {
      return value;
    }
    const nakedValue = unwrapProxy(value);
    if (nakedValue !== value) {
      return value;
    }
    if (isNode(nakedValue)) {
      return value;
    }
    if (!shouldSerialize(nakedValue)) {
      return value;
    }
    if (qDev) {
      verifySerializable(value);
    }
    const proxy = proxyMap.get(value);
    return proxy ? proxy : readWriteProxy(value, proxyMap);
  } else {
    return value;
  }
}
var ReadWriteProxyHandler = class {
  constructor(proxyMap, subs = /* @__PURE__ */ new Map()) {
    this.proxyMap = proxyMap;
    this.subs = subs;
  }
  getSub(el) {
    let sub = this.subs.get(el);
    if (sub === void 0) {
      this.subs.set(el, sub = /* @__PURE__ */ new Set());
    }
    return sub;
  }
  get(target, prop) {
    let subscriber = this.subscriber;
    this.subscriber = void 0;
    if (typeof prop === "symbol") {
      return target[prop];
    }
    if (prop === QOjectTargetSymbol)
      return target;
    if (prop === QOjectSubsSymbol)
      return this.subs;
    if (prop === QOjectOriginalProxy)
      return this.proxyMap.get(target);
    const invokeCtx = tryGetInvokeContext();
    if (invokeCtx) {
      if (invokeCtx.subscriber === null) {
        subscriber = void 0;
      } else if (!subscriber) {
        subscriber = invokeCtx.subscriber;
      }
    } else if (qDev && !qTest && !subscriber) {
    }
    if (prop === QOjectAllSymbol) {
      if (subscriber) {
        this.subs.set(subscriber, null);
      }
      return target;
    }
    const value = target[prop];
    if (typeof prop === "symbol") {
      return value;
    }
    if (subscriber) {
      const isArray = Array.isArray(target);
      if (isArray) {
        this.subs.set(subscriber, null);
      } else {
        const sub = this.getSub(subscriber);
        if (sub) {
          sub.add(prop);
        }
      }
    }
    return wrap(value, this.proxyMap);
  }
  set(target, prop, newValue) {
    if (typeof prop === "symbol") {
      if (prop === SetSubscriber) {
        this.subscriber = newValue;
      } else {
        target[prop] = newValue;
      }
      return true;
    }
    const subs = this.subs;
    const unwrappedNewValue = unwrapProxy(newValue);
    if (qDev) {
      verifySerializable(unwrappedNewValue);
    }
    const isArray = Array.isArray(target);
    if (isArray) {
      target[prop] = unwrappedNewValue;
      subs.forEach((_, sub) => {
        if (sub.isConnected) {
          notifyChange(sub);
        } else {
          subs.delete(sub);
        }
      });
      return true;
    }
    const oldValue = target[prop];
    if (oldValue !== unwrappedNewValue) {
      target[prop] = unwrappedNewValue;
      subs.forEach((propSets, sub) => {
        if (sub.isConnected) {
          if (propSets === null || propSets.has(prop)) {
            notifyChange(sub);
          }
        } else {
          subs.delete(sub);
        }
      });
    }
    return true;
  }
  has(target, property) {
    if (property === QOjectTargetSymbol)
      return true;
    if (property === QOjectSubsSymbol)
      return true;
    return Object.prototype.hasOwnProperty.call(target, property);
  }
  ownKeys(target) {
    let subscriber = this.subscriber;
    const invokeCtx = tryGetInvokeContext();
    if (invokeCtx) {
      if (invokeCtx.subscriber === null) {
        subscriber = void 0;
      } else if (!subscriber) {
        subscriber = invokeCtx.subscriber;
      }
    } else if (qDev && !qTest && !subscriber) {
    }
    if (subscriber) {
      this.subs.set(subscriber, null);
    }
    return Object.getOwnPropertyNames(target);
  }
};
function removeSub(obj, subscriber) {
  if (obj && typeof obj === "object") {
    const subs = obj[QOjectSubsSymbol];
    if (subs) {
      subs.delete(subscriber);
    }
  }
}
function notifyChange(subscriber) {
  if (isElement(subscriber)) {
    notifyRender(subscriber);
  } else {
    notifyWatch(subscriber);
  }
}
function notifyWatch(watch) {
  const containerEl = getContainer(watch.hostElement);
  const state = getRenderingState(containerEl);
  watch.dirty = true;
  if (watch.mode === 0 /* Watch */) {
    const promise = runWatch(watch);
    state.watchRunning.add(promise);
    promise.then(() => {
      state.watchRunning.delete(promise);
    });
  } else {
    const activeRendering = state.hostsRendering !== void 0;
    if (activeRendering) {
      state.watchStaging.add(watch);
    } else {
      state.watchNext.add(watch);
      scheduleFrame(containerEl, state);
    }
  }
}
async function waitForWatches(state) {
  while (state.watchRunning.size > 0) {
    await Promise.all(state.watchRunning);
  }
}
function verifySerializable(value) {
  if (value == null) {
    return null;
  }
  if (shouldSerialize(value)) {
    const type = typeof value;
    if (type === "object") {
      if (Array.isArray(value))
        return;
      if (Object.getPrototypeOf(value) === Object.prototype)
        return;
      if (isQrl(value))
        return;
      if (isElement(value))
        return;
      if (isDocument(value))
        return;
    }
    if (["boolean", "string", "number"].includes(type)) {
      return;
    }
    throw qError(0 /* TODO */, "Only primitive and object literals can be serialized", value);
  }
}
var noSerializeSet = /* @__PURE__ */ new WeakSet();
function shouldSerialize(obj) {
  if (obj !== null && (typeof obj == "object" || typeof obj === "function")) {
    return !noSerializeSet.has(obj);
  }
  return true;
}
function noSerialize(input) {
  noSerializeSet.add(input);
  return input;
}

// packages/qwik/src/core/props/props-obj-map.ts
function newQObjectMap(element) {
  const array = [];
  let added = element.hasAttribute(QObjAttr);
  return {
    array,
    get(index) {
      return array[index];
    },
    indexOf(obj) {
      const index = array.indexOf(obj);
      return index === -1 ? void 0 : index;
    },
    add(object) {
      const index = array.indexOf(object);
      if (index === -1) {
        array.push(object);
        if (!added) {
          element.setAttribute(QObjAttr, "");
          added = true;
        }
        return array.length - 1;
      }
      return index;
    }
  };
}

// packages/qwik/src/core/props/props.ts
Error.stackTraceLimit = 9999;
var Q_CTX = "__ctx__";
function resumeIfNeeded(containerEl) {
  const isResumed = containerEl.getAttribute(QContainerAttr);
  if (isResumed === "paused") {
    resumeContainer(containerEl);
  }
}
function getContext(element) {
  let ctx = element[Q_CTX];
  if (!ctx) {
    const cache = /* @__PURE__ */ new Map();
    element[Q_CTX] = ctx = {
      element,
      cache,
      refMap: newQObjectMap(element),
      dirty: false,
      seq: [],
      props: void 0,
      renderQrl: void 0,
      component: void 0
    };
  }
  return ctx;
}
var PREFIXES = ["onWindow", "onWindow", "on"];
function normalizeOnProp(prop) {
  let scope = "on";
  for (const prefix of PREFIXES) {
    if (prop.startsWith(prefix)) {
      scope = prefix;
      prop = prop.slice(prefix.length);
    }
  }
  if (prop.startsWith("-")) {
    prop = prop.slice(1);
  } else {
    prop = prop.toLowerCase();
  }
  return `${scope}:${prop}`;
}
function setEvent(rctx, ctx, prop, value) {
  qPropWriteQRL(rctx, ctx, normalizeOnProp(prop), value);
}
function getProps(ctx) {
  if (!ctx.props) {
    ctx.props = readWriteProxy({}, getProxyMap(getDocument(ctx.element)));
    ctx.refMap.add(ctx.props);
  }
  return ctx.props;
}

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
function toDOM(jsx2, parent) {
  const doc = parent ? parent.ownerDocument : createDocument();
  let element = doc.createElement(jsx2.type);
  for (const attrName in jsx2.props) {
    if (attrName !== "children") {
      const jsxValue = jsx2.props[attrName];
      element.setAttribute(attrName, isQrl(jsxValue) ? stringifyQRL(jsxValue, { element }) : jsxValue);
    }
  }
  if (parent) {
    parent.appendChild(element);
    if (isTemplate(element)) {
      element = element.content;
    }
  }
  jsx2.children.forEach((child) => {
    if (isJSXNode2(child)) {
      toDOM(child, element);
    } else {
      element.appendChild(doc.createTextNode(String(child)));
    }
  });
  return element;
}
var isJSXNode2 = (n) => {
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
