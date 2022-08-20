/**
 * @license
 * @builder.io/qwik 0.0.100
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
// minification can replace the `globalThis.qDev` with `false`
// which will remove all dev code within from the build
const qDev = true;
const qTest = !!globalThis.describe;

const EMPTY_ARRAY = [];
const EMPTY_OBJ = {};
if (qDev) {
    Object.freeze(EMPTY_ARRAY);
    Object.freeze(EMPTY_OBJ);
    Error.stackTraceLimit = 9999;
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
const QSlotName = 'q:sname';
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
const CONTAINER = Symbol('container');
const tryGetInvokeContext = () => {
    if (!_context) {
        const context = typeof document !== 'undefined' && document && document.__q_context__;
        if (!context) {
            return undefined;
        }
        if (isArray(context)) {
            const element = context[0];
            return (document.__q_context__ = newInvokeContext(getDocument(element), undefined, element, context[1], context[2]));
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
const newInvokeContext = (doc, hostElement, element, event, url) => {
    return {
        $seq$: 0,
        $doc$: doc,
        $hostElement$: hostElement,
        $element$: element,
        $event$: event,
        $url$: url || null,
        $qrl$: undefined,
    };
};
const getContainer = (el) => {
    let container = el[CONTAINER];
    if (!container) {
        container = el.closest(QContainerSelector);
        el[CONTAINER] = container;
    }
    return container;
};

const isNode = (value) => {
    return value && typeof value.nodeType == 'number';
};
const isDocument = (value) => {
    return value && value.nodeType === 9;
};
const isElement = (value) => {
    return isNode(value) && value.nodeType === 1;
};
const isQwikElement = (value) => {
    return isNode(value) && (value.nodeType === 1 || value.nodeType === 111);
};
const isVirtualElement = (value) => {
    return isObject(value) && value.nodeType === 111;
};

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
const toUrl = (doc, element, url) => {
    const containerEl = getContainer(element);
    const base = new URL(containerEl?.getAttribute('q:base') ?? doc.baseURI, doc.baseURI);
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
const isServer = (doc) => {
    return getPlatform(doc).isServer;
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

const ON_PROP_REGEX = /^(window:|document:|)on([A-Z]|-.).*\$$/;
const isOnProp = (prop) => {
    return ON_PROP_REGEX.test(prop);
};
const addQRLListener = (ctx, prop, input) => {
    if (!input) {
        return undefined;
    }
    const value = isArray(input) ? input.map(ensureQrl) : ensureQrl(input);
    if (!ctx.$listeners$) {
        ctx.$listeners$ = new Map();
    }
    let existingListeners = ctx.$listeners$.get(prop);
    if (!existingListeners) {
        ctx.$listeners$.set(prop, (existingListeners = []));
    }
    const newQRLs = isArray(value) ? value : [value];
    for (const value of newQRLs) {
        const cp = value.$copy$();
        cp.$setContainer$(ctx.$element$);
        // Important we modify the array as it is cached.
        for (let i = 0; i < existingListeners.length; i++) {
            const qrl = existingListeners[i];
            if (isSameQRL(qrl, cp)) {
                existingListeners.splice(i, 1);
                i--;
            }
        }
        existingListeners.push(cp);
    }
    return existingListeners;
};
const ensureQrl = (value) => {
    return isQrl(value) ? value : $(value);
};

const useSequentialScope = () => {
    const ctx = useInvokeContext();
    const i = ctx.$seq$;
    const hostElement = ctx.$hostElement$;
    const elementCtx = getContext(hostElement);
    ctx.$seq$++;
    const set = (value) => {
        if (qDev) {
            verifySerializable(value);
        }
        return (elementCtx.$seq$[i] = value);
    };
    return {
        get: elementCtx.$seq$[i],
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
 *     // Can be used to release resouces, abort network requets, stop timers...
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
        set(true);
        getContext(el).$watches$.push(watch);
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
 *     // Can be used to release resouces, abort network requets, stop timers...
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
 * have access to the JSX. Otherwise, it's adding a JSX listener in the `<div>` is a better
 * idea.
 *
 * @see `useOn`, `useOnWindow`, `useOnDocument`.
 *
 * @alpha
 */
// </docs>
const useOn = (event, eventQrl) => _useOn(`on:${event}`, eventQrl);
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
const useOnDocument = (event, eventQrl) => _useOn(`on-document:${event}`, eventQrl);
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
const useOnWindow = (event, eventQrl) => _useOn(`on-window:${event}`, eventQrl);
const _useOn = (eventName, eventQrl) => {
    const invokeCtx = useInvokeContext();
    const ctx = getContext(invokeCtx.$hostElement$);
    assertQrl(eventQrl);
    addQRLListener(ctx, eventName, eventQrl);
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

const directSetAttribute = (el, prop, value) => {
    return el.setAttribute(prop, value);
};
const directGetAttribute = (el, prop) => {
    return el.getAttribute(prop);
};

const fromCamelToKebabCase = (text) => {
    return text.replace(/([A-Z])/g, '-$1').toLowerCase();
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
    return new JSXNodeImpl(type, props, key);
};
const HOST_TYPE = ':host';
const SKIP_RENDER_TYPE = ':skipRender';
const VIRTUAL_TYPE = ':virtual';
class JSXNodeImpl {
    constructor(type, props, key = null) {
        this.type = type;
        this.props = props;
        this.key = key;
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

/**
 * @alpha
 */
const SkipRerender = ((props) => props.children);
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

const executeComponent = (rctx, ctx) => {
    ctx.$dirty$ = false;
    ctx.$mounted$ = true;
    const hostElement = ctx.$element$;
    const onRenderQRL = ctx.$renderQrl$;
    assertDefined(onRenderQRL, `render: host element to render must has a $renderQrl$:`, ctx);
    const props = ctx.$props$;
    assertDefined(props, `render: host element to render must has defined props`, ctx);
    // Component is not dirty any more
    rctx.$containerState$.$hostsStaging$.delete(hostElement);
    const newCtx = copyRenderContext(rctx);
    // Invoke render hook
    const invocatinContext = newInvokeContext(rctx.$doc$, hostElement, undefined, RenderEvent);
    invocatinContext.$subscriber$ = hostElement;
    invocatinContext.$renderCtx$ = newCtx;
    const waitOn = (invocatinContext.$waitOn$ = []);
    // Clean current subscription before render
    rctx.$containerState$.$subsManager$.$clearSub$(hostElement);
    // Resolve render function
    const onRenderFn = onRenderQRL.$invokeFn$(rctx.$containerEl$, invocatinContext);
    return safeCall(() => onRenderFn(props), (jsxNode) => {
        rctx.$hostElements$.add(hostElement);
        const waitOnPromise = promiseAll(waitOn);
        return then(waitOnPromise, () => {
            if (isFunction(jsxNode)) {
                ctx.$dirty$ = false;
                jsxNode = jsxNode();
            }
            else if (ctx.$dirty$) {
                return executeComponent(rctx, ctx);
            }
            let componentCtx = ctx.$component$;
            if (!componentCtx) {
                componentCtx = ctx.$component$ = {
                    $ctx$: ctx,
                    $slots$: [],
                    $attachedListeners$: false,
                };
            }
            componentCtx.$attachedListeners$ = false;
            componentCtx.$slots$ = [];
            newCtx.$localStack$.push(ctx);
            newCtx.$currentComponent$ = componentCtx;
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
        $doc$: doc,
        $containerState$: containerState,
        $containerEl$: containerState.$containerEl$,
        $hostElements$: new Set(),
        $operations$: [],
        $roots$: [],
        $localStack$: [],
        $currentComponent$: undefined,
        $perf$: {
            $visited$: 0,
        },
    };
    return ctx;
};
const copyRenderContext = (ctx) => {
    const newCtx = {
        ...ctx,
        $localStack$: [...ctx.$localStack$],
    };
    return newCtx;
};
const stringifyClass = (obj, oldValue) => {
    const oldParsed = parseClassAny(oldValue);
    const newParsed = parseClassAny(obj);
    return [...oldParsed.filter((s) => s.includes(ComponentStylesPrefixContent)), ...newParsed].join(' ');
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
const parseClassList = (value) => !value ? [] : value.split(parseClassListRegex);
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
    return intToStr(ctx.$containerState$.$elementIndex$++);
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
    directSetAttribute(ctx.$element$, ELEMENT_ID, id);
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
    return `${hashCode(qStyles.getHash())}-${index}`;
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

const renderComponent = (rctx, ctx, flags) => {
    const justMounted = !ctx.$mounted$;
    // TODO, serialize scopeIds
    return then(executeComponent(rctx, ctx), (res) => {
        if (res) {
            const hostElement = ctx.$element$;
            const newCtx = res.rctx;
            const invocatinContext = newInvokeContext(rctx.$doc$, hostElement);
            invocatinContext.$subscriber$ = hostElement;
            invocatinContext.$renderCtx$ = newCtx;
            if (justMounted) {
                if (ctx.$appendStyles$) {
                    for (const style of ctx.$appendStyles$) {
                        appendHeadStyle(rctx, hostElement, style);
                    }
                }
                if (ctx.$scopeIds$) {
                    const value = serializeSStyle(ctx.$scopeIds$);
                    if (value) {
                        directSetAttribute(hostElement, QScopedStyle, value);
                    }
                }
            }
            const processedJSXNode = processData$1(res.node, invocatinContext);
            return then(processedJSXNode, (processedJSXNode) => {
                return visitJsxNode(newCtx, hostElement, processedJSXNode, flags);
            });
        }
    });
};
class ProcessedJSXNodeImpl {
    constructor($type$, $props$, $children$, $key$) {
        this.$type$ = $type$;
        this.$props$ = $props$;
        this.$children$ = $children$;
        this.$key$ = $key$;
        this.$elm$ = null;
        this.$text$ = '';
    }
}
const processNode = (node, invocationContext) => {
    const key = node.key != null ? String(node.key) : null;
    let textType = '';
    if (node.type === SkipRerender) {
        textType = SKIP_RENDER_TYPE;
    }
    else if (node.type === Virtual) {
        textType = VIRTUAL_TYPE;
    }
    else if (isFunction(node.type)) {
        const res = invocationContext
            ? invoke(invocationContext, () => node.type(node.props, node.key))
            : node.type(node.props, node.key);
        return processData$1(res, invocationContext);
    }
    else if (isString(node.type)) {
        textType = node.type;
    }
    else {
        throw qError(QError_invalidJsxNodeType, node.type);
    }
    let children = EMPTY_ARRAY;
    if (node.props) {
        const mightPromise = processData$1(node.props.children, invocationContext);
        return then(mightPromise, (result) => {
            if (result !== undefined) {
                if (isArray(result)) {
                    children = result;
                }
                else {
                    children = [result];
                }
            }
            return new ProcessedJSXNodeImpl(textType, node.props, children, key);
        });
    }
    return new ProcessedJSXNodeImpl(textType, node.props, children, key);
};
const processData$1 = (node, invocationContext) => {
    if (node == null || typeof node === 'boolean') {
        return undefined;
    }
    if (isJSXNode(node)) {
        return processNode(node, invocationContext);
    }
    else if (isPromise(node)) {
        return node.then((node) => processData$1(node, invocationContext));
    }
    else if (isArray(node)) {
        const output = promiseAll(node.flatMap((n) => processData$1(n, invocationContext)));
        return then(output, (array) => array.flat(100).filter(isNotNullable));
    }
    else if (isString(node) || typeof node === 'number') {
        const newNode = new ProcessedJSXNodeImpl('#text', EMPTY_OBJ, EMPTY_ARRAY, null);
        newNode.$text$ = String(node);
        return newNode;
    }
    else {
        logWarn('A unsupported value was passed to the JSX, skipping render. Value:', node);
        return undefined;
    }
};

const VIRTUAL_SYMBOL = '__virtual';
const newVirtualElement = (doc) => {
    const open = doc.createComment('qv ');
    const close = doc.createComment('/qv');
    return createVirtualElement(open, close);
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
                return virtual.getAttribute(prop) === value ? FILTER_ACCEPT$1 : FILTER_REJECT$1;
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
const createVirtualElement = (open, close) => {
    // const children: Node[] = [];
    const doc = open.ownerDocument;
    const template = doc.createElement('template');
    assertTrue(open.data.startsWith('qv '), 'comment is not a qv');
    const attributes = parseVirtualAttributes(open.data.slice(3));
    const insertBefore = (node, ref) => {
        // if (qDev && child) {
        //   if (!children.includes(child)) {
        //     throw new Error('child is not part of the virtual element');
        //   }
        // }
        const parent = virtual.parentElement;
        if (parent) {
            const ref2 = ref ? ref : close;
            parent.insertBefore(node, ref2);
        }
        else {
            template.insertBefore(node, ref);
        }
        return node;
    };
    const remove = () => {
        const parent = virtual.parentElement;
        if (parent) {
            const ch = Array.from(virtual.childNodes);
            assertEqual(template.childElementCount, 0, 'children should be empty');
            parent.removeChild(open);
            template.append(...ch);
            parent.removeChild(close);
        }
    };
    const appendChild = (node) => {
        return insertBefore(node, null);
    };
    const insertBeforeTo = (newParent, child) => {
        const ch = Array.from(virtual.childNodes);
        if (virtual.parentElement) {
            console.warn('already attached');
        }
        newParent.insertBefore(open, child);
        for (const c of ch) {
            newParent.insertBefore(c, child);
        }
        newParent.insertBefore(close, child);
        assertEqual(template.childElementCount, 0, 'children should be empty');
    };
    const appendTo = (newParent) => {
        insertBeforeTo(newParent, null);
    };
    const updateComment = () => {
        open.data = `qv ${serializeVirtualAttributes(attributes)}`;
    };
    const removeChild = (child) => {
        if (virtual.parentElement) {
            virtual.parentElement.removeChild(child);
        }
        else {
            template.removeChild(child);
        }
    };
    const getAttribute = (prop) => {
        return attributes.get(prop) ?? null;
    };
    const hasAttribute = (prop) => {
        return attributes.has(prop);
    };
    const setAttribute = (prop, value) => {
        attributes.set(prop, value);
        updateComment();
    };
    const removeAttribute = (prop) => {
        attributes.delete(prop);
        updateComment();
    };
    const matches = (_) => {
        return false;
    };
    const compareDocumentPosition = (other) => {
        return open.compareDocumentPosition(other);
    };
    const closest = (query) => {
        const parent = virtual.parentElement;
        if (parent) {
            return parent.closest(query);
        }
        return null;
    };
    const querySelectorAll = (query) => {
        const result = [];
        const ch = getChildren(virtual, 'elements');
        ch.forEach((el) => {
            if (isQwikElement(el)) {
                if (el.matches(query)) {
                    result.push(el);
                }
                result.concat(Array.from(el.querySelectorAll(query)));
            }
        });
        return result;
    };
    const querySelector = (query) => {
        for (const el of virtual.childNodes) {
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
    };
    const virtual = {
        open,
        close,
        appendChild,
        insertBefore,
        appendTo,
        insertBeforeTo,
        closest,
        remove,
        ownerDocument: open.ownerDocument,
        nodeType: 111,
        compareDocumentPosition,
        querySelectorAll,
        querySelector,
        matches,
        setAttribute,
        getAttribute,
        hasAttribute,
        removeChild,
        localName: ':virtual',
        nodeName: ':virtual',
        removeAttribute,
        get firstChild() {
            if (virtual.parentElement) {
                const first = open.nextSibling;
                if (first === close) {
                    return null;
                }
                return first;
            }
            else {
                return template.firstChild;
            }
        },
        get nextSibling() {
            return close.nextSibling;
        },
        get previousSibling() {
            return open.previousSibling;
        },
        get childNodes() {
            if (!virtual.parentElement) {
                return template.childNodes;
            }
            const nodes = [];
            let node = open;
            while ((node = node.nextSibling)) {
                if (node !== close) {
                    nodes.push(node);
                }
                else {
                    break;
                }
            }
            return nodes;
        },
        get isConnected() {
            return open.isConnected;
        },
        get parentElement() {
            return open.parentElement;
        },
    };
    open[VIRTUAL_SYMBOL] = virtual;
    return virtual;
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
        return createVirtualElement(open, close);
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

const SVG_NS = 'http://www.w3.org/2000/svg';
const IS_SVG = 1 << 0;
const IS_HEAD$1 = 1 << 1;
const visitJsxNode = (ctx, elm, jsxNode, flags) => {
    if (jsxNode === undefined) {
        return smartUpdateChildren(ctx, elm, [], 'root', flags);
    }
    if (isArray(jsxNode)) {
        return smartUpdateChildren(ctx, elm, jsxNode.flat(), 'root', flags);
    }
    else {
        return smartUpdateChildren(ctx, elm, [jsxNode], 'root', flags);
    }
};
const smartUpdateChildren = (ctx, elm, ch, mode, flags) => {
    if (ch.length === 1 && ch[0].$type$ === SKIP_RENDER_TYPE) {
        if (elm.firstChild !== null) {
            return;
        }
        ch = ch[0].$children$;
    }
    const isHead = elm.nodeName === 'HEAD';
    if (isHead) {
        mode = 'head';
        flags |= IS_HEAD$1;
    }
    const oldCh = getChildren(elm, mode);
    if (oldCh.length > 0 && ch.length > 0) {
        return updateChildren(ctx, elm, oldCh, ch, flags);
    }
    else if (ch.length > 0) {
        return addVnodes(ctx, elm, null, ch, 0, ch.length - 1, flags);
    }
    else if (oldCh.length > 0) {
        return removeVnodes(ctx, oldCh, 0, oldCh.length - 1);
    }
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
            // Vnode moved right
            results.push(patchVnode(ctx, oldStartVnode, newEndVnode, flags));
            insertBefore(ctx, parentElm, oldStartVnode, oldEndVnode.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldEndVnode, newStartVnode)) {
            // Vnode moved left
            results.push(patchVnode(ctx, oldEndVnode, newStartVnode, flags));
            insertBefore(ctx, parentElm, oldEndVnode, oldStartVnode);
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
                    insertBefore(ctx, parentElm, newElm, oldStartVnode);
                }));
            }
            else {
                elmToMove = oldCh[idxInOld];
                if (!isTagName(elmToMove, newStartVnode.$type$)) {
                    const newElm = createElm(ctx, newStartVnode, flags);
                    results.push(then(newElm, (newElm) => {
                        insertBefore(ctx, parentElm, newElm, oldStartVnode);
                    }));
                }
                else {
                    results.push(patchVnode(ctx, elmToMove, newStartVnode, flags));
                    oldCh[idxInOld] = undefined;
                    insertBefore(ctx, parentElm, elmToMove, oldStartVnode);
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
            removeVnodes(ctx, oldCh, oldStartIdx, oldEndIdx);
        });
    }
    return wait;
};
const isComponentNode = (node) => {
    return node.$props$ && OnRenderProp in node.$props$;
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
    switch (mode) {
        case 'root':
            return getCh(elm, isChildComponent);
        case 'head':
            return getCh(elm, isHeadChildren);
        case 'elements':
            return getCh(elm, isQwikElement);
    }
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
const splitBy = (input, condition) => {
    const output = {};
    for (const item of input) {
        const key = condition(item);
        const array = output[key] ?? (output[key] = []);
        array.push(item);
    }
    return output;
};
const patchVnode = (rctx, elm, vnode, flags) => {
    vnode.$elm$ = elm;
    const tag = vnode.$type$;
    if (tag === '#text') {
        if (elm.data !== vnode.$text$) {
            setProperty$1(rctx, elm, 'data', vnode.$text$);
        }
        return;
    }
    if (tag === HOST_TYPE) {
        throw qError(QError_hostCanOnlyBeAtRoot);
    }
    if (tag === SKIP_RENDER_TYPE) {
        return;
    }
    let isSvg = !!(flags & IS_SVG);
    if (!isSvg && tag === 'svg') {
        flags |= IS_SVG;
        isSvg = true;
    }
    const props = vnode.$props$;
    const ctx = getContext(elm);
    const isComponent = isComponentNode(vnode);
    const isSlot = !isComponent && QSlotName in props;
    let dirty = isComponent
        ? updateComponentProperties$1(ctx, rctx, props)
        : updateProperties$1(ctx, rctx, props, isSvg);
    if (isSvg && vnode.$type$ === 'foreignObject') {
        flags &= ~IS_SVG;
        isSvg = false;
    }
    if (isSlot) {
        const currentComponent = rctx.$currentComponent$;
        if (currentComponent) {
            currentComponent.$slots$.push(vnode);
        }
    }
    const ch = vnode.$children$;
    if (isComponent) {
        if (!dirty && !ctx.$renderQrl$ && !ctx.$element$.hasAttribute(ELEMENT_ID)) {
            setQId(rctx, ctx);
            ctx.$renderQrl$ = props[OnRenderProp];
            assertQrl(ctx.$renderQrl$);
            dirty = true;
        }
        const promise = dirty ? renderComponent(rctx, ctx, flags) : undefined;
        return then(promise, () => {
            const currentComponent = ctx.$component$;
            const slotMaps = getSlots(currentComponent, elm);
            const splittedChidren = splitBy(ch, getSlotName);
            const promises = [];
            const slotRctx = copyRenderContext(rctx);
            slotRctx.$localStack$.push(ctx);
            // Mark empty slots and remove content
            Object.entries(slotMaps.slots).forEach(([key, slotEl]) => {
                if (slotEl && !splittedChidren[key]) {
                    const oldCh = getChildren(slotEl, 'root');
                    if (oldCh.length > 0) {
                        removeVnodes(slotRctx, oldCh, 0, oldCh.length - 1);
                    }
                }
            });
            // Mark empty slots and remove content
            Object.entries(slotMaps.templates).forEach(([key, templateEl]) => {
                if (templateEl && !splittedChidren[key]) {
                    removeNode(slotRctx, templateEl);
                    slotMaps.templates[key] = undefined;
                }
            });
            // Render into slots
            Object.entries(splittedChidren).forEach(([key, ch]) => {
                const slotElm = getSlotElement(slotRctx, slotMaps, elm, key);
                promises.push(smartUpdateChildren(slotRctx, slotElm, ch, 'root', flags));
            });
            return then(promiseAll(promises), () => {
                removeTemplates(slotRctx, slotMaps);
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
    if (!isSlot) {
        return smartUpdateChildren(rctx, elm, ch, 'root', flags);
    }
};
const addVnodes = (ctx, parentElm, before, vnodes, startIdx, endIdx, flags) => {
    const promises = [];
    for (; startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx];
        assertDefined(ch, 'render: node must be defined at index', startIdx, vnodes);
        promises.push(createElm(ctx, ch, flags));
    }
    return then(promiseAll(promises), (children) => {
        for (const child of children) {
            insertBefore(ctx, parentElm, child, before);
        }
    });
};
const removeVnodes = (ctx, nodes, startIdx, endIdx) => {
    for (; startIdx <= endIdx; ++startIdx) {
        const ch = nodes[startIdx];
        if (ch) {
            removeNode(ctx, ch);
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
    const template = createTemplate(ctx, slotName);
    prepend(ctx, parentEl, template);
    slotMaps.templates[slotName] = template;
    return template;
};
const createTemplate = (ctx, slotName) => {
    const template = createElement(ctx, 'q:template', false);
    directSetAttribute(template, QSlot, slotName);
    directSetAttribute(template, 'hidden', '');
    directSetAttribute(template, 'aria-hidden', 'true');
    return template;
};
const removeTemplates = (ctx, slotMaps) => {
    Object.keys(slotMaps.templates).forEach((key) => {
        const template = slotMaps.templates[key];
        if (template && slotMaps.slots[key] !== undefined) {
            removeNode(ctx, template);
            slotMaps.templates[key] = undefined;
        }
    });
};
const resolveSlotProjection = (ctx, hostElm, before, after) => {
    Object.entries(before.slots).forEach(([key, slotEl]) => {
        if (slotEl && !after.slots[key]) {
            // Slot removed
            // Move slot to template
            const template = createTemplate(ctx, key);
            const slotChildren = getChildren(slotEl, 'root');
            for (const child of slotChildren) {
                directAppendChild(template, child);
            }
            directInsertBefore(hostElm, template, hostElm.firstChild);
            ctx.$operations$.push({
                $el$: template,
                $operation$: 'slot-to-template',
                $args$: slotChildren,
                $fn$: () => { },
            });
        }
    });
    Object.entries(after.slots).forEach(([key, slotEl]) => {
        if (slotEl && !before.slots[key]) {
            // Slot created
            // Move template to slot
            const template = before.templates[key];
            if (template) {
                const children = getChildren(template, 'root');
                children.forEach((child) => {
                    directAppendChild(slotEl, child);
                });
                template.remove();
                ctx.$operations$.push({
                    $el$: slotEl,
                    $operation$: 'template-to-slot',
                    $args$: [template],
                    $fn$: () => { },
                });
            }
        }
    });
};
const getSlotName = (node) => {
    return node.$props$?.[QSlot] ?? '';
};
const createElm = (rctx, vnode, flags) => {
    rctx.$perf$.$visited$++;
    const tag = vnode.$type$;
    if (tag === '#text') {
        return (vnode.$elm$ = createTextNode(rctx, vnode.$text$));
    }
    if (tag === HOST_TYPE) {
        throw qError(QError_hostCanOnlyBeAtRoot);
    }
    let isSvg = !!(flags & IS_SVG);
    if (!isSvg && tag === 'svg') {
        flags |= IS_SVG;
        isSvg = true;
    }
    const isVirtual = tag === VIRTUAL_TYPE;
    let elm;
    let isHead = !!(flags & IS_HEAD$1);
    if (isVirtual) {
        elm = newVirtualElement(rctx.$doc$);
    }
    else if (tag === 'head') {
        elm = rctx.$doc$.head;
        flags |= IS_HEAD$1;
        isHead = true;
    }
    else if (tag === 'title') {
        elm = rctx.$doc$.querySelector('title') ?? createElement(rctx, tag, isSvg);
    }
    else {
        elm = createElement(rctx, tag, isSvg);
        flags &= ~IS_HEAD$1;
    }
    vnode.$elm$ = elm;
    const props = vnode.$props$;
    const isComponent = isComponentNode(vnode);
    const isSlot = isVirtual && QSlotName in props;
    const hasRef = !isVirtual && 'ref' in props;
    const ctx = getContext(elm);
    setKey(elm, vnode.$key$);
    if (isHead && !isVirtual) {
        directSetAttribute(elm, 'q:head', '');
    }
    if (isSvg && tag === 'foreignObject') {
        isSvg = false;
        flags &= ~IS_SVG;
    }
    const currentComponent = rctx.$currentComponent$;
    if (currentComponent) {
        if (!isVirtual) {
            const scopedIds = currentComponent.$ctx$.$scopeIds$;
            if (scopedIds) {
                scopedIds.forEach((styleId) => {
                    elm.classList.add(styleId);
                });
            }
        }
        if (isSlot) {
            directSetAttribute(elm, QSlotRef, currentComponent.$ctx$.$id$);
            currentComponent.$slots$.push(vnode);
        }
    }
    if (isComponent) {
        updateComponentProperties$1(ctx, rctx, props);
    }
    else {
        updateProperties$1(ctx, rctx, props, isSvg);
    }
    if (isComponent || ctx.$listeners$ || hasRef) {
        setQId(rctx, ctx);
    }
    let wait;
    if (isComponent) {
        // Run mount hook
        const renderQRL = props[OnRenderProp];
        assertQrl(renderQRL);
        ctx.$renderQrl$ = renderQRL;
        wait = renderComponent(rctx, ctx, flags);
    }
    else {
        const setsInnerHTML = checkInnerHTML(props);
        if (setsInnerHTML) {
            if (qDev && vnode.$children$.length > 0) {
                logWarn('Node can not have children when innerHTML is set');
            }
            return elm;
        }
    }
    return then(wait, () => {
        const currentComponent = ctx.$component$;
        let children = vnode.$children$;
        if (children.length > 0) {
            if (children.length === 1 && children[0].$type$ === SKIP_RENDER_TYPE) {
                children = children[0].$children$;
            }
            const slotRctx = copyRenderContext(rctx);
            slotRctx.$localStack$.push(ctx);
            const slotMap = isComponent ? getSlots(currentComponent, elm) : undefined;
            const promises = children.map((ch) => createElm(slotRctx, ch, flags));
            return then(promiseAll(promises), () => {
                let parent = elm;
                for (const node of children) {
                    if (slotMap) {
                        parent = getSlotElement(slotRctx, slotMap, elm, getSlotName(node));
                    }
                    directAppendChild(parent, node.$elm$);
                }
                return elm;
            });
        }
        return elm;
    });
};
const getSlots = (componentCtx, hostElm) => {
    const slots = {};
    const templates = {};
    const parent = hostElm.parentElement;
    if (parent) {
        const slotRef = directGetAttribute(hostElm, 'q:id');
        const existingSlots = queryAllVirtualByAttribute(parent, 'q:sref', slotRef);
        // Map slots
        for (const elm of existingSlots) {
            slots[directGetAttribute(elm, QSlotName) ?? ''] = elm;
        }
    }
    const newSlots = componentCtx?.$slots$ ?? EMPTY_ARRAY;
    const t = Array.from(hostElm.childNodes).filter(isSlotTemplate);
    // Map virtual slots
    for (const vnode of newSlots) {
        slots[vnode.$props$[QSlotName] ?? ''] = vnode.$elm$;
    }
    // Map templates
    for (const elm of t) {
        templates[directGetAttribute(elm, QSlot) ?? ''] = elm;
    }
    return { slots, templates };
};
const handleStyle = (ctx, elm, _, newValue) => {
    setAttribute(ctx, elm, 'style', stringifyStyle(newValue));
    return true;
};
const handleClass = (ctx, elm, _, newValue, oldValue) => {
    if (!oldValue) {
        oldValue = elm.className;
    }
    setAttribute(ctx, elm, 'class', stringifyClass(newValue, oldValue));
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
const updateProperties$1 = (ctx, rctx, expectProps, isSvg) => {
    const keys = Object.keys(expectProps);
    if (keys.length === 0) {
        return false;
    }
    let cache = ctx.$cache$;
    const elm = ctx.$element$;
    for (const key of keys) {
        if (key === 'children') {
            continue;
        }
        const newValue = expectProps[key];
        if (key === 'ref') {
            newValue.current = elm;
            continue;
        }
        // Early exit if value didnt change
        const cacheKey = key;
        if (!cache) {
            cache = ctx.$cache$ = new Map();
        }
        const oldValue = cache.get(cacheKey);
        if (newValue === oldValue) {
            continue;
        }
        cache.set(cacheKey, newValue);
        // Check of data- or aria-
        if (key.startsWith('data-') || key.startsWith('aria-')) {
            setAttribute(rctx, elm, key, newValue);
            continue;
        }
        if (isOnProp(key)) {
            setEvent(ctx, key, newValue);
            continue;
        }
        // Check if its an exception
        const exception = PROP_HANDLER_MAP[key];
        if (exception) {
            if (exception(rctx, elm, key, newValue, oldValue)) {
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
    if (ctx.$listeners$) {
        ctx.$listeners$.forEach((value, key) => {
            setAttribute(rctx, elm, fromCamelToKebabCase(key), serializeQRLs(value, ctx));
        });
    }
    return false;
};
const updateComponentProperties$1 = (ctx, rctx, expectProps) => {
    const keys = Object.keys(expectProps);
    if (keys.length === 0) {
        return false;
    }
    const qwikProps = getPropsMutator(ctx, rctx.$containerState$);
    for (const key of keys) {
        if (SKIPS_PROPS.includes(key)) {
            continue;
        }
        qwikProps.set(key, expectProps[key]);
    }
    return ctx.$dirty$;
};
const setEvent = (ctx, prop, value) => {
    assertTrue(prop.endsWith('$'), 'render: event property does not end with $', prop);
    // TODO
    // if (!ctx.$listeners$) {
    //   ctx.$listeners$ = getDomListeners(ctx.$element$);
    // }
    addQRLListener(ctx, normalizeOnProp(prop.slice(0, -1)), value);
};
const setAttribute = (ctx, el, prop, value) => {
    const fn = () => {
        if (value == null || value === false) {
            el.removeAttribute(prop);
        }
        else {
            const str = value === true ? '' : String(value);
            directSetAttribute(el, prop, str);
        }
    };
    ctx.$operations$.push({
        $el$: el,
        $operation$: 'set-attribute',
        $args$: [prop, value],
        $fn$: fn,
    });
};
const setProperty$1 = (ctx, node, key, value) => {
    const fn = () => {
        try {
            node[key] = value;
        }
        catch (err) {
            logError(codeToText(QError_setProperty), { node, key, value }, err);
        }
    };
    ctx.$operations$.push({
        $el$: node,
        $operation$: 'set-property',
        $args$: [key, value],
        $fn$: fn,
    });
};
const createElement = (ctx, expectTag, isSvg) => {
    const el = isSvg
        ? ctx.$doc$.createElementNS(SVG_NS, expectTag)
        : ctx.$doc$.createElement(expectTag);
    el[CONTAINER] = ctx.$containerEl$;
    ctx.$operations$.push({
        $el$: el,
        $operation$: 'create-element',
        $args$: [expectTag],
        $fn$: () => { },
    });
    return el;
};
const insertBefore = (ctx, parent, newChild, refChild) => {
    const fn = () => {
        directInsertBefore(parent, newChild, refChild ? refChild : null);
    };
    ctx.$operations$.push({
        $el$: parent,
        $operation$: 'insert-before',
        $args$: [newChild, refChild],
        $fn$: fn,
    });
    return newChild;
};
const appendHeadStyle = (ctx, hostElement, styleTask) => {
    const fn = () => {
        const containerEl = ctx.$containerEl$;
        const isDoc = ctx.$doc$.documentElement === containerEl && !!ctx.$doc$.head;
        const style = ctx.$doc$.createElement('style');
        directSetAttribute(style, QStyle, styleTask.styleId);
        style.textContent = styleTask.content;
        if (isDoc) {
            directAppendChild(ctx.$doc$.head, style);
        }
        else {
            directInsertBefore(containerEl, style, containerEl.firstChild);
        }
    };
    ctx.$containerState$.$styleIds$.add(styleTask.styleId);
    ctx.$operations$.push({
        $el$: hostElement,
        $operation$: 'append-style',
        $args$: [styleTask],
        $fn$: fn,
    });
};
const prepend = (ctx, parent, newChild) => {
    const fn = () => {
        directInsertBefore(parent, newChild, parent.firstChild);
    };
    ctx.$operations$.push({
        $el$: parent,
        $operation$: 'prepend',
        $args$: [newChild],
        $fn$: fn,
    });
};
const removeNode = (ctx, el) => {
    const fn = () => {
        const parent = el.parentElement;
        if (parent) {
            if (el.nodeType === 1 || el.nodeType === 111) {
                cleanupTree(el, ctx.$containerState$.$subsManager$);
            }
            directRemoveChild(parent, el);
        }
        else if (qDev) {
            logWarn('Trying to remove component already removed', el);
        }
    };
    ctx.$operations$.push({
        $el$: el,
        $operation$: 'remove',
        $args$: [],
        $fn$: fn,
    });
};
const cleanupTree = (parent, subsManager) => {
    if (parent.hasAttribute(QSlotName)) {
        return;
    }
    cleanupElement(parent, subsManager);
    const ch = getChildren(parent, 'elements');
    for (const child of ch) {
        cleanupTree(child, subsManager);
    }
};
const cleanupElement = (el, subsManager) => {
    const ctx = tryGetContext(el);
    if (ctx) {
        cleanupContext(ctx, subsManager);
    }
};
const createTextNode = (ctx, text) => {
    return ctx.$doc$.createTextNode(text);
};
const executeContextWithSlots = (ctx) => {
    const before = ctx.$roots$.map((elm) => getSlots(null, elm));
    executeContext(ctx);
    const after = ctx.$roots$.map((elm) => getSlots(null, elm));
    assertEqual(before.length, after.length, 'render: number of q:slots changed during render context execution', before, after);
    for (let i = 0; i < before.length; i++) {
        resolveSlotProjection(ctx, ctx.$roots$[i], before[i], after[i]);
    }
};
const executeContext = (ctx) => {
    for (const op of ctx.$operations$) {
        op.$fn$();
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
const directInsertBefore = (parent, child, ref) => {
    if (isVirtualElement(child)) {
        child.insertBeforeTo(parent, getRootNode(ref));
    }
    else {
        parent.insertBefore(child, getRootNode(ref));
    }
};
const printRenderStats = (ctx) => {
    if (qDev) {
        if (typeof window !== 'undefined' && window.document != null) {
            const byOp = {};
            for (const op of ctx.$operations$) {
                byOp[op.$operation$] = (byOp[op.$operation$] ?? 0) + 1;
            }
            const affectedElements = Array.from(new Set(ctx.$operations$.map((a) => a.$el$)));
            const stats = {
                byOp,
                roots: ctx.$roots$,
                hostElements: Array.from(ctx.$hostElements$),
                affectedElements,
                visitedNodes: ctx.$perf$.$visited$,
                operations: ctx.$operations$.map((v) => [v.$operation$, v.$el$, ...v.$args$]),
            };
            const noOps = ctx.$operations$.length === 0;
            logDebug('Render stats.', noOps ? 'No operations' : '', stats);
        }
    }
};
const createKeyToOldIdx = (children, beginIdx, endIdx) => {
    const map = {};
    for (let i = beginIdx; i <= endIdx; ++i) {
        const child = children[i];
        if (child.nodeType === 1) {
            const key = getKey(child);
            if (key != null) {
                map[key] = i;
            }
        }
    }
    return map;
};
const KEY_SYMBOL = Symbol('vnode key');
const getKey = (el) => {
    let key = el[KEY_SYMBOL];
    if (key === undefined) {
        key = el[KEY_SYMBOL] = directGetAttribute(el, 'q:key');
    }
    return key;
};
const setKey = (el, key) => {
    if (isString(key)) {
        directSetAttribute(el, 'q:key', key);
    }
    el[KEY_SYMBOL] = key;
};
const sameVnode = (elm, vnode2) => {
    const isElement = elm.nodeType === 1 || elm.nodeType === 111;
    const type = vnode2.$type$;
    if (isElement) {
        const isSameSel = elm.localName === type;
        if (!isSameSel) {
            return false;
        }
        return getKey(elm) === vnode2.$key$;
    }
    return elm.nodeName === type;
};
const isTagName = (elm, tagName) => {
    if (elm.nodeType === 1) {
        return elm.localName === tagName;
    }
    return elm.nodeName === tagName;
};
const checkInnerHTML = (props) => {
    return dangerouslySetInnerHTML in props;
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
    const hostElement = context.$hostElement$;
    const qrl = context.$qrl$ ?? parseQRL(decodeURIComponent(String(context.$url$)), hostElement);
    assertQrl(qrl);
    if (qrl.$captureRef$ == null) {
        const el = context.$element$;
        assertDefined(el, 'invoke: element must be defined inside useLexicalScope()', context);
        assertDefined(qrl.$capture$, 'invoke: qrl capture must be defined inside useLexicalScope()', qrl);
        const container = getContainer(el);
        assertDefined(container, `invoke: cant find parent q:container of`, el);
        resumeIfNeeded(container);
        const ctx = getContext(el);
        qrl.$captureRef$ = qrl.$capture$.map((idx) => qInflate(idx, ctx));
    }
    const subscriber = context.$subscriber$;
    if (subscriber) {
        return qrl.$captureRef$;
    }
    return qrl.$captureRef$;
};
const qInflate = (ref, hostCtx) => {
    const int = parseInt(ref, 10);
    const obj = hostCtx.$refMap$[int];
    assertTrue(hostCtx.$refMap$.length > int, 'out of bounds inflate access', ref);
    return obj;
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
    if (qDev && !qTest && containerState.$platform$.isServer) {
        logWarn('Can not rerender in server platform');
        return undefined;
    }
    resumeIfNeeded(containerState.$containerEl$);
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
    notifyWatch(watch, getContainerState(getContainer(watch.$el$)));
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
    for (const el of renderingQueue) {
        if (!ctx.$hostElements$.has(el)) {
            ctx.$roots$.push(el);
            try {
                await renderComponent(ctx, getContext(el), getFlags(el.parentElement));
            }
            catch (e) {
                logError(codeToText(QError_errorWhileRendering), e);
            }
        }
    }
    // Early exist, no dom operations
    if (ctx.$operations$.length === 0) {
        printRenderStats(ctx);
        postRendering(containerState, ctx);
        return ctx;
    }
    return platform.raf(() => {
        executeContextWithSlots(ctx);
        printRenderStats(ctx);
        postRendering(containerState, ctx);
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
            watchPromises.push(then(watch.$qrl$.$resolveLazy$(watch.$el$), () => watch));
            containerState.$watchNext$.delete(watch);
        }
        if (isResourceWatch(watch)) {
            resourcesPromises.push(then(watch.$qrl$.$resolveLazy$(watch.$el$), () => watch));
            containerState.$watchNext$.delete(watch);
        }
    });
    do {
        // Run staging effected
        containerState.$watchStaging$.forEach((watch) => {
            if (isWatch(watch)) {
                watchPromises.push(then(watch.$qrl$.$resolveLazy$(watch.$el$), () => watch));
            }
            else if (isResourceWatch(watch)) {
                resourcesPromises.push(then(watch.$qrl$.$resolveLazy$(watch.$el$), () => watch));
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
            watchPromises.push(then(watch.$qrl$.$resolveLazy$(watch.$el$), () => watch));
            containerState.$watchNext$.delete(watch);
        }
    });
    do {
        // Run staging effected
        containerState.$watchStaging$.forEach((watch) => {
            if (watchPred(watch, true)) {
                watchPromises.push(then(watch.$qrl$.$resolveLazy$(watch.$el$), () => watch));
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
        }
        return local;
    };
    return {
        $tryGetLocal$: tryGetLocal,
        $getLocal$: getLocal,
        $clearSub$: clearSub,
    };
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
        containerState.$styleIds$.add(el.getAttribute(QStyle));
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
            ctx.$refMap$.push(...qobj.split(' ').map((part) => getObject(part)));
        }
        if (seq) {
            ctx.$seq$ = seq.split(' ').map((part) => getObject(part));
        }
        if (watches) {
            ctx.$watches$ = watches.split(' ').map((part) => getObject(part));
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
        if (ctx.$listeners$) {
            ctx.$listeners$.forEach((qrls, key) => {
                qrls.forEach((qrl) => {
                    listeners.push({
                        key,
                        qrl,
                        el: ctx.$element$,
                    });
                });
            });
        }
        for (const watch of ctx.$watches$) {
            collector.$watches$.push(watch);
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
            await collectProps(ctx.$element$, ctx.$props$, collector);
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
                if (isQwikElement(key)) {
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
        const value = serializeValue(obj, getObjId, containerState);
        if (value !== undefined) {
            return value;
        }
        switch (typeof obj) {
            case 'object':
                if (obj === null) {
                    return null;
                }
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
                break;
            case 'string':
            case 'number':
            case 'boolean':
                return obj;
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
        const elementCaptured = collector.$elements$.includes(node);
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
            if (watches.length > 0) {
                const value = watches.map(getObjId).filter(isNotNullable).join(' ');
                if (value) {
                    metaValue.w = value;
                    add = true;
                }
            }
            if (elementCaptured && seq.length > 0) {
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
            objs[i] = parser.prepare(value);
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
        for (const obj of ctx.$seq$) {
            await collectValue(obj, collector, false);
        }
        for (const obj of ctx.$watches$) {
            await collectValue(obj, collector, false);
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
            if (isVirtualElement(key)) {
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
    if (!get) {
        assertQrl(qrl);
        const el = ctx.$hostElement$;
        const containerState = ctx.$renderCtx$.$containerState$;
        const watch = new Watch(WatchFlagsIsDirty | WatchFlagsIsWatch, i, el, qrl, undefined);
        set(true);
        getContext(el).$watches$.push(watch);
        const previousWait = ctx.$waitOn$.slice();
        ctx.$waitOn$.push(Promise.all(previousWait).then(() => runSubscriber(watch, containerState)));
        const isServer = containerState.$platform$.isServer;
        if (isServer) {
            useRunWatch(watch, opts?.eagerness);
        }
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
    if (!get) {
        assertQrl(qrl);
        const el = ctx.$hostElement$;
        const watch = new Watch(WatchFlagsIsEffect, i, el, qrl, undefined);
        set(true);
        getContext(el).$watches$.push(watch);
        useRunWatch(watch, opts?.eagerness ?? 'visible');
        const doc = ctx.$doc$;
        if (doc['qO']) {
            doc['qO'].observe(el);
        }
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
    if (isServer(ctx.$doc$)) {
        ctx.$waitOn$.push(mountQrl());
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
    ctx.$waitOn$.push(mountQrl());
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
    const watchFn = watch.$qrl$.$invokeFn$(el, invokationContext, () => {
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
    const watchFn = watch.$qrl$.$invokeFn$(el, invokationContext, () => {
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
        const cleanup = watch.$qrl$.$invokeFn$(watch.$el$);
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
    const containerState = ctx.$renderCtx$.$containerState$;
    const resource = createResourceReturn(containerState, opts);
    const el = ctx.$hostElement$;
    const watch = new Watch(WatchFlagsIsDirty | WatchFlagsIsResource, i, el, qrl, resource);
    const previousWait = Promise.all(ctx.$waitOn$.slice());
    runResource(watch, containerState, previousWait);
    getContext(el).$watches$.push(watch);
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
            props.resource.promise.catch(() => { });
            if (props.resource.state === 'rejected') {
                return props.onRejected(props.resource.error);
            }
        }
        if (props.onPending) {
            const state = props.resource.state;
            if (state === 'pending') {
                return props.onPending();
            }
            else if (state === 'resolved') {
                return props.onResolved(props.resource.resolved);
            }
        }
    }
    const promise = props.resource.promise.then(useBindInvokeContext(props.onResolved), useBindInvokeContext(props.onRejected));
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
    assertDefined(ctx.$doc$, 'doc must be defined', ctx);
    return isServer(ctx.$doc$);
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

const UndefinedSerializer = {
    test: (obj) => obj === undefined,
    prepare: () => undefined,
};
const QRLSerializer = {
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
const ErrorSerializer = {
    test: (v) => v instanceof Error,
    serialize: (obj) => {
        return obj.message;
    },
    prepare: (text) => {
        const err = new Error(text);
        err.stack = undefined;
        return err;
    },
};
const DocumentSerializer = {
    test: (v) => isDocument(v),
    prepare: (_, _c, doc) => {
        return doc;
    },
};
const ResourceSerializer = {
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
const WatchSerializer = {
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
const URLSerializer = {
    test: (v) => v instanceof URL,
    serialize: (obj) => obj.href,
    prepare: (data) => new URL(data),
};
const DateSerializer = {
    test: (v) => v instanceof Date,
    serialize: (obj) => obj.toISOString(),
    prepare: (data) => new Date(data),
};
const RegexSerializer = {
    test: (v) => v instanceof RegExp,
    serialize: (obj) => `${obj.flags} ${obj.source}`,
    prepare: (data) => {
        const space = data.indexOf(' ');
        const source = data.slice(space + 1);
        const flags = data.slice(0, space);
        return new RegExp(source, flags);
    },
};
const SERIALIZABLE_STATE = Symbol('serializable-data');
const ComponentSerializer = {
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
    UndefinedSerializer,
    QRLSerializer,
    DocumentSerializer,
    ResourceSerializer,
    WatchSerializer,
    URLSerializer,
    RegexSerializer,
    DateSerializer,
    ComponentSerializer,
    PureFunctionSerializer,
    ErrorSerializer,
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
    for (let i = 0; i < serializers.length; i++) {
        const s = serializers[i];
        if (s.test(obj)) {
            let value = String.fromCharCode(i);
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
            for (let i = 0; i < serializers.length; i++) {
                const s = serializers[i];
                const prefix = String.fromCodePoint(i);
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

const Q_CTX = '__ctx__';
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
            $id$: '',
            $element$: element,
            $cache$: null,
            $refMap$: [],
            $seq$: [],
            $watches$: [],
            $scopeIds$: null,
            $appendStyles$: null,
            $props$: null,
            $renderQrl$: null,
            $component$: null,
            $listeners$: null,
            $contexts$: null,
        };
    }
    return ctx;
};
const cleanupContext = (ctx, subsManager) => {
    const el = ctx.$element$;
    ctx.$watches$.forEach((watch) => {
        subsManager.$clearSub$(watch);
        destroyWatch(watch);
    });
    if (ctx.$renderQrl$) {
        subsManager.$clearSub$(el);
    }
    ctx.$component$ = null;
    ctx.$renderQrl$ = null;
    ctx.$seq$.length = 0;
    ctx.$watches$.length = 0;
    ctx.$dirty$ = false;
    el[Q_CTX] = undefined;
};
const PREFIXES = ['document:on', 'window:on', 'on'];
const SCOPED = ['on-document', 'on-window', 'on'];
const normalizeOnProp = (prop) => {
    let scope = 'on';
    for (let i = 0; i < PREFIXES.length; i++) {
        const prefix = PREFIXES[i];
        if (prop.startsWith(prefix)) {
            scope = SCOPED[i];
            prop = prop.slice(prefix.length);
        }
    }
    if (prop.startsWith('-')) {
        prop = prop.slice(1);
    }
    else {
        prop = prop.toLowerCase();
    }
    return `${scope}:${prop}`;
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
    const ctx = getContainer(element);
    getContainerState(ctx).$mutableProps$ = mutable;
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
            if (isElement(p)) {
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
const QError_hostCanOnlyBeAtRoot = 18;
const QError_immutableJsxProps = 19;
const QError_useInvokeContext = 20;
const QError_containerAlreadyPaused = 21;
const QError_canNotMountUseServerMount = 22;
const QError_invalidJsxNodeType = 25;
const QError_trackUseStore = 26;
const QError_missingObjectId = 27;
const QError_invalidContext = 28;
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
            'not found state for useContext',
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
            'The provided Context reference is not a valid context created by createContext()', // 27
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
    let cachedEl;
    const setContainer = (el) => {
        if (!cachedEl) {
            cachedEl = el;
        }
    };
    const resolve = async (el) => {
        if (el) {
            setContainer(el);
        }
        if (symbolRef) {
            return symbolRef;
        }
        if (symbolFn) {
            return (symbolRef = symbolFn().then((module) => (symbolRef = module[symbol])));
        }
        else {
            if (!cachedEl) {
                throw new Error(`QRL '${chunk}#${symbol || 'default'}' does not have an attached container`);
            }
            const symbol2 = getPlatform(cachedEl).importSymbol(cachedEl, chunk, symbol);
            return (symbolRef = then(symbol2, (ref) => {
                return (symbolRef = ref);
            }));
        }
    };
    const resolveLazy = (el) => {
        return isFunction(symbolRef) ? symbolRef : resolve(el);
    };
    const invokeFn = (el, currentCtx, beforeFn) => {
        return ((...args) => {
            const fn = resolveLazy(el);
            return then(fn, (fn) => {
                if (isFunction(fn)) {
                    const baseContext = currentCtx ?? newInvokeContext();
                    const context = {
                        ...baseContext,
                        $qrl$: QRL,
                    };
                    if (beforeFn) {
                        beforeFn();
                    }
                    return invoke(context, fn, ...args);
                }
                throw qError(QError_qrlIsNotFunction);
            });
        });
    };
    const invokeQRL = async function (...args) {
        const fn = invokeFn();
        const result = await fn(...args);
        return result;
    };
    const QRL = invokeQRL;
    const methods = {
        getSymbol: () => refSymbol ?? symbol,
        getHash: () => getSymbolHash(refSymbol ?? symbol),
        resolve,
        $resolveLazy$: resolveLazy,
        $setContainer$: setContainer,
        $chunk$: chunk,
        $symbol$: symbol,
        $refSymbol$: refSymbol,
        $invokeFn$: invokeFn,
        $capture$: capture,
        $captureRef$: captureRef,
        $copy$() {
            return createQRL(chunk, symbol, symbolRef, symbolFn, null, qrl.$captureRef$, refSymbol);
        },
        $serialize$(options) {
            return stringifyQRL(QRL, options);
        },
    };
    const qrl = Object.assign(invokeQRL, methods);
    return qrl;
};
const getSymbolHash = (symbolName) => {
    const index = symbolName.lastIndexOf('_');
    if (index > -1) {
        return symbolName.slice(index + 1);
    }
    return symbolName;
};
const isSameQRL = (a, b) => {
    return a.getHash() === b.getHash();
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
    let chunk;
    let symbolFn = null;
    if (isString(chunkOrFn)) {
        chunk = chunkOrFn;
    }
    else if (isFunction(chunkOrFn)) {
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
            throw qError(QError_dynamicImportFailed, srcCode);
        }
    }
    else {
        throw qError(QError_unknownTypeArgument, chunkOrFn);
    }
    // Unwrap subscribers
    const qrl = createQRL(chunk, symbol, null, symbolFn, null, lexicalScopeCapture, null);
    const ctx = tryGetInvokeContext();
    if (ctx && ctx.$element$) {
        qrl.$setContainer$(ctx.$element$);
    }
    return qrl;
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
    if (opts.$getObjId$) {
        if (captureRef && captureRef.length) {
            const capture = captureRef.map(opts.$getObjId$);
            parts.push(`[${capture.join(' ')}]`);
        }
    }
    else if (opts.$addRefMap$) {
        if (captureRef && captureRef.length) {
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
const serializeQRLs = (existingQRLs, ctx) => {
    const opts = {
        $platform$: getPlatform(ctx.$element$),
        $element$: ctx.$element$,
        $addRefMap$: (obj) => addToArray(ctx.$refMap$, obj),
    };
    return existingQRLs.map((qrl) => stringifyQRL(qrl, opts)).join('\n');
};
/**
 * `./chunk#symbol[captures]
 */
const parseQRL = (qrl, el) => {
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
    if (el) {
        iQrl.$setContainer$(el);
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
        const hash = qTest ? 'sX' : onRenderQrl.getHash();
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
        [QSlotName]: name,
    }, name);
};

/**
 * QWIK_VERSION
 * @public
 */
const version = "0.0.100";

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
    containerState.$renderPromise$ = renderRoot(containerEl, jsxNode, doc, containerState, containerEl);
    const renderCtx = await containerState.$renderPromise$;
    await postRendering(containerState, renderCtx);
};
const renderRoot = async (parent, jsxNode, doc, containerState, containerEl) => {
    const ctx = createRenderContext(doc, containerState);
    ctx.$roots$.push(parent);
    const processedNodes = await processData$1(jsxNode);
    await visitJsxNode(ctx, parent, processedNodes, 0);
    executeContext(ctx);
    if (qDev) {
        appendQwikDevTools(containerEl);
        printRenderStats(ctx);
    }
    return ctx;
};
const getElement = (docOrElm) => {
    return isDocument(docOrElm) ? docOrElm.documentElement : docOrElm;
};
const injectQContainer = (containerEl) => {
    directSetAttribute(containerEl, 'q:version', version || '');
    directSetAttribute(containerEl, QContainerAttr, 'resumed');
};

const IS_HOST = 1 << 0;
const IS_HEAD = 1 << 1;
const IS_RAW_CONTENT = 1 << 2;
/**
 * @alpha
 */
const renderSSR = async (doc, node, opts) => {
    const root = opts.containerTagName;
    const containerEl = doc.createElement(root);
    const containerState = getContainerState(containerEl);
    const rctx = createRenderContext(doc, containerState);
    const ssrCtx = {
        rctx,
        $contexts$: [],
        projectedChildren: undefined,
        projectedContext: undefined,
        hostCtx: undefined,
        invocationContext: undefined,
        headNodes: [],
    };
    const beforeContent = opts.beforeContent;
    const beforeClose = opts.beforeClose;
    if (beforeContent) {
        ssrCtx.headNodes.push(...beforeContent);
    }
    const containerAttributes = {
        ...opts.containerAttributes,
        'q:container': 'paused',
        'q:version': version ?? 'dev',
        'q:render': 'ssr',
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
            children: [...ssrCtx.headNodes, node],
        });
    }
    await renderNode(node, ssrCtx, opts.stream, 0, (stream) => {
        const result = beforeClose?.(ssrCtx.$contexts$, containerState);
        if (result) {
            return processData(result, ssrCtx, stream, 0, undefined);
        }
    });
};
const renderNodeFunction = (node, ssrCtx, stream, flags, beforeClose) => {
    if (node.type === SSRComment) {
        stream.write(`<!--${node.props.data ?? ''}-->`);
        return;
    }
    if (node.type === Virtual) {
        const elCtx = getContext(ssrCtx.rctx.$doc$.createElement(':virtual'));
        return renderNodeVirtual(node, elCtx, undefined, ssrCtx, stream, flags, beforeClose);
    }
    const res = ssrCtx.invocationContext
        ? invoke(ssrCtx.invocationContext, () => node.type(node.props, node.key))
        : node.type(node.props, node.key);
    return processData(res, ssrCtx, stream, flags, beforeClose);
};
const renderNodeVirtual = (node, elCtx, extraNodes, ssrCtx, stream, flags, beforeClose) => {
    const props = node.props;
    const renderQrl = props[OnRenderProp];
    if (renderQrl) {
        elCtx.$renderQrl$ = renderQrl;
        return renderSSRComponent(ssrCtx, stream, elCtx, node, flags, beforeClose);
    }
    const { children, ...attributes } = node.props;
    const slotName = props[QSlotName];
    const isSlot = typeof slotName === 'string';
    if (isSlot) {
        assertDefined(ssrCtx.hostCtx?.$id$, 'hostId must be defined for a slot');
        attributes[QSlotRef] = ssrCtx.hostCtx.$id$;
    }
    const key = node.key != null ? String(node.key) : null;
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
            const content = ssrCtx.projectedChildren?.[slotName];
            if (content) {
                ssrCtx.projectedChildren[slotName] = undefined;
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
    const elCtx = getContext(ssrCtx.rctx.$doc$.createElement(node.type));
    const hasRef = 'ref' in props;
    const attributes = updateProperties(ssrCtx.rctx, elCtx, props);
    const hostCtx = ssrCtx.hostCtx;
    if (hostCtx) {
        attributes['class'] = joinClasses(hostCtx.$scopeIds$, attributes['class']);
        const cmp = hostCtx.$component$;
        if (!cmp.$attachedListeners$) {
            cmp.$attachedListeners$ = true;
            hostCtx.$listeners$?.forEach((qrl, eventName) => {
                addQRLListener(elCtx, eventName, qrl);
            });
        }
    }
    // Reset HOST flags
    if (textType === 'head') {
        flags |= IS_HEAD;
    }
    const hasEvents = elCtx.$listeners$;
    const isHead = flags & IS_HEAD;
    if (key != null) {
        attributes['q:key'] = key;
    }
    if (hasRef || hasEvents) {
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
    if (elCtx.$listeners$) {
        elCtx.$listeners$.forEach((value, key) => {
            attributes[fromCamelToKebabCase(key)] = serializeQRLs(value, elCtx);
        });
    }
    if (renderNodeElementSync(textType, attributes, stream)) {
        return;
    }
    if (textType !== 'head') {
        flags &= ~IS_HEAD;
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
            console.error('not rendered');
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
        const invocationContext = newInvokeContext(newCtx.$doc$, hostElement, undefined);
        invocationContext.$subscriber$ = hostElement;
        invocationContext.$renderCtx$ = newCtx;
        const projectedContext = {
            ...ssrCtx,
            rctx: copyRenderContext(newCtx),
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
            for (const style of elCtx.$appendStyles$) {
                extraNodes.push(jsx('style', {
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
        flags |= IS_HOST;
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
        children.type !== Virtual) {
        const fn = children.type;
        const res = ssrCtx.invocationContext
            ? invoke(ssrCtx.invocationContext, () => fn(children.props, children.key))
            : fn(children.props, children.key);
        return flatVirtualChildren(res, ssrCtx);
    }
    return children;
};
const updateProperties = (rctx, ctx, expectProps) => {
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
            const attributeName = normalizeOnProp(key.slice(0, -1));
            addQRLListener(ctx, attributeName, newValue);
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
    const qwikProps = getPropsMutator(ctx, rctx.$containerState$);
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

// <docs markdown="../readme.md#useDocument">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useDocument instead)
/**
 * Retrieves the document of the current element. It's important to use this method instead of
 * accessing `document` directly because during SSR, the global document might not exist.
 *
 * NOTE: `useDocument` method can only be used in the synchronous portion of the callback (before
 * any `await` statements.)
 *
 * @alpha
 */
// </docs>
const useDocument = () => {
    const ctx = useInvokeContext();
    return ctx.$doc$;
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
        const containerState = ctx.$renderCtx$.$containerState$;
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
    return ctx.$renderCtx$.$containerState$.$envData$[key] ?? defaultValue;
}
/**
 * @alpha
 * @deprecated Please use `useEnvData` instead.
 */
const useUserContext = useEnvData;

function scopeStylesheet(css, scopeId) {
    const end = css.length;
    const out = [];
    const stack = [];
    let idx = 0;
    let lastIdx = idx;
    let mode = MODE.selector;
    let lastCh = 0;
    while (idx < end) {
        let ch = css.charCodeAt(idx++);
        if (ch === CHAR.BACKSLASH) {
            idx++;
            ch = CHAR.A; // Pretend it's a letter
        }
        const arcs = STATE_MACHINE[mode];
        for (let i = 0; i < arcs.length; i++) {
            const [expectLastCh, expectCh, newMode] = arcs[i];
            if (expectLastCh === lastCh ||
                expectLastCh === CHAR.ANY ||
                (expectLastCh === CHAR.IDENT && isIdent(lastCh))) {
                if (expectCh === ch ||
                    expectCh === CHAR.ANY ||
                    (expectCh === CHAR.NOT_IDENT_AND_NOT_DOT && !isIdent(ch) && ch !== CHAR.DOT)) {
                    if (newMode === MODE.EXIT) {
                        mode = stack.pop() || MODE.selector;
                    }
                    else if (mode === newMode) {
                        flush(idx - 1);
                        out.push('.', ComponentStylesPrefixContent, scopeId);
                    }
                    else {
                        stack.push(mode);
                        mode = newMode;
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
}
function isIdent(ch) {
    return ((ch >= CHAR._0 && ch <= CHAR._9) ||
        (ch >= CHAR.A && ch <= CHAR.Z) ||
        (ch >= CHAR.a && ch <= CHAR.z) ||
        ch === CHAR.UNDERSCORE ||
        ch === CHAR.DASH);
}
var MODE;
(function (MODE) {
    MODE[MODE["selector"] = 0] = "selector";
    MODE[MODE["media"] = 1] = "media";
    MODE[MODE["body"] = 2] = "body";
    MODE[MODE["stringSingle"] = 3] = "stringSingle";
    MODE[MODE["stringDouble"] = 4] = "stringDouble";
    MODE[MODE["commentMultiline"] = 5] = "commentMultiline";
    MODE[MODE["EXIT"] = 6] = "EXIT";
})(MODE || (MODE = {}));
var CHAR;
(function (CHAR) {
    CHAR[CHAR["ANY"] = 0] = "ANY";
    CHAR[CHAR["IDENT"] = 1] = "IDENT";
    CHAR[CHAR["NOT_IDENT_AND_NOT_DOT"] = 2] = "NOT_IDENT_AND_NOT_DOT";
    CHAR[CHAR["SPACE"] = 32] = "SPACE";
    CHAR[CHAR["FORWARD_SLASH"] = 47] = "FORWARD_SLASH";
    CHAR[CHAR["DOUBLE_QUOTE"] = 34] = "DOUBLE_QUOTE";
    CHAR[CHAR["SINGLE_QUOTE"] = 39] = "SINGLE_QUOTE";
    CHAR[CHAR["STAR"] = 42] = "STAR";
    CHAR[CHAR["DASH"] = 45] = "DASH";
    CHAR[CHAR["DOT"] = 46] = "DOT";
    CHAR[CHAR["AT"] = 64] = "AT";
    CHAR[CHAR["A"] = 65] = "A";
    CHAR[CHAR["Z"] = 90] = "Z";
    CHAR[CHAR["_0"] = 48] = "_0";
    CHAR[CHAR["_9"] = 57] = "_9";
    CHAR[CHAR["BACKSLASH"] = 92] = "BACKSLASH";
    CHAR[CHAR["UNDERSCORE"] = 95] = "UNDERSCORE";
    CHAR[CHAR["a"] = 97] = "a";
    CHAR[CHAR["z"] = 122] = "z";
    CHAR[CHAR["OPEN_BRACE"] = 123] = "OPEN_BRACE";
    CHAR[CHAR["CLOSE_BRACE"] = 125] = "CLOSE_BRACE";
})(CHAR || (CHAR = {}));
const STATE_MACHINE = [
    [
        [CHAR.IDENT, CHAR.NOT_IDENT_AND_NOT_DOT, MODE.selector],
        [CHAR.ANY, CHAR.AT, MODE.media],
        [CHAR.ANY, CHAR.OPEN_BRACE, MODE.body],
        [CHAR.FORWARD_SLASH, CHAR.STAR, MODE.commentMultiline],
    ] /*selector*/,
    [
        [CHAR.ANY, CHAR.CLOSE_BRACE, MODE.EXIT],
        [CHAR.FORWARD_SLASH, CHAR.STAR, MODE.commentMultiline],
        [CHAR.ANY, CHAR.OPEN_BRACE, MODE.selector],
        [CHAR.FORWARD_SLASH, CHAR.STAR, MODE.commentMultiline],
    ] /*media*/,
    [
        [CHAR.ANY, CHAR.CLOSE_BRACE, MODE.EXIT],
        [CHAR.ANY, CHAR.SINGLE_QUOTE, MODE.stringSingle],
        [CHAR.ANY, CHAR.DOUBLE_QUOTE, MODE.stringDouble],
        [CHAR.FORWARD_SLASH, CHAR.STAR, MODE.commentMultiline],
    ] /*body*/,
    [[CHAR.ANY, CHAR.SINGLE_QUOTE, MODE.EXIT]] /*stringSingle*/,
    [[CHAR.ANY, CHAR.DOUBLE_QUOTE, MODE.EXIT]] /*stringDouble*/,
    [[CHAR.STAR, CHAR.FORWARD_SLASH, MODE.EXIT]] /*commentMultiline*/,
];

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
    const containerState = renderCtx.$containerState$;
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

export { $, Fragment, Resource, SSRComment, SSRStreamBlock, SkipRerender, Slot, _hW, _pauseFromContexts, _useMutableProps, component$, componentQrl, createContext, getPlatform, h, implicit$FirstArg, inlinedQrl, jsx, jsx as jsxDEV, jsx as jsxs, mutable, noSerialize, qrl, render, renderSSR, setPlatform, useCleanup$, useCleanupQrl, useClientEffect$, useClientEffectQrl, useContext, useContextProvider, useDocument, useEnvData, useLexicalScope, useMount$, useMountQrl, useOn, useOnDocument, useOnWindow, useRef, useResource$, useResourceQrl, useServerMount$, useServerMountQrl, useStore, useStyles$, useStylesQrl, useStylesScoped$, useStylesScopedQrl, useUserContext, useWatch$, useWatchQrl, version };
//# sourceMappingURL=core.mjs.map
