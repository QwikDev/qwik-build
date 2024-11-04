import { sync$, component$ } from "@qwik.dev/core";
/**
 * @license
 * @qwik.dev/core 2.0.0-0-dev+bd98e33
 * Copyright QwikDev. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
const logError = (message, ...optionalParams) => createAndLogError(false, message, ...optionalParams);
const throwErrorAndStop = (message, ...optionalParams) => {
  throw createAndLogError(false, message, ...optionalParams);
};
const createAndLogError = (asyncThrow, message, ...optionalParams) => {
  const err = message instanceof Error ? message : new Error(message);
  return console.error("%cQWIK ERROR", "", err.message, ...optionalParams, err.stack), asyncThrow && setTimeout(() => {
    throw err;
  }, 0), err;
};
function assertTrue() {
}
function assertFalse() {
}
const isPromise = (value) => !!value && "object" == typeof value && "function" == typeof value.then;
function retryOnPromise(fn, retryCount = 0) {
  try {
    return fn();
  } catch (e) {
    if (isPromise(e) && retryCount < 10) {
      return e.then(retryOnPromise.bind(null, fn, retryCount++));
    }
    throw e;
  }
}
const isArray = (v) => Array.isArray(v);
var VirtualType;
!function(VirtualType2) {
  VirtualType2.Virtual = "V", VirtualType2.Fragment = "F", VirtualType2.WrappedSignal = "S", VirtualType2.Awaited = "A", VirtualType2.Component = "C", VirtualType2.InlineComponent = "I", VirtualType2.Projection = "P";
}(VirtualType || (VirtualType = {}));
({
  [VirtualType.Virtual]: "\x1B[34mVirtual\x1B[0m",
  [VirtualType.Fragment]: "\x1B[34mFragment\x1B[0m",
  [VirtualType.WrappedSignal]: "\x1B[34mSignal\x1B[0m",
  [VirtualType.Awaited]: "\x1B[34mAwaited\x1B[0m",
  [VirtualType.Component]: "\x1B[34mComponent\x1B[0m",
  [VirtualType.InlineComponent]: "\x1B[34mInlineComponent\x1B[0m",
  [VirtualType.Projection]: "\x1B[34mProjection\x1B[0m"
});
var QContainerValue;
!function(QContainerValue2) {
  QContainerValue2.PAUSED = "paused", QContainerValue2.RESUMED = "resumed", QContainerValue2.HTML = "html", QContainerValue2.TEXT = "text";
}(QContainerValue || (QContainerValue = {}));
const QContainerSelector = "[q\\:container]:not([q\\:container=" + QContainerValue.HTML + "]):not([q\\:container=" + QContainerValue.TEXT + "])";
const dangerouslySetInnerHTML = "dangerouslySetInnerHTML";
const isQrl$1 = (value) => "function" == typeof value && "function" == typeof value.getSymbol;
const EMPTY_OBJ = {};
Object.freeze(EMPTY_OBJ);
const STORE_TARGET = Symbol("store.target");
var StoreFlags;
!function(StoreFlags2) {
  StoreFlags2[StoreFlags2.NONE = 0] = "NONE", StoreFlags2[StoreFlags2.RECURSIVE = 1] = "RECURSIVE", StoreFlags2[StoreFlags2.IMMUTABLE = 2] = "IMMUTABLE";
}(StoreFlags || (StoreFlags = {}));
const isStore = (value) => STORE_TARGET in value;
class Subscriber {
  constructor() {
    this.$effectDependencies$ = null;
  }
}
function isSubscriber(value) {
  return value instanceof Subscriber || value instanceof WrappedSignal;
}
var VNodeFlags;
var VNodeFlagsIndex;
var VNodeProps;
var ElementVNodeProps;
var TextVNodeProps;
var VirtualVNodeProps;
!function(VNodeFlags2) {
  VNodeFlags2[VNodeFlags2.Element = 1] = "Element", VNodeFlags2[VNodeFlags2.Virtual = 2] = "Virtual", VNodeFlags2[VNodeFlags2.ELEMENT_OR_VIRTUAL_MASK = 3] = "ELEMENT_OR_VIRTUAL_MASK", VNodeFlags2[VNodeFlags2.ELEMENT_OR_TEXT_MASK = 5] = "ELEMENT_OR_TEXT_MASK", VNodeFlags2[VNodeFlags2.TYPE_MASK = 7] = "TYPE_MASK", VNodeFlags2[VNodeFlags2.INFLATED_TYPE_MASK = 15] = "INFLATED_TYPE_MASK", VNodeFlags2[VNodeFlags2.Text = 4] = "Text", VNodeFlags2[VNodeFlags2.Inflated = 8] = "Inflated", VNodeFlags2[VNodeFlags2.Resolved = 16] = "Resolved", VNodeFlags2[VNodeFlags2.Deleted = 32] = "Deleted", VNodeFlags2[VNodeFlags2.NAMESPACE_MASK = 192] = "NAMESPACE_MASK", VNodeFlags2[VNodeFlags2.NEGATED_NAMESPACE_MASK = -193] = "NEGATED_NAMESPACE_MASK", VNodeFlags2[VNodeFlags2.NS_html = 0] = "NS_html", VNodeFlags2[VNodeFlags2.NS_svg = 64] = "NS_svg", VNodeFlags2[VNodeFlags2.NS_math = 128] = "NS_math";
}(VNodeFlags || (VNodeFlags = {})), function(VNodeFlagsIndex2) {
  VNodeFlagsIndex2[VNodeFlagsIndex2.mask = -256] = "mask", VNodeFlagsIndex2[VNodeFlagsIndex2.negated_mask = 255] = "negated_mask", VNodeFlagsIndex2[VNodeFlagsIndex2.shift = 8] = "shift";
}(VNodeFlagsIndex || (VNodeFlagsIndex = {})), function(VNodeProps2) {
  VNodeProps2[VNodeProps2.flags = 0] = "flags", VNodeProps2[VNodeProps2.parent = 1] = "parent", VNodeProps2[VNodeProps2.previousSibling = 2] = "previousSibling", VNodeProps2[VNodeProps2.nextSibling = 3] = "nextSibling";
}(VNodeProps || (VNodeProps = {})), function(ElementVNodeProps2) {
  ElementVNodeProps2[ElementVNodeProps2.firstChild = 4] = "firstChild", ElementVNodeProps2[ElementVNodeProps2.lastChild = 5] = "lastChild", ElementVNodeProps2[ElementVNodeProps2.element = 6] = "element", ElementVNodeProps2[ElementVNodeProps2.elementName = 7] = "elementName", ElementVNodeProps2[ElementVNodeProps2.PROPS_OFFSET = 8] = "PROPS_OFFSET";
}(ElementVNodeProps || (ElementVNodeProps = {})), function(TextVNodeProps2) {
  TextVNodeProps2[TextVNodeProps2.node = 4] = "node", TextVNodeProps2[TextVNodeProps2.text = 5] = "text";
}(TextVNodeProps || (TextVNodeProps = {})), function(VirtualVNodeProps2) {
  VirtualVNodeProps2[VirtualVNodeProps2.firstChild = 4] = "firstChild", VirtualVNodeProps2[VirtualVNodeProps2.lastChild = 5] = "lastChild", VirtualVNodeProps2[VirtualVNodeProps2.PROPS_OFFSET = 6] = "PROPS_OFFSET";
}(VirtualVNodeProps || (VirtualVNodeProps = {}));
var SiblingsArray;
!function(SiblingsArray2) {
  SiblingsArray2[SiblingsArray2.Name = 0] = "Name", SiblingsArray2[SiblingsArray2.Key = 1] = "Key", SiblingsArray2[SiblingsArray2.VNode = 2] = "VNode", SiblingsArray2[SiblingsArray2.Size = 3] = "Size", SiblingsArray2[SiblingsArray2.NextVNode = 5] = "NextVNode";
}(SiblingsArray || (SiblingsArray = {}));
var ChoreType;
!function(ChoreType2) {
  ChoreType2[ChoreType2.MACRO = 112] = "MACRO", ChoreType2[ChoreType2.MICRO = 15] = "MICRO", ChoreType2[ChoreType2.QRL_RESOLVE = 1] = "QRL_RESOLVE", ChoreType2[ChoreType2.RESOURCE = 2] = "RESOURCE", ChoreType2[ChoreType2.TASK = 3] = "TASK", ChoreType2[ChoreType2.NODE_DIFF = 4] = "NODE_DIFF", ChoreType2[ChoreType2.NODE_PROP = 5] = "NODE_PROP", ChoreType2[ChoreType2.COMPONENT_SSR = 6] = "COMPONENT_SSR", ChoreType2[ChoreType2.COMPONENT = 7] = "COMPONENT", ChoreType2[ChoreType2.WAIT_FOR_COMPONENTS = 16] = "WAIT_FOR_COMPONENTS", ChoreType2[ChoreType2.JOURNAL_FLUSH = 48] = "JOURNAL_FLUSH", ChoreType2[ChoreType2.VISIBLE = 64] = "VISIBLE", ChoreType2[ChoreType2.CLEANUP_VISIBLE = 80] = "CLEANUP_VISIBLE", ChoreType2[ChoreType2.WAIT_FOR_ALL = 127] = "WAIT_FOR_ALL";
}(ChoreType || (ChoreType = {}));
var TaskFlags;
!function(TaskFlags2) {
  TaskFlags2[TaskFlags2.VISIBLE_TASK = 1] = "VISIBLE_TASK", TaskFlags2[TaskFlags2.TASK = 2] = "TASK", TaskFlags2[TaskFlags2.RESOURCE = 4] = "RESOURCE", TaskFlags2[TaskFlags2.DIRTY = 8] = "DIRTY";
}(TaskFlags || (TaskFlags = {}));
class Task extends Subscriber {
  constructor($flags$, $index$, $el$, $qrl$, $state$, $destroy$) {
    super(), this.$flags$ = $flags$, this.$index$ = $index$, this.$el$ = $el$, this.$qrl$ = $qrl$, this.$state$ = $state$, this.$destroy$ = $destroy$;
  }
}
const isTask = (value) => value instanceof Task;
const NEEDS_COMPUTATION = Symbol("invalid");
const throwIfQRLNotResolved = (qrl2) => {
  if (!qrl2.resolved) {
    throw qrl2.resolve();
  }
};
const isSignal = (value) => value instanceof Signal;
class EffectData {
  constructor(data) {
    this.data = data;
  }
}
var EffectSubscriptionsProp;
var EffectProperty;
!function(EffectSubscriptionsProp2) {
  EffectSubscriptionsProp2[EffectSubscriptionsProp2.EFFECT = 0] = "EFFECT", EffectSubscriptionsProp2[EffectSubscriptionsProp2.PROPERTY = 1] = "PROPERTY", EffectSubscriptionsProp2[EffectSubscriptionsProp2.FIRST_BACK_REF_OR_DATA = 2] = "FIRST_BACK_REF_OR_DATA";
}(EffectSubscriptionsProp || (EffectSubscriptionsProp = {})), function(EffectProperty2) {
  EffectProperty2.COMPONENT = ":", EffectProperty2.VNODE = ".";
}(EffectProperty || (EffectProperty = {}));
class Signal {
  constructor(container, value) {
    this.$effects$ = null, this.$container$ = null, this.$container$ = container, this.$untrackedValue$ = value;
  }
  get untrackedValue() {
    return this.$untrackedValue$;
  }
  set untrackedValue(value) {
    this.$untrackedValue$ = value;
  }
  get value() {
    const ctx = tryGetInvokeContext();
    if (ctx) {
      if (null === this.$container$) {
        if (!ctx.$container$) {
          return this.untrackedValue;
        }
        this.$container$ = ctx.$container$;
      } else {
        assertTrue(!ctx.$container$ || ctx.$container$ === this.$container$);
      }
      const effectSubscriber = ctx.$effectSubscriber$;
      if (effectSubscriber) {
        const effects = this.$effects$ || (this.$effects$ = []);
        ensureContainsEffect(effects, effectSubscriber), ensureContains(effectSubscriber, this), isSubscriber(this) && ensureEffectContainsSubscriber(effectSubscriber[EffectSubscriptionsProp.EFFECT], this, this.$container$);
      }
    }
    return this.untrackedValue;
  }
  set value(value) {
    value !== this.$untrackedValue$ && (this.$untrackedValue$ = value, triggerEffects(this.$container$, this, this.$effects$));
  }
  valueOf() {
  }
  toString() {
    return `[${this.constructor.name}${this.$invalid$ ? " INVALID" : ""} ${String(this.$untrackedValue$)}]` + (this.$effects$?.map((e) => "\n -> " + pad(qwikDebugToString(e[0]), "    ")).join("\n") || "");
  }
  toJSON() {
    return {
      value: this.$untrackedValue$
    };
  }
}
const ensureContains = (array, value) => {
  -1 === array.indexOf(value) && array.push(value);
};
const ensureContainsEffect = (array, effectSubscriptions) => {
  for (let i = 0; i < array.length; i++) {
    const existingEffect = array[i];
    if (existingEffect[0] === effectSubscriptions[0] && existingEffect[1] === effectSubscriptions[1]) {
      return;
    }
  }
  array.push(effectSubscriptions);
};
const ensureEffectContainsSubscriber = (effect, subscriber, container) => {
  if (isSubscriber(effect)) {
    if (effect.$effectDependencies$ || (effect.$effectDependencies$ = []), subscriberExistInSubscribers(effect.$effectDependencies$, subscriber)) {
      return;
    }
    effect.$effectDependencies$.push(subscriber);
  } else if (vnode_isVNode(effect) && vnode_isVirtualVNode(effect)) {
    let subscribers = vnode_getProp(effect, "q:subs", container ? container.$getObjectById$ : null);
    if (subscribers || (subscribers = []), subscriberExistInSubscribers(subscribers, subscriber)) {
      return;
    }
    subscribers.push(subscriber), vnode_setProp(effect, "q:subs", subscribers);
  } else if (isSSRNode(effect)) {
    let subscribers = effect.getProp("q:subs");
    if (subscribers || (subscribers = []), subscriberExistInSubscribers(subscribers, subscriber)) {
      return;
    }
    subscribers.push(subscriber), effect.setProp("q:subs", subscribers);
  }
};
const isSSRNode = (effect) => "setProp" in effect && "getProp" in effect && "removeProp" in effect && "id" in effect;
const subscriberExistInSubscribers = (subscribers, subscriber) => {
  for (let i = 0; i < subscribers.length; i++) {
    if (subscribers[i] === subscriber) {
      return true;
    }
  }
  return false;
};
const triggerEffects = (container, signal, effects) => {
  if (effects) {
    const scheduleEffect = (effectSubscriptions) => {
      const effect = effectSubscriptions[EffectSubscriptionsProp.EFFECT];
      const property = effectSubscriptions[EffectSubscriptionsProp.PROPERTY];
      if (isTask(effect)) {
        effect.$flags$ |= TaskFlags.DIRTY;
        let choreType = ChoreType.TASK;
        effect.$flags$ & TaskFlags.VISIBLE_TASK ? choreType = ChoreType.VISIBLE : effect.$flags$ & TaskFlags.RESOURCE && (choreType = ChoreType.RESOURCE), container.$scheduler$(choreType, effect);
      } else if (effect instanceof Signal) {
        effect instanceof ComputedSignal && (effect.$computeQrl$.resolved || container.$scheduler$(ChoreType.QRL_RESOLVE, null, effect.$computeQrl$));
        try {
          retryOnPromise(() => effect.$invalidate$());
        } catch (e) {
          logError(e);
        }
      } else if (property === EffectProperty.COMPONENT) {
        const host = effect;
        const qrl2 = container.getHostProp(host, "q:renderFn");
        const props = container.getHostProp(host, "q:props");
        container.$scheduler$(ChoreType.COMPONENT, host, qrl2, props);
      } else if (property === EffectProperty.VNODE) {
        container.$scheduler$(ChoreType.NODE_DIFF, effect, effect, signal);
      } else {
        let effectData = effectSubscriptions[EffectSubscriptionsProp.FIRST_BACK_REF_OR_DATA];
        if (effectData instanceof EffectData) {
          const payload = {
            ...effectData.data,
            $value$: signal
          };
          container.$scheduler$(ChoreType.NODE_PROP, effect, property, payload);
        }
      }
    };
    effects.forEach(scheduleEffect);
  }
};
class ComputedSignal extends Signal {
  constructor(container, fn) {
    super(container, NEEDS_COMPUTATION), this.$invalid$ = true, this.$computeQrl$ = fn;
  }
  $invalidate$() {
    this.$invalid$ = true, this.$effects$?.length && this.$computeIfNeeded$() && triggerEffects(this.$container$, this, this.$effects$);
  }
  force() {
    this.$invalid$ = true, triggerEffects(this.$container$, this, this.$effects$);
  }
  get untrackedValue() {
    return this.$computeIfNeeded$(), assertFalse(this.$untrackedValue$ === NEEDS_COMPUTATION), this.$untrackedValue$;
  }
  $computeIfNeeded$() {
    if (!this.$invalid$) {
      return false;
    }
    const computeQrl = this.$computeQrl$;
    throwIfQRLNotResolved(computeQrl);
    const ctx = tryGetInvokeContext();
    const previousEffectSubscription = ctx?.$effectSubscriber$;
    ctx && (ctx.$effectSubscriber$ = [this, EffectProperty.VNODE]);
    try {
      const untrackedValue = computeQrl.getFn(ctx)();
      isPromise(untrackedValue) && throwErrorAndStop(`useComputedSignal$ QRL ${computeQrl.dev ? `${computeQrl.dev.file} ` : ""}${computeQrl.$hash$} returned a Promise`), this.$invalid$ = false;
      const didChange = untrackedValue !== this.$untrackedValue$;
      return didChange && (this.$untrackedValue$ = untrackedValue), didChange;
    } finally {
      ctx && (ctx.$effectSubscriber$ = previousEffectSubscription);
    }
  }
  get value() {
    return super.value;
  }
  set value(_) {
    throwErrorAndStop("ComputedSignal is read-only");
  }
}
class WrappedSignal extends Signal {
  constructor(container, fn, args, fnStr) {
    super(container, NEEDS_COMPUTATION), this.$invalid$ = true, this.$effectDependencies$ = null, this.$args$ = args, this.$func$ = fn, this.$funcStr$ = fnStr;
  }
  $invalidate$() {
    this.$invalid$ = true, this.$effects$?.length && this.$computeIfNeeded$() && triggerEffects(this.$container$, this, this.$effects$);
  }
  force() {
    this.$invalid$ = true, triggerEffects(this.$container$, this, this.$effects$);
  }
  get untrackedValue() {
    return this.$computeIfNeeded$(), assertFalse(this.$untrackedValue$ === NEEDS_COMPUTATION), this.$untrackedValue$;
  }
  $computeIfNeeded$() {
    if (!this.$invalid$) {
      return false;
    }
    const untrackedValue = trackSignal(() => this.$func$(...this.$args$), this, EffectProperty.VNODE, this.$container$);
    const didChange = untrackedValue !== this.$untrackedValue$;
    return didChange && (this.$untrackedValue$ = untrackedValue), didChange;
  }
  get value() {
    return super.value;
  }
  set value(_) {
    throwErrorAndStop("WrappedSignal is read-only");
  }
}
const _CONST_PROPS = Symbol("CONST");
const _VAR_PROPS = Symbol("VAR");
const _jsxSorted = (type, varProps, constProps, children, flags, key) => {
  const processed = null == key ? null : String(key);
  const node = new JSXNodeImpl(type, varProps || {}, null, children, flags, processed);
  return node;
};
const _jsxSplit = (type, varProps, constProps, children, flags, key, dev) => {
  let sortedProps;
  return sortedProps = varProps ? Object.fromEntries(untrack(() => Object.entries(varProps)).filter((entry) => {
    const attr = entry[0];
    return "children" === attr ? (children ?? (children = entry[1]), false) : "key" === attr ? (key = entry[1], false) : !constProps;
  }).sort(([a2], [b]) => a2 < b ? -1 : 1)) : EMPTY_OBJ, _jsxSorted(type, sortedProps, constProps, children, flags, key);
};
const jsx = (type, props, key) => _jsxSplit(type, props, null, null, 0, null);
class JSXNodeImpl {
  constructor(type, varProps, constProps, children, flags, key = null) {
    this.type = type, this.varProps = varProps, this.constProps = constProps, this.children = children, this.flags = flags, this.key = key, this._proxy = null;
  }
  get props() {
    return this._proxy || (this._proxy = createPropsProxy(this.varProps, this.constProps, this.children)), this._proxy;
  }
}
const isJSXNode = (n) => n instanceof JSXNodeImpl;
function createPropsProxy(varProps, constProps, children) {
  return new Proxy({}, new PropsProxyHandler(varProps, constProps, children));
}
class PropsProxyHandler {
  constructor($varProps$, $constProps$, $children$) {
    this.$varProps$ = $varProps$, this.$constProps$ = $constProps$, this.$children$ = $children$;
  }
  get(_, prop) {
    if (prop === _CONST_PROPS) {
      return this.$constProps$;
    }
    if (prop === _VAR_PROPS) {
      return this.$varProps$;
    }
    if (null != this.$children$ && "children" === prop) {
      return this.$children$;
    }
    const value = this.$constProps$ && prop in this.$constProps$ ? this.$constProps$[prop] : this.$varProps$[prop];
    return value instanceof WrappedSignal ? value.value : value;
  }
  set(_, prop, value) {
    return prop === _CONST_PROPS ? (this.$constProps$ = value, true) : prop === _VAR_PROPS ? (this.$varProps$ = value, true) : (this.$constProps$ && prop in this.$constProps$ ? this.$constProps$[prop] = value : this.$varProps$[prop] = value, true);
  }
  deleteProperty(_, prop) {
    if ("string" != typeof prop) {
      return false;
    }
    let didDelete = delete this.$varProps$[prop];
    return this.$constProps$ && (didDelete = delete this.$constProps$[prop] || didDelete), null != this.$children$ && "children" === prop && (this.$children$ = null), didDelete;
  }
  has(_, prop) {
    return "children" === prop && null != this.$children$ || prop === _CONST_PROPS || prop === _VAR_PROPS || prop in this.$varProps$ || !!this.$constProps$ && prop in this.$constProps$;
  }
  getOwnPropertyDescriptor(target, p) {
    return {
      configurable: true,
      enumerable: true,
      value: "children" === p && null != this.$children$ ? this.$children$ : this.$constProps$ && p in this.$constProps$ ? this.$constProps$[p] : this.$varProps$[p]
    };
  }
  ownKeys() {
    const out = Object.keys(this.$varProps$);
    if (null != this.$children$ && -1 === out.indexOf("children") && out.push("children"), this.$constProps$) {
      for (const key in this.$constProps$) {
        -1 === out.indexOf(key) && out.push(key);
      }
    }
    return out;
  }
}
const stringifyPath = [];
function qwikDebugToString(value) {
  if (null === value) {
    return "null";
  }
  if (void 0 === value) {
    return "undefined";
  }
  if ("string" == typeof value) {
    return '"' + value + '"';
  }
  if ("number" == typeof value || "boolean" == typeof value) {
    return String(value);
  }
  if (isTask(value)) {
    return `Task(${qwikDebugToString(value.$qrl$)})`;
  }
  if (isQrl$1(value)) {
    return `Qrl(${value.$symbol$})`;
  }
  if ("object" == typeof value || "function" == typeof value) {
    if (stringifyPath.includes(value)) {
      return "*";
    }
    try {
      if (stringifyPath.push(value), Array.isArray(value)) {
        return vnode_isVNode(value) ? "(" + vnode_getProp(value, "q:type", null) + ")" : value.map(qwikDebugToString);
      }
      if (isSignal(value)) {
        return value instanceof WrappedSignal ? "WrappedSignal" : value instanceof ComputedSignal ? "ComputedSignal" : "Signal";
      }
      if (isStore(value)) {
        return "Store";
      }
      if (isJSXNode(value)) {
        return jsxToString(value);
      }
    } finally {
      stringifyPath.pop();
    }
  }
  return value;
}
const pad = (text, prefix) => String(text).split("\n").map((line, idx) => (idx ? prefix : "") + line).join("\n");
const jsxToString = (value) => {
  if (isJSXNode(value)) {
    let type = value.type;
    "function" == typeof type && (type = type.name || "Component");
    let str = "<" + value.type;
    if (value.props) {
      for (const [key, val] of Object.entries(value.props)) {
        str += " " + key + "=" + qwikDebugToString(val);
      }
      const children = value.children;
      null != children ? (str += ">", Array.isArray(children) ? children.forEach((child) => {
        str += jsxToString(child);
      }) : str += jsxToString(children), str += "</" + value.type + ">") : str += "/>";
    }
    return str;
  }
  return String(value);
};
var VNodeJournalOpCode;
!function(VNodeJournalOpCode2) {
  VNodeJournalOpCode2[VNodeJournalOpCode2.SetText = 1] = "SetText", VNodeJournalOpCode2[VNodeJournalOpCode2.SetAttribute = 2] = "SetAttribute", VNodeJournalOpCode2[VNodeJournalOpCode2.HoistStyles = 3] = "HoistStyles", VNodeJournalOpCode2[VNodeJournalOpCode2.Remove = 4] = "Remove", VNodeJournalOpCode2[VNodeJournalOpCode2.Insert = 5] = "Insert";
}(VNodeJournalOpCode || (VNodeJournalOpCode = {}));
const vnode_isVNode = (vNode) => vNode instanceof VNodeArray;
const vnode_isVirtualVNode = (vNode) => {
  return (vNode[VNodeProps.flags] & VNodeFlags.Virtual) === VNodeFlags.Virtual;
};
const ensureElementOrVirtualVNode = (vNode) => {
  assertTrue(!!(vNode[VNodeProps.flags] & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK), "Expecting ElementVNode or VirtualVNode was: " + vnode_getNodeTypeName(vNode));
};
const vnode_getNodeTypeName = (vNode) => {
  if (vNode) {
    switch (vNode[VNodeProps.flags] & VNodeFlags.TYPE_MASK) {
      case VNodeFlags.Element:
        return "Element";
      case VNodeFlags.Virtual:
        return "Virtual";
      case VNodeFlags.Text:
        return "Text";
    }
  }
  return "<unknown>";
};
const vnode_ensureElementInflated = (vnode) => {
  if ((vnode[VNodeProps.flags] & VNodeFlags.INFLATED_TYPE_MASK) === VNodeFlags.Element) {
    const elementVNode = vnode;
    elementVNode[VNodeProps.flags] ^= VNodeFlags.Inflated;
    const element = elementVNode[ElementVNodeProps.element];
    const attributes = element.attributes;
    for (let idx = 0; idx < attributes.length; idx++) {
      const attr = attributes[idx];
      const key = attr.name;
      if (":" == key || !key) {
        break;
      }
      if (key.startsWith("q:container")) {
        attr.value === QContainerValue.HTML ? mapArray_set(elementVNode, dangerouslySetInnerHTML, element.innerHTML, ElementVNodeProps.PROPS_OFFSET) : attr.value === QContainerValue.TEXT && "value" in element && mapArray_set(elementVNode, "value", element.value, ElementVNodeProps.PROPS_OFFSET);
      } else if (!key.startsWith("on:")) {
        mapArray_set(elementVNode, key, attr.value, ElementVNodeProps.PROPS_OFFSET);
      }
    }
  }
};
const mapApp_findIndx = (elementVNode, key, start) => {
  let bottom = start >> 1;
  let top = elementVNode.length - 2 >> 1;
  for (; bottom <= top; ) {
    const mid = bottom + (top - bottom >> 1);
    const midKey = elementVNode[mid << 1];
    if (midKey === key) {
      return mid << 1;
    }
    midKey < key ? bottom = mid + 1 : top = mid - 1;
  }
  return ~(bottom << 1);
};
const mapArray_set = (elementVNode, key, value, start) => {
  const indx = mapApp_findIndx(elementVNode, key, start);
  indx >= 0 ? null == value ? elementVNode.splice(indx, 2) : elementVNode[indx + 1] = value : null != value && elementVNode.splice(~indx, 0, key, value);
};
const vnode_getProp = (vnode, key, getObject) => {
  const type = vnode[VNodeProps.flags];
  if (type & VNodeFlags.ELEMENT_OR_VIRTUAL_MASK) {
    type & VNodeFlags.Element && vnode_ensureElementInflated(vnode);
    const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
    if (idx >= 0) {
      let value = vnode[idx + 1];
      return "string" == typeof value && getObject && (vnode[idx + 1] = value = getObject(value)), value;
    }
  }
  return null;
};
const vnode_setProp = (vnode, key, value) => {
  ensureElementOrVirtualVNode(vnode);
  const idx = mapApp_findIndx(vnode, key, vnode_getPropStartIndex(vnode));
  idx >= 0 ? vnode[idx + 1] = value : null != value && vnode.splice(~idx, 0, key, value);
};
const vnode_getPropStartIndex = (vnode) => {
  const type = vnode[VNodeProps.flags] & VNodeFlags.TYPE_MASK;
  if (type === VNodeFlags.Element) {
    return ElementVNodeProps.PROPS_OFFSET;
  }
  if (type === VNodeFlags.Virtual) {
    return VirtualVNodeProps.PROPS_OFFSET;
  }
  throw throwErrorAndStop("Invalid vnode type.");
};
const VNodeArray = class VNode extends Array {
  static createElement(flags, parent, previousSibling, nextSibling, firstChild, lastChild, element, elementName) {
    const vnode = new VNode(flags, parent, previousSibling, nextSibling);
    return vnode.push(firstChild, lastChild, element, elementName), vnode;
  }
  static createText(flags, parent, previousSibling, nextSibling, textNode, text) {
    const vnode = new VNode(flags, parent, previousSibling, nextSibling);
    return vnode.push(textNode, text), vnode;
  }
  static createVirtual(flags, parent, previousSibling, nextSibling, firstChild, lastChild) {
    const vnode = new VNode(flags, parent, previousSibling, nextSibling);
    return vnode.push(firstChild, lastChild), vnode;
  }
  constructor(flags, parent, previousSibling, nextSibling) {
    super(), this.push(flags, parent, previousSibling, nextSibling);
  }
};
let _context;
const tryGetInvokeContext = () => {
  if (!_context) {
    const context = "undefined" != typeof document && document && document.__q_context__;
    if (!context) {
      return;
    }
    return isArray(context) ? document.__q_context__ = newInvokeContextFromTuple(context) : context;
  }
  return _context;
};
function invoke(context, fn, ...args) {
  return invokeApply.call(this, context, fn, args);
}
function invokeApply(context, fn, args) {
  const previousContext = _context;
  let returnValue;
  try {
    _context = context, returnValue = fn.apply(this, args);
  } finally {
    _context = previousContext;
  }
  return returnValue;
}
const newInvokeContextFromTuple = ([element, event, url]) => {
  const container = element.closest(QContainerSelector);
  const locale = container?.getAttribute("q:locale") || void 0;
  return newInvokeContext(locale, void 0, element, event, url);
};
const newInvokeContext = (locale, hostElement, element, event, url) => {
  const ctx = {
    $url$: url,
    $i$: 0,
    $hostElement$: hostElement,
    $element$: element,
    $event$: event,
    $qrl$: void 0,
    $effectSubscriber$: void 0,
    $locale$: locale || ("object" == typeof event && event && "locale" in event ? event.locale : void 0),
    $container$: void 0
  };
  return ctx;
};
const untrack = (fn) => invoke(void 0, fn);
const trackInvocation = /* @__PURE__ */ newInvokeContext(void 0, void 0, void 0, "qRender");
const trackSignal = (fn, subscriber, property, container, data) => {
  const previousSubscriber = trackInvocation.$effectSubscriber$;
  const previousContainer = trackInvocation.$container$;
  try {
    return trackInvocation.$effectSubscriber$ = [subscriber, property], data && trackInvocation.$effectSubscriber$.push(data), trackInvocation.$container$ = container, invoke(trackInvocation, fn);
  } finally {
    trackInvocation.$effectSubscriber$ = previousSubscriber, trackInvocation.$container$ = previousContainer;
  }
};
var TypeIds;
var Constants;
!function(TypeIds2) {
  TypeIds2[TypeIds2.RootRef = 0] = "RootRef", TypeIds2[TypeIds2.Constant = 1] = "Constant", TypeIds2[TypeIds2.Number = 2] = "Number", TypeIds2[TypeIds2.String = 3] = "String", TypeIds2[TypeIds2.Array = 4] = "Array", TypeIds2[TypeIds2.URL = 5] = "URL", TypeIds2[TypeIds2.Date = 6] = "Date", TypeIds2[TypeIds2.Regex = 7] = "Regex", TypeIds2[TypeIds2.VNode = 8] = "VNode", TypeIds2[TypeIds2.RefVNode = 9] = "RefVNode", TypeIds2[TypeIds2.BigInt = 10] = "BigInt", TypeIds2[TypeIds2.URLSearchParams = 11] = "URLSearchParams", TypeIds2[TypeIds2.Error = 12] = "Error", TypeIds2[TypeIds2.Object = 13] = "Object", TypeIds2[TypeIds2.Promise = 14] = "Promise", TypeIds2[TypeIds2.Set = 15] = "Set", TypeIds2[TypeIds2.Map = 16] = "Map", TypeIds2[TypeIds2.Uint8Array = 17] = "Uint8Array", TypeIds2[TypeIds2.QRL = 18] = "QRL", TypeIds2[TypeIds2.Task = 19] = "Task", TypeIds2[TypeIds2.Resource = 20] = "Resource", TypeIds2[TypeIds2.Component = 21] = "Component", TypeIds2[TypeIds2.Signal = 22] = "Signal", TypeIds2[TypeIds2.WrappedSignal = 23] = "WrappedSignal", TypeIds2[TypeIds2.ComputedSignal = 24] = "ComputedSignal", TypeIds2[TypeIds2.Store = 25] = "Store", TypeIds2[TypeIds2.StoreArray = 26] = "StoreArray", TypeIds2[TypeIds2.FormData = 27] = "FormData", TypeIds2[TypeIds2.JSXNode = 28] = "JSXNode", TypeIds2[TypeIds2.PropsProxy = 29] = "PropsProxy", TypeIds2[TypeIds2.EffectData = 30] = "EffectData";
}(TypeIds || (TypeIds = {})), function(Constants2) {
  Constants2[Constants2.Undefined = 0] = "Undefined", Constants2[Constants2.Null = 1] = "Null", Constants2[Constants2.True = 2] = "True", Constants2[Constants2.False = 3] = "False", Constants2[Constants2.EmptyString = 4] = "EmptyString", Constants2[Constants2.EMPTY_ARRAY = 5] = "EMPTY_ARRAY", Constants2[Constants2.EMPTY_OBJ = 6] = "EMPTY_OBJ", Constants2[Constants2.NEEDS_COMPUTATION = 7] = "NEEDS_COMPUTATION", Constants2[Constants2.Slot = 8] = "Slot", Constants2[Constants2.Fragment = 9] = "Fragment", Constants2[Constants2.NaN = 10] = "NaN", Constants2[Constants2.PositiveInfinity = 11] = "PositiveInfinity", Constants2[Constants2.NegativeInfinity = 12] = "NegativeInfinity", Constants2[Constants2.MaxSafeInt = 13] = "MaxSafeInt", Constants2[Constants2.AlmostMaxSafeInt = 14] = "AlmostMaxSafeInt", Constants2[Constants2.MinSafeInt = 15] = "MinSafeInt";
}(Constants || (Constants = {}));
const insightsPing = sync$(
  () => ((window2, document2, location2, navigator2, performance2, round, JSON_stringify) => {
    var publicApiKey = __QI_KEY__, postUrl = __QI_URL__, getAttribute_s = "getAttribute", querySelector_s = "querySelector", manifest_s = "manifest", manifest_hash_s = `${manifest_s}-hash`, manifestHash_s = `${manifest_s}Hash`, version_s = "version", publicApiKey_s = "publicApiKey", sendBeacon_s = "sendBeacon", symbol_s = "symbol", length_s = "length", addEventListener_s = "addEventListener", route_s = "route", error_s = "error", stack_s = "stack", message_s = "message", symbols_s = `${symbol_s}s`, qVersion = document2[querySelector_s](`[q\\:${version_s}]`)?.[getAttribute_s](`q:${version_s}`) || "unknown", manifestHash = document2[querySelector_s](`[q\\:${manifest_hash_s}]`)?.[getAttribute_s](
      `q:${manifest_hash_s}`
    ) || "dev", qSymbols = [], existingSymbols = /* @__PURE__ */ new Set(), flushSymbolIndex = 0, lastReqTime = 0, timeoutID, qRouteChangeTime = performance2.now(), qRouteEl = document2[querySelector_s](`[q\\:${route_s}]`), flush = () => {
      timeoutID = void 0;
      if (qSymbols[length_s] > flushSymbolIndex) {
        var payload = {
          qVersion,
          [publicApiKey_s]: publicApiKey,
          [manifestHash_s]: manifestHash,
          previousSymbol: flushSymbolIndex == 0 ? void 0 : qSymbols[flushSymbolIndex - 1][symbol_s],
          [symbols_s]: qSymbols.slice(flushSymbolIndex)
        };
        navigator2[sendBeacon_s](postUrl, JSON_stringify(payload));
        flushSymbolIndex = qSymbols[length_s];
      }
    }, debounceFlush = () => {
      timeoutID != void 0 && clearTimeout(timeoutID);
      timeoutID = setTimeout(flush, 1e3);
    };
    window2.qSymbolTracker = {
      [symbols_s]: qSymbols,
      [publicApiKey_s]: publicApiKey
    };
    if (qRouteEl) {
      new MutationObserver((mutations) => {
        var mutation = mutations.find((m) => m.attributeName === `q:${route_s}`);
        if (mutation) {
          qRouteChangeTime = performance2.now();
        }
      }).observe(qRouteEl, { attributes: true });
    }
    document2[addEventListener_s](
      "visibilitychange",
      () => document2.visibilityState === "hidden" && flush()
    );
    document2[addEventListener_s](`q${symbol_s}`, (_event) => {
      var event = _event, detail = event.detail, symbolRequestTime = detail.reqTime, symbolDeliveredTime = event.timeStamp, symbol = detail[symbol_s];
      if (!existingSymbols.has(symbol)) {
        existingSymbols.add(symbol);
        var route = qRouteEl?.[getAttribute_s](`q:${route_s}`) || "/";
        qSymbols.push({
          [symbol_s]: symbol,
          [route_s]: route,
          delay: round(0 - lastReqTime + symbolRequestTime),
          latency: round(symbolDeliveredTime - symbolRequestTime),
          timeline: round(0 - qRouteChangeTime + symbolRequestTime),
          interaction: !!detail.element
        });
        lastReqTime = symbolDeliveredTime;
        debounceFlush();
      }
    });
    window2[addEventListener_s](error_s, (event) => {
      var error = event[error_s];
      if (!(error && typeof error === "object")) {
        return;
      }
      var payload = {
        url: `${location2}`,
        [manifestHash_s]: manifestHash,
        timestamp: (/* @__PURE__ */ new Date()).getTime(),
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        [message_s]: event[message_s],
        [error_s]: message_s in error ? error[message_s] : `${error}`,
        [stack_s]: stack_s in error ? error[stack_s] || "" : ""
      };
      navigator2[sendBeacon_s](`${postUrl}${error_s}/`, JSON_stringify(payload));
    });
  })(window, document, location, navigator, performance, Math.round, JSON.stringify)
);
const Insights = component$(
  ({ publicApiKey, postUrl }) => {
    if (!__EXPERIMENTAL__.insights) {
      throw new Error(
        'Insights is experimental and must be enabled with `experimental: ["insights"]` in the `qwikVite` plugin.'
      );
    }
    if (!publicApiKey) {
      return null;
    }
    return (
      // the script will set the variables before the qinit event
      /* @__PURE__ */ jsx("script", {
        "document:onQInit$": insightsPing,
        dangerouslySetInnerHTML: `__QI_KEY__=${JSON.stringify(publicApiKey)};__QI_URL__=${JSON.stringify(postUrl || `https://insights.qwik.dev/api/v1/${publicApiKey}/post/`)}`
      })
    );
  }
);
export {
  Insights
};
