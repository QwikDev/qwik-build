import type { JSXOutput } from '..';
import { RenderResult } from '..';

/**
 * CreatePlatform and CreateDocument
 *
 * @public
 */
export declare const createDOM: ({ html }?: {
    html?: string;
}) => Promise<{
    render: (jsxElement: JSXOutput) => Promise<RenderResult>;
    screen: HTMLElement;
    userEvent: (queryOrElement: string | Element | keyof HTMLElementTagNameMap | null, eventNameCamel: string | keyof WindowEventMap, eventPayload?: any) => Promise<void>;
}>;

export { }
