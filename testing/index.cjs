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
function createPlatform(document2) {
  if (!document2 || document2.nodeType !== 9) {
    throw new Error(`Invalid Document implementation`);
  }
  const doc = document2;
  let render2 = null;
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
    nextTick: (renderMarked2) => {
      if (!render2) {
        render2 = {
          fn: renderMarked2,
          promise: null,
          resolve: null,
          reject: null
        };
        render2.promise = new Promise((resolve, reject) => {
          render2.resolve = resolve;
          render2.reject = reject;
        });
      } else if (renderMarked2 !== render2.fn) {
        throw new Error("Must be same function");
      }
      return render2.promise;
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
      if (render2) {
        try {
          render2.resolve(await render2.fn(doc));
        } catch (e) {
          render2.reject(e);
        }
        render2 = null;
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
  let _url;
  let _base = void 0;
  if (url === void 0) {
    if (element) {
      _url = element.getAttribute("q:base");
      _base = toUrl(doc, element.parentNode && element.parentNode.closest("[q\\:base]"));
    } else {
      _url = doc.baseURI;
    }
  } else if (url) {
    _url = url, _base = toUrl(doc, element.closest("[q\\:base]"));
  } else {
    throw new Error("INTERNAL ERROR");
  }
  return new URL(String(_url), _base);
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

// src/core/util/markers.ts
var import_globalthis = __toESM(require_globalthis());
var QHostAttr = "q:host";
var OnRenderProp = "on:qRender";
var ComponentScopedStyles = "q:sstyle";
var ComponentStylesPrefixHost = "\u{1F4E6}";
var ComponentStylesPrefixContent = "\u{1F3F7}\uFE0F";
var QSlotAttr = "q:slot";
var QObjAttr = "q:obj";
var QObjSelector = "[q\\:obj]";
var ELEMENT_ID = "q:id";
var ELEMENT_ID_SELECTOR = "[q\\:id]";
var ELEMENT_ID_PREFIX = "#";

// src/core/util/types.ts
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

// src/core/util/qdev.ts
var import_globalthis = __toESM(require_globalthis());
var qDev = globalThis.qDev !== false;
var qTest = globalThis.describe !== void 0;

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
  textCode = textCode.substr(textCode.length - 3);
  return `${area}(Q-${textCode}): ${text}`;
}

// src/core/object/q-object.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/assert/assert.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/log.ts
var import_globalthis = __toESM(require_globalthis());
var STYLE = qDev ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;` : "";
var logError = (message, ...optionalParams) => {
  console.error("%cQWIK", STYLE, message, ...optionalParams);
};
var logWarn = (message, ...optionalParams) => {
  console.warn("%cQWIK", STYLE, message, ...optionalParams);
};
var logDebug = (message, ...optionalParams) => {
  console.debug("%cQWIK", STYLE, message, ...optionalParams);
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

// src/core/render/notify-render.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/component/component-ctx.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/render/render.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/index.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/component/component.public.ts
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

// src/core/import/qrl-class.ts
var import_globalthis = __toESM(require_globalthis());
function isQrl(value) {
  return value instanceof QRLInternal;
}
var QRL = class {
  constructor(chunk, symbol, symbolRef, symbolFn, capture, captureRef, guard) {
    this.chunk = chunk;
    this.symbol = symbol;
    this.symbolRef = symbolRef;
    this.symbolFn = symbolFn;
    this.capture = capture;
    this.captureRef = captureRef;
    this.guard = guard;
    this.canonicalChunk = chunk.replace(FIND_EXT, "");
  }
};
var QRLInternal = QRL;
var FIND_EXT = /\.[\w?=&]+$/;

// src/core/util/dom.ts
var import_globalthis = __toESM(require_globalthis());
function getDocument(node) {
  if (typeof document !== "undefined") {
    return document;
  }
  let doc = node.ownerDocument;
  while (doc && doc.nodeType !== 9) {
    doc = doc.parentNode;
  }
  assertDefined(doc);
  return doc;
}

// src/core/import/qrl.ts
var runtimeSymbolId = 0;
var RUNTIME_QRL = "/runtimeQRL";
function toInternalQRL(qrl2) {
  assertEqual(isQrl(qrl2), true);
  return qrl2;
}
function runtimeQrl(symbol, lexicalScopeCapture = EMPTY_ARRAY) {
  return new QRLInternal(RUNTIME_QRL, "s" + runtimeSymbolId++, symbol, null, null, lexicalScopeCapture, null);
}
function stringifyQRL(qrl2, element, platform) {
  var _a;
  const qrl_ = toInternalQRL(qrl2);
  const symbol = qrl_.symbol;
  const chunk = platform ? (_a = platform.chunkForSymbol(symbol)) != null ? _a : qrl_.chunk : qrl_.chunk;
  const parts = [chunk];
  if (symbol && symbol !== "default") {
    parts.push("#", symbol);
  }
  const guard = qrl_.guard;
  guard == null ? void 0 : guard.forEach((value, key) => parts.push("|", key, value && value.length ? "." + value.join(".") : ""));
  const capture = qrl_.capture;
  if (capture && capture.length > 0) {
    parts.push(JSON.stringify(capture));
  }
  const qrlString = parts.join("");
  if (qrl_.chunk === RUNTIME_QRL && element) {
    const qrls = element.__qrls__ || (element.__qrls__ = /* @__PURE__ */ new Set());
    qrls.add(qrl2);
  }
  return qrlString;
}
function parseQRL(qrl2, element) {
  if (element) {
    const qrls = element.__qrls__;
    if (qrls) {
      for (const runtimeQrl2 of qrls) {
        if (stringifyQRL(runtimeQrl2) == qrl2) {
          return runtimeQrl2;
        }
      }
    }
  }
  const endIdx = qrl2.length;
  const hashIdx = indexOf(qrl2, 0, "#");
  const guardIdx = indexOf(qrl2, hashIdx, "|");
  const captureIdx = indexOf(qrl2, guardIdx, "[");
  const chunkEndIdx = Math.min(hashIdx, guardIdx, captureIdx);
  const chunk = qrl2.substring(0, chunkEndIdx);
  const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
  const symbolEndIdx = Math.min(guardIdx, captureIdx);
  const symbol = symbolStartIdx == symbolEndIdx ? "default" : qrl2.substring(symbolStartIdx, symbolEndIdx);
  const guardStartIdx = guardIdx;
  const guardEndIdx = captureIdx;
  const guard = guardStartIdx < guardEndIdx ? parseGuard(qrl2.substring(guardStartIdx, guardEndIdx)) : null;
  const captureStartIdx = captureIdx;
  const captureEndIdx = endIdx;
  const capture = captureStartIdx === captureEndIdx ? EMPTY_ARRAY : JSONparse(qrl2.substring(captureStartIdx, captureEndIdx));
  if (chunk === RUNTIME_QRL) {
    logError(`Q-ERROR: '${qrl2}' is runtime but no instance found on element.`);
  }
  return new QRLInternal(chunk, symbol, null, null, capture, null, guard);
}
function JSONparse(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    logError("JSON:", json);
    throw e;
  }
}
function parseGuard(text) {
  let map = null;
  if (text) {
    text.split("|").forEach((obj) => {
      if (obj) {
        const parts = obj.split(".");
        const id = parts.shift();
        if (!map)
          map = /* @__PURE__ */ new Map();
        map.set(id, parts);
      }
    });
  }
  return map;
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

// src/core/import/qrl.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/platform/platform.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/element.ts
var import_globalthis = __toESM(require_globalthis());
function isNode(value) {
  return value && typeof value.nodeType == "number";
}
function isDocument(value) {
  return value && value.nodeType == 9 /* DOCUMENT_NODE */;
}
function isElement(value) {
  return isNode(value) && value.nodeType == 1 /* ELEMENT_NODE */;
}

// src/core/platform/platform.ts
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
  let _url;
  let _base = void 0;
  if (url === void 0) {
    if (element) {
      _url = element.getAttribute("q:base");
      _base = toUrl2(doc, element.parentNode && element.parentNode.closest("[q\\:base]"));
    } else {
      _url = doc.baseURI;
    }
  } else if (url) {
    _url = url, _base = toUrl2(doc, element.closest("[q\\:base]"));
  } else {
    throw new Error("INTERNAL ERROR");
  }
  return new URL(String(_url), _base);
}
var getPlatform2 = (docOrNode) => {
  const doc = isDocument(docOrNode) ? docOrNode : getDocument(docOrNode);
  return doc[DocumentPlatform] || (doc[DocumentPlatform] = createPlatform2(doc));
};
var DocumentPlatform = /* @__PURE__ */ Symbol();

// src/core/import/qrl.public.ts
async function qrlImport(element, qrl2) {
  const qrl_ = toInternalQRL(qrl2);
  if (qrl_.symbolRef)
    return qrl_.symbolRef;
  if (qrl_.symbolFn) {
    return qrl_.symbolRef = qrl_.symbolFn().then((module2) => module2[qrl_.symbol]);
  } else {
    return qrl_.symbolRef = await getPlatform2(getDocument(element)).importSymbol(element, qrl_.chunk, qrl_.symbol);
  }
}
function $(expression) {
  return runtimeQrl(expression);
}
function implicit$FirstArg(fn) {
  return function(first, ...rest) {
    return fn.call(null, $(first), ...rest);
  };
}

// src/core/use/use-core.ts
var import_globalthis = __toESM(require_globalthis());
var _context;
function tryGetInvokeContext() {
  return _context;
}
function getInvokeContext() {
  if (!_context) {
    const context = typeof document !== "undefined" && document && document.__q_context__;
    if (!context) {
      throw new Error("Q-ERROR: invoking 'use*()' method outside of invocation context.");
    }
    if (Array.isArray(context)) {
      const element = context[0];
      const hostElement = getHostElement(element);
      assertDefined(element);
      return document.__q_context__ = newInvokeContext(hostElement, element, context[1], context[2]);
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
function newInvokeContext(hostElement, element, event, url) {
  return {
    hostElement,
    element,
    event,
    url: url || null,
    qrl: void 0,
    subscriptions: event === "qRender"
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

// src/core/use/use-host-element.public.ts
var import_globalthis = __toESM(require_globalthis());
function useHostElement() {
  const element = getInvokeContext().hostElement;
  assertDefined(element);
  return element;
}

// src/core/component/qrl-styles.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/hash_code.ts
var import_globalthis = __toESM(require_globalthis());
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

// src/core/component/qrl-styles.ts
function styleKey(qStyles) {
  return qStyles && String(hashCode(qStyles.symbol));
}
function styleHost(styleId) {
  return styleId && ComponentStylesPrefixHost + styleId;
}
function styleContent(styleId) {
  return styleId && ComponentStylesPrefixContent + styleId;
}

// src/core/component/component.public.ts
function onUnmount(unmountFn) {
  throw new Error("IMPLEMENT: onUnmount" + unmountFn);
}
var onUnmount$ = implicit$FirstArg(onUnmount);
function onResume(resumeFn) {
  throw new Error("IMPLEMENT: onRender" + resumeFn);
}
var onResume$ = implicit$FirstArg(onResume);
function onHydrate(hydrateFn) {
  throw new Error("IMPLEMENT: onHydrate" + hydrateFn);
}
var onHydrate$ = implicit$FirstArg(onHydrate);
function onDehydrate(dehydrateFn) {
  throw new Error("IMPLEMENT: onDehydrate" + dehydrateFn);
}
var onDehydrate$ = implicit$FirstArg(onDehydrate);
function useStyles(styles) {
  _useStyles(styles, false);
}
var useStyles$ = implicit$FirstArg(useStyles);
function useScopedStyles(styles) {
  _useStyles(styles, true);
}
var useScopedStyles$ = implicit$FirstArg(useScopedStyles);
function _useStyles(styles, scoped) {
  const styleQrl = toQrlOrError(styles);
  const styleId = styleKey(styleQrl);
  const hostElement = useHostElement();
  if (scoped) {
    hostElement.setAttribute(ComponentScopedStyles, styleId);
  }
  useWaitOn(qrlImport(hostElement, styleQrl).then((styleText) => {
    const document2 = getDocument(hostElement);
    const head = document2.querySelector("head");
    if (head && !head.querySelector(`style[q\\:style="${styleId}"]`)) {
      const style = document2.createElement("style");
      style.setAttribute("q:style", styleId);
      style.textContent = scoped ? styleText.replace(/�/g, styleId) : styleText;
      head.appendChild(style);
    }
  }));
}

// src/core/event/bubble.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/event/bubble.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/object/store.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/object/store.ts
var import_globalthis = __toESM(require_globalthis());
function QStore_hydrate(doc) {
  const script = doc.querySelector('script[type="qwik/json"]');
  doc.qDehydrate = () => QStore_dehydrate(doc);
  const map = getProxyMap(doc);
  if (script) {
    script.parentElement.removeChild(script);
    const meta = JSON.parse(script.textContent || "{}");
    const elements = /* @__PURE__ */ new Map();
    doc.querySelectorAll(ELEMENT_ID_SELECTOR).forEach((el) => {
      const id = el.getAttribute(ELEMENT_ID);
      elements.set(ELEMENT_ID_PREFIX + id, el);
    });
    for (const obj of meta.objs) {
      reviveNestedQObjects(obj, meta.objs);
    }
    reviveQObjects(meta.objs, meta.subs, elements, map);
    doc.querySelectorAll(QObjSelector).forEach((el) => {
      const qobj = el.getAttribute(QObjAttr);
      const host = el.getAttribute(QHostAttr);
      const ctx = getContext(el);
      qobj.split(" ").forEach((part) => {
        const obj = part[0] === ELEMENT_ID_PREFIX ? elements.get(part) : meta.objs[strToInt(part)];
        assertDefined(obj);
        ctx.refMap.add(obj);
      });
      if (host) {
        const [props, events] = host.split(" ").map(strToInt);
        assertDefined(props);
        assertDefined(events);
        ctx.props = ctx.refMap.get(props);
        ctx.events = ctx.refMap.get(events);
      }
    });
  }
}
function QStore_dehydrate(doc) {
  const objSet = /* @__PURE__ */ new Set();
  const elementToIndex = /* @__PURE__ */ new Map();
  function getElementID(el) {
    let id = elementToIndex.get(el);
    if (id === void 0) {
      if (el.isConnected) {
        id = intToStr(elementToIndex.size);
        el.setAttribute(ELEMENT_ID, id);
        id = ELEMENT_ID_PREFIX + id;
      } else {
        id = null;
      }
      elementToIndex.set(el, id);
    }
    return id;
  }
  const elements = doc.querySelectorAll(QObjSelector);
  elements.forEach((node) => {
    const props = getContext(node);
    const qMap = props.refMap;
    qMap.array.forEach((v) => {
      collectQObjects(v, objSet);
    });
  });
  const objArray = Array.from(objSet);
  objArray.sort((a, b) => {
    const isProxyA = a[QOjectTargetSymbol] !== void 0 ? 0 : 1;
    const isProxyB = b[QOjectTargetSymbol] !== void 0 ? 0 : 1;
    return isProxyA - isProxyB;
  });
  const objs = objArray.map((a) => {
    var _a;
    return (_a = a[QOjectTargetSymbol]) != null ? _a : a;
  });
  const subs = objArray.map((a) => {
    const subs2 = a[QOjectSubsSymbol];
    if (subs2) {
      return Object.fromEntries(Array.from(subs2.entries()).map(([el, set]) => {
        const id = getElementID(el);
        if (id !== null) {
          return [id, Array.from(set)];
        } else {
          return [void 0, void 0];
        }
      }));
    } else {
      return null;
    }
  }).filter((a) => !!a);
  const objToId = /* @__PURE__ */ new Map();
  let count = 0;
  for (const obj of objs) {
    objToId.set(obj, count);
    count++;
  }
  const convert = (value) => {
    var _a, _b;
    if (value && typeof value === "object") {
      value = (_a = value[QOjectTargetSymbol]) != null ? _a : value;
    }
    const idx = objToId.get(value);
    if (idx !== void 0) {
      return intToStr(idx);
    }
    return (_b = elementToIndex.get(value)) != null ? _b : value;
  };
  const convertedObjs = objs.map((obj) => {
    if (Array.isArray(obj)) {
      return obj.map(convert);
    } else if (typeof obj === "object") {
      const output = {};
      Object.entries(obj).forEach(([key, value]) => {
        output[key] = convert(value);
      });
      return output;
    }
    return obj;
  });
  const data = {
    objs: convertedObjs,
    subs
  };
  elements.forEach((node) => {
    const ctx = getContext(node);
    const props = ctx.props;
    const events = ctx.events;
    const attribute = ctx.refMap.array.map((obj) => {
      var _a;
      if (isElement(obj)) {
        return getElementID(obj);
      }
      const idx = typeof obj === "object" ? objToId.get((_a = obj[QOjectTargetSymbol]) != null ? _a : obj) : objToId.get(obj);
      assertDefined(idx);
      return intToStr(idx);
    }).join(" ");
    node.setAttribute(QObjAttr, attribute);
    if (props) {
      const objs2 = [props];
      if (events) {
        objs2.push(events);
      }
      node.setAttribute(QHostAttr, objs2.map((obj) => ctx.refMap.indexOf(obj)).join(" "));
    }
  });
  if (qDev) {
    elementToIndex.forEach((value, el) => {
      if (getDocument(el) !== doc) {
        logWarn("element from different document", value, el.tagName);
      }
      if (!value) {
        logWarn("unconnected element", el.tagName, "\n");
      }
    });
  }
  const script = doc.createElement("script");
  script.setAttribute("type", "qwik/json");
  script.textContent = JSON.stringify(data, void 0, qDev ? "  " : void 0);
  doc.body.appendChild(script);
}
function reviveQObjects(objs, subs, elementMap, map) {
  for (let i = 0; i < objs.length; i++) {
    const sub = subs[i];
    if (sub) {
      const value = objs[i];
      const converted = /* @__PURE__ */ new Map();
      Object.entries(sub).forEach((entry) => {
        const el = elementMap.get(entry[0]);
        if (!el) {
          logWarn("QWIK can not revive subscriptions because of missing element ID", entry, value);
          return;
        }
        const set = new Set(entry[1]);
        converted.set(el, set);
      });
      objs[i] = _restoreQObject(value, map, converted);
    }
  }
}
function reviveNestedQObjects(obj, map) {
  if (obj && typeof obj == "object") {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const value = obj[i];
        if (typeof value == "string") {
          obj[i] = map[strToInt(value)];
        } else {
          reviveNestedQObjects(value, map);
        }
      }
    } else {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if (typeof value == "string") {
            obj[key] = map[strToInt(value)];
          } else {
            reviveNestedQObjects(value, map);
          }
        }
      }
    }
  }
}
function collectQObjects(obj, seen) {
  if (obj != null) {
    if (isElement(obj)) {
      return;
    }
    if (typeof obj === "boolean") {
      return;
    }
    if (seen.has(obj))
      return;
    seen.add(obj);
    if (typeof obj === "object") {
      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          collectQObjects(obj[i], seen);
        }
      } else {
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            collectQObjects(value, seen);
          }
        }
      }
    }
  }
}
var intToStr = (nu) => {
  return nu.toString(36);
};
var strToInt = (nu) => {
  return parseInt(nu, 36);
};

// src/core/watch/watch.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/use/use-props.public.ts
var import_globalthis = __toESM(require_globalthis());
function useProps() {
  const ctx = getInvokeContext();
  let props = ctx.props;
  if (!props) {
    props = ctx.props = getProps(getContext(useHostElement()));
  }
  return props;
}

// src/core/watch/watch.ts
var import_globalthis = __toESM(require_globalthis());
var ON_WATCH = "on:qWatch";
function registerOnWatch(element, props, watchFnQrl) {
  props[ON_WATCH] = watchFnQrl;
  invokeWatchFn(element, watchFnQrl);
}
var cleanupFnMap = /* @__PURE__ */ new Map();
async function invokeWatchFn(element, watchFnQrl) {
  const watchFn = await qrlImport(element, watchFnQrl);
  const previousCleanupFn = cleanupFnMap.get(watchFn);
  cleanupFnMap.delete(watchFn);
  if (isCleanupFn(previousCleanupFn)) {
    try {
      previousCleanupFn();
    } catch (e) {
      logError(e);
    }
  }
  throw new Error("TO IMPLEMENT");
}
function isCleanupFn(value) {
  return typeof value === "function";
}

// src/core/watch/watch.public.ts
function onWatch(watchFn) {
  registerOnWatch(useHostElement(), useProps(), watchFn);
}
var onWatch$ = implicit$FirstArg(onWatch);

// src/core/render/jsx/async.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/render/jsx/factory.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/util/array.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/render/jsx/jsx-runtime.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/render/jsx/host.public.ts
var import_globalthis = __toESM(require_globalthis());
var Host = { __brand__: "host" };
var SkipRerender = { __brand__: "skip" };

// src/core/render/jsx/jsx-runtime.ts
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

// src/core/render/jsx/slot.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/render/render.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/render/cursor.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/props/props-on.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/json/q-json.ts
var import_globalthis = __toESM(require_globalthis());
function qDeflate(obj, hostCtx) {
  return hostCtx.refMap.add(obj);
}

// src/core/util/case.ts
var import_globalthis = __toESM(require_globalthis());
function fromCamelToKebabCase(text) {
  return text.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// src/core/util/promises.ts
var import_globalthis = __toESM(require_globalthis());
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

// src/core/util/stringify.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/props/props-on.ts
var ON_PROP_REGEX = /on(Document|Window)?:/;
var ON$_PROP_REGEX = /on(Document|Window)?\$:/;
function isOnProp(prop) {
  return ON_PROP_REGEX.test(prop);
}
function isOn$Prop(prop) {
  return ON$_PROP_REGEX.test(prop);
}
function isQrlFactory(value) {
  return typeof value === "function" && value.__brand__ === "QRLFactory";
}
function qPropReadQRL(ctx, prop) {
  const existingQRLs = getExistingQRLs(ctx, prop);
  if (existingQRLs.length === 0) {
    return null;
  }
  return () => {
    const context = getInvokeContext();
    const qrls = getExistingQRLs(ctx, prop);
    return Promise.all(qrls.map(async (qrlOrPromise) => {
      const qrl2 = await qrlOrPromise;
      const qrlGuard = context.qrlGuard;
      if (qrlGuard && !qrlGuard(qrl2))
        return;
      if (!qrl2.symbolRef) {
        qrl2.symbolRef = await qrlImport(ctx.element, qrl2);
      }
      context.qrl = qrl2;
      if (qrlGuard) {
        return invokeWatchFn(ctx.element, qrl2);
      } else {
        return useInvoke(context, qrl2.symbolRef);
      }
    }));
  };
}
function qPropWriteQRL(rctx, ctx, prop, value) {
  if (!value) {
    return;
  }
  prop = prop.replace("$:", ":");
  if (typeof value == "string") {
    value = parseQRL(value);
  }
  const existingQRLs = getExistingQRLs(ctx, prop);
  if (Array.isArray(value)) {
    value.forEach((value2) => qPropWriteQRL(rctx, ctx, prop, value2));
  } else if (isQrl(value)) {
    const capture = value.capture;
    if (capture == null) {
      const captureRef = value.captureRef;
      value.capture = captureRef && captureRef.length ? captureRef.map((ref) => qDeflate(ref, ctx)) : EMPTY_ARRAY;
    }
    for (let i = 0; i < existingQRLs.length; i++) {
      const qrl2 = existingQRLs[i];
      if (!isPromise(qrl2) && qrl2.canonicalChunk === value.canonicalChunk && qrl2.symbol === value.symbol) {
        existingQRLs.splice(i, 1);
        i--;
      }
    }
    existingQRLs.push(value);
  } else if (isQrlFactory(value)) {
    if (existingQRLs.length === 0) {
      qPropWriteQRL(rctx, ctx, prop, value(ctx.element));
    }
  } else if (isPromise(value)) {
    const writePromise = value.then((qrl2) => {
      existingQRLs.splice(existingQRLs.indexOf(writePromise), 1);
      qPropWriteQRL(rctx, ctx, prop, qrl2);
      return qrl2;
    });
    existingQRLs.push(writePromise);
  } else {
    throw qError(0 /* TODO */, `Not QRLInternal: prop: ${prop}; value: ` + value);
  }
  if (prop.startsWith("on:q")) {
    getEvents(ctx)[prop] = serializeQRLs(existingQRLs, ctx);
  } else {
    const kebabProp = fromCamelToKebabCase(prop);
    const newValue = serializeQRLs(existingQRLs, ctx);
    if (ctx.element.getAttribute(kebabProp) !== newValue) {
      setAttribute(rctx, ctx.element, kebabProp, newValue);
    }
  }
}
function getExistingQRLs(ctx, prop) {
  let parts = ctx.cache.get(prop);
  if (!parts) {
    if (prop.startsWith("on:q")) {
      parts = [];
      const qrls = getEvents(ctx)[prop];
      if (qrls) {
        qrls.split("\n").forEach((qrl2) => {
          if (qrl2) {
            parts.push(parseQRL(qrl2, ctx.element));
          }
        });
        ctx.cache.set(prop, parts);
        return parts;
      }
    }
    const attrName = fromCamelToKebabCase(prop);
    parts = [];
    (ctx.element.getAttribute(attrName) || "").split("\n").forEach((qrl2) => {
      if (qrl2) {
        parts.push(parseQRL(qrl2, ctx.element));
      }
    });
    ctx.cache.set(prop, parts);
  }
  return parts;
}
function serializeQRLs(existingQRLs, ctx) {
  const platform = getPlatform2(getDocument(ctx.element));
  const element = ctx.element;
  return existingQRLs.map((qrl2) => isPromise(qrl2) ? "" : stringifyQRL(qrl2, element, platform)).filter((v) => !!v).join("\n");
}

// src/core/render/cursor.ts
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
    return addVnodes(ctx, elm, null, ch, 0, ch.length - 1, isSvg);
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
  let before;
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
    before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
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
  return elm.nodeType === 1 || elm.nodeType === 3;
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
function patchVnode(ctx, elm, vnode, isSvg) {
  ctx.perf.visited++;
  const tag = vnode.type;
  if (tag === "#text") {
    if (elm.data !== vnode.text) {
      setProperty(ctx, elm, "data", vnode.text);
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
  const dirty = updateProperties(ctx, elm, vnode.props, isSvg);
  const isSlot = tag === "q:slot";
  if (isSvg && vnode.type === "foreignObject") {
    isSvg = false;
  } else if (isSlot) {
    ctx.component.slots.push(vnode);
  }
  const isComponent = isComponentNode(vnode);
  let componentCtx;
  if (dirty) {
    assertEqual(isComponent, true);
    componentCtx = getQComponent(elm);
    promise = componentCtx.render(ctx);
  }
  const ch = vnode.children;
  if (isComponent) {
    return then(promise, () => {
      const slotMaps = getSlots(componentCtx, elm);
      const splittedChidren = splitBy(ch, getSlotName);
      const promises = [];
      Object.entries(slotMaps.slots).forEach(([key, slotEl]) => {
        if (slotEl && !splittedChidren[key]) {
          const oldCh = getChildren(slotEl, "slot");
          if (oldCh.length > 0) {
            removeVnodes(ctx, slotEl, oldCh, 0, oldCh.length - 1);
          }
        }
      });
      Object.entries(splittedChidren).forEach(([key, ch2]) => {
        const slotElm = getSlotElement(ctx, slotMaps, elm, key);
        promises.push(smartUpdateChildren(ctx, slotElm, ch2, "slot", isSvg));
      });
      return then(promiseAll(promises), () => {
        removeTemplates(ctx, slotMaps);
      });
    });
  }
  return then(promise, () => {
    const mode = isSlot ? "fallback" : "default";
    return smartUpdateChildren(ctx, elm, ch, mode, isSvg);
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
    removeNode(ctx, parentElm, ch);
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
      removeNode(ctx, template.parentNode, template);
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
function createElm(ctx, vnode, isSvg) {
  ctx.perf.visited++;
  const tag = vnode.type;
  if (tag === "#text") {
    return vnode.elm = createTextNode(ctx, vnode.text);
  }
  if (!isSvg) {
    isSvg = tag === "svg";
  }
  const data = vnode.props;
  const elm = vnode.elm = createElement(ctx, tag, isSvg);
  const isComponent = isComponentNode(vnode);
  setKey(elm, vnode.key);
  updateProperties(ctx, elm, data, isSvg);
  if (isSvg && tag === "foreignObject") {
    isSvg = false;
  }
  const currentComponent = ctx.component;
  if (currentComponent) {
    const styleTag = currentComponent.styleClass;
    if (styleTag) {
      classlistAdd(ctx, elm, styleTag);
    }
    if (tag === "q:slot") {
      setSlotRef(ctx, currentComponent.hostElement, elm);
      ctx.component.slots.push(vnode);
    }
  }
  let wait;
  let componentCtx;
  if (isComponent) {
    componentCtx = getQComponent(elm);
    const hostStyleTag = componentCtx.styleHostClass;
    elm.setAttribute(QHostAttr, "");
    if (hostStyleTag) {
      classlistAdd(ctx, elm, hostStyleTag);
    }
    wait = componentCtx.render(ctx);
  }
  return then(wait, () => {
    let children = vnode.children;
    if (children.length > 0) {
      if (children.length === 1 && children[0].type === SkipRerender) {
        children = children[0].children;
      }
      const slotMap = isComponent ? getSlots(componentCtx, elm) : void 0;
      const promises = children.map((ch) => createElm(ctx, ch, isSvg));
      return then(promiseAll(promises), () => {
        let parent = elm;
        for (const node of children) {
          if (slotMap) {
            parent = getSlotElement(ctx, slotMap, elm, getSlotName(node));
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
  const t = Array.from(hostElm.childNodes).filter(isSlotTemplate);
  for (const elm of existingSlots) {
    slots[(_b = elm.getAttribute("name")) != null ? _b : ""] = elm;
  }
  for (const vnode of newSlots) {
    slots[(_d = (_c = vnode.props) == null ? void 0 : _c.name) != null ? _d : ""] = vnode.elm;
  }
  for (const elm of t) {
    templates[(_e = elm.getAttribute("name")) != null ? _e : ""] = elm;
  }
  return { slots, templates };
};
var handleStyle = (ctx, elm, _, newValue, oldValue) => {
  if (typeof newValue == "string") {
    elm.style.cssText = newValue;
  } else {
    for (const prop in oldValue) {
      if (!newValue || newValue[prop] == null) {
        if (prop.includes("-")) {
          styleSetProperty(ctx, elm, prop, null);
        } else {
          setProperty(ctx, elm.style, prop, "");
        }
      }
    }
    for (const prop in newValue) {
      const value = newValue[prop];
      if (!oldValue || value !== oldValue[prop]) {
        if (prop.includes("-")) {
          styleSetProperty(ctx, elm, prop, value);
        } else {
          setProperty(ctx, elm.style, prop, value);
        }
      }
    }
  }
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
var setInnerHTML = (ctx, elm, prop, newValue) => {
  setProperty(ctx, elm, prop, newValue);
  setAttribute(ctx, elm, "q:static", "");
  return true;
};
var PROP_HANDLER_MAP = {
  style: handleStyle,
  value: checkBeforeAssign,
  checked: checkBeforeAssign,
  innerHTML: setInnerHTML
};
var ALLOWS_PROPS = ["className", "style", "id", "q:slot"];
function updateProperties(rctx, node, expectProps, isSvg) {
  if (!expectProps) {
    return false;
  }
  const ctx = getContext(node);
  const qwikProps = OnRenderProp in expectProps ? getProps(ctx) : void 0;
  if ("class" in expectProps) {
    const className = expectProps.class;
    expectProps.className = className && typeof className == "object" ? Object.keys(className).filter((k) => className[k]).join(" ") : className;
  }
  for (let key of Object.keys(expectProps)) {
    if (key === "children" || key === "class") {
      continue;
    }
    const newValue = expectProps[key];
    if (isOnProp(key)) {
      setEvent(rctx, ctx, key, newValue);
      continue;
    }
    if (isOn$Prop(key)) {
      setEvent(rctx, ctx, key.replace("$", ""), $(newValue));
      continue;
    }
    const oldValue = ctx.cache.get(key);
    if (newValue === oldValue) {
      continue;
    }
    ctx.cache.set(key, newValue);
    if (key.startsWith("data-") || key.startsWith("aria-") || isSvg) {
      setAttribute(rctx, node, key, newValue);
      continue;
    }
    if (qwikProps) {
      const skipProperty = ALLOWS_PROPS.includes(key);
      const hPrefixed = key.startsWith("h:");
      if (!skipProperty && !hPrefixed) {
        qwikProps[key] = newValue;
        continue;
      }
      if (hPrefixed) {
        key = key.slice(2);
      }
    }
    const exception = PROP_HANDLER_MAP[key];
    if (exception) {
      if (exception(rctx, node, key, newValue, oldValue)) {
        continue;
      }
    }
    if (key in node) {
      setProperty(rctx, node, key, newValue);
      continue;
    }
    setAttribute(rctx, node, key, newValue);
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
function styleSetProperty(ctx, el, prop, value) {
  const fn = () => {
    if (value == null) {
      el.style.removeProperty(prop);
    } else {
      el.style.setProperty(prop, String(value));
    }
  };
  ctx.operations.push({
    el,
    operation: "style-set-property",
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
function removeNode(ctx, parent, el) {
  const fn = () => {
    if (el.parentNode === parent) {
      parent.removeChild(el);
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

// src/core/use/use-document.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/use/use-event.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/use/use-lexical-scope.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/use/use-url.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/use/use-store.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/use/use-transient.public.ts
var import_globalthis = __toESM(require_globalthis());

// src/core/index.ts
var version = globalThis.QWIK_VERSION;

// src/core/render/render.ts
function visitJsxNode(ctx, elm, jsxNode, isSvg) {
  if (jsxNode === void 0) {
    return smartUpdateChildren(ctx, elm, [], "root", isSvg);
  }
  if (Array.isArray(jsxNode)) {
    return smartUpdateChildren(ctx, elm, jsxNode.flat(), "root", isSvg);
  } else if (jsxNode.type === Host) {
    updateProperties(ctx, elm, jsxNode.props, isSvg);
    return smartUpdateChildren(ctx, elm, jsxNode.children || [], "root", isSvg);
  } else {
    return smartUpdateChildren(ctx, elm, [jsxNode], "root", isSvg);
  }
}

// src/core/component/component-ctx.ts
var QComponentCtx2 = class {
  constructor(hostElement) {
    this.styleId = void 0;
    this.styleClass = null;
    this.styleHostClass = null;
    this.slots = [];
    this.hostElement = hostElement;
    this.ctx = getContext(hostElement);
  }
  render(ctx) {
    const hostElement = this.hostElement;
    const onRender = getEvent(this.ctx, OnRenderProp);
    assertDefined(onRender);
    const event = "qRender";
    this.ctx.dirty = false;
    ctx.globalState.hostsStaging.delete(hostElement);
    const promise = useInvoke(newInvokeContext(hostElement, hostElement, event), onRender);
    return then(promise, (jsxNode) => {
      jsxNode = jsxNode[0];
      if (this.styleId === void 0) {
        const scopedStyleId = this.styleId = hostElement.getAttribute(ComponentScopedStyles);
        if (scopedStyleId) {
          this.styleHostClass = styleHost(scopedStyleId);
          this.styleClass = styleContent(scopedStyleId);
        }
      }
      ctx.hostElements.add(hostElement);
      this.slots = [];
      const newCtx = __spreadProps(__spreadValues({}, ctx), {
        component: this
      });
      return visitJsxNode(newCtx, hostElement, processNode(jsxNode), false);
    });
  }
};
var COMPONENT_PROP = "__qComponent__";
function getQComponent(hostElement) {
  const element = hostElement;
  let component2 = element[COMPONENT_PROP];
  if (!component2)
    component2 = element[COMPONENT_PROP] = new QComponentCtx2(hostElement);
  return component2;
}

// src/core/render/notify-render.ts
function notifyRender(hostElement) {
  assertDefined(hostElement.getAttribute(QHostAttr));
  const ctx = getContext(hostElement);
  const doc = getDocument(hostElement);
  const state = getRenderingState(doc);
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
    return scheduleFrame(doc, state);
  }
}
function scheduleFrame(doc, state) {
  if (state.renderPromise === void 0) {
    state.renderPromise = getPlatform2(doc).nextTick(() => renderMarked(doc, state));
  }
  return state.renderPromise;
}
var SCHEDULE = Symbol();
function getRenderingState(doc) {
  let set = doc[SCHEDULE];
  if (!set) {
    doc[SCHEDULE] = set = {
      hostsNext: /* @__PURE__ */ new Set(),
      hostsStaging: /* @__PURE__ */ new Set(),
      renderPromise: void 0,
      hostsRendering: void 0
    };
  }
  return set;
}
async function renderMarked(doc, state) {
  state.hostsRendering = new Set(state.hostsNext);
  state.hostsNext.clear();
  const platform = getPlatform2(doc);
  const renderingQueue = Array.from(state.hostsRendering);
  sortNodes(renderingQueue);
  const ctx = {
    doc,
    operations: [],
    roots: [],
    hostElements: /* @__PURE__ */ new Set(),
    globalState: state,
    perf: {
      visited: 0,
      timing: []
    },
    component: void 0
  };
  for (const el of renderingQueue) {
    if (!ctx.hostElements.has(el)) {
      ctx.roots.push(el);
      const cmp = getQComponent(el);
      await cmp.render(ctx);
    }
  }
  if (ctx.operations.length === 0) {
    postRendering(doc, state);
    return ctx;
  }
  return platform.raf(() => {
    executeContextWithSlots(ctx);
    if (qDev) {
      if (typeof window !== "undefined" && window.document != null) {
        printRenderStats(ctx);
      }
    }
    postRendering(doc, state);
    return ctx;
  });
}
function postRendering(doc, state) {
  state.hostsStaging.forEach((el) => {
    state.hostsNext.add(el);
  });
  state.hostsStaging.clear();
  state.hostsRendering = void 0;
  state.renderPromise = void 0;
  if (state.hostsNext.size > 0) {
    scheduleFrame(doc, state);
  }
}
function sortNodes(elements) {
  elements.sort((a, b) => a.compareDocumentPosition(b) & 2 ? 1 : -1);
}

// src/core/object/q-object.ts
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
var QOjectSubsSymbol = ":subs:";
var QOjectTransientsSymbol = ":transients:";
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
    const nakedValue = unwrapProxy(value);
    if (nakedValue !== value) {
      return value;
    }
    verifySerializable(value);
    const proxy = proxyMap.get(value);
    return proxy ? proxy : readWriteProxy(value, proxyMap);
  } else {
    return value;
  }
}
var ReadWriteProxyHandler = class {
  constructor(proxy, subs = /* @__PURE__ */ new Map()) {
    this.proxy = proxy;
    this.subs = subs;
    this.transients = null;
  }
  getSub(el) {
    let sub = this.subs.get(el);
    if (!sub) {
      this.subs.set(el, sub = /* @__PURE__ */ new Set());
    }
    return sub;
  }
  get(target, prop) {
    if (prop === QOjectTargetSymbol)
      return target;
    if (prop === QOjectSubsSymbol)
      return this.subs;
    if (prop === QOjectTransientsSymbol) {
      return this.transients || (this.transients = /* @__PURE__ */ new WeakMap());
    }
    const value = target[prop];
    const invokeCtx = tryGetInvokeContext();
    if (invokeCtx && invokeCtx.subscriptions) {
      const isArray = Array.isArray(target);
      const sub = this.getSub(invokeCtx.hostElement);
      if (!isArray) {
        sub.add(prop);
      }
    }
    return wrap(value, this.proxy);
  }
  set(target, prop, newValue) {
    const unwrappedNewValue = unwrapProxy(newValue);
    const isArray = Array.isArray(target);
    if (isArray) {
      target[prop] = unwrappedNewValue;
      this.subs.forEach((_, el) => {
        notifyRender(el);
      });
      return true;
    }
    const oldValue = target[prop];
    if (oldValue !== unwrappedNewValue) {
      target[prop] = unwrappedNewValue;
      this.subs.forEach((propSets, el) => {
        if (propSets.has(prop)) {
          notifyRender(el);
        }
      });
    }
    return true;
  }
  has(target, property) {
    if (property === QOjectTargetSymbol)
      return true;
    return Object.prototype.hasOwnProperty.call(target, property);
  }
  ownKeys(target) {
    return Object.getOwnPropertyNames(target);
  }
};
function verifySerializable(value) {
  if (typeof value == "object" && value !== null) {
    if (Array.isArray(value))
      return;
    if (Object.getPrototypeOf(value) !== Object.prototype) {
      throw qError(0 /* TODO */, "Only primitive and object literals can be serialized.");
    }
  }
}

// src/core/props/props-obj-map.ts
var import_globalthis = __toESM(require_globalthis());
function newQObjectMap(element) {
  const map = /* @__PURE__ */ new Map();
  const array = [];
  let added = element.hasAttribute(QObjAttr);
  return {
    array,
    get(index) {
      return array[index];
    },
    indexOf(obj) {
      return map.get(obj);
    },
    add(object) {
      const index = map.get(object);
      if (index === void 0) {
        map.set(object, array.length);
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

// src/core/props/props.ts
Error.stackTraceLimit = 9999;
var Q_IS_HYDRATED = "__isHydrated__";
var Q_CTX = "__ctx__";
function hydrateIfNeeded(element) {
  const doc = getDocument(element);
  const isHydrated = doc[Q_IS_HYDRATED];
  if (!isHydrated) {
    doc[Q_IS_HYDRATED] = true;
    QStore_hydrate(doc);
  }
}
function getContext(element) {
  hydrateIfNeeded(element);
  let ctx = element[Q_CTX];
  if (!ctx) {
    const cache = /* @__PURE__ */ new Map();
    element[Q_CTX] = ctx = {
      element,
      cache,
      refMap: newQObjectMap(element),
      dirty: false,
      props: void 0,
      events: void 0
    };
  }
  return ctx;
}
function setEvent(rctx, ctx, prop, value) {
  qPropWriteQRL(rctx, ctx, prop, value);
}
function getEvent(ctx, prop) {
  return qPropReadQRL(ctx, prop);
}
function getProps(ctx) {
  if (!ctx.props) {
    ctx.props = readWriteProxy({}, getProxyMap(getDocument(ctx.element)));
    ctx.refMap.add(ctx.props);
  }
  return ctx.props;
}
function getEvents(ctx) {
  let events = ctx.events;
  if (!events) {
    events = ctx.events = {};
    ctx.refMap.add(ctx.events);
  }
  return events;
}

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
function toDOM(jsx2, parent) {
  const doc = parent ? parent.ownerDocument : createGlobal().document;
  let element = doc.createElement(jsx2.type);
  for (const attrName in jsx2.props) {
    if (attrName !== "children") {
      const jsxValue = jsx2.props[attrName];
      element.setAttribute(attrName, isQrl(jsxValue) ? stringifyQRL(jsxValue, element) : jsxValue);
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
