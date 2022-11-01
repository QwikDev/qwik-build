import type { JSXNode } from '../core/jsx-runtime';

/**
 * CreatePlatfrom and CreateDocument
 * @alpha
 */
export declare const createDOM: () => Promise<{
    render: (jsxElement: JSXNode) => Promise<void>;
    screen: HTMLElement;
    userEvent: (queryOrElement: string | Element | null, eventNameCamel: string) => Promise<void>;
}>;

export { }
