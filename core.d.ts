import * as CSS_2 from 'csstype';

/**
 * Qwik Optimizer marker function.
 *
 * Use `$(...)` to tell Qwik Optimizer to extract the expression in `$(...)` into a lazy-loadable
 * resource referenced by `QRL`.
 *
 * @see `implicit$FirstArg` for additional `____$(...)` rules.
 *
 * In this example, `$(...)` is used to capture the callback function of `onmousemove` into a
 * lazy-loadable reference. This allows the code to refer to the function without actually
 * loading the function. In this example, the callback function does not get loaded until
 * `mousemove` event fires.
 *
 * ```tsx
 * useOnDocument(
 *   'mousemove',
 *   $((event) => console.log('mousemove', event))
 * );
 * ```
 *
 * In this code, the Qwik Optimizer detects `$(...)` and transforms the code into:
 *
 * ```tsx
 * // FILE: <current file>
 * useOnDocument('mousemove', qrl('./chunk-abc.js', 'onMousemove'));
 *
 * // FILE: chunk-abc.js
 * export const onMousemove = () => console.log('mousemove');
 * ```
 *
 * ## Special Rules
 *
 * The Qwik Optimizer places special rules on functions that can be lazy-loaded.
 *
 * 1. The expression of the `$(expression)` function must be importable by the system.
 * (expression shows up in `import` or has `export`)
 * 2. If inlined function, then all lexically captured values must be:
 *    - importable (vars show up in `import`s or `export`s)
 *    - const (The capturing process differs from JS capturing in that writing to captured
 * variables does not update them, and therefore writes are forbidden. The best practice is that
 * all captured variables are constants.)
 *    - Must be runtime serializable.
 *
 * ```tsx
 *
 * import { createContextId, useContext, useContextProvider } from './use/use-context';
 * import { Resource, useResource$ } from './use/use-resource';
 *
 * export const greet = () => console.log('greet');
 * function topLevelFn() {}
 *
 * function myCode() {
 *   const store = useStore({});
 *   function localFn() {}
 *   // Valid Examples
 *   $(greet); // greet is importable
 *   $(() => greet()); // greet is importable;
 *   $(() => console.log(store)); // store is serializable.
 *
 *   // Compile time errors
 *   $(topLevelFn); // ERROR: `topLevelFn` not importable
 *   $(() => topLevelFn()); // ERROR: `topLevelFn` not importable
 *
 *   // Runtime errors
 *   $(localFn); // ERROR: `localFn` fails serialization
 *   $(() => localFn()); // ERROR: `localFn` fails serialization
 * }
 *
 * ```
 *
 * @param expression - Expression which should be lazy loaded
 * @public
 */
export declare const $: <T>(expression: T) => QRL<T>;

declare type A = [type: 0, host: SubscriberEffect | SubscriberHost, key: string | undefined];

declare interface AbstractView {
    styleMedia: StyleMedia;
    document: Document;
}

declare interface AnchorHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    download?: any;
    href?: string | undefined;
    hrefLang?: string | undefined;
    media?: string | undefined;
    ping?: string | undefined;
    rel?: string | undefined;
    target?: HTMLAttributeAnchorTarget | undefined;
    type?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}

declare interface AreaHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    alt?: string | undefined;
    coords?: string | undefined;
    download?: any;
    href?: string | undefined;
    hrefLang?: string | undefined;
    media?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    rel?: string | undefined;
    shape?: string | undefined;
    target?: string | undefined;
    children?: undefined;
}

/**
 * @public
 */
export declare interface AriaAttributes {
    /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
    'aria-activedescendant'?: string | undefined;
    /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
    'aria-atomic'?: Booleanish | undefined;
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
     * presented if they are made.
     */
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both' | undefined;
    /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
    'aria-busy'?: Booleanish | undefined;
    /**
     * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
     * @see aria-pressed @see aria-selected.
     */
    'aria-checked'?: boolean | 'false' | 'mixed' | 'true' | undefined;
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     * @see aria-colindex.
     */
    'aria-colcount'?: number | undefined;
    /**
     * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
     * @see aria-colcount @see aria-colspan.
     */
    'aria-colindex'?: number | undefined;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-colindex @see aria-rowspan.
     */
    'aria-colspan'?: number | undefined;
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current element.
     * @see aria-owns.
     */
    'aria-controls'?: string | undefined;
    /** Indicates the element that represents the current item within a container or set of related elements. */
    'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time' | undefined;
    /**
     * Identifies the element (or elements) that describes the object.
     * @see aria-labelledby
     */
    'aria-describedby'?: string | undefined;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     * @see aria-describedby.
     */
    'aria-details'?: string | undefined;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     * @see aria-hidden @see aria-readonly.
     */
    'aria-disabled'?: Booleanish | undefined;
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     * @deprecated in ARIA 1.1
     */
    'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup' | undefined;
    /**
     * Identifies the element that provides an error message for the object.
     * @see aria-invalid @see aria-describedby.
     */
    'aria-errormessage'?: string | undefined;
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    'aria-expanded'?: Booleanish | undefined;
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
     * allows assistive technology to override the general default of reading in document source order.
     */
    'aria-flowto'?: string | undefined;
    /**
     * Indicates an element's "grabbed" state in a drag-and-drop operation.
     * @deprecated in ARIA 1.1
     */
    'aria-grabbed'?: Booleanish | undefined;
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | undefined;
    /**
     * Indicates whether the element is exposed to an accessibility API.
     * @see aria-disabled.
     */
    'aria-hidden'?: Booleanish | undefined;
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     * @see aria-errormessage.
     */
    'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined;
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    'aria-keyshortcuts'?: string | undefined;
    /**
     * Defines a string value that labels the current element.
     * @see aria-labelledby.
     */
    'aria-label'?: string | undefined;
    /**
     * Identifies the element (or elements) that labels the current element.
     * @see aria-describedby.
     */
    'aria-labelledby'?: string | undefined;
    /** Defines the hierarchical level of an element within a structure. */
    'aria-level'?: number | undefined;
    /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
    'aria-live'?: 'off' | 'assertive' | 'polite' | undefined;
    /** Indicates whether an element is modal when displayed. */
    'aria-modal'?: Booleanish | undefined;
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    'aria-multiline'?: Booleanish | undefined;
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    'aria-multiselectable'?: Booleanish | undefined;
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    'aria-orientation'?: 'horizontal' | 'vertical' | undefined;
    /**
     * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
     * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
     * @see aria-controls.
     */
    'aria-owns'?: string | undefined;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
     * A hint could be a sample value or a brief description of the expected format.
     */
    'aria-placeholder'?: string | undefined;
    /**
     * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-setsize.
     */
    'aria-posinset'?: number | undefined;
    /**
     * Indicates the current "pressed" state of toggle buttons.
     * @see aria-checked @see aria-selected.
     */
    'aria-pressed'?: boolean | 'false' | 'mixed' | 'true' | undefined;
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     * @see aria-disabled.
     */
    'aria-readonly'?: Booleanish | undefined;
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
     * @see aria-atomic.
     */
    'aria-relevant'?: 'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals' | undefined;
    /** Indicates that user input is required on the element before a form may be submitted. */
    'aria-required'?: Booleanish | undefined;
    /** Defines a human-readable, author-localized description for the role of an element. */
    'aria-roledescription'?: string | undefined;
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     * @see aria-rowindex.
     */
    'aria-rowcount'?: number | undefined;
    /**
     * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
     * @see aria-rowcount @see aria-rowspan.
     */
    'aria-rowindex'?: number | undefined;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-rowindex @see aria-colspan.
     */
    'aria-rowspan'?: number | undefined;
    /**
     * Indicates the current "selected" state of various widgets.
     * @see aria-checked @see aria-pressed.
     */
    'aria-selected'?: Booleanish | undefined;
    /**
     * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-posinset.
     */
    'aria-setsize'?: number | undefined;
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other' | undefined;
    /** Defines the maximum allowed value for a range widget. */
    'aria-valuemax'?: number | undefined;
    /** Defines the minimum allowed value for a range widget. */
    'aria-valuemin'?: number | undefined;
    /**
     * Defines the current value for a range widget.
     * @see aria-valuetext.
     */
    'aria-valuenow'?: number | undefined;
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    'aria-valuetext'?: string | undefined;
}

/**
 * @public
 */
export declare type AriaRole = 'alert' | 'alertdialog' | 'application' | 'article' | 'banner' | 'button' | 'cell' | 'checkbox' | 'columnheader' | 'combobox' | 'complementary' | 'contentinfo' | 'definition' | 'dialog' | 'directory' | 'document' | 'feed' | 'figure' | 'form' | 'grid' | 'gridcell' | 'group' | 'heading' | 'img' | 'link' | 'list' | 'listbox' | 'listitem' | 'log' | 'main' | 'marquee' | 'math' | 'menu' | 'menubar' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'navigation' | 'none' | 'note' | 'option' | 'presentation' | 'progressbar' | 'radio' | 'radiogroup' | 'region' | 'row' | 'rowgroup' | 'rowheader' | 'scrollbar' | 'search' | 'searchbox' | 'separator' | 'slider' | 'spinbutton' | 'status' | 'switch' | 'tab' | 'table' | 'tablist' | 'tabpanel' | 'term' | 'textbox' | 'timer' | 'toolbar' | 'tooltip' | 'tree' | 'treegrid' | 'treeitem' | (string & {});

declare interface AudioHTMLAttributes<T extends Element> extends MediaHTMLAttributes<T> {
}

declare type B = [
type: 1 | 2,
host: SubscriberHost,
signal: Signal,
elm: QwikElement,
prop: string,
key: string | undefined
];

declare type BaseClassList = string | undefined | null | false | Record<string, boolean | string | number | null | undefined> | BaseClassList[];

declare interface BaseHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    href?: string | undefined;
    target?: string | undefined;
    children?: undefined;
}

declare interface BaseSyntheticEvent<E = object, C = any, T = any> {
    nativeEvent: E | undefined;
    target: T;
    bubbles: boolean;
    cancelable: boolean;
    eventPhase: number;
    isTrusted: boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
    timeStamp: number;
    type: string;
}

declare type BivariantEventHandler<T extends SyntheticEvent<any> | Event, EL> = {
    bivarianceHack(event: T, element: EL): any;
}['bivarianceHack'];

declare interface BlockquoteHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    cite?: string | undefined;
}

declare type Booleanish = boolean | `${boolean}`;

declare interface ButtonHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    autoFocus?: boolean | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    formAction?: string | undefined;
    formEncType?: string | undefined;
    formMethod?: string | undefined;
    formNoValidate?: boolean | undefined;
    formTarget?: string | undefined;
    name?: string | undefined;
    type?: 'submit' | 'reset' | 'button' | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
}

declare type C = [
type: 3 | 4,
host: SubscriberHost | Text,
signal: Signal,
elm: Node | QwikElement,
key: string | undefined
];

declare interface CanvasHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    height?: Size | undefined;
    width?: Size | undefined;
}

/**
 * @public
 */
export declare type ClassList = BaseClassList | BaseClassList[];

declare interface ColgroupHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    span?: number | undefined;
}

declare interface ColHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    span?: number | undefined;
    width?: Size | undefined;
    children?: undefined;
}

/**
 * Declare a Qwik component that can be used to create UI.
 *
 * Use `component$` to declare a Qwik component. A Qwik component is a special kind of component
 * that allows the Qwik framework to lazy load and execute the component independently of other
 * Qwik components as well as lazy load the component's life-cycle hooks and event handlers.
 *
 * Side note: You can also declare regular (standard JSX) components that will have standard
 * synchronous behavior.
 *
 * Qwik component is a facade that describes how the component should be used without forcing the
 * implementation of the component to be eagerly loaded. A minimum Qwik definition consists of:
 *
 * ### Example
 *
 * An example showing how to create a counter component:
 *
 * ```tsx
 * export interface CounterProps {
 *   initialValue?: number;
 *   step?: number;
 * }
 * export const Counter = component$((props: CounterProps) => {
 *   const state = useStore({ count: props.initialValue || 0 });
 *   return (
 *     <div>
 *       <span>{state.count}</span>
 *       <button onClick$={() => (state.count += props.step || 1)}>+</button>
 *     </div>
 *   );
 * });
 * ```
 *
 * - `component$` is how a component gets declared.
 * - `{ value?: number; step?: number }` declares the public (props) interface of the component.
 * - `{ count: number }` declares the private (state) interface of the component.
 *
 * The above can then be used like so:
 *
 * ```tsx
 * export const OtherComponent = component$(() => {
 *   return <Counter initialValue={100} />;
 * });
 * ```
 *
 * See also: `component`, `useCleanup`, `onResume`, `onPause`, `useOn`, `useOnDocument`,
 * `useOnWindow`, `useStyles`
 *
 * @public
 */
export declare const component$: <PROPS = unknown, ARG extends {} = PROPS extends {} ? PropFunctionProps<PROPS> : {}>(onMount: OnRenderFn<ARG>) => Component<PROPS extends {} ? PROPS : ARG>;

/**
 * Type representing the Qwik component.
 *
 * `Component` is the type returned by invoking `component$`.
 *
 * ```
 * interface MyComponentProps {
 *   someProp: string;
 * }
 * const MyComponent: Component<MyComponentProps> = component$((props: MyComponentProps) => {
 *   return <span>{props.someProp}</span>;
 * });
 * ```
 *
 * @public
 */
export declare type Component<PROPS extends {}> = FunctionComponent<PublicProps<PROPS>>;

/**
 * @public
 */
export declare interface ComponentBaseProps {
    key?: string | number | null | undefined;
    'q:slot'?: string;
}

declare type ComponentChildren<PROPS extends {}> = PROPS extends {
    children: any;
} ? never : {
    children?: JSXChildren;
};

/**
 * Declare a Qwik component that can be used to create UI.
 *
 * Use `component$` to declare a Qwik component. A Qwik component is a special kind of component
 * that allows the Qwik framework to lazy load and execute the component independently of other
 * Qwik components as well as lazy load the component's life-cycle hooks and event handlers.
 *
 * Side note: You can also declare regular (standard JSX) components that will have standard
 * synchronous behavior.
 *
 * Qwik component is a facade that describes how the component should be used without forcing the
 * implementation of the component to be eagerly loaded. A minimum Qwik definition consists of:
 *
 * ### Example
 *
 * An example showing how to create a counter component:
 *
 * ```tsx
 * export interface CounterProps {
 *   initialValue?: number;
 *   step?: number;
 * }
 * export const Counter = component$((props: CounterProps) => {
 *   const state = useStore({ count: props.initialValue || 0 });
 *   return (
 *     <div>
 *       <span>{state.count}</span>
 *       <button onClick$={() => (state.count += props.step || 1)}>+</button>
 *     </div>
 *   );
 * });
 * ```
 *
 * - `component$` is how a component gets declared.
 * - `{ value?: number; step?: number }` declares the public (props) interface of the component.
 * - `{ count: number }` declares the private (state) interface of the component.
 *
 * The above can then be used like so:
 *
 * ```tsx
 * export const OtherComponent = component$(() => {
 *   return <Counter initialValue={100} />;
 * });
 * ```
 *
 * See also: `component`, `useCleanup`, `onResume`, `onPause`, `useOn`, `useOnDocument`,
 * `useOnWindow`, `useStyles`
 *
 * @public
 */
export declare const componentQrl: <PROPS extends {}>(componentQrl: QRL<OnRenderFn<PROPS>>) => Component<PROPS>;

declare interface Computed {
    <T>(qrl: ComputedFn<T>): ReadonlySignal<Awaited<T>>;
}

declare interface ComputedDescriptor<T> extends DescriptorBase<ComputedFn<T>, SignalInternal<T>> {
}

/**
 * @public
 */
declare type ComputedFn<T> = () => T;

declare interface ComputedQRL {
    <T>(qrl: QRL<ComputedFn<T>>): ReadonlySignal<Awaited<T>>;
}

/**
 * @public
 */
declare interface ContainerState {
    readonly $containerEl$: Element;
    readonly $proxyMap$: ObjToProxyMap;
    $subsManager$: SubscriptionManager;
    readonly $taskNext$: Set<SubscriberEffect>;
    readonly $taskStaging$: Set<SubscriberEffect>;
    readonly $opsNext$: Set<SubscriberSignal>;
    readonly $hostsNext$: Set<QContext>;
    readonly $hostsStaging$: Set<QContext>;
    readonly $base$: string;
    $hostsRendering$: Set<QContext> | undefined;
    $renderPromise$: Promise<void> | undefined;
    $serverData$: Record<string, any>;
    $elementIndex$: number;
    $pauseCtx$: PauseContext | undefined;
    $styleMoved$: boolean;
    readonly $styleIds$: Set<string>;
    readonly $events$: Set<string>;
}

/**
 * ContextId is a typesafe ID for your context.
 *
 * Context is a way to pass stores to the child components without prop-drilling.
 *
 * Use `createContextId()` to create a `ContextId`. A `ContextId` is just a serializable
 * identifier for the context. It is not the context value itself. See `useContextProvider()` and
 * `useContext()` for the values. Qwik needs a serializable ID for the context so that the it can
 * track context providers and consumers in a way that survives resumability.
 *
 * ### Example
 *
 * ```tsx
 * // Declare the Context type.
 * interface TodosStore {
 *   items: string[];
 * }
 * // Create a Context ID (no data is saved here.)
 * // You will use this ID to both create and retrieve the Context.
 * export const TodosContext = createContextId<TodosStore>('Todos');
 *
 * // Example of providing context to child components.
 * export const App = component$(() => {
 *   useContextProvider(
 *     TodosContext,
 *     useStore<TodosStore>({
 *       items: ['Learn Qwik', 'Build Qwik app', 'Profit'],
 *     })
 *   );
 *
 *   return <Items />;
 * });
 *
 * // Example of retrieving the context provided by a parent component.
 * export const Items = component$(() => {
 *   const todos = useContext(TodosContext);
 *   return (
 *     <ul>
 *       {todos.items.map((item) => (
 *         <li>{item}</li>
 *       ))}
 *     </ul>
 *   );
 * });
 *
 * ```
 * @public
 */
export declare interface ContextId<STATE> {
    /**
     * Design-time property to store type information for the context.
     */
    readonly __brand_context_type__: STATE;
    /**
     * A unique ID for the context.
     */
    readonly id: string;
}

/**
 * Low-level API for platform abstraction.
 *
 * Different platforms (browser, node, service workers) may have different ways of handling
 * things such as `requestAnimationFrame` and imports. To make Qwik platform-independent Qwik
 * uses the `CorePlatform` API to access the platform API.
 *
 * `CorePlatform` also is responsible for importing symbols. The import map is different on the
 * client (browser) then on the server. For this reason, the server has a manifest that is used
 * to map symbols to javascript chunks. The manifest is encapsulated in `CorePlatform`, for this
 * reason, the `CorePlatform` can't be global as there may be multiple applications running at
 * server concurrently.
 *
 * This is a low-level API and there should not be a need for you to access this.
 *
 * @public
 */
export declare interface CorePlatform {
    /**
     * True of running on the server platform.
     *
     * @returns True if we are running on the server (not the browser.)
     */
    isServer: boolean;
    /**
     * Retrieve a symbol value from QRL.
     *
     * Qwik needs to lazy load data and closures. For this Qwik uses QRLs that are serializable
     * references of resources that are needed. The QRLs contain all the information necessary to
     * retrieved the reference using `importSymbol`.
     *
     * Why not use `import()`? Because `import()` is relative to the current file, and the current
     * file is always the Qwik framework. So QRLs have additional information that allows them to
     * serialize imports relative to application base rather than the Qwik framework file.
     *
     * @param element - The element against which the `url` is resolved. Used to locate the container
     * root and `q:base` attribute.
     * @param url - Relative URL retrieved from the attribute that needs to be resolved against the
     * container `q:base` attribute.
     * @param symbol - The name of the symbol to import.
     * @returns A promise that resolves to the imported symbol.
     */
    importSymbol: (containerEl: Element | undefined, url: string | URL | undefined | null, symbol: string) => ValueOrPromise<any>;
    /**
     * Perform operation on next request-animation-frame.
     *
     * @param fn - The function to call when the next animation frame is ready.
     */
    raf: (fn: () => any) => Promise<any>;
    /**
     * Perform operation on next tick.
     *
     * @param fn - The function to call when the tick is ready.
     */
    nextTick: (fn: () => any) => Promise<any>;
    /**
     * Retrieve chunk name for the symbol.
     *
     * When the application is running on the server the symbols may be imported from different files
     * (as server build is typically a single javascript chunk.) For this reason, it is necessary to
     * convert the chunks from server format to client (browser) format. This is done by looking up
     * symbols (which are globally unique) in the manifest. (Manifest is the mapping of symbols to
     * the client chunk names.)
     *
     * @param symbolName - Resolve `symbolName` against the manifest and return the chunk that
     * contains the symbol.
     */
    chunkForSymbol: (symbolName: string, chunk: string | null) => readonly [symbol: string, chunk: string] | undefined;
}

/**
 * Create a context ID to be used in your application.
 * The name should be written with no spaces.
 *
 * Context is a way to pass stores to the child components without prop-drilling.
 *
 * Use `createContextId()` to create a `ContextId`. A `ContextId` is just a serializable
 * identifier for the context. It is not the context value itself. See `useContextProvider()` and
 * `useContext()` for the values. Qwik needs a serializable ID for the context so that the it can
 * track context providers and consumers in a way that survives resumability.
 *
 * ### Example
 *
 * ```tsx
 * // Declare the Context type.
 * interface TodosStore {
 *   items: string[];
 * }
 * // Create a Context ID (no data is saved here.)
 * // You will use this ID to both create and retrieve the Context.
 * export const TodosContext = createContextId<TodosStore>('Todos');
 *
 * // Example of providing context to child components.
 * export const App = component$(() => {
 *   useContextProvider(
 *     TodosContext,
 *     useStore<TodosStore>({
 *       items: ['Learn Qwik', 'Build Qwik app', 'Profit'],
 *     })
 *   );
 *
 *   return <Items />;
 * });
 *
 * // Example of retrieving the context provided by a parent component.
 * export const Items = component$(() => {
 *   const todos = useContext(TodosContext);
 *   return (
 *     <ul>
 *       {todos.items.map((item) => (
 *         <li>{item}</li>
 *       ))}
 *     </ul>
 *   );
 * });
 *
 * ```
 * @param name - The name of the context.
 * @public
 */
export declare const createContextId: <STATE = unknown>(name: string) => ContextId<STATE>;

/**
 * @public
 */
export declare interface CSSProperties extends CSS_2.Properties<string | number>, CSS_2.PropertiesHyphen<string | number> {
    /**
     * The index signature was removed to enable closed typing for style
     * using CSSType. You're able to use type assertion or module augmentation
     * to add properties or an index signature of your own.
     *
     * For examples and more information, visit:
     * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
     */
    [v: `--${string}`]: string | number | undefined;
}

declare interface DataHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    value?: string | ReadonlyArray<string> | number | undefined;
}

declare interface DelHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    cite?: string | undefined;
    dateTime?: string | undefined;
}

/**
 * @public
 */
declare interface DescriptorBase<T = any, B = undefined> {
    $qrl$: QRLInternal<T>;
    $el$: QwikElement;
    $flags$: number;
    $index$: number;
    $destroy$?: NoSerialize<() => void>;
    $state$: B;
}

/**
 * @internal
 */
export declare const _deserializeData: (data: string, element?: unknown) => any;

declare interface DetailsHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    open?: boolean | undefined;
}

declare interface DevJSX {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
    stack?: string;
}

declare interface DialogHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    open?: boolean | undefined;
}

/**
 * @public
 */
export declare interface DOMAttributes<T extends Element> extends QwikProps<T>, QwikEvents<T> {
    children?: JSXChildren;
    key?: string | number | null | undefined;
}

/**
 * @public
 */
export declare type EagernessOptions = 'visible' | 'load' | 'idle';

declare interface EmbedHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    height?: Size | undefined;
    src?: string | undefined;
    type?: string | undefined;
    width?: Size | undefined;
    children?: undefined;
}

/**
 * @public
 */
export declare interface ErrorBoundaryStore {
    error: any | undefined;
}

/**
 * @public
 */
export declare const event$: <T>(first: T) => QRL<T>;

/**
 * @public
 */
export declare const eventQrl: <T>(qrl: QRL<T>) => QRL<T>;

declare interface FieldsetHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    form?: string | undefined;
    name?: string | undefined;
}

/**
 * @internal
 */
export declare const _fnSignal: <T extends (...args: any[]) => any>(fn: T, args: any[], fnStr?: string) => SignalDerived<any, any[]>;

declare interface FormHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    acceptCharset?: string | undefined;
    action?: string | undefined;
    autoComplete?: 'on' | 'off' | Omit<'on' | 'off', string> | undefined;
    encType?: string | undefined;
    method?: string | undefined;
    name?: string | undefined;
    noValidate?: boolean | undefined;
    target?: string | undefined;
}

/**
 * @public
 */
export declare const Fragment: FunctionComponent<{
    children?: any;
    key?: string | number | null;
}>;

/**
 * @public
 */
export declare interface FunctionComponent<P = Record<string, any>> {
    (props: P, key: string | null, flags: number, dev?: DevJSX): JSXNode | null;
}

/**
 * @internal
 */
export declare const _getContextElement: () => unknown;

/**
 * @internal
 */
export declare const _getContextEvent: () => unknown;

/**
 * Retrieve the current lang.
 *
 * If no current lang and there is no `defaultLang` the function throws an error.
 *
 * @returns  the lang.
 * @internal
 */
export declare function getLocale(defaultLocale?: string): string;

declare type GetObject = (id: string) => any;

declare type GetObjID = (obj: any) => string | null;

/**
 * Retrieve the `CorePlatform`.
 *
 * The `CorePlatform` is also responsible for retrieving the Manifest, that contains mappings
 * from symbols to javascript import chunks. For this reason, `CorePlatform` can't be global, but
 * is specific to the application currently running. On server it is possible that many different
 * applications are running in a single server instance, and for this reason the `CorePlatform`
 * is associated with the application document.
 *
 * @param docOrNode - The document (or node) of the application for which the platform is needed.
 * @public
 */
export declare const getPlatform: () => CorePlatform;

declare type GroupToManagersMap = Map<SubscriberHost | SubscriberEffect | Node, LocalSubscriptionManager[]>;

/**
 * @public
 */
declare function h<TYPE extends string | FunctionComponent<PROPS>, PROPS extends {} = {}>(type: TYPE, props: PROPS | null, ...children: any[]): JSXNode<TYPE>;

/**
 * @public
 */
declare namespace h {
    function h(type: any): JSXNode<any>;
    function h(type: Node, data: any): JSXNode<any>;
    function h(type: any, text: string): JSXNode<any>;
    function h(type: any, children: Array<any>): JSXNode<any>;
    function h(type: any, data: any, text: string): JSXNode<any>;
    function h(type: any, data: any, children: Array<JSXNode<any> | undefined | null>): JSXNode<any>;
    function h(sel: any, data: any | null, children: JSXNode<any>): JSXNode<any>;
    namespace JSX {
        interface Element extends QwikJSX.Element {
        }
        interface IntrinsicAttributes extends QwikJSX.IntrinsicAttributes {
        }
        interface IntrinsicElements extends QwikJSX.IntrinsicElements {
        }
        interface ElementChildrenAttribute {
            children?: any;
        }
    }
}
export { h as createElement }
export { h }

declare interface HrHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    children?: undefined;
}

declare type HTMLAttributeAnchorTarget = '_self' | '_blank' | '_parent' | '_top' | (string & {});

declare type HTMLAttributeReferrerPolicy = '' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';

/**
 * @public
 */
export declare interface HTMLAttributes<T extends Element> extends AriaAttributes, DOMAttributes<T> {
    accessKey?: string | undefined;
    contentEditable?: 'true' | 'false' | 'inherit' | undefined;
    contextMenu?: string | undefined;
    dir?: 'ltr' | 'rtl' | 'auto' | undefined;
    draggable?: boolean | undefined;
    hidden?: boolean | 'hidden' | 'until-found' | undefined;
    id?: string | undefined;
    lang?: string | undefined;
    placeholder?: string | undefined;
    slot?: string | undefined;
    spellcheck?: boolean | undefined;
    style?: CSSProperties | string | undefined;
    tabIndex?: number | undefined;
    title?: string | undefined;
    translate?: 'yes' | 'no' | undefined;
    radioGroup?: string | undefined;
    role?: AriaRole | undefined;
    about?: string | undefined;
    datatype?: string | undefined;
    inlist?: any;
    prefix?: string | undefined;
    property?: string | undefined;
    resource?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;
    autoCapitalize?: string | undefined;
    autoCorrect?: string | undefined;
    autoSave?: string | undefined;
    color?: string | undefined;
    itemProp?: string | undefined;
    itemScope?: boolean | undefined;
    itemType?: string | undefined;
    itemID?: string | undefined;
    itemRef?: string | undefined;
    results?: number | undefined;
    security?: string | undefined;
    unselectable?: 'on' | 'off' | undefined;
    /**
     * Hints at the type of data that might be entered by the user while editing the element or its contents
     * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
     */
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;
    /**
     * Specify that a standard HTML element should behave like a defined custom built-in element
     * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
     */
    is?: string | undefined;
}

declare type HTMLCrossOriginAttribute = 'anonymous' | 'use-credentials' | '' | undefined;

/**
 * @public
 */
export declare const HTMLFragment: FunctionComponent<{
    dangerouslySetInnerHTML: string;
}>;

declare interface HtmlHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    manifest?: string | undefined;
}

declare type HTMLInputAutocompleteAttribute = 'on' | 'off' | 'billing' | 'shipping' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' | 'honorific-suffix' | 'nickname' | 'username' | 'new-password' | 'current-password' | 'one-time-code' | 'organization-title' | 'organization' | 'street-address' | 'address-line1' | 'address-line2' | 'address-line3' | 'address-level4' | 'address-level3' | 'address-level2' | 'address-level1' | 'country' | 'country-name' | 'postal-code' | 'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name' | 'cc-number' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type' | 'transaction-currency' | 'transaction-amount' | 'language' | 'bday' | 'bday-day' | 'bday-month' | 'bday-year' | 'sex' | 'url' | 'photo';

declare type HTMLInputTypeAttribute = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week' | (string & {});

declare interface HTMLWebViewElement extends HTMLElement {
}

/**
 * Low-level API used by the Optimizer to process `useTask$()` API. This method
 * is not intended to be used by developers.
 *
 * @internal
 *
 */
export declare const _hW: () => void;

declare interface IframeHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    allow?: string | undefined;
    allowFullScreen?: boolean | undefined;
    allowTransparency?: boolean | undefined;
    /** @deprecated Deprecated */
    frameBorder?: number | string | undefined;
    height?: Size | undefined;
    loading?: 'eager' | 'lazy' | undefined;
    /** @deprecated Deprecated */
    marginHeight?: number | undefined;
    /** @deprecated Deprecated */
    marginWidth?: number | undefined;
    name?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    sandbox?: string | undefined;
    /** @deprecated Deprecated */
    scrolling?: string | undefined;
    seamless?: boolean | undefined;
    src?: string | undefined;
    srcDoc?: string | undefined;
    width?: Size | undefined;
    children?: undefined;
}

declare interface ImgHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    alt?: string | undefined;
    crossOrigin?: HTMLCrossOriginAttribute;
    decoding?: 'async' | 'auto' | 'sync' | undefined;
    /**
     * Intrinsic height of the image in pixels.
     */
    height?: Numberish | undefined;
    loading?: 'eager' | 'lazy' | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcSet?: string | undefined;
    useMap?: string | undefined;
    /**
     * Intrinsic width of the image in pixels.
     */
    width?: Numberish | undefined;
    children?: undefined;
}

/**
 * @internal
 */
export declare const _IMMUTABLE: unique symbol;

/**
 * Create a `____$(...)` convenience method from `___(...)`.
 *
 * It is very common for functions to take a lazy-loadable resource as a first argument. For this
 * reason, the Qwik Optimizer automatically extracts the first argument from any function which
 * ends in `$`.
 *
 * This means that `foo$(arg0)` and `foo($(arg0))` are equivalent with respect to Qwik Optimizer.
 * The former is just a shorthand for the latter.
 *
 * For example, these function calls are equivalent:
 *
 * - `component$(() => {...})` is same as `component($(() => {...}))`
 *
 * ```tsx
 * export function myApi(callback: QRL<() => void>): void {
 *   // ...
 * }
 *
 * export const myApi$ = implicit$FirstArg(myApi);
 * // type of myApi$: (callback: () => void): void
 *
 * // can be used as:
 * myApi$(() => console.log('callback'));
 *
 * // will be transpiled to:
 * // FILE: <current file>
 * myApi(qrl('./chunk-abc.js', 'callback'));
 *
 * // FILE: chunk-abc.js
 * export const callback = () => console.log('callback');
 * ```
 *
 * @param fn - a function that should have its first argument automatically `$`.
 * @public
 */
export declare const implicit$FirstArg: <FIRST, REST extends any[], RET>(fn: (first: QRL<FIRST>, ...rest: REST) => RET) => (first: FIRST, ...rest: REST) => RET;

/**
 * @internal
 */
export declare const inlinedQrl: <T>(symbol: T, symbolName: string, lexicalScopeCapture?: any[]) => QRL<T>;

/**
 * @internal
 */
export declare const inlinedQrlDEV: <T = any>(symbol: T, symbolName: string, opts: QRLDev, lexicalScopeCapture?: any[]) => QRL<T>;

declare interface InputHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    accept?: string | undefined;
    alt?: string | undefined;
    autoComplete?: HTMLInputAutocompleteAttribute | Omit<HTMLInputAutocompleteAttribute, string> | undefined;
    autoFocus?: boolean | undefined;
    capture?: boolean | 'user' | 'environment' | undefined;
    checked?: boolean | undefined;
    'bind:checked'?: Signal<boolean | undefined>;
    crossOrigin?: HTMLCrossOriginAttribute;
    disabled?: boolean | undefined;
    enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
    form?: string | undefined;
    formAction?: string | undefined;
    formEncType?: string | undefined;
    formMethod?: string | undefined;
    formNoValidate?: boolean | undefined;
    formTarget?: string | undefined;
    height?: Size | undefined;
    list?: string | undefined;
    max?: number | string | undefined;
    maxLength?: number | undefined;
    min?: number | string | undefined;
    minLength?: number | undefined;
    multiple?: boolean | undefined;
    name?: string | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    size?: number | undefined;
    src?: string | undefined;
    step?: number | string | undefined;
    type?: HTMLInputTypeAttribute | undefined;
    value?: string | ReadonlyArray<string> | number | undefined | null | FormDataEntryValue;
    'bind:value'?: Signal<string | undefined>;
    width?: Size | undefined;
    children?: undefined;
}

declare interface InsHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    cite?: string | undefined;
    dateTime?: string | undefined;
}

declare interface IntrinsicHTMLElements {
    a: AnchorHTMLAttributes<HTMLAnchorElement>;
    abbr: HTMLAttributes<HTMLElement>;
    address: HTMLAttributes<HTMLElement>;
    area: AreaHTMLAttributes<HTMLAreaElement>;
    article: HTMLAttributes<HTMLElement>;
    aside: HTMLAttributes<HTMLElement>;
    audio: AudioHTMLAttributes<HTMLAudioElement>;
    b: HTMLAttributes<HTMLElement>;
    base: BaseHTMLAttributes<HTMLBaseElement>;
    bdi: HTMLAttributes<HTMLElement>;
    bdo: HTMLAttributes<HTMLElement>;
    big: HTMLAttributes<HTMLElement>;
    blockquote: BlockquoteHTMLAttributes<HTMLElement>;
    body: HTMLAttributes<HTMLBodyElement>;
    br: HTMLAttributes<HTMLBRElement>;
    button: ButtonHTMLAttributes<HTMLButtonElement>;
    canvas: CanvasHTMLAttributes<HTMLCanvasElement>;
    caption: HTMLAttributes<HTMLElement>;
    cite: HTMLAttributes<HTMLElement>;
    code: HTMLAttributes<HTMLElement>;
    col: ColHTMLAttributes<HTMLTableColElement>;
    colgroup: ColgroupHTMLAttributes<HTMLTableColElement>;
    data: DataHTMLAttributes<HTMLDataElement>;
    datalist: HTMLAttributes<HTMLDataListElement>;
    dd: HTMLAttributes<HTMLElement>;
    del: DelHTMLAttributes<HTMLElement>;
    details: DetailsHTMLAttributes<HTMLElement>;
    dfn: HTMLAttributes<HTMLElement>;
    dialog: DialogHTMLAttributes<HTMLDialogElement>;
    div: HTMLAttributes<HTMLDivElement>;
    dl: HTMLAttributes<HTMLDListElement>;
    dt: HTMLAttributes<HTMLElement>;
    em: HTMLAttributes<HTMLElement>;
    embed: EmbedHTMLAttributes<HTMLEmbedElement>;
    fieldset: FieldsetHTMLAttributes<HTMLFieldSetElement>;
    figcaption: HTMLAttributes<HTMLElement>;
    figure: HTMLAttributes<HTMLElement>;
    footer: HTMLAttributes<HTMLElement>;
    form: FormHTMLAttributes<HTMLFormElement>;
    h1: HTMLAttributes<HTMLHeadingElement>;
    h2: HTMLAttributes<HTMLHeadingElement>;
    h3: HTMLAttributes<HTMLHeadingElement>;
    h4: HTMLAttributes<HTMLHeadingElement>;
    h5: HTMLAttributes<HTMLHeadingElement>;
    h6: HTMLAttributes<HTMLHeadingElement>;
    head: HTMLAttributes<HTMLHeadElement>;
    header: HTMLAttributes<HTMLElement>;
    hgroup: HTMLAttributes<HTMLElement>;
    hr: HrHTMLAttributes<HTMLHRElement>;
    html: HtmlHTMLAttributes<HTMLHtmlElement>;
    i: HTMLAttributes<HTMLElement>;
    iframe: IframeHTMLAttributes<HTMLIFrameElement>;
    img: ImgHTMLAttributes<HTMLImageElement>;
    input: InputHTMLAttributes<HTMLInputElement>;
    ins: InsHTMLAttributes<HTMLModElement>;
    kbd: HTMLAttributes<HTMLElement>;
    keygen: KeygenHTMLAttributes<HTMLElement>;
    label: LabelHTMLAttributes<HTMLLabelElement>;
    legend: HTMLAttributes<HTMLLegendElement>;
    li: LiHTMLAttributes<HTMLLIElement>;
    link: LinkHTMLAttributes<HTMLLinkElement>;
    main: HTMLAttributes<HTMLElement>;
    map: MapHTMLAttributes<HTMLMapElement>;
    mark: HTMLAttributes<HTMLElement>;
    menu: MenuHTMLAttributes<HTMLElement>;
    menuitem: HTMLAttributes<HTMLElement>;
    meta: MetaHTMLAttributes<HTMLMetaElement>;
    meter: MeterHTMLAttributes<HTMLElement>;
    nav: HTMLAttributes<HTMLElement>;
    noindex: HTMLAttributes<HTMLElement>;
    noscript: HTMLAttributes<HTMLElement>;
    object: ObjectHTMLAttributes<HTMLObjectElement>;
    ol: OlHTMLAttributes<HTMLOListElement>;
    optgroup: OptgroupHTMLAttributes<HTMLOptGroupElement>;
    option: OptionHTMLAttributes<HTMLOptionElement>;
    output: OutputHTMLAttributes<HTMLElement>;
    p: HTMLAttributes<HTMLParagraphElement>;
    param: ParamHTMLAttributes<HTMLParamElement>;
    picture: HTMLAttributes<HTMLElement>;
    pre: HTMLAttributes<HTMLPreElement>;
    progress: ProgressHTMLAttributes<HTMLProgressElement>;
    q: QuoteHTMLAttributes<HTMLQuoteElement>;
    rp: HTMLAttributes<HTMLElement>;
    rt: HTMLAttributes<HTMLElement>;
    ruby: HTMLAttributes<HTMLElement>;
    s: HTMLAttributes<HTMLElement>;
    samp: HTMLAttributes<HTMLElement>;
    slot: SlotHTMLAttributes<HTMLSlotElement>;
    script: ScriptHTMLAttributes<HTMLScriptElement>;
    section: HTMLAttributes<HTMLElement>;
    select: SelectHTMLAttributes<HTMLSelectElement>;
    small: HTMLAttributes<HTMLElement>;
    source: SourceHTMLAttributes<HTMLSourceElement>;
    span: HTMLAttributes<HTMLSpanElement>;
    strong: HTMLAttributes<HTMLElement>;
    style: StyleHTMLAttributes<HTMLStyleElement>;
    sub: HTMLAttributes<HTMLElement>;
    summary: HTMLAttributes<HTMLElement>;
    sup: HTMLAttributes<HTMLElement>;
    table: TableHTMLAttributes<HTMLTableElement>;
    template: HTMLAttributes<HTMLTemplateElement>;
    tbody: HTMLAttributes<HTMLTableSectionElement>;
    td: TdHTMLAttributes<HTMLTableDataCellElement>;
    textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
    tfoot: HTMLAttributes<HTMLTableSectionElement>;
    th: ThHTMLAttributes<HTMLTableHeaderCellElement>;
    thead: HTMLAttributes<HTMLTableSectionElement>;
    time: TimeHTMLAttributes<HTMLElement>;
    title: TitleHTMLAttributes<HTMLTitleElement>;
    tr: HTMLAttributes<HTMLTableRowElement>;
    track: TrackHTMLAttributes<HTMLTrackElement>;
    tt: HTMLAttributes<HTMLElement>;
    u: HTMLAttributes<HTMLElement>;
    ul: HTMLAttributes<HTMLUListElement>;
    video: VideoHTMLAttributes<HTMLVideoElement>;
    wbr: HTMLAttributes<HTMLElement>;
    webview: WebViewHTMLAttributes<HTMLWebViewElement>;
}

declare interface InvokeContext {
    $url$: URL | undefined;
    $seq$: number;
    $hostElement$: QwikElement | undefined;
    $element$: Element | undefined;
    $event$: any | undefined;
    $qrl$: QRL<any> | undefined;
    $waitOn$: Promise<any>[] | undefined;
    $subscriber$: Subscriber | null | undefined;
    $renderCtx$: RenderContext | undefined;
    $locale$: string | undefined;
}

declare type InvokeTuple = [Element, Event, URL?];

/**
 * @public
 */
declare const jsx: <T extends string | FunctionComponent<any>>(type: T, props: T extends FunctionComponent<infer PROPS> ? PROPS : Record<string, any>, key?: string | number | null) => JSXNode<T>;
export { jsx }
export { jsx as jsxs }

/**
 * @internal
 */
export declare const _jsxBranch: (input?: any) => any;

/**
 * @internal
 */
export declare const _jsxC: <T extends string | FunctionComponent<any>>(type: T, mutableProps: (T extends FunctionComponent<infer PROPS> ? PROPS : Record<string, any>) | null, flags: number, key: string | number | null, dev?: JsxDevOpts) => JSXNode<T>;

/**
 * @public
 */
export declare type JSXChildren = string | number | boolean | null | undefined | Function | RegExp | JSXChildren[] | Promise<JSXChildren> | Signal<JSXChildren> | JSXNode;

/**
 * @public
 */
export declare const jsxDEV: <T extends string | FunctionComponent<any>>(type: T, props: T extends FunctionComponent<infer PROPS> ? PROPS : Record<string, any>, key: string | number | null | undefined, _isStatic: boolean, opts: JsxDevOpts, _ctx: any) => JSXNode<T>;

declare interface JsxDevOpts {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
}

/**
 * @public
 */
export declare interface JSXNode<T = string | FunctionComponent> {
    type: T;
    props: T extends FunctionComponent<infer B> ? B : Record<string, any>;
    immutableProps: Record<string, any> | null;
    children: any | null;
    flags: number;
    key: string | null;
    dev?: DevJSX;
}

/**
 * @internal
 */
export declare const _jsxQ: <T extends string>(type: T, mutableProps: (T extends FunctionComponent<infer PROPS> ? PROPS : Record<string, any>) | null, immutableProps: Record<string, any> | null, children: any | null, flags: number, key: string | number | null, dev?: DevJSX) => JSXNode<T>;

/**
 * @internal
 */
export declare const _jsxS: <T extends string>(type: T, mutableProps: (T extends FunctionComponent<infer PROPS> ? PROPS : Record<string, any>) | null, immutableProps: Record<string, any> | null, flags: number, key: string | number | null, dev?: DevJSX) => JSXNode<T>;

/**
 * @public
 */
export declare type JSXTagName = keyof HTMLElementTagNameMap | Omit<string, keyof HTMLElementTagNameMap>;

declare interface KeygenHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    autoFocus?: boolean | undefined;
    challenge?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    keyType?: string | undefined;
    keyParams?: string | undefined;
    name?: string | undefined;
    children?: undefined;
}

declare interface LabelHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    form?: string | undefined;
    for?: string | undefined;
}

declare interface LiHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    value?: string | ReadonlyArray<string> | number | undefined;
}

declare interface LinkHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    as?: string | undefined;
    crossOrigin?: HTMLCrossOriginAttribute;
    href?: string | undefined;
    hrefLang?: string | undefined;
    integrity?: string | undefined;
    media?: string | undefined;
    imageSrcSet?: string | undefined;
    imageSizes?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    rel?: string | undefined;
    sizes?: string | undefined;
    type?: string | undefined;
    charSet?: string | undefined;
    children?: undefined;
}

declare type Listener = [eventName: string, qrl: QRLInternal];

/**
 * Allows creating a union type by combining primitive types and literal types
 * without sacrificing auto-completion in IDEs for the literal type part of the union.
 *
 * This type is a workaround for Microsoft/TypeScript#29729.
 * It will be removed as soon as it's not needed anymore.
 *
 * Example:
 *
 * ```
 * // Before
 * type Pet = 'dog' | 'cat' | string;
 *
 * const pet: Pet = '';
 * // Start typing in your TypeScript-enabled IDE.
 * // You **will not** get auto-completion for `dog` and `cat` literals.
 *
 * // After
 * type Pet2 = LiteralUnion<'dog' | 'cat', string>;
 *
 * const pet: Pet2 = '';
 * // You **will** get auto-completion for `dog` and `cat` literals.
 * ```
 */
declare type LiteralUnion<LiteralType, BaseType extends Primitive> = LiteralType | (BaseType & Record<never, never>);

declare class LocalSubscriptionManager {
    private $groupToManagers$;
    private $containerState$;
    readonly $subs$: Subscriptions[];
    constructor($groupToManagers$: GroupToManagersMap, $containerState$: ContainerState, initialMap?: Subscriptions[]);
    $addSubs$(subs: Subscriptions[]): void;
    $addToGroup$(group: SubscriberHost | SubscriberEffect | Node, manager: LocalSubscriptionManager): void;
    $unsubGroup$(group: SubscriberEffect | SubscriberHost | Node): void;
    $unsubEntry$(entry: SubscriberSignal): void;
    $addSub$(sub: Subscriber, key?: string): void;
    $notifySubs$(key?: string | undefined): void;
}

declare interface MapHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    name?: string | undefined;
}

declare interface MediaHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    autoPlay?: boolean | undefined;
    controls?: boolean | undefined;
    controlsList?: string | undefined;
    crossOrigin?: HTMLCrossOriginAttribute;
    loop?: boolean | undefined;
    mediaGroup?: string | undefined;
    muted?: boolean | undefined;
    playsInline?: boolean | undefined;
    preload?: string | undefined;
    src?: string | undefined;
}

declare interface MenuHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    type?: string | undefined;
}

declare interface MetaHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    charSet?: string | undefined;
    content?: string | undefined;
    httpEquiv?: string | undefined;
    name?: string | undefined;
    media?: string | undefined;
    children?: undefined;
}

declare interface MeterHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    form?: string | undefined;
    high?: number | undefined;
    low?: number | undefined;
    max?: number | string | undefined;
    min?: number | string | undefined;
    optimum?: number | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
}

/** @public */
export declare type NativeAnimationEvent = AnimationEvent;

/** @public */
export declare type NativeClipboardEvent = ClipboardEvent;

/** @public */
export declare type NativeCompositionEvent = CompositionEvent;

/** @public */
export declare type NativeDragEvent = DragEvent;

/**
 * @public
 */
declare type NativeEventHandler<T extends Event = Event, EL = Element> = BivariantEventHandler<T, EL> | QRL<BivariantEventHandler<T, EL>>[];

/** @public */
export declare type NativeFocusEvent = FocusEvent;

/** @public */
export declare type NativeKeyboardEvent = KeyboardEvent;

/** @public */
export declare type NativeMouseEvent = MouseEvent;

/** @public */
export declare type NativePointerEvent = PointerEvent;

/** @public */
export declare type NativeTouchEvent = TouchEvent;

/** @public */
export declare type NativeTransitionEvent = TransitionEvent;

/** @public */
export declare type NativeUIEvent = UIEvent;

/** @public */
export declare type NativeWheelEvent = WheelEvent;

/**
 * @internal
 */
export declare const _noopQrl: <T>(symbolName: string, lexicalScopeCapture?: any[]) => QRL<T>;

/**
 * Returned type of the `noSerialize()` function. It will be TYPE or undefined.
 *
 * @see noSerialize
 * @public
 */
export declare type NoSerialize<T> = (T & {
    __no_serialize__: true;
}) | undefined;

/**
 * Marks a property on a store as non-serializable.
 *
 * At times it is necessary to store values on a store that are non-serializable. Normally this
 * is a runtime error as Store wants to eagerly report when a non-serializable property is
 * assigned to it.
 *
 * You can use `noSerialize()` to mark a value as non-serializable. The value is persisted in the
 * Store but does not survive serialization. The implication is that when your application is
 * resumed, the value of this object will be `undefined`. You will be responsible for recovering
 * from this.
 *
 * See: [noSerialize Tutorial](http://qwik.builder.io/tutorial/store/no-serialize)
 *
 * @public
 */
export declare const noSerialize: <T extends object | undefined>(input: T) => NoSerialize<T>;

declare type Numberish = number | `${number}`;

declare interface ObjectHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    classID?: string | undefined;
    data?: string | undefined;
    form?: string | undefined;
    height?: Size | undefined;
    name?: string | undefined;
    type?: string | undefined;
    useMap?: string | undefined;
    width?: Size | undefined;
    wmode?: string | undefined;
}

declare type ObjToProxyMap = WeakMap<any, any>;

declare interface OlHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    reversed?: boolean | undefined;
    start?: number | undefined;
    type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined;
}

/**
 * @public
 */
export declare type OnRenderFn<PROPS extends {}> = (props: PROPS) => JSXNode<any> | null;

/**
 * @public
 */
export declare interface OnVisibleTaskOptions {
    /**
     * The strategy to use to determine when the "VisibleTask" should first execute.
     *
     * - `intersection-observer`: the task will first execute when the element is visible in the viewport, under the hood it uses the IntersectionObserver API.
     * - `document-ready`: the task will first execute when the document is ready, under the hood it uses the document `load` event.
     * - `document-idle`: the task will first execute when the document is idle, under the hood it uses the requestIdleCallback API.
     */
    strategy?: VisibleTaskStrategy;
}

declare interface OptgroupHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    label?: string | undefined;
}

declare interface OptionHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    label?: string | undefined;
    selected?: boolean | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
    children?: string;
}

declare interface OutputHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    form?: string | undefined;
    for?: string | undefined;
    name?: string | undefined;
}

declare interface ParamHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    name?: string | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
    children?: undefined;
}

/**
 * The PascalCaseEventLiteralType combines the QwikKeysEvents type and string type
 * using the LiteralUnion utility type, allowing autocompletion for event names while
 * retaining support for custom event names as strings.
 */
declare type PascalCaseEventLiteralType = LiteralUnion<QwikKeysEvents, string>;

/**
 * @public
 */
declare interface PauseContext {
    getObject: GetObject;
    meta: SnapshotMeta;
    refs: Record<string, string>;
}

/**
 * @internal
 */
export declare const _pauseFromContexts: (allContexts: QContext[], containerState: ContainerState, fallbackGetObjId?: GetObjID, textNodes?: Map<string, string>) => Promise<SnapshotResult>;

declare type PreventDefault<T extends Element> = {
    [K in keyof QwikEventMap<T> as `preventdefault:${Lowercase<K>}`]?: boolean;
};

/**
 * Matches any primitive value.
 */
declare type Primitive = null | undefined | string | number | boolean | symbol | bigint;

declare interface ProcessedJSXNode {
    $type$: string;
    $id$: string;
    $props$: Record<string, any>;
    $immutableProps$: Record<string, any> | null;
    $flags$: number;
    $children$: ProcessedJSXNode[];
    $key$: string | null;
    $elm$: Node | VirtualElement | null;
    $text$: string;
    $signal$: Signal<any> | null;
    $dev$?: DevJSX;
}

declare interface ProgressHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    max?: number | string | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
}

/**
 * @public
 */
export declare interface PropFnInterface<ARGS extends any[], RET> {
    (...args: ARGS): Promise<RET>;
}

/**
 * @public
 */
export declare type PropFunction<T extends Function = (...args: any[]) => any> = T extends (...args: infer ARGS) => infer RET ? PropFnInterface<ARGS, Awaited<RET>> : never;

/**
 * @public
 */
export declare type PropFunctionProps<PROPS extends {}> = {
    [K in keyof PROPS]: NonNullable<PROPS[K]> extends (...args: infer ARGS) => infer RET ? PropFnInterface<ARGS, Awaited<RET>> : PROPS[K];
};

/**
 * Infers `Props` from the component.
 *
 * ```typescript
 * export const OtherComponent = component$(() => {
 *   return $(() => <Counter value={100} />);
 * });
 * ```
 *
 * @public
 */
export declare type PropsOf<COMP extends Component<any>> = COMP extends Component<infer PROPS> ? NonNullable<PROPS> : never;

/**
 * Extends the defined component PROPS, adding the default ones (children and q:slot)..
 * @public
 */
export declare type PublicProps<PROPS extends {}> = TransformProps<PROPS> & ComponentBaseProps & ComponentChildren<PROPS>;

declare interface QContext {
    $element$: QwikElement;
    $refMap$: any[];
    $flags$: number;
    $id$: string;
    $props$: Record<string, any> | null;
    $componentQrl$: QRLInternal<OnRenderFn<any>> | null;
    li: Listener[];
    $seq$: any[] | null;
    $tasks$: SubscriberEffect[] | null;
    $contexts$: Map<string, any> | null;
    $appendStyles$: StyleAppend[] | null;
    $scopeIds$: string[] | null;
    $vdom$: ProcessedJSXNode | null;
    $slots$: ProcessedJSXNode[] | null;
    $dynamicSlots$: QContext[] | null;
    $parent$: QContext | null;
    $slotParent$: QContext | null;
}

declare const QObjectManagerSymbol: unique symbol;

declare const QObjectSignalFlags: unique symbol;

/**
 * The `QRL` type represents a lazy-loadable AND serializable resource.
 *
 * QRL stands for Qwik URL.
 *
 * Use `QRL` when you want to refer to a lazy-loaded resource. `QRL`s are most often used for
 * code (functions) but can also be used for other resources such as `string`s in the case of
 * styles.
 *
 * `QRL` is an opaque token that is generated by the Qwik Optimizer. (Do not rely on any
 * properties in `QRL` as it may change between versions.)
 *
 * ## Creating `QRL` references
 *
 * Creating `QRL` is done using `$(...)` function. `$(...)` is a special marker for the Qwik
 * Optimizer that marks that the code should be extracted into a lazy-loaded symbol.
 *
 * ```tsx
 * useOnDocument(
 *   'mousemove',
 *   $((event) => console.log('mousemove', event))
 * );
 * ```
 *
 * In the above code, the Qwik Optimizer detects `$(...)` and transforms the code as shown below:
 *
 * ```tsx
 * // FILE: <current file>
 * useOnDocument('mousemove', qrl('./chunk-abc.js', 'onMousemove'));
 *
 * // FILE: chunk-abc.js
 * export const onMousemove = () => console.log('mousemove');
 * ```
 *
 * NOTE: `qrl(...)` is a result of Qwik Optimizer transformation. You should never have to invoke
 * this function directly in your application. The `qrl(...)` function should be invoked only
 * after the Qwik Optimizer transformation.
 *
 * ## Using `QRL`s
 *
 * Use `QRL` type in your application when you want to get a lazy-loadable reference to a
 * resource (most likely a function).
 *
 * ```tsx
 * // Example of declaring a custom functions which takes callback as QRL.
 * export function useMyFunction(callback: QRL<() => void>) {
 *   doExtraStuff();
 *   // The callback passed to `onDocument` requires `QRL`.
 *   useOnDocument('mousemove', callback);
 * }
 * ```
 *
 * In the above example, the way to think about the code is that you are not asking for a
 * callback function but rather a reference to a lazy-loadable callback function. Specifically,
 * the function loading should be delayed until it is actually needed. In the above example, the
 * function would not load until after a `mousemove` event on `document` fires.
 *
 * ## Resolving `QRL` references
 *
 * At times it may be necessary to resolve a `QRL` reference to the actual value. This can be
 * performed using `QRL.resolve(..)` function.
 *
 * ```tsx
 * // Assume you have QRL reference to a greet function
 * const lazyGreet: QRL<() => void> = $(() => console.log('Hello World!'));
 *
 * // Use `qrlImport` to load / resolve the reference.
 * const greet: () => void = await lazyGreet.resolve();
 *
 * //  Invoke it
 * greet();
 * ```
 *
 * NOTE: `element` is needed because `QRL`s are relative and need a base location to resolve
 * against. The base location is encoded in the HTML in the form of `<div q:base="/url">`.
 *
 * ## Question: Why not just use `import()`?
 *
 * At first glance, `QRL` serves the same purpose as `import()`. However, there are three subtle
 * differences that need to be taken into account.
 *
 * 1. `QRL`s must be serializable into HTML.
 * 2. `QRL`s must be resolved by framework relative to `q:base`.
 * 3. `QRL`s must be able to capture lexically scoped variables.
 * 4. `QRL`s encapsulate the difference between running with and without Qwik Optimizer.
 * 5. `QRL`s allow expressing lazy-loaded boundaries without thinking about chunk and symbol
 * names.
 *
 * Let's assume that you intend to write code such as this:
 *
 * ```tsx
 * return <button onClick={() => (await import('./chunk-abc.js')).onClick}>
 * ```
 *
 * The above code needs to be serialized into DOM such as:
 *
 * ```
 * <div q:base="/build/">
 *   <button on:click="./chunk-abc.js#onClick">...</button>
 * </div>
 * ```
 *
 * 1. Notice there is no easy way to extract chunk (`./chunk-abc.js`) and symbol (`onClick`) into
 * HTML.
 * 2. Notice that even if you could extract it, the `import('./chunk-abc.js')` would become
 * relative to where the `import()` file is declared. Because it is our framework doing the load,
 * the `./chunk-abc.js` would become relative to the framework file. This is not correct, as it
 * should be relative to the original file generated by the bundler.
 * 3. Next, the framework needs to resolve the `./chunk-abc.js` and needs a base location that is
 * encoded in the HTML.
 * 4. The QRL needs to be able to capture lexically scoped variables. (`import()` only allows
 * loading top-level symbols which don't capture variables.)
 * 5. As a developer, you don't want to think about `import` and naming the chunks and symbols.
 * You just want to say: "this should be lazy."
 *
 * These are the main reasons why Qwik introduces its own concept of `QRL`.
 *
 * @see `$`
 *
 * @public
 */
export declare interface QRL<TYPE = any> {
    __brand__QRL__: TYPE;
    /**
     * Resolve the QRL of closure and invoke it.
     * @param signal - An AbortSignal object.
     * @param args - Closure arguments.
     * @returns A promise of the return value of the closure.
     */
    (signal: AbortSignal, ...args: TYPE extends (...args: infer ARGS) => any ? ARGS : never): Promise<TYPE extends (...args: any[]) => infer RETURN ? Awaited<RETURN> : never>;
    /**
     * Resolve the QRL of closure and invoke it.
     * @param args - Closure arguments.
     * @returns A promise of the return value of the closure.
     */
    (...args: TYPE extends (...args: infer ARGS) => any ? ARGS : never): Promise<TYPE extends (...args: any[]) => infer RETURN ? Awaited<RETURN> : never>;
    /**
     * Resolve the QRL and return the actual value.
     */
    resolve(): Promise<TYPE>;
    getCaptured(): any[] | null;
    getSymbol(): string;
    getHash(): string;
    dev: QRLDev | null;
}

/**
 * Used by Qwik Optimizer to point to lazy-loaded resources.
 *
 * This function should be used by the Qwik Optimizer only. The function should not be directly
 * referred to in the source code of the application.
 *
 * @see `QRL`, `$(...)`
 *
 * @param chunkOrFn - Chunk name (or function which is stringified to extract chunk name)
 * @param symbol - Symbol to lazy load
 * @param lexicalScopeCapture - a set of lexically scoped variables to capture.
 * @public
 */
export declare const qrl: <T = any>(chunkOrFn: string | (() => Promise<any>), symbol: string, lexicalScopeCapture?: any[], stackOffset?: number) => QRL<T>;

/**
 * @public
 */
declare interface QRLDev {
    file: string;
    lo: number;
    hi: number;
}

/**
 * @internal
 */
export declare const qrlDEV: <T = any>(chunkOrFn: string | (() => Promise<any>), symbol: string, opts: QRLDev, lexicalScopeCapture?: any[]) => QRL<T>;

declare interface QRLInternal<TYPE = any> extends QRL<TYPE>, QRLInternalMethods<TYPE> {
}

declare interface QRLInternalMethods<TYPE> {
    readonly $chunk$: string | null;
    readonly $symbol$: string;
    readonly $refSymbol$: string | null;
    readonly $hash$: string;
    $capture$: string[] | null;
    $captureRef$: any[] | null;
    dev: QRLDev | null;
    resolve(): Promise<TYPE>;
    getSymbol(): string;
    getHash(): string;
    getCaptured(): any[] | null;
    getFn(currentCtx?: InvokeContext | InvokeTuple, beforeFn?: () => void): TYPE extends (...args: infer ARGS) => infer Return ? (...args: ARGS) => ValueOrPromise<Return> : any;
    $setContainer$(containerEl: Element | undefined): Element | undefined;
    $resolveLazy$(containerEl?: Element): ValueOrPromise<TYPE>;
}

declare interface QuoteHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    cite?: string | undefined;
}

/**
 * @public
 */
export declare interface QwikAnimationEvent<T = Element> extends SyntheticEvent<T, NativeAnimationEvent> {
    animationName: string;
    elapsedTime: number;
    pseudoElement: string;
}

/**
 * @public
 */
export declare interface QwikChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
}

/**
 * @public
 */
export declare interface QwikClipboardEvent<T = Element> extends SyntheticEvent<T, NativeClipboardEvent> {
    clipboardData: DataTransfer;
}

/**
 * @public
 */
export declare interface QwikCompositionEvent<T = Element> extends SyntheticEvent<T, NativeCompositionEvent> {
    data: string;
}

declare interface QwikCustomEvents<El> {
    [key: `${'document:' | 'window:' | ''}on${string}$`]: SingleOrArray<NativeEventHandler<Event, El>> | SingleOrArray<Function> | SingleOrArray<undefined>;
}

declare interface QwikCustomHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    [key: string]: any;
}

declare interface QwikCustomHTMLElement extends Element {
}

/**
 * @public
 */
export declare interface QwikDOMAttributes extends DOMAttributes<Element> {
}

/**
 * @public
 */
export declare interface QwikDragEvent<T = Element> extends QwikMouseEvent<T, NativeDragEvent> {
    dataTransfer: DataTransfer;
}

declare type QwikElement = Element | VirtualElement;

declare type QwikEventMap<T> = {
    Copy: QwikClipboardEvent<T>;
    CopyCapture: QwikClipboardEvent<T>;
    Cut: QwikClipboardEvent<T>;
    CutCapture: QwikClipboardEvent<T>;
    Paste: QwikClipboardEvent<T>;
    PasteCapture: QwikClipboardEvent<T>;
    CompositionEnd: QwikCompositionEvent<T>;
    CompositionEndCapture: QwikCompositionEvent<T>;
    CompositionStart: QwikCompositionEvent<T>;
    CompositionStartCapture: QwikCompositionEvent<T>;
    CompositionUpdate: QwikCompositionEvent<T>;
    CompositionUpdateCapture: QwikCompositionEvent<T>;
    Focus: QwikFocusEvent<T>;
    FocusCapture: QwikFocusEvent<T>;
    Focusin: QwikFocusEvent<T>;
    FocusinCapture: QwikFocusEvent<T>;
    Focusout: QwikFocusEvent<T>;
    FocusoutCapture: QwikFocusEvent<T>;
    Blur: QwikFocusEvent<T>;
    BlurCapture: QwikFocusEvent<T>;
    Change: QwikChangeEvent<T>;
    ChangeCapture: QwikChangeEvent<T>;
    Input: Event;
    InputCapture: Event;
    Reset: Event;
    ResetCapture: Event;
    Submit: QwikSubmitEvent<T>;
    SubmitCapture: Event;
    Invalid: QwikInvalidEvent<T>;
    InvalidCapture: QwikInvalidEvent<T>;
    Load: Event;
    LoadCapture: Event;
    Error: Event;
    ErrorCapture: Event;
    KeyDown: QwikKeyboardEvent<T>;
    KeyDownCapture: QwikKeyboardEvent<T>;
    KeyPress: QwikKeyboardEvent<T>;
    KeyPressCapture: QwikKeyboardEvent<T>;
    KeyUp: QwikKeyboardEvent<T>;
    KeyUpCapture: QwikKeyboardEvent<T>;
    AuxClick: QwikMouseEvent<T>;
    Click: QwikMouseEvent<T>;
    ClickCapture: QwikMouseEvent<T>;
    ContextMenu: QwikMouseEvent<T>;
    ContextMenuCapture: QwikMouseEvent<T>;
    DblClick: QwikMouseEvent<T>;
    DblClickCapture: QwikMouseEvent<T>;
    Drag: QwikDragEvent<T>;
    DragCapture: QwikDragEvent<T>;
    DragEnd: QwikDragEvent<T>;
    DragEndCapture: QwikDragEvent<T>;
    DragEnter: QwikDragEvent<T>;
    DragEnterCapture: QwikDragEvent<T>;
    DragExit: QwikDragEvent<T>;
    DragExitCapture: QwikDragEvent<T>;
    DragLeave: QwikDragEvent<T>;
    DragLeaveCapture: QwikDragEvent<T>;
    DragOver: QwikDragEvent<T>;
    DragOverCapture: QwikDragEvent<T>;
    DragStart: QwikDragEvent<T>;
    DragStartCapture: QwikDragEvent<T>;
    Drop: QwikDragEvent<T>;
    DropCapture: QwikDragEvent<T>;
    MouseDown: QwikMouseEvent<T>;
    MouseDownCapture: QwikMouseEvent<T>;
    MouseEnter: QwikMouseEvent<T>;
    MouseLeave: QwikMouseEvent<T>;
    MouseMove: QwikMouseEvent<T>;
    MouseMoveCapture: QwikMouseEvent<T>;
    MouseOut: QwikMouseEvent<T>;
    MouseOutCapture: QwikMouseEvent<T>;
    MouseOver: QwikMouseEvent<T>;
    MouseOverCapture: QwikMouseEvent<T>;
    MouseUp: QwikMouseEvent<T>;
    MouseUpCapture: QwikMouseEvent<T>;
    TouchCancel: QwikTouchEvent<T>;
    TouchCancelCapture: QwikTouchEvent<T>;
    TouchEnd: QwikTouchEvent<T>;
    TouchEndCapture: QwikTouchEvent<T>;
    TouchMove: QwikTouchEvent<T>;
    TouchMoveCapture: QwikTouchEvent<T>;
    TouchStart: QwikTouchEvent<T>;
    TouchStartCapture: QwikTouchEvent<T>;
    PointerDown: QwikPointerEvent<T>;
    PointerDownCapture: QwikPointerEvent<T>;
    PointerMove: QwikPointerEvent<T>;
    PointerMoveCapture: QwikPointerEvent<T>;
    PointerUp: QwikPointerEvent<T>;
    PointerUpCapture: QwikPointerEvent<T>;
    PointerCancel: QwikPointerEvent<T>;
    PointerCancelCapture: QwikPointerEvent<T>;
    PointerEnter: QwikPointerEvent<T>;
    PointerEnterCapture: QwikPointerEvent<T>;
    PointerLeave: QwikPointerEvent<T>;
    PointerLeaveCapture: QwikPointerEvent<T>;
    PointerOver: QwikPointerEvent<T>;
    PointerOverCapture: QwikPointerEvent<T>;
    PointerOut: QwikPointerEvent<T>;
    PointerOutCapture: QwikPointerEvent<T>;
    GotPointerCapture: QwikPointerEvent<T>;
    GotPointerCaptureCapture: QwikPointerEvent<T>;
    LostPointerCapture: QwikPointerEvent<T>;
    LostPointerCaptureCapture: QwikPointerEvent<T>;
    Scroll: QwikUIEvent<T>;
    ScrollCapture: QwikUIEvent<T>;
    Wheel: QwikWheelEvent<T>;
    WheelCapture: QwikWheelEvent<T>;
    AnimationStart: QwikAnimationEvent<T>;
    AnimationStartCapture: QwikAnimationEvent<T>;
    AnimationEnd: QwikAnimationEvent<T>;
    AnimationEndCapture: QwikAnimationEvent<T>;
    AnimationIteration: QwikAnimationEvent<T>;
    AnimationIterationCapture: QwikAnimationEvent<T>;
    TransitionEnd: QwikTransitionEvent<T>;
    TransitionEndCapture: QwikTransitionEvent<T>;
    AudioProcess: Event;
    CanPlay: Event;
    CanPlayThrough: Event;
    Complete: Event;
    DurationChange: Event;
    Emptied: Event;
    Ended: Event;
    LoadedData: Event;
    LoadedMetadata: Event;
    Pause: Event;
    Play: Event;
    Playing: Event;
    Progress: Event;
    RateChange: Event;
    Seeked: Event;
    Seeking: Event;
    Stalled: Event;
    Suspend: Event;
    TimeUpdate: Event;
    VolumeChange: Event;
    Waiting: Event;
};

/**
 * @public
 */
declare interface QwikEvents<T> extends QwikKnownEvents<T>, QwikCustomEvents<T> {
    'document:onLoad$'?: BivariantEventHandler<Event, T>;
    'document:onScroll$'?: BivariantEventHandler<QwikUIEvent<T>, T>;
    'document:onVisible$'?: BivariantEventHandler<Event, T>;
    'document:onVisibilityChange$'?: BivariantEventHandler<Event, T>;
}

/**
 * @public
 */
export declare interface QwikFocusEvent<T = Element> extends SyntheticEvent<T, NativeFocusEvent> {
    relatedTarget: EventTarget | null;
    target: EventTarget & T;
}

/**
 * @public
 */
declare interface QwikIntrinsicAttributes {
    key?: string | number | undefined | null;
}

/**
 * The interface holds available attributes of both native DOM elements and custom Qwik elements.
 * An example showing how to define a customizable wrapper component:
 *
 * ```tsx
 * import { component$, Slot, type QwikIntrinsicElements } from "@builder.io/qwik";
 *
 * type WrapperProps = {
 *   attributes?: QwikIntrinsicElements["div"];
 * };
 *
 * export default component$<WrapperProps>(({ attributes }) => {
 *   return (
 *     <div {...attributes} class="p-2">
 *       <Slot />
 *     </div>
 *   );
 * });
 * ```
 * @public
 */
export declare interface QwikIntrinsicElements extends IntrinsicHTMLElements {
    [key: string]: QwikCustomHTMLAttributes<QwikCustomHTMLElement>;
}

/**
 * @public
 */
export declare interface QwikInvalidEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
}

/**
 * @public
 */
export declare namespace QwikJSX {
    export interface Element extends JSXNode {
    }
    export interface IntrinsicAttributes extends QwikIntrinsicAttributes {
    }
    export interface ElementChildrenAttribute {
        children: any;
    }
    export interface IntrinsicElements extends QwikIntrinsicElements {
    }
}

/**
 * @public
 */
export declare interface QwikKeyboardEvent<T = Element> extends SyntheticEvent<T, NativeKeyboardEvent> {
    isComposing: boolean;
    altKey: boolean;
    charCode: number;
    ctrlKey: boolean;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
     */
    getModifierState(key: string): boolean;
    /**
     * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible values
     */
    key: string;
    keyCode: number;
    locale: string;
    location: number;
    metaKey: boolean;
    repeat: boolean;
    shiftKey: boolean;
    which: number;
}

declare type QwikKeysEvents = Lowercase<keyof QwikEventMap<any>>;

declare type QwikKnownEvents<T> = {
    [K in keyof QwikEventMap<T> as `${'document:' | 'window:' | ''}on${K}$`]?: SingleOrArray<BivariantEventHandler<QwikEventMap<T>[K], T>>;
};

/**
 * @public
 */
export declare interface QwikMouseEvent<T = Element, E = NativeMouseEvent> extends SyntheticEvent<T, E> {
    altKey: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    ctrlKey: boolean;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
     */
    getModifierState(key: string): boolean;
    metaKey: boolean;
    movementX: number;
    movementY: number;
    pageX: number;
    pageY: number;
    relatedTarget: EventTarget | null;
    screenX: number;
    screenY: number;
    shiftKey: boolean;
    x: number;
    y: number;
}

/**
 * @public
 */
export declare interface QwikPointerEvent<T = Element> extends QwikMouseEvent<T, NativePointerEvent> {
    pointerId: number;
    pressure: number;
    tiltX: number;
    tiltY: number;
    width: number;
    height: number;
    pointerType: 'mouse' | 'pen' | 'touch';
    isPrimary: boolean;
}

declare interface QwikProps<T extends Element> extends PreventDefault<T> {
    class?: ClassList | Signal<ClassList> | undefined;
    dangerouslySetInnerHTML?: string | undefined;
    ref?: Ref<T> | undefined;
    /**
     * Corresponding slot name used to project the element into.
     */
    'q:slot'?: string;
}

/**
 * @public
 */
export declare interface QwikSubmitEvent<T = Element> extends SyntheticEvent<T> {
}

/**
 * @public
 */
export declare interface QwikTouchEvent<T = Element> extends SyntheticEvent<T, NativeTouchEvent> {
    altKey: boolean;
    changedTouches: TouchList;
    ctrlKey: boolean;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
     */
    getModifierState(key: string): boolean;
    metaKey: boolean;
    shiftKey: boolean;
    targetTouches: TouchList;
    touches: TouchList;
}

/**
 * @public
 */
export declare interface QwikTransitionEvent<T = Element> extends SyntheticEvent<T, NativeTransitionEvent> {
    elapsedTime: number;
    propertyName: string;
    pseudoElement: string;
}

/**
 * @public
 */
export declare interface QwikUIEvent<T = Element> extends SyntheticEvent<T, NativeUIEvent> {
    detail: number;
    view: AbstractView;
}

/**
 * @public
 */
export declare interface QwikWheelEvent<T = Element> extends QwikMouseEvent<T, NativeWheelEvent> {
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
}

/**
 * @public
 */
declare type ReadonlySignal<T = any> = Readonly<Signal<T>>;

/**
 * @public
 */
declare type Ref<T extends Element = Element> = Signal<Element | undefined> | RefFnInterface;

declare interface RefFnInterface {
    (el: Element): void;
}

/**
 * @internal
 */
export declare const _regSymbol: (symbol: any, hash: string) => any;

/**
 * Render JSX.
 *
 * Use this method to render JSX. This function does reconciling which means
 * it always tries to reuse what is already in the DOM (rather then destroy and
 * recreate content.)
 * It returns a cleanup function you could use for cleaning up subscriptions.
 *
 * @param parent - Element which will act as a parent to `jsxNode`. When
 *     possible the rendering will try to reuse existing nodes.
 * @param jsxNode - JSX to render
 * @returns an object containing a cleanup function.
 * @public
 */
export declare const render: (parent: Element | Document, jsxNode: JSXNode | FunctionComponent<any>, opts?: RenderOptions) => Promise<RenderResult>;

/**
 * @public
 */
declare interface RenderContext {
    readonly $static$: RenderStaticContext;
    $cmpCtx$: QContext | null;
    $slotCtx$: QContext | null;
}

/**
 * @public
 */
export declare const RenderOnce: FunctionComponent<{
    children?: any;
    key?: string | number | null | undefined;
}>;

/**
 * @public
 */
declare interface RenderOperation {
    $operation$: (...args: any[]) => void;
    $args$: any[];
}

/**
 * @public
 */
export declare interface RenderOptions {
    serverData?: Record<string, any>;
}

/**
 * @public
 */
export declare interface RenderResult {
    cleanup(): void;
}

/**
 * @internal
 */
export declare const _renderSSR: (node: JSXNode, opts: RenderSSROptions) => Promise<void>;

/**
 * @public
 */
export declare interface RenderSSROptions {
    containerTagName: string;
    containerAttributes: Record<string, string>;
    stream: StreamWriter;
    base?: string;
    serverData?: Record<string, any>;
    beforeContent?: JSXNode<string>[];
    beforeClose?: (contexts: QContext[], containerState: ContainerState, containsDynamic: boolean, textNodes: Map<string, string>) => Promise<JSXNode>;
    manifestHash: string;
}

declare interface RenderStaticContext {
    readonly $locale$: string;
    readonly $doc$: Document;
    readonly $roots$: QContext[];
    readonly $hostElements$: Set<QwikElement>;
    readonly $visited$: (Node | QwikElement)[];
    readonly $operations$: RenderOperation[];
    readonly $postOperations$: RenderOperation[];
    readonly $containerState$: ContainerState;
    readonly $addSlots$: [QwikElement, QwikElement][];
    readonly $rmSlots$: QwikElement[];
}

/**
 * This method works like an async memoized function that runs whenever some tracked value
 * changes and returns some data.
 *
 * `useResource` however returns immediate a `ResourceReturn` object that contains the data and a
 * state that indicates if the data is available or not.
 *
 * The status can be one of the following:
 *
 * - 'pending' - the data is not yet available.
 * - 'resolved' - the data is available.
 * - 'rejected' - the data is not available due to an error or timeout.
 *
 * ### Example
 *
 * Example showing how `useResource` to perform a fetch to request the weather, whenever the
 * input city name changes.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     city: '',
 *   });
 *
 *   const weatherResource = useResource$<any>(async ({ track, cleanup }) => {
 *     const cityName = track(() => store.city);
 *     const abortController = new AbortController();
 *     cleanup(() => abortController.abort('cleanup'));
 *     const res = await fetch(`http://weatherdata.com?city=${cityName}`, {
 *       signal: abortController.signal,
 *     });
 *     const data = res.json();
 *     return data;
 *   });
 *
 *   return (
 *     <div>
 *       <input name="city" onInput$={(ev: any) => (store.city = ev.target.value)} />
 *       <Resource
 *         value={weatherResource}
 *         onResolved={(weather) => {
 *           return <div>Temperature: {weather.temp}</div>;
 *         }}
 *       />
 *     </div>
 *   );
 * });
 * ```
 *
 * @see Resource
 * @see ResourceReturn
 *
 * @public
 */
export declare const Resource: <T>(props: ResourceProps<T>) => JSXNode;

/**
 * @public
 */
export declare interface ResourceCtx<T> {
    readonly track: Tracker;
    cleanup(callback: () => void): void;
    cache(policyOrMilliseconds: number | 'immutable'): void;
    readonly previous: T | undefined;
}

declare interface ResourceDescriptor<T> extends DescriptorBase<ResourceFn<T>, ResourceReturnInternal<T>> {
}

/**
 * @public
 */
export declare type ResourceFn<T> = (ctx: ResourceCtx<any>) => ValueOrPromise<T>;

/**
 * Options to pass to `useResource$()`
 *
 * @see useResource
 * @public
 */
export declare interface ResourceOptions {
    /**
     * Timeout in milliseconds. If the resource takes more than the specified millisecond, it will timeout.
     * Resulting on a rejected resource.
     */
    timeout?: number;
}

/**
 * @public
 */
export declare interface ResourcePending<T> {
    readonly value: Promise<T>;
    readonly loading: boolean;
}

/**
 * @public
 */
export declare interface ResourceProps<T> {
    readonly value: ResourceReturn<T> | Signal<Promise<T> | T> | Promise<T>;
    onResolved: (value: T) => JSXNode;
    onPending?: () => JSXNode;
    onRejected?: (reason: any) => JSXNode;
}

/**
 * @public
 */
export declare interface ResourceRejected<T> {
    readonly value: Promise<T>;
    readonly loading: boolean;
}

/**
 * @public
 */
export declare interface ResourceResolved<T> {
    readonly value: Promise<T>;
    readonly loading: boolean;
}

/**
 * @public
 */
export declare type ResourceReturn<T> = ResourcePending<T> | ResourceResolved<T> | ResourceRejected<T>;

declare interface ResourceReturnInternal<T> {
    __brand: 'resource';
    _state: 'pending' | 'resolved' | 'rejected';
    _resolved: T | undefined;
    _error: any;
    _cache: number;
    _timeout: number;
    value: Promise<T>;
    loading: boolean;
}

/**
 * @internal
 */
export declare const _restProps: (props: Record<string, any>, omit: string[]) => Record<string, any>;

declare interface ScriptHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    async?: boolean | undefined;
    /** @deprecated Deprecated */
    charSet?: string | undefined;
    crossOrigin?: HTMLCrossOriginAttribute;
    defer?: boolean | undefined;
    integrity?: string | undefined;
    noModule?: boolean | undefined;
    nonce?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    src?: string | undefined;
    type?: string | undefined;
}

declare interface SelectHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    autoComplete?: HTMLInputAutocompleteAttribute | Omit<HTMLInputAutocompleteAttribute, string> | undefined;
    autoFocus?: boolean | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    multiple?: boolean | undefined;
    name?: string | undefined;
    required?: boolean | undefined;
    size?: number | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
    'bind:value'?: Signal<string | undefined>;
}

/**
 * @internal
 */
export declare const _serializeData: (data: any, pureQRL?: boolean) => Promise<string>;

/**
 * Sets the `CorePlatform`.
 *
 * This is useful to override the platform in tests to change the behavior of,
 * `requestAnimationFrame`, and import resolution.
 *
 * @param doc - The document of the application for which the platform is needed.
 * @param platform - The platform to use.
 * @public
 */
export declare const setPlatform: (plt: CorePlatform) => CorePlatform;

/**
 * @public
 */
export declare interface Signal<T = any> {
    value: T;
}

declare class SignalBase {
}

declare class SignalDerived<T = any, ARGS extends any[] = any[]> extends SignalBase {
    $func$: (...args: ARGS) => T;
    $args$: ARGS;
    $funcStr$?: string | undefined;
    constructor($func$: (...args: ARGS) => T, $args$: ARGS, $funcStr$?: string | undefined);
    get value(): T;
}

declare interface SignalInternal<T> extends Signal<T> {
    untrackedValue: T;
    [QObjectManagerSymbol]: LocalSubscriptionManager;
    [QObjectSignalFlags]: number;
}

declare type SingleOrArray<T> = T | (SingleOrArray<T> | undefined | null)[];

declare type Size = number | string;

/**
 * @public
 */
export declare const SkipRender: JSXNode;

/**
 * Allows to project the children of the current component. <Slot/> can only be used within the context of a component defined with `component$`.
 *
 * @public
 */
export declare const Slot: FunctionComponent<{
    name?: string;
}>;

declare interface SlotHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    name?: string | undefined;
}

/**
 * @public
 */
export declare interface SnapshotListener {
    key: string;
    qrl: QRL<any>;
    el: Element;
}

/**
 * @public
 */
export declare type SnapshotMeta = Record<string, SnapshotMetaValue>;

/**
 * @public
 */
export declare interface SnapshotMetaValue {
    w?: string;
    s?: string;
    h?: string;
    c?: string;
}

/**
 * @public
 */
export declare interface SnapshotResult {
    state: SnapshotState;
    funcs: string[];
    qrls: QRL[];
    objs: any[];
    resources: ResourceReturnInternal<any>[];
    mode: 'render' | 'listeners' | 'static';
}

/**
 * @public
 */
export declare interface SnapshotState {
    ctx: SnapshotMeta;
    refs: Record<string, string>;
    objs: any[];
    subs: any[];
}

declare interface SourceHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    height?: Size | undefined;
    media?: string | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcSet?: string | undefined;
    type?: string | undefined;
    width?: Size | undefined;
    children?: undefined;
}

/**
 * @public
 */
export declare const SSRComment: FunctionComponent<{
    data: string;
}>;

/**
 * @public
 * @deprecated - It has no effect
 */
export declare const SSRHint: FunctionComponent<SSRHintProps>;

/**
 * @public
 */
export declare interface SSRHintProps {
    dynamic?: boolean;
}

/**
 * @public
 */
export declare const SSRRaw: FunctionComponent<{
    data: string;
}>;

/**
 * @public
 */
export declare const SSRStream: FunctionComponent<SSRStreamProps>;

/**
 * @public
 */
export declare const SSRStreamBlock: FunctionComponent<{
    children?: any;
}>;

/**
 * @public
 */
export declare interface SSRStreamProps {
    children: AsyncGenerator<JSXChildren, void, any> | ((stream: StreamWriter) => Promise<void>) | (() => AsyncGenerator<JSXChildren, void, any>);
}

/**
 * @public
 */
export declare type StreamWriter = {
    write: (chunk: string) => void;
};

declare interface StyleAppend {
    styleId: string;
    content: string | null;
}

declare interface StyleHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    media?: string | undefined;
    nonce?: string | undefined;
    scoped?: boolean | undefined;
    type?: string | undefined;
    children?: string;
}

declare type Subscriber = SubscriberA | SubscriberB | SubscriberC;

declare type SubscriberA = readonly [type: 0, host: SubscriberEffect | SubscriberHost];

declare type SubscriberB = readonly [
type: 1 | 2,
host: SubscriberHost,
signal: Signal,
elm: QwikElement,
prop: string
];

declare type SubscriberC = readonly [
type: 3 | 4,
host: SubscriberHost | Text,
signal: Signal,
elm: Node | string | QwikElement
];

declare type SubscriberEffect = TaskDescriptor | ResourceDescriptor<any> | ComputedDescriptor<any>;

declare type SubscriberHost = QwikElement;

declare type SubscriberSignal = B | C;

declare interface SubscriptionManager {
    $groupToManagers$: GroupToManagersMap;
    $createManager$(map?: Subscriptions[]): LocalSubscriptionManager;
    $clearSub$: (sub: SubscriberEffect | SubscriberHost | Node) => void;
    $clearSignal$: (sub: SubscriberSignal) => void;
}

declare type Subscriptions = A | SubscriberSignal;

declare interface SyntheticEvent<T = Element, E = Event> extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {
}

declare interface TableHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    cellPadding?: number | string | undefined;
    cellSpacing?: number | string | undefined;
    summary?: string | undefined;
    width?: Size | undefined;
}

/**
 * @public
 */
export declare interface TaskCtx {
    track: Tracker;
    cleanup(callback: () => void): void;
}

declare type TaskDescriptor = DescriptorBase<TaskFn>;

/**
 * @public
 */
export declare type TaskFn = (ctx: TaskCtx) => ValueOrPromise<void | (() => void)>;

declare interface TdHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined;
    colSpan?: number | undefined;
    headers?: string | undefined;
    rowSpan?: number | undefined;
    scope?: string | undefined;
    abbr?: string | undefined;
    height?: Size | undefined;
    width?: Size | undefined;
    valign?: 'top' | 'middle' | 'bottom' | 'baseline' | undefined;
}

declare interface TextareaHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    autoComplete?: HTMLInputAutocompleteAttribute | Omit<HTMLInputAutocompleteAttribute, string> | undefined;
    autoFocus?: boolean | undefined;
    cols?: number | undefined;
    dirName?: string | undefined;
    disabled?: boolean | undefined;
    enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
    form?: string | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    name?: string | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    rows?: number | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
    'bind:value'?: Signal<string | undefined>;
    wrap?: string | undefined;
    /** @deprecated - Use the `value` property instead */
    children?: undefined;
}

declare interface ThHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined;
    colSpan?: number | undefined;
    headers?: string | undefined;
    rowSpan?: number | undefined;
    scope?: string | undefined;
    abbr?: string | undefined;
}

declare interface TimeHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    dateTime?: string | undefined;
}

declare interface TitleHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    children?: string;
}

/**
 * Used to signal to Qwik which state should be watched for changes.
 *
 * The `Tracker` is passed into the `taskFn` of `useTask`. It is intended to be used to wrap
 * state objects in a read proxy which signals to Qwik which properties should be watched for
 * changes. A change to any of the properties causes the `taskFn` to rerun.
 *
 * ### Example
 *
 * The `obs` passed into the `taskFn` is used to mark `state.count` as a property of interest.
 * Any changes to the `state.count` property will cause the `taskFn` to rerun.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({ count: 0, doubleCount: 0 });
 *   useTask$(({ track }) => {
 *     const count = track(() => store.count);
 *     store.doubleCount = 2 * count;
 *   });
 *   return (
 *     <div>
 *       <span>
 *         {store.count} / {store.doubleCount}
 *       </span>
 *       <button onClick$={() => store.count++}>+</button>
 *     </div>
 *   );
 * });
 * ```
 *
 * @see `useTask`
 *
 * @public
 */
export declare interface Tracker {
    /**
     * Include the expression using stores / signals to track:
     *
     * ```tsx
     * track(() => store.value)
     * ```
     *
     * The `track()` function also returns the value of the scoped expression:
     *
     * ```tsx
     * const count = track(() => store.count);
     * ```
     */
    <T>(ctx: () => T): T;
    /**
     * Used to track the whole object. If any property of the passed store changes,
     * the task will be scheduled to run.
     */
    <T extends {}>(obj: T): T;
}

declare interface TrackHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    default?: boolean | undefined;
    kind?: string | undefined;
    label?: string | undefined;
    src?: string | undefined;
    srcLang?: string | undefined;
    children?: undefined;
}

/**
 * @public
 */
declare type TransformProp<T> = NonNullable<T> extends (...args: infer ARGS) => infer RET ? (...args: ARGS) => ValueOrPromise<Awaited<RET>> : T;

/**
 * Transform the component PROPS.
 * @public
 */
declare type TransformProps<PROPS extends {}> = {
    [K in keyof PROPS]: TransformProp<PROPS[K]>;
};

/**
 * @public
 */
export declare const untrack: <T>(fn: () => T) => T;

/**
 * @public
 */
export declare const useComputed$: Computed;

/**
 * @public
 */
export declare const useComputedQrl: ComputedQRL;

declare interface UseContext {
    <STATE extends object, T>(context: ContextId<STATE>, transformer: (value: STATE) => T): T;
    <STATE extends object, T>(context: ContextId<STATE>, defaultValue: T): STATE | T;
    <STATE extends object>(context: ContextId<STATE>): STATE;
}

/**
 * Retrieve Context value.
 *
 * Use `useContext()` to retrieve the value of context in a component. To retrieve a value a
 * parent component needs to invoke `useContextProvider()` to assign a value.
 *
 * ### Example
 *
 * ```tsx
 * // Declare the Context type.
 * interface TodosStore {
 *   items: string[];
 * }
 * // Create a Context ID (no data is saved here.)
 * // You will use this ID to both create and retrieve the Context.
 * export const TodosContext = createContextId<TodosStore>('Todos');
 *
 * // Example of providing context to child components.
 * export const App = component$(() => {
 *   useContextProvider(
 *     TodosContext,
 *     useStore<TodosStore>({
 *       items: ['Learn Qwik', 'Build Qwik app', 'Profit'],
 *     })
 *   );
 *
 *   return <Items />;
 * });
 *
 * // Example of retrieving the context provided by a parent component.
 * export const Items = component$(() => {
 *   const todos = useContext(TodosContext);
 *   return (
 *     <ul>
 *       {todos.items.map((item) => (
 *         <li>{item}</li>
 *       ))}
 *     </ul>
 *   );
 * });
 *
 * ```
 * @param context - The context to retrieve a value from.
 * @public
 */
export declare const useContext: UseContext;

/**
 * Assign a value to a Context.
 *
 * Use `useContextProvider()` to assign a value to a context. The assignment happens in the
 * component's function. Once assigned, use `useContext()` in any child component to retrieve the
 * value.
 *
 * Context is a way to pass stores to the child components without prop-drilling.
 *
 * ### Example
 *
 * ```tsx
 * // Declare the Context type.
 * interface TodosStore {
 *   items: string[];
 * }
 * // Create a Context ID (no data is saved here.)
 * // You will use this ID to both create and retrieve the Context.
 * export const TodosContext = createContextId<TodosStore>('Todos');
 *
 * // Example of providing context to child components.
 * export const App = component$(() => {
 *   useContextProvider(
 *     TodosContext,
 *     useStore<TodosStore>({
 *       items: ['Learn Qwik', 'Build Qwik app', 'Profit'],
 *     })
 *   );
 *
 *   return <Items />;
 * });
 *
 * // Example of retrieving the context provided by a parent component.
 * export const Items = component$(() => {
 *   const todos = useContext(TodosContext);
 *   return (
 *     <ul>
 *       {todos.items.map((item) => (
 *         <li>{item}</li>
 *       ))}
 *     </ul>
 *   );
 * });
 *
 * ```
 * @param context - The context to assign a value to.
 * @param value - The value to assign to the context.
 * @public
 */
export declare const useContextProvider: <STATE extends object>(context: ContextId<STATE>, newValue: STATE) => void;

/**
 * @public
 */
export declare const useErrorBoundary: () => Readonly<ErrorBoundaryStore>;

/**
 * @public
 */
export declare const useId: () => string;

/**
 * Used by the Qwik Optimizer to restore the lexically scoped variables.
 *
 * This method should not be present in the application source code.
 *
 * NOTE: `useLexicalScope` method can only be used in the synchronous portion of the callback
 * (before any `await` statements.)
 *
 * @internal
 */
export declare const useLexicalScope: <VARS extends any[]>() => VARS;

/**
 * Register a listener on the current component's host element.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX. Otherwise, it's adding a JSX listener in the `<div>` is a better idea.
 *
 * @see `useOn`, `useOnWindow`, `useOnDocument`.
 *
 * @public
 */
export declare const useOn: (event: PascalCaseEventLiteralType | PascalCaseEventLiteralType[], eventQrl: QRL<(ev: Event) => void> | undefined) => void;

/**
 * Register a listener on `document`.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX.
 *
 * @see `useOn`, `useOnWindow`, `useOnDocument`.
 *
 * ```tsx
 * function useScroll() {
 *   useOnDocument(
 *     'scroll',
 *     $((event) => {
 *       console.log('body scrolled', event);
 *     })
 *   );
 * }
 *
 * const Cmp = component$(() => {
 *   useScroll();
 *   return <div>Profit!</div>;
 * });
 * ```
 *
 * @public
 */
export declare const useOnDocument: (event: PascalCaseEventLiteralType | PascalCaseEventLiteralType[], eventQrl: QRL<(ev: Event) => void> | undefined) => void;

/**
 * Register a listener on `window`.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX.
 *
 * @see `useOn`, `useOnWindow`, `useOnDocument`.
 *
 * ```tsx
 * function useAnalytics() {
 *   useOnWindow(
 *     'popstate',
 *     $((event) => {
 *       console.log('navigation happened', event);
 *       // report to analytics
 *     })
 *   );
 * }
 *
 * const Cmp = component$(() => {
 *   useAnalytics();
 *   return <div>Profit!</div>;
 * });
 * ```
 *
 * @public
 */
export declare const useOnWindow: (event: PascalCaseEventLiteralType | PascalCaseEventLiteralType[], eventQrl: QRL<(ev: Event) => void> | undefined) => void;

/**
 * This method works like an async memoized function that runs whenever some tracked value
 * changes and returns some data.
 *
 * `useResource` however returns immediate a `ResourceReturn` object that contains the data and a
 * state that indicates if the data is available or not.
 *
 * The status can be one of the following:
 *
 * - 'pending' - the data is not yet available.
 * - 'resolved' - the data is available.
 * - 'rejected' - the data is not available due to an error or timeout.
 *
 * ### Example
 *
 * Example showing how `useResource` to perform a fetch to request the weather, whenever the
 * input city name changes.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     city: '',
 *   });
 *
 *   const weatherResource = useResource$<any>(async ({ track, cleanup }) => {
 *     const cityName = track(() => store.city);
 *     const abortController = new AbortController();
 *     cleanup(() => abortController.abort('cleanup'));
 *     const res = await fetch(`http://weatherdata.com?city=${cityName}`, {
 *       signal: abortController.signal,
 *     });
 *     const data = res.json();
 *     return data;
 *   });
 *
 *   return (
 *     <div>
 *       <input name="city" onInput$={(ev: any) => (store.city = ev.target.value)} />
 *       <Resource
 *         value={weatherResource}
 *         onResolved={(weather) => {
 *           return <div>Temperature: {weather.temp}</div>;
 *         }}
 *       />
 *     </div>
 *   );
 * });
 * ```
 *
 * @see Resource
 * @see ResourceReturn
 *
 * @public
 */
export declare const useResource$: <T>(generatorFn: ResourceFn<T>, opts?: ResourceOptions) => ResourceReturn<T>;

/**
 * This method works like an async memoized function that runs whenever some tracked value
 * changes and returns some data.
 *
 * `useResource` however returns immediate a `ResourceReturn` object that contains the data and a
 * state that indicates if the data is available or not.
 *
 * The status can be one of the following:
 *
 * - 'pending' - the data is not yet available.
 * - 'resolved' - the data is available.
 * - 'rejected' - the data is not available due to an error or timeout.
 *
 * ### Example
 *
 * Example showing how `useResource` to perform a fetch to request the weather, whenever the
 * input city name changes.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     city: '',
 *   });
 *
 *   const weatherResource = useResource$<any>(async ({ track, cleanup }) => {
 *     const cityName = track(() => store.city);
 *     const abortController = new AbortController();
 *     cleanup(() => abortController.abort('cleanup'));
 *     const res = await fetch(`http://weatherdata.com?city=${cityName}`, {
 *       signal: abortController.signal,
 *     });
 *     const data = res.json();
 *     return data;
 *   });
 *
 *   return (
 *     <div>
 *       <input name="city" onInput$={(ev: any) => (store.city = ev.target.value)} />
 *       <Resource
 *         value={weatherResource}
 *         onResolved={(weather) => {
 *           return <div>Temperature: {weather.temp}</div>;
 *         }}
 *       />
 *     </div>
 *   );
 * });
 * ```
 *
 * @see Resource
 * @see ResourceReturn
 *
 * @public
 */
export declare const useResourceQrl: <T>(qrl: QRL<ResourceFn<T>>, opts?: ResourceOptions) => ResourceReturn<T>;

/**
 * @public
 */
export declare function useServerData<T>(key: string): T | undefined;

/**
 * @public
 */
export declare function useServerData<T, B = T>(key: string, defaultValue: B): T | B;

/**
 * @public
 */
export declare interface UseSignal {
    <T>(): Signal<T | undefined>;
    <T>(value: T | (() => T)): Signal<T>;
}

/**
 * @public
 */
export declare const useSignal: UseSignal;

/**
 * Creates an object that Qwik can track across serializations.
 *
 * Use `useStore` to create a state for your application. The returned object is a proxy that has
 * a unique ID. The ID of the object is used in the `QRL`s to refer to the store.
 *
 * ### Example
 *
 * Example showing how `useStore` is used in Counter example to keep track of the count.
 *
 * ```tsx
 * const Stores = component$(() => {
 *   const counter = useCounter(1);
 *
 *   // Reactivity happens even for nested objects and arrays
 *   const userData = useStore({
 *     name: 'Manu',
 *     address: {
 *       address: '',
 *       city: '',
 *     },
 *     orgs: [],
 *   });
 *
 *   // useStore() can also accept a function to calculate the initial value
 *   const state = useStore(() => {
 *     return {
 *       value: expensiveInitialValue(),
 *     };
 *   });
 *
 *   return (
 *     <div>
 *       <div>Counter: {counter.value}</div>
 *       <Child userData={userData} state={state} />
 *     </div>
 *   );
 * });
 *
 * function useCounter(step: number) {
 *   // Multiple stores can be created in custom hooks for convenience and composability
 *   const counterStore = useStore({
 *     value: 0,
 *   });
 *   useVisibleTask$(() => {
 *     // Only runs in the client
 *     const timer = setInterval(() => {
 *       counterStore.value += step;
 *     }, 500);
 *     return () => {
 *       clearInterval(timer);
 *     };
 *   });
 *   return counterStore;
 * }
 * ```
 *
 * @public
 */
export declare const useStore: <STATE extends object>(initialState: STATE | (() => STATE), opts?: UseStoreOptions) => STATE;

/**
 * @public
 */
export declare interface UseStoreOptions {
    /**
     * If `true` then all nested objects and arrays will be tracked as well.
     * Default is `false`.
     */
    deep?: boolean;
    /**
     * If `false` then the object will not be tracked for changes.
     * Default is `true`.
     */
    reactive?: boolean;
}

/**
 * A lazy-loadable reference to a component's styles.
 *
 * Component styles allow Qwik to lazy load the style information for the component only when
 * needed. (And avoid double loading it in case of SSR hydration.)
 *
 * ```tsx
 * import styles from './code-block.css?inline';
 *
 * export const CmpStyles = component$(() => {
 *   useStyles$(styles);
 *
 *   return <div>Some text</div>;
 * });
 * ```
 *
 * @see `useStylesScoped`
 *
 * @public
 */
export declare const useStyles$: (first: string) => void;

/**
 * A lazy-loadable reference to a component's styles.
 *
 * Component styles allow Qwik to lazy load the style information for the component only when
 * needed. (And avoid double loading it in case of SSR hydration.)
 *
 * ```tsx
 * import styles from './code-block.css?inline';
 *
 * export const CmpStyles = component$(() => {
 *   useStyles$(styles);
 *
 *   return <div>Some text</div>;
 * });
 * ```
 *
 * @see `useStylesScoped`
 *
 * @public
 */
export declare const useStylesQrl: (styles: QRL<string>) => void;

/**
 * A lazy-loadable reference to a component's styles, that is scoped to the component.
 *
 * Component styles allow Qwik to lazy load the style information for the component only when
 * needed. (And avoid double loading it in case of SSR hydration.)
 *
 * ```tsx
 * import scoped from './code-block.css?inline';
 *
 * export const CmpScopedStyles = component$(() => {
 *   useStylesScoped$(scoped);
 *
 *   return <div>Some text</div>;
 * });
 * ```
 *
 * @see `useStyles`
 *
 * @public
 */
export declare const useStylesScoped$: (first: string) => UseStylesScoped;

/**
 * @public
 */
export declare interface UseStylesScoped {
    scopeId: string;
}

/**
 * A lazy-loadable reference to a component's styles, that is scoped to the component.
 *
 * Component styles allow Qwik to lazy load the style information for the component only when
 * needed. (And avoid double loading it in case of SSR hydration.)
 *
 * ```tsx
 * import scoped from './code-block.css?inline';
 *
 * export const CmpScopedStyles = component$(() => {
 *   useStylesScoped$(scoped);
 *
 *   return <div>Some text</div>;
 * });
 * ```
 *
 * @see `useStyles`
 *
 * @public
 */
export declare const useStylesScopedQrl: (styles: QRL<string>) => UseStylesScoped;

/**
 * Reruns the `taskFn` when the observed inputs change.
 *
 * Use `useTask` to observe changes on a set of inputs, and then re-execute the `taskFn` when
 * those inputs change.
 *
 * The `taskFn` only executes if the observed inputs change. To observe the inputs, use the `obs`
 * function to wrap property reads. This creates subscriptions that will trigger the `taskFn` to
 * rerun.
 *
 * @see `Tracker`
 *
 * @public
 *
 * ### Example
 *
 * The `useTask` function is used to observe the `state.count` property. Any changes to the
 * `state.count` cause the `taskFn` to execute which in turn updates the `state.doubleCount` to
 * the double of `state.count`.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     count: 0,
 *     doubleCount: 0,
 *     debounced: 0,
 *   });
 *
 *   // Double count task
 *   useTask$(({ track }) => {
 *     const count = track(() => store.count);
 *     store.doubleCount = 2 * count;
 *   });
 *
 *   // Debouncer task
 *   useTask$(({ track }) => {
 *     const doubleCount = track(() => store.doubleCount);
 *     const timer = setTimeout(() => {
 *       store.debounced = doubleCount;
 *     }, 2000);
 *     return () => {
 *       clearTimeout(timer);
 *     };
 *   });
 *   return (
 *     <div>
 *       <div>
 *         {store.count} / {store.doubleCount}
 *       </div>
 *       <div>{store.debounced}</div>
 *     </div>
 *   );
 * });
 * ```
 *
 * @param task - Function which should be re-executed when changes to the inputs are detected
 * @public
 */
export declare const useTask$: (first: TaskFn, opts?: UseTaskOptions | undefined) => void;

/**
 * @public
 */
export declare interface UseTaskOptions {
    /**
     * - `visible`: run the effect when the element is visible.
     * - `load`: eagerly run the effect when the application resumes.
     */
    eagerness?: EagernessOptions;
}

/**
 * Reruns the `taskFn` when the observed inputs change.
 *
 * Use `useTask` to observe changes on a set of inputs, and then re-execute the `taskFn` when
 * those inputs change.
 *
 * The `taskFn` only executes if the observed inputs change. To observe the inputs, use the `obs`
 * function to wrap property reads. This creates subscriptions that will trigger the `taskFn` to
 * rerun.
 *
 * @see `Tracker`
 *
 * @public
 *
 * ### Example
 *
 * The `useTask` function is used to observe the `state.count` property. Any changes to the
 * `state.count` cause the `taskFn` to execute which in turn updates the `state.doubleCount` to
 * the double of `state.count`.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({
 *     count: 0,
 *     doubleCount: 0,
 *     debounced: 0,
 *   });
 *
 *   // Double count task
 *   useTask$(({ track }) => {
 *     const count = track(() => store.count);
 *     store.doubleCount = 2 * count;
 *   });
 *
 *   // Debouncer task
 *   useTask$(({ track }) => {
 *     const doubleCount = track(() => store.doubleCount);
 *     const timer = setTimeout(() => {
 *       store.debounced = doubleCount;
 *     }, 2000);
 *     return () => {
 *       clearTimeout(timer);
 *     };
 *   });
 *   return (
 *     <div>
 *       <div>
 *         {store.count} / {store.doubleCount}
 *       </div>
 *       <div>{store.debounced}</div>
 *     </div>
 *   );
 * });
 * ```
 *
 * @param task - Function which should be re-executed when changes to the inputs are detected
 * @public
 */
export declare const useTaskQrl: (qrl: QRL<TaskFn>, opts?: UseTaskOptions) => void;

/**
 * ```tsx
 * const Timer = component$(() => {
 *   const store = useStore({
 *     count: 0,
 *   });
 *
 *   useVisibleTask$(() => {
 *     // Only runs in the client
 *     const timer = setInterval(() => {
 *       store.count++;
 *     }, 500);
 *     return () => {
 *       clearInterval(timer);
 *     };
 *   });
 *
 *   return <div>{store.count}</div>;
 * });
 * ```
 *
 * @public
 */
export declare const useVisibleTask$: (first: TaskFn, opts?: OnVisibleTaskOptions | undefined) => void;

/**
 * ```tsx
 * const Timer = component$(() => {
 *   const store = useStore({
 *     count: 0,
 *   });
 *
 *   useVisibleTask$(() => {
 *     // Only runs in the client
 *     const timer = setInterval(() => {
 *       store.count++;
 *     }, 500);
 *     return () => {
 *       clearInterval(timer);
 *     };
 *   });
 *
 *   return <div>{store.count}</div>;
 * });
 * ```
 *
 * @public
 */
export declare const useVisibleTaskQrl: (qrl: QRL<TaskFn>, opts?: OnVisibleTaskOptions) => void;

/**
 * Type representing a value which is either resolve or a promise.
 * @public
 */
export declare type ValueOrPromise<T> = T | Promise<T>;

/**
 * @internal
 */
export declare const _verifySerializable: <T>(value: T, preMessage?: string) => T;

/**
 * 1.2.4
 * @public
 */
export declare const version: string;

declare interface VideoHTMLAttributes<T extends Element> extends MediaHTMLAttributes<T> {
    height?: Numberish | undefined;
    playsInline?: boolean | undefined;
    poster?: string | undefined;
    width?: Numberish | undefined;
    disablePictureInPicture?: boolean | undefined;
    disableRemotePlayback?: boolean | undefined;
}

declare interface VirtualElement {
    readonly open: Comment;
    readonly close: Comment;
    readonly isSvg: boolean;
    readonly insertBefore: <T extends Node>(node: T, child: Node | null) => T;
    readonly appendChild: <T extends Node>(node: T) => T;
    readonly insertBeforeTo: (newParent: QwikElement, child: Node | null) => void;
    readonly appendTo: (newParent: QwikElement) => void;
    readonly ownerDocument: Document;
    readonly namespaceURI: string;
    readonly nodeType: 111;
    readonly childNodes: Node[];
    readonly firstChild: Node | null;
    readonly previousSibling: Node | null;
    readonly nextSibling: Node | null;
    readonly remove: () => void;
    readonly closest: (query: string) => Element | null;
    readonly hasAttribute: (prop: string) => boolean;
    readonly getAttribute: (prop: string) => string | null;
    readonly removeAttribute: (prop: string) => void;
    readonly querySelector: (query: string) => QwikElement | null;
    readonly querySelectorAll: (query: string) => QwikElement[];
    readonly compareDocumentPosition: (other: Node) => number;
    readonly matches: (query: string) => boolean;
    readonly setAttribute: (prop: string, value: string) => void;
    readonly removeChild: (node: Node) => void;
    readonly localName: string;
    readonly nodeName: string;
    readonly isConnected: boolean;
    readonly parentElement: Element | null;
    innerHTML: string;
}

/**
 * @public
 */
export declare type VisibleTaskStrategy = 'intersection-observer' | 'document-ready' | 'document-idle';

/**
 * @internal
 */
export declare const _waitUntilRendered: (elm: Element) => Promise<void>;

/**
 * @internal
 */
export declare const _weakSerialize: <T extends Record<string, any>>(input: T) => Partial<T>;

declare interface WebViewHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    allowFullScreen?: boolean | undefined;
    allowpopups?: boolean | undefined;
    autoFocus?: boolean | undefined;
    autosize?: boolean | undefined;
    blinkfeatures?: string | undefined;
    disableblinkfeatures?: string | undefined;
    disableguestresize?: boolean | undefined;
    disablewebsecurity?: boolean | undefined;
    guestinstance?: string | undefined;
    httpreferrer?: string | undefined;
    nodeintegration?: boolean | undefined;
    partition?: string | undefined;
    plugins?: boolean | undefined;
    preload?: string | undefined;
    src?: string | undefined;
    useragent?: string | undefined;
    webpreferences?: string | undefined;
}

/**
 * Override the `getLocale` with `lang` within the `fn` execution.
 *
 * @internal
 */
export declare function withLocale<T>(locale: string, fn: () => T): T;

/**
 * @internal
 */
export declare const _wrapProp: <T extends Record<any, any>, P extends keyof T>(obj: T, prop: P) => any;

/**
 * @internal
 */
export declare const _wrapSignal: <T extends Record<any, any>, P extends keyof T>(obj: T, prop: P) => any;

export { }
