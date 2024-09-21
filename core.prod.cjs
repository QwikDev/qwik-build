/**
 * @license
 * @builder.io/qwik 2.0.0-0-dev+02ae97a
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
    const isNode = value => value && "number" == typeof value.nodeType;
    const isDocument = value => 9 === value.nodeType;
    const isElement$1 = value => 1 === value.nodeType;
    const isQwikElement = value => {
        const nodeType = value.nodeType;
        return 1 === nodeType || 11 === nodeType || 111 === nodeType;
    };
    const isNodeElement = value => {
        const nodeType = value.nodeType;
        return 1 === nodeType || 11 === nodeType || 111 === nodeType || 3 === nodeType;
    };
    const isVirtualElement = value => {
        const nodeType = value.nodeType;
        return 11 === nodeType || 111 === nodeType;
    };
    const isText = value => 3 === value.nodeType;
    const isComment = value => 8 === value.nodeType;
    const STYLE = qDev ? "background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;" : "";
    const logError = (message, ...optionalParams) => createAndLogError(!1, message, ...optionalParams);
    const throwErrorAndStop = (message, ...optionalParams) => {
        throw createAndLogError(!1, message, ...optionalParams);
    };
    const logErrorAndStop = (message, ...optionalParams) => createAndLogError(!0, message, ...optionalParams);
    const _printed = /*#__PURE__*/ new Set;
    const logWarn = (message, ...optionalParams) => {
        qDev && console.warn("%cQWIK WARN", STYLE, message, ...printParams(optionalParams));
    };
    const logDebug = (message, ...optionalParams) => {
        qDev && console.debug("%cQWIK", STYLE, message, ...printParams(optionalParams));
    };
    const printParams = optionalParams => qDev ? optionalParams.map((p => isNode(p) && isElement$1(p) ? printElement(p) : p)) : optionalParams;
    const printElement = el => {
        const ctx = el._qc_;
        const isServer = /*#__PURE__*/ (() => "undefined" != typeof process && !!process.versions && !!process.versions.node)();
        return {
            tagName: el.tagName,
            renderQRL: ctx?.$componentQrl$?.getSymbol(),
            element: isServer ? void 0 : el,
            ctx: isServer ? void 0 : ctx
        };
    };
    const createAndLogError = (asyncThrow, message, ...optionalParams) => {
        const err = message instanceof Error ? message : new Error(message);
        return console.error("%cQWIK ERROR", STYLE, err.message, ...printParams(optionalParams), err.stack), 
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
    function assertFail(text, ...parts) {
        qDev && throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
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
    function assertNumber(value1, text, ...parts) {
        if (qDev) {
            if ("number" == typeof value1) {
                return;
            }
            throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
        }
    }
    function assertString(value1, text, ...parts) {
        if (qDev) {
            if ("string" == typeof value1) {
                return;
            }
            throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
        }
    }
    function assertQwikElement(el) {
        qDev && (isQwikElement(el) || (console.error("Not a Qwik Element, got", el.nodeType, el), 
        throwErrorAndStop(ASSERT_DISCLAIMER + "Not a Qwik Element")));
    }
    function assertElement(el) {
        qDev && (isElement$1(el) || (console.error("Not a Element, got", el), throwErrorAndStop(ASSERT_DISCLAIMER + "Not an Element")));
    }
    const codeToText = (code, ...parts) => {
        if (qDev) {
            let text = [ "Error while serializing class attribute", "Can not serialize a HTML Node that is not an Element", "Runtime but no instance found on element.", "Only primitive and object literals can be serialized", "Crash while rendering", "You can render over a existing q:container. Skipping render().", "Set property {{0}}", "Only function's and 'string's are supported.", "Only objects can be wrapped in 'QObject'", "Only objects literals can be wrapped in 'QObject'", "QRL is not a function", "Dynamic import not found", "Unknown type argument", "Actual value for useContext({{0}}) can not be found, make sure some ancestor component has set a value using useContextProvider(). In the browser make sure that the context was used during SSR so its state was serialized.", "Invoking 'use*()' method outside of invocation context.", "Cant access renderCtx for existing context", "Cant access document for existing context", "props are immutable", "<div> component can only be used at the root of a Qwik component$()", "Props are immutable by default.", "Calling a 'use*()' method outside 'component$(() => { HERE })' is not allowed. 'use*()' methods provide hooks to the 'component$' state and lifecycle, ie 'use' hooks can only be called synchronously within the 'component$' function or another 'use' method.\nSee https://qwik.dev/docs/components/tasks/#use-method-rules", "Container is already paused. Skipping", "", "When rendering directly on top of Document, the root node must be a <html>", "A <html> node must have 2 children. The first one <head> and the second one a <body>", 'Invalid JSXNode type "{{0}}". It must be either a function or a string. Found:', "Tracking value changes can only be done to useStore() objects and component props", "Missing Object ID for captured object", 'The provided Context reference "{{0}}" is not a valid context created by createContextId()', "<html> is the root container, it can not be rendered inside a component", "QRLs can not be resolved because it does not have an attached container. This means that the QRL does not know where it belongs inside the DOM, so it cant dynamically import() from a relative path.", "QRLs can not be dynamically resolved, because it does not have a chunk path", "The JSX ref attribute must be a Signal" ][code] ?? "";
            return parts.length && (text = text.replaceAll(/{{(\d+)}}/g, ((_, index) => {
                let v = parts[index];
                return v && "object" == typeof v && v.constructor === Object && (v = JSON.stringify(v).slice(0, 50)), 
                v;
            }))), `Code(${code}): ${text}`;
        }
        return `Code(${code}) https://github.com/QwikDev/qwik/blob/main/packages/qwik/src/core/error/error.ts#L${8 + code}`;
    };
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
        return proto === Object.prototype || proto === Array.prototype || null === proto;
    };
    const isObject = v => !!v && "object" == typeof v;
    const isArray = v => Array.isArray(v);
    const isString = v => "string" == typeof v;
    const isFunction = v => "function" == typeof v;
    const fromCamelToKebabCase$1 = text => text.replace(/([A-Z])/g, "-$1").toLowerCase();
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
    const QStyle = "q:style";
    const QScopedStyle = "q:sstyle";
    const QSubscribers = "q:subs";
    const getQFuncs = (document, hash) => document["qFuncs_" + hash] || [];
    const QTemplate = "q:template";
    const QContainerSelector = "[q\\:container]:not([q\\:container=" + QContainerValue.HTML + "]):not([q\\:container=" + QContainerValue.TEXT + "])";
    const HTML_NS = "http://www.w3.org/1999/xhtml";
    const SVG_NS$1 = "http://www.w3.org/2000/svg";
    const MATH_NS = "http://www.w3.org/1998/Math/MathML";
    const QDefaultSlot = "";
    const ELEMENT_ID = "q:id";
    const ELEMENT_KEY = "q:key";
    const FLUSH_COMMENT$1 = "qkssr-f";
    const Q_PROPS_SEPARATOR = ":";
    const QObjectTargetSymbol = Symbol("proxy target");
    const QObjectFlagsSymbol = Symbol("proxy flags");
    const QObjectManagerSymbol = Symbol("proxy manager");
    const _CONST_PROPS = Symbol("CONST");
    const _VAR_PROPS = Symbol("VAR");
    const _IMMUTABLE = Symbol("IMMUTABLE");
    const directSetAttribute = (el, prop, value) => el.setAttribute(prop, value);
    const directGetAttribute = (el, prop) => el.getAttribute(prop);
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
    const EMPTY_ARRAY = [];
    const EMPTY_OBJ = {};
    Object.freeze(EMPTY_ARRAY), Object.freeze(EMPTY_OBJ);
    const hashCode = (text, hash = 0) => {
        for (let i = 0; i < text.length; i++) {
            hash = (hash << 5) - hash + text.charCodeAt(i), hash |= 0;
        }
        return Number(Math.abs(hash)).toString(36);
    };
    const styleKey = (qStyles, index) => (assertQrl(qStyles), `${hashCode(qStyles.$hash$)}-${index}`);
    const styleContent = styleId => "⭐️" + styleId;
    const serializeSStyle = scopeIds => {
        const value = scopeIds.join("|");
        if (value.length > 0) {
            return value;
        }
    };
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
    const promiseAll = promises => promises.some(isPromise) ? Promise.all(promises) : promises;
    const promiseAllLazy = promises => promises.length > 0 ? Promise.all(promises) : promises;
    const isNotNullable = v => null != v;
    const delay = timeout => new Promise((resolve => {
        setTimeout(resolve, timeout);
    }));
    const version = "2.0.0-0-dev+02ae97a";
    const SkipRender = Symbol("skip render");
    const SSRRaw = () => null;
    const SSRComment = () => null;
    const SSRStream = (props, key) => jsx(RenderOnce, {
        children: jsx(InternalSSRStream, props)
    }, key);
    const InternalSSRStream = () => null;
    const unitlessNumbers = new Set([ "animationIterationCount", "aspectRatio", "borderImageOutset", "borderImageSlice", "borderImageWidth", "boxFlex", "boxFlexGroup", "boxOrdinalGroup", "columnCount", "columns", "flex", "flexGrow", "flexShrink", "gridArea", "gridRow", "gridRowEnd", "gridRowStart", "gridColumn", "gridColumnEnd", "gridColumnStart", "fontWeight", "lineClamp", "lineHeight", "opacity", "order", "orphans", "scale", "tabSize", "widows", "zIndex", "zoom", "MozAnimationIterationCount", "MozBoxFlex", "msFlex", "msFlexPositive", "WebkitAnimationIterationCount", "WebkitBoxFlex", "WebkitBoxOrdinalGroup", "WebkitColumnCount", "WebkitColumns", "WebkitFlex", "WebkitFlexGrow", "WebkitFlexShrink", "WebkitLineClamp" ]);
    const isQrl$1 = value => "function" == typeof value && "function" == typeof value.getSymbol;
    function isSlotProp(prop) {
        return !prop.startsWith("q:");
    }
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
    const Slot = props => _jsxSorted(Virtual, null, {
        [QSlotS]: ""
    }, props.children, 0, props.name ?? "");
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
                    if (!ctx.$container2$) {
                        return value;
                    }
                    this.$container$ = ctx.$container2$;
                } else {
                    assertTrue(!ctx.$container2$ || ctx.$container2$ === this.$container$, "Do not use signals across containers");
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
            task.$effectDependencies$ = container.$getObjectById$(restInt()), task.$qrl$ = inflateQRL(container, parseQRL$1(restString()));
            const taskState = restString();
            task.$state$ = taskState ? container.$getObjectById$(taskState) : void 0;
            break;

          case SerializationConstant.Resource_VALUE:
            throw new Error("Not implemented");

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
            throw new Error("Not implemented");
        }
        restIdx = restStack.pop(), rest = restStack.pop();
    };
    const allocate = value => {
        switch (value.charCodeAt(0)) {
          case SerializationConstant.UNDEFINED_VALUE:
            return;

          case SerializationConstant.QRL_VALUE:
            return parseQRL$1(value);

          case SerializationConstant.Task_VALUE:
            return new Task(-1, -1, null, null, null, null);

          case SerializationConstant.Resource_VALUE:
            throw new Error("Not implemented");

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
            return componentQrl(parseQRL$1(value));

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
            throw new Error("unknown allocate type: " + value.charCodeAt(0));
        }
    };
    const PROMISE_RESOLVE = Symbol("resolve");
    const PROMISE_REJECT = Symbol("reject");
    function parseQRL$1(qrl) {
        const hashIdx = qrl.indexOf("#");
        const captureStart = qrl.indexOf("[", hashIdx);
        const captureEnd = qrl.indexOf("]", captureStart);
        const chunk = hashIdx > -1 ? qrl.substring(qrl.charCodeAt(0) < SerializationConstant.LAST_VALUE ? 1 : 0, hashIdx) : qrl;
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
                                throw new Error("Unknown type: " + typeof value);
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
                            }(serializationContext, value, $addRoot$) + ";" + $addRoot$(value.$effectDependencies$) + ";" + $addRoot$(value.untrackedValue) + serializeEffectSubs($addRoot$, value.$effects$) : value instanceof ComputedSignal ? SerializationConstant.ComputedSignal_CHAR + qrlToString(serializationContext, value.$computeQrl$) + ";" + $addRoot$(value.$effectDependencies$) + ";" + $addRoot$(value.$untrackedValue$) + serializeEffectSubs($addRoot$, value.$effects$) : SerializationConstant.Signal_CHAR + $addRoot$(value.$effectDependencies$) + ";" + $addRoot$(value.$untrackedValue$) + serializeEffectSubs($addRoot$, value.$effects$));
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
                                throw new Error("implement");
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
                            if (discoveredValues.push(obj.$untrackedValue$), obj.$effects$) {
                                for (const effect of obj.$effects$) {
                                    discoveredValues.push(effect[EffectSubscriptionsProp.EFFECT]);
                                }
                            }
                            obj.$effectDependencies$ && discoveredValues.push(obj.$effectDependencies$);
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
                                throw new Error("Unknown type: " + obj);
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
        }
        if (readQrl) {
            signal.$computeQrl$ = inflateQRL(container, parseQRL$1(parts[idx++]));
        }
        const dependencies = container.$getObjectById$(parts[idx++]);
        signal.$effectDependencies$ = dependencies;
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
            chunk || throwErrorAndStop("Missing chunk for: " + value.$symbol$);
        }
        let qrlStringInline = `${chunk}#${symbol}`;
        if (Array.isArray(value.$captureRef$) && value.$captureRef$.length > 0) {
            let serializedReferences = "";
            for (let i = 0; i < value.$captureRef$.length; i++) {
                i > 0 && (serializedReferences += " "), serializedReferences += serializationContext.$addRoot$(value.$captureRef$[i]);
            }
            qrlStringInline += `[${serializedReferences}]`;
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
    const canSerialize2 = value => {
        if (null == value || "string" == typeof value || "number" == typeof value || "boolean" == typeof value || "bigint" == typeof value) {
            return !0;
        }
        if ("object" == typeof value) {
            const proto = Object.getPrototypeOf(value);
            if (isStore(value) && (value = unwrapStore(value)), proto == Object.prototype) {
                for (const key in value) {
                    if (!canSerialize2(value[key])) {
                        return !1;
                    }
                }
                return !0;
            }
            if (proto == Array.prototype) {
                for (let i = 0; i < value.length; i++) {
                    if (!canSerialize2(value[i])) {
                        return !1;
                    }
                }
                return !0;
            }
            if (isTask$1(value)) {
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
    class _SharedContainer {
        constructor(scheduleDrain, journalFlush, serverData, locale) {
            this.$currentUniqueId$ = 0, this.$instanceHash$ = null, this.$serverData$ = serverData, 
            this.$locale$ = locale, this.$version$ = version, this.$storeProxyMap$ = new WeakMap, 
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
            elementNamespace = SVG_NS$1, elementNamespaceFlag = VNodeFlags.NS_svg;
        } else if (isElementVNodeOrString && function(tagOrVNode) {
            return "string" == typeof tagOrVNode ? isMathElement(tagOrVNode) : !!(tagOrVNode[VNodeProps.flags] & VNodeFlags.NS_math);
        }(tagOrVNode)) {
            elementNamespace = MATH_NS, elementNamespaceFlag = VNodeFlags.NS_math;
        } else if (domParentVNode && !parentIsForeignObject && !parentIsDefaultNamespace) {
            elementNamespace = !!(domParentVNode[VNodeProps.flags] & VNodeFlags.NS_svg) ? SVG_NS$1 : !!(domParentVNode[VNodeProps.flags] & VNodeFlags.NS_math) ? MATH_NS : HTML_NS, 
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
        let onMap = iCtx.$container2$.getHostProp(host, ":on");
        null === onMap && (onMap = {}, iCtx.$container2$.setHostProp(host, ":on", onMap));
        let seqIdx = iCtx.$container2$.getHostProp(host, ":onIdx");
        null === seqIdx && (seqIdx = 0), iCtx.$container2$.setHostProp(host, ":onIdx", seqIdx + 1);
        let addedFlags = iCtx.$container2$.getHostProp(host, ":onFlags");
        for (null === addedFlags && (addedFlags = [], iCtx.$container2$.setHostProp(host, ":onFlags", addedFlags)); addedFlags.length <= seqIdx; ) {
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
    class Subscriber {
        constructor() {
            this.$effectDependencies$ = null;
        }
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
    const executeComponent2 = (container, renderHost, subscriptionHost, componentQRL, props) => {
        const iCtx = newInvokeContext(container.$locale$, subscriptionHost, void 0, "qRender");
        let componentFn;
        if (iCtx.$effectSubscriber$ = [ subscriptionHost, EffectProperty.COMPONENT ], iCtx.$container2$ = container, 
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
        container.setHostProp(renderHost, ":onIdx", null), container.setHostProp(renderHost, "q:props", props), 
        vnode_isVNode(renderHost) && clearVNodeEffectDependencies(renderHost), componentFn(props))), (jsx => {
            const useOnEvents = container.getHostProp(renderHost, ":on");
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
                    if (constValue instanceof WrappedSignal) {
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
                        if (key !== dangerouslySetInnerHTML) {
                            if ("textarea" !== elementName || "value" !== key) {
                                value = serializeAttribute(key, value, scopedStyleIdPrefix), null != value && element.setAttribute(key, String(value));
                            } else {
                                if ("string" != typeof value) {
                                    if (build.isDev) {
                                        throw new Error("The value of the textarea must be a string");
                                    }
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
            isSameElementName && jsxKey === getKey$1(vCurrent) || (vNewNode = retrieveChildWithKey(elementName, jsxKey), 
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
                    const vKey = getKey$1(vNode) || getComponentHash(vNode, container.$getObjectById$);
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
                if (lookupKey === (getKey$1(host) || vNodeComponentHash) ? componentHash === vNodeComponentHash || (insertNewComponent(host, componentQRL, jsxProps), 
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
                const jsxOutput = executeComponent2(container, host, component$Host || container.rootVNode, component, jsxValue.props);
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
    function getKey$1(vNode) {
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
                            if (isTask$1(obj)) {
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
    !function(SiblingsArray) {
        SiblingsArray[SiblingsArray.Name = 0] = "Name", SiblingsArray[SiblingsArray.Key = 1] = "Key", 
        SiblingsArray[SiblingsArray.VNode = 2] = "VNode", SiblingsArray[SiblingsArray.Size = 3] = "Size", 
        SiblingsArray[SiblingsArray.NextVNode = 5] = "NextVNode";
    }(SiblingsArray || (SiblingsArray = {}));
    const isDomContainer = container => container instanceof DomContainer;
    class DomContainer extends _SharedContainer {
        constructor(element) {
            if (super((() => this.scheduleRender()), (() => vnode_applyJournal(this.$journal$)), {}, element.getAttribute("q:locale")), 
            this.renderDone = null, this.$storeProxyMap$ = new WeakMap, this.$styleIds$ = null, 
            this.$vnodeLocate$ = id => vnode_locate(this.rootVNode, id), this.$renderCount$ = 0, 
            this.$getObjectById$ = id => ("string" == typeof id && (id = parseFloat(id)), assertTrue(id < this.$rawStateData$.length, `Invalid reference: ${id} < ${this.$rawStateData$.length}`), 
            this.stateData[id]), this.qContainer = element.getAttribute("q:container"), !this.qContainer) {
                throw new Error("Element must have 'q:container' attribute.");
            }
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
            return inflateQRL(this, parseQRL$1(qrl));
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
                !isRecoverable(err)) {
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
              case ":onIdx":
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
                this.$styleIds$.add(style.getAttribute(QStyle));
            }))), !this.$styleIds$.has(styleId)) {
                this.$styleIds$.add(styleId);
                const styleElement = this.document.createElement("style");
                styleElement.setAttribute(QStyle, styleId), styleElement.textContent = content, 
                this.$journal$.push(VNodeJournalOpCode.Insert, this.document.head, null, styleElement);
            }
        }
    }
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
                returnValue = safeCall((() => executeComponent2(container, host, host, chore.$target$, chore.$payload$)), (jsx => chore.$type$ === ChoreType.COMPONENT ? maybeThen(container.processJsx(host, jsx), (() => jsx)) : jsx), (err => container.handleError(err, host)));
                break;

              case ChoreType.RESOURCE:
                const result = runResource(chore.$payload$, container, host);
                returnValue = isDomContainer(container) ? null : result;
                break;

              case ChoreType.TASK:
              case ChoreType.VISIBLE:
                returnValue = runTask2(chore.$payload$, container, host);
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
                    if (shouldThrowOnHostMismatch) {
                        throw new Error(errorMessage);
                    }
                    return logWarn(errorMessage), null;
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
    class Signal extends Subscriber {
        constructor(container, value) {
            super(), this.$effects$ = null, this.$container$ = null, this.$container$ = container, 
            this.$untrackedValue$ = value;
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
                    if (!ctx.$container2$) {
                        return this.untrackedValue;
                    }
                    this.$container$ = ctx.$container2$;
                } else {
                    assertTrue(!ctx.$container2$ || ctx.$container2$ === this.$container$, "Do not use signals across containers");
                }
                const effectSubscriber = ctx.$effectSubscriber$;
                if (effectSubscriber) {
                    const effects = this.$effects$ || (this.$effects$ = []);
                    ensureContainsEffect(effects, effectSubscriber), ensureContains(effectSubscriber, this), 
                    ensureEffectContainsSubscriber(effectSubscriber[EffectSubscriptionsProp.EFFECT], this, this.$container$);
                }
            }
            return this.untrackedValue;
        }
        set value(value) {
            value !== this.$untrackedValue$ && (this.$untrackedValue$ = value, triggerEffects(this.$container$, this, this.$effects$));
        }
        valueOf() {
            if (qDev) {
                throw new TypeError("Cannot coerce a Signal, use `.value` instead");
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
        if (effect instanceof Subscriber) {
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
                if (assertDefined(container, "Container must be defined."), isTask$1(effect)) {
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
        constructor(container, computeTask) {
            super(container, NEEDS_COMPUTATION), this.$invalid$ = !0, this.$computeQrl$ = computeTask;
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
            assertDefined(computeQrl.resolved, "Computed signals must run sync. Expected the QRL to be resolved at this point."), 
            throwIfQRLNotResolved(computeQrl);
            const ctx = tryGetInvokeContext();
            assertDefined(computeQrl, "Signal is marked as dirty, but no compute function is provided.");
            const previousEffectSubscription = ctx?.$effectSubscriber$;
            ctx && (ctx.$effectSubscriber$ = [ this, EffectProperty.VNODE ]), assertTrue(!!computeQrl.resolved, "Computed signals must run sync. Expected the QRL to be resolved at this point.");
            try {
                const untrackedValue = computeQrl.getFn(ctx)();
                assertFalse(isPromise(untrackedValue), "Computed function must be synchronous."), 
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
            throw new TypeError("ComputedSignal is read-only");
        }
    }
    class WrappedSignal extends Signal {
        constructor(container, fn, args, fnStr) {
            super(container, NEEDS_COMPUTATION), this.$invalid$ = !0, this.$args$ = args, this.$func$ = fn, 
            this.$funcStr$ = fnStr;
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
            throw new TypeError("WrappedSignal is read-only");
        }
    }
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
        if (isTask$1(value)) {
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
                    return jsxToString$1(value);
                }
            } finally {
                stringifyPath.pop();
            }
        }
        return value;
    }
    const pad = (text, prefix) => String(text).split("\n").map(((line, idx) => (idx ? prefix : "") + line)).join("\n");
    const jsxToString$1 = value => {
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
                    str += jsxToString$1(child);
                })) : str += jsxToString$1(children), str += "</" + value.type + ">") : str += "/>";
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
                    attr.value === QContainerValue.HTML ? mapArray_set(elementVNode, dangerouslySetInnerHTML, element.innerHTML, ElementVNodeProps.PROPS_OFFSET) : attr.value === QContainerValue.TEXT && "value" in element && mapArray_set(elementVNode, "value", element.value, ElementVNodeProps.PROPS_OFFSET);
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
                isBooleanAttr(element, key) ? element[key] = parseBoolean(value) : "value" === key && key in element ? element.value = escapeHTML(String(value)) : key === dangerouslySetInnerHTML ? element.innerHTML = value : null == value || !1 === value ? element.removeAttribute(key) : element.setAttribute(key, String(value));
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
            if (vnode_getAttr(vParent, dangerouslySetInnerHTML)) {
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
    const isQStyleElement = node => isElement(node) && "STYLE" === node.nodeName && (node.hasAttribute(QScopedStyle) || node.hasAttribute(QStyle));
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
    const executeComponent = (rCtx, elCtx, attempt) => {
        elCtx.$flags$ &= ~HOST_FLAG_DIRTY, elCtx.$flags$ |= HOST_FLAG_MOUNTED, elCtx.$slots$ = [], 
        elCtx.li.length = 0;
        const hostElement = elCtx.$element$;
        const componentQRL = elCtx.$componentQrl$;
        const props = elCtx.$props$;
        const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "qRender");
        const waitOn = iCtx.$waitOn$ = [];
        assertDefined(componentQRL, "render: host element to render must have a $renderQrl$:", elCtx), 
        assertDefined(props, "render: host element to render must have defined props", elCtx);
        const newCtx = pushRenderContext(rCtx);
        newCtx.$cmpCtx$ = elCtx, newCtx.$slotCtx$ = void 0, iCtx.$subscriber$ = [ exports.SubscriptionType.HOST, hostElement ], 
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
            return handleError(err, hostElement, rCtx.$static$.$containerState$), {
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
        return seal(ctx), seal(ctx.$static$), ctx;
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
                        null != value && (key.startsWith("--") ? chunks.push(key + ":" + value) : chunks.push(fromCamelToKebabCase$1(key) + ":" + setValueForStyle(key, value)));
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
                return isAriaAttribute(key) || [ "spellcheck", "draggable", "contenteditable" ].includes(key);
            }(key) && "number" != typeof value ? !1 === value || null == value ? value = null : !0 === value && isPreventDefault(key) && (value = "") : value = serializeBooleanOrNumberAttribute(value);
        }
        return value;
    }
    const setValueForStyle = (styleName, value) => "number" != typeof value || 0 === value || unitlessNumbers.has(styleName) ? value : value + "px";
    const getNextIndex = ctx => intToStr(ctx.$static$.$containerState$.$elementIndex$++);
    const setQId = (rCtx, elCtx) => {
        const id = getNextIndex(rCtx);
        elCtx.$id$ = id;
    };
    const jsxToString = data => isSignalV1(data) ? jsxToString(data.value) : null == data || "boolean" == typeof data ? "" : String(data);
    function isAriaAttribute(prop) {
        return prop.startsWith("aria-");
    }
    const shouldWrapFunctional = (res, node) => !!node.key && (!isJSXNode(res) || !isFunction(res.type) && res.key != node.key);
    const dangerouslySetInnerHTML = "dangerouslySetInnerHTML";
    const getOrCreateProxy = (target, storeMgr, flags = 0) => {
        const proxy = storeMgr.$proxyMap$.get(target);
        return proxy || (0 !== flags && setObjectFlags(target, flags), createProxy(target, storeMgr, void 0));
    };
    const createProxy = (target, storeTracker, subs) => {
        assertEqual(unwrapProxy(target), target, "Unexpected proxy at this location", target), 
        assertTrue(!storeTracker.$proxyMap$.has(target), "Proxy was already created", target), 
        assertTrue(isObject(target), "Target must be an object"), assertTrue(isSerializableObject(target) || isArray(target), "Target must be a serializable object");
        const manager = storeTracker.$subsManager$.$createManager$(subs);
        const getSerializedState = target => target[SerializationConstant.Store_CHAR];
        const addSubscriptions = (serializedState, serializedStateObject, target) => {
            (target => {
                delete target[SerializationConstant.Store_CHAR];
            })(serializedStateObject), setObjectFlags(target, serializedState.charCodeAt(0) - 48), 
            null(manager, serializedState.substring(1), storeTracker.$getObjectById$);
        };
        const serializedArrayTarget = target[SerializationConstant.UNDEFINED_CHAR];
        if (serializedArrayTarget) {
            const proxy = new Proxy(serializedArrayTarget, new ReadWriteProxyHandler(storeTracker, manager));
            storeTracker.$proxyMap$.set(target, proxy);
            const serializedState = getSerializedState(target);
            return serializedState && addSubscriptions(serializedState, target, serializedArrayTarget), 
            proxy;
        }
        {
            const proxy = new Proxy(target, new ReadWriteProxyHandler(storeTracker, manager));
            storeTracker.$proxyMap$.set(target, proxy);
            const serializedState = getSerializedState(target);
            return serializedState && addSubscriptions(serializedState, target, target), proxy;
        }
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
        constructor($storeTracker$, $manager$) {
            this.$storeTracker$ = $storeTracker$, this.$manager$ = $manager$;
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
                if (prop === QObjectTargetSymbol) {
                    return target;
                }
                if (prop === QObjectManagerSymbol) {
                    return this.$manager$;
                }
                if (prop === SERIALIZER_PROXY_UNWRAP) {
                    return;
                }
                return target[prop];
            }
            const flags = target[QObjectFlagsSymbol] ?? 0;
            assertNumber(flags, "flags must be an number");
            const invokeCtx = tryGetInvokeContext();
            const recursive = !!(1 & flags);
            let subscriber;
            invokeCtx && (subscriber = invokeCtx.$subscriber$), !!!(2 & flags) || prop in target && !immutableValue(target[_CONST_PROPS]?.[prop]) || (subscriber = null);
            const value = target[prop];
            if (subscriber) {
                const isA = isArray(target);
                this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
            }
            return recursive ? wrap(value, this.$storeTracker$) : value;
        }
        set(target, prop, newValue) {
            if ("symbol" == typeof prop) {
                return target[prop] = newValue, !0;
            }
            const flags = target[QObjectFlagsSymbol] ?? 0;
            assertNumber(flags, "flags must be an number");
            if (!!(2 & flags)) {
                throw qError(17);
            }
            const unwrappedNewValue = !!(1 & flags) ? unwrapProxy(newValue) : newValue;
            if (qDev) {
                verifySerializable(unwrappedNewValue);
                const invokeCtx = tryGetInvokeContext();
                invokeCtx && ("qRender" === invokeCtx.$event$ ? logError("State mutation inside render function. Move mutation to useTask$() or useVisibleTask$()", prop) : "qComputed" === invokeCtx.$event$ && logWarn("State mutation inside useComputed$() is an antipattern. Use useTask$() instead", String(invokeCtx.$hostElement$)));
            }
            if (isArray(target)) {
                return target[prop] = unwrappedNewValue, this.$manager$.$notifySubs$(), !0;
            }
            const oldValue = target[prop];
            return target[prop] = unwrappedNewValue, oldValue !== unwrappedNewValue && this.$manager$.$notifySubs$(prop), 
            !0;
        }
        has(target, property) {
            if (property === QObjectTargetSymbol) {
                return !0;
            }
            return !!Object.prototype.hasOwnProperty.call(target, property);
        }
        ownKeys(target) {
            const flags = target[QObjectFlagsSymbol] ?? 0;
            assertNumber(flags, "flags must be an number");
            if (!!!(2 & flags)) {
                let subscriber = null;
                const invokeCtx = tryGetInvokeContext();
                invokeCtx && (subscriber = invokeCtx.$subscriber$), subscriber && this.$manager$.$addSub$(subscriber);
            }
            return Reflect.ownKeys(target);
        }
        getOwnPropertyDescriptor(target, prop) {
            return isArray(target) || "symbol" == typeof prop ? Object.getOwnPropertyDescriptor(target, prop) : {
                enumerable: !0,
                configurable: !0
            };
        }
    }
    const immutableValue = value => value === _CONST_PROPS || isSignalV1(value);
    const wrap = (value, storeTracker) => {
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
                const proxy = storeTracker.$proxyMap$.get(nakedValue);
                return proxy || getOrCreateProxy(nakedValue, storeTracker, 1);
            }
        }
        return value;
    };
    var _a$1;
    class MockElement {
        constructor(nodeType) {
            this.nodeType = nodeType, this[_a$1] = null, seal(this);
        }
    }
    _a$1 = "_qc_";
    const hash = () => Math.random().toString(36).slice(2);
    const renderRoot = async (node, rCtx, ssrCtx, stream, containerState, opts) => {
        const beforeClose = opts.beforeClose;
        return await renderNode(node, rCtx, ssrCtx, stream, 0, beforeClose ? stream => {
            const result = beforeClose(ssrCtx.$static$.$contexts$, containerState, !1, ssrCtx.$static$.$textNodes$);
            return processData$1(result, rCtx, ssrCtx, stream, 0, void 0);
        } : void 0), qDev && ssrCtx.$static$.$headNodes$.length > 0 && logError("Missing <head>. Global styles could not be rendered. Please render a <head> element at the root of the app"), 
        rCtx;
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
        isSlot && (assertDefined(rCtx.$cmpCtx$?.$id$, "hostId must be defined for a slot"), 
        virtualComment += " q:sref=" + rCtx.$cmpCtx$.$id$), null != key && (virtualComment += " q:key=" + key), 
        virtualComment += "--\x3e", stream.write(virtualComment);
        const html = node.props[dangerouslySetInnerHTML];
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
                assertDefined(key, "key must be defined for a slot");
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
            if ("children" === prop || prop === dangerouslySetInnerHTML) {
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
                if (prop === dangerouslySetInnerHTML) {
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
        const innerHTML = attributes[dangerouslySetInnerHTML];
        null != innerHTML && stream.write(innerHTML), stream.write(`</${tagName}>`);
    };
    const renderSSRComponent = (rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose) => (setComponentProps$1(rCtx, elCtx, node.props.props), 
    maybeThen(executeComponent(rCtx, elCtx), (res => {
        const hostElement = elCtx.$element$;
        const newRCtx = res.rCtx;
        const iCtx = newInvokeContext(ssrCtx.$static$.$locale$, hostElement, void 0);
        iCtx.$subscriber$ = [ exports.SubscriptionType.HOST, hostElement ], iCtx.$renderCtx$ = newRCtx;
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
                array.push(_jsxSorted("style", {
                    [dangerouslySetInnerHTML]: style.content,
                    hidden: "",
                    [QStyle]: style.styleId
                }, null, null, 0, null));
            }
        }
        const newID = getNextIndex(rCtx);
        const scopeId = elCtx.$scopeIds$ ? serializeSStyle(elCtx.$scopeIds$) : void 0;
        const processedNode = _jsxSorted(node.type, {
            [ELEMENT_ID]: newID,
            [QScopedStyle]: scopeId
        }, null, res.node, 0, node.key);
        return elCtx.$id$ = newID, ssrCtx.$static$.$contexts$.push(elCtx), renderNodeVirtual(processedNode, elCtx, extraNodes, newRCtx, newSSrContext, stream, flags, (stream => {
            if (elCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER) {
                const placeholderCtx = createMockQContext(1);
                const listeners = placeholderCtx.li;
                listeners.push(...elCtx.li), elCtx.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER, placeholderCtx.$id$ = getNextIndex(rCtx);
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
                        return _jsxSorted("q:template", {
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
            isJSXNode(child) && (slotName = child.props[QSlot] || ""), (slotMap[slotName] || (slotMap[slotName] = [])).push(child);
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
            const immutable = node.constProps;
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
                if ("children" === rawProp) {
                    return;
                }
                if (isOnProp(rawProp)) {
                    return void setEvent(elCtx.li, rawProp, value, void 0);
                }
                if (isSignalV1(value) && (assertDefined(hostCtx, "Signals can not be used outside the root"), 
                value = trackSignalV1(value, isImmutable ? [ exports.SubscriptionType.PROP_IMMUTABLE, elm, value, hostCtx.$element$, rawProp, void 0 ] : [ exports.SubscriptionType.PROP_MUTABLE, hostCtx.$element$, value, elm, rawProp, void 0 ]), 
                useSignal = !0), rawProp === dangerouslySetInnerHTML) {
                    return void (htmlStr = value);
                }
                let attrValue;
                rawProp.startsWith(PREVENT_DEFAULT) && registerQwikEvent$1(rawProp.slice(PREVENT_DEFAULT.length), rCtx.$static$.$containerState$);
                const prop = "htmlFor" === rawProp ? "for" : rawProp;
                "class" === prop || "className" === prop ? classStr = serializeClass(value) : "style" === prop ? attrValue = stringifyStyle(value) : isAriaAttribute(prop) || "draggable" === prop || "spellcheck" === prop ? (attrValue = null != value ? String(value) : null, 
                value = attrValue) : attrValue = !1 === value || null == value ? null : String(value), 
                null != attrValue && ("value" === prop && "textarea" === tagName ? htmlStr = escapeHtml(attrValue) : isSSRUnsafeAttr(prop) ? qDev && logError("Attribute value is unsafe for SSR") : openingElement += " " + (!0 === value ? prop : prop + '="' + escapeHtml(attrValue) + '"'));
            };
            for (const prop in props) {
                handleProp(prop, props[prop], !1);
            }
            if (immutable) {
                for (const prop in immutable) {
                    handleProp(prop, props[prop], !0);
                }
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
                hostCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER && (listeners.push(...hostCtx.li), 
                hostCtx.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER);
            }
            if (qDev) {
                if (32 & flags && !(512 & flags) && !(tagName in phasingContent)) {
                    throw createJSXError(`<${tagName}> can not be rendered because one of its ancestor is a <p> or a <pre>.\n\nThis goes against the HTML spec: https://html.spec.whatwg.org/multipage/dom.html#phrasing-content-2`, node);
                }
                if ("table" === tagName) {
                    flags |= 256;
                } else {
                    if (256 & flags && !(tagName in tableContent)) {
                        throw createJSXError(`The <table> element requires that its direct children to be '<tbody>', '<thead>', '<tfoot>' or '<caption>' instead, '<${tagName}>' was rendered.`, node);
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
                if ("svg" !== tagName && "math" !== tagName || (flags |= 512), 1 & flags && !(tagName in headContent)) {
                    throw createJSXError(`<${tagName}> can not be rendered because it's not a valid children of the <head> element. https://html.spec.whatwg.org/multipage/dom.html#metadata-content`, node);
                }
                if (4 & flags) {
                    if (!(tagName in htmlContent)) {
                        throw createJSXError(`<${tagName}> can not be rendered because it's not a valid direct children of the <html> element, only <head> and <body> are allowed.`, node);
                    }
                } else if (tagName in htmlContent) {
                    throw createJSXError(`<${tagName}> can not be rendered because its parent is not a <html> element. Make sure the 'containerTagName' is set to 'html' in entry.ssr.tsx`, node);
                }
                tagName in startPhasingContent && (flags |= 32);
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
            if (1 & flags && (openingElement += " q:head"), qDev && qInspector && node.dev && !(1 & flags)) {
                const sanitizedFileName = node?.dev?.fileName?.replace(/\\/g, "/");
                sanitizedFileName && !/data-qwik-inspector/.test(openingElement) && (openingElement += ` data-qwik-inspector="${escapeHtml(`${sanitizedFileName}:${node.dev.lineNumber}:${node.dev.columnNumber}`)}"`);
            }
            if (openingElement += ">", stream.write(openingElement), tagName in emptyElements) {
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
        return shouldWrapFunctional(res, node) ? renderNode(_jsxSorted(Virtual, EMPTY_OBJ, null, res, 0, node.key), rCtx, ssrCtx, stream, flags, beforeClose) : processData$1(res, rCtx, ssrCtx, stream, flags, beforeClose);
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
                if (isSignalV1(node)) {
                    const insideText = 8 & flags;
                    const hostEl = rCtx.$cmpCtx$?.$element$;
                    let value;
                    if (hostEl) {
                        if (!insideText) {
                            const id = getNextIndex(rCtx);
                            if (value = trackSignalV1(node, 1024 & flags ? [ exports.SubscriptionType.TEXT_IMMUTABLE, "#" + id, node, "#" + id ] : [ exports.SubscriptionType.TEXT_MUTABLE, hostEl, node, "#" + id ]), 
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
        const immutableMeta = target[_CONST_PROPS] = expectProps[_CONST_PROPS] ?? EMPTY_OBJ;
        for (const prop of keys) {
            "children" !== prop && prop !== QSlot && (isSignalV1(immutableMeta[prop]) ? target["_IMMUTABLE_PREFIX" + prop] = immutableMeta[prop] : target[prop] = expectProps[prop]);
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
    const startPhasingContent = {
        p: !0,
        pre: !0
    };
    const htmlContent = {
        head: !0,
        body: !0
    };
    const tableContent = {
        tbody: !0,
        thead: !0,
        tfoot: !0,
        caption: !0,
        colgroup: !0
    };
    const headContent = {
        meta: !0,
        title: !0,
        link: !0,
        style: !0,
        script: !0,
        noscript: !0,
        template: !0,
        base: !0
    };
    const phasingContent = {
        a: !0,
        abbr: !0,
        area: !0,
        audio: !0,
        b: !0,
        bdi: !0,
        bdo: !0,
        br: !0,
        button: !0,
        canvas: !0,
        cite: !0,
        code: !0,
        command: !0,
        data: !0,
        datalist: !0,
        del: !0,
        dfn: !0,
        em: !0,
        embed: !0,
        i: !0,
        iframe: !0,
        img: !0,
        input: !0,
        ins: !0,
        itemprop: !0,
        kbd: !0,
        keygen: !0,
        label: !0,
        link: !0,
        map: !0,
        mark: !0,
        math: !0,
        meta: !0,
        meter: !0,
        noscript: !0,
        object: !0,
        option: !0,
        output: !0,
        picture: !0,
        progress: !0,
        q: !0,
        ruby: !0,
        s: !0,
        samp: !0,
        script: !0,
        select: !0,
        slot: !0,
        small: !0,
        span: !0,
        strong: !0,
        sub: !0,
        sup: !0,
        svg: !0,
        template: !0,
        textarea: !0,
        time: !0,
        u: !0,
        var: !0,
        video: !0,
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
        const dynamicSlots = hostCtx.$dynamicSlots$ || (hostCtx.$dynamicSlots$ = []);
        dynamicSlots.includes(elCtx) || dynamicSlots.push(elCtx);
    };
    const normalizeInvisibleEvents = eventName => "on:qvisible" === eventName ? "on-document:qinit" : eventName;
    const applyInlineComponent = (ssr, component$Host, component, jsx) => {
        const host = ssr.getLastNode();
        return executeComponent2(ssr, host, component$Host, component, jsx.props);
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
                enqueue(ssr.closeFragment), enqueue(value), enqueue(Promise), enqueue((() => ssr.commentNode(FLUSH_COMMENT$1)));
            } else if (function(value) {
                return !!value[Symbol.asyncIterator];
            }(value)) {
                enqueue((async () => {
                    for await (const chunk of value) {
                        await _walkJSX(ssr, chunk, !0, styleScoped), ssr.commentNode(FLUSH_COMMENT$1);
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
                        ssr.commentNode(FLUSH_COMMENT$1);
                        const generator = jsx.children;
                        let value;
                        value = isFunction(generator) ? generator({
                            async write(chunk) {
                                await _walkJSX(ssr, chunk, !0, styleScoped), ssr.commentNode(FLUSH_COMMENT$1);
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
                const eventValue = setEvent$1(serializationCtx, key, value);
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
    function setEvent$1(serializationCtx, key, rawValue) {
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
                    const nestedValue = setEvent$1(serializationCtx, key, qrl);
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
    const createJSXError = (message, node) => {
        const error = new Error(message);
        return node.dev ? (error.stack = `JSXError: ${message}\n${filterStack(node.dev.stack, 1)}`, 
        error) : error;
    };
    const filterStack = (stack, offset = 0) => stack.split("\n").slice(offset).join("\n");
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
    const useSequentialScope = () => {
        const iCtx = useInvokeContext();
        const host = iCtx.$hostElement$;
        let seq = iCtx.$container2$.getHostProp(host, "q:seq");
        null === seq && (seq = [], iCtx.$container2$.setHostProp(host, "q:seq", seq));
        let seqIdx = iCtx.$container2$.getHostProp(host, "q:seqIdx");
        for (null === seqIdx && (seqIdx = 0), iCtx.$container2$.setHostProp(host, "q:seqIdx", seqIdx + 1); seq.length <= seqIdx; ) {
            seq.push(void 0);
        }
        return {
            val: seq[seqIdx],
            set: value => (qDev && verifySerializable(value), seq[seqIdx] = value),
            i: seqIdx,
            iCtx
        };
    };
    const useResourceQrl = (qrl, opts) => {
        const {val, set, i, iCtx} = useSequentialScope();
        if (null != val) {
            return val;
        }
        assertQrl(qrl);
        const container = iCtx.$container2$;
        const resource = createResourceReturn(container, opts);
        const task = new Task(TaskFlags.DIRTY | TaskFlags.RESOURCE, i, iCtx.$hostElement$, qrl, resource, null);
        return runResource(task, container, iCtx.$hostElement$), set(resource), resource;
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
    const createResourceReturn = (container, opts, initialPromise) => {
        const result = _createResourceReturn(opts);
        return result.value = initialPromise, createStore(container, result, StoreFlags.RECURSIVE);
    };
    const isResourceReturn = obj => isObject(obj) && "resource" === (getStoreTarget(obj) || obj).__brand;
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
        $serialize$: (obj, getObjId) => serializeTask(obj, getObjId),
        $prepare$: data => parseTask(data),
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
            const result = _createResourceReturn();
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
                assertDefined(fnBody, "If qSerialize is true then fnStr must be provided.");
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
            assertString(fn.$func$, "fn.$func$ should be a string"), fn.$func$ = getObject(fn.$func$), 
            fn.$args$ = fn.$args$.map(getObject);
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
            collectValue(node.constProps, collector, leaks), collectValue(node.key, collector, leaks);
            let type = node.type;
            type === Slot ? type = ":slot" : type === Fragment && (type = ":fragment"), collectValue(type, collector, leaks);
        },
        $serialize$: (node, getObjID) => {
            let type = node.type;
            return type === Slot ? type = ":slot" : type === Fragment && (type = ":fragment"), 
            `${getObjID(type)} ${getObjID(node.props)} ${getObjID(node.constProps)} ${getObjID(node.key)} ${getObjID(node.children)} ${node.flags}`;
        },
        $prepare$: data => {
            const [type, props, immutableProps, key, children, flags] = data.split(" ");
            return new JSXNodeImpl(type, props, immutableProps, children, parseInt(flags, 10), key);
        },
        $fill$: (node, getObject) => {
            node.type = getResolveJSXType(getObject(node.type)), node.props = getObject(node.props), 
            node.constProps = getObject(node.constProps), node.key = getObject(node.key), node.children = getObject(node.children);
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
            set[DATA] = void 0, assertString(data, "SetSerializer should be defined");
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
            set[DATA] = void 0, assertString(data, "SetSerializer should be defined");
            const items = 0 === data.length ? [] : data.split(" ");
            assertTrue(items.length % 2 == 0, "MapSerializer should have even number of items");
            for (let i = 0; i < items.length; i += 2) {
                set.set(getObject(items[i]), getObject(items[i + 1]));
            }
        }
    }), /*#__PURE__*/ serializer({
        $prefix$: "",
        $test$: v => !!getSerializer(v) || "" === v,
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
    const _pauseFromContexts = async (allContexts, containerState, fallbackGetObjId, textNodes) => {
        const collector = createCollector(containerState);
        textNodes?.forEach(((_, key) => {
            collector.$seen$.add(key);
        }));
        let hasListeners = !1;
        for (const ctx of allContexts) {
            if (ctx.$tasks$) {
                for (const task of ctx.$tasks$) {
                    qDev && (task.$flags$ & TaskFlags.DIRTY && logWarn(`Serializing dirty task. Looks like an internal error. \nTask Symbol: ${task.$qrl$.$symbol$}\n`), 
                    isConnected(task) || logWarn("Serializing disconnected task. Looks like an internal error.")), 
                    isResourceTask$1(task) && collector.$resources$.push(task.$state$), cleanupTask(task);
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
                0 === sub[0] && isNode(host) && isVirtualElement(host) && !collector.$elements$.includes(tryGetContext(host)) || converted.push(sub);
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
        const convertedObjs = function(objs, mustGetObjId, getObjId, collector, containerState) {
            return objs.map((obj => {
                if (null === obj) {
                    return null;
                }
                const typeObj = typeof obj;
                switch (typeObj) {
                  case "undefined":
                    return "";

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
                const value = ((obj, getObjID, collector, containerState) => {
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
                })(obj, mustGetObjId, collector, containerState);
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
        }(objs, mustGetObjId, getObjId, collector, containerState);
        const meta = {};
        const refs = {};
        for (const ctx of allContexts) {
            const elementCaptured = isVirtualElement(ctx.$element$) && collector.$elements$.includes(ctx);
            const value = serializeComponentContext(ctx, getObjId, mustGetObjId, elementCaptured, canRender, refs);
            value && (meta[ctx.$id$] = value);
        }
        return qDev && elementToIndex.forEach(((value, el) => {
            value || logWarn("unconnected element", el.nodeName, "\n");
        })), {
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
        const walker = parent.ownerDocument.createTreeWalker(parent, SHOW_ELEMENT | SHOW_COMMENT, {
            acceptNode(node) {
                if (isContainer$1(node)) {
                    return FILTER_REJECT;
                }
                const v = predicate(node);
                return void 0 !== v && results.push(v), FILTER_SKIP;
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
                    isNode(host) ? collectElement(host, collector) : collectValue(host, collector, !0)) : (collectValue(props, collector, !1), 
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
        assertDefined(subs, "subs must be defined");
        for (const sub of subs) {
            if (sub[0] > 0 && collectValue(sub[2], collector, leaks), !0 === leaks) {
                const host = sub[1];
                isNode(host) && isVirtualElement(host) ? 0 === sub[0] && collectDeferElement(host, collector) : collectValue(host, collector, !0);
            }
        }
    };
    const PROMISE_VALUE = Symbol();
    const getPromiseValue = promise => promise[PROMISE_VALUE];
    const collectValue = (obj, collector, leaks) => {
        if (null != obj) {
            switch (typeof obj) {
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
                    const collected = ((obj, collector, leaks) => {
                        for (const s of collectorSerializers) {
                            if (s.$test$(obj)) {
                                return s.$collect$(obj, collector, leaks), !0;
                            }
                        }
                        return !1;
                    })(obj, collector, leaks);
                    if (collected) {
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
                    if ("object" == typeof obj) {
                        if (isNode(obj)) {
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
    const isContainer$1 = el => isElement$1(el) && el.hasAttribute("q:container");
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
    function serializeComponentContext(ctx, getObjId, mustGetObjId, elementCaptured, canRender, refs) {
        const node = ctx.$element$;
        const ref = ctx.$refMap$;
        const props = ctx.$props$;
        const contexts = ctx.$contexts$;
        const tasks = ctx.$tasks$;
        const renderQrl = ctx.$componentQrl$;
        const seq = ctx.$seq$;
        const metaValue = {};
        if (assertDefined(ctx.$id$, "pause: can not generate ID for dom node", node), ref.length > 0) {
            assertElement(node);
            const value = mapJoin(ref, mustGetObjId, " ");
            value && (refs[ctx.$id$] = value);
        } else if (canRender) {
            let add = !1;
            if (elementCaptured) {
                assertDefined(renderQrl, "renderQrl must be defined");
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
            if (add) {
                return metaValue;
            }
        }
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
        return announcedQRL.has(symbol) || (announcedQRL.add(symbol), emitEvent("qprefetch", {
            symbols: [ getSymbolHash(symbol) ],
            bundles: chunk && [ chunk ]
        })), createQRL(chunk, symbol, null, symbolFn, null, lexicalScopeCapture, null);
    };
    const inlinedQrl = (symbol, symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, symbol, null, null, lexicalScopeCapture, null);
    const _noopQrl = (symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, null, null, null, lexicalScopeCapture, null);
    const serializeQRL = (qrl, opts = {}) => {
        assertTrue(true, "In order to serialize a QRL, qSerialize must be true"), assertQrl(qrl);
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
                const containerState = opts.$containerState$;
                const fnStrKey = qrl.resolved.toString();
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
        assertElement(elCtx.$element$);
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
    const inflateQrl = (qrl, elCtx) => (assertDefined(qrl.$capture$, "invoke: qrl capture must be defined inside useLexicalScope()", qrl), 
    qrl.$captureRef$ = qrl.$capture$.map((idx => {
        const int = parseInt(idx, 10);
        const obj = elCtx.$refMap$[int];
        return assertTrue(elCtx.$refMap$.length > int, "out of bounds inflate access", idx), 
        obj;
    })));
    const ON_PROP_REGEX = /^(on|window:|document:)/;
    const PREVENT_DEFAULT = "preventdefault:";
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
        return scope + ":" + (prop = prop.startsWith("-") ? fromCamelToKebabCase$1(prop.slice(1)) : prop.toLowerCase());
    };
    const ensureQrl = (value, containerEl) => (assertQrl(value), value.$setContainer$(containerEl), 
    value);
    const renderComponent = (rCtx, elCtx, flags) => {
        const justMounted = !(elCtx.$flags$ & HOST_FLAG_MOUNTED);
        const hostElement = elCtx.$element$;
        const containerState = rCtx.$static$.$containerState$;
        return containerState.$hostsStaging$.delete(elCtx), containerState.$subsManager$.$clearSub$(hostElement), 
        maybeThen(executeComponent(rCtx, elCtx), (res => {
            const staticCtx = rCtx.$static$;
            const newCtx = res.rCtx;
            const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement);
            if (staticCtx.$hostElements$.add(hostElement), iCtx.$subscriber$ = [ exports.SubscriptionType.HOST, hostElement ], 
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
        constructor($type$, $varProps$, $constProps$, $children$, $flags$, $key$) {
            this.$type$ = $type$, this.$varProps$ = $varProps$, this.$constProps$ = $constProps$, 
            this.$children$ = $children$, this.$flags$ = $flags$, this.$key$ = $key$, this.$elm$ = null, 
            this.$text$ = "", this.$signal$ = null, this.$id$ = $type$ + ($key$ ? ":" + $key$ : ""), 
            qDev && qInspector && (this.$dev$ = void 0), seal(this);
        }
    }
    const processNode = (node, invocationContext) => {
        const {key, type, varProps, children, flags, constProps} = node;
        let textType = "";
        if (isString(type)) {
            textType = type;
        } else {
            if (type !== Virtual) {
                if (isFunction(type)) {
                    const res = invoke(invocationContext, type, node.props, key, flags, node.dev);
                    return shouldWrapFunctional(res, node) ? processNode(_jsxSorted(Virtual, null, null, res, 0, key), invocationContext) : processData(res, invocationContext);
                }
                throw qError(25, type);
            }
            textType = VIRTUAL;
        }
        let convertedChildren = EMPTY_ARRAY;
        if (null != children) {
            return maybeThen(processData(children, invocationContext), (result => {
                void 0 !== result && (convertedChildren = isArray(result) ? result : [ result ]);
                const vnode = new ProcessedJSXNodeImpl(textType, varProps, constProps, convertedChildren, flags, key);
                return qDev && qInspector && (vnode.$dev$ = node.dev), vnode;
            }));
        }
        {
            const vnode = new ProcessedJSXNodeImpl(textType, varProps, constProps, convertedChildren, flags, key);
            return qDev && qInspector && (vnode.$dev$ = node.dev), vnode;
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
            if (isSignalV1(node)) {
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
    const SVG_NS = "http://www.w3.org/2000/svg";
    const CHILDREN_PLACEHOLDER = [];
    const smartUpdateChildren = (ctx, oldVnode, newVnode, flags) => {
        assertQwikElement(oldVnode.$elm$);
        const ch = newVnode.$children$;
        if (1 === ch.length && ":skipRender" === ch[0].$type$) {
            return void (newVnode.$children$ = oldVnode.$children$);
        }
        const elm = oldVnode.$elm$;
        let filter = isChildComponent;
        if (oldVnode.$children$ === CHILDREN_PLACEHOLDER) {
            "HEAD" === elm.nodeName && (filter = isHeadChildren, flags |= 2);
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
                assertDefined(oldStartVnode.$elm$, "oldStartVnode $elm$ must be defined"), assertDefined(oldEndVnode.$elm$, "oldEndVnode $elm$ must be defined"), 
                results.push(diffVnode(ctx, oldStartVnode, newEndVnode, flags)), insertAfter(staticCtx, parentElm, oldStartVnode.$elm$, oldEndVnode.$elm$), 
                oldStartVnode = oldCh[++oldStartIdx], newEndVnode = newCh[--newEndIdx];
            } else if (oldEndVnode.$key$ && oldEndVnode.$id$ === newStartVnode.$id$) {
                assertDefined(oldStartVnode.$elm$, "oldStartVnode $elm$ must be defined"), assertDefined(oldEndVnode.$elm$, "oldEndVnode $elm$ must be defined"), 
                results.push(diffVnode(ctx, oldEndVnode, newStartVnode, flags)), insertBefore(staticCtx, parentElm, oldEndVnode.$elm$, oldStartVnode.$elm$), 
                oldEndVnode = oldCh[--oldEndIdx], newStartVnode = newCh[++newStartIdx];
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
                    assertDefined(elmToMove.$elm$, "elmToMove $elm$ must be defined"), insertBefore(staticCtx, parentElm, elmToMove.$elm$, oldStartVnode.$elm$);
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
        assertFail("Invalid node type");
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
        return "Q:TEMPLATE" !== nodeName && ("HEAD" === nodeName ? node.hasAttribute("q:head") : "STYLE" !== nodeName || !node.hasAttribute(QStyle));
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
        assertEqual(oldVnode.$type$, newVnode.$type$, "old and new vnodes type must be the same"), 
        assertEqual(oldVnode.$key$, newVnode.$key$, "old and new vnodes key must be the same"), 
        assertEqual(oldVnode.$id$, newVnode.$id$, "old and new vnodes key must be the same");
        const elm = oldVnode.$elm$;
        const tag = newVnode.$type$;
        const staticCtx = rCtx.$static$;
        const containerState = staticCtx.$containerState$;
        const currentComponent = rCtx.$cmpCtx$;
        if (assertDefined(elm, "while patching element must be defined"), assertDefined(currentComponent, "while patching current component must be defined"), 
        newVnode.$elm$ = elm, "#text" === tag) {
            staticCtx.$visited$.push(elm);
            const signal = newVnode.$signal$;
            return signal && (newVnode.$text$ = jsxToString(trackSignalV1(signal, [ exports.SubscriptionType.TEXT_MUTABLE, currentComponent.$element$, signal, elm ]))), 
            void setProperty(staticCtx, elm, "data", newVnode.$text$);
        }
        if ("#signal" === tag) {
            return;
        }
        assertQwikElement(elm);
        const props = newVnode.$varProps$;
        const vnodeFlags = newVnode.$flags$;
        const elCtx = getContext(elm, containerState);
        if (tag !== VIRTUAL) {
            let isSvg = !!(1 & flags);
            if (isSvg || "svg" !== tag || (flags |= 1, isSvg = !0), props !== EMPTY_OBJ) {
                1 & vnodeFlags || (elCtx.li.length = 0);
                const values = oldVnode.$varProps$;
                newVnode.$varProps$ = values;
                for (const prop in props) {
                    let newValue = props[prop];
                    if ("ref" !== prop) {
                        if (isOnProp(prop)) {
                            const normalized = setEvent(elCtx.li, prop, newValue, containerState.$containerEl$);
                            addQwikEvent(staticCtx, elm, normalized);
                        } else {
                            isSignalV1(newValue) && (newValue = trackSignalV1(newValue, [ exports.SubscriptionType.PROP_IMMUTABLE, currentComponent.$element$, newValue, elm, prop, void 0 ])), 
                            "class" === prop ? newValue = serializeClassWithHost(newValue, currentComponent) : "style" === prop && (newValue = stringifyStyle(newValue)), 
                            values[prop] !== newValue && (values[prop] = newValue, smartSetProperty(staticCtx, elm, prop, newValue, isSvg));
                        }
                    } else {
                        assertElement(elm), void 0 !== newValue && setRef(newValue, elm);
                    }
                }
            }
            if (2 & vnodeFlags) {
                return;
            }
            isSvg && "foreignObject" === tag && (flags &= -2);
            if (void 0 !== props[dangerouslySetInnerHTML]) {
                return void (qDev && newVnode.$children$.length > 0 && logWarn("Node can not have children when innerHTML is set"));
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
            return assertDefined(currentComponent.$slots$, "current component slots must be a defined array"), 
            void currentComponent.$slots$.push(newVnode);
        }
        if (dangerouslySetInnerHTML in props) {
            setProperty(staticCtx, elm, "innerHTML", props[dangerouslySetInnerHTML]);
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
            slotEl.isSvg && (newFlags |= 1);
            const index = staticCtx.$addSlots$.findIndex((slot => slot[0] === slotEl));
            return index >= 0 && staticCtx.$addSlots$.splice(index, 1), smartUpdateChildren(slotRctx, oldVdom, newVdom, newFlags);
        })));
    };
    const addChildren = (ctx, parentElm, before, vnodes, startIdx, endIdx, flags) => {
        const promises = [];
        for (;startIdx <= endIdx; ++startIdx) {
            const ch = vnodes[startIdx];
            assertDefined(ch, "render: node must be defined at index", startIdx, vnodes);
            const elm = createElm(ctx, ch, flags, promises);
            insertBefore(ctx.$static$, parentElm, elm, before);
        }
        return promiseAllLazy(promises);
    };
    const removeChildren = (staticCtx, nodes, startIdx, endIdx) => {
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
        const elCtx = createContext(template);
        return elCtx.$parentCtx$ = hostCtx, prepend(staticCtx, hostCtx.$element$, template), 
        slotMaps.templates[slotName] = template, elCtx;
    };
    const getSlotName = node => node.$varProps$[QSlot] ?? "";
    const createElm = (rCtx, vnode, flags, promises) => {
        const tag = vnode.$type$;
        const doc = rCtx.$static$.$doc$;
        const currentComponent = rCtx.$cmpCtx$;
        if ("#text" === tag) {
            return vnode.$elm$ = doc.createTextNode(vnode.$text$);
        }
        if ("#signal" === tag) {
            const signal = vnode.$signal$;
            assertDefined(signal, "expecting signal here"), assertDefined(currentComponent, "signals can not be used outside components");
            const signalValue = signal.value;
            if (isJSXNode(signalValue)) {
                const processedSignal = processData(signalValue);
                if (isSignalV1(processedSignal)) {
                    throw new Error("NOT IMPLEMENTED: Promise");
                }
                if (Array.isArray(processedSignal)) {
                    throw new Error("NOT IMPLEMENTED: Array");
                }
                {
                    const elm = createElm(rCtx, processedSignal, flags, promises);
                    return trackSignalV1(signal, 4 & flags ? [ exports.SubscriptionType.TEXT_IMMUTABLE, elm, signal, elm ] : [ exports.SubscriptionType.TEXT_MUTABLE, currentComponent.$element$, signal, elm ]), 
                    vnode.$elm$ = elm;
                }
            }
            {
                const elm = doc.createTextNode(vnode.$text$);
                return elm.data = vnode.$text$ = jsxToString(signalValue), trackSignalV1(signal, 4 & flags ? [ exports.SubscriptionType.TEXT_IMMUTABLE, elm, signal, elm ] : [ exports.SubscriptionType.TEXT_MUTABLE, currentComponent.$element$, signal, elm ]), 
                vnode.$elm$ = elm;
            }
        }
        let elm;
        let isSvg = !!(1 & flags);
        isSvg || "svg" !== tag || (flags |= 1, isSvg = !0);
        const isVirtual = tag === VIRTUAL;
        const props = vnode.$varProps$;
        const staticCtx = rCtx.$static$;
        const containerState = staticCtx.$containerState$;
        isVirtual ? elm = newVirtualElement(doc, isSvg) : "head" === tag ? (elm = doc.head, 
        flags |= 2) : (elm = createElement(doc, tag, isSvg), flags &= -3), 2 & vnode.$flags$ && (flags |= 4), 
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
                    const immutableMeta = target[_CONST_PROPS] = expectProps[_CONST_PROPS] ?? EMPTY_OBJ;
                    for (const prop in expectProps) {
                        if ("children" !== prop && prop !== QSlot) {
                            const immutableValue = immutableMeta[prop];
                            isSignalV1(immutableValue) ? target["_IMMUTABLE_PREFIX" + prop] = immutableValue : target[prop] = expectProps[prop];
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
                        slotEl.isSvg && (newFlags |= 1);
                        for (const node of newVnode.$children$) {
                            const nodeElm = createElm(slotRctx, node, newFlags, p);
                            assertDefined(node.$elm$, "vnode elm must be defined"), assertEqual(nodeElm, node.$elm$, "vnode elm must be defined"), 
                            appendChild(staticCtx, slotEl, nodeElm);
                        }
                    }
                    return promiseAllLazy(p);
                }));
                return isPromise(wait) && promises.push(wait), elm;
            }
            if ("q:s" in props) {
                assertDefined(currentComponent, "slot can only be used inside component"), assertDefined(currentComponent.$slots$, "current component slots must be a defined array"), 
                setKey(elm, vnode.$key$), directSetAttribute(elm, "q:sref", currentComponent.$id$), 
                directSetAttribute(elm, "q:s", ""), currentComponent.$slots$.push(vnode), staticCtx.$addSlots$.push([ elm, currentComponent.$element$ ]);
            } else if (dangerouslySetInnerHTML in props) {
                return setProperty(staticCtx, elm, "innerHTML", props[dangerouslySetInnerHTML]), 
                elm;
            }
        } else {
            if (qDev && qInspector) {
                const dev = vnode.$dev$;
                dev && directSetAttribute(elm, "data-qwik-inspector", `${dev.fileName}:${dev.lineNumber}:${dev.columnNumber}`);
            }
            if (vnode.$constProps$ && setProperties(staticCtx, elCtx, currentComponent, vnode.$constProps$, isSvg, !0), 
            props !== EMPTY_OBJ && (elCtx.$vdom$ = vnode, vnode.$varProps$ = setProperties(staticCtx, elCtx, currentComponent, props, isSvg, !1)), 
            isSvg && "foreignObject" === tag && (isSvg = !1, flags &= -2), currentComponent) {
                const scopedIds = currentComponent.$scopeIds$;
                scopedIds && scopedIds.forEach((styleId => {
                    elm.classList.add(styleId);
                })), currentComponent.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER && (elCtx.li.push(...currentComponent.li), 
                currentComponent.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER);
            }
            for (const listener of elCtx.li) {
                addQwikEvent(staticCtx, elm, listener[0]);
            }
            if (void 0 !== props[dangerouslySetInnerHTML]) {
                return qDev && vnode.$children$.length > 0 && logWarn("Node can not have children when innerHTML is set"), 
                elm;
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
                return assertDefined(elCtx.$element$.parentElement, "component should be already attached to the dom"), 
                elCtx.$slots$ = readDOMSlots(elCtx);
            }
            return slots;
        })(elCtx);
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
            slots,
            templates
        };
    };
    const readDOMSlots = elCtx => {
        const parent = elCtx.$element$.parentElement;
        return assertDefined(parent, "component should be already attached to the dom"), 
        queryAllVirtualByAttribute(parent, "q:sref", elCtx.$id$).map(domToVnode);
    };
    const handleClass = (ctx, elm, newValue) => (assertTrue(null == newValue || "string" == typeof newValue, "class newValue must be either nullish or string", newValue), 
    elm.namespaceURI === SVG_NS ? setAttribute(ctx, elm, "class", newValue) : setProperty(ctx, elm, "className", newValue), 
    !0);
    const checkBeforeAssign = (ctx, elm, newValue, prop) => prop in elm && ((elm[prop] !== newValue || "value" === prop && !elm.hasAttribute(prop)) && ("value" === prop && "OPTION" !== elm.tagName ? setPropertyPost(ctx, elm, prop, newValue) : setProperty(ctx, elm, prop, newValue)), 
    !0);
    const forceAttribute = (ctx, elm, newValue, prop) => (setAttribute(ctx, elm, prop.toLowerCase(), newValue), 
    !0);
    const noop = () => !0;
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
        innerHTML: noop,
        [dangerouslySetInnerHTML]: (ctx, elm, newValue) => (setProperty(ctx, elm, "innerHTML", newValue), 
        !0),
        children: noop
    };
    const smartSetProperty = (staticCtx, elm, prop, newValue, isSvg) => {
        if (isAriaAttribute(prop)) {
            return void setAttribute(staticCtx, elm, prop, null != newValue ? String(newValue) : newValue);
        }
        const exception = PROP_HANDLER_MAP[prop];
        exception && exception(staticCtx, elm, newValue, prop) || (isSvg || !(prop in elm) ? (prop.startsWith(PREVENT_DEFAULT) && registerQwikEvent(prop.slice(PREVENT_DEFAULT.length)), 
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
                    if (isSignalV1(newValue) && (assertDefined(hostCtx, "Signals can only be used in components"), 
                    newValue = trackSignalV1(newValue, immutable ? [ exports.SubscriptionType.PROP_IMMUTABLE, elm, newValue, hostCtx.$element$, prop, void 0 ] : [ exports.SubscriptionType.PROP_MUTABLE, hostCtx.$element$, newValue, elm, prop, void 0 ])), 
                    "class" === prop) {
                        if (qDev && values.class) {
                            throw new TypeError("Can only provide one of class or className");
                        }
                        if (newValue = serializeClassWithHost(newValue, hostCtx), !newValue) {
                            continue;
                        }
                    } else {
                        "style" === prop && (newValue = stringifyStyle(newValue));
                    }
                    values[prop] = newValue, smartSetProperty(staticCtx, elm, prop, newValue, isSvg);
                }
            } else {
                assertElement(elm), void 0 !== newValue && setRef(newValue, elm);
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
        assertDefined(manager, "props have to be a proxy, but it is not", props);
        const target = getProxyTarget(props);
        assertDefined(target, "props have to be a proxy, but it is not", props);
        const immutableMeta = target[_CONST_PROPS] = expectProps[_CONST_PROPS] ?? EMPTY_OBJ;
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
            ctx && cleanupContext(ctx, subsManager);
            const end = isVirtualElement(elm) ? elm.close : null;
            let node = elm.firstChild;
            for (;(node = processVirtualNodes(node)) && (cleanupTree(node, staticCtx, subsManager, !0), 
            node = node.nextSibling, node !== end); ) {}
        }
    };
    const restoreScroll = () => {
        document.__q_scroll_restore__ && (document.__q_scroll_restore__(), document.__q_scroll_restore__ = void 0);
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
        var _a;
        {
            const eventName = getEventName(prop);
            try {
                ((_a = globalThis).qwikevents || (_a.qwikevents = [])).push(eventName);
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
            node[key] = null == value ? "" : value, null == value && isNode(node) && isElement$1(node) && node.removeAttribute(key);
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
        isDoc && !headEl && logWarn("document.head is undefined"), directSetAttribute(style, QStyle, styleTask.styleId), 
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
        parent ? ((parent, child) => {
            isVirtualElement(child) ? child.remove() : parent.removeChild(child);
        })(parent, el) : qDev && logWarn("Trying to remove component already removed", el);
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
            assertDefined(key, "slots must have a key");
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
            assertDefined(key, "slots must have a key");
            const template = getChildren(hostElm, isSlotTemplate).find((node => node.getAttribute(QSlot) === key));
            template && (getChildren(template, isChildComponent).forEach((child => {
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
                byOp,
                roots: staticCtx.$roots$.map((ctx => ctx.$element$)),
                hostElements: Array.from(staticCtx.$hostElements$),
                operations: staticCtx.$operations$.map((v => [ v.$operation$.name, ...v.$args$ ]))
            };
            logDebug("Render stats.", 0 === staticCtx.$operations$.length ? "No operations" : "", stats);
        }
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
    const VIRTUAL = ":virtual";
    class VirtualElementImpl {
        constructor(open, close, isSvg) {
            throw this.open = open, this.close = close, this.isSvg = isSvg, this._qc_ = null, 
            this.nodeType = 111, this.localName = VIRTUAL, this.nodeName = VIRTUAL, new Error("SHOULD NOT BE CALLED");
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
                assertEqual(this.$template$.childElementCount, 0, "children should be empty"), parent.removeChild(this.open);
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
            newParent.insertBefore(this.close, child), assertEqual(this.$template$.childElementCount, 0, "children should be empty");
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
                assertFail("close not found");
            })(open);
            return new VirtualElementImpl(open, close, open.parentElement?.namespaceURI === SVG_NS);
        }
        return null;
    };
    const getRootNode = node => null == node ? null : isVirtualElement(node) ? node.open : node;
    const createContextId = name => (assertTrue(/^[\w/.-]+$/.test(name), "Context name must only contain A-Z,a-z,0-9, _", name), 
    /*#__PURE__*/ Object.freeze({
        id: fromCamelToKebabCase(name)
    }));
    const useContextProvider = (context, newValue) => {
        const {val, set, elCtx, iCtx} = useSequentialScope();
        if (void 0 === val) {
            if (qDev && validateContext(context), qDev && verifySerializable(newValue), iCtx.$container2$) {
                iCtx.$container2$.setContext(iCtx.$hostElement$, context, newValue);
            } else {
                (elCtx.$contexts$ || (elCtx.$contexts$ = new Map)).set(context.id, newValue);
            }
            set(1);
        }
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
    const validateContext = context => {
        if (!isObject(context) || "string" != typeof context.id || 0 === context.id.length) {
            throw qError(28, context);
        }
    };
    const ERROR_CONTEXT = /*#__PURE__*/ createContextId("qk-error");
    const handleError = (err, hostElement, containerState) => {
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
            const errorStore = resolveContext(ERROR_CONTEXT, elCtx, containerState);
            if (void 0 === errorStore) {
                throw err;
            }
            errorStore.error = err;
        }
    };
    const isRecoverable = err => !(err && err instanceof Error && "plugin" in err);
    var TaskFlags;
    !function(TaskFlags) {
        TaskFlags[TaskFlags.VISIBLE_TASK = 1] = "VISIBLE_TASK", TaskFlags[TaskFlags.TASK = 2] = "TASK", 
        TaskFlags[TaskFlags.RESOURCE = 4] = "RESOURCE", TaskFlags[TaskFlags.COMPUTED = 8] = "COMPUTED", 
        TaskFlags[TaskFlags.DIRTY = 16] = "DIRTY";
    }(TaskFlags || (TaskFlags = {}));
    const useTaskQrl = (qrl, opts) => {
        const {val, set, iCtx, i, elCtx} = useSequentialScope();
        if (!val) {
            if (assertQrl(qrl), set(1), iCtx.$container2$) {
                const host = iCtx.$hostElement$;
                const task = new Task(TaskFlags.DIRTY | TaskFlags.TASK, i, iCtx.$hostElement$, qrl, void 0, null);
                set(task);
                const result = runTask2(task, iCtx.$container2$, host);
                if (isPromise(result)) {
                    throw result;
                }
                qrl.$resolveLazy$(host), isServerPlatform() && useRunTask(task, opts?.eagerness);
            } else {
                const containerState = iCtx.$renderCtx$.$static$.$containerState$;
                const task = new Task(TaskFlags.DIRTY | TaskFlags.TASK, i, elCtx.$element$, qrl, void 0, null);
                qrl.$resolveLazy$(containerState.$containerEl$), elCtx.$tasks$ || (elCtx.$tasks$ = []), 
                elCtx.$tasks$.push(task), waitAndRun(iCtx, (() => runTask(task, containerState, iCtx.$renderCtx$))), 
                isServerPlatform() && useRunTask(task, opts?.eagerness);
            }
        }
    };
    const runTask2 = (task, container, host) => {
        task.$flags$ &= ~TaskFlags.DIRTY, cleanupTask(task);
        const iCtx = newInvokeContext(container.$locale$, host, void 0, "qTask");
        iCtx.$container2$ = container;
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
                return ctx.$effectSubscriber$ = [ task, EffectProperty.COMPONENT ], ctx.$container2$ = container, 
                invoke(ctx, (() => isFunction(obj) ? obj() : prop ? obj[prop] : isSignal(obj) ? obj.value : obj));
            },
            cleanup
        };
        return safeCall((() => taskFn(taskApi)), cleanup, (err => isPromise(err) ? err.then((() => runTask2(task, container, host))) : handleError(err)));
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
        const {val, set, i, iCtx, elCtx} = useSequentialScope();
        const eagerness = opts?.strategy ?? "intersection-observer";
        if (val) {
            isServerPlatform() && useRunTask(val, eagerness);
        } else if (assertQrl(qrl), iCtx.$container2$) {
            const task = new Task(TaskFlags.VISIBLE_TASK, i, iCtx.$hostElement$, qrl, void 0, null);
            set(task), useRunTask(task, eagerness), isServerPlatform() || (qrl.$resolveLazy$(iCtx.$hostElement$), 
            iCtx.$container2$.$scheduler$(ChoreType.VISIBLE, task));
        } else {
            const task = new Task(TaskFlags.VISIBLE_TASK, i, elCtx.$element$, qrl, void 0, null);
            const containerState = iCtx.$renderCtx$.$static$.$containerState$;
            elCtx.$tasks$ || (elCtx.$tasks$ = []), elCtx.$tasks$.push(task), set(task), useRunTask(task, eagerness), 
            isServerPlatform() || (qrl.$resolveLazy$(containerState.$containerEl$), notifyTask(task, containerState));
        }
    };
    const isResourceTask$1 = task => !!(task.$flags$ & TaskFlags.RESOURCE);
    const isComputedTask = task => !!(task.$flags$ & TaskFlags.COMPUTED);
    const runSubscriber = async (task, containerState, rCtx) => (assertEqual(!!(task.$flags$ & TaskFlags.DIRTY), !0, "Resource is not dirty", task), 
    isResourceTask$1(task) ? runResource(task, containerState, rCtx) : isComputedTask(task) ? runComputed(task, containerState, rCtx) : runTask(task, containerState, rCtx));
    const runResource = (task, container, host) => {
        task.$flags$ &= ~TaskFlags.DIRTY, cleanupTask(task);
        const iCtx = newInvokeContext(container.$locale$, host, void 0, "qResource");
        iCtx.$container2$ = container;
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
                return ctx.$effectSubscriber$ = [ task, EffectProperty.COMPONENT ], ctx.$container2$ = container, 
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
    const runTask = (task, containerState, rCtx) => {
        task.$flags$ &= ~TaskFlags.DIRTY, cleanupTask(task);
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
                    return ctx.$subscriber$ = [ exports.SubscriptionType.HOST, task ], invoke(ctx, obj);
                }
                const manager = getSubscriptionManager(obj);
                return manager ? manager.$addSub$([ exports.SubscriptionType.HOST, task ], prop) : logErrorAndStop(codeToText(26), obj), 
                prop ? obj[prop] : isSignal(obj) ? obj.value : obj;
            },
            cleanup(callback) {
                cleanups.push(callback);
            }
        };
        return safeCall((() => taskFn(opts)), (returnValue => {
            isFunction(returnValue) && cleanups.push(returnValue);
        }), (reason => {
            handleError(reason, hostElement, rCtx.$static$.$containerState$);
        }));
    };
    const runComputed = (task, containerState, rCtx) => {
        !function(obj) {
            if (qDev && !isSignal(obj) && !isSignal(obj)) {
                throw new Error("Not a Signal");
            }
        }(task.$state$), task.$flags$ &= ~TaskFlags.DIRTY, cleanupTask(task);
        const hostElement = task.$el$;
        const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "qComputed");
        iCtx.$subscriber$ = [ exports.SubscriptionType.HOST, task ], iCtx.$renderCtx$ = rCtx;
        const {$subsManager$: subsManager} = containerState;
        const taskFn = task.$qrl$.getFn(iCtx, (() => {
            subsManager.$clearSub$(task);
        }));
        return safeCall(taskFn, (returnValue => untrack((() => {
            const signal = task.$state$;
            signal[QObjectSignalFlags] &= ~SIGNAL_UNASSIGNED, signal.untrackedValue = returnValue, 
            signal[QObjectManagerSymbol].$notifySubs$();
        }))), (reason => {
            handleError(reason, hostElement, rCtx.$static$.$containerState$);
        }));
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
    const isSubscriberDescriptor = obj => isObject(obj) && obj instanceof Task;
    const serializeTask = (task, getObjId) => {
        let value = `${intToStr(task.$flags$)} ${intToStr(task.$index$)} ${getObjId(task.$qrl$)} ${getObjId(task.$el$)}`;
        return task.$state$ && (value += ` ${getObjId(task.$state$)}`), value;
    };
    const parseTask = data => {
        const [flags, index, qrl, el, resource] = data.split(" ");
        return new Task(strToInt(flags), strToInt(index), el, qrl, resource, null);
    };
    class Task extends Subscriber {
        constructor($flags$, $index$, $el$, $qrl$, $state$, $destroy$) {
            super(), this.$flags$ = $flags$, this.$index$ = $index$, this.$el$ = $el$, this.$qrl$ = $qrl$, 
            this.$state$ = $state$, this.$destroy$ = $destroy$;
        }
    }
    const isTask$1 = value => value instanceof Task;
    const HOST_FLAG_DIRTY = 1;
    const HOST_FLAG_NEED_ATTACH_LISTENER = 2;
    const HOST_FLAG_MOUNTED = 4;
    const HOST_FLAG_DYNAMIC = 8;
    const tryGetContext = element => element._qc_;
    const getContext = (el, containerState) => {
        assertQwikElement(el);
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
                if (isElement$1(el)) {
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
                    const styleIds = el.getAttribute(QScopedStyle);
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
                                elCtx.$props$ = propsObj, setObjectFlags(propsObj, 2), propsObj[_CONST_PROPS] = getImmutableFromProps(propsObj);
                            } else {
                                elCtx.$props$ = createProxy(createPropsState(), containerState);
                            }
                        }
                    }
                }
            }
        }
        const onRenderProp = directGetAttribute(el, "q:renderFn");
        if (onRenderProp) {
            const getObject = containerState.$pauseCtx$.getObject;
            elCtx.$componentQrl$ = getObject(onRenderProp);
            const propId = directGetAttribute(el, "q:props");
            propId && (elCtx.$props$ = getObject(propId));
            const seq = directGetAttribute(el, "q:seq");
            seq && (elCtx.$seq$ = getObject(seq));
        }
        return elCtx;
    };
    const getImmutableFromProps = props => {
        const immutable = {};
        const target = getProxyTarget(props);
        for (const key in target) {
            key.startsWith("_IMMUTABLE_PREFIX") && (immutable[key.slice(17)] = target[key]);
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
        return seal(ctx), element._qc_ = ctx, ctx;
    };
    const cleanupContext = (elCtx, subsManager) => {
        elCtx.$tasks$?.forEach((task => {
            subsManager.$clearSub$(task), cleanupTask(task);
        })), elCtx.$componentQrl$ = null, elCtx.$seq$ = null, elCtx.$tasks$ = null;
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
            $waitOn$: void 0,
            $subscriber$: void 0,
            $effectSubscriber$: void 0,
            $renderCtx$: void 0,
            $locale$: locale || ("object" == typeof event && event && "locale" in event ? event.locale : void 0),
            $container2$: void 0
        };
        return seal(ctx), ctx;
    };
    const untrack = fn => invoke(void 0, fn);
    const trackInvocation = /*#__PURE__*/ newInvokeContext(void 0, void 0, void 0, "qRender");
    const trackSignalV1 = (signal, sub) => (trackInvocation.$subscriber$ = sub, invoke(trackInvocation, (() => signal.value)));
    const trackSignal = (fn, subscriber, property, container, data) => {
        const previousSubscriber = trackInvocation.$effectSubscriber$;
        const previousContainer = trackInvocation.$container2$;
        try {
            return trackInvocation.$effectSubscriber$ = [ subscriber, property ], data && trackInvocation.$effectSubscriber$.push(data), 
            trackInvocation.$container2$ = container, invoke(trackInvocation, fn);
        } finally {
            trackInvocation.$effectSubscriber$ = previousSubscriber, trackInvocation.$container2$ = previousContainer;
        }
    };
    var _a;
    const QObjectSignalFlags = Symbol("proxy manager");
    const SIGNAL_IMMUTABLE = 1;
    const SIGNAL_UNASSIGNED = 2;
    const SignalUnassignedException = Symbol("unassigned signal");
    class SignalBase {}
    class SignalImpl extends SignalBase {
        constructor(v, manager, flags) {
            super(), this[_a] = 0, this.untrackedValue = v, this[QObjectManagerSymbol] = manager, 
            this[QObjectSignalFlags] = flags;
        }
        valueOf() {
            if (qDev) {
                throw new TypeError("Cannot coerce a Signal, use `.value` instead");
            }
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
            if (qDev) {
                if (this[QObjectSignalFlags] & SIGNAL_IMMUTABLE) {
                    throw new Error("Cannot mutate immutable signal");
                }
                verifySerializable(v);
                const invokeCtx = tryGetInvokeContext();
                invokeCtx && ("qRender" === invokeCtx.$event$ ? logWarn("State mutation inside render function. Use useTask$() instead.", String(invokeCtx.$hostElement$)) : "qComputed" === invokeCtx.$event$ && logWarn("State mutation inside useComputed$() is an antipattern. Use useTask$() instead", String(invokeCtx.$hostElement$)));
            }
            const manager = this[QObjectManagerSymbol];
            manager && this.untrackedValue !== v && (this.untrackedValue = v, manager.$notifySubs$());
        }
    }
    _a = QObjectSignalFlags;
    class SignalDerived extends SignalBase {
        constructor($func$, $args$, $funcStr$) {
            super(), this.$func$ = $func$, this.$args$ = $args$, this.$funcStr$ = $funcStr$;
        }
        get value() {
            return this.$func$.apply(void 0, this.$args$);
        }
        get [QObjectManagerSymbol]() {
            const args = this.$args$;
            if (args?.length >= 2 && "object" == typeof args[0] && "string" == typeof args[1]) {
                const subMgr = getSubscriptionManager(args[0]);
                if (subMgr) {
                    return new DerivedSubscriptionManager(subMgr, args[1]);
                }
            }
        }
    }
    const notImplemented = () => {
        throw new Error;
    };
    class DerivedSubscriptionManager {
        constructor($delegate$, $prop$) {
            this.$delegate$ = $delegate$, this.$prop$ = $prop$, this.$addSubs$ = notImplemented, 
            this.$addToGroup$ = notImplemented, this.$unsubGroup$ = notImplemented, this.$unsubEntry$ = notImplemented, 
            this.$notifySubs$ = notImplemented;
        }
        $addSub$(sub, key) {
            this.$delegate$.$addSub$(sub, this.$prop$);
        }
    }
    class SignalWrapper extends SignalBase {
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
    const isSignalV1 = obj => obj instanceof SignalBase;
    const getProp = (obj, prop) => obj[prop];
    const _wrapProp = (obj, prop = "value") => {
        if (!isObject(obj)) {
            return obj[prop];
        }
        if (isSignal(obj)) {
            return assertEqual(prop, "value", "Left side is a signal, prop must be value"), 
            new WrappedSignal(null, getProp, [ obj, prop ], null);
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
            $subsManager$: void 0,
            $inlineFns$: new Map
        };
        return containerState.$subsManager$ = createSubscriptionManager(containerState), 
        seal(containerState), containerState;
    };
    const setRef = (value, elm) => {
        if (isFunction(value)) {
            return value(elm);
        }
        if (isSignalV1(value)) {
            return isServerPlatform() ? value.untrackedValue = elm : value.value = elm;
        }
        throw qError(32, value);
    };
    const SHOW_ELEMENT = 1;
    const SHOW_COMMENT = 128;
    const FILTER_REJECT = 2;
    const FILTER_SKIP = 3;
    const intToStr = nu => nu.toString(36);
    const strToInt = nu => parseInt(nu, 36);
    const getEventName = attribute => {
        const colonPos = attribute.indexOf(":");
        return attribute ? attribute.slice(colonPos + 1).replace(/-./g, (x => x[1].toUpperCase())) : attribute;
    };
    const resumeIfNeeded = containerEl => {
        "paused" === directGetAttribute(containerEl, "q:container") && (resumeContainer(containerEl), 
        appendQwikDevTools(containerEl));
    };
    const resumeContainer = containerEl => {
        if (!isElement$1(el = containerEl) || !el.hasAttribute("q:container")) {
            return void logWarn("Skipping resuming because parent element is not q:container");
        }
        var el;
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
        if (qDev) {
            if (!getQwikJSON(containerEl === doc.documentElement ? doc.body : containerEl, "type")) {
                return void logWarn("Skipping resuming qwik/json metadata was not found.");
            }
        }
        const inlinedFunctions = getQFuncs(doc, hash);
        const containerState = _getContainerState(containerEl);
        const elements = new Map;
        const text = new Map;
        let node = null;
        let container = 0;
        const elementWalker = doc.createTreeWalker(containerEl, SHOW_COMMENT);
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
            assertDefined(id, "resume: element missed q:id", el);
            const index = strToInt(id);
            elements.set(index, el);
        }));
        const parser = ((containerState, doc) => {
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
        })(containerState, doc);
        const finalized = new Map;
        const revived = new Set;
        const getObject = id => (assertTrue("string" == typeof id && id.length > 0, "resume: id must be an non-empty string, got:", id), 
        finalized.has(id) ? finalized.get(id) : computeObject(id));
        const computeObject = id => {
            if (id.startsWith("#")) {
                const elementId = id.slice(1);
                const index = strToInt(elementId);
                assertTrue(elements.has(index), "missing element for id:", elementId);
                const rawElement = elements.get(index);
                if (assertDefined(rawElement, "missing element for id:", elementId), isComment(rawElement)) {
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
                return assertDefined(func, "missing inlined function for id:", funcId), func;
            }
            if (id.startsWith("*")) {
                const elementId = id.slice(1);
                const index = strToInt(elementId);
                assertTrue(elements.has(index), "missing element for id:", elementId);
                const str = text.get(index);
                return assertDefined(str, "missing element for id:", elementId), finalized.set(id, str), 
                str;
            }
            const index = strToInt(id);
            const objs = pauseState.objs;
            assertTrue(objs.length > index, "resume: index is out of bounds", id);
            let value = objs[index];
            isString(value) && (value = "" === value ? void 0 : parser.prepare(value));
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
        containerState.$elementIndex$ = 1e5, containerState.$pauseCtx$ = {
            getObject,
            meta: pauseState.ctx,
            refs: pauseState.refs
        }, directSetAttribute(containerEl, "q:container", "resumed"), logDebug("Container resumed"), 
        ((el, eventName, detail, bubbles) => {
            (build.isBrowser || "function" == typeof CustomEvent) && el && el.dispatchEvent(new CustomEvent(eventName, {
                detail,
                bubbles,
                composed: bubbles
            }));
        })(containerEl, "qresume", void 0, !0);
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
            pause: () => (async elmOrDoc => {
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
                        value && elm.setAttribute(QScopedStyle, value);
                    }
                    if (elCtx.$id$ && elm.setAttribute("q:id", elCtx.$id$), isElement$1(elm) && listeners.length > 0) {
                        const groups = groupListeners(listeners);
                        for (const listener of groups) {
                            elm.setAttribute(listener[0], serializeQRLs(listener[1], containerState, elCtx));
                        }
                    }
                }
                const data = await _pauseFromContexts(contexts, containerState, (el => isNode(el) && isText(el) ? getTextID(el, containerState) : null));
                const qwikJson = doc.createElement("script");
                directSetAttribute(qwikJson, "type", "qwik/json"), qwikJson.textContent = escapeText(JSON.stringify(data.state, void 0, qDev ? "  " : void 0)), 
                parentJSON.appendChild(qwikJson);
                const extraListeners = Array.from(containerState.$events$, (s => JSON.stringify(s)));
                const eventsScript = doc.createElement("script");
                return eventsScript.textContent = `(window.qwikevents||=[]).push(${extraListeners.join(", ")})`, 
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
            const containerElement = _getQContainerElement(el);
            if (assertDefined(containerElement, "invoke: cant find parent q:container of", el), 
            "2" == containerElement.getAttribute("q:runtime")) {
                qrl = getDomContainer(containerElement).parseQRL(decodeURIComponent(String(context.$url$)));
            } else {
                qrl = parseQRL(decodeURIComponent(String(context.$url$)), containerElement), assertQrl(qrl), 
                resumeIfNeeded(containerElement);
                const elCtx = getContext(el, _getContainerState(containerElement));
                inflateQrl(qrl, elCtx);
            }
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
                    let value = trackSignalV1(operation[2], operation.slice(0, -1));
                    "class" === prop ? value = serializeClassWithHost(value, tryGetContext(hostElm)) : "style" === prop && (value = stringifyStyle(value));
                    const vdom = getVdom(elCtx);
                    if (prop in vdom.$varProps$ && vdom.$varProps$[prop] === value) {
                        return;
                    }
                    return vdom.$varProps$[prop] = value, smartSetProperty(staticCtx, elm, prop, value, isSVG);
                }

              case 3:
              case 4:
                {
                    const elm = operation[3];
                    if (!staticCtx.$visited$.includes(elm)) {
                        staticCtx.$containerState$.$subsManager$.$clearSignal$(operation);
                        const invocationContext = void 0;
                        let signalValue = trackSignalV1(operation[2], operation.slice(0, -1));
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
        if (vnode_isVNode(hostElement)) {
            containerState.markComponentForRender(hostElement);
        } else {
            const server = isServerPlatform();
            server || resumeIfNeeded(containerState.$containerEl$);
            const elCtx = getContext(hostElement, containerState);
            if (assertDefined(elCtx.$componentQrl$, "render: notified host element must have a defined $renderQrl$", elCtx), 
            elCtx.$flags$ & HOST_FLAG_DIRTY) {
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
        }
    };
    const notifySignalOperation = (op, containerState) => {
        const activeRendering = void 0 !== containerState.$hostsRendering$;
        containerState.$opsNext$.add(op), activeRendering || scheduleFrame(containerState);
    };
    const notifyTask = (task, containerState) => {
        if (!(task.$flags$ & TaskFlags.DIRTY)) {
            if (task.$flags$ |= TaskFlags.DIRTY, isDomContainer(containerState)) {
                containerState.$tasks$.push(task), containerState.scheduleRender();
            } else {
                void 0 !== containerState.$hostsRendering$ ? containerState.$taskStaging$.add(task) : (containerState.$taskNext$.add(task), 
                scheduleFrame(containerState));
            }
        }
    };
    const scheduleFrame = containerState => (void 0 === containerState.$renderPromise$ && (containerState.$renderPromise$ = getPlatform().nextTick((() => renderMarked(containerState)))), 
    containerState.$renderPromise$);
    const _hW = () => {
        const [task] = useLexicalScope();
        getDomContainer(task.$el$).$scheduler$(task.$flags$ & TaskFlags.VISIBLE_TASK ? ChoreType.VISIBLE : ChoreType.TASK, task);
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
                    containerState.$styleIds$.add(directGetAttribute(el, QStyle)), appendChild(staticCtx, doc.head, el);
                }));
            }
            for (const elCtx of renderingQueue) {
                const el = elCtx.$element$;
                if (!staticCtx.$hostElements$.has(el) && elCtx.$componentQrl$) {
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
            return signalOperations.forEach((op => {
                executeSignalOperation(rCtx, op);
            })), staticCtx.$operations$.push(...staticCtx.$postOperations$), 0 === staticCtx.$operations$.length ? (printRenderStats(staticCtx), 
            void await postRendering(containerState, rCtx)) : (await (async ctx => {
                build.isBrowser && document.__q_view_transition__ && (document.__q_view_transition__ = void 0, 
                document.startViewTransition) ? await document.startViewTransition((() => {
                    executeDOMRender(ctx), restoreScroll();
                })).finished : (executeDOMRender(ctx), build.isBrowser && restoreScroll());
            })(staticCtx), printRenderStats(staticCtx), postRendering(containerState, rCtx));
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
        await executeTasksAfter(containerState, rCtx, ((task, stage) => !!(task.$flags$ & TaskFlags.VISIBLE_TASK) && (!stage || hostElements.has(task.$el$)))), 
        containerState.$hostsStaging$.forEach((el => {
            containerState.$hostsNext$.add(el);
        })), containerState.$hostsStaging$.clear(), containerState.$hostsRendering$ = void 0, 
        containerState.$renderPromise$ = void 0;
        containerState.$hostsNext$.size + containerState.$taskNext$.size + containerState.$opsNext$.size > 0 && (containerState.$renderPromise$ = renderMarked(containerState));
    };
    const isTask = task => !!(task.$flags$ & TaskFlags.TASK);
    const isResourceTask = task => !!(task.$flags$ & TaskFlags.RESOURCE);
    const executeTasksBefore = async (containerState, rCtx) => {
        const containerEl = containerState.$containerEl$;
        const resourcesPromises = [];
        const taskPromises = [];
        containerState.$taskNext$.forEach((task => {
            isTask(task) && (taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))), 
            containerState.$taskNext$.delete(task)), isResourceTask(task) && (resourcesPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))), 
            containerState.$taskNext$.delete(task));
        }));
        do {
            if (containerState.$taskStaging$.forEach((task => {
                isTask(task) ? taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))) : isResourceTask(task) ? resourcesPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))) : containerState.$taskNext$.add(task);
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
            if (canSerialize2(unwrapped)) {
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
    const fastWeakSerialize = obj => weakSerializeSet.has(obj);
    const noSerialize = input => (null != input && noSerializeSet.add(input), input);
    const isConnected = sub => isSubscriberDescriptor(sub) ? isConnected(sub.$el$) : !!tryGetContext(sub) || sub.isConnected;
    const unwrapProxy = proxy => isObject(proxy) ? getProxyTarget(proxy) ?? proxy : proxy;
    const getProxyTarget = obj => obj[QObjectTargetSymbol];
    const getSubscriptionManager = obj => obj[QObjectManagerSymbol];
    const getProxyFlags = obj => obj[QObjectFlagsSymbol];
    var SubscriptionType;
    var SubscriptionProp;
    exports.SubscriptionType = void 0, (SubscriptionType = exports.SubscriptionType || (exports.SubscriptionType = {}))[SubscriptionType.HOST = 0] = "HOST", 
    SubscriptionType[SubscriptionType.PROP_IMMUTABLE = 1] = "PROP_IMMUTABLE", SubscriptionType[SubscriptionType.PROP_MUTABLE = 2] = "PROP_MUTABLE", 
    SubscriptionType[SubscriptionType.TEXT_IMMUTABLE = 3] = "TEXT_IMMUTABLE", SubscriptionType[SubscriptionType.TEXT_MUTABLE = 4] = "TEXT_MUTABLE", 
    function(SubscriptionProp) {
        SubscriptionProp[SubscriptionProp.TYPE = 0] = "TYPE", SubscriptionProp[SubscriptionProp.HOST = 1] = "HOST", 
        SubscriptionProp[SubscriptionProp.SIGNAL = 2] = "SIGNAL", SubscriptionProp[SubscriptionProp.ELEMENT = 3] = "ELEMENT", 
        SubscriptionProp[SubscriptionProp.ELEMENT_PROP = 4] = "ELEMENT_PROP", SubscriptionProp[SubscriptionProp.STYLE_ID = 5] = "STYLE_ID";
    }(SubscriptionProp || (SubscriptionProp = {}));
    const serializeSubscription = (sub, getObjId) => {
        const type = sub[SubscriptionProp.TYPE];
        const host = "string" == typeof sub[SubscriptionProp.HOST] ? sub[SubscriptionProp.HOST] : getObjId(sub[SubscriptionProp.HOST]);
        if (!host) {
            return;
        }
        let base = type + " " + host;
        let key;
        if (type === exports.SubscriptionType.HOST) {
            key = sub[SubscriptionProp.SIGNAL];
        } else {
            const signalID = getObjId(sub[SubscriptionProp.SIGNAL]);
            if (!signalID) {
                return;
            }
            if (type <= exports.SubscriptionType.PROP_MUTABLE) {
                key = sub[SubscriptionProp.ELEMENT_PROP], base += ` ${signalID} ${must(getObjId(sub[SubscriptionProp.ELEMENT]))} ${sub[SubscriptionProp.ELEMENT_PROP]}`;
            } else if (type <= exports.SubscriptionType.TEXT_MUTABLE) {
                key = sub.length > SubscriptionProp.ELEMENT_PROP ? sub[SubscriptionProp.ELEMENT_PROP] : void 0;
                base += ` ${signalID} ${"string" == typeof sub[SubscriptionProp.ELEMENT] ? sub[SubscriptionProp.ELEMENT] : must(getObjId(sub[SubscriptionProp.ELEMENT]))}`;
            } else {
                assertFail("Should not get here: " + type);
            }
        }
        return key && (base += ` ${encodeURI(key)}`), base;
    };
    const parseSubscription = (sub, getObject) => {
        const parts = sub.split(" ");
        const type = parseInt(parts[0], 10);
        assertTrue(parts.length >= 2, "At least 2 parts");
        const host = getObject(parts[1]);
        if (host && (!isSubscriberDescriptor(host) || host.$el$)) {
            return type === exports.SubscriptionType.HOST ? (assertTrue(parts.length <= 3, "Max 3 parts"), 
            [ type, host, 3 === parts.length ? safeDecode(parts[2]) : void 0 ]) : type <= 2 ? (assertTrue(6 === parts.length || 7 === parts.length, "Type B has 5"), 
            [ type, host, getObject(parts[2]), getObject(parts[3]), parts[4], safeDecode(parts[5]), safeDecode(parts[6]) ]) : (assertTrue(type <= 4 && (4 === parts.length || 5 === parts.length), "Type C has 4"), 
            [ type, host, getObject(parts[2]), getObject(parts[3]), safeDecode(parts[4]) ]);
        }
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
                const managers = groupToManagers.get(signal[SubscriptionProp.HOST]);
                if (managers) {
                    for (const manager of managers) {
                        manager.$unsubEntry$(signal);
                    }
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
                this.$addToGroup$(sub[SubscriptionProp.HOST], this);
            }
        }
        $addToGroup$(group, manager) {
            let managers = this.$groupToManagers$.get(group);
            managers || this.$groupToManagers$.set(group, managers = []), managers.includes(manager) || managers.push(manager);
        }
        $unsubGroup$(group) {
            const subs = this.$subs$;
            for (let i = 0; i < subs.length; i++) {
                subs[i][SubscriptionProp.HOST] === group && (subs.splice(i, 1), i--);
            }
        }
        $unsubEntry$(entry) {
            const [type, group, signal, elm] = entry;
            const subs = this.$subs$;
            if (type === exports.SubscriptionType.PROP_IMMUTABLE || type === exports.SubscriptionType.PROP_MUTABLE) {
                const prop = entry[SubscriptionProp.ELEMENT_PROP];
                for (let i = 0; i < subs.length; i++) {
                    const sub = subs[i];
                    sub[SubscriptionProp.TYPE] === type && sub[SubscriptionProp.HOST] === group && sub[SubscriptionProp.SIGNAL] === signal && sub[SubscriptionProp.ELEMENT] === elm && sub[SubscriptionProp.ELEMENT_PROP] === prop && (subs.splice(i, 1), 
                    i--);
                }
            } else if (type === exports.SubscriptionType.TEXT_IMMUTABLE || type === exports.SubscriptionType.TEXT_MUTABLE) {
                for (let i = 0; i < subs.length; i++) {
                    const sub = subs[i];
                    sub[SubscriptionProp.TYPE] === type && sub[SubscriptionProp.HOST] === group && sub[SubscriptionProp.SIGNAL] === signal && sub[SubscriptionProp.ELEMENT] === elm && (subs.splice(i, 1), 
                    i--);
                }
            }
        }
        $addSub$(sub, key) {
            const subs = this.$subs$;
            const group = sub[SubscriptionProp.HOST];
            sub[SubscriptionProp.TYPE] === exports.SubscriptionType.HOST && subs.some((([_type, _group, _key]) => _type === exports.SubscriptionType.HOST && _group === group && _key === key)) || (subs.push(__lastSubscription = [ ...sub, key ]), 
            this.$addToGroup$(group, this));
        }
        $notifySubs$(key) {
            const subs = [ ...this.$subs$ ];
            for (const sub of subs) {
                const compare = sub[sub.length - 1];
                if (!key || !compare || compare === key) {
                    if ((container = this.$containerState$) && "object" == typeof container && "function" == typeof container.setHostProp) {
                        const type = sub[SubscriptionProp.TYPE];
                        const host = sub[SubscriptionProp.HOST];
                        const scheduler = this.$containerState$.$scheduler$;
                        if (type == exports.SubscriptionType.HOST) {
                            if (isTask$1(host)) {
                                if (isComputedTask(host)) {} else if (isResourceTask$1(host)) {
                                    scheduler(ChoreType.RESOURCE, host);
                                } else {
                                    scheduler(host.$flags$ & TaskFlags.VISIBLE_TASK ? ChoreType.VISIBLE : ChoreType.TASK, host);
                                }
                            } else {
                                const componentQrl = this.$containerState$.getHostProp(host, "q:renderFn");
                                assertDefined(componentQrl, "No Component found at this location");
                                const componentProps = this.$containerState$.getHostProp(host, "q:props");
                                scheduler(ChoreType.COMPONENT, host, componentQrl, componentProps);
                            }
                        } else {
                            const signal = sub[SubscriptionProp.SIGNAL];
                            this.$containerState$.$subsManager$.$clearSignal$(sub);
                            const value = trackSignalV1(signal, sub);
                            if (type == exports.SubscriptionType.PROP_IMMUTABLE || type == exports.SubscriptionType.PROP_MUTABLE) {
                                updateNodeProp(this.$containerState$, sub[SubscriptionProp.STYLE_ID] || null, sub[SubscriptionProp.ELEMENT], sub[SubscriptionProp.ELEMENT_PROP], value, type == exports.SubscriptionType.PROP_IMMUTABLE);
                            } else {
                                scheduler(ChoreType.NODE_DIFF, host, sub[SubscriptionProp.ELEMENT], value);
                            }
                        }
                    } else {
                        notifyChange(sub, this.$containerState$);
                    }
                }
            }
            var container;
        }
    }
    function updateNodeProp(container, styleScopedId, target, propKey, propValue, immutable) {
        let value = propValue;
        if (value = serializeAttribute(propKey, value, styleScopedId), immutable) {
            container.$journal$.push(VNodeJournalOpCode.SetAttribute, target[ElementVNodeProps.element], propKey, value);
        } else {
            vnode_setAttr(container.$journal$, target, propKey, value);
        }
        container.$scheduler$(ChoreType.JOURNAL_FLUSH);
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
            const containerState = iCtx.$container2$;
            const newStore = getOrCreateStore(value, opts?.deep ?? !0 ? StoreFlags.RECURSIVE : StoreFlags.NONE, containerState);
            return set(newStore), newStore;
        }
    };
    function useServerData(key, defaultValue) {
        const ctx = tryGetInvokeContext();
        return ctx?.$container2$ ? ctx?.$container2$.$serverData$[key] ?? defaultValue : ctx?.$renderCtx$?.$static$.$containerState$.$serverData$[key] ?? defaultValue;
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
        const {val, set, iCtx, i, elCtx} = useSequentialScope();
        if (val) {
            return val;
        }
        if (iCtx.$container2$) {
            const styleId = styleKey(styleQrl, i);
            const host = iCtx.$hostElement$;
            set(styleId);
            const value = styleQrl.$resolveLazy$(host);
            if (isPromise(value)) {
                throw value.then((val => iCtx.$container2$.$appendStyle$(transform(val, styleId), styleId, host, scoped))), 
                value;
            }
            return iCtx.$container2$.$appendStyle$(transform(value, styleId), styleId, host, scoped), 
            styleId;
        }
        {
            const styleId = styleKey(styleQrl, i);
            const containerState = iCtx.$renderCtx$.$static$.$containerState$;
            if (set(styleId), elCtx.$appendStyles$ || (elCtx.$appendStyles$ = []), elCtx.$scopeIds$ || (elCtx.$scopeIds$ = []), 
            scoped && elCtx.$scopeIds$.push(styleContent(styleId)), containerState.$styleIds$.has(styleId)) {
                return styleId;
            }
            containerState.$styleIds$.add(styleId);
            const value = styleQrl.$resolveLazy$(containerState.$containerEl$);
            const appendStyle = styleText => {
                assertDefined(elCtx.$appendStyles$, "appendStyles must be defined"), elCtx.$appendStyles$.push({
                    styleId,
                    content: transform(styleText, styleId)
                });
            };
            return isPromise(value) ? iCtx.$waitOn$.push(value.then(appendStyle)) : appendStyle(value), 
            styleId;
        }
    };
    const useComputed$ = implicit$FirstArg(useComputedQrl);
    const useTask$ = /*#__PURE__*/ implicit$FirstArg(useTaskQrl);
    const useVisibleTask$ = /*#__PURE__*/ implicit$FirstArg(useVisibleTaskQrl);
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
            let element;
            return element = vnode_isVNode(hostElement) && vnode_isElementVNode(hostElement) ? vnode_getNode(hostElement) : hostElement, 
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
    }, exports._jsxBranch = input => {
        const iCtx = tryGetInvokeContext();
        if (iCtx && iCtx.$hostElement$ && iCtx.$renderCtx$ && !iCtx.$container2$) {
            getContext(iCtx.$hostElement$, iCtx.$renderCtx$.$static$.$containerState$).$flags$ |= HOST_FLAG_DYNAMIC;
        }
        return input;
    }, exports._jsxC = (type, mutable, _flags, key) => jsx(type, mutable, key), exports._jsxQ = (type, mutable, immutable, children, _flags, key) => jsx(type, {
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
    }, exports._pauseFromContexts = _pauseFromContexts, exports._qrlSync = function(fn, serializedFn) {
        return void 0 === serializedFn && (serializedFn = fn.toString()), createQRL("", "<sync>", fn, null, null, null, null);
    }, exports._regSymbol = (symbol, hash) => (void 0 === globalThis.__qwik_reg_symbols && (globalThis.__qwik_reg_symbols = new Map), 
    globalThis.__qwik_reg_symbols.set(hash, symbol), symbol), exports._renderSSR = async (node, opts) => {
        const root = opts.containerTagName;
        const containerEl = createMockQContext(1).$element$;
        const containerState = createContainerState(containerEl, opts.base ?? "/");
        containerState.$serverData$.locale = opts.serverData?.locale;
        const doc = new MockElement(9);
        const rCtx = createRenderContext(doc, containerState);
        const headNodes = opts.beforeContent ?? [];
        if (qDev && (root in phasingContent || root in emptyElements || root in tableContent || root in startPhasingContent || root in invisibleElements)) {
            throw new Error(`The "containerTagName" can not be "${root}". Please choose a different tag name like: "div", "html", "custom-container".`);
        }
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
        seal(ssrCtx);
        const locale = opts.serverData?.locale;
        const containerAttributes = opts.containerAttributes;
        const qRender = containerAttributes["q:render"];
        containerAttributes["q:container"] = "paused", containerAttributes["q:version"] = version ?? "dev", 
        containerAttributes["q:render"] = (qRender ? qRender + "-" : "") + (qDev ? "ssr-dev" : "ssr"), 
        containerAttributes["q:base"] = opts.base || "", containerAttributes["q:locale"] = locale, 
        containerAttributes["q:manifest-hash"] = opts.manifestHash, containerAttributes["q:instance"] = hash();
        const children = "html" === root ? [ node ] : [ headNodes, node ];
        "html" !== root && (containerAttributes.class = "qc📦" + (containerAttributes.class ? " " + containerAttributes.class : "")), 
        opts.serverData && (containerState.$serverData$ = opts.serverData);
        const rootNode = _jsxSorted(root, EMPTY_OBJ, containerAttributes, children, HOST_FLAG_DIRTY | HOST_FLAG_NEED_ATTACH_LISTENER, null);
        containerState.$hostsRendering$ = new Set, await Promise.resolve().then((() => renderRoot(rootNode, rCtx, ssrCtx, opts.stream, containerState, opts)));
    }, exports._restProps = (props, omit, target = {}) => {
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
        if (isDocument(parent)) {
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
    exports.useConstant = value => {
        const {val, set} = useSequentialScope();
        return null != val ? val : set(value = isFunction(value) && !isQwikComponent(value) ? value() : value);
    }, exports.useContext = (context, defaultValue) => {
        const {val, set, iCtx, elCtx} = useSequentialScope();
        if (void 0 !== val) {
            return val;
        }
        let value;
        if (qDev && validateContext(context), value = iCtx.$container2$ ? iCtx.$container2$.resolveContext(iCtx.$hostElement$, context) : resolveContext(context, elCtx, iCtx.$renderCtx$.$static$.$containerState$), 
        "function" == typeof defaultValue) {
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
        const {val, set, elCtx, iCtx} = useSequentialScope();
        if (null != val) {
            return val;
        }
        if (iCtx.$container2$) {
            const containerBase = isDomContainer(iCtx.$container2$) ? "" : iCtx.$container2$.buildBase || "";
            const base = containerBase ? hashCode(containerBase) : "";
            const componentQrl = iCtx.$container2$.getHostProp(iCtx.$hostElement$, "q:renderFn");
            return set(`${base}-${componentQrl?.getHash() || ""}-${intToStr(iCtx.$container2$.$currentUniqueId$++) || ""}`);
        }
        {
            const containerBase = iCtx.$renderCtx$?.$static$?.$containerState$?.$base$ || "";
            return set(`${containerBase ? hashCode(containerBase) : ""}-${elCtx.$componentQrl$?.getHash() || ""}-${getNextIndex(iCtx.$renderCtx$) || ""}`);
        }
    }, exports.useLexicalScope = useLexicalScope, exports.useOn = useOn, exports.useOnDocument = useOnDocument, 
    exports.useOnWindow = (event, eventQrl) => {
        _useOn(createEventName(event, "window"), eventQrl);
    }, exports.useResource$ = (generatorFn, opts) => useResourceQrl(dollar(generatorFn), opts), 
    exports.useResourceQrl = useResourceQrl, exports.useServerData = useServerData, 
    exports.useSignal = initialState => {
        const {val, set} = useSequentialScope();
        if (null != val) {
            return val;
        }
        const value = isFunction(initialState) && !isQwikComponent(initialState) ? invoke(void 0, initialState) : initialState;
        return set(createSignal(value));
    }, exports.useStore = useStore, exports.useStyles$ = useStyles$, exports.useStylesQrl = useStylesQrl, 
    exports.useStylesScoped$ = useStylesScoped$, exports.useStylesScopedQrl = useStylesScopedQrl, 
    exports.useTask$ = useTask$, exports.useTaskQrl = useTaskQrl, exports.useVisibleTask$ = useVisibleTask$, 
    exports.useVisibleTaskQrl = useVisibleTaskQrl, exports.version = version, exports.withLocale = function(locale, fn) {
        const previousLang = _locale;
        try {
            return _locale = locale, fn();
        } finally {
            _locale = previousLang;
        }
    };
}));
