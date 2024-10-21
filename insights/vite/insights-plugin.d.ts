import { PluginOption } from 'vite';

/**
 * @alpha
 * @experimental
 */
export declare function qwikInsights(qwikInsightsOpts: {
    publicApiKey: string;
    baseUrl?: string;
    outDir?: string;
}): Promise<PluginOption>;
