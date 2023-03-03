/**
 * @license
 * @builder.io/qwik 0.20.2
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
!function(global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? factory(exports, require("@builder.io/qwik/build")) : "function" == typeof define && define.amd ? define([ "exports", "@builder.io/qwik/build" ], factory) : factory((global = "undefined" != typeof globalThis ? globalThis : global || self).qwikCore = {}, global.qwikBuild);
}(this, (function(exports, build) {
    "use strict";
    if ("undefined" == typeof globalThis) {
        const g = "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {};
        g.globalThis = g;
    }
    const qDev = false;
    const qTest = false;
    const seal = obj => {
        qDev && Object.seal(obj);
    };
    const isNode$1 = value => value && "number" == typeof value.nodeType;
    const isDocument = value => value && 9 === value.nodeType;
    const isElement$1 = value => 1 === value.nodeType;
    const isQwikElement = value => isNode$1(value) && (1 === value.nodeType || 111 === value.nodeType);
    const isVirtualElement = value => 111 === value.nodeType;
    const isText = value => 3 === value.nodeType;
    const isComment = value => 8 === value.nodeType;
    function assertQwikElement(el) {
        if (qDev && !isQwikElement(el)) {
            throw console.error("Not a Qwik Element, got", el), new Error("Not a Qwik Element");
        }
    }
    function assertElement(el) {
        if (qDev && !isElement$1(el)) {
            throw console.error("Not a Element, got", el), new Error("Not an Element");
        }
    }
    const STYLE = qDev ? "background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;" : "";
    const logError = (message, ...optionalParams) => {
        const err = message instanceof Error ? message : createError(message);
        const messageStr = err.stack || err.message;
        return console.error("%cQWIK ERROR", STYLE, messageStr, ...printParams(optionalParams)), 
        err;
    };
    const createError = message => new Error(message);
    const logErrorAndStop = (message, ...optionalParams) => logError(message, ...optionalParams);
    const logWarn = (message, ...optionalParams) => {
        qDev && console.warn("%cQWIK WARN", STYLE, message, ...printParams(optionalParams));
    };
    const logDebug = (message, ...optionalParams) => {
        qDev && console.debug("%cQWIK", STYLE, message, ...printParams(optionalParams));
    };
    const printParams = optionalParams => qDev ? optionalParams.map((p => isNode$1(p) && isElement$1(p) ? printElement(p) : p)) : optionalParams;
    const printElement = el => {
        const ctx = el._qc_;
        const isServer = (() => "undefined" != typeof process && !!process.versions && !!process.versions.node)();
        return {
            tagName: el.tagName,
            renderQRL: ctx?.$componentQrl$?.getSymbol(),
            element: isServer ? void 0 : el,
            ctx: isServer ? void 0 : ctx
        };
    };
    const QError_qrlIsNotFunction = 10;
    const qError = (code, ...parts) => {
        const text = codeToText(code);
        return logErrorAndStop(text, ...parts);
    };
    const codeToText = code => qDev ? `Code(${code}): ${[ "Error while serializing class attribute", "Can not serialize a HTML Node that is not an Element", "Runtime but no instance found on element.", "Only primitive and object literals can be serialized", "Crash while rendering", "You can render over a existing q:container. Skipping render().", "Set property", "Only function's and 'string's are supported.", "Only objects can be wrapped in 'QObject'", "Only objects literals can be wrapped in 'QObject'", "QRL is not a function", "Dynamic import not found", "Unknown type argument", "Actual value for useContext() can not be found, make sure some ancestor component has set a value using useContextProvider()", "Invoking 'use*()' method outside of invocation context.", "Cant access renderCtx for existing context", "Cant access document for existing context", "props are immutable", "<div> component can only be used at the root of a Qwik component$()", "Props are immutable by default.", "Calling a 'use*()' method outside 'component$(() => { HERE })' is not allowed. 'use*()' methods provide hooks to the 'component$' state and lifecycle, ie 'use' hooks can only be called syncronously within the 'component$' function or another 'use' method.\nFor more information see: https://qwik.builder.io/docs/components/lifecycle/#use-method-rules", "Container is already paused. Skipping", 'Components using useServerMount() can only be mounted in the server, if you need your component to be mounted in the client, use "useMount$()" instead', "When rendering directly on top of Document, the root node must be a <html>", "A <html> node must have 2 children. The first one <head> and the second one a <body>", "Invalid JSXNode type. It must be either a function or a string. Found:", "Tracking value changes can only be done to useStore() objects and component props", "Missing Object ID for captured object", "The provided Context reference is not a valid context created by createContextId()", "<html> is the root container, it can not be rendered inside a component", "QRLs can not be resolved because it does not have an attached container. This means that the QRL does not know where it belongs inside the DOM, so it cant dynamically import() from a relative path.", "QRLs can not be dynamically resolved, because it does not have a chunk path", "The JSX ref attribute must be a Signal" ][code] ?? ""}` : `Code(${code})`;
    const isSerializableObject = v => {
        const proto = Object.getPrototypeOf(v);
        return proto === Object.prototype || null === proto;
    };
    const isObject = v => v && "object" == typeof v;
    const isArray = v => Array.isArray(v);
    const isString = v => "string" == typeof v;
    const isFunction = v => "function" == typeof v;
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
            urlCopy.hash = "", urlCopy.search = "";
            const importURL = urlCopy.href;
            return import(importURL).then((mod => findSymbol(mod, symbolName)));
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
    const findSymbol = (module, symbol) => {
        if (symbol in module) {
            return module[symbol];
        }
        for (const v of Object.values(module)) {
            if (isObject(v) && symbol in v) {
                return v[symbol];
            }
        }
    };
    const toUrl = (doc, containerEl, url) => {
        const baseURI = doc.baseURI;
        const base = new URL(containerEl.getAttribute("q:base") ?? baseURI, baseURI);
        return new URL(url, base);
    };
    let _platform = createPlatform();
    const getPlatform = () => _platform;
    const isServerPlatform = () => _platform.isServer;
    function assertDefined(value, text, ...parts) {
        if (qDev) {
            if (null != value) {
                return;
            }
            throw logErrorAndStop(text, ...parts);
        }
    }
    function assertEqual(value1, value2, text, ...parts) {
        if (qDev) {
            if (value1 === value2) {
                return;
            }
            throw logErrorAndStop(text, ...parts);
        }
    }
    function assertTrue(value1, text, ...parts) {
        if (qDev) {
            if (true === value1) {
                return;
            }
            throw logErrorAndStop(text, ...parts);
        }
    }
    function assertNumber(value1, text, ...parts) {
        if (qDev) {
            if ("number" == typeof value1) {
                return;
            }
            throw logErrorAndStop(text, ...parts);
        }
    }
    const isPromise = value => value instanceof Promise;
    const safeCall = (call, thenFn, rejectFn) => {
        try {
            const promise = call();
            return isPromise(promise) ? promise.then(thenFn, rejectFn) : thenFn(promise);
        } catch (e) {
            return rejectFn(e);
        }
    };
    const then = (promise, thenFn) => isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
    const promiseAll = promises => promises.some(isPromise) ? Promise.all(promises) : promises;
    const promiseAllLazy = promises => promises.length > 0 ? Promise.all(promises) : promises;
    const isNotNullable = v => null != v;
    const delay = timeout => new Promise((resolve => {
        setTimeout(resolve, timeout);
    }));
    const EMPTY_ARRAY = [];
    const EMPTY_OBJ = {};
    qDev && (Object.freeze(EMPTY_ARRAY), Object.freeze(EMPTY_OBJ), Error.stackTraceLimit = 9999);
    const EXTRACT_IMPORT_PATH = /\(\s*(['"])([^\1]+)\1\s*\)/;
    const EXTRACT_SELF_IMPORT = /Promise\s*\.\s*resolve/;
    const EXTRACT_FILE_NAME = /[\\/(]([\w\d.\-_]+\.(js|ts)x?):/;
    const announcedQRL = new Set;
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
        return announcedQRL.has(symbol) && (announcedQRL.add(symbol), emitEvent("qprefetch", {
            symbols: [ getSymbolHash(symbol) ]
        })), createQRL(chunk, symbol, null, symbolFn, null, lexicalScopeCapture, null);
    };
    const inlinedQrl = (symbol, symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, symbol, null, null, lexicalScopeCapture, null);
    const serializeQRL = (qrl, opts = {}) => {
        assertTrue(true, "In order to serialize a QRL, qSerialize must be true"), assertQrl(qrl);
        let symbol = qrl.$symbol$;
        let chunk = qrl.$chunk$;
        const refSymbol = qrl.$refSymbol$ ?? symbol;
        const platform = getPlatform();
        if (platform) {
            const result = platform.chunkForSymbol(refSymbol, chunk);
            result && (chunk = result[1], qrl.$refSymbol$ || (symbol = result[0]));
        }
        if (!chunk) {
            throw qError(31, qrl.$symbol$);
        }
        chunk.startsWith("./") && (chunk = chunk.slice(2));
        const parts = [ chunk, "#", symbol ];
        const capture = qrl.$capture$;
        const captureRef = qrl.$captureRef$;
        if (captureRef && captureRef.length) {
            if (opts.$getObjId$) {
                const capture = captureRef.map(opts.$getObjId$);
                parts.push(`[${capture.join(" ")}]`);
            } else if (opts.$addRefMap$) {
                const capture = captureRef.map(opts.$addRefMap$);
                parts.push(`[${capture.join(" ")}]`);
            }
        } else {
            capture && capture.length > 0 && parts.push(`[${capture.join(" ")}]`);
        }
        return parts.join("");
    };
    const serializeQRLs = (existingQRLs, elCtx) => {
        assertElement(elCtx.$element$);
        const opts = {
            $addRefMap$: obj => addToArray(elCtx.$refMap$, obj)
        };
        return existingQRLs.map((qrl => serializeQRL(qrl, opts))).join("\n");
    };
    const parseQRL = (qrl, containerEl) => {
        const endIdx = qrl.length;
        const hashIdx = indexOf(qrl, 0, "#");
        const captureIdx = indexOf(qrl, hashIdx, "[");
        const chunkEndIdx = Math.min(hashIdx, captureIdx);
        const chunk = qrl.substring(0, chunkEndIdx);
        const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
        const symbolEndIdx = captureIdx;
        const symbol = symbolStartIdx == symbolEndIdx ? "default" : qrl.substring(symbolStartIdx, symbolEndIdx);
        const captureStartIdx = captureIdx;
        const captureEndIdx = endIdx;
        const capture = captureStartIdx === captureEndIdx ? EMPTY_ARRAY : qrl.substring(captureStartIdx + 1, captureEndIdx - 1).split(" ");
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
        return -1 === index ? (array.push(obj), array.length - 1) : index;
    };
    const inflateQrl = (qrl, elCtx) => (assertDefined(qrl.$capture$, "invoke: qrl capture must be defined inside useLexicalScope()", qrl), 
    qrl.$captureRef$ = qrl.$capture$.map((idx => {
        const int = parseInt(idx, 10);
        const obj = elCtx.$refMap$[int];
        return assertTrue(elCtx.$refMap$.length > int, "out of bounds inflate access", idx), 
        obj;
    })));
    const fromCamelToKebabCase = text => text.replace(/([A-Z])/g, "-$1").toLowerCase();
    const OnRenderProp = "q:renderFn";
    const ComponentStylesPrefixContent = "⭐️";
    const QSlot = "q:slot";
    const directSetAttribute = (el, prop, value) => el.setAttribute(prop, value);
    const directGetAttribute = (el, prop) => el.getAttribute(prop);
    const CONTAINER_STATE = Symbol("ContainerState");
    const _getContainerState = containerEl => {
        let set = containerEl[CONTAINER_STATE];
        return set || (assertTrue(!isServerPlatform(), "Container state can only be created lazily on the browser"), 
        containerEl[CONTAINER_STATE] = set = createContainerState(containerEl, directGetAttribute(containerEl, "q:base") ?? "/")), 
        set;
    };
    const createContainerState = (containerEl, base) => {
        const containerState = {
            $containerEl$: containerEl,
            $elementIndex$: 0,
            $proxyMap$: new WeakMap,
            $opsNext$: new Set,
            $watchNext$: new Set,
            $watchStaging$: new Set,
            $hostsNext$: new Set,
            $hostsStaging$: new Set,
            $styleIds$: new Set,
            $events$: new Set,
            $serverData$: {},
            $base$: base,
            $renderPromise$: void 0,
            $hostsRendering$: void 0,
            $pauseCtx$: void 0,
            $subsManager$: null
        };
        return seal(containerState), containerState.$subsManager$ = createSubscriptionManager(containerState), 
        containerState;
    };
    const setRef = (value, elm) => {
        if (isFunction(value)) {
            return value(elm);
        }
        if (isObject(value)) {
            if ("current" in value) {
                return value.current = elm;
            }
            if ("value" in value) {
                return value.value = elm;
            }
        }
        throw qError(32, value);
    };
    const addQwikEvent = (prop, containerState) => {
        var _a;
        const eventName = getEventName(prop);
        if (!qTest && !isServerPlatform()) {
            try {
                ((_a = globalThis).qwikevents || (_a.qwikevents = [])).push(eventName);
            } catch (err) {
                logWarn(err);
            }
        }
        containerState.$events$.add(eventName);
    };
    const intToStr = nu => nu.toString(36);
    const strToInt = nu => parseInt(nu, 36);
    const getEventName = attribute => {
        const colonPos = attribute.indexOf(":");
        return attribute ? attribute.slice(colonPos + 1).replace(/-./g, (x => x[1].toUpperCase())) : attribute;
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
        if (assertTrue(prop.endsWith("$"), "render: event property does not end with $", prop), 
        prop = normalizeOnProp(prop.slice(0, -1)), input) {
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
        return scope + ":" + (prop.startsWith("-") ? fromCamelToKebabCase(prop.slice(1)) : prop.toLowerCase());
    };
    const ensureQrl = (value, containerEl) => (assertQrl(value), value.$setContainer$(containerEl), 
    value);
    function isElement(value) {
        return function(value) {
            return value && "number" == typeof value.nodeType;
        }(value) && 1 === value.nodeType;
    }
    const QOjectTargetSymbol = Symbol("proxy target");
    const QObjectFlagsSymbol = Symbol("proxy flags");
    const QObjectManagerSymbol = Symbol("proxy manager");
    const _IMMUTABLE = Symbol("IMMUTABLE");
    var _a;
    const _createSignal = (value, containerState, flags, subcriptions) => {
        const manager = containerState.$subsManager$.$createManager$(subcriptions);
        return new SignalImpl(value, manager, flags);
    };
    const QObjectSignalFlags = Symbol("proxy manager");
    const SignalUnassignedException = Symbol("unasigned signal");
    class SignalImpl {
        constructor(v, manager, flags) {
            this[_a] = 0, this.untrackedValue = v, this[QObjectManagerSymbol] = manager, this[QObjectSignalFlags] = flags;
        }
        valueOf() {
            throw new TypeError("Cannot coerce a Signal, use `.value` instead");
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
            const sub = tryGetInvokeContext()?.$subscriber$;
            if (sub) {
                if (2 & this[QObjectSignalFlags]) {
                    throw SignalUnassignedException;
                }
                this[QObjectManagerSymbol].$addSub$([ 0, sub, void 0 ]);
            }
            return this.untrackedValue;
        }
        set value(v) {
            if (qDev) {
                if (1 & this[QObjectSignalFlags]) {
                    throw new Error("Cannot mutate immutable signal");
                }
                verifySerializable(v);
                const invokeCtx = tryGetInvokeContext();
                invokeCtx && ("qRender" === invokeCtx.$event$ && logWarn("State mutation inside render function. Use useTask$() instead.", invokeCtx.$hostElement$), 
                "ComputedEvent" === invokeCtx.$event$ && logWarn("State mutation inside useComputed$() is an antipattern. Use useTask$() instead", invokeCtx.$hostElement$));
            }
            const manager = this[QObjectManagerSymbol];
            const oldValue = this.untrackedValue;
            manager && oldValue !== v && (this.untrackedValue = v, manager.$notifySubs$());
        }
    }
    _a = QObjectSignalFlags;
    const isSignal = obj => obj instanceof SignalImpl || obj instanceof SignalWrapper;
    const addSignalSub = (type, hostEl, signal, elm, property) => {
        const subscription = signal instanceof SignalWrapper ? [ type, hostEl, getProxyTarget(signal.ref), elm, property, signal.prop ] : [ type, hostEl, signal, elm, property, "value" ];
        getProxyManager(signal).$addSub$(subscription);
    };
    class SignalWrapper {
        constructor(ref, prop) {
            this.ref = ref, this.prop = prop;
        }
        get [QObjectManagerSymbol]() {
            return getProxyManager(this.ref);
        }
        get value() {
            return this.ref[this.prop];
        }
        set value(value) {
            this.ref[this.prop] = value;
        }
    }
    const _wrapProp = (obj, prop) => {
        if (!isObject(obj)) {
            return obj[prop];
        }
        if (obj instanceof SignalImpl) {
            return assertEqual(prop, "value", "Left side is a signal, prop must be value"), 
            obj;
        }
        if (obj instanceof SignalWrapper) {
            return assertEqual(prop, "value", "Left side is a signal, prop must be value"), 
            obj;
        }
        const target = getProxyTarget(obj);
        if (target) {
            const signal = target["$$" + prop];
            if (signal) {
                return assertTrue(isSignal(signal), "$$ has to be a signal kind"), signal;
            }
            if (true !== target[_IMMUTABLE]?.[prop]) {
                return new SignalWrapper(obj, prop);
            }
        }
        const immutable = obj[_IMMUTABLE]?.[prop];
        if (isSignal(immutable)) {
            return immutable;
        }
        const value = obj[prop];
        return isSignal(value) ? _IMMUTABLE : value;
    };
    const getOrCreateProxy = (target, containerState, flags = 0) => containerState.$proxyMap$.get(target) || (0 !== flags && setObjectFlags(target, flags), 
    createProxy(target, containerState, void 0));
    const createProxy = (target, containerState, subs) => {
        assertEqual(unwrapProxy(target), target, "Unexpected proxy at this location", target), 
        assertTrue(!containerState.$proxyMap$.has(target), "Proxy was already created", target), 
        assertTrue(isObject(target), "Target must be an object"), assertTrue(isSerializableObject(target) || isArray(target), "Target must be a serializable object");
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
            enumerable: false
        });
    };
    class ReadWriteProxyHandler {
        constructor($containerState$, $manager$) {
            this.$containerState$ = $containerState$, this.$manager$ = $manager$;
        }
        get(target, prop) {
            if ("symbol" == typeof prop) {
                return prop === QOjectTargetSymbol ? target : prop === QObjectManagerSymbol ? this.$manager$ : target[prop];
            }
            let subscriber;
            const flags = target[QObjectFlagsSymbol] ?? 0;
            assertNumber(flags, "flags must be an number");
            const invokeCtx = tryGetInvokeContext();
            const recursive = 0 != (1 & flags);
            const immutable = 0 != (2 & flags);
            let value = target[prop];
            if (invokeCtx && (subscriber = invokeCtx.$subscriber$), immutable) {
                const hiddenSignal = target["$$" + prop];
                const immutableMeta = target[_IMMUTABLE]?.[prop];
                prop in target && !hiddenSignal && !isSignal(immutableMeta) && immutableMeta !== _IMMUTABLE || (subscriber = null), 
                hiddenSignal && (assertTrue(isSignal(hiddenSignal), "$$ prop must be a signal"), 
                value = hiddenSignal.value);
            }
            if (subscriber) {
                const isA = isArray(target);
                this.$manager$.$addSub$([ 0, subscriber, isA ? void 0 : prop ]);
            }
            return recursive ? wrap(value, this.$containerState$) : value;
        }
        set(target, prop, newValue) {
            if ("symbol" == typeof prop) {
                return target[prop] = newValue, true;
            }
            const flags = target[QObjectFlagsSymbol] ?? 0;
            if (assertNumber(flags, "flags must be an number"), 0 != (2 & flags)) {
                throw qError(17);
            }
            const unwrappedNewValue = 0 != (1 & flags) ? unwrapProxy(newValue) : newValue;
            if (qDev) {
                verifySerializable(unwrappedNewValue);
                const invokeCtx = tryGetInvokeContext();
                invokeCtx && "qRender" === invokeCtx.$event$ && logError("State mutation inside render function. Move mutation to useTask$() or useVisibleTask$()", prop);
            }
            return isArray(target) ? (target[prop] = unwrappedNewValue, this.$manager$.$notifySubs$(), 
            true) : (target[prop] !== unwrappedNewValue && (target[prop] = unwrappedNewValue, 
            this.$manager$.$notifySubs$(prop)), true);
        }
        has(target, property) {
            if (property === QOjectTargetSymbol) {
                return true;
            }
            const hasOwnProperty = Object.prototype.hasOwnProperty;
            return !!hasOwnProperty.call(target, property) || !("string" != typeof property || !hasOwnProperty.call(target, "$$" + property));
        }
        ownKeys(target) {
            const flags = target[QObjectFlagsSymbol] ?? 0;
            if (assertNumber(flags, "flags must be an number"), !(0 != (2 & flags))) {
                let subscriber = null;
                const invokeCtx = tryGetInvokeContext();
                invokeCtx && (subscriber = invokeCtx.$subscriber$), subscriber && this.$manager$.$addSub$([ 0, subscriber, void 0 ]);
            }
            return isArray(target) ? Reflect.ownKeys(target) : Reflect.ownKeys(target).map((a => "string" == typeof a && a.startsWith("$$") ? a.slice("$$".length) : a));
        }
        getOwnPropertyDescriptor(target, prop) {
            return isArray(target) || "symbol" == typeof prop ? Object.getOwnPropertyDescriptor(target, prop) : {
                enumerable: true,
                configurable: true
            };
        }
    }
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
                return containerState.$proxyMap$.get(nakedValue) || getOrCreateProxy(nakedValue, containerState, 1);
            }
        }
        return value;
    };
    const tryGetContext = element => element._qc_;
    const getContext = (el, containerState) => {
        assertQwikElement(el);
        const ctx = tryGetContext(el);
        if (ctx) {
            return ctx;
        }
        const elCtx = createContext$1(el);
        const elementID = directGetAttribute(el, "q:id");
        if (elementID) {
            const pauseCtx = containerState.$pauseCtx$;
            if (elCtx.$id$ = elementID, pauseCtx) {
                const {getObject: getObject, meta: meta, refs: refs} = pauseCtx;
                if (isElement(el)) {
                    const refMap = refs[elementID];
                    refMap && (assertTrue(isElement(el), "el must be an actual DOM element"), elCtx.$refMap$ = refMap.split(" ").map(getObject), 
                    elCtx.li = ((elCtx, containerEl) => {
                        const attributes = elCtx.$element$.attributes;
                        const listeners = [];
                        for (let i = 0; i < attributes.length; i++) {
                            const {name: name, value: value} = attributes.item(i);
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
                    const ctxMeta = meta[elementID];
                    if (ctxMeta) {
                        const seq = ctxMeta.s;
                        const host = ctxMeta.h;
                        const contexts = ctxMeta.c;
                        const watches = ctxMeta.w;
                        if (seq && (elCtx.$seq$ = seq.split(" ").map(getObject)), watches && (elCtx.$watches$ = watches.split(" ").map(getObject)), 
                        contexts) {
                            elCtx.$contexts$ = new Map;
                            for (const part of contexts.split(" ")) {
                                const [key, value] = part.split("=");
                                elCtx.$contexts$.set(key, getObject(value));
                            }
                        }
                        if (host) {
                            const [renderQrl, props] = host.split(" ");
                            const styleIds = el.getAttribute("q:sstyle");
                            elCtx.$scopeIds$ = styleIds ? styleIds.split("|") : null, elCtx.$flags$ = 4, renderQrl && (elCtx.$componentQrl$ = getObject(renderQrl)), 
                            elCtx.$props$ = props ? getObject(props) : createProxy(createPropsState(), containerState);
                        }
                    }
                }
            }
        }
        return elCtx;
    };
    const createContext$1 = element => {
        const ctx = {
            $flags$: 0,
            $id$: "",
            $element$: element,
            $refMap$: [],
            li: [],
            $watches$: null,
            $seq$: null,
            $slots$: null,
            $scopeIds$: null,
            $appendStyles$: null,
            $props$: null,
            $vdom$: null,
            $componentQrl$: null,
            $contexts$: null,
            $dynamicSlots$: null,
            $parent$: null,
            $slotParent$: null
        };
        return seal(ctx), element._qc_ = ctx, ctx;
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
        return assertDefined(ctx.$hostElement$, "invoke: $hostElement$ must be defined", ctx), 
        assertDefined(ctx.$waitOn$, "invoke: $waitOn$ must be defined", ctx), assertDefined(ctx.$renderCtx$, "invoke: $renderCtx$ must be defined", ctx), 
        assertDefined(ctx.$subscriber$, "invoke: $subscriber$ must be defined", ctx), ctx;
    };
    const useBindInvokeContext = callback => {
        if (null == callback) {
            return callback;
        }
        const ctx = getInvokeContext();
        return (...args) => invoke(ctx, callback.bind(void 0, ...args));
    };
    function invoke(context, fn, ...args) {
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
    const newInvokeContextFromTuple = context => {
        const element = context[0];
        const container = element.closest("[q\\:container]");
        const locale = container?.getAttribute("q:locale") || void 0;
        return locale && function(locale) {
            _locale = locale;
        }(locale), newInvokeContext(locale, void 0, element, context[1], context[2]);
    };
    const newInvokeContext = (locale, hostElement, element, event, url) => {
        const ctx = {
            $seq$: 0,
            $hostElement$: hostElement,
            $element$: element,
            $event$: event,
            $url$: url,
            $qrl$: void 0,
            $props$: void 0,
            $renderCtx$: void 0,
            $subscriber$: void 0,
            $waitOn$: void 0,
            $locale$: locale
        };
        return seal(ctx), ctx;
    };
    const getWrappingContainer = el => el.closest("[q\\:container]");
    const untrack = fn => invoke(void 0, fn);
    const implicit$FirstArg = fn => function(first, ...rest) {
        return fn.call(null, $(first), ...rest);
    };
    const useSequentialScope = () => {
        const iCtx = useInvokeContext();
        const i = iCtx.$seq$;
        const hostElement = iCtx.$hostElement$;
        const elCtx = getContext(hostElement, iCtx.$renderCtx$.$static$.$containerState$);
        const seq = elCtx.$seq$ ? elCtx.$seq$ : elCtx.$seq$ = [];
        return iCtx.$seq$++, {
            get: seq[i],
            set: value => (qDev && verifySerializable(value), seq[i] = value),
            i: i,
            iCtx: iCtx,
            elCtx: elCtx
        };
    };
    const useCleanupQrl = unmountFn => {
        const {get: get, set: set, i: i, elCtx: elCtx} = useSequentialScope();
        if (!get) {
            assertQrl(unmountFn);
            const watch = new Task(WatchFlagsIsCleanup, i, elCtx.$element$, unmountFn, void 0);
            set(true), elCtx.$watches$ || (elCtx.$watches$ = []), elCtx.$watches$.push(watch);
        }
    };
    const useCleanup$ = implicit$FirstArg(useCleanupQrl);
    const useOn = (event, eventQrl) => _useOn(`on-${event}`, eventQrl);
    const useOnDocument = (event, eventQrl) => _useOn(`document:on-${event}`, eventQrl);
    const _useOn = (eventName, eventQrl) => {
        const invokeCtx = useInvokeContext();
        const elCtx = getContext(invokeCtx.$hostElement$, invokeCtx.$renderCtx$.$static$.$containerState$);
        assertQrl(eventQrl), "string" == typeof eventName ? elCtx.li.push([ normalizeOnProp(eventName), eventQrl ]) : elCtx.li.push(...eventName.map((name => [ normalizeOnProp(name), eventQrl ]))), 
        elCtx.$flags$ |= 2;
    };
    const SkipRender = Symbol("skip render");
    const RenderOnce = (props, key) => jsx(Virtual, {
        ...props,
        qonce: ""
    }, key);
    const SSRRaw = () => null;
    const SSRComment = props => jsx(SSRRaw, {
        data: `\x3c!--${props.data}--\x3e`
    }, null);
    const Virtual = props => props.children;
    const SSRHint = props => props.children;
    const InternalSSRStream = () => null;
    let warnClassname = false;
    const jsx = (type, props, key) => {
        const processed = null == key ? null : String(key);
        const node = new JSXNodeImpl(type, props, processed);
        return seal(node), node;
    };
    class JSXNodeImpl {
        constructor(type, props, key = null) {
            this.type = type, this.props = props, this.key = key, qDev && invoke(void 0, (() => {
                const isQwikC = isQwikComponent(type);
                if (!isString(type) && !isFunction(type)) {
                    throw createJSXError(`The <Type> of the JSX element must be either a string or a function. Instead, it's a "${typeof type}": ${String(type)}.`, this);
                }
                if (isArray(props.children)) {
                    const flatChildren = props.children.flat();
                    (isString(type) || isQwikC) && flatChildren.forEach((child => {
                        if (!isValidJSXChild(child)) {
                            const typeObj = typeof child;
                            let explanation = "";
                            throw "object" === typeObj ? explanation = child?.constructor ? `it's an instance of "${child?.constructor.name}".` : `it's a object literal: ${printObjectLiteral(child)} ` : "function" === typeObj ? explanation += `it's a function named "${child.name}".` : explanation = `it's a "${typeObj}": ${String(child)}.`, 
                            createJSXError(`One of the children of <${type} /> is not an accepted value. JSX children must be either: string, boolean, number, <element>, Array, undefined/null, or a Promise/Signal that resolves to one of those types. Instead, ${explanation}`, this);
                        }
                    }));
                    const keys = {};
                    flatChildren.forEach((child => {
                        if (isJSXNode(child) && !isString(child.type) && null != child.key) {
                            if (keys[child.key]) {
                                const err = createJSXError("Multiple JSX sibling nodes with the same key.\nThis is likely caused by missing a custom key in a for loop", child);
                                err && logError(err);
                            } else {
                                keys[child.key] = true;
                            }
                        }
                    }));
                }
                if (props) {
                    for (const prop of Object.keys(props)) {
                        const value = props[prop];
                        if (prop.endsWith("$") && value && !isQrl(value) && !Array.isArray(value)) {
                            throw createJSXError(`The value passed in ${prop}={...}> must be a QRL, instead you passed a "${typeof value}". Make sure your ${typeof value} is wrapped with $(...), so it can be serialized. Like this:\n$(${String(value)})`, this);
                        }
                        "children" !== prop && isQwikC && value && verifySerializable(value, `The value of the JSX attribute "${prop}" can not be serialized`);
                    }
                }
                isString(type) && ("style" === type && props.children && logWarn("jsx: Using <style>{content}</style> will escape the content, effectively breaking the CSS.\nIn order to disable content escaping use '<style dangerouslySetInnerHTML={content}/>'\n\nHowever, if the use case is to inject component styleContent, use 'useStyles$()' instead, it will be a lot more efficient.\nSee https://qwik.builder.io/docs/components/styles/#usestyles for more information."), 
                "script" === type && props.children && logWarn("jsx: Using <script>{content}<\/script> will escape the content, effectively breaking the inlined JS.\nIn order to disable content escaping use '<script dangerouslySetInnerHTML={content}/>'"), 
                "className" in props && (props.class = props.className, delete props.className, 
                qDev && !warnClassname && (warnClassname = true, logWarn("jsx: `className` is deprecated. Use `class` instead."))));
            })), isString(type) && "className" in props && (props.class = props.className, delete props.className, 
            qDev && !warnClassname && (warnClassname = true, logWarn("jsx: `className` is deprecated. Use `class` instead.")));
        }
    }
    const printObjectLiteral = obj => `{ ${Object.keys(obj).map((key => `"${key}"`)).join(", ")} }`;
    const isJSXNode = n => qDev ? n instanceof JSXNodeImpl || !!(isObject(n) && "key" in n && "props" in n && "type" in n) && (logWarn('Duplicate implementations of "JSXNode" found'), 
    true) : n instanceof JSXNodeImpl;
    const isValidJSXChild = node => !node || node === SkipRender || !(!isString(node) && "number" != typeof node && "boolean" != typeof node) || !!isJSXNode(node) || (isSignal(node) ? isValidJSXChild(node.value) : !!isPromise(node));
    const Fragment = props => props.children;
    const ONCE_JSX = new Set;
    const createJSXError = (message, node) => {
        const error = new Error(message);
        if (!node.dev) {
            return error;
        }
        const id = node.dev.fileName;
        const key = `${message}${id}:${node.dev.lineNumber}:${node.dev.columnNumber}`;
        return ONCE_JSX.has(key) ? void 0 : (Object.assign(error, {
            id: id,
            loc: {
                file: id,
                column: node.dev.columnNumber,
                line: node.dev.lineNumber
            }
        }), error.stack = `JSXError: ${message}\n${filterStack(node.dev.stack, 1)}`, ONCE_JSX.add(key), 
        error);
    };
    const filterStack = (stack, offset = 0) => stack.split("\n").slice(offset).filter((l => !l.includes("/node_modules/@builder.io/qwik") && !l.includes("(node:"))).join("\n");
    const getDocument = node => {
        if ("undefined" != typeof document) {
            return document;
        }
        if (9 === node.nodeType) {
            return node;
        }
        const doc = node.ownerDocument;
        return assertDefined(doc, "doc must be defined"), doc;
    };
    const setAttribute = (staticCtx, el, prop, value) => {
        staticCtx ? staticCtx.$operations$.push({
            $operation$: _setAttribute,
            $args$: [ el, prop, value ]
        }) : _setAttribute(el, prop, value);
    };
    const _setAttribute = (el, prop, value) => {
        if (null == value || false === value) {
            el.removeAttribute(prop);
        } else {
            const str = true === value ? "" : String(value);
            directSetAttribute(el, prop, str);
        }
    };
    const setProperty = (staticCtx, node, key, value) => {
        staticCtx ? staticCtx.$operations$.push({
            $operation$: _setProperty,
            $args$: [ node, key, value ]
        }) : _setProperty(node, key, value);
    };
    const _setProperty = (node, key, value) => {
        try {
            node[key] = null == value ? "" : value, null == value && isNode$1(node) && isElement$1(node) && node.removeAttribute(key);
        } catch (err) {
            logError(codeToText(6), {
                node: node,
                key: key,
                value: value
            }, err);
        }
    };
    const createElement = (doc, expectTag, isSvg) => isSvg ? doc.createElementNS(SVG_NS, expectTag) : doc.createElement(expectTag);
    const insertBefore = (staticCtx, parent, newChild, refChild) => (staticCtx.$operations$.push({
        $operation$: directInsertBefore,
        $args$: [ parent, newChild, refChild || null ]
    }), newChild);
    const appendChild = (staticCtx, parent, newChild) => (staticCtx.$operations$.push({
        $operation$: directAppendChild,
        $args$: [ parent, newChild ]
    }), newChild);
    const appendHeadStyle = (staticCtx, styleTask) => {
        staticCtx.$containerState$.$styleIds$.add(styleTask.styleId), staticCtx.$postOperations$.push({
            $operation$: _appendHeadStyle,
            $args$: [ staticCtx.$containerState$.$containerEl$, styleTask ]
        });
    };
    const _setClasslist = (elm, toRemove, toAdd) => {
        const classList = elm.classList;
        classList.remove(...toRemove), classList.add(...toAdd);
    };
    const _appendHeadStyle = (containerEl, styleTask) => {
        const doc = getDocument(containerEl);
        const isDoc = doc.documentElement === containerEl;
        const headEl = doc.head;
        const style = doc.createElement("style");
        isDoc && !headEl && logWarn("document.head is undefined"), directSetAttribute(style, "q:style", styleTask.styleId), 
        directSetAttribute(style, "hidden", ""), style.textContent = styleTask.content, 
        isDoc && headEl ? directAppendChild(headEl, style) : directInsertBefore(containerEl, style, containerEl.firstChild);
    };
    const directPrepend = (parent, newChild) => {
        directInsertBefore(parent, newChild, parent.firstChild);
    };
    const removeNode = (staticCtx, el) => {
        staticCtx.$operations$.push({
            $operation$: _removeNode,
            $args$: [ el, staticCtx ]
        });
    };
    const _removeNode = (el, staticCtx) => {
        const parent = el.parentElement;
        if (parent) {
            if (1 === el.nodeType || 111 === el.nodeType) {
                const subsManager = staticCtx.$containerState$.$subsManager$;
                cleanupTree(el, staticCtx, subsManager, true);
            }
            directRemoveChild(parent, el);
        } else {
            qDev && logWarn("Trying to remove component already removed", el);
        }
    };
    const createTemplate = (doc, slotName) => {
        const template = createElement(doc, "q:template", false);
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
            assertDefined(key, "slots must have a key");
            const slotChildren = getChildren(slotEl, "root");
            if (slotChildren.length > 0) {
                const sref = slotEl.getAttribute("q:sref");
                const hostCtx = staticCtx.$roots$.find((r => r.$id$ === sref));
                if (hostCtx) {
                    const hostElm = hostCtx.$element$;
                    if (Array.from(hostElm.childNodes).some((node => isSlotTemplate(node) && directGetAttribute(node, QSlot) === key))) {
                        cleanupTree(slotEl, staticCtx, subsManager, false);
                    } else {
                        const template = createTemplate(staticCtx.$doc$, key);
                        for (const child of slotChildren) {
                            directAppendChild(template, child);
                        }
                        directInsertBefore(hostElm, template, hostElm.firstChild);
                    }
                } else {
                    cleanupTree(slotEl, staticCtx, subsManager, false);
                }
            }
        }
        for (const [slotEl, hostElm] of staticCtx.$addSlots$) {
            const key = getKey(slotEl);
            assertDefined(key, "slots must have a key");
            const template = Array.from(hostElm.childNodes).find((node => isSlotTemplate(node) && node.getAttribute(QSlot) === key));
            template && (getChildren(template, "root").forEach((child => {
                directAppendChild(slotEl, child);
            })), template.remove());
        }
    };
    const printRenderStats = staticCtx => {
        if (qDev && "undefined" != typeof window && null != window.document) {
            const byOp = {};
            for (const op of staticCtx.$operations$) {
                byOp[op.$operation$.name] = (byOp[op.$operation$.name] ?? 0) + 1;
            }
            const stats = {
                byOp: byOp,
                roots: staticCtx.$roots$.map((ctx => ctx.$element$)),
                hostElements: Array.from(staticCtx.$hostElements$),
                operations: staticCtx.$operations$.map((v => [ v.$operation$.name, ...v.$args$ ]))
            };
            const noOps = 0 === staticCtx.$operations$.length;
            logDebug("Render stats.", noOps ? "No operations" : "", stats);
        }
    };
    class VirtualElementImpl {
        constructor(open, close) {
            this.open = open, this.close = close, this._qc_ = null, this.nodeType = 111, this.localName = ":virtual", 
            this.nodeName = ":virtual";
            const doc = this.ownerDocument = open.ownerDocument;
            this.template = createElement(doc, "template", false), this.attributes = (str => {
                if (!str) {
                    return new Map;
                }
                const attributes = str.split(" ");
                return new Map(attributes.map((attr => {
                    const index = attr.indexOf("=");
                    return index >= 0 ? [ attr.slice(0, index), (s = attr.slice(index + 1), s.replace(/\+/g, " ")) ] : [ attr, "" ];
                    var s;
                })));
            })(open.data.slice(3)), assertTrue(open.data.startsWith("qv "), "comment is not a qv"), 
            open.__virtual = this, seal(this);
        }
        insertBefore(node, ref) {
            const parent = this.parentElement;
            if (parent) {
                const ref2 = ref || this.close;
                parent.insertBefore(node, ref2);
            } else {
                this.template.insertBefore(node, ref);
            }
            return node;
        }
        remove() {
            const parent = this.parentElement;
            if (parent) {
                const ch = Array.from(this.childNodes);
                assertEqual(this.template.childElementCount, 0, "children should be empty"), parent.removeChild(this.open), 
                this.template.append(...ch), parent.removeChild(this.close);
            }
        }
        appendChild(node) {
            return this.insertBefore(node, null);
        }
        insertBeforeTo(newParent, child) {
            const ch = Array.from(this.childNodes);
            newParent.insertBefore(this.open, child);
            for (const c of ch) {
                newParent.insertBefore(c, child);
            }
            newParent.insertBefore(this.close, child), assertEqual(this.template.childElementCount, 0, "children should be empty");
        }
        appendTo(newParent) {
            this.insertBeforeTo(newParent, null);
        }
        get namespaceURI() {
            return this.parentElement?.namespaceURI ?? "";
        }
        removeChild(child) {
            this.parentElement ? this.parentElement.removeChild(child) : this.template.removeChild(child);
        }
        getAttribute(prop) {
            return this.attributes.get(prop) ?? null;
        }
        hasAttribute(prop) {
            return this.attributes.has(prop);
        }
        setAttribute(prop, value) {
            this.attributes.set(prop, value), this.open.data = updateComment(this.attributes);
        }
        removeAttribute(prop) {
            this.attributes.delete(prop), this.open.data = updateComment(this.attributes);
        }
        matches(_) {
            return false;
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
            return getChildren(this, "elements").forEach((el => {
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
        get firstChild() {
            if (this.parentElement) {
                const first = this.open.nextSibling;
                return first === this.close ? null : first;
            }
            return this.template.firstChild;
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
        return map.forEach(((value, key) => {
            var s;
            value ? attributes.push(`${key}=${s = value, s.replace(/ /g, "+")}`) : attributes.push(`${key}`);
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
            const close = findClose(open);
            return new VirtualElementImpl(open, close);
        }
        return null;
    };
    const findClose = open => {
        let node = open.nextSibling;
        let stack = 1;
        for (;node; ) {
            if (isComment(node)) {
                if (node.data.startsWith("qv ")) {
                    stack++;
                } else if ("/qv" === node.data && (stack--, 0 === stack)) {
                    return node;
                }
            }
            node = node.nextSibling;
        }
        throw new Error("close not found");
    };
    const getRootNode = node => null == node ? null : isVirtualElement(node) ? node.open : node;
    const createContextId = name => (assertTrue(/^[\w/.-]+$/.test(name), "Context name must only contain A-Z,a-z,0-9, _", name), 
    Object.freeze({
        id: fromCamelToKebabCase(name)
    }));
    const useContextProvider = (context, newValue) => {
        const {get: get, set: set, elCtx: elCtx} = useSequentialScope();
        if (void 0 !== get) {
            return;
        }
        qDev && validateContext(context);
        let contexts = elCtx.$contexts$;
        contexts || (elCtx.$contexts$ = contexts = new Map), qDev && verifySerializable(newValue), 
        contexts.set(context.id, newValue), set(true);
    };
    const resolveContext = (context, hostCtx, containerState) => {
        const contextID = context.id;
        if (hostCtx) {
            let hostElement = hostCtx.$element$;
            let ctx = hostCtx.$slotParent$ ?? hostCtx.$parent$;
            for (;ctx; ) {
                if (hostElement = ctx.$element$, ctx.$contexts$) {
                    const found = ctx.$contexts$.get(contextID);
                    if (found) {
                        return found;
                    }
                    if (true === ctx.$contexts$.get("_")) {
                        break;
                    }
                }
                ctx = ctx.$slotParent$ ?? ctx.$parent$;
            }
            if (hostElement.closest) {
                const value = queryContextFromDom(hostElement, containerState, contextID);
                if (void 0 !== value) {
                    return value;
                }
            }
        }
    };
    const queryContextFromDom = (hostElement, containerState, contextId) => {
        let element = hostElement;
        for (;element; ) {
            let node = element;
            let virtual;
            for (;node && (virtual = findVirtual(node)); ) {
                const contexts = getContext(virtual, containerState)?.$contexts$;
                if (contexts && contexts.has(contextId)) {
                    return contexts.get(contextId);
                }
                node = virtual;
            }
            element = element.parentElement;
        }
    };
    const findVirtual = el => {
        let node = el;
        let stack = 1;
        for (;node = node.previousSibling; ) {
            if (isComment(node)) {
                if ("/qv" === node.data) {
                    stack++;
                } else if (node.data.startsWith("qv ") && (stack--, 0 === stack)) {
                    return getVirtualElement(node);
                }
            }
        }
        return null;
    };
    const validateContext = context => {
        if (!isObject(context) || "string" != typeof context.id || 0 === context.id.length) {
            throw qError(28, context);
        }
    };
    const ERROR_CONTEXT = createContextId("qk-error");
    const handleError = (err, hostElement, rCtx) => {
        const elCtx = tryGetContext(hostElement);
        if (qDev) {
            if (!isServerPlatform() && "undefined" != typeof document && isVirtualElement(hostElement)) {
                elCtx.$vdom$ = null;
                const errorDiv = document.createElement("errored-host");
                err && err instanceof Error && (errorDiv.props = {
                    error: err
                }), errorDiv.setAttribute("q:key", "_error_"), errorDiv.append(...hostElement.childNodes), 
                hostElement.appendChild(errorDiv);
            }
            if (err && err instanceof Error && ("hostElement" in err || (err.hostElement = hostElement)), 
            !isRecoverable(err)) {
                throw err;
            }
        }
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
    const isRecoverable = err => !(err && err instanceof Error && "plugin" in err);
    const executeComponent = (rCtx, elCtx) => {
        elCtx.$flags$ &= -2, elCtx.$flags$ |= 4, elCtx.$slots$ = [], elCtx.li.length = 0;
        const hostElement = elCtx.$element$;
        const componentQRL = elCtx.$componentQrl$;
        const props = elCtx.$props$;
        const newCtx = pushRenderContext(rCtx);
        const invocationContext = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "qRender");
        const waitOn = invocationContext.$waitOn$ = [];
        assertDefined(componentQRL, "render: host element to render must has a $renderQrl$:", elCtx), 
        assertDefined(props, "render: host element to render must has defined props", elCtx), 
        newCtx.$cmpCtx$ = elCtx, newCtx.$slotCtx$ = null, invocationContext.$subscriber$ = hostElement, 
        invocationContext.$renderCtx$ = rCtx, componentQRL.$setContainer$(rCtx.$static$.$containerState$.$containerEl$);
        const componentFn = componentQRL.getFn(invocationContext);
        return safeCall((() => componentFn(props)), (jsxNode => waitOn.length > 0 ? Promise.all(waitOn).then((() => 1 & elCtx.$flags$ ? executeComponent(rCtx, elCtx) : {
            node: jsxNode,
            rCtx: newCtx
        })) : 1 & elCtx.$flags$ ? executeComponent(rCtx, elCtx) : {
            node: jsxNode,
            rCtx: newCtx
        }), (err => err === SignalUnassignedException ? Promise.all(waitOn).then((() => executeComponent(rCtx, elCtx))) : (handleError(err, hostElement, rCtx), 
        {
            node: SkipRender,
            rCtx: newCtx
        })));
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
                $rmSlots$: []
            },
            $cmpCtx$: null,
            $slotCtx$: null
        };
        return seal(ctx), seal(ctx.$static$), ctx;
    };
    const pushRenderContext = ctx => ({
        $static$: ctx.$static$,
        $cmpCtx$: ctx.$cmpCtx$,
        $slotCtx$: ctx.$slotCtx$
    });
    const serializeClass = obj => obj ? isString(obj) ? obj.trim() : isArray(obj) ? obj.reduce(((result, o) => {
        const classList = serializeClass(o);
        return classList ? result ? `${result} ${classList}` : classList : result;
    }), "") : Object.entries(obj).reduce(((result, [key, value]) => value ? result ? `${result} ${key.trim()}` : key.trim() : result), "") : "";
    const parseClassListRegex = /\s/;
    const parseClassList = value => value ? value.split(parseClassListRegex) : EMPTY_ARRAY;
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
                        if (null != value) {
                            const normalizedKey = key.startsWith("--") ? key : fromCamelToKebabCase(key);
                            chunks.push(normalizedKey + ":" + value);
                        }
                    }
                }
                return chunks.join(";");
            }
        }
        return String(obj);
    };
    const getNextIndex = ctx => intToStr(ctx.$static$.$containerState$.$elementIndex$++);
    const setQId = (rCtx, elCtx) => {
        const id = getNextIndex(rCtx);
        elCtx.$id$ = id;
    };
    const jsxToString = data => null == data || "boolean" == typeof data ? "" : String(data);
    function isAriaAttribute(prop) {
        return prop.startsWith("aria-");
    }
    const renderComponent = (rCtx, elCtx, flags) => {
        const justMounted = !(4 & elCtx.$flags$);
        const hostElement = elCtx.$element$;
        const containerState = rCtx.$static$.$containerState$;
        return containerState.$hostsStaging$.delete(hostElement), containerState.$subsManager$.$clearSub$(hostElement), 
        then(executeComponent(rCtx, elCtx), (res => {
            const staticCtx = rCtx.$static$;
            const newCtx = res.rCtx;
            const invocationContext = newInvokeContext(rCtx.$static$.$locale$, hostElement);
            if (staticCtx.$hostElements$.add(hostElement), invocationContext.$subscriber$ = hostElement, 
            invocationContext.$renderCtx$ = newCtx, justMounted && elCtx.$appendStyles$) {
                for (const style of elCtx.$appendStyles$) {
                    appendHeadStyle(staticCtx, style);
                }
            }
            const processedJSXNode = processData$1(res.node, invocationContext);
            return then(processedJSXNode, (processedJSXNode => {
                const newVdom = wrapJSX(hostElement, processedJSXNode);
                const oldVdom = getVdom(elCtx);
                return then(visitJsxNode(newCtx, oldVdom, newVdom, flags), (() => {
                    elCtx.$vdom$ = newVdom;
                }));
            }));
        }));
    };
    const getVdom = elCtx => (elCtx.$vdom$ || (elCtx.$vdom$ = domToVnode(elCtx.$element$)), 
    elCtx.$vdom$);
    class ProcessedJSXNodeImpl {
        constructor($type$, $props$, $children$, $key$) {
            this.$type$ = $type$, this.$props$ = $props$, this.$children$ = $children$, this.$key$ = $key$, 
            this.$elm$ = null, this.$text$ = "", this.$signal$ = null, seal(this);
        }
    }
    const wrapJSX = (element, input) => {
        const children = void 0 === input ? EMPTY_ARRAY : isArray(input) ? input : [ input ];
        const node = new ProcessedJSXNodeImpl(":virtual", {}, children, null);
        return node.$elm$ = element, node;
    };
    const processData$1 = (node, invocationContext) => {
        if (null != node && "boolean" != typeof node) {
            if (isPrimitive(node)) {
                const newNode = new ProcessedJSXNodeImpl("#text", EMPTY_OBJ, EMPTY_ARRAY, null);
                return newNode.$text$ = String(node), newNode;
            }
            if (isJSXNode(node)) {
                return ((node, invocationContext) => {
                    const key = null != node.key ? String(node.key) : null;
                    const nodeType = node.type;
                    const props = node.props;
                    const originalChildren = props.children;
                    let textType = "";
                    if (isString(nodeType)) {
                        textType = nodeType;
                    } else {
                        if (nodeType !== Virtual) {
                            if (isFunction(nodeType)) {
                                const res = invoke(invocationContext, nodeType, props, node.key);
                                return processData$1(res, invocationContext);
                            }
                            throw qError(25, nodeType);
                        }
                        textType = ":virtual";
                    }
                    let children = EMPTY_ARRAY;
                    return null != originalChildren ? then(processData$1(originalChildren, invocationContext), (result => (void 0 !== result && (children = isArray(result) ? result : [ result ]), 
                    new ProcessedJSXNodeImpl(textType, props, children, key)))) : new ProcessedJSXNodeImpl(textType, props, children, key);
                })(node, invocationContext);
            }
            if (isSignal(node)) {
                const value = node.value;
                const newNode = new ProcessedJSXNodeImpl("#text", EMPTY_OBJ, EMPTY_ARRAY, null);
                return newNode.$text$ = jsxToString(value), newNode.$signal$ = node, newNode;
            }
            if (isArray(node)) {
                const output = promiseAll(node.flatMap((n => processData$1(n, invocationContext))));
                return then(output, (array => array.flat(100).filter(isNotNullable)));
            }
            return isPromise(node) ? node.then((node => processData$1(node, invocationContext))) : node === SkipRender ? new ProcessedJSXNodeImpl(":skipRender", EMPTY_OBJ, EMPTY_ARRAY, null) : void logWarn("A unsupported value was passed to the JSX, skipping render. Value:", node);
        }
    };
    const isPrimitive = obj => isString(obj) || "number" == typeof obj;
    const SVG_NS = "http://www.w3.org/2000/svg";
    const CHILDREN_PLACEHOLDER = [];
    const visitJsxNode = (ctx, oldVnode, newVnode, flags) => smartUpdateChildren(ctx, oldVnode, newVnode, "root", flags);
    const smartUpdateChildren = (ctx, oldVnode, newVnode, mode, flags) => {
        assertQwikElement(oldVnode.$elm$);
        const ch = newVnode.$children$;
        if (1 === ch.length && ":skipRender" === ch[0].$type$) {
            return;
        }
        const elm = oldVnode.$elm$;
        oldVnode.$children$ === CHILDREN_PLACEHOLDER && "HEAD" === elm.nodeName && (mode = "head", 
        flags |= 2);
        const oldCh = getVnodeChildren(oldVnode, mode);
        return oldCh.length > 0 && ch.length > 0 ? updateChildren(ctx, elm, oldCh, ch, flags) : ch.length > 0 ? addVnodes(ctx, elm, null, ch, 0, ch.length - 1, flags) : oldCh.length > 0 ? removeVnodes(ctx.$static$, oldCh, 0, oldCh.length - 1) : void 0;
    };
    const getVnodeChildren = (vnode, mode) => {
        const oldCh = vnode.$children$;
        const elm = vnode.$elm$;
        return oldCh === CHILDREN_PLACEHOLDER ? vnode.$children$ = getChildrenVnodes(elm, mode) : oldCh;
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
        for (;oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx; ) {
            if (null == oldStartVnode) {
                oldStartVnode = oldCh[++oldStartIdx];
            } else if (null == oldEndVnode) {
                oldEndVnode = oldCh[--oldEndIdx];
            } else if (null == newStartVnode) {
                newStartVnode = newCh[++newStartIdx];
            } else if (null == newEndVnode) {
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newStartVnode)) {
                results.push(patchVnode(ctx, oldStartVnode, newStartVnode, flags)), oldStartVnode = oldCh[++oldStartIdx], 
                newStartVnode = newCh[++newStartIdx];
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
                results.push(patchVnode(ctx, oldEndVnode, newEndVnode, flags)), oldEndVnode = oldCh[--oldEndIdx], 
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newEndVnode)) {
                assertDefined(oldStartVnode.$elm$, "oldStartVnode $elm$ must be defined"), assertDefined(oldEndVnode.$elm$, "oldEndVnode $elm$ must be defined"), 
                results.push(patchVnode(ctx, oldStartVnode, newEndVnode, flags)), insertBefore(staticCtx, parentElm, oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling), 
                oldStartVnode = oldCh[++oldStartIdx], newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldEndVnode, newStartVnode)) {
                assertDefined(oldStartVnode.$elm$, "oldStartVnode $elm$ must be defined"), assertDefined(oldEndVnode.$elm$, "oldEndVnode $elm$ must be defined"), 
                results.push(patchVnode(ctx, oldEndVnode, newStartVnode, flags)), insertBefore(staticCtx, parentElm, oldEndVnode.$elm$, oldStartVnode.$elm$), 
                oldEndVnode = oldCh[--oldEndIdx], newStartVnode = newCh[++newStartIdx];
            } else {
                if (void 0 === oldKeyToIdx && (oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)), 
                idxInOld = oldKeyToIdx[newStartVnode.$key$], void 0 === idxInOld) {
                    const newElm = createElm(ctx, newStartVnode, flags, results);
                    insertBefore(staticCtx, parentElm, newElm, oldStartVnode?.$elm$);
                } else if (elmToMove = oldCh[idxInOld], isTagName(elmToMove, newStartVnode.$type$)) {
                    results.push(patchVnode(ctx, elmToMove, newStartVnode, flags)), oldCh[idxInOld] = void 0, 
                    assertDefined(elmToMove.$elm$, "elmToMove $elm$ must be defined"), insertBefore(staticCtx, parentElm, elmToMove.$elm$, oldStartVnode.$elm$);
                } else {
                    const newElm = createElm(ctx, newStartVnode, flags, results);
                    then(newElm, (newElm => {
                        insertBefore(staticCtx, parentElm, newElm, oldStartVnode?.$elm$);
                    }));
                }
                newStartVnode = newCh[++newStartIdx];
            }
        }
        if (newStartIdx <= newEndIdx) {
            const before = null == newCh[newEndIdx + 1] ? null : newCh[newEndIdx + 1].$elm$;
            results.push(addVnodes(ctx, parentElm, before, newCh, newStartIdx, newEndIdx, flags));
        }
        let wait = promiseAll(results);
        return oldStartIdx <= oldEndIdx && (wait = then(wait, (() => {
            removeVnodes(staticCtx, oldCh, oldStartIdx, oldEndIdx);
        }))), wait;
    };
    const getCh = (elm, filter) => {
        const end = isVirtualElement(elm) ? elm.close : null;
        const nodes = [];
        let node = elm.firstChild;
        for (;(node = processVirtualNodes(node)) && (filter(node) && nodes.push(node), node = node.nextSibling, 
        node !== end); ) {}
        return nodes;
    };
    const getChildren = (elm, mode) => {
        switch (mode) {
          case "root":
            return getCh(elm, isChildComponent);

          case "head":
            return getCh(elm, isHeadChildren);

          case "elements":
            return getCh(elm, isQwikElement);
        }
    };
    const getChildrenVnodes = (elm, mode) => getChildren(elm, mode).map(getVnodeFromEl);
    const getVnodeFromEl = el => isElement$1(el) ? tryGetContext(el)?.$vdom$ ?? domToVnode(el) : domToVnode(el);
    const domToVnode = node => {
        if (isQwikElement(node)) {
            const props = isVirtualElement(node) ? EMPTY_OBJ : getProps(node);
            const t = new ProcessedJSXNodeImpl(node.localName, props, CHILDREN_PLACEHOLDER, getKey(node));
            return t.$elm$ = node, t;
        }
        if (isText(node)) {
            const t = new ProcessedJSXNodeImpl(node.nodeName, {}, CHILDREN_PLACEHOLDER, null);
            return t.$text$ = node.data, t.$elm$ = node, t;
        }
        throw new Error("invalid node");
    };
    const getProps = node => {
        const props = {};
        const attributes = node.attributes;
        const len = attributes.length;
        for (let i = 0; i < len; i++) {
            const attr = attributes.item(i);
            assertDefined(attr, "attribute must be defined");
            const name = attr.name;
            name.includes(":") || qDev && "data-qwik-inspector" === name || (props[name] = "class" === name ? parseDomClass(attr.value) : attr.value);
        }
        return props;
    };
    const parseDomClass = value => parseClassList(value).filter((c => !c.startsWith(ComponentStylesPrefixContent))).join(" ");
    const isHeadChildren = node => {
        const type = node.nodeType;
        return 1 === type ? node.hasAttribute("q:head") : 111 === type;
    };
    const isSlotTemplate = node => "Q:TEMPLATE" === node.nodeName;
    const isChildComponent = node => {
        const type = node.nodeType;
        if (3 === type || 111 === type) {
            return true;
        }
        if (1 !== type) {
            return false;
        }
        const nodeName = node.nodeName;
        return "Q:TEMPLATE" !== nodeName && ("HEAD" !== nodeName || node.hasAttribute("q:head"));
    };
    const patchVnode = (rCtx, oldVnode, newVnode, flags) => {
        assertEqual(oldVnode.$type$, newVnode.$type$, "old and new vnodes type must be the same");
        const elm = oldVnode.$elm$;
        const tag = newVnode.$type$;
        const staticCtx = rCtx.$static$;
        const isVirtual = ":virtual" === tag;
        const currentComponent = rCtx.$cmpCtx$;
        if (assertDefined(elm, "while patching element must be defined"), assertDefined(currentComponent, "while patching current component must be defined"), 
        newVnode.$elm$ = elm, "#text" === tag) {
            const signal = newVnode.$signal$;
            return signal && addSignalSub(2, currentComponent.$element$, signal, elm, "data"), 
            void (oldVnode.$text$ !== newVnode.$text$ && setProperty(staticCtx, elm, "data", newVnode.$text$));
        }
        assertQwikElement(elm);
        let isSvg = !!(1 & flags);
        isSvg || "svg" !== tag || (flags |= 1, isSvg = true);
        const props = newVnode.$props$;
        const isComponent = isVirtual && OnRenderProp in props;
        const elCtx = getContext(elm, rCtx.$static$.$containerState$);
        if (assertDefined(currentComponent, "slots can not be rendered outside a component", elm), 
        !isComponent) {
            const pendingListeners = currentComponent.li;
            const listeners = elCtx.li;
            if (listeners.length = 0, newVnode.$props$ = updateProperties(staticCtx, elCtx, currentComponent.$element$, oldVnode.$props$, props, isSvg), 
            pendingListeners.length > 0 && (listeners.push(...pendingListeners), pendingListeners.length = 0), 
            isSvg && "foreignObject" === tag && (flags &= -2, isSvg = false), isVirtual && "q:s" in props) {
                return assertDefined(currentComponent.$slots$, "current component slots must be a defined array"), 
                void currentComponent.$slots$.push(newVnode);
            }
            if (void 0 !== props[dangerouslySetInnerHTML]) {
                return void (qDev && newVnode.$children$.length > 0 && logWarn("Node can not have children when innerHTML is set"));
            }
            if (isVirtual && "qonce" in props) {
                return;
            }
            if ("textarea" === tag) {
                return;
            }
            return smartUpdateChildren(rCtx, oldVnode, newVnode, "root", flags);
        }
        const cmpProps = props.props;
        let needsRender = setComponentProps$1(elCtx, rCtx, cmpProps);
        return needsRender || elCtx.$componentQrl$ || elCtx.$element$.hasAttribute("q:id") || (setQId(rCtx, elCtx), 
        elCtx.$componentQrl$ = cmpProps[OnRenderProp], assertQrl(elCtx.$componentQrl$), 
        needsRender = true), needsRender ? then(renderComponent(rCtx, elCtx, flags), (() => renderContentProjection(rCtx, elCtx, newVnode, flags))) : renderContentProjection(rCtx, elCtx, newVnode, flags);
    };
    const renderContentProjection = (rCtx, hostCtx, vnode, flags) => {
        const newChildren = vnode.$children$;
        const staticCtx = rCtx.$static$;
        const splittedNewChidren = (input => {
            const output = {};
            for (const item of input) {
                const key = getSlotName(item);
                (output[key] ?? (output[key] = new ProcessedJSXNodeImpl(":virtual", {
                    "q:s": ""
                }, [], key))).$children$.push(item);
            }
            return output;
        })(newChildren);
        const slotMaps = getSlotMap(hostCtx);
        for (const key of Object.keys(slotMaps.slots)) {
            if (!splittedNewChidren[key]) {
                const slotEl = slotMaps.slots[key];
                const oldCh = getChildrenVnodes(slotEl, "root");
                if (oldCh.length > 0) {
                    const slotCtx = tryGetContext(slotEl);
                    slotCtx && slotCtx.$vdom$ && (slotCtx.$vdom$.$children$ = []), removeVnodes(staticCtx, oldCh, 0, oldCh.length - 1);
                }
            }
        }
        for (const key of Object.keys(slotMaps.templates)) {
            const templateEl = slotMaps.templates[key];
            templateEl && !splittedNewChidren[key] && (slotMaps.templates[key] = void 0, removeNode(staticCtx, templateEl));
        }
        return promiseAll(Object.keys(splittedNewChidren).map((slotName => {
            const newVdom = splittedNewChidren[slotName];
            const slotCtx = getSlotCtx(staticCtx, slotMaps, hostCtx, slotName, rCtx.$static$.$containerState$);
            const oldVdom = getVdom(slotCtx);
            const slotRctx = pushRenderContext(rCtx);
            slotRctx.$slotCtx$ = slotCtx, slotCtx.$vdom$ = newVdom, newVdom.$elm$ = slotCtx.$element$;
            const index = staticCtx.$addSlots$.findIndex((slot => slot[0] === slotCtx.$element$));
            return index >= 0 && staticCtx.$addSlots$.splice(index, 1), smartUpdateChildren(slotRctx, oldVdom, newVdom, "root", flags);
        })));
    };
    const addVnodes = (ctx, parentElm, before, vnodes, startIdx, endIdx, flags) => {
        const promises = [];
        for (;startIdx <= endIdx; ++startIdx) {
            const ch = vnodes[startIdx];
            assertDefined(ch, "render: node must be defined at index", startIdx, vnodes);
            const elm = createElm(ctx, ch, flags, promises);
            insertBefore(ctx.$static$, parentElm, elm, before);
        }
        return promiseAllLazy(promises);
    };
    const removeVnodes = (staticCtx, nodes, startIdx, endIdx) => {
        for (;startIdx <= endIdx; ++startIdx) {
            const ch = nodes[startIdx];
            ch && (assertDefined(ch.$elm$, "vnode elm must be defined"), removeNode(staticCtx, ch.$elm$));
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
        const elCtx = createContext$1(template);
        return elCtx.$parent$ = hostCtx, ((staticCtx, parent, newChild) => {
            staticCtx.$operations$.push({
                $operation$: directPrepend,
                $args$: [ parent, newChild ]
            });
        })(staticCtx, hostCtx.$element$, template), slotMaps.templates[slotName] = template, 
        elCtx;
    };
    const getSlotName = node => node.$props$[QSlot] ?? "";
    const createElm = (rCtx, vnode, flags, promises) => {
        const tag = vnode.$type$;
        const doc = rCtx.$static$.$doc$;
        const currentComponent = rCtx.$cmpCtx$;
        if ("#text" === tag) {
            const signal = vnode.$signal$;
            const elm = ((doc, text) => doc.createTextNode(text))(doc, vnode.$text$);
            return signal && currentComponent && addSignalSub(2, currentComponent.$element$, signal, elm, "data"), 
            vnode.$elm$ = elm;
        }
        let elm;
        let isHead = !!(2 & flags);
        let isSvg = !!(1 & flags);
        isSvg || "svg" !== tag || (flags |= 1, isSvg = true);
        const isVirtual = ":virtual" === tag;
        const props = vnode.$props$;
        const isComponent = OnRenderProp in props;
        const staticCtx = rCtx.$static$;
        if (isVirtual ? elm = (doc => {
            const open = doc.createComment("qv ");
            const close = doc.createComment("/qv");
            return new VirtualElementImpl(open, close);
        })(doc) : "head" === tag ? (elm = doc.head, flags |= 2, isHead = true) : (elm = createElement(doc, tag, isSvg), 
        flags &= -3), qDev && false) {
            const dev = vnode.$dev$;
            dev && directSetAttribute(elm, "data-qwik-inspector", `${encodeURIComponent(dev.fileName)}:${dev.lineNumber}:${dev.columnNumber}`);
        }
        vnode.$elm$ = elm, isSvg && "foreignObject" === tag && (isSvg = false, flags &= -2);
        const elCtx = createContext$1(elm);
        if (elCtx.$parent$ = rCtx.$cmpCtx$, elCtx.$slotParent$ = rCtx.$slotCtx$, isComponent) {
            setKey(elm, vnode.$key$), assertTrue(isVirtual, "component must be a virtual element");
            const renderQRL = props[OnRenderProp];
            if (assertQrl(renderQRL), setComponentProps$1(elCtx, rCtx, props.props), setQId(rCtx, elCtx), 
            qDev && !qTest) {
                const symbol = renderQRL.$symbol$;
                symbol && directSetAttribute(elm, "data-qrl", symbol);
            }
            elCtx.$componentQrl$ = renderQRL;
            const wait = then(renderComponent(rCtx, elCtx, flags), (() => {
                let children = vnode.$children$;
                if (0 === children.length) {
                    return;
                }
                1 === children.length && ":skipRender" === children[0].$type$ && (children = children[0].$children$);
                const slotMap = getSlotMap(elCtx);
                const p = [];
                for (const node of children) {
                    const slotCtx = getSlotCtx(staticCtx, slotMap, elCtx, getSlotName(node), staticCtx.$containerState$);
                    const slotRctx = pushRenderContext(rCtx);
                    slotRctx.$slotCtx$ = slotCtx;
                    const nodeElm = createElm(slotRctx, node, flags, p);
                    assertDefined(node.$elm$, "vnode elm must be defined"), assertEqual(nodeElm, node.$elm$, "vnode elm must be defined"), 
                    appendChild(staticCtx, slotCtx.$element$, nodeElm);
                }
                return promiseAllLazy(p);
            }));
            return isPromise(wait) && promises.push(wait), elm;
        }
        const isSlot = isVirtual && "q:s" in props;
        const hasRef = !isVirtual && "ref" in props;
        const listeners = elCtx.li;
        if (vnode.$props$ = setProperties(staticCtx, elCtx, currentComponent?.$element$, props, isSvg), 
        currentComponent && !isVirtual) {
            const scopedIds = currentComponent.$scopeIds$;
            scopedIds && scopedIds.forEach((styleId => {
                elm.classList.add(styleId);
            })), 2 & currentComponent.$flags$ && (listeners.push(...currentComponent.li), currentComponent.$flags$ &= -3);
        }
        if (isSlot && (assertDefined(currentComponent, "slot can only be used inside component"), 
        assertDefined(currentComponent.$slots$, "current component slots must be a defined array"), 
        setKey(elm, vnode.$key$), directSetAttribute(elm, "q:sref", currentComponent.$id$), 
        currentComponent.$slots$.push(vnode), staticCtx.$addSlots$.push([ elm, currentComponent.$element$ ])), 
        setKey(elm, vnode.$key$), isHead && !isVirtual && directSetAttribute(elm, "q:head", ""), 
        (listeners.length > 0 || hasRef) && setQId(rCtx, elCtx), void 0 !== props[dangerouslySetInnerHTML]) {
            return qDev && vnode.$children$.length > 0 && logWarn("Node can not have children when innerHTML is set"), 
            elm;
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
        const slotsArray = (elCtx => elCtx.$slots$ || (assertDefined(elCtx.$element$.parentElement, "component should be already attached to the dom"), 
        elCtx.$slots$ = readDOMSlots(elCtx)))(elCtx);
        const slots = {};
        const templates = {};
        const t = Array.from(elCtx.$element$.childNodes).filter(isSlotTemplate);
        for (const vnode of slotsArray) {
            assertQwikElement(vnode.$elm$), slots[vnode.$key$ ?? ""] = vnode.$elm$;
        }
        for (const elm of t) {
            templates[directGetAttribute(elm, QSlot) ?? ""] = elm;
        }
        return {
            slots: slots,
            templates: templates
        };
    };
    const readDOMSlots = elCtx => {
        const parent = elCtx.$element$.parentElement;
        return assertDefined(parent, "component should be already attached to the dom"), 
        ((el, prop, value) => {
            const walker = ((el, prop, value) => el.ownerDocument.createTreeWalker(el, 128, {
                acceptNode(c) {
                    const virtual = getVirtualElement(c);
                    return virtual && directGetAttribute(virtual, prop) === value ? 1 : 2;
                }
            }))(el, "q:sref", value);
            const pars = [];
            let currentNode = null;
            for (;currentNode = walker.nextNode(); ) {
                pars.push(getVirtualElement(currentNode));
            }
            return pars;
        })(parent, 0, elCtx.$id$).map(domToVnode);
    };
    const checkBeforeAssign = (ctx, elm, prop, newValue) => (prop in elm && elm[prop] !== newValue && setProperty(ctx, elm, prop, newValue), 
    true);
    const forceAttribute = (ctx, elm, prop, newValue) => (setAttribute(ctx, elm, prop.toLowerCase(), newValue), 
    true);
    const dangerouslySetInnerHTML = "dangerouslySetInnerHTML";
    const PROP_HANDLER_MAP = {
        style: (ctx, elm, _, newValue) => (setProperty(ctx, elm.style, "cssText", stringifyStyle(newValue)), 
        true),
        class: (ctx, elm, _, newValue, oldValue) => {
            assertTrue(null == oldValue || "string" == typeof oldValue, "class oldValue must be either nullish or string", oldValue), 
            assertTrue(null == newValue || "string" == typeof newValue, "class newValue must be either nullish or string", newValue);
            const oldClasses = parseClassList(oldValue);
            const newClasses = parseClassList(newValue);
            return ((staticCtx, elm, toRemove, toAdd) => {
                staticCtx ? staticCtx.$operations$.push({
                    $operation$: _setClasslist,
                    $args$: [ elm, toRemove, toAdd ]
                }) : _setClasslist(elm, toRemove, toAdd);
            })(ctx, elm, oldClasses.filter((c => c && !newClasses.includes(c))), newClasses.filter((c => c && !oldClasses.includes(c)))), 
            true;
        },
        value: checkBeforeAssign,
        checked: checkBeforeAssign,
        href: forceAttribute,
        list: forceAttribute,
        form: forceAttribute,
        tabIndex: forceAttribute,
        download: forceAttribute,
        [dangerouslySetInnerHTML]: (ctx, elm, _, newValue) => (dangerouslySetInnerHTML in elm ? setProperty(ctx, elm, dangerouslySetInnerHTML, newValue) : "innerHTML" in elm && setProperty(ctx, elm, "innerHTML", newValue), 
        true),
        innerHTML: () => true
    };
    const updateProperties = (staticCtx, elCtx, hostElm, oldProps, newProps, isSvg) => {
        const keys = getKeys(oldProps, newProps);
        const values = {};
        if (0 === keys.length) {
            return values;
        }
        const immutableMeta = newProps[_IMMUTABLE] ?? EMPTY_OBJ;
        const elm = elCtx.$element$;
        for (const prop of keys) {
            if ("ref" === prop) {
                assertElement(elm), setRef(newProps[prop], elm);
                continue;
            }
            let newValue = isSignal(immutableMeta[prop]) ? immutableMeta[prop] : newProps[prop];
            if (isOnProp(prop)) {
                browserSetEvent(staticCtx, elCtx, prop, newValue);
                continue;
            }
            isSignal(newValue) && (addSignalSub(1, hostElm, newValue, elm, prop), newValue = newValue.value), 
            "class" === prop && (newValue = serializeClass(newValue));
            const normalizedProp = isSvg ? prop : prop.toLowerCase();
            const oldValue = oldProps[normalizedProp];
            values[normalizedProp] = newValue, oldValue !== newValue && smartSetProperty(staticCtx, elm, prop, newValue, oldValue, isSvg);
        }
        return values;
    };
    const smartSetProperty = (staticCtx, elm, prop, newValue, oldValue, isSvg) => {
        if (isAriaAttribute(prop)) {
            return void setAttribute(staticCtx, elm, prop, null != newValue ? String(newValue) : newValue);
        }
        const exception = PROP_HANDLER_MAP[prop];
        exception && exception(staticCtx, elm, prop, newValue, oldValue) || (isSvg || !(prop in elm) ? (prop.startsWith("preventdefault:") && addQwikEvent(prop.slice("preventdefault:".length), staticCtx.$containerState$), 
        setAttribute(staticCtx, elm, prop, newValue)) : setProperty(staticCtx, elm, prop, newValue));
    };
    const getKeys = (oldProps, newProps) => {
        const keys = Object.keys(newProps);
        const normalizedKeys = keys.map((s => s.toLowerCase()));
        const oldKeys = Object.keys(oldProps);
        return keys.push(...oldKeys.filter((p => !normalizedKeys.includes(p)))), keys.filter((c => "children" !== c));
    };
    const setProperties = (staticCtx, elCtx, hostElm, newProps, isSvg) => {
        const elm = elCtx.$element$;
        const keys = Object.keys(newProps);
        const values = {};
        if (0 === keys.length) {
            return values;
        }
        const immutableMeta = newProps[_IMMUTABLE] ?? EMPTY_OBJ;
        for (const prop of keys) {
            if ("children" === prop) {
                continue;
            }
            if ("ref" === prop) {
                assertElement(elm), setRef(newProps[prop], elm);
                continue;
            }
            let newValue = isSignal(immutableMeta[prop]) ? immutableMeta[prop] : newProps[prop];
            if (isOnProp(prop)) {
                browserSetEvent(staticCtx, elCtx, prop, newValue);
                continue;
            }
            const sig = isSignal(newValue);
            sig && (hostElm && addSignalSub(1, hostElm, newValue, elm, prop), newValue = newValue.value);
            const normalizedProp = isSvg ? prop : prop.toLowerCase();
            if ("class" === normalizedProp) {
                if (qDev && values.class) {
                    throw new TypeError("Can only provide one of class or className");
                }
                sig || (newValue = serializeClass(newValue));
            }
            values[normalizedProp] = newValue, smartSetProperty(staticCtx, elm, prop, newValue, void 0, isSvg);
        }
        return values;
    };
    const setComponentProps$1 = (elCtx, rCtx, expectProps) => {
        const keys = Object.keys(expectProps);
        let props = elCtx.$props$;
        if (props || (elCtx.$props$ = props = createProxy(createPropsState(), rCtx.$static$.$containerState$)), 
        0 === keys.length) {
            return false;
        }
        const manager = getProxyManager(props);
        assertDefined(manager, "props have to be a proxy, but it is not", props);
        const target = getProxyTarget(props);
        assertDefined(target, "props have to be a proxy, but it is not", props);
        const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
        for (const prop of keys) {
            if ("children" !== prop && prop !== QSlot) {
                if (isSignal(immutableMeta[prop])) {
                    target["$$" + prop] = immutableMeta[prop];
                } else {
                    const value = expectProps[prop];
                    const oldValue = target[prop];
                    target[prop] = value, oldValue !== value && manager.$notifySubs$(prop);
                }
            }
        }
        return !!(1 & elCtx.$flags$);
    };
    const cleanupTree = (parent, staticCtx, subsManager, stopSlots) => {
        if (stopSlots && parent.hasAttribute("q:s")) {
            return void staticCtx.$rmSlots$.push(parent);
        }
        const ctx = tryGetContext(parent);
        ctx && ((elCtx, subsManager) => {
            const el = elCtx.$element$;
            elCtx.$watches$?.forEach((watch => {
                subsManager.$clearSub$(watch), destroyWatch(watch);
            })), elCtx.$componentQrl$ && subsManager.$clearSub$(el), elCtx.$componentQrl$ = null, 
            elCtx.$seq$ = null, elCtx.$watches$ = null, elCtx.$flags$ = 0, el._qc_ = void 0;
        })(ctx, subsManager);
        const ch = getChildren(parent, "elements");
        for (const child of ch) {
            cleanupTree(child, staticCtx, subsManager, true);
        }
    };
    const directAppendChild = (parent, child) => {
        isVirtualElement(child) ? child.appendTo(parent) : parent.appendChild(child);
    };
    const directRemoveChild = (parent, child) => {
        isVirtualElement(child) ? child.remove() : parent.removeChild(child);
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
    const browserSetEvent = (staticCtx, elCtx, prop, input) => {
        const containerState = staticCtx.$containerState$;
        const normalized = setEvent(elCtx.li, prop, input, containerState.$containerEl$);
        prop.startsWith("on") || setAttribute(staticCtx, elCtx.$element$, normalized, ""), 
        addQwikEvent(normalized, containerState);
    };
    const sameVnode = (vnode1, vnode2) => vnode1.$type$ === vnode2.$type$ && vnode1.$key$ === vnode2.$key$;
    const isTagName = (elm, tagName) => elm.$type$ === tagName;
    const hashCode = (text, hash = 0) => {
        if (0 === text.length) {
            return hash;
        }
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
    const _pauseFromContexts = async (allContexts, containerState, fallbackGetObjId) => {
        const collector = createCollector(containerState);
        let hasListeners = false;
        for (const ctx of allContexts) {
            if (ctx.$watches$) {
                for (const watch of ctx.$watches$) {
                    qDev && (watch.$flags$ & WatchFlagsIsDirty && logWarn("Serializing dirty watch. Looks like an internal error."), 
                    isConnected(watch) || logWarn("Serializing disconneted watch. Looks like an internal error.")), 
                    isResourceTask(watch) && collector.$resources$.push(watch.$state$), destroyWatch(watch);
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
                            collectValue(obj, collector, true);
                        }
                    }
                    collector.$qrls$.push(qrl), hasListeners = true;
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
                obj = promiseValue.value, promiseValue.resolved ? suffix += "~" : suffix += "_";
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
            return id ? id + suffix : fallbackGetObjId ? fallbackGetObjId(obj) : null;
        };
        const mustGetObjId = obj => {
            const key = getObjId(obj);
            if (null === key) {
                throw qError(27, obj);
            }
            return key;
        };
        const subsMap = new Map;
        objs.forEach((obj => {
            const subs = getManager(obj, containerState)?.$subs$;
            if (!subs) {
                return null;
            }
            const flags = getProxyFlags(obj) ?? 0;
            const convered = [];
            flags > 0 && convered.push(flags);
            for (const sub of subs) {
                const host = sub[1];
                0 === sub[0] && isNode$1(host) && isVirtualElement(host) && !collector.$elements$.includes(tryGetContext(host)) || convered.push(sub);
            }
            convered.length > 0 && subsMap.set(obj, convered);
        })), objs.sort(((a, b) => (subsMap.has(a) ? 0 : 1) - (subsMap.has(b) ? 0 : 1)));
        let count = 0;
        for (const obj of objs) {
            objToId.set(obj, intToStr(count)), count++;
        }
        if (collector.$noSerialize$.length > 0) {
            const undefinedID = objToId.get(void 0);
            assertDefined(undefinedID, "undefined ID must be defined");
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
        assertEqual(subs.length, subsMap.size, "missing subscriptions to serialize", subs, subsMap);
        const convertedObjs = objs.map((obj => {
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
              case "boolean":
                return obj;
            }
            const value = serializeValue(obj, mustGetObjId, containerState);
            if (void 0 !== value) {
                return value;
            }
            if ("object" === typeObj) {
                if (isArray(obj)) {
                    return obj.map(mustGetObjId);
                }
                if (isSerializableObject(obj)) {
                    const output = {};
                    for (const key of Object.keys(obj)) {
                        const id = getObjId(obj[key]);
                        null !== id && (output[key] = id);
                    }
                    return output;
                }
            }
            throw qError(3, obj);
        }));
        const meta = {};
        const refs = {};
        return allContexts.forEach((ctx => {
            const node = ctx.$element$;
            const elementID = ctx.$id$;
            const ref = ctx.$refMap$;
            const props = ctx.$props$;
            const contexts = ctx.$contexts$;
            const watches = ctx.$watches$;
            const renderQrl = ctx.$componentQrl$;
            const seq = ctx.$seq$;
            const metaValue = {};
            const elementCaptured = isVirtualElement(node) && collector.$elements$.includes(ctx);
            if (assertDefined(elementID, "pause: can not generate ID for dom node", node), ref.length > 0) {
                assertElement(node);
                const value = ref.map(mustGetObjId).join(" ");
                value && (refs[elementID] = value);
            } else if (canRender) {
                let add = false;
                if (elementCaptured) {
                    assertDefined(renderQrl, "renderQrl must be defined");
                    const propsId = getObjId(props);
                    metaValue.h = mustGetObjId(renderQrl) + (propsId ? " " + propsId : ""), add = true;
                } else {
                    const propsId = getObjId(props);
                    propsId && (metaValue.h = " " + propsId, add = true);
                }
                if (watches && watches.length > 0) {
                    const value = watches.map(getObjId).filter(isNotNullable).join(" ");
                    value && (metaValue.w = value, add = true);
                }
                if (elementCaptured && seq && seq.length > 0) {
                    const value = seq.map(mustGetObjId).join(" ");
                    metaValue.s = value, add = true;
                }
                if (contexts) {
                    const serializedContexts = [];
                    contexts.forEach(((value, key) => {
                        const id = getObjId(value);
                        id && serializedContexts.push(`${key}=${id}`);
                    }));
                    const value = serializedContexts.join(" ");
                    value && (metaValue.c = value, add = true);
                }
                add && (meta[elementID] = metaValue);
            }
        })), qDev && elementToIndex.forEach(((value, el) => {
            value || logWarn("unconnected element", el.nodeName, "\n");
        })), {
            state: {
                refs: refs,
                ctx: meta,
                objs: convertedObjs,
                subs: subs
            },
            objs: objs,
            resources: collector.$resources$,
            qrls: collector.$qrls$,
            mode: canRender ? "render" : "listeners"
        };
    };
    const collectProps = (elCtx, collector) => {
        const parentCtx = elCtx.$parent$;
        const props = elCtx.$props$;
        if (parentCtx && props && !isEmptyObj(props) && collector.$elements$.includes(parentCtx)) {
            const subs = getProxyManager(props)?.$subs$;
            const el = elCtx.$element$;
            if (subs) {
                for (const sub of subs) {
                    if (sub[1] === el) {
                        if (0 === sub[0]) {
                            return void collectElement(el, collector);
                        }
                        collectValue(props, collector, false);
                    }
                }
            }
        }
    };
    const createCollector = containerState => ({
        $containerState$: containerState,
        $seen$: new Set,
        $objSet$: new Set,
        $prefetch$: 0,
        $noSerialize$: [],
        $resources$: [],
        $elements$: [],
        $qrls$: [],
        $deferElements$: [],
        $promises$: []
    });
    const collectDeferElement = (el, collector) => {
        const ctx = tryGetContext(el);
        collector.$elements$.includes(ctx) || (collector.$elements$.push(ctx), collector.$prefetch$++, 
        8 & ctx.$flags$ ? collectElementData(ctx, collector, true) : collector.$deferElements$.push(ctx), 
        collector.$prefetch$--);
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
        if (elCtx.$props$ && !isEmptyObj(elCtx.$props$) && collectValue(elCtx.$props$, collector, dynamicCtx), 
        elCtx.$componentQrl$ && collectValue(elCtx.$componentQrl$, collector, dynamicCtx), 
        elCtx.$seq$) {
            for (const obj of elCtx.$seq$) {
                collectValue(obj, collector, dynamicCtx);
            }
        }
        if (elCtx.$watches$) {
            const map = collector.$containerState$.$subsManager$.$groupToManagers$;
            for (const obj of elCtx.$watches$) {
                map.has(obj) && collectValue(obj, collector, dynamicCtx);
            }
        }
        if (dynamicCtx && (collectContext(elCtx, collector), elCtx.$dynamicSlots$)) {
            for (const slotCtx of elCtx.$dynamicSlots$) {
                collectContext(slotCtx, collector);
            }
        }
    };
    const collectContext = (elCtx, collector) => {
        for (;elCtx; ) {
            if (elCtx.$contexts$) {
                for (const obj of elCtx.$contexts$.values()) {
                    collectValue(obj, collector, true);
                }
                if (true === elCtx.$contexts$.get("_")) {
                    break;
                }
            }
            elCtx = elCtx.$slotParent$ ?? elCtx.$parent$;
        }
    };
    const collectSubscriptions = (manager, collector) => {
        if (collector.$seen$.has(manager)) {
            return;
        }
        collector.$seen$.add(manager);
        const subs = manager.$subs$;
        assertDefined(subs, "subs must be defined");
        for (const key of subs) {
            const host = key[1];
            isNode$1(host) && isVirtualElement(host) ? 0 === key[0] && collectDeferElement(host, collector) : collectValue(host, collector, true);
        }
    };
    const PROMISE_VALUE = Symbol();
    const getPromiseValue = promise => promise[PROMISE_VALUE];
    const collectValue = (obj, collector, leaks) => {
        if (null !== obj) {
            const objType = typeof obj;
            switch (objType) {
              case "function":
              case "object":
                {
                    const seen = collector.$seen$;
                    if (seen.has(obj)) {
                        return;
                    }
                    if (seen.add(obj), fastSkipSerialize(obj)) {
                        return collector.$objSet$.add(void 0), void collector.$noSerialize$.push(obj);
                    }
                    const input = obj;
                    const target = getProxyTarget(obj);
                    if (target) {
                        if (obj = target, seen.has(obj)) {
                            return;
                        }
                        if (seen.add(obj), true === leaks && collectSubscriptions(getProxyManager(input), collector), 
                        fastWeakSerialize(input)) {
                            return void collector.$objSet$.add(obj);
                        }
                    }
                    if (collectDeps(obj, collector, leaks)) {
                        return void collector.$objSet$.add(obj);
                    }
                    if (isPromise(obj)) {
                        return void collector.$promises$.push((promise = obj, promise.then((value => {
                            const v = {
                                resolved: true,
                                value: value
                            };
                            return promise[PROMISE_VALUE] = v, value;
                        }), (value => {
                            const v = {
                                resolved: false,
                                value: value
                            };
                            return promise[PROMISE_VALUE] = v, value;
                        }))).then((value => {
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
                            for (const key of Object.keys(obj)) {
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
            return getProxyManager(obj);
        }
        const proxy = containerState.$proxyMap$.get(obj);
        return proxy ? getProxyManager(proxy) : void 0;
    };
    const getQId = el => {
        const ctx = tryGetContext(el);
        return ctx ? ctx.$id$ : null;
    };
    const isEmptyObj = obj => 0 === Object.keys(obj).length;
    const resumeIfNeeded = containerEl => {
        "paused" === directGetAttribute(containerEl, "q:container") && (resumeContainer(containerEl), 
        appendQwikDevTools(containerEl));
    };
    const resumeContainer = containerEl => {
        if (!(isElement$1(el = containerEl) && el.hasAttribute("q:container"))) {
            return void logWarn("Skipping hydration because parent element is not q:container");
        }
        var el;
        const pauseState = containerEl._qwikjson_ ?? (containerEl => {
            const doc = getDocument(containerEl);
            const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;
            const script = getQwikJSON(parentJSON);
            if (script) {
                const data = script.firstChild.data;
                return JSON.parse(unescapeText(data) || "{}");
            }
        })(containerEl);
        if (containerEl._qwikjson_ = null, !pauseState) {
            return void logWarn("Skipping hydration qwik/json metadata was not found.");
        }
        const doc = getDocument(containerEl);
        const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;
        if (!getQwikJSON(parentJSON)) {
            return void logWarn("Skipping hydration qwik/json metadata was not found.");
        }
        const containerState = _getContainerState(containerEl);
        moveStyles(containerEl, containerState);
        const elements = new Map;
        let node = null;
        let container = 0;
        const elementWalker = doc.createTreeWalker(containerEl, 128);
        for (;node = elementWalker.nextNode(); ) {
            const data = node.data;
            if (0 === container) {
                if (data.startsWith("qv ")) {
                    const id = getID(data);
                    id >= 0 && elements.set(id, node);
                } else if (data.startsWith("t=")) {
                    const id = data.slice(2);
                    const index = strToInt(id);
                    elements.set(index, getTextNode(node));
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
            assertDefined(id, "resume: element missed q:id", el);
            const index = strToInt(id);
            elements.set(index, el);
        }));
        const parser = createParser(containerState, doc);
        const finalized = new Map;
        const revived = new Set;
        const getObject = id => (assertTrue("string" == typeof id && id.length > 0, "resume: id must be an non-empty string, got:", id), 
        finalized.has(id) ? finalized.get(id) : computeObject(id));
        const computeObject = id => {
            if (id.startsWith("#")) {
                const elementId = id.slice("#".length);
                const index = strToInt(elementId);
                assertTrue(elements.has(index), "missing element for id:", elementId);
                const rawElement = elements.get(index);
                if (assertDefined(rawElement, "missing element for id:", elementId), isComment(rawElement)) {
                    if (!rawElement.isConnected) {
                        return void finalized.set(id, void 0);
                    }
                    const close = findClose(rawElement);
                    const virtual = new VirtualElementImpl(rawElement, close);
                    return finalized.set(id, virtual), getContext(virtual, containerState), virtual;
                }
                return isElement$1(rawElement) ? (finalized.set(id, rawElement), getContext(rawElement, containerState).$vdom$ = domToVnode(rawElement), 
                rawElement) : (finalized.set(id, rawElement), rawElement);
            }
            const index = strToInt(id);
            const objs = pauseState.objs;
            assertTrue(objs.length > index, "resume: index is out of bounds", id);
            const value = objs[index];
            let obj = value;
            for (let i = id.length - 1; i >= 0; i--) {
                const code = id[i];
                const transform = OBJECT_TRANSFORMS[code];
                if (!transform) {
                    break;
                }
                obj = transform(obj, containerState);
            }
            return finalized.set(id, obj), isPrimitive(value) || revived.has(index) || (revived.add(index), 
            reviveSubscriptions(value, index, pauseState.subs, getObject, containerState, parser), 
            reviveNestedObjects(value, getObject, parser)), obj;
        };
        containerState.$elementIndex$ = 1e5, containerState.$pauseCtx$ = {
            getObject: getObject,
            meta: pauseState.ctx,
            refs: pauseState.refs
        }, reviveValues(pauseState.objs, parser), directSetAttribute(containerEl, "q:container", "resumed"), 
        logDebug("Container resumed"), ((el, eventName, detail, bubbles) => {
            el && "function" == typeof CustomEvent && el.dispatchEvent(new CustomEvent("qresume", {
                detail: void 0,
                bubbles: true,
                composed: true
            }));
        })(containerEl);
    };
    const reviveValues = (objs, parser) => {
        for (let i = 0; i < objs.length; i++) {
            const value = objs[i];
            isString(value) && (objs[i] = value === UNDEFINED_PREFIX ? void 0 : parser.prepare(value));
        }
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
                proxy ? getProxyManager(proxy).$addSubs$(converted) : createProxy(value, containerState, converted);
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
                for (const key of Object.keys(obj)) {
                    obj[key] = getObject(obj[key]);
                }
            }
        }
    };
    const moveStyles = (containerEl, containerState) => {
        const head = containerEl.ownerDocument.head;
        containerEl.querySelectorAll("style[q\\:style]").forEach((el => {
            containerState.$styleIds$.add(directGetAttribute(el, "q:style")), head.appendChild(el);
        }));
    };
    const unescapeText = str => str.replace(/\\x3C(\/?script)/g, "<$1");
    const getQwikJSON = parentElm => {
        let child = parentElm.lastElementChild;
        for (;child; ) {
            if ("SCRIPT" === child.tagName && "qwik/json" === directGetAttribute(child, "type")) {
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
            pause: () => (async (elmOrDoc, defaultParentJSON) => {
                const doc = getDocument(elmOrDoc);
                const documentElement = doc.documentElement;
                const containerEl = isDocument(elmOrDoc) ? documentElement : elmOrDoc;
                if ("paused" === directGetAttribute(containerEl, "q:container")) {
                    throw qError(21);
                }
                const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;
                const containerState = _getContainerState(containerEl);
                const contexts = ((parent, predicate) => {
                    const results = [];
                    const v = predicate(parent);
                    void 0 !== v && results.push(v);
                    const walker = parent.ownerDocument.createTreeWalker(parent, 129, {
                        acceptNode(node) {
                            if (isElement$1(el = node) && el.hasAttribute("q:container")) {
                                return 2;
                            }
                            var el;
                            const v = predicate(node);
                            return void 0 !== v && results.push(v), 3;
                        }
                    });
                    for (;walker.nextNode(); ) {}
                    return results;
                })(containerEl, hasContext);
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
                            elm.setAttribute(listener[0], serializeQRLs(listener[1], elCtx));
                        }
                    }
                }
                const data = await _pauseFromContexts(contexts, containerState, (el => isNode$1(el) && isText(el) ? ((node, containerState) => {
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
                })(el, containerState) : null));
                const qwikJson = doc.createElement("script");
                directSetAttribute(qwikJson, "type", "qwik/json"), qwikJson.textContent = JSON.stringify(data.state, void 0, qDev ? "  " : void 0).replace(/<(\/?script)/g, "\\x3C$1"), 
                parentJSON.appendChild(qwikJson);
                const extraListeners = Array.from(containerState.$events$, (s => JSON.stringify(s)));
                const eventsScript = doc.createElement("script");
                return eventsScript.textContent = `window.qwikevents||=[];window.qwikevents.push(${extraListeners.join(", ")})`, 
                parentJSON.appendChild(eventsScript), data;
            })(containerEl),
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
            assertQrl(qrl), assertDefined(qrl.$captureRef$, "invoke: qrl $captureRef$ must be defined inside useLexicalScope()", qrl);
        } else {
            const el = context.$element$;
            assertDefined(el, "invoke: element must be defined inside useLexicalScope()", context);
            const container = getWrappingContainer(el);
            assertDefined(container, "invoke: cant find parent q:container of", el), qrl = parseQRL(decodeURIComponent(String(context.$url$)), container), 
            assertQrl(qrl), resumeIfNeeded(container);
            const elCtx = getContext(el, _getContainerState(container));
            inflateQrl(qrl, elCtx);
        }
        return qrl.$captureRef$;
    };
    const notifyChange = (subAction, containerState) => {
        if (0 === subAction[0]) {
            const host = subAction[1];
            isQwikElement(host) ? notifyRender(host, containerState) : notifyWatch(host, containerState);
        } else {
            notifySignalOperation(subAction, containerState);
        }
    };
    const notifyRender = (hostElement, containerState) => {
        const server = isServerPlatform();
        server || resumeIfNeeded(containerState.$containerEl$);
        const elCtx = getContext(hostElement, containerState);
        if (assertDefined(elCtx.$componentQrl$, "render: notified host element must have a defined $renderQrl$", elCtx), 
        !(1 & elCtx.$flags$)) {
            if (elCtx.$flags$ |= 1, void 0 !== containerState.$hostsRendering$) {
                assertDefined(containerState.$renderPromise$, "render: while rendering, $renderPromise$ must be defined", containerState), 
                containerState.$hostsStaging$.add(hostElement);
            } else {
                if (server) {
                    return void logWarn("Can not rerender in server platform");
                }
                containerState.$hostsNext$.add(hostElement), scheduleFrame(containerState);
            }
        }
    };
    const notifySignalOperation = (op, containerState) => {
        void 0 !== containerState.$hostsRendering$ ? (assertDefined(containerState.$renderPromise$, "render: while rendering, $renderPromise$ must be defined", containerState), 
        containerState.$opsNext$.add(op)) : (containerState.$opsNext$.add(op), scheduleFrame(containerState));
    };
    const notifyWatch = (watch, containerState) => {
        watch.$flags$ & WatchFlagsIsDirty || (watch.$flags$ |= WatchFlagsIsDirty, void 0 !== containerState.$hostsRendering$ ? (assertDefined(containerState.$renderPromise$, "render: while rendering, $renderPromise$ must be defined", containerState), 
        containerState.$watchStaging$.add(watch)) : (containerState.$watchNext$.add(watch), 
        scheduleFrame(containerState)));
    };
    const scheduleFrame = containerState => (void 0 === containerState.$renderPromise$ && (containerState.$renderPromise$ = getPlatform().nextTick((() => renderMarked(containerState)))), 
    containerState.$renderPromise$);
    const _hW = () => {
        const [watch] = useLexicalScope();
        notifyWatch(watch, _getContainerState(getWrappingContainer(watch.$el$)));
    };
    const renderMarked = async containerState => {
        const doc = getDocument(containerState.$containerEl$);
        try {
            const rCtx = createRenderContext(doc, containerState);
            const staticCtx = rCtx.$static$;
            const hostsRendering = containerState.$hostsRendering$ = new Set(containerState.$hostsNext$);
            containerState.$hostsNext$.clear(), await executeWatchesBefore(containerState, rCtx), 
            containerState.$hostsStaging$.forEach((host => {
                hostsRendering.add(host);
            })), containerState.$hostsStaging$.clear();
            const renderingQueue = Array.from(hostsRendering);
            sortNodes(renderingQueue), containerState.$opsNext$.forEach((op => {
                ((staticCtx, operation) => {
                    const prop = operation[5];
                    let value = operation[2][prop];
                    switch (operation[0]) {
                      case 1:
                        {
                            const prop = operation[4];
                            const elm = operation[3];
                            const ctx = tryGetContext(elm);
                            const isSVG = elm.namespaceURI === SVG_NS;
                            let oldValue;
                            if ("class" === prop && (value = serializeClass(value)), ctx && ctx.$vdom$) {
                                const normalizedProp = isSVG ? prop : prop.toLowerCase();
                                oldValue = ctx.$vdom$.$props$[normalizedProp], ctx.$vdom$.$props$[normalizedProp] = value;
                            }
                            return smartSetProperty(staticCtx, elm, prop, value, oldValue, isSVG);
                        }

                      case 2:
                        setProperty(staticCtx, operation[3], "data", jsxToString(value));
                    }
                })(staticCtx, op);
            })), containerState.$opsNext$.clear();
            for (const el of renderingQueue) {
                if (!staticCtx.$hostElements$.has(el)) {
                    const elCtx = getContext(el, containerState);
                    if (elCtx.$componentQrl$) {
                        assertTrue(el.isConnected, "element must be connected to the dom"), staticCtx.$roots$.push(elCtx);
                        try {
                            await renderComponent(rCtx, elCtx, getFlags(el.parentElement));
                        } catch (err) {
                            if (qDev) {
                                throw err;
                            }
                            logError(err);
                        }
                    }
                }
            }
            if (staticCtx.$operations$.push(...staticCtx.$postOperations$), 0 === staticCtx.$operations$.length) {
                return printRenderStats(staticCtx), void await postRendering(containerState, rCtx);
            }
            await getPlatform().raf((() => ((({$static$: ctx}) => {
                executeDOMRender(ctx);
            })(rCtx), printRenderStats(staticCtx), postRendering(containerState, rCtx))));
        } catch (err) {
            logError(err);
        }
    };
    const getFlags = el => {
        let flags = 0;
        return el && (el.namespaceURI === SVG_NS && (flags |= 1), "HEAD" === el.tagName && (flags |= 2)), 
        flags;
    };
    const postRendering = async (containerState, rCtx) => {
        const hostElements = rCtx.$static$.$hostElements$;
        await executeWatchesAfter(containerState, rCtx, ((watch, stage) => 0 != (watch.$flags$ & WatchFlagsIsVisibleTask) && (!stage || hostElements.has(watch.$el$)))), 
        containerState.$hostsStaging$.forEach((el => {
            containerState.$hostsNext$.add(el);
        })), containerState.$hostsStaging$.clear(), containerState.$hostsRendering$ = void 0, 
        containerState.$renderPromise$ = void 0, containerState.$hostsNext$.size + containerState.$watchNext$.size + containerState.$opsNext$.size > 0 && scheduleFrame(containerState);
    };
    const executeWatchesBefore = async (containerState, rCtx) => {
        const containerEl = containerState.$containerEl$;
        const resourcesPromises = [];
        const watchPromises = [];
        const isWatch = watch => 0 != (watch.$flags$ & WatchFlagsIsTask);
        const isResourceWatch = watch => 0 != (watch.$flags$ & WatchFlagsIsResource);
        containerState.$watchNext$.forEach((watch => {
            isWatch(watch) && (watchPromises.push(then(watch.$qrl$.$resolveLazy$(containerEl), (() => watch))), 
            containerState.$watchNext$.delete(watch)), isResourceWatch(watch) && (resourcesPromises.push(then(watch.$qrl$.$resolveLazy$(containerEl), (() => watch))), 
            containerState.$watchNext$.delete(watch));
        }));
        do {
            if (containerState.$watchStaging$.forEach((watch => {
                isWatch(watch) ? watchPromises.push(then(watch.$qrl$.$resolveLazy$(containerEl), (() => watch))) : isResourceWatch(watch) ? resourcesPromises.push(then(watch.$qrl$.$resolveLazy$(containerEl), (() => watch))) : containerState.$watchNext$.add(watch);
            })), containerState.$watchStaging$.clear(), watchPromises.length > 0) {
                const watches = await Promise.all(watchPromises);
                sortWatches(watches), await Promise.all(watches.map((watch => runSubscriber(watch, containerState, rCtx)))), 
                watchPromises.length = 0;
            }
        } while (containerState.$watchStaging$.size > 0);
        if (resourcesPromises.length > 0) {
            const resources = await Promise.all(resourcesPromises);
            sortWatches(resources), resources.forEach((watch => runSubscriber(watch, containerState, rCtx)));
        }
    };
    const executeWatchesAfter = async (containerState, rCtx, watchPred) => {
        const watchPromises = [];
        const containerEl = containerState.$containerEl$;
        containerState.$watchNext$.forEach((watch => {
            watchPred(watch, false) && (watchPromises.push(then(watch.$qrl$.$resolveLazy$(containerEl), (() => watch))), 
            containerState.$watchNext$.delete(watch));
        }));
        do {
            if (containerState.$watchStaging$.forEach((watch => {
                watchPred(watch, true) ? watchPromises.push(then(watch.$qrl$.$resolveLazy$(containerEl), (() => watch))) : containerState.$watchNext$.add(watch);
            })), containerState.$watchStaging$.clear(), watchPromises.length > 0) {
                const watches = await Promise.all(watchPromises);
                sortWatches(watches);
                for (const watch of watches) {
                    await runSubscriber(watch, containerState, rCtx);
                }
                watchPromises.length = 0;
            }
        } while (containerState.$watchStaging$.size > 0);
    };
    const sortNodes = elements => {
        elements.sort(((a, b) => 2 & a.compareDocumentPosition(getRootNode(b)) ? 1 : -1));
    };
    const sortWatches = watches => {
        watches.sort(((a, b) => a.$el$ === b.$el$ ? a.$index$ < b.$index$ ? -1 : 1 : 0 != (2 & a.$el$.compareDocumentPosition(getRootNode(b.$el$))) ? 1 : -1));
    };
    const WatchFlagsIsVisibleTask = 1;
    const WatchFlagsIsTask = 2;
    const WatchFlagsIsResource = 4;
    const WatchFlagsIsDirty = 16;
    const WatchFlagsIsCleanup = 32;
    const useTaskQrl = (qrl, opts) => {
        const {get: get, set: set, iCtx: iCtx, i: i, elCtx: elCtx} = useSequentialScope();
        if (get) {
            return;
        }
        assertQrl(qrl);
        const containerState = iCtx.$renderCtx$.$static$.$containerState$;
        const watch = new Task(WatchFlagsIsDirty | WatchFlagsIsTask, i, elCtx.$element$, qrl, void 0);
        set(true), qrl.$resolveLazy$(containerState.$containerEl$), elCtx.$watches$ || (elCtx.$watches$ = []), 
        elCtx.$watches$.push(watch), waitAndRun(iCtx, (() => runWatch(watch, containerState, iCtx.$renderCtx$))), 
        isServerPlatform() && useRunWatch(watch, opts?.eagerness);
    };
    const useComputedQrl = qrl => {
        const {get: get, set: set, iCtx: iCtx, i: i, elCtx: elCtx} = useSequentialScope();
        if (get) {
            return get;
        }
        assertQrl(qrl);
        const containerState = iCtx.$renderCtx$.$static$.$containerState$;
        const signal = _createSignal(void 0, containerState, 3, void 0);
        const watch = new Task(WatchFlagsIsDirty | WatchFlagsIsTask | 8, i, elCtx.$element$, qrl, signal);
        return qrl.$resolveLazy$(containerState.$containerEl$), elCtx.$watches$ || (elCtx.$watches$ = []), 
        elCtx.$watches$.push(watch), waitAndRun(iCtx, (() => runComputed(watch, containerState, iCtx.$renderCtx$))), 
        set(signal);
    };
    const useComputed$ = implicit$FirstArg(useComputedQrl);
    const useTask$ = implicit$FirstArg(useTaskQrl);
    const useWatch$ = useTask$;
    const useWatchQrl = useTaskQrl;
    const useVisibleTaskQrl = (qrl, opts) => {
        const {get: get, set: set, i: i, iCtx: iCtx, elCtx: elCtx} = useSequentialScope();
        const eagerness = opts?.strategy ?? opts?.eagerness ?? "intersection-observer";
        if (get) {
            return void (isServerPlatform() && useRunWatch(get, eagerness));
        }
        assertQrl(qrl);
        const watch = new Task(WatchFlagsIsVisibleTask, i, elCtx.$element$, qrl, void 0);
        const containerState = iCtx.$renderCtx$.$static$.$containerState$;
        elCtx.$watches$ || (elCtx.$watches$ = []), elCtx.$watches$.push(watch), set(watch), 
        useRunWatch(watch, eagerness), isServerPlatform() || (qrl.$resolveLazy$(containerState.$containerEl$), 
        notifyWatch(watch, containerState));
    };
    const useVisibleTask$ = implicit$FirstArg(useVisibleTaskQrl);
    const useClientEffectQrl = useVisibleTaskQrl;
    const useClientEffect$ = useVisibleTask$;
    const useBrowserVisibleTaskQrl = useVisibleTaskQrl;
    const useBrowserVisibleTask$ = useVisibleTask$;
    const isResourceTask = watch => 0 != (watch.$flags$ & WatchFlagsIsResource);
    const runSubscriber = async (watch, containerState, rCtx) => (assertEqual(!!(watch.$flags$ & WatchFlagsIsDirty), true, "Resource is not dirty", watch), 
    isResourceTask(watch) ? runResource(watch, containerState, rCtx) : (watch => 0 != (8 & watch.$flags$))(watch) ? runComputed(watch, containerState, rCtx) : runWatch(watch, containerState, rCtx));
    const runResource = (watch, containerState, rCtx, waitOn) => {
        watch.$flags$ &= ~WatchFlagsIsDirty, cleanupWatch(watch);
        const el = watch.$el$;
        const invocationContext = newInvokeContext(rCtx.$static$.$locale$, el, void 0, "WatchEvent");
        const {$subsManager$: subsManager} = containerState;
        const watchFn = watch.$qrl$.getFn(invocationContext, (() => {
            subsManager.$clearSub$(watch);
        }));
        const cleanups = [];
        const resource = watch.$state$;
        assertDefined(resource, 'useResource: when running a resource, "watch.r" must be a defined.', watch);
        const resourceTarget = unwrapProxy(resource);
        const opts = {
            track: (obj, prop) => {
                if (isFunction(obj)) {
                    const ctx = newInvokeContext();
                    return ctx.$subscriber$ = watch, invoke(ctx, obj);
                }
                const manager = getProxyManager(obj);
                return manager ? manager.$addSub$([ 0, watch, prop ]) : logErrorAndStop(codeToText(26), obj), 
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
        let done = false;
        const setState = (resolved, value) => !done && (done = true, resolved ? (done = true, 
        resource.loading = false, resource._state = "resolved", resource._resolved = value, 
        resource._error = void 0, resolve(value)) : (done = true, resource.loading = false, 
        resource._state = "rejected", resource._error = value, reject(value)), true);
        invoke(invocationContext, (() => {
            resource._state = "pending", resource.loading = !isServerPlatform(), resource.value = new Promise(((r, re) => {
                resolve = r, reject = re;
            }));
        })), watch.$destroy$ = noSerialize((() => {
            done = true, cleanups.forEach((fn => fn()));
        }));
        const promise = safeCall((() => then(waitOn, (() => watchFn(opts)))), (value => {
            setState(true, value);
        }), (reason => {
            setState(false, reason);
        }));
        const timeout = resourceTarget._timeout;
        return timeout > 0 ? Promise.race([ promise, delay(timeout).then((() => {
            setState(false, new Error("timeout")) && cleanupWatch(watch);
        })) ]) : promise;
    };
    const runWatch = (watch, containerState, rCtx) => {
        watch.$flags$ &= ~WatchFlagsIsDirty, cleanupWatch(watch);
        const hostElement = watch.$el$;
        const invocationContext = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "WatchEvent");
        const {$subsManager$: subsManager} = containerState;
        const watchFn = watch.$qrl$.getFn(invocationContext, (() => {
            subsManager.$clearSub$(watch);
        }));
        const cleanups = [];
        watch.$destroy$ = noSerialize((() => {
            cleanups.forEach((fn => fn()));
        }));
        const opts = {
            track: (obj, prop) => {
                if (isFunction(obj)) {
                    const ctx = newInvokeContext();
                    return ctx.$subscriber$ = watch, invoke(ctx, obj);
                }
                const manager = getProxyManager(obj);
                return manager ? manager.$addSub$([ 0, watch, prop ]) : logErrorAndStop(codeToText(26), obj), 
                prop ? obj[prop] : obj;
            },
            cleanup(callback) {
                cleanups.push(callback);
            }
        };
        return safeCall((() => watchFn(opts)), (returnValue => {
            isFunction(returnValue) && cleanups.push(returnValue);
        }), (reason => {
            handleError(reason, hostElement, rCtx);
        }));
    };
    const runComputed = (watch, containerState, rCtx) => {
        !function(obj) {
            if (qDev && !isSignal(obj)) {
                throw new Error("Not a Signal");
            }
        }(watch.$state$), watch.$flags$ &= ~WatchFlagsIsDirty, cleanupWatch(watch);
        const hostElement = watch.$el$;
        const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "ComputedEvent");
        iCtx.$subscriber$ = watch;
        const {$subsManager$: subsManager} = containerState;
        const watchFn = watch.$qrl$.getFn(iCtx, (() => {
            subsManager.$clearSub$(watch);
        }));
        return safeCall(watchFn, (returnValue => untrack((() => {
            const signal = watch.$state$;
            signal[QObjectSignalFlags] &= -3, signal.untrackedValue = returnValue, signal[QObjectManagerSymbol].$notifySubs$();
        }))), (reason => {
            handleError(reason, hostElement, rCtx);
        }));
    };
    const cleanupWatch = watch => {
        const destroy = watch.$destroy$;
        if (destroy) {
            watch.$destroy$ = void 0;
            try {
                destroy();
            } catch (err) {
                logError(err);
            }
        }
    };
    const destroyWatch = watch => {
        watch.$flags$ & WatchFlagsIsCleanup ? (watch.$flags$ &= ~WatchFlagsIsCleanup, (0, 
        watch.$qrl$)()) : cleanupWatch(watch);
    };
    const useRunWatch = (watch, eagerness) => {
        "visible" === eagerness || "intersection-observer" === eagerness ? useOn("qvisible", getWatchHandlerQrl(watch)) : "load" === eagerness || "document-ready" === eagerness ? useOnDocument("qinit", getWatchHandlerQrl(watch)) : "idle" !== eagerness && "document-idle" !== eagerness || useOnDocument("qidle", getWatchHandlerQrl(watch));
    };
    const getWatchHandlerQrl = watch => {
        const watchQrl = watch.$qrl$;
        return createQRL(watchQrl.$chunk$, "_hW", _hW, null, null, [ watch ], watchQrl.$symbol$);
    };
    const isSubscriberDescriptor = obj => isObject(obj) && obj instanceof Task;
    class Task {
        constructor($flags$, $index$, $el$, $qrl$, $state$) {
            this.$flags$ = $flags$, this.$index$ = $index$, this.$el$ = $el$, this.$qrl$ = $qrl$, 
            this.$state$ = $state$;
        }
    }
    const useResourceQrl = (qrl, opts) => {
        const {get: get, set: set, i: i, iCtx: iCtx, elCtx: elCtx} = useSequentialScope();
        if (null != get) {
            return get;
        }
        assertQrl(qrl);
        const containerState = iCtx.$renderCtx$.$static$.$containerState$;
        const resource = createResourceReturn(containerState, opts);
        const el = elCtx.$element$;
        const watch = new Task(WatchFlagsIsDirty | WatchFlagsIsResource, i, el, qrl, resource);
        const previousWait = Promise.all(iCtx.$waitOn$.slice());
        return runResource(watch, containerState, iCtx.$renderCtx$, previousWait), elCtx.$watches$ || (elCtx.$watches$ = []), 
        elCtx.$watches$.push(watch), set(resource), resource;
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
        return result.value = initialPromise, createProxy(result, containerState, void 0);
    };
    const isResourceReturn = obj => isObject(obj) && "resource" === obj.__brand;
    const UNDEFINED_PREFIX = "";
    const QRLSerializer = {
        prefix: "",
        test: v => isQrl(v),
        collect: (v, collector, leaks) => {
            if (v.$captureRef$) {
                for (const item of v.$captureRef$) {
                    collectValue(item, collector, leaks);
                }
            }
            0 === collector.$prefetch$ && collector.$qrls$.push(v);
        },
        serialize: (obj, getObjId) => serializeQRL(obj, {
            $getObjId$: getObjId
        }),
        prepare: (data, containerState) => parseQRL(data, containerState.$containerEl$),
        fill: (qrl, getObject) => {
            qrl.$capture$ && qrl.$capture$.length > 0 && (qrl.$captureRef$ = qrl.$capture$.map(getObject), 
            qrl.$capture$ = null);
        }
    };
    const WatchSerializer = {
        prefix: "",
        test: v => isSubscriberDescriptor(v),
        collect: (v, collector, leaks) => {
            collectValue(v.$qrl$, collector, leaks), v.$state$ && collectValue(v.$state$, collector, leaks);
        },
        serialize: (obj, getObjId) => ((watch, getObjId) => {
            let value = `${intToStr(watch.$flags$)} ${intToStr(watch.$index$)} ${getObjId(watch.$qrl$)} ${getObjId(watch.$el$)}`;
            return watch.$state$ && (value += ` ${getObjId(watch.$state$)}`), value;
        })(obj, getObjId),
        prepare: data => (data => {
            const [flags, index, qrl, el, resource] = data.split(" ");
            return new Task(strToInt(flags), strToInt(index), el, qrl, resource);
        })(data),
        fill: (watch, getObject) => {
            watch.$el$ = getObject(watch.$el$), watch.$qrl$ = getObject(watch.$qrl$), watch.$state$ && (watch.$state$ = getObject(watch.$state$));
        }
    };
    const ResourceSerializer = {
        prefix: "",
        test: v => isResourceReturn(v),
        collect: (obj, collector, leaks) => {
            collectValue(obj.value, collector, leaks), collectValue(obj._resolved, collector, leaks);
        },
        serialize: (obj, getObjId) => ((resource, getObjId) => {
            const state = resource._state;
            return "resolved" === state ? `0 ${getObjId(resource._resolved)}` : "pending" === state ? "1" : `2 ${getObjId(resource._error)}`;
        })(obj, getObjId),
        prepare: data => (data => {
            const [first, id] = data.split(" ");
            const result = _createResourceReturn(void 0);
            return result.value = Promise.resolve(), "0" === first ? (result._state = "resolved", 
            result._resolved = id, result.loading = false) : "1" === first ? (result._state = "pending", 
            result.value = new Promise((() => {})), result.loading = true) : "2" === first && (result._state = "rejected", 
            result._error = id, result.loading = false), result;
        })(data),
        fill: (resource, getObject) => {
            if ("resolved" === resource._state) {
                resource._resolved = getObject(resource._resolved), resource.value = Promise.resolve(resource._resolved);
            } else if ("rejected" === resource._state) {
                const p = Promise.reject(resource._error);
                p.catch((() => null)), resource._error = getObject(resource._error), resource.value = p;
            }
        }
    };
    const URLSerializer = {
        prefix: "",
        test: v => v instanceof URL,
        serialize: obj => obj.href,
        prepare: data => new URL(data),
        fill: void 0
    };
    const DateSerializer = {
        prefix: "",
        test: v => v instanceof Date,
        serialize: obj => obj.toISOString(),
        prepare: data => new Date(data),
        fill: void 0
    };
    const RegexSerializer = {
        prefix: "",
        test: v => v instanceof RegExp,
        serialize: obj => `${obj.flags} ${obj.source}`,
        prepare: data => {
            const space = data.indexOf(" ");
            const source = data.slice(space + 1);
            const flags = data.slice(0, space);
            return new RegExp(source, flags);
        },
        fill: void 0
    };
    const ErrorSerializer = {
        prefix: "",
        test: v => v instanceof Error,
        serialize: obj => obj.message,
        prepare: text => {
            const err = new Error(text);
            return err.stack = void 0, err;
        },
        fill: void 0
    };
    const DocumentSerializer = {
        prefix: "",
        test: v => isDocument(v),
        serialize: void 0,
        prepare: (_, _c, doc) => doc,
        fill: void 0
    };
    const SERIALIZABLE_STATE = Symbol("serializable-data");
    const ComponentSerializer = {
        prefix: "",
        test: obj => isQwikComponent(obj),
        serialize: (obj, getObjId) => {
            const [qrl] = obj[SERIALIZABLE_STATE];
            return serializeQRL(qrl, {
                $getObjId$: getObjId
            });
        },
        prepare: (data, containerState) => {
            const optionsIndex = data.indexOf("{");
            const qrlString = -1 == optionsIndex ? data : data.slice(0, optionsIndex);
            const qrl = parseQRL(qrlString, containerState.$containerEl$);
            return componentQrl(qrl);
        },
        fill: (component, getObject) => {
            const [qrl] = component[SERIALIZABLE_STATE];
            qrl.$capture$ && qrl.$capture$.length > 0 && (qrl.$captureRef$ = qrl.$capture$.map(getObject), 
            qrl.$capture$ = null);
        }
    };
    const serializers = [ QRLSerializer, {
        prefix: "",
        test: v => v instanceof SignalImpl,
        collect: (obj, collector, leaks) => (collectValue(obj.untrackedValue, collector, leaks), 
        true === leaks && collectSubscriptions(obj[QObjectManagerSymbol], collector), obj),
        serialize: (obj, getObjId) => getObjId(obj.untrackedValue),
        prepare: (data, containerState) => new SignalImpl(data, containerState?.$subsManager$?.$createManager$(), 0),
        subs: (signal, subs) => {
            signal[QObjectManagerSymbol].$addSubs$(subs);
        },
        fill: (signal, getObject) => {
            signal.untrackedValue = getObject(signal.untrackedValue);
        }
    }, {
        prefix: "",
        test: v => v instanceof SignalWrapper,
        collect(obj, collector, leaks) {
            if (collectValue(obj.ref, collector, leaks), fastWeakSerialize(obj.ref)) {
                const localManager = getProxyManager(obj.ref);
                isTreeshakeable(collector.$containerState$.$subsManager$, localManager, leaks) && collectValue(obj.ref[obj.prop], collector, leaks);
            }
            return obj;
        },
        serialize: (obj, getObjId) => `${getObjId(obj.ref)} ${obj.prop}`,
        prepare: data => {
            const [id, prop] = data.split(" ");
            return new SignalWrapper(id, prop);
        },
        fill: (signal, getObject) => {
            signal.ref = getObject(signal.ref);
        }
    }, WatchSerializer, ResourceSerializer, URLSerializer, DateSerializer, RegexSerializer, ErrorSerializer, DocumentSerializer, ComponentSerializer, {
        prefix: "",
        test: v => "number" == typeof v,
        serialize: v => String(v),
        prepare: data => Number(data),
        fill: void 0
    }, {
        prefix: "",
        test: v => v instanceof URLSearchParams,
        serialize: obj => obj.toString(),
        prepare: data => new URLSearchParams(data),
        fill: void 0
    }, {
        prefix: "",
        test: v => "undefined" != typeof FormData && v instanceof globalThis.FormData,
        serialize: formData => {
            const array = [];
            return formData.forEach(((value, key) => {
                "string" == typeof value ? array.push([ key, value ]) : array.push([ key, value.name ]);
            })), JSON.stringify(array);
        },
        prepare: data => {
            const array = JSON.parse(data);
            const formData = new FormData;
            for (const [key, value] of array) {
                formData.append(key, value);
            }
            return formData;
        },
        fill: void 0
    } ];
    const collectorSerializers = serializers.filter((a => a.collect));
    const collectDeps = (obj, collector, leaks) => {
        for (const s of collectorSerializers) {
            if (s.test(obj)) {
                return s.collect(obj, collector, leaks), true;
            }
        }
        return false;
    };
    const serializeValue = (obj, getObjID, containerState) => {
        for (const s of serializers) {
            if (s.test(obj)) {
                let value = s.prefix;
                return s.serialize && (value += s.serialize(obj, getObjID, containerState)), value;
            }
        }
    };
    const createParser = (containerState, doc) => {
        const fillMap = new Map;
        const subsMap = new Map;
        return {
            prepare(data) {
                for (const s of serializers) {
                    const prefix = s.prefix;
                    if (data.startsWith(prefix)) {
                        const value = s.prepare(data.slice(prefix.length), containerState, doc);
                        return s.fill && fillMap.set(value, s), s.subs && subsMap.set(value, s), value;
                    }
                }
                return data;
            },
            subs(obj, subs) {
                const serializer = subsMap.get(obj);
                return !!serializer && (serializer.subs(obj, subs, containerState), true);
            },
            fill(obj, getObject) {
                const serializer = fillMap.get(obj);
                return !!serializer && (serializer.fill(obj, getObject, containerState), true);
            }
        };
    };
    const OBJECT_TRANSFORMS = {
        "!": (obj, containerState) => containerState.$proxyMap$.get(obj) ?? getOrCreateProxy(obj, containerState),
        "~": obj => Promise.resolve(obj),
        _: obj => Promise.reject(obj)
    };
    const isTreeshakeable = (manager, target, leaks) => {
        if ("boolean" == typeof leaks) {
            return leaks;
        }
        const localManager = manager.$groupToManagers$.get(leaks);
        return !!(localManager && localManager.length > 0 && 1 === localManager.length) && localManager[0] !== target;
    };
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
                    if (s.test(obj)) {
                        return true;
                    }
                }
                return false;
            })(unwrapped)) {
                return value;
            }
            const typeObj = typeof unwrapped;
            switch (typeObj) {
              case "object":
                if (isPromise(unwrapped)) {
                    return value;
                }
                if (isQwikElement(unwrapped)) {
                    return value;
                }
                if (isDocument(unwrapped)) {
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
                message += ` because it's an instance of "${value?.constructor.name}". You might need to use 'noSerialize()' or use an object literal instead. Check out https://qwik.builder.io/docs/advanced/dollar/`;
            } else if ("function" === typeObj) {
                const fnName = value.name;
                message += ` because it's a function named "${fnName}". You might need to convert it to a QRL using $(fn):\n\nconst ${fnName} = $(${String(value)});\n\nPlease check out https://qwik.builder.io/docs/advanced/qrl/ for more information.`;
            }
            throw console.error("Trying to serialize", value), createError(message);
        }
        return value;
    };
    const noSerializeSet = new WeakSet;
    const weakSerializeSet = new WeakSet;
    const shouldSerialize = obj => !isObject(obj) && !isFunction(obj) || !noSerializeSet.has(obj);
    const fastSkipSerialize = obj => noSerializeSet.has(obj);
    const fastWeakSerialize = obj => weakSerializeSet.has(obj);
    const noSerialize = input => (null != input && noSerializeSet.add(input), input);
    const isConnected = sub => isQwikElement(sub) ? !!tryGetContext(sub) || sub.isConnected : isConnected(sub.$el$);
    const unwrapProxy = proxy => isObject(proxy) ? getProxyTarget(proxy) ?? proxy : proxy;
    const getProxyTarget = obj => obj[QOjectTargetSymbol];
    const getProxyManager = obj => obj[QObjectManagerSymbol];
    const getProxyFlags = obj => obj[QObjectFlagsSymbol];
    const serializeSubscription = (sub, getObjId) => {
        const type = sub[0];
        const host = getObjId(sub[1]);
        if (!host) {
            return;
        }
        let base = type + " " + host;
        if (0 === sub[0]) {
            sub[2] && (base += " " + sub[2]);
        } else {
            const nodeID = "string" == typeof sub[3] ? sub[3] : must(getObjId(sub[3]));
            base += ` ${must(getObjId(sub[2]))} ${nodeID} ${sub[4]}`, sub[5] && (base += ` ${sub[5]}`);
        }
        return base;
    };
    const parseSubscription = (sub, getObject) => {
        const parts = sub.split(" ");
        const type = parseInt(parts[0], 10);
        assertTrue(parts.length >= 2, "At least 2 parts");
        const host = getObject(parts[1]);
        if (!host) {
            return;
        }
        if (isSubscriberDescriptor(host) && !host.$el$) {
            return;
        }
        const subscription = [ type, host ];
        return 0 === type ? (assertTrue(parts.length <= 3, "Max 3 parts"), subscription.push(parts[2])) : (assertTrue(5 === parts.length || 6 === parts.length, "Max 5 parts"), 
        subscription.push(getObject(parts[2]), getObject(parts[3]), parts[4], parts[5])), 
        subscription;
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
            }
        };
        return seal(manager), manager;
    };
    class LocalSubscriptionManager {
        constructor($groupToManagers$, $containerState$, initialMap) {
            this.$groupToManagers$ = $groupToManagers$, this.$containerState$ = $containerState$, 
            this.$subs$ = [], initialMap && this.$addSubs$(initialMap), seal(this);
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
        $addSub$(sub) {
            const subs = this.$subs$;
            const group = sub[1];
            const key = sub[sub.length - 1];
            subs.some((([_type, _group, _key]) => 0 === _type && _group === group && _key === key)) || (subs.push(sub), 
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
    const must = a => {
        if (null == a) {
            throw logError("must be non null", a);
        }
        return a;
    };
    const isQrl = value => "function" == typeof value && "function" == typeof value.getSymbol;
    const createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
        if (qDev && captureRef) {
            for (const item of captureRef) {
                verifySerializable(item, "Captured variable in the closure can not be serialized");
            }
        }
        let _containerEl;
        const setContainer = el => (_containerEl || (_containerEl = el), _containerEl);
        const resolve = async containerEl => {
            if (containerEl && setContainer(containerEl), null !== symbolRef) {
                return symbolRef;
            }
            if (null !== symbolFn) {
                return symbolRef = symbolFn().then((module => symbolRef = module[symbol]));
            }
            {
                const symbol2 = getPlatform().importSymbol(_containerEl, chunk, symbol);
                return symbolRef = then(symbol2, (ref => symbolRef = ref));
            }
        };
        const resolveLazy = containerEl => null !== symbolRef ? symbolRef : resolve(containerEl);
        function invokeFn(currentCtx, beforeFn) {
            return (...args) => {
                const start = now();
                const fn = resolveLazy();
                return then(fn, (fn => {
                    if (isFunction(fn)) {
                        if (beforeFn && false === beforeFn()) {
                            return;
                        }
                        const context = {
                            ...createInvokationContext(currentCtx),
                            $qrl$: QRL
                        };
                        return emitUsedSymbol(symbol, context.$element$, start), invoke.call(this, context, fn, ...args);
                    }
                    throw qError(QError_qrlIsNotFunction);
                }));
            };
        }
        const createInvokationContext = invoke => null == invoke ? newInvokeContext() : isArray(invoke) ? newInvokeContextFromTuple(invoke) : invoke;
        const invokeQRL = async function(...args) {
            const fn = invokeFn.call(this);
            return await fn(...args);
        };
        const resolvedSymbol = refSymbol ?? symbol;
        const hash = getSymbolHash(resolvedSymbol);
        const QRL = invokeQRL;
        const methods = {
            getSymbol: () => resolvedSymbol,
            getHash: () => hash,
            getCaptured: () => captureRef,
            resolve: resolve,
            $resolveLazy$: resolveLazy,
            $setContainer$: setContainer,
            $chunk$: chunk,
            $symbol$: symbol,
            $refSymbol$: refSymbol,
            $hash$: hash,
            getFn: invokeFn,
            $capture$: capture,
            $captureRef$: captureRef,
            dev: null
        };
        const qrl = Object.assign(invokeQRL, methods);
        return seal(qrl), qrl;
    };
    const getSymbolHash = symbolName => {
        const index = symbolName.lastIndexOf("_");
        return index > -1 ? symbolName.slice(index + 1) : symbolName;
    };
    function assertQrl(qrl) {
        if (qDev && !isQrl(qrl)) {
            throw new Error("Not a QRL");
        }
    }
    const emitUsedSymbol = (symbol, element, reqTime) => {
        emitEvent("qsymbol", {
            symbol: symbol,
            element: element,
            reqTime: reqTime
        });
    };
    const emitEvent = (eventName, detail) => {
        qTest || isServerPlatform() || "object" != typeof document || document.dispatchEvent(new CustomEvent(eventName, {
            bubbles: false,
            detail: detail
        }));
    };
    const now = () => qTest || isServerPlatform() ? 0 : "object" == typeof performance ? performance.now() : 0;
    const $ = expression => {
        throw new Error("Optimizer should replace all usages of $() with some special syntax. If you need to create a QRL manually, use inlinedQrl() instead.");
    };
    const componentQrl = componentQrl => {
        function QwikComponent(props, key) {
            assertQrl(componentQrl);
            const finalKey = (qTest ? "sX" : componentQrl.$hash$.slice(0, 4)) + ":" + (key || "");
            return jsx(Virtual, {
                [OnRenderProp]: componentQrl,
                [QSlot]: props[QSlot],
                [_IMMUTABLE]: props[_IMMUTABLE],
                children: props.children,
                props: props
            }, finalKey);
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
    const useStore = (initialState, opts) => {
        const {get: get, set: set, iCtx: iCtx} = useSequentialScope();
        if (null != get) {
            return get;
        }
        const value = isFunction(initialState) ? invoke(void 0, initialState) : initialState;
        if (false === opts?.reactive) {
            return set(value), value;
        }
        {
            const containerState = iCtx.$renderCtx$.$static$.$containerState$;
            const newStore = getOrCreateProxy(value, containerState, opts?.deep ?? opts?.recursive ?? false ? 1 : 0);
            return set(newStore), newStore;
        }
    };
    function useServerData(key, defaultValue) {
        return useInvokeContext().$renderCtx$.$static$.$containerState$.$serverData$[key] ?? defaultValue;
    }
    const useUserContext = useServerData;
    const useEnvData = useServerData;
    const STYLE_CACHE = new Map;
    const getScopedStyles = (css, scopeId) => {
        if (qDev) {
            return scopeStylesheet(css, scopeId);
        }
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
                        newMode === EXIT_INSERT_SCOPE && (mode !== starSelector || shouldNotInsertScoping() ? isChainedSelector(ch) || insertScopingSelector(idx - (expectCh == NOT_IDENT ? 1 : expectCh == CLOSE_PARENTHESIS ? 2 : 0)) : (isChainedSelector(ch) ? flush(idx - 2) : insertScopingSelector(idx - 2), 
                        lastIdx++)), expectCh === NOT_IDENT && (idx--, ch = lastCh);
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
            mode === pseudoGlobal || shouldNotInsertScoping() || (flush(idx), out.push(".", ComponentStylesPrefixContent, scopeId));
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
                return idx += txt.length + prefix, true;
            }
            return false;
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
    const STATE_MACHINE = [ [ [ ANY, 42, starSelector ], [ ANY, OPEN_BRACKET, 7 ], [ ANY, COLON, pseudoElement, ":", "before", "after", "first-letter", "first-line" ], [ ANY, COLON, pseudoGlobal, "global" ], [ ANY, COLON, 3, "has", "host-context", "not", "where", "is", "matches", "any" ], [ ANY, COLON, 4 ], [ ANY, IDENT, 1 ], [ ANY, DOT, 1 ], [ ANY, HASH, 1 ], [ ANY, 64, atRuleSelector, "keyframe" ], [ ANY, 64, atRuleBlock, "media", "supports" ], [ ANY, 64, atRuleInert ], [ ANY, 123, 13 ], [ 47, 42, 16 ], [ ANY, 59, EXIT ], [ ANY, 125, EXIT ], [ ANY, CLOSE_PARENTHESIS, EXIT ], ...STRINGS_COMMENTS ], [ [ ANY, NOT_IDENT, EXIT_INSERT_SCOPE ] ], [ [ ANY, NOT_IDENT, EXIT_INSERT_SCOPE ] ], [ [ ANY, 40, rule ], [ ANY, NOT_IDENT, EXIT_INSERT_SCOPE ] ], [ [ ANY, 40, 8 ], [ ANY, NOT_IDENT, EXIT_INSERT_SCOPE ] ], [ [ ANY, 40, rule ], [ ANY, NOT_IDENT, EXIT ] ], [ [ ANY, NOT_IDENT, EXIT ] ], [ [ ANY, 93, EXIT_INSERT_SCOPE ], [ ANY, 39, 14 ], [ ANY, 34, 15 ] ], [ [ ANY, CLOSE_PARENTHESIS, EXIT ], ...STRINGS_COMMENTS ], [ [ ANY, 125, EXIT ], ...STRINGS_COMMENTS ], [ [ ANY, 125, EXIT ], [ WHITESPACE, IDENT, 1 ], [ ANY, COLON, pseudoGlobal, "global" ], [ ANY, 123, 13 ], ...STRINGS_COMMENTS ], [ [ ANY, 123, rule ], [ ANY, 59, EXIT ], ...STRINGS_COMMENTS ], [ [ ANY, 59, EXIT ], [ ANY, 123, 9 ], ...STRINGS_COMMENTS ], [ [ ANY, 125, EXIT ], [ ANY, 123, 13 ], [ ANY, 40, 8 ], ...STRINGS_COMMENTS ], [ [ ANY, 39, EXIT ] ], [ [ ANY, 34, EXIT ] ], [ [ 42, 47, EXIT ] ] ];
    const useStylesQrl = styles => {
        _useStyles(styles, (str => str), false);
    };
    const useStyles$ = implicit$FirstArg(useStylesQrl);
    const useStylesScopedQrl = styles => ({
        scopeId: ComponentStylesPrefixContent + _useStyles(styles, getScopedStyles, true)
    });
    const useStylesScoped$ = implicit$FirstArg(useStylesScopedQrl);
    const _useStyles = (styleQrl, transform, scoped) => {
        assertQrl(styleQrl);
        const {get: get, set: set, iCtx: iCtx, i: i, elCtx: elCtx} = useSequentialScope();
        if (get) {
            return get;
        }
        const styleId = (index = i, assertQrl(qStyles = styleQrl), `${hashCode(qStyles.$hash$)}-${index}`);
        var qStyles, index;
        const containerState = iCtx.$renderCtx$.$static$.$containerState$;
        if (set(styleId), elCtx.$appendStyles$ || (elCtx.$appendStyles$ = []), elCtx.$scopeIds$ || (elCtx.$scopeIds$ = []), 
        scoped && elCtx.$scopeIds$.push((styleId => ComponentStylesPrefixContent + styleId)(styleId)), 
        ((containerState, styleId) => containerState.$styleIds$.has(styleId))(containerState, styleId)) {
            return styleId;
        }
        containerState.$styleIds$.add(styleId);
        const value = styleQrl.$resolveLazy$(containerState.$containerEl$);
        const appendStyle = styleText => {
            assertDefined(elCtx.$appendStyles$, "appendStyles must be defined"), elCtx.$appendStyles$.push({
                styleId: styleId,
                content: transform(styleText, styleId)
            });
        };
        return isPromise(value) ? iCtx.$waitOn$.push(value.then(appendStyle)) : appendStyle(value), 
        styleId;
    };
    const useServerMountQrl = mountQrl => {
        const {get: get, set: set, iCtx: iCtx} = useSequentialScope();
        get || (isServerPlatform() && (assertQrl(mountQrl), mountQrl.$resolveLazy$(iCtx.$renderCtx$.$static$.$containerState$.$containerEl$), 
        waitAndRun(iCtx, mountQrl)), set(true));
    };
    const useServerMount$ = implicit$FirstArg(useServerMountQrl);
    const useClientMountQrl = mountQrl => {
        const {get: get, set: set, iCtx: iCtx} = useSequentialScope();
        get || (isServerPlatform() || (assertQrl(mountQrl), mountQrl.$resolveLazy$(iCtx.$renderCtx$.$static$.$containerState$.$containerEl$), 
        waitAndRun(iCtx, mountQrl)), set(true));
    };
    const useClientMount$ = implicit$FirstArg(useClientMountQrl);
    const useMountQrl = useTaskQrl;
    const useMount$ = useTask$;
    const renderNodeVirtual = (node, elCtx, extraNodes, rCtx, ssrCtx, stream, flags, beforeClose) => {
        const props = node.props;
        const renderQrl = props[OnRenderProp];
        if (renderQrl) {
            return elCtx.$componentQrl$ = renderQrl, renderSSRComponent(rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose);
        }
        let virtualComment = "\x3c!--qv" + renderVirtualAttributes(props);
        const isSlot = "q:s" in props;
        const key = null != node.key ? String(node.key) : null;
        if (isSlot && (assertDefined(rCtx.$cmpCtx$?.$id$, "hostId must be defined for a slot"), 
        virtualComment += " q:sref=" + rCtx.$cmpCtx$.$id$), null != key && (virtualComment += " q:key=" + key), 
        virtualComment += "--\x3e", stream.write(virtualComment), extraNodes) {
            for (const node of extraNodes) {
                renderNodeElementSync(node.type, node.props, stream);
            }
        }
        const promise = walkChildren(props.children, rCtx, ssrCtx, stream, flags);
        return then(promise, (() => {
            if (!isSlot && !beforeClose) {
                return void stream.write(CLOSE_VIRTUAL);
            }
            let promise;
            if (isSlot) {
                assertDefined(key, "key must be defined for a slot");
                const content = ssrCtx.$projectedChildren$?.[key];
                if (content) {
                    const [rCtx, sCtx] = ssrCtx.$projectedCtxs$;
                    const newSlotRctx = pushRenderContext(rCtx);
                    newSlotRctx.$slotCtx$ = elCtx, ssrCtx.$projectedChildren$[key] = void 0, promise = processData(content, newSlotRctx, sCtx, stream, flags);
                }
            }
            return beforeClose && (promise = then(promise, (() => beforeClose(stream)))), then(promise, (() => {
                stream.write(CLOSE_VIRTUAL);
            }));
        }));
    };
    const CLOSE_VIRTUAL = "\x3c!--/qv--\x3e";
    const renderVirtualAttributes = attributes => {
        let text = "";
        for (const prop of Object.keys(attributes)) {
            if ("children" === prop) {
                continue;
            }
            const value = attributes[prop];
            null != value && (text += " " + ("" === value ? prop : prop + "=" + value));
        }
        return text;
    };
    const renderNodeElementSync = (tagName, attributes, stream) => {
        if (stream.write("<" + tagName + (attributes => {
            let text = "";
            for (const prop of Object.keys(attributes)) {
                if ("dangerouslySetInnerHTML" === prop) {
                    continue;
                }
                const value = attributes[prop];
                null != value && (text += " " + ("" === value ? prop : prop + '="' + value + '"'));
            }
            return text;
        })(attributes) + ">"), !!emptyElements[tagName]) {
            return;
        }
        const innerHTML = attributes.dangerouslySetInnerHTML;
        null != innerHTML && stream.write(innerHTML), stream.write(`</${tagName}>`);
    };
    const renderSSRComponent = (rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose) => {
        const props = node.props;
        return setComponentProps(rCtx, elCtx, props.props), then(executeComponent(rCtx, elCtx), (res => {
            const hostElement = elCtx.$element$;
            const newRCtx = res.rCtx;
            const invocationContext = newInvokeContext(ssrCtx.$static$.$locale$, hostElement, void 0);
            invocationContext.$subscriber$ = hostElement, invocationContext.$renderCtx$ = newRCtx;
            const newSSrContext = {
                ...ssrCtx,
                $projectedChildren$: splitProjectedChildren(props.children, ssrCtx),
                $projectedCtxs$: [ rCtx, ssrCtx ],
                $invocationContext$: invocationContext
            };
            const extraNodes = [];
            if (elCtx.$appendStyles$) {
                const array = 4 & flags ? ssrCtx.$static$.$headNodes$ : extraNodes;
                for (const style of elCtx.$appendStyles$) {
                    array.push(jsx("style", {
                        "q:style": style.styleId,
                        hidden: "",
                        dangerouslySetInnerHTML: style.content
                    }));
                }
            }
            const newID = getNextIndex(rCtx);
            const scopeId = elCtx.$scopeIds$ ? serializeSStyle(elCtx.$scopeIds$) : void 0;
            const processedNode = jsx(node.type, {
                "q:sstyle": scopeId,
                "q:id": newID,
                children: res.node
            }, node.key);
            return elCtx.$id$ = newID, ssrCtx.$static$.$contexts$.push(elCtx), renderNodeVirtual(processedNode, elCtx, extraNodes, newRCtx, newSSrContext, stream, flags, (stream => {
                if (2 & elCtx.$flags$) {
                    const placeholderCtx = createSSRContext(1);
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
                        attributes[eventName] = serializeQRLs(listener[1], placeholderCtx), addQwikEvent(eventName, rCtx.$static$.$containerState$);
                    }
                    renderNodeElementSync("script", attributes, stream);
                }
                return beforeClose ? then(renderQTemplates(rCtx, newSSrContext, stream), (() => beforeClose(stream))) : renderQTemplates(rCtx, newSSrContext, stream);
            }));
        }));
    };
    const renderQTemplates = (rCtx, ssrContext, stream) => {
        const projectedChildren = ssrContext.$projectedChildren$;
        if (projectedChildren) {
            const nodes = Object.keys(projectedChildren).map((slotName => {
                const value = projectedChildren[slotName];
                if (value) {
                    return jsx("q:template", {
                        [QSlot]: slotName,
                        hidden: "",
                        "aria-hidden": "true",
                        children: value
                    });
                }
            }));
            return processData(nodes, rCtx, ssrContext, stream, 0, void 0);
        }
    };
    const splitProjectedChildren = (children, ssrCtx) => {
        const flatChildren = flatVirtualChildren(children, ssrCtx);
        if (null === flatChildren) {
            return;
        }
        const slotMap = {};
        for (const child of flatChildren) {
            let slotName = "";
            isJSXNode(child) && (slotName = child.props[QSlot] ?? "");
            let array = slotMap[slotName];
            array || (slotMap[slotName] = array = []), array.push(child);
        }
        return slotMap;
    };
    const createSSRContext = nodeType => {
        const elm = {
            nodeType: nodeType,
            _qc_: null
        };
        return seal(elm), createContext$1(elm);
    };
    const renderNode = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
        const tagName = node.type;
        const hostCtx = rCtx.$cmpCtx$;
        if ("string" == typeof tagName) {
            const key = node.key;
            const props = node.props;
            const immutableMeta = props[_IMMUTABLE] ?? EMPTY_OBJ;
            const elCtx = createSSRContext(1);
            const elm = elCtx.$element$;
            const isHead = "head" === tagName;
            let openingElement = "<" + tagName;
            let useSignal = false;
            let classStr = "";
            let htmlStr = null;
            if (assertElement(elm), qDev && props.class && props.className) {
                throw new TypeError("Can only have one of class or className");
            }
            for (const prop of Object.keys(props)) {
                if ("children" === prop || "dangerouslySetInnerHTML" === prop) {
                    continue;
                }
                if ("ref" === prop) {
                    setRef(props[prop], elm);
                    continue;
                }
                let value = isSignal(immutableMeta[prop]) ? immutableMeta[prop] : props[prop];
                if (isOnProp(prop)) {
                    setEvent(elCtx.li, prop, value, void 0);
                    continue;
                }
                const attrName = processPropKey(prop);
                if (isSignal(value)) {
                    if (hostCtx) {
                        const hostEl = hostCtx.$element$;
                        addSignalSub(1, hostEl, value, elm, attrName), useSignal = true;
                    }
                    value = value.value;
                }
                prop.startsWith("preventdefault:") && addQwikEvent(prop.slice("preventdefault:".length), rCtx.$static$.$containerState$);
                const attrValue = processPropValue(attrName, value);
                null != attrValue && ("class" === attrName ? classStr = attrValue : "value" === attrName && "textarea" === tagName ? htmlStr = escapeHtml(attrValue) : isSSRUnsafeAttr(attrName) ? qDev && logError("Attribute value is unsafe for SSR") : openingElement += " " + ("" === value ? attrName : attrName + '="' + escapeAttr(attrValue) + '"'));
            }
            const listeners = elCtx.li;
            if (hostCtx) {
                if (qDev && "html" === tagName) {
                    throw qError(29);
                }
                if (hostCtx.$scopeIds$?.length) {
                    const extra = hostCtx.$scopeIds$.join(" ");
                    classStr = classStr ? `${extra} ${classStr}` : extra;
                }
                2 & hostCtx.$flags$ && (listeners.push(...hostCtx.li), hostCtx.$flags$ &= -3);
            }
            if (qDev) {
                if (32 & flags && !phasingContent[tagName]) {
                    throw createJSXError(`<${tagName}> can not be rendered because one of its ancestor is a <p> or a <pre>.\n\nThis goes against the HTML spec: https://html.spec.whatwg.org/multipage/dom.html#phrasing-content-2`, node);
                }
                if ("table" === tagName) {
                    flags |= 256;
                } else {
                    if (256 & flags && !tableContent[tagName]) {
                        throw createJSXError(`The <table> element requires that its direct children to be '<tbody>' or '<thead>', instead, '<${tagName}>' was rendered.`, node);
                    }
                    flags &= -257;
                }
                if ("button" === tagName) {
                    if (128 & flags) {
                        throw createJSXError(`<${tagName}> can not be rendered because one of its ancestor is already a <button>.\n\nThis goes against the HTML spec: https://html.spec.whatwg.org/multipage/dom.html#interactive-content`, node);
                    }
                    flags |= 128;
                }
                if ("a" === tagName) {
                    if (64 & flags) {
                        throw createJSXError(`<${tagName}> can not be rendered because one of its ancestor is already a <a>.\n\nThis goes against the HTML spec: https://html.spec.whatwg.org/multipage/dom.html#interactive-content`, node);
                    }
                    flags |= 64;
                }
                if (1 & flags && !headContent[tagName]) {
                    throw createJSXError(`<${tagName}> can not be rendered because it's not a valid children of the <head> element. https://html.spec.whatwg.org/multipage/dom.html#metadata-content`, node);
                }
                if (4 & flags && !htmlContent[tagName]) {
                    throw createJSXError(`<${tagName}> can not be rendered because it's not a valid direct children of the <html> element, only <head> and <body> are allowed.`, node);
                }
                startPhasingContent[tagName] && (flags |= 32);
            }
            if (isHead && (flags |= 1), invisibleElements[tagName] && (flags |= 16), textOnlyElements[tagName] && (flags |= 8), 
            classStr && (openingElement += ' class="' + escapeAttr(classStr) + '"'), listeners.length > 0) {
                const groups = groupListeners(listeners);
                const isInvisible = 0 != (16 & flags);
                for (const listener of groups) {
                    const eventName = isInvisible ? normalizeInvisibleEvents(listener[0]) : listener[0];
                    openingElement += " " + eventName + '="' + serializeQRLs(listener[1], elCtx) + '"', 
                    addQwikEvent(eventName, rCtx.$static$.$containerState$);
                }
            }
            if (null != key && (openingElement += ' q:key="' + escapeAttr(key) + '"'), "ref" in props || useSignal || listeners.length > 0) {
                if ("ref" in props || useSignal || listenersNeedId(listeners)) {
                    const newID = getNextIndex(rCtx);
                    openingElement += ' q:id="' + newID + '"', elCtx.$id$ = newID;
                }
                ssrCtx.$static$.$contexts$.push(elCtx);
            }
            if (1 & flags && (openingElement += " q:head"), qDev && false) {
                const sanitizedFileName = node?.dev?.fileName?.replace(/\\/g, "/");
                sanitizedFileName && (openingElement += ` data-qwik-inspector="${encodeURIComponent(sanitizedFileName)}:${node.dev.lineNumber}:${node.dev.columnNumber}"`);
            }
            if (openingElement += ">", stream.write(openingElement), emptyElements[tagName]) {
                return;
            }
            const innerHTML = props.dangerouslySetInnerHTML ?? htmlStr;
            if (null != innerHTML) {
                return stream.write(String(innerHTML)), void stream.write(`</${tagName}>`);
            }
            "html" === tagName ? flags |= 4 : flags &= -5;
            const promise = processData(props.children, rCtx, ssrCtx, stream, flags);
            return then(promise, (() => {
                if (isHead) {
                    for (const node of ssrCtx.$static$.$headNodes$) {
                        renderNodeElementSync(node.type, node.props, stream);
                    }
                    ssrCtx.$static$.$headNodes$.length = 0;
                }
                if (beforeClose) {
                    return then(beforeClose(stream), (() => {
                        stream.write(`</${tagName}>`);
                    }));
                }
                stream.write(`</${tagName}>`);
            }));
        }
        if (tagName === Virtual) {
            const elCtx = createSSRContext(111);
            return elCtx.$parent$ = rCtx.$cmpCtx$, elCtx.$slotParent$ = rCtx.$slotCtx$, hostCtx && 8 & hostCtx.$flags$ && addDynamicSlot(hostCtx, elCtx), 
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
                    await processData(chunk, rCtx, ssrCtx, stream, flags, void 0), stream.write("\x3c!--qkssr-f--\x3e");
                }
            })(node, rCtx, ssrCtx, stream, flags);
        }
        tagName === SSRHint && true === node.props.dynamic && (ssrCtx.$static$.$dynamic$ = true);
        const res = invoke(ssrCtx.$invocationContext$, tagName, node.props, node.key);
        return processData(res, rCtx, ssrCtx, stream, flags, beforeClose);
    };
    const processData = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
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
                            value = node.value;
                            const id = getNextIndex(rCtx);
                            return addSignalSub(2, hostEl, node, "#" + id, "data"), void stream.write(`\x3c!--t=${id}--\x3e${escapeHtml(jsxToString(value))}\x3c!----\x3e`);
                        }
                        value = invoke(ssrCtx.$invocationContext$, (() => node.value));
                    }
                    return void stream.write(escapeHtml(jsxToString(value)));
                }
                return isPromise(node) ? (stream.write("\x3c!--qkssr-f--\x3e"), node.then((node => processData(node, rCtx, ssrCtx, stream, flags, beforeClose)))) : void logWarn("A unsupported value was passed to the JSX, skipping render. Value:", node);
            }
            stream.write(escapeHtml(String(node)));
        }
    };
    const walkChildren = (children, rCtx, ssrContext, stream, flags) => {
        if (null == children) {
            return;
        }
        if (!isArray(children)) {
            return processData(children, rCtx, ssrContext, stream, flags);
        }
        if (1 === children.length) {
            return processData(children[0], rCtx, ssrContext, stream, flags);
        }
        if (0 === children.length) {
            return;
        }
        let currentIndex = 0;
        const buffers = [];
        return children.reduce(((prevPromise, child, index) => {
            const buffer = [];
            buffers.push(buffer);
            const rendered = processData(child, rCtx, ssrContext, prevPromise ? {
                write(chunk) {
                    currentIndex === index ? stream.write(chunk) : buffer.push(chunk);
                }
            } : stream, flags);
            const next = () => {
                currentIndex++, buffers.length > currentIndex && buffers[currentIndex].forEach((chunk => stream.write(chunk)));
            };
            return isPromise(rendered) && prevPromise ? Promise.all([ rendered, prevPromise ]).then(next) : isPromise(rendered) ? rendered.then(next) : prevPromise ? prevPromise.then(next) : void currentIndex++;
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
            const res = invoke(ssrCtx.$invocationContext$, children.type, children.props, children.key);
            return flatVirtualChildren(res, ssrCtx);
        }
        return children;
    };
    const setComponentProps = (rCtx, elCtx, expectProps) => {
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
    const processPropKey = prop => "htmlFor" === prop ? "for" : prop;
    const processPropValue = (prop, value) => "style" === prop ? stringifyStyle(value) : "class" === prop ? serializeClass(value) : isAriaAttribute(prop) || "draggable" === prop || "spellcheck" === prop ? null != value ? String(value) : value : false === value || null == value ? null : true === value ? "" : String(value);
    const invisibleElements = {
        head: true,
        style: true,
        script: true,
        link: true,
        meta: true
    };
    const textOnlyElements = {
        title: true,
        style: true,
        script: true,
        noframes: true,
        textarea: true
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
        wbr: true
    };
    const startPhasingContent = {
        p: true,
        pre: true
    };
    const htmlContent = {
        head: true,
        body: true
    };
    const tableContent = {
        tbody: true,
        thead: true
    };
    const headContent = {
        meta: true,
        title: true,
        link: true,
        style: true,
        script: true,
        noscript: true,
        template: true,
        base: true
    };
    const phasingContent = {
        a: true,
        abbr: true,
        audio: true,
        b: true,
        bdo: true,
        br: true,
        button: true,
        canvas: true,
        cite: true,
        code: true,
        command: true,
        data: true,
        datalist: true,
        dfn: true,
        em: true,
        embed: true,
        i: true,
        iframe: true,
        img: true,
        input: true,
        kbd: true,
        keygen: true,
        label: true,
        mark: true,
        math: true,
        meter: true,
        noscript: true,
        object: true,
        output: true,
        picture: true,
        progress: true,
        q: true,
        ruby: true,
        s: true,
        samp: true,
        script: true,
        select: true,
        small: true,
        span: true,
        strong: true,
        sub: true,
        sup: true,
        svg: true,
        textarea: true,
        time: true,
        u: true,
        var: true,
        video: true,
        wbr: true
    };
    const ESCAPE_HTML = /[&<>]/g;
    const ESCAPE_ATTRIBUTES = /[&"]/g;
    const escapeHtml = s => s.replace(ESCAPE_HTML, (c => {
        switch (c) {
          case "&":
            return "&amp;";

          case "<":
            return "&lt;";

          case ">":
            return "&gt;";

          default:
            return "";
        }
    }));
    const escapeAttr = s => s.replace(ESCAPE_ATTRIBUTES, (c => {
        switch (c) {
          case "&":
            return "&amp;";

          case '"':
            return "&quot;";

          default:
            return "";
        }
    }));
    const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
    const isSSRUnsafeAttr = name => unsafeAttrCharRE.test(name);
    const listenersNeedId = listeners => listeners.some((l => l[1].$captureRef$ && l[1].$captureRef$.length > 0));
    const addDynamicSlot = (hostCtx, elCtx) => {
        let dynamicSlots = hostCtx.$dynamicSlots$;
        dynamicSlots || (hostCtx.$dynamicSlots$ = dynamicSlots = []), dynamicSlots.includes(elCtx) || dynamicSlots.push(elCtx);
    };
    const normalizeInvisibleEvents = eventName => "on:qvisible" === eventName ? "on-document:qinit" : eventName;
    exports.$ = $, exports.Fragment = Fragment, exports.RenderOnce = RenderOnce, exports.Resource = props => {
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
        } else if (resource instanceof Promise) {
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
    }, exports.SSRComment = SSRComment, exports.SSRHint = SSRHint, exports.SSRRaw = SSRRaw, 
    exports.SSRStream = (props, key) => jsx(RenderOnce, {
        children: jsx(InternalSSRStream, props)
    }, key), exports.SSRStreamBlock = props => [ jsx(SSRComment, {
        data: "qkssr-pu"
    }), props.children, jsx(SSRComment, {
        data: "qkssr-po"
    }) ], exports.SkipRender = SkipRender, exports.Slot = props => {
        const name = props.name ?? "";
        return jsx(Virtual, {
            "q:s": ""
        }, name);
    }, exports._IMMUTABLE = _IMMUTABLE, exports._deserializeData = (data, element) => {
        const obj = JSON.parse(data);
        if ("object" != typeof obj) {
            return null;
        }
        const {_objs: _objs, _entry: _entry} = obj;
        if (void 0 === _objs || void 0 === _entry) {
            return null;
        }
        let doc = {};
        let containerState = {};
        if (element && isQwikElement(element)) {
            const containerEl = getWrappingContainer(element);
            containerEl && (containerState = _getContainerState(containerEl), doc = containerEl.ownerDocument);
        }
        const parser = createParser(containerState, doc);
        reviveValues(_objs, parser);
        const getObject = id => _objs[strToInt(id)];
        for (const obj of _objs) {
            reviveNestedObjects(obj, getObject, parser);
        }
        return getObject(_entry);
    }, exports._getContextElement = () => {
        const iCtx = tryGetInvokeContext();
        if (iCtx) {
            return iCtx.$element$ ?? iCtx.$hostElement$ ?? iCtx.$qrl$?.$setContainer$(void 0);
        }
    }, exports._hW = _hW, exports._jsxBranch = input => {
        const iCtx = tryGetInvokeContext();
        if (iCtx && iCtx.$hostElement$ && iCtx.$renderCtx$) {
            const hostElement = iCtx.$hostElement$;
            getContext(hostElement, iCtx.$renderCtx$.$static$.$containerState$).$flags$ |= 8;
        }
        return input;
    }, exports._noopQrl = (symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, null, null, null, lexicalScopeCapture, null), 
    exports._pauseFromContexts = _pauseFromContexts, exports._regSymbol = (symbol, hash) => (void 0 === globalThis.__qwik_reg_symbols && (globalThis.__qwik_reg_symbols = new Map), 
    globalThis.__qwik_reg_symbols.set(hash, symbol), symbol), exports._renderSSR = async (node, opts) => {
        const root = opts.containerTagName;
        const containerEl = createSSRContext(1).$element$;
        const containerState = createContainerState(containerEl, opts.base ?? "/");
        containerState.$serverData$.locale = opts.serverData?.locale;
        const doc = (() => {
            const doc = {
                nodeType: 9
            };
            return seal(doc), doc;
        })();
        const rCtx = createRenderContext(doc, containerState);
        const headNodes = opts.beforeContent ?? [];
        const ssrCtx = {
            $static$: {
                $contexts$: [],
                $dynamic$: false,
                $headNodes$: "html" === root ? headNodes : [],
                $locale$: opts.serverData?.locale
            },
            $projectedChildren$: void 0,
            $projectedCtxs$: void 0,
            $invocationContext$: void 0
        };
        seal(ssrCtx);
        let qRender = qDev ? "ssr-dev" : "ssr";
        opts.containerAttributes["q:render"] && (qRender = `${opts.containerAttributes["q:render"]}-${qRender}`);
        const containerAttributes = {
            ...opts.containerAttributes,
            "q:container": "paused",
            "q:version": "0.20.2",
            "q:render": qRender,
            "q:base": opts.base,
            "q:locale": opts.serverData?.locale,
            children: "html" === root ? [ node ] : [ headNodes, node ]
        };
        "html" !== root && (containerAttributes.class = "qc📦" + (containerAttributes.class ? " " + containerAttributes.class : "")), 
        containerState.$serverData$ = {
            url: opts.url,
            ...opts.serverData
        }, node = jsx(root, containerAttributes), containerState.$hostsRendering$ = new Set, 
        containerState.$renderPromise$ = Promise.resolve().then((() => (async (node, rCtx, ssrCtx, stream, containerState, opts) => {
            const beforeClose = opts.beforeClose;
            return await renderNode(node, rCtx, ssrCtx, stream, 0, beforeClose ? stream => {
                const result = beforeClose(ssrCtx.$static$.$contexts$, containerState, ssrCtx.$static$.$dynamic$);
                return processData(result, rCtx, ssrCtx, stream, 0, void 0);
            } : void 0), qDev && ssrCtx.$static$.$headNodes$.length > 0 && logError("Missing <head>. Global styles could not be rendered. Please render a <head> element at the root of the app"), 
            rCtx;
        })(node, rCtx, ssrCtx, opts.stream, containerState, opts))), await containerState.$renderPromise$;
    }, exports._restProps = (props, omit) => {
        const rest = {};
        for (const key in props) {
            omit.includes(key) || (rest[key] = props[key]);
        }
        return rest;
    }, exports._serializeData = async (data, pureQRL) => {
        const containerState = {};
        const collector = createCollector(containerState);
        let promises;
        for (collectValue(data, collector, false); (promises = collector.$promises$).length > 0; ) {
            collector.$promises$ = [], await Promise.all(promises);
        }
        const objs = Array.from(collector.$objSet$.keys());
        let count = 0;
        const objToId = new Map;
        for (const obj of objs) {
            objToId.set(obj, intToStr(count)), count++;
        }
        if (collector.$noSerialize$.length > 0) {
            const undefinedID = objToId.get(void 0);
            assertDefined(undefinedID, "undefined ID must be defined");
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
                obj = promiseValue.value, promiseValue.resolved ? suffix += "~" : suffix += "_";
            }
            const key = objToId.get(obj);
            if (void 0 === key) {
                throw qError(27, obj);
            }
            return key + suffix;
        };
        const convertedObjs = objs.map((obj => {
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
              case "boolean":
                return obj;
            }
            const value = serializeValue(obj, mustGetObjId, containerState);
            if (void 0 !== value) {
                return value;
            }
            if ("object" === typeObj) {
                if (isArray(obj)) {
                    return obj.map(mustGetObjId);
                }
                if (isSerializableObject(obj)) {
                    const output = {};
                    for (const key of Object.keys(obj)) {
                        output[key] = mustGetObjId(obj[key]);
                    }
                    return output;
                }
            }
            throw qError(3, obj);
        }));
        return JSON.stringify({
            _entry: mustGetObjId(data),
            _objs: convertedObjs
        });
    }, exports._verifySerializable = verifySerializable, exports._weakSerialize = input => (weakSerializeSet.add(input), 
    input), exports._wrapProp = _wrapProp, exports._wrapSignal = (obj, prop) => {
        const r = _wrapProp(obj, prop);
        return r === _IMMUTABLE ? obj[prop] : r;
    }, exports.component$ = onMount => componentQrl($(onMount)), exports.componentQrl = componentQrl, 
    exports.createContext = name => createContextId(name), exports.createContextId = createContextId, 
    exports.getLocale = function(defaultLocale) {
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
    }, exports.getPlatform = getPlatform, exports.h = function(type, props, ...children) {
        const normalizedProps = {
            children: arguments.length > 2 ? flattenArray(children) : EMPTY_ARRAY
        };
        let key;
        let i;
        for (i in props) {
            "key" == i ? key = props[i] : normalizedProps[i] = props[i];
        }
        return new JSXNodeImpl(type, normalizedProps, key);
    }, exports.implicit$FirstArg = implicit$FirstArg, exports.inlinedQrl = inlinedQrl, 
    exports.inlinedQrlDEV = (symbol, symbolName, opts, lexicalScopeCapture = EMPTY_ARRAY) => {
        const qrl = inlinedQrl(symbol, symbolName, lexicalScopeCapture);
        return qrl.dev = opts, qrl;
    }, exports.jsx = jsx, exports.jsxDEV = (type, props, key, isStatic, opts, ctx) => {
        const processed = null == key ? null : String(key);
        const node = new JSXNodeImpl(type, props, processed);
        return node.dev = {
            isStatic: isStatic,
            ctx: ctx,
            stack: (new Error).stack,
            ...opts
        }, seal(node), node;
    }, exports.jsxs = jsx, exports.mutable = v => (console.warn("mutable() is deprecated, you can safely remove all usages of mutable() in your code"), 
    v), exports.noSerialize = noSerialize, exports.qrl = qrl, exports.qrlDEV = (chunkOrFn, symbol, opts, lexicalScopeCapture = EMPTY_ARRAY) => {
        const newQrl = qrl(chunkOrFn, symbol, lexicalScopeCapture, 1);
        return newQrl.dev = opts, newQrl;
    }, exports.render = async (parent, jsxNode, opts) => {
        isJSXNode(jsxNode) || (jsxNode = jsx(jsxNode, null));
        const doc = getDocument(parent);
        const containerEl = isDocument(docOrElm = parent) ? docOrElm.documentElement : docOrElm;
        var docOrElm;
        if (qDev && containerEl.hasAttribute("q:container")) {
            throw qError(5, containerEl);
        }
        (containerEl => {
            directSetAttribute(containerEl, "q:version", "0.20.2"), directSetAttribute(containerEl, "q:container", "resumed"), 
            directSetAttribute(containerEl, "q:render", qDev ? "dom-dev" : "dom");
        })(containerEl);
        const containerState = _getContainerState(containerEl);
        const serverData = opts?.serverData;
        serverData && Object.assign(containerState.$serverData$, serverData), containerState.$hostsRendering$ = new Set, 
        containerState.$renderPromise$ = (async (parent, jsxNode, doc, containerState, containerEl) => {
            const rCtx = createRenderContext(doc, containerState);
            const staticCtx = rCtx.$static$;
            try {
                const processedNodes = await processData$1(jsxNode);
                const rootJsx = domToVnode(parent);
                await visitJsxNode(rCtx, rootJsx, wrapJSX(parent, processedNodes), 0);
            } catch (err) {
                logError(err);
            }
            return staticCtx.$operations$.push(...staticCtx.$postOperations$), executeDOMRender(staticCtx), 
            qDev && (appendQwikDevTools(containerEl), printRenderStats(staticCtx)), rCtx;
        })(containerEl, jsxNode, doc, containerState, containerEl);
        const renderCtx = await containerState.$renderPromise$;
        await postRendering(containerState, renderCtx);
    }, exports.setPlatform = plt => _platform = plt, exports.untrack = untrack, exports.useBrowserVisibleTask$ = useBrowserVisibleTask$, 
    exports.useBrowserVisibleTaskQrl = useBrowserVisibleTaskQrl, exports.useCleanup$ = useCleanup$, 
    exports.useCleanupQrl = useCleanupQrl, exports.useClientEffect$ = useClientEffect$, 
    exports.useClientEffectQrl = useClientEffectQrl, exports.useClientMount$ = useClientMount$, 
    exports.useClientMountQrl = useClientMountQrl, exports.useComputed$ = useComputed$, 
    exports.useComputedQrl = useComputedQrl, exports.useContext = (context, defaultValue) => {
        const {get: get, set: set, iCtx: iCtx, elCtx: elCtx} = useSequentialScope();
        if (void 0 !== get) {
            return get;
        }
        qDev && validateContext(context);
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
    }, exports.useContextProvider = useContextProvider, exports.useEnvData = useEnvData, 
    exports.useErrorBoundary = () => {
        const store = useStore({
            error: void 0
        });
        return useOn("error-boundary", qrl("/runtime", "error", [ store ])), useContextProvider(ERROR_CONTEXT, store), 
        store;
    }, exports.useId = () => {
        const {get: get, set: set, elCtx: elCtx, iCtx: iCtx} = useSequentialScope();
        if (null != get) {
            return get;
        }
        const containerBase = iCtx.$renderCtx$?.$static$?.$containerState$?.$base$ || "";
        return set(`${containerBase ? hashCode(containerBase) : ""}-${elCtx.$componentQrl$?.getHash() || ""}-${getNextIndex(iCtx.$renderCtx$) || ""}`);
    }, exports.useLexicalScope = useLexicalScope, exports.useMount$ = useMount$, exports.useMountQrl = useMountQrl, 
    exports.useOn = useOn, exports.useOnDocument = useOnDocument, exports.useOnWindow = (event, eventQrl) => _useOn(`window:on-${event}`, eventQrl), 
    exports.useRef = current => useStore({
        current: current
    }), exports.useResource$ = (generatorFn, opts) => useResourceQrl($(generatorFn), opts), 
    exports.useResourceQrl = useResourceQrl, exports.useServerData = useServerData, 
    exports.useServerMount$ = useServerMount$, exports.useServerMountQrl = useServerMountQrl, 
    exports.useSignal = initialState => {
        const {get: get, set: set, iCtx: iCtx} = useSequentialScope();
        if (null != get) {
            return get;
        }
        const containerState = iCtx.$renderCtx$.$static$.$containerState$;
        const value = isFunction(initialState) ? invoke(void 0, initialState) : initialState;
        return set(_createSignal(value, containerState, 0, void 0));
    }, exports.useStore = useStore, exports.useStyles$ = useStyles$, exports.useStylesQrl = useStylesQrl, 
    exports.useStylesScoped$ = useStylesScoped$, exports.useStylesScopedQrl = useStylesScopedQrl, 
    exports.useTask$ = useTask$, exports.useTaskQrl = useTaskQrl, exports.useUserContext = useUserContext, 
    exports.useVisibleTask$ = useVisibleTask$, exports.useVisibleTaskQrl = useVisibleTaskQrl, 
    exports.useWatch$ = useWatch$, exports.useWatchQrl = useWatchQrl, exports.version = "0.20.2", 
    exports.withLocale = function(locale, fn) {
        const previousLang = _locale;
        try {
            return _locale = locale, fn();
        } finally {
            _locale = previousLang;
        }
    };
}));
