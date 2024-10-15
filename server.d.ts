/// <reference path="./server-modules.d.ts" />

import type { QwikManifest } from './optimizer';
import type { ResolvedManifest } from './optimizer';
import type { SnapshotResult } from '.';
import type { StreamWriter } from '.';
import type { SymbolMapperFn } from './optimizer';

/** @public */
declare interface DevJSX {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
    stack?: string;
}

/**
 * Any function taking a props object that returns JSXOutput.
 *
 * The `key`, `flags` and `dev` parameters are for internal use.
 *
 * @public
 */
declare type FunctionComponent<P = unknown> = {
    renderFn(props: P, key: string | null, flags: number, dev?: DevJSX): JSXOutput;
}['renderFn'];

/**
 * Provides the `qwikloader.js` file as a string. Useful for tooling to inline the qwikloader script
 * into HTML.
 *
 * @public
 */
export declare function getQwikLoaderScript(opts?: {
    debug?: boolean;
}): string;

/**
 * Provides the `qwik-prefetch-service-worker.js` file as a string. Useful for tooling to inline the
 * qwik-prefetch-service-worker script into HTML.
 *
 * @public
 */
export declare function getQwikPrefetchWorkerScript(opts?: {
    debug?: boolean;
}): string;

/** @public */
declare interface GlobalInjections {
    tag: string;
    attributes?: {
        [key: string]: string;
    };
    location: 'head' | 'body';
}

/** @public */
export declare interface InOrderAuto {
    strategy: 'auto';
    maximumInitialChunk?: number;
    maximumChunk?: number;
}

/** @public */
declare interface InOrderDirect {
    strategy: 'direct';
}

/** @public */
export declare interface InOrderDisabled {
    strategy: 'disabled';
}

/** @public */
export declare type InOrderStreaming = InOrderAuto | InOrderDisabled | InOrderDirect;

/** @public */
declare type JSXChildren = string | number | boolean | null | undefined | Function | RegExp | JSXChildren[] | Promise<JSXChildren> | Signal<JSXChildren> | JSXNode;

/**
 * A JSX Node, an internal structure. You probably want to use `JSXOutput` instead.
 *
 * @public
 */
declare interface JSXNode<T extends string | FunctionComponent | unknown = unknown> {
    type: T;
    props: T extends FunctionComponent<infer P> ? P : Record<any, unknown>;
    varProps: Record<any, unknown>;
    constProps: Record<any, unknown> | null;
    children: JSXChildren | null;
    flags: number;
    key: string | null;
    dev?: DevJSX;
}

/**
 * Any valid output for a component
 *
 * @public
 */
declare type JSXOutput = JSXNode | string | number | boolean | null | undefined | JSXOutput[];

/** @public */
export declare interface PrefetchImplementation {
    /**
     * `js-append`: Use JS runtime to create each `<link>` and append to the body.
     *
     * `html-append`: Render each `<link>` within html, appended at the end of the body.
     */
    linkInsert?: 'js-append' | 'html-append' | null;
    /**
     * Value of the `<link rel="...">` attribute when link is used. Defaults to `prefetch` if links
     * are inserted.
     */
    linkRel?: 'prefetch' | 'preload' | 'modulepreload' | null;
    /**
     * Value of the `<link fetchpriority="...">` attribute when link is used. Defaults to `null` if
     * links are inserted.
     */
    linkFetchPriority?: 'auto' | 'low' | 'high' | null;
    /**
     * `always`: Always include the worker fetch JS runtime.
     *
     * `no-link-support`: Only include the worker fetch JS runtime when the browser doesn't support
     * `<link>` prefetch/preload/modulepreload.
     */
    workerFetchInsert?: 'always' | 'no-link-support' | null;
    /**
     * Dispatch a `qprefetch` event with detail data containing the bundles that should be prefetched.
     * The event dispatch script will be inlined into the document's HTML so any listeners of this
     * event should already be ready to handle the event.
     *
     * This implementation will inject a script similar to:
     *
     * ```
     * <script type="module">
     *   document.dispatchEvent(new CustomEvent("qprefetch", { detail:{ "bundles": [...] } }))
     * </script>
     * ```
     *
     * By default, the `prefetchEvent` implementation will be set to `always`.
     */
    prefetchEvent?: 'always' | null;
}

/** @public */
export declare interface PrefetchResource {
    url: string;
    imports: PrefetchResource[];
}

/** @public */
export declare interface PrefetchStrategy {
    implementation?: PrefetchImplementation;
    symbolsToPrefetch?: SymbolsToPrefetch;
}

/** @public */
declare interface QwikBundle {
    size: number;
    /** Not precise, but an indication of whether this import may be a task */
    isTask?: boolean;
    symbols?: string[];
    imports?: string[];
    dynamicImports?: string[];
    origins?: string[];
}

/** @public */
export declare interface QwikLoaderOptions {
    include?: 'always' | 'never' | 'auto';
    position?: 'top' | 'bottom';
}

/**
 * The metadata of the build. One of its uses is storing where QRL symbols are located.
 *
 * @public
 */
declare interface QwikManifest_2 {
    /** Content hash of the manifest, if this changes, the code changed */
    manifestHash: string;
    /** QRL symbols */
    symbols: {
        [symbolName: string]: QwikSymbol;
    };
    /** Where QRLs are located */
    mapping: {
        [symbolName: string]: string;
    };
    /** All code bundles, used to know the import graph */
    bundles: {
        [fileName: string]: QwikBundle;
    };
    /** CSS etc to inject in the document head */
    injections?: GlobalInjections[];
    version: string;
    options?: {
        target?: string;
        buildMode?: string;
        entryStrategy?: {
            [key: string]: any;
        };
    };
    platform?: {
        [name: string]: string;
    };
}

/**
 * Options which determine how the Qwik Prefetch Service Worker is added to the document.
 *
 * Qwik Prefetch Service Worker is used to prefetch resources so that the QwikLoader will always
 * have a cache hit. This will ensure that there will not be any delays for the end user while
 * interacting with the application.
 *
 * @public
 */
declare interface QwikPrefetchServiceWorkerOptions {
    /**
     * Should the Qwik Prefetch Service Worker be added to the container. Defaults to `false` until
     * the QwikCity Service Worker is deprecated.
     */
    include?: boolean;
    /**
     * Where should the Qwik Prefetch Service Worker be added to the container. Defaults to `top` to
     * get prefetching going as fast as possible.
     */
    position?: 'top' | 'bottom';
}

/** @public */
declare interface QwikSymbol {
    origin: string;
    displayName: string;
    hash: string;
    canonicalFilename: string;
    ctxKind: 'function' | 'event';
    ctxName: string;
    captures: boolean;
    parent: string | null;
    loc: [number, number];
}

/** @public */
declare interface ReadonlySignal<T = unknown> {
    readonly value: T;
}

/** @public */
export declare type Render = RenderToString | RenderToStream;

/** @public */
export declare interface RenderOptions extends SerializeDocumentOptions {
    /** Defaults to `true` */
    snapshot?: boolean;
    /**
     * Specifies the root of the JS files of the client build. Setting a base, will cause the render
     * of the `q:base` attribute in the `q:container` element.
     */
    base?: string | ((options: RenderOptions) => string);
    /** Language to use when rendering the document. */
    locale?: string | ((options: RenderOptions) => string);
    /**
     * Specifies if the Qwik Loader script is added to the document or not.
     *
     * Defaults to `{ include: true }`.
     */
    qwikLoader?: QwikLoaderOptions;
    /**
     * Specifies if the Qwik Prefetch Service Worker script is added to the document or not.
     *
     * Defaults to `{ include: false }`. NOTE: This may be change in the future.
     */
    qwikPrefetchServiceWorker?: QwikPrefetchServiceWorkerOptions;
    prefetchStrategy?: PrefetchStrategy | null;
    /**
     * When set, the app is serialized into a fragment. And the returned html is not a complete
     * document. Defaults to `html`
     */
    containerTagName?: string;
    containerAttributes?: Record<string, string>;
    serverData?: Record<string, any>;
}

/** @public */
export declare interface RenderResult {
    prefetchResources: PrefetchResource[];
    snapshotResult: SnapshotResult | undefined;
    isStatic: boolean;
    manifest?: QwikManifest;
    /** @internal TODO: Move to snapshotResult */
    _symbols?: string[];
}

/** @public */
export declare type RenderToStream = (opts: RenderToStreamOptions) => Promise<RenderToStreamResult>;

/**
 * Creates a server-side `document`, renders to root node to the document, then serializes the
 * document to a string.
 *
 * @public
 */
export declare const renderToStream: (jsx: JSXOutput, opts: RenderToStreamOptions) => Promise<RenderToStreamResult>;

/** @public */
export declare interface RenderToStreamOptions extends RenderOptions {
    stream: StreamWriter;
    streaming?: StreamingOptions;
}

/** @public */
export declare interface RenderToStreamResult extends RenderResult {
    flushes: number;
    size: number;
    timing: {
        firstFlush: number;
        render: number;
        snapshot: number;
    };
}

/** @public */
export declare type RenderToString = (opts: RenderToStringOptions) => Promise<RenderToStringResult>;

/**
 * Creates a server-side `document`, renders to root node to the document, then serializes the
 * document to a string.
 *
 * @public
 */
export declare const renderToString: (jsx: JSXOutput, opts?: RenderToStringOptions) => Promise<RenderToStringResult>;

/** @public */
export declare interface RenderToStringOptions extends RenderOptions {
}

/** @public */
export declare interface RenderToStringResult extends RenderResult {
    html: string;
    timing: {
        firstFlush: number;
        render: number;
        snapshot: number;
    };
}

/** @public */
declare interface ResolvedManifest_2 {
    mapper: SymbolMapper;
    manifest: QwikManifest_2;
}

/** @public */
export declare function resolveManifest(manifest: QwikManifest | ResolvedManifest_2 | undefined): ResolvedManifest_2 | undefined;

/** @public */
export declare interface SerializeDocumentOptions {
    manifest?: QwikManifest | ResolvedManifest;
    symbolMapper?: SymbolMapperFn;
    debug?: boolean;
}

/** @public */
export declare function setServerPlatform(manifest: QwikManifest | ResolvedManifest | undefined): Promise<void>;

/**
 * A signal is a reactive value which can be read and written. When the signal is written, all tasks
 * which are tracking the signal will be re-run and all components that read the signal will be
 * re-rendered.
 *
 * Furthermore, when a signal value is passed as a prop to a component, the optimizer will
 * automatically forward the signal. This means that `return <div title={signal.value}>hi</div>`
 * will update the `title` attribute when the signal changes without having to re-render the
 * component.
 *
 * @public
 */
declare interface Signal<T = any> extends ReadonlySignal<T> {
    value: T;
}

/** @public */
export declare interface StreamingOptions {
    inOrder?: InOrderStreaming;
}

/** @public */
declare type SymbolMapper = Record<string, readonly [symbol: string, chunk: string]>;

/**
 * Auto: Prefetch all possible QRLs used by the document. Default
 *
 * @public
 */
export declare type SymbolsToPrefetch = 'auto' | ((opts: {
    manifest: QwikManifest;
}) => PrefetchResource[]);

/** @public */
export declare const versions: {
    readonly qwik: string;
    readonly qwikDom: string;
};

export { }
