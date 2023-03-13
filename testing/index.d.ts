import type { JSXNode } from '../jsx-runtime';
import { RenderResult } from '..';

/**
 * CreatePlatfrom and CreateDocument
 * @alpha
 */
export declare const createDOM: () => Promise<{
    render: (jsxElement: JSXNode) => Promise<RenderResult>;
    screen: HTMLElement;
    userEvent: (queryOrElement: string | Element | null, eventNameCamel: string) => Promise<void>;
}>;

export { }
