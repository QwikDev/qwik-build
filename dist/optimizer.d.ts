import type { Plugin as Plugin_2 } from 'vite';

/**
 * A function that returns a map of bundle names to their dependencies.
 *
 * @public
 */
export declare type BundleGraphAdder = (manifest: QwikManifest) => Record<string, {
    imports?: string[];
    dynamicImports?: string[];
}>;

/** @public */
export declare interface ComponentEntryStrategy {
    type: 'component';
    manual?: Record<string, string>;
}

/** @public */
export declare const createOptimizer: (optimizerOptions?: OptimizerOptions) => Promise<Optimizer>;

declare function createSymbolMapper(base: string): SymbolMapperFn;

/** @public */
export declare interface Diagnostic {
    scope: string;
    category: DiagnosticCategory;
    code: string | null;
    file: string;
    message: string;
    highlights: SourceLocation[];
    suggestions: string[] | null;
}

/** @public */
export declare type DiagnosticCategory = 'error' | 'warning' | 'sourceError';

/** @public */
declare type EmitMode = 'dev' | 'prod' | 'lib';

/** @public */
export declare type EntryStrategy = InlineEntryStrategy | HoistEntryStrategy | SingleEntryStrategy | HookEntryStrategy_2 | SegmentEntryStrategy | ComponentEntryStrategy | SmartEntryStrategy;

/**
 * Use `__EXPERIMENTAL__.x` to check if feature `x` is enabled. It will be replaced with `true` or
 * `false` via an exact string replacement.
 *
 * Add experimental features to this enum definition.
 *
 * @alpha
 */
export declare enum ExperimentalFeatures {
    /** Enable the usePreventNavigate hook */
    preventNavigate = "preventNavigate",
    /** Enable the Valibot form validation */
    valibot = "valibot",
    /** Disable SPA navigation handler in Qwik City */
    noSPA = "noSPA",
    /** Enable request.rewrite() */
    enableRequestRewrite = "enableRequestRewrite"
}

/** @public */
export declare interface GlobalInjections {
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
declare interface HookEntryStrategy_2 {
    type: 'hook';
    manual?: Record<string, string>;
}

/** @public */
export declare interface InlineEntryStrategy {
    type: 'inline';
}

/** @public */
export declare type MinifyMode = 'simplify' | 'none';

declare interface NormalizedQwikPluginOptions extends Omit<Required<QwikPluginOptions>, 'vendorRoots' | 'experimental'> {
    input: string[] | {
        [entry: string]: string;
    };
    experimental?: Record<keyof typeof ExperimentalFeatures, boolean>;
}

/** @public */
export declare interface Optimizer {
    /** Transforms the input code string, does not access the file system. */
    transformModules(opts: TransformModulesOptions): Promise<TransformOutput>;
    /** Transforms the input code string, does not access the file system. */
    transformModulesSync(opts: TransformModulesOptions): TransformOutput;
    /** Transforms the directory from the file system. */
    transformFs(opts: TransformFsOptions): Promise<TransformOutput>;
    /** Transforms the directory from the file system. */
    transformFsSync(opts: TransformFsOptions): TransformOutput;
    /** Optimizer system use. This can be updated with a custom file system. */
    sys: OptimizerSystem;
}

/** @public */
export declare interface OptimizerOptions {
    sys?: OptimizerSystem;
    binding?: any;
    /** Inline the global styles if they're smaller than this */
    inlineStylesUpToBytes?: number;
    /** Enable sourcemaps */
    sourcemap?: boolean;
}

/** @public */
export declare interface OptimizerSystem {
    cwd: () => string;
    env: SystemEnvironment;
    os: string;
    dynamicImport: (path: string) => Promise<any>;
    strictDynamicImport: (path: string) => Promise<any>;
    getInputFiles?: (rootDir: string) => Promise<TransformModuleInput[]>;
    path: Path;
}

/**
 * Workaround to make the api be defined in the type.
 *
 * @internal
 */
declare type P<T> = Plugin_2<T> & {
    api: T;
    config: Extract<Plugin_2<T>['config'], Function>;
};

/** @public */
export declare interface Path {
    resolve(...paths: string[]): string;
    normalize(path: string): string;
    isAbsolute(path: string): boolean;
    join(...paths: string[]): string;
    relative(from: string, to: string): string;
    dirname(path: string): string;
    basename(path: string, ext?: string): string;
    extname(path: string): string;
    format(pathObject: {
        root: string;
        dir: string;
        base: string;
        ext: string;
        name: string;
    }): string;
    parse(path: string): {
        root: string;
        dir: string;
        base: string;
        ext: string;
        name: string;
    };
    readonly sep: string;
    readonly delimiter: string;
    readonly win32: null;
    readonly posix: Path;
}

/** @public */
export declare interface QwikAsset {
    /** Name of the asset */
    name: string | undefined;
    /** Size of the asset */
    size: number;
}

/** @public */
export declare type QwikBuildMode = 'production' | 'development';

/** @public */
export declare type QwikBuildTarget = 'client' | 'ssr' | 'lib' | 'test';

/** @public */
export declare interface QwikBundle {
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
export declare type QwikBundleGraph = Array<string | number>;

/**
 * The metadata of the build. One of its uses is storing where QRL symbols are located.
 *
 * @public
 */
export declare interface QwikManifest {
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

declare interface QwikPluginDevTools {
    imageDevTools?: boolean | true;
    clickToSource?: string[] | false;
}

declare interface QwikPluginOptions {
    csr?: boolean;
    buildMode?: QwikBuildMode;
    debug?: boolean;
    entryStrategy?: EntryStrategy;
    rootDir?: string;
    tsconfigFileNames?: string[];
    /** @deprecated No longer used */
    vendorRoots?: string[];
    manifestOutput?: ((manifest: QwikManifest) => Promise<void> | void) | null;
    manifestInput?: QwikManifest | null;
    input?: string[] | string | {
        [entry: string]: string;
    };
    outDir?: string;
    assetsDir?: string;
    srcDir?: string | null;
    scope?: string | null;
    srcInputs?: TransformModuleInput[] | null;
    sourcemap?: boolean;
    resolveQwikBuild?: boolean;
    target?: QwikBuildTarget;
    transformedModuleOutput?: ((transformedModules: TransformModule[]) => Promise<void> | void) | null;
    devTools?: QwikPluginDevTools;
    /**
     * Inline styles up to a certain size (in bytes) instead of using a separate file.
     *
     * Default: 20kb (20,000bytes)
     */
    inlineStylesUpToBytes?: number;
    /**
     * Run eslint on the source files for the ssr build or dev server. This can slow down startup on
     * large projects. Defaults to `true`
     */
    lint?: boolean;
    /**
     * Experimental features. These can come and go in patch releases, and their API is not guaranteed
     * to be stable between releases.
     */
    experimental?: (keyof typeof ExperimentalFeatures)[];
}

/** @public */
export declare function qwikRollup(qwikRollupOpts?: QwikRollupPluginOptions): any;

/** @public */
export declare interface QwikRollupPluginOptions {
    csr?: boolean;
    /**
     * Build `production` or `development`.
     *
     * Default `development`
     */
    buildMode?: QwikBuildMode;
    /**
     * Target `client` or `ssr`.
     *
     * Default `client`
     */
    target?: QwikBuildTarget;
    /**
     * Prints verbose Qwik plugin debug logs.
     *
     * Default `false`
     */
    debug?: boolean;
    /**
     * The Qwik entry strategy to use while building for production. During development the type is
     * always `segment`.
     *
     * Default `{ type: "smart" }`)
     */
    entryStrategy?: EntryStrategy;
    /**
     * The source directory to find all the Qwik components. Since Qwik does not have a single input,
     * the `srcDir` is used to recursively find Qwik files.
     *
     * Default `src`
     */
    srcDir?: string;
    /**
     * Alternative to `srcDir`, where `srcInputs` is able to provide the files manually. This option
     * is useful for an environment without a file system, such as a webworker.
     *
     * Default: `null`
     */
    srcInputs?: TransformModuleInput[] | null;
    /**
     * The root of the application, which is commonly the same directory as `package.json` and
     * `rollup.config.js`.
     *
     * Default `process.cwd()`
     */
    rootDir?: string;
    /**
     * The client build will create a manifest and this hook is called with the generated build data.
     *
     * Default `undefined`
     */
    manifestOutput?: (manifest: QwikManifest) => Promise<void> | void;
    /**
     * The SSR build requires the manifest generated during the client build. The `manifestInput`
     * option can be used to manually provide a manifest.
     *
     * Default `undefined`
     */
    manifestInput?: QwikManifest;
    optimizerOptions?: OptimizerOptions;
    /**
     * Hook that's called after the build and provides all of the transformed modules that were used
     * before bundling.
     */
    transformedModuleOutput?: ((transformedModules: TransformModule[]) => Promise<void> | void) | null;
    /**
     * Run eslint on the source files for the ssr build or dev server. This can slow down startup on
     * large projects. Defaults to `true`
     */
    lint?: boolean;
    /**
     * Experimental features. These can come and go in patch releases, and their API is not guaranteed
     * to be stable between releases.
     */
    experimental?: (keyof typeof ExperimentalFeatures)[];
}

/** @public */
export declare interface QwikSymbol {
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

/**
 * The types for Vite/Rollup don't allow us to be too specific about the return type. The correct
 * return type is `[QwikVitePlugin, VitePlugin<never>]`, and if you search the plugin by name you'll
 * get the `QwikVitePlugin`.
 *
 * @public
 */
export declare function qwikVite(qwikViteOpts?: QwikVitePluginOptions): any;

/** @public */
export declare interface QwikViteDevResponse {
    _qwikEnvData?: Record<string, any>;
    _qwikRenderResolve?: () => void;
}

/**
 * This is the type of the "pre" Qwik Vite plugin. `qwikVite` actually returns a tuple of two
 * plugins, but after Vite flattens them, you can find the plugin by name.
 *
 * @public
 */
export declare type QwikVitePlugin = P<QwikVitePluginApi> & {
    name: 'vite-plugin-qwik';
};

/** @public */
export declare interface QwikVitePluginApi {
    getOptimizer: () => Optimizer | null;
    getOptions: () => NormalizedQwikPluginOptions;
    getManifest: () => QwikManifest | null;
    getRootDir: () => string | null;
    getClientOutDir: () => string | null;
    getClientPublicOutDir: () => string | null;
    getAssetsDir: () => string | undefined;
    registerBundleGraphAdder: (adder: BundleGraphAdder) => void;
}

declare interface QwikVitePluginCommonOptions {
    /**
     * Prints verbose Qwik plugin debug logs.
     *
     * Default `false`
     */
    debug?: boolean;
    /**
     * The Qwik entry strategy to use while building for production. During development the type is
     * always `segment`.
     *
     * Default `{ type: "smart" }`)
     */
    entryStrategy?: EntryStrategy;
    /**
     * The source directory to find all the Qwik components. Since Qwik does not have a single input,
     * the `srcDir` is used to recursively find Qwik files.
     *
     * Default `src`
     */
    srcDir?: string;
    /**
     * List of tsconfig.json files to use for ESLint warnings during development.
     *
     * Default `['tsconfig.json']`
     */
    tsconfigFileNames?: string[];
    /**
     * List of directories to recursively search for Qwik components or Vendors.
     *
     * Default `[]`
     *
     * @deprecated No longer used. Instead, any imported file with `.qwik.` in the name is processed.
     */
    vendorRoots?: string[];
    /**
     * Disables the automatic vendor roots scan. This is useful when you want to manually specify the
     * vendor roots.
     */
    disableVendorScan?: boolean;
    /**
     * Options for the Qwik optimizer.
     *
     * Default `undefined`
     */
    optimizerOptions?: OptimizerOptions;
    /**
     * Hook that's called after the build and provides all of the transformed modules that were used
     * before bundling.
     */
    transformedModuleOutput?: ((transformedModules: TransformModule[]) => Promise<void> | void) | null;
    devTools?: {
        /**
         * Validates image sizes for CLS issues during development. In case of issues, provides you with
         * a correct image size resolutions. If set to `false`, image dev tool will be disabled.
         *
         * Default `true`
         */
        imageDevTools?: boolean | true;
        /**
         * Press-hold the defined keys to enable qwik dev inspector. By default the behavior is
         * activated by pressing the left or right `Alt` key. If set to `false`, qwik dev inspector will
         * be disabled.
         *
         * Valid values are `KeyboardEvent.code` values. Please note that the 'Left' and 'Right'
         * suffixes are ignored.
         */
        clickToSource?: string[] | false;
    };
    /**
     * Predicate function to filter out files from the optimizer. hook for resolveId, load, and
     * transform
     */
    fileFilter?: (id: string, hook: string) => boolean;
    /**
     * Run eslint on the source files for the ssr build or dev server. This can slow down startup on
     * large projects. Defaults to `true`
     */
    lint?: boolean;
    /**
     * Experimental features. These can come and go in patch releases, and their API is not guaranteed
     * to be stable between releases
     */
    experimental?: (keyof typeof ExperimentalFeatures)[];
    /**
     * Disables automatic preloading of font assets (WOFF/WOFF2/TTF) found in the build output. When
     * enabled, the plugin will not add `<link rel="preload">` tags for font files in the document
     * head.
     *
     * Disabling may impact Cumulative Layout Shift (CLS) metrics.
     */
    disableFontPreload?: boolean;
}

declare interface QwikVitePluginCSROptions extends QwikVitePluginCommonOptions {
    /** Client Side Rendering (CSR) mode. It will not support SSR, default to Vite's `index.html` file. */
    csr: true;
    client?: never;
    devSsrServer?: never;
    ssr?: never;
}

declare interface QwikVitePluginCSROptions extends QwikVitePluginCommonOptions {
    /** Client Side Rendering (CSR) mode. It will not support SSR, default to Vite's `index.html` file. */
    csr: true;
}

/** @public */
export declare type QwikVitePluginOptions = QwikVitePluginCSROptions | QwikVitePluginSSROptions;

declare interface QwikVitePluginSSROptions extends QwikVitePluginCommonOptions {
    /** Client Side Rendering (CSR) mode. It will not support SSR, default to Vite's `index.html` file. */
    csr?: false | undefined;
    client?: {
        /**
         * The entry point for the client builds. This would be the application's root component
         * typically.
         *
         * Default `src/components/app/app.tsx`
         */
        input?: string[] | string;
        /**
         * Entry input for client-side only development with hot-module reloading. This is for Vite
         * development only and does not use SSR.
         *
         * Default `src/entry.dev.tsx`
         */
        devInput?: string;
        /**
         * Output directory for the client build.
         *
         * Default `dist`
         */
        outDir?: string;
        /**
         * The client build will create a manifest and this hook is called with the generated build
         * data.
         *
         * Default `undefined`
         */
        manifestOutput?: (manifest: QwikManifest) => Promise<void> | void;
    };
    /**
     * Qwik is SSR first framework. This means that Qwik requires either SSR or SSG. In dev mode the
     * dev SSR server is responsible for rendering and pausing the application on the server.
     *
     * Under normal circumstances this should be on, unless you have your own SSR server which you
     * would like to use instead and wish to disable this one.
     *
     * Default: true
     */
    devSsrServer?: boolean;
    /** Controls the SSR behavior. */
    ssr?: {
        /**
         * The entry point for the SSR renderer. This file should export a `render()` function. This
         * entry point and `render()` export function is also used for Vite's SSR development and
         * Node.js debug mode.
         *
         * Default `src/entry.ssr.tsx`
         */
        input?: string;
        /**
         * Output directory for the server build.
         *
         * Default `server`
         */
        outDir?: string;
        /**
         * The SSR build requires the manifest generated during the client build. By default, this
         * plugin will wire the client manifest to the ssr build. However, the `manifestInput` option
         * can be used to manually provide a manifest.
         *
         * Default `undefined`
         */
        manifestInput?: QwikManifest;
    };
}

/** @public */
export declare interface ResolvedManifest {
    mapper: SymbolMapper;
    manifest: ServerQwikManifest;
    injections: GlobalInjections[];
}

/** @public */
declare interface SegmentAnalysis {
    origin: string;
    name: string;
    entry: string | null;
    displayName: string;
    hash: string;
    canonicalFilename: string;
    extension: string;
    parent: string | null;
    ctxKind: 'eventHandler' | 'function';
    ctxName: string;
    captures: boolean;
    loc: [number, number];
}
export { SegmentAnalysis as HookAnalysis }
export { SegmentAnalysis }

/** @public */
declare interface SegmentEntryStrategy {
    type: 'segment';
    manual?: Record<string, string>;
}
export { SegmentEntryStrategy as HookEntryStrategy }
export { SegmentEntryStrategy }

/**
 * The manifest values that are needed for SSR.
 *
 * @public
 */
export declare type ServerQwikManifest = Pick<QwikManifest, 'manifestHash' | 'injections' | 'bundleGraph' | 'bundleGraphAsset' | 'mapping' | 'preloader' | 'core' | 'qwikLoader'>;

/** @public */
export declare interface SingleEntryStrategy {
    type: 'single';
    manual?: Record<string, string>;
}

/** @public */
export declare interface SmartEntryStrategy {
    type: 'smart';
    manual?: Record<string, string>;
}

/** @public */
export declare interface SourceLocation {
    hi: number;
    lo: number;
    startLine: number;
    startCol: number;
    endLine: number;
    endCol: number;
}

/** @public */
export declare type SourceMapsOption = 'external' | 'inline' | undefined | null;

/** @public */
export declare type SymbolMapper = Record<string, readonly [symbol: string, chunk: string]>;

/**
 * @alpha
 *   For a given symbol (QRL such as `onKeydown$`) the server needs to know which bundle the symbol is in.
 *
 *   Normally this is provided by Qwik's `q-manifest` . But `q-manifest` only exists after a full client build.
 *
 *   This would be a problem in dev mode. So in dev mode the symbol is mapped to the expected URL using the symbolMapper function below. For Vite the given path is fixed for a given symbol.
 */
export declare let symbolMapper: ReturnType<typeof createSymbolMapper>;

/** @public */
export declare type SymbolMapperFn = (symbolName: string, mapper: SymbolMapper | undefined, parent?: string) => readonly [symbol: string, chunk: string] | undefined;

/** @public */
export declare type SystemEnvironment = 'node' | 'deno' | 'bun' | 'webworker' | 'browsermain' | 'unknown';

/** @public */
export declare interface TransformFsOptions extends TransformOptions {
    vendorRoots: string[];
}

/** @public */
export declare interface TransformModule {
    path: string;
    isEntry: boolean;
    code: string;
    map: string | null;
    segment: SegmentAnalysis | null;
    origPath: string | null;
}

/** @public */
export declare interface TransformModuleInput {
    path: string;
    devPath?: string;
    code: string;
}

/** @public */
export declare interface TransformModulesOptions extends TransformOptions {
    input: TransformModuleInput[];
}

/** @public */
export declare interface TransformOptions {
    srcDir: string;
    rootDir?: string;
    entryStrategy?: EntryStrategy;
    minify?: MinifyMode;
    sourceMaps?: boolean;
    transpileTs?: boolean;
    transpileJsx?: boolean;
    preserveFilenames?: boolean;
    explicitExtensions?: boolean;
    mode?: EmitMode;
    scope?: string;
    stripExports?: string[];
    regCtxName?: string[];
    stripCtxName?: string[];
    stripEventHandlers?: boolean;
    isServer?: boolean;
}

/** @public */
export declare interface TransformOutput {
    modules: TransformModule[];
    diagnostics: Diagnostic[];
    isTypeScript: boolean;
    isJsx: boolean;
}

/** @public */
export declare type TranspileOption = boolean | undefined | null;

/** @public */
export declare const versions: {
    qwik: string;
};

export { }
