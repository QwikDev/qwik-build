/**
 * @license
 * @builder.io/qwik 1.14.1
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
import { isServer, isBrowser, isDev } from '@builder.io/qwik/build';
export { isBrowser, isDev, isServer } from '@builder.io/qwik/build';
import { p } from '@builder.io/qwik/preloader';

// <docs markdown="../readme.md#implicit$FirstArg">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#implicit$FirstArg instead)
/**
 * Create a `____$(...)` convenience method from `___(...)`.
 *
 * It is very common for functions to take a lazy-loadable resource as a first argument. For this
 * reason, the Qwik Optimizer automatically extracts the first argument from any function which ends
 * in `$`.
 *
 * This means that `foo$(arg0)` and `foo($(arg0))` are equivalent with respect to Qwik Optimizer.
 * The former is just a shorthand for the latter.
 *
 * For example, these function calls are equivalent:
 *
 * - `component$(() => {...})` is same as `component($(() => {...}))`
 *
 * ```tsx
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
 * @param fn - A function that should have its first argument automatically `$`.
 * @public
 */
// </docs>
const implicit$FirstArg = (fn) => {
    return function (first, ...rest) {
        return fn.call(null, $(first), ...rest);
    };
};

const qDev = globalThis.qDev !== false;
const qInspector = globalThis.qInspector === true;
const qSerialize = globalThis.qSerialize !== false;
const qDynamicPlatform = globalThis.qDynamicPlatform !== false;
const qTest = globalThis.qTest === true;
const qRuntimeQrl = globalThis.qRuntimeQrl === true;
const seal = (obj) => {
    if (qDev) {
        Object.seal(obj);
    }
};

const isNode$1 = (value) => {
    return value && typeof value.nodeType === 'number';
};
const isDocument = (value) => {
    return value.nodeType === 9;
};
const isElement$1 = (value) => {
    return value.nodeType === 1;
};
const isQwikElement = (value) => {
    const nodeType = value.nodeType;
    return nodeType === 1 || nodeType === 111;
};
const isNodeElement = (value) => {
    const nodeType = value.nodeType;
    return nodeType === 1 || nodeType === 111 || nodeType === 3;
};
const isVirtualElement = (value) => {
    return value.nodeType === 111;
};
const isText = (value) => {
    return value.nodeType === 3;
};
const isComment = (value) => {
    return value.nodeType === 8;
};

const STYLE = qDev
    ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;`
    : '';
const logError = (message, ...optionalParams) => {
    return createAndLogError(false, message, ...optionalParams);
};
const throwErrorAndStop = (message, ...optionalParams) => {
    const error = createAndLogError(false, message, ...optionalParams);
    // eslint-disable-next-line no-debugger
    debugger;
    throw error;
};
const logErrorAndStop = (message, ...optionalParams) => {
    const err = createAndLogError(qDev, message, ...optionalParams);
    // eslint-disable-next-line no-debugger
    debugger;
    return err;
};
const _printed = /*#__PURE__*/ new Set();
const logOnceWarn = (message, ...optionalParams) => {
    if (qDev) {
        const key = 'warn' + String(message);
        if (!_printed.has(key)) {
            _printed.add(key);
            logWarn(message, ...optionalParams);
        }
    }
};
const logWarn = (message, ...optionalParams) => {
    if (qDev) {
        console.warn('%cQWIK WARN', STYLE, message, ...printParams(optionalParams));
    }
};
const logDebug = (message, ...optionalParams) => {
    if (qDev) {
        // eslint-disable-next-line no-console
        console.debug('%cQWIK', STYLE, message, ...printParams(optionalParams));
    }
};
const tryGetContext$1 = (element) => {
    return element['_qc_'];
};
const printParams = (optionalParams) => {
    if (qDev) {
        return optionalParams.map((p) => {
            if (isNode$1(p) && isElement$1(p)) {
                return printElement(p);
            }
            return p;
        });
    }
    return optionalParams;
};
const printElement = (el) => {
    const ctx = tryGetContext$1(el);
    const isServer = /*#__PURE__*/ (() => typeof process !== 'undefined' && !!process.versions && !!process.versions.node)();
    return {
        tagName: el.tagName,
        renderQRL: ctx?.$componentQrl$?.getSymbol(),
        element: isServer ? undefined : el,
        ctx: isServer ? undefined : ctx,
    };
};
const createAndLogError = (asyncThrow, message, ...optionalParams) => {
    const err = message instanceof Error ? message : new Error(message);
    // display the error message first, then the optional params, and finally the stack trace
    // the stack needs to be displayed last because the given params will be lost among large stack traces so it will
    // provide a bad developer experience
    console.error('%cQWIK ERROR', STYLE, err.message, ...printParams(optionalParams), err.stack);
    asyncThrow &&
        !qTest &&
        setTimeout(() => {
            // throwing error asynchronously to avoid breaking the current call stack.
            // We throw so that the error is delivered to the global error handler for
            // reporting it to a third-party tools such as Qwik Insights, Sentry or New Relic.
            throw err;
        }, 0);
    return err;
};

const ASSERT_DISCLAIMER = 'Internal assert, this is likely caused by a bug in Qwik: ';
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
function assertFail(text, ...parts) {
    if (qDev) {
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
function assertNumber(value1, text, ...parts) {
    if (qDev) {
        if (typeof value1 === 'number') {
            return;
        }
        throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
    }
}
function assertString(value1, text, ...parts) {
    if (qDev) {
        if (typeof value1 === 'string') {
            return;
        }
        throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
    }
}
function assertQwikElement(el) {
    if (qDev) {
        if (!isQwikElement(el)) {
            console.error('Not a Qwik Element, got', el);
            throwErrorAndStop(ASSERT_DISCLAIMER + 'Not a Qwik Element');
        }
    }
}
function assertElement(el) {
    if (qDev) {
        if (!isElement$1(el)) {
            console.error('Not a Element, got', el);
            throwErrorAndStop(ASSERT_DISCLAIMER + 'Not an Element');
        }
    }
}

const codeToText = (code, ...parts) => {
    if (qDev) {
        // Keep one error, one line to make it easier to search for the error message.
        const MAP = [
            'Error while serializing class or style attributes', // 0
            'Can not serialize a HTML Node that is not an Element', // 1
            'Runtime but no instance found on element.', // 2
            'Only primitive and object literals can be serialized', // 3
            'Crash while rendering', // 4
            'You can render over a existing q:container. Skipping render().', // 5
            'Set property {{0}}', // 6
            "Only function's and 'string's are supported.", // 7
            "Only objects can be wrapped in 'QObject'", // 8
            `Only objects literals can be wrapped in 'QObject'`, // 9
            'QRL is not a function', // 10
            'Dynamic import not found', // 11
            'Unknown type argument', // 12
            `Actual value for useContext({{0}}) can not be found, make sure some ancestor component has set a value using useContextProvider(). In the browser make sure that the context was used during SSR so its state was serialized.`, // 13
            "Invoking 'use*()' method outside of invocation context.", // 14
            'Cant access renderCtx for existing context', // 15
            'Cant access document for existing context', // 16
            'props are immutable', // 17
            '<div> component can only be used at the root of a Qwik component$()', // 18
            'Props are immutable by default.', // 19
            `Calling a 'use*()' method outside 'component$(() => { HERE })' is not allowed. 'use*()' methods provide hooks to the 'component$' state and lifecycle, ie 'use' hooks can only be called synchronously within the 'component$' function or another 'use' method.\nSee https://qwik.dev/docs/components/tasks/#use-method-rules`, // 20
            'Container is already paused. Skipping', // 21
            '', // 22 -- unused
            'When rendering directly on top of Document, the root node must be a <html>', // 23
            'A <html> node must have 2 children. The first one <head> and the second one a <body>', // 24
            'Invalid JSXNode type "{{0}}". It must be either a function or a string. Found:', // 25
            'Tracking value changes can only be done to useStore() objects and component props', // 26
            'Missing Object ID for captured object', // 27
            'The provided Context reference "{{0}}" is not a valid context created by createContextId()', // 28
            '<html> is the root container, it can not be rendered inside a component', // 29
            'QRLs can not be resolved because it does not have an attached container. This means that the QRL does not know where it belongs inside the DOM, so it cant dynamically import() from a relative path.', // 30
            'QRLs can not be dynamically resolved, because it does not have a chunk path', // 31
            'The JSX ref attribute must be a Signal', // 32
        ];
        let text = MAP[code] ?? '';
        if (parts.length) {
            text = text.replaceAll(/{{(\d+)}}/g, (_, index) => {
                let v = parts[index];
                if (v && typeof v === 'object' && v.constructor === Object) {
                    v = JSON.stringify(v).slice(0, 50);
                }
                return v;
            });
        }
        return `Code(${code}): ${text}`;
    }
    else {
        // cute little hack to give roughly the correct line number. Update the line number if it shifts.
        return `Code(${code}) https://github.com/QwikDev/qwik/blob/main/packages/qwik/src/core/error/error.ts#L${8 + code}`;
    }
};
const QError_stringifyClassOrStyle = 0;
const QError_verifySerializable = 3;
const QError_cannotRenderOverExistingContainer = 5;
const QError_setProperty = 6;
const QError_qrlIsNotFunction = 10;
const QError_dynamicImportFailed = 11;
const QError_unknownTypeArgument = 12;
const QError_notFoundContext = 13;
const QError_useMethodOutsideContext = 14;
const QError_immutableProps = 17;
const QError_useInvokeContext = 20;
const QError_containerAlreadyPaused = 21;
const QError_invalidJsxNodeType = 25;
const QError_trackUseStore = 26;
const QError_missingObjectId = 27;
const QError_invalidContext = 28;
const QError_canNotRenderHTML = 29;
const QError_qrlMissingContainer = 30;
const QError_qrlMissingChunk = 31;
const QError_invalidRefValue = 32;
const qError = (code, ...parts) => {
    const text = codeToText(code, ...parts);
    return logErrorAndStop(text, ...parts);
};

// keep this import from qwik/build so the cjs build works
const createPlatform = () => {
    return {
        isServer,
        importSymbol(containerEl, url, symbolName) {
            if (isServer) {
                const hash = getSymbolHash(symbolName);
                const regSym = globalThis.__qwik_reg_symbols?.get(hash);
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
            urlCopy.hash = '';
            const importURL = urlCopy.href;
            return import(/* @vite-ignore */ importURL).then((mod) => {
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
            return [symbolName, chunk ?? '_'];
        },
    };
};
/**
 * Convert relative base URI and relative URL into a fully qualified URL.
 *
 * @param base -`QRL`s are relative, and therefore they need a base for resolution.
 *
 *   - `Element` use `base.ownerDocument.baseURI`
 *   - `Document` use `base.baseURI`
 *   - `string` use `base` as is
 *   - `QConfig` use `base.baseURI`
 *
 * @param url - Relative URL
 * @returns Fully qualified URL.
 */
const toUrl = (doc, containerEl, url) => {
    const baseURI = doc.baseURI;
    const base = new URL(containerEl.getAttribute('q:base') ?? baseURI, baseURI);
    return new URL(url, base);
};
let _platform = /*#__PURE__ */ createPlatform();
// <docs markdown="./readme.md#setPlatform">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ./readme.md#setPlatform instead)
/**
 * Sets the `CorePlatform`.
 *
 * This is useful to override the platform in tests to change the behavior of,
 * `requestAnimationFrame`, and import resolution.
 *
 * @param doc - The document of the application for which the platform is needed.
 * @param platform - The platform to use.
 * @public
 */
// </docs>
const setPlatform = (plt) => (_platform = plt);
// <docs markdown="./readme.md#getPlatform">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ./readme.md#getPlatform instead)
/**
 * Retrieve the `CorePlatform`.
 *
 * The `CorePlatform` is also responsible for retrieving the Manifest, that contains mappings from
 * symbols to javascript import chunks. For this reason, `CorePlatform` can't be global, but is
 * specific to the application currently running. On server it is possible that many different
 * applications are running in a single server instance, and for this reason the `CorePlatform` is
 * associated with the application document.
 *
 * @param docOrNode - The document (or node) of the application for which the platform is needed.
 * @public
 */
// </docs>
const getPlatform = () => {
    return _platform;
};
const isServerPlatform = () => {
    if (qDynamicPlatform) {
        return _platform.isServer;
    }
    return false;
};

/** @private */
const isSerializableObject = (v) => {
    const proto = Object.getPrototypeOf(v);
    return proto === Object.prototype || proto === null;
};
const isObject = (v) => {
    return !!v && typeof v === 'object';
};
const isArray = (v) => {
    return Array.isArray(v);
};
const isString = (v) => {
    return typeof v === 'string';
};
const isFunction = (v) => {
    return typeof v === 'function';
};

const isPromise = (value) => {
    // not using "value instanceof Promise" to have zone.js support
    return value && typeof value.then === 'function';
};
const safeCall = (call, thenFn, rejectFn) => {
    try {
        const promise = call();
        if (isPromise(promise)) {
            return promise.then(thenFn, rejectFn);
        }
        else {
            return thenFn(promise);
        }
    }
    catch (e) {
        return rejectFn(e);
    }
};
const maybeThen = (promise, thenFn) => {
    return isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
};
const promiseAll = (promises) => {
    const hasPromise = promises.some(isPromise);
    if (hasPromise) {
        return Promise.all(promises);
    }
    return promises;
};
const promiseAllLazy = (promises) => {
    if (promises.length > 0) {
        return Promise.all(promises);
    }
    return promises;
};
const isNotNullable = (v) => {
    return v != null;
};
const delay = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

// import { qDev } from './qdev';
const EMPTY_ARRAY = [];
const EMPTY_OBJ = {};
if (qDev) {
    Object.freeze(EMPTY_ARRAY);
    Object.freeze(EMPTY_OBJ);
}

const getDocument = (node) => {
    if (!qDynamicPlatform) {
        return document;
    }
    if (typeof document !== 'undefined') {
        return document;
    }
    if (node.nodeType === 9) {
        return node;
    }
    const doc = node.ownerDocument;
    assertDefined(doc, 'doc must be defined');
    return doc;
};

/** State factory of the component. */
const OnRenderProp = 'q:renderFn';
/** Component style content prefix */
const ComponentStylesPrefixContent = '⭐️';
/** `<some-element q:slot="...">` */
const QSlot = 'q:slot';
const QSlotRef = 'q:sref';
const QSlotS = 'q:s';
const QStyle = 'q:style';
const QScopedStyle = 'q:sstyle';
const QInstance = 'q:instance';
const QFuncsPrefix = 'qFuncs_';
const getQFuncs = (document, hash) => {
    return document[QFuncsPrefix + hash] || [];
};
const QLocaleAttr = 'q:locale';
const QContainerAttr = 'q:container';
const QContainerSelector = '[q\\:container]';
const ResourceEvent = 'qResource';
const ComputedEvent = 'qComputed';
const RenderEvent = 'qRender';
const TaskEvent = 'qTask';
const ELEMENT_ID = 'q:id';
const ELEMENT_ID_PREFIX = '#';

const QObjectRecursive = 1 << 0;
const QObjectImmutable = 1 << 1;
const QOjectTargetSymbol = Symbol('proxy target');
const QObjectFlagsSymbol = Symbol('proxy flags');
const QObjectManagerSymbol = Symbol('proxy manager');
/** @internal */
const _IMMUTABLE = Symbol('IMMUTABLE');
const _IMMUTABLE_PREFIX = '$$';
/**
 * @internal
 * Key for the virtual element stored on qv comments
 */
const VIRTUAL_SYMBOL = '__virtual';
/**
 * @internal
 * Key for the `QContext` object stored on QwikElements
 */
const Q_CTX = '_qc_';

const directSetAttribute = (el, prop, value) => {
    return el.setAttribute(prop, value);
};
const directGetAttribute = (el, prop) => {
    return el.getAttribute(prop);
};
const directRemoveAttribute = (el, prop) => {
    return el.removeAttribute(prop);
};

const fromCamelToKebabCase = (text) => {
    return text.replace(/([A-Z])/g, '-$1').toLowerCase();
};
const fromKebabToCamelCase = (text) => {
    return text.replace(/-./g, (x) => x[1].toUpperCase());
};

// keep this import from qwik/build so the cjs build works
const emitEvent$1 = (el, eventName, detail, bubbles) => {
    if (!qTest && (isBrowser || typeof CustomEvent === 'function')) {
        if (el) {
            el.dispatchEvent(new CustomEvent(eventName, {
                detail,
                bubbles: bubbles,
                composed: bubbles,
            }));
        }
    }
};

/** Creates a proxy that notifies of any writes. */
const getOrCreateProxy = (target, containerState, flags = 0) => {
    const proxy = containerState.$proxyMap$.get(target);
    if (proxy) {
        return proxy;
    }
    if (flags !== 0) {
        setObjectFlags(target, flags);
    }
    return createProxy(target, containerState, undefined);
};
const createProxy = (target, containerState, subs) => {
    assertEqual(unwrapProxy(target), target, 'Unexpected proxy at this location', target);
    assertTrue(!containerState.$proxyMap$.has(target), 'Proxy was already created', target);
    assertTrue(isObject(target), 'Target must be an object');
    assertTrue(isSerializableObject(target) || isArray(target), 'Target must be a serializable object');
    const manager = containerState.$subsManager$.$createManager$(subs);
    const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
    containerState.$proxyMap$.set(target, proxy);
    return proxy;
};
const createPropsState = () => {
    const props = {};
    setObjectFlags(props, QObjectImmutable);
    return props;
};
const setObjectFlags = (obj, flags) => {
    Object.defineProperty(obj, QObjectFlagsSymbol, { value: flags, enumerable: false });
};
/** @internal */
const _restProps = (props, omit) => {
    const rest = {};
    for (const key in props) {
        if (!omit.includes(key)) {
            rest[key] = props[key];
        }
    }
    return rest;
};
class ReadWriteProxyHandler {
    $containerState$;
    $manager$;
    constructor($containerState$, $manager$) {
        this.$containerState$ = $containerState$;
        this.$manager$ = $manager$;
    }
    deleteProperty(target, prop) {
        if (target[QObjectFlagsSymbol] & QObjectImmutable) {
            throw qError(QError_immutableProps);
        }
        if (typeof prop != 'string' || !delete target[prop]) {
            return false;
        }
        this.$manager$.$notifySubs$(isArray(target) ? undefined : prop);
        return true;
    }
    get(target, prop) {
        if (typeof prop === 'symbol') {
            if (prop === QOjectTargetSymbol) {
                return target;
            }
            if (prop === QObjectManagerSymbol) {
                return this.$manager$;
            }
            return target[prop];
        }
        const flags = target[QObjectFlagsSymbol] ?? 0;
        assertNumber(flags, 'flags must be an number');
        const invokeCtx = tryGetInvokeContext();
        const recursive = (flags & QObjectRecursive) !== 0;
        const immutable = (flags & QObjectImmutable) !== 0;
        const hiddenSignal = target[_IMMUTABLE_PREFIX + prop];
        let subscriber;
        let value;
        if (invokeCtx) {
            subscriber = invokeCtx.$subscriber$;
        }
        if (immutable && (!(prop in target) || immutableValue(target[_IMMUTABLE]?.[prop]))) {
            subscriber = null;
        }
        if (hiddenSignal) {
            assertTrue(isSignal(hiddenSignal), '$$ prop must be a signal');
            value = hiddenSignal.value;
            subscriber = null;
        }
        else {
            value = target[prop];
        }
        if (subscriber) {
            const isA = isArray(target);
            this.$manager$.$addSub$(subscriber, isA ? undefined : prop);
        }
        return recursive ? wrap(value, this.$containerState$) : value;
    }
    set(target, prop, newValue) {
        if (typeof prop === 'symbol') {
            target[prop] = newValue;
            return true;
        }
        const flags = target[QObjectFlagsSymbol] ?? 0;
        assertNumber(flags, 'flags must be an number');
        const immutable = (flags & QObjectImmutable) !== 0;
        if (immutable) {
            throw qError(QError_immutableProps);
        }
        const recursive = (flags & QObjectRecursive) !== 0;
        const unwrappedNewValue = recursive ? unwrapProxy(newValue) : newValue;
        if (qDev) {
            if (qSerialize) {
                verifySerializable(unwrappedNewValue);
            }
            const invokeCtx = tryGetInvokeContext();
            if (invokeCtx) {
                if (invokeCtx.$event$ === RenderEvent) {
                    logError('State mutation inside render function. Move mutation to useTask$() or useVisibleTask$()', prop);
                }
                else if (invokeCtx.$event$ === ComputedEvent) {
                    logWarn('State mutation inside useComputed$() is an antipattern. Use useTask$() instead', invokeCtx.$hostElement$);
                }
                else if (invokeCtx.$event$ === ResourceEvent) {
                    logWarn('State mutation inside useResource$() is an antipattern. Use useTask$() instead', invokeCtx.$hostElement$);
                }
            }
        }
        const isA = isArray(target);
        if (isA) {
            target[prop] = unwrappedNewValue;
            this.$manager$.$notifySubs$();
            return true;
        }
        const oldValue = target[prop];
        target[prop] = unwrappedNewValue;
        if (oldValue !== unwrappedNewValue) {
            this.$manager$.$notifySubs$(prop);
        }
        return true;
    }
    has(target, prop) {
        if (prop === QOjectTargetSymbol) {
            return true;
        }
        const invokeCtx = tryGetInvokeContext();
        if (typeof prop === 'string' && invokeCtx) {
            const subscriber = invokeCtx.$subscriber$;
            if (subscriber) {
                const isA = isArray(target);
                this.$manager$.$addSub$(subscriber, isA ? undefined : prop);
            }
        }
        const hasOwnProperty = Object.prototype.hasOwnProperty;
        if (hasOwnProperty.call(target, prop)) {
            return true;
        }
        if (typeof prop === 'string' && hasOwnProperty.call(target, _IMMUTABLE_PREFIX + prop)) {
            return true;
        }
        return false;
    }
    ownKeys(target) {
        const flags = target[QObjectFlagsSymbol] ?? 0;
        assertNumber(flags, 'flags must be an number');
        const immutable = (flags & QObjectImmutable) !== 0;
        if (!immutable) {
            let subscriber = null;
            const invokeCtx = tryGetInvokeContext();
            if (invokeCtx) {
                subscriber = invokeCtx.$subscriber$;
            }
            if (subscriber) {
                this.$manager$.$addSub$(subscriber);
            }
        }
        if (isArray(target)) {
            return Reflect.ownKeys(target);
        }
        return Reflect.ownKeys(target).map((a) => {
            return typeof a === 'string' && a.startsWith(_IMMUTABLE_PREFIX)
                ? a.slice(_IMMUTABLE_PREFIX.length)
                : a;
        });
    }
    getOwnPropertyDescriptor(target, prop) {
        const descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
        if (isArray(target) || typeof prop === 'symbol') {
            return descriptor;
        }
        if (descriptor && !descriptor.configurable) {
            return descriptor;
        }
        return {
            enumerable: true,
            configurable: true,
        };
    }
}
const immutableValue = (value) => {
    return value === _IMMUTABLE || isSignal(value);
};
const wrap = (value, containerState) => {
    if (isObject(value)) {
        if (Object.isFrozen(value)) {
            return value;
        }
        const nakedValue = unwrapProxy(value);
        if (nakedValue !== value) {
            // already a proxy return;
            return value;
        }
        if (fastSkipSerialize(nakedValue)) {
            return value;
        }
        if (isSerializableObject(nakedValue) || isArray(nakedValue)) {
            const proxy = containerState.$proxyMap$.get(nakedValue);
            return proxy ? proxy : getOrCreateProxy(nakedValue, containerState, QObjectRecursive);
        }
    }
    return value;
};

const ON_PROP_REGEX = /^(on|window:|document:)/;
const PREVENT_DEFAULT = 'preventdefault:';
const isOnProp = (prop) => {
    return prop.endsWith('$') && ON_PROP_REGEX.test(prop);
};
const groupListeners = (listeners) => {
    if (listeners.length === 0) {
        return EMPTY_ARRAY;
    }
    if (listeners.length === 1) {
        const listener = listeners[0];
        return [[listener[0], [listener[1]]]];
    }
    const keys = [];
    for (let i = 0; i < listeners.length; i++) {
        const eventName = listeners[i][0];
        if (!keys.includes(eventName)) {
            keys.push(eventName);
        }
    }
    return keys.map((eventName) => {
        return [eventName, listeners.filter((l) => l[0] === eventName).map((a) => a[1])];
    });
};
const setEvent = (existingListeners, prop, input, containerEl) => {
    assertTrue(prop.endsWith('$'), 'render: event property does not end with $', prop);
    prop = normalizeOnProp(prop.slice(0, -1));
    if (input) {
        if (isArray(input)) {
            const processed = input
                .flat(Infinity)
                .filter((q) => q != null)
                .map((q) => [prop, ensureQrl(q, containerEl)]);
            existingListeners.push(...processed);
        }
        else {
            existingListeners.push([prop, ensureQrl(input, containerEl)]);
        }
    }
    return prop;
};
const PREFIXES = ['on', 'window:on', 'document:on'];
const SCOPED = ['on', 'on-window', 'on-document'];
const normalizeOnProp = (prop) => {
    let scope = 'on';
    for (let i = 0; i < PREFIXES.length; i++) {
        const prefix = PREFIXES[i];
        if (prop.startsWith(prefix)) {
            scope = SCOPED[i];
            prop = prop.slice(prefix.length);
            break;
        }
    }
    if (prop.startsWith('-')) {
        prop = fromCamelToKebabCase(prop.slice(1));
    }
    else {
        prop = prop.toLowerCase();
    }
    return scope + ':' + prop;
};
const ensureQrl = (value, containerEl) => {
    if (qSerialize && !qRuntimeQrl) {
        assertQrl(value);
        value.$setContainer$(containerEl);
        return value;
    }
    const qrl = isQrl(value) ? value : $(value);
    qrl.$setContainer$(containerEl);
    return qrl;
};
const getDomListeners = (elCtx, containerEl) => {
    const attributes = elCtx.$element$.attributes;
    const listeners = [];
    for (let i = 0; i < attributes.length; i++) {
        const { name, value } = attributes.item(i);
        if (name.startsWith('on:') ||
            name.startsWith('on-window:') ||
            name.startsWith('on-document:')) {
            const urls = value.split('\n');
            for (const url of urls) {
                const qrl = parseQRL(url, containerEl);
                if (qrl.$capture$) {
                    inflateQrl(qrl, elCtx);
                }
                listeners.push([name, qrl]);
            }
        }
    }
    return listeners;
};

const hashCode = (text, hash = 0) => {
    for (let i = 0; i < text.length; i++) {
        const chr = text.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Number(Math.abs(hash)).toString(36);
};

const styleKey = (qStyles, index) => {
    assertQrl(qStyles);
    return `${hashCode(qStyles.$hash$)}-${index}`;
};
const styleContent = (styleId) => {
    return ComponentStylesPrefixContent + styleId;
};
const serializeSStyle = (scopeIds) => {
    const value = scopeIds.join('|');
    if (value.length > 0) {
        return value;
    }
    return undefined;
};

/**
 * QWIK_VERSION
 *
 * @public
 */
const version = "1.14.1";

/**
 * @internal
 * The storage provider for hooks. Each invocation increases index i. Data is stored in an array.
 */
const useSequentialScope = () => {
    const iCtx = useInvokeContext();
    const hostElement = iCtx.$hostElement$;
    const elCtx = getContext(hostElement, iCtx.$renderCtx$.$static$.$containerState$);
    const seq = (elCtx.$seq$ ||= []);
    const i = iCtx.$i$++;
    const set = (value) => {
        if (qDev && qSerialize) {
            verifySerializable(value);
        }
        return (seq[i] = value);
    };
    return {
        val: seq[i],
        set,
        i,
        iCtx,
        elCtx,
    };
};

// <docs markdown="../readme.md#createContextId">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#createContextId instead)
/**
 * Create a context ID to be used in your application. The name should be written with no spaces.
 *
 * Context is a way to pass stores to the child components without prop-drilling.
 *
 * Use `createContextId()` to create a `ContextId`. A `ContextId` is just a serializable identifier
 * for the context. It is not the context value itself. See `useContextProvider()` and
 * `useContext()` for the values. Qwik needs a serializable ID for the context so that the it can
 * track context providers and consumers in a way that survives resumability.
 *
 * ### Example
 *
 * ```tsx
 * // Declare the Context type.
 * interface TodosStore {
 *   items: string[];
 * }
 * // Create a Context ID (no data is saved here.)
 * // You will use this ID to both create and retrieve the Context.
 * export const TodosContext = createContextId<TodosStore>('Todos');
 *
 * // Example of providing context to child components.
 * export const App = component$(() => {
 *   useContextProvider(
 *     TodosContext,
 *     useStore<TodosStore>({
 *       items: ['Learn Qwik', 'Build Qwik app', 'Profit'],
 *     })
 *   );
 *
 *   return <Items />;
 * });
 *
 * // Example of retrieving the context provided by a parent component.
 * export const Items = component$(() => {
 *   const todos = useContext(TodosContext);
 *   return (
 *     <ul>
 *       {todos.items.map((item) => (
 *         <li>{item}</li>
 *       ))}
 *     </ul>
 *   );
 * });
 *
 * ```
 *
 * @param name - The name of the context.
 * @public
 */
// </docs>
const createContextId = (name) => {
    assertTrue(/^[\w/.-]+$/.test(name), 'Context name must only contain A-Z,a-z,0-9, _', name);
    return /*#__PURE__*/ Object.freeze({
        id: fromCamelToKebabCase(name),
    });
};
// <docs markdown="../readme.md#useContextProvider">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useContextProvider instead)
/**
 * Assign a value to a Context.
 *
 * Use `useContextProvider()` to assign a value to a context. The assignment happens in the
 * component's function. Once assigned, use `useContext()` in any child component to retrieve the
 * value.
 *
 * Context is a way to pass stores to the child components without prop-drilling. Note that scalar
 * values are allowed, but for reactivity you need signals or stores.
 *
 * ### Example
 *
 * ```tsx
 * // Declare the Context type.
 * interface TodosStore {
 *   items: string[];
 * }
 * // Create a Context ID (no data is saved here.)
 * // You will use this ID to both create and retrieve the Context.
 * export const TodosContext = createContextId<TodosStore>('Todos');
 *
 * // Example of providing context to child components.
 * export const App = component$(() => {
 *   useContextProvider(
 *     TodosContext,
 *     useStore<TodosStore>({
 *       items: ['Learn Qwik', 'Build Qwik app', 'Profit'],
 *     })
 *   );
 *
 *   return <Items />;
 * });
 *
 * // Example of retrieving the context provided by a parent component.
 * export const Items = component$(() => {
 *   const todos = useContext(TodosContext);
 *   return (
 *     <ul>
 *       {todos.items.map((item) => (
 *         <li>{item}</li>
 *       ))}
 *     </ul>
 *   );
 * });
 *
 * ```
 *
 * @param context - The context to assign a value to.
 * @param value - The value to assign to the context.
 * @public
 */
// </docs>
const useContextProvider = (context, newValue) => {
    const { val, set, elCtx } = useSequentialScope();
    if (val !== undefined) {
        return;
    }
    if (qDev) {
        validateContext(context);
    }
    const contexts = (elCtx.$contexts$ ||= new Map());
    if (qDev && qSerialize) {
        verifySerializable(newValue);
    }
    contexts.set(context.id, newValue);
    set(true);
};
// <docs markdown="../readme.md#useContext">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useContext instead)
/**
 * Retrieve Context value.
 *
 * Use `useContext()` to retrieve the value of context in a component. To retrieve a value a parent
 * component needs to invoke `useContextProvider()` to assign a value.
 *
 * ### Example
 *
 * ```tsx
 * // Declare the Context type.
 * interface TodosStore {
 *   items: string[];
 * }
 * // Create a Context ID (no data is saved here.)
 * // You will use this ID to both create and retrieve the Context.
 * export const TodosContext = createContextId<TodosStore>('Todos');
 *
 * // Example of providing context to child components.
 * export const App = component$(() => {
 *   useContextProvider(
 *     TodosContext,
 *     useStore<TodosStore>({
 *       items: ['Learn Qwik', 'Build Qwik app', 'Profit'],
 *     })
 *   );
 *
 *   return <Items />;
 * });
 *
 * // Example of retrieving the context provided by a parent component.
 * export const Items = component$(() => {
 *   const todos = useContext(TodosContext);
 *   return (
 *     <ul>
 *       {todos.items.map((item) => (
 *         <li>{item}</li>
 *       ))}
 *     </ul>
 *   );
 * });
 *
 * ```
 *
 * @param context - The context to retrieve a value from.
 * @public
 */
// </docs>
const useContext = (context, defaultValue) => {
    const { val, set, iCtx, elCtx } = useSequentialScope();
    if (val !== undefined) {
        return val;
    }
    if (qDev) {
        validateContext(context);
    }
    const value = resolveContext(context, elCtx, iCtx.$renderCtx$.$static$.$containerState$);
    if (typeof defaultValue === 'function') {
        return set(invoke(undefined, defaultValue, value));
    }
    if (value !== undefined) {
        return set(value);
    }
    if (defaultValue !== undefined) {
        return set(defaultValue);
    }
    throw qError(QError_notFoundContext, context.id);
};
/** Find a wrapping Virtual component in the DOM */
const findParentCtx = (el, containerState) => {
    let node = el;
    let stack = 1;
    while (node && !node.hasAttribute?.('q:container')) {
        // Walk the siblings backwards, each comment might be the Virtual wrapper component
        while ((node = node.previousSibling)) {
            if (isComment(node)) {
                const virtual = node[VIRTUAL_SYMBOL];
                if (virtual) {
                    const qtx = virtual[Q_CTX];
                    if (node === virtual.open) {
                        // We started inside this node so this is our parent
                        return qtx ?? getContext(virtual, containerState);
                    }
                    // This is a sibling, check if it knows our parent
                    if (qtx?.$parentCtx$) {
                        return qtx.$parentCtx$;
                    }
                    // Skip over this entire virtual sibling
                    node = virtual;
                    continue;
                }
                if (node.data === '/qv') {
                    stack++;
                }
                else if (node.data.startsWith('qv ')) {
                    stack--;
                    if (stack === 0) {
                        return getContext(getVirtualElement(node), containerState);
                    }
                }
            }
        }
        // No more siblings, walk up the DOM tree. The parent will never be a Virtual component.
        node = el.parentElement;
        el = node;
    }
    return null;
};
const getParentProvider = (ctx, containerState) => {
    // `null` means there's no parent, `undefined` means we don't know yet.
    if (ctx.$parentCtx$ === undefined) {
        // Not fully resumed container, find context from DOM
        // We cannot recover $realParentCtx$ from this but that's fine because we don't need to pause on the client
        ctx.$parentCtx$ = findParentCtx(ctx.$element$, containerState);
    }
    /**
     * Note, the parentCtx is used during pause to to get the immediate parent, so we can't shortcut
     * the search for $contexts$ here. If that turns out to be needed, it needs to be cached in a
     * separate property.
     */
    return ctx.$parentCtx$;
};
const resolveContext = (context, hostCtx, containerState) => {
    const contextID = context.id;
    if (!hostCtx) {
        return;
    }
    let ctx = hostCtx;
    while (ctx) {
        const found = ctx.$contexts$?.get(contextID);
        if (found) {
            return found;
        }
        ctx = getParentProvider(ctx, containerState);
    }
};
const validateContext = (context) => {
    if (!isObject(context) || typeof context.id !== 'string' || context.id.length === 0) {
        throw qError(QError_invalidContext, context);
    }
};

const ERROR_CONTEXT = /*#__PURE__*/ createContextId('qk-error');
const handleError = (err, hostElement, rCtx) => {
    const elCtx = tryGetContext(hostElement);
    if (qDev) {
        // Clean vdom
        if (!isServerPlatform() && typeof document !== 'undefined' && isVirtualElement(hostElement)) {
            // (hostElement as any).$vdom$ = null;
            elCtx.$vdom$ = null;
            const errorDiv = document.createElement('errored-host');
            if (err && err instanceof Error) {
                errorDiv.props = { error: err };
            }
            errorDiv.setAttribute('q:key', '_error_');
            errorDiv.append(...hostElement.childNodes);
            hostElement.appendChild(errorDiv);
        }
        if (err && err instanceof Error) {
            if (!('hostElement' in err)) {
                err['hostElement'] = hostElement;
            }
        }
        if (!isRecoverable(err)) {
            throw err;
        }
    }
    if (isServerPlatform()) {
        throw err;
    }
    else {
        const errorStore = resolveContext(ERROR_CONTEXT, elCtx, rCtx.$static$.$containerState$);
        if (errorStore === undefined) {
            throw err;
        }
        errorStore.error = err;
    }
};
const isRecoverable = (err) => {
    if (err && err instanceof Error) {
        if ('plugin' in err) {
            return false;
        }
    }
    return true;
};

/** CSS properties which accept numbers but are not in units of "px". */
const unitlessNumbers = new Set([
    'animationIterationCount',
    'aspectRatio',
    'borderImageOutset',
    'borderImageSlice',
    'borderImageWidth',
    'boxFlex',
    'boxFlexGroup',
    'boxOrdinalGroup',
    'columnCount',
    'columns',
    'flex',
    'flexGrow',
    'flexShrink',
    'gridArea',
    'gridRow',
    'gridRowEnd',
    'gridRowStart',
    'gridColumn',
    'gridColumnEnd',
    'gridColumnStart',
    'fontWeight',
    'lineClamp',
    'lineHeight',
    'opacity',
    'order',
    'orphans',
    'scale',
    'tabSize',
    'widows',
    'zIndex',
    'zoom',
    'MozAnimationIterationCount', // Known Prefixed Properties
    'MozBoxFlex', // TODO: Remove these since they shouldn't be used in modern code
    'msFlex',
    'msFlexPositive',
    'WebkitAnimationIterationCount',
    'WebkitBoxFlex',
    'WebkitBoxOrdinalGroup',
    'WebkitColumnCount',
    'WebkitColumns',
    'WebkitFlex',
    'WebkitFlexGrow',
    'WebkitFlexShrink',
    'WebkitLineClamp',
]);
const isUnitlessNumber = (name) => {
    return unitlessNumbers.has(name);
};

const executeComponent = (rCtx, elCtx, attempt) => {
    elCtx.$flags$ &= -2;
    elCtx.$flags$ |= HOST_FLAG_MOUNTED;
    elCtx.$slots$ = [];
    elCtx.li.length = 0;
    const hostElement = elCtx.$element$;
    const componentQRL = elCtx.$componentQrl$;
    const props = elCtx.$props$;
    const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, undefined, RenderEvent);
    const waitOn = (iCtx.$waitOn$ = []);
    assertDefined(componentQRL, `render: host element to render must have a $renderQrl$:`, elCtx);
    assertDefined(props, `render: host element to render must have defined props`, elCtx);
    // Set component context
    const newCtx = pushRenderContext(rCtx);
    newCtx.$cmpCtx$ = elCtx;
    newCtx.$slotCtx$ = undefined;
    // Invoke render hook
    iCtx.$subscriber$ = [0, hostElement];
    iCtx.$renderCtx$ = rCtx;
    // Resolve render function
    componentQRL.$setContainer$(rCtx.$static$.$containerState$.$containerEl$);
    const componentFn = componentQRL.getFn(iCtx);
    return safeCall(() => componentFn(props), (jsxNode) => {
        return maybeThen(isServerPlatform()
            ? maybeThen(promiseAllLazy(waitOn), () => 
            // Run dirty tasks before SSR output is generated.
            maybeThen(executeSSRTasks(rCtx.$static$.$containerState$, rCtx), () => promiseAllLazy(waitOn)))
            : promiseAllLazy(waitOn), () => {
            if (elCtx.$flags$ & HOST_FLAG_DIRTY) {
                if (attempt && attempt > 100) {
                    logWarn(`Infinite loop detected. Element: ${elCtx.$componentQrl$?.$symbol$}`);
                }
                else {
                    return executeComponent(rCtx, elCtx, attempt ? attempt + 1 : 1);
                }
            }
            return {
                node: jsxNode,
                rCtx: newCtx,
            };
        });
    }, (err) => {
        if (err === SignalUnassignedException) {
            if (attempt && attempt > 100) {
                logWarn(`Infinite loop detected. Element: ${elCtx.$componentQrl$?.$symbol$}`);
            }
            else {
                return maybeThen(promiseAllLazy(waitOn), () => {
                    return executeComponent(rCtx, elCtx, attempt ? attempt + 1 : 1);
                });
            }
        }
        handleError(err, hostElement, rCtx);
        return {
            node: SkipRender,
            rCtx: newCtx,
        };
    });
};
const createRenderContext = (doc, containerState) => {
    const ctx = {
        $static$: {
            $doc$: doc,
            $locale$: containerState.$serverData$.locale,
            $containerState$: containerState,
            $hostElements$: new Set(),
            $operations$: [],
            $postOperations$: [],
            $roots$: [],
            $addSlots$: [],
            $rmSlots$: [],
            $visited$: [],
        },
        $cmpCtx$: null,
        $slotCtx$: undefined,
    };
    seal(ctx);
    seal(ctx.$static$);
    return ctx;
};
const pushRenderContext = (ctx) => {
    const newCtx = {
        $static$: ctx.$static$,
        $cmpCtx$: ctx.$cmpCtx$,
        $slotCtx$: ctx.$slotCtx$,
    };
    return newCtx;
};
const serializeClassWithHost = (obj, hostCtx) => {
    if (hostCtx?.$scopeIds$?.length) {
        return hostCtx.$scopeIds$.join(' ') + ' ' + serializeClass(obj);
    }
    return serializeClass(obj);
};
const serializeClass = (obj) => {
    if (!obj) {
        return '';
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
    }
    else {
        for (const [key, value] of Object.entries(obj)) {
            if (value) {
                classes.push(key.trim());
            }
        }
    }
    return classes.join(' ');
};
const stringifyStyle = (obj) => {
    if (obj == null) {
        return '';
    }
    if (typeof obj == 'object') {
        if (isArray(obj)) {
            throw qError(QError_stringifyClassOrStyle, obj, 'style');
        }
        else {
            const chunks = [];
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    if (value != null && typeof value !== 'function') {
                        if (key.startsWith('--')) {
                            chunks.push(key + ':' + value);
                        }
                        else {
                            chunks.push(fromCamelToKebabCase(key) + ':' + setValueForStyle(key, value));
                        }
                    }
                }
            }
            return chunks.join(';');
        }
    }
    return String(obj);
};
const setValueForStyle = (styleName, value) => {
    if (typeof value === 'number' && value !== 0 && !isUnitlessNumber(styleName)) {
        return value + 'px';
    }
    return value;
};
const getNextIndex = (ctx) => {
    return intToStr(ctx.$static$.$containerState$.$elementIndex$++);
};
const setQId = (rCtx, elCtx) => {
    const id = getNextIndex(rCtx);
    elCtx.$id$ = id;
};
const jsxToString = (data) => {
    if (isSignal(data)) {
        return jsxToString(data.value);
    }
    return data == null || typeof data === 'boolean' ? '' : String(data);
};
function isAriaAttribute(prop) {
    return prop.startsWith('aria-');
}
const shouldWrapFunctional = (res, node) => {
    if (node.key) {
        return !isJSXNode(res) || (!isFunction(res.type) && res.key != node.key);
    }
    return false;
};
const static_listeners = 1 << 0;
const static_subtree = 1 << 1;
const dangerouslySetInnerHTML = 'dangerouslySetInnerHTML';

const FLUSH_COMMENT = '<!--qkssr-f-->';
const IS_HEAD$1 = 1 << 0;
const IS_HTML = 1 << 2;
const IS_TEXT = 1 << 3;
const IS_INVISIBLE = 1 << 4;
const IS_PHASING = 1 << 5;
const IS_ANCHOR = 1 << 6;
const IS_BUTTON = 1 << 7;
const IS_TABLE = 1 << 8;
const IS_PHRASING_CONTAINER = 1 << 9;
const IS_IMMUTABLE$1 = 1 << 10;
class MockElement {
    nodeType;
    [Q_CTX] = null;
    constructor(nodeType) {
        this.nodeType = nodeType;
        seal(this);
    }
}
const createDocument = () => {
    return new MockElement(9);
};
/** @internal */
const _renderSSR = async (node, opts) => {
    const root = opts.containerTagName;
    const containerEl = createMockQContext(1).$element$;
    const containerState = createContainerState(containerEl, opts.base ?? '/');
    containerState.$serverData$.locale = opts.serverData?.locale;
    const doc = createDocument();
    const rCtx = createRenderContext(doc, containerState);
    const headNodes = opts.beforeContent ?? [];
    if (qDev) {
        if (root in phasingContent ||
            root in emptyElements ||
            root in tableContent ||
            root in startPhasingContent ||
            root in invisibleElements) {
            throw new Error(`The "containerTagName" can not be "${root}". Please choose a different tag name like: "div", "html", "custom-container".`);
        }
    }
    const ssrCtx = {
        $static$: {
            $contexts$: [],
            $headNodes$: root === 'html' ? headNodes : [],
            $locale$: opts.serverData?.locale,
            $textNodes$: new Map(),
        },
        $projectedChildren$: undefined,
        $projectedCtxs$: undefined,
        $invocationContext$: undefined,
    };
    seal(ssrCtx);
    const locale = opts.serverData?.locale;
    const containerAttributes = opts.containerAttributes;
    const qRender = containerAttributes['q:render'];
    containerAttributes['q:container'] = 'paused';
    containerAttributes['q:version'] = version ?? 'dev';
    containerAttributes['q:render'] = (qRender ? qRender + '-' : '') + (qDev ? 'ssr-dev' : 'ssr');
    containerAttributes['q:base'] = opts.base || '';
    containerAttributes['q:locale'] = locale;
    containerAttributes['q:manifest-hash'] = opts.manifestHash;
    containerAttributes['q:instance'] = hash();
    const children = root === 'html' ? [node] : [headNodes, node];
    if (root !== 'html') {
        containerAttributes.class =
            'qc📦' + (containerAttributes.class ? ' ' + containerAttributes.class : '');
    }
    const serverData = (containerState.$serverData$ = {
        ...containerState.$serverData$,
        ...opts.serverData,
    });
    serverData.containerAttributes = {
        ...serverData['containerAttributes'],
        ...containerAttributes,
    };
    const invokeCtx = (ssrCtx.$invocationContext$ = newInvokeContext(locale));
    invokeCtx.$renderCtx$ = rCtx;
    ssrCtx.$invocationContext$;
    const rootNode = _jsxQ(root, null, containerAttributes, children, HOST_FLAG_DIRTY | HOST_FLAG_NEED_ATTACH_LISTENER, null);
    containerState.$hostsRendering$ = new Set();
    await Promise.resolve().then(() => renderRoot$1(rootNode, rCtx, ssrCtx, opts.stream, containerState, opts));
};
const hash = () => Math.random().toString(36).slice(2);
const renderRoot$1 = async (node, rCtx, ssrCtx, stream, containerState, opts) => {
    const beforeClose = opts.beforeClose;
    await renderNode(node, rCtx, ssrCtx, stream, 0, beforeClose
        ? (stream) => {
            const result = beforeClose(ssrCtx.$static$.$contexts$, containerState, false, ssrCtx.$static$.$textNodes$);
            return processData$1(result, rCtx, ssrCtx, stream, 0, undefined);
        }
        : undefined);
    if (qDev) {
        if (ssrCtx.$static$.$headNodes$.length > 0) {
            logError('Missing <head>. Global styles could not be rendered. Please render a <head> element at the root of the app');
        }
    }
    return rCtx;
};
const renderGenerator = async (node, rCtx, ssrCtx, stream, flags) => {
    stream.write(FLUSH_COMMENT);
    const generator = node.props.children;
    let value;
    if (isFunction(generator)) {
        const v = generator({
            write(chunk) {
                stream.write(chunk);
                stream.write(FLUSH_COMMENT);
            },
        });
        if (isPromise(v)) {
            return v;
        }
        value = v;
    }
    else {
        value = generator;
    }
    for await (const chunk of value) {
        await processData$1(chunk, rCtx, ssrCtx, stream, flags, undefined);
        stream.write(FLUSH_COMMENT);
    }
};
const renderNodeVirtual = (node, elCtx, extraNodes, rCtx, ssrCtx, stream, flags, beforeClose) => {
    const props = node.props;
    const renderQrl = props[OnRenderProp];
    if (renderQrl) {
        elCtx.$componentQrl$ = renderQrl;
        return renderSSRComponent(rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose);
    }
    let virtualComment = '<!--qv' + renderVirtualAttributes(props);
    const isSlot = QSlotS in props;
    const key = node.key != null ? String(node.key) : null;
    if (isSlot) {
        assertDefined(rCtx.$cmpCtx$?.$id$, 'hostId must be defined for a slot');
        virtualComment += ' q:sref=' + rCtx.$cmpCtx$.$id$;
    }
    if (key != null) {
        virtualComment += ' q:key=' + key;
    }
    virtualComment += '-->';
    stream.write(virtualComment);
    const html = node.props[dangerouslySetInnerHTML];
    if (html) {
        stream.write(html);
        stream.write(CLOSE_VIRTUAL);
        return;
    }
    if (extraNodes) {
        for (const node of extraNodes) {
            // We trust that the attributes are strings
            renderNodeElementSync(node.type, node.props, stream);
        }
    }
    const promise = walkChildren(node.children, rCtx, ssrCtx, stream, flags);
    return maybeThen(promise, () => {
        // Fast path
        if (!isSlot && !beforeClose) {
            stream.write(CLOSE_VIRTUAL);
            return;
        }
        let promise;
        if (isSlot) {
            assertDefined(key, 'key must be defined for a slot');
            const content = ssrCtx.$projectedChildren$?.[key];
            if (content) {
                const [rCtx, sCtx] = ssrCtx.$projectedCtxs$;
                const newSlotRctx = pushRenderContext(rCtx);
                newSlotRctx.$slotCtx$ = elCtx;
                ssrCtx.$projectedChildren$[key] = undefined;
                promise = processData$1(content, newSlotRctx, sCtx, stream, flags);
            }
        }
        // Inject before close
        if (beforeClose) {
            promise = maybeThen(promise, () => beforeClose(stream));
        }
        return maybeThen(promise, () => {
            stream.write(CLOSE_VIRTUAL);
        });
    });
};
const CLOSE_VIRTUAL = `<!--/qv-->`;
const renderAttributes = (attributes) => {
    let text = '';
    for (const prop in attributes) {
        if (prop === dangerouslySetInnerHTML) {
            continue;
        }
        const value = attributes[prop];
        if (value != null) {
            text += ' ' + (value === '' ? prop : prop + '="' + value + '"');
        }
    }
    return text;
};
const renderVirtualAttributes = (attributes) => {
    let text = '';
    for (const prop in attributes) {
        if (prop === 'children' || prop === dangerouslySetInnerHTML) {
            continue;
        }
        const value = attributes[prop];
        if (value != null) {
            text += ' ' + (value === '' ? prop : prop + '=' + value + '');
        }
    }
    return text;
};
const renderNodeElementSync = (tagName, attributes, stream) => {
    stream.write('<' + tagName + renderAttributes(attributes) + '>');
    const empty = !!emptyElements[tagName];
    if (empty) {
        return;
    }
    // Render innerHTML
    const innerHTML = attributes[dangerouslySetInnerHTML];
    if (innerHTML != null) {
        stream.write(innerHTML);
    }
    stream.write(`</${tagName}>`);
};
/** Render a component$ */
const renderSSRComponent = (rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose) => {
    const props = node.props;
    setComponentProps$1(rCtx, elCtx, props.props);
    return maybeThen(executeComponent(rCtx, elCtx), (res) => {
        const hostElement = elCtx.$element$;
        const newRCtx = res.rCtx;
        const iCtx = newInvokeContext(ssrCtx.$static$.$locale$, hostElement, undefined);
        iCtx.$subscriber$ = [0, hostElement];
        iCtx.$renderCtx$ = newRCtx;
        const newSSrContext = {
            $static$: ssrCtx.$static$,
            $projectedChildren$: splitProjectedChildren(node.children, ssrCtx),
            $projectedCtxs$: [rCtx, ssrCtx],
            $invocationContext$: iCtx,
        };
        const extraNodes = [];
        if (elCtx.$appendStyles$) {
            const isHTML = !!(flags & IS_HTML);
            const array = isHTML ? ssrCtx.$static$.$headNodes$ : extraNodes;
            for (const style of elCtx.$appendStyles$) {
                array.push(_jsxQ('style', {
                    [QStyle]: style.styleId,
                    [dangerouslySetInnerHTML]: style.content,
                    hidden: '',
                }, null, null, 0, null));
            }
        }
        const newID = getNextIndex(rCtx);
        const scopeId = elCtx.$scopeIds$ ? serializeSStyle(elCtx.$scopeIds$) : undefined;
        const processedNode = _jsxC(node.type, {
            [QScopedStyle]: scopeId,
            [ELEMENT_ID]: newID,
            children: res.node,
        }, 0, node.key);
        elCtx.$id$ = newID;
        ssrCtx.$static$.$contexts$.push(elCtx);
        return renderNodeVirtual(processedNode, elCtx, extraNodes, newRCtx, newSSrContext, stream, flags, (stream) => {
            if (elCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER) {
                const placeholderCtx = createMockQContext(1);
                const listeners = placeholderCtx.li;
                listeners.push(...elCtx.li);
                elCtx.$flags$ &= -3;
                placeholderCtx.$id$ = getNextIndex(rCtx);
                const attributes = {
                    type: 'placeholder',
                    hidden: '',
                    'q:id': placeholderCtx.$id$,
                };
                ssrCtx.$static$.$contexts$.push(placeholderCtx);
                const groups = groupListeners(listeners);
                for (const listener of groups) {
                    const eventName = normalizeInvisibleEvents(listener[0]);
                    attributes[eventName] = serializeQRLs(listener[1], rCtx.$static$.$containerState$, placeholderCtx);
                    registerQwikEvent$1(eventName, rCtx.$static$.$containerState$);
                }
                renderNodeElementSync('script', attributes, stream);
            }
            const projectedChildren = newSSrContext.$projectedChildren$;
            let missingSlotsDone;
            if (projectedChildren) {
                const nodes = Object.keys(projectedChildren).map((slotName) => {
                    const content = projectedChildren[slotName];
                    // projectedChildren[slotName] = undefined;
                    if (content) {
                        return _jsxQ('q:template', { [QSlot]: slotName || true, hidden: true, 'aria-hidden': 'true' }, null, content, 0, null);
                    }
                });
                const [_rCtx, sCtx] = newSSrContext.$projectedCtxs$;
                const newSlotRctx = pushRenderContext(_rCtx);
                newSlotRctx.$slotCtx$ = elCtx;
                missingSlotsDone = processData$1(nodes, newSlotRctx, sCtx, stream, 0, undefined);
            }
            return beforeClose
                ? maybeThen(missingSlotsDone, () => beforeClose(stream))
                : missingSlotsDone;
        });
    });
};
const splitProjectedChildren = (children, ssrCtx) => {
    const flatChildren = flatVirtualChildren(children, ssrCtx);
    if (flatChildren === null) {
        return undefined;
    }
    const slotMap = {};
    for (const child of flatChildren) {
        let slotName = '';
        if (isJSXNode(child)) {
            slotName = child.props[QSlot] || '';
        }
        (slotMap[slotName] ||= []).push(child);
    }
    return slotMap;
};
const createMockQContext = (nodeType) => {
    const elm = new MockElement(nodeType);
    return createContext(elm);
};
const renderNode = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
    const tagName = node.type;
    const hostCtx = rCtx.$cmpCtx$;
    if (typeof tagName === 'string') {
        const key = node.key;
        const props = node.props;
        const immutable = node.immutableProps || EMPTY_OBJ;
        const elCtx = createMockQContext(1);
        const elm = elCtx.$element$;
        const isHead = tagName === 'head';
        let openingElement = '<' + tagName;
        let useSignal = false;
        let hasRef = false;
        let classStr = '';
        let htmlStr = null;
        const handleProp = (rawProp, value, isImmutable) => {
            if (rawProp === 'ref') {
                if (value !== undefined) {
                    setRef(value, elm);
                    hasRef = true;
                }
                return;
            }
            if (isOnProp(rawProp)) {
                setEvent(elCtx.li, rawProp, value, undefined);
                return;
            }
            if (isSignal(value)) {
                assertDefined(hostCtx, 'Signals can not be used outside the root');
                if (isImmutable) {
                    value = trackSignal(value, [1, elm, value, hostCtx.$element$, rawProp]);
                }
                else {
                    value = trackSignal(value, [2, hostCtx.$element$, value, elm, rawProp]);
                }
                useSignal = true;
            }
            if (rawProp === dangerouslySetInnerHTML) {
                htmlStr = value;
                return;
            }
            if (rawProp.startsWith(PREVENT_DEFAULT)) {
                registerQwikEvent$1(rawProp.slice(PREVENT_DEFAULT.length), rCtx.$static$.$containerState$);
            }
            let attrValue;
            const prop = rawProp === 'htmlFor' ? 'for' : rawProp;
            if (prop === 'class' || prop === 'className') {
                classStr = serializeClass(value);
            }
            else if (prop === 'style') {
                attrValue = stringifyStyle(value);
            }
            else if (isAriaAttribute(prop) || prop === 'draggable' || prop === 'spellcheck') {
                attrValue = value != null ? String(value) : null;
                value = attrValue;
            }
            else if (value === false || value == null) {
                attrValue = null;
            }
            else {
                attrValue = String(value);
            }
            if (attrValue != null) {
                if (prop === 'value' && tagName === 'textarea') {
                    htmlStr = escapeHtml(attrValue);
                }
                else if (isSSRUnsafeAttr(prop)) {
                    if (qDev) {
                        logError('Attribute value is unsafe for SSR');
                    }
                }
                else {
                    openingElement +=
                        ' ' + (value === true ? prop : prop + '="' + escapeHtml(attrValue) + '"');
                }
            }
        };
        for (const prop in props) {
            let isImmutable = false;
            let value;
            if (prop in immutable) {
                isImmutable = true;
                value = immutable[prop];
                if (value === _IMMUTABLE) {
                    value = props[prop];
                }
            }
            else {
                value = props[prop];
            }
            handleProp(prop, value, isImmutable);
        }
        for (const prop in immutable) {
            if (prop in props) {
                continue;
            }
            const value = immutable[prop];
            if (value !== _IMMUTABLE) {
                handleProp(prop, value, true);
            }
        }
        const listeners = elCtx.li;
        if (hostCtx) {
            if (qDev) {
                if (tagName === 'html') {
                    throw qError(QError_canNotRenderHTML);
                }
            }
            if (hostCtx.$scopeIds$?.length) {
                const extra = hostCtx.$scopeIds$.join(' ');
                classStr = classStr ? `${extra} ${classStr}` : extra;
            }
            if (hostCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER) {
                listeners.push(...hostCtx.li);
                hostCtx.$flags$ &= -3;
            }
        }
        // Reset HOST flags
        if (qDev) {
            if (flags & IS_PHASING && !(flags & IS_PHRASING_CONTAINER)) {
                if (!(tagName in phasingContent)) {
                    throw createJSXError(`<${tagName}> can not be rendered because one of its ancestor is a <p> or a <pre>.\n
This goes against the HTML spec: https://html.spec.whatwg.org/multipage/dom.html#phrasing-content-2`, node);
                }
            }
            if (tagName === 'table') {
                flags |= IS_TABLE;
            }
            else {
                if (flags & IS_TABLE && !(tagName in tableContent)) {
                    throw createJSXError(`The <table> element requires that its direct children to be '<tbody>', '<thead>', '<tfoot>' or '<caption>' instead, '<${tagName}>' was rendered.`, node);
                }
                flags &= -257;
            }
            if (tagName === 'button') {
                if (flags & IS_BUTTON) {
                    throw createJSXError(`<${tagName}> can not be rendered because one of its ancestor is already a <button>.\n
This goes against the HTML spec: https://html.spec.whatwg.org/multipage/dom.html#interactive-content`, node);
                }
                else {
                    flags |= IS_BUTTON;
                }
            }
            if (tagName === 'a') {
                if (flags & IS_ANCHOR) {
                    throw createJSXError(`<${tagName}> can not be rendered because one of its ancestor is already a <a>.\n
This goes against the HTML spec: https://html.spec.whatwg.org/multipage/dom.html#interactive-content`, node);
                }
                else {
                    flags |= IS_ANCHOR;
                }
            }
            if (tagName === 'svg' || tagName === 'math') {
                // These types of elements are considered phrasing content, but contain children that aren't phrasing content.
                flags |= IS_PHRASING_CONTAINER;
            }
            if (flags & IS_HEAD$1) {
                if (!(tagName in headContent)) {
                    throw createJSXError(`<${tagName}> can not be rendered because it's not a valid children of the <head> element. https://html.spec.whatwg.org/multipage/dom.html#metadata-content`, node);
                }
            }
            if (flags & IS_HTML) {
                if (!(tagName in htmlContent)) {
                    throw createJSXError(`<${tagName}> can not be rendered because it's not a valid direct children of the <html> element, only <head> and <body> are allowed.`, node);
                }
            }
            else if (tagName in htmlContent) {
                throw createJSXError(`<${tagName}> can not be rendered because its parent is not a <html> element. Make sure the 'containerTagName' is set to 'html' in entry.ssr.tsx`, node);
            }
            if (tagName in startPhasingContent) {
                flags |= IS_PHASING;
            }
        }
        if (isHead) {
            flags |= IS_HEAD$1;
        }
        if (tagName in invisibleElements) {
            flags |= IS_INVISIBLE;
        }
        if (tagName in textOnlyElements) {
            flags |= IS_TEXT;
        }
        if (classStr) {
            openingElement += ' class="' + escapeHtml(classStr) + '"';
        }
        if (listeners.length > 0) {
            const groups = groupListeners(listeners);
            const isInvisible = (flags & IS_INVISIBLE) !== 0;
            for (const listener of groups) {
                const eventName = isInvisible ? normalizeInvisibleEvents(listener[0]) : listener[0];
                openingElement +=
                    ' ' +
                        eventName +
                        '="' +
                        serializeQRLs(listener[1], rCtx.$static$.$containerState$, elCtx) +
                        '"';
                registerQwikEvent$1(eventName, rCtx.$static$.$containerState$);
            }
        }
        if (key != null) {
            openingElement += ' q:key="' + escapeHtml(key) + '"';
        }
        if (hasRef || useSignal || listeners.length > 0) {
            if (hasRef || useSignal || listenersNeedId(listeners)) {
                const newID = getNextIndex(rCtx);
                openingElement += ' q:id="' + newID + '"';
                elCtx.$id$ = newID;
            }
            ssrCtx.$static$.$contexts$.push(elCtx);
        }
        if (flags & IS_HEAD$1) {
            openingElement += ' q:head';
        }
        if (qDev && qInspector && node.dev && !(flags & IS_HEAD$1)) {
            const sanitizedFileName = node?.dev?.fileName?.replace(/\\/g, '/');
            if (sanitizedFileName && !/data-qwik-inspector/.test(openingElement)) {
                openingElement += ` data-qwik-inspector="${escapeHtml(`${sanitizedFileName}:${node.dev.lineNumber}:${node.dev.columnNumber}`)}"`;
            }
        }
        openingElement += '>';
        stream.write(openingElement);
        if (tagName in emptyElements) {
            return;
        }
        if (htmlStr != null) {
            stream.write(String(htmlStr));
            stream.write(`</${tagName}>`);
            return;
        }
        if (tagName === 'html') {
            flags |= IS_HTML;
        }
        else {
            flags &= -5;
        }
        if (node.flags & static_subtree) {
            flags |= IS_IMMUTABLE$1;
        }
        const promise = processData$1(node.children, rCtx, ssrCtx, stream, flags);
        return maybeThen(promise, () => {
            // If head inject base styles
            if (isHead) {
                for (const node of ssrCtx.$static$.$headNodes$) {
                    renderNodeElementSync(node.type, node.props, stream);
                }
                ssrCtx.$static$.$headNodes$.length = 0;
            }
            // Fast path
            if (!beforeClose) {
                stream.write(`</${tagName}>`);
                return;
            }
            // Inject before close
            return maybeThen(beforeClose(stream), () => {
                stream.write(`</${tagName}>`);
            });
        });
    }
    if (tagName === Virtual) {
        const elCtx = createMockQContext(111);
        if (rCtx.$slotCtx$) {
            elCtx.$parentCtx$ = rCtx.$slotCtx$;
            elCtx.$realParentCtx$ = rCtx.$cmpCtx$;
        }
        else {
            elCtx.$parentCtx$ = rCtx.$cmpCtx$;
        }
        if (hostCtx && hostCtx.$flags$ & HOST_FLAG_DYNAMIC) {
            addDynamicSlot(hostCtx, elCtx);
        }
        return renderNodeVirtual(node, elCtx, undefined, rCtx, ssrCtx, stream, flags, beforeClose);
    }
    if (tagName === SSRRaw) {
        stream.write(node.props.data);
        return;
    }
    if (tagName === InternalSSRStream) {
        return renderGenerator(node, rCtx, ssrCtx, stream, flags);
    }
    // Inline component
    const res = invoke(ssrCtx.$invocationContext$, tagName, node.props, node.key, node.flags, node.dev);
    if (!shouldWrapFunctional(res, node)) {
        return processData$1(res, rCtx, ssrCtx, stream, flags, beforeClose);
    }
    return renderNode(_jsxC(Virtual, { children: res }, 0, node.key), rCtx, ssrCtx, stream, flags, beforeClose);
};
/** Embed metadata while rendering the tree, to be used when resuming */
const processData$1 = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
    if (node == null || typeof node === 'boolean') {
        return;
    }
    if (isString(node) || typeof node === 'number') {
        stream.write(escapeHtml(String(node)));
    }
    else if (isJSXNode(node)) {
        return renderNode(node, rCtx, ssrCtx, stream, flags, beforeClose);
    }
    else if (isArray(node)) {
        return walkChildren(node, rCtx, ssrCtx, stream, flags);
    }
    else if (isSignal(node)) {
        const insideText = flags & IS_TEXT;
        const hostEl = rCtx.$cmpCtx$?.$element$;
        let value;
        if (hostEl) {
            if (!insideText) {
                const id = getNextIndex(rCtx);
                const subs = flags & IS_IMMUTABLE$1
                    ? [3, ('#' + id), node, ('#' + id)]
                    : [4, hostEl, node, ('#' + id)];
                value = trackSignal(node, subs);
                if (isString(value)) {
                    const str = jsxToString(value);
                    ssrCtx.$static$.$textNodes$.set(str, id);
                }
                stream.write(`<!--t=${id}-->`);
                processData$1(value, rCtx, ssrCtx, stream, flags, beforeClose);
                stream.write(`<!---->`);
                return;
            }
            else {
                value = invoke(ssrCtx.$invocationContext$, () => node.value);
            }
        }
        stream.write(escapeHtml(jsxToString(value)));
        return;
    }
    else if (isPromise(node)) {
        stream.write(FLUSH_COMMENT);
        return node.then((node) => processData$1(node, rCtx, ssrCtx, stream, flags, beforeClose));
    }
    else {
        logWarn('A unsupported value was passed to the JSX, skipping render. Value:', node);
        return;
    }
};
const walkChildren = (children, rCtx, ssrContext, stream, flags) => {
    if (children == null) {
        return;
    }
    if (!isArray(children)) {
        return processData$1(children, rCtx, ssrContext, stream, flags);
    }
    const len = children.length;
    if (len === 1) {
        return processData$1(children[0], rCtx, ssrContext, stream, flags);
    }
    if (len === 0) {
        return;
    }
    let currentIndex = 0;
    const buffers = [];
    return children.reduce((prevPromise, child, index) => {
        const buffer = [];
        buffers.push(buffer);
        const localStream = prevPromise
            ? {
                write(chunk) {
                    if (currentIndex === index) {
                        stream.write(chunk);
                    }
                    else {
                        buffer.push(chunk);
                    }
                },
            }
            : stream;
        const rendered = processData$1(child, rCtx, ssrContext, localStream, flags);
        if (prevPromise || isPromise(rendered)) {
            const next = () => {
                currentIndex++;
                if (buffers.length > currentIndex) {
                    buffers[currentIndex].forEach((chunk) => stream.write(chunk));
                }
            };
            if (isPromise(rendered)) {
                if (prevPromise) {
                    return Promise.all([rendered, prevPromise]).then(next);
                }
                else {
                    return rendered.then(next);
                }
            }
            return prevPromise.then(next);
        }
        else {
            currentIndex++;
            return undefined;
        }
    }, undefined);
};
const flatVirtualChildren = (children, ssrCtx) => {
    if (children == null) {
        return null;
    }
    const result = _flatVirtualChildren(children, ssrCtx);
    const nodes = isArray(result) ? result : [result];
    if (nodes.length === 0) {
        return null;
    }
    return nodes;
};
const _flatVirtualChildren = (children, ssrCtx) => {
    if (children == null) {
        return null;
    }
    if (isArray(children)) {
        return children.flatMap((c) => _flatVirtualChildren(c, ssrCtx));
    }
    else if (isJSXNode(children) &&
        isFunction(children.type) &&
        children.type !== SSRRaw &&
        children.type !== InternalSSRStream &&
        children.type !== Virtual) {
        const res = invoke(ssrCtx.$invocationContext$, children.type, children.props, children.key, children.flags);
        return flatVirtualChildren(res, ssrCtx);
    }
    return children;
};
const setComponentProps$1 = (rCtx, elCtx, expectProps) => {
    const keys = Object.keys(expectProps);
    const target = createPropsState();
    elCtx.$props$ = createProxy(target, rCtx.$static$.$containerState$);
    if (keys.length === 0) {
        return;
    }
    const immutableMeta = (target[_IMMUTABLE] =
        expectProps[_IMMUTABLE] ?? EMPTY_OBJ);
    for (const prop of keys) {
        if (prop === 'children' || prop === QSlot) {
            continue;
        }
        if (isSignal(immutableMeta[prop])) {
            target[_IMMUTABLE_PREFIX + prop] = immutableMeta[prop];
        }
        else {
            target[prop] = expectProps[prop];
        }
    }
};
const invisibleElements = {
    head: true,
    style: true,
    script: true,
    link: true,
    meta: true,
};
const textOnlyElements = {
    title: true,
    style: true,
    script: true,
    noframes: true,
    textarea: true,
};
const emptyElements = {
    area: true,
    base: true,
    basefont: true,
    bgsound: true,
    br: true,
    col: true,
    embed: true,
    frame: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true,
};
const startPhasingContent = {
    p: true,
    pre: true,
};
const htmlContent = {
    head: true,
    body: true,
};
const tableContent = {
    tbody: true,
    thead: true,
    tfoot: true,
    caption: true,
    colgroup: true,
};
const headContent = {
    meta: true,
    title: true,
    link: true,
    style: true,
    script: true,
    noscript: true,
    template: true,
    base: true,
};
const phasingContent = {
    a: true,
    abbr: true,
    area: true,
    audio: true,
    b: true,
    bdi: true,
    bdo: true,
    br: true,
    button: true,
    canvas: true,
    cite: true,
    code: true,
    command: true,
    data: true,
    datalist: true,
    del: true,
    dfn: true,
    em: true,
    embed: true,
    i: true,
    iframe: true,
    img: true,
    input: true,
    ins: true,
    itemprop: true,
    kbd: true,
    keygen: true,
    label: true,
    link: true,
    map: true,
    mark: true,
    math: true,
    meta: true,
    meter: true,
    noscript: true,
    object: true,
    option: true,
    output: true,
    picture: true,
    progress: true,
    q: true,
    ruby: true,
    s: true,
    samp: true,
    script: true,
    select: true,
    slot: true,
    small: true,
    span: true,
    strong: true,
    sub: true,
    sup: true,
    svg: true,
    template: true,
    textarea: true,
    time: true,
    u: true,
    var: true,
    video: true,
    wbr: true,
};
const ESCAPE_HTML = /[&<>'"]/g;
const registerQwikEvent$1 = (prop, containerState) => {
    containerState.$events$.add(getEventName(prop));
};
const escapeHtml = (s) => {
    return s.replace(ESCAPE_HTML, (c) => {
        switch (c) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case "'":
                return '&#39;';
            default:
                return '';
        }
    });
};
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/; // eslint-disable-line no-control-regex
const isSSRUnsafeAttr = (name) => {
    return unsafeAttrCharRE.test(name);
};
const listenersNeedId = (listeners) => {
    return listeners.some((l) => l[1].$captureRef$ && l[1].$captureRef$.length > 0);
};
const addDynamicSlot = (hostCtx, elCtx) => {
    const dynamicSlots = (hostCtx.$dynamicSlots$ ||= []);
    if (!dynamicSlots.includes(elCtx)) {
        dynamicSlots.push(elCtx);
    }
};
const normalizeInvisibleEvents = (eventName) => {
    return eventName === 'on:qvisible' ? 'on-document:qinit' : eventName;
};

/** @internal */
const _fnSignal = (fn, args, fnStr) => {
    return new SignalDerived(fn, args, fnStr);
};
const serializeDerivedSignalFunc = (signal) => {
    const fnBody = qSerialize ? signal.$funcStr$ : 'null';
    assertDefined(fnBody, 'If qSerialize is true then fnStr must be provided.');
    let args = '';
    for (let i = 0; i < signal.$args$.length; i++) {
        args += `p${i},`;
    }
    return `(${args})=>(${fnBody})`;
};

/**
 * @internal
 *
 * Create a JSXNode for a string tag
 */
const _jsxQ = (type, mutableProps, immutableProps, children, flags, key, dev) => {
    assertString(type, 'jsx type must be a string');
    const processed = key == null ? null : String(key);
    const node = new JSXNodeImpl(type, mutableProps || EMPTY_OBJ, immutableProps, children, flags, processed);
    if (qDev && dev) {
        node.dev = {
            stack: new Error().stack,
            ...dev,
        };
    }
    validateJSXNode(node);
    seal(node);
    return node;
};
/**
 * @internal
 *
 * A string tag with dynamic props, possibly containing children
 */
const _jsxS = (type, mutableProps, immutableProps, flags, key, dev) => {
    let children = null;
    if (mutableProps && 'children' in mutableProps) {
        children = mutableProps.children;
        delete mutableProps.children;
    }
    return _jsxQ(type, mutableProps, immutableProps, children, flags, key, dev);
};
/**
 * @internal
 *
 * Create a JSXNode for any tag, with possibly immutable props embedded in props
 */
const _jsxC = (type, mutableProps, flags, key, dev) => {
    const processed = key == null ? null : String(key);
    const props = mutableProps ?? {};
    // In dynamic components, type could be a string
    if (typeof type === 'string' && _IMMUTABLE in props) {
        const immutableProps = props[_IMMUTABLE];
        delete props[_IMMUTABLE];
        const children = props.children;
        delete props.children;
        // Immutable handling for string tags is a bit different, merge all and consider immutable
        for (const [k, v] of Object.entries(immutableProps)) {
            if (v !== _IMMUTABLE) {
                delete props[k];
                props[k] = v;
            }
        }
        return _jsxQ(type, null, props, children, flags, key, dev);
    }
    const node = new JSXNodeImpl(type, props, null, props.children, flags, processed);
    if (typeof type === 'string' && mutableProps) {
        delete mutableProps.children;
    }
    if (qDev && dev) {
        node.dev = {
            stack: new Error().stack,
            ...dev,
        };
    }
    validateJSXNode(node);
    seal(node);
    return node;
};
/**
 * @public
 * Used by the JSX transpilers to create a JSXNode.
 * Note that the optimizer will not use this, instead using _jsxQ, _jsxS, and _jsxC directly.
 */
const jsx = (type, props, key) => {
    const processed = key == null ? null : String(key);
    const children = untrack(() => {
        const c = props.children;
        if (typeof type === 'string') {
            delete props.children;
        }
        return c;
    });
    if (isString(type)) {
        if ('className' in props) {
            props.class = props.className;
            delete props.className;
            if (qDev) {
                logOnceWarn('jsx: `className` is deprecated. Use `class` instead.');
            }
        }
    }
    const node = new JSXNodeImpl(type, props, null, children, 0, processed);
    validateJSXNode(node);
    seal(node);
    return node;
};
const SKIP_RENDER_TYPE = ':skipRender';
class JSXNodeImpl {
    type;
    props;
    immutableProps;
    children;
    flags;
    key;
    dev;
    constructor(type, props, immutableProps, children, flags, key = null) {
        this.type = type;
        this.props = props;
        this.immutableProps = immutableProps;
        this.children = children;
        this.flags = flags;
        this.key = key;
    }
}
/** @public */
const Virtual = (props) => props.children;
/** @public */
const RenderOnce = (props, key) => {
    return new JSXNodeImpl(Virtual, EMPTY_OBJ, null, props.children, static_subtree, key);
};
const validateJSXNode = (node) => {
    if (qDev) {
        const { type, props, immutableProps, children } = node;
        invoke(undefined, () => {
            const isQwikC = isQwikComponent(type);
            if (!isString(type) && !isFunction(type)) {
                throw new Error(`The <Type> of the JSX element must be either a string or a function. Instead, it's a "${typeof type}": ${String(type)}.`);
            }
            if (children) {
                const flatChildren = isArray(children) ? children.flat() : [children];
                if (isString(type) || isQwikC) {
                    flatChildren.forEach((child) => {
                        if (!isValidJSXChild(child)) {
                            const typeObj = typeof child;
                            let explanation = '';
                            if (typeObj === 'object') {
                                if (child?.constructor) {
                                    explanation = `it's an instance of "${child?.constructor.name}".`;
                                }
                                else {
                                    explanation = `it's a object literal: ${printObjectLiteral(child)} `;
                                }
                            }
                            else if (typeObj === 'function') {
                                explanation += `it's a function named "${child.name}".`;
                            }
                            else {
                                explanation = `it's a "${typeObj}": ${String(child)}.`;
                            }
                            throw new Error(`One of the children of <${type}> is not an accepted value. JSX children must be either: string, boolean, number, <element>, Array, undefined/null, or a Promise/Signal. Instead, ${explanation}\n`);
                        }
                    });
                }
                if (isBrowser) {
                    if (isFunction(type) || immutableProps) {
                        const keys = {};
                        flatChildren.forEach((child) => {
                            if (isJSXNode(child) && child.key != null) {
                                const key = String(child.type) + ':' + child.key;
                                if (keys[key]) {
                                    const err = createJSXError(`Multiple JSX sibling nodes with the same key.\nThis is likely caused by missing a custom key in a for loop`, child);
                                    if (err) {
                                        if (isString(child.type)) {
                                            logOnceWarn(err);
                                        }
                                        else {
                                            logOnceWarn(err);
                                        }
                                    }
                                }
                                else {
                                    keys[key] = true;
                                }
                            }
                        });
                    }
                }
            }
            const allProps = [
                ...Object.entries(props),
                ...(immutableProps ? Object.entries(immutableProps) : []),
            ];
            if (!qRuntimeQrl) {
                for (const [prop, value] of allProps) {
                    if (prop.endsWith('$') && value) {
                        if (!isQrl(value) && !Array.isArray(value)) {
                            throw new Error(`The value passed in ${prop}={...}> must be a QRL, instead you passed a "${typeof value}". Make sure your ${typeof value} is wrapped with $(...), so it can be serialized. Like this:\n$(${String(value)})`);
                        }
                    }
                    if (prop !== 'children' && isQwikC && value) {
                        verifySerializable(value, `The value of the JSX attribute "${prop}" can not be serialized`);
                    }
                }
            }
            if (isString(type)) {
                const hasSetInnerHTML = allProps.some((a) => a[0] === 'dangerouslySetInnerHTML');
                if (hasSetInnerHTML && children) {
                    const err = createJSXError(`The JSX element <${type}> can not have both 'dangerouslySetInnerHTML' and children.`, node);
                    logError(err);
                }
                if (allProps.some((a) => a[0] === 'children')) {
                    throw new Error(`The JSX element <${type}> can not have both 'children' as a property.`);
                }
                if (type === 'style') {
                    if (children) {
                        logOnceWarn(`jsx: Using <style>{content}</style> will escape the content, effectively breaking the CSS.
In order to disable content escaping use '<style dangerouslySetInnerHTML={content}/>'

However, if the use case is to inject component styleContent, use 'useStyles$()' instead, it will be a lot more efficient.
See https://qwik.dev/docs/components/styles/#usestyles for more information.`);
                    }
                }
                if (type === 'script') {
                    if (children) {
                        logOnceWarn(`jsx: Using <script>{content}</script> will escape the content, effectively breaking the inlined JS.
In order to disable content escaping use '<script dangerouslySetInnerHTML={content}/>'`);
                    }
                }
            }
        });
    }
};
const printObjectLiteral = (obj) => {
    return `{ ${Object.keys(obj)
        .map((key) => `"${key}"`)
        .join(', ')} }`;
};
const isJSXNode = (n) => {
    if (qDev) {
        if (n instanceof JSXNodeImpl) {
            return true;
        }
        if (isObject(n) && 'key' in n && 'props' in n && 'type' in n) {
            logWarn(`Duplicate implementations of "JSXNode" found`);
            return true;
        }
        return false;
    }
    else {
        return n instanceof JSXNodeImpl;
    }
};
const isValidJSXChild = (node) => {
    if (!node) {
        return true;
    }
    else if (node === SkipRender) {
        return true;
    }
    else if (isString(node) || typeof node === 'number' || typeof node === 'boolean') {
        return true;
    }
    else if (isJSXNode(node)) {
        return true;
    }
    else if (isArray(node)) {
        return node.every(isValidJSXChild);
    }
    if (isSignal(node)) {
        return isValidJSXChild(node.value);
    }
    else if (isPromise(node)) {
        return true;
    }
    return false;
};
/** @public */
const Fragment = (props) => props.children;
/** @public */
const HTMLFragment = (props) => jsx(Virtual, props);
/** @public */
const jsxDEV = (type, props, key, _isStatic, opts, _ctx) => {
    const processed = key == null ? null : String(key);
    const children = untrack(() => {
        const c = props.children;
        if (typeof type === 'string') {
            delete props.children;
        }
        return c;
    });
    if (isString(type)) {
        if ('className' in props) {
            props.class = props.className;
            delete props.className;
            if (qDev) {
                logOnceWarn('jsx: `className` is deprecated. Use `class` instead.');
            }
        }
    }
    const node = new JSXNodeImpl(type, props, null, children, 0, processed);
    node.dev = {
        stack: new Error().stack,
        ...opts,
    };
    validateJSXNode(node);
    seal(node);
    return node;
};
const createJSXError = (message, node) => {
    const error = new Error(message);
    if (!node.dev) {
        return error;
    }
    error.stack = `JSXError: ${message}\n${filterStack(node.dev.stack, 1)}`;
    return error;
};
const filterStack = (stack, offset = 0) => {
    return stack.split('\n').slice(offset).join('\n');
};

/** @public */
const SkipRender = Symbol('skip render');
/** @public */
const SSRRaw = (() => null);
/** @public */
const SSRComment = (props) => jsx(SSRRaw, { data: `<!--${props.data}-->` }, null);
/** @public */
const SSRStreamBlock = (props) => {
    return [
        jsx(SSRComment, { data: 'qkssr-pu' }),
        props.children,
        jsx(SSRComment, { data: 'qkssr-po' }),
    ];
};
/** @public */
const SSRStream = (props, key) => jsx(RenderOnce, { children: jsx(InternalSSRStream, props) }, key);
/**
 * @deprecated - It has no effect
 * @public
 */
const SSRHint = (() => null);
const InternalSSRStream = () => null;

const renderComponent = (rCtx, elCtx, flags) => {
    const justMounted = !(elCtx.$flags$ & HOST_FLAG_MOUNTED);
    const hostElement = elCtx.$element$;
    const containerState = rCtx.$static$.$containerState$;
    // Component is not dirty any more
    containerState.$hostsStaging$.delete(elCtx);
    // Clean current subscription before render
    containerState.$subsManager$.$clearSub$(hostElement);
    // TODO, serialize scopeIds
    return maybeThen(executeComponent(rCtx, elCtx), (res) => {
        const staticCtx = rCtx.$static$;
        const newCtx = res.rCtx;
        const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement);
        staticCtx.$hostElements$.add(hostElement);
        iCtx.$subscriber$ = [0, hostElement];
        iCtx.$renderCtx$ = newCtx;
        if (justMounted) {
            if (elCtx.$appendStyles$) {
                for (const style of elCtx.$appendStyles$) {
                    appendHeadStyle(staticCtx, style);
                }
            }
        }
        const processedJSXNode = processData(res.node, iCtx);
        return maybeThen(processedJSXNode, (processedJSXNode) => {
            const newVdom = wrapJSX(hostElement, processedJSXNode);
            // const oldVdom = getVdom(hostElement);
            const oldVdom = getVdom(elCtx);
            return maybeThen(smartUpdateChildren(newCtx, oldVdom, newVdom, flags), () => {
                // setVdom(hostElement, newVdom);
                elCtx.$vdom$ = newVdom;
            });
        });
    });
};
const getVdom = (elCtx) => {
    if (!elCtx.$vdom$) {
        elCtx.$vdom$ = domToVnode(elCtx.$element$);
    }
    return elCtx.$vdom$;
};
class ProcessedJSXNodeImpl {
    $type$;
    $props$;
    $immutableProps$;
    $children$;
    $flags$;
    $key$;
    $elm$ = null;
    $text$ = '';
    $signal$ = null;
    $id$;
    $dev$;
    constructor($type$, $props$, $immutableProps$, $children$, $flags$, $key$) {
        this.$type$ = $type$;
        this.$props$ = $props$;
        this.$immutableProps$ = $immutableProps$;
        this.$children$ = $children$;
        this.$flags$ = $flags$;
        this.$key$ = $key$;
        this.$id$ = $type$ + ($key$ ? ':' + $key$ : '');
        if (qDev && qInspector) {
            this.$dev$ = undefined;
        }
        seal(this);
    }
}
const processNode = (node, invocationContext) => {
    const { key, type, props, children, flags, immutableProps } = node;
    let textType = '';
    if (isString(type)) {
        textType = type;
    }
    else if (type === Virtual) {
        textType = VIRTUAL;
    }
    else if (isFunction(type)) {
        const res = invoke(invocationContext, type, props, key, flags, node.dev);
        if (!shouldWrapFunctional(res, node)) {
            return processData(res, invocationContext);
        }
        return processNode(_jsxC(Virtual, { children: res }, 0, key), invocationContext);
    }
    else {
        throw qError(QError_invalidJsxNodeType, type);
    }
    let convertedChildren = EMPTY_ARRAY;
    if (children != null) {
        return maybeThen(processData(children, invocationContext), (result) => {
            if (result !== undefined) {
                convertedChildren = isArray(result) ? result : [result];
            }
            const vnode = new ProcessedJSXNodeImpl(textType, props, immutableProps, convertedChildren, flags, key);
            if (qDev && qInspector) {
                vnode.$dev$ = node.dev;
            }
            return vnode;
        });
    }
    else {
        const vnode = new ProcessedJSXNodeImpl(textType, props, immutableProps, convertedChildren, flags, key);
        if (qDev && qInspector) {
            vnode.$dev$ = node.dev;
        }
        return vnode;
    }
};
const wrapJSX = (element, input) => {
    const children = input === undefined ? EMPTY_ARRAY : isArray(input) ? input : [input];
    const node = new ProcessedJSXNodeImpl(':virtual', {}, null, children, 0, null);
    node.$elm$ = element;
    return node;
};
const processData = (node, invocationContext) => {
    if (node == null || typeof node === 'boolean') {
        return undefined;
    }
    if (isPrimitive(node)) {
        const newNode = new ProcessedJSXNodeImpl('#text', EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
        newNode.$text$ = String(node);
        return newNode;
    }
    else if (isJSXNode(node)) {
        return processNode(node, invocationContext);
    }
    else if (isSignal(node)) {
        const newNode = new ProcessedJSXNodeImpl('#signal', EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
        newNode.$signal$ = node;
        return newNode;
    }
    else if (isArray(node)) {
        const output = promiseAll(node.flatMap((n) => processData(n, invocationContext)));
        return maybeThen(output, (array) => array.flat(100).filter(isNotNullable));
    }
    else if (isPromise(node)) {
        return node.then((node) => processData(node, invocationContext));
    }
    else if (node === SkipRender) {
        return new ProcessedJSXNodeImpl(SKIP_RENDER_TYPE, EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
    }
    else {
        logWarn('A unsupported value was passed to the JSX, skipping render. Value:', node);
        return undefined;
    }
};
const isPrimitive = (obj) => {
    return isString(obj) || typeof obj === 'number';
};

const resumeIfNeeded = (containerEl) => {
    const isResumed = directGetAttribute(containerEl, QContainerAttr);
    if (isResumed === 'paused') {
        resumeContainer(containerEl);
        if (qSerialize) {
            appendQwikDevTools(containerEl);
        }
    }
};
const getPauseState = (containerEl) => {
    const doc = getDocument(containerEl);
    const isDocElement = containerEl === doc.documentElement;
    const parentJSON = isDocElement ? doc.body : containerEl;
    const script = getQwikJSON(parentJSON, 'type');
    if (script) {
        const data = script.firstChild.data;
        return JSON.parse(unescapeText(data) || '{}');
    }
};
/** @internal */
const _deserializeData = (data, element) => {
    const obj = JSON.parse(data);
    if (typeof obj !== 'object') {
        return null;
    }
    const { _objs, _entry } = obj;
    if (typeof _objs === 'undefined' || typeof _entry === 'undefined') {
        return null;
    }
    let doc = {};
    let containerState = {};
    if (isNode$1(element) && isQwikElement(element)) {
        const containerEl = getWrappingContainer(element);
        if (containerEl) {
            containerState = _getContainerState(containerEl);
            doc = containerEl.ownerDocument;
        }
    }
    const parser = createParser(containerState, doc);
    for (let i = 0; i < _objs.length; i++) {
        const value = _objs[i];
        if (isString(value)) {
            _objs[i] = value === UNDEFINED_PREFIX ? undefined : parser.prepare(value);
        }
    }
    const getObject = (id) => _objs[strToInt(id)];
    for (const obj of _objs) {
        reviveNestedObjects(obj, getObject, parser);
    }
    return getObject(_entry);
};
const resumeContainer = (containerEl) => {
    if (!isContainer$1(containerEl)) {
        logWarn('Skipping resuming because parent element is not q:container');
        return;
    }
    const pauseState = containerEl['_qwikjson_'] ?? getPauseState(containerEl);
    containerEl['_qwikjson_'] = null;
    if (!pauseState) {
        logWarn('Skipping resuming qwik/json metadata was not found.');
        return;
    }
    const doc = getDocument(containerEl);
    const hash = containerEl.getAttribute(QInstance);
    const isDocElement = containerEl === doc.documentElement;
    const parentJSON = isDocElement ? doc.body : containerEl;
    if (qDev) {
        const script = getQwikJSON(parentJSON, 'type');
        if (!script) {
            logWarn('Skipping resuming qwik/json metadata was not found.');
            return;
        }
    }
    const inlinedFunctions = getQFuncs(doc, hash);
    const containerState = _getContainerState(containerEl);
    // Collect all elements
    const elements = new Map();
    const text = new Map();
    let node = null;
    let container = 0;
    // Collect all virtual elements
    const elementWalker = doc.createTreeWalker(containerEl, SHOW_COMMENT$1);
    while ((node = elementWalker.nextNode())) {
        const data = node.data;
        if (container === 0) {
            if (data.startsWith('qv ')) {
                const id = getID(data); // TODO: remove
                if (id >= 0) {
                    elements.set(id, node);
                }
            }
            else if (data.startsWith('t=')) {
                const id = data.slice(2);
                const index = strToInt(id);
                const textNode = getTextNode(node);
                elements.set(index, textNode);
                text.set(index, textNode.data);
            }
        }
        if (data === 'cq') {
            container++;
        }
        else if (data === '/cq') {
            container--;
        }
    }
    // Collect all elements
    // If there are nested container, we are forced to take a slower path.
    // In order to check if there are nested containers, we use the `'qc📦'` class.
    // This is because checking for class is the fastest way for the browser to find it.
    const slotPath = containerEl.getElementsByClassName('qc📦').length !== 0;
    containerEl.querySelectorAll('[q\\:id]').forEach((el) => {
        if (slotPath && el.closest('[q\\:container]') !== containerEl) {
            return;
        }
        const id = directGetAttribute(el, ELEMENT_ID);
        assertDefined(id, `resume: element missed q:id`, el);
        const index = strToInt(id);
        elements.set(index, el);
    });
    const parser = createParser(containerState, doc);
    const finalized = new Map();
    const revived = new Set();
    const getObject = (id) => {
        assertTrue(typeof id === 'string' && id.length > 0, 'resume: id must be an non-empty string, got:', id);
        if (finalized.has(id)) {
            return finalized.get(id);
        }
        return computeObject(id);
    };
    const computeObject = (id) => {
        // Handle elements
        if (id.startsWith('#')) {
            const elementId = id.slice(1);
            const index = strToInt(elementId);
            assertTrue(elements.has(index), `missing element for id:`, elementId);
            const rawElement = elements.get(index);
            assertDefined(rawElement, `missing element for id:`, elementId);
            if (isComment(rawElement)) {
                if (!rawElement.isConnected) {
                    finalized.set(id, undefined);
                    return undefined;
                }
                const virtual = getVirtualElement(rawElement);
                finalized.set(id, virtual);
                getContext(virtual, containerState);
                return virtual;
            }
            else if (isElement$1(rawElement)) {
                finalized.set(id, rawElement);
                getContext(rawElement, containerState);
                return rawElement;
            }
            finalized.set(id, rawElement);
            return rawElement;
        }
        else if (id.startsWith('@')) {
            const funcId = id.slice(1);
            const index = strToInt(funcId);
            const func = inlinedFunctions[index];
            assertDefined(func, `missing inlined function for id:`, funcId);
            return func;
        }
        else if (id.startsWith('*')) {
            const elementId = id.slice(1);
            const index = strToInt(elementId);
            assertTrue(elements.has(index), `missing element for id:`, elementId);
            const str = text.get(index);
            assertDefined(str, `missing element for id:`, elementId);
            finalized.set(id, str);
            return str;
        }
        const index = strToInt(id);
        const objs = pauseState.objs;
        assertTrue(objs.length > index, 'resume: index is out of bounds', id);
        let value = objs[index];
        if (isString(value)) {
            value = value === UNDEFINED_PREFIX ? undefined : parser.prepare(value);
        }
        let obj = value;
        for (let i = id.length - 1; i >= 0; i--) {
            const code = id[i];
            const transform = OBJECT_TRANSFORMS[code];
            if (!transform) {
                break;
            }
            obj = transform(obj, containerState);
        }
        finalized.set(id, obj);
        if (!isPrimitive(value) && !revived.has(index)) {
            revived.add(index);
            reviveSubscriptions(value, index, pauseState.subs, getObject, containerState, parser);
            reviveNestedObjects(value, getObject, parser);
        }
        return obj;
    };
    containerState.$elementIndex$ = 100000;
    containerState.$pauseCtx$ = {
        getObject,
        meta: pauseState.ctx,
        refs: pauseState.refs,
    };
    directSetAttribute(containerEl, QContainerAttr, 'resumed');
    logDebug('Container resumed');
    emitEvent$1(containerEl, 'qresume', undefined, true);
};
const reviveSubscriptions = (value, i, objsSubs, getObject, containerState, parser) => {
    const subs = objsSubs[i];
    if (subs) {
        const converted = [];
        let flag = 0;
        for (const sub of subs) {
            if (sub.startsWith('_')) {
                flag = parseInt(sub.slice(1), 10);
            }
            else {
                const parsed = parseSubscription(sub, getObject);
                if (parsed) {
                    converted.push(parsed);
                }
            }
        }
        if (flag > 0) {
            setObjectFlags(value, flag);
        }
        if (!parser.subs(value, converted)) {
            const proxy = containerState.$proxyMap$.get(value);
            if (proxy) {
                getSubscriptionManager(proxy).$addSubs$(converted);
            }
            else {
                createProxy(value, containerState, converted);
            }
        }
    }
};
const reviveNestedObjects = (obj, getObject, parser) => {
    if (parser.fill(obj, getObject)) {
        return;
    }
    if (obj && typeof obj == 'object') {
        if (isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                obj[i] = getObject(obj[i]);
            }
        }
        else if (isSerializableObject(obj)) {
            for (const key in obj) {
                obj[key] = getObject(obj[key]);
            }
        }
    }
};
const unescapeText = (str) => {
    return str.replace(/\\x3C(\/?script)/gi, '<$1');
};
const getQwikJSON = (parentElm, attribute) => {
    let child = parentElm.lastElementChild;
    while (child) {
        if (child.tagName === 'SCRIPT' && directGetAttribute(child, attribute) === 'qwik/json') {
            return child;
        }
        child = child.previousElementSibling;
    }
    return undefined;
};
const getTextNode = (mark) => {
    const nextNode = mark.nextSibling;
    if (isText(nextNode)) {
        return nextNode;
    }
    else {
        const textNode = mark.ownerDocument.createTextNode('');
        mark.parentElement.insertBefore(textNode, mark);
        return textNode;
    }
};
const appendQwikDevTools = (containerEl) => {
    containerEl['qwik'] = {
        pause: () => pauseContainer(containerEl),
        state: _getContainerState(containerEl),
    };
};
const getID = (stuff) => {
    const index = stuff.indexOf('q:id=');
    if (index > 0) {
        return strToInt(stuff.slice(index + 5));
    }
    return -1;
};

// <docs markdown="../readme.md#useLexicalScope">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useLexicalScope instead)
/**
 * Used by the Qwik Optimizer to restore the lexically scoped variables.
 *
 * This method should not be present in the application source code.
 *
 * NOTE: `useLexicalScope` method can only be used in the synchronous portion of the callback
 * (before any `await` statements.)
 *
 * @internal
 */
// </docs>
const useLexicalScope = () => {
    const context = getInvokeContext();
    let qrl = context.$qrl$;
    if (!qrl) {
        const el = context.$element$;
        assertDefined(el, 'invoke: element must be defined inside useLexicalScope()', context);
        const container = getWrappingContainer(el);
        assertDefined(container, `invoke: cant find parent q:container of`, el);
        qrl = parseQRL(decodeURIComponent(String(context.$url$)), container);
        assertQrl(qrl);
        resumeIfNeeded(container);
        const elCtx = getContext(el, _getContainerState(container));
        inflateQrl(qrl, elCtx);
    }
    else {
        assertQrl(qrl);
        assertDefined(qrl.$captureRef$, 'invoke: qrl $captureRef$ must be defined inside useLexicalScope()', qrl);
    }
    return qrl.$captureRef$;
};

const executeSignalOperation = (rCtx, operation) => {
    try {
        const type = operation[0];
        const staticCtx = rCtx.$static$;
        switch (type) {
            case 1:
            case 2: {
                let elm;
                let hostElm;
                if (type === 1) {
                    elm = operation[1];
                    hostElm = operation[3];
                }
                else {
                    elm = operation[3];
                    hostElm = operation[1];
                }
                // assertTrue(elm.isConnected, 'element must be connected to the dom');
                // assertTrue(hostElm.isConnected, 'host element must be connected to the dom');
                const elCtx = tryGetContext(elm);
                if (elCtx == null) {
                    return;
                }
                const prop = operation[4];
                const isSVG = elm.namespaceURI === SVG_NS;
                staticCtx.$containerState$.$subsManager$.$clearSignal$(operation);
                let value = trackSignal(operation[2], operation.slice(0, -1));
                if (prop === 'class') {
                    value = serializeClassWithHost(value, tryGetContext(hostElm));
                }
                else if (prop === 'style') {
                    value = stringifyStyle(value);
                }
                const vdom = getVdom(elCtx);
                if (prop in vdom.$props$ && vdom.$props$[prop] === value) {
                    return;
                }
                vdom.$props$[prop] = value;
                return smartSetProperty(staticCtx, elm, prop, value, isSVG);
            }
            case 3:
            case 4: {
                const elm = operation[3];
                if (!staticCtx.$visited$.includes(elm)) {
                    // assertTrue(elm.isConnected, 'text node must be connected to the dom');
                    staticCtx.$containerState$.$subsManager$.$clearSignal$(operation);
                    // MISKO: I believe no `invocationContext` is OK because the JSX in signal
                    // has already been converted to JSX and there is nothing to execute there.
                    const invocationContext = undefined;
                    let signalValue = trackSignal(operation[2], operation.slice(0, -1));
                    const subscription = getLastSubscription();
                    if (Array.isArray(signalValue)) {
                        signalValue = new JSXNodeImpl(Virtual, {}, null, signalValue, 0, null);
                    }
                    let newVnode = processData(signalValue, invocationContext);
                    if (isPromise(newVnode)) {
                        logError('Rendering promises in JSX signals is not supported');
                    }
                    else {
                        if (newVnode === undefined) {
                            newVnode = processData('', invocationContext);
                        }
                        const oldVnode = getVnodeFromEl(elm);
                        const element = getQwikElement(operation[1]);
                        rCtx.$cmpCtx$ = getContext(element, rCtx.$static$.$containerState$);
                        if (oldVnode.$type$ == newVnode.$type$ &&
                            oldVnode.$key$ == newVnode.$key$ &&
                            oldVnode.$id$ == newVnode.$id$) {
                            diffVnode(rCtx, oldVnode, newVnode, 0);
                        }
                        else {
                            const promises = []; // TODO(misko): hook this up
                            const oldNode = oldVnode.$elm$;
                            const newElm = createElm(rCtx, newVnode, 0, promises);
                            if (promises.length) {
                                logError('Rendering promises in JSX signals is not supported');
                            }
                            subscription[3] = newElm;
                            insertBefore(rCtx.$static$, elm.parentElement, newElm, oldNode);
                            oldNode && removeNode(staticCtx, oldNode);
                        }
                    }
                }
            }
        }
    }
    catch (e) {
        // Ignore
    }
};
function getQwikElement(element) {
    while (element) {
        if (isQwikElement(element)) {
            return element;
        }
        element = element.parentElement;
    }
    throw new Error('Not found');
}

const notifyChange = (subAction, containerState) => {
    if (subAction[0] === 0) {
        const host = subAction[1];
        if (isSubscriberDescriptor(host)) {
            notifyTask(host, containerState);
        }
        else {
            notifyRender(host, containerState);
        }
    }
    else {
        notifySignalOperation(subAction, containerState);
    }
};
/**
 * Mark component for rendering.
 *
 * Use `notifyRender` method to mark a component for rendering at some later point in time. This
 * method uses `getPlatform(doc).queueRender` for scheduling of the rendering. The default
 * implementation of the method is to use `requestAnimationFrame` to do actual rendering.
 *
 * The method is intended to coalesce multiple calls into `notifyRender` into a single call for
 * rendering.
 *
 * @param hostElement - Host-element of the component to re-render.
 * @returns A promise which is resolved when the component has been rendered.
 */
const notifyRender = (hostElement, containerState) => {
    const server = isServerPlatform();
    if (!server) {
        resumeIfNeeded(containerState.$containerEl$);
    }
    const elCtx = getContext(hostElement, containerState);
    assertDefined(elCtx.$componentQrl$, `render: notified host element must have a defined $renderQrl$`, elCtx);
    if (elCtx.$flags$ & HOST_FLAG_DIRTY) {
        return;
    }
    elCtx.$flags$ |= HOST_FLAG_DIRTY;
    const activeRendering = containerState.$hostsRendering$ !== undefined;
    if (activeRendering) {
        containerState.$hostsStaging$.add(elCtx);
    }
    else {
        if (server) {
            logWarn('Can not rerender in server platform');
            return undefined;
        }
        containerState.$hostsNext$.add(elCtx);
        scheduleFrame(containerState);
    }
};
const notifySignalOperation = (op, containerState) => {
    const activeRendering = containerState.$hostsRendering$ !== undefined;
    containerState.$opsNext$.add(op);
    if (!activeRendering) {
        scheduleFrame(containerState);
    }
};
const notifyTask = (task, containerState) => {
    if (task.$flags$ & TaskFlagsIsDirty) {
        return;
    }
    task.$flags$ |= TaskFlagsIsDirty;
    const activeRendering = containerState.$hostsRendering$ !== undefined;
    if (activeRendering) {
        containerState.$taskStaging$.add(task);
    }
    else {
        containerState.$taskNext$.add(task);
        scheduleFrame(containerState);
    }
};
const scheduleFrame = (containerState) => {
    if (containerState.$renderPromise$ === undefined) {
        containerState.$renderPromise$ = getPlatform().nextTick(() => renderMarked(containerState));
    }
    return containerState.$renderPromise$;
};
/**
 * Low-level API used by the Optimizer to process `useTask$()` API. This method is not intended to
 * be used by developers.
 *
 * @internal
 */
const _hW = () => {
    const [task] = useLexicalScope();
    notifyTask(task, _getContainerState(getWrappingContainer(task.$el$)));
};
const renderMarked = async (containerState) => {
    const containerEl = containerState.$containerEl$;
    const doc = getDocument(containerEl);
    try {
        const rCtx = createRenderContext(doc, containerState);
        const staticCtx = rCtx.$static$;
        const hostsRendering = (containerState.$hostsRendering$ = new Set(containerState.$hostsNext$));
        containerState.$hostsNext$.clear();
        await executeTasksBefore(containerState, rCtx);
        containerState.$hostsStaging$.forEach((host) => {
            hostsRendering.add(host);
        });
        containerState.$hostsStaging$.clear();
        const signalOperations = Array.from(containerState.$opsNext$);
        containerState.$opsNext$.clear();
        const renderingQueue = Array.from(hostsRendering);
        sortNodes(renderingQueue);
        if (!containerState.$styleMoved$ && renderingQueue.length > 0) {
            containerState.$styleMoved$ = true;
            const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;
            parentJSON.querySelectorAll('style[q\\:style]').forEach((el) => {
                containerState.$styleIds$.add(directGetAttribute(el, QStyle));
                appendChild(staticCtx, doc.head, el);
            });
        }
        for (const elCtx of renderingQueue) {
            const el = elCtx.$element$;
            if (!staticCtx.$hostElements$.has(el)) {
                if (elCtx.$componentQrl$) {
                    assertTrue(el.isConnected, 'element must be connected to the dom');
                    staticCtx.$roots$.push(elCtx);
                    try {
                        await renderComponent(rCtx, elCtx, getFlags(el.parentElement));
                    }
                    catch (err) {
                        if (qDev) {
                            throw err;
                        }
                        else {
                            logError(err);
                        }
                    }
                }
            }
        }
        signalOperations.forEach((op) => {
            executeSignalOperation(rCtx, op);
        });
        // Add post operations
        staticCtx.$operations$.push(...staticCtx.$postOperations$);
        // Early exist, no dom operations
        if (staticCtx.$operations$.length === 0) {
            printRenderStats(staticCtx);
            await postRendering(containerState, rCtx);
            return;
        }
        await executeContextWithScrollAndTransition(staticCtx);
        printRenderStats(staticCtx);
        return postRendering(containerState, rCtx);
    }
    catch (err) {
        logError(err);
    }
};
const getFlags = (el) => {
    let flags = 0;
    if (el) {
        if (el.namespaceURI === SVG_NS) {
            flags |= IS_SVG;
        }
        if (el.tagName === 'HEAD') {
            flags |= IS_HEAD;
        }
    }
    return flags;
};
const postRendering = async (containerState, rCtx) => {
    const hostElements = rCtx.$static$.$hostElements$;
    await executeTasksAfter(containerState, rCtx, (task, stage) => {
        if ((task.$flags$ & TaskFlagsIsVisibleTask) === 0) {
            return false;
        }
        if (stage) {
            return hostElements.has(task.$el$);
        }
        return true;
    });
    // Clear staging
    containerState.$hostsStaging$.forEach((el) => {
        containerState.$hostsNext$.add(el);
    });
    containerState.$hostsStaging$.clear();
    containerState.$hostsRendering$ = undefined;
    containerState.$renderPromise$ = undefined;
    const pending = containerState.$hostsNext$.size +
        containerState.$taskNext$.size +
        containerState.$opsNext$.size;
    if (pending > 0) {
        // Immediately render again
        containerState.$renderPromise$ = renderMarked(containerState);
    }
};
const isTask = (task) => (task.$flags$ & TaskFlagsIsTask) !== 0;
const isResourceTask$1 = (task) => (task.$flags$ & TaskFlagsIsResource) !== 0;
const executeTasksBefore = async (containerState, rCtx) => {
    const containerEl = containerState.$containerEl$;
    const resourcesPromises = [];
    const taskPromises = [];
    containerState.$taskNext$.forEach((task) => {
        if (isTask(task)) {
            taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task));
            containerState.$taskNext$.delete(task);
        }
        if (isResourceTask$1(task)) {
            resourcesPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task));
            containerState.$taskNext$.delete(task);
        }
    });
    do {
        // Run staging effected
        containerState.$taskStaging$.forEach((task) => {
            if (isTask(task)) {
                taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task));
            }
            else if (isResourceTask$1(task)) {
                resourcesPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task));
            }
            else {
                containerState.$taskNext$.add(task);
            }
        });
        containerState.$taskStaging$.clear();
        // Wait for all promises
        if (taskPromises.length > 0) {
            const tasks = await Promise.all(taskPromises);
            sortTasks(tasks);
            await Promise.all(tasks.map((task) => {
                return runSubscriber(task, containerState, rCtx);
            }));
            taskPromises.length = 0;
        }
    } while (containerState.$taskStaging$.size > 0);
    if (resourcesPromises.length > 0) {
        const resources = await Promise.all(resourcesPromises);
        sortTasks(resources);
        // no await so these run concurrently with the rendering
        for (const task of resources) {
            runSubscriber(task, containerState, rCtx);
        }
    }
};
/** Execute tasks that are dirty during SSR render */
const executeSSRTasks = (containerState, rCtx) => {
    const containerEl = containerState.$containerEl$;
    const staging = containerState.$taskStaging$;
    if (!staging.size) {
        return;
    }
    const taskPromises = [];
    let tries = 20;
    const runTasks = () => {
        // SSR dirty tasks are in taskStaging
        staging.forEach((task) => {
            if (isTask(task)) {
                taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task));
            }
            // We ignore other types of tasks, they are handled via waitOn
        });
        staging.clear();
        // Wait for all promises
        if (taskPromises.length > 0) {
            return Promise.all(taskPromises).then(async (tasks) => {
                sortTasks(tasks);
                await Promise.all(tasks.map((task) => {
                    return runSubscriber(task, containerState, rCtx);
                }));
                taskPromises.length = 0;
                if (--tries && staging.size > 0) {
                    return runTasks();
                }
                if (!tries) {
                    logWarn(`Infinite task loop detected. Tasks:\n${Array.from(staging)
                        .map((task) => `  ${task.$qrl$.$symbol$}`)
                        .join('\n')}`);
                }
            });
        }
    };
    return runTasks();
};
const executeTasksAfter = async (containerState, rCtx, taskPred) => {
    const taskPromises = [];
    const containerEl = containerState.$containerEl$;
    containerState.$taskNext$.forEach((task) => {
        if (taskPred(task, false)) {
            if (task.$el$.isConnected) {
                taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task));
            }
            containerState.$taskNext$.delete(task);
        }
    });
    do {
        // Run staging effected
        containerState.$taskStaging$.forEach((task) => {
            if (task.$el$.isConnected) {
                if (taskPred(task, true)) {
                    taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task));
                }
                else {
                    containerState.$taskNext$.add(task);
                }
            }
        });
        containerState.$taskStaging$.clear();
        // Wait for all promises
        if (taskPromises.length > 0) {
            const tasks = await Promise.all(taskPromises);
            sortTasks(tasks);
            for (const task of tasks) {
                runSubscriber(task, containerState, rCtx);
            }
            taskPromises.length = 0;
        }
    } while (containerState.$taskStaging$.size > 0);
};
const sortNodes = (elements) => {
    elements.sort((a, b) => a.$element$.compareDocumentPosition(getRootNode(b.$element$)) & 2 ? 1 : -1);
};
const sortTasks = (tasks) => {
    const isServer = isServerPlatform();
    tasks.sort((a, b) => {
        if (isServer || a.$el$ === b.$el$) {
            return a.$index$ < b.$index$ ? -1 : 1;
        }
        return (a.$el$.compareDocumentPosition(getRootNode(b.$el$)) & 2) !== 0 ? 1 : -1;
    });
};

// <docs markdown="../readme.md#useOn">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useOn instead)
/**
 * Register a listener on the current component's host element.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX. Otherwise, it's adding a JSX listener in the `<div>` is a better idea.
 *
 * @public
 * @see `useOn`, `useOnWindow`, `useOnDocument`.
 */
// </docs>
const useOn = (event, eventQrl) => {
    _useOn(createEventName(event, undefined), eventQrl);
};
// <docs markdown="../readme.md#useOnDocument">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useOnDocument instead)
/**
 * Register a listener on `document`.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX.
 *
 * @public
 * @see `useOn`, `useOnWindow`, `useOnDocument`.
 *
 * ```tsx
 * function useScroll() {
 *   useOnDocument(
 *     'scroll',
 *     $((event) => {
 *       console.log('body scrolled', event);
 *     })
 *   );
 * }
 *
 * const Cmp = component$(() => {
 *   useScroll();
 *   return <div>Profit!</div>;
 * });
 * ```
 */
// </docs>
const useOnDocument = (event, eventQrl) => {
    _useOn(createEventName(event, 'document'), eventQrl);
};
// <docs markdown="../readme.md#useOnWindow">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useOnWindow instead)
/**
 * Register a listener on `window`.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX.
 *
 * @public
 * @see `useOn`, `useOnWindow`, `useOnDocument`.
 *
 * ```tsx
 * function useAnalytics() {
 *   useOnWindow(
 *     'popstate',
 *     $((event) => {
 *       console.log('navigation happened', event);
 *       // report to analytics
 *     })
 *   );
 * }
 *
 * const Cmp = component$(() => {
 *   useAnalytics();
 *   return <div>Profit!</div>;
 * });
 * ```
 */
// </docs>
const useOnWindow = (event, eventQrl) => {
    _useOn(createEventName(event, 'window'), eventQrl);
};
const createEventName = (event, eventType) => {
    const formattedEventType = eventType !== undefined ? eventType + ':' : '';
    const res = Array.isArray(event)
        ? event.map((e) => `${formattedEventType}on-${e}`)
        : `${formattedEventType}on-${event}`;
    return res;
};
const _useOn = (eventName, eventQrl) => {
    if (eventQrl) {
        const invokeCtx = useInvokeContext();
        const elCtx = getContext(invokeCtx.$hostElement$, invokeCtx.$renderCtx$.$static$.$containerState$);
        assertQrl(eventQrl);
        if (typeof eventName === 'string') {
            elCtx.li.push([normalizeOnProp(eventName), eventQrl]);
        }
        else {
            elCtx.li.push(...eventName.map((name) => [normalizeOnProp(name), eventQrl]));
        }
        elCtx.$flags$ |= HOST_FLAG_NEED_ATTACH_LISTENER;
    }
};

/**
 * Creates a signal.
 *
 * If the initial state is a function, the function is invoked to calculate the actual initial
 * state.
 *
 * @deprecated This is a technology preview
 * @public
 */
const createSignal = (initialState) => {
    const containerState = useContainerState();
    const value = isFunction(initialState) && !isQwikComponent(initialState)
        ? invoke(undefined, initialState)
        : initialState;
    return _createSignal(value, containerState, 0);
};
/**
 * Stores a value which is retained for the lifetime of the component.
 *
 * If the value is a function, the function is invoked to calculate the actual value.
 *
 * @deprecated This is a technology preview
 * @public
 */
const useConstant = (value) => {
    const { val, set } = useSequentialScope();
    if (val != null) {
        return val;
    }
    // Note: We are not using `invoke` here because we don't want to clear the context
    value = isFunction(value) && !isQwikComponent(value) ? value() : value;
    return set(value);
};
/**
 * Hook that creates a signal that is retained for the lifetime of the component.
 *
 * @public
 */
const useSignal = (initialState) => {
    return useConstant(() => createSignal(initialState));
};

const TaskFlagsIsVisibleTask = 1 << 0;
const TaskFlagsIsTask = 1 << 1;
const TaskFlagsIsResource = 1 << 2;
const TaskFlagsIsComputed = 1 << 3;
const TaskFlagsIsDirty = 1 << 4;
const TaskFlagsIsCleanup = 1 << 5;
// <docs markdown="../readme.md#useTask">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useTask instead)
/**
 * Reruns the `taskFn` when the observed inputs change.
 *
 * Use `useTask` to observe changes on a set of inputs, and then re-execute the `taskFn` when those
 * inputs change.
 *
 * The `taskFn` only executes if the observed inputs change. To observe the inputs, use the `obs`
 * function to wrap property reads. This creates subscriptions that will trigger the `taskFn` to
 * rerun.
 *
 * @param task - Function which should be re-executed when changes to the inputs are detected
 * @public
 *
 * ### Example
 *
 * The `useTask` function is used to observe the `store.count` property. Any changes to the
 * `store.count` cause the `taskFn` to execute which in turn updates the `store.doubleCount` to
 * the double of `store.count`.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     count: 0,
 *     doubleCount: 0,
 *     debounced: 0,
 *   });
 *
 *   // Double count task
 *   useTask$(({ track }) => {
 *     const count = track(() => store.count);
 *     store.doubleCount = 2 * count;
 *   });
 *
 *   // Debouncer task
 *   useTask$(({ track }) => {
 *     const doubleCount = track(() => store.doubleCount);
 *     const timer = setTimeout(() => {
 *       store.debounced = doubleCount;
 *     }, 2000);
 *     return () => {
 *       clearTimeout(timer);
 *     };
 *   });
 *   return (
 *     <div>
 *       <div>
 *         {store.count} / {store.doubleCount}
 *       </div>
 *       <div>{store.debounced}</div>
 *     </div>
 *   );
 * });
 * ```
 *
 * @public
 * @see `Tracker`
 */
// </docs>
const useTaskQrl = (qrl, opts) => {
    const { val, set, iCtx, i, elCtx } = useSequentialScope();
    if (val) {
        return;
    }
    assertQrl(qrl);
    const containerState = iCtx.$renderCtx$.$static$.$containerState$;
    const task = new Task(TaskFlagsIsDirty | TaskFlagsIsTask, i, elCtx.$element$, qrl, undefined);
    set(true);
    qrl.$resolveLazy$(containerState.$containerEl$);
    if (!elCtx.$tasks$) {
        elCtx.$tasks$ = [];
    }
    elCtx.$tasks$.push(task);
    waitAndRun(iCtx, () => runTask(task, containerState, iCtx.$renderCtx$));
    if (isServerPlatform()) {
        useRunTask(task, opts?.eagerness);
    }
};
/** @public */
const createComputedQrl = (qrl) => {
    assertQrl(qrl);
    const iCtx = useInvokeContext();
    const hostElement = iCtx.$hostElement$;
    const containerState = iCtx.$renderCtx$.$static$.$containerState$;
    const elCtx = getContext(hostElement, containerState);
    const signal = _createSignal(undefined, containerState, SIGNAL_UNASSIGNED | SIGNAL_IMMUTABLE, undefined);
    const task = new Task(TaskFlagsIsDirty | TaskFlagsIsTask | TaskFlagsIsComputed, 
    // Computed signals should update immediately
    0, elCtx.$element$, qrl, signal);
    qrl.$resolveLazy$(containerState.$containerEl$);
    (elCtx.$tasks$ ||= []).push(task);
    waitAndRun(iCtx, () => runComputed(task, containerState, iCtx.$renderCtx$));
    return signal;
};
/** @public */
const useComputedQrl = (qrl) => {
    return useConstant(() => createComputedQrl(qrl));
};
/**
 * Returns a computed signal which is calculated from the given function. A computed signal is a
 * signal which is calculated from other signals. When the signals change, the computed signal is
 * recalculated, and if the result changed, all tasks which are tracking the signal will be re-run
 * and all components that read the signal will be re-rendered.
 *
 * The function must be synchronous and must not have any side effects.
 *
 * Async functions are deprecated because:
 *
 * - When calculating the first time, it will see it's a promise and it will restart the render
 *   function.
 * - Qwik can't track used signals after the first await, which leads to subtle bugs.
 * - Both `useTask$` and `useResource$` are available, without these problems.
 *
 * In v2, async functions won't work.
 *
 * @public
 */
const useComputed$ = implicit$FirstArg(useComputedQrl);
/**
 * Returns read-only signal that updates when signals used in the `ComputedFn` change. Unlike
 * useComputed$, this is not a hook and it always creates a new signal.
 *
 * @deprecated This is a technology preview
 * @public
 */
const createComputed$ = implicit$FirstArg(createComputedQrl);
// <docs markdown="../readme.md#useTask">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useTask instead)
/**
 * Reruns the `taskFn` when the observed inputs change.
 *
 * Use `useTask` to observe changes on a set of inputs, and then re-execute the `taskFn` when those
 * inputs change.
 *
 * The `taskFn` only executes if the observed inputs change. To observe the inputs, use the `obs`
 * function to wrap property reads. This creates subscriptions that will trigger the `taskFn` to
 * rerun.
 *
 * @param task - Function which should be re-executed when changes to the inputs are detected
 * @public
 *
 * ### Example
 *
 * The `useTask` function is used to observe the `store.count` property. Any changes to the
 * `store.count` cause the `taskFn` to execute which in turn updates the `store.doubleCount` to
 * the double of `store.count`.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     count: 0,
 *     doubleCount: 0,
 *     debounced: 0,
 *   });
 *
 *   // Double count task
 *   useTask$(({ track }) => {
 *     const count = track(() => store.count);
 *     store.doubleCount = 2 * count;
 *   });
 *
 *   // Debouncer task
 *   useTask$(({ track }) => {
 *     const doubleCount = track(() => store.doubleCount);
 *     const timer = setTimeout(() => {
 *       store.debounced = doubleCount;
 *     }, 2000);
 *     return () => {
 *       clearTimeout(timer);
 *     };
 *   });
 *   return (
 *     <div>
 *       <div>
 *         {store.count} / {store.doubleCount}
 *       </div>
 *       <div>{store.debounced}</div>
 *     </div>
 *   );
 * });
 * ```
 *
 * @public
 * @see `Tracker`
 */
// </docs>
const useTask$ = /*#__PURE__*/ implicit$FirstArg(useTaskQrl);
// <docs markdown="../readme.md#useVisibleTask">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useVisibleTask instead)
/**
 * ```tsx
 * const Timer = component$(() => {
 *   const store = useStore({
 *     count: 0,
 *   });
 *
 *   useVisibleTask$(() => {
 *     // Only runs in the client
 *     const timer = setInterval(() => {
 *       store.count++;
 *     }, 500);
 *     return () => {
 *       clearInterval(timer);
 *     };
 *   });
 *
 *   return <div>{store.count}</div>;
 * });
 * ```
 *
 * @public
 */
// </docs>
const useVisibleTaskQrl = (qrl, opts) => {
    const { val, set, i, iCtx, elCtx } = useSequentialScope();
    const eagerness = opts?.strategy ?? 'intersection-observer';
    if (val) {
        if (isServerPlatform()) {
            useRunTask(val, eagerness);
        }
        return;
    }
    assertQrl(qrl);
    const task = new Task(TaskFlagsIsVisibleTask, i, elCtx.$element$, qrl, undefined);
    const containerState = iCtx.$renderCtx$.$static$.$containerState$;
    if (!elCtx.$tasks$) {
        elCtx.$tasks$ = [];
    }
    elCtx.$tasks$.push(task);
    set(task);
    useRunTask(task, eagerness);
    if (!isServerPlatform()) {
        qrl.$resolveLazy$(containerState.$containerEl$);
        notifyTask(task, containerState);
    }
};
// <docs markdown="../readme.md#useVisibleTask">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useVisibleTask instead)
/**
 * ```tsx
 * const Timer = component$(() => {
 *   const store = useStore({
 *     count: 0,
 *   });
 *
 *   useVisibleTask$(() => {
 *     // Only runs in the client
 *     const timer = setInterval(() => {
 *       store.count++;
 *     }, 500);
 *     return () => {
 *       clearInterval(timer);
 *     };
 *   });
 *
 *   return <div>{store.count}</div>;
 * });
 * ```
 *
 * @public
 */
// </docs>
const useVisibleTask$ = /*#__PURE__*/ implicit$FirstArg(useVisibleTaskQrl);
const isResourceTask = (task) => {
    return (task.$flags$ & TaskFlagsIsResource) !== 0;
};
const isComputedTask = (task) => {
    return (task.$flags$ & TaskFlagsIsComputed) !== 0;
};
const runSubscriber = async (task, containerState, rCtx) => {
    assertEqual(!!(task.$flags$ & TaskFlagsIsDirty), true, 'Resource is not dirty', task);
    if (isResourceTask(task)) {
        return runResource(task, containerState, rCtx);
    }
    else if (isComputedTask(task)) {
        return runComputed(task, containerState, rCtx);
    }
    else {
        return runTask(task, containerState, rCtx);
    }
};
const runResource = (task, containerState, rCtx, waitOn) => {
    task.$flags$ &= -17;
    cleanupTask(task);
    const el = task.$el$;
    const iCtx = newInvokeContext(rCtx.$static$.$locale$, el, undefined, TaskEvent);
    const { $subsManager$: subsManager } = containerState;
    iCtx.$renderCtx$ = rCtx;
    const taskFn = task.$qrl$.getFn(iCtx, () => {
        subsManager.$clearSub$(task);
    });
    const cleanups = [];
    const resource = task.$state$;
    assertDefined(resource, 'useResource: when running a resource, "task.r" must be a defined.', task);
    const track = (obj, prop) => {
        if (isFunction(obj)) {
            const ctx = newInvokeContext();
            ctx.$renderCtx$ = rCtx;
            ctx.$subscriber$ = [0, task];
            return invoke(ctx, obj);
        }
        const manager = getSubscriptionManager(obj);
        if (manager) {
            manager.$addSub$([0, task], prop);
        }
        else {
            logErrorAndStop(codeToText(QError_trackUseStore), obj);
        }
        if (prop) {
            return obj[prop];
        }
        else if (isSignal(obj)) {
            return obj.value;
        }
        else {
            return obj;
        }
    };
    const resourceTarget = unwrapProxy(resource);
    const opts = {
        track,
        cleanup(callback) {
            cleanups.push(callback);
        },
        cache(policy) {
            let milliseconds = 0;
            if (policy === 'immutable') {
                milliseconds = Infinity;
            }
            else {
                milliseconds = policy;
            }
            resource._cache = milliseconds;
        },
        previous: resourceTarget._resolved,
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
                resource._state = 'resolved';
                resource._resolved = value;
                resource._error = undefined;
                resolve(value);
            }
            else {
                done = true;
                resource.loading = false;
                resource._state = 'rejected';
                resource._error = value;
                reject(value);
            }
            return true;
        }
        return false;
    };
    // Execute mutation inside empty invocation
    invoke(iCtx, () => {
        resource._state = 'pending';
        resource.loading = !isServerPlatform();
        resource.value = new Promise((r, re) => {
            resolve = r;
            reject = re;
        });
    });
    task.$destroy$ = noSerialize(() => {
        done = true;
        cleanups.forEach((fn) => fn());
    });
    const promise = safeCall(() => maybeThen(waitOn, () => taskFn(opts)), (value) => {
        setState(true, value);
    }, (reason) => {
        setState(false, reason);
    });
    const timeout = resourceTarget._timeout;
    if (timeout > 0) {
        return Promise.race([
            promise,
            delay(timeout).then(() => {
                if (setState(false, new Error('timeout'))) {
                    cleanupTask(task);
                }
            }),
        ]);
    }
    return promise;
};
const runTask = (task, containerState, rCtx) => {
    task.$flags$ &= -17;
    cleanupTask(task);
    const hostElement = task.$el$;
    const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, undefined, TaskEvent);
    iCtx.$renderCtx$ = rCtx;
    const { $subsManager$: subsManager } = containerState;
    const taskFn = task.$qrl$.getFn(iCtx, () => {
        subsManager.$clearSub$(task);
    });
    const track = (obj, prop) => {
        if (isFunction(obj)) {
            const ctx = newInvokeContext();
            ctx.$subscriber$ = [0, task];
            return invoke(ctx, obj);
        }
        const manager = getSubscriptionManager(obj);
        if (manager) {
            manager.$addSub$([0, task], prop);
        }
        else {
            logErrorAndStop(codeToText(QError_trackUseStore), obj);
        }
        if (prop) {
            return obj[prop];
        }
        else if (isSignal(obj)) {
            return obj.value;
        }
        else {
            return obj;
        }
    };
    const cleanups = [];
    task.$destroy$ = noSerialize(() => {
        cleanups.forEach((fn) => fn());
    });
    const opts = {
        track,
        cleanup(callback) {
            cleanups.push(callback);
        },
    };
    return safeCall(() => taskFn(opts), (returnValue) => {
        if (isFunction(returnValue)) {
            cleanups.push(returnValue);
        }
    }, (reason) => {
        handleError(reason, hostElement, rCtx);
    });
};
const runComputed = (task, containerState, rCtx) => {
    assertSignal(task.$state$);
    task.$flags$ &= -17;
    cleanupTask(task);
    const hostElement = task.$el$;
    const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, undefined, ComputedEvent);
    iCtx.$subscriber$ = [0, task];
    iCtx.$renderCtx$ = rCtx;
    const { $subsManager$: subsManager } = containerState;
    const taskFn = task.$qrl$.getFn(iCtx, () => {
        subsManager.$clearSub$(task);
    });
    const ok = (returnValue) => {
        untrack(() => {
            const signal = task.$state$;
            signal[QObjectSignalFlags] &= -3;
            signal.untrackedValue = returnValue;
            signal[QObjectManagerSymbol].$notifySubs$();
        });
    };
    const fail = (reason) => {
        handleError(reason, hostElement, rCtx);
    };
    try {
        return maybeThen(task.$qrl$.$resolveLazy$(containerState.$containerEl$), () => {
            const result = taskFn();
            if (isPromise(result)) {
                const warningMessage = 'useComputed$: Async functions in computed tasks are deprecated and will stop working in v2. Use useTask$ or useResource$ instead.';
                const stack = new Error(warningMessage).stack;
                if (!stack) {
                    logOnceWarn(warningMessage);
                }
                else {
                    const lessScaryStack = stack.replace(/^Error:\s*/, '');
                    logOnceWarn(lessScaryStack);
                }
                return result.then(ok, fail);
            }
            else {
                ok(result);
            }
        });
    }
    catch (reason) {
        fail(reason);
    }
};
const cleanupTask = (task) => {
    const destroy = task.$destroy$;
    if (destroy) {
        task.$destroy$ = undefined;
        try {
            destroy();
        }
        catch (err) {
            logError(err);
        }
    }
};
const destroyTask = (task) => {
    if (task.$flags$ & TaskFlagsIsCleanup) {
        task.$flags$ &= -33;
        const cleanup = task.$qrl$;
        cleanup();
    }
    else {
        cleanupTask(task);
    }
};
const useRunTask = (task, eagerness) => {
    if (eagerness === 'visible' || eagerness === 'intersection-observer') {
        useOn('qvisible', getTaskHandlerQrl(task));
    }
    else if (eagerness === 'load' || eagerness === 'document-ready') {
        useOnDocument('qinit', getTaskHandlerQrl(task));
    }
    else if (eagerness === 'idle' || eagerness === 'document-idle') {
        useOnDocument('qidle', getTaskHandlerQrl(task));
    }
};
const getTaskHandlerQrl = (task) => {
    const taskQrl = task.$qrl$;
    const taskHandler = createQRL(taskQrl.$chunk$, '_hW', _hW, null, null, [task], taskQrl.$symbol$);
    // Needed for chunk lookup in dev mode
    if (taskQrl.dev) {
        taskHandler.dev = taskQrl.dev;
    }
    return taskHandler;
};
const isSubscriberDescriptor = (obj) => {
    return isObject(obj) && obj instanceof Task;
};
const serializeTask = (task, getObjId) => {
    let value = `${intToStr(task.$flags$)} ${intToStr(task.$index$)} ${getObjId(task.$qrl$)} ${getObjId(task.$el$)}`;
    if (task.$state$) {
        value += ` ${getObjId(task.$state$)}`;
    }
    return value;
};
const parseTask = (data) => {
    const [flags, index, qrl, el, resource] = data.split(' ');
    return new Task(strToInt(flags), strToInt(index), el, qrl, resource);
};
class Task {
    $flags$;
    $index$;
    $el$;
    $qrl$;
    $state$;
    constructor($flags$, $index$, $el$, $qrl$, $state$) {
        this.$flags$ = $flags$;
        this.$index$ = $index$;
        this.$el$ = $el$;
        this.$qrl$ = $qrl$;
        this.$state$ = $state$;
    }
}

function isElement(value) {
    return isNode(value) && value.nodeType === 1;
}
function isNode(value) {
    return value && typeof value.nodeType === 'number';
}

const HOST_FLAG_DIRTY = 1 << 0;
const HOST_FLAG_NEED_ATTACH_LISTENER = 1 << 1;
const HOST_FLAG_MOUNTED = 1 << 2;
const HOST_FLAG_DYNAMIC = 1 << 3;
const tryGetContext = (element) => {
    return element[Q_CTX];
};
const getContext = (el, containerState) => {
    assertQwikElement(el);
    const ctx = tryGetContext(el);
    if (ctx) {
        return ctx;
    }
    const elCtx = createContext(el);
    const elementID = directGetAttribute(el, 'q:id');
    if (elementID) {
        const pauseCtx = containerState.$pauseCtx$;
        elCtx.$id$ = elementID;
        if (pauseCtx) {
            const { getObject, meta, refs } = pauseCtx;
            if (isElement(el)) {
                const refMap = refs[elementID];
                if (refMap) {
                    elCtx.$refMap$ = refMap.split(' ').map(getObject);
                    elCtx.li = getDomListeners(elCtx, containerState.$containerEl$);
                }
            }
            else {
                const styleIds = el.getAttribute(QScopedStyle);
                elCtx.$scopeIds$ = styleIds ? styleIds.split('|') : null;
                const ctxMeta = meta[elementID];
                if (ctxMeta) {
                    const seq = ctxMeta.s;
                    const host = ctxMeta.h;
                    const contexts = ctxMeta.c;
                    const tasks = ctxMeta.w;
                    if (seq) {
                        elCtx.$seq$ = seq.split(' ').map(getObject);
                    }
                    if (tasks) {
                        elCtx.$tasks$ = tasks.split(' ').map(getObject);
                    }
                    if (contexts) {
                        elCtx.$contexts$ = new Map();
                        for (const part of contexts.split(' ')) {
                            const [key, value] = part.split('=');
                            elCtx.$contexts$.set(key, getObject(value));
                        }
                    }
                    // Restore sequence scoping
                    if (host) {
                        const [renderQrl, props] = host.split(' ');
                        elCtx.$flags$ = HOST_FLAG_MOUNTED;
                        if (renderQrl) {
                            elCtx.$componentQrl$ = getObject(renderQrl);
                        }
                        if (props) {
                            const propsObj = getObject(props);
                            elCtx.$props$ = propsObj;
                            setObjectFlags(propsObj, QObjectImmutable);
                            propsObj[_IMMUTABLE] = getImmutableFromProps(propsObj);
                        }
                        else {
                            elCtx.$props$ = createProxy(createPropsState(), containerState);
                        }
                    }
                }
            }
        }
    }
    return elCtx;
};
const getImmutableFromProps = (props) => {
    const immutable = {};
    const target = getProxyTarget(props);
    for (const key in target) {
        if (key.startsWith(_IMMUTABLE_PREFIX)) {
            immutable[key.slice(_IMMUTABLE_PREFIX.length)] = target[key];
        }
    }
    return immutable;
};
const createContext = (element) => {
    const ctx = {
        $flags$: 0,
        $id$: '',
        $element$: element,
        $refMap$: [],
        li: [],
        $tasks$: null,
        $seq$: null,
        $slots$: null,
        $scopeIds$: null,
        $appendStyles$: null,
        $props$: null,
        $vdom$: null,
        $componentQrl$: null,
        $contexts$: null,
        $dynamicSlots$: null,
        $parentCtx$: undefined,
        $realParentCtx$: undefined,
    };
    seal(ctx);
    element[Q_CTX] = ctx;
    return ctx;
};
const cleanupContext = (elCtx, subsManager) => {
    elCtx.$tasks$?.forEach((task) => {
        subsManager.$clearSub$(task);
        destroyTask(task);
    });
    elCtx.$componentQrl$ = null;
    elCtx.$seq$ = null;
    elCtx.$tasks$ = null;
};

let _locale = undefined;
/**
 * Retrieve the current locale.
 *
 * If no current locale and there is no `defaultLocale` the function throws an error.
 *
 * @returns The locale.
 * @internal
 */
function getLocale(defaultLocale) {
    if (_locale === undefined) {
        const ctx = tryGetInvokeContext();
        if (ctx && ctx.$locale$) {
            return ctx.$locale$;
        }
        if (defaultLocale !== undefined) {
            return defaultLocale;
        }
        throw new Error('Reading `locale` outside of context.');
    }
    return _locale;
}
/**
 * Override the `getLocale` with `lang` within the `fn` execution.
 *
 * @internal
 */
function withLocale(locale, fn) {
    const previousLang = _locale;
    try {
        _locale = locale;
        return fn();
    }
    finally {
        _locale = previousLang;
    }
}
/**
 * Globally set a lang.
 *
 * This can be used only in browser. Server execution requires that each request could potentially
 * be a different lang, therefore setting a global lang would produce incorrect responses.
 *
 * @param lang
 */
function setLocale(locale) {
    _locale = locale;
}

let _context;
/** @public */
const tryGetInvokeContext = () => {
    if (!_context) {
        const context = typeof document !== 'undefined' && document && document.__q_context__;
        if (!context) {
            return undefined;
        }
        if (isArray(context)) {
            return (document.__q_context__ = newInvokeContextFromTuple(context));
        }
        return context;
    }
    return _context;
};
const getInvokeContext = () => {
    const ctx = tryGetInvokeContext();
    if (!ctx) {
        throw qError(QError_useMethodOutsideContext);
    }
    return ctx;
};
const useInvokeContext = () => {
    const ctx = tryGetInvokeContext();
    if (!ctx || ctx.$event$ !== RenderEvent) {
        throw qError(QError_useInvokeContext);
    }
    assertDefined(ctx.$hostElement$, `invoke: $hostElement$ must be defined`, ctx);
    assertDefined(ctx.$waitOn$, `invoke: $waitOn$ must be defined`, ctx);
    assertDefined(ctx.$renderCtx$, `invoke: $renderCtx$ must be defined`, ctx);
    assertDefined(ctx.$subscriber$, `invoke: $subscriber$ must be defined`, ctx);
    return ctx;
};
const useContainerState = () => {
    const ctx = useInvokeContext();
    return ctx.$renderCtx$.$static$.$containerState$;
};
function useBindInvokeContext(fn) {
    if (fn == null) {
        return fn;
    }
    const ctx = getInvokeContext();
    return function (...args) {
        return (invokeApply).call(this, ctx, fn, args);
    };
}
/** Call a function with the given InvokeContext and given arguments. */
function invoke(context, fn, ...args) {
    return invokeApply.call(this, context, fn, args);
}
/** Call a function with the given InvokeContext and array of arguments. */
function invokeApply(context, fn, args) {
    const previousContext = _context;
    let returnValue;
    try {
        _context = context;
        returnValue = fn.apply(this, args);
    }
    finally {
        _context = previousContext;
    }
    return returnValue;
}
const waitAndRun = (ctx, callback) => {
    const waitOn = ctx.$waitOn$;
    if (waitOn.length === 0) {
        const result = callback();
        if (isPromise(result)) {
            waitOn.push(result);
        }
    }
    else {
        waitOn.push(Promise.all(waitOn).then(callback));
    }
};
const newInvokeContextFromTuple = ([element, event, url]) => {
    const container = element.closest(QContainerSelector);
    const locale = container?.getAttribute(QLocaleAttr) || undefined;
    locale && setLocale(locale);
    return newInvokeContext(locale, undefined, element, event, url);
};
// TODO how about putting url and locale (and event/custom?) in to a "static" object
const newInvokeContext = (locale, hostElement, element, event, url) => {
    // ServerRequestEvent has .locale, but it's not always defined.
    const $locale$ = locale || (typeof event === 'object' && event && 'locale' in event ? event.locale : undefined);
    const ctx = {
        $url$: url,
        $i$: 0,
        $hostElement$: hostElement,
        $element$: element,
        $event$: event,
        $qrl$: undefined,
        $waitOn$: undefined,
        $subscriber$: undefined,
        $renderCtx$: undefined,
        $locale$,
    };
    seal(ctx);
    return ctx;
};
const getWrappingContainer = (el) => {
    return el.closest(QContainerSelector);
};
/**
 * Don't track listeners for this callback
 *
 * @public
 */
const untrack = (fn) => {
    return invoke(undefined, fn);
};
const trackInvocation = /*#__PURE__*/ newInvokeContext(undefined, undefined, undefined, RenderEvent);
/**
 * Mark sub as a listener for the signal
 *
 * @public
 */
const trackSignal = (signal, sub) => {
    trackInvocation.$subscriber$ = sub;
    return invoke(trackInvocation, () => signal.value);
};
/** @internal */
const _getContextElement = () => {
    const iCtx = tryGetInvokeContext();
    if (iCtx) {
        return (iCtx.$element$ ?? iCtx.$hostElement$ ?? iCtx.$qrl$?.$setContainer$(undefined));
    }
};
/** @internal */
const _getContextEvent = () => {
    const iCtx = tryGetInvokeContext();
    if (iCtx) {
        return iCtx.$event$;
    }
};
/** @internal */
const _jsxBranch = (input) => {
    const iCtx = tryGetInvokeContext();
    if (iCtx && iCtx.$hostElement$ && iCtx.$renderCtx$) {
        const hostElement = iCtx.$hostElement$;
        const elCtx = getContext(hostElement, iCtx.$renderCtx$.$static$.$containerState$);
        elCtx.$flags$ |= HOST_FLAG_DYNAMIC;
    }
    return input;
};
/** @internal */
const _waitUntilRendered = (elm) => {
    const containerEl = getWrappingContainer(elm);
    if (!containerEl) {
        return Promise.resolve();
    }
    const containerState = _getContainerState(containerEl);
    return containerState.$renderPromise$ ?? Promise.resolve();
};

/** @internal */
const _createSignal = (value, containerState, flags, subscriptions) => {
    const manager = containerState.$subsManager$.$createManager$(subscriptions);
    const signal = new SignalImpl(value, manager, flags);
    return signal;
};
const QObjectSignalFlags = Symbol('proxy manager');
const SIGNAL_IMMUTABLE = 1 << 0;
const SIGNAL_UNASSIGNED = 1 << 1;
const SignalUnassignedException = Symbol('unassigned signal');
class SignalBase {
}
class SignalImpl extends SignalBase {
    untrackedValue;
    [QObjectManagerSymbol];
    [QObjectSignalFlags] = 0;
    constructor(v, manager, flags) {
        super();
        this.untrackedValue = v;
        this[QObjectManagerSymbol] = manager;
        this[QObjectSignalFlags] = flags;
    }
    // prevent accidental use as value
    valueOf() {
        if (qDev) {
            throw new TypeError('Cannot coerce a Signal, use `.value` instead');
        }
    }
    toString() {
        return `[Signal ${String(this.value)}]`;
    }
    toJSON() {
        return { value: this.value };
    }
    get value() {
        if (this[QObjectSignalFlags] & SIGNAL_UNASSIGNED) {
            throw SignalUnassignedException;
        }
        const sub = tryGetInvokeContext()?.$subscriber$;
        if (sub) {
            this[QObjectManagerSymbol].$addSub$(sub);
        }
        return this.untrackedValue;
    }
    set value(v) {
        if (qDev) {
            if (this[QObjectSignalFlags] & SIGNAL_IMMUTABLE) {
                throw new Error('Cannot mutate immutable signal');
            }
            if (qSerialize) {
                verifySerializable(v);
            }
            const invokeCtx = tryGetInvokeContext();
            if (invokeCtx) {
                if (invokeCtx.$event$ === RenderEvent) {
                    logWarn('State mutation inside render function. Use useTask$() instead.', invokeCtx.$hostElement$);
                }
                else if (invokeCtx.$event$ === ComputedEvent) {
                    logWarn('State mutation inside useComputed$() is an antipattern. Use useTask$() instead', invokeCtx.$hostElement$);
                }
                else if (invokeCtx.$event$ === ResourceEvent) {
                    logWarn('State mutation inside useResource$() is an antipattern. Use useTask$() instead', invokeCtx.$hostElement$);
                }
            }
        }
        const manager = this[QObjectManagerSymbol];
        const oldValue = this.untrackedValue;
        if (manager && oldValue !== v) {
            this.untrackedValue = v;
            manager.$notifySubs$();
        }
    }
}
class SignalDerived extends SignalBase {
    $func$;
    $args$;
    $funcStr$;
    constructor($func$, $args$, $funcStr$) {
        super();
        this.$func$ = $func$;
        this.$args$ = $args$;
        this.$funcStr$ = $funcStr$;
    }
    get value() {
        return this.$func$.apply(undefined, this.$args$);
    }
}
class SignalWrapper extends SignalBase {
    ref;
    prop;
    constructor(ref, prop) {
        super();
        this.ref = ref;
        this.prop = prop;
    }
    get [QObjectManagerSymbol]() {
        return getSubscriptionManager(this.ref);
    }
    get value() {
        return this.ref[this.prop];
    }
    set value(value) {
        this.ref[this.prop] = value;
    }
}
/**
 * Checks if a given object is a `Signal`.
 *
 * @param obj - The object to check if `Signal`.
 * @returns Boolean - True if the object is a `Signal`.
 * @public
 */
const isSignal = (obj) => {
    return obj instanceof SignalBase;
};
/** @internal */
const _wrapProp = (obj, prop) => {
    if (!isObject(obj)) {
        return obj[prop];
    }
    if (obj instanceof SignalBase) {
        assertEqual(prop, 'value', 'Left side is a signal, prop must be value');
        return obj;
    }
    const target = getProxyTarget(obj);
    if (target) {
        const signal = target[_IMMUTABLE_PREFIX + prop];
        if (signal) {
            assertTrue(isSignal(signal), `${_IMMUTABLE_PREFIX} has to be a signal kind`);
            return signal;
        }
        if (target[_IMMUTABLE]?.[prop] !== true) {
            return new SignalWrapper(obj, prop);
        }
    }
    const immutable = obj[_IMMUTABLE]?.[prop];
    if (isSignal(immutable)) {
        return immutable;
    }
    return _IMMUTABLE;
};
/** @internal */
const _wrapSignal = (obj, prop) => {
    const r = _wrapProp(obj, prop);
    if (r === _IMMUTABLE) {
        return obj[prop];
    }
    return r;
};

const CONTAINER_STATE = Symbol('ContainerState');
/** @internal */
const _getContainerState = (containerEl) => {
    let state = containerEl[CONTAINER_STATE];
    if (!state) {
        containerEl[CONTAINER_STATE] = state = createContainerState(containerEl, directGetAttribute(containerEl, 'q:base') ?? '/');
    }
    return state;
};
const createContainerState = (containerEl, base) => {
    const containerAttributes = {};
    if (containerEl) {
        const attrs = containerEl.attributes;
        if (attrs) {
            for (let index = 0; index < attrs.length; index++) {
                const attr = attrs[index];
                containerAttributes[attr.name] = attr.value;
            }
        }
    }
    const containerState = {
        $containerEl$: containerEl,
        $elementIndex$: 0,
        $styleMoved$: false,
        $proxyMap$: new WeakMap(),
        $opsNext$: new Set(),
        $taskNext$: new Set(),
        $taskStaging$: new Set(),
        $hostsNext$: new Set(),
        $hostsStaging$: new Set(),
        $styleIds$: new Set(),
        $events$: new Set(),
        $serverData$: { containerAttributes },
        $base$: base,
        $renderPromise$: undefined,
        $hostsRendering$: undefined,
        $pauseCtx$: undefined,
        $subsManager$: null,
        $inlineFns$: new Map(),
    };
    seal(containerState);
    containerState.$subsManager$ = createSubscriptionManager(containerState);
    return containerState;
};
const removeContainerState = (containerEl) => {
    delete containerEl[CONTAINER_STATE];
};
const setRef = (value, elm) => {
    if (isFunction(value)) {
        return value(elm);
    }
    else if (isSignal(value)) {
        if (isServerPlatform()) {
            // During SSR, assigning a ref should not cause reactivity because
            // the expectation is that the ref is filled in on the client
            return (value.untrackedValue = elm);
        }
        else {
            return (value.value = elm);
        }
    }
    throw qError(QError_invalidRefValue, value);
};
const SHOW_ELEMENT = 1;
const SHOW_COMMENT$1 = 128;
const FILTER_REJECT$1 = 2;
const FILTER_SKIP = 3;
const isContainer$1 = (el) => {
    return isElement$1(el) && el.hasAttribute(QContainerAttr);
};
const intToStr = (nu) => {
    return nu.toString(36);
};
const strToInt = (nu) => {
    return parseInt(nu, 36);
};
const getEventName = (attribute) => {
    const colonPos = attribute.indexOf(':');
    if (attribute) {
        return fromKebabToCamelCase(attribute.slice(colonPos + 1));
    }
    else {
        return attribute;
    }
};

const SVG_NS = 'http://www.w3.org/2000/svg';
const IS_SVG = 1 << 0;
const IS_HEAD = 1 << 1;
const IS_IMMUTABLE = 1 << 2;
const CHILDREN_PLACEHOLDER = [];
const smartUpdateChildren = (ctx, oldVnode, newVnode, flags) => {
    assertQwikElement(oldVnode.$elm$);
    const ch = newVnode.$children$;
    if (ch.length === 1 && ch[0].$type$ === SKIP_RENDER_TYPE) {
        newVnode.$children$ = oldVnode.$children$;
        return;
    }
    const elm = oldVnode.$elm$;
    const needsDOMRead = oldVnode.$children$ === CHILDREN_PLACEHOLDER;
    let filter = isChildComponent;
    if (needsDOMRead) {
        const isHead = elm.nodeName === 'HEAD';
        if (isHead) {
            filter = isHeadChildren;
            flags |= IS_HEAD;
        }
    }
    const oldCh = getVnodeChildren(oldVnode, filter);
    if (oldCh.length > 0 && ch.length > 0) {
        return diffChildren(ctx, elm, oldCh, ch, flags);
    }
    else if (oldCh.length > 0 && ch.length === 0) {
        return removeChildren(ctx.$static$, oldCh, 0, oldCh.length - 1);
    }
    else if (ch.length > 0) {
        return addChildren(ctx, elm, null, ch, 0, ch.length - 1, flags);
    }
};
const getVnodeChildren = (oldVnode, filter) => {
    const oldCh = oldVnode.$children$;
    const elm = oldVnode.$elm$;
    if (oldCh === CHILDREN_PLACEHOLDER) {
        return (oldVnode.$children$ = getChildrenVnodes(elm, filter));
    }
    return oldCh;
};
const diffChildren = (ctx, parentElm, oldCh, newCh, flags) => {
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
    const staticCtx = ctx.$static$;
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
        else if (oldStartVnode.$id$ === newStartVnode.$id$) {
            results.push(diffVnode(ctx, oldStartVnode, newStartVnode, flags));
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (oldEndVnode.$id$ === newEndVnode.$id$) {
            results.push(diffVnode(ctx, oldEndVnode, newEndVnode, flags));
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (oldStartVnode.$key$ && oldStartVnode.$id$ === newEndVnode.$id$) {
            assertDefined(oldStartVnode.$elm$, 'oldStartVnode $elm$ must be defined');
            assertDefined(oldEndVnode.$elm$, 'oldEndVnode $elm$ must be defined');
            // Vnode moved right
            results.push(diffVnode(ctx, oldStartVnode, newEndVnode, flags));
            insertAfter(staticCtx, parentElm, oldStartVnode.$elm$, oldEndVnode.$elm$);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (oldEndVnode.$key$ && oldEndVnode.$id$ === newStartVnode.$id$) {
            assertDefined(oldStartVnode.$elm$, 'oldStartVnode $elm$ must be defined');
            assertDefined(oldEndVnode.$elm$, 'oldEndVnode $elm$ must be defined');
            // Vnode moved left
            results.push(diffVnode(ctx, oldEndVnode, newStartVnode, flags));
            insertBefore(staticCtx, parentElm, oldEndVnode.$elm$, oldStartVnode.$elm$);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }
            idxInOld = oldKeyToIdx[newStartVnode.$key$];
            if (idxInOld === undefined) {
                // New element
                const newElm = createElm(ctx, newStartVnode, flags, results);
                insertBefore(staticCtx, parentElm, newElm, oldStartVnode?.$elm$);
            }
            else {
                elmToMove = oldCh[idxInOld];
                if (elmToMove.$type$ !== newStartVnode.$type$) {
                    const newElm = createElm(ctx, newStartVnode, flags, results);
                    // TO CHECK: should we not await these promises?
                    maybeThen(newElm, (newElm) => {
                        insertBefore(staticCtx, parentElm, newElm, oldStartVnode?.$elm$);
                    });
                }
                else {
                    results.push(diffVnode(ctx, elmToMove, newStartVnode, flags));
                    oldCh[idxInOld] = undefined;
                    assertDefined(elmToMove.$elm$, 'elmToMove $elm$ must be defined');
                    insertBefore(staticCtx, parentElm, elmToMove.$elm$, oldStartVnode.$elm$);
                }
            }
            newStartVnode = newCh[++newStartIdx];
        }
    }
    if (newStartIdx <= newEndIdx) {
        const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$;
        results.push(addChildren(ctx, parentElm, before, newCh, newStartIdx, newEndIdx, flags));
    }
    let wait = promiseAll(results);
    if (oldStartIdx <= oldEndIdx) {
        wait = maybeThen(wait, () => {
            removeChildren(staticCtx, oldCh, oldStartIdx, oldEndIdx);
        });
    }
    return wait;
};
const getChildren = (elm, filter) => {
    const end = isVirtualElement(elm) ? elm.close : null;
    const nodes = [];
    let node = elm.firstChild;
    while ((node = processVirtualNodes(node))) {
        if (filter(node)) {
            nodes.push(node);
        }
        node = node.nextSibling;
        if (node === end) {
            break;
        }
    }
    return nodes;
};
// export const getChildren = (elm: QwikElement, mode: ChildrenMode): (Node | VirtualElement)[] => {
//   // console.warn('DOM READ: getChildren()', elm);
//   switch (mode) {
//     case 'root':
//       return getCh(elm, isChildComponent);
//     case 'head':
//       return getCh(elm, isHeadChildren);
//     case 'elements':
//       return getCh(elm, isNodeElement);
//   }
// };
const getChildrenVnodes = (elm, filter) => {
    return getChildren(elm, filter).map(getVnodeFromEl);
};
const getVnodeFromEl = (el) => {
    if (isElement$1(el)) {
        return tryGetContext(el)?.$vdom$ ?? domToVnode(el);
    }
    return domToVnode(el);
};
const domToVnode = (node) => {
    if (isQwikElement(node)) {
        const t = new ProcessedJSXNodeImpl(node.localName, {}, null, CHILDREN_PLACEHOLDER, 0, getKey(node));
        t.$elm$ = node;
        return t;
    }
    else if (isText(node)) {
        const t = new ProcessedJSXNodeImpl(node.nodeName, EMPTY_OBJ, null, CHILDREN_PLACEHOLDER, 0, null);
        t.$text$ = node.data;
        t.$elm$ = node;
        return t;
    }
    assertFail('Invalid node type');
};
const isHeadChildren = (node) => {
    const type = node.nodeType;
    if (type === 1) {
        return node.hasAttribute('q:head');
    }
    return type === 111;
};
const isSlotTemplate = (node) => {
    return node.nodeName === 'Q:TEMPLATE';
};
const isChildComponent = (node) => {
    const type = node.nodeType;
    if (type === 3 || type === 111) {
        return true;
    }
    if (type !== 1) {
        return false;
    }
    const nodeName = node.nodeName;
    if (nodeName === 'Q:TEMPLATE') {
        return false;
    }
    if (nodeName === 'HEAD') {
        return node.hasAttribute('q:head');
    }
    if (nodeName === 'STYLE') {
        return !node.hasAttribute(QStyle);
    }
    return true;
};
const splitChildren = (input) => {
    const output = {};
    for (const item of input) {
        const key = getSlotName(item);
        const node = output[key] ??
            (output[key] = new ProcessedJSXNodeImpl(VIRTUAL, {
                [QSlotS]: '',
            }, null, [], 0, key));
        node.$children$.push(item);
    }
    return output;
};
const diffVnode = (rCtx, oldVnode, newVnode, flags) => {
    assertEqual(oldVnode.$type$, newVnode.$type$, 'old and new vnodes type must be the same');
    assertEqual(oldVnode.$key$, newVnode.$key$, 'old and new vnodes key must be the same');
    assertEqual(oldVnode.$id$, newVnode.$id$, 'old and new vnodes key must be the same');
    const elm = oldVnode.$elm$;
    const tag = newVnode.$type$;
    const staticCtx = rCtx.$static$;
    const containerState = staticCtx.$containerState$;
    const currentComponent = rCtx.$cmpCtx$;
    assertDefined(elm, 'while patching element must be defined');
    assertDefined(currentComponent, 'while patching current component must be defined');
    newVnode.$elm$ = elm;
    // Render text nodes
    if (tag === '#text') {
        staticCtx.$visited$.push(elm);
        const signal = newVnode.$signal$;
        if (signal) {
            newVnode.$text$ = jsxToString(trackSignal(signal, [4, currentComponent.$element$, signal, elm]));
        }
        setProperty(staticCtx, elm, 'data', newVnode.$text$);
        return;
    }
    else if (tag === '#signal') {
        return;
    }
    assertQwikElement(elm);
    const props = newVnode.$props$;
    const vnodeFlags = newVnode.$flags$;
    const elCtx = getContext(elm, containerState);
    if (tag !== VIRTUAL) {
        // Track SVG state
        let isSvg = (flags & IS_SVG) !== 0;
        if (!isSvg && tag === 'svg') {
            flags |= IS_SVG;
            isSvg = true;
        }
        if (props !== EMPTY_OBJ) {
            // elCtx.$vdom$ = newVnode;
            if ((vnodeFlags & static_listeners) === 0) {
                elCtx.li.length = 0;
            }
            const values = oldVnode.$props$;
            newVnode.$props$ = values;
            for (const prop in props) {
                let newValue = props[prop];
                if (prop === 'ref') {
                    assertElement(elm);
                    if (newValue !== undefined) {
                        setRef(newValue, elm);
                    }
                    continue;
                }
                if (isOnProp(prop)) {
                    const normalized = setEvent(elCtx.li, prop, newValue, containerState.$containerEl$);
                    addQwikEvent(staticCtx, elm, normalized);
                    continue;
                }
                if (isSignal(newValue)) {
                    newValue = trackSignal(newValue, [1, currentComponent.$element$, newValue, elm, prop]);
                }
                if (prop === 'class') {
                    newValue = serializeClassWithHost(newValue, currentComponent);
                }
                else if (prop === 'style') {
                    newValue = stringifyStyle(newValue);
                }
                if (values[prop] !== newValue) {
                    values[prop] = newValue;
                    smartSetProperty(staticCtx, elm, prop, newValue, isSvg);
                }
            }
        }
        if (vnodeFlags & static_subtree) {
            return;
        }
        if (isSvg && tag === 'foreignObject') {
            flags &= -2;
        }
        const setsInnerHTML = props[dangerouslySetInnerHTML] !== undefined;
        if (setsInnerHTML) {
            if (qDev && newVnode.$children$.length > 0) {
                logWarn('Node can not have children when innerHTML is set');
            }
            return;
        }
        if (tag === 'textarea') {
            return;
        }
        return smartUpdateChildren(rCtx, oldVnode, newVnode, flags);
    }
    else if (OnRenderProp in props) {
        const cmpProps = props.props;
        setComponentProps(containerState, elCtx, cmpProps);
        let needsRender = !!(elCtx.$flags$ & HOST_FLAG_DIRTY);
        // TODO: review this corner case
        if (!needsRender && !elCtx.$componentQrl$ && !elCtx.$element$.hasAttribute(ELEMENT_ID)) {
            setQId(rCtx, elCtx);
            elCtx.$componentQrl$ = cmpProps[OnRenderProp];
            assertQrl(elCtx.$componentQrl$);
            needsRender = true;
        }
        // Rendering of children of component is more complicated,
        // since the children must be projected into the rendered slots
        // In addition, nested children might need rerendering, if that's the case
        // we need to render the nested component, and wait before projecting the content
        // since otherwise we don't know where the slots
        if (needsRender) {
            return maybeThen(renderComponent(rCtx, elCtx, flags), () => renderContentProjection(rCtx, elCtx, newVnode, flags));
        }
        return renderContentProjection(rCtx, elCtx, newVnode, flags);
    }
    else if (QSlotS in props) {
        assertDefined(currentComponent.$slots$, 'current component slots must be a defined array');
        currentComponent.$slots$.push(newVnode);
        return;
    }
    else if (dangerouslySetInnerHTML in props) {
        setProperty(staticCtx, elm, 'innerHTML', props[dangerouslySetInnerHTML]);
        return;
    }
    if (vnodeFlags & static_subtree) {
        return;
    }
    return smartUpdateChildren(rCtx, oldVnode, newVnode, flags);
};
const renderContentProjection = (rCtx, hostCtx, vnode, flags) => {
    if (vnode.$flags$ & static_subtree) {
        return;
    }
    const newChildren = vnode.$children$;
    const staticCtx = rCtx.$static$;
    const splittedNewChildren = splitChildren(newChildren);
    const slotMaps = getSlotMap(hostCtx);
    // Remove content from empty slots
    for (const key in slotMaps.slots) {
        if (!splittedNewChildren[key]) {
            const slotEl = slotMaps.slots[key];
            const oldCh = getChildrenVnodes(slotEl, isChildComponent);
            if (oldCh.length > 0) {
                // getVdom(slotEl).$children$ = [];
                const slotCtx = tryGetContext(slotEl);
                if (slotCtx && slotCtx.$vdom$) {
                    slotCtx.$vdom$.$children$ = [];
                }
                removeChildren(staticCtx, oldCh, 0, oldCh.length - 1);
            }
        }
    }
    // Remove empty templates
    for (const key in slotMaps.templates) {
        const templateEl = slotMaps.templates[key];
        if (templateEl && !splittedNewChildren[key]) {
            slotMaps.templates[key] = undefined;
            removeNode(staticCtx, templateEl);
        }
    }
    // Render into slots
    return promiseAll(Object.keys(splittedNewChildren).map((slotName) => {
        const newVdom = splittedNewChildren[slotName];
        const slotCtx = getSlotCtx(staticCtx, slotMaps, hostCtx, slotName, rCtx.$static$.$containerState$);
        const oldVdom = getVdom(slotCtx);
        const slotRctx = pushRenderContext(rCtx);
        const slotEl = slotCtx.$element$;
        slotRctx.$slotCtx$ = slotCtx;
        slotCtx.$vdom$ = newVdom;
        newVdom.$elm$ = slotEl;
        let newFlags = flags & -2;
        if (slotEl.isSvg) {
            newFlags |= IS_SVG;
        }
        const index = staticCtx.$addSlots$.findIndex((slot) => slot[0] === slotEl);
        if (index >= 0) {
            staticCtx.$addSlots$.splice(index, 1);
        }
        return smartUpdateChildren(slotRctx, oldVdom, newVdom, newFlags);
    }));
};
const addChildren = (ctx, parentElm, before, vnodes, startIdx, endIdx, flags) => {
    const promises = [];
    for (; startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx];
        assertDefined(ch, 'render: node must be defined at index', startIdx, vnodes);
        const elm = createElm(ctx, ch, flags, promises);
        insertBefore(ctx.$static$, parentElm, elm, before);
    }
    return promiseAllLazy(promises);
};
const removeChildren = (staticCtx, nodes, startIdx, endIdx) => {
    for (; startIdx <= endIdx; ++startIdx) {
        const ch = nodes[startIdx];
        if (ch) {
            assertDefined(ch.$elm$, 'vnode elm must be defined');
            removeNode(staticCtx, ch.$elm$);
        }
    }
};
const getSlotCtx = (staticCtx, slotMaps, hostCtx, slotName, containerState) => {
    // If a slot is known, render children inside
    const slotEl = slotMaps.slots[slotName];
    if (slotEl) {
        return getContext(slotEl, containerState);
    }
    // Otherwise we park the children in a template
    const templateEl = slotMaps.templates[slotName];
    if (templateEl) {
        return getContext(templateEl, containerState);
    }
    const template = createTemplate(staticCtx.$doc$, slotName);
    const elCtx = createContext(template);
    elCtx.$parentCtx$ = hostCtx;
    prepend(staticCtx, hostCtx.$element$, template);
    slotMaps.templates[slotName] = template;
    return elCtx;
};
const getSlotName = (node) => {
    return node.$props$[QSlot] ?? '';
};
const createElm = (rCtx, vnode, flags, promises) => {
    const tag = vnode.$type$;
    const doc = rCtx.$static$.$doc$;
    const currentComponent = rCtx.$cmpCtx$;
    if (tag === '#text') {
        return (vnode.$elm$ = doc.createTextNode(vnode.$text$));
    }
    if (tag === '#signal') {
        const signal = vnode.$signal$;
        assertDefined(signal, 'expecting signal here');
        assertDefined(currentComponent, 'signals can not be used outside components');
        const signalValue = signal.value;
        if (isJSXNode(signalValue)) {
            // convert signal value to ProcessedJSXNode
            const processedSignal = processData(signalValue);
            if (isSignal(processedSignal)) {
                throw new Error('NOT IMPLEMENTED: Promise');
            }
            else if (Array.isArray(processedSignal)) {
                throw new Error('NOT IMPLEMENTED: Array');
            }
            else {
                // crate elements
                const elm = createElm(rCtx, processedSignal, flags, promises);
                // create subscription
                trackSignal(signal, flags & IS_IMMUTABLE
                    ? [3, elm, signal, elm]
                    : [4, currentComponent.$element$, signal, elm]);
                // update the vNode for future diff.
                return (vnode.$elm$ = elm);
            }
        }
        else {
            // create element
            const elm = doc.createTextNode(vnode.$text$);
            elm.data = vnode.$text$ = jsxToString(signalValue);
            // create subscription
            trackSignal(signal, flags & IS_IMMUTABLE
                ? [3, elm, signal, elm]
                : [4, currentComponent.$element$, signal, elm]);
            // update the vNode for future diff.
            return (vnode.$elm$ = elm);
        }
    }
    let elm;
    let isSvg = !!(flags & IS_SVG);
    if (!isSvg && tag === 'svg') {
        flags |= IS_SVG;
        isSvg = true;
    }
    const isVirtual = tag === VIRTUAL;
    const props = vnode.$props$;
    const staticCtx = rCtx.$static$;
    const containerState = staticCtx.$containerState$;
    if (isVirtual) {
        elm = newVirtualElement(doc, isSvg);
    }
    else if (tag === 'head') {
        elm = doc.head;
        flags |= IS_HEAD;
    }
    else {
        elm = createElement(doc, tag, isSvg);
        flags &= -3;
    }
    if (vnode.$flags$ & static_subtree) {
        flags |= IS_IMMUTABLE;
    }
    vnode.$elm$ = elm;
    const elCtx = createContext(elm);
    if (rCtx.$slotCtx$) {
        elCtx.$parentCtx$ = rCtx.$slotCtx$;
        elCtx.$realParentCtx$ = rCtx.$cmpCtx$;
    }
    else {
        elCtx.$parentCtx$ = rCtx.$cmpCtx$;
    }
    if (!isVirtual) {
        if (qDev && qInspector) {
            const dev = vnode.$dev$;
            if (dev) {
                directSetAttribute(elm, 'data-qwik-inspector', `${dev.fileName}:${dev.lineNumber}:${dev.columnNumber}`);
            }
        }
        if (vnode.$immutableProps$) {
            const immProps = props !== EMPTY_OBJ
                ? Object.fromEntries(Object.entries(vnode.$immutableProps$).map(([k, v]) => [
                    k,
                    v === _IMMUTABLE ? props[k] : v,
                ]))
                : vnode.$immutableProps$;
            setProperties(staticCtx, elCtx, currentComponent, immProps, isSvg, true);
        }
        if (props !== EMPTY_OBJ) {
            elCtx.$vdom$ = vnode;
            const p = vnode.$immutableProps$
                ? Object.fromEntries(Object.entries(props).filter(([k]) => !(k in vnode.$immutableProps$)))
                : props;
            vnode.$props$ = setProperties(staticCtx, elCtx, currentComponent, p, isSvg, false);
        }
        if (isSvg && tag === 'foreignObject') {
            isSvg = false;
            flags &= -2;
        }
        if (currentComponent) {
            const scopedIds = currentComponent.$scopeIds$;
            if (scopedIds) {
                scopedIds.forEach((styleId) => {
                    elm.classList.add(styleId);
                });
            }
            if (currentComponent.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER) {
                elCtx.li.push(...currentComponent.li);
                currentComponent.$flags$ &= -3;
            }
        }
        for (const listener of elCtx.li) {
            addQwikEvent(staticCtx, elm, listener[0]);
        }
        const setsInnerHTML = props[dangerouslySetInnerHTML] !== undefined;
        if (setsInnerHTML) {
            if (qDev && vnode.$children$.length > 0) {
                logWarn('Node can not have children when innerHTML is set');
            }
            return elm;
        }
        if (isSvg && tag === 'foreignObject') {
            isSvg = false;
            flags &= -2;
        }
    }
    else if (OnRenderProp in props) {
        const renderQRL = props[OnRenderProp];
        assertQrl(renderQRL);
        const target = createPropsState();
        const manager = containerState.$subsManager$.$createManager$();
        const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
        const expectProps = props.props;
        containerState.$proxyMap$.set(target, proxy);
        elCtx.$props$ = proxy;
        if (expectProps !== EMPTY_OBJ) {
            const immutableMeta = (target[_IMMUTABLE] =
                expectProps[_IMMUTABLE] ?? EMPTY_OBJ);
            for (const prop in expectProps) {
                if (prop !== 'children' && prop !== QSlot) {
                    const immutableValue = immutableMeta[prop];
                    if (isSignal(immutableValue)) {
                        target[_IMMUTABLE_PREFIX + prop] = immutableValue;
                    }
                    else {
                        target[prop] = expectProps[prop];
                    }
                }
            }
        }
        setQId(rCtx, elCtx);
        // Run mount hook
        elCtx.$componentQrl$ = renderQRL;
        const wait = maybeThen(renderComponent(rCtx, elCtx, flags), () => {
            let children = vnode.$children$;
            if (children.length === 0) {
                return;
            }
            if (children.length === 1 && children[0].$type$ === SKIP_RENDER_TYPE) {
                children = children[0].$children$;
            }
            const slotMap = getSlotMap(elCtx);
            const p = [];
            const splittedNewChildren = splitChildren(children);
            for (const slotName in splittedNewChildren) {
                const newVnode = splittedNewChildren[slotName];
                const slotCtx = getSlotCtx(staticCtx, slotMap, elCtx, slotName, staticCtx.$containerState$);
                const slotRctx = pushRenderContext(rCtx);
                const slotEl = slotCtx.$element$;
                slotRctx.$slotCtx$ = slotCtx;
                slotCtx.$vdom$ = newVnode;
                newVnode.$elm$ = slotEl;
                let newFlags = flags & -2;
                if (slotEl.isSvg) {
                    newFlags |= IS_SVG;
                }
                for (const node of newVnode.$children$) {
                    const nodeElm = createElm(slotRctx, node, newFlags, p);
                    assertDefined(node.$elm$, 'vnode elm must be defined');
                    assertEqual(nodeElm, node.$elm$, 'vnode elm must be defined');
                    appendChild(staticCtx, slotEl, nodeElm);
                }
            }
            return promiseAllLazy(p);
        });
        if (isPromise(wait)) {
            promises.push(wait);
        }
        return elm;
    }
    else if (QSlotS in props) {
        assertDefined(currentComponent, 'slot can only be used inside component');
        assertDefined(currentComponent.$slots$, 'current component slots must be a defined array');
        setKey(elm, vnode.$key$);
        directSetAttribute(elm, QSlotRef, currentComponent.$id$);
        directSetAttribute(elm, QSlotS, '');
        currentComponent.$slots$.push(vnode);
        staticCtx.$addSlots$.push([elm, currentComponent.$element$]);
    }
    else if (dangerouslySetInnerHTML in props) {
        setProperty(staticCtx, elm, 'innerHTML', props[dangerouslySetInnerHTML]);
        return elm;
    }
    let children = vnode.$children$;
    if (children.length === 0) {
        return elm;
    }
    if (children.length === 1 && children[0].$type$ === SKIP_RENDER_TYPE) {
        children = children[0].$children$;
    }
    const nodes = children.map((ch) => createElm(rCtx, ch, flags, promises));
    for (const node of nodes) {
        directAppendChild(elm, node);
    }
    return elm;
};
const getSlots = (elCtx) => {
    const slots = elCtx.$slots$;
    if (!slots) {
        const parent = elCtx.$element$.parentElement;
        assertDefined(parent, 'component should be already attached to the dom');
        return (elCtx.$slots$ = readDOMSlots(elCtx));
    }
    return slots;
};
const getSlotMap = (elCtx) => {
    const slotsArray = getSlots(elCtx);
    const slots = {};
    const templates = {};
    const t = Array.from(elCtx.$element$.childNodes).filter(isSlotTemplate);
    // Map virtual slots
    for (const vnode of slotsArray) {
        assertQwikElement(vnode.$elm$);
        slots[vnode.$key$ ?? ''] = vnode.$elm$;
    }
    // Map templates
    for (const elm of t) {
        templates[directGetAttribute(elm, QSlot) ?? ''] = elm;
    }
    return { slots, templates };
};
const readDOMSlots = (elCtx) => {
    const parent = elCtx.$element$.parentElement;
    assertDefined(parent, 'component should be already attached to the dom');
    return queryAllVirtualByAttribute(parent, QSlotRef, elCtx.$id$).map(domToVnode);
};
const handleStyle = (ctx, elm, newValue) => {
    setProperty(ctx, elm.style, 'cssText', newValue);
    return true;
};
const handleClass = (ctx, elm, newValue) => {
    assertTrue(newValue == null || typeof newValue === 'string', 'class newValue must be either nullish or string', newValue);
    if (elm.namespaceURI === SVG_NS) {
        setAttribute(ctx, elm, 'class', newValue);
    }
    else {
        setProperty(ctx, elm, 'className', newValue);
    }
    return true;
};
const checkBeforeAssign = (ctx, elm, newValue, prop) => {
    if (prop in elm) {
        // a selected <option> is different from a selected <option value> (innerText vs '')
        if (elm[prop] !== newValue || (prop === 'value' && !elm.hasAttribute(prop))) {
            if (
            // we must set value last so that it adheres to min,max,step
            prop === 'value' &&
                // but we must also set options first so they are present before updating select
                elm.tagName !== 'OPTION') {
                setPropertyPost(ctx, elm, prop, newValue);
            }
            else {
                setProperty(ctx, elm, prop, newValue);
            }
        }
        return true;
    }
    return false;
};
const forceAttribute = (ctx, elm, newValue, prop) => {
    setAttribute(ctx, elm, prop.toLowerCase(), newValue);
    return true;
};
const setInnerHTML = (ctx, elm, newValue) => {
    setProperty(ctx, elm, 'innerHTML', newValue);
    return true;
};
const noop = () => {
    return true;
};
const PROP_HANDLER_MAP = {
    style: handleStyle,
    class: handleClass,
    className: handleClass,
    value: checkBeforeAssign,
    checked: checkBeforeAssign,
    href: forceAttribute,
    list: forceAttribute,
    form: forceAttribute,
    tabIndex: forceAttribute,
    download: forceAttribute,
    innerHTML: noop,
    [dangerouslySetInnerHTML]: setInnerHTML,
};
const smartSetProperty = (staticCtx, elm, prop, newValue, isSvg) => {
    // aria attribute value should be rendered as string
    if (isAriaAttribute(prop)) {
        setAttribute(staticCtx, elm, prop, newValue != null ? String(newValue) : newValue);
        return;
    }
    // Check if its an exception
    const exception = PROP_HANDLER_MAP[prop];
    if (exception) {
        if (exception(staticCtx, elm, newValue, prop)) {
            return;
        }
    }
    // Check if property in prototype
    if (!isSvg && prop in elm) {
        setProperty(staticCtx, elm, prop, newValue);
        return;
    }
    if (prop.startsWith(PREVENT_DEFAULT)) {
        registerQwikEvent(prop.slice(PREVENT_DEFAULT.length));
    }
    // Fallback to render attribute
    setAttribute(staticCtx, elm, prop, newValue);
};
const setProperties = (staticCtx, elCtx, hostCtx, newProps, isSvg, immutable) => {
    const values = {};
    const elm = elCtx.$element$;
    for (const prop in newProps) {
        let newValue = newProps[prop];
        if (prop === 'ref') {
            assertElement(elm);
            if (newValue !== undefined) {
                setRef(newValue, elm);
            }
            continue;
        }
        if (isOnProp(prop)) {
            setEvent(elCtx.li, prop, newValue, staticCtx.$containerState$.$containerEl$);
            continue;
        }
        if (isSignal(newValue)) {
            assertDefined(hostCtx, 'Signals can only be used in components');
            newValue = trackSignal(newValue, immutable
                ? [1, elm, newValue, hostCtx.$element$, prop]
                : [2, hostCtx.$element$, newValue, elm, prop]);
        }
        if (prop === 'class') {
            if (qDev && values.class) {
                throw new TypeError('Can only provide one of class or className');
            }
            newValue = serializeClassWithHost(newValue, hostCtx);
            if (!newValue) {
                continue;
            }
        }
        else if (prop === 'style') {
            newValue = stringifyStyle(newValue);
        }
        values[prop] = newValue;
        smartSetProperty(staticCtx, elm, prop, newValue, isSvg);
    }
    return values;
};
const setComponentProps = (containerState, elCtx, expectProps) => {
    let props = elCtx.$props$;
    if (!props) {
        elCtx.$props$ = props = createProxy(createPropsState(), containerState);
    }
    if (expectProps === EMPTY_OBJ) {
        return;
    }
    const manager = getSubscriptionManager(props);
    assertDefined(manager, `props have to be a proxy, but it is not`, props);
    const target = getProxyTarget(props);
    assertDefined(target, `props have to be a proxy, but it is not`, props);
    const immutableMeta = (target[_IMMUTABLE] =
        expectProps[_IMMUTABLE] ?? EMPTY_OBJ);
    for (const prop in expectProps) {
        if (prop !== 'children' && prop !== QSlot && !immutableMeta[prop]) {
            const value = expectProps[prop];
            if (target[prop] !== value) {
                target[prop] = value;
                manager.$notifySubs$(prop);
            }
        }
    }
};
const cleanupTree = (elm, staticCtx, subsManager, stopSlots) => {
    subsManager.$clearSub$(elm);
    if (isQwikElement(elm)) {
        if (stopSlots && elm.hasAttribute(QSlotS)) {
            staticCtx.$rmSlots$.push(elm);
            return;
        }
        const ctx = tryGetContext(elm);
        if (ctx) {
            cleanupContext(ctx, subsManager);
        }
        const end = isVirtualElement(elm) ? elm.close : null;
        let node = elm.firstChild;
        while ((node = processVirtualNodes(node))) {
            cleanupTree(node, staticCtx, subsManager, true);
            node = node.nextSibling;
            if (node === end) {
                break;
            }
        }
    }
};
const restoreScroll = () => {
    if (document.__q_scroll_restore__) {
        document.__q_scroll_restore__();
        document.__q_scroll_restore__ = undefined;
    }
};
const executeContextWithScrollAndTransition = async (ctx) => {
    // try to use `document.startViewTransition`
    if (isBrowser && !qTest) {
        if (document.__q_view_transition__) {
            document.__q_view_transition__ = undefined;
            if (document.startViewTransition) {
                const transition = document.startViewTransition(() => {
                    executeDOMRender(ctx);
                    restoreScroll();
                });
                const event = new CustomEvent('qviewTransition', {
                    detail: transition,
                });
                document.dispatchEvent(event);
                await transition.finished;
                return;
            }
        }
    }
    // fallback
    executeDOMRender(ctx);
    if (isBrowser) {
        restoreScroll();
    }
};
const directAppendChild = (parent, child) => {
    if (isVirtualElement(child)) {
        child.appendTo(parent);
    }
    else {
        parent.appendChild(child);
    }
};
const directRemoveChild = (parent, child) => {
    if (isVirtualElement(child)) {
        child.remove();
    }
    else {
        parent.removeChild(child);
    }
};
const directInsertAfter = (parent, child, ref) => {
    if (isVirtualElement(child)) {
        child.insertBeforeTo(parent, ref?.nextSibling ?? null);
    }
    else {
        parent.insertBefore(child, ref?.nextSibling ?? null);
    }
};
const directInsertBefore = (parent, child, ref) => {
    if (isVirtualElement(child)) {
        child.insertBeforeTo(parent, getRootNode(ref));
    }
    else {
        parent.insertBefore(child, getRootNode(ref));
    }
};
const createKeyToOldIdx = (children, beginIdx, endIdx) => {
    const map = {};
    for (let i = beginIdx; i <= endIdx; ++i) {
        const child = children[i];
        const key = child.$key$;
        if (key != null) {
            map[key] = i;
        }
    }
    return map;
};
const addQwikEvent = (staticCtx, elm, prop) => {
    if (!prop.startsWith('on:')) {
        setAttribute(staticCtx, elm, prop, '');
    }
    registerQwikEvent(prop);
};
const registerQwikEvent = (prop) => {
    if (!qTest) {
        const eventName = getEventName(prop);
        try {
            // This is managed by qwik-loader
            (globalThis.qwikevents ||= []).push(eventName);
        }
        catch (err) {
            logWarn(err);
        }
    }
};

const setAttribute = (staticCtx, el, prop, value) => {
    staticCtx.$operations$.push({
        $operation$: _setAttribute,
        $args$: [el, prop, value],
    });
};
const _setAttribute = (el, prop, value) => {
    if (value == null || value === false) {
        el.removeAttribute(prop);
    }
    else {
        // element.setAttribute requires string. Boolean attributes automatically convert "" to `true`
        const str = value === true ? '' : String(value);
        directSetAttribute(el, prop, str);
    }
};
const setProperty = (staticCtx, node, key, value) => {
    staticCtx.$operations$.push({
        $operation$: _setProperty,
        $args$: [node, key, value],
    });
};
const setPropertyPost = (staticCtx, node, key, value) => {
    staticCtx.$postOperations$.push({
        $operation$: _setProperty,
        $args$: [node, key, value],
    });
};
const _setProperty = (node, key, value) => {
    try {
        node[key] = value == null ? '' : value;
        if (value == null && isNode$1(node) && isElement$1(node)) {
            node.removeAttribute(key);
        }
    }
    catch (err) {
        logError(codeToText(QError_setProperty), key, { node, value }, err);
    }
};
const createElement = (doc, expectTag, isSvg) => {
    const el = isSvg ? doc.createElementNS(SVG_NS, expectTag) : doc.createElement(expectTag);
    return el;
};
const insertBefore = (staticCtx, parent, newChild, refChild) => {
    staticCtx.$operations$.push({
        $operation$: directInsertBefore,
        $args$: [parent, newChild, refChild ? refChild : null],
    });
    return newChild;
};
const insertAfter = (staticCtx, parent, newChild, refChild) => {
    staticCtx.$operations$.push({
        $operation$: directInsertAfter,
        $args$: [parent, newChild, refChild ? refChild : null],
    });
    return newChild;
};
const appendChild = (staticCtx, parent, newChild) => {
    staticCtx.$operations$.push({
        $operation$: directAppendChild,
        $args$: [parent, newChild],
    });
    return newChild;
};
const appendHeadStyle = (staticCtx, styleTask) => {
    staticCtx.$containerState$.$styleIds$.add(styleTask.styleId);
    staticCtx.$postOperations$.push({
        $operation$: _appendHeadStyle,
        $args$: [staticCtx.$containerState$, styleTask],
    });
};
const _appendHeadStyle = (containerState, styleTask) => {
    const containerEl = containerState.$containerEl$;
    const doc = getDocument(containerEl);
    const isDoc = doc.documentElement === containerEl;
    const headEl = doc.head;
    const style = doc.createElement('style');
    if (isDoc && !headEl) {
        logWarn('document.head is undefined');
    }
    directSetAttribute(style, QStyle, styleTask.styleId);
    directSetAttribute(style, 'hidden', '');
    style.textContent = styleTask.content;
    if (isDoc && headEl) {
        directAppendChild(headEl, style);
    }
    else {
        directInsertBefore(containerEl, style, containerEl.firstChild);
    }
};
const prepend = (staticCtx, parent, newChild) => {
    staticCtx.$operations$.push({
        $operation$: directPrepend,
        $args$: [parent, newChild],
    });
};
const directPrepend = (parent, newChild) => {
    directInsertBefore(parent, newChild, parent.firstChild);
};
const removeNode = (staticCtx, el) => {
    if (isQwikElement(el)) {
        const subsManager = staticCtx.$containerState$.$subsManager$;
        cleanupTree(el, staticCtx, subsManager, true);
    }
    staticCtx.$operations$.push({
        $operation$: _removeNode,
        $args$: [el, staticCtx],
    });
};
const _removeNode = (el, staticCtx) => {
    const parent = el.parentElement;
    if (parent) {
        directRemoveChild(parent, el);
    }
    else if (qDev) {
        logWarn('Trying to remove component already removed', el);
    }
};
const createTemplate = (doc, slotName) => {
    const template = createElement(doc, 'q:template', false);
    directSetAttribute(template, QSlot, slotName);
    directSetAttribute(template, 'hidden', '');
    directSetAttribute(template, 'aria-hidden', 'true');
    return template;
};
const executeDOMRender = (staticCtx) => {
    for (const op of staticCtx.$operations$) {
        // PERF(misko): polymorphic execution
        op.$operation$.apply(undefined, op.$args$);
    }
    resolveSlotProjection(staticCtx);
};
const getKey = (el) => {
    return directGetAttribute(el, 'q:key');
};
const setKey = (el, key) => {
    if (key !== null) {
        directSetAttribute(el, 'q:key', key);
    }
};
const resolveSlotProjection = (staticCtx) => {
    // Slots removed
    const subsManager = staticCtx.$containerState$.$subsManager$;
    for (const slotEl of staticCtx.$rmSlots$) {
        const key = getKey(slotEl);
        assertDefined(key, 'slots must have a key');
        const slotChildren = getChildren(slotEl, isChildComponent);
        if (slotChildren.length > 0) {
            const sref = slotEl.getAttribute(QSlotRef);
            const hostCtx = staticCtx.$roots$.find((r) => r.$id$ === sref);
            if (hostCtx) {
                const hostElm = hostCtx.$element$;
                if (hostElm.isConnected) {
                    const hasTemplate = getChildren(hostElm, isSlotTemplate).some((node) => directGetAttribute(node, QSlot) === key);
                    if (!hasTemplate) {
                        const template = createTemplate(staticCtx.$doc$, key);
                        for (const child of slotChildren) {
                            directAppendChild(template, child);
                        }
                        directInsertBefore(hostElm, template, hostElm.firstChild);
                    }
                    else {
                        cleanupTree(slotEl, staticCtx, subsManager, false);
                    }
                }
                else {
                    cleanupTree(slotEl, staticCtx, subsManager, false);
                }
            }
            else {
                // If slot content cannot be relocated, it means it's content is definitely removed
                // Cleanup needs to be executed
                cleanupTree(slotEl, staticCtx, subsManager, false);
            }
        }
    }
    // Slots added
    for (const [slotEl, hostElm] of staticCtx.$addSlots$) {
        const key = getKey(slotEl);
        assertDefined(key, 'slots must have a key');
        const template = getChildren(hostElm, isSlotTemplate).find((node) => {
            return node.getAttribute(QSlot) === key;
        });
        if (template) {
            getChildren(template, isChildComponent).forEach((child) => {
                directAppendChild(slotEl, child);
            });
            template.remove();
        }
    }
};
const printRenderStats = (staticCtx) => {
    if (qDev) {
        if (typeof window !== 'undefined' && window.document != null) {
            const byOp = {};
            for (const op of staticCtx.$operations$) {
                byOp[op.$operation$.name] = (byOp[op.$operation$.name] ?? 0) + 1;
            }
            const stats = {
                byOp,
                roots: staticCtx.$roots$.map((ctx) => ctx.$element$),
                hostElements: Array.from(staticCtx.$hostElements$),
                operations: staticCtx.$operations$.map((v) => [v.$operation$.name, ...v.$args$]),
            };
            const noOps = staticCtx.$operations$.length === 0;
            logDebug('Render stats.', noOps ? 'No operations' : '', stats);
        }
    }
};

const newVirtualElement = (doc, isSvg) => {
    const open = doc.createComment('qv ');
    const close = doc.createComment('/qv');
    return new VirtualElementImpl(open, close, isSvg);
};
const parseVirtualAttributes = (str) => {
    if (!str) {
        return {};
    }
    const attributes = str.split(' ');
    return Object.fromEntries(attributes.map((attr) => {
        const index = attr.indexOf('=');
        if (index >= 0) {
            return [attr.slice(0, index), unescape(attr.slice(index + 1))];
        }
        else {
            return [attr, ''];
        }
    }));
};
const serializeVirtualAttributes = (map) => {
    const attributes = [];
    Object.entries(map).forEach(([key, value]) => {
        if (!value) {
            attributes.push(`${key}`);
        }
        else {
            attributes.push(`${key}=${escape(value)}`);
        }
    });
    return attributes.join(' ');
};
const SHOW_COMMENT = 128;
const FILTER_ACCEPT = 1;
const FILTER_REJECT = 2;
const walkerVirtualByAttribute = (el, prop, value) => {
    return el.ownerDocument.createTreeWalker(el, SHOW_COMMENT, {
        acceptNode(c) {
            const virtual = getVirtualElement(c);
            if (virtual) {
                return directGetAttribute(virtual, prop) === value ? FILTER_ACCEPT : FILTER_REJECT;
            }
            return FILTER_REJECT;
        },
    });
};
const queryAllVirtualByAttribute = (el, prop, value) => {
    const walker = walkerVirtualByAttribute(el, prop, value);
    const pars = [];
    let currentNode = null;
    while ((currentNode = walker.nextNode())) {
        pars.push(getVirtualElement(currentNode));
    }
    return pars;
};
const escape = (s) => {
    return s.replace(/ /g, '+');
};
const unescape = (s) => {
    return s.replace(/\+/g, ' ');
};
const VIRTUAL = ':virtual';
class VirtualElementImpl {
    open;
    close;
    isSvg;
    ownerDocument;
    _qc_ = null;
    nodeType = 111;
    localName = VIRTUAL;
    nodeName = VIRTUAL;
    $attributes$;
    $template$;
    constructor(open, close, isSvg) {
        this.open = open;
        this.close = close;
        this.isSvg = isSvg;
        const doc = (this.ownerDocument = open.ownerDocument);
        this.$template$ = createElement(doc, 'template', false);
        this.$attributes$ = parseVirtualAttributes(open.data.slice(3));
        assertTrue(open.data.startsWith('qv '), 'comment is not a qv');
        open[VIRTUAL_SYMBOL] = this;
        close[VIRTUAL_SYMBOL] = this;
        seal(this);
    }
    insertBefore(node, ref) {
        const parent = this.parentElement;
        if (parent) {
            const ref2 = ref ? ref : this.close;
            parent.insertBefore(node, ref2);
        }
        else {
            this.$template$.insertBefore(node, ref);
        }
        return node;
    }
    remove() {
        const parent = this.parentElement;
        if (parent) {
            const ch = this.childNodes;
            assertEqual(this.$template$.childElementCount, 0, 'children should be empty');
            parent.removeChild(this.open);
            for (let i = 0; i < ch.length; i++) {
                this.$template$.appendChild(ch[i]);
            }
            parent.removeChild(this.close);
        }
    }
    appendChild(node) {
        return this.insertBefore(node, null);
    }
    insertBeforeTo(newParent, child) {
        // const ch = this.childNodes;
        const ch = this.childNodes;
        // TODO
        // if (this.parentElement) {
        //   console.warn('already attached');
        // }
        newParent.insertBefore(this.open, child);
        for (const c of ch) {
            newParent.insertBefore(c, child);
        }
        newParent.insertBefore(this.close, child);
        assertEqual(this.$template$.childElementCount, 0, 'children should be empty');
    }
    appendTo(newParent) {
        this.insertBeforeTo(newParent, null);
    }
    get namespaceURI() {
        return this.parentElement?.namespaceURI ?? '';
    }
    removeChild(child) {
        if (this.parentElement) {
            this.parentElement.removeChild(child);
        }
        else {
            this.$template$.removeChild(child);
        }
    }
    getAttribute(prop) {
        return this.$attributes$[prop] ?? null;
    }
    hasAttribute(prop) {
        return prop in this.$attributes$;
    }
    setAttribute(prop, value) {
        this.$attributes$[prop] = value;
        if (qSerialize) {
            this.open.data = updateComment(this.$attributes$);
        }
    }
    removeAttribute(prop) {
        delete this.$attributes$[prop];
        if (qSerialize) {
            this.open.data = updateComment(this.$attributes$);
        }
    }
    matches(_) {
        return false;
    }
    compareDocumentPosition(other) {
        return this.open.compareDocumentPosition(other);
    }
    closest(query) {
        const parent = this.parentElement;
        if (parent) {
            return parent.closest(query);
        }
        return null;
    }
    querySelectorAll(query) {
        const result = [];
        const ch = getChildren(this, isNodeElement);
        ch.forEach((el) => {
            if (isQwikElement(el)) {
                if (el.matches(query)) {
                    result.push(el);
                }
                result.concat(Array.from(el.querySelectorAll(query)));
            }
        });
        return result;
    }
    querySelector(query) {
        for (const el of this.childNodes) {
            if (isElement$1(el)) {
                if (el.matches(query)) {
                    return el;
                }
                const v = el.querySelector(query);
                if (v !== null) {
                    return v;
                }
            }
        }
        return null;
    }
    get innerHTML() {
        return '';
    }
    set innerHTML(html) {
        const parent = this.parentElement;
        if (parent) {
            this.childNodes.forEach((a) => this.removeChild(a));
            this.$template$.innerHTML = html;
            parent.insertBefore(this.$template$.content, this.close);
        }
        else {
            this.$template$.innerHTML = html;
        }
    }
    get firstChild() {
        if (this.parentElement) {
            const first = this.open.nextSibling;
            if (first === this.close) {
                return null;
            }
            return first;
        }
        else {
            return this.$template$.firstChild;
        }
    }
    get nextSibling() {
        return this.close.nextSibling;
    }
    get previousSibling() {
        return this.open.previousSibling;
    }
    get childNodes() {
        if (!this.parentElement) {
            return Array.from(this.$template$.childNodes);
        }
        const nodes = [];
        let node = this.open;
        while ((node = node.nextSibling)) {
            if (node === this.close) {
                break;
            }
            nodes.push(node);
        }
        return nodes;
    }
    get isConnected() {
        return this.open.isConnected;
    }
    /** The DOM parent element (not the vDOM parent, use findVirtual for that) */
    get parentElement() {
        return this.open.parentElement;
    }
}
const updateComment = (attributes) => {
    return `qv ${serializeVirtualAttributes(attributes)}`;
};
const processVirtualNodes = (node) => {
    if (node == null) {
        return null;
    }
    if (isComment(node)) {
        const virtual = getVirtualElement(node);
        if (virtual) {
            return virtual;
        }
    }
    return node;
};
const findClose = (open) => {
    let node = open;
    let stack = 1;
    while ((node = node.nextSibling)) {
        if (isComment(node)) {
            // We don't want to resume virtual nodes but if they're already resumed, use them
            const virtual = node[VIRTUAL_SYMBOL];
            if (virtual) {
                // This is not our existing virtual node because otherwise findClose wouldn't have been called
                node = virtual;
            }
            else if (node.data.startsWith('qv ')) {
                stack++;
            }
            else if (node.data === '/qv') {
                stack--;
                if (stack === 0) {
                    return node;
                }
            }
        }
    }
    assertFail('close not found');
};
const getVirtualElement = (open) => {
    const virtual = open[VIRTUAL_SYMBOL];
    if (virtual) {
        return virtual;
    }
    if (open.data.startsWith('qv ')) {
        const close = findClose(open);
        return new VirtualElementImpl(open, close, open.parentElement?.namespaceURI === SVG_NS);
    }
    return null;
};
const getRootNode = (node) => {
    if (node == null) {
        return null; // TODO
    }
    if (isVirtualElement(node)) {
        return node.open;
    }
    else {
        return node;
    }
};

/** @internal */
const _serializeData = async (data, pureQRL) => {
    const containerState = createContainerState(null, null);
    const collector = createCollector(containerState);
    collectValue(data, collector, false);
    // Wait for remaining promises
    let promises;
    while ((promises = collector.$promises$).length > 0) {
        collector.$promises$ = [];
        const results = await Promise.allSettled(promises);
        for (const result of results) {
            if (result.status === 'rejected') {
                console.error(result.reason);
            }
        }
    }
    const objs = Array.from(collector.$objSet$.keys());
    let count = 0;
    const objToId = new Map();
    for (const obj of objs) {
        objToId.set(obj, intToStr(count));
        count++;
    }
    if (collector.$noSerialize$.length > 0) {
        const undefinedID = objToId.get(undefined);
        assertDefined(undefinedID, 'undefined ID must be defined');
        for (const obj of collector.$noSerialize$) {
            objToId.set(obj, undefinedID);
        }
    }
    const mustGetObjId = (obj) => {
        let suffix = '';
        if (isPromise(obj)) {
            const promiseValue = getPromiseValue(obj);
            if (!promiseValue) {
                throw qError(QError_missingObjectId, obj);
            }
            obj = promiseValue.value;
            if (promiseValue.resolved) {
                suffix += '~';
            }
            else {
                suffix += '_';
            }
        }
        if (isObject(obj)) {
            const target = getProxyTarget(obj);
            if (target) {
                suffix += '!';
                obj = target;
            }
        }
        const key = objToId.get(obj);
        if (key === undefined) {
            throw qError(QError_missingObjectId, obj);
        }
        return key + suffix;
    };
    const convertedObjs = serializeObjects(objs, mustGetObjId, null, collector, containerState);
    return JSON.stringify({
        _entry: mustGetObjId(data),
        _objs: convertedObjs,
    });
};
// <docs markdown="../readme.md#pauseContainer">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#pauseContainer instead)
// </docs>
/** This pauses a running container in the browser. It is not used for SSR */
// TODO(mhevery): this is a remnant when you could have paused on client. Should be deleted.
const pauseContainer = async (elmOrDoc, defaultParentJSON) => {
    const doc = getDocument(elmOrDoc);
    const documentElement = doc.documentElement;
    const containerEl = isDocument(elmOrDoc) ? documentElement : elmOrDoc;
    if (directGetAttribute(containerEl, QContainerAttr) === 'paused') {
        throw qError(QError_containerAlreadyPaused);
    }
    const parentJSON = (containerEl === doc.documentElement ? doc.body : containerEl);
    const containerState = _getContainerState(containerEl);
    const contexts = getNodesInScope(containerEl, hasContext);
    // Set container to paused
    directSetAttribute(containerEl, QContainerAttr, 'paused');
    // Update elements with context
    for (const elCtx of contexts) {
        const elm = elCtx.$element$;
        const listeners = elCtx.li;
        if (elCtx.$scopeIds$) {
            const value = serializeSStyle(elCtx.$scopeIds$);
            if (value) {
                elm.setAttribute(QScopedStyle, value);
            }
        }
        if (elCtx.$id$) {
            elm.setAttribute(ELEMENT_ID, elCtx.$id$);
        }
        if (isElement$1(elm) && listeners.length > 0) {
            const groups = groupListeners(listeners);
            for (const listener of groups) {
                elm.setAttribute(listener[0], serializeQRLs(listener[1], containerState, elCtx));
            }
        }
    }
    // Serialize data
    const data = await _pauseFromContexts(contexts, containerState, (el) => {
        if (isNode$1(el) && isText(el)) {
            return getTextID(el, containerState);
        }
        return null;
    });
    // Emit Qwik JSON
    const qwikJson = doc.createElement('script');
    directSetAttribute(qwikJson, 'type', 'qwik/json');
    qwikJson.textContent = escapeText(JSON.stringify(data.state, undefined, qDev ? '  ' : undefined));
    parentJSON.appendChild(qwikJson);
    // Emit event registration
    const extraListeners = Array.from(containerState.$events$, (s) => JSON.stringify(s));
    const eventsScript = doc.createElement('script');
    eventsScript.textContent = `(window.qwikevents||=[]).push(${extraListeners.join(', ')})`;
    parentJSON.appendChild(eventsScript);
    return data;
};
/**
 * Grab all state needed to resume the container later.
 *
 * @internal
 */
const _pauseFromContexts = async (allContexts, containerState, fallbackGetObjId, textNodes) => {
    const collector = createCollector(containerState);
    textNodes?.forEach((_, key) => {
        collector.$seen$.add(key);
    });
    let hasListeners = false;
    // Collect resources
    // TODO: optimize
    for (const ctx of allContexts) {
        if (ctx.$tasks$) {
            for (const task of ctx.$tasks$) {
                if (qDev) {
                    if (task.$flags$ & TaskFlagsIsDirty) {
                        logWarn(`Serializing dirty task. Looks like an internal error. 
Task Symbol: ${task.$qrl$.$symbol$}
`);
                    }
                    if (!isConnected(task)) {
                        logWarn('Serializing disconnected task. Looks like an internal error.');
                    }
                }
                if (isResourceTask(task)) {
                    collector.$resources$.push(task.$state$);
                }
                destroyTask(task);
            }
        }
    }
    // Find all listeners. They are the "entries" for resuming the container.
    // Any lexical scope they reference must be serialized.
    for (const ctx of allContexts) {
        const el = ctx.$element$;
        const ctxListeners = ctx.li;
        for (const listener of ctxListeners) {
            if (isElement$1(el)) {
                const qrl = listener[1];
                const captured = qrl.$captureRef$;
                if (captured) {
                    for (const obj of captured) {
                        /**
                         * Collect the lexical scope used by the listener. This also collects all the
                         * subscribers of any reactive state in scope, since the listener might change that
                         * state
                         */
                        collectValue(obj, collector, true);
                    }
                }
                collector.$qrls$.push(qrl);
                hasListeners = true;
            }
        }
    }
    // No listeners implies static page
    if (!hasListeners) {
        return {
            state: {
                refs: {},
                ctx: {},
                objs: [],
                subs: [],
            },
            objs: [],
            funcs: [],
            qrls: [],
            resources: collector.$resources$,
            mode: 'static',
        };
    }
    // Wait for remaining promises
    let promises;
    while ((promises = collector.$promises$).length > 0) {
        collector.$promises$ = [];
        await Promise.all(promises);
    }
    // If at this point any component can render, we need to capture Context and Props
    const canRender = collector.$elements$.length > 0;
    if (canRender) {
        for (const elCtx of collector.$deferElements$) {
            collectElementData(elCtx, collector, elCtx.$element$);
        }
        for (const ctx of allContexts) {
            collectProps(ctx, collector);
        }
    }
    // Wait for remaining promises
    while ((promises = collector.$promises$).length > 0) {
        collector.$promises$ = [];
        await Promise.all(promises);
    }
    // Convert objSet to array
    const elementToIndex = new Map();
    const objs = Array.from(collector.$objSet$.keys());
    const objToId = new Map();
    const getElementID = (el) => {
        let id = elementToIndex.get(el);
        if (id === undefined) {
            id = getQId(el);
            if (!id) {
                console.warn('Missing ID', el);
            }
            elementToIndex.set(el, id);
        }
        return id;
    };
    const getObjId = (obj) => {
        let suffix = '';
        if (isPromise(obj)) {
            const promiseValue = getPromiseValue(obj);
            if (!promiseValue) {
                return null;
            }
            obj = promiseValue.value;
            if (promiseValue.resolved) {
                suffix += '~';
            }
            else {
                suffix += '_';
            }
        }
        if (isObject(obj)) {
            const target = getProxyTarget(obj);
            if (target) {
                suffix += '!';
                obj = target;
            }
            else if (isQwikElement(obj)) {
                const elID = getElementID(obj);
                if (elID) {
                    return ELEMENT_ID_PREFIX + elID + suffix;
                }
                return null;
            }
        }
        const id = objToId.get(obj);
        if (id) {
            return id + suffix;
        }
        const textId = textNodes?.get(obj);
        if (textId) {
            return '*' + textId;
        }
        if (fallbackGetObjId) {
            return fallbackGetObjId(obj);
        }
        return null;
    };
    const mustGetObjId = (obj) => {
        const key = getObjId(obj);
        if (key === null) {
            // TODO(mhevery): this is a hack as we should never get here.
            // This as a workaround for https://github.com/QwikDev/qwik/issues/4979
            if (isQrl(obj)) {
                const id = intToStr(objToId.size);
                objToId.set(obj, id);
                return id;
            }
            else {
                throw qError(QError_missingObjectId, obj);
            }
        }
        return key;
    };
    // Compute subscriptions
    const subsMap = new Map();
    for (const obj of objs) {
        const subs = getManager(obj, containerState)?.$subs$;
        if (!subs) {
            continue;
        }
        const flags = getProxyFlags(obj) ?? 0;
        const converted = [];
        if (flags & QObjectRecursive) {
            converted.push(flags);
        }
        for (const sub of subs) {
            const host = sub[1];
            if (sub[0] === 0 && isNode$1(host) && isVirtualElement(host)) {
                if (!collector.$elements$.includes(tryGetContext(host))) {
                    continue;
                }
            }
            converted.push(sub);
        }
        if (converted.length > 0) {
            subsMap.set(obj, converted);
        }
    }
    // Sort objects: the ones with subscriptions go first
    objs.sort((a, b) => {
        const isProxyA = subsMap.has(a) ? 0 : 1;
        const isProxyB = subsMap.has(b) ? 0 : 1;
        return isProxyA - isProxyB;
    });
    // Generate object ID by using a monotonic counter
    let count = 0;
    for (const obj of objs) {
        objToId.set(obj, intToStr(count));
        count++;
    }
    if (collector.$noSerialize$.length > 0) {
        const undefinedID = objToId.get(undefined);
        assertDefined(undefinedID, 'undefined ID must be defined');
        for (const obj of collector.$noSerialize$) {
            objToId.set(obj, undefinedID);
        }
    }
    // Serialize object subscriptions
    const subs = [];
    for (const obj of objs) {
        const value = subsMap.get(obj);
        if (value == null) {
            break;
        }
        subs.push(value
            .map((s) => {
            if (typeof s === 'number') {
                return `_${s}`;
            }
            return serializeSubscription(s, getObjId);
        })
            .filter(isNotNullable));
    }
    assertEqual(subs.length, subsMap.size, 'missing subscriptions to serialize', subs, subsMap);
    const convertedObjs = serializeObjects(objs, mustGetObjId, getObjId, collector, containerState);
    const meta = {};
    const refs = {};
    // Write back to the dom
    for (const ctx of allContexts) {
        const node = ctx.$element$;
        const elementID = ctx.$id$;
        const ref = ctx.$refMap$;
        const props = ctx.$props$;
        const contexts = ctx.$contexts$;
        const tasks = ctx.$tasks$;
        const renderQrl = ctx.$componentQrl$;
        const seq = ctx.$seq$;
        const metaValue = {};
        const elementCaptured = isVirtualElement(node) && collector.$elements$.includes(ctx);
        assertDefined(elementID, `pause: can not generate ID for dom node`, node);
        if (ref.length > 0) {
            assertElement(node);
            const value = mapJoin(ref, mustGetObjId, ' ');
            if (value) {
                refs[elementID] = value;
            }
        }
        else if (canRender) {
            let add = false;
            if (elementCaptured) {
                assertDefined(renderQrl, 'renderQrl must be defined');
                const propsId = getObjId(props);
                metaValue.h = mustGetObjId(renderQrl) + (propsId ? ' ' + propsId : '');
                add = true;
            }
            else {
                const propsId = getObjId(props);
                if (propsId) {
                    metaValue.h = ' ' + propsId;
                    add = true;
                }
            }
            if (tasks && tasks.length > 0) {
                const value = mapJoin(tasks, getObjId, ' ');
                if (value) {
                    metaValue.w = value;
                    add = true;
                }
            }
            if (elementCaptured && seq && seq.length > 0) {
                const value = mapJoin(seq, mustGetObjId, ' ');
                metaValue.s = value;
                add = true;
            }
            if (contexts) {
                const serializedContexts = [];
                contexts.forEach((value, key) => {
                    const id = getObjId(value);
                    if (id) {
                        serializedContexts.push(`${key}=${id}`);
                    }
                });
                const value = serializedContexts.join(' ');
                if (value) {
                    metaValue.c = value;
                    add = true;
                }
            }
            if (add) {
                meta[elementID] = metaValue;
            }
        }
    }
    // Sanity check of serialized element
    if (qDev) {
        elementToIndex.forEach((value, el) => {
            if (!value) {
                logWarn('unconnected element', el.nodeName, '\n');
            }
        });
    }
    return {
        state: {
            refs,
            ctx: meta,
            objs: convertedObjs,
            subs,
        },
        objs,
        funcs: collector.$inlinedFunctions$,
        resources: collector.$resources$,
        qrls: collector.$qrls$,
        mode: canRender ? 'render' : 'listeners',
    };
};
const mapJoin = (objects, getObjectId, sep) => {
    let output = '';
    for (const obj of objects) {
        const id = getObjectId(obj);
        if (id !== null) {
            if (output !== '') {
                output += sep;
            }
            output += id;
        }
    }
    return output;
};
const getNodesInScope = (parent, predicate) => {
    const results = [];
    const v = predicate(parent);
    if (v !== undefined) {
        results.push(v);
    }
    const walker = parent.ownerDocument.createTreeWalker(parent, SHOW_ELEMENT | SHOW_COMMENT$1, {
        acceptNode(node) {
            if (isContainer(node)) {
                return FILTER_REJECT$1;
            }
            const v = predicate(node);
            if (v !== undefined) {
                results.push(v);
            }
            return FILTER_SKIP;
        },
    });
    while (walker.nextNode()) {
        // do nothing
    }
    return results;
};
// Collect props proxy objects
const collectProps = (elCtx, collector) => {
    const parentCtx = elCtx.$realParentCtx$ || elCtx.$parentCtx$;
    const props = elCtx.$props$;
    // Collect only if the parent (which changes the props) is part of the listener graph
    if (parentCtx && props && !isEmptyObj(props) && collector.$elements$.includes(parentCtx)) {
        const subs = getSubscriptionManager(props)?.$subs$;
        const el = elCtx.$element$;
        if (subs) {
            for (const [type, host] of subs) {
                if (type === 0) {
                    if (host !== el) {
                        collectSubscriptions(getSubscriptionManager(props), collector, false);
                    }
                    if (isNode$1(host)) {
                        collectElement(host, collector);
                    }
                    else {
                        collectValue(host, collector, true);
                    }
                }
                else {
                    collectValue(props, collector, false);
                    collectSubscriptions(getSubscriptionManager(props), collector, false);
                }
            }
        }
    }
};
const createCollector = (containerState) => {
    const inlinedFunctions = [];
    containerState.$inlineFns$.forEach((id, fnStr) => {
        while (inlinedFunctions.length <= id) {
            inlinedFunctions.push('');
        }
        inlinedFunctions[id] = fnStr;
    });
    return {
        $containerState$: containerState,
        $seen$: new Set(),
        $objSet$: new Set(),
        $prefetch$: 0,
        $noSerialize$: [],
        $inlinedFunctions$: inlinedFunctions,
        $resources$: [],
        $elements$: [],
        $qrls$: [],
        $deferElements$: [],
        $promises$: [],
    };
};
const collectDeferElement = (el, collector) => {
    const ctx = tryGetContext(el);
    if (collector.$elements$.includes(ctx)) {
        return;
    }
    collector.$elements$.push(ctx);
    if (ctx.$flags$ & HOST_FLAG_DYNAMIC) {
        collector.$prefetch$++;
        collectElementData(ctx, collector, true);
        collector.$prefetch$--;
    }
    else {
        collector.$deferElements$.push(ctx);
    }
};
const collectElement = (el, collector) => {
    const ctx = tryGetContext(el);
    if (ctx) {
        if (collector.$elements$.includes(ctx)) {
            return;
        }
        collector.$elements$.push(ctx);
        collectElementData(ctx, collector, el);
    }
};
const collectElementData = (elCtx, collector, dynamicCtx) => {
    if (elCtx.$props$ && !isEmptyObj(elCtx.$props$)) {
        collectValue(elCtx.$props$, collector, dynamicCtx);
        collectSubscriptions(getSubscriptionManager(elCtx.$props$), collector, dynamicCtx);
    }
    if (elCtx.$componentQrl$) {
        collectValue(elCtx.$componentQrl$, collector, dynamicCtx);
    }
    if (elCtx.$seq$) {
        for (const obj of elCtx.$seq$) {
            collectValue(obj, collector, dynamicCtx);
        }
    }
    if (elCtx.$tasks$) {
        const map = collector.$containerState$.$subsManager$.$groupToManagers$;
        for (const obj of elCtx.$tasks$) {
            if (map.has(obj)) {
                collectValue(obj, collector, dynamicCtx);
            }
        }
    }
    if (dynamicCtx === true) {
        collectContext(elCtx, collector);
        if (elCtx.$dynamicSlots$) {
            for (const slotCtx of elCtx.$dynamicSlots$) {
                collectContext(slotCtx, collector);
            }
        }
    }
};
const collectContext = (elCtx, collector) => {
    while (elCtx) {
        if (elCtx.$contexts$) {
            for (const obj of elCtx.$contexts$.values()) {
                collectValue(obj, collector, true);
            }
        }
        elCtx = elCtx.$parentCtx$;
    }
};
const escapeText = (str) => {
    return str.replace(/<(\/?script)/gi, '\\x3C$1');
};
// Collect all the subscribers of this manager
const collectSubscriptions = (manager, collector, leaks) => {
    // if (!leaks) {
    //   return;
    // }
    if (collector.$seen$.has(manager)) {
        return;
    }
    collector.$seen$.add(manager);
    const subs = manager.$subs$;
    assertDefined(subs, 'subs must be defined');
    for (const sub of subs) {
        const type = sub[0];
        if (type > 0) {
            collectValue(sub[2], collector, leaks);
        }
        if (leaks === true) {
            const host = sub[1];
            if (isNode$1(host) && isVirtualElement(host)) {
                if (sub[0] === 0) {
                    collectDeferElement(host, collector);
                }
            }
            else {
                collectValue(host, collector, true);
            }
        }
    }
};
const PROMISE_VALUE = Symbol();
const resolvePromise = (promise) => {
    return promise.then((value) => {
        const v = {
            resolved: true,
            value,
        };
        promise[PROMISE_VALUE] = v;
        return value;
    }, (value) => {
        const v = {
            resolved: false,
            value,
        };
        promise[PROMISE_VALUE] = v;
        return value;
    });
};
const getPromiseValue = (promise) => {
    return promise[PROMISE_VALUE];
};
const collectValue = (obj, collector, leaks) => {
    if (obj != null) {
        const objType = typeof obj;
        switch (objType) {
            case 'function':
            case 'object': {
                if (collector.$seen$.has(obj)) {
                    return;
                }
                collector.$seen$.add(obj);
                if (fastSkipSerialize(obj)) {
                    collector.$objSet$.add(undefined);
                    collector.$noSerialize$.push(obj);
                    return;
                }
                /** The possibly proxied `obj` */
                const input = obj;
                const target = getProxyTarget(obj);
                if (target) {
                    // `obj` is now the non-proxied object
                    obj = target;
                    // NOTE: You may be tempted to add the `target` to the `seen` set,
                    // but that would not work as it is possible for the `target` object
                    // to already be in `seen` set if it was passed in directly, so
                    // we can't short circuit and need to do the work.
                    // Issue: https://github.com/QwikDev/qwik/issues/5001
                    const mutable = (getProxyFlags(obj) & QObjectImmutable) === 0;
                    if (leaks && mutable) {
                        collectSubscriptions(getSubscriptionManager(input), collector, leaks);
                    }
                    if (fastWeakSerialize(input)) {
                        collector.$objSet$.add(obj);
                        return;
                    }
                }
                const collected = collectDeps(obj, collector, leaks);
                if (collected) {
                    collector.$objSet$.add(obj);
                    return;
                }
                if (isPromise(obj)) {
                    collector.$promises$.push(resolvePromise(obj).then((value) => {
                        collectValue(value, collector, leaks);
                    }));
                    return;
                }
                if (objType === 'object') {
                    if (isNode$1(obj)) {
                        return;
                    }
                    if (isArray(obj)) {
                        for (let i = 0; i < obj.length; i++) {
                            collectValue(input[i], collector, leaks);
                        }
                    }
                    else if (isSerializableObject(obj)) {
                        for (const key in obj) {
                            collectValue(input[key], collector, leaks);
                        }
                    }
                }
                break;
            }
        }
    }
    collector.$objSet$.add(obj);
};
const isContainer = (el) => {
    return isElement$1(el) && el.hasAttribute(QContainerAttr);
};
const hasContext = (el) => {
    const node = processVirtualNodes(el);
    if (isQwikElement(node)) {
        const ctx = tryGetContext(node);
        if (ctx && ctx.$id$) {
            return ctx;
        }
    }
    return undefined;
};
const getManager = (obj, containerState) => {
    if (!isObject(obj)) {
        return undefined;
    }
    if (obj instanceof SignalImpl) {
        return getSubscriptionManager(obj);
    }
    const proxy = containerState.$proxyMap$.get(obj);
    if (proxy) {
        return getSubscriptionManager(proxy);
    }
    return undefined;
};
const getQId = (el) => {
    const ctx = tryGetContext(el);
    if (ctx) {
        return ctx.$id$;
    }
    return null;
};
const getTextID = (node, containerState) => {
    const prev = node.previousSibling;
    if (prev && isComment(prev)) {
        if (prev.data.startsWith('t=')) {
            return ELEMENT_ID_PREFIX + prev.data.slice(2);
        }
    }
    const doc = node.ownerDocument;
    const id = intToStr(containerState.$elementIndex$++);
    const open = doc.createComment(`t=${id}`);
    const close = doc.createComment('');
    const parent = node.parentElement;
    parent.insertBefore(open, node);
    parent.insertBefore(close, node.nextSibling);
    return ELEMENT_ID_PREFIX + id;
};
const isEmptyObj = (obj) => {
    return Object.keys(obj).length === 0;
};
function serializeObjects(objs, mustGetObjId, getObjId, collector, containerState) {
    return objs.map((obj) => {
        if (obj === null) {
            return null;
        }
        const typeObj = typeof obj;
        switch (typeObj) {
            case 'undefined':
                return UNDEFINED_PREFIX;
            case 'number':
                if (!Number.isFinite(obj)) {
                    break;
                }
                return obj;
            case 'string':
                if (obj.charCodeAt(0) < 32 /* space */) {
                    // if strings starts with a special character let the string serializer handle it
                    // to deal with escape sequences.
                    break;
                }
                else {
                    // Fast path of just serializing the string.
                    return obj;
                }
            case 'boolean':
                return obj;
        }
        const value = serializeValue(obj, mustGetObjId, collector, containerState);
        if (value !== undefined) {
            return value;
        }
        if (typeObj === 'object') {
            if (isArray(obj)) {
                return obj.map(mustGetObjId);
            }
            if (isSerializableObject(obj)) {
                const output = {};
                for (const key in obj) {
                    if (getObjId) {
                        const id = getObjId(obj[key]);
                        if (id !== null) {
                            output[key] = id;
                        }
                    }
                    else {
                        output[key] = mustGetObjId(obj[key]);
                    }
                }
                return output;
            }
        }
        throw qError(QError_verifySerializable, obj);
    });
}

// https://regexr.com/68v72
const EXTRACT_IMPORT_PATH = /\(\s*(['"])([^\1]+)\1\s*\)/;
// https://regexr.com/690ds
const EXTRACT_SELF_IMPORT = /Promise\s*\.\s*resolve/;
// https://regexr.com/6a83h
const EXTRACT_FILE_NAME = /[\\/(]([\w\d.\-_]+\.(js|ts)x?):/;
const announcedQRL = /*#__PURE__*/ new Set();
// <docs markdown="../readme.md#qrl">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#qrl instead)
/**
 * Used by Qwik Optimizer to point to lazy-loaded resources.
 *
 * This function should be used by the Qwik Optimizer only. The function should not be directly
 * referred to in the source code of the application.
 *
 * @param chunkOrFn - Chunk name (or function which is stringified to extract chunk name)
 * @param symbol - Symbol to lazy load
 * @param lexicalScopeCapture - A set of lexically scoped variables to capture.
 * @public
 * @see `QRL`, `$(...)`
 */
// </docs>
const qrl = (chunkOrFn, symbol, lexicalScopeCapture = EMPTY_ARRAY, stackOffset = 0) => {
    let chunk = null;
    let symbolFn = null;
    if (isFunction(chunkOrFn)) {
        symbolFn = chunkOrFn;
        if (qSerialize) {
            let match;
            const srcCode = String(chunkOrFn);
            if ((match = srcCode.match(EXTRACT_IMPORT_PATH)) && match[2]) {
                chunk = match[2];
            }
            else if ((match = srcCode.match(EXTRACT_SELF_IMPORT))) {
                const ref = 'QWIK-SELF';
                const frames = new Error(ref).stack.split('\n');
                const start = frames.findIndex((f) => f.includes(ref));
                const frame = frames[start + 2 + stackOffset];
                match = frame.match(EXTRACT_FILE_NAME);
                if (!match) {
                    chunk = 'main';
                }
                else {
                    chunk = match[1];
                }
            }
            else {
                throw qError(QError_dynamicImportFailed, srcCode);
            }
        }
    }
    else if (isString(chunkOrFn)) {
        chunk = chunkOrFn;
    }
    else {
        throw qError(QError_unknownTypeArgument, chunkOrFn);
    }
    if (!announcedQRL.has(symbol)) {
        // Emit event
        announcedQRL.add(symbol);
    }
    // Unwrap subscribers
    return createQRL(chunk, symbol, null, symbolFn, null, lexicalScopeCapture, null);
};
/** @internal */
const inlinedQrl = (symbol, symbolName, lexicalScopeCapture = EMPTY_ARRAY) => {
    // Unwrap subscribers
    return createQRL(null, symbolName, symbol, null, null, lexicalScopeCapture, null);
};
/** @internal */
const _noopQrl = (symbolName, lexicalScopeCapture = EMPTY_ARRAY) => {
    return createQRL(null, symbolName, null, null, null, lexicalScopeCapture, null);
};
/** @internal */
const _noopQrlDEV = (symbolName, opts, lexicalScopeCapture = EMPTY_ARRAY) => {
    const newQrl = _noopQrl(symbolName, lexicalScopeCapture);
    newQrl.dev = opts;
    return newQrl;
};
/** @internal */
const qrlDEV = (chunkOrFn, symbol, opts, lexicalScopeCapture = EMPTY_ARRAY) => {
    const newQrl = qrl(chunkOrFn, symbol, lexicalScopeCapture, 1);
    newQrl.dev = opts;
    return newQrl;
};
/** @internal */
const inlinedQrlDEV = (symbol, symbolName, opts, lexicalScopeCapture = EMPTY_ARRAY) => {
    const qrl = inlinedQrl(symbol, symbolName, lexicalScopeCapture);
    qrl.dev = opts;
    return qrl;
};
const serializeQRL = (qrl, opts = {}) => {
    assertTrue(qSerialize, 'In order to serialize a QRL, qSerialize must be true');
    assertQrl(qrl);
    let symbol = qrl.$symbol$;
    let chunk = qrl.$chunk$;
    const refSymbol = qrl.$refSymbol$ ?? symbol;
    const platform = getPlatform();
    if (platform) {
        const result = platform.chunkForSymbol(refSymbol, chunk, qrl.dev?.file);
        if (result) {
            chunk = result[1];
            if (!qrl.$refSymbol$) {
                symbol = result[0];
            }
        }
        else {
            console.error('serializeQRL: Cannot resolve symbol', symbol, 'in', chunk, qrl.dev?.file);
        }
    }
    if (qRuntimeQrl && chunk == null) {
        chunk = '/runtimeQRL';
        symbol = '_';
    }
    if (chunk == null) {
        throw qError(QError_qrlMissingChunk, qrl.$symbol$);
    }
    if (chunk.startsWith('./')) {
        chunk = chunk.slice(2);
    }
    if (isSyncQrl(qrl)) {
        if (opts.$containerState$) {
            const fn = qrl.resolved;
            const containerState = opts.$containerState$;
            const fnStrKey = fn.serialized || fn.toString();
            let id = containerState.$inlineFns$.get(fnStrKey);
            if (id === undefined) {
                id = containerState.$inlineFns$.size;
                containerState.$inlineFns$.set(fnStrKey, id);
            }
            symbol = String(id);
        }
        else {
            throwErrorAndStop('Sync QRL without containerState');
        }
    }
    let output = `${chunk}#${symbol}`;
    const capture = qrl.$capture$;
    const captureRef = qrl.$captureRef$;
    if (captureRef && captureRef.length) {
        if (opts.$getObjId$) {
            output += `[${mapJoin(captureRef, opts.$getObjId$, ' ')}]`;
        }
        else if (opts.$addRefMap$) {
            output += `[${mapJoin(captureRef, opts.$addRefMap$, ' ')}]`;
        }
    }
    else if (capture && capture.length > 0) {
        output += `[${capture.join(' ')}]`;
    }
    return output;
};
const serializeQRLs = (existingQRLs, containerState, elCtx) => {
    assertElement(elCtx.$element$);
    const opts = {
        $containerState$: containerState,
        $addRefMap$: (obj) => addToArray(elCtx.$refMap$, obj),
    };
    return mapJoin(existingQRLs, (qrl) => serializeQRL(qrl, opts), '\n');
};
/** `./chunk#symbol[captures] */
const parseQRL = (qrl, containerEl) => {
    const endIdx = qrl.length;
    const hashIdx = indexOf(qrl, 0, '#');
    const captureIdx = indexOf(qrl, hashIdx, '[');
    const chunkEndIdx = Math.min(hashIdx, captureIdx);
    const chunk = qrl.substring(0, chunkEndIdx);
    const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
    const symbolEndIdx = captureIdx;
    const symbol = symbolStartIdx == symbolEndIdx ? 'default' : qrl.substring(symbolStartIdx, symbolEndIdx);
    const captureStartIdx = captureIdx;
    const captureEndIdx = endIdx;
    const capture = captureStartIdx === captureEndIdx
        ? EMPTY_ARRAY
        : qrl.substring(captureStartIdx + 1, captureEndIdx - 1).split(' ');
    const iQrl = createQRL(chunk, symbol, null, null, capture, null, null);
    if (containerEl) {
        iQrl.$setContainer$(containerEl);
    }
    return iQrl;
};
const indexOf = (text, startIdx, char) => {
    const endIdx = text.length;
    const charIdx = text.indexOf(char, startIdx == endIdx ? 0 : startIdx);
    return charIdx == -1 ? endIdx : charIdx;
};
const addToArray = (array, obj) => {
    const index = array.indexOf(obj);
    if (index === -1) {
        array.push(obj);
        return String(array.length - 1);
    }
    return String(index);
};
const inflateQrl = (qrl, elCtx) => {
    assertDefined(qrl.$capture$, 'invoke: qrl capture must be defined inside useLexicalScope()', qrl);
    return (qrl.$captureRef$ = qrl.$capture$.map((idx) => {
        const int = parseInt(idx, 10);
        const obj = elCtx.$refMap$[int];
        assertTrue(elCtx.$refMap$.length > int, 'out of bounds inflate access', idx);
        return obj;
    }));
};
/** @internal */
const _regSymbol = (symbol, hash) => {
    if (typeof globalThis.__qwik_reg_symbols === 'undefined') {
        globalThis.__qwik_reg_symbols = new Map();
    }
    globalThis.__qwik_reg_symbols.set(hash, symbol);
    return symbol;
};

// <docs markdown="../readme.md#useResource">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useResource instead)
/**
 * This method works like an async memoized function that runs whenever some tracked value changes
 * and returns some data.
 *
 * `useResource` however returns immediate a `ResourceReturn` object that contains the data and a
 * state that indicates if the data is available or not.
 *
 * The status can be one of the following:
 *
 * - `pending` - the data is not yet available.
 * - `resolved` - the data is available.
 * - `rejected` - the data is not available due to an error or timeout.
 *
 * Avoid using a `try/catch` statement in `useResource$`. If you catch the error instead of passing
 * it, the resource status will never be `rejected`.
 *
 * ### Example
 *
 * Example showing how `useResource` to perform a fetch to request the weather, whenever the input
 * city name changes.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const cityS = useSignal('');
 *
 *   const weatherResource = useResource$(async ({ track, cleanup }) => {
 *     const cityName = track(cityS);
 *     const abortController = new AbortController();
 *     cleanup(() => abortController.abort('cleanup'));
 *     const res = await fetch(`http://weatherdata.com?city=${cityName}`, {
 *       signal: abortController.signal,
 *     });
 *     const data = await res.json();
 *     return data as { temp: number };
 *   });
 *
 *   return (
 *     <div>
 *       <input name="city" bind:value={cityS} />
 *       <Resource
 *         value={weatherResource}
 *         onResolved={(weather) => {
 *           return <div>Temperature: {weather.temp}</div>;
 *         }}
 *       />
 *     </div>
 *   );
 * });
 * ```
 *
 * @public
 * @see Resource
 * @see ResourceReturn
 */
// </docs>
const useResourceQrl = (qrl, opts) => {
    const { val, set, i, iCtx, elCtx } = useSequentialScope();
    if (val != null) {
        return val;
    }
    assertQrl(qrl);
    const containerState = iCtx.$renderCtx$.$static$.$containerState$;
    const resource = createResourceReturn(containerState, opts);
    const el = elCtx.$element$;
    const task = new Task(TaskFlagsIsDirty | TaskFlagsIsResource, i, el, qrl, resource);
    const previousWait = Promise.all(iCtx.$waitOn$.slice());
    runResource(task, containerState, iCtx.$renderCtx$, previousWait);
    if (!elCtx.$tasks$) {
        elCtx.$tasks$ = [];
    }
    elCtx.$tasks$.push(task);
    set(resource);
    return resource;
};
// <docs markdown="../readme.md#useResource">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useResource instead)
/**
 * This method works like an async memoized function that runs whenever some tracked value changes
 * and returns some data.
 *
 * `useResource` however returns immediate a `ResourceReturn` object that contains the data and a
 * state that indicates if the data is available or not.
 *
 * The status can be one of the following:
 *
 * - 'pending' - the data is not yet available.
 * - 'resolved' - the data is available.
 * - 'rejected' - the data is not available due to an error or timeout.
 *
 * ### Example
 *
 * Example showing how `useResource` to perform a fetch to request the weather, whenever the input
 * city name changes.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const cityS = useSignal('');
 *
 *   const weatherResource = useResource$(async ({ track, cleanup }) => {
 *     const cityName = track(cityS);
 *     const abortController = new AbortController();
 *     cleanup(() => abortController.abort('cleanup'));
 *     const res = await fetch(`http://weatherdata.com?city=${cityName}`, {
 *       signal: abortController.signal,
 *     });
 *     const data = await res.json();
 *     return data as { temp: number };
 *   });
 *
 *   return (
 *     <div>
 *       <input name="city" bind:value={cityS} />
 *       <Resource
 *         value={weatherResource}
 *         onResolved={(weather) => {
 *           return <div>Temperature: {weather.temp}</div>;
 *         }}
 *       />
 *     </div>
 *   );
 * });
 * ```
 *
 * @public
 * @see Resource
 * @see ResourceReturn
 */
// </docs>
const useResource$ = (generatorFn, opts) => {
    return useResourceQrl($(generatorFn), opts);
};
// <docs markdown="../readme.md#useResource">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useResource instead)
/**
 * This method works like an async memoized function that runs whenever some tracked value changes
 * and returns some data.
 *
 * `useResource` however returns immediate a `ResourceReturn` object that contains the data and a
 * state that indicates if the data is available or not.
 *
 * The status can be one of the following:
 *
 * - 'pending' - the data is not yet available.
 * - 'resolved' - the data is available.
 * - 'rejected' - the data is not available due to an error or timeout.
 *
 * ### Example
 *
 * Example showing how `useResource` to perform a fetch to request the weather, whenever the input
 * city name changes.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const cityS = useSignal('');
 *
 *   const weatherResource = useResource$(async ({ track, cleanup }) => {
 *     const cityName = track(cityS);
 *     const abortController = new AbortController();
 *     cleanup(() => abortController.abort('cleanup'));
 *     const res = await fetch(`http://weatherdata.com?city=${cityName}`, {
 *       signal: abortController.signal,
 *     });
 *     const data = await res.json();
 *     return data as { temp: number };
 *   });
 *
 *   return (
 *     <div>
 *       <input name="city" bind:value={cityS} />
 *       <Resource
 *         value={weatherResource}
 *         onResolved={(weather) => {
 *           return <div>Temperature: {weather.temp}</div>;
 *         }}
 *       />
 *     </div>
 *   );
 * });
 * ```
 *
 * @public
 * @see Resource
 * @see ResourceReturn
 */
// </docs>
const Resource = (props) => {
    const isBrowser = !isServerPlatform();
    const resource = props.value;
    let promise;
    if (isResourceReturn(resource)) {
        if (isBrowser) {
            if (props.onRejected) {
                resource.value.catch(() => { });
                if (resource._state === 'rejected') {
                    return props.onRejected(resource._error);
                }
            }
            if (props.onPending) {
                const state = resource._state;
                if (state === 'resolved') {
                    return props.onResolved(resource._resolved);
                }
                else if (state === 'pending') {
                    return props.onPending();
                }
                else if (state === 'rejected') {
                    throw resource._error;
                }
            }
            if (untrack(() => resource._resolved) !== undefined) {
                return props.onResolved(resource._resolved);
            }
        }
        promise = resource.value;
    }
    else if (isPromise(resource)) {
        promise = resource;
    }
    else if (isSignal(resource)) {
        promise = Promise.resolve(resource.value);
    }
    else {
        return props.onResolved(resource);
    }
    // Resource path
    return jsx(Fragment, {
        children: promise.then(useBindInvokeContext(props.onResolved), useBindInvokeContext(props.onRejected)),
    });
};
const _createResourceReturn = (opts) => {
    const resource = {
        __brand: 'resource',
        value: undefined,
        loading: isServerPlatform() ? false : true,
        _resolved: undefined,
        _error: undefined,
        _state: 'pending',
        _timeout: opts?.timeout ?? -1,
        _cache: 0,
    };
    return resource;
};
const createResourceReturn = (containerState, opts, initialPromise) => {
    const result = _createResourceReturn(opts);
    result.value = initialPromise;
    const resource = createProxy(result, containerState, undefined);
    return resource;
};
const isResourceReturn = (obj) => {
    return isObject(obj) && obj.__brand === 'resource';
};
const serializeResource = (resource, getObjId) => {
    const state = resource._state;
    if (state === 'resolved') {
        return `0 ${getObjId(resource._resolved)}`;
    }
    else if (state === 'pending') {
        return `1`;
    }
    else {
        return `2 ${getObjId(resource._error)}`;
    }
};
const parseResourceReturn = (data) => {
    const [first, id] = data.split(' ');
    const result = _createResourceReturn(undefined);
    result.value = Promise.resolve();
    if (first === '0') {
        result._state = 'resolved';
        result._resolved = id;
        result.loading = false;
    }
    else if (first === '1') {
        result._state = 'pending';
        result.value = new Promise(() => { });
        result.loading = true;
    }
    else if (first === '2') {
        result._state = 'rejected';
        result._error = id;
        result.loading = false;
    }
    return result;
};

/**
 * Allows to project the children of the current component. `<Slot/>` can only be used within the
 * context of a component defined with `component$`.
 *
 * @public
 */
const Slot = (props) => {
    return _jsxC(Virtual, {
        [QSlotS]: '',
    }, 0, props.name ?? '');
};

/**
 * - 0, 8, 9, A, B, C, D
 * - `\0`: null character (U+0000 NULL) (only if the next character is not a decimal digit; else it’s
 *   an octal escape sequence)
 * - `\b`: backspace (U+0008 BACKSPACE)
 * - `\t`: horizontal tab (U+0009 CHARACTER TABULATION)
 * - `\n`: line feed (U+000A LINE FEED)
 * - `\v`: vertical tab (U+000B LINE TABULATION)
 * - `\f`: form feed (U+000C FORM FEED)
 * - `\r`: carriage return (U+000D CARRIAGE RETURN)
 * - `\"`: double quote (U+0022 QUOTATION MARK)
 * - `\'`: single quote (U+0027 APOSTROPHE)
 * - `\\`: backslash (U+005C REVERSE SOLIDUS)
 */
const UNDEFINED_PREFIX = '\u0001';
/**
 * Normalize the shape of the serializer for better inline-cache performance.
 *
 * @param serializer
 * @returns
 */
function serializer(serializer) {
    return {
        $prefixCode$: serializer.$prefix$.charCodeAt(0),
        $prefixChar$: serializer.$prefix$,
        $test$: serializer.$test$,
        $serialize$: serializer.$serialize$,
        $prepare$: serializer.$prepare$,
        $fill$: serializer.$fill$,
        $collect$: serializer.$collect$,
        $subs$: serializer.$subs$,
    };
}
const QRLSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0002',
    $test$: (v) => isQrl(v),
    $collect$: (v, collector, leaks) => {
        if (v.$captureRef$) {
            for (const item of v.$captureRef$) {
                collectValue(item, collector, leaks);
            }
        }
        if (collector.$prefetch$ === 0) {
            collector.$qrls$.push(v);
        }
    },
    $serialize$: (obj, getObjId) => {
        return serializeQRL(obj, {
            $getObjId$: getObjId,
        });
    },
    $prepare$: (data, containerState) => {
        return parseQRL(data, containerState.$containerEl$);
    },
    $fill$: (qrl, getObject) => {
        if (qrl.$capture$ && qrl.$capture$.length > 0) {
            qrl.$captureRef$ = qrl.$capture$.map(getObject);
            qrl.$capture$ = null;
        }
    },
});
const TaskSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0003',
    $test$: (v) => isSubscriberDescriptor(v),
    $collect$: (v, collector, leaks) => {
        collectValue(v.$qrl$, collector, leaks);
        if (v.$state$) {
            collectValue(v.$state$, collector, leaks);
            if (leaks === true && v.$state$ instanceof SignalImpl) {
                collectSubscriptions(v.$state$[QObjectManagerSymbol], collector, true);
            }
        }
    },
    $serialize$: (obj, getObjId) => serializeTask(obj, getObjId),
    $prepare$: (data) => parseTask(data),
    $fill$: (task, getObject) => {
        task.$el$ = getObject(task.$el$);
        task.$qrl$ = getObject(task.$qrl$);
        if (task.$state$) {
            task.$state$ = getObject(task.$state$);
        }
    },
});
const ResourceSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0004',
    $test$: (v) => isResourceReturn(v),
    $collect$: (obj, collector, leaks) => {
        collectValue(obj.value, collector, leaks);
        collectValue(obj._resolved, collector, leaks);
    },
    $serialize$: (obj, getObjId) => {
        return serializeResource(obj, getObjId);
    },
    $prepare$: (data) => {
        return parseResourceReturn(data);
    },
    $fill$: (resource, getObject) => {
        if (resource._state === 'resolved') {
            resource._resolved = getObject(resource._resolved);
            resource.value = Promise.resolve(resource._resolved);
        }
        else if (resource._state === 'rejected') {
            const p = Promise.reject(resource._error);
            p.catch(() => null);
            resource._error = getObject(resource._error);
            resource.value = p;
        }
    },
});
const URLSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0005',
    $test$: (v) => v instanceof URL,
    $serialize$: (obj) => obj.href,
    $prepare$: (data) => new URL(data),
});
const DateSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0006',
    $test$: (v) => v instanceof Date,
    $serialize$: (obj) => obj.toISOString(),
    $prepare$: (data) => new Date(data),
});
const RegexSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0007',
    $test$: (v) => v instanceof RegExp,
    $serialize$: (obj) => `${obj.flags} ${obj.source}`,
    $prepare$: (data) => {
        const space = data.indexOf(' ');
        const source = data.slice(space + 1);
        const flags = data.slice(0, space);
        return new RegExp(source, flags);
    },
});
const ErrorSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u000E',
    $test$: (v) => v instanceof Error,
    $serialize$: (obj) => {
        return obj.message;
    },
    $prepare$: (text) => {
        const err = new Error(text);
        err.stack = undefined;
        return err;
    },
});
const DocumentSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u000F',
    $test$: (v) => !!v && typeof v === 'object' && isDocument(v),
    $prepare$: (_, _c, doc) => {
        return doc;
    },
});
const SERIALIZABLE_STATE = Symbol('serializable-data');
const ComponentSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0010',
    $test$: (obj) => isQwikComponent(obj),
    $serialize$: (obj, getObjId) => {
        const [qrl] = obj[SERIALIZABLE_STATE];
        return serializeQRL(qrl, {
            $getObjId$: getObjId,
        });
    },
    $prepare$: (data, containerState) => {
        const qrl = parseQRL(data, containerState.$containerEl$);
        return componentQrl(qrl);
    },
    $fill$: (component, getObject) => {
        const [qrl] = component[SERIALIZABLE_STATE];
        if (qrl.$capture$?.length) {
            qrl.$captureRef$ = qrl.$capture$.map(getObject);
            qrl.$capture$ = null;
        }
    },
});
const DerivedSignalSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0011',
    $test$: (obj) => obj instanceof SignalDerived,
    $collect$: (obj, collector, leaks) => {
        if (obj.$args$) {
            for (const arg of obj.$args$) {
                collectValue(arg, collector, leaks);
            }
        }
    },
    $serialize$: (signal, getObjID, collector) => {
        const serialized = serializeDerivedSignalFunc(signal);
        let index = collector.$inlinedFunctions$.indexOf(serialized);
        if (index < 0) {
            index = collector.$inlinedFunctions$.length;
            collector.$inlinedFunctions$.push(serialized);
        }
        return mapJoin(signal.$args$, getObjID, ' ') + ' @' + intToStr(index);
    },
    $prepare$: (data) => {
        const ids = data.split(' ');
        const args = ids.slice(0, -1);
        const fn = ids[ids.length - 1];
        return new SignalDerived(fn, args, fn);
    },
    $fill$: (fn, getObject) => {
        assertString(fn.$func$, 'fn.$func$ should be a string');
        fn.$func$ = getObject(fn.$func$);
        fn.$args$ = fn.$args$.map(getObject);
    },
});
const SignalSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0012',
    $test$: (v) => v instanceof SignalImpl,
    $collect$: (obj, collector, leaks) => {
        collectValue(obj.untrackedValue, collector, leaks);
        const mutable = (obj[QObjectSignalFlags] & SIGNAL_IMMUTABLE) === 0;
        if (leaks === true && mutable) {
            collectSubscriptions(obj[QObjectManagerSymbol], collector, true);
        }
        return obj;
    },
    $serialize$: (obj, getObjId) => {
        return getObjId(obj.untrackedValue);
    },
    $prepare$: (data, containerState) => {
        return new SignalImpl(data, containerState?.$subsManager$?.$createManager$(), 0);
    },
    $subs$: (signal, subs) => {
        signal[QObjectManagerSymbol].$addSubs$(subs);
    },
    $fill$: (signal, getObject) => {
        signal.untrackedValue = getObject(signal.untrackedValue);
    },
});
const SignalWrapperSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0013',
    $test$: (v) => v instanceof SignalWrapper,
    $collect$(obj, collector, leaks) {
        collectValue(obj.ref, collector, leaks);
        if (fastWeakSerialize(obj.ref)) {
            const localManager = getSubscriptionManager(obj.ref);
            if (isTreeShakeable(collector.$containerState$.$subsManager$, localManager, leaks)) {
                collectValue(obj.ref[obj.prop], collector, leaks);
            }
        }
        return obj;
    },
    $serialize$: (obj, getObjId) => {
        return `${getObjId(obj.ref)} ${obj.prop}`;
    },
    $prepare$: (data) => {
        const [id, prop] = data.split(' ');
        return new SignalWrapper(id, prop);
    },
    $fill$: (signal, getObject) => {
        signal.ref = getObject(signal.ref);
    },
});
const NoFiniteNumberSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0014',
    $test$: (v) => typeof v === 'number',
    $serialize$: (v) => {
        return String(v);
    },
    $prepare$: (data) => {
        return Number(data);
    },
});
const URLSearchParamsSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0015',
    $test$: (v) => v instanceof URLSearchParams,
    $serialize$: (obj) => obj.toString(),
    $prepare$: (data) => new URLSearchParams(data),
});
const FormDataSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0016',
    $test$: (v) => typeof FormData !== 'undefined' && v instanceof globalThis.FormData,
    $serialize$: (formData) => {
        const array = [];
        formData.forEach((value, key) => {
            if (typeof value === 'string') {
                array.push([key, value]);
            }
            else {
                array.push([key, value.name]);
            }
        });
        return JSON.stringify(array);
    },
    $prepare$: (data) => {
        const array = JSON.parse(data);
        const formData = new FormData();
        for (const [key, value] of array) {
            formData.append(key, value);
        }
        return formData;
    },
});
const JSXNodeSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0017',
    $test$: (v) => isJSXNode(v),
    $collect$: (node, collector, leaks) => {
        collectValue(node.children, collector, leaks);
        collectValue(node.props, collector, leaks);
        collectValue(node.immutableProps, collector, leaks);
        collectValue(node.key, collector, leaks);
        let type = node.type;
        if (type === Slot) {
            type = ':slot';
        }
        else if (type === Fragment) {
            type = ':fragment';
        }
        collectValue(type, collector, leaks);
    },
    $serialize$: (node, getObjID) => {
        let type = node.type;
        if (type === Slot) {
            type = ':slot';
        }
        else if (type === Fragment) {
            type = ':fragment';
        }
        return `${getObjID(type)} ${getObjID(node.props)} ${getObjID(node.immutableProps)} ${getObjID(node.key)} ${getObjID(node.children)} ${node.flags}`;
    },
    $prepare$: (data) => {
        const [type, props, immutableProps, key, children, flags] = data.split(' ');
        const node = new JSXNodeImpl(type, props, immutableProps, children, parseInt(flags, 10), key);
        return node;
    },
    $fill$: (node, getObject) => {
        node.type = getResolveJSXType(getObject(node.type));
        node.props = getObject(node.props);
        node.immutableProps = getObject(node.immutableProps);
        node.key = getObject(node.key);
        node.children = getObject(node.children);
    },
});
const BigIntSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0018',
    $test$: (v) => typeof v === 'bigint',
    $serialize$: (v) => {
        return v.toString();
    },
    $prepare$: (data) => {
        return BigInt(data);
    },
});
const Uint8ArraySerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u001c',
    $test$: (v) => v instanceof Uint8Array,
    $serialize$: (v) => {
        let buf = '';
        for (const c of v) {
            buf += String.fromCharCode(c);
        }
        return btoa(buf).replace(/=+$/, '');
    },
    $prepare$: (data) => {
        const buf = atob(data);
        const bytes = new Uint8Array(buf.length);
        let i = 0;
        for (const s of buf) {
            bytes[i++] = s.charCodeAt(0);
        }
        return bytes;
    },
    $fill$: undefined,
});
const DATA = Symbol();
const SetSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u0019',
    $test$: (v) => v instanceof Set,
    $collect$: (set, collector, leaks) => {
        set.forEach((value) => collectValue(value, collector, leaks));
    },
    $serialize$: (v, getObjID) => {
        return Array.from(v).map(getObjID).join(' ');
    },
    $prepare$: (data) => {
        const set = new Set();
        set[DATA] = data;
        return set;
    },
    $fill$: (set, getObject) => {
        const data = set[DATA];
        set[DATA] = undefined;
        assertString(data, 'SetSerializer should be defined');
        const items = data.length === 0 ? [] : data.split(' ');
        for (const id of items) {
            set.add(getObject(id));
        }
    },
});
const MapSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u001a',
    $test$: (v) => v instanceof Map,
    $collect$: (map, collector, leaks) => {
        map.forEach((value, key) => {
            collectValue(value, collector, leaks);
            collectValue(key, collector, leaks);
        });
    },
    $serialize$: (map, getObjID) => {
        const result = [];
        map.forEach((value, key) => {
            result.push(getObjID(key) + ' ' + getObjID(value));
        });
        return result.join(' ');
    },
    $prepare$: (data) => {
        const set = new Map();
        set[DATA] = data;
        return set;
    },
    $fill$: (set, getObject) => {
        const data = set[DATA];
        set[DATA] = undefined;
        assertString(data, 'SetSerializer should be defined');
        const items = data.length === 0 ? [] : data.split(' ');
        assertTrue(items.length % 2 === 0, 'MapSerializer should have even number of items');
        for (let i = 0; i < items.length; i += 2) {
            set.set(getObject(items[i]), getObject(items[i + 1]));
        }
    },
});
const StringSerializer = /*#__PURE__*/ serializer({
    $prefix$: '\u001b',
    $test$: (v) => !!getSerializer(v) || v === UNDEFINED_PREFIX,
    $serialize$: (v) => v,
    $prepare$: (data) => data,
});
const serializers = [
    // NULL                       \u0000
    // UNDEFINED_PREFIX           \u0001
    QRLSerializer, ////////////// \u0002
    TaskSerializer, ///////////// \u0003
    ResourceSerializer, ///////// \u0004
    URLSerializer, ////////////// \u0005
    DateSerializer, ///////////// \u0006
    RegexSerializer, //////////// \u0007
    // BACKSPACE                  \u0008
    // HORIZONTAL TAB             \u0009
    // NEW LINE                   \u000A
    // VERTICAL TAB               \u000B
    // FORM FEED                  \u000C
    // CARRIAGE RETURN            \u000D
    ErrorSerializer, //////////// \u000E
    DocumentSerializer, ///////// \u000F
    ComponentSerializer, //////// \u0010
    DerivedSignalSerializer, //// \u0011
    SignalSerializer, /////////// \u0012
    SignalWrapperSerializer, //// \u0013
    NoFiniteNumberSerializer, /// \u0014
    URLSearchParamsSerializer, // \u0015
    FormDataSerializer, ///////// \u0016
    JSXNodeSerializer, ////////// \u0017
    BigIntSerializer, /////////// \u0018
    SetSerializer, ////////////// \u0019
    MapSerializer, ////////////// \u001a
    StringSerializer, /////////// \u001b
    Uint8ArraySerializer, /////// \u001c
];
const serializerByPrefix = /*#__PURE__*/ (() => {
    const serializerByPrefix = [];
    serializers.forEach((s) => {
        const prefix = s.$prefixCode$;
        while (serializerByPrefix.length < prefix) {
            serializerByPrefix.push(undefined);
        }
        serializerByPrefix.push(s);
    });
    return serializerByPrefix;
})();
function getSerializer(obj) {
    if (typeof obj === 'string') {
        const prefix = obj.charCodeAt(0);
        if (prefix < serializerByPrefix.length) {
            return serializerByPrefix[prefix];
        }
    }
    return undefined;
}
const collectorSerializers = /*#__PURE__*/ serializers.filter((a) => a.$collect$);
const canSerialize = (obj) => {
    for (const s of serializers) {
        if (s.$test$(obj)) {
            return true;
        }
    }
    return false;
};
const collectDeps = (obj, collector, leaks) => {
    for (const s of collectorSerializers) {
        if (s.$test$(obj)) {
            s.$collect$(obj, collector, leaks);
            return true;
        }
    }
    return false;
};
const serializeValue = (obj, getObjID, collector, containerState) => {
    for (const s of serializers) {
        if (s.$test$(obj)) {
            let value = s.$prefixChar$;
            if (s.$serialize$) {
                value += s.$serialize$(obj, getObjID, collector, containerState);
            }
            return value;
        }
    }
    if (typeof obj === 'string') {
        return obj;
    }
    return undefined;
};
const createParser = (containerState, doc) => {
    const fillMap = new Map();
    const subsMap = new Map();
    return {
        prepare(data) {
            const serializer = getSerializer(data);
            if (serializer) {
                const value = serializer.$prepare$(data.slice(1), containerState, doc);
                if (serializer.$fill$) {
                    fillMap.set(value, serializer);
                }
                if (serializer.$subs$) {
                    subsMap.set(value, serializer);
                }
                return value;
            }
            return data;
        },
        subs(obj, subs) {
            const serializer = subsMap.get(obj);
            if (serializer) {
                serializer.$subs$(obj, subs, containerState);
                return true;
            }
            return false;
        },
        fill(obj, getObject) {
            const serializer = fillMap.get(obj);
            if (serializer) {
                serializer.$fill$(obj, getObject, containerState);
                return true;
            }
            return false;
        },
    };
};
const OBJECT_TRANSFORMS = {
    '!': (obj, containerState) => {
        return containerState.$proxyMap$.get(obj) ?? getOrCreateProxy(obj, containerState);
    },
    '~': (obj) => {
        return Promise.resolve(obj);
    },
    _: (obj) => {
        return Promise.reject(obj);
    },
};
const isTreeShakeable = (manager, target, leaks) => {
    if (typeof leaks === 'boolean') {
        return leaks;
    }
    const localManager = manager.$groupToManagers$.get(leaks);
    if (localManager && localManager.length > 0) {
        if (localManager.length === 1) {
            return localManager[0] !== target;
        }
        return true;
    }
    return false;
};
const getResolveJSXType = (type) => {
    if (type === ':slot') {
        return Slot;
    }
    if (type === ':fragment') {
        return Fragment;
    }
    return type;
};

/** @internal */
const verifySerializable = (value, preMessage) => {
    const seen = new Set();
    return _verifySerializable(value, seen, '_', preMessage);
};
const _verifySerializable = (value, seen, ctx, preMessage) => {
    const unwrapped = unwrapProxy(value);
    if (unwrapped == null) {
        return value;
    }
    if (shouldSerialize(unwrapped)) {
        if (seen.has(unwrapped)) {
            return value;
        }
        seen.add(unwrapped);
        if (canSerialize(unwrapped)) {
            return value;
        }
        const typeObj = typeof unwrapped;
        switch (typeObj) {
            case 'object':
                if (isPromise(unwrapped)) {
                    return value;
                }
                if (isNode$1(unwrapped)) {
                    return value;
                }
                if (isArray(unwrapped)) {
                    let expectIndex = 0;
                    // Make sure the array has no holes
                    unwrapped.forEach((v, i) => {
                        if (i !== expectIndex) {
                            throw qError(QError_verifySerializable, unwrapped);
                        }
                        _verifySerializable(v, seen, ctx + '[' + i + ']');
                        expectIndex = i + 1;
                    });
                    return value;
                }
                if (isSerializableObject(unwrapped)) {
                    for (const [key, item] of Object.entries(unwrapped)) {
                        _verifySerializable(item, seen, ctx + '.' + key);
                    }
                    return value;
                }
                break;
            case 'boolean':
            case 'string':
            case 'number':
                return value;
        }
        let message = '';
        if (preMessage) {
            message = preMessage;
        }
        else {
            message = 'Value cannot be serialized';
        }
        if (ctx !== '_') {
            message += ` in ${ctx},`;
        }
        if (typeObj === 'object') {
            message += ` because it's an instance of "${value?.constructor.name}". You might need to use 'noSerialize()' or use an object literal instead. Check out https://qwik.dev/docs/advanced/dollar/`;
        }
        else if (typeObj === 'function') {
            const fnName = value.name;
            message += ` because it's a function named "${fnName}". You might need to convert it to a QRL using $(fn):\n\nconst ${fnName} = $(${String(value)});\n\nPlease check out https://qwik.dev/docs/advanced/qrl/ for more information.`;
        }
        console.error('Trying to serialize', value);
        throwErrorAndStop(message);
    }
    return value;
};
const noSerializeSet = /*#__PURE__*/ new WeakSet();
const weakSerializeSet = /*#__PURE__*/ new WeakSet();
const shouldSerialize = (obj) => {
    if (isObject(obj) || isFunction(obj)) {
        return !noSerializeSet.has(obj);
    }
    return true;
};
const fastSkipSerialize = (obj) => {
    return noSerializeSet.has(obj);
};
const fastWeakSerialize = (obj) => {
    return weakSerializeSet.has(obj);
};
// <docs markdown="../readme.md#noSerialize">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#noSerialize instead)
/**
 * Marks a property on a store as non-serializable.
 *
 * At times it is necessary to store values on a store that are non-serializable. Normally this is a
 * runtime error as Store wants to eagerly report when a non-serializable property is assigned to
 * it.
 *
 * You can use `noSerialize()` to mark a value as non-serializable. The value is persisted in the
 * Store but does not survive serialization. The implication is that when your application is
 * resumed, the value of this object will be `undefined`. You will be responsible for recovering
 * from this.
 *
 * See: [noSerialize Tutorial](http://qwik.dev/tutorial/store/no-serialize)
 *
 * @public
 */
// </docs>
const noSerialize = (input) => {
    if (input != null) {
        noSerializeSet.add(input);
    }
    return input;
};
/** @internal */
const _weakSerialize = (input) => {
    weakSerializeSet.add(input);
    return input;
};
const isConnected = (sub) => {
    if (isSubscriberDescriptor(sub)) {
        return isConnected(sub.$el$);
    }
    else {
        return !!tryGetContext(sub) || sub.isConnected;
    }
};
/**
 * Get the target value of the Proxy. Useful if you want to clone a store (structureClone,
 * IndexedDB,...)
 *
 * @public
 */
const unwrapProxy = (proxy) => {
    return isObject(proxy) ? (getProxyTarget(proxy) ?? proxy) : proxy;
};
const getProxyTarget = (obj) => {
    return obj[QOjectTargetSymbol];
};
const getSubscriptionManager = (obj) => {
    return obj[QObjectManagerSymbol];
};
const getProxyFlags = (obj) => {
    return obj[QObjectFlagsSymbol];
};
const serializeSubscription = (sub, getObjId) => {
    const type = sub[0];
    const host = typeof sub[1] === 'string' ? sub[1] : getObjId(sub[1]);
    if (!host) {
        return undefined;
    }
    let base = type + ' ' + host;
    let key;
    if (type === 0) {
        key = sub[2];
    }
    else {
        const signalID = getObjId(sub[2]);
        if (!signalID) {
            return undefined;
        }
        if (type <= 2) {
            key = sub[5];
            base += ` ${signalID} ${must(getObjId(sub[3]))} ${sub[4]}`;
        }
        else if (type <= 4) {
            key = sub[4];
            const nodeID = typeof sub[3] === 'string' ? sub[3] : must(getObjId(sub[3]));
            base += ` ${signalID} ${nodeID}`;
        }
        else {
            assertFail('Should not get here');
        }
    }
    if (key) {
        base += ` ${encodeURI(key)}`;
    }
    return base;
};
const parseSubscription = (sub, getObject) => {
    const parts = sub.split(' ');
    const type = parseInt(parts[0], 10);
    assertTrue(parts.length >= 2, 'At least 2 parts');
    const host = getObject(parts[1]);
    if (!host) {
        return undefined;
    }
    if (isSubscriberDescriptor(host) && !host.$el$) {
        return undefined;
    }
    const subscription = [type, host];
    if (type === 0) {
        assertTrue(parts.length <= 3, 'Max 3 parts');
        subscription.push(safeDecode(parts[2]));
    }
    else if (type <= 2) {
        assertTrue(parts.length === 5 || parts.length === 6, 'Type 1 has 5');
        subscription.push(getObject(parts[2]), getObject(parts[3]), parts[4], safeDecode(parts[5]));
    }
    else if (type <= 4) {
        assertTrue(parts.length === 4 || parts.length === 5, 'Type 2 has 4');
        subscription.push(getObject(parts[2]), getObject(parts[3]), safeDecode(parts[4]));
    }
    return subscription;
};
const safeDecode = (str) => {
    if (str !== undefined) {
        return decodeURI(str);
    }
    return undefined;
};
const createSubscriptionManager = (containerState) => {
    const groupToManagers = new Map();
    const manager = {
        $groupToManagers$: groupToManagers,
        $createManager$: (initialMap) => {
            return new LocalSubscriptionManager(groupToManagers, containerState, initialMap);
        },
        $clearSub$: (group) => {
            const managers = groupToManagers.get(group);
            if (managers) {
                for (const manager of managers) {
                    manager.$unsubGroup$(group);
                }
                groupToManagers.delete(group);
                managers.length = 0;
            }
        },
        $clearSignal$: (signal) => {
            const managers = groupToManagers.get(signal[1]);
            if (managers) {
                for (const manager of managers) {
                    manager.$unsubEntry$(signal);
                }
            }
        },
    };
    seal(manager);
    return manager;
};
class LocalSubscriptionManager {
    $groupToManagers$;
    $containerState$;
    $subs$;
    constructor($groupToManagers$, $containerState$, initialMap) {
        this.$groupToManagers$ = $groupToManagers$;
        this.$containerState$ = $containerState$;
        this.$subs$ = [];
        if (initialMap) {
            this.$addSubs$(initialMap);
        }
        seal(this);
    }
    $addSubs$(subs) {
        this.$subs$.push(...subs);
        for (const sub of this.$subs$) {
            this.$addToGroup$(sub[1], this);
        }
    }
    $addToGroup$(group, manager) {
        let managers = this.$groupToManagers$.get(group);
        if (!managers) {
            this.$groupToManagers$.set(group, (managers = []));
        }
        if (!managers.includes(manager)) {
            managers.push(manager);
        }
    }
    $unsubGroup$(group) {
        const subs = this.$subs$;
        for (let i = 0; i < subs.length; i++) {
            const found = subs[i][1] === group;
            if (found) {
                subs.splice(i, 1);
                i--;
            }
        }
    }
    $unsubEntry$(entry) {
        const [type, group, signal, elm] = entry;
        const subs = this.$subs$;
        if (type === 1 || type === 2) {
            const prop = entry[4];
            for (let i = 0; i < subs.length; i++) {
                const sub = subs[i];
                const match = sub[0] === type &&
                    sub[1] === group &&
                    sub[2] === signal &&
                    sub[3] === elm &&
                    sub[4] === prop;
                if (match) {
                    subs.splice(i, 1);
                    i--;
                }
            }
        }
        else if (type === 3 || type === 4) {
            for (let i = 0; i < subs.length; i++) {
                const sub = subs[i];
                const match = sub[0] === type && sub[1] === group && sub[2] === signal && sub[3] === elm;
                if (match) {
                    subs.splice(i, 1);
                    i--;
                }
            }
        }
    }
    $addSub$(sub, key) {
        const subs = this.$subs$;
        const group = sub[1];
        if (sub[0] === 0 &&
            subs.some(([_type, _group, _key]) => _type === 0 && _group === group && _key === key)) {
            return;
        }
        subs.push((__lastSubscription = [...sub, key]));
        this.$addToGroup$(group, this);
    }
    $notifySubs$(key) {
        const subs = this.$subs$;
        for (const sub of subs) {
            const compare = sub[sub.length - 1];
            if (key && compare && compare !== key) {
                continue;
            }
            notifyChange(sub, this.$containerState$);
        }
    }
}
let __lastSubscription;
function getLastSubscription() {
    // HACK(misko): This is a hack to get the last subscription.
    // It is used by `executeSignalOperation` to update the target element
    // after the subscription has been created.
    return __lastSubscription;
}
const must = (a) => {
    if (a == null) {
        throw logError('must be non null', a);
    }
    return a;
};

const isQrl = (value) => {
    return typeof value === 'function' && typeof value.getSymbol === 'function';
};
// Make sure this value is same as value in `platform.ts`
const SYNC_QRL = '<sync>';
/** Sync QRL is a function which is serialized into `<script q:func="qwik/json">` tag. */
const isSyncQrl = (value) => {
    return isQrl(value) && value.$symbol$ == SYNC_QRL;
};
const createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
    if (qDev && qSerialize) {
        if (captureRef) {
            for (const item of captureRef) {
                verifySerializable(item, 'Captured variable in the closure can not be serialized');
            }
        }
    }
    let _containerEl;
    const qrl = async function (...args) {
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
    // Wrap functions to provide their lexical scope
    const wrapFn = (fn) => {
        if (typeof fn !== 'function' || (!capture?.length && !captureRef?.length)) {
            return fn;
        }
        return function (...args) {
            let context = tryGetInvokeContext();
            if (context) {
                const prevQrl = context.$qrl$;
                context.$qrl$ = qrl;
                const prevEvent = context.$event$;
                if (context.$event$ === undefined) {
                    context.$event$ = this;
                }
                try {
                    return fn.apply(this, args);
                }
                finally {
                    context.$qrl$ = prevQrl;
                    context.$event$ = prevEvent;
                }
            }
            context = newInvokeContext();
            context.$qrl$ = qrl;
            context.$event$ = this;
            return invoke.call(this, context, fn, ...args);
        };
    };
    const resolve = async (containerEl) => {
        if (symbolRef !== null) {
            // Resolving (Promise) or already resolved (value)
            return symbolRef;
        }
        if (containerEl) {
            setContainer(containerEl);
        }
        if (chunk === '') {
            // Sync QRL
            assertDefined(_containerEl, 'Sync QRL must have container element');
            const hash = _containerEl.getAttribute(QInstance);
            const doc = _containerEl.ownerDocument;
            const qFuncs = getQFuncs(doc, hash);
            // No need to wrap, syncQRLs can't have captured scope
            return (qrl.resolved = symbolRef = qFuncs[Number(symbol)]);
        }
        if (isBrowser && chunk) {
            /** We run the QRL, so now the probability of the chunk is 100% */
            p(chunk, 1);
        }
        const start = now();
        const ctx = tryGetInvokeContext();
        if (symbolFn !== null) {
            symbolRef = symbolFn().then((module) => (qrl.resolved = symbolRef = wrapFn(module[symbol])));
        }
        else {
            const imported = getPlatform().importSymbol(_containerEl, chunk, symbol);
            symbolRef = maybeThen(imported, (ref) => (qrl.resolved = symbolRef = wrapFn(ref)));
        }
        if (typeof symbolRef === 'object' && isPromise(symbolRef)) {
            symbolRef.then(() => emitUsedSymbol(symbol, ctx?.$element$, start), (err) => {
                console.error(`qrl ${symbol} failed to load`, err);
                // We shouldn't cache rejections, we can try again later
                symbolRef = null;
            });
        }
        return symbolRef;
    };
    const resolveLazy = (containerEl) => {
        return symbolRef !== null ? symbolRef : resolve(containerEl);
    };
    function invokeFn(currentCtx, beforeFn) {
        // Note that we bind the current `this`
        return (...args) => maybeThen(resolveLazy(), (f) => {
            if (!isFunction(f)) {
                throw qError(QError_qrlIsNotFunction);
            }
            if (beforeFn && beforeFn() === false) {
                return;
            }
            const context = createOrReuseInvocationContext(currentCtx);
            return invoke.call(this, context, f, ...args);
        });
    }
    const createOrReuseInvocationContext = (invoke) => {
        if (invoke == null) {
            return newInvokeContext();
        }
        else if (isArray(invoke)) {
            return newInvokeContextFromTuple(invoke);
        }
        else {
            return invoke;
        }
    };
    const resolvedSymbol = refSymbol ?? symbol;
    const hash = getSymbolHash(resolvedSymbol);
    Object.assign(qrl, {
        getSymbol: () => resolvedSymbol,
        getHash: () => hash,
        getCaptured: () => captureRef,
        resolve,
        $resolveLazy$: resolveLazy,
        $setContainer$: setContainer,
        $chunk$: chunk,
        $symbol$: symbol,
        $refSymbol$: refSymbol,
        $hash$: hash,
        getFn: invokeFn,
        $capture$: capture,
        $captureRef$: captureRef,
        dev: null,
        resolved: undefined,
    });
    if (symbolRef) {
        // Replace symbolRef with (a promise for) the value or wrapped function
        symbolRef = maybeThen(symbolRef, (resolved) => (qrl.resolved = symbolRef = wrapFn(resolved)));
    }
    if (qDev) {
        seal(qrl);
    }
    if (isBrowser && resolvedSymbol) {
        /**
         * Preloading the symbol instead of the chunk allows us to get probabilities for the bundle
         * based on its contents.
         */
        p(resolvedSymbol, 0.8);
    }
    return qrl;
};
const getSymbolHash = (symbolName) => {
    const index = symbolName.lastIndexOf('_');
    if (index > -1) {
        return symbolName.slice(index + 1);
    }
    return symbolName;
};
function assertQrl(qrl) {
    if (qDev) {
        if (!isQrl(qrl)) {
            throw new Error('Not a QRL');
        }
    }
}
function assertSignal(obj) {
    if (qDev) {
        if (!isSignal(obj)) {
            throw new Error('Not a Signal');
        }
    }
}
const EMITTED = /*#__PURE__*/ new Set();
const emitUsedSymbol = (symbol, element, reqTime) => {
    if (!EMITTED.has(symbol)) {
        EMITTED.add(symbol);
        emitEvent('qsymbol', {
            symbol,
            element,
            reqTime,
        });
    }
};
const emitEvent = (eventName, detail) => {
    if (!qTest && !isServerPlatform() && typeof document === 'object') {
        document.dispatchEvent(new CustomEvent(eventName, {
            bubbles: false,
            detail,
        }));
    }
};
const now = () => {
    if (qTest || isServerPlatform()) {
        return 0;
    }
    if (typeof performance === 'object') {
        return performance.now();
    }
    return 0;
};

let runtimeSymbolId = 0;
// <docs markdown="../readme.md#$">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#$ instead)
/**
 * Qwik Optimizer marker function.
 *
 * Use `$(...)` to tell Qwik Optimizer to extract the expression in `$(...)` into a lazy-loadable
 * resource referenced by `QRL`.
 *
 * @param expression - Expression which should be lazy loaded
 * @public
 * @see `implicit$FirstArg` for additional `____$(...)` rules.
 *
 * In this example, `$(...)` is used to capture the callback function of `onmousemove` into a
 * lazy-loadable reference. This allows the code to refer to the function without actually
 * loading the function. In this example, the callback function does not get loaded until
 * `mousemove` event fires.
 *
 * ```tsx
 * useOnDocument(
 *   'mousemove',
 *   $((event) => console.log('mousemove', event))
 * );
 * ```
 *
 * In this code, the Qwik Optimizer detects `$(...)` and transforms the code into:
 *
 * ```tsx
 * // FILE: <current file>
 * useOnDocument('mousemove', qrl('./chunk-abc.js', 'onMousemove'));
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
 * 2. If inlined function, then all lexically captured values must be:
 *    - importable (vars show up in `import`s or `export`s)
 *    - const (The capturing process differs from JS capturing in that writing to captured
 * variables does not update them, and therefore writes are forbidden. The best practice is that
 * all captured variables are constants.)
 *    - Must be runtime serializable.
 *
 * ```tsx
 *
 * import { createContextId, useContext, useContextProvider } from './use/use-context';
 * import { Resource, useResource$ } from './use/use-resource';
 * import { useSignal } from './use/use-signal';
 *
 * export const greet = () => console.log('greet');
 * function topLevelFn() {}
 *
 * function myCode() {
 *   const store = useStore({});
 *   function localFn() {}
 *   // Valid Examples
 *   $(greet); // greet is importable
 *   $(() => greet()); // greet is importable;
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
 */
// </docs>
const $ = (expression) => {
    if (!qRuntimeQrl && qDev) {
        throw new Error('Optimizer should replace all usages of $() with some special syntax. If you need to create a QRL manually, use inlinedQrl() instead.');
    }
    return createQRL(null, 's' + runtimeSymbolId++, expression, null, null, null, null);
};
/** @public */
const eventQrl = (qrl) => {
    return qrl;
};
/** @public */
const event$ = implicit$FirstArg(eventQrl);
/**
 * Extract function into a synchronously loadable QRL.
 *
 * NOTE: Synchronous QRLs functions can't close over any variables, including exports.
 *
 * @param fn - Function to extract.
 * @returns
 * @alpha
 */
const sync$ = (fn) => {
    if (!qRuntimeQrl && qDev) {
        throw new Error('Optimizer should replace all usages of sync$() with some special syntax. If you need to create a QRL manually, use inlinedSyncQrl() instead.');
    }
    if (qDev) {
        // To make sure that in dev mode we don't accidentally capture context in `sync$()` we serialize and deserialize the function.
        // eslint-disable-next-line no-new-func
        fn = new Function('return ' + fn.toString())();
    }
    return createQRL('', SYNC_QRL, fn, null, null, null, null);
};
/**
 * Extract function into a synchronously loadable QRL.
 *
 * NOTE: Synchronous QRLs functions can't close over any variables, including exports.
 *
 * @param fn - Extracted function
 * @param serializedFn - Serialized function in string form.
 * @returns
 * @alpha
 */
const _qrlSync = function (fn, serializedFn) {
    if (serializedFn === undefined) {
        serializedFn = fn.toString();
    }
    fn.serialized = serializedFn;
    return createQRL('', SYNC_QRL, fn, null, null, null, null);
};

// <docs markdown="../readme.md#component">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#component instead)
/**
 * Declare a Qwik component that can be used to create UI.
 *
 * Use `component$` to declare a Qwik component. A Qwik component is a special kind of component
 * that allows the Qwik framework to lazy load and execute the component independently of other Qwik
 * components as well as lazy load the component's life-cycle hooks and event handlers.
 *
 * Side note: You can also declare regular (standard JSX) components that will have standard
 * synchronous behavior.
 *
 * Qwik component is a facade that describes how the component should be used without forcing the
 * implementation of the component to be eagerly loaded. A minimum Qwik definition consists of:
 *
 * ### Example
 *
 * An example showing how to create a counter component:
 *
 * ```tsx
 * export interface CounterProps {
 *   initialValue?: number;
 *   step?: number;
 * }
 * export const Counter = component$((props: CounterProps) => {
 *   const state = useStore({ count: props.initialValue || 0 });
 *   return (
 *     <div>
 *       <span>{state.count}</span>
 *       <button onClick$={() => (state.count += props.step || 1)}>+</button>
 *     </div>
 *   );
 * });
 * ```
 *
 * - `component$` is how a component gets declared.
 * - `{ value?: number; step?: number }` declares the public (props) interface of the component.
 * - `{ count: number }` declares the private (state) interface of the component.
 *
 * The above can then be used like so:
 *
 * ```tsx
 * export const OtherComponent = component$(() => {
 *   return <Counter initialValue={100} />;
 * });
 * ```
 *
 * See also: `component`, `useCleanup`, `onResume`, `onPause`, `useOn`, `useOnDocument`,
 * `useOnWindow`, `useStyles`
 *
 * @public
 */
// </docs>
const componentQrl = (componentQrl) => {
    // Return a QComponent Factory function.
    function QwikComponent(props, key, flags) {
        assertQrl(componentQrl);
        assertNumber(flags, 'The Qwik Component was not invoked correctly');
        const hash = qTest ? 'sX' : componentQrl.$hash$.slice(0, 4);
        const finalKey = hash + ':' + (key ? key : '');
        return _jsxC(Virtual, {
            [OnRenderProp]: componentQrl,
            [QSlot]: props[QSlot],
            [_IMMUTABLE]: props[_IMMUTABLE],
            children: props.children,
            props,
        }, flags, finalKey);
    }
    QwikComponent[SERIALIZABLE_STATE] = [componentQrl];
    return QwikComponent;
};
const isQwikComponent = (component) => {
    return typeof component == 'function' && component[SERIALIZABLE_STATE] !== undefined;
};
// <docs markdown="../readme.md#component">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#component instead)
/**
 * Declare a Qwik component that can be used to create UI.
 *
 * Use `component$` to declare a Qwik component. A Qwik component is a special kind of component
 * that allows the Qwik framework to lazy load and execute the component independently of other Qwik
 * components as well as lazy load the component's life-cycle hooks and event handlers.
 *
 * Side note: You can also declare regular (standard JSX) components that will have standard
 * synchronous behavior.
 *
 * Qwik component is a facade that describes how the component should be used without forcing the
 * implementation of the component to be eagerly loaded. A minimum Qwik definition consists of:
 *
 * ### Example
 *
 * An example showing how to create a counter component:
 *
 * ```tsx
 * export interface CounterProps {
 *   initialValue?: number;
 *   step?: number;
 * }
 * export const Counter = component$((props: CounterProps) => {
 *   const state = useStore({ count: props.initialValue || 0 });
 *   return (
 *     <div>
 *       <span>{state.count}</span>
 *       <button onClick$={() => (state.count += props.step || 1)}>+</button>
 *     </div>
 *   );
 * });
 * ```
 *
 * - `component$` is how a component gets declared.
 * - `{ value?: number; step?: number }` declares the public (props) interface of the component.
 * - `{ count: number }` declares the private (state) interface of the component.
 *
 * The above can then be used like so:
 *
 * ```tsx
 * export const OtherComponent = component$(() => {
 *   return <Counter initialValue={100} />;
 * });
 * ```
 *
 * See also: `component`, `useCleanup`, `onResume`, `onPause`, `useOn`, `useOnDocument`,
 * `useOnWindow`, `useStyles`
 *
 * @public
 */
// </docs>
const component$ = (onMount) => {
    return componentQrl($(onMount));
};

/* eslint-disable */
const flattenArray = (array, dst) => {
    // Yes this function is just Array.flat, but we need to run on old versions of Node.
    if (!dst)
        dst = [];
    for (const item of array) {
        if (isArray(item)) {
            flattenArray(item, dst);
        }
        else {
            dst.push(item);
        }
    }
    return dst;
};
/** @public */
function h(type, props, ...children) {
    // Using legacy h() jsx transform and morphing it
    // so it can use the modern vdom structure
    // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
    // https://www.typescriptlang.org/tsconfig#jsxImportSource
    const normalizedProps = {
        children: arguments.length > 2 ? flattenArray(children) : undefined,
    };
    let key;
    let i;
    for (i in props) {
        if (i == 'key')
            key = props[i];
        else
            normalizedProps[i] = props[i];
    }
    if (typeof type === 'string' && !key && 'dangerouslySetInnerHTML' in normalizedProps) {
        key = 'innerhtml';
    }
    return jsx(type, normalizedProps, key);
}

/**
 * Render JSX.
 *
 * Use this method to render JSX. This function does reconciling which means it always tries to
 * reuse what is already in the DOM (rather then destroy and recreate content.) It returns a cleanup
 * function you could use for cleaning up subscriptions.
 *
 * @param parent - Element which will act as a parent to `jsxNode`. When possible the rendering will
 *   try to reuse existing nodes.
 * @param jsxOutput - JSX to render
 * @returns An object containing a cleanup function.
 * @public
 */
const render = async (parent, jsxOutput, opts) => {
    // If input is a component, convert it
    if (typeof jsxOutput === 'function') {
        jsxOutput = jsx(jsxOutput, null);
    }
    const doc = getDocument(parent);
    const containerEl = getElement(parent);
    if (qDev && containerEl.hasAttribute(QContainerAttr)) {
        throw qError(QError_cannotRenderOverExistingContainer, containerEl);
    }
    // if (qDev) {
    //   if (parent.childNodes.length > 0) {
    //     throw new Error('Container must be empty before mounting anything inside');
    //   }
    // }
    injectQContainer(containerEl);
    const containerState = _getContainerState(containerEl);
    const serverData = opts?.serverData;
    if (serverData) {
        Object.assign(containerState.$serverData$, serverData);
    }
    const rCtx = createRenderContext(doc, containerState);
    containerState.$hostsRendering$ = new Set();
    containerState.$styleMoved$ = true;
    await renderRoot(rCtx, containerEl, jsxOutput, doc, containerState, containerEl);
    await postRendering(containerState, rCtx);
    return {
        cleanup() {
            cleanupContainer(rCtx, containerEl);
        },
    };
};
const renderRoot = async (rCtx, parent, jsxOutput, doc, containerState, containerEl) => {
    const staticCtx = rCtx.$static$;
    try {
        const processedNodes = await processData(jsxOutput);
        // const rootJsx = getVdom(parent);
        const rootJsx = domToVnode(parent);
        await smartUpdateChildren(rCtx, rootJsx, wrapJSX(parent, processedNodes), 0);
    }
    catch (err) {
        logError(err);
    }
    staticCtx.$operations$.push(...staticCtx.$postOperations$);
    executeDOMRender(staticCtx);
    if (qDev) {
        appendQwikDevTools(containerEl);
    }
    printRenderStats(staticCtx);
};
const getElement = (docOrElm) => {
    return isDocument(docOrElm) ? docOrElm.documentElement : docOrElm;
};
const injectQContainer = (containerEl) => {
    directSetAttribute(containerEl, 'q:version', version ?? 'dev');
    directSetAttribute(containerEl, QContainerAttr, 'resumed');
    directSetAttribute(containerEl, 'q:render', qDev ? 'dom-dev' : 'dom');
};
function cleanupContainer(renderCtx, container) {
    const subsManager = renderCtx.$static$.$containerState$.$subsManager$;
    cleanupTree(container, renderCtx.$static$, subsManager, true);
    removeContainerState(container);
    // Clean up attributes
    directRemoveAttribute(container, 'q:version');
    directRemoveAttribute(container, QContainerAttr);
    directRemoveAttribute(container, 'q:render');
    // Remove children
    container.replaceChildren();
}

// <docs markdown="../readme.md#useStore">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useStore instead)
/**
 * Creates an object that Qwik can track across serializations.
 *
 * Use `useStore` to create a state for your application. The returned object is a proxy that has a
 * unique ID. The ID of the object is used in the `QRL`s to refer to the store.
 *
 * ### Example
 *
 * Example showing how `useStore` is used in Counter example to keep track of the count.
 *
 * ```tsx
 * const Stores = component$(() => {
 *   const counter = useCounter(1);
 *
 *   // Reactivity happens even for nested objects and arrays
 *   const userData = useStore({
 *     name: 'Manu',
 *     address: {
 *       address: '',
 *       city: '',
 *     },
 *     orgs: [],
 *   });
 *
 *   // useStore() can also accept a function to calculate the initial value
 *   const state = useStore(() => {
 *     return {
 *       value: expensiveInitialValue(),
 *     };
 *   });
 *
 *   return (
 *     <div>
 *       <div>Counter: {counter.value}</div>
 *       <Child userData={userData} state={state} />
 *     </div>
 *   );
 * });
 *
 * function useCounter(step: number) {
 *   // Multiple stores can be created in custom hooks for convenience and composability
 *   const counterStore = useStore({
 *     value: 0,
 *   });
 *   useVisibleTask$(() => {
 *     // Only runs in the client
 *     const timer = setInterval(() => {
 *       counterStore.value += step;
 *     }, 500);
 *     return () => {
 *       clearInterval(timer);
 *     };
 *   });
 *   return counterStore;
 * }
 * ```
 *
 * @public
 */
// </docs>
const useStore = (initialState, opts) => {
    const { val, set, iCtx } = useSequentialScope();
    if (val != null) {
        return val;
    }
    const value = isFunction(initialState) ? invoke(undefined, initialState) : initialState;
    if (opts?.reactive === false) {
        set(value);
        return value;
    }
    else {
        const containerState = iCtx.$renderCtx$.$static$.$containerState$;
        const recursive = opts?.deep ?? true;
        const flags = recursive ? QObjectRecursive : 0;
        const newStore = getOrCreateProxy(value, containerState, flags);
        set(newStore);
        return newStore;
    }
};

/** @public */
const useId = () => {
    const { val, set, elCtx, iCtx } = useSequentialScope();
    if (val != null) {
        return val;
    }
    const containerBase = iCtx.$renderCtx$?.$static$?.$containerState$?.$base$ || '';
    const base = containerBase ? hashCode(containerBase) : '';
    const hash = elCtx.$componentQrl$?.getHash() || '';
    const counter = getNextIndex(iCtx.$renderCtx$) || '';
    const id = `${base}-${hash}-${counter}`; // If no base and no hash, then "--#"
    return set(id);
};

/** @public */
function useServerData(key, defaultValue) {
    const ctx = tryGetInvokeContext();
    return ctx?.$renderCtx$?.$static$.$containerState$.$serverData$[key] ?? defaultValue;
}

/* eslint-disable no-console */
const STYLE_CACHE = /*#__PURE__*/ new Map();
const getScopedStyles = (css, scopeId) => {
    if (qDev) {
        return scopeStylesheet(css, scopeId);
    }
    let styleCss = STYLE_CACHE.get(scopeId);
    if (!styleCss) {
        STYLE_CACHE.set(scopeId, (styleCss = scopeStylesheet(css, scopeId)));
    }
    return styleCss;
};
const scopeStylesheet = (css, scopeId) => {
    const end = css.length;
    const out = [];
    const stack = [];
    let idx = 0;
    let lastIdx = idx;
    let mode = rule;
    let lastCh = 0;
    while (idx < end) {
        const chIdx = idx;
        let ch = css.charCodeAt(idx++);
        if (ch === BACKSLASH) {
            idx++;
            ch = A; // Pretend it's a letter
        }
        const arcs = STATE_MACHINE[mode];
        for (let i = 0; i < arcs.length; i++) {
            const arc = arcs[i];
            const [expectLastCh, expectCh, newMode] = arc;
            if (expectLastCh === lastCh ||
                expectLastCh === ANY ||
                (expectLastCh === IDENT && isIdent(lastCh)) ||
                (expectLastCh === WHITESPACE && isWhiteSpace(lastCh))) {
                if (expectCh === ch ||
                    expectCh === ANY ||
                    (expectCh === IDENT && isIdent(ch)) ||
                    (expectCh === NOT_IDENT && !isIdent(ch) && ch !== DOT) ||
                    (expectCh === WHITESPACE && isWhiteSpace(ch))) {
                    if (arc.length == 3 || lookAhead(arc)) {
                        if (arc.length > 3) {
                            // If matched on lookAhead than we we have to update current `ch`
                            ch = css.charCodeAt(idx - 1);
                        }
                        // We found a match!
                        if (newMode === EXIT || newMode == EXIT_INSERT_SCOPE) {
                            if (newMode === EXIT_INSERT_SCOPE) {
                                if (mode === starSelector && !shouldNotInsertScoping()) {
                                    // Replace `*` with the scoping elementClassIdSelector.
                                    if (isChainedSelector(ch)) {
                                        // *foo
                                        flush(idx - 2);
                                    }
                                    else {
                                        // * (by itself)
                                        insertScopingSelector(idx - 2);
                                    }
                                    lastIdx++;
                                }
                                else {
                                    if (!isChainedSelector(ch)) {
                                        // We are exiting one of the Selector so we may need to
                                        const offset = expectCh == NOT_IDENT ? 1 : expectCh == CLOSE_PARENTHESIS ? 2 : 0;
                                        insertScopingSelector(idx - offset);
                                    }
                                }
                            }
                            if (expectCh === NOT_IDENT) {
                                // NOT_IDENT is not a real character more like lack of what we expected.
                                // if pseudoGlobal we need to give it a chance to exit as well.
                                // For this reason we need to reparse the last character again.
                                idx--;
                                ch = lastCh;
                            }
                            do {
                                mode = stack.pop() || rule;
                                if (mode === pseudoGlobal) {
                                    // Skip over the `)` in `:global(...)`.
                                    flush(idx - 1);
                                    lastIdx++;
                                }
                            } while (isSelfClosingRule(mode));
                        }
                        else {
                            stack.push(mode);
                            if (mode === pseudoGlobal && newMode === rule) {
                                flush(idx - 8); // `:global(`.length
                                lastIdx = idx; // skip over ":global("
                            }
                            else if (newMode === pseudoElement) {
                                // We are entering pseudoElement `::foo`; insert scoping in front of it.
                                insertScopingSelector(chIdx);
                            }
                            mode = newMode;
                        }
                        break; // get out of the for loop as we found a match
                    }
                }
            }
        }
        lastCh = ch;
    }
    flush(idx);
    return out.join('');
    function flush(idx) {
        out.push(css.substring(lastIdx, idx));
        lastIdx = idx;
    }
    function insertScopingSelector(idx) {
        if (mode === pseudoGlobal || shouldNotInsertScoping()) {
            return;
        }
        flush(idx);
        out.push('.', ComponentStylesPrefixContent, scopeId);
    }
    function lookAhead(arc) {
        let prefix = 0; // Ignore vendor prefixes such as `-webkit-`.
        if (css.charCodeAt(idx) === DASH) {
            for (let i = 1; i < 10; i++) {
                // give up after 10 characters
                if (css.charCodeAt(idx + i) === DASH) {
                    prefix = i + 1;
                    break;
                }
            }
        }
        words: for (let arcIndx = 3; arcIndx < arc.length; arcIndx++) {
            const txt = arc[arcIndx];
            for (let i = 0; i < txt.length; i++) {
                if ((css.charCodeAt(idx + i + prefix) | LOWERCASE) !== txt.charCodeAt(i)) {
                    continue words;
                }
            }
            // we found a match;
            idx += txt.length + prefix;
            return true;
        }
        return false;
    }
    function shouldNotInsertScoping() {
        return stack.indexOf(pseudoGlobal) !== -1 || stack.indexOf(atRuleSelector) !== -1;
    }
};
const isIdent = (ch) => {
    return ((ch >= _0 && ch <= _9) ||
        (ch >= A && ch <= Z) ||
        (ch >= a && ch <= z) ||
        ch >= 0x80 ||
        ch === UNDERSCORE ||
        ch === DASH);
};
const isChainedSelector = (ch) => {
    return ch === COLON || ch === DOT || ch === OPEN_BRACKET || ch === HASH || isIdent(ch);
};
const isSelfClosingRule = (mode) => {
    return (mode === atRuleBlock || mode === atRuleSelector || mode === atRuleInert || mode === pseudoGlobal);
};
const isWhiteSpace = (ch) => {
    return ch === SPACE || ch === TAB || ch === NEWLINE || ch === CARRIAGE_RETURN;
};
const rule = 0; // top level initial space.
const elementClassIdSelector = 1; // .elementClassIdSelector {}
const starSelector = 2; // * {}
const pseudoClassWithSelector = 3; // :pseudoClass(elementClassIdSelector) {}
const pseudoClass = 4; // :pseudoClass {}
const pseudoGlobal = 5; // :global(elementClassIdSelector)
const pseudoElement = 6; // ::pseudoElement {}
const attrSelector = 7; // [attr] {}
const inertParenthesis = 8; // (ignored)
const inertBlock = 9; // {ignored}
const atRuleSelector = 10; // @keyframe elementClassIdSelector {}
const atRuleBlock = 11; // @media {elementClassIdSelector {}}
const atRuleInert = 12; // @atRule something;
const body = 13; // .elementClassIdSelector {body}
const stringSingle = 14; // 'text'
const stringDouble = 15; // 'text'
const commentMultiline = 16; // /* ... */
// NOT REAL MODES
const EXIT = 17; // Exit the mode
const EXIT_INSERT_SCOPE = 18; // Exit the mode INSERT SCOPE
const ANY = 0;
const IDENT = 1;
const NOT_IDENT = 2;
const WHITESPACE = 3;
const TAB = 9; // `\t`.charCodeAt(0);
const NEWLINE = 10; // `\n`.charCodeAt(0);
const CARRIAGE_RETURN = 13; // `\r`.charCodeAt(0);
const SPACE = 32; // ` `.charCodeAt(0);
const DOUBLE_QUOTE = 34; // `"`.charCodeAt(0);
const HASH = 35; // `#`.charCodeAt(0);
const SINGLE_QUOTE = 39; // `'`.charCodeAt(0);
const OPEN_PARENTHESIS = 40; // `(`.charCodeAt(0);
const CLOSE_PARENTHESIS = 41; // `)`.charCodeAt(0);
const STAR = 42; // `*`.charCodeAt(0);
// const COMMA = 44; // `,`.charCodeAt(0);
const DASH = 45; // `-`.charCodeAt(0);
const DOT = 46; // `.`.charCodeAt(0);
const FORWARD_SLASH = 47; // `/`.charCodeAt(0);
const _0 = 48; // `0`.charCodeAt(0);
const _9 = 57; // `9`.charCodeAt(0);
const COLON = 58; // `:`.charCodeAt(0);
const SEMICOLON = 59; // `;`.charCodeAt(0);
// const LESS_THAN = 60; // `<`.charCodeAt(0);
const AT = 64; // `@`.charCodeAt(0);
const A = 65; // `A`.charCodeAt(0);
const Z = 90; // `Z`.charCodeAt(0);
const OPEN_BRACKET = 91; // `[`.charCodeAt(0);
const CLOSE_BRACKET = 93; // `]`.charCodeAt(0);
const BACKSLASH = 92; // `\\`.charCodeAt(0);
const UNDERSCORE = 95; // `_`.charCodeAt(0);
const LOWERCASE = 0x20; // `a`.charCodeAt(0);
const a = 97; // `a`.charCodeAt(0);
// const d = 100; // `d`.charCodeAt(0);
// const g = 103; // 'g'.charCodeAt(0);
// const h = 104; // `h`.charCodeAt(0);
// const i = 105; // `i`.charCodeAt(0);
// const l = 108; // `l`.charCodeAt(0);
// const t = 116; // `t`.charCodeAt(0);
const z = 122; // `z`.charCodeAt(0);
const OPEN_BRACE = 123; // `{`.charCodeAt(0);
const CLOSE_BRACE = 125; // `}`.charCodeAt(0);
const STRINGS_COMMENTS = /*__PURE__*/ (() => [
    [ANY, SINGLE_QUOTE, stringSingle],
    [ANY, DOUBLE_QUOTE, stringDouble],
    [ANY, FORWARD_SLASH, commentMultiline, '*'],
])();
const STATE_MACHINE = /*__PURE__*/ (() => [
    [
        /// rule
        [ANY, STAR, starSelector],
        [ANY, OPEN_BRACKET, attrSelector],
        [ANY, COLON, pseudoElement, ':', 'before', 'after', 'first-letter', 'first-line'],
        [ANY, COLON, pseudoGlobal, 'global'],
        [
            ANY,
            COLON,
            pseudoClassWithSelector,
            'has',
            'host-context',
            'not',
            'where',
            'is',
            'matches',
            'any',
        ],
        [ANY, COLON, pseudoClass],
        [ANY, IDENT, elementClassIdSelector],
        [ANY, DOT, elementClassIdSelector],
        [ANY, HASH, elementClassIdSelector],
        [ANY, AT, atRuleSelector, 'keyframe'],
        [ANY, AT, atRuleBlock, 'media', 'supports', 'container'],
        [ANY, AT, atRuleInert],
        [ANY, OPEN_BRACE, body],
        [FORWARD_SLASH, STAR, commentMultiline],
        [ANY, SEMICOLON, EXIT],
        [ANY, CLOSE_BRACE, EXIT],
        [ANY, CLOSE_PARENTHESIS, EXIT],
        ...STRINGS_COMMENTS,
    ],
    [
        /// elementClassIdSelector
        [ANY, NOT_IDENT, EXIT_INSERT_SCOPE],
    ],
    [
        /// starSelector
        [ANY, NOT_IDENT, EXIT_INSERT_SCOPE],
    ],
    [
        /// pseudoClassWithSelector
        [ANY, OPEN_PARENTHESIS, rule],
        [ANY, NOT_IDENT, EXIT_INSERT_SCOPE],
    ],
    [
        /// pseudoClass
        [ANY, OPEN_PARENTHESIS, inertParenthesis],
        [ANY, NOT_IDENT, EXIT_INSERT_SCOPE],
    ],
    [
        /// pseudoGlobal
        [ANY, OPEN_PARENTHESIS, rule],
        [ANY, NOT_IDENT, EXIT],
    ],
    [
        /// pseudoElement
        [ANY, NOT_IDENT, EXIT],
    ],
    [
        /// attrSelector
        [ANY, CLOSE_BRACKET, EXIT_INSERT_SCOPE],
        [ANY, SINGLE_QUOTE, stringSingle],
        [ANY, DOUBLE_QUOTE, stringDouble],
    ],
    [
        /// inertParenthesis
        [ANY, CLOSE_PARENTHESIS, EXIT],
        ...STRINGS_COMMENTS,
    ],
    [
        /// inertBlock
        [ANY, CLOSE_BRACE, EXIT],
        ...STRINGS_COMMENTS,
    ],
    [
        /// atRuleSelector
        [ANY, CLOSE_BRACE, EXIT],
        [WHITESPACE, IDENT, elementClassIdSelector],
        [ANY, COLON, pseudoGlobal, 'global'],
        [ANY, OPEN_BRACE, body],
        ...STRINGS_COMMENTS,
    ],
    [
        /// atRuleBlock
        [ANY, OPEN_BRACE, rule],
        [ANY, SEMICOLON, EXIT],
        ...STRINGS_COMMENTS,
    ],
    [
        /// atRuleInert
        [ANY, SEMICOLON, EXIT],
        [ANY, OPEN_BRACE, inertBlock],
        ...STRINGS_COMMENTS,
    ],
    [
        /// body
        [ANY, CLOSE_BRACE, EXIT],
        [ANY, OPEN_BRACE, body],
        [ANY, OPEN_PARENTHESIS, inertParenthesis],
        ...STRINGS_COMMENTS,
    ],
    [
        /// stringSingle
        [ANY, SINGLE_QUOTE, EXIT],
    ],
    [
        /// stringDouble
        [ANY, DOUBLE_QUOTE, EXIT],
    ],
    [
        /// commentMultiline
        [STAR, FORWARD_SLASH, EXIT],
    ],
])();

// <docs markdown="../readme.md#useStyles">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useStyles instead)
/**
 * A lazy-loadable reference to a component's styles.
 *
 * Component styles allow Qwik to lazy load the style information for the component only when
 * needed. (And avoid double loading it in case of SSR hydration.)
 *
 * ```tsx
 * import styles from './code-block.css?inline';
 *
 * export const CmpStyles = component$(() => {
 *   useStyles$(styles);
 *
 *   return <div>Some text</div>;
 * });
 * ```
 *
 * @public
 * @see `useStylesScoped`
 */
// </docs>
const useStylesQrl = (styles) => {
    _useStyles(styles, (str) => str, false);
};
// <docs markdown="../readme.md#useStyles">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useStyles instead)
/**
 * A lazy-loadable reference to a component's styles.
 *
 * Component styles allow Qwik to lazy load the style information for the component only when
 * needed. (And avoid double loading it in case of SSR hydration.)
 *
 * ```tsx
 * import styles from './code-block.css?inline';
 *
 * export const CmpStyles = component$(() => {
 *   useStyles$(styles);
 *
 *   return <div>Some text</div>;
 * });
 * ```
 *
 * @public
 * @see `useStylesScoped`
 */
// </docs>
const useStyles$ = /*#__PURE__*/ implicit$FirstArg(useStylesQrl);
// <docs markdown="../readme.md#useStylesScoped">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useStylesScoped instead)
/**
 * A lazy-loadable reference to a component's styles, that is scoped to the component.
 *
 * Component styles allow Qwik to lazy load the style information for the component only when
 * needed. (And avoid double loading it in case of SSR hydration.)
 *
 * ```tsx
 * import scoped from './code-block.css?inline';
 *
 * export const CmpScopedStyles = component$(() => {
 *   useStylesScoped$(scoped);
 *
 *   return <div>Some text</div>;
 * });
 * ```
 *
 * @public
 * @see `useStyles`
 */
// </docs>
const useStylesScopedQrl = (styles) => {
    return {
        scopeId: ComponentStylesPrefixContent + _useStyles(styles, getScopedStyles, true),
    };
};
// <docs markdown="../readme.md#useStylesScoped">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useStylesScoped instead)
/**
 * A lazy-loadable reference to a component's styles, that is scoped to the component.
 *
 * Component styles allow Qwik to lazy load the style information for the component only when
 * needed. (And avoid double loading it in case of SSR hydration.)
 *
 * ```tsx
 * import scoped from './code-block.css?inline';
 *
 * export const CmpScopedStyles = component$(() => {
 *   useStylesScoped$(scoped);
 *
 *   return <div>Some text</div>;
 * });
 * ```
 *
 * @public
 * @see `useStyles`
 */
// </docs>
const useStylesScoped$ = /*#__PURE__*/ implicit$FirstArg(useStylesScopedQrl);
const _useStyles = (styleQrl, transform, scoped) => {
    assertQrl(styleQrl);
    const { val, set, iCtx, i, elCtx } = useSequentialScope();
    if (val) {
        return val;
    }
    const styleId = styleKey(styleQrl, i);
    const containerState = iCtx.$renderCtx$.$static$.$containerState$;
    set(styleId);
    if (!elCtx.$appendStyles$) {
        elCtx.$appendStyles$ = [];
    }
    if (!elCtx.$scopeIds$) {
        elCtx.$scopeIds$ = [];
    }
    if (scoped) {
        elCtx.$scopeIds$.push(styleContent(styleId));
    }
    if (containerState.$styleIds$.has(styleId)) {
        return styleId;
    }
    containerState.$styleIds$.add(styleId);
    const value = styleQrl.$resolveLazy$(containerState.$containerEl$);
    const appendStyle = (styleText) => {
        assertDefined(elCtx.$appendStyles$, 'appendStyles must be defined');
        elCtx.$appendStyles$.push({
            styleId,
            content: transform(styleText, styleId),
        });
    };
    if (isPromise(value)) {
        iCtx.$waitOn$.push(value.then(appendStyle));
    }
    else {
        appendStyle(value);
    }
    return styleId;
};

/** @public */
const useErrorBoundary = () => {
    const error = useStore({ error: undefined });
    useContextProvider(ERROR_CONTEXT, error);
    return error;
};

// keep this import from qwik/build so the cjs build works
/**
 * @deprecated This is no longer needed as the preloading happens automatically in qrl-class.ts.
 *   Leave this in your app for a while so it uninstalls existing service workers, but don't use it
 *   for new projects.
 * @alpha
 */
const PrefetchServiceWorker = (opts) => {
    const isTest = import.meta.env.TEST;
    if (isDev && !isTest) {
        const props = {
            dangerouslySetInnerHTML: '<!-- PrefetchServiceWorker is disabled in dev mode. -->',
        };
        return _jsxC('script', props, 0, 'prefetch-service-worker');
    }
    // if an MFE app has a custom BASE_URL then this will be the correct value
    // if you're not using MFE from another codebase then you want to override this value to your custom setup
    const baseUrl = import.meta.env.BASE_URL || '/';
    const resolvedOpts = {
        path: 'qwik-prefetch-service-worker.js',
        ...opts,
    };
    if (opts?.path?.startsWith?.('/')) {
        // allow different path and base
        resolvedOpts.path = opts.path;
    }
    else {
        // baseUrl: '/'
        // path: 'qwik-prefetch-service-worker.js'
        // the file 'qwik-prefetch-service-worker.js' is not located in /build/
        resolvedOpts.path = baseUrl + resolvedOpts.path;
    }
    let code = PREFETCH_CODE.replace("'_URL_'", JSON.stringify(resolvedOpts.path));
    if (!isDev) {
        // consecutive spaces are indentation
        code = code.replaceAll(/\s\s+/gm, '');
    }
    const props = {
        dangerouslySetInnerHTML: [
            '(' + code + ')(',
            [
                'navigator.serviceWorker', // Service worker container
            ].join(','),
            ');',
        ].join(''),
        nonce: resolvedOpts.nonce,
    };
    return _jsxC('script', props, 0, 'prefetch-service-worker');
};
const PREFETCH_CODE = /*#__PURE__*/ ((c // Service worker container
) => {
    if ('getRegistrations' in c) {
        c.getRegistrations().then((registrations) => {
            registrations.forEach((registration) => {
                if (registration.active) {
                    if (registration.active.scriptURL.endsWith('_URL_')) {
                        registration.unregister().catch(console.error);
                    }
                }
            });
        });
    }
}).toString();
/**
 * @deprecated This is no longer needed as the preloading happens automatically in qrl-class. You
 *   can remove this component from your app.
 * @alpha
 */
const PrefetchGraph = (opts = {}) => null;

export { $, Fragment, HTMLFragment, PrefetchGraph, PrefetchServiceWorker, RenderOnce, Resource, SSRComment, SSRHint, SSRRaw, SSRStream, SSRStreamBlock, SkipRender, Slot, _IMMUTABLE, _deserializeData, _fnSignal, _getContextElement, _getContextEvent, _hW, _jsxBranch, _jsxC, _jsxQ, _jsxS, _noopQrl, _noopQrlDEV, _pauseFromContexts, _qrlSync, _regSymbol, _renderSSR, _restProps, _serializeData, verifySerializable as _verifySerializable, _waitUntilRendered, _weakSerialize, _wrapProp, _wrapSignal, component$, componentQrl, createComputed$, createComputedQrl, createContextId, h as createElement, createSignal, event$, eventQrl, getLocale, getPlatform, h, implicit$FirstArg, inlinedQrl, inlinedQrlDEV, isSignal, jsx, jsxDEV, jsx as jsxs, noSerialize, qrl, qrlDEV, render, setPlatform, sync$, untrack, unwrapProxy as unwrapStore, useComputed$, useComputedQrl, useConstant, useContext, useContextProvider, useErrorBoundary, useId, useLexicalScope, useOn, useOnDocument, useOnWindow, useResource$, useResourceQrl, useServerData, useSignal, useStore, useStyles$, useStylesQrl, useStylesScoped$, useStylesScopedQrl, useTask$, useTaskQrl, useVisibleTask$, useVisibleTaskQrl, version, withLocale };
//# sourceMappingURL=core.mjs.map
