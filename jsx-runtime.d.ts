import * as CSS_2 from 'csstype';

declare type AllEventMaps = HTMLElementEventMap & DocumentEventMap & WindowEventHandlersEventMap & {
    qvisible: QwikVisibleEvent;
    qsymbol: QwikSymbolEvent;
};

declare type AllPascalEventMaps = PascalMap<AllEventMaps>;

declare type AnchorAttrs = Augmented<HTMLAnchorElement, {
    download?: any;
    target?: HTMLAttributeAnchorTarget | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}>;

declare type AreaAttrs = Augmented<HTMLAreaElement, {
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}>;

/**
 * TS defines these with the React syntax which is not compatible with Qwik. E.g. `ariaAtomic`
 * instead of `aria-atomic`.
 *
 * @public
 */
declare interface AriaAttributes {
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
declare type AriaRole = 'alert' | 'alertdialog' | 'application' | 'article' | 'banner' | 'button' | 'cell' | 'checkbox' | 'columnheader' | 'combobox' | 'complementary' | 'contentinfo' | 'definition' | 'dialog' | 'directory' | 'document' | 'feed' | 'figure' | 'form' | 'grid' | 'gridcell' | 'group' | 'heading' | 'img' | 'link' | 'list' | 'listbox' | 'listitem' | 'log' | 'main' | 'marquee' | 'math' | 'menu' | 'menubar' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'navigation' | 'none' | 'note' | 'option' | 'presentation' | 'progressbar' | 'radio' | 'radiogroup' | 'region' | 'row' | 'rowgroup' | 'rowheader' | 'scrollbar' | 'search' | 'searchbox' | 'separator' | 'slider' | 'spinbutton' | 'status' | 'switch' | 'tab' | 'table' | 'tablist' | 'tabpanel' | 'term' | 'textbox' | 'timer' | 'toolbar' | 'tooltip' | 'tree' | 'treegrid' | 'treeitem' | (string & {});

declare type AudioAttrs = Augmented<HTMLAudioElement, {
    crossOrigin?: HTMLCrossOriginAttribute;
}>;

/**
 * Replace given element's props with custom types and return all props specific to the element. Use
 * this for known props that are incorrect or missing.
 *
 * Uses Prettify so we see the special props for each element in editor hover
 */
declare type Augmented<E, A = {}> = Prettify<Filtered<E, A> & A>;

declare type BadOnes<T> = Extract<{
    [K in keyof T]: T[K] extends (...args: any) => any ? K : K extends string ? K extends Uppercase<K> ? K : never : never;
}[keyof T] | ReadonlyKeysOf<T> | keyof HTMLAttributesBase<any> | keyof ARIAMixin | keyof GlobalEventHandlers | 'enterKeyHint' | 'innerText' | 'inputMode' | 'onfullscreenchange' | 'onfullscreenerror' | 'outerText' | 'textContent', string>;

declare type BaseAttrs = Augmented<HTMLBaseElement, {}>;

declare type BaseClassList = string | undefined | null | false | Record<string, boolean | string | number | null | undefined> | BaseClassList[];

/**
 * Allows for Event Handlers to by typed as QwikEventMap[Key] or Event
 * https://stackoverflow.com/questions/52667959/what-is-the-purpose-of-bivariancehack-in-typescript-types/52668133#52668133
 *
 * It would be great if we could override the type of EventTarget to be EL, but that gives problems
 * with assigning a user-provided `QRL<(ev: Event)=>void>` because Event doesn't match the extended
 * `Event & {target?: EL}` type.
 */
declare type BivariantEventHandler<T extends Event, EL> = {
    bivarianceHack(event: T, element: EL): any;
}['bivarianceHack'];

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
declare type Booleanish = boolean | `${boolean}`;

declare type ButtonAttrs = Augmented<HTMLButtonElement, {
    form?: string | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
}>;

declare type CanvasAttrs = Augmented<HTMLCanvasElement, {
    height?: Size | undefined;
    width?: Size | undefined;
}>;

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
declare type ClassList = BaseClassList | BaseClassList[];

declare type ColAttrs = Augmented<HTMLTableColElement, {
    width?: Size | undefined;
}>;

/** @public */
declare interface CSSProperties extends CSS_2.Properties<string | number>, CSS_2.PropertiesHyphen<string | number> {
    /**
     * The index signature was removed to enable closed typing for style using CSSType. You're able to
     * use type assertion or module augmentation to add properties or an index signature of your own.
     *
     * For examples and more information, visit:
     * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
     */
    [v: `--${string}`]: string | number | undefined;
}

declare type DataAttrs = Augmented<HTMLDataElement, {
    value?: string | ReadonlyArray<string> | number | undefined;
}>;

/** @public */
declare interface DevJSX {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
    stack?: string;
}

/** @public */
declare interface DOMAttributes<T extends Element, Children = JSXChildren> extends QwikProps<T>, QwikEvents<T> {
    children?: Children;
    key?: string | number | null | undefined;
}

declare type EmbedAttrs = Augmented<HTMLEmbedElement, {
    height?: Size | undefined;
    width?: Size | undefined;
    children?: undefined;
}>;

declare type FieldSetAttrs = Augmented<HTMLFieldSetElement, {
    form?: string | undefined;
}>;

/**
 * Filter out "any" value types and non-string keys from an object, currently only for
 * HTMLFormElement
 */
declare type FilterAny<T> = {
    [K in keyof T as any extends T[K] ? never : K extends string ? K : never]: T[K];
};

/** Only keep props that are specific to the element */
declare type Filtered<T, A = {}> = {
    [K in keyof Omit<FilterAny<T>, keyof HTMLAttributes<any> | BadOnes<FilterAny<T>> | keyof A>]?: T[K];
};

/** @public */
export declare const Fragment: FunctionComponent<{
    children?: any;
    key?: string | number | null;
}>;

/** @public */
export declare interface FunctionComponent<P extends Record<any, any> = Record<any, unknown>> {
    (props: P, key: string | null, flags: number, dev?: DevJSX): JSXNode | null;
}

/** @public */
declare type HTMLAttributeAnchorTarget = '_self' | '_blank' | '_parent' | '_top' | (string & {});

/** @public */
declare type HTMLAttributeReferrerPolicy = ReferrerPolicy;

/** @public */
declare interface HTMLAttributes<E extends Element, Children = JSXChildren> extends HTMLAttributesBase<E, Children>, Partial<Omit<HTMLElement, BadOnes<HTMLElement>>> {
}

declare interface HTMLAttributesBase<E extends Element, Children = JSXChildren> extends AriaAttributes, DOMAttributes<E, Children> {
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
}

/** @public */
declare type HTMLCrossOriginAttribute = 'anonymous' | 'use-credentials' | '' | undefined;

/** @public */
declare type HTMLInputAutocompleteAttribute = 'on' | 'off' | 'billing' | 'shipping' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' | 'honorific-suffix' | 'nickname' | 'username' | 'new-password' | 'current-password' | 'one-time-code' | 'organization-title' | 'organization' | 'street-address' | 'address-line1' | 'address-line2' | 'address-line3' | 'address-level4' | 'address-level3' | 'address-level2' | 'address-level1' | 'country' | 'country-name' | 'postal-code' | 'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name' | 'cc-number' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type' | 'transaction-currency' | 'transaction-amount' | 'language' | 'bday' | 'bday-day' | 'bday-month' | 'bday-year' | 'sex' | 'url' | 'photo';

/** @public */
declare type HTMLInputTypeAttribute = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week' | (string & {});

declare type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

declare type IframeAttrs = Augmented<HTMLIFrameElement, {
    allowTransparency?: boolean | undefined;
    /** @deprecated Deprecated */
    frameBorder?: number | string | undefined;
    height?: Size | undefined;
    loading?: 'eager' | 'lazy' | undefined;
    sandbox?: string | undefined;
    seamless?: boolean | undefined;
    width?: Size | undefined;
    children?: undefined;
}>;

declare type ImgAttrs = Augmented<HTMLImageElement, {
    crossOrigin?: HTMLCrossOriginAttribute;
    /** Intrinsic height of the image in pixels. */
    height?: Numberish | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    /** Intrinsic width of the image in pixels. */
    width?: Numberish | undefined;
}>;

declare type InputAttrs = Augmented<HTMLInputElement, {
    autoComplete?: HTMLInputAutocompleteAttribute | Omit<HTMLInputAutocompleteAttribute, string> | undefined;
    'bind:checked'?: Signal<boolean | undefined>;
    enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
    height?: Size | undefined;
    max?: number | string | undefined;
    maxLength?: number | undefined;
    min?: number | string | undefined;
    minLength?: number | undefined;
    step?: number | string | undefined;
    type?: HTMLInputTypeAttribute | undefined;
    value?: string | ReadonlyArray<string> | number | undefined | null | FormDataEntryValue;
    'bind:value'?: Signal<string | undefined>;
    width?: Size | undefined;
}>;

/** @public */
declare interface IntrinsicHTMLElements extends QwikHTMLExceptions, PlainHTMLElements {
}

/** @public */
declare const jsx: <T extends string | FunctionComponent<any>>(type: T, props: T extends FunctionComponent<infer PROPS extends Record<any, any>> ? PROPS : Record<any, unknown>, key?: string | number | null) => JSXNode<T>;
export { jsx }
export { jsx as jsxs }

/** @public */
declare namespace JSX_2 {
    interface Element extends JSXNode {
    }
    interface IntrinsicAttributes extends QwikIntrinsicAttributes {
    }
    interface ElementChildrenAttribute {
        children: any;
    }
    interface IntrinsicElements extends QwikIntrinsicElements {
    }
}
export { JSX_2 as JSX }

/** @public */
declare type JSXChildren = string | number | boolean | null | undefined | Function | RegExp | JSXChildren[] | Promise<JSXChildren> | Signal<JSXChildren> | JSXNode;

/** @public */
export declare const jsxDEV: <T extends string | FunctionComponent<Record<any, unknown>>>(type: T, props: T extends FunctionComponent<infer PROPS extends Record<any, any>> ? PROPS : Record<any, unknown>, key: string | number | null | undefined, _isStatic: boolean, opts: JsxDevOpts, _ctx: unknown) => JSXNode<T>;

declare interface JsxDevOpts {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
}

/** @public */
export declare interface JSXNode<T = string | FunctionComponent> {
    type: T;
    props: T extends FunctionComponent<infer B> ? B : Record<any, unknown>;
    immutableProps: Record<any, unknown> | null;
    children: JSXChildren | null;
    flags: number;
    key: string | null;
    dev?: DevJSX;
}

/** @public */
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

declare type LabelAttrs = Augmented<HTMLLabelElement, {
    form?: string | undefined;
    for?: string | undefined;
    /** @deprecated Use `for` */
    htmlFor?: string | undefined;
}>;

declare type LcEventNameMap = {
    [name in PascalCaseNames as Lowercase<name>]: name;
};

declare type LiAttrs = Augmented<HTMLLIElement, {
    value?: string | ReadonlyArray<string> | number | undefined;
}>;

declare type LinkAttrs = Augmented<HTMLLinkElement, {
    crossOrigin?: HTMLCrossOriginAttribute;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    sizes?: string | undefined;
    type?: string | undefined;
    charSet?: string | undefined;
}>;

declare type MetaAttrs = Augmented<HTMLMetaElement, {
    charSet?: string | undefined;
}>;

declare type MeterAttrs = Augmented<HTMLMeterElement, {
    form?: string | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
}>;

/** @public */
declare type NativeEventHandler<T extends Event = Event, EL = Element> = BivariantEventHandler<T, EL> | QRL<BivariantEventHandler<T, EL>>[];

/** @public */
declare type Numberish = number | `${number}`;

declare type ObjectAttrs = Augmented<HTMLObjectElement, {
    classID?: string | undefined;
    form?: string | undefined;
    height?: Size | undefined;
    width?: Size | undefined;
    wmode?: string | undefined;
}>;

declare type OlAttrs = Augmented<HTMLOListElement, {
    type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined;
}>;

declare type OptionAttrs = Augmented<HTMLOptionElement, {
    value?: string | ReadonlyArray<string> | number | undefined;
}>;

declare type OutputAttrs = Augmented<HTMLOutputElement, {
    form?: string | undefined;
    for?: string | undefined;
    /** @deprecated Use `for` instead */
    htmlFor?: string | undefined;
}>;

/**
 * Capitalized multi-word names of some known events so we have nicer qwik attributes. For example,
 * instead of `oncompositionEnd$` we can use `onCompositionEnd$`. Note that any capitalization
 * works, so `oncompositionend$` is also valid. This is just for DX.
 *
 * Add any multi-word event names to this list. Single word events are automatically converted.
 */
declare type PascalCaseNames = 'AnimationEnd' | 'AnimationIteration' | 'AnimationStart' | 'AuxClick' | 'CanPlay' | 'CanPlayThrough' | 'CompositionEnd' | 'CompositionStart' | 'CompositionUpdate' | 'ContextMenu' | 'DblClick' | 'DragEnd' | 'DragEnter' | 'DragExit' | 'DragLeave' | 'DragOver' | 'DragStart' | 'DurationChange' | 'FocusIn' | 'FocusOut' | 'FullscreenChange' | 'FullscreenError' | 'GotPointerCapture' | 'KeyDown' | 'KeyPress' | 'KeyUp' | 'LoadedData' | 'LoadedMetadata' | 'LoadEnd' | 'LoadStart' | 'LostPointerCapture' | 'MouseDown' | 'MouseEnter' | 'MouseLeave' | 'MouseMove' | 'MouseOut' | 'MouseOver' | 'MouseUp' | 'PointerCancel' | 'PointerDown' | 'PointerEnter' | 'PointerLeave' | 'PointerMove' | 'PointerOut' | 'PointerOver' | 'PointerUp' | 'RateChange' | 'RateChange' | 'SecurityPolicyViolation' | 'SelectionChange' | 'SelectStart' | 'TimeUpdate' | 'TouchCancel' | 'TouchEnd' | 'TouchMove' | 'TouchStart' | 'TransitionCancel' | 'TransitionEnd' | 'TransitionRun' | 'TransitionStart' | 'VisibilityChange' | 'VolumeChange';

/**
 * Convert an event map to PascalCase. For example, `HTMLElementEventMap` contains lowercase keys,
 * so this will capitalize them, and use the `LcEventNameMap` for multi-word events names.
 */
declare type PascalMap<M> = {
    [K in Extract<keyof M, string> as K extends keyof LcEventNameMap ? LcEventNameMap[K] : Capitalize<K>]: M[K];
};

declare type PlainHTMLElements = {
    [key in keyof Omit<HTMLElementTagNameMap, keyof QwikHTMLExceptions>]: HTMLAttributes<HTMLElementTagNameMap[key]> & Prettify<Filtered<HTMLElementTagNameMap[key], {}>>;
};

declare type Prettify<T> = {} & {
    [K in keyof T]: T[K];
};

declare type PreventDefault<T = any> = {
    [K in keyof HTMLElementEventMap as `preventdefault:${K}`]?: boolean;
};

declare type ProgressAttrs = Augmented<HTMLProgressElement, {
    max?: number | string | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
}>;

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
declare type QRL<TYPE = unknown> = {
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

declare type QrlArgs<T> = T extends (...args: infer ARGS) => any ? ARGS : unknown[];

/** @public */
declare interface QRLDev {
    file: string;
    lo: number;
    hi: number;
}

declare type QrlReturn<T> = T extends (...args: any) => infer R ? Awaited<R> : unknown;

declare interface QwikCustomEvents<El> {
    [key: `${'document:' | 'window:' | ''}on${string}$`]: SingleOrArray<NativeEventHandler<Event, El>> | SingleOrArray<Function> | SingleOrArray<undefined> | null;
}

/** All unknown attributes are allowed */
declare interface QwikCustomHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    [key: string]: any;
}

/**
 * Any custom DOM element.
 *
 * @public
 */
declare interface QwikCustomHTMLElement extends Element {
}

/** @public */
declare interface QwikEvents<T> extends QwikKnownEvents<T>, QwikCustomEvents<T> {
}

declare interface QwikHTMLExceptions {
    a: HTMLAttributes<HTMLAnchorElement> & AnchorAttrs;
    area: HTMLAttributes<HTMLAreaElement, false> & AreaAttrs;
    audio: HTMLAttributes<HTMLAudioElement> & AudioAttrs;
    base: HTMLAttributes<HTMLBaseElement, undefined> & BaseAttrs;
    button: HTMLAttributes<HTMLButtonElement> & ButtonAttrs;
    canvas: HTMLAttributes<HTMLCanvasElement> & CanvasAttrs;
    col: HTMLAttributes<HTMLTableColElement, undefined> & ColAttrs;
    data: HTMLAttributes<HTMLDataElement> & DataAttrs;
    embed: HTMLAttributes<HTMLEmbedElement, undefined> & EmbedAttrs;
    fieldset: HTMLAttributes<HTMLFieldSetElement> & FieldSetAttrs;
    hr: HTMLAttributes<HTMLHRElement, undefined>;
    iframe: HTMLAttributes<HTMLIFrameElement> & IframeAttrs;
    img: HTMLAttributes<HTMLImageElement, undefined> & ImgAttrs;
    input: HTMLAttributes<HTMLInputElement, undefined> & InputAttrs;
    keygen: KeygenHTMLAttributes<HTMLElement>;
    label: HTMLAttributes<HTMLLabelElement> & LabelAttrs;
    li: HTMLAttributes<HTMLLIElement> & LiAttrs;
    link: HTMLAttributes<HTMLLinkElement, undefined> & LinkAttrs;
    meta: HTMLAttributes<HTMLMetaElement> & MetaAttrs;
    meter: HTMLAttributes<HTMLMeterElement> & MeterAttrs;
    object: HTMLAttributes<HTMLObjectElement> & ObjectAttrs;
    ol: HTMLAttributes<HTMLOListElement> & OlAttrs;
    option: HTMLAttributes<HTMLOptionElement, string> & OptionAttrs;
    output: HTMLAttributes<HTMLOutputElement> & OutputAttrs;
    progress: HTMLAttributes<HTMLProgressElement> & ProgressAttrs;
    script: HTMLAttributes<HTMLScriptElement> & ScriptAttrs;
    select: HTMLAttributes<HTMLSelectElement> & SelectAttrs;
    source: HTMLAttributes<HTMLSourceElement, undefined> & SourceAttrs;
    style: HTMLAttributes<HTMLStyleElement, string> & StyleAttrs;
    table: HTMLAttributes<HTMLTableElement> & TableAttrs;
    td: HTMLAttributes<HTMLTableCellElement> & TableCellAttrs;
    textarea: HTMLAttributes<HTMLTextAreaElement, undefined> & TextareaAttrs;
    th: HTMLAttributes<HTMLTableCellElement> & TableCellAttrs;
    title: HTMLAttributes<HTMLTitleElement, string>;
    track: HTMLAttributes<HTMLTrackElement, undefined> & TrackAttrs;
    video: VideoHTMLAttributes<HTMLVideoElement> & VideoAttrs;
}

/** @public */
declare interface QwikIntrinsicAttributes {
    key?: string | number | undefined | null;
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
 * @public
 */
declare interface QwikIntrinsicElements extends IntrinsicHTMLElements {
    /**
     * Custom DOM elements can have any name We need to add the empty object to match the type with
     * the Intrinsic elements
     */
    [key: string]: {} | QwikCustomHTMLAttributes<QwikCustomHTMLElement>;
}

declare type QwikKnownEvents<T> = {
    [K in keyof AllPascalEventMaps as `${'document:' | 'window:' | ''}on${K}$`]?: SingleOrArray<NativeEventHandler<AllPascalEventMaps[K], T>> | null;
};

declare interface QwikProps<T extends Element> extends PreventDefault {
    class?: ClassList | Signal<ClassList> | undefined;
    dangerouslySetInnerHTML?: string | undefined;
    ref?: Ref<T> | undefined;
    /** Corresponding slot name used to project the element into. */
    'q:slot'?: string;
}

/** Emitted by qwik-loader when a module was lazily loaded @public */
declare type QwikSymbolEvent = CustomEvent<{
    symbol: string;
    element: Element;
    reqTime: number;
}>;

/** Emitted by qwik-loader when an element becomes visible. Used by `useVisibleTask$` @public */
declare type QwikVisibleEvent = CustomEvent<IntersectionObserverEntry>;

declare type ReadonlyKeysOf<T> = {
    [P in keyof T]: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, never, P>;
}[keyof T];

/**
 * A ref can be either a signal or a function. Note that the type of Signal is Element so that it
 * can accept more specialized elements too
 *
 * @public
 */
declare type Ref<T extends Element = Element> = Signal<Element | undefined> | RefFnInterface<T>;

declare type RefFnInterface<T> = {
    (el: T): void;
};

declare type ScriptAttrs = Augmented<HTMLScriptElement, {
    crossOrigin?: HTMLCrossOriginAttribute;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}>;

declare type SelectAttrs = Augmented<HTMLSelectElement, {
    form?: string | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
    'bind:value'?: Signal<string | undefined>;
}>;

/** @public */
declare interface Signal<T = any> {
    value: T;
}

declare type SingleOrArray<T> = T | (SingleOrArray<T> | undefined | null)[];

/** @public */
declare type Size = number | string;

declare type SourceAttrs = Augmented<HTMLSourceElement, {
    height?: Size | undefined;
    width?: Size | undefined;
}>;

declare type StyleAttrs = Augmented<HTMLStyleElement, {
    scoped?: boolean | undefined;
}>;

declare type TableAttrs = Augmented<HTMLTableElement, {
    cellPadding?: number | string | undefined;
    cellSpacing?: number | string | undefined;
    width?: Size | undefined;
}>;

declare type TableCellAttrs = Augmented<HTMLTableCellElement, {
    align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined;
    height?: Size | undefined;
    width?: Size | undefined;
    valign?: 'top' | 'middle' | 'bottom' | 'baseline' | undefined;
}>;

declare type TextareaAttrs = Augmented<HTMLTextAreaElement, {
    enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
    form?: string | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
    'bind:value'?: Signal<string | undefined>;
}>;

declare type TrackAttrs = Augmented<HTMLTrackElement, {}>;

declare type VideoAttrs = Augmented<HTMLVideoElement, {
    crossOrigin?: HTMLCrossOriginAttribute;
    height?: Numberish | undefined;
    width?: Numberish | undefined;
    disablePictureInPicture?: boolean | undefined;
    disableRemotePlayback?: boolean | undefined;
}>;

/** @public */
declare interface VideoHTMLAttributes<T extends Element> extends HTMLAttributes<T>, VideoAttrs {
}

export { }
