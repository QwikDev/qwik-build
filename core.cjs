/**
 * @license
 * @qwik.dev/core 2.0.0-0-dev+1deebe2
 * Copyright QwikDev. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@qwik.dev/core/build')) :
    typeof define === 'function' && define.amd ? define(['exports', '@qwik.dev/core/build'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.qwikCore = {}, global.qwikBuild));
})(this, (function (exports, build) { 'use strict';

    // same as isDev but separate so we can test
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
        const err = createAndLogError(true, message, ...optionalParams);
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
            console.warn('%cQWIK WARN', STYLE, message, ...optionalParams);
        }
    };
    const createAndLogError = (asyncThrow, message, ...optionalParams) => {
        const err = message instanceof Error ? message : new Error(message);
        // display the error message first, then the optional params, and finally the stack trace
        // the stack needs to be displayed last because the given params will be lost among large stack traces so it will
        // provide a bad developer experience
        console.error('%cQWIK ERROR', STYLE, err.message, ...optionalParams, err.stack);
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
    function assertTrue(value1, text, ...parts) {
        if (qDev) {
            if (value1 === true) {
                return;
            }
            throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
        }
    }
    function assertFalse(value1, text, ...parts) {
        if (qDev) {
            if (value1 === false) {
                return;
            }
            throwErrorAndStop(ASSERT_DISCLAIMER + text, ...parts);
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
    const QError_qrlIsNotFunction = 10;
    const QError_dynamicImportFailed = 11;
    const QError_unknownTypeArgument = 12;
    const QError_notFoundContext = 13;
    const QError_useMethodOutsideContext = 14;
    const QError_useInvokeContext = 20;
    const QError_invalidContext = 28;
    const QError_qrlMissingContainer = 30;
    const QError_qrlMissingChunk = 31;
    const qError = (code, ...parts) => {
        const text = codeToText(code, ...parts);
        return logErrorAndStop(text, ...parts);
    };

    const createPlatform = () => {
        return {
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

    const isNode = (value) => {
        return value && typeof value.nodeType === 'number';
    };
    const isDocument = (value) => {
        return value.nodeType === 9;
    };
    const isElement$1 = (value) => {
        return value.nodeType === 1;
    };

    const isPromise = (value) => {
        // not using "value instanceof Promise" to have zone.js support
        return !!value && typeof value == 'object' && typeof value.then === 'function';
    };
    const safeCall = (call, thenFn, rejectFn) => {
        try {
            const result = call();
            if (isPromise(result)) {
                return result.then(thenFn, rejectFn);
            }
            else {
                return thenFn(result);
            }
        }
        catch (e) {
            return rejectFn(e);
        }
    };
    const maybeThen = (valueOrPromise, thenFn) => {
        return isPromise(valueOrPromise)
            ? valueOrPromise.then(thenFn, shouldNotError)
            : thenFn(valueOrPromise);
    };
    const maybeThenPassError = (valueOrPromise, thenFn) => {
        return isPromise(valueOrPromise)
            ? valueOrPromise.then(thenFn)
            : thenFn(valueOrPromise);
    };
    const shouldNotError = (reason) => {
        throwErrorAndStop('QWIK ERROR:', reason);
    };
    const delay = (timeout) => {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    };

    /** @private */
    const isSerializableObject = (v) => {
        const proto = Object.getPrototypeOf(v);
        return proto === Object.prototype || proto === Array.prototype || proto === null;
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

    /**
     * A friendly name tag for a VirtualVNode.
     *
     * Theses are used to give a name to a VirtualVNode. This is useful for debugging and testing.
     *
     * The name is only added in development mode and is not included in production builds.
     */
    const DEBUG_TYPE = 'q:type';
    var VirtualType;
    (function (VirtualType) {
        VirtualType["Virtual"] = "V";
        VirtualType["Fragment"] = "F";
        VirtualType["WrappedSignal"] = "S";
        VirtualType["Awaited"] = "A";
        VirtualType["Component"] = "C";
        VirtualType["InlineComponent"] = "I";
        VirtualType["Projection"] = "P";
    })(VirtualType || (VirtualType = {}));
    const START = '\x1b[34m';
    const END = '\x1b[0m';
    const VirtualTypeName = {
        [VirtualType.Virtual]: /* ********* */ START + 'Virtual' + END, //
        [VirtualType.Fragment]: /* ******** */ START + 'Fragment' + END, //
        [VirtualType.WrappedSignal]: /* *** */ START + 'Signal' + END, //
        [VirtualType.Awaited]: /* ********* */ START + 'Awaited' + END, //
        [VirtualType.Component]: /* ******* */ START + 'Component' + END, //
        [VirtualType.InlineComponent]: /* * */ START + 'InlineComponent' + END, //
        [VirtualType.Projection]: /* ****** */ START + 'Projection' + END, //
    };
    var QContainerValue;
    (function (QContainerValue) {
        QContainerValue["PAUSED"] = "paused";
        QContainerValue["RESUMED"] = "resumed";
        // these values below are used in the qwik loader as a plain text for the q:container selector
        // standard dangerouslySetInnerHTML
        QContainerValue["HTML"] = "html";
        // textarea
        QContainerValue["TEXT"] = "text";
    })(QContainerValue || (QContainerValue = {}));

    /** State factory of the component. */
    const OnRenderProp = 'q:renderFn';
    /** Component style content prefix */
    const ComponentStylesPrefixContent = '⭐️';
    /** `<some-element q:slot="...">` */
    const QSlot = 'q:slot';
    const QSlotParent = ':';
    const QSlotRef = 'q:sref';
    const QSlotS = 'q:s';
    const QStyle = 'q:style';
    const QStyleSelector = 'style[q\\:style]';
    const QStyleSSelector = 'style[q\\:sstyle]';
    const QStylesAllSelector = QStyleSelector + ',' + QStyleSSelector;
    const QScopedStyle = 'q:sstyle';
    const QCtxAttr = 'q:ctx';
    const QSubscribers = 'q:subs';
    const QFuncsPrefix = 'qFuncs_';
    const getQFuncs = (document, hash) => {
        return document[QFuncsPrefix + hash] || [];
    };
    const QBaseAttr = 'q:base';
    const QLocaleAttr = 'q:locale';
    const QManifestHashAttr = 'q:manifest-hash';
    const QInstanceAttr = 'q:instance';
    const QContainerIsland = 'q:container-island';
    const QContainerIslandEnd = '/' + QContainerIsland;
    const QIgnore = 'q:ignore';
    const QIgnoreEnd = '/' + QIgnore;
    const QContainerAttr = 'q:container';
    const QContainerAttrEnd = '/' + QContainerAttr;
    const QTemplate = 'q:template';
    // the same selector should be inside the qwik loader
    // and the same selector should be inside the qwik city spa-shim and spa-init
    const QContainerSelector = '[q\\:container]:not([q\\:container=' +
        QContainerValue.HTML +
        ']):not([q\\:container=' +
        QContainerValue.TEXT +
        '])';
    const HTML_NS = 'http://www.w3.org/1999/xhtml';
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const MATH_NS = 'http://www.w3.org/1998/Math/MathML';
    const ResourceEvent = 'qResource';
    const RenderEvent = 'qRender';
    const TaskEvent = 'qTask';
    const QDefaultSlot = '';
    /**
     * Attribute to mark that this VNode has a pointer to itself from the `qwik/json` state.
     *
     * As the VNode get materialized the vnode now becomes eligible for mutation. Once the vnode mutates
     * the `VNode` references from the `qwik/json` may become invalid. For this reason, these references
     * need to be eagerly resolved. `VNODE_REF` stores a pointer to "this" vnode. This allows the system
     * to eagerly resolve these pointes as the vnodes are materialized.
     */
    const ELEMENT_ID = 'q:id';
    const ELEMENT_KEY = 'q:key';
    const ELEMENT_PROPS = 'q:props';
    const ELEMENT_SEQ = 'q:seq';
    const ELEMENT_SEQ_IDX = 'q:seqIdx';
    /** Non serializable markers - always begins with `:` character */
    const NON_SERIALIZABLE_MARKER_PREFIX = ':';
    const USE_ON_LOCAL = NON_SERIALIZABLE_MARKER_PREFIX + 'on';
    const USE_ON_LOCAL_SEQ_IDX = NON_SERIALIZABLE_MARKER_PREFIX + 'onIdx';
    const USE_ON_LOCAL_FLAGS = NON_SERIALIZABLE_MARKER_PREFIX + 'onFlags';
    // comment nodes
    const FLUSH_COMMENT = 'qkssr-f';
    const STREAM_BLOCK_START_COMMENT = 'qkssr-pu';
    const STREAM_BLOCK_END_COMMENT = 'qkssr-po';
    const Q_PROPS_SEPARATOR = ':';
    const dangerouslySetInnerHTML = 'dangerouslySetInnerHTML';

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

    const isQrl$1 = (value) => {
        return typeof value === 'function' && typeof value.getSymbol === 'function';
    };

    /** @internal */
    const EMPTY_ARRAY = [];
    const EMPTY_OBJ = {};
    Object.freeze(EMPTY_ARRAY);
    Object.freeze(EMPTY_OBJ);

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
            emitEvent('qprefetch', {
                symbols: [getSymbolHash(symbol)],
                bundles: chunk && [chunk],
            });
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
    /** @internal */
    const _regSymbol = (symbol, hash) => {
        if (typeof globalThis.__qwik_reg_symbols === 'undefined') {
            globalThis.__qwik_reg_symbols = new Map();
        }
        globalThis.__qwik_reg_symbols.set(hash, symbol);
        return symbol;
    };

    /**
     * Allows to project the children of the current component. <Slot/> can only be used within the
     * context of a component defined with `component$`.
     *
     * @public
     */
    const Slot = (props) => {
        return _jsxSorted(Virtual, null, { [QSlotS]: '' }, props.children, 0, props.name ?? '');
    };

    /** @public */
    const SkipRender = Symbol('skip render');
    /** @public */
    const SSRRaw = () => null;
    /** @public */
    const SSRComment = () => null;
    /** @public */
    const SSRStreamBlock = (props) => {
        return [
            jsx(SSRComment, { data: STREAM_BLOCK_START_COMMENT }),
            props.children,
            jsx(SSRComment, { data: STREAM_BLOCK_END_COMMENT }),
        ];
    };
    /** @public */
    const SSRStream = (props, key) => jsx(RenderOnce, { children: jsx(InternalSSRStream, props) }, key);
    const InternalSSRStream = () => null;

    function isAsyncGenerator(value) {
        return !!value[Symbol.asyncIterator];
    }

    /**
     * Think of `-` as an escape character which makes the next character uppercase. `--` is just `-`.
     *
     * Rules for JSX property event names starting with `on`:
     *
     * - Are case insensitive: `onClick$` is same `onclick$`
     * - A `--` is `-`: `dbl--click` => `dbl-click`
     * - Become case sensitive if prefixed by `-`: `-Click` is `Click`
     * - A `-` (not at the beginning) makes next character uppercase: `dbl-click` => `dblClick`
     */
    const isJsxPropertyAnEventName = (name) => {
        return ((name.startsWith('on') || name.startsWith('window:on') || name.startsWith('document:on')) &&
            name.endsWith('$'));
    };
    const isHtmlAttributeAnEventName = (name) => {
        return name.startsWith('on:') || name.startsWith('on-window:') || name.startsWith('on-document:');
    };
    const getEventNameFromJsxProp = (name) => {
        if (name.endsWith('$')) {
            let idx = -1;
            if (name.startsWith('on')) {
                idx = 2;
            }
            else if (name.startsWith('window:on')) {
                idx = 9;
            }
            else if (name.startsWith('document:on')) {
                idx = 11;
            }
            if (idx != -1) {
                const isCaseSensitive = isDashAt(name, idx) && !isDashAt(name, idx + 1);
                if (isCaseSensitive) {
                    idx++;
                }
                let lastIdx = idx;
                let eventName = '';
                while (true) {
                    idx = name.indexOf('-', lastIdx);
                    const chunk = name.substring(lastIdx, idx === -1 ? name.length - 1 /* don't include `$` */ : idx);
                    eventName += isCaseSensitive ? chunk : chunk.toLowerCase();
                    if (idx == -1) {
                        return eventName;
                    }
                    if (isDashAt(name, idx + 1)) {
                        eventName += '-';
                        idx++;
                    }
                    else {
                        eventName += name.charAt(idx + 1).toUpperCase();
                        idx++;
                    }
                    lastIdx = idx + 1;
                }
            }
        }
        return null;
    };
    const getEventNameScopeFromJsxProp = (name) => {
        const index = name.indexOf(':');
        return index !== -1 ? name.substring(0, index) : '';
    };
    const isDashAt = (name, idx) => name.charCodeAt(idx) === 45; /* - */
    const convertEventNameFromJsxPropToHtmlAttr = (name) => {
        if (name.endsWith('$')) {
            let prefix = null;
            // let idx = -1;
            if (name.startsWith('on')) {
                prefix = 'on:';
                // idx = 2; // 'on'.length
            }
            else if (name.startsWith('window:on')) {
                prefix = 'on-window:';
                // idx = 9; // 'window:on'.length
            }
            else if (name.startsWith('document:on')) {
                prefix = 'on-document:';
                // idx = 11; // 'document:on'.length
            }
            if (prefix !== null) {
                const eventName = getEventNameFromJsxProp(name);
                return prefix + fromCamelToKebabCase(eventName);
            }
        }
        return null;
    };
    const fromCamelToKebabCase = (text) => {
        return text.replace(/([A-Z-])/g, '-$1').toLowerCase();
    };
    function isPreventDefault(key) {
        return key.startsWith('preventdefault:');
    }

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

    const hashCode = (text, hash = 0) => {
        for (let i = 0; i < text.length; i++) {
            const chr = text.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return Number(Math.abs(hash)).toString(36);
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
    // Unlike fromCamelToKebabCase, this leaves `-` so that `background-color` stays `background-color`
    const fromCamelToKebabCaseWithDash = (text) => {
        return text.replace(/([A-Z])/g, '-$1').toLowerCase();
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
                                chunks.push(fromCamelToKebabCaseWithDash(key) + ':' + setValueForStyle(key, value));
                            }
                        }
                    }
                }
                return chunks.join(';');
            }
        }
        return String(obj);
    };
    const serializeBooleanOrNumberAttribute = (value) => {
        return value != null ? String(value) : null;
    };
    function serializeAttribute(key, value, styleScopedId) {
        if (isClassAttr(key)) {
            const serializedClass = serializeClass(value);
            value = styleScopedId
                ? styleScopedId + (serializedClass.length ? ' ' + serializedClass : serializedClass)
                : serializedClass;
        }
        else if (key === 'style') {
            value = stringifyStyle(value);
        }
        else if (isEnumeratedBooleanAttribute(key) || typeof value === 'number') {
            // aria attrs, tabindex etc.
            value = serializeBooleanOrNumberAttribute(value);
        }
        else if (value === false || value == null) {
            value = null;
        }
        else if (value === true && isPreventDefault(key)) {
            value = '';
        }
        return value;
    }
    function isEnumeratedBooleanAttribute(key) {
        return isAriaAttribute(key) || ['spellcheck', 'draggable', 'contenteditable'].includes(key);
    }
    const setValueForStyle = (styleName, value) => {
        if (typeof value === 'number' && value !== 0 && !isUnitlessNumber(styleName)) {
            return value + 'px';
        }
        return value;
    };
    function isAriaAttribute(prop) {
        return prop.startsWith('aria-');
    }
    const styleKey = (qStyles, index) => {
        assertQrl(qStyles);
        return `${hashCode(qStyles.$hash$)}-${index}`;
    };
    const styleContent = (styleId) => {
        return ComponentStylesPrefixContent + styleId;
    };

    function hasClassAttr(props) {
        for (const key in props) {
            if (Object.prototype.hasOwnProperty.call(props, key) && isClassAttr(key)) {
                return true;
            }
        }
        return false;
    }
    function isClassAttr(key) {
        return key === 'class' || key === 'className';
    }
    function convertScopedStyleIdsToArray(scopedStyleIds) {
        return scopedStyleIds?.split(' ') ?? null;
    }
    function convertStyleIdsToString(scopedStyleIds) {
        return Array.from(scopedStyleIds).join(' ');
    }
    const addComponentStylePrefix = (styleId) => {
        if (styleId) {
            let idx = 0;
            do {
                styleId = styleId.substring(0, idx) + styleContent(styleId.substring(idx));
            } while ((idx = styleId.indexOf(' ', idx) + 1) !== 0);
        }
        return styleId || null;
    };

    const STORE_TARGET = Symbol('store.target');
    const STORE_HANDLER = Symbol('store.handler');
    const STORE_ARRAY_PROP = Symbol('store.array');
    var StoreFlags;
    (function (StoreFlags) {
        StoreFlags[StoreFlags["NONE"] = 0] = "NONE";
        StoreFlags[StoreFlags["RECURSIVE"] = 1] = "RECURSIVE";
        StoreFlags[StoreFlags["IMMUTABLE"] = 2] = "IMMUTABLE";
    })(StoreFlags || (StoreFlags = {}));
    const getStoreHandler = (value) => {
        return value[STORE_HANDLER];
    };
    const getStoreTarget = (value) => {
        return value?.[STORE_TARGET] || null;
    };
    const unwrapStore = (value) => {
        return getStoreTarget(value) || value;
    };
    const isStore = (value) => {
        return STORE_TARGET in value;
    };
    function createStore(container, obj, flags) {
        return new Proxy(obj, new StoreHandler(flags, container || null));
    }
    const getOrCreateStore = (obj, flags, container) => {
        if (isSerializableObject(obj) && container) {
            let store = container.$storeProxyMap$.get(obj);
            if (!store) {
                store = createStore(container, obj, flags);
                container.$storeProxyMap$.set(obj, store);
            }
            return store;
        }
        return obj;
    };
    class StoreHandler {
        constructor($flags$, $container$) {
            this.$flags$ = $flags$;
            this.$container$ = $container$;
            this.$effects$ = null;
        }
        toString() {
            return '[Store]';
        }
        get(target, prop) {
            if (typeof prop === 'symbol') {
                if (prop === STORE_TARGET) {
                    return target;
                }
                if (prop === STORE_HANDLER) {
                    return this;
                }
                return target[prop];
            }
            const ctx = tryGetInvokeContext();
            const value = target[prop];
            if (ctx) {
                if (this.$container$ === null) {
                    if (!ctx.$container$) {
                        return value;
                    }
                    // Grab the container now we have access to it
                    this.$container$ = ctx.$container$;
                }
                else {
                    assertTrue(!ctx.$container$ || ctx.$container$ === this.$container$, 'Do not use signals across containers');
                }
                const effectSubscriber = ctx.$effectSubscriber$;
                if (effectSubscriber) {
                    addEffect(target, Array.isArray(target) ? STORE_ARRAY_PROP : prop, this, effectSubscriber);
                }
            }
            if (prop === 'toString' && value === Object.prototype.toString) {
                return this.toString;
            }
            const flags = this.$flags$;
            if (flags & StoreFlags.RECURSIVE &&
                typeof value === 'object' &&
                value !== null &&
                !Object.isFrozen(value) &&
                !isStore(value) &&
                !Object.isFrozen(target)) {
                return getOrCreateStore(value, this.$flags$, this.$container$);
            }
            return value;
        }
        /** In the case of oldValue and value are the same, the effects are not triggered. */
        set(target, prop, value) {
            target = unwrapDeserializerProxy(target);
            if (typeof prop === 'symbol') {
                target[prop] = value;
                return true;
            }
            const newValue = this.$flags$ & StoreFlags.RECURSIVE ? unwrapStore(value) : value;
            if (prop in target) {
                const oldValue = target[prop];
                if (newValue !== oldValue) {
                    setNewValueAndTriggerEffects(prop, newValue, target, this);
                }
            }
            else {
                setNewValueAndTriggerEffects(prop, newValue, target, this);
            }
            return true;
        }
        deleteProperty(target, prop) {
            if (typeof prop != 'string' || !delete target[prop]) {
                return false;
            }
            triggerEffects(this.$container$, this, getEffects(target, prop, this.$effects$));
            return true;
        }
        has(target, prop) {
            if (prop === STORE_TARGET) {
                return true;
            }
            return Object.prototype.hasOwnProperty.call(target, prop);
        }
        ownKeys(target) {
            const ctx = tryGetInvokeContext();
            const effectSubscriber = ctx?.$effectSubscriber$;
            if (effectSubscriber) {
                addEffect(target, STORE_ARRAY_PROP, this, effectSubscriber);
            }
            return Reflect.ownKeys(target);
        }
        getOwnPropertyDescriptor(target, prop) {
            if (Array.isArray(target) || typeof prop === 'symbol') {
                return Object.getOwnPropertyDescriptor(target, prop);
            }
            return {
                enumerable: true,
                configurable: true,
            };
        }
    }
    function addEffect(target, prop, store, effectSubscriber) {
        const effectsMap = (store.$effects$ || (store.$effects$ = {}));
        const effects = (Object.prototype.hasOwnProperty.call(effectsMap, prop) && effectsMap[prop]) ||
            (effectsMap[prop] = []);
        // Let's make sure that we have a reference to this effect.
        // Adding reference is essentially adding a subscription, so if the signal
        // changes we know who to notify.
        ensureContainsEffect(effects, effectSubscriber);
        // But when effect is scheduled in needs to be able to know which signals
        // to unsubscribe from. So we need to store the reference from the effect back
        // to this signal.
        ensureContains(effectSubscriber, target);
    }
    function setNewValueAndTriggerEffects(prop, value, target, currentStore) {
        target[prop] = value;
        triggerEffects(currentStore.$container$, currentStore, getEffects(target, prop, currentStore.$effects$));
    }
    function getEffects(target, prop, storeEffects) {
        let effectsToTrigger = storeEffects
            ? Array.isArray(target)
                ? Object.values(storeEffects).flatMap((effects) => effects)
                : storeEffects[prop]
            : null;
        const storeArrayValue = storeEffects?.[STORE_ARRAY_PROP];
        if (storeArrayValue) {
            effectsToTrigger || (effectsToTrigger = []);
            effectsToTrigger.push(...storeArrayValue);
        }
        return effectsToTrigger;
    }

    /**
     * @internal
     * The storage provider for hooks. Each invocation increases index i. Data is stored in an array.
     */
    const useSequentialScope = () => {
        const iCtx = useInvokeContext();
        const hostElement = iCtx.$hostElement$;
        const host = hostElement;
        let seq = iCtx.$container$.getHostProp(host, ELEMENT_SEQ);
        if (seq === null) {
            seq = [];
            iCtx.$container$.setHostProp(host, ELEMENT_SEQ, seq);
        }
        let seqIdx = iCtx.$container$.getHostProp(host, ELEMENT_SEQ_IDX);
        if (seqIdx === null) {
            seqIdx = 0;
        }
        iCtx.$container$.setHostProp(host, ELEMENT_SEQ_IDX, seqIdx + 1);
        while (seq.length <= seqIdx) {
            seq.push(undefined);
        }
        const set = (value) => {
            if (qDev && qSerialize) {
                verifySerializable(value);
            }
            return (seq[seqIdx] = value);
        };
        return {
            val: seq[seqIdx],
            set,
            i: seqIdx,
            iCtx,
        };
    };

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
        if (!effects) {
            return;
        }
        for (let i = effects.length - 1; i >= 0; i--) {
            const subscriber = effects[i];
            const subscriptionRemoved = clearEffects(subscriber, value);
            if (subscriptionRemoved) {
                effects.splice(i, 1);
            }
        }
    }
    function clearSubscriberEffectDependencies(value) {
        if (value.$effectDependencies$) {
            for (let i = value.$effectDependencies$.length - 1; i >= 0; i--) {
                const subscriber = value.$effectDependencies$[i];
                const subscriptionRemoved = clearEffects(subscriber, value);
                if (subscriptionRemoved) {
                    value.$effectDependencies$.splice(i, 1);
                }
            }
        }
    }
    function clearEffects(subscriber, value) {
        if (!isSignal(subscriber)) {
            return false;
        }
        const effectSubscriptions = subscriber.$effects$;
        if (!effectSubscriptions) {
            return false;
        }
        let subscriptionRemoved = false;
        for (let i = effectSubscriptions.length - 1; i >= 0; i--) {
            const effect = effectSubscriptions[i];
            if (effect[EffectSubscriptionsProp.EFFECT] === value) {
                effectSubscriptions.splice(i, 1);
                subscriptionRemoved = true;
            }
        }
        return subscriptionRemoved;
    }

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
        const { val, set, i, iCtx } = useSequentialScope();
        if (val != null) {
            return val;
        }
        assertQrl(qrl);
        const container = iCtx.$container$;
        const resource = createResourceReturn(container, opts);
        const el = iCtx.$hostElement$;
        const task = new Task(TaskFlags.DIRTY | TaskFlags.RESOURCE, i, el, qrl, resource, null);
        runResource(task, container, iCtx.$hostElement$);
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
    const Resource = (props) => {
        // Resource path
        return _jsxSorted(Fragment, null, null, getResourceValueAsPromise(props), 0, null);
    };
    function getResourceValueAsPromise(props) {
        const resource = props.value;
        if (isResourceReturn(resource)) {
            const isBrowser = !isServerPlatform();
            if (isBrowser) {
                // create a subscription for the resource._state changes
                const state = resource._state;
                if (state === 'pending' && props.onPending) {
                    return Promise.resolve(props.onPending());
                }
                else if (state === 'rejected' && props.onRejected) {
                    return Promise.resolve(resource._error).then(props.onRejected);
                }
                else {
                    // resolved, pending without onPending prop or rejected with onRejected prop
                    return Promise.resolve(untrack(() => resource._resolved)).then(props.onResolved);
                }
            }
            return resource.value.then(useBindInvokeContext(props.onResolved), useBindInvokeContext(props.onRejected));
        }
        else if (isPromise(resource)) {
            return resource.then(useBindInvokeContext(props.onResolved), useBindInvokeContext(props.onRejected));
        }
        else if (isSignal(resource)) {
            return Promise.resolve(resource.value).then(useBindInvokeContext(props.onResolved), useBindInvokeContext(props.onRejected));
        }
        else {
            return Promise.resolve(resource).then(useBindInvokeContext(props.onResolved), useBindInvokeContext(props.onRejected));
        }
    }
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
    const createResourceReturn = (container, opts, initialPromise) => {
        const result = _createResourceReturn(opts);
        result.value = initialPromise;
        return createStore(container, result, StoreFlags.RECURSIVE);
    };
    const isResourceReturn = (obj) => {
        return isObject(obj) && (getStoreTarget(obj) || obj).__brand === 'resource';
    };
    const runResource = (task, container, host) => {
        task.$flags$ &= ~TaskFlags.DIRTY;
        cleanupTask(task);
        const iCtx = newInvokeContext(container.$locale$, host, undefined, ResourceEvent);
        iCtx.$container$ = container;
        const taskFn = task.$qrl$.getFn(iCtx, () => clearSubscriberEffectDependencies(task));
        const resource = task.$state$;
        assertDefined(resource, 'useResource: when running a resource, "task.resource" must be a defined.', task);
        const track = (obj, prop) => {
            const ctx = newInvokeContext();
            ctx.$effectSubscriber$ = [task, EffectProperty.COMPONENT];
            ctx.$container$ = container;
            return invoke(ctx, () => {
                if (isFunction(obj)) {
                    return obj();
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
            });
        };
        const handleError = (reason) => container.handleError(reason, host);
        const cleanups = [];
        task.$destroy$ = noSerialize(() => {
            cleanups.forEach((fn) => {
                try {
                    fn();
                }
                catch (err) {
                    handleError(err);
                }
            });
            done = true;
        });
        const resourceTarget = unwrapStore(resource);
        const opts = {
            track,
            cleanup(fn) {
                if (typeof fn === 'function') {
                    cleanups.push(fn);
                }
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
        /**
         * Add cleanup to resolve the resource if we are trying to run the same resource again while the
         * previous one is not resolved yet. The next `runResource` run will call this cleanup
         */
        cleanups.push(() => {
            if (untrack(() => resource.loading) === true) {
                const value = untrack(() => resource._resolved);
                setState(true, value);
            }
        });
        // Execute mutation inside empty invocation
        invoke(iCtx, () => {
            // console.log('RESOURCE.pending: ');
            resource._state = 'pending';
            resource.loading = !isServerPlatform();
            const promise = (resource.value = new Promise((r, re) => {
                resolve = r;
                reject = re;
            }));
            promise.catch(ignoreErrorToPreventNodeFromCrashing);
        });
        const promise = safeCall(() => Promise.resolve(taskFn(opts)), (value) => {
            setState(true, value);
        }, (err) => {
            if (isPromise(err)) {
                return err.then(() => runResource(task, container, host));
            }
            else {
                setState(false, err);
            }
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
    const ignoreErrorToPreventNodeFromCrashing = (err) => {
        // ignore error to prevent node from crashing
        // node will crash in promise is rejected and no one is listening to the rejection.
    };

    /** @file Public types for the client deserialization */
    /**
     * Flags for VNode.
     *
     * # Materialize vs Inflation
     *
     * - Materialized: The node has all of its children. Specifically `firstChild`/`lastChild` are NOT
     *   `undefined`. Materialization creates lazy instantiation of the children. NOTE: Only
     *   ElementVNode need to be materialized.
     * - Inflation:
     *
     *   - If Text: It means that it is safe to write to the node. When Text nodes are first Deserialized
     *       multiple text nodes can share the same DOM node. On write the sibling text nodes need to be
     *       converted into separate text nodes.
     *   - If Element: It means that the element tag attributes have not yet been read from the DOM.
     *
     * Inflation and materialization are not the same, they are two independent things.
     *
     * @internal
     */
    var VNodeFlags;
    (function (VNodeFlags) {
        VNodeFlags[VNodeFlags["Element"] = 1] = "Element";
        VNodeFlags[VNodeFlags["Virtual"] = 2] = "Virtual";
        VNodeFlags[VNodeFlags["ELEMENT_OR_VIRTUAL_MASK"] = 3] = "ELEMENT_OR_VIRTUAL_MASK";
        VNodeFlags[VNodeFlags["ELEMENT_OR_TEXT_MASK"] = 5] = "ELEMENT_OR_TEXT_MASK";
        VNodeFlags[VNodeFlags["TYPE_MASK"] = 7] = "TYPE_MASK";
        VNodeFlags[VNodeFlags["INFLATED_TYPE_MASK"] = 15] = "INFLATED_TYPE_MASK";
        VNodeFlags[VNodeFlags["Text"] = 4] = "Text";
        /// Extra flag which marks if a node needs to be inflated.
        VNodeFlags[VNodeFlags["Inflated"] = 8] = "Inflated";
        /// Marks if the `ensureProjectionResolved` has been called on the node.
        VNodeFlags[VNodeFlags["Resolved"] = 16] = "Resolved";
        /// Marks if the vnode is deleted.
        VNodeFlags[VNodeFlags["Deleted"] = 32] = "Deleted";
        /// Flags for Namespace
        VNodeFlags[VNodeFlags["NAMESPACE_MASK"] = 192] = "NAMESPACE_MASK";
        VNodeFlags[VNodeFlags["NEGATED_NAMESPACE_MASK"] = -193] = "NEGATED_NAMESPACE_MASK";
        VNodeFlags[VNodeFlags["NS_html"] = 0] = "NS_html";
        VNodeFlags[VNodeFlags["NS_svg"] = 64] = "NS_svg";
        VNodeFlags[VNodeFlags["NS_math"] = 128] = "NS_math";
    })(VNodeFlags || (VNodeFlags = {}));
    var VNodeFlagsIndex;
    (function (VNodeFlagsIndex) {
        VNodeFlagsIndex[VNodeFlagsIndex["mask"] = -256] = "mask";
        VNodeFlagsIndex[VNodeFlagsIndex["negated_mask"] = 255] = "negated_mask";
        VNodeFlagsIndex[VNodeFlagsIndex["shift"] = 8] = "shift";
    })(VNodeFlagsIndex || (VNodeFlagsIndex = {}));
    var VNodeProps;
    (function (VNodeProps) {
        VNodeProps[VNodeProps["flags"] = 0] = "flags";
        VNodeProps[VNodeProps["parent"] = 1] = "parent";
        VNodeProps[VNodeProps["previousSibling"] = 2] = "previousSibling";
        VNodeProps[VNodeProps["nextSibling"] = 3] = "nextSibling";
    })(VNodeProps || (VNodeProps = {}));
    var ElementVNodeProps;
    (function (ElementVNodeProps) {
        ElementVNodeProps[ElementVNodeProps["firstChild"] = 4] = "firstChild";
        ElementVNodeProps[ElementVNodeProps["lastChild"] = 5] = "lastChild";
        ElementVNodeProps[ElementVNodeProps["element"] = 6] = "element";
        ElementVNodeProps[ElementVNodeProps["elementName"] = 7] = "elementName";
        ElementVNodeProps[ElementVNodeProps["PROPS_OFFSET"] = 8] = "PROPS_OFFSET";
    })(ElementVNodeProps || (ElementVNodeProps = {}));
    var TextVNodeProps;
    (function (TextVNodeProps) {
        TextVNodeProps[TextVNodeProps["node"] = 4] = "node";
        TextVNodeProps[TextVNodeProps["text"] = 5] = "text";
    })(TextVNodeProps || (TextVNodeProps = {}));
    var VirtualVNodeProps;
    (function (VirtualVNodeProps) {
        VirtualVNodeProps[VirtualVNodeProps["firstChild"] = 4] = "firstChild";
        VirtualVNodeProps[VirtualVNodeProps["lastChild"] = 5] = "lastChild";
        VirtualVNodeProps[VirtualVNodeProps["PROPS_OFFSET"] = 6] = "PROPS_OFFSET";
    })(VirtualVNodeProps || (VirtualVNodeProps = {}));

    const isForeignObjectElement = (elementName) => elementName.toLowerCase() === 'foreignobject';
    const isSvgElement = (elementName) => elementName === 'svg' || isForeignObjectElement(elementName);
    const isMathElement = (elementName) => elementName === 'math';
    const vnode_isDefaultNamespace = (vnode) => {
        const flags = vnode[VNodeProps.flags];
        return (flags & VNodeFlags.NAMESPACE_MASK) === 0;
    };
    const vnode_getElementNamespaceFlags = (elementName) => {
        if (isSvgElement(elementName)) {
            return VNodeFlags.NS_svg;
        }
        else if (isMathElement(elementName)) {
            return VNodeFlags.NS_math;
        }
        else {
            return VNodeFlags.NS_html;
        }
    };
    function vnode_getDomChildrenWithCorrectNamespacesToInsert(journal, domParentVNode, newChild) {
        const { elementNamespace, elementNamespaceFlag } = getNewElementNamespaceData(domParentVNode, newChild);
        let domChildren = [];
        if (elementNamespace === HTML_NS) {
            // parent is in the default namespace, so just get the dom children. This is the fast path.
            domChildren = vnode_getDOMChildNodes(journal, newChild);
        }
        else {
            // parent is in a different namespace, so we need to clone the children with the correct namespace.
            // The namespace cannot be changed on nodes, so we need to clone these nodes
            const children = vnode_getDOMChildNodes(journal, newChild, true);
            for (let i = 0; i < children.length; i++) {
                const childVNode = children[i];
                if (vnode_isTextVNode(childVNode)) {
                    // text nodes are always in the default namespace
                    domChildren.push(childVNode[TextVNodeProps.node]);
                    continue;
                }
                if ((childVNode[VNodeProps.flags] & VNodeFlags.NAMESPACE_MASK) ===
                    (domParentVNode[VNodeProps.flags] & VNodeFlags.NAMESPACE_MASK)) {
                    // if the child and parent have the same namespace, we don't need to clone the element
                    domChildren.push(childVNode[ElementVNodeProps.element]);
                    continue;
                }
                // clone the element with the correct namespace
                const newChildElement = vnode_cloneElementWithNamespace(childVNode, domParentVNode, elementNamespace, elementNamespaceFlag);
                if (newChildElement) {
                    domChildren.push(newChildElement);
                }
            }
        }
        return domChildren;
    }
    /** This function clones an element with a different namespace, but without the children. */
    function cloneElementWithNamespace(element, elementName, namespace) {
        const newElement = element.ownerDocument.createElementNS(namespace, elementName);
        const attributes = element.attributes;
        for (const attribute of attributes) {
            const name = attribute.name;
            const value = attribute.value;
            if (!name || name === Q_PROPS_SEPARATOR) {
                continue;
            }
            newElement.setAttribute(name, value);
        }
        return newElement;
    }
    /**
     * This function clones an ElementVNode with a different namespace, including the children. This
     * traverse the tree using depth-first search and clones the elements using
     * `cloneElementWithNamespace`.
     */
    function vnode_cloneElementWithNamespace(elementVNode, parentVNode, namespace, namespaceFlag) {
        ensureElementVNode(elementVNode);
        let vCursor = elementVNode;
        let vParent = null;
        let rootElement = null;
        let parentElement = null;
        while (vCursor) {
            let childElement = null;
            let newChildElement = null;
            if (vnode_isElementVNode(vCursor)) {
                // Clone the element
                childElement = vCursor[ElementVNodeProps.element];
                const childElementTag = vnode_getElementName(vCursor);
                // We need to check if the parent is a foreignObject element
                // and get a new namespace data.
                const vCursorParent = vnode_getParent(vCursor);
                // For the first vNode parentNode is not parent from vNode tree, but parent from DOM tree
                // this is because vNode is not moved yet.
                // rootElement is null only for the first vNode
                const vCursorDomParent = rootElement == null ? parentVNode : vCursorParent && vnode_getDomParentVNode(vCursorParent);
                if (vCursorDomParent) {
                    const namespaceData = getNewElementNamespaceData(vCursorDomParent, vnode_getElementName(vCursor));
                    namespace = namespaceData.elementNamespace;
                    namespaceFlag = namespaceData.elementNamespaceFlag;
                }
                newChildElement = cloneElementWithNamespace(childElement, childElementTag, namespace);
                childElement.remove();
                if (rootElement == null) {
                    rootElement = newChildElement;
                }
                if (parentElement) {
                    parentElement.appendChild(newChildElement);
                }
                // Descend into children
                // We need first get the first child, if any
                const vFirstChild = vnode_getFirstChild(vCursor);
                // Then we can overwrite the cursor with newly created element.
                // This is because we need to materialize the children before we assign new element
                vCursor[ElementVNodeProps.element] = newChildElement;
                // Set correct namespace flag
                vCursor[VNodeProps.flags] &= VNodeFlags.NEGATED_NAMESPACE_MASK;
                vCursor[VNodeProps.flags] |= namespaceFlag;
                if (vFirstChild) {
                    vCursor = vFirstChild;
                    parentElement = newChildElement;
                    continue;
                }
                else if (shouldIgnoreChildren(childElement)) {
                    // If we should ignore children of the element this means that the element is a container
                    // We need to get the first child of the container
                    const container = getDomContainerFromQContainerElement(childElement);
                    if (container) {
                        const innerContainerFirstVNode = vnode_getFirstChild(container.rootVNode);
                        if (innerContainerFirstVNode) {
                            vCursor = innerContainerFirstVNode;
                            parentElement = newChildElement;
                            continue;
                        }
                    }
                }
            }
            if (vCursor === elementVNode) {
                // we are where we started, this means that vNode has no children, so we are done.
                return rootElement;
            }
            // Out of children, go to next sibling
            const vNextSibling = vnode_getNextSibling(vCursor);
            if (vNextSibling) {
                vCursor = vNextSibling;
                continue;
            }
            // Out of siblings, go to parent
            vParent = vnode_getParent(vCursor);
            while (vParent) {
                if (vParent === elementVNode) {
                    // We are back where we started, we are done.
                    return rootElement;
                }
                const vNextParentSibling = vnode_getNextSibling(vParent);
                if (vNextParentSibling) {
                    vCursor = vNextParentSibling;
                    return rootElement;
                }
                vParent = vnode_getParent(vParent);
            }
            if (vParent == null) {
                // We are done.
                return rootElement;
            }
        }
        return rootElement;
    }
    function isSvg(tagOrVNode) {
        return typeof tagOrVNode === 'string'
            ? isSvgElement(tagOrVNode)
            : (tagOrVNode[VNodeProps.flags] & VNodeFlags.NS_svg) !== 0;
    }
    function isMath(tagOrVNode) {
        return typeof tagOrVNode === 'string'
            ? isMathElement(tagOrVNode)
            : (tagOrVNode[VNodeProps.flags] & VNodeFlags.NS_math) !== 0;
    }
    function getNewElementNamespaceData(domParentVNode, tagOrVNode) {
        const parentIsDefaultNamespace = domParentVNode
            ? !!vnode_getElementName(domParentVNode) && vnode_isDefaultNamespace(domParentVNode)
            : true;
        const parentIsForeignObject = !parentIsDefaultNamespace
            ? isForeignObjectElement(vnode_getElementName(domParentVNode))
            : false;
        let elementNamespace = HTML_NS;
        let elementNamespaceFlag = VNodeFlags.NS_html;
        const isElementVNodeOrString = typeof tagOrVNode === 'string' || vnode_isElementVNode(tagOrVNode);
        if (isElementVNodeOrString && isSvg(tagOrVNode)) {
            elementNamespace = SVG_NS;
            elementNamespaceFlag = VNodeFlags.NS_svg;
        }
        else if (isElementVNodeOrString && isMath(tagOrVNode)) {
            elementNamespace = MATH_NS;
            elementNamespaceFlag = VNodeFlags.NS_math;
        }
        else if (domParentVNode && !parentIsForeignObject && !parentIsDefaultNamespace) {
            const isParentSvg = (domParentVNode[VNodeProps.flags] & VNodeFlags.NS_svg) !== 0;
            const isParentMath = (domParentVNode[VNodeProps.flags] & VNodeFlags.NS_math) !== 0;
            elementNamespace = isParentSvg ? SVG_NS : isParentMath ? MATH_NS : HTML_NS;
            elementNamespaceFlag = domParentVNode[VNodeProps.flags] & VNodeFlags.NAMESPACE_MASK;
        }
        return {
            elementNamespace,
            elementNamespaceFlag,
        };
    }

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
        const prefix = eventType !== undefined ? eventType + ':' : '';
        const map = (name) => prefix + 'on' + name.charAt(0).toUpperCase() + name.substring(1) + '$';
        const res = Array.isArray(event) ? event.map(map) : map(event);
        return res;
    };
    const _useOn = (eventName, eventQrl) => {
        const { isAdded, addEvent } = useOnEventsSequentialScope();
        if (isAdded) {
            return;
        }
        if (eventQrl) {
            Array.isArray(eventName)
                ? eventName.forEach((event) => addEvent(event, eventQrl))
                : addEvent(eventName, eventQrl);
        }
    };
    /**
     * This hook is like the `useSequentialScope` but it is specifically for `useOn`. This is needed
     * because we want to execute the `useOn` hooks only once and store the event listeners on the host
     * element. From Qwik V2 the component is rerunning when the promise is thrown, so we need to make
     * sure that the event listeners are not added multiple times.
     *
     * - The event listeners are stored in the `USE_ON_LOCAL` property.
     * - The `USE_ON_LOCAL_SEQ_IDX` is used to keep track of the index of the hook that calls this.
     * - The `USE_ON_LOCAL_FLAGS` is used to keep track of whether the event listener has been added or
     *   not.
     */
    const useOnEventsSequentialScope = () => {
        const iCtx = useInvokeContext();
        const hostElement = iCtx.$hostElement$;
        const host = hostElement;
        let onMap = iCtx.$container$.getHostProp(host, USE_ON_LOCAL);
        if (onMap === null) {
            onMap = {};
            iCtx.$container$.setHostProp(host, USE_ON_LOCAL, onMap);
        }
        let seqIdx = iCtx.$container$.getHostProp(host, USE_ON_LOCAL_SEQ_IDX);
        if (seqIdx === null) {
            seqIdx = 0;
        }
        iCtx.$container$.setHostProp(host, USE_ON_LOCAL_SEQ_IDX, seqIdx + 1);
        let addedFlags = iCtx.$container$.getHostProp(host, USE_ON_LOCAL_FLAGS);
        if (addedFlags === null) {
            addedFlags = [];
            iCtx.$container$.setHostProp(host, USE_ON_LOCAL_FLAGS, addedFlags);
        }
        while (addedFlags.length <= seqIdx) {
            addedFlags.push(false);
        }
        const addEvent = (eventName, eventQrl) => {
            addedFlags[seqIdx] = true;
            let events = onMap[eventName];
            if (!events) {
                onMap[eventName] = events = [];
            }
            events.push(eventQrl);
        };
        return {
            isAdded: addedFlags[seqIdx],
            addEvent,
        };
    };

    /**
     * Use `executeComponent` to execute a component.
     *
     * Component execution can be complex because of:
     *
     * - It can by async
     * - It can contain many tasks which need to be awaited
     * - Each task can run multiple times if they track signals which change.
     * - The JSX may be re-generated multiple times of a task needs to be rerun due to signal change.
     * - It needs to keep track of hook state.
     *
     * For `component$`: `renderHost` === `subscriptionHost` For inlined-components: the
     * `subscriptionHost` is a parent `component$` which needs to re-execute.
     *
     * @param container
     * @param renderHost - VNode into which the component is rendered into.
     * @param subscriptionHost - VNode which will be re-executed if the component needs to re-render.
     * @param componentQRL
     * @param props
     * @returns
     */
    const executeComponent = (container, renderHost, subscriptionHost, componentQRL, props) => {
        const iCtx = newInvokeContext(container.$locale$, subscriptionHost, undefined, RenderEvent);
        iCtx.$effectSubscriber$ = [subscriptionHost, EffectProperty.COMPONENT];
        iCtx.$container$ = container;
        let componentFn;
        container.ensureProjectionResolved(renderHost);
        if (componentQRL === null) {
            componentQRL = componentQRL || container.getHostProp(renderHost, OnRenderProp);
            assertDefined(componentQRL, 'No Component found at this location');
        }
        if (isQrl(componentQRL)) {
            props = props || container.getHostProp(renderHost, ELEMENT_PROPS) || EMPTY_OBJ;
            if (props && props.children) {
                delete props.children;
            }
            componentFn = componentQRL.getFn(iCtx);
        }
        else if (isQwikComponent(componentQRL)) {
            const qComponentFn = componentQRL;
            componentFn = () => invokeApply(iCtx, qComponentFn, [props || EMPTY_OBJ, null, 0]);
        }
        else {
            const inlineComponent = componentQRL;
            componentFn = () => invokeApply(iCtx, inlineComponent, [props || EMPTY_OBJ]);
        }
        const executeComponentWithPromiseExceptionRetry = () => safeCall(() => {
            container.setHostProp(renderHost, ELEMENT_SEQ_IDX, null);
            container.setHostProp(renderHost, USE_ON_LOCAL_SEQ_IDX, null);
            container.setHostProp(renderHost, ELEMENT_PROPS, props);
            if (vnode_isVNode(renderHost)) {
                clearVNodeEffectDependencies(renderHost);
            }
            return componentFn(props);
        }, (jsx) => {
            const useOnEvents = container.getHostProp(renderHost, USE_ON_LOCAL);
            if (useOnEvents) {
                return maybeThen(addUseOnEvents(jsx, useOnEvents), () => jsx);
            }
            return jsx;
        }, (err) => {
            if (isPromise(err)) {
                return err.then(executeComponentWithPromiseExceptionRetry);
            }
            else {
                throw err;
            }
        });
        return executeComponentWithPromiseExceptionRetry();
    };
    /**
     * Stores the JSX output of the last execution of the component.
     *
     * Component can execute multiple times because:
     *
     * - Component can have multiple tasks
     * - Tasks can track signals
     * - Task A can change signal which causes Task B to rerun.
     *
     * So when executing a component we only care about its last JSX Output.
     */
    function addUseOnEvents(jsx, useOnEvents) {
        const jsxElement = findFirstStringJSX(jsx);
        return maybeThen(jsxElement, (jsxElement) => {
            let isInvisibleComponent = false;
            if (!jsxElement) {
                /**
                 * We did not find any jsx node with a string tag. This means that we should append:
                 *
                 * ```html
                 * <script type="placeholder" hidden on-document:qinit="..."></script>
                 * ```
                 *
                 * This is needed because use on events should have a node to attach them to.
                 */
                isInvisibleComponent = true;
            }
            for (const key in useOnEvents) {
                if (Object.prototype.hasOwnProperty.call(useOnEvents, key)) {
                    if (isInvisibleComponent) {
                        if (key === 'onQvisible$') {
                            jsxElement = addScriptNodeForInvisibleComponents(jsx);
                            if (jsxElement) {
                                addUseOnEvent(jsxElement, 'document:onQinit$', useOnEvents[key]);
                            }
                        }
                        else if (key.startsWith('document:') || key.startsWith('window:')) {
                            jsxElement = addScriptNodeForInvisibleComponents(jsx);
                            if (jsxElement) {
                                addUseOnEvent(jsxElement, key, useOnEvents[key]);
                            }
                        }
                        else if (build.isDev) {
                            logWarn('You are trying to add an event "' +
                                key +
                                '" using `useOn` hook, ' +
                                'but a node to which you can add an event is not found. ' +
                                'Please make sure that the component has a valid element node. ');
                        }
                    }
                    else if (jsxElement) {
                        addUseOnEvent(jsxElement, key, useOnEvents[key]);
                    }
                }
            }
            return jsxElement;
        });
    }
    function addUseOnEvent(jsxElement, key, value) {
        let props = jsxElement.props;
        if (props === EMPTY_OBJ) {
            props = jsxElement.props = {};
        }
        let propValue = props[key];
        if (propValue === undefined) {
            propValue = [];
        }
        else if (!Array.isArray(propValue)) {
            propValue = [propValue];
        }
        propValue.push(...value);
        props[key] = propValue;
    }
    function findFirstStringJSX(jsx) {
        const queue = [jsx];
        while (queue.length) {
            const jsx = queue.shift();
            if (isJSXNode(jsx)) {
                if (typeof jsx.type === 'string') {
                    return jsx;
                }
                queue.push(jsx.children);
            }
            else if (Array.isArray(jsx)) {
                queue.push(...jsx);
            }
            else if (isPromise(jsx)) {
                return maybeThen(jsx, (jsx) => findFirstStringJSX(jsx));
            }
            else if (isSignal(jsx)) {
                return findFirstStringJSX(untrack(() => jsx.value));
            }
        }
        return null;
    }
    function addScriptNodeForInvisibleComponents(jsx) {
        if (isJSXNode(jsx)) {
            const jsxElement = new JSXNodeImpl('script', {}, {
                type: 'placeholder',
                hidden: '',
            }, null, 3);
            if (jsx.children == null) {
                jsx.children = jsxElement;
            }
            else if (Array.isArray(jsx.children)) {
                jsx.children.push(jsxElement);
            }
            else {
                jsx.children = [jsx.children, jsxElement];
            }
            return jsxElement;
        }
        else if (Array.isArray(jsx) && jsx.length) {
            // get first element
            return addScriptNodeForInvisibleComponents(jsx[0]);
        }
        return null;
    }

    function isSlotProp(prop) {
        return !prop.startsWith('q:') && !prop.startsWith(NON_SERIALIZABLE_MARKER_PREFIX);
    }
    function isParentSlotProp(prop) {
        return prop.startsWith(QSlotParent);
    }
    /** @internal */
    const _restProps = (props, omit, target = {}) => {
        for (const key in props) {
            if (!omit.includes(key)) {
                target[key] = props[key];
            }
        }
        return target;
    };

    function escapeHTML(html) {
        let escapedHTML = '';
        const length = html.length;
        let idx = 0;
        let lastIdx = idx;
        for (; idx < length; idx++) {
            // We get the charCode NOT string. String would allocate memory.
            const ch = html.charCodeAt(idx);
            // Every time we concat a string we allocate memory. We want to minimize that.
            if (ch === 60 /* < */) {
                escapedHTML += html.substring(lastIdx, idx) + '&lt;';
            }
            else if (ch === 62 /* > */) {
                escapedHTML += html.substring(lastIdx, idx) + '&gt;';
            }
            else if (ch === 38 /* & */) {
                escapedHTML += html.substring(lastIdx, idx) + '&amp;';
            }
            else if (ch === 34 /* " */) {
                escapedHTML += html.substring(lastIdx, idx) + '&quot;';
            }
            else if (ch === 39 /* ' */) {
                escapedHTML += html.substring(lastIdx, idx) + '&#39;';
            }
            else {
                continue;
            }
            lastIdx = idx + 1;
        }
        if (lastIdx === 0) {
            // This is most common case, just return previous string no memory allocation.
            return html;
        }
        else {
            // Add the tail of replacement.
            return escapedHTML + html.substring(lastIdx);
        }
    }

    const vnode_diff = (container, jsxNode, vStartNode, scopedStyleIdPrefix) => {
        let journal = container.$journal$;
        /**
         * Stack is used to keep track of the state of the traversal.
         *
         * We push current state into the stack before descending into the child, and we pop the state
         * when we are done with the child.
         */
        const stack = [];
        const asyncQueue = [];
        ////////////////////////////////
        //// Traverse state variables
        ////////////////////////////////
        let vParent = null;
        /// Current node we compare against. (Think of it as a cursor.)
        /// (Node can be null, if we are at the end of the list.)
        let vCurrent = null;
        /// When we insert new node we start it here so that we can descend into it.
        /// NOTE: it can't be stored in `vCurrent` because `vNewCurrent` is in journal
        /// and is not connected to the tree.
        let vNewNode = null; // TODO: delete, because journal is on vNode, the above comment no longer applies
        /// When elements have keys they can be consumed out of order and therefore we can't use nextSibling.
        /// In such a case this array will contain the elements after the current location.
        /// The array even indices will contains keys and odd indices the vNode.
        let vSiblings = null; // See: `SiblingsArray`
        let vSiblingsIdx = -1;
        /// Current set of JSX children.
        let jsxChildren = null;
        // Current JSX child.
        let jsxValue = null;
        let jsxIdx = 0;
        let jsxCount = 0;
        // When we descend into children, we need to skip advance() because we just descended.
        let shouldAdvance = true;
        /**
         * When we are rendering inside a projection we don't want to process child components. Child
         * components will be processed only if the projection is re-projected with a `<Slot>`.
         *
         * Example: <Parent> <div> <Child/> </div> </Parent>
         *
         * In the above example, the `Child` component will not be processed because it is inside a
         * projection. Only if the `<Parent>` projects its content with `<Slot>` will the `Child`
         * component be processed.
         */
        // let inContentProjection = false;
        ////////////////////////////////
        diff(jsxNode, vStartNode);
        return drainAsyncQueue();
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        function diff(jsxNode, vStartNode) {
            assertFalse(vnode_isVNode(jsxNode), 'JSXNode should not be a VNode');
            assertTrue(vnode_isVNode(vStartNode), 'vStartNode should be a VNode');
            vParent = vStartNode;
            vNewNode = null;
            vCurrent = vnode_getFirstChild(vStartNode);
            stackPush(jsxNode, true);
            while (stack.length) {
                while (jsxIdx < jsxCount) {
                    assertFalse(vParent === vCurrent, "Parent and current can't be the same");
                    if (typeof jsxValue === 'string') {
                        expectText(jsxValue);
                    }
                    else if (typeof jsxValue === 'number') {
                        expectText(String(jsxValue));
                    }
                    else if (jsxValue && typeof jsxValue === 'object') {
                        if (Array.isArray(jsxValue)) {
                            descend(jsxValue, false);
                        }
                        else if (isSignal(jsxValue)) {
                            if (vCurrent) {
                                clearVNodeEffectDependencies(vCurrent);
                            }
                            expectVirtual(VirtualType.WrappedSignal, null);
                            descend(trackSignal(() => jsxValue.value, (vNewNode || vCurrent), EffectProperty.VNODE, container), true);
                        }
                        else if (isPromise(jsxValue)) {
                            expectVirtual(VirtualType.Awaited, null);
                            asyncQueue.push(jsxValue, vNewNode || vCurrent);
                        }
                        else if (isJSXNode(jsxValue)) {
                            const type = jsxValue.type;
                            if (typeof type === 'string') {
                                expectNoMoreTextNodes();
                                expectElement(jsxValue, type);
                                descend(jsxValue.children, true);
                            }
                            else if (typeof type === 'function') {
                                if (type === Fragment) {
                                    expectNoMoreTextNodes();
                                    expectVirtual(VirtualType.Fragment, jsxValue.key);
                                    descend(jsxValue.children, true);
                                }
                                else if (type === Slot) {
                                    expectNoMoreTextNodes();
                                    if (!expectSlot()) {
                                        // nothing to project, so try to render the Slot default content.
                                        descend(jsxValue.children, true);
                                    }
                                }
                                else if (type === Projection) {
                                    expectProjection();
                                    descend(jsxValue.children, true);
                                }
                                else if (type === SSRComment) {
                                    expectNoMore();
                                }
                                else if (type === SSRRaw) {
                                    expectNoMore();
                                }
                                else {
                                    // Must be a component
                                    expectNoMoreTextNodes();
                                    expectComponent(type);
                                }
                            }
                        }
                    }
                    else if (jsxValue === SkipRender) {
                        // do nothing, we are skipping this node
                        journal = [];
                    }
                    else {
                        expectText('');
                    }
                    advance();
                }
                expectNoMore();
                ascend();
            }
        }
        function advance() {
            if (!shouldAdvance) {
                shouldAdvance = true;
                return;
            }
            jsxIdx++;
            if (jsxIdx < jsxCount) {
                jsxValue = jsxChildren[jsxIdx];
            }
            else if (stack[stack.length - 1] === false) {
                // this was special `descendVNode === false` so pop and try again
                return ascend();
            }
            if (vNewNode !== null) {
                // We have a new Node.
                // This means that the `vCurrent` was deemed not useful and we inserted in front of it.
                // This means that the next node we should look at is the `vCurrent` so just clear the
                // vNewNode  and try again.
                vNewNode = null;
            }
            else {
                advanceToNextSibling();
            }
        }
        /**
         * Advance the `vCurrent` to the next sibling.
         *
         * Normally this is just `vCurrent = vnode_getNextSibling(vCurrent)`. However, this gets
         * complicated if `retrieveChildWithKey` was called, because then we are consuming nodes out of
         * order and can't rely on `vnode_getNextSibling` and instead we need to go by `vSiblings`.
         */
        function peekNextSibling() {
            if (vSiblings !== null) {
                // We came across a key, and we moved nodes around. This means we can no longer use
                // `vnode_getNextSibling` to look at next node and instead we have to go by `vSiblings`.
                const idx = vSiblingsIdx + SiblingsArray.NextVNode;
                return idx < vSiblings.length ? vSiblings[idx] : null;
            }
            else {
                // If we don't have a `vNewNode`, than that means we just reconciled the current node.
                // So advance it.
                return vCurrent ? vnode_getNextSibling(vCurrent) : null;
            }
        }
        /**
         * Advance the `vCurrent` to the next sibling.
         *
         * Normally this is just `vCurrent = vnode_getNextSibling(vCurrent)`. However, this gets
         * complicated if `retrieveChildWithKey` was called, because then we are consuming nodes out of
         * order and can't rely on `vnode_getNextSibling` and instead we need to go by `vSiblings`.
         */
        function advanceToNextSibling() {
            vCurrent = peekNextSibling();
            if (vSiblings !== null) {
                vSiblingsIdx += SiblingsArray.Size; // advance;
            }
        }
        /**
         * @param children
         * @param descendVNode - If true we are descending into vNode; This is set to false if we come
         *   across an array in jsx, and we need to descend into the array without actually descending
         *   into the vNode.
         *
         *   Example:
         *
         *   ```
         *   <>
         *   before
         *   {[1,2].map((i) => <span>{i}</span>)}
         *   after
         *   </>
         * ```
         *
         *   In the above example all nodes are on same level so we don't `descendVNode` even thought there
         *   is an array produced by the `map` function.
         */
        function descend(children, descendVNode) {
            if (children == null) {
                expectNoChildren();
                return;
            }
            stackPush(children, descendVNode);
            if (descendVNode) {
                assertDefined(vCurrent || vNewNode, 'Expecting vCurrent to be defined.');
                vSiblings = null;
                vSiblingsIdx = -1;
                vParent = vNewNode || vCurrent;
                vCurrent = vnode_getFirstChild(vParent);
                vNewNode = null;
            }
            shouldAdvance = false;
        }
        function ascend() {
            const descendVNode = stack.pop(); // boolean: descendVNode
            if (descendVNode) {
                vSiblingsIdx = stack.pop();
                vSiblings = stack.pop();
                vNewNode = stack.pop();
                vCurrent = stack.pop();
                vParent = stack.pop();
            }
            jsxValue = stack.pop();
            jsxCount = stack.pop();
            jsxIdx = stack.pop();
            jsxChildren = stack.pop();
            advance();
        }
        function stackPush(children, descendVNode) {
            stack.push(jsxChildren, jsxIdx, jsxCount, jsxValue);
            if (descendVNode) {
                stack.push(vParent, vCurrent, vNewNode, vSiblings, vSiblingsIdx);
            }
            stack.push(descendVNode);
            if (Array.isArray(children)) {
                jsxIdx = 0;
                jsxCount = children.length;
                jsxChildren = children;
                jsxValue = jsxCount > 0 ? children[0] : null;
            }
            else if (children === undefined) {
                // no children
                jsxIdx = 0;
                jsxValue = null;
                jsxChildren = null;
                jsxCount = 0;
            }
            else {
                jsxIdx = 0;
                jsxValue = children;
                jsxChildren = null;
                jsxCount = 1;
            }
        }
        function getInsertBefore() {
            if (vNewNode) {
                return vCurrent;
            }
            else if (vSiblings !== null) {
                const nextIdx = vSiblingsIdx + SiblingsArray.NextVNode;
                return nextIdx < vSiblings.length ? vSiblings[nextIdx] : null;
            }
            else {
                return peekNextSibling();
            }
        }
        /////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        function descendContentToProject(children, host) {
            if (!Array.isArray(children)) {
                children = [children];
            }
            if (children.length) {
                const createProjectionJSXNode = (slotName) => {
                    return new JSXNodeImpl(Projection, EMPTY_OBJ, null, [], 0, slotName);
                };
                const projections = [];
                if (host) {
                    // we need to create empty projections for all the slots to remove unused slots content
                    for (let i = vnode_getPropStartIndex(host); i < host.length; i = i + 2) {
                        const prop = host[i];
                        if (isSlotProp(prop)) {
                            const slotName = prop;
                            projections.push(slotName);
                            projections.push(createProjectionJSXNode(slotName));
                        }
                    }
                }
                /// STEP 1: Bucketize the children based on the projection name.
                for (let i = 0; i < children.length; i++) {
                    const child = children[i];
                    const slotName = String((isJSXNode(child) && directGetPropsProxyProp(child, QSlot)) || QDefaultSlot);
                    const idx = mapApp_findIndx(projections, slotName, 0);
                    let jsxBucket;
                    if (idx >= 0) {
                        jsxBucket = projections[idx + 1];
                    }
                    else {
                        projections.splice(~idx, 0, slotName, (jsxBucket = createProjectionJSXNode(slotName)));
                    }
                    const removeProjection = child === false;
                    if (!removeProjection) {
                        jsxBucket.children.push(child);
                    }
                }
                /// STEP 2: remove the names
                for (let i = projections.length - 2; i >= 0; i = i - 2) {
                    projections.splice(i, 1);
                }
                descend(projections, true);
            }
        }
        function expectProjection() {
            const slotName = jsxValue.key;
            // console.log('expectProjection', JSON.stringify(slotName));
            vCurrent = vnode_getProp(vParent, // The parent is the component and it should have our portal.
            slotName, (id) => vnode_locate(container.rootVNode, id));
            if (vCurrent == null) {
                vNewNode = vnode_newVirtual();
                // you may be tempted to add the projection into the current parent, but
                // that is wrong. We don't yet know if the projection will be projected, so
                // we should leave it unattached.
                // vNewNode[VNodeProps.parent] = vParent;
                build.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, VirtualType.Projection);
                build.isDev && vnode_setProp(vNewNode, 'q:code', 'expectProjection');
                vnode_setProp(vNewNode, QSlot, slotName);
                vnode_setProp(vNewNode, QSlotParent, vParent);
                vnode_setProp(vParent, slotName, vNewNode);
            }
        }
        function expectSlot() {
            const vHost = vnode_getProjectionParentComponent(vParent, container.rootVNode);
            const slotNameKey = getSlotNameKey(vHost);
            // console.log('expectSlot', JSON.stringify(slotNameKey));
            const vProjectedNode = vHost
                ? vnode_getProp(vHost, slotNameKey, 
                // for slots this id is vnode ref id
                null // Projections should have been resolved through container.ensureProjectionResolved
                //(id) => vnode_locate(container.rootVNode, id)
                )
                : null;
            // console.log('   ', String(vHost), String(vProjectedNode));
            if (vProjectedNode == null) {
                // Nothing to project, so render content of the slot.
                vnode_insertBefore(journal, vParent, (vNewNode = vnode_newVirtual()), vCurrent && getInsertBefore());
                vnode_setProp(vNewNode, QSlot, slotNameKey);
                vHost && vnode_setProp(vHost, slotNameKey, vNewNode);
                build.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, VirtualType.Projection);
                build.isDev && vnode_setProp(vNewNode, 'q:code', 'expectSlot' + count++);
                return false;
            }
            else if (vProjectedNode === vCurrent) ;
            else {
                // move from q:template to the target node
                vnode_insertBefore(journal, vParent, (vNewNode = vProjectedNode), vCurrent && getInsertBefore());
                vnode_setProp(vNewNode, QSlot, slotNameKey);
                vHost && vnode_setProp(vHost, slotNameKey, vNewNode);
                build.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, VirtualType.Projection);
                build.isDev && vnode_setProp(vNewNode, 'q:code', 'expectSlot' + count++);
            }
            return true;
        }
        function getSlotNameKey(vHost) {
            const constProps = jsxValue.constProps;
            if (constProps && typeof constProps == 'object' && 'name' in constProps) {
                const constValue = constProps.name;
                if (vHost && constValue instanceof WrappedSignal) {
                    return trackSignal(() => constValue.value, vHost, EffectProperty.COMPONENT, container);
                }
            }
            return directGetPropsProxyProp(jsxValue, 'name') || QDefaultSlot;
        }
        function drainAsyncQueue() {
            while (asyncQueue.length) {
                const jsxNode = asyncQueue.shift();
                const vHostNode = asyncQueue.shift();
                if (isPromise(jsxNode)) {
                    return jsxNode.then((jsxNode) => {
                        diff(jsxNode, vHostNode);
                        return drainAsyncQueue();
                    });
                }
                else {
                    diff(jsxNode, vHostNode);
                }
            }
        }
        function expectNoChildren() {
            const vFirstChild = vCurrent && vnode_getFirstChild(vCurrent);
            if (vFirstChild !== null) {
                let vChild = vFirstChild;
                while (vChild) {
                    cleanup(container, vChild);
                    vChild = vnode_getNextSibling(vChild);
                }
                vnode_truncate(journal, vCurrent, vFirstChild);
            }
        }
        /** Expect no more nodes - Any nodes which are still at cursor, need to be removed. */
        function expectNoMore() {
            assertFalse(vParent === vCurrent, "Parent and current can't be the same");
            if (vCurrent !== null) {
                while (vCurrent) {
                    const toRemove = vCurrent;
                    advanceToNextSibling();
                    cleanup(container, toRemove);
                    if (vParent === vnode_getParent(toRemove)) {
                        // If we are diffing projection than the parent is not the parent of the node.
                        // If that is the case we don't want to remove the node from the parent.
                        vnode_remove(journal, vParent, toRemove, true);
                    }
                }
            }
        }
        function expectNoMoreTextNodes() {
            while (vCurrent !== null && vnode_isTextVNode(vCurrent)) {
                cleanup(container, vCurrent);
                const toRemove = vCurrent;
                advanceToNextSibling();
                vnode_remove(journal, vParent, toRemove, true);
            }
        }
        /**
         * Returns whether `qDispatchEvent` needs patching. This is true when one of the `jsx` argument's
         * const props has the name of an event.
         *
         * @returns {boolean}
         */
        function createNewElement(jsx, elementName) {
            const element = createElementWithNamespace(elementName);
            const { constProps } = jsx;
            let needsQDispatchEventPatch = false;
            if (constProps) {
                // Const props are, well, constant, they will never change!
                // For this reason we can cheat and write them directly into the DOM.
                // We never tell the vNode about them saving us time and memory.
                for (const key in constProps) {
                    let value = constProps[key];
                    if (isJsxPropertyAnEventName(key)) {
                        // So for event handlers we must add them to the vNode so that qwikloader can look them up
                        // But we need to mark them so that they don't get pulled into the diff.
                        const eventName = getEventNameFromJsxProp(key);
                        const scope = getEventNameScopeFromJsxProp(key);
                        vnode_setProp(vNewNode, HANDLER_PREFIX + ':' + scope + ':' + eventName, value);
                        if (eventName) {
                            registerQwikLoaderEvent(eventName);
                        }
                        needsQDispatchEventPatch = true;
                        continue;
                    }
                    if (key === 'ref') {
                        if (isSignal(value)) {
                            value.value = element;
                            continue;
                        }
                        else if (typeof value === 'function') {
                            value(element);
                            continue;
                        }
                    }
                    if (isSignal(value)) {
                        const signalData = new EffectData({
                            $scopedStyleIdPrefix$: scopedStyleIdPrefix,
                            $isConst$: true,
                        });
                        value = trackSignal(() => value.value, vNewNode, key, container, signalData);
                    }
                    if (key === dangerouslySetInnerHTML) {
                        element.innerHTML = value;
                        element.setAttribute(QContainerAttr, QContainerValue.HTML);
                        continue;
                    }
                    if (elementName === 'textarea' && key === 'value') {
                        if (typeof value !== 'string') {
                            if (build.isDev) {
                                throwErrorAndStop('The value of the textarea must be a string');
                            }
                            continue;
                        }
                        element.value = escapeHTML(value);
                        continue;
                    }
                    value = serializeAttribute(key, value, scopedStyleIdPrefix);
                    if (value != null) {
                        element.setAttribute(key, String(value));
                    }
                }
            }
            const key = jsx.key;
            if (key) {
                element.setAttribute(ELEMENT_KEY, key);
                vnode_setProp(vNewNode, ELEMENT_KEY, key);
            }
            // append class attribute if styleScopedId exists and there is no class attribute
            const classAttributeExists = hasClassAttr(jsx.varProps) || (jsx.constProps && hasClassAttr(jsx.constProps));
            if (!classAttributeExists && scopedStyleIdPrefix) {
                element.setAttribute('class', scopedStyleIdPrefix);
            }
            vnode_insertBefore(journal, vParent, vNewNode, vCurrent);
            return needsQDispatchEventPatch;
        }
        function createElementWithNamespace(elementName) {
            const domParentVNode = vnode_getDomParentVNode(vParent);
            const { elementNamespace, elementNamespaceFlag } = getNewElementNamespaceData(domParentVNode, elementName);
            const element = container.document.createElementNS(elementNamespace, elementName);
            vNewNode = vnode_newElement(element, elementName);
            vNewNode[VNodeProps.flags] |= elementNamespaceFlag;
            return element;
        }
        function expectElement(jsx, elementName) {
            const isSameElementName = vCurrent && vnode_isElementVNode(vCurrent) && elementName === vnode_getElementName(vCurrent);
            const jsxKey = jsx.key;
            let needsQDispatchEventPatch = false;
            if (!isSameElementName || jsxKey !== getKey(vCurrent)) {
                // So we have a key and it does not match the current node.
                // We need to do a forward search to find it.
                // The complication is that once we start taking nodes out of order we can't use `vnode_getNextSibling`
                vNewNode = retrieveChildWithKey(elementName, jsxKey);
                if (vNewNode === null) {
                    // No existing node with key exists, just create a new one.
                    needsQDispatchEventPatch = createNewElement(jsx, elementName);
                }
                else {
                    // Existing keyed node
                    vnode_insertBefore(journal, vParent, vNewNode, vCurrent);
                }
            }
            // reconcile attributes
            const jsxAttrs = [];
            const props = jsx.varProps;
            for (const key in props) {
                let value = props[key];
                value = serializeAttribute(key, value, scopedStyleIdPrefix);
                if (value != null) {
                    mapArray_set(jsxAttrs, key, value, 0);
                }
            }
            if (jsxKey !== null) {
                mapArray_set(jsxAttrs, ELEMENT_KEY, jsxKey, 0);
            }
            const vNode = (vNewNode || vCurrent);
            needsQDispatchEventPatch = setBulkProps(vNode, jsxAttrs) || needsQDispatchEventPatch;
            if (needsQDispatchEventPatch) {
                // Event handler needs to be patched onto the element.
                const element = vnode_getNode(vNode);
                if (!element.qDispatchEvent) {
                    element.qDispatchEvent = (event, scope) => {
                        const eventName = event.type;
                        const eventProp = ':' + scope.substring(1) + ':' + eventName;
                        const qrls = [
                            vnode_getProp(vNode, eventProp, null),
                            vnode_getProp(vNode, HANDLER_PREFIX + eventProp, null),
                        ];
                        let returnValue = false;
                        qrls.flat(2).forEach((qrl) => {
                            if (qrl) {
                                const value = qrl(event, element);
                                returnValue = returnValue || value === true;
                            }
                        });
                        return returnValue;
                    };
                }
            }
        }
        /** @param tag Returns true if `qDispatchEvent` needs patching */
        function setBulkProps(vnode, srcAttrs) {
            vnode_ensureElementInflated(vnode);
            const dstAttrs = vnode;
            let srcIdx = 0;
            const srcLength = srcAttrs.length;
            let dstIdx = ElementVNodeProps.PROPS_OFFSET;
            let dstLength = dstAttrs.length;
            let srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
            let dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
            let patchEventDispatch = false;
            const record = (key, value) => {
                if (key.startsWith(':')) {
                    vnode_setProp(vnode, key, value);
                    return;
                }
                if (key === 'ref') {
                    const element = vnode_getNode(vnode);
                    if (isSignal(value)) {
                        value.value = element;
                        return;
                    }
                    else if (typeof value === 'function') {
                        value(element);
                        return;
                    }
                }
                if (isSignal(value)) {
                    value = untrack(() => value.value);
                }
                vnode_setAttr(journal, vnode, key, value);
                if (value === null) {
                    // if we set `null` than attribute was removed and we need to shorten the dstLength
                    dstLength = dstAttrs.length;
                }
            };
            const recordJsxEvent = (key, value) => {
                const eventName = getEventNameFromJsxProp(key);
                if (eventName) {
                    const scope = getEventNameScopeFromJsxProp(key);
                    record(':' + scope + ':' + eventName, value);
                }
                // add an event attr with empty value for qwikloader element selector.
                // We don't need value here. For ssr this value is a QRL,
                // but for CSR value should be just empty
                const htmlEvent = convertEventNameFromJsxPropToHtmlAttr(key);
                if (htmlEvent) {
                    record(htmlEvent, '');
                }
                // register an event for qwik loader
                if (eventName) {
                    registerQwikLoaderEvent(eventName);
                }
            };
            while (srcKey !== null || dstKey !== null) {
                if (dstKey?.startsWith(HANDLER_PREFIX) || dstKey == ELEMENT_KEY) {
                    // These are a special keys which we use to mark the event handlers as immutable or
                    // element key we need to ignore them.
                    dstIdx++; // skip the destination value, we don't care about it.
                    dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
                }
                else if (srcKey == null) {
                    // Source has more keys, so we need to remove them from destination
                    if (dstKey && isHtmlAttributeAnEventName(dstKey)) {
                        patchEventDispatch = true;
                        dstIdx++;
                    }
                    else {
                        record(dstKey, null);
                        dstIdx--;
                    }
                    dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
                }
                else if (dstKey == null) {
                    // Destination has more keys, so we need to insert them from source.
                    const isEvent = isJsxPropertyAnEventName(srcKey);
                    if (isEvent) {
                        // Special handling for events
                        patchEventDispatch = true;
                        recordJsxEvent(srcKey, srcAttrs[srcIdx]);
                    }
                    else {
                        record(srcKey, srcAttrs[srcIdx]);
                    }
                    srcIdx++;
                    srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
                }
                else if (srcKey == dstKey) {
                    const srcValue = srcAttrs[srcIdx++];
                    const dstValue = dstAttrs[dstIdx++];
                    if (srcValue !== dstValue) {
                        record(dstKey, srcValue);
                    }
                    srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
                    dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
                }
                else if (srcKey < dstKey) {
                    // Destination is missing the key, so we need to insert it.
                    if (isJsxPropertyAnEventName(srcKey)) {
                        // Special handling for events
                        patchEventDispatch = true;
                        recordJsxEvent(srcKey, srcAttrs[srcIdx]);
                    }
                    else {
                        record(srcKey, srcAttrs[srcIdx]);
                    }
                    srcIdx++;
                    // advance srcValue
                    srcKey = srcIdx < srcLength ? srcAttrs[srcIdx++] : null;
                    // we need to increment dstIdx too, because we added destination key and value to the VNode
                    // and dstAttrs is a reference to the VNode
                    dstIdx++;
                    dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
                }
                else {
                    // Source is missing the key, so we need to remove it from destination.
                    if (isHtmlAttributeAnEventName(dstKey)) {
                        patchEventDispatch = true;
                        dstIdx++;
                    }
                    else {
                        record(dstKey, null);
                        dstIdx--;
                    }
                    dstKey = dstIdx < dstLength ? dstAttrs[dstIdx++] : null;
                }
            }
            return patchEventDispatch;
        }
        function registerQwikLoaderEvent(eventName) {
            const window = container.document.defaultView;
            if (window) {
                (window.qwikevents || (window.qwikevents = [])).push(eventName);
            }
        }
        /**
         * Retrieve the child with the given key.
         *
         * By retrieving the child with the given key we are effectively removing it from the list of
         * future elements. This means that we can't just use `vnode_getNextSibling` to find the next
         * instead we have to keep track of the elements we have already seen.
         *
         * We call this materializing the elements.
         *
         * `vSiblingsIdx`:
         *
         * - -1: Not materialized
         * - Positive number - the index of the next element in the `vSiblings` array.
         *
         * By retrieving the child with the given key we are effectively removing it from the list (hence
         * we need to splice the `vSiblings` array).
         *
         * @param key
         * @returns Array where: (see: `SiblingsArray`)
         *
         *   - Idx%3 == 0 nodeName
         *   - Idx%3 == 1 key
         *   - Idx%3 == 2 vNode
         */
        function retrieveChildWithKey(nodeName, key) {
            let vNodeWithKey = null;
            if (vSiblingsIdx === -1) {
                // it is not materialized; so materialize it.
                vSiblings = [];
                vSiblingsIdx = 0;
                let vNode = vCurrent;
                while (vNode) {
                    const name = vnode_isElementVNode(vNode) ? vnode_getElementName(vNode) : null;
                    const vKey = getKey(vNode) || getComponentHash(vNode, container.$getObjectById$);
                    if (vNodeWithKey === null && vKey == key && name == nodeName) {
                        vNodeWithKey = vNode;
                    }
                    else {
                        // we only add the elements which we did not find yet.
                        vSiblings.push(name, vKey, vNode);
                    }
                    vNode = vnode_getNextSibling(vNode);
                }
            }
            else {
                for (let idx = vSiblingsIdx; idx < vSiblings.length; idx += SiblingsArray.Size) {
                    const name = vSiblings[idx + SiblingsArray.Name];
                    const vKey = vSiblings[idx + SiblingsArray.Key];
                    if (vKey === key && name === nodeName) {
                        vNodeWithKey = vSiblings[idx + SiblingsArray.VNode];
                        // remove the node from the siblings array
                        vSiblings?.splice(idx, SiblingsArray.Size);
                        break;
                    }
                }
            }
            return vNodeWithKey;
        }
        function expectVirtual(type, jsxKey) {
            if (vCurrent &&
                vnode_isVirtualVNode(vCurrent) &&
                vnode_getProp(vCurrent, ELEMENT_KEY, null) === jsxKey) {
                // All is good.
                return;
            }
            else if (jsxKey !== null) {
                // We have a key find it
                vNewNode = retrieveChildWithKey(null, jsxKey);
                if (vNewNode != null) {
                    // We found it, move it up.
                    vnode_insertBefore(journal, vParent, (vNewNode = vnode_newVirtual()), vCurrent && getInsertBefore());
                    return;
                }
            }
            // Did not find it, insert a new one.
            vnode_insertBefore(journal, vParent, (vNewNode = vnode_newVirtual()), vCurrent && getInsertBefore());
            vnode_setProp(vNewNode, ELEMENT_KEY, jsxKey);
            build.isDev && vnode_setProp((vNewNode || vCurrent), DEBUG_TYPE, type);
        }
        function expectComponent(component) {
            const componentMeta = component[SERIALIZABLE_STATE];
            let host = (vNewNode || vCurrent);
            if (componentMeta) {
                const jsxProps = jsxValue.props;
                // QComponent
                let shouldRender = false;
                const [componentQRL] = componentMeta;
                const componentHash = componentQRL.$hash$;
                const vNodeComponentHash = getComponentHash(host, container.$getObjectById$);
                const lookupKey = jsxValue.key || componentHash;
                const vNodeLookupKey = getKey(host) || vNodeComponentHash;
                const lookupKeysAreEqual = lookupKey === vNodeLookupKey;
                const hashesAreEqual = componentHash === vNodeComponentHash;
                if (!lookupKeysAreEqual) {
                    // See if we already have this component later on.
                    vNewNode = retrieveChildWithKey(null, lookupKey);
                    if (vNewNode) {
                        // We found the component, move it up.
                        vnode_insertBefore(journal, vParent, vNewNode, vCurrent);
                    }
                    else {
                        // We did not find the component, create it.
                        insertNewComponent(host, componentQRL, jsxProps);
                    }
                    host = vNewNode;
                    shouldRender = true;
                }
                else if (!hashesAreEqual) {
                    insertNewComponent(host, componentQRL, jsxProps);
                    if (vNewNode) {
                        if (host) {
                            // TODO(varixo): not sure why we need to copy flags here.
                            vNewNode[VNodeProps.flags] = host[VNodeProps.flags];
                        }
                        host = vNewNode;
                        shouldRender = true;
                    }
                }
                if (host) {
                    const vNodeProps = vnode_getProp(host, ELEMENT_PROPS, container.$getObjectById$);
                    shouldRender = shouldRender || propsDiffer(jsxProps, vNodeProps);
                    if (shouldRender) {
                        /**
                         * Mark host as not deleted. The host could have been marked as deleted if it there was a
                         * cleanup run. Now we found it and want to reuse it, so we need to mark it as not
                         * deleted.
                         */
                        host[VNodeProps.flags] &= ~VNodeFlags.Deleted;
                        container.$scheduler$(ChoreType.COMPONENT, host, componentQRL, jsxProps);
                    }
                }
                jsxValue.children != null && descendContentToProject(jsxValue.children, host);
            }
            else {
                const lookupKey = jsxValue.key;
                const vNodeLookupKey = getKey(host);
                const lookupKeysAreEqual = lookupKey === vNodeLookupKey;
                if (!lookupKeysAreEqual) {
                    // See if we already have this inline component later on.
                    vNewNode = retrieveChildWithKey(null, lookupKey);
                    if (vNewNode) {
                        // We found the inline component, move it up.
                        vnode_insertBefore(journal, vParent, vNewNode, vCurrent);
                    }
                    else {
                        // We did not find the inline component, create it.
                        insertNewInlineComponent();
                    }
                    host = vNewNode;
                }
                if (host) {
                    let componentHost = host;
                    // Find the closest component host which has `OnRender` prop. This is need for subscriptions context.
                    while (componentHost &&
                        (vnode_isVirtualVNode(componentHost)
                            ? vnode_getProp(componentHost, OnRenderProp, null) === null
                            : true)) {
                        componentHost = vnode_getParent(componentHost);
                    }
                    const jsxOutput = executeComponent(container, host, (componentHost || container.rootVNode), component, jsxValue.props);
                    asyncQueue.push(jsxOutput, host);
                }
            }
        }
        function insertNewComponent(host, componentQRL, jsxProps) {
            if (host) {
                clearVNodeEffectDependencies(host);
            }
            vnode_insertBefore(journal, vParent, (vNewNode = vnode_newVirtual()), vCurrent && getInsertBefore());
            build.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, VirtualType.Component);
            container.setHostProp(vNewNode, OnRenderProp, componentQRL);
            container.setHostProp(vNewNode, ELEMENT_PROPS, jsxProps);
            container.setHostProp(vNewNode, ELEMENT_KEY, jsxValue.key);
        }
        function insertNewInlineComponent() {
            vnode_insertBefore(journal, vParent, (vNewNode = vnode_newVirtual()), vCurrent && getInsertBefore());
            build.isDev && vnode_setProp(vNewNode, DEBUG_TYPE, VirtualType.InlineComponent);
            vnode_setProp(vNewNode, ELEMENT_PROPS, jsxValue.props);
            if (jsxValue.key) {
                vnode_setProp(vNewNode, ELEMENT_KEY, jsxValue.key);
            }
        }
        function expectText(text) {
            if (vCurrent !== null) {
                const type = vnode_getType(vCurrent);
                if (type === 3 /* Text */) {
                    if (text !== vnode_getText(vCurrent)) {
                        vnode_setText(journal, vCurrent, text);
                        return;
                    }
                    return;
                }
            }
            vnode_insertBefore(journal, vParent, (vNewNode = vnode_newText(container.document.createTextNode(text), text)), vCurrent);
        }
    };
    /**
     * Retrieve the key from the VNode.
     *
     * @param vNode - VNode to retrieve the key from
     * @returns Key
     */
    function getKey(vNode) {
        if (vNode == null) {
            return null;
        }
        return vnode_getProp(vNode, ELEMENT_KEY, null);
    }
    /**
     * Retrieve the component hash from the VNode.
     *
     * @param vNode - VNode to retrieve the key from
     * @param getObject - Function to retrieve the object by id for QComponent QRL
     * @returns Hash
     */
    function getComponentHash(vNode, getObject) {
        if (vNode == null) {
            return null;
        }
        const qrl = vnode_getProp(vNode, OnRenderProp, getObject);
        return qrl ? qrl.$hash$ : null;
    }
    /**
     * Marker class for JSX projection.
     *
     * Assume you have component like so
     *
     * ```
     * <SomeComponent>
     *   some-text
     *   <span q:slot="name">some more text</span>
     *   more-text
     * </SomeComponent>
     * ```
     *
     * Before the `<SomeCompetent/>` is processed its children are transformed into:
     *
     * ```
     *   <Projection q:slot="">
     *     some-text
     *     more-text
     *   </Projection>
     *   <Projection q:slot="name">
     *     <span q:slot="name">some more text</span>
     *   </Projection>
     * ```
     */
    function Projection() { }
    function propsDiffer(src, dst) {
        if (!src || !dst) {
            return true;
        }
        let srcKeys = removeChildrenKey(Object.keys(src));
        let dstKeys = removeChildrenKey(Object.keys(dst));
        if (srcKeys.length !== dstKeys.length) {
            return true;
        }
        srcKeys = srcKeys.sort();
        dstKeys = dstKeys.sort();
        for (let idx = 0; idx < srcKeys.length; idx++) {
            const srcKey = srcKeys[idx];
            const dstKey = dstKeys[idx];
            if (srcKey !== dstKey || src[srcKey] !== dst[dstKey]) {
                return true;
            }
        }
        return false;
    }
    function removeChildrenKey(keys) {
        const childrenIdx = keys.indexOf('children');
        if (childrenIdx !== -1) {
            keys.splice(childrenIdx, 1);
        }
        return keys;
    }
    /**
     * If vnode is removed, it is necessary to release all subscriptions associated with it.
     *
     * This function will traverse the vnode tree in depth-first order and release all subscriptions.
     *
     * The function takes into account:
     *
     * - Projection nodes by not recursing into them.
     * - Component nodes by recursing into the component content nodes (which may be projected).
     */
    function cleanup(container, vNode) {
        let vCursor = vNode;
        // Depth first traversal
        if (vnode_isTextVNode(vNode)) {
            // Text nodes don't have subscriptions or children;
            return;
        }
        let vParent = null;
        do {
            const type = vCursor[VNodeProps.flags];
            if (type & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK) {
                // Only elements and virtual nodes need to be traversed for children
                if (type & VNodeFlags.Virtual) {
                    // Only virtual nodes have subscriptions
                    clearVNodeEffectDependencies(vCursor);
                    markVNodeAsDeleted(vCursor);
                    const seq = container.getHostProp(vCursor, ELEMENT_SEQ);
                    if (seq) {
                        for (let i = 0; i < seq.length; i++) {
                            const obj = seq[i];
                            if (isTask(obj)) {
                                const task = obj;
                                clearSubscriberEffectDependencies(task);
                                if (task.$flags$ & TaskFlags.VISIBLE_TASK) {
                                    container.$scheduler$(ChoreType.CLEANUP_VISIBLE, task);
                                }
                                else {
                                    cleanupTask(task);
                                }
                            }
                        }
                    }
                }
                const isComponent = type & VNodeFlags.Virtual &&
                    vnode_getProp(vCursor, OnRenderProp, null) !== null;
                if (isComponent) {
                    // SPECIAL CASE: If we are a component, we need to descend into the projected content and release the content.
                    const attrs = vCursor;
                    for (let i = VirtualVNodeProps.PROPS_OFFSET; i < attrs.length; i = i + 2) {
                        const key = attrs[i];
                        if (!isParentSlotProp(key) && isSlotProp(key)) {
                            const value = attrs[i + 1];
                            if (value) {
                                attrs[i + 1] = null; // prevent infinite loop
                                const projection = typeof value === 'string'
                                    ? vnode_locate(container.rootVNode, value)
                                    : value;
                                let projectionChild = vnode_getFirstChild(projection);
                                while (projectionChild) {
                                    cleanup(container, projectionChild);
                                    projectionChild = vnode_getNextSibling(projectionChild);
                                }
                                cleanupStaleUnclaimedProjection(container.$journal$, projection);
                            }
                        }
                    }
                }
                const isProjection = type & VNodeFlags.Virtual && vnode_getProp(vCursor, QSlot, null) !== null;
                // Descend into children
                if (!isProjection) {
                    // Only if it is not a projection
                    const vFirstChild = vnode_getFirstChild(vCursor);
                    if (vFirstChild) {
                        vCursor = vFirstChild;
                        continue;
                    }
                }
                else if (vCursor === vNode) {
                    /**
                     * If it is a projection and we are at the root, then we should only walk the children to
                     * materialize the projection content. This is because we could have references in the vnode
                     * refs map which need to be materialized before cleanup.
                     */
                    const vFirstChild = vnode_getFirstChild(vCursor);
                    if (vFirstChild) {
                        vnode_walkVNode(vFirstChild);
                        return;
                    }
                }
            }
            // Out of children
            if (vCursor === vNode) {
                // we are where we started, this means that vNode has no children, so we are done.
                return;
            }
            // Out of children, go to next sibling
            const vNextSibling = vnode_getNextSibling(vCursor);
            if (vNextSibling) {
                vCursor = vNextSibling;
                continue;
            }
            // Out of siblings, go to parent
            vParent = vnode_getParent(vCursor);
            while (vParent) {
                if (vParent === vNode) {
                    // We are back where we started, we are done.
                    return;
                }
                const vNextParentSibling = vnode_getNextSibling(vParent);
                if (vNextParentSibling) {
                    vCursor = vNextParentSibling;
                    break;
                }
                vParent = vnode_getParent(vParent);
            }
            if (vParent == null) {
                // We are done.
                return;
            }
        } while (true);
    }
    function cleanupStaleUnclaimedProjection(journal, projection) {
        // we are removing a node where the projection would go after slot render.
        // This is not needed, so we need to cleanup still unclaimed projection
        const projectionParent = vnode_getParent(projection);
        if (projectionParent) {
            const projectionParentType = projectionParent[VNodeProps.flags];
            if (projectionParentType & VNodeFlags.Element &&
                vnode_getElementName(projectionParent) === QTemplate) {
                // if parent is the q:template element then projection is still unclaimed - remove it
                vnode_remove(journal, projectionParent, projection, true);
            }
        }
    }
    function markVNodeAsDeleted(vCursor) {
        /**
         * Marks vCursor as deleted. We need to do this to prevent chores from running after the vnode is
         * removed. (for example signal subscriptions)
         */
        vCursor[VNodeProps.flags] |= VNodeFlags.Deleted;
    }
    /**
     * This marks the property as immutable. It is needed for the QRLs so that QwikLoader can get a hold
     * of them. This character must be `:` so that the `vnode_getAttr` can ignore them.
     */
    const HANDLER_PREFIX = ':';
    let count = 0;
    var SiblingsArray;
    (function (SiblingsArray) {
        SiblingsArray[SiblingsArray["Name"] = 0] = "Name";
        SiblingsArray[SiblingsArray["Key"] = 1] = "Key";
        SiblingsArray[SiblingsArray["VNode"] = 2] = "VNode";
        SiblingsArray[SiblingsArray["Size"] = 3] = "Size";
        SiblingsArray[SiblingsArray["NextVNode"] = 5] = "NextVNode";
    })(SiblingsArray || (SiblingsArray = {}));

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
            return fn.call(null, dollar(first), ...rest);
        };
    };

    const createSignal$1 = (value) => {
        return new Signal(null, value);
    };
    const createComputedSignal = (qrl) => {
        throwIfQRLNotResolved(qrl);
        return new ComputedSignal(null, qrl);
    };

    /**
     * Creates a Signal with the given value. If no value is given, the signal is created with
     * `undefined`.
     *
     * @public
     */
    const createSignal = createSignal$1;
    /** @public */
    const createComputedQrl = createComputedSignal;
    /**
     * Create a computed signal which is calculated from the given QRL. A computed signal is a signal
     * which is calculated from other signals. When the signals change, the computed signal is
     * recalculated.
     *
     * The QRL must be a function which returns the value of the signal. The function must not have side
     * effects, and it mus be synchronous.
     *
     * If you need the function to be async, use `useSignal` and `useTask$` instead.
     *
     * @public
     */
    const createComputed$ = /*#__PURE__*/ implicit$FirstArg(createComputedQrl);

    /**
     * Scheduler is responsible for running application code in predictable order.
     *
     * ## What is a Chore?
     *
     * A Chore is a unit of work that needs to be done. It can be:
     *
     * - Task / Resource
     * - Visible Task
     * - Component
     * - Computed
     * - Node Diff
     *
     * ## Order of execution
     *
     * - Parent component chores should run before child component chores.
     * - Visible Tasks should run after journal flush (visible tasks often read DOM layout.)
     *
     * ## Example
     *
     * ```typescript
     * const Child = component$(() => {
     *   useTask$(() => {
     *     console.log('Child task');
     *   });
     *   useVisibleTask$(() => {
     *     console.log('Child visible-task');
     *   });
     *   console.log('Child render');
     *   return <div>Child</div>;
     * });
     *
     * const Parent = component$(() => {
     *   const count = useSignal(0);
     *   useTask$(() => {
     *     console.log('Parent task', count.value);
     *   });
     *   useVisibleTask$(() => {
     *     console.log('Parent visible-task', count.value);
     *     count.value++;
     *   });
     *   console.log('Parent render', count.value);
     *   return <Child/>;
     * });
     * ```
     *
     * ## In the above example, the order of execution is:
     *
     * 1. Parent task 0
     * 2. Parent render 0
     * 3. Child task 0
     * 4. Child render 0
     * 5. Journal flush
     * 6. Parent visible-task 0
     * 7. Parent render 1
     * 8. Journal flush
     * 9. Child visible-task
     *
     * If at any point a new chore is scheduled it will insert itself into the correct order.
     *
     * ## Implementation
     *
     * Chores are kept in a sorted array. When a new chore is scheduled it is inserted into the correct
     * location. Processing of the chores always starts from the beginning of the array. This ensures
     * that parent chores are processed before child chores.
     *
     * ## Sorting
     *
     * Chores are sorted in three levels:
     *
     * - Macro: beforeJournalFlush, journalFlush, afterJournalFlush
     * - Component: depth first order of components
     * - Micro: order of chores within a component.
     *
     * Example of sorting:
     *
     * - Tasks are beforeJournalFlush, than depth first on component and finally in declaration order
     *   within component.
     * - Visible Tasks are sorted afterJournalFlush, than depth first on component and finally in
     *   declaration order within component.
     */
    var ChoreType;
    (function (ChoreType) {
        /// MASKS defining three levels of sorting
        ChoreType[ChoreType["MACRO"] = 112] = "MACRO";
        /* order of elements (not encoded here) */
        ChoreType[ChoreType["MICRO"] = 15] = "MICRO";
        /** Ensure tha the QRL promise is resolved before processing next chores in the queue */
        ChoreType[ChoreType["QRL_RESOLVE"] = 1] = "QRL_RESOLVE";
        ChoreType[ChoreType["RESOURCE"] = 2] = "RESOURCE";
        ChoreType[ChoreType["TASK"] = 3] = "TASK";
        ChoreType[ChoreType["NODE_DIFF"] = 4] = "NODE_DIFF";
        ChoreType[ChoreType["NODE_PROP"] = 5] = "NODE_PROP";
        ChoreType[ChoreType["COMPONENT_SSR"] = 6] = "COMPONENT_SSR";
        ChoreType[ChoreType["COMPONENT"] = 7] = "COMPONENT";
        ChoreType[ChoreType["WAIT_FOR_COMPONENTS"] = 16] = "WAIT_FOR_COMPONENTS";
        ChoreType[ChoreType["JOURNAL_FLUSH"] = 48] = "JOURNAL_FLUSH";
        ChoreType[ChoreType["VISIBLE"] = 64] = "VISIBLE";
        ChoreType[ChoreType["CLEANUP_VISIBLE"] = 80] = "CLEANUP_VISIBLE";
        ChoreType[ChoreType["WAIT_FOR_ALL"] = 127] = "WAIT_FOR_ALL";
    })(ChoreType || (ChoreType = {}));
    const createScheduler = (container, scheduleDrain, journalFlush) => {
        const choreQueue = [];
        let currentChore = null;
        let journalFlushScheduled = false;
        return schedule;
        ///// IMPLEMENTATION /////
        function schedule(type, hostOrTask = null, targetOrQrl = null, payload = null) {
            const runLater = type !== ChoreType.WAIT_FOR_ALL &&
                type !== ChoreType.WAIT_FOR_COMPONENTS &&
                type !== ChoreType.COMPONENT_SSR;
            const isTask = type === ChoreType.TASK ||
                type === ChoreType.VISIBLE ||
                type === ChoreType.RESOURCE ||
                type === ChoreType.CLEANUP_VISIBLE;
            if (isTask) {
                hostOrTask.$flags$ |= TaskFlags.DIRTY;
            }
            let chore = {
                $type$: type,
                $idx$: isTask
                    ? hostOrTask.$index$
                    : typeof targetOrQrl === 'string'
                        ? targetOrQrl
                        : 0,
                $host$: isTask ? hostOrTask.$el$ : hostOrTask,
                $target$: targetOrQrl,
                $payload$: isTask ? hostOrTask : payload,
                $resolve$: null,
                $promise$: null,
                $returnValue$: null,
                $executed$: false,
            };
            chore.$promise$ = new Promise((resolve) => (chore.$resolve$ = resolve));
            chore = sortedInsert(choreQueue, chore);
            if (!journalFlushScheduled && runLater) {
                // If we are not currently draining, we need to schedule a drain.
                journalFlushScheduled = true;
                schedule(ChoreType.JOURNAL_FLUSH);
                scheduleDrain();
            }
            if (runLater) {
                return chore.$promise$;
            }
            else {
                return drainUpTo(chore);
            }
        }
        /**
         * Execute all of the chores up to and including the given chore.
         *
         * @param runUptoChore
         */
        function drainUpTo(runUptoChore) {
            // If it already ran, it's not in the queue
            if (runUptoChore.$executed$) {
                return runUptoChore.$returnValue$;
            }
            if (currentChore) {
                // Already running chore, which means we're waiting for async completion
                return runUptoChore.$promise$;
            }
            while (choreQueue.length) {
                const nextChore = choreQueue.shift();
                const order = choreComparator(nextChore, runUptoChore, false);
                if (order === null) {
                    continue;
                }
                if (order > 0) {
                    // we have processed all of the chores up to and including the given chore.
                    break;
                }
                const isDeletedVNode = vNodeAlreadyDeleted(nextChore);
                if (isDeletedVNode &&
                    // we need to process cleanup tasks for deleted nodes
                    nextChore.$type$ !== ChoreType.CLEANUP_VISIBLE) {
                    continue;
                }
                const returnValue = executeChore(nextChore);
                if (isPromise(returnValue)) {
                    const promise = returnValue.then(() => drainUpTo(runUptoChore));
                    return promise;
                }
            }
            return runUptoChore.$returnValue$;
        }
        function executeChore(chore) {
            const host = chore.$host$;
            assertEqual(currentChore, null, 'Chore already running.');
            currentChore = chore;
            let returnValue = null;
            switch (chore.$type$) {
                case ChoreType.JOURNAL_FLUSH:
                    returnValue = journalFlush();
                    journalFlushScheduled = false;
                    break;
                case ChoreType.COMPONENT:
                case ChoreType.COMPONENT_SSR:
                    returnValue = safeCall(() => executeComponent(container, host, host, chore.$target$, chore.$payload$), (jsx) => {
                        return chore.$type$ === ChoreType.COMPONENT
                            ? maybeThen(container.processJsx(host, jsx), () => jsx)
                            : jsx;
                    }, (err) => container.handleError(err, host));
                    break;
                case ChoreType.RESOURCE:
                    // Don't await the return value of the resource, because async resources should not be awaited.
                    // The reason for this is that we should be able to update for example a node with loading
                    // text. If we await the resource, the loading text will not be displayed until the resource
                    // is loaded.
                    const result = runResource(chore.$payload$, container, host);
                    returnValue = isDomContainer(container) ? null : result;
                    break;
                case ChoreType.TASK:
                    returnValue = runTask(chore.$payload$, container, host);
                    break;
                case ChoreType.VISIBLE:
                    returnValue = runTask(chore.$payload$, container, host);
                    break;
                case ChoreType.CLEANUP_VISIBLE:
                    const task = chore.$payload$;
                    cleanupTask(task);
                    break;
                case ChoreType.NODE_DIFF:
                    const parentVirtualNode = chore.$target$;
                    let jsx = chore.$payload$;
                    if (isSignal(jsx)) {
                        jsx = jsx.value;
                    }
                    returnValue = vnode_diff(container, jsx, parentVirtualNode, null);
                    break;
                case ChoreType.NODE_PROP:
                    const virtualNode = chore.$host$;
                    const payload = chore.$payload$;
                    let value = payload.$value$;
                    if (isSignal(value)) {
                        value = value.value;
                    }
                    const isConst = payload.$isConst$;
                    const journal = container.$journal$;
                    const property = chore.$idx$;
                    value = serializeAttribute(property, value, payload.$scopedStyleIdPrefix$);
                    if (isConst) {
                        const element = virtualNode[ElementVNodeProps.element];
                        journal.push(VNodeJournalOpCode.SetAttribute, element, property, value);
                    }
                    else {
                        vnode_setAttr(journal, virtualNode, property, value);
                    }
                    break;
                case ChoreType.QRL_RESOLVE: {
                    const target = chore.$target$;
                    returnValue = !target.resolved ? target.resolve() : null;
                    break;
                }
            }
            return maybeThenPassError(returnValue, (value) => {
                if (currentChore) {
                    currentChore.$executed$ = true;
                    currentChore.$resolve$?.(value);
                }
                currentChore = null;
                return (chore.$returnValue$ = value);
            });
        }
    };
    const toNumber = (value) => {
        return typeof value === 'number' ? value : -1;
    };
    /**
     * When a derived signal is update we need to run vnode_diff. However the signal can update multiple
     * times during component execution. For this reason it is necessary for us to update the schedule
     * work with the latest result of the signal.
     */
    const choreUpdate = (existing, newChore) => {
        if (existing.$type$ === ChoreType.NODE_DIFF) {
            existing.$payload$ = newChore.$payload$;
        }
    };
    function vNodeAlreadyDeleted(chore) {
        return !!(chore.$host$ &&
            vnode_isVNode(chore.$host$) &&
            chore.$host$[VNodeProps.flags] & VNodeFlags.Deleted);
    }
    function choreComparator(a, b, shouldThrowOnHostMismatch) {
        const macroTypeDiff = (a.$type$ & ChoreType.MACRO) - (b.$type$ & ChoreType.MACRO);
        if (macroTypeDiff !== 0) {
            return macroTypeDiff;
        }
        // JOURNAL_FLUSH does not have a host or $idx$, so we can't compare it.
        if (a.$type$ !== ChoreType.JOURNAL_FLUSH) {
            const aHost = a.$host$;
            const bHost = b.$host$;
            // QRL_RESOLVE does not have a host.
            if (aHost !== bHost && aHost !== null && bHost !== null) {
                if (vnode_isVNode(aHost) && vnode_isVNode(bHost)) {
                    // we are running on the client.
                    const hostDiff = vnode_documentPosition(aHost, bHost);
                    if (hostDiff !== 0) {
                        return hostDiff;
                    }
                }
                else {
                    // we are running on the server.
                    // On server we can't schedule task for a different host!
                    // Server is SSR, and therefore scheduling for anything but the current host
                    // implies that things need to be re-run nad that is not supported because of streaming.
                    const errorMessage = 'SERVER: during HTML streaming, it is not possible to cause a re-run of tasks on a different host';
                    if (shouldThrowOnHostMismatch) {
                        throwErrorAndStop(errorMessage);
                    }
                    logWarn(errorMessage);
                    return null;
                }
            }
            const microTypeDiff = (a.$type$ & ChoreType.MICRO) - (b.$type$ & ChoreType.MICRO);
            if (microTypeDiff !== 0) {
                return microTypeDiff;
            }
            const idxDiff = toNumber(a.$idx$) - toNumber(b.$idx$);
            if (idxDiff !== 0) {
                return idxDiff;
            }
            // If the host is the same, we need to compare the target.
            if (a.$target$ !== b.$target$ &&
                ((a.$type$ === ChoreType.QRL_RESOLVE && b.$type$ === ChoreType.QRL_RESOLVE) ||
                    (a.$type$ === ChoreType.NODE_PROP && b.$type$ === ChoreType.NODE_PROP))) {
                // 1 means that we are going to process chores as FIFO
                return 1;
            }
        }
        return 0;
    }
    function sortedFindIndex(sortedArray, value) {
        /// We need to ensure that the `queue` is sorted by priority.
        /// 1. Find a place where to insert into.
        let bottom = 0;
        let top = sortedArray.length;
        while (bottom < top) {
            const middle = bottom + ((top - bottom) >> 1);
            const midChore = sortedArray[middle];
            const comp = choreComparator(value, midChore, true);
            if (comp < 0) {
                top = middle;
            }
            else if (comp > 0) {
                bottom = middle + 1;
            }
            else {
                // We already have the host in the queue.
                return middle;
            }
        }
        return ~bottom;
    }
    function sortedInsert(sortedArray, value) {
        /// We need to ensure that the `queue` is sorted by priority.
        /// 1. Find a place where to insert into.
        const idx = sortedFindIndex(sortedArray, value);
        if (idx < 0) {
            /// 2. Insert the chore into the queue.
            sortedArray.splice(~idx, 0, value);
            return value;
        }
        const existing = sortedArray[idx];
        choreUpdate(existing, value);
        return existing;
    }

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
            const containerElement = _getQContainerElement(el);
            assertDefined(containerElement, `invoke: cant find parent q:container of`, el);
            const container = getDomContainer(containerElement);
            qrl = container.parseQRL(decodeURIComponent(String(context.$url$)));
        }
        else {
            assertQrl(qrl);
            assertDefined(qrl.$captureRef$, 'invoke: qrl $captureRef$ must be defined inside useLexicalScope()', qrl);
        }
        return qrl.$captureRef$;
    };

    var TaskFlags;
    (function (TaskFlags) {
        TaskFlags[TaskFlags["VISIBLE_TASK"] = 1] = "VISIBLE_TASK";
        TaskFlags[TaskFlags["TASK"] = 2] = "TASK";
        TaskFlags[TaskFlags["RESOURCE"] = 4] = "RESOURCE";
        TaskFlags[TaskFlags["DIRTY"] = 8] = "DIRTY";
    })(TaskFlags || (TaskFlags = {}));
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
        const { val, set, iCtx, i } = useSequentialScope();
        if (val) {
            return;
        }
        assertQrl(qrl);
        set(1);
        const host = iCtx.$hostElement$;
        const task = new Task(TaskFlags.DIRTY | TaskFlags.TASK, i, iCtx.$hostElement$, qrl, undefined, null);
        // In V2 we add the task to the sequential scope. We need to do this
        // in order to be able to retrieve it later when the parent element is
        // deleted and we need to be able to release the task subscriptions.
        set(task);
        const result = runTask(task, iCtx.$container$, host);
        if (isPromise(result)) {
            throw result;
        }
        qrl.$resolveLazy$(iCtx.$element$);
        if (isServerPlatform()) {
            useRunTask(task, opts?.eagerness);
        }
    };
    const runTask = (task, container, host) => {
        task.$flags$ &= ~TaskFlags.DIRTY;
        cleanupTask(task);
        const iCtx = newInvokeContext(container.$locale$, host, undefined, TaskEvent);
        iCtx.$container$ = container;
        const taskFn = task.$qrl$.getFn(iCtx, () => clearSubscriberEffectDependencies(task));
        const track = (obj, prop) => {
            const ctx = newInvokeContext();
            ctx.$effectSubscriber$ = [task, EffectProperty.COMPONENT];
            ctx.$container$ = container;
            return invoke(ctx, () => {
                if (isFunction(obj)) {
                    return obj();
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
            });
        };
        const handleError = (reason) => container.handleError(reason, host);
        let cleanupFns = null;
        const cleanup = (fn) => {
            if (typeof fn == 'function') {
                if (!cleanupFns) {
                    cleanupFns = [];
                    task.$destroy$ = noSerialize(() => {
                        task.$destroy$ = null;
                        cleanupFns.forEach((fn) => {
                            try {
                                fn();
                            }
                            catch (err) {
                                handleError(err);
                            }
                        });
                    });
                }
                cleanupFns.push(fn);
            }
        };
        const taskApi = { track, cleanup };
        const result = safeCall(() => taskFn(taskApi), cleanup, (err) => {
            if (isPromise(err)) {
                return err.then(() => runTask(task, container, host));
            }
            else {
                return handleError(err);
            }
        });
        return result;
    };
    const cleanupTask = (task) => {
        const destroy = task.$destroy$;
        if (destroy) {
            task.$destroy$ = null;
            try {
                destroy();
            }
            catch (err) {
                logError(err);
            }
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
    class Task extends Subscriber {
        constructor($flags$, $index$, $el$, $qrl$, $state$, $destroy$) {
            super();
            this.$flags$ = $flags$;
            this.$index$ = $index$;
            this.$el$ = $el$;
            this.$qrl$ = $qrl$;
            this.$state$ = $state$;
            this.$destroy$ = $destroy$;
        }
    }
    const isTask = (value) => {
        return value instanceof Task;
    };
    /**
     * Low-level API used by the Optimizer to process `useTask$()` API. This method is not intended to
     * be used by developers.
     *
     * @internal
     */
    const _hW = () => {
        const [task] = useLexicalScope();
        const container = getDomContainer(task.$el$);
        const type = task.$flags$ & TaskFlags.VISIBLE_TASK ? ChoreType.VISIBLE : ChoreType.TASK;
        container.$scheduler$(type, task);
    };

    /**
     * @file
     *
     *   Signals come in two types:
     *
     *   1. `Signal` - A storage of data
     *   2. `ComputedSignal` - A signal which is computed from other signals.
     *
     *   ## Why is `ComputedSignal` different?
     *
     *   - It needs to store a function which needs to re-run.
     *   - It is `Readonly` because it is computed.
     */
    const DEBUG = false;
    /**
     * Special value used to mark that a given signal needs to be computed. This is essentially a
     * "marked as dirty" flag.
     */
    const NEEDS_COMPUTATION = Symbol('invalid');
    // eslint-disable-next-line no-console
    const log = (...args) => console.log('SIGNAL', ...args.map(qwikDebugToString));
    const throwIfQRLNotResolved = (qrl) => {
        const resolved = qrl.resolved;
        if (!resolved) {
            // When we are creating a signal using a use method, we need to ensure
            // that the computation can be lazy and therefore we need to unsure
            // that the QRL is resolved.
            // When we re-create the signal from serialization (we don't create the signal
            // using useMethod) it is OK to not resolve it until the graph is marked as dirty.
            throw qrl.resolve();
        }
    };
    /** @public */
    const isSignal = (value) => {
        return value instanceof Signal;
    };
    /** @internal */
    class EffectData {
        constructor(data) {
            this.data = data;
        }
    }
    var EffectSubscriptionsProp;
    (function (EffectSubscriptionsProp) {
        EffectSubscriptionsProp[EffectSubscriptionsProp["EFFECT"] = 0] = "EFFECT";
        EffectSubscriptionsProp[EffectSubscriptionsProp["PROPERTY"] = 1] = "PROPERTY";
        EffectSubscriptionsProp[EffectSubscriptionsProp["FIRST_BACK_REF_OR_DATA"] = 2] = "FIRST_BACK_REF_OR_DATA";
    })(EffectSubscriptionsProp || (EffectSubscriptionsProp = {}));
    var EffectProperty;
    (function (EffectProperty) {
        EffectProperty["COMPONENT"] = ":";
        EffectProperty["VNODE"] = ".";
    })(EffectProperty || (EffectProperty = {}));
    class Signal {
        constructor(container, value) {
            /** Store a list of effects which are dependent on this signal. */
            this.$effects$ = null;
            this.$container$ = null;
            this.$container$ = container;
            this.$untrackedValue$ = value;
        }
        get untrackedValue() {
            return this.$untrackedValue$;
        }
        // TODO: should we disallow setting the value directly?
        set untrackedValue(value) {
            this.$untrackedValue$ = value;
        }
        get value() {
            const ctx = tryGetInvokeContext();
            if (ctx) {
                if (this.$container$ === null) {
                    if (!ctx.$container$) {
                        return this.untrackedValue;
                    }
                    // Grab the container now we have access to it
                    this.$container$ = ctx.$container$;
                }
                else {
                    assertTrue(!ctx.$container$ || ctx.$container$ === this.$container$, 'Do not use signals across containers');
                }
                const effectSubscriber = ctx.$effectSubscriber$;
                if (effectSubscriber) {
                    const effects = (this.$effects$ || (this.$effects$ = []));
                    // Let's make sure that we have a reference to this effect.
                    // Adding reference is essentially adding a subscription, so if the signal
                    // changes we know who to notify.
                    ensureContainsEffect(effects, effectSubscriber);
                    // But when effect is scheduled in needs to be able to know which signals
                    // to unsubscribe from. So we need to store the reference from the effect back
                    // to this signal.
                    ensureContains(effectSubscriber, this);
                    if (isSubscriber(this)) {
                        // We need to add the subscriber to the effect so that we can clean it up later
                        ensureEffectContainsSubscriber(effectSubscriber[EffectSubscriptionsProp.EFFECT], this, this.$container$);
                    }
                }
            }
            return this.untrackedValue;
        }
        set value(value) {
            if (value !== this.$untrackedValue$) {
                this.$untrackedValue$ = value;
                triggerEffects(this.$container$, this, this.$effects$);
            }
        }
        // prevent accidental use as value
        valueOf() {
            if (qDev) {
                return throwErrorAndStop('Cannot coerce a Signal, use `.value` instead');
            }
        }
        toString() {
            return (`[${this.constructor.name}${this.$invalid$ ? ' INVALID' : ''} ${String(this.$untrackedValue$)}]` +
                (this.$effects$?.map((e) => '\n -> ' + pad(qwikDebugToString(e[0]), '    ')).join('\n') || ''));
        }
        toJSON() {
            return { value: this.$untrackedValue$ };
        }
    }
    /** Ensure the item is in array (do nothing if already there) */
    const ensureContains = (array, value) => {
        const isMissing = array.indexOf(value) === -1;
        if (isMissing) {
            array.push(value);
        }
    };
    const ensureContainsEffect = (array, effectSubscriptions) => {
        for (let i = 0; i < array.length; i++) {
            const existingEffect = array[i];
            if (existingEffect[0] === effectSubscriptions[0] &&
                existingEffect[1] === effectSubscriptions[1]) {
                return;
            }
        }
        array.push(effectSubscriptions);
    };
    const ensureEffectContainsSubscriber = (effect, subscriber, container) => {
        if (isSubscriber(effect)) {
            effect.$effectDependencies$ || (effect.$effectDependencies$ = []);
            if (subscriberExistInSubscribers(effect.$effectDependencies$, subscriber)) {
                return;
            }
            effect.$effectDependencies$.push(subscriber);
        }
        else if (vnode_isVNode(effect) && vnode_isVirtualVNode(effect)) {
            let subscribers = vnode_getProp(effect, QSubscribers, container ? container.$getObjectById$ : null);
            subscribers || (subscribers = []);
            if (subscriberExistInSubscribers(subscribers, subscriber)) {
                return;
            }
            subscribers.push(subscriber);
            vnode_setProp(effect, QSubscribers, subscribers);
        }
        else if (isSSRNode(effect)) {
            let subscribers = effect.getProp(QSubscribers);
            subscribers || (subscribers = []);
            if (subscriberExistInSubscribers(subscribers, subscriber)) {
                return;
            }
            subscribers.push(subscriber);
            effect.setProp(QSubscribers, subscribers);
        }
    };
    const isSSRNode = (effect) => {
        return 'setProp' in effect && 'getProp' in effect && 'removeProp' in effect && 'id' in effect;
    };
    const subscriberExistInSubscribers = (subscribers, subscriber) => {
        for (let i = 0; i < subscribers.length; i++) {
            if (subscribers[i] === subscriber) {
                return true;
            }
        }
        return false;
    };
    const triggerEffects = (container, signal, effects) => {
        if (effects) {
            const scheduleEffect = (effectSubscriptions) => {
                const effect = effectSubscriptions[EffectSubscriptionsProp.EFFECT];
                const property = effectSubscriptions[EffectSubscriptionsProp.PROPERTY];
                assertDefined(container, 'Container must be defined.');
                if (isTask(effect)) {
                    effect.$flags$ |= TaskFlags.DIRTY;
                    let choreType = ChoreType.TASK;
                    if (effect.$flags$ & TaskFlags.VISIBLE_TASK) {
                        choreType = ChoreType.VISIBLE;
                    }
                    else if (effect.$flags$ & TaskFlags.RESOURCE) {
                        choreType = ChoreType.RESOURCE;
                    }
                    container.$scheduler$(choreType, effect);
                }
                else if (effect instanceof Signal) {
                    // we don't schedule ComputedSignal/DerivedSignal directly, instead we invalidate it and
                    // and schedule the signals effects (recursively)
                    if (effect instanceof ComputedSignal) {
                        // Ensure that the computed signal's QRL is resolved.
                        // If not resolved schedule it to be resolved.
                        if (!effect.$computeQrl$.resolved) {
                            container.$scheduler$(ChoreType.QRL_RESOLVE, null, effect.$computeQrl$);
                        }
                    }
                    effect.$invalid$ = true;
                    const previousSignal = signal;
                    try {
                        signal = effect;
                        effect.$effects$?.forEach(scheduleEffect);
                    }
                    catch (e) {
                        logError(e);
                    }
                    finally {
                        signal = previousSignal;
                    }
                }
                else if (property === EffectProperty.COMPONENT) {
                    const host = effect;
                    const qrl = container.getHostProp(host, OnRenderProp);
                    assertDefined(qrl, 'Component must have QRL');
                    const props = container.getHostProp(host, ELEMENT_PROPS);
                    container.$scheduler$(ChoreType.COMPONENT, host, qrl, props);
                }
                else if (property === EffectProperty.VNODE) {
                    const host = effect;
                    const target = host;
                    container.$scheduler$(ChoreType.NODE_DIFF, host, target, signal);
                }
                else {
                    const host = effect;
                    let effectData = effectSubscriptions[EffectSubscriptionsProp.FIRST_BACK_REF_OR_DATA];
                    if (effectData instanceof EffectData) {
                        effectData = effectData;
                        const data = effectData.data;
                        const payload = {
                            ...data,
                            $value$: signal,
                        };
                        container.$scheduler$(ChoreType.NODE_PROP, host, property, payload);
                    }
                }
            };
            effects.forEach(scheduleEffect);
        }
    };
    /**
     * A signal which is computed from other signals.
     *
     * The value is available synchronously, but the computation is done lazily.
     */
    class ComputedSignal extends Signal {
        constructor(container, fn) {
            // The value is used for comparison when signals trigger, which can only happen
            // when it was calculated before. Therefore we can pass whatever we like.
            super(container, NEEDS_COMPUTATION);
            // We need a separate flag to know when the computation needs running because
            // we need the old value to know if effects need running after computation
            this.$invalid$ = true;
            this.$computeQrl$ = fn;
        }
        $invalidate$() {
            this.$invalid$ = true;
            if (!this.$effects$?.length) {
                return;
            }
            // We should only call subscribers if the calculation actually changed.
            // Therefore, we need to calculate the value now.
            // TODO move this calculation to the beginning of the next tick, add chores to that tick if necessary. New chore type?
            if (this.$computeIfNeeded$()) {
                triggerEffects(this.$container$, this, this.$effects$);
            }
        }
        /**
         * Use this to force running subscribers, for example when the calculated value has mutated but
         * remained the same object
         */
        force() {
            this.$invalid$ = true;
            triggerEffects(this.$container$, this, this.$effects$);
        }
        get untrackedValue() {
            this.$computeIfNeeded$();
            assertFalse(this.$untrackedValue$ === NEEDS_COMPUTATION, 'Invalid state');
            return this.$untrackedValue$;
        }
        $computeIfNeeded$() {
            if (!this.$invalid$) {
                return false;
            }
            const computeQrl = this.$computeQrl$;
            throwIfQRLNotResolved(computeQrl);
            const ctx = tryGetInvokeContext();
            const previousEffectSubscription = ctx?.$effectSubscriber$;
            ctx && (ctx.$effectSubscriber$ = [this, EffectProperty.VNODE]);
            try {
                const untrackedValue = computeQrl.getFn(ctx)();
                if (isPromise(untrackedValue)) {
                    throwErrorAndStop(`useComputedSignal$ QRL ${computeQrl.dev ? `${computeQrl.dev.file} ` : ''}${computeQrl.$hash$} returned a Promise`);
                }
                DEBUG && log('Signal.$compute$', untrackedValue);
                this.$invalid$ = false;
                const didChange = untrackedValue !== this.$untrackedValue$;
                this.$untrackedValue$ = untrackedValue;
                return didChange;
            }
            finally {
                if (ctx) {
                    ctx.$effectSubscriber$ = previousEffectSubscription;
                }
            }
        }
        // Getters don't get inherited
        get value() {
            return super.value;
        }
        set value(_) {
            throwErrorAndStop('ComputedSignal is read-only');
        }
    }
    class WrappedSignal extends Signal {
        constructor(container, fn, args, fnStr) {
            super(container, NEEDS_COMPUTATION);
            // We need a separate flag to know when the computation needs running because
            // we need the old value to know if effects need running after computation
            this.$invalid$ = true;
            this.$effectDependencies$ = null;
            this.$args$ = args;
            this.$func$ = fn;
            this.$funcStr$ = fnStr;
        }
        $invalidate$() {
            this.$invalid$ = true;
            if (!this.$effects$?.length) {
                return;
            }
            // We should only call subscribers if the calculation actually changed.
            // Therefore, we need to calculate the value now.
            // TODO move this calculation to the beginning of the next tick, add chores to that tick if necessary. New chore type?
            if (this.$computeIfNeeded$()) {
                triggerEffects(this.$container$, this, this.$effects$);
            }
        }
        /**
         * Use this to force running subscribers, for example when the calculated value has mutated but
         * remained the same object
         */
        force() {
            this.$invalid$ = true;
            triggerEffects(this.$container$, this, this.$effects$);
        }
        get untrackedValue() {
            this.$computeIfNeeded$();
            assertFalse(this.$untrackedValue$ === NEEDS_COMPUTATION, 'Invalid state');
            return this.$untrackedValue$;
        }
        $computeIfNeeded$() {
            if (!this.$invalid$) {
                return false;
            }
            this.$untrackedValue$ = trackSignal(() => this.$func$(...this.$args$), this, EffectProperty.VNODE, this.$container$);
        }
        // Getters don't get inherited
        get value() {
            return super.value;
        }
        set value(_) {
            throwErrorAndStop('WrappedSignal is read-only');
        }
    }

    const applyInlineComponent = (ssr, componentHost, inlineComponentFunction, jsx) => {
        const host = ssr.getLastNode();
        return executeComponent(ssr, host, componentHost, inlineComponentFunction, jsx.props);
    };
    const applyQwikComponentBody = (ssr, jsx, component) => {
        const host = ssr.getLastNode();
        const [componentQrl] = component[SERIALIZABLE_STATE];
        const srcProps = jsx.props;
        if (srcProps && srcProps.children) {
            delete srcProps.children;
        }
        const scheduler = ssr.$scheduler$;
        host.setProp(OnRenderProp, componentQrl);
        host.setProp(ELEMENT_PROPS, srcProps);
        if (jsx.key !== null) {
            host.setProp(ELEMENT_KEY, jsx.key);
        }
        return scheduler(ChoreType.COMPONENT_SSR, host, componentQrl, srcProps);
    };

    class ParentComponentData {
        constructor($scopedStyle$, $componentFrame$) {
            this.$scopedStyle$ = $scopedStyle$;
            this.$componentFrame$ = $componentFrame$;
        }
    }
    /** @internal */
    function _walkJSX(ssr, value, options) {
        const stack = [value];
        let resolveDrain;
        let rejectDrain;
        const drained = options.allowPromises &&
            new Promise((res, rej) => {
                resolveDrain = res;
                rejectDrain = rej;
            });
        const enqueue = (value) => stack.push(value);
        const resolveValue = (value) => {
            stack.push(value);
            drain();
        };
        const drain = () => {
            while (stack.length) {
                const value = stack.pop();
                if (value instanceof ParentComponentData) {
                    options.currentStyleScoped = value.$scopedStyle$;
                    options.parentComponentFrame = value.$componentFrame$;
                    continue;
                }
                else if (typeof value === 'function') {
                    if (value === Promise) {
                        if (!options.allowPromises) {
                            return throwErrorAndStop('Promises not expected here.');
                        }
                        stack.pop().then(resolveValue, rejectDrain);
                        return;
                    }
                    const waitOn = value.apply(ssr);
                    if (waitOn) {
                        if (!options.allowPromises) {
                            return throwErrorAndStop('Promises not expected here.');
                        }
                        waitOn.then(drain, rejectDrain);
                        return;
                    }
                    continue;
                }
                processJSXNode(ssr, enqueue, value, {
                    styleScoped: options.currentStyleScoped,
                    parentComponentFrame: options.parentComponentFrame,
                });
            }
            if (stack.length === 0 && options.allowPromises) {
                resolveDrain();
            }
        };
        drain();
        return drained;
    }
    function processJSXNode(ssr, enqueue, value, options) {
        // console.log('processJSXNode', value);
        if (value === null || value === undefined) {
            ssr.textNode('');
        }
        else if (typeof value === 'boolean') {
            ssr.textNode('');
        }
        else if (typeof value === 'number') {
            ssr.textNode(String(value));
        }
        else if (typeof value === 'string') {
            ssr.textNode(value);
        }
        else if (typeof value === 'object') {
            if (Array.isArray(value)) {
                for (let i = value.length - 1; i >= 0; i--) {
                    enqueue(value[i]);
                }
            }
            else if (isSignal(value)) {
                ssr.openFragment(build.isDev ? [DEBUG_TYPE, VirtualType.WrappedSignal] : EMPTY_ARRAY);
                const signalNode = ssr.getLastNode();
                enqueue(ssr.closeFragment);
                enqueue(trackSignal(() => value.value, signalNode, EffectProperty.VNODE, ssr));
            }
            else if (isPromise(value)) {
                ssr.openFragment(build.isDev ? [DEBUG_TYPE, VirtualType.Awaited] : EMPTY_ARRAY);
                enqueue(ssr.closeFragment);
                enqueue(value);
                enqueue(Promise);
                enqueue(() => ssr.commentNode(FLUSH_COMMENT));
            }
            else if (isAsyncGenerator(value)) {
                enqueue(async () => {
                    for await (const chunk of value) {
                        await _walkJSX(ssr, chunk, {
                            allowPromises: true,
                            currentStyleScoped: options.styleScoped,
                            parentComponentFrame: options.parentComponentFrame,
                        });
                        ssr.commentNode(FLUSH_COMMENT);
                    }
                });
            }
            else {
                const jsx = value;
                const type = jsx.type;
                // Below, JSXChildren allows functions and regexes, but we assume the dev only uses those as appropriate.
                if (typeof type === 'string') {
                    appendClassIfScopedStyleExists(jsx, options.styleScoped);
                    appendQwikInspectorAttribute(jsx);
                    const innerHTML = ssr.openElement(type, varPropsToSsrAttrs(jsx.varProps, jsx.constProps, ssr.serializationCtx, options.styleScoped, jsx.key), constPropsToSsrAttrs(jsx.constProps, jsx.varProps, ssr.serializationCtx, options.styleScoped));
                    if (innerHTML) {
                        ssr.htmlNode(innerHTML);
                    }
                    enqueue(ssr.closeElement);
                    if (type === 'head') {
                        enqueue(ssr.additionalHeadNodes);
                        enqueue(ssr.emitQwikLoaderAtTopIfNeeded);
                    }
                    else if (type === 'body') {
                        enqueue(ssr.additionalBodyNodes);
                    }
                    const children = jsx.children;
                    children != null && enqueue(children);
                }
                else if (isFunction(type)) {
                    if (type === Fragment) {
                        let attrs = jsx.key != null ? [ELEMENT_KEY, jsx.key] : EMPTY_ARRAY;
                        if (build.isDev) {
                            attrs = [DEBUG_TYPE, VirtualType.Fragment, ...attrs]; // Add debug info.
                        }
                        ssr.openFragment(attrs);
                        enqueue(ssr.closeFragment);
                        // In theory we could get functions or regexes, but we assume all is well
                        const children = jsx.children;
                        children != null && enqueue(children);
                    }
                    else if (type === Slot) {
                        const componentFrame = options.parentComponentFrame || ssr.unclaimedProjectionComponentFrameQueue.shift();
                        if (componentFrame) {
                            const compId = componentFrame.componentNode.id || '';
                            const projectionAttrs = build.isDev ? [DEBUG_TYPE, VirtualType.Projection] : [];
                            projectionAttrs.push(':', compId);
                            ssr.openProjection(projectionAttrs);
                            const host = componentFrame.componentNode;
                            const node = ssr.getLastNode();
                            const slotName = getSlotName(host, jsx, ssr);
                            projectionAttrs.push(QSlot, slotName);
                            enqueue(new ParentComponentData(options.styleScoped, options.parentComponentFrame));
                            enqueue(ssr.closeProjection);
                            const slotDefaultChildren = jsx.children || null;
                            const slotChildren = componentFrame.consumeChildrenForSlot(node, slotName) || slotDefaultChildren;
                            if (slotDefaultChildren && slotChildren !== slotDefaultChildren) {
                                ssr.addUnclaimedProjection(componentFrame, QDefaultSlot, slotDefaultChildren);
                            }
                            enqueue(slotChildren);
                            enqueue(new ParentComponentData(componentFrame.projectionScopedStyle, componentFrame.projectionComponentFrame));
                        }
                        else {
                            // Even thought we are not projecting we still need to leave a marker for the slot.
                            ssr.openFragment(build.isDev ? [DEBUG_TYPE, VirtualType.Projection] : EMPTY_ARRAY);
                            ssr.closeFragment();
                        }
                    }
                    else if (type === SSRComment) {
                        ssr.commentNode(directGetPropsProxyProp(jsx, 'data') || '');
                    }
                    else if (type === SSRStream) {
                        ssr.commentNode(FLUSH_COMMENT);
                        const generator = jsx.children;
                        let value;
                        if (isFunction(generator)) {
                            value = generator({
                                async write(chunk) {
                                    await _walkJSX(ssr, chunk, {
                                        allowPromises: true,
                                        currentStyleScoped: options.styleScoped,
                                        parentComponentFrame: options.parentComponentFrame,
                                    });
                                    ssr.commentNode(FLUSH_COMMENT);
                                },
                            });
                        }
                        else {
                            value = generator;
                        }
                        enqueue(value);
                        isPromise(value) && enqueue(Promise);
                    }
                    else if (type === SSRRaw) {
                        ssr.htmlNode(directGetPropsProxyProp(jsx, 'data'));
                    }
                    else if (isQwikComponent(type)) {
                        // prod: use new instance of an array for props, we always modify props for a component
                        ssr.openComponent(build.isDev ? [DEBUG_TYPE, VirtualType.Component] : []);
                        const host = ssr.getLastNode();
                        const componentFrame = ssr.getParentComponentFrame();
                        componentFrame.distributeChildrenIntoSlots(jsx.children, options.styleScoped, options.parentComponentFrame);
                        const jsxOutput = applyQwikComponentBody(ssr, jsx, type);
                        const compStyleComponentId = addComponentStylePrefix(host.getProp(QScopedStyle));
                        enqueue(new ParentComponentData(options.styleScoped, options.parentComponentFrame));
                        enqueue(ssr.closeComponent);
                        enqueue(jsxOutput);
                        isPromise(jsxOutput) && enqueue(Promise);
                        enqueue(new ParentComponentData(compStyleComponentId, componentFrame));
                    }
                    else {
                        const inlineComponentProps = [ELEMENT_KEY, jsx.key];
                        ssr.openFragment(build.isDev
                            ? [DEBUG_TYPE, VirtualType.InlineComponent, ...inlineComponentProps]
                            : inlineComponentProps);
                        enqueue(ssr.closeFragment);
                        const component = ssr.getComponentFrame(0);
                        const jsxOutput = applyInlineComponent(ssr, component && component.componentNode, type, jsx);
                        enqueue(jsxOutput);
                        isPromise(jsxOutput) && enqueue(Promise);
                    }
                }
            }
        }
    }
    function varPropsToSsrAttrs(varProps, constProps, serializationCtx, styleScopedId, key) {
        return toSsrAttrs(varProps, constProps, serializationCtx, true, styleScopedId, key);
    }
    function constPropsToSsrAttrs(constProps, varProps, serializationCtx, styleScopedId) {
        return toSsrAttrs(constProps, varProps, serializationCtx, false, styleScopedId);
    }
    function toSsrAttrs(record, anotherRecord, serializationCtx, pushMergedEventProps, styleScopedId, key) {
        if (record == null) {
            return null;
        }
        const ssrAttrs = [];
        for (const key in record) {
            let value = record[key];
            if (isJsxPropertyAnEventName(key)) {
                if (anotherRecord) {
                    /**
                     * If we have two sources of the same event like this:
                     *
                     * ```tsx
                     * const Counter = component$((props: { initial: number }) => {
                     *  const count = useSignal(props.initial);
                     *  useOnWindow(
                     *    'dblclick',
                     *    $(() => count.value++)
                     *  );
                     *  return <button window:onDblClick$={() => count.value++}>Count: {count.value}!</button>;
                     * });
                     * ```
                     *
                     * Then we can end with the const and var props with the same (doubled) event. We process
                     * the const and var props separately, so:
                     *
                     * - For the var props we need to merge them into the one value (array)
                     * - For the const props we need to just skip, because we will handle this in the var props
                     */
                    const anotherValue = getEventProp(anotherRecord, key);
                    if (anotherValue) {
                        if (pushMergedEventProps) {
                            // merge values from the const props with the var props
                            value = getMergedEventPropValues(value, anotherValue);
                        }
                        else {
                            continue;
                        }
                    }
                }
                const eventValue = setEvent(serializationCtx, key, value);
                if (eventValue) {
                    ssrAttrs.push(convertEventNameFromJsxPropToHtmlAttr(key), eventValue);
                }
                continue;
            }
            if (isSignal(value)) {
                // write signal as is. We will track this signal inside `writeAttrs`
                if (isClassAttr(key)) {
                    // additionally append styleScopedId for class attr
                    ssrAttrs.push(key, [value, styleScopedId]);
                }
                else {
                    ssrAttrs.push(key, value);
                }
                continue;
            }
            if (isPreventDefault(key)) {
                addPreventDefaultEventToSerializationContext(serializationCtx, key);
            }
            value = serializeAttribute(key, value, styleScopedId);
            ssrAttrs.push(key, value);
        }
        if (key != null) {
            ssrAttrs.push(ELEMENT_KEY, key);
        }
        return ssrAttrs;
    }
    function getMergedEventPropValues(value, anotherValue) {
        let mergedValue = value;
        // merge values from the const props with the var props
        if (Array.isArray(value) && Array.isArray(anotherValue)) {
            // both values are arrays
            mergedValue = value.concat(anotherValue);
        }
        else if (Array.isArray(mergedValue)) {
            // only first value is array
            mergedValue.push(anotherValue);
        }
        else if (Array.isArray(anotherValue)) {
            // only second value is array
            mergedValue = anotherValue;
            mergedValue.push(value);
        }
        else {
            // none of these values are array
            mergedValue = [value, anotherValue];
        }
        return mergedValue;
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
        const appendToValue = (valueToAppend) => {
            value = (value == null ? '' : value + '\n') + valueToAppend;
        };
        if (Array.isArray(qrls)) {
            for (let i = 0; i <= qrls.length; i++) {
                const qrl = qrls[i];
                if (isQrl(qrl)) {
                    appendToValue(qrlToString(serializationCtx, qrl));
                    addQwikEventToSerializationContext(serializationCtx, key, qrl);
                }
                else if (qrl != null) {
                    // nested arrays etc.
                    const nestedValue = setEvent(serializationCtx, key, qrl);
                    if (nestedValue) {
                        appendToValue(nestedValue);
                    }
                }
            }
        }
        else if (isQrl(qrls)) {
            value = qrlToString(serializationCtx, qrls);
            addQwikEventToSerializationContext(serializationCtx, key, qrls);
        }
        return value;
    }
    function addQwikEventToSerializationContext(serializationCtx, key, qrl) {
        const eventName = getEventNameFromJsxProp(key);
        if (eventName) {
            serializationCtx.$eventNames$.add(eventName);
            serializationCtx.$eventQrls$.add(qrl);
        }
    }
    function addPreventDefaultEventToSerializationContext(serializationCtx, key) {
        // skip first 15 chars, this is length of the `preventdefault:`
        const eventName = key.substring(15);
        if (eventName) {
            serializationCtx.$eventNames$.add(eventName);
        }
    }
    function getSlotName(host, jsx, ssr) {
        const constProps = jsx.constProps;
        if (constProps && typeof constProps == 'object' && 'name' in constProps) {
            const constValue = constProps.name;
            if (constValue instanceof WrappedSignal) {
                return trackSignal(() => constValue.value, host, EffectProperty.COMPONENT, ssr);
            }
        }
        return directGetPropsProxyProp(jsx, 'name') || QDefaultSlot;
    }
    function appendQwikInspectorAttribute(jsx) {
        if (build.isDev && qInspector && jsx.dev && jsx.type !== 'head') {
            const sanitizedFileName = jsx.dev.fileName?.replace(/\\/g, '/');
            const qwikInspectorAttr = 'data-qwik-inspector';
            if (sanitizedFileName && (!jsx.constProps || !(qwikInspectorAttr in jsx.constProps))) {
                (jsx.constProps || (jsx.constProps = {}))[qwikInspectorAttr] =
                    `${sanitizedFileName}:${jsx.dev.lineNumber}:${jsx.dev.columnNumber}`;
            }
        }
    }
    // append class attribute if styleScopedId exists and there is no class attribute
    function appendClassIfScopedStyleExists(jsx, styleScoped) {
        const classAttributeExists = directGetPropsProxyProp(jsx, 'class') != null;
        if (!classAttributeExists && styleScoped) {
            if (!jsx.constProps) {
                jsx.constProps = {};
            }
            jsx.constProps['class'] = '';
        }
    }

    /**
     * QWIK_VERSION
     *
     * @public
     */
    const version = "2.0.0-0-dev+1deebe2";

    /** @internal */
    class _SharedContainer {
        constructor(scheduleDrain, journalFlush, serverData, locale) {
            this.$currentUniqueId$ = 0;
            this.$instanceHash$ = null;
            this.$serverData$ = serverData;
            this.$locale$ = locale;
            this.$version$ = version;
            this.$storeProxyMap$ = new WeakMap();
            this.$getObjectById$ = (id) => {
                throw Error('Not implemented');
            };
            this.$scheduler$ = createScheduler(this, scheduleDrain, journalFlush);
        }
        trackSignalValue(signal, subscriber, property, data) {
            return trackSignal(() => signal.value, subscriber, property, this, data);
        }
        serializationCtxFactory(NodeConstructor, symbolToChunkResolver, writer) {
            return createSerializationContext(NodeConstructor, symbolToChunkResolver, this.getHostProp.bind(this), this.setHostProp.bind(this), this.$storeProxyMap$, writer);
        }
    }

    /** @internal */
    const _CONST_PROPS = Symbol('CONST');
    /** @internal */
    const _VAR_PROPS = Symbol('VAR');
    /** @internal @deprecated v1 compat */
    const _IMMUTABLE = Symbol('IMMUTABLE');

    const getProp = (...args) => {
        const obj = args[0];
        const prop = args.length < 2 ? 'value' : args[1];
        return obj[prop];
    };
    const getWrapped = (args) => new WrappedSignal(null, getProp, args, null);
    /**
     * This wraps a property access of a possible Signal/Store into a WrappedSignal. The optimizer does
     * this automatically when a prop is only used as a prop on JSX.
     *
     * When a WrappedSignal is read via the PropsProxy, it will be unwrapped. This allows forwarding the
     * reactivity of a prop to the point of actual use.
     *
     * For efficiency, if you pass only one argument, the property is 'value'.
     *
     * @internal
     */
    const _wrapProp = (...args) => {
        const obj = args[0];
        const prop = args.length < 2 ? 'value' : args[1];
        if (!isObject(obj)) {
            return obj[prop];
        }
        if (isSignal(obj)) {
            assertEqual(prop, 'value', 'Left side is a signal, prop must be value');
            if (obj instanceof WrappedSignal) {
                return obj;
            }
            return getWrapped(args);
        }
        if (isPropsProxy(obj)) {
            const constProps = obj[_CONST_PROPS];
            if (constProps && prop in constProps) {
                // Const props don't need wrapping
                return constProps[prop];
            }
        }
        else {
            const target = getStoreTarget(obj);
            if (target) {
                const value = target[prop];
                const wrappedValue = isSignal(value)
                    ? // If the value is already a signal, we don't need to wrap it again
                        value
                    : getWrapped(args);
                return wrappedValue;
            }
        }
        // We need to forward the access to the original object
        return getWrapped(args);
    };
    /** @internal @deprecated v1 compat */
    const _wrapSignal = (obj, prop) => {
        const r = _wrapProp(obj, prop);
        if (r === _IMMUTABLE) {
            return obj[prop];
        }
        return r;
    };

    /** @internal */
    const _fnSignal = (fn, args, fnStr) => {
        return new WrappedSignal(null, fn, args, fnStr || null);
    };

    /** @file Shared types */
    /** @internal */
    function isStringifiable(value) {
        return (value === null ||
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean');
    }

    /**
     * Create a JSXNode with the properties fully split into variable and constant parts, and children
     * separated out. Furthermore, the varProps must be a sorted object, that is, the keys must be
     * sorted in ascending utf-8 value order.
     *
     * The constant parts are expected to be the same on every render, and are not checked for changes.
     * This means that they are constant scalars or refs. When the ref is a signal or a store, it can
     * still update the attribute on the vnode.
     *
     * @param type - The JSX type
     * @param varProps - The properties of the tag, sorted, excluding children, excluding any constProps
     * @param constProps - The properties of the tag that are known to be constant references and don't
     *   need checking for changes on re-render
     * @param children - JSX children. Any `children` in the props objects are ignored.
     * @internal
     */
    const _jsxSorted = (type, varProps, constProps, children, flags, key, dev) => {
        const processed = key == null ? null : String(key);
        const node = new JSXNodeImpl(type, varProps || {}, constProps || null, children, flags, processed);
        if (qDev && dev) {
            node.dev = {
                stack: new Error().stack,
                ...dev,
            };
        }
        seal(node);
        return node;
    };
    /**
     * Create a JSXNode, with the properties split into variable and constant parts, but the variable
     * parts could include keys from constProps, as well as `key` and `children`.
     *
     * The constant parts are expected to be the same on every render, and are not checked for changes.
     * This means that they are constant scalars or refs. When the ref is a signal or a store, it can
     * still update the attribute on the vnode.
     *
     * If `children` is defined, any `children` in the props will be ignored.
     *
     * @param type - The tag type
     * @param varProps - The properties of the tag that could change, including children
     * @param constProps - The properties of the tag that are known to be static and don't need checking
     *   for changes on re-render
     * @internal
     */
    const _jsxSplit = (type, varProps, constProps, children, flags, key, dev) => {
        let sortedProps;
        if (varProps) {
            // filter and sort
            sortedProps = Object.fromEntries(untrack(() => Object.entries(varProps))
                .filter((entry) => {
                const attr = entry[0];
                if (attr === 'children') {
                    // side-effect!
                    children ?? (children = entry[1]);
                    return false;
                }
                else if (attr === 'key') {
                    key = entry[1];
                    return false;
                }
                return (!constProps ||
                    !(attr in constProps) ||
                    // special case for event handlers, they merge
                    /^on[A-Z].*\$$/.test(attr));
            })
                // sort for fast compare in vNodes
                // keys can never be the same so we don't check for that
                .sort(([a], [b]) => (a < b ? -1 : 1)));
        }
        else {
            sortedProps = typeof type === 'string' ? EMPTY_OBJ : {};
        }
        if (constProps && 'children' in constProps) {
            children = constProps.children;
            constProps.children = undefined;
        }
        return _jsxSorted(type, sortedProps, constProps, children, flags, key, dev);
    };
    /** @internal @deprecated v1 compat */
    const _jsxC = (type, mutable, _flags, key) => jsx(type, mutable, key);
    /** @internal @deprecated v1 compat */
    const _jsxS = (type, mutable, immutable, _flags, key) => jsx(type, { ...immutable, ...mutable }, key);
    /** @internal @deprecated v1 compat */
    const _jsxQ = (type, mutable, immutable, children, _flags, key) => jsx(type, { ...immutable, ...mutable, children }, key);
    /**
     * @public
     * Used by the JSX transpilers to create a JSXNode.
     * Note that the optimizer will not use this, instead using _jsxSplit and _jsxSorted directly.
     */
    const jsx = (type, props, key) => {
        return _jsxSplit(type, props, null, null, 0, key || null);
    };
    const flattenArray = (array, dst) => {
        // Yes this function is just Array.flat, but we need to run on old versions of Node.
        if (!dst) {
            dst = [];
        }
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
     * The legacy transform, used in special cases like `<div {...props} key="key" />`. Note that the
     * children are spread arguments, instead of a prop like in jsx() calls.
     *
     * Also note that this disables optimizations.
     *
     * @public
     */
    function h(type, props, ...children) {
        const normalizedProps = {
            children: arguments.length > 2 ? flattenArray(children) : null,
        };
        let key = null;
        for (const i in props) {
            if (i == 'key') {
                key = props[i];
            }
            else {
                normalizedProps[i] = props[i];
            }
        }
        if (typeof type === 'string' && !key && 'dangerouslySetInnerHTML' in normalizedProps) {
            key = 'innerhtml';
        }
        return _jsxSplit(type, props, null, normalizedProps.children, 0, key);
    }
    const isPropsProxy = (obj) => {
        return obj && obj[_VAR_PROPS] !== undefined;
    };
    class JSXNodeImpl {
        constructor(type, varProps, constProps, children, flags, key = null) {
            this.type = type;
            this.varProps = varProps;
            this.constProps = constProps;
            this.children = children;
            this.flags = flags;
            this.key = key;
            this._proxy = null;
            if (qDev) {
                if (typeof varProps !== 'object') {
                    throw new Error(`JSXNodeImpl: varProps must be objects: ` + JSON.stringify(varProps));
                }
                if (typeof constProps !== 'object') {
                    throw new Error(`JSXNodeImpl: constProps must be objects: ` + JSON.stringify(constProps));
                }
            }
        }
        get props() {
            // We use a proxy to merge the constProps if they exist and to evaluate derived signals
            if (!this._proxy) {
                this._proxy = createPropsProxy(this.varProps, this.constProps, this.children);
            }
            return this._proxy;
        }
    }
    /** @private */
    const Virtual = (props) => props.children;
    /** @public */
    const RenderOnce = (props, key) => {
        return new JSXNodeImpl(Virtual, EMPTY_OBJ, null, props.children, 2, key);
    };
    /** @internal */
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
    /** @public */
    const Fragment = (props) => props.children;
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
        seal(node);
        return node;
    };
    function createPropsProxy(varProps, constProps, children) {
        return new Proxy({}, new PropsProxyHandler(varProps, constProps, children));
    }
    class PropsProxyHandler {
        constructor($varProps$, $constProps$, $children$) {
            this.$varProps$ = $varProps$;
            this.$constProps$ = $constProps$;
            this.$children$ = $children$;
        }
        get(_, prop) {
            // escape hatch to get the separated props from a component
            if (prop === _CONST_PROPS) {
                return this.$constProps$;
            }
            if (prop === _VAR_PROPS) {
                return this.$varProps$;
            }
            if (this.$children$ != null && prop === 'children') {
                return this.$children$;
            }
            const value = this.$constProps$ && prop in this.$constProps$
                ? this.$constProps$[prop]
                : this.$varProps$[prop];
            // a proxied value that the optimizer made
            return value instanceof WrappedSignal ? value.value : value;
        }
        set(_, prop, value) {
            if (prop === _CONST_PROPS) {
                this.$constProps$ = value;
                return true;
            }
            if (prop === _VAR_PROPS) {
                this.$varProps$ = value;
                return true;
            }
            if (this.$constProps$ && prop in this.$constProps$) {
                this.$constProps$[prop] = value;
            }
            else {
                this.$varProps$[prop] = value;
            }
            return true;
        }
        deleteProperty(_, prop) {
            if (typeof prop !== 'string') {
                return false;
            }
            let didDelete = delete this.$varProps$[prop];
            if (this.$constProps$) {
                didDelete = delete this.$constProps$[prop] || didDelete;
            }
            if (this.$children$ != null && prop === 'children') {
                this.$children$ = null;
            }
            return didDelete;
        }
        has(_, prop) {
            const hasProp = (prop === 'children' && this.$children$ != null) ||
                prop === _CONST_PROPS ||
                prop === _VAR_PROPS ||
                prop in this.$varProps$ ||
                (this.$constProps$ ? prop in this.$constProps$ : false);
            return hasProp;
        }
        getOwnPropertyDescriptor(target, p) {
            const value = p === 'children' && this.$children$ != null
                ? this.$children$
                : this.$constProps$ && p in this.$constProps$
                    ? this.$constProps$[p]
                    : this.$varProps$[p];
            return {
                configurable: true,
                enumerable: true,
                value: value,
            };
        }
        ownKeys() {
            const out = Object.keys(this.$varProps$);
            if (this.$children$ != null && out.indexOf('children') === -1) {
                out.push('children');
            }
            if (this.$constProps$) {
                for (const key in this.$constProps$) {
                    if (out.indexOf(key) === -1) {
                        out.push(key);
                    }
                }
            }
            return out;
        }
    }
    /**
     * Instead of using PropsProxyHandler getter (which could create a component-level subscription).
     * Use this function to get the props directly from a const or var props.
     */
    const directGetPropsProxyProp = (jsx, prop) => {
        return (jsx.constProps && prop in jsx.constProps ? jsx.constProps[prop] : jsx.varProps[prop]);
    };

    const stringifyPath = [];
    function qwikDebugToString(value) {
        if (value === null) {
            return 'null';
        }
        else if (value === undefined) {
            return 'undefined';
        }
        else if (typeof value === 'string') {
            return '"' + value + '"';
        }
        else if (typeof value === 'number' || typeof value === 'boolean') {
            return String(value);
        }
        else if (isTask(value)) {
            return `Task(${qwikDebugToString(value.$qrl$)})`;
        }
        else if (isQrl$1(value)) {
            return `Qrl(${value.$symbol$})`;
        }
        else if (typeof value === 'object' || typeof value === 'function') {
            if (stringifyPath.includes(value)) {
                return '*';
            }
            try {
                stringifyPath.push(value);
                if (Array.isArray(value)) {
                    if (vnode_isVNode(value)) {
                        return '(' + vnode_getProp(value, DEBUG_TYPE, null) + ')';
                    }
                    else {
                        return value.map(qwikDebugToString);
                    }
                }
                else if (isSignal(value)) {
                    if (value instanceof WrappedSignal) {
                        return 'WrappedSignal';
                    }
                    else if (value instanceof ComputedSignal) {
                        return 'ComputedSignal';
                    }
                    else {
                        return 'Signal';
                    }
                }
                else if (isStore(value)) {
                    return 'Store';
                }
                else if (isJSXNode(value)) {
                    return jsxToString(value);
                }
            }
            finally {
                stringifyPath.pop();
            }
        }
        return value;
    }
    const pad = (text, prefix) => {
        return String(text)
            .split('\n')
            .map((line, idx) => (idx ? prefix : '') + line)
            .join('\n');
    };
    const jsxToString = (value) => {
        if (isJSXNode(value)) {
            let type = value.type;
            if (typeof type === 'function') {
                type = type.name || 'Component';
            }
            let str = '<' + value.type;
            if (value.props) {
                for (const [key, val] of Object.entries(value.props)) {
                    str += ' ' + key + '=' + qwikDebugToString(val);
                }
                const children = value.children;
                if (children != null) {
                    str += '>';
                    if (Array.isArray(children)) {
                        children.forEach((child) => {
                            str += jsxToString(child);
                        });
                    }
                    else {
                        str += jsxToString(children);
                    }
                    str += '</' + value.type + '>';
                }
                else {
                    str += '/>';
                }
            }
            return str;
        }
        else {
            return String(value);
        }
    };

    /**
     * @file
     *
     *   VNodeData is additional information which allows the `vnode` to recover virtual VNode information
     *   from the HTML.
     */
    /**
     * VNodeDataSeparator contains information about splitting up the VNodeData and attaching it to the
     * HTML.
     */
    const VNodeDataSeparator = {
        REFERENCE_CH: /* ***** */ `~`, // `~` is a reference to the node. Save it.
        REFERENCE: /* ******** */ 126, // `~` is a reference to the node. Save it.
        ADVANCE_1_CH: /* ***** */ `!`, // `!` is vNodeData separator skipping 0. (ie next vNode)
        ADVANCE_1: /* ********* */ 33, // `!` is vNodeData separator skipping 0. (ie next vNode)
        ADVANCE_2_CH: /* ***** */ `"`, // `"` is vNodeData separator skipping 1.
        ADVANCE_2: /* ********* */ 34, // `"` is vNodeData separator skipping 1.
        ADVANCE_4_CH: /* ***** */ `#`, // `#` is vNodeData separator skipping 2.
        ADVANCE_4: /* ********* */ 35, // `#` is vNodeData separator skipping 2.
        ADVANCE_8_CH: /* ***** */ `$`, // `$` is vNodeData separator skipping 4.
        ADVANCE_8: /* ********* */ 36, // `$` is vNodeData separator skipping 4.
        ADVANCE_16_CH: /* **** */ `%`, // `%` is vNodeData separator skipping 8.
        ADVANCE_16: /* ******** */ 37, // `%` is vNodeData separator skipping 8.
        ADVANCE_32_CH: /* **** */ `&`, // `&` is vNodeData separator skipping 16.
        ADVANCE_32: /* ******** */ 38, // `&` is vNodeData separator skipping 16.
        ADVANCE_64_CH: /* **** */ `'`, // `'` is vNodeData separator skipping 32.
        ADVANCE_64: /* ******** */ 39, // `'` is vNodeData separator skipping 32.
        ADVANCE_128_CH: /* *** */ `(`, // `(` is vNodeData separator skipping 64.
        ADVANCE_128: /* ******* */ 40, // `(` is vNodeData separator skipping 64.
        ADVANCE_256_CH: /* *** */ `)`, // `)` is vNodeData separator skipping 128.
        ADVANCE_256: /* ******* */ 41, // `)` is vNodeData separator skipping 128.
        ADVANCE_512_CH: /* *** */ `*`, // `*` is vNodeData separator skipping 256.
        ADVANCE_512: /* ******* */ 42, // `*` is vNodeData separator skipping 256.
        ADVANCE_1024_CH: /* ** */ `+`, // `+` is vNodeData separator skipping 512.
        ADVANCE_1024: /* ****** */ 43, // `+` is vNodeData separator skipping 512.
        ADVANCE_2048_CH: /* *  */ ',', // ',' is vNodeData separator skipping 1024.
        ADVANCE_2048: /* ****** */ 44, // ',' is vNodeData separator skipping 1024.
        ADVANCE_4096_CH: /* *  */ `-`, // `-` is vNodeData separator skipping 2048.
        ADVANCE_4096: /* ****** */ 45, // `-` is vNodeData separator skipping 2048.
        ADVANCE_8192_CH: /* *  */ `.`, // `.` is vNodeData separator skipping 4096.
        ADVANCE_8192: /* ****** */ 46, // `.` is vNodeData separator skipping 4096.
    };
    /** VNodeDataChar contains information about the VNodeData used for encoding props */
    const VNodeDataChar = {
        OPEN: /* ************** */ 123, // `{` is the start of the VNodeData.
        OPEN_CHAR: /* ****** */ '{',
        CLOSE: /* ************* */ 125, // `}` is the end of the VNodeData.
        CLOSE_CHAR: /* ***** */ '}',
        SCOPED_STYLE: /* ******* */ 59, // `;` - `q:sstyle` - Style attribute.
        SCOPED_STYLE_CHAR: /* */ ';',
        RENDER_FN: /* ********** */ 60, // `<` - `q:renderFn' - Component QRL render function (body)
        RENDER_FN_CHAR: /* ** */ '<',
        ID: /* ***************** */ 61, // `=` - `q:id` - ID of the element.
        ID_CHAR: /* ********* */ '=',
        PROPS: /* ************** */ 62, // `>` - `q:props' - Component Props
        PROPS_CHAR: /* ****** */ '>',
        SLOT_REF: /* *********** */ 63, // `?` - `q:sref` - Slot reference.
        SLOT_REF_CHAR: /* *** */ '?',
        KEY: /* **************** */ 64, // `@` - `q:key` - Element key.
        KEY_CHAR: /* ******** */ '@',
        SEQ: /* **************** */ 91, // `[` - `q:seq' - Seq value from `useSequentialScope()`
        SEQ_CHAR: /* ******** */ '[',
        DON_T_USE: /* ********** */ 93, // `\` - SKIP because `\` is used as escaping
        DON_T_USE_CHAR: '\\',
        CONTEXT: /* ************ */ 93, // `]` - `q:ctx' - Component context/props
        CONTEXT_CHAR: /* **** */ ']',
        SEQ_IDX: /* ************ */ 94, // `^` - `q:seqIdx' - Sequential scope id
        SEQ_IDX_CHAR: /* **** */ '^',
        SEPARATOR: /* ********* */ 124, // `|` - Separator char to encode any key/value pairs.
        SEPARATOR_CHAR: /* ** */ '|',
        SLOT: /* ************** */ 126, // `~` - `q:slot' - Slot name
        SLOT_CHAR: /* ******* */ '~',
    };

    /**
     * @file
     *
     *   VNode is a DOM like API for walking the DOM but it:
     *
     *   1. Encodes virtual nodes which don't exist in the DOM
     *   2. Can serialize as part of SSR and than deserialize on the client.
     *
     *   # Virtual
     *
     *   You can think of a Virtual node just like an additional `<div>` in that it groups related child
     *   nodes together. But unlike a `<div>` which has a real DOM node and hence implications for CSS,
     *   Virtual nodes have no DOM impact, they are invisible.
     *
     *   # Portal
     *
     *   Two Virtual nodes can be linked together to form a Portal. Portals are useful for projecting
     *   content or just rendering content in a different location in the tree, while maintaining a
     *   logical relationship.
     *
     *   Portals have:
     *
     *   - Portal Source: A Virtual node which can refer to one ore more Destination Portals by name.
     *   - Destination Portal: A Virtual node which acts as a destination but also has a pointer back to the
     *       Portal Source
     *
     *   ## Example:
     *
     *   Given this code:
     *
     *   ```typescript
     *   const Parent = component$(() => {
     *     return (
     *       <Child>
     *         Projection Content
     *         <span q:slot="secondary">Secondary Content</span>
     *         <span q:slot="other">Other Content</span>
     *       </Child>
     *     };
     *   });
     *
     *   const Child = component$(() => {
     *     return (
     *       <div>
     *         <Slot>Default Primary</Slot>
     *         <Slot name="secondary">Default Secondary</Slot>
     *       </div>
     *     );
     *   });
     *
     *   render(<body><main><Parent/></main><body>);
     * ```
     *
     *   Will render like so:
     *
     *   ```html
     *   <body>
     *     <main>
     *       <Virtual Parent q:portal=":3A;secondary:3B;other:5A" q:id="2A">
     *         <Virtual Child>
     *           <div>
     *             <Virtual Slot q:id="3A" q:portal="^:2A;:3A"> Projection Content </Virtual>
     *             <Virtual Slot q:id="3B" q:portal="^:2A;:3B">
     *               <span q:slot="secondary">Secondary Content</span>
     *             </Virtual>
     *           </div>
     *         </Virtual>
     *       </Virtual>
     *     </main>
     *     <q:template>
     *       <Virtual q:portal="^:2A" q:id="5A">
     *         <span q:slot="other">Other Content</span>
     *       </Virtual>
     *       <Virtual q:portal="^:2A" q:id="3A">
     *         Default Primary
     *       </Virtual>
     *       <Virtual q:portal="^:2A" q:id="3B">
     *         Default Secondary
     *       </Virtual>
     *     <q:template>
     *   </body>
     * ```
     *
     *   Explanation:
     *
     *   - `q:portal=":3A;secondary:3B;other:5A"`
     *
     *       - Name: ``; Ref: `3A` - Where the default content went.
     *       - Name: `secondary`; Ref: `3B` - Where the 'secondary' content went.
     *       - Name: `other`; Ref: `%A` - Where the `other` content went. (Notice in this case the content is
     *               left over and os it ends up en the `q:templates`. We can share one '<q:template>`
     *               for all left over content.)
     *   - `q:portal="^:2A;:3A"`
     *
     *       - Name: `^`; Ref: `2A` - Special pointer to the parent portal
     *       - Name: ``; Ref: `3A` - Location of the default content in case there is nothing projected here.
     *
     *   ## Rendering
     *
     *   During SSR, the rendered can delay rendering the JSX nodes until correct portal comes up. The ID
     *   system is already can make lazy references to the Nodes.
     *
     *   Client side rendering does not need to deal with IDs or `<q:template>` as un-rendered vNodes do
     *   not need to be serialized into DOM, and can remain on heap.
     *
     *   ## Context
     *
     *   When looking up context it is possible to follow you real render parents or follow the portals.
     *   All information is encoded in the portals.
     *
     *   ## Slot Projection
     *
     *   The ultimate user of portals is Slot projection. But the vNode do not understand slots, rather
     *   they understand portal primitives which makes Slot implementation much simpler.
     *
     *   NOTE: The portals need to have IDs during serialization only. Once runtime takes over, there is
     *   no need to have IDs or to write overflow to the `<q:template>`
     */
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Fundamental DOM operations are:
     *
     * - Insert new DOM element/text
     * - Remove DOM element/text
     * - Set DOM element attributes
     * - Set text node value
     */
    var VNodeJournalOpCode;
    (function (VNodeJournalOpCode) {
        VNodeJournalOpCode[VNodeJournalOpCode["SetText"] = 1] = "SetText";
        VNodeJournalOpCode[VNodeJournalOpCode["SetAttribute"] = 2] = "SetAttribute";
        VNodeJournalOpCode[VNodeJournalOpCode["HoistStyles"] = 3] = "HoistStyles";
        VNodeJournalOpCode[VNodeJournalOpCode["Remove"] = 4] = "Remove";
        VNodeJournalOpCode[VNodeJournalOpCode["Insert"] = 5] = "Insert";
    })(VNodeJournalOpCode || (VNodeJournalOpCode = {}));
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const vnode_newElement = (element, elementName) => {
        assertEqual(fastNodeType(element), 1 /* ELEMENT_NODE */, 'Expecting element node.');
        const vnode = VNodeArray.createElement(VNodeFlags.Element | VNodeFlags.Inflated | (-1 << VNodeFlagsIndex.shift), // Flag
        null, null, null, null, null, element, elementName);
        assertTrue(vnode_isElementVNode(vnode), 'Incorrect format of ElementVNode.');
        assertFalse(vnode_isTextVNode(vnode), 'Incorrect format of ElementVNode.');
        assertFalse(vnode_isVirtualVNode(vnode), 'Incorrect format of ElementVNode.');
        return vnode;
    };
    const vnode_newUnMaterializedElement = (element) => {
        assertEqual(fastNodeType(element), 1 /* ELEMENT_NODE */, 'Expecting element node.');
        const vnode = VNodeArray.createElement(VNodeFlags.Element | (-1 << VNodeFlagsIndex.shift), // Flag
        null, null, null, undefined, undefined, element, undefined);
        assertTrue(vnode_isElementVNode(vnode), 'Incorrect format of ElementVNode.');
        assertFalse(vnode_isTextVNode(vnode), 'Incorrect format of ElementVNode.');
        assertFalse(vnode_isVirtualVNode(vnode), 'Incorrect format of ElementVNode.');
        return vnode;
    };
    const vnode_newSharedText = (previousTextNode, sharedTextNode, textContent) => {
        sharedTextNode &&
            assertEqual(fastNodeType(sharedTextNode), 3 /* TEXT_NODE */, 'Expecting element node.');
        const vnode = VNodeArray.createText(VNodeFlags.Text | (-1 << VNodeFlagsIndex.shift), // Flag
        null, // Parent
        previousTextNode, // Previous TextNode (usually first child)
        null, // Next sibling
        sharedTextNode, // SharedTextNode
        textContent // Text Content
        );
        assertFalse(vnode_isElementVNode(vnode), 'Incorrect format of TextVNode.');
        assertTrue(vnode_isTextVNode(vnode), 'Incorrect format of TextVNode.');
        assertFalse(vnode_isVirtualVNode(vnode), 'Incorrect format of TextVNode.');
        return vnode;
    };
    const vnode_newText = (textNode, textContent) => {
        const vnode = VNodeArray.createText(VNodeFlags.Text | VNodeFlags.Inflated | (-1 << VNodeFlagsIndex.shift), // Flags
        null, // Parent
        null, // No previous sibling
        null, // We may have a next sibling.
        textNode, // TextNode
        textContent // Text Content
        );
        assertEqual(fastNodeType(textNode), 3 /* TEXT_NODE */, 'Expecting element node.');
        assertFalse(vnode_isElementVNode(vnode), 'Incorrect format of TextVNode.');
        assertTrue(vnode_isTextVNode(vnode), 'Incorrect format of TextVNode.');
        assertFalse(vnode_isVirtualVNode(vnode), 'Incorrect format of TextVNode.');
        return vnode;
    };
    const vnode_newVirtual = () => {
        const vnode = VNodeArray.createVirtual(VNodeFlags.Virtual | (-1 << VNodeFlagsIndex.shift), // Flags
        null, null, null, null, null);
        assertFalse(vnode_isElementVNode(vnode), 'Incorrect format of TextVNode.');
        assertFalse(vnode_isTextVNode(vnode), 'Incorrect format of TextVNode.');
        assertTrue(vnode_isVirtualVNode(vnode), 'Incorrect format of TextVNode.');
        return vnode;
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const vnode_isVNode = (vNode) => {
        return vNode instanceof VNodeArray;
    };
    const vnode_isElementVNode = (vNode) => {
        assertDefined(vNode, 'Missing vNode');
        const flag = vNode[VNodeProps.flags];
        return (flag & VNodeFlags.Element) === VNodeFlags.Element;
    };
    const vnode_isElementOrTextVNode = (vNode) => {
        assertDefined(vNode, 'Missing vNode');
        const flag = vNode[VNodeProps.flags];
        return (flag & VNodeFlags.ELEMENT_OR_TEXT_MASK) !== 0;
    };
    const vnode_isMaterialized = (vNode) => {
        assertDefined(vNode, 'Missing vNode');
        const flag = vNode[VNodeProps.flags];
        return ((flag & VNodeFlags.Element) === VNodeFlags.Element &&
            vNode[ElementVNodeProps.firstChild] !== undefined &&
            vNode[ElementVNodeProps.lastChild] !== undefined);
    };
    const vnode_isTextVNode = (vNode) => {
        assertDefined(vNode, 'Missing vNode');
        const flag = vNode[VNodeProps.flags];
        return (flag & VNodeFlags.Text) === VNodeFlags.Text;
    };
    const vnode_isVirtualVNode = (vNode) => {
        assertDefined(vNode, 'Missing vNode');
        const flag = vNode[VNodeProps.flags];
        return (flag & VNodeFlags.Virtual) === VNodeFlags.Virtual;
    };
    const ensureTextVNode = (vNode) => {
        assertTrue(vnode_isTextVNode(vNode), 'Expecting TextVNode was: ' + vnode_getNodeTypeName(vNode));
        return vNode;
    };
    const ensureElementOrVirtualVNode = (vNode) => {
        assertDefined(vNode, 'Missing vNode');
        assertTrue((vNode[VNodeProps.flags] & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK) !== 0, 'Expecting ElementVNode or VirtualVNode was: ' + vnode_getNodeTypeName(vNode));
    };
    const ensureElementVNode = (vNode) => {
        assertTrue(vnode_isElementVNode(vNode), 'Expecting ElementVNode was: ' + vnode_getNodeTypeName(vNode));
        return vNode;
    };
    const vnode_getNodeTypeName = (vNode) => {
        if (vNode) {
            const flags = vNode[VNodeProps.flags];
            switch (flags & VNodeFlags.TYPE_MASK) {
                case VNodeFlags.Element:
                    return 'Element';
                case VNodeFlags.Virtual:
                    return 'Virtual';
                case VNodeFlags.Text:
                    return 'Text';
            }
        }
        return '<unknown>';
    };
    const vnode_ensureElementInflated = (vnode) => {
        const flags = vnode[VNodeProps.flags];
        if ((flags & VNodeFlags.INFLATED_TYPE_MASK) === VNodeFlags.Element) {
            const elementVNode = vnode;
            elementVNode[VNodeProps.flags] ^= VNodeFlags.Inflated;
            const element = elementVNode[ElementVNodeProps.element];
            const attributes = element.attributes;
            for (let idx = 0; idx < attributes.length; idx++) {
                const attr = attributes[idx];
                const key = attr.name;
                if (key == Q_PROPS_SEPARATOR || !key) {
                    // SVG in Domino does not support ':' so it becomes an empty string.
                    // all attributes after the ':' are considered immutable, and so we ignore them.
                    break;
                }
                else if (key.startsWith(QContainerAttr)) {
                    if (attr.value === QContainerValue.HTML) {
                        mapArray_set(elementVNode, dangerouslySetInnerHTML, element.innerHTML, ElementVNodeProps.PROPS_OFFSET);
                    }
                    else if (attr.value === QContainerValue.TEXT && 'value' in element) {
                        mapArray_set(elementVNode, 'value', element.value, ElementVNodeProps.PROPS_OFFSET);
                    }
                }
                else if (!key.startsWith('on:')) {
                    const value = attr.value;
                    mapArray_set(elementVNode, key, value, ElementVNodeProps.PROPS_OFFSET);
                }
            }
        }
    };
    /** Walks the VNode tree and materialize it using `vnode_getFirstChild`. */
    function vnode_walkVNode(vNode, callback) {
        let vCursor = vNode;
        // Depth first traversal
        if (vnode_isTextVNode(vNode)) {
            // Text nodes don't have subscriptions or children;
            return;
        }
        let vParent = null;
        do {
            const vFirstChild = vnode_getFirstChild(vCursor);
            if (vFirstChild) {
                vCursor = vFirstChild;
                continue;
            }
            // Out of children
            if (vCursor === vNode) {
                // we are where we started, this means that vNode has no children, so we are done.
                return;
            }
            // Out of children, go to next sibling
            const vNextSibling = vnode_getNextSibling(vCursor);
            if (vNextSibling) {
                vCursor = vNextSibling;
                continue;
            }
            // Out of siblings, go to parent
            vParent = vnode_getParent(vCursor);
            while (vParent) {
                if (vParent === vNode) {
                    // We are back where we started, we are done.
                    return;
                }
                const vNextParentSibling = vnode_getNextSibling(vParent);
                if (vNextParentSibling) {
                    vCursor = vNextParentSibling;
                    break;
                }
                vParent = vnode_getParent(vParent);
            }
            if (vParent == null) {
                // We are done.
                return;
            }
        } while (true);
    }
    function vnode_getDOMChildNodes(journal, root, isVNode = false, childNodes = []) {
        if (vnode_isElementOrTextVNode(root)) {
            if (vnode_isTextVNode(root)) {
                /**
                 * If we are collecting text nodes, we need to ensure that they are inflated. If not inflated
                 * we would return a single text node which represents many actual text nodes, or removing a
                 * single text node would remove many text nodes.
                 */
                vnode_ensureTextInflated(journal, root);
            }
            childNodes.push(isVNode ? root : vnode_getNode(root));
            return childNodes;
        }
        let vNode = vnode_getFirstChild(root);
        while (vNode) {
            if (vnode_isElementVNode(vNode)) {
                childNodes.push(isVNode ? vNode : vnode_getNode(vNode));
            }
            else if (vnode_isTextVNode(vNode)) {
                /**
                 * If we are collecting text nodes, we need to ensure that they are inflated. If not inflated
                 * we would return a single text node which represents many actual text nodes, or removing a
                 * single text node would remove many text nodes.
                 */
                vnode_ensureTextInflated(journal, vNode);
                childNodes.push(isVNode ? vNode : vnode_getNode(vNode));
            }
            else {
                isVNode
                    ? vnode_getDOMChildNodes(journal, vNode, true, childNodes)
                    : vnode_getDOMChildNodes(journal, vNode, false, childNodes);
            }
            vNode = vnode_getNextSibling(vNode);
        }
        return childNodes;
    }
    /**
     * Returns the previous/next sibling but from the point of view of the DOM.
     *
     * Given:
     *
     * ```
     * <div>
     *   <>a</>
     *   <>
     *     <></>
     *     <>b</>
     *     <></>
     *   </>
     *   <>c</>
     * </div>
     * ```
     *
     * Then:
     *
     * - Next: if we start at `a` the next DOM sibling is `b`, than `c`.
     * - Previous: if we start at `c` the next DOM sibling is `b`, than `a`.
     *
     * @param vNode - Starting node
     * @param nextDirection - Direction to search true=next, false=previous
     * @param descend - If true, than we will descend into the children first.
     * @returns
     */
    const vnode_getDomSibling = (vNode, nextDirection, descend) => {
        const childProp = nextDirection ? VirtualVNodeProps.firstChild : VirtualVNodeProps.lastChild;
        const siblingProp = nextDirection ? VNodeProps.nextSibling : VNodeProps.previousSibling;
        let cursor = vNode;
        // first make sure we have a DOM node or no children.
        while (descend && cursor && vnode_isVirtualVNode(cursor)) {
            const child = cursor[childProp];
            if (!child) {
                break;
            }
            if (child[VNodeProps.flags] & VNodeFlags.ELEMENT_OR_TEXT_MASK) {
                return child;
            }
            cursor = child;
        }
        while (cursor) {
            // Look at the previous/next sibling.
            let sibling = cursor[siblingProp];
            if (sibling && sibling[VNodeProps.flags] & VNodeFlags.ELEMENT_OR_TEXT_MASK) {
                // we found a previous/next DOM node, return it.
                return sibling;
            }
            else if (!sibling) {
                // If we don't have a sibling than walk up the tree until you find one.
                let virtual = cursor[VNodeProps.parent];
                if (virtual && !vnode_isVirtualVNode(virtual)) {
                    return null;
                }
                while (virtual && !(sibling = virtual[siblingProp])) {
                    virtual = virtual[VNodeProps.parent];
                    if (virtual && !vnode_isVirtualVNode(virtual)) {
                        // the parent node is not virtual, so we are done here.
                        return null;
                    }
                }
                if (!sibling) {
                    // If we did not find a sibling, than we are done.
                    return null;
                }
                if (vnode_isTextVNode(sibling) && virtual && vnode_isElementVNode(virtual)) {
                    // sibling to the real element is a text node, this is not a sibling
                    return null;
                }
            }
            // At this point `sibling` is a next node to look at.
            // Next step is to descend until we find a DOM done.
            while (sibling) {
                cursor = sibling;
                if (cursor[VNodeProps.flags] & VNodeFlags.ELEMENT_OR_TEXT_MASK && vnode_getNode(cursor)) {
                    // we have to check that we actually have a node, because it could be a text node which is
                    // zero length and which does not have a representation in the DOM.
                    return cursor;
                }
                sibling = cursor[childProp];
            }
            // If we are here we did not find anything and we need to go up the tree again.
        }
        return null;
    };
    const vnode_ensureInflatedIfText = (journal, vNode) => {
        if (vnode_isTextVNode(vNode)) {
            vnode_ensureTextInflated(journal, vNode);
        }
    };
    const vnode_ensureTextInflated = (journal, vnode) => {
        const textVNode = ensureTextVNode(vnode);
        const flags = textVNode[VNodeProps.flags];
        if ((flags & VNodeFlags.Inflated) === 0) {
            const parentNode = vnode_getDomParent(vnode);
            const sharedTextNode = textVNode[TextVNodeProps.node];
            const doc = parentNode.ownerDocument;
            // Walk the previous siblings and inflate them.
            let cursor = vnode_getDomSibling(vnode, false, true);
            // If text node is 0 length, than there is no text node.
            // In that case we use the next node as a reference, in which
            // case we know that the next node MUST be either NULL or an Element.
            const insertBeforeNode = sharedTextNode ||
                (vnode_getDomSibling(vnode, true, true)?.[ElementVNodeProps.element] || null);
            let lastPreviousTextNode = insertBeforeNode;
            while (cursor && vnode_isTextVNode(cursor)) {
                if ((cursor[VNodeProps.flags] & VNodeFlags.Inflated) === 0) {
                    const textNode = doc.createTextNode(cursor[TextVNodeProps.text]);
                    journal.push(VNodeJournalOpCode.Insert, parentNode, lastPreviousTextNode, textNode);
                    lastPreviousTextNode = textNode;
                    cursor[TextVNodeProps.node] = textNode;
                    cursor[VNodeProps.flags] |= VNodeFlags.Inflated;
                }
                cursor = vnode_getDomSibling(cursor, false, true);
            }
            // Walk the next siblings and inflate them.
            cursor = vnode;
            while (cursor && vnode_isTextVNode(cursor)) {
                const next = vnode_getDomSibling(cursor, true, true);
                const isLastNode = next ? !vnode_isTextVNode(next) : true;
                if ((cursor[VNodeProps.flags] & VNodeFlags.Inflated) === 0) {
                    if (isLastNode && sharedTextNode) {
                        journal.push(VNodeJournalOpCode.SetText, sharedTextNode, cursor[TextVNodeProps.text]);
                    }
                    else {
                        const textNode = doc.createTextNode(cursor[TextVNodeProps.text]);
                        journal.push(VNodeJournalOpCode.Insert, parentNode, insertBeforeNode, textNode);
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
        const { qVNodeRefs } = containerElement;
        let elementOffset = -1;
        let refElement;
        if (typeof id === 'string') {
            assertDefined(qVNodeRefs, 'Missing qVNodeRefs.');
            elementOffset = parseInt(id);
            refElement = qVNodeRefs.get(elementOffset);
        }
        else {
            refElement = id;
        }
        assertDefined(refElement, 'Missing refElement.');
        if (!vnode_isVNode(refElement)) {
            assertTrue(containerElement.contains(refElement), `Couldn't find the element inside the container while locating the VNode.`);
            // We need to find the vnode.
            let parent = refElement;
            const elementPath = [refElement];
            while (parent && parent !== containerElement) {
                parent = parent.parentElement;
                elementPath.push(parent);
            }
            // Start at rootVNode and follow the `elementPath` to find the vnode.
            for (let i = elementPath.length - 2; i >= 0; i--) {
                vNode = vnode_getVNodeForChildNode(vNode, elementPath[i]);
            }
            elementOffset != -1 && qVNodeRefs.set(elementOffset, vNode);
        }
        else {
            vNode = refElement;
        }
        if (typeof id === 'string') {
            // process virtual node search.
            const idLength = id.length;
            let idx = indexOfAlphanumeric(id, idLength);
            let childIdx = 0;
            while (idx < idLength) {
                const ch = id.charCodeAt(idx);
                childIdx *= 26 /* a-z */;
                if (ch >= 97 /* a */) {
                    // is lowercase
                    childIdx += ch - 97 /* a */;
                }
                else {
                    // is uppercase
                    childIdx += ch - 65 /* A */;
                    vNode = vnode_getChildWithIdx(vNode, childIdx);
                    childIdx = 0;
                }
                idx++;
            }
        }
        return vNode;
    };
    const vnode_getChildWithIdx = (vNode, childIdx) => {
        let child = vnode_getFirstChild(vNode);
        assertDefined(child, 'Missing child.');
        while (child[VNodeProps.flags] >>> VNodeFlagsIndex.shift !== childIdx) {
            child = vnode_getNextSibling(child);
            assertDefined(child, 'Missing child.');
        }
        return child;
    };
    const vNodeStack = [];
    const vnode_getVNodeForChildNode = (vNode, childElement) => {
        ensureElementVNode(vNode);
        let child = vnode_getFirstChild(vNode);
        assertDefined(child, 'Missing child.');
        // console.log(
        //   'SEARCHING',
        //   child[VNodeProps.flags],
        //   child[VNodeProps.node]?.outerHTML,
        //   childNode.outerHTML
        // );
        while (child && child[ElementVNodeProps.element] !== childElement) {
            // console.log('CHILD', child[VNodeProps.node]?.outerHTML, childNode.outerHTML);
            if (vnode_isVirtualVNode(child)) {
                const next = vnode_getNextSibling(child);
                const firstChild = vnode_getFirstChild(child);
                if (firstChild) {
                    next && vNodeStack.push(next);
                    child = firstChild;
                }
                else {
                    child = next || (vNodeStack.length ? vNodeStack.pop() : null);
                }
            }
            else {
                const next = vnode_getNextSibling(child);
                if (next) {
                    child = next;
                }
                else {
                    child = next || vNodeStack.pop();
                }
            }
            assertDefined(child, 'Missing child.');
        }
        while (vNodeStack.length) {
            vNodeStack.pop();
        }
        ensureElementVNode(child);
        assertEqual(child[ElementVNodeProps.element], childElement, 'Child not found.');
        // console.log('FOUND', child[VNodeProps.node]?.outerHTML);
        return child;
    };
    const indexOfAlphanumeric = (id, length) => {
        let idx = 0;
        while (idx < length) {
            if (id.charCodeAt(idx) <= 57 /* 9 */) {
                idx++;
            }
            else {
                return idx;
            }
        }
        return length;
    };
    const parseBoolean = (value) => {
        if (value === 'false') {
            return false;
        }
        return Boolean(value);
    };
    const isBooleanAttr = (element, key) => {
        const isBoolean = key == 'allowfullscreen' ||
            key == 'async' ||
            key == 'autofocus' ||
            key == 'autoplay' ||
            key == 'checked' ||
            key == 'controls' ||
            key == 'default' ||
            key == 'defer' ||
            key == 'disabled' ||
            key == 'formnovalidate' ||
            key == 'inert' ||
            key == 'ismap' ||
            key == 'itemscope' ||
            key == 'loop' ||
            key == 'multiple' ||
            key == 'muted' ||
            key == 'nomodule' ||
            key == 'novalidate' ||
            key == 'open' ||
            key == 'playsinline' ||
            key == 'readonly' ||
            key == 'required' ||
            key == 'reversed' ||
            key == 'selected';
        return isBoolean && key in element;
    };
    const vnode_applyJournal = (journal) => {
        // console.log('APPLY JOURNAL', vnode_journalToString(journal));
        let idx = 0;
        const length = journal.length;
        while (idx < length) {
            const op = journal[idx++];
            switch (op) {
                case VNodeJournalOpCode.SetText:
                    const text = journal[idx++];
                    text.nodeValue = journal[idx++];
                    break;
                case VNodeJournalOpCode.SetAttribute:
                    const element = journal[idx++];
                    let key = journal[idx++];
                    if (key === 'className') {
                        key = 'class';
                    }
                    const value = journal[idx++];
                    if (isBooleanAttr(element, key)) {
                        element[key] = parseBoolean(value);
                    }
                    else if (key === 'value' && key in element) {
                        element.value = escapeHTML(String(value));
                    }
                    else if (key === dangerouslySetInnerHTML) {
                        element.innerHTML = value;
                    }
                    else {
                        if (value == null || value === false) {
                            element.removeAttribute(key);
                        }
                        else {
                            element.setAttribute(key, String(value));
                        }
                    }
                    break;
                case VNodeJournalOpCode.HoistStyles:
                    const document = journal[idx++];
                    const head = document.head;
                    const styles = document.querySelectorAll(QStylesAllSelector);
                    for (let i = 0; i < styles.length; i++) {
                        head.appendChild(styles[i]);
                    }
                    break;
                case VNodeJournalOpCode.Remove:
                    const removeParent = journal[idx++];
                    let nodeToRemove;
                    while (idx < length && typeof (nodeToRemove = journal[idx]) !== 'number') {
                        removeParent.removeChild(nodeToRemove);
                        idx++;
                    }
                    break;
                case VNodeJournalOpCode.Insert:
                    const insertParent = journal[idx++];
                    const insertBefore = journal[idx++];
                    let newChild;
                    while (idx < length && typeof (newChild = journal[idx]) !== 'number') {
                        insertParent.insertBefore(newChild, insertBefore);
                        idx++;
                    }
                    break;
            }
        }
        journal.length = 0;
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const mapApp_findIndx = (elementVNode, key, start) => {
        assertTrue(start % 2 === 0, 'Expecting even number.');
        let bottom = start >> 1;
        let top = (elementVNode.length - 2) >> 1;
        while (bottom <= top) {
            const mid = bottom + ((top - bottom) >> 1);
            const midKey = elementVNode[mid << 1];
            if (midKey === key) {
                return mid << 1;
            }
            if (midKey < key) {
                bottom = mid + 1;
            }
            else {
                top = mid - 1;
            }
        }
        return (bottom << 1) ^ -1;
    };
    const mapArray_set = (elementVNode, key, value, start) => {
        const indx = mapApp_findIndx(elementVNode, key, start);
        if (indx >= 0) {
            if (value == null) {
                elementVNode.splice(indx, 2);
            }
            else {
                elementVNode[indx + 1] = value;
            }
        }
        else if (value != null) {
            elementVNode.splice(indx ^ -1, 0, key, value);
        }
    };
    const mapArray_get = (elementVNode, key, start) => {
        const indx = mapApp_findIndx(elementVNode, key, start);
        if (indx >= 0) {
            return elementVNode[indx + 1];
        }
        else {
            return null;
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const vnode_insertBefore = (journal, parent, newChild, insertBefore) => {
        ensureElementOrVirtualVNode(parent);
        if (vnode_isElementVNode(parent)) {
            ensureMaterialized(parent);
        }
        let adjustedInsertBefore = null;
        if (insertBefore == null) {
            if (vnode_isVirtualVNode(parent)) {
                // If `insertBefore` is null, than we need to insert at the end of the list.
                // Well, not quite. If the parent is a virtual node, our "last node" is not the same
                // as the DOM "last node". So in that case we need to look for the "next node" from
                // our parent.
                adjustedInsertBefore = vnode_getDomSibling(parent, true, false);
            }
        }
        else if (vnode_isVirtualVNode(insertBefore)) {
            // If the `insertBefore` is virtual, than we need to descend into the virtual and find e actual
            adjustedInsertBefore = vnode_getDomSibling(insertBefore, true, true);
        }
        else {
            adjustedInsertBefore = insertBefore;
        }
        adjustedInsertBefore && vnode_ensureInflatedIfText(journal, adjustedInsertBefore);
        // If `insertBefore` is null, than we need to insert at the end of the list.
        // Well, not quite. If the parent is a virtual node, our "last node" is not the same
        // as the DOM "last node". So in that case we need to look for the "next node" from
        // our parent.
        // const shouldWeUseParentVirtual = insertBefore == null && vnode_isVirtualVNode(parent);
        // const insertBeforeNode = shouldWeUseParentVirtual
        //   ? vnode_getDomSibling(parent, true)
        //   : insertBefore;
        const domParentVNode = vnode_getDomParentVNode(parent);
        const parentNode = domParentVNode && domParentVNode[ElementVNodeProps.element];
        if (parentNode) {
            const domChildren = vnode_getDomChildrenWithCorrectNamespacesToInsert(journal, domParentVNode, newChild);
            domChildren.length &&
                journal.push(VNodeJournalOpCode.Insert, parentNode, vnode_getNode(adjustedInsertBefore), ...domChildren);
        }
        // ensure that the previous node is unlinked.
        const newChildCurrentParent = newChild[VNodeProps.parent];
        if (newChildCurrentParent &&
            (newChild[VNodeProps.previousSibling] ||
                newChild[VNodeProps.nextSibling] ||
                (vnode_isElementVNode(newChildCurrentParent) && newChildCurrentParent !== parent))) {
            vnode_remove(journal, newChildCurrentParent, newChild, false);
        }
        // link newChild into the previous/next list
        const vNext = insertBefore;
        const vPrevious = vNext
            ? vNext[VNodeProps.previousSibling]
            : parent[ElementVNodeProps.lastChild];
        if (vNext) {
            vNext[VNodeProps.previousSibling] = newChild;
        }
        else {
            parent[ElementVNodeProps.lastChild] = newChild;
        }
        if (vPrevious) {
            vPrevious[VNodeProps.nextSibling] = newChild;
        }
        else {
            parent[ElementVNodeProps.firstChild] = newChild;
        }
        newChild[VNodeProps.previousSibling] = vPrevious;
        newChild[VNodeProps.nextSibling] = vNext;
        newChild[VNodeProps.parent] = parent;
    };
    const vnode_getDomParent = (vnode) => {
        vnode = vnode_getDomParentVNode(vnode);
        return (vnode && vnode[ElementVNodeProps.element]);
    };
    const vnode_getDomParentVNode = (vnode) => {
        while (vnode && !vnode_isElementVNode(vnode)) {
            vnode = vnode[VNodeProps.parent];
        }
        return vnode;
    };
    const vnode_remove = (journal, vParent, vToRemove, removeDOM) => {
        assertEqual(vParent, vnode_getParent(vToRemove), 'Parent mismatch.');
        if (vnode_isTextVNode(vToRemove)) {
            vnode_ensureTextInflated(journal, vToRemove);
        }
        const vPrevious = vToRemove[VNodeProps.previousSibling];
        const vNext = vToRemove[VNodeProps.nextSibling];
        if (vPrevious) {
            vPrevious[VNodeProps.nextSibling] = vNext;
        }
        else {
            vParent[ElementVNodeProps.firstChild] = vNext;
        }
        if (vNext) {
            vNext[VNodeProps.previousSibling] = vPrevious;
        }
        else {
            vParent[ElementVNodeProps.lastChild] = vPrevious;
        }
        vToRemove[VNodeProps.previousSibling] = null;
        vToRemove[VNodeProps.nextSibling] = null;
        if (removeDOM) {
            const domParent = vnode_getDomParent(vParent);
            const isInnerHTMLParent = vnode_getAttr(vParent, dangerouslySetInnerHTML);
            if (isInnerHTMLParent) {
                // ignore children, as they are inserted via innerHTML
                return;
            }
            const children = vnode_getDOMChildNodes(journal, vToRemove);
            domParent && children.length && journal.push(VNodeJournalOpCode.Remove, domParent, ...children);
        }
    };
    const vnode_truncate = (journal, vParent, vDelete) => {
        assertDefined(vDelete, 'Missing vDelete.');
        const parent = vnode_getDomParent(vParent);
        const children = vnode_getDOMChildNodes(journal, vDelete);
        parent && children.length && journal.push(VNodeJournalOpCode.Remove, parent, ...children);
        const vPrevious = vDelete[VNodeProps.previousSibling];
        if (vPrevious) {
            vPrevious[VNodeProps.nextSibling] = null;
        }
        else {
            vParent[ElementVNodeProps.firstChild] = null;
        }
        vParent[ElementVNodeProps.lastChild] = vPrevious;
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const vnode_getElementName = (vnode) => {
        const elementVNode = ensureElementVNode(vnode);
        let elementName = elementVNode[ElementVNodeProps.elementName];
        if (elementName === undefined) {
            elementName = elementVNode[ElementVNodeProps.elementName] =
                elementVNode[ElementVNodeProps.element].nodeName.toLowerCase();
            elementVNode[VNodeProps.flags] |= vnode_getElementNamespaceFlags(elementName);
        }
        return elementName;
    };
    const vnode_getText = (vnode) => {
        const textVNode = ensureTextVNode(vnode);
        let text = textVNode[TextVNodeProps.text];
        if (text === undefined) {
            text = textVNode[TextVNodeProps.text] = textVNode[TextVNodeProps.node].nodeValue;
        }
        return text;
    };
    const vnode_setText = (journal, textVNode, text) => {
        vnode_ensureTextInflated(journal, textVNode);
        const textNode = textVNode[TextVNodeProps.node];
        journal.push(VNodeJournalOpCode.SetText, textNode, (textVNode[TextVNodeProps.text] = text));
    };
    const vnode_getFirstChild = (vnode) => {
        if (vnode_isTextVNode(vnode)) {
            return null;
        }
        let vFirstChild = vnode[ElementVNodeProps.firstChild];
        if (vFirstChild === undefined) {
            vFirstChild = ensureMaterialized(vnode);
        }
        return vFirstChild;
    };
    const vnode_materialize = (vNode) => {
        const element = vNode[ElementVNodeProps.element];
        const firstChild = fastFirstChild(element);
        const vNodeData = element.ownerDocument?.qVNodeData?.get(element);
        const vFirstChild = vNodeData
            ? materializeFromVNodeData(vNode, vNodeData, element, firstChild)
            : materializeFromDOM(vNode, firstChild);
        return vFirstChild;
    };
    const ensureMaterialized = (vnode) => {
        const vParent = ensureElementVNode(vnode);
        let vFirstChild = vParent[ElementVNodeProps.firstChild];
        if (vFirstChild === undefined) {
            // need to materialize the vNode.
            const element = vParent[ElementVNodeProps.element];
            if (vParent[VNodeProps.parent] && shouldIgnoreChildren(element)) {
                // We have a container with html value, must ignore the content.
                vFirstChild =
                    vParent[ElementVNodeProps.firstChild] =
                        vParent[ElementVNodeProps.lastChild] =
                            null;
            }
            else {
                vFirstChild = vnode_materialize(vParent);
            }
        }
        assertTrue(vParent[ElementVNodeProps.firstChild] !== undefined, 'Did not materialize.');
        assertTrue(vParent[ElementVNodeProps.lastChild] !== undefined, 'Did not materialize.');
        return vFirstChild;
    };
    let _fastHasAttribute = null;
    const shouldIgnoreChildren = (node) => {
        if (!_fastHasAttribute) {
            _fastHasAttribute = node.hasAttribute;
        }
        return _fastHasAttribute.call(node, QContainerAttr);
    };
    let _fastNodeType = null;
    const fastNodeType = (node) => {
        if (!_fastNodeType) {
            _fastNodeType = fastGetter(node, 'nodeType');
        }
        return _fastNodeType.call(node);
    };
    const fastIsTextOrElement = (node) => {
        const type = fastNodeType(node);
        return type === /* Node.TEXT_NODE */ 3 || type === /* Node.ELEMENT_NODE */ 1;
    };
    let _fastNextSibling = null;
    const fastNextSibling = (node) => {
        if (!_fastNextSibling) {
            _fastNextSibling = fastGetter(node, 'nextSibling');
        }
        if (!_fastFirstChild) {
            _fastFirstChild = fastGetter(node, 'firstChild');
        }
        while (node) {
            node = _fastNextSibling.call(node);
            if (node !== null) {
                const type = fastNodeType(node);
                if (type === /* Node.TEXT_NODE */ 3 || type === /* Node.ELEMENT_NODE */ 1) {
                    break;
                }
                else if (type === /* Node.COMMENT_NODE */ 8) {
                    const nodeValue = node.nodeValue;
                    if (nodeValue?.startsWith(QIgnore)) {
                        return getNodeAfterCommentNode(node, QContainerIsland, _fastNextSibling, _fastFirstChild);
                    }
                    else if (node.nodeValue?.startsWith(QContainerIslandEnd)) {
                        return getNodeAfterCommentNode(node, QIgnoreEnd, _fastNextSibling, _fastFirstChild);
                    }
                    else if (nodeValue?.startsWith(QContainerAttr)) {
                        while (node && (node = _fastNextSibling.call(node))) {
                            if (fastNodeType(node) === /* Node.COMMENT_NODE */ 8 &&
                                node.nodeValue?.startsWith(QContainerAttrEnd)) {
                                break;
                            }
                        }
                    }
                }
            }
        }
        return node;
    };
    function getNodeAfterCommentNode(node, commentValue, nextSibling, firstChild) {
        while (node) {
            if (node.nodeValue?.startsWith(commentValue)) {
                node = nextSibling.call(node) || null;
                return node;
            }
            let nextNode = firstChild.call(node);
            if (!nextNode) {
                nextNode = nextSibling.call(node);
            }
            if (!nextNode) {
                nextNode = fastParentNode(node);
                if (nextNode) {
                    nextNode = nextSibling.call(nextNode);
                }
            }
            node = nextNode;
        }
        return null;
    }
    let _fastParentNode = null;
    const fastParentNode = (node) => {
        if (!_fastParentNode) {
            _fastParentNode = fastGetter(node, 'parentNode');
        }
        return _fastParentNode.call(node);
    };
    let _fastFirstChild = null;
    const fastFirstChild = (node) => {
        if (!_fastFirstChild) {
            _fastFirstChild = fastGetter(node, 'firstChild');
        }
        node = node && _fastFirstChild.call(node);
        while (node && !fastIsTextOrElement(node)) {
            node = fastNextSibling(node);
        }
        return node;
    };
    const fastGetter = (prototype, name) => {
        let getter;
        while (prototype && !(getter = Object.getOwnPropertyDescriptor(prototype, name)?.get)) {
            prototype = Object.getPrototypeOf(prototype);
        }
        return (getter ||
            function () {
                return this[name];
            });
    };
    const isQStyleElement = (node) => {
        return (isElement(node) &&
            node.nodeName === 'STYLE' &&
            (node.hasAttribute(QScopedStyle) || node.hasAttribute(QStyle)));
    };
    const materializeFromDOM = (vParent, firstChild) => {
        let vFirstChild = null;
        // materialize from DOM
        let child = firstChild;
        while (isQStyleElement(child)) {
            // skip over style elements, as those need to be moved to the head.
            // VNode pretends that `<style q:style q:sstyle>` elements do not exist.
            child = fastNextSibling(child);
        }
        let vChild = null;
        while (child) {
            const nodeType = fastNodeType(child);
            let vNextChild = null;
            if (nodeType === /* Node.TEXT_NODE */ 3) {
                vNextChild = vnode_newText(child, child.textContent ?? undefined);
            }
            else if (nodeType === /* Node.ELEMENT_NODE */ 1) {
                vNextChild = vnode_newUnMaterializedElement(child);
            }
            if (vNextChild) {
                vNextChild[VNodeProps.parent] = vParent;
                vChild && (vChild[VNodeProps.nextSibling] = vNextChild);
                vNextChild[VNodeProps.previousSibling] = vChild;
                vChild = vNextChild;
            }
            if (!vFirstChild) {
                vParent[ElementVNodeProps.firstChild] = vFirstChild = vChild;
            }
            child = fastNextSibling(child);
        }
        vParent[ElementVNodeProps.lastChild] = vChild || null;
        vParent[ElementVNodeProps.firstChild] = vFirstChild;
        return vFirstChild;
    };
    const vnode_getNextSibling = (vnode) => {
        return vnode[VNodeProps.nextSibling];
    };
    const vnode_getPreviousSibling = (vnode) => {
        return vnode[VNodeProps.previousSibling];
    };
    const vnode_getAttrKeys = (vnode) => {
        const type = vnode[VNodeProps.flags];
        if ((type & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK) !== 0) {
            vnode_ensureElementInflated(vnode);
            const keys = [];
            for (let i = vnode_getPropStartIndex(vnode); i < vnode.length; i = i + 2) {
                const key = vnode[i];
                if (!key.startsWith(':')) {
                    keys.push(key);
                }
            }
            return keys;
        }
        return [];
    };
    const vnode_setAttr = (journal, vnode, key, value) => {
        const type = vnode[VNodeProps.flags];
        if ((type & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK) !== 0) {
            vnode_ensureElementInflated(vnode);
            const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
            if (idx >= 0) {
                if (vnode[idx + 1] != value && (type & VNodeFlags.Element) !== 0) {
                    // Values are different, update DOM
                    const element = vnode[ElementVNodeProps.element];
                    journal && journal.push(VNodeJournalOpCode.SetAttribute, element, key, value);
                }
                if (value == null) {
                    vnode.splice(idx, 2);
                }
                else {
                    vnode[idx + 1] = value;
                }
            }
            else if (value != null) {
                vnode.splice(idx ^ -1, 0, key, value);
                if ((type & VNodeFlags.Element) !== 0) {
                    // New value, update DOM
                    const element = vnode[ElementVNodeProps.element];
                    journal && journal.push(VNodeJournalOpCode.SetAttribute, element, key, value);
                }
            }
        }
    };
    const vnode_getAttr = (vnode, key) => {
        const type = vnode[VNodeProps.flags];
        if ((type & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK) !== 0) {
            vnode_ensureElementInflated(vnode);
            return mapArray_get(vnode, key, vnode_getPropStartIndex(vnode));
        }
        return null;
    };
    const vnode_getProp = (vnode, key, getObject) => {
        const type = vnode[VNodeProps.flags];
        if ((type & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK) !== 0) {
            type & VNodeFlags.Element && vnode_ensureElementInflated(vnode);
            const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
            if (idx >= 0) {
                let value = vnode[idx + 1];
                if (typeof value === 'string' && getObject) {
                    vnode[idx + 1] = value = getObject(value);
                }
                return value;
            }
        }
        return null;
    };
    const vnode_setProp = (vnode, key, value) => {
        ensureElementOrVirtualVNode(vnode);
        const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
        if (idx >= 0) {
            vnode[idx + 1] = value;
        }
        else if (value != null) {
            vnode.splice(idx ^ -1, 0, key, value);
        }
    };
    const vnode_getPropStartIndex = (vnode) => {
        const type = vnode[VNodeProps.flags] & VNodeFlags.TYPE_MASK;
        if (type === VNodeFlags.Element) {
            return ElementVNodeProps.PROPS_OFFSET;
        }
        else if (type === VNodeFlags.Virtual) {
            return VirtualVNodeProps.PROPS_OFFSET;
        }
        throw throwErrorAndStop('Invalid vnode type.');
    };
    const vnode_getParent = (vnode) => {
        return vnode[VNodeProps.parent] || null;
    };
    const vnode_getNode = (vnode) => {
        if (vnode === null || vnode_isVirtualVNode(vnode)) {
            return null;
        }
        if (vnode_isElementVNode(vnode)) {
            return vnode[ElementVNodeProps.element];
        }
        assertTrue(vnode_isTextVNode(vnode), 'Expecting Text Node.');
        return vnode[TextVNodeProps.node];
    };
    function vnode_toString(depth = 10, offset = '', materialize = false) {
        let vnode = this;
        if (depth === 0) {
            return '...';
        }
        if (vnode === null) {
            return 'null';
        }
        if (vnode === undefined) {
            return 'undefined';
        }
        const strings = [];
        do {
            if (vnode_isTextVNode(vnode)) {
                strings.push(qwikDebugToString(vnode_getText(vnode)));
            }
            else if (vnode_isVirtualVNode(vnode)) {
                const idx = vnode[VNodeProps.flags] >>> VNodeFlagsIndex.shift;
                const attrs = ['[' + String(idx) + ']'];
                vnode_getAttrKeys(vnode).forEach((key) => {
                    if (key !== DEBUG_TYPE) {
                        const value = vnode_getAttr(vnode, key);
                        attrs.push(' ' + key + '=' + qwikDebugToString(value));
                    }
                });
                const name = VirtualTypeName[vnode_getAttr(vnode, DEBUG_TYPE) || VirtualType.Virtual] ||
                    VirtualTypeName[VirtualType.Virtual];
                strings.push('<' + name + attrs.join('') + '>');
                const child = vnode_getFirstChild(vnode);
                child && strings.push('  ' + vnode_toString.call(child, depth - 1, offset + '  ', true));
                strings.push('</' + name + '>');
            }
            else if (vnode_isElementVNode(vnode)) {
                const tag = vnode_getElementName(vnode);
                const attrs = [];
                const keys = vnode_getAttrKeys(vnode);
                keys.forEach((key) => {
                    const value = vnode_getAttr(vnode, key);
                    attrs.push(' ' + key + '=' + qwikDebugToString(value));
                });
                const node = vnode_getNode(vnode);
                if (node) {
                    const vnodeData = node.ownerDocument.qVNodeData?.get(node);
                    if (vnodeData) {
                        attrs.push(' q:vnodeData=' + qwikDebugToString(vnodeData));
                    }
                }
                const domAttrs = node.attributes;
                for (let i = 0; i < domAttrs.length; i++) {
                    const attr = domAttrs[i];
                    if (keys.indexOf(attr.name) === -1) {
                        attrs.push(' ' + attr.name + (attr.value ? '=' + qwikDebugToString(attr.value) : ''));
                    }
                }
                strings.push('<' + tag + attrs.join('') + '>');
                if (vnode_isMaterialized(vnode) || materialize) {
                    const child = vnode_getFirstChild(vnode);
                    child && strings.push('  ' + vnode_toString.call(child, depth - 1, offset + '  ', true));
                }
                else {
                    strings.push('  <!-- not materialized --!>');
                }
                strings.push('</' + tag + '>');
            }
            vnode = vnode_getNextSibling(vnode) || null;
        } while (vnode);
        return strings.join('\n' + offset);
    }
    const isNumber = (ch) => /* `0` */ 48 <= ch && ch <= 57; /* `9` */
    const isLowercase = (ch) => /* `a` */ 97 <= ch && ch <= 122; /* `z` */
    const stack = [];
    function materializeFromVNodeData(vParent, vData, element, child) {
        let idx = 0;
        let nextToConsumeIdx = 0;
        let vFirst = null;
        let vLast = null;
        let previousTextNode = null;
        let ch = 0;
        let peekCh = 0;
        const peek = () => {
            if (peekCh !== 0) {
                return peekCh;
            }
            else {
                return (peekCh = nextToConsumeIdx < vData.length ? vData.charCodeAt(nextToConsumeIdx) : 0);
            }
        };
        const consume = () => {
            ch = peek();
            peekCh = 0;
            nextToConsumeIdx++;
            return ch;
        };
        const addVNode = (node) => {
            node[VNodeProps.flags] =
                (node[VNodeProps.flags] & VNodeFlagsIndex.negated_mask) | (idx << VNodeFlagsIndex.shift);
            idx++;
            vLast && (vLast[VNodeProps.nextSibling] = node);
            node[VNodeProps.previousSibling] = vLast;
            node[VNodeProps.parent] = vParent;
            if (!vFirst) {
                vParent[ElementVNodeProps.firstChild] = vFirst = node;
            }
            vLast = node;
        };
        const consumeValue = () => {
            consume();
            const start = nextToConsumeIdx;
            while ((peek() <= 58 /* `:` */ && peekCh !== 0) ||
                peekCh === 95 /* `_` */ ||
                (peekCh >= 65 /* `A` */ && peekCh <= 90) /* `Z` */ ||
                (peekCh >= 97 /* `a` */ && peekCh <= 122) /* `z` */) {
                consume();
            }
            return vData.substring(start, nextToConsumeIdx);
        };
        let textIdx = 0;
        let combinedText = null;
        let container = null;
        // console.log(
        //   'processVNodeData',
        //   vNodeData,
        //   (child?.parentNode as HTMLElement | undefined)?.outerHTML
        // );
        while (peek() !== 0) {
            if (isNumber(peek())) {
                // Element counts get encoded as numbers.
                while (!isElement(child)) {
                    child = fastNextSibling(child);
                    if (!child) {
                        throwErrorAndStop('Materialize error: missing element: ' + vData + ' ' + peek() + ' ' + nextToConsumeIdx);
                    }
                }
                // We pretend that style element's don't exist as they can get moved out.
                while (isQStyleElement(child)) {
                    // skip over style elements, as those need to be moved to the head
                    // and are not included in the counts.
                    child = fastNextSibling(child);
                }
                combinedText = null;
                previousTextNode = null;
                let value = 0;
                while (isNumber(peek())) {
                    value *= 10;
                    value += consume() - 48; /* `0` */
                }
                while (value--) {
                    addVNode(vnode_newUnMaterializedElement(child));
                    child = fastNextSibling(child);
                }
                // collect the elements;
            }
            else if (peek() === VNodeDataChar.SCOPED_STYLE) {
                vnode_setAttr(null, vParent, QScopedStyle, consumeValue());
            }
            else if (peek() === VNodeDataChar.RENDER_FN) {
                vnode_setAttr(null, vParent, OnRenderProp, consumeValue());
            }
            else if (peek() === VNodeDataChar.ID) {
                if (!container) {
                    container = getDomContainer(element);
                }
                const id = consumeValue();
                container.$setRawState$(parseInt(id), vParent);
                build.isDev && vnode_setAttr(null, vParent, ELEMENT_ID, id);
            }
            else if (peek() === VNodeDataChar.PROPS) {
                vnode_setAttr(null, vParent, ELEMENT_PROPS, consumeValue());
            }
            else if (peek() === VNodeDataChar.SLOT_REF) {
                vnode_setAttr(null, vParent, QSlotRef, consumeValue());
            }
            else if (peek() === VNodeDataChar.KEY) {
                vnode_setAttr(null, vParent, ELEMENT_KEY, consumeValue());
            }
            else if (peek() === VNodeDataChar.SEQ) {
                vnode_setAttr(null, vParent, ELEMENT_SEQ, consumeValue());
            }
            else if (peek() === VNodeDataChar.SEQ_IDX) {
                vnode_setAttr(null, vParent, ELEMENT_SEQ_IDX, consumeValue());
            }
            else if (peek() === VNodeDataChar.CONTEXT) {
                vnode_setAttr(null, vParent, QCtxAttr, consumeValue());
            }
            else if (peek() === VNodeDataChar.OPEN) {
                consume();
                addVNode(vnode_newVirtual());
                stack.push(vParent, vFirst, vLast, previousTextNode, idx);
                idx = 0;
                vParent = vLast;
                vFirst = vLast = null;
            }
            else if (peek() === VNodeDataChar.SEPARATOR) {
                const key = consumeValue();
                const value = consumeValue();
                vnode_setAttr(null, vParent, key, value);
            }
            else if (peek() === VNodeDataChar.CLOSE) {
                consume();
                vParent[ElementVNodeProps.lastChild] = vLast;
                idx = stack.pop();
                previousTextNode = stack.pop();
                vLast = stack.pop();
                vFirst = stack.pop();
                vParent = stack.pop();
            }
            else if (peek() === VNodeDataChar.SLOT) {
                vnode_setAttr(null, vParent, QSlot, consumeValue());
            }
            else {
                const textNode = child && fastNodeType(child) === /* Node.TEXT_NODE */ 3 ? child : null;
                // must be alphanumeric
                if (combinedText === null) {
                    combinedText = textNode ? textNode.nodeValue : null;
                    textIdx = 0;
                }
                let length = 0;
                while (isLowercase(peek())) {
                    length += consume() - 97; /* `a` */
                    length *= 26;
                }
                length += consume() - 65; /* `A` */
                const text = combinedText === null ? '' : combinedText.substring(textIdx, textIdx + length);
                addVNode((previousTextNode = vnode_newSharedText(previousTextNode, textNode, text)));
                textIdx += length;
                // Text nodes get encoded as alphanumeric characters.
            }
        }
        vParent[ElementVNodeProps.lastChild] = vLast;
        return vFirst;
    }
    const vnode_getType = (vnode) => {
        const type = vnode[VNodeProps.flags];
        if (type & VNodeFlags.Element) {
            return 1 /* Element */;
        }
        else if (type & VNodeFlags.Virtual) {
            return 11 /* Virtual */;
        }
        else if (type & VNodeFlags.Text) {
            return 3 /* Text */;
        }
        throw throwErrorAndStop('Unknown vnode type: ' + type);
    };
    const isElement = (node) => node && typeof node == 'object' && fastNodeType(node) === /** Node.ELEMENT_NODE* */ 1;
    /// These global variables are used to avoid creating new arrays for each call to `vnode_getPathToClosestDomNode`.
    const aPath = [];
    const bPath = [];
    const vnode_documentPosition = (a, b) => {
        if (a === b) {
            return 0;
        }
        let aDepth = -1;
        let bDepth = -1;
        while (a) {
            a = (aPath[++aDepth] = a)[VNodeProps.parent];
        }
        while (b) {
            b = (bPath[++bDepth] = b)[VNodeProps.parent];
        }
        while (aDepth >= 0 && bDepth >= 0) {
            a = aPath[aDepth];
            b = bPath[bDepth];
            if (a === b) {
                // if the nodes are the same, we need to check the next level.
                aDepth--;
                bDepth--;
            }
            else {
                // We found a difference so we need to scan nodes at this level.
                let cursor = b;
                do {
                    cursor = vnode_getNextSibling(cursor);
                    if (cursor === a) {
                        return 1;
                    }
                } while (cursor);
                cursor = b;
                do {
                    cursor = vnode_getPreviousSibling(cursor);
                    if (cursor === a) {
                        return -1;
                    }
                } while (cursor);
                // The node is not in the list of siblings, that means it must be disconnected.
                return 1;
            }
        }
        return aDepth < bDepth ? -1 : 1;
    };
    /**
     * Use this method to find the parent component for projection.
     *
     * Normally the parent component is just the first component which we encounter while traversing the
     * parents.
     *
     * However, if during traversal we encounter a projection, than we have to follow the projection,
     * and nod weth the projection component is further away (it is the parent's parent of the
     * projection's)
     *
     * So in general we have to go up as many parent components as there are projections nestings.
     *
     * - No projection nesting first parent component.
     * - One projection nesting, second parent component (parent's parent).
     * - Three projection nesting, third parent component (parent's parent's parent).
     * - And so on.
     *
     * @param vHost
     * @param getObjectById
     * @returns
     */
    const vnode_getProjectionParentComponent = (vHost, rootVNode) => {
        let projectionDepth = 1;
        while (projectionDepth--) {
            while (vHost &&
                (vnode_isVirtualVNode(vHost) ? vnode_getProp(vHost, OnRenderProp, null) === null : true)) {
                const qSlotParentProp = vnode_getProp(vHost, QSlotParent, null);
                const qSlotParent = qSlotParentProp &&
                    (typeof qSlotParentProp === 'string'
                        ? vnode_locate(rootVNode, qSlotParentProp)
                        : qSlotParentProp);
                const vProjectionParent = vnode_isVirtualVNode(vHost) && qSlotParent;
                if (vProjectionParent) {
                    // We found a projection, so we need to go up one more level.
                    projectionDepth++;
                }
                vHost = vProjectionParent || vnode_getParent(vHost);
            }
            if (projectionDepth > 0) {
                vHost = vnode_getParent(vHost);
            }
        }
        return vHost;
    };
    const VNodeArray = class VNode extends Array {
        static createElement(flags, parent, previousSibling, nextSibling, firstChild, lastChild, element, elementName) {
            const vnode = new VNode(flags, parent, previousSibling, nextSibling);
            vnode.push(firstChild, lastChild, element, elementName);
            return vnode;
        }
        static createText(flags, parent, previousSibling, nextSibling, textNode, text) {
            const vnode = new VNode(flags, parent, previousSibling, nextSibling);
            vnode.push(textNode, text);
            return vnode;
        }
        static createVirtual(flags, parent, previousSibling, nextSibling, firstChild, lastChild) {
            const vnode = new VNode(flags, parent, previousSibling, nextSibling);
            vnode.push(firstChild, lastChild);
            return vnode;
        }
        constructor(flags, parent, previousSibling, nextSibling) {
            super();
            this.push(flags, parent, previousSibling, nextSibling);
            if (build.isDev) {
                this.toString = vnode_toString;
            }
        }
    };

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
        assertDefined(ctx.$effectSubscriber$, `invoke: $effectSubscriber$ must be defined`, ctx);
        return ctx;
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
            $effectSubscriber$: undefined,
            $locale$,
            $container$: undefined,
        };
        seal(ctx);
        return ctx;
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
     * @param fn
     * @param subscriber
     * @param property `true` - subscriber is component `false` - subscriber is VNode `string` -
     *   subscriber is property
     * @param container
     * @returns
     */
    const trackSignal = (fn, subscriber, property, container, data) => {
        const previousSubscriber = trackInvocation.$effectSubscriber$;
        const previousContainer = trackInvocation.$container$;
        try {
            trackInvocation.$effectSubscriber$ = [subscriber, property];
            if (data) {
                trackInvocation.$effectSubscriber$.push(data);
            }
            trackInvocation.$container$ = container;
            return invoke(trackInvocation, fn);
        }
        finally {
            trackInvocation.$effectSubscriber$ = previousSubscriber;
            trackInvocation.$container$ = previousContainer;
        }
    };
    /** @internal */
    const _getContextElement = () => {
        const iCtx = tryGetInvokeContext();
        if (iCtx) {
            const hostElement = iCtx.$hostElement$;
            let element = null;
            if (vnode_isVNode(hostElement) && vnode_isElementVNode(hostElement)) {
                element = vnode_getNode(hostElement);
            }
            return element ?? iCtx.$qrl$?.$setContainer$(undefined);
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
        return input;
    };
    /** @internal */
    const _waitUntilRendered = (elm) => {
        const containerEl = _getQContainerElement(elm);
        if (!containerEl) {
            return Promise.resolve();
        }
        const container = containerEl.qContainer;
        return container?.renderDone ?? Promise.resolve();
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
        const { val, set, iCtx } = useSequentialScope();
        if (val !== undefined) {
            return;
        }
        if (qDev) {
            validateContext(context);
        }
        if (qDev && qSerialize) {
            verifySerializable(newValue);
        }
        iCtx.$container$.setContext(iCtx.$hostElement$, context, newValue);
        set(1);
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
        const { val, set, iCtx } = useSequentialScope();
        if (val !== undefined) {
            return val;
        }
        if (qDev) {
            validateContext(context);
        }
        const value = iCtx.$container$.resolveContext(iCtx.$hostElement$, context);
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
    const validateContext = (context) => {
        if (!isObject(context) || typeof context.id !== 'string' || context.id.length === 0) {
            throw qError(QError_invalidContext, context);
        }
    };

    const ERROR_CONTEXT = /*#__PURE__*/ createContextId('qk-error');
    const isRecoverable = (err) => {
        if (err && err instanceof Error) {
            if ('plugin' in err) {
                return false;
            }
        }
        return true;
    };

    // NOTE: we want to move this function to qwikloader, and therefore this function should not have any external dependencies
    /**
     * Process the VNodeData script tags and store the VNodeData in the VNodeDataMap.
     *
     * The end result of this function is that each DOM element has the associated `VNodeData` attached
     * to it, to be used later `VNode` materialization. The "attachment" is done through the
     * `VNodeDataMap`.
     *
     * Run this function on startup to process the `<script type="qwik/vnode">` tags. The data in the
     * tags needs to be parsed and attached to the DOM elements. (We do this through `VNodeDataMap`)
     * `VNodeDataMap` is then used to lazily materialize the VNodes.
     *
     * Only one invocation of this function is needed per document/browser session.
     *
     * Below is an example of the kinds of constructs which need to be handled when dealing with
     * VNodeData deserialization.
     *
     * ```
     * <html q:container="paused">
     *   <body>
     *     <div q:container="paused">
     *       <script type="qwik/vnode">...</script>
     *     </div>
     *     <div q:container="html">...</div>
     *     before
     *     <!--q:container=ABC-->
     *     ...
     *     <!--/q:container-->
     *     after
     *     <!--q:ignore=FOO-->
     *     ...
     *        <!--q:container-island=BAR-->
     *        <div>some interactive island</div>
     *        <!--/q:container-island-->
     *     ...
     *     <!--/q:ignore-->
     *     <textarea q:container="text">...</textarea>
     *     <script type="qwik/vnode">...</script>
     *   </body>
     * </html>
     * ```
     *
     * Each `qwik/vnode` script assumes that the elements are numbered in depth first order. For this
     * reason, whenever the `processVNodeData` comes across a `q:container` it must ignore its
     * children.
     *
     * IMPLEMENTATION:
     *
     * - Stack to keep track of the current `q:container` being processed.
     * - Attach all `qwik/vnode` scripts (not the data contain within them) to the `q:container` element.
     * - Walk the tree and process each `q:container` element.
     */
    function processVNodeData(document) {
        const Q_CONTAINER = 'q:container';
        const Q_CONTAINER_END = '/' + Q_CONTAINER;
        const Q_PROPS_SEPARATOR = ':';
        const Q_SHADOW_ROOT = 'q:shadowroot';
        const Q_IGNORE = 'q:ignore';
        const Q_IGNORE_END = '/' + Q_IGNORE;
        const Q_CONTAINER_ISLAND = 'q:container-island';
        const Q_CONTAINER_ISLAND_END = '/' + Q_CONTAINER_ISLAND;
        const qDocument = document;
        const vNodeDataMap = qDocument.qVNodeData || (qDocument.qVNodeData = new WeakMap());
        const prototype = document.body;
        const getter = (prototype, name) => {
            let getter;
            while (prototype && !(getter = Object.getOwnPropertyDescriptor(prototype, name)?.get)) {
                prototype = Object.getPrototypeOf(prototype);
            }
            return (getter ||
                function () {
                    return this[name];
                });
        };
        const getAttribute = prototype.getAttribute;
        const hasAttribute = prototype.hasAttribute;
        const getNodeType = getter(prototype, 'nodeType');
        // Process all of the `qwik/vnode` script tags by attaching them to the corresponding containers.
        const attachVnodeDataAndRefs = (element) => {
            Array.from(element.querySelectorAll('script[type="qwik/vnode"]')).forEach((script) => {
                script.setAttribute('type', 'x-qwik/vnode');
                const qContainerElement = script.closest('[q\\:container]');
                qContainerElement.qVnodeData = script.textContent;
                qContainerElement.qVNodeRefs = new Map();
            });
            element.querySelectorAll('[q\\:shadowroot]').forEach((parent) => {
                const shadowRoot = parent.shadowRoot;
                shadowRoot && attachVnodeDataAndRefs(shadowRoot);
            });
        };
        attachVnodeDataAndRefs(document);
        ///////////////////////////////
        // Functions to consume the tree.
        ///////////////////////////////
        let NodeType;
        (function (NodeType) {
            NodeType[NodeType["CONTAINER_MASK"] = 1] = "CONTAINER_MASK";
            NodeType[NodeType["ELEMENT"] = 2] = "ELEMENT";
            NodeType[NodeType["ELEMENT_CONTAINER"] = 3] = "ELEMENT_CONTAINER";
            NodeType[NodeType["ELEMENT_SHADOW_ROOT"] = 6] = "ELEMENT_SHADOW_ROOT";
            NodeType[NodeType["COMMENT_SKIP_START"] = 5] = "COMMENT_SKIP_START";
            NodeType[NodeType["COMMENT_SKIP_END"] = 8] = "COMMENT_SKIP_END";
            NodeType[NodeType["COMMENT_IGNORE_START"] = 16] = "COMMENT_IGNORE_START";
            NodeType[NodeType["COMMENT_IGNORE_END"] = 32] = "COMMENT_IGNORE_END";
            NodeType[NodeType["COMMENT_ISLAND_START"] = 65] = "COMMENT_ISLAND_START";
            NodeType[NodeType["COMMENT_ISLAND_END"] = 128] = "COMMENT_ISLAND_END";
            NodeType[NodeType["OTHER"] = 0] = "OTHER";
        })(NodeType || (NodeType = {}));
        /**
         * Looks up which type of node this is in a monomorphic way which should be faster.
         *
         * See: https://mhevery.github.io/perf-tests/DOM-megamorphic.html
         */
        const getFastNodeType = (node) => {
            const nodeType = getNodeType.call(node);
            if (nodeType === 1 /* Node.ELEMENT_NODE */) {
                const qContainer = getAttribute.call(node, Q_CONTAINER);
                if (qContainer === null) {
                    if (hasAttribute.call(node, Q_SHADOW_ROOT)) {
                        return NodeType.ELEMENT_SHADOW_ROOT;
                    }
                    const isQElement = hasAttribute.call(node, Q_PROPS_SEPARATOR);
                    return isQElement ? NodeType.ELEMENT : NodeType.OTHER;
                }
                else {
                    return NodeType.ELEMENT_CONTAINER;
                }
            }
            else if (nodeType === 8 /* Node.COMMENT_NODE */) {
                const nodeValue = node.nodeValue || ''; // nodeValue is monomorphic so it does not need fast path
                if (nodeValue.startsWith(Q_CONTAINER_ISLAND)) {
                    return NodeType.COMMENT_ISLAND_START;
                }
                else if (nodeValue.startsWith(Q_IGNORE)) {
                    return NodeType.COMMENT_IGNORE_START;
                }
                else if (nodeValue.startsWith(Q_CONTAINER)) {
                    return NodeType.COMMENT_SKIP_START;
                }
                else if (nodeValue.startsWith(Q_CONTAINER_ISLAND_END)) {
                    return NodeType.COMMENT_ISLAND_END;
                }
                else if (nodeValue.startsWith(Q_IGNORE_END)) {
                    return NodeType.COMMENT_IGNORE_END;
                }
                else if (nodeValue.startsWith(Q_CONTAINER_END)) {
                    return NodeType.COMMENT_SKIP_END;
                }
            }
            return NodeType.OTHER;
        };
        const isSeparator = (ch) => 
        /* `!` */ VNodeDataSeparator.ADVANCE_1 <= ch && ch <= VNodeDataSeparator.ADVANCE_8192; /* `.` */
        /**
         * Given the `vData` string, `start` index, and `end` index, find the end of the VNodeData
         * section.
         */
        const findVDataSectionEnd = (vData, start, end) => {
            let depth = 0;
            while (true) {
                // look for the end of VNodeData
                if (start < end) {
                    const ch = vData.charCodeAt(start);
                    if (depth === 0 && isSeparator(ch)) {
                        break;
                    }
                    else {
                        if (ch === VNodeDataChar.OPEN) {
                            depth++;
                        }
                        else if (ch === VNodeDataChar.CLOSE) {
                            depth--;
                        }
                        start++;
                    }
                }
                else {
                    break;
                }
            }
            return start;
        };
        const nextSibling = (node) => {
            // eslint-disable-next-line no-empty
            while (node && (node = node.nextSibling) && getFastNodeType(node) === NodeType.OTHER) { }
            return node;
        };
        const firstChild = (node) => {
            // eslint-disable-next-line no-empty
            while (node && (node = node.firstChild) && getFastNodeType(node) === NodeType.OTHER) { }
            return node;
        };
        /**
         * Process the container
         *
         * @param walker TreeWalker
         * @param containerNode The root of container element
         * @param exitNode The node which represents the last node and we should exit.
         * @param qVNodeRefs Place to store the VNodeRefs
         */
        const walkContainer = (walker, containerNode, node, exitNode, vData, qVNodeRefs, prefix) => {
            const vData_length = vData.length;
            /// Stores the current element index as the TreeWalker traverses the DOM.
            let elementIdx = 0;
            /// Stores the current VNode index as derived from the VNodeData script tag.
            let vNodeElementIndex = -1;
            let vData_start = 0;
            let vData_end = 0;
            let ch = 0;
            let needsToStoreRef = -1;
            let nextNode = null;
            /** Computes number of elements which need to be skipped to get to the next VNodeData section. */
            const howManyElementsToSkip = () => {
                let elementsToSkip = 0;
                while (isSeparator((ch = vData.charCodeAt(vData_start)))) {
                    // Keep consuming the separators and incrementing the vNodeIndex
                    // console.log('ADVANCE', vNodeElementIndex, ch, ch - 33);
                    elementsToSkip += 1 << (ch - VNodeDataSeparator.ADVANCE_1);
                    vData_start++;
                    if (vData_start >= vData_length) {
                        // we reached the end of the vNodeData stop.
                        break;
                    }
                }
                return elementsToSkip;
            };
            do {
                if (node === exitNode) {
                    return;
                }
                nextNode = null;
                const nodeType = node == containerNode ? NodeType.ELEMENT : getFastNodeType(node);
                if (nodeType === NodeType.ELEMENT_CONTAINER) {
                    // If we are in a container, we need to skip the children.
                    const container = node;
                    let cursor = node;
                    while (cursor && !(nextNode = nextSibling(cursor))) {
                        cursor = cursor.parentNode;
                    }
                    // console.log('EXIT', nextNode?.outerHTML);
                    walkContainer(walker, container, node, nextNode, container.qVnodeData || '', container.qVNodeRefs);
                }
                else if (nodeType === NodeType.COMMENT_IGNORE_START) {
                    let islandNode = node;
                    do {
                        islandNode = walker.nextNode();
                        if (!islandNode) {
                            throw new Error(`Island inside <!--${node?.nodeValue}--> not found!`);
                        }
                    } while (getFastNodeType(islandNode) !== NodeType.COMMENT_ISLAND_START);
                    nextNode = null;
                }
                else if (nodeType === NodeType.COMMENT_ISLAND_END) {
                    nextNode = node;
                    do {
                        nextNode = walker.nextNode();
                        if (!nextNode) {
                            throw new Error(`Ignore block not closed!`);
                        }
                    } while (getFastNodeType(nextNode) !== NodeType.COMMENT_IGNORE_END);
                    nextNode = null;
                }
                else if (nodeType === NodeType.COMMENT_SKIP_START) {
                    // If we are in a container, we need to skip the children.
                    nextNode = node;
                    do {
                        nextNode = nextSibling(nextNode);
                        if (!nextNode) {
                            throw new Error(`<!--${node?.nodeValue}--> not closed!`);
                        }
                    } while (getFastNodeType(nextNode) !== NodeType.COMMENT_SKIP_END);
                    // console.log('EXIT', nextNode?.outerHTML);
                    walkContainer(walker, node, node, nextNode, '', null);
                }
                else if (nodeType === NodeType.ELEMENT_SHADOW_ROOT) {
                    // If we are in a shadow root, we need to get the shadow root element.
                    nextNode = nextSibling(node);
                    const shadowRootContainer = node;
                    const shadowRoot = shadowRootContainer?.shadowRoot;
                    if (shadowRoot) {
                        walkContainer(
                        // we need to create a new walker for the shadow root
                        document.createTreeWalker(shadowRoot, 0x1 /* NodeFilter.SHOW_ELEMENT  */ | 0x80 /*  NodeFilter.SHOW_COMMENT */), null, firstChild(shadowRoot), null, '', null);
                    }
                }
                if ((nodeType & NodeType.ELEMENT) === NodeType.ELEMENT) {
                    if (vNodeElementIndex < elementIdx) {
                        // VNodeData needs to catch up with the elementIdx
                        if (vNodeElementIndex === -1) {
                            vNodeElementIndex = 0;
                        }
                        vData_start = vData_end;
                        if (vData_start < vData_length) {
                            vNodeElementIndex += howManyElementsToSkip();
                            const shouldStoreRef = ch === VNodeDataSeparator.REFERENCE;
                            if (shouldStoreRef) {
                                // if we need to store the ref handle it here.
                                needsToStoreRef = vNodeElementIndex;
                                vData_start++;
                                if (vData_start < vData_length) {
                                    ch = vData.charCodeAt(vData_end);
                                }
                                else {
                                    // assume separator on end.
                                    ch = VNodeDataSeparator.ADVANCE_1;
                                }
                            }
                            vData_end = findVDataSectionEnd(vData, vData_start, vData_length);
                        }
                        else {
                            vNodeElementIndex = Number.MAX_SAFE_INTEGER;
                        }
                    }
                    // console.log(
                    //   prefix,
                    //   'ELEMENT',
                    //   nodeType,
                    //   elementIdx,
                    //   vNodeElementIndex,
                    //   (node as any).outerHTML,
                    //   elementIdx === vNodeElementIndex ? vData.substring(vData_start, vData_end) : ''
                    // );
                    if (elementIdx === vNodeElementIndex) {
                        if (needsToStoreRef === elementIdx) {
                            qVNodeRefs.set(elementIdx, node);
                        }
                        const instructions = vData.substring(vData_start, vData_end);
                        vNodeDataMap.set(node, instructions);
                    }
                    elementIdx++;
                }
            } while ((node = nextNode || walker.nextNode()));
        };
        // Walk the tree and process each `q:container` element.
        const walker = document.createTreeWalker(document, 0x1 /* NodeFilter.SHOW_ELEMENT  */ | 0x80 /*  NodeFilter.SHOW_COMMENT */);
        walkContainer(walker, null, walker.firstChild(), null, '', null);
    }

    /** @file Public APIs for the SSR */
    /** @public */
    function getDomContainer(element) {
        const qContainerElement = _getQContainerElement(element);
        if (!qContainerElement) {
            throwErrorAndStop('Unable to find q:container.');
        }
        return getDomContainerFromQContainerElement(qContainerElement);
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
                        if (attr.name === Q_PROPS_SEPARATOR) {
                            continue;
                        }
                        containerAttributes[attr.name] = attr.value;
                    }
                }
            }
            container.$serverData$ = { containerAttributes };
            qElement.qContainer = container;
        }
        return container;
    }
    /** @internal */
    function _getQContainerElement(element) {
        const qContainerElement = Array.isArray(element)
            ? vnode_getDomParent(element)
            : element;
        return qContainerElement.closest(QContainerSelector);
    }
    const isDomContainer = (container) => {
        return container instanceof DomContainer;
    };
    /** @internal */
    class DomContainer extends _SharedContainer {
        constructor(element) {
            super(() => this.scheduleRender(), () => vnode_applyJournal(this.$journal$), {}, element.getAttribute('q:locale'));
            this.renderDone = null;
            this.$storeProxyMap$ = new WeakMap();
            this.$styleIds$ = null;
            this.$vnodeLocate$ = (id) => vnode_locate(this.rootVNode, id);
            this.$renderCount$ = 0;
            this.$getObjectById$ = (id) => {
                if (typeof id === 'string') {
                    id = parseFloat(id);
                }
                assertTrue(id < this.$rawStateData$.length / 2, `Invalid reference: ${id} >= ${this.$rawStateData$.length / 2}`);
                return this.stateData[id];
            };
            this.qContainer = element.getAttribute(QContainerAttr);
            if (!this.qContainer) {
                throwErrorAndStop("Element must have 'q:container' attribute.");
            }
            this.$journal$ = [
                // The first time we render we need to hoist the styles.
                // (Meaning we need to move all styles from component inline to <head>)
                // We bulk move all of the styles, because the expensive part is
                // for the browser to recompute the styles, (not the actual DOM manipulation.)
                // By moving all of them at once we can minimize the reflow.
                VNodeJournalOpCode.HoistStyles,
                element.ownerDocument,
            ];
            this.document = element.ownerDocument;
            this.element = element;
            this.qBase = element.getAttribute(QBaseAttr);
            this.$instanceHash$ = element.getAttribute(QInstanceAttr);
            // this.containerState = createContainerState(element, this.qBase);
            this.qManifestHash = element.getAttribute('q:manifest-hash');
            this.rootVNode = vnode_newUnMaterializedElement(this.element);
            // These are here to initialize all properties at once for single class transition
            this.$rawStateData$ = null;
            this.stateData = null;
            const document = this.element.ownerDocument;
            if (!document.qVNodeData) {
                processVNodeData(document);
            }
            this.$rawStateData$ = [];
            this.stateData = [];
            const qwikStates = element.querySelectorAll('script[type="qwik/state"]');
            if (qwikStates.length !== 0) {
                const lastState = qwikStates[qwikStates.length - 1];
                this.$rawStateData$ = JSON.parse(lastState.textContent);
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
            // console.log('>>>> processJsx', String(host));
            const styleScopedId = this.getHostProp(host, QScopedStyle);
            return vnode_diff(this, jsx, host, addComponentStylePrefix(styleScopedId));
        }
        handleError(err, host) {
            if (qDev) {
                // Clean vdom
                if (typeof document !== 'undefined') {
                    const vHost = host;
                    const errorDiv = document.createElement('errored-host');
                    if (err && err instanceof Error) {
                        errorDiv.props = { error: err };
                    }
                    errorDiv.setAttribute('q:key', '_error_');
                    const journal = [];
                    vnode_getDOMChildNodes(journal, vHost).forEach((child) => errorDiv.appendChild(child));
                    const vErrorDiv = vnode_newElement(errorDiv, 'error-host');
                    vnode_insertBefore(journal, vHost, vErrorDiv, null);
                    vnode_applyJournal(journal);
                }
                if (err && err instanceof Error) {
                    if (!('hostElement' in err)) {
                        err['hostElement'] = host;
                    }
                }
                if (!isRecoverable(err)) {
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
            let ctx = this.getHostProp(host, QCtxAttr);
            if (!ctx) {
                this.setHostProp(host, QCtxAttr, (ctx = []));
            }
            mapArray_set(ctx, context.id, value, 0);
        }
        resolveContext(host, contextId) {
            while (host) {
                const ctx = this.getHostProp(host, QCtxAttr);
                if (ctx) {
                    const value = mapArray_get(ctx, contextId.id, 0);
                    if (value) {
                        return value;
                    }
                }
                host = this.getParentHost(host);
            }
            return undefined;
        }
        getParentHost(host) {
            let vNode = vnode_getParent(host);
            while (vNode) {
                if (vnode_isVirtualVNode(vNode)) {
                    if (vnode_getProp(vNode, OnRenderProp, null) !== null) {
                        return vNode;
                    }
                    // If virtual node, than it could be a slot so we need to read its parent.
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
            const vNode = host;
            vnode_setProp(vNode, name, value);
        }
        getHostProp(host, name) {
            const vNode = host;
            let getObjectById = null;
            switch (name) {
                case ELEMENT_SEQ:
                case ELEMENT_PROPS:
                case OnRenderProp:
                case QCtxAttr:
                case QSubscribers:
                    getObjectById = this.$getObjectById$;
                    break;
                case ELEMENT_SEQ_IDX:
                case USE_ON_LOCAL_SEQ_IDX:
                    getObjectById = parseInt;
                    break;
            }
            return vnode_getProp(vNode, name, getObjectById);
        }
        scheduleRender() {
            this.$renderCount$++;
            this.renderDone || (this.renderDone = getPlatform().nextTick(() => this.processChores()));
            return this.renderDone;
        }
        processChores() {
            let renderCount = this.$renderCount$;
            const result = this.$scheduler$(ChoreType.WAIT_FOR_ALL);
            if (isPromise(result)) {
                return result.then(async () => {
                    while (renderCount !== this.$renderCount$) {
                        renderCount = this.$renderCount$;
                        await this.$scheduler$(ChoreType.WAIT_FOR_ALL);
                    }
                    this.renderDone = null;
                });
            }
            if (renderCount !== this.$renderCount$) {
                this.processChores();
                return;
            }
            this.renderDone = null;
        }
        ensureProjectionResolved(vNode) {
            if ((vNode[VNodeProps.flags] & VNodeFlags.Resolved) === 0) {
                vNode[VNodeProps.flags] |= VNodeFlags.Resolved;
                for (let i = vnode_getPropStartIndex(vNode); i < vNode.length; i = i + 2) {
                    const prop = vNode[i];
                    if (isSlotProp(prop)) {
                        const value = vNode[i + 1];
                        if (typeof value == 'string') {
                            vNode[i + 1] = this.$vnodeLocate$(value);
                        }
                    }
                }
            }
        }
        getSyncFn(id) {
            const fn = this.$qFuncs$[id];
            assertTrue(typeof fn === 'function', 'Invalid reference: ' + id);
            return fn;
        }
        $appendStyle$(content, styleId, host, scoped) {
            if (scoped) {
                const scopedStyleIdsString = this.getHostProp(host, QScopedStyle);
                const scopedStyleIds = new Set(convertScopedStyleIdsToArray(scopedStyleIdsString));
                scopedStyleIds.add(styleId);
                this.setHostProp(host, QScopedStyle, convertStyleIdsToString(scopedStyleIds));
            }
            if (this.$styleIds$ == null) {
                this.$styleIds$ = new Set();
                this.element.querySelectorAll(QStyleSelector).forEach((style) => {
                    this.$styleIds$.add(style.getAttribute(QStyle));
                });
            }
            if (!this.$styleIds$.has(styleId)) {
                this.$styleIds$.add(styleId);
                const styleElement = this.document.createElement('style');
                styleElement.setAttribute(QStyle, styleId);
                styleElement.textContent = content;
                this.$journal$.push(VNodeJournalOpCode.Insert, this.document.head, null, styleElement);
            }
        }
    }

    /** There's [documentation](./serialization.md) */
    const deserializedProxyMap = new WeakMap();
    const unwrapDeserializerProxy = (value) => {
        const unwrapped = typeof value === 'object' &&
            value !== null &&
            value[SERIALIZER_PROXY_UNWRAP];
        return unwrapped ? unwrapped : value;
    };
    const isDeserializerProxy = (value) => {
        return typeof value === 'object' && value !== null && SERIALIZER_PROXY_UNWRAP in value;
    };
    const SERIALIZER_PROXY_UNWRAP = Symbol('UNWRAP');
    /** Call this on the serialized root state */
    const wrapDeserializerProxy = (container, data) => {
        if (!Array.isArray(data) || // must be an array
            vnode_isVNode(data) || // and not a VNode or Slot
            isDeserializerProxy(data) // and not already wrapped
        ) {
            return data;
        }
        let proxy = deserializedProxyMap.get(data);
        if (!proxy) {
            const target = Array(data.length / 2).fill(undefined);
            proxy = new Proxy(target, new DeserializationHandler(container, data));
            deserializedProxyMap.set(data, proxy);
        }
        return proxy;
    };
    class DeserializationHandler {
        constructor($container$, $data$) {
            this.$container$ = $container$;
            this.$data$ = $data$;
            this.$length$ = this.$data$.length / 2;
        }
        get(target, property, receiver) {
            if (property === SERIALIZER_PROXY_UNWRAP) {
                // Note that this will only be partially filled in
                return target;
            }
            const i = typeof property === 'number'
                ? property
                : typeof property === 'string'
                    ? parseInt(property, 10)
                    : NaN;
            if (Number.isNaN(i) || i < 0 || i >= this.$length$) {
                const out = Reflect.get(target, property, receiver);
                return out;
            }
            // The serialized data is an array with 2 values for each item
            const idx = i * 2;
            const typeId = this.$data$[idx];
            const value = this.$data$[idx + 1];
            if (typeId === undefined) {
                // The value is already cached
                return value;
            }
            const container = this.$container$;
            const propValue = allocate(container, typeId, value);
            Reflect.set(target, property, propValue);
            this.$data$[idx] = undefined;
            this.$data$[idx + 1] = propValue;
            /** We stored the reference, so now we can inflate, allowing cycles. */
            if (typeId >= TypeIds.Error) {
                inflate(container, propValue, typeId, value);
            }
            return propValue;
        }
        has(target, property) {
            if (property === SERIALIZER_PROXY_UNWRAP) {
                return true;
            }
            return Object.prototype.hasOwnProperty.call(target, property);
        }
        set(target, property, value, receiver) {
            if (property === SERIALIZER_PROXY_UNWRAP) {
                return false;
            }
            const out = Reflect.set(target, property, value, receiver);
            const i = typeof property === 'number' ? property : parseInt(property, 10);
            if (Number.isNaN(i) || i < 0 || i >= this.$data$.length / 2) {
                return out;
            }
            const idx = i * 2;
            this.$data$[idx] = undefined;
            this.$data$[idx + 1] = value;
            return true;
        }
    }
    /**
     * Restores an array eagerly. If you need it lazily, use `deserializeData(container, TypeIds.Array,
     * array)` instead
     */
    const _eagerDeserializeArray = (container, data) => {
        const out = Array(data.length / 2);
        for (let i = 0; i < data.length; i += 2) {
            out[i / 2] = deserializeData(container, data[i], data[i + 1]);
        }
        return out;
    };
    const resolvers = new WeakMap();
    const inflate = (container, target, typeId, data) => {
        if (typeId === undefined) {
            // Already processed
            return;
        }
        // restore the complex data, except for plain objects
        if (typeId !== TypeIds.Object && Array.isArray(data)) {
            data = _eagerDeserializeArray(container, data);
        }
        switch (typeId) {
            case TypeIds.Object:
                // We use getters for making complex values lazy
                for (let i = 0; i < data.length; i += 4) {
                    const key = deserializeData(container, data[i], data[i + 1]);
                    const valType = data[i + 2];
                    const valData = data[i + 3];
                    if (valType === TypeIds.RootRef || valType >= TypeIds.Error) {
                        Object.defineProperty(target, key, {
                            get() {
                                return deserializeData(container, valType, valData);
                            },
                            set(value) {
                                Object.defineProperty(target, key, {
                                    value,
                                    writable: true,
                                    enumerable: true,
                                    configurable: true,
                                });
                            },
                            enumerable: true,
                            configurable: true,
                        });
                    }
                    else {
                        target[key] = deserializeData(container, valType, valData);
                    }
                }
                break;
            case TypeIds.QRL:
                inflateQRL(container, target);
                break;
            case TypeIds.Task:
                const task = target;
                const v = data;
                task.$qrl$ = inflateQRL(container, v[0]);
                task.$flags$ = v[1];
                task.$index$ = v[2];
                task.$el$ = v[3];
                task.$effectDependencies$ = v[4];
                task.$state$ = v[5];
                break;
            case TypeIds.Resource:
                const [resolved, result, effects] = data;
                const resource = target;
                if (resolved) {
                    resource.value = Promise.resolve(result);
                    resource._resolved = result;
                    resource._state = 'resolved';
                }
                else {
                    resource.value = Promise.reject(result);
                    resource._error = result;
                    resource._state = 'rejected';
                }
                getStoreHandler(target).$effects$ = effects;
                break;
            case TypeIds.Component:
                target[SERIALIZABLE_STATE][0] = data[0];
                break;
            case TypeIds.Store:
            case TypeIds.StoreArray: {
                const [value, flags, effects, storeEffect] = data;
                const handler = getStoreHandler(target);
                handler.$flags$ = flags;
                // First assign so it sets up the deep stores
                Object.assign(getStoreTarget(target), value);
                // Afterwards restore the effects so they don't get triggered
                if (storeEffect) {
                    effects[STORE_ARRAY_PROP] = storeEffect;
                }
                handler.$effects$ = effects;
                container.$storeProxyMap$.set(value, target);
                break;
            }
            case TypeIds.Signal: {
                const signal = target;
                const d = data;
                signal.$untrackedValue$ = d[0];
                signal.$effects$ = d.slice(1);
                break;
            }
            case TypeIds.WrappedSignal: {
                const signal = target;
                const d = data;
                signal.$func$ = container.getSyncFn(d[0]);
                signal.$args$ = d[1];
                signal.$effectDependencies$ = d[2];
                signal.$untrackedValue$ = d[3];
                signal.$effects$ = d.slice(4);
                break;
            }
            case TypeIds.ComputedSignal: {
                const computed = target;
                const d = data;
                computed.$computeQrl$ = d[0];
                computed.$untrackedValue$ = d[1];
                computed.$invalid$ = d[2];
                computed.$effects$ = d.slice(3);
                if (computed.$invalid$) {
                    /**
                     * If we try to compute value and the qrl is not resolved, then system throws an error with
                     * qrl promise. To prevent that we should early resolve computed qrl while computed
                     * deserialization. This also prevents anything from firing while computed qrls load,
                     * because of scheduler
                     */
                    // try to download qrl in this tick
                    computed.$computeQrl$.resolve();
                    container.$scheduler$?.(ChoreType.QRL_RESOLVE, null, computed.$computeQrl$);
                }
                break;
            }
            case TypeIds.Error: {
                const d = data;
                target.message = d[0];
                const second = d[1];
                if (second && Array.isArray(second)) {
                    for (let i = 0; i < second.length; i++) {
                        target[second[i++]] = d[i];
                    }
                    target.stack = d[2];
                }
                else {
                    target.stack = second;
                }
                break;
            }
            case TypeIds.FormData: {
                const formData = target;
                const d = data;
                for (let i = 0; i < d.length; i++) {
                    formData.append(d[i++], d[i]);
                }
                break;
            }
            case TypeIds.JSXNode: {
                const jsx = target;
                const [type, varProps, constProps, children, flags, key] = data;
                jsx.type = type;
                jsx.varProps = varProps;
                jsx.constProps = constProps;
                jsx.children = children;
                jsx.flags = flags;
                jsx.key = key;
                break;
            }
            case TypeIds.Set: {
                const set = target;
                const d = data;
                for (let i = 0; i < d.length; i++) {
                    set.add(d[i]);
                }
                break;
            }
            case TypeIds.Map: {
                const map = target;
                const d = data;
                for (let i = 0; i < d.length; i++) {
                    map.set(d[i++], d[i]);
                }
                break;
            }
            case TypeIds.Promise: {
                const promise = target;
                const [resolved, result] = data;
                const [resolve, reject] = resolvers.get(promise);
                if (resolved) {
                    resolve(result);
                }
                else {
                    reject(result);
                }
                break;
            }
            case TypeIds.Uint8Array:
                const bytes = target;
                const buf = atob(data);
                let i = 0;
                for (const s of buf) {
                    bytes[i++] = s.charCodeAt(0);
                }
                break;
            case TypeIds.PropsProxy:
                const propsProxy = target;
                propsProxy[_VAR_PROPS] = data[0];
                propsProxy[_CONST_PROPS] = data[1];
                break;
            case TypeIds.EffectData: {
                const effectData = target;
                effectData.data = data[0];
                break;
            }
            default:
                return throwErrorAndStop('Not implemented');
        }
    };
    const _constants = [
        undefined,
        null,
        true,
        false,
        '',
        EMPTY_ARRAY,
        EMPTY_OBJ,
        NEEDS_COMPUTATION,
        Slot,
        Fragment,
        NaN,
        Infinity,
        -Infinity,
        Number.MAX_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER - 1,
        Number.MIN_SAFE_INTEGER,
    ];
    const allocate = (container, typeId, value) => {
        if (value === undefined) {
            // When a value was already processed, the result is stored in type
            return typeId;
        }
        switch (typeId) {
            case TypeIds.RootRef:
                return container.$getObjectById$(value);
            case TypeIds.Constant:
                return _constants[value];
            case TypeIds.Number:
                return value;
            case TypeIds.Array:
                return wrapDeserializerProxy(container, value);
            case TypeIds.Object:
                return {};
            case TypeIds.QRL:
                return parseQRL(value);
            case TypeIds.Task:
                return new Task(-1, -1, null, null, null, null);
            case TypeIds.Resource: {
                const res = createResourceReturn(container, 
                // we don't care about the timeout value
                undefined, undefined);
                res.loading = false;
                return res;
            }
            case TypeIds.URL:
                return new URL(value);
            case TypeIds.Date:
                return new Date(value);
            case TypeIds.Regex:
                const idx = value.lastIndexOf('/');
                return new RegExp(value.slice(1, idx), value.slice(idx + 1));
            case TypeIds.Error:
                return new Error();
            case TypeIds.Component:
                return componentQrl(null);
            case TypeIds.Signal:
                return new Signal(container, 0);
            case TypeIds.WrappedSignal:
                return new WrappedSignal(container, null, null, null);
            case TypeIds.ComputedSignal:
                return new ComputedSignal(container, null);
            case TypeIds.Store:
                return createStore(container, {}, 0);
            case TypeIds.StoreArray:
                return createStore(container, [], 0);
            case TypeIds.URLSearchParams:
                return new URLSearchParams(value);
            case TypeIds.FormData:
                return new FormData();
            case TypeIds.JSXNode:
                return new JSXNodeImpl(null, null, null, null, -1, null);
            case TypeIds.BigInt:
                return BigInt(value);
            case TypeIds.Set:
                return new Set();
            case TypeIds.Map:
                return new Map();
            case TypeIds.String:
                return value;
            case TypeIds.Promise:
                let resolve;
                let reject;
                const promise = new Promise((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
                resolvers.set(promise, [resolve, reject]);
                return promise;
            case TypeIds.Uint8Array:
                const encodedLength = value.length;
                const blocks = encodedLength >>> 2;
                const rest = encodedLength & 3;
                const decodedLength = blocks * 3 + (rest ? rest - 1 : 0);
                return new Uint8Array(decodedLength);
            case TypeIds.PropsProxy:
                return createPropsProxy(null, null);
            case TypeIds.VNode:
                // Retrieve the VNode from the container
                return retrieveVNodeOrDocument(container, value);
            case TypeIds.RefVNode:
                const vNode = retrieveVNodeOrDocument(container, value);
                if (vnode_isVNode(vNode)) {
                    return vnode_getNode(vNode);
                }
                else {
                    return throwErrorAndStop('expected vnode for ref prop, but got ' + typeof vNode);
                }
            case TypeIds.EffectData:
                return new EffectData(null);
            default:
                return throwErrorAndStop('unknown allocate type: ' + typeId);
        }
    };
    function retrieveVNodeOrDocument(container, value) {
        return value
            ? container.rootVNode
                ? vnode_locate(container.rootVNode, value)
                : undefined
            : container.element?.ownerDocument;
    }
    /** Parses "chunk#hash[...rootRef]" */
    function parseQRL(qrl) {
        const hashIdx = qrl.indexOf('#');
        const captureStart = qrl.indexOf('[', hashIdx);
        const captureEnd = qrl.indexOf(']', captureStart);
        const chunk = hashIdx > -1 ? qrl.slice(0, hashIdx) : qrl.slice(0, captureStart);
        const symbol = captureStart > -1 ? qrl.slice(hashIdx + 1, captureStart) : qrl.slice(hashIdx + 1);
        const captureIds = captureStart > -1 && captureEnd > -1
            ? qrl
                .slice(captureStart + 1, captureEnd)
                .split(' ')
                .filter((v) => v.length)
                .map((s) => parseInt(s, 10))
            : null;
        let qrlRef = null;
        if (chunk === QRL_RUNTIME_CHUNK) {
            const backChannel = globalThis[QRL_RUNTIME_CHUNK];
            assertDefined(backChannel, 'Missing QRL_RUNTIME_CHUNK');
            qrlRef = backChannel.get(symbol);
        }
        return createQRL(chunk, symbol, qrlRef, null, captureIds, null, null);
    }
    function inflateQRL(container, qrl) {
        const captureIds = qrl.$capture$;
        qrl.$captureRef$ = captureIds ? captureIds.map((id) => container.$getObjectById$(id)) : null;
        if (container.element) {
            qrl.$setContainer$(container.element);
        }
        return qrl;
    }
    /** A ref to a DOM element */
    class DomVRef {
        constructor(id) {
            this.id = id;
        }
    }
    const createSerializationContext = (
    /**
     * Node constructor, for instanceof checks.
     *
     * A node constructor can be null. For example on the client we can't serialize DOM nodes as
     * server will not know what to do with them.
     */
    NodeConstructor, symbolToChunkResolver, getProp, setProp, storeProxyMap, writer) => {
        if (!writer) {
            const buffer = [];
            writer = {
                write: (text) => buffer.push(text),
                toString: () => buffer.join(''),
            };
        }
        const map = new Map();
        const syncFnMap = new Map();
        const syncFns = [];
        const roots = [];
        const $wasSeen$ = (obj) => map.get(obj);
        const $seen$ = (obj) => map.set(obj, -1);
        const $addRoot$ = (obj) => {
            let id = map.get(obj);
            if (typeof id !== 'number' || id === -1) {
                id = roots.length;
                map.set(obj, id);
                roots.push(obj);
            }
            return id;
        };
        const isSsrNode = (NodeConstructor ? (obj) => obj instanceof NodeConstructor : () => false);
        return {
            $serialize$() {
                serialize(this);
            },
            $isSsrNode$: isSsrNode,
            $symbolToChunkResolver$: symbolToChunkResolver,
            $wasSeen$,
            $roots$: roots,
            $seen$,
            $hasRootId$: (obj) => {
                const id = map.get(obj);
                return id === undefined || id === -1 ? undefined : id;
            },
            $addRoot$,
            $getRootId$: (obj) => {
                const id = map.get(obj);
                if (!id || id === -1) {
                    return throwErrorAndStop('Missing root id for: ' + obj);
                }
                return id;
            },
            $syncFns$: syncFns,
            $addSyncFn$: (funcStr, argCount, fn) => {
                const isFullFn = funcStr == null;
                if (isFullFn) {
                    funcStr = fn.serialized || fn.toString();
                }
                let id = syncFnMap.get(funcStr);
                if (id === undefined) {
                    id = syncFns.length;
                    syncFnMap.set(funcStr, id);
                    if (isFullFn) {
                        syncFns.push(funcStr);
                    }
                    else {
                        let code = '(';
                        for (let i = 0; i < argCount; i++) {
                            code += (i == 0 ? 'p' : ',p') + i;
                        }
                        syncFns.push((code += ')=>' + funcStr));
                    }
                }
                return id;
            },
            $writer$: writer,
            $breakCircularDepsAndAwaitPromises$: breakCircularDependenciesAndResolvePromises,
            $eventQrls$: new Set(),
            $eventNames$: new Set(),
            $resources$: new Set(),
            $renderSymbols$: new Set(),
            $storeProxyMap$: storeProxyMap,
            $getProp$: getProp,
            $setProp$: setProp,
        };
        async function breakCircularDependenciesAndResolvePromises() {
            // As we walk the object graph we insert newly discovered objects which need to be scanned here.
            const discoveredValues = [];
            const promises = [];
            /**
             * Note on out of order streaming:
             *
             * When we implement that, we may need to send a reference to an object that was streamed
             * earlier but wasn't a root. This means we'll have to keep track of all objects on both send
             * and receive ends, which means we'll just have to make everything a root anyway, so `visit()`
             * won't be needed.
             */
            /** Visit an object, adding anything that will be serialized as to scan */
            const visit = (obj) => {
                if (typeof obj === 'function') {
                    if (isQrl(obj)) {
                        if (obj.$captureRef$) {
                            discoveredValues.push(...obj.$captureRef$);
                        }
                    }
                    else if (isQwikComponent(obj)) {
                        const [qrl] = obj[SERIALIZABLE_STATE];
                        discoveredValues.push(qrl);
                    }
                }
                else if (
                // skip as these are primitives
                typeof obj !== 'object' ||
                    obj === null ||
                    obj instanceof URL ||
                    obj instanceof Date ||
                    obj instanceof RegExp ||
                    obj instanceof Uint8Array ||
                    obj instanceof URLSearchParams ||
                    (typeof FormData !== 'undefined' && obj instanceof FormData) ||
                    // Ignore the no serialize objects
                    fastSkipSerialize(obj)) ;
                else if (obj instanceof Error) {
                    discoveredValues.push(...Object.values(obj));
                }
                else if (isStore(obj)) {
                    const target = getStoreTarget(obj);
                    const effects = getStoreHandler(obj).$effects$;
                    discoveredValues.push(target, effects);
                    for (const prop in target) {
                        const propValue = target[prop];
                        if (storeProxyMap.has(propValue)) {
                            discoveredValues.push(prop, storeProxyMap.get(propValue));
                        }
                    }
                }
                else if (obj instanceof Set) {
                    discoveredValues.push(...obj.values());
                }
                else if (obj instanceof Map) {
                    obj.forEach((v, k) => {
                        discoveredValues.push(k, v);
                    });
                }
                else if (obj instanceof Signal) {
                    /**
                     * WrappedSignal might not be calculated yet so we need to use `untrackedValue` to get the
                     * value. ComputedSignal can be left uncalculated.
                     */
                    const v = obj instanceof WrappedSignal
                        ? obj.untrackedValue
                        : obj instanceof ComputedSignal && (obj.$invalid$ || fastSkipSerialize(obj))
                            ? NEEDS_COMPUTATION
                            : obj.$untrackedValue$;
                    if (v !== NEEDS_COMPUTATION && !isSsrNode(v)) {
                        discoveredValues.push(obj.$untrackedValue$);
                    }
                    if (obj.$effects$) {
                        discoveredValues.push(...obj.$effects$);
                    }
                    // WrappedSignal uses syncQrl which has no captured refs
                    if (obj instanceof WrappedSignal) {
                        if (obj.$effectDependencies$) {
                            discoveredValues.push(...obj.$effectDependencies$);
                        }
                    }
                    else if (obj instanceof ComputedSignal) {
                        discoveredValues.push(obj.$computeQrl$);
                    }
                }
                else if (obj instanceof Task) {
                    discoveredValues.push(obj.$el$, obj.$qrl$, obj.$state$, obj.$effectDependencies$);
                }
                else if (isSsrNode(obj)) ;
                else if (isJSXNode(obj)) {
                    discoveredValues.push(obj.type, obj.props, obj.constProps, obj.children);
                }
                else if (Array.isArray(obj)) {
                    discoveredValues.push(...obj);
                }
                else if (isQrl(obj)) {
                    obj.$captureRef$ && obj.$captureRef$.length && discoveredValues.push(...obj.$captureRef$);
                }
                else if (isPropsProxy(obj)) {
                    discoveredValues.push(obj[_VAR_PROPS], obj[_CONST_PROPS]);
                }
                else if (isPromise(obj)) {
                    obj.then((value) => {
                        promiseResults.set(obj, [true, value]);
                        discoveredValues.push(value);
                    }, (error) => {
                        promiseResults.set(obj, [false, error]);
                        discoveredValues.push(error);
                    });
                    promises.push(obj);
                }
                else if (obj instanceof EffectData) {
                    discoveredValues.push(obj.data);
                }
                else if (isObjectLiteral(obj)) {
                    Object.entries(obj).forEach(([key, value]) => {
                        discoveredValues.push(key, value);
                    });
                }
                else {
                    return throwErrorAndStop('Unknown type: ' + obj);
                }
            };
            // Prime the pump with the root objects.
            for (const root of roots) {
                visit(root);
            }
            do {
                while (discoveredValues.length) {
                    const obj = discoveredValues.pop();
                    if (!(shouldTrackObj(obj) || frameworkType(obj))) {
                        continue;
                    }
                    const id = $wasSeen$(obj);
                    if (id === undefined) {
                        // Object has not been seen yet, must scan content
                        $seen$(obj);
                        visit(obj);
                    }
                    else if (id === -1) {
                        // We are seeing this object second time => promote it.
                        $addRoot$(obj);
                        // we don't need to scan the children, since we have already seen them.
                    }
                }
                // We have scanned all the objects, but we still have promises to resolve.
                await Promise.allSettled(promises);
                promises.length = 0;
            } while (discoveredValues.length);
        }
    };
    const promiseResults = new WeakMap();
    /**
     * Format:
     *
     * - This encodes the $roots$ array.
     * - The output is a string of comma separated JSON values.
     * - Even values are always numbers, specifying the type of the next value.
     * - Odd values are numbers, strings (JSON stringified with `</` escaping) or arrays (same format).
     * - Therefore root indexes need to be doubled to get the actual index.
     */
    function serialize(serializationContext) {
        const { $writer$, $isSsrNode$, $setProp$, $storeProxyMap$ } = serializationContext;
        let depth = -1;
        // Skip the type for the roots output
        let writeType = false;
        const output = (type, value) => {
            if (writeType) {
                $writer$.write(`${type},`);
            }
            else {
                writeType = true;
            }
            if (typeof value === 'number') {
                $writer$.write(value.toString());
            }
            else if (typeof value === 'string') {
                const s = JSON.stringify(value);
                let angleBracketIdx = -1;
                let lastIdx = 0;
                while ((angleBracketIdx = s.indexOf('</', lastIdx)) !== -1) {
                    $writer$.write(s.slice(lastIdx, angleBracketIdx));
                    $writer$.write('<\\/');
                    lastIdx = angleBracketIdx + 2;
                }
                $writer$.write(lastIdx === 0 ? s : s.slice(lastIdx));
            }
            else {
                depth++;
                $writer$.write('[');
                let separator = false;
                // TODO only until last non-null value
                for (let i = 0; i < value.length; i++) {
                    if (separator) {
                        $writer$.write(',');
                    }
                    else {
                        separator = true;
                    }
                    writeValue(value[i], i);
                }
                $writer$.write(']');
                depth--;
            }
        };
        const writeValue = (value, idx) => {
            if (fastSkipSerialize(value)) {
                output(TypeIds.Constant, Constants.Undefined);
            }
            else if (typeof value === 'bigint') {
                output(TypeIds.BigInt, value.toString());
            }
            else if (typeof value === 'boolean') {
                output(TypeIds.Constant, value ? Constants.True : Constants.False);
            }
            else if (typeof value === 'function') {
                if (value === Slot) {
                    output(TypeIds.Constant, Constants.Slot);
                }
                else if (value === Fragment) {
                    output(TypeIds.Constant, Constants.Fragment);
                }
                else if (isQrl(value)) {
                    // TODO deduplicate the string
                    output(TypeIds.QRL, qrlToString(serializationContext, value));
                }
                else if (isQwikComponent(value)) {
                    const [qrl] = value[SERIALIZABLE_STATE];
                    serializationContext.$renderSymbols$.add(qrl.$symbol$);
                    output(TypeIds.Component, [qrl]);
                }
                else {
                    // TODO this happens for inline components with render props like Resource
                    console.error('Cannot serialize function (ignoring for now): ' + value.toString());
                    output(TypeIds.Constant, Constants.Undefined);
                }
            }
            else if (typeof value === 'number') {
                if (Number.isNaN(value)) {
                    output(TypeIds.Constant, Constants.NaN);
                }
                else if (!Number.isFinite(value)) {
                    output(TypeIds.Constant, value < 0 ? Constants.NegativeInfinity : Constants.PositiveInfinity);
                }
                else if (value === Number.MAX_SAFE_INTEGER) {
                    output(TypeIds.Constant, Constants.MaxSafeInt);
                }
                else if (value === Number.MAX_SAFE_INTEGER - 1) {
                    output(TypeIds.Constant, Constants.AlmostMaxSafeInt);
                }
                else if (value === Number.MIN_SAFE_INTEGER) {
                    output(TypeIds.Constant, Constants.MinSafeInt);
                }
                else {
                    output(TypeIds.Number, value);
                }
            }
            else if (typeof value === 'object') {
                if (value === EMPTY_ARRAY) {
                    output(TypeIds.Constant, Constants.EMPTY_ARRAY);
                }
                else if (value === EMPTY_OBJ) {
                    output(TypeIds.Constant, Constants.EMPTY_OBJ);
                }
                else {
                    depth++;
                    if (value === null) {
                        output(TypeIds.Constant, Constants.Null);
                    }
                    else {
                        writeObjectValue(value, idx);
                    }
                    depth--;
                }
            }
            else if (typeof value === 'string') {
                if (value.length === 0) {
                    output(TypeIds.Constant, Constants.EmptyString);
                }
                else {
                    // Note, in v1 we were reusing DOM text, but that is too dangerous with translation extensions changing the text
                    const seen = depth > 1 && serializationContext.$wasSeen$(value);
                    if (typeof seen === 'number' && seen >= 0) {
                        output(TypeIds.RootRef, seen);
                    }
                    else {
                        output(TypeIds.String, value);
                    }
                }
            }
            else if (typeof value === 'undefined') {
                output(TypeIds.Constant, Constants.Undefined);
            }
            else if (value === NEEDS_COMPUTATION) {
                output(TypeIds.Constant, Constants.NEEDS_COMPUTATION);
            }
            else {
                throwErrorAndStop('Unknown type: ' + typeof value);
            }
        };
        const writeObjectValue = (value, idx) => {
            /**
             * We start at -1 and then serialize the roots array, which is an object so increases depth to
             * 0. The object writer then outputs an array object (without type prefix) and this increases
             * the depth for the objects within (depth 1). Then when writeValue encounters each root object,
             * it will increase the depth again, so it's at 2.
             */
            const isRootObject = depth === 2;
            // Objects are the only way to create circular dependencies.
            // So the first thing to to is to see if we have a circular dependency.
            // (NOTE: For root objects we need to serialize them regardless if we have seen
            //        them before, otherwise the root object reference will point to itself.)
            // Also note that depth will be 2 for objects in root
            if (depth > 2) {
                const seen = serializationContext.$wasSeen$(value);
                if (typeof seen === 'number' && seen >= 0) {
                    // We have seen this object before, so we can serialize it as a reference.
                    // Otherwise serialize as normal
                    output(TypeIds.RootRef, seen);
                    return;
                }
            }
            if (isPropsProxy(value)) {
                const varProps = value[_VAR_PROPS];
                const constProps = value[_CONST_PROPS];
                output(TypeIds.PropsProxy, [varProps, constProps]);
            }
            else if (value instanceof EffectData) {
                output(TypeIds.EffectData, [value.data]);
            }
            else if (isStore(value)) {
                if (isResource(value)) {
                    // let render know about the resource
                    serializationContext.$resources$.add(value);
                    const res = promiseResults.get(value.value);
                    if (!res) {
                        return throwErrorAndStop('Unvisited Resource');
                    }
                    output(TypeIds.Resource, [...res, getStoreHandler(value).$effects$]);
                }
                else {
                    const storeHandler = getStoreHandler(value);
                    const storeTarget = getStoreTarget(value);
                    const flags = storeHandler.$flags$;
                    const effects = storeHandler.$effects$;
                    const storeEffect = effects?.[STORE_ARRAY_PROP] ?? null;
                    const innerStores = [];
                    for (const prop in storeTarget) {
                        const propValue = storeTarget[prop];
                        if ($storeProxyMap$.has(propValue)) {
                            const innerStore = $storeProxyMap$.get(propValue);
                            innerStores.push(innerStore);
                            serializationContext.$addRoot$(innerStore);
                        }
                    }
                    const out = [storeTarget, flags, effects, storeEffect, ...innerStores];
                    while (out[out.length - 1] == null) {
                        out.pop();
                    }
                    output(Array.isArray(storeTarget) ? TypeIds.StoreArray : TypeIds.Store, out);
                }
            }
            else if (isObjectLiteral(value)) {
                if (Array.isArray(value)) {
                    output(TypeIds.Array, value);
                }
                else {
                    const out = [];
                    for (const key in value) {
                        if (Object.prototype.hasOwnProperty.call(value, key) &&
                            !fastSkipSerialize(value[key])) {
                            out.push(key, value[key]);
                        }
                    }
                    // TODO if !out.length, output 0 and restore as {}
                    output(TypeIds.Object, out);
                }
            }
            else if (value instanceof DomVRef) {
                output(TypeIds.RefVNode, value.id);
            }
            else if (value instanceof Signal) {
                /**
                 * Special case: when a Signal value is an SSRNode, it always needs to be a DOM ref instead.
                 * It can never be meant to become a vNode, because vNodes are internal only.
                 */
                let v = value instanceof ComputedSignal &&
                    (value.$invalid$ || fastSkipSerialize(value.$untrackedValue$))
                    ? NEEDS_COMPUTATION
                    : value.$untrackedValue$;
                if ($isSsrNode$(v)) {
                    v = new DomVRef(v.id);
                }
                if (value instanceof WrappedSignal) {
                    output(TypeIds.WrappedSignal, [
                        ...serializeWrappingFn(serializationContext, value),
                        value.$effectDependencies$,
                        v,
                        ...(value.$effects$ || []),
                    ]);
                }
                else if (value instanceof ComputedSignal) {
                    output(TypeIds.ComputedSignal, [
                        value.$computeQrl$,
                        v,
                        v === NEEDS_COMPUTATION,
                        // TODO check if we can use domVRef for effects
                        ...(value.$effects$ || []),
                    ]);
                }
                else {
                    output(TypeIds.Signal, [v, ...(value.$effects$ || [])]);
                }
            }
            else if (value instanceof URL) {
                output(TypeIds.URL, value.href);
            }
            else if (value instanceof Date) {
                output(TypeIds.Date, Number.isNaN(value.valueOf()) ? '' : value.valueOf());
            }
            else if (value instanceof RegExp) {
                output(TypeIds.Regex, value.toString());
            }
            else if (value instanceof Error) {
                const out = [value.message];
                const extraProps = Object.entries(value).flat();
                if (extraProps.length) {
                    out.push(extraProps);
                }
                /// In production we don't want to leak the stack trace.
                {
                    out.push(value.stack);
                }
                output(TypeIds.Error, out);
            }
            else if ($isSsrNode$(value)) {
                if (isRootObject) {
                    // Tell the SsrNode which root id it is
                    $setProp$(value, ELEMENT_ID, String(idx));
                    output(TypeIds.VNode, value.id);
                }
                else {
                    // Promote the vnode to a root
                    serializationContext.$addRoot$(value);
                    output(TypeIds.RootRef, serializationContext.$roots$.length - 1);
                }
            }
            else if (typeof FormData !== 'undefined' && value instanceof FormData) {
                // FormData is generally used only once so don't bother with references
                const array = [];
                value.forEach((value, key) => {
                    if (typeof value === 'string') {
                        array.push(key, value);
                    }
                    else {
                        array.push(key, value.name);
                    }
                });
                output(TypeIds.FormData, array);
            }
            else if (value instanceof URLSearchParams) {
                output(TypeIds.URLSearchParams, value.toString());
            }
            else if (value instanceof Set) {
                output(TypeIds.Set, [...value.values()]);
            }
            else if (value instanceof Map) {
                const combined = [];
                for (const [k, v] of value.entries()) {
                    combined.push(k, v);
                }
                output(TypeIds.Map, combined);
            }
            else if (isJSXNode(value)) {
                output(TypeIds.JSXNode, [
                    value.type,
                    value.varProps,
                    value.constProps,
                    value.children,
                    value.flags,
                    value.key,
                ]);
            }
            else if (value instanceof Task) {
                const out = [
                    value.$qrl$,
                    value.$flags$,
                    value.$index$,
                    value.$el$,
                    value.$effectDependencies$,
                    value.$state$,
                ];
                while (out[out.length - 1] == null) {
                    out.pop();
                }
                output(TypeIds.Task, out);
            }
            else if (isPromise(value)) {
                const res = promiseResults.get(value);
                if (!res) {
                    return throwErrorAndStop('Unvisited Promise');
                }
                output(TypeIds.Promise, res);
            }
            else if (value instanceof Uint8Array) {
                let buf = '';
                for (const c of value) {
                    buf += String.fromCharCode(c);
                }
                const out = btoa(buf).replace(/=+$/, '');
                output(TypeIds.Uint8Array, out);
            }
            else {
                return throwErrorAndStop('implement');
            }
        };
        writeValue(serializationContext.$roots$, -1);
    }
    function serializeWrappingFn(serializationContext, value) {
        // if value is an object then we need to wrap this in ()
        if (value.$funcStr$ && value.$funcStr$[0] === '{') {
            value.$funcStr$ = `(${value.$funcStr$})`;
        }
        const syncFnId = serializationContext.$addSyncFn$(value.$funcStr$, value.$args$.length, value.$func$);
        // TODO null if no args
        return [syncFnId, value.$args$];
    }
    function qrlToString(serializationContext, value) {
        let symbol = value.$symbol$;
        let chunk = value.$chunk$;
        const refSymbol = value.$refSymbol$ ?? symbol;
        const platform = getPlatform();
        if (platform) {
            const result = platform.chunkForSymbol(refSymbol, chunk, value.dev?.file);
            if (result) {
                chunk = result[1];
                if (!value.$refSymbol$) {
                    symbol = result[0];
                }
            }
        }
        const isSync = isSyncQrl(value);
        if (!isSync) {
            // If we have a symbol we need to resolve the chunk.
            if (!chunk) {
                chunk = serializationContext.$symbolToChunkResolver$(value.$hash$);
            }
            // in Dev mode we need to keep track of the symbols
            {
                let backChannel = globalThis[QRL_RUNTIME_CHUNK];
                if (!backChannel) {
                    backChannel = globalThis[QRL_RUNTIME_CHUNK] = new Map();
                }
                backChannel.set(value.$symbol$, value._devOnlySymbolRef);
                if (!chunk) {
                    chunk = QRL_RUNTIME_CHUNK;
                }
            }
            if (!chunk) {
                throwErrorAndStop('Missing chunk for: ' + value.$symbol$);
            }
            if (chunk.startsWith('./')) {
                chunk = chunk.slice(2);
            }
        }
        else {
            const fn = value.resolved;
            chunk = '';
            // TODO test that provided stringified fn is used
            symbol = String(serializationContext.$addSyncFn$(null, 0, fn));
        }
        let qrlStringInline = `${chunk}#${symbol}`;
        if (Array.isArray(value.$captureRef$) && value.$captureRef$.length > 0) {
            let serializedReferences = '';
            // hot-path optimization
            for (let i = 0; i < value.$captureRef$.length; i++) {
                if (i > 0) {
                    serializedReferences += ' ';
                }
                // We refer by id so every capture needs to be a root
                serializedReferences += serializationContext.$addRoot$(value.$captureRef$[i]);
            }
            qrlStringInline += `[${serializedReferences}]`;
        }
        else if (value.$capture$ && value.$capture$.length > 0) {
            qrlStringInline += `[${value.$capture$.join(' ')}]`;
        }
        return qrlStringInline;
    }
    /**
     * Serialize data to string using SerializationContext.
     *
     * @param data - Data to serialize
     * @internal
     */
    async function _serialize(data) {
        const serializationContext = createSerializationContext(null, () => '', () => '', () => { }, new WeakMap());
        for (const root of data) {
            serializationContext.$addRoot$(root);
        }
        await serializationContext.$breakCircularDepsAndAwaitPromises$();
        serializationContext.$serialize$();
        return serializationContext.$writer$.toString();
    }
    /**
     * Deserialize data from string to an array of objects.
     *
     * @param rawStateData - Data to deserialize
     * @param element - Container element
     * @internal
     */
    function _deserialize(rawStateData, element) {
        if (rawStateData == null) {
            return [];
        }
        const stateData = JSON.parse(rawStateData);
        if (!Array.isArray(stateData)) {
            return [];
        }
        let container = undefined;
        if (isNode(element) && isElement$1(element)) {
            container = _createDeserializeContainer(stateData, element);
        }
        else {
            container = _createDeserializeContainer(stateData);
        }
        const output = [];
        for (let i = 0; i < stateData.length; i += 2) {
            output[i / 2] = deserializeData(container, stateData[i], stateData[i + 1]);
        }
        return output;
    }
    function deserializeData(container, typeId, propValue) {
        if (typeId === undefined) {
            return propValue;
        }
        const value = allocate(container, typeId, propValue);
        if (typeId >= TypeIds.Error) {
            inflate(container, value, typeId, propValue);
        }
        return value;
    }
    function getObjectById(id, stateData) {
        if (typeof id === 'string') {
            id = parseInt(id, 10);
        }
        assertTrue(id < stateData.length, `Invalid reference ${id} >= ${stateData.length}`);
        return stateData[id];
    }
    function _createDeserializeContainer(stateData, element) {
        // eslint-disable-next-line prefer-const
        let state;
        const container = {
            $getObjectById$: (id) => getObjectById(id, state),
            getSyncFn: (_) => {
                const fn = () => { };
                return fn;
            },
            $storeProxyMap$: new WeakMap(),
            element: null,
        };
        state = wrapDeserializerProxy(container, stateData);
        container.$state$ = state;
        if (element) {
            container.element = element;
        }
        return container;
    }
    /**
     * Tracking all objects in the map would be expensive. For this reason we only track some of the
     * objects.
     *
     * For example we skip:
     *
     * - Short strings
     * - Anything which is not an object. (ie. number, boolean, null, undefined)
     *
     * @param obj
     * @returns
     */
    function shouldTrackObj(obj) {
        return ((typeof obj === 'object' && obj !== null) ||
            /**
             * We track all strings greater than 1 character, because those take at least 6 bytes to encode
             * and even with 999 root objects it saves one byte per reference. Tracking more objects makes
             * the map bigger so we want to strike a balance
             */
            (typeof obj === 'string' && obj.length > 1)
        // THINK: Not sure if we need to keep track of functions (QRLs) Let's skip them for now.
        // and see if we have a test case which requires them.
        );
    }
    /**
     * When serializing the object we need check if it is URL, RegExp, Map, Set, etc. This is time
     * consuming. So if we could know that this is a basic object literal we could skip the check, and
     * only run the checks for objects which are not object literals.
     *
     * So this function is here for performance to short circuit many checks later.
     *
     * @param obj
     */
    function isObjectLiteral(obj) {
        // We are an object literal if:
        // - we are a direct instance of object OR
        // - we are an array
        // In all other cases it is a subclass which requires more checks.
        const prototype = Object.getPrototypeOf(obj);
        return prototype == null || prototype === Object.prototype || prototype === Array.prototype;
    }
    function isResource(value) {
        return '__brand' in value && value.__brand === 'resource';
    }
    const frameworkType = (obj) => {
        return ((typeof obj === 'object' &&
            obj !== null &&
            (obj instanceof Signal || obj instanceof Task || isJSXNode(obj))) ||
            isQrl(obj));
    };
    const canSerialize = (value) => {
        if (value == null ||
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean' ||
            typeof value === 'bigint') {
            return true;
        }
        else if (typeof value === 'object') {
            const proto = Object.getPrototypeOf(value);
            if (isStore(value)) {
                value = getStoreTarget(value);
            }
            if (proto == Object.prototype) {
                for (const key in value) {
                    if (!canSerialize(value[key])) {
                        return false;
                    }
                }
                return true;
            }
            else if (proto == Array.prototype) {
                for (let i = 0; i < value.length; i++) {
                    if (!canSerialize(value[i])) {
                        return false;
                    }
                }
                return true;
            }
            else if (isTask(value)) {
                return true;
            }
            else if (isPropsProxy(value)) {
                return true;
            }
            else if (isPromise(value)) {
                return true;
            }
            else if (isJSXNode(value)) {
                return true;
            }
            else if (value instanceof Error) {
                return true;
            }
            else if (value instanceof URL) {
                return true;
            }
            else if (value instanceof Date) {
                return true;
            }
            else if (value instanceof RegExp) {
                return true;
            }
            else if (value instanceof URLSearchParams) {
                return true;
            }
            else if (value instanceof FormData) {
                return true;
            }
            else if (value instanceof Set) {
                return true;
            }
            else if (value instanceof Map) {
                return true;
            }
            else if (value instanceof Uint8Array) {
                return true;
            }
        }
        else if (typeof value === 'function') {
            if (isQrl(value) || isQwikComponent(value)) {
                return true;
            }
        }
        return false;
    };
    const QRL_RUNTIME_CHUNK = 'mock-chunk';
    var TypeIds;
    (function (TypeIds) {
        TypeIds[TypeIds["RootRef"] = 0] = "RootRef";
        /** Undefined, null, true, false, NaN, +Inf, -Inf, Slot, Fragment */
        TypeIds[TypeIds["Constant"] = 1] = "Constant";
        TypeIds[TypeIds["Number"] = 2] = "Number";
        TypeIds[TypeIds["String"] = 3] = "String";
        TypeIds[TypeIds["Array"] = 4] = "Array";
        TypeIds[TypeIds["URL"] = 5] = "URL";
        TypeIds[TypeIds["Date"] = 6] = "Date";
        TypeIds[TypeIds["Regex"] = 7] = "Regex";
        TypeIds[TypeIds["VNode"] = 8] = "VNode";
        TypeIds[TypeIds["RefVNode"] = 9] = "RefVNode";
        TypeIds[TypeIds["BigInt"] = 10] = "BigInt";
        TypeIds[TypeIds["URLSearchParams"] = 11] = "URLSearchParams";
        /// All values below need inflation because they may have reference cycles
        TypeIds[TypeIds["Error"] = 12] = "Error";
        TypeIds[TypeIds["Object"] = 13] = "Object";
        TypeIds[TypeIds["Promise"] = 14] = "Promise";
        TypeIds[TypeIds["Set"] = 15] = "Set";
        TypeIds[TypeIds["Map"] = 16] = "Map";
        TypeIds[TypeIds["Uint8Array"] = 17] = "Uint8Array";
        TypeIds[TypeIds["QRL"] = 18] = "QRL";
        TypeIds[TypeIds["Task"] = 19] = "Task";
        TypeIds[TypeIds["Resource"] = 20] = "Resource";
        TypeIds[TypeIds["Component"] = 21] = "Component";
        TypeIds[TypeIds["Signal"] = 22] = "Signal";
        TypeIds[TypeIds["WrappedSignal"] = 23] = "WrappedSignal";
        TypeIds[TypeIds["ComputedSignal"] = 24] = "ComputedSignal";
        TypeIds[TypeIds["Store"] = 25] = "Store";
        TypeIds[TypeIds["StoreArray"] = 26] = "StoreArray";
        TypeIds[TypeIds["FormData"] = 27] = "FormData";
        TypeIds[TypeIds["JSXNode"] = 28] = "JSXNode";
        TypeIds[TypeIds["PropsProxy"] = 29] = "PropsProxy";
        TypeIds[TypeIds["EffectData"] = 30] = "EffectData";
    })(TypeIds || (TypeIds = {}));
    var Constants;
    (function (Constants) {
        Constants[Constants["Undefined"] = 0] = "Undefined";
        Constants[Constants["Null"] = 1] = "Null";
        Constants[Constants["True"] = 2] = "True";
        Constants[Constants["False"] = 3] = "False";
        Constants[Constants["EmptyString"] = 4] = "EmptyString";
        Constants[Constants["EMPTY_ARRAY"] = 5] = "EMPTY_ARRAY";
        Constants[Constants["EMPTY_OBJ"] = 6] = "EMPTY_OBJ";
        Constants[Constants["NEEDS_COMPUTATION"] = 7] = "NEEDS_COMPUTATION";
        Constants[Constants["Slot"] = 8] = "Slot";
        Constants[Constants["Fragment"] = 9] = "Fragment";
        Constants[Constants["NaN"] = 10] = "NaN";
        Constants[Constants["PositiveInfinity"] = 11] = "PositiveInfinity";
        Constants[Constants["NegativeInfinity"] = 12] = "NegativeInfinity";
        Constants[Constants["MaxSafeInt"] = 13] = "MaxSafeInt";
        // used for close fragment
        Constants[Constants["AlmostMaxSafeInt"] = 14] = "AlmostMaxSafeInt";
        Constants[Constants["MinSafeInt"] = 15] = "MinSafeInt";
    })(Constants || (Constants = {}));

    /** @internal */
    const verifySerializable = (value, preMessage) => {
        const seen = new Set();
        return _verifySerializable(value, seen, '_', preMessage);
    };
    const _verifySerializable = (value, seen, ctx, preMessage) => {
        const unwrapped = unwrapStore(value);
        if (unwrapped == null) {
            return value;
        }
        if (shouldSerialize(unwrapped)) {
            if (seen.has(unwrapped)) {
                return value;
            }
            seen.add(unwrapped);
            if (isSignal(unwrapped)) {
                return value;
            }
            if (canSerialize(unwrapped)) {
                return value;
            }
            const typeObj = typeof unwrapped;
            switch (typeObj) {
                case 'object':
                    if (isPromise(unwrapped)) {
                        return value;
                    }
                    if (isNode(unwrapped)) {
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
                    return fn.apply(this, args);
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
                const hash = _containerEl.getAttribute(QInstanceAttr);
                const doc = _containerEl.ownerDocument;
                const qFuncs = getQFuncs(doc, hash);
                // No need to wrap, syncQRLs can't have captured scope
                return (qrl.resolved = symbolRef = qFuncs[Number(symbol)]);
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
                    throw err;
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
                const prevQrl = context.$qrl$;
                const prevEvent = context.$event$;
                // Note that we set the qrl here instead of in wrapFn because
                // it is possible we're called on a copied qrl
                context.$qrl$ = qrl;
                context.$event$ || (context.$event$ = this);
                try {
                    return invoke.call(this, context, f, ...args);
                }
                finally {
                    context.$qrl$ = prevQrl;
                    context.$event$ = prevEvent;
                }
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
        if (build.isDev) {
            Object.defineProperty(qrl, '_devOnlySymbolRef', {
                get() {
                    return symbolRef;
                },
            });
        }
        if (qDev) {
            seal(qrl);
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
    /** @private Use To avoid optimizer replacement */
    const dollar = $;
    /** @public */
    const eventQrl = (qrl) => {
        return qrl;
    };
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
        const QwikComponent = () => { };
        QwikComponent[SERIALIZABLE_STATE] = [componentQrl];
        return QwikComponent;
    };
    const SERIALIZABLE_STATE = Symbol('serializable-data');
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
        return componentQrl(dollar(onMount));
    };

    /** @public */
    const event$ = implicit$FirstArg(eventQrl);

    /**
     * Render JSX.
     *
     * Use this method to render JSX. This function does reconciling which means it always tries to
     * reuse what is already in the DOM (rather then destroy and recreate content.) It returns a cleanup
     * function you could use for cleaning up subscriptions.
     *
     * @param parent - Element which will act as a parent to `jsxNode`. When possible the rendering will
     *   try to reuse existing nodes.
     * @param jsxNode - JSX to render
     * @returns An object containing a cleanup function.
     * @public
     */
    const render = async (parent, jsxNode, opts = {}) => {
        if (isDocument(parent)) {
            let child = parent.firstChild;
            while (child && !isElement$1(child)) {
                child = child.nextSibling;
            }
            parent = child;
        }
        parent.setAttribute(QContainerAttr, QContainerValue.RESUMED);
        const container = getDomContainer(parent);
        container.$serverData$ = opts.serverData || {};
        const host = container.rootVNode;
        container.$scheduler$(ChoreType.NODE_DIFF, host, host, jsxNode);
        await container.$scheduler$(ChoreType.WAIT_FOR_ALL);
        return {
            cleanup: () => {
                cleanup(container, container.rootVNode);
            },
        };
    };

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
            const containerState = iCtx.$container$;
            const recursive = opts?.deep ?? true;
            const flags = recursive ? StoreFlags.RECURSIVE : StoreFlags.NONE;
            const newStore = getOrCreateStore(value, flags, containerState);
            set(newStore);
            return newStore;
        }
    };

    const intToStr = (nu) => {
        return nu.toString(36);
    };
    const getNextUniqueIndex = (container) => {
        return intToStr(container.$currentUniqueId$++);
    };

    /** @public */
    const useId = () => {
        const { val, set, iCtx } = useSequentialScope();
        if (val != null) {
            return val;
        }
        const containerBase = isDomContainer(iCtx.$container$)
            ? ''
            : iCtx.$container$.buildBase || '';
        const base = containerBase ? hashCode(containerBase) : '';
        const componentQrl = iCtx.$container$.getHostProp(iCtx.$hostElement$, OnRenderProp);
        const hash = componentQrl?.getHash() || '';
        const counter = getNextUniqueIndex(iCtx.$container$) || '';
        const id = `${base}-${hash}-${counter}`; // If no base and no hash, then "--#"
        return set(id);
    };

    /** @public */
    function useServerData(key, defaultValue) {
        const ctx = tryGetInvokeContext();
        return ctx?.$container$?.$serverData$[key] ?? defaultValue;
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
        return {
            styleId: _useStyles(styles, (str) => str, false),
        };
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
        const { val, set, iCtx, i } = useSequentialScope();
        if (val) {
            return val;
        }
        const styleId = styleKey(styleQrl, i);
        const host = iCtx.$hostElement$;
        set(styleId);
        const value = styleQrl.$resolveLazy$(iCtx.$element$);
        if (isPromise(value)) {
            value.then((val) => iCtx.$container$.$appendStyle$(transform(val, styleId), styleId, host, scoped));
            throw value;
        }
        else {
            iCtx.$container$.$appendStyle$(transform(value, styleId), styleId, host, scoped);
        }
        return styleId;
    };

    /** @public */
    const useSignal = (initialState) => {
        return useConstant(() => {
            const value = isFunction(initialState) && !isQwikComponent(initialState)
                ? invoke(undefined, initialState)
                : initialState;
            return createSignal(value);
        });
    };
    /**
     * Stores a value which is retained for the lifetime of the component. Subsequent calls to
     * `useConstant` will always return the first value given.
     *
     * If the value is a function, the function is invoked once to calculate the actual value.
     *
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

    /** @public */
    const useComputedQrl = (qrl) => {
        const { val, set } = useSequentialScope();
        if (val) {
            return val;
        }
        assertQrl(qrl);
        const signal = new ComputedSignal(null, qrl);
        set(signal);
        // Note that we first save the signal
        // and then we throw to load the qrl
        // This is why we can't use useConstant, we need to keep using the same qrl object
        throwIfQRLNotResolved(qrl);
        return signal;
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
    const useVisibleTaskQrl = (qrl, opts) => {
        const { val, set, i, iCtx } = useSequentialScope();
        const eagerness = opts?.strategy ?? 'intersection-observer';
        if (val) {
            if (isServerPlatform()) {
                useRunTask(val, eagerness);
            }
            return;
        }
        assertQrl(qrl);
        const task = new Task(TaskFlags.VISIBLE_TASK, i, iCtx.$hostElement$, qrl, undefined, null);
        set(task);
        useRunTask(task, eagerness);
        if (!isServerPlatform()) {
            qrl.$resolveLazy$(iCtx.$element$);
            iCtx.$container$.$scheduler$(ChoreType.VISIBLE, task);
        }
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
        return useResourceQrl(dollar(generatorFn), opts);
    };

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
    const useVisibleTask$ = /*#__PURE__*/ implicit$FirstArg(useVisibleTaskQrl);

    /**
     * Creates a computed signal which is calculated from the given function. A computed signal is a
     * signal which is calculated from other signals. When the signals change, the computed signal is
     * recalculated, and if the result changed, all tasks which are tracking the signal will be re-run
     * and all components that read the signal will be re-rendered.
     *
     * The function must be synchronous and must not have any side effects.
     *
     * @public
     */
    const useComputed$ = implicit$FirstArg(useComputedQrl);

    /** @public */
    const useErrorBoundary = () => {
        const store = useStore({
            error: undefined,
        });
        useOn('error-boundary', qrl('/runtime', 'error', [store]));
        useContextProvider(ERROR_CONTEXT, store);
        return store;
    };

    /**
     * Install a service worker which will prefetch the bundles.
     *
     * There can only be one service worker per page. Because there can be many separate Qwik Containers
     * on the page each container needs to load its prefetch graph using `PrefetchGraph` component.
     *
     * @param opts - Options for the prefetch service worker.
     *
     *   - `base` - Base URL for the service worker. Default is `import.meta.env.BASE_URL`, which is defined
     *       by Vite's `config.base` and defaults to `/`.
     *   - `scope` - Base URL for when the service-worker will activate. Default is `/`
     *   - `path` - Path to the service worker. Default is `qwik-prefetch-service-worker.js` unless you pass
     *       a path that starts with a `/` then the base is ignored. Default is
     *       `qwik-prefetch-service-worker.js`
     *   - `verbose` - Verbose logging for the service worker installation. Default is `false`
     *   - `nonce` - Optional nonce value for security purposes, defaults to `undefined`.
     *
     * @alpha
     */
    const PrefetchServiceWorker = (opts) => {
        const isTest = undefined.TEST;
        if (build.isDev && !isTest) {
            const props = {
                dangerouslySetInnerHTML: '<!-- PrefetchServiceWorker is disabled in dev mode. -->',
            };
            return _jsxSorted('script', null, props, null, 0, 'prefetch-service-worker');
        }
        const serverData = useServerData('containerAttributes', {});
        // if an MFE app has a custom BASE_URL then this will be the correct value
        // if you're not using MFE from another codebase then you want to override this value to your custom setup
        const baseUrl = globalThis.BASE_URL||"/" || '/';
        const resolvedOpts = {
            base: serverData['q:base'],
            manifestHash: serverData['q:manifest-hash'],
            scope: '/',
            verbose: false,
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
        let code = PREFETCH_CODE.replace('URL', resolvedOpts.path).replace('SCOPE', resolvedOpts.scope);
        if (!build.isDev) {
            code = code.replaceAll(/\s+/gm, '');
        }
        const props = {
            dangerouslySetInnerHTML: [
                '(' + code + ')(',
                [
                    JSON.stringify(resolvedOpts.base),
                    JSON.stringify(resolvedOpts.manifestHash),
                    'navigator.serviceWorker',
                    'window.qwikPrefetchSW||(window.qwikPrefetchSW=[])',
                    resolvedOpts.verbose,
                ].join(','),
                ');',
            ].join(''),
            nonce: resolvedOpts.nonce,
        };
        return _jsxSorted('script', null, props, null, 0, 'prefetch-service-worker');
    };
    const PREFETCH_CODE = /*#__PURE__*/ ((b, // base
    h, // manifest hash
    c, // Service worker container
    q, // Queue of messages to send to the service worker.
    v // Verbose mode
    ) => {
        c.register('URL', { scope: 'SCOPE' }).then((sw, onReady) => {
            onReady = () => q.forEach((q.push = (v) => sw.active.postMessage(v)));
            sw.installing
                ? sw.installing.addEventListener('statechange', (e) => e.target.state == 'activated' && onReady())
                : onReady();
        });
        v && q.push(['verbose']);
        document.addEventListener('qprefetch', (e) => e.detail.bundles && q.push(['prefetch', b, ...e.detail.bundles]));
    }).toString();
    /**
     * Load the prefetch graph for the container.
     *
     * Each Qwik container needs to include its own prefetch graph.
     *
     * @param opts - Options for the loading prefetch graph.
     *
     *   - `base` - Base of the graph. For a default installation this will default to the q:base value
     *       `/build/`. But if more than one MFE is installed on the page, then each MFE needs to have
     *       its own base.
     *   - `manifestHash` - Hash of the manifest file to load. If not provided the hash will be extracted
     *       from the container attribute `q:manifest-hash` and assume the default build file
     *       `${base}/q-bundle-graph-${manifestHash}.json`.
     *   - `manifestURL` - URL of the manifest file to load if non-standard bundle graph location name.
     *
     * @alpha
     */
    const PrefetchGraph = (opts = {}) => {
        const isTest = undefined.TEST;
        if (build.isDev && !isTest) {
            const props = {
                dangerouslySetInnerHTML: '<!-- PrefetchGraph is disabled in dev mode. -->',
            };
            return _jsxSorted('script', null, props, null, 0, 'prefetch-graph');
        }
        const serverData = useServerData('containerAttributes', {});
        const resolvedOpts = {
            // /build/q-bundle-graph-${manifestHash}.json is always within the q:base location /build/
            base: serverData[QBaseAttr],
            manifestHash: serverData[QManifestHashAttr],
            scope: '/',
            verbose: false,
            path: 'qwik-prefetch-service-worker.js',
            ...opts,
        };
        const args = JSON.stringify([
            'graph-url',
            resolvedOpts.base,
            `q-bundle-graph-${resolvedOpts.manifestHash}.json`,
        ]);
        const code = `(window.qwikPrefetchSW||(window.qwikPrefetchSW=[])).push(${args})`;
        const props = {
            dangerouslySetInnerHTML: code,
            nonce: opts.nonce,
        };
        return _jsxSorted('script', null, props, null, 0, 'prefetch-graph');
    };

    exports.$ = $;
    exports.Fragment = Fragment;
    exports.PrefetchGraph = PrefetchGraph;
    exports.PrefetchServiceWorker = PrefetchServiceWorker;
    exports.RenderOnce = RenderOnce;
    exports.Resource = Resource;
    exports.SSRComment = SSRComment;
    exports.SSRRaw = SSRRaw;
    exports.SSRStream = SSRStream;
    exports.SSRStreamBlock = SSRStreamBlock;
    exports.SkipRender = SkipRender;
    exports.Slot = Slot;
    exports._CONST_PROPS = _CONST_PROPS;
    exports._DomContainer = DomContainer;
    exports._EMPTY_ARRAY = EMPTY_ARRAY;
    exports._EffectData = EffectData;
    exports._IMMUTABLE = _IMMUTABLE;
    exports._SharedContainer = _SharedContainer;
    exports._VAR_PROPS = _VAR_PROPS;
    exports._deserialize = _deserialize;
    exports._fnSignal = _fnSignal;
    exports._getContextElement = _getContextElement;
    exports._getContextEvent = _getContextEvent;
    exports._getDomContainer = getDomContainer;
    exports._getQContainerElement = _getQContainerElement;
    exports._hW = _hW;
    exports._isJSXNode = isJSXNode;
    exports._isStringifiable = isStringifiable;
    exports._jsxBranch = _jsxBranch;
    exports._jsxC = _jsxC;
    exports._jsxQ = _jsxQ;
    exports._jsxS = _jsxS;
    exports._jsxSorted = _jsxSorted;
    exports._jsxSplit = _jsxSplit;
    exports._noopQrl = _noopQrl;
    exports._noopQrlDEV = _noopQrlDEV;
    exports._qrlSync = _qrlSync;
    exports._regSymbol = _regSymbol;
    exports._restProps = _restProps;
    exports._serialize = _serialize;
    exports._verifySerializable = verifySerializable;
    exports._waitUntilRendered = _waitUntilRendered;
    exports._walkJSX = _walkJSX;
    exports._weakSerialize = _weakSerialize;
    exports._wrapProp = _wrapProp;
    exports._wrapSignal = _wrapSignal;
    exports.component$ = component$;
    exports.componentQrl = componentQrl;
    exports.createComputed$ = createComputed$;
    exports.createComputedQrl = createComputedQrl;
    exports.createContextId = createContextId;
    exports.createElement = h;
    exports.createSignal = createSignal;
    exports.event$ = event$;
    exports.eventQrl = eventQrl;
    exports.getDomContainer = getDomContainer;
    exports.getLocale = getLocale;
    exports.getPlatform = getPlatform;
    exports.h = h;
    exports.implicit$FirstArg = implicit$FirstArg;
    exports.inlinedQrl = inlinedQrl;
    exports.inlinedQrlDEV = inlinedQrlDEV;
    exports.isSignal = isSignal;
    exports.jsx = jsx;
    exports.jsxDEV = jsxDEV;
    exports.jsxs = jsx;
    exports.noSerialize = noSerialize;
    exports.qrl = qrl;
    exports.qrlDEV = qrlDEV;
    exports.render = render;
    exports.setPlatform = setPlatform;
    exports.sync$ = sync$;
    exports.untrack = untrack;
    exports.useComputed$ = useComputed$;
    exports.useComputedQrl = useComputedQrl;
    exports.useConstant = useConstant;
    exports.useContext = useContext;
    exports.useContextProvider = useContextProvider;
    exports.useErrorBoundary = useErrorBoundary;
    exports.useId = useId;
    exports.useLexicalScope = useLexicalScope;
    exports.useOn = useOn;
    exports.useOnDocument = useOnDocument;
    exports.useOnWindow = useOnWindow;
    exports.useResource$ = useResource$;
    exports.useResourceQrl = useResourceQrl;
    exports.useServerData = useServerData;
    exports.useSignal = useSignal;
    exports.useStore = useStore;
    exports.useStyles$ = useStyles$;
    exports.useStylesQrl = useStylesQrl;
    exports.useStylesScoped$ = useStylesScoped$;
    exports.useStylesScopedQrl = useStylesScopedQrl;
    exports.useTask$ = useTask$;
    exports.useTaskQrl = useTaskQrl;
    exports.useVisibleTask$ = useVisibleTask$;
    exports.useVisibleTaskQrl = useVisibleTaskQrl;
    exports.version = version;
    exports.withLocale = withLocale;

}));
//# sourceMappingURL=core.cjs.map
