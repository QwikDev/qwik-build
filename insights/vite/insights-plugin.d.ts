import { PluginOption } from 'vite';
/**
 * @beta
 * @experimental
 */
export declare function qwikInsights(qwikInsightsOpts: {
    publicApiKey: string;
    baseUrl?: string;
    outDir?: string;
}): Promise<PluginOption>;
