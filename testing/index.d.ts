import { ClientContainer } from '..';
import type { CorePlatform } from '..';
import type { _DomContainer } from '..';
import type { _ElementVNode } from '..';
import type { JSXNode } from '..';
import type { JSXOutput } from '..';
import type { _QDocument } from '..';
import { RenderResult } from '..';
import type { _Stringifiable } from '..';
import type { _VNode } from '..';

/**
 * Create emulated `Document` for server environment. Does not implement the full browser `document`
 * and `window` API. This api may be removed in the future.
 *
 * @public
 */
export declare function createDocument(opts?: MockDocumentOptions): Document;

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

/** @public */
export declare function domRender(jsx: JSXOutput, opts?: {
    debug?: boolean;
    oldSSR?: boolean;
}): Promise<{
    document: Document;
    container: ClientContainer;
    vNode: _VNode | null;
    getStyles: () => Record<string, string | string[]>;
}>;

/**
 * Creates a simple DOM structure for testing components.
 *
 * By default `EntityFixture` creates:
 *
 * ```html
 * <host q:view="./component_fixture.noop">
 *   <child></child>
 * </host>
 * ```
 *
 * @public
 */
export declare class ElementFixture {
    window: MockWindow;
    document: MockDocument;
    superParent: HTMLElement;
    parent: HTMLElement;
    host: HTMLElement;
    child: HTMLElement;
    constructor(options?: ElementFixtureOptions);
}

/** @public */
declare interface ElementFixtureOptions {
    tagName?: string;
    html?: string;
}

/** @public */
export declare function emulateExecutionOfQwikFuncs(document: Document): void;

/** @public */
export declare function expectDOM(actual: Element, expected: string): Promise<void>;

/** @public */
export declare function getTestPlatform(): TestPlatform;

/** @public */
declare interface MockDocument extends Document {
}

/**
 * Options when creating a mock Qwik Document object.
 *
 * @public
 */
declare interface MockDocumentOptions {
    url?: URL | string;
    html?: string;
}

/** @public */
declare interface MockWindow extends Window {
    document: MockDocument;
}

/** @public */
export declare function ssrRenderToDom(jsx: JSXOutput, opts?: {
    debug?: boolean;
    oldSSR?: boolean;
    raw?: boolean;
}): Promise<{
    container: _DomContainer;
    document: Document;
    vNode: _VNode;
    getStyles: () => Record<string, string | string[]>;
}>;

/** @public */
declare interface TestPlatform extends CorePlatform {
    flush: () => Promise<void>;
}

/**
 * Trigger an event in unit tests on an element.
 *
 * Future deprecation candidate.
 *
 * @public
 */
export declare function trigger(root: Element, queryOrElement: string | Element | keyof HTMLElementTagNameMap | null, eventNameCamel: string, eventPayload?: any): Promise<void>;

/** @public */
export declare function vnode_fromJSX(jsx: JSXOutput): {
    vParent: _ElementVNode;
    vNode: _VNode | null;
    document: _QDocument;
};

/** @public */
export declare function walkJSX(jsx: JSXOutput, apply: {
    enter: (jsx: JSXNode) => void;
    leave: (jsx: JSXNode) => void;
    text: (text: _Stringifiable) => void;
}): void;

export { }
