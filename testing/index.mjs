/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
// scripts/shim/__dirname.js
import { dirname } from "path";
import { fileURLToPath } from "url";
var __dirname = dirname(fileURLToPath(import.meta.url));

// src/testing/document.ts
import { createGlobal as createServerGlobal } from "../server/index.mjs";

// src/testing/platform.ts
import { getPlatform, setPlatform } from "../core.mjs";
import { existsSync } from "fs";
import { fileURLToPath as fileURLToPath2 } from "url";
function createPlatform(document2) {
  if (!document2 || document2.nodeType !== 9) {
    throw new Error(`Invalid Document implementation`);
  }
  const doc = document2;
  let render2 = null;
  let store = null;
  const moduleCache = /* @__PURE__ */ new Map();
  const testPlatform = {
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
    queueRender: (renderMarked2) => {
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
    queueStoreFlush: (storeFlush) => {
      if (!store) {
        store = {
          fn: storeFlush,
          promise: null,
          resolve: null,
          reject: null
        };
        store.promise = new Promise((resolve, reject) => {
          store.resolve = resolve;
          store.reject = reject;
        });
      } else if (storeFlush !== store.fn) {
        throw new Error("Must be same function");
      }
      return store.promise;
    },
    flush: async () => {
      await Promise.resolve();
      if (store) {
        try {
          store.resolve(await store.fn(doc));
        } catch (e) {
          store.reject(e);
        }
        store = null;
      }
      if (render2) {
        try {
          render2.resolve(await render2.fn(doc));
        } catch (e) {
          render2.reject(e);
        }
        store = null;
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
  const path = fileURLToPath2(String(normalizedUrl));
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

// src/testing/document.ts
function createGlobal(opts = {}) {
  const gbl = createServerGlobal(opts);
  setTestPlatform(gbl.document);
  return gbl;
}
function createDocument(opts = {}) {
  const gbl = createGlobal(opts);
  return gbl.document;
}

// src/core/util/markers.ts
var QHostAttr = "q:host";
var OnRenderProp = "on:qRender";
var OnRenderSelector = "[q\\:host]";
var ComponentScopedStyles = "q:sstyle";
var ComponentStylesPrefixHost = "\u{1F4E6}";
var ComponentStylesPrefixContent = "\u{1F3F7}\uFE0F";
var QSlot = "Q:SLOT";
var QSlotSelector = "Q\\:SLOT";
var QSlotAttr = "q:slot";
var QObjAttr = "q:obj";
var QObjSelector = "[q\\:obj]";
var QSlotName = "name";
var ELEMENT_ID = "q:id";
var ELEMENT_ID_SELECTOR = "[q\\:id]";
var ELEMENT_ID_PREFIX = "#";

// src/core/util/types.ts
function isDomElementWithTagName(node, tagName) {
  return isHtmlElement(node) && node.tagName.toUpperCase() == tagName.toUpperCase();
}
function isTemplateElement(node) {
  return isDomElementWithTagName(node, "template");
}
function isQSLotTemplateElement(node) {
  return isTemplateElement(node) && node.hasAttribute(QSlotAttr);
}
function isComponentElement(node) {
  return isHtmlElement(node) && node.hasAttribute(QHostAttr);
}
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
    if (value?.startsWith("file:/")) {
      value = value.replace(/(file:\/\/).*(\/.*)$/, (all, protocol, file) => protocol + "..." + file);
    }
    html += " " + name + (value == null || value == "" ? "" : "='" + value.replace("'", "&apos;") + "'");
  }
  return html + ">";
}

// src/core/util/qdev.ts
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

// src/core/assert/assert.ts
function assertDefined(value, text) {
  if (qDev) {
    if (value != null)
      return;
    throw newError(text || "Expected defined value.");
  }
}
function assertNotEqual(value1, value2, text) {
  if (qDev) {
    if (value1 !== value2)
      return;
    throw newError(text || `Expected '${value1}' !== '${value2}'.`);
  }
}
function assertEqual(value1, value2, text) {
  if (qDev) {
    if (value1 === value2)
      return;
    throw newError(text || `Expected '${value1}' === '${value2}'.`);
  }
}
function assertGreaterOrEqual(value1, value2, text) {
  if (qDev) {
    if (value1 >= value2)
      return;
    throw newError(text || `Expected '${value1}' >= '${value2}'.`);
  }
}
function assertGreater(value1, value2, text) {
  if (qDev) {
    if (value1 > value2)
      return;
    throw newError(text || `Expected '${value1}' > '${value2}'.`);
  }
}
function newError(text) {
  debugger;
  const error = new Error(text);
  console.error(error);
  return error;
}

// src/core/util/element.ts
function isNode(value) {
  return value && typeof value.nodeType == "number";
}
function isDocument(value) {
  return value && value.nodeType == 9 /* DOCUMENT_NODE */;
}
function isElement(value) {
  return isNode(value) && value.nodeType == 1 /* ELEMENT_NODE */;
}
function isComment(value) {
  return isNode(value) && value.nodeType == 8 /* COMMENT_NODE */;
}

// src/core/platform/platform.ts
var createPlatform2 = (doc) => {
  let queuePromise;
  let storePromise;
  const moduleCache = /* @__PURE__ */ new Map();
  return {
    importSymbol(element, url, symbolName) {
      const urlDoc = toUrl2(element.ownerDocument, element, url).toString();
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
        moduleCache.set(importURL, mod2);
        return mod2[symbolName];
      });
    },
    queueRender: (renderMarked2) => {
      if (!queuePromise) {
        queuePromise = new Promise((resolve, reject) => doc.defaultView.requestAnimationFrame(() => {
          queuePromise = null;
          renderMarked2(doc).then(resolve, reject);
        }));
      }
      return queuePromise;
    },
    queueStoreFlush: (flushStore) => {
      if (!storePromise) {
        storePromise = new Promise((resolve, reject) => doc.defaultView.requestAnimationFrame(() => {
          storePromise = null;
          flushStore(doc).then(resolve, reject);
        }));
      }
      return storePromise;
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
  const doc = isDocument(docOrNode) ? docOrNode : docOrNode.ownerDocument;
  return doc[DocumentPlatform] || (doc[DocumentPlatform] = createPlatform2(doc));
};
var DocumentPlatform = /* @__PURE__ */ Symbol();

// src/core/util/array_map.ts
function arrayInsert2(array, index, value1, value2) {
  let end = array.length;
  if (end == index) {
    array.push(value1, value2);
  } else if (end === 1) {
    array.push(value2, array[0]);
    array[0] = value1;
  } else {
    end--;
    array.push(array[end - 1], array[end]);
    while (end > index) {
      const previousEnd = end - 2;
      array[end] = array[previousEnd];
      end--;
    }
    array[index] = value1;
    array[index + 1] = value2;
  }
}
function keyValueArrayGet(keyValueArray, key, notFoundFactory) {
  const index = keyValueArrayIndexOf(keyValueArray, key);
  if (index >= 0) {
    return keyValueArray[index | 1];
  }
  if (notFoundFactory) {
    const value = notFoundFactory();
    arrayInsert2(keyValueArray, ~index, key, value);
    return value;
  }
  return void 0;
}
function keyValueArrayIndexOf(keyValueArray, key) {
  return _arrayIndexOfSorted(keyValueArray, key, 1);
}
function _arrayIndexOfSorted(array, value, shift) {
  let start = 0;
  let end = array.length >> shift;
  while (end !== start) {
    const middle = start + (end - start >> 1);
    const current = array[middle << shift];
    if (value === current) {
      return middle << shift;
    } else if (current > value) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  return ~(end << shift);
}

// src/core/render/slots.ts
function isSlotMap(value) {
  return Array.isArray(value);
}
function getSlotMap(component2) {
  const slots = [];
  const host = component2.hostElement;
  const firstChild = host.firstElementChild;
  if (isQSlotTemplate(firstChild)) {
    slotMapAddChildren(slots, firstChild.content, null);
  }
  const previousSlots = [];
  host.querySelectorAll(QSlotSelector).forEach((qSlot) => {
    for (const parent of previousSlots) {
      if (parent.contains(qSlot)) {
        return;
      }
    }
    previousSlots.push(qSlot);
    const name = qSlot.getAttribute("name") || "";
    slotMapAddChildren(slots, qSlot, name);
  });
  return slots;
}
function isQSlotTemplate(node) {
  return isDomElementWithTagName(node, "template") && node.hasAttribute(QSlotAttr);
}
function slotMapAddChildren(slots, parent, name) {
  _slotParent = parent;
  let child = parent.firstChild;
  if (name !== null) {
    keyValueArrayGet(slots, name, emptyArrayFactory);
  }
  while (child) {
    const slotName = name !== null ? name : isHtmlElement(child) && child.getAttribute(QSlotAttr) || "";
    keyValueArrayGet(slots, slotName, emptyArrayFactory).push(child);
    child = child.nextSibling;
  }
  _slotParent = void 0;
}
var _slotParent;
function emptyArrayFactory() {
  return [-1, _slotParent];
}

// src/core/util/flyweight.ts
var EMPTY_ARRAY = [];
var EMPTY_OBJ = {};
if (qDev) {
  Object.freeze(EMPTY_ARRAY);
  Object.freeze(EMPTY_OBJ);
}

// src/core/import/qrl-class.ts
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
  const qrl_ = toInternalQRL(qrl2);
  const symbol = qrl_.symbol;
  const chunk = platform ? platform.chunkForSymbol(symbol) ?? qrl_.chunk : qrl_.chunk;
  const parts = [chunk];
  if (symbol && symbol !== "default") {
    parts.push("#", symbol);
  }
  const guard = qrl_.guard;
  guard?.forEach((value, key) => parts.push("|", key, value && value.length ? "." + value.join(".") : ""));
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
    console.error(`Q-ERROR: '${qrl2}' is runtime but no instance found on element.`);
  }
  return new QRLInternal(chunk, symbol, null, null, capture, null, guard);
}
function JSONparse(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error("JSON:", json);
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
async function qrlImport(element, qrl2) {
  const qrl_ = toInternalQRL(qrl2);
  if (qrl_.symbolRef)
    return qrl_.symbolRef;
  const doc = element.ownerDocument;
  if (qrl_.symbolFn) {
    return qrl_.symbolRef = qrl_.symbolFn().then((module) => module[qrl_.symbol]);
  } else {
    return qrl_.symbolRef = await getPlatform2(doc).importSymbol(element, qrl_.chunk, qrl_.symbol);
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

// src/core/util/array.ts
function flattenArray(array, dst) {
  if (!dst)
    dst = [];
  for (const item of array) {
    if (Array.isArray(item)) {
      flattenArray(item, dst);
    } else {
      dst.push(item);
    }
  }
  return dst;
}

// src/core/render/jsx/jsx-runtime.ts
var JSXNodeImpl = class {
  constructor(type, props, key) {
    this.type = type;
    this.props = props;
    this.key = key;
    if (props) {
      if (props.children !== void 0) {
        if (Array.isArray(props.children)) {
          this.children = props.children;
        } else {
          this.children = [props.children];
        }
      } else {
        this.children = EMPTY_ARRAY;
      }
    }
  }
};
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
var Fragment = {};

// src/core/use/use-core.ts
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
      const hostElement = element.closest(OnRenderSelector);
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

// src/core/use/use-host-element.public.ts
function useHostElement() {
  const element = getInvokeContext().hostElement;
  assertDefined(element);
  return element;
}

// src/core/util/hash_code.ts
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
    const document2 = hostElement.ownerDocument;
    const head = document2.querySelector("head");
    if (head && !head.querySelector(`style[q\\:style="${styleId}"]`)) {
      const style = document2.createElement("style");
      style.setAttribute("q:style", styleId);
      style.textContent = scoped ? styleText.replace(/�/g, styleId) : styleText;
      head.appendChild(style);
    }
  }));
}

// src/core/object/store.ts
function QStore_hydrate(doc) {
  const script = doc.querySelector('script[type="qwik/json"]');
  doc.qDehydrate = () => QStore_dehydrate(doc);
  if (script) {
    script.parentElement.removeChild(script);
    const meta = JSON.parse(script.textContent || "{}");
    const elements = /* @__PURE__ */ new Map();
    doc.querySelectorAll(ELEMENT_ID_SELECTOR).forEach((el) => {
      const id = el.getAttribute(ELEMENT_ID);
      elements.set(ELEMENT_ID_PREFIX + id, el);
    });
    reviveQObjects(meta.objs, meta.subs, elements);
    for (const obj of meta.objs) {
      reviveNestedQObjects(obj, meta.objs);
    }
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
      id = intToStr(elementToIndex.size);
      el.setAttribute(ELEMENT_ID, id);
      id = ELEMENT_ID_PREFIX + id;
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
    return a[QOjectTargetSymbol] ?? a;
  });
  const subs = objArray.map((a) => {
    const subs2 = a[QOjectSubsSymbol];
    if (subs2) {
      return Object.fromEntries(Array.from(subs2.entries()).map(([el, set]) => {
        if (el.isConnected) {
          const id = getElementID(el);
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
  const data = {
    objs,
    subs
  };
  elements.forEach((node) => {
    const ctx = getContext(node);
    const props = ctx.props;
    const events = ctx.events;
    const attribute = ctx.refMap.array.map((obj) => {
      if (isElement(obj)) {
        return getElementID(obj);
      }
      const idx = typeof obj === "object" ? objToId.get(obj[QOjectTargetSymbol] ?? obj) : objToId.get(obj);
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
  const script = doc.createElement("script");
  script.setAttribute("type", "qwik/json");
  script.textContent = JSON.stringify(data, function(key, value) {
    if (key.startsWith("__"))
      return void 0;
    if (value && typeof value === "object") {
      value = value[QOjectTargetSymbol] ?? value;
    }
    if (this === objs)
      return value;
    const idx = objToId.get(value);
    if (idx !== void 0) {
      return intToStr(idx);
    }
    return elementToIndex.get(value) ?? value;
  }, qDev ? "  " : void 0);
  doc.body.appendChild(script);
}
function reviveQObjects(objs, subs, elementMap) {
  for (let i = 0; i < objs.length; i++) {
    const sub = subs[i];
    if (sub) {
      const value = objs[i];
      const converted = new Map(Object.entries(sub).map((entry) => {
        const el = elementMap.get(entry[0]);
        assertDefined(el);
        const set = new Set(entry[1]);
        return [el, set];
      }));
      objs[i] = _restoreQObject(value, converted);
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

// src/core/use/use-props.public.ts
function useProps() {
  const ctx = getInvokeContext();
  let props = ctx.props;
  if (!props) {
    props = ctx.props = getProps(getContext(useHostElement()));
  }
  return props;
}

// src/core/watch/observer.ts
function createWatchFnObserver(doc) {
  const subscriptions = /* @__PURE__ */ new Map();
  function wrap2(obj) {
    const id = `${doc}`;
    if (!id) {
      throw new Error("Q-ERROR: only object stores can be observed.");
    }
    const obs = subscriptions.get(obj);
    if (obs) {
      return obs.value;
    }
    const proxy = new SubscribeProxy(obj, subscriptions, wrap2);
    const value = new Proxy(obj, proxy);
    subscriptions.set(obj, { value, proxy });
    return value;
  }
  wrap2.getGuard = function() {
    const map = /* @__PURE__ */ new Map();
    subscriptions.forEach(() => {
      return "";
    });
    return map;
  };
  return wrap2;
}
var SubscribeProxy = class {
  constructor(obj, subscriptions, wrap2) {
    this.obj = obj;
    this.subscriptions = subscriptions;
    this.wrap = wrap2;
    this.properties = null;
  }
  get(target, prop) {
    let value = target[prop];
    const props = this.properties || (this.properties = /* @__PURE__ */ new Set());
    props.add(prop);
    if (typeof value == "object" && value != null) {
      value = this.wrap(value);
    }
    return value;
  }
  set(_, prop, newValue) {
    throw new Error("Writing to observables is not allowed! Property: " + prop + " " + newValue);
  }
  has(target, property) {
    return Object.prototype.hasOwnProperty.call(target, property);
  }
  ownKeys(target) {
    return Object.getOwnPropertyNames(target);
  }
};

// src/core/watch/watch.ts
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
      console.error(e);
    }
  }
  const obs = createWatchFnObserver(element.ownerDocument);
  try {
    const nextCleanupFn = watchFn(obs);
    if (isCleanupFn(nextCleanupFn)) {
      cleanupFnMap.set(watchFn, nextCleanupFn);
    }
  } catch (e) {
    console.error(e);
  } finally {
    watchFnQrl.guard = obs.getGuard();
    const ctx = getContext(element);
    setEvent(ctx, ON_WATCH, watchFnQrl);
  }
}
function isCleanupFn(value) {
  return typeof value === "function";
}

// src/core/watch/watch.public.ts
function onWatch(watchFn) {
  registerOnWatch(useHostElement(), useProps(), watchFn);
}
var onWatch$ = implicit$FirstArg(onWatch);

// src/core/render/jsx/host.public.ts
var Host = { __brand__: "host" };

// src/core/render/jsx/slot.public.ts
var Slot = {
  __brand__: "slot"
};

// src/core/util/promises.ts
function flattenPromiseTree(tree) {
  return Promise.all(tree).then((values) => {
    const flatArray = flattenArray(values);
    for (let i = 0; i < flatArray.length; i++) {
      if (isPromise(flatArray[i])) {
        return flattenPromiseTree(flatArray);
      }
    }
    return flatArray;
  });
}
function isPromise(value) {
  return value instanceof Promise;
}
var then = (promise, thenFn) => {
  return isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
};

// src/core/render/render.ts
function visitJsxNode(component2, renderQueue, cursor, jsxNode, isSvg) {
  if (isJSXNode(jsxNode)) {
    const nodeType = jsxNode.type;
    if (nodeType == null)
      return;
    if (typeof nodeType === "string") {
      visitJsxLiteralNode(component2, renderQueue, cursor, jsxNode, isSvg);
    } else if (nodeType === Fragment || nodeType == null) {
      const jsxChildren = jsxNode.children || EMPTY_ARRAY;
      for (const jsxChild of jsxChildren) {
        visitJsxNode(component2, renderQueue, cursor, jsxChild, isSvg);
      }
    } else if (jsxNode.type === Host) {
      updateProperties(cursor.parent, jsxNode.props, isSvg);
      const jsxChildren = jsxNode.children || EMPTY_ARRAY;
      for (const jsxChild of jsxChildren) {
        visitJsxNode(component2, renderQueue, cursor, jsxChild, isSvg);
      }
    } else if (jsxNode.type === Slot) {
      component2 && visitQSlotJsxNode(component2, renderQueue, cursor, jsxNode, isSvg);
    } else if (typeof jsxNode.type === "function") {
      visitJsxNode(component2, renderQueue, cursor, jsxNode.type(jsxNode.props), isSvg);
    } else {
      throw qError(600 /* Render_unexpectedJSXNodeType_type */, nodeType);
    }
  } else if (isPromise(jsxNode)) {
    const vNodeCursor = cursorReconcileVirtualNode(cursor);
    const render2 = (jsxNode2) => {
      cursorReconcileStartVirtualNode(vNodeCursor);
      visitJsxNode(component2, renderQueue, vNodeCursor, jsxNode2, isSvg);
      cursorReconcileEnd(vNodeCursor);
    };
    jsxNode.then(render2, render2);
    if (jsxNode.whilePending) {
      const vNodePending = cursorClone(vNodeCursor);
      cursorReconcileStartVirtualNode(vNodePending);
      visitJsxNode(component2, renderQueue, vNodePending, jsxNode.whilePending, isSvg);
      cursorReconcileEnd(vNodePending);
    }
  } else if (Array.isArray(jsxNode)) {
    const jsxChildren = jsxNode;
    for (const jsxChild of jsxChildren) {
      visitJsxNode(component2, renderQueue, cursor, jsxChild, isSvg);
    }
  } else if (typeof jsxNode === "string" || typeof jsxNode === "number") {
    cursorReconcileText(cursor, String(jsxNode));
  }
}
function visitJsxLiteralNode(component2, renderQueue, cursor, jsxNode, isSvg) {
  const jsxTag = jsxNode.type;
  const isQComponent = OnRenderProp in jsxNode.props;
  if (!isSvg) {
    isSvg = jsxTag === "svg";
  }
  const elementCursor = cursorReconcileElement(cursor, component2, jsxTag, jsxNode.props, isQComponent ? renderQueue : null, isSvg);
  if (isSvg && jsxTag === "foreignObject") {
    isSvg = false;
  }
  if (!hasInnerHtmlOrTextBinding(jsxNode)) {
    const jsxChildren = jsxNode.children || EMPTY_ARRAY;
    for (const jsxChild of jsxChildren) {
      visitJsxNode(component2, renderQueue, elementCursor, jsxChild, isSvg);
    }
    cursorReconcileEnd(elementCursor);
  } else if (isQComponent) {
    throw new Error("innerHTML/innerText bindings not supported on component content");
  }
}
function hasInnerHtmlOrTextBinding(jsxNode) {
  return "innerHTML" in jsxNode.props || "innerText" in jsxNode.props;
}
function visitQSlotJsxNode(component2, renderQueue, cursor, jsxNode, isSvg) {
  const slotName = jsxNode.props.name || "";
  const slotCursor = cursorReconcileElement(cursor, component2, QSlot, { [QSlotName]: slotName, ...jsxNode.props }, null, isSvg);
  const slotMap = getSlotMap(component2);
  const namedSlot = keyValueArrayGet(slotMap, slotName);
  if (namedSlot && namedSlot.length > 2 /* firstNode */) {
    const cursorParent = slotCursor.parent;
    if (namedSlot[1 /* parent */] !== cursorParent) {
      cursorReconcileEnd(slotCursor);
      for (let i = 2 /* firstNode */; i < namedSlot.length; i++) {
        const node = namedSlot[i];
        cursorParent.appendChild(node);
      }
      cursorReconcileEnd(slotCursor);
    }
    renderMarked(cursorParent.ownerDocument);
  } else {
    const jsxChildren = jsxNode.children;
    for (const jsxChild of jsxChildren) {
      visitJsxNode(component2, renderQueue, slotCursor, jsxChild, isSvg);
    }
    cursorReconcileEnd(slotCursor);
  }
}

// src/core/json/q-json.ts
function qDeflate(obj, hostCtx) {
  return hostCtx.refMap.add(obj);
}

// src/core/index.ts
var version = globalThis.QWIK_VERSION;

// src/core/util/case.ts
function fromCamelToKebabCase(text) {
  return text.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

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
function qPropWriteQRL(ctx, prop, value) {
  if (!value) {
    return;
  }
  prop = prop.replace("$:", ":");
  if (typeof value == "string") {
    value = parseQRL(value);
  }
  const existingQRLs = getExistingQRLs(ctx, prop);
  if (Array.isArray(value)) {
    value.forEach((value2) => qPropWriteQRL(ctx, prop, value2));
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
      qPropWriteQRL(ctx, prop, value(ctx.element));
    }
  } else if (isPromise(value)) {
    const writePromise = value.then((qrl2) => {
      existingQRLs.splice(existingQRLs.indexOf(writePromise), 1);
      qPropWriteQRL(ctx, prop, qrl2);
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
    ctx.element.setAttribute(kebabProp, serializeQRLs(existingQRLs, ctx));
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
  const platform = getPlatform2(ctx.element.ownerDocument);
  const element = ctx.element;
  return existingQRLs.map((qrl2) => isPromise(qrl2) ? "" : stringifyQRL(qrl2, element, platform)).filter((v) => !!v).join("\n");
}

// src/core/render/cursor.ts
var SVG_NS = "http://www.w3.org/2000/svg";
function cursorForParent(parent) {
  let firstChild = parent.firstChild;
  if (firstChild && firstChild.nodeType === 10 /* DOCUMENT_TYPE_NODE */) {
    firstChild = firstChild.nextSibling;
  }
  return newCursor(parent, firstChild, null);
}
function newCursor(parent, node, end) {
  return { parent, node, end };
}
function getNode(cursor) {
  const node = cursor.node;
  return cursor.end == node ? null : node;
}
function setNode(cursor, node) {
  cursor.node = cursor.end == node ? null : node;
}
function cursorClone(cursor) {
  return newCursor(cursor.parent, cursor.node, cursor.end);
}
function cursorForComponent(componentHost) {
  assertEqual(isComponentElement(componentHost), true);
  let firstNonTemplate = componentHost.firstChild;
  if (isQSLotTemplateElement(firstNonTemplate)) {
    firstNonTemplate = firstNonTemplate.nextSibling;
  }
  return newCursor(componentHost, firstNonTemplate, null);
}
function cursorReconcileElement(cursor, component2, expectTag, expectProps, componentRenderQueue, isSvg) {
  let node = getNode(cursor);
  assertNotEqual(node, void 0, "Cursor already closed");
  if (isSlotMap(node)) {
    assertDefined(cursor.parent);
    return slotMapReconcileSlots(cursor.parent, node, cursor.end, component2, expectTag, expectProps, componentRenderQueue, isSvg);
  } else {
    assertNotEqual(node, void 0, "Cursor already closed");
    node = _reconcileElement(cursor.parent, node, cursor.end, component2, expectTag, expectProps, componentRenderQueue, isSvg);
    assertDefined(node);
    setNode(cursor, node.nextSibling);
    return _reconcileElementChildCursor(node, !!componentRenderQueue);
  }
}
function slotMapReconcileSlots(parent, slots, end, component2, expectTag, expectProps, componentRenderQueue, isSvg) {
  const slotName = expectProps[QSlotAttr] || "";
  const namedSlot = keyValueArrayGet(slots, slotName);
  let childNode;
  if (namedSlot) {
    assertGreaterOrEqual(namedSlot.length, 2);
    const parent2 = namedSlot[1 /* parent */];
    let index = namedSlot[0 /* index */];
    if (index == -1) {
      index = 2;
    }
    childNode = namedSlot.length > index ? namedSlot[index] : null;
    const node = _reconcileElement(parent2, childNode, end, component2, expectTag, expectProps, componentRenderQueue, isSvg);
    if (childNode !== node) {
      namedSlot[index] = node;
      childNode = node;
    }
    namedSlot[0 /* index */] = index + 1;
  } else {
    const template = getUnSlottedStorage(parent);
    childNode = _reconcileElement(template.content, null, end, component2, expectTag, expectProps, true, isSvg);
    assertDefined(childNode);
  }
  return _reconcileElementChildCursor(childNode, !!componentRenderQueue);
}
function _reconcileElement(parent, existing, end, component2, expectTag, expectProps, componentRenderQueue, isSvg) {
  let shouldDescendIntoComponent;
  let reconciledElement;
  if (isDomElementWithTagName(existing, expectTag)) {
    updateProperties(existing, expectProps, isSvg);
    shouldDescendIntoComponent = !!componentRenderQueue;
    reconciledElement = existing;
  } else {
    const doc = isDocument(parent) ? parent : parent.ownerDocument;
    reconciledElement = replaceNode(parent, existing, isSvg ? doc.createElementNS(SVG_NS, expectTag) : doc.createElement(expectTag), end);
    if (componentRenderQueue) {
      reconciledElement.setAttribute(QHostAttr, "");
    }
    shouldDescendIntoComponent = !!componentRenderQueue;
    updateProperties(reconciledElement, expectProps, isSvg);
  }
  component2 && component2.styleClass && reconciledElement.classList.add(component2.styleClass);
  if (shouldDescendIntoComponent) {
    const hostComponent = getQComponent(reconciledElement);
    hostComponent.styleHostClass && reconciledElement.classList.add(hostComponent.styleHostClass);
    if (Array.isArray(componentRenderQueue)) {
      componentRenderQueue.push(hostComponent.render());
    } else if (reconciledElement.hasAttribute(QHostAttr)) {
      const set = getScheduled(reconciledElement.ownerDocument);
      set.add(reconciledElement);
    }
  }
  return reconciledElement;
}
var noop = () => {
  return true;
};
var handleStyle = (elm, _, newValue, oldValue) => {
  if (typeof newValue == "string") {
    elm.style.cssText = newValue;
  } else {
    for (const prop in oldValue) {
      if (!newValue || newValue[prop] == null) {
        if (prop.includes("-")) {
          elm.style.removeProperty(prop);
        } else {
          elm.style[prop] = "";
        }
      }
    }
    for (const prop in newValue) {
      if (!oldValue || newValue[prop] !== oldValue[prop]) {
        if (prop.includes("-")) {
          elm.style.setProperty(prop, newValue[prop]);
        } else {
          elm.style[prop] = newValue[prop];
        }
      }
    }
  }
  return true;
};
var PROP_HANDLER_MAP = {
  class: noop,
  style: handleStyle
};
var ALLOWS_PROPS = ["className", "class", "style", "id", "title"];
function updateProperties(node, expectProps, isSvg) {
  const ctx = getContext(node);
  const qwikProps = OnRenderProp in expectProps ? getProps(ctx) : void 0;
  if ("class" in expectProps) {
    const className = expectProps.class;
    expectProps.className = className && typeof className == "object" ? Object.keys(className).filter((k) => className[k]).join(" ") : className;
  }
  for (const key of Object.keys(expectProps)) {
    if (key === "children") {
      continue;
    }
    const newValue = expectProps[key];
    if (isOnProp(key)) {
      setEvent(ctx, key, newValue);
      continue;
    }
    if (isOn$Prop(key)) {
      setEvent(ctx, key.replace("$", ""), $(newValue));
      continue;
    }
    const oldValue = ctx.cache.get(key);
    if (newValue === oldValue) {
      continue;
    }
    ctx.cache.set(key, newValue);
    const skipQwik = ALLOWS_PROPS.includes(key) || key.startsWith("h:");
    if (qwikProps && !skipQwik) {
      qwikProps[key] = newValue;
    } else {
      if (key.startsWith("data-") || key.endsWith("aria-") || isSvg) {
        renderAttribute(node, key, newValue);
        continue;
      }
      const exception = PROP_HANDLER_MAP[key];
      if (exception) {
        if (exception(node, key, newValue, oldValue)) {
          continue;
        }
      }
      if (key in node) {
        try {
          node[key] = newValue;
        } catch (e) {
          console.error(e);
        }
        continue;
      }
      renderAttribute(node, key, newValue);
    }
  }
  return false;
}
function renderAttribute(node, key, newValue) {
  if (newValue == null) {
    node.removeAttribute(key);
  } else {
    node.setAttribute(key, String(newValue));
  }
}
function _reconcileElementChildCursor(node, isComponent) {
  assertDefined(node);
  if (isComponent) {
    return newCursor(node, getSlotMap(getQComponent(node)), null);
  } else {
    return cursorForParent(node);
  }
}
function cursorReconcileText(cursor, expectText) {
  let node = getNode(cursor);
  assertNotEqual(node, void 0, "Cursor already closed");
  assertDefined(cursor.parent);
  if (isSlotMap(node)) {
    let parent;
    let childNode;
    const namedSlot = keyValueArrayGet(node, "");
    if (namedSlot) {
      assertGreaterOrEqual(namedSlot.length, 2);
      parent = namedSlot[1 /* parent */];
      let index = namedSlot[0 /* index */];
      if (index == -1) {
        index = 2;
      }
      childNode = namedSlot.length > index ? namedSlot[index] : null;
      node = _reconcileText(parent, childNode, cursor.end, expectText);
      if (childNode !== node) {
        namedSlot[index] = node;
      }
      namedSlot[0 /* index */] = index + 1;
    } else {
      const template = getUnSlottedStorage(cursor.parent);
      _reconcileText(template.content, null, cursor.end, expectText);
    }
  } else {
    node = _reconcileText(cursor.parent, node, cursor.end, expectText);
    setNode(cursor, node.nextSibling);
  }
}
function _reconcileText(parent, node, beforeNode, expectText) {
  if (node && node.nodeType == 3 /* TEXT_NODE */) {
    if (node.textContent !== expectText) {
      node.textContent = expectText;
    }
  } else {
    node = replaceNode(parent, node, parent.ownerDocument.createTextNode(expectText), beforeNode);
  }
  return node;
}
function cursorReconcileEnd(cursor) {
  let node = getNode(cursor);
  if (isSlotMap(node)) {
    for (let i = 0; i < node.length; i = i + 2) {
      const namedSlot = node[i + 1];
      if (namedSlot[0 /* index */] !== -1) {
        assertGreater(namedSlot[0 /* index */], 1 /* parent */);
        for (let k = namedSlot[0 /* index */]; k < namedSlot.length; k++) {
          namedSlot[1 /* parent */].removeChild(namedSlot[k]);
        }
      }
    }
  } else {
    while (node) {
      const next = node.nextSibling;
      cursor.parent.removeChild(node);
      node = next;
    }
  }
  setNode(cursor, void 0);
}
function getUnSlottedStorage(componentElement) {
  assertEqual(isComponentElement(componentElement), true, "Must be component element");
  let template = componentElement?.firstElementChild;
  if (!isDomElementWithTagName(template, "template") || !template.hasAttribute(QSlotAttr)) {
    template = componentElement.insertBefore(componentElement.ownerDocument.createElement("template"), template);
    template.setAttribute(QSlotAttr, "");
  }
  return template;
}
var V_NODE_START = "<node:";
var V_NODE_END = "</node:";
function cursorReconcileVirtualNode(cursor) {
  let node = getNode(cursor);
  if (isSlotMap(node)) {
    throw new Error("Not expecting slot map here");
  } else {
    if (isComment(node) && node.textContent?.startsWith(V_NODE_START)) {
      throw new Error("IMPLEMENT");
    } else {
      const id = Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
      const parent = cursor.parent;
      const doc = parent.ownerDocument;
      const startVNode = doc.createComment(V_NODE_START + id + ">");
      const endVNode = doc.createComment(V_NODE_END + id + ">");
      node = replaceNode(cursor.parent, node, endVNode, null);
      cursor.parent.insertBefore(startVNode, endVNode);
      setNode(cursor, endVNode.nextSibling);
      return newCursor(parent, startVNode, endVNode);
    }
  }
}
function cursorReconcileStartVirtualNode(cursor) {
  const node = getNode(cursor);
  assertEqual(isComment(node) && node.textContent.startsWith(V_NODE_START), true);
  setNode(cursor, node && node.nextSibling);
}
function replaceNode(parentNode, existingNode, newNode, insertBefore) {
  parentNode.insertBefore(newNode, existingNode || insertBefore);
  if (existingNode) {
    parentNode.removeChild(existingNode);
  }
  return newNode;
}

// src/core/component/component-ctx.ts
var QComponentCtx = class {
  constructor(hostElement) {
    this.styleId = void 0;
    this.styleClass = null;
    this.styleHostClass = null;
    this.hostElement = hostElement;
    this.ctx = getContext(hostElement);
  }
  async render() {
    const hostElement = this.hostElement;
    const onRender = getEvent(this.ctx, OnRenderProp);
    assertDefined(onRender);
    const renderQueue = [];
    try {
      const event = "qRender";
      const promise = useInvoke(newInvokeContext(hostElement, hostElement, event), onRender);
      await then(promise, (jsxNode) => {
        if (this.styleId === void 0) {
          const scopedStyleId = this.styleId = hostElement.getAttribute(ComponentScopedStyles);
          if (scopedStyleId) {
            this.styleHostClass = styleHost(scopedStyleId);
            this.styleClass = styleContent(scopedStyleId);
          }
        }
        const cursor = cursorForComponent(this.hostElement);
        visitJsxNode(this, renderQueue, cursor, jsxNode, false);
        cursorReconcileEnd(cursor);
      });
    } catch (e) {
      console.log(e);
    }
    return [this.hostElement, ...await flattenPromiseTree(renderQueue)];
  }
};
var COMPONENT_PROP = "__qComponent__";
function getQComponent(hostElement) {
  const element = hostElement;
  let component2 = element[COMPONENT_PROP];
  if (!component2)
    component2 = element[COMPONENT_PROP] = new QComponentCtx(hostElement);
  return component2;
}

// src/core/render/notify-render.ts
function notifyRender(hostElement) {
  assertDefined(hostElement.getAttribute(QHostAttr));
  getScheduled(hostElement.ownerDocument).add(hostElement);
  return scheduleRender(hostElement.ownerDocument);
}
var SCHEDULE = Symbol();
function getScheduled(doc) {
  let set = doc[SCHEDULE];
  if (!set) {
    set = doc[SCHEDULE] = /* @__PURE__ */ new Set();
  }
  return set;
}
function scheduleRender(doc) {
  return getPlatform2(doc).queueRender(renderMarked);
}
async function renderMarked(doc) {
  const set = getScheduled(doc);
  const hosts = Array.from(set);
  set.clear();
  return Promise.all(hosts.map((hostElement) => {
    const cmp = getQComponent(hostElement);
    return cmp && cmp.render();
  }));
}

// src/core/object/q-object.ts
function _restoreQObject(obj, subs) {
  return readWriteProxy(obj, subs);
}
function readWriteProxy(target, subs) {
  if (!target || typeof target !== "object")
    return target;
  let proxy = proxyMap.get(target);
  if (proxy)
    return proxy;
  proxy = new Proxy(target, new ReadWriteProxyHandler(subs));
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
function wrap(value) {
  if (value && typeof value === "object") {
    const nakedValue = unwrapProxy(value);
    if (nakedValue !== value) {
      return value;
    }
    verifySerializable(value);
    const proxy = proxyMap.get(value);
    return proxy ? proxy : readWriteProxy(value);
  } else {
    return value;
  }
}
var ReadWriteProxyHandler = class {
  constructor(subs = /* @__PURE__ */ new Map()) {
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
    return wrap(value);
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
var proxyMap = /* @__PURE__ */ new WeakMap();

// src/core/props/props-obj-map.ts
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
  const doc = element.ownerDocument;
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
      id: void 0,
      props: void 0
    };
  }
  return ctx;
}
function setEvent(ctx, prop, value) {
  qPropWriteQRL(ctx, prop, value);
}
function getEvent(ctx, prop) {
  return qPropReadQRL(ctx, prop);
}
function getProps(ctx) {
  if (!ctx.props) {
    ctx.props = readWriteProxy({});
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
export {
  ElementFixture,
  applyDocumentConfig,
  createDocument,
  createGlobal,
  getTestPlatform,
  isPromise,
  toDOM,
  toFileUrl
};
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
