/// <reference path="./server-modules.d.ts" />

import type { QwikManifest } from './optimizer';
import type { ResolvedManifest } from './optimizer';
import type { ServerQwikManifest } from './optimizer';
import type { SnapshotResult } from '.';
import type { StreamWriter } from '.';
import type { SymbolMapperFn } from './optimizer';

/** @public */
declare interface ComponentEntryStrategy {
    type: 'component';
    manual?: Record<string, string>;
}

/** @public */
declare type EntryStrategy = InlineEntryStrategy | HoistEntryStrategy | SingleEntryStrategy | HookEntryStrategy | SegmentEntryStrategy | ComponentEntryStrategy | SmartEntryStrategy;

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
declare interface HoistEntryStrategy {
    type: 'hoist';
}

/** @deprecated Use SegmentStrategy instead */
declare interface HookEntryStrategy {
    type: 'hook';
    manual?: Record<string, string>;
}

/** @public */
declare interface InlineEntryStrategy {
    type: 'inline';
}

/** @public */
export declare interface InOrderAuto {
    strategy: 'auto';
    maximunInitialChunk?: number;
    maximunChunk?: number;
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

/** @public @deprecated Use `preloader` instead */
export declare interface PrefetchImplementation {
    /** @deprecated No longer used. */
    linkRel?: 'prefetch' | 'preload' | 'modulepreload' | null;
    /** @deprecated No longer used. */
    linkFetchPriority?: 'auto' | 'low' | 'high' | null;
    /** @deprecated No longer used. */
    linkInsert?: 'js-append' | 'html-append' | null;
    /** @deprecated No longer used. */
    workerFetchInsert?: 'always' | 'no-link-support' | null;
    /** @deprecated No longer used. */
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
export declare interface PreloaderOptions {
    /**
     * Maximum number of preload links to add during SSR. These instruct the browser to preload likely
     * bundles before the preloader script is active. This most likely includes the core and the
     * preloader script itself. Setting this to 0 will disable all preload links.
     *
     * Preload links can delay LCP, which is a Core Web Vital, but it can increase TTI, which is not a
     * Core Web Vital but more noticeable to the user.
     *
     * Defaults to `5`
     */
    ssrPreloads?: number;
    /**
     * The minimum probability for a bundle to be added as a preload link during SSR.
     *
     * Defaults to `0.7` (70% probability)
     */
    ssrPreloadProbability?: number;
    /**
     * Log preloader debug information to the console.
     *
     * Defaults to `false`
     */
    debug?: boolean;
    /**
     * Maximum number of simultaneous preload links that the preloader will maintain. If you set this
     * higher, the browser will have all JS files in memory sooner, but it will contend with other
     * resource downloads. Furthermore, if a bundle suddenly becomes more likely, it will have to wait
     * longer to be preloaded.
     *
     * Bundles that reach 100% probability (static imports of other bundles) will always be preloaded
     * immediately, no limit.
     *
     * Defaults to `25`
     */
    maxIdlePreloads?: number;
    /**
     * The minimum probability for a bundle to be added to the preload queue.
     *
     * Defaults to `0.35` (35% probability)
     */
    preloadProbability?: number;
}

/** @public */
declare interface QwikAsset {
    /** Name of the asset */
    name: string | undefined;
    /** Size of the asset */
    size: number;
}

/** @public */
declare interface QwikBundle {
    /** Size of the bundle */
    size: number;
    /** Total size of this bundle's static import graph */
    total: number;
    /** Interactivity score of the bundle */
    interactivity?: number;
    /** Symbols in the bundle */
    symbols?: string[];
    /** Direct imports */
    imports?: string[];
    /** Dynamic imports */
    dynamicImports?: string[];
    /** Source files of the bundle */
    origins?: string[];
}

/**
 * Bundle graph.
 *
 * Format: [ 'bundle-a.js', 3, 5 // Depends on 'bundle-b.js' and 'bundle-c.js' 'bundle-b.js', 5, //
 * Depends on 'bundle-c.js' 'bundle-c.js', ]
 *
 * @public
 */
declare type QwikBundleGraph = Array<string | number>;

/** @public */
export declare interface QwikLoaderOptions {
    /**
     * Whether to include the qwikloader script in the document. Normally you don't need to worry
     * about this, but in case of multi-container apps using different Qwik versions, you might want
     * to only enable it on one of the containers.
     *
     * Defaults to `'auto'`.
     */
    include?: 'always' | 'never' | 'auto';
    /** @deprecated No longer used, the qwikloader is always loaded as soon as possible */
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
    /** Where QRLs are located. The key is the symbol name, the value is the bundle fileName */
    mapping: {
        [symbolName: string]: string;
    };
    /**
     * All code bundles, used to know the import graph. The key is the bundle fileName relative to
     * "build/"
     */
    bundles: {
        [fileName: string]: QwikBundle;
    };
    /** All assets. The key is the fileName relative to the rootDir */
    assets?: {
        [fileName: string]: QwikAsset;
    };
    /** All bundles in a compact graph format with probabilities */
    bundleGraph?: QwikBundleGraph;
    /** The bundle graph fileName */
    bundleGraphAsset?: string;
    /** The preloader bundle fileName */
    preloader?: string;
    /** The Qwik core bundle fileName */
    core?: string;
    /** The Qwik loader bundle fileName */
    qwikLoader?: string;
    /** CSS etc to inject in the document head */
    injections?: GlobalInjections[];
    /** The version of the manifest */
    version: string;
    /** The options used to build the manifest */
    options?: {
        target?: string;
        buildMode?: string;
        entryStrategy?: {
            type: EntryStrategy['type'];
        };
    };
    /** The platform used to build the manifest */
    platform?: {
        [name: string]: string;
    };
}

/**
 * @deprecated This is no longer used as the preloading happens automatically in qrl-class.ts.
 * @public
 */
declare interface QwikPrefetchServiceWorkerOptions {
    /** @deprecated This is no longer used as the preloading happens automatically in qrl-class.ts. */
    include?: boolean;
    /** @deprecated This is no longer used as the preloading happens automatically in qrl-class.ts. */
    position?: 'top' | 'bottom';
}

/** @public */
declare interface QwikSymbol {
    origin: string;
    displayName: string;
    hash: string;
    canonicalFilename: string;
    ctxKind: 'function' | 'eventHandler';
    ctxName: string;
    captures: boolean;
    parent: string | null;
    loc: [number, number];
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
    preloader?: PreloaderOptions | false;
    /** @deprecated Use `preloader` instead */
    qwikPrefetchServiceWorker?: QwikPrefetchServiceWorkerOptions;
    /** @deprecated Use `preloader` instead */
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
    manifest?: ServerQwikManifest;
}

/** @public */
export declare type RenderToStream = (opts: RenderToStreamOptions) => Promise<RenderToStreamResult>;

/**
 * Creates a server-side `document`, renders to root node to the document, then serializes the
 * document to a string.
 *
 * @public
 */
export declare function renderToStream(rootNode: any, opts: RenderToStreamOptions): Promise<RenderToStreamResult>;

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
export declare function renderToString(rootNode: any, opts?: RenderToStringOptions): Promise<RenderToStringResult>;

/** @public */
export declare interface RenderToStringOptions extends RenderOptions {
}

/** @public */
export declare interface RenderToStringResult extends RenderResult {
    html: string;
    timing: {
        render: number;
        snapshot: number;
    };
}

/** @public */
declare interface ResolvedManifest_2 {
    mapper: SymbolMapper;
    manifest: ServerQwikManifest_2;
    injections: GlobalInjections[];
}

/**
 * Merges a given manifest with the built manifest and provides mappings for symbols.
 *
 * @public
 */
export declare function resolveManifest(manifest?: Partial<QwikManifest | ResolvedManifest_2> | undefined): ResolvedManifest_2 | undefined;

/** @public */
declare interface SegmentEntryStrategy {
    type: 'segment';
    manual?: Record<string, string>;
}

/** @public */
export declare interface SerializeDocumentOptions {
    manifest?: Partial<QwikManifest | ResolvedManifest>;
    symbolMapper?: SymbolMapperFn;
    debug?: boolean;
}

/**
 * The manifest values that are needed for SSR.
 *
 * @public
 */
declare type ServerQwikManifest_2 = Pick<QwikManifest_2, 'manifestHash' | 'injections' | 'bundleGraph' | 'bundleGraphAsset' | 'mapping' | 'preloader' | 'core' | 'qwikLoader'>;

/** @public */
export declare function setServerPlatform(manifest?: Partial<QwikManifest | ResolvedManifest>): Promise<void>;

/** @public */
declare interface SingleEntryStrategy {
    type: 'single';
    manual?: Record<string, string>;
}

/** @public */
declare interface SmartEntryStrategy {
    type: 'smart';
    manual?: Record<string, string>;
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
    manifest: ServerQwikManifest;
}) => PrefetchResource[]);

/** @public */
export declare const versions: {
    readonly qwik: string;
    readonly qwikDom: string;
};

export { }
