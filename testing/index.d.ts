import type { JSXNode } from '../jsx-runtime';
import { RenderResult } from '..';

/**
 * CreatePlatform and CreateDocument
 * @public
 */
export declare const createDOM: () => Promise<{
    render: (jsxElement: JSXNode) => Promise<RenderResult>;
    screen: HTMLElement;
    userEvent: (queryOrElement: string | Element | keyof HTMLElementTagNameMap | null, eventNameCamel: string | keyof WindowEventMap, eventPayload?: any) => Promise<void>;
}>;

export { }
