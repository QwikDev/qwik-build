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
var ComponentScopedStyles = "q:sstyle";
var ComponentStylesPrefixHost = "\u{1F4E6}";
var ComponentStylesPrefixContent = "\u{1F3F7}\uFE0F";
var QSlotAttr = "q:slot";
var QObjAttr = "q:obj";
var ELEMENT_ID = "q:id";
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

// src/core/util/log.ts
var STYLE = qDev ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;` : "";
var logError = (message, ...optionalParams) => {
  console.error("%cQWIK ERROR", STYLE, message, ...optionalParams);
};
var logWarn = (message, ...optionalParams) => {
  console.warn("%cQWIK WARN", STYLE, message, ...optionalParams);
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

// src/core/util/dom.ts
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
function stringifyQRL(qrl2, platform, element) {
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

// src/core/util/element.ts
function isDocument(value) {
  return value && value.nodeType == 9 /* DOCUMENT_NODE */;
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
      return import(
        /* @vite-ignore */
        importURL
      ).then((mod2) => {
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
    return qrl_.symbolRef = qrl_.symbolFn().then((module) => module[qrl_.symbol]);
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
      return document.__q_context__ = newInvokeContext(hostElement, element, context[1], context[2]);
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
function onUnmountFromQrl(unmountFn) {
  throw new Error("IMPLEMENT: onUnmount" + unmountFn);
}
var onUnmount$ = implicit$FirstArg(onUnmountFromQrl);
function onResumeFromQrl(resumeFn) {
  onWindow("load", resumeFn);
}
var onResume$ = implicit$FirstArg(onResumeFromQrl);
function onPauseFromQrl(dehydrateFn) {
  throw new Error("IMPLEMENT: onPause" + dehydrateFn);
}
var onPause$ = implicit$FirstArg(onPauseFromQrl);
function onWindow(event, eventFn) {
  const el = useHostElement();
  const ctx = getContext(el);
  qPropWriteQRL(void 0, ctx, `on-window:${event}`, eventFn);
}
function useStylesFromQrl(styles) {
  _useStyles(styles, false);
}
var useStyles$ = implicit$FirstArg(useStylesFromQrl);
function useScopedStylesFromQrl(styles) {
  _useStyles(styles, true);
}
var useScopedStyles$ = implicit$FirstArg(useScopedStylesFromQrl);
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

// src/core/object/store.ts
var UNDEFINED_PREFIX = "";
var QRL_PREFIX = "";
function resume(elmOrDoc) {
  const parentElm = isDocument(elmOrDoc) ? elmOrDoc.documentElement : elmOrDoc;
  if (!isRoot(parentElm)) {
    return;
  }
  const doc = isDocument(elmOrDoc) ? elmOrDoc : getDocument(elmOrDoc);
  const isDoc = isDocument(elmOrDoc) || elmOrDoc === doc.documentElement;
  const parentJSON = isDoc ? doc.body : parentElm;
  const script = getQwikJSON(parentJSON);
  if (!script) {
    logWarn("Skipping hydration qwik/json metadata was not found.");
    return;
  }
  script.remove();
  const map = getProxyMap(doc);
  const meta = JSON.parse(script.textContent || "{}");
  const elements = /* @__PURE__ */ new Map();
  getNodesInScope(parentElm, hasQId).forEach((el) => {
    const id = el.getAttribute(ELEMENT_ID);
    elements.set(ELEMENT_ID_PREFIX + id, el);
  });
  reviveValues(meta.objs, meta.subs, elements, map);
  for (const obj of meta.objs) {
    reviveNestedObjects(obj, elements, meta.objs, map);
  }
  getNodesInScope(parentElm, hasQObj).forEach((el) => {
    const qobj = el.getAttribute(QObjAttr);
    const host = el.getAttribute(QHostAttr);
    const ctx = getContext(el);
    qobj.split(" ").forEach((part) => {
      if (part !== "") {
        const obj = getObject(part, elements, meta.objs, map);
        ctx.refMap.add(obj);
      } else if (qDev) {
        logError("QObj contains empty ref");
      }
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
    if (!isRoot(child)) {
      if (predicate(child)) {
        nodes.push(child);
      }
      walkNodes(nodes, child, predicate);
    }
    child = child.nextElementSibling;
  }
}
function reviveValues(objs, subs, elementMap, map) {
  for (let i = 0; i < objs.length; i++) {
    const value = objs[i];
    if (typeof value === "string") {
      if (value === UNDEFINED_PREFIX) {
        objs[i] = void 0;
      } else if (value.startsWith(QRL_PREFIX)) {
        objs[i] = parseQRL(value.slice(1));
      }
    } else {
      const sub = subs[i];
      if (sub) {
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
        _restoreQObject(value, map, converted);
      }
    }
  }
}
function reviveNestedObjects(obj, elements, objs, map) {
  if (obj && typeof obj == "object") {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const value = obj[i];
        if (typeof value == "string") {
          obj[i] = getObject(value, elements, objs, map);
        } else {
          reviveNestedObjects(value, elements, objs, map);
        }
      }
    } else if (Object.getPrototypeOf(obj) === Object.prototype) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if (typeof value == "string") {
            obj[key] = getObject(value, elements, objs, map);
          } else {
            reviveNestedObjects(value, elements, objs, map);
          }
        }
      }
    }
  }
}
function getObject(id, elements, objs, map) {
  if (id[0] === ELEMENT_ID_PREFIX) {
    assertEqual(elements.has(id), true);
    return elements.get(id);
  }
  const index = strToInt(id);
  assertEqual(objs.length > index, true);
  const obj = objs[index];
  const needsProxy = id[id.length - 1] === "!";
  if (needsProxy) {
    const finalObj = map.get(obj);
    assertDefined(finalObj);
    return finalObj;
  }
  return obj;
}
function isRoot(el) {
  return el.hasAttribute("q:container");
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

// src/core/use/use-props.public.ts
function useProps() {
  const ctx = getInvokeContext();
  let props = ctx.props;
  if (!props) {
    props = ctx.props = getProps(getContext(useHostElement()));
  }
  return props;
}

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
      logError(e);
    }
  }
  throw new Error("TO IMPLEMENT");
}
function isCleanupFn(value) {
  return typeof value === "function";
}

// src/core/watch/watch.public.ts
function onWatchFromQrl(watchFn) {
  registerOnWatch(useHostElement(), useProps(), watchFn);
}
var onWatch$ = implicit$FirstArg(onWatchFromQrl);

// src/core/render/jsx/host.public.ts
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
      return processNode(node.type({ ...node.props, children: node.children }, node.key));
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

// src/core/render/render.ts
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

// src/core/util/promises.ts
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

// src/core/util/event.ts
var emitEvent = (el, eventName, detail, bubbles) => {
  if (typeof CustomEvent === "function") {
    el.dispatchEvent(new CustomEvent(eventName, {
      detail,
      bubbles,
      composed: bubbles
    }));
  }
};

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
      emitEvent(ctx.element, "qSymbol", { name: qrl2.symbol }, true);
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
    getEvents(ctx)[prop] = existingQRLs.filter((a) => !isPromise(a));
  } else {
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
}
function getExistingQRLs(ctx, prop) {
  let parts = ctx.cache.get(prop);
  if (!parts) {
    if (prop.startsWith("on:q")) {
      parts = [];
      const qrls = getEvents(ctx)[prop];
      if (qrls) {
        parts.push(...qrls);
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
  return existingQRLs.map((qrl2) => isPromise(qrl2) ? "" : stringifyQRL(qrl2, platform, element)).filter((v) => !!v).join("\n");
}

// src/core/component/component-ctx.ts
var firstRenderComponent = (rctx, ctx) => {
  ctx.element.setAttribute(QHostAttr, "");
  const result = renderComponent(rctx, ctx);
  return result;
};
var renderComponent = (rctx, ctx) => {
  const hostElement = ctx.element;
  const onRender = getEvent(ctx, OnRenderProp);
  assertDefined(onRender);
  ctx.dirty = false;
  rctx.globalState.hostsStaging.delete(hostElement);
  const promise = useInvoke(newInvokeContext(hostElement, hostElement, "qRender"), onRender);
  return then(promise, (jsxNode) => {
    jsxNode = jsxNode[0];
    rctx.hostElements.add(hostElement);
    let componentCtx = ctx.component;
    if (!componentCtx) {
      componentCtx = ctx.component = {
        hostElement,
        slots: [],
        styleHostClass: void 0,
        styleClass: void 0,
        styleId: void 0
      };
      const scopedStyleId = hostElement.getAttribute(ComponentScopedStyles) ?? void 0;
      if (scopedStyleId) {
        componentCtx.styleId = scopedStyleId;
        componentCtx.styleHostClass = styleHost(scopedStyleId);
        componentCtx.styleClass = styleContent(scopedStyleId);
        hostElement.classList.add(componentCtx.styleHostClass);
      }
    }
    componentCtx.slots = [];
    const newCtx = {
      ...rctx,
      component: componentCtx
    };
    return visitJsxNode(newCtx, hostElement, processNode(jsxNode), false);
  });
};

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
  return Array.from(elm.childNodes).filter(isNode);
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
function isNode(elm) {
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
  const output = {};
  for (const item of input) {
    const key = condition(item);
    const array = output[key] ?? (output[key] = []);
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
  let ref = hostElm[RefSymbol] ?? hostElm.getAttribute("q:sref");
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
  return node.props?.["q:slot"] ?? "";
}
function createElm(rctx, vnode, isSvg) {
  rctx.perf.visited++;
  const tag = vnode.type;
  if (tag === "#text") {
    return vnode.elm = createTextNode(rctx, vnode.text);
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
  const slots = {};
  const templates = {};
  const slotRef = hostElm.getAttribute("q:sref");
  const existingSlots = Array.from(hostElm.querySelectorAll(`q\\:slot[q\\:sref="${slotRef}"]`));
  const newSlots = componentCtx?.slots ?? EMPTY_ARRAY;
  const t = Array.from(hostElm.childNodes).filter(isSlotTemplate);
  for (const elm of existingSlots) {
    slots[elm.getAttribute("name") ?? ""] = elm;
  }
  for (const vnode of newSlots) {
    slots[vnode.props?.name ?? ""] = vnode.elm;
  }
  for (const elm of t) {
    templates[elm.getAttribute("name") ?? ""] = elm;
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
function updateProperties(rctx, ctx, expectProps, isSvg) {
  if (!expectProps) {
    return false;
  }
  const elm = ctx.element;
  const qwikProps = OnRenderProp in expectProps ? getProps(ctx) : void 0;
  for (let key of Object.keys(expectProps)) {
    if (key === "children") {
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
    if (key.startsWith("data-") || key.startsWith("aria-")) {
      setAttribute(rctx, elm, key, newValue);
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
  const byOp = {};
  for (const op of ctx.operations) {
    byOp[op.operation] = (byOp[op.operation] ?? 0) + 1;
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
          text += isClass ? value ? sep + key : "" : sep + key + ":" + value;
          sep = isClass ? " " : ";";
        }
      }
    }
    return text;
  }
  return String(obj);
}

// src/core/render/notify-render.ts
function notifyRender(hostElement) {
  assertDefined(hostElement.getAttribute(QHostAttr));
  const doc = getDocument(hostElement);
  resumeIfNeeded(hostElement);
  const ctx = getContext(hostElement);
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
var SCHEDULE = Symbol("Render state");
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
    globalState: state,
    hostElements: /* @__PURE__ */ new Set(),
    operations: [],
    roots: [],
    component: void 0,
    perf: {
      visited: 0,
      timing: []
    }
  };
  for (const el of renderingQueue) {
    if (!ctx.hostElements.has(el)) {
      ctx.roots.push(el);
      await renderComponent(ctx, getContext(el));
    }
  }
  if (ctx.operations.length === 0) {
    if (qDev) {
      if (typeof window !== "undefined" && window.document != null) {
        logDebug("Render skipped. No operations.");
        printRenderStats(ctx);
      }
    }
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
  constructor(proxy, subs = /* @__PURE__ */ new Map()) {
    this.proxy = proxy;
    this.subs = subs;
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
    const value = target[prop];
    if (typeof prop === "symbol") {
      return value;
    }
    const invokeCtx = tryGetInvokeContext();
    if (qDev && !invokeCtx && !qTest) {
      logWarn(`State assigned outside invocation context. Getting prop "${prop}" of:`, target);
    }
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
    if (typeof prop === "symbol") {
      target[prop] = newValue;
      return true;
    }
    const unwrappedNewValue = unwrapProxy(newValue);
    verifySerializable(unwrappedNewValue);
    const isArray = Array.isArray(target);
    if (isArray) {
      target[prop] = unwrappedNewValue;
      this.subs.forEach((_, el) => notifyRender(el));
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
    if (property === QOjectSubsSymbol)
      return true;
    return Object.prototype.hasOwnProperty.call(target, property);
  }
  ownKeys(target) {
    return Object.getOwnPropertyNames(target);
  }
};
function verifySerializable(value) {
  if (shouldSerialize(value) && typeof value == "object" && value !== null) {
    if (Array.isArray(value))
      return;
    if (Object.getPrototypeOf(value) !== Object.prototype) {
      throw qError(0 /* TODO */, "Only primitive and object literals can be serialized.");
    }
  }
}
var NOSERIALIZE = Symbol("NoSerialize");
function shouldSerialize(obj) {
  if (obj !== null && (typeof obj == "object" || typeof obj === "function")) {
    const noSerialize2 = obj[NOSERIALIZE] === true;
    return !noSerialize2;
  }
  return true;
}

// src/core/props/props-obj-map.ts
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

// src/core/props/props.ts
Error.stackTraceLimit = 9999;
var Q_IS_RESUMED = "__isResumed__";
var Q_CTX = "__ctx__";
function resumeIfNeeded(elm) {
  const doc = isDocument(elm) ? elm : getDocument(elm);
  const root = isDocument(elm) ? elm : elm.closest("[q\\:root]") ?? doc;
  if (!root) {
    logWarn("cant find qwik app root");
    return;
  }
  const isHydrated = root[Q_IS_RESUMED];
  if (!isHydrated) {
    root[Q_IS_RESUMED] = true;
    resume(root);
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
      props: void 0,
      events: void 0,
      component: void 0
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
      element.setAttribute(attrName, isQrl(jsxValue) ? stringifyQRL(jsxValue, void 0, element) : jsxValue);
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
