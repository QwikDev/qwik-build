import * as CSS_2 from 'csstype';
import type { JSXNode as JSXNode_2 } from '.';
import type { StreamWriter as StreamWriter_2 } from '.';

/**
 * Qwik Optimizer marker function.
 *
 * Use `$(...)` to tell Qwik Optimizer to extract the expression in `$(...)` into a lazy-loadable
 * resource referenced by `QRL`.
 *
 * @param expression - Expression which should be lazy loaded
 * @public
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
 * import { useSignal } from './use/use-signal';
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
 */
export declare const $: <T>(expression: T) => QRL<T>;

declare type AllEventKeys = keyof AllEventsMap;

declare type AllEventMapRaw = HTMLElementEventMap & DocumentEventMap & WindowEventHandlersEventMap & {
    qidle: QwikIdleEvent;
    qinit: QwikInitEvent;
    qsymbol: QwikSymbolEvent;
    qvisible: QwikVisibleEvent;
};

declare type AllEventsMap = Omit<AllEventMapRaw, keyof EventCorrectionMap> & EventCorrectionMap;

/** @internal */
export declare type _AllowPlainQrl<Q> = QRLEventHandlerMulti<any, any> extends Q ? Q extends QRLEventHandlerMulti<infer EV, infer EL> ? Q | (EL extends Element ? EventHandler<EV, EL> : never) : Q : Q extends QRL<infer U> ? Q | U : NonNullable<Q> extends never ? Q : QRL<Q> | Q;

declare type AllPascalEventMaps = PascalMap<AllEventsMap>;

/** @public */
export declare interface AnchorHTMLAttributes<T extends Element> extends Attrs<'a', T> {
}

/** @public */
export declare interface AreaHTMLAttributes<T extends Element> extends Attrs<'area', T> {
}

/**
 * TS defines these with the React syntax which is not compatible with Qwik. E.g. `ariaAtomic`
 * instead of `aria-atomic`.
 *
 * @public
 */
export declare interface AriaAttributes {
    /**
     * Identifies the currently active element when DOM focus is on a composite widget, textbox,
     * group, or application.
     */
    'aria-activedescendant'?: string | undefined;
    /**
     * Indicates whether assistive technologies will present all, or only parts of, the changed region
     * based on the change notifications defined by the aria-relevant attribute.
     */
    'aria-atomic'?: Booleanish | undefined;
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of the user's
     * intended value for an input and specifies how predictions would be presented if they are made.
     */
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both' | undefined;
    /**
     * Indicates an element is being modified and that assistive technologies MAY want to wait until
     * the modifications are complete before exposing them to the user.
     */
    'aria-busy'?: Booleanish | undefined;
    /**
     * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
     *
     * @see aria-pressed @see aria-selected.
     */
    'aria-checked'?: boolean | 'false' | 'mixed' | 'true' | undefined;
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     *
     * @see aria-colindex.
     */
    'aria-colcount'?: number | undefined;
    /**
     * Defines an element's column index or position with respect to the total number of columns
     * within a table, grid, or treegrid.
     *
     * @see aria-colcount @see aria-colspan.
     */
    'aria-colindex'?: number | undefined;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     *
     * @see aria-colindex @see aria-rowspan.
     */
    'aria-colspan'?: number | undefined;
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current
     * element.
     *
     * @see aria-owns.
     */
    'aria-controls'?: string | undefined;
    /**
     * Indicates the element that represents the current item within a container or set of related
     * elements.
     */
    'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time' | undefined;
    /**
     * Identifies the element (or elements) that describes the object.
     *
     * @see aria-labelledby
     */
    'aria-describedby'?: string | undefined;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     *
     * @see aria-describedby.
     */
    'aria-details'?: string | undefined;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise
     * operable.
     *
     * @see aria-hidden @see aria-readonly.
     */
    'aria-disabled'?: Booleanish | undefined;
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     *
     * @deprecated In ARIA 1.1
     */
    'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup' | undefined;
    /**
     * Identifies the element that provides an error message for the object.
     *
     * @see aria-invalid @see aria-describedby.
     */
    'aria-errormessage'?: string | undefined;
    /**
     * Indicates whether the element, or another grouping element it controls, is currently expanded
     * or collapsed.
     */
    'aria-expanded'?: Booleanish | undefined;
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at
     * the user's discretion, allows assistive technology to override the general default of reading
     * in document source order.
     */
    'aria-flowto'?: string | undefined;
    /**
     * Indicates an element's "grabbed" state in a drag-and-drop operation.
     *
     * @deprecated In ARIA 1.1
     */
    'aria-grabbed'?: Booleanish | undefined;
    /**
     * Indicates the availability and type of interactive popup element, such as menu or dialog, that
     * can be triggered by an element.
     */
    'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | undefined;
    /**
     * Indicates whether the element is exposed to an accessibility API.
     *
     * @see aria-disabled.
     */
    'aria-hidden'?: Booleanish | undefined;
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     *
     * @see aria-errormessage.
     */
    'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined;
    /**
     * Indicates keyboard shortcuts that an author has implemented to activate or give focus to an
     * element.
     */
    'aria-keyshortcuts'?: string | undefined;
    /**
     * Defines a string value that labels the current element.
     *
     * @see aria-labelledby.
     */
    'aria-label'?: string | undefined;
    /**
     * Identifies the element (or elements) that labels the current element.
     *
     * @see aria-describedby.
     */
    'aria-labelledby'?: string | undefined;
    /** Defines the hierarchical level of an element within a structure. */
    'aria-level'?: number | undefined;
    /**
     * Indicates that an element will be updated, and describes the types of updates the user agents,
     * assistive technologies, and user can expect from the live region.
     */
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
     * Identifies an element (or elements) in order to define a visual, functional, or contextual
     * parent/child relationship between DOM elements where the DOM hierarchy cannot be used to
     * represent the relationship.
     *
     * @see aria-controls.
     */
    'aria-owns'?: string | undefined;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the
     * control has no value. A hint could be a sample value or a brief description of the expected
     * format.
     */
    'aria-placeholder'?: string | undefined;
    /**
     * Defines an element's number or position in the current set of listitems or treeitems. Not
     * required if all elements in the set are present in the DOM.
     *
     * @see aria-setsize.
     */
    'aria-posinset'?: number | undefined;
    /**
     * Indicates the current "pressed" state of toggle buttons.
     *
     * @see aria-checked @see aria-selected.
     */
    'aria-pressed'?: boolean | 'false' | 'mixed' | 'true' | undefined;
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     *
     * @see aria-disabled.
     */
    'aria-readonly'?: Booleanish | undefined;
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a
     * live region is modified.
     *
     * @see aria-atomic.
     */
    'aria-relevant'?: 'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals' | undefined;
    /** Indicates that user input is required on the element before a form may be submitted. */
    'aria-required'?: Booleanish | undefined;
    /** Defines a human-readable, author-localized description for the role of an element. */
    'aria-roledescription'?: string | undefined;
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     *
     * @see aria-rowindex.
     */
    'aria-rowcount'?: number | undefined;
    /**
     * Defines an element's row index or position with respect to the total number of rows within a
     * table, grid, or treegrid.
     *
     * @see aria-rowcount @see aria-rowspan.
     */
    'aria-rowindex'?: number | undefined;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     *
     * @see aria-rowindex @see aria-colspan.
     */
    'aria-rowspan'?: number | undefined;
    /**
     * Indicates the current "selected" state of various widgets.
     *
     * @see aria-checked @see aria-pressed.
     */
    'aria-selected'?: Booleanish | undefined;
    /**
     * Defines the number of items in the current set of listitems or treeitems. Not required if all
     * elements in the set are present in the DOM.
     *
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
     *
     * @see aria-valuetext.
     */
    'aria-valuenow'?: number | undefined;
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    'aria-valuetext'?: string | undefined;
}

/** @public */
export declare type AriaRole = 'alert' | 'alertdialog' | 'application' | 'article' | 'banner' | 'button' | 'cell' | 'checkbox' | 'columnheader' | 'combobox' | 'complementary' | 'contentinfo' | 'definition' | 'dialog' | 'directory' | 'document' | 'feed' | 'figure' | 'form' | 'grid' | 'gridcell' | 'group' | 'heading' | 'img' | 'link' | 'list' | 'listbox' | 'listitem' | 'log' | 'main' | 'marquee' | 'math' | 'menu' | 'menubar' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'navigation' | 'none' | 'note' | 'option' | 'presentation' | 'progressbar' | 'radio' | 'radiogroup' | 'region' | 'row' | 'rowgroup' | 'rowheader' | 'scrollbar' | 'search' | 'searchbox' | 'separator' | 'slider' | 'spinbutton' | 'status' | 'switch' | 'tab' | 'table' | 'tablist' | 'tabpanel' | 'term' | 'textbox' | 'timer' | 'toolbar' | 'tooltip' | 'tree' | 'treegrid' | 'treeitem' | (string & {});

declare type Attrs<Name extends keyof HTMLElementTagNameMap, EL extends Element = HTMLElementTagNameMap[Name], AttrEl = HTMLElementTagNameMap[Name]> = HTMLAttributes<EL> & Augmented<AttrEl, SpecialAttrs[Name]>;

/** @public */
export declare interface AudioHTMLAttributes<T extends Element> extends Attrs<'audio', T> {
}

/**
 * Replace given element's props with custom types and return all props specific to the element. Use
 * this for known props that are incorrect or missing.
 *
 * Uses Prettify so we see the special props for each element in editor hover
 */
declare type Augmented<E, A = {}> = Prettify<Filtered<E, A> & A>;

/** @public */
export declare interface BaseHTMLAttributes<T extends Element> extends Attrs<'base', T> {
}

declare type BivariantQrlFn<ARGS extends any[], RETURN> = {
    /**
     * Resolve the QRL of closure and invoke it.
     *
     * @param args - Closure arguments.
     * @returns A promise of the return value of the closure.
     */
    bivarianceHack(...args: ARGS): Promise<RETURN>;
}['bivarianceHack'];

/** @public */
export declare interface BlockquoteHTMLAttributes<T extends Element> extends Attrs<'blockquote', T> {
}

/** @public */
export declare type Booleanish = boolean | `${boolean}`;

/** @public */
export declare interface ButtonHTMLAttributes<T extends Element> extends Attrs<'button', T> {
}

/** @public */
export declare interface CanvasHTMLAttributes<T extends Element> extends Attrs<'canvas', T> {
}

declare const enum ChoreType {
    MACRO = 112,
    MICRO = 15,
    /** Ensure tha the QRL promise is resolved before processing next chores in the queue */
    QRL_RESOLVE = 1,
    RESOURCE = 2,
    TASK = 3,
    NODE_DIFF = 4,
    NODE_PROP = 5,
    COMPONENT_SSR = 6,
    COMPONENT = 7,
    WAIT_FOR_COMPONENTS = 16,
    JOURNAL_FLUSH = 48,
    VISIBLE = 64,
    CLEANUP_VISIBLE = 80,
    WAIT_FOR_ALL = 127
}

/**
 * A class list can be a string, a boolean, an array, or an object.
 *
 * If it's an array, each item is a class list and they are all added.
 *
 * If it's an object, then the keys are class name strings, and the values are booleans that
 * determine if the class name string should be added or not.
 *
 * @public
 */
export declare type ClassList = string | undefined | null | false | Record<string, boolean | string | number | null | undefined> | ClassList[];

/** @internal */
export declare interface ClientContainer extends Container2 {
    document: _QDocument;
    element: _ContainerElement;
    qContainer: string;
    qBase: string;
    $locale$: string;
    qManifestHash: string;
    rootVNode: _ElementVNode;
    $journal$: VNodeJournal;
    renderDone: Promise<void> | null;
    parseQRL<T = unknown>(qrl: string): QRL<T>;
    $setRawState$(id: number, vParent: _ElementVNode | _VirtualVNode): void;
}

/** @public */
export declare interface ColgroupHTMLAttributes<T extends Element> extends Attrs<'colgroup', T> {
}

/** @public */
export declare interface ColHTMLAttributes<T extends Element> extends Attrs<'col', T> {
}

/**
 * Declare a Qwik component that can be used to create UI.
 *
 * Use `component$` to declare a Qwik component. A Qwik component is a special kind of component
 * that allows the Qwik framework to lazy load and execute the component independently of other Qwik
 * components as well as lazy load the component's life-cycle hooks and event handlers.
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
export declare const component$: <PROPS = unknown>(onMount: OnRenderFn<PROPS>) => Component<PROPS>;

/**
 * Type representing the Qwik component.
 *
 * `Component` is the type returned by invoking `component$`.
 *
 * ```tsx
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
export declare type Component<PROPS = unknown> = FunctionComponent<PublicProps<PROPS>>;

/** @public */
export declare interface ComponentBaseProps {
    key?: string | number | null | undefined;
    'q:slot'?: string;
}

declare type ComponentChildren<PROPS> = PROPS extends {
    children: any;
} ? never : {
    children?: JSXChildren;
};

/**
 * Declare a Qwik component that can be used to create UI.
 *
 * Use `component$` to declare a Qwik component. A Qwik component is a special kind of component
 * that allows the Qwik framework to lazy load and execute the component independently of other Qwik
 * components as well as lazy load the component's life-cycle hooks and event handlers.
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
export declare const componentQrl: <PROPS extends Record<any, any>>(componentQrl: QRL<OnRenderFn<PROPS>>) => Component<PROPS>;

declare interface Computed {
    <T>(qrl: ComputedFn<T>): ReadonlySignal2<T>;
}

declare interface ComputedDescriptor<T> extends DescriptorBase<ComputedFn<T>, Signal<T>> {
}

declare const ComputedEvent = "qComputed";

/** @public */
export declare type ComputedFn<T> = () => T;

declare interface ComputedQRL {
    <T>(qrl: QRL<ComputedFn<T>>): ReadonlySignal2<T>;
}

/** @public */
export declare interface ComputedSignal2<T> extends ReadonlySignal2<T> {
    /**
     * Use this to force recalculation and running subscribers, for example when the calculated value
     * mutates but remains the same object. Useful for third-party libraries.
     */
    force(): void;
}

/** @internal */
export declare const _CONST_PROPS: unique symbol;

declare interface Container2 {
    readonly $version$: string;
    readonly $scheduler$: Scheduler;
    readonly $storeProxyMap$: ObjToProxyMap;
    readonly $locale$: string;
    readonly $getObjectById$: (id: number | string) => any;
    readonly $serverData$: Record<string, any>;
    $currentUniqueId$: number;
    processJsx(host: HostElement, jsx: JSXOutput): ValueOrPromise<void>;
    handleError(err: any, $host$: HostElement): void;
    getParentHost(host: HostElement): HostElement | null;
    setContext<T>(host: HostElement, context: ContextId<T>, value: T): void;
    resolveContext<T>(host: HostElement, contextId: ContextId<T>): T | undefined;
    setHostProp<T>(host: HostElement, name: string, value: T): void;
    getHostProp<T>(host: HostElement, name: string): T | null;
    $appendStyle$(content: string, styleId: string, host: HostElement, scoped: boolean): void;
    /**
     * When component is about to be executed, it may add/remove children. This can cause problems
     * with the projection because deleting content will prevent the projection references from
     * looking up vnodes. Therefore before we execute the component we need to ensure that all of its
     * references to vnode are resolved.
     *
     * @param renderHost - Host element to ensure projection is resolved.
     */
    ensureProjectionResolved(host: HostElement): void;
    serializationCtxFactory(NodeConstructor: SerializationContext['$NodeConstructor$'] | null, symbolToChunkResolver: SymbolToChunkResolver, writer?: StreamWriter_3): SerializationContext;
}

/** @internal */
export declare interface _ContainerElement extends HTMLElement {
    qContainer?: ClientContainer;
    /**
     * Map of element ID to Element. If VNodeData has a reference to an element, then it is added to
     * this map for later retrieval.
     *
     * Once retrieved the element is replaced with its VNode.
     *
     * NOTE: This map leaks memory! Once the application is resumed we don't know which element IDs
     * are still in the deserialized state. we will probably need a GC cycle. Some process running in
     * the idle time which processes few elements at a time to see if they are still referenced and
     * removes them from the map if they are not.
     */
    qVNodeRefs?: Map<number, Element | _ElementVNode>;
    /** String from `<script type="qwik/vnode">` tag. */
    qVnodeData?: string;
}

/** @public */
declare interface ContainerState extends StoreTracker {
    readonly $containerEl$: Element;
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
    readonly $inlineFns$: Map<string, number>;
}

/**
 * ContextId is a typesafe ID for your context.
 *
 * Context is a way to pass stores to the child components without prop-drilling.
 *
 * Use `createContextId()` to create a `ContextId`. A `ContextId` is just a serializable identifier
 * for the context. It is not the context value itself. See `useContextProvider()` and
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
 *
 * @public
 */
export declare interface ContextId<STATE> {
    /** Design-time property to store type information for the context. */
    readonly __brand_context_type__: STATE;
    /** A unique ID for the context. */
    readonly id: string;
}

/**
 * Low-level API for platform abstraction.
 *
 * Different platforms (browser, node, service workers) may have different ways of handling things
 * such as `requestAnimationFrame` and imports. To make Qwik platform-independent Qwik uses the
 * `CorePlatform` API to access the platform API.
 *
 * `CorePlatform` also is responsible for importing symbols. The import map is different on the
 * client (browser) then on the server. For this reason, the server has a manifest that is used to
 * map symbols to javascript chunks. The manifest is encapsulated in `CorePlatform`, for this
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
     * retrieve the reference using `importSymbol`.
     *
     * Why not use `import()`? Because `import()` is relative to the current file, and the current
     * file is always the Qwik framework. So QRLs have additional information that allows them to
     * serialize imports relative to application base rather than the Qwik framework file.
     *
     * @param element - The element against which the `url` is resolved. Used to locate the container
     *   root and `q:base` attribute.
     * @param url - Relative URL retrieved from the attribute that needs to be resolved against the
     *   container `q:base` attribute.
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
     * symbols (which are globally unique) in the manifest. (Manifest is the mapping of symbols to the
     * client chunk names.)
     *
     * @param symbolName - Resolve `symbolName` against the manifest and return the chunk that
     *   contains the symbol.
     */
    chunkForSymbol: (symbolName: string, chunk: string | null, parent?: string) => readonly [symbol: string, chunk: string] | undefined;
}

/** This corrects the TS definition for ToggleEvent @public */
export declare interface CorrectedToggleEvent extends Event {
    readonly newState: 'open' | 'closed';
    readonly prevState: 'open' | 'closed';
}

/** @public */
export declare const createComputed2$: <T>(qrl: () => T) => ComputedSignal2<T>;

/** @public */
export declare const createComputed2Qrl: <T>(qrl: QRL<() => T>) => ComputedSignal2<T>;

/**
 * Create a context ID to be used in your application. The name should be written with no spaces.
 *
 * Context is a way to pass stores to the child components without prop-drilling.
 *
 * Use `createContextId()` to create a `ContextId`. A `ContextId` is just a serializable identifier
 * for the context. It is not the context value itself. See `useContextProvider()` and
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
 *
 * @param name - The name of the context.
 * @public
 */
export declare const createContextId: <STATE = unknown>(name: string) => ContextId<STATE>;

declare const createScheduler: (container: Container2, scheduleDrain: () => void, journalFlush: () => void) => {
    (type: ChoreType.QRL_RESOLVE, ignore: null, target: QRLInternal<any>): ValueOrPromise<void>;
    (type: ChoreType.JOURNAL_FLUSH): ValueOrPromise<void>;
    (type: ChoreType.WAIT_FOR_ALL): ValueOrPromise<void>;
    (type: ChoreType.WAIT_FOR_COMPONENTS): ValueOrPromise<void>;
    (type: ChoreType.TASK | ChoreType.VISIBLE | ChoreType.RESOURCE, task: Task): ValueOrPromise<void>;
    (type: ChoreType.COMPONENT, host: HostElement, qrl: QRL<(...args: any[]) => any>, props: any): ValueOrPromise<JSXOutput>;
    (type: ChoreType.COMPONENT_SSR, host: HostElement, qrl: QRL<(...args: any[]) => any>, props: any): ValueOrPromise<JSXOutput>;
    (type: ChoreType.NODE_DIFF, host: HostElement, target: HostElement, value: JSXOutput): ValueOrPromise<void>;
    (type: ChoreType.NODE_PROP, host: HostElement, prop: string, value: any): ValueOrPromise<void>;
    (type: ChoreType.CLEANUP_VISIBLE, task: Task): ValueOrPromise<JSXOutput>;
};

/** @public */
export declare const createSignal2: {
    <T>(): Signal2<T | undefined>;
    <T>(value: T): Signal2<T>;
};

/** @public */
export declare interface CSSProperties extends CSS_2.Properties<string | number>, CSS_2.PropertiesHyphen<string | number> {
    /**
     * The index signature was removed to enable closed typing for style using CSSType. You're able to
     * use type assertion or module augmentation to add properties or an index signature of your own.
     *
     * For examples and more information, visit:
     * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
     */
    [v: `--${string}`]: string | number | undefined;
}

/** @public */
export declare interface DataHTMLAttributes<T extends Element> extends Attrs<'data', T> {
}

/** @public */
export declare interface DelHTMLAttributes<T extends Element> extends Attrs<'del', T> {
}

/** @public */
declare interface DescriptorBase<T = unknown, B = unknown> extends Subscriber_2 {
    $flags$: number;
    $index$: number;
    $el$: QwikElement;
    $qrl$: QRLInternal<T>;
    $state$: B | undefined;
    $destroy$: NoSerialize<() => void> | null;
}

/**
 * Deserialize data from string to an array of objects.
 *
 * @param rawStateData - Data to deserialize
 * @param element - Container element
 * @internal
 */
export declare function _deserialize(rawStateData: string | null, element?: unknown): unknown[];

/** @public */
export declare interface DetailsHTMLAttributes<T extends Element> extends Attrs<'details', T> {
}

/** @public */
export declare interface DevJSX {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
    stack?: string;
}

/** @public */
export declare interface DialogHTMLAttributes<T extends Element> extends Attrs<'dialog', T> {
}

/** The Qwik-specific attributes that DOM elements accept @public */
export declare interface DOMAttributes<EL extends Element> extends DOMAttributesBase<EL>, QwikEvents<EL> {
    class?: ClassList | Signal<ClassList> | undefined;
}

declare interface DOMAttributesBase<EL extends Element> extends QwikIntrinsicAttributes, PreventDefault, StopPropagation, RefAttr<EL> {
    dangerouslySetInnerHTML?: string | undefined;
}

/** @internal */
declare class DomContainer extends _SharedContainer implements ClientContainer {
    element: _ContainerElement;
    qContainer: string;
    qBase: string;
    qManifestHash: string;
    rootVNode: _ElementVNode;
    document: _QDocument;
    $journal$: VNodeJournal;
    renderDone: Promise<void> | null;
    $rawStateData$: unknown[];
    $storeProxyMap$: ObjToProxyMap;
    $qFuncs$: Array<(...args: unknown[]) => unknown>;
    $instanceHash$: string;
    private stateData;
    private $styleIds$;
    private $vnodeLocate$;
    private $renderCount$;
    constructor(element: _ContainerElement);
    $setRawState$(id: number, vParent: _ElementVNode | _VirtualVNode): void;
    parseQRL<T = unknown>(qrl: string): QRL<T>;
    processJsx(host: HostElement, jsx: JSXOutput): ValueOrPromise<void>;
    handleError(err: any, host: HostElement): void;
    setContext<T>(host: HostElement, context: ContextId<T>, value: T): void;
    resolveContext<T>(host: HostElement, contextId: ContextId<T>): T | undefined;
    getParentHost(host: HostElement): HostElement | null;
    setHostProp<T>(host: HostElement, name: string, value: T): void;
    getHostProp<T>(host: HostElement, name: string): T | null;
    scheduleRender(): Promise<void>;
    private processChores;
    ensureProjectionResolved(vNode: _VirtualVNode): void;
    $getObjectById$: (id: number | string) => unknown;
    getSyncFn(id: number): (...args: unknown[]) => unknown;
    $appendStyle$(content: string, styleId: string, host: _VirtualVNode, scoped: boolean): void;
}
export { DomContainer }
export { DomContainer as _DomContainer }

/** @public */
export declare type EagernessOptions = 'visible' | 'load' | 'idle';

/**
 * Effect is something which needs to happen (side-effect) due to signal value change.
 *
 * There are three types of effects:
 *
 * - `Task`: `useTask`, `useVisibleTask`, `useResource`
 * - `VNode` and `ISsrNode`: Either a component or `<Signal>`
 * - `Signal2`: A derived signal which contains a computation function.
 *
 * @internal
 */
export declare type Effect = Task | _VNode | ISsrNode | Signal2_2;

/**
 * An effect plus a list of subscriptions effect depends on.
 *
 * An effect can be trigger by one or more of signal inputs. The first step of re-running an effect
 * is to clear its subscriptions so that the effect can re add new set of subscriptions. In order to
 * clear the subscriptions we need to store them here.
 *
 * Imagine you have effect such as:
 *
 * ```
 * function effect1() {
 *   console.log(signalA.value ? signalB.value : 'default');
 * }
 * ```
 *
 * In the above case the `signalB` needs to be unsubscribed when `signalA` is falsy. We do this by
 * always clearing all of the subscriptions
 *
 * The `EffectSubscriptions` stores
 *
 * ```
 * subscription1 = [effect1, signalA, signalB];
 * ```
 *
 * The `signal1` and `signal2` back references are needed to "clear" existing subscriptions.
 *
 * Both `signalA` as well as `signalB` will have a reference to `subscription` to the so that the
 * effect can be scheduled if either `signalA` or `signalB` triggers. The `subscription1` is shared
 * between the signals.
 *
 * The second position `string|boolean` store the property name of the effect.
 *
 * - Property name of the VNode
 * - `EffectProperty.COMPONENT` if component
 * - `EffectProperty.VNODE` if VNode
 */
declare type EffectSubscriptions = [
Effect,
string,
// EffectSubscriptionsProp.PROPERTY
any | null,
...(string | Signal2_2 | TargetType)[]
];

/** @internal */
export declare type _ElementVNode = [
_VNodeFlags.Element,
////////////// 0 - Flags
_VNode | null,
/////////////// 1 - Parent
_VNode | null,
/////////////// 2 - Previous sibling
_VNode | null,
/////////////// 3 - Next sibling
_VNode | null | undefined,
/// 4 - First child - undefined if children need to be materialize
_VNode | null | undefined,
Element,
//////////////////// 6 - Element
string | undefined,
...(string | null)[]
] & {
    __brand__: 'ElementVNode';
};

/** @public */
export declare interface EmbedHTMLAttributes<T extends Element> extends Attrs<'embed', T> {
}

/** @internal */
export declare const _EMPTY_ARRAY: any[];

/** @public */
export declare interface ErrorBoundaryStore {
    error: any | undefined;
}

/** @public */
export declare const event$: <T>(qrl: T) => QRL<T>;

declare type EventCorrectionMap = {
    auxclick: PointerEvent;
    beforetoggle: CorrectedToggleEvent;
    click: PointerEvent;
    dblclick: PointerEvent;
    input: InputEvent;
    toggle: CorrectedToggleEvent;
};

declare type EventFromName<T extends string> = LcEvent<T>;

/**
 * A DOM event handler
 *
 * @public
 */
export declare type EventHandler<EV = Event, EL = Element> = {
    bivarianceHack(event: EV, element: EL): any;
}['bivarianceHack'];

declare type EventQRL<T extends string = AllEventKeys> = QRL<EventHandler<EventFromName<T>, Element>> | undefined;

/** @public */
export declare const eventQrl: <T>(qrl: QRL<T>) => QRL<T>;

/** @public */
export declare interface FieldsetHTMLAttributes<T extends Element> extends Attrs<'fieldset', T> {
}

declare type FilterBase<T> = {
    [K in keyof T as K extends string ? K extends Uppercase<K> ? never : any extends T[K] ? never : false extends IsAcceptableDOMValue<T[K]> ? never : IsReadOnlyKey<T, K> extends true ? never : K extends UnwantedKeys ? never : K : never]?: T[K];
};

/** Only keep props that are specific to the element and make partial */
declare type Filtered<T, A = {}> = {
    [K in keyof Omit<FilterBase<T>, keyof HTMLAttributes<any> | keyof A>]?: T[K];
};

/** @internal */
export declare const _fnSignal: <T extends (...args: any) => any>(fn: T, args: Parameters<T>, fnStr?: string) => WrappedSignal<any>;

/** @public */
export declare interface FormHTMLAttributes<T extends Element> extends Attrs<'form', T> {
}

/** @public */
export declare const Fragment: FunctionComponent<{
    children?: any;
    key?: string | number | null;
}>;

/**
 * Any function taking a props object that returns JSXOutput.
 *
 * The `key`, `flags` and `dev` parameters are for internal use.
 *
 * @public
 */
export declare type FunctionComponent<P = unknown> = {
    renderFn(props: P, key: string | null, flags: number, dev?: DevJSX): JSXOutput;
}['renderFn'];

/** @internal */
export declare const _getContextElement: () => unknown;

/** @internal */
export declare const _getContextEvent: () => unknown;

/** @public */
declare function getDomContainer(element: Element | _ElementVNode): ClientContainer;
export { getDomContainer as _getDomContainer }
export { getDomContainer }

/**
 * Retrieve the current locale.
 *
 * If no current locale and there is no `defaultLocale` the function throws an error.
 *
 * @returns The locale.
 * @internal
 */
export declare function getLocale(defaultLocale?: string): string;

declare type GetObject = (id: string) => any;

declare type GetObjID = (obj: any) => string | number | null;

/**
 * Retrieve the `CorePlatform`.
 *
 * The `CorePlatform` is also responsible for retrieving the Manifest, that contains mappings from
 * symbols to javascript import chunks. For this reason, `CorePlatform` can't be global, but is
 * specific to the application currently running. On server it is possible that many different
 * applications are running in a single server instance, and for this reason the `CorePlatform` is
 * associated with the application document.
 *
 * @param docOrNode - The document (or node) of the application for which the platform is needed.
 * @public
 */
export declare const getPlatform: () => CorePlatform;

/** @internal */
export declare function _getQContainerElement(element: Element | _ElementVNode): Element | null;

declare type Group = SubscriberEffect | SubscriberHost | Node;

declare type GroupToManagersMap = Map<Group, LocalSubscriptionManager[]>;

/**
 * The legacy transform, used in special cases like `<div {...props} key="key" />`. Note that the
 * children are spread arguments, instead of a prop like in jsx() calls.
 *
 * Also note that this disables optimizations.
 *
 * @public
 */
declare function h<TYPE extends string | FunctionComponent<PROPS>, PROPS extends {} = {}>(type: TYPE, props?: PROPS | null, ...children: any[]): JSXNode<TYPE>;
export { h as createElement }
export { h }

declare type HostElement = _VirtualVNode | ISsrNode;

/** Used with: Host (component) or Task */
declare type HostSubscriber = readonly [
type: SubscriptionType.HOST,
host: SubscriberEffect | SubscriberHost
];

declare type HostSubscriberWithKey = [...HostSubscriber, key: string | undefined];

/** @public */
export declare interface HrHTMLAttributes<T extends Element> extends Attrs<'hr', T> {
}

/** @public */
export declare type HTMLAttributeAnchorTarget = '_self' | '_blank' | '_parent' | '_top' | (string & {});

/** @public */
export declare type HTMLAttributeReferrerPolicy = ReferrerPolicy;

/** @public */
export declare interface HTMLAttributes<E extends Element> extends HTMLElementAttrs, DOMAttributes<E> {
}

declare interface HTMLAttributesBase extends AriaAttributes {
    /** @deprecated Use `class` instead */
    className?: ClassList | undefined;
    contentEditable?: 'true' | 'false' | 'inherit' | undefined;
    style?: CSSProperties | string | undefined;
    role?: AriaRole | undefined;
    about?: string | undefined;
    datatype?: string | undefined;
    inlist?: any;
    property?: string | undefined;
    resource?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;
    autoCapitalize?: 'none' | 'off' | 'sentences' | 'on' | 'words' | 'characters' | undefined;
    autoCorrect?: string | undefined;
    autoFocus?: boolean | undefined;
    autoSave?: string | undefined;
    hidden?: boolean | 'hidden' | 'until-found' | undefined;
    itemProp?: string | undefined;
    itemScope?: boolean | undefined;
    itemType?: string | undefined;
    itemID?: string | undefined;
    itemRef?: string | undefined;
    results?: number | undefined;
    translate?: 'yes' | 'no' | undefined;
    security?: string | undefined;
    unselectable?: 'on' | 'off' | undefined;
    /**
     * Hints at the type of data that might be entered by the user while editing the element or its
     * contents
     *
     * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
     */
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;
    /**
     * Specify that a standard HTML element should behave like a defined custom built-in element
     *
     * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
     */
    is?: string | undefined;
    popover?: 'manual' | 'auto' | undefined;
}

/** @public */
export declare type HTMLCrossOriginAttribute = 'anonymous' | 'use-credentials' | '' | undefined;

/** @public */
export declare interface HTMLElementAttrs extends HTMLAttributesBase, FilterBase<HTMLElement> {
}

/** @public */
export declare interface HtmlHTMLAttributes<T extends Element> extends Attrs<'html', T> {
}

/** @public */
export declare type HTMLInputAutocompleteAttribute = 'on' | 'off' | 'billing' | 'shipping' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' | 'honorific-suffix' | 'nickname' | 'username' | 'new-password' | 'current-password' | 'one-time-code' | 'organization-title' | 'organization' | 'street-address' | 'address-line1' | 'address-line2' | 'address-line3' | 'address-level4' | 'address-level3' | 'address-level2' | 'address-level1' | 'country' | 'country-name' | 'postal-code' | 'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name' | 'cc-number' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type' | 'transaction-currency' | 'transaction-amount' | 'language' | 'bday' | 'bday-day' | 'bday-month' | 'bday-year' | 'sex' | 'url' | 'photo';

/** @public */
export declare type HTMLInputTypeAttribute = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week' | (string & {});

/**
 * Low-level API used by the Optimizer to process `useTask$()` API. This method is not intended to
 * be used by developers.
 *
 * @internal
 */
export declare const _hW: () => void;

declare type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

/** @public */
export declare interface IframeHTMLAttributes<T extends Element> extends Attrs<'iframe', T> {
}

/** @public */
export declare interface ImgHTMLAttributes<T extends Element> extends Attrs<'img', T> {
}

/** @internal @deprecated v1 compat */
export declare const _IMMUTABLE: unique symbol;

/**
 * Create a `____$(...)` convenience method from `___(...)`.
 *
 * It is very common for functions to take a lazy-loadable resource as a first argument. For this
 * reason, the Qwik Optimizer automatically extracts the first argument from any function which ends
 * in `$`.
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
 * @param fn - A function that should have its first argument automatically `$`.
 * @public
 */
export declare const implicit$FirstArg: <FIRST, REST extends any[], RET>(fn: (qrl: QRL<FIRST>, ...rest: REST) => RET) => ((qrl: FIRST, ...rest: REST) => RET);

/** @internal */
export declare const inlinedQrl: <T>(symbol: T, symbolName: string, lexicalScopeCapture?: any[]) => QRL<T>;

/** @internal */
export declare const inlinedQrlDEV: <T = any>(symbol: T, symbolName: string, opts: QRLDev, lexicalScopeCapture?: any[]) => QRL<T>;

/** @public */
export declare type InputHTMLAttributes<T extends Element> = Attrs<'input', T, HTMLInputElement>;

/** @public */
export declare interface InsHTMLAttributes<T extends Element> extends Attrs<'ins', T> {
}

/** @public */
export declare interface IntrinsicElements extends IntrinsicHTMLElements, IntrinsicSVGElements {
}

/**
 * These are the HTML tags with handlers allowing plain callbacks, to be used for the JSX interface
 *
 * @internal
 */
export declare type IntrinsicHTMLElements = {
    [key in keyof HTMLElementTagNameMap]: Augmented<HTMLElementTagNameMap[key], SpecialAttrs[key]> & HTMLAttributes<HTMLElementTagNameMap[key]>;
} & {
    /** For unknown tags we allow all props */
    [unknownTag: string]: {
        [prop: string]: any;
    } & HTMLElementAttrs & HTMLAttributes<any>;
};

/**
 * These are the SVG tags with handlers allowing plain callbacks, to be used for the JSX interface
 *
 * @internal
 */
export declare type IntrinsicSVGElements = {
    [K in keyof Omit<SVGElementTagNameMap, keyof HTMLElementTagNameMap>]: LenientSVGProps<SVGElementTagNameMap[K]>;
};

/** The shared state during an invoke() call */
declare interface InvokeContext {
    $url$: URL | undefined;
    /** The next available index for the sequentialScope array */
    $i$: number;
    /** The Virtual parent component for the current component code */
    $hostElement$: QwikElement | undefined;
    /** The current DOM element */
    $element$: Element | undefined;
    /** The event we're currently handling */
    $event$: PossibleEvents | undefined;
    /** The QRL function we're currently executing */
    $qrl$: QRL | undefined;
    /** Promises that need awaiting before the current invocation is done */
    $waitOn$: Promise<unknown>[] | undefined;
    /** The current subscriber for registering signal reads */
    $subscriber$: Subscriber | null | undefined;
    $effectSubscriber$: EffectSubscriptions | undefined;
    $renderCtx$: RenderContext | undefined;
    $locale$: string | undefined;
    $container2$: Container2 | undefined;
}

declare type InvokeTuple = [Element, Event, URL?];

declare type IsAcceptableDOMValue<T> = T extends boolean | number | string | null | undefined ? ((...args: any[]) => any) extends T ? false : true : false;

declare type IsAny<T> = 0 extends T & 1 ? true : false;

/** @internal */
export declare const _isJSXNode: <T>(n: unknown) => n is JSXNode<T>;

declare type IsReadOnlyKey<T, K extends keyof T> = IfEquals<{
    [Q in K]: T[K];
}, {
    -readonly [Q in K]: T[K];
}, false, true>;

/** @public */
export declare const isSignal: (value: any) => value is Signal2<unknown>;

declare interface ISsrComponentFrame {
    componentNode: ISsrNode;
    scopedStyleIds: Set<string>;
    childrenScopedStyle: string | null;
    projectionDepth: number;
    releaseUnclaimedProjections(unclaimedProjections: (ISsrComponentFrame | JSXChildren | string)[]): void;
    consumeChildrenForSlot(projectionNode: ISsrNode, slotName: string): JSXChildren | null;
    distributeChildrenIntoSlots(children: JSXChildren, scopedStyle: string | null): void;
    hasSlot(slotName: string): boolean;
}

declare interface ISsrNode {
    id: string;
    currentComponentNode: ISsrNode | null;
    setProp(name: string, value: any): void;
    getProp(name: string): any;
    removeProp(name: string): void;
}

/** @internal */
export declare function _isStringifiable(value: unknown): value is _Stringifiable;

/**
 * @public
 * Used by the JSX transpilers to create a JSXNode.
 * Note that the optimizer will not use this, instead using _jsxSplit and _jsxSorted directly.
 */
declare const jsx: <T extends string | FunctionComponent<any>>(type: T, props: T extends FunctionComponent<infer PROPS> ? PROPS : Props, key?: string | number | null) => JSXNode<T>;
export { jsx }
export { jsx as jsxs }

/** @internal */
export declare const _jsxBranch: <T>(input?: T) => T | undefined;

/** @internal @deprecated v1 compat */
export declare const _jsxC: (type: any, mutable: any, _flags: any, key: any) => JSXNode<any>;

/** @public */
export declare type JSXChildren = string | number | boolean | null | undefined | Function | RegExp | JSXChildren[] | Promise<JSXChildren> | Signal<JSXChildren> | JSXNode;

/** @public */
export declare const jsxDEV: <T extends string | FunctionComponent<Props>>(type: T, props: T extends FunctionComponent<infer PROPS> ? PROPS : Props, key: string | number | null | undefined, _isStatic: boolean, opts: JsxDevOpts, _ctx: unknown) => JSXNode<T>;

declare interface JsxDevOpts {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
}

/**
 * A JSX Node, an internal structure. You probably want to use `JSXOutput` instead.
 *
 * @public
 */
export declare interface JSXNode<T extends string | FunctionComponent | unknown = unknown> {
    type: T;
    props: T extends FunctionComponent<infer P> ? P : Record<any, unknown>;
    varProps: Record<any, unknown>;
    constProps: Record<any, unknown> | null;
    children: JSXChildren | null;
    flags: number;
    key: string | null;
    dev?: DevJSX;
}

/**
 * Any valid output for a component
 *
 * @public
 */
export declare type JSXOutput = JSXNode | string | number | boolean | null | undefined | JSXOutput[];

/** @internal @deprecated v1 compat */
export declare const _jsxQ: (type: any, mutable: any, immutable: any, children: any, _flags: any, key: any) => JSXNode<any>;

/** @internal @deprecated v1 compat */
export declare const _jsxS: (type: any, mutable: any, immutable: any, _flags: any, key: any) => JSXNode<any>;

/**
 * Create a JSXNode with the properties fully split into variable and constant parts, and children
 * separated out. Furthermore, the varProps must be a sorted object, that is, the keys must be
 * sorted in ascending utf-8 value order.
 *
 * The constant parts are expected to be the same on every render, and are not checked for changes.
 * This means that they are constant scalars or refs. When the ref is a signal or a store, it can
 * still update the attribute on the vnode.
 *
 * @param type - The JSX type
 * @param varProps - The properties of the tag, sorted, excluding children, excluding any constProps
 * @param constProps - The properties of the tag that are known to be constant references and don't
 *   need checking for changes on re-render
 * @param children - JSX children. Any `children` in the props objects are ignored.
 * @internal
 */
export declare const _jsxSorted: <T>(type: T, varProps: Props | null, constProps: Props | null, children: JSXChildren | null, flags: number, key: string | number | null | undefined, dev?: DevJSX) => JSXNode<T>;

/**
 * Create a JSXNode, with the properties split into variable and constant parts, but the variable
 * parts could include keys from constProps, as well as `key` and `children`.
 *
 * The constant parts are expected to be the same on every render, and are not checked for changes.
 * This means that they are constant scalars or refs. When the ref is a signal or a store, it can
 * still update the attribute on the vnode.
 *
 * If `children` is defined, any `children` in the props will be ignored.
 *
 * @param type - The tag type
 * @param varProps - The properties of the tag that could change, including children
 * @param constProps - The properties of the tag that are known to be static and don't need checking
 *   for changes on re-render
 * @internal
 */
export declare const _jsxSplit: <T extends string | FunctionComponent<any>>(type: T, varProps: Props | null, constProps: Props | null, children: JSXChildren | null | undefined, flags: number, key: string | number | null, dev?: DevJSX) => JSXNode<T>;

/** @public */
export declare type JSXTagName = keyof HTMLElementTagNameMap | Omit<string, keyof HTMLElementTagNameMap>;

/** @public @deprecated in html5 */
export declare interface KeygenHTMLAttributes<T extends Element> extends Attrs<'base', T> {
}

/**
 * The names of events that Qwik knows about. They are all lowercase, but on the JSX side, they are
 * PascalCase for nicer DX. (`onAuxClick$` vs `onauxclick$`)
 *
 * @public
 */
export declare type KnownEventNames = LiteralUnion<AllEventKeys, string>;

/** @public */
export declare interface LabelHTMLAttributes<T extends Element> extends Attrs<'label', T> {
}

declare type LcEvent<T extends string, C extends string = Lowercase<T>> = C extends keyof AllEventsMap ? AllEventsMap[C] : Event;

declare type LcEventNameMap = {
    [name in PascalCaseNames as Lowercase<name>]: name;
};

/**
 * These definitions are for the JSX namespace, they allow passing plain event handlers instead of
 * QRLs
 */
declare interface LenientQwikElements extends IntrinsicHTMLElements, IntrinsicSVGElements {
}

/** @internal */
export declare interface LenientSVGProps<T extends Element> extends SVGAttributes, DOMAttributes<T> {
}

/** @public */
export declare interface LiHTMLAttributes<T extends Element> extends Attrs<'li', T> {
}

/** @public */
export declare interface LinkHTMLAttributes<T extends Element> extends Attrs<'link', T> {
}

/** A QRL that will be called when the event occurs */
declare type Listener = [
eventName: string,
qrl: QRLInternal<(event: PossibleEvents, elem?: Element) => any>
];

/**
 * Allows creating a union type by combining primitive types and literal types without sacrificing
 * auto-completion in IDEs for the literal type part of the union.
 *
 * This type is a workaround for Microsoft/TypeScript#29729. It will be removed as soon as it's not
 * needed anymore.
 *
 * Example:
 *
 * ```ts
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
    $addToGroup$(group: Group, manager: LocalSubscriptionManager): void;
    $unsubGroup$(group: Group): void;
    $unsubEntry$(entry: SubscriberSignal): void;
    $addSub$(sub: Subscriber, key?: string): void;
    $notifySubs$(key?: string | undefined): void;
}

/** @public */
export declare interface MapHTMLAttributes<T extends Element> extends Attrs<'map', T> {
}

/** @public */
export declare interface MediaHTMLAttributes<T extends Element> extends HTMLAttributes<T>, Augmented<HTMLMediaElement, {
    crossOrigin?: HTMLCrossOriginAttribute;
}> {
}

declare type MediaSpecialAttrs = {
    crossOrigin?: HTMLCrossOriginAttribute;
};

/** @public */
export declare interface MenuHTMLAttributes<T extends Element> extends Attrs<'menu', T> {
}

/** @public */
export declare interface MetaHTMLAttributes<T extends Element> extends Attrs<'meta', T> {
}

/** @public */
export declare interface MeterHTMLAttributes<T extends Element> extends Attrs<'meter', T> {
}

/** @public @deprecated Use `AnimationEvent` and use the second argument to the handler function for the current event target */
export declare type NativeAnimationEvent = AnimationEvent;

/** @public @deprecated Use `ClipboardEvent` and use the second argument to the handler function for the current event target */
export declare type NativeClipboardEvent = ClipboardEvent;

/** @public @deprecated Use `CompositionEvent` and use the second argument to the handler function for the current event target */
export declare type NativeCompositionEvent = CompositionEvent;

/** @public @deprecated Use `DragEvent` and use the second argument to the handler function for the current event target */
export declare type NativeDragEvent = DragEvent;

/** @public @deprecated Use `FocusEvent` and use the second argument to the handler function for the current event target */
export declare type NativeFocusEvent = FocusEvent;

/** @public @deprecated Use `KeyboardEvent` and use the second argument to the handler function for the current event target */
export declare type NativeKeyboardEvent = KeyboardEvent;

/** @public @deprecated Use `MouseEvent` and use the second argument to the handler function for the current event target */
export declare type NativeMouseEvent = MouseEvent;

/** @public @deprecated Use `PointerEvent` and use the second argument to the handler function for the current event target */
export declare type NativePointerEvent = PointerEvent;

/** @public @deprecated Use `TouchEvent` and use the second argument to the handler function for the current event target */
export declare type NativeTouchEvent = TouchEvent;

/** @public @deprecated Use `TransitionEvent` and use the second argument to the handler function for the current event target */
export declare type NativeTransitionEvent = TransitionEvent;

/** @public @deprecated Use `UIEvent` and use the second argument to the handler function for the current event target */
export declare type NativeUIEvent = UIEvent;

/** @public @deprecated Use `WheelEvent` and use the second argument to the handler function for the current event target */
export declare type NativeWheelEvent = WheelEvent;

/** @internal */
export declare const _noopQrl: <T>(symbolName: string, lexicalScopeCapture?: any[]) => QRL<T>;

/** @internal */
export declare const _noopQrlDEV: <T>(symbolName: string, opts: QRLDev, lexicalScopeCapture?: any[]) => QRL<T>;

/**
 * Returned type of the `noSerialize()` function. It will be TYPE or undefined.
 *
 * @public
 * @see noSerialize
 */
export declare type NoSerialize<T> = (T & {
    __no_serialize__: true;
}) | undefined;

/**
 * Marks a property on a store as non-serializable.
 *
 * At times it is necessary to store values on a store that are non-serializable. Normally this is a
 * runtime error as Store wants to eagerly report when a non-serializable property is assigned to
 * it.
 *
 * You can use `noSerialize()` to mark a value as non-serializable. The value is persisted in the
 * Store but does not survive serialization. The implication is that when your application is
 * resumed, the value of this object will be `undefined`. You will be responsible for recovering
 * from this.
 *
 * See: [noSerialize Tutorial](http://qwik.dev/tutorial/store/no-serialize)
 *
 * @public
 */
export declare const noSerialize: <T extends object | undefined>(input: T) => NoSerialize<T>;

/** @public */
export declare type Numberish = number | `${number}`;

/** @public */
export declare interface ObjectHTMLAttributes<T extends Element> extends Attrs<'object', T> {
}

declare type ObjectProps<T> = IsAny<T> extends true ? any : unknown extends T ? never : T extends Record<any, any> ? T : never;

declare type ObjToProxyMap = WeakMap<any, any>;

/** @public */
export declare interface OlHTMLAttributes<T extends Element> extends Attrs<'ol', T> {
}

/** @internal */
export declare type _Only$<P> = {
    [K in keyof P as K extends `${string}$` ? K : never]: _AllowPlainQrl<P[K]>;
};

/** @public */
export declare type OnRenderFn<PROPS> = (props: PROPS) => JSXOutput;

/** @public */
export declare interface OnVisibleTaskOptions {
    /**
     * The strategy to use to determine when the "VisibleTask" should first execute.
     *
     * - `intersection-observer`: the task will first execute when the element is visible in the
     *   viewport, under the hood it uses the IntersectionObserver API.
     * - `document-ready`: the task will first execute when the document is ready, under the hood it
     *   uses the document `load` event.
     * - `document-idle`: the task will first execute when the document is idle, under the hood it uses
     *   the requestIdleCallback API.
     */
    strategy?: VisibleTaskStrategy;
}

/** @public */
export declare interface OptgroupHTMLAttributes<T extends Element> extends Attrs<'optgroup', T> {
}

/** @public */
export declare interface OptionHTMLAttributes<T extends Element> extends Attrs<'option', T> {
}

/** @public */
export declare interface OutputHTMLAttributes<T extends Element> extends Attrs<'output', T> {
}

/** @public @deprecated Old DOM API */
export declare interface ParamHTMLAttributes<T extends Element> extends Attrs<'base', T, HTMLParamElement> {
}

/**
 * Capitalized multi-word names of some known events so we have nicer qwik attributes. For example,
 * instead of `oncompositionEnd$` we can use `onCompositionEnd$`. Note that any capitalization
 * works, so `oncompositionend$` is also valid. This is just for DX.
 *
 * Add any multi-word event names to this list. Single word events are automatically converted.
 */
declare type PascalCaseNames = 'AnimationEnd' | 'AnimationIteration' | 'AnimationStart' | 'AuxClick' | 'BeforeToggle' | 'CanPlay' | 'CanPlayThrough' | 'CompositionEnd' | 'CompositionStart' | 'CompositionUpdate' | 'ContextMenu' | 'DblClick' | 'DragEnd' | 'DragEnter' | 'DragExit' | 'DragLeave' | 'DragOver' | 'DragStart' | 'DurationChange' | 'FocusIn' | 'FocusOut' | 'FullscreenChange' | 'FullscreenError' | 'GotPointerCapture' | 'KeyDown' | 'KeyPress' | 'KeyUp' | 'LoadedData' | 'LoadedMetadata' | 'LoadEnd' | 'LoadStart' | 'LostPointerCapture' | 'MouseDown' | 'MouseEnter' | 'MouseLeave' | 'MouseMove' | 'MouseOut' | 'MouseOver' | 'MouseUp' | 'PointerCancel' | 'PointerDown' | 'PointerEnter' | 'PointerLeave' | 'PointerMove' | 'PointerOut' | 'PointerOver' | 'PointerUp' | 'QIdle' | 'QInit' | 'QSymbol' | 'QVisible' | 'RateChange' | 'RateChange' | 'SecurityPolicyViolation' | 'SelectionChange' | 'SelectStart' | 'TimeUpdate' | 'TouchCancel' | 'TouchEnd' | 'TouchMove' | 'TouchStart' | 'TransitionCancel' | 'TransitionEnd' | 'TransitionRun' | 'TransitionStart' | 'VisibilityChange' | 'VolumeChange';

/**
 * Convert an event map to PascalCase. For example, `HTMLElementEventMap` contains lowercase keys,
 * so this will capitalize them, and use the `LcEventNameMap` for multi-word events names.
 */
declare type PascalMap<M> = {
    [K in Extract<keyof M, string> as K extends keyof LcEventNameMap ? LcEventNameMap[K] : Capitalize<K>]: M[K];
};

/** @public */
declare interface PauseContext {
    getObject: GetObject;
    meta: SnapshotMeta;
    refs: Record<string, string>;
}

/**
 * Grab all state needed to resume the container later.
 *
 * @internal
 */
export declare const _pauseFromContexts: (allContexts: QContext[], containerState: ContainerState, fallbackGetObjId?: GetObjID, textNodes?: Map<string, string>) => Promise<SnapshotResult>;

declare type PopoverTargetAction = 'hide' | 'show' | 'toggle';

declare type PossibleEvents = Event | SimplifiedServerRequestEvent | typeof TaskEvent | typeof RenderEvent | typeof ComputedEvent | typeof ResourceEvent;

/**
 * Load the prefetch graph for the container.
 *
 * Each Qwik container needs to include its own prefetch graph.
 *
 * @param opts - Options for the loading prefetch graph.
 *
 *   - `base` - Base of the graph. For a default installation this will default to the q:base value
 *       `/build/`. But if more than one MFE is installed on the page, then each MFE needs to have
 *       its own base.
 *   - `manifestHash` - Hash of the manifest file to load. If not provided the hash will be extracted
 *       from the container attribute `q:manifest-hash` and assume the default build file
 *       `${base}/q-bundle-graph-${manifestHash}.json`.
 *   - `manifestURL` - URL of the manifest file to load if non-standard bundle graph location name.
 *
 * @alpha
 */
export declare const PrefetchGraph: (opts?: {
    base?: string;
    manifestHash?: string;
    manifestURL?: string;
    nonce?: string;
}) => JSXNode_2<string>;

/** @public */
declare interface PrefetchResource {
    url: string;
    imports: PrefetchResource[];
}

/**
 * Install a service worker which will prefetch the bundles.
 *
 * There can only be one service worker per page. Because there can be many separate Qwik Containers
 * on the page each container needs to load its prefetch graph using `PrefetchGraph` component.
 *
 * @param opts - Options for the prefetch service worker.
 *
 *   - `base` - Base URL for the service worker. Default is `import.meta.env.BASE_URL`, which is defined
 *       by Vite's `config.base` and defaults to `/`.
 *   - `scope` - Base URL for when the service-worker will activate. Default is `/`
 *   - `path` - Path to the service worker. Default is `qwik-prefetch-service-worker.js` unless you pass
 *       a path that starts with a `/` then the base is ignored. Default is
 *       `qwik-prefetch-service-worker.js`
 *   - `verbose` - Verbose logging for the service worker installation. Default is `false`
 *   - `nonce` - Optional nonce value for security purposes, defaults to `undefined`.
 *
 * @alpha
 */
export declare const PrefetchServiceWorker: (opts: {
    base?: string;
    scope?: string;
    path?: string;
    verbose?: boolean;
    fetchBundleGraph?: boolean;
    nonce?: string;
}) => JSXNode_2<'script'>;

declare type Prettify<T> = {} & {
    [K in keyof T]: T[K];
};

declare type PreventDefault = {
    [K in keyof HTMLElementEventMap as `preventdefault:${K}`]?: boolean;
};

/** Matches any primitive value. */
declare type Primitive = null | undefined | string | number | boolean | symbol | bigint;

declare interface ProcessedJSXNode {
    $type$: ProcessedJSXNodeType;
    $id$: string;
    $varProps$: Record<string, any>;
    $constProps$: Record<string, any> | null;
    $flags$: number;
    $children$: ProcessedJSXNode[];
    $key$: string | null;
    $elm$: Node | VirtualElement | null;
    $text$: string;
    $signal$: Signal<any> | null;
    $dev$?: DevJSX;
}

declare type ProcessedJSXNodeType = '#text' | ':virtual' | ':signal' | typeof SKIP_RENDER_TYPE | string;

/** @public */
export declare interface ProgressHTMLAttributes<T extends Element> extends Attrs<'progress', T> {
}

/**
 * @deprecated Use `QRL<>` instead
 * @public
 */
export declare type PropFnInterface<ARGS extends any[], RET> = {
    __qwik_serializable__?: any;
    (...args: ARGS): Promise<RET>;
};

/**
 * Alias for `QRL<T>`. Of historic relevance only.
 *
 * @public
 */
export declare type PropFunction<T> = QRL<T>;

/** @public @deprecated Use `QRL<>` on your function props instead */
export declare type PropFunctionProps<PROPS extends Record<any, any>> = {
    [K in keyof PROPS]: PROPS[K] extends undefined ? PROPS[K] : PROPS[K] extends ((...args: infer ARGS) => infer RET) | undefined ? PropFnInterface<ARGS, Awaited<RET>> : PROPS[K];
};

declare type Props = Record<string, unknown>;

/**
 * Infers `Props` from the component or tag.
 *
 * @example
 *
 * ```tsx
 * const Desc = component$(({desc, ...props}: { desc: string } & PropsOf<'div'>) => {
 *  return <div {...props}>{desc}</div>;
 * });
 *
 * const TitleBox = component$(({title, ...props}: { title: string } & PropsOf<Box>) => {
 *   return <Box {...props}><h1>{title}</h1></Box>;
 * });
 * ```
 *
 * @public
 */
export declare type PropsOf<COMP> = COMP extends string ? COMP extends keyof QwikIntrinsicElements ? QwikIntrinsicElements[COMP] : QwikIntrinsicElements['span'] : NonNullable<COMP> extends never ? never : COMP extends FunctionComponent<infer PROPS> ? PROPS extends Record<any, infer V> ? IsAny<V> extends true ? never : ObjectProps<PROPS> : COMP extends Component<infer OrigProps> ? ObjectProps<OrigProps> : PROPS : never;

/** Used with derived signal on property: `<div prop={signal}>` */
declare type PropSubscriber = readonly [
type: SubscriptionType.PROP_IMMUTABLE | SubscriptionType.PROP_MUTABLE,
host: SubscriberHost,
signal: Signal,
elm: QwikElement,
elementProperty: string,
styleScopedId: string | undefined
];

declare type PropSubscriberWithKey = [...PropSubscriber, key: string | undefined];

/**
 * Extends the defined component PROPS, adding the default ones (children and q:slot) and allowing
 * plain functions to QRL arguments.
 *
 * @public
 */
export declare type PublicProps<PROPS> = (PROPS extends Record<any, any> ? Omit<PROPS, `${string}$`> & _Only$<PROPS> : unknown extends PROPS ? {} : PROPS) & ComponentBaseProps & ComponentChildren<PROPS>;

/** Qwik Context of an element. */
declare interface QContext {
    /** VDOM element. */
    $element$: QwikElement;
    $refMap$: any[];
    $flags$: number;
    /** QId, for referenced components */
    $id$: string;
    /** Proxy for the component props */
    $props$: Record<string, any> | null;
    /** The QRL if this is `component$`-wrapped component. */
    $componentQrl$: QRLInternal<OnRenderFn<any>> | null;
    /** The event handlers for this element */
    li: Listener[];
    /** Sequential data store for hooks, managed by useSequentialScope. */
    $seq$: any[] | null;
    $tasks$: SubscriberEffect[] | null;
    /** The public contexts defined on this (always Virtual) component, managed by useContextProvider. */
    $contexts$: Map<string, any> | null;
    $appendStyles$: StyleAppend[] | null;
    $scopeIds$: string[] | null;
    $vdom$: ProcessedJSXNode | null;
    $slots$: ProcessedJSXNode[] | null;
    $dynamicSlots$: QContext[] | null;
    /**
     * The Qwik Context of the virtual parent component, null if no parent. For an real element, it's
     * the owner virtual component, and for a virtual component it's the wrapping virtual component.
     */
    $parentCtx$: QContext | null | undefined;
    /**
     * During SSR, separately store the actual parent of slotted components to correctly pause
     * subscriptions
     */
    $realParentCtx$: QContext | undefined;
}

/** @internal */
export declare interface _QDocument extends Document {
    qVNodeData: WeakMap<Element, string>;
}

/**
 * The `QRL` type represents a lazy-loadable AND serializable resource.
 *
 * QRL stands for Qwik URL.
 *
 * Use `QRL` when you want to refer to a lazy-loaded resource. `QRL`s are most often used for code
 * (functions) but can also be used for other resources such as `string`s in the case of styles.
 *
 * `QRL` is an opaque token that is generated by the Qwik Optimizer. (Do not rely on any properties
 * in `QRL` as it may change between versions.)
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
 * this function directly in your application. The `qrl(...)` function should be invoked only after
 * the Qwik Optimizer transformation.
 *
 * ## Using `QRL`s
 *
 * Use `QRL` type in your application when you want to get a lazy-loadable reference to a resource
 * (most likely a function).
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
 * In the above example, the way to think about the code is that you are not asking for a callback
 * function but rather a reference to a lazy-loadable callback function. Specifically, the function
 * loading should be delayed until it is actually needed. In the above example, the function would
 * not load until after a `mousemove` event on `document` fires.
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
 * ## `QRL.resolved`
 *
 * Once `QRL.resolve()` returns, the value is stored under `QRL.resolved`. This allows the value to
 * be used without having to await `QRL.resolve()` again.
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
 * 5. `QRL`s allow expressing lazy-loaded boundaries without thinking about chunk and symbol names.
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
 * 1. Notice there is no easy way to extract chunk (`./chunk-abc.js`) and symbol (`onClick`) into HTML.
 * 2. Notice that even if you could extract it, the `import('./chunk-abc.js')` would become relative to
 *    where the `import()` file is declared. Because it is our framework doing the load, the
 *    `./chunk-abc.js` would become relative to the framework file. This is not correct, as it
 *    should be relative to the original file generated by the bundler.
 * 3. Next, the framework needs to resolve the `./chunk-abc.js` and needs a base location that is
 *    encoded in the HTML.
 * 4. The QRL needs to be able to capture lexically scoped variables. (`import()` only allows loading
 *    top-level symbols which don't capture variables.)
 * 5. As a developer, you don't want to think about `import` and naming the chunks and symbols. You
 *    just want to say: "this should be lazy."
 *
 * These are the main reasons why Qwik introduces its own concept of `QRL`.
 *
 * @public
 * @see `$`
 */
export declare type QRL<TYPE = unknown> = {
    __qwik_serializable__?: any;
    __brand__QRL__: TYPE;
    /** Resolve the QRL and return the actual value. */
    resolve(): Promise<TYPE>;
    /** The resolved value, once `resolve()` returns. */
    resolved: undefined | TYPE;
    getCaptured(): unknown[] | null;
    getSymbol(): string;
    getHash(): string;
    dev: QRLDev | null;
} & BivariantQrlFn<QrlArgs<TYPE>, QrlReturn<TYPE>>;

/**
 * Used by Qwik Optimizer to point to lazy-loaded resources.
 *
 * This function should be used by the Qwik Optimizer only. The function should not be directly
 * referred to in the source code of the application.
 *
 * @param chunkOrFn - Chunk name (or function which is stringified to extract chunk name)
 * @param symbol - Symbol to lazy load
 * @param lexicalScopeCapture - A set of lexically scoped variables to capture.
 * @public
 * @see `QRL`, `$(...)`
 */
export declare const qrl: <T = any>(chunkOrFn: string | (() => Promise<any>), symbol: string, lexicalScopeCapture?: any[], stackOffset?: number) => QRL<T>;

declare type QrlArgs<T> = T extends (...args: infer ARGS) => any ? ARGS : unknown[];

/** @public */
declare interface QRLDev {
    file: string;
    lo: number;
    hi: number;
}

/** @internal */
export declare const qrlDEV: <T = any>(chunkOrFn: string | (() => Promise<any>), symbol: string, opts: QRLDev, lexicalScopeCapture?: any[]) => QRL<T>;

/**
 * An event handler for Qwik events, can be a handler QRL or an array of handler QRLs.
 *
 * @beta
 */
export declare type QRLEventHandlerMulti<EV extends Event, EL> = QRL<EventHandler<EV, EL>> | undefined | null | QRLEventHandlerMulti<EV, EL>[] | EventHandler<EV, EL>;

declare type QRLInternal<TYPE = unknown> = QRL<TYPE> & QRLInternalMethods<TYPE>;

declare type QRLInternalMethods<TYPE> = {
    readonly $chunk$: string | null;
    readonly $symbol$: string;
    readonly $refSymbol$: string | null;
    readonly $hash$: string;
    $capture$: string[] | null;
    $captureRef$: unknown[] | null;
    dev: QRLDev | null;
    resolved: undefined | TYPE;
    resolve(): Promise<TYPE>;
    getSymbol(): string;
    getHash(): string;
    getCaptured(): unknown[] | null;
    getFn(currentCtx?: InvokeContext | InvokeTuple, beforeFn?: () => void): TYPE extends (...args: any) => any ? (...args: Parameters<TYPE>) => ValueOrPromise<ReturnType<TYPE>> : unknown;
    $setContainer$(containerEl: Element | undefined): Element | undefined;
    $resolveLazy$(containerEl?: Element): ValueOrPromise<TYPE>;
};

declare type QrlReturn<T> = T extends (...args: any) => infer R ? Awaited<R> : unknown;

/**
 * Extract function into a synchronously loadable QRL.
 *
 * NOTE: Synchronous QRLs functions can't close over any variables, including exports.
 *
 * @param fn - Extracted function
 * @param serializedFn - Serialized function in string form.
 * @returns
 * @alpha
 */
export declare const _qrlSync: <TYPE extends Function>(fn: TYPE, serializedFn?: string) => SyncQRL<TYPE>;

/** @public */
export declare interface QuoteHTMLAttributes<T extends Element> extends Attrs<'q', T> {
}

/** @public @deprecated Use `AnimationEvent` and use the second argument to the handler function for the current event target */
export declare type QwikAnimationEvent<T = Element> = NativeAnimationEvent;

/** The Qwik DOM attributes without plain handlers, for use as function parameters @public */
export declare interface QwikAttributes<EL extends Element> extends DOMAttributesBase<EL>, QwikEvents<EL, false> {
    class?: ClassList | undefined;
}

/** @public @deprecated Use `Event` and use the second argument to the handler function for the current event target. Also note that in Qwik, onInput$ with the InputEvent is the event that behaves like onChange in React. */
export declare type QwikChangeEvent<T = Element> = Event;

/** @public @deprecated Use `ClipboardEvent` and use the second argument to the handler function for the current event target */
export declare type QwikClipboardEvent<T = Element> = NativeClipboardEvent;

/** @public @deprecated Use `CompositionEvent` and use the second argument to the handler function for the current event target */
export declare type QwikCompositionEvent<T = Element> = NativeCompositionEvent;

declare type QwikCustomEvents<EL> = {};

declare type QwikCustomEventsPlain<EL> = {
    /** The handler */
    [key: `${'document:' | 'window:' | ''}on${string}$`]: QRLEventHandlerMulti<Event, EL> | EventHandler<Event, EL>;
};

/** @public */
export declare interface QwikDOMAttributes extends DOMAttributes<Element> {
}

/** @public @deprecated Use `DragEvent` and use the second argument to the handler function for the current event target */
export declare type QwikDragEvent<T = Element> = NativeDragEvent;

declare type QwikElement = Element | VirtualElement;

/** @public */
declare type QwikEvents<EL, Plain extends boolean = true> = Plain extends true ? QwikKnownEventsPlain<EL> & QwikCustomEventsPlain<EL> : QwikKnownEvents<EL> & QwikCustomEvents<EL>;

/** @public @deprecated Use `FocusEvent` and use the second argument to the handler function for the current event target */
export declare type QwikFocusEvent<T = Element> = NativeFocusEvent;

/**
 * The DOM props without plain handlers, for use inside functions
 *
 * @public
 */
export declare type QwikHTMLElements = {
    [tag in keyof HTMLElementTagNameMap]: Augmented<HTMLElementTagNameMap[tag], SpecialAttrs[tag]> & HTMLElementAttrs & QwikAttributes<HTMLElementTagNameMap[tag]>;
};

/** Emitted by qwik-loader on document when the document first becomes idle @public */
export declare type QwikIdleEvent = CustomEvent<{}>;

/** Emitted by qwik-loader on document when the document first becomes interactive @public */
export declare type QwikInitEvent = CustomEvent<{}>;

/** @public */
declare interface QwikIntrinsicAttributes {
    key?: string | number | null | undefined;
    children?: JSXChildren;
    /** Corresponding slot name used to project the element into. */
    'q:slot'?: string;
    'q:shadowRoot'?: boolean;
    fetchPriority?: 'auto' | 'high' | 'low';
}

/**
 * The interface holds available attributes of both native DOM elements and custom Qwik elements. An
 * example showing how to define a customizable wrapper component:
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
 *
 * Note: It is shorter to use `PropsOf<'div'>`
 *
 * @public
 */
export declare interface QwikIntrinsicElements extends QwikHTMLElements, QwikSVGElements {
}

/** @public @deprecated Use `Event` and use the second argument to the handler function for the current event target */
export declare type QwikInvalidEvent<T = Element> = Event;

/** @public */
declare namespace QwikJSX {
    type Element = JSXOutput;
    type ElementType = string | FunctionComponent<Record<any, any>>;
    interface IntrinsicAttributes extends QwikIntrinsicAttributes {
    }
    interface ElementChildrenAttribute {
        children: JSXChildren;
    }
    interface IntrinsicElements extends LenientQwikElements {
    }
}
export { QwikJSX as JSX }
export { QwikJSX }

/** @public @deprecated Use `KeyboardEvent` and use the second argument to the handler function for the current event target */
export declare type QwikKeyboardEvent<T = Element> = NativeKeyboardEvent;

declare type QwikKnownEvents<EL> = {
    [K in keyof AllPascalEventMaps as `${'document:' | 'window:' | ''}on${K}$`]?: QRLEventHandlerMulti<AllPascalEventMaps[K], EL>;
};

declare type QwikKnownEventsPlain<EL> = {
    [K in keyof AllPascalEventMaps as `${'document:' | 'window:' | ''}on${K}$`]?: QRLEventHandlerMulti<AllPascalEventMaps[K], EL> | EventHandler<AllPascalEventMaps[K], EL>;
};

/** @public @deprecated Use `MouseEvent` and use the second argument to the handler function for the current event target */
export declare type QwikMouseEvent<T = Element, E = NativeMouseEvent> = E;

/** @public @deprecated Use `PointerEvent` and use the second argument to the handler function for the current event target */
export declare type QwikPointerEvent<T = Element> = NativePointerEvent;

/** @public @deprecated Use `SubmitEvent` and use the second argument to the handler function for the current event target */
export declare type QwikSubmitEvent<T = Element> = SubmitEvent;

/**
 * The SVG props without plain handlers, for use inside functions
 *
 * @public
 */
export declare type QwikSVGElements = {
    [K in keyof Omit<SVGElementTagNameMap, keyof HTMLElementTagNameMap>]: SVGProps<SVGElementTagNameMap[K]>;
};

/** Emitted by qwik-loader when a module was lazily loaded @public */
export declare type QwikSymbolEvent = CustomEvent<{
    qBase: string;
    qManifest: string;
    qVersion: string;
    href: string;
    symbol: string;
    element: Element;
    reqTime: number;
}>;

/** @public @deprecated Use `TouchEvent` and use the second argument to the handler function for the current event target */
export declare type QwikTouchEvent<T = Element> = NativeTouchEvent;

/** @public @deprecated Use `TransitionEvent` and use the second argument to the handler function for the current event target */
export declare type QwikTransitionEvent<T = Element> = NativeTransitionEvent;

/** @public @deprecated Use `UIEvent` and use the second argument to the handler function for the current event target */
export declare type QwikUIEvent<T = Element> = NativeUIEvent;

/** Emitted by qwik-loader when an element becomes visible. Used by `useVisibleTask$` @public */
export declare type QwikVisibleEvent = CustomEvent<IntersectionObserverEntry>;

/** @public @deprecated Use `WheelEvent` and use the second argument to the handler function for the current event target */
export declare type QwikWheelEvent<T = Element> = NativeWheelEvent;

/** @public */
export declare type ReadonlySignal<T = unknown> = Readonly<Signal<T>>;

/** @public */
export declare interface ReadonlySignal2<T> {
    readonly untrackedValue: T;
    readonly value: T;
}

/**
 * A ref can be either a signal or a function. Note that the type of Signal is Element so that it
 * can accept more specialized elements too
 *
 * @public
 */
declare type Ref<EL extends Element = Element> = Signal<Element | undefined> | RefFnInterface<EL>;

declare interface RefAttr<EL extends Element> {
    ref?: Ref<EL> | undefined;
}

declare type RefFnInterface<EL> = {
    (el: EL): void;
};

/** @internal */
export declare const _regSymbol: (symbol: any, hash: string) => any;

/**
 * Render JSX.
 *
 * Use this method to render JSX. This function does reconciling which means it always tries to
 * reuse what is already in the DOM (rather then destroy and recreate content.) It returns a cleanup
 * function you could use for cleaning up subscriptions.
 *
 * @param parent - Element which will act as a parent to `jsxNode`. When possible the rendering will
 *   try to reuse existing nodes.
 * @param jsxNode - JSX to render
 * @returns An object containing a cleanup function.
 * @public
 */
export declare const render: (parent: Element | Document, jsxNode: JSXOutput | FunctionComponent<any>, opts?: RenderOptions) => Promise<RenderResult>;

/** @public */
declare interface RenderContext {
    readonly $static$: RenderStaticContext;
    /** Current Qwik component */
    $cmpCtx$: QContext | null;
    /** Current Slot parent */
    $slotCtx$: QContext | undefined;
}

declare const RenderEvent = "qRender";

/** @public */
export declare const RenderOnce: FunctionComponent<{
    children?: unknown;
    key?: string | number | null | undefined;
}>;

/** @public */
declare interface RenderOperation {
    $operation$: (...args: any[]) => void;
    $args$: any[];
}

/** @public */
export declare interface RenderOptions {
    serverData?: Record<string, any>;
}

/** @public */
export declare interface RenderResult {
    cleanup(): void;
}

/** @internal */
export declare const _renderSSR: (node: JSXOutput, opts: RenderSSROptions) => Promise<void>;

/** @public */
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
 * This method works like an async memoized function that runs whenever some tracked value changes
 * and returns some data.
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
 * Example showing how `useResource` to perform a fetch to request the weather, whenever the input
 * city name changes.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const cityS = useSignal('');
 *
 *   const weatherResource = useResource$(async ({ track, cleanup }) => {
 *     const cityName = track(cityS);
 *     const abortController = new AbortController();
 *     cleanup(() => abortController.abort('cleanup'));
 *     const res = await fetch(`http://weatherdata.com?city=${cityName}`, {
 *       signal: abortController.signal,
 *     });
 *     const data = await res.json();
 *     return data as { temp: number };
 *   });
 *
 *   return (
 *     <div>
 *       <input name="city" bind:value={cityS} />
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
 * @public
 * @see Resource
 * @see ResourceReturn
 */
export declare const Resource: <T>(props: ResourceProps<T>) => JSXOutput;

/** @public */
export declare interface ResourceCtx<T> {
    readonly track: Tracker;
    cleanup(callback: () => void): void;
    cache(policyOrMilliseconds: number | 'immutable'): void;
    readonly previous: T | undefined;
}

declare interface ResourceDescriptor<T> extends DescriptorBase<ResourceFn<T>, ResourceReturnInternal<T>> {
}

declare const ResourceEvent = "qResource";

/** @public */
export declare type ResourceFn<T> = (ctx: ResourceCtx<unknown>) => ValueOrPromise<T>;

/**
 * Options to pass to `useResource$()`
 *
 * @public
 * @see useResource
 */
export declare interface ResourceOptions {
    /**
     * Timeout in milliseconds. If the resource takes more than the specified millisecond, it will
     * timeout. Resulting on a rejected resource.
     */
    timeout?: number;
}

/** @public */
export declare interface ResourcePending<T> {
    readonly value: Promise<T>;
    readonly loading: boolean;
}

/** @public */
export declare interface ResourceProps<T> {
    readonly value: ResourceReturn<T> | Signal<Promise<T> | T> | Promise<T>;
    onResolved: (value: T) => JSXOutput;
    onPending?: () => JSXOutput;
    onRejected?: (reason: Error) => JSXOutput;
}

/** @public */
export declare interface ResourceRejected<T> {
    readonly value: Promise<T>;
    readonly loading: boolean;
}

/** @public */
export declare interface ResourceResolved<T> {
    readonly value: Promise<T>;
    readonly loading: boolean;
}

/** @public */
export declare type ResourceReturn<T> = ResourcePending<T> | ResourceResolved<T> | ResourceRejected<T>;

declare interface ResourceReturnInternal<T> {
    __brand: 'resource';
    _state: 'pending' | 'resolved' | 'rejected';
    _resolved: T | undefined;
    _error: Error | undefined;
    _cache: number;
    _timeout: number;
    value: Promise<T>;
    loading: boolean;
}

/** @internal */
export declare const _restProps: (props: Record<string, any>, omit: string[], target?: {}) => {};

declare type Scheduler = ReturnType<typeof createScheduler>;

/** @public */
export declare interface ScriptHTMLAttributes<T extends Element> extends Attrs<'script', T> {
}

/** @public */
export declare interface SelectHTMLAttributes<T extends Element> extends Attrs<'select', T> {
}

declare interface SerializationContext {
    $serialize$: () => void;
    $symbolToChunkResolver$: SymbolToChunkResolver;
    /**
     * Map from object to root index.
     *
     * If object is found in `objMap` will return the index of the object in the `objRoots` or
     * `secondaryObjRoots`.
     *
     * `objMap` return:
     *
     * - `>=0` - index of the object in `objRoots`.
     * - `Number.MIN_SAFE_INTEGER` - object has been seen, only once, and therefor does not need to be
     *   promoted into a root yet.
     */
    $wasSeen$: (obj: unknown) => number | undefined;
    $hasRootId$: (obj: unknown) => number | undefined;
    /**
     * Root objects which need to be serialized.
     *
     * Roots are entry points into the object graph. Typically the roots are held by the listeners.
     */
    $addRoot$: (obj: unknown) => number;
    /**
     * Get root index of the object without create a new root.
     *
     * This is used during serialization, as new roots can't be created during serialization.
     *
     * The function throws if the root was not found.
     */
    $getRootId$: (obj: unknown) => number;
    $seen$: (obj: unknown) => void;
    $roots$: unknown[];
    $addSyncFn$($funcStr$: string | null, argsCount: number, fn: Function): number;
    $breakCircularDepsAndAwaitPromises$: () => ValueOrPromise<void>;
    /**
     * Node constructor, for instanceof checks.
     *
     * A node constructor can be null. For example on the client we can't serialize DOM nodes as
     * server will not know what to do with them.
     */
    $NodeConstructor$: {
        new (...rest: any[]): {
            nodeType: number;
            id: string;
        };
    } | null;
    $writer$: StreamWriter_2;
    $syncFns$: string[];
    $eventQrls$: Set<QRL>;
    $eventNames$: Set<string>;
    $resources$: Set<ResourceReturnInternal<unknown>>;
    $renderSymbols$: Set<string>;
    $setProp$: (obj: any, prop: string, value: any) => void;
}

/**
 * Serialize data to string using SerializationContext.
 *
 * @param data - Data to serialize
 * @internal
 */
export declare function _serialize(data: unknown[]): Promise<string>;

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

/** @internal */
export declare abstract class _SharedContainer implements Container2 {
    readonly $version$: string;
    readonly $scheduler$: Scheduler;
    readonly $storeProxyMap$: ObjToProxyMap;
    readonly $locale$: string;
    readonly $getObjectById$: (id: number | string) => any;
    $serverData$: Record<string, any>;
    $currentUniqueId$: number;
    $instanceHash$: string | null;
    constructor(scheduleDrain: () => void, journalFlush: () => void, serverData: Record<string, any>, locale: string);
    trackSignalValue<T>(signal: Signal, subscriber: Effect, property: string, data: any): T;
    serializationCtxFactory(NodeConstructor: SerializationContext['$NodeConstructor$'] | null, symbolToChunkResolver: SymbolToChunkResolver, writer?: StreamWriter_3): SerializationContext;
    abstract ensureProjectionResolved(host: HostElement): void;
    abstract processJsx(host: HostElement, jsx: JSXOutput): ValueOrPromise<void>;
    abstract handleError(err: any, $host$: HostElement): void;
    abstract getParentHost(host: HostElement): HostElement | null;
    abstract setContext<T>(host: HostElement, context: ContextId<T>, value: T): void;
    abstract resolveContext<T>(host: HostElement, contextId: ContextId<T>): T | undefined;
    abstract setHostProp<T>(host: HostElement, name: string, value: T): void;
    abstract getHostProp<T>(host: HostElement, name: string): T | null;
    abstract $appendStyle$(content: string, styleId: string, host: HostElement, scoped: boolean): void;
}

/**
 * A signal is a reactive value which can be read and written. When the signal is written, all tasks
 * which are tracking the signal will be re-run and all components that read the signal will be
 * re-rendered.
 *
 * Furthermore, when a signal value is passed as a prop to a component, the optimizer will
 * automatically forward the signal. This means that `return <div title={signal.value}>hi</div>`
 * will update the `title` attribute when the signal changes without having to re-render the
 * component.
 *
 * @public
 */
export declare interface Signal<T = any> {
    value: T;
}

/** @public */
export declare interface Signal2<T> extends ReadonlySignal2<T> {
    untrackedValue: T;
    value: T;
}

declare class Signal2_2<T = any> extends Subscriber_2 implements Signal2<T> {
    $untrackedValue$: T;
    /** Store a list of effects which are dependent on this signal. */
    $effects$: null | EffectSubscriptions[];
    $container$: Container2 | null;
    constructor(container: Container2 | null, value: T);
    get untrackedValue(): T;
    set untrackedValue(value: T);
    get value(): T;
    set value(value: T);
    valueOf(): void;
    toString(): string;
    toJSON(): {
        value: T;
    };
}

declare interface SimplifiedServerRequestEvent<T = unknown> {
    url: URL;
    locale: string | undefined;
    request: Request;
}

/** @public */
export declare type Size = number | string;

declare const SKIP_RENDER_TYPE = ":skipRender";

/** @public */
export declare const SkipRender: JSXNode;

/**
 * Allows to project the children of the current component. <Slot/> can only be used within the
 * context of a component defined with `component$`.
 *
 * @public
 */
export declare const Slot: FunctionComponent<{
    name?: string;
    children?: JSXChildren;
}>;

/** @public */
export declare interface SlotHTMLAttributes<T extends Element> extends Attrs<'slot', T> {
}

/** @public */
export declare interface SnapshotListener {
    key: string;
    qrl: QRL<any>;
    el: Element;
}

/** @public */
export declare type SnapshotMeta = Record<string, SnapshotMetaValue>;

/** @public */
export declare interface SnapshotMetaValue {
    w?: string;
    s?: string;
    h?: string;
    c?: string;
}

/** @public */
export declare interface SnapshotResult {
    /** @deprecated Not longer used in v2 */
    state?: SnapshotState;
    funcs: string[];
    qrls: QRL[];
    /** @deprecated Not longer used in v2 */
    objs?: any[];
    resources: ResourceReturnInternal<any>[];
    mode: 'render' | 'listeners' | 'static';
}

/** @public @deprecated not longer used in v2 */
export declare interface SnapshotState {
    ctx: SnapshotMeta;
    refs: Record<string, string>;
    objs: any[];
    subs: any[];
}

/** @public */
export declare interface SourceHTMLAttributes<T extends Element> extends Attrs<'source', T> {
}

declare type SpecialAttrs = {
    a: {
        download?: any;
        target?: HTMLAttributeAnchorTarget | undefined;
        referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    };
    area: {
        referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
        children?: undefined;
    };
    audio: MediaSpecialAttrs;
    base: {
        children?: undefined;
    };
    button: {
        form?: string | undefined;
        value?: string | ReadonlyArray<string> | number | undefined;
        popovertarget?: string | undefined;
        popovertargetaction?: PopoverTargetAction | undefined;
    };
    canvas: {
        height?: Size | undefined;
        width?: Size | undefined;
    };
    col: {
        width?: Size | undefined;
        children?: undefined;
    };
    data: {
        value?: string | ReadonlyArray<string> | number | undefined;
    };
    embed: {
        height?: Size | undefined;
        width?: Size | undefined;
        children?: undefined;
    };
    fieldset: {
        form?: string | undefined;
    };
    hr: {
        children?: undefined;
    };
    iframe: {
        allowTransparency?: boolean | undefined;
        /** @deprecated Deprecated */
        frameBorder?: number | string | undefined;
        height?: Size | undefined;
        loading?: 'eager' | 'lazy' | undefined;
        sandbox?: string | undefined;
        seamless?: boolean | undefined;
        width?: Size | undefined;
        children?: undefined;
    };
    img: {
        crossOrigin?: HTMLCrossOriginAttribute;
        /** Intrinsic height of the image in pixels. */
        height?: Numberish | undefined;
        referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
        /** Intrinsic width of the image in pixels. */
        width?: Numberish | undefined;
        children?: undefined;
    };
    input: {
        /**
         * For type: HTMLInputTypeAttribute, excluding 'button' | 'color' | 'file' | 'hidden' | 'image'|
         * 'range' | 'reset' | 'submit' | 'checkbox' | 'radio'
         */
        autoComplete?: HTMLInputAutocompleteAttribute | Omit<HTMLInputAutocompleteAttribute, string> | undefined;
        /** For type: 'checkbox' | 'radio' */
        'bind:checked'?: Signal<boolean | undefined>;
        /**
         * For type: HTMLInputTypeAttribute, excluding 'button' | 'reset' | 'submit' | 'checkbox' |
         * 'radio'
         */
        'bind:value'?: Signal<string | undefined>;
        enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
        height?: Size | undefined;
        max?: number | string | undefined;
        maxLength?: number | undefined;
        min?: number | string | undefined;
        minLength?: number | undefined;
        step?: number | string | undefined;
        type?: HTMLInputTypeAttribute | undefined;
        value?: string | ReadonlyArray<string> | number | undefined | null | FormDataEntryValue;
        width?: Size | undefined;
        children?: undefined;
        /** For type: 'button' */
        popovertarget?: string | undefined;
        popovertargetaction?: PopoverTargetAction | undefined;
    };
    label: {
        form?: string | undefined;
        for?: string | undefined;
        /** @deprecated Use `for` */
        htmlFor?: string | undefined;
    };
    li: {
        value?: string | ReadonlyArray<string> | number | undefined;
    };
    link: {
        crossOrigin?: HTMLCrossOriginAttribute;
        referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
        sizes?: string | undefined;
        type?: string | undefined;
        /** @deprecated Use `charset` instead */
        charSet?: string | undefined;
        charset?: string | undefined;
        children?: undefined;
    };
    meta: {
        /** @deprecated Use `charset` instead */
        charSet?: 'utf-8' | undefined;
        /** Qwik only supports utf-8 */
        charset?: 'utf-8' | undefined;
        children?: undefined;
    };
    meter: {
        form?: string | undefined;
        value?: string | ReadonlyArray<string> | number | undefined;
    };
    object: {
        classID?: string | undefined;
        form?: string | undefined;
        height?: Size | undefined;
        width?: Size | undefined;
        wmode?: string | undefined;
    };
    ol: {
        type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined;
    };
    optgroup: {
        disabled?: boolean | undefined;
        label?: string | undefined;
    };
    option: {
        value?: string | ReadonlyArray<string> | number | undefined;
        children?: string;
    };
    output: {
        form?: string | undefined;
        for?: string | undefined;
        /** @deprecated Use `for` instead */
        htmlFor?: string | undefined;
    };
    param: {
        value?: string | ReadonlyArray<string> | number | undefined;
        children?: undefined;
    };
    progress: {
        max?: number | string | undefined;
        value?: string | ReadonlyArray<string> | number | undefined;
    };
    script: {
        crossOrigin?: HTMLCrossOriginAttribute;
        referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    };
    select: {
        form?: string | undefined;
        value?: string | ReadonlyArray<string> | number | undefined;
        'bind:value'?: Signal<string | undefined>;
    };
    source: {
        /** Allowed if the parent is a `picture` element */
        height?: Size | undefined;
        /** Allowed if the parent is a `picture` element */
        width?: Size | undefined;
        children?: undefined;
    };
    style: {
        scoped?: boolean | undefined;
        children?: string;
    };
    table: {
        cellPadding?: number | string | undefined;
        cellSpacing?: number | string | undefined;
        width?: Size | undefined;
    };
    td: TableCellSpecialAttrs;
    th: TableCellSpecialAttrs;
    title: {
        children?: string;
    };
    textarea: {
        enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
        form?: string | undefined;
        value?: string | ReadonlyArray<string> | number | undefined;
        'bind:value'?: Signal<string | undefined>;
        children?: string;
    };
    track: {
        children?: undefined;
    };
    video: MediaSpecialAttrs & {
        height?: Numberish | undefined;
        width?: Numberish | undefined;
        disablePictureInPicture?: boolean | undefined;
        disableRemotePlayback?: boolean | undefined;
    };
} & {
    [key: string]: {};
};

declare type SsrAttrKey = string;

declare type SsrAttrs = Array<SsrAttrKey | SsrAttrValue>;

declare type SsrAttrValue = string | Signal<any> | boolean | Object | null;

/** @public */
export declare const SSRComment: FunctionComponent<{
    data: string;
}>;

declare interface SSRContainer extends Container2 {
    readonly tag: string;
    readonly writer: StreamWriter_3;
    readonly prefetchResources: PrefetchResource[];
    readonly serializationCtx: SerializationContext;
    readonly symbolToChunkResolver: SymbolToChunkResolver;
    readonly buildBase: string;
    additionalHeadNodes: Array<JSXNode>;
    additionalBodyNodes: Array<JSXNode>;
    unclaimedProjectionComponentFrameQueue: ISsrComponentFrame[];
    openContainer(): void;
    closeContainer(): void;
    openElement(elementName: string, varAttrs: SsrAttrs | null, constAttrs?: SsrAttrs | null): string | undefined;
    closeElement(): ValueOrPromise<void>;
    openFragment(attrs: SsrAttrs): void;
    closeFragment(): void;
    openProjection(attrs: SsrAttrs): void;
    closeProjection(): void;
    openComponent(attrs: SsrAttrs): void;
    getComponentFrame(projectionDepth: number): ISsrComponentFrame | null;
    getNearestComponentFrame(): ISsrComponentFrame | null;
    closeComponent(): void;
    textNode(text: string): void;
    htmlNode(rawHtml: string): void;
    commentNode(text: string): void;
    addRoot(obj: any): number;
    getLastNode(): ISsrNode;
    addUnclaimedProjection(frame: ISsrComponentFrame, name: string, children: JSXChildren): void;
    isStatic(): boolean;
    render(jsx: JSXOutput): Promise<void>;
    emitQwikLoaderAtTopIfNeeded(): void;
}

/** @public */
export declare type SSRHintProps = {
    dynamic?: boolean;
};

/** @public */
export declare const SSRRaw: FunctionComponent<{
    data: string;
}>;

/** @public */
export declare const SSRStream: FunctionComponent<SSRStreamProps>;

/** @public */
export declare const SSRStreamBlock: FunctionComponent<{
    children?: JSXOutput;
}>;

/** @public */
export declare type SSRStreamChildren = AsyncGenerator<JSXChildren, void, any> | ((stream: StreamWriter) => Promise<void>) | (() => AsyncGenerator<JSXChildren, void, any>);

/** @public */
export declare type SSRStreamProps = {
    children: SSRStreamChildren;
};

declare type StopPropagation = {
    [K in keyof HTMLElementEventMap as `stoppropagation:${K}`]?: boolean;
};

declare interface StoreTracker {
    $proxyMap$: ObjToProxyMap;
    $subsManager$: SubscriptionManager;
    $getObjectById$: (id: string | number) => any;
}

/** @public */
export declare type StreamWriter = {
    write: (chunk: string) => void;
};

declare interface StreamWriter_3 {
    write(chunk: string): void;
}

/** @file Shared types */
/** @internal */
export declare type _Stringifiable = string | boolean | number | null;

declare interface StyleAppend {
    styleId: string;
    content: string | null;
}

/** @public */
export declare interface StyleHTMLAttributes<T extends Element> extends Attrs<'style', T> {
}

declare type Subscriber = HostSubscriber | PropSubscriber | TextSubscriber;

declare abstract class Subscriber_2 {
    $dependencies$: Subscriber_2[] | null;
}

declare type SubscriberEffect = TaskDescriptor | ResourceDescriptor<unknown> | ComputedDescriptor<unknown>;

declare type SubscriberHost = QwikElement;

declare type SubscriberSignal = PropSubscriberWithKey | TextSubscriberWithKey;

/**
 * Top level manager of subscriptions (singleton, attached to DOM Container).
 *
 * Use the `SubscriptionManager` to create a new `LocalSubscriptionManager` for tracking
 * subscriptions.
 */
declare interface SubscriptionManager {
    /** Map of all subscriptions from `Group` to their respective managers. */
    $groupToManagers$: GroupToManagersMap;
    $createManager$(map?: Subscriptions[]): LocalSubscriptionManager;
    $clearSub$: (group: Group) => void;
    $clearSignal$: (signal: SubscriberSignal) => void;
}

declare type Subscriptions = HostSubscriberWithKey | SubscriberSignal;

/** @internal */
export declare const enum SubscriptionType {
    HOST = 0,
    PROP_IMMUTABLE = 1,
    PROP_MUTABLE = 2,
    TEXT_IMMUTABLE = 3,
    TEXT_MUTABLE = 4
}

/**
 * The TS types don't include the SVG attributes so we have to define them ourselves
 *
 * NOTE: These props are probably not complete
 *
 * @public
 */
export declare interface SVGAttributes<T extends Element = Element> extends AriaAttributes {
    color?: string | undefined;
    height?: Size | undefined;
    id?: string | undefined;
    lang?: string | undefined;
    max?: number | string | undefined;
    media?: string | undefined;
    method?: string | undefined;
    min?: number | string | undefined;
    name?: string | undefined;
    style?: CSSProperties | string | undefined;
    target?: string | undefined;
    type?: string | undefined;
    width?: Size | undefined;
    role?: string | undefined;
    tabindex?: number | undefined;
    crossOrigin?: HTMLCrossOriginAttribute;
    'accent-height'?: number | string | undefined;
    accumulate?: 'none' | 'sum' | undefined;
    additive?: 'replace' | 'sum' | undefined;
    'alignment-baseline'?: 'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical' | 'inherit' | undefined;
    allowReorder?: 'no' | 'yes' | undefined;
    alphabetic?: number | string | undefined;
    amplitude?: number | string | undefined;
    'arabic-form'?: 'initial' | 'medial' | 'terminal' | 'isolated' | undefined;
    ascent?: number | string | undefined;
    attributeName?: string | undefined;
    attributeType?: string | undefined;
    autoReverse?: Booleanish | undefined;
    azimuth?: number | string | undefined;
    baseFrequency?: number | string | undefined;
    'baseline-shift'?: number | string | undefined;
    baseProfile?: number | string | undefined;
    bbox?: number | string | undefined;
    begin?: number | string | undefined;
    bias?: number | string | undefined;
    by?: number | string | undefined;
    calcMode?: number | string | undefined;
    'cap-height'?: number | string | undefined;
    clip?: number | string | undefined;
    'clip-path'?: string | undefined;
    clipPathUnits?: number | string | undefined;
    'clip-rule'?: number | string | undefined;
    'color-interpolation'?: number | string | undefined;
    'color-interpolation-filters'?: 'auto' | 's-rGB' | 'linear-rGB' | 'inherit' | undefined;
    'color-profile'?: number | string | undefined;
    'color-rendering'?: number | string | undefined;
    contentScriptType?: number | string | undefined;
    contentStyleType?: number | string | undefined;
    cursor?: number | string;
    cx?: number | string | undefined;
    cy?: number | string | undefined;
    d?: string | undefined;
    decelerate?: number | string | undefined;
    descent?: number | string | undefined;
    diffuseConstant?: number | string | undefined;
    direction?: number | string | undefined;
    display?: number | string | undefined;
    divisor?: number | string | undefined;
    'dominant-baseline'?: number | string | undefined;
    dur?: number | string | undefined;
    dx?: number | string | undefined;
    dy?: number | string | undefined;
    'edge-mode'?: number | string | undefined;
    elevation?: number | string | undefined;
    'enable-background'?: number | string | undefined;
    end?: number | string | undefined;
    exponent?: number | string | undefined;
    externalResourcesRequired?: number | string | undefined;
    fill?: string | undefined;
    'fill-opacity'?: number | string | undefined;
    'fill-rule'?: 'nonzero' | 'evenodd' | 'inherit' | undefined;
    filter?: string | undefined;
    filterRes?: number | string | undefined;
    filterUnits?: number | string | undefined;
    'flood-color'?: number | string | undefined;
    'flood-opacity'?: number | string | undefined;
    focusable?: number | string | undefined;
    'font-family'?: string | undefined;
    'font-size'?: number | string | undefined;
    'font-size-adjust'?: number | string | undefined;
    'font-stretch'?: number | string | undefined;
    'font-style'?: number | string | undefined;
    'font-variant'?: number | string | undefined;
    'font-weight'?: number | string | undefined;
    format?: number | string | undefined;
    fr?: number | string | undefined;
    from?: number | string | undefined;
    fx?: number | string | undefined;
    fy?: number | string | undefined;
    g1?: number | string | undefined;
    g2?: number | string | undefined;
    'glyph-name'?: number | string | undefined;
    'glyph-orientation-horizontal'?: number | string | undefined;
    'glyph-orientation-vertical'?: number | string | undefined;
    glyphRef?: number | string | undefined;
    gradientTransform?: string | undefined;
    gradientUnits?: string | undefined;
    hanging?: number | string | undefined;
    'horiz-adv-x'?: number | string | undefined;
    'horiz-origin-x'?: number | string | undefined;
    href?: string | undefined;
    ideographic?: number | string | undefined;
    'image-rendering'?: number | string | undefined;
    in2?: number | string | undefined;
    in?: string | undefined;
    intercept?: number | string | undefined;
    k1?: number | string | undefined;
    k2?: number | string | undefined;
    k3?: number | string | undefined;
    k4?: number | string | undefined;
    k?: number | string | undefined;
    kernelMatrix?: number | string | undefined;
    kernelUnitLength?: number | string | undefined;
    kerning?: number | string | undefined;
    keyPoints?: number | string | undefined;
    keySplines?: number | string | undefined;
    keyTimes?: number | string | undefined;
    lengthAdjust?: number | string | undefined;
    'letter-spacing'?: number | string | undefined;
    'lighting-color'?: number | string | undefined;
    limitingConeAngle?: number | string | undefined;
    local?: number | string | undefined;
    'marker-end'?: string | undefined;
    markerHeight?: number | string | undefined;
    'marker-mid'?: string | undefined;
    'marker-start'?: string | undefined;
    markerUnits?: number | string | undefined;
    markerWidth?: number | string | undefined;
    mask?: string | undefined;
    maskContentUnits?: number | string | undefined;
    maskUnits?: number | string | undefined;
    mathematical?: number | string | undefined;
    mode?: number | string | undefined;
    numOctaves?: number | string | undefined;
    offset?: number | string | undefined;
    opacity?: number | string | undefined;
    operator?: number | string | undefined;
    order?: number | string | undefined;
    orient?: number | string | undefined;
    orientation?: number | string | undefined;
    origin?: number | string | undefined;
    overflow?: number | string | undefined;
    'overline-position'?: number | string | undefined;
    'overline-thickness'?: number | string | undefined;
    'paint-order'?: number | string | undefined;
    panose1?: number | string | undefined;
    path?: string | undefined;
    pathLength?: number | string | undefined;
    patternContentUnits?: string | undefined;
    patternTransform?: number | string | undefined;
    patternUnits?: string | undefined;
    'pointer-events'?: number | string | undefined;
    points?: string | undefined;
    pointsAtX?: number | string | undefined;
    pointsAtY?: number | string | undefined;
    pointsAtZ?: number | string | undefined;
    preserveAlpha?: number | string | undefined;
    preserveAspectRatio?: string | undefined;
    primitiveUnits?: number | string | undefined;
    r?: number | string | undefined;
    radius?: number | string | undefined;
    refX?: number | string | undefined;
    refY?: number | string | undefined;
    'rendering-intent'?: number | string | undefined;
    repeatCount?: number | string | undefined;
    repeatDur?: number | string | undefined;
    requiredextensions?: number | string | undefined;
    requiredFeatures?: number | string | undefined;
    restart?: number | string | undefined;
    result?: string | undefined;
    rotate?: number | string | undefined;
    rx?: number | string | undefined;
    ry?: number | string | undefined;
    scale?: number | string | undefined;
    seed?: number | string | undefined;
    'shape-rendering'?: number | string | undefined;
    slope?: number | string | undefined;
    spacing?: number | string | undefined;
    specularConstant?: number | string | undefined;
    specularExponent?: number | string | undefined;
    speed?: number | string | undefined;
    spreadMethod?: string | undefined;
    startOffset?: number | string | undefined;
    stdDeviation?: number | string | undefined;
    stemh?: number | string | undefined;
    stemv?: number | string | undefined;
    stitchTiles?: number | string | undefined;
    'stop-color'?: string | undefined;
    'stop-opacity'?: number | string | undefined;
    'strikethrough-position'?: number | string | undefined;
    'strikethrough-thickness'?: number | string | undefined;
    string?: number | string | undefined;
    stroke?: string | undefined;
    'stroke-dasharray'?: string | number | undefined;
    'stroke-dashoffset'?: string | number | undefined;
    'stroke-linecap'?: 'butt' | 'round' | 'square' | 'inherit' | undefined;
    'stroke-linejoin'?: 'miter' | 'round' | 'bevel' | 'inherit' | undefined;
    'stroke-miterlimit'?: string | undefined;
    'stroke-opacity'?: number | string | undefined;
    'stroke-width'?: number | string | undefined;
    surfaceScale?: number | string | undefined;
    systemLanguage?: number | string | undefined;
    tableValues?: number | string | undefined;
    targetX?: number | string | undefined;
    targetY?: number | string | undefined;
    'text-anchor'?: string | undefined;
    'text-decoration'?: number | string | undefined;
    textLength?: number | string | undefined;
    'text-rendering'?: number | string | undefined;
    to?: number | string | undefined;
    transform?: string | undefined;
    u1?: number | string | undefined;
    u2?: number | string | undefined;
    'underline-position'?: number | string | undefined;
    'underline-thickness'?: number | string | undefined;
    unicode?: number | string | undefined;
    'unicode-bidi'?: number | string | undefined;
    'unicode-range'?: number | string | undefined;
    'units-per-em'?: number | string | undefined;
    'v-alphabetic'?: number | string | undefined;
    values?: string | undefined;
    'vector-effect'?: number | string | undefined;
    version?: string | undefined;
    'vert-adv-y'?: number | string | undefined;
    'vert-origin-x'?: number | string | undefined;
    'vert-origin-y'?: number | string | undefined;
    'v-hanging'?: number | string | undefined;
    'v-ideographic'?: number | string | undefined;
    viewBox?: string | undefined;
    viewTarget?: number | string | undefined;
    visibility?: number | string | undefined;
    'v-mathematical'?: number | string | undefined;
    widths?: number | string | undefined;
    'word-spacing'?: number | string | undefined;
    'writing-mode'?: number | string | undefined;
    x1?: number | string | undefined;
    x2?: number | string | undefined;
    x?: number | string | undefined;
    'x-channel-selector'?: string | undefined;
    'x-height'?: number | string | undefined;
    'xlink:actuate'?: string | undefined;
    'xlink:arcrole'?: string | undefined;
    'xlink:href'?: string | undefined;
    'xlink:role'?: string | undefined;
    'xlink:show'?: string | undefined;
    'xlink:title'?: string | undefined;
    'xlink:type'?: string | undefined;
    'xml:base'?: string | undefined;
    'xml:lang'?: string | undefined;
    'xml:space'?: string | undefined;
    xmlns?: string | undefined;
    'xmlns:xlink'?: string | undefined;
    y1?: number | string | undefined;
    y2?: number | string | undefined;
    y?: number | string | undefined;
    yChannelSelector?: string | undefined;
    z?: number | string | undefined;
    zoomAndPan?: string | undefined;
}

/** @public */
export declare interface SVGProps<T extends Element> extends SVGAttributes, QwikAttributes<T> {
}

declare type SymbolToChunkResolver = (symbol: string) => string;

/**
 * Extract function into a synchronously loadable QRL.
 *
 * NOTE: Synchronous QRLs functions can't close over any variables, including exports.
 *
 * @param fn - Function to extract.
 * @returns
 * @alpha
 */
export declare const sync$: <T extends Function>(fn: T) => SyncQRL<T>;

/** @alpha */
export declare interface SyncQRL<TYPE extends Function = any> extends QRL<TYPE> {
    __brand__SyncQRL__: TYPE;
    /**
     * Resolve the QRL of closure and invoke it.
     *
     * @param args - Closure arguments.
     * @returns A return value of the closure.
     */
    (...args: TYPE extends (...args: infer ARGS) => any ? ARGS : never): TYPE extends (...args: any[]) => infer RETURN ? RETURN : never;
    resolved: TYPE;
    dev: QRLDev | null;
}

declare type TableCellSpecialAttrs = {
    align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined;
    height?: Size | undefined;
    width?: Size | undefined;
    valign?: 'top' | 'middle' | 'bottom' | 'baseline' | undefined;
};

/** @public */
export declare interface TableHTMLAttributes<T extends Element> extends Attrs<'table', T> {
}

declare type TargetType = Record<string | symbol, any>;

declare class Task<T = unknown, B = T> extends Subscriber_2 implements DescriptorBase<unknown, Signal<B>> {
    $flags$: number;
    $index$: number;
    $el$: QwikElement;
    $qrl$: QRLInternal<T>;
    $state$: Signal<B> | undefined;
    $destroy$: NoSerialize<() => void> | null;
    constructor($flags$: number, $index$: number, $el$: QwikElement, $qrl$: QRLInternal<T>, $state$: Signal<B> | undefined, $destroy$: NoSerialize<() => void> | null);
}

/** @public */
export declare interface TaskCtx {
    track: Tracker;
    cleanup(callback: () => void): void;
}

declare type TaskDescriptor = DescriptorBase<TaskFn>;

declare const TaskEvent = "qTask";

/** @public */
export declare type TaskFn = (ctx: TaskCtx) => ValueOrPromise<void | (() => void)>;

/** @public */
export declare interface TdHTMLAttributes<T extends Element> extends Attrs<'td', T> {
}

/** @public */
export declare interface TextareaHTMLAttributes<T extends Element> extends Attrs<'textarea', T> {
}

/** Used with derived signal on text node: `<span>{signal}</span>` */
declare type TextSubscriber = readonly [
type: SubscriptionType.TEXT_IMMUTABLE | SubscriptionType.TEXT_MUTABLE,
host: SubscriberHost | Text,
signal: Signal,
elm: Node | QwikElement
];

declare type TextSubscriberWithKey = [...TextSubscriber, key: string | undefined];

/** @internal */
export declare type _TextVNode = [
_VNodeFlags.Text | _VNodeFlags.Inflated,
// 0 - Flags
_VNode | null,
///////////////// 1 - Parent
_VNode | null,
///////////////// 2 - Previous sibling
_VNode | null,
///////////////// 3 - Next sibling
Text | null | undefined,
string
] & {
    __brand__: 'TextVNode';
};

/** @public */
export declare interface ThHTMLAttributes<T extends Element> extends Attrs<'tr', T> {
}

/** @public */
export declare interface TimeHTMLAttributes<T extends Element> extends Attrs<'time', T> {
}

/** @public */
export declare interface TitleHTMLAttributes<T extends Element> extends Attrs<'title', T> {
}

/**
 * Used to signal to Qwik which state should be watched for changes.
 *
 * The `Tracker` is passed into the `taskFn` of `useTask`. It is intended to be used to wrap state
 * objects in a read proxy which signals to Qwik which properties should be watched for changes. A
 * change to any of the properties causes the `taskFn` to rerun.
 *
 * ### Example
 *
 * The `obs` passed into the `taskFn` is used to mark `state.count` as a property of interest. Any
 * changes to the `state.count` property will cause the `taskFn` to rerun.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const store = useStore({ count: 0, doubleCount: 0 });
 *   const signal = useSignal(0);
 *   useTask$(({ track }) => {
 *     // Any signals or stores accessed inside the task will be tracked
 *     const count = track(() => store.count);
 *     // You can also pass a signal to track() directly
 *     const signalCount = track(signal);
 *     store.doubleCount = count + signalCount;
 *   });
 *   return (
 *     <div>
 *       <span>
 *         {store.count} / {store.doubleCount}
 *       </span>
 *       <button
 *         onClick$={() => {
 *           store.count++;
 *           signal.value++;
 *         }}
 *       >
 *         +
 *       </button>
 *     </div>
 *   );
 * });
 * ```
 *
 * @public
 * @see `useTask`
 */
export declare interface Tracker {
    /**
     * Include the expression using stores / signals to track:
     *
     * ```tsx
     * track(() => store.count);
     * ```
     *
     * The `track()` function also returns the value of the scoped expression:
     *
     * ```tsx
     * const count = track(() => store.count);
     * ```
     */
    <T>(fn: () => T): T;
    /**
     * Used to track the whole object. If any property of the passed store changes, the task will be
     * scheduled to run. Also accepts signals.
     *
     * Note that the change tracking is not deep. If you want to track changes to nested properties,
     * you need to use `track` on each of them.
     *
     * ```tsx
     * track(store); // returns store
     * track(signal); // returns signal.value
     * ```
     */
    <T extends object>(obj: T): T extends Signal<infer U> ? U : T;
    /**
     * Used to track to track a specific property of an object.
     *
     * Note that the change tracking is not deep. If you want to track changes to nested properties,
     * you need to use `track` on each of them.
     *
     * ```tsx
     * track(store, 'propA'); // returns store.propA
     * ```
     */
    <T extends object, P extends keyof T>(obj: T, prop: P): T[P];
}

/** @public */
export declare interface TrackHTMLAttributes<T extends Element> extends Attrs<'track', T> {
}

/**
 * Don't track listeners for this callback
 *
 * @public
 */
export declare const untrack: <T>(fn: () => T) => T;

declare type UnwantedKeys = keyof HTMLAttributesBase | keyof DOMAttributes<any> | keyof ARIAMixin | keyof GlobalEventHandlers | 'enterKeyHint' | 'innerText' | 'innerHTML' | 'outerHTML' | 'inputMode' | 'outerText' | 'nodeValue' | 'textContent';

/** @public */
export declare const useComputed$: Computed;

/** @public */
export declare const useComputedQrl: ComputedQRL;

/**
 * Stores a value which is retained for the lifetime of the component.
 *
 * If the value is a function, the function is invoked to calculate the actual value.
 *
 * @deprecated This is a technology preview
 * @public
 */
export declare const useConstant: <T>(value: (() => T) | T) => T;

declare interface UseContext {
    <STATE, T>(context: ContextId<STATE>, transformer: (value: STATE) => T): T;
    <STATE, T>(context: ContextId<STATE>, defaultValue: T): STATE | T;
    <STATE>(context: ContextId<STATE>): STATE;
}

/**
 * Retrieve Context value.
 *
 * Use `useContext()` to retrieve the value of context in a component. To retrieve a value a parent
 * component needs to invoke `useContextProvider()` to assign a value.
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
 *
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
 * Context is a way to pass stores to the child components without prop-drilling. Note that scalar
 * values are allowed, but for reactivity you need signals or stores.
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
 *
 * @param context - The context to assign a value to.
 * @param value - The value to assign to the context.
 * @public
 */
export declare const useContextProvider: <STATE>(context: ContextId<STATE>, newValue: STATE) => void;

/** @public */
export declare const useErrorBoundary: () => Readonly<ErrorBoundaryStore>;

/** @public */
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
 * @public
 * @see `useOn`, `useOnWindow`, `useOnDocument`.
 */
export declare const useOn: <T extends KnownEventNames>(event: T | T[], eventQrl: EventQRL<T>) => void;

/**
 * Register a listener on `document`.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX.
 *
 * @public
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
 */
export declare const useOnDocument: <T extends KnownEventNames>(event: T | T[], eventQrl: EventQRL<T>) => void;

/**
 * Register a listener on `window`.
 *
 * Used to programmatically add event listeners. Useful from custom `use*` methods, which do not
 * have access to the JSX.
 *
 * @public
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
 */
export declare const useOnWindow: <T extends KnownEventNames>(event: T | T[], eventQrl: EventQRL<T>) => void;

/**
 * This method works like an async memoized function that runs whenever some tracked value changes
 * and returns some data.
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
 * Example showing how `useResource` to perform a fetch to request the weather, whenever the input
 * city name changes.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const cityS = useSignal('');
 *
 *   const weatherResource = useResource$(async ({ track, cleanup }) => {
 *     const cityName = track(cityS);
 *     const abortController = new AbortController();
 *     cleanup(() => abortController.abort('cleanup'));
 *     const res = await fetch(`http://weatherdata.com?city=${cityName}`, {
 *       signal: abortController.signal,
 *     });
 *     const data = await res.json();
 *     return data as { temp: number };
 *   });
 *
 *   return (
 *     <div>
 *       <input name="city" bind:value={cityS} />
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
 * @public
 * @see Resource
 * @see ResourceReturn
 */
export declare const useResource$: <T>(generatorFn: ResourceFn<T>, opts?: ResourceOptions) => ResourceReturn<T>;

/**
 * This method works like an async memoized function that runs whenever some tracked value changes
 * and returns some data.
 *
 * `useResource` however returns immediate a `ResourceReturn` object that contains the data and a
 * state that indicates if the data is available or not.
 *
 * The status can be one of the following:
 *
 * - `pending` - the data is not yet available.
 * - `resolved` - the data is available.
 * - `rejected` - the data is not available due to an error or timeout.
 *
 * Avoid using a `try/catch` statement in `useResource$`. If you catch the error instead of passing
 * it, the resource status will never be `rejected`.
 *
 * ### Example
 *
 * Example showing how `useResource` to perform a fetch to request the weather, whenever the input
 * city name changes.
 *
 * ```tsx
 * const Cmp = component$(() => {
 *   const cityS = useSignal('');
 *
 *   const weatherResource = useResource$(async ({ track, cleanup }) => {
 *     const cityName = track(cityS);
 *     const abortController = new AbortController();
 *     cleanup(() => abortController.abort('cleanup'));
 *     const res = await fetch(`http://weatherdata.com?city=${cityName}`, {
 *       signal: abortController.signal,
 *     });
 *     const data = await res.json();
 *     return data as { temp: number };
 *   });
 *
 *   return (
 *     <div>
 *       <input name="city" bind:value={cityS} />
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
 * @public
 * @see Resource
 * @see ResourceReturn
 */
export declare const useResourceQrl: <T>(qrl: QRL<ResourceFn<T>>, opts?: ResourceOptions) => ResourceReturn<T>;

/** @public */
export declare function useServerData<T>(key: string): T | undefined;

/** @public */
export declare function useServerData<T, B = T>(key: string, defaultValue: B): T | B;

/** @public */
export declare interface UseSignal {
    <T>(): Signal2<T | undefined>;
    <T>(value: T | (() => T)): Signal2<T>;
}

/** @public */
export declare const useSignal: UseSignal;

/**
 * Creates an object that Qwik can track across serializations.
 *
 * Use `useStore` to create a state for your application. The returned object is a proxy that has a
 * unique ID. The ID of the object is used in the `QRL`s to refer to the store.
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

/** @public */
export declare interface UseStoreOptions {
    /** If `true` then all nested objects and arrays will be tracked as well. Default is `true`. */
    deep?: boolean;
    /** If `false` then the object will not be tracked for changes. Default is `true`. */
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
 * @public
 * @see `useStylesScoped`
 */
export declare const useStyles$: (qrl: string) => UseStyles;

/** @public */
declare interface UseStyles {
    styleId: string;
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
 * @public
 * @see `useStylesScoped`
 */
export declare const useStylesQrl: (styles: QRL<string>) => UseStyles;

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
 * @public
 * @see `useStyles`
 */
export declare const useStylesScoped$: (qrl: string) => UseStylesScoped;

/** @public */
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
 * @public
 * @see `useStyles`
 */
export declare const useStylesScopedQrl: (styles: QRL<string>) => UseStylesScoped;

/**
 * Reruns the `taskFn` when the observed inputs change.
 *
 * Use `useTask` to observe changes on a set of inputs, and then re-execute the `taskFn` when those
 * inputs change.
 *
 * The `taskFn` only executes if the observed inputs change. To observe the inputs, use the `obs`
 * function to wrap property reads. This creates subscriptions that will trigger the `taskFn` to
 * rerun.
 *
 * @param task - Function which should be re-executed when changes to the inputs are detected
 * @public
 *
 * ### Example
 *
 * The `useTask` function is used to observe the `store.count` property. Any changes to the
 * `store.count` cause the `taskFn` to execute which in turn updates the `store.doubleCount` to
 * the double of `store.count`.
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
 * @public
 * @see `Tracker`
 */
export declare const useTask$: (qrl: TaskFn, opts?: UseTaskOptions | undefined) => void;

/** @public */
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
 * Use `useTask` to observe changes on a set of inputs, and then re-execute the `taskFn` when those
 * inputs change.
 *
 * The `taskFn` only executes if the observed inputs change. To observe the inputs, use the `obs`
 * function to wrap property reads. This creates subscriptions that will trigger the `taskFn` to
 * rerun.
 *
 * @param task - Function which should be re-executed when changes to the inputs are detected
 * @public
 *
 * ### Example
 *
 * The `useTask` function is used to observe the `store.count` property. Any changes to the
 * `store.count` cause the `taskFn` to execute which in turn updates the `store.doubleCount` to
 * the double of `store.count`.
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
 * @public
 * @see `Tracker`
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
export declare const useVisibleTask$: (qrl: TaskFn, opts?: OnVisibleTaskOptions | undefined) => void;

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
 *
 * @public
 */
export declare type ValueOrPromise<T> = T | Promise<T>;

/** @internal */
export declare const _VAR_PROPS: unique symbol;

/** @internal */
export declare const _verifySerializable: <T>(value: T, preMessage?: string) => T;

/**
 * 2.0.0-0-dev+1da95e2
 *
 * @public
 */
export declare const version: string;

/** @public */
export declare interface VideoHTMLAttributes<T extends Element> extends Attrs<'video', T> {
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

/** @internal */
export declare type _VirtualVNode = [
_VNodeFlags.Virtual,
///////////// 0 - Flags
_VNode | null,
/////////////// 1 - Parent
_VNode | null,
/////////////// 2 - Previous sibling
_VNode | null,
/////////////// 3 - Next sibling
_VNode | null,
/////////////// 4 - First child
_VNode | null,
...(string | null)[]
] & {
    __brand__: 'FragmentNode' & 'HostElement';
};

/** @public */
export declare type VisibleTaskStrategy = 'intersection-observer' | 'document-ready' | 'document-idle';

/** @internal */
export declare type _VNode = _ElementVNode | _TextVNode | _VirtualVNode;

/**
 * Flags for VNode.
 *
 * # Materialize vs Inflation
 *
 * - Materialized: The node has all of its children. Specifically `firstChild`/`lastChild` are NOT
 *   `undefined`. Materialization creates lazy instantiation of the children. NOTE: Only
 *   ElementVNode need to be materialized.
 * - Inflation:
 *
 *   - If Text: It means that it is safe to write to the node. When Text nodes are first Deserialized
 *       multiple text nodes can share the same DOM node. On write the sibling text nodes need to be
 *       converted into separate text nodes.
 *   - If Element: It means that the element tag attributes have not yet been read from the DOM.
 *
 * Inflation and materialization are not the same, they are two independent things.
 *
 * @internal
 */
export declare const enum _VNodeFlags {
    Element = 1,
    Virtual = 2,
    ELEMENT_OR_VIRTUAL_MASK = 3,
    ELEMENT_OR_TEXT_MASK = 5,
    TYPE_MASK = 7,
    INFLATED_TYPE_MASK = 15,
    Text = 4,
    Inflated = 8,
    Resolved = 16,
    Deleted = 32,
    NAMESPACE_MASK = 192,
    NEGATED_NAMESPACE_MASK = -193,
    NS_html = 0,// http://www.w3.org/1999/xhtml
    NS_svg = 64,// http://www.w3.org/2000/svg
    NS_math = 128
}

declare type VNodeJournal = Array<VNodeJournalOpCode | Document | Element | Text | string | null>;

/**
 * Fundamental DOM operations are:
 *
 * - Insert new DOM element/text
 * - Remove DOM element/text
 * - Set DOM element attributes
 * - Set text node value
 */
declare const enum VNodeJournalOpCode {
    SetText = 1,// ------ [SetAttribute, target, text]
    SetAttribute = 2,// - [SetAttribute, target, ...(key, values)]]
    HoistStyles = 3,// -- [HoistStyles, document]
    Remove = 4,// ------- [Insert, target(parent), ...nodes]
    Insert = 5
}

/** @internal */
export declare const _waitUntilRendered: (elm: Element) => Promise<void>;

/** @internal */
export declare function _walkJSX(ssr: SSRContainer, value: JSXOutput, allowPromises: true, currentStyleScoped: string | null): ValueOrPromise<void>;

/** @internal */
export declare function _walkJSX(ssr: SSRContainer, value: JSXOutput, allowPromises: false, currentStyleScoped: string | null): false;

/** @internal */
export declare const _weakSerialize: <T extends object>(input: T) => Partial<T>;

/**
 * @deprecated This is the type for a React Native WebView. It doesn't belong in Qwik (yet?) but
 *   we're keeping it for backwards compatibility.
 * @public
 */
export declare interface WebViewHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
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

declare class WrappedSignal<T> extends Signal2_2<T> {
    $args$: any[];
    $func$: (...args: any[]) => T;
    $funcStr$: string | null;
    $invalid$: boolean;
    constructor(container: Container2 | null, fn: (...args: any[]) => T, args: any[], fnStr: string | null);
    $invalidate$(): void;
    /**
     * Use this to force running subscribers, for example when the calculated value has mutated but
     * remained the same object
     */
    force(): void;
    get untrackedValue(): T;
    private $computeIfNeeded$;
    get value(): any;
    set value(_: any);
}

/** @internal */
export declare const _wrapProp: <T extends Record<any, any>, P extends keyof T>(obj: T, prop?: P | undefined) => any;

/** @internal @deprecated v1 compat */
export declare const _wrapSignal: <T extends Record<any, any>, P extends keyof T>(obj: T, prop: P) => any;

export { }
