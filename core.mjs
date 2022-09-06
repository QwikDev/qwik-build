/**
 * @license
 * @builder.io/qwik 0.0.107
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
// minification can replace the `globalThis.qDev` with `false`
// which will remove all dev code within from the build
const qDev = globalThis.qDev === true;
const qSerialize = globalThis.qSerialize !== false;
const qDynamicPlatform = globalThis.qDynamicPlatform !== false;
const qTest = globalThis.qTest === true;
const seal = (obj) => {
    if (qDev) {
        Object.seal(obj);
    }
};

const EMPTY_ARRAY = [];
const EMPTY_OBJ = {};
if (qDev) {
    Object.freeze(EMPTY_ARRAY);
    Object.freeze(EMPTY_OBJ);
    Error.stackTraceLimit = 9999;
}

function isElement$1(value) {
    return isNode$1(value) && value.nodeType === 1;
}
function isNode$1(value) {
    return value && typeof value.nodeType === 'number';
}

function assertDefined(value, text, ...parts) {
    if (qDev) {
        if (value != null)
            return;
        throw logErrorAndStop(text, ...parts);
    }
}
function assertEqual(value1, value2, text, ...parts) {
    if (qDev) {
        if (value1 === value2)
            return;
        throw logErrorAndStop(text, ...parts);
    }
}
function assertTrue(value1, text, ...parts) {
    if (qDev) {
        if (value1 === true)
            return;
        throw logErrorAndStop(text, ...parts);
    }
}

/**
 * @private
 */
const isSerializableObject = (v) => {
    const proto = Object.getPrototypeOf(v);
    return proto === Object.prototype || proto === null;
};
const isObject = (v) => {
    return v && typeof v === 'object';
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

/**
 * State factory of the component.
 */
const OnRenderProp = 'q:renderFn';
/**
 * Component style content prefix
 */
const ComponentStylesPrefixContent = '⭐️';
/**
 * `<some-element q:slot="...">`
 */
const QSlot = 'q:slot';
const QSlotRef = 'q:sref';
const QSlotS = 'q:s';
const QStyle = 'q:style';
const QScopedStyle = 'q:sstyle';
const QContainerAttr = 'q:container';
const QContainerSelector = '[q\\:container]';
const RenderEvent = 'qRender';
const ELEMENT_ID = 'q:id';
const ELEMENT_ID_PREFIX = '#';

const getDocument = (node) => {
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

let _context;
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
    const ctx = getInvokeContext();
    if (ctx.$event$ !== RenderEvent) {
        throw qError(QError_useInvokeContext);
    }
    assertDefined(ctx.$hostElement$, `invoke: $hostElement$ must be defined`, ctx);
    assertDefined(ctx.$waitOn$, `invoke: $waitOn$ must be defined`, ctx);
    assertDefined(ctx.$renderCtx$, `invoke: $renderCtx$ must be defined`, ctx);
    assertDefined(ctx.$doc$, `invoke: $doc$ must be defined`, ctx);
    assertDefined(ctx.$subscriber$, `invoke: $subscriber$ must be defined`, ctx);
    return ctx;
};
const useBindInvokeContext = (callback) => {
    if (callback == null) {
        return callback;
    }
    const ctx = getInvokeContext();
    return ((...args) => {
        return invoke(ctx, callback.bind(undefined, ...args));
    });
};
const invoke = (context, fn, ...args) => {
    const previousContext = _context;
    let returnValue;
    try {
        _context = context;
        returnValue = fn.apply(null, args);
    }
    finally {
        _context = previousContext;
    }
    return returnValue;
};
const waitAndRun = (ctx, callback) => {
    const previousWait = ctx.$waitOn$.slice();
    ctx.$waitOn$.push(Promise.allSettled(previousWait).then(callback));
};
const newInvokeContextFromTuple = (context) => {
    const element = context[0];
    return newInvokeContext(getDocument(element), undefined, element, context[1], context[2]);
};
const newInvokeContext = (doc, hostElement, element, event, url) => {
    const ctx = {
        $seq$: 0,
        $doc$: doc,
        $hostElement$: hostElement,
        $element$: element,
        $event$: event,
        $url$: url,
        $qrl$: undefined,
        $props$: undefined,
        $renderCtx$: undefined,
        $subscriber$: undefined,
        $waitOn$: undefined,
    };
    seal(ctx);
    return ctx;
};
const getWrappingContainer = (el) => {
    return el.closest(QContainerSelector);
};

const isNode = (value) => {
    return value && typeof value.nodeType === 'number';
};
const isDocument = (value) => {
    return value && value.nodeType === 9;
};
const isElement = (value) => {
    return value.nodeType === 1;
};
const isQwikElement = (value) => {
    return isNode(value) && (value.nodeType === 1 || value.nodeType === 111);
};
const isVirtualElement = (value) => {
    return value.nodeType === 111;
};
const isText = (value) => {
    return value.nodeType === 3;
};
function assertQwikElement(el) {
    if (qDev) {
        if (!isQwikElement(el)) {
            throw new Error('Not a Qwik Element');
        }
    }
}

const isPromise = (value) => {
    return value instanceof Promise;
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
const isNotNullable = (v) => {
    return v != null;
};
const delay = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

const createPlatform = (doc) => {
    const moduleCache = new Map();
    return {
        isServer: false,
        importSymbol(containerEl, url, symbolName) {
            const urlDoc = toUrl(doc, containerEl, url).toString();
            const urlCopy = new URL(urlDoc);
            urlCopy.hash = '';
            urlCopy.search = '';
            const importURL = urlCopy.href;
            const mod = moduleCache.get(importURL);
            if (mod) {
                return mod[symbolName];
            }
            return import(/* @vite-ignore */ importURL).then((mod) => {
                mod = findModule(mod);
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
const findModule = (module) => {
    return Object.values(module).find(isModule) || module;
};
const isModule = (module) => {
    return isObject(module) && module[Symbol.toStringTag] === 'Module';
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
const toUrl = (doc, containerEl, url) => {
    const baseURI = doc.baseURI;
    const base = new URL(containerEl.getAttribute('q:base') ?? baseURI, baseURI);
    return new URL(url, base);
};
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
 * @alpha
 */
// </docs>
const setPlatform = (doc, plt) => (doc[DocumentPlatform] = plt);
// <docs markdown="./readme.md#getPlatform">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ./readme.md#getPlatform instead)
/**
 * Retrieve the `CorePlatform`.
 *
 * The `CorePlatform` is also responsible for retrieving the Manifest, that contains mappings
 * from symbols to javascript import chunks. For this reason, `CorePlatform` can't be global, but
 * is specific to the application currently running. On server it is possible that many different
 * applications are running in a single server instance, and for this reason the `CorePlatform`
 * is associated with the application document.
 *
 * @param docOrNode - The document (or node) of the application for which the platform is needed.
 * @alpha
 */
// </docs>
const getPlatform = (docOrNode) => {
    const doc = getDocument(docOrNode);
    return doc[DocumentPlatform] || (doc[DocumentPlatform] = createPlatform(doc));
};
const isServer = (ctx) => {
    if (qDynamicPlatform) {
        return (ctx.$renderCtx$?.$static$.$containerState$.$platform$.isServer ??
            getPlatform(ctx.$doc$).isServer);
    }
    return false;
};
const DocumentPlatform = ':platform:';

// <docs markdown="../readme.md#implicit$FirstArg">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#implicit$FirstArg instead)
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
 * For example, these function calls are equivalent:
 *
 * - `component$(() => {...})` is same as `onRender($(() => {...}))`
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
 * @param fn - a function that should have its first argument automatically `$`.
 * @alpha
 */
// </docs>
const implicit$FirstArg = (fn) => {
    return function (first, ...rest) {
        return fn.call(null, $(first), ...rest);
    };
};

const directSetAttribute = (el, prop, value) => {
    return el.setAttribute(prop, value);
};
const directGetAttribute = (el, prop) => {
    return el.getAttribute(prop);
};

const ON_PROP_REGEX = /^(on|window:|document:)/;
const isOnProp = (prop) => {
    return ON_PROP_REGEX.test(prop);
};
const addQRLListener = (listenersMap, prop, input) => {
    let existingListeners = listenersMap[prop];
    if (!existingListeners) {
        listenersMap[prop] = existingListeners = [];
    }
    for (const qrl of input) {
        const hash = qrl.$hash$;
        let replaced = false;
        for (let i = 0; i < existingListeners.length; i++) {
            const existing = existingListeners[i];
            if (existing.$hash$ === hash) {
                existingListeners.splice(i, 1, qrl);
                replaced = true;
                break;
            }
        }
        if (!replaced) {
            existingListeners.push(qrl);
        }
    }
    return false;
};
const setEvent = (listenerMap, prop, input) => {
    assertTrue(prop.endsWith('$'), 'render: event property does not end with $', prop);
    const qrls = isArray(input) ? input.map(ensureQrl) : [ensureQrl(input)];
    prop = normalizeOnProp(prop.slice(0, -1));
    addQRLListener(listenerMap, prop, qrls);
    return prop;
};
const ensureQrl = (value) => {
    return isQrl(value) ? value : $(value);
};
const getDomListeners = (ctx, containerEl) => {
    const attributes = ctx.$element$.attributes;
    const listeners = {};
    for (let i = 0; i < attributes.length; i++) {
        const { name, value } = attributes.item(i);
        if (name.startsWith('on:') ||
            name.startsWith('on-window:') ||
            name.startsWith('on-document:')) {
            let array = listeners[name];
            if (!array) {
                listeners[name] = array = [];
            }
            const urls = value.split('\n');
            for (const url of urls) {
                const qrl = parseQRL(url, containerEl);
                if (qrl.$capture$) {
                    inflateQrl(qrl, ctx);
                }
                array.push(qrl);
            }
        }
    }
    return listeners;
};

const useSequentialScope = () => {
    const ctx = useInvokeContext();
    const i = ctx.$seq$;
    const hostElement = ctx.$hostElement$;
    const elCtx = getContext(hostElement);
    const seq = elCtx.$seq$ ? elCtx.$seq$ : (elCtx.$seq$ = []);
    ctx.$seq$++;
    const set = (value) => {
        if (qDev) {
            verifySerializable(value);
        }
        return (seq[i] = value);
    };
    return {
        get: seq[i],
        set,
        i,
        ctx,
    };
};

// <docs markdown="../readme.md#useCleanup">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useCleanup instead)
/**
 * A lazy-loadable reference to a component's cleanup hook.
 *
 * Invoked when the component is destroyed (removed from render tree), or paused as part of the
 * SSR serialization.
 *
 * It can be used to release resources, abort network requests, stop timers...
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   useCleanup$(() => {
 *     // Executed after SSR (pause) or when the component gets removed from the DOM.
 *     // Can be used to release resources, abort network requests, stop timers...
 *     console.log('component is destroyed');
 *   });
 *   return <div>Hello world</div>;
 * });
 * ```
 *
 * @alpha
 */
// </docs>
const useCleanupQrl = (unmountFn) => {
    const { get, set, i, ctx } = useSequentialScope();
    if (!get) {
        assertQrl(unmountFn);
        const el = ctx.$hostElement$;
        const watch = new Watch(WatchFlagsIsCleanup, i, el, unmountFn, undefined);
        const elCtx = getContext(el);
        set(true);
        if (!elCtx.$watches$) {
            elCtx.$watches$ = [];
        }
        elCtx.$watches$.push(watch);
    }
};
// <docs markdown="../readme.md#useCleanup">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useCleanup instead)
/**
 * A lazy-loadable reference to a component's cleanup hook.
 *
 * Invoked when the component is destroyed (removed from render tree), or paused as part of the
 * SSR serialization.
 *
 * It can be used to release resources, abort network requests, stop timers...
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   useCleanup$(() => {
 *     // Executed after SSR (pause) or when the component gets removed from the DOM.
 *     // Can be used to release resources, abort network requests, stop timers...
 *     console.log('component is destroyed');
 *   });
 *   return <div>Hello world</div>;
 * });
 * ```
 *
 * @alpha
 */
// </docs>
const useCleanup$ = /*#__PURE__*/ implicit$FirstArg(useCleanupQrl);
// <docs markdown="../readme.md#useOn">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useOn instead)
/**
 * Register a listener on the current component's host element.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX. Otherwise, it's adding a JSX listener in the `<div>` is a better idea.
 *
 * @see `useOn`, `useOnWindow`, `useOnDocument`.
 *
 * @alpha
 */
// </docs>
const useOn = (event, eventQrl) => _useOn(`on-${event}`, eventQrl);
// <docs markdown="../readme.md#useOnDocument">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useOnDocument instead)
/**
 * Register a listener on `document`.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX.
 *
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
 *
 * @alpha
 */
// </docs>
const useOnDocument = (event, eventQrl) => _useOn(`document:on-${event}`, eventQrl);
// <docs markdown="../readme.md#useOnWindow">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useOnWindow instead)
/**
 * Register a listener on `window`.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX.
 *
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
 *
 * @alpha
 */
// </docs>
const useOnWindow = (event, eventQrl) => _useOn(`window:on-${event}`, eventQrl);
const _useOn = (eventName, eventQrl) => {
    const invokeCtx = useInvokeContext();
    const ctx = getContext(invokeCtx.$hostElement$);
    assertQrl(eventQrl);
    addQRLListener(ctx.li, normalizeOnProp(eventName), [eventQrl]);
};

const emitEvent = (el, eventName, detail, bubbles) => {
    if (el && typeof CustomEvent === 'function') {
        el.dispatchEvent(new CustomEvent(eventName, {
            detail,
            bubbles: bubbles,
            composed: bubbles,
        }));
    }
};

/**
 * @public
 */
const jsx = (type, props, key) => {
    if (qDev) {
        if (!isString(type) && !isFunction(type)) {
            throw qError(QError_invalidJsxNodeType, type);
        }
    }
    const processed = key == null ? null : String(key);
    return new JSXNodeImpl(type, props, processed);
};
const SKIP_RENDER_TYPE = ':skipRender';
class JSXNodeImpl {
    constructor(type, props, key = null) {
        this.type = type;
        this.props = props;
        this.key = key;
        seal(this);
    }
}
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
/**
 * @public
 */
const Fragment = (props) => props.children;

const QOnce = 'qonce';
/**
 * @alpha
 */
const SkipRender = Symbol('skip render');
const RenderOnce = (props, key) => {
    return jsx(Virtual, {
        ...props,
        [QOnce]: '',
    }, key);
};
/**
 * @alpha
 */
const SSRComment = (() => null);
/**
 * @alpha
 */
const Virtual = ((props) => props.children);
/**
 * @alpha
 */
const SSRStreamBlock = (props) => {
    return [
        jsx(SSRComment, { data: 'qkssr-pu' }),
        props.children,
        jsx(SSRComment, { data: 'qkssr-po' }),
    ];
};
/**
 * @alpha
 */
const SSRStream = (props, key) => jsx(RenderOnce, { children: jsx(InternalSSRStream, props) }, key);
const InternalSSRStream = () => null;

const fromCamelToKebabCase = (text) => {
    return text.replace(/([A-Z])/g, '-$1').toLowerCase();
};

const executeComponent = (rctx, elCtx) => {
    elCtx.$dirty$ = false;
    elCtx.$mounted$ = true;
    elCtx.$slots$ = [];
    const hostElement = elCtx.$element$;
    const onRenderQRL = elCtx.$renderQrl$;
    const staticCtx = rctx.$static$;
    const containerState = staticCtx.$containerState$;
    const props = elCtx.$props$;
    const newCtx = pushRenderContext(rctx, elCtx);
    const invocatinContext = newInvokeContext(staticCtx.$doc$, hostElement, undefined, RenderEvent);
    const waitOn = (invocatinContext.$waitOn$ = []);
    assertDefined(onRenderQRL, `render: host element to render must has a $renderQrl$:`, elCtx);
    assertDefined(props, `render: host element to render must has defined props`, elCtx);
    // Set component context
    newCtx.$cmpCtx$ = elCtx;
    // Invoke render hook
    invocatinContext.$subscriber$ = hostElement;
    invocatinContext.$renderCtx$ = rctx;
    // Component is not dirty any more
    containerState.$hostsStaging$.delete(hostElement);
    // Clean current subscription before render
    containerState.$subsManager$.$clearSub$(hostElement);
    // Resolve render function
    const onRenderFn = onRenderQRL.getFn(invocatinContext);
    return safeCall(() => onRenderFn(props), (jsxNode) => {
        staticCtx.$hostElements$.add(hostElement);
        const waitOnPromise = promiseAll(waitOn);
        return then(waitOnPromise, () => {
            if (isFunction(jsxNode)) {
                elCtx.$dirty$ = false;
                jsxNode = jsxNode();
            }
            else if (elCtx.$dirty$) {
                return executeComponent(rctx, elCtx);
            }
            elCtx.$attachedListeners$ = false;
            return {
                node: jsxNode,
                rctx: newCtx,
            };
        });
    }, (err) => {
        logError(err);
    });
};
const createRenderContext = (doc, containerState) => {
    const ctx = {
        $static$: {
            $doc$: doc,
            $containerState$: containerState,
            $containerEl$: containerState.$containerEl$,
            $hostElements$: new Set(),
            $operations$: [],
            $postOperations$: [],
            $roots$: [],
            $addSlots$: [],
            $rmSlots$: [],
        },
        $cmpCtx$: undefined,
        $localStack$: [],
    };
    seal(ctx);
    seal(ctx.$static$);
    return ctx;
};
const pushRenderContext = (ctx, elCtx) => {
    const newCtx = {
        $static$: ctx.$static$,
        $cmpCtx$: ctx.$cmpCtx$,
        $localStack$: ctx.$localStack$.concat(elCtx),
    };
    return newCtx;
};
const joinClasses = (...input) => {
    const set = new Set();
    input.forEach((value) => {
        parseClassAny(value).forEach((v) => set.add(v));
    });
    return Array.from(set).join(' ');
};
const parseClassAny = (obj) => {
    if (isString(obj)) {
        return parseClassList(obj);
    }
    else if (isObject(obj)) {
        if (isArray(obj)) {
            return obj;
        }
        else {
            const output = [];
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    if (value) {
                        output.push(key);
                    }
                }
            }
            return output;
        }
    }
    return [];
};
const parseClassListRegex = /\s/;
const parseClassList = (value) => !value ? EMPTY_ARRAY : value.split(parseClassListRegex);
const stringifyStyle = (obj) => {
    if (obj == null)
        return '';
    if (typeof obj == 'object') {
        if (isArray(obj)) {
            throw qError(QError_stringifyClassOrStyle, obj, 'style');
        }
        else {
            const chunks = [];
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    if (value) {
                        chunks.push(fromCamelToKebabCase(key) + ':' + value);
                    }
                }
            }
            return chunks.join(';');
        }
    }
    return String(obj);
};
const getNextIndex = (ctx) => {
    return intToStr(ctx.$static$.$containerState$.$elementIndex$++);
};
const getQId = (el) => {
    const ctx = tryGetContext(el);
    if (ctx) {
        return ctx.$id$;
    }
    return null;
};
const setQId = (rctx, ctx) => {
    const id = getNextIndex(rctx);
    ctx.$id$ = id;
    if (qSerialize) {
        ctx.$element$.setAttribute(ELEMENT_ID, id);
    }
};
const hasStyle = (containerState, styleId) => {
    return containerState.$styleIds$.has(styleId);
};
const ALLOWS_PROPS = [QSlot];
const SKIPS_PROPS = [QSlot, OnRenderProp, 'children'];

const hashCode = (text, hash = 0) => {
    if (text.length === 0)
        return hash;
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
    const value = scopeIds.join(' ');
    if (value.length > 0) {
        return value;
    }
    return undefined;
};

const setAttribute = (ctx, el, prop, value) => {
    if (ctx) {
        ctx.$operations$.push({
            $operation$: _setAttribute,
            $args$: [el, prop, value],
        });
    }
    else {
        _setAttribute(el, prop, value);
    }
};
const _setAttribute = (el, prop, value) => {
    if (value == null || value === false) {
        el.removeAttribute(prop);
    }
    else {
        const str = value === true ? '' : String(value);
        directSetAttribute(el, prop, str);
    }
};
const setProperty$1 = (ctx, node, key, value) => {
    if (ctx) {
        ctx.$operations$.push({
            $operation$: _setProperty,
            $args$: [node, key, value],
        });
    }
    else {
        _setProperty(node, key, value);
    }
};
const _setProperty = (node, key, value) => {
    try {
        node[key] = value;
    }
    catch (err) {
        logError(codeToText(QError_setProperty), { node, key, value }, err);
    }
};
const createElement = (doc, expectTag, isSvg) => {
    const el = isSvg ? doc.createElementNS(SVG_NS, expectTag) : doc.createElement(expectTag);
    return el;
};
const insertBefore = (ctx, parent, newChild, refChild) => {
    ctx.$operations$.push({
        $operation$: directInsertBefore,
        $args$: [parent, newChild, refChild ? refChild : null],
    });
    return newChild;
};
const appendChild = (ctx, parent, newChild) => {
    ctx.$operations$.push({
        $operation$: directAppendChild,
        $args$: [parent, newChild],
    });
    return newChild;
};
const appendHeadStyle = (ctx, styleTask) => {
    ctx.$containerState$.$styleIds$.add(styleTask.styleId);
    ctx.$postOperations$.push({
        $operation$: _appendHeadStyle,
        $args$: [ctx.$doc$, ctx.$containerEl$, styleTask],
    });
};
const setClasslist = (ctx, elm, toRemove, toAdd) => {
    if (ctx) {
        ctx.$operations$.push({
            $operation$: _setClasslist,
            $args$: [elm, toRemove, toAdd],
        });
    }
    else {
        _setClasslist(elm, toRemove, toAdd);
    }
};
const _setClasslist = (elm, toRemove, toAdd) => {
    const classList = elm.classList;
    classList.remove(...toRemove);
    classList.add(...toAdd);
};
const _appendHeadStyle = (doc, containerEl, styleTask) => {
    const isDoc = doc.documentElement === containerEl;
    const headEl = doc.head;
    const style = doc.createElement('style');
    if (isDoc && !headEl) {
        logWarn('document.head is undefined');
    }
    directSetAttribute(style, QStyle, styleTask.styleId);
    style.textContent = styleTask.content;
    if (isDoc && headEl) {
        directAppendChild(headEl, style);
    }
    else {
        directInsertBefore(containerEl, style, containerEl.firstChild);
    }
};
const prepend = (ctx, parent, newChild) => {
    ctx.$operations$.push({
        $operation$: directInsertBefore,
        $args$: [parent, newChild, parent.firstChild],
    });
};
const removeNode = (ctx, el) => {
    ctx.$operations$.push({
        $operation$: _removeNode,
        $args$: [el, ctx],
    });
};
const _removeNode = (el, staticCtx) => {
    const parent = el.parentElement;
    if (parent) {
        if (el.nodeType === 1 || el.nodeType === 111) {
            const subsManager = staticCtx.$containerState$.$subsManager$;
            cleanupTree(el, staticCtx, subsManager, true);
        }
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
const executeDOMRender = (ctx) => {
    for (const op of ctx.$operations$) {
        op.$operation$.apply(undefined, op.$args$);
    }
    resolveSlotProjection(ctx);
};
const getKey = (el) => {
    return directGetAttribute(el, 'q:key');
};
const setKey = (el, key) => {
    if (key !== null) {
        directSetAttribute(el, 'q:key', key);
    }
};
const resolveSlotProjection = (ctx) => {
    // Slots removed
    const subsManager = ctx.$containerState$.$subsManager$;
    ctx.$rmSlots$.forEach((slotEl) => {
        const key = getKey(slotEl);
        assertDefined(key, 'slots must have a key');
        const slotChildren = getChildren(slotEl, 'root');
        if (slotChildren.length > 0) {
            const sref = slotEl.getAttribute(QSlotRef);
            const hostCtx = ctx.$roots$.find((r) => r.$id$ === sref);
            if (hostCtx) {
                const template = createTemplate(ctx.$doc$, key);
                const hostElm = hostCtx.$element$;
                for (const child of slotChildren) {
                    directAppendChild(template, child);
                }
                directInsertBefore(hostElm, template, hostElm.firstChild);
            }
            else {
                // If slot content cannot be relocated, it means it's content is definively removed
                // Cleanup needs to be executed
                cleanupTree(slotEl, ctx, subsManager, false);
            }
        }
    });
    // Slots added
    ctx.$addSlots$.forEach(([slotEl, hostElm]) => {
        const key = getKey(slotEl);
        assertDefined(key, 'slots must have a key');
        const template = Array.from(hostElm.childNodes).find((node) => {
            return isSlotTemplate(node) && node.getAttribute(QSlot) === key;
        });
        if (template) {
            const children = getChildren(template, 'root');
            children.forEach((child) => {
                directAppendChild(slotEl, child);
            });
            template.remove();
        }
    });
};
const createTextNode = (doc, text) => {
    return doc.createTextNode(text);
};
const printRenderStats = (ctx) => {
    if (qDev) {
        if (typeof window !== 'undefined' && window.document != null) {
            const byOp = {};
            for (const op of ctx.$operations$) {
                byOp[op.$operation$.name] = (byOp[op.$operation$.name] ?? 0) + 1;
            }
            const stats = {
                byOp,
                roots: ctx.$roots$.map((ctx) => ctx.$element$),
                hostElements: Array.from(ctx.$hostElements$),
                operations: ctx.$operations$.map((v) => [v.$operation$.name, ...v.$args$]),
            };
            const noOps = ctx.$operations$.length === 0;
            logDebug('Render stats.', noOps ? 'No operations' : '', stats);
        }
    }
};

const VIRTUAL_SYMBOL = '__virtual';
const newVirtualElement = (doc) => {
    const open = doc.createComment('qv ');
    const close = doc.createComment('/qv');
    return new VirtualElementImpl(open, close);
};
const parseVirtualAttributes = (str) => {
    if (!str) {
        return new Map();
    }
    const attributes = str.split(' ');
    return new Map(attributes.map((attr) => {
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
    map.forEach((value, key) => {
        if (!value) {
            attributes.push(`${key}`);
        }
        else {
            attributes.push(`${key}=${escape$1(value)}`);
        }
    });
    return attributes.join(' ');
};
const SHOW_COMMENT$1 = 128;
const FILTER_ACCEPT$1 = 1;
const FILTER_REJECT$1 = 2;
const walkerVirtualByAttribute = (el, prop, value) => {
    return el.ownerDocument.createTreeWalker(el, SHOW_COMMENT$1, {
        acceptNode(c) {
            const virtual = getVirtualElement(c);
            if (virtual) {
                return directGetAttribute(virtual, prop) === value ? FILTER_ACCEPT$1 : FILTER_REJECT$1;
            }
            return FILTER_REJECT$1;
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
const escape$1 = (s) => {
    return s.replace(/ /g, '+');
};
const unescape = (s) => {
    return s.replace(/\+/g, ' ');
};
const VIRTUAL = ':virtual';
class VirtualElementImpl {
    constructor(open, close) {
        this.open = open;
        this.close = close;
        this._qc_ = null;
        this.nodeType = 111;
        this.localName = VIRTUAL;
        this.nodeName = VIRTUAL;
        const doc = (this.ownerDocument = open.ownerDocument);
        this.template = createElement(doc, 'template', false);
        this.attributes = parseVirtualAttributes(open.data.slice(3));
        assertTrue(open.data.startsWith('qv '), 'comment is not a qv');
        open[VIRTUAL_SYMBOL] = this;
        seal(this);
    }
    insertBefore(node, ref) {
        const parent = this.parentElement;
        if (parent) {
            const ref2 = ref ? ref : this.close;
            parent.insertBefore(node, ref2);
        }
        else {
            this.template.insertBefore(node, ref);
        }
        return node;
    }
    remove() {
        const parent = this.parentElement;
        if (parent) {
            const ch = Array.from(this.childNodes);
            assertEqual(this.template.childElementCount, 0, 'children should be empty');
            parent.removeChild(this.open);
            this.template.append(...ch);
            parent.removeChild(this.close);
        }
    }
    appendChild(node) {
        return this.insertBefore(node, null);
    }
    insertBeforeTo(newParent, child) {
        const ch = Array.from(this.childNodes);
        if (this.parentElement) {
            console.warn('already attached');
        }
        newParent.insertBefore(this.open, child);
        for (const c of ch) {
            newParent.insertBefore(c, child);
        }
        newParent.insertBefore(this.close, child);
        assertEqual(this.template.childElementCount, 0, 'children should be empty');
    }
    appendTo(newParent) {
        this.insertBeforeTo(newParent, null);
    }
    removeChild(child) {
        if (this.parentElement) {
            this.parentElement.removeChild(child);
        }
        else {
            this.template.removeChild(child);
        }
    }
    getAttribute(prop) {
        return this.attributes.get(prop) ?? null;
    }
    hasAttribute(prop) {
        return this.attributes.has(prop);
    }
    setAttribute(prop, value) {
        this.attributes.set(prop, value);
        if (qSerialize) {
            this.open.data = updateComment(this.attributes);
        }
    }
    removeAttribute(prop) {
        this.attributes.delete(prop);
        if (qSerialize) {
            this.open.data = updateComment(this.attributes);
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
        const ch = getChildren(this, 'elements');
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
            if (isElement(el)) {
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
    get firstChild() {
        if (this.parentElement) {
            const first = this.open.nextSibling;
            if (first === this.close) {
                return null;
            }
            return first;
        }
        else {
            return this.template.firstChild;
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
            return this.template.childNodes;
        }
        const nodes = [];
        let node = this.open;
        while ((node = node.nextSibling)) {
            if (node !== this.close) {
                nodes.push(node);
            }
            else {
                break;
            }
        }
        return nodes;
    }
    get isConnected() {
        return this.open.isConnected;
    }
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
const getVirtualElement = (open) => {
    const virtual = open[VIRTUAL_SYMBOL];
    if (virtual) {
        return virtual;
    }
    if (open.data.startsWith('qv ')) {
        const close = findClose(open);
        return new VirtualElementImpl(open, close);
    }
    return null;
};
const findClose = (open) => {
    let node = open.nextSibling;
    let stack = 1;
    while (node) {
        if (isComment(node)) {
            if (node.data.startsWith('qv ')) {
                stack++;
            }
            else if (node.data === '/qv') {
                stack--;
                if (stack === 0) {
                    return node;
                }
            }
        }
        node = node.nextSibling;
    }
    throw new Error('close not found');
};
const isComment = (node) => {
    return node.nodeType === 8;
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

const renderComponent = (rctx, ctx, flags) => {
    const justMounted = !ctx.$mounted$;
    // TODO, serialize scopeIds
    return then(executeComponent(rctx, ctx), (res) => {
        if (res) {
            const hostElement = ctx.$element$;
            const newCtx = res.rctx;
            const invocatinContext = newInvokeContext(rctx.$static$.$doc$, hostElement);
            invocatinContext.$subscriber$ = hostElement;
            invocatinContext.$renderCtx$ = newCtx;
            if (justMounted) {
                if (ctx.$appendStyles$) {
                    for (const style of ctx.$appendStyles$) {
                        appendHeadStyle(rctx.$static$, style);
                    }
                }
                if (ctx.$scopeIds$) {
                    const value = serializeSStyle(ctx.$scopeIds$);
                    if (value) {
                        hostElement.setAttribute(QScopedStyle, value);
                    }
                }
            }
            const processedJSXNode = processData$1(res.node, invocatinContext);
            return then(processedJSXNode, (processedJSXNode) => {
                const newVdom = wrapJSX(hostElement, processedJSXNode);
                const oldVdom = getVdom(ctx);
                ctx.$vdom$ = newVdom;
                return visitJsxNode(newCtx, oldVdom, newVdom, flags);
            });
        }
    });
};
const getVdom = (ctx) => {
    if (!ctx.$vdom$) {
        ctx.$vdom$ = domToVnode(ctx.$element$);
    }
    return ctx.$vdom$;
};
class ProcessedJSXNodeImpl {
    constructor($type$, $props$, $children$, $key$) {
        this.$type$ = $type$;
        this.$props$ = $props$;
        this.$children$ = $children$;
        this.$key$ = $key$;
        this.$elm$ = null;
        this.$text$ = '';
        seal(this);
    }
}
const processNode = (node, invocationContext) => {
    const key = node.key != null ? String(node.key) : null;
    const nodeType = node.type;
    const props = node.props;
    const originalChildren = props.children;
    let textType = '';
    if (isString(nodeType)) {
        textType = nodeType;
    }
    else if (nodeType === Virtual) {
        textType = VIRTUAL;
    }
    else if (isFunction(nodeType)) {
        const res = invocationContext
            ? invoke(invocationContext, () => nodeType(props, node.key))
            : nodeType(props, node.key);
        return processData$1(res, invocationContext);
    }
    else {
        throw qError(QError_invalidJsxNodeType, nodeType);
    }
    let children = EMPTY_ARRAY;
    if (originalChildren != null) {
        return then(processData$1(originalChildren, invocationContext), (result) => {
            if (result !== undefined) {
                children = isArray(result) ? result : [result];
            }
            return new ProcessedJSXNodeImpl(textType, props, children, key);
        });
    }
    else {
        return new ProcessedJSXNodeImpl(textType, props, children, key);
    }
};
const wrapJSX = (element, input) => {
    const children = input === undefined ? EMPTY_ARRAY : isArray(input) ? input : [input];
    const node = new ProcessedJSXNodeImpl(':virtual', {}, children, null);
    node.$elm$ = element;
    return node;
};
const processData$1 = (node, invocationContext) => {
    if (node == null || typeof node === 'boolean') {
        return undefined;
    }
    if (isString(node) || typeof node === 'number') {
        const newNode = new ProcessedJSXNodeImpl('#text', EMPTY_OBJ, EMPTY_ARRAY, null);
        newNode.$text$ = String(node);
        return newNode;
    }
    else if (isJSXNode(node)) {
        return processNode(node, invocationContext);
    }
    else if (isArray(node)) {
        const output = promiseAll(node.flatMap((n) => processData$1(n, invocationContext)));
        return then(output, (array) => array.flat(100).filter(isNotNullable));
    }
    else if (isPromise(node)) {
        return node.then((node) => processData$1(node, invocationContext));
    }
    else if (node === SkipRender) {
        return new ProcessedJSXNodeImpl(SKIP_RENDER_TYPE, EMPTY_OBJ, EMPTY_ARRAY, null);
    }
    else {
        logWarn('A unsupported value was passed to the JSX, skipping render. Value:', node);
        return undefined;
    }
};

const SVG_NS = 'http://www.w3.org/2000/svg';
const IS_SVG = 1 << 0;
const IS_HEAD$1 = 1 << 1;
const CHILDREN_PLACEHOLDER = [];
const visitJsxNode = (ctx, oldVnode, newVnode, flags) => {
    return smartUpdateChildren(ctx, oldVnode, newVnode, 'root', flags);
};
const smartUpdateChildren = (ctx, oldVnode, newVnode, mode, flags) => {
    assertQwikElement(oldVnode.$elm$);
    const ch = newVnode.$children$;
    if (ch.length === 1 && ch[0].$type$ === SKIP_RENDER_TYPE) {
        return;
    }
    const elm = oldVnode.$elm$;
    const needsDOMRead = oldVnode.$children$ === CHILDREN_PLACEHOLDER;
    if (needsDOMRead) {
        const isHead = elm.nodeName === 'HEAD';
        if (isHead) {
            mode = 'head';
            flags |= IS_HEAD$1;
        }
    }
    const oldCh = getVnodeChildren(oldVnode, mode);
    if (oldCh.length > 0 && ch.length > 0) {
        return updateChildren(ctx, elm, oldCh, ch, flags);
    }
    else if (ch.length > 0) {
        return addVnodes(ctx, elm, null, ch, 0, ch.length - 1, flags);
    }
    else if (oldCh.length > 0) {
        return removeVnodes(ctx.$static$, oldCh, 0, oldCh.length - 1);
    }
};
const getVnodeChildren = (vnode, mode) => {
    const oldCh = vnode.$children$;
    const elm = vnode.$elm$;
    if (oldCh === CHILDREN_PLACEHOLDER) {
        return (vnode.$children$ = getChildrenVnodes(elm, mode));
    }
    return oldCh;
};
const updateChildren = (ctx, parentElm, oldCh, newCh, flags) => {
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
        else if (sameVnode(oldStartVnode, newStartVnode)) {
            results.push(patchVnode(ctx, oldStartVnode, newStartVnode, flags));
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (sameVnode(oldEndVnode, newEndVnode)) {
            results.push(patchVnode(ctx, oldEndVnode, newEndVnode, flags));
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldStartVnode, newEndVnode)) {
            assertDefined(oldStartVnode.$elm$, 'oldStartVnode $elm$ must be defined');
            assertDefined(oldEndVnode.$elm$, 'oldEndVnode $elm$ must be defined');
            // Vnode moved right
            results.push(patchVnode(ctx, oldStartVnode, newEndVnode, flags));
            insertBefore(staticCtx, parentElm, oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldEndVnode, newStartVnode)) {
            assertDefined(oldStartVnode.$elm$, 'oldStartVnode $elm$ must be defined');
            assertDefined(oldEndVnode.$elm$, 'oldEndVnode $elm$ must be defined');
            // Vnode moved left
            results.push(patchVnode(ctx, oldEndVnode, newStartVnode, flags));
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
                const newElm = createElm(ctx, newStartVnode, flags);
                results.push(then(newElm, (newElm) => {
                    insertBefore(staticCtx, parentElm, newElm, oldStartVnode.$elm$);
                }));
            }
            else {
                elmToMove = oldCh[idxInOld];
                if (!isTagName(elmToMove, newStartVnode.$type$)) {
                    const newElm = createElm(ctx, newStartVnode, flags);
                    results.push(then(newElm, (newElm) => {
                        insertBefore(staticCtx, parentElm, newElm, oldStartVnode.$elm$);
                    }));
                }
                else {
                    results.push(patchVnode(ctx, elmToMove, newStartVnode, flags));
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
        results.push(addVnodes(ctx, parentElm, before, newCh, newStartIdx, newEndIdx, flags));
    }
    let wait = promiseAll(results);
    if (oldStartIdx <= oldEndIdx) {
        wait = then(wait, () => {
            removeVnodes(staticCtx, oldCh, oldStartIdx, oldEndIdx);
        });
    }
    return wait;
};
const getCh = (elm, filter) => {
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
const getChildren = (elm, mode) => {
    // console.warn('DOM READ: getChildren()', elm);
    switch (mode) {
        case 'root':
            return getCh(elm, isChildComponent);
        case 'head':
            return getCh(elm, isHeadChildren);
        case 'elements':
            return getCh(elm, isQwikElement);
    }
};
const getChildrenVnodes = (elm, mode) => {
    return getChildren(elm, mode).map(domToVnode);
};
const domToVnode = (node) => {
    if (isQwikElement(node)) {
        const props = isVirtualElement(node) ? EMPTY_OBJ : getProps(node);
        const t = new ProcessedJSXNodeImpl(node.localName, props, CHILDREN_PLACEHOLDER, getKey(node));
        t.$elm$ = node;
        return t;
    }
    else if (isText(node)) {
        const t = new ProcessedJSXNodeImpl(node.nodeName, {}, CHILDREN_PLACEHOLDER, null);
        t.$text$ = node.data;
        t.$elm$ = node;
        return t;
    }
    throw new Error('invalid node');
};
const getProps = (node) => {
    const props = {};
    const attributes = node.attributes;
    const len = attributes.length;
    for (let i = 0; i < len; i++) {
        const a = attributes.item(i);
        assertDefined(a, 'attribute must be defined');
        const name = a.name;
        if (!name.includes(':')) {
            props[name] =
                name === 'class'
                    ? parseClassAny(a.value).filter((c) => !c.startsWith(ComponentStylesPrefixContent))
                    : a.value;
        }
    }
    return props;
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
    return true;
};
const splitChildren = (input) => {
    const output = {};
    for (const item of input) {
        const key = getSlotName(item);
        const node = output[key] ??
            (output[key] = new ProcessedJSXNodeImpl(VIRTUAL, {
                [QSlotS]: '',
            }, [], key));
        node.$children$.push(item);
    }
    return output;
};
const patchVnode = (rctx, oldVnode, newVnode, flags) => {
    assertEqual(oldVnode.$type$, newVnode.$type$, 'old and new vnodes type must be the same');
    const elm = oldVnode.$elm$;
    const tag = newVnode.$type$;
    const staticCtx = rctx.$static$;
    const isVirtual = tag === VIRTUAL;
    newVnode.$elm$ = elm;
    // Render text nodes
    if (tag === '#text') {
        if (oldVnode.$text$ !== newVnode.$text$) {
            setProperty$1(staticCtx, elm, 'data', newVnode.$text$);
        }
        return;
    }
    assertQwikElement(elm);
    // Track SVG state
    let isSvg = !!(flags & IS_SVG);
    if (!isSvg && tag === 'svg') {
        flags |= IS_SVG;
        isSvg = true;
    }
    const props = newVnode.$props$;
    const isComponent = isVirtual && OnRenderProp in props;
    const elCtx = getContext(elm);
    if (!isComponent) {
        const listenerMap = updateProperties$1(elCtx, staticCtx, oldVnode.$props$, props, isSvg);
        const currentComponent = rctx.$cmpCtx$;
        if (currentComponent && !currentComponent.$attachedListeners$) {
            currentComponent.$attachedListeners$ = true;
            Object.entries(currentComponent.li).forEach(([key, value]) => {
                addQRLListener(listenerMap, key, value);
                addGlobalListener(staticCtx, elm, key);
            });
        }
        if (qSerialize) {
            Object.entries(listenerMap).forEach(([key, value]) => setAttribute(staticCtx, elm, key, serializeQRLs(value, elCtx)));
        }
        if (isSvg && newVnode.$type$ === 'foreignObject') {
            flags &= ~IS_SVG;
            isSvg = false;
        }
        const isSlot = isVirtual && QSlotS in props;
        if (isSlot) {
            const currentComponent = rctx.$cmpCtx$;
            assertDefined(currentComponent, 'slots can not be rendered outside a component');
            assertDefined(currentComponent.$slots$, 'current component slots must be a defined array');
            currentComponent.$slots$.push(newVnode);
            return;
        }
        const setsInnerHTML = props[dangerouslySetInnerHTML] !== undefined;
        if (setsInnerHTML) {
            if (qDev && newVnode.$children$.length > 0) {
                logWarn('Node can not have children when innerHTML is set');
            }
            return;
        }
        const isRenderOnce = isVirtual && QOnce in props;
        if (isRenderOnce) {
            return;
        }
        return smartUpdateChildren(rctx, oldVnode, newVnode, 'root', flags);
    }
    let needsRender = setComponentProps(elCtx, rctx, props);
    // TODO: review this corner case
    if (!needsRender && !elCtx.$renderQrl$ && !elCtx.$element$.hasAttribute(ELEMENT_ID)) {
        setQId(rctx, elCtx);
        elCtx.$renderQrl$ = props[OnRenderProp];
        assertQrl(elCtx.$renderQrl$);
        needsRender = true;
    }
    // Rendering of children of component is more complicated,
    // since the children must be projected into the rendered slots
    // In addition, nested childen might need rerendering, if that's the case
    // we need to render the nested component, and wait before projecting the content
    // since otherwise we don't know where the slots
    if (needsRender) {
        return then(renderComponent(rctx, elCtx, flags), () => renderContentProjection(rctx, elCtx, newVnode, flags));
    }
    return renderContentProjection(rctx, elCtx, newVnode, flags);
};
const renderContentProjection = (rctx, hostCtx, vnode, flags) => {
    const newChildren = vnode.$children$;
    const staticCtx = rctx.$static$;
    const splittedNewChidren = splitChildren(newChildren);
    const slotRctx = pushRenderContext(rctx, hostCtx);
    const slotMaps = getSlotMap(hostCtx);
    // Remove content from empty slots
    Object.entries(slotMaps.slots).forEach(([key, slotEl]) => {
        if (!splittedNewChidren[key]) {
            const oldCh = getChildrenVnodes(slotEl, 'root');
            if (oldCh.length > 0) {
                const slotCtx = tryGetContext(slotEl);
                if (slotCtx && slotCtx.$vdom$) {
                    slotCtx.$vdom$.$children$ = [];
                }
                removeVnodes(staticCtx, oldCh, 0, oldCh.length - 1);
            }
        }
    });
    // Remove empty templates
    Object.entries(slotMaps.templates).forEach(([key, templateEl]) => {
        if (templateEl) {
            if (!splittedNewChidren[key] || slotMaps.slots[key]) {
                removeNode(staticCtx, templateEl);
                slotMaps.templates[key] = undefined;
            }
        }
    });
    // Render into slots
    return promiseAll(Object.entries(splittedNewChidren).map(([key, newVdom]) => {
        const slotElm = getSlotElement(staticCtx, slotMaps, hostCtx.$element$, key);
        const slotCtx = getContext(slotElm);
        const oldVdom = getVdom(slotCtx);
        slotCtx.$vdom$ = newVdom;
        newVdom.$elm$ = slotElm;
        return smartUpdateChildren(slotRctx, oldVdom, newVdom, 'root', flags);
    }));
};
const addVnodes = (ctx, parentElm, before, vnodes, startIdx, endIdx, flags) => {
    const promises = [];
    let hasPromise = false;
    for (; startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx];
        assertDefined(ch, 'render: node must be defined at index', startIdx, vnodes);
        const elm = createElm(ctx, ch, flags);
        promises.push(elm);
        if (isPromise(elm)) {
            hasPromise = true;
        }
    }
    if (hasPromise) {
        return Promise.all(promises).then((children) => insertChildren(ctx.$static$, parentElm, children, before));
    }
    else {
        insertChildren(ctx.$static$, parentElm, promises, before);
    }
};
const insertChildren = (ctx, parentElm, children, before) => {
    for (const child of children) {
        insertBefore(ctx, parentElm, child, before);
    }
};
const removeVnodes = (ctx, nodes, startIdx, endIdx) => {
    for (; startIdx <= endIdx; ++startIdx) {
        const ch = nodes[startIdx];
        if (ch) {
            assertDefined(ch.$elm$, 'vnode elm must be defined');
            removeNode(ctx, ch.$elm$);
        }
    }
};
const getSlotElement = (ctx, slotMaps, parentEl, slotName) => {
    const slotEl = slotMaps.slots[slotName];
    if (slotEl) {
        return slotEl;
    }
    const templateEl = slotMaps.templates[slotName];
    if (templateEl) {
        return templateEl;
    }
    const template = createTemplate(ctx.$doc$, slotName);
    prepend(ctx, parentEl, template);
    slotMaps.templates[slotName] = template;
    return template;
};
const getSlotName = (node) => {
    return node.$props$[QSlot] ?? '';
};
const createElm = (rctx, vnode, flags) => {
    const tag = vnode.$type$;
    const doc = rctx.$static$.$doc$;
    if (tag === '#text') {
        return (vnode.$elm$ = createTextNode(doc, vnode.$text$));
    }
    let elm;
    let isHead = !!(flags & IS_HEAD$1);
    let isSvg = !!(flags & IS_SVG);
    if (!isSvg && tag === 'svg') {
        flags |= IS_SVG;
        isSvg = true;
    }
    const isVirtual = tag === VIRTUAL;
    const props = vnode.$props$;
    const isComponent = OnRenderProp in props;
    const staticCtx = rctx.$static$;
    if (isVirtual) {
        elm = newVirtualElement(doc);
    }
    else if (tag === 'head') {
        elm = doc.head;
        flags |= IS_HEAD$1;
        isHead = true;
    }
    else {
        elm = createElement(doc, tag, isSvg);
        flags &= ~IS_HEAD$1;
    }
    vnode.$elm$ = elm;
    if (isSvg && tag === 'foreignObject') {
        isSvg = false;
        flags &= ~IS_SVG;
    }
    const elCtx = getContext(elm);
    if (isComponent) {
        setKey(elm, vnode.$key$);
        assertTrue(isVirtual, 'component must be a virtual element');
        const renderQRL = props[OnRenderProp];
        assertQrl(renderQRL);
        setComponentProps(elCtx, rctx, props);
        setQId(rctx, elCtx);
        // Run mount hook
        elCtx.$renderQrl$ = renderQRL;
        return then(renderComponent(rctx, elCtx, flags), () => {
            let children = vnode.$children$;
            if (children.length === 0) {
                return elm;
            }
            if (children.length === 1 && children[0].$type$ === SKIP_RENDER_TYPE) {
                children = children[0].$children$;
            }
            const slotRctx = pushRenderContext(rctx, elCtx);
            const slotMap = getSlotMap(elCtx);
            const elements = children.map((ch) => createElm(slotRctx, ch, flags));
            return then(promiseAll(elements), () => {
                for (const node of children) {
                    assertDefined(node.$elm$, 'vnode elm must be defined');
                    appendChild(staticCtx, getSlotElement(staticCtx, slotMap, elm, getSlotName(node)), node.$elm$);
                }
                return elm;
            });
        });
    }
    const currentComponent = rctx.$cmpCtx$;
    const isSlot = isVirtual && QSlotS in props;
    const hasRef = !isVirtual && 'ref' in props;
    const listenerMap = setProperties(staticCtx, elCtx, props, isSvg);
    if (currentComponent && !isVirtual) {
        const scopedIds = currentComponent.$scopeIds$;
        if (scopedIds) {
            scopedIds.forEach((styleId) => {
                elm.classList.add(styleId);
            });
        }
        if (!currentComponent.$attachedListeners$) {
            currentComponent.$attachedListeners$ = true;
            Object.entries(currentComponent.li).forEach(([eventName, qrls]) => {
                addQRLListener(listenerMap, eventName, qrls);
            });
        }
    }
    if (isSlot) {
        assertDefined(currentComponent, 'slot can only be used inside component');
        assertDefined(currentComponent.$slots$, 'current component slots must be a defined array');
        setKey(elm, vnode.$key$);
        directSetAttribute(elm, QSlotRef, currentComponent.$id$);
        currentComponent.$slots$.push(vnode);
        staticCtx.$addSlots$.push([elm, currentComponent.$element$]);
    }
    else if (qSerialize) {
        setKey(elm, vnode.$key$);
    }
    if (qSerialize) {
        const listeners = Object.entries(listenerMap);
        if (isHead && !isVirtual) {
            directSetAttribute(elm, 'q:head', '');
        }
        if (listeners.length > 0 || hasRef) {
            setQId(rctx, elCtx);
        }
        listeners.forEach(([key, qrls]) => {
            setAttribute(staticCtx, elm, key, serializeQRLs(qrls, elCtx));
        });
    }
    const setsInnerHTML = props[dangerouslySetInnerHTML] !== undefined;
    if (setsInnerHTML) {
        if (qDev && vnode.$children$.length > 0) {
            logWarn('Node can not have children when innerHTML is set');
        }
        return elm;
    }
    let children = vnode.$children$;
    if (children.length === 0) {
        return elm;
    }
    if (children.length === 1 && children[0].$type$ === SKIP_RENDER_TYPE) {
        children = children[0].$children$;
    }
    const promises = children.map((ch) => createElm(rctx, ch, flags));
    return then(promiseAll(promises), () => {
        for (const node of children) {
            assertDefined(node.$elm$, 'vnode elm must be defined');
            appendChild(rctx.$static$, elm, node.$elm$);
        }
        return elm;
    });
};
const getSlots = (ctx) => {
    const slots = ctx.$slots$;
    if (!slots) {
        const parent = ctx.$element$.parentElement;
        assertDefined(parent, 'component should be already attached to the dom');
        return (ctx.$slots$ = readDOMSlots(ctx));
    }
    return slots;
};
const getSlotMap = (ctx) => {
    const slotsArray = getSlots(ctx);
    const slots = {};
    const templates = {};
    const t = Array.from(ctx.$element$.childNodes).filter(isSlotTemplate);
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
const readDOMSlots = (ctx) => {
    const parent = ctx.$element$.parentElement;
    assertDefined(parent, 'component should be already attached to the dom');
    return queryAllVirtualByAttribute(parent, QSlotRef, ctx.$id$).map(domToVnode);
};
const handleStyle = (ctx, elm, _, newValue) => {
    setProperty$1(ctx, elm.style, 'cssText', stringifyStyle(newValue));
    return true;
};
const handleClass = (ctx, elm, _, newValue, oldValue) => {
    const oldClasses = parseClassAny(oldValue);
    const newClasses = parseClassAny(newValue);
    setClasslist(ctx, elm, oldClasses.filter((c) => c && !newClasses.includes(c)), newClasses.filter((c) => c && !oldClasses.includes(c)));
    return true;
};
const checkBeforeAssign = (ctx, elm, prop, newValue) => {
    if (prop in elm) {
        if (elm[prop] !== newValue) {
            setProperty$1(ctx, elm, prop, newValue);
        }
    }
    return true;
};
const dangerouslySetInnerHTML = 'dangerouslySetInnerHTML';
const setInnerHTML = (ctx, elm, _, newValue) => {
    if (dangerouslySetInnerHTML in elm) {
        setProperty$1(ctx, elm, dangerouslySetInnerHTML, newValue);
    }
    else if ('innerHTML' in elm) {
        setProperty$1(ctx, elm, 'innerHTML', newValue);
    }
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
    [dangerouslySetInnerHTML]: setInnerHTML,
    innerHTML: noop,
};
const updateProperties$1 = (elCtx, staticCtx, oldProps, newProps, isSvg) => {
    const keys = getKeys(oldProps, newProps);
    const listenersMap = (elCtx.li = {});
    if (keys.length === 0) {
        return listenersMap;
    }
    const elm = elCtx.$element$;
    for (const key of keys) {
        if (key === 'children') {
            continue;
        }
        const newValue = newProps[key];
        const oldValue = oldProps[key];
        if (oldValue === newValue) {
            continue;
        }
        if (key === 'ref') {
            newValue.current = elm;
            continue;
        }
        if (isOnProp(key)) {
            setEvent(listenersMap, key, newValue);
            continue;
        }
        // Check if its an exception
        const exception = PROP_HANDLER_MAP[key];
        if (exception) {
            if (exception(staticCtx, elm, key, newValue, oldValue)) {
                continue;
            }
        }
        // Check if property in prototype
        if (!isSvg && key in elm) {
            setProperty$1(staticCtx, elm, key, newValue);
            continue;
        }
        // Fallback to render attribute
        setAttribute(staticCtx, elm, key, newValue);
    }
    return listenersMap;
};
const getKeys = (oldProps, newProps) => {
    const keys = Object.keys(newProps);
    keys.push(...Object.keys(oldProps).filter((p) => !keys.includes(p)));
    return keys;
};
const addGlobalListener = (staticCtx, elm, prop) => {
    if (!qSerialize && prop.includes(':')) {
        setAttribute(staticCtx, elm, prop, '');
    }
};
const setProperties = (rctx, elCtx, newProps, isSvg) => {
    const elm = elCtx.$element$;
    const keys = Object.keys(newProps);
    const listenerMap = elCtx.li;
    if (keys.length === 0) {
        return listenerMap;
    }
    for (const key of keys) {
        if (key === 'children') {
            continue;
        }
        const newValue = newProps[key];
        if (key === 'ref') {
            newValue.current = elm;
            continue;
        }
        if (isOnProp(key)) {
            addGlobalListener(rctx, elm, setEvent(listenerMap, key, newValue));
            continue;
        }
        // Check if its an exception
        const exception = PROP_HANDLER_MAP[key];
        if (exception) {
            if (exception(rctx, elm, key, newValue, undefined)) {
                continue;
            }
        }
        // Check if property in prototype
        if (!isSvg && key in elm) {
            setProperty$1(rctx, elm, key, newValue);
            continue;
        }
        // Fallback to render attribute
        setAttribute(rctx, elm, key, newValue);
    }
    return listenerMap;
};
const setComponentProps = (ctx, rctx, expectProps) => {
    const keys = Object.keys(expectProps);
    if (keys.length === 0) {
        return false;
    }
    const qwikProps = getPropsMutator(ctx, rctx.$static$.$containerState$);
    for (const key of keys) {
        if (SKIPS_PROPS.includes(key)) {
            continue;
        }
        qwikProps.set(key, expectProps[key]);
    }
    return ctx.$dirty$;
};
const cleanupTree = (parent, rctx, subsManager, stopSlots) => {
    if (stopSlots && parent.hasAttribute(QSlotS)) {
        rctx.$rmSlots$.push(parent);
        return;
    }
    cleanupElement(parent, subsManager);
    const ch = getChildren(parent, 'elements');
    for (const child of ch) {
        cleanupTree(child, rctx, subsManager, stopSlots);
    }
};
const cleanupElement = (el, subsManager) => {
    const ctx = tryGetContext(el);
    if (ctx) {
        cleanupContext(ctx, subsManager);
    }
};
const executeContextWithSlots = ({ $static$: ctx }) => {
    executeDOMRender(ctx);
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
const sameVnode = (vnode1, vnode2) => {
    if (vnode1.$type$ !== vnode2.$type$) {
        return false;
    }
    return vnode1.$key$ === vnode2.$key$;
};
const isTagName = (elm, tagName) => {
    return elm.$type$ === tagName;
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
        const ctx = getContext(el);
        assertDefined(container, `invoke: cant find parent q:container of`, el);
        qrl = parseQRL(decodeURIComponent(String(context.$url$)), container);
        assertQrl(qrl);
        resumeIfNeeded(container);
        inflateQrl(qrl, ctx);
    }
    else {
        assertQrl(qrl);
        assertDefined(qrl.$captureRef$, 'invoke: qrl $captureRef$ must be defined inside useLexicalScope()', qrl);
    }
    return qrl.$captureRef$;
};

const notifyChange = (subscriber, containerState) => {
    if (isQwikElement(subscriber)) {
        notifyRender(subscriber, containerState);
    }
    else {
        notifyWatch(subscriber, containerState);
    }
};
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
const notifyRender = (hostElement, containerState) => {
    const isServer = qDynamicPlatform && !qTest && containerState.$platform$.isServer;
    if (!isServer) {
        resumeIfNeeded(containerState.$containerEl$);
    }
    const ctx = getContext(hostElement);
    assertDefined(ctx.$renderQrl$, `render: notified host element must have a defined $renderQrl$`, ctx);
    if (ctx.$dirty$) {
        return;
    }
    ctx.$dirty$ = true;
    const activeRendering = containerState.$hostsRendering$ !== undefined;
    if (activeRendering) {
        assertDefined(containerState.$renderPromise$, 'render: while rendering, $renderPromise$ must be defined', containerState);
        containerState.$hostsStaging$.add(hostElement);
    }
    else {
        if (isServer) {
            logWarn('Can not rerender in server platform');
            return undefined;
        }
        containerState.$hostsNext$.add(hostElement);
        scheduleFrame(containerState);
    }
};
const notifyWatch = (watch, containerState) => {
    if (watch.$flags$ & WatchFlagsIsDirty) {
        return;
    }
    watch.$flags$ |= WatchFlagsIsDirty;
    const activeRendering = containerState.$hostsRendering$ !== undefined;
    if (activeRendering) {
        assertDefined(containerState.$renderPromise$, 'render: while rendering, $renderPromise$ must be defined', containerState);
        containerState.$watchStaging$.add(watch);
    }
    else {
        containerState.$watchNext$.add(watch);
        scheduleFrame(containerState);
    }
};
const scheduleFrame = (containerState) => {
    if (containerState.$renderPromise$ === undefined) {
        containerState.$renderPromise$ = containerState.$platform$.nextTick(() => renderMarked(containerState));
    }
    return containerState.$renderPromise$;
};
/**
 * Low-level API used by the Optimizer to process `useWatch$()` API. This method
 * is not intended to be used by developers.
 *
 * @internal
 *
 */
const _hW = () => {
    const [watch] = useLexicalScope();
    notifyWatch(watch, getContainerState(getWrappingContainer(watch.$el$)));
};
const renderMarked = async (containerState) => {
    const hostsRendering = (containerState.$hostsRendering$ = new Set(containerState.$hostsNext$));
    containerState.$hostsNext$.clear();
    await executeWatchesBefore(containerState);
    containerState.$hostsStaging$.forEach((host) => {
        hostsRendering.add(host);
    });
    containerState.$hostsStaging$.clear();
    const doc = getDocument(containerState.$containerEl$);
    const platform = containerState.$platform$;
    const renderingQueue = Array.from(hostsRendering);
    sortNodes(renderingQueue);
    const ctx = createRenderContext(doc, containerState);
    const staticCtx = ctx.$static$;
    for (const el of renderingQueue) {
        if (!staticCtx.$hostElements$.has(el)) {
            const elCtx = getContext(el);
            if (elCtx.$renderQrl$) {
                assertTrue(el.isConnected, 'element must be connected to the dom');
                staticCtx.$roots$.push(elCtx);
                try {
                    await renderComponent(ctx, elCtx, getFlags(el.parentElement));
                }
                catch (e) {
                    logError(codeToText(QError_errorWhileRendering), e);
                }
            }
        }
    }
    // Add post operations
    staticCtx.$operations$.push(...staticCtx.$postOperations$);
    // Early exist, no dom operations
    if (staticCtx.$operations$.length === 0) {
        printRenderStats(staticCtx);
        postRendering(containerState, staticCtx);
        return ctx;
    }
    return platform.raf(() => {
        executeContextWithSlots(ctx);
        printRenderStats(staticCtx);
        postRendering(containerState, staticCtx);
        return ctx;
    });
};
const getFlags = (el) => {
    let flags = 0;
    if (el) {
        if (el.namespaceURI === SVG_NS) {
            flags |= IS_SVG;
        }
        if (el.tagName === 'HEAD') {
            flags |= IS_HEAD$1;
        }
    }
    return flags;
};
const postRendering = async (containerState, ctx) => {
    await executeWatchesAfter(containerState, (watch, stage) => {
        if ((watch.$flags$ & WatchFlagsIsEffect) === 0) {
            return false;
        }
        if (stage) {
            return ctx.$hostElements$.has(watch.$el$);
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
    if (containerState.$hostsNext$.size + containerState.$watchNext$.size > 0) {
        scheduleFrame(containerState);
    }
};
const executeWatchesBefore = async (containerState) => {
    const resourcesPromises = [];
    const watchPromises = [];
    const isWatch = (watch) => (watch.$flags$ & WatchFlagsIsWatch) !== 0;
    const isResourceWatch = (watch) => (watch.$flags$ & WatchFlagsIsResource) !== 0;
    containerState.$watchNext$.forEach((watch) => {
        if (isWatch(watch)) {
            watchPromises.push(then(watch.$qrl$.$resolveLazy$(), () => watch));
            containerState.$watchNext$.delete(watch);
        }
        if (isResourceWatch(watch)) {
            resourcesPromises.push(then(watch.$qrl$.$resolveLazy$(), () => watch));
            containerState.$watchNext$.delete(watch);
        }
    });
    do {
        // Run staging effected
        containerState.$watchStaging$.forEach((watch) => {
            if (isWatch(watch)) {
                watchPromises.push(then(watch.$qrl$.$resolveLazy$(), () => watch));
            }
            else if (isResourceWatch(watch)) {
                resourcesPromises.push(then(watch.$qrl$.$resolveLazy$(), () => watch));
            }
            else {
                containerState.$watchNext$.add(watch);
            }
        });
        containerState.$watchStaging$.clear();
        // Wait for all promises
        if (watchPromises.length > 0) {
            const watches = await Promise.all(watchPromises);
            sortWatches(watches);
            await Promise.all(watches.map((watch) => {
                return runSubscriber(watch, containerState);
            }));
            watchPromises.length = 0;
        }
    } while (containerState.$watchStaging$.size > 0);
    if (resourcesPromises.length > 0) {
        const resources = await Promise.all(resourcesPromises);
        sortWatches(resources);
        resources.forEach((watch) => runSubscriber(watch, containerState));
    }
};
const executeWatchesAfter = async (containerState, watchPred) => {
    const watchPromises = [];
    containerState.$watchNext$.forEach((watch) => {
        if (watchPred(watch, false)) {
            watchPromises.push(then(watch.$qrl$.$resolveLazy$(), () => watch));
            containerState.$watchNext$.delete(watch);
        }
    });
    do {
        // Run staging effected
        containerState.$watchStaging$.forEach((watch) => {
            if (watchPred(watch, true)) {
                watchPromises.push(then(watch.$qrl$.$resolveLazy$(), () => watch));
            }
            else {
                containerState.$watchNext$.add(watch);
            }
        });
        containerState.$watchStaging$.clear();
        // Wait for all promises
        if (watchPromises.length > 0) {
            const watches = await Promise.all(watchPromises);
            sortWatches(watches);
            await Promise.all(watches.map((watch) => {
                return runSubscriber(watch, containerState);
            }));
            watchPromises.length = 0;
        }
    } while (containerState.$watchStaging$.size > 0);
};
const sortNodes = (elements) => {
    elements.sort((a, b) => (a.compareDocumentPosition(getRootNode(b)) & 2 ? 1 : -1));
};
const sortWatches = (watches) => {
    watches.sort((a, b) => {
        if (a.$el$ === b.$el$) {
            return a.$index$ < b.$index$ ? -1 : 1;
        }
        return (a.$el$.compareDocumentPosition(getRootNode(b.$el$)) & 2) !== 0 ? 1 : -1;
    });
};

const CONTAINER_STATE = Symbol('ContainerState');
const getContainerState = (containerEl) => {
    let set = containerEl[CONTAINER_STATE];
    if (!set) {
        containerEl[CONTAINER_STATE] = set = {
            $containerEl$: containerEl,
            $proxyMap$: new WeakMap(),
            $subsManager$: null,
            $platform$: getPlatform(containerEl),
            $watchNext$: new Set(),
            $watchStaging$: new Set(),
            $hostsNext$: new Set(),
            $hostsStaging$: new Set(),
            $renderPromise$: undefined,
            $hostsRendering$: undefined,
            $envData$: {},
            $elementIndex$: 0,
            $styleIds$: new Set(),
            $mutableProps$: false,
        };
        seal(set);
        set.$subsManager$ = createSubscriptionManager(set);
    }
    return set;
};
const createSubscriptionManager = (containerState) => {
    const objToSubs = new Map();
    const subsToObjs = new Map();
    const clearSub = (sub) => {
        const subs = subsToObjs.get(sub);
        if (subs) {
            subs.forEach((s) => {
                s.delete(sub);
            });
            subsToObjs.delete(sub);
            subs.clear();
        }
    };
    const tryGetLocal = (obj) => {
        assertEqual(getProxyTarget(obj), undefined, 'object can not be be a proxy', obj);
        return objToSubs.get(obj);
    };
    const trackSubToObj = (subscriber, map) => {
        let set = subsToObjs.get(subscriber);
        if (!set) {
            subsToObjs.set(subscriber, (set = new Set()));
        }
        set.add(map);
    };
    const getLocal = (obj, initialMap) => {
        let local = tryGetLocal(obj);
        if (local) {
            assertEqual(initialMap, undefined, 'subscription map can not be set to an existing object', local);
        }
        else {
            const map = !initialMap ? new Map() : initialMap;
            map.forEach((_, key) => {
                trackSubToObj(key, map);
            });
            objToSubs.set(obj, (local = {
                $subs$: map,
                $addSub$(subscriber, key) {
                    if (key == null) {
                        map.set(subscriber, null);
                    }
                    else {
                        let sub = map.get(subscriber);
                        if (sub === undefined) {
                            map.set(subscriber, (sub = new Set()));
                        }
                        if (sub) {
                            sub.add(key);
                        }
                    }
                    trackSubToObj(subscriber, map);
                },
                $notifySubs$(key) {
                    map.forEach((value, subscriber) => {
                        if (value === null || !key || value.has(key)) {
                            notifyChange(subscriber, containerState);
                        }
                    });
                },
            }));
            seal(local);
        }
        return local;
    };
    const manager = {
        $tryGetLocal$: tryGetLocal,
        $getLocal$: getLocal,
        $clearSub$: clearSub,
    };
    seal(manager);
    return manager;
};

// <docs markdown="../readme.md#pauseContainer">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#pauseContainer instead)
/**
 * Serialize the current state of the application into DOM
 *
 * @alpha
 */
// </docs>
const pauseContainer = async (elmOrDoc, defaultParentJSON) => {
    const doc = getDocument(elmOrDoc);
    const documentElement = doc.documentElement;
    const containerEl = isDocument(elmOrDoc) ? documentElement : elmOrDoc;
    if (directGetAttribute(containerEl, QContainerAttr) === 'paused') {
        throw qError(QError_containerAlreadyPaused);
    }
    const parentJSON = defaultParentJSON ?? (containerEl === doc.documentElement ? doc.body : containerEl);
    const data = await pauseFromContainer(containerEl);
    const script = doc.createElement('script');
    directSetAttribute(script, 'type', 'qwik/json');
    script.textContent = escapeText(JSON.stringify(data.state, undefined, qDev ? '  ' : undefined));
    parentJSON.appendChild(script);
    directSetAttribute(containerEl, QContainerAttr, 'paused');
    return data;
};
const moveStyles = (containerEl, containerState) => {
    const head = containerEl.ownerDocument.head;
    containerEl.querySelectorAll('style[q\\:style]').forEach((el) => {
        containerState.$styleIds$.add(directGetAttribute(el, QStyle));
        head.appendChild(el);
    });
};
const resumeContainer = (containerEl) => {
    if (!isContainer(containerEl)) {
        logWarn('Skipping hydration because parent element is not q:container');
        return;
    }
    const doc = getDocument(containerEl);
    const isDocElement = containerEl === doc.documentElement;
    const parentJSON = isDocElement ? doc.body : containerEl;
    const script = getQwikJSON(parentJSON);
    if (!script) {
        logWarn('Skipping hydration qwik/json metadata was not found.');
        return;
    }
    script.remove();
    const containerState = getContainerState(containerEl);
    moveStyles(containerEl, containerState);
    const meta = JSON.parse(unescapeText(script.textContent || '{}'));
    // Collect all elements
    const elements = new Map();
    const getObject = (id) => {
        return getObjectImpl(id, elements, meta.objs, containerState);
    };
    let maxId = 0;
    getNodesInScope(containerEl, hasQId).forEach((el) => {
        const id = directGetAttribute(el, ELEMENT_ID);
        assertDefined(id, `resume: element missed q:id`, el);
        const ctx = getContext(el);
        ctx.$id$ = id;
        ctx.$mounted$ = true;
        elements.set(ELEMENT_ID_PREFIX + id, el);
        maxId = Math.max(maxId, strToInt(id));
    });
    containerState.$elementIndex$ = ++maxId;
    const parser = createParser(getObject, containerState, doc);
    // Revive proxies with subscriptions into the proxymap
    reviveValues(meta.objs, meta.subs, getObject, containerState, parser);
    // Rebuild target objects
    for (const obj of meta.objs) {
        reviveNestedObjects(obj, getObject, parser);
    }
    Object.entries(meta.ctx).forEach(([elementID, ctxMeta]) => {
        const el = getObject(elementID);
        assertDefined(el, `resume: cant find dom node for id`, elementID);
        const ctx = getContext(el);
        const qobj = ctxMeta.r;
        const seq = ctxMeta.s;
        const host = ctxMeta.h;
        const contexts = ctxMeta.c;
        const watches = ctxMeta.w;
        if (qobj) {
            assertTrue(isElement(el), 'el must be an actual DOM element');
            ctx.$refMap$.push(...qobj.split(' ').map(getObject));
            ctx.li = getDomListeners(ctx, containerEl);
        }
        if (seq) {
            ctx.$seq$ = seq.split(' ').map(getObject);
        }
        if (watches) {
            ctx.$watches$ = watches.split(' ').map(getObject);
        }
        if (contexts) {
            contexts.split(' ').map((part) => {
                const [key, value] = part.split('=');
                if (!ctx.$contexts$) {
                    ctx.$contexts$ = new Map();
                }
                ctx.$contexts$.set(key, getObject(value));
            });
        }
        // Restore sequence scoping
        if (host) {
            const [props, renderQrl] = host.split(' ');
            assertDefined(props, `resume: props missing in host metadata`, host);
            assertDefined(renderQrl, `resume: renderQRL missing in host metadata`, host);
            ctx.$props$ = getObject(props);
            ctx.$renderQrl$ = getObject(renderQrl);
        }
    });
    directSetAttribute(containerEl, QContainerAttr, 'resumed');
    logDebug('Container resumed');
    emitEvent(containerEl, 'qresume', undefined, true);
};
const pauseFromContainer = async (containerEl) => {
    const containerState = getContainerState(containerEl);
    const contexts = getNodesInScope(containerEl, hasQId).map(tryGetContext);
    return _pauseFromContexts(contexts, containerState);
};
/**
 * @internal
 */
const _pauseFromContexts = async (elements, containerState) => {
    const elementToIndex = new Map();
    const collector = createCollector(containerState);
    const listeners = [];
    for (const ctx of elements) {
        const el = ctx.$element$;
        if (isElement(el)) {
            Object.entries(ctx.li).forEach(([key, qrls]) => {
                qrls.forEach((qrl) => {
                    listeners.push({
                        key,
                        qrl,
                        el,
                    });
                });
            });
        }
        if (ctx.$watches$) {
            for (const watch of ctx.$watches$) {
                collector.$watches$.push(watch);
            }
        }
    }
    // No listeners implies static page
    if (listeners.length === 0) {
        return {
            state: {
                ctx: {},
                objs: [],
                subs: [],
            },
            objs: [],
            listeners: [],
            pendingContent: [],
            mode: 'static',
        };
    }
    // Listeners becomes the app roots
    for (const listener of listeners) {
        assertQrl(listener.qrl);
        const captured = listener.qrl.$captureRef$;
        if (captured) {
            for (const obj of captured) {
                await collectValue(obj, collector, true);
            }
        }
        const ctx = tryGetContext(listener.el);
        for (const obj of ctx.$refMap$) {
            await collectValue(obj, collector, true);
        }
    }
    // If at this point any component can render, we need to capture Context and Props
    const canRender = collector.$elements$.length > 0;
    if (canRender) {
        for (const ctx of elements) {
            if (isVirtualElement(ctx.$element$)) {
                await collectProps(ctx.$element$, ctx.$props$, collector);
            }
            if (ctx.$contexts$) {
                for (const item of ctx.$contexts$.values()) {
                    await collectValue(item, collector, false);
                }
            }
        }
    }
    // Convert objSet to array
    const objs = Array.from(new Set(collector.$objMap$.values()));
    const objToId = new Map();
    const getElementID = (el) => {
        let id = elementToIndex.get(el);
        if (id === undefined) {
            if (el.isConnected) {
                id = getQId(el);
                if (!id) {
                    console.warn('Missing ID', el);
                }
                else {
                    id = ELEMENT_ID_PREFIX + id;
                }
            }
            else {
                id = null;
            }
            elementToIndex.set(el, id);
        }
        return id;
    };
    const getObjId = (obj) => {
        let suffix = '';
        if (isMutable(obj)) {
            obj = obj.v;
            suffix = '%';
        }
        if (isPromise(obj)) {
            const { value, resolved } = getPromiseValue(obj);
            obj = value;
            if (resolved) {
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
            if (!target && isQwikElement(obj)) {
                const elID = getElementID(obj);
                if (elID) {
                    return elID + suffix;
                }
                return null;
            }
        }
        if (collector.$objMap$.has(obj)) {
            const value = collector.$objMap$.get(obj);
            const id = objToId.get(value);
            assertTrue(typeof id === 'number', 'Can not find ID for object');
            return intToStr(id) + suffix;
        }
        return null;
    };
    const mustGetObjId = (obj) => {
        const key = getObjId(obj);
        if (key === null) {
            throw qError(QError_missingObjectId, obj);
        }
        return key;
    };
    // Compute subscriptions
    const subsMap = new Map();
    objs.forEach((obj) => {
        const flags = getProxyFlags(containerState.$proxyMap$.get(obj));
        if (flags === undefined) {
            return;
        }
        const subsObj = [];
        if (flags > 0) {
            subsObj.push({
                subscriber: '$',
                data: flags,
            });
        }
        const subs = containerState.$subsManager$.$tryGetLocal$(obj)?.$subs$;
        if (subs) {
            subs.forEach((set, key) => {
                if (isNode(key) && isVirtualElement(key)) {
                    if (!collector.$elements$.includes(key)) {
                        return;
                    }
                }
                subsObj.push({
                    subscriber: key,
                    data: set ? Array.from(set) : null,
                });
            });
        }
        if (subsObj.length > 0) {
            subsMap.set(obj, subsObj);
        }
    });
    // Sort objects: the ones with subscriptions go first
    objs.sort((a, b) => {
        const isProxyA = subsMap.has(a) ? 0 : 1;
        const isProxyB = subsMap.has(b) ? 0 : 1;
        return isProxyA - isProxyB;
    });
    // Generate object ID by using a monotonic counter
    let count = 0;
    for (const obj of objs) {
        objToId.set(obj, count);
        count++;
    }
    // Serialize object subscriptions
    const subs = objs
        .map((obj) => {
        const sub = subsMap.get(obj);
        if (!sub) {
            return null;
        }
        const subsObj = {};
        sub.forEach(({ subscriber, data }) => {
            if (subscriber === '$') {
                subsObj[subscriber] = data;
            }
            else {
                const id = getObjId(subscriber);
                if (id !== null) {
                    subsObj[id] = data;
                }
            }
        });
        return subsObj;
    })
        .filter(isNotNullable);
    // Serialize objects
    const convertedObjs = objs.map((obj) => {
        if (obj === null) {
            return null;
        }
        const typeObj = typeof obj;
        switch (typeObj) {
            case 'undefined':
                return UNDEFINED_PREFIX;
            case 'string':
            case 'number':
            case 'boolean':
                return obj;
            default:
                const value = serializeValue(obj, getObjId, containerState);
                if (value !== undefined) {
                    return value;
                }
                if (typeObj === 'object') {
                    if (isArray(obj)) {
                        return obj.map(mustGetObjId);
                    }
                    if (isSerializableObject(obj)) {
                        const output = {};
                        Object.entries(obj).forEach(([key, value]) => {
                            output[key] = mustGetObjId(value);
                        });
                        return output;
                    }
                }
                break;
        }
        throw qError(QError_verifySerializable, obj);
    });
    const meta = {};
    // Write back to the dom
    elements.forEach((ctx) => {
        const node = ctx.$element$;
        assertDefined(ctx, `pause: missing context for dom node`, node);
        const ref = ctx.$refMap$;
        const props = ctx.$props$;
        const contexts = ctx.$contexts$;
        const watches = ctx.$watches$;
        const renderQrl = ctx.$renderQrl$;
        const seq = ctx.$seq$;
        const metaValue = {};
        const elementCaptured = isVirtualElement(node) && collector.$elements$.includes(node);
        let add = false;
        if (ref.length > 0) {
            const value = ref.map(mustGetObjId).join(' ');
            if (value) {
                metaValue.r = value;
                add = true;
            }
        }
        if (canRender) {
            if (elementCaptured && props) {
                const objs = [props];
                if (renderQrl) {
                    objs.push(renderQrl);
                }
                const value = objs.map(mustGetObjId).join(' ');
                if (value) {
                    metaValue.h = value;
                    add = true;
                }
            }
            if (watches && watches.length > 0) {
                const value = watches.map(getObjId).filter(isNotNullable).join(' ');
                if (value) {
                    metaValue.w = value;
                    add = true;
                }
            }
            if (elementCaptured && seq && seq.length > 0) {
                const value = seq.map(mustGetObjId).join(' ');
                if (value) {
                    metaValue.s = value;
                    add = true;
                }
            }
            if (contexts) {
                const serializedContexts = [];
                contexts.forEach((value, key) => {
                    serializedContexts.push(`${key}=${mustGetObjId(value)}`);
                });
                const value = serializedContexts.join(' ');
                if (value) {
                    metaValue.c = value;
                    add = true;
                }
            }
        }
        if (add) {
            const elementID = getElementID(node);
            assertDefined(elementID, `pause: can not generate ID for dom node`, node);
            meta[elementID] = metaValue;
        }
    });
    const pendingContent = [];
    for (const watch of collector.$watches$) {
        if (qDev) {
            if (watch.$flags$ & WatchFlagsIsDirty) {
                logWarn('Serializing dirty watch. Looks like an internal error.');
            }
            if (!isConnected(watch)) {
                logWarn('Serializing disconneted watch. Looks like an internal error.');
            }
        }
        destroyWatch(watch);
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
            ctx: meta,
            objs: convertedObjs,
            subs,
        },
        pendingContent,
        objs,
        listeners,
        mode: canRender ? 'render' : 'listeners',
    };
};
const getQwikJSON = (parentElm) => {
    let child = parentElm.lastElementChild;
    while (child) {
        if (child.tagName === 'SCRIPT' && directGetAttribute(child, 'type') === 'qwik/json') {
            return child;
        }
        child = child.previousElementSibling;
    }
    return undefined;
};
const SHOW_ELEMENT = 1;
const SHOW_COMMENT = 128;
const FILTER_ACCEPT = 1;
const FILTER_REJECT = 2;
const FILTER_SKIP = 3;
const getNodesInScope = (parent, predicate) => {
    if (predicate(parent)) ;
    const walker = parent.ownerDocument.createTreeWalker(parent, SHOW_ELEMENT | SHOW_COMMENT, {
        acceptNode(node) {
            if (isContainer(node)) {
                return FILTER_REJECT;
            }
            return predicate(node) ? FILTER_ACCEPT : FILTER_SKIP;
        },
    });
    const pars = [];
    let currentNode = null;
    while ((currentNode = walker.nextNode())) {
        pars.push(processVirtualNodes(currentNode));
    }
    return pars;
};
const reviveValues = (objs, subs, getObject, containerState, parser) => {
    for (let i = 0; i < objs.length; i++) {
        const value = objs[i];
        if (isString(value)) {
            objs[i] = value === UNDEFINED_PREFIX ? undefined : parser.prepare(value);
        }
    }
    for (let i = 0; i < subs.length; i++) {
        const value = objs[i];
        const sub = subs[i];
        if (sub) {
            const converted = new Map();
            let flags = 0;
            Object.entries(sub).forEach((entry) => {
                if (entry[0] === '$') {
                    flags = entry[1];
                    return;
                }
                const el = getObject(entry[0]);
                if (!el) {
                    logWarn('QWIK can not revive subscriptions because of missing element ID', entry, value);
                    return;
                }
                const set = entry[1] === null ? null : new Set(entry[1]);
                converted.set(el, set);
            });
            createProxy(value, containerState, flags, converted);
        }
    }
};
const reviveNestedObjects = (obj, getObject, parser) => {
    if (parser.fill(obj)) {
        return;
    }
    if (obj && typeof obj == 'object') {
        if (isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                const value = obj[i];
                if (typeof value == 'string') {
                    obj[i] = getObject(value);
                }
                else {
                    reviveNestedObjects(value, getObject, parser);
                }
            }
        }
        else if (isSerializableObject(obj)) {
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    if (typeof value == 'string') {
                        obj[key] = getObject(value);
                    }
                    else {
                        reviveNestedObjects(value, getObject, parser);
                    }
                }
            }
        }
    }
};
const OBJECT_TRANSFORMS = {
    '!': (obj, containerState) => {
        return containerState.$proxyMap$.get(obj) ?? getOrCreateProxy(obj, containerState);
    },
    '%': (obj) => {
        return mutable(obj);
    },
    '~': (obj) => {
        return Promise.resolve(obj);
    },
    _: (obj) => {
        return Promise.reject(obj);
    },
};
const getObjectImpl = (id, elements, objs, containerState) => {
    assertTrue(typeof id === 'string' && id.length > 0, 'resume: id must be an non-empty string, got:', id);
    if (id.startsWith(ELEMENT_ID_PREFIX)) {
        assertTrue(elements.has(id), `missing element for id:`, id);
        return elements.get(id);
    }
    const index = strToInt(id);
    assertTrue(objs.length > index, 'resume: index is out of bounds', id);
    let obj = objs[index];
    for (let i = id.length - 1; i >= 0; i--) {
        const code = id[i];
        const transform = OBJECT_TRANSFORMS[code];
        if (!transform) {
            break;
        }
        obj = transform(obj, containerState);
    }
    return obj;
};
const collectProps = async (el, props, collector) => {
    const subs = collector.$containerState$.$subsManager$.$tryGetLocal$(getProxyTarget(props))?.$subs$;
    if (subs && subs.has(el)) {
        // The host element read the props
        await collectElement(el, collector);
    }
};
const createCollector = (containerState) => {
    return {
        $seen$: new Set(),
        $seenLeaks$: new Set(),
        $objMap$: new Map(),
        $elements$: [],
        $watches$: [],
        $containerState$: containerState,
    };
};
const collectElement = async (el, collector) => {
    if (collector.$elements$.includes(el)) {
        return;
    }
    const ctx = tryGetContext(el);
    if (ctx) {
        collector.$elements$.push(el);
        if (ctx.$props$) {
            await collectValue(ctx.$props$, collector, false);
        }
        if (ctx.$renderQrl$) {
            await collectValue(ctx.$renderQrl$, collector, false);
        }
        if (ctx.$seq$) {
            for (const obj of ctx.$seq$) {
                await collectValue(obj, collector, false);
            }
        }
        if (ctx.$watches$) {
            for (const obj of ctx.$watches$) {
                await collectValue(obj, collector, false);
            }
        }
        if (ctx.$contexts$) {
            for (const obj of ctx.$contexts$.values()) {
                await collectValue(obj, collector, false);
            }
        }
    }
};
const escapeText = (str) => {
    return str.replace(/<(\/?script)/g, '\\x3C$1');
};
const unescapeText = (str) => {
    return str.replace(/\\x3C(\/?script)/g, '<$1');
};
const collectSubscriptions = async (target, collector) => {
    const subs = collector.$containerState$.$subsManager$.$tryGetLocal$(target)?.$subs$;
    if (subs) {
        if (collector.$seen$.has(subs)) {
            return;
        }
        collector.$seen$.add(subs);
        for (const key of Array.from(subs.keys())) {
            if (isNode(key) && isVirtualElement(key)) {
                await collectElement(key, collector);
            }
            else {
                await collectValue(key, collector, true);
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
    assertTrue(PROMISE_VALUE in promise, 'pause: promise was not resolved previously', promise);
    return promise[PROMISE_VALUE];
};
const collectValue = async (obj, collector, leaks) => {
    const input = obj;
    const seen = leaks ? collector.$seenLeaks$ : collector.$seen$;
    if (seen.has(obj)) {
        return;
    }
    seen.add(obj);
    if (!shouldSerialize(obj) || obj === undefined) {
        collector.$objMap$.set(obj, undefined);
        return;
    }
    if (obj != null) {
        // Handle QRL
        if (isQrl(obj)) {
            collector.$objMap$.set(obj, obj);
            if (obj.$captureRef$) {
                for (const item of obj.$captureRef$) {
                    await collectValue(item, collector, leaks);
                }
            }
            return;
        }
        // Handle Objets
        if (typeof obj === 'object') {
            // Handle promises
            if (isPromise(obj)) {
                const value = await resolvePromise(obj);
                await collectValue(value, collector, leaks);
                return;
            }
            const target = getProxyTarget(obj);
            // Handle dom nodes
            if (!target && isNode(obj)) {
                if (isDocument(obj)) {
                    collector.$objMap$.set(obj, obj);
                }
                else if (!isQwikElement(obj)) {
                    throw qError(QError_verifySerializable, obj);
                }
                return;
            }
            // If proxy collect subscriptions
            if (target) {
                if (leaks) {
                    await collectSubscriptions(target, collector);
                }
                obj = target;
                if (seen.has(obj)) {
                    return;
                }
                seen.add(obj);
                if (isResourceReturn(obj)) {
                    collector.$objMap$.set(target, target);
                    await collectValue(obj.promise, collector, leaks);
                    await collectValue(obj.resolved, collector, leaks);
                    return;
                }
            }
            collector.$objMap$.set(obj, obj);
            if (isArray(obj)) {
                for (let i = 0; i < obj.length; i++) {
                    await collectValue(input[i], collector, leaks);
                }
            }
            else {
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        await collectValue(input[key], collector, leaks);
                    }
                }
            }
            return;
        }
    }
    collector.$objMap$.set(obj, obj);
};
const isContainer = (el) => {
    return isElement(el) && el.hasAttribute(QContainerAttr);
};
const hasQId = (el) => {
    const node = processVirtualNodes(el);
    if (isQwikElement(node)) {
        return node.hasAttribute(ELEMENT_ID);
    }
    return false;
};
const intToStr = (nu) => {
    return nu.toString(36);
};
const strToInt = (nu) => {
    return parseInt(nu, 36);
};

const WatchFlagsIsEffect = 1 << 0;
const WatchFlagsIsWatch = 1 << 1;
const WatchFlagsIsDirty = 1 << 2;
const WatchFlagsIsCleanup = 1 << 3;
const WatchFlagsIsResource = 1 << 4;
// <docs markdown="../readme.md#useWatch">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useWatch instead)
/**
 * Reruns the `watchFn` when the observed inputs change.
 *
 * Use `useWatch` to observe changes on a set of inputs, and then re-execute the `watchFn` when
 * those inputs change.
 *
 * The `watchFn` only executes if the observed inputs change. To observe the inputs, use the
 * `obs` function to wrap property reads. This creates subscriptions that will trigger the
 * `watchFn` to rerun.
 *
 * @see `Tracker`
 *
 * @public
 *
 * ## Example
 *
 * The `useWatch` function is used to observe the `state.count` property. Any changes to the
 * `state.count` cause the `watchFn` to execute which in turn updates the `state.doubleCount` to
 * the double of `state.count`.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     count: 0,
 *     doubleCount: 0,
 *     debounced: 0,
 *   });
 *
 *   // Double count watch
 *   useWatch$(({ track }) => {
 *     const count = track(store, 'count');
 *     store.doubleCount = 2 * count;
 *   });
 *
 *   // Debouncer watch
 *   useWatch$(({ track }) => {
 *     const doubleCount = track(store, 'doubleCount');
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
 * @param watch - Function which should be re-executed when changes to the inputs are detected
 * @public
 */
// </docs>
const useWatchQrl = (qrl, opts) => {
    const { get, set, ctx, i } = useSequentialScope();
    if (get) {
        return;
    }
    assertQrl(qrl);
    const el = ctx.$hostElement$;
    const containerState = ctx.$renderCtx$.$static$.$containerState$;
    const watch = new Watch(WatchFlagsIsDirty | WatchFlagsIsWatch, i, el, qrl, undefined);
    const elCtx = getContext(el);
    set(true);
    qrl.$resolveLazy$();
    if (!elCtx.$watches$) {
        elCtx.$watches$ = [];
    }
    elCtx.$watches$.push(watch);
    waitAndRun(ctx, () => runSubscriber(watch, containerState));
    if (isServer(ctx)) {
        useRunWatch(watch, opts?.eagerness);
    }
};
// <docs markdown="../readme.md#useWatch">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useWatch instead)
/**
 * Reruns the `watchFn` when the observed inputs change.
 *
 * Use `useWatch` to observe changes on a set of inputs, and then re-execute the `watchFn` when
 * those inputs change.
 *
 * The `watchFn` only executes if the observed inputs change. To observe the inputs, use the
 * `obs` function to wrap property reads. This creates subscriptions that will trigger the
 * `watchFn` to rerun.
 *
 * @see `Tracker`
 *
 * @public
 *
 * ## Example
 *
 * The `useWatch` function is used to observe the `state.count` property. Any changes to the
 * `state.count` cause the `watchFn` to execute which in turn updates the `state.doubleCount` to
 * the double of `state.count`.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     count: 0,
 *     doubleCount: 0,
 *     debounced: 0,
 *   });
 *
 *   // Double count watch
 *   useWatch$(({ track }) => {
 *     const count = track(store, 'count');
 *     store.doubleCount = 2 * count;
 *   });
 *
 *   // Debouncer watch
 *   useWatch$(({ track }) => {
 *     const doubleCount = track(store, 'doubleCount');
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
 * @param watch - Function which should be re-executed when changes to the inputs are detected
 * @public
 */
// </docs>
const useWatch$ = /*#__PURE__*/ implicit$FirstArg(useWatchQrl);
// <docs markdown="../readme.md#useClientEffect">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useClientEffect instead)
/**
 * ```tsx
 * const Timer = component$(() => {
 *   const store = useStore({
 *     count: 0,
 *   });
 *
 *   useClientEffect$(() => {
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
const useClientEffectQrl = (qrl, opts) => {
    const { get, set, i, ctx } = useSequentialScope();
    if (get) {
        return;
    }
    assertQrl(qrl);
    const el = ctx.$hostElement$;
    const watch = new Watch(WatchFlagsIsEffect, i, el, qrl, undefined);
    const eagerness = opts?.eagerness ?? 'visible';
    const elCtx = getContext(el);
    set(true);
    if (!elCtx.$watches$) {
        elCtx.$watches$ = [];
    }
    elCtx.$watches$.push(watch);
    useRunWatch(watch, eagerness);
    if (!isServer(ctx)) {
        qrl.$resolveLazy$();
        notifyWatch(watch, ctx.$renderCtx$.$static$.$containerState$);
    }
};
// <docs markdown="../readme.md#useClientEffect">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useClientEffect instead)
/**
 * ```tsx
 * const Timer = component$(() => {
 *   const store = useStore({
 *     count: 0,
 *   });
 *
 *   useClientEffect$(() => {
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
const useClientEffect$ = /*#__PURE__*/ implicit$FirstArg(useClientEffectQrl);
// <docs markdown="../readme.md#useServerMount">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useServerMount instead)
/**
 * Register's a server mount hook that runs only in the server when the component is first
 * mounted.
 *
 * ## Example
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     users: [],
 *   });
 *
 *   useServerMount$(async () => {
 *     // This code will ONLY run once in the server, when the component is mounted
 *     store.users = await db.requestUsers();
 *   });
 *
 *   return (
 *     <div>
 *       {store.users.map((user) => (
 *         <User user={user} />
 *       ))}
 *     </div>
 *   );
 * });
 *
 * interface User {
 *   name: string;
 * }
 * function User(props: { user: User }) {
 *   return <div>Name: {props.user.name}</div>;
 * }
 * ```
 *
 * @see `useMount`
 * @public
 */
// </docs>
const useServerMountQrl = (mountQrl) => {
    const { get, set, ctx } = useSequentialScope();
    if (get) {
        return;
    }
    if (isServer(ctx)) {
        waitAndRun(ctx, mountQrl);
        set(true);
    }
    else {
        throw qError(QError_canNotMountUseServerMount, ctx.$hostElement$);
    }
};
// <docs markdown="../readme.md#useServerMount">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useServerMount instead)
/**
 * Register's a server mount hook that runs only in the server when the component is first
 * mounted.
 *
 * ## Example
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     users: [],
 *   });
 *
 *   useServerMount$(async () => {
 *     // This code will ONLY run once in the server, when the component is mounted
 *     store.users = await db.requestUsers();
 *   });
 *
 *   return (
 *     <div>
 *       {store.users.map((user) => (
 *         <User user={user} />
 *       ))}
 *     </div>
 *   );
 * });
 *
 * interface User {
 *   name: string;
 * }
 * function User(props: { user: User }) {
 *   return <div>Name: {props.user.name}</div>;
 * }
 * ```
 *
 * @see `useMount`
 * @public
 */
// </docs>
const useServerMount$ = /*#__PURE__*/ implicit$FirstArg(useServerMountQrl);
// <docs markdown="../readme.md#useMount">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useMount instead)
/**
 * Register a server mount hook that runs only in the server when the component is first mounted.
 *
 * ## Example
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     temp: 0,
 *   });
 *
 *   useMount$(async () => {
 *     // This code will run once whenever a component is mounted in the server, or in the client
 *     const res = await fetch('weather-api.example');
 *     const json = (await res.json()) as any;
 *     store.temp = json.temp;
 *   });
 *
 *   return (
 *     <div>
 *       <p>The temperature is: ${store.temp}</p>
 *     </div>
 *   );
 * });
 * ```
 *
 * @see `useServerMount`
 * @public
 */
// </docs>
const useMountQrl = (mountQrl) => {
    const { get, set, ctx } = useSequentialScope();
    if (get) {
        return;
    }
    assertQrl(mountQrl);
    mountQrl.$resolveLazy$();
    waitAndRun(ctx, mountQrl);
    set(true);
};
// <docs markdown="../readme.md#useMount">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useMount instead)
/**
 * Register a server mount hook that runs only in the server when the component is first mounted.
 *
 * ## Example
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     temp: 0,
 *   });
 *
 *   useMount$(async () => {
 *     // This code will run once whenever a component is mounted in the server, or in the client
 *     const res = await fetch('weather-api.example');
 *     const json = (await res.json()) as any;
 *     store.temp = json.temp;
 *   });
 *
 *   return (
 *     <div>
 *       <p>The temperature is: ${store.temp}</p>
 *     </div>
 *   );
 * });
 * ```
 *
 * @see `useServerMount`
 * @public
 */
// </docs>
const useMount$ = /*#__PURE__*/ implicit$FirstArg(useMountQrl);
const isResourceWatch = (watch) => {
    return !!watch.$resource$;
};
const runSubscriber = async (watch, containerState) => {
    assertEqual(!!(watch.$flags$ & WatchFlagsIsDirty), true, 'Resource is not dirty', watch);
    if (isResourceWatch(watch)) {
        await runResource(watch, containerState);
    }
    else {
        await runWatch(watch, containerState);
    }
};
const runResource = (watch, containerState, waitOn) => {
    watch.$flags$ &= ~WatchFlagsIsDirty;
    cleanupWatch(watch);
    const el = watch.$el$;
    const doc = getDocument(el);
    const invokationContext = newInvokeContext(doc, el, undefined, 'WatchEvent');
    const { $subsManager$: subsManager } = containerState;
    const watchFn = watch.$qrl$.getFn(invokationContext, () => {
        subsManager.$clearSub$(watch);
    });
    const cleanups = [];
    const resource = watch.$resource$;
    assertDefined(resource, 'useResource: when running a resource, "watch.r" must be a defined.', watch);
    const track = (obj, prop) => {
        const target = getProxyTarget(obj);
        if (target) {
            const manager = subsManager.$getLocal$(target);
            manager.$addSub$(watch, prop);
        }
        else {
            logErrorAndStop(codeToText(QError_trackUseStore), obj);
        }
        if (prop) {
            return obj[prop];
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
        previous: resourceTarget.resolved,
    };
    let resolve;
    let reject;
    let done = false;
    const setState = (resolved, value) => {
        if (!done) {
            done = true;
            if (resolved) {
                done = true;
                resource.state = 'resolved';
                resource.resolved = value;
                resource.error = undefined;
                resolve(value);
            }
            else {
                done = true;
                resource.state = 'rejected';
                resource.resolved = undefined;
                resource.error = value;
                reject(value);
            }
            return true;
        }
        return false;
    };
    // Execute mutation inside empty invokation
    invoke(invokationContext, () => {
        resource.state = 'pending';
        resource.resolved = undefined;
        resource.promise = new Promise((r, re) => {
            resolve = r;
            reject = re;
        });
    });
    watch.$destroy$ = noSerialize(() => {
        cleanups.forEach((fn) => fn());
    });
    const promise = safeCall(() => then(waitOn, () => watchFn(opts)), (value) => {
        setState(true, value);
    }, (reason) => {
        setState(false, reason);
    });
    const timeout = resourceTarget.timeout;
    if (timeout) {
        return Promise.race([
            promise,
            delay(timeout).then(() => {
                if (setState(false, 'timeout')) {
                    cleanupWatch(watch);
                }
            }),
        ]);
    }
    return promise;
};
const runWatch = (watch, containerState) => {
    watch.$flags$ &= ~WatchFlagsIsDirty;
    cleanupWatch(watch);
    const el = watch.$el$;
    const doc = getDocument(el);
    const invokationContext = newInvokeContext(doc, el, undefined, 'WatchEvent');
    const { $subsManager$: subsManager } = containerState;
    const watchFn = watch.$qrl$.getFn(invokationContext, () => {
        subsManager.$clearSub$(watch);
    });
    const track = (obj, prop) => {
        const target = getProxyTarget(obj);
        if (target) {
            const manager = subsManager.$getLocal$(target);
            manager.$addSub$(watch, prop);
        }
        else {
            logErrorAndStop(codeToText(QError_trackUseStore), obj);
        }
        if (prop) {
            return obj[prop];
        }
        else {
            return obj;
        }
    };
    const cleanups = [];
    watch.$destroy$ = noSerialize(() => {
        cleanups.forEach((fn) => fn());
    });
    const opts = {
        track,
        cleanup(callback) {
            cleanups.push(callback);
        },
    };
    return safeCall(() => watchFn(opts), (returnValue) => {
        if (isFunction(returnValue)) {
            cleanups.push(returnValue);
        }
    }, (reason) => {
        logError(reason);
    });
};
const cleanupWatch = (watch) => {
    const destroy = watch.$destroy$;
    if (destroy) {
        watch.$destroy$ = undefined;
        try {
            destroy();
        }
        catch (err) {
            logError(err);
        }
    }
};
const destroyWatch = (watch) => {
    if (watch.$flags$ & WatchFlagsIsCleanup) {
        watch.$flags$ &= ~WatchFlagsIsCleanup;
        const cleanup = watch.$qrl$;
        cleanup();
    }
    else {
        cleanupWatch(watch);
    }
};
const useRunWatch = (watch, eagerness) => {
    if (eagerness === 'load') {
        useOn('qinit', getWatchHandlerQrl(watch));
    }
    else if (eagerness === 'visible') {
        useOn('qvisible', getWatchHandlerQrl(watch));
    }
};
const getWatchHandlerQrl = (watch) => {
    const watchQrl = watch.$qrl$;
    const watchHandler = createQRL(watchQrl.$chunk$, '_hW', _hW, null, null, [watch], watchQrl.$symbol$);
    return watchHandler;
};
const isSubscriberDescriptor = (obj) => {
    return isObject(obj) && obj instanceof Watch;
};
const serializeWatch = (watch, getObjId) => {
    let value = `${intToStr(watch.$flags$)} ${intToStr(watch.$index$)} ${getObjId(watch.$qrl$)} ${getObjId(watch.$el$)}`;
    if (isResourceWatch(watch)) {
        value += ` ${getObjId(watch.$resource$)}`;
    }
    return value;
};
const parseWatch = (data) => {
    const [flags, index, qrl, el, resource] = data.split(' ');
    return new Watch(strToInt(flags), strToInt(index), el, qrl, resource);
};
class Watch {
    constructor($flags$, $index$, $el$, $qrl$, $resource$) {
        this.$flags$ = $flags$;
        this.$index$ = $index$;
        this.$el$ = $el$;
        this.$qrl$ = $qrl$;
        this.$resource$ = $resource$;
    }
}

/**
 * @public
 */
const useResourceQrl = (qrl, opts) => {
    const { get, set, i, ctx } = useSequentialScope();
    if (get != null) {
        return get;
    }
    assertQrl(qrl);
    const containerState = ctx.$renderCtx$.$static$.$containerState$;
    const resource = createResourceReturn(containerState, opts);
    const el = ctx.$hostElement$;
    const watch = new Watch(WatchFlagsIsDirty | WatchFlagsIsResource, i, el, qrl, resource);
    const previousWait = Promise.all(ctx.$waitOn$.slice());
    const elCtx = getContext(el);
    runResource(watch, containerState, previousWait);
    if (!elCtx.$watches$) {
        elCtx.$watches$ = [];
    }
    elCtx.$watches$.push(watch);
    set(resource);
    return resource;
};
/**
 * @public
 */
const useResource$ = (generatorFn, opts) => {
    return useResourceQrl($(generatorFn), opts);
};
/**
 * @public
 */
const Resource = (props) => {
    const isBrowser = !qDev || !useIsServer();
    if (isBrowser) {
        if (props.onRejected) {
            props.value.promise.catch(() => { });
            if (props.value.state === 'rejected') {
                return props.onRejected(props.value.error);
            }
        }
        if (props.onPending) {
            const state = props.value.state;
            if (state === 'pending') {
                return props.onPending();
            }
            else if (state === 'resolved') {
                return props.onResolved(props.value.resolved);
            }
        }
    }
    const promise = props.value.promise.then(useBindInvokeContext(props.onResolved), useBindInvokeContext(props.onRejected));
    // if (isServer) {
    //   const onPending = props.onPending;
    //   if (props.ssrWait && onPending) {
    //     promise = Promise.race([
    //       delay(props.ssrWait).then(() => {
    //         getInternalResource(props.resource).dirty = true;
    //         return onPending();
    //       }),
    //       promise,
    //     ]);
    //   }
    // }
    // Resource path
    return jsx(Fragment, {
        children: promise,
    });
};
const _createResourceReturn = (opts) => {
    const resource = {
        __brand: 'resource',
        promise: undefined,
        resolved: undefined,
        error: undefined,
        state: 'pending',
        timeout: opts?.timeout,
    };
    return resource;
};
const createResourceReturn = (containerState, opts, initialPromise) => {
    const result = _createResourceReturn(opts);
    result.promise = initialPromise;
    const resource = createProxy(result, containerState, 0, undefined);
    return resource;
};
const useIsServer = () => {
    const ctx = getInvokeContext();
    return isServer(ctx);
};
const isResourceReturn = (obj) => {
    return isObject(obj) && obj.__brand === 'resource';
};
const serializeResource = (resource, getObjId) => {
    const state = resource.state;
    if (state === 'resolved') {
        return `0 ${getObjId(resource.resolved)}`;
    }
    else if (state === 'pending') {
        return `1`;
    }
    else {
        return `2 ${getObjId(resource.error)}`;
    }
};
const parseResourceReturn = (data) => {
    const [first, id] = data.split(' ');
    const result = _createResourceReturn(undefined);
    result.promise = Promise.resolve();
    if (first === '0') {
        result.state = 'resolved';
        result.resolved = id;
    }
    else if (first === '1') {
        result.state = 'pending';
        result.promise = new Promise(() => { });
    }
    else if (first === '2') {
        result.state = 'rejected';
        result.error = id;
    }
    return result;
};

/**
 * 0, 8, 9, A, B, C, D
\0: null character (U+0000 NULL) (only if the next character is not a decimal digit; else it’s an octal escape sequence)
\b: backspace (U+0008 BACKSPACE)
\t: horizontal tab (U+0009 CHARACTER TABULATION)
\n: line feed (U+000A LINE FEED)
\v: vertical tab (U+000B LINE TABULATION)
\f: form feed (U+000C FORM FEED)
\r: carriage return (U+000D CARRIAGE RETURN)
\": double quote (U+0022 QUOTATION MARK)
\': single quote (U+0027 APOSTROPHE)
\\: backslash (U+005C REVERSE SOLIDUS)
 */
const UNDEFINED_PREFIX = '\u0001';
const QRLSerializer = {
    prefix: '\u0002',
    test: (v) => isQrl(v),
    serialize: (obj, getObjId, containerState) => {
        return stringifyQRL(obj, {
            $platform$: containerState.$platform$,
            $getObjId$: getObjId,
        });
    },
    prepare: (data, containerState) => {
        return parseQRL(data, containerState.$containerEl$);
    },
    fill: (qrl, getObject) => {
        if (qrl.$capture$ && qrl.$capture$.length > 0) {
            qrl.$captureRef$ = qrl.$capture$.map(getObject);
            qrl.$capture$ = null;
        }
    },
};
const WatchSerializer = {
    prefix: '\u0003',
    test: (v) => isSubscriberDescriptor(v),
    serialize: (obj, getObjId) => serializeWatch(obj, getObjId),
    prepare: (data) => parseWatch(data),
    fill: (watch, getObject) => {
        watch.$el$ = getObject(watch.$el$);
        watch.$qrl$ = getObject(watch.$qrl$);
        if (watch.$resource$) {
            watch.$resource$ = getObject(watch.$resource$);
        }
    },
};
const ResourceSerializer = {
    prefix: '\u0004',
    test: (v) => isResourceReturn(v),
    serialize: (obj, getObjId) => {
        return serializeResource(obj, getObjId);
    },
    prepare: (data) => {
        return parseResourceReturn(data);
    },
    fill: (resource, getObject) => {
        if (resource.state === 'resolved') {
            resource.resolved = getObject(resource.resolved);
            resource.promise = Promise.resolve(resource.resolved);
        }
        else if (resource.state === 'rejected') {
            const p = Promise.reject(resource.error);
            p.catch(() => null);
            resource.error = getObject(resource.error);
            resource.promise = p;
        }
    },
};
const URLSerializer = {
    prefix: '\u0005',
    test: (v) => v instanceof URL,
    serialize: (obj) => obj.href,
    prepare: (data) => new URL(data),
    fill: undefined,
};
const DateSerializer = {
    prefix: '\u0006',
    test: (v) => v instanceof Date,
    serialize: (obj) => obj.toISOString(),
    prepare: (data) => new Date(data),
    fill: undefined,
};
const RegexSerializer = {
    prefix: '\u0007',
    test: (v) => v instanceof RegExp,
    serialize: (obj) => `${obj.flags} ${obj.source}`,
    prepare: (data) => {
        const space = data.indexOf(' ');
        const source = data.slice(space + 1);
        const flags = data.slice(0, space);
        return new RegExp(source, flags);
    },
    fill: undefined,
};
const ErrorSerializer = {
    prefix: '\u000E',
    test: (v) => v instanceof Error,
    serialize: (obj) => {
        return obj.message;
    },
    prepare: (text) => {
        const err = new Error(text);
        err.stack = undefined;
        return err;
    },
    fill: undefined,
};
const DocumentSerializer = {
    prefix: '\u000F',
    test: (v) => isDocument(v),
    serialize: undefined,
    prepare: (_, _c, doc) => {
        return doc;
    },
    fill: undefined,
};
const SERIALIZABLE_STATE = Symbol('serializable-data');
const ComponentSerializer = {
    prefix: '\u0010',
    test: (obj) => isQwikComponent(obj),
    serialize: (obj, getObjId, containerState) => {
        const [qrl] = obj[SERIALIZABLE_STATE];
        return stringifyQRL(qrl, {
            $platform$: containerState.$platform$,
            $getObjId$: getObjId,
        });
    },
    prepare: (data, containerState) => {
        const optionsIndex = data.indexOf('{');
        const qrlString = optionsIndex == -1 ? data : data.slice(0, optionsIndex);
        const qrl = parseQRL(qrlString, containerState.$containerEl$);
        return componentQrl(qrl);
    },
    fill: (component, getObject) => {
        const [qrl] = component[SERIALIZABLE_STATE];
        if (qrl.$capture$ && qrl.$capture$.length > 0) {
            qrl.$captureRef$ = qrl.$capture$.map(getObject);
            qrl.$capture$ = null;
        }
    },
};
const PureFunctionSerializer = {
    prefix: '\u0011',
    test: (obj) => typeof obj === 'function' && obj.__qwik_serializable__ !== undefined,
    serialize: (obj) => {
        return obj.toString();
    },
    prepare: (data) => {
        const fn = new Function('return ' + data)();
        fn.__qwik_serializable__ = true;
        return fn;
    },
    fill: undefined,
};
const serializers = [
    QRLSerializer,
    WatchSerializer,
    ResourceSerializer,
    URLSerializer,
    DateSerializer,
    RegexSerializer,
    ErrorSerializer,
    DocumentSerializer,
    ComponentSerializer,
    PureFunctionSerializer,
];
const canSerialize = (obj) => {
    for (const s of serializers) {
        if (s.test(obj)) {
            return true;
        }
    }
    return false;
};
const serializeValue = (obj, getObjID, containerState) => {
    for (const s of serializers) {
        if (s.test(obj)) {
            let value = s.prefix;
            if (s.serialize) {
                value += s.serialize(obj, getObjID, containerState);
            }
            return value;
        }
    }
    return undefined;
};
const createParser = (getObject, containerState, doc) => {
    const map = new Map();
    return {
        prepare(data) {
            for (const s of serializers) {
                const prefix = s.prefix;
                if (data.startsWith(prefix)) {
                    const value = s.prepare(data.slice(prefix.length), containerState, doc);
                    if (s.fill) {
                        map.set(value, s);
                    }
                    return value;
                }
            }
            return data;
        },
        fill(obj) {
            const serializer = map.get(obj);
            if (serializer) {
                serializer.fill(obj, getObject, containerState);
                return true;
            }
            return false;
        },
    };
};

const QObjectRecursive = 1 << 0;
const QObjectImmutable = 1 << 1;
/**
 * Creates a proxy that notifies of any writes.
 */
const getOrCreateProxy = (target, containerState, flags = 0) => {
    const proxy = containerState.$proxyMap$.get(target);
    if (proxy) {
        return proxy;
    }
    return createProxy(target, containerState, flags, undefined);
};
const createProxy = (target, containerState, flags, subs) => {
    assertEqual(unwrapProxy(target), target, 'Unexpected proxy at this location', target);
    assertTrue(!containerState.$proxyMap$.has(target), 'Proxy was already created', target);
    if (!isObject(target)) {
        throw qError(QError_onlyObjectWrapped, target);
    }
    if (target.constructor !== Object && !isArray(target)) {
        throw qError(QError_onlyLiteralWrapped, target);
    }
    const manager = containerState.$subsManager$.$getLocal$(target, subs);
    const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager, flags));
    containerState.$proxyMap$.set(target, proxy);
    return proxy;
};
const QOjectTargetSymbol = Symbol();
const QOjectFlagsSymbol = Symbol();
class ReadWriteProxyHandler {
    constructor($containerState$, $manager$, $flags$) {
        this.$containerState$ = $containerState$;
        this.$manager$ = $manager$;
        this.$flags$ = $flags$;
    }
    get(target, prop) {
        if (typeof prop === 'symbol') {
            if (prop === QOjectTargetSymbol)
                return target;
            if (prop === QOjectFlagsSymbol)
                return this.$flags$;
            return target[prop];
        }
        let subscriber;
        const invokeCtx = tryGetInvokeContext();
        const recursive = (this.$flags$ & QObjectRecursive) !== 0;
        const immutable = (this.$flags$ & QObjectImmutable) !== 0;
        if (invokeCtx) {
            subscriber = invokeCtx.$subscriber$;
        }
        let value = target[prop];
        if (isMutable(value)) {
            value = value.v;
        }
        else if (immutable) {
            subscriber = null;
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
        const immutable = (this.$flags$ & QObjectImmutable) !== 0;
        if (immutable) {
            throw qError(QError_immutableProps);
        }
        const recursive = (this.$flags$ & QObjectRecursive) !== 0;
        const unwrappedNewValue = recursive ? unwrapProxy(newValue) : newValue;
        if (qDev) {
            verifySerializable(unwrappedNewValue);
            const invokeCtx = tryGetInvokeContext();
            if (invokeCtx && invokeCtx.$event$ === RenderEvent) {
                logWarn('State mutation inside render function. Move mutation to useWatch(), useClientEffect() or useServerMount()', invokeCtx.$hostElement$, prop);
            }
        }
        const isA = isArray(target);
        if (isA) {
            target[prop] = unwrappedNewValue;
            this.$manager$.$notifySubs$();
            return true;
        }
        const oldValue = target[prop];
        if (oldValue !== unwrappedNewValue) {
            target[prop] = unwrappedNewValue;
            this.$manager$.$notifySubs$(prop);
        }
        return true;
    }
    has(target, property) {
        if (property === QOjectTargetSymbol)
            return true;
        if (property === QOjectFlagsSymbol)
            return true;
        return Object.prototype.hasOwnProperty.call(target, property);
    }
    ownKeys(target) {
        let subscriber = null;
        const invokeCtx = tryGetInvokeContext();
        if (invokeCtx) {
            subscriber = invokeCtx.$subscriber$;
        }
        if (subscriber) {
            this.$manager$.$addSub$(subscriber);
        }
        return Object.getOwnPropertyNames(target);
    }
}
const wrap = (value, containerState) => {
    if (isQrl(value)) {
        return value;
    }
    if (isObject(value)) {
        if (Object.isFrozen(value)) {
            return value;
        }
        const nakedValue = unwrapProxy(value);
        if (nakedValue !== value) {
            // already a proxy return;
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
        const proxy = containerState.$proxyMap$.get(value);
        return proxy ? proxy : getOrCreateProxy(value, containerState, QObjectRecursive);
    }
    else {
        return value;
    }
};
const verifySerializable = (value) => {
    const seen = new Set();
    return _verifySerializable(value, seen);
};
const _verifySerializable = (value, seen) => {
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
        switch (typeof unwrapped) {
            case 'object':
                if (isPromise(unwrapped))
                    return value;
                if (isQwikElement(unwrapped))
                    return value;
                if (isDocument(unwrapped))
                    return value;
                if (isArray(unwrapped)) {
                    for (const item of unwrapped) {
                        _verifySerializable(item, seen);
                    }
                    return value;
                }
                if (isSerializableObject(unwrapped)) {
                    for (const item of Object.values(unwrapped)) {
                        _verifySerializable(item, seen);
                    }
                    return value;
                }
                break;
            case 'boolean':
            case 'string':
            case 'number':
                return value;
        }
        throw qError(QError_verifySerializable, unwrapped);
    }
    return value;
};
const noSerializeSet = /*#__PURE__*/ new WeakSet();
const shouldSerialize = (obj) => {
    if (isObject(obj) || isFunction(obj)) {
        return !noSerializeSet.has(obj);
    }
    return true;
};
// <docs markdown="../readme.md#noSerialize">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#noSerialize instead)
/**
 * Marks a property on a store as non-serializable.
 *
 * At times it is necessary to store values on a store that are non-serializable. Normally this
 * is a runtime error as Store wants to eagerly report when a non-serializable property is
 * assigned to it.
 *
 * You can use `noSerialize()` to mark a value as non-serializable. The value is persisted in the
 * Store but does not survive serialization. The implication is that when your application is
 * resumed, the value of this object will be `undefined`. You will be responsible for recovering
 * from this.
 *
 * See: [noSerialize Tutorial](http://qwik.builder.io/tutorial/store/no-serialize)
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
// <docs markdown="../readme.md#mutable">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#mutable instead)
/**
 * Mark property as mutable.
 *
 * Qwik assumes that all bindings in components are immutable by default. This is done for two
 * reasons:
 *
 * 1. JSX does not allow Qwik runtime to know if a binding is static or mutable.
 *    `<Example valueA={123} valueB={exp}>` At runtime there is no way to know if `valueA` is
 * immutable.
 * 2. If Qwik assumes that properties are immutable, then it can do a better job data-shaking the
 * amount of code that needs to be serialized to the client.
 *
 * Because Qwik assumes that bindings are immutable by default, it needs a way for a developer to
 * let it know that binding is mutable. `mutable()` function serves that purpose.
 * `<Example valueA={123} valueB={mutable(exp)}>`. In this case, the Qwik runtime can correctly
 * recognize that the `Example` props are mutable and need to be serialized.
 *
 * See: [Mutable Props Tutorial](http://qwik.builder.io/tutorial/props/mutable) for an example
 *
 * @alpha
 */
// </docs>
const mutable = (v) => {
    return {
        [MUTABLE]: true,
        v,
    };
};
const isConnected = (sub) => {
    if (isQwikElement(sub)) {
        return !!tryGetContext(sub) || sub.isConnected;
    }
    else {
        return isConnected(sub.$el$);
    }
};
const MUTABLE = Symbol('mutable');
const isMutable = (v) => {
    return isObject(v) && v[MUTABLE] === true;
};
/**
 * @alpha
 */
const unwrapProxy = (proxy) => {
    return getProxyTarget(proxy) ?? proxy;
};
const getProxyTarget = (obj) => {
    if (isObject(obj)) {
        return obj[QOjectTargetSymbol];
    }
    return undefined;
};
const getProxyFlags = (obj) => {
    if (isObject(obj)) {
        return obj[QOjectFlagsSymbol];
    }
    return undefined;
};

const Q_CTX = '_qc_';
const resumeIfNeeded = (containerEl) => {
    const isResumed = directGetAttribute(containerEl, QContainerAttr);
    if (isResumed === 'paused') {
        resumeContainer(containerEl);
        if (qDev) {
            appendQwikDevTools(containerEl);
        }
    }
};
const appendQwikDevTools = (containerEl) => {
    containerEl['qwik'] = {
        pause: () => pauseContainer(containerEl),
        state: getContainerState(containerEl),
    };
};
const tryGetContext = (element) => {
    return element[Q_CTX];
};
const getContext = (element) => {
    let ctx = tryGetContext(element);
    if (!ctx) {
        element[Q_CTX] = ctx = {
            $dirty$: false,
            $mounted$: false,
            $attachedListeners$: false,
            $id$: '',
            $element$: element,
            $refMap$: [],
            li: {},
            $watches$: null,
            $seq$: null,
            $slots$: null,
            $scopeIds$: null,
            $appendStyles$: null,
            $props$: null,
            $vdom$: null,
            $renderQrl$: null,
            $contexts$: null,
        };
    }
    return ctx;
};
const cleanupContext = (ctx, subsManager) => {
    const el = ctx.$element$;
    ctx.$watches$?.forEach((watch) => {
        subsManager.$clearSub$(watch);
        destroyWatch(watch);
    });
    if (ctx.$renderQrl$) {
        subsManager.$clearSub$(el);
    }
    ctx.$renderQrl$ = null;
    ctx.$seq$ = null;
    ctx.$watches$ = null;
    ctx.$dirty$ = false;
    el[Q_CTX] = undefined;
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
    return scope + ":" + prop;
};
const createProps = (target, containerState) => {
    return createProxy(target, containerState, QObjectImmutable);
};
const getPropsMutator = (ctx, containerState) => {
    let props = ctx.$props$;
    if (!ctx.$props$) {
        ctx.$props$ = props = createProps({}, containerState);
    }
    const target = getProxyTarget(props);
    assertDefined(target, `props have to be a proxy, but it is not`, props);
    const manager = containerState.$subsManager$.$getLocal$(target);
    return {
        set(prop, value) {
            const didSet = prop in target;
            let oldValue = target[prop];
            let mut = false;
            if (isMutable(oldValue)) {
                oldValue = oldValue.v;
            }
            if (containerState.$mutableProps$) {
                mut = true;
                if (isMutable(value)) {
                    value = value.v;
                    target[prop] = value;
                }
                else {
                    target[prop] = mutable(value);
                }
            }
            else {
                target[prop] = value;
                if (isMutable(value)) {
                    value = value.v;
                    mut = true;
                }
            }
            if (oldValue !== value) {
                if (qDev) {
                    if (didSet && !mut && !isQrl(value)) {
                        const displayName = ctx.$renderQrl$?.getSymbol() ?? ctx.$element$.localName;
                        logError(codeToText(QError_immutableJsxProps), `If you need to change a value of a passed in prop, please wrap the prop with "mutable()" <${displayName} ${prop}={mutable(...)}>`, '\n - Component:', displayName, '\n - Prop:', prop, '\n - Old value:', oldValue, '\n - New value:', value);
                    }
                }
                manager.$notifySubs$(prop);
            }
        },
    };
};
/**
 * @internal
 */
const _useMutableProps = (element, mutable) => {
    const ctx = getWrappingContainer(element);
    getContainerState(ctx).$mutableProps$ = mutable;
};
const inflateQrl = (qrl, elCtx) => {
    assertDefined(qrl.$capture$, 'invoke: qrl capture must be defined inside useLexicalScope()', qrl);
    return qrl.$captureRef$ = qrl.$capture$.map((idx) => {
        const int = parseInt(idx, 10);
        const obj = elCtx.$refMap$[int];
        assertTrue(elCtx.$refMap$.length > int, 'out of bounds inflate access', idx);
        return obj;
    });
};

const STYLE = qDev
    ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;`
    : '';
const logError = (message, ...optionalParams) => {
    const err = message instanceof Error ? message : new Error(message);
    // eslint-disable-next-line no-console
    console.error('%cQWIK ERROR', STYLE, err.message, ...printParams(optionalParams), err.stack);
    return err;
};
const logErrorAndStop = (message, ...optionalParams) => {
    const err = logError(message, ...optionalParams);
    // eslint-disable-next-line no-debugger
    debugger;
    return err;
};
const logWarn = (message, ...optionalParams) => {
    // eslint-disable-next-line no-console
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
const printParams = (optionalParams) => {
    if (qDev) {
        return optionalParams.map((p) => {
            if (isNode$1(p) && isElement(p)) {
                return printElement(p);
            }
            return p;
        });
    }
    return optionalParams;
};
const printElement = (el) => {
    const ctx = tryGetContext(el);
    const isServer = /*#__PURE__*/ (() => typeof process !== 'undefined' && !!process.versions && !!process.versions.node)();
    return {
        tagName: el.tagName,
        renderQRL: ctx?.$renderQrl$?.getSymbol(),
        element: isServer ? undefined : el,
        ctx: isServer ? undefined : ctx,
    };
};

const QError_stringifyClassOrStyle = 0;
const QError_runtimeQrlNoElement = 2; // `Q-ERROR: '${qrl}' is runtime but no instance found on element.`
const QError_verifySerializable = 3; // 'Only primitive and object literals can be serialized', value,
const QError_errorWhileRendering = 4; // Crash while rendering
const QError_cannotRenderOverExistingContainer = 5; //'You can render over a existing q:container. Skipping render().'
const QError_setProperty = 6; //'Set property'
const QError_onlyObjectWrapped = 8;
const QError_onlyLiteralWrapped = 9;
const QError_qrlIsNotFunction = 10;
const QError_dynamicImportFailed = 11;
const QError_unknownTypeArgument = 12;
const QError_notFoundContext = 13;
const QError_useMethodOutsideContext = 14;
const QError_immutableProps = 17;
const QError_immutableJsxProps = 19;
const QError_useInvokeContext = 20;
const QError_containerAlreadyPaused = 21;
const QError_canNotMountUseServerMount = 22;
const QError_invalidJsxNodeType = 25;
const QError_trackUseStore = 26;
const QError_missingObjectId = 27;
const QError_invalidContext = 28;
const QError_canNotRenderHTML = 29;
const qError = (code, ...parts) => {
    const text = codeToText(code);
    return logErrorAndStop(text, ...parts);
};
const codeToText = (code) => {
    if (qDev) {
        const MAP = [
            'Error while serializing class attribute',
            'Can not serialize a HTML Node that is not an Element',
            'Rruntime but no instance found on element.',
            'Only primitive and object literals can be serialized',
            'Crash while rendering',
            'You can render over a existing q:container. Skipping render().',
            'Set property',
            "Only function's and 'string's are supported.",
            "Only objects can be wrapped in 'QObject'",
            `Only objects literals can be wrapped in 'QObject'`,
            'QRL is not a function',
            'Dynamic import not found',
            'Unknown type argument',
            'Actual value for useContext() can not be found, make sure some ancestor component has set a value using useContextProvider()',
            "Invoking 'use*()' method outside of invocation context.",
            'Cant access renderCtx for existing context',
            'Cant access document for existing context',
            'props are inmutable',
            '<div> component can only be used at the root of a Qwik component$()',
            'Props are immutable by default.',
            'use- method must be called only at the root level of a component$()',
            'Container is already paused. Skipping',
            'Components using useServerMount() can only be mounted in the server, if you need your component to be mounted in the client, use "useMount$()" instead',
            'When rendering directly on top of Document, the root node must be a <html>',
            'A <html> node must have 2 children. The first one <head> and the second one a <body>',
            'Invalid JSXNode type. It must be either a function or a string. Found:',
            'Tracking value changes can only be done to useStore() objects and component props',
            'Missing Object ID for captured object',
            'The provided Context reference is not a valid context created by createContext()',
            '<html> is the root container, it can not be rendered inside a component', // 29
        ];
        return `Code(${code}): ${MAP[code] ?? ''}`;
    }
    else {
        return `Code(${code})`;
    }
};

const isQrl = (value) => {
    return typeof value === 'function' && typeof value.getSymbol === 'function';
};
const createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
    if (qDev) {
        verifySerializable(captureRef);
    }
    let containerEl;
    const setContainer = (el) => {
        if (!containerEl) {
            containerEl = el;
        }
    };
    const resolve = async () => {
        if (symbolRef) {
            return symbolRef;
        }
        if (symbolFn) {
            return (symbolRef = symbolFn().then((module) => (symbolRef = module[symbol])));
        }
        else {
            if (!containerEl) {
                throw new Error(`QRL '${chunk}#${symbol || 'default'}' does not have an attached container`);
            }
            const symbol2 = getPlatform(containerEl).importSymbol(containerEl, chunk, symbol);
            return (symbolRef = then(symbol2, (ref) => {
                return (symbolRef = ref);
            }));
        }
    };
    const resolveLazy = () => {
        return isFunction(symbolRef) ? symbolRef : resolve();
    };
    const invokeFn = (currentCtx, beforeFn) => {
        return ((...args) => {
            const fn = resolveLazy();
            return then(fn, (fn) => {
                if (isFunction(fn)) {
                    if (beforeFn && beforeFn() === false) {
                        return;
                    }
                    const baseContext = createInvokationContext(currentCtx);
                    const context = {
                        ...baseContext,
                        $qrl$: QRL,
                    };
                    return invoke(context, fn, ...args);
                }
                throw qError(QError_qrlIsNotFunction);
            });
        });
    };
    const createInvokationContext = (invoke) => {
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
    const invokeQRL = async function (...args) {
        const fn = invokeFn();
        const result = await fn(...args);
        return result;
    };
    const resolvedSymbol = refSymbol ?? symbol;
    const hash = getSymbolHash(resolvedSymbol);
    const QRL = invokeQRL;
    const methods = {
        getSymbol: () => resolvedSymbol,
        getHash: () => hash,
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
    };
    const qrl = Object.assign(invokeQRL, methods);
    seal(qrl);
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

let runtimeSymbolId = 0;
const RUNTIME_QRL = '/runtimeQRL';
const INLINED_QRL = '/inlinedQRL';
// https://regexr.com/68v72
const EXTRACT_IMPORT_PATH = /\(\s*(['"])([^\1]+)\1\s*\)/;
// https://regexr.com/690ds
const EXTRACT_SELF_IMPORT = /Promise\s*\.\s*resolve/;
// https://regexr.com/6a83h
const EXTRACT_FILE_NAME = /[\\/(]([\w\d.\-_]+\.(js|ts)x?):/;
const QRLcache = new Map();
// <docs markdown="../readme.md#qrl">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#qrl instead)
/**
 * Used by Qwik Optimizer to point to lazy-loaded resources.
 *
 * This function should be used by the Qwik Optimizer only. The function should not be directly
 * referred to in the source code of the application.
 *
 * @see `QRL`, `$(...)`
 *
 * @param chunkOrFn - Chunk name (or function which is stringified to extract chunk name)
 * @param symbol - Symbol to lazy load
 * @param lexicalScopeCapture - a set of lexically scoped variables to capture.
 * @alpha
 */
// </docs>
const qrl = (chunkOrFn, symbol, lexicalScopeCapture = EMPTY_ARRAY) => {
    let chunk = '';
    let symbolFn = null;
    if (isString(chunkOrFn)) {
        chunk = chunkOrFn;
    }
    else if (isFunction(chunkOrFn)) {
        symbolFn = chunkOrFn;
        const cached = QRLcache.get(symbol);
        if (!qDev && cached) {
            chunk = cached;
        }
        else {
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
                throw qError(QError_dynamicImportFailed, srcCode);
            }
            QRLcache.set(symbol, chunk);
        }
    }
    else {
        throw qError(QError_unknownTypeArgument, chunkOrFn);
    }
    // Unwrap subscribers
    return createQRL(chunk, symbol, null, symbolFn, null, lexicalScopeCapture, null);
};
const runtimeQrl = (symbol, lexicalScopeCapture = EMPTY_ARRAY) => {
    return createQRL(RUNTIME_QRL, 's' + runtimeSymbolId++, symbol, null, null, lexicalScopeCapture, null);
};
/**
 * @alpha
 */
const inlinedQrl = (symbol, symbolName, lexicalScopeCapture = EMPTY_ARRAY) => {
    // Unwrap subscribers
    return createQRL(INLINED_QRL, symbolName, symbol, null, null, lexicalScopeCapture, null);
};
const stringifyQRL = (qrl, opts = {}) => {
    assertQrl(qrl);
    let symbol = qrl.$symbol$;
    let chunk = qrl.$chunk$;
    const refSymbol = qrl.$refSymbol$ ?? symbol;
    const platform = opts.$platform$;
    const element = opts.$element$;
    if (platform) {
        const result = platform.chunkForSymbol(refSymbol);
        if (result) {
            chunk = result[1];
            if (!qrl.$refSymbol$) {
                symbol = result[0];
            }
        }
    }
    if (chunk.startsWith('./')) {
        chunk = chunk.slice(2);
    }
    const parts = [chunk];
    if (symbol && symbol !== 'default') {
        if (chunk === RUNTIME_QRL && qTest) {
            symbol = '_';
        }
        parts.push('#', symbol);
    }
    const capture = qrl.$capture$;
    const captureRef = qrl.$captureRef$;
    if (captureRef && captureRef.length) {
        if (opts.$getObjId$) {
            const capture = captureRef.map(opts.$getObjId$);
            parts.push(`[${capture.join(' ')}]`);
        }
        else if (opts.$addRefMap$) {
            const capture = captureRef.map(opts.$addRefMap$);
            parts.push(`[${capture.join(' ')}]`);
        }
    }
    else if (capture && capture.length > 0) {
        parts.push(`[${capture.join(' ')}]`);
    }
    const qrlString = parts.join('');
    if (qrl.$chunk$ === RUNTIME_QRL && element) {
        const qrls = element.__qrls__ || (element.__qrls__ = new Set());
        qrls.add(qrl);
    }
    return qrlString;
};
const serializeQRLs = (existingQRLs, elCtx) => {
    assertTrue(isElement$1(elCtx.$element$), 'Element must be an actual element');
    const opts = {
        $platform$: getPlatform(elCtx.$element$),
        $element$: elCtx.$element$,
        $addRefMap$: (obj) => addToArray(elCtx.$refMap$, obj),
    };
    return existingQRLs.map((qrl) => stringifyQRL(qrl, opts)).join('\n');
};
/**
 * `./chunk#symbol[captures]
 */
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
    if (chunk === RUNTIME_QRL) {
        logError(codeToText(QError_runtimeQrlNoElement), qrl);
    }
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
        return array.length - 1;
    }
    return index;
};

// <docs markdown="../readme.md#$">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#$ instead)
/**
 * Qwik Optimizer marker function.
 *
 * Use `$(...)` to tell Qwik Optimizer to extract the expression in `$(...)` into a lazy-loadable
 * resource referenced by `QRL`.
 *
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
 * import { importedFn } from './import/example';
 * import { createContext, useContext, useContextProvider } from './use/use-context';
 * import { useRef } from './use/use-ref';
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
const $ = (expression) => {
    return runtimeQrl(expression);
};

// const ELEMENTS_SKIP_KEY: JSXTagName[] = ['html', 'body', 'head'];
// <docs markdown="../readme.md#component">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#component instead)
/**
 * Declare a Qwik component that can be used to create UI.
 *
 * Use `component$` to declare a Qwik component. A Qwik component is a special kind of component
 * that allows the Qwik framework to lazy load and execute the component independently of other
 * Qwik components as well as lazy load the component's life-cycle hooks and event handlers.
 *
 * Side note: You can also declare regular (standard JSX) components that will have standard
 * synchronous behavior.
 *
 * Qwik component is a facade that describes how the component should be used without forcing the
 * implementation of the component to be eagerly loaded. A minimum Qwik definition consists of:
 *
 * ### Example:
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
const componentQrl = (onRenderQrl) => {
    // Return a QComponent Factory function.
    function QwikComponent(props, key) {
        assertQrl(onRenderQrl);
        const hash = qTest ? 'sX' : onRenderQrl.$hash$;
        const finalKey = hash + ':' + (key ? key : '');
        return jsx(Virtual, { [OnRenderProp]: onRenderQrl, ...props }, finalKey);
    }
    QwikComponent[SERIALIZABLE_STATE] = [onRenderQrl];
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
 * that allows the Qwik framework to lazy load and execute the component independently of other
 * Qwik components as well as lazy load the component's life-cycle hooks and event handlers.
 *
 * Side note: You can also declare regular (standard JSX) components that will have standard
 * synchronous behavior.
 *
 * Qwik component is a facade that describes how the component should be used without forcing the
 * implementation of the component to be eagerly loaded. A minimum Qwik definition consists of:
 *
 * ### Example:
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
    const name = props.name ?? '';
    return jsx(Virtual, {
        [QSlotS]: '',
    }, name);
};

/**
 * QWIK_VERSION
 * @public
 */
const version = "0.0.107";

/**
 * Render JSX.
 *
 * Use this method to render JSX. This function does reconciling which means
 * it always tries to reuse what is already in the DOM (rather then destroy and
 * recreate content.)
 *
 * @param parent - Element which will act as a parent to `jsxNode`. When
 *     possible the rendering will try to reuse existing nodes.
 * @param jsxNode - JSX to render
 * @alpha
 */
const render = async (parent, jsxNode, opts) => {
    // If input is not JSX, convert it
    if (!isJSXNode(jsxNode)) {
        jsxNode = jsx(jsxNode, null);
    }
    const doc = getDocument(parent);
    const containerEl = getElement(parent);
    if (qDev && containerEl.hasAttribute(QContainerAttr)) {
        throw qError(QError_cannotRenderOverExistingContainer, containerEl);
    }
    injectQContainer(containerEl);
    const containerState = getContainerState(containerEl);
    const envData = opts?.envData;
    if (envData) {
        Object.assign(containerState.$envData$, envData);
    }
    containerState.$hostsRendering$ = new Set();
    containerState.$renderPromise$ = renderRoot$1(containerEl, jsxNode, doc, containerState, containerEl);
    const renderCtx = await containerState.$renderPromise$;
    await postRendering(containerState, renderCtx);
};
const renderRoot$1 = async (parent, jsxNode, doc, containerState, containerEl) => {
    const ctx = createRenderContext(doc, containerState);
    const staticCtx = ctx.$static$;
    // staticCtx.$roots$.push(parent as Element);
    const processedNodes = await processData$1(jsxNode);
    const rootJsx = domToVnode(parent);
    await visitJsxNode(ctx, rootJsx, wrapJSX(parent, processedNodes), 0);
    staticCtx.$operations$.push(...staticCtx.$postOperations$);
    executeDOMRender(staticCtx);
    if (qDev) {
        appendQwikDevTools(containerEl);
        printRenderStats(staticCtx);
    }
    return staticCtx;
};
const getElement = (docOrElm) => {
    return isDocument(docOrElm) ? docOrElm.documentElement : docOrElm;
};
const injectQContainer = (containerEl) => {
    directSetAttribute(containerEl, 'q:version', version ?? 'dev');
    directSetAttribute(containerEl, QContainerAttr, 'resumed');
    directSetAttribute(containerEl, 'q:render', qDev ? 'dom-dev' : 'dom');
};

const IS_HEAD = 1 << 0;
const IS_RAW_CONTENT = 1 << 1;
const IS_HTML = 1 << 2;
/**
 * @alpha
 */
const renderSSR = async (doc, node, opts) => {
    const root = opts.containerTagName;
    const containerEl = doc.createElement(root);
    const containerState = getContainerState(containerEl);
    const rctx = createRenderContext(doc, containerState);
    const headNodes = opts.beforeContent ?? [];
    const ssrCtx = {
        rctx,
        $contexts$: [],
        projectedChildren: undefined,
        projectedContext: undefined,
        hostCtx: undefined,
        invocationContext: undefined,
        headNodes: root === 'html' ? headNodes : [],
    };
    const containerAttributes = {
        ...opts.containerAttributes,
        'q:container': 'paused',
        'q:version': version ?? 'dev',
        'q:render': qDev ? 'ssr-dev' : 'ssr',
    };
    if (opts.base) {
        containerAttributes['q:base'] = opts.base;
    }
    if (opts.url) {
        containerState.$envData$['url'] = opts.url;
    }
    if (opts.envData) {
        Object.assign(containerState.$envData$, opts.envData);
    }
    if (root === 'html') {
        node = jsx(root, {
            ...containerAttributes,
            children: [node],
        });
    }
    else {
        node = jsx(root, {
            ...containerAttributes,
            children: [...(headNodes ?? []), node],
        });
    }
    containerState.$hostsRendering$ = new Set();
    containerState.$renderPromise$ = Promise.resolve().then(() => renderRoot(node, ssrCtx, opts.stream, containerState, opts));
    await containerState.$renderPromise$;
};
const renderRoot = async (node, ssrCtx, stream, containerState, opts) => {
    const beforeClose = opts.beforeClose;
    await renderNode(node, ssrCtx, stream, 0, (stream) => {
        const result = beforeClose?.(ssrCtx.$contexts$, containerState);
        if (result) {
            return processData(result, ssrCtx, stream, 0, undefined);
        }
    });
    if (qDev) {
        if (ssrCtx.headNodes.length > 0) {
            logError('Missing <head>. Global styles could not be rendered. Please render a <head> element at the root of the app');
        }
    }
    return ssrCtx.rctx.$static$;
};
const renderNodeFunction = (node, ssrCtx, stream, flags, beforeClose) => {
    const fn = node.type;
    if (fn === SSRComment) {
        stream.write(`<!--${node.props.data ?? ''}-->`);
        return;
    }
    if (fn === InternalSSRStream) {
        return renderGenerator(node, ssrCtx, stream, flags);
    }
    if (fn === Virtual) {
        const elCtx = getContext(ssrCtx.rctx.$static$.$doc$.createElement(VIRTUAL));
        return renderNodeVirtual(node, elCtx, undefined, ssrCtx, stream, flags, beforeClose);
    }
    const res = ssrCtx.invocationContext
        ? invoke(ssrCtx.invocationContext, () => node.type(node.props, node.key))
        : node.type(node.props, node.key);
    return processData(res, ssrCtx, stream, flags, beforeClose);
};
const renderGenerator = async (node, ssrCtx, stream, flags) => {
    const generator = node.props.children;
    let value;
    if (isFunction(generator)) {
        const v = generator(stream);
        if (isPromise(v)) {
            return v;
        }
        value = v;
    }
    else {
        value = generator;
    }
    for await (const chunk of value) {
        await processData(chunk, ssrCtx, stream, flags, undefined);
    }
};
const renderNodeVirtual = (node, elCtx, extraNodes, ssrCtx, stream, flags, beforeClose) => {
    const props = node.props;
    const renderQrl = props[OnRenderProp];
    if (renderQrl) {
        elCtx.$renderQrl$ = renderQrl;
        return renderSSRComponent(ssrCtx, stream, elCtx, node, flags, beforeClose);
    }
    const { children, ...attributes } = node.props;
    const isSlot = QSlotS in props;
    const key = node.key != null ? String(node.key) : null;
    if (isSlot) {
        assertDefined(ssrCtx.hostCtx?.$id$, 'hostId must be defined for a slot');
        attributes[QSlotRef] = ssrCtx.hostCtx.$id$;
    }
    if (key != null) {
        attributes['q:key'] = key;
    }
    const url = new Map(Object.entries(attributes));
    stream.write(`<!--qv ${serializeVirtualAttributes(url)}-->`);
    if (extraNodes) {
        for (const node of extraNodes) {
            renderNodeElementSync(node.type, node.props, stream);
        }
    }
    const promise = processData(props.children, ssrCtx, stream, flags);
    return then(promise, () => {
        // Fast path
        if (!isSlot && !beforeClose) {
            stream.write(CLOSE_VIRTUAL);
            return;
        }
        let promise;
        if (isSlot) {
            assertDefined(key, 'key must be defined for a slot');
            const content = ssrCtx.projectedChildren?.[key];
            if (content) {
                ssrCtx.projectedChildren[key] = undefined;
                promise = processData(content, ssrCtx.projectedContext, stream, flags);
            }
        }
        // Inject before close
        if (beforeClose) {
            promise = then(promise, () => beforeClose(stream));
        }
        return then(promise, () => {
            stream.write(CLOSE_VIRTUAL);
        });
    });
};
const CLOSE_VIRTUAL = `<!--/qv-->`;
const renderNodeElement = (node, extraAttributes, extraNodes, ssrCtx, stream, flags, beforeClose) => {
    const key = node.key != null ? String(node.key) : null;
    const props = node.props;
    const textType = node.type;
    const elCtx = getContext(ssrCtx.rctx.$static$.$doc$.createElement(node.type));
    const hasRef = 'ref' in props;
    const attributes = updateProperties(elCtx, props);
    const hostCtx = ssrCtx.hostCtx;
    if (hostCtx) {
        if (textType === 'html') {
            throw qError(QError_canNotRenderHTML);
        }
        attributes['class'] = joinClasses(hostCtx.$scopeIds$, attributes['class']);
        const cmp = hostCtx;
        if (!cmp.$attachedListeners$) {
            cmp.$attachedListeners$ = true;
            Object.entries(hostCtx.li).forEach(([eventName, qrls]) => {
                addQRLListener(elCtx.li, eventName, qrls);
            });
        }
    }
    // Reset HOST flags
    if (textType === 'head') {
        flags |= IS_HEAD;
    }
    const listeners = Object.entries(elCtx.li);
    const isHead = flags & IS_HEAD;
    if (key != null) {
        attributes['q:key'] = key;
    }
    if (hasRef || listeners.length > 0) {
        const newID = getNextIndex(ssrCtx.rctx);
        attributes[ELEMENT_ID] = newID;
        elCtx.$id$ = newID;
        ssrCtx.$contexts$.push(elCtx);
    }
    if (isHead) {
        attributes['q:head'] = '';
    }
    if (extraAttributes) {
        Object.assign(attributes, extraAttributes);
    }
    listeners.forEach(([key, value]) => {
        attributes[key] = serializeQRLs(value, elCtx);
    });
    if (renderNodeElementSync(textType, attributes, stream)) {
        return;
    }
    if (textType !== 'head') {
        flags &= ~IS_HEAD;
    }
    if (textType === 'html') {
        flags |= IS_HTML;
    }
    else {
        flags &= ~IS_HTML;
    }
    if (hasRawContent[textType]) {
        flags |= IS_RAW_CONTENT;
    }
    else {
        flags &= ~IS_RAW_CONTENT;
    }
    if (extraNodes) {
        for (const node of extraNodes) {
            renderNodeElementSync(node.type, node.props, stream);
        }
    }
    const promise = processData(props.children, ssrCtx, stream, flags);
    return then(promise, () => {
        // If head inject base styles
        if (textType === 'head') {
            ssrCtx.headNodes.forEach((node) => {
                renderNodeElementSync(node.type, node.props, stream);
            });
            ssrCtx.headNodes.length = 0;
        }
        // Fast path
        if (!beforeClose) {
            stream.write(`</${textType}>`);
            return;
        }
        // Inject before close
        return then(beforeClose(stream), () => {
            stream.write(`</${textType}>`);
        });
    });
};
const renderNodeElementSync = (tagName, attributes, stream) => {
    stream.write(`<${tagName}`);
    Object.entries(attributes).forEach(([key, value]) => {
        if (key !== 'dangerouslySetInnerHTML' && key !== 'children') {
            if (key === 'class' && !value) {
                return;
            }
            const chunk = value === '' ? ` ${key}` : ` ${key}="${escapeAttr(value)}"`;
            stream.write(chunk);
        }
    });
    stream.write(`>`);
    const empty = !!emptyElements[tagName];
    if (empty) {
        return true;
    }
    // Render innerHTML
    const innerHTML = attributes.dangerouslySetInnerHTML;
    if (innerHTML) {
        stream.write(innerHTML);
        stream.write(`</${tagName}>`);
        return true;
    }
    return false;
};
const renderSSRComponent = (ssrCtx, stream, elCtx, node, flags, beforeClose) => {
    const attributes = updateComponentProperties(ssrCtx.rctx, elCtx, node.props);
    return then(executeComponent(ssrCtx.rctx, elCtx), (res) => {
        if (!res) {
            logError('component was not rendered during SSR');
            return;
        }
        const hostElement = elCtx.$element$;
        const newCtx = res.rctx;
        let children = node.props.children;
        if (children) {
            if (isArray(children)) {
                if (children.filter(isNotNullable).length === 0) {
                    children = undefined;
                }
            }
            else {
                children = [children];
            }
        }
        const invocationContext = newInvokeContext(newCtx.$static$.$doc$, hostElement, undefined);
        invocationContext.$subscriber$ = hostElement;
        invocationContext.$renderCtx$ = newCtx;
        const projectedContext = {
            ...ssrCtx,
            rctx: newCtx,
        };
        const newSSrContext = {
            ...ssrCtx,
            projectedChildren: splitProjectedChildren(children, ssrCtx),
            projectedContext,
            rctx: newCtx,
            invocationContext,
        };
        const extraNodes = [];
        if (elCtx.$appendStyles$) {
            const isHTML = !!(flags & IS_HTML);
            const array = isHTML ? ssrCtx.headNodes : extraNodes;
            for (const style of elCtx.$appendStyles$) {
                array.push(jsx('style', {
                    [QStyle]: style.styleId,
                    dangerouslySetInnerHTML: style.content,
                }));
            }
        }
        if (elCtx.$scopeIds$) {
            for (const styleId of elCtx.$scopeIds$) {
            }
            const value = serializeSStyle(elCtx.$scopeIds$);
            if (value) {
                attributes[QScopedStyle] = value;
            }
        }
        const newID = getNextIndex(ssrCtx.rctx);
        attributes[ELEMENT_ID] = newID;
        elCtx.$id$ = newID;
        ssrCtx.$contexts$.push(elCtx);
        const processedNode = jsx(node.type, {
            ...attributes,
            children: res.node,
        }, node.key);
        newSSrContext.hostCtx = elCtx;
        return renderNodeVirtual(processedNode, elCtx, extraNodes, newSSrContext, stream, flags, (stream) => {
            return then(renderQTemplates(newSSrContext, stream), () => {
                return beforeClose?.(stream);
            });
        });
    });
};
const renderQTemplates = (ssrContext, stream) => {
    const projectedChildren = ssrContext.projectedChildren;
    if (projectedChildren) {
        const nodes = Object.keys(projectedChildren).map((slotName) => {
            const value = projectedChildren[slotName];
            if (value) {
                return jsx('q:template', {
                    [QSlot]: slotName,
                    hidden: '',
                    'aria-hidden': 'true',
                    children: value,
                });
            }
        });
        return processData(nodes, ssrContext, stream, 0, undefined);
    }
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
            slotName = child.props[QSlot] ?? '';
        }
        let array = slotMap[slotName];
        if (!array) {
            slotMap[slotName] = array = [];
        }
        array.push(child);
    }
    return slotMap;
};
const renderNode = (node, ssrCtx, stream, flags, beforeClose) => {
    if (typeof node.type === 'string') {
        return renderNodeElement(node, undefined, undefined, ssrCtx, stream, flags, beforeClose);
    }
    else {
        return renderNodeFunction(node, ssrCtx, stream, flags, beforeClose);
    }
};
const processData = (node, ssrCtx, stream, flags, beforeClose) => {
    if (node == null || typeof node === 'boolean') {
        return;
    }
    if (isJSXNode(node)) {
        return renderNode(node, ssrCtx, stream, flags, beforeClose);
    }
    else if (isPromise(node)) {
        return node.then((node) => processData(node, ssrCtx, stream, flags, beforeClose));
    }
    else if (isArray(node)) {
        node = _flatVirtualChildren(node, ssrCtx);
        return walkChildren(node, ssrCtx, stream, flags);
    }
    else if (isString(node) || typeof node === 'number') {
        if ((flags & IS_RAW_CONTENT) !== 0) {
            stream.write(String(node));
        }
        else {
            stream.write(escape(String(node)));
        }
    }
    else {
        logWarn('A unsupported value was passed to the JSX, skipping render. Value:', node);
    }
};
function walkChildren(children, ssrContext, stream, flags) {
    if (children == null) {
        return;
    }
    if (!isArray(children)) {
        return processData(children, ssrContext, stream, flags);
    }
    if (children.length === 1) {
        return processData(children[0], ssrContext, stream, flags);
    }
    if (children.length === 0) {
        return;
    }
    let currentIndex = 0;
    const buffers = [];
    return children.reduce((prevPromise, child, index) => {
        const buffer = [];
        buffers.push(buffer);
        const localStream = {
            write(chunk) {
                if (currentIndex === index) {
                    stream.write(chunk);
                }
                else {
                    buffer.push(chunk);
                }
            },
        };
        return then(processData(child, ssrContext, localStream, flags), () => {
            return then(prevPromise, () => {
                currentIndex++;
                if (buffers.length > currentIndex) {
                    buffers[currentIndex].forEach((chunk) => stream.write(chunk));
                }
            });
        });
    }, undefined);
}
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
        children.type !== SSRComment &&
        children.type !== InternalSSRStream &&
        children.type !== Virtual) {
        const fn = children.type;
        const res = ssrCtx.invocationContext
            ? invoke(ssrCtx.invocationContext, () => fn(children.props, children.key))
            : fn(children.props, children.key);
        return flatVirtualChildren(res, ssrCtx);
    }
    return children;
};
const updateProperties = (ctx, expectProps) => {
    const attributes = {};
    if (!expectProps) {
        return attributes;
    }
    const keys = Object.keys(expectProps);
    if (keys.length === 0) {
        return attributes;
    }
    const elm = ctx.$element$;
    for (const key of keys) {
        if (key === 'children' || key === OnRenderProp) {
            continue;
        }
        const newValue = expectProps[key];
        if (key === 'ref') {
            newValue.current = elm;
            continue;
        }
        // Early exit if value didnt change
        // Check of data- or aria-
        if (key.startsWith('data-') || key.startsWith('aria-')) {
            attributes[key] = newValue;
            continue;
        }
        if (isOnProp(key)) {
            setEvent(ctx.li, key, newValue);
            continue;
        }
        // Check if its an exception
        setProperty(attributes, key, newValue);
    }
    return attributes;
};
const updateComponentProperties = (rctx, ctx, expectProps) => {
    const attributes = {};
    if (!expectProps) {
        return attributes;
    }
    const keys = Object.keys(expectProps);
    if (keys.length === 0) {
        return attributes;
    }
    const qwikProps = getPropsMutator(ctx, rctx.$static$.$containerState$);
    for (const key of keys) {
        if (key === 'children' || key === OnRenderProp) {
            continue;
        }
        const newValue = expectProps[key];
        const skipProperty = ALLOWS_PROPS.includes(key);
        if (!skipProperty) {
            // Qwik props
            qwikProps.set(key, newValue);
            continue;
        }
        setProperty(attributes, key, newValue);
    }
    return attributes;
};
function setProperty(attributes, prop, value) {
    if (value != null && value !== false) {
        prop = processPropKey(prop);
        const attrValue = processPropValue(prop, value, attributes[prop]);
        if (attrValue !== null) {
            attributes[prop] = attrValue;
        }
    }
}
function processPropKey(prop) {
    if (prop === 'className') {
        return 'class';
    }
    return prop;
}
function processPropValue(prop, value, prevValue) {
    if (prop === 'class') {
        const str = joinClasses(value, prevValue);
        return str === '' ? null : str;
    }
    if (prop === 'style') {
        return stringifyStyle(value);
    }
    if (value === false || value == null) {
        return null;
    }
    if (value === true) {
        return '';
    }
    return String(value);
}
const hasRawContent = {
    style: true,
    script: true,
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
const escape = (s) => {
    return s.replace(/[&<>\u00A0]/g, (c) => {
        switch (c) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '\u00A0':
                return '&nbsp;';
            default:
                return '';
        }
    });
};
const escapeAttr = (s) => {
    const toEscape = /[&"\u00A0]/g;
    if (!toEscape.test(s)) {
        // nothing to do, fast path
        return s;
    }
    else {
        return s.replace(toEscape, (c) => {
            switch (c) {
                case '&':
                    return '&amp;';
                case '"':
                    return '&quot;';
                case '\u00A0':
                    return '&nbsp;';
                default:
                    return '';
            }
        });
    }
};

// <docs markdown="../readme.md#useStore">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useStore instead)
/**
 * Creates an object that Qwik can track across serializations.
 *
 * Use `useStore` to create a state for your application. The returned object is a proxy that has
 * a unique ID. The ID of the object is used in the `QRL`s to refer to the store.
 *
 * ## Example
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
 *   useClientEffect$(() => {
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
    const { get, set, ctx } = useSequentialScope();
    if (get != null) {
        return get;
    }
    const value = isFunction(initialState) ? initialState() : initialState;
    if (opts?.reactive === false) {
        set(value);
        return value;
    }
    else {
        const containerState = ctx.$renderCtx$.$static$.$containerState$;
        const recursive = opts?.recursive ?? false;
        const flags = recursive ? QObjectRecursive : 0;
        const newStore = createProxy(value, containerState, flags, undefined);
        set(newStore);
        return newStore;
    }
};

// <docs markdown="../readme.md#useRef">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useRef instead)
/**
 * It's a very thin wrapper around `useStore()`, including the proper type signature to be passed
 * to the `ref` property in JSX.
 *
 * ```tsx
 * export function useRef<T = Element>(current?: T): Ref<T> {
 *   return useStore({ current });
 * }
 * ```
 *
 * ## Example
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const input = useRef<HTMLInputElement>();
 *
 *   useClientEffect$(({ track }) => {
 *     const el = track(input, 'current')!;
 *     el.focus();
 *   });
 *
 *   return (
 *     <div>
 *       <input type="text" ref={input} />
 *     </div>
 *   );
 * });
 *
 * ```
 *
 * @public
 */
// </docs>
const useRef = (current) => {
    return useStore({ current });
};

// <docs markdown="../readme.md#createContext">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#createContext instead)
/**
 * Create a context ID to be used in your application.
 *
 * Context is a way to pass stores to the child components without prop-drilling.
 *
 * Use `createContext()` to create a `Context`. `Context` is just a serializable identifier for
 * the context. It is not the context value itself. See `useContextProvider()` and `useContext()`
 * for the values. Qwik needs a serializable ID for the context so that the it can track context
 * providers and consumers in a way that survives resumability.
 *
 * ## Example
 *
 * ```tsx
 * // Declare the Context type.
 * interface TodosStore {
 *   items: string[];
 * }
 * // Create a Context ID (no data is saved here.)
 * // You will use this ID to both create and retrieve the Context.
 * export const TodosContext = createContext<TodosStore>('Todos');
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
 * @param name - The name of the context.
 * @public
 */
// </docs>
const createContext = (name) => {
    return Object.freeze({
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
 * component's function. Once assign use `useContext()` in any child component to retrieve the
 * value.
 *
 * Context is a way to pass stores to the child components without prop-drilling.
 *
 * ## Example
 *
 * ```tsx
 * // Declare the Context type.
 * interface TodosStore {
 *   items: string[];
 * }
 * // Create a Context ID (no data is saved here.)
 * // You will use this ID to both create and retrieve the Context.
 * export const TodosContext = createContext<TodosStore>('Todos');
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
 * @param context - The context to assign a value to.
 * @param value - The value to assign to the context.
 * @public
 */
// </docs>
const useContextProvider = (context, newValue) => {
    const { get, set, ctx } = useSequentialScope();
    if (get) {
        return;
    }
    if (qDev) {
        validateContext(context);
    }
    const hostElement = ctx.$hostElement$;
    const hostCtx = getContext(hostElement);
    let contexts = hostCtx.$contexts$;
    if (!contexts) {
        hostCtx.$contexts$ = contexts = new Map();
    }
    if (qDev) {
        verifySerializable(newValue);
    }
    contexts.set(context.id, newValue);
    set(true);
};
// <docs markdown="../readme.md#useContext">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useContext instead)
/**
 * Retrive Context value.
 *
 * Use `useContext()` to retrieve the value of context in a component. To retrieve a value a
 * parent component needs to invoke `useContextProvider()` to assign a value.
 *
 * ## Example
 *
 * ```tsx
 * // Declare the Context type.
 * interface TodosStore {
 *   items: string[];
 * }
 * // Create a Context ID (no data is saved here.)
 * // You will use this ID to both create and retrieve the Context.
 * export const TodosContext = createContext<TodosStore>('Todos');
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
 * @param context - The context to retrieve a value from.
 * @public
 */
// </docs>
const useContext = (context) => {
    const { get, set, ctx } = useSequentialScope();
    if (get) {
        return get;
    }
    if (qDev) {
        validateContext(context);
    }
    let hostElement = ctx.$hostElement$;
    const contexts = ctx.$renderCtx$.$localStack$;
    for (let i = contexts.length - 1; i >= 0; i--) {
        const ctx = contexts[i];
        hostElement = ctx.$element$;
        if (ctx.$contexts$) {
            const found = ctx.$contexts$.get(context.id);
            if (found) {
                set(found);
                return found;
            }
        }
    }
    if (hostElement.closest) {
        const value = queryContextFromDom(hostElement, context.id);
        if (value !== undefined) {
            set(value);
            return value;
        }
    }
    throw qError(QError_notFoundContext, context.id);
};
const queryContextFromDom = (hostElement, contextId) => {
    let element = hostElement;
    while (element) {
        let node = element;
        let virtual;
        while (node && (virtual = findVirtual(node))) {
            const contexts = tryGetContext(virtual)?.$contexts$;
            if (contexts) {
                if (contexts.has(contextId)) {
                    return contexts.get(contextId);
                }
            }
            node = virtual;
        }
        element = element.parentElement;
    }
    return undefined;
};
const findVirtual = (el) => {
    let node = el;
    let stack = 1;
    while ((node = node.previousSibling)) {
        if (isComment(node)) {
            if (node.data === '/qv') {
                stack++;
            }
            else if (node.data.startsWith('qv ')) {
                stack--;
                if (stack === 0) {
                    return getVirtualElement(node);
                }
            }
        }
    }
    return null;
};
const validateContext = (context) => {
    if (!isObject(context) || typeof context.id !== 'string' || context.id.length === 0) {
        throw qError(QError_invalidContext, context);
    }
};

/**
 * @alpha
 */
function useEnvData(key, defaultValue) {
    const ctx = useInvokeContext();
    return ctx.$renderCtx$.$static$.$containerState$.$envData$[key] ?? defaultValue;
}
/**
 * @alpha
 * @deprecated Please use `useEnvData` instead.
 */
const useUserContext = useEnvData;

/* eslint-disable no-console */
const scopeStylesheet = (css, scopeId) => {
    const end = css.length;
    const out = [];
    const stack = [];
    let idx = 0;
    let lastIdx = idx;
    let mode = rule;
    let lastCh = 0;
    while (idx < end) {
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
                                insertScopingSelector(idx - 2);
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
        if (mode === pseudoGlobal || shouldNotInsertScoping())
            return;
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
        [ANY, COLON, pseudoElement, ':'],
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
        [ANY, AT, atRuleBlock, 'media', 'supports'],
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
 * @see `useStylesScoped`
 *
 * @public
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
 * @see `useStylesScoped`
 *
 * @public
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
 * @see `useStyles`
 *
 * @alpha
 */
// </docs>
const useStylesScopedQrl = (styles) => {
    _useStyles(styles, scopeStylesheet, true);
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
 * @see `useStyles`
 *
 * @alpha
 */
// </docs>
const useStylesScoped$ = /*#__PURE__*/ implicit$FirstArg(useStylesScopedQrl);
const _useStyles = (styleQrl, transform, scoped) => {
    const { get, set, ctx, i } = useSequentialScope();
    if (get) {
        return get;
    }
    const renderCtx = ctx.$renderCtx$;
    const styleId = styleKey(styleQrl, i);
    const hostElement = ctx.$hostElement$;
    const containerState = renderCtx.$static$.$containerState$;
    const elCtx = getContext(ctx.$hostElement$);
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
    if (!hasStyle(containerState, styleId)) {
        containerState.$styleIds$.add(styleId);
        ctx.$waitOn$.push(styleQrl.resolve(hostElement).then((styleText) => {
            elCtx.$appendStyles$.push({
                styleId,
                content: transform(styleText, styleId),
            });
        }));
    }
    return styleId;
};

export { $, Fragment, Resource, SSRComment, SSRStream, SSRStreamBlock, SkipRender, Slot, _hW, _pauseFromContexts, _useMutableProps, component$, componentQrl, createContext, getPlatform, h, implicit$FirstArg, inlinedQrl, jsx, jsx as jsxDEV, jsx as jsxs, mutable, noSerialize, qrl, render, renderSSR, setPlatform, useCleanup$, useCleanupQrl, useClientEffect$, useClientEffectQrl, useContext, useContextProvider, useEnvData, useLexicalScope, useMount$, useMountQrl, useOn, useOnDocument, useOnWindow, useRef, useResource$, useResourceQrl, useServerMount$, useServerMountQrl, useStore, useStyles$, useStylesQrl, useStylesScoped$, useStylesScopedQrl, useUserContext, useWatch$, useWatchQrl, version };
//# sourceMappingURL=core.mjs.map
