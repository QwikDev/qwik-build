'use strict';

if (typeof globalThis == 'undefined') {
  const e =
    'undefined' != typeof global
      ? global
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof self
      ? self
      : {};
  e.globalThis = e;
}


Object.defineProperty(exports, '__esModule', { value: true });

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
// minification can replace the `globalThis.qDev` with `false`
// which will remove all dev code within from the build
const qDev = true;

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
const EMPTY_ARRAY = [];
const EMPTY_OBJ = {};
if (qDev) {
    Object.freeze(EMPTY_ARRAY);
    Object.freeze(EMPTY_OBJ);
}

function isQrl(value) {
    return value instanceof QRLInternal;
}
class QRL {
    constructor(chunk, symbol, symbolRef, symbolFn, capture, captureRef, guard) {
        this.chunk = chunk;
        this.symbol = symbol;
        this.symbolRef = symbolRef;
        this.symbolFn = symbolFn;
        this.capture = capture;
        this.captureRef = captureRef;
        this.guard = guard;
        this.canonicalChunk = chunk.replace(FIND_EXT, '');
    }
}
const QRLInternal = QRL;
// https://regexr.com/6enjv
const FIND_EXT = /\.[\w?=&]+$/;

const STYLE = qDev
    ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;`
    : '';
const logError = (message, ...optionalParams) => {
    // eslint-disable-next-line no-console
    console.error('%cQWIK', STYLE, message, ...optionalParams);
};
const logWarn = (message, ...optionalParams) => {
    // eslint-disable-next-line no-console
    console.warn('%cQWIK', STYLE, message, ...optionalParams);
};
const logDebug = (message, ...optionalParams) => {
    // eslint-disable-next-line no-console
    console.debug('%cQWIK', STYLE, message, ...optionalParams);
};

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function assertDefined(value, text) {
    if (qDev) {
        if (value != null)
            return;
        throw newError(text || 'Expected defined value.');
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
    debugger; // eslint-disable-line no-debugger
    const error = new Error(text);
    logError(error); // eslint-disable-line no-console
    return error;
}

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function getDocument(node) {
    if (typeof document !== 'undefined') {
        return document;
    }
    let doc = node.ownerDocument;
    while (doc && doc.nodeType !== 9) {
        doc = doc.parentNode;
    }
    assertDefined(doc);
    return doc;
}

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
let runtimeSymbolId = 0;
const RUNTIME_QRL = '/runtimeQRL';
// https://regexr.com/68v72
const EXTRACT_IMPORT_PATH = /\(\s*(['"])([^\1]+)\1\s*\)/;
// https://regexr.com/690ds
const EXTRACT_SELF_IMPORT = /Promise\s*\.\s*resolve/;
// https://regexr.com/6a83h
const EXTRACT_FILE_NAME = /[\\/(]([\w\d.\-_]+\.(js|ts)x?):/;
function toInternalQRL(qrl) {
    assertEqual(isQrl(qrl), true);
    return qrl;
}
function staticQrl(chunkOrFn, symbol, lexicalScopeCapture = EMPTY_ARRAY) {
    let chunk;
    let symbolFn = null;
    if (typeof chunkOrFn === 'string') {
        chunk = chunkOrFn;
    }
    else if (typeof chunkOrFn === 'function') {
        symbolFn = chunkOrFn;
        let match;
        const srcCode = String(chunkOrFn);
        if ((match = srcCode.match(EXTRACT_IMPORT_PATH)) && match[2]) {
            chunk = match[2];
        }
        else if ((match = srcCode.match(EXTRACT_SELF_IMPORT))) {
            const ref = 'QWIK-SELF';
            const frames = new Error(ref).stack.split('\n');
            const start = frames.findIndex((f) => f.includes(ref));
            const frame = frames[start + 2];
            match = frame.match(EXTRACT_FILE_NAME);
            if (!match) {
                chunk = 'main';
            }
            else {
                chunk = match[1];
            }
        }
        else {
            throw new Error('Q-ERROR: Dynamic import not found: ' + srcCode);
        }
    }
    else {
        throw new Error('Q-ERROR: Unknown type argument: ' + chunkOrFn);
    }
    return new QRLInternal(chunk, symbol, null, symbolFn, null, lexicalScopeCapture, null);
}
function runtimeQrl(symbol, lexicalScopeCapture = EMPTY_ARRAY) {
    return new QRLInternal(RUNTIME_QRL, 's' + runtimeSymbolId++, symbol, null, null, lexicalScopeCapture, null);
}
function stringifyQRL(qrl, element, platform) {
    var _a;
    const qrl_ = toInternalQRL(qrl);
    const symbol = qrl_.symbol;
    const chunk = platform ? (_a = platform.chunkForSymbol(symbol)) !== null && _a !== void 0 ? _a : qrl_.chunk : qrl_.chunk;
    const parts = [chunk];
    if (symbol && symbol !== 'default') {
        parts.push('#', symbol);
    }
    const guard = qrl_.guard;
    guard === null || guard === void 0 ? void 0 : guard.forEach((value, key) => parts.push('|', key, value && value.length ? '.' + value.join('.') : ''));
    const capture = qrl_.capture;
    if (capture && capture.length > 0) {
        parts.push(JSON.stringify(capture));
    }
    const qrlString = parts.join('');
    if (qrl_.chunk === RUNTIME_QRL && element) {
        const qrls = element.__qrls__ || (element.__qrls__ = new Set());
        qrls.add(qrl);
    }
    return qrlString;
}
/**
 * `./chunk#symbol|symbol.propA.propB|[captures]
 */
function parseQRL(qrl, element) {
    if (element) {
        const qrls = element.__qrls__;
        if (qrls) {
            for (const runtimeQrl of qrls) {
                if (stringifyQRL(runtimeQrl) == qrl) {
                    return runtimeQrl;
                }
            }
        }
    }
    const endIdx = qrl.length;
    const hashIdx = indexOf(qrl, 0, '#');
    const guardIdx = indexOf(qrl, hashIdx, '|');
    const captureIdx = indexOf(qrl, guardIdx, '[');
    const chunkEndIdx = Math.min(hashIdx, guardIdx, captureIdx);
    const chunk = qrl.substring(0, chunkEndIdx);
    const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
    const symbolEndIdx = Math.min(guardIdx, captureIdx);
    const symbol = symbolStartIdx == symbolEndIdx ? 'default' : qrl.substring(symbolStartIdx, symbolEndIdx);
    const guardStartIdx = guardIdx;
    const guardEndIdx = captureIdx;
    const guard = guardStartIdx < guardEndIdx ? parseGuard(qrl.substring(guardStartIdx, guardEndIdx)) : null;
    const captureStartIdx = captureIdx;
    const captureEndIdx = endIdx;
    const capture = captureStartIdx === captureEndIdx
        ? EMPTY_ARRAY
        : JSONparse(qrl.substring(captureStartIdx, captureEndIdx));
    if (chunk === RUNTIME_QRL) {
        logError(`Q-ERROR: '${qrl}' is runtime but no instance found on element.`);
    }
    return new QRLInternal(chunk, symbol, null, null, capture, null, guard);
}
function JSONparse(json) {
    try {
        return JSON.parse(json);
    }
    catch (e) {
        logError('JSON:', json);
        throw e;
    }
}
function parseGuard(text) {
    let map = null;
    if (text) {
        text.split('|').forEach((obj) => {
            if (obj) {
                const parts = obj.split('.');
                const id = parts.shift();
                if (!map)
                    map = new Map();
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
        if (typeof symbolOrQrl == 'function' || typeof symbolOrQrl == 'string') {
            symbolOrQrl = runtimeQrl(symbolOrQrl);
        }
        else {
            // TODO(misko): centralize
            throw new Error(`Q-ERROR Only 'function's and 'string's are supported.`);
        }
    }
    return symbolOrQrl;
}

/**
 * @license
 * Copyright Builder.io; Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * State factory of the component.
 */
const QHostAttr = 'q:host';
const OnRenderProp = 'on:qRender';
/**
 * State factory of the component.
 */
const OnRenderSelector = '[q\\:host]';
/**
 * Component Styles.
 */
const ComponentScopedStyles = 'q:sstyle';
/**
 * Component style host prefix
 */
const ComponentStylesPrefixHost = '📦';
/**
 * Component style content prefix
 */
const ComponentStylesPrefixContent = '🏷️';
/**
 * `<some-element q:slot="...">`
 */
const QSlotAttr = 'q:slot';
const QObjAttr = 'q:obj';
const QObjSelector = '[q\\:obj]';
const ELEMENT_ID = 'q:id';
const ELEMENT_ID_SELECTOR = '[q\\:id]';
const ELEMENT_ID_PREFIX = '#';

/**
 * @private
 */
function isHtmlElement(node) {
    return node ? node.nodeType === NodeType.ELEMENT_NODE : false;
}
/**
 * `Node.type` enumeration
 */
var NodeType;
(function (NodeType) {
    NodeType[NodeType["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
    NodeType[NodeType["ATTRIBUTE_NODE"] = 2] = "ATTRIBUTE_NODE";
    NodeType[NodeType["TEXT_NODE"] = 3] = "TEXT_NODE";
    NodeType[NodeType["CDATA_SECTION_NODE"] = 4] = "CDATA_SECTION_NODE";
    NodeType[NodeType["PROCESSING_INSTRUCTION_NODE"] = 7] = "PROCESSING_INSTRUCTION_NODE";
    // document, such as <?xml-stylesheet … ?>.
    NodeType[NodeType["COMMENT_NODE"] = 8] = "COMMENT_NODE";
    NodeType[NodeType["DOCUMENT_NODE"] = 9] = "DOCUMENT_NODE";
    NodeType[NodeType["DOCUMENT_TYPE_NODE"] = 10] = "DOCUMENT_TYPE_NODE";
    NodeType[NodeType["DOCUMENT_FRAGMENT_NODE"] = 11] = "DOCUMENT_FRAGMENT_NODE";
})(NodeType || (NodeType = {}));

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function isNode$1(value) {
    return value && typeof value.nodeType == 'number';
}
function isDocument(value) {
    return value && value.nodeType == NodeType.DOCUMENT_NODE;
}
function isElement(value) {
    return isNode$1(value) && value.nodeType == NodeType.ELEMENT_NODE;
}

const createPlatform = (doc) => {
    const moduleCache = new Map();
    return {
        importSymbol(element, url, symbolName) {
            const urlDoc = toUrl(doc, element, url).toString();
            const urlCopy = new URL(urlDoc);
            urlCopy.hash = '';
            urlCopy.search = '';
            const importURL = urlCopy.href;
            const mod = moduleCache.get(importURL);
            if (mod) {
                return mod[symbolName];
            }
            return (function (t) { return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(t)); }); })(/* @vite-ignore */ importURL).then((mod) => {
                moduleCache.set(importURL, mod);
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
        chunkForSymbol() {
            return undefined;
        },
    };
};
/**
 * Convert relative base URI and relative URL into a fully qualified URL.
 *
 * @param base -`QRL`s are relative, and therefore they need a base for resolution.
 *    - `Element` use `base.ownerDocument.baseURI`
 *    - `Document` use `base.baseURI`
 *    - `string` use `base` as is
 *    - `QConfig` use `base.baseURI`
 * @param url - relative URL
 * @returns fully qualified URL.
 */
function toUrl(doc, element, url) {
    let _url;
    let _base = undefined;
    if (url === undefined) {
        //  recursive call
        if (element) {
            _url = element.getAttribute('q:base');
            _base = toUrl(doc, element.parentNode && element.parentNode.closest('[q\\:base]'));
        }
        else {
            _url = doc.baseURI;
        }
    }
    else if (url) {
        (_url = url), (_base = toUrl(doc, element.closest('[q\\:base]')));
    }
    else {
        throw new Error('INTERNAL ERROR');
    }
    return new URL(String(_url), _base);
}
/**
 * @public
 */
const setPlatform = (doc, plt) => (doc[DocumentPlatform] = plt);
/**
 * @public
 */
const getPlatform = (docOrNode) => {
    const doc = (isDocument(docOrNode) ? docOrNode : getDocument(docOrNode));
    return doc[DocumentPlatform] || (doc[DocumentPlatform] = createPlatform(doc));
};
const DocumentPlatform = /*@__PURE__*/ Symbol();

// <docs markdown="https://hackmd.io/m5DzCi5MTa26LuUj5t3HpQ#qrlImport">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fm5DzCi5MTa26LuUj5t3HpQ%3Fboth#qrlImport instead)
/**
 * Lazy-load a `QRL` symbol and return the lazy-loaded value.
 *
 * See: `QRL`
 *
 * @param element - Location of the URL to resolve against. This is needed to take `q:base` into
 * account.
 * @param qrl - QRL to load.
 * @returns A resolved QRL value as a Promise.
 * @public
 */
// </docs>
async function qrlImport(element, qrl) {
    const qrl_ = toInternalQRL(qrl);
    if (qrl_.symbolRef)
        return qrl_.symbolRef;
    if (qrl_.symbolFn) {
        return (qrl_.symbolRef = qrl_.symbolFn().then((module) => module[qrl_.symbol]));
    }
    else {
        return (qrl_.symbolRef = await getPlatform(getDocument(element)).importSymbol(element, qrl_.chunk, qrl_.symbol));
    }
}
// <docs markdown="https://hackmd.io/m5DzCi5MTa26LuUj5t3HpQ#$">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fm5DzCi5MTa26LuUj5t3HpQ%3Fboth#$ instead)
/**
 * Qwik Optimizer marker function.
 *
 * Use `$(...)` to tell Qwik Optimizer to extract the expression in `$(...)` into a lazy-loadable
 * resource referenced by `QRL`.
 *
 * See: `implicit$FirstArg` for additional `____$(...)` rules.
 *
 * In this example `$(...)` is used to capture the callback function of `onmousemove` into
 * lazy-loadable reference. This allows the code to refer to the function without actually
 * loading the function. In this example, the callback function does not get loaded until
 * `mousemove` event fires.
 *
 * ```typescript
 * onDocument(
 *   'mousemove',
 *   $(() => console.log('mousemove'))
 * );
 * ```
 *
 * In this code the Qwik Optimizer detects `$(...)` and transforms the code into:
 *
 * ```typescript
 * // FILE: <current file>
 * onDocument('mousemove', qrl('./chunk-abc.js', 'onMousemove'));
 *
 * // FILE: chunk-abc.js
 * export const onMousemove = () => console.log('mousemove');
 * ```
 *
 * ## Special Rules
 *
 * The Qwik Optimizer places special rules on functions that can be lazy-loaded.
 *
 * 1. The expression of the `$(expression)` function must be importable by the system.
 * (expression shows up in `import` or has `export`)
 * 2. If inlined function then all lexically captured values must be:
 *    - importable (vars shows up in `import` or has `export`)
 *    - const (The capturing process differs from JS capturing in that writing to captured
 * variables does not update them, and therefore writes are forbidden. The best practice is that
 * all captured variables are constants.)
 *    - Must be runtime serializable.
 *
 * ```typescript
 * import { importedFn } from './example';
 *
 * export const greet = () => console.log('greet');
 * function topLevelFn() {}
 *
 * function myCode() {
 *   const store = useStore({});
 *   function localFn() {}
 *   // Valid Examples
 *   $(greet); // greet is importable
 *   $(importedFn); // importedFn is importable
 *   $(() => greet()); // greet is importable;
 *   $(() => importedFn()); // importedFn is importable
 *   $(() => console.log(store)); // store is serializable.
 *
 *   // Compile time errors
 *   $(topLevelFn); // ERROR: `topLevelFn` not importable
 *   $(() => topLevelFn()); // ERROR: `topLevelFn` not importable
 *
 *   // Runtime errors
 *   $(localFn); // ERROR: `localFn` fails serialization
 *   $(() => localFn()); // ERROR: `localFn` fails serialization
 * }
 *
 * ```
 *
 * @param expression - Expression which should be lazy loaded
 * @public
 */
// </docs>
function $(expression) {
    return runtimeQrl(expression);
}
// <docs markdown="https://hackmd.io/m5DzCi5MTa26LuUj5t3HpQ#implicit$FirstArg">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fm5DzCi5MTa26LuUj5t3HpQ%3Fboth#implicit$FirstArg instead)
/**
 * Create a `____$(...)` convenience method from `___(...)`.
 *
 * It is very common for functions to take a lazy-loadable resource as a first argument. For this
 * reason, the Qwik Optimizer automatically extracts the first argument from any function which
 * ends in `$`.
 *
 * This means that `foo$(arg0)` and `foo($(arg0))` are equivalent with respect to Qwik Optimizer.
 * The former is just a shorthand for the latter.
 *
 * For example these function call are equivalent:
 *
 * - `component$(() => {...})` is same as `onRender($(() => {...}))`
 *
 * ```typescript
 * export function myApi(callback: QRL<() => void>): void {
 *   // ...
 * }
 *
 * export const myApi$ = implicit$FirstArg(myApi);
 * // type of myApi$: (callback: () => void): void
 *
 * // can be used as:
 * myApi$(() => console.log('callback'));
 *
 * // will be transpiled to:
 * // FILE: <current file>
 * myApi(qrl('./chunk-abc.js', 'callback'));
 *
 * // FILE: chunk-abc.js
 * export const callback = () => console.log('callback');
 * ```
 *
 * @param fn - function that should have its first argument automatically `$`.
 * @public
 */
// </docs>
function implicit$FirstArg(fn) {
    return function (first, ...rest) {
        return fn.call(null, $(first), ...rest);
    };
}
// <docs markdown="https://hackmd.io/m5DzCi5MTa26LuUj5t3HpQ#qrl">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fm5DzCi5MTa26LuUj5t3HpQ%3Fboth#qrl instead)
/**
 * Used by Qwik Optimizer to point to lazy-loaded resources.
 *
 * This function should be used by the Qwik Optimizer only. The function should not be directly
 * referred to in the source code of the application.
 *
 * See: `QRL`, `$(...)`
 *
 * @param chunkOrFn - Chunk name (or function which is stringified to extract chunk name)
 * @param symbol - Symbol to lazy load
 * @param lexicalScopeCapture - a set of lexically scoped variables to capture.
 * @public
 */
// </docs>
const qrl = staticQrl;

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function stringifyDebug(value) {
    if (value == null)
        return String(value);
    if (typeof value === 'function')
        return value.name;
    if (isHtmlElement(value))
        return stringifyElement(value);
    if (value instanceof URL)
        return String(value);
    if (typeof value === 'object')
        return JSON.stringify(value, function (key, value) {
            if (isHtmlElement(value))
                return stringifyElement(value);
            return value;
        });
    return String(value);
}
function stringifyElement(element) {
    let html = '<' + element.localName;
    const attributes = element.attributes;
    const names = [];
    for (let i = 0; i < attributes.length; i++) {
        names.push(attributes[i].name);
    }
    names.sort();
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        let value = element.getAttribute(name);
        if (value === null || value === void 0 ? void 0 : value.startsWith('file:/')) {
            value = value.replace(/(file:\/\/).*(\/.*)$/, (all, protocol, file) => protocol + '...' + file);
        }
        html +=
            ' ' + name + (value == null || value == '' ? '' : "='" + value.replace("'", '&apos;') + "'");
    }
    return html + '>';
}

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
var QError;
(function (QError) {
    // core 000-099
    QError[QError["TODO"] = 0] = "TODO";
    QError[QError["Core_qConfigNotFound_path"] = 1] = "Core_qConfigNotFound_path";
    QError[QError["Core_unrecognizedStack_frame"] = 2] = "Core_unrecognizedStack_frame";
    QError[QError["Core_noAttribute_atr1_element"] = 3] = "Core_noAttribute_atr1_element";
    QError[QError["Core_noAttribute_atr1_attr2_element"] = 4] = "Core_noAttribute_atr1_attr2_element";
    QError[QError["Core_missingProperty_name_props"] = 5] = "Core_missingProperty_name_props";
    QError[QError["Core_missingExport_name_url_props"] = 6] = "Core_missingExport_name_url_props";
    // QRL 100-199
    QError[QError["QRL_expectFunction_url_actual"] = 100] = "QRL_expectFunction_url_actual";
    // Injection 200-299
    QError[QError["Injector_noHost_element"] = 200] = "Injector_noHost_element";
    QError[QError["Injector_expectedSpecificInjector_expected_actual"] = 201] = "Injector_expectedSpecificInjector_expected_actual";
    QError[QError["Injector_notElement_arg"] = 202] = "Injector_notElement_arg";
    QError[QError["Injector_wrongMethodThis_expected_actual"] = 203] = "Injector_wrongMethodThis_expected_actual";
    QError[QError["Injector_missingSerializedState_entityKey_element"] = 204] = "Injector_missingSerializedState_entityKey_element";
    QError[QError["Injector_notFound_element"] = 206] = "Injector_notFound_element";
    QError[QError["Injector_eventInjectorNotSerializable"] = 207] = "Injector_eventInjectorNotSerializable";
    // Entities 300-399
    QError[QError["Entity_notValidKey_key"] = 300] = "Entity_notValidKey_key";
    QError[QError["Entity_keyAlreadyExists_key"] = 301] = "Entity_keyAlreadyExists_key";
    QError[QError["Entity_invalidAttribute_name"] = 303] = "Entity_invalidAttribute_name";
    QError[QError["Entity_missingExpandoOrState_attrName"] = 304] = "Entity_missingExpandoOrState_attrName";
    QError[QError["Entity_elementMissingEntityAttr_element_attr"] = 305] = "Entity_elementMissingEntityAttr_element_attr";
    QError[QError["Entity_noState_entity_props"] = 306] = "Entity_noState_entity_props";
    QError[QError["Entity_expected_obj"] = 307] = "Entity_expected_obj";
    QError[QError["Entity_overridesConstructor_entity"] = 308] = "Entity_overridesConstructor_entity";
    QError[QError["Entity_keyMissingParts_key_key"] = 309] = "Entity_keyMissingParts_key_key";
    QError[QError["Entity_no$type_entity"] = 310] = "Entity_no$type_entity";
    QError[QError["Entity_no$keyProps_entity"] = 311] = "Entity_no$keyProps_entity";
    QError[QError["Entity_no$qrl_entity"] = 312] = "Entity_no$qrl_entity";
    QError[QError["Entity_nameCollision_name_currentQrl_expectedQrl"] = 313] = "Entity_nameCollision_name_currentQrl_expectedQrl";
    QError[QError["Entity_keyTooManyParts_entity_parts_key"] = 314] = "Entity_keyTooManyParts_entity_parts_key";
    QError[QError["Entity_keyNameMismatch_key_name_entity_name"] = 315] = "Entity_keyNameMismatch_key_name_entity_name";
    QError[QError["Entity_stateMissingKey_state"] = 316] = "Entity_stateMissingKey_state";
    // Component 400-499
    QError[QError["Component_bindNeedsKey"] = 400] = "Component_bindNeedsKey";
    QError[QError["Component_bindNeedsValue"] = 401] = "Component_bindNeedsValue";
    QError[QError["Component_needsState"] = 402] = "Component_needsState";
    QError[QError["Component_needsInjectionContext_constructor"] = 403] = "Component_needsInjectionContext_constructor";
    QError[QError["Component_noProperty_propName_props_host"] = 404] = "Component_noProperty_propName_props_host";
    QError[QError["Component_notFound_component"] = 405] = "Component_notFound_component";
    QError[QError["Component_doesNotMatch_component_actual"] = 406] = "Component_doesNotMatch_component_actual";
    QError[QError["Component_noState_component_props"] = 408] = "Component_noState_component_props";
    // Provider 500-599
    QError[QError["Provider_unrecognizedFormat_value"] = 500] = "Provider_unrecognizedFormat_value";
    // Render 600-699
    QError[QError["Render_unexpectedJSXNodeType_type"] = 600] = "Render_unexpectedJSXNodeType_type";
    QError[QError["Render_unsupportedFormat_obj_attr"] = 601] = "Render_unsupportedFormat_obj_attr";
    QError[QError["Render_expectingEntity_entity"] = 602] = "Render_expectingEntity_entity";
    QError[QError["Render_expectingEntityArray_obj"] = 603] = "Render_expectingEntityArray_obj";
    QError[QError["Render_expectingEntityOrComponent_obj"] = 604] = "Render_expectingEntityOrComponent_obj";
    QError[QError["Render_stateMachineStuck"] = 699] = "Render_stateMachineStuck";
    // Event
    QError[QError["Event_emitEventRequiresName_url"] = 700] = "Event_emitEventRequiresName_url";
    QError[QError["Event_emitEventCouldNotFindListener_event_element"] = 701] = "Event_emitEventCouldNotFindListener_event_element";
})(QError || (QError = {}));
function qError(code, ...args) {
    if (qDev) {
        const text = codeToText(code);
        const parts = text.split('{}');
        const error = parts
            .map((value, index) => {
            return value + (index === parts.length - 1 ? '' : stringifyDebug(args[index]));
        })
            .join('');
        debugger; // eslint-disable-line no-debugger
        return new Error(error);
    }
    else {
        return new Error(`QError ` + code);
    }
}
function codeToText(code) {
    const area = {
        0: 'ERROR',
        1: 'QRL-ERROR',
        2: 'INJECTOR-ERROR',
        3: 'SERVICE-ERROR',
        4: 'COMPONENT-ERROR',
        5: 'PROVIDER-ERROR',
        6: 'RENDER-ERROR',
        7: 'EVENT-ERROR',
    }[Math.floor(code / 100)];
    const text = {
        [QError.TODO]: '{}',
        [QError.Core_qConfigNotFound_path]: "QConfig not found in path '{}'.",
        [QError.Core_unrecognizedStack_frame]: "Unrecognized stack format '{}'",
        [QError.Core_noAttribute_atr1_element]: "Could not find entity state '{}' at '{}' or any of it's parents.",
        [QError.Core_noAttribute_atr1_attr2_element]: "Could not find entity state '{}' ( or entity provider '{}') at '{}' or any of it's parents.",
        [QError.Core_missingProperty_name_props]: "Missing property '{}' in props '{}'.",
        [QError.Core_missingExport_name_url_props]: "Missing export '{}' from '{}'. Exported symbols are: {}",
        //////////////
        [QError.QRL_expectFunction_url_actual]: "QRL '${}' should point to function, was '{}'.",
        //////////////
        [QError.Injector_noHost_element]: "Can't find host element above '{}'.",
        [QError.Injector_expectedSpecificInjector_expected_actual]: "Provider is expecting '{}' but got '{}'.",
        [QError.Injector_notElement_arg]: "Expected 'Element' was '{}'.",
        [QError.Injector_wrongMethodThis_expected_actual]: "Expected injection 'this' to be of type '{}', but was of type '{}'.",
        [QError.Injector_missingSerializedState_entityKey_element]: "Entity key '{}' is found on '{}' but does not contain state. Was 'serializeState()' not run during dehydration?",
        [QError.Injector_notFound_element]: "No injector can be found starting at '{}'.",
        [QError.Injector_eventInjectorNotSerializable]: 'EventInjector does not support serialization.',
        //////////////
        [QError.Entity_notValidKey_key]: "Data key '{}' is not a valid key.\n" +
            '  - Data key can only contain characters (preferably lowercase) or number\n' +
            '  - Data key is prefixed with entity name\n' +
            "  - Data key is made up from parts that are separated with ':'.",
        [QError.Entity_keyAlreadyExists_key]: "A entity with key '{}' already exists.",
        [QError.Entity_invalidAttribute_name]: "'{}' is not a valid attribute. " +
            "Attributes can only contain 'a-z' (lowercase), '0-9', '-' and '_'.",
        [QError.Entity_missingExpandoOrState_attrName]: "Found '{}' but expando did not have entity and attribute did not have state.",
        [QError.Entity_elementMissingEntityAttr_element_attr]: "Element '{}' is missing entity attribute definition '{}'.",
        [QError.Entity_noState_entity_props]: "Unable to create state for entity '{}' with props '{}' because no state found and '$newState()' method was not defined on entity.",
        [QError.Entity_expected_obj]: "'{}' is not an instance of 'Entity'.",
        [QError.Entity_overridesConstructor_entity]: "'{}' overrides 'constructor' property preventing 'EntityType' retrieval.",
        [QError.Entity_no$keyProps_entity]: "Entity '{}' does not define '$keyProps'.",
        [QError.Entity_no$type_entity]: "Entity '{}' must have static '$type' property defining the name of the entity.",
        [QError.Entity_no$qrl_entity]: "Entity '{}' must have static '$qrl' property defining the import location of the entity.",
        [QError.Entity_nameCollision_name_currentQrl_expectedQrl]: "Name collision. Already have entity named '{}' with QRL '{}' but expected QRL '{}'.",
        [QError.Entity_keyMissingParts_key_key]: "Entity key '{}' is missing values. Expecting '{}:someValue'.",
        [QError.Entity_keyTooManyParts_entity_parts_key]: "Entity '{}' defines '$keyProps' as  '{}'. Actual key '{}' has more parts than entity defines.",
        [QError.Entity_keyNameMismatch_key_name_entity_name]: "Key '{}' belongs to entity named '{}', but expected entity '{}' with name '{}'.",
        [QError.Entity_stateMissingKey_state]: "Entity state is missing '$key'. Are you sure you passed in state? Got '{}'.",
        //////////////
        [QError.Component_bindNeedsKey]: "'bind:' must have an key. (Example: 'bind:key=\"propertyName\"').",
        [QError.Component_bindNeedsValue]: "'bind:id' must have a property name. (Example: 'bind:key=\"propertyName\"').",
        [QError.Component_needsState]: "Can't find state on host element.",
        [QError.Component_needsInjectionContext_constructor]: "Components must be instantiated inside an injection context. Use '{}.new(...)' for creation.",
        [QError.Component_noProperty_propName_props_host]: "Property '{}' not found in '{}' on component '{}'.",
        [QError.Component_notFound_component]: "Unable to find '{}' component.",
        [QError.Component_doesNotMatch_component_actual]: "Requesting component type '{}' does not match existing component instance '{}'.",
        [QError.Component_noState_component_props]: "Unable to create state for component '{}' with props '{}' because no state found and '$newState()' method was not defined on component.",
        //////////////
        [QError.Provider_unrecognizedFormat_value]: "Unrecognized expression format '{}'.",
        //////////////
        [QError.Render_unexpectedJSXNodeType_type]: 'Unexpected JSXNode<{}> type.',
        [QError.Render_unsupportedFormat_obj_attr]: "Value '{}' can't be written into '{}' attribute.",
        [QError.Render_expectingEntity_entity]: "Expecting entity object, got '{}'.",
        [QError.Render_expectingEntityArray_obj]: "Expecting array of entities, got '{}'.",
        [QError.Render_expectingEntityOrComponent_obj]: "Expecting Entity or Component got '{}'.",
        [QError.Render_stateMachineStuck]: 'Render state machine did not advance.',
        //////////////
        [QError.Event_emitEventRequiresName_url]: "Missing '$type' attribute in the '{}' url.",
        [QError.Event_emitEventCouldNotFindListener_event_element]: "Re-emitting event '{}' but no listener found at '{}' or any of its parents.",
    }[code];
    let textCode = '000' + code;
    textCode = textCode.substr(textCode.length - 3);
    return `${area}(Q-${textCode}): ${text}`;
}

// TODO(misko): need full object parsing /serializing
function qDeflate(obj, hostCtx) {
    return hostCtx.refMap.add(obj);
}
function qInflate(ref, hostCtx) {
    const obj = hostCtx.refMap.get(ref);
    assertDefined(obj);
    return obj;
}

let _context;
function tryGetInvokeContext() {
    return _context;
}
function getInvokeContext() {
    if (!_context) {
        const context = typeof document !== 'undefined' && document && document.__q_context__;
        if (!context) {
            // TODO(misko): centralize
            throw new Error("Q-ERROR: invoking 'use*()' method outside of invocation context.");
        }
        if (Array.isArray(context)) {
            const element = context[0];
            const hostElement = getHostElement(element);
            assertDefined(element);
            return (document.__q_context__ = newInvokeContext(hostElement, element, context[1], context[2]));
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
    }
    finally {
        const currentCtx = _context;
        _context = previousContext;
        if (currentCtx.waitOn && currentCtx.waitOn.length > 0) {
            // eslint-disable-next-line no-unsafe-finally
            return Promise.all(currentCtx.waitOn).then(() => returnValue);
        }
    }
    return returnValue;
}
function newInvokeContext(hostElement, element, event, url) {
    return {
        hostElement,
        element,
        event: event,
        url: url || null,
        qrl: undefined,
        subscriptions: event === 'qRender',
    };
}
/**
 * @private
 */
function useWaitOn(promise) {
    const ctx = getInvokeContext();
    (ctx.waitOn || (ctx.waitOn = [])).push(promise);
}
function getHostElement(el) {
    let foundSlot = false;
    let node = el;
    while (node) {
        const isHost = node.hasAttribute(QHostAttr);
        const isSlot = node.tagName === 'Q:SLOT';
        if (isHost) {
            if (!foundSlot) {
                break;
            }
            else {
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

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function fromCamelToKebabCase(text) {
    return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function flattenArray(array, dst) {
    // Yes this function is just Array.flat, but we need to run on old versions of Node.
    if (!dst)
        dst = [];
    for (const item of array) {
        if (Array.isArray(item)) {
            flattenArray(item, dst);
        }
        else {
            dst.push(item);
        }
    }
    return dst;
}

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function isPromise(value) {
    return value instanceof Promise;
}
const then = (promise, thenFn) => {
    return isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
};
const promiseAll = (promises) => {
    const hasPromise = promises.some(isPromise);
    if (hasPromise) {
        return Promise.all(promises);
    }
    return promises;
};

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function debugStringify(value) {
    if (value != null && typeof value == 'object') {
        return String(value.constructor.name) + '\n' + safeJSONStringify(value);
    }
    return String(value);
}
function safeJSONStringify(value) {
    try {
        return JSON.stringify(value, null, '  ');
    }
    catch (e) {
        return String(e);
    }
}

function visitJsxNode(ctx, elm, jsxNode, isSvg) {
    if (jsxNode === undefined) {
        return smartUpdateChildren(ctx, elm, [], 'root', isSvg);
    }
    if (Array.isArray(jsxNode)) {
        return smartUpdateChildren(ctx, elm, jsxNode.flat(), 'root', isSvg);
    }
    else if (jsxNode.type === Host) {
        updateProperties(ctx, getContext(elm), jsxNode.props, isSvg);
        return smartUpdateChildren(ctx, elm, jsxNode.children || [], 'root', isSvg);
    }
    else {
        return smartUpdateChildren(ctx, elm, [jsxNode], 'root', isSvg);
    }
}

function hashCode(text, hash = 0) {
    if (text.length === 0)
        return hash;
    for (let i = 0; i < text.length; i++) {
        const chr = text.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Number(Math.abs(hash)).toString(36);
}

function styleKey(qStyles) {
    return qStyles && String(hashCode(qStyles.symbol));
}
function styleHost(styleId) {
    return styleId && ComponentStylesPrefixHost + styleId;
}
function styleContent(styleId) {
    return styleId && ComponentStylesPrefixContent + styleId;
}

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Place at the root of the component View to allow binding of attributes on the Host element.
 *
 * ```
 * <Host someAttr={someExpr} someAttrStatic="value">
 *   View content implementation.
 * </Host>
 * ```
 *
 * Qwik requires that components have [docs/HOST_ELEMENTS.ts] so that it is possible to have
 * asynchronous loading point. Host element is not owned by the component. At times it is
 * desirable for the component to render additional attributes on the host element. `<Host>`
 * servers that purpose.
 * @public
 */
const Host = { __brand__: 'host' };
/**
 * @public
 */
const SkipRerender = { __brand__: 'skip' };

/**
 * @public
 */
function jsx(type, props, key) {
    return new JSXNodeImpl(type, props, key);
}
class JSXNodeImpl {
    constructor(type, props, key = null) {
        this.type = type;
        this.props = props;
        this.children = EMPTY_ARRAY;
        this.text = undefined;
        this.key = null;
        if (key != null) {
            this.key = String(key);
        }
        if (props) {
            const children = processNode(props.children);
            if (children !== undefined) {
                if (Array.isArray(children)) {
                    this.children = children;
                }
                else {
                    this.children = [children];
                }
            }
        }
    }
}
function processNode(node) {
    if (node == null || typeof node === 'boolean') {
        return undefined;
    }
    if (isJSXNode(node)) {
        if (node.type === Host || node.type === SkipRerender) {
            return node;
        }
        else if (typeof node.type === 'function') {
            return processNode(node.type(Object.assign(Object.assign({}, node.props), { children: node.children }), node.key));
        }
        else {
            return node;
        }
    }
    else if (Array.isArray(node)) {
        return node.flatMap(processNode).filter((e) => e != null);
    }
    else if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') {
        const newNode = new JSXNodeImpl('#text', null, null);
        newNode.text = String(node);
        return newNode;
    }
    else {
        logWarn('Unvalid node, skipping');
        return undefined;
    }
}
const isJSXNode = (n) => {
    if (qDev) {
        if (n instanceof JSXNodeImpl) {
            return true;
        }
        if (n && typeof n === 'object' && n.constructor.name === JSXNodeImpl.name) {
            throw new Error(`Duplicate implementations of "JSXNodeImpl" found`);
        }
        return false;
    }
    else {
        return n instanceof JSXNodeImpl;
    }
};
/**
 * @public
 */
const Fragment = (props) => props.children;

const firstRenderComponent = (rctx, ctx) => {
    ctx.element.setAttribute(QHostAttr, '');
    const result = renderComponent(rctx, ctx);
    // if (ctx.component?.styleHostClass) {
    //   classlistAdd(rctx, ctx.element, ctx.component.styleHostClass);
    // }
    return result;
};
const renderComponent = (rctx, ctx) => {
    const hostElement = ctx.element;
    const onRender = getEvent(ctx, OnRenderProp);
    const event = 'qRender';
    assertDefined(onRender);
    // Component is not dirty any more
    ctx.dirty = false;
    rctx.globalState.hostsStaging.delete(hostElement);
    // Invoke render hook
    const promise = useInvoke(newInvokeContext(hostElement, hostElement, event), onRender);
    return then(promise, (jsxNode) => {
        var _a;
        // Types are wrong here
        jsxNode = jsxNode[0];
        rctx.hostElements.add(hostElement);
        let componentCtx = ctx.component;
        if (!componentCtx) {
            componentCtx = ctx.component = {
                hostElement,
                slots: [],
                styleHostClass: undefined,
                styleClass: undefined,
                styleId: undefined,
            };
            const scopedStyleId = (_a = hostElement.getAttribute(ComponentScopedStyles)) !== null && _a !== void 0 ? _a : undefined;
            if (scopedStyleId) {
                componentCtx.styleId = scopedStyleId;
                componentCtx.styleHostClass = styleHost(scopedStyleId);
                componentCtx.styleClass = styleContent(scopedStyleId);
                hostElement.classList.add(componentCtx.styleHostClass);
            }
        }
        componentCtx.slots = [];
        const newCtx = Object.assign(Object.assign({}, rctx), { component: componentCtx });
        return visitJsxNode(newCtx, hostElement, processNode(jsxNode), false);
    });
};

function QStore_hydrate(doc) {
    const script = doc.querySelector('script[type="qwik/json"]');
    doc.qDehydrate = () => QStore_dehydrate(doc);
    const map = getProxyMap(doc);
    if (script) {
        script.parentElement.removeChild(script);
        const meta = JSON.parse(script.textContent || '{}');
        const elements = new Map();
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
            qobj.split(' ').forEach((part) => {
                const obj = part[0] === ELEMENT_ID_PREFIX ? elements.get(part) : meta.objs[strToInt(part)];
                assertDefined(obj);
                ctx.refMap.add(obj);
            });
            if (host) {
                const [props, events] = host.split(' ').map(strToInt);
                assertDefined(props);
                assertDefined(events);
                ctx.props = ctx.refMap.get(props);
                ctx.events = ctx.refMap.get(events);
            }
        });
    }
}
/**
 * Serialize the current state of the application into DOM
 *
 * @param doc
 */
function QStore_dehydrate(doc) {
    const objSet = new Set();
    // Element to index
    const elementToIndex = new Map();
    function getElementID(el) {
        let id = elementToIndex.get(el);
        if (id === undefined) {
            if (el.isConnected) {
                id = intToStr(elementToIndex.size);
                el.setAttribute(ELEMENT_ID, id);
                id = ELEMENT_ID_PREFIX + id;
            }
            else {
                id = null;
            }
            elementToIndex.set(el, id);
        }
        return id;
    }
    // Find all Elements which have qObjects attached to them
    const elements = doc.querySelectorAll(QObjSelector);
    elements.forEach((node) => {
        const props = getContext(node);
        const qMap = props.refMap;
        qMap.array.forEach((v) => {
            collectQObjects(v, objSet);
        });
    });
    // Convert objSet to array
    const objArray = Array.from(objSet);
    objArray.sort((a, b) => {
        const isProxyA = a[QOjectTargetSymbol] !== undefined ? 0 : 1;
        const isProxyB = b[QOjectTargetSymbol] !== undefined ? 0 : 1;
        return isProxyA - isProxyB;
    });
    const objs = objArray.map((a) => {
        var _a;
        return (_a = a[QOjectTargetSymbol]) !== null && _a !== void 0 ? _a : a;
    });
    const subs = objArray
        .map((a) => {
        const subs = a[QOjectSubsSymbol];
        if (subs) {
            return Object.fromEntries(Array.from(subs.entries()).map(([el, set]) => {
                const id = getElementID(el);
                if (id !== null) {
                    return [id, Array.from(set)];
                }
                else {
                    return [undefined, undefined];
                }
            }));
        }
        else {
            return null;
        }
    })
        .filter((a) => !!a);
    const objToId = new Map();
    let count = 0;
    for (const obj of objs) {
        objToId.set(obj, count);
        count++;
    }
    const convert = (value) => {
        var _a, _b;
        if (value && typeof value === 'object') {
            value = (_a = value[QOjectTargetSymbol]) !== null && _a !== void 0 ? _a : value;
        }
        const idx = objToId.get(value);
        if (idx !== undefined) {
            return intToStr(idx);
        }
        return (_b = elementToIndex.get(value)) !== null && _b !== void 0 ? _b : value;
    };
    const convertedObjs = objs.map((obj) => {
        if (Array.isArray(obj)) {
            return obj.map(convert);
        }
        else if (typeof obj === 'object') {
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
        subs,
    };
    // Write back to the dom
    elements.forEach((node) => {
        const ctx = getContext(node);
        const props = ctx.props;
        const events = ctx.events;
        const attribute = ctx.refMap.array
            .map((obj) => {
            var _a;
            if (isElement(obj)) {
                return getElementID(obj);
            }
            const idx = typeof obj === 'object' ? objToId.get((_a = obj[QOjectTargetSymbol]) !== null && _a !== void 0 ? _a : obj) : objToId.get(obj);
            assertDefined(idx);
            return intToStr(idx);
        })
            .join(' ');
        node.setAttribute(QObjAttr, attribute);
        if (props) {
            const objs = [props];
            if (events) {
                objs.push(events);
            }
            node.setAttribute(QHostAttr, objs.map((obj) => ctx.refMap.indexOf(obj)).join(' '));
        }
    });
    // Sanity check of serialized element
    if (qDev) {
        elementToIndex.forEach((value, el) => {
            if (getDocument(el) !== doc) {
                logWarn('element from different document', value, el.tagName);
            }
            if (!value) {
                logWarn('unconnected element', el.tagName, '\n');
            }
        });
    }
    // Serialize
    const script = doc.createElement('script');
    script.setAttribute('type', 'qwik/json');
    script.textContent = JSON.stringify(data, undefined, qDev ? '  ' : undefined);
    doc.body.appendChild(script);
}
function reviveQObjects(objs, subs, elementMap, map) {
    for (let i = 0; i < objs.length; i++) {
        const sub = subs[i];
        if (sub) {
            const value = objs[i];
            const converted = new Map();
            Object.entries(sub).forEach((entry) => {
                const el = elementMap.get(entry[0]);
                if (!el) {
                    logWarn('QWIK can not revive subscriptions because of missing element ID', entry, value);
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
    if (obj && typeof obj == 'object') {
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                const value = obj[i];
                if (typeof value == 'string') {
                    obj[i] = map[strToInt(value)];
                }
                else {
                    reviveNestedQObjects(value, map);
                }
            }
        }
        else {
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    if (typeof value == 'string') {
                        obj[key] = map[strToInt(value)];
                    }
                    else {
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
        if (typeof obj === 'boolean') {
            return;
        }
        if (seen.has(obj))
            return;
        seen.add(obj);
        if (typeof obj === 'object') {
            if (Array.isArray(obj)) {
                for (let i = 0; i < obj.length; i++) {
                    collectQObjects(obj[i], seen);
                }
            }
            else {
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
const intToStr = (nu) => {
    return nu.toString(36);
};
const strToInt = (nu) => {
    return parseInt(nu, 36);
};

const SVG_NS = 'http://www.w3.org/2000/svg';
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
    }
    else if (ch.length > 0) {
        return addVnodes(ctx, elm, undefined, ch, 0, ch.length - 1, isSvg);
    }
    else if (oldCh.length > 0) {
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
            oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
        }
        else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
        }
        else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldStartVnode, newStartVnode)) {
            results.push(patchVnode(ctx, oldStartVnode, newStartVnode, isSvg));
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (sameVnode(oldEndVnode, newEndVnode)) {
            results.push(patchVnode(ctx, oldEndVnode, newEndVnode, isSvg));
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldStartVnode, newEndVnode)) {
            // Vnode moved right
            results.push(patchVnode(ctx, oldStartVnode, newEndVnode, isSvg));
            insertBefore(ctx, parentElm, oldStartVnode, oldEndVnode.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldEndVnode, newStartVnode)) {
            // Vnode moved left
            results.push(patchVnode(ctx, oldEndVnode, newStartVnode, isSvg));
            insertBefore(ctx, parentElm, oldEndVnode, oldStartVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }
            idxInOld = oldKeyToIdx[newStartVnode.key];
            if (idxInOld === undefined) {
                // New element
                const newElm = createElm(ctx, newStartVnode, isSvg);
                results.push(then(newElm, (newElm) => {
                    insertBefore(ctx, parentElm, newElm, oldStartVnode);
                }));
            }
            else {
                elmToMove = oldCh[idxInOld];
                if (elmToMove.nodeName !== newStartVnode.type) {
                    const newElm = createElm(ctx, newStartVnode, isSvg);
                    results.push(then(newElm, (newElm) => {
                        insertBefore(ctx, parentElm, newElm, oldStartVnode);
                    }));
                }
                else {
                    results.push(patchVnode(ctx, elmToMove, newStartVnode, isSvg));
                    oldCh[idxInOld] = undefined;
                    insertBefore(ctx, parentElm, elmToMove, oldStartVnode);
                }
            }
            newStartVnode = newCh[++newStartIdx];
        }
    }
    if (newStartIdx <= newEndIdx) {
        const before = newCh[newEndIdx + 1] == null ? undefined : newCh[newEndIdx + 1].elm;
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
        case 'default':
            return getCh(elm);
        case 'slot':
            return getCh(elm).filter(isChildSlot);
        case 'root':
            return getCh(elm).filter(isChildComponent);
        case 'fallback':
            return getCh(elm).filter(isFallback);
    }
}
function isNode(elm) {
    return elm.nodeType === 1 || elm.nodeType === 3;
}
function isFallback(node) {
    return node.nodeName === 'Q:FALLBACK';
}
function isChildSlot(node) {
    return node.nodeName !== 'Q:FALLBACK' && isChildComponent(node);
}
function isSlotTemplate(node) {
    return node.nodeName === 'TEMPLATE' && node.hasAttribute(QSlotAttr);
}
function isChildComponent(node) {
    return node.nodeName !== 'TEMPLATE' || !node.hasAttribute(QSlotAttr);
}
function splitBy(input, condition) {
    var _a;
    const output = {};
    for (const item of input) {
        const key = condition(item);
        const array = (_a = output[key]) !== null && _a !== void 0 ? _a : (output[key] = []);
        array.push(item);
    }
    return output;
}
function patchVnode(rctx, elm, vnode, isSvg) {
    rctx.perf.visited++;
    vnode.elm = elm;
    const tag = vnode.type;
    if (tag === '#text') {
        if (elm.data !== vnode.text) {
            setProperty(rctx, elm, 'data', vnode.text);
        }
        return;
    }
    if (tag === Host || tag === SkipRerender) {
        return;
    }
    if (!isSvg) {
        isSvg = tag === 'svg';
    }
    let promise;
    const props = vnode.props;
    const ctx = getContext(elm);
    const dirty = updateProperties(rctx, ctx, props, isSvg);
    const isSlot = tag === 'q:slot';
    if (isSvg && vnode.type === 'foreignObject') {
        isSvg = false;
    }
    else if (isSlot) {
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
            // Mark empty slots and remove content
            Object.entries(slotMaps.slots).forEach(([key, slotEl]) => {
                if (slotEl && !splittedChidren[key]) {
                    const oldCh = getChildren(slotEl, 'slot');
                    if (oldCh.length > 0) {
                        removeVnodes(rctx, slotEl, oldCh, 0, oldCh.length - 1);
                    }
                }
            });
            // Render into slots
            Object.entries(splittedChidren).forEach(([key, ch]) => {
                const slotElm = getSlotElement(rctx, slotMaps, elm, key);
                promises.push(smartUpdateChildren(rctx, slotElm, ch, 'slot', isSvg));
            });
            return then(promiseAll(promises), () => {
                removeTemplates(rctx, slotMaps);
            });
        });
    }
    const setsInnerHTML = checkInnerHTML(props);
    if (setsInnerHTML) {
        if (qDev && ch.length > 0) {
            logWarn('Node can not have children when innerHTML is set');
        }
        return;
    }
    return then(promise, () => {
        const mode = isSlot ? 'fallback' : 'default';
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
let refCount = 0;
const RefSymbol = Symbol();
function setSlotRef(ctx, hostElm, slotEl) {
    var _a;
    let ref = (_a = hostElm[RefSymbol]) !== null && _a !== void 0 ? _a : hostElm.getAttribute('q:sref');
    if (ref === null) {
        ref = intToStr(refCount++);
        hostElm[RefSymbol] = ref;
        setAttribute(ctx, hostElm, 'q:sref', ref);
    }
    slotEl.setAttribute('q:sref', ref);
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
    const template = createElement(ctx, 'template', false);
    template.setAttribute(QSlotAttr, slotName);
    return template;
}
function removeTemplates(ctx, slotMaps) {
    Object.keys(slotMaps.templates).forEach((key) => {
        const template = slotMaps.templates[key];
        if (template && slotMaps.slots[key] !== undefined) {
            removeNode(ctx, template);
            slotMaps.templates[key] = undefined;
        }
    });
}
function resolveSlotProjection(ctx, hostElm, before, after) {
    Object.entries(before.slots).forEach(([key, slotEl]) => {
        if (slotEl && !after.slots[key]) {
            // Slot removed
            // Move slot to template
            const template = createTemplate(ctx, key);
            const slotChildren = getChildren(slotEl, 'slot');
            template.content.append(...slotChildren);
            hostElm.insertBefore(template, hostElm.firstChild);
            ctx.operations.push({
                el: template,
                operation: 'slot-to-template',
                args: slotChildren,
                fn: () => { },
            });
        }
    });
    Object.entries(after.slots).forEach(([key, slotEl]) => {
        if (slotEl && !before.slots[key]) {
            // Slot created
            // Move template to slot
            const template = before.templates[key];
            if (template) {
                slotEl.appendChild(template.content);
                template.remove();
                ctx.operations.push({
                    el: slotEl,
                    operation: 'template-to-slot',
                    args: [template],
                    fn: () => { },
                });
            }
        }
    });
}
function getSlotName(node) {
    var _a, _b;
    return (_b = (_a = node.props) === null || _a === void 0 ? void 0 : _a['q:slot']) !== null && _b !== void 0 ? _b : '';
}
function createElm(rctx, vnode, isSvg) {
    rctx.perf.visited++;
    const tag = vnode.type;
    if (tag === '#text') {
        return (vnode.elm = createTextNode(rctx, vnode.text));
    }
    if (!isSvg) {
        isSvg = tag === 'svg';
    }
    const props = vnode.props;
    const elm = (vnode.elm = createElement(rctx, tag, isSvg));
    const isComponent = isComponentNode(vnode);
    const ctx = getContext(elm);
    setKey(elm, vnode.key);
    updateProperties(rctx, ctx, props, isSvg);
    if (isSvg && tag === 'foreignObject') {
        isSvg = false;
    }
    const currentComponent = rctx.component;
    if (currentComponent) {
        const styleTag = currentComponent.styleClass;
        if (styleTag) {
            classlistAdd(rctx, elm, styleTag);
        }
        if (tag === 'q:slot') {
            setSlotRef(rctx, currentComponent.hostElement, elm);
            rctx.component.slots.push(vnode);
        }
    }
    let wait;
    if (isComponent) {
        wait = firstRenderComponent(rctx, ctx);
    }
    else {
        const setsInnerHTML = checkInnerHTML(props);
        if (setsInnerHTML) {
            if (qDev && vnode.children.length > 0) {
                logWarn('Node can not have children when innerHTML is set');
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
            const slotMap = isComponent ? getSlots(ctx.component, elm) : undefined;
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
const getSlots = (componentCtx, hostElm) => {
    var _a, _b, _c, _d, _e;
    const slots = {};
    const templates = {};
    const slotRef = hostElm.getAttribute('q:sref');
    const existingSlots = Array.from(hostElm.querySelectorAll(`q\\:slot[q\\:sref="${slotRef}"]`));
    const newSlots = (_a = componentCtx === null || componentCtx === void 0 ? void 0 : componentCtx.slots) !== null && _a !== void 0 ? _a : EMPTY_ARRAY;
    const t = Array.from(hostElm.childNodes).filter(isSlotTemplate);
    // Map slots
    for (const elm of existingSlots) {
        slots[(_b = elm.getAttribute('name')) !== null && _b !== void 0 ? _b : ''] = elm;
    }
    // Map virtual slots
    for (const vnode of newSlots) {
        slots[(_d = (_c = vnode.props) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : ''] = vnode.elm;
    }
    // Map templates
    for (const elm of t) {
        templates[(_e = elm.getAttribute('name')) !== null && _e !== void 0 ? _e : ''] = elm;
    }
    return { slots, templates };
};
const handleStyle = (ctx, elm, _, newValue, oldValue) => {
    // TODO, needs reimplementation
    if (typeof newValue == 'string') {
        elm.style.cssText = newValue;
    }
    else {
        for (const prop in oldValue) {
            if (!newValue || newValue[prop] == null) {
                if (prop.includes('-')) {
                    styleSetProperty(ctx, elm, prop, null);
                }
                else {
                    setProperty(ctx, elm.style, prop, '');
                }
            }
        }
        for (const prop in newValue) {
            const value = newValue[prop];
            if (!oldValue || value !== oldValue[prop]) {
                if (prop.includes('-')) {
                    styleSetProperty(ctx, elm, prop, value);
                }
                else {
                    setProperty(ctx, elm.style, prop, value);
                }
            }
        }
    }
    return true;
};
const checkBeforeAssign = (ctx, elm, prop, newValue) => {
    if (prop in elm) {
        if (elm[prop] !== newValue) {
            setProperty(ctx, elm, prop, newValue);
        }
    }
    return true;
};
const dangerouslySetInnerHTML = 'dangerouslySetInnerHTML';
const setInnerHTML = (ctx, elm, _, newValue) => {
    if (dangerouslySetInnerHTML in elm) {
        setProperty(ctx, elm, dangerouslySetInnerHTML, newValue);
    }
    else if ('innerHTML' in elm) {
        setProperty(ctx, elm, 'innerHTML', newValue);
    }
    return true;
};
const PROP_HANDLER_MAP = {
    style: handleStyle,
    value: checkBeforeAssign,
    checked: checkBeforeAssign,
    [dangerouslySetInnerHTML]: setInnerHTML,
};
const ALLOWS_PROPS = ['className', 'style', 'id', 'q:slot'];
function updateProperties(rctx, ctx, expectProps, isSvg) {
    if (!expectProps) {
        return false;
    }
    const elm = ctx.element;
    const qwikProps = OnRenderProp in expectProps ? getProps(ctx) : undefined;
    if ('class' in expectProps) {
        const className = expectProps.class;
        expectProps.className =
            className && typeof className == 'object'
                ? Object.keys(className)
                    .filter((k) => className[k])
                    .join(' ')
                : className;
    }
    // TODO
    // when a proper disappears, we cant reset the value
    for (let key of Object.keys(expectProps)) {
        if (key === 'children' || key === 'class') {
            continue;
        }
        const newValue = expectProps[key];
        if (isOnProp(key)) {
            setEvent(rctx, ctx, key, newValue);
            continue;
        }
        if (isOn$Prop(key)) {
            setEvent(rctx, ctx, key.replace('$', ''), $(newValue));
            continue;
        }
        // Early exit if value didnt change
        const oldValue = ctx.cache.get(key);
        if (newValue === oldValue) {
            continue;
        }
        ctx.cache.set(key, newValue);
        // Check of data- or aria-
        if (key.startsWith('data-') || key.startsWith('aria-') || isSvg) {
            setAttribute(rctx, elm, key, newValue);
            continue;
        }
        if (qwikProps) {
            const skipProperty = ALLOWS_PROPS.includes(key);
            const hPrefixed = key.startsWith('h:');
            if (!skipProperty && !hPrefixed) {
                // Qwik props
                qwikProps[key] = newValue;
                continue;
            }
            if (hPrefixed) {
                key = key.slice(2);
            }
        }
        // Check if its an exception
        const exception = PROP_HANDLER_MAP[key];
        if (exception) {
            if (exception(rctx, elm, key, newValue, oldValue)) {
                continue;
            }
        }
        // Check if property in prototype
        if (key in elm) {
            setProperty(rctx, elm, key, newValue);
            continue;
        }
        // Fallback to render attribute
        setAttribute(rctx, elm, key, newValue);
    }
    return ctx.dirty;
}
function setAttribute(ctx, el, prop, value) {
    const fn = () => {
        if (value == null) {
            el.removeAttribute(prop);
        }
        else {
            el.setAttribute(prop, String(value));
        }
    };
    ctx.operations.push({
        el,
        operation: 'set-attribute',
        args: [prop, value],
        fn,
    });
}
function styleSetProperty(ctx, el, prop, value) {
    const fn = () => {
        if (value == null) {
            el.style.removeProperty(prop);
        }
        else {
            el.style.setProperty(prop, String(value));
        }
    };
    ctx.operations.push({
        el,
        operation: 'style-set-property',
        args: [prop, value],
        fn,
    });
}
function classlistAdd(ctx, el, hostStyleTag) {
    const fn = () => {
        el.classList.add(hostStyleTag);
    };
    ctx.operations.push({
        el,
        operation: 'classlist-add',
        args: [hostStyleTag],
        fn,
    });
}
function setProperty(ctx, node, key, value) {
    const fn = () => {
        try {
            node[key] = value;
        }
        catch (err) {
            logError('Set property', { node, key, value }, err);
        }
    };
    ctx.operations.push({
        el: node,
        operation: 'set-property',
        args: [key, value],
        fn,
    });
}
function createElement(ctx, expectTag, isSvg) {
    const el = isSvg ? ctx.doc.createElementNS(SVG_NS, expectTag) : ctx.doc.createElement(expectTag);
    ctx.operations.push({
        el,
        operation: 'create-element',
        args: [expectTag],
        fn: () => { },
    });
    return el;
}
function insertBefore(ctx, parent, newChild, refChild) {
    const fn = () => {
        parent.insertBefore(newChild, refChild ? refChild : null);
    };
    ctx.operations.push({
        el: parent,
        operation: 'insert-before',
        args: [newChild, refChild],
        fn,
    });
    return newChild;
}
function prepend(ctx, parent, newChild) {
    const fn = () => {
        parent.insertBefore(newChild, parent.firstChild);
    };
    ctx.operations.push({
        el: parent,
        operation: 'prepend',
        args: [newChild],
        fn,
    });
}
function removeNode(ctx, el) {
    const fn = () => {
        const parent = el.parentNode;
        if (parent) {
            parent.removeChild(el);
        }
        else if (qDev) {
            logWarn('Trying to remove component already removed', el);
        }
    };
    ctx.operations.push({
        el: el,
        operation: 'remove',
        args: [],
        fn,
    });
}
function createTextNode(ctx, text) {
    return ctx.doc.createTextNode(text);
}
function executeContextWithSlots(ctx) {
    const before = ctx.roots.map((elm) => getSlots(undefined, elm));
    executeContext(ctx);
    const after = ctx.roots.map((elm) => getSlots(undefined, elm));
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
        byOp[op.operation] = ((_a = byOp[op.operation]) !== null && _a !== void 0 ? _a : 0) + 1;
    }
    const affectedElements = Array.from(new Set(ctx.operations.map((a) => a.el)));
    const stats = {
        byOp,
        roots: ctx.roots,
        hostElements: Array.from(ctx.hostElements),
        affectedElements,
        visitedNodes: ctx.perf.visited,
        operations: ctx.operations.map((v) => [v.operation, v.el, ...v.args]),
    };
    logDebug('Render stats', stats);
    return stats;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    const map = {};
    for (let i = beginIdx; i <= endIdx; ++i) {
        const child = children[i];
        if (child.nodeType == NodeType.ELEMENT_NODE) {
            const key = getKey(child);
            if (key !== undefined) {
                map[key] = i;
            }
        }
    }
    return map;
}
const KEY_SYMBOL = Symbol('vnode key');
function getKey(el) {
    let key = el[KEY_SYMBOL];
    if (key === undefined) {
        key = el[KEY_SYMBOL] = el.getAttribute('q:key');
    }
    return key;
}
function setKey(el, key) {
    if (typeof key === 'string') {
        el.setAttribute('q:key', key);
    }
    el[KEY_SYMBOL] = key;
}
function sameVnode(vnode1, vnode2) {
    const isSameSel = vnode1.nodeName.toLowerCase() === vnode2.type;
    const isSameKey = vnode1.nodeType === NodeType.ELEMENT_NODE ? getKey(vnode1) === vnode2.key : true;
    return isSameSel && isSameKey;
}
function checkInnerHTML(props) {
    return props && ('innerHTML' in props || dangerouslySetInnerHTML in props);
}

/**
 * Mark component for rendering.
 *
 * Use `notifyRender` method to mark a component for rendering at some later point in time.
 * This method uses `getPlatform(doc).queueRender` for scheduling of the rendering. The
 * default implementation of the method is to use `requestAnimationFrame` to do actual rendering.
 *
 * The method is intended to coalesce multiple calls into `notifyRender` into a single call for
 * rendering.
 *
 * @param hostElement - Host-element of the component to re-render.
 * @returns A promise which is resolved when the component has been rendered.
 * @public
 */
// TODO(misko): tests
// TODO(misko): this should take QComponent as well.
function notifyRender(hostElement) {
    assertDefined(hostElement.getAttribute(QHostAttr));
    const doc = getDocument(hostElement);
    hydrateIfNeeded(doc);
    const ctx = getContext(hostElement);
    const state = getRenderingState(doc);
    if (ctx.dirty) {
        // TODO
        return state.renderPromise;
    }
    ctx.dirty = true;
    const activeRendering = state.hostsRendering !== undefined;
    if (activeRendering) {
        state.hostsStaging.add(hostElement);
        return state.renderPromise.then((ctx) => {
            if (state.hostsNext.has(hostElement)) {
                // TODO
                return state.renderPromise;
            }
            else {
                return ctx;
            }
        });
    }
    else {
        state.hostsNext.add(hostElement);
        return scheduleFrame(doc, state);
    }
}
function scheduleFrame(doc, state) {
    if (state.renderPromise === undefined) {
        state.renderPromise = getPlatform(doc).nextTick(() => renderMarked(doc, state));
    }
    return state.renderPromise;
}
const SCHEDULE = Symbol();
function getRenderingState(doc) {
    let set = doc[SCHEDULE];
    if (!set) {
        doc[SCHEDULE] = set = {
            hostsNext: new Set(),
            hostsStaging: new Set(),
            renderPromise: undefined,
            hostsRendering: undefined,
        };
    }
    return set;
}
async function renderMarked(doc, state) {
    state.hostsRendering = new Set(state.hostsNext);
    state.hostsNext.clear();
    const platform = getPlatform(doc);
    const renderingQueue = Array.from(state.hostsRendering);
    sortNodes(renderingQueue);
    const ctx = {
        doc,
        globalState: state,
        hostElements: new Set(),
        operations: [],
        roots: [],
        component: undefined,
        perf: {
            visited: 0,
            timing: [],
        },
    };
    for (const el of renderingQueue) {
        if (!ctx.hostElements.has(el)) {
            ctx.roots.push(el);
            await renderComponent(ctx, getContext(el));
        }
    }
    // Early exist, no dom operations
    if (ctx.operations.length === 0) {
        if (qDev) {
            if (typeof window !== 'undefined' && window.document != null) {
                logDebug('Render skipped. No operations.');
                printRenderStats(ctx);
            }
        }
        postRendering(doc, state);
        return ctx;
    }
    return platform.raf(() => {
        executeContextWithSlots(ctx);
        if (qDev) {
            if (typeof window !== 'undefined' && window.document != null) {
                printRenderStats(ctx);
            }
        }
        postRendering(doc, state);
        return ctx;
    });
}
function postRendering(doc, state) {
    // Move elements from staging to nextRender
    state.hostsStaging.forEach((el) => {
        state.hostsNext.add(el);
    });
    // Clear staging
    state.hostsStaging.clear();
    state.hostsRendering = undefined;
    state.renderPromise = undefined;
    if (state.hostsNext.size > 0) {
        scheduleFrame(doc, state);
    }
}
function sortNodes(elements) {
    elements.sort((a, b) => (a.compareDocumentPosition(b) & 2 ? 1 : -1));
}

const ProxyMapSymbol = Symbol('ProxyMapSymbol');
function getProxyMap(doc) {
    let map = doc[ProxyMapSymbol];
    if (!map) {
        map = doc[ProxyMapSymbol] = new WeakMap();
    }
    return map;
}
function qObject(obj, proxyMap) {
    assertEqual(unwrapProxy(obj), obj, 'Unexpected proxy at this location');
    if (obj == null || typeof obj !== 'object') {
        // TODO(misko): centralize
        throw new Error(`Q-ERROR: Only objects can be wrapped in 'QObject', got ` + debugStringify(obj));
    }
    if (obj.constructor !== Object) {
        throw new Error(`Q-ERROR: Only objects literals can be wrapped in 'QObject', got ` + debugStringify(obj));
    }
    const proxy = readWriteProxy(obj, proxyMap);
    Object.assign(proxy[QOjectTargetSymbol], obj);
    return proxy;
}
function _restoreQObject(obj, map, subs) {
    return readWriteProxy(obj, map, subs);
}
function getTransient(obj, key) {
    return obj[QOjectTransientsSymbol].get(key);
}
function setTransient(obj, key, value) {
    obj[QOjectTransientsSymbol].set(key, value);
    return value;
}
/**
 * Creates a proxy which notifies of any writes.
 */
function readWriteProxy(target, proxyMap, subs) {
    if (!target || typeof target !== 'object')
        return target;
    let proxy = proxyMap.get(target);
    if (proxy)
        return proxy;
    proxy = new Proxy(target, new ReadWriteProxyHandler(proxyMap, subs));
    proxyMap.set(target, proxy);
    return proxy;
}
const QOjectTargetSymbol = ':target:';
const QOjectSubsSymbol = ':subs:';
const QOjectTransientsSymbol = ':transients:';
function unwrapProxy(proxy) {
    if (proxy && typeof proxy == 'object') {
        const value = proxy[QOjectTargetSymbol];
        if (value)
            return value;
    }
    return proxy;
}
function wrap(value, proxyMap) {
    if (value && typeof value === 'object') {
        const nakedValue = unwrapProxy(value);
        if (nakedValue !== value) {
            // already a proxy return;
            return value;
        }
        verifySerializable(value);
        const proxy = proxyMap.get(value);
        return proxy ? proxy : readWriteProxy(value, proxyMap);
    }
    else {
        return value;
    }
}
class ReadWriteProxyHandler {
    constructor(proxy, subs = new Map()) {
        this.proxy = proxy;
        this.subs = subs;
        this.transients = null;
    }
    getSub(el) {
        let sub = this.subs.get(el);
        if (!sub) {
            this.subs.set(el, (sub = new Set()));
        }
        return sub;
    }
    get(target, prop) {
        if (prop === QOjectTargetSymbol)
            return target;
        if (prop === QOjectSubsSymbol)
            return this.subs;
        if (prop === QOjectTransientsSymbol) {
            return this.transients || (this.transients = new WeakMap());
        }
        const value = target[prop];
        const invokeCtx = tryGetInvokeContext();
        if (qDev && !invokeCtx) {
            logWarn(`State assigned outside invocation context. Getting prop`, prop, this);
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
        const unwrappedNewValue = unwrapProxy(newValue);
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
        return Object.prototype.hasOwnProperty.call(target, property);
    }
    ownKeys(target) {
        return Object.getOwnPropertyNames(target);
    }
}
function verifySerializable(value) {
    if (typeof value == 'object' && value !== null) {
        if (Array.isArray(value))
            return;
        if (Object.getPrototypeOf(value) !== Object.prototype) {
            throw qError(QError.TODO, 'Only primitive and object literals can be serialized.');
        }
    }
}

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
            return index === -1 ? undefined : index;
        },
        add(object) {
            const index = array.indexOf(object);
            if (index === -1) {
                array.push(object);
                if (!added) {
                    element.setAttribute(QObjAttr, '');
                    added = true;
                }
                return array.length - 1;
            }
            return index;
        },
    };
}

Error.stackTraceLimit = 9999;
// TODO(misko): For better debugger experience the getProps should never store Proxy, always naked objects to make it easier to traverse in the debugger.
const Q_IS_HYDRATED = '__isHydrated__';
const Q_CTX = '__ctx__';
function hydrateIfNeeded(doc) {
    const isHydrated = doc[Q_IS_HYDRATED];
    if (!isHydrated) {
        doc[Q_IS_HYDRATED] = true;
        QStore_hydrate(doc);
    }
}
function getContext(element) {
    let ctx = element[Q_CTX];
    if (!ctx) {
        const cache = new Map();
        element[Q_CTX] = ctx = {
            element,
            cache,
            refMap: newQObjectMap(element),
            dirty: false,
            props: undefined,
            events: undefined,
            component: undefined,
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

const ON_WATCH = 'on:qWatch';
function registerOnWatch(element, props, watchFnQrl) {
    props[ON_WATCH] = watchFnQrl;
    invokeWatchFn(element, watchFnQrl);
}
const cleanupFnMap = new Map();
async function invokeWatchFn(element, watchFnQrl) {
    const watchFn = await qrlImport(element, watchFnQrl);
    const previousCleanupFn = cleanupFnMap.get(watchFn);
    cleanupFnMap.delete(watchFn);
    if (isCleanupFn(previousCleanupFn)) {
        try {
            previousCleanupFn();
        }
        catch (e) {
            // TODO(misko): Centralize error handling
            logError(e);
        }
    }
    throw new Error('TO IMPLEMENT');
}
function isCleanupFn(value) {
    return typeof value === 'function';
}

const emitEvent = (el, eventName, detail, bubbles) => {
    if (typeof CustomEvent === 'function') {
        el.dispatchEvent(new CustomEvent(eventName, {
            detail,
            bubbles: bubbles,
            composed: bubbles,
        }));
    }
};

const ON_PROP_REGEX = /on(Document|Window)?:/;
const ON$_PROP_REGEX = /on(Document|Window)?\$:/;
function isOnProp(prop) {
    return ON_PROP_REGEX.test(prop);
}
function isOn$Prop(prop) {
    return ON$_PROP_REGEX.test(prop);
}
function isQrlFactory(value) {
    return typeof value === 'function' && value.__brand__ === 'QRLFactory';
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
            const qrl = await qrlOrPromise;
            const qrlGuard = context.qrlGuard;
            if (qrlGuard && !qrlGuard(qrl))
                return;
            if (!qrl.symbolRef) {
                qrl.symbolRef = await qrlImport(ctx.element, qrl);
            }
            context.qrl = qrl;
            emitEvent(ctx.element, 'qSymbol', { name: qrl.symbol }, true);
            if (qrlGuard) {
                return invokeWatchFn(ctx.element, qrl);
            }
            else {
                return useInvoke(context, qrl.symbolRef);
            }
        }));
    };
}
function qPropWriteQRL(rctx, ctx, prop, value) {
    if (!value) {
        return;
    }
    prop = prop.replace('$:', ':');
    if (typeof value == 'string') {
        value = parseQRL(value);
    }
    const existingQRLs = getExistingQRLs(ctx, prop);
    if (Array.isArray(value)) {
        value.forEach((value) => qPropWriteQRL(rctx, ctx, prop, value));
    }
    else if (isQrl(value)) {
        const capture = value.capture;
        if (capture == null) {
            // we need to serialize the lexical scope references
            const captureRef = value.captureRef;
            value.capture =
                captureRef && captureRef.length ? captureRef.map((ref) => qDeflate(ref, ctx)) : EMPTY_ARRAY;
        }
        // Important we modify the array as it is cached.
        for (let i = 0; i < existingQRLs.length; i++) {
            const qrl = existingQRLs[i];
            if (!isPromise(qrl) &&
                qrl.canonicalChunk === value.canonicalChunk &&
                qrl.symbol === value.symbol) {
                existingQRLs.splice(i, 1);
                i--;
            }
        }
        existingQRLs.push(value);
    }
    else if (isQrlFactory(value)) {
        if (existingQRLs.length === 0) {
            // if we don't have any than we use the `qrlFactory` to create a QRLInternal
            // (otherwise ignore the factory)
            qPropWriteQRL(rctx, ctx, prop, value(ctx.element));
        }
    }
    else if (isPromise(value)) {
        const writePromise = value.then((qrl) => {
            existingQRLs.splice(existingQRLs.indexOf(writePromise), 1);
            qPropWriteQRL(rctx, ctx, prop, qrl);
            return qrl;
        });
        existingQRLs.push(writePromise);
    }
    else {
        // TODO(misko): Test/better text
        throw qError(QError.TODO, `Not QRLInternal: prop: ${prop}; value: ` + value);
    }
    if (prop.startsWith('on:q')) {
        getEvents(ctx)[prop] = serializeQRLs(existingQRLs, ctx);
    }
    else {
        const kebabProp = fromCamelToKebabCase(prop);
        const newValue = serializeQRLs(existingQRLs, ctx);
        if (ctx.element.getAttribute(kebabProp) !== newValue) {
            if (rctx) {
                setAttribute(rctx, ctx.element, kebabProp, newValue);
            }
            else {
                ctx.element.setAttribute(kebabProp, newValue);
            }
        }
    }
}
function getExistingQRLs(ctx, prop) {
    let parts = ctx.cache.get(prop);
    if (!parts) {
        if (prop.startsWith('on:q')) {
            parts = [];
            const qrls = getEvents(ctx)[prop];
            if (qrls) {
                qrls.split('\n').forEach((qrl) => {
                    if (qrl) {
                        parts.push(parseQRL(qrl, ctx.element));
                    }
                });
                ctx.cache.set(prop, parts);
                return parts;
            }
        }
        const attrName = fromCamelToKebabCase(prop);
        parts = [];
        (ctx.element.getAttribute(attrName) || '').split('\n').forEach((qrl) => {
            if (qrl) {
                parts.push(parseQRL(qrl, ctx.element));
            }
        });
        ctx.cache.set(prop, parts);
    }
    return parts;
}
function serializeQRLs(existingQRLs, ctx) {
    const platform = getPlatform(getDocument(ctx.element));
    const element = ctx.element;
    return existingQRLs
        .map((qrl) => (isPromise(qrl) ? '' : stringifyQRL(qrl, element, platform)))
        .filter((v) => !!v)
        .join('\n');
}

// <docs markdown="https://hackmd.io/lQ8v7fyhR-WD3b-2aRUpyw#useHostElement">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2FlQ8v7fyhR-WD3b-2aRUpyw%3Fboth#useHostElement instead)
/**
 * Retrieves the Host Element of the current component.
 *
 * NOTE: `useHostElement` method can only be used in the synchronous portion of the callback
 * (before any `await` statements.)
 *
 * @public
 */
// </docs>
function useHostElement() {
    const element = getInvokeContext().hostElement;
    assertDefined(element);
    return element;
}

// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#onUnmount">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#onUnmount instead)
/**
 * A lazy-loadable reference to a component's destroy hook.
 *
 * Invoked when the component is destroyed (removed from render tree).
 *
 * @public
 */
// </docs>
function onUnmountFromQrl(unmountFn) {
    throw new Error('IMPLEMENT: onUnmount' + unmountFn);
}
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#onUnmount">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#onUnmount instead)
/**
 * A lazy-loadable reference to a component's destroy hook.
 *
 * Invoked when the component is destroyed (removed from render tree).
 *
 * @public
 */
// </docs>
const onUnmount$ = implicit$FirstArg(onUnmountFromQrl);
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#onResume">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#onResume instead)
/**
 * A lazy-loadable reference to a component's on resume hook.
 *
 * The hook is eagerly invoked when the application resumes on the client. Because it is called
 * eagerly, this allows the component to hydrate even if no user interaction has taken place.
 *
 * @public
 */
// </docs>
function onResumeFromQrl(resumeFn) {
    onWindow('load', resumeFn);
}
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#onResume">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#onResume instead)
/**
 * A lazy-loadable reference to a component's on resume hook.
 *
 * The hook is eagerly invoked when the application resumes on the client. Because it is called
 * eagerly, this allows the component to hydrate even if no user interaction has taken place.
 *
 * @public
 */
// </docs>
const onResume$ = implicit$FirstArg(onResumeFromQrl);
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#onHydrate">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#onHydrate instead)
/**
 * A lazy-loadable reference to a component's on hydrate hook.
 *
 * Invoked when the component's state is re-hydrated from serialization. This allows the
 * component to do any work to re-activate itself.
 *
 * @public
 */
// </docs>
function onHydrateFromQrl(hydrateFn) {
    throw new Error('IMPLEMENT: onHydrate' + hydrateFn);
}
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#onHydrate">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#onHydrate instead)
/**
 * A lazy-loadable reference to a component's on hydrate hook.
 *
 * Invoked when the component's state is re-hydrated from serialization. This allows the
 * component to do any work to re-activate itself.
 *
 * @public
 */
// </docs>
const onHydrate$ = implicit$FirstArg(onHydrateFromQrl);
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#onDehydrate">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#onDehydrate instead)
/**
 * A lazy-loadable reference to a component's on dehydrate hook.
 *
 * Invoked when the component's state is being serialized (dehydrated) into the DOM. This allows
 * the component to do last-minute clean-up before its state is serialized.
 *
 * Typically used with transient state.
 *
 * @public
 */
// </docs>
function onDehydrateFromQrl(dehydrateFn) {
    throw new Error('IMPLEMENT: onDehydrate' + dehydrateFn);
}
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#onDehydrate">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#onDehydrate instead)
/**
 * A lazy-loadable reference to a component's on dehydrate hook.
 *
 * Invoked when the component's state is being serialized (dehydrated) into the DOM. This allows
 * the component to do last-minute clean-up before its state is serialized.
 *
 * Typically used with transient state.
 *
 * @public
 */
// </docs>
const onDehydrate$ = implicit$FirstArg(onDehydrateFromQrl);
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#on">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#on instead)
/**
 * Register a listener on the current component's host element.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX.
 *
 * See: `on`, `onWindow`, `onDocument`.
 *
 * @public
 */
// </docs>
function on(event, eventFn) {
    const el = useHostElement();
    const ctx = getContext(el);
    qPropWriteQRL(undefined, ctx, `on:${event}`, eventFn);
}
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#onDocument">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#onDocument instead)
/**
 * Register a listener on `document`.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX.
 *
 * See: `on`, `onWindow`, `onDocument`.
 *
 * @public
 */
// </docs>
function onDocument(event, eventFn) {
    const el = useHostElement();
    const ctx = getContext(el);
    qPropWriteQRL(undefined, ctx, `on-document:${event}`, eventFn);
}
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#onWindow">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#onWindow instead)
/**
 * Register a listener on `window`.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX.
 *
 * See: `on`, `onWindow`, `onDocument`.
 *
 * @public
 */
// </docs>
function onWindow(event, eventFn) {
    const el = useHostElement();
    const ctx = getContext(el);
    qPropWriteQRL(undefined, ctx, 'on-w' + `indow:${event}`, eventFn);
}
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#useStyles">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#useStyles instead)
/**
 * Refer to component styles.
 *
 * @alpha
 */
// </docs>
function useStylesFromQrl(styles) {
    _useStyles(styles, false);
}
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#useStyles">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#useStyles instead)
/**
 * Refer to component styles.
 *
 * @alpha
 */
// </docs>
const useStyles$ = implicit$FirstArg(useStylesFromQrl);
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#useScopedStyles">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#useScopedStyles instead)
/**
 * @alpha
 */
// </docs>
function useScopedStylesFromQrl(styles) {
    _useStyles(styles, true);
}
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#useScopedStyles">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#useScopedStyles instead)
/**
 * @alpha
 */
// </docs>
const useScopedStyles$ = implicit$FirstArg(useScopedStylesFromQrl);
/**
 * @public
 */
function componentFromQrl(onMount, options = {}) {
    var _a;
    const tagName = (_a = options.tagName) !== null && _a !== void 0 ? _a : 'div';
    // Return a QComponent Factory function.
    return function QComponent(props, key) {
        const onRenderFactory = async (hostElement) => {
            // Turn function into QRL
            const onMountQrl = toQrlOrError(onMount);
            const onMountFn = await resolveQrl(hostElement, onMountQrl);
            const ctx = getContext(hostElement);
            const props = getProps(ctx);
            const invokeCtx = newInvokeContext(hostElement, hostElement);
            return useInvoke(invokeCtx, onMountFn, props);
        };
        onRenderFactory.__brand__ = 'QRLFactory';
        return jsx(tagName, Object.assign({ [OnRenderProp]: onRenderFactory }, props), key);
    };
}
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#component">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#component instead)
/**
 * Declare a Qwik component that can be used to create UI.
 *
 * Use `component` (and `component$`) to declare a Qwik component. A Qwik component is a special
 * kind of component that allows the Qwik framework to lazy load and execute the component
 * independently of other Qwik components as well as lazy load the component's life-cycle hooks
 * and event handlers.
 *
 * Side note: You can also declare regular (standard JSX) components that will have standard
 * synchronous behavior.
 *
 * Qwik component is a facade that describes how the component should be used without forcing the
 * implementation of the component to be eagerly loaded. A minimum Qwik definition consists of:
 *
 * - Component `onMount` method, which needs to return an
 * - `onRender` closure which constructs the component's JSX.
 *
 * ### Example:
 *
 * An example showing how to create a counter component:
 *
 * ```typescript
 * export const Counter = component$((props: { value?: number; step?: number }) => {
 *   const state = useStore({ count: props.value || 0 });
 *   return $(() => (
 *     <div>
 *       <span>{state.count}</span>
 *       <button on$:click={() => (state.count += props.step || 1)}>+</button>
 *     </div>
 *   ));
 * });
 * ```
 *
 * - `component$` is how a component gets declared.
 * - `{ value?: number; step?: number }` declares the public (props) interface of the component.
 * - `{ count: number }` declares the private (state) interface of the component.
 * - `onMount` closure: is used to create the data store (see: `useStore`);
 * - `$`: mark which parts of the component will be lazy-loaded. (see `$` for details.)
 *
 * The above can then be used like so:
 *
 * ```typescript
 * export const OtherComponent = component$(() => {
 *   return $(() => <Counter value={100} />);
 * });
 * ```
 *
 * See also: `component`, `onUnmount`, `onHydrate`, `onDehydrate`, `onHalt`, `onResume`, `on`,
 * `onDocument`, `onWindow`, `useStyles`, `useScopedStyles`
 *
 * @param onMount - Initialization closure used when the component is first created.
 * @param tagName - Optional components options. It can be used to set a custom tag-name to be
 * used for the component's host element.
 *
 * @public
 */
// </docs>
function component$(onMount, options) {
    return componentFromQrl($(onMount), options);
}
function resolveQrl(hostElement, onMountQrl) {
    return onMountQrl.symbolRef
        ? Promise.resolve(onMountQrl.symbolRef)
        : Promise.resolve(null).then(() => {
            return qrlImport(hostElement, onMountQrl);
        });
}
function _useStyles(styles, scoped) {
    const styleQrl = toQrlOrError(styles);
    const styleId = styleKey(styleQrl);
    const hostElement = useHostElement();
    if (scoped) {
        hostElement.setAttribute(ComponentScopedStyles, styleId);
    }
    useWaitOn(qrlImport(hostElement, styleQrl).then((styleText) => {
        const document = getDocument(hostElement);
        const head = document.querySelector('head');
        if (head && !head.querySelector(`style[q\\:style="${styleId}"]`)) {
            const style = document.createElement('style');
            style.setAttribute('q:style', styleId);
            style.textContent = scoped ? styleText.replace(/�/g, styleId) : styleText;
            head.appendChild(style);
        }
    }));
}

function _bubble(eventType, payload) {
    let node = useHostElement();
    payload = Object.assign({ type: eventType }, payload);
    const eventName = 'on:' + eventType;
    while (node) {
        const ctx = getContext(node);
        const listener = getEvent(ctx, eventName);
        const hostElement = node.closest(OnRenderSelector);
        listener && useInvoke(newInvokeContext(hostElement, node, payload), listener);
        node = node.parentElement;
    }
}

/**
 * @public
 */
function bubble(eventType, payload) {
    return _bubble(eventType, payload || {});
}

//TODO(misko): Add public DOCS.
//TODO(misko): Rename to dehydrate
/**
 * @public
 */
function dehydrate(document) {
    QStore_dehydrate(document);
}

function useProps() {
    const ctx = getInvokeContext();
    let props = ctx.props;
    if (!props) {
        props = ctx.props = getProps(getContext(useHostElement()));
    }
    return props;
}

// <docs markdown="https://hackmd.io/_Kl9br9tT8OB-1Dv8uR4Kg#onWatch">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2F_Kl9br9tT8OB-1Dv8uR4Kg%3Fboth#onWatch instead)
/**
 * Reruns the `watchFn` when the observed inputs change.
 *
 * Use `onWatch` to observe changes on a set of inputs, and then re-execute the `watchFn` when
 * those inputs change.
 *
 * The `watchFn` only executes if the observed inputs change. To observe the inputs use the `obs`
 * function to wrap property reads. This creates subscriptions which will trigger the `watchFn`
 * to re-run.
 *
 * See: `Observer`
 *
 * @public
 *
 * ## Example
 *
 * The `onWatch` function is used to observe the `state.count` property. Any changes to the
 * `state.count` cause the `watchFn` to execute which in turn updates the `state.doubleCount` to
 * the double of `state.count`.
 *
 * ```typescript
 * export const MyComp = component$(() => {
 *   const store = useStore({ count: 0, doubleCount: 0 });
 *   onWatch$((obs) => {
 *     store.doubleCount = 2 * obs(store).count;
 *   });
 *   return $(() => (
 *     <div>
 *       <span>
 *         {store.count} / {store.doubleCount}
 *       </span>
 *       <button on$:click={() => store.count++}>+</button>
 *     </div>
 *   ));
 * });
 * ```
 *
 *
 * @param watch - Function which should be re-executed when changes to the inputs are detected
 * @public
 */
// </docs>
function onWatchFromQrl(watchFn) {
    registerOnWatch(useHostElement(), useProps(), watchFn);
}
// <docs markdown="https://hackmd.io/_Kl9br9tT8OB-1Dv8uR4Kg#onWatch">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2F_Kl9br9tT8OB-1Dv8uR4Kg%3Fboth#onWatch instead)
/**
 * Reruns the `watchFn` when the observed inputs change.
 *
 * Use `onWatch` to observe changes on a set of inputs, and then re-execute the `watchFn` when
 * those inputs change.
 *
 * The `watchFn` only executes if the observed inputs change. To observe the inputs use the `obs`
 * function to wrap property reads. This creates subscriptions which will trigger the `watchFn`
 * to re-run.
 *
 * See: `Observer`
 *
 * @public
 *
 * ## Example
 *
 * The `onWatch` function is used to observe the `state.count` property. Any changes to the
 * `state.count` cause the `watchFn` to execute which in turn updates the `state.doubleCount` to
 * the double of `state.count`.
 *
 * ```typescript
 * export const MyComp = component$(() => {
 *   const store = useStore({ count: 0, doubleCount: 0 });
 *   onWatch$((obs) => {
 *     store.doubleCount = 2 * obs(store).count;
 *   });
 *   return $(() => (
 *     <div>
 *       <span>
 *         {store.count} / {store.doubleCount}
 *       </span>
 *       <button on$:click={() => store.count++}>+</button>
 *     </div>
 *   ));
 * });
 * ```
 *
 *
 * @param watch - Function which should be re-executed when changes to the inputs are detected
 * @public
 */
// </docs>
const onWatch$ = implicit$FirstArg(onWatchFromQrl);

/**
 * Use to render asynchronous (`Promise`) values.
 *
 * A `Promise` does not allow a synchronous examination of its state. For this reason
 * `<Async>` provides a mechanism to render pending, resolved and error state of a `Promise`.
 * `<Async>` provides that mechanism by registering a `then` method with the `Promise` and
 * providing callbacks hooks for `pending`, `resolved` and `rejected` state of the promise.
 *
 * Additionally, `<Async>` automatically re-renders the portion of the view when the status
 * of the `Promise` changes.
 *
 * `<Async>` provides three callbacks:
 * - `onPending`: invoked initially to provide a way for the template to provide output while
 *   waiting for the `promise` to resolve.
 * - `onResolved`: invoked when the `promise` is `resolved` allowing the template to generate
 *   output using the `resolved` value.
 * - `onError`: invoked when the `promise` is `rejected` allowing the template to generate
 *   error output describing the problem.
 *
 * The `<Async>` can be used in two ways, which are semantically equivalent and are provided
 * based on the developer needs/preferences.
 *
 * ### Using multiple callbacks
 *
 * ```typescript
 * <Async
 *   resolve={Promise.resolve('some value')}
 *   onPending={() => <span>loading...</span>}
 *   onResolved={(value) => <span>{value}</span>}
 *   onError={(rejection) => <pre>{rejection}</pre>}
 * />
 * ```
 *
 * ### Using single callbacks
 *
 * ```typescript
 * <Async resolve={Promise.resolve('some value')}>
 *   {(response) => {
 *     if (response.isPending) return <span>loading...</span>;
 *     if (response.isResolved) return <span>{response.value}</span>;
 *     if (response.isRejected) return <pre>{response.rejection}</pre>;
 *   }}
 * </Async>
 * ```
 *
 * @param onPending - invoked initially to provide a way for the template to provide output while
 *   waiting for the `promise` to resolve.
 * @param onResolved - invoked when the `promise` is `resolved` allowing the template to generate
 *   output using the `resolved` value.
 * @param onError - invoked when the `promise` is `rejected` allowing the template to generate
 *   error output describing the problem.
 * @param children -  a single callback function for `onPending`, `onResolved` and `onError`.
 *   (Use either `children` or `onPending`, `onResolved` and `onError`, but not both.)
 *   See "Using multiple callbacks" vs "Using single callbacks" above.
 *
 * @public
 */
function Async(props) {
    // TODO(misko): implement onPending/onResolved/onError
    if (!('children' in props)) {
        throw new Error('IMPLEMENT');
    }
    const children = [props.children].flat()[0];
    const renderFn = typeof children == 'function' ? children : null;
    const promiseValue = {
        isPending: true,
        isResolved: false,
        value: undefined,
        isRejected: false,
        rejection: undefined,
    };
    let pending;
    const jsxPromise = new Promise((resolve, reject) => {
        pending = renderFn && renderFn(promiseValue);
        Promise.resolve(props.resolve).then((value) => {
            promiseValue.isPending = false;
            promiseValue.isResolved = true;
            promiseValue.value = value;
            return resolve(renderFn && renderFn(promiseValue));
        }, (error) => {
            promiseValue.isPending = false;
            promiseValue.isRejected = true;
            promiseValue.rejection = error;
            return reject(renderFn && renderFn(promiseValue));
        });
    });
    jsxPromise.whilePending = pending;
    return jsxPromise;
}

/* eslint-disable */
/**
 * @public
 */
function h(type, props, ...children) {
    // Using legacy h() jsx transform and morphing it
    // so it can use the modern vdom structure
    // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
    // https://www.typescriptlang.org/tsconfig#jsxImportSource
    const normalizedProps = {
        children: arguments.length > 2 ? flattenArray(children) : EMPTY_ARRAY,
    };
    let key;
    let i;
    for (i in props) {
        if (i == 'key')
            key = props[i];
        else
            normalizedProps[i] = props[i];
    }
    return new JSXNodeImpl(type, normalizedProps, key);
}

/**
 * @public
 */
const Slot = (props) => {
    const hasChildren = props.children || (Array.isArray(props.children) && props.children.length > 0);
    const newChildrem = !hasChildren
        ? []
        : jsx('q:fallback', {
            children: props.children,
        });
    return jsx('q:slot', {
        name: props.name,
        children: newChildrem,
    }, props.name);
};

/**
 * Render JSX.
 *
 * Use this method to render JSX. This function does reconciling which means
 * it always tries to reuse what is already in the DOM (rather then destroy and
 * recrate content.)
 *
 * @param parent - Element which will act as a parent to `jsxNode`. When
 *     possible the rendering will try to reuse existing nodes.
 * @param jsxNode - JSX to render
 * @public
 */
function render(parent, jsxNode) {
    // If input is not JSX, convert it
    if (!isJSXNode(jsxNode)) {
        jsxNode = jsx(jsxNode, null);
    }
    const doc = isDocument(parent) ? parent : getDocument(parent);
    const stylesParent = isDocument(parent) ? parent.head : parent.parentElement;
    hydrateIfNeeded(doc);
    const ctx = {
        doc,
        globalState: getRenderingState(doc),
        hostElements: new Set(),
        operations: [],
        roots: [parent],
        component: undefined,
        perf: {
            visited: 0,
            timing: [],
        },
    };
    return then(visitJsxNode(ctx, parent, processNode(jsxNode), false), () => {
        executeContext(ctx);
        if (stylesParent) {
            injectQwikSlotCSS(stylesParent);
        }
        injectQVersion(parent);
        if (qDev) {
            if (typeof window !== 'undefined' && window.document != null) {
                printRenderStats(ctx);
            }
        }
        return ctx;
    });
}
function injectQwikSlotCSS(parent) {
    const style = parent.ownerDocument.createElement('style');
    style.setAttribute('id', 'qwik/base-styles');
    style.textContent = `q\\:slot{display:contents}q\\:fallback{display:none}q\\:fallback:last-child{display:contents}`;
    parent.insertBefore(style, parent.firstChild);
}
function injectQVersion(parent) {
    const element = isDocument(parent) ? parent.documentElement : parent;
    element.setAttribute('q:version', version || '');
}

/**
 * @public
 */
function useDocument() {
    return getDocument(useHostElement());
}

// <docs markdown="https://hackmd.io/lQ8v7fyhR-WD3b-2aRUpyw#useEvent">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2FlQ8v7fyhR-WD3b-2aRUpyw%3Fboth#useEvent instead)
/**
 * Retrieves the current event which triggered the action.
 *
 * NOTE: The `useEvent` method can only be used in the synchronous portion of the callback
 * (before any `await` statements.)
 *
 * @public
 */
// </docs>
function useEvent(expectEventType) {
    const event = getInvokeContext().event;
    expectEventType && assertEqual(event.type, expectEventType);
    return event;
}

function useURL() {
    const url = getInvokeContext().url;
    if (!url) {
        // TODO(misko): centralize
        throw new Error('Q-ERROR: no URL is associated with the execution context');
    }
    return url;
}

// <docs markdown="https://hackmd.io/lQ8v7fyhR-WD3b-2aRUpyw#useLexicalScope">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2FlQ8v7fyhR-WD3b-2aRUpyw%3Fboth#useLexicalScope instead)
/**
 * Used by the Qwik Optimizer to restore the lexical scoped variables.
 *
 * This method should not be present in the application source code.
 *
 * NOTE: `useLexicalScope` method can only be used in the synchronous portion of the callback
 * (before any `await` statements.)
 *
 * @public
 */
// </docs>
function useLexicalScope() {
    var _a;
    const context = getInvokeContext();
    const qrl = (_a = context.qrl) !== null && _a !== void 0 ? _a : parseQRL(decodeURIComponent(String(useURL())));
    if (qrl.captureRef == null) {
        const el = context.element;
        hydrateIfNeeded(getDocument(el));
        const ctx = getContext(el);
        assertDefined(qrl.capture);
        qrl.captureRef = qrl.capture.map((idx) => qInflate(idx, ctx));
    }
    return qrl.captureRef;
}

// <docs markdown="https://hackmd.io/lQ8v7fyhR-WD3b-2aRUpyw#useStore">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2FlQ8v7fyhR-WD3b-2aRUpyw%3Fboth#useStore instead)
/**
 * Creates a object that Qwik can track across serializations.
 *
 * Use `useStore` to create state for your application. The return object is a proxy which has a
 * unique ID. The ID of the object is used in the `QRL`s to refer to the store.
 *
 * ## Example
 *
 * Example showing how `useStore` is used in Counter example to keep track of count.
 *
 * ```typescript
 * export const Counter = component$(() => {
 *   const store = useStore({ count: 0 });
 *   return $(() => <button on$:click={() => store.count++}>{store.count}</button>);
 * });
 * ```
 *
 * @public
 */
// </docs>
function useStore(initialState) {
    return qObject(initialState, getProxyMap(useDocument()));
}

// <docs markdown="https://hackmd.io/lQ8v7fyhR-WD3b-2aRUpyw#useTransient">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2FlQ8v7fyhR-WD3b-2aRUpyw%3Fboth#useTransient instead)
/**
 * @public
 */
// </docs>
function useTransient(obj, factory, ...args) {
    const existing = getTransient(obj, factory);
    return existing || setTransient(obj, factory, factory.apply(obj, args));
}

/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * @alpha
 */
const version = "0.0.18-2-dev20220316234933";

exports.$ = $;
exports.Async = Async;
exports.Fragment = Fragment;
exports.Host = Host;
exports.SkipRerender = SkipRerender;
exports.Slot = Slot;
exports.bubble = bubble;
exports.component$ = component$;
exports.componentFromQrl = componentFromQrl;
exports.dehydrate = dehydrate;
exports.getPlatform = getPlatform;
exports.h = h;
exports.implicit$FirstArg = implicit$FirstArg;
exports.jsx = jsx;
exports.jsxDEV = jsx;
exports.jsxs = jsx;
exports.notifyRender = notifyRender;
exports.on = on;
exports.onDehydrate$ = onDehydrate$;
exports.onDehydrateFromQrl = onDehydrateFromQrl;
exports.onDocument = onDocument;
exports.onHydrate$ = onHydrate$;
exports.onHydrateFromQrl = onHydrateFromQrl;
exports.onResume$ = onResume$;
exports.onResumeFromQrl = onResumeFromQrl;
exports.onUnmount$ = onUnmount$;
exports.onUnmountFromQrl = onUnmountFromQrl;
exports.onWatch$ = onWatch$;
exports.onWatchFromQrl = onWatchFromQrl;
exports.onWindow = onWindow;
exports.qrl = qrl;
exports.qrlImport = qrlImport;
exports.render = render;
exports.setPlatform = setPlatform;
exports.useDocument = useDocument;
exports.useEvent = useEvent;
exports.useHostElement = useHostElement;
exports.useLexicalScope = useLexicalScope;
exports.useScopedStyles$ = useScopedStyles$;
exports.useScopedStylesFromQrl = useScopedStylesFromQrl;
exports.useStore = useStore;
exports.useStyles$ = useStyles$;
exports.useStylesFromQrl = useStylesFromQrl;
exports.useTransient = useTransient;
exports.version = version;
//# sourceMappingURL=core.cjs.map
