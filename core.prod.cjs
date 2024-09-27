/**
 * @license
 * @builder.io/qwik 2.0.0-0-dev+5f846e5
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
!function(global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? factory(exports, require("@builder.io/qwik/build")) : "function" == typeof define && define.amd ? define([ "exports", "@builder.io/qwik/build" ], factory) : factory((global = "undefined" != typeof globalThis ? globalThis : global || self).qwikCore = {}, global.qwikBuild);
}(this, (function(exports, build) {
    "use strict";
    const qDev = !1;
    const qInspector = !1;
    const seal = obj => {
        qDev && Object.seal(obj);
    };
    const STYLE = qDev ? "background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;" : "";
    const logError = (message, ...optionalParams) => createAndLogError(!1, message, ...optionalParams);
    const throwErrorAndStop = (message, ...optionalParams) => {
        throw createAndLogError(!1, message, ...optionalParams);
    };
    const _printed = /*#__PURE__*/ new Set;
    const logWarn = (message, ...optionalParams) => {
        qDev && console.warn("%cQWIK WARN", STYLE, message, ...optionalParams);
    };
    const createAndLogError = (asyncThrow, message, ...optionalParams) => {
        const err = message instanceof Error ? message : new Error(message);
        return console.error("%cQWIK ERROR", STYLE, err.message, ...optionalParams, err.stack), 
        asyncThrow && setTimeout((() => {
            throw err;
        }), 0), err;
    };
    const ASSERT_DISCLAIMER = "Internal assert, this is likely caused by a bug in Qwik: ";
    function assertDefined(value, text, ...parts) {
        if (qDev) {
            if (null != value) {
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
    function assertTrue(value1, text, ...parts) {
        if (qDev) {
            if (!0 === value1) {
                return;
            }
            throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
        }
    }
    function assertFalse(value1, text, ...parts) {
        if (qDev) {
            if (!1 === value1) {
                return;
            }
            throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
        }
    }
    const qError = (code, ...parts) => {
        const text = ((code, ...parts) => {
            if (qDev) {
                let text = [ "Error while serializing class attribute", "Can not serialize a HTML Node that is not an Element", "Runtime but no instance found on element.", "Only primitive and object literals can be serialized", "Crash while rendering", "You can render over a existing q:container. Skipping render().", "Set property {{0}}", "Only function's and 'string's are supported.", "Only objects can be wrapped in 'QObject'", "Only objects literals can be wrapped in 'QObject'", "QRL is not a function", "Dynamic import not found", "Unknown type argument", "Actual value for useContext({{0}}) can not be found, make sure some ancestor component has set a value using useContextProvider(). In the browser make sure that the context was used during SSR so its state was serialized.", "Invoking 'use*()' method outside of invocation context.", "Cant access renderCtx for existing context", "Cant access document for existing context", "props are immutable", "<div> component can only be used at the root of a Qwik component$()", "Props are immutable by default.", "Calling a 'use*()' method outside 'component$(() => { HERE })' is not allowed. 'use*()' methods provide hooks to the 'component$' state and lifecycle, ie 'use' hooks can only be called synchronously within the 'component$' function or another 'use' method.\nSee https://qwik.dev/docs/components/tasks/#use-method-rules", "Container is already paused. Skipping", "", "When rendering directly on top of Document, the root node must be a <html>", "A <html> node must have 2 children. The first one <head> and the second one a <body>", 'Invalid JSXNode type "{{0}}". It must be either a function or a string. Found:', "Tracking value changes can only be done to useStore() objects and component props", "Missing Object ID for captured object", 'The provided Context reference "{{0}}" is not a valid context created by createContextId()', "<html> is the root container, it can not be rendered inside a component", "QRLs can not be resolved because it does not have an attached container. This means that the QRL does not know where it belongs inside the DOM, so it cant dynamically import() from a relative path.", "QRLs can not be dynamically resolved, because it does not have a chunk path", "The JSX ref attribute must be a Signal" ][code] ?? "";
                return parts.length && (text = text.replaceAll(/{{(\d+)}}/g, ((_, index) => {
                    let v = parts[index];
                    return v && "object" == typeof v && v.constructor === Object && (v = JSON.stringify(v).slice(0, 50)), 
                    v;
                }))), `Code(${code}): ${text}`;
            }
            return `Code(${code}) https://github.com/QwikDev/qwik/blob/main/packages/qwik/src/core/error/error.ts#L${8 + code}`;
        })(code, ...parts);
        return ((message, ...optionalParams) => createAndLogError(!0, message, ...optionalParams))(text, ...parts);
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
    const isNode = value => value && "number" == typeof value.nodeType;
    const isElement$1 = value => 1 === value.nodeType;
    const isPromise = value => !!value && "object" == typeof value && "function" == typeof value.then;
    const safeCall = (call, thenFn, rejectFn) => {
        try {
            const result = call();
            return isPromise(result) ? result.then(thenFn, rejectFn) : thenFn(result);
        } catch (e) {
            return rejectFn(e);
        }
    };
    const maybeThen = (valueOrPromise, thenFn) => isPromise(valueOrPromise) ? valueOrPromise.then(thenFn, shouldNotError) : thenFn(valueOrPromise);
    const shouldNotError = reason => {
        throwErrorAndStop("QWIK ERROR:", reason);
    };
    const delay = timeout => new Promise((resolve => {
        setTimeout(resolve, timeout);
    }));
    const isSerializableObject = v => {
        const proto = Object.getPrototypeOf(v);
        return proto === Object.prototype || proto === Array.prototype || null === proto;
    };
    const isObject = v => !!v && "object" == typeof v;
    const isArray = v => Array.isArray(v);
    const isString = v => "string" == typeof v;
    const isFunction = v => "function" == typeof v;
    const EMPTY_ARRAY = [];
    const EMPTY_OBJ = {};
    Object.freeze(EMPTY_ARRAY), Object.freeze(EMPTY_OBJ);
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
        return announcedQRL.has(symbol) || (announcedQRL.add(symbol), emitEvent("qprefetch", {
            symbols: [ getSymbolHash(symbol) ],
            bundles: chunk && [ chunk ]
        })), createQRL(chunk, symbol, null, symbolFn, null, lexicalScopeCapture, null);
    };
    const inlinedQrl = (symbol, symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, symbol, null, null, lexicalScopeCapture, null);
    const _noopQrl = (symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, null, null, null, lexicalScopeCapture, null);
    const DEBUG_TYPE = "q:type";
    var VirtualType;
    !function(VirtualType) {
        VirtualType.Virtual = "V", VirtualType.Fragment = "F", VirtualType.WrappedSignal = "S", 
        VirtualType.Awaited = "A", VirtualType.Component = "C", VirtualType.InlineComponent = "I", 
        VirtualType.Projection = "P";
    }(VirtualType || (VirtualType = {}));
    const VirtualTypeName = {
        [VirtualType.Virtual]: "[34mVirtual[0m",
        [VirtualType.Fragment]: "[34mFragment[0m",
        [VirtualType.WrappedSignal]: "[34mSignal[0m",
        [VirtualType.Awaited]: "[34mAwaited[0m",
        [VirtualType.Component]: "[34mComponent[0m",
        [VirtualType.InlineComponent]: "[34mInlineComponent[0m",
        [VirtualType.Projection]: "[34mProjection[0m"
    };
    var QContainerValue;
    !function(QContainerValue) {
        QContainerValue.PAUSED = "paused", QContainerValue.RESUMED = "resumed", QContainerValue.HTML = "html", 
        QContainerValue.TEXT = "text";
    }(QContainerValue || (QContainerValue = {}));
    const QSlot = "q:slot";
    const QSlotParent = ":";
    const QSlotS = "q:s";
    const QScopedStyle = "q:sstyle";
    const QSubscribers = "q:subs";
    const getQFuncs = (document, hash) => document["qFuncs_" + hash] || [];
    const QTemplate = "q:template";
    const QContainerSelector = "[q\\:container]:not([q\\:container=" + QContainerValue.HTML + "]):not([q\\:container=" + QContainerValue.TEXT + "])";
    const HTML_NS = "http://www.w3.org/1999/xhtml";
    const SVG_NS = "http://www.w3.org/2000/svg";
    const MATH_NS = "http://www.w3.org/1998/Math/MathML";
    const QDefaultSlot = "";
    const ELEMENT_KEY = "q:key";
    const NON_SERIALIZABLE_MARKER_PREFIX = ":";
    const USE_ON_LOCAL = NON_SERIALIZABLE_MARKER_PREFIX + "on";
    const USE_ON_LOCAL_SEQ_IDX = NON_SERIALIZABLE_MARKER_PREFIX + "onIdx";
    const USE_ON_LOCAL_FLAGS = NON_SERIALIZABLE_MARKER_PREFIX + "onFlags";
    const FLUSH_COMMENT = "qkssr-f";
    const Q_PROPS_SEPARATOR = ":";
    const Slot = props => _jsxSorted(Virtual, null, {
        [QSlotS]: ""
    }, props.children, 0, props.name ?? "");
    const SkipRender = Symbol("skip render");
    const SSRRaw = () => null;
    const SSRComment = () => null;
    const SSRStream = (props, key) => jsx(RenderOnce, {
        children: jsx(InternalSSRStream, props)
    }, key);
    const InternalSSRStream = () => null;
    let _locale;
    const isQrl$1 = value => "function" == typeof value && "function" == typeof value.getSymbol;
    const useSequentialScope = () => {
        const iCtx = useInvokeContext();
        const host = iCtx.$hostElement$;
        let seq = iCtx.$container$.getHostProp(host, "q:seq");
        null === seq && (seq = [], iCtx.$container$.setHostProp(host, "q:seq", seq));
        let seqIdx = iCtx.$container$.getHostProp(host, "q:seqIdx");
        for (null === seqIdx && (seqIdx = 0), iCtx.$container$.setHostProp(host, "q:seqIdx", seqIdx + 1); seq.length <= seqIdx; ) {
            seq.push(void 0);
        }
        return {
            val: seq[seqIdx],
            set: value => (qDev && verifySerializable(value), seq[seqIdx] = value),
            i: seqIdx,
            iCtx
        };
    };
    const isJsxPropertyAnEventName = name => (name.startsWith("on") || name.startsWith("window:on") || name.startsWith("document:on")) && name.endsWith("$");
    const isHtmlAttributeAnEventName = name => name.startsWith("on:") || name.startsWith("on-window:") || name.startsWith("on-document:");
    const getEventNameFromJsxProp = name => {
        if (name.endsWith("$")) {
            let idx = -1;
            if (name.startsWith("on") ? idx = 2 : name.startsWith("window:on") ? idx = 9 : name.startsWith("document:on") && (idx = 11), 
            -1 != idx) {
                const isCaseSensitive = isDashAt(name, idx) && !isDashAt(name, idx + 1);
                isCaseSensitive && idx++;
                let lastIdx = idx;
                let eventName = "";
                for (;;) {
                    idx = name.indexOf("-", lastIdx);
                    const chunk = name.substring(lastIdx, -1 === idx ? name.length - 1 : idx);
                    if (eventName += isCaseSensitive ? chunk : chunk.toLowerCase(), -1 == idx) {
                        return eventName;
                    }
                    isDashAt(name, idx + 1) ? (eventName += "-", idx++) : (eventName += name.charAt(idx + 1).toUpperCase(), 
                    idx++), lastIdx = idx + 1;
                }
            }
        }
        return null;
    };
    const getEventNameScopeFromJsxProp = name => {
        const index = name.indexOf(":");
        return -1 !== index ? name.substring(0, index) : "";
    };
    const isDashAt = (name, idx) => 45 === name.charCodeAt(idx);
    const convertEventNameFromJsxPropToHtmlAttr = name => {
        if (name.endsWith("$")) {
            let prefix = null;
            if (name.startsWith("on") ? prefix = "on:" : name.startsWith("window:on") ? prefix = "on-window:" : name.startsWith("document:on") && (prefix = "on-document:"), 
            null !== prefix) {
                const eventName = getEventNameFromJsxProp(name);
                return prefix + fromCamelToKebabCase(eventName);
            }
        }
        return null;
    };
    const fromCamelToKebabCase = text => text.replace(/([A-Z-])/g, "-$1").toLowerCase();
    function isPreventDefault(key) {
        return key.startsWith("preventdefault:");
    }
    const createContextId = name => (assertTrue(/^[\w/.-]+$/.test(name), "Context name must only contain A-Z,a-z,0-9, _", name), 
    /*#__PURE__*/ Object.freeze({
        id: fromCamelToKebabCase(name)
    }));
    const useContextProvider = (context, newValue) => {
        const {val, set, iCtx} = useSequentialScope();
        void 0 === val && (qDev && validateContext(context), qDev && verifySerializable(newValue), 
        iCtx.$container$.setContext(iCtx.$hostElement$, context, newValue), set(1));
    };
    const validateContext = context => {
        if (!isObject(context) || "string" != typeof context.id || 0 === context.id.length) {
            throw qError(28, context);
        }
    };
    const ERROR_CONTEXT = /*#__PURE__*/ createContextId("qk-error");
    function isSlotProp(prop) {
        return !prop.startsWith("q:") && !prop.startsWith(NON_SERIALIZABLE_MARKER_PREFIX);
    }
    class Subscriber {
        constructor() {
            this.$effectDependencies$ = null;
        }
    }
    function isSubscriber(value) {
        return value instanceof Subscriber || value instanceof WrappedSignal;
    }
    function clearVNodeEffectDependencies(value) {
        const effects = vnode_getProp(value, QSubscribers, null);
        if (effects) {
            for (let i = effects.length - 1; i >= 0; i--) {
                clearEffects(effects[i], value) && effects.splice(i, 1);
            }
        }
    }
    function clearSubscriberEffectDependencies(value) {
        if (value.$effectDependencies$) {
            for (let i = value.$effectDependencies$.length - 1; i >= 0; i--) {
                clearEffects(value.$effectDependencies$[i], value) && value.$effectDependencies$.splice(i, 1);
            }
        }
    }
    function clearEffects(subscriber, value) {
        if (!isSignal(subscriber)) {
            return !1;
        }
        const effectSubscriptions = subscriber.$effects$;
        if (!effectSubscriptions) {
            return !1;
        }
        let subscriptionRemoved = !1;
        for (let i = effectSubscriptions.length - 1; i >= 0; i--) {
            effectSubscriptions[i][EffectSubscriptionsProp.EFFECT] === value && (effectSubscriptions.splice(i, 1), 
            subscriptionRemoved = !0);
        }
        return subscriptionRemoved;
    }
    const NEEDS_COMPUTATION = {
        __dirty__: !0
    };
    const throwIfQRLNotResolved = qrl => {
        if (!qrl.resolved) {
            throw qrl.resolve();
        }
    };
    const isSignal = value => value instanceof Signal;
    class EffectData {
        constructor(data) {
            this.data = data;
        }
    }
    var EffectSubscriptionsProp;
    var EffectProperty;
    !function(EffectSubscriptionsProp) {
        EffectSubscriptionsProp[EffectSubscriptionsProp.EFFECT = 0] = "EFFECT", EffectSubscriptionsProp[EffectSubscriptionsProp.PROPERTY = 1] = "PROPERTY", 
        EffectSubscriptionsProp[EffectSubscriptionsProp.FIRST_BACK_REF_OR_DATA = 2] = "FIRST_BACK_REF_OR_DATA";
    }(EffectSubscriptionsProp || (EffectSubscriptionsProp = {})), function(EffectProperty) {
        EffectProperty.COMPONENT = ":", EffectProperty.VNODE = ".";
    }(EffectProperty || (EffectProperty = {}));
    class Signal {
        constructor(container, value) {
            this.$effects$ = null, this.$container$ = null, this.$container$ = container, this.$untrackedValue$ = value;
        }
        get untrackedValue() {
            return this.$untrackedValue$;
        }
        set untrackedValue(value) {
            this.$untrackedValue$ = value;
        }
        get value() {
            const ctx = tryGetInvokeContext();
            if (ctx) {
                if (null === this.$container$) {
                    if (!ctx.$container$) {
                        return this.untrackedValue;
                    }
                    this.$container$ = ctx.$container$;
                } else {
                    assertTrue(!ctx.$container$ || ctx.$container$ === this.$container$, "Do not use signals across containers");
                }
                const effectSubscriber = ctx.$effectSubscriber$;
                if (effectSubscriber) {
                    const effects = this.$effects$ || (this.$effects$ = []);
                    ensureContainsEffect(effects, effectSubscriber), ensureContains(effectSubscriber, this), 
                    isSubscriber(this) && ensureEffectContainsSubscriber(effectSubscriber[EffectSubscriptionsProp.EFFECT], this, this.$container$);
                }
            }
            return this.untrackedValue;
        }
        set value(value) {
            value !== this.$untrackedValue$ && (this.$untrackedValue$ = value, triggerEffects(this.$container$, this, this.$effects$));
        }
        valueOf() {
            if (qDev) {
                return throwErrorAndStop("Cannot coerce a Signal, use `.value` instead");
            }
        }
        toString() {
            return `[${this.constructor.name}${this.$invalid$ ? " INVALID" : ""} ${String(this.$untrackedValue$)}]` + (this.$effects$?.map((e => "\n -> " + pad(qwikDebugToString(e[0]), "    "))).join("\n") || "");
        }
        toJSON() {
            return {
                value: this.$untrackedValue$
            };
        }
    }
    const ensureContains = (array, value) => {
        -1 === array.indexOf(value) && array.push(value);
    };
    const ensureContainsEffect = (array, effectSubscriptions) => {
        for (let i = 0; i < array.length; i++) {
            const existingEffect = array[i];
            if (existingEffect[0] === effectSubscriptions[0] && existingEffect[1] === effectSubscriptions[1]) {
                return;
            }
        }
        array.push(effectSubscriptions);
    };
    const ensureEffectContainsSubscriber = (effect, subscriber, container) => {
        if (isSubscriber(effect)) {
            if (effect.$effectDependencies$ || (effect.$effectDependencies$ = []), subscriberExistInSubscribers(effect.$effectDependencies$, subscriber)) {
                return;
            }
            effect.$effectDependencies$.push(subscriber);
        } else if (vnode_isVNode(effect) && vnode_isVirtualVNode(effect)) {
            let subscribers = vnode_getProp(effect, QSubscribers, container ? container.$getObjectById$ : null);
            if (subscribers || (subscribers = []), subscriberExistInSubscribers(subscribers, subscriber)) {
                return;
            }
            subscribers.push(subscriber), vnode_setProp(effect, QSubscribers, subscribers);
        } else if (isSSRNode(effect)) {
            let subscribers = effect.getProp(QSubscribers);
            if (subscribers || (subscribers = []), subscriberExistInSubscribers(subscribers, subscriber)) {
                return;
            }
            subscribers.push(subscriber), effect.setProp(QSubscribers, subscribers);
        }
    };
    const isSSRNode = effect => "setProp" in effect && "getProp" in effect && "removeProp" in effect && "id" in effect;
    const subscriberExistInSubscribers = (subscribers, subscriber) => {
        for (let i = 0; i < subscribers.length; i++) {
            if (subscribers[i] === subscriber) {
                return !0;
            }
        }
        return !1;
    };
    const triggerEffects = (container, signal, effects) => {
        if (effects) {
            const scheduleEffect = effectSubscriptions => {
                const effect = effectSubscriptions[EffectSubscriptionsProp.EFFECT];
                const property = effectSubscriptions[EffectSubscriptionsProp.PROPERTY];
                if (assertDefined(container, "Container must be defined."), isTask(effect)) {
                    effect.$flags$ |= TaskFlags.DIRTY;
                    let choreType = ChoreType.TASK;
                    effect.$flags$ & TaskFlags.VISIBLE_TASK ? choreType = ChoreType.VISIBLE : effect.$flags$ & TaskFlags.RESOURCE && (choreType = ChoreType.RESOURCE), 
                    container.$scheduler$(choreType, effect);
                } else if (effect instanceof Signal) {
                    effect instanceof ComputedSignal && (effect.$computeQrl$.resolved || container.$scheduler$(ChoreType.QRL_RESOLVE, null, effect.$computeQrl$)), 
                    effect.$invalid$ = !0;
                    const previousSignal = signal;
                    try {
                        signal = effect, effect.$effects$?.forEach(scheduleEffect);
                    } catch (e) {
                        logError(e);
                    } finally {
                        signal = previousSignal;
                    }
                } else if (property === EffectProperty.COMPONENT) {
                    const host = effect;
                    const qrl = container.getHostProp(host, "q:renderFn");
                    assertDefined(qrl, "Component must have QRL");
                    const props = container.getHostProp(host, "q:props");
                    container.$scheduler$(ChoreType.COMPONENT, host, qrl, props);
                } else if (property === EffectProperty.VNODE) {
                    container.$scheduler$(ChoreType.NODE_DIFF, effect, effect, signal);
                } else {
                    let effectData = effectSubscriptions[EffectSubscriptionsProp.FIRST_BACK_REF_OR_DATA];
                    if (effectData instanceof EffectData) {
                        const payload = {
                            ...effectData.data,
                            $value$: signal
                        };
                        container.$scheduler$(ChoreType.NODE_PROP, effect, property, payload);
                    }
                }
            };
            effects.forEach(scheduleEffect);
        }
    };
    class ComputedSignal extends Signal {
        constructor(container, fn) {
            super(container, NEEDS_COMPUTATION), this.$invalid$ = !0, this.$computeQrl$ = fn;
        }
        $invalidate$() {
            this.$invalid$ = !0, this.$effects$?.length && this.$computeIfNeeded$() && triggerEffects(this.$container$, this, this.$effects$);
        }
        force() {
            this.$invalid$ = !0, triggerEffects(this.$container$, this, this.$effects$);
        }
        get untrackedValue() {
            return this.$computeIfNeeded$(), assertFalse(this.$untrackedValue$ === NEEDS_COMPUTATION, "Invalid state"), 
            this.$untrackedValue$;
        }
        $computeIfNeeded$() {
            if (!this.$invalid$) {
                return !1;
            }
            const computeQrl = this.$computeQrl$;
            throwIfQRLNotResolved(computeQrl);
            const ctx = tryGetInvokeContext();
            const previousEffectSubscription = ctx?.$effectSubscriber$;
            ctx && (ctx.$effectSubscriber$ = [ this, EffectProperty.VNODE ]);
            try {
                const untrackedValue = computeQrl.getFn(ctx)();
                isPromise(untrackedValue) && throwErrorAndStop(`useComputedSignal$ QRL ${computeQrl.dev ? `${computeQrl.dev.file} ` : ""}${computeQrl.$hash$} returned a Promise`), 
                this.$invalid$ = !1;
                const didChange = untrackedValue !== this.$untrackedValue$;
                return this.$untrackedValue$ = untrackedValue, didChange;
            } finally {
                ctx && (ctx.$effectSubscriber$ = previousEffectSubscription);
            }
        }
        get value() {
            return super.value;
        }
        set value(_) {
            throwErrorAndStop("ComputedSignal is read-only");
        }
    }
    class WrappedSignal extends Signal {
        constructor(container, fn, args, fnStr) {
            super(container, NEEDS_COMPUTATION), this.$invalid$ = !0, this.$effectDependencies$ = null, 
            this.$args$ = args, this.$func$ = fn, this.$funcStr$ = fnStr;
        }
        $invalidate$() {
            this.$invalid$ = !0, this.$effects$?.length && this.$computeIfNeeded$() && triggerEffects(this.$container$, this, this.$effects$);
        }
        force() {
            this.$invalid$ = !0, triggerEffects(this.$container$, this, this.$effects$);
        }
        get untrackedValue() {
            return this.$computeIfNeeded$(), assertFalse(this.$untrackedValue$ === NEEDS_COMPUTATION, "Invalid state"), 
            this.$untrackedValue$;
        }
        $computeIfNeeded$() {
            if (!this.$invalid$) {
                return !1;
            }
            this.$untrackedValue$ = trackSignal((() => this.$func$(...this.$args$)), this, EffectProperty.VNODE, this.$container$);
        }
        get value() {
            return super.value;
        }
        set value(_) {
            throwErrorAndStop("WrappedSignal is read-only");
        }
    }
    const STORE_TARGET = Symbol("store.target");
    const STORE_HANDLER = Symbol("store.handler");
    const STORE_ARRAY_PROP = Symbol("store.array");
    var StoreFlags;
    !function(StoreFlags) {
        StoreFlags[StoreFlags.NONE = 0] = "NONE", StoreFlags[StoreFlags.RECURSIVE = 1] = "RECURSIVE", 
        StoreFlags[StoreFlags.IMMUTABLE = 2] = "IMMUTABLE";
    }(StoreFlags || (StoreFlags = {}));
    const getStoreHandler = value => value[STORE_HANDLER];
    const getStoreTarget = value => value?.[STORE_TARGET] || null;
    const unwrapStore = value => getStoreTarget(value) || value;
    const isStore = value => unwrapStore(value) !== value;
    function createStore(container, obj, flags) {
        return new Proxy(obj, new StoreHandler(flags, container || null));
    }
    const getOrCreateStore = (obj, flags, container) => {
        if (isSerializableObject(obj) && container) {
            let store = container.$storeProxyMap$.get(obj);
            return store || (store = createStore(container, obj, flags), container.$storeProxyMap$.set(obj, store)), 
            store;
        }
        return obj;
    };
    class StoreHandler {
        constructor($flags$, $container$) {
            this.$flags$ = $flags$, this.$container$ = $container$, this.$effects$ = null;
        }
        toString() {
            return "[Store]";
        }
        get(target, prop) {
            if ("symbol" == typeof prop) {
                if (prop === STORE_TARGET) {
                    return target;
                }
                if (prop === STORE_HANDLER) {
                    return this;
                }
                if (prop === SERIALIZER_PROXY_UNWRAP) {
                    return;
                }
                return target[prop];
            }
            const ctx = tryGetInvokeContext();
            let value = target[prop];
            if (ctx) {
                if (null === this.$container$) {
                    if (!ctx.$container$) {
                        return value;
                    }
                    this.$container$ = ctx.$container$;
                } else {
                    assertTrue(!ctx.$container$ || ctx.$container$ === this.$container$, "Do not use signals across containers");
                }
                const effectSubscriber = ctx.$effectSubscriber$;
                effectSubscriber && addEffect(target, Array.isArray(target) ? STORE_ARRAY_PROP : prop, this, effectSubscriber);
            }
            if ("toString" === prop && value === Object.prototype.toString) {
                return this.toString;
            }
            return this.$flags$ & StoreFlags.RECURSIVE && "object" == typeof value && null !== value && !Object.isFrozen(value) && !isStore(value) && !Object.isFrozen(target) && (value = getOrCreateStore(value, this.$flags$, this.$container$), 
            target[prop] = value), value;
        }
        set(target, prop, value) {
            if (target = unwrapDeserializerProxy(target), "symbol" == typeof prop) {
                return target[prop] = value, !0;
            }
            const newValue = this.$flags$ & StoreFlags.RECURSIVE ? unwrapStore(value) : value;
            if (prop in target) {
                newValue !== target[prop] && setNewValueAndTriggerEffects(prop, newValue, target, this);
            } else {
                setNewValueAndTriggerEffects(prop, newValue, target, this);
            }
            return !0;
        }
        deleteProperty(target, prop) {
            return "string" == typeof prop && delete target[prop] && (triggerEffects(this.$container$, this, getEffects(target, prop, this.$effects$)), 
            !0);
        }
        has(target, prop) {
            return prop === STORE_TARGET || Object.prototype.hasOwnProperty.call(target, prop);
        }
        ownKeys(target) {
            const ctx = tryGetInvokeContext();
            const effectSubscriber = ctx?.$effectSubscriber$;
            return effectSubscriber && addEffect(target, STORE_ARRAY_PROP, this, effectSubscriber), 
            Reflect.ownKeys(target);
        }
        getOwnPropertyDescriptor(target, prop) {
            return Array.isArray(target) || "symbol" == typeof prop ? Object.getOwnPropertyDescriptor(target, prop) : {
                enumerable: !0,
                configurable: !0
            };
        }
    }
    function addEffect(target, prop, store, effectSubscriber) {
        const effectsMap = store.$effects$ || (store.$effects$ = {});
        const effects = Object.prototype.hasOwnProperty.call(effectsMap, prop) && effectsMap[prop] || (effectsMap[prop] = []);
        ensureContainsEffect(effects, effectSubscriber), ensureContains(effectSubscriber, target);
    }
    function setNewValueAndTriggerEffects(prop, value, target, currentStore) {
        target[prop] = value, triggerEffects(currentStore.$container$, currentStore, getEffects(target, prop, currentStore.$effects$));
    }
    function getEffects(target, prop, storeEffects) {
        let effectsToTrigger = storeEffects ? Array.isArray(target) ? Object.values(storeEffects).flatMap((effects => effects)) : storeEffects[prop] : null;
        const storeArrayValue = storeEffects?.[STORE_ARRAY_PROP];
        return storeArrayValue && (effectsToTrigger || (effectsToTrigger = []), effectsToTrigger.push(...storeArrayValue)), 
        effectsToTrigger;
    }
    const useResourceQrl = (qrl, opts) => {
        const {val, set, i, iCtx} = useSequentialScope();
        if (null != val) {
            return val;
        }
        assertQrl(qrl);
        const container = iCtx.$container$;
        const resource = createResourceReturn(container, opts);
        const task = new Task(TaskFlags.DIRTY | TaskFlags.RESOURCE, i, iCtx.$hostElement$, qrl, resource, null);
        return runResource(task, container, iCtx.$hostElement$), set(resource), resource;
    };
    const createResourceReturn = (container, opts, initialPromise) => {
        const result = (opts => ({
            __brand: "resource",
            value: void 0,
            loading: !isServerPlatform(),
            _resolved: void 0,
            _error: void 0,
            _state: "pending",
            _timeout: opts?.timeout ?? -1,
            _cache: 0
        }))(opts);
        return result.value = initialPromise, createStore(container, result, StoreFlags.RECURSIVE);
    };
    const isResourceReturn = obj => isObject(obj) && "resource" === (getStoreTarget(obj) || obj).__brand;
    const runResource = (task, container, host) => {
        task.$flags$ &= ~TaskFlags.DIRTY, cleanupTask(task);
        const iCtx = newInvokeContext(container.$locale$, host, void 0, "qResource");
        iCtx.$container$ = container;
        const taskFn = task.$qrl$.getFn(iCtx, (() => clearSubscriberEffectDependencies(task)));
        const resource = task.$state$;
        assertDefined(resource, 'useResource: when running a resource, "task.resource" must be a defined.', task);
        const cleanups = [];
        task.$destroy$ = noSerialize((() => {
            cleanups.forEach((fn => {
                try {
                    fn();
                } catch (err) {
                    container.handleError(err, host);
                }
            })), done = !0;
        }));
        const resourceTarget = unwrapStore(resource);
        const opts = {
            track: (obj, prop) => {
                const ctx = newInvokeContext();
                return ctx.$effectSubscriber$ = [ task, EffectProperty.COMPONENT ], ctx.$container$ = container, 
                invoke(ctx, (() => isFunction(obj) ? obj() : prop ? obj[prop] : isSignal(obj) ? obj.value : obj));
            },
            cleanup(fn) {
                "function" == typeof fn && cleanups.push(fn);
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
        cleanups.push((() => {
            if (!0 === untrack((() => resource.loading))) {
                const value = untrack((() => resource._resolved));
                setState(!0, value);
            }
        })), invoke(iCtx, (() => {
            resource._state = "pending", resource.loading = !isServerPlatform();
            (resource.value = new Promise(((r, re) => {
                resolve = r, reject = re;
            }))).catch(ignoreErrorToPreventNodeFromCrashing);
        }));
        const promise = safeCall((() => Promise.resolve(taskFn(opts))), (value => {
            setState(!0, value);
        }), (err => {
            if (isPromise(err)) {
                return err.then((() => runResource(task, container, host)));
            }
            setState(!1, err);
        }));
        const timeout = resourceTarget._timeout;
        return timeout > 0 ? Promise.race([ promise, delay(timeout).then((() => {
            setState(!1, new Error("timeout")) && cleanupTask(task);
        })) ]) : promise;
    };
    const ignoreErrorToPreventNodeFromCrashing = () => {};
    var VNodeFlags;
    var VNodeFlagsIndex;
    var VNodeProps;
    var ElementVNodeProps;
    var TextVNodeProps;
    var VirtualVNodeProps;
    !function(VNodeFlags) {
        VNodeFlags[VNodeFlags.Element = 1] = "Element", VNodeFlags[VNodeFlags.Virtual = 2] = "Virtual", 
        VNodeFlags[VNodeFlags.ELEMENT_OR_VIRTUAL_MASK = 3] = "ELEMENT_OR_VIRTUAL_MASK", 
        VNodeFlags[VNodeFlags.ELEMENT_OR_TEXT_MASK = 5] = "ELEMENT_OR_TEXT_MASK", VNodeFlags[VNodeFlags.TYPE_MASK = 7] = "TYPE_MASK", 
        VNodeFlags[VNodeFlags.INFLATED_TYPE_MASK = 15] = "INFLATED_TYPE_MASK", VNodeFlags[VNodeFlags.Text = 4] = "Text", 
        VNodeFlags[VNodeFlags.Inflated = 8] = "Inflated", VNodeFlags[VNodeFlags.Resolved = 16] = "Resolved", 
        VNodeFlags[VNodeFlags.Deleted = 32] = "Deleted", VNodeFlags[VNodeFlags.NAMESPACE_MASK = 192] = "NAMESPACE_MASK", 
        VNodeFlags[VNodeFlags.NEGATED_NAMESPACE_MASK = -193] = "NEGATED_NAMESPACE_MASK", 
        VNodeFlags[VNodeFlags.NS_html = 0] = "NS_html", VNodeFlags[VNodeFlags.NS_svg = 64] = "NS_svg", 
        VNodeFlags[VNodeFlags.NS_math = 128] = "NS_math";
    }(VNodeFlags || (VNodeFlags = {})), function(VNodeFlagsIndex) {
        VNodeFlagsIndex[VNodeFlagsIndex.mask = -256] = "mask", VNodeFlagsIndex[VNodeFlagsIndex.negated_mask = 255] = "negated_mask", 
        VNodeFlagsIndex[VNodeFlagsIndex.shift = 8] = "shift";
    }(VNodeFlagsIndex || (VNodeFlagsIndex = {})), function(VNodeProps) {
        VNodeProps[VNodeProps.flags = 0] = "flags", VNodeProps[VNodeProps.parent = 1] = "parent", 
        VNodeProps[VNodeProps.previousSibling = 2] = "previousSibling", VNodeProps[VNodeProps.nextSibling = 3] = "nextSibling";
    }(VNodeProps || (VNodeProps = {})), function(ElementVNodeProps) {
        ElementVNodeProps[ElementVNodeProps.firstChild = 4] = "firstChild", ElementVNodeProps[ElementVNodeProps.lastChild = 5] = "lastChild", 
        ElementVNodeProps[ElementVNodeProps.element = 6] = "element", ElementVNodeProps[ElementVNodeProps.elementName = 7] = "elementName", 
        ElementVNodeProps[ElementVNodeProps.PROPS_OFFSET = 8] = "PROPS_OFFSET";
    }(ElementVNodeProps || (ElementVNodeProps = {})), function(TextVNodeProps) {
        TextVNodeProps[TextVNodeProps.node = 4] = "node", TextVNodeProps[TextVNodeProps.text = 5] = "text";
    }(TextVNodeProps || (TextVNodeProps = {})), function(VirtualVNodeProps) {
        VirtualVNodeProps[VirtualVNodeProps.firstChild = 4] = "firstChild", VirtualVNodeProps[VirtualVNodeProps.lastChild = 5] = "lastChild", 
        VirtualVNodeProps[VirtualVNodeProps.PROPS_OFFSET = 6] = "PROPS_OFFSET";
    }(VirtualVNodeProps || (VirtualVNodeProps = {}));
    const unitlessNumbers = new Set([ "animationIterationCount", "aspectRatio", "borderImageOutset", "borderImageSlice", "borderImageWidth", "boxFlex", "boxFlexGroup", "boxOrdinalGroup", "columnCount", "columns", "flex", "flexGrow", "flexShrink", "gridArea", "gridRow", "gridRowEnd", "gridRowStart", "gridColumn", "gridColumnEnd", "gridColumnStart", "fontWeight", "lineClamp", "lineHeight", "opacity", "order", "orphans", "scale", "tabSize", "widows", "zIndex", "zoom", "MozAnimationIterationCount", "MozBoxFlex", "msFlex", "msFlexPositive", "WebkitAnimationIterationCount", "WebkitBoxFlex", "WebkitBoxOrdinalGroup", "WebkitColumnCount", "WebkitColumns", "WebkitFlex", "WebkitFlexGrow", "WebkitFlexShrink", "WebkitLineClamp" ]);
    const hashCode = (text, hash = 0) => {
        for (let i = 0; i < text.length; i++) {
            hash = (hash << 5) - hash + text.charCodeAt(i), hash |= 0;
        }
        return Number(Math.abs(hash)).toString(36);
    };
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
                        null != value && (key.startsWith("--") ? chunks.push(key + ":" + value) : chunks.push(fromCamelToKebabCase(key) + ":" + setValueForStyle(key, value)));
                    }
                }
                return chunks.join(";");
            }
        }
        return String(obj);
    };
    const serializeBooleanOrNumberAttribute = value => null != value ? String(value) : null;
    function serializeAttribute(key, value, styleScopedId) {
        if (isClassAttr(key)) {
            const serializedClass = serializeClass(value);
            value = styleScopedId ? styleScopedId + (serializedClass.length ? " " + serializedClass : serializedClass) : serializedClass;
        } else {
            "style" === key ? value = stringifyStyle(value) : !function(key) {
                return prop = key, prop.startsWith("aria-") || [ "spellcheck", "draggable", "contenteditable" ].includes(key);
                var prop;
            }(key) && "number" != typeof value ? !1 === value || null == value ? value = null : !0 === value && isPreventDefault(key) && (value = "") : value = serializeBooleanOrNumberAttribute(value);
        }
        return value;
    }
    const setValueForStyle = (styleName, value) => "number" != typeof value || 0 === value || unitlessNumbers.has(styleName) ? value : value + "px";
    const styleContent = styleId => "⭐️" + styleId;
    function hasClassAttr(props) {
        for (const key in props) {
            if (Object.prototype.hasOwnProperty.call(props, key) && isClassAttr(key)) {
                return !0;
            }
        }
        return !1;
    }
    function isClassAttr(key) {
        return "class" === key || "className" === key;
    }
    const addComponentStylePrefix = styleId => {
        if (styleId) {
            let idx = 0;
            do {
                styleId = styleId.substring(0, idx) + styleContent(styleId.substring(idx));
            } while (0 !== (idx = styleId.indexOf(" ", idx) + 1));
        }
        return styleId || null;
    };
    const isForeignObjectElement = elementName => "foreignobject" === elementName.toLowerCase();
    const isSvgElement = elementName => "svg" === elementName || isForeignObjectElement(elementName);
    const isMathElement = elementName => "math" === elementName;
    const vnode_isDefaultNamespace = vnode => !(vnode[VNodeProps.flags] & VNodeFlags.NAMESPACE_MASK);
    function cloneElementWithNamespace(element, elementName, namespace) {
        const newElement = element.ownerDocument.createElementNS(namespace, elementName);
        const attributes = element.attributes;
        for (const attribute of attributes) {
            const name = attribute.name;
            name && name !== Q_PROPS_SEPARATOR && newElement.setAttribute(name, attribute.value);
        }
        return newElement;
    }
    function vnode_cloneElementWithNamespace(elementVNode, parentVNode, namespace, namespaceFlag) {
        ensureElementVNode(elementVNode);
        let vCursor = elementVNode;
        let vParent = null;
        let rootElement = null;
        let parentElement = null;
        for (;vCursor; ) {
            let childElement = null;
            let newChildElement = null;
            if (vnode_isElementVNode(vCursor)) {
                childElement = vCursor[ElementVNodeProps.element];
                const childElementTag = vnode_getElementName(vCursor);
                const vCursorParent = vnode_getParent(vCursor);
                const vCursorDomParent = null == rootElement ? parentVNode : vCursorParent && vnode_getDomParentVNode(vCursorParent);
                if (vCursorDomParent) {
                    const namespaceData = getNewElementNamespaceData(vCursorDomParent, vnode_getElementName(vCursor));
                    namespace = namespaceData.elementNamespace, namespaceFlag = namespaceData.elementNamespaceFlag;
                }
                newChildElement = cloneElementWithNamespace(childElement, childElementTag, namespace), 
                childElement.remove(), null == rootElement && (rootElement = newChildElement), parentElement && parentElement.appendChild(newChildElement);
                const vFirstChild = vnode_getFirstChild(vCursor);
                if (vCursor[ElementVNodeProps.element] = newChildElement, vCursor[VNodeProps.flags] &= VNodeFlags.NEGATED_NAMESPACE_MASK, 
                vCursor[VNodeProps.flags] |= namespaceFlag, vFirstChild) {
                    vCursor = vFirstChild, parentElement = newChildElement;
                    continue;
                }
                if (shouldIgnoreChildren(childElement)) {
                    const container = getDomContainerFromQContainerElement(childElement);
                    if (container) {
                        const innerContainerFirstVNode = vnode_getFirstChild(container.rootVNode);
                        if (innerContainerFirstVNode) {
                            vCursor = innerContainerFirstVNode, parentElement = newChildElement;
                            continue;
                        }
                    }
                }
            }
            if (vCursor === elementVNode) {
                return rootElement;
            }
            const vNextSibling = vnode_getNextSibling(vCursor);
            if (vNextSibling) {
                vCursor = vNextSibling;
            } else {
                for (vParent = vnode_getParent(vCursor); vParent; ) {
                    if (vParent === elementVNode) {
                        return rootElement;
                    }
                    const vNextParentSibling = vnode_getNextSibling(vParent);
                    if (vNextParentSibling) {
                        return vCursor = vNextParentSibling, rootElement;
                    }
                    vParent = vnode_getParent(vParent);
                }
                if (null == vParent) {
                    return rootElement;
                }
            }
        }
        return rootElement;
    }
    function getNewElementNamespaceData(domParentVNode, tagOrVNode) {
        const parentIsDefaultNamespace = !domParentVNode || !!vnode_getElementName(domParentVNode) && vnode_isDefaultNamespace(domParentVNode);
        const parentIsForeignObject = !parentIsDefaultNamespace && isForeignObjectElement(vnode_getElementName(domParentVNode));
        let elementNamespace = HTML_NS;
        let elementNamespaceFlag = VNodeFlags.NS_html;
        const isElementVNodeOrString = "string" == typeof tagOrVNode || vnode_isElementVNode(tagOrVNode);
        if (isElementVNodeOrString && function(tagOrVNode) {
            return "string" == typeof tagOrVNode ? isSvgElement(tagOrVNode) : !!(tagOrVNode[VNodeProps.flags] & VNodeFlags.NS_svg);
        }(tagOrVNode)) {
            elementNamespace = SVG_NS, elementNamespaceFlag = VNodeFlags.NS_svg;
        } else if (isElementVNodeOrString && function(tagOrVNode) {
            return "string" == typeof tagOrVNode ? isMathElement(tagOrVNode) : !!(tagOrVNode[VNodeProps.flags] & VNodeFlags.NS_math);
        }(tagOrVNode)) {
            elementNamespace = MATH_NS, elementNamespaceFlag = VNodeFlags.NS_math;
        } else if (domParentVNode && !parentIsForeignObject && !parentIsDefaultNamespace) {
            elementNamespace = !!(domParentVNode[VNodeProps.flags] & VNodeFlags.NS_svg) ? SVG_NS : !!(domParentVNode[VNodeProps.flags] & VNodeFlags.NS_math) ? MATH_NS : HTML_NS, 
            elementNamespaceFlag = domParentVNode[VNodeProps.flags] & VNodeFlags.NAMESPACE_MASK;
        }
        return {
            elementNamespace,
            elementNamespaceFlag
        };
    }
    const useOn = (event, eventQrl) => {
        _useOn(createEventName(event, void 0), eventQrl);
    };
    const useOnDocument = (event, eventQrl) => {
        _useOn(createEventName(event, "document"), eventQrl);
    };
    const createEventName = (event, eventType) => {
        const prefix = void 0 !== eventType ? eventType + ":" : "";
        const map = name => prefix + "on" + name.charAt(0).toUpperCase() + name.substring(1) + "$";
        return Array.isArray(event) ? event.map(map) : map(event);
    };
    const _useOn = (eventName, eventQrl) => {
        const {isAdded, addEvent} = useOnEventsSequentialScope();
        isAdded || eventQrl && (Array.isArray(eventName) ? eventName.forEach((event => addEvent(event, eventQrl))) : addEvent(eventName, eventQrl));
    };
    const useOnEventsSequentialScope = () => {
        const iCtx = useInvokeContext();
        const host = iCtx.$hostElement$;
        let onMap = iCtx.$container$.getHostProp(host, USE_ON_LOCAL);
        null === onMap && (onMap = {}, iCtx.$container$.setHostProp(host, USE_ON_LOCAL, onMap));
        let seqIdx = iCtx.$container$.getHostProp(host, USE_ON_LOCAL_SEQ_IDX);
        null === seqIdx && (seqIdx = 0), iCtx.$container$.setHostProp(host, USE_ON_LOCAL_SEQ_IDX, seqIdx + 1);
        let addedFlags = iCtx.$container$.getHostProp(host, USE_ON_LOCAL_FLAGS);
        for (null === addedFlags && (addedFlags = [], iCtx.$container$.setHostProp(host, USE_ON_LOCAL_FLAGS, addedFlags)); addedFlags.length <= seqIdx; ) {
            addedFlags.push(!1);
        }
        return {
            isAdded: addedFlags[seqIdx],
            addEvent: (eventName, eventQrl) => {
                addedFlags[seqIdx] = !0;
                let events = onMap[eventName];
                events || (onMap[eventName] = events = []), events.push(eventQrl);
            }
        };
    };
    const executeComponent = (container, renderHost, subscriptionHost, componentQRL, props) => {
        const iCtx = newInvokeContext(container.$locale$, subscriptionHost, void 0, "qRender");
        let componentFn;
        if (iCtx.$effectSubscriber$ = [ subscriptionHost, EffectProperty.COMPONENT ], iCtx.$container$ = container, 
        container.ensureProjectionResolved(renderHost), null === componentQRL && assertDefined(componentQRL = componentQRL || container.getHostProp(renderHost, "q:renderFn"), "No Component found at this location"), 
        isQrl(componentQRL)) {
            (props = props || container.getHostProp(renderHost, "q:props") || EMPTY_OBJ) && props.children && delete props.children, 
            componentFn = componentQRL.getFn(iCtx);
        } else if (isQwikComponent(componentQRL)) {
            const qComponentFn = componentQRL;
            componentFn = () => invokeApply(iCtx, qComponentFn, [ props || EMPTY_OBJ, null, 0 ]);
        } else {
            const inlineComponent = componentQRL;
            componentFn = () => invokeApply(iCtx, inlineComponent, [ props || EMPTY_OBJ ]);
        }
        const executeComponentWithPromiseExceptionRetry = () => safeCall((() => (container.setHostProp(renderHost, "q:seqIdx", null), 
        container.setHostProp(renderHost, USE_ON_LOCAL_SEQ_IDX, null), container.setHostProp(renderHost, "q:props", props), 
        vnode_isVNode(renderHost) && clearVNodeEffectDependencies(renderHost), componentFn(props))), (jsx => {
            const useOnEvents = container.getHostProp(renderHost, USE_ON_LOCAL);
            return useOnEvents ? maybeThen(function(jsx, useOnEvents) {
                const jsxElement = findFirstStringJSX(jsx);
                return maybeThen(jsxElement, (jsxElement => {
                    let isInvisibleComponent = !1;
                    jsxElement || (isInvisibleComponent = !0);
                    for (const key in useOnEvents) {
                        Object.prototype.hasOwnProperty.call(useOnEvents, key) && (isInvisibleComponent ? "onQvisible$" === key ? (jsxElement = addScriptNodeForInvisibleComponents(jsx)) && addUseOnEvent(jsxElement, "document:onQinit$", useOnEvents[key]) : key.startsWith("document:") || key.startsWith("window:") ? (jsxElement = addScriptNodeForInvisibleComponents(jsx)) && addUseOnEvent(jsxElement, key, useOnEvents[key]) : build.isDev && logWarn('You are trying to add an event "' + key + '" using `useOn` hook, but a node to which you can add an event is not found. Please make sure that the component has a valid element node. ') : jsxElement && addUseOnEvent(jsxElement, key, useOnEvents[key]));
                    }
                    return jsxElement;
                }));
            }(jsx, useOnEvents), (() => jsx)) : jsx;
        }), (err => {
            if (isPromise(err)) {
                return err.then(executeComponentWithPromiseExceptionRetry);
            }
            throw err;
        }));
        return executeComponentWithPromiseExceptionRetry();
    };
    function addUseOnEvent(jsxElement, key, value) {
        let props = jsxElement.props;
        props === EMPTY_OBJ && (props = jsxElement.props = {});
        let propValue = props[key];
        void 0 === propValue ? propValue = [] : Array.isArray(propValue) || (propValue = [ propValue ]), 
        propValue.push(...value), props[key] = propValue;
    }
    function findFirstStringJSX(jsx) {
        const queue = [ jsx ];
        for (;queue.length; ) {
            const jsx = queue.shift();
            if (isJSXNode(jsx)) {
                if ("string" == typeof jsx.type) {
                    return jsx;
                }
                queue.push(jsx.children);
            } else if (Array.isArray(jsx)) {
                queue.push(...jsx);
            } else {
                if (isPromise(jsx)) {
                    return maybeThen(jsx, (jsx => findFirstStringJSX(jsx)));
                }
                if (isSignal(jsx)) {
                    return findFirstStringJSX(untrack((() => jsx.value)));
                }
            }
        }
        return null;
    }
    function addScriptNodeForInvisibleComponents(jsx) {
        if (isJSXNode(jsx)) {
            const jsxElement = new JSXNodeImpl("script", {}, {
                type: "placeholder",
                hidden: ""
            }, null, 3);
            return null == jsx.children ? jsx.children = jsxElement : Array.isArray(jsx.children) ? jsx.children.push(jsxElement) : jsx.children = [ jsx.children, jsxElement ], 
            jsxElement;
        }
        return Array.isArray(jsx) && jsx.length ? addScriptNodeForInvisibleComponents(jsx[0]) : null;
    }
    function escapeHTML(html) {
        let escapedHTML = "";
        const length = html.length;
        let idx = 0;
        let lastIdx = idx;
        for (;idx < length; idx++) {
            const ch = html.charCodeAt(idx);
            if (60 === ch) {
                escapedHTML += html.substring(lastIdx, idx) + "&lt;";
            } else if (62 === ch) {
                escapedHTML += html.substring(lastIdx, idx) + "&gt;";
            } else if (38 === ch) {
                escapedHTML += html.substring(lastIdx, idx) + "&amp;";
            } else if (34 === ch) {
                escapedHTML += html.substring(lastIdx, idx) + "&quot;";
            } else {
                if (39 !== ch) {
                    continue;
                }
                escapedHTML += html.substring(lastIdx, idx) + "&#39;";
            }
            lastIdx = idx + 1;
        }
        return 0 === lastIdx ? html : escapedHTML + html.substring(lastIdx);
    }
    const vnode_diff = (container, jsxNode, vStartNode, scopedStyleIdPrefix) => {
        let journal = container.$journal$;
        const stack = [];
        const asyncQueue = [];
        let vParent = null;
        let vCurrent = null;
        let vNewNode = null;
        let vSiblings = null;
        let vSiblingsIdx = -1;
        let jsxChildren = null;
        let jsxValue = null;
        let jsxIdx = 0;
        let jsxCount = 0;
        let shouldAdvance = !0;
        return diff(jsxNode, vStartNode), function drainAsyncQueue() {
            for (;asyncQueue.length; ) {
                const jsxNode = asyncQueue.shift();
                const vHostNode = asyncQueue.shift();
                if (isPromise(jsxNode)) {
                    return jsxNode.then((jsxNode => (diff(jsxNode, vHostNode), drainAsyncQueue())));
                }
                diff(jsxNode, vHostNode);
            }
        }();
        function diff(jsxNode, vStartNode) {
            for (assertFalse(vnode_isVNode(jsxNode), "JSXNode should not be a VNode"), assertTrue(vnode_isVNode(vStartNode), "vStartNode should be a VNode"), 
            vParent = vStartNode, vNewNode = null, vCurrent = vnode_getFirstChild(vStartNode), 
            stackPush(jsxNode, !0); stack.length; ) {
                for (;jsxIdx < jsxCount; ) {
                    if (assertFalse(vParent === vCurrent, "Parent and current can't be the same"), "string" == typeof jsxValue) {
                        expectText(jsxValue);
                    } else if ("number" == typeof jsxValue) {
                        expectText(String(jsxValue));
                    } else if (jsxValue && "object" == typeof jsxValue) {
                        if (Array.isArray(jsxValue)) {
                            descend(jsxValue, !1);
                        } else if (isSignal(jsxValue)) {
                            vCurrent && clearVNodeEffectDependencies(vCurrent), expectVirtual(VirtualType.WrappedSignal, null), 
                            descend(trackSignal((() => jsxValue.value), vNewNode || vCurrent, EffectProperty.VNODE, container), !0);
                        } else if (isPromise(jsxValue)) {
                            expectVirtual(VirtualType.Awaited, null), asyncQueue.push(jsxValue, vNewNode || vCurrent);
                        } else if (isJSXNode(jsxValue)) {
                            const type = jsxValue.type;
                            "string" == typeof type ? (expectNoMoreTextNodes(), expectElement(jsxValue, type), 
                            descend(jsxValue.children, !0)) : "function" == typeof type && (type === Fragment ? (expectNoMoreTextNodes(), 
                            expectVirtual(VirtualType.Fragment, jsxValue.key), descend(jsxValue.children, !0)) : type === Slot ? (expectNoMoreTextNodes(), 
                            expectSlot() || descend(jsxValue.children, !0)) : type === Projection ? (expectProjection(), 
                            descend(jsxValue.children, !0)) : type === SSRComment || type === SSRRaw ? expectNoMore() : (expectNoMoreTextNodes(), 
                            expectComponent(type)));
                        }
                    } else {
                        jsxValue === SkipRender ? journal = [] : expectText("");
                    }
                    advance();
                }
                expectNoMore(), ascend();
            }
        }
        function advance() {
            if (shouldAdvance) {
                if (jsxIdx++, jsxIdx < jsxCount) {
                    jsxValue = jsxChildren[jsxIdx];
                } else if (!1 === stack[stack.length - 1]) {
                    return ascend();
                }
                null !== vNewNode ? vNewNode = null : advanceToNextSibling();
            } else {
                shouldAdvance = !0;
            }
        }
        function peekNextSibling() {
            if (null !== vSiblings) {
                const idx = vSiblingsIdx + SiblingsArray.NextVNode;
                return idx < vSiblings.length ? vSiblings[idx] : null;
            }
            return vCurrent ? vnode_getNextSibling(vCurrent) : null;
        }
        function advanceToNextSibling() {
            vCurrent = peekNextSibling(), null !== vSiblings && (vSiblingsIdx += SiblingsArray.Size);
        }
        function descend(children, descendVNode) {
            null != children ? (stackPush(children, descendVNode), descendVNode && (assertDefined(vCurrent || vNewNode, "Expecting vCurrent to be defined."), 
            vSiblings = null, vSiblingsIdx = -1, vParent = vNewNode || vCurrent, vCurrent = vnode_getFirstChild(vParent), 
            vNewNode = null), shouldAdvance = !1) : function() {
                const vFirstChild = vCurrent && vnode_getFirstChild(vCurrent);
                if (null !== vFirstChild) {
                    let vChild = vFirstChild;
                    for (;vChild; ) {
                        cleanup(container, vChild), vChild = vnode_getNextSibling(vChild);
                    }
                    vnode_truncate(journal, vCurrent, vFirstChild);
                }
            }();
        }
        function ascend() {
            stack.pop() && (vSiblingsIdx = stack.pop(), vSiblings = stack.pop(), vNewNode = stack.pop(), 
            vCurrent = stack.pop(), vParent = stack.pop()), jsxValue = stack.pop(), jsxCount = stack.pop(), 
            jsxIdx = stack.pop(), jsxChildren = stack.pop(), advance();
        }
        function stackPush(children, descendVNode) {
            stack.push(jsxChildren, jsxIdx, jsxCount, jsxValue), descendVNode && stack.push(vParent, vCurrent, vNewNode, vSiblings, vSiblingsIdx), 
            stack.push(descendVNode), Array.isArray(children) ? (jsxIdx = 0, jsxCount = children.length, 
            jsxChildren = children, jsxValue = jsxCount > 0 ? children[0] : null) : void 0 === children ? (jsxIdx = 0, 
            jsxValue = null, jsxChildren = null, jsxCount = 0) : (jsxIdx = 0, jsxValue = children, 
            jsxChildren = null, jsxCount = 1);
        }
        function getInsertBefore() {
            if (vNewNode) {
                return vCurrent;
            }
            if (null !== vSiblings) {
                const nextIdx = vSiblingsIdx + SiblingsArray.NextVNode;
                return nextIdx < vSiblings.length ? vSiblings[nextIdx] : null;
            }
            return peekNextSibling();
        }
        function expectProjection() {
            const slotName = jsxValue.key;
            vCurrent = vnode_getProp(vParent, slotName, (id => vnode_locate(container.rootVNode, id))), 
            null == vCurrent && (vNewNode = vnode_newVirtual(), build.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, VirtualType.Projection), 
            build.isDev && vnode_setProp(vNewNode, "q:code", "expectProjection"), vnode_setProp(vNewNode, QSlot, slotName), 
            vnode_setProp(vNewNode, QSlotParent, vParent), vnode_setProp(vParent, slotName, vNewNode));
        }
        function expectSlot() {
            const vHost = vnode_getProjectionParentComponent(vParent, container.rootVNode);
            const slotNameKey = function(vHost) {
                const constProps = jsxValue.constProps;
                if (constProps && "object" == typeof constProps && "name" in constProps) {
                    const constValue = constProps.name;
                    if (vHost && constValue instanceof WrappedSignal) {
                        return trackSignal((() => constValue.value), vHost, EffectProperty.COMPONENT, container);
                    }
                }
                return jsxValue.props.name || QDefaultSlot;
            }(vHost);
            const vProjectedNode = vHost ? vnode_getProp(vHost, slotNameKey, null) : null;
            return null == vProjectedNode ? (vnode_insertBefore(journal, vParent, vNewNode = vnode_newVirtual(), vCurrent && getInsertBefore()), 
            vnode_setProp(vNewNode, QSlot, slotNameKey), vHost && vnode_setProp(vHost, slotNameKey, vNewNode), 
            build.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, VirtualType.Projection), build.isDev && vnode_setProp(vNewNode, "q:code", "expectSlot" + count++), 
            !1) : (vProjectedNode === vCurrent || (vnode_insertBefore(journal, vParent, vNewNode = vProjectedNode, vCurrent && getInsertBefore()), 
            vnode_setProp(vNewNode, QSlot, slotNameKey), vHost && vnode_setProp(vHost, slotNameKey, vNewNode), 
            build.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, VirtualType.Projection), build.isDev && vnode_setProp(vNewNode, "q:code", "expectSlot" + count++)), 
            !0);
        }
        function expectNoMore() {
            if (assertFalse(vParent === vCurrent, "Parent and current can't be the same"), null !== vCurrent) {
                for (;vCurrent; ) {
                    const toRemove = vCurrent;
                    advanceToNextSibling(), cleanup(container, toRemove), vParent === vnode_getParent(toRemove) && vnode_remove(journal, vParent, toRemove, !0);
                }
            }
        }
        function expectNoMoreTextNodes() {
            for (;null !== vCurrent && vnode_isTextVNode(vCurrent); ) {
                cleanup(container, vCurrent);
                const toRemove = vCurrent;
                advanceToNextSibling(), vnode_remove(journal, vParent, toRemove, !0);
            }
        }
        function createNewElement(jsx, elementName) {
            const element = function(elementName) {
                const domParentVNode = vnode_getDomParentVNode(vParent);
                const {elementNamespace, elementNamespaceFlag} = getNewElementNamespaceData(domParentVNode, elementName);
                const element = container.document.createElementNS(elementNamespace, elementName);
                return vNewNode = vnode_newElement(element, elementName), vNewNode[VNodeProps.flags] |= elementNamespaceFlag, 
                element;
            }(elementName);
            const {constProps} = jsx;
            let needsQDispatchEventPatch = !1;
            if (constProps) {
                for (const key in constProps) {
                    let value = constProps[key];
                    if (isJsxPropertyAnEventName(key)) {
                        const eventName = getEventNameFromJsxProp(key);
                        const scope = getEventNameScopeFromJsxProp(key);
                        vnode_setProp(vNewNode, HANDLER_PREFIX + ":" + scope + ":" + eventName, value), 
                        eventName && registerQwikLoaderEvent(eventName), needsQDispatchEventPatch = !0;
                    } else {
                        if ("ref" === key) {
                            if (isSignal(value)) {
                                value.value = element;
                                continue;
                            }
                            if ("function" == typeof value) {
                                value(element);
                                continue;
                            }
                        }
                        if (isSignal(value)) {
                            const signalData = new EffectData({
                                $scopedStyleIdPrefix$: scopedStyleIdPrefix,
                                $isConst$: !0
                            });
                            value = trackSignal((() => value.value), vNewNode, key, container, signalData);
                        }
                        if ("dangerouslySetInnerHTML" !== key) {
                            if ("textarea" !== elementName || "value" !== key) {
                                value = serializeAttribute(key, value, scopedStyleIdPrefix), null != value && element.setAttribute(key, String(value));
                            } else {
                                if ("string" != typeof value) {
                                    build.isDev && throwErrorAndStop("The value of the textarea must be a string");
                                    continue;
                                }
                                element.value = escapeHTML(value);
                            }
                        } else {
                            element.innerHTML = value, element.setAttribute("q:container", QContainerValue.HTML);
                        }
                    }
                }
            }
            const key = jsx.key;
            key && (element.setAttribute(ELEMENT_KEY, key), vnode_setProp(vNewNode, ELEMENT_KEY, key));
            return !(hasClassAttr(jsx.varProps) || jsx.constProps && hasClassAttr(jsx.constProps)) && scopedStyleIdPrefix && element.setAttribute("class", scopedStyleIdPrefix), 
            vnode_insertBefore(journal, vParent, vNewNode, vCurrent), needsQDispatchEventPatch;
        }
        function expectElement(jsx, elementName) {
            const isSameElementName = vCurrent && vnode_isElementVNode(vCurrent) && elementName === vnode_getElementName(vCurrent);
            const jsxKey = jsx.key;
            let needsQDispatchEventPatch = !1;
            isSameElementName && jsxKey === getKey(vCurrent) || (vNewNode = retrieveChildWithKey(elementName, jsxKey), 
            null === vNewNode ? needsQDispatchEventPatch = createNewElement(jsx, elementName) : vnode_insertBefore(journal, vParent, vNewNode, vCurrent));
            const jsxAttrs = [];
            const props = jsx.varProps;
            for (const key in props) {
                let value = props[key];
                value = serializeAttribute(key, value, scopedStyleIdPrefix), null != value && mapArray_set(jsxAttrs, key, value, 0);
            }
            null !== jsxKey && mapArray_set(jsxAttrs, ELEMENT_KEY, jsxKey, 0);
            const vNode = vNewNode || vCurrent;
            if (needsQDispatchEventPatch = function(vnode, srcAttrs) {
                vnode_ensureElementInflated(vnode);
                const dstAttrs = vnode;
                let srcIdx = 0;
                const srcLength = srcAttrs.length;
                let dstIdx = ElementVNodeProps.PROPS_OFFSET;
                let dstLength = dstAttrs.length;
                let srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
                let dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
                let patchEventDispatch = !1;
                const record = (key, value) => {
                    if (key.startsWith(":")) {
                        vnode_setProp(vnode, key, value);
                    } else {
                        if ("ref" === key) {
                            const element = vnode_getNode(vnode);
                            if (isSignal(value)) {
                                return void (value.value = element);
                            }
                            if ("function" == typeof value) {
                                return void value(element);
                            }
                        }
                        isSignal(value) && (value = untrack((() => value.value))), vnode_setAttr(journal, vnode, key, value), 
                        null === value && (dstLength = dstAttrs.length);
                    }
                };
                const recordJsxEvent = (key, value) => {
                    const eventName = getEventNameFromJsxProp(key);
                    if (eventName) {
                        const scope = getEventNameScopeFromJsxProp(key);
                        record(":" + scope + ":" + eventName, value);
                    }
                    const htmlEvent = convertEventNameFromJsxPropToHtmlAttr(key);
                    htmlEvent && record(htmlEvent, ""), eventName && registerQwikLoaderEvent(eventName);
                };
                for (;null !== srcKey || null !== dstKey; ) {
                    if (dstKey?.startsWith(HANDLER_PREFIX) || dstKey == ELEMENT_KEY) {
                        dstIdx++, dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
                    } else if (null == srcKey) {
                        dstKey && isHtmlAttributeAnEventName(dstKey) ? (patchEventDispatch = !0, dstIdx++) : (record(dstKey, null), 
                        dstIdx--), dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
                    } else if (null == dstKey) {
                        isJsxPropertyAnEventName(srcKey) ? (patchEventDispatch = !0, recordJsxEvent(srcKey, srcAttrs[srcIdx])) : record(srcKey, srcAttrs[srcIdx]), 
                        srcIdx++, srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
                    } else if (srcKey == dstKey) {
                        const srcValue = srcAttrs[srcIdx++];
                        srcValue !== dstAttrs[dstIdx++] && record(dstKey, srcValue), srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null, 
                        dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
                    } else {
                        srcKey < dstKey ? (isJsxPropertyAnEventName(srcKey) ? (patchEventDispatch = !0, 
                        recordJsxEvent(srcKey, srcAttrs[srcIdx])) : record(srcKey, srcAttrs[srcIdx]), srcIdx++, 
                        srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null, dstIdx++, dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null) : (isHtmlAttributeAnEventName(dstKey) ? (patchEventDispatch = !0, 
                        dstIdx++) : (record(dstKey, null), dstIdx--), dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null);
                    }
                }
                return patchEventDispatch;
            }(vNode, jsxAttrs) || needsQDispatchEventPatch, needsQDispatchEventPatch) {
                const element = vnode_getNode(vNode);
                element.qDispatchEvent || (element.qDispatchEvent = (event, scope) => {
                    const eventName = event.type;
                    const eventProp = ":" + scope.substring(1) + ":" + eventName;
                    const qrls = [ vnode_getProp(vNode, eventProp, null), vnode_getProp(vNode, HANDLER_PREFIX + eventProp, null) ];
                    let returnValue = !1;
                    return qrls.flat(2).forEach((qrl => {
                        if (qrl) {
                            const value = qrl(event, element);
                            returnValue = returnValue || !0 === value;
                        }
                    })), returnValue;
                });
            }
        }
        function registerQwikLoaderEvent(eventName) {
            const window = container.document.defaultView;
            window && (window.qwikevents || (window.qwikevents = [])).push(eventName);
        }
        function retrieveChildWithKey(nodeName, key) {
            let vNodeWithKey = null;
            if (-1 === vSiblingsIdx) {
                vSiblings = [], vSiblingsIdx = 0;
                let vNode = vCurrent;
                for (;vNode; ) {
                    const name = vnode_isElementVNode(vNode) ? vnode_getElementName(vNode) : null;
                    const vKey = getKey(vNode) || getComponentHash(vNode, container.$getObjectById$);
                    null === vNodeWithKey && vKey == key && name == nodeName ? vNodeWithKey = vNode : vSiblings.push(name, vKey, vNode), 
                    vNode = vnode_getNextSibling(vNode);
                }
            } else {
                for (let idx = vSiblingsIdx; idx < vSiblings.length; idx += SiblingsArray.Size) {
                    if (vSiblings[idx + SiblingsArray.Key] === key && vSiblings[idx + SiblingsArray.Name] === nodeName) {
                        vNodeWithKey = vSiblings[idx + SiblingsArray.VNode], vSiblings?.splice(idx, SiblingsArray.Size);
                        break;
                    }
                }
            }
            return vNodeWithKey;
        }
        function expectVirtual(type, jsxKey) {
            vCurrent && vnode_isVirtualVNode(vCurrent) && vnode_getProp(vCurrent, ELEMENT_KEY, null) === jsxKey || (null === jsxKey || (vNewNode = retrieveChildWithKey(null, jsxKey), 
            null == vNewNode) ? (vnode_insertBefore(journal, vParent, vNewNode = vnode_newVirtual(), vCurrent && getInsertBefore()), 
            vnode_setProp(vNewNode, ELEMENT_KEY, jsxKey), build.isDev && vnode_setProp(vNewNode || vCurrent, DEBUG_TYPE, type)) : vnode_insertBefore(journal, vParent, vNewNode = vnode_newVirtual(), vCurrent && getInsertBefore()));
        }
        function expectComponent(component) {
            const componentMeta = component[SERIALIZABLE_STATE];
            let host = vNewNode || vCurrent;
            if (componentMeta) {
                const jsxProps = jsxValue.props;
                let shouldRender = !1;
                const [componentQRL] = componentMeta;
                const componentHash = componentQRL.$hash$;
                const vNodeComponentHash = getComponentHash(host, container.$getObjectById$);
                const lookupKey = jsxValue.key || componentHash;
                if (lookupKey === (getKey(host) || vNodeComponentHash) ? componentHash === vNodeComponentHash || (insertNewComponent(host, componentQRL, jsxProps), 
                vNewNode && (host && (vNewNode[VNodeProps.flags] = host[VNodeProps.flags]), host = vNewNode, 
                shouldRender = !0)) : (vNewNode = retrieveChildWithKey(null, lookupKey), vNewNode ? vnode_insertBefore(journal, vParent, vNewNode, vCurrent) : insertNewComponent(host, componentQRL, jsxProps), 
                host = vNewNode, shouldRender = !0), host) {
                    const vNodeProps = vnode_getProp(host, "q:props", container.$getObjectById$);
                    shouldRender = shouldRender || function(src, dst) {
                        if (!src || !dst) {
                            return !0;
                        }
                        let srcKeys = removeChildrenKey(Object.keys(src));
                        let dstKeys = removeChildrenKey(Object.keys(dst));
                        if (srcKeys.length !== dstKeys.length) {
                            return !0;
                        }
                        srcKeys = srcKeys.sort(), dstKeys = dstKeys.sort();
                        for (let idx = 0; idx < srcKeys.length; idx++) {
                            const srcKey = srcKeys[idx];
                            const dstKey = dstKeys[idx];
                            if (srcKey !== dstKey || src[srcKey] !== dst[dstKey]) {
                                return !0;
                            }
                        }
                        return !1;
                    }(jsxProps, vNodeProps), shouldRender && container.$scheduler$(ChoreType.COMPONENT, host, componentQRL, jsxProps);
                }
                null != jsxValue.children && function(children, host) {
                    if (Array.isArray(children) || (children = [ children ]), children.length) {
                        const createProjectionJSXNode = slotName => new JSXNodeImpl(Projection, EMPTY_OBJ, null, [], 0, slotName);
                        const projections = [];
                        if (host) {
                            for (let i = vnode_getPropStartIndex(host); i < host.length; i += 2) {
                                const prop = host[i];
                                if (isSlotProp(prop)) {
                                    const slotName = prop;
                                    projections.push(slotName), projections.push(createProjectionJSXNode(slotName));
                                }
                            }
                        }
                        for (let i = 0; i < children.length; i++) {
                            const child = children[i];
                            const slotName = String(isJSXNode(child) && child.props[QSlot] || QDefaultSlot);
                            const idx = mapApp_findIndx(projections, slotName, 0);
                            let jsxBucket;
                            idx >= 0 ? jsxBucket = projections[idx + 1] : projections.splice(~idx, 0, slotName, jsxBucket = createProjectionJSXNode(slotName)), 
                            !1 === child || jsxBucket.children.push(child);
                        }
                        for (let i = projections.length - 2; i >= 0; i -= 2) {
                            projections.splice(i, 1);
                        }
                        descend(projections, !0);
                    }
                }(jsxValue.children, host);
            } else {
                vnode_insertBefore(journal, vParent, vNewNode = vnode_newVirtual(), vCurrent && getInsertBefore()), 
                build.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, VirtualType.InlineComponent), 
                vnode_setProp(vNewNode, "q:props", jsxValue.props), host = vNewNode;
                let component$Host = host;
                for (;component$Host && (!vnode_isVirtualVNode(component$Host) || null === vnode_getProp(component$Host, "q:renderFn", null)); ) {
                    component$Host = vnode_getParent(component$Host);
                }
                const jsxOutput = executeComponent(container, host, component$Host || container.rootVNode, component, jsxValue.props);
                asyncQueue.push(jsxOutput, host);
            }
        }
        function insertNewComponent(host, componentQRL, jsxProps) {
            if (host && clearVNodeEffectDependencies(host), vnode_insertBefore(journal, vParent, vNewNode = vnode_newVirtual(), vCurrent && getInsertBefore()), 
            build.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, VirtualType.Component), container.setHostProp(vNewNode, "q:renderFn", componentQRL), 
            container.setHostProp(vNewNode, "q:props", jsxProps), container.setHostProp(vNewNode, ELEMENT_KEY, jsxValue.key), 
            host) {
                for (let i = vnode_getPropStartIndex(host); i < host.length; i += 2) {
                    const prop = host[i];
                    if (isSlotProp(prop)) {
                        container.setHostProp(vNewNode, prop, host[i + 1]);
                    }
                }
            }
        }
        function expectText(text) {
            if (null !== vCurrent) {
                if (3 === vnode_getType(vCurrent)) {
                    return text !== vnode_getText(vCurrent) ? void vnode_setText(journal, vCurrent, text) : void 0;
                }
            }
            vnode_insertBefore(journal, vParent, vNewNode = vnode_newText(container.document.createTextNode(text), text), vCurrent);
        }
    };
    function getKey(vNode) {
        return null == vNode ? null : vnode_getProp(vNode, ELEMENT_KEY, null);
    }
    function getComponentHash(vNode, getObject) {
        if (null == vNode) {
            return null;
        }
        const qrl = vnode_getProp(vNode, "q:renderFn", getObject);
        return qrl ? qrl.$hash$ : null;
    }
    function Projection() {}
    function removeChildrenKey(keys) {
        const childrenIdx = keys.indexOf("children");
        return -1 !== childrenIdx && keys.splice(childrenIdx, 1), keys;
    }
    function cleanup(container, vNode) {
        let vCursor = vNode;
        if (vnode_isTextVNode(vNode)) {
            return;
        }
        let vParent = null;
        for (;;) {
            const type = vCursor[VNodeProps.flags];
            if (type & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK) {
                if (type & VNodeFlags.Virtual) {
                    clearVNodeEffectDependencies(vCursor), markVNodeAsDeleted(vNode, vParent, vCursor);
                    const seq = container.getHostProp(vCursor, "q:seq");
                    if (seq) {
                        for (let i = 0; i < seq.length; i++) {
                            const obj = seq[i];
                            if (isTask(obj)) {
                                const task = obj;
                                clearSubscriberEffectDependencies(task), task.$flags$ & TaskFlags.VISIBLE_TASK ? container.$scheduler$(ChoreType.CLEANUP_VISIBLE, task) : cleanupTask(task);
                            }
                        }
                    }
                }
                if (type & VNodeFlags.Virtual && null !== vnode_getProp(vCursor, "q:renderFn", null)) {
                    const attrs = vCursor;
                    for (let i = VirtualVNodeProps.PROPS_OFFSET; i < attrs.length; i += 2) {
                        const key = attrs[i];
                        if (!key.startsWith(QSlotParent) && isSlotProp(key)) {
                            const value = attrs[i + 1];
                            if (value) {
                                attrs[i + 1] = null;
                                const projection = "string" == typeof value ? vnode_locate(container.rootVNode, value) : value;
                                let projectionChild = vnode_getFirstChild(projection);
                                for (;projectionChild; ) {
                                    cleanup(container, projectionChild), projectionChild = vnode_getNextSibling(projectionChild);
                                }
                                cleanupStaleUnclaimedProjection(container.$journal$, projection);
                            }
                        }
                    }
                }
                if (type & VNodeFlags.Virtual && null !== vnode_getProp(vCursor, QSlot, null)) {
                    if (vCursor === vNode) {
                        const vFirstChild = vnode_getFirstChild(vCursor);
                        if (vFirstChild) {
                            return void vnode_walkVNode(vFirstChild);
                        }
                    }
                } else {
                    const vFirstChild = vnode_getFirstChild(vCursor);
                    if (vFirstChild) {
                        vCursor = vFirstChild;
                        continue;
                    }
                }
            }
            if (vCursor === vNode) {
                return;
            }
            const vNextSibling = vnode_getNextSibling(vCursor);
            if (vNextSibling) {
                vCursor = vNextSibling;
            } else {
                for (vParent = vnode_getParent(vCursor); vParent; ) {
                    if (vParent === vNode) {
                        return;
                    }
                    const vNextParentSibling = vnode_getNextSibling(vParent);
                    if (vNextParentSibling) {
                        vCursor = vNextParentSibling;
                        break;
                    }
                    vParent = vnode_getParent(vParent);
                }
                if (null == vParent) {
                    return;
                }
            }
        }
    }
    function cleanupStaleUnclaimedProjection(journal, projection) {
        const projectionParent = vnode_getParent(projection);
        if (projectionParent) {
            projectionParent[VNodeProps.flags] & VNodeFlags.Element && vnode_getElementName(projectionParent) === QTemplate && vnode_remove(journal, projectionParent, projection, !0);
        }
    }
    function markVNodeAsDeleted(vNode, vParent, vCursor) {
        if (vNode !== vCursor) {
            vCursor[VNodeProps.flags] |= VNodeFlags.Deleted;
        } else {
            const currentVParent = vParent || vnode_getParent(vNode);
            currentVParent && null !== vnode_getProp(currentVParent, QSlot, null) || (vCursor[VNodeProps.flags] |= VNodeFlags.Deleted);
        }
    }
    const HANDLER_PREFIX = ":";
    let count = 0;
    var SiblingsArray;
    !function(SiblingsArray) {
        SiblingsArray[SiblingsArray.Name = 0] = "Name", SiblingsArray[SiblingsArray.Key = 1] = "Key", 
        SiblingsArray[SiblingsArray.VNode = 2] = "VNode", SiblingsArray[SiblingsArray.Size = 3] = "Size", 
        SiblingsArray[SiblingsArray.NextVNode = 5] = "NextVNode";
    }(SiblingsArray || (SiblingsArray = {}));
    const implicit$FirstArg = fn => function(first, ...rest) {
        return fn.call(null, dollar(first), ...rest);
    };
    const createSignal = value => new Signal(null, value);
    const createComputedQrl = qrl => (throwIfQRLNotResolved(qrl), new ComputedSignal(null, qrl));
    const createComputed$ = /*#__PURE__*/ implicit$FirstArg(createComputedQrl);
    var ChoreType;
    !function(ChoreType) {
        ChoreType[ChoreType.MACRO = 112] = "MACRO", ChoreType[ChoreType.MICRO = 15] = "MICRO", 
        ChoreType[ChoreType.QRL_RESOLVE = 1] = "QRL_RESOLVE", ChoreType[ChoreType.RESOURCE = 2] = "RESOURCE", 
        ChoreType[ChoreType.TASK = 3] = "TASK", ChoreType[ChoreType.NODE_DIFF = 4] = "NODE_DIFF", 
        ChoreType[ChoreType.NODE_PROP = 5] = "NODE_PROP", ChoreType[ChoreType.COMPONENT_SSR = 6] = "COMPONENT_SSR", 
        ChoreType[ChoreType.COMPONENT = 7] = "COMPONENT", ChoreType[ChoreType.WAIT_FOR_COMPONENTS = 16] = "WAIT_FOR_COMPONENTS", 
        ChoreType[ChoreType.JOURNAL_FLUSH = 48] = "JOURNAL_FLUSH", ChoreType[ChoreType.VISIBLE = 64] = "VISIBLE", 
        ChoreType[ChoreType.CLEANUP_VISIBLE = 80] = "CLEANUP_VISIBLE", ChoreType[ChoreType.WAIT_FOR_ALL = 127] = "WAIT_FOR_ALL";
    }(ChoreType || (ChoreType = {}));
    const createScheduler = (container, scheduleDrain, journalFlush) => {
        const choreQueue = [];
        let currentChore = null;
        let journalFlushScheduled = !1;
        return function schedule(type, hostOrTask = null, targetOrQrl = null, payload = null) {
            const runLater = type !== ChoreType.WAIT_FOR_ALL && type !== ChoreType.WAIT_FOR_COMPONENTS && type !== ChoreType.COMPONENT_SSR;
            const isTask = type === ChoreType.TASK || type === ChoreType.VISIBLE || type === ChoreType.RESOURCE || type === ChoreType.CLEANUP_VISIBLE;
            isTask && (hostOrTask.$flags$ |= TaskFlags.DIRTY);
            let chore = {
                $type$: type,
                $idx$: isTask ? hostOrTask.$index$ : "string" == typeof targetOrQrl ? targetOrQrl : 0,
                $host$: isTask ? hostOrTask.$el$ : hostOrTask,
                $target$: targetOrQrl,
                $payload$: isTask ? hostOrTask : payload,
                $resolve$: null,
                $promise$: null,
                $returnValue$: null,
                $executed$: !1
            };
            chore.$promise$ = new Promise((resolve => chore.$resolve$ = resolve)), chore = function(sortedArray, value) {
                const idx = function(sortedArray, value) {
                    let bottom = 0;
                    let top = sortedArray.length;
                    for (;bottom < top; ) {
                        const middle = bottom + (top - bottom >> 1);
                        const comp = choreComparator(value, sortedArray[middle], !0);
                        if (comp < 0) {
                            top = middle;
                        } else {
                            if (!(comp > 0)) {
                                return middle;
                            }
                            bottom = middle + 1;
                        }
                    }
                    return ~bottom;
                }(sortedArray, value);
                if (idx < 0) {
                    return sortedArray.splice(~idx, 0, value), value;
                }
                const existing = sortedArray[idx];
                return choreUpdate(existing, value), existing;
            }(choreQueue, chore), !journalFlushScheduled && runLater && (journalFlushScheduled = !0, 
            schedule(ChoreType.JOURNAL_FLUSH), scheduleDrain());
            return runLater ? chore.$promise$ : drainUpTo(chore);
        };
        function drainUpTo(runUptoChore) {
            if (runUptoChore.$executed$) {
                return runUptoChore.$returnValue$;
            }
            if (currentChore) {
                return runUptoChore.$promise$;
            }
            for (;choreQueue.length; ) {
                const nextChore = choreQueue.shift();
                const order = choreComparator(nextChore, runUptoChore, !1);
                if (null === order) {
                    continue;
                }
                if (order > 0) {
                    break;
                }
                if (!!((chore = nextChore).$host$ && vnode_isVNode(chore.$host$) && chore.$host$[VNodeProps.flags] & VNodeFlags.Deleted) && nextChore.$type$ !== ChoreType.CLEANUP_VISIBLE) {
                    continue;
                }
                const returnValue = executeChore(nextChore);
                if (isPromise(returnValue)) {
                    return returnValue.then((() => drainUpTo(runUptoChore)));
                }
            }
            var chore;
            return runUptoChore.$returnValue$;
        }
        function executeChore(chore) {
            const host = chore.$host$;
            assertEqual(currentChore, null, "Chore already running."), currentChore = chore;
            let returnValue = null;
            switch (chore.$type$) {
              case ChoreType.JOURNAL_FLUSH:
                returnValue = journalFlush(), journalFlushScheduled = !1;
                break;

              case ChoreType.COMPONENT:
              case ChoreType.COMPONENT_SSR:
                returnValue = safeCall((() => executeComponent(container, host, host, chore.$target$, chore.$payload$)), (jsx => chore.$type$ === ChoreType.COMPONENT ? maybeThen(container.processJsx(host, jsx), (() => jsx)) : jsx), (err => container.handleError(err, host)));
                break;

              case ChoreType.RESOURCE:
                const result = runResource(chore.$payload$, container, host);
                returnValue = isDomContainer(container) ? null : result;
                break;

              case ChoreType.TASK:
              case ChoreType.VISIBLE:
                returnValue = runTask(chore.$payload$, container, host);
                break;

              case ChoreType.CLEANUP_VISIBLE:
                cleanupTask(chore.$payload$);
                break;

              case ChoreType.NODE_DIFF:
                const parentVirtualNode = chore.$target$;
                let jsx = chore.$payload$;
                isSignal(jsx) && (jsx = jsx.value), returnValue = vnode_diff(container, jsx, parentVirtualNode, null);
                break;

              case ChoreType.NODE_PROP:
                const virtualNode = chore.$host$;
                const payload = chore.$payload$;
                let value = payload.$value$;
                isSignal(value) && (value = value.value);
                const isConst = payload.$isConst$;
                const journal = container.$journal$;
                const property = chore.$idx$;
                if (value = serializeAttribute(property, value, payload.$scopedStyleIdPrefix$), 
                isConst) {
                    journal.push(VNodeJournalOpCode.SetAttribute, virtualNode[ElementVNodeProps.element], property, value);
                } else {
                    vnode_setAttr(journal, virtualNode, property, value);
                }
                break;

              case ChoreType.QRL_RESOLVE:
                {
                    const target = chore.$target$;
                    returnValue = target.resolved ? null : target.resolve();
                    break;
                }
            }
            return thenFn = value => (currentChore && (currentChore.$executed$ = !0, currentChore.$resolve$?.(value)), 
            currentChore = null, chore.$returnValue$ = value), isPromise(valueOrPromise = returnValue) ? valueOrPromise.then(thenFn) : thenFn(valueOrPromise);
            var valueOrPromise, thenFn;
        }
    };
    const toNumber = value => "number" == typeof value ? value : -1;
    const choreUpdate = (existing, newChore) => {
        existing.$type$ === ChoreType.NODE_DIFF && (existing.$payload$ = newChore.$payload$);
    };
    function choreComparator(a, b, shouldThrowOnHostMismatch) {
        const macroTypeDiff = (a.$type$ & ChoreType.MACRO) - (b.$type$ & ChoreType.MACRO);
        if (0 !== macroTypeDiff) {
            return macroTypeDiff;
        }
        if (a.$type$ !== ChoreType.JOURNAL_FLUSH) {
            const aHost = a.$host$;
            const bHost = b.$host$;
            if (aHost !== bHost && null !== aHost && null !== bHost) {
                if (!vnode_isVNode(aHost) || !vnode_isVNode(bHost)) {
                    const errorMessage = "SERVER: during HTML streaming, it is not possible to cause a re-run of tasks on a different host";
                    return shouldThrowOnHostMismatch && throwErrorAndStop(errorMessage), logWarn(errorMessage), 
                    null;
                }
                {
                    const hostDiff = vnode_documentPosition(aHost, bHost);
                    if (0 !== hostDiff) {
                        return hostDiff;
                    }
                }
            }
            const microTypeDiff = (a.$type$ & ChoreType.MICRO) - (b.$type$ & ChoreType.MICRO);
            if (0 !== microTypeDiff) {
                return microTypeDiff;
            }
            const idxDiff = toNumber(a.$idx$) - toNumber(b.$idx$);
            if (0 !== idxDiff) {
                return idxDiff;
            }
            if (a.$target$ !== b.$target$ && (a.$type$ === ChoreType.QRL_RESOLVE && b.$type$ === ChoreType.QRL_RESOLVE || a.$type$ === ChoreType.NODE_PROP && b.$type$ === ChoreType.NODE_PROP)) {
                return 1;
            }
        }
        return 0;
    }
    class _SharedContainer {
        constructor(scheduleDrain, journalFlush, serverData, locale) {
            this.$currentUniqueId$ = 0, this.$instanceHash$ = null, this.$serverData$ = serverData, 
            this.$locale$ = locale, this.$version$ = "2.0.0-0-dev+5f846e5", this.$storeProxyMap$ = new WeakMap, 
            this.$getObjectById$ = () => {
                throw Error("Not implemented");
            }, this.$scheduler$ = createScheduler(this, scheduleDrain, journalFlush);
        }
        trackSignalValue(signal, subscriber, property, data) {
            return trackSignal((() => signal.value), subscriber, property, this, data);
        }
        serializationCtxFactory(NodeConstructor, symbolToChunkResolver, writer) {
            return createSerializationContext(NodeConstructor, symbolToChunkResolver, this.setHostProp.bind(this), writer);
        }
    }
    const VNodeDataSeparator_REFERENCE = 126, VNodeDataSeparator_ADVANCE_1 = 33, VNodeDataSeparator_ADVANCE_8192 = 46;
    const VNodeDataChar_OPEN = 123, VNodeDataChar_CLOSE = 125, VNodeDataChar_SCOPED_STYLE = 59, VNodeDataChar_RENDER_FN = 60, VNodeDataChar_ID = 61, VNodeDataChar_PROPS = 62, VNodeDataChar_SLOT_REF = 63, VNodeDataChar_KEY = 64, VNodeDataChar_SEQ = 91, VNodeDataChar_CONTEXT = 93, VNodeDataChar_SEQ_IDX = 94, VNodeDataChar_SEPARATOR = 124, VNodeDataChar_SLOT = 126;
    function getDomContainer(element) {
        const qContainerElement = _getQContainerElement(element);
        return qContainerElement || throwErrorAndStop("Unable to find q:container."), getDomContainerFromQContainerElement(qContainerElement);
    }
    function getDomContainerFromQContainerElement(qContainerElement) {
        const qElement = qContainerElement;
        let container = qElement.qContainer;
        if (!container) {
            container = new DomContainer(qElement);
            const containerAttributes = {};
            if (qElement) {
                const attrs = qElement.attributes;
                if (attrs) {
                    for (let index = 0; index < attrs.length; index++) {
                        const attr = attrs[index];
                        attr.name !== Q_PROPS_SEPARATOR && (containerAttributes[attr.name] = attr.value);
                    }
                }
            }
            container.$serverData$ = {
                containerAttributes
            }, qElement.qContainer = container;
        }
        return container;
    }
    function _getQContainerElement(element) {
        return (Array.isArray(element) ? vnode_getDomParent(element) : element).closest(QContainerSelector);
    }
    const isDomContainer = container => container instanceof DomContainer;
    class DomContainer extends _SharedContainer {
        constructor(element) {
            super((() => this.scheduleRender()), (() => vnode_applyJournal(this.$journal$)), {}, element.getAttribute("q:locale")), 
            this.renderDone = null, this.$storeProxyMap$ = new WeakMap, this.$styleIds$ = null, 
            this.$vnodeLocate$ = id => vnode_locate(this.rootVNode, id), this.$renderCount$ = 0, 
            this.$getObjectById$ = id => ("string" == typeof id && (id = parseFloat(id)), assertTrue(id < this.$rawStateData$.length, `Invalid reference: ${id} < ${this.$rawStateData$.length}`), 
            this.stateData[id]), this.qContainer = element.getAttribute("q:container"), this.qContainer || throwErrorAndStop("Element must have 'q:container' attribute."), 
            this.$journal$ = [ VNodeJournalOpCode.HoistStyles, element.ownerDocument ], this.document = element.ownerDocument, 
            this.element = element, this.qBase = element.getAttribute("q:base"), this.$instanceHash$ = element.getAttribute("q:instance"), 
            this.qManifestHash = element.getAttribute("q:manifest-hash"), this.rootVNode = vnode_newUnMaterializedElement(this.element), 
            this.$rawStateData$ = null, this.stateData = null;
            const document = this.element.ownerDocument;
            document.qVNodeData || function(document) {
                const vNodeDataMap = document.qVNodeData || (document.qVNodeData = new WeakMap);
                const prototype = document.body;
                const getAttribute = prototype.getAttribute;
                const hasAttribute = prototype.hasAttribute;
                const getNodeType = ((prototype, name) => {
                    let getter;
                    for (;prototype && !(getter = Object.getOwnPropertyDescriptor(prototype, name)?.get); ) {
                        prototype = Object.getPrototypeOf(prototype);
                    }
                    return getter || function() {
                        return this[name];
                    };
                })(prototype, "nodeType");
                const attachVnodeDataAndRefs = element => {
                    Array.from(element.querySelectorAll('script[type="qwik/vnode"]')).forEach((script => {
                        script.setAttribute("type", "x-qwik/vnode");
                        const qContainerElement = script.closest("[q\\:container]");
                        qContainerElement.qVnodeData = script.textContent, qContainerElement.qVNodeRefs = new Map;
                    })), element.querySelectorAll("[q\\:shadowroot]").forEach((parent => {
                        const shadowRoot = parent.shadowRoot;
                        shadowRoot && attachVnodeDataAndRefs(shadowRoot);
                    }));
                };
                let NodeType;
                attachVnodeDataAndRefs(document), function(NodeType) {
                    NodeType[NodeType.CONTAINER_MASK = 1] = "CONTAINER_MASK", NodeType[NodeType.ELEMENT = 2] = "ELEMENT", 
                    NodeType[NodeType.ELEMENT_CONTAINER = 3] = "ELEMENT_CONTAINER", NodeType[NodeType.ELEMENT_SHADOW_ROOT = 6] = "ELEMENT_SHADOW_ROOT", 
                    NodeType[NodeType.COMMENT_SKIP_START = 5] = "COMMENT_SKIP_START", NodeType[NodeType.COMMENT_SKIP_END = 8] = "COMMENT_SKIP_END", 
                    NodeType[NodeType.COMMENT_IGNORE_START = 16] = "COMMENT_IGNORE_START", NodeType[NodeType.COMMENT_IGNORE_END = 32] = "COMMENT_IGNORE_END", 
                    NodeType[NodeType.COMMENT_ISLAND_START = 65] = "COMMENT_ISLAND_START", NodeType[NodeType.COMMENT_ISLAND_END = 128] = "COMMENT_ISLAND_END", 
                    NodeType[NodeType.OTHER = 0] = "OTHER";
                }(NodeType || (NodeType = {}));
                const getFastNodeType = node => {
                    const nodeType = getNodeType.call(node);
                    if (1 === nodeType) {
                        return null === getAttribute.call(node, "q:container") ? hasAttribute.call(node, "q:shadowroot") ? NodeType.ELEMENT_SHADOW_ROOT : hasAttribute.call(node, ":") ? NodeType.ELEMENT : NodeType.OTHER : NodeType.ELEMENT_CONTAINER;
                    }
                    if (8 === nodeType) {
                        const nodeValue = node.nodeValue || "";
                        if (nodeValue.startsWith("q:container-island")) {
                            return NodeType.COMMENT_ISLAND_START;
                        }
                        if (nodeValue.startsWith("q:ignore")) {
                            return NodeType.COMMENT_IGNORE_START;
                        }
                        if (nodeValue.startsWith("q:container")) {
                            return NodeType.COMMENT_SKIP_START;
                        }
                        if (nodeValue.startsWith("/q:container-island")) {
                            return NodeType.COMMENT_ISLAND_END;
                        }
                        if (nodeValue.startsWith("/q:ignore")) {
                            return NodeType.COMMENT_IGNORE_END;
                        }
                        if (nodeValue.startsWith("/q:container")) {
                            return NodeType.COMMENT_SKIP_END;
                        }
                    }
                    return NodeType.OTHER;
                };
                const isSeparator = ch => VNodeDataSeparator_ADVANCE_1 <= ch && ch <= VNodeDataSeparator_ADVANCE_8192;
                const findVDataSectionEnd = (vData, start, end) => {
                    let depth = 0;
                    for (;start < end; ) {
                        const ch = vData.charCodeAt(start);
                        if (0 === depth && isSeparator(ch)) {
                            break;
                        }
                        ch === VNodeDataChar_OPEN ? depth++ : ch === VNodeDataChar_CLOSE && depth--, start++;
                    }
                    return start;
                };
                const nextSibling = node => {
                    for (;node && (node = node.nextSibling) && getFastNodeType(node) === NodeType.OTHER; ) {}
                    return node;
                };
                const firstChild = node => {
                    for (;node && (node = node.firstChild) && getFastNodeType(node) === NodeType.OTHER; ) {}
                    return node;
                };
                const walkContainer = (walker, containerNode, node, exitNode, vData, qVNodeRefs) => {
                    const vData_length = vData.length;
                    let elementIdx = 0;
                    let vNodeElementIndex = -1;
                    let vData_start = 0;
                    let vData_end = 0;
                    let ch = 0;
                    let needsToStoreRef = -1;
                    let nextNode = null;
                    const howManyElementsToSkip = () => {
                        let elementsToSkip = 0;
                        for (;isSeparator(ch = vData.charCodeAt(vData_start)) && (elementsToSkip += 1 << ch - VNodeDataSeparator_ADVANCE_1, 
                        vData_start++, !(vData_start >= vData_length)); ) {}
                        return elementsToSkip;
                    };
                    do {
                        if (node === exitNode) {
                            return;
                        }
                        nextNode = null;
                        const nodeType = node == containerNode ? NodeType.ELEMENT : getFastNodeType(node);
                        if (nodeType === NodeType.ELEMENT_CONTAINER) {
                            const container = node;
                            let cursor = node;
                            for (;cursor && !(nextNode = nextSibling(cursor)); ) {
                                cursor = cursor.parentNode;
                            }
                            walkContainer(walker, container, node, nextNode, container.qVnodeData || "", container.qVNodeRefs);
                        } else if (nodeType === NodeType.COMMENT_IGNORE_START) {
                            let islandNode = node;
                            do {
                                if (islandNode = walker.nextNode(), !islandNode) {
                                    throw new Error(`Island inside \x3c!--${node?.nodeValue}--\x3e not found!`);
                                }
                            } while (getFastNodeType(islandNode) !== NodeType.COMMENT_ISLAND_START);
                            nextNode = null;
                        } else if (nodeType === NodeType.COMMENT_ISLAND_END) {
                            nextNode = node;
                            do {
                                if (nextNode = walker.nextNode(), !nextNode) {
                                    throw new Error("Ignore block not closed!");
                                }
                            } while (getFastNodeType(nextNode) !== NodeType.COMMENT_IGNORE_END);
                            nextNode = null;
                        } else if (nodeType === NodeType.COMMENT_SKIP_START) {
                            nextNode = node;
                            do {
                                if (nextNode = nextSibling(nextNode), !nextNode) {
                                    throw new Error(`\x3c!--${node?.nodeValue}--\x3e not closed!`);
                                }
                            } while (getFastNodeType(nextNode) !== NodeType.COMMENT_SKIP_END);
                            walkContainer(walker, node, node, nextNode, "", null);
                        } else if (nodeType === NodeType.ELEMENT_SHADOW_ROOT) {
                            nextNode = nextSibling(node);
                            const shadowRootContainer = node;
                            const shadowRoot = shadowRootContainer?.shadowRoot;
                            shadowRoot && walkContainer(document.createTreeWalker(shadowRoot, 129), null, firstChild(shadowRoot), null, "", null);
                        }
                        if ((nodeType & NodeType.ELEMENT) === NodeType.ELEMENT) {
                            if (vNodeElementIndex < elementIdx && (-1 === vNodeElementIndex && (vNodeElementIndex = 0), 
                            vData_start = vData_end, vData_start < vData_length ? (vNodeElementIndex += howManyElementsToSkip(), 
                            ch === VNodeDataSeparator_REFERENCE && (needsToStoreRef = vNodeElementIndex, vData_start++, 
                            ch = vData_start < vData_length ? vData.charCodeAt(vData_end) : VNodeDataSeparator_ADVANCE_1), 
                            vData_end = findVDataSectionEnd(vData, vData_start, vData_length)) : vNodeElementIndex = Number.MAX_SAFE_INTEGER), 
                            elementIdx === vNodeElementIndex) {
                                needsToStoreRef === elementIdx && qVNodeRefs.set(elementIdx, node);
                                const instructions = vData.substring(vData_start, vData_end);
                                vNodeDataMap.set(node, instructions);
                            }
                            elementIdx++;
                        }
                    } while (node = nextNode || walker.nextNode());
                };
                const walker = document.createTreeWalker(document, 129);
                walkContainer(walker, null, walker.firstChild(), null, "", null);
            }(document), this.$rawStateData$ = [], this.stateData = [];
            const qwikStates = element.querySelectorAll('script[type="qwik/state"]');
            if (0 !== qwikStates.length) {
                this.$rawStateData$ = JSON.parse(qwikStates[qwikStates.length - 1].textContent), 
                this.stateData = wrapDeserializerProxy(this, this.$rawStateData$);
            }
            this.$qFuncs$ = getQFuncs(document, this.$instanceHash$) || EMPTY_ARRAY;
        }
        $setRawState$(id, vParent) {
            this.stateData[id] = vParent;
        }
        parseQRL(qrl) {
            return inflateQRL(this, parseQRL(qrl));
        }
        processJsx(host, jsx) {
            const styleScopedId = this.getHostProp(host, QScopedStyle);
            return vnode_diff(this, jsx, host, addComponentStylePrefix(styleScopedId));
        }
        handleError(err, host) {
            if (qDev) {
                if ("undefined" != typeof document) {
                    const vHost = host;
                    const errorDiv = document.createElement("errored-host");
                    err && err instanceof Error && (errorDiv.props = {
                        error: err
                    }), errorDiv.setAttribute("q:key", "_error_");
                    const journal = [];
                    vnode_getDOMChildNodes(journal, vHost).forEach((child => errorDiv.appendChild(child)));
                    const vErrorDiv = vnode_newElement(errorDiv, "error-host");
                    vnode_insertBefore(journal, vHost, vErrorDiv, null), vnode_applyJournal(journal);
                }
                if (err && err instanceof Error && ("hostElement" in err || (err.hostElement = host)), 
                !(err => !(err && err instanceof Error && "plugin" in err))(err)) {
                    throw err;
                }
            }
            const errorStore = this.resolveContext(host, ERROR_CONTEXT);
            if (!errorStore) {
                throw err;
            }
            errorStore.error = err;
        }
        setContext(host, context, value) {
            let ctx = this.getHostProp(host, "q:ctx");
            ctx || this.setHostProp(host, "q:ctx", ctx = []), mapArray_set(ctx, context.id, value, 0);
        }
        resolveContext(host, contextId) {
            for (;host; ) {
                const ctx = this.getHostProp(host, "q:ctx");
                if (ctx) {
                    const value = mapArray_get(ctx, contextId.id, 0);
                    if (value) {
                        return value;
                    }
                }
                host = this.getParentHost(host);
            }
        }
        getParentHost(host) {
            let vNode = vnode_getParent(host);
            for (;vNode; ) {
                if (vnode_isVirtualVNode(vNode)) {
                    if (null !== vnode_getProp(vNode, "q:renderFn", null)) {
                        return vNode;
                    }
                    const parent = vnode_getProp(vNode, QSlotParent, this.$vnodeLocate$);
                    if (parent) {
                        vNode = parent;
                        continue;
                    }
                }
                vNode = vnode_getParent(vNode);
            }
            return null;
        }
        setHostProp(host, name, value) {
            vnode_setProp(host, name, value);
        }
        getHostProp(host, name) {
            const vNode = host;
            let getObjectById = null;
            switch (name) {
              case "q:seq":
              case "q:props":
              case "q:renderFn":
              case "q:ctx":
              case QSubscribers:
                getObjectById = this.$getObjectById$;
                break;

              case "q:seqIdx":
              case USE_ON_LOCAL_SEQ_IDX:
                getObjectById = parseInt;
            }
            return vnode_getProp(vNode, name, getObjectById);
        }
        scheduleRender() {
            return this.$renderCount$++, this.renderDone || (this.renderDone = getPlatform().nextTick((() => this.processChores()))), 
            this.renderDone;
        }
        processChores() {
            let renderCount = this.$renderCount$;
            const result = this.$scheduler$(ChoreType.WAIT_FOR_ALL);
            if (isPromise(result)) {
                return result.then((async () => {
                    for (;renderCount !== this.$renderCount$; ) {
                        renderCount = this.$renderCount$, await this.$scheduler$(ChoreType.WAIT_FOR_ALL);
                    }
                    this.renderDone = null;
                }));
            }
            renderCount === this.$renderCount$ ? this.renderDone = null : this.processChores();
        }
        ensureProjectionResolved(vNode) {
            if (!(vNode[VNodeProps.flags] & VNodeFlags.Resolved)) {
                vNode[VNodeProps.flags] |= VNodeFlags.Resolved;
                for (let i = vnode_getPropStartIndex(vNode); i < vNode.length; i += 2) {
                    if (isSlotProp(vNode[i])) {
                        const value = vNode[i + 1];
                        "string" == typeof value && (vNode[i + 1] = this.$vnodeLocate$(value));
                    }
                }
            }
        }
        getSyncFn(id) {
            const fn = this.$qFuncs$[id];
            return assertTrue("function" == typeof fn, "Invalid reference: " + id), fn;
        }
        $appendStyle$(content, styleId, host, scoped) {
            if (scoped) {
                const scopedStyleIdsString = this.getHostProp(host, QScopedStyle);
                const scopedStyleIds = new Set(function(scopedStyleIds) {
                    return scopedStyleIds?.split(" ") ?? null;
                }(scopedStyleIdsString));
                scopedStyleIds.add(styleId), this.setHostProp(host, QScopedStyle, function(scopedStyleIds) {
                    return Array.from(scopedStyleIds).join(" ");
                }(scopedStyleIds));
            }
            if (null == this.$styleIds$ && (this.$styleIds$ = new Set, this.element.querySelectorAll("style[q\\:style]").forEach((style => {
                this.$styleIds$.add(style.getAttribute("q:style"));
            }))), !this.$styleIds$.has(styleId)) {
                this.$styleIds$.add(styleId);
                const styleElement = this.document.createElement("style");
                styleElement.setAttribute("q:style", styleId), styleElement.textContent = content, 
                this.$journal$.push(VNodeJournalOpCode.Insert, this.document.head, null, styleElement);
            }
        }
    }
    const useLexicalScope = () => {
        const context = getInvokeContext();
        let qrl = context.$qrl$;
        if (qrl) {
            assertQrl(qrl), assertDefined(qrl.$captureRef$, "invoke: qrl $captureRef$ must be defined inside useLexicalScope()", qrl);
        } else {
            const el = context.$element$;
            assertDefined(el, "invoke: element must be defined inside useLexicalScope()", context);
            const containerElement = _getQContainerElement(el);
            assertDefined(containerElement, "invoke: cant find parent q:container of", el);
            qrl = getDomContainer(containerElement).parseQRL(decodeURIComponent(String(context.$url$)));
        }
        return qrl.$captureRef$;
    };
    var TaskFlags;
    !function(TaskFlags) {
        TaskFlags[TaskFlags.VISIBLE_TASK = 1] = "VISIBLE_TASK", TaskFlags[TaskFlags.TASK = 2] = "TASK", 
        TaskFlags[TaskFlags.RESOURCE = 4] = "RESOURCE", TaskFlags[TaskFlags.DIRTY = 8] = "DIRTY";
    }(TaskFlags || (TaskFlags = {}));
    const useTaskQrl = (qrl, opts) => {
        const {val, set, iCtx, i} = useSequentialScope();
        if (val) {
            return;
        }
        assertQrl(qrl), set(1);
        const host = iCtx.$hostElement$;
        const task = new Task(TaskFlags.DIRTY | TaskFlags.TASK, i, iCtx.$hostElement$, qrl, void 0, null);
        set(task);
        const result = runTask(task, iCtx.$container$, host);
        if (isPromise(result)) {
            throw result;
        }
        qrl.$resolveLazy$(iCtx.$element$), isServerPlatform() && useRunTask(task, opts?.eagerness);
    };
    const runTask = (task, container, host) => {
        task.$flags$ &= ~TaskFlags.DIRTY, cleanupTask(task);
        const iCtx = newInvokeContext(container.$locale$, host, void 0, "qTask");
        iCtx.$container$ = container;
        const taskFn = task.$qrl$.getFn(iCtx, (() => clearSubscriberEffectDependencies(task)));
        const handleError = reason => container.handleError(reason, host);
        let cleanupFns = null;
        const cleanup = fn => {
            "function" == typeof fn && (cleanupFns || (cleanupFns = [], task.$destroy$ = noSerialize((() => {
                task.$destroy$ = null, cleanupFns.forEach((fn => {
                    try {
                        fn();
                    } catch (err) {
                        handleError(err);
                    }
                }));
            }))), cleanupFns.push(fn));
        };
        const taskApi = {
            track: (obj, prop) => {
                const ctx = newInvokeContext();
                return ctx.$effectSubscriber$ = [ task, EffectProperty.COMPONENT ], ctx.$container$ = container, 
                invoke(ctx, (() => isFunction(obj) ? obj() : prop ? obj[prop] : isSignal(obj) ? obj.value : obj));
            },
            cleanup
        };
        return safeCall((() => taskFn(taskApi)), cleanup, (err => isPromise(err) ? err.then((() => runTask(task, container, host))) : handleError(err)));
    };
    const cleanupTask = task => {
        const destroy = task.$destroy$;
        if (destroy) {
            task.$destroy$ = null;
            try {
                destroy();
            } catch (err) {
                logError(err);
            }
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
    class Task extends Subscriber {
        constructor($flags$, $index$, $el$, $qrl$, $state$, $destroy$) {
            super(), this.$flags$ = $flags$, this.$index$ = $index$, this.$el$ = $el$, this.$qrl$ = $qrl$, 
            this.$state$ = $state$, this.$destroy$ = $destroy$;
        }
    }
    const isTask = value => value instanceof Task;
    const _hW = () => {
        const [task] = useLexicalScope();
        getDomContainer(task.$el$).$scheduler$(task.$flags$ & TaskFlags.VISIBLE_TASK ? ChoreType.VISIBLE : ChoreType.TASK, task);
    };
    const stringifyPath = [];
    function qwikDebugToString(value) {
        if (null === value) {
            return "null";
        }
        if (void 0 === value) {
            return "undefined";
        }
        if ("string" == typeof value) {
            return '"' + value + '"';
        }
        if ("number" == typeof value || "boolean" == typeof value) {
            return String(value);
        }
        if (isTask(value)) {
            return `Task(${qwikDebugToString(value.$qrl$)})`;
        }
        if (isQrl$1(value)) {
            return `Qrl(${value.$symbol$})`;
        }
        if ("object" == typeof value || "function" == typeof value) {
            if (stringifyPath.includes(value)) {
                return "*";
            }
            try {
                if (stringifyPath.push(value), Array.isArray(value)) {
                    return vnode_isVNode(value) ? vnode_toString.apply(value) : value.map(qwikDebugToString);
                }
                if (isSignal(value)) {
                    return value instanceof WrappedSignal ? "WrappedSignal" : value instanceof ComputedSignal ? "ComputedSignal" : "Signal";
                }
                if (isStore(value)) {
                    return "Store";
                }
                if (isJSXNode(value)) {
                    return jsxToString(value);
                }
            } finally {
                stringifyPath.pop();
            }
        }
        return value;
    }
    const pad = (text, prefix) => String(text).split("\n").map(((line, idx) => (idx ? prefix : "") + line)).join("\n");
    const jsxToString = value => {
        if (isJSXNode(value)) {
            let type = value.type;
            "function" == typeof type && (type = type.name || "Component");
            let str = "<" + value.type;
            if (value.props) {
                for (const [key, val] of Object.entries(value.props)) {
                    str += " " + key + "=" + qwikDebugToString(val);
                }
                const children = value.children;
                null != children ? (str += ">", Array.isArray(children) ? children.forEach((child => {
                    str += jsxToString(child);
                })) : str += jsxToString(children), str += "</" + value.type + ">") : str += "/>";
            }
            return str;
        }
        return String(value);
    };
    var VNodeJournalOpCode;
    !function(VNodeJournalOpCode) {
        VNodeJournalOpCode[VNodeJournalOpCode.SetText = 1] = "SetText", VNodeJournalOpCode[VNodeJournalOpCode.SetAttribute = 2] = "SetAttribute", 
        VNodeJournalOpCode[VNodeJournalOpCode.HoistStyles = 3] = "HoistStyles", VNodeJournalOpCode[VNodeJournalOpCode.Remove = 4] = "Remove", 
        VNodeJournalOpCode[VNodeJournalOpCode.Insert = 5] = "Insert";
    }(VNodeJournalOpCode || (VNodeJournalOpCode = {}));
    const vnode_newElement = (element, elementName) => {
        assertEqual(fastNodeType(element), 1, "Expecting element node.");
        const vnode = VNodeArray.createElement(VNodeFlags.Element | VNodeFlags.Inflated | -1 << VNodeFlagsIndex.shift, null, null, null, null, null, element, elementName);
        return assertTrue(vnode_isElementVNode(vnode), "Incorrect format of ElementVNode."), 
        assertFalse(vnode_isTextVNode(vnode), "Incorrect format of ElementVNode."), assertFalse(vnode_isVirtualVNode(vnode), "Incorrect format of ElementVNode."), 
        vnode;
    };
    const vnode_newUnMaterializedElement = element => {
        assertEqual(fastNodeType(element), 1, "Expecting element node.");
        const vnode = VNodeArray.createElement(VNodeFlags.Element | -1 << VNodeFlagsIndex.shift, null, null, null, void 0, void 0, element, void 0);
        return assertTrue(vnode_isElementVNode(vnode), "Incorrect format of ElementVNode."), 
        assertFalse(vnode_isTextVNode(vnode), "Incorrect format of ElementVNode."), assertFalse(vnode_isVirtualVNode(vnode), "Incorrect format of ElementVNode."), 
        vnode;
    };
    const vnode_newSharedText = (previousTextNode, sharedTextNode, textContent) => {
        sharedTextNode && assertEqual(fastNodeType(sharedTextNode), 3, "Expecting element node.");
        const vnode = VNodeArray.createText(VNodeFlags.Text | -1 << VNodeFlagsIndex.shift, null, previousTextNode, null, sharedTextNode, textContent);
        return assertFalse(vnode_isElementVNode(vnode), "Incorrect format of TextVNode."), 
        assertTrue(vnode_isTextVNode(vnode), "Incorrect format of TextVNode."), assertFalse(vnode_isVirtualVNode(vnode), "Incorrect format of TextVNode."), 
        vnode;
    };
    const vnode_newText = (textNode, textContent) => {
        const vnode = VNodeArray.createText(VNodeFlags.Text | VNodeFlags.Inflated | -1 << VNodeFlagsIndex.shift, null, null, null, textNode, textContent);
        return assertEqual(fastNodeType(textNode), 3, "Expecting element node."), assertFalse(vnode_isElementVNode(vnode), "Incorrect format of TextVNode."), 
        assertTrue(vnode_isTextVNode(vnode), "Incorrect format of TextVNode."), assertFalse(vnode_isVirtualVNode(vnode), "Incorrect format of TextVNode."), 
        vnode;
    };
    const vnode_newVirtual = () => {
        const vnode = VNodeArray.createVirtual(VNodeFlags.Virtual | -1 << VNodeFlagsIndex.shift, null, null, null, null, null);
        return assertFalse(vnode_isElementVNode(vnode), "Incorrect format of TextVNode."), 
        assertFalse(vnode_isTextVNode(vnode), "Incorrect format of TextVNode."), assertTrue(vnode_isVirtualVNode(vnode), "Incorrect format of TextVNode."), 
        vnode;
    };
    const vnode_isVNode = vNode => vNode instanceof VNodeArray;
    const vnode_isElementVNode = vNode => {
        assertDefined(vNode, "Missing vNode");
        return (vNode[VNodeProps.flags] & VNodeFlags.Element) === VNodeFlags.Element;
    };
    const vnode_isElementOrTextVNode = vNode => {
        assertDefined(vNode, "Missing vNode");
        return !!(vNode[VNodeProps.flags] & VNodeFlags.ELEMENT_OR_TEXT_MASK);
    };
    const vnode_isMaterialized = vNode => {
        assertDefined(vNode, "Missing vNode");
        return (vNode[VNodeProps.flags] & VNodeFlags.Element) === VNodeFlags.Element && void 0 !== vNode[ElementVNodeProps.firstChild] && void 0 !== vNode[ElementVNodeProps.lastChild];
    };
    const vnode_isTextVNode = vNode => {
        assertDefined(vNode, "Missing vNode");
        return (vNode[VNodeProps.flags] & VNodeFlags.Text) === VNodeFlags.Text;
    };
    const vnode_isVirtualVNode = vNode => {
        assertDefined(vNode, "Missing vNode");
        return (vNode[VNodeProps.flags] & VNodeFlags.Virtual) === VNodeFlags.Virtual;
    };
    const ensureTextVNode = vNode => (assertTrue(vnode_isTextVNode(vNode), "Expecting TextVNode was: " + vnode_getNodeTypeName(vNode)), 
    vNode);
    const ensureElementOrVirtualVNode = vNode => {
        assertDefined(vNode, "Missing vNode"), assertTrue(!!(vNode[VNodeProps.flags] & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK), "Expecting ElementVNode or VirtualVNode was: " + vnode_getNodeTypeName(vNode));
    };
    const ensureElementVNode = vNode => (assertTrue(vnode_isElementVNode(vNode), "Expecting ElementVNode was: " + vnode_getNodeTypeName(vNode)), 
    vNode);
    const vnode_getNodeTypeName = vNode => {
        if (vNode) {
            switch (vNode[VNodeProps.flags] & VNodeFlags.TYPE_MASK) {
              case VNodeFlags.Element:
                return "Element";

              case VNodeFlags.Virtual:
                return "Virtual";

              case VNodeFlags.Text:
                return "Text";
            }
        }
        return "<unknown>";
    };
    const vnode_ensureElementInflated = vnode => {
        if ((vnode[VNodeProps.flags] & VNodeFlags.INFLATED_TYPE_MASK) === VNodeFlags.Element) {
            const elementVNode = vnode;
            elementVNode[VNodeProps.flags] ^= VNodeFlags.Inflated;
            const element = elementVNode[ElementVNodeProps.element];
            const attributes = element.attributes;
            for (let idx = 0; idx < attributes.length; idx++) {
                const attr = attributes[idx];
                const key = attr.name;
                if (key == Q_PROPS_SEPARATOR || !key) {
                    break;
                }
                if (key.startsWith("q:container")) {
                    attr.value === QContainerValue.HTML ? mapArray_set(elementVNode, "dangerouslySetInnerHTML", element.innerHTML, ElementVNodeProps.PROPS_OFFSET) : attr.value === QContainerValue.TEXT && "value" in element && mapArray_set(elementVNode, "value", element.value, ElementVNodeProps.PROPS_OFFSET);
                } else if (!key.startsWith("on:")) {
                    mapArray_set(elementVNode, key, attr.value, ElementVNodeProps.PROPS_OFFSET);
                }
            }
        }
    };
    function vnode_walkVNode(vNode) {
        let vCursor = vNode;
        if (vnode_isTextVNode(vNode)) {
            return;
        }
        let vParent = null;
        for (;;) {
            const vFirstChild = vnode_getFirstChild(vCursor);
            if (vFirstChild) {
                vCursor = vFirstChild;
                continue;
            }
            if (vCursor === vNode) {
                return;
            }
            const vNextSibling = vnode_getNextSibling(vCursor);
            if (vNextSibling) {
                vCursor = vNextSibling;
            } else {
                for (vParent = vnode_getParent(vCursor); vParent; ) {
                    if (vParent === vNode) {
                        return;
                    }
                    const vNextParentSibling = vnode_getNextSibling(vParent);
                    if (vNextParentSibling) {
                        vCursor = vNextParentSibling;
                        break;
                    }
                    vParent = vnode_getParent(vParent);
                }
                if (null == vParent) {
                    return;
                }
            }
        }
    }
    function vnode_getDOMChildNodes(journal, root, isVNode = !1, childNodes = []) {
        if (vnode_isElementOrTextVNode(root)) {
            return vnode_isTextVNode(root) && vnode_ensureTextInflated(journal, root), childNodes.push(isVNode ? root : vnode_getNode(root)), 
            childNodes;
        }
        let vNode = vnode_getFirstChild(root);
        for (;vNode; ) {
            vnode_isElementVNode(vNode) ? childNodes.push(isVNode ? vNode : vnode_getNode(vNode)) : vnode_isTextVNode(vNode) ? (vnode_ensureTextInflated(journal, vNode), 
            childNodes.push(isVNode ? vNode : vnode_getNode(vNode))) : vnode_getDOMChildNodes(journal, vNode, !!isVNode, childNodes), 
            vNode = vnode_getNextSibling(vNode);
        }
        return childNodes;
    }
    const vnode_getDomSibling = (vNode, nextDirection, descend) => {
        const childProp = nextDirection ? VirtualVNodeProps.firstChild : VirtualVNodeProps.lastChild;
        const siblingProp = nextDirection ? VNodeProps.nextSibling : VNodeProps.previousSibling;
        let cursor = vNode;
        for (;descend && cursor && vnode_isVirtualVNode(cursor); ) {
            const child = cursor[childProp];
            if (!child) {
                break;
            }
            if (child[VNodeProps.flags] & VNodeFlags.ELEMENT_OR_TEXT_MASK) {
                return child;
            }
            cursor = child;
        }
        for (;cursor; ) {
            let sibling = cursor[siblingProp];
            if (sibling && sibling[VNodeProps.flags] & VNodeFlags.ELEMENT_OR_TEXT_MASK) {
                return sibling;
            }
            if (!sibling) {
                let virtual = cursor[VNodeProps.parent];
                if (virtual && !vnode_isVirtualVNode(virtual)) {
                    return null;
                }
                for (;virtual && !(sibling = virtual[siblingProp]); ) {
                    if (virtual = virtual[VNodeProps.parent], virtual && !vnode_isVirtualVNode(virtual)) {
                        return null;
                    }
                }
                if (!sibling) {
                    return null;
                }
                if (vnode_isTextVNode(sibling) && virtual && vnode_isElementVNode(virtual)) {
                    return null;
                }
            }
            for (;sibling; ) {
                if (cursor = sibling, cursor[VNodeProps.flags] & VNodeFlags.ELEMENT_OR_TEXT_MASK && vnode_getNode(cursor)) {
                    return cursor;
                }
                sibling = cursor[childProp];
            }
        }
        return null;
    };
    const vnode_ensureTextInflated = (journal, vnode) => {
        const textVNode = ensureTextVNode(vnode);
        if (!(textVNode[VNodeProps.flags] & VNodeFlags.Inflated)) {
            const parentNode = vnode_getDomParent(vnode);
            const sharedTextNode = textVNode[TextVNodeProps.node];
            const doc = parentNode.ownerDocument;
            let cursor = vnode_getDomSibling(vnode, !1, !0);
            const insertBeforeNode = sharedTextNode || vnode_getDomSibling(vnode, !0, !0)?.[ElementVNodeProps.element] || null;
            let lastPreviousTextNode = insertBeforeNode;
            for (;cursor && vnode_isTextVNode(cursor); ) {
                if (!(cursor[VNodeProps.flags] & VNodeFlags.Inflated)) {
                    const textNode = doc.createTextNode(cursor[TextVNodeProps.text]);
                    journal.push(VNodeJournalOpCode.Insert, parentNode, lastPreviousTextNode, textNode), 
                    lastPreviousTextNode = textNode, cursor[TextVNodeProps.node] = textNode, cursor[VNodeProps.flags] |= VNodeFlags.Inflated;
                }
                cursor = vnode_getDomSibling(cursor, !1, !0);
            }
            for (cursor = vnode; cursor && vnode_isTextVNode(cursor); ) {
                const next = vnode_getDomSibling(cursor, !0, !0);
                const isLastNode = !next || !vnode_isTextVNode(next);
                if (!(cursor[VNodeProps.flags] & VNodeFlags.Inflated)) {
                    if (isLastNode && sharedTextNode) {
                        journal.push(VNodeJournalOpCode.SetText, sharedTextNode, cursor[TextVNodeProps.text]);
                    } else {
                        const textNode = doc.createTextNode(cursor[TextVNodeProps.text]);
                        journal.push(VNodeJournalOpCode.Insert, parentNode, insertBeforeNode, textNode), 
                        cursor[TextVNodeProps.node] = textNode;
                    }
                    cursor[VNodeProps.flags] |= VNodeFlags.Inflated;
                }
                cursor = next;
            }
        }
    };
    const vnode_locate = (rootVNode, id) => {
        ensureElementVNode(rootVNode);
        let vNode = rootVNode;
        const containerElement = rootVNode[ElementVNodeProps.element];
        const {qVNodeRefs} = containerElement;
        let elementOffset = -1;
        let refElement;
        if ("string" == typeof id ? (assertDefined(qVNodeRefs, "Missing qVNodeRefs."), elementOffset = parseInt(id), 
        refElement = qVNodeRefs.get(elementOffset)) : refElement = id, assertDefined(refElement, "Missing refElement."), 
        vnode_isVNode(refElement)) {
            vNode = refElement;
        } else {
            assertTrue(containerElement.contains(refElement), "Couldn't find the element inside the container while locating the VNode.");
            let parent = refElement;
            const elementPath = [ refElement ];
            for (;parent && parent !== containerElement; ) {
                parent = parent.parentElement, elementPath.push(parent);
            }
            for (let i = elementPath.length - 2; i >= 0; i--) {
                vNode = vnode_getVNodeForChildNode(vNode, elementPath[i]);
            }
            -1 != elementOffset && qVNodeRefs.set(elementOffset, vNode);
        }
        if ("string" == typeof id) {
            const idLength = id.length;
            let idx = indexOfAlphanumeric(id, idLength);
            let childIdx = 0;
            for (;idx < idLength; ) {
                const ch = id.charCodeAt(idx);
                childIdx *= 26, ch >= 97 ? childIdx += ch - 97 : (childIdx += ch - 65, vNode = vnode_getChildWithIdx(vNode, childIdx), 
                childIdx = 0), idx++;
            }
        }
        return vNode;
    };
    const vnode_getChildWithIdx = (vNode, childIdx) => {
        let child = vnode_getFirstChild(vNode);
        for (assertDefined(child, "Missing child."); child[VNodeProps.flags] >>> VNodeFlagsIndex.shift !== childIdx; ) {
            child = vnode_getNextSibling(child), assertDefined(child, "Missing child.");
        }
        return child;
    };
    const vNodeStack = [];
    const vnode_getVNodeForChildNode = (vNode, childElement) => {
        ensureElementVNode(vNode);
        let child = vnode_getFirstChild(vNode);
        for (assertDefined(child, "Missing child."); child && child[ElementVNodeProps.element] !== childElement; ) {
            if (vnode_isVirtualVNode(child)) {
                const next = vnode_getNextSibling(child);
                const firstChild = vnode_getFirstChild(child);
                firstChild ? (next && vNodeStack.push(next), child = firstChild) : child = next || (vNodeStack.length ? vNodeStack.pop() : null);
            } else {
                const next = vnode_getNextSibling(child);
                child = next || (next || vNodeStack.pop());
            }
            assertDefined(child, "Missing child.");
        }
        for (;vNodeStack.length; ) {
            vNodeStack.pop();
        }
        return ensureElementVNode(child), assertEqual(child[ElementVNodeProps.element], childElement, "Child not found."), 
        child;
    };
    const indexOfAlphanumeric = (id, length) => {
        let idx = 0;
        for (;idx < length; ) {
            if (!(id.charCodeAt(idx) <= 57)) {
                return idx;
            }
            idx++;
        }
        return length;
    };
    const parseBoolean = value => "false" !== value && Boolean(value);
    const isBooleanAttr = (element, key) => ("allowfullscreen" == key || "async" == key || "autofocus" == key || "autoplay" == key || "checked" == key || "controls" == key || "default" == key || "defer" == key || "disabled" == key || "formnovalidate" == key || "inert" == key || "ismap" == key || "itemscope" == key || "loop" == key || "multiple" == key || "muted" == key || "nomodule" == key || "novalidate" == key || "open" == key || "playsinline" == key || "readonly" == key || "required" == key || "reversed" == key || "selected" == key) && key in element;
    const vnode_applyJournal = journal => {
        let idx = 0;
        const length = journal.length;
        for (;idx < length; ) {
            switch (journal[idx++]) {
              case VNodeJournalOpCode.SetText:
                journal[idx++].nodeValue = journal[idx++];
                break;

              case VNodeJournalOpCode.SetAttribute:
                const element = journal[idx++];
                let key = journal[idx++];
                "className" === key && (key = "class");
                const value = journal[idx++];
                isBooleanAttr(element, key) ? element[key] = parseBoolean(value) : "value" === key && key in element ? element.value = escapeHTML(String(value)) : "dangerouslySetInnerHTML" === key ? element.innerHTML = value : null == value || !1 === value ? element.removeAttribute(key) : element.setAttribute(key, String(value));
                break;

              case VNodeJournalOpCode.HoistStyles:
                const document = journal[idx++];
                const head = document.head;
                const styles = document.querySelectorAll("style[q\\:style],style[q\\:sstyle]");
                for (let i = 0; i < styles.length; i++) {
                    head.appendChild(styles[i]);
                }
                break;

              case VNodeJournalOpCode.Remove:
                const removeParent = journal[idx++];
                let nodeToRemove;
                for (;idx < length && "number" != typeof (nodeToRemove = journal[idx]); ) {
                    removeParent.removeChild(nodeToRemove), idx++;
                }
                break;

              case VNodeJournalOpCode.Insert:
                const insertParent = journal[idx++];
                const insertBefore = journal[idx++];
                let newChild;
                for (;idx < length && "number" != typeof (newChild = journal[idx]); ) {
                    insertParent.insertBefore(newChild, insertBefore), idx++;
                }
            }
        }
        journal.length = 0;
    };
    const mapApp_findIndx = (elementVNode, key, start) => {
        assertTrue(start % 2 == 0, "Expecting even number.");
        let bottom = start >> 1;
        let top = elementVNode.length - 2 >> 1;
        for (;bottom <= top; ) {
            const mid = bottom + (top - bottom >> 1);
            const midKey = elementVNode[mid << 1];
            if (midKey === key) {
                return mid << 1;
            }
            midKey < key ? bottom = mid + 1 : top = mid - 1;
        }
        return ~(bottom << 1);
    };
    const mapArray_set = (elementVNode, key, value, start) => {
        const indx = mapApp_findIndx(elementVNode, key, start);
        indx >= 0 ? null == value ? elementVNode.splice(indx, 2) : elementVNode[indx + 1] = value : null != value && elementVNode.splice(~indx, 0, key, value);
    };
    const mapArray_get = (elementVNode, key, start) => {
        const indx = mapApp_findIndx(elementVNode, key, start);
        return indx >= 0 ? elementVNode[indx + 1] : null;
    };
    const vnode_insertBefore = (journal, parent, newChild, insertBefore) => {
        ensureElementOrVirtualVNode(parent), vnode_isElementVNode(parent) && ensureMaterialized(parent);
        let adjustedInsertBefore = null;
        null == insertBefore ? vnode_isVirtualVNode(parent) && (adjustedInsertBefore = vnode_getDomSibling(parent, !0, !1)) : adjustedInsertBefore = vnode_isVirtualVNode(insertBefore) ? vnode_getDomSibling(insertBefore, !0, !0) : insertBefore, 
        adjustedInsertBefore && ((journal, vNode) => {
            vnode_isTextVNode(vNode) && vnode_ensureTextInflated(journal, vNode);
        })(journal, adjustedInsertBefore);
        const domParentVNode = vnode_getDomParentVNode(parent);
        const parentNode = domParentVNode && domParentVNode[ElementVNodeProps.element];
        if (parentNode) {
            const domChildren = function(journal, domParentVNode, newChild) {
                const {elementNamespace, elementNamespaceFlag} = getNewElementNamespaceData(domParentVNode, newChild);
                let domChildren = [];
                if (elementNamespace === HTML_NS) {
                    domChildren = vnode_getDOMChildNodes(journal, newChild);
                } else {
                    const children = vnode_getDOMChildNodes(journal, newChild, !0);
                    for (let i = 0; i < children.length; i++) {
                        const childVNode = children[i];
                        if (vnode_isTextVNode(childVNode)) {
                            domChildren.push(childVNode[TextVNodeProps.node]);
                            continue;
                        }
                        if ((childVNode[VNodeProps.flags] & VNodeFlags.NAMESPACE_MASK) == (domParentVNode[VNodeProps.flags] & VNodeFlags.NAMESPACE_MASK)) {
                            domChildren.push(childVNode[ElementVNodeProps.element]);
                            continue;
                        }
                        const newChildElement = vnode_cloneElementWithNamespace(childVNode, domParentVNode, elementNamespace, elementNamespaceFlag);
                        newChildElement && domChildren.push(newChildElement);
                    }
                }
                return domChildren;
            }(journal, domParentVNode, newChild);
            domChildren.length && journal.push(VNodeJournalOpCode.Insert, parentNode, vnode_getNode(adjustedInsertBefore), ...domChildren);
        }
        const newChildCurrentParent = newChild[VNodeProps.parent];
        newChildCurrentParent && (newChild[VNodeProps.previousSibling] || newChild[VNodeProps.nextSibling] || vnode_isElementVNode(newChildCurrentParent) && newChildCurrentParent !== parent) && vnode_remove(journal, newChildCurrentParent, newChild, !1);
        const vNext = insertBefore;
        const vPrevious = vNext ? vNext[VNodeProps.previousSibling] : parent[ElementVNodeProps.lastChild];
        vNext ? vNext[VNodeProps.previousSibling] = newChild : parent[ElementVNodeProps.lastChild] = newChild, 
        vPrevious ? vPrevious[VNodeProps.nextSibling] = newChild : parent[ElementVNodeProps.firstChild] = newChild, 
        newChild[VNodeProps.previousSibling] = vPrevious, newChild[VNodeProps.nextSibling] = vNext, 
        newChild[VNodeProps.parent] = parent;
    };
    const vnode_getDomParent = vnode => (vnode = vnode_getDomParentVNode(vnode)) && vnode[ElementVNodeProps.element];
    const vnode_getDomParentVNode = vnode => {
        for (;vnode && !vnode_isElementVNode(vnode); ) {
            vnode = vnode[VNodeProps.parent];
        }
        return vnode;
    };
    const vnode_remove = (journal, vParent, vToRemove, removeDOM) => {
        assertEqual(vParent, vnode_getParent(vToRemove), "Parent mismatch."), vnode_isTextVNode(vToRemove) && vnode_ensureTextInflated(journal, vToRemove);
        const vPrevious = vToRemove[VNodeProps.previousSibling];
        const vNext = vToRemove[VNodeProps.nextSibling];
        if (vPrevious ? vPrevious[VNodeProps.nextSibling] = vNext : vParent[ElementVNodeProps.firstChild] = vNext, 
        vNext ? vNext[VNodeProps.previousSibling] = vPrevious : vParent[ElementVNodeProps.lastChild] = vPrevious, 
        vToRemove[VNodeProps.previousSibling] = null, vToRemove[VNodeProps.nextSibling] = null, 
        removeDOM) {
            const domParent = vnode_getDomParent(vParent);
            if (vnode_getAttr(vParent, "dangerouslySetInnerHTML")) {
                return;
            }
            const children = vnode_getDOMChildNodes(journal, vToRemove);
            domParent && children.length && journal.push(VNodeJournalOpCode.Remove, domParent, ...children);
        }
    };
    const vnode_truncate = (journal, vParent, vDelete) => {
        assertDefined(vDelete, "Missing vDelete.");
        const parent = vnode_getDomParent(vParent);
        const children = vnode_getDOMChildNodes(journal, vDelete);
        parent && children.length && journal.push(VNodeJournalOpCode.Remove, parent, ...children);
        const vPrevious = vDelete[VNodeProps.previousSibling];
        vPrevious ? vPrevious[VNodeProps.nextSibling] = null : vParent[ElementVNodeProps.firstChild] = null, 
        vParent[ElementVNodeProps.lastChild] = vPrevious;
    };
    const vnode_getElementName = vnode => {
        const elementVNode = ensureElementVNode(vnode);
        let elementName = elementVNode[ElementVNodeProps.elementName];
        return void 0 === elementName && (elementName = elementVNode[ElementVNodeProps.elementName] = elementVNode[ElementVNodeProps.element].nodeName.toLowerCase(), 
        elementVNode[VNodeProps.flags] |= (elementName => isSvgElement(elementName) ? VNodeFlags.NS_svg : isMathElement(elementName) ? VNodeFlags.NS_math : VNodeFlags.NS_html)(elementName)), 
        elementName;
    };
    const vnode_getText = vnode => {
        const textVNode = ensureTextVNode(vnode);
        let text = textVNode[TextVNodeProps.text];
        return void 0 === text && (text = textVNode[TextVNodeProps.text] = textVNode[TextVNodeProps.node].nodeValue), 
        text;
    };
    const vnode_setText = (journal, textVNode, text) => {
        vnode_ensureTextInflated(journal, textVNode);
        journal.push(VNodeJournalOpCode.SetText, textVNode[TextVNodeProps.node], textVNode[TextVNodeProps.text] = text);
    };
    const vnode_getFirstChild = vnode => {
        if (vnode_isTextVNode(vnode)) {
            return null;
        }
        let vFirstChild = vnode[ElementVNodeProps.firstChild];
        return void 0 === vFirstChild && (vFirstChild = ensureMaterialized(vnode)), vFirstChild;
    };
    const vnode_materialize = vNode => {
        const element = vNode[ElementVNodeProps.element];
        const firstChild = fastFirstChild(element);
        const vNodeData = element.ownerDocument?.qVNodeData?.get(element);
        const vFirstChild = vNodeData ? function(vParent, vData, element, child) {
            let idx = 0;
            let nextToConsumeIdx = 0;
            let vFirst = null;
            let vLast = null;
            let previousTextNode = null;
            let ch = 0;
            let peekCh = 0;
            const peek = () => 0 !== peekCh ? peekCh : peekCh = nextToConsumeIdx < vData.length ? vData.charCodeAt(nextToConsumeIdx) : 0;
            const consume = () => (ch = peek(), peekCh = 0, nextToConsumeIdx++, ch);
            const addVNode = node => {
                node[VNodeProps.flags] = node[VNodeProps.flags] & VNodeFlagsIndex.negated_mask | idx << VNodeFlagsIndex.shift, 
                idx++, vLast && (vLast[VNodeProps.nextSibling] = node), node[VNodeProps.previousSibling] = vLast, 
                node[VNodeProps.parent] = vParent, vFirst || (vParent[ElementVNodeProps.firstChild] = vFirst = node), 
                vLast = node;
            };
            const consumeValue = () => {
                consume();
                const start = nextToConsumeIdx;
                for (;peek() <= 58 && 0 !== peekCh || 95 === peekCh || peekCh >= 65 && peekCh <= 90 || peekCh >= 97 && peekCh <= 122; ) {
                    consume();
                }
                return vData.substring(start, nextToConsumeIdx);
            };
            let textIdx = 0;
            let combinedText = null;
            let container = null;
            for (;0 !== peek(); ) {
                if (isNumber(peek())) {
                    for (;!isElement(child); ) {
                        (child = fastNextSibling(child)) || throwErrorAndStop("Materialize error: missing element: " + vData + " " + peek() + " " + nextToConsumeIdx);
                    }
                    for (;isQStyleElement(child); ) {
                        child = fastNextSibling(child);
                    }
                    combinedText = null, previousTextNode = null;
                    let value = 0;
                    for (;isNumber(peek()); ) {
                        value *= 10, value += consume() - 48;
                    }
                    for (;value--; ) {
                        addVNode(vnode_newUnMaterializedElement(child)), child = fastNextSibling(child);
                    }
                } else if (peek() === VNodeDataChar_SCOPED_STYLE) {
                    vnode_setAttr(null, vParent, QScopedStyle, consumeValue());
                } else if (peek() === VNodeDataChar_RENDER_FN) {
                    vnode_setAttr(null, vParent, "q:renderFn", consumeValue());
                } else if (peek() === VNodeDataChar_ID) {
                    container || (container = getDomContainer(element));
                    const id = consumeValue();
                    container.$setRawState$(parseInt(id), vParent), build.isDev && vnode_setAttr(null, vParent, "q:id", id);
                } else if (peek() === VNodeDataChar_PROPS) {
                    vnode_setAttr(null, vParent, "q:props", consumeValue());
                } else if (peek() === VNodeDataChar_SLOT_REF) {
                    vnode_setAttr(null, vParent, "q:sref", consumeValue());
                } else if (peek() === VNodeDataChar_KEY) {
                    vnode_setAttr(null, vParent, ELEMENT_KEY, consumeValue());
                } else if (peek() === VNodeDataChar_SEQ) {
                    vnode_setAttr(null, vParent, "q:seq", consumeValue());
                } else if (peek() === VNodeDataChar_SEQ_IDX) {
                    vnode_setAttr(null, vParent, "q:seqIdx", consumeValue());
                } else if (peek() === VNodeDataChar_CONTEXT) {
                    vnode_setAttr(null, vParent, "q:ctx", consumeValue());
                } else if (peek() === VNodeDataChar_OPEN) {
                    consume(), addVNode(vnode_newVirtual()), stack.push(vParent, vFirst, vLast, previousTextNode, idx), 
                    idx = 0, vParent = vLast, vFirst = vLast = null;
                } else if (peek() === VNodeDataChar_SEPARATOR) {
                    const key = consumeValue();
                    const value = consumeValue();
                    vnode_setAttr(null, vParent, key, value);
                } else if (peek() === VNodeDataChar_CLOSE) {
                    consume(), vParent[ElementVNodeProps.lastChild] = vLast, idx = stack.pop(), previousTextNode = stack.pop(), 
                    vLast = stack.pop(), vFirst = stack.pop(), vParent = stack.pop();
                } else if (peek() === VNodeDataChar_SLOT) {
                    vnode_setAttr(null, vParent, QSlot, consumeValue());
                } else {
                    const textNode = child && 3 === fastNodeType(child) ? child : null;
                    null === combinedText && (combinedText = textNode ? textNode.nodeValue : null, textIdx = 0);
                    let length = 0;
                    for (;isLowercase(peek()); ) {
                        length += consume() - 97, length *= 26;
                    }
                    length += consume() - 65;
                    const text = null === combinedText ? "" : combinedText.substring(textIdx, textIdx + length);
                    addVNode(previousTextNode = vnode_newSharedText(previousTextNode, textNode, text)), 
                    textIdx += length;
                }
            }
            return vParent[ElementVNodeProps.lastChild] = vLast, vFirst;
        }(vNode, vNodeData, element, firstChild) : materializeFromDOM(vNode, firstChild);
        return vFirstChild;
    };
    const ensureMaterialized = vnode => {
        const vParent = ensureElementVNode(vnode);
        let vFirstChild = vParent[ElementVNodeProps.firstChild];
        if (void 0 === vFirstChild) {
            vFirstChild = vParent[VNodeProps.parent] && shouldIgnoreChildren(vParent[ElementVNodeProps.element]) ? vParent[ElementVNodeProps.firstChild] = vParent[ElementVNodeProps.lastChild] = null : vnode_materialize(vParent);
        }
        return assertTrue(void 0 !== vParent[ElementVNodeProps.firstChild], "Did not materialize."), 
        assertTrue(void 0 !== vParent[ElementVNodeProps.lastChild], "Did not materialize."), 
        vFirstChild;
    };
    let _fastHasAttribute = null;
    const shouldIgnoreChildren = node => (_fastHasAttribute || (_fastHasAttribute = node.hasAttribute), 
    _fastHasAttribute.call(node, "q:container"));
    let _fastNodeType = null;
    const fastNodeType = node => (_fastNodeType || (_fastNodeType = fastGetter(node, "nodeType")), 
    _fastNodeType.call(node));
    const fastIsTextOrElement = node => {
        const type = fastNodeType(node);
        return 3 === type || 1 === type;
    };
    let _fastNextSibling = null;
    const fastNextSibling = node => {
        for (_fastNextSibling || (_fastNextSibling = fastGetter(node, "nextSibling")), _fastFirstChild || (_fastFirstChild = fastGetter(node, "firstChild")); node; ) {
            if (null !== (node = _fastNextSibling.call(node))) {
                const type = fastNodeType(node);
                if (3 === type || 1 === type) {
                    break;
                }
                if (8 === type) {
                    const nodeValue = node.nodeValue;
                    if (nodeValue?.startsWith("q:ignore")) {
                        return getNodeAfterCommentNode(node, "q:container-island", _fastNextSibling, _fastFirstChild);
                    }
                    if (node.nodeValue?.startsWith("/q:container-island")) {
                        return getNodeAfterCommentNode(node, "/q:ignore", _fastNextSibling, _fastFirstChild);
                    }
                    if (nodeValue?.startsWith("q:container")) {
                        for (;node && (node = _fastNextSibling.call(node)) && (8 !== fastNodeType(node) || !node.nodeValue?.startsWith("/q:container")); ) {}
                    }
                }
            }
        }
        return node;
    };
    function getNodeAfterCommentNode(node, commentValue, nextSibling, firstChild) {
        for (;node; ) {
            if (node.nodeValue?.startsWith(commentValue)) {
                return node = nextSibling.call(node) || null;
            }
            let nextNode = firstChild.call(node);
            nextNode || (nextNode = nextSibling.call(node)), nextNode || (nextNode = fastParentNode(node), 
            nextNode && (nextNode = nextSibling.call(nextNode))), node = nextNode;
        }
        return null;
    }
    let _fastParentNode = null;
    const fastParentNode = node => (_fastParentNode || (_fastParentNode = fastGetter(node, "parentNode")), 
    _fastParentNode.call(node));
    let _fastFirstChild = null;
    const fastFirstChild = node => {
        for (_fastFirstChild || (_fastFirstChild = fastGetter(node, "firstChild")), node = node && _fastFirstChild.call(node); node && !fastIsTextOrElement(node); ) {
            node = fastNextSibling(node);
        }
        return node;
    };
    const fastGetter = (prototype, name) => {
        let getter;
        for (;prototype && !(getter = Object.getOwnPropertyDescriptor(prototype, name)?.get); ) {
            prototype = Object.getPrototypeOf(prototype);
        }
        return getter || function() {
            return this[name];
        };
    };
    const isQStyleElement = node => isElement(node) && "STYLE" === node.nodeName && (node.hasAttribute(QScopedStyle) || node.hasAttribute("q:style"));
    const materializeFromDOM = (vParent, firstChild) => {
        let vFirstChild = null;
        let child = firstChild;
        for (;isQStyleElement(child); ) {
            child = fastNextSibling(child);
        }
        let vChild = null;
        for (;child; ) {
            const nodeType = fastNodeType(child);
            let vNextChild = null;
            3 === nodeType ? vNextChild = vnode_newText(child, child.textContent ?? void 0) : 1 === nodeType && (vNextChild = vnode_newUnMaterializedElement(child)), 
            vNextChild && (vNextChild[VNodeProps.parent] = vParent, vChild && (vChild[VNodeProps.nextSibling] = vNextChild), 
            vNextChild[VNodeProps.previousSibling] = vChild, vChild = vNextChild), vFirstChild || (vParent[ElementVNodeProps.firstChild] = vFirstChild = vChild), 
            child = fastNextSibling(child);
        }
        return vParent[ElementVNodeProps.lastChild] = vChild || null, vParent[ElementVNodeProps.firstChild] = vFirstChild, 
        vFirstChild;
    };
    const vnode_getNextSibling = vnode => vnode[VNodeProps.nextSibling];
    const vnode_getAttrKeys = vnode => {
        if (vnode[VNodeProps.flags] & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK) {
            vnode_ensureElementInflated(vnode);
            const keys = [];
            for (let i = vnode_getPropStartIndex(vnode); i < vnode.length; i += 2) {
                const key = vnode[i];
                key.startsWith(":") || keys.push(key);
            }
            return keys;
        }
        return [];
    };
    const vnode_setAttr = (journal, vnode, key, value) => {
        const type = vnode[VNodeProps.flags];
        if (type & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK) {
            vnode_ensureElementInflated(vnode);
            const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
            if (idx >= 0) {
                if (vnode[idx + 1] != value && type & VNodeFlags.Element) {
                    journal && journal.push(VNodeJournalOpCode.SetAttribute, vnode[ElementVNodeProps.element], key, value);
                }
                null == value ? vnode.splice(idx, 2) : vnode[idx + 1] = value;
            } else if (null != value && (vnode.splice(~idx, 0, key, value), type & VNodeFlags.Element)) {
                journal && journal.push(VNodeJournalOpCode.SetAttribute, vnode[ElementVNodeProps.element], key, value);
            }
        }
    };
    const vnode_getAttr = (vnode, key) => vnode[VNodeProps.flags] & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK ? (vnode_ensureElementInflated(vnode), 
    mapArray_get(vnode, key, vnode_getPropStartIndex(vnode))) : null;
    const vnode_getProp = (vnode, key, getObject) => {
        const type = vnode[VNodeProps.flags];
        if (type & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK) {
            type & VNodeFlags.Element && vnode_ensureElementInflated(vnode);
            const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
            if (idx >= 0) {
                let value = vnode[idx + 1];
                return "string" == typeof value && getObject && (vnode[idx + 1] = value = getObject(value)), 
                value;
            }
        }
        return null;
    };
    const vnode_setProp = (vnode, key, value) => {
        ensureElementOrVirtualVNode(vnode);
        const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
        idx >= 0 ? vnode[idx + 1] = value : null != value && vnode.splice(~idx, 0, key, value);
    };
    const vnode_getPropStartIndex = vnode => {
        const type = vnode[VNodeProps.flags] & VNodeFlags.TYPE_MASK;
        if (type === VNodeFlags.Element) {
            return ElementVNodeProps.PROPS_OFFSET;
        }
        if (type === VNodeFlags.Virtual) {
            return VirtualVNodeProps.PROPS_OFFSET;
        }
        throw throwErrorAndStop("Invalid vnode type.");
    };
    const vnode_getParent = vnode => vnode[VNodeProps.parent] || null;
    const vnode_getNode = vnode => null === vnode || vnode_isVirtualVNode(vnode) ? null : vnode_isElementVNode(vnode) ? vnode[ElementVNodeProps.element] : (assertTrue(vnode_isTextVNode(vnode), "Expecting Text Node."), 
    vnode[TextVNodeProps.node]);
    function vnode_toString(depth = 10, offset = "", materialize = !1) {
        let vnode = this;
        if (0 === depth) {
            return "...";
        }
        if (null === vnode) {
            return "null";
        }
        if (void 0 === vnode) {
            return "undefined";
        }
        const strings = [];
        do {
            if (vnode_isTextVNode(vnode)) {
                strings.push(qwikDebugToString(vnode_getText(vnode)));
            } else if (vnode_isVirtualVNode(vnode)) {
                const attrs = [ "[" + String(vnode[VNodeProps.flags] >>> VNodeFlagsIndex.shift) + "]" ];
                vnode_getAttrKeys(vnode).forEach((key => {
                    if (key !== DEBUG_TYPE) {
                        const value = vnode_getAttr(vnode, key);
                        attrs.push(" " + key + "=" + qwikDebugToString(value));
                    }
                }));
                const name = VirtualTypeName[vnode_getAttr(vnode, DEBUG_TYPE) || VirtualType.Virtual] || VirtualTypeName[VirtualType.Virtual];
                strings.push("<" + name + attrs.join("") + ">");
                const child = vnode_getFirstChild(vnode);
                child && strings.push("  " + vnode_toString.call(child, depth - 1, offset + "  ", !0)), 
                strings.push("</" + name + ">");
            } else if (vnode_isElementVNode(vnode)) {
                const tag = vnode_getElementName(vnode);
                const attrs = [];
                const keys = vnode_getAttrKeys(vnode);
                keys.forEach((key => {
                    const value = vnode_getAttr(vnode, key);
                    attrs.push(" " + key + "=" + qwikDebugToString(value));
                }));
                const node = vnode_getNode(vnode);
                if (node) {
                    const vnodeData = node.ownerDocument.qVNodeData?.get(node);
                    vnodeData && attrs.push(" q:vnodeData=" + qwikDebugToString(vnodeData));
                }
                const domAttrs = node.attributes;
                for (let i = 0; i < domAttrs.length; i++) {
                    const attr = domAttrs[i];
                    -1 === keys.indexOf(attr.name) && attrs.push(" " + attr.name + (attr.value ? "=" + qwikDebugToString(attr.value) : ""));
                }
                if (strings.push("<" + tag + attrs.join("") + ">"), vnode_isMaterialized(vnode) || materialize) {
                    const child = vnode_getFirstChild(vnode);
                    child && strings.push("  " + vnode_toString.call(child, depth - 1, offset + "  ", !0));
                } else {
                    strings.push("  \x3c!-- not materialized --!>");
                }
                strings.push("</" + tag + ">");
            }
            vnode = vnode_getNextSibling(vnode) || null;
        } while (vnode);
        return strings.join("\n" + offset);
    }
    const isNumber = ch => 48 <= ch && ch <= 57;
    const isLowercase = ch => 97 <= ch && ch <= 122;
    const stack = [];
    const vnode_getType = vnode => {
        const type = vnode[VNodeProps.flags];
        if (type & VNodeFlags.Element) {
            return 1;
        }
        if (type & VNodeFlags.Virtual) {
            return 11;
        }
        if (type & VNodeFlags.Text) {
            return 3;
        }
        throw throwErrorAndStop("Unknown vnode type: " + type);
    };
    const isElement = node => node && "object" == typeof node && 1 === fastNodeType(node);
    const aPath = [];
    const bPath = [];
    const vnode_documentPosition = (a, b) => {
        if (a === b) {
            return 0;
        }
        let aDepth = -1;
        let bDepth = -1;
        for (;a; ) {
            a = (aPath[++aDepth] = a)[VNodeProps.parent];
        }
        for (;b; ) {
            b = (bPath[++bDepth] = b)[VNodeProps.parent];
        }
        for (;aDepth >= 0 && bDepth >= 0; ) {
            if ((a = aPath[aDepth]) !== (b = bPath[bDepth])) {
                let cursor = b;
                do {
                    if (cursor = vnode_getNextSibling(cursor), cursor === a) {
                        return 1;
                    }
                } while (cursor);
                cursor = b;
                do {
                    if (cursor = cursor[VNodeProps.previousSibling], cursor === a) {
                        return -1;
                    }
                } while (cursor);
                return 1;
            }
            aDepth--, bDepth--;
        }
        return aDepth < bDepth ? -1 : 1;
    };
    const vnode_getProjectionParentComponent = (vHost, rootVNode) => {
        let projectionDepth = 1;
        for (;projectionDepth--; ) {
            for (;vHost && (!vnode_isVirtualVNode(vHost) || null === vnode_getProp(vHost, "q:renderFn", null)); ) {
                const qSlotParentProp = vnode_getProp(vHost, QSlotParent, null);
                const qSlotParent = qSlotParentProp && ("string" == typeof qSlotParentProp ? vnode_locate(rootVNode, qSlotParentProp) : qSlotParentProp);
                const vProjectionParent = vnode_isVirtualVNode(vHost) && qSlotParent;
                vProjectionParent && projectionDepth++, vHost = vProjectionParent || vnode_getParent(vHost);
            }
            projectionDepth > 0 && (vHost = vnode_getParent(vHost));
        }
        return vHost;
    };
    const VNodeArray = class VNode extends Array {
        static createElement(flags, parent, previousSibling, nextSibling, firstChild, lastChild, element, elementName) {
            const vnode = new VNode(flags, parent, previousSibling, nextSibling);
            return vnode.push(firstChild, lastChild, element, elementName), vnode;
        }
        static createText(flags, parent, previousSibling, nextSibling, textNode, text) {
            const vnode = new VNode(flags, parent, previousSibling, nextSibling);
            return vnode.push(textNode, text), vnode;
        }
        static createVirtual(flags, parent, previousSibling, nextSibling, firstChild, lastChild) {
            const vnode = new VNode(flags, parent, previousSibling, nextSibling);
            return vnode.push(firstChild, lastChild), vnode;
        }
        constructor(flags, parent, previousSibling, nextSibling) {
            super(), this.push(flags, parent, previousSibling, nextSibling), build.isDev && (this.toString = vnode_toString);
        }
    };
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
        assertDefined(ctx.$effectSubscriber$, "invoke: $effectSubscriber$ must be defined", ctx), 
        ctx;
    };
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
    const newInvokeContextFromTuple = ([element, event, url]) => {
        const container = element.closest(QContainerSelector);
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
            $effectSubscriber$: void 0,
            $locale$: locale || ("object" == typeof event && event && "locale" in event ? event.locale : void 0),
            $container$: void 0
        };
        return seal(ctx), ctx;
    };
    const untrack = fn => invoke(void 0, fn);
    const trackInvocation = /*#__PURE__*/ newInvokeContext(void 0, void 0, void 0, "qRender");
    const trackSignal = (fn, subscriber, property, container, data) => {
        const previousSubscriber = trackInvocation.$effectSubscriber$;
        const previousContainer = trackInvocation.$container$;
        try {
            return trackInvocation.$effectSubscriber$ = [ subscriber, property ], data && trackInvocation.$effectSubscriber$.push(data), 
            trackInvocation.$container$ = container, invoke(trackInvocation, fn);
        } finally {
            trackInvocation.$effectSubscriber$ = previousSubscriber, trackInvocation.$container$ = previousContainer;
        }
    };
    const applyInlineComponent = (ssr, component$Host, component, jsx) => {
        const host = ssr.getLastNode();
        return executeComponent(ssr, host, component$Host, component, jsx.props);
    };
    const applyQwikComponentBody = (ssr, jsx, component) => {
        const host = ssr.getLastNode();
        const [componentQrl] = component[SERIALIZABLE_STATE];
        const srcProps = jsx.props;
        srcProps && srcProps.children && delete srcProps.children;
        const scheduler = ssr.$scheduler$;
        return host.setProp("q:renderFn", componentQrl), host.setProp("q:props", srcProps), 
        null !== jsx.key && host.setProp(ELEMENT_KEY, jsx.key), scheduler(ChoreType.COMPONENT_SSR, host, componentQrl, srcProps);
    };
    class SetScopedStyle {
        constructor($scopedStyle$) {
            this.$scopedStyle$ = $scopedStyle$;
        }
    }
    function _walkJSX(ssr, value, allowPromises, currentStyleScoped) {
        const stack = [ value ];
        let resolveDrain;
        let rejectDrain;
        const drained = allowPromises && new Promise(((res, rej) => {
            resolveDrain = res, rejectDrain = rej;
        }));
        const enqueue = value => stack.push(value);
        const resolveValue = value => {
            stack.push(value), drain();
        };
        const drain = () => {
            for (;stack.length; ) {
                const value = stack.pop();
                if (value instanceof SetScopedStyle) {
                    currentStyleScoped = value.$scopedStyle$;
                } else if ("function" != typeof value) {
                    processJSXNode(ssr, enqueue, value, currentStyleScoped);
                } else {
                    if (value === Promise) {
                        return allowPromises ? void stack.pop().then(resolveValue, rejectDrain) : throwErrorAndStop("Promises not expected here.");
                    }
                    const waitOn = value.apply(ssr);
                    if (waitOn) {
                        return allowPromises ? void waitOn.then(drain, rejectDrain) : throwErrorAndStop("Promises not expected here.");
                    }
                }
            }
            0 === stack.length && allowPromises && resolveDrain();
        };
        return drain(), drained;
    }
    function processJSXNode(ssr, enqueue, value, styleScoped) {
        if (null == value) {
            ssr.textNode("");
        } else if ("boolean" == typeof value) {
            ssr.textNode("");
        } else if ("number" == typeof value) {
            ssr.textNode(String(value));
        } else if ("string" == typeof value) {
            ssr.textNode(value);
        } else if ("object" == typeof value) {
            if (Array.isArray(value)) {
                for (let i = value.length - 1; i >= 0; i--) {
                    enqueue(value[i]);
                }
            } else if (isSignal(value)) {
                ssr.openFragment(build.isDev ? [ DEBUG_TYPE, VirtualType.WrappedSignal ] : EMPTY_ARRAY);
                const signalNode = ssr.getLastNode();
                enqueue(ssr.closeFragment), enqueue(trackSignal((() => value.value), signalNode, EffectProperty.VNODE, ssr));
            } else if (isPromise(value)) {
                ssr.openFragment(build.isDev ? [ DEBUG_TYPE, VirtualType.Awaited ] : EMPTY_ARRAY), 
                enqueue(ssr.closeFragment), enqueue(value), enqueue(Promise), enqueue((() => ssr.commentNode(FLUSH_COMMENT)));
            } else if (function(value) {
                return !!value[Symbol.asyncIterator];
            }(value)) {
                enqueue((async () => {
                    for await (const chunk of value) {
                        await _walkJSX(ssr, chunk, !0, styleScoped), ssr.commentNode(FLUSH_COMMENT);
                    }
                }));
            } else {
                const jsx = value;
                const type = jsx.type;
                if ("string" == typeof type) {
                    !(hasClassAttr(jsx.varProps) || jsx.constProps && hasClassAttr(jsx.constProps)) && styleScoped && (jsx.constProps || (jsx.constProps = {}), 
                    jsx.constProps.class = ""), function(jsx) {
                        if (build.isDev && qInspector && jsx.dev && "head" !== jsx.type) {
                            const sanitizedFileName = jsx.dev.fileName?.replace(/\\/g, "/");
                            const qwikInspectorAttr = "data-qwik-inspector";
                            sanitizedFileName && !(qwikInspectorAttr in jsx.props) && (jsx.constProps || (jsx.constProps = {}), 
                            jsx.constProps[qwikInspectorAttr] = `${sanitizedFileName}:${jsx.dev.lineNumber}:${jsx.dev.columnNumber}`);
                        }
                    }(jsx);
                    const innerHTML = ssr.openElement(type, toSsrAttrs(jsx.varProps, jsx.constProps, ssr.serializationCtx, !0, styleScoped, jsx.key), function(constProps, varProps, serializationCtx, styleScopedId) {
                        return toSsrAttrs(constProps, varProps, serializationCtx, !1, styleScopedId);
                    }(jsx.constProps, jsx.varProps, ssr.serializationCtx, styleScoped));
                    innerHTML && ssr.htmlNode(innerHTML), enqueue(ssr.closeElement), "head" === type ? (enqueue(ssr.additionalHeadNodes), 
                    enqueue(ssr.emitQwikLoaderAtTopIfNeeded)) : "body" === type && enqueue(ssr.additionalBodyNodes);
                    const children = jsx.children;
                    null != children && enqueue(children);
                } else if (isFunction(type)) {
                    if (type === Fragment) {
                        let attrs = null != jsx.key ? [ ELEMENT_KEY, jsx.key ] : EMPTY_ARRAY;
                        build.isDev && (attrs = [ DEBUG_TYPE, VirtualType.Fragment, ...attrs ]), ssr.openFragment(attrs), 
                        enqueue(ssr.closeFragment);
                        const children = jsx.children;
                        null != children && enqueue(children);
                    } else if (type === Slot) {
                        const componentFrame = ssr.getNearestComponentFrame() || ssr.unclaimedProjectionComponentFrameQueue.shift();
                        const projectionAttrs = build.isDev ? [ DEBUG_TYPE, VirtualType.Projection ] : [];
                        if (componentFrame) {
                            projectionAttrs.push(":", componentFrame.componentNode.id || ""), ssr.openProjection(projectionAttrs);
                            const host = componentFrame.componentNode;
                            const node = ssr.getLastNode();
                            const slotName = function(host, jsx, ssr) {
                                const constProps = jsx.constProps;
                                if (constProps && "object" == typeof constProps && "name" in constProps) {
                                    const constValue = constProps.name;
                                    if (constValue instanceof WrappedSignal) {
                                        return trackSignal((() => constValue.value), host, EffectProperty.COMPONENT, ssr);
                                    }
                                }
                                return jsx.props.name || QDefaultSlot;
                            }(host, jsx, ssr);
                            projectionAttrs.push(QSlot, slotName), enqueue(new SetScopedStyle(styleScoped)), 
                            enqueue(ssr.closeProjection);
                            const slotDefaultChildren = jsx.children || null;
                            const slotChildren = componentFrame.consumeChildrenForSlot(node, slotName) || slotDefaultChildren;
                            slotDefaultChildren && slotChildren !== slotDefaultChildren && ssr.addUnclaimedProjection(componentFrame, QDefaultSlot, slotDefaultChildren), 
                            enqueue(slotChildren), enqueue(new SetScopedStyle(componentFrame.childrenScopedStyle));
                        } else {
                            ssr.openFragment(build.isDev ? [ DEBUG_TYPE, VirtualType.Projection ] : EMPTY_ARRAY), 
                            ssr.closeFragment();
                        }
                    } else if (type === SSRComment) {
                        ssr.commentNode(jsx.props.data || "");
                    } else if (type === SSRStream) {
                        ssr.commentNode(FLUSH_COMMENT);
                        const generator = jsx.children;
                        let value;
                        value = isFunction(generator) ? generator({
                            async write(chunk) {
                                await _walkJSX(ssr, chunk, !0, styleScoped), ssr.commentNode(FLUSH_COMMENT);
                            }
                        }) : generator, enqueue(value), isPromise(value) && enqueue(Promise);
                    } else if (type === SSRRaw) {
                        ssr.htmlNode(jsx.props.data);
                    } else if (isQwikComponent(type)) {
                        ssr.openComponent(build.isDev ? [ DEBUG_TYPE, VirtualType.Component ] : []);
                        const host = ssr.getLastNode();
                        ssr.getComponentFrame(0).distributeChildrenIntoSlots(jsx.children, styleScoped);
                        const jsxOutput = applyQwikComponentBody(ssr, jsx, type);
                        const compStyleComponentId = addComponentStylePrefix(host.getProp(QScopedStyle));
                        enqueue(new SetScopedStyle(styleScoped)), enqueue(ssr.closeComponent), enqueue(jsxOutput), 
                        isPromise(jsxOutput) && enqueue(Promise), enqueue(new SetScopedStyle(compStyleComponentId));
                    } else {
                        ssr.openFragment(build.isDev ? [ DEBUG_TYPE, VirtualType.InlineComponent ] : EMPTY_ARRAY), 
                        enqueue(ssr.closeFragment);
                        const component = ssr.getComponentFrame(0);
                        const jsxOutput = applyInlineComponent(ssr, component && component.componentNode, type, jsx);
                        enqueue(jsxOutput), isPromise(jsxOutput) && enqueue(Promise);
                    }
                }
            }
        }
    }
    function toSsrAttrs(record, anotherRecord, serializationCtx, pushMergedEventProps, styleScopedId, key) {
        if (null == record) {
            return null;
        }
        const ssrAttrs = [];
        for (const key in record) {
            let value = record[key];
            if (isJsxPropertyAnEventName(key)) {
                if (anotherRecord) {
                    const anotherValue = getEventProp(anotherRecord, key);
                    if (anotherValue) {
                        if (!pushMergedEventProps) {
                            continue;
                        }
                        value = getMergedEventPropValues(value, anotherValue);
                    }
                }
                const eventValue = setEvent(serializationCtx, key, value);
                eventValue && ssrAttrs.push(convertEventNameFromJsxPropToHtmlAttr(key), eventValue);
            } else {
                isSignal(value) ? isClassAttr(key) ? ssrAttrs.push(key, [ value, styleScopedId ]) : ssrAttrs.push(key, value) : (isPreventDefault(key) && addPreventDefaultEventToSerializationContext(serializationCtx, key), 
                value = serializeAttribute(key, value, styleScopedId), ssrAttrs.push(key, value));
            }
        }
        return null != key && ssrAttrs.push(ELEMENT_KEY, key), ssrAttrs;
    }
    function getMergedEventPropValues(value, anotherValue) {
        let mergedValue = value;
        return Array.isArray(value) && Array.isArray(anotherValue) ? mergedValue = value.concat(anotherValue) : Array.isArray(mergedValue) ? mergedValue.push(anotherValue) : Array.isArray(anotherValue) ? (mergedValue = anotherValue, 
        mergedValue.push(value)) : mergedValue = [ value, anotherValue ], mergedValue;
    }
    function getEventProp(record, propKey) {
        const eventProp = propKey.toLowerCase();
        for (const prop in record) {
            if (prop.toLowerCase() === eventProp) {
                return record[prop];
            }
        }
        return null;
    }
    function setEvent(serializationCtx, key, rawValue) {
        let value = null;
        const qrls = rawValue;
        const appendToValue = valueToAppend => {
            value = (null == value ? "" : value + "\n") + valueToAppend;
        };
        if (Array.isArray(qrls)) {
            for (let i = 0; i <= qrls.length; i++) {
                const qrl = qrls[i];
                if (isQrl(qrl)) {
                    appendToValue(qrlToString(serializationCtx, qrl)), addQwikEventToSerializationContext(serializationCtx, key, qrl);
                } else if (null != qrl) {
                    const nestedValue = setEvent(serializationCtx, key, qrl);
                    nestedValue && appendToValue(nestedValue);
                }
            }
        } else {
            isQrl(qrls) && (value = qrlToString(serializationCtx, qrls), addQwikEventToSerializationContext(serializationCtx, key, qrls));
        }
        return value;
    }
    function addQwikEventToSerializationContext(serializationCtx, key, qrl) {
        const eventName = getEventNameFromJsxProp(key);
        eventName && (serializationCtx.$eventNames$.add(eventName), serializationCtx.$eventQrls$.add(qrl));
    }
    function addPreventDefaultEventToSerializationContext(serializationCtx, key) {
        const eventName = key.substring(15);
        eventName && serializationCtx.$eventNames$.add(eventName);
    }
    const _CONST_PROPS = Symbol("CONST");
    const _VAR_PROPS = Symbol("VAR");
    const _IMMUTABLE = Symbol("IMMUTABLE");
    const getProp = (obj, prop) => obj[prop];
    const _wrapProp = (obj, prop = "value") => {
        if (!isObject(obj)) {
            return obj[prop];
        }
        if (isSignal(obj)) {
            return assertEqual(prop, "value", "Left side is a signal, prop must be value"), 
            obj instanceof WrappedSignal ? obj : new WrappedSignal(null, getProp, [ obj, prop ], null);
        }
        if (_CONST_PROPS in obj) {
            const constProps = obj[_CONST_PROPS];
            if (constProps && prop in constProps) {
                return constProps[prop];
            }
        } else {
            const target = getStoreTarget(obj);
            if (target) {
                const signal = target[prop];
                return isSignal(signal) ? signal : new WrappedSignal(null, getProp, [ obj, prop ], null);
            }
        }
        return new WrappedSignal(null, getProp, [ obj, prop ], null);
    };
    const _jsxSorted = (type, varProps, constProps, children, flags, key, dev) => {
        const processed = null == key ? null : String(key);
        const node = new JSXNodeImpl(type, varProps || {}, constProps || null, children, flags, processed);
        return qDev && dev && (node.dev = {
            stack: (new Error).stack,
            ...dev
        }), seal(node), node;
    };
    const _jsxSplit = (type, varProps, constProps, children, flags, key, dev) => {
        let sortedProps;
        return sortedProps = varProps ? Object.fromEntries(untrack((() => Object.entries(varProps))).filter((entry => {
            const attr = entry[0];
            return "children" === attr ? (children ?? (children = entry[1]), !1) : "key" === attr ? (key = entry[1], 
            !1) : !constProps || !(attr in constProps) || /^on[A-Z].*\$$/.test(attr);
        })).sort((([a], [b]) => a < b ? -1 : 1))) : "string" == typeof type ? EMPTY_OBJ : {}, 
        constProps && "children" in constProps && (children = constProps.children, constProps.children = void 0), 
        _jsxSorted(type, sortedProps, constProps, children, flags, key, dev);
    };
    const jsx = (type, props, key) => _jsxSplit(type, props, null, null, 0, key || null);
    const flattenArray = (array, dst) => {
        dst || (dst = []);
        for (const item of array) {
            isArray(item) ? flattenArray(item, dst) : dst.push(item);
        }
        return dst;
    };
    function h(type, props, ...children) {
        const normalizedProps = {
            children: arguments.length > 2 ? flattenArray(children) : null
        };
        let key = null;
        for (const i in props) {
            "key" == i ? key = props[i] : normalizedProps[i] = props[i];
        }
        return "string" == typeof type && !key && "dangerouslySetInnerHTML" in normalizedProps && (key = "innerhtml"), 
        _jsxSplit(type, props, null, normalizedProps.children, 0, key);
    }
    const isPropsProxy = obj => obj && void 0 !== obj[_VAR_PROPS];
    class JSXNodeImpl {
        constructor(type, varProps, constProps, children, flags, key = null) {
            if (this.type = type, this.varProps = varProps, this.constProps = constProps, this.children = children, 
            this.flags = flags, this.key = key, this._proxy = null, qDev) {
                if ("object" != typeof varProps) {
                    throw new Error("JSXNodeImpl: varProps must be objects: " + JSON.stringify(varProps));
                }
                if ("object" != typeof constProps) {
                    throw new Error("JSXNodeImpl: constProps must be objects: " + JSON.stringify(constProps));
                }
            }
        }
        get props() {
            return this._proxy || (this._proxy = createPropsProxy(this.varProps, this.constProps, this.children)), 
            this._proxy;
        }
    }
    const Virtual = props => props.children;
    const RenderOnce = (props, key) => new JSXNodeImpl(Virtual, EMPTY_OBJ, null, props.children, 2, key);
    const isJSXNode = n => qDev ? n instanceof JSXNodeImpl || !!(isObject(n) && "key" in n && "props" in n && "type" in n) && (logWarn('Duplicate implementations of "JSXNode" found'), 
    !0) : n instanceof JSXNodeImpl;
    const Fragment = props => props.children;
    function createPropsProxy(varProps, constProps, children) {
        return new Proxy({}, new PropsProxyHandler(varProps, constProps, children));
    }
    class PropsProxyHandler {
        constructor($varProps$, $constProps$, $children$) {
            this.$varProps$ = $varProps$, this.$constProps$ = $constProps$, this.$children$ = $children$;
        }
        get(_, prop) {
            if (prop === _CONST_PROPS) {
                return this.$constProps$;
            }
            if (prop === _VAR_PROPS) {
                return this.$varProps$;
            }
            if (null != this.$children$ && "children" === prop) {
                return this.$children$;
            }
            const value = this.$constProps$ && prop in this.$constProps$ ? this.$constProps$[prop] : this.$varProps$[prop];
            return value instanceof WrappedSignal ? value.value : value;
        }
        set(_, prop, value) {
            return prop === _CONST_PROPS ? (this.$constProps$ = value, !0) : prop === _VAR_PROPS ? (this.$varProps$ = value, 
            !0) : (this.$constProps$ && prop in this.$constProps$ ? this.$constProps$[prop] = value : this.$varProps$[prop] = value, 
            !0);
        }
        deleteProperty(_, prop) {
            if ("string" != typeof prop) {
                return !1;
            }
            let didDelete = delete this.$varProps$[prop];
            return this.$constProps$ && (didDelete = delete this.$constProps$[prop] || didDelete), 
            null != this.$children$ && "children" === prop && (this.$children$ = null), didDelete;
        }
        has(_, prop) {
            return "children" === prop && null != this.$children$ || prop === _CONST_PROPS || prop === _VAR_PROPS || prop in this.$varProps$ || !!this.$constProps$ && prop in this.$constProps$;
        }
        getOwnPropertyDescriptor(target, p) {
            return {
                configurable: !0,
                enumerable: !0,
                value: "children" === p && null != this.$children$ ? this.$children$ : this.$constProps$ && p in this.$constProps$ ? this.$constProps$[p] : this.$varProps$[p]
            };
        }
        ownKeys() {
            const out = Object.keys(this.$varProps$);
            if (null != this.$children$ && -1 === out.indexOf("children") && out.push("children"), 
            this.$constProps$) {
                for (const key in this.$constProps$) {
                    -1 === out.indexOf(key) && out.push(key);
                }
            }
            return out;
        }
    }
    const deserializedProxyMap = new WeakMap;
    const unwrapDeserializerProxy = value => {
        const unwrapped = "object" == typeof value && null !== value && value[SERIALIZER_PROXY_UNWRAP];
        return unwrapped || value;
    };
    const SERIALIZER_PROXY_UNWRAP = Symbol("UNWRAP");
    const wrapDeserializerProxy = (container, value) => {
        if ("object" == typeof value && null !== value && isObjectLiteral(value) && !vnode_isVNode(value)) {
            if ((value => "object" == typeof value && null !== value && SERIALIZER_PROXY_UNWRAP in value)(value)) {
                return value;
            }
            {
                let proxy = deserializedProxyMap.get(value);
                return proxy || (proxy = new Proxy(value, new DeserializationHandler(container)), 
                deserializedProxyMap.set(value, proxy)), proxy;
            }
        }
        return value;
    };
    class DeserializationHandler {
        constructor($container$) {
            this.$container$ = $container$;
        }
        get(target, property, receiver) {
            if (property === SERIALIZER_PROXY_UNWRAP) {
                return target;
            }
            if (void 0 !== getStoreTarget(target)) {
                const unwrapped = unwrapDeserializerProxy(unwrapStore(target));
                const unwrappedPropValue = Reflect.get(unwrapped, property, receiver);
                if ("string" == typeof unwrappedPropValue && unwrappedPropValue.length >= 1 && unwrappedPropValue.charCodeAt(0) === SerializationConstant.String_VALUE) {
                    return allocate(unwrappedPropValue);
                }
            }
            let propValue = Reflect.get(target, property, receiver);
            let typeCode;
            if ("string" == typeof propValue && propValue.length >= 1 && (typeCode = propValue.charCodeAt(0)) < SerializationConstant.LAST_VALUE) {
                const container = this.$container$;
                const serializedValue = propValue;
                if (typeCode === SerializationConstant.REFERENCE_VALUE) {
                    propValue = unwrapDeserializerProxy(container.$getObjectById$(parseInt(propValue.substring(1))));
                } else if (typeCode === SerializationConstant.VNode_VALUE) {
                    propValue = propValue === SerializationConstant.VNode_CHAR ? container.element.ownerDocument : vnode_locate(container.rootVNode, propValue.substring(1));
                } else if (typeCode === SerializationConstant.Store_VALUE) {
                    propValue = function(container, data) {
                        restStack.push(rest, restIdx), rest = data, restIdx = 1;
                        const target = container.$getObjectById$(restInt());
                        const store = createStore(container, target, restInt());
                        const storeHandler = getStoreHandler(store);
                        const effectSerializedString = rest.substring(restIdx);
                        if (effectSerializedString.length) {
                            const effectProps = effectSerializedString.split("|");
                            if (effectProps.length) {
                                const effects = storeHandler.$effects$ = {};
                                for (let i = 0; i < effectProps.length; i++) {
                                    const effect = effectProps[i];
                                    const idx = effect.indexOf(";");
                                    let prop = effect.substring(0, idx);
                                    prop === SerializationConstant.UNDEFINED_CHAR && (prop = STORE_ARRAY_PROP);
                                    deserializeSignal2Effect(0, effect.substring(idx + 1).split(";"), container, effects[prop] = []);
                                }
                            }
                        }
                        return restIdx = restStack.pop(), rest = restStack.pop(), store;
                    }(container, propValue);
                } else {
                    if (typeCode === SerializationConstant.WrappedSignal_VALUE && !Array.isArray(target)) {
                        return wrapDeserializerProxy(container, function(container, target, property) {
                            const immutable = {};
                            for (const key in target) {
                                if (Object.prototype.hasOwnProperty.call(target, key)) {
                                    const value = target[key];
                                    if ("string" == typeof value && value.charCodeAt(0) === SerializationConstant.WrappedSignal_VALUE) {
                                        const wrappedSignal = immutable[key] = allocate(value);
                                        Object.defineProperty(target, key, {
                                            get: () => wrappedSignal.value,
                                            enumerable: !0
                                        }), inflate(container, wrappedSignal, value);
                                    }
                                }
                            }
                            return target[_CONST_PROPS] = immutable, target[property];
                        }(container, target, property));
                    }
                    propValue = allocate(propValue);
                }
                ("string" != typeof propValue || propValue.length > 0 && propValue.charCodeAt(0) >= SerializationConstant.LAST_VALUE) && (Reflect.set(target, property, propValue, receiver), 
                typeCode >= SerializationConstant.Error_VALUE && inflate(container, propValue, serializedValue));
            }
            return propValue = wrapDeserializerProxy(this.$container$, propValue), propValue;
        }
        set(target, property, newValue, receiver) {
            return "string" == typeof newValue && newValue.length >= 1 && newValue.charCodeAt(0) < SerializationConstant.LAST_VALUE ? Reflect.set(target, property, SerializationConstant.String_CHAR + newValue, receiver) : Reflect.set(target, property, newValue, receiver);
        }
        has(target, property) {
            return property === SERIALIZER_PROXY_UNWRAP || Object.prototype.hasOwnProperty.call(target, property);
        }
    }
    const restStack = [];
    let rest = null;
    let restIdx;
    const restInt = () => parseInt(restString());
    const restString = () => {
        const start = restIdx;
        const length = rest.length;
        let depth = 0;
        let ch;
        do {
            if (!(restIdx < length)) {
                restIdx = length + 1;
                break;
            }
            ch = rest.charCodeAt(restIdx++), 91 === ch ? depth++ : 93 === ch && depth--;
        } while (depth > 0 || 32 !== ch);
        return rest.substring(start, restIdx - 1);
    };
    const inflate = (container, target, needsInflationData) => {
        switch (restStack.push(rest, restIdx), rest = needsInflationData, restIdx = 1, needsInflationData.charCodeAt(0)) {
          case SerializationConstant.QRL_VALUE:
            inflateQRL(container, target);
            break;

          case SerializationConstant.Task_VALUE:
            const task = target;
            task.$flags$ = restInt(), task.$index$ = restInt(), task.$el$ = container.$getObjectById$(restInt()), 
            task.$effectDependencies$ = container.$getObjectById$(restInt()), task.$qrl$ = inflateQRL(container, parseQRL(restString()));
            const taskState = restString();
            task.$state$ = taskState ? container.$getObjectById$(taskState) : void 0;
            break;

          case SerializationConstant.Resource_VALUE:
            return throwErrorAndStop("Not implemented");

          case SerializationConstant.Component_VALUE:
            inflateQRL(container, target[SERIALIZABLE_STATE][0]);
            break;

          case SerializationConstant.Store_VALUE:
            break;

          case SerializationConstant.Signal_VALUE:
            deserializeSignal2(target, container, rest, !1, !1);
            break;

          case SerializationConstant.WrappedSignal_VALUE:
            deserializeSignal2(target, container, rest, !0, !1);
            break;

          case SerializationConstant.ComputedSignal_VALUE:
            deserializeSignal2(target, container, rest, !1, !0);
            break;

          case SerializationConstant.Error_VALUE:
            Object.assign(target, container.$getObjectById$(restInt()));
            break;

          case SerializationConstant.FormData_VALUE:
            const formData = target;
            for (const [key, value] of container.$getObjectById$(restInt())) {
                formData.append(key, value);
            }
            break;

          case SerializationConstant.JSXNode_VALUE:
            const jsx = target;
            jsx.type = function(container, type) {
                if (":slot" === type) {
                    return Slot;
                }
                if (":fragment" === type) {
                    return Fragment;
                }
                {
                    const ch = type.charCodeAt(0);
                    return 48 <= ch && ch <= 57 ? container.$getObjectById$(type) : type;
                }
            }(container, restString()), jsx.varProps = container.$getObjectById$(restInt()), 
            jsx.constProps = container.$getObjectById$(restInt()), jsx.children = container.$getObjectById$(restInt()), 
            jsx.flags = restInt(), jsx.key = restString() || null;
            break;

          case SerializationConstant.Set_VALUE:
            const set = target;
            const setValues = container.$getObjectById$(restInt());
            for (let i = 0; i < setValues.length; i++) {
                set.add(setValues[i]);
            }
            break;

          case SerializationConstant.Map_VALUE:
            const map = target;
            const mapKeyValue = container.$getObjectById$(restInt());
            for (let i = 0; i < mapKeyValue.length; ) {
                map.set(mapKeyValue[i++], mapKeyValue[i++]);
            }
            break;

          case SerializationConstant.Promise_VALUE:
            const promise = target;
            const id = restInt();
            id >= 0 ? promise[PROMISE_RESOLVE](container.$getObjectById$(id)) : promise[PROMISE_REJECT](container.$getObjectById$(~id));
            break;

          case SerializationConstant.Uint8Array_VALUE:
            const bytes = target;
            const buf = atob(restString());
            let i = 0;
            for (const s of buf) {
                bytes[i++] = s.charCodeAt(0);
            }
            break;

          case SerializationConstant.PropsProxy_VALUE:
            const propsProxy = target;
            propsProxy[_VAR_PROPS] = container.$getObjectById$(restInt()), propsProxy[_CONST_PROPS] = container.$getObjectById$(restInt());
            break;

          default:
            return throwErrorAndStop("Not implemented");
        }
        restIdx = restStack.pop(), rest = restStack.pop();
    };
    const allocate = value => {
        switch (value.charCodeAt(0)) {
          case SerializationConstant.UNDEFINED_VALUE:
            return;

          case SerializationConstant.QRL_VALUE:
            return parseQRL(value);

          case SerializationConstant.Task_VALUE:
            return new Task(-1, -1, null, null, null, null);

          case SerializationConstant.Resource_VALUE:
            return throwErrorAndStop("Not implemented");

          case SerializationConstant.URL_VALUE:
            return new URL(value.substring(1));

          case SerializationConstant.Date_VALUE:
            return new Date(value.substring(1));

          case SerializationConstant.Regex_VALUE:
            const idx = value.lastIndexOf("/");
            return new RegExp(value.substring(2, idx), value.substring(idx + 1));

          case SerializationConstant.Error_VALUE:
            return new Error;

          case SerializationConstant.Component_VALUE:
            return componentQrl(parseQRL(value));

          case SerializationConstant.Signal_VALUE:
            return new Signal(null, 0);

          case SerializationConstant.WrappedSignal_VALUE:
            return new WrappedSignal(null, null, null, null);

          case SerializationConstant.ComputedSignal_VALUE:
            return new ComputedSignal(null, null);

          case SerializationConstant.NotFinite_VALUE:
            const type = value.substring(1);
            if (0 === type.length) {
                return Number.NaN;
            }
            return "-" === type ? -1 / 0 : 1 / 0;

          case SerializationConstant.URLSearchParams_VALUE:
            return new URLSearchParams(value.substring(1));

          case SerializationConstant.FormData_VALUE:
            return new FormData;

          case SerializationConstant.JSXNode_VALUE:
            return new JSXNodeImpl(null, null, null, null, -1, null);

          case SerializationConstant.BigInt_VALUE:
            return BigInt(value.substring(1));

          case SerializationConstant.Set_VALUE:
            return new Set;

          case SerializationConstant.Map_VALUE:
            return new Map;

          case SerializationConstant.String_VALUE:
            return value.substring(1);

          case SerializationConstant.Promise_VALUE:
            let resolve;
            let reject;
            const promise = new Promise(((res, rej) => {
                resolve = res, reject = rej;
            }));
            return promise[PROMISE_RESOLVE] = resolve, promise[PROMISE_REJECT] = reject, promise;

          case SerializationConstant.Uint8Array_VALUE:
            const encodedLength = value.length - 1;
            const rest = 3 & encodedLength;
            return new Uint8Array(3 * (encodedLength >>> 2) + (rest ? rest - 1 : 0));

          case SerializationConstant.PropsProxy_VALUE:
            return createPropsProxy(null, null);

          default:
            return throwErrorAndStop("unknown allocate type: " + value.charCodeAt(0));
        }
    };
    const PROMISE_RESOLVE = Symbol("resolve");
    const PROMISE_REJECT = Symbol("reject");
    function parseQRL(qrl) {
        const hashIdx = qrl.indexOf("#");
        const captureStart = qrl.indexOf("[", hashIdx);
        const captureEnd = qrl.indexOf("]", captureStart);
        const chunk = hashIdx > -1 ? qrl.substring(qrl.charCodeAt(0) < SerializationConstant.LAST_VALUE ? 1 : 0, hashIdx) : qrl.substring(0, captureStart);
        const symbol = captureStart > -1 ? qrl.substring(hashIdx + 1, captureStart) : qrl.substring(hashIdx + 1);
        let qrlRef = null;
        const captureIds = captureStart > -1 && captureEnd > -1 ? qrl.substring(captureStart + 1, captureEnd).split(" ").filter((v => v.length)) : null;
        if (chunk === QRL_RUNTIME_CHUNK) {
            const backChannel = globalThis[QRL_RUNTIME_CHUNK];
            assertDefined(backChannel, "Missing QRL_RUNTIME_CHUNK"), qrlRef = backChannel.get(symbol);
        }
        return createQRL(chunk, symbol, qrlRef, null, captureIds, null, null);
    }
    function inflateQRL(container, qrl) {
        const captureIds = qrl.$capture$;
        return qrl.$captureRef$ = captureIds ? captureIds.map((id => container.$getObjectById$(parseInt(id)))) : null, 
        container.element && qrl.$setContainer$(container.element), qrl;
    }
    const createSerializationContext = (NodeConstructor, symbolToChunkResolver, setProp, writer) => {
        if (!writer) {
            const buffer = [];
            writer = {
                write: text => buffer.push(text),
                toString: () => buffer.join("")
            };
        }
        const map = new Map;
        const syncFnMap = new Map;
        const syncFns = [];
        const roots = [];
        const $wasSeen$ = obj => map.get(obj);
        const $seen$ = obj => map.set(obj, Number.MIN_SAFE_INTEGER);
        const $addRoot$ = obj => {
            let id = map.get(obj);
            return "number" == typeof id && id !== Number.MIN_SAFE_INTEGER || (id = roots.length, 
            map.set(obj, id), roots.push(obj)), id;
        };
        return {
            $serialize$() {
                !function(serializationContext) {
                    const {$writer$, $addRoot$, $NodeConstructor$, $setProp$} = serializationContext;
                    let depth = -1;
                    const writeString = text => {
                        text = JSON.stringify(text);
                        let angleBracketIdx = -1;
                        let lastIdx = 0;
                        for (;-1 !== (angleBracketIdx = text.indexOf("</", lastIdx)); ) {
                            $writer$.write(text.substring(lastIdx, angleBracketIdx)), $writer$.write("<\\/"), 
                            lastIdx = angleBracketIdx + 2;
                        }
                        $writer$.write(0 === lastIdx ? text : text.substring(lastIdx));
                    };
                    const writeValue = (value, idx) => {
                        if (fastSkipSerialize(value)) {
                            return writeString(SerializationConstant.UNDEFINED_CHAR);
                        }
                        if ("bigint" == typeof value) {
                            return writeString(SerializationConstant.BigInt_CHAR + value.toString());
                        }
                        if ("boolean" == typeof value) {
                            $writer$.write(String(value));
                        } else if ("function" == typeof value) {
                            if (isQrl(value)) {
                                writeString(SerializationConstant.QRL_CHAR + qrlToString(serializationContext, value));
                            } else if (isQwikComponent(value)) {
                                const [qrl] = value[SERIALIZABLE_STATE];
                                serializationContext.$renderSymbols$.add(qrl.$symbol$), writeString(SerializationConstant.Component_CHAR + qrlToString(serializationContext, qrl));
                            } else {
                                writeString(value.toString());
                            }
                        } else if ("number" == typeof value) {
                            if (Number.isNaN(value)) {
                                return writeString(SerializationConstant.NotFinite_CHAR);
                            }
                            if (!Number.isFinite(value)) {
                                return writeString(SerializationConstant.NotFinite_CHAR + (value > 0 ? "+" : "-"));
                            }
                            $writer$.write(String(value));
                        } else if ("object" == typeof value) {
                            depth++, null === value ? $writer$.write("null") : writeObjectValue(value, idx), 
                            depth--;
                        } else if ("string" == typeof value) {
                            let seenIdx;
                            if (shouldTrackObj(value) && depth > 0 && void 0 !== (seenIdx = serializationContext.$hasRootId$(value))) {
                                return assertTrue(seenIdx >= 0, "seenIdx >= 0"), writeString(SerializationConstant.REFERENCE_CHAR + seenIdx);
                            }
                            value.length > 0 && value.charCodeAt(0) < SerializationConstant.LAST_VALUE ? writeString(SerializationConstant.String_CHAR + value) : writeString(value);
                        } else {
                            if (void 0 !== value) {
                                return throwErrorAndStop("Unknown type: " + typeof value);
                            }
                            writeString(SerializationConstant.UNDEFINED_CHAR);
                        }
                    };
                    const writeObjectValue = (value, idx) => {
                        const seen = depth <= 1 ? void 0 : serializationContext.$wasSeen$(value);
                        if (fastSkipSerialize(value)) {
                            writeString(SerializationConstant.UNDEFINED_CHAR);
                        } else if ("number" == typeof seen && seen >= 0) {
                            writeString(SerializationConstant.REFERENCE_CHAR + seen);
                        } else if (isPropsProxy(value)) {
                            const varId = $addRoot$(value[_VAR_PROPS]);
                            const constId = $addRoot$(value[_CONST_PROPS]);
                            writeString(SerializationConstant.PropsProxy_CHAR + varId + " " + constId);
                        } else if (isStore(value)) {
                            const storeHandler = getStoreHandler(value);
                            let store = SerializationConstant.Store_CHAR + $addRoot$(unwrapStore(value)) + " " + storeHandler.$flags$;
                            const effects = storeHandler.$effects$;
                            if (effects) {
                                let sep = " ";
                                for (const propName in effects) {
                                    store += sep + propName + serializeEffectSubs($addRoot$, effects[propName]), sep = "|";
                                }
                                effects[STORE_ARRAY_PROP] && (store += sep + SerializationConstant.UNDEFINED_CHAR + serializeEffectSubs($addRoot$, effects[STORE_ARRAY_PROP]));
                            }
                            writeString(store);
                        } else if (isObjectLiteral(value)) {
                            (function(value) {
                                return "__brand" in value && "resource" === value.__brand;
                            })(value) && serializationContext.$resources$.add(value), serializeObjectLiteral(value, $writer$, writeValue, writeString);
                        } else if (value instanceof Signal) {
                            writeString(value instanceof WrappedSignal ? SerializationConstant.WrappedSignal_CHAR + function(serializationContext, value, $addRoot$) {
                                value.$funcStr$ && "{" === value.$funcStr$[0] && (value.$funcStr$ = `(${value.$funcStr$})`);
                                const syncFnId = serializationContext.$addSyncFn$(value.$funcStr$, value.$args$.length, value.$func$);
                                const args = value.$args$.map($addRoot$).join(" ");
                                return syncFnId + (args.length ? " " + args : "");
                            }(serializationContext, value, $addRoot$) + ";" + $addRoot$(value.$effectDependencies$) + ";" + $addRoot$(value.untrackedValue) + serializeEffectSubs($addRoot$, value.$effects$) : value instanceof ComputedSignal ? SerializationConstant.ComputedSignal_CHAR + qrlToString(serializationContext, value.$computeQrl$) + ";" + $addRoot$(value.$untrackedValue$) + serializeEffectSubs($addRoot$, value.$effects$) : SerializationConstant.Signal_CHAR + $addRoot$(value.$untrackedValue$) + serializeEffectSubs($addRoot$, value.$effects$));
                        } else if (value instanceof URL) {
                            writeString(SerializationConstant.URL_CHAR + value.href);
                        } else if (value instanceof Date) {
                            writeString(SerializationConstant.Date_CHAR + value.toJSON());
                        } else if (value instanceof RegExp) {
                            writeString(SerializationConstant.Regex_CHAR + value.toString());
                        } else if (value instanceof Error) {
                            const errorProps = Object.assign({
                                message: value.message,
                                stack: value.stack
                            }, value);
                            writeString(SerializationConstant.Error_CHAR + $addRoot$(errorProps));
                        } else if ($NodeConstructor$ && value instanceof $NodeConstructor$) {
                            $setProp$(value, "q:id", String(idx)), writeString(SerializationConstant.VNode_CHAR + value.id);
                        } else if ("undefined" != typeof FormData && value instanceof FormData) {
                            const array = [];
                            value.forEach(((value, key) => {
                                array.push("string" == typeof value ? [ key, value ] : [ key, value.name ]);
                            })), writeString(SerializationConstant.FormData_CHAR + $addRoot$(array));
                        } else if (value instanceof URLSearchParams) {
                            writeString(SerializationConstant.URLSearchParams_CHAR + value.toString());
                        } else if (value instanceof Set) {
                            writeString(SerializationConstant.Set_CHAR + getSerializableDataRootId(value));
                        } else if (value instanceof Map) {
                            writeString(SerializationConstant.Map_CHAR + getSerializableDataRootId(value));
                        } else if (isJSXNode(value)) {
                            writeString(SerializationConstant.JSXNode_CHAR + function($addRoot$, type) {
                                return "string" == typeof type ? type : type === Slot ? ":slot" : type === Fragment ? ":fragment" : $addRoot$(type);
                            }($addRoot$, value.type) + " " + $addRoot$(value.varProps) + " " + $addRoot$(value.constProps) + " " + $addRoot$(value.children) + " " + value.flags + " " + (value.key || ""));
                        } else if (value instanceof Task) {
                            writeString(SerializationConstant.Task_CHAR + value.$flags$ + " " + value.$index$ + " " + $addRoot$(value.$el$) + " " + $addRoot$(value.$effectDependencies$) + " " + qrlToString(serializationContext, value.$qrl$) + (null == value.$state$ ? "" : " " + $addRoot$(value.$state$)));
                        } else if (isPromise(value)) {
                            writeString(SerializationConstant.Promise_CHAR + getSerializableDataRootId(value));
                        } else {
                            if (!(value instanceof Uint8Array)) {
                                return throwErrorAndStop("implement");
                            }
                            {
                                let buf = "";
                                for (const c of value) {
                                    buf += String.fromCharCode(c);
                                }
                                const out = btoa(buf).replace(/=+$/, "");
                                writeString(SerializationConstant.Uint8Array_CHAR + out);
                            }
                        }
                    };
                    const serializeObjectLiteral = (value, $writer$, writeValue, writeString) => {
                        Array.isArray(value) ? function(value, $writer$, writeValue) {
                            $writer$.write("[");
                            for (let i = 0; i < value.length; i++) {
                                0 !== i && $writer$.write(","), writeValue(value[i], i);
                            }
                            $writer$.write("]");
                        }(value, $writer$, writeValue) : ($writer$.write("{"), function(value, $writer$, writeValue, writeString) {
                            let delimiter = !1;
                            for (const key in value) {
                                Object.prototype.hasOwnProperty.call(value, key) && !fastSkipSerialize(value[key]) && (delimiter && $writer$.write(","), 
                                writeString(key), $writer$.write(":"), writeValue(value[key], -1), delimiter = !0);
                            }
                        }(value, $writer$, writeValue, writeString), $writer$.write("}"));
                    };
                    writeValue(serializationContext.$roots$, -1);
                }(this);
            },
            $NodeConstructor$: NodeConstructor,
            $symbolToChunkResolver$: symbolToChunkResolver,
            $wasSeen$,
            $roots$: roots,
            $seen$,
            $hasRootId$: obj => {
                const id = map.get(obj);
                return void 0 === id || id === Number.MIN_SAFE_INTEGER ? void 0 : id;
            },
            $addRoot$,
            $getRootId$: obj => {
                const id = map.get(obj);
                if (!id || id === Number.MIN_SAFE_INTEGER) {
                    throw throwErrorAndStop("Missing root id for: " + obj);
                }
                return id;
            },
            $syncFns$: syncFns,
            $addSyncFn$: (funcStr, argCount, fn) => {
                const isFullFn = null == funcStr;
                isFullFn && (funcStr = fn.toString());
                let id = syncFnMap.get(funcStr);
                if (void 0 === id) {
                    if (id = syncFns.length, syncFnMap.set(funcStr, id), isFullFn) {
                        syncFns.push(funcStr);
                    } else {
                        let code = "(";
                        for (let i = 0; i < argCount; i++) {
                            code += (0 == i ? "p" : ",p") + i;
                        }
                        syncFns.push(code += ")=>" + funcStr);
                    }
                }
                return id;
            },
            $writer$: writer,
            $breakCircularDepsAndAwaitPromises$: () => {
                const promises = [];
                const objRootsLength = roots.length;
                for (let i = 0; i < objRootsLength; i++) {
                    breakCircularDependenciesAndResolvePromises(roots[i], promises);
                }
                const drain = () => {
                    if (promises.length) {
                        return Promise.allSettled(promises).then(drain, drain);
                    }
                };
                return drain();
            },
            $eventQrls$: new Set,
            $eventNames$: new Set,
            $resources$: new Set,
            $renderSymbols$: new Set,
            $setProp$: setProp
        };
        function breakCircularDependenciesAndResolvePromises(rootObj, promises) {
            const discoveredValues = [ rootObj ];
            for (;discoveredValues.length; ) {
                const obj = discoveredValues.pop();
                if (shouldTrackObj(obj) || frameworkType(obj)) {
                    const isRoot = obj === rootObj;
                    const id = $wasSeen$(obj);
                    const unwrapObj = unwrapStore(obj);
                    if (void 0 === id || isRoot) {
                        if (!isRoot && $seen$(obj), "object" != typeof obj || null === obj || obj instanceof URL || obj instanceof Date || obj instanceof RegExp || obj instanceof Error || obj instanceof Date || obj instanceof Uint8Array || obj instanceof URLSearchParams || "undefined" != typeof FormData && obj instanceof FormData) {} else if (fastSkipSerialize(obj)) {} else if (unwrapObj !== obj) {
                            discoveredValues.push(unwrapObj);
                        } else if (obj instanceof Set) {
                            const contents = Array.from(obj.values());
                            setSerializableDataRootId($addRoot$, obj, contents), discoveredValues.push(...contents);
                        } else if (obj instanceof Map) {
                            const tuples = [];
                            obj.forEach(((v, k) => {
                                tuples.push(k, v), discoveredValues.push(k, v);
                            })), setSerializableDataRootId($addRoot$, obj, tuples), discoveredValues.push(tuples);
                        } else if (obj instanceof Signal) {
                            if ($addRoot$(obj), discoveredValues.push(obj.$untrackedValue$), obj.$effects$) {
                                for (const effect of obj.$effects$) {
                                    for (let i = 0; i <= effect.length; i++) {
                                        if (i === EffectSubscriptionsProp.PROPERTY) {
                                            continue;
                                        }
                                        const effectData = effect[i];
                                        effectData instanceof Signal && effectData !== obj && discoveredValues.push(effect[i]);
                                    }
                                }
                            }
                            obj instanceof WrappedSignal && obj.$effectDependencies$ && discoveredValues.push(obj.$effectDependencies$);
                        } else if (obj instanceof Task) {
                            discoveredValues.push(obj.$el$, obj.$qrl$, obj.$state$, obj.$effectDependencies$);
                        } else if (NodeConstructor && obj instanceof NodeConstructor) {} else if (isJSXNode(obj)) {
                            discoveredValues.push(obj.type, obj.props, obj.constProps, obj.children);
                        } else if (Array.isArray(obj)) {
                            discoveredValues.push(...obj);
                        } else if (isQrl(obj)) {
                            obj.$captureRef$ && obj.$captureRef$.length && discoveredValues.push(...obj.$captureRef$);
                        } else if (isPropsProxy(obj)) {
                            discoveredValues.push(obj[_VAR_PROPS], obj[_CONST_PROPS]);
                        } else if (isPromise(obj)) {
                            obj.then((value => {
                                setSerializableDataRootId($addRoot$, obj, value), promises.splice(promises.indexOf(obj), 1);
                            }), (error => {
                                obj[SERIALIZABLE_ROOT_ID] = ~$addRoot$(error), promises.splice(promises.indexOf(obj), 1);
                            })), promises.push(obj);
                        } else {
                            if (!isObjectLiteral(obj)) {
                                return throwErrorAndStop("Unknown type: " + obj);
                            }
                            for (const key in obj) {
                                Object.prototype.hasOwnProperty.call(obj, key) && discoveredValues.push(obj[key]);
                            }
                        }
                    } else {
                        id === Number.MIN_SAFE_INTEGER && $addRoot$(obj);
                    }
                }
            }
        }
    };
    function serializeEffectSubs(addRoot, effects) {
        let data = "";
        if (effects) {
            for (let i = 0; i < effects.length; i++) {
                const effectSubscription = effects[i];
                const prop = effectSubscription[EffectSubscriptionsProp.PROPERTY];
                data += ";" + addRoot(effectSubscription[EffectSubscriptionsProp.EFFECT]) + " " + prop;
                let effectSubscriptionDataIndex = EffectSubscriptionsProp.FIRST_BACK_REF_OR_DATA;
                const effectSubscriptionData = effectSubscription[effectSubscriptionDataIndex];
                effectSubscriptionData instanceof EffectData && (data += " |" + addRoot(effectSubscriptionData.data), 
                effectSubscriptionDataIndex++);
                for (let j = effectSubscriptionDataIndex; j < effectSubscription.length; j++) {
                    data += " " + addRoot(effectSubscription[j]);
                }
            }
        }
        return data;
    }
    function deserializeSignal2(signal, container, data, readFn, readQrl) {
        signal.$container$ = container;
        const parts = data.substring(1).split(";");
        let idx = 0;
        if (readFn) {
            const derivedSignal = signal;
            derivedSignal.$invalid$ = !1;
            const fnParts = parts[idx++].split(" ");
            derivedSignal.$func$ = container.getSyncFn(parseInt(fnParts[0]));
            for (let i = 1; i < fnParts.length; i++) {
                (derivedSignal.$args$ || (derivedSignal.$args$ = [])).push(container.$getObjectById$(parseInt(fnParts[i])));
            }
            const dependencies = container.$getObjectById$(parts[idx++]);
            derivedSignal.$effectDependencies$ = dependencies;
        }
        if (readQrl) {
            signal.$computeQrl$ = inflateQRL(container, parseQRL(parts[idx++]));
        }
        let signalValue = container.$getObjectById$(parts[idx++]);
        if (vnode_isVNode(signalValue) && (signalValue = vnode_getNode(signalValue)), signal.$untrackedValue$ = signalValue, 
        idx < parts.length) {
            idx = deserializeSignal2Effect(idx, parts, container, signal.$effects$ || (signal.$effects$ = []));
        }
    }
    function deserializeSignal2Effect(idx, parts, container, effects) {
        for (;idx < parts.length; ) {
            const effect = parts[idx++].split(" ").map(((obj, idx) => idx === EffectSubscriptionsProp.PROPERTY ? obj : "|" === obj[0] ? new EffectData(container.$getObjectById$(parseInt(obj.substring(1)))) : container.$getObjectById$(obj)));
            effects.push(effect);
        }
        return idx;
    }
    function setSerializableDataRootId($addRoot$, obj, value) {
        obj[SERIALIZABLE_ROOT_ID] = $addRoot$(value);
    }
    function getSerializableDataRootId(value) {
        const id = value[SERIALIZABLE_ROOT_ID];
        return assertDefined(id, "Missing SERIALIZABLE_ROOT_ID"), id;
    }
    function qrlToString(serializationContext, value) {
        let symbol = value.$symbol$;
        let chunk = value.$chunk$;
        const refSymbol = value.$refSymbol$ ?? symbol;
        const platform = getPlatform();
        if (platform) {
            const result = platform.chunkForSymbol(refSymbol, chunk, value.dev?.file);
            result && (chunk = result[1], value.$refSymbol$ || (symbol = result[0]));
        }
        if (isSyncQrl(value)) {
            chunk = "", symbol = String(serializationContext.$addSyncFn$(null, 0, value.resolved));
        } else {
            chunk || (chunk = serializationContext.$symbolToChunkResolver$(value.$hash$));
            {
                let backChannel = globalThis[QRL_RUNTIME_CHUNK];
                backChannel || (backChannel = globalThis[QRL_RUNTIME_CHUNK] = new Map), backChannel.set(value.$symbol$, value._devOnlySymbolRef), 
                chunk || (chunk = QRL_RUNTIME_CHUNK);
            }
            chunk || throwErrorAndStop("Missing chunk for: " + value.$symbol$), chunk.startsWith("./") && (chunk = chunk.slice(2));
        }
        let qrlStringInline = `${chunk}#${symbol}`;
        if (Array.isArray(value.$captureRef$) && value.$captureRef$.length > 0) {
            let serializedReferences = "";
            for (let i = 0; i < value.$captureRef$.length; i++) {
                i > 0 && (serializedReferences += " "), serializedReferences += serializationContext.$addRoot$(value.$captureRef$[i]);
            }
            qrlStringInline += `[${serializedReferences}]`;
        } else {
            value.$capture$ && value.$capture$.length > 0 && (qrlStringInline += `[${value.$capture$.join(" ")}]`);
        }
        return qrlStringInline;
    }
    function deserializeData(stateData, serializedData, container) {
        let typeCode;
        if ("string" == typeof serializedData && serializedData.length >= 1 && (typeCode = serializedData.charCodeAt(0)) < SerializationConstant.LAST_VALUE) {
            let propValue = serializedData;
            return propValue = typeCode === SerializationConstant.REFERENCE_VALUE ? unwrapDeserializerProxy(container.$getObjectById$(parseInt(propValue.substring(1)))) : allocate(propValue), 
            typeCode >= SerializationConstant.Error_VALUE && inflate(container, propValue, serializedData), 
            propValue;
        }
        return serializedData && "object" == typeof serializedData ? Array.isArray(serializedData) ? function(stateData, serializedData, container) {
            for (let i = 0; i < serializedData.length; i++) {
                serializedData[i] = deserializeData(stateData, serializedData[i], container);
            }
            return serializedData;
        }(stateData, serializedData, container) : function(stateData, serializedData, container) {
            if (!isSerializableObject(serializedData)) {
                return serializedData;
            }
            for (const key in serializedData) {
                if (Object.prototype.hasOwnProperty.call(serializedData, key)) {
                    serializedData[key] = deserializeData(stateData, serializedData[key], container);
                }
            }
            return serializedData;
        }(stateData, serializedData, container) : serializedData;
    }
    function createDeserializeContainer(stateData, element) {
        const container = {
            $getObjectById$: id => function(id, stateData) {
                return "string" == typeof id && (id = parseFloat(id)), assertTrue(id < stateData.length, "Invalid reference"), 
                stateData[id];
            }(id, stateData),
            getSyncFn: () => () => {},
            element: null
        };
        return element && (container.element = element), container;
    }
    function shouldTrackObj(obj) {
        return "object" == typeof obj && null !== obj || "string" == typeof obj && obj.length > 10;
    }
    function isObjectLiteral(obj) {
        const prototype = Object.getPrototypeOf(obj);
        return null == prototype || prototype === Object.prototype || prototype === Array.prototype;
    }
    const frameworkType = obj => "object" == typeof obj && null !== obj && (obj instanceof Signal || obj instanceof Task || isJSXNode(obj)) || isQrl(obj);
    const canSerialize = value => {
        if (null == value || "string" == typeof value || "number" == typeof value || "boolean" == typeof value || "bigint" == typeof value) {
            return !0;
        }
        if ("object" == typeof value) {
            const proto = Object.getPrototypeOf(value);
            if (isStore(value) && (value = unwrapStore(value)), proto == Object.prototype) {
                for (const key in value) {
                    if (!canSerialize(value[key])) {
                        return !1;
                    }
                }
                return !0;
            }
            if (proto == Array.prototype) {
                for (let i = 0; i < value.length; i++) {
                    if (!canSerialize(value[i])) {
                        return !1;
                    }
                }
                return !0;
            }
            if (isTask(value)) {
                return !0;
            }
            if (isPropsProxy(value)) {
                return !0;
            }
            if (isPromise(value)) {
                return !0;
            }
            if (isJSXNode(value)) {
                return !0;
            }
            if (value instanceof Error) {
                return !0;
            }
            if (value instanceof URL) {
                return !0;
            }
            if (value instanceof Date) {
                return !0;
            }
            if (value instanceof RegExp) {
                return !0;
            }
            if (value instanceof URLSearchParams) {
                return !0;
            }
            if (value instanceof FormData) {
                return !0;
            }
            if (value instanceof Set) {
                return !0;
            }
            if (value instanceof Map) {
                return !0;
            }
            if (value instanceof Uint8Array) {
                return !0;
            }
        } else if ("function" == typeof value && (isQrl(value) || isQwikComponent(value))) {
            return !0;
        }
        return !1;
    };
    const QRL_RUNTIME_CHUNK = "qwik-runtime-mock-chunk";
    const SERIALIZABLE_ROOT_ID = Symbol("SERIALIZABLE_ROOT_ID");
    var SerializationConstant;
    !function(SerializationConstant) {
        SerializationConstant.UNDEFINED_CHAR = "\0", SerializationConstant[SerializationConstant.UNDEFINED_VALUE = 0] = "UNDEFINED_VALUE", 
        SerializationConstant.REFERENCE_CHAR = "", SerializationConstant[SerializationConstant.REFERENCE_VALUE = 1] = "REFERENCE_VALUE", 
        SerializationConstant.URL_CHAR = "", SerializationConstant[SerializationConstant.URL_VALUE = 2] = "URL_VALUE", 
        SerializationConstant.Date_CHAR = "", SerializationConstant[SerializationConstant.Date_VALUE = 3] = "Date_VALUE", 
        SerializationConstant.Regex_CHAR = "", SerializationConstant[SerializationConstant.Regex_VALUE = 4] = "Regex_VALUE", 
        SerializationConstant.String_CHAR = "", SerializationConstant[SerializationConstant.String_VALUE = 5] = "String_VALUE", 
        SerializationConstant.VNode_CHAR = "", SerializationConstant[SerializationConstant.VNode_VALUE = 6] = "VNode_VALUE", 
        SerializationConstant.NotFinite_CHAR = "", SerializationConstant[SerializationConstant.NotFinite_VALUE = 7] = "NotFinite_VALUE", 
        SerializationConstant.BigInt_CHAR = "\b", SerializationConstant[SerializationConstant.BigInt_VALUE = 8] = "BigInt_VALUE", 
        SerializationConstant.UNUSED_HORIZONTAL_TAB_CHAR = "\t", SerializationConstant[SerializationConstant.UNUSED_HORIZONTAL_TAB_VALUE = 9] = "UNUSED_HORIZONTAL_TAB_VALUE", 
        SerializationConstant.UNUSED_NEW_LINE_CHAR = "\n", SerializationConstant[SerializationConstant.UNUSED_NEW_LINE_VALUE = 10] = "UNUSED_NEW_LINE_VALUE", 
        SerializationConstant.UNUSED_VERTICAL_TAB_CHAR = "\v", SerializationConstant[SerializationConstant.UNUSED_VERTICAL_TAB_VALUE = 11] = "UNUSED_VERTICAL_TAB_VALUE", 
        SerializationConstant.UNUSED_FORM_FEED_CHAR = "\f", SerializationConstant[SerializationConstant.UNUSED_FORM_FEED_VALUE = 12] = "UNUSED_FORM_FEED_VALUE", 
        SerializationConstant.UNUSED_CARRIAGE_RETURN_CHAR = "\r", SerializationConstant[SerializationConstant.UNUSED_CARRIAGE_RETURN_VALUE = 13] = "UNUSED_CARRIAGE_RETURN_VALUE", 
        SerializationConstant.URLSearchParams_CHAR = "", SerializationConstant[SerializationConstant.URLSearchParams_VALUE = 14] = "URLSearchParams_VALUE", 
        SerializationConstant.Error_CHAR = "", SerializationConstant[SerializationConstant.Error_VALUE = 15] = "Error_VALUE", 
        SerializationConstant.QRL_CHAR = "", SerializationConstant[SerializationConstant.QRL_VALUE = 16] = "QRL_VALUE", 
        SerializationConstant.Task_CHAR = "", SerializationConstant[SerializationConstant.Task_VALUE = 17] = "Task_VALUE", 
        SerializationConstant.Resource_CHAR = "", SerializationConstant[SerializationConstant.Resource_VALUE = 18] = "Resource_VALUE", 
        SerializationConstant.Component_CHAR = "", SerializationConstant[SerializationConstant.Component_VALUE = 19] = "Component_VALUE", 
        SerializationConstant.Signal_CHAR = "", SerializationConstant[SerializationConstant.Signal_VALUE = 20] = "Signal_VALUE", 
        SerializationConstant.WrappedSignal_CHAR = "", SerializationConstant[SerializationConstant.WrappedSignal_VALUE = 21] = "WrappedSignal_VALUE", 
        SerializationConstant.ComputedSignal_CHAR = "", SerializationConstant[SerializationConstant.ComputedSignal_VALUE = 22] = "ComputedSignal_VALUE", 
        SerializationConstant.Store_CHAR = "", SerializationConstant[SerializationConstant.Store_VALUE = 23] = "Store_VALUE", 
        SerializationConstant.FormData_CHAR = "", SerializationConstant[SerializationConstant.FormData_VALUE = 24] = "FormData_VALUE", 
        SerializationConstant.JSXNode_CHAR = "", SerializationConstant[SerializationConstant.JSXNode_VALUE = 25] = "JSXNode_VALUE", 
        SerializationConstant.Set_CHAR = "", SerializationConstant[SerializationConstant.Set_VALUE = 26] = "Set_VALUE", 
        SerializationConstant.Map_CHAR = "", SerializationConstant[SerializationConstant.Map_VALUE = 27] = "Map_VALUE", 
        SerializationConstant.Promise_CHAR = "", SerializationConstant[SerializationConstant.Promise_VALUE = 28] = "Promise_VALUE", 
        SerializationConstant.Uint8Array_CHAR = "", SerializationConstant[SerializationConstant.Uint8Array_VALUE = 30] = "Uint8Array_VALUE", 
        SerializationConstant.PropsProxy_CHAR = "", SerializationConstant[SerializationConstant.PropsProxy_VALUE = 31] = "PropsProxy_VALUE", 
        SerializationConstant[SerializationConstant.LAST_VALUE = 32] = "LAST_VALUE";
    }(SerializationConstant || (SerializationConstant = {}));
    const verifySerializable = (value, preMessage) => {
        const seen = new Set;
        return _verifySerializable(value, seen, "_", preMessage);
    };
    const _verifySerializable = (value, seen, ctx, preMessage) => {
        const unwrapped = unwrapStore(value);
        if (null == unwrapped) {
            return value;
        }
        if (shouldSerialize(unwrapped)) {
            if (seen.has(unwrapped)) {
                return value;
            }
            if (seen.add(unwrapped), isSignal(unwrapped)) {
                return value;
            }
            if (canSerialize(unwrapped)) {
                return value;
            }
            const typeObj = typeof unwrapped;
            switch (typeObj) {
              case "object":
                if (isPromise(unwrapped)) {
                    return value;
                }
                if (isNode(unwrapped)) {
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
    const noSerialize = input => (null != input && noSerializeSet.add(input), input);
    const isQrl = value => "function" == typeof value && "function" == typeof value.getSymbol;
    const isSyncQrl = value => isQrl(value) && "<sync>" == value.$symbol$;
    const createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
        if (qDev && captureRef) {
            for (const item of captureRef) {
                verifySerializable(item, "Captured variable in the closure can not be serialized");
            }
        }
        let _containerEl;
        const qrl = async function(...args) {
            const fn = invokeFn.call(this, tryGetInvokeContext());
            return await fn(...args);
        };
        const setContainer = el => (_containerEl || (_containerEl = el), _containerEl);
        const wrapFn = fn => "function" != typeof fn || !capture?.length && !captureRef?.length ? fn : function(...args) {
            let context = tryGetInvokeContext();
            return context ? fn.apply(this, args) : (context = newInvokeContext(), context.$qrl$ = qrl, 
            context.$event$ = this, invoke.call(this, context, fn, ...args));
        };
        const resolve = async containerEl => {
            if (null !== symbolRef) {
                return symbolRef;
            }
            if (containerEl && setContainer(containerEl), "" === chunk) {
                assertDefined(_containerEl, "Sync QRL must have container element");
                const hash = _containerEl.getAttribute("q:instance");
                const qFuncs = getQFuncs(_containerEl.ownerDocument, hash);
                return qrl.resolved = symbolRef = qFuncs[Number(symbol)];
            }
            const start = now();
            const ctx = tryGetInvokeContext();
            if (null !== symbolFn) {
                symbolRef = symbolFn().then((module => qrl.resolved = symbolRef = wrapFn(module[symbol])));
            } else {
                const imported = getPlatform().importSymbol(_containerEl, chunk, symbol);
                symbolRef = maybeThen(imported, (ref => qrl.resolved = symbolRef = wrapFn(ref)));
            }
            return symbolRef.finally((() => emitUsedSymbol(symbol, ctx?.$element$, start))), 
            symbolRef;
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
                const prevQrl = context.$qrl$;
                const prevEvent = context.$event$;
                context.$qrl$ = qrl, context.$event$ || (context.$event$ = this);
                try {
                    return invoke.call(this, context, f, ...args);
                } finally {
                    context.$qrl$ = prevQrl, context.$event$ = prevEvent;
                }
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
        build.isDev && Object.defineProperty(qrl, "_devOnlySymbolRef", {
            get: () => symbolRef
        }), qDev && seal(qrl), qrl;
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
    const $ = expression => {
        if (qDev) {
            throw new Error("Optimizer should replace all usages of $() with some special syntax. If you need to create a QRL manually, use inlinedQrl() instead.");
        }
        return createQRL(null, "s" + runtimeSymbolId++, expression, null, null, null, null);
    };
    const dollar = $;
    const eventQrl = qrl => qrl;
    const componentQrl = componentQrl => {
        const QwikComponent = () => {};
        return QwikComponent[SERIALIZABLE_STATE] = [ componentQrl ], QwikComponent;
    };
    const SERIALIZABLE_STATE = Symbol("serializable-data");
    const isQwikComponent = component => "function" == typeof component && void 0 !== component[SERIALIZABLE_STATE];
    const event$ = implicit$FirstArg(eventQrl);
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
            const containerState = iCtx.$container$;
            const newStore = getOrCreateStore(value, opts?.deep ?? !0 ? StoreFlags.RECURSIVE : StoreFlags.NONE, containerState);
            return set(newStore), newStore;
        }
    };
    function useServerData(key, defaultValue) {
        const ctx = tryGetInvokeContext();
        return ctx?.$container$?.$serverData$[key] ?? defaultValue;
    }
    const STYLE_CACHE = /*#__PURE__*/ new Map;
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
    const useStylesQrl = styles => ({
        styleId: _useStyles(styles, (str => str), !1)
    });
    const useStyles$ = /*#__PURE__*/ implicit$FirstArg(useStylesQrl);
    const useStylesScopedQrl = styles => ({
        scopeId: "⭐️" + _useStyles(styles, getScopedStyles, !0)
    });
    const useStylesScoped$ = /*#__PURE__*/ implicit$FirstArg(useStylesScopedQrl);
    const _useStyles = (styleQrl, transform, scoped) => {
        assertQrl(styleQrl);
        const {val, set, iCtx, i} = useSequentialScope();
        if (val) {
            return val;
        }
        const styleId = (index = i, assertQrl(qStyles = styleQrl), `${hashCode(qStyles.$hash$)}-${index}`);
        var qStyles, index;
        const host = iCtx.$hostElement$;
        set(styleId);
        const value = styleQrl.$resolveLazy$(iCtx.$element$);
        if (isPromise(value)) {
            throw value.then((val => iCtx.$container$.$appendStyle$(transform(val, styleId), styleId, host, scoped))), 
            value;
        }
        return iCtx.$container$.$appendStyle$(transform(value, styleId), styleId, host, scoped), 
        styleId;
    };
    const useConstant = value => {
        const {val, set} = useSequentialScope();
        return null != val ? val : set(value = isFunction(value) && !isQwikComponent(value) ? value() : value);
    };
    const useComputedQrl = qrl => {
        const {val, set} = useSequentialScope();
        if (val) {
            return val;
        }
        assertQrl(qrl);
        const signal = new ComputedSignal(null, qrl);
        return set(signal), throwIfQRLNotResolved(qrl), signal;
    };
    const useVisibleTaskQrl = (qrl, opts) => {
        const {val, set, i, iCtx} = useSequentialScope();
        const eagerness = opts?.strategy ?? "intersection-observer";
        if (val) {
            return void (isServerPlatform() && useRunTask(val, eagerness));
        }
        assertQrl(qrl);
        const task = new Task(TaskFlags.VISIBLE_TASK, i, iCtx.$hostElement$, qrl, void 0, null);
        set(task), useRunTask(task, eagerness), isServerPlatform() || (qrl.$resolveLazy$(iCtx.$element$), 
        iCtx.$container$.$scheduler$(ChoreType.VISIBLE, task));
    };
    const useTask$ = /*#__PURE__*/ implicit$FirstArg(useTaskQrl);
    const useVisibleTask$ = /*#__PURE__*/ implicit$FirstArg(useVisibleTaskQrl);
    const useComputed$ = implicit$FirstArg(useComputedQrl);
    const PREFETCH_CODE = /*#__PURE__*/ ((b, h, c, q, v) => {
        c.register("URL", {
            scope: "SCOPE"
        }).then(((sw, onReady) => {
            onReady = () => q.forEach(q.push = v => sw.active.postMessage(v)), sw.installing ? sw.installing.addEventListener("statechange", (e => "activated" == e.target.state && onReady())) : onReady();
        })), v && q.push([ "verbose" ]), document.addEventListener("qprefetch", (e => e.detail.bundles && q.push([ "prefetch", b, ...e.detail.bundles ])));
    }).toString();
    exports.$ = $, exports.Fragment = Fragment, exports.PrefetchGraph = (opts = {}) => {
        const isTest = (void 0).TEST;
        if (build.isDev && !isTest) {
            return _jsxSorted("script", null, {
                dangerouslySetInnerHTML: "\x3c!-- PrefetchGraph is disabled in dev mode. --\x3e"
            }, null, 0, "prefetch-graph");
        }
        const serverData = useServerData("containerAttributes", {});
        const resolvedOpts = {
            base: serverData["q:base"],
            manifestHash: serverData["q:manifest-hash"],
            scope: "/",
            verbose: !1,
            path: "qwik-prefetch-service-worker.js",
            ...opts
        };
        const args = JSON.stringify([ "graph-url", resolvedOpts.base, `q-bundle-graph-${resolvedOpts.manifestHash}.json` ]);
        return _jsxSorted("script", null, {
            dangerouslySetInnerHTML: `(window.qwikPrefetchSW||(window.qwikPrefetchSW=[])).push(${args})`,
            nonce: opts.nonce
        }, null, 0, "prefetch-graph");
    }, exports.PrefetchServiceWorker = opts => {
        const isTest = (void 0).TEST;
        if (build.isDev && !isTest) {
            return _jsxSorted("script", null, {
                dangerouslySetInnerHTML: "\x3c!-- PrefetchServiceWorker is disabled in dev mode. --\x3e"
            }, null, 0, "prefetch-service-worker");
        }
        const serverData = useServerData("containerAttributes", {});
        const baseUrl = globalThis.BASE_URL || "/";
        const resolvedOpts = {
            base: serverData["q:base"],
            manifestHash: serverData["q:manifest-hash"],
            scope: "/",
            verbose: !1,
            path: "qwik-prefetch-service-worker.js",
            ...opts
        };
        resolvedOpts.path = opts?.path?.startsWith?.("/") ? opts.path : baseUrl + resolvedOpts.path;
        let code = PREFETCH_CODE.replace("URL", resolvedOpts.path).replace("SCOPE", resolvedOpts.scope);
        build.isDev || (code = code.replaceAll(/\s+/gm, ""));
        const props = {
            dangerouslySetInnerHTML: [ "(" + code + ")(", [ JSON.stringify(resolvedOpts.base), JSON.stringify(resolvedOpts.manifestHash), "navigator.serviceWorker", "window.qwikPrefetchSW||(window.qwikPrefetchSW=[])", resolvedOpts.verbose ].join(","), ");" ].join(""),
            nonce: resolvedOpts.nonce
        };
        return _jsxSorted("script", null, props, null, 0, "prefetch-service-worker");
    }, exports.RenderOnce = RenderOnce, exports.Resource = props => _jsxSorted(Fragment, null, null, function(props) {
        const resource = props.value;
        if (isResourceReturn(resource)) {
            if (!isServerPlatform()) {
                const state = resource._state;
                return "pending" === state && props.onPending ? Promise.resolve(props.onPending()) : "rejected" === state && props.onRejected ? Promise.resolve(resource._error).then(props.onRejected) : Promise.resolve(untrack((() => resource._resolved))).then(props.onResolved);
            }
            return resource.value.then(useBindInvokeContext(props.onResolved), useBindInvokeContext(props.onRejected));
        }
        return isPromise(resource) ? resource.then(useBindInvokeContext(props.onResolved), useBindInvokeContext(props.onRejected)) : isSignal(resource) ? Promise.resolve(resource.value).then(useBindInvokeContext(props.onResolved), useBindInvokeContext(props.onRejected)) : Promise.resolve(resource).then(useBindInvokeContext(props.onResolved), useBindInvokeContext(props.onRejected));
    }(props), 0, null), exports.SSRComment = SSRComment, exports.SSRRaw = SSRRaw, exports.SSRStream = SSRStream, 
    exports.SSRStreamBlock = props => [ jsx(SSRComment, {
        data: "qkssr-pu"
    }), props.children, jsx(SSRComment, {
        data: "qkssr-po"
    }) ], exports.SkipRender = SkipRender, exports.Slot = Slot, exports._CONST_PROPS = _CONST_PROPS, 
    exports._DomContainer = DomContainer, exports._EMPTY_ARRAY = EMPTY_ARRAY, exports._EffectData = EffectData, 
    exports._IMMUTABLE = _IMMUTABLE, exports._SharedContainer = _SharedContainer, exports._VAR_PROPS = _VAR_PROPS, 
    exports._deserialize = function(rawStateData, element) {
        if (null == rawStateData) {
            return [];
        }
        const stateData = JSON.parse(rawStateData);
        if (!Array.isArray(stateData)) {
            return [];
        }
        let container;
        container = isNode(element) && isElement$1(element) ? createDeserializeContainer(stateData, element) : createDeserializeContainer(stateData);
        for (let i = 0; i < stateData.length; i++) {
            stateData[i] = deserializeData(stateData, stateData[i], container);
        }
        return stateData;
    }, exports._fnSignal = (fn, args, fnStr) => new WrappedSignal(null, fn, args, fnStr || null), 
    exports._getContextElement = () => {
        const iCtx = tryGetInvokeContext();
        if (iCtx) {
            const hostElement = iCtx.$hostElement$;
            let element = null;
            return vnode_isVNode(hostElement) && vnode_isElementVNode(hostElement) && (element = vnode_getNode(hostElement)), 
            element ?? iCtx.$qrl$?.$setContainer$(void 0);
        }
    }, exports._getContextEvent = () => {
        const iCtx = tryGetInvokeContext();
        if (iCtx) {
            return iCtx.$event$;
        }
    }, exports._getDomContainer = getDomContainer, exports._getQContainerElement = _getQContainerElement, 
    exports._hW = _hW, exports._isJSXNode = isJSXNode, exports._isStringifiable = function(value) {
        return null === value || "string" == typeof value || "number" == typeof value || "boolean" == typeof value;
    }, exports._jsxBranch = input => input, exports._jsxC = (type, mutable, _flags, key) => jsx(type, mutable, key), 
    exports._jsxQ = (type, mutable, immutable, children, _flags, key) => jsx(type, {
        ...immutable,
        ...mutable,
        children
    }, key), exports._jsxS = (type, mutable, immutable, _flags, key) => jsx(type, {
        ...immutable,
        ...mutable
    }, key), exports._jsxSorted = _jsxSorted, exports._jsxSplit = _jsxSplit, exports._noopQrl = _noopQrl, 
    exports._noopQrlDEV = (symbolName, opts, lexicalScopeCapture = EMPTY_ARRAY) => {
        const newQrl = _noopQrl(symbolName, lexicalScopeCapture);
        return newQrl.dev = opts, newQrl;
    }, exports._qrlSync = function(fn, serializedFn) {
        return void 0 === serializedFn && (serializedFn = fn.toString()), createQRL("", "<sync>", fn, null, null, null, null);
    }, exports._regSymbol = (symbol, hash) => (void 0 === globalThis.__qwik_reg_symbols && (globalThis.__qwik_reg_symbols = new Map), 
    globalThis.__qwik_reg_symbols.set(hash, symbol), symbol), exports._restProps = (props, omit, target = {}) => {
        for (const key in props) {
            omit.includes(key) || (target[key] = props[key]);
        }
        return target;
    }, exports._serialize = async function(data) {
        const serializationContext = createSerializationContext(null, (() => ""), (() => {}));
        for (const root of data) {
            serializationContext.$addRoot$(root);
        }
        return await serializationContext.$breakCircularDepsAndAwaitPromises$(), serializationContext.$serialize$(), 
        serializationContext.$writer$.toString();
    }, exports._verifySerializable = verifySerializable, exports._waitUntilRendered = elm => {
        const containerEl = _getQContainerElement(elm);
        if (!containerEl) {
            return Promise.resolve();
        }
        const container = containerEl.qContainer;
        return container?.renderDone ?? Promise.resolve();
    }, exports._walkJSX = _walkJSX, exports._weakSerialize = input => (weakSerializeSet.add(input), 
    input), exports._wrapProp = _wrapProp, exports._wrapSignal = (obj, prop) => {
        const r = _wrapProp(obj, prop);
        return r === _IMMUTABLE ? obj[prop] : r;
    }, exports.component$ = onMount => componentQrl(dollar(onMount)), exports.componentQrl = componentQrl, 
    exports.createComputed$ = createComputed$, exports.createComputedQrl = createComputedQrl, 
    exports.createContextId = createContextId, exports.createElement = h, exports.createSignal = createSignal, 
    exports.event$ = event$, exports.eventQrl = eventQrl, exports.getDomContainer = getDomContainer, 
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
        isString(type) && "className" in props && (props.class = props.className, delete props.className, 
        qDev && ((message, ...optionalParams) => {
            if (qDev) {
                const key = "warn" + String(message);
                _printed.has(key) || (_printed.add(key), logWarn(message, ...optionalParams));
            }
        })("jsx: `className` is deprecated. Use `class` instead."));
        const node = new JSXNodeImpl(type, props, null, children, 0, processed);
        return node.dev = {
            stack: (new Error).stack,
            ...opts
        }, seal(node), node;
    }, exports.jsxs = jsx, exports.noSerialize = noSerialize, exports.qrl = qrl, exports.qrlDEV = (chunkOrFn, symbol, opts, lexicalScopeCapture = EMPTY_ARRAY) => {
        const newQrl = qrl(chunkOrFn, symbol, lexicalScopeCapture, 1);
        return newQrl.dev = opts, newQrl;
    }, exports.render = async (parent, jsxNode, opts = {}) => {
        if (9 === parent.nodeType) {
            let child = parent.firstChild;
            for (;child && !isElement$1(child); ) {
                child = child.nextSibling;
            }
            parent = child;
        }
        parent.setAttribute("q:container", QContainerValue.RESUMED);
        const container = getDomContainer(parent);
        container.$serverData$ = opts.serverData || {};
        const host = container.rootVNode;
        return container.$scheduler$(ChoreType.NODE_DIFF, host, host, jsxNode), await container.$scheduler$(ChoreType.WAIT_FOR_ALL), 
        {
            cleanup: () => {
                cleanup(container, container.rootVNode);
            }
        };
    }, exports.setPlatform = plt => _platform = plt, exports.sync$ = fn => {
        if (qDev) {
            throw new Error("Optimizer should replace all usages of sync$() with some special syntax. If you need to create a QRL manually, use inlinedSyncQrl() instead.");
        }
        return qDev && (fn = new Function("return " + fn.toString())()), createQRL("", "<sync>", fn, null, null, null, null);
    }, exports.untrack = untrack, exports.useComputed$ = useComputed$, exports.useComputedQrl = useComputedQrl, 
    exports.useConstant = useConstant, exports.useContext = (context, defaultValue) => {
        const {val, set, iCtx} = useSequentialScope();
        if (void 0 !== val) {
            return val;
        }
        qDev && validateContext(context);
        const value = iCtx.$container$.resolveContext(iCtx.$hostElement$, context);
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
        const store = useStore({
            error: void 0
        });
        return useOn("error-boundary", qrl("/runtime", "error", [ store ])), useContextProvider(ERROR_CONTEXT, store), 
        store;
    }, exports.useId = () => {
        const {val, set, iCtx} = useSequentialScope();
        if (null != val) {
            return val;
        }
        const containerBase = isDomContainer(iCtx.$container$) ? "" : iCtx.$container$.buildBase || "";
        const base = containerBase ? hashCode(containerBase) : "";
        const componentQrl = iCtx.$container$.getHostProp(iCtx.$hostElement$, "q:renderFn");
        return set(`${base}-${componentQrl?.getHash() || ""}-${(iCtx.$container$.$currentUniqueId$++).toString(36) || ""}`);
    }, exports.useLexicalScope = useLexicalScope, exports.useOn = useOn, exports.useOnDocument = useOnDocument, 
    exports.useOnWindow = (event, eventQrl) => {
        _useOn(createEventName(event, "window"), eventQrl);
    }, exports.useResource$ = (generatorFn, opts) => useResourceQrl(dollar(generatorFn), opts), 
    exports.useResourceQrl = useResourceQrl, exports.useServerData = useServerData, 
    exports.useSignal = initialState => useConstant((() => {
        const value = isFunction(initialState) && !isQwikComponent(initialState) ? invoke(void 0, initialState) : initialState;
        return createSignal(value);
    })), exports.useStore = useStore, exports.useStyles$ = useStyles$, exports.useStylesQrl = useStylesQrl, 
    exports.useStylesScoped$ = useStylesScoped$, exports.useStylesScopedQrl = useStylesScopedQrl, 
    exports.useTask$ = useTask$, exports.useTaskQrl = useTaskQrl, exports.useVisibleTask$ = useVisibleTask$, 
    exports.useVisibleTaskQrl = useVisibleTaskQrl, exports.version = "2.0.0-0-dev+5f846e5", 
    exports.withLocale = function(locale, fn) {
        const previousLang = _locale;
        try {
            return _locale = locale, fn();
        } finally {
            _locale = previousLang;
        }
    };
}));
