/**
 * @license
 * @builder.io/qwik
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
// minification can replace the `globalThis.qDev` with `false`
// which will remove all dev code within from the build
const qDev = true;
const qTest = globalThis.describe !== undefined;

const EMPTY_ARRAY = [];
const EMPTY_OBJ = {};
if (qDev) {
    Object.freeze(EMPTY_ARRAY);
    Object.freeze(EMPTY_OBJ);
    Error.stackTraceLimit = 9999;
}

function isElement$1(value) {
    return isNode$2(value) && value.nodeType == 1;
}
function isNode$2(value) {
    return value && typeof value.nodeType == 'number';
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
 * State factory of the component.
 */
/**
 * State factory of the component.
 */
const QHostAttr = 'q:host';
const OnRenderProp = 'q:renderFn';
/**
 * Component Styles.
 */
const ComponentScopedStyles = 'q:sstyle';
/**
 * Component style host prefix
 */
const ComponentStylesPrefixHost = '💎';
/**
 * Component style content prefix
 */
const ComponentStylesPrefixContent = '⭐️';
/**
 * `<some-element q:slot="...">`
 */
const QSlot = 'q:slot';
const QCtxAttr = 'q:ctx';
const QContainerAttr = 'q:container';
const QContainerSelector = '[q\\:container]';
const RenderEvent = 'qRender';
const ELEMENT_ID = 'q:id';
const ELEMENT_ID_PREFIX = '#';

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
const isStyleTask = (obj) => {
    return isObject(obj) && obj.type === 'style';
};
const tryGetInvokeContext = () => {
    if (!_context) {
        const context = typeof document !== 'undefined' && document && document.__q_context__;
        if (!context) {
            return undefined;
        }
        if (isArray(context)) {
            const element = context[0];
            const hostElement = getHostElement(element);
            assertDefined(hostElement, `invoke: can not find hostElement from active element`, element);
            return (document.__q_context__ = newInvokeContext(getDocument(element), hostElement, element, context[1], context[2]));
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
const useInvoke = (context, fn, ...args) => {
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
const getHostElement = (el) => {
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
};
const getContainer = (el) => {
    let container = el[CONTAINER];
    if (!container) {
        container = el.closest(QContainerSelector);
        el[CONTAINER] = container;
    }
    return container;
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

const fromCamelToKebabCase = (text) => {
    return text.replace(/([A-Z])/g, '-$1').toLowerCase();
};

const directSetAttribute = (el, prop, value) => {
    return el.setAttribute(prop, value);
};
const directGetAttribute = (el, prop) => {
    return el.getAttribute(prop);
};

const ON_PROP_REGEX = /^(window:|document:|)on([A-Z]|-.).*\$$/;
const isOnProp = (prop) => {
    return ON_PROP_REGEX.test(prop);
};
const qPropWriteQRL = (rctx, ctx, prop, value) => {
    if (!value) {
        return;
    }
    if (!ctx.$listeners$) {
        ctx.$listeners$ = getDomListeners(ctx.$element$);
    }
    const kebabProp = fromCamelToKebabCase(prop);
    const existingListeners = ctx.$listeners$.get(kebabProp) || [];
    const newQRLs = isArray(value) ? value : [value];
    for (const value of newQRLs) {
        const cp = value.$copy$();
        cp.$setContainer$(ctx.$element$);
        const capture = cp.$capture$;
        if (capture == null) {
            // we need to serialize the lexical scope references
            const captureRef = cp.$captureRef$;
            cp.$capture$ =
                captureRef && captureRef.length
                    ? captureRef.map((ref) => String(ctx.$refMap$.$add$(ref)))
                    : EMPTY_ARRAY;
        }
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
    ctx.$listeners$.set(kebabProp, existingListeners);
    const newValue = serializeQRLs(existingListeners, ctx);
    if (directGetAttribute(ctx.$element$, kebabProp) !== newValue) {
        setAttribute(rctx, ctx.$element$, kebabProp, newValue);
    }
};
const getDomListeners = (el) => {
    const attributes = el.attributes;
    const listeners = new Map();
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes.item(i);
        if (attr.name.startsWith('on:') ||
            attr.name.startsWith('on-window:') ||
            attr.name.startsWith('on-document:')) {
            let array = listeners.get(attr.name);
            if (!array) {
                listeners.set(attr.name, (array = []));
            }
            array.push(parseQRL(attr.value, el));
        }
    }
    return listeners;
};
const serializeQRLs = (existingQRLs, ctx) => {
    const opts = {
        $platform$: getPlatform(ctx.$element$),
        $element$: ctx.$element$,
    };
    return existingQRLs.map((qrl) => stringifyQRL(qrl, opts)).join('\n');
};

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

/**
 * @public
 */
const jsx = (type, props, key) => {
    return new JSXNodeImpl(type, props, key);
};
const HOST_TYPE = ':host';
const SKIP_RENDER_TYPE = ':skipRender';
class JSXNodeImpl {
    constructor(type, props, key = null) {
        this.type = type;
        this.props = props;
        this.key = key;
    }
}
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
    if (node.type === Host) {
        textType = HOST_TYPE;
    }
    else if (node.type === SkipRerender) {
        textType = SKIP_RENDER_TYPE;
    }
    else if (isFunction(node.type)) {
        const res = invocationContext
            ? useInvoke(invocationContext, () => node.type(node.props, node.key))
            : node.type(node.props, node.key);
        return processData(res, invocationContext);
    }
    else if (isString(node.type)) {
        textType = node.type;
    }
    else {
        throw qError(QError_invalidJsxNodeType, node.type);
    }
    let children = EMPTY_ARRAY;
    if (node.props) {
        const mightPromise = processData(node.props.children, invocationContext);
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
const processData = (node, invocationContext) => {
    if (node == null || typeof node === 'boolean') {
        return undefined;
    }
    if (isJSXNode(node)) {
        return processNode(node, invocationContext);
    }
    else if (isPromise(node)) {
        return node.then((node) => processData(node, invocationContext));
    }
    else if (isArray(node)) {
        const output = promiseAll(node.flatMap((n) => processData(n, invocationContext)));
        return then(output, (array) => array.flat(100).filter(isNotNullable));
    }
    else if (isString(node) || typeof node === 'number') {
        const newNode = new ProcessedJSXNodeImpl('#text', null, EMPTY_ARRAY, null);
        newNode.$text$ = String(node);
        return newNode;
    }
    else {
        logWarn('A unsupported value was passed to the JSX, skipping render. Value:', node);
        return undefined;
    }
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
/**
 * @public
 */
const Fragment = (props) => props.children;

const visitJsxNode = (ctx, elm, jsxNode, isSvg) => {
    if (jsxNode === undefined) {
        return smartUpdateChildren(ctx, elm, [], 'root', isSvg);
    }
    if (isArray(jsxNode)) {
        return smartUpdateChildren(ctx, elm, jsxNode.flat(), 'root', isSvg);
    }
    else if (jsxNode.$type$ === HOST_TYPE) {
        updateProperties(ctx, getContext(elm), jsxNode.$props$, isSvg, true);
        return smartUpdateChildren(ctx, elm, jsxNode.$children$ || [], 'root', isSvg);
    }
    else {
        return smartUpdateChildren(ctx, elm, [jsxNode], 'root', isSvg);
    }
};

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

/**
 * @public
 */
const styleKey = (qStyles, index) => {
    return `${hashCode(qStyles.getHash())}-${index}`;
};
/**
 * @public
 */
const styleHost = (styleId) => {
    return ComponentStylesPrefixHost + styleId;
};
/**
 * @public
 */
const styleContent = (styleId) => {
    return ComponentStylesPrefixContent + styleId;
};

const renderComponent = (rctx, ctx) => {
    ctx.$dirty$ = false;
    const hostElement = ctx.$element$;
    const onRenderQRL = ctx.$renderQrl$;
    assertDefined(onRenderQRL, `render: host element to render must has a $renderQrl$:`, ctx);
    const props = ctx.$props$;
    assertDefined(props, `render: host element to render must has defined props`, ctx);
    // Component is not dirty any more
    rctx.$containerState$.$hostsStaging$.delete(hostElement);
    const newCtx = copyRenderContext(rctx);
    // Invoke render hook
    const invocatinContext = newInvokeContext(rctx.$doc$, hostElement, hostElement, RenderEvent);
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
                return renderComponent(rctx, ctx);
            }
            let componentCtx = ctx.$component$;
            if (!componentCtx) {
                componentCtx = ctx.$component$ = {
                    $hostElement$: hostElement,
                    $slots$: [],
                    $styleHostClass$: undefined,
                    $styleClass$: undefined,
                    $styleId$: undefined,
                };
                const scopedStyleId = directGetAttribute(hostElement, ComponentScopedStyles) ?? undefined;
                if (scopedStyleId) {
                    componentCtx.$styleId$ = scopedStyleId;
                    componentCtx.$styleHostClass$ = styleHost(scopedStyleId);
                    componentCtx.$styleClass$ = styleContent(scopedStyleId);
                    hostElement.classList.add(componentCtx.$styleHostClass$);
                }
            }
            componentCtx.$slots$ = [];
            newCtx.$contexts$.push(ctx);
            newCtx.$currentComponent$ = componentCtx;
            const invocatinContext = newInvokeContext(rctx.$doc$, hostElement, hostElement);
            invocatinContext.$subscriber$ = hostElement;
            invocatinContext.$renderCtx$ = newCtx;
            const processedJSXNode = processData(jsxNode, invocatinContext);
            return then(processedJSXNode, (processedJSXNode) => {
                return visitJsxNode(newCtx, hostElement, processedJSXNode, false);
            });
        });
    }, (err) => {
        logError(err);
    });
};

const isNode$1 = (value) => {
    return value && typeof value.nodeType == 'number';
};
const isDocument = (value) => {
    return value && value.nodeType == 9;
};
const isElement = (value) => {
    return isNode$1(value) && value.nodeType === 1;
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
 *     <Host>
 *       <div>Counter: {counter.value}</div>
 *       <Child userData={userData} state={state} />
 *     </Host>
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
 *   useClientEffect$((track) => {
 *     const el = track(input, 'current')!;
 *     el.focus();
 *   });
 *
 *   return (
 *     <Host>
 *       <input type="text" ref={input} />
 *     </Host>
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
/**
 * @alpha
 */
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
 * have access to the JSX. Otherwise, it's adding a JSX listener in the `<Host>` is a better
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
 *   return <Host>Profit!</Host>;
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
 *   return <Host>Profit!</Host>;
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
    qPropWriteQRL(invokeCtx.$renderCtx$, ctx, eventName, eventQrl);
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
/**
 * @alpha
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
 * @alpha
 */
const useResource$ = (generatorFn) => {
    return useResourceQrl($(generatorFn));
};
const useIsServer = () => {
    const ctx = getInvokeContext();
    assertDefined(ctx.$doc$, 'doc must be defined', ctx);
    return isServer(ctx.$doc$);
};
/**
 * @alpha
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
    const promise = props.resource.promise.then(props.onResolved, props.onRejected);
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
        return `2`;
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
        result.promise = Promise.reject();
    }
    return result;
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
 *   useWatch$((track) => {
 *     const count = track(store, 'count');
 *     store.doubleCount = 2 * count;
 *   });
 *
 *   // Debouncer watch
 *   useWatch$((track) => {
 *     const doubleCount = track(store, 'doubleCount');
 *     const timer = setTimeout(() => {
 *       store.debounced = doubleCount;
 *     }, 2000);
 *     return () => {
 *       clearTimeout(timer);
 *     };
 *   });
 *   return (
 *     <Host>
 *       <div>
 *         {store.count} / {store.doubleCount}
 *       </div>
 *       <div>{store.debounced}</div>
 *     </Host>
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
 *   useWatch$((track) => {
 *     const count = track(store, 'count');
 *     store.doubleCount = 2 * count;
 *   });
 *
 *   // Debouncer watch
 *   useWatch$((track) => {
 *     const doubleCount = track(store, 'doubleCount');
 *     const timer = setTimeout(() => {
 *       store.debounced = doubleCount;
 *     }, 2000);
 *     return () => {
 *       clearTimeout(timer);
 *     };
 *   });
 *   return (
 *     <Host>
 *       <div>
 *         {store.count} / {store.doubleCount}
 *       </div>
 *       <div>{store.debounced}</div>
 *     </Host>
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
 *   return <Host>{store.count}</Host>;
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
 *   return <Host>{store.count}</Host>;
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
 *     <Host>
 *       {store.users.map((user) => (
 *         <User user={user} />
 *       ))}
 *     </Host>
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
        return get;
    }
    if (isServer(ctx.$doc$)) {
        const resource = createResourceFromPromise(mountQrl(), ctx.$renderCtx$.$containerState$);
        ctx.$waitOn$.push(resource.promise);
        set(resource);
        return resource;
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
 *     <Host>
 *       {store.users.map((user) => (
 *         <User user={user} />
 *       ))}
 *     </Host>
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
 *     <Host>
 *       <p>The temperature is: ${store.temp}</p>
 *     </Host>
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
        return get;
    }
    const resource = createResourceFromPromise(mountQrl(), ctx.$renderCtx$.$containerState$);
    ctx.$waitOn$.push(resource.promise);
    set(resource);
    return resource;
};
const createResourceFromPromise = (promise, containerState) => {
    const resource = createResourceReturn(containerState, undefined, promise.then((value) => {
        resource.state = 'resolved';
        resource.resolved = value;
        return value;
    }, (reason) => {
        resource.state = 'rejected';
        resource.error = reason;
        throw reason;
    }));
    return resource;
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
 *     <Host>
 *       <p>The temperature is: ${store.temp}</p>
 *     </Host>
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
    const invokationContext = newInvokeContext(doc, el, el, 'WatchEvent');
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
    // Execute mutation inside empty invokation
    useInvoke(invokationContext, () => {
        resource.state = 'pending';
        resource.resolved = undefined;
        resource.promise = new Promise((r, re) => {
            resolve = r;
            reject = re;
        });
    });
    watch.$destroy$ = noSerialize(() => {
        cleanups.forEach((fn) => fn());
        reject('cancelled');
    });
    let done = false;
    const promise = safeCall(() => then(waitOn, () => watchFn(opts)), (value) => {
        if (!done) {
            done = true;
            resource.state = 'resolved';
            resource.resolved = value;
            resource.error = undefined;
            resolve(value);
        }
        return;
    }, (reason) => {
        if (!done) {
            done = true;
            resource.state = 'rejected';
            resource.resolved = undefined;
            resource.error = noSerialize(reason);
            reject(reason);
        }
        return;
    });
    const timeout = resourceTarget.timeout;
    if (timeout) {
        return Promise.race([
            promise,
            delay(timeout).then(() => {
                if (!done) {
                    done = true;
                    resource.state = 'rejected';
                    resource.resolved = undefined;
                    resource.error = 'timeout';
                    cleanupWatch(watch);
                    reject('timeout');
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
    const invokationContext = newInvokeContext(doc, el, el, 'WatchEvent');
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
    return safeCall(() => watchFn(track), (returnValue) => {
        if (isFunction(returnValue)) {
            watch.$destroy$ = noSerialize(returnValue);
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
    const watchHandler = createQRL(watchQrl.$chunk$, 'handleWatch', handleWatch, null, null, [watch], watchQrl.$symbol$);
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

const emitEvent = (el, eventName, detail, bubbles) => {
    if (el && typeof CustomEvent === 'function') {
        el.dispatchEvent(new CustomEvent(eventName, {
            detail,
            bubbles: bubbles,
            composed: bubbles,
        }));
    }
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
const DocumentSerializer = {
    test: (v) => isDocument(v),
    prepare: (_, containerState) => {
        return getDocument(containerState.$containerEl$);
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
const serializers = [
    UndefinedSerializer,
    QRLSerializer,
    DocumentSerializer,
    ResourceSerializer,
    WatchSerializer,
    URLSerializer,
    RegexSerializer,
    DateSerializer,
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
const createParser = (getObject, containerState) => {
    const map = new Map();
    return {
        prepare(data) {
            for (let i = 0; i < serializers.length; i++) {
                const s = serializers[i];
                const prefix = String.fromCodePoint(i);
                if (data.startsWith(prefix)) {
                    const value = s.prepare(data.slice(prefix.length), containerState);
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
    const data = await pauseState(containerEl);
    const script = doc.createElement('script');
    directSetAttribute(script, 'type', 'qwik/json');
    script.textContent = escapeText(JSON.stringify(data.state, undefined, qDev ? '  ' : undefined));
    parentJSON.appendChild(script);
    directSetAttribute(containerEl, QContainerAttr, 'paused');
    return data;
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
    const meta = JSON.parse(unescapeText(script.textContent || '{}'));
    // Collect all elements
    const elements = new Map();
    const getObject = (id) => {
        return getObjectImpl(id, elements, meta.objs, containerState);
    };
    getNodesInScope(containerEl, hasQId).forEach((el) => {
        const id = directGetAttribute(el, ELEMENT_ID);
        assertDefined(id, `resume: element missed q:id`, el);
        elements.set(ELEMENT_ID_PREFIX + id, el);
    });
    const parser = createParser(getObject, containerState);
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
            ctx.$refMap$.$array$.push(...qobj.split(' ').map((part) => getObject(part)));
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
            assertDefined(props, `resume: props missing in q:host attribute`, host);
            assertDefined(renderQrl, `resume: renderQRL missing in q:host attribute`, host);
            ctx.$props$ = getObject(props);
            ctx.$renderQrl$ = getObject(renderQrl);
        }
    });
    directSetAttribute(containerEl, QContainerAttr, 'resumed');
    logDebug('Container resumed');
    emitEvent(containerEl, 'qresume', undefined, true);
};
const hasContext = (el) => {
    return !!tryGetContext(el);
};
const pauseState = async (containerEl) => {
    const containerState = getContainerState(containerEl);
    const doc = getDocument(containerEl);
    const elementToIndex = new Map();
    const collector = createCollector(doc, containerState);
    // Collect all qObjected around the DOM
    const elements = getNodesInScope(containerEl, hasContext);
    // Collect all listeners
    const listeners = [];
    for (const node of elements) {
        const ctx = tryGetContext(node);
        if (ctx.$listeners$) {
            ctx.$listeners$.forEach((qrls, key) => {
                qrls.forEach((qrl) => {
                    listeners.push({
                        key,
                        qrl,
                        el: node,
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
        for (const obj of ctx.$refMap$.$array$) {
            await collectValue(obj, collector, true);
        }
    }
    // If at this point any component can render, we need to capture Context and Props
    const canRender = collector.$elements$.length > 0;
    if (canRender) {
        for (const node of elements) {
            const ctx = tryGetContext(node);
            await collectProps(node, ctx.$props$, collector);
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
                id = directGetAttribute(el, ELEMENT_ID);
                if (!id) {
                    console.warn('Missing ID');
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
            obj = getPromiseValue(obj);
            suffix += '~';
        }
        if (isObject(obj)) {
            const target = getProxyTarget(obj);
            if (target) {
                suffix += '!';
                obj = target;
            }
            if (!target && isElement(obj)) {
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
                if (isElement(key)) {
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
    elements.forEach((node) => {
        const ctx = tryGetContext(node);
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
        if (ref.$array$.length > 0) {
            const value = ref.$array$.map(mustGetObjId).join(' ');
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
    // async function additionalChunk(obj: any) {
    //   const localCollector = createCollector(doc, containerState);
    //   localCollector.$seen$ = collector.$seen$;
    //   localCollector.$seenLeaks$ = collector.$seenLeaks$;
    //   await collectValue(obj, collector, false);
    //   return '';
    // }
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
        // if (isResourceWatch(watch)) {
        //   const resource = getInternalResource(watch.r);
        //   if (resource.dirty) {
        //     pendingResources.push(resource.promise.then(additionalChunk));
        //   }
        // } else {
        //   destroyWatch(watch);
        // }
    }
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
const getNodesInScope = (parent, predicate) => {
    const nodes = [];
    if (predicate(parent)) {
        nodes.push(parent);
    }
    walkNodes(nodes, parent, predicate);
    return nodes;
};
const walkNodes = (nodes, parent, predicate) => {
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
};
const getObjectImpl = (id, elements, objs, containerState) => {
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
const createCollector = (doc, containerState) => {
    return {
        $seen$: new Set(),
        $seenLeaks$: new Set(),
        $objMap$: new Map(),
        $elements$: [],
        $watches$: [],
        $containerState$: containerState,
        $doc$: doc,
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
        for (const obj of ctx.$refMap$.$array$) {
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
            if (isElement(key)) {
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
        promise[PROMISE_VALUE] = value;
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
                const resolved = await resolvePromise(obj);
                await collectValue(resolved, collector, leaks);
                return;
            }
            const target = getProxyTarget(obj);
            // Handle dom nodes
            if (!target && isNode$1(obj)) {
                if (obj.nodeType === 9) {
                    assertTrue(obj === collector.$doc$, 'Document reference is not from the same page', obj);
                    collector.$objMap$.set(obj, obj);
                }
                else if (obj.nodeType !== 1) {
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
    return el.hasAttribute(QContainerAttr);
};
const hasQId = (el) => {
    return el.hasAttribute(ELEMENT_ID);
};
const intToStr = (nu) => {
    return nu.toString(36);
};
const strToInt = (nu) => {
    return parseInt(nu, 36);
};

const SVG_NS = 'http://www.w3.org/2000/svg';
const smartUpdateChildren = (ctx, elm, ch, mode, isSvg) => {
    if (ch.length === 1 && ch[0].$type$ === SKIP_RENDER_TYPE) {
        if (elm.firstChild !== null) {
            return;
        }
        ch = ch[0].$children$;
    }
    const isHead = elm.nodeName === 'HEAD';
    if (isHead) {
        mode = 'head';
    }
    const oldCh = getChildren(elm, mode);
    if (qDev) {
        if (elm.nodeType === 9) {
            if (ch.length !== 1 || ch[0].$type$ !== 'html') {
                throw qError(QError_rootNodeMustBeHTML, ch);
            }
        }
        else if (elm.nodeName === 'HTML') {
            if (ch.length !== 2 || ch[0].$type$ !== 'head' || ch[1].$type$ !== 'body') {
                throw qError(QError_strictHTMLChildren, ch);
            }
        }
    }
    if (oldCh.length > 0 && ch.length > 0) {
        return updateChildren(ctx, elm, oldCh, ch, isSvg, isHead);
    }
    else if (ch.length > 0) {
        return addVnodes(ctx, elm, null, ch, 0, ch.length - 1, isSvg, isHead);
    }
    else if (oldCh.length > 0) {
        return removeVnodes(ctx, oldCh, 0, oldCh.length - 1);
    }
};
const updateChildren = (ctx, parentElm, oldCh, newCh, isSvg, isHead) => {
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
            idxInOld = oldKeyToIdx[newStartVnode.$key$];
            if (idxInOld === undefined) {
                // New element
                const newElm = createElm(ctx, newStartVnode, isSvg, isHead);
                results.push(then(newElm, (newElm) => {
                    insertBefore(ctx, parentElm, newElm, oldStartVnode);
                }));
            }
            else {
                elmToMove = oldCh[idxInOld];
                if (!isTagName(elmToMove, newStartVnode.$type$)) {
                    const newElm = createElm(ctx, newStartVnode, isSvg, isHead);
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
        const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$;
        results.push(addVnodes(ctx, parentElm, before, newCh, newStartIdx, newEndIdx, isSvg, isHead));
    }
    let wait = promiseAll(results);
    if (oldStartIdx <= oldEndIdx) {
        const canRemove = parentElm.nodeName !== 'HEAD';
        if (canRemove) {
            wait = then(wait, () => {
                removeVnodes(ctx, oldCh, oldStartIdx, oldEndIdx);
            });
        }
    }
    return wait;
};
const isComponentNode = (node) => {
    return node.$props$ && OnRenderProp in node.$props$;
};
const getCh = (elm, filter) => {
    return Array.from(elm.childNodes).filter(filter);
};
const getChildren = (elm, mode) => {
    switch (mode) {
        case 'default':
            return getCh(elm, isNode);
        case 'slot':
            return getCh(elm, isChildSlot);
        case 'root':
            return getCh(elm, isChildComponent);
        case 'fallback':
            return getCh(elm, isFallback);
        case 'head':
            return getCh(elm, isHeadChildren);
    }
};
const isNode = (elm) => {
    const type = elm.nodeType;
    return type === 1 || type === 3;
};
const isFallback = (node) => {
    return node.nodeName === 'Q:FALLBACK';
};
const isHeadChildren = (node) => {
    return isElement(node) && (node.hasAttribute('q:head') || node.nodeName === 'TITLE');
};
const isChildSlot = (node) => {
    return isNode(node) && node.nodeName !== 'Q:FALLBACK' && node.nodeName !== 'Q:TEMPLATE';
};
const isSlotTemplate = (node) => {
    return node.nodeName === 'Q:TEMPLATE';
};
const isChildComponent = (node) => {
    return isNode(node) && node.nodeName !== 'Q:TEMPLATE';
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
const patchVnode = (rctx, elm, vnode, isSvg) => {
    vnode.$elm$ = elm;
    const tag = vnode.$type$;
    if (tag === '#text') {
        if (elm.data !== vnode.$text$) {
            setProperty(rctx, elm, 'data', vnode.$text$);
        }
        return;
    }
    if (tag === HOST_TYPE) {
        throw qError(QError_hostCanOnlyBeAtRoot);
    }
    if (tag === SKIP_RENDER_TYPE) {
        return;
    }
    if (!isSvg) {
        isSvg = tag === 'svg';
    }
    const props = vnode.$props$;
    const ctx = getContext(elm);
    const isSlot = tag === QSlot;
    let dirty = updateProperties(rctx, ctx, props, isSvg, false);
    if (isSvg && vnode.$type$ === 'foreignObject') {
        isSvg = false;
    }
    else if (isSlot) {
        const currentComponent = rctx.$currentComponent$;
        if (currentComponent) {
            currentComponent.$slots$.push(vnode);
        }
    }
    const isComponent = isComponentNode(vnode);
    const ch = vnode.$children$;
    if (isComponent) {
        if (!dirty && !ctx.$renderQrl$ && !ctx.$element$.hasAttribute(QHostAttr)) {
            setAttribute(rctx, ctx.$element$, QHostAttr, '');
            setAttribute(rctx, ctx.$element$, ELEMENT_ID, getNextIndex(rctx));
            ctx.$renderQrl$ = props[OnRenderProp];
            assertQrl(ctx.$renderQrl$);
            dirty = true;
        }
        const promise = dirty ? renderComponent(rctx, ctx) : undefined;
        return then(promise, () => {
            const slotMaps = getSlots(ctx.$component$, elm);
            const splittedChidren = splitBy(ch, getSlotName);
            const promises = [];
            const slotRctx = copyRenderContext(rctx);
            slotRctx.$contexts$.push(ctx);
            // Mark empty slots and remove content
            Object.entries(slotMaps.slots).forEach(([key, slotEl]) => {
                if (slotEl && !splittedChidren[key]) {
                    const oldCh = getChildren(slotEl, 'slot');
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
                promises.push(smartUpdateChildren(slotRctx, slotElm, ch, 'slot', isSvg));
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
    const mode = isSlot ? 'fallback' : 'default';
    return smartUpdateChildren(rctx, elm, ch, mode, isSvg);
};
const addVnodes = (ctx, parentElm, before, vnodes, startIdx, endIdx, isSvg, isHead) => {
    const promises = [];
    for (; startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx];
        assertDefined(ch, 'render: node must be defined at index', startIdx, vnodes);
        promises.push(createElm(ctx, ch, isSvg, isHead));
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
let refCount = 0;
const RefSymbol = Symbol();
const setSlotRef = (ctx, hostElm, slotEl) => {
    let ref = hostElm[RefSymbol] ?? directGetAttribute(hostElm, 'q:sref');
    if (ref === null) {
        ref = intToStr(refCount++);
        hostElm[RefSymbol] = ref;
        setAttribute(ctx, hostElm, 'q:sref', ref);
    }
    directSetAttribute(slotEl, 'q:sref', ref);
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
            const slotChildren = getChildren(slotEl, 'slot');
            template.append(...slotChildren);
            hostElm.insertBefore(template, hostElm.firstChild);
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
                slotEl.append(...getChildren(template, 'default'));
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
const createElm = (rctx, vnode, isSvg, isHead) => {
    rctx.$perf$.$visited$++;
    const tag = vnode.$type$;
    if (tag === '#text') {
        return (vnode.$elm$ = createTextNode(rctx, vnode.$text$));
    }
    if (tag === HOST_TYPE) {
        throw qError(QError_hostCanOnlyBeAtRoot);
    }
    if (!isSvg) {
        isSvg = tag === 'svg';
    }
    const props = vnode.$props$;
    const elm = (vnode.$elm$ = createElement(rctx, tag, isSvg));
    const isComponent = isComponentNode(vnode);
    const ctx = getContext(elm);
    setKey(elm, vnode.$key$);
    updateProperties(rctx, ctx, props, isSvg, false);
    if (isHead) {
        directSetAttribute(elm, 'q:head', '');
    }
    if (isSvg && tag === 'foreignObject') {
        isSvg = false;
    }
    const currentComponent = rctx.$currentComponent$;
    if (currentComponent) {
        const styleTag = currentComponent.$styleClass$;
        if (styleTag) {
            classlistAdd(rctx, elm, styleTag);
        }
        if (tag === QSlot || tag === 'html') {
            setSlotRef(rctx, currentComponent.$hostElement$, elm);
            currentComponent.$slots$.push(vnode);
        }
    }
    const hasRef = props && 'ref' in props;
    if (isComponent || ctx.$listeners$ || hasRef) {
        directSetAttribute(ctx.$element$, ELEMENT_ID, getNextIndex(rctx));
    }
    let wait;
    if (isComponent) {
        // Run mount hook
        const renderQRL = props[OnRenderProp];
        assertQrl(renderQRL);
        ctx.$renderQrl$ = renderQRL;
        directSetAttribute(ctx.$element$, QHostAttr, '');
        wait = renderComponent(rctx, ctx);
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
        let children = vnode.$children$;
        if (children.length > 0) {
            if (children.length === 1 && children[0].$type$ === SKIP_RENDER_TYPE) {
                children = children[0].$children$;
            }
            const slotRctx = copyRenderContext(rctx);
            slotRctx.$contexts$.push(ctx);
            const slotMap = isComponent ? getSlots(ctx.$component$, elm) : undefined;
            const promises = children.map((ch) => createElm(slotRctx, ch, isSvg, false));
            return then(promiseAll(promises), () => {
                let parent = elm;
                for (const node of children) {
                    if (slotMap) {
                        parent = getSlotElement(slotRctx, slotMap, elm, getSlotName(node));
                    }
                    parent.appendChild(node.$elm$);
                }
                return elm;
            });
        }
        return elm;
    });
};
const getNextIndex = (ctx) => {
    return intToStr(ctx.$containerState$.$elementIndex$++);
};
const getSlots = (componentCtx, hostElm) => {
    if (hostElm.localName === 'html') {
        return { slots: { '': hostElm }, templates: {} };
    }
    const slots = {};
    const templates = {};
    const slotRef = directGetAttribute(hostElm, 'q:sref');
    const existingSlots = Array.from(hostElm.querySelectorAll(`q\\:slot[q\\:sref="${slotRef}"]`));
    const newSlots = componentCtx?.$slots$ ?? EMPTY_ARRAY;
    const t = Array.from(hostElm.children).filter(isSlotTemplate);
    // Map slots
    for (const elm of existingSlots) {
        slots[directGetAttribute(elm, 'name') ?? ''] = elm;
    }
    // Map virtual slots
    for (const vnode of newSlots) {
        slots[vnode.$props$?.name ?? ''] = vnode.$elm$;
    }
    // Map templates
    for (const elm of t) {
        templates[directGetAttribute(elm, QSlot) ?? ''] = elm;
    }
    return { slots, templates };
};
const handleStyle = (ctx, elm, _, newValue) => {
    setAttribute(ctx, elm, 'style', stringifyClassOrStyle(newValue, false));
    return true;
};
const handleClass = (ctx, elm, _, newValue) => {
    setAttribute(ctx, elm, 'class', stringifyClassOrStyle(newValue, true));
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
    class: handleClass,
    className: handleClass,
    value: checkBeforeAssign,
    checked: checkBeforeAssign,
    [dangerouslySetInnerHTML]: setInnerHTML,
};
const ALLOWS_PROPS = ['class', 'className', 'style', 'id', QSlot];
const HOST_PREFIX = 'host:';
const SCOPE_PREFIX = /^(host|window|document|prevent(d|D)efault):/;
const updateProperties = (rctx, ctx, expectProps, isSvg, isHost) => {
    if (!expectProps) {
        return false;
    }
    const elm = ctx.$element$;
    const isCmp = OnRenderProp in expectProps;
    const qwikProps = isCmp ? getPropsMutator(ctx, rctx.$containerState$) : undefined;
    for (let key of Object.keys(expectProps)) {
        if (key === 'children' || key === OnRenderProp) {
            continue;
        }
        const newValue = expectProps[key];
        if (key === 'ref') {
            newValue.current = elm;
            continue;
        }
        // Early exit if value didnt change
        const cacheKey = isHost ? `_host:${key}` : `_:${key}`;
        const oldValue = ctx.$cache$.get(cacheKey);
        if (newValue === oldValue) {
            continue;
        }
        ctx.$cache$.set(cacheKey, newValue);
        // Check of data- or aria-
        if (key.startsWith('data-') || key.startsWith('aria-')) {
            setAttribute(rctx, elm, key, newValue);
            continue;
        }
        if (qwikProps) {
            const skipProperty = ALLOWS_PROPS.includes(key);
            const hasPrefix = SCOPE_PREFIX.test(key);
            if (!skipProperty && !hasPrefix) {
                // Qwik props
                qwikProps.set(key, newValue);
                continue;
            }
            const hPrefixed = key.startsWith(HOST_PREFIX);
            if (hPrefixed) {
                key = key.slice(HOST_PREFIX.length);
            }
        }
        else if (qDev && key.startsWith(HOST_PREFIX)) {
            logWarn(`${HOST_PREFIX} prefix can not be used in non components`);
            continue;
        }
        if (isOnProp(key)) {
            setEvent(rctx, ctx, key, newValue);
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
            setProperty(rctx, elm, key, newValue);
            continue;
        }
        // Fallback to render attribute
        setAttribute(rctx, elm, key, newValue);
    }
    return ctx.$dirty$;
};
const createRenderContext = (doc, containerState, containerEl) => {
    const ctx = {
        $doc$: doc,
        $containerState$: containerState,
        $containerEl$: containerEl,
        $hostElements$: new Set(),
        $operations$: [],
        $roots$: [],
        $contexts$: [],
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
        $contexts$: [...ctx.$contexts$],
    };
    return newCtx;
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
const classlistAdd = (ctx, el, hostStyleTag) => {
    const fn = () => {
        el.classList.add(hostStyleTag);
    };
    ctx.$operations$.push({
        $el$: el,
        $operation$: 'classlist-add',
        $args$: [hostStyleTag],
        $fn$: fn,
    });
};
const setProperty = (ctx, node, key, value) => {
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
        parent.insertBefore(newChild, refChild ? refChild : null);
    };
    ctx.$operations$.push({
        $el$: parent,
        $operation$: 'insert-before',
        $args$: [newChild, refChild],
        $fn$: fn,
    });
    return newChild;
};
const appendStyle = (ctx, hostElement, styleTask) => {
    const fn = () => {
        const containerEl = ctx.$containerEl$;
        const isDoc = ctx.$doc$.documentElement === containerEl && !!ctx.$doc$.head;
        const style = ctx.$doc$.createElement('style');
        directSetAttribute(style, 'q:style', styleTask.styleId);
        style.textContent = styleTask.content;
        if (isDoc) {
            ctx.$doc$.head.appendChild(style);
        }
        else {
            containerEl.insertBefore(style, containerEl.firstChild);
        }
    };
    ctx.$operations$.push({
        $el$: hostElement,
        $operation$: 'append-style',
        $args$: [styleTask],
        $fn$: fn,
    });
};
const hasStyle = (ctx, styleId) => {
    const containerEl = ctx.$containerEl$;
    const doc = getDocument(containerEl);
    const hasOperation = ctx.$operations$.some((op) => {
        if (op.$operation$ === 'append-style') {
            const s = op.$args$[0];
            if (isStyleTask(s)) {
                return s.styleId === styleId;
            }
        }
        return false;
    });
    if (hasOperation) {
        return true;
    }
    const stylesParent = doc.documentElement === containerEl ? doc.head ?? containerEl : containerEl;
    return !!stylesParent.querySelector(`style[q\\:style="${styleId}"]`);
};
const prepend = (ctx, parent, newChild) => {
    const fn = () => {
        parent.insertBefore(newChild, parent.firstChild);
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
        const parent = el.parentNode;
        if (parent) {
            if (el.nodeType === 1) {
                cleanupTree(el, ctx.$containerState$.$subsManager$);
            }
            parent.removeChild(el);
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
    if (parent.nodeName === 'Q:SLOT') {
        return;
    }
    if (parent.hasAttribute(QHostAttr)) {
        cleanupElement(parent, subsManager);
    }
    let child = parent.firstElementChild;
    while (child) {
        cleanupTree(child, subsManager);
        child = child.nextElementSibling;
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
    const before = ctx.$roots$.map((elm) => getSlots(undefined, elm));
    executeContext(ctx);
    const after = ctx.$roots$.map((elm) => getSlots(undefined, elm));
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
    const isElement = elm.nodeType === 1;
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
    return props && ('innerHTML' in props || dangerouslySetInnerHTML in props);
};
const stringifyClassOrStyle = (obj, isClass) => {
    if (obj == null)
        return '';
    if (typeof obj == 'object') {
        let text = '';
        let sep = '';
        if (isArray(obj)) {
            if (!isClass) {
                throw qError(QError_stringifyClassOrStyle, obj, 'style');
            }
            for (let i = 0; i < obj.length; i++) {
                text += sep + obj[i];
                sep = ' ';
            }
        }
        else {
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    if (value) {
                        text += isClass
                            ? value
                                ? sep + key
                                : ''
                            : sep + fromCamelToKebabCase(key) + ':' + value;
                        sep = isClass ? ' ' : ';';
                    }
                }
            }
        }
        return text;
    }
    return String(obj);
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
 * @public
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
    const obj = hostCtx.$refMap$.$get$(int);
    assertTrue(hostCtx.$refMap$.$array$.length > int, 'out of bounds infrate access', ref);
    return obj;
};

const CONTAINER_STATE = Symbol('ContainerState');
const getContainerState = (containerEl) => {
    let set = containerEl[CONTAINER_STATE];
    if (!set) {
        containerEl[CONTAINER_STATE] = set = {
            $containerEl$: containerEl,
            $proxyMap$: new WeakMap(),
            $subsManager$: createSubscriptionManager(),
            $platform$: getPlatform(containerEl),
            $watchNext$: new Set(),
            $watchStaging$: new Set(),
            $hostsNext$: new Set(),
            $hostsStaging$: new Set(),
            $renderPromise$: undefined,
            $hostsRendering$: undefined,
            $userContext$: {},
            $elementIndex$: 0,
        };
    }
    return set;
};
const notifyChange = (subscriber) => {
    if (isElement(subscriber)) {
        notifyRender(subscriber);
    }
    else {
        notifyWatch(subscriber);
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
const notifyRender = (hostElement) => {
    assertDefined(directGetAttribute(hostElement, QHostAttr), 'render: notified element must be a component', hostElement);
    const containerEl = getContainer(hostElement);
    assertDefined(containerEl, 'render: host element need to be inside a q:container', hostElement);
    const state = getContainerState(containerEl);
    if (qDev &&
        !qTest &&
        state.$platform$.isServer &&
        directGetAttribute(containerEl, QContainerAttr) === 'paused') {
        logWarn('Can not rerender in server platform');
        return undefined;
    }
    resumeIfNeeded(containerEl);
    const ctx = getContext(hostElement);
    assertDefined(ctx.$renderQrl$, `render: notified host element must have a defined $renderQrl$`, ctx);
    if (ctx.$dirty$) {
        return;
    }
    ctx.$dirty$ = true;
    const activeRendering = state.$hostsRendering$ !== undefined;
    if (activeRendering) {
        assertDefined(state.$renderPromise$, 'render: while rendering, $renderPromise$ must be defined', state);
        state.$hostsStaging$.add(hostElement);
    }
    else {
        state.$hostsNext$.add(hostElement);
        scheduleFrame(containerEl, state);
    }
};
const notifyWatch = (watch) => {
    if (watch.$flags$ & WatchFlagsIsDirty) {
        return;
    }
    watch.$flags$ |= WatchFlagsIsDirty;
    const containerEl = getContainer(watch.$el$);
    const state = getContainerState(containerEl);
    const activeRendering = state.$hostsRendering$ !== undefined;
    if (activeRendering) {
        assertDefined(state.$renderPromise$, 'render: while rendering, $renderPromise$ must be defined', state);
        state.$watchStaging$.add(watch);
    }
    else {
        state.$watchNext$.add(watch);
        scheduleFrame(containerEl, state);
    }
};
const scheduleFrame = (containerEl, containerState) => {
    if (containerState.$renderPromise$ === undefined) {
        containerState.$renderPromise$ = containerState.$platform$.nextTick(() => renderMarked(containerEl, containerState));
    }
    return containerState.$renderPromise$;
};
/**
 * Low-level API used by the Optimizer to process `useWatch$()` API. This method
 * is not intended to be used by developers.
 * @alpha
 */
const handleWatch = () => {
    const [watch] = useLexicalScope();
    notifyWatch(watch);
};
const renderMarked = async (containerEl, containerState) => {
    const hostsRendering = (containerState.$hostsRendering$ = new Set(containerState.$hostsNext$));
    containerState.$hostsNext$.clear();
    await executeWatchesBefore(containerState);
    containerState.$hostsStaging$.forEach((host) => {
        hostsRendering.add(host);
    });
    containerState.$hostsStaging$.clear();
    const doc = getDocument(containerEl);
    const platform = containerState.$platform$;
    const renderingQueue = Array.from(hostsRendering);
    sortNodes(renderingQueue);
    const ctx = createRenderContext(doc, containerState, containerEl);
    for (const el of renderingQueue) {
        if (!ctx.$hostElements$.has(el)) {
            ctx.$roots$.push(el);
            try {
                await renderComponent(ctx, getContext(el));
            }
            catch (e) {
                logError(codeToText(QError_errorWhileRendering), e);
            }
        }
    }
    // Early exist, no dom operations
    if (ctx.$operations$.length === 0) {
        printRenderStats(ctx);
        postRendering(containerEl, containerState, ctx);
        return ctx;
    }
    return platform.raf(() => {
        executeContextWithSlots(ctx);
        printRenderStats(ctx);
        postRendering(containerEl, containerState, ctx);
        return ctx;
    });
};
const postRendering = async (containerEl, containerState, ctx) => {
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
        scheduleFrame(containerEl, containerState);
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
    elements.sort((a, b) => (a.compareDocumentPosition(b) & 2 ? 1 : -1));
};
const sortWatches = (watches) => {
    watches.sort((a, b) => {
        if (a.$el$ === b.$el$) {
            return a.$index$ < b.$index$ ? -1 : 1;
        }
        return (a.$el$.compareDocumentPosition(b.$el$) & 2) !== 0 ? 1 : -1;
    });
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
const createSubscriptionManager = () => {
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
                            notifyChange(subscriber);
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
        if (isNode$1(nakedValue)) {
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
                if (isPromise(unwrapped))
                    return value;
                if (isElement(unwrapped))
                    return value;
                if (isDocument(unwrapped))
                    return value;
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
 * @alpha
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
    if (isElement(sub)) {
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

const newQObjectMap = () => {
    const array = [];
    return {
        $array$: array,
        $get$(index) {
            return array[index];
        },
        $indexOf$(obj) {
            const index = array.indexOf(obj);
            return index === -1 ? undefined : index;
        },
        $add$(object) {
            const index = array.indexOf(object);
            if (index === -1) {
                array.push(object);
                return array.length - 1;
            }
            return index;
        },
    };
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
        const cache = new Map();
        element[Q_CTX] = ctx = {
            $element$: element,
            $cache$: cache,
            $refMap$: newQObjectMap(),
            $dirty$: false,
            $seq$: [],
            $watches$: [],
            $props$: undefined,
            $renderQrl$: undefined,
            $component$: undefined,
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
    ctx.$component$ = undefined;
    ctx.$renderQrl$ = undefined;
    ctx.$seq$.length = 0;
    ctx.$watches$.length = 0;
    ctx.$cache$.clear();
    ctx.$dirty$ = false;
    ctx.$refMap$.$array$.length = 0;
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
const setEvent = (rctx, ctx, prop, value) => {
    assertTrue(prop.endsWith('$'), 'render: event property does not end with $', prop);
    const qrl = isArray(value) ? value.map(ensureQrl) : ensureQrl(value);
    qPropWriteQRL(rctx, ctx, normalizeOnProp(prop.slice(0, -1)), qrl);
};
const ensureQrl = (value) => {
    return isQrl(value) ? value : $(value);
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
            target[prop] = value;
            if (isMutable(value)) {
                value = value.v;
                mut = true;
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

const STYLE = qDev
    ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;`
    : '';
const logError = (message, ...optionalParams) => {
    const err = message instanceof Error ? message : new Error(message);
    // eslint-disable-next-line no-console
    console.error('%cQWIK ERROR', STYLE, err, ...printParams(optionalParams));
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
            if (isElement$1(p)) {
                return printElement(p);
            }
            return p;
        });
    }
    return optionalParams;
};
const printElement = (el) => {
    const ctx = tryGetContext(el);
    const isComponent = el.hasAttribute(QHostAttr);
    const isServer = /*#__PURE__*/ (() => typeof process !== 'undefined' && !!process.versions && !!process.versions.node)();
    return {
        isComponent,
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
const QError_rootNodeMustBeHTML = 23;
const QError_strictHTMLChildren = 24;
const QError_invalidJsxNodeType = 25;
const QError_trackUseStore = 26;
const QError_missingObjectId = 27;
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
            '<Host> component can only be used at the root of a Qwik component$()',
            'Props are immutable by default.',
            'use- method must be called only at the root level of a component$()',
            'Container is already paused. Skipping',
            'Components using useServerMount() can only be mounted in the server, if you need your component to be mounted in the client, use "useMount$()" instead',
            'When rendering directly on top of Document, the root node must be a <html>',
            'A <html> node must have 2 children. The first one <head> and the second one a <body>',
            'Invalid JSXNode type. It must be either a function or a string. Found:',
            'Tracking value changes can only be done to useStore() objects and component props',
            'Missing Object ID for captured object',
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
                    return useInvoke(context, fn, ...args);
                }
                throw qError(QError_qrlIsNotFunction);
            });
        });
    };
    const invoke = async function (...args) {
        const fn = invokeFn();
        const result = await fn(...args);
        return result;
    };
    const QRL = invoke;
    const methods = {
        getSymbol: () => refSymbol ?? symbol,
        getHash: () => getSymbolHash(refSymbol ?? symbol),
        resolve,
        $resolveLazy$: resolveLazy,
        $setContainer$: setContainer,
        $chunk$: chunk,
        $symbol$: symbol,
        $refSymbol$: refSymbol,
        get $capture$() {
            return capture;
        },
        set $capture$(v) {
            capture = v;
        },
        get $captureRef$() {
            return captureRef;
        },
        set $captureRef$(v) {
            captureRef = v;
        },
        $invokeFn$: invokeFn,
        $copy$() {
            return createQRL(chunk, symbol, symbolRef, symbolFn, null, captureRef, refSymbol);
        },
        $serialize$(options) {
            return stringifyQRL(QRL, options);
        },
    };
    return Object.assign(invoke, methods);
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
    const parts = [chunk];
    if (symbol && symbol !== 'default') {
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

const ELEMENTS_SKIP_KEY = ['html', 'body', 'head'];
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
 * `useOnWindow`, `useStyles`, `useScopedStyles`
 *
 * @public
 */
// </docs>
const componentQrl = (onRenderQrl, options = {}) => {
    const tagName = options.tagName ?? 'div';
    const skipKey = ELEMENTS_SKIP_KEY.includes(tagName);
    // Return a QComponent Factory function.
    return function QSimpleComponent(props, key) {
        const finalTag = props['host:tagName'] ?? tagName;
        const finalKey = skipKey ? undefined : onRenderQrl.getHash() + ':' + (key ? key : '');
        return jsx(finalTag, { [OnRenderProp]: onRenderQrl, ...props }, finalKey);
    };
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
 * `useOnWindow`, `useStyles`, `useScopedStyles`
 *
 * @public
 */
// </docs>
const component$ = (onMount, options) => {
    return componentQrl($(onMount), options);
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
    const hasChildren = props.children || (isArray(props.children) && props.children.length > 0);
    const newChildrem = !hasChildren
        ? []
        : jsx('q:fallback', {
            children: props.children,
        });
    return jsx(QSlot, {
        name: props.name,
        children: newChildrem,
    }, props.name);
};

/**
 * QWIK_VERSION
 * @public
 */
const version = "0.0.39";

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
    const userContext = opts?.userContext;
    if (userContext) {
        Object.assign(containerState.$userContext$, userContext);
    }
    containerState.$hostsRendering$ = new Set();
    containerState.$renderPromise$ = renderRoot(parent, jsxNode, doc, containerState, containerEl);
    const renderCtx = await containerState.$renderPromise$;
    const allowRerender = opts?.allowRerender ?? true;
    if (allowRerender) {
        await postRendering(containerEl, containerState, renderCtx);
    }
    else {
        containerState.$hostsRendering$ = undefined;
        containerState.$renderPromise$ = undefined;
        const next = containerState.$hostsNext$.size +
            containerState.$hostsStaging$.size +
            containerState.$watchNext$.size +
            containerState.$watchStaging$.size;
        if (next > 0) {
            logWarn('State changed and a rerender is required, skipping');
        }
    }
};
const renderRoot = async (parent, jsxNode, doc, containerState, containerEl) => {
    const ctx = createRenderContext(doc, containerState, containerEl);
    ctx.$roots$.push(parent);
    const processedNodes = await processData(jsxNode);
    await visitJsxNode(ctx, parent, processedNodes, false);
    executeContext(ctx);
    if (!qTest) {
        injectQwikSlotCSS(parent);
    }
    if (qDev) {
        appendQwikDevTools(containerEl);
        printRenderStats(ctx);
    }
    return ctx;
};
const injectQwikSlotCSS = (docOrElm) => {
    const doc = getDocument(docOrElm);
    const isDoc = isDocument(docOrElm);
    const style = doc.createElement('style');
    directSetAttribute(style, 'id', 'qwik/base-styles');
    style.textContent = `q\\:slot{display:contents}q\\:fallback,q\\:template{display:none}q\\:fallback:last-child{display:contents}`;
    if (isDoc) {
        docOrElm.head.appendChild(style);
    }
    else {
        docOrElm.insertBefore(style, docOrElm.firstChild);
    }
};
const getElement = (docOrElm) => {
    return isDocument(docOrElm) ? docOrElm.documentElement : docOrElm;
};
const injectQContainer = (containerEl) => {
    directSetAttribute(containerEl, 'q:version', version || '');
    directSetAttribute(containerEl, QContainerAttr, 'resumed');
};

// <docs markdown="../readme.md#useHostElement">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useHostElement instead)
/**
 * Retrieves the Host Element of the current component.
 *
 * NOTE: `useHostElement` method can only be used in the synchronous portion of the callback
 * (before any `await` statements.)
 *
 * ```tsx
 * const Section = component$(
 *   () => {
 *     const hostElement = useHostElement();
 *     console.log(hostElement); // hostElement is a HTMLSectionElement
 *
 *     return <Host>I am a section</Host>;
 *   },
 *   {
 *     tagName: 'section',
 *   }
 * );
 * ```
 *
 * @public
 */
// </docs>
const useHostElement = () => {
    const ctx = useInvokeContext();
    return ctx.$hostElement$;
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

// <docs markdown="./use-context.docs.md#createContext">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ./use-context.docs.md#createContext instead)
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
 * @alpha
 */
// </docs>
const createContext = (name) => {
    return Object.freeze({
        id: fromCamelToKebabCase(name),
    });
};
// <docs markdown="./use-context.docs.md#useContextProvider">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ./use-context.docs.md#useContextProvider instead)
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
 * @alpha
 */
// </docs>
const useContextProvider = (context, newValue) => {
    const { get, set, ctx } = useSequentialScope();
    if (get) {
        return;
    }
    const hostElement = ctx.$hostElement$;
    const renderCtx = ctx.$renderCtx$;
    const hostCtx = getContext(hostElement);
    let contexts = hostCtx.$contexts$;
    if (!contexts) {
        hostCtx.$contexts$ = contexts = new Map();
    }
    if (qDev) {
        verifySerializable(newValue);
    }
    contexts.set(context.id, newValue);
    const serializedContexts = [];
    contexts.forEach((_, key) => {
        serializedContexts.push(`${key}`);
    });
    setAttribute(renderCtx, hostElement, QCtxAttr, serializedContexts.join(' '));
    set(true);
};
// <docs markdown="./use-context.docs.md#useContext">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ./use-context.docs.md#useContext instead)
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
 * @alpha
 */
// </docs>
const useContext = (context) => {
    const { get, set, ctx } = useSequentialScope();
    if (get) {
        return get;
    }
    let hostElement = ctx.$hostElement$;
    const contexts = ctx.$renderCtx$.$contexts$;
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
    const foundEl = hostElement.closest(`[q\\:ctx*="${context.id}"]`);
    if (foundEl) {
        const value = getContext(foundEl).$contexts$.get(context.id);
        if (value) {
            set(value);
            return value;
        }
    }
    throw qError(QError_notFoundContext, context.id);
};

/**
 * @alpha
 */
function useUserContext(key, defaultValue) {
    const ctx = useInvokeContext();
    return ctx.$renderCtx$.$containerState$.$userContext$[key] ?? defaultValue;
}

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
 *   return <Host>Some text</Host>;
 * });
 * ```
 *
 * @see `useScopedStyles`.
 *
 * @public
 */
// </docs>
const useStylesQrl = (styles) => {
    _useStyles(styles, false);
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
 *   return <Host>Some text</Host>;
 * });
 * ```
 *
 * @see `useScopedStyles`.
 *
 * @public
 */
// </docs>
const useStyles$ = /*#__PURE__*/ implicit$FirstArg(useStylesQrl);
// <docs markdown="../readme.md#useScopedStyles">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useScopedStyles instead)
/**
 * @see `useStyles`.
 *
 * @alpha
 */
// </docs>
const useScopedStylesQrl = (styles) => {
    _useStyles(styles, true);
};
// <docs markdown="../readme.md#useScopedStyles">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useScopedStyles instead)
/**
 * @see `useStyles`.
 *
 * @alpha
 */
// </docs>
const useScopedStyles$ = /*#__PURE__*/ implicit$FirstArg(useScopedStylesQrl);
const _useStyles = (styleQrl, scoped) => {
    const { get, set, ctx, i } = useSequentialScope();
    if (get === true) {
        return;
    }
    set(true);
    const renderCtx = ctx.$renderCtx$;
    const styleId = styleKey(styleQrl, i);
    const hostElement = ctx.$hostElement$;
    if (scoped) {
        directSetAttribute(hostElement, ComponentScopedStyles, styleId);
    }
    if (!hasStyle(renderCtx, styleId)) {
        ctx.$waitOn$.push(styleQrl.resolve(hostElement).then((styleText) => {
            if (!hasStyle(renderCtx, styleId)) {
                appendStyle(renderCtx, hostElement, {
                    type: 'style',
                    styleId,
                    content: scoped ? styleText.replace(/�/g, styleId) : styleText,
                });
            }
        }));
    }
};

export { $, Fragment, Host, Resource, SkipRerender, Slot, component$, componentQrl, createContext, getPlatform, h, handleWatch, implicit$FirstArg, inlinedQrl, jsx, jsx as jsxDEV, jsx as jsxs, mutable, noSerialize, pauseContainer, qrl, render, setPlatform, useCleanup$, useCleanupQrl, useClientEffect$, useClientEffectQrl, useContext, useContextProvider, useDocument, useHostElement, useLexicalScope, useMount$, useMountQrl, useOn, useOnDocument, useOnWindow, useRef, useResource$, useResourceQrl, useScopedStyles$, useScopedStylesQrl, useServerMount$, useServerMountQrl, useStore, useStyles$, useStylesQrl, useUserContext, useWatch$, useWatchQrl, version };
//# sourceMappingURL=core.mjs.map
