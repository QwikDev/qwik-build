/** @public */
export declare interface ComponentEntryStrategy {
    type: 'component';
    manual?: Record<string, string>;
}

/** @public */
export declare const createOptimizer: (optimizerOptions?: OptimizerOptions) => Promise<Optimizer>;

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
export declare type EntryStrategy = InlineEntryStrategy | HoistEntryStrategy | SingleEntryStrategy | HookEntryStrategy | ComponentEntryStrategy | SmartEntryStrategy;

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

/** @public */
export declare interface HookAnalysis {
    origin: string;
    name: string;
    entry: string | null;
    displayName: string;
    hash: string;
    canonicalFilename: string;
    extension: string;
    parent: string | null;
    ctxKind: 'event' | 'function';
    ctxName: string;
    captures: boolean;
    loc: [number, number];
}

/** @public */
export declare interface HookEntryStrategy {
    type: 'hook';
    manual?: Record<string, string>;
}

/** @public */
export declare interface InlineEntryStrategy {
    type: 'inline';
}

/** @public */
export declare interface InsightManifest {
    type: 'smart';
    manual: Record<string, string>;
    prefetch: {
        route: string;
        symbols: string[];
    }[];
}

/** @public */
export declare type MinifyMode = 'simplify' | 'none';

declare interface NormalizedQwikPluginOptions extends Required<QwikPluginOptions> {
    input: string[];
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
export declare type QwikBuildMode = 'production' | 'development';

/** @public */
export declare type QwikBuildTarget = 'client' | 'ssr' | 'lib' | 'test';

/** @public */
export declare interface QwikBundle {
    size: number;
    symbols?: string[];
    imports?: string[];
    dynamicImports?: string[];
    origins?: string[];
}

/** @public */
export declare interface QwikManifest {
    manifestHash: string;
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

declare interface QwikPluginDevTools {
    clickToSource?: string[] | false;
}

declare interface QwikPluginOptions {
    csr?: boolean;
    buildMode?: QwikBuildMode;
    debug?: boolean;
    entryStrategy?: EntryStrategy;
    rootDir?: string;
    tsconfigFileNames?: string[];
    vendorRoots?: string[];
    manifestOutput?: ((manifest: QwikManifest) => Promise<void> | void) | null;
    manifestInput?: QwikManifest | null;
    insightsManifest?: InsightManifest | null;
    input?: string[] | string | {
        [entry: string]: string;
    };
    outDir?: string;
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
     * always `hook`.
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
}

/** @public */
export declare interface QwikSymbol {
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
export declare function qwikVite(qwikViteOpts?: QwikVitePluginOptions): any;

/** @public */
export declare interface QwikViteDevResponse {
    _qwikEnvData?: Record<string, any>;
    _qwikRenderResolve?: () => void;
}

/** @public */
export declare interface QwikVitePlugin {
    name: 'vite-plugin-qwik';
    api: QwikVitePluginApi;
}

/** @public */
export declare interface QwikVitePluginApi {
    getOptimizer: () => Optimizer | null;
    getOptions: () => NormalizedQwikPluginOptions;
    getManifest: () => QwikManifest | null;
    getInsightsManifest: (clientOutDir?: string | null) => Promise<InsightManifest | null>;
    getRootDir: () => string | null;
    getClientOutDir: () => string | null;
    getClientPublicOutDir: () => string | null;
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
     * always `hook`.
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
     */
    vendorRoots?: string[];
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
         * Press-hold the defined keys to enable qwik dev inspector. By default the behavior is
         * activated by pressing the left or right `Alt` key. If set to `false`, qwik dev inspector will
         * be disabled.
         *
         * Valid values are `KeyboardEvent.code` values. Please note that the 'Left' and 'Right'
         * suffixes are ignored.
         */
        clickToSource: string[] | false;
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
}

declare interface QwikVitePluginCSROptions extends QwikVitePluginCommonOptions {
    /** Client Side Rendering (CSR) mode. It will not support SSR, default to Vite's `index.html` file. */
    csr: true;
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
    manifest: QwikManifest;
}

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

/** @public */
export declare type SymbolMapperFn = (symbolName: string, mapper: SymbolMapper | undefined) => readonly [symbol: string, chunk: string] | undefined;

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
    hook: HookAnalysis | null;
    origPath: string | null;
}

/** @public */
export declare interface TransformModuleInput {
    path: string;
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
