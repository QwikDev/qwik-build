import type { NormalizedOutputOptions } from 'rollup';

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
export declare const createOptimizer: () => Promise<Optimizer>;

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
    canonicalFilename: string;
    localDecl: string[];
    localIdents: string[];
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
export declare type MinifyMode = 'minify' | 'simplify' | 'none';

/**
 * @alpha
 */
export declare type MinifyOption = boolean | undefined | null;

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
    path: Path;
}

/**
 * @alpha
 */
export declare interface OutputEntryMap {
    version: string;
    mapping: {
        [canonicalName: string]: string;
    };
    injections?: GlobalInjections[];
}

/**
 * @alpha
 */
export declare interface Path {
    resolve(...pathSegments: string[]): string;
    normalize(path: string): string;
    isAbsolute(path: string): boolean;
    join(...paths: string[]): string;
    relative(from: string, to: string): string;
    dirname(path: string): string;
    basename(path: string, ext?: string): string;
    extname(path: string): string;
    format(pathObject: Partial<PathObject>): string;
    parse(path: string): PathObject;
    readonly sep: string;
    readonly delimiter: string;
    readonly win32: null;
    readonly posix: Path;
}

/**
 * @alpha
 */
export declare interface PathObject {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
}

/**
 * @alpha
 */
export declare interface QwikPluginOptions {
    entryStrategy?: EntryStrategy;
    srcDir: string;
    minify?: MinifyMode;
    debug?: boolean;
    ssrBuild?: boolean;
    symbolsOutput?: string | ((data: OutputEntryMap, output: NormalizedOutputOptions) => Promise<void> | void);
}

/**
 * @alpha
 */
export declare function qwikRollup(opts: QwikPluginOptions): any;

/**
 * @alpha
 */
export declare function qwikVite(opts: QwikViteOptions): any;

/**
 * @alpha
 */
export declare interface QwikViteOptions extends QwikPluginOptions {
    ssr?: QwikViteSSROptions | false;
}

/**
 * @alpha
 */
export declare interface QwikViteSSROptions {
    /** Defaults to `/src/entry.server.tsx` */
    entry?: string;
    /** Defaults to `/src/main.tsx` */
    main?: string;
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
export declare interface TransformFsOptions extends TransformOptions {
    rootDir: string;
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
    rootDir: string;
    input: TransformModuleInput[];
}

/**
 * @alpha
 */
declare interface TransformOptions {
    entryStrategy?: EntryStrategy;
    minify?: MinifyMode;
    sourceMaps?: boolean;
    transpile?: boolean;
    explicityExtensions?: boolean;
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
 * @alpha
 */
export declare const versions: {
    qwik: string;
};

export { }
