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
    debugger; // eslint-disable-line no-debugger
    const error = new Error(text);
    console.error(error); // eslint-disable-line no-console
    return error;
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
        console.error(`Q-ERROR: '${qrl}' is runtime but no instance found on element.`);
    }
    return new QRLInternal(chunk, symbol, null, null, capture, null, guard);
}
function JSONparse(json) {
    try {
        return JSON.parse(json);
    }
    catch (e) {
        console.error('JSON:', json);
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
 * Tag name used for projection.
 */
const QSlot = 'Q:SLOT';
const QSlotSelector = 'Q\\:SLOT';
/**
 * `<some-element q:slot="...">`
 */
const QSlotAttr = 'q:slot';
const QObjAttr = 'q:obj';
const QObjSelector = '[q\\:obj]';
/**
 * `<q:slot name="...">`
 */
const QSlotName = 'name';
const ELEMENT_ID = 'q:id';
const ELEMENT_ID_SELECTOR = '[q\\:id]';
const ELEMENT_ID_PREFIX = '#';

/**
 * Returns true if the `node` is `Element` and of the right `tagName`.
 *
 * @param node
 * @private
 */
function isDomElementWithTagName(node, tagName) {
    return isHtmlElement(node) && node.tagName.toUpperCase() == tagName.toUpperCase();
}
/**
 * @private
 */
function isTemplateElement(node) {
    return isDomElementWithTagName(node, 'template');
}
/**
 * @private
 */
function isQSLotTemplateElement(node) {
    return isTemplateElement(node) && node.hasAttribute(QSlotAttr);
}
/**
 * @private
 */
function isComponentElement(node) {
    return isHtmlElement(node) && node.hasAttribute(QHostAttr);
}
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
function isNode(value) {
    return value && typeof value.nodeType == 'number';
}
function isDocument(value) {
    return value && value.nodeType == NodeType.DOCUMENT_NODE;
}
function isElement(value) {
    return isNode(value) && value.nodeType == NodeType.ELEMENT_NODE;
}
function isComment(value) {
    return isNode(value) && value.nodeType == NodeType.COMMENT_NODE;
}

const createPlatform = (doc) => {
    let queuePromise;
    let storePromise;
    const moduleCache = new Map();
    return {
        importSymbol(element, url, symbolName) {
            const urlDoc = toUrl(element.ownerDocument, element, url).toString();
            const urlCopy = new URL(urlDoc);
            urlCopy.hash = '';
            urlCopy.search = '';
            const importURL = urlCopy.href;
            const mod = moduleCache.get(importURL);
            if (mod) {
                return mod[symbolName];
            }
            return import(/* @vite-ignore */ importURL).then((mod) => {
                moduleCache.set(importURL, mod);
                return mod[symbolName];
            });
        },
        queueRender: (renderMarked) => {
            if (!queuePromise) {
                queuePromise = new Promise((resolve, reject) => doc.defaultView.requestAnimationFrame(() => {
                    queuePromise = null;
                    renderMarked(doc).then(resolve, reject);
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
    const doc = (isDocument(docOrNode) ? docOrNode : docOrNode.ownerDocument);
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
    const doc = element.ownerDocument;
    if (qrl_.symbolFn) {
        return (qrl_.symbolRef = qrl_.symbolFn().then((module) => module[qrl_.symbol]));
    }
    else {
        return (qrl_.symbolRef = await getPlatform(doc).importSymbol(element, qrl_.chunk, qrl_.symbol));
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
 *   const store = createStore({});
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
 * @public
 */
function jsx(type, props, key) {
    return new JSXNodeImpl(type, props, key);
}
class JSXNodeImpl {
    constructor(type, props, key) {
        this.type = type;
        this.props = props;
        this.key = key;
        if (props) {
            if (props.children !== undefined) {
                if (Array.isArray(props.children)) {
                    this.children = props.children;
                }
                else {
                    this.children = [props.children];
                }
            }
            else {
                this.children = EMPTY_ARRAY;
            }
        }
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
const Fragment = {};

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
            const hostElement = element.closest(OnRenderSelector);
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

/**
 * Remove item from array (Same as `Array.splice()` but faster.)
 *
 * `Array.splice()` is not as fast because it has to allocate an array for the elements which were
 * removed. This causes memory pressure and slows down code when most of the time we don't
 * care about the deleted items array.
 *
 * https://jsperf.com/fast-array-splice (About 20x faster)
 *
 * @param array Array to splice
 * @param index Index of element in array to remove.
 * @param count Number of items to remove.
 */
/**
 * Same as `Array.splice2(index, 0, value1, value2)` but faster.
 *
 * `Array.splice()` is not fast because it has to allocate an array for the elements which were
 * removed. This causes memory pressure and slows down code when most of the time we don't
 * care about the deleted items array.
 *
 * @param array Array to splice.
 * @param index Index in array where the `value` should be added.
 * @param value1 Value to add to array.
 * @param value2 Value to add to array.
 */
function arrayInsert2(array, index, value1, value2) {
    let end = array.length;
    if (end == index) {
        // inserting at the end.
        array.push(value1, value2);
    }
    else if (end === 1) {
        // corner case when we have less items in array than we have items to insert.
        array.push(value2, array[0]);
        array[0] = value1;
    }
    else {
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
        // if we found it retrieve it.
        return keyValueArray[index | 1];
    }
    if (notFoundFactory) {
        const value = notFoundFactory();
        arrayInsert2(keyValueArray, ~index, key, value);
        return value;
    }
    return undefined;
}
/**
 * Retrieve a `key` index value in the array or `-1` if not found.
 *
 * @param keyValueArray to search.
 * @param key The key to locate.
 * @returns index of where the key is (or should have been.)
 *   - positive (even) index if key found.
 *   - negative index if key not found. (`~index` (even) to get the index where it should have
 *     been inserted.)
 */
function keyValueArrayIndexOf(keyValueArray, key) {
    return _arrayIndexOfSorted(keyValueArray, key, 1);
}
/**
 * INTERNAL: Get an index of an `value` in a sorted `array` by grouping search by `shift`.
 *
 * NOTE:
 * - This uses binary search algorithm for fast removals.
 *
 * @param array A sorted array to binary search.
 * @param value The value to look for.
 * @param shift grouping shift.
 *   - `0` means look at every location
 *   - `1` means only look at every other (even) location (the odd locations are to be ignored as
 *         they are values.)
 * @returns index of the value.
 *   - positive index if value found.
 *   - negative index if value not found. (`~index` to get the value where it should have been
 * inserted)
 */
function _arrayIndexOfSorted(array, value, shift) {
    let start = 0;
    let end = array.length >> shift;
    while (end !== start) {
        const middle = start + ((end - start) >> 1); // find the middle.
        const current = array[middle << shift];
        if (value === current) {
            return middle << shift;
        }
        else if (current > value) {
            end = middle;
        }
        else {
            start = middle + 1; // We already searched middle so make it non-inclusive by adding 1
        }
    }
    return ~(end << shift);
}

var NamedSlotEnum;
(function (NamedSlotEnum) {
    NamedSlotEnum[NamedSlotEnum["index"] = 0] = "index";
    NamedSlotEnum[NamedSlotEnum["parent"] = 1] = "parent";
    NamedSlotEnum[NamedSlotEnum["firstNode"] = 2] = "firstNode";
})(NamedSlotEnum || (NamedSlotEnum = {}));
function isSlotMap(value) {
    return Array.isArray(value);
}
/**
 * Retrieves the current `SlotMap` from `QComponent`
 *
 *
 * This method collects the content `Node`s for a given component.
 *
 * @param component
 * @returns
 */
function getSlotMap(component) {
    const slots = [];
    const host = component.hostElement;
    const firstChild = host.firstElementChild;
    if (isQSlotTemplate(firstChild)) {
        slotMapAddChildren(slots, firstChild.content, null);
    }
    const previousSlots = [];
    host.querySelectorAll(QSlotSelector).forEach((qSlot) => {
        for (const parent of previousSlots) {
            if (parent.contains(qSlot)) {
                // When we do `querySelectorAll` it is possible that we get `<q:slot>`
                // which are children of existing `<q:slot>`. This check is here
                // to make sure that we don't get `<q:lsot>` recursively.
                // <component>
                //   <q:slot include-me>
                //     <q:slot dont-include-me></q:slot>
                //   </q:slot>
                // </component>
                return;
            }
        }
        previousSlots.push(qSlot);
        const name = qSlot.getAttribute('name') || '';
        slotMapAddChildren(slots, qSlot, name);
    });
    return slots;
}
/**
 * Determines if the `node` is `<template q:slot>` used for storing un-projected items.
 */
function isQSlotTemplate(node) {
    return isDomElementWithTagName(node, 'template') && node.hasAttribute(QSlotAttr);
}
/**
 * Add projected nodes into `SlotMap`.
 *
 * See `SlotMap` for the layout.
 *
 * @param slots
 * @param parent Parent whoes children should be added to the `slots`.
 */
function slotMapAddChildren(slots, parent, name) {
    _slotParent = parent;
    let child = parent.firstChild;
    if (name !== null) {
        keyValueArrayGet(slots, name, emptyArrayFactory);
    }
    while (child) {
        const slotName = name !== null ? name : (isHtmlElement(child) && child.getAttribute(QSlotAttr)) || '';
        keyValueArrayGet(slots, slotName, emptyArrayFactory).push(child);
        child = child.nextSibling;
    }
    _slotParent = undefined;
}
let _slotParent;
function emptyArrayFactory() {
    return [-1, _slotParent];
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
/**
 * Converts a tree of Promises into a flat array of resolved promise values.
 *
 * @param tree - array of arrays of values or promises of values.
 * @returns a `Promise` of array of values.
 */
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
const then = (promise, thenFn) => {
    return isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
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

function createWatchFnObserver(doc) {
    const subscriptions = new Map();
    function wrap(obj) {
        const id = `${doc}`;
        if (!id) {
            throw new Error('Q-ERROR: only object stores can be observed.');
        }
        const obs = subscriptions.get(obj);
        if (obs) {
            return obs.value;
        }
        const proxy = new SubscribeProxy(obj, subscriptions, wrap);
        const value = new Proxy(obj, proxy);
        subscriptions.set(obj, { value, proxy });
        return value;
    }
    wrap.getGuard = function () {
        const map = new Map();
        subscriptions.forEach(() => {
            return '';
        });
        return map;
    };
    return wrap;
}
class SubscribeProxy {
    constructor(obj, subscriptions, wrap) {
        this.obj = obj;
        this.subscriptions = subscriptions;
        this.wrap = wrap;
        this.properties = null;
    }
    get(target, prop) {
        let value = target[prop];
        const props = this.properties || (this.properties = new Set());
        props.add(prop);
        if (typeof value == 'object' && value != null) {
            value = this.wrap(value);
        }
        return value;
    }
    set(_, prop, newValue) {
        throw new Error('Writing to observables is not allowed! Property: ' + prop + ' ' + newValue);
        // return true;
    }
    has(target, property) {
        return Object.prototype.hasOwnProperty.call(target, property);
    }
    ownKeys(target) {
        return Object.getOwnPropertyNames(target);
    }
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
            console.error(e);
        }
    }
    const obs = createWatchFnObserver(element.ownerDocument);
    try {
        const nextCleanupFn = watchFn(obs);
        if (isCleanupFn(nextCleanupFn)) {
            cleanupFnMap.set(watchFn, nextCleanupFn);
        }
    }
    catch (e) {
        // TODO(misko): Centralize error handling
        console.error(e);
    }
    finally {
        // const guardRef = (watchFnQrl.guardRef = new Map());
        watchFnQrl.guard = obs.getGuard();
        const ctx = getContext(element);
        setEvent(ctx, ON_WATCH, watchFnQrl);
    }
}
function isCleanupFn(value) {
    return typeof value === 'function';
}

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
            if (qrlGuard) {
                return invokeWatchFn(ctx.element, qrl);
            }
            else {
                return useInvoke(context, qrl.symbolRef);
            }
        }));
    };
}
function qPropWriteQRL(ctx, prop, value) {
    if (!value) {
        return;
    }
    prop = prop.replace('$:', ':');
    if (typeof value == 'string') {
        value = parseQRL(value);
    }
    const existingQRLs = getExistingQRLs(ctx, prop);
    if (Array.isArray(value)) {
        value.forEach((value) => qPropWriteQRL(ctx, prop, value));
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
            qPropWriteQRL(ctx, prop, value(ctx.element));
        }
    }
    else if (isPromise(value)) {
        const writePromise = value.then((qrl) => {
            existingQRLs.splice(existingQRLs.indexOf(writePromise), 1);
            qPropWriteQRL(ctx, prop, qrl);
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
        ctx.element.setAttribute(kebabProp, serializeQRLs(existingQRLs, ctx));
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
    const platform = getPlatform(ctx.element.ownerDocument);
    const element = ctx.element;
    return existingQRLs
        .map((qrl) => (isPromise(qrl) ? '' : stringifyQRL(qrl, element, platform)))
        .filter((v) => !!v)
        .join('\n');
}

const SVG_NS = 'http://www.w3.org/2000/svg';
/**
 * Create a cursor which reconciles logical children.
 *
 * Here logical means children as defined by JSX. (This will be same as DOM except
 * in the case of projection.) In case of projection the cursor will correctly
 * deal with the logical children of the View (rather then rendered children.)
 *
 * See: `cursorForComponent`
 *
 * @param parent Parent `Element` whose children should be reconciled.
 */
function cursorForParent(parent) {
    let firstChild = parent.firstChild;
    if (firstChild && firstChild.nodeType === NodeType.DOCUMENT_TYPE_NODE) {
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
/**
 * Reconcile view children of a component.
 *
 * Use this method to create a cursor when reconciling a component's view.
 *
 * The main point of this method is to skip the `<template q:slot/>` Node.
 *
 * @param componentHost Component host element for which view children should be
 *     reconciled.
 * @returns
 */
function cursorForComponent(componentHost) {
    assertEqual(isComponentElement(componentHost), true);
    let firstNonTemplate = componentHost.firstChild;
    if (isQSLotTemplateElement(firstNonTemplate)) {
        firstNonTemplate = firstNonTemplate.nextSibling;
    }
    return newCursor(componentHost, firstNonTemplate, null);
}
/**
 * Ensure that node at cursor is an `Element` with given attributes.
 *
 * Reconciles the current cursor location with `expectTag`/`expectProps`.
 * This method will either leave the element alone if it matches, updates the
 * props, or completely removes and replaces the node with correct element.
 *
 * After invocation of this method, the cursor is advanced to the next sibling.
 *
 * @param cursor
 * @param component `ComponentRenderContext` of the component to whom the view childer
 *        logically belong.
 * @param expectTag
 * @param expectProps
 * @param componentRenderQueue Set if the current element is a component.
 *    This means that the reconciliation should detect input changes and if
 *    present add the component to the `componentRenderQueue` for further processing.
 * @returns Child `Cursor` to reconcile the children of this `Element`.
 */
function cursorReconcileElement(cursor, component, expectTag, expectProps, componentRenderQueue, isSvg) {
    let node = getNode(cursor);
    assertNotEqual(node, undefined, 'Cursor already closed');
    if (isSlotMap(node)) {
        assertDefined(cursor.parent);
        return slotMapReconcileSlots(cursor.parent, node, cursor.end, component, expectTag, expectProps, componentRenderQueue, isSvg);
    }
    else {
        assertNotEqual(node, undefined, 'Cursor already closed');
        node = _reconcileElement(cursor.parent, node, cursor.end, component, expectTag, expectProps, componentRenderQueue, isSvg);
        assertDefined(node);
        setNode(cursor, node.nextSibling);
        return _reconcileElementChildCursor(node, !!componentRenderQueue);
    }
}
function slotMapReconcileSlots(parent, slots, end, component, expectTag, expectProps, componentRenderQueue, isSvg) {
    const slotName = expectProps[QSlotAttr] || '';
    const namedSlot = keyValueArrayGet(slots, slotName);
    let childNode;
    if (namedSlot) {
        assertGreaterOrEqual(namedSlot.length, 2);
        const parent = namedSlot[NamedSlotEnum.parent];
        let index = namedSlot[NamedSlotEnum.index];
        if (index == -1) {
            index = 2;
        }
        childNode = (namedSlot.length > index ? namedSlot[index] : null);
        const node = _reconcileElement(parent, childNode, end, component, expectTag, expectProps, componentRenderQueue, isSvg);
        if (childNode !== node) {
            namedSlot[index] = node;
            childNode = node;
        }
        namedSlot[NamedSlotEnum.index] = index + 1;
    }
    else {
        const template = getUnSlottedStorage(parent);
        childNode = _reconcileElement(template.content, null, end, component, expectTag, expectProps, true, isSvg);
        assertDefined(childNode);
    }
    return _reconcileElementChildCursor(childNode, !!componentRenderQueue);
}
function _reconcileElement(parent, existing, end, component, expectTag, expectProps, componentRenderQueue, isSvg) {
    let shouldDescendIntoComponent;
    let reconciledElement;
    if (isDomElementWithTagName(existing, expectTag)) {
        updateProperties(existing, expectProps, isSvg);
        shouldDescendIntoComponent = !!componentRenderQueue;
        reconciledElement = existing;
    }
    else {
        // Expected node and actual node did not match. Need to switch.
        const doc = isDocument(parent) ? parent : parent.ownerDocument;
        reconciledElement = replaceNode(parent, existing, isSvg ? doc.createElementNS(SVG_NS, expectTag) : doc.createElement(expectTag), end);
        if (componentRenderQueue) {
            reconciledElement.setAttribute(QHostAttr, '');
        }
        shouldDescendIntoComponent = !!componentRenderQueue;
        updateProperties(reconciledElement, expectProps, isSvg);
    }
    component && component.styleClass && reconciledElement.classList.add(component.styleClass);
    if (shouldDescendIntoComponent) {
        const hostComponent = getQComponent(reconciledElement);
        hostComponent.styleHostClass && reconciledElement.classList.add(hostComponent.styleHostClass);
        if (Array.isArray(componentRenderQueue)) {
            componentRenderQueue.push(hostComponent.render());
        }
        else if (reconciledElement.hasAttribute(QHostAttr)) {
            const set = getScheduled(reconciledElement.ownerDocument);
            set.add(reconciledElement);
        }
    }
    return reconciledElement;
}
const noop = () => {
    return true;
};
const handleStyle = (elm, _, newValue, oldValue) => {
    if (typeof newValue == 'string') {
        elm.style.cssText = newValue;
    }
    else {
        for (const prop in oldValue) {
            if (!newValue || newValue[prop] == null) {
                if (prop.includes('-')) {
                    elm.style.removeProperty(prop);
                }
                else {
                    elm.style[prop] = '';
                }
            }
        }
        for (const prop in newValue) {
            if (!oldValue || newValue[prop] !== oldValue[prop]) {
                if (prop.includes('-')) {
                    elm.style.setProperty(prop, newValue[prop]);
                }
                else {
                    elm.style[prop] = newValue[prop];
                }
            }
        }
    }
    return true;
};
const PROP_HANDLER_MAP = {
    class: noop,
    style: handleStyle,
};
const ALLOWS_PROPS = ['className', 'class', 'style', 'id', 'title'];
function updateProperties(node, expectProps, isSvg) {
    const ctx = getContext(node);
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
    for (const key of Object.keys(expectProps)) {
        if (key === 'children') {
            continue;
        }
        const newValue = expectProps[key];
        if (isOnProp(key)) {
            setEvent(ctx, key, newValue);
            continue;
        }
        if (isOn$Prop(key)) {
            setEvent(ctx, key.replace('$', ''), $(newValue));
            continue;
        }
        // Early exit if value didnt change
        const oldValue = ctx.cache.get(key);
        if (newValue === oldValue) {
            continue;
        }
        ctx.cache.set(key, newValue);
        const skipQwik = ALLOWS_PROPS.includes(key) || key.startsWith('h:');
        if (qwikProps && !skipQwik) {
            // Qwik props
            qwikProps[key] = newValue;
        }
        else {
            // Check of data- or aria-
            if (key.startsWith('data-') || key.endsWith('aria-') || isSvg) {
                renderAttribute(node, key, newValue);
                continue;
            }
            // Check if its an exception
            const exception = PROP_HANDLER_MAP[key];
            if (exception) {
                if (exception(node, key, newValue, oldValue)) {
                    continue;
                }
            }
            // Check if property in prototype
            if (key in node) {
                try {
                    node[key] = newValue;
                }
                catch (e) {
                    console.error(e);
                }
                continue;
            }
            // Fallback to render attribute
            renderAttribute(node, key, newValue);
        }
    }
    return false;
}
function renderAttribute(node, key, newValue) {
    if (newValue == null) {
        node.removeAttribute(key);
    }
    else {
        node.setAttribute(key, String(newValue));
    }
}
function _reconcileElementChildCursor(node, isComponent) {
    assertDefined(node);
    if (isComponent) {
        // We are a component. We need to return Slots
        return newCursor(node, getSlotMap(getQComponent(node)), null);
    }
    else {
        // Not a component, normal return.
        return cursorForParent(node);
    }
}
/**
 * Ensure that node at cursor is a `Text`.
 *
 * Reconciles the current cursor location with expected text.
 * This method will either leave the text alone if it matches, updates the
 * text, or completely removes and replaces the node with correct text.
 *
 * After invocation of this method, the cursor is advanced to the next sibling.
 *
 * @param cursor
 * @param expectText
 */
function cursorReconcileText(cursor, expectText) {
    let node = getNode(cursor);
    assertNotEqual(node, undefined, 'Cursor already closed');
    assertDefined(cursor.parent);
    if (isSlotMap(node)) {
        let parent;
        let childNode;
        const namedSlot = keyValueArrayGet(node, '');
        if (namedSlot) {
            assertGreaterOrEqual(namedSlot.length, 2);
            parent = namedSlot[NamedSlotEnum.parent];
            let index = namedSlot[NamedSlotEnum.index];
            if (index == -1) {
                index = 2;
            }
            childNode = (namedSlot.length > index ? namedSlot[index] : null);
            node = _reconcileText(parent, childNode, cursor.end, expectText);
            if (childNode !== node) {
                namedSlot[index] = node;
            }
            namedSlot[NamedSlotEnum.index] = index + 1;
        }
        else {
            const template = getUnSlottedStorage(cursor.parent);
            _reconcileText(template.content, null, cursor.end, expectText);
        }
    }
    else {
        node = _reconcileText(cursor.parent, node, cursor.end, expectText);
        setNode(cursor, node.nextSibling);
    }
}
function _reconcileText(parent, node, beforeNode, expectText) {
    // Reconcile as Text Node
    if (node && node.nodeType == NodeType.TEXT_NODE) {
        if (node.textContent !== expectText) {
            node.textContent = expectText;
        }
    }
    else {
        // Expected node and actual node did not match. Need to switch.
        node = replaceNode(parent, node, parent.ownerDocument.createTextNode(expectText), beforeNode);
    }
    return node;
}
/**
 * Close out the cursor and clear any extra elements.
 *
 * Invocation of this method indicates that no mare Nodes after the cursor are expected.
 * This is a signal to remove any excess `Node`s if present.
 *
 * @param cursor
 */
function cursorReconcileEnd(cursor) {
    let node = getNode(cursor);
    if (isSlotMap(node)) {
        for (let i = 0; i < node.length; i = i + 2) {
            const namedSlot = node[i + 1];
            if (namedSlot[NamedSlotEnum.index] !== -1) {
                assertGreater(namedSlot[NamedSlotEnum.index], NamedSlotEnum.parent);
                for (let k = namedSlot[NamedSlotEnum.index]; k < namedSlot.length; k++) {
                    namedSlot[NamedSlotEnum.parent].removeChild(namedSlot[k]);
                }
            }
        }
    }
    else {
        while (node) {
            const next = node.nextSibling;
            cursor.parent.removeChild(node);
            node = next;
        }
    }
    setNode(cursor, undefined);
}
function getUnSlottedStorage(componentElement) {
    assertEqual(isComponentElement(componentElement), true, 'Must be component element');
    let template = componentElement === null || componentElement === void 0 ? void 0 : componentElement.firstElementChild;
    if (!isDomElementWithTagName(template, 'template') || !template.hasAttribute(QSlotAttr)) {
        template = componentElement.insertBefore(componentElement.ownerDocument.createElement('template'), template);
        template.setAttribute(QSlotAttr, '');
    }
    return template;
}
const V_NODE_START = '<node:';
const V_NODE_END = '</node:';
function cursorReconcileVirtualNode(cursor) {
    var _a;
    let node = getNode(cursor);
    if (isSlotMap(node)) {
        // TODO(misko): proper error and test;
        throw new Error('Not expecting slot map here');
    }
    else {
        if (isComment(node) && ((_a = node.textContent) === null || _a === void 0 ? void 0 : _a.startsWith(V_NODE_START))) {
            throw new Error('IMPLEMENT');
        }
        else {
            const id = Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
            const parent = cursor.parent;
            const doc = parent.ownerDocument;
            const startVNode = doc.createComment(V_NODE_START + id + '>');
            const endVNode = doc.createComment(V_NODE_END + id + '>');
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
const Slot = {
    __brand__: 'slot',
};

function visitJsxNode(component, renderQueue, cursor, jsxNode, isSvg) {
    if (isJSXNode(jsxNode)) {
        const nodeType = jsxNode.type;
        if (nodeType == null)
            return;
        if (typeof nodeType === 'string') {
            visitJsxLiteralNode(component, renderQueue, cursor, jsxNode, isSvg);
        }
        else if (nodeType === Fragment || nodeType == null) {
            const jsxChildren = jsxNode.children || EMPTY_ARRAY;
            for (const jsxChild of jsxChildren) {
                visitJsxNode(component, renderQueue, cursor, jsxChild, isSvg);
            }
        }
        else if (jsxNode.type === Host) {
            updateProperties(cursor.parent, jsxNode.props, isSvg);
            const jsxChildren = jsxNode.children || EMPTY_ARRAY;
            for (const jsxChild of jsxChildren) {
                visitJsxNode(component, renderQueue, cursor, jsxChild, isSvg);
            }
        }
        else if (jsxNode.type === Slot) {
            component && visitQSlotJsxNode(component, renderQueue, cursor, jsxNode, isSvg);
        }
        else if (typeof jsxNode.type === 'function') {
            visitJsxNode(component, renderQueue, cursor, jsxNode.type(jsxNode.props), isSvg);
        }
        else {
            throw qError(QError.Render_unexpectedJSXNodeType_type, nodeType);
        }
    }
    else if (isPromise(jsxNode)) {
        const vNodeCursor = cursorReconcileVirtualNode(cursor);
        const render = (jsxNode) => {
            cursorReconcileStartVirtualNode(vNodeCursor);
            visitJsxNode(component, renderQueue, vNodeCursor, jsxNode, isSvg);
            cursorReconcileEnd(vNodeCursor);
        };
        jsxNode.then(render, render);
        if (jsxNode.whilePending) {
            const vNodePending = cursorClone(vNodeCursor);
            cursorReconcileStartVirtualNode(vNodePending);
            visitJsxNode(component, renderQueue, vNodePending, jsxNode.whilePending, isSvg);
            cursorReconcileEnd(vNodePending);
        }
    }
    else if (Array.isArray(jsxNode)) {
        const jsxChildren = jsxNode;
        for (const jsxChild of jsxChildren) {
            visitJsxNode(component, renderQueue, cursor, jsxChild, isSvg);
        }
    }
    else if (typeof jsxNode === 'string' || typeof jsxNode === 'number') {
        // stringify
        cursorReconcileText(cursor, String(jsxNode));
    }
}
function visitJsxLiteralNode(component, renderQueue, cursor, jsxNode, isSvg) {
    const jsxTag = jsxNode.type;
    const isQComponent = OnRenderProp in jsxNode.props;
    if (!isSvg) {
        isSvg = jsxTag === 'svg';
    }
    const elementCursor = cursorReconcileElement(cursor, component, jsxTag, jsxNode.props, isQComponent ? renderQueue : null, isSvg);
    if (isSvg && jsxTag === 'foreignObject') {
        isSvg = false;
    }
    if (!hasInnerHtmlOrTextBinding(jsxNode)) {
        // we don't process children if we have inner-html bound to something.
        const jsxChildren = jsxNode.children || EMPTY_ARRAY;
        for (const jsxChild of jsxChildren) {
            visitJsxNode(component, renderQueue, elementCursor, jsxChild, isSvg);
        }
        cursorReconcileEnd(elementCursor);
    }
    else if (isQComponent) {
        //TODO(misko): needs tests and QError.
        throw new Error('innerHTML/innerText bindings not supported on component content');
    }
}
function hasInnerHtmlOrTextBinding(jsxNode) {
    return 'innerHTML' in jsxNode.props || 'innerText' in jsxNode.props;
}
function visitQSlotJsxNode(component, renderQueue, cursor, jsxNode, isSvg) {
    const slotName = jsxNode.props.name || '';
    const slotCursor = cursorReconcileElement(cursor, component, QSlot, Object.assign({ [QSlotName]: slotName }, jsxNode.props), null, isSvg);
    const slotMap = getSlotMap(component);
    const namedSlot = keyValueArrayGet(slotMap, slotName);
    if (namedSlot && namedSlot.length > NamedSlotEnum.firstNode) {
        // project existing nodes.
        const cursorParent = slotCursor.parent;
        if (namedSlot[NamedSlotEnum.parent] !== cursorParent) {
            // The only time we need to do anything if the existing elements are not already
            // in the right spot. Move them.
            cursorReconcileEnd(slotCursor); // clear anything which is already in.
            for (let i = NamedSlotEnum.firstNode; i < namedSlot.length; i++) {
                const node = namedSlot[i];
                cursorParent.appendChild(node);
            }
            cursorReconcileEnd(slotCursor);
        }
        renderMarked(cursorParent.ownerDocument);
        // TODO
        // cursorParent.querySelectorAll(RenderNotifySelector).forEach((compElem) => {
        //   renderQueue.push(getQComponent(compElem)!.render());
        // });
    }
    else {
        // fallback to default value projection.
        const jsxChildren = jsxNode.children;
        for (const jsxChild of jsxChildren) {
            visitJsxNode(component, renderQueue, slotCursor, jsxChild, isSvg);
        }
        cursorReconcileEnd(slotCursor);
    }
}

// TODO(misko): Can we get rid of this whole file, and instead teach getProps to know how to render
// the advantage will be that the render capability would then be exposed to the outside world as well.
class QComponentCtx {
    constructor(hostElement) {
        this.styleId = undefined;
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
            const event = 'qRender';
            const promise = useInvoke(newInvokeContext(hostElement, hostElement, event), onRender);
            await then(promise, (jsxNode) => {
                if (this.styleId === undefined) {
                    const scopedStyleId = (this.styleId = hostElement.getAttribute(ComponentScopedStyles));
                    if (scopedStyleId) {
                        this.styleHostClass = styleHost(scopedStyleId);
                        this.styleClass = styleContent(scopedStyleId);
                    }
                }
                const cursor = cursorForComponent(this.hostElement);
                visitJsxNode(this, renderQueue, cursor, jsxNode, false);
                cursorReconcileEnd(cursor);
            });
        }
        catch (e) {
            // TODO(misko): Proper error handling
            // eslint-disable-next-line no-console
            console.log(e);
        }
        return [this.hostElement, ...(await flattenPromiseTree(renderQueue))];
    }
}
const COMPONENT_PROP = '__qComponent__';
function getQComponent(hostElement) {
    const element = hostElement;
    let component = element[COMPONENT_PROP];
    if (!component)
        component = element[COMPONENT_PROP] = new QComponentCtx(hostElement);
    return component;
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
    getScheduled(hostElement.ownerDocument).add(hostElement);
    return scheduleRender(hostElement.ownerDocument);
}
const SCHEDULE = Symbol();
function getScheduled(doc) {
    let set = doc[SCHEDULE];
    if (!set) {
        set = doc[SCHEDULE] = new Set();
    }
    return set;
}
/**
 * Schedule rendering for the future.
 *
 * Multiple calls to this function result in a single `rAF` scheduling creating coalescence.
 *
 * Rendering is achieved by `querySelectorAll` looking for all `on:q-render` attributes.
 *
 * @returns a `Promise` of all of the `HostElements` which were re-rendered.
 * @internal
 */
function scheduleRender(doc) {
    return getPlatform(doc).queueRender(renderMarked);
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

function qObject(obj) {
    assertEqual(unwrapProxy(obj), obj, 'Unexpected proxy at this location');
    if (obj == null || typeof obj !== 'object') {
        // TODO(misko): centralize
        throw new Error(`Q-ERROR: Only objects can be wrapped in 'QObject', got ` + debugStringify(obj));
    }
    if (obj.constructor !== Object) {
        throw new Error(`Q-ERROR: Only objects literals can be wrapped in 'QObject', got ` + debugStringify(obj));
    }
    const proxy = readWriteProxy(obj);
    Object.assign(proxy[QOjectTargetSymbol], obj);
    return proxy;
}
function _restoreQObject(obj, subs) {
    return readWriteProxy(obj, subs);
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
function readWriteProxy(target, subs) {
    if (!target || typeof target !== 'object')
        return target;
    let proxy = proxyMap.get(target);
    if (proxy)
        return proxy;
    proxy = new Proxy(target, new ReadWriteProxyHandler(subs));
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
function wrap(value) {
    if (value && typeof value === 'object') {
        const nakedValue = unwrapProxy(value);
        if (nakedValue !== value) {
            // already a proxy return;
            return value;
        }
        verifySerializable(value);
        const proxy = proxyMap.get(value);
        return proxy ? proxy : readWriteProxy(value);
    }
    else {
        return value;
    }
}
class ReadWriteProxyHandler {
    constructor(subs = new Map()) {
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
const proxyMap = new WeakMap();

function QStore_hydrate(doc) {
    const script = doc.querySelector('script[type="qwik/json"]');
    doc.qDehydrate = () => QStore_dehydrate(doc);
    if (script) {
        script.parentElement.removeChild(script);
        const meta = JSON.parse(script.textContent || '{}');
        const elements = new Map();
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
            id = intToStr(elementToIndex.size);
            el.setAttribute(ELEMENT_ID, id);
            id = ELEMENT_ID_PREFIX + id;
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
                if (el.isConnected) {
                    const id = getElementID(el);
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
    const data = {
        objs,
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
    // Serialize
    const script = doc.createElement('script');
    script.setAttribute('type', 'qwik/json');
    script.textContent = JSON.stringify(data, function (key, value) {
        var _a, _b;
        if (key.startsWith('__'))
            return undefined;
        if (value && typeof value === 'object') {
            value = (_a = value[QOjectTargetSymbol]) !== null && _a !== void 0 ? _a : value;
        }
        if (this === objs)
            return value;
        const idx = objToId.get(value);
        if (idx !== undefined) {
            return intToStr(idx);
        }
        return (_b = elementToIndex.get(value)) !== null && _b !== void 0 ? _b : value;
    }, qDev ? '  ' : undefined);
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

function newQObjectMap(element) {
    const map = new Map();
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
            if (index === undefined) {
                map.set(object, array.length);
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
        const cache = new Map();
        element[Q_CTX] = ctx = {
            element,
            cache,
            refMap: newQObjectMap(element),
            id: undefined,
            props: undefined,
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
function onUnmount(unmountFn) {
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
const onUnmount$ = implicit$FirstArg(onUnmount);
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
function onResume(resumeFn) {
    throw new Error('IMPLEMENT: onRender' + resumeFn);
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
const onResume$ = implicit$FirstArg(onResume);
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
function onHydrate(hydrateFn) {
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
const onHydrate$ = implicit$FirstArg(onHydrate);
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
function onDehydrate(dehydrateFn) {
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
const onDehydrate$ = implicit$FirstArg(onDehydrate);
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
    throw new Error('IMPLEMENT: on' + eventFn);
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
    throw new Error('IMPLEMENT: onDocument' + eventFn);
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
    throw new Error('IMPLEMENT: onWindow' + eventFn);
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
function useStyles(styles) {
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
const useStyles$ = implicit$FirstArg(useStyles);
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#useScopedStyles">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#useScopedStyles instead)
/**
 * @alpha
 */
// </docs>
function useScopedStyles(styles) {
    _useStyles(styles, true);
}
// <docs markdown="https://hackmd.io/c_nNpiLZSYugTU0c5JATJA#useScopedStyles">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2Fc_nNpiLZSYugTU0c5JATJA%3Fboth#useScopedStyles instead)
/**
 * @alpha
 */
// </docs>
const useScopedStyles$ = implicit$FirstArg(useScopedStyles);
/**
 * @public
 */
function component(onMount, options = {}) {
    var _a;
    const tagName = (_a = options.tagName) !== null && _a !== void 0 ? _a : 'div';
    // Return a QComponent Factory function.
    return function QComponent(props) {
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
        return h(tagName, Object.assign({ [OnRenderProp]: onRenderFactory }, props));
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
 *   const state = createStore({ count: props.value || 0 });
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
 * - `onMount` closure: is used to create the data store (see: `createStore`);
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
    return component($(onMount), options);
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
        const document = hostElement.ownerDocument;
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
 *   const store = createStore({ count: 0, doubleCount: 0 });
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
function onWatch(watchFn) {
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
 *   const store = createStore({ count: 0, doubleCount: 0 });
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
const onWatch$ = implicit$FirstArg(onWatch);

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
async function render(parent, jsxNode) {
    // If input is not JSX, convert it
    if (!isJSXNode(jsxNode)) {
        jsxNode = jsx(jsxNode, null);
    }
    const renderQueue = [];
    let firstChild = parent.firstChild;
    while (firstChild && firstChild.nodeType > NodeType.COMMENT_NODE) {
        firstChild = firstChild.nextSibling;
    }
    const cursor = cursorForParent(parent);
    visitJsxNode(null, renderQueue, cursor, jsxNode, false);
    return flattenPromiseTree(renderQueue);
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
        const ctx = getContext(el);
        assertDefined(qrl.capture);
        qrl.captureRef = qrl.capture.map((idx) => qInflate(idx, ctx));
    }
    return qrl.captureRef;
}

// <docs markdown="https://hackmd.io/lQ8v7fyhR-WD3b-2aRUpyw#createStore">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit https://hackmd.io/@qwik-docs/BkxpSz80Y/%2FlQ8v7fyhR-WD3b-2aRUpyw%3Fboth#createStore instead)
/**
 * Creates a object that Qwik can track across serializations.
 *
 * Use `createStore` to create state for your application. The return object is a proxy which has
 * a unique ID. The ID of the object is used in the `QRL`s to refer to the store.
 *
 * ## Example
 *
 * Example showing how `createStore` is used in Counter example to keep track of count.
 *
 * ```typescript
 * export const Counter = component$(() => {
 *   const store = createStore({ count: 0 });
 *   return $(() => <button on$:click={() => store.count++}>{store.count}</button>);
 * });
 * ```
 *
 * @public
 */
// </docs>
function createStore(initialState) {
    return qObject(initialState);
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
const version = "0.0.17-0-dev20220309001500";

export { $, Async, Fragment, Host, Slot, bubble, component, component$, createStore, dehydrate, getPlatform, h, implicit$FirstArg, jsx, jsx as jsxDEV, jsx as jsxs, notifyRender, on, onDehydrate, onDehydrate$, onDocument, onHydrate, onHydrate$, onResume, onResume$, onUnmount, onUnmount$, onWatch, onWatch$, onWindow, qrl, qrlImport, render, setPlatform, useEvent, useHostElement, useLexicalScope, useScopedStyles, useScopedStyles$, useStyles, useStyles$, useTransient, version };
//# sourceMappingURL=core.mjs.map
