export interface InsightsPayload {
    /** Qwik version */
    qVersion: string;
    /** Manifest Hash of the container. */
    manifestHash: string;
    /**
     * API key of the application which we are trying to profile.
     *
     * This key can be used for sharding the data.
     */
    publicApiKey: string;
    /**
     * Previous symbol received on the client.
     *
     * Client periodically sends symbol log to the server. Being able to connect the order of symbols
     * is useful for server clustering. Sending previous symbol name allows the server to stitch the
     * symbol list together.
     */
    previousSymbol?: string | null;
    /** List of symbols which have been received since last update. */
    symbols: InsightSymbol[];
}
export interface InsightSymbol {
    /** Symbol name */
    symbol: string;
    /** Current route so we can have a better understanding of which symbols are needed for each route. */
    route: string;
    /** Time delta since last symbol. Can be used to stich symbol requests together */
    delay: number;
    /** Number of ms between the time the symbol was requested and it was loaded. */
    latency: number;
    /** Number of ms between the q:route attribute change and the qsymbol event */
    timeline: number;
    /**
     * Was this symbol as a result of user interaction. User interactions represent roots for
     * clouters.
     */
    interaction: boolean;
}
export interface InsightsError {
    /** Manifest Hash of the container. */
    manifestHash: string;
    timestamp: number;
    url: string;
    source: string;
    line: number;
    column: number;
    error: string;
    message: string;
    stack: string;
}
/**
 * @beta
 * @experimental
 */
export declare const Insights: import('../core').Component<{
    publicApiKey: string;
    postUrl?: string | undefined;
}>;
