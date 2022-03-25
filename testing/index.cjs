/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// scripts/shim/globalthis.js
var require_globalthis = __commonJS({
  "scripts/shim/globalthis.js"() {
    if (typeof globalThis == "undefined") {
      const e = typeof global != "undefined" ? global : typeof window != "undefined" ? window : typeof self != "undefined" ? self : {};
      e.globalThis = e;
    }
  }
});

// src/testing/index.ts
var testing_exports = {};
__export(testing_exports, {
  ElementFixture: () => ElementFixture,
  applyDocumentConfig: () => applyDocumentConfig,
  createDocument: () => createDocument,
  createGlobal: () => createGlobal,
  getTestPlatform: () => getTestPlatform,
  isPromise: () => isPromise,
  toDOM: () => toDOM,
  toFileUrl: () => toFileUrl
});
var import_globalthis = __toESM(require_globalthis());

// src/testing/document.ts
var import_globalthis = __toESM(require_globalthis());
var import_server = require("../server/index.cjs");

// src/testing/platform.ts
var import_globalthis = __toESM(require_globalthis());
var import_qwik = require("../core.cjs");
var import_fs = require("fs");
var import_url = require("url");

// src/core/use/use-core.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/assert/assert.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/log.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/qdev.ts
var import_globalthis = __toESM(require_globalthis());
var qDev = globalThis.qDev !== false;
var qTest = globalThis.describe !== void 0;

// src/core/util/log.ts
var STYLE = qDev ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;` : "";
var logError = (message, ...optionalParams) => {
  console.error("%cQWIK ERROR", STYLE, message, ...optionalParams);
};

// src/core/assert/assert.ts
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

// src/core/util/markers.ts
var import_globalthis = __toESM(require_globalthis());
var QHostAttr = "q:host";
var QContainerSelector = "[q\\:container]";

// src/core/util/dom.ts
var import_globalthis = __toESM(require_globalthis());
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

// src/core/use/use-core.ts
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
    doc,
    hostElement,
    element,
    event,
    url: url || null,
    qrl: void 0,
    subscriptions: event === "qRender"
  };
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
  return el.closest(QContainerSelector);
}

// src/testing/platform.ts
function createPlatform(document2) {
  if (!document2 || document2.nodeType !== 9) {
    throw new Error(`Invalid Document implementation`);
  }
  const doc = document2;
  let render = null;
  const moduleCache = /* @__PURE__ */ new Map();
  const testPlatform = {
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

// src/testing/document.ts
function createGlobal(opts = {}) {
  const gbl = (0, import_server.createGlobal)(opts);
  setTestPlatform(gbl.document);
  return gbl;
}
function createDocument(opts = {}) {
  const gbl = createGlobal(opts);
  return gbl.document;
}

// src/testing/element_fixture.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/props/props.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/error/error.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/error/stringify.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/types.ts
var import_globalthis = __toESM(require_globalthis());
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

// src/core/error/stringify.ts
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

// src/core/error/error.ts
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

// src/core/object/q-object.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/import/qrl-class.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/import/qrl.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/flyweight.ts
var import_globalthis = __toESM(require_globalthis());
var EMPTY_ARRAY = [];
var EMPTY_OBJ = {};
if (qDev) {
  Object.freeze(EMPTY_ARRAY);
  Object.freeze(EMPTY_OBJ);
}

// src/core/util/promises.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/array.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/promises.ts
function isPromise(value) {
  return value instanceof Promise;
}
var then = (promise, thenFn) => {
  return isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
};

// src/core/platform/platform.ts
var import_globalthis = __toESM(require_globalthis());
var createPlatform2 = (doc) => {
  const moduleCache = /* @__PURE__ */ new Map();
  return {
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

// src/core/use/use-subscriber.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/use/use-host-element.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/import/qrl.ts
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
      throw new Error("QRL does not have an attached container");
    }
    const symbol = getPlatform2(getDocument(element)).importSymbol(element, qrl_.chunk, qrl_.symbol);
    return qrl_.symbolRef = then(symbol, (ref) => {
      return qrl_.symbolRef = ref;
    });
  }
}
function stringifyQRL(qrl, opts = {}) {
  var _a;
  const qrl_ = toInternalQRL(qrl);
  const symbol = qrl_.symbol;
  const platform = opts.platform;
  const element = opts.element;
  const chunk = platform ? (_a = platform.chunkForSymbol(symbol)) != null ? _a : qrl_.chunk : qrl_.chunk;
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

// src/core/import/qrl-class.ts
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
  invokeFn() {
    return async (...args) => {
      const currentCtx = tryGetInvokeContext();
      const fn = typeof this.symbolRef === "function" ? this.symbolRef : await this.resolve();
      if (typeof fn === "function") {
        const context = __spreadProps(__spreadValues(__spreadValues({}, newInvokeContext()), currentCtx), {
          qrl: this
        });
        return useInvoke(context, fn, ...args);
      }
      throw new Error("QRL is not a function");
    };
  }
  copy() {
    return new QRLInternal(this.chunk, this.symbol, this.symbolRef, this.symbolFn, null, this.captureRef);
  }
  async invoke(...args) {
    const fn = this.invokeFn();
    return fn(...args);
  }
  serialize(options) {
    return stringifyQRL(this, options);
  }
};
var QRLInternal = QRL;
var FIND_EXT = /\?[\w=&]+$/;

// src/core/render/notify-render.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/render/cursor.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/props/props-on.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/json/q-json.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/case.ts
var import_globalthis = __toESM(require_globalthis());
function fromCamelToKebabCase(text) {
  return text.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// src/core/util/stringify.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/event.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/render/jsx/host.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/import/qrl.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/component/component-ctx.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/render/render.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/component/qrl-styles.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/hash_code.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/render/jsx/jsx-runtime.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/object/store.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/element.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/render/cursor.ts
var RefSymbol = Symbol();
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
var KEY_SYMBOL = Symbol("vnode key");
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
          text += isClass ? value ? sep + key : "" : sep + fromCamelToKebabCase(key) + ":" + value;
          sep = isClass ? " " : ";";
        }
      }
    }
    return text;
  }
  return String(obj);
}

// src/core/render/notify-render.ts
var SCHEDULE = Symbol("Render state");

// src/core/object/q-object.ts
var ProxyMapSymbol = Symbol("ProxyMapSymbol");
var SetSubscriber = Symbol("SetSubscriber");
var NOSERIALIZE = Symbol("NoSerialize");

// src/core/props/props-obj-map.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/props/props.ts
Error.stackTraceLimit = 9999;

// src/testing/util.ts
var import_globalthis = __toESM(require_globalthis());
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

// src/testing/element_fixture.ts
var ElementFixture = class {
  constructor(options = {}) {
    this.global = createGlobal();
    this.document = this.global.document;
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

// src/testing/jsx.ts
var import_globalthis = __toESM(require_globalthis());
function toDOM(jsx, parent) {
  const doc = parent ? parent.ownerDocument : createGlobal().document;
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
module.exports = __toCommonJS(testing_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ElementFixture,
  applyDocumentConfig,
  createDocument,
  createGlobal,
  getTestPlatform,
  isPromise,
  toDOM,
  toFileUrl
});
/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * @license
 * Copyright Builder.io; Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
