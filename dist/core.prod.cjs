/**
 * @license
 * @builder.io/qwik 1.15.0
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
!function(global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? factory(exports, require("@builder.io/qwik/build"), require("@builder.io/qwik/preloader")) : "function" == typeof define && define.amd ? define([ "exports", "@builder.io/qwik/build", "@builder.io/qwik/preloader" ], factory) : factory((global = "undefined" != typeof globalThis ? globalThis : global || self).qwikCore = {}, global.qwikBuild, global.qwikPreloader);
}(this, (function(exports, build, preloader) {
    "use strict";
    const implicit$FirstArg = fn => function(first, ...rest) {
        return fn.call(null, $(first), ...rest);
    };
    const qDev = !1;
    const seal = () => {
        qDev;
    };
    const isNode$1 = value => value && "number" == typeof value.nodeType;
    const isDocument = value => 9 === value.nodeType;
    const isElement$1 = value => 1 === value.nodeType;
    const isQwikElement = value => {
        const nodeType = value.nodeType;
        return 1 === nodeType || 111 === nodeType;
    };
    const isNodeElement = value => {
        const nodeType = value.nodeType;
        return 1 === nodeType || 111 === nodeType || 3 === nodeType;
    };
    const isVirtualElement = value => 111 === value.nodeType;
    const isText = value => 3 === value.nodeType;
    const isComment = value => 8 === value.nodeType;
    const logError = (message, ...optionalParams) => createAndLogError(!1, message, ...optionalParams);
    const throwErrorAndStop = (message, ...optionalParams) => {
        throw createAndLogError(!1, message, ...optionalParams);
    };
    const logErrorAndStop = (message, ...optionalParams) => createAndLogError(qDev, message, ...optionalParams);
    const logOnceWarn = () => {
        qDev;
    };
    const logWarn = () => {
        qDev;
    };
    const logDebug = () => {
        qDev;
    };
    const printParams = optionalParams => optionalParams;
    const createAndLogError = (asyncThrow, message, ...optionalParams) => {
        const err = message instanceof Error ? message : new Error(message);
        return console.error("%cQWIK ERROR", "", err.message, ...printParams(optionalParams), err.stack), 
        asyncThrow && setTimeout((() => {
            throw err;
        }), 0), err;
    };
    function assertDefined() {
        qDev;
    }
    function assertEqual() {
        qDev;
    }
    function assertFail() {
        qDev;
    }
    function assertTrue() {
        qDev;
    }
    function assertNumber() {
        qDev;
    }
    function assertString() {
        qDev;
    }
    function assertQwikElement() {
        qDev;
    }
    function assertElement() {
        qDev;
    }
    const codeToText = code => `Code(${code}) https://github.com/QwikDev/qwik/blob/main/packages/qwik/src/core/error/error.ts#L${8 + code}`;
    const qError = (code, ...parts) => {
        const text = codeToText(code, ...parts);
        return logErrorAndStop(text, ...parts);
    };
    const createPlatform = () => ({
        isServer: build.isServer,
        importSymbol(containerEl, url, symbolName) {
            if (build.isServer) {
                const hash = getSymbolHash(symbolName);
                const regSym = globalThis.__qwik_reg_symbols?.get(hash);
                if (regSym) {
                    return regSym;
                }
            }
            if (!url) {
                throw qError(31, symbolName);
            }
            if (!containerEl) {
                throw qError(30, url, symbolName);
            }
            const urlDoc = toUrl(containerEl.ownerDocument, containerEl, url).toString();
            const urlCopy = new URL(urlDoc);
            urlCopy.hash = "";
            return import(urlCopy.href).then((mod => mod[symbolName]));
        },
        raf: fn => new Promise((resolve => {
            requestAnimationFrame((() => {
                resolve(fn());
            }));
        })),
        nextTick: fn => new Promise((resolve => {
            setTimeout((() => {
                resolve(fn());
            }));
        })),
        chunkForSymbol: (symbolName, chunk) => [ symbolName, chunk ?? "_" ]
    });
    const toUrl = (doc, containerEl, url) => {
        const baseURI = doc.baseURI;
        const base = new URL(containerEl.getAttribute("q:base") ?? baseURI, baseURI);
        return new URL(url, base);
    };
    let _platform = /*#__PURE__ */ createPlatform();
    const getPlatform = () => _platform;
    const isServerPlatform = () => _platform.isServer;
    const isSerializableObject = v => {
        const proto = Object.getPrototypeOf(v);
        return proto === Object.prototype || null === proto;
    };
    const isObject = v => !!v && "object" == typeof v;
    const isArray = v => Array.isArray(v);
    const isString = v => "string" == typeof v;
    const isFunction = v => "function" == typeof v;
    const isPromise = value => value && "function" == typeof value.then;
    const safeCall = (call, thenFn, rejectFn) => {
        try {
            const promise = call();
            return isPromise(promise) ? promise.then(thenFn, rejectFn) : thenFn(promise);
        } catch (e) {
            return rejectFn(e);
        }
    };
    const maybeThen = (promise, thenFn) => isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
    const promiseAll = promises => promises.some(isPromise) ? Promise.all(promises) : promises;
    const promiseAllLazy = promises => promises.length > 0 ? Promise.all(promises) : promises;
    const isNotNullable = v => null != v;
    const delay = timeout => new Promise((resolve => {
        setTimeout(resolve, timeout);
    }));
    const EMPTY_ARRAY = [];
    const EMPTY_OBJ = {};
    const getDocument = node => {
        if ("undefined" != typeof document) {
            return document;
        }
        if (9 === node.nodeType) {
            return node;
        }
        const doc = node.ownerDocument;
        return assertDefined(), doc;
    };
    const OnRenderProp = "q:renderFn";
    const QSlot = "q:slot";
    const QSlotS = "q:s";
    const QStyle = "q:style";
    const QScopedStyle = "q:sstyle";
    const getQFuncs = (document, hash) => document["qFuncs_" + hash] || [];
    const ELEMENT_ID = "q:id";
    const QOjectTargetSymbol = Symbol("proxy target");
    const QObjectFlagsSymbol = Symbol("proxy flags");
    const QObjectManagerSymbol = Symbol("proxy manager");
    const _IMMUTABLE = Symbol("IMMUTABLE");
    const Q_CTX = "_qc_";
    const directSetAttribute = (el, prop, value) => el.setAttribute(prop, value);
    const directGetAttribute = (el, prop) => el.getAttribute(prop);
    const directRemoveAttribute = (el, prop) => el.removeAttribute(prop);
    const fromCamelToKebabCase = text => text.replace(/([A-Z])/g, "-$1").toLowerCase();
    const getOrCreateProxy = (target, containerState, flags = 0) => {
        const proxy = containerState.$proxyMap$.get(target);
        return proxy || (0 !== flags && setObjectFlags(target, flags), createProxy(target, containerState, void 0));
    };
    const createProxy = (target, containerState, subs) => {
        assertEqual(unwrapProxy(target)), assertTrue(containerState.$proxyMap$.has(target)), 
        assertTrue(isObject(target)), assertTrue(isSerializableObject(target) || isArray(target));
        const manager = containerState.$subsManager$.$createManager$(subs);
        const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
        return containerState.$proxyMap$.set(target, proxy), proxy;
    };
    const createPropsState = () => {
        const props = {};
        return setObjectFlags(props, 2), props;
    };
    const setObjectFlags = (obj, flags) => {
        Object.defineProperty(obj, QObjectFlagsSymbol, {
            value: flags,
            enumerable: !1
        });
    };
    class ReadWriteProxyHandler {
        $containerState$;
        $manager$;
        constructor($containerState$, $manager$) {
            this.$containerState$ = $containerState$, this.$manager$ = $manager$;
        }
        deleteProperty(target, prop) {
            if (2 & target[QObjectFlagsSymbol]) {
                throw qError(17);
            }
            return "string" == typeof prop && delete target[prop] && (this.$manager$.$notifySubs$(isArray(target) ? void 0 : prop), 
            !0);
        }
        get(target, prop) {
            if ("symbol" == typeof prop) {
                return prop === QOjectTargetSymbol ? target : prop === QObjectManagerSymbol ? this.$manager$ : target[prop];
            }
            const flags = target[QObjectFlagsSymbol] ?? 0;
            assertNumber();
            const invokeCtx = tryGetInvokeContext();
            const recursive = !!(1 & flags);
            const hiddenSignal = target["$$" + prop];
            let subscriber;
            let value;
            if (invokeCtx && (subscriber = invokeCtx.$subscriber$), !!!(2 & flags) || prop in target && !immutableValue(target[_IMMUTABLE]?.[prop]) || (subscriber = null), 
            hiddenSignal ? (assertTrue(isSignal(hiddenSignal)), value = hiddenSignal.value, 
            subscriber = null) : value = target[prop], subscriber) {
                const isA = isArray(target);
                this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
            }
            return recursive ? wrap(value, this.$containerState$) : value;
        }
        set(target, prop, newValue) {
            if ("symbol" == typeof prop) {
                return target[prop] = newValue, !0;
            }
            const flags = target[QObjectFlagsSymbol] ?? 0;
            assertNumber();
            if (!!(2 & flags)) {
                throw qError(17);
            }
            const unwrappedNewValue = !!(1 & flags) ? unwrapProxy(newValue) : newValue;
            if (isArray(target)) {
                return target[prop] = unwrappedNewValue, this.$manager$.$notifySubs$(), !0;
            }
            const oldValue = target[prop];
            return target[prop] = unwrappedNewValue, oldValue !== unwrappedNewValue && this.$manager$.$notifySubs$(prop), 
            !0;
        }
        has(target, prop) {
            if (prop === QOjectTargetSymbol) {
                return !0;
            }
            const invokeCtx = tryGetInvokeContext();
            if ("string" == typeof prop && invokeCtx) {
                const subscriber = invokeCtx.$subscriber$;
                if (subscriber) {
                    const isA = isArray(target);
                    this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
                }
            }
            const hasOwnProperty = Object.prototype.hasOwnProperty;
            return !!hasOwnProperty.call(target, prop) || !("string" != typeof prop || !hasOwnProperty.call(target, "$$" + prop));
        }
        ownKeys(target) {
            const flags = target[QObjectFlagsSymbol] ?? 0;
            assertNumber();
            if (!!!(2 & flags)) {
                let subscriber = null;
                const invokeCtx = tryGetInvokeContext();
                invokeCtx && (subscriber = invokeCtx.$subscriber$), subscriber && this.$manager$.$addSub$(subscriber);
            }
            return isArray(target) ? Reflect.ownKeys(target) : Reflect.ownKeys(target).map((a => "string" == typeof a && a.startsWith("$$") ? a.slice(2) : a));
        }
        getOwnPropertyDescriptor(target, prop) {
            const descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
            return isArray(target) || "symbol" == typeof prop || descriptor && !descriptor.configurable ? descriptor : {
                enumerable: !0,
                configurable: !0
            };
        }
    }
    const immutableValue = value => value === _IMMUTABLE || isSignal(value);
    const wrap = (value, containerState) => {
        if (isObject(value)) {
            if (Object.isFrozen(value)) {
                return value;
            }
            const nakedValue = unwrapProxy(value);
            if (nakedValue !== value) {
                return value;
            }
            if (fastSkipSerialize(nakedValue)) {
                return value;
            }
            if (isSerializableObject(nakedValue) || isArray(nakedValue)) {
                const proxy = containerState.$proxyMap$.get(nakedValue);
                return proxy || getOrCreateProxy(nakedValue, containerState, 1);
            }
        }
        return value;
    };
    const ON_PROP_REGEX = /^(on|window:|document:)/;
    const isOnProp = prop => prop.endsWith("$") && ON_PROP_REGEX.test(prop);
    const groupListeners = listeners => {
        if (0 === listeners.length) {
            return EMPTY_ARRAY;
        }
        if (1 === listeners.length) {
            const listener = listeners[0];
            return [ [ listener[0], [ listener[1] ] ] ];
        }
        const keys = [];
        for (let i = 0; i < listeners.length; i++) {
            const eventName = listeners[i][0];
            keys.includes(eventName) || keys.push(eventName);
        }
        return keys.map((eventName => [ eventName, listeners.filter((l => l[0] === eventName)).map((a => a[1])) ]));
    };
    const setEvent = (existingListeners, prop, input, containerEl) => {
        if (assertTrue(prop.endsWith("$")), prop = normalizeOnProp(prop.slice(0, -1)), input) {
            if (isArray(input)) {
                const processed = input.flat(1 / 0).filter((q => null != q)).map((q => [ prop, ensureQrl(q, containerEl) ]));
                existingListeners.push(...processed);
            } else {
                existingListeners.push([ prop, ensureQrl(input, containerEl) ]);
            }
        }
        return prop;
    };
    const PREFIXES = [ "on", "window:on", "document:on" ];
    const SCOPED = [ "on", "on-window", "on-document" ];
    const normalizeOnProp = prop => {
        let scope = "on";
        for (let i = 0; i < PREFIXES.length; i++) {
            const prefix = PREFIXES[i];
            if (prop.startsWith(prefix)) {
                scope = SCOPED[i], prop = prop.slice(prefix.length);
                break;
            }
        }
        return scope + ":" + (prop = prop.startsWith("-") ? fromCamelToKebabCase(prop.slice(1)) : prop.toLowerCase());
    };
    const ensureQrl = (value, containerEl) => (assertQrl(value), value.$setContainer$(containerEl), 
    value);
    const hashCode = (text, hash = 0) => {
        for (let i = 0; i < text.length; i++) {
            hash = (hash << 5) - hash + text.charCodeAt(i), hash |= 0;
        }
        return Number(Math.abs(hash)).toString(36);
    };
    const serializeSStyle = scopeIds => {
        const value = scopeIds.join("|");
        if (value.length > 0) {
            return value;
        }
    };
    const useSequentialScope = () => {
        const iCtx = useInvokeContext();
        const elCtx = getContext(iCtx.$hostElement$, iCtx.$renderCtx$.$static$.$containerState$);
        const seq = elCtx.$seq$ ||= [];
        const i = iCtx.$i$++;
        return {
            val: seq[i],
            set: value => seq[i] = value,
            i,
            iCtx,
            elCtx
        };
    };
    const createContextId = name => (assertTrue(/^[\w/.-]+$/.test(name)), /*#__PURE__*/ Object.freeze({
        id: fromCamelToKebabCase(name)
    }));
    const useContextProvider = (context, newValue) => {
        const {val, set, elCtx} = useSequentialScope();
        if (void 0 !== val) {
            return;
        }
        const contexts = elCtx.$contexts$ ||= new Map;
        contexts.set(context.id, newValue), set(!0);
    };
    const getParentProvider = (ctx, containerState) => (void 0 === ctx.$parentCtx$ && (ctx.$parentCtx$ = ((el, containerState) => {
        let node = el;
        let stack = 1;
        for (;node && !node.hasAttribute?.("q:container"); ) {
            for (;node = node.previousSibling; ) {
                if (isComment(node)) {
                    const virtual = node.__virtual;
                    if (virtual) {
                        const qtx = virtual._qc_;
                        if (node === virtual.open) {
                            return qtx ?? getContext(virtual, containerState);
                        }
                        if (qtx?.$parentCtx$) {
                            return qtx.$parentCtx$;
                        }
                        node = virtual;
                        continue;
                    }
                    if ("/qv" === node.data) {
                        stack++;
                    } else if (node.data.startsWith("qv ") && (stack--, 0 === stack)) {
                        return getContext(getVirtualElement(node), containerState);
                    }
                }
            }
            node = el.parentElement, el = node;
        }
        return null;
    })(ctx.$element$, containerState)), ctx.$parentCtx$);
    const resolveContext = (context, hostCtx, containerState) => {
        const contextID = context.id;
        if (!hostCtx) {
            return;
        }
        let ctx = hostCtx;
        for (;ctx; ) {
            const found = ctx.$contexts$?.get(contextID);
            if (found) {
                return found;
            }
            ctx = getParentProvider(ctx, containerState);
        }
    };
    const ERROR_CONTEXT = /*#__PURE__*/ createContextId("qk-error");
    const handleError = (err, hostElement, rCtx) => {
        const elCtx = tryGetContext(hostElement);
        if (isServerPlatform()) {
            throw err;
        }
        {
            const errorStore = resolveContext(ERROR_CONTEXT, elCtx, rCtx.$static$.$containerState$);
            if (void 0 === errorStore) {
                throw err;
            }
            errorStore.error = err;
        }
    };
    const unitlessNumbers = new Set([ "animationIterationCount", "aspectRatio", "borderImageOutset", "borderImageSlice", "borderImageWidth", "boxFlex", "boxFlexGroup", "boxOrdinalGroup", "columnCount", "columns", "flex", "flexGrow", "flexShrink", "gridArea", "gridRow", "gridRowEnd", "gridRowStart", "gridColumn", "gridColumnEnd", "gridColumnStart", "fontWeight", "lineClamp", "lineHeight", "opacity", "order", "orphans", "scale", "tabSize", "widows", "zIndex", "zoom", "MozAnimationIterationCount", "MozBoxFlex", "msFlex", "msFlexPositive", "WebkitAnimationIterationCount", "WebkitBoxFlex", "WebkitBoxOrdinalGroup", "WebkitColumnCount", "WebkitColumns", "WebkitFlex", "WebkitFlexGrow", "WebkitFlexShrink", "WebkitLineClamp" ]);
    const executeComponent = (rCtx, elCtx, attempt) => {
        elCtx.$flags$ &= -2, elCtx.$flags$ |= HOST_FLAG_MOUNTED, elCtx.$slots$ = [], elCtx.li.length = 0;
        const hostElement = elCtx.$element$;
        const componentQRL = elCtx.$componentQrl$;
        const props = elCtx.$props$;
        const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "qRender");
        const waitOn = iCtx.$waitOn$ = [];
        assertDefined(), assertDefined();
        const newCtx = pushRenderContext(rCtx);
        newCtx.$cmpCtx$ = elCtx, newCtx.$slotCtx$ = void 0, iCtx.$subscriber$ = [ 0, hostElement ], 
        iCtx.$renderCtx$ = rCtx, componentQRL.$setContainer$(rCtx.$static$.$containerState$.$containerEl$);
        const componentFn = componentQRL.getFn(iCtx);
        return safeCall((() => componentFn(props)), (jsxNode => maybeThen(isServerPlatform() ? maybeThen(promiseAllLazy(waitOn), (() => maybeThen(executeSSRTasks(rCtx.$static$.$containerState$, rCtx), (() => promiseAllLazy(waitOn))))) : promiseAllLazy(waitOn), (() => {
            if (elCtx.$flags$ & HOST_FLAG_DIRTY) {
                if (!(attempt && attempt > 100)) {
                    return executeComponent(rCtx, elCtx, attempt ? attempt + 1 : 1);
                }
                logWarn(`Infinite loop detected. Element: ${elCtx.$componentQrl$?.$symbol$}`);
            }
            return {
                node: jsxNode,
                rCtx: newCtx
            };
        }))), (err => {
            if (err === SignalUnassignedException) {
                if (!(attempt && attempt > 100)) {
                    return maybeThen(promiseAllLazy(waitOn), (() => executeComponent(rCtx, elCtx, attempt ? attempt + 1 : 1)));
                }
                logWarn(`Infinite loop detected. Element: ${elCtx.$componentQrl$?.$symbol$}`);
            }
            return handleError(err, hostElement, rCtx), {
                node: SkipRender,
                rCtx: newCtx
            };
        }));
    };
    const createRenderContext = (doc, containerState) => {
        const ctx = {
            $static$: {
                $doc$: doc,
                $locale$: containerState.$serverData$.locale,
                $containerState$: containerState,
                $hostElements$: new Set,
                $operations$: [],
                $postOperations$: [],
                $roots$: [],
                $addSlots$: [],
                $rmSlots$: [],
                $visited$: []
            },
            $cmpCtx$: null,
            $slotCtx$: void 0
        };
        return seal(), seal(), ctx;
    };
    const pushRenderContext = ctx => ({
        $static$: ctx.$static$,
        $cmpCtx$: ctx.$cmpCtx$,
        $slotCtx$: ctx.$slotCtx$
    });
    const serializeClassWithHost = (obj, hostCtx) => hostCtx?.$scopeIds$?.length ? hostCtx.$scopeIds$.join(" ") + " " + serializeClass(obj) : serializeClass(obj);
    const serializeClass = obj => {
        if (!obj) {
            return "";
        }
        if (isString(obj)) {
            return obj.trim();
        }
        const classes = [];
        if (isArray(obj)) {
            for (const o of obj) {
                const classList = serializeClass(o);
                classList && classes.push(classList);
            }
        } else {
            for (const [key, value] of Object.entries(obj)) {
                value && classes.push(key.trim());
            }
        }
        return classes.join(" ");
    };
    const stringifyStyle = obj => {
        if (null == obj) {
            return "";
        }
        if ("object" == typeof obj) {
            if (isArray(obj)) {
                throw qError(0, obj, "style");
            }
            {
                const chunks = [];
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        const value = obj[key];
                        null != value && "function" != typeof value && (key.startsWith("--") ? chunks.push(key + ":" + value) : chunks.push(fromCamelToKebabCase(key) + ":" + setValueForStyle(key, value)));
                    }
                }
                return chunks.join(";");
            }
        }
        return String(obj);
    };
    const setValueForStyle = (styleName, value) => "number" != typeof value || 0 === value || unitlessNumbers.has(styleName) ? value : value + "px";
    const getNextIndex = ctx => intToStr(ctx.$static$.$containerState$.$elementIndex$++);
    const setQId = (rCtx, elCtx) => {
        const id = getNextIndex(rCtx);
        elCtx.$id$ = id;
    };
    const jsxToString = data => isSignal(data) ? jsxToString(data.value) : null == data || "boolean" == typeof data ? "" : String(data);
    function isAriaAttribute(prop) {
        return prop.startsWith("aria-");
    }
    const shouldWrapFunctional = (res, node) => !!node.key && (!isJSXNode(res) || !isFunction(res.type) && res.key != node.key);
    const dangerouslySetInnerHTML = "dangerouslySetInnerHTML";
    class MockElement {
        nodeType;
        [Q_CTX]=null;
        constructor(nodeType) {
            this.nodeType = nodeType, seal();
        }
    }
    const hash = () => Math.random().toString(36).slice(2);
    const renderRoot$1 = async (node, rCtx, ssrCtx, stream, containerState, opts) => {
        const beforeClose = opts.beforeClose;
        return await renderNode(node, rCtx, ssrCtx, stream, 0, beforeClose ? stream => {
            const result = beforeClose(ssrCtx.$static$.$contexts$, containerState, !1, ssrCtx.$static$.$textNodes$);
            return processData$1(result, rCtx, ssrCtx, stream, 0, void 0);
        } : void 0), rCtx;
    };
    const renderNodeVirtual = (node, elCtx, extraNodes, rCtx, ssrCtx, stream, flags, beforeClose) => {
        const props = node.props;
        const renderQrl = props["q:renderFn"];
        if (renderQrl) {
            return elCtx.$componentQrl$ = renderQrl, renderSSRComponent(rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose);
        }
        let virtualComment = "\x3c!--qv" + renderVirtualAttributes(props);
        const isSlot = "q:s" in props;
        const key = null != node.key ? String(node.key) : null;
        isSlot && (assertDefined(), virtualComment += " q:sref=" + rCtx.$cmpCtx$.$id$), 
        null != key && (virtualComment += " q:key=" + key), virtualComment += "--\x3e", 
        stream.write(virtualComment);
        const html = node.props.dangerouslySetInnerHTML;
        if (html) {
            return stream.write(html), void stream.write(CLOSE_VIRTUAL);
        }
        if (extraNodes) {
            for (const node of extraNodes) {
                renderNodeElementSync(node.type, node.props, stream);
            }
        }
        const promise = walkChildren(node.children, rCtx, ssrCtx, stream, flags);
        return maybeThen(promise, (() => {
            if (!isSlot && !beforeClose) {
                return void stream.write(CLOSE_VIRTUAL);
            }
            let promise;
            if (isSlot) {
                assertDefined();
                const content = ssrCtx.$projectedChildren$?.[key];
                if (content) {
                    const [rCtx, sCtx] = ssrCtx.$projectedCtxs$;
                    const newSlotRctx = pushRenderContext(rCtx);
                    newSlotRctx.$slotCtx$ = elCtx, ssrCtx.$projectedChildren$[key] = void 0, promise = processData$1(content, newSlotRctx, sCtx, stream, flags);
                }
            }
            return beforeClose && (promise = maybeThen(promise, (() => beforeClose(stream)))), 
            maybeThen(promise, (() => {
                stream.write(CLOSE_VIRTUAL);
            }));
        }));
    };
    const CLOSE_VIRTUAL = "\x3c!--/qv--\x3e";
    const renderVirtualAttributes = attributes => {
        let text = "";
        for (const prop in attributes) {
            if ("children" === prop || "dangerouslySetInnerHTML" === prop) {
                continue;
            }
            const value = attributes[prop];
            null != value && (text += " " + ("" === value ? prop : prop + "=" + value));
        }
        return text;
    };
    const renderNodeElementSync = (tagName, attributes, stream) => {
        stream.write("<" + tagName + (attributes => {
            let text = "";
            for (const prop in attributes) {
                if ("dangerouslySetInnerHTML" === prop) {
                    continue;
                }
                const value = attributes[prop];
                null != value && (text += " " + ("" === value ? prop : prop + '="' + value + '"'));
            }
            return text;
        })(attributes) + ">");
        if (!!emptyElements[tagName]) {
            return;
        }
        const innerHTML = attributes.dangerouslySetInnerHTML;
        null != innerHTML && stream.write(innerHTML), stream.write(`</${tagName}>`);
    };
    const renderSSRComponent = (rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose) => (setComponentProps$1(rCtx, elCtx, node.props.props), 
    maybeThen(executeComponent(rCtx, elCtx), (res => {
        const hostElement = elCtx.$element$;
        const newRCtx = res.rCtx;
        const iCtx = newInvokeContext(ssrCtx.$static$.$locale$, hostElement, void 0);
        iCtx.$subscriber$ = [ 0, hostElement ], iCtx.$renderCtx$ = newRCtx;
        const newSSrContext = {
            $static$: ssrCtx.$static$,
            $projectedChildren$: splitProjectedChildren(node.children, ssrCtx),
            $projectedCtxs$: [ rCtx, ssrCtx ],
            $invocationContext$: iCtx
        };
        const extraNodes = [];
        if (elCtx.$appendStyles$) {
            const array = !!(4 & flags) ? ssrCtx.$static$.$headNodes$ : extraNodes;
            for (const style of elCtx.$appendStyles$) {
                array.push(_jsxQ("style", {
                    [QStyle]: style.styleId,
                    [dangerouslySetInnerHTML]: style.content,
                    hidden: ""
                }, null, null, 0, null));
            }
        }
        const newID = getNextIndex(rCtx);
        const scopeId = elCtx.$scopeIds$ ? serializeSStyle(elCtx.$scopeIds$) : void 0;
        const processedNode = _jsxC(node.type, {
            [QScopedStyle]: scopeId,
            [ELEMENT_ID]: newID,
            children: res.node
        }, 0, node.key);
        return elCtx.$id$ = newID, ssrCtx.$static$.$contexts$.push(elCtx), renderNodeVirtual(processedNode, elCtx, extraNodes, newRCtx, newSSrContext, stream, flags, (stream => {
            if (elCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER) {
                const placeholderCtx = createMockQContext(1);
                const listeners = placeholderCtx.li;
                listeners.push(...elCtx.li), elCtx.$flags$ &= -3, placeholderCtx.$id$ = getNextIndex(rCtx);
                const attributes = {
                    type: "placeholder",
                    hidden: "",
                    "q:id": placeholderCtx.$id$
                };
                ssrCtx.$static$.$contexts$.push(placeholderCtx);
                const groups = groupListeners(listeners);
                for (const listener of groups) {
                    const eventName = normalizeInvisibleEvents(listener[0]);
                    attributes[eventName] = serializeQRLs(listener[1], rCtx.$static$.$containerState$, placeholderCtx), 
                    registerQwikEvent$1(eventName, rCtx.$static$.$containerState$);
                }
                renderNodeElementSync("script", attributes, stream);
            }
            const projectedChildren = newSSrContext.$projectedChildren$;
            let missingSlotsDone;
            if (projectedChildren) {
                const nodes = Object.keys(projectedChildren).map((slotName => {
                    const content = projectedChildren[slotName];
                    if (content) {
                        return _jsxQ("q:template", {
                            [QSlot]: slotName || !0,
                            hidden: !0,
                            "aria-hidden": "true"
                        }, null, content, 0, null);
                    }
                }));
                const [_rCtx, sCtx] = newSSrContext.$projectedCtxs$;
                const newSlotRctx = pushRenderContext(_rCtx);
                newSlotRctx.$slotCtx$ = elCtx, missingSlotsDone = processData$1(nodes, newSlotRctx, sCtx, stream, 0, void 0);
            }
            return beforeClose ? maybeThen(missingSlotsDone, (() => beforeClose(stream))) : missingSlotsDone;
        }));
    })));
    const splitProjectedChildren = (children, ssrCtx) => {
        const flatChildren = flatVirtualChildren(children, ssrCtx);
        if (null === flatChildren) {
            return;
        }
        const slotMap = {};
        for (const child of flatChildren) {
            let slotName = "";
            isJSXNode(child) && (slotName = child.props[QSlot] || ""), (slotMap[slotName] ||= []).push(child);
        }
        return slotMap;
    };
    const createMockQContext = nodeType => {
        const elm = new MockElement(nodeType);
        return createContext(elm);
    };
    const renderNode = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
        const tagName = node.type;
        const hostCtx = rCtx.$cmpCtx$;
        if ("string" == typeof tagName) {
            const key = node.key;
            const props = node.props;
            const immutable = node.immutableProps || EMPTY_OBJ;
            const elCtx = createMockQContext(1);
            const elm = elCtx.$element$;
            const isHead = "head" === tagName;
            let openingElement = "<" + tagName;
            let useSignal = !1;
            let hasRef = !1;
            let classStr = "";
            let htmlStr = null;
            const handleProp = (rawProp, value, isImmutable) => {
                if ("ref" === rawProp) {
                    return void (void 0 !== value && (setRef(value, elm), hasRef = !0));
                }
                if (isOnProp(rawProp)) {
                    return void setEvent(elCtx.li, rawProp, value, void 0);
                }
                if (isSignal(value) && (assertDefined(), value = trackSignal(value, isImmutable ? [ 1, elm, value, hostCtx.$element$, rawProp ] : [ 2, hostCtx.$element$, value, elm, rawProp ]), 
                useSignal = !0), "dangerouslySetInnerHTML" === rawProp) {
                    return void (htmlStr = value);
                }
                let attrValue;
                rawProp.startsWith("preventdefault:") && registerQwikEvent$1(rawProp.slice(15), rCtx.$static$.$containerState$);
                const prop = "htmlFor" === rawProp ? "for" : rawProp;
                "class" === prop || "className" === prop ? classStr = serializeClass(value) : "style" === prop ? attrValue = stringifyStyle(value) : isAriaAttribute(prop) || "draggable" === prop || "spellcheck" === prop ? (attrValue = null != value ? String(value) : null, 
                value = attrValue) : attrValue = !1 === value || null == value ? null : String(value), 
                null != attrValue && ("value" === prop && "textarea" === tagName ? htmlStr = escapeHtml(attrValue) : isSSRUnsafeAttr(prop) || (openingElement += " " + (!0 === value ? prop : prop + '="' + escapeHtml(attrValue) + '"')));
            };
            for (const prop in props) {
                let isImmutable = !1;
                let value;
                prop in immutable ? (isImmutable = !0, value = immutable[prop], value === _IMMUTABLE && (value = props[prop])) : value = props[prop], 
                handleProp(prop, value, isImmutable);
            }
            for (const prop in immutable) {
                if (prop in props) {
                    continue;
                }
                const value = immutable[prop];
                value !== _IMMUTABLE && handleProp(prop, value, !0);
            }
            const listeners = elCtx.li;
            if (hostCtx) {
                if (hostCtx.$scopeIds$?.length) {
                    const extra = hostCtx.$scopeIds$.join(" ");
                    classStr = classStr ? `${extra} ${classStr}` : extra;
                }
                hostCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER && (listeners.push(...hostCtx.li), 
                hostCtx.$flags$ &= -3);
            }
            if (isHead && (flags |= 1), tagName in invisibleElements && (flags |= 16), tagName in textOnlyElements && (flags |= 8), 
            classStr && (openingElement += ' class="' + escapeHtml(classStr) + '"'), listeners.length > 0) {
                const groups = groupListeners(listeners);
                const isInvisible = !!(16 & flags);
                for (const listener of groups) {
                    const eventName = isInvisible ? normalizeInvisibleEvents(listener[0]) : listener[0];
                    openingElement += " " + eventName + '="' + serializeQRLs(listener[1], rCtx.$static$.$containerState$, elCtx) + '"', 
                    registerQwikEvent$1(eventName, rCtx.$static$.$containerState$);
                }
            }
            if (null != key && (openingElement += ' q:key="' + escapeHtml(key) + '"'), hasRef || useSignal || listeners.length > 0) {
                if (hasRef || useSignal || listenersNeedId(listeners)) {
                    const newID = getNextIndex(rCtx);
                    openingElement += ' q:id="' + newID + '"', elCtx.$id$ = newID;
                }
                ssrCtx.$static$.$contexts$.push(elCtx);
            }
            if (1 & flags && (openingElement += " q:head"), openingElement += ">", stream.write(openingElement), 
            tagName in emptyElements) {
                return;
            }
            if (null != htmlStr) {
                return stream.write(String(htmlStr)), void stream.write(`</${tagName}>`);
            }
            "html" === tagName ? flags |= 4 : flags &= -5, 2 & node.flags && (flags |= 1024);
            const promise = processData$1(node.children, rCtx, ssrCtx, stream, flags);
            return maybeThen(promise, (() => {
                if (isHead) {
                    for (const node of ssrCtx.$static$.$headNodes$) {
                        renderNodeElementSync(node.type, node.props, stream);
                    }
                    ssrCtx.$static$.$headNodes$.length = 0;
                }
                if (beforeClose) {
                    return maybeThen(beforeClose(stream), (() => {
                        stream.write(`</${tagName}>`);
                    }));
                }
                stream.write(`</${tagName}>`);
            }));
        }
        if (tagName === Virtual) {
            const elCtx = createMockQContext(111);
            return rCtx.$slotCtx$ ? (elCtx.$parentCtx$ = rCtx.$slotCtx$, elCtx.$realParentCtx$ = rCtx.$cmpCtx$) : elCtx.$parentCtx$ = rCtx.$cmpCtx$, 
            hostCtx && hostCtx.$flags$ & HOST_FLAG_DYNAMIC && addDynamicSlot(hostCtx, elCtx), 
            renderNodeVirtual(node, elCtx, void 0, rCtx, ssrCtx, stream, flags, beforeClose);
        }
        if (tagName === SSRRaw) {
            return void stream.write(node.props.data);
        }
        if (tagName === InternalSSRStream) {
            return (async (node, rCtx, ssrCtx, stream, flags) => {
                stream.write("\x3c!--qkssr-f--\x3e");
                const generator = node.props.children;
                let value;
                if (isFunction(generator)) {
                    const v = generator({
                        write(chunk) {
                            stream.write(chunk), stream.write("\x3c!--qkssr-f--\x3e");
                        }
                    });
                    if (isPromise(v)) {
                        return v;
                    }
                    value = v;
                } else {
                    value = generator;
                }
                for await (const chunk of value) {
                    await processData$1(chunk, rCtx, ssrCtx, stream, flags, void 0), stream.write("\x3c!--qkssr-f--\x3e");
                }
            })(node, rCtx, ssrCtx, stream, flags);
        }
        const res = invoke(ssrCtx.$invocationContext$, tagName, node.props, node.key, node.flags, node.dev);
        return shouldWrapFunctional(res, node) ? renderNode(_jsxC(Virtual, {
            children: res
        }, 0, node.key), rCtx, ssrCtx, stream, flags, beforeClose) : processData$1(res, rCtx, ssrCtx, stream, flags, beforeClose);
    };
    const processData$1 = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
        if (null != node && "boolean" != typeof node) {
            if (!isString(node) && "number" != typeof node) {
                if (isJSXNode(node)) {
                    return renderNode(node, rCtx, ssrCtx, stream, flags, beforeClose);
                }
                if (isArray(node)) {
                    return walkChildren(node, rCtx, ssrCtx, stream, flags);
                }
                if (isSignal(node)) {
                    const insideText = 8 & flags;
                    const hostEl = rCtx.$cmpCtx$?.$element$;
                    let value;
                    if (hostEl) {
                        if (!insideText) {
                            const id = getNextIndex(rCtx);
                            if (value = trackSignal(node, 1024 & flags ? [ 3, "#" + id, node, "#" + id ] : [ 4, hostEl, node, "#" + id ]), 
                            isString(value)) {
                                const str = jsxToString(value);
                                ssrCtx.$static$.$textNodes$.set(str, id);
                            }
                            return stream.write(`\x3c!--t=${id}--\x3e`), processData$1(value, rCtx, ssrCtx, stream, flags, beforeClose), 
                            void stream.write("\x3c!----\x3e");
                        }
                        value = invoke(ssrCtx.$invocationContext$, (() => node.value));
                    }
                    return void stream.write(escapeHtml(jsxToString(value)));
                }
                return isPromise(node) ? (stream.write("\x3c!--qkssr-f--\x3e"), node.then((node => processData$1(node, rCtx, ssrCtx, stream, flags, beforeClose)))) : void logWarn("A unsupported value was passed to the JSX, skipping render. Value:", node);
            }
            stream.write(escapeHtml(String(node)));
        }
    };
    const walkChildren = (children, rCtx, ssrContext, stream, flags) => {
        if (null == children) {
            return;
        }
        if (!isArray(children)) {
            return processData$1(children, rCtx, ssrContext, stream, flags);
        }
        const len = children.length;
        if (1 === len) {
            return processData$1(children[0], rCtx, ssrContext, stream, flags);
        }
        if (0 === len) {
            return;
        }
        let currentIndex = 0;
        const buffers = [];
        return children.reduce(((prevPromise, child, index) => {
            const buffer = [];
            buffers.push(buffer);
            const rendered = processData$1(child, rCtx, ssrContext, prevPromise ? {
                write(chunk) {
                    currentIndex === index ? stream.write(chunk) : buffer.push(chunk);
                }
            } : stream, flags);
            if (prevPromise || isPromise(rendered)) {
                const next = () => {
                    currentIndex++, buffers.length > currentIndex && buffers[currentIndex].forEach((chunk => stream.write(chunk)));
                };
                return isPromise(rendered) ? prevPromise ? Promise.all([ rendered, prevPromise ]).then(next) : rendered.then(next) : prevPromise.then(next);
            }
            currentIndex++;
        }), void 0);
    };
    const flatVirtualChildren = (children, ssrCtx) => {
        if (null == children) {
            return null;
        }
        const result = _flatVirtualChildren(children, ssrCtx);
        const nodes = isArray(result) ? result : [ result ];
        return 0 === nodes.length ? null : nodes;
    };
    const _flatVirtualChildren = (children, ssrCtx) => {
        if (null == children) {
            return null;
        }
        if (isArray(children)) {
            return children.flatMap((c => _flatVirtualChildren(c, ssrCtx)));
        }
        if (isJSXNode(children) && isFunction(children.type) && children.type !== SSRRaw && children.type !== InternalSSRStream && children.type !== Virtual) {
            const res = invoke(ssrCtx.$invocationContext$, children.type, children.props, children.key, children.flags);
            return flatVirtualChildren(res, ssrCtx);
        }
        return children;
    };
    const setComponentProps$1 = (rCtx, elCtx, expectProps) => {
        const keys = Object.keys(expectProps);
        const target = createPropsState();
        if (elCtx.$props$ = createProxy(target, rCtx.$static$.$containerState$), 0 === keys.length) {
            return;
        }
        const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
        for (const prop of keys) {
            "children" !== prop && prop !== QSlot && (isSignal(immutableMeta[prop]) ? target["$$" + prop] = immutableMeta[prop] : target[prop] = expectProps[prop]);
        }
    };
    const invisibleElements = {
        head: !0,
        style: !0,
        script: !0,
        link: !0,
        meta: !0
    };
    const textOnlyElements = {
        title: !0,
        style: !0,
        script: !0,
        noframes: !0,
        textarea: !0
    };
    const emptyElements = {
        area: !0,
        base: !0,
        basefont: !0,
        bgsound: !0,
        br: !0,
        col: !0,
        embed: !0,
        frame: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    };
    const ESCAPE_HTML = /[&<>'"]/g;
    const registerQwikEvent$1 = (prop, containerState) => {
        containerState.$events$.add(getEventName(prop));
    };
    const escapeHtml = s => s.replace(ESCAPE_HTML, (c => {
        switch (c) {
          case "&":
            return "&amp;";

          case "<":
            return "&lt;";

          case ">":
            return "&gt;";

          case '"':
            return "&quot;";

          case "'":
            return "&#39;";

          default:
            return "";
        }
    }));
    const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
    const isSSRUnsafeAttr = name => unsafeAttrCharRE.test(name);
    const listenersNeedId = listeners => listeners.some((l => l[1].$captureRef$ && l[1].$captureRef$.length > 0));
    const addDynamicSlot = (hostCtx, elCtx) => {
        const dynamicSlots = hostCtx.$dynamicSlots$ ||= [];
        dynamicSlots.includes(elCtx) || dynamicSlots.push(elCtx);
    };
    const normalizeInvisibleEvents = eventName => "on:qvisible" === eventName ? "on-document:qinit" : eventName;
    const _jsxQ = (type, mutableProps, immutableProps, children, flags, key) => {
        assertString();
        const processed = null == key ? null : String(key);
        const node = new JSXNodeImpl(type, mutableProps || EMPTY_OBJ, immutableProps, children, flags, processed);
        return validateJSXNode(node), seal(), node;
    };
    const _jsxC = (type, mutableProps, flags, key, dev) => {
        const processed = null == key ? null : String(key);
        const props = mutableProps ?? {};
        if ("string" == typeof type && _IMMUTABLE in props) {
            const immutableProps = props[_IMMUTABLE];
            delete props[_IMMUTABLE];
            const children = props.children;
            delete props.children;
            for (const [k, v] of Object.entries(immutableProps)) {
                v !== _IMMUTABLE && (delete props[k], props[k] = v);
            }
            return _jsxQ(type, null, props, children, flags, key, dev);
        }
        const node = new JSXNodeImpl(type, props, null, props.children, flags, processed);
        return "string" == typeof type && mutableProps && delete mutableProps.children, 
        validateJSXNode(node), seal(), node;
    };
    const jsx = (type, props, key) => {
        const processed = null == key ? null : String(key);
        const children = untrack((() => {
            const c = props.children;
            return "string" == typeof type && delete props.children, c;
        }));
        isString(type) && "className" in props && (props.class = props.className, delete props.className);
        const node = new JSXNodeImpl(type, props, null, children, 0, processed);
        return validateJSXNode(node), seal(), node;
    };
    class JSXNodeImpl {
        type;
        props;
        immutableProps;
        children;
        flags;
        key;
        dev;
        constructor(type, props, immutableProps, children, flags, key = null) {
            this.type = type, this.props = props, this.immutableProps = immutableProps, this.children = children, 
            this.flags = flags, this.key = key;
        }
    }
    const Virtual = props => props.children;
    const RenderOnce = (props, key) => new JSXNodeImpl(Virtual, EMPTY_OBJ, null, props.children, 2, key);
    const validateJSXNode = () => {
        qDev;
    };
    const isJSXNode = n => n instanceof JSXNodeImpl;
    const Fragment = props => props.children;
    const SkipRender = Symbol("skip render");
    const SSRRaw = () => null;
    const SSRComment = props => jsx(SSRRaw, {
        data: `\x3c!--${props.data}--\x3e`
    }, null);
    const InternalSSRStream = () => null;
    const renderComponent = (rCtx, elCtx, flags) => {
        const justMounted = !(elCtx.$flags$ & HOST_FLAG_MOUNTED);
        const hostElement = elCtx.$element$;
        const containerState = rCtx.$static$.$containerState$;
        return containerState.$hostsStaging$.delete(elCtx), containerState.$subsManager$.$clearSub$(hostElement), 
        maybeThen(executeComponent(rCtx, elCtx), (res => {
            const staticCtx = rCtx.$static$;
            const newCtx = res.rCtx;
            const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement);
            if (staticCtx.$hostElements$.add(hostElement), iCtx.$subscriber$ = [ 0, hostElement ], 
            iCtx.$renderCtx$ = newCtx, justMounted && elCtx.$appendStyles$) {
                for (const style of elCtx.$appendStyles$) {
                    appendHeadStyle(staticCtx, style);
                }
            }
            const processedJSXNode = processData(res.node, iCtx);
            return maybeThen(processedJSXNode, (processedJSXNode => {
                const newVdom = wrapJSX(hostElement, processedJSXNode);
                const oldVdom = getVdom(elCtx);
                return maybeThen(smartUpdateChildren(newCtx, oldVdom, newVdom, flags), (() => {
                    elCtx.$vdom$ = newVdom;
                }));
            }));
        }));
    };
    const getVdom = elCtx => (elCtx.$vdom$ || (elCtx.$vdom$ = domToVnode(elCtx.$element$)), 
    elCtx.$vdom$);
    class ProcessedJSXNodeImpl {
        $type$;
        $props$;
        $immutableProps$;
        $children$;
        $flags$;
        $key$;
        $elm$=null;
        $text$="";
        $signal$=null;
        $id$;
        $dev$;
        constructor($type$, $props$, $immutableProps$, $children$, $flags$, $key$) {
            this.$type$ = $type$, this.$props$ = $props$, this.$immutableProps$ = $immutableProps$, 
            this.$children$ = $children$, this.$flags$ = $flags$, this.$key$ = $key$, this.$id$ = $type$ + ($key$ ? ":" + $key$ : ""), 
            seal();
        }
    }
    const processNode = (node, invocationContext) => {
        const {key, type, props, children, flags, immutableProps} = node;
        let textType = "";
        if (isString(type)) {
            textType = type;
        } else {
            if (type !== Virtual) {
                if (isFunction(type)) {
                    const res = invoke(invocationContext, type, props, key, flags, node.dev);
                    return shouldWrapFunctional(res, node) ? processNode(_jsxC(Virtual, {
                        children: res
                    }, 0, key), invocationContext) : processData(res, invocationContext);
                }
                throw qError(25, type);
            }
            textType = VIRTUAL;
        }
        let convertedChildren = EMPTY_ARRAY;
        if (null != children) {
            return maybeThen(processData(children, invocationContext), (result => {
                void 0 !== result && (convertedChildren = isArray(result) ? result : [ result ]);
                const vnode = new ProcessedJSXNodeImpl(textType, props, immutableProps, convertedChildren, flags, key);
                return vnode;
            }));
        }
        {
            const vnode = new ProcessedJSXNodeImpl(textType, props, immutableProps, convertedChildren, flags, key);
            return vnode;
        }
    };
    const wrapJSX = (element, input) => {
        const children = void 0 === input ? EMPTY_ARRAY : isArray(input) ? input : [ input ];
        const node = new ProcessedJSXNodeImpl(":virtual", {}, null, children, 0, null);
        return node.$elm$ = element, node;
    };
    const processData = (node, invocationContext) => {
        if (null != node && "boolean" != typeof node) {
            if (isPrimitive(node)) {
                const newNode = new ProcessedJSXNodeImpl("#text", EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
                return newNode.$text$ = String(node), newNode;
            }
            if (isJSXNode(node)) {
                return processNode(node, invocationContext);
            }
            if (isSignal(node)) {
                const newNode = new ProcessedJSXNodeImpl("#signal", EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
                return newNode.$signal$ = node, newNode;
            }
            if (isArray(node)) {
                const output = promiseAll(node.flatMap((n => processData(n, invocationContext))));
                return maybeThen(output, (array => array.flat(100).filter(isNotNullable)));
            }
            return isPromise(node) ? node.then((node => processData(node, invocationContext))) : node === SkipRender ? new ProcessedJSXNodeImpl(":skipRender", EMPTY_OBJ, null, EMPTY_ARRAY, 0, null) : void logWarn("A unsupported value was passed to the JSX, skipping render. Value:", node);
        }
    };
    const isPrimitive = obj => isString(obj) || "number" == typeof obj;
    const resumeIfNeeded = containerEl => {
        "paused" === directGetAttribute(containerEl, "q:container") && (resumeContainer(containerEl), 
        appendQwikDevTools(containerEl));
    };
    const resumeContainer = containerEl => {
        if (!isContainer$1(containerEl)) {
            return void logWarn("Skipping resuming because parent element is not q:container");
        }
        const pauseState = containerEl._qwikjson_ ?? (containerEl => {
            const doc = getDocument(containerEl);
            const script = getQwikJSON(containerEl === doc.documentElement ? doc.body : containerEl, "type");
            if (script) {
                return JSON.parse(unescapeText(script.firstChild.data) || "{}");
            }
        })(containerEl);
        if (containerEl._qwikjson_ = null, !pauseState) {
            return void logWarn("Skipping resuming qwik/json metadata was not found.");
        }
        const doc = getDocument(containerEl);
        const hash = containerEl.getAttribute("q:instance");
        const inlinedFunctions = getQFuncs(doc, hash);
        const containerState = _getContainerState(containerEl);
        const elements = new Map;
        const text = new Map;
        let node = null;
        let container = 0;
        const elementWalker = doc.createTreeWalker(containerEl, SHOW_COMMENT$1);
        for (;node = elementWalker.nextNode(); ) {
            const data = node.data;
            if (0 === container) {
                if (data.startsWith("qv ")) {
                    const id = getID(data);
                    id >= 0 && elements.set(id, node);
                } else if (data.startsWith("t=")) {
                    const id = data.slice(2);
                    const index = strToInt(id);
                    const textNode = getTextNode(node);
                    elements.set(index, textNode), text.set(index, textNode.data);
                }
            }
            "cq" === data ? container++ : "/cq" === data && container--;
        }
        const slotPath = 0 !== containerEl.getElementsByClassName("qc📦").length;
        containerEl.querySelectorAll("[q\\:id]").forEach((el => {
            if (slotPath && el.closest("[q\\:container]") !== containerEl) {
                return;
            }
            const id = directGetAttribute(el, "q:id");
            assertDefined();
            const index = strToInt(id);
            elements.set(index, el);
        }));
        const parser = createParser(containerState, doc);
        const finalized = new Map;
        const revived = new Set;
        const getObject = id => (assertTrue(), finalized.has(id) ? finalized.get(id) : computeObject(id));
        const computeObject = id => {
            if (id.startsWith("#")) {
                const elementId = id.slice(1);
                const index = strToInt(elementId);
                assertTrue(elements.has(index));
                const rawElement = elements.get(index);
                if (assertDefined(), isComment(rawElement)) {
                    if (!rawElement.isConnected) {
                        return void finalized.set(id, void 0);
                    }
                    const virtual = getVirtualElement(rawElement);
                    return finalized.set(id, virtual), getContext(virtual, containerState), virtual;
                }
                return isElement$1(rawElement) ? (finalized.set(id, rawElement), getContext(rawElement, containerState), 
                rawElement) : (finalized.set(id, rawElement), rawElement);
            }
            if (id.startsWith("@")) {
                const funcId = id.slice(1);
                const index = strToInt(funcId);
                const func = inlinedFunctions[index];
                return assertDefined(), func;
            }
            if (id.startsWith("*")) {
                const elementId = id.slice(1);
                const index = strToInt(elementId);
                assertTrue(elements.has(index));
                const str = text.get(index);
                return assertDefined(), finalized.set(id, str), str;
            }
            const index = strToInt(id);
            const objs = pauseState.objs;
            assertTrue();
            let value = objs[index];
            isString(value) && (value = value === UNDEFINED_PREFIX ? void 0 : parser.prepare(value));
            let obj = value;
            for (let i = id.length - 1; i >= 0; i--) {
                const transform = OBJECT_TRANSFORMS[id[i]];
                if (!transform) {
                    break;
                }
                obj = transform(obj, containerState);
            }
            return finalized.set(id, obj), isPrimitive(value) || revived.has(index) || (revived.add(index), 
            reviveSubscriptions(value, index, pauseState.subs, getObject, containerState, parser), 
            reviveNestedObjects(value, getObject, parser)), obj;
        };
        var el, eventName, detail, bubbles;
        containerState.$elementIndex$ = 1e5, containerState.$pauseCtx$ = {
            getObject,
            meta: pauseState.ctx,
            refs: pauseState.refs
        }, directSetAttribute(containerEl, "q:container", "resumed"), logDebug(), el = containerEl, 
        eventName = "qresume", detail = void 0, bubbles = !0, (build.isBrowser || "function" == typeof CustomEvent) && el && el.dispatchEvent(new CustomEvent(eventName, {
            detail,
            bubbles,
            composed: bubbles
        }));
    };
    const reviveSubscriptions = (value, i, objsSubs, getObject, containerState, parser) => {
        const subs = objsSubs[i];
        if (subs) {
            const converted = [];
            let flag = 0;
            for (const sub of subs) {
                if (sub.startsWith("_")) {
                    flag = parseInt(sub.slice(1), 10);
                } else {
                    const parsed = parseSubscription(sub, getObject);
                    parsed && converted.push(parsed);
                }
            }
            if (flag > 0 && setObjectFlags(value, flag), !parser.subs(value, converted)) {
                const proxy = containerState.$proxyMap$.get(value);
                proxy ? getSubscriptionManager(proxy).$addSubs$(converted) : createProxy(value, containerState, converted);
            }
        }
    };
    const reviveNestedObjects = (obj, getObject, parser) => {
        if (!parser.fill(obj, getObject) && obj && "object" == typeof obj) {
            if (isArray(obj)) {
                for (let i = 0; i < obj.length; i++) {
                    obj[i] = getObject(obj[i]);
                }
            } else if (isSerializableObject(obj)) {
                for (const key in obj) {
                    obj[key] = getObject(obj[key]);
                }
            }
        }
    };
    const unescapeText = str => str.replace(/\\x3C(\/?script)/gi, "<$1");
    const getQwikJSON = (parentElm, attribute) => {
        let child = parentElm.lastElementChild;
        for (;child; ) {
            if ("SCRIPT" === child.tagName && "qwik/json" === directGetAttribute(child, attribute)) {
                return child;
            }
            child = child.previousElementSibling;
        }
    };
    const getTextNode = mark => {
        const nextNode = mark.nextSibling;
        if (isText(nextNode)) {
            return nextNode;
        }
        {
            const textNode = mark.ownerDocument.createTextNode("");
            return mark.parentElement.insertBefore(textNode, mark), textNode;
        }
    };
    const appendQwikDevTools = containerEl => {
        containerEl.qwik = {
            pause: () => pauseContainer(containerEl),
            state: _getContainerState(containerEl)
        };
    };
    const getID = stuff => {
        const index = stuff.indexOf("q:id=");
        return index > 0 ? strToInt(stuff.slice(index + 5)) : -1;
    };
    const useLexicalScope = () => {
        const context = getInvokeContext();
        let qrl = context.$qrl$;
        if (qrl) {
            assertQrl(qrl), assertDefined();
        } else {
            const el = context.$element$;
            assertDefined();
            const container = getWrappingContainer(el);
            assertDefined(), qrl = parseQRL(decodeURIComponent(String(context.$url$)), container), 
            assertQrl(qrl), resumeIfNeeded(container);
            const elCtx = getContext(el, _getContainerState(container));
            inflateQrl(qrl, elCtx);
        }
        return qrl.$captureRef$;
    };
    const executeSignalOperation = (rCtx, operation) => {
        try {
            const type = operation[0];
            const staticCtx = rCtx.$static$;
            switch (type) {
              case 1:
              case 2:
                {
                    let elm;
                    let hostElm;
                    1 === type ? (elm = operation[1], hostElm = operation[3]) : (elm = operation[3], 
                    hostElm = operation[1]);
                    const elCtx = tryGetContext(elm);
                    if (null == elCtx) {
                        return;
                    }
                    const prop = operation[4];
                    const isSVG = elm.namespaceURI === SVG_NS;
                    staticCtx.$containerState$.$subsManager$.$clearSignal$(operation);
                    let value = trackSignal(operation[2], operation.slice(0, -1));
                    "class" === prop ? value = serializeClassWithHost(value, tryGetContext(hostElm)) : "style" === prop && (value = stringifyStyle(value));
                    const vdom = getVdom(elCtx);
                    if (prop in vdom.$props$ && vdom.$props$[prop] === value) {
                        return;
                    }
                    return vdom.$props$[prop] = value, smartSetProperty(staticCtx, elm, prop, value, isSVG);
                }

              case 3:
              case 4:
                {
                    const elm = operation[3];
                    if (!staticCtx.$visited$.includes(elm)) {
                        staticCtx.$containerState$.$subsManager$.$clearSignal$(operation);
                        const invocationContext = void 0;
                        let signalValue = trackSignal(operation[2], operation.slice(0, -1));
                        const subscription = __lastSubscription;
                        Array.isArray(signalValue) && (signalValue = new JSXNodeImpl(Virtual, {}, null, signalValue, 0, null));
                        let newVnode = processData(signalValue, invocationContext);
                        if (isPromise(newVnode)) {
                            logError("Rendering promises in JSX signals is not supported");
                        } else {
                            void 0 === newVnode && (newVnode = processData("", invocationContext));
                            const oldVnode = getVnodeFromEl(elm);
                            const element = function(element) {
                                for (;element; ) {
                                    if (isQwikElement(element)) {
                                        return element;
                                    }
                                    element = element.parentElement;
                                }
                                throw new Error("Not found");
                            }(operation[1]);
                            if (rCtx.$cmpCtx$ = getContext(element, rCtx.$static$.$containerState$), oldVnode.$type$ == newVnode.$type$ && oldVnode.$key$ == newVnode.$key$ && oldVnode.$id$ == newVnode.$id$) {
                                diffVnode(rCtx, oldVnode, newVnode, 0);
                            } else {
                                const promises = [];
                                const oldNode = oldVnode.$elm$;
                                const newElm = createElm(rCtx, newVnode, 0, promises);
                                promises.length && logError("Rendering promises in JSX signals is not supported"), 
                                subscription[3] = newElm, insertBefore(rCtx.$static$, elm.parentElement, newElm, oldNode), 
                                oldNode && removeNode(staticCtx, oldNode);
                            }
                        }
                    }
                }
            }
        } catch (e) {}
    };
    const notifyChange = (subAction, containerState) => {
        if (0 === subAction[0]) {
            const host = subAction[1];
            isSubscriberDescriptor(host) ? notifyTask(host, containerState) : notifyRender(host, containerState);
        } else {
            notifySignalOperation(subAction, containerState);
        }
    };
    const notifyRender = (hostElement, containerState) => {
        const server = isServerPlatform();
        server || resumeIfNeeded(containerState.$containerEl$);
        const elCtx = getContext(hostElement, containerState);
        if (assertDefined(), elCtx.$flags$ & HOST_FLAG_DIRTY) {
            return;
        }
        elCtx.$flags$ |= HOST_FLAG_DIRTY;
        if (void 0 !== containerState.$hostsRendering$) {
            containerState.$hostsStaging$.add(elCtx);
        } else {
            if (server) {
                return void logWarn("Can not rerender in server platform");
            }
            containerState.$hostsNext$.add(elCtx), scheduleFrame(containerState);
        }
    };
    const notifySignalOperation = (op, containerState) => {
        const activeRendering = void 0 !== containerState.$hostsRendering$;
        containerState.$opsNext$.add(op), activeRendering || scheduleFrame(containerState);
    };
    const notifyTask = (task, containerState) => {
        if (task.$flags$ & TaskFlagsIsDirty) {
            return;
        }
        task.$flags$ |= TaskFlagsIsDirty;
        void 0 !== containerState.$hostsRendering$ ? containerState.$taskStaging$.add(task) : (containerState.$taskNext$.add(task), 
        scheduleFrame(containerState));
    };
    const scheduleFrame = containerState => (void 0 === containerState.$renderPromise$ && (containerState.$renderPromise$ = getPlatform().nextTick((() => renderMarked(containerState)))), 
    containerState.$renderPromise$);
    const _hW = () => {
        const [task] = useLexicalScope();
        notifyTask(task, _getContainerState(getWrappingContainer(task.$el$)));
    };
    const renderMarked = async containerState => {
        const containerEl = containerState.$containerEl$;
        const doc = getDocument(containerEl);
        try {
            const rCtx = createRenderContext(doc, containerState);
            const staticCtx = rCtx.$static$;
            const hostsRendering = containerState.$hostsRendering$ = new Set(containerState.$hostsNext$);
            containerState.$hostsNext$.clear(), await executeTasksBefore(containerState, rCtx), 
            containerState.$hostsStaging$.forEach((host => {
                hostsRendering.add(host);
            })), containerState.$hostsStaging$.clear();
            const signalOperations = Array.from(containerState.$opsNext$);
            containerState.$opsNext$.clear();
            const renderingQueue = Array.from(hostsRendering);
            if (sortNodes(renderingQueue), !containerState.$styleMoved$ && renderingQueue.length > 0) {
                containerState.$styleMoved$ = !0;
                (containerEl === doc.documentElement ? doc.body : containerEl).querySelectorAll("style[q\\:style]").forEach((el => {
                    containerState.$styleIds$.add(directGetAttribute(el, "q:style")), appendChild(staticCtx, doc.head, el);
                }));
            }
            for (const elCtx of renderingQueue) {
                const el = elCtx.$element$;
                if (!staticCtx.$hostElements$.has(el) && elCtx.$componentQrl$) {
                    assertTrue(), staticCtx.$roots$.push(elCtx);
                    try {
                        await renderComponent(rCtx, elCtx, getFlags(el.parentElement));
                    } catch (err) {
                        logError(err);
                    }
                }
            }
            return signalOperations.forEach((op => {
                executeSignalOperation(rCtx, op);
            })), staticCtx.$operations$.push(...staticCtx.$postOperations$), 0 === staticCtx.$operations$.length ? (printRenderStats(staticCtx), 
            void await postRendering(containerState, rCtx)) : (await executeContextWithScrollAndTransition(staticCtx), 
            printRenderStats(staticCtx), postRendering(containerState, rCtx));
        } catch (err) {
            logError(err);
        }
    };
    const getFlags = el => {
        let flags = 0;
        return el && (el.namespaceURI === SVG_NS && (flags |= IS_SVG), "HEAD" === el.tagName && (flags |= IS_HEAD)), 
        flags;
    };
    const postRendering = async (containerState, rCtx) => {
        const hostElements = rCtx.$static$.$hostElements$;
        await executeTasksAfter(containerState, rCtx, ((task, stage) => !!(task.$flags$ & TaskFlagsIsVisibleTask) && (!stage || hostElements.has(task.$el$)))), 
        containerState.$hostsStaging$.forEach((el => {
            containerState.$hostsNext$.add(el);
        })), containerState.$hostsStaging$.clear(), containerState.$hostsRendering$ = void 0, 
        containerState.$renderPromise$ = void 0;
        containerState.$hostsNext$.size + containerState.$taskNext$.size + containerState.$opsNext$.size > 0 && (containerState.$renderPromise$ = renderMarked(containerState));
    };
    const isTask = task => !!(task.$flags$ & TaskFlagsIsTask);
    const isResourceTask$1 = task => !!(task.$flags$ & TaskFlagsIsResource);
    const executeTasksBefore = async (containerState, rCtx) => {
        const containerEl = containerState.$containerEl$;
        const resourcesPromises = [];
        const taskPromises = [];
        containerState.$taskNext$.forEach((task => {
            isTask(task) && (taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))), 
            containerState.$taskNext$.delete(task)), isResourceTask$1(task) && (resourcesPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))), 
            containerState.$taskNext$.delete(task));
        }));
        do {
            if (containerState.$taskStaging$.forEach((task => {
                isTask(task) ? taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))) : isResourceTask$1(task) ? resourcesPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))) : containerState.$taskNext$.add(task);
            })), containerState.$taskStaging$.clear(), taskPromises.length > 0) {
                const tasks = await Promise.all(taskPromises);
                sortTasks(tasks), await Promise.all(tasks.map((task => runSubscriber(task, containerState, rCtx)))), 
                taskPromises.length = 0;
            }
        } while (containerState.$taskStaging$.size > 0);
        if (resourcesPromises.length > 0) {
            const resources = await Promise.all(resourcesPromises);
            sortTasks(resources);
            for (const task of resources) {
                runSubscriber(task, containerState, rCtx);
            }
        }
    };
    const executeSSRTasks = (containerState, rCtx) => {
        const containerEl = containerState.$containerEl$;
        const staging = containerState.$taskStaging$;
        if (!staging.size) {
            return;
        }
        const taskPromises = [];
        let tries = 20;
        const runTasks = () => {
            if (staging.forEach((task => {
                isTask(task) && taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task)));
            })), staging.clear(), taskPromises.length > 0) {
                return Promise.all(taskPromises).then((async tasks => {
                    if (sortTasks(tasks), await Promise.all(tasks.map((task => runSubscriber(task, containerState, rCtx)))), 
                    taskPromises.length = 0, --tries && staging.size > 0) {
                        return runTasks();
                    }
                    tries || logWarn(`Infinite task loop detected. Tasks:\n${Array.from(staging).map((task => `  ${task.$qrl$.$symbol$}`)).join("\n")}`);
                }));
            }
        };
        return runTasks();
    };
    const executeTasksAfter = async (containerState, rCtx, taskPred) => {
        const taskPromises = [];
        const containerEl = containerState.$containerEl$;
        containerState.$taskNext$.forEach((task => {
            taskPred(task, !1) && (task.$el$.isConnected && taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))), 
            containerState.$taskNext$.delete(task));
        }));
        do {
            if (containerState.$taskStaging$.forEach((task => {
                task.$el$.isConnected && (taskPred(task, !0) ? taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))) : containerState.$taskNext$.add(task));
            })), containerState.$taskStaging$.clear(), taskPromises.length > 0) {
                const tasks = await Promise.all(taskPromises);
                sortTasks(tasks);
                for (const task of tasks) {
                    runSubscriber(task, containerState, rCtx);
                }
                taskPromises.length = 0;
            }
        } while (containerState.$taskStaging$.size > 0);
    };
    const sortNodes = elements => {
        elements.sort(((a, b) => 2 & a.$element$.compareDocumentPosition(getRootNode(b.$element$)) ? 1 : -1));
    };
    const sortTasks = tasks => {
        const isServer = isServerPlatform();
        tasks.sort(((a, b) => isServer || a.$el$ === b.$el$ ? a.$index$ < b.$index$ ? -1 : 1 : 2 & a.$el$.compareDocumentPosition(getRootNode(b.$el$)) ? 1 : -1));
    };
    const useOn = (event, eventQrl) => {
        _useOn(createEventName(event, void 0), eventQrl);
    };
    const useOnDocument = (event, eventQrl) => {
        _useOn(createEventName(event, "document"), eventQrl);
    };
    const createEventName = (event, eventType) => {
        const formattedEventType = void 0 !== eventType ? eventType + ":" : "";
        return Array.isArray(event) ? event.map((e => `${formattedEventType}on-${e}`)) : `${formattedEventType}on-${event}`;
    };
    const _useOn = (eventName, eventQrl) => {
        if (eventQrl) {
            const invokeCtx = useInvokeContext();
            const elCtx = getContext(invokeCtx.$hostElement$, invokeCtx.$renderCtx$.$static$.$containerState$);
            assertQrl(eventQrl), "string" == typeof eventName ? elCtx.li.push([ normalizeOnProp(eventName), eventQrl ]) : elCtx.li.push(...eventName.map((name => [ normalizeOnProp(name), eventQrl ]))), 
            elCtx.$flags$ |= HOST_FLAG_NEED_ATTACH_LISTENER;
        }
    };
    const createSignal = initialState => {
        const containerState = useContainerState();
        const value = isFunction(initialState) && !isQwikComponent(initialState) ? invoke(void 0, initialState) : initialState;
        return _createSignal(value, containerState, 0);
    };
    const useConstant = value => {
        const {val, set} = useSequentialScope();
        return null != val ? val : set(value = isFunction(value) && !isQwikComponent(value) ? value() : value);
    };
    const TaskFlagsIsVisibleTask = 1;
    const TaskFlagsIsTask = 2;
    const TaskFlagsIsResource = 4;
    const TaskFlagsIsDirty = 16;
    const useTaskQrl = (qrl, opts) => {
        const {val, set, iCtx, i, elCtx} = useSequentialScope();
        if (val) {
            return;
        }
        assertQrl(qrl);
        const containerState = iCtx.$renderCtx$.$static$.$containerState$;
        const task = new Task(TaskFlagsIsDirty | TaskFlagsIsTask, i, elCtx.$element$, qrl, void 0);
        set(!0), qrl.$resolveLazy$(containerState.$containerEl$), elCtx.$tasks$ || (elCtx.$tasks$ = []), 
        elCtx.$tasks$.push(task), waitAndRun(iCtx, (() => runTask(task, containerState, iCtx.$renderCtx$))), 
        isServerPlatform() && useRunTask(task, opts?.eagerness);
    };
    const createComputedQrl = qrl => {
        assertQrl(qrl);
        const iCtx = useInvokeContext();
        const containerState = iCtx.$renderCtx$.$static$.$containerState$;
        const elCtx = getContext(iCtx.$hostElement$, containerState);
        const signal = _createSignal(void 0, containerState, SIGNAL_UNASSIGNED | SIGNAL_IMMUTABLE, void 0);
        const task = new Task(TaskFlagsIsDirty | TaskFlagsIsTask | 8, 0, elCtx.$element$, qrl, signal);
        return qrl.$resolveLazy$(containerState.$containerEl$), (elCtx.$tasks$ ||= []).push(task), 
        waitAndRun(iCtx, (() => runComputed(task, containerState, iCtx.$renderCtx$))), signal;
    };
    const useComputedQrl = qrl => useConstant((() => createComputedQrl(qrl)));
    const useComputed$ = implicit$FirstArg(useComputedQrl);
    const createComputed$ = implicit$FirstArg(createComputedQrl);
    const useTask$ = /*#__PURE__*/ implicit$FirstArg(useTaskQrl);
    const useVisibleTaskQrl = (qrl, opts) => {
        const {val, set, i, iCtx, elCtx} = useSequentialScope();
        const eagerness = opts?.strategy ?? "intersection-observer";
        if (val) {
            return void (isServerPlatform() && useRunTask(val, eagerness));
        }
        assertQrl(qrl);
        const task = new Task(TaskFlagsIsVisibleTask, i, elCtx.$element$, qrl, void 0);
        const containerState = iCtx.$renderCtx$.$static$.$containerState$;
        elCtx.$tasks$ || (elCtx.$tasks$ = []), elCtx.$tasks$.push(task), set(task), useRunTask(task, eagerness), 
        isServerPlatform() || (qrl.$resolveLazy$(containerState.$containerEl$), notifyTask(task, containerState));
    };
    const useVisibleTask$ = /*#__PURE__*/ implicit$FirstArg(useVisibleTaskQrl);
    const isResourceTask = task => !!(task.$flags$ & TaskFlagsIsResource);
    const runSubscriber = async (task, containerState, rCtx) => (assertEqual(), isResourceTask(task) ? runResource(task, containerState, rCtx) : (task => !!(8 & task.$flags$))(task) ? runComputed(task, containerState, rCtx) : runTask(task, containerState, rCtx));
    const runResource = (task, containerState, rCtx, waitOn) => {
        task.$flags$ &= -17, cleanupTask(task);
        const iCtx = newInvokeContext(rCtx.$static$.$locale$, task.$el$, void 0, "qTask");
        const {$subsManager$: subsManager} = containerState;
        iCtx.$renderCtx$ = rCtx;
        const taskFn = task.$qrl$.getFn(iCtx, (() => {
            subsManager.$clearSub$(task);
        }));
        const cleanups = [];
        const resource = task.$state$;
        assertDefined();
        const resourceTarget = unwrapProxy(resource);
        const opts = {
            track: (obj, prop) => {
                if (isFunction(obj)) {
                    const ctx = newInvokeContext();
                    return ctx.$renderCtx$ = rCtx, ctx.$subscriber$ = [ 0, task ], invoke(ctx, obj);
                }
                const manager = getSubscriptionManager(obj);
                return manager ? manager.$addSub$([ 0, task ], prop) : logErrorAndStop(codeToText(26), obj), 
                prop ? obj[prop] : isSignal(obj) ? obj.value : obj;
            },
            cleanup(callback) {
                cleanups.push(callback);
            },
            cache(policy) {
                let milliseconds = 0;
                milliseconds = "immutable" === policy ? 1 / 0 : policy, resource._cache = milliseconds;
            },
            previous: resourceTarget._resolved
        };
        let resolve;
        let reject;
        let done = !1;
        const setState = (resolved, value) => !done && (done = !0, resolved ? (done = !0, 
        resource.loading = !1, resource._state = "resolved", resource._resolved = value, 
        resource._error = void 0, resolve(value)) : (done = !0, resource.loading = !1, resource._state = "rejected", 
        resource._error = value, reject(value)), !0);
        invoke(iCtx, (() => {
            resource._state = "pending", resource.loading = !isServerPlatform(), resource.value = new Promise(((r, re) => {
                resolve = r, reject = re;
            }));
        })), task.$destroy$ = noSerialize((() => {
            done = !0, cleanups.forEach((fn => fn()));
        }));
        const promise = safeCall((() => maybeThen(waitOn, (() => taskFn(opts)))), (value => {
            setState(!0, value);
        }), (reason => {
            setState(!1, reason);
        }));
        const timeout = resourceTarget._timeout;
        return timeout > 0 ? Promise.race([ promise, delay(timeout).then((() => {
            setState(!1, new Error("timeout")) && cleanupTask(task);
        })) ]) : promise;
    };
    const runTask = (task, containerState, rCtx) => {
        task.$flags$ &= -17, cleanupTask(task);
        const hostElement = task.$el$;
        const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "qTask");
        iCtx.$renderCtx$ = rCtx;
        const {$subsManager$: subsManager} = containerState;
        const taskFn = task.$qrl$.getFn(iCtx, (() => {
            subsManager.$clearSub$(task);
        }));
        const cleanups = [];
        task.$destroy$ = noSerialize((() => {
            cleanups.forEach((fn => fn()));
        }));
        const opts = {
            track: (obj, prop) => {
                if (isFunction(obj)) {
                    const ctx = newInvokeContext();
                    return ctx.$subscriber$ = [ 0, task ], invoke(ctx, obj);
                }
                const manager = getSubscriptionManager(obj);
                return manager ? manager.$addSub$([ 0, task ], prop) : logErrorAndStop(codeToText(26), obj), 
                prop ? obj[prop] : isSignal(obj) ? obj.value : obj;
            },
            cleanup(callback) {
                cleanups.push(callback);
            }
        };
        return safeCall((() => taskFn(opts)), (returnValue => {
            isFunction(returnValue) && cleanups.push(returnValue);
        }), (reason => {
            handleError(reason, hostElement, rCtx);
        }));
    };
    const runComputed = (task, containerState, rCtx) => {
        task.$flags$ &= -17, cleanupTask(task);
        const hostElement = task.$el$;
        const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "qComputed");
        iCtx.$subscriber$ = [ 0, task ], iCtx.$renderCtx$ = rCtx;
        const {$subsManager$: subsManager} = containerState;
        const taskFn = task.$qrl$.getFn(iCtx, (() => {
            subsManager.$clearSub$(task);
        }));
        const ok = returnValue => {
            untrack((() => {
                const signal = task.$state$;
                signal[QObjectSignalFlags] &= -3, signal.untrackedValue = returnValue, signal[QObjectManagerSymbol].$notifySubs$();
            }));
        };
        const fail = reason => {
            handleError(reason, hostElement, rCtx);
        };
        try {
            return maybeThen(task.$qrl$.$resolveLazy$(containerState.$containerEl$), (() => {
                const result = taskFn();
                if (isPromise(result)) {
                    const warningMessage = "useComputed$: Async functions in computed tasks are deprecated and will stop working in v2. Use useTask$ or useResource$ instead.";
                    const stack = new Error(warningMessage).stack;
                    if (stack) {
                        stack.replace(/^Error:\s*/, "");
                        logOnceWarn();
                    } else {
                        logOnceWarn();
                    }
                    return result.then(ok, fail);
                }
                ok(result);
            }));
        } catch (reason) {
            fail(reason);
        }
    };
    const cleanupTask = task => {
        const destroy = task.$destroy$;
        if (destroy) {
            task.$destroy$ = void 0;
            try {
                destroy();
            } catch (err) {
                logError(err);
            }
        }
    };
    const destroyTask = task => {
        if (32 & task.$flags$) {
            task.$flags$ &= -33;
            (0, task.$qrl$)();
        } else {
            cleanupTask(task);
        }
    };
    const useRunTask = (task, eagerness) => {
        "visible" === eagerness || "intersection-observer" === eagerness ? useOn("qvisible", getTaskHandlerQrl(task)) : "load" === eagerness || "document-ready" === eagerness ? useOnDocument("qinit", getTaskHandlerQrl(task)) : "idle" !== eagerness && "document-idle" !== eagerness || useOnDocument("qidle", getTaskHandlerQrl(task));
    };
    const getTaskHandlerQrl = task => {
        const taskQrl = task.$qrl$;
        const taskHandler = createQRL(taskQrl.$chunk$, "_hW", _hW, null, null, [ task ], taskQrl.$symbol$);
        return taskQrl.dev && (taskHandler.dev = taskQrl.dev), taskHandler;
    };
    const isSubscriberDescriptor = obj => isObject(obj) && obj instanceof Task;
    class Task {
        $flags$;
        $index$;
        $el$;
        $qrl$;
        $state$;
        constructor($flags$, $index$, $el$, $qrl$, $state$) {
            this.$flags$ = $flags$, this.$index$ = $index$, this.$el$ = $el$, this.$qrl$ = $qrl$, 
            this.$state$ = $state$;
        }
    }
    const HOST_FLAG_DIRTY = 1;
    const HOST_FLAG_NEED_ATTACH_LISTENER = 2;
    const HOST_FLAG_MOUNTED = 4;
    const HOST_FLAG_DYNAMIC = 8;
    const tryGetContext = element => element._qc_;
    const getContext = (el, containerState) => {
        assertQwikElement();
        const ctx = tryGetContext(el);
        if (ctx) {
            return ctx;
        }
        const elCtx = createContext(el);
        const elementID = directGetAttribute(el, "q:id");
        if (elementID) {
            const pauseCtx = containerState.$pauseCtx$;
            if (elCtx.$id$ = elementID, pauseCtx) {
                const {getObject, meta, refs} = pauseCtx;
                if (function(value) {
                    return value && "number" == typeof value.nodeType;
                }(value = el) && 1 === value.nodeType) {
                    const refMap = refs[elementID];
                    refMap && (elCtx.$refMap$ = refMap.split(" ").map(getObject), elCtx.li = ((elCtx, containerEl) => {
                        const attributes = elCtx.$element$.attributes;
                        const listeners = [];
                        for (let i = 0; i < attributes.length; i++) {
                            const {name, value} = attributes.item(i);
                            if (name.startsWith("on:") || name.startsWith("on-window:") || name.startsWith("on-document:")) {
                                const urls = value.split("\n");
                                for (const url of urls) {
                                    const qrl = parseQRL(url, containerEl);
                                    qrl.$capture$ && inflateQrl(qrl, elCtx), listeners.push([ name, qrl ]);
                                }
                            }
                        }
                        return listeners;
                    })(elCtx, containerState.$containerEl$));
                } else {
                    const styleIds = el.getAttribute("q:sstyle");
                    elCtx.$scopeIds$ = styleIds ? styleIds.split("|") : null;
                    const ctxMeta = meta[elementID];
                    if (ctxMeta) {
                        const seq = ctxMeta.s;
                        const host = ctxMeta.h;
                        const contexts = ctxMeta.c;
                        const tasks = ctxMeta.w;
                        if (seq && (elCtx.$seq$ = seq.split(" ").map(getObject)), tasks && (elCtx.$tasks$ = tasks.split(" ").map(getObject)), 
                        contexts) {
                            elCtx.$contexts$ = new Map;
                            for (const part of contexts.split(" ")) {
                                const [key, value] = part.split("=");
                                elCtx.$contexts$.set(key, getObject(value));
                            }
                        }
                        if (host) {
                            const [renderQrl, props] = host.split(" ");
                            if (elCtx.$flags$ = HOST_FLAG_MOUNTED, renderQrl && (elCtx.$componentQrl$ = getObject(renderQrl)), 
                            props) {
                                const propsObj = getObject(props);
                                elCtx.$props$ = propsObj, setObjectFlags(propsObj, 2), propsObj[_IMMUTABLE] = getImmutableFromProps(propsObj);
                            } else {
                                elCtx.$props$ = createProxy(createPropsState(), containerState);
                            }
                        }
                    }
                }
            }
        }
        var value;
        return elCtx;
    };
    const getImmutableFromProps = props => {
        const immutable = {};
        const target = getProxyTarget(props);
        for (const key in target) {
            key.startsWith("$$") && (immutable[key.slice(2)] = target[key]);
        }
        return immutable;
    };
    const createContext = element => {
        const ctx = {
            $flags$: 0,
            $id$: "",
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
            $parentCtx$: void 0,
            $realParentCtx$: void 0
        };
        return seal(), element._qc_ = ctx, ctx;
    };
    let _locale;
    let _context;
    const tryGetInvokeContext = () => {
        if (!_context) {
            const context = "undefined" != typeof document && document && document.__q_context__;
            if (!context) {
                return;
            }
            return isArray(context) ? document.__q_context__ = newInvokeContextFromTuple(context) : context;
        }
        return _context;
    };
    const getInvokeContext = () => {
        const ctx = tryGetInvokeContext();
        if (!ctx) {
            throw qError(14);
        }
        return ctx;
    };
    const useInvokeContext = () => {
        const ctx = tryGetInvokeContext();
        if (!ctx || "qRender" !== ctx.$event$) {
            throw qError(20);
        }
        return assertDefined(), assertDefined(), assertDefined(), assertDefined(), ctx;
    };
    const useContainerState = () => useInvokeContext().$renderCtx$.$static$.$containerState$;
    function useBindInvokeContext(fn) {
        if (null == fn) {
            return fn;
        }
        const ctx = getInvokeContext();
        return function(...args) {
            return invokeApply.call(this, ctx, fn, args);
        };
    }
    function invoke(context, fn, ...args) {
        return invokeApply.call(this, context, fn, args);
    }
    function invokeApply(context, fn, args) {
        const previousContext = _context;
        let returnValue;
        try {
            _context = context, returnValue = fn.apply(this, args);
        } finally {
            _context = previousContext;
        }
        return returnValue;
    }
    const waitAndRun = (ctx, callback) => {
        const waitOn = ctx.$waitOn$;
        if (0 === waitOn.length) {
            const result = callback();
            isPromise(result) && waitOn.push(result);
        } else {
            waitOn.push(Promise.all(waitOn).then(callback));
        }
    };
    const newInvokeContextFromTuple = ([element, event, url]) => {
        const container = element.closest("[q\\:container]");
        const locale = container?.getAttribute("q:locale") || void 0;
        return locale && function(locale) {
            _locale = locale;
        }(locale), newInvokeContext(locale, void 0, element, event, url);
    };
    const newInvokeContext = (locale, hostElement, element, event, url) => {
        const ctx = {
            $url$: url,
            $i$: 0,
            $hostElement$: hostElement,
            $element$: element,
            $event$: event,
            $qrl$: void 0,
            $waitOn$: void 0,
            $subscriber$: void 0,
            $renderCtx$: void 0,
            $locale$: locale || ("object" == typeof event && event && "locale" in event ? event.locale : void 0)
        };
        return seal(), ctx;
    };
    const getWrappingContainer = el => el.closest("[q\\:container]");
    const untrack = fn => invoke(void 0, fn);
    const trackInvocation = /*#__PURE__*/ newInvokeContext(void 0, void 0, void 0, "qRender");
    const trackSignal = (signal, sub) => (trackInvocation.$subscriber$ = sub, invoke(trackInvocation, (() => signal.value)));
    const _createSignal = (value, containerState, flags, subscriptions) => {
        const manager = containerState.$subsManager$.$createManager$(subscriptions);
        return new SignalImpl(value, manager, flags);
    };
    const QObjectSignalFlags = Symbol("proxy manager");
    const SIGNAL_IMMUTABLE = 1;
    const SIGNAL_UNASSIGNED = 2;
    const SignalUnassignedException = Symbol("unassigned signal");
    class SignalBase {}
    class SignalImpl extends SignalBase {
        untrackedValue;
        [QObjectManagerSymbol];
        [QObjectSignalFlags]=0;
        constructor(v, manager, flags) {
            super(), this.untrackedValue = v, this[QObjectManagerSymbol] = manager, this[QObjectSignalFlags] = flags;
        }
        valueOf() {
            qDev;
        }
        toString() {
            return `[Signal ${String(this.value)}]`;
        }
        toJSON() {
            return {
                value: this.value
            };
        }
        get value() {
            if (this[QObjectSignalFlags] & SIGNAL_UNASSIGNED) {
                throw SignalUnassignedException;
            }
            const sub = tryGetInvokeContext()?.$subscriber$;
            return sub && this[QObjectManagerSymbol].$addSub$(sub), this.untrackedValue;
        }
        set value(v) {
            const manager = this[QObjectManagerSymbol];
            manager && this.untrackedValue !== v && (this.untrackedValue = v, manager.$notifySubs$());
        }
    }
    class SignalDerived extends SignalBase {
        $func$;
        $args$;
        $funcStr$;
        constructor($func$, $args$, $funcStr$) {
            super(), this.$func$ = $func$, this.$args$ = $args$, this.$funcStr$ = $funcStr$;
        }
        get value() {
            return this.$func$.apply(void 0, this.$args$);
        }
    }
    class SignalWrapper extends SignalBase {
        ref;
        prop;
        constructor(ref, prop) {
            super(), this.ref = ref, this.prop = prop;
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
    const isSignal = obj => obj instanceof SignalBase;
    const _wrapProp = (obj, prop) => {
        if (!isObject(obj)) {
            return obj[prop];
        }
        if (obj instanceof SignalBase) {
            return assertEqual(), obj;
        }
        const target = getProxyTarget(obj);
        if (target) {
            const signal = target["$$" + prop];
            if (signal) {
                return assertTrue(isSignal(signal)), signal;
            }
            if (!0 !== target[_IMMUTABLE]?.[prop]) {
                return new SignalWrapper(obj, prop);
            }
        }
        const immutable = obj[_IMMUTABLE]?.[prop];
        return isSignal(immutable) ? immutable : _IMMUTABLE;
    };
    const CONTAINER_STATE = Symbol("ContainerState");
    const _getContainerState = containerEl => {
        let state = containerEl[CONTAINER_STATE];
        return state || (containerEl[CONTAINER_STATE] = state = createContainerState(containerEl, directGetAttribute(containerEl, "q:base") ?? "/")), 
        state;
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
            $styleMoved$: !1,
            $proxyMap$: new WeakMap,
            $opsNext$: new Set,
            $taskNext$: new Set,
            $taskStaging$: new Set,
            $hostsNext$: new Set,
            $hostsStaging$: new Set,
            $styleIds$: new Set,
            $events$: new Set,
            $serverData$: {
                containerAttributes
            },
            $base$: base,
            $renderPromise$: void 0,
            $hostsRendering$: void 0,
            $pauseCtx$: void 0,
            $subsManager$: null,
            $inlineFns$: new Map
        };
        return seal(), containerState.$subsManager$ = createSubscriptionManager(containerState), 
        containerState;
    };
    const setRef = (value, elm) => {
        if (isFunction(value)) {
            return value(elm);
        }
        if (isSignal(value)) {
            return isServerPlatform() ? value.untrackedValue = elm : value.value = elm;
        }
        throw qError(32, value);
    };
    const SHOW_COMMENT$1 = 128;
    const isContainer$1 = el => isElement$1(el) && el.hasAttribute("q:container");
    const intToStr = nu => nu.toString(36);
    const strToInt = nu => parseInt(nu, 36);
    const getEventName = attribute => {
        const colonPos = attribute.indexOf(":");
        return attribute ? attribute.slice(colonPos + 1).replace(/-./g, (x => x[1].toUpperCase())) : attribute;
    };
    const SVG_NS = "http://www.w3.org/2000/svg";
    const IS_SVG = 1;
    const IS_HEAD = 2;
    const CHILDREN_PLACEHOLDER = [];
    const smartUpdateChildren = (ctx, oldVnode, newVnode, flags) => {
        assertQwikElement();
        const ch = newVnode.$children$;
        if (1 === ch.length && ":skipRender" === ch[0].$type$) {
            return void (newVnode.$children$ = oldVnode.$children$);
        }
        const elm = oldVnode.$elm$;
        let filter = isChildComponent;
        if (oldVnode.$children$ === CHILDREN_PLACEHOLDER) {
            "HEAD" === elm.nodeName && (filter = isHeadChildren, flags |= IS_HEAD);
        }
        const oldCh = getVnodeChildren(oldVnode, filter);
        return oldCh.length > 0 && ch.length > 0 ? diffChildren(ctx, elm, oldCh, ch, flags) : oldCh.length > 0 && 0 === ch.length ? removeChildren(ctx.$static$, oldCh, 0, oldCh.length - 1) : ch.length > 0 ? addChildren(ctx, elm, null, ch, 0, ch.length - 1, flags) : void 0;
    };
    const getVnodeChildren = (oldVnode, filter) => {
        const oldCh = oldVnode.$children$;
        return oldCh === CHILDREN_PLACEHOLDER ? oldVnode.$children$ = getChildrenVnodes(oldVnode.$elm$, filter) : oldCh;
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
        for (;oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx; ) {
            if (null == oldStartVnode) {
                oldStartVnode = oldCh[++oldStartIdx];
            } else if (null == oldEndVnode) {
                oldEndVnode = oldCh[--oldEndIdx];
            } else if (null == newStartVnode) {
                newStartVnode = newCh[++newStartIdx];
            } else if (null == newEndVnode) {
                newEndVnode = newCh[--newEndIdx];
            } else if (oldStartVnode.$id$ === newStartVnode.$id$) {
                results.push(diffVnode(ctx, oldStartVnode, newStartVnode, flags)), oldStartVnode = oldCh[++oldStartIdx], 
                newStartVnode = newCh[++newStartIdx];
            } else if (oldEndVnode.$id$ === newEndVnode.$id$) {
                results.push(diffVnode(ctx, oldEndVnode, newEndVnode, flags)), oldEndVnode = oldCh[--oldEndIdx], 
                newEndVnode = newCh[--newEndIdx];
            } else if (oldStartVnode.$key$ && oldStartVnode.$id$ === newEndVnode.$id$) {
                assertDefined(), assertDefined(), results.push(diffVnode(ctx, oldStartVnode, newEndVnode, flags)), 
                insertAfter(staticCtx, parentElm, oldStartVnode.$elm$, oldEndVnode.$elm$), oldStartVnode = oldCh[++oldStartIdx], 
                newEndVnode = newCh[--newEndIdx];
            } else if (oldEndVnode.$key$ && oldEndVnode.$id$ === newStartVnode.$id$) {
                assertDefined(), assertDefined(), results.push(diffVnode(ctx, oldEndVnode, newStartVnode, flags)), 
                insertBefore(staticCtx, parentElm, oldEndVnode.$elm$, oldStartVnode.$elm$), oldEndVnode = oldCh[--oldEndIdx], 
                newStartVnode = newCh[++newStartIdx];
            } else {
                if (void 0 === oldKeyToIdx && (oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)), 
                idxInOld = oldKeyToIdx[newStartVnode.$key$], void 0 === idxInOld) {
                    const newElm = createElm(ctx, newStartVnode, flags, results);
                    insertBefore(staticCtx, parentElm, newElm, oldStartVnode?.$elm$);
                } else if (elmToMove = oldCh[idxInOld], elmToMove.$type$ !== newStartVnode.$type$) {
                    const newElm = createElm(ctx, newStartVnode, flags, results);
                    maybeThen(newElm, (newElm => {
                        insertBefore(staticCtx, parentElm, newElm, oldStartVnode?.$elm$);
                    }));
                } else {
                    results.push(diffVnode(ctx, elmToMove, newStartVnode, flags)), oldCh[idxInOld] = void 0, 
                    assertDefined(), insertBefore(staticCtx, parentElm, elmToMove.$elm$, oldStartVnode.$elm$);
                }
                newStartVnode = newCh[++newStartIdx];
            }
        }
        if (newStartIdx <= newEndIdx) {
            results.push(addChildren(ctx, parentElm, null == newCh[newEndIdx + 1] ? null : newCh[newEndIdx + 1].$elm$, newCh, newStartIdx, newEndIdx, flags));
        }
        let wait = promiseAll(results);
        return oldStartIdx <= oldEndIdx && (wait = maybeThen(wait, (() => {
            removeChildren(staticCtx, oldCh, oldStartIdx, oldEndIdx);
        }))), wait;
    };
    const getChildren = (elm, filter) => {
        const end = isVirtualElement(elm) ? elm.close : null;
        const nodes = [];
        let node = elm.firstChild;
        for (;(node = processVirtualNodes(node)) && (filter(node) && nodes.push(node), node = node.nextSibling, 
        node !== end); ) {}
        return nodes;
    };
    const getChildrenVnodes = (elm, filter) => getChildren(elm, filter).map(getVnodeFromEl);
    const getVnodeFromEl = el => isElement$1(el) ? tryGetContext(el)?.$vdom$ ?? domToVnode(el) : domToVnode(el);
    const domToVnode = node => {
        if (isQwikElement(node)) {
            const t = new ProcessedJSXNodeImpl(node.localName, {}, null, CHILDREN_PLACEHOLDER, 0, getKey(node));
            return t.$elm$ = node, t;
        }
        if (isText(node)) {
            const t = new ProcessedJSXNodeImpl(node.nodeName, EMPTY_OBJ, null, CHILDREN_PLACEHOLDER, 0, null);
            return t.$text$ = node.data, t.$elm$ = node, t;
        }
        assertFail();
    };
    const isHeadChildren = node => {
        const type = node.nodeType;
        return 1 === type ? node.hasAttribute("q:head") : 111 === type;
    };
    const isSlotTemplate = node => "Q:TEMPLATE" === node.nodeName;
    const isChildComponent = node => {
        const type = node.nodeType;
        if (3 === type || 111 === type) {
            return !0;
        }
        if (1 !== type) {
            return !1;
        }
        const nodeName = node.nodeName;
        return "Q:TEMPLATE" !== nodeName && ("HEAD" === nodeName ? node.hasAttribute("q:head") : "STYLE" !== nodeName || !node.hasAttribute("q:style"));
    };
    const splitChildren = input => {
        const output = {};
        for (const item of input) {
            const key = getSlotName(item);
            (output[key] ?? (output[key] = new ProcessedJSXNodeImpl(VIRTUAL, {
                [QSlotS]: ""
            }, null, [], 0, key))).$children$.push(item);
        }
        return output;
    };
    const diffVnode = (rCtx, oldVnode, newVnode, flags) => {
        assertEqual(), assertEqual(), assertEqual();
        const elm = oldVnode.$elm$;
        const tag = newVnode.$type$;
        const staticCtx = rCtx.$static$;
        const containerState = staticCtx.$containerState$;
        const currentComponent = rCtx.$cmpCtx$;
        if (assertDefined(), assertDefined(), newVnode.$elm$ = elm, "#text" === tag) {
            staticCtx.$visited$.push(elm);
            const signal = newVnode.$signal$;
            return signal && (newVnode.$text$ = jsxToString(trackSignal(signal, [ 4, currentComponent.$element$, signal, elm ]))), 
            void setProperty(staticCtx, elm, "data", newVnode.$text$);
        }
        if ("#signal" === tag) {
            return;
        }
        assertQwikElement();
        const props = newVnode.$props$;
        const vnodeFlags = newVnode.$flags$;
        const elCtx = getContext(elm, containerState);
        if (tag !== VIRTUAL) {
            let isSvg = !!(flags & IS_SVG);
            if (isSvg || "svg" !== tag || (flags |= IS_SVG, isSvg = !0), props !== EMPTY_OBJ) {
                1 & vnodeFlags || (elCtx.li.length = 0);
                const values = oldVnode.$props$;
                newVnode.$props$ = values;
                for (const prop in props) {
                    let newValue = props[prop];
                    if ("ref" !== prop) {
                        if (isOnProp(prop)) {
                            const normalized = setEvent(elCtx.li, prop, newValue, containerState.$containerEl$);
                            addQwikEvent(staticCtx, elm, normalized);
                        } else {
                            isSignal(newValue) && (newValue = trackSignal(newValue, [ 1, currentComponent.$element$, newValue, elm, prop ])), 
                            "class" === prop ? newValue = serializeClassWithHost(newValue, currentComponent) : "style" === prop && (newValue = stringifyStyle(newValue)), 
                            values[prop] !== newValue && (values[prop] = newValue, smartSetProperty(staticCtx, elm, prop, newValue, isSvg));
                        }
                    } else {
                        assertElement(), void 0 !== newValue && setRef(newValue, elm);
                    }
                }
            }
            if (2 & vnodeFlags) {
                return;
            }
            isSvg && "foreignObject" === tag && (flags &= -2);
            if (void 0 !== props.dangerouslySetInnerHTML) {
                return void 0;
            }
            if ("textarea" === tag) {
                return;
            }
            return smartUpdateChildren(rCtx, oldVnode, newVnode, flags);
        }
        if ("q:renderFn" in props) {
            const cmpProps = props.props;
            setComponentProps(containerState, elCtx, cmpProps);
            let needsRender = !!(elCtx.$flags$ & HOST_FLAG_DIRTY);
            return needsRender || elCtx.$componentQrl$ || elCtx.$element$.hasAttribute("q:id") || (setQId(rCtx, elCtx), 
            elCtx.$componentQrl$ = cmpProps["q:renderFn"], assertQrl(elCtx.$componentQrl$), 
            needsRender = !0), needsRender ? maybeThen(renderComponent(rCtx, elCtx, flags), (() => renderContentProjection(rCtx, elCtx, newVnode, flags))) : renderContentProjection(rCtx, elCtx, newVnode, flags);
        }
        if ("q:s" in props) {
            return assertDefined(), void currentComponent.$slots$.push(newVnode);
        }
        if ("dangerouslySetInnerHTML" in props) {
            setProperty(staticCtx, elm, "innerHTML", props.dangerouslySetInnerHTML);
        } else if (!(2 & vnodeFlags)) {
            return smartUpdateChildren(rCtx, oldVnode, newVnode, flags);
        }
    };
    const renderContentProjection = (rCtx, hostCtx, vnode, flags) => {
        if (2 & vnode.$flags$) {
            return;
        }
        const staticCtx = rCtx.$static$;
        const splittedNewChildren = splitChildren(vnode.$children$);
        const slotMaps = getSlotMap(hostCtx);
        for (const key in slotMaps.slots) {
            if (!splittedNewChildren[key]) {
                const slotEl = slotMaps.slots[key];
                const oldCh = getChildrenVnodes(slotEl, isChildComponent);
                if (oldCh.length > 0) {
                    const slotCtx = tryGetContext(slotEl);
                    slotCtx && slotCtx.$vdom$ && (slotCtx.$vdom$.$children$ = []), removeChildren(staticCtx, oldCh, 0, oldCh.length - 1);
                }
            }
        }
        for (const key in slotMaps.templates) {
            const templateEl = slotMaps.templates[key];
            templateEl && !splittedNewChildren[key] && (slotMaps.templates[key] = void 0, removeNode(staticCtx, templateEl));
        }
        return promiseAll(Object.keys(splittedNewChildren).map((slotName => {
            const newVdom = splittedNewChildren[slotName];
            const slotCtx = getSlotCtx(staticCtx, slotMaps, hostCtx, slotName, rCtx.$static$.$containerState$);
            const oldVdom = getVdom(slotCtx);
            const slotRctx = pushRenderContext(rCtx);
            const slotEl = slotCtx.$element$;
            slotRctx.$slotCtx$ = slotCtx, slotCtx.$vdom$ = newVdom, newVdom.$elm$ = slotEl;
            let newFlags = -2 & flags;
            slotEl.isSvg && (newFlags |= IS_SVG);
            const index = staticCtx.$addSlots$.findIndex((slot => slot[0] === slotEl));
            return index >= 0 && staticCtx.$addSlots$.splice(index, 1), smartUpdateChildren(slotRctx, oldVdom, newVdom, newFlags);
        })));
    };
    const addChildren = (ctx, parentElm, before, vnodes, startIdx, endIdx, flags) => {
        const promises = [];
        for (;startIdx <= endIdx; ++startIdx) {
            const ch = vnodes[startIdx];
            assertDefined();
            const elm = createElm(ctx, ch, flags, promises);
            insertBefore(ctx.$static$, parentElm, elm, before);
        }
        return promiseAllLazy(promises);
    };
    const removeChildren = (staticCtx, nodes, startIdx, endIdx) => {
        for (;startIdx <= endIdx; ++startIdx) {
            const ch = nodes[startIdx];
            ch && (assertDefined(), removeNode(staticCtx, ch.$elm$));
        }
    };
    const getSlotCtx = (staticCtx, slotMaps, hostCtx, slotName, containerState) => {
        const slotEl = slotMaps.slots[slotName];
        if (slotEl) {
            return getContext(slotEl, containerState);
        }
        const templateEl = slotMaps.templates[slotName];
        if (templateEl) {
            return getContext(templateEl, containerState);
        }
        const template = createTemplate(staticCtx.$doc$, slotName);
        const elCtx = createContext(template);
        return elCtx.$parentCtx$ = hostCtx, prepend(staticCtx, hostCtx.$element$, template), 
        slotMaps.templates[slotName] = template, elCtx;
    };
    const getSlotName = node => node.$props$[QSlot] ?? "";
    const createElm = (rCtx, vnode, flags, promises) => {
        const tag = vnode.$type$;
        const doc = rCtx.$static$.$doc$;
        const currentComponent = rCtx.$cmpCtx$;
        if ("#text" === tag) {
            return vnode.$elm$ = doc.createTextNode(vnode.$text$);
        }
        if ("#signal" === tag) {
            const signal = vnode.$signal$;
            assertDefined(), assertDefined();
            const signalValue = signal.value;
            if (isJSXNode(signalValue)) {
                const processedSignal = processData(signalValue);
                if (isSignal(processedSignal)) {
                    throw new Error("NOT IMPLEMENTED: Promise");
                }
                if (Array.isArray(processedSignal)) {
                    throw new Error("NOT IMPLEMENTED: Array");
                }
                {
                    const elm = createElm(rCtx, processedSignal, flags, promises);
                    return trackSignal(signal, 4 & flags ? [ 3, elm, signal, elm ] : [ 4, currentComponent.$element$, signal, elm ]), 
                    vnode.$elm$ = elm;
                }
            }
            {
                const elm = doc.createTextNode(vnode.$text$);
                return elm.data = vnode.$text$ = jsxToString(signalValue), trackSignal(signal, 4 & flags ? [ 3, elm, signal, elm ] : [ 4, currentComponent.$element$, signal, elm ]), 
                vnode.$elm$ = elm;
            }
        }
        let elm;
        let isSvg = !!(flags & IS_SVG);
        isSvg || "svg" !== tag || (flags |= IS_SVG, isSvg = !0);
        const isVirtual = tag === VIRTUAL;
        const props = vnode.$props$;
        const staticCtx = rCtx.$static$;
        const containerState = staticCtx.$containerState$;
        isVirtual ? elm = newVirtualElement(doc, isSvg) : "head" === tag ? (elm = doc.head, 
        flags |= IS_HEAD) : (elm = createElement(doc, tag, isSvg), flags &= -3), 2 & vnode.$flags$ && (flags |= 4), 
        vnode.$elm$ = elm;
        const elCtx = createContext(elm);
        if (rCtx.$slotCtx$ ? (elCtx.$parentCtx$ = rCtx.$slotCtx$, elCtx.$realParentCtx$ = rCtx.$cmpCtx$) : elCtx.$parentCtx$ = rCtx.$cmpCtx$, 
        isVirtual) {
            if ("q:renderFn" in props) {
                const renderQRL = props["q:renderFn"];
                assertQrl(renderQRL);
                const target = createPropsState();
                const manager = containerState.$subsManager$.$createManager$();
                const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
                const expectProps = props.props;
                if (containerState.$proxyMap$.set(target, proxy), elCtx.$props$ = proxy, expectProps !== EMPTY_OBJ) {
                    const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
                    for (const prop in expectProps) {
                        if ("children" !== prop && prop !== QSlot) {
                            const immutableValue = immutableMeta[prop];
                            isSignal(immutableValue) ? target["$$" + prop] = immutableValue : target[prop] = expectProps[prop];
                        }
                    }
                }
                setQId(rCtx, elCtx), elCtx.$componentQrl$ = renderQRL;
                const wait = maybeThen(renderComponent(rCtx, elCtx, flags), (() => {
                    let children = vnode.$children$;
                    if (0 === children.length) {
                        return;
                    }
                    1 === children.length && ":skipRender" === children[0].$type$ && (children = children[0].$children$);
                    const slotMap = getSlotMap(elCtx);
                    const p = [];
                    const splittedNewChildren = splitChildren(children);
                    for (const slotName in splittedNewChildren) {
                        const newVnode = splittedNewChildren[slotName];
                        const slotCtx = getSlotCtx(staticCtx, slotMap, elCtx, slotName, staticCtx.$containerState$);
                        const slotRctx = pushRenderContext(rCtx);
                        const slotEl = slotCtx.$element$;
                        slotRctx.$slotCtx$ = slotCtx, slotCtx.$vdom$ = newVnode, newVnode.$elm$ = slotEl;
                        let newFlags = -2 & flags;
                        slotEl.isSvg && (newFlags |= IS_SVG);
                        for (const node of newVnode.$children$) {
                            const nodeElm = createElm(slotRctx, node, newFlags, p);
                            assertDefined(), assertEqual(), appendChild(staticCtx, slotEl, nodeElm);
                        }
                    }
                    return promiseAllLazy(p);
                }));
                return isPromise(wait) && promises.push(wait), elm;
            }
            if ("q:s" in props) {
                assertDefined(), assertDefined(), setKey(elm, vnode.$key$), directSetAttribute(elm, "q:sref", currentComponent.$id$), 
                directSetAttribute(elm, "q:s", ""), currentComponent.$slots$.push(vnode), staticCtx.$addSlots$.push([ elm, currentComponent.$element$ ]);
            } else if ("dangerouslySetInnerHTML" in props) {
                return setProperty(staticCtx, elm, "innerHTML", props.dangerouslySetInnerHTML), 
                elm;
            }
        } else {
            if (vnode.$immutableProps$) {
                const immProps = props !== EMPTY_OBJ ? Object.fromEntries(Object.entries(vnode.$immutableProps$).map((([k, v]) => [ k, v === _IMMUTABLE ? props[k] : v ]))) : vnode.$immutableProps$;
                setProperties(staticCtx, elCtx, currentComponent, immProps, isSvg, !0);
            }
            if (props !== EMPTY_OBJ) {
                elCtx.$vdom$ = vnode;
                const p = vnode.$immutableProps$ ? Object.fromEntries(Object.entries(props).filter((([k]) => !(k in vnode.$immutableProps$)))) : props;
                vnode.$props$ = setProperties(staticCtx, elCtx, currentComponent, p, isSvg, !1);
            }
            if (isSvg && "foreignObject" === tag && (isSvg = !1, flags &= -2), currentComponent) {
                const scopedIds = currentComponent.$scopeIds$;
                scopedIds && scopedIds.forEach((styleId => {
                    elm.classList.add(styleId);
                })), currentComponent.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER && (elCtx.li.push(...currentComponent.li), 
                currentComponent.$flags$ &= -3);
            }
            for (const listener of elCtx.li) {
                addQwikEvent(staticCtx, elm, listener[0]);
            }
            if (void 0 !== props.dangerouslySetInnerHTML) {
                return elm;
            }
            isSvg && "foreignObject" === tag && (isSvg = !1, flags &= -2);
        }
        let children = vnode.$children$;
        if (0 === children.length) {
            return elm;
        }
        1 === children.length && ":skipRender" === children[0].$type$ && (children = children[0].$children$);
        const nodes = children.map((ch => createElm(rCtx, ch, flags, promises)));
        for (const node of nodes) {
            directAppendChild(elm, node);
        }
        return elm;
    };
    const getSlotMap = elCtx => {
        const slotsArray = (elCtx => {
            const slots = elCtx.$slots$;
            if (!slots) {
                return assertDefined(), elCtx.$slots$ = readDOMSlots(elCtx);
            }
            return slots;
        })(elCtx);
        const slots = {};
        const templates = {};
        const t = Array.from(elCtx.$element$.childNodes).filter(isSlotTemplate);
        for (const vnode of slotsArray) {
            assertQwikElement(), slots[vnode.$key$ ?? ""] = vnode.$elm$;
        }
        for (const elm of t) {
            templates[directGetAttribute(elm, QSlot) ?? ""] = elm;
        }
        return {
            slots,
            templates
        };
    };
    const readDOMSlots = elCtx => {
        const parent = elCtx.$element$.parentElement;
        return assertDefined(), queryAllVirtualByAttribute(parent, "q:sref", elCtx.$id$).map(domToVnode);
    };
    const handleClass = (ctx, elm, newValue) => (assertTrue(), elm.namespaceURI === SVG_NS ? setAttribute(ctx, elm, "class", newValue) : setProperty(ctx, elm, "className", newValue), 
    !0);
    const checkBeforeAssign = (ctx, elm, newValue, prop) => prop in elm && ((elm[prop] !== newValue || "value" === prop && !elm.hasAttribute(prop)) && ("value" === prop && "OPTION" !== elm.tagName ? setPropertyPost(ctx, elm, prop, newValue) : setProperty(ctx, elm, prop, newValue)), 
    !0);
    const forceAttribute = (ctx, elm, newValue, prop) => (setAttribute(ctx, elm, prop.toLowerCase(), newValue), 
    !0);
    const PROP_HANDLER_MAP = {
        style: (ctx, elm, newValue) => (setProperty(ctx, elm.style, "cssText", newValue), 
        !0),
        class: handleClass,
        className: handleClass,
        value: checkBeforeAssign,
        checked: checkBeforeAssign,
        href: forceAttribute,
        list: forceAttribute,
        form: forceAttribute,
        tabIndex: forceAttribute,
        download: forceAttribute,
        innerHTML: () => !0,
        [dangerouslySetInnerHTML]: (ctx, elm, newValue) => (setProperty(ctx, elm, "innerHTML", newValue), 
        !0)
    };
    const smartSetProperty = (staticCtx, elm, prop, newValue, isSvg) => {
        if (isAriaAttribute(prop)) {
            return void setAttribute(staticCtx, elm, prop, null != newValue ? String(newValue) : newValue);
        }
        const exception = PROP_HANDLER_MAP[prop];
        exception && exception(staticCtx, elm, newValue, prop) || (isSvg || !(prop in elm) ? (prop.startsWith("preventdefault:") && registerQwikEvent(prop.slice(15)), 
        setAttribute(staticCtx, elm, prop, newValue)) : setProperty(staticCtx, elm, prop, newValue));
    };
    const setProperties = (staticCtx, elCtx, hostCtx, newProps, isSvg, immutable) => {
        const values = {};
        const elm = elCtx.$element$;
        for (const prop in newProps) {
            let newValue = newProps[prop];
            if ("ref" !== prop) {
                if (isOnProp(prop)) {
                    setEvent(elCtx.li, prop, newValue, staticCtx.$containerState$.$containerEl$);
                } else {
                    if (isSignal(newValue) && (assertDefined(), newValue = trackSignal(newValue, immutable ? [ 1, elm, newValue, hostCtx.$element$, prop ] : [ 2, hostCtx.$element$, newValue, elm, prop ])), 
                    "class" === prop) {
                        if (newValue = serializeClassWithHost(newValue, hostCtx), !newValue) {
                            continue;
                        }
                    } else {
                        "style" === prop && (newValue = stringifyStyle(newValue));
                    }
                    values[prop] = newValue, smartSetProperty(staticCtx, elm, prop, newValue, isSvg);
                }
            } else {
                assertElement(), void 0 !== newValue && setRef(newValue, elm);
            }
        }
        return values;
    };
    const setComponentProps = (containerState, elCtx, expectProps) => {
        let props = elCtx.$props$;
        if (props || (elCtx.$props$ = props = createProxy(createPropsState(), containerState)), 
        expectProps === EMPTY_OBJ) {
            return;
        }
        const manager = getSubscriptionManager(props);
        assertDefined();
        const target = getProxyTarget(props);
        assertDefined();
        const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
        for (const prop in expectProps) {
            if ("children" !== prop && prop !== QSlot && !immutableMeta[prop]) {
                const value = expectProps[prop];
                target[prop] !== value && (target[prop] = value, manager.$notifySubs$(prop));
            }
        }
    };
    const cleanupTree = (elm, staticCtx, subsManager, stopSlots) => {
        if (subsManager.$clearSub$(elm), isQwikElement(elm)) {
            if (stopSlots && elm.hasAttribute("q:s")) {
                return void staticCtx.$rmSlots$.push(elm);
            }
            const ctx = tryGetContext(elm);
            ctx && ((elCtx, subsManager) => {
                elCtx.$tasks$?.forEach((task => {
                    subsManager.$clearSub$(task), destroyTask(task);
                })), elCtx.$componentQrl$ = null, elCtx.$seq$ = null, elCtx.$tasks$ = null;
            })(ctx, subsManager);
            const end = isVirtualElement(elm) ? elm.close : null;
            let node = elm.firstChild;
            for (;(node = processVirtualNodes(node)) && (cleanupTree(node, staticCtx, subsManager, !0), 
            node = node.nextSibling, node !== end); ) {}
        }
    };
    const restoreScroll = () => {
        document.__q_scroll_restore__ && (document.__q_scroll_restore__(), document.__q_scroll_restore__ = void 0);
    };
    const executeContextWithScrollAndTransition = async ctx => {
        if (build.isBrowser && document.__q_view_transition__ && (document.__q_view_transition__ = void 0, 
        document.startViewTransition)) {
            const transition = document.startViewTransition((() => {
                executeDOMRender(ctx), restoreScroll();
            }));
            const event = new CustomEvent("qviewTransition", {
                detail: transition
            });
            return document.dispatchEvent(event), void await transition.finished;
        }
        executeDOMRender(ctx), build.isBrowser && restoreScroll();
    };
    const directAppendChild = (parent, child) => {
        isVirtualElement(child) ? child.appendTo(parent) : parent.appendChild(child);
    };
    const directInsertAfter = (parent, child, ref) => {
        isVirtualElement(child) ? child.insertBeforeTo(parent, ref?.nextSibling ?? null) : parent.insertBefore(child, ref?.nextSibling ?? null);
    };
    const directInsertBefore = (parent, child, ref) => {
        isVirtualElement(child) ? child.insertBeforeTo(parent, getRootNode(ref)) : parent.insertBefore(child, getRootNode(ref));
    };
    const createKeyToOldIdx = (children, beginIdx, endIdx) => {
        const map = {};
        for (let i = beginIdx; i <= endIdx; ++i) {
            const key = children[i].$key$;
            null != key && (map[key] = i);
        }
        return map;
    };
    const addQwikEvent = (staticCtx, elm, prop) => {
        prop.startsWith("on:") || setAttribute(staticCtx, elm, prop, ""), registerQwikEvent(prop);
    };
    const registerQwikEvent = prop => {
        {
            const eventName = getEventName(prop);
            try {
                (globalThis.qwikevents ||= []).push(eventName);
            } catch (err) {
                logWarn(err);
            }
        }
    };
    const setAttribute = (staticCtx, el, prop, value) => {
        staticCtx.$operations$.push({
            $operation$: _setAttribute,
            $args$: [ el, prop, value ]
        });
    };
    const _setAttribute = (el, prop, value) => {
        if (null == value || !1 === value) {
            el.removeAttribute(prop);
        } else {
            const str = !0 === value ? "" : String(value);
            directSetAttribute(el, prop, str);
        }
    };
    const setProperty = (staticCtx, node, key, value) => {
        staticCtx.$operations$.push({
            $operation$: _setProperty,
            $args$: [ node, key, value ]
        });
    };
    const setPropertyPost = (staticCtx, node, key, value) => {
        staticCtx.$postOperations$.push({
            $operation$: _setProperty,
            $args$: [ node, key, value ]
        });
    };
    const _setProperty = (node, key, value) => {
        try {
            node[key] = null == value ? "" : value, null == value && isNode$1(node) && isElement$1(node) && node.removeAttribute(key);
        } catch (err) {
            logError(codeToText(6), key, {
                node,
                value
            }, err);
        }
    };
    const createElement = (doc, expectTag, isSvg) => isSvg ? doc.createElementNS(SVG_NS, expectTag) : doc.createElement(expectTag);
    const insertBefore = (staticCtx, parent, newChild, refChild) => (staticCtx.$operations$.push({
        $operation$: directInsertBefore,
        $args$: [ parent, newChild, refChild || null ]
    }), newChild);
    const insertAfter = (staticCtx, parent, newChild, refChild) => (staticCtx.$operations$.push({
        $operation$: directInsertAfter,
        $args$: [ parent, newChild, refChild || null ]
    }), newChild);
    const appendChild = (staticCtx, parent, newChild) => (staticCtx.$operations$.push({
        $operation$: directAppendChild,
        $args$: [ parent, newChild ]
    }), newChild);
    const appendHeadStyle = (staticCtx, styleTask) => {
        staticCtx.$containerState$.$styleIds$.add(styleTask.styleId), staticCtx.$postOperations$.push({
            $operation$: _appendHeadStyle,
            $args$: [ staticCtx.$containerState$, styleTask ]
        });
    };
    const _appendHeadStyle = (containerState, styleTask) => {
        const containerEl = containerState.$containerEl$;
        const doc = getDocument(containerEl);
        const isDoc = doc.documentElement === containerEl;
        const headEl = doc.head;
        const style = doc.createElement("style");
        isDoc && !headEl && logWarn("document.head is undefined"), directSetAttribute(style, "q:style", styleTask.styleId), 
        directSetAttribute(style, "hidden", ""), style.textContent = styleTask.content, 
        isDoc && headEl ? directAppendChild(headEl, style) : directInsertBefore(containerEl, style, containerEl.firstChild);
    };
    const prepend = (staticCtx, parent, newChild) => {
        staticCtx.$operations$.push({
            $operation$: directPrepend,
            $args$: [ parent, newChild ]
        });
    };
    const directPrepend = (parent, newChild) => {
        directInsertBefore(parent, newChild, parent.firstChild);
    };
    const removeNode = (staticCtx, el) => {
        if (isQwikElement(el)) {
            cleanupTree(el, staticCtx, staticCtx.$containerState$.$subsManager$, !0);
        }
        staticCtx.$operations$.push({
            $operation$: _removeNode,
            $args$: [ el, staticCtx ]
        });
    };
    const _removeNode = el => {
        const parent = el.parentElement;
        parent && ((parent, child) => {
            isVirtualElement(child) ? child.remove() : parent.removeChild(child);
        })(parent, el);
    };
    const createTemplate = (doc, slotName) => {
        const template = createElement(doc, "q:template", !1);
        return directSetAttribute(template, QSlot, slotName), directSetAttribute(template, "hidden", ""), 
        directSetAttribute(template, "aria-hidden", "true"), template;
    };
    const executeDOMRender = staticCtx => {
        for (const op of staticCtx.$operations$) {
            op.$operation$.apply(void 0, op.$args$);
        }
        resolveSlotProjection(staticCtx);
    };
    const getKey = el => directGetAttribute(el, "q:key");
    const setKey = (el, key) => {
        null !== key && directSetAttribute(el, "q:key", key);
    };
    const resolveSlotProjection = staticCtx => {
        const subsManager = staticCtx.$containerState$.$subsManager$;
        for (const slotEl of staticCtx.$rmSlots$) {
            const key = getKey(slotEl);
            assertDefined();
            const slotChildren = getChildren(slotEl, isChildComponent);
            if (slotChildren.length > 0) {
                const sref = slotEl.getAttribute("q:sref");
                const hostCtx = staticCtx.$roots$.find((r => r.$id$ === sref));
                if (hostCtx) {
                    const hostElm = hostCtx.$element$;
                    if (hostElm.isConnected) {
                        if (getChildren(hostElm, isSlotTemplate).some((node => directGetAttribute(node, QSlot) === key))) {
                            cleanupTree(slotEl, staticCtx, subsManager, !1);
                        } else {
                            const template = createTemplate(staticCtx.$doc$, key);
                            for (const child of slotChildren) {
                                directAppendChild(template, child);
                            }
                            directInsertBefore(hostElm, template, hostElm.firstChild);
                        }
                    } else {
                        cleanupTree(slotEl, staticCtx, subsManager, !1);
                    }
                } else {
                    cleanupTree(slotEl, staticCtx, subsManager, !1);
                }
            }
        }
        for (const [slotEl, hostElm] of staticCtx.$addSlots$) {
            const key = getKey(slotEl);
            assertDefined();
            const template = getChildren(hostElm, isSlotTemplate).find((node => node.getAttribute(QSlot) === key));
            template && (getChildren(template, isChildComponent).forEach((child => {
                directAppendChild(slotEl, child);
            })), template.remove());
        }
    };
    const printRenderStats = () => {
        qDev;
    };
    const newVirtualElement = (doc, isSvg) => {
        const open = doc.createComment("qv ");
        const close = doc.createComment("/qv");
        return new VirtualElementImpl(open, close, isSvg);
    };
    const queryAllVirtualByAttribute = (el, prop, value) => {
        const walker = ((el, prop, value) => el.ownerDocument.createTreeWalker(el, 128, {
            acceptNode(c) {
                const virtual = getVirtualElement(c);
                return virtual && directGetAttribute(virtual, prop) === value ? 1 : 2;
            }
        }))(el, prop, value);
        const pars = [];
        let currentNode = null;
        for (;currentNode = walker.nextNode(); ) {
            pars.push(getVirtualElement(currentNode));
        }
        return pars;
    };
    const escape = s => s.replace(/ /g, "+");
    const unescape = s => s.replace(/\+/g, " ");
    const VIRTUAL = ":virtual";
    class VirtualElementImpl {
        open;
        close;
        isSvg;
        ownerDocument;
        _qc_=null;
        nodeType=111;
        localName=VIRTUAL;
        nodeName=VIRTUAL;
        $attributes$;
        $template$;
        constructor(open, close, isSvg) {
            this.open = open, this.close = close, this.isSvg = isSvg;
            const doc = this.ownerDocument = open.ownerDocument;
            this.$template$ = createElement(doc, "template", !1), this.$attributes$ = (str => {
                if (!str) {
                    return {};
                }
                const attributes = str.split(" ");
                return Object.fromEntries(attributes.map((attr => {
                    const index = attr.indexOf("=");
                    return index >= 0 ? [ attr.slice(0, index), unescape(attr.slice(index + 1)) ] : [ attr, "" ];
                })));
            })(open.data.slice(3)), assertTrue(open.data.startsWith("qv ")), open.__virtual = this, 
            close.__virtual = this, seal();
        }
        insertBefore(node, ref) {
            const parent = this.parentElement;
            if (parent) {
                parent.insertBefore(node, ref || this.close);
            } else {
                this.$template$.insertBefore(node, ref);
            }
            return node;
        }
        remove() {
            const parent = this.parentElement;
            if (parent) {
                const ch = this.childNodes;
                assertEqual(), parent.removeChild(this.open);
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
            const ch = this.childNodes;
            newParent.insertBefore(this.open, child);
            for (const c of ch) {
                newParent.insertBefore(c, child);
            }
            newParent.insertBefore(this.close, child), assertEqual();
        }
        appendTo(newParent) {
            this.insertBeforeTo(newParent, null);
        }
        get namespaceURI() {
            return this.parentElement?.namespaceURI ?? "";
        }
        removeChild(child) {
            this.parentElement ? this.parentElement.removeChild(child) : this.$template$.removeChild(child);
        }
        getAttribute(prop) {
            return this.$attributes$[prop] ?? null;
        }
        hasAttribute(prop) {
            return prop in this.$attributes$;
        }
        setAttribute(prop, value) {
            this.$attributes$[prop] = value, this.open.data = updateComment(this.$attributes$);
        }
        removeAttribute(prop) {
            delete this.$attributes$[prop], this.open.data = updateComment(this.$attributes$);
        }
        matches(_) {
            return !1;
        }
        compareDocumentPosition(other) {
            return this.open.compareDocumentPosition(other);
        }
        closest(query) {
            const parent = this.parentElement;
            return parent ? parent.closest(query) : null;
        }
        querySelectorAll(query) {
            const result = [];
            return getChildren(this, isNodeElement).forEach((el => {
                isQwikElement(el) && (el.matches(query) && result.push(el), result.concat(Array.from(el.querySelectorAll(query))));
            })), result;
        }
        querySelector(query) {
            for (const el of this.childNodes) {
                if (isElement$1(el)) {
                    if (el.matches(query)) {
                        return el;
                    }
                    const v = el.querySelector(query);
                    if (null !== v) {
                        return v;
                    }
                }
            }
            return null;
        }
        get innerHTML() {
            return "";
        }
        set innerHTML(html) {
            const parent = this.parentElement;
            parent ? (this.childNodes.forEach((a => this.removeChild(a))), this.$template$.innerHTML = html, 
            parent.insertBefore(this.$template$.content, this.close)) : this.$template$.innerHTML = html;
        }
        get firstChild() {
            if (this.parentElement) {
                const first = this.open.nextSibling;
                return first === this.close ? null : first;
            }
            return this.$template$.firstChild;
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
            for (;(node = node.nextSibling) && node !== this.close; ) {
                nodes.push(node);
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
    const updateComment = attributes => `qv ${(map => {
        const attributes = [];
        return Object.entries(map).forEach((([key, value]) => {
            attributes.push(value ? `${key}=${escape(value)}` : `${key}`);
        })), attributes.join(" ");
    })(attributes)}`;
    const processVirtualNodes = node => {
        if (null == node) {
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
    const getVirtualElement = open => {
        const virtual = open.__virtual;
        if (virtual) {
            return virtual;
        }
        if (open.data.startsWith("qv ")) {
            const close = (open => {
                let node = open;
                let stack = 1;
                for (;node = node.nextSibling; ) {
                    if (isComment(node)) {
                        const virtual = node.__virtual;
                        if (virtual) {
                            node = virtual;
                        } else if (node.data.startsWith("qv ")) {
                            stack++;
                        } else if ("/qv" === node.data && (stack--, 0 === stack)) {
                            return node;
                        }
                    }
                }
                assertFail();
            })(open);
            return new VirtualElementImpl(open, close, open.parentElement?.namespaceURI === SVG_NS);
        }
        return null;
    };
    const getRootNode = node => null == node ? null : isVirtualElement(node) ? node.open : node;
    const pauseContainer = async elmOrDoc => {
        const doc = getDocument(elmOrDoc);
        const documentElement = doc.documentElement;
        const containerEl = isDocument(elmOrDoc) ? documentElement : elmOrDoc;
        if ("paused" === directGetAttribute(containerEl, "q:container")) {
            throw qError(21);
        }
        const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;
        const containerState = _getContainerState(containerEl);
        const contexts = getNodesInScope(containerEl, hasContext);
        directSetAttribute(containerEl, "q:container", "paused");
        for (const elCtx of contexts) {
            const elm = elCtx.$element$;
            const listeners = elCtx.li;
            if (elCtx.$scopeIds$) {
                const value = serializeSStyle(elCtx.$scopeIds$);
                value && elm.setAttribute("q:sstyle", value);
            }
            if (elCtx.$id$ && elm.setAttribute("q:id", elCtx.$id$), isElement$1(elm) && listeners.length > 0) {
                const groups = groupListeners(listeners);
                for (const listener of groups) {
                    elm.setAttribute(listener[0], serializeQRLs(listener[1], containerState, elCtx));
                }
            }
        }
        const data = await _pauseFromContexts(contexts, containerState, (el => isNode$1(el) && isText(el) ? getTextID(el, containerState) : null));
        const qwikJson = doc.createElement("script");
        directSetAttribute(qwikJson, "type", "qwik/json"), qwikJson.textContent = escapeText(JSON.stringify(data.state, void 0, void 0)), 
        parentJSON.appendChild(qwikJson);
        const extraListeners = Array.from(containerState.$events$, (s => JSON.stringify(s)));
        const eventsScript = doc.createElement("script");
        return eventsScript.textContent = `(window.qwikevents||=[]).push(${extraListeners.join(", ")})`, 
        parentJSON.appendChild(eventsScript), data;
    };
    const _pauseFromContexts = async (allContexts, containerState, fallbackGetObjId, textNodes) => {
        const collector = createCollector(containerState);
        textNodes?.forEach(((_, key) => {
            collector.$seen$.add(key);
        }));
        let hasListeners = !1;
        for (const ctx of allContexts) {
            if (ctx.$tasks$) {
                for (const task of ctx.$tasks$) {
                    isResourceTask(task) && collector.$resources$.push(task.$state$), destroyTask(task);
                }
            }
        }
        for (const ctx of allContexts) {
            const el = ctx.$element$;
            const ctxListeners = ctx.li;
            for (const listener of ctxListeners) {
                if (isElement$1(el)) {
                    const qrl = listener[1];
                    const captured = qrl.$captureRef$;
                    if (captured) {
                        for (const obj of captured) {
                            collectValue(obj, collector, !0);
                        }
                    }
                    collector.$qrls$.push(qrl), hasListeners = !0;
                }
            }
        }
        if (!hasListeners) {
            return {
                state: {
                    refs: {},
                    ctx: {},
                    objs: [],
                    subs: []
                },
                objs: [],
                funcs: [],
                qrls: [],
                resources: collector.$resources$,
                mode: "static"
            };
        }
        let promises;
        for (;(promises = collector.$promises$).length > 0; ) {
            collector.$promises$ = [], await Promise.all(promises);
        }
        const canRender = collector.$elements$.length > 0;
        if (canRender) {
            for (const elCtx of collector.$deferElements$) {
                collectElementData(elCtx, collector, elCtx.$element$);
            }
            for (const ctx of allContexts) {
                collectProps(ctx, collector);
            }
        }
        for (;(promises = collector.$promises$).length > 0; ) {
            collector.$promises$ = [], await Promise.all(promises);
        }
        const elementToIndex = new Map;
        const objs = Array.from(collector.$objSet$.keys());
        const objToId = new Map;
        const getObjId = obj => {
            let suffix = "";
            if (isPromise(obj)) {
                const promiseValue = getPromiseValue(obj);
                if (!promiseValue) {
                    return null;
                }
                obj = promiseValue.value, suffix += promiseValue.resolved ? "~" : "_";
            }
            if (isObject(obj)) {
                const target = getProxyTarget(obj);
                if (target) {
                    suffix += "!", obj = target;
                } else if (isQwikElement(obj)) {
                    const elID = (el => {
                        let id = elementToIndex.get(el);
                        return void 0 === id && (id = getQId(el), id || console.warn("Missing ID", el), 
                        elementToIndex.set(el, id)), id;
                    })(obj);
                    return elID ? "#" + elID + suffix : null;
                }
            }
            const id = objToId.get(obj);
            if (id) {
                return id + suffix;
            }
            const textId = textNodes?.get(obj);
            return textId ? "*" + textId : fallbackGetObjId ? fallbackGetObjId(obj) : null;
        };
        const mustGetObjId = obj => {
            const key = getObjId(obj);
            if (null === key) {
                if (isQrl(obj)) {
                    const id = intToStr(objToId.size);
                    return objToId.set(obj, id), id;
                }
                throw qError(27, obj);
            }
            return key;
        };
        const subsMap = new Map;
        for (const obj of objs) {
            const subs = getManager(obj, containerState)?.$subs$;
            if (!subs) {
                continue;
            }
            const flags = getProxyFlags(obj) ?? 0;
            const converted = [];
            1 & flags && converted.push(flags);
            for (const sub of subs) {
                const host = sub[1];
                0 === sub[0] && isNode$1(host) && isVirtualElement(host) && !collector.$elements$.includes(tryGetContext(host)) || converted.push(sub);
            }
            converted.length > 0 && subsMap.set(obj, converted);
        }
        objs.sort(((a, b) => (subsMap.has(a) ? 0 : 1) - (subsMap.has(b) ? 0 : 1)));
        let count = 0;
        for (const obj of objs) {
            objToId.set(obj, intToStr(count)), count++;
        }
        if (collector.$noSerialize$.length > 0) {
            const undefinedID = objToId.get(void 0);
            assertDefined();
            for (const obj of collector.$noSerialize$) {
                objToId.set(obj, undefinedID);
            }
        }
        const subs = [];
        for (const obj of objs) {
            const value = subsMap.get(obj);
            if (null == value) {
                break;
            }
            subs.push(value.map((s => "number" == typeof s ? `_${s}` : serializeSubscription(s, getObjId))).filter(isNotNullable));
        }
        assertEqual();
        const convertedObjs = serializeObjects(objs, mustGetObjId, getObjId, collector, containerState);
        const meta = {};
        const refs = {};
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
            if (assertDefined(), ref.length > 0) {
                assertElement();
                const value = mapJoin(ref, mustGetObjId, " ");
                value && (refs[elementID] = value);
            } else if (canRender) {
                let add = !1;
                if (elementCaptured) {
                    assertDefined();
                    const propsId = getObjId(props);
                    metaValue.h = mustGetObjId(renderQrl) + (propsId ? " " + propsId : ""), add = !0;
                } else {
                    const propsId = getObjId(props);
                    propsId && (metaValue.h = " " + propsId, add = !0);
                }
                if (tasks && tasks.length > 0) {
                    const value = mapJoin(tasks, getObjId, " ");
                    value && (metaValue.w = value, add = !0);
                }
                if (elementCaptured && seq && seq.length > 0) {
                    const value = mapJoin(seq, mustGetObjId, " ");
                    metaValue.s = value, add = !0;
                }
                if (contexts) {
                    const serializedContexts = [];
                    contexts.forEach(((value, key) => {
                        const id = getObjId(value);
                        id && serializedContexts.push(`${key}=${id}`);
                    }));
                    const value = serializedContexts.join(" ");
                    value && (metaValue.c = value, add = !0);
                }
                add && (meta[elementID] = metaValue);
            }
        }
        return {
            state: {
                refs,
                ctx: meta,
                objs: convertedObjs,
                subs
            },
            objs,
            funcs: collector.$inlinedFunctions$,
            resources: collector.$resources$,
            qrls: collector.$qrls$,
            mode: canRender ? "render" : "listeners"
        };
    };
    const mapJoin = (objects, getObjectId, sep) => {
        let output = "";
        for (const obj of objects) {
            const id = getObjectId(obj);
            null !== id && ("" !== output && (output += sep), output += id);
        }
        return output;
    };
    const getNodesInScope = (parent, predicate) => {
        const results = [];
        const v = predicate(parent);
        void 0 !== v && results.push(v);
        const walker = parent.ownerDocument.createTreeWalker(parent, 1 | SHOW_COMMENT$1, {
            acceptNode(node) {
                if (isContainer(node)) {
                    return 2;
                }
                const v = predicate(node);
                return void 0 !== v && results.push(v), 3;
            }
        });
        for (;walker.nextNode(); ) {}
        return results;
    };
    const collectProps = (elCtx, collector) => {
        const parentCtx = elCtx.$realParentCtx$ || elCtx.$parentCtx$;
        const props = elCtx.$props$;
        if (parentCtx && props && !isEmptyObj(props) && collector.$elements$.includes(parentCtx)) {
            const subs = getSubscriptionManager(props)?.$subs$;
            const el = elCtx.$element$;
            if (subs) {
                for (const [type, host] of subs) {
                    0 === type ? (host !== el && collectSubscriptions(getSubscriptionManager(props), collector, !1), 
                    isNode$1(host) ? collectElement(host, collector) : collectValue(host, collector, !0)) : (collectValue(props, collector, !1), 
                    collectSubscriptions(getSubscriptionManager(props), collector, !1));
                }
            }
        }
    };
    const createCollector = containerState => {
        const inlinedFunctions = [];
        return containerState.$inlineFns$.forEach(((id, fnStr) => {
            for (;inlinedFunctions.length <= id; ) {
                inlinedFunctions.push("");
            }
            inlinedFunctions[id] = fnStr;
        })), {
            $containerState$: containerState,
            $seen$: new Set,
            $objSet$: new Set,
            $prefetch$: 0,
            $noSerialize$: [],
            $inlinedFunctions$: inlinedFunctions,
            $resources$: [],
            $elements$: [],
            $qrls$: [],
            $deferElements$: [],
            $promises$: []
        };
    };
    const collectDeferElement = (el, collector) => {
        const ctx = tryGetContext(el);
        collector.$elements$.includes(ctx) || (collector.$elements$.push(ctx), ctx.$flags$ & HOST_FLAG_DYNAMIC ? (collector.$prefetch$++, 
        collectElementData(ctx, collector, !0), collector.$prefetch$--) : collector.$deferElements$.push(ctx));
    };
    const collectElement = (el, collector) => {
        const ctx = tryGetContext(el);
        if (ctx) {
            if (collector.$elements$.includes(ctx)) {
                return;
            }
            collector.$elements$.push(ctx), collectElementData(ctx, collector, el);
        }
    };
    const collectElementData = (elCtx, collector, dynamicCtx) => {
        if (elCtx.$props$ && !isEmptyObj(elCtx.$props$) && (collectValue(elCtx.$props$, collector, dynamicCtx), 
        collectSubscriptions(getSubscriptionManager(elCtx.$props$), collector, dynamicCtx)), 
        elCtx.$componentQrl$ && collectValue(elCtx.$componentQrl$, collector, dynamicCtx), 
        elCtx.$seq$) {
            for (const obj of elCtx.$seq$) {
                collectValue(obj, collector, dynamicCtx);
            }
        }
        if (elCtx.$tasks$) {
            const map = collector.$containerState$.$subsManager$.$groupToManagers$;
            for (const obj of elCtx.$tasks$) {
                map.has(obj) && collectValue(obj, collector, dynamicCtx);
            }
        }
        if (!0 === dynamicCtx && (collectContext(elCtx, collector), elCtx.$dynamicSlots$)) {
            for (const slotCtx of elCtx.$dynamicSlots$) {
                collectContext(slotCtx, collector);
            }
        }
    };
    const collectContext = (elCtx, collector) => {
        for (;elCtx; ) {
            if (elCtx.$contexts$) {
                for (const obj of elCtx.$contexts$.values()) {
                    collectValue(obj, collector, !0);
                }
            }
            elCtx = elCtx.$parentCtx$;
        }
    };
    const escapeText = str => str.replace(/<(\/?script)/gi, "\\x3C$1");
    const collectSubscriptions = (manager, collector, leaks) => {
        if (collector.$seen$.has(manager)) {
            return;
        }
        collector.$seen$.add(manager);
        const subs = manager.$subs$;
        assertDefined();
        for (const sub of subs) {
            if (sub[0] > 0 && collectValue(sub[2], collector, leaks), !0 === leaks) {
                const host = sub[1];
                isNode$1(host) && isVirtualElement(host) ? 0 === sub[0] && collectDeferElement(host, collector) : collectValue(host, collector, !0);
            }
        }
    };
    const PROMISE_VALUE = Symbol();
    const getPromiseValue = promise => promise[PROMISE_VALUE];
    const collectValue = (obj, collector, leaks) => {
        if (null != obj) {
            const objType = typeof obj;
            switch (objType) {
              case "function":
              case "object":
                {
                    if (collector.$seen$.has(obj)) {
                        return;
                    }
                    if (collector.$seen$.add(obj), fastSkipSerialize(obj)) {
                        return collector.$objSet$.add(void 0), void collector.$noSerialize$.push(obj);
                    }
                    const input = obj;
                    const target = getProxyTarget(obj);
                    if (target) {
                        const mutable = !(2 & getProxyFlags(obj = target));
                        if (leaks && mutable && collectSubscriptions(getSubscriptionManager(input), collector, leaks), 
                        fastWeakSerialize(input)) {
                            return void collector.$objSet$.add(obj);
                        }
                    }
                    if (collectDeps(obj, collector, leaks)) {
                        return void collector.$objSet$.add(obj);
                    }
                    if (isPromise(obj)) {
                        return void collector.$promises$.push((promise = obj, promise.then((value => (promise[PROMISE_VALUE] = {
                            resolved: !0,
                            value
                        }, value)), (value => (promise[PROMISE_VALUE] = {
                            resolved: !1,
                            value
                        }, value)))).then((value => {
                            collectValue(value, collector, leaks);
                        })));
                    }
                    if ("object" === objType) {
                        if (isNode$1(obj)) {
                            return;
                        }
                        if (isArray(obj)) {
                            for (let i = 0; i < obj.length; i++) {
                                collectValue(input[i], collector, leaks);
                            }
                        } else if (isSerializableObject(obj)) {
                            for (const key in obj) {
                                collectValue(input[key], collector, leaks);
                            }
                        }
                    }
                    break;
                }
            }
        }
        var promise;
        collector.$objSet$.add(obj);
    };
    const isContainer = el => isElement$1(el) && el.hasAttribute("q:container");
    const hasContext = el => {
        const node = processVirtualNodes(el);
        if (isQwikElement(node)) {
            const ctx = tryGetContext(node);
            if (ctx && ctx.$id$) {
                return ctx;
            }
        }
    };
    const getManager = (obj, containerState) => {
        if (!isObject(obj)) {
            return;
        }
        if (obj instanceof SignalImpl) {
            return getSubscriptionManager(obj);
        }
        const proxy = containerState.$proxyMap$.get(obj);
        return proxy ? getSubscriptionManager(proxy) : void 0;
    };
    const getQId = el => {
        const ctx = tryGetContext(el);
        return ctx ? ctx.$id$ : null;
    };
    const getTextID = (node, containerState) => {
        const prev = node.previousSibling;
        if (prev && isComment(prev) && prev.data.startsWith("t=")) {
            return "#" + prev.data.slice(2);
        }
        const doc = node.ownerDocument;
        const id = intToStr(containerState.$elementIndex$++);
        const open = doc.createComment(`t=${id}`);
        const close = doc.createComment("");
        const parent = node.parentElement;
        return parent.insertBefore(open, node), parent.insertBefore(close, node.nextSibling), 
        "#" + id;
    };
    const isEmptyObj = obj => 0 === Object.keys(obj).length;
    function serializeObjects(objs, mustGetObjId, getObjId, collector, containerState) {
        return objs.map((obj => {
            if (null === obj) {
                return null;
            }
            const typeObj = typeof obj;
            switch (typeObj) {
              case "undefined":
                return UNDEFINED_PREFIX;

              case "number":
                if (!Number.isFinite(obj)) {
                    break;
                }
                return obj;

              case "string":
                if (obj.charCodeAt(0) < 32) {
                    break;
                }
                return obj;

              case "boolean":
                return obj;
            }
            const value = serializeValue(obj, mustGetObjId, collector, containerState);
            if (void 0 !== value) {
                return value;
            }
            if ("object" === typeObj) {
                if (isArray(obj)) {
                    return obj.map(mustGetObjId);
                }
                if (isSerializableObject(obj)) {
                    const output = {};
                    for (const key in obj) {
                        if (getObjId) {
                            const id = getObjId(obj[key]);
                            null !== id && (output[key] = id);
                        } else {
                            output[key] = mustGetObjId(obj[key]);
                        }
                    }
                    return output;
                }
            }
            throw qError(3, obj);
        }));
    }
    const EXTRACT_IMPORT_PATH = /\(\s*(['"])([^\1]+)\1\s*\)/;
    const EXTRACT_SELF_IMPORT = /Promise\s*\.\s*resolve/;
    const EXTRACT_FILE_NAME = /[\\/(]([\w\d.\-_]+\.(js|ts)x?):/;
    const announcedQRL = /*#__PURE__*/ new Set;
    const qrl = (chunkOrFn, symbol, lexicalScopeCapture = EMPTY_ARRAY, stackOffset = 0) => {
        let chunk = null;
        let symbolFn = null;
        if (isFunction(chunkOrFn)) {
            symbolFn = chunkOrFn;
            {
                let match;
                const srcCode = String(chunkOrFn);
                if ((match = srcCode.match(EXTRACT_IMPORT_PATH)) && match[2]) {
                    chunk = match[2];
                } else {
                    if (!(match = srcCode.match(EXTRACT_SELF_IMPORT))) {
                        throw qError(11, srcCode);
                    }
                    {
                        const ref = "QWIK-SELF";
                        const frames = new Error(ref).stack.split("\n");
                        const start = frames.findIndex((f => f.includes(ref)));
                        match = frames[start + 2 + stackOffset].match(EXTRACT_FILE_NAME), chunk = match ? match[1] : "main";
                    }
                }
            }
        } else {
            if (!isString(chunkOrFn)) {
                throw qError(12, chunkOrFn);
            }
            chunk = chunkOrFn;
        }
        return announcedQRL.has(symbol) || announcedQRL.add(symbol), createQRL(chunk, symbol, null, symbolFn, null, lexicalScopeCapture, null);
    };
    const inlinedQrl = (symbol, symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, symbol, null, null, lexicalScopeCapture, null);
    const _noopQrl = (symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, null, null, null, lexicalScopeCapture, null);
    const serializeQRL = (qrl, opts = {}) => {
        assertTrue(), assertQrl(qrl);
        let symbol = qrl.$symbol$;
        let chunk = qrl.$chunk$;
        const refSymbol = qrl.$refSymbol$ ?? symbol;
        const platform = getPlatform();
        if (platform) {
            const result = platform.chunkForSymbol(refSymbol, chunk, qrl.dev?.file);
            result ? (chunk = result[1], qrl.$refSymbol$ || (symbol = result[0])) : console.error("serializeQRL: Cannot resolve symbol", symbol, "in", chunk, qrl.dev?.file);
        }
        if (null == chunk) {
            throw qError(31, qrl.$symbol$);
        }
        if (chunk.startsWith("./") && (chunk = chunk.slice(2)), isSyncQrl(qrl)) {
            if (opts.$containerState$) {
                const fn = qrl.resolved;
                const containerState = opts.$containerState$;
                const fnStrKey = fn.serialized || fn.toString();
                let id = containerState.$inlineFns$.get(fnStrKey);
                void 0 === id && (id = containerState.$inlineFns$.size, containerState.$inlineFns$.set(fnStrKey, id)), 
                symbol = String(id);
            } else {
                throwErrorAndStop("Sync QRL without containerState");
            }
        }
        let output = `${chunk}#${symbol}`;
        const capture = qrl.$capture$;
        const captureRef = qrl.$captureRef$;
        return captureRef && captureRef.length ? opts.$getObjId$ ? output += `[${mapJoin(captureRef, opts.$getObjId$, " ")}]` : opts.$addRefMap$ && (output += `[${mapJoin(captureRef, opts.$addRefMap$, " ")}]`) : capture && capture.length > 0 && (output += `[${capture.join(" ")}]`), 
        output;
    };
    const serializeQRLs = (existingQRLs, containerState, elCtx) => {
        assertElement();
        const opts = {
            $containerState$: containerState,
            $addRefMap$: obj => addToArray(elCtx.$refMap$, obj)
        };
        return mapJoin(existingQRLs, (qrl => serializeQRL(qrl, opts)), "\n");
    };
    const parseQRL = (qrl, containerEl) => {
        const endIdx = qrl.length;
        const hashIdx = indexOf(qrl, 0, "#");
        const captureIdx = indexOf(qrl, hashIdx, "[");
        const chunkEndIdx = Math.min(hashIdx, captureIdx);
        const chunk = qrl.substring(0, chunkEndIdx);
        const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
        const symbol = symbolStartIdx == captureIdx ? "default" : qrl.substring(symbolStartIdx, captureIdx);
        const capture = captureIdx === endIdx ? EMPTY_ARRAY : qrl.substring(captureIdx + 1, endIdx - 1).split(" ");
        const iQrl = createQRL(chunk, symbol, null, null, capture, null, null);
        return containerEl && iQrl.$setContainer$(containerEl), iQrl;
    };
    const indexOf = (text, startIdx, char) => {
        const endIdx = text.length;
        const charIdx = text.indexOf(char, startIdx == endIdx ? 0 : startIdx);
        return -1 == charIdx ? endIdx : charIdx;
    };
    const addToArray = (array, obj) => {
        const index = array.indexOf(obj);
        return -1 === index ? (array.push(obj), String(array.length - 1)) : String(index);
    };
    const inflateQrl = (qrl, elCtx) => (assertDefined(), qrl.$captureRef$ = qrl.$capture$.map((idx => {
        const int = parseInt(idx, 10);
        const obj = elCtx.$refMap$[int];
        return assertTrue(), obj;
    })));
    const useResourceQrl = (qrl, opts) => {
        const {val, set, i, iCtx, elCtx} = useSequentialScope();
        if (null != val) {
            return val;
        }
        assertQrl(qrl);
        const containerState = iCtx.$renderCtx$.$static$.$containerState$;
        const resource = createResourceReturn(containerState, opts);
        const task = new Task(TaskFlagsIsDirty | TaskFlagsIsResource, i, elCtx.$element$, qrl, resource);
        const previousWait = Promise.all(iCtx.$waitOn$.slice());
        return runResource(task, containerState, iCtx.$renderCtx$, previousWait), elCtx.$tasks$ || (elCtx.$tasks$ = []), 
        elCtx.$tasks$.push(task), set(resource), resource;
    };
    const _createResourceReturn = opts => ({
        __brand: "resource",
        value: void 0,
        loading: !isServerPlatform(),
        _resolved: void 0,
        _error: void 0,
        _state: "pending",
        _timeout: opts?.timeout ?? -1,
        _cache: 0
    });
    const createResourceReturn = (containerState, opts, initialPromise) => {
        const result = _createResourceReturn(opts);
        result.value = initialPromise;
        return createProxy(result, containerState, void 0);
    };
    const isResourceReturn = obj => isObject(obj) && "resource" === obj.__brand;
    const Slot = props => _jsxC(Virtual, {
        [QSlotS]: ""
    }, 0, props.name ?? "");
    const UNDEFINED_PREFIX = "";
    function serializer(serializer) {
        return {
            $prefixCode$: serializer.$prefix$.charCodeAt(0),
            $prefixChar$: serializer.$prefix$,
            $test$: serializer.$test$,
            $serialize$: serializer.$serialize$,
            $prepare$: serializer.$prepare$,
            $fill$: serializer.$fill$,
            $collect$: serializer.$collect$,
            $subs$: serializer.$subs$
        };
    }
    const QRLSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => isQrl(v),
        $collect$: (v, collector, leaks) => {
            if (v.$captureRef$) {
                for (const item of v.$captureRef$) {
                    collectValue(item, collector, leaks);
                }
            }
            0 === collector.$prefetch$ && collector.$qrls$.push(v);
        },
        $serialize$: (obj, getObjId) => serializeQRL(obj, {
            $getObjId$: getObjId
        }),
        $prepare$: (data, containerState) => parseQRL(data, containerState.$containerEl$),
        $fill$: (qrl, getObject) => {
            qrl.$capture$ && qrl.$capture$.length > 0 && (qrl.$captureRef$ = qrl.$capture$.map(getObject), 
            qrl.$capture$ = null);
        }
    });
    const TaskSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => isSubscriberDescriptor(v),
        $collect$: (v, collector, leaks) => {
            collectValue(v.$qrl$, collector, leaks), v.$state$ && (collectValue(v.$state$, collector, leaks), 
            !0 === leaks && v.$state$ instanceof SignalImpl && collectSubscriptions(v.$state$[QObjectManagerSymbol], collector, !0));
        },
        $serialize$: (obj, getObjId) => ((task, getObjId) => {
            let value = `${intToStr(task.$flags$)} ${intToStr(task.$index$)} ${getObjId(task.$qrl$)} ${getObjId(task.$el$)}`;
            return task.$state$ && (value += ` ${getObjId(task.$state$)}`), value;
        })(obj, getObjId),
        $prepare$: data => (data => {
            const [flags, index, qrl, el, resource] = data.split(" ");
            return new Task(strToInt(flags), strToInt(index), el, qrl, resource);
        })(data),
        $fill$: (task, getObject) => {
            task.$el$ = getObject(task.$el$), task.$qrl$ = getObject(task.$qrl$), task.$state$ && (task.$state$ = getObject(task.$state$));
        }
    });
    const ResourceSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => isResourceReturn(v),
        $collect$: (obj, collector, leaks) => {
            collectValue(obj.value, collector, leaks), collectValue(obj._resolved, collector, leaks);
        },
        $serialize$: (obj, getObjId) => ((resource, getObjId) => {
            const state = resource._state;
            return "resolved" === state ? `0 ${getObjId(resource._resolved)}` : "pending" === state ? "1" : `2 ${getObjId(resource._error)}`;
        })(obj, getObjId),
        $prepare$: data => (data => {
            const [first, id] = data.split(" ");
            const result = _createResourceReturn(void 0);
            return result.value = Promise.resolve(), "0" === first ? (result._state = "resolved", 
            result._resolved = id, result.loading = !1) : "1" === first ? (result._state = "pending", 
            result.value = new Promise((() => {})), result.loading = !0) : "2" === first && (result._state = "rejected", 
            result._error = id, result.loading = !1), result;
        })(data),
        $fill$: (resource, getObject) => {
            if ("resolved" === resource._state) {
                resource._resolved = getObject(resource._resolved), resource.value = Promise.resolve(resource._resolved);
            } else if ("rejected" === resource._state) {
                const p = Promise.reject(resource._error);
                p.catch((() => null)), resource._error = getObject(resource._error), resource.value = p;
            }
        }
    });
    const URLSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => v instanceof URL,
        $serialize$: obj => obj.href,
        $prepare$: data => new URL(data)
    });
    const DateSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => v instanceof Date,
        $serialize$: obj => obj.toISOString(),
        $prepare$: data => new Date(data)
    });
    const RegexSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => v instanceof RegExp,
        $serialize$: obj => `${obj.flags} ${obj.source}`,
        $prepare$: data => {
            const space = data.indexOf(" ");
            const source = data.slice(space + 1);
            const flags = data.slice(0, space);
            return new RegExp(source, flags);
        }
    });
    const ErrorSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => v instanceof Error,
        $serialize$: obj => obj.message,
        $prepare$: text => {
            const err = new Error(text);
            return err.stack = void 0, err;
        }
    });
    const DocumentSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => !!v && "object" == typeof v && isDocument(v),
        $prepare$: (_, _c, doc) => doc
    });
    const SERIALIZABLE_STATE = Symbol("serializable-data");
    const ComponentSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: obj => isQwikComponent(obj),
        $serialize$: (obj, getObjId) => {
            const [qrl] = obj[SERIALIZABLE_STATE];
            return serializeQRL(qrl, {
                $getObjId$: getObjId
            });
        },
        $prepare$: (data, containerState) => {
            const qrl = parseQRL(data, containerState.$containerEl$);
            return componentQrl(qrl);
        },
        $fill$: (component, getObject) => {
            const [qrl] = component[SERIALIZABLE_STATE];
            qrl.$capture$?.length && (qrl.$captureRef$ = qrl.$capture$.map(getObject), qrl.$capture$ = null);
        }
    });
    const DerivedSignalSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: obj => obj instanceof SignalDerived,
        $collect$: (obj, collector, leaks) => {
            if (obj.$args$) {
                for (const arg of obj.$args$) {
                    collectValue(arg, collector, leaks);
                }
            }
        },
        $serialize$: (signal, getObjID, collector) => {
            const serialized = (signal => {
                const fnBody = signal.$funcStr$;
                assertDefined();
                let args = "";
                for (let i = 0; i < signal.$args$.length; i++) {
                    args += `p${i},`;
                }
                return `(${args})=>(${fnBody})`;
            })(signal);
            let index = collector.$inlinedFunctions$.indexOf(serialized);
            return index < 0 && (index = collector.$inlinedFunctions$.length, collector.$inlinedFunctions$.push(serialized)), 
            mapJoin(signal.$args$, getObjID, " ") + " @" + intToStr(index);
        },
        $prepare$: data => {
            const ids = data.split(" ");
            const args = ids.slice(0, -1);
            const fn = ids[ids.length - 1];
            return new SignalDerived(fn, args, fn);
        },
        $fill$: (fn, getObject) => {
            assertString(), fn.$func$ = getObject(fn.$func$), fn.$args$ = fn.$args$.map(getObject);
        }
    });
    const SignalSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => v instanceof SignalImpl,
        $collect$: (obj, collector, leaks) => {
            collectValue(obj.untrackedValue, collector, leaks);
            return !0 === leaks && !(obj[QObjectSignalFlags] & SIGNAL_IMMUTABLE) && collectSubscriptions(obj[QObjectManagerSymbol], collector, !0), 
            obj;
        },
        $serialize$: (obj, getObjId) => getObjId(obj.untrackedValue),
        $prepare$: (data, containerState) => new SignalImpl(data, containerState?.$subsManager$?.$createManager$(), 0),
        $subs$: (signal, subs) => {
            signal[QObjectManagerSymbol].$addSubs$(subs);
        },
        $fill$: (signal, getObject) => {
            signal.untrackedValue = getObject(signal.untrackedValue);
        }
    });
    const SignalWrapperSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => v instanceof SignalWrapper,
        $collect$(obj, collector, leaks) {
            if (collectValue(obj.ref, collector, leaks), fastWeakSerialize(obj.ref)) {
                const localManager = getSubscriptionManager(obj.ref);
                isTreeShakeable(collector.$containerState$.$subsManager$, localManager, leaks) && collectValue(obj.ref[obj.prop], collector, leaks);
            }
            return obj;
        },
        $serialize$: (obj, getObjId) => `${getObjId(obj.ref)} ${obj.prop}`,
        $prepare$: data => {
            const [id, prop] = data.split(" ");
            return new SignalWrapper(id, prop);
        },
        $fill$: (signal, getObject) => {
            signal.ref = getObject(signal.ref);
        }
    });
    const NoFiniteNumberSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => "number" == typeof v,
        $serialize$: v => String(v),
        $prepare$: data => Number(data)
    });
    const URLSearchParamsSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => v instanceof URLSearchParams,
        $serialize$: obj => obj.toString(),
        $prepare$: data => new URLSearchParams(data)
    });
    const FormDataSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => "undefined" != typeof FormData && v instanceof globalThis.FormData,
        $serialize$: formData => {
            const array = [];
            return formData.forEach(((value, key) => {
                array.push("string" == typeof value ? [ key, value ] : [ key, value.name ]);
            })), JSON.stringify(array);
        },
        $prepare$: data => {
            const array = JSON.parse(data);
            const formData = new FormData;
            for (const [key, value] of array) {
                formData.append(key, value);
            }
            return formData;
        }
    });
    const JSXNodeSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => isJSXNode(v),
        $collect$: (node, collector, leaks) => {
            collectValue(node.children, collector, leaks), collectValue(node.props, collector, leaks), 
            collectValue(node.immutableProps, collector, leaks), collectValue(node.key, collector, leaks);
            let type = node.type;
            type === Slot ? type = ":slot" : type === Fragment && (type = ":fragment"), collectValue(type, collector, leaks);
        },
        $serialize$: (node, getObjID) => {
            let type = node.type;
            return type === Slot ? type = ":slot" : type === Fragment && (type = ":fragment"), 
            `${getObjID(type)} ${getObjID(node.props)} ${getObjID(node.immutableProps)} ${getObjID(node.key)} ${getObjID(node.children)} ${node.flags}`;
        },
        $prepare$: data => {
            const [type, props, immutableProps, key, children, flags] = data.split(" ");
            return new JSXNodeImpl(type, props, immutableProps, children, parseInt(flags, 10), key);
        },
        $fill$: (node, getObject) => {
            node.type = getResolveJSXType(getObject(node.type)), node.props = getObject(node.props), 
            node.immutableProps = getObject(node.immutableProps), node.key = getObject(node.key), 
            node.children = getObject(node.children);
        }
    });
    const BigIntSerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => "bigint" == typeof v,
        $serialize$: v => v.toString(),
        $prepare$: data => BigInt(data)
    });
    const Uint8ArraySerializer = /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => v instanceof Uint8Array,
        $serialize$: v => {
            let buf = "";
            for (const c of v) {
                buf += String.fromCharCode(c);
            }
            return btoa(buf).replace(/=+$/, "");
        },
        $prepare$: data => {
            const buf = atob(data);
            const bytes = new Uint8Array(buf.length);
            let i = 0;
            for (const s of buf) {
                bytes[i++] = s.charCodeAt(0);
            }
            return bytes;
        },
        $fill$: void 0
    });
    const DATA = Symbol();
    const serializers = [ QRLSerializer, TaskSerializer, ResourceSerializer, URLSerializer, DateSerializer, RegexSerializer, ErrorSerializer, DocumentSerializer, ComponentSerializer, DerivedSignalSerializer, SignalSerializer, SignalWrapperSerializer, NoFiniteNumberSerializer, URLSearchParamsSerializer, FormDataSerializer, JSXNodeSerializer, BigIntSerializer, /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => v instanceof Set,
        $collect$: (set, collector, leaks) => {
            set.forEach((value => collectValue(value, collector, leaks)));
        },
        $serialize$: (v, getObjID) => Array.from(v).map(getObjID).join(" "),
        $prepare$: data => {
            const set = new Set;
            return set[DATA] = data, set;
        },
        $fill$: (set, getObject) => {
            const data = set[DATA];
            set[DATA] = void 0, assertString();
            const items = 0 === data.length ? [] : data.split(" ");
            for (const id of items) {
                set.add(getObject(id));
            }
        }
    }), /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => v instanceof Map,
        $collect$: (map, collector, leaks) => {
            map.forEach(((value, key) => {
                collectValue(value, collector, leaks), collectValue(key, collector, leaks);
            }));
        },
        $serialize$: (map, getObjID) => {
            const result = [];
            return map.forEach(((value, key) => {
                result.push(getObjID(key) + " " + getObjID(value));
            })), result.join(" ");
        },
        $prepare$: data => {
            const set = new Map;
            return set[DATA] = data, set;
        },
        $fill$: (set, getObject) => {
            const data = set[DATA];
            set[DATA] = void 0, assertString();
            const items = 0 === data.length ? [] : data.split(" ");
            assertTrue();
            for (let i = 0; i < items.length; i += 2) {
                set.set(getObject(items[i]), getObject(items[i + 1]));
            }
        }
    }), /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => !!getSerializer(v) || v === UNDEFINED_PREFIX,
        $serialize$: v => v,
        $prepare$: data => data
    }), Uint8ArraySerializer ];
    const serializerByPrefix = /*#__PURE__*/ (() => {
        const serializerByPrefix = [];
        return serializers.forEach((s => {
            const prefix = s.$prefixCode$;
            for (;serializerByPrefix.length < prefix; ) {
                serializerByPrefix.push(void 0);
            }
            serializerByPrefix.push(s);
        })), serializerByPrefix;
    })();
    function getSerializer(obj) {
        if ("string" == typeof obj) {
            const prefix = obj.charCodeAt(0);
            if (prefix < serializerByPrefix.length) {
                return serializerByPrefix[prefix];
            }
        }
    }
    const collectorSerializers = /*#__PURE__*/ serializers.filter((a => a.$collect$));
    const collectDeps = (obj, collector, leaks) => {
        for (const s of collectorSerializers) {
            if (s.$test$(obj)) {
                return s.$collect$(obj, collector, leaks), !0;
            }
        }
        return !1;
    };
    const serializeValue = (obj, getObjID, collector, containerState) => {
        for (const s of serializers) {
            if (s.$test$(obj)) {
                let value = s.$prefixChar$;
                return s.$serialize$ && (value += s.$serialize$(obj, getObjID, collector, containerState)), 
                value;
            }
        }
        if ("string" == typeof obj) {
            return obj;
        }
    };
    const createParser = (containerState, doc) => {
        const fillMap = new Map;
        const subsMap = new Map;
        return {
            prepare(data) {
                const serializer = getSerializer(data);
                if (serializer) {
                    const value = serializer.$prepare$(data.slice(1), containerState, doc);
                    return serializer.$fill$ && fillMap.set(value, serializer), serializer.$subs$ && subsMap.set(value, serializer), 
                    value;
                }
                return data;
            },
            subs(obj, subs) {
                const serializer = subsMap.get(obj);
                return !!serializer && (serializer.$subs$(obj, subs, containerState), !0);
            },
            fill(obj, getObject) {
                const serializer = fillMap.get(obj);
                return !!serializer && (serializer.$fill$(obj, getObject, containerState), !0);
            }
        };
    };
    const OBJECT_TRANSFORMS = {
        "!": (obj, containerState) => containerState.$proxyMap$.get(obj) ?? getOrCreateProxy(obj, containerState),
        "~": obj => Promise.resolve(obj),
        _: obj => Promise.reject(obj)
    };
    const isTreeShakeable = (manager, target, leaks) => {
        if ("boolean" == typeof leaks) {
            return leaks;
        }
        const localManager = manager.$groupToManagers$.get(leaks);
        return !!(localManager && localManager.length > 0) && (1 !== localManager.length || localManager[0] !== target);
    };
    const getResolveJSXType = type => ":slot" === type ? Slot : ":fragment" === type ? Fragment : type;
    const verifySerializable = (value, preMessage) => {
        const seen = new Set;
        return _verifySerializable(value, seen, "_", preMessage);
    };
    const _verifySerializable = (value, seen, ctx, preMessage) => {
        const unwrapped = unwrapProxy(value);
        if (null == unwrapped) {
            return value;
        }
        if (shouldSerialize(unwrapped)) {
            if (seen.has(unwrapped)) {
                return value;
            }
            if (seen.add(unwrapped), (obj => {
                for (const s of serializers) {
                    if (s.$test$(obj)) {
                        return !0;
                    }
                }
                return !1;
            })(unwrapped)) {
                return value;
            }
            const typeObj = typeof unwrapped;
            switch (typeObj) {
              case "object":
                if (isPromise(unwrapped)) {
                    return value;
                }
                if (isNode$1(unwrapped)) {
                    return value;
                }
                if (isArray(unwrapped)) {
                    let expectIndex = 0;
                    return unwrapped.forEach(((v, i) => {
                        if (i !== expectIndex) {
                            throw qError(3, unwrapped);
                        }
                        _verifySerializable(v, seen, ctx + "[" + i + "]"), expectIndex = i + 1;
                    })), value;
                }
                if (isSerializableObject(unwrapped)) {
                    for (const [key, item] of Object.entries(unwrapped)) {
                        _verifySerializable(item, seen, ctx + "." + key);
                    }
                    return value;
                }
                break;

              case "boolean":
              case "string":
              case "number":
                return value;
            }
            let message = "";
            if (message = preMessage || "Value cannot be serialized", "_" !== ctx && (message += ` in ${ctx},`), 
            "object" === typeObj) {
                message += ` because it's an instance of "${value?.constructor.name}". You might need to use 'noSerialize()' or use an object literal instead. Check out https://qwik.dev/docs/advanced/dollar/`;
            } else if ("function" === typeObj) {
                const fnName = value.name;
                message += ` because it's a function named "${fnName}". You might need to convert it to a QRL using $(fn):\n\nconst ${fnName} = $(${String(value)});\n\nPlease check out https://qwik.dev/docs/advanced/qrl/ for more information.`;
            }
            console.error("Trying to serialize", value), throwErrorAndStop(message);
        }
        return value;
    };
    const noSerializeSet = /*#__PURE__*/ new WeakSet;
    const weakSerializeSet = /*#__PURE__*/ new WeakSet;
    const shouldSerialize = obj => !isObject(obj) && !isFunction(obj) || !noSerializeSet.has(obj);
    const fastSkipSerialize = obj => noSerializeSet.has(obj);
    const fastWeakSerialize = obj => weakSerializeSet.has(obj);
    const noSerialize = input => (("object" == typeof input && null !== input || "function" == typeof input) && noSerializeSet.add(input), 
    input);
    const unwrapProxy = proxy => isObject(proxy) ? getProxyTarget(proxy) ?? proxy : proxy;
    const getProxyTarget = obj => obj[QOjectTargetSymbol];
    const getSubscriptionManager = obj => obj[QObjectManagerSymbol];
    const getProxyFlags = obj => obj[QObjectFlagsSymbol];
    const serializeSubscription = (sub, getObjId) => {
        const type = sub[0];
        const host = "string" == typeof sub[1] ? sub[1] : getObjId(sub[1]);
        if (!host) {
            return;
        }
        let base = type + " " + host;
        let key;
        if (0 === type) {
            key = sub[2];
        } else {
            const signalID = getObjId(sub[2]);
            if (!signalID) {
                return;
            }
            if (type <= 2) {
                key = sub[5], base += ` ${signalID} ${must(getObjId(sub[3]))} ${sub[4]}`;
            } else if (type <= 4) {
                key = sub[4];
                base += ` ${signalID} ${"string" == typeof sub[3] ? sub[3] : must(getObjId(sub[3]))}`;
            } else {
                assertFail();
            }
        }
        return key && (base += ` ${encodeURI(key)}`), base;
    };
    const parseSubscription = (sub, getObject) => {
        const parts = sub.split(" ");
        const type = parseInt(parts[0], 10);
        assertTrue();
        const host = getObject(parts[1]);
        if (!host) {
            return;
        }
        if (isSubscriberDescriptor(host) && !host.$el$) {
            return;
        }
        const subscription = [ type, host ];
        return 0 === type ? (assertTrue(), subscription.push(safeDecode(parts[2]))) : type <= 2 ? (assertTrue(), 
        subscription.push(getObject(parts[2]), getObject(parts[3]), parts[4], safeDecode(parts[5]))) : type <= 4 && (assertTrue(), 
        subscription.push(getObject(parts[2]), getObject(parts[3]), safeDecode(parts[4]))), 
        subscription;
    };
    const safeDecode = str => {
        if (void 0 !== str) {
            return decodeURI(str);
        }
    };
    const createSubscriptionManager = containerState => {
        const groupToManagers = new Map;
        const manager = {
            $groupToManagers$: groupToManagers,
            $createManager$: initialMap => new LocalSubscriptionManager(groupToManagers, containerState, initialMap),
            $clearSub$: group => {
                const managers = groupToManagers.get(group);
                if (managers) {
                    for (const manager of managers) {
                        manager.$unsubGroup$(group);
                    }
                    groupToManagers.delete(group), managers.length = 0;
                }
            },
            $clearSignal$: signal => {
                const managers = groupToManagers.get(signal[1]);
                if (managers) {
                    for (const manager of managers) {
                        manager.$unsubEntry$(signal);
                    }
                }
            }
        };
        return seal(), manager;
    };
    class LocalSubscriptionManager {
        $groupToManagers$;
        $containerState$;
        $subs$;
        constructor($groupToManagers$, $containerState$, initialMap) {
            this.$groupToManagers$ = $groupToManagers$, this.$containerState$ = $containerState$, 
            this.$subs$ = [], initialMap && this.$addSubs$(initialMap), seal();
        }
        $addSubs$(subs) {
            this.$subs$.push(...subs);
            for (const sub of this.$subs$) {
                this.$addToGroup$(sub[1], this);
            }
        }
        $addToGroup$(group, manager) {
            let managers = this.$groupToManagers$.get(group);
            managers || this.$groupToManagers$.set(group, managers = []), managers.includes(manager) || managers.push(manager);
        }
        $unsubGroup$(group) {
            const subs = this.$subs$;
            for (let i = 0; i < subs.length; i++) {
                subs[i][1] === group && (subs.splice(i, 1), i--);
            }
        }
        $unsubEntry$(entry) {
            const [type, group, signal, elm] = entry;
            const subs = this.$subs$;
            if (1 === type || 2 === type) {
                const prop = entry[4];
                for (let i = 0; i < subs.length; i++) {
                    const sub = subs[i];
                    sub[0] === type && sub[1] === group && sub[2] === signal && sub[3] === elm && sub[4] === prop && (subs.splice(i, 1), 
                    i--);
                }
            } else if (3 === type || 4 === type) {
                for (let i = 0; i < subs.length; i++) {
                    const sub = subs[i];
                    sub[0] === type && sub[1] === group && sub[2] === signal && sub[3] === elm && (subs.splice(i, 1), 
                    i--);
                }
            }
        }
        $addSub$(sub, key) {
            const subs = this.$subs$;
            const group = sub[1];
            0 === sub[0] && subs.some((([_type, _group, _key]) => 0 === _type && _group === group && _key === key)) || (subs.push(__lastSubscription = [ ...sub, key ]), 
            this.$addToGroup$(group, this));
        }
        $notifySubs$(key) {
            const subs = this.$subs$;
            for (const sub of subs) {
                const compare = sub[sub.length - 1];
                key && compare && compare !== key || notifyChange(sub, this.$containerState$);
            }
        }
    }
    let __lastSubscription;
    const must = a => {
        if (null == a) {
            throw logError("must be non null", a);
        }
        return a;
    };
    const isQrl = value => "function" == typeof value && "function" == typeof value.getSymbol;
    const isSyncQrl = value => isQrl(value) && "<sync>" == value.$symbol$;
    const createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
        let _containerEl;
        const qrl = async function(...args) {
            const fn = invokeFn.call(this, tryGetInvokeContext());
            return await fn(...args);
        };
        const setContainer = el => (_containerEl || (_containerEl = el), _containerEl);
        const wrapFn = fn => "function" != typeof fn || !capture?.length && !captureRef?.length ? fn : function(...args) {
            let context = tryGetInvokeContext();
            if (context) {
                const prevQrl = context.$qrl$;
                context.$qrl$ = qrl;
                const prevEvent = context.$event$;
                void 0 === context.$event$ && (context.$event$ = this);
                try {
                    return fn.apply(this, args);
                } finally {
                    context.$qrl$ = prevQrl, context.$event$ = prevEvent;
                }
            }
            return context = newInvokeContext(), context.$qrl$ = qrl, context.$event$ = this, 
            invoke.call(this, context, fn, ...args);
        };
        const resolve = async containerEl => {
            if (null !== symbolRef) {
                return symbolRef;
            }
            if (containerEl && setContainer(containerEl), "" === chunk) {
                assertDefined();
                const hash = _containerEl.getAttribute("q:instance");
                const qFuncs = getQFuncs(_containerEl.ownerDocument, hash);
                return qrl.resolved = symbolRef = qFuncs[Number(symbol)];
            }
            build.isBrowser && chunk && preloader.p(chunk, 1);
            const start = now();
            const ctx = tryGetInvokeContext();
            if (null !== symbolFn) {
                symbolRef = symbolFn().then((module => qrl.resolved = symbolRef = wrapFn(module[symbol])));
            } else {
                const imported = getPlatform().importSymbol(_containerEl, chunk, symbol);
                symbolRef = maybeThen(imported, (ref => qrl.resolved = symbolRef = wrapFn(ref)));
            }
            return "object" == typeof symbolRef && isPromise(symbolRef) && symbolRef.then((() => emitUsedSymbol(symbol, ctx?.$element$, start)), (err => {
                console.error(`qrl ${symbol} failed to load`, err), symbolRef = null;
            })), symbolRef;
        };
        const resolveLazy = containerEl => null !== symbolRef ? symbolRef : resolve(containerEl);
        function invokeFn(currentCtx, beforeFn) {
            return (...args) => maybeThen(resolveLazy(), (f => {
                if (!isFunction(f)) {
                    throw qError(10);
                }
                if (beforeFn && !1 === beforeFn()) {
                    return;
                }
                const context = createOrReuseInvocationContext(currentCtx);
                return invoke.call(this, context, f, ...args);
            }));
        }
        const createOrReuseInvocationContext = invoke => null == invoke ? newInvokeContext() : isArray(invoke) ? newInvokeContextFromTuple(invoke) : invoke;
        const resolvedSymbol = refSymbol ?? symbol;
        const hash = getSymbolHash(resolvedSymbol);
        return Object.assign(qrl, {
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
            resolved: void 0
        }), symbolRef && (symbolRef = maybeThen(symbolRef, (resolved => qrl.resolved = symbolRef = wrapFn(resolved)))), 
        build.isBrowser && resolvedSymbol && preloader.p(resolvedSymbol, .8), qrl;
    };
    const getSymbolHash = symbolName => {
        const index = symbolName.lastIndexOf("_");
        return index > -1 ? symbolName.slice(index + 1) : symbolName;
    };
    function assertQrl() {
        qDev;
    }
    const EMITTED = /*#__PURE__*/ new Set;
    const emitUsedSymbol = (symbol, element, reqTime) => {
        EMITTED.has(symbol) || (EMITTED.add(symbol), emitEvent("qsymbol", {
            symbol,
            element,
            reqTime
        }));
    };
    const emitEvent = (eventName, detail) => {
        isServerPlatform() || "object" != typeof document || document.dispatchEvent(new CustomEvent(eventName, {
            bubbles: !1,
            detail
        }));
    };
    const now = () => isServerPlatform() ? 0 : "object" == typeof performance ? performance.now() : 0;
    let runtimeSymbolId = 0;
    const $ = expression => createQRL(null, "s" + runtimeSymbolId++, expression, null, null, null, null);
    const eventQrl = qrl => qrl;
    const event$ = implicit$FirstArg(eventQrl);
    const componentQrl = componentQrl => {
        function QwikComponent(props, key, flags) {
            assertQrl(), assertNumber();
            const finalKey = componentQrl.$hash$.slice(0, 4) + ":" + (key || "");
            return _jsxC(Virtual, {
                [OnRenderProp]: componentQrl,
                [QSlot]: props[QSlot],
                [_IMMUTABLE]: props[_IMMUTABLE],
                children: props.children,
                props
            }, flags, finalKey);
        }
        return QwikComponent[SERIALIZABLE_STATE] = [ componentQrl ], QwikComponent;
    };
    const isQwikComponent = component => "function" == typeof component && void 0 !== component[SERIALIZABLE_STATE];
    const flattenArray = (array, dst) => {
        dst || (dst = []);
        for (const item of array) {
            isArray(item) ? flattenArray(item, dst) : dst.push(item);
        }
        return dst;
    };
    function h(type, props, ...children) {
        const normalizedProps = {
            children: arguments.length > 2 ? flattenArray(children) : void 0
        };
        let key;
        let i;
        for (i in props) {
            "key" == i ? key = props[i] : normalizedProps[i] = props[i];
        }
        return "string" == typeof type && !key && "dangerouslySetInnerHTML" in normalizedProps && (key = "innerhtml"), 
        jsx(type, normalizedProps, key);
    }
    const renderRoot = async (rCtx, parent, jsxOutput) => {
        const staticCtx = rCtx.$static$;
        try {
            const processedNodes = await processData(jsxOutput);
            const rootJsx = domToVnode(parent);
            await smartUpdateChildren(rCtx, rootJsx, wrapJSX(parent, processedNodes), 0);
        } catch (err) {
            logError(err);
        }
        staticCtx.$operations$.push(...staticCtx.$postOperations$), executeDOMRender(staticCtx), 
        printRenderStats(staticCtx);
    };
    const getElement = docOrElm => isDocument(docOrElm) ? docOrElm.documentElement : docOrElm;
    const injectQContainer = containerEl => {
        directSetAttribute(containerEl, "q:version", "1.15.0"), directSetAttribute(containerEl, "q:container", "resumed"), 
        directSetAttribute(containerEl, "q:render", "dom");
    };
    const useStore = (initialState, opts) => {
        const {val, set, iCtx} = useSequentialScope();
        if (null != val) {
            return val;
        }
        const value = isFunction(initialState) ? invoke(void 0, initialState) : initialState;
        if (!1 === opts?.reactive) {
            return set(value), value;
        }
        {
            const newStore = getOrCreateProxy(value, iCtx.$renderCtx$.$static$.$containerState$, opts?.deep ?? !0 ? 1 : 0);
            return set(newStore), newStore;
        }
    };
    const STYLE_CACHE = /*#__PURE__*/ new Map;
    const getScopedStyles = (css, scopeId) => {
        let styleCss = STYLE_CACHE.get(scopeId);
        return styleCss || STYLE_CACHE.set(scopeId, styleCss = scopeStylesheet(css, scopeId)), 
        styleCss;
    };
    const scopeStylesheet = (css, scopeId) => {
        const end = css.length;
        const out = [];
        const stack = [];
        let idx = 0;
        let lastIdx = idx;
        let mode = rule;
        let lastCh = 0;
        for (;idx < end; ) {
            const chIdx = idx;
            let ch = css.charCodeAt(idx++);
            ch === BACKSLASH && (idx++, ch = A);
            const arcs = STATE_MACHINE[mode];
            for (let i = 0; i < arcs.length; i++) {
                const arc = arcs[i];
                const [expectLastCh, expectCh, newMode] = arc;
                if ((expectLastCh === lastCh || expectLastCh === ANY || expectLastCh === IDENT && isIdent(lastCh) || expectLastCh === WHITESPACE && isWhiteSpace(lastCh)) && (expectCh === ch || expectCh === ANY || expectCh === IDENT && isIdent(ch) || expectCh === NOT_IDENT && !isIdent(ch) && ch !== DOT || expectCh === WHITESPACE && isWhiteSpace(ch)) && (3 == arc.length || lookAhead(arc))) {
                    if (arc.length > 3 && (ch = css.charCodeAt(idx - 1)), newMode === EXIT || newMode == EXIT_INSERT_SCOPE) {
                        if (newMode === EXIT_INSERT_SCOPE) {
                            if (mode !== starSelector || shouldNotInsertScoping()) {
                                if (!isChainedSelector(ch)) {
                                    insertScopingSelector(idx - (expectCh == NOT_IDENT ? 1 : expectCh == CLOSE_PARENTHESIS ? 2 : 0));
                                }
                            } else {
                                isChainedSelector(ch) ? flush(idx - 2) : insertScopingSelector(idx - 2), lastIdx++;
                            }
                        }
                        expectCh === NOT_IDENT && (idx--, ch = lastCh);
                        do {
                            mode = stack.pop() || rule, mode === pseudoGlobal && (flush(idx - 1), lastIdx++);
                        } while (isSelfClosingRule(mode));
                    } else {
                        stack.push(mode), mode === pseudoGlobal && newMode === rule ? (flush(idx - 8), lastIdx = idx) : newMode === pseudoElement && insertScopingSelector(chIdx), 
                        mode = newMode;
                    }
                    break;
                }
            }
            lastCh = ch;
        }
        return flush(idx), out.join("");
        function flush(idx) {
            out.push(css.substring(lastIdx, idx)), lastIdx = idx;
        }
        function insertScopingSelector(idx) {
            mode === pseudoGlobal || shouldNotInsertScoping() || (flush(idx), out.push(".", "⭐️", scopeId));
        }
        function lookAhead(arc) {
            let prefix = 0;
            if (css.charCodeAt(idx) === DASH) {
                for (let i = 1; i < 10; i++) {
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
                return idx += txt.length + prefix, !0;
            }
            return !1;
        }
        function shouldNotInsertScoping() {
            return -1 !== stack.indexOf(pseudoGlobal) || -1 !== stack.indexOf(atRuleSelector);
        }
    };
    const isIdent = ch => ch >= _0 && ch <= _9 || ch >= A && ch <= Z || ch >= a && ch <= z || ch >= 128 || ch === UNDERSCORE || ch === DASH;
    const isChainedSelector = ch => ch === COLON || ch === DOT || ch === OPEN_BRACKET || ch === HASH || isIdent(ch);
    const isSelfClosingRule = mode => mode === atRuleBlock || mode === atRuleSelector || mode === atRuleInert || mode === pseudoGlobal;
    const isWhiteSpace = ch => ch === SPACE || ch === TAB || ch === NEWLINE || ch === CARRIAGE_RETURN;
    const rule = 0;
    const starSelector = 2;
    const pseudoGlobal = 5;
    const pseudoElement = 6;
    const atRuleSelector = 10;
    const atRuleBlock = 11;
    const atRuleInert = 12;
    const EXIT = 17;
    const EXIT_INSERT_SCOPE = 18;
    const ANY = 0;
    const IDENT = 1;
    const NOT_IDENT = 2;
    const WHITESPACE = 3;
    const TAB = 9;
    const NEWLINE = 10;
    const CARRIAGE_RETURN = 13;
    const SPACE = 32;
    const HASH = 35;
    const CLOSE_PARENTHESIS = 41;
    const DASH = 45;
    const DOT = 46;
    const _0 = 48;
    const _9 = 57;
    const COLON = 58;
    const A = 65;
    const Z = 90;
    const OPEN_BRACKET = 91;
    const BACKSLASH = 92;
    const UNDERSCORE = 95;
    const LOWERCASE = 32;
    const a = 97;
    const z = 122;
    const STRINGS_COMMENTS = [ [ ANY, 39, 14 ], [ ANY, 34, 15 ], [ ANY, 47, 16, "*" ] ];
    const STATE_MACHINE = [ [ [ ANY, 42, starSelector ], [ ANY, OPEN_BRACKET, 7 ], [ ANY, COLON, pseudoElement, ":", "before", "after", "first-letter", "first-line" ], [ ANY, COLON, pseudoGlobal, "global" ], [ ANY, COLON, 3, "has", "host-context", "not", "where", "is", "matches", "any" ], [ ANY, COLON, 4 ], [ ANY, IDENT, 1 ], [ ANY, DOT, 1 ], [ ANY, HASH, 1 ], [ ANY, 64, atRuleSelector, "keyframe" ], [ ANY, 64, atRuleBlock, "media", "supports", "container" ], [ ANY, 64, atRuleInert ], [ ANY, 123, 13 ], [ 47, 42, 16 ], [ ANY, 59, EXIT ], [ ANY, 125, EXIT ], [ ANY, CLOSE_PARENTHESIS, EXIT ], ...STRINGS_COMMENTS ], [ [ ANY, NOT_IDENT, EXIT_INSERT_SCOPE ] ], [ [ ANY, NOT_IDENT, EXIT_INSERT_SCOPE ] ], [ [ ANY, 40, rule ], [ ANY, NOT_IDENT, EXIT_INSERT_SCOPE ] ], [ [ ANY, 40, 8 ], [ ANY, NOT_IDENT, EXIT_INSERT_SCOPE ] ], [ [ ANY, 40, rule ], [ ANY, NOT_IDENT, EXIT ] ], [ [ ANY, NOT_IDENT, EXIT ] ], [ [ ANY, 93, EXIT_INSERT_SCOPE ], [ ANY, 39, 14 ], [ ANY, 34, 15 ] ], [ [ ANY, CLOSE_PARENTHESIS, EXIT ], ...STRINGS_COMMENTS ], [ [ ANY, 125, EXIT ], ...STRINGS_COMMENTS ], [ [ ANY, 125, EXIT ], [ WHITESPACE, IDENT, 1 ], [ ANY, COLON, pseudoGlobal, "global" ], [ ANY, 123, 13 ], ...STRINGS_COMMENTS ], [ [ ANY, 123, rule ], [ ANY, 59, EXIT ], ...STRINGS_COMMENTS ], [ [ ANY, 59, EXIT ], [ ANY, 123, 9 ], ...STRINGS_COMMENTS ], [ [ ANY, 125, EXIT ], [ ANY, 123, 13 ], [ ANY, 40, 8 ], ...STRINGS_COMMENTS ], [ [ ANY, 39, EXIT ] ], [ [ ANY, 34, EXIT ] ], [ [ 42, 47, EXIT ] ] ];
    const useStylesQrl = styles => {
        _useStyles(styles, (str => str), !1);
    };
    const useStyles$ = /*#__PURE__*/ implicit$FirstArg(useStylesQrl);
    const useStylesScopedQrl = styles => ({
        scopeId: "⭐️" + _useStyles(styles, getScopedStyles, !0)
    });
    const useStylesScoped$ = /*#__PURE__*/ implicit$FirstArg(useStylesScopedQrl);
    const _useStyles = (styleQrl, transform, scoped) => {
        assertQrl();
        const {val, set, iCtx, i, elCtx} = useSequentialScope();
        if (val) {
            return val;
        }
        const styleId = (qStyles = styleQrl, index = i, assertQrl(), `${hashCode(qStyles.$hash$)}-${index}`);
        var qStyles, index;
        const containerState = iCtx.$renderCtx$.$static$.$containerState$;
        if (set(styleId), elCtx.$appendStyles$ || (elCtx.$appendStyles$ = []), elCtx.$scopeIds$ || (elCtx.$scopeIds$ = []), 
        scoped && elCtx.$scopeIds$.push((styleId => "⭐️" + styleId)(styleId)), containerState.$styleIds$.has(styleId)) {
            return styleId;
        }
        containerState.$styleIds$.add(styleId);
        const value = styleQrl.$resolveLazy$(containerState.$containerEl$);
        const appendStyle = styleText => {
            assertDefined(), elCtx.$appendStyles$.push({
                styleId,
                content: transform(styleText, styleId)
            });
        };
        return isPromise(value) ? iCtx.$waitOn$.push(value.then(appendStyle)) : appendStyle(value), 
        styleId;
    };
    const PREFETCH_CODE = /*#__PURE__*/ (c => {
        "getRegistrations" in c && c.getRegistrations().then((registrations => {
            registrations.forEach((registration => {
                registration.active && registration.active.scriptURL.endsWith("_URL_") && registration.unregister().catch(console.error);
            }));
        }));
    }).toString();
    Object.defineProperty(exports, "isBrowser", {
        enumerable: !0,
        get: function() {
            return build.isBrowser;
        }
    }), Object.defineProperty(exports, "isDev", {
        enumerable: !0,
        get: function() {
            return build.isDev;
        }
    }), Object.defineProperty(exports, "isServer", {
        enumerable: !0,
        get: function() {
            return build.isServer;
        }
    }), exports.$ = $, exports.Fragment = Fragment, exports.HTMLFragment = props => jsx(Virtual, props), 
    exports.PrefetchGraph = () => null, exports.PrefetchServiceWorker = opts => {
        const isTest = (void 0).TEST;
        if (build.isDev && !isTest) {
            return _jsxC("script", {
                dangerouslySetInnerHTML: "\x3c!-- PrefetchServiceWorker is disabled in dev mode. --\x3e"
            }, 0, "prefetch-service-worker");
        }
        const baseUrl = globalThis.BASE_URL || "/";
        const resolvedOpts = {
            path: "qwik-prefetch-service-worker.js",
            ...opts
        };
        resolvedOpts.path = opts?.path?.startsWith?.("/") ? opts.path : baseUrl + resolvedOpts.path;
        let code = PREFETCH_CODE.replace("'_URL_'", JSON.stringify(resolvedOpts.path));
        build.isDev || (code = code.replaceAll(/\s\s+/gm, ""));
        const props = {
            dangerouslySetInnerHTML: [ "(" + code + ")(", [ "navigator.serviceWorker" ].join(","), ");" ].join(""),
            nonce: resolvedOpts.nonce
        };
        return _jsxC("script", props, 0, "prefetch-service-worker");
    }, exports.RenderOnce = RenderOnce, exports.Resource = props => {
        const isBrowser = !isServerPlatform();
        const resource = props.value;
        let promise;
        if (isResourceReturn(resource)) {
            if (isBrowser) {
                if (props.onRejected && (resource.value.catch((() => {})), "rejected" === resource._state)) {
                    return props.onRejected(resource._error);
                }
                if (props.onPending) {
                    const state = resource._state;
                    if ("resolved" === state) {
                        return props.onResolved(resource._resolved);
                    }
                    if ("pending" === state) {
                        return props.onPending();
                    }
                    if ("rejected" === state) {
                        throw resource._error;
                    }
                }
                if (void 0 !== untrack((() => resource._resolved))) {
                    return props.onResolved(resource._resolved);
                }
            }
            promise = resource.value;
        } else if (isPromise(resource)) {
            promise = resource;
        } else {
            if (!isSignal(resource)) {
                return props.onResolved(resource);
            }
            promise = Promise.resolve(resource.value);
        }
        return jsx(Fragment, {
            children: promise.then(useBindInvokeContext(props.onResolved), useBindInvokeContext(props.onRejected))
        });
    }, exports.SSRComment = SSRComment, exports.SSRHint = () => null, exports.SSRRaw = SSRRaw, 
    exports.SSRStream = (props, key) => jsx(RenderOnce, {
        children: jsx(InternalSSRStream, props)
    }, key), exports.SSRStreamBlock = props => [ jsx(SSRComment, {
        data: "qkssr-pu"
    }), props.children, jsx(SSRComment, {
        data: "qkssr-po"
    }) ], exports.SkipRender = SkipRender, exports.Slot = Slot, exports._IMMUTABLE = _IMMUTABLE, 
    exports._deserializeData = (data, element) => {
        const obj = JSON.parse(data);
        if ("object" != typeof obj) {
            return null;
        }
        const {_objs, _entry} = obj;
        if (void 0 === _objs || void 0 === _entry) {
            return null;
        }
        let doc = {};
        let containerState = {};
        if (isNode$1(element) && isQwikElement(element)) {
            const containerEl = getWrappingContainer(element);
            containerEl && (containerState = _getContainerState(containerEl), doc = containerEl.ownerDocument);
        }
        const parser = createParser(containerState, doc);
        for (let i = 0; i < _objs.length; i++) {
            const value = _objs[i];
            isString(value) && (_objs[i] = value === UNDEFINED_PREFIX ? void 0 : parser.prepare(value));
        }
        const getObject = id => _objs[strToInt(id)];
        for (const obj of _objs) {
            reviveNestedObjects(obj, getObject, parser);
        }
        return getObject(_entry);
    }, exports._fnSignal = (fn, args, fnStr) => new SignalDerived(fn, args, fnStr), 
    exports._getContextElement = () => {
        const iCtx = tryGetInvokeContext();
        if (iCtx) {
            return iCtx.$element$ ?? iCtx.$hostElement$ ?? iCtx.$qrl$?.$setContainer$(void 0);
        }
    }, exports._getContextEvent = () => {
        const iCtx = tryGetInvokeContext();
        if (iCtx) {
            return iCtx.$event$;
        }
    }, exports._hW = _hW, exports._jsxBranch = input => {
        const iCtx = tryGetInvokeContext();
        if (iCtx && iCtx.$hostElement$ && iCtx.$renderCtx$) {
            getContext(iCtx.$hostElement$, iCtx.$renderCtx$.$static$.$containerState$).$flags$ |= HOST_FLAG_DYNAMIC;
        }
        return input;
    }, exports._jsxC = _jsxC, exports._jsxQ = _jsxQ, exports._jsxS = (type, mutableProps, immutableProps, flags, key, dev) => {
        let children = null;
        return mutableProps && "children" in mutableProps && (children = mutableProps.children, 
        delete mutableProps.children), _jsxQ(type, mutableProps, immutableProps, children, flags, key, dev);
    }, exports._noopQrl = _noopQrl, exports._noopQrlDEV = (symbolName, opts, lexicalScopeCapture = EMPTY_ARRAY) => {
        const newQrl = _noopQrl(symbolName, lexicalScopeCapture);
        return newQrl.dev = opts, newQrl;
    }, exports._pauseFromContexts = _pauseFromContexts, exports._qrlSync = function(fn, serializedFn) {
        return void 0 === serializedFn && (serializedFn = fn.toString()), fn.serialized = serializedFn, 
        createQRL("", "<sync>", fn, null, null, null, null);
    }, exports._regSymbol = (symbol, hash) => (void 0 === globalThis.__qwik_reg_symbols && (globalThis.__qwik_reg_symbols = new Map), 
    globalThis.__qwik_reg_symbols.set(hash, symbol), symbol), exports._renderSSR = async (node, opts) => {
        const root = opts.containerTagName;
        const containerEl = createMockQContext(1).$element$;
        const containerState = createContainerState(containerEl, opts.base ?? "/");
        containerState.$serverData$.locale = opts.serverData?.locale;
        const doc = new MockElement(9);
        const rCtx = createRenderContext(doc, containerState);
        const headNodes = opts.beforeContent ?? [];
        const ssrCtx = {
            $static$: {
                $contexts$: [],
                $headNodes$: "html" === root ? headNodes : [],
                $locale$: opts.serverData?.locale,
                $textNodes$: new Map
            },
            $projectedChildren$: void 0,
            $projectedCtxs$: void 0,
            $invocationContext$: void 0
        };
        seal();
        const locale = opts.serverData?.locale;
        const containerAttributes = opts.containerAttributes;
        const qRender = containerAttributes["q:render"];
        containerAttributes["q:container"] = "paused", containerAttributes["q:version"] = "1.15.0", 
        containerAttributes["q:render"] = (qRender ? qRender + "-" : "") + "ssr", containerAttributes["q:base"] = opts.base || "", 
        containerAttributes["q:locale"] = locale, containerAttributes["q:manifest-hash"] = opts.manifestHash, 
        containerAttributes["q:instance"] = hash();
        const children = "html" === root ? [ node ] : [ headNodes, node ];
        "html" !== root && (containerAttributes.class = "qc📦" + (containerAttributes.class ? " " + containerAttributes.class : ""));
        const serverData = containerState.$serverData$ = {
            ...containerState.$serverData$,
            ...opts.serverData
        };
        serverData.containerAttributes = {
            ...serverData.containerAttributes,
            ...containerAttributes
        };
        (ssrCtx.$invocationContext$ = newInvokeContext(locale)).$renderCtx$ = rCtx;
        const rootNode = _jsxQ(root, null, containerAttributes, children, HOST_FLAG_DIRTY | HOST_FLAG_NEED_ATTACH_LISTENER, null);
        containerState.$hostsRendering$ = new Set, await Promise.resolve().then((() => renderRoot$1(rootNode, rCtx, ssrCtx, opts.stream, containerState, opts)));
    }, exports._restProps = (props, omit) => {
        const rest = {};
        for (const key in props) {
            omit.includes(key) || (rest[key] = props[key]);
        }
        return rest;
    }, exports._serializeData = async data => {
        const containerState = createContainerState(null, null);
        const collector = createCollector(containerState);
        let promises;
        for (collectValue(data, collector, !1); (promises = collector.$promises$).length > 0; ) {
            collector.$promises$ = [];
            const results = await Promise.allSettled(promises);
            for (const result of results) {
                "rejected" === result.status && console.error(result.reason);
            }
        }
        const objs = Array.from(collector.$objSet$.keys());
        let count = 0;
        const objToId = new Map;
        for (const obj of objs) {
            objToId.set(obj, intToStr(count)), count++;
        }
        if (collector.$noSerialize$.length > 0) {
            const undefinedID = objToId.get(void 0);
            assertDefined();
            for (const obj of collector.$noSerialize$) {
                objToId.set(obj, undefinedID);
            }
        }
        const mustGetObjId = obj => {
            let suffix = "";
            if (isPromise(obj)) {
                const promiseValue = getPromiseValue(obj);
                if (!promiseValue) {
                    throw qError(27, obj);
                }
                obj = promiseValue.value, suffix += promiseValue.resolved ? "~" : "_";
            }
            if (isObject(obj)) {
                const target = getProxyTarget(obj);
                target && (suffix += "!", obj = target);
            }
            const key = objToId.get(obj);
            if (void 0 === key) {
                throw qError(27, obj);
            }
            return key + suffix;
        };
        const convertedObjs = serializeObjects(objs, mustGetObjId, null, collector, containerState);
        return JSON.stringify({
            _entry: mustGetObjId(data),
            _objs: convertedObjs
        });
    }, exports._verifySerializable = verifySerializable, exports._waitUntilRendered = elm => {
        const containerEl = getWrappingContainer(elm);
        if (!containerEl) {
            return Promise.resolve();
        }
        return _getContainerState(containerEl).$renderPromise$ ?? Promise.resolve();
    }, exports._weakSerialize = input => (weakSerializeSet.add(input), input), exports._wrapProp = _wrapProp, 
    exports._wrapSignal = (obj, prop) => {
        const r = _wrapProp(obj, prop);
        return r === _IMMUTABLE ? obj[prop] : r;
    }, exports.component$ = onMount => componentQrl($(onMount)), exports.componentQrl = componentQrl, 
    exports.createComputed$ = createComputed$, exports.createComputedQrl = createComputedQrl, 
    exports.createContextId = createContextId, exports.createElement = h, exports.createSignal = createSignal, 
    exports.event$ = event$, exports.eventQrl = eventQrl, exports.getLocale = function(defaultLocale) {
        if (void 0 === _locale) {
            const ctx = tryGetInvokeContext();
            if (ctx && ctx.$locale$) {
                return ctx.$locale$;
            }
            if (void 0 !== defaultLocale) {
                return defaultLocale;
            }
            throw new Error("Reading `locale` outside of context.");
        }
        return _locale;
    }, exports.getPlatform = getPlatform, exports.h = h, exports.implicit$FirstArg = implicit$FirstArg, 
    exports.inlinedQrl = inlinedQrl, exports.inlinedQrlDEV = (symbol, symbolName, opts, lexicalScopeCapture = EMPTY_ARRAY) => {
        const qrl = inlinedQrl(symbol, symbolName, lexicalScopeCapture);
        return qrl.dev = opts, qrl;
    }, exports.isSignal = isSignal, exports.jsx = jsx, exports.jsxDEV = (type, props, key, _isStatic, opts) => {
        const processed = null == key ? null : String(key);
        const children = untrack((() => {
            const c = props.children;
            return "string" == typeof type && delete props.children, c;
        }));
        isString(type) && "className" in props && (props.class = props.className, delete props.className);
        const node = new JSXNodeImpl(type, props, null, children, 0, processed);
        return node.dev = {
            stack: (new Error).stack,
            ...opts
        }, validateJSXNode(node), seal(), node;
    }, exports.jsxs = jsx, exports.noSerialize = noSerialize, exports.qrl = qrl, exports.qrlDEV = (chunkOrFn, symbol, opts, lexicalScopeCapture = EMPTY_ARRAY) => {
        const newQrl = qrl(chunkOrFn, symbol, lexicalScopeCapture, 1);
        return newQrl.dev = opts, newQrl;
    }, exports.render = async (parent, jsxOutput, opts) => {
        "function" == typeof jsxOutput && (jsxOutput = jsx(jsxOutput, null));
        const doc = getDocument(parent);
        const containerEl = getElement(parent);
        injectQContainer(containerEl);
        const containerState = _getContainerState(containerEl);
        const serverData = opts?.serverData;
        serverData && Object.assign(containerState.$serverData$, serverData);
        const rCtx = createRenderContext(doc, containerState);
        return containerState.$hostsRendering$ = new Set, containerState.$styleMoved$ = !0, 
        await renderRoot(rCtx, containerEl, jsxOutput, doc, containerState, containerEl), 
        await postRendering(containerState, rCtx), {
            cleanup() {
                var renderCtx, container;
                cleanupTree(container = containerEl, (renderCtx = rCtx).$static$, renderCtx.$static$.$containerState$.$subsManager$, !0), 
                (containerEl => {
                    delete containerEl[CONTAINER_STATE];
                })(container), directRemoveAttribute(container, "q:version"), directRemoveAttribute(container, "q:container"), 
                directRemoveAttribute(container, "q:render"), container.replaceChildren();
            }
        };
    }, exports.setPlatform = plt => _platform = plt, exports.sync$ = fn => createQRL("", "<sync>", fn, null, null, null, null), 
    exports.untrack = untrack, exports.unwrapStore = unwrapProxy, exports.useComputed$ = useComputed$, 
    exports.useComputedQrl = useComputedQrl, exports.useConstant = useConstant, exports.useContext = (context, defaultValue) => {
        const {val, set, iCtx, elCtx} = useSequentialScope();
        if (void 0 !== val) {
            return val;
        }
        const value = resolveContext(context, elCtx, iCtx.$renderCtx$.$static$.$containerState$);
        if ("function" == typeof defaultValue) {
            return set(invoke(void 0, defaultValue, value));
        }
        if (void 0 !== value) {
            return set(value);
        }
        if (void 0 !== defaultValue) {
            return set(defaultValue);
        }
        throw qError(13, context.id);
    }, exports.useContextProvider = useContextProvider, exports.useErrorBoundary = () => {
        const error = useStore({
            error: void 0
        });
        return useContextProvider(ERROR_CONTEXT, error), error;
    }, exports.useId = () => {
        const {val, set, elCtx, iCtx} = useSequentialScope();
        if (null != val) {
            return val;
        }
        const containerBase = iCtx.$renderCtx$?.$static$?.$containerState$?.$base$ || "";
        return set(`${containerBase ? hashCode(containerBase) : ""}-${elCtx.$componentQrl$?.getHash() || ""}-${getNextIndex(iCtx.$renderCtx$) || ""}`);
    }, exports.useLexicalScope = useLexicalScope, exports.useOn = useOn, exports.useOnDocument = useOnDocument, 
    exports.useOnWindow = (event, eventQrl) => {
        _useOn(createEventName(event, "window"), eventQrl);
    }, exports.useResource$ = (generatorFn, opts) => useResourceQrl($(generatorFn), opts), 
    exports.useResourceQrl = useResourceQrl, exports.useServerData = function(key, defaultValue) {
        const ctx = tryGetInvokeContext();
        return ctx?.$renderCtx$?.$static$.$containerState$.$serverData$[key] ?? defaultValue;
    }, exports.useSignal = initialState => useConstant((() => createSignal(initialState))), 
    exports.useStore = useStore, exports.useStyles$ = useStyles$, exports.useStylesQrl = useStylesQrl, 
    exports.useStylesScoped$ = useStylesScoped$, exports.useStylesScopedQrl = useStylesScopedQrl, 
    exports.useTask$ = useTask$, exports.useTaskQrl = useTaskQrl, exports.useVisibleTask$ = useVisibleTask$, 
    exports.useVisibleTaskQrl = useVisibleTaskQrl, exports.version = "1.15.0", exports.withLocale = function(locale, fn) {
        const previousLang = _locale;
        try {
            return _locale = locale, fn();
        } finally {
            _locale = previousLang;
        }
    };
}));
