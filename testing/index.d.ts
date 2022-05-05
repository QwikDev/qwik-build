/**
 * Create emulated `Document` for server environment.
 * @public
 */
export declare function createDocument(opts?: DocumentOptions): QwikDocument;

/**
 * @public
 */
export declare interface CreateRenderToStringOptions {
    symbolsPath: string;
}

/**
 * Utility timer function for performance profiling.
 * Returns a duration of 0 in environments that do not support performance.
 * @alpha
 */
export declare function createTimer(): () => number;

/**
 * Create emulated `Window` for server environment. Does not implement the full browser
 * `window` API, but rather only emulates `document` and `location`.
 * @public
 */
export declare function createWindow(opts?: WindowOptions): QwikWindow;

/**
 * Options when creating a mock Qwik Document object.
 * @public
 */
export declare interface DocumentOptions {
    url?: URL | string;
    html?: string;
    debug?: boolean;
}

/**
 * @public
 */
declare interface FunctionComponent<P = {}> {
    (props: P, key?: string): JSXNode | null;
}

/**
 * Provides the qwikloader.js file as a string. Useful for tooling to inline the qwikloader
 * script into HTML.
 * @alpha
 */
export declare function getQwikLoaderScript(opts?: {
    events?: string[];
    debug?: boolean;
}): string;

/**
 * @alpha
 */
declare interface GlobalInjections {
    tag: string;
    attributes?: {
        [key: string]: string;
    };
    location: 'head' | 'body';
    children?: string;
}

/**
 * @public
 */
declare interface JSXNode<T = any> {
    type: T;
    props: Record<string, any> | null;
    children: JSXNode[];
    key: string | null;
    elm?: Node;
    text?: string;
}

/**
 * @alpha
 */
declare interface PrefetchStrategy {
    implementation?: PrefetchStrategyImplementation;
    symbolsToPrefetch?: SymbolsToPrefetch;
}

/**
 * @alpha
 */
declare type PrefetchStrategyImplementation = 'link-prefetch' | 'link-preload' | 'link-modulepreload' | 'qrl-import' | 'worker-fetch' | 'none';

/**
 * @public
 */
export declare type QrlMapper = (symbolName: string) => string | undefined;

/**
 * @alpha
 */
export declare interface QwikBundle {
    size: number;
    imports?: string[];
    dynamicImports?: string[];
}

/**
 * Partial Document used by Qwik Framework.
 *
 * A set of properties which the Qwik Framework expects to find on document.
 * @public
 */
export declare interface QwikDocument extends Document {
}

/**
 * @alpha
 */
export declare interface QwikManifest {
    symbols: {
        [symbolName: string]: QwikSymbol;
    };
    mapping: {
        [symbolName: string]: string;
    };
    bundles: {
        [fileName: string]: QwikBundle;
    };
    injections?: GlobalInjections[];
    version: string;
}

/**
 * @alpha
 */
export declare interface QwikSymbol {
    ctxKind: 'function' | 'event';
    ctxName: string;
    captures: boolean;
    parent: string | null;
}

/**
 * Partial Window used by Qwik Framework.
 *
 * A set of properties which the Qwik Framework expects to find on global.
 * @public
 */
export declare interface QwikWindow extends WindowProxy {
    /**
     * Document used by Qwik during rendering.
     */
    document: QwikDocument;
    location: Location;
}

/**
 * Updates the given `document` in place by rendering the root JSX node
 * and applying to the `document`.
 *
 * @param docOrElm - The `document` to apply the the root node to.
 * @param rootNode - The root JSX node to apply onto the `document`.
 * @public
 */
export declare function renderToDocument(docOrElm: Document | Element, rootNode: JSXNode<unknown> | FunctionComponent<any>, opts?: RenderToDocumentOptions): Promise<void>;

/**
 * @public
 */
export declare interface RenderToDocumentOptions extends SerializeDocumentOptions, DocumentOptions {
    /**
     * Defaults to `true`
     */
    snapshot?: boolean;
    /**
     * Specifies the root of the JS files of the client build.
     * Setting a base, will cause the render of the `q:base` attribute in the `q:container` element.
     */
    base?: string;
    /**
     * Specifies if the Qwik Loader script is added to the document or not. Defaults to `{ include: true }`.
     */
    qwikLoader?: {
        events?: string[];
        include?: boolean;
    };
}

/**
 * Creates a server-side `document`, renders to root node to the document,
 * then serializes the document to a string.
 * @public
 */
export declare function renderToString(rootNode: JSXNode, opts?: RenderToStringOptions): Promise<RenderToStringResult>;

/**
 * @public
 */
export declare interface RenderToStringOptions extends RenderToDocumentOptions {
    /**
     * When set, the app is serialized into a fragment. And the returned html is not a complete document.
     * Defaults to `undefined`
     */
    fragmentTagName?: string;
    prefetchStrategy?: PrefetchStrategy;
}

/**
 * @public
 */
export declare interface RenderToStringResult {
    html: string;
    prefetchUrls: string[];
    timing: {
        createDocument: number;
        render: number;
        toString: number;
    };
}

/**
 * Serializes the given `document` to a string. Additionally, will serialize the
 * Qwik component state and optionally add Qwik protocols to the document.
 * @public
 */
export declare function serializeDocument(docOrEl: Document | Element, opts?: SerializeDocumentOptions): string;

/**
 * @public
 */
declare interface SerializeDocumentOptions extends DocumentOptions {
    manifest?: QwikManifest;
    qrlMapper?: QrlMapper;
}

/**
 * Applies NodeJS specific platform APIs to the passed in document instance.
 * @public
 */
export declare function setServerPlatform(document: any, opts: SerializeDocumentOptions): Promise<void>;

/**
 * all: Prefetch all QRLs used by the app.
 * all-document: Prefetch all QRLs used by the document.
 * events-document: Prefetch event QRLs used by the document. Default
 *
 * @alpha
 */
declare type SymbolsToPrefetch = 'all-document' | 'all' | 'events-document' | ((opts: {
    document: QwikDocument;
    manifest: QwikManifest;
}) => string[]);

/**
 * @public
 */
export declare const versions: {
    readonly qwik: string;
    readonly qwikDom: string;
};

/**
 * Options when creating a mock Qwik Window object.
 * @public
 */
export declare interface WindowOptions extends DocumentOptions {
}

export { }
