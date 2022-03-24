import { FunctionComponent } from '../core';
import { JSXNode } from '../core';
import type { OutputEntryMap } from '../core/optimizer';

/**
 * Create emulated `Document` for server environment.
 * @public
 */
export declare function createDocument(opts?: DocumentOptions): QwikDocument;

/**
 * Create emulated `Global` for server environment. Does not implement a browser
 * `window` API, but rather only includes and emulated `document` and `location`.
 * @public
 */
export declare function createGlobal(opts?: GlobalOptions): QwikGlobal;

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
 * Options when creating a mock Qwik Document object.
 * @public
 */
export declare interface DocumentOptions {
    url?: URL | string;
    debug?: boolean;
}

/**
 * Returns a set of imports for a given source file.
 *
 * The function recursively visits the dependencies and returns a fully populated graph.
 *
 * This does not take dynamic imports into the account and so it produces an incomplete list.
 *
 * @param filePath - File path to read
 * @param readFileFn - a function used to retrieve the contents of a file at a given `filePath`
 * @alpha
 */
export declare function getImports(filePath: string, readFileFn: (path: string) => Promise<string>): Promise<string[]>;

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
 * Provides the prefetch.js file as a string. Useful for tooling to inline the prefetch
 * script into HTML.
 * @alpha
 */
export declare function getQwikPrefetchScript(opts?: {
    debug?: boolean;
}): string;

/**
 * Options when creating a mock Qwik Global object.
 * @public
 */
export declare interface GlobalOptions extends DocumentOptions {
}

/**
 * @public
 */
declare type QrlMapper = (symbolName: string) => string | undefined;

/**
 * Partial Document used by Qwik Framework.
 *
 * A set of properties which the Qwik Framework expects to find on document.
 * @public
 */
export declare interface QwikDocument extends Document {
}

/**
 * Partial Global used by Qwik Framework.
 *
 * A set of properties which the Qwik Framework expects to find on global.
 * @public
 */
export declare interface QwikGlobal extends WindowProxy {
    /**
     * Document used by Qwik during rendering.
     */
    document: QwikDocument;
    location: Location;
}

/**
 * @alpha
 */
export declare const QwikLoader: FunctionComponent<QwikLoaderProps>;

/**
 * @alpha
 */
declare interface QwikLoaderProps {
    events?: string[];
    debug?: boolean;
}

/**
 * @alpha
 */
export declare const QwikPrefetch: FunctionComponent<QwikPrefetchProps>;

/**
 * @alpha
 */
declare interface QwikPrefetchProps {
    debug?: boolean;
}

/**
 * Updates the given `document` in place by rendering the root JSX node
 * and applying to the `document`.
 *
 * @param doc - The `document` to apply the the root node to.
 * @param rootNode - The root JSX node to apply onto the `document`.
 * @public
 */
export declare function renderToDocument(docOrElm: Document | Element, rootNode: JSXNode<unknown> | FunctionComponent<any>, opts: RenderToDocumentOptions): Promise<void>;

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
     * When set, the app is serialized into a fragment. And the returned html is not a complete document.
     * Defaults to `undefined`
     */
    fragmentTagName?: string;
}

/**
 * Creates a server-side `document`, renders to root node to the document,
 * then serializes the document to a string.
 * @public
 */
export declare function renderToString(rootNode: JSXNode, opts: RenderToStringOptions): Promise<RenderToStringResult>;

/**
 * @public
 */
export declare interface RenderToStringOptions extends RenderToDocumentOptions {
    fragmentTagName?: string;
}

/**
 * @public
 */
export declare interface RenderToStringResult {
    html: string;
    timing: {
        createDocument: number;
        render: number;
        toString: number;
    };
}

/**
 * Serializes the given `document` to a string. Additionally, will serialize the
 * Qwik component state and optionally add Qwik protocols to the document.
 *
 * @param doc - The `document` to apply the the root node to.
 * @param rootNode - The root JSX node to apply onto the `document`.
 * @public
 */
export declare function serializeDocument(docOrEl: Document | Element, opts?: SerializeDocumentOptions): string;

/**
 * @public
 */
declare interface SerializeDocumentOptions extends DocumentOptions {
    symbols: QrlMapper | OutputEntryMap | null;
}

/**
 * Applies NodeJS specific platform APIs to the passed in document instance.
 * @public
 */
export declare function setServerPlatform(document: any, opts: SerializeDocumentOptions): Promise<void>;

/**
 * @alpha
 */
export declare const versions: {
    readonly qwik: string;
    readonly qwikDom: string;
};

export { }
