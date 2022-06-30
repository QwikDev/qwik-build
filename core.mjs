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

const QError_stringifyClassOrStyle = 0;
const QError_cannotSerializeNode = 1; // 'Can not serialize a HTML Node that is not an Element'
const QError_runtimeQrlNoElement = 2; // `Q-ERROR: '${qrl}' is runtime but no instance found on element.`
const QError_verifySerializable = 3; // 'Only primitive and object literals can be serialized', value,
const QError_errorWhileRendering = 4; // Crash while rendering
const QError_cannotRenderOverExistingContainer = 5; //'You can render over a existing q:container. Skipping render().'
const QError_setProperty = 6; //'Set property'
const QError_qrlOrError = 7;
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
const qError = (code, ...parts) => {
    const text = codeToText(code);
    const error = `${text} ${parts.join(' ')}`;
    debugger; // eslint-disable-line no-debugger
    return new Error(error);
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
        ];
        return `Code(${code}): ${MAP[code] ?? ''}`;
    }
    else {
        return `Code(${code})`;
    }
};

const STYLE = qDev
    ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;`
    : '';
const logError = (message, ...optionalParams) => {
    const err = message instanceof Error ? message : new Error(message);
    // eslint-disable-next-line no-console
    console.error('%cQWIK ERROR', STYLE, err, ...optionalParams);
    return err;
};
const logErrorAndStop = (message, ...optionalParams) => {
    logError(message, ...optionalParams);
    // eslint-disable-next-line no-debugger
    debugger;
};
const logWarn = (message, ...optionalParams) => {
    // eslint-disable-next-line no-console
    if (qDev) {
        console.warn('%cQWIK WARN', STYLE, message, ...optionalParams);
    }
};
const logDebug = (message, ...optionalParams) => {
    if (qDev) {
        // eslint-disable-next-line no-console
        console.debug('%cQWIK', STYLE, message, ...optionalParams);
    }
};

/**
 * @private
 */
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

const assertDefined = (value, text) => {
    if (qDev) {
        if (value != null)
            return;
        throw logErrorAndStop(text || 'Expected defined value');
    }
};
const assertEqual = (value1, value2, text) => {
    if (qDev) {
        if (value1 === value2)
            return;
        throw logErrorAndStop(text || `Expected '${value1}' === '${value2}'.`);
    }
};

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

const getDocument = (node) => {
    if (typeof document !== 'undefined') {
        return document;
    }
    if (node.nodeType === 9) {
        return node;
    }
    const doc = node.ownerDocument;
    assertDefined(doc);
    return doc;
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
            assertDefined(element);
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
    assertDefined(ctx.$hostElement$);
    assertDefined(ctx.$waitOn$);
    assertDefined(ctx.$renderCtx$);
    assertDefined(ctx.$doc$);
    assertDefined(ctx.$subscriber$);
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
        const currentCtx = _context;
        _context = previousContext;
        if (currentCtx.$waitOn$ && currentCtx.$waitOn$.length > 0) {
            // eslint-disable-next-line no-unsafe-finally
            return Promise.all(currentCtx.$waitOn$).then(() => returnValue);
        }
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
/**
 * @alpha
 */
const useWaitOn = (promise) => {
    const ctx = useInvokeContext();
    ctx.$waitOn$.push(promise);
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

const isPromise = (value) => {
    return value instanceof Promise;
};
const then = (promise, thenFn, rejectFn) => {
    return isPromise(promise) ? promise.then(thenFn, rejectFn) : thenFn(promise);
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

// <docs markdown="../readme.md#useStore">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useStore instead)
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
    const containerState = ctx.$renderCtx$.$containerState$;
    const value = isFunction(initialState) ? initialState() : initialState;
    const recursive = opts?.recursive ?? false;
    const flags = recursive ? QObjectRecursive : 0;
    const newStore = createProxy(value, containerState, flags, undefined);
    set(newStore);
    return newStore;
};
// <docs markdown="../readme.md#useRef">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useRef instead)
/**
 * It's a very thin wrapper around `useStore()` including the proper type signature to be passed
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
        elementCtx.$seq$[i] = value;
    };
    return {
        get: elementCtx.$seq$[i],
        set,
        i,
        ctx,
    };
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
/**
 * @public
 */
const setPlatform = (doc, plt) => (doc[DocumentPlatform] = plt);
/**
 * @public
 */
const getPlatform = (docOrNode) => {
    const doc = getDocument(docOrNode);
    return doc[DocumentPlatform] || (doc[DocumentPlatform] = createPlatform(doc));
};
const DocumentPlatform = /*#__PURE__*/ Symbol();

// <docs markdown="../readme.md#useDocument">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useDocument instead)
/**
 * Retrieves the document of the current element. It's important to use this method instead of
 * accessing `document` directly, because during SSR, the global document might not exist.
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

const fromCamelToKebabCase = (text) => {
    return text.replace(/([A-Z])/g, '-$1').toLowerCase();
};

const directSetAttribute = (el, prop, value) => {
    return el.setAttribute(prop, value);
};
const directGetAttribute = (el, prop) => {
    return el.getAttribute(prop);
};

const ON_PROP_REGEX = /^(window:|document:|)on([A-Z]|-.).*(Qrl|\$)$/;
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
        const cp = value.copy();
        cp.setContainer(ctx.$element$);
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
 * For example these function call are equivalent:
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
 * @param fn - function that should have its first argument automatically `$`.
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
 * Can be used to release resouces, abort network requets, stop timers...
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
        const el = ctx.$hostElement$;
        const watch = {
            qrl: unmountFn,
            el,
            f: WatchFlagsIsCleanup,
            i,
        };
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
 * Can be used to release resouces, abort network requets, stop timers...
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
// <docs markdown="../readme.md#useResume">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useResume instead)
/**
 * A lazy-loadable reference to a component's on resume hook.
 *
 * The hook is eagerly invoked when the application resumes on the client. Because it is called
 * eagerly, this allows the component to resume even if no user interaction has taken place.
 *
 * Only called in the client.
 * Only called once.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   useResume$(() => {
 *     // Eagerly invoked when the application resumes on the client
 *     console.log('called once in client');
 *   });
 *   return <div>Hello world</div>;
 * });
 * ```
 *
 * @see `useVisible`, `useClientEffect`
 *
 * @alpha
 */
// </docs>
const useResumeQrl = (resumeFn) => useOn('qinit', resumeFn);
// <docs markdown="../readme.md#useResume">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useResume instead)
/**
 * A lazy-loadable reference to a component's on resume hook.
 *
 * The hook is eagerly invoked when the application resumes on the client. Because it is called
 * eagerly, this allows the component to resume even if no user interaction has taken place.
 *
 * Only called in the client.
 * Only called once.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   useResume$(() => {
 *     // Eagerly invoked when the application resumes on the client
 *     console.log('called once in client');
 *   });
 *   return <div>Hello world</div>;
 * });
 * ```
 *
 * @see `useVisible`, `useClientEffect`
 *
 * @alpha
 */
// </docs>
const useResume$ = /*#__PURE__*/ implicit$FirstArg(useResumeQrl);
// <docs markdown="../readme.md#useVisible">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useVisible instead)
/**
 * A lazy-loadable reference to a component's on visible hook.
 *
 * The hook is lazily invoked when the component becomes visible in the browser viewport.
 *
 * Only called in the client.
 * Only called once.
 *
 * @see `useResume`, `useClientEffect`
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     isVisible: false,
 *   });
 *   useVisible$(() => {
 *     // Invoked once when the component is visible in the browser's viewport
 *     console.log('called once in client when visible');
 *     store.isVisible = true;
 *   });
 *   return <div>{store.isVisible}</div>;
 * });
 * ```
 *
 * @alpha
 */
// </docs>
const useVisibleQrl = (resumeFn) => useOn('qvisible', resumeFn);
// <docs markdown="../readme.md#useOn">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useOn instead)
/**
 * Register a listener on the current component's host element.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX. Otherwise it's adding a JSX listener in the `<Host>` is a better idea.
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
 *     $(() => {
 *       console.log('body scrolled');
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
const useOnDocument = (event, eventQrl) => _useOn(`on-window:${event}`, eventQrl);
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
 *     $(() => {
 *       console.log('navigation happened');
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
    qPropWriteQRL(invokeCtx.$renderCtx$, ctx, eventName, eventQrl);
};

const WatchFlagsIsEffect = 1 << 0;
const WatchFlagsIsWatch = 1 << 1;
const WatchFlagsIsDirty = 1 << 2;
const WatchFlagsIsCleanup = 1 << 3;
// <docs markdown="../readme.md#useWatch">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useWatch instead)
/**
 * Reruns the `watchFn` when the observed inputs change.
 *
 * Use `useWatch` to observe changes on a set of inputs, and then re-execute the `watchFn` when
 * those inputs change.
 *
 * The `watchFn` only executes if the observed inputs change. To observe the inputs use the `obs`
 * function to wrap property reads. This creates subscriptions which will trigger the `watchFn`
 * to re-run.
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
        const el = ctx.$hostElement$;
        const containerState = ctx.$renderCtx$.$containerState$;
        const watch = {
            qrl,
            el,
            f: WatchFlagsIsDirty | WatchFlagsIsWatch,
            i,
        };
        set(true);
        getContext(el).$watches$.push(watch);
        ctx.$waitOn$.push(Promise.resolve().then(() => runWatch(watch, containerState)));
        const isServer = containerState.$platform$.isServer;
        if (isServer) {
            useRunWatch(watch, opts?.run);
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
 * The `watchFn` only executes if the observed inputs change. To observe the inputs use the `obs`
 * function to wrap property reads. This creates subscriptions which will trigger the `watchFn`
 * to re-run.
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
        const el = ctx.$hostElement$;
        const watch = {
            qrl,
            el,
            f: WatchFlagsIsEffect,
            i,
        };
        set(true);
        getContext(el).$watches$.push(watch);
        useRunWatch(watch, opts?.run ?? 'visible');
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
 * Register's a server mount hook, that runs only in server when the component is first mounted.
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
 * @see `useClientMount` `useMount`
 * @public
 */
// </docs>
const useServerMountQrl = (mountQrl) => {
    const { get, set, ctx } = useSequentialScope();
    if (!get) {
        set(true);
        const isServer = getPlatform(ctx.$doc$).isServer;
        if (isServer) {
            ctx.$waitOn$.push(mountQrl.invoke());
        }
    }
};
// <docs markdown="../readme.md#useServerMount">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useServerMount instead)
/**
 * Register's a server mount hook, that runs only in server when the component is first mounted.
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
 * @see `useClientMount` `useMount`
 * @public
 */
// </docs>
const useServerMount$ = /*#__PURE__*/ implicit$FirstArg(useServerMountQrl);
// <docs markdown="../readme.md#useClientMount">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useClientMount instead)
/**
 * Register's a client mount hook, that runs only in client when the component is first mounted.
 *
 * ## Example
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     hash: ''
 *   });
 *
 *   useClientMount$(async () => {
 *     // This code will ONLY run once in the client, when the component is mounted
 *     store.hash = document.location.hash
 *   });
 *
 *   return (
 *     <Host>
 *       <p>The url hash is: ${store.hash}</p>
 *     </Host>
 *   );
 * });
 * ```
 *
 * @see `useServerMount` `useMount`
 *
 * @public
 */
// </docs>
const useClientMountQrl = (mountQrl) => {
    const { get, set, ctx } = useSequentialScope();
    if (!get) {
        set(true);
        const isServer = getPlatform(useDocument()).isServer;
        if (!isServer) {
            ctx.$waitOn$.push(mountQrl.invoke());
        }
    }
};
// <docs markdown="../readme.md#useClientMount">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useClientMount instead)
/**
 * Register's a client mount hook, that runs only in client when the component is first mounted.
 *
 * ## Example
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     hash: ''
 *   });
 *
 *   useClientMount$(async () => {
 *     // This code will ONLY run once in the client, when the component is mounted
 *     store.hash = document.location.hash
 *   });
 *
 *   return (
 *     <Host>
 *       <p>The url hash is: ${store.hash}</p>
 *     </Host>
 *   );
 * });
 * ```
 *
 * @see `useServerMount` `useMount`
 *
 * @public
 */
// </docs>
const useClientMount$ = /*#__PURE__*/ implicit$FirstArg(useClientMountQrl);
// <docs markdown="../readme.md#useMount">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useMount instead)
/**
 * Register's a mount hook, that runs both in the server and the client when the component is
 * first mounted.
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
 *     const json = await res.json() as any;
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
 * @see `useServerMount` `useClientMount`
 * @public
 */
// </docs>
const useMountQrl = (mountQrl) => {
    const { get, set, ctx } = useSequentialScope();
    if (!get) {
        set(true);
        ctx.$waitOn$.push(mountQrl.invoke());
    }
};
// <docs markdown="../readme.md#useMount">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#useMount instead)
/**
 * Register's a mount hook, that runs both in the server and the client when the component is
 * first mounted.
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
 *     const json = await res.json() as any;
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
 * @see `useServerMount` `useClientMount`
 * @public
 */
// </docs>
const useMount$ = /*#__PURE__*/ implicit$FirstArg(useMountQrl);
const runWatch = (watch, containerState) => {
    if (!(watch.f & WatchFlagsIsDirty)) {
        logDebug('Watch is not dirty, skipping run', watch);
        return Promise.resolve(watch);
    }
    watch.f &= ~WatchFlagsIsDirty;
    const promise = new Promise((resolve) => {
        then(watch.running, () => {
            cleanupWatch(watch);
            const el = watch.el;
            const doc = getDocument(el);
            const invokationContext = newInvokeContext(doc, el, el, 'WatchEvent');
            const { $subsManager$: subsManager } = containerState;
            const watchFn = watch.qrl.invokeFn(el, invokationContext, () => {
                subsManager.$clearSub$(watch);
            });
            const track = (obj, prop) => {
                const target = getProxyTarget(obj);
                assertDefined(target, 'Expected a Proxy object to track');
                const manager = subsManager.$getLocal$(target);
                manager.$addSub$(watch, prop);
                if (prop) {
                    return obj[prop];
                }
                else {
                    return obj;
                }
            };
            return then(watchFn(track), (returnValue) => {
                if (isFunction(returnValue)) {
                    watch.destroy = noSerialize(returnValue);
                }
                resolve(watch);
            });
        });
    });
    watch.running = noSerialize(promise);
    return promise;
};
const cleanupWatch = (watch) => {
    const destroy = watch.destroy;
    if (destroy) {
        watch.destroy = undefined;
        try {
            destroy();
        }
        catch (err) {
            logError(err);
        }
    }
};
const destroyWatch = (watch) => {
    if (watch.f & WatchFlagsIsCleanup) {
        watch.f &= ~WatchFlagsIsCleanup;
        const cleanup = watch.qrl.invokeFn(watch.el);
        cleanup();
    }
    else {
        cleanupWatch(watch);
    }
};
const useRunWatch = (watch, run) => {
    if (run === 'load') {
        useResumeQrl(getWatchHandlerQrl(watch));
    }
    else if (run === 'visible') {
        useVisibleQrl(getWatchHandlerQrl(watch));
    }
};
const getWatchHandlerQrl = (watch) => {
    const watchQrl = watch.qrl;
    const watchHandler = new QRL(watchQrl.$chunk$, 'handleWatch', handleWatch, null, null, [watch]);
    watchHandler.$refSymbol$ = watchQrl.$symbol$;
    return watchHandler;
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

const UNDEFINED_PREFIX = '\u0010';
const QRL_PREFIX = '\u0011';
const DOCUMENT_PREFIX = '\u0012';
// <docs markdown="../readme.md#pauseContainer">
// !!DO NOT EDIT THIS COMMENT DIRECTLY!!!
// (edit ../readme.md#pauseContainer instead)
/**
 * Serialize the current state of the application into DOM
 *
 * @alpha
 */
// </docs>
const pauseContainer = (elmOrDoc) => {
    const doc = getDocument(elmOrDoc);
    const containerEl = isDocument(elmOrDoc) ? elmOrDoc.documentElement : elmOrDoc;
    const parentJSON = isDocument(elmOrDoc) ? elmOrDoc.body : containerEl;
    const data = snapshotState(containerEl);
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
        elements.set(ELEMENT_ID_PREFIX + id, el);
    });
    // Revive proxies with subscriptions into the proxymap
    reviveValues(meta.objs, meta.subs, getObject, containerState, parentJSON);
    // Rebuild target objects
    for (const obj of meta.objs) {
        reviveNestedObjects(obj, getObject);
    }
    Object.entries(meta.ctx).forEach(([elementID, ctxMeta]) => {
        const el = getObject(elementID);
        assertDefined(el);
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
            assertDefined(props);
            assertDefined(renderQrl);
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
const snapshotState = (containerEl) => {
    const containerState = getContainerState(containerEl);
    const doc = getDocument(containerEl);
    const elementToIndex = new Map();
    const collector = createCollector(doc, containerState);
    // Collect all qObjected around the DOM
    const elements = getNodesInScope(containerEl, hasContext);
    elements.forEach((node) => {
        const ctx = tryGetContext(node);
        collectProps(node, ctx.$props$, collector);
        ctx.$contexts$?.forEach((ctx) => {
            collectValue(ctx, collector);
        });
        ctx.$listeners$?.forEach((listeners) => {
            for (const l of listeners) {
                const captured = l.$captureRef$;
                if (captured) {
                    captured.forEach((obj) => collectValue(obj, collector));
                }
            }
        });
        ctx.$watches$.forEach((watch) => {
            collector.$watches$.push(watch);
        });
    });
    // Convert objSet to array
    const objs = Array.from(collector.$objSet$);
    const objToId = new Map();
    const hasSubscriptions = (a) => {
        const flags = getProxyFlags(containerState.$proxyMap$.get(a));
        if (typeof flags === 'number' && flags > 0) {
            return true;
        }
        const manager = containerState.$subsManager$.$tryGetLocal$(a);
        if (manager) {
            return manager.$subs$.size > 0;
        }
        return false;
    };
    const getElementID = (el) => {
        let id = elementToIndex.get(el);
        if (id === undefined) {
            if (el.isConnected) {
                id = intToStr(elementToIndex.size);
                directSetAttribute(el, ELEMENT_ID, id);
                id = ELEMENT_ID_PREFIX + id;
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
        if (isObject(obj)) {
            const target = getProxyTarget(obj);
            if (target) {
                suffix += '!';
            }
            const id = objToId.get(normalizeObj(target ?? obj, doc));
            if (id !== undefined) {
                return intToStr(id) + suffix;
            }
            if (!target && isNode$1(obj)) {
                if (obj.nodeType === 1) {
                    return getElementID(obj) + suffix;
                }
                else {
                    logError(codeToText(QError_cannotSerializeNode), obj);
                    return null;
                }
            }
        }
        else {
            const id = objToId.get(normalizeObj(obj, doc));
            if (id !== undefined) {
                return intToStr(id) + suffix;
            }
        }
        return null;
    };
    const mustGetObjId = (obj) => {
        const id = getObjId(obj);
        assertDefined(id);
        return id;
    };
    const serialize = (value) => {
        return getObjId(value) ?? value;
    };
    let count = 0;
    objs.sort((a, b) => {
        const isProxyA = hasSubscriptions(a) ? 0 : 1;
        const isProxyB = hasSubscriptions(b) ? 0 : 1;
        return isProxyA - isProxyB;
    });
    for (const obj of objs) {
        objToId.set(obj, count);
        count++;
    }
    const subs = objs
        .map((obj) => {
        const flags = getProxyFlags(containerState.$proxyMap$.get(obj));
        if (flags === undefined) {
            return null;
        }
        const subs = containerState.$subsManager$.$tryGetLocal$(obj)?.$subs$;
        if ((subs && subs.size > 0) || flags !== 0) {
            const subsObj = {};
            if (flags > 0) {
                subsObj['$'] = flags;
            }
            subs &&
                subs.forEach((set, key) => {
                    const id = getObjId(key);
                    if (id !== null) {
                        subsObj[id] = set ? Array.from(set) : null;
                    }
                });
            return subsObj;
        }
        else {
            return null;
        }
    })
        .filter(isNotNullable);
    const qrlSerializeOptions = {
        $platform$: containerState.$platform$,
        $getObjId$: getObjId,
    };
    const convertedObjs = objs.map((obj) => {
        if (isObject(obj)) {
            if (isArray(obj)) {
                return obj.map(serialize);
            }
            if (isQrl(obj)) {
                return QRL_PREFIX + stringifyQRL(obj, qrlSerializeOptions);
            }
            const output = {};
            Object.entries(obj).forEach(([key, value]) => {
                output[key] = serialize(value);
            });
            return output;
        }
        return obj;
    });
    const listeners = [];
    const meta = {};
    // Write back to the dom
    elements.forEach((node) => {
        const ctx = getContext(node);
        assertDefined(ctx);
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
            const value = ref.$array$.map((obj) => mustGetObjId(obj)).join(' ');
            if (value) {
                metaValue.r = value;
                add = true;
            }
        }
        if (elementCaptured && props) {
            const objs = [props];
            if (renderQrl) {
                objs.push(renderQrl);
            }
            const value = objs.map((obj) => mustGetObjId(obj)).join(' ');
            if (value) {
                metaValue.h = value;
                add = true;
            }
        }
        if (watches.length > 0) {
            const value = watches
                .map((watch) => getObjId(watch))
                .filter(isNotNullable)
                .join(' ');
            if (value) {
                metaValue.w = value;
                add = true;
            }
        }
        if (elementCaptured && seq.length > 0) {
            const value = seq.map((obj) => mustGetObjId(obj)).join(' ');
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
        if (add) {
            const elementID = getElementID(node);
            assertDefined(elementID);
            meta[elementID] = metaValue;
        }
        if (ctx.$listeners$) {
            ctx.$listeners$.forEach((qrls, key) => {
                qrls.forEach((qrl) => {
                    listeners.push({
                        key,
                        qrl,
                    });
                });
            });
        }
    });
    for (const watch of collector.$watches$) {
        destroyWatch(watch);
        if (qDev) {
            if (watch.f & WatchFlagsIsDirty) {
                logWarn('Serializing dirty watch. Looks like an internal error.');
            }
            if (!isConnected(watch)) {
                logWarn('Serializing disconneted watch. Looks like an internal error.');
            }
        }
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
        objs,
        listeners,
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
const reviveValues = (objs, subs, getObject, containerState, containerEl) => {
    for (let i = 0; i < objs.length; i++) {
        const value = objs[i];
        if (isString(value)) {
            if (value === UNDEFINED_PREFIX) {
                objs[i] = undefined;
            }
            else if (value === DOCUMENT_PREFIX) {
                objs[i] = getDocument(containerEl);
            }
            else if (value.startsWith(QRL_PREFIX)) {
                objs[i] = parseQRL(value.slice(1), containerEl);
            }
        }
        else {
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
    }
};
const reviveNestedObjects = (obj, getObject) => {
    if (obj && typeof obj == 'object') {
        if (isQrl(obj)) {
            if (obj.$capture$ && obj.$capture$.length > 0) {
                obj.$captureRef$ = obj.$capture$.map(getObject);
                obj.$capture$ = null;
            }
            return;
        }
        else if (isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                const value = obj[i];
                if (typeof value == 'string') {
                    obj[i] = getObject(value);
                }
                else {
                    reviveNestedObjects(value, getObject);
                }
            }
        }
        else if (Object.getPrototypeOf(obj) === Object.prototype) {
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    if (typeof value == 'string') {
                        obj[key] = getObject(value);
                    }
                    else {
                        reviveNestedObjects(value, getObject);
                    }
                }
            }
        }
    }
};
const getObjectImpl = (id, elements, objs, containerState) => {
    if (id.startsWith(ELEMENT_ID_PREFIX)) {
        assertEqual(elements.has(id), true);
        return elements.get(id);
    }
    const index = strToInt(id);
    assertEqual(objs.length > index, true);
    let obj = objs[index];
    const needsProxy = id.endsWith('!');
    if (needsProxy && containerState) {
        id = id.slice(0, -1);
        obj = containerState.$proxyMap$.get(obj) ?? getOrCreateProxy(obj, containerState);
    }
    if (id.endsWith('%')) {
        obj = mutable(obj);
    }
    return obj;
};
const normalizeObj = (obj, doc) => {
    if (obj === doc) {
        return DOCUMENT_PREFIX;
    }
    if (obj === undefined || !shouldSerialize(obj)) {
        return UNDEFINED_PREFIX;
    }
    return getProxyTarget(obj) ?? obj;
};
const collectValue = (obj, collector) => {
    const handled = collectQObjects(obj, collector);
    if (!handled) {
        collector.$objSet$.add(normalizeObj(obj, collector.$doc$));
    }
};
const collectProps = (el, props, collector) => {
    const subs = collector.$containerState$.$subsManager$.$tryGetLocal$(getProxyTarget(props))?.$subs$;
    if (subs && subs.has(el)) {
        // The host element read the props
        collectElement(el, collector);
    }
};
const createCollector = (doc, containerState) => {
    return {
        $seen$: new Set(),
        $objSet$: new Set(),
        $elements$: [],
        $watches$: [],
        $containerState$: containerState,
        $doc$: doc,
    };
};
const collectQrl = (obj, collector) => {
    if (collector.$seen$.has(obj)) {
        return true;
    }
    collector.$seen$.add(obj);
    collector.$objSet$.add(normalizeObj(obj, collector.$doc$));
    if (obj.$captureRef$) {
        obj.$captureRef$.forEach((obj) => collectValue(obj, collector));
    }
};
const collectElement = (el, collector) => {
    if (collector.$seen$.has(el)) {
        return;
    }
    collector.$seen$.add(el);
    const ctx = tryGetContext(el);
    if (ctx) {
        collector.$elements$.push(el);
        if (ctx.$props$) {
            collectValue(ctx.$props$, collector);
        }
        if (ctx.$renderQrl$) {
            collectValue(ctx.$renderQrl$, collector);
        }
        ctx.$seq$.forEach((obj) => {
            collectValue(obj, collector);
        });
        ctx.$refMap$.$array$.forEach((obj) => {
            collectValue(obj, collector);
        });
        ctx.$watches$.forEach((watch) => {
            collectValue(watch, collector);
        });
        if (ctx.$contexts$) {
            ctx.$contexts$.forEach((obj) => {
                collectValue(obj, collector);
            });
        }
    }
};
const escapeText = (str) => {
    return str.replace(/<(\/?script)/g, '\\x3C$1');
};
const unescapeText = (str) => {
    return str.replace(/\\x3C(\/?script)/g, '<$1');
};
const collectSubscriptions = (subs, collector) => {
    if (collector.$seen$.has(subs)) {
        return;
    }
    collector.$seen$.add(subs);
    Array.from(subs.keys()).forEach((key) => {
        if (isElement(key)) {
            collectElement(key, collector);
        }
        else {
            collectValue(key, collector);
        }
    });
};
const collectQObjects = (input, collector) => {
    let obj = input;
    if (obj != null) {
        if (typeof obj === 'object') {
            const target = getProxyTarget(obj);
            if (!target && isNode$1(obj)) {
                if (obj.nodeType === 1) {
                    return true;
                }
                return false;
            }
            if (isQrl(obj)) {
                collectQrl(obj, collector);
                return true;
            }
            const subs = collector.$containerState$.$subsManager$.$tryGetLocal$(target)?.$subs$;
            if (subs) {
                collectSubscriptions(subs, collector);
            }
            obj = normalizeObj(obj, collector.$doc$);
        }
        if (typeof obj === 'object') {
            if (collector.$seen$.has(obj)) {
                return true;
            }
            collector.$seen$.add(obj);
            collector.$objSet$.add(obj);
            if (isArray(obj)) {
                for (let i = 0; i < obj.length; i++) {
                    collectQObjects(input[i], collector);
                }
            }
            else {
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        collectQObjects(input[key], collector);
                    }
                }
            }
            return true;
        }
        if (isString(obj)) {
            collector.$objSet$.add(obj);
            return true;
        }
    }
    return false;
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
const SCOPED = ['on-window', 'on-window', 'on'];
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
    const dollar = qDev && prop.endsWith('$');
    qPropWriteQRL(rctx, ctx, normalizeOnProp(prop.slice(0, dollar ? -1 : -3)), dollar ? $(value) : value);
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
    assertDefined(target);
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
        logWarn('Unvalid node, skipping');
        return undefined;
    }
};
const isJSXNode = (n) => {
    if (qDev) {
        if (n instanceof JSXNodeImpl) {
            return true;
        }
        if (isObject(n) && n.constructor.name === JSXNodeImpl.name) {
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

const visitJsxNode = (ctx, elm, jsxNode, isSvg) => {
    if (jsxNode === undefined) {
        return smartUpdateChildren(ctx, elm, [], 'root', isSvg);
    }
    if (isArray(jsxNode)) {
        return smartUpdateChildren(ctx, elm, jsxNode.flat(), 'root', isSvg);
    }
    else if (jsxNode.$type$ === HOST_TYPE) {
        updateProperties(ctx, getContext(elm), jsxNode.$props$, isSvg);
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
    assertDefined(onRenderQRL);
    const props = ctx.$props$;
    assertDefined(props);
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
    const onRenderFn = onRenderQRL.invokeFn(rctx.$containerEl$, invocatinContext);
    try {
        // Execution of the render function
        const renderPromise = onRenderFn(props);
        // Wait for results
        return then(renderPromise, (jsxNode) => {
            rctx.$hostElements$.add(hostElement);
            const waitOnPromise = promiseAll(waitOn);
            return then(waitOnPromise, () => {
                if (isFunction(jsxNode)) {
                    ctx.$dirty$ = false;
                    jsxNode = jsxNode();
                }
                else if (ctx.$dirty$) {
                    logDebug('Dropping render. State changed during render.');
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
    }
    catch (err) {
        logError(err);
    }
};

const SVG_NS = 'http://www.w3.org/2000/svg';
const smartUpdateChildren = (ctx, elm, ch, mode, isSvg) => {
    if (ch.length === 1 && ch[0].$type$ === SKIP_RENDER_TYPE) {
        if (elm.firstChild !== null) {
            return;
        }
        ch = ch[0].$children$;
    }
    const oldCh = getChildren(elm, mode);
    if (qDev) {
        if (elm.nodeType === 9) {
            assertEqual(ch.length, 1);
            assertEqual(ch[0].$type$, 'html');
        }
        else if (elm.nodeName === 'HTML') {
            assertEqual(ch.length, 2);
            assertEqual(ch[0].$type$, 'head');
            assertEqual(ch[1].$type$, 'body');
        }
    }
    if (oldCh.length > 0 && ch.length > 0) {
        return updateChildren(ctx, elm, oldCh, ch, isSvg);
    }
    else if (ch.length > 0) {
        return addVnodes(ctx, elm, null, ch, 0, ch.length - 1, isSvg);
    }
    else if (oldCh.length > 0) {
        return removeVnodes(ctx, oldCh, 0, oldCh.length - 1);
    }
};
const updateChildren = (ctx, parentElm, oldCh, newCh, isSvg) => {
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
                const newElm = createElm(ctx, newStartVnode, isSvg);
                results.push(then(newElm, (newElm) => {
                    insertBefore(ctx, parentElm, newElm, oldStartVnode);
                }));
            }
            else {
                elmToMove = oldCh[idxInOld];
                if (!isTagName(elmToMove, newStartVnode.$type$)) {
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
        const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$;
        results.push(addVnodes(ctx, parentElm, before, newCh, newStartIdx, newEndIdx, isSvg));
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
    }
};
const isNode = (elm) => {
    const type = elm.nodeType;
    return type === 1 || type === 3;
};
const isFallback = (node) => {
    return node.nodeName === 'Q:FALLBACK';
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
    let dirty = updateProperties(rctx, ctx, props, isSvg);
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
            ctx.$renderQrl$ = props[OnRenderProp];
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
const addVnodes = (ctx, parentElm, before, vnodes, startIdx, endIdx, isSvg) => {
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
const createElm = (rctx, vnode, isSvg) => {
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
    updateProperties(rctx, ctx, props, isSvg);
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
    let wait;
    if (isComponent) {
        // Run mount hook
        const renderQRL = props[OnRenderProp];
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
            const promises = children.map((ch) => createElm(slotRctx, ch, isSvg));
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
const updateProperties = (rctx, ctx, expectProps, isSvg) => {
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
        const oldValue = ctx.$cache$.get(key);
        if (newValue === oldValue) {
            continue;
        }
        ctx.$cache$.set(key, newValue);
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
        const stylesParent = ctx.$doc$.documentElement === containerEl ? ctx.$doc$.head ?? containerEl : containerEl;
        const style = ctx.$doc$.createElement('style');
        directSetAttribute(style, 'q:style', styleTask.styleId);
        style.textContent = styleTask.content;
        stylesParent.insertBefore(style, stylesParent.firstChild);
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
    assertEqual(before.length, after.length);
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
const useLexicalScope = () => {
    const context = getInvokeContext();
    const hostElement = context.$hostElement$;
    const qrl = (context.$qrl$ ??
        parseQRL(decodeURIComponent(String(context.$url$)), hostElement));
    if (qrl.$captureRef$ == null) {
        const el = context.$element$;
        assertDefined(el);
        assertDefined(qrl.$capture$);
        resumeIfNeeded(getContainer(el));
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
    assertEqual(hostCtx.$refMap$.$array$.length > int, true);
    return obj;
};

const CONTAINER_STATE = Symbol('ContainerState');
const getContainerState = (containerEl) => {
    let set = containerEl[CONTAINER_STATE];
    if (!set) {
        containerEl[CONTAINER_STATE] = set = {
            $proxyMap$: new WeakMap(),
            $subsManager$: createSubscriptionManager(),
            $platform$: getPlatform(containerEl),
            $watchNext$: new Set(),
            $watchStaging$: new Set(),
            $hostsNext$: new Set(),
            $hostsStaging$: new Set(),
            $renderPromise$: undefined,
            $hostsRendering$: undefined,
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
const notifyRender = async (hostElement) => {
    assertDefined(directGetAttribute(hostElement, QHostAttr));
    const containerEl = getContainer(hostElement);
    assertDefined(containerEl);
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
    assertDefined(ctx.$renderQrl$);
    if (ctx.$dirty$) {
        return state.$renderPromise$;
    }
    ctx.$dirty$ = true;
    const activeRendering = state.$hostsRendering$ !== undefined;
    if (activeRendering) {
        state.$hostsStaging$.add(hostElement);
        return state.$renderPromise$.then((ctx) => {
            if (state.$hostsNext$.has(hostElement)) {
                // TODO
                return state.$renderPromise$;
            }
            else {
                return ctx;
            }
        });
    }
    else {
        state.$hostsNext$.add(hostElement);
        return scheduleFrame(containerEl, state);
    }
};
const notifyWatch = (watch) => {
    const containerEl = getContainer(watch.el);
    const state = getContainerState(containerEl);
    watch.f |= WatchFlagsIsDirty;
    const activeRendering = state.$hostsRendering$ !== undefined;
    if (activeRendering) {
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
 * @alpha
 */
const handleWatch = () => {
    const [watch] = useLexicalScope();
    notifyWatch(watch);
};
const renderMarked = async (containerEl, containerState) => {
    const hostsRendering = (containerState.$hostsRendering$ = new Set(containerState.$hostsNext$));
    containerState.$hostsNext$.clear();
    await executeWatches(containerState, (watch) => {
        return (watch.f & WatchFlagsIsWatch) !== 0;
    });
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
    await executeWatches(containerState, (watch, stage) => {
        if ((watch.f & WatchFlagsIsEffect) === 0) {
            return false;
        }
        if (stage) {
            return ctx.$hostElements$.has(watch.el);
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
const executeWatches = async (containerState, watchPred) => {
    const watchPromises = [];
    containerState.$watchNext$.forEach((watch) => {
        if (watchPred(watch, false)) {
            watchPromises.push(then(watch.qrl.resolveLazy(watch.el), () => watch));
            containerState.$watchNext$.delete(watch);
        }
    });
    do {
        // Run staging effected
        containerState.$watchStaging$.forEach((watch) => {
            if (watchPred(watch, true)) {
                watchPromises.push(then(watch.qrl.resolveLazy(watch.el), () => watch));
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
                return runWatch(watch, containerState);
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
        if (a.el === b.el) {
            return a.i < b.i ? -1 : 1;
        }
        return (a.el.compareDocumentPosition(b.el) & 2) !== 0 ? 1 : -1;
    });
};

const QObjectRecursive = 1 << 0;
const QObjectImmutable = 1 << 1;
/**
 * Creates a proxy which notifies of any writes.
 */
const getOrCreateProxy = (target, containerState, flags = 0) => {
    const proxy = containerState.$proxyMap$.get(target);
    if (proxy) {
        return proxy;
    }
    return createProxy(target, containerState, flags, undefined);
};
const createProxy = (target, containerState, flags, subs) => {
    assertEqual(unwrapProxy(target), target, 'Unexpected proxy at this location');
    assertEqual(containerState.$proxyMap$.has(target), false, 'Proxy was already created');
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
        assertEqual(getProxyTarget(obj), undefined);
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
            assertEqual(initialMap, undefined);
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
                        if (value === null || !key) {
                            notifyChange(subscriber);
                        }
                        else if (value.has(key)) {
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
    if (isObject(value)) {
        if (isQrl(value)) {
            return value;
        }
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
        switch (typeof unwrapped) {
            case 'object':
                if (isArray(unwrapped)) {
                    for (const item of unwrapped) {
                        _verifySerializable(item, seen);
                    }
                    return value;
                }
                if (Object.getPrototypeOf(unwrapped) === Object.prototype) {
                    for (const item of Object.values(unwrapped)) {
                        _verifySerializable(item, seen);
                    }
                    return value;
                }
                if (isQrl(unwrapped))
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
 * @alpha
 */
// </docs>
const noSerialize = (input) => {
    noSerializeSet.add(input);
    return input;
};
/**
 * @alpha
 */
const immutable = (input) => {
    return Object.freeze(input);
};
/**
 * @alpha
 */
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
        return isConnected(sub.el);
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

const isQrl = (value) => {
    return value instanceof QRL;
};
class QRL {
    constructor($chunk$, $symbol$, $symbolRef$, $symbolFn$, $capture$, $captureRef$) {
        this.$chunk$ = $chunk$;
        this.$symbol$ = $symbol$;
        this.$symbolRef$ = $symbolRef$;
        this.$symbolFn$ = $symbolFn$;
        this.$capture$ = $capture$;
        this.$captureRef$ = $captureRef$;
        if (qDev) {
            verifySerializable($captureRef$);
        }
    }
    setContainer(el) {
        if (!this.$el$) {
            this.$el$ = el;
        }
    }
    getSymbol() {
        return this.$refSymbol$ ?? this.$symbol$;
    }
    getHash() {
        return getSymbolHash(this.$refSymbol$ ?? this.$symbol$);
    }
    async resolve(el) {
        if (el) {
            this.setContainer(el);
        }
        return qrlImport(this.$el$, this);
    }
    resolveLazy(el) {
        return isFunction(this.$symbolRef$) ? this.$symbolRef$ : this.resolve(el);
    }
    invokeFn(el, currentCtx, beforeFn) {
        return ((...args) => {
            const fn = this.resolveLazy(el);
            return then(fn, (fn) => {
                if (isFunction(fn)) {
                    const baseContext = currentCtx ?? newInvokeContext();
                    const context = {
                        ...baseContext,
                        $qrl$: this,
                    };
                    if (beforeFn) {
                        beforeFn();
                    }
                    return useInvoke(context, fn, ...args);
                }
                throw qError(QError_qrlIsNotFunction);
            });
        });
    }
    copy() {
        const copy = new QRL(this.$chunk$, this.$symbol$, this.$symbolRef$, this.$symbolFn$, null, this.$captureRef$);
        copy.$refSymbol$ = this.$refSymbol$;
        return copy;
    }
    async invoke(...args) {
        const fn = this.invokeFn();
        const result = await fn(...args);
        return result;
    }
    serialize(options) {
        return stringifyQRL(this, options);
    }
}
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

let runtimeSymbolId = 0;
const RUNTIME_QRL = '/runtimeQRL';
const INLINED_QRL = '/inlinedQRL';
// https://regexr.com/68v72
const EXTRACT_IMPORT_PATH = /\(\s*(['"])([^\1]+)\1\s*\)/;
// https://regexr.com/690ds
const EXTRACT_SELF_IMPORT = /Promise\s*\.\s*resolve/;
// https://regexr.com/6a83h
const EXTRACT_FILE_NAME = /[\\/(]([\w\d.\-_]+\.(js|ts)x?):/;
/**
 * Lazy-load a `QRL` symbol and return the lazy-loaded value.
 *
 * @see `QRL`
 *
 * @param element - Location of the URL to resolve against. This is needed to take `q:base` into
 * account.
 * @param qrl - QRL to load.
 * @returns A resolved QRL value as a Promise.
 */
const qrlImport = (element, qrl) => {
    const qrl_ = qrl;
    if (qrl_.$symbolRef$)
        return qrl_.$symbolRef$;
    if (qrl_.$symbolFn$) {
        return (qrl_.$symbolRef$ = qrl_
            .$symbolFn$()
            .then((module) => (qrl_.$symbolRef$ = module[qrl_.$symbol$])));
    }
    else {
        if (!element) {
            throw new Error(`QRL '${qrl_.$chunk$}#${qrl_.$symbol$ || 'default'}' does not have an attached container`);
        }
        const symbol = getPlatform(element).importSymbol(element, qrl_.$chunk$, qrl_.$symbol$);
        return (qrl_.$symbolRef$ = then(symbol, (ref) => {
            return (qrl_.$symbolRef$ = ref);
        }));
    }
};
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
    const qrl = new QRL(chunk, symbol, null, symbolFn, null, lexicalScopeCapture);
    const ctx = tryGetInvokeContext();
    if (ctx && ctx.$element$) {
        qrl.setContainer(ctx.$element$);
    }
    return qrl;
};
const runtimeQrl = (symbol, lexicalScopeCapture = EMPTY_ARRAY) => {
    return new QRL(RUNTIME_QRL, 's' + runtimeSymbolId++, symbol, null, null, lexicalScopeCapture);
};
/**
 * @alpha
 */
const inlinedQrl = (symbol, symbolName, lexicalScopeCapture = EMPTY_ARRAY) => {
    // Unwrap subscribers
    return new QRL(INLINED_QRL, symbolName, symbol, null, null, lexicalScopeCapture);
};
const stringifyQRL = (qrl, opts = {}) => {
    const qrl_ = qrl;
    let symbol = qrl_.$symbol$;
    let chunk = qrl_.$chunk$;
    const refSymbol = qrl_.$refSymbol$ ?? symbol;
    const platform = opts.$platform$;
    const element = opts.$element$;
    if (platform) {
        const result = platform.chunkForSymbol(refSymbol);
        if (result) {
            chunk = result[1];
            if (!qrl_.$refSymbol$) {
                symbol = result[0];
            }
        }
    }
    const parts = [chunk];
    if (symbol && symbol !== 'default') {
        parts.push('#', symbol);
    }
    const capture = qrl_.$capture$;
    const captureRef = qrl_.$captureRef$;
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
    if (qrl_.$chunk$ === RUNTIME_QRL && element) {
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
    const iQrl = new QRL(chunk, symbol, null, null, capture, null);
    if (el) {
        iQrl.setContainer(el);
    }
    return iQrl;
};
const indexOf = (text, startIdx, char) => {
    const endIdx = text.length;
    const charIdx = text.indexOf(char, startIdx == endIdx ? 0 : startIdx);
    return charIdx == -1 ? endIdx : charIdx;
};
const toQrlOrError = (symbolOrQrl) => {
    if (!isQrl(symbolOrQrl)) {
        if (typeof symbolOrQrl == 'function' || typeof symbolOrQrl == 'string') {
            symbolOrQrl = runtimeQrl(symbolOrQrl);
        }
        else {
            throw qError(QError_qrlOrError);
        }
    }
    return symbolOrQrl;
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
 * In this example `$(...)` is used to capture the callback function of `onmousemove` into
 * lazy-loadable reference. This allows the code to refer to the function without actually
 * loading the function. In this example, the callback function does not get loaded until
 * `mousemove` event fires.
 *
 * ```tsx
 * useOnDocument(
 *   'mousemove',
 *   $(() => console.log('mousemove'))
 * );
 * ```
 *
 * In this code the Qwik Optimizer detects `$(...)` and transforms the code into:
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
 * 2. If inlined function then all lexically captured values must be:
 *    - importable (vars shows up in `import` or has `export`)
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
        const finalKey = skipKey ? undefined : onRenderQrl.getHash() + ':' + (key ? key : '');
        return jsx(tagName, { [OnRenderProp]: onRenderQrl, ...props }, finalKey);
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
const version = "0.0.34";

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
const render = async (parent, jsxNode) => {
    // If input is not JSX, convert it
    if (!isJSXNode(jsxNode)) {
        jsxNode = jsx(jsxNode, null);
    }
    const doc = getDocument(parent);
    const containerEl = getElement(parent);
    if (qDev && containerEl.hasAttribute(QContainerAttr)) {
        logError(codeToText(QError_cannotRenderOverExistingContainer));
        return;
    }
    injectQContainer(containerEl);
    const containerState = getContainerState(containerEl);
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
    const promises = [];
    ctx.$hostElements$.forEach((host) => {
        const elCtx = getContext(host);
        elCtx.$watches$.forEach((watch) => {
            if (watch.f & WatchFlagsIsDirty) {
                promises.push(runWatch(watch, containerState));
            }
        });
    });
    await Promise.all(promises);
};
const injectQwikSlotCSS = (docOrElm) => {
    const doc = getDocument(docOrElm);
    const element = isDocument(docOrElm) ? docOrElm.head : docOrElm;
    const style = doc.createElement('style');
    directSetAttribute(style, 'id', 'qwik/base-styles');
    style.textContent = `q\\:slot{display:contents}q\\:fallback,q\\:template{display:none}q\\:fallback:last-child{display:contents}`;
    element.insertBefore(style, element.firstChild);
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
    const element = ctx.$hostElement$;
    assertDefined(element);
    return element;
};

/**
 * @alpha
 */
const createContext = (name) => {
    return Object.freeze({
        id: fromCamelToKebabCase(name),
    });
};
/**
 * @alpha
 */
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
    contexts.set(context.id, newValue);
    const serializedContexts = [];
    contexts.forEach((_, key) => {
        serializedContexts.push(`${key}`);
    });
    setAttribute(renderCtx, hostElement, QCtxAttr, serializedContexts.join(' '));
    set(true);
};
/**
 * @alpha
 */
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
const _useStyles = (styles, scoped) => {
    const { get, set, ctx, i } = useSequentialScope();
    if (get === true) {
        return;
    }
    set(true);
    const renderCtx = ctx.$renderCtx$;
    const styleQrl = toQrlOrError(styles);
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

export { $, Fragment, Host, SkipRerender, Slot, component$, componentQrl, createContext, getPlatform, h, handleWatch, immutable, implicit$FirstArg, inlinedQrl, jsx, jsx as jsxDEV, jsx as jsxs, mutable, noSerialize, pauseContainer, qrl, render, setPlatform, useCleanup$, useCleanupQrl, useClientEffect$, useClientEffectQrl, useClientMount$, useClientMountQrl, useContext, useContextProvider, useDocument, useHostElement, useLexicalScope, useMount$, useMountQrl, useOn, useOnDocument, useOnWindow, useRef, useResume$, useResumeQrl, useScopedStyles$, useScopedStylesQrl, useSequentialScope, useServerMount$, useServerMountQrl, useStore, useStyles$, useStylesQrl, useWaitOn, useWatch$, useWatchQrl, version };
//# sourceMappingURL=core.mjs.map
