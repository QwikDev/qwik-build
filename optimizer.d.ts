declare interface BasePluginOptions {
    debug?: boolean;
    outClientDir?: string;
    outServerDir?: string;
    entryStrategy?: EntryStrategy;
    forceFullBuild?: boolean;
    srcRootInput?: string | string[];
    srcEntryServerInput?: string;
    srcDir?: string | null;
    srcInputs?: TransformModuleInput[] | null;
    manifestInput?: QwikManifest | null;
    manifestOutput?: ((manifest: QwikManifest) => Promise<void> | void) | null;
    transformedModuleOutput?: ((data: {
        [id: string]: TransformModule;
    }) => Promise<void> | void) | null;
}

/**
 * @alpha
 */
export declare interface CodeHighlight {
    message: string | null;
    loc: SourceLocation;
}

/**
 * @alpha
 */
export declare interface ComponentEntryStrategy {
    type: 'component';
}

/**
 * @alpha
 */
export declare const createOptimizer: (optimizerOptions?: OptimizerOptions) => Promise<Optimizer>;

/**
 * @alpha
 */
export declare interface Diagnostic {
    origin: string;
    message: string;
    severity: DiagnosticType;
    code_highlights: CodeHighlight[];
    documentation_url?: string;
    show_environment: boolean;
    hints?: string[];
}

/**
 * @alpha
 */
export declare type DiagnosticType = 'Error' | 'Warning' | 'SourceError';

/**
 * @alpha
 */
export declare type EntryStrategy = SingleEntryStrategy | HookEntryStrategy | ComponentEntryStrategy | SmartEntryStrategy | ManualEntryStrategy;

/**
 * @alpha
 */
export declare interface GlobalInjections {
    tag: string;
    attributes?: {
        [key: string]: string;
    };
    location: 'head' | 'body';
    children?: string;
}

/**
 * @alpha
 */
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
}

/**
 * @alpha
 */
export declare interface HookEntryStrategy {
    type: 'hook';
}

/**
 * @alpha
 */
export declare interface ManualEntryStrategy {
    type: 'manual';
    entries: string[][];
}

/**
 * @alpha
 */
export declare type MinifyMode = 'simplify' | 'none';

/**
 * @alpha
 */
export declare interface Optimizer {
    /**
     * Transforms the input code string, does not access the file system.
     */
    transformModules(opts: TransformModulesOptions): Promise<TransformOutput>;
    /**
     * Transforms the input code string, does not access the file system.
     */
    transformModulesSync(opts: TransformModulesOptions): TransformOutput;
    /**
     * Transforms the directory from the file system.
     */
    transformFs(opts: TransformFsOptions): Promise<TransformOutput>;
    /**
     * Transforms the directory from the file system.
     */
    transformFsSync(opts: TransformFsOptions): TransformOutput;
    /**
     * Optimizer system use. This can be updated with a custom file system.
     */
    sys: OptimizerSystem;
}

/**
 * @alpha
 */
export declare interface OptimizerOptions {
    sys?: OptimizerSystem;
    binding?: any;
}

/**
 * @alpha
 */
export declare interface OptimizerSystem {
    cwd: () => string;
    env: () => SystemEnvironment;
    dynamicImport: (path: string) => Promise<any>;
    getInputFiles?: (rootDir: string) => Promise<TransformModuleInput[]>;
    path: Path;
}

/**
 * @alpha
 */
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

/**
 * "development" and "production" are client builds,
 * and "ssr" is a server build. Defaults to "development".
 */
declare type QwikBuildMode = 'development' | 'production' | 'ssr';

/**
 * @alpha
 */
export declare interface QwikBundle {
    size: number;
    imports?: string[];
    dynamicImports?: string[];
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
export declare function qwikRollup(qwikRollupOpts?: QwikRollupPluginOptions): any;

/**
 * @alpha
 */
export declare interface QwikRollupPluginOptions extends BasePluginOptions {
    optimizerOptions?: OptimizerOptions;
    rootDir?: string;
    buildMode?: QwikBuildMode;
}

/**
 * @alpha
 */
export declare interface QwikSymbol {
    origin: string;
    displayName: string;
    hash: string;
    canonicalFilename: string;
    ctxKind: 'function' | 'event';
    ctxName: string;
    captures: boolean;
    parent: string | null;
}

/**
 * @alpha
 */
export declare function qwikVite(qwikViteOpts?: QwikVitePluginOptions): any;

/**
 * @alpha
 */
export declare interface QwikVitePluginOptions extends BasePluginOptions {
    optimizerOptions?: OptimizerOptions;
    srcEntryDevInput?: string;
}

/**
 * @alpha
 */
export declare interface SingleEntryStrategy {
    type: 'single';
}

/**
 * @alpha
 */
export declare interface SmartEntryStrategy {
    type: 'smart';
}

/**
 * @alpha
 */
export declare interface SourceLocation {
    start_line: number;
    start_col: number;
    end_line: number;
    end_col: number;
}

/**
 * @alpha
 */
export declare type SourceMapsOption = 'external' | 'inline' | undefined | null;

/**
 * @alpha
 */
export declare type SystemEnvironment = 'node' | 'deno' | 'webworker' | 'browsermain' | 'unknown';

/**
 * @alpha
 */
export declare interface TransformFsOptions extends TransformOptions {
}

/**
 * @alpha
 */
export declare interface TransformModule {
    path: string;
    isEntry: boolean;
    code: string;
    map: string | null;
    hook: HookAnalysis | null;
}

/**
 * @alpha
 */
export declare interface TransformModuleInput {
    path: string;
    code: string;
}

/**
 * @alpha
 */
export declare interface TransformModulesOptions extends TransformOptions {
    input: TransformModuleInput[];
}

/**
 * @alpha
 */
declare interface TransformOptions {
    rootDir: string;
    entryStrategy?: EntryStrategy;
    minify?: MinifyMode;
    sourceMaps?: boolean;
    transpile?: boolean;
    explicityExtensions?: boolean;
    dev?: boolean;
}

/**
 * @alpha
 */
export declare interface TransformOutput {
    modules: TransformModule[];
    diagnostics: Diagnostic[];
    isTypeScript: boolean;
    isJsx: boolean;
}

/**
 * @alpha
 */
export declare type TranspileOption = boolean | undefined | null;

/**
 * @public
 */
export declare const versions: {
    qwik: string;
};

export { }
